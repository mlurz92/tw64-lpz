// Assembles architecture + furnishing into one scene graph and keeps an item registry that the
// 2D plan, the inventory and picking use.
import * as THREE from 'three';
import { OFFSET, ROOM_HEIGHT } from '../core/geometry.js';
import { buildArchitecture } from './builders/architecture.js';
import { consolidate } from './builders/common.js';
import { applyMetricUVs } from './uv.js';
import { furnish, STYLES, DEFAULT_STYLE } from '../data/design.js';
import { themeMaterials } from './materials.js';

export class ApartmentScene {
  constructor(M, lib, styleId = DEFAULT_STYLE) {
    this.style = STYLES[styleId] ?? STYLES[DEFAULT_STYLE];
    this.baseM = M;
    this.M = themeMaterials(M, this.style.theme); this.lib = lib;
    this.root = new THREE.Group(); this.root.name = 'apartment';
    this.items = [];
    this.byRoom = new Map();
    this.lights = [];
  }

  build() {
    const arch = buildArchitecture(this.M, { cut: ROOM_HEIGHT, finish: this.style.finish, wallOverride: this.style.wallOverride });
    this.architecture = arch.root;
    this.wallInfo = arch.info;
    this.root.add(arch.root);

    this.furniture = new THREE.Group(); this.furniture.name = 'furniture';
    this.root.add(this.furniture);
    furnish({ M: this.M, lib: this.lib, style: this.style, add: (meta, obj, place) => this.add(meta, obj, place) });
    this.furniture.traverse((o) => { if (o.isMesh) o.castShadow = o.userData.itemId === 'plant-living'; });

    // Safety net: one material per mesh (picking, mirrors and the light budget rely on it).
    const multi = [];
    this.root.traverse((o) => { if (o.isMesh && Array.isArray(o.material)) multi.push(o); });
    for (const m of multi) {
      for (const grp of m.geometry.groups) {
        const g = m.geometry.clone(); g.clearGroups();
        g.setIndex(null);
        const src = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry;
        for (const k of Object.keys(src.attributes)) {
          const a = src.attributes[k];
          g.setAttribute(k, new THREE.BufferAttribute(a.array.slice(grp.start * a.itemSize, (grp.start + grp.count) * a.itemSize), a.itemSize));
        }
        const part = new THREE.Mesh(g, m.material[grp.materialIndex]);
        part.position.copy(m.position); part.quaternion.copy(m.quaternion); part.scale.copy(m.scale);
        Object.assign(part.userData, m.userData);
        m.parent.add(part);
      }
      m.removeFromParent();
    }

    this.root.traverse((o) => {
      if (o.isLight && o.userData.lamp) { o.userData.room = this.items.find((i) => i.id === o.userData.itemId)?.room ?? null; this.lights.push(o); }
      if (o.isMesh && o.material?.userData?.glass) { o.castShadow = false; }
    });
    return this;
  }

  add(meta, obj, place) {
    if (!obj) return;
    applyMetricUVs(obj);
    const g = new THREE.Group();
    g.add(obj);
    consolidate(g);
    g.name = meta.id;
    const [x, z] = [place.pos[0] - OFFSET.x, place.pos[1] - OFFSET.y];
    g.position.set(x, place.y ?? 0, z);
    g.rotation.y = place.yaw ?? 0;
    g.userData.item = meta;
    g.traverse((o) => { o.userData.itemId = meta.id; });
    this.furniture.add(g);
    const yaw = place.yaw ?? 0;
    // anchor 'back': object origin sits on the wall, footprint extends forward by its depth
    const off = meta.anchor === 'back' && meta.size ? meta.size[1] / 2 : 0;
    const fpPos = [place.pos[0] + Math.sin(yaw) * off, place.pos[1] + Math.cos(yaw) * off];
    const footprint = meta.size ? footprintOf(fpPos, yaw, meta.size, meta.round) : null;
    const rec = { ...meta, object: g, pos: place.pos, yaw, elevation: place.y ?? 0, footprint };
    this.items.push(rec);
    if (!this.byRoom.has(meta.room)) this.byRoom.set(meta.room, []);
    this.byRoom.get(meta.room).push(rec);
  }

  setCeilingsVisible(v) { this.architecture.getObjectByName('ceilings').visible = v; }

  /** Frees GPU geometry (materials/textures are shared between styles and stay cached). */
  dispose() {
    this.root.traverse((o) => {
      if (o.isMesh && !o.geometry.userData.shared) o.geometry.dispose();
      if (o.isLight && o.shadow?.map) o.shadow.map.dispose();
    });
    this.root.removeFromParent();
  }
}

/** Footprint polygon (plan metres) of an item: local x = width, local z = depth. */
export function footprintOf([px, py], yaw, [w, d], round = false) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const map = (x, z) => [px + x * c + z * s, py - x * s + z * c];
  if (round) return Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2; return map(Math.cos(a) * w / 2, Math.sin(a) * d / 2); });
  return [map(-w / 2, -d / 2), map(w / 2, -d / 2), map(w / 2, d / 2), map(-w / 2, d / 2)];
}
