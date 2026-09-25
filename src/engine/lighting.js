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
const SLOTS = { point: 8, spot: 8 };
const OPEN = { living: ['kitchen'], kitchen: ['living'] };

export class LightRig {
  constructor(apartment) {
    this.lights = apartment.lights;
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

  /** Updates the selection for a camera; returns true if anything changed. */
  update(mode, camPos) {
    const room = mode === 'walk' ? LightRig.roomAt(camPos) ?? this.room : null;
    if (mode === this.mode && room === this.room) return false;
    this.mode = mode; this.room = room;
    return this.apply();
  }

  apply() {
    const on = this.level > 0;
    const sig = [];
    for (const type of ['point', 'spot']) {
      const list = this.byType[type];
      let chosen;
      if (!on) chosen = [];
      else if (this.all) chosen = list;
      else chosen = this.pick(list, SLOTS[type]);
      const set = new Set(chosen);
      // fixed slot count: fill with unused lights at zero intensity
      const slots = !on ? 0 : this.all ? list.length : Math.min(SLOTS[type], list.length);
      let filler = slots - chosen.length;
      for (const l of list) {
        const active = set.has(l);
        const visible = active || (filler > 0 && !set.has(l) && filler--);
        l.visible = !!visible;
        l.intensity = active ? l.userData.candela * this.level * LAMP_SCALE : 0;
        if (active) sig.push(l.uuid);
      }
    }
    for (const l of this.byType.rect) {
      const active = on && (this.all || this.mode !== 'walk' || this.relevant(l));
      l.visible = on; l.intensity = active ? l.userData.candela * this.level * LAMP_SCALE : 0;
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
