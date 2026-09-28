// Parametric 3D reproductions of the catalogue articles (products.js). Every model is built from
// the manufacturer's outer dimensions and the purchased finish; silhouette and characteristic
// details (fluting, frames, legs, headboards, shades) follow the product photos. Origin = floor
// centre of the footprint, +z = front. Purchased finishes use the un-themed base materials
// (ctx.productM): a style theme may re-tint walls and custom joinery, never a bought product.
import * as THREE from 'three';
import { PRODUCTS, finish } from './products.js';
import { box, boxOn, rbox, rboxOn, cyl, lathe, extrudePlan, circle, roundedRect, sphere } from '../engine/builders/common.js';
import * as C from '../engine/builders/catalog.js';
import * as F from '../engine/builders/furniture.js';
import * as D from '../engine/builders/decor.js';
import * as T from '../engine/builders/textiles.js';
import { fluting } from '../engine/builders/furniture.js';
import { lampLight } from '../engine/builders/decor.js';

/** Product material set: base materials plus the article's real colours. */
function mats(ctx, tints = {}) {
  const base = ctx.productM, M = Object.create(base);
  for (const [slot, [from, color, opts]] of Object.entries(tints)) M[slot] = finish(base, from, color, opts);
  return M;
}

// ------------------------------------------------------------------ generic pieces
/** Rectangular slab top on a slim metal frame (Westwing Alys: marble 17 mm, frame 12 mm). */
function frameTable(M, { w, d, h, top, frame, t = 0.017, bar = 0.012 }) {
  const g = new THREE.Group();
  for (const x of [-w / 2 + bar, w / 2 - bar]) for (const z of [-d / 2 + bar, d / 2 - bar]) boxOn(g, M[frame], [bar, h - t, bar], [x - Math.sign(x) * 0.02, 0, z - Math.sign(z) * 0.02]);
  for (const z of [-d / 2 + 0.02 + bar / 2, d / 2 - 0.02 - bar / 2]) boxOn(g, M[frame], [w - 0.04, bar, bar], [0, h - t - bar, z]);
  for (const x of [-w / 2 + 0.02 + bar / 2, w / 2 - 0.02 - bar / 2]) boxOn(g, M[frame], [bar, bar, d - 0.04], [x, h - t - bar, 0]);
  rboxOn(g, M[top], [w, t, d], [0, h - t, 0], 0.004, 2);
  return g;
}

/** Round top on a slim ring frame with three legs (Westwing Alys side table). */
function ringTable(M, { dia, h, top, frame, t = 0.017 }) {
  const g = new THREE.Group(), r = dia / 2 - 0.03;
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2; boxOn(g, M[frame], [0.01, h - t, 0.01], [Math.cos(a) * r, 0, Math.sin(a) * r]); }
  const ring = new THREE.Mesh(new THREE.TorusGeometry(r, 0.005, 6, 64), M[frame]); ring.rotation.x = Math.PI / 2; ring.position.y = h - t - 0.006; g.add(ring);
  extrudePlan(g, M[top], circle(dia / 2, 96), t, h - t, 0.003);
  return g;
}

/** Floating wall box (wall nightstand, wall console). Origin = floor projection at the wall face. */
function wallBox(M, { w, d, h, y, mat, fluted = false, knob = null }) {
  const g = new THREE.Group();
  boxOn(g, M[mat], [w, h, d - (fluted ? 0.012 : 0)], [0, y, -(fluted ? 0.006 : 0)]);
  if (fluted) { const s = new THREE.Group(); g.add(s); fluting(s, M[mat], w - 0.01, h - 0.02, { y0: y + 0.01, z: d / 2 - 0.012, pitch: 0.02, r: 0.007 }); }
  else box(g, M.matteBlack, [w - 0.04, 0.003, 0.003], [0, y + h * 0.55, d / 2 + 0.001]);
  if (knob) cyl(g, M[knob], 0.012, 0.012, 0.02, [0, y + h / 2, d / 2 + 0.004], 16).rotation.x = Math.PI / 2;
  return g;
}

/** Bar pendant (Nova Luce Elettra: 120 × 2 × 2 cm LED profile on two wires). */
function barPendant(M, { w, drop = 0.95, ceiling = 2.56, mat = 'blackMatte' }) {
  const g = new THREE.Group(), y = ceiling - drop;
  box(g, M[mat], [0.3, 0.02, 0.05], [0, ceiling - 0.01, 0]);
  for (const x of [-w / 2 + 0.06, w / 2 - 0.06]) cyl(g, M.blackMetal, 0.0012, 0.0012, drop - 0.02, [x, y + 0.02, 0], 6).castShadow = false;
  box(g, M[mat], [w, 0.022, 0.022], [0, y + 0.011, 0]);
  const diff = box(g, M.opal, [w - 0.02, 0.004, 0.016], [0, y - 0.001, 0]); diff.castShadow = false;
  const l = lampLight('spot', 1500, { angle: 1.9, penumbra: 0.9, distance: 8 }); l.position.set(0, y - 0.02, 0); g.add(l);
  return g;
}

/** Cylinder or glass tube pendant (Antic glass Ø 10 × 38, Paris steel Ø 6 × 28). */
function tubePendant(M, { r, len, drop = 1.05, ceiling = 2.56, mat, cap = mat, glass = false }) {
  const g = new THREE.Group(), y = ceiling - drop;
  cyl(g, M[cap], 0.035, 0.035, 0.012, [0, ceiling - 0.012, 0], 20);
  cyl(g, M.blackMetal, 0.0015, 0.0015, drop - len, [0, y + len, 0], 6).castShadow = false;
  if (glass) {
    const s = cyl(g, M[mat], r, r, len, [0, y, 0], 32, true); s.castShadow = false; s.userData.keep = true;
    cyl(g, M[cap], r * 0.5, r * 0.5, 0.03, [0, y + len - 0.03, 0], 20);
    const b = cyl(g, M.opal, 0.012, 0.012, len * 0.6, [0, y + len * 0.2, 0], 12); b.castShadow = false;
    const l = lampLight('point', 220, { distance: 4 }); l.position.set(0, y + len * 0.45, 0); g.add(l);
  } else {
    cyl(g, M[mat], r, r, len, [0, y, 0], 24);
    const d = cyl(g, M.opal, r * 0.8, r * 0.8, 0.003, [0, y - 0.002, 0], 20); d.castShadow = false;
    const l = lampLight('spot', 240, { angle: 1.0, penumbra: 0.7, distance: 4 }); l.position.set(0, y - 0.01, 0); g.add(l);
  }
  return g;
}

/** Westwing Bun: marble cylinder foot Ø 20 × 28, gold stem, white drum shade Ø 40 × 24, H 153. */
function bunLamp(M, { h = 1.53 }) {
  const g = new THREE.Group();
  extrudePlan(g, M.marbleBrown, circle(0.1, 48), 0.28, 0, 0.006);
  cyl(g, M.brass, 0.008, 0.008, h - 0.28 - 0.12, [0, 0.28, 0], 12);
  const s = cyl(g, M.lampShade, 0.2, 0.2, 0.24, [0, h - 0.24, 0], 64, true); s.castShadow = false;
  const l = lampLight('point', 650, { distance: 8 }); l.position.set(0, h - 0.13, 0); g.add(l);
  return g;
}

/** Westwing Neron reading lamp: round base Ø 30, straight stem, horizontal arm 105 cm, H 171. */
function arcReadingLamp(M, { h = 1.71, reach = 1.05 }) {
  const g = new THREE.Group();
  extrudePlan(g, M.blackMatte, circle(0.15, 48), 0.02, 0, 0.004);
  cyl(g, M.blackMatte, 0.011, 0.011, h - 0.08, [0, 0.02, -0.06], 12);
  const arm = box(g, M.blackMatte, [0.018, 0.018, reach], [0, h - 0.05, -0.06 + reach / 2 - 0.02]);
  arm.rotation.x = -0.05;
  const hz = -0.06 + reach - 0.04;
  lathe(g, M.blackMatte, [[0.01, 0.1], [0.05, 0.09], [0.12, 0.02], [0.13, 0], [0.125, 0], [0.115, 0.02], [0.045, 0.085], [0.008, 0.095]], [0, h - 0.18, hz], 40);
  const inner = lathe(g, M.brassBrushed, [[0.112, 0.021], [0.044, 0.084], [0.008, 0.093]], [0, h - 0.182, hz], 40); inner.castShadow = false;
  const l = lampLight('spot', 520, { angle: 0.9, penumbra: 0.7, distance: 5 }); l.position.set(0, h - 0.2, hz); g.add(l);
  return g;
}

/** Nesting drum tables on slim metal legs (Westwing Andrew Ø 90 × 35 + Ø 72 × 31). */
function nestingTables(M) {
  const g = new THREE.Group();
  for (const [dia, h, x, z] of [[0.9, 0.35, -0.18, -0.06], [0.72, 0.31, 0.28, 0.14]]) {
    const t = new THREE.Group(); t.position.set(x, 0, z); g.add(t);
    const r = dia / 2 - 0.08;
    for (let i = 0; i < 4; i++) { const a = Math.PI / 4 + (i * Math.PI) / 2; boxOn(t, M.blackMatte, [0.014, h - 0.035, 0.014], [Math.cos(a) * r, 0, Math.sin(a) * r]); }
    extrudePlan(t, M.mangoBlack, circle(dia / 2, 96), 0.035, h - 0.035, 0.005);
  }
  return g;
}

/** Westwing Naida: black marble top on two black oak slab legs (142 × 60 × 35). */
function slabTable(M, { w, d, h, top, legs }) {
  const g = new THREE.Group(), t = 0.03;
  rboxOn(g, M[top], [w, t, d], [0, h - t, 0], 0.004, 2);
  for (const s of [-1, 1]) boxOn(g, M[legs], [0.06, h - t, d - 0.06], [s * (w / 2 - 0.2), 0, 0]);
  return g;
}

/** Wooden bed with drawers and slim panel headboard (Westwing Sato 180: 227 × 206, head H 90). */
function woodBed(M, { W, L, headH, wood, bedding = 'beddingSand', throwMat = 'throwMoss', pillows = ['velvetMoss', 'linenTaupe'] }) {
  const g = new THREE.Group(), side = (W - 1.8) / 2;
  boxOn(g, M.matteBlack, [W - 0.1, 0.05, L - 0.1], [0, 0, 0]);
  boxOn(g, M[wood], [W, 0.3, L - 0.02], [0, 0.05, 0.01]);
  for (const s of [-1, 1]) for (let i = 0; i < 2; i++) box(g, M.matteBlack, [0.003, 0.2, 0.62], [s * (W / 2 + 0.001), 0.2, -0.4 + i * 0.72]);
  for (const s of [-1, 1]) boxOn(g, M[wood], [side - 0.02, 0.025, L - 0.1], [s * (W / 2 - side / 2), 0.35, 0.03]);
  boxOn(g, M[wood], [W, headH, 0.02], [0, 0, -L / 2 + 0.01]);
  const bed = C.bedModel(M, { kind: 'platform', mattressW: 1.8, mattressL: 2.0, wood, bedding, accent: 'bedding', throwMat, pillows });
  // platform body hidden inside the frame: keep only textiles
  bed.children.filter((c) => c.material === M[wood] || c.material === M.matteBlack || c.material === M.ledStrip).forEach((c) => bed.remove(c));
  bed.position.set(0, 0.35 - 0.26, 0.02);
  g.add(bed);
  return g;
}

/** Westwing Calary desk: top, two fluted drawer boxes under the top (61 cm knee space), solid legs. */
function flutedDesk(M, { w, d, h, mat, knob = 'steel' }) {
  const g = new THREE.Group(), boxW = (w - 0.61) / 2 - 0.02;
  boxOn(g, M[mat], [w, 0.028, d], [0, h - 0.028, 0]);
  for (const s of [-1, 1]) {
    const x = s * (w / 2 - boxW / 2 - 0.01);
    boxOn(g, M[mat], [boxW, 0.17, d - 0.03], [x, h - 0.198, -0.012]);
    const f = new THREE.Group(); f.position.x = x; g.add(f);
    fluting(f, M[mat], boxW - 0.01, 0.15, { y0: h - 0.19, z: d / 2 - 0.028, pitch: 0.02, r: 0.007 });
    cyl(g, M[knob], 0.012, 0.012, 0.02, [x, h - 0.115, d / 2 + 0.0], 16).rotation.x = Math.PI / 2;
    for (const z of [-d / 2 + 0.035, d / 2 - 0.035]) boxOn(g, M[mat], [0.04, h - 0.2, 0.04], [s * (w / 2 - 0.035), 0, z]);
  }
  return g;
}

/** Desk with top and separate leg material (Westwing Libby, Renee). */
function tableDesk(M, { w, d, h, top, legs, drawers = 0 }) {
  const g = new THREE.Group();
  boxOn(g, M[top], [w, 0.03, d], [0, h - 0.03, 0]);
  if (drawers) {
    boxOn(g, M[top], [w - 0.1, 0.14, d - 0.08], [0, h - 0.17, -0.02]);
    for (let i = 0; i < drawers; i++) box(g, M.matteBlack, [0.003, 0.12, 0.003], [-w / 2 + 0.05 + ((w - 0.1) * (i + 1)) / (drawers + 1) - (w - 0.1) / (drawers + 1) / 2 + (w - 0.1) / (drawers + 1) / 2, h - 0.1, d / 2 - 0.059]);
  }
  for (const x of [-w / 2 + 0.035, w / 2 - 0.035]) for (const z of [-d / 2 + 0.035, d / 2 - 0.035]) boxOn(g, M[legs], [0.035, h - 0.03, 0.035], [x, 0, z]);
  if (legs !== top) for (const x of [-w / 2 + 0.035, w / 2 - 0.035]) boxOn(g, M[legs], [0.02, 0.02, d - 0.07], [x, 0.08, 0]);
  return g;
}

/** Fluted console on tall legs (Westwing Calary Konsole 100 × 35 × 80, legs 68). */
function legConsole(M, { w, d, h, legH, mat, knob }) {
  const g = new THREE.Group();
  for (const x of [-w / 2 + 0.03, w / 2 - 0.03]) for (const z of [-d / 2 + 0.03, d / 2 - 0.03]) boxOn(g, M[mat], [0.035, legH, 0.035], [x, 0, z]);
  boxOn(g, M[mat], [w, h - legH, d - 0.01], [0, legH, -0.005]);
  fluting(g, M[mat], w - 0.02, h - legH - 0.02, { y0: legH + 0.01, z: d / 2 - 0.01, pitch: 0.02, r: 0.007 });
  for (const x of [-w / 4, w / 4]) cyl(g, M[knob], 0.012, 0.012, 0.02, [x, legH + (h - legH) / 2, d / 2 + 0.006], 16).rotation.x = Math.PI / 2;
  return g;
}

// ------------------------------------------------------------------ catalogue → model
/**
 * Model of one catalogue article. opts: styling passed through (pillows, throws, bedding) and
 * `M` for the style's decor materials (pillows follow the moodboard, not the product).
 */
export function productModel(ctx, key, opts = {}) {
  const g = buildModel(ctx, key, opts), [w, d] = PRODUCTS[key].size;
  // Loose textiles (throws, cushions) must not widen a purchased piece beyond its data sheet.
  if (/^(alba|melva|lennon|dream|arche|sato|eliot|mikkel|rae|ekenaset)/.test(key)) {
    const b = new THREE.Box3().setFromObject(g), size = b.getSize(new THREE.Vector3()), c = b.getCenter(new THREE.Vector3());
    const kx = Math.min(1, w / size.x), kz = Math.min(1, d / size.z);
    g.scale.x *= kx; g.scale.z *= kz;
    g.position.x -= c.x * kx; g.position.z -= c.z * kz;
    const outer = new THREE.Group(); outer.add(g); outer.userData = g.userData; return outer;
  }
  return g;
}

function buildModel(ctx, key, opts) {
  const p = PRODUCTS[key];
  if (!p) throw new Error('Unbekannter Katalogartikel ' + key);
  const [w, d, h] = p.size, S = ctx.M;
  const pil = opts.pillows, thr = opts.throwMat;
  // decor textiles on purchased furniture come from the style (M), product surfaces from productM
  const withDecor = (M) => { for (const k of [...(pil ?? []), thr, opts.bedding, opts.accent].filter(Boolean)) M[k] = S[k]; return M; };
  switch (key) {
    // --- sofas
    case 'albaGrey': return F.curvedSofa(withDecor(mats(ctx, { alba: ['boucle', '#aaa59e', { dropMap: true }] })), { w, d, h, fabric: 'alba', plinth: 'blackMatte', pillows: pil ?? ['velvetSage', 'velvetSage', 'linenIvory'], throwMat: thr ?? 'throwSage' });
    case 'melvaOffWhite': return C.sofa(withDecor(mats(ctx, { melva: ['linenIvory', '#e3ddd1'] })), { w, d, h, seatH: 0.45, arm: 0.2, armH: 0.58, kind: 'block', fabric: 'melva', legs: 'blackMatte', seats: 3, pillows: pil ?? [], throwMat: thr });
    case 'lennonBoucle': return C.sofa(withDecor(mats(ctx, { lennon: ['boucle', '#bcb09f', { dropMap: true }] })), { w, d, h, seatH: 0.43, arm: 0.32, kind: 'block', fabric: 'lennon', seats: 2, pillows: pil ?? [], throwMat: thr });
    case 'lennonLinen': return C.sofa(withDecor(mats(ctx, { lennon: ['linenGrey', '#a8a6a1'] })), { w, d, h, seatH: 0.43, arm: 0.32, kind: 'block', fabric: 'lennon', seats: 2, pillows: pil ?? [], throwMat: thr });
    case 'mikkelOffWhite': return C.armchair(mats(ctx), { w, d, h, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakDark', fabric: 'boucle' });
    case 'mikkelGreen': return C.armchair(mats(ctx, { mikkel: ['linenSage', '#3f4a3a'] }), { w, d, h, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakDark', fabric: 'mikkel' });
    case 'rae': return C.armchair(mats(ctx, { rae: ['linenTaupe', '#8d8173'] }), { w, d, h, seatH: 0.42, armH: 0.6, arms: 'wood', wood: 'oakDark', fabric: 'rae' });
    case 'ekenaset': return C.armchair(mats(ctx), { w, d, h, seatH: 0.45, armH: 0.63, arms: 'wood', wood: 'oakNatural', fabric: 'linenBeige' });
    // --- tables
    case 'alys': return frameTable(mats(ctx, { brassMatte: ['brassBrushed', '#b39a67'] }), { w, d, h, top: 'marble', frame: 'brassMatte' });
    case 'alysSide': return ringTable(mats(ctx, { brassMatte: ['brassBrushed', '#b39a67'] }), { dia: w, h, top: 'marble', frame: 'brassMatte' });
    case 'distinct': return C.distinctTable(mats(ctx), { mat: 'travertineVein' });
    case 'marisaTravSide': return C.drumTable(mats(ctx), { dia: w, h, top: 'travertineVein', baseDia: w * 0.86 });
    case 'naida': return slabTable(mats(ctx, { marbleBlack: ['stoneDark', '#2c2b2a'], oakBlack: ['oakDark', '#2a2522'] }), { w, d, h, top: 'marbleBlack', legs: 'oakBlack' });
    case 'andrew': return nestingTables(mats(ctx, { mangoBlack: ['oakDark', '#231f1c'] }));
    case 'pedraBeige': case 'pedraGrey': {
      // Monolith: 8 cm Plattenkante, konischer Säulenfuß Ø 70 → 60 cm, alles in einem Guss
      const M = mats(ctx, { pedra: ['concrete', key === 'pedraBeige' ? '#d8cdbb' : '#b9b6b0'] }), g = new THREE.Group();
      lathe(g, M.pedra, [[0, 0], [0.36, 0], [0.37, 0.02], [0.33, 0.2], [0.3, h - 0.12], [0.34, h - 0.08], [0, h - 0.08]], [0, 0, 0], 96);
      extrudePlan(g, M.pedra, circle(w / 2, 160), 0.08, h - 0.08, 0.012);
      return g;
    }
    case 'tavolo': {
      // GUBI Tavolo a Dischi: Walnuss hochglanz, Fuß aus gestapelten Scheiben unterschiedlicher Größe
      const M = mats(ctx, { walnutGloss: ['walnut', '#5b4336'] }), g = new THREE.Group();
      const discs = [[0.34, 0.03], [0.22, 0.14], [0.3, 0.26], [0.18, 0.39], [0.26, 0.52], [0.2, 0.64]];
      discs.forEach(([r, y], i) => extrudePlan(g, M.walnutGloss, circle(r, 96), (i < discs.length - 1 ? discs[i + 1][1] : h - 0.026) - y + 0.005, y, 0.01));
      extrudePlan(g, M.walnutGloss, circle(0.36, 96), 0.03, 0, 0.01);
      extrudePlan(g, M.walnutGloss, circle(w / 2, 160), 0.026, h - 0.026, 0.006);
      return g;
    }
    case 'noam': return C.roundTable(mats(ctx, { marbleBeige: ['marble', '#efe6d9'] }), { dia: w, h, top: 'marbleBeige', topT: 0.03, base: 'slim', baseMat: 'steel' });
    case 'sculpt': return C.roundTable(mats(ctx), { dia: w, h, top: 'travertineVein', topT: 0.03, base: 'drum', baseMat: 'oakDark', baseDia: 0.56 });
    case 'nelly': return C.roundTable(mats(ctx), { dia: w, h, top: 'oakDark', topT: 0.02, base: 'ribbed', baseMat: 'oakDark', baseDia: 0.5 });
    case 'yumi': return C.roundTable(mats(ctx), { dia: w, h, top: 'oakNatural', topT: 0.02, base: 'legs', baseMat: 'oakNatural' });
    // --- dining chairs
    case 'celia': return C.chair(mats(ctx, { celia: ['boucle', '#d9cfbf', { dropMap: true }] }), { kind: 'shell', fabric: 'celia', frame: 'blackMatte', w, d, h, seatH: 0.48 });
    case 'imaraOffWhite': return C.chair(mats(ctx, { imara: ['linenIvory', '#e2dcd1'] }), { kind: 'block', fabric: 'imara', frame: 'oakDark', w, d, h, seatH: 0.48 });
    case 'imaraOlive': return C.chair(mats(ctx, { imara: ['linenSage', '#5b6147'] }), { kind: 'block', fabric: 'imara', frame: 'oakDark', w, d, h, seatH: 0.48 });
    case 'kris': return C.chair(mats(ctx, { kris: ['boucle', '#b8a38a', { dropMap: true }] }), { kind: 'block', fabric: 'kris', frame: 'oakDark', w, d, h, seatH: 0.46 });
    // --- storage
    case 'calaryTvBrown': return C.cabinet(mats(ctx), { w, d, h, legH: 0.27, fronts: 'ribbed', doors: 3, mat: 'oakDark', pull: 'blackMatte' });
    case 'calaryTvBlack': return C.cabinet(mats(ctx), { w, d, h, legH: 0.27, fronts: 'ribbed', doors: 3, mat: 'lacquerBlack', legMat: 'lacquerBlack' });
    case 'zumiTv': return C.zumiLowboard(mats(ctx), { w, d, h, legH: 0.25, mat: 'oakNatural', top: 'travertineVein', handle: 'brassBrushed' });
    case 'zumiSide': return C.zumiLowboard(mats(ctx), { w, d, h, legH: 0.2, mat: 'oakNatural', top: 'travertineVein', handle: 'brassBrushed' });
    case 'elonaXL': return C.cabinet(mats(ctx), { w, d, h, legH: 0.2, fronts: 'plain', doors: 4, mat: 'lacquerBlack' });
    case 'calarySideDark': return C.cabinet(mats(ctx), { w, d, h, legH: 0.17, fronts: 'ribbed', doors: 2, mat: 'oakDark', pull: 'blackMatte' });
    case 'calarySideBlack': return C.cabinet(mats(ctx), { w, d, h, legH: 0.17, fronts: 'ribbed', doors: 2, mat: 'lacquerBlack', legMat: 'oakDark' });
    case 'chandlerSide': return C.cabinet(mats(ctx), { w, d, h, legH: 0.2, fronts: 'panel', doors: 4, mat: 'oakDark' });
    case 'libbyShelfDark': case 'libbyShelfLight': case 'libbyShelfBlack': {
      const mat = key === 'libbyShelfDark' ? 'oakDark' : key === 'libbyShelfLight' ? 'oakNatural' : 'lacquerBlack';
      const g = new THREE.Group(), M = mats(ctx), t = 0.03;
      for (const x of [-w / 2 + 0.03, w / 2 - 0.03]) for (const z of [-d / 2 + 0.03, d / 2 - 0.03]) boxOn(g, M[mat], [0.03, h, 0.03], [x, 0, z]);
      const ys = [];
      for (let i = 0; i < 5; i++) { const y = 0.12 + i * ((h - 0.12 - t) / 4); boxOn(g, M[mat], [w, t, d], [0, y, 0]); ys.push(y + t); }
      g.userData.shelves = ys.slice(0, -1); g.userData.top = h;
      return g;
    }
    case 'portlyn': { const g = C.bookcase(mats(ctx), { w, d, h, shelves: 4, mat: 'walnut' }); g.userData.top = h; return g; }
    // --- sleeping
    case 'dreamGrey': case 'dreamAnthracite': {
      const M = withDecor(mats(ctx, { dream: ['linenGrey', key === 'dreamGrey' ? '#b8b5af' : '#4b4946'] }));
      return C.bedModel(M, { kind: 'dream', outerW: w, outerL: d, headH: h, headT: 0.14, frame: 'dream', bedding: opts.bedding ?? 'bedding', accent: opts.accent ?? 'beddingSand', throwMat: thr ?? 'throwSage', pillows: pil ?? ['velvetSage', 'linenTaupe'] });
    }
    case 'archeTaupe': return C.bedModel(withDecor(mats(ctx, { arche: ['linenTaupe', '#8e8274'] })), { kind: 'dream', outerW: w, outerL: d, headH: h, headT: 0.1, frame: 'arche', bedding: opts.bedding ?? 'bedding', accent: opts.accent ?? 'beddingSand', throwMat: thr ?? 'throwCognac', pillows: pil ?? ['linenCognac', 'linenSage'] });
    case 'sato': return woodBed(withDecor(mats(ctx)), { W: w, L: d, headH: h, wood: 'oakDark', bedding: opts.bedding ?? 'beddingSand', throwMat: thr ?? 'throwMoss', pillows: pil });
    case 'calaryNight': {
      const M = mats(ctx), g = C.drumTable(M, { dia: w, h: h - 0.02, top: 'oakDark', base: 'oakDark', baseDia: w - 0.01, fluted: true });
      g.position.y = 0.02; const o = new THREE.Group(); o.add(g);
      for (const x of [-0.12, 0.12]) for (const z of [-0.12, 0.12]) boxOn(o, M.blackMatte, [0.02, 0.02, 0.02], [x, 0, z]);
      cyl(o, M.steel, 0.012, 0.012, 0.02, [0, h * 0.6, w / 2 + 0.002], 16).rotation.x = Math.PI / 2;
      o.userData.top = h; return o;
    }
    case 'calaryWallNight': { const g = wallBox(mats(ctx), { w, d, h, y: 0.34, mat: 'oakDark', fluted: true, knob: 'blackMatte' }); g.userData.top = 0.34 + h; return g; }
    case 'farsta': { const g = wallBox(mats(ctx), { w, d, h, y: 0.45, mat: 'oakNatural' }); g.userData.top = 0.45 + h; return g; }
    case 'diana': { const g = C.cabinet(mats(ctx), { w, d, h, legH: 0.24, fronts: 'plain', doors: 1, mat: 'oakDark', legs: 'post' }); box(g, mats(ctx).blackMatte, [0.14, 0.012, 0.015], [0, 0.45, d / 2 + 0.006]); g.userData.top = h; return g; }
    // --- office / guests
    case 'eliotGrey': case 'eliotBeige': case 'eliotDarkGrey': case 'eliotGreen': {
      const col = { eliotGrey: '#bdb9b2', eliotBeige: '#cbbfad', eliotDarkGrey: '#5a5855', eliotGreen: '#3f4a37' }[key];
      return C.sofaBed(withDecor(mats(ctx, { eliot: [key === 'eliotGreen' ? 'boucle' : 'linenGrey', col, { dropMap: key === 'eliotGreen' }] })), { w, d, h, seatH: 0.42, fabric: 'eliot', legs: 'blackMatte', pillows: pil ?? [] });
    }
    case 'calaryDesk': return flutedDesk(mats(ctx), { w, d, h, mat: 'oakDark' });
    case 'calaryDeskBlack': return flutedDesk(mats(ctx), { w, d, h, mat: 'lacquerBlack', knob: 'steel' });
    case 'libbyDesk': return tableDesk(mats(ctx), { w, d, h, top: 'oakDark', legs: 'oakDark', drawers: 2 });
    case 'reneeDesk': return tableDesk(mats(ctx), { w, d, h, top: 'oakNatural', legs: 'blackMatte' });
    case 'piaCaramel': case 'piaSage': case 'piaTaupe': case 'piaBeige': {
      const leather = key === 'piaCaramel' || key === 'piaBeige';
      const col = { piaCaramel: '#9a6a45', piaSage: '#7f8b74', piaTaupe: '#8b7d6f', piaBeige: '#d6c7b2' }[key];
      const M = mats(ctx, { pia: [leather ? 'leatherCognac' : 'linenTaupe', col] });
      const c = F.taskChair(M, { fabric: 'pia' });
      const b = new THREE.Box3().setFromObject(c).getSize(new THREE.Vector3());
      c.scale.set(w / b.x, h / b.y, d / b.z);
      return c;
    }
    // --- lighting
    case 'rim': return D.saucerPendant(mats(ctx), { dia: w, mat: 'brassBrushed' });
    case 'level': return D.saucerPendant(mats(ctx), { dia: w, mat: 'blackMatte' });
    case 'elettra': return barPendant(mats(ctx), { w });
    case 'hamilton': return C.linearPendant(mats(ctx), { w, rail: 'brass', shade: 'amberGlass' });
    case 'antic': return tubePendant(mats(ctx, { greigeGlass: ['smokedGlass', '#b5ab9c'] }), { r: w / 2, len: h, mat: 'greigeGlass', cap: 'brass', glass: true });
    case 'paris': return tubePendant(mats(ctx), { r: w / 2, len: h, mat: 'blackMatte' });
    case 'bun': return bunLamp(mats(ctx, { marbleBrown: ['stoneDark', '#6b5446'] }), { h });
    case 'kayaBeige': return C.drumFloorLamp(mats(ctx, { concreteBeige: ['concrete', '#cfc4b3'] }), { h, shadeD: 0.45, shadeH: 0.36, base: 'concreteBeige', stem: 'brassBrushed' });
    case 'kayaAnthracite': return C.drumFloorLamp(mats(ctx), { h, shadeD: 0.45, shadeH: 0.36, base: 'concreteDark', stem: 'blackMatte' });
    case 'neron': return arcReadingLamp(mats(ctx), { h, reach: d });
    case 'calaryConsole': return legConsole(mats(ctx), { w, d, h, legH: 0.68, mat: 'oakNatural', knob: 'brass' });
    // --- shared modules
    case 'rudsta': {
      const M = mats(ctx), g = new THREE.Group(), frame = M.blackMatte;
      for (const x of [-w / 2 + 0.015, w / 2 - 0.015]) for (const z of [-d / 2 + 0.015, d / 2 - 0.015]) boxOn(g, frame, [0.03, h, 0.03], [x, 0, z]);
      for (const y of [0.15, h - 0.025]) boxOn(g, frame, [w, 0.025, d], [0, y, 0]);
      boxOn(g, frame, [w - 0.03, h - 0.175, 0.015], [0, 0.175, -d / 2 + 0.0075]);
      for (const y of [0.45, 0.78]) boxOn(g, M.glass, [w - 0.04, 0.008, d - 0.04], [0, y, 0]);
      for (const x of [-w / 2 + 0.012, w / 2 - 0.012]) boxOn(g, M.glass, [0.006, h - 0.19, d - 0.04], [x, 0.175, 0]);
      for (const x of [-w / 4, w / 4]) { boxOn(g, M.glass, [w / 2 - 0.025, h - 0.19, 0.006], [x, 0.175, d / 2 - 0.012]); boxOn(g, frame, [0.012, h - 0.175, 0.018], [x + w / 4 - 0.012, 0.175, d / 2 - 0.012]); }
      g.userData.top = h; return g;
    }
    case 'pax': case 'paxDark': case 'paxFlat': {
      // opts.count carcasses with 2 doors each; opts.door = TONSTAD product key (door finish)
      const n = opts.count ?? 3, door = opts.door === 'tonstadDoorBrown' ? 'oakDark' : 'oakNatural';
      const M = mats(ctx, { paxBody: ['plasticWhite', key === 'paxDark' ? '#3c3b39' : '#efefec'] });
      return C.paxWardrobe(M, { w: w * n, d: d + 0.02, h: opts.ceiling ? 2.56 : h + 0.02, doors: n * 2, fronts: 'flat', frontMat: door, handle: 'edge', handleMat: 'blackMatte', plinth: 'paxBody' });
    }
    case 'utility': {
      const M = mats(ctx), g = new THREE.Group(), n = opts.count ?? 2;
      for (let i = 0; i < n; i++) { const c = C.cabinet(M, { w: w - 0.004, d, h, legH: 0, fronts: 'plain', doors: 1, mat: 'plasticWhite' }); c.position.set((i - (n - 1) / 2) * w, 0.25, 0); g.add(c); }
      return g;
    }
    case 'ivar': {
      const M = mats(ctx, { pine: ['oakLight', '#e6cfa5'] }), g = new THREE.Group();
      for (const x of [-w / 2 + 0.02, w / 2 - 0.02]) for (const z of [-d / 2 + 0.02, d / 2 - 0.02]) boxOn(g, M.pine, [0.035, h, 0.035], [x, 0, z]);
      for (let i = 0; i < 5; i++) boxOn(g, M.pine, [w - 0.02, 0.02, d - 0.02], [0, 0.1 + i * ((h - 0.14) / 4), 0]);
      for (const [x, y] of [[-0.22, 0.12], [0.22, 0.12], [-0.22, 0.54], [0.22, 0.54]]) rboxOn(g, S.linenTaupe, [0.38, 0.28, 0.26], [x, y, 0], 0.02, 2);
      return g;
    }
    case 'outdoor': {
      const M = mats(ctx, { acacia: ['teak', '#9c7650'] }), g = new THREE.Group();
      for (const x of [-w / 2 + 0.025, w / 2 - 0.025]) for (const z of [-d / 2 + 0.025, d / 2 - 0.025]) boxOn(g, M.acacia, [0.05, 0.6, 0.05], [x, 0, z]);
      for (let i = 0; i < 7; i++) boxOn(g, M.acacia, [w, 0.025, 0.09], [0, 0.275, -0.33 + i * 0.11]);
      for (let i = 0; i < 4; i++) box(g, M.acacia, [w, 0.075, 0.025], [0, 0.35 + i * 0.1, -d / 2 + 0.025]);
      for (const x of [-w / 2 + 0.025, w / 2 - 0.025]) boxOn(g, M.acacia, [0.05, 0.025, d], [x, 0.6, 0]);
      rboxOn(g, S[opts.cushion ?? 'linenGrey'], [w - 0.1, 0.08, d - 0.14], [0, 0.3, 0.03], 0.03, 3);
      return g;
    }
    case 'bistro': {
      const M = mats(ctx, { acacia: ['teak', '#9c7650'] }), g = new THREE.Group();
      boxOn(g, M.acacia, [w, 0.025, d], [0, h - 0.025, 0]);
      for (const x of [-0.22, 0.22]) for (const z of [-0.2, 0.2]) boxOn(g, M.blackMatte, [0.018, h - 0.025, 0.018], [x, 0, z]);
      if (opts.chairs) for (const s of [-1, 1]) { const c = C.chair(M, { kind: 'block', w: 0.39, d: 0.4, h: 0.79, seatH: 0.45, fabric: 'acacia', frame: 'blackMatte' }); c.position.x = s * 0.52; c.rotation.y = -s * Math.PI / 2; g.add(c); }
      return g;
    }
    case 'stool': {
      const M = mats(ctx), g = new THREE.Group();
      boxOn(g, M.beech, [w, 0.025, d], [0, h - 0.025, 0]);
      for (const x of [-w / 2 + 0.04, w / 2 - 0.04]) boxOn(g, M.beech, [0.03, h - 0.025, d - 0.04], [x, 0, 0]);
      return g;
    }
    // --- rugs (viscose shimmers, wool is matt)
    default: {
      if (/^(amaro|jane)/.test(key)) {
        const col = { amaroGreyXL: '#cfcac1', amaroCreamXL: '#e4dccd', amaroBrownL: '#cdbca3', amaroCreamS: '#e4dccd', amaroGreyS: '#cfcac1', janeTaupeXL: '#8e8276', janeLightGreyXL: '#c2bfba', janeTaupeL: '#8e8276', janeGreyL: '#8f8c88', janeSageL: '#909a86', janeTaupeS: '#8e8276' }[key];
        const M = mats(ctx, { rugP: ['rug', col] });
        if (/^jane/.test(key)) { M.rugP = M.rugP.clone(); M.rugP.sheen = 1; M.rugP.sheenRoughness = 0.35; M.rugP.sheenColor = new THREE.Color(col).lerp(new THREE.Color('#ffffff'), 0.45); }
        return T.rug(M, opts.w ?? w, opts.d ?? d, { mat: 'rugP', border: 'rugP' });
      }
      throw new Error('Kein 3D-Modell für ' + key);
    }
  }
}
void rbox; void sphere; void roundedRect;
