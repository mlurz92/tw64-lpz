// Small modelling toolkit shared by all builders. Units: metres. Objects are built around their
// own origin: x = width (along wall), y = up, z = depth (+z = front, facing into the room).
import * as THREE from 'three';
import { RoundedBoxGeometry, BufferGeometryUtils } from '../../../vendor/three-addons.js';

export { THREE };

export function mesh(geo, mat, pos = [0, 0, 0], rot = null) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(...pos);
  if (rot) m.rotation.set(...rot);
  m.castShadow = true;
  m.receiveShadow = true;
  return m;
}

/** Box with centre at (x, y, z). */
export function box(parent, mat, [w, h, d], [x, y, z] = [0, 0, 0], rot = null) {
  const m = mesh(new THREE.BoxGeometry(w, h, d), mat, [x, y, z], rot);
  parent.add(m);
  return m;
}

/** Box standing on y0 (bottom face), centred in x/z. */
export const boxOn = (parent, mat, [w, h, d], [x, y0, z] = [0, 0, 0], rot = null) => box(parent, mat, [w, h, d], [x, y0 + h / 2, z], rot);

/** Rounded box with centre at (x, y, z). */
export function rbox(parent, mat, [w, h, d], [x, y, z] = [0, 0, 0], r = 0.02, seg = 3, rot = null) {
  r = Math.min(r, w / 2 - 1e-4, h / 2 - 1e-4, d / 2 - 1e-4);
  const m = mesh(new RoundedBoxGeometry(w, h, d, seg, r), mat, [x, y, z], rot);
  parent.add(m);
  return m;
}
export const rboxOn = (parent, mat, [w, h, d], [x, y0, z], r, seg, rot) => rbox(parent, mat, [w, h, d], [x, y0 + h / 2, z], r, seg, rot);

export function cyl(parent, mat, rTop, rBot, h, [x, y0, z] = [0, 0, 0], seg = 48, open = false) {
  const m = mesh(new THREE.CylinderGeometry(rTop, rBot, h, seg, 1, open), mat, [x, y0 + h / 2, z]);
  parent.add(m);
  return m;
}

export function sphere(parent, mat, r, [x, y, z], seg = 32, scale = null) {
  const m = mesh(new THREE.SphereGeometry(r, seg, Math.round(seg * 0.75)), mat, [x, y, z]);
  if (scale) m.scale.set(...scale);
  parent.add(m);
  return m;
}

/** Lathe from a 2D profile [[r, y], ...]. */
export function lathe(parent, mat, profile, [x, y0, z] = [0, 0, 0], seg = 64) {
  const pts = profile.map(([r, y]) => new THREE.Vector2(Math.max(r, 0.0001), y));
  const geo = new THREE.LatheGeometry(pts, seg);
  const m = mesh(geo, mat, [x, y0, z]);
  parent.add(m);
  return m;
}

/** Extrudes a 2D shape (in x/z plan, y up) with optional bevel. shape points: [[x, z], ...]. */
export function extrudePlan(parent, mat, pts, h, y0 = 0, bevel = 0) {
  const shape = new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z)));
  const geo = new THREE.ExtrudeGeometry(shape, {
    depth: h - bevel * 2, bevelEnabled: bevel > 0, bevelThickness: bevel, bevelSize: bevel, bevelSegments: 3, curveSegments: 48,
  });
  geo.rotateX(-Math.PI / 2);
  geo.translate(0, y0 + bevel, 0);
  const m = mesh(geo, mat);
  parent.add(m);
  return m;
}

/** Rounded rectangle / stadium outline for extrusions. */
export function roundedRect(w, d, r, seg = 10) {
  r = Math.min(r, w / 2, d / 2);
  const pts = [];
  const corners = [[w / 2 - r, d / 2 - r, 0], [-w / 2 + r, d / 2 - r, Math.PI / 2], [-w / 2 + r, -d / 2 + r, Math.PI], [w / 2 - r, -d / 2 + r, (3 * Math.PI) / 2]];
  for (const [cx, cz, a0] of corners) for (let i = 0; i <= seg; i++) {
    const a = a0 + (i / seg) * (Math.PI / 2);
    pts.push([cx + Math.cos(a) * r, cz + Math.sin(a) * r]);
  }
  return pts;
}

export function circle(r, seg = 64) {
  return Array.from({ length: seg }, (_, i) => [Math.cos((i / seg) * Math.PI * 2) * r, Math.sin((i / seg) * Math.PI * 2) * r]);
}

/** Tube along a polyline of Vector3. */
export function tube(parent, mat, points, radius, seg = 64, closed = false) {
  const curve = new THREE.CatmullRomCurve3(points.map((p) => new THREE.Vector3(...p)), closed, 'catmullrom', 0.2);
  const m = mesh(new THREE.TubeGeometry(curve, seg, radius, 16, closed), mat);
  parent.add(m);
  return m;
}

/** Merges child meshes per material into one mesh each (keeps lights and flagged meshes). */
export function consolidate(group) {
  group.updateMatrixWorld(true);
  const inv = new THREE.Matrix4().copy(group.matrixWorld).invert();
  const buckets = new Map(), extras = [];
  group.traverse((o) => {
    if (o === group) return;
    const special = o.isLight || o.userData.keep || (o.isMesh && (o.material.userData?.glass || o.material.userData?.mirror || o.material.userData?.emissiveOn || Array.isArray(o.material)));
    if (special) { extras.push(o); return; }
    if (!o.isMesh || extras.some((e) => isDescendant(o, e))) return;
    const g = o.geometry.index ? o.geometry.toNonIndexed() : o.geometry.clone();
    for (const k of Object.keys(g.attributes)) if (!['position', 'normal', 'uv'].includes(k)) g.deleteAttribute(k);
    if (!g.attributes.uv) g.setAttribute('uv', new THREE.BufferAttribute(new Float32Array(g.attributes.position.count * 2), 2));
    g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inv, o.matrixWorld));
    const key = o.material.uuid + (o.castShadow ? 's' : 'n');
    if (!buckets.has(key)) buckets.set(key, { mat: o.material, geos: [], cast: o.castShadow });
    buckets.get(key).geos.push(g);
  });
  const top = extras.filter((e) => !extras.some((f) => f !== e && isDescendant(e, f)));
  for (const e of top) {
    const mtx = new THREE.Matrix4().multiplyMatrices(inv, e.matrixWorld);
    e.removeFromParent();
    mtx.decompose(e.position, e.quaternion, e.scale);
  }
  group.clear();
  for (const { mat, geos, cast } of buckets.values()) {
    const merged = BufferGeometryUtils.mergeGeometries(geos, false);
    const m = new THREE.Mesh(merged, mat);
    m.castShadow = cast; m.receiveShadow = true;
    group.add(m);
  }
  for (const e of top) group.add(e);
  return group;
}

function isDescendant(o, anc) {
  for (let p = o.parent; p; p = p.parent) if (p === anc) return true;
  return false;
}

/** Deterministic PRNG for decor variation. */
export function rng(seed = 1) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
