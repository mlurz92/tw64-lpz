// Surroundings of WE 13 (3rd floor, finished floor +9.28 m): the park in front of the window
// facades, the entrance street with a row of period houses, a distant city edge and the building
// itself below and above the flat. Real geometry instead of a ground-level panorama, so the view
// out of the windows has the correct height and parallax. Shown in walk mode only.
// Plan coordinates (metres, y down) → world X = x − OFFSET.x, Z = y − OFFSET.y, Y = height.
import * as THREE from 'three';
import { ROOMS, WALLS, OFFSET, EXTERIOR_WALL, FLOOR_LEVEL, STOREY, APARTMENT_BOUNDS, WINDOW_HEAD, ROOM_HEIGHT, wallThickness, add, mul } from '../../core/geometry.js';
import { BufferGeometryUtils } from '../../../vendor/three-addons.js';
import { metricUV } from '../uv.js';
import { offsetPolygon, buildBalconies } from './architecture.js';
import { rng } from './common.js';

const GROUND = -FLOOR_LEVEL;
const W = ([x, y]) => [x - OFFSET.x, y - OFFSET.y];
const B = APARTMENT_BOUNDS;
const CENTER = [(B.minX + B.maxX) / 2, (B.minY + B.maxY) / 2];
/** Entrance street runs along the north side (plan −y); the windows face the park (+x/+y). */
const STREET = { y0: B.minY - 21, y1: B.minY - 9 };

function meshOf(geo, mat, { cast = false, receive = true } = {}) {
  const m = new THREE.Mesh(geo, mat); m.castShadow = cast; m.receiveShadow = receive; m.userData.keepUV = true; return m;
}
function uvGeo(geo, mat) { return metricUV(geo, mat.userData.uv?.size ?? 2); }

/** Extruded plan polygon between heights y0 and y1. */
function prismGeo(pts, y0, y1) {
  const shape = new THREE.Shape(pts.map((p) => { const [x, z] = W(p); return new THREE.Vector2(x, -z); }));
  const g = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: false });
  g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
  return g;
}

/** Flat ribbon along a plan polyline (paths, roads). */
function ribbonGeo(planPts, width, y) {
  const curve = new THREE.CatmullRomCurve3(planPts.map((p) => { const [x, z] = W(p); return new THREE.Vector3(x, y, z); }));
  const n = Math.max(40, Math.round(curve.getLength() / 1.5)), pos = [];
  const prev = [];
  for (let i = 0; i <= n; i++) {
    const p = curve.getPointAt(i / n), t = curve.getTangentAt(i / n), s = new THREE.Vector3(-t.z, 0, t.x).normalize().multiplyScalar(width / 2);
    const a = p.clone().add(s), b = p.clone().sub(s);
    if (prev.length) pos.push(...prev[0].toArray(), ...a.toArray(), ...prev[1].toArray(), ...prev[1].toArray(), ...a.toArray(), ...b.toArray());
    prev[0] = a; prev[1] = b;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
  g.computeVertexNormals();
  for (let i = 0; i < g.attributes.normal.count; i++) g.attributes.normal.setXYZ(i, 0, 1, 0);
  return g;
}

// ------------------------------------------------------------------ trees
/**
 * Deciduous crown (linden/maple habit): 11–15 small displaced lobes inside an ellipsoid, unit
 * radius ≈ 1, base at y = 0, height ≈ 2. Many small lobes read as foliage masses, not blobs.
 */
function crownGeo(seed) {
  const r = rng(seed), parts = [];
  const k = 10 + Math.floor(r() * 4);
  for (let i = 0; i < k; i++) {
    const g = new THREE.IcosahedronGeometry(0.3 + r() * 0.2, 2);
    const p = g.attributes.position, nrm = new Float32Array(p.count * 3), ph = r() * 10;
    for (let j = 0; j < p.count; j++) {
      const x = p.getX(j), y = p.getY(j), z = p.getZ(j), l = Math.hypot(x, y, z);
      const d = 1 + 0.2 * Math.sin(9 * x + ph) * Math.sin(8 * y + ph * 0.7) * Math.sin(9 * z + ph * 1.3);
      p.setXYZ(j, x * d, y * d, z * d);
      nrm.set([x / l, y / l, z / l], j * 3); // spherical normals: soft, non-faceted foliage masses
    }
    g.setAttribute('normal', new THREE.BufferAttribute(nrm, 3));
    // lobe centre inside an ellipsoid; the lower lobes spread wider (open, domed habit)
    const a = r() * Math.PI * 2, t = r(), h = 0.35 + t * 1.3, spread = (1 - Math.pow(t - 0.35, 2) * 1.6) * (0.35 + r() * 0.45);
    g.translate(Math.cos(a) * spread, h, Math.sin(a) * spread);
    parts.push(g.index ? g.toNonIndexed() : g);
  }
  return BufferGeometryUtils.mergeGeometries(parts, false);
}

function trunkGeo() {
  const g = new THREE.CylinderGeometry(0.1, 0.16, 1, 9, 1, true);
  g.translate(0, 0.5, 0);
  return g;
}

/** Scatter of park trees (Poisson-like), outside building, street and path corridors. */
function treePositions(paths, seed = 5) {
  const r = rng(seed), out = [];
  const keepOut = (x, y) => {
    // open lawn in front of the window facades (east/south): trees frame the view, never block it
    if (x > B.minX - 7 && x < B.maxX + 16 && y > B.minY - 7 && y < B.maxY + 16) return true;
    if (y > STREET.y0 - 1 && y < STREET.y1 + 1) return true;
    return paths.some((pts) => pts.some(([px, py]) => Math.hypot(px - x, py - y) < 3.2));
  };
  for (let tries = 0; tries < 6000 && out.length < 150; tries++) {
    const a = r() * Math.PI * 2, d = 12 + Math.pow(r(), 0.8) * 150;
    const x = CENTER[0] + Math.cos(a) * d, y = CENTER[1] + Math.sin(a) * d;
    if (keepOut(x, y)) continue;
    const minD = y < STREET.y0 ? 9 : 6.5;
    if (out.some((p) => Math.hypot(p[0] - x, p[1] - y) < minD)) continue;
    out.push([x, y, r()]);
  }
  // street trees (Allee) on both sidewalks
  for (let x = CENTER[0] - 150; x < CENTER[0] + 150; x += 11) for (const y of [STREET.y0 + 1.0, STREET.y1 - 1.0]) out.push([x + r() * 2, y, r()]);
  return out;
}

function buildTrees(M, paths) {
  const g = new THREE.Group(); g.name = 'trees';
  const pos = treePositions(paths);
  const variants = [crownGeo(11), crownGeo(23), crownGeo(37)].map((c) => uvGeo(c, M.foliage));
  const trunk = trunkGeo();
  // late-summer greens with the first yellowing (September)
  const tints = ['#b9d196', '#a9c98c', '#c4d89e', '#b2cf96', '#d4d69a', '#a3c28a'].map((c) => new THREE.Color(c));
  const byV = variants.map(() => []);
  pos.forEach((p, i) => byV[i % variants.length].push(p));
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  byV.forEach((list, vi) => {
    const crowns = new THREE.InstancedMesh(variants[vi], M.foliage, list.length);
    const trunks = new THREE.InstancedMesh(trunk, M.bark, list.length);
    list.forEach(([x, y, k], i) => {
      const [wx, wz] = W([x, y]);
      const h = 10 + k * 7.5, cr = 3.0 + k * 2.2, base = h * (0.24 + 0.05 * ((i * 7) % 3));
      e.set(0, k * 6.28, 0); q.setFromEuler(e);
      m.compose(new THREE.Vector3(wx, GROUND, wz), q, new THREE.Vector3(0.9 + k * 0.6, base + cr * 0.4, 0.9 + k * 0.6)); trunks.setMatrixAt(i, m);
      m.compose(new THREE.Vector3(wx, GROUND + base, wz), q, new THREE.Vector3(cr, (h - base) / 2.0, cr)); crowns.setMatrixAt(i, m);
      crowns.setColorAt(i, tints[(i * 5 + vi) % tints.length]);
    });
    crowns.castShadow = trunks.castShadow = false;
    crowns.receiveShadow = trunks.receiveShadow = false;
    g.add(crowns, trunks);
  });
  return g;
}

// ------------------------------------------------------------------ building below / above
/** Lower storeys (EG–2. OG) and the storey above: facade mass, slab bands, windows, balconies. */
function buildBuilding(M) {
  const g = new THREE.Group(); g.name = 'building';
  const outline = ROOMS.map((r) => offsetPolygon(r.points, EXTERIOR_WALL));
  const top = ROOM_HEIGHT + 0.28, upperTop = top + STOREY;
  const facade = [], bands = [], glass = [];
  for (const pts of outline) {
    facade.push(prismGeo(pts, GROUND, -0.28), prismGeo(pts, top, upperTop));
    for (let k = 0; k <= 3; k++) bands.push(prismGeo(offsetPolygon(pts, 0.03), -k * STOREY - 0.3, -k * STOREY));
    bands.push(prismGeo(offsetPolygon(pts, 0.03), top - 0.02, top + 0.25), prismGeo(offsetPolygon(pts, 0.05), upperTop, upperTop + 0.45));
  }
  // windows of the other storeys at the same positions as in WE 13
  for (const w of WALLS) {
    const { t } = wallThickness(w);
    for (const o of w.openings) {
      if (o.type === 'door') continue;
      const c = add(add(w.a, mul(w.dir, (o.u0 + o.u1) / 2)), mul(w.n, -t - 0.01));
      const [x, z] = W(c), width = o.u1 - o.u0, yaw = Math.atan2(-w.dir[1], w.dir[0]);
      for (const y0 of [-3 * STOREY, -2 * STOREY, -STOREY, top + 0.05]) {
        const pg = new THREE.PlaneGeometry(width, WINDOW_HEAD);
        pg.rotateY(Math.PI); pg.rotateY(yaw); pg.translate(x, y0 + WINDOW_HEAD / 2 + (y0 < 0 ? 0.02 : 0), z);
        glass.push(pg);
      }
    }
  }
  const merge = (list) => BufferGeometryUtils.mergeGeometries(list.map((x) => (x.index ? x.toNonIndexed() : x)), false);
  g.add(meshOf(uvGeo(merge(facade), M.facade), M.facade, { cast: true }));
  g.add(meshOf(uvGeo(merge(bands), M.facadeBand), M.facadeBand));
  const gl = meshOf(merge(glass), M.windowDark); gl.material = M.windowDark; g.add(gl);
  // stacked balconies (same outline and balustrade as WE 13) below and above
  for (const y of [-3 * STOREY, -2 * STOREY, -STOREY, STOREY]) {
    const b = buildBalconies(M); b.position.y = y; g.add(b);
    b.traverse((o) => { if (o.isMesh) o.geometry.userData.shared = true; });
  }
  return g;
}

// ------------------------------------------------------------------ street & city edge
/** Facade texture for the period houses (plaster, window grid, cornices). */
function facadeTexture() {
  const c = document.createElement('canvas'); c.width = 256; c.height = 256;
  const x = c.getContext('2d');
  x.fillStyle = '#ffffff'; x.fillRect(0, 0, 256, 256);
  x.fillStyle = '#d9d4cb'; for (let f = 0; f < 5; f++) x.fillRect(0, f * 51 + 46, 256, 4);
  for (let f = 0; f < 5; f++) for (let i = 0; i < 6; i++) {
    x.fillStyle = '#2c3137'; x.fillRect(i * 42.6 + 13, f * 51 + 12, 17, 28);
    x.fillStyle = '#e8e3da'; x.fillRect(i * 42.6 + 11, f * 51 + 9, 21, 3);
  }
  const t = new THREE.CanvasTexture(c); t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 8;
  return t;
}

function buildCity(M) {
  const g = new THREE.Group(); g.name = 'city';
  const r = rng(77);
  const fac = new THREE.MeshStandardMaterial({ map: facadeTexture(), roughness: 0.9 });
  const roof = new THREE.MeshStandardMaterial({ color: '#6f5d52', roughness: 0.85 });
  const colors = ['#e9dfcf', '#dccfbb', '#e6d6c3', '#cfc3b2', '#e3ddd2', '#d8c4ae', '#e8e2d6'].map((c) => new THREE.Color(c));
  const houses = [];
  // row of period houses across the street (continuous, 5 storeys)
  for (let x = CENTER[0] - 170; x < CENTER[0] + 170;) {
    const w = 14 + r() * 10; houses.push([x + w / 2, STREET.y0 - 7 - 0.5, w, 13, 16 + r() * 3]); x += w;
  }
  // distant city edge around the park
  for (let i = 0; i < 70; i++) {
    const a = (i / 70) * Math.PI * 2 + r() * 0.05, d = 175 + r() * 80;
    const y = CENTER[1] + Math.sin(a) * d;
    if (y < STREET.y0 - 20) continue;
    houses.push([CENTER[0] + Math.cos(a) * d, y, 18 + r() * 14, 14 + r() * 6, 14 + r() * 9, a]);
  }
  const box = new THREE.BoxGeometry(1, 1, 1); box.translate(0, 0.5, 0);
  const body = new THREE.InstancedMesh(box, fac, houses.length), caps = new THREE.InstancedMesh(box, roof, houses.length);
  const m = new THREE.Matrix4(), q = new THREE.Quaternion(), e = new THREE.Euler();
  houses.forEach(([x, y, w, d, h, a = Math.PI / 2], i) => {
    const [wx, wz] = W([x, y]);
    e.set(0, -a + Math.PI / 2, 0); q.setFromEuler(e);
    m.compose(new THREE.Vector3(wx, GROUND, wz), q, new THREE.Vector3(w, h, d)); body.setMatrixAt(i, m);
    m.compose(new THREE.Vector3(wx, GROUND + h, wz), q, new THREE.Vector3(w + 0.4, 1.4, d * 0.8)); caps.setMatrixAt(i, m);
    body.setColorAt(i, colors[i % colors.length]);
  });
  body.receiveShadow = caps.receiveShadow = false;
  g.add(body, caps);
  // street: asphalt, sidewalks, lamps
  const x0 = CENTER[0] - 200, x1 = CENTER[0] + 200;
  g.add(meshOf(uvGeo(ribbonGeo([[x0, (STREET.y0 + STREET.y1) / 2], [x1, (STREET.y0 + STREET.y1) / 2]], 7, GROUND + 0.02), M.asphalt), M.asphalt));
  for (const y of [STREET.y0 + 0.5, STREET.y1 - 0.5]) g.add(meshOf(uvGeo(ribbonGeo([[x0, y], [x1, y]], 3, GROUND + 0.04), M.pavement), M.pavement));
  return g;
}

// ------------------------------------------------------------------ park
const PATHS = [
  // main promenade in front of the window facade, loops and a cross path
  [[CENTER[0] - 140, B.maxY + 16], [CENTER[0] - 60, B.maxY + 11], [CENTER[0], B.maxY + 14], [CENTER[0] + 55, B.maxY + 9], [CENTER[0] + 140, B.maxY + 18]],
  [[B.maxX + 14, B.minY - 6], [B.maxX + 11, CENTER[1] - 10], [B.maxX + 18, CENTER[1] + 12], [B.maxX + 30, B.maxY + 12], [B.maxX + 70, B.maxY + 40]],
  [[CENTER[0] - 40, B.maxY + 12], [CENTER[0] - 20, B.maxY + 45], [CENTER[0] + 30, B.maxY + 70], [CENTER[0] + 90, B.maxY + 80]],
];

function buildPark(M) {
  const g = new THREE.Group(); g.name = 'park';
  const lawn = new THREE.CircleGeometry(520, 160); lawn.rotateX(-Math.PI / 2);
  lawn.translate(...(() => { const [x, z] = W(CENTER); return [x, GROUND, z]; })());
  g.add(meshOf(uvGeo(lawn.index ? lawn.toNonIndexed() : lawn, M.grass), M.grass));
  const pathPts = PATHS.map((p) => new THREE.CatmullRomCurve3(p.map(([x, y]) => new THREE.Vector3(x, 0, y))).getSpacedPoints(120).map((v) => [v.x, v.z]));
  for (const p of PATHS) g.add(meshOf(uvGeo(ribbonGeo(p, 3.2, GROUND + 0.015), M.gravelPath), M.gravelPath));
  // forecourt / pavement around the building
  const court = ROOMS.map((r) => prismGeo(offsetPolygon(r.points, EXTERIOR_WALL + 2.2), GROUND, GROUND + 0.03));
  g.add(meshOf(uvGeo(BufferGeometryUtils.mergeGeometries(court.map((c) => c.index ? c.toNonIndexed() : c), false), M.pavement), M.pavement));
  g.add(buildTrees(M, pathPts));
  // park lamps along the promenade (lit in the evening)
  const lamps = new THREE.Group();
  const curve = new THREE.CatmullRomCurve3(PATHS[0].map(([x, y]) => new THREE.Vector3(x, 0, y)));
  for (let i = 1; i < 14; i++) {
    const p = curve.getPointAt(i / 14), [x, z] = W([p.x, p.z + 2.2]);
    const pole = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.07, 4.2, 8), M.frame); pole.position.set(x, GROUND + 2.1, z);
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.22, 16, 12), M.parkLamp); head.position.set(x, GROUND + 4.35, z);
    lamps.add(pole, head);
  }
  g.add(lamps);
  return { group: g, pathPts };
}

/** Builds the whole outdoor scene once (independent of the furnishing style). */
export function buildSurroundings(M) {
  const root = new THREE.Group(); root.name = 'surroundings';
  root.add(buildPark(M).group, buildBuilding(M), buildCity(M));
  root.traverse((o) => { if (o.isMesh) o.userData.outdoor = true; });
  return root;
}

export const SURROUNDINGS_INFO = { groundLevel: GROUND, storey: STOREY };
