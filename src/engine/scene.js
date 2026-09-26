// Assembles architecture + furnishing into one scene graph and keeps an item registry that the
// 2D plan, the inventory and picking use.
import * as THREE from 'three';
import { OFFSET, ROOM_HEIGHT, WALLS } from '../core/geometry.js';
import { buildArchitecture } from './builders/architecture.js';
import { consolidate } from './builders/common.js';
import { applyMetricUVs } from './uv.js';
import { furnish, STYLES, DEFAULT_STYLE } from '../data/design.js';
import { themeMaterials } from './materials.js';
import { BufferGeometryUtils } from '../../vendor/three-addons.js';

/**
 * Layer of the per-item furniture meshes once they are merged for rendering: cameras (view,
 * probe, shadow) only see layer 0, the picking ray enables this layer as well.
 */
export const PICK_LAYER = 1;
const MERGE_ATTRS = ['normal', 'position', 'uv'];

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
    // The dense furnishing meshes create repeating light leaks in the directional shadow map
    // across multiple rooms. Keep architectural sun shadows; AO/SSGI supply furniture contact.
    this.furniture.traverse((o) => { if (o.isMesh) o.castShadow = false; });

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

    this.mergeStatic();

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

  /**
   * Draw-call reduction: the static, opaque furniture, window and door meshes are merged per
   * room and material (≈ 600 meshes → ≈ 200 draws). Per-object CPU work of the renderer (matrices, uniforms,
   * bindings) dominates on integrated GPUs; grouping by room keeps frustum culling and the
   * front-to-back order (early depth rejection) per room. The per-item originals stay in the
   * scene graph for picking, selection boxes and footprints, on PICK_LAYER only. Lights, glass,
   * mirrors and transparent parts stay individual objects; emissive lamp parts merge as well
   * (their glow is set on the shared material).
   */
  mergeStatic() {
    this.root.updateMatrixWorld(true);
    const toRoot = new THREE.Matrix4().copy(this.root.matrixWorld).invert(), mtx = new THREE.Matrix4();
    const buckets = new Map();
    const roomOfWall = new Map(WALLS.map((w) => [w.id, w.room]));
    const sources = [
      ...this.items.map((i) => [i.object, i.room]),
      ...this.architecture.getObjectByName('openings').children.map((g) => [g, roomOfWall.get(g.name.replace(/^(window|door)-/, '')) ?? '-']),
    ];
    for (const [object, room] of sources) {
      object.traverse((o) => {
        if (!o.isMesh || o.isInstancedMesh || o.isSkinnedMesh || !o.visible) return;
        const mat = o.material, ud = mat?.userData ?? {};
        if (!mat || Array.isArray(mat) || mat.transparent || ud.glass || ud.mirror || o.userData.mirrorMats) return;
        const g = o.geometry;
        if (g.morphAttributes.position || !g.attributes.position || !g.attributes.normal || mat.vertexColors || mat.aoMap || mat.lightMap) return;
        for (let p = o.parent; p; p = p.parent) if (!p.visible) return;
        mtx.multiplyMatrices(toRoot, o.matrixWorld);
        const part = g.index ? g.toNonIndexed() : g.clone();
        for (const k of Object.keys(part.attributes)) if (!MERGE_ATTRS.includes(k)) part.deleteAttribute(k);
        if (!part.attributes.uv) part.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(part.attributes.position.count * 2), 2));
        part.applyMatrix4(mtx);
        if (mtx.determinant() < 0) flipWinding(part); // mirrored placement: keep front faces outward
        const key = `${room}|${mat.uuid}|${o.castShadow ? 1 : 0}|${o.receiveShadow ? 1 : 0}`;
        if (!buckets.has(key)) buckets.set(key, { mat, cast: o.castShadow, receive: o.receiveShadow, room, parts: [] });
        buckets.get(key).parts.push(part);
        o.layers.set(PICK_LAYER);
      });
    }
    const merged = this.merged = new THREE.Group(); merged.name = 'furniture-merged';
    for (const { mat, cast, receive, room, parts } of buckets.values()) {
      const m = new THREE.Mesh(parts.length > 1 ? BufferGeometryUtils.mergeGeometries(parts, false) : parts[0], mat);
      if (parts.length > 1) parts.forEach((p) => p.dispose());
      m.castShadow = cast; m.receiveShadow = receive;
      m.userData.room = room; m.userData.keepUV = true;
      merged.add(m);
    }
    this.root.add(merged);
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

/** Reverses the triangle winding of a non-indexed geometry (after a mirroring transform). */
function flipWinding(g) {
  for (const a of Object.values(g.attributes)) {
    const n = a.itemSize, arr = a.array, tmp = new arr.constructor(n);
    for (let t = 0; t < a.count; t += 3) {
      const i1 = (t + 1) * n, i2 = (t + 2) * n;
      tmp.set(arr.subarray(i1, i1 + n)); arr.copyWithin(i1, i2, i2 + n); arr.set(tmp, i2);
    }
  }
}

/** Footprint polygon (plan metres) of an item: local x = width, local z = depth. */
export function footprintOf([px, py], yaw, [w, d], round = false) {
  const c = Math.cos(yaw), s = Math.sin(yaw);
  const map = (x, z) => [px + x * c + z * s, py - x * s + z * c];
  if (round) return Array.from({ length: 40 }, (_, i) => { const a = (i / 40) * Math.PI * 2; return map(Math.cos(a) * w / 2, Math.sin(a) * d / 2); });
  return [map(-w / 2, -d / 2), map(w / 2, -d / 2), map(w / 2, d / 2), map(-w / 2, d / 2)];
}
