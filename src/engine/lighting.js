// Light budget for real-time rendering.
//
// Forward rendering evaluates every visible light for every shaded pixel, and lights without
// shadow maps shine through walls. The rig therefore drives a FIXED set of proxy lights ("slots")
// and copies into them the lamps that matter for the current view: in walk mode the lamps of the
// room the camera stands in (plus rooms openly connected to it), in the dollhouse view the
// strongest lamps per room. Unused slots keep zero intensity.
//
// Why proxies instead of toggling the lamps themselves: the renderer keys every compiled material
// on the identity of the visible lights. Showing other lamp objects – another room, another mood,
// dollhouse ↔ walk – used to rebuild the node graph of all ≈ 300 draw objects (a visible hitch on
// every room change, worst on phones). The slot lights never change, so the shaders stay valid
// for every mood, room and camera mode; only uniforms (position, colour, intensity) move.
// The lamps of the apartment stay invisible data sources; the path tracer still gets every lamp.
import * as THREE from 'three';
import { ROOMS, pointInPolygon, OFFSET } from '../core/geometry.js';

export const LAMP_SCALE = 0.08;
/** Windowless rooms: their lamps stay on (dimmed) even in daylight, as they would in reality. */
export const INTERIOR_ROOMS = new Set(['bath', 'guestbath', 'utility']);
export const INTERIOR_LEVEL = 0.8;
/**
 * Light slots per quality preset. Every slot costs a full BRDF evaluation in every shaded pixel,
 * so integrated GPUs ("Mittel") and phones ("Schnell") get fewer; walk mode only needs the lamps
 * of one room anyway.
 */
const SLOTS = { high: { point: 8, spot: 8, rect: 2 }, medium: { point: 5, spot: 5, rect: 1 }, low: { point: 3, spot: 3, rect: 1 } };
export const OPEN = { living: ['kitchen'], kitchen: ['living'] };

const _p = new THREE.Vector3(), _q = new THREE.Quaternion(), _s = new THREE.Vector3();

/** One persistent proxy-light set per quality preset (kept for the lifetime of the viewer). */
export class LightSlots {
  constructor(scene) { this.scene = scene; this.sets = new Map(); this.active = null; }

  use(quality) {
    const q = SLOTS[quality] ? quality : 'high';
    let set = this.sets.get(q);
    if (!set) this.sets.set(q, (set = makeSet(SLOTS[q])));
    if (this.active !== set) {
      this.active?.group.removeFromParent();
      this.scene.add(set.group);
      this.active = set;
    }
    return set;
  }
}

function makeSet({ point, spot, rect }) {
  const group = new THREE.Group();
  group.name = 'light-slots';
  const park = (l) => { l.intensity = 0; l.position.set(0, -50, 0); group.add(l); return l; };
  return {
    group,
    point: Array.from({ length: point }, () => park(new THREE.PointLight('#ffffff', 0, 6, 2))),
    spot: Array.from({ length: spot }, () => { const l = park(new THREE.SpotLight('#ffffff', 0, 7, 0.9, 0.6, 2)); group.add(l.target); return l; }),
    rect: Array.from({ length: rect }, () => park(new THREE.RectAreaLight('#ffffff', 0, 1, 0.03))),
  };
}

export class LightRig {
  constructor(apartment, slots, quality = 'high') {
    this.lights = apartment.lights;
    this.slotSource = slots;
    this.level = 0;
    this.mode = 'orbit';
    this.room = null;
    this.byType = { point: this.lights.filter((l) => l.isPointLight), spot: this.lights.filter((l) => l.isSpotLight), rect: this.lights.filter((l) => l.isRectAreaLight) };
    // the lamps themselves never render in the rasteriser (see header)
    for (const l of this.lights) { l.visible = false; l.intensity = 0; }
    this.setQuality(quality);
  }

  /** Room id at a world position (null outside). */
  static roomAt(pos) {
    const p = [pos.x + OFFSET.x, pos.z + OFFSET.y];
    return ROOMS.find((r) => pointInPolygon(p, r.points))?.id ?? null;
  }

  setLevel(level) { this.level = level; return this.apply(); }
  /** Switches to the slot set of a preset (one shader rebuild, only on a preset change). */
  setQuality(q) { this.slots = this.slotSource.use(q); this.sig = null; return this.apply(); }

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
    for (const type of ['point', 'spot', 'rect']) {
      const slots = this.slots[type];
      const list = this.byType[type].filter((l) => this.levelOf(l) > 0 && (type !== 'rect' || this.mode !== 'walk' || this.relevant(l)));
      const chosen = type === 'rect' ? list.slice(0, slots.length) : this.pick(list, slots.length);
      slots.forEach((slot, i) => {
        const l = chosen[i];
        if (!l) { slot.intensity = 0; return; }
        copyLight(slot, l);
        slot.intensity = l.userData.candela * this.levelOf(l) * LAMP_SCALE;
        sig.push(l.uuid, slot.intensity.toFixed(4));
      });
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

/** Copies the photometric and spatial parameters of a lamp into a slot light (world space). */
function copyLight(slot, l) {
  l.updateWorldMatrix(true, false);
  l.matrixWorld.decompose(_p, _q, _s);
  slot.position.copy(_p);
  slot.color.copy(l.color);
  if (slot.isRectAreaLight) {
    slot.quaternion.copy(_q);
    slot.width = l.width * _s.x; slot.height = l.height * _s.y;
    return;
  }
  slot.distance = l.distance; slot.decay = l.decay;
  if (slot.isSpotLight) {
    slot.angle = l.angle; slot.penumbra = l.penumbra;
    l.target.updateWorldMatrix(true, false);
    slot.target.position.setFromMatrixPosition(l.target.matrixWorld);
  }
}
