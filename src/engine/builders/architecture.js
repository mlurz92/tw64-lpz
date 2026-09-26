// Architecture: walls with real openings, reveals, section caps, floors, ceilings, skirting,
// windows, sliding doors, interior doors, balconies and the floor slab.
import * as THREE from 'three';
import {
  ROOMS, WALLS, BALCONIES, ROOM_HEIGHT, DOOR_HEIGHT, WINDOW_HEAD, OFFSET, EXTERIOR_WALL, wallThickness, add, mul, sub, dot, len, livingParts, polygonArea,
} from '../../core/geometry.js';
import { box, boxOn, mesh, consolidate } from './common.js';
import { metricUV } from '../uv.js';

const W = ([x, y]) => [x - OFFSET.x, y - OFFSET.y];
const SLAB = 0.28;

/** Room finishes (walls / floors). Plank direction as plan vector along the plank length. */
export const FINISH = {
  living: { wall: 'wall', floor: 'floorOak', skirting: true },
  kitchen: { wall: 'wall', floor: 'floorOak', skirting: true, dir: [-0.1395, 0.9902] },
  bedroom: { wall: 'wallDeep', floor: 'floorOak', skirting: true, dir: [-0.1395, 0.9902] },
  office: { wall: 'wall', floor: 'floorOak', skirting: true, dir: [1, 0] },
  bath: { wall: 'tileWall', floor: 'tileFloor', skirting: false, dir: [1, 0] },
  guestbath: { wall: 'tileWall', floor: 'tileFloor', skirting: false, dir: [1, 0] },
  utility: { wall: 'tileWall', floor: 'tileFloor', skirting: false, dir: [1, 0] },
};

/** Feature walls (limewash accents in the moodboard colours). */
export const WALL_OVERRIDE = { W07: 'wallAccent', W23: 'wallSage' };

class Buckets {
  constructor() { this.map = new Map(); }
  get(key) { if (!this.map.has(key)) this.map.set(key, { pos: [], nor: [] }); return this.map.get(key); }
  /** Quad from 4 world points [x,y,z]; oriented to face `normal`. */
  quad(key, p, normal) {
    const b = this.get(key);
    const e1 = new THREE.Vector3().subVectors(new THREE.Vector3(...p[1]), new THREE.Vector3(...p[0]));
    const e2 = new THREE.Vector3().subVectors(new THREE.Vector3(...p[2]), new THREE.Vector3(...p[0]));
    const c = new THREE.Vector3().crossVectors(e1, e2);
    const pts = c.dot(new THREE.Vector3(...normal)) < 0 ? [p[0], p[3], p[2], p[1]] : p;
    for (const i of [0, 1, 2, 0, 2, 3]) { b.pos.push(...pts[i]); b.nor.push(...normal); }
  }
  meshes(materials, opts = {}) {
    const out = [];
    for (const [key, { pos, nor }] of this.map) {
      let g = new THREE.BufferGeometry();
      g.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3));
      g.setAttribute('normal', new THREE.Float32BufferAttribute(nor, 3));
      const mat = materials[key];
      if (mat.userData.uv) g = metricUV(g, mat.userData.uv.size, mat.userData.uv.grain);
      else g.setAttribute('uv', new THREE.Float32BufferAttribute(new Float32Array((pos.length / 3) * 2), 2));
      const m = new THREE.Mesh(g, mat);
      m.castShadow = opts.cast ?? true; m.receiveShadow = true;
      m.userData.keepUV = true;
      m.name = key;
      out.push(m);
    }
    return out;
  }
}

/** Adds a prism (u0..u1 along wall, v0..v1 across, y0..y1) of a wall frame to buckets. */
function prism(bk, w, u0, u1, v0, v1, y0, y1, faces) {
  const P = (u, v) => add(add(w.a, mul(w.dir, u)), mul(w.n, v));
  const V = (u, v, y) => { const [x, z] = W(P(u, v)); return [x, y, z]; };
  const n3 = [w.n[0], 0, w.n[1]], d3 = [w.dir[0], 0, w.dir[1]];
  if (faces.inner) bk.quad(faces.inner, [V(u0, v1, y0), V(u1, v1, y0), V(u1, v1, y1), V(u0, v1, y1)], n3);
  if (faces.outer) bk.quad(faces.outer, [V(u0, v0, y0), V(u1, v0, y0), V(u1, v0, y1), V(u0, v0, y1)], mul3(n3, -1));
  if (faces.ends && faces.end0 !== false) bk.quad(faces.ends, [V(u0, v0, y0), V(u0, v1, y0), V(u0, v1, y1), V(u0, v0, y1)], mul3(d3, -1));
  if (faces.ends && faces.end1 !== false) bk.quad(faces.ends, [V(u1, v0, y0), V(u1, v1, y0), V(u1, v1, y1), V(u1, v0, y1)], d3);
  if (faces.top) bk.quad(faces.top, [V(u0, v0, y1), V(u1, v0, y1), V(u1, v1, y1), V(u0, v1, y1)], [0, 1, 0]);
  if (faces.bottom) bk.quad(faces.bottom, [V(u0, v0, y0), V(u1, v0, y0), V(u1, v1, y0), V(u0, v1, y0)], [0, -1, 0]);
}
const mul3 = (v, s) => v.map((c) => c * s);

function openingHead(o) { return o.type === 'door' ? DOOR_HEIGHT : WINDOW_HEAD; }

/** Prepares wall metadata: thickness, corner extension, merged door identity. */
export function analyseWalls() {
  const info = new Map();
  for (const r of ROOMS) {
    const walls = WALLS.filter((w) => w.room === r.id);
    const byEdge = new Map(walls.map((w) => [w.edge, w]));
    const nE = r.points.length;
    for (const w of walls) {
      const th = wallThickness(w);
      const prev = byEdge.get((w.edge - 1 + nE) % nE);
      const next = byEdge.get((w.edge + 1) % nE);
      let extStart = 0, extEnd = 0;
      if (prev) {
        const cross = prev.dir[0] * w.dir[1] - prev.dir[1] * w.dir[0];
        if (cross > 1e-3) extStart = wallThickness(prev).t;
      }
      // convex corner at the end: overlap 1 cm into the next wall's body (closes hairline cracks)
      if (next && w.dir[0] * next.dir[1] - w.dir[1] * next.dir[0] > 1e-3) extEnd = 0.01;
      info.set(w.id, { ...th, extStart, extEnd, hasPrev: !!prev, hasNext: !!next });
    }
  }
  // Doors appearing on both sides of a partition are rendered once.
  const doors = [];
  for (const w of WALLS) w.openings.forEach((o, i) => {
    const c = add(w.a, mul(w.dir, (o.u0 + o.u1) / 2));
    const dup = doors.find((d) => len(sub(d.c, c)) < 0.45 && d.w.room !== w.room);
    const rec = { w, o, i, c, primary: !dup, twin: dup || null };
    if (dup) dup.twin = rec;
    doors.push(rec);
  });
  return { info, openings: doors };
}

export function buildArchitecture(M, { cut = ROOM_HEIGHT, finish = FINISH, wallOverride = WALL_OVERRIDE } = {}) {
  const FINISH = finish, WALL_OVERRIDE = wallOverride;
  const root = new THREE.Group(); root.name = 'architecture';
  const { info, openings } = analyseWalls();
  const H = ROOM_HEIGHT, top = Math.min(cut, H);

  // ---------------------------------------------------------------- walls
  const bk = new Buckets();
  for (const w of WALLS) {
    const { t, exterior, extStart, extEnd, hasPrev, hasNext } = info.get(w.id);
    const fin = WALL_OVERRIDE[w.id] ?? FINISH[w.room].wall;
    const outer = exterior ? 'facade' : fin;
    // Walls reach 2 cm above the ceiling plane so the wall/ceiling joint has no hairline crack.
    const wTop = top >= H - 1e-6 ? H + 0.02 : top;
    const faces = (y0, y1, end0, end1) => ({ inner: fin, outer, ends: fin, end0, end1, top: y1 >= wTop - 1e-6 ? 'wallCap' : null, bottom: y0 > 0 ? fin : null });
    const cuts = w.openings.map((o) => ({ ...o, head: openingHead(o) })).sort((p, q) => p.u0 - q.u0);
    const start = -extStart, end = w.length + extEnd;
    let u = start;
    // End caps only at openings (reveals); caps at corners would be coplanar with the
    // neighbouring wall face and flicker.
    const solid = (u0, u1) => { if (u1 - u0 > 1e-4) prism(bk, w, u0, u1, -t, 0, -SLAB, wTop, faces(0, wTop, u0 !== start || !hasPrev, u1 !== end || !hasNext)); };
    for (const o of cuts) {
      solid(u, o.u0);
      if (o.head < wTop) prism(bk, w, o.u0, o.u1, -t, 0, o.head, wTop, faces(o.head, wTop, false, false));
      u = o.u1;
    }
    solid(u, end);
    // section cap above openings when cut is below the head: nothing to draw (open)
  }
  const wallMeshes = bk.meshes(M);
  for (const m of wallMeshes) { m.name = 'walls-' + m.name; root.add(m); }

  // ---------------------------------------------------------------- floors & ceilings
  const floors = new THREE.Group(); floors.name = 'floors'; root.add(floors);
  const ceilings = new THREE.Group(); ceilings.name = 'ceilings'; root.add(ceilings);
  const lp = livingParts();
  const floorPolys = [
    { id: 'living', pts: lp.main, mat: 'floorOak', dir: [-0.1395, 0.9902] },
    { id: 'living', pts: lp.hall, mat: 'floorOak', dir: [1, 0] },
    ...ROOMS.filter((r) => r.id !== 'living').map((r) => ({ id: r.id, pts: r.points, mat: FINISH[r.id].floor, dir: FINISH[r.id].dir })),
  ];
  for (const f of floorPolys) {
    const m = floorMesh(f.pts, M[f.mat], f.dir, 0);
    m.userData.room = f.id; floors.add(m);
  }
  for (const r of ROOMS) {
    // 3 cm overlap into the walls: no hairline crack (sky showing through) at wall/ceiling joints
    const c = ceilingMesh(offsetPolygon(r.points, 0.03), M.ceiling, H);
    c.userData.room = r.id; ceilings.add(c);
  }
  // One watertight shadow cover avoids cracks and self-intersections at the many concave
  // room junctions. It sits above the visible ceilings and is hidden with them in dollhouse mode.
  const roofPts = ROOMS.flatMap((r) => r.points);
  const roofX = roofPts.map((p) => p[0]), roofZ = roofPts.map((p) => p[1]);
  const x0 = Math.min(...roofX) - 0.05, x1 = Math.max(...roofX) + 0.05;
  const z0 = Math.min(...roofZ) - 0.05, z1 = Math.max(...roofZ) + 0.05;
  const roof = new THREE.Mesh(new THREE.BoxGeometry(x1 - x0, 0.2, z1 - z0), M.slab);
  roof.position.set((x0 + x1) / 2 - OFFSET.x, H + 0.102, (z0 + z1) / 2 - OFFSET.y);
  roof.castShadow = true; roof.receiveShadow = false; roof.name = 'roof';
  ceilings.add(roof);
  // slab edge below the whole apartment
  const slabGroup = new THREE.Group(); slabGroup.name = 'slab'; root.add(slabGroup);
  for (const pts of [...ROOMS.map((r) => r.points), ...BALCONIES.map((b) => b.points)]) {
    // The balcony decking sits at -3.5 cm; keep the slab below it and the interior finishes.
    slabGroup.add(slabMesh(pts, M.slab, -SLAB, -0.06));
  }

  // reveal floors in openings (thresholds) – each side fills its half of the wall
  const thr = new Buckets();
  for (const w of WALLS) {
    const { t, exterior } = info.get(w.id);
    for (const o of w.openings) {
      const depth = exterior ? (o.type === 'door' ? t : Math.min(0.14, t)) : t;
      const P = (u, v) => { const [x, z] = W(add(add(w.a, mul(w.dir, u)), mul(w.n, v))); return [x, 0.0005, z]; };
      const key = o.type === 'door' ? FINISH[w.room].floor : 'windowSill';
      thr.quad(key === 'windowSill' ? 'bronzeDark' : key, [P(o.u0, 0), P(o.u1, 0), P(o.u1, -depth), P(o.u0, -depth)], [0, 1, 0]);
    }
  }
  for (const m of thr.meshes(M, { cast: false })) floors.add(m);

  // ---------------------------------------------------------------- skirting
  const sk = new Buckets();
  for (const w of WALLS) {
    if (!FINISH[w.room].skirting) continue;
    const free = subtractIntervals([[0, w.length]], w.openings.map((o) => [o.u0, o.u1]));
    for (const [u0, u1] of free) if (u1 - u0 > 0.02) prism(sk, w, u0, u1, 0, 0.012, 0, 0.065, { inner: 'skirting', top: 'skirting', ends: 'skirting' });
  }
  const skirting = sk.meshes(M, { cast: false }); skirting.forEach((m) => { m.name = 'skirting'; root.add(m); });

  // ---------------------------------------------------------------- openings
  const openingsGroup = new THREE.Group(); openingsGroup.name = 'openings'; root.add(openingsGroup);
  for (const rec of openings) {
    const { w, o } = rec;
    const { t, exterior } = info.get(w.id);
    if (o.type === 'door') {
      if (!rec.primary) continue;
      const tTot = t + (rec.twin ? info.get(rec.twin.w.id).t : 0);
      openingsGroup.add(doorAssembly(M, w, o, exterior ? t : tTot, w.id === 'W01'));
    } else {
      openingsGroup.add(windowAssembly(M, w, o, t, o.type === 'sliding', exterior && !facesBalcony(w)));
    }
  }

  // ---------------------------------------------------------------- balconies
  root.add(buildBalconies(M));
  return { root, info, openings };
}

function subtractIntervals(base, cuts) {
  let res = base;
  for (const [c0, c1] of cuts) {
    res = res.flatMap(([a, b]) => (c1 <= a || c0 >= b ? [[a, b]] : [[a, Math.min(b, c0)], [Math.max(a, c1), b]].filter(([x, y]) => y - x > 1e-4)));
  }
  return res;
}

function facesBalcony(w) {
  const mid = add(w.a, mul(w.dir, w.length / 2)), probe = add(mid, mul(w.n, -0.5));
  return BALCONIES.some((b) => pointIn(probe, b.points));
}
function pointIn(p, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

/** Floor polygon with plank-aligned UVs (texture aspect honoured). */
export function floorMesh(pts, mat, dir = [1, 0], y = 0) {
  const shape = new THREE.Shape(pts.map((p) => { const [x, z] = W(p); return new THREE.Vector2(x, -z); }));
  const g = new THREE.ShapeGeometry(shape);
  g.rotateX(-Math.PI / 2);
  g.translate(0, y, 0);
  const pos = g.attributes.position, uvA = new Float32Array(pos.count * 2);
  const size = mat.userData.uv?.size ?? 1, aspect = mat.userData.uv?.aspect ?? 1;
  const perp = [-dir[1], dir[0]];
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i);
    uvA[i * 2] = (x * dir[0] + z * dir[1]) / size;
    uvA[i * 2 + 1] = (x * perp[0] + z * perp[1]) / (size * aspect);
  }
  g.setAttribute('uv', new THREE.BufferAttribute(uvA, 2));
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true; m.userData.keepUV = true;
  return m;
}

function ceilingMesh(pts, mat, y) {
  // (x, z) shape rotated +90° about X → lies in the XZ plane facing down
  const shape = new THREE.Shape(pts.map((p) => { const [x, z] = W(p); return new THREE.Vector2(x, z); }));
  let g = new THREE.ShapeGeometry(shape);
  g.rotateX(Math.PI / 2); // faces down
  g.translate(0, y, 0);
  g = metricUV(g, mat.userData.uv.size);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true; m.castShadow = true; m.userData.keepUV = true;
  return m;
}

/** Mitred outward offset of a clockwise (y-down) room polygon. */
export function offsetPolygon(pts, d) {
  const n = pts.length, out = [];
  const normal = (a, b) => { const e = sub(b, a), L = len(e); return [e[1] / L, -e[0] / L]; };
  for (let i = 0; i < n; i++) {
    const p = pts[i], n1 = normal(pts[(i - 1 + n) % n], p), n2 = normal(p, pts[(i + 1) % n]);
    const k = Math.max(0.35, 1 + dot(n1, n2));
    out.push(add(p, mul(add(n1, n2), d / k)));
  }
  return out;
}

function slabMesh(pts, mat, y0, y1) {
  const shape = new THREE.Shape(pts.map((p) => { const [x, z] = W(p); return new THREE.Vector2(x, -z); }));
  const g = new THREE.ExtrudeGeometry(shape, { depth: y1 - y0, bevelEnabled: false });
  g.rotateX(-Math.PI / 2); g.translate(0, y0, 0);
  const m = new THREE.Mesh(g, mat);
  m.receiveShadow = true;
  return m;
}

/** Local group on a wall opening: x along wall from opening start, z = into room (v). */
function openingGroup(w, u0) {
  const g = new THREE.Group();
  const [x, z] = W(add(w.a, mul(w.dir, u0)));
  g.position.set(x, 0, z);
  g.rotation.y = Math.atan2(-w.dir[1], w.dir[0]);
  return g;
}

function windowAssembly(M, w, o, t, sliding, balustrade) {
  const width = o.u1 - o.u0, h = WINDOW_HEAD, g = openingGroup(w, o.u0);
  g.name = `window-${w.id}`;
  const zf = -Math.min(0.13, t * 0.45); // frame plane, measured from interior face
  const fw = 0.065, fd = 0.075;
  // outer frame
  box(g, M.frame, [width, fw, fd], [width / 2, fw / 2, zf]);
  box(g, M.frame, [width, fw, fd], [width / 2, h - fw / 2, zf]);
  box(g, M.frame, [fw, h, fd], [fw / 2, h / 2, zf]);
  box(g, M.frame, [fw, h, fd], [width - fw / 2, h / 2, zf]);
  const glass = (x0, x1, z) => {
    const gm = box(g, M.glass, [x1 - x0, h - fw * 2 - 0.06, 0.024], [(x0 + x1) / 2, h / 2, z]);
    gm.castShadow = false; gm.userData.keep = true;
    return gm;
  };
  const sash = (x0, x1, z) => {
    const s = 0.055;
    box(g, M.frame, [x1 - x0, s, 0.06], [(x0 + x1) / 2, fw + s / 2, z]);
    box(g, M.frame, [x1 - x0, s, 0.06], [(x0 + x1) / 2, h - fw - s / 2, z]);
    box(g, M.frame, [s, h - fw * 2, 0.06], [x0 + s / 2, h / 2, z]);
    box(g, M.frame, [s, h - fw * 2, 0.06], [x1 - s / 2, h / 2, z]);
    glass(x0 + s, x1 - s, z);
  };
  if (sliding) {
    const mid = width / 2;
    sash(fw, mid + 0.03, zf - 0.02);
    sash(mid - 0.03, width - fw, zf + 0.025);
    // flush handle bars
    box(g, M.blackMetal, [0.02, 0.32, 0.025], [mid - 0.12, 1.05, zf + 0.07]);
    // bottom track (barrier-free)
    box(g, M.steel, [width, 0.012, 0.12], [width / 2, 0.006, zf]);
  } else if (width > 1.5) {
    const mid = width / 2;
    box(g, M.frame, [0.08, h, fd], [mid, h / 2, zf]);
    sash(fw, mid - 0.04, zf); sash(mid + 0.04, width - fw, zf);
    box(g, M.blackMetal, [0.022, 0.16, 0.03], [mid - 0.1, 1.1, zf + 0.05]);
  } else {
    sash(fw, width - fw, zf);
    box(g, M.blackMetal, [0.022, 0.16, 0.03], [width - 0.12, 1.1, zf + 0.05]);
  }
  // exterior sill
  box(g, M.bronzeDark, [width + 0.04, 0.02, t + zf + 0.05], [width / 2, 0.01, (zf - t) / 2 - 0.02]);
  if (balustrade) {
    const zb = -t - 0.06;
    const gp = box(g, M.glass, [width - 0.04, 0.95, 0.017], [width / 2, 0.55, zb]);
    gp.userData.keep = true; gp.castShadow = false;
    box(g, M.frame, [width, 0.04, 0.05], [width / 2, 1.02, zb]);
    box(g, M.frame, [width, 0.05, 0.05], [width / 2, 0.06, zb]);
  }
  return consolidate(g);
}

function doorAssembly(M, w, o, tTot, entrance) {
  const width = o.u1 - o.u0, h = DOOR_HEIGHT, g = openingGroup(w, o.u0);
  g.name = `door-${w.id}`;
  const zf = 0.0; // interior face of the owning room
  const fr = 0.022;
  // frame (Zarge): lining the reveal, thin face on the room side
  box(g, M.bronzeDark, [fr, h, tTot], [fr / 2, h / 2, zf - tTot / 2]);
  box(g, M.bronzeDark, [fr, h, tTot], [width - fr / 2, h / 2, zf - tTot / 2]);
  box(g, M.bronzeDark, [width, fr, tTot], [width / 2, h - fr / 2, zf - tTot / 2]);
  // leaf, flush with room face
  const leafW = width - fr * 2 - 0.006, leafH = h - fr - 0.008, lt = entrance ? 0.07 : 0.042;
  const leaf = boxOn(g, M.doorLeaf, [leafW, leafH, lt], [width / 2, 0.006, zf - lt / 2 - 0.004]);
  leaf.name = 'leaf';
  if (entrance) {
    // vertical bronze pull + peephole
    for (const s of [1, -1]) {
      box(g, M.bronze, [0.025, 0.9, 0.025], [width - 0.16, 1.15, zf + s * 0.045 - (s < 0 ? lt : 0)]);
    }
    box(g, M.bronze, [0.02, 0.02, 0.02], [width / 2, 1.55, zf + 0.004]);
  } else {
    for (const s of [1, -1]) {
      const zz = zf - lt / 2 - 0.004 + s * (lt / 2 + 0.03);
      box(g, M.bronze, [0.018, 0.018, 0.06], [width - 0.085, 1.02, zz - s * 0.0]).rotation.set(0, 0, 0);
      box(g, M.bronze, [0.13, 0.018, 0.02], [width - 0.14, 1.02, zz + s * 0.02]);
      box(g, M.bronze, [0.05, 0.05, 0.008], [width - 0.085, 1.02, zf - lt / 2 - 0.004 + s * (lt / 2 + 0.004)]);
    }
  }
  return consolidate(g);
}

export function buildBalconies(M) {
  const grp = new THREE.Group(); grp.name = 'balconies';
  for (const b of BALCONIES) {
    const pts = b.points;
    const long = pts.map((p, i) => sub(pts[(i + 1) % pts.length], p)).sort((p, q) => len(q) - len(p))[0];
    const dir = mul(long, 1 / len(long));
    grp.add(floorMesh(pts, M.deck, dir, -0.035));
    const sign = Math.sign(polygonArea(pts));
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], c = pts[(i + 1) % pts.length], d = sub(c, a), L = len(d), u = mul(d, 1 / L);
      const out = mul([u[1], -u[0]], sign); // outward normal
      const probe = add(add(a, mul(d, 0.5)), mul(out, 0.45));
      const nearRoom = ROOMS.some((r) => pointIn(probe, r.points));
      if (nearRoom || L < 0.3) continue;
      // glass balustrade with slim black handrail
      const g = new THREE.Group();
      const [x, z] = W(a); g.position.set(x, 0, z); g.rotation.y = Math.atan2(-u[1], u[0]);
      const gp = box(g, M.glass, [L - 0.04, 0.98, 0.017], [L / 2, 0.52, -0.03]);
      gp.userData.keep = true; gp.castShadow = false;
      box(g, M.frame, [L, 0.045, 0.06], [L / 2, 1.04, -0.03]);
      box(g, M.frame, [L, 0.06, 0.08], [L / 2, 0.0, -0.03]);
      grp.add(consolidate(g));
    }
  }
  return grp;
}
