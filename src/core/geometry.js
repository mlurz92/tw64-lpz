// Plan geometry in metres. Plan coordinates: x → right, y → down (as drawn).
// Three.js world: X = plan x − OFFSET.x, Z = plan y − OFFSET.y, Y = height.
import PLAN from '../data/plan.js';

export const SCALE = PLAN.scale;
export const ROOM_HEIGHT = 2.56;          // RH laut Raumstempel
export const DOOR_HEIGHT = 2.135;         // lichte Türhöhe laut Plan (2,13⁵)
export const WINDOW_HEAD = 2.40;          // bodentiefe Fenster (BRH 0,00), Sturz mit Vorhangnische
export const EXTERIOR_WALL = 0.36;
/** Finished floor of WE 13 above ground level ("+9,28 OK FFB" laut Ausführungsplan, 3. OG). */
export const FLOOR_LEVEL = 9.28;
/** Storey height of the building (3 storeys below WE 13). */
export const STOREY = FLOOR_LEVEL / 3;

const m = (p) => [p[0] / SCALE, p[1] / SCALE];
export const OFFSET = { x: 10.2, y: 13.4 };
export const toWorld = ([x, y]) => [x - OFFSET.x, y - OFFSET.y];

export const ROOMS = PLAN.rooms.map((r) => ({
  id: r.id,
  name: r.name,
  points: r.points.map(m),
  planArea: r.planArea,
  wfl: r.wfl,
  modelArea: r.modelArea,
  openEdges: r.openEdges,
  note: r.note,
  label: m(r.label),
}));
export const room = (id) => ROOMS.find((r) => r.id === id);

export const BALCONIES = PLAN.balconies.map((b, i) => ({
  id: 'balcony' + (i + 1), name: b.name, points: b.points.map(m), area: b.area, label: m(b.label),
}));

export const WALLS = PLAN.walls.map((w) => {
  const a = m(w.a), b = m(w.b);
  const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy);
  const dir = [dx / L, dy / L];
  // All room polygons are clockwise in y-down coordinates → inward normal is (−dy, dx).
  const n = [-dir[1], dir[0]];
  return {
    id: w.id, room: w.room, edge: w.edge, a, b, length: L, dir, n,
    angle: w.angle, interiorAngle: w.interiorAngle, source: w.source, review: w.review,
    furnishable: w.furnishable !== false,
    parts: w.parts,
    openings: w.openings.map((o) => ({
      type: o.type, start: o.start, end: o.end, width: o.length,
      u0: o.start * L, u1: o.end * L,
    })),
    audit: w.audit,
  };
});
export const wall = (id) => WALLS.find((w) => w.id === id);

// ---------- vector helpers ----------
export const add = (p, q) => [p[0] + q[0], p[1] + q[1]];
export const sub = (p, q) => [p[0] - q[0], p[1] - q[1]];
export const mul = (p, s) => [p[0] * s, p[1] * s];
export const dot = (p, q) => p[0] * q[0] + p[1] * q[1];
export const len = (p) => Math.hypot(p[0], p[1]);

export function polygonArea(pts) {
  let s = 0;
  for (let i = 0; i < pts.length; i++) {
    const p = pts[i], q = pts[(i + 1) % pts.length];
    s += p[0] * q[1] - q[0] * p[1];
  }
  return s / 2;
}

export function pointInPolygon(p, pts) {
  let inside = false;
  for (let i = 0, j = pts.length - 1; i < pts.length; j = i++) {
    const [xi, yi] = pts[i], [xj, yj] = pts[j];
    if ((yi > p[1]) !== (yj > p[1]) && p[0] < ((xj - xi) * (p[1] - yi)) / (yj - yi) + xi) inside = !inside;
  }
  return inside;
}

function segmentDistance(p, a, b) {
  const ab = sub(b, a), t = Math.max(0, Math.min(1, dot(sub(p, a), ab) / dot(ab, ab)));
  return len(sub(p, add(a, mul(ab, t))));
}

/** Distance from a point along a ray to the first edge of another room/balcony polygon. */
function rayToPolygons(origin, dirv, maxD, skipRoom, onlyRoom = null) {
  let best = Infinity;
  const polys = onlyRoom ? [room(onlyRoom).points] : [...ROOMS.filter((r) => r.id !== skipRoom).map((r) => r.points), ...BALCONIES.map((b) => b.points)];
  for (const pts of polys) {
    for (let i = 0; i < pts.length; i++) {
      const a = pts[i], b = pts[(i + 1) % pts.length];
      const e = sub(b, a), den = dirv[0] * e[1] - dirv[1] * e[0];
      if (Math.abs(den) < 1e-9) continue;
      const w0 = sub(a, origin);
      const t = (w0[0] * e[1] - w0[1] * e[0]) / den;
      const s = (w0[0] * dirv[1] - w0[1] * dirv[0]) / den;
      if (t > 0.01 && t < maxD && s >= -0.001 && s <= 1.001) best = Math.min(best, t);
    }
  }
  return best;
}

/**
 * Wall thickness towards the outside of the room. Shared walls take half of the gap to the
 * neighbouring room (the neighbour fills the other half), exterior walls get EXTERIOR_WALL.
 */
export function wallThickness(w) {
  const samples = [0.2, 0.5, 0.8].map((t) => add(w.a, mul(w.dir, w.length * t)));
  const out = mul(w.n, -1);
  // Thin partition inside one room (e.g. the 10 cm wall between the washer-dryer niche and the
  // WC pre-wall in the bath): the room itself lies behind the wall along its whole length →
  // the partition is exactly that gap, never a 36 cm exterior wall.
  const own = samples.map((p) => rayToPolygons(p, out, 0.3, null, w.room));
  if (own.every(Number.isFinite) && Math.max(...own) - Math.min(...own) < 0.01) return { t: Math.min(...own), shared: false, exterior: false, partition: true };
  const d = Math.min(...samples.map((p) => rayToPolygons(p, out, 0.6, w.room)));
  if (!Number.isFinite(d)) return { t: EXTERIOR_WALL, shared: false, exterior: true };
  // Walls towards balconies are facade walls: fill the whole gap.
  const toBalcony = samples.some((p) => BALCONIES.some((b) => b.points.some((q, i) =>
    segmentDistance(add(p, mul(out, d)), q, b.points[(i + 1) % b.points.length]) < 0.02)));
  return toBalcony ? { t: d, shared: false, exterior: true } : { t: d / 2, shared: true, exterior: false };
}

/**
 * Local furnishing frame on a wall: u along the wall (a → b), v into the room.
 * Returns plan coordinates (metres) and the Three.js yaw so that an object's local +X runs
 * along the wall and its local +Z (its front) faces into the room.
 */
export function frame(wallId) {
  const w = wall(wallId);
  return {
    wall: w,
    point: (u, v) => add(add(w.a, mul(w.dir, u)), mul(w.n, v)),
    yaw: Math.atan2(-w.dir[1], w.dir[0]),
  };
}

/** Yaw for an object whose front (+Z local) should face the given plan direction. */
export const yawFacing = (dx, dy) => Math.atan2(dx, dy);

export function bounds(points) {
  const xs = points.map((p) => p[0]), ys = points.map((p) => p[1]);
  return { minX: Math.min(...xs), maxX: Math.max(...xs), minY: Math.min(...ys), maxY: Math.max(...ys) };
}

export const APARTMENT_BOUNDS = bounds([...ROOMS.flatMap((r) => r.points), ...BALCONIES.flatMap((b) => b.points)]);

// Split of the living polygon into entrance hall and living/dining (different plank direction).
export function livingParts() {
  const p = room('living').points;
  const hall = [p[13], p[14], p[15], p[0], p[1], p[2], p[3]];
  const main = [p[3], p[4], p[5], p[6], p[7], p[8], p[9], p[10], p[11], p[12], p[13]];
  return { hall, main };
}
