// Automated layout audit: containment in the measured room contour, collisions between pieces,
// free door approach zones and window access. Runs on the item registry of the scene.
import { ROOMS, BALCONIES, WALLS, add, mul, sub, dot } from './geometry.js';

const TOL = 0.012;           // tolerance for items placed flush against walls
const DOOR_DEPTH = 0.9;      // free approach zone in front of every door (both sides)
const WINDOW_DEPTH = 0.45;   // access strip in front of windows / balcony doors

// Pairs that intentionally touch or nest (chair under desk, lamp beside chair, stool at tub …)
const ALLOWED = [
  ['task-chair', 'desk'], ['floorlamp-living', 'lounge'], ['floorlamp-bed', 'reading-chair'],
  ['bed', 'nightstand-n'], ['bed', 'nightstand-s'], ['b1-table', 'b1-lounge-a'], ['b1-table', 'b1-lounge-b'],
];
const allowed = (a, b) => ALLOWED.some(([x, y]) => (x === a.id && y === b.id) || (x === b.id && y === a.id)) || a.allow?.includes(b.id) || b.allow?.includes(a.id);

function distToSegment(p, a, b) {
  const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab)));
  const q = add(a, mul(ab, t));
  return Math.hypot(p[0] - q[0], p[1] - q[1]);
}
function inside(p, pts) {
  let r = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) r = !r;
  }
  return r;
}
function edgeDist(p, pts) { let d = Infinity; for (let i = 0; i < pts.length; i++) d = Math.min(d, distToSegment(p, pts[i], pts[(i + 1) % pts.length])); return d; }

/** Penetration depth of two convex polygons (SAT); ≤ 0 = no overlap. */
export function overlap(A, B) {
  let min = Infinity;
  for (const P of [A, B]) {
    for (let i = 0; i < P.length; i++) {
      const e = sub(P[(i + 1) % P.length], P[i]), n = [-e[1], e[0]], L = Math.hypot(...n);
      if (L < 1e-9) continue;
      const ax = [n[0] / L, n[1] / L];
      const pa = A.map((p) => dot(p, ax)), pb = B.map((p) => dot(p, ax));
      const o = Math.min(Math.max(...pa), Math.max(...pb)) - Math.max(Math.min(...pa), Math.min(...pb));
      if (o <= 0) return 0;
      min = Math.min(min, o);
    }
  }
  return min;
}

/** Zone in front of an opening: rectangle from the wall face `depth` into the room. */
function zone(w, o, depth) {
  const P = (u, v) => add(add(w.a, mul(w.dir, u)), mul(w.n, v));
  return [P(o.u0, 0.02), P(o.u1, 0.02), P(o.u1, depth), P(o.u0, depth)];
}

export function validateLayout(items) {
  const issues = [], checks = { containment: 0, collisions: 0, doors: 0, windows: 0 };
  const polys = new Map([...ROOMS.map((r) => [r.id, r.points]), ...BALCONIES.map((b) => [b.id, b.points])]);
  const floorItems = items.filter((i) => i.footprint && i.plan !== false && i.plan !== 'soft' && !i.ceiling);

  // 1 · containment
  for (const it of items.filter((i) => i.footprint && i.plan !== false)) {
    const poly = polys.get(it.room); if (!poly) continue;
    checks.containment++;
    // A footprint may bridge a concave corner even when every vertex is inside.
    // Sample the complete perimeter at 10 cm intervals so recessed room geometry counts.
    const perimeter = [];
    for (let e = 0; e < it.footprint.length; e++) {
      const a = it.footprint[e], b = it.footprint[(e + 1) % it.footprint.length];
      const steps = Math.max(1, Math.ceil(Math.hypot(b[0] - a[0], b[1] - a[1]) / 0.1));
      for (let k = 0; k < steps; k++) perimeter.push([a[0] + (b[0] - a[0]) * k / steps, a[1] + (b[1] - a[1]) * k / steps]);
    }
    const out = perimeter.filter((p) => !inside(p, poly) && edgeDist(p, poly) > TOL);
    if (out.length) {
      const worst = Math.max(...out.map((p) => edgeDist(p, poly)));
      issues.push({ type: 'Raumkontur', item: it.id, room: it.room, msg: `${it.name} ragt ${Math.round(worst * 100)} cm über die Wandflucht`, severity: worst > 0.05 ? 'error' : 'warn' });
    }
  }
  // 2 · collisions (same room)
  for (let i = 0; i < floorItems.length; i++) for (let j = i + 1; j < floorItems.length; j++) {
    const a = floorItems[i], b = floorItems[j];
    if (a.room !== b.room || allowed(a, b)) continue;
    checks.collisions++;
    const d = overlap(a.footprint, b.footprint);
    if (d > 0.015) issues.push({ type: 'Kollision', item: a.id, other: b.id, room: a.room, msg: `${a.name} ↔ ${b.name}: ${Math.round(d * 100)} cm Überschneidung`, severity: 'error' });
  }
  // 3 · door approach zones and 4 · window access
  for (const w of WALLS) for (const o of w.openings) {
    const isDoor = o.type === 'door';
    const z = zone(w, o, isDoor ? DOOR_DEPTH : WINDOW_DEPTH);
    const width = o.u1 - o.u0;
    for (const it of floorItems.filter((i) => i.room === w.room)) {
      if (isDoor) checks.doors++; else checks.windows++;
      const d = overlap(z, it.footprint);
      if (d <= 0.02) continue;
      if (isDoor) issues.push({ type: 'Türbereich', item: it.id, room: w.room, msg: `${it.name} steht im 90-cm-Bewegungsbereich der Tür ${w.id} (${Math.round(d * 100)} cm)`, severity: 'error' });
      else if (o.type === 'sliding' || d > width * 0.5) issues.push({ type: 'Fensterzugang', item: it.id, room: w.room, msg: `${it.name} verstellt ${o.type === 'sliding' ? 'die Balkontür' : 'das Fenster'} ${w.id}`, severity: o.type === 'sliding' ? 'error' : 'warn' });
    }
  }
  return { issues, checks, ok: !issues.some((i) => i.severity === 'error') };
}
