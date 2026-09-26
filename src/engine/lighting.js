// Light budget for real-time rendering.
//
// Forward rendering evaluates every visible light for every shaded pixel, and lights without
// shadow maps shine through walls. The rig therefore keeps a FIXED number of point and spot
// light slots (so shader programs never recompile while walking) and fills them with the lamps
// that matter for the current view: in walk mode the lamps of the room the camera stands in
// (plus rooms openly connected to it), in the dollhouse view the strongest lamps per room.
// Unused slots stay visible with zero intensity. With all lamps off (daylight) the lamps are
// hidden entirely, which gives the cheapest shader variant. The path tracer gets every lamp.
import { ROOMS, pointInPolygon, OFFSET } from '../core/geometry.js';

export const LAMP_SCALE = 0.08;
/** Windowless rooms: their lamps stay on (dimmed) even in daylight, as they would in reality. */
export const INTERIOR_ROOMS = new Set(['bath', 'guestbath', 'utility']);
export const INTERIOR_LEVEL = 0.8;
/**
 * Light slots per quality preset. Every slot costs a full BRDF evaluation in every shaded pixel,
 * so integrated GPUs ("Mittel") get fewer; walk mode only needs the lamps of one room anyway.
 */
const SLOTS = { high: { point: 8, spot: 8 }, medium: { point: 5, spot: 5 }, low: { point: 3, spot: 3 } };
const OPEN = { living: ['kitchen'], kitchen: ['living'] };

export class LightRig {
  constructor(apartment, quality = 'high') {
    this.lights = apartment.lights;
    this.slots = SLOTS[quality] ?? SLOTS.high;
    this.level = 0;
    this.mode = 'orbit';
    this.room = null;
    this.all = false;
    this.byType = { point: this.lights.filter((l) => l.isPointLight), spot: this.lights.filter((l) => l.isSpotLight), rect: this.lights.filter((l) => l.isRectAreaLight) };
    this.apply();
  }

  /** Room id at a world position (null outside). */
  static roomAt(pos) {
    const p = [pos.x + OFFSET.x, pos.z + OFFSET.y];
    return ROOMS.find((r) => pointInPolygon(p, r.points))?.id ?? null;
  }

  setLevel(level) { this.level = level; return this.apply(); }
  setAll(all) { this.all = all; return this.apply(); }
  /** Changes the slot count (one shader recompile, only on a preset change). */
  setQuality(q) { this.slots = SLOTS[q] ?? SLOTS.high; return this.apply(); }

  /** Updates the selection for a camera; returns true if anything changed. */
  update(mode, camPos) {
    const room = mode === 'walk' ? LightRig.roomAt(camPos) ?? this.room : null;
    if (mode === this.mode && room === this.room) return false;
    this.mode = mode; this.room = room;
    return this.apply();
  }

  /** Effective dimming level of one lamp (windowless rooms keep their light in daylight). */
  levelOf(l) {
    if (this.level > 0) return this.level;
    return INTERIOR_ROOMS.has(l.userData.room) ? INTERIOR_LEVEL : 0;
  }

  apply() {
    const sig = [];
    for (const type of ['point', 'spot']) {
      const list = this.byType[type].filter((l) => this.levelOf(l) > 0);
      const on = list.length > 0;
      let chosen;
      if (!on) chosen = [];
      else if (this.all) chosen = list;
      else chosen = this.pick(list, this.slots[type]);
      const set = new Set(chosen);
      // fixed slot count: fill with unused lights at zero intensity
      const slots = !on ? 0 : this.all ? list.length : Math.min(this.slots[type], list.length);
      let filler = slots - chosen.length;
      for (const l of this.byType[type]) {
        const active = set.has(l);
        const visible = active || (filler > 0 && list.includes(l) && filler--);
        l.visible = !!visible;
        l.intensity = active ? l.userData.candela * this.levelOf(l) * LAMP_SCALE : 0;
        if (active) sig.push(l.uuid);
      }
    }
    for (const l of this.byType.rect) {
      const lv = this.levelOf(l);
      const active = lv > 0 && (this.all || this.mode !== 'walk' || this.relevant(l));
      l.visible = lv > 0; l.intensity = active ? l.userData.candela * lv * LAMP_SCALE : 0;
    }
    const s = sig.join();
    const changed = s !== this.sig; this.sig = s;
    return changed;
  }

  relevant(l) {
    if (!this.room) return true;
    const r = l.userData.room;
    return r === this.room || (OPEN[this.room] ?? []).includes(r);
  }

  pick(list, n) {
    const lum = (l) => l.userData.candela;
    if (this.mode === 'walk') {
      return list.filter((l) => this.relevant(l)).sort((a, b) => (b.userData.room === this.room) - (a.userData.room === this.room) || lum(b) - lum(a)).slice(0, n);
    }
    // dollhouse: round-robin over rooms, strongest lamp first
    const rooms = new Map();
    for (const l of [...list].sort((a, b) => lum(b) - lum(a))) {
      const r = l.userData.room ?? '-';
      if (!rooms.has(r)) rooms.set(r, []);
      rooms.get(r).push(l);
    }
    const out = [], queues = [...rooms.values()];
    while (out.length < n && queues.some((q) => q.length)) for (const q of queues) if (q.length && out.length < n) out.push(q.shift());
    return out;
  }
}
