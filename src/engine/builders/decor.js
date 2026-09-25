// Lighting fixtures, ceramics, books, art, mirrors, planters and styling props.
import * as THREE from 'three';
import { box, boxOn, rbox, cyl, sphere, lathe, mesh, tube, rng, extrudePlan, circle } from './common.js';
import { artMaterial } from '../materials.js';
import { bookSpines } from '../textures.js';

const WARM = new THREE.Color('#ffd6a8'); // 2700 K, white-balanced for interior photography
export const NEUTRAL_WARM = new THREE.Color('#ffe6cc'); // 3000 K (bathrooms)

/** Registers a light source that the viewer can dim per mood. lumens → candela. */
export function lampLight(kind, lumens, { color = WARM, distance = 0, angle = 0.9, penumbra = 0.8, decay = 2, shadow = false } = {}) {
  let l;
  if (kind === 'spot') {
    l = new THREE.SpotLight(color, 0, distance, angle, penumbra, decay);
    l.target.position.set(0, -1, 0);
    l.add(l.target);
  } else {
    l = new THREE.PointLight(color, 0, distance, decay);
  }
  l.userData.lamp = true;
  l.userData.candela = lumens / (kind === 'spot' ? (2 * Math.PI * (1 - Math.cos(angle / 2))) : 4 * Math.PI);
  l.castShadow = shadow;
  if (shadow) { l.shadow.mapSize.set(1024, 1024); l.shadow.bias = -0.0008; l.shadow.radius = 6; }
  return l;
}

// ------------------------------------------------------------------ lamps
/** Bronze mushroom table lamp (moodboard key piece). */
export function mushroomLamp(M, { h = 0.42, r = 0.17, mat = 'bronze' } = {}) {
  const g = new THREE.Group();
  M = { bronze: M[mat], opal: M.opal };
  cyl(g, M.bronze, 0.07, 0.075, 0.018, [0, 0, 0]);
  cyl(g, M.bronze, 0.018, 0.018, h - 0.1, [0, 0.018, 0], 24);
  lathe(g, M.bronze, [[0.012, 0], [r * 0.55, 0.01], [r * 0.9, 0.035], [r, 0.07], [r * 0.85, 0.11], [r * 0.45, 0.135], [0, 0.14]], [0, h - 0.14, 0]);
  const diff = cyl(g, M.opal, r * 0.7, r * 0.7, 0.004, [0, h - 0.142, 0]);
  diff.castShadow = false;
  const l = lampLight('point', 350, { distance: 6 }); l.position.set(0, h - 0.17, 0); g.add(l);
  return g;
}

/** Floor lamp: marble disc base, bronze stem, pleated linen cone shade. */
export function floorLamp(M, { h = 1.6 } = {}) {
  const g = new THREE.Group();
  cyl(g, M.marble, 0.15, 0.16, 0.03, [0, 0, 0]);
  cyl(g, M.bronze, 0.011, 0.011, h - 0.35, [0, 0.03, 0], 16);
  const pleats = 36, prof = [];
  const shade = new THREE.Group();
  const geo = new THREE.CylinderGeometry(0.16, 0.22, 0.3, pleats * 2, 1, true);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), z = pos.getZ(i), a = Math.atan2(z, x), k = 1 + 0.035 * Math.cos(a * pleats);
    pos.setX(i, x * k); pos.setZ(i, z * k);
  }
  geo.computeVertexNormals();
  const s = mesh(geo, M.lampShade, [0, h - 0.17, 0]); s.castShadow = false; shade.add(s);
  g.add(shade);
  const l = lampLight('point', 600, { distance: 8 }); l.position.set(0, h - 0.2, 0); g.add(l);
  void prof;
  return g;
}

/** Large flat saucer pendant in brushed bronze (dining). */
export function saucerPendant(M, { dia = 0.8, drop = 0.95, ceiling = 2.56, mat = 'bronze' } = {}) {
  const g = new THREE.Group();
  M = { bronze: M[mat], blackMetal: M.blackMetal, opal: M.opal };
  const y = ceiling - drop;
  cyl(g, M.bronze, 0.06, 0.06, 0.02, [0, ceiling - 0.02, 0]);
  cyl(g, M.blackMetal, 0.002, 0.002, drop - 0.08, [0, y + 0.08, 0], 6).castShadow = false;
  lathe(g, M.bronze, [[0.02, 0.1], [0.06, 0.09], [dia * 0.2, 0.07], [dia * 0.42, 0.03], [dia * 0.5, 0.005], [dia * 0.5, 0.0], [dia * 0.49, 0.0], [dia * 0.41, 0.024], [dia * 0.19, 0.062], [0.05, 0.08], [0.02, 0.085]], [0, y, 0], 96);
  const d = cyl(g, M.opal, dia * 0.19, dia * 0.19, 0.004, [0, y + 0.058, 0]); d.castShadow = false;
  const l = lampLight('spot', 1400, { angle: 1.9, penumbra: 0.9, distance: 10, shadow: false });
  l.position.set(0, y + 0.03, 0); g.add(l);
  const up = lampLight('point', 250, { distance: 4 }); up.position.set(0, y + 0.12, 0); g.add(up);
  return g;
}

/** Small bronze dome pendant (kitchen block, bedside). */
export function domePendant(M, { r = 0.11, drop = 0.9, ceiling = 2.56, mat = 'bronze' } = {}) {
  const g = new THREE.Group(), y = ceiling - drop;
  cyl(g, M[mat], 0.04, 0.04, 0.015, [0, ceiling - 0.015, 0]);
  cyl(g, M.blackMetal, 0.002, 0.002, drop - 0.2, [0, y + 0.2, 0], 6).castShadow = false;
  lathe(g, M[mat], [[0.012, 0.2], [0.03, 0.19], [r * 0.5, 0.165], [r * 0.85, 0.1], [r, 0.02], [r, 0], [r * 0.97, 0], [r * 0.82, 0.095], [r * 0.48, 0.158], [0.01, 0.185]], [0, y, 0]);
  const bulb = sphere(g, M.opal, r * 0.32, [0, y + 0.05, 0], 20); bulb.castShadow = false;
  const l = lampLight('spot', 420, { angle: 1.6, penumbra: 0.7, distance: 6 }); l.position.set(0, y + 0.04, 0); g.add(l);
  return g;
}

/** Opal globe pendant on bronze stem (bedside). */
export function globePendant(M, { r = 0.1, drop = 1.0, ceiling = 2.56 } = {}) {
  const g = new THREE.Group(), y = ceiling - drop;
  cyl(g, M.bronze, 0.035, 0.035, 0.012, [0, ceiling - 0.012, 0]);
  cyl(g, M.blackMetal, 0.002, 0.002, drop - 0.03, [0, y + r * 0.9, 0], 6).castShadow = false;
  cyl(g, M.bronze, 0.022, 0.028, 0.05, [0, y + r * 0.85, 0]);
  const s = sphere(g, M.opal, r, [0, y, 0], 32); s.castShadow = false;
  const l = lampLight('point', 250, { distance: 5 }); l.position.set(0, y, 0); g.add(l);
  return g;
}

/** Slim vertical bronze wall sconce with opal tube (moodboard: linear sconce). */
export function linearSconce(M, { h = 0.6, mat = 'bronze' } = {}) {
  const g = new THREE.Group();
  M = { bronze: M[mat], opal: M.opal };
  box(g, M.bronze, [0.05, h + 0.04, 0.02], [0, 0, -0.04]);
  const t = cyl(g, M.opal, 0.018, 0.018, h, [0, -h / 2, -0.012], 20); t.castShadow = false;
  box(g, M.bronze, [0.04, 0.02, 0.05], [0, h / 2 + 0.02, -0.02]);
  box(g, M.bronze, [0.04, 0.02, 0.05], [0, -h / 2 - 0.02, -0.02]);
  const l = lampLight('point', 280, { distance: 5 }); l.position.set(0, 0, 0.05); g.add(l);
  return g;
}

/** Recessed downlight (visual only unless light=true). */
export function downlight(M, { light = true, lumens = 450, angle = 1.0, color = WARM } = {}) {
  const g = new THREE.Group();
  const ring = cyl(g, M.matteBlack, 0.045, 0.045, 0.004, [0, -0.004, 0], 24); ring.castShadow = false;
  const lens = cyl(g, M.downlight, 0.03, 0.03, 0.002, [0, -0.0055, 0], 24); lens.castShadow = false;
  if (light) { const l = lampLight('spot', lumens, { angle, penumbra: 0.6, distance: 7, color }); l.position.set(0, -0.02, 0); g.add(l); }
  return g;
}

/** Concealed LED line (cove / shelf / mirror) with a physically sized rect area light. */
export function ledLine(M, length, { lumensPerM = 400, dir = 'down' } = {}) {
  const g = new THREE.Group();
  const s = box(g, M.ledStrip, [length, 0.008, 0.012], [0, 0, 0]); s.castShadow = false;
  const h = 0.03, l = new THREE.RectAreaLight(WARM, 0, length, h);
  l.position.set(0, dir === 'down' ? -0.012 : 0.012, 0.01);
  l.lookAt(0, dir === 'down' ? -1 : 1, 0.35);
  l.userData.lamp = true;
  l.userData.candela = (lumensPerM * length) / (length * h * Math.PI); // luminance (nits)
  g.add(l);
  return g;
}

// ------------------------------------------------------------------ ceramics
const VASES = {
  amphora: [[0.0, 0], [0.07, 0], [0.105, 0.05], [0.13, 0.14], [0.12, 0.24], [0.07, 0.33], [0.04, 0.38], [0.042, 0.42], [0.05, 0.43], [0.038, 0.43], [0.03, 0.4], [0.03, 0.05]],
  bottle: [[0, 0], [0.06, 0], [0.085, 0.04], [0.09, 0.14], [0.06, 0.22], [0.025, 0.27], [0.02, 0.35], [0.026, 0.36], [0.017, 0.36], [0.013, 0.3]],
  moon: [[0, 0], [0.05, 0], [0.11, 0.05], [0.14, 0.14], [0.12, 0.23], [0.06, 0.28], [0.045, 0.3], [0.035, 0.3], [0.03, 0.27]],
  cylinder: [[0, 0], [0.075, 0], [0.08, 0.01], [0.08, 0.3], [0.072, 0.3], [0.072, 0.02]],
  bud: [[0, 0], [0.035, 0], [0.05, 0.03], [0.052, 0.08], [0.03, 0.12], [0.015, 0.16], [0.018, 0.17], [0.011, 0.17]],
};

export function vase(M, kind = 'amphora', mat = 'stoneware', scale = 1) {
  const g = new THREE.Group();
  lathe(g, M[mat], VASES[kind].map(([r, y]) => [r * scale, y * scale]), [0, 0, 0], 48);
  return g;
}

/** Shallow bowl (bronze / stone / wood). */
export function bowl(M, mat = 'bronze', r = 0.16, h = 0.07) {
  const g = new THREE.Group();
  lathe(g, M[mat], [[0, 0.004], [r * 0.45, 0], [r * 0.8, h * 0.35], [r, h], [r * 0.96, h], [r * 0.76, h * 0.4], [r * 0.42, h * 0.08], [0, h * 0.1]], [0, 0, 0], 64);
  return g;
}

export function tray(M, mat = 'bronzeDark', w = 0.42, d = 0.28) {
  const g = new THREE.Group();
  boxOn(g, M[mat], [w, 0.006, d], [0, 0, 0]);
  for (const [x, z, ww, dd] of [[0, d / 2, w, 0.006], [0, -d / 2, w, 0.006], [w / 2, 0, 0.006, d], [-w / 2, 0, 0.006, d]]) boxOn(g, M[mat], [ww, 0.025, dd], [x, 0, z]);
  return g;
}

/** Dried branches for vases (procedural twigs). */
export function branches(M, { h = 0.7, spread = 0.35, seed = 2, leaves = true } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const twig = M.bronzeDark;
  for (let b = 0; b < 5; b++) {
    const ang = r() * Math.PI * 2, lean = 0.15 + r() * 0.35;
    const pts = [[0, 0, 0]];
    for (let k = 1; k <= 4; k++) {
      const t = k / 4;
      pts.push([Math.cos(ang) * spread * lean * t * (0.6 + r() * 0.4), h * t * (0.75 + r() * 0.25), Math.sin(ang) * spread * lean * t * (0.6 + r() * 0.4)]);
    }
    tube(g, M.stoneware, pts, 0.004 * (1 - b * 0.05), 24).castShadow = true;
    if (leaves) for (let k = 0; k < 14; k++) {
      const t = 0.35 + r() * 0.65, i = Math.min(3, Math.floor(t * 4));
      const p0 = pts[i], p1 = pts[i + 1], f = t * 4 - i;
      const p = p0.map((c, j) => c + (p1[j] - c) * f);
      const leaf = mesh(new THREE.CircleGeometry(0.018 + r() * 0.012, 8), M.leaf, [p[0] + (r() - 0.5) * 0.05, p[1], p[2] + (r() - 0.5) * 0.05]);
      leaf.scale.set(0.55, 1.4, 1);
      leaf.rotation.set(r() * Math.PI, r() * Math.PI, r() * Math.PI);
      g.add(leaf);
    }
  }
  void twig;
  return g;
}

export function candle(M, h = 0.12, r = 0.035) {
  const g = new THREE.Group();
  cyl(g, M.candle, r, r, h, [0, 0, 0], 24);
  const f = sphere(g, M.candleFlame, 0.006, [0, h + 0.012, 0], 8, [1, 2.2, 1]); f.castShadow = false;
  return g;
}

/** Stack of coffee-table books. */
export function bookStack(M, n = 3, { w = 0.3, d = 0.23, seed = 4 } = {}) {
  const g = new THREE.Group(), r = rng(seed);
  const covers = ['paper', 'stonewareSand', 'linenCharcoal', 'linenSage', 'linenIvory'];
  let y = 0;
  for (let i = 0; i < n; i++) {
    const t = 0.025 + r() * 0.02, ww = w * (1 - i * 0.07), dd = d * (1 - i * 0.06);
    const b = boxOn(g, M[covers[Math.floor(r() * covers.length)]], [ww, t, dd], [(r() - 0.5) * 0.02, y, (r() - 0.5) * 0.02]);
    b.rotation.y = (r() - 0.5) * 0.12;
    boxOn(g, M.paper, [ww - 0.012, t - 0.006, dd - 0.006], [b.position.x + 0.004, y + 0.003, b.position.z]);
    y += t;
  }
  return g;
}

let spineTex = null;
/** Row of upright books on a shelf, width w. */
export function bookRow(M, w = 0.6, { h = 0.24, d = 0.18, seed = 1 } = {}) {
  const g = new THREE.Group();
  spineTex ??= bookSpines({ seed: 5 });
  const r = rng(seed);
  const mat = (bookRow.mat ??= new THREE.MeshPhysicalMaterial({ map: spineTex, roughness: 0.8 }));
  // single-material meshes only (multi-material groups break the path tracer's material table)
  boxOn(g, M.paper, [w, h, d - 0.004], [0, 0, -0.002]);
  const geo = new THREE.PlaneGeometry(w, h);
  const uv = geo.attributes.uv, off = r() * 0.6;
  for (let i = 0; i < uv.count; i++) uv.setX(i, off + uv.getX(i) * (w / 1.4));
  const m = mesh(geo, mat, [0, h / 2, d / 2 - 0.003]);
  m.userData.keepUV = true;
  g.add(m);
  return g;
}

// ------------------------------------------------------------------ art & mirrors
/** Framed canvas: w × h, frame depth 0.035. */
export function artwork(M, kind, w, h, { seed = 1, frame = 'oakLight', float = true } = {}) {
  const g = new THREE.Group();
  const art = artMaterial(kind, seed);
  const d = 0.035, fw = 0.018;
  const cw = w - fw * 2 - (float ? 0.02 : 0), ch = h - fw * 2 - (float ? 0.02 : 0);
  box(g, M.paper, [cw, ch, 0.024], [0, 0, 0.01]);
  const canvas = mesh(new THREE.PlaneGeometry(cw, ch), art, [0, 0, 0.0225]);
  canvas.userData.keepUV = true;
  g.add(canvas);
  // frame (shadow gap floater)
  box(g, M[frame], [w, fw, d], [0, h / 2 - fw / 2, 0]);
  box(g, M[frame], [w, fw, d], [0, -h / 2 + fw / 2, 0]);
  box(g, M[frame], [fw, h - fw * 2, d], [w / 2 - fw / 2, 0, 0]);
  box(g, M[frame], [fw, h - fw * 2, d], [-w / 2 + fw / 2, 0, 0]);
  box(g, M.matteBlack, [w - fw * 2, h - fw * 2, 0.004], [0, 0, -d / 2 + 0.003]);
  return g;
}

/** Round mirror with thin bronze rim; origin at centre, back against wall at z = -d/2. */
export function roundMirror(M, dia = 0.8, { rim = 'bronze', led = false } = {}) {
  const g = new THREE.Group();
  const r = dia / 2;
  const torus = mesh(new THREE.TorusGeometry(r, 0.008, 12, 96), M[rim]);
  g.add(torus);
  const m = mesh(new THREE.CircleGeometry(r - 0.004, 96), M.mirror, [0, 0, 0.002]);
  m.userData.keepUV = true; g.add(m);
  box(g, M.matteBlack, [0.1, 0.1, 0.02], [0, 0, -0.012]);
  if (led) {
    const halo = mesh(new THREE.TorusGeometry(r - 0.03, 0.006, 8, 96), M.ledStrip, [0, 0, -0.018]);
    g.add(halo);
    const l = lampLight('point', 300, { distance: 3 }); l.position.set(0, 0, 0.1); g.add(l);
  }
  return g;
}

export function rectMirror(M, w, h, { led = true } = {}) {
  const g = new THREE.Group();
  const m = mesh(new THREE.PlaneGeometry(w, h), M.mirror, [0, 0, 0.012]);
  m.userData.keepUV = true; g.add(m);
  box(g, M.matteBlack, [w - 0.04, h - 0.04, 0.02], [0, 0, 0]);
  if (led) {
    const s = box(g, M.ledStrip, [w - 0.06, 0.006, 0.01], [0, -h / 2 + 0.03, -0.004]); s.castShadow = false;
    const s2 = box(g, M.ledStrip, [w - 0.06, 0.006, 0.01], [0, h / 2 - 0.03, -0.004]); s2.castShadow = false;
    const l = lampLight('point', 400, { distance: 3 }); l.position.set(0, h / 2 + 0.05, 0.15); g.add(l);
  }
  return g;
}

// ------------------------------------------------------------------ planters
export function planter(M, { r = 0.22, h = 0.5, mat = 'stonewareCharcoal', shape = 'taper' } = {}) {
  const g = new THREE.Group();
  const prof = shape === 'bowl'
    ? [[0, 0], [r * 0.55, 0], [r * 0.9, h * 0.25], [r, h * 0.7], [r * 0.97, h], [r * 0.9, h], [r * 0.9, h * 0.95]]
    : shape === 'cylinder'
      ? [[0, 0], [r * 0.96, 0], [r, 0.02], [r, h], [r * 0.93, h], [r * 0.93, h * 0.95]]
      : [[0, 0], [r * 0.72, 0], [r * 0.78, 0.02], [r, h], [r * 0.93, h], [r * 0.9, h * 0.95]];
  lathe(g, M[mat], prof, [0, 0, 0], 48);
  cyl(g, M.soil, (shape === 'taper' ? r * 0.9 : r * 0.92), r * 0.9, 0.01, [0, h * 0.93, 0], 32).castShadow = false;
  return g;
}

/** Places a GLTF plant (from the model library) into a planter, scaled to target height. */
export function pottedPlant(M, lib, model, { potR = 0.22, potH = 0.48, height = 1.6, potMat = 'stonewareCharcoal', shape = 'taper', yaw = 0, seed = 1, maxR = Infinity } = {}) {
  const g = new THREE.Group();
  g.add(planter(M, { r: potR, h: potH, mat: potMat, shape }));
  const p = lib.get(model);
  if (p) {
    const bb = new THREE.Box3().setFromObject(p), size = bb.getSize(new THREE.Vector3());
    const s = (height - potH * 0.9) / size.y;
    // canopy may not exceed maxR (keeps foliage out of adjacent walls)
    const k = Math.min(1, (maxR * 2) / (Math.max(size.x, size.z) * s));
    p.scale.set(s * k, s, s * k);
    p.position.set(-(bb.min.x + size.x / 2) * s * k, potH * 0.9 - bb.min.y * s, -(bb.min.z + size.z / 2) * s * k);
    p.rotation.y = yaw + seed;
    const holder = new THREE.Group(); holder.add(p); holder.userData.keep = true;
    g.add(holder);
  }
  return g;
}

/** Tabletop GLTF object normalised to a target height. */
export function model(lib, name, height, { yaw = 0, material = null } = {}) {
  const g = new THREE.Group(), p = lib.get(name);
  if (!p) return g;
  const bb = new THREE.Box3().setFromObject(p), size = bb.getSize(new THREE.Vector3()), s = height / size.y;
  p.scale.setScalar(s);
  p.position.set(-(bb.min.x + size.x / 2) * s, -bb.min.y * s, -(bb.min.z + size.z / 2) * s);
  p.rotation.y = yaw;
  if (material) p.traverse((o) => { if (o.isMesh) o.material = material; });
  const holder = new THREE.Group(); holder.add(p); holder.userData.keep = true;
  g.add(holder);
  return g;
}

/** Decorative sculptural object: stacked stone discs (Japandi). */
export function stoneStack(M) {
  const g = new THREE.Group();
  let y = 0;
  for (const [r, h, mat] of [[0.07, 0.03, 'stoneware'], [0.055, 0.028, 'stonewareSand'], [0.04, 0.026, 'stonewareCharcoal']]) {
    const s = sphere(g, M[mat], r, [0, y + h / 2, 0], 24, [1, h / (2 * r), 1]); y += h;
    void s;
  }
  return g;
}

export { circle, extrudePlan, rbox };
