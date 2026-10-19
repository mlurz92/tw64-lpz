// Parametric 3D models of the articles of the four Möblierungskonzepte (Konzept 1 Travertin ·
// Kupfer · Salbei, Konzept 2 Espresso · Petrol · Chrom, Stone · Petrol · Salbei, Ivory · Petrol ·
// Messing). Every model is built from the manufacturer dimensions of the product list (Maße in
// the PDF) and the finish named there; silhouettes follow the product photos (moodboards).
// Origin = floor centre of the footprint, +z = front, y up. Units: metres.
import * as THREE from 'three';
import { box, boxOn, rbox, rboxOn, cyl, lathe, sphere, tube, extrudePlan, roundedRect, circle, mesh } from '../../engine/builders/common.js';
import * as C from '../../engine/builders/catalog.js';
import * as F from '../../engine/builders/furniture.js';
import * as D from '../../engine/builders/decor.js';
import * as T from '../../engine/builders/textiles.js';
import { fluting } from '../../engine/builders/furniture.js';
import { lampLight } from '../../engine/builders/decor.js';
import { finish } from '../products.js';

/** Product material: clone of a base slot in the article's colour (cached per colour). */
export const tint = (ctx, base, color, opts) => finish(ctx.productM, base, color, opts);

/** Material set for one model: { slot: material } on top of the product library. */
function lib(ctx, slots = {}) {
  const M = Object.create(ctx.productM);
  for (const [k, v] of Object.entries(slots)) M[k] = v.isMaterial ? v : tint(ctx, v[0], v[1], v[2]);
  // decor textiles (cushions, throws, bedding) come from the style library
  for (const k of ['bedding', 'beddingSand', 'throwSage', 'throwMoss', 'throwCognac']) if (ctx.M[k]) M[k] = ctx.M[k];
  return M;
}

const glassMats = new Map();
/** Opal / satin glass that glows when the lamps are switched on (mood "Abend"). */
function glowGlass(ctx, color = '#f6f1e8', glow = '#ffdcb0', on = 2.2) {
  const key = color + glow + on;
  if (!glassMats.has(key)) {
    const m = ctx.productM.opal.clone(); m.color.set(color); m.emissive = new THREE.Color(glow); m.userData = { emissiveOn: on }; m.name = 'opal-' + color;
    glassMats.set(key, m);
  }
  return glassMats.get(key);
}

// =========================================================================================
// Upholstery
/** Westwing Lennon (3-Sitzer) – deep lounge modules, 238 × 119 × 68, seat 43, arms 32 cm wide. */
export function sofaLennon(ctx, { w = 2.38, d = 1.19, h = 0.68, fabric, pillows = [], throwMat = null }) {
  const M = lib(ctx, { lennon: fabric });
  for (const p of pillows) if (!M[p]) M[p] = ctx.M[p];
  if (throwMat && !M[throwMat]) M[throwMat] = ctx.M[throwMat];
  return C.sofa(M, { w, d, h, seatH: 0.43, arm: 0.32, kind: 'block', fabric: 'lennon', seats: 2, pillows, throwMat });
}

/** Westwing Tribeca (3-Sitzer) – rounded bouclé sofa, 228 × 104 × 80, seat 40, arm H 61. */
export function sofaTribeca(ctx, { w = 2.28, d = 1.04, h = 0.8, fabric, pillows = [], throwMat = null }) {
  const M = lib(ctx, { tribeca: fabric });
  for (const p of pillows) if (!M[p]) M[p] = ctx.M[p];
  if (throwMat && !M[throwMat]) M[throwMat] = ctx.M[throwMat];
  const g = new THREE.Group(), Fb = M.tribeca, arm = 0.26;
  for (const x of [-w / 2 + 0.12, w / 2 - 0.12]) for (const z of [-d / 2 + 0.12, d / 2 - 0.12]) cyl(g, M.blackMatte, 0.018, 0.015, 0.05, [x, 0, z], 12);
  rboxOn(g, Fb, [w, 0.2, d], [0, 0.05, 0], 0.09, 5);
  extrudePlan(g, Fb, roundedRect(w, 0.3, 0.14), h - 0.25, 0.25, 0.06).position.z = -d / 2 + 0.15;
  for (const s of [-1, 1]) rboxOn(g, Fb, [arm, 0.61 - 0.05, d], [s * (w / 2 - arm / 2), 0.05, 0], 0.12, 6);
  const inner = w - arm * 2, seatD = d - 0.32;
  for (let i = 0; i < 3; i++) rboxOn(g, Fb, [inner / 3 - 0.01, 0.16, seatD], [-inner / 2 + (inner / 3) * (i + 0.5), 0.24, d / 2 - seatD / 2 - 0.02], 0.08, 5);
  for (let i = 0; i < 3; i++) { const c = rbox(g, Fb, [inner / 3 - 0.04, 0.36, 0.18], [-inner / 2 + (inner / 3) * (i + 0.5), 0.58, -d / 2 + 0.38], 0.1, 5); c.rotation.x = -0.12; }
  pillows.forEach((p, i) => { const c = T.cushion(M, p, [0.48, 0.48, 0.16]); c.position.set([-0.62, -0.25, 0.25, 0.62][i] ?? 0, 0.62, -d / 2 + 0.52); c.rotation.set(-0.28, (i % 2 ? -1 : 1) * 0.2, 0); g.add(c); });
  if (throwMat) { const t = T.throwBlanket(M, throwMat, 0.5, 0.36, 0.32); t.position.set(-w / 2 + arm + 0.3, 0.42, -d / 2 + 0.36); t.rotation.y = Math.PI / 2; g.add(t); }
  return g;
}

/**
 * Westwing Sofia – large rounded lounge/reading chair, 97 × 90 × 72, seat 44: low barrel with
 * continuous rounded back and arms, loose seat cushion.
 */
export function armchairSofia(ctx, { w = 0.97, d = 0.9, h = 0.72, fabric }) {
  const M = lib(ctx, { sofia: fabric }), g = new THREE.Group(), Fb = M.sofia;
  extrudePlan(g, M.blackMatte, roundedRect(w - 0.2, d - 0.2, 0.2), 0.03, 0);
  extrudePlan(g, Fb, roundedRect(w, d, 0.38), 0.33, 0.03, 0.04);
  // back + arms: one thick U-shaped band following the rounded outline (arc at the back)
  const R = w / 2, Rz = d / 2, t = 0.2, seg = 48, front = d / 2 - 0.03, pts = [[R, front]];
  for (let i = 0; i <= seg; i++) { const a = Math.PI * (i / seg); pts.push([Math.cos(a) * R, -Math.sin(a) * Rz]); }
  pts.push([-R, front], [-(R - t), front]);
  for (let i = seg; i >= 0; i--) { const a = Math.PI * (i / seg); pts.push([Math.cos(a) * (R - t), -Math.sin(a) * (Rz - t)]); }
  pts.push([R - t, front]);
  extrudePlan(g, Fb, pts, h - 0.36, 0.34, 0.05);
  rboxOn(g, Fb, [w - 2 * t + 0.04, 0.14, d - t - 0.04], [0, 0.32, 0.1], 0.07, 5);
  return g;
}

/** Westwing Nik – tub armchair, 58 × 54 × 80, seat 48, rounded armrest H 70, solid oak legs. */
export function chairNik(ctx, { w = 0.58, d = 0.54, h = 0.8, fabric, wood = '#c9a87c' }) {
  const M = lib(ctx, { nik: fabric, nikWood: ['oakNatural', wood] }), g = new THREE.Group();
  for (const [x, z] of [[-w / 2 + 0.07, d / 2 - 0.07], [w / 2 - 0.07, d / 2 - 0.07], [-w / 2 + 0.07, -d / 2 + 0.08], [w / 2 - 0.07, -d / 2 + 0.08]]) {
    const l = cyl(g, M.nikWood, 0.018, 0.013, 0.4, [x, 0, z], 16); l.rotation.set(z > 0 ? 0.06 : -0.06, 0, x > 0 ? -0.05 : 0.05);
  }
  extrudePlan(g, M.nik, roundedRect(w - 0.04, d - 0.04, 0.2), 0.09, 0.4, 0.03);
  // tub: back + arms as one curved band, armrest height 70, back 80
  const R = w / 2 - 0.01, pts = [], seg = 40, t = 0.07;
  for (let i = 0; i <= seg; i++) { const a = -0.08 + (Math.PI + 0.16) * (i / seg); pts.push([Math.cos(a) * R, -Math.sin(a) * R * 0.9 + 0.02]); }
  for (let i = seg; i >= 0; i--) { const a = -0.08 + (Math.PI + 0.16) * (i / seg); pts.push([Math.cos(a) * (R - t), -Math.sin(a) * (R - t) * 0.9 + 0.02]); }
  extrudePlan(g, M.nik, pts, 0.7 - 0.47, 0.47, 0.03);
  const back = []; for (let i = 0; i <= 24; i++) { const a = Math.PI * 0.22 + Math.PI * 0.56 * (i / 24); back.push([Math.cos(a) * R, -Math.sin(a) * R * 0.9 + 0.02]); }
  for (let i = 24; i >= 0; i--) { const a = Math.PI * 0.22 + Math.PI * 0.56 * (i / 24); back.push([Math.cos(a) * (R - t), -Math.sin(a) * (R - t) * 0.9 + 0.02]); }
  extrudePlan(g, M.nik, back, h - 0.68, 0.68, 0.025);
  return g;
}

/** Westwing Jordan – leather chair on a polished chrome tube frame, 50 × 53 × 81, seat 46. */
export function chairJordan(ctx, { w = 0.5, d = 0.53, h = 0.81, leather = '#5a3a28' }) {
  const M = lib(ctx, { jordan: ['leatherBrown', leather] }), g = new THREE.Group(), Cr = M.chrome;
  for (const s of [-1, 1]) {
    tube(g, Cr, [[s * (w / 2 - 0.03), 0.01, d / 2 - 0.03], [s * (w / 2 - 0.03), 0.42, d / 2 - 0.04], [s * (w / 2 - 0.03), 0.44, -d / 2 + 0.06], [s * (w / 2 - 0.03), h - 0.02, -d / 2 + 0.02]], 0.011, 32);
    tube(g, Cr, [[s * (w / 2 - 0.03), 0.01, d / 2 - 0.03], [s * (w / 2 - 0.035), 0.01, -d / 2 + 0.05], [s * (w / 2 - 0.03), 0.42, -d / 2 + 0.06]], 0.011, 24);
  }
  rboxOn(g, M.jordan, [w - 0.04, 0.07, d - 0.08], [0, 0.4, 0.01], 0.025, 4);
  const b = rbox(g, M.jordan, [w - 0.05, 0.3, 0.05], [0, h - 0.2, -d / 2 + 0.05], 0.022, 4); b.rotation.x = -0.12;
  return g;
}

/** Westwing Eliot sofa bed (2-Sitzer), 180 × 100 × 70, bouclé/fabric in the article colour. */
export function sofaBedEliot(ctx, { w = 1.8, d = 1.0, h = 0.7, fabric, pillows = [] }) {
  const M = lib(ctx, { eliot: fabric });
  for (const p of pillows) if (!M[p]) M[p] = ctx.M[p];
  return C.sofaBed(M, { w, d, h, seatH: 0.42, fabric: 'eliot', legs: 'blackMatte', pillows });
}

/** IKEA HATTEFJÄLL – office chair with armrests, 68 × 68 × ≤ 114, Gunnared beige / white. */
export function chairHattefjall(ctx, { w = 0.68, d = 0.68, h = 1.1 }) {
  const M = lib(ctx, { hf: ['linenBeige', '#cdc2b0'], hfFrame: ['plasticWhite', '#e9e8e4'] }), g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2, x = Math.cos(a) * 0.32, z = Math.sin(a) * 0.32;
    tube(g, M.hfFrame, [[0, 0.1, 0], [x * 0.6, 0.085, z * 0.6], [x, 0.07, z]], 0.016, 12);
    g.add(mesh(new THREE.SphereGeometry(0.03, 16, 12), M.hfFrame, [x, 0.03, z]));
  }
  cyl(g, M.hfFrame, 0.025, 0.025, 0.34, [0, 0.1, 0], 16);
  rboxOn(g, M.hf, [0.52, 0.09, 0.5], [0, 0.44, 0.03], 0.04, 4);
  const back = rbox(g, M.hf, [0.48, 0.58, 0.08], [0, 0.86, -0.24], 0.05, 5); back.rotation.x = -0.1;
  for (const s of [-1, 1]) { box(g, M.hfFrame, [0.03, 0.2, 0.03], [s * 0.29, 0.55, 0.0]); rboxOn(g, M.hfFrame, [0.07, 0.03, 0.28], [s * 0.29, 0.64, 0.02], 0.012, 3); }
  void w; void d; void h;
  return g;
}

/** Westwing Lucie – bouclé swivel desk chair, 57 × 57 × 77–86, white bouclé, golden legs, castors. */
export function chairLucie(ctx, { w = 0.57, d = 0.57, h = 0.8 }) {
  const M = lib(ctx, { lucie: ['boucle', '#efebe3', { dropMap: true }], gold: ['brassBrushed', '#c2a066'] }), g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2, x = Math.cos(a) * 0.28, z = Math.sin(a) * 0.28;
    tube(g, M.gold, [[0, 0.1, 0], [x * 0.6, 0.085, z * 0.6], [x, 0.07, z]], 0.012, 12);
    g.add(mesh(new THREE.SphereGeometry(0.025, 16, 12), M.blackMatte, [x, 0.025, z]));
  }
  cyl(g, M.gold, 0.02, 0.02, 0.32, [0, 0.1, 0], 16);
  extrudePlan(g, M.lucie, circle(w / 2 - 0.02, 64), 0.1, 0.4, 0.035);
  const R = w / 2, pts = [];
  for (let i = 0; i <= 32; i++) { const a = -0.1 + (Math.PI + 0.2) * (i / 32); pts.push([Math.cos(a) * R, -Math.sin(a) * R + 0.02]); }
  for (let i = 32; i >= 0; i--) { const a = -0.1 + (Math.PI + 0.2) * (i / 32); pts.push([Math.cos(a) * (R - 0.08), -Math.sin(a) * (R - 0.08) + 0.02]); }
  extrudePlan(g, M.lucie, pts, h - 0.5, 0.48, 0.035);
  void d;
  return g;
}

// =========================================================================================
// Tables
/** Ferm Living Distinct Grande – one solid travertine table with softened edges (block base). */
export function travertineBlockTable(ctx, { w, d, h, mat = 'travertineVein' }) {
  const M = lib(ctx), g = new THREE.Group();
  rboxOn(g, M[mat], [w, 0.05, d], [0, h - 0.05, 0], 0.012, 3);
  rboxOn(g, M[mat], [w * 0.56, h - 0.05, d * 0.6], [0, 0, 0], 0.01, 3);
  return g;
}

/** Ferm Living Burl – oval coffee table, dark-stained burl veneer, 117 × 70 × 30. */
export function burlTable(ctx, { w = 1.17, d = 0.7, h = 0.3 }) {
  const M = lib(ctx, { burl: ['walnut', '#6e4a33'] }), g = new THREE.Group();
  const oval = Array.from({ length: 96 }, (_, i) => { const a = (i / 96) * Math.PI * 2; const k = 1 + 0.035 * Math.sin(a * 3 + 0.6); return [Math.cos(a) * w / 2 * k, Math.sin(a) * d / 2 * k]; });
  extrudePlan(g, M.burl, oval.map(([x, z]) => [x * 0.8, z * 0.74]), h - 0.04, 0, 0.01);
  extrudePlan(g, M.burl, oval, 0.04, h - 0.04, 0.012);
  return g;
}

/** Westwing Marisa – travertine coffee table on a monolithic plinth (100 × 50 × 35). */
export function monolithTable(ctx, { w = 1.0, d = 0.5, h = 0.35 }) {
  const M = lib(ctx), g = new THREE.Group();
  rboxOn(g, M.travertineVein, [w, 0.05, d], [0, h - 0.05, 0], 0.015, 3);
  extrudePlan(g, M.travertineVein, roundedRect(w * 0.62, d * 0.68, 0.12), h - 0.05, 0, 0.006);
  return g;
}

/** Round drum side table (Marisa Ø 35 × 50 travertine, HKliving Argent chrome Ø 35 × 45). */
export function drumSide(ctx, { dia = 0.35, h = 0.5, mat = 'travertineVein', color = null }) {
  const M = lib(ctx, color ? { side: [mat, color] } : {}), m = color ? 'side' : mat;
  return C.drumTable(M, { dia, h, top: m, base: m, baseDia: dia * 0.9 });
}

/** Kartell Componibili – round modular container, 2 elements, Ø 42 × 62, glossy ABS. */
export function componibili(ctx, { dia = 0.42, h = 0.62, color = '#2b6669' }) {
  const M = lib(ctx, { abs: ['lacquerBlack', color] }), g = new THREE.Group();
  extrudePlan(g, M.abs, circle(dia / 2, 96), h - 0.005, 0, 0.004);
  for (const y of [0.03, h / 2 + 0.01]) {
    const door = cyl(g, M.abs, dia / 2 + 0.002, dia / 2 + 0.002, h / 2 - 0.05, [0, y, 0], 96, true); door.scale.set(1, 1, 1);
    for (const k of [0.4, 0.6]) box(g, M.abs, [0.004, 0.02, 0.012], [Math.cos(k) * 0, y + (h / 2 - 0.05) * k, dia / 2 + 0.004]);
  }
  for (const y of [h / 2 - 0.004]) box(g, M.matteBlack, [dia * 0.9, 0.003, 0.003], [0, y, dia / 2 + 0.001]);
  return g;
}

/** Round dining table on a drum or slim column (Westwing Abby, Noam). */
export function diningRound(ctx, { dia = 1.2, h = 0.75, top, topColor = null, base = 'drum', baseMat = 'oakDark', baseColor = null, baseDia = 0.61 }) {
  const M = lib(ctx, { tTop: topColor ? [top, topColor] : ctx.productM[top], tBase: baseColor ? [baseMat, baseColor] : ctx.productM[baseMat] });
  return C.roundTable(M, { dia, h, top: 'tTop', topT: 0.03, base, baseMat: 'tBase', baseDia });
}

/** Console with stone top: Chandler (dark oak, travertine) or Noam (marble on brushed legs). */
export function console_(ctx, { w, d, h, kind = 'chandler', top = 'travertineVein', topColor = null }) {
  const M = lib(ctx, { cTop: topColor ? [top, topColor] : ctx.productM[top], cOak: ['oakDark', '#4e3627'] }), g = new THREE.Group();
  if (kind === 'chandler') {
    for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) for (const z of [-d / 2 + 0.04, d / 2 - 0.04]) boxOn(g, M.cOak, [0.05, 0.6, 0.05], [x, 0, z]);
    boxOn(g, M.cOak, [w, h - 0.62 - 0.025, d - 0.01], [0, 0.6, -0.005]);
    for (let i = 0; i < 2; i++) box(g, M.cOak, [w / 2 - 0.03, h - 0.67, 0.012], [-w / 4 + (w / 2) * i, 0.6 + (h - 0.625) / 2, d / 2 - 0.004]);
    box(g, M.matteBlack, [0.003, h - 0.66, 0.003], [0, 0.6 + (h - 0.625) / 2, d / 2 + 0.002]);
    boxOn(g, M.cOak, [w - 0.1, 0.025, d - 0.1], [0, 0.12, 0]);
    rboxOn(g, M.cTop, [w + 0.01, 0.025, d + 0.005], [0, h - 0.025, 0], 0.006, 2);
  } else {
    const L = M.steel;
    for (const x of [-w / 2 + 0.05, w / 2 - 0.05]) for (const z of [-d / 2 + 0.05, d / 2 - 0.05]) cyl(g, L, 0.012, 0.012, h - 0.03, [x, 0, z], 16);
    for (const z of [-d / 2 + 0.05, d / 2 - 0.05]) box(g, L, [w - 0.1, 0.02, 0.02], [0, h - 0.06, z]);
    rboxOn(g, M.cTop, [w, 0.03, d], [0, h - 0.03, 0], 0.006, 2);
  }
  return g;
}

/** Desk: IKEA MITTZON (walnut veneer, black frame, sit/stand) or Westwing Marte (light oak). */
export function desk(ctx, { w = 1.2, d = 0.6, h = 0.75, kind = 'mittzon' }) {
  const g = new THREE.Group();
  if (kind === 'mittzon') {
    const M = lib(ctx, { top: ['walnut', '#6a4e3c'] });
    boxOn(g, M.top, [w, 0.025, d], [0, h - 0.025, 0]);
    for (const s of [-1, 1]) {
      boxOn(g, M.blackMatte, [0.06, 0.03, d - 0.06], [s * (w / 2 - 0.12), 0, 0]);
      boxOn(g, M.blackMatte, [0.06, h - 0.1, 0.05], [s * (w / 2 - 0.12), 0.03, 0]);
      boxOn(g, M.blackMatte, [0.05, 0.04, d - 0.1], [s * (w / 2 - 0.12), h - 0.065, 0]);
    }
    boxOn(g, M.blackMatte, [w - 0.3, 0.04, 0.04], [0, h - 0.065, -d / 2 + 0.12]);
    box(g, M.blackMatte, [0.06, 0.012, 0.03], [w / 2 - 0.12, h - 0.03, d / 2 - 0.01]);
  } else {
    const M = lib(ctx, { top: ['oakNatural', '#d9bf98'] });
    boxOn(g, M.top, [w, 0.028, d], [0, h - 0.028, 0]);
    for (const x of [-w / 2 + 0.05, w / 2 - 0.05]) for (const z of [-d / 2 + 0.05, d / 2 - 0.05]) { const l = cyl(g, M.top, 0.02, 0.016, h - 0.028, [x, 0, z], 16); l.rotation.set(z > 0 ? 0.04 : -0.04, 0, x > 0 ? -0.04 : 0.04); }
    boxOn(g, M.top, [w - 0.14, 0.06, d - 0.14], [0, h - 0.088, 0]);
  }
  return g;
}

// =========================================================================================
// Storage
/** Sideboard / lowboard on legs (Chandler panel doors, Soley wavy ribs, Cadi, Calary ribbed). */
export function cabinet(ctx, { w, d, h, legH = 0.15, kind = 'panel', color = '#4e3627', wood = 'oakDark', handle = null, doors = null }) {
  const M = lib(ctx, { cab: [wood, color], ...(handle ? { hdl: handle === 'gold' ? ['brassBrushed', '#c2a066'] : handle === 'brushed' ? ['steel', '#a9a7a2'] : ['blackMatte', '#151515'] } : {}) });
  const nd = doors ?? Math.max(2, Math.round(w / 0.45));
  if (kind === 'wave') {
    const g = C.cabinet(M, { w, d, h, legH, fronts: 'fluted', doors: nd, mat: 'cab', legs: 'post' });
    return g;
  }
  const g = C.cabinet(M, { w, d, h, legH, fronts: kind === 'ribbed' ? 'ribbed' : kind === 'plain' ? 'plain' : 'panel', doors: nd, mat: 'cab', pull: null });
  if (handle) for (let i = 0; i < nd; i++) {
    const dw = (w - 0.02) / nd, x = -w / 2 + 0.01 + dw * (i + 0.5) + (i % 2 ? -1 : 1) * (dw / 2 - 0.05);
    if (handle === 'gold') cyl(g, M.hdl, 0.012, 0.012, 0.014, [x, legH + (h - legH) * 0.62, d / 2 - 0.004], 16).rotation.x = Math.PI / 2;
    else box(g, M.hdl, [0.012, 0.12, 0.014], [x, legH + (h - legH) * 0.62, d / 2 + 0.004]);
  }
  return g;
}

/** Vitrine: metal cabinet with fluted glass (The Collector) or wooden glass cabinet (Zamora). */
export function vitrine(ctx, { w, d, h, kind = 'metal', color = '#a7b59e' }) {
  const M = lib(ctx, { body: kind === 'metal' ? ['blackMatte', color] : ['oakDark', color] }), g = new THREE.Group(), legH = kind === 'metal' ? 0.1 : 0.14;
  for (const x of [-w / 2 + 0.03, w / 2 - 0.03]) for (const z of [-d / 2 + 0.03, d / 2 - 0.03]) boxOn(g, M.body, [0.03, legH, 0.03], [x, 0, z]);
  const t = kind === 'metal' ? 0.015 : 0.025;
  boxOn(g, M.body, [w, t, d], [0, legH, 0]);
  boxOn(g, M.body, [w, t, d], [0, h - t, 0]);
  for (const s of [-1, 1]) boxOn(g, M.body, [t, h - legH, d], [s * (w / 2 - t / 2), legH, 0]);
  boxOn(g, M.body, [w - 2 * t, h - legH, 0.01], [0, legH, -d / 2 + 0.005]);
  for (const y of [0.5, 0.82, 1.14, 1.46].filter((y) => y < h - 0.15)) boxOn(g, M.glass, [w - 2 * t, 0.008, d - 0.04], [0, y, 0]);
  const fronts = 2, fw = (w - 2 * t) / fronts;
  for (let i = 0; i < fronts; i++) {
    const cx = -w / 2 + t + fw * (i + 0.5);
    boxOn(g, M.body, [fw, 0.03, 0.02], [cx, legH + t, d / 2 - 0.01]);
    boxOn(g, M.body, [fw, 0.03, 0.02], [cx, h - t - 0.03, d / 2 - 0.01]);
    for (const s of [-1, 1]) boxOn(g, M.body, [0.025, h - legH - 2 * t, 0.02], [cx + s * (fw / 2 - 0.0125), legH + t, d / 2 - 0.01]);
    // reeded glass reads as vertical ribs
    const glass = boxOn(g, M.glass, [fw - 0.05, h - legH - 2 * t - 0.06, 0.006], [cx, legH + t + 0.03, d / 2 - 0.012]); glass.castShadow = false;
    if (kind === 'metal') for (let k = 0; k < 14; k++) { const r = box(g, M.glass, [0.004, h - legH - 2 * t - 0.07, 0.004], [cx - (fw - 0.06) / 2 + ((fw - 0.06) * (k + 0.5)) / 14, legH + t + 0.035 + (h - legH - 2 * t - 0.07) / 2, d / 2 - 0.008]); r.castShadow = false; }
    box(g, M.body, [0.012, 0.12, 0.02], [cx + (i ? -1 : 1) * (fw / 2 - 0.05), legH + (h - legH) * 0.5, d / 2 + 0.006]);
  }
  // bar styling: bottles and glasses
  const bottle = (x, z, y, mat, s = 1) => lathe(g, mat, [[0, 0], [0.035 * s, 0], [0.036 * s, 0.18 * s], [0.014 * s, 0.24 * s], [0.012 * s, 0.3 * s], [0.0, 0.3 * s]], [x, y, z], 24);
  bottle(-w / 4, -0.04, 0.508, M.smokedGlass); bottle(-w / 4 + 0.09, 0.0, 0.508, M.amberGlass, 0.9);
  for (let k = 0; k < 4; k++) lathe(g, M.glass, [[0, 0], [0.03, 0], [0.032, 0.09], [0.0, 0.09]], [w / 8 + (k % 2) * 0.07, 0.828, -0.06 + Math.floor(k / 2) * 0.09], 20);
  return g;
}

/** Tylko shelf (Original Modern / Tone): doors below, open compartments above, volltonfarbig. */
export function tylko(ctx, { w, d, h, color, doorsH = 0.72, cols = 2 }) {
  const M = lib(ctx, { ty: ['lacquerBlack', color] }), g = new THREE.Group(), t = 0.018, Ty = M.ty;
  boxOn(g, Ty, [w, 0.04, d - 0.02], [0, 0, -0.01]);
  for (const s of [-1, 1]) boxOn(g, Ty, [t, h - 0.04, d], [s * (w / 2 - t / 2), 0.04, 0]);
  boxOn(g, Ty, [w - 2 * t, h - 0.04, 0.008], [0, 0.04, -d / 2 + 0.004]);
  const rows = Math.max(3, Math.round((h - doorsH) / 0.36));
  const ys = [0.04, doorsH];
  for (let i = 1; i <= rows; i++) ys.push(doorsH + ((h - doorsH - t) * i) / rows);
  for (const y of ys) boxOn(g, Ty, [w - 2 * t, t, d - 0.01], [0, y, 0]);
  for (let c = 1; c < cols; c++) boxOn(g, Ty, [t, h - doorsH - t, d - 0.01], [-w / 2 + (w * c) / cols, doorsH, 0]);
  const dw = (w - 2 * t) / cols;
  for (let c = 0; c < cols; c++) boxOn(g, Ty, [dw - 0.006, doorsH - 0.05, 0.016], [-w / 2 + t + dw * (c + 0.5), 0.045, d / 2 - 0.008]);
  g.userData.shelves = ys.slice(2, -1).map((y) => y + t);
  g.userData.top = h;
  return g;
}

/** IKEA BILLY (80 × 28 × 202) + Aufsatz (35 cm) in walnut effect, 237 cm in total. */
export function billy(ctx, { w = 0.8, d = 0.28, h = 2.37 }) {
  const M = lib(ctx, { billy: ['walnut', '#6c4f3c'] });
  const g = C.bookcase(M, { w, d, h, shelves: 6, mat: 'billy' });
  boxOn(g, M.billy, [w - 0.044, 0.02, d], [0, 2.02, 0]);
  return g;
}

/** IKEA BOAXEL – white wall-mounted shelving 62 × 40 × 201 with rails and wire baskets. */
export function boaxel(ctx, { w = 0.62, d = 0.4, h = 2.01 }) {
  const M = lib(ctx, { bx: ['plasticWhite', '#f1f1ef'] }), g = new THREE.Group();
  for (const x of [-w / 2 + 0.03, w / 2 - 0.03]) boxOn(g, M.bx, [0.025, h, 0.015], [x, 0, -d / 2 + 0.008]);
  boxOn(g, M.bx, [w, 0.03, 0.015], [0, h - 0.03, -d / 2 + 0.008]);
  for (const y of [0.35, 0.75, 1.15, 1.55, 1.92]) boxOn(g, M.bx, [w - 0.02, 0.018, d - 0.02], [0, y, 0.005]);
  for (const y of [0.04, 0.4]) { boxOn(g, M.steel, [w - 0.06, 0.2, d - 0.06], [0, y + 0.0, 0.01]); }
  return g;
}

/** Shoe cabinet: IKEA BISSA (3 tilt compartments) or Westwing Seaford (wood, black frame). */
export function shoeCabinet(ctx, { w, d, h, kind = 'bissa' }) {
  const g = new THREE.Group();
  if (kind === 'bissa') {
    const M = lib(ctx, { bs: ['lacquerBlack', '#3a2c25'] });
    boxOn(g, M.bs, [w, h, d], [0, 0, 0]);
    for (let i = 0; i < 3; i++) { const y = 0.03 + i * ((h - 0.06) / 3); box(g, M.matteBlack, [w - 0.02, 0.003, 0.003], [0, y + (h - 0.06) / 3, d / 2 + 0.001]); box(g, M.steel, [0.1, 0.012, 0.012], [0, y + (h - 0.06) / 3 - 0.05, d / 2 + 0.006]); }
  } else {
    const M = lib(ctx, { sf: ['oakDark', '#4b3424'] });
    for (const x of [-w / 2 + 0.015, w / 2 - 0.015]) for (const z of [-d / 2 + 0.015, d / 2 - 0.015]) boxOn(g, M.blackMatte, [0.02, h, 0.02], [x, 0, z]);
    boxOn(g, M.sf, [w - 0.04, h - 0.12, d - 0.03], [0, 0.1, 0]);
    for (let i = 0; i < 3; i++) { const y = 0.1 + (i + 1) * ((h - 0.14) / 3); box(g, M.matteBlack, [w - 0.06, 0.003, 0.003], [0, y, d / 2 - 0.013]); box(g, M.blackMatte, [0.12, 0.012, 0.012], [0, y - 0.04, d / 2 - 0.006]); }
    boxOn(g, M.sf, [w, 0.02, d], [0, h - 0.02, 0]);
  }
  return g;
}

/** PAX carcasses with TONSTAD doors (ivory / oak veneer), ceiling filler panel (Deckenblende). */
export function pax(ctx, { w, d, doors, front = '#efe9dd', frontWood = false, filler = null }) {
  const M = lib(ctx, { door: frontWood ? ['oakNatural', front] : ['plasticWhite', front], fill: filler ? ['plasticWhite', filler] : ['plasticWhite', front] });
  const g = C.paxWardrobe(M, { w, d: d + 0.02, h: 2.364, doors, fronts: 'flat', frontMat: 'door', handle: 'edge', handleMat: frontWood ? 'door' : 'door', plinth: 'door' });
  boxOn(g, M.fill, [w, 2.56 - 2.364, 0.02], [0, 2.364, d / 2 - 0.0]);
  return g;
}

/** Nightstands: Holden (walnut, travertine grip plate, door), Soren (mango, chrome legs, doors),
 *  Coya (greige lacquer, 2 drawers), Zumi (light oak, travertine top, brass knobs). */
export function nightstand(ctx, { w, d, h, kind }) {
  const g = new THREE.Group();
  if (kind === 'holden') {
    const M = lib(ctx, { hw: ['walnut', '#4f382b'] });
    boxOn(g, M.hw, [w - 0.04, 0.07, d - 0.04], [0, 0, -0.01]);
    rboxOn(g, M.hw, [w, h - 0.07, d], [0, 0.07, 0], 0.01, 2);
    box(g, M.matteBlack, [w - 0.04, h - 0.13, 0.003], [0, 0.07 + (h - 0.07) / 2, d / 2 + 0.001]);
    boxOn(g, M.travertineVein, [0.14, 0.035, 0.02], [w / 2 - 0.1, h - 0.11, d / 2 + 0.008]);
  } else if (kind === 'soren') {
    const M = lib(ctx, { mg: ['walnut', '#4a3326'] });
    for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) for (const z of [-d / 2 + 0.04, d / 2 - 0.04]) cyl(g, M.chrome, 0.01, 0.01, 0.16, [x, 0, z], 16);
    boxOn(g, M.mg, [w, h - 0.16, d], [0, 0.16, 0]);
    box(g, M.matteBlack, [0.003, h - 0.2, 0.003], [0, 0.16 + (h - 0.16) / 2, d / 2 + 0.001]);
  } else if (kind === 'coya') {
    const M = lib(ctx, { cy: ['lacquerGreige', '#c9bfb1'] });
    for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) for (const z of [-d / 2 + 0.04, d / 2 - 0.04]) cyl(g, M.brassBrushed, 0.008, 0.008, 0.12, [x, 0, z], 12);
    rboxOn(g, M.cy, [w, h - 0.12, d], [0, 0.12, 0], 0.012, 3);
    for (const y of [0.12 + (h - 0.12) * 0.33, 0.12 + (h - 0.12) * 0.75]) cyl(g, M.brassBrushed, 0.012, 0.012, 0.016, [0, y, d / 2 + 0.0], 16).rotation.x = Math.PI / 2;
    box(g, M.matteBlack, [w - 0.03, 0.003, 0.003], [0, 0.12 + (h - 0.12) / 2, d / 2 + 0.001]);
  } else {
    const M = lib(ctx);
    const z = C.zumiLowboard(M, { w, d, h, legH: 0.18, mat: 'oakNatural', top: 'travertineVein', handle: 'brassBrushed' });
    g.add(z);
  }
  g.userData.top = h;
  return g;
}

// =========================================================================================
// Beds
/** Westwing Dream bed with storage (196 × 222, headboard H 110) in bouclé or cord. */
export function bedDream(ctx, { w = 1.96, d = 2.22, h = 1.1, fabric, bedding = 'bedding', accent = 'beddingSand', throwMat, pillows }) {
  const M = lib(ctx, { dream: fabric });
  for (const k of [bedding, accent, throwMat, ...(pillows ?? [])]) if (k && !M[k]) M[k] = ctx.M[k];
  return C.bedModel(M, { kind: 'dream', outerW: w, outerL: d, headH: h, headT: 0.14, frame: 'dream', bedding, accent, throwMat, pillows });
}

// =========================================================================================
// Lighting
const ceilingH = 2.56;

/** Flush or short-drop ceiling lamp: Lido/Vanja (opal globe Ø 20), GÅSGRUND (Ø 30 × 11), Svep, Eloise. */
export function ceilingLamp(ctx, { kind = 'lido', dia = 0.2, h = 0.23, canopy = 'blackMatte' }) {
  const M = lib(ctx), g = new THREE.Group(), op = glowGlass(ctx);
  const top = ceilingH;
  if (kind === 'lido' || kind === 'vanja') {
    cyl(g, M[canopy], 0.05, 0.05, 0.02, [0, top - 0.02, 0], 24);
    cyl(g, M[canopy], 0.025, 0.03, 0.03, [0, top - 0.05, 0], 20);
    const s = sphere(g, op, dia / 2, [0, top - 0.05 - dia / 2 + 0.01, 0], 32); s.castShadow = false;
    if (kind === 'lido') for (const a of [0, Math.PI / 2]) { const r = mesh(new THREE.TorusGeometry(dia / 2 + 0.002, 0.0025, 6, 48), M.blackMatte, [0, top - 0.05 - dia / 2 + 0.01, 0]); r.rotation.y = a; g.add(r); }
  } else if (kind === 'gasgrund') {
    cyl(g, M.steel, dia / 2 * 0.6, dia / 2 * 0.6, 0.012, [0, top - 0.012, 0], 32);
    const s = lathe(g, op, [[0, 0], [dia * 0.35, 0.01], [dia / 2, h * 0.6], [dia * 0.46, h], [0, h]], [0, top - h, 0], 48); s.castShadow = false;
  } else if (kind === 'svep') {
    cyl(g, M.brassBrushed, 0.06, 0.06, 0.03, [0, top - 0.03, 0], 32);
    lathe(g, M.brassBrushed, [[0.04, h], [dia / 2, 0.035], [dia / 2 + 0.005, 0.02], [0.03, 0.02]], [0, top - h, 0], 64);
    const s = cyl(g, op, dia / 2 - 0.01, dia / 2 - 0.02, 0.03, [0, top - h - 0.005, 0], 64); s.castShadow = false;
  } else if (kind === 'eloise') {
    cyl(g, M.steel, 0.05, 0.05, 0.015, [0, top - 0.015, 0], 24);
    const blob = Array.from({ length: 96 }, (_, i) => { const a = (i / 96) * Math.PI * 2; const r = dia / 2 * (0.86 + 0.14 * Math.sin(a * 3) * Math.cos(a)); return [Math.cos(a) * r, Math.sin(a) * r]; });
    const s = extrudePlan(g, op, blob, h - 0.02, top - h, 0.03); s.castShadow = false;
  }
  const l = lampLight('point', kind === 'eloise' ? 900 : kind === 'svep' ? 1100 : 650, { distance: 7 }); l.position.set(0, top - h - 0.06, 0); g.add(l);
  return g;
}

/** Pendant over the table: Kushi cluster, Glo-Ball, Mirror Ball, Semi 47 (UK = bottom height). */
export function pendant(ctx, { kind, dia, bottom = 1.42, offsets = null }) {
  const M = lib(ctx, { copper: ['brass', '#b8703e'], gold: ['brass', '#cfa95f'] }), g = new THREE.Group();
  const cord = (x, z, y) => { const c = cyl(g, M.blackMetal, 0.0018, 0.0018, ceilingH - y, [x, y, z], 6); c.castShadow = false; };
  if (kind === 'kushi') {
    cyl(g, M.copper, 0.09, 0.09, 0.025, [0, ceilingH - 0.025, 0], 32);
    for (const [x, z, b] of offsets ?? [[0.13, 0, bottom], [-0.07, 0.11, bottom + 0.08], [-0.07, -0.11, bottom + 0.15]]) {
      const top = b + 0.26;
      cord(x, z, top);
      lathe(g, M.copper, [[0.006, 0.26], [0.03, 0.25], [0.06, 0.2], [0.08, 0.13], [0.08, 0.12], [0.0, 0.12]], [x, b, z], 48);
      const s = sphere(g, glowGlass(ctx), 0.075, [x, b + 0.08, z], 32, [1, 0.75, 1]); s.castShadow = false;
      const l = lampLight('point', 260, { distance: 5 }); l.position.set(x, b + 0.06, z); g.add(l);
    }
  } else if (kind === 'globe') {
    cyl(g, M.steel, 0.05, 0.05, 0.02, [0, ceilingH - 0.02, 0], 24);
    cord(0, 0, bottom + dia);
    const s = sphere(g, glowGlass(ctx), dia / 2, [0, bottom + dia / 2 - 0.02, 0], 48, [1, 0.8 / 0.9, 1]); s.castShadow = false;
    const l = lampLight('point', 1600, { distance: 9 }); l.position.set(0, bottom + dia / 2, 0); g.add(l);
  } else if (kind === 'mirrorball') {
    cyl(g, M.chrome, 0.05, 0.05, 0.02, [0, ceilingH - 0.02, 0], 24);
    cord(0, 0, bottom + dia);
    sphere(g, M.chrome, dia / 2, [0, bottom + dia / 2, 0], 64);
    const s = cyl(g, glowGlass(ctx), dia * 0.22, dia * 0.22, 0.004, [0, bottom - 0.003, 0], 32); s.castShadow = false;
    const l = lampLight('spot', 900, { angle: 1.6, penumbra: 0.8, distance: 6 }); l.position.set(0, bottom - 0.01, 0); g.add(l);
  } else if (kind === 'semi') {
    cyl(g, M.gold, 0.05, 0.05, 0.02, [0, ceilingH - 0.02, 0], 24);
    cord(0, 0, bottom + dia * 0.5);
    lathe(g, M.gold, [[0.015, dia * 0.5], [0.03, dia * 0.49], [dia * 0.25, dia * 0.42], [dia * 0.43, dia * 0.25], [dia * 0.5, 0.005], [dia * 0.5, 0], [dia * 0.49, 0], [dia * 0.42, dia * 0.24], [dia * 0.24, dia * 0.41], [0.02, dia * 0.47]], [0, bottom, 0], 96);
    const s = sphere(g, glowGlass(ctx), 0.05, [0, bottom + 0.06, 0], 20); s.castShadow = false;
    const l = lampLight('spot', 1100, { angle: 1.7, penumbra: 0.85, distance: 7 }); l.position.set(0, bottom + 0.05, 0); g.add(l);
  }
  return g;
}

/** Floor lamps: Kushi (copper, opal), Gubi Multi-Lite (chrome), Flos IC F1 (brass + opal sphere). */
export function floorLamp(ctx, { kind, h }) {
  const M = lib(ctx, { copper: ['brass', '#b8703e'], gold: ['brassBrushed', '#c2a066'] }), g = new THREE.Group(), op = glowGlass(ctx);
  if (kind === 'kushi') {
    lathe(g, M.copper, [[0, 0], [0.14, 0], [0.145, 0.015], [0.03, 0.03], [0, 0.03]], [0, 0, 0], 48);
    cyl(g, M.copper, 0.009, 0.009, h - 0.36, [0, 0.03, 0], 16);
    lathe(g, M.copper, [[0.01, 0.34], [0.05, 0.33], [0.15, 0.2], [0.215, 0.07], [0.215, 0.06], [0, 0.06]], [0, h - 0.34, 0], 64);
    const s = sphere(g, op, 0.17, [0, h - 0.25, 0], 40, [1, 0.6, 1]); s.castShadow = false;
    const l = lampLight('point', 900, { distance: 8 }); l.position.set(0, h - 0.27, 0); g.add(l);
  } else if (kind === 'multilite') {
    const Cr = M.chrome;
    lathe(g, Cr, [[0, 0], [0.18, 0], [0.18, 0.02], [0.03, 0.035], [0, 0.035]], [0, 0, 0], 48);
    cyl(g, Cr, 0.012, 0.012, h - 0.4, [0, 0.035, 0], 16);
    const hh = h - 0.2;
    const outer = new THREE.Mesh(new THREE.SphereGeometry(0.18, 48, 24, 0, Math.PI, 0, Math.PI), Cr); outer.position.set(0, hh, 0); outer.rotation.y = -Math.PI / 2 + 0.6; g.add(outer);
    const inner = new THREE.Mesh(new THREE.SphereGeometry(0.175, 48, 24, 0, Math.PI, 0, Math.PI), Cr); inner.position.set(0, hh, 0); inner.rotation.set(0.9, Math.PI / 2 + 0.6, 0); g.add(inner);
    const b = sphere(g, op, 0.05, [0, hh, 0], 16); b.castShadow = false;
    const l = lampLight('point', 800, { distance: 7 }); l.position.set(0, hh, 0.1); g.add(l);
  } else if (kind === 'icf1') {
    extrudePlan(g, M.gold, circle(0.1375, 64), 0.012, 0, 0.003);
    cyl(g, M.gold, 0.006, 0.006, h - 0.25, [0, 0.012, 0], 12);
    tube(g, M.gold, [[0, h - 0.24, 0], [0.04, h - 0.2, 0], [0.06, h - 0.16, 0]], 0.005, 16);
    const s = sphere(g, op, 0.1, [0.06, h - 0.1, 0], 40); s.castShadow = false;
    const l = lampLight('point', 700, { distance: 7 }); l.position.set(0.06, h - 0.1, 0); g.add(l);
  }
  return g;
}

/** Table lamps: Kian (milk glass on copper foot), PH 3½-2½, IC T1, Flowerpot VP3/VP9,
 *  Panthella 160, Multi-Lite Portable, Bestlite BL1. */
export function tableLamp(ctx, { kind, metal = 'chrome' }) {
  const M = lib(ctx, { copper: ['brass', '#b8703e'], gold: ['brassBrushed', '#c2a066'], brown: ['opal', '#7a5a45'] }), g = new THREE.Group(), op = glowGlass(ctx);
  const Mt = metal === 'copper' ? M.copper : metal === 'brass' ? M.gold : metal === 'black' ? M.blackMatte : M.chrome;
  let light = [0, 0.3, 0], lumen = 300;
  if (kind === 'kian') {
    lathe(g, M.copper, [[0, 0], [0.07, 0], [0.075, 0.01], [0.02, 0.2], [0, 0.2]], [0, 0, 0], 48);
    const s = lathe(g, op, [[0.0, 0.35], [0.06, 0.345], [0.13, 0.3], [0.15, 0.24], [0.14, 0.22], [0.02, 0.21]], [0, 0, 0], 64); s.castShadow = false;
    light = [0, 0.24, 0];
  } else if (kind === 'ph') {
    lathe(g, M.copper, [[0, 0], [0.09, 0], [0.09, 0.02], [0.012, 0.03], [0, 0.03]], [0, 0, 0], 48);
    cyl(g, M.copper, 0.008, 0.008, 0.3, [0, 0.03, 0], 16);
    for (const [r, y, dy] of [[0.165, 0.33, 0.07], [0.12, 0.38, 0.05], [0.075, 0.42, 0.035]]) { const s = lathe(g, op, [[r * 0.35, dy], [r * 0.7, dy * 0.75], [r, 0], [r * 0.98, -0.004], [r * 0.68, dy * 0.72], [r * 0.33, dy - 0.004]], [0, y - dy, 0], 64); s.castShadow = false; }
    light = [0, 0.32, 0]; lumen = 420;
  } else if (kind === 'ict1' || kind === 'ict1low') {
    const hh = kind === 'ict1' ? 0.44 : 0.38, base = kind === 'ict1' ? 0.16 : 0.088;
    extrudePlan(g, Mt, circle(base, 64), 0.01, 0, 0.002);
    cyl(g, Mt, 0.005, 0.005, hh - 0.25, [0, 0.01, 0], 12);
    tube(g, Mt, [[0, hh - 0.24, 0], [0.03, hh - 0.205, 0], [0.045, hh - 0.18, 0]], 0.004, 16);
    const s = sphere(g, op, 0.1, [0.045, hh - 0.1, 0], 40); s.castShadow = false;
    light = [0.045, hh - 0.1, 0]; lumen = 380;
  } else if (kind === 'vp3' || kind === 'vp9') {
    const hh = kind === 'vp3' ? 0.5 : 0.295, r = kind === 'vp3' ? 0.115 : 0.08;
    lathe(g, Mt, [[0, 0], [r * 0.6, 0], [r * 0.62, 0.01], [0.012, 0.03], [0, 0.03]], [0, 0, 0], 48);
    cyl(g, Mt, 0.01, 0.01, hh - r * 1.9, [0, 0.03, 0], 16);
    lathe(g, Mt, [[0, r * 0.95], [r * 0.6, r * 0.8], [r, r * 0.35], [r * 0.99, r * 0.34], [0.01, r * 0.5]], [0, hh - r * 0.95, 0], 64);
    lathe(g, Mt, [[0, 0], [r * 0.6, r * 0.12], [r, r * 0.55], [r * 0.99, r * 0.56], [0.01, r * 0.45]], [0, hh - r * 1.9, 0], 64);
    const b = sphere(g, op, r * 0.3, [0, hh - r * 1.1, 0], 16); b.castShadow = false;
    light = [0, hh - r * 1.1, 0];
  } else if (kind === 'panthella') {
    lathe(g, Mt, [[0, 0], [0.065, 0], [0.068, 0.006], [0.012, 0.04], [0.008, 0.12], [0, 0.12]], [0, 0, 0], 48);
    const s = lathe(g, metal === 'brass' ? M.gold : M.brown, [[0, 0.24], [0.05, 0.235], [0.08, 0.19], [0.082, 0.12], [0.07, 0.122], [0.01, 0.16]], [0, 0, 0], 64);
    if (metal !== 'brass') s.castShadow = false;
    light = [0, 0.13, 0];
  } else if (kind === 'multiliteportable') {
    lathe(g, M.gold, [[0, 0], [0.07, 0], [0.072, 0.008], [0.012, 0.03], [0, 0.03]], [0, 0, 0], 48);
    cyl(g, M.gold, 0.007, 0.007, 0.15, [0, 0.03, 0], 12);
    const o = new THREE.Mesh(new THREE.SphereGeometry(0.075, 40, 20, 0, Math.PI, 0, Math.PI), M.gold); o.position.set(0, 0.225, 0); o.rotation.y = -Math.PI / 2 + 0.5; g.add(o);
    light = [0, 0.22, 0.04]; lumen = 200;
  } else if (kind === 'bestlite') {
    extrudePlan(g, M.blackMatte, circle(0.075, 48), 0.02, 0, 0.004);
    cyl(g, M.gold, 0.006, 0.006, 0.3, [0, 0.02, 0], 12);
    const arm = box(g, M.gold, [0.012, 0.012, 0.22], [0, 0.33, 0.08]); arm.rotation.x = 0.35;
    lathe(g, M.blackMatte, [[0.012, 0.13], [0.03, 0.12], [0.08, 0.02], [0.08, 0], [0.078, 0], [0.028, 0.115]], [0, 0.29, 0.2], 48);
    light = [0, 0.3, 0.2]; lumen = 380;
  }
  const l = lampLight('point', lumen, { distance: 5 }); l.position.set(...light); g.add(l);
  return g;
}

/** Wall lamps: Mabell (copper + blown glass), Flos IC C/W1 (sphere on arm). Origin = wall face. */
export function wallLamp(ctx, { kind, metal = 'chrome' }) {
  const M = lib(ctx, { copper: ['brass', '#b8703e'], gold: ['brassBrushed', '#c2a066'] }), g = new THREE.Group(), op = glowGlass(ctx);
  const Mt = metal === 'copper' ? M.copper : metal === 'brass' ? M.gold : M.chrome;
  if (kind === 'mabell') {
    cyl(g, Mt, 0.05, 0.05, 0.02, [0, 0, 0.01], 32).rotation.x = Math.PI / 2;
    box(g, Mt, [0.02, 0.02, 0.08], [0, 0, 0.05]);
    const s = sphere(g, op, 0.1, [0, -0.02, 0.13 - 0.1 + 0.1], 40, [1.2, 0.9, 1]); s.castShadow = false;
    lathe(g, Mt, [[0, 0.03], [0.05, 0.02], [0.09, -0.02], [0.088, -0.024], [0.0, 0.01]], [0, 0.04, 0.13], 48);
  } else {
    cyl(g, Mt, 0.045, 0.045, 0.012, [0, 0, 0.006], 32).rotation.x = Math.PI / 2;
    tube(g, Mt, [[0, 0, 0.012], [0, 0.03, 0.1], [0, 0.08, 0.16]], 0.005, 16);
    const s = sphere(g, op, 0.1, [0, 0.16, 0.18], 40); s.castShadow = false;
  }
  const l = lampLight('point', 320, { distance: 5 }); l.position.set(0, 0.05, 0.2); g.add(l);
  return g;
}

// =========================================================================================
// Mirrors, art, plants, textiles
/** Mirrors: Ayu (round, walnut-tone acacia frame), Polaris (polished steel elements), Laviena (arch, brass). */
export function mirror(ctx, { kind, w, h }) {
  const M = lib(ctx, { ayu: ['walnut', '#6a4a33'], gold: ['brassBrushed', '#c9a55c'] }), g = new THREE.Group();
  if (kind === 'ayu' || kind === 'polaris') {
    const r = w / 2;
    if (kind === 'ayu') { const fr = mesh(new THREE.TorusGeometry(r - 0.02, 0.025, 16, 96), M.ayu); fr.scale.z = 0.8; g.add(fr); }
    else { const fr = mesh(new THREE.TorusGeometry(r, 0.012, 12, 96), M.chrome); g.add(fr); for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; sphere(g, M.chrome, 0.018, [Math.cos(a) * (r + 0.012), Math.sin(a) * (r + 0.012), 0], 16); } }
    const m = mesh(new THREE.CircleGeometry(r - (kind === 'ayu' ? 0.04 : 0.008), 96), M.mirror, [0, 0, 0.004]); m.userData.keepUV = true; g.add(m);
  } else {
    const r = w / 2, straight = h - r, pts = [];
    for (let i = 0; i <= 48; i++) { const a = Math.PI * (i / 48); pts.push(new THREE.Vector2(Math.cos(a) * r, straight / 2 + Math.sin(a) * r - h / 2 + r)); }
    const shapeO = new THREE.Shape([new THREE.Vector2(r, -h / 2), ...pts.map((p) => new THREE.Vector2(p.x, p.y + h / 2 - r - straight / 2 + straight / 2)), new THREE.Vector2(-r, -h / 2)]);
    const inner = 0.018;
    const shapeI = new THREE.Shape([new THREE.Vector2(r - inner, -h / 2 + inner), ...pts.map((p) => new THREE.Vector2(p.x * (r - inner) / r, (p.y + h / 2 - r) * (r - inner) / r + h / 2 - r - straight / 2 + straight / 2)), new THREE.Vector2(-r + inner, -h / 2 + inner)]);
    shapeO.holes.push(new THREE.Path(shapeI.getPoints()));
    const fr = new THREE.Mesh(new THREE.ExtrudeGeometry(shapeO, { depth: 0.02, bevelEnabled: false }), M.gold); fr.castShadow = true; g.add(fr);
    const mm = new THREE.Mesh(new THREE.ShapeGeometry(shapeI), M.mirror); mm.position.z = 0.008; mm.userData.keepUV = true; g.add(mm);
  }
  return g;
}

/** Framed (or stretched) artwork; colours from the product description. */
export function art(ctx, { w, h, palette, seed = 1, frame = '#b48c60', style = 'abstract', float = true }) {
  const M = lib(ctx, { fr: ['oakNatural', frame] });
  return D.artwork(M, `abstract:${palette.join(',')}:${style}`, w, h, { seed, frame: 'fr', float });
}

/** Plant in a planter (olive/ficus as Pachira foliage model, money tree, small herbs). */
export function plant(ctx, { height = 1.7, potR = 0.16, potH = 0.34, potColor = '#cfc4b3', shape = 'taper', model = 'pachira', maxR = 0.42, seed = 1 }) {
  const M = lib(ctx, { pot: ['stonewareSand', potColor] });
  return D.pottedPlant(M, ctx.lib, model, { height, potR, potH, potMat: 'pot', shape, maxR, seed });
}

/** Ferm Living Hourglass planter (Ø 40 × 59) carrying the botané money tree (H 180). */
export function hourglassPlant(ctx, { height = 1.8 }) {
  const M = lib(ctx, { hg: ['plasticWhite', '#e6dccb'] }), g = new THREE.Group();
  lathe(g, M.hg, [[0, 0], [0.2, 0], [0.2, 0.02], [0.08, 0.3], [0.2, 0.57], [0.2, 0.59], [0.17, 0.59], [0.17, 0.56], [0, 0.56]], [0, 0, 0], 64);
  const p = D.pottedPlant(lib(ctx, { pot: ['stonewareSand', '#d8ccb8'] }), ctx.lib, 'pachira', { height: height - 0.45, potR: 0.15, potH: 0.2, potMat: 'pot', maxR: 0.45, seed: 4 });
  p.position.y = 0.45; g.add(p);
  return g;
}

/** Rug (rectangular or round) in the article colour; wool or viscose sheen. */
export function rug(ctx, { w, d, round = false, color, relief = false }) {
  const M = lib(ctx, { rugC: ['rug', color] });
  if (relief) { M.rugC = M.rugC.clone(); M.rugC.normalScale = new THREE.Vector2(2.2, 2.2); }
  return round ? T.rugRound(M, w, { mat: 'rugC' }) : T.rug(M, w, d, { mat: 'rugC', border: 'rugC' });
}

/** Ceiling-track curtain set in the concept fabric. */
export function curtains(ctx, span, { color, seed = 1, back = null }) {
  const M = lib(ctx, { cur: ['curtain', color] });
  M.cur = M.cur.clone(); M.cur.side = THREE.DoubleSide;
  const g = T.curtainSet(M, span, { mat: 'cur', seed, top: 2.52 });
  if (back) {
    const Mb = lib(ctx, { curB: ['curtainDim', back] }); Mb.curB = Mb.curB.clone(); Mb.curB.side = THREE.DoubleSide;
    const b = T.curtainSet(Mb, span, { mat: 'curB', seed: seed + 5, top: 2.52 }); b.position.z = -0.06; g.add(b);
  }
  return g;
}

/** Outdoor: Kartell Hiray table (Ø 65 × 72) and chair (53 × 55 × 79), IKEA SEGERÖN 2er-Sofa. */
export function outdoor(ctx, { kind, w, d, h, color = '#a7b59e' }) {
  const M = lib(ctx, { hy: ['lacquerBlack', color], seg: ['plasticWhite', '#ecebe6'], segC: ['linenBeige', '#cdbfa8'] }), g = new THREE.Group();
  if (kind === 'hirayTable') {
    extrudePlan(g, M.hy, circle(0.2, 48), 0.015, 0);
    cyl(g, M.hy, 0.025, 0.025, h - 0.04, [0, 0.015, 0], 24);
    extrudePlan(g, M.hy, circle(w / 2, 96), 0.025, h - 0.025, 0.004);
  } else if (kind === 'hirayChair') {
    for (const [x, z] of [[-w / 2 + 0.05, d / 2 - 0.05], [w / 2 - 0.05, d / 2 - 0.05], [-w / 2 + 0.05, -d / 2 + 0.06], [w / 2 - 0.05, -d / 2 + 0.06]]) { const l = cyl(g, M.hy, 0.012, 0.012, 0.45, [x, 0, z], 12); l.rotation.set(z > 0 ? 0.06 : -0.08, 0, 0); }
    extrudePlan(g, M.hy, roundedRect(w - 0.04, d - 0.06, 0.08), 0.015, 0.45, 0.003);
    const b = rbox(g, M.hy, [w - 0.06, 0.32, 0.015], [0, 0.62, -d / 2 + 0.04], 0.04, 3); b.rotation.x = -0.15;
    for (const s of [-1, 1]) box(g, M.hy, [0.02, 0.2, d - 0.1], [s * (w / 2 - 0.03), 0.56, 0]);
  } else if (kind === 'segeron') {
    for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) for (const z of [-d / 2 + 0.04, d / 2 - 0.04]) boxOn(g, M.seg, [0.05, 0.6, 0.05], [x, 0, z]);
    for (const s of [-1, 1]) boxOn(g, M.seg, [0.05, 0.03, d], [s * (w / 2 - 0.025), 0.6, 0]);
    boxOn(g, M.seg, [w - 0.08, 0.04, d - 0.08], [0, 0.3, 0]);
    for (let i = 0; i < 6; i++) box(g, M.seg, [0.012, 0.42, 0.02], [-w / 2 + 0.1 + i * ((w - 0.2) / 5), 0.55, -d / 2 + 0.03]);
    rboxOn(g, M.segC, [w - 0.12, 0.1, d - 0.14], [0, 0.34, 0.04], 0.03, 3);
    const back = rbox(g, M.segC, [w - 0.14, 0.38, 0.12], [0, 0.62, -d / 2 + 0.12], 0.04, 3); back.rotation.x = -0.15;
  }
  return g;
}

/** Wall slat field (Denpanels akustik panels 60 × 270, cut to room height) in oak or walnut. */
export function slats(ctx, { w = 2.4, color = '#b48c60', wood = 'oakNatural' }) {
  const M = lib(ctx, { sl: [wood, color] });
  return F.slatWall(M, { w, h: ceilingH, mat: 'sl', backing: 'matteBlack', slat: 0.028, pitch: 0.044, depth: 0.012 });
}

export { F, D, T, C, roundedRect, rbox, sphere };
