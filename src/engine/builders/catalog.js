// Parametric models of the referenced catalogue pieces (Westwing Collection, IKEA) and a few
// style-specific custom pieces. Dimensions follow the manufacturers' data sheets; visual details
// are simplified but keep proportions, silhouettes and materials. Origin = floor centre of the
// footprint, +x = width, +z = front (facing into the room).
import * as THREE from 'three';
import { box, boxOn, rbox, rboxOn, cyl, lathe, mesh, tube, extrudePlan, roundedRect, circle, sphere } from './common.js';
import { cushion, throwBlanket } from './textiles.js';
import { fluting } from './furniture.js';
import { lampLight } from './decor.js';

// ------------------------------------------------------------------ sofas
/**
 * Generic upholstered sofa with three silhouettes:
 *  'slim'  – low, deep seat, thin arms, loose back cushions (IKEA SÖDERHAMN)
 *  'block' – deep lounge modules with thick rounded back and arms (Westwing Lennon)
 *  'cloud' – soft, low, sculptural modules with big radii (Westwing Wolke)
 */
export function sofa(M, { w = 2.2, d = 1.0, h = 0.8, seatH = 0.43, arm = 0.2, armH = null, kind = 'slim', fabric = 'linenBeige', legs = null, seats = 3, pillows = [], throwMat = null } = {}) {
  const g = new THREE.Group(), F = M[fabric];
  const clear = legs ? (kind === 'slim' ? 0.14 : 0.03) : 0.02;
  if (legs) {
    const inset = 0.08;
    for (const x of [-w / 2 + inset, w / 2 - inset]) for (const z of [-d / 2 + inset, d / 2 - inset]) cyl(g, M[legs], 0.018, 0.014, clear, [x, 0, z], 12);
  } else {
    boxOn(g, M.matteBlack, [w - 0.16, clear, d - 0.16], [0, 0, 0]);
  }
  const R = kind === 'cloud' ? 0.14 : kind === 'block' ? 0.07 : 0.03;
  const backD = kind === 'slim' ? 0.16 : kind === 'block' ? 0.26 : 0.3;
  const armHH = armH ?? (kind === 'slim' ? h - 0.2 : kind === 'cloud' ? 0.5 : h - 0.02);
  const baseH = seatH - clear - (kind === 'slim' ? 0.12 : 0.16);
  // base / frame
  rboxOn(g, F, [w, baseH, d], [0, clear, 0], Math.min(R, 0.06), 4);
  // back
  rboxOn(g, F, [w, (kind === 'slim' ? h - 0.25 : h) - clear - baseH, backD], [0, clear + baseH - 0.01, -d / 2 + backD / 2], R, 5);
  // arms
  for (const s of [-1, 1]) rboxOn(g, F, [arm, armHH - clear, d], [s * (w / 2 - arm / 2), clear, 0], R, 5);
  // seat cushions
  const inner = w - arm * 2, n = Math.max(1, seats), cw = inner / n;
  const seatD = d - backD - (kind === 'slim' ? 0.02 : 0.04);
  for (let i = 0; i < n; i++) {
    rboxOn(g, F, [cw - 0.01, seatH - (clear + baseH) + 0.01, seatD], [-inner / 2 + cw * (i + 0.5), clear + baseH - 0.01, d / 2 - seatD / 2 - 0.01], kind === 'cloud' ? 0.09 : 0.05, 5);
  }
  // loose back cushions (slim: leaning, cloud/block: integrated puffs)
  if (kind !== 'block') {
    for (let i = 0; i < n; i++) {
      const c = rbox(g, F, [cw - 0.03, kind === 'slim' ? 0.46 : 0.34, kind === 'slim' ? 0.2 : 0.22], [-inner / 2 + cw * (i + 0.5), seatH + (kind === 'slim' ? 0.22 : 0.16), -d / 2 + backD + 0.08], kind === 'cloud' ? 0.1 : 0.07, 5);
      c.rotation.x = kind === 'slim' ? -0.2 : -0.1;
    }
  }
  const px = [-inner / 2 + 0.3, -inner / 2 + 0.66, inner / 2 - 0.3, inner / 2 - 0.66];
  pillows.forEach((p, i) => {
    const c = cushion(M, p, [0.48, 0.48, 0.16]);
    c.position.set(px[i] ?? 0, seatH + 0.26, -d / 2 + backD + 0.2);
    c.rotation.set(-0.28, (i % 2 ? -1 : 1) * 0.25 * (i < 2 ? 1 : -1), 0);
    g.add(c);
  });
  if (throwMat) {
    const t = throwBlanket(M, throwMat, 0.5, 0.36, 0.32);
    t.position.set(inner / 2 - 0.35, seatH + 0.02, -d / 2 + backD + 0.05); t.rotation.y = -Math.PI / 2;
    g.add(t);
  }
  return g;
}

/** Sofa bed (IKEA HYLTARP Bettsofa 2: 182 × 93 × 82 cm, seat 48 cm, bed 140 × 200 cm). */
export function sofaBed(M, { w = 1.82, d = 0.93, h = 0.82, seatH = 0.48, fabric = 'linenBeige', legs = 'oak', pillows = ['linenIvory', 'velvetCognac'] } = {}) {
  const g = new THREE.Group(), F = M[fabric];
  for (const x of [-w / 2 + 0.08, w / 2 - 0.08]) for (const z of [-d / 2 + 0.08, d / 2 - 0.08]) cyl(g, M[legs], 0.02, 0.016, 0.1, [x, 0, z], 12);
  rboxOn(g, F, [w, 0.24, d], [0, 0.1, 0], 0.03, 3);
  rboxOn(g, F, [w - 0.3, seatH - 0.34 + 0.02, d - 0.26], [0, 0.32, 0.1], 0.05, 5);
  rboxOn(g, F, [w, h - 0.34, 0.24], [0, 0.34, -d / 2 + 0.12], 0.05, 5);
  for (const s of [-1, 1]) rboxOn(g, F, [0.15, 0.64 - 0.34, d], [s * (w / 2 - 0.075), 0.34, 0], 0.05, 4);
  pillows.forEach((p, i) => { const c = cushion(M, p, [0.44, 0.44, 0.15]); c.position.set(-0.4 + i * 0.75, seatH + 0.22, -d / 2 + 0.34); c.rotation.x = -0.25; g.add(c); });
  return g;
}

// ------------------------------------------------------------------ chairs
/**
 * Lounge chair with wooden frame. arms: 'wood' (IKEA EKENÄSET 64 × 78 × 76) or 'upholstered'
 * (Westwing Mikkel 66 × 77 × 79). The seat/back are upholstered cushions.
 */
export function armchair(M, { w = 0.64, d = 0.78, h = 0.76, seatH = 0.45, armH = 0.63, arms = 'wood', wood = 'oakNatural', fabric = 'linenBeige' } = {}) {
  const g = new THREE.Group(), W = M[wood], F = M[fabric];
  const leg = 0.035;
  for (const s of [-1, 1]) {
    const x = s * (w / 2 - leg / 2);
    // front and back legs, slightly splayed backwards
    box(g, W, [leg, armH, leg], [x, armH / 2, d / 2 - 0.06]);
    const bl = box(g, W, [leg, h, leg], [x, h / 2, -d / 2 + 0.08]); bl.rotation.x = -0.12;
    if (arms === 'wood') box(g, W, [0.06, 0.03, d - 0.08], [x, armH, 0.0]);
    else rboxOn(g, F, [0.1, armH - 0.2, d - 0.1], [x - s * 0.02, 0.2, 0], 0.04, 4);
    box(g, W, [leg, leg, d - 0.12], [x, 0.2, 0]);
  }
  box(g, W, [w - leg, leg, leg], [0, seatH - 0.1, d / 2 - 0.06]);
  box(g, W, [w - leg, leg, leg], [0, seatH - 0.1, -d / 2 + 0.1]);
  const innerW = arms === 'wood' ? w - 0.09 : w - 0.22;
  rboxOn(g, F, [innerW, 0.12, d - 0.2], [0, seatH - 0.1, 0.05], 0.04, 4);
  const back = rbox(g, F, [innerW, h - seatH + 0.02, 0.11], [0, seatH + (h - seatH) / 2, -d / 2 + 0.16], 0.045, 4);
  back.rotation.x = -0.2;
  return g;
}

/**
 * Upholstered dining chair.
 *  'shell'   – rounded shell back on thin metal legs (Westwing Adrien 56 × 51 × 82, seat 49)
 *  'bentwood'– steam-bent beech frame, leather seat (IKEA STOCKHOLM 2025 chair class)
 *  'block'   – boxy bouclé seat with rounded back on solid wooden legs (Westwing Lukas class)
 */
export function chair(M, { kind = 'shell', fabric = 'boucle', frame = 'blackMatte', w = 0.56, d = 0.51, h = 0.82, seatH = 0.49 } = {}) {
  const g = new THREE.Group(), F = M[fabric], Fr = M[frame];
  if (kind === 'bentwood') {
    for (const s of [-1, 1]) {
      tube(g, Fr, [[s * 0.2, 0, 0.2], [s * 0.21, seatH - 0.03, 0.2], [s * 0.2, seatH - 0.02, 0.1]], 0.014, 16);
      tube(g, Fr, [[s * 0.2, 0, -0.2], [s * 0.2, seatH - 0.03, -0.2], [s * 0.19, h - 0.1, -0.24], [s * 0.12, h, -0.24]], 0.014, 24);
    }
    tube(g, Fr, [[-0.12, h, -0.24], [0, h + 0.01, -0.25], [0.12, h, -0.24]], 0.016, 12);
    rbox(g, Fr, [0.4, 0.12, 0.02], [0, h - 0.12, -0.24], 0.01, 2).rotation.x = -0.08;
    tube(g, Fr, [[-0.2, 0.2, 0.2], [0, 0.18, 0.21], [0.2, 0.2, 0.2]], 0.01, 12);
    rboxOn(g, F, [0.44, 0.04, 0.42], [0, seatH - 0.03, 0], 0.015, 3);
    return g;
  }
  if (kind === 'block') {
    for (const [x, z] of [[-w / 2 + 0.04, d / 2 - 0.04], [w / 2 - 0.04, d / 2 - 0.04], [-w / 2 + 0.04, -d / 2 + 0.05], [w / 2 - 0.04, -d / 2 + 0.05]]) boxOn(g, Fr, [0.035, seatH - 0.08, 0.035], [x, 0, z]);
    rboxOn(g, F, [w, 0.1, d], [0, seatH - 0.1, 0], 0.03, 4);
    const b = rbox(g, F, [w - 0.02, h - seatH + 0.06, 0.09], [0, seatH + (h - seatH) / 2, -d / 2 + 0.06], 0.04, 4); b.rotation.x = -0.1;
    return g;
  }
  // shell
  for (const [x, z] of [[-w / 2 + 0.05, d / 2 - 0.06], [w / 2 - 0.05, d / 2 - 0.06], [-w / 2 + 0.06, -d / 2 + 0.06], [w / 2 - 0.06, -d / 2 + 0.06]]) {
    const l = cyl(g, Fr, 0.009, 0.011, seatH - 0.07, [x, 0, z], 10);
    l.rotation.set(z > 0 ? 0.05 : -0.07, 0, x > 0 ? -0.04 : 0.04);
  }
  extrudePlan(g, F, roundedRect(w - 0.04, d - 0.04, 0.18), 0.09, seatH - 0.09, 0.028);
  const r = w / 2, arc = (rad, from, to, seg = 40) => Array.from({ length: seg + 1 }, (_, i) => { const t = from + ((to - from) * i) / seg; return [Math.cos(t) * rad, -Math.sin(t) * rad * 0.8]; });
  const shell = [...arc(r, -0.05, Math.PI + 0.05), ...arc(r - 0.06, Math.PI + 0.05, -0.05)];
  const s = extrudePlan(g, F, shell, h - seatH + 0.02, seatH - 0.03, 0.025);
  s.position.z = -0.03;
  return g;
}

// ------------------------------------------------------------------ tables
/** Westwing "Distinct": two travertine tops at two heights on block bases (100 × 55 × 35). */
export function distinctTable(M, { mat = 'travertineVein' } = {}) {
  const g = new THREE.Group(), S = M[mat];
  boxOn(g, S, [0.62, 0.04, 0.55], [-0.19, 0.31, 0]);
  boxOn(g, S, [0.2, 0.31, 0.44], [-0.36, 0, 0]);
  boxOn(g, S, [0.5, 0.04, 0.46], [0.25, 0.22, 0.03]);
  boxOn(g, S, [0.16, 0.22, 0.36], [0.4, 0, 0.03]);
  return g;
}

/** Monolithic block table (Refined Brutalism), thick top on two slab legs. */
export function blockTable(M, { w = 1.1, d = 0.75, h = 0.33, mat = 'stoneDark' } = {}) {
  const g = new THREE.Group(), S = M[mat];
  rboxOn(g, S, [w, 0.09, d], [0, h - 0.09, 0], 0.01, 2);
  for (const s of [-1, 1]) rboxOn(g, S, [0.14, h - 0.09, d - 0.16], [s * (w / 2 - 0.2), 0, 0], 0.008, 2);
  return g;
}

/** Round drum table (Westwing Marisa Ø 70 × 35, marble on MDF drum) or any drum side table. */
export function drumTable(M, { dia = 0.7, h = 0.35, top = 'marble', base = null, baseDia = null, fluted = false } = {}) {
  const g = new THREE.Group();
  const bd = baseDia ?? dia * 0.72;
  if (fluted) extrudePlan(g, M[base ?? top], flutedOutline(bd / 2, 24, 0.01), h - 0.03, 0);
  else extrudePlan(g, M[base ?? top], circle(bd / 2, 96), h - 0.03, 0, 0.004);
  extrudePlan(g, M[top], circle(dia / 2, 128), 0.03, h - 0.03, 0.006);
  return g;
}

/**
 * Round dining table.
 *  base 'drum'   – solid drum (Westwing Abby Ø 120, base Ø 61)
 *  base 'slim'   – slim metal column on a disc (Westwing Noam Ø 120, base Ø 30)
 *  base 'legs'   – four tapered legs + apron (IKEA STOCKHOLM 2025 Ø 115)
 *  base 'ribbed' – ribbed storage drum (Westwing Calary Ø 120)
 */
export function roundTable(M, { dia = 1.2, h = 0.75, top = 'marble', topT = 0.03, base = 'drum', baseMat = 'oakDark', baseDia = 0.61 } = {}) {
  const g = new THREE.Group(), B = M[baseMat];
  if (base === 'drum') extrudePlan(g, B, circle(baseDia / 2, 96), h - topT, 0, 0.004);
  else if (base === 'ribbed') {
    extrudePlan(g, B, flutedOutline(baseDia / 2, 36, 0.01), h - topT - 0.02, 0.02);
    extrudePlan(g, M.blackMatte, circle(baseDia / 2 - 0.04, 64), 0.02, 0);
  } else if (base === 'slim') {
    extrudePlan(g, B, circle(0.15, 64), 0.02, 0);
    cyl(g, B, 0.035, 0.035, h - topT - 0.02, [0, 0.02, 0], 24);
    extrudePlan(g, B, circle(0.12, 48), 0.015, h - topT - 0.015);
  } else {
    const r = dia / 2 - 0.16;
    for (let i = 0; i < 4; i++) {
      const a = Math.PI / 4 + (i * Math.PI) / 2;
      const l = cyl(g, B, 0.025, 0.018, h - topT, [Math.cos(a) * r, 0, Math.sin(a) * r], 16);
      l.rotation.set(Math.sin(a) * 0.05, 0, -Math.cos(a) * 0.05);
    }
    extrudePlan(g, B, circle(dia / 2 - 0.12, 96).concat(), 0.06, h - topT - 0.06);
  }
  extrudePlan(g, M[top], circle(dia / 2, 160), topT, h - topT, Math.min(0.006, topT / 3));
  return g;
}

/** Desk (IKEA TONSTAD Schreibtisch 140 × 75: oak veneer, drawer, solid legs). */
export function deskT(M, { w = 1.4, d = 0.75, h = 0.75, mat = 'oakNatural', knob = null } = {}) {
  const g = new THREE.Group(), W = M[mat];
  boxOn(g, W, [w, 0.03, d], [0, h - 0.03, 0]);
  boxOn(g, W, [w - 0.1, 0.1, d - 0.1], [0, h - 0.13, -0.02]);
  box(g, M.matteBlack, [0.6, 0.004, 0.004], [0.2, h - 0.08, d / 2 - 0.068]);
  if (knob) cyl(g, M[knob], 0.015, 0.015, 0.025, [0.2, h - 0.08, d / 2 - 0.07], 16).rotation.x = Math.PI / 2;
  for (const x of [-w / 2 + 0.05, w / 2 - 0.05]) for (const z of [-d / 2 + 0.05, d / 2 - 0.05]) boxOn(g, W, [0.045, h - 0.03, 0.045], [x, 0, z]);
  return g;
}

// ------------------------------------------------------------------ storage
/**
 * Sideboard / TV bench on legs.
 *  fronts 'plain' (IKEA STOCKHOLM 2025, push-to-open), 'ribbed' (Westwing Calary sliding
 *  ribbed doors), 'fluted' (half-round reeds), 'panel' (Westwing Chandler, framed doors).
 */
export function cabinet(M, { w = 1.61, d = 0.42, h = 0.83, legH = 0.12, fronts = 'plain', doors = 2, mat = 'oakNatural', legMat = null, top = null, legs = 'post', pull = null } = {}) {
  const g = new THREE.Group(), W = M[mat], L = M[legMat ?? mat];
  const bodyH = h - legH;
  if (legs === 'post') for (const x of [-w / 2 + 0.06, w / 2 - 0.06]) for (const z of [-d / 2 + 0.06, d / 2 - 0.06]) boxOn(g, L, [0.04, legH, 0.04], [x, 0, z]);
  else if (legs === 'plinth') boxOn(g, L, [w - 0.1, legH, d - 0.08], [0, 0, -0.02]);
  else if (legs === 'sled') for (const x of [-w / 2 + 0.12, w / 2 - 0.12]) { boxOn(g, L, [0.03, legH, d - 0.1], [x, 0, 0]); }
  boxOn(g, W, [w, bodyH, d - 0.02], [0, legH, -0.01]);
  const dw = (w - 0.02) / doors;
  for (let i = 0; i < doors; i++) {
    const cx = -w / 2 + 0.01 + dw * (i + 0.5);
    if (fronts === 'ribbed' || fronts === 'fluted') {
      const s = new THREE.Group(); s.position.set(cx, 0, 0); g.add(s);
      fluting(s, W, dw - 0.01, bodyH - 0.05, { y0: legH + 0.025, z: d / 2 - 0.02, pitch: fronts === 'ribbed' ? 0.022 : 0.03, r: fronts === 'ribbed' ? 0.008 : 0.012 });
    } else if (fronts === 'panel') {
      box(g, W, [dw - 0.03, bodyH - 0.06, 0.012], [cx, legH + bodyH / 2, d / 2 - 0.004]);
    }
    if (i > 0) box(g, M.matteBlack, [0.003, bodyH - 0.02, 0.003], [-w / 2 + 0.01 + dw * i, legH + bodyH / 2, d / 2 + 0.001]);
  }
  if (pull) for (let i = 1; i < doors; i += 2) box(g, M[pull], [0.012, 0.14, 0.015], [-w / 2 + 0.01 + dw * i, legH + bodyH * 0.62, d / 2 + 0.006]);
  if (top) boxOn(g, M[top], [w + 0.01, 0.025, d + 0.005], [0, h, 0]);
  return g;
}

/**
 * Open bookcase / shelf (IKEA TONSTAD Bücherregal 82 × 37 × 201, Regal 121 × 37 × 120).
 * Returns the group plus the shelf heights for styling.
 */
export function bookcase(M, { w = 0.82, d = 0.37, h = 2.01, shelves = 5, mat = 'oakNatural', back = true } = {}) {
  const g = new THREE.Group(), W = M[mat], t = 0.022;
  for (const s of [-1, 1]) boxOn(g, W, [t, h, d], [s * (w / 2 - t / 2), 0, 0]);
  boxOn(g, W, [w - t * 2, 0.06, d - 0.02], [0, 0, 0.0]);
  const ys = [];
  for (let i = 0; i <= shelves; i++) {
    const y = 0.06 + ((h - 0.06 - t) * i) / shelves;
    boxOn(g, W, [w - t * 2, t, d], [0, y, 0]); ys.push(y + t);
  }
  if (back) boxOn(g, W, [w - t * 2, h - 0.06, 0.008], [0, 0.06, -d / 2 + 0.004]);
  g.userData.shelves = ys.slice(0, -1);
  return g;
}

/**
 * Built-in wardrobe on IKEA PAX carcasses (100 × 58 × 236) with a ceiling filler.
 * fronts: 'fluted' (custom fronts), 'flat' (flush veneer), 'grooves' (vertical V-grooves).
 */
export function paxWardrobe(M, { w = 3.0, d = 0.6, h = 2.56, doors = 6, fronts = 'flat', frontMat = 'oakNatural', handle = 'bar', handleMat = 'bronze', plinth = 'matteBlack' } = {}) {
  const g = new THREE.Group(), F = M[frontMat];
  boxOn(g, M[plinth], [w, 0.08, d - 0.08], [0, 0, -0.04]);
  boxOn(g, F, [w, h - 0.08, d - 0.02], [0, 0.08, -0.01]);
  const dw = w / doors;
  for (let i = 0; i < doors; i++) {
    const s = new THREE.Group(); s.position.set(-w / 2 + dw * (i + 0.5), 0, 0); g.add(s);
    if (fronts === 'fluted') fluting(s, F, dw - 0.008, 2.36 - 0.12, { y0: 0.1, z: d / 2 - 0.02, pitch: 0.034, r: 0.013 });
    if (fronts === 'grooves') for (let k = 1; k < 4; k++) box(s, M.matteBlack, [0.004, 2.26, 0.003], [-dw / 2 + (dw * k) / 4, 1.21, d / 2 - 0.009]);
    box(s, M.matteBlack, [dw - 0.004, 0.004, 0.003], [0, 2.4, d / 2 - 0.009]);
    const px = i % 2 === 0 ? dw / 2 - 0.05 : -dw / 2 + 0.05;
    if (handle === 'bar') box(s, M[handleMat], [0.014, 0.8, 0.02], [px, 1.1, d / 2 + 0.012]);
    else if (handle === 'knob') cyl(s, M[handleMat], 0.016, 0.016, 0.03, [px, 1.05, d / 2 + 0.0], 16).rotation.x = Math.PI / 2;
    else if (handle === 'edge') box(s, M[handleMat], [0.02, 0.5, 0.02], [px + (i % 2 === 0 ? 0.03 : -0.03), 1.1, d / 2 - 0.004]);
  }
  for (let i = 1; i < doors; i++) box(g, M.matteBlack, [0.003, h - 0.1, 0.003], [-w / 2 + dw * i, 0.08 + (h - 0.08) / 2, d / 2 - 0.009]);
  return g;
}

// ------------------------------------------------------------------ beds
/**
 * Beds.
 *  'dream'    – Westwing Polsterbett Dream 180 × 200: 196 × 222, padded headboard H 110 / T 14
 *  'platform' – low solid-wood platform, mattress inset, no headboard (wall panel carries it)
 *  'channel'  – channel-tufted headboard (custom, 194 × 212)
 * Head at −z, origin = footprint centre.
 */
export function bedModel(M, { kind = 'dream', mattressW = 1.8, mattressL = 2.0, outerW = null, outerL = null, headH = 1.1, headT = 0.14, legs = 'matteBlack', frame = 'boucleTaupe', wood = 'oakDark', bedding = 'bedding', accent = 'beddingSand', throwMat = 'throwSage', pillows = ['velvetSage', 'linenTaupe'] } = {}) {
  const g = new THREE.Group();
  let W, L, top, headZ;
  if (kind === 'platform') {
    W = mattressW + 0.3; L = mattressL + 0.2;
    boxOn(g, M.matteBlack, [W - 0.3, 0.1, L - 0.3], [0, 0, 0]);
    const led = boxOn(g, M.ledStrip, [W - 0.34, 0.006, 0.01], [0, 0.02, L / 2 - 0.16]); led.castShadow = false;
    boxOn(g, M[wood], [W, 0.16, L], [0, 0.1, 0]);
    top = 0.26; headZ = -L / 2;
  } else {
    W = outerW ?? (kind === 'dream' ? mattressW + 0.16 : mattressW + 0.14); L = outerL ?? (kind === 'dream' ? mattressL + 0.22 : mattressL + 0.12);
    for (const x of [-W / 2 + 0.1, W / 2 - 0.1]) for (const z of [-L / 2 + 0.25, L / 2 - 0.1]) cyl(g, M[legs], 0.025, 0.02, 0.08, [x, 0, z], 12);
    rboxOn(g, M[frame], [W, 0.26, L - headT], [0, 0.08, headT / 2], 0.035, 4);
    top = 0.3; headZ = -L / 2;
    if (kind === 'dream') rboxOn(g, M[frame], [W, headH - 0.08, headT], [0, 0.08, -L / 2 + headT / 2], 0.05, 5);
    else { const ch = 8, cw = W / ch; for (let i = 0; i < ch; i++) rboxOn(g, M[frame], [cw - 0.004, 1.18, 0.1], [-W / 2 + cw * (i + 0.5), 0.07, -L / 2 + 0.05], 0.045, 4); }
  }
  const mz = kind === 'platform' ? 0 : 0.07;
  rboxOn(g, M[bedding], [mattressW, 0.22, mattressL], [0, top, mz], 0.05, 4);
  rboxOn(g, M[bedding], [mattressW + 0.1, 0.1, mattressL * 0.72], [0, top + 0.16, mz + mattressL * 0.14], 0.05, 5);
  if (throwMat) rboxOn(g, M[throwMat], [mattressW + 0.16, 0.035, 0.52], [0, top + 0.25, mz + mattressL * 0.3], 0.016, 3);
  const headIn = headZ + (kind === 'platform' ? 0.14 : 0.2);
  const pl = [[-0.44, bedding, 0.62, 0.42], [0.44, bedding, 0.62, 0.42], [-0.4, accent, 0.55, 0.38], [0.4, accent, 0.55, 0.38], [-0.14, pillows[0], 0.42, 0.32], [0.18, pillows[1], 0.4, 0.3]];
  pl.forEach(([x, mat, w, h], i) => {
    const c = cushion(M, mat, [w, h, 0.17]);
    const row = i < 2 ? 0 : i < 4 ? 1 : 2;
    c.position.set(x, top + 0.32 + (row === 0 ? 0.1 : row === 1 ? 0.06 : 0.02), headIn + row * 0.12);
    c.rotation.set(-1.2 + row * 0.15, (i % 2 ? -1 : 1) * 0.05, 0);
    g.add(c);
  });
  g.userData.size = [W, L];
  return g;
}

/** Wall panelling with integrated floating nightstands and LED ledge (Refined Brutalism bed wall). */
export function bedPanel(M, { w = 4.17, h = 1.2, mat = 'smokedOak', tables = [0.8, 3.37], tableW = 0.5 } = {}) {
  const g = new THREE.Group(), W = M[mat];
  boxOn(g, W, [w, h, 0.03], [0, 0, 0.015]);
  for (let i = 1; i < 12; i++) box(g, M.matteBlack, [0.004, h - 0.02, 0.003], [-w / 2 + (w * i) / 12, h / 2, 0.0305]);
  boxOn(g, W, [w, 0.04, 0.16], [0, h, 0.08]);
  const led = box(g, M.ledStrip, [w - 0.1, 0.006, 0.01], [0, h - 0.007, 0.145]); led.castShadow = false;
  for (const u of tables) boxOn(g, W, [tableW, 0.16, 0.36], [u - w / 2, 0.42, 0.21]);
  return g;
}

/** Side table / nightstand box (IKEA TONSTAD Ablagetisch 40 × 40 × 59). */
export function sideBox(M, { w = 0.4, d = 0.4, h = 0.59, mat = 'oakNatural', knob = 'oakNatural' } = {}) {
  const g = new THREE.Group(), W = M[mat];
  for (const x of [-w / 2 + 0.02, w / 2 - 0.02]) for (const z of [-d / 2 + 0.02, d / 2 - 0.02]) boxOn(g, W, [0.035, h, 0.035], [x, 0, z]);
  boxOn(g, W, [w, 0.022, d], [0, h - 0.022, 0]);
  boxOn(g, W, [w - 0.04, 0.12, d - 0.04], [0, h - 0.16, 0]);
  boxOn(g, W, [w - 0.04, 0.018, d - 0.04], [0, 0.12, 0]);
  if (knob) cyl(g, M[knob], 0.014, 0.014, 0.022, [0, h - 0.1, d / 2 - 0.01], 16).rotation.x = Math.PI / 2;
  return g;
}

// ------------------------------------------------------------------ lighting
/** Floor lamp with drum shade (Westwing Kaya: H 156, shade Ø 45 × 36, concrete base Ø 19). */
export function drumFloorLamp(M, { h = 1.56, shadeD = 0.45, shadeH = 0.36, base = 'concreteDark', stem = 'blackMatte' } = {}) {
  const g = new THREE.Group();
  lathe(g, M[base], [[0, 0], [0.095, 0], [0.095, 0.05], [0.07, 0.09], [0.02, 0.1]], [0, 0, 0], 40);
  cyl(g, M[stem], 0.009, 0.009, h - shadeH - 0.08, [0, 0.1, 0], 12);
  const s = cyl(g, M.lampShade, shadeD / 2, shadeD / 2, shadeH, [0, h - shadeH, 0], 64, true); s.castShadow = false;
  const l = lampLight('point', 700, { distance: 8 }); l.position.set(0, h - shadeH / 2, 0); g.add(l);
  return g;
}

/** Linear pendant with three glass shades (Westwing Nebo, 120 cm). Origin at ceiling projection. */
export function linearPendant(M, { w = 1.2, drop = 0.95, ceiling = 2.56, rail = 'brassBrushed', shade = 'opal' } = {}) {
  const g = new THREE.Group(), y = ceiling - drop;
  box(g, M[rail], [0.3, 0.02, 0.06], [0, ceiling - 0.01, 0]);
  for (const x of [-w / 2 + 0.05, w / 2 - 0.05]) cyl(g, M.blackMetal, 0.0015, 0.0015, drop - 0.03, [x, y + 0.03, 0], 6).castShadow = false;
  box(g, M[rail], [w, 0.025, 0.025], [0, y + 0.03, 0]);
  [[-0.38, 0.045], [0, 0.055], [0.38, 0.065]].forEach(([x, r]) => {
    cyl(g, M[rail], 0.012, 0.012, 0.05, [x, y - 0.02, 0], 16);
    const s = sphere(g, M[shade], r, [x, y - 0.02 - r, 0], 24); s.castShadow = false;
  });
  const l = lampLight('spot', 1100, { angle: 1.8, penumbra: 0.9, distance: 8 }); l.position.set(0, y - 0.08, 0); g.add(l);
  return g;
}

/** Slim cylinder pendant (bedside), matte black or bronze. */
export function cylinderPendant(M, { drop = 1.05, ceiling = 2.56, mat = 'blackMatte', r = 0.035, len = 0.26 } = {}) {
  const g = new THREE.Group(), y = ceiling - drop;
  cyl(g, M[mat], 0.03, 0.03, 0.012, [0, ceiling - 0.012, 0], 20);
  cyl(g, M.blackMetal, 0.0015, 0.0015, drop - len, [0, y + len, 0], 6).castShadow = false;
  cyl(g, M[mat], r, r, len, [0, y, 0], 24);
  const d = cyl(g, M.opal, r * 0.8, r * 0.8, 0.003, [0, y - 0.002, 0], 20); d.castShadow = false;
  const l = lampLight('spot', 260, { angle: 1.0, penumbra: 0.7, distance: 4 }); l.position.set(0, y - 0.01, 0); g.add(l);
  return g;
}

/** Tinted glass dome pendant (Quiet Luxury dining, amber glass). */
export function glassPendant(M, { drop = 0.95, ceiling = 2.56, r = 0.13, glass = 'amberGlass', cap = 'brassBrushed' } = {}) {
  const g = new THREE.Group(), y = ceiling - drop;
  cyl(g, M[cap], 0.035, 0.035, 0.012, [0, ceiling - 0.012, 0], 20);
  cyl(g, M.blackMetal, 0.0015, 0.0015, drop - r * 1.6, [0, y + r * 1.6, 0], 6).castShadow = false;
  cyl(g, M[cap], 0.02, 0.03, 0.06, [0, y + r * 1.45, 0], 20);
  const s = lathe(g, M[glass], [[0.02, r * 1.5], [r * 0.6, r * 1.35], [r * 0.95, r * 0.8], [r, r * 0.2], [r * 0.9, 0], [r * 0.88, 0.004], [r * 0.97, r * 0.2], [r * 0.93, r * 0.8], [r * 0.58, r * 1.33], [0.018, r * 1.48]], [0, y, 0], 48);
  s.castShadow = false; s.userData.keep = true;
  const b = sphere(g, M.opal, 0.03, [0, y + r * 0.6, 0], 16); b.castShadow = false;
  const l = lampLight('point', 380, { distance: 5 }); l.position.set(0, y + r * 0.5, 0); g.add(l);
  return g;
}
export { lampLight };

// ------------------------------------------------------------------ helpers
function flutedOutline(r, flutes = 28, depth = 0.012, seg = 288) {
  return Array.from({ length: seg }, (_, i) => {
    const a = (i / seg) * Math.PI * 2, rr = r - depth * Math.pow(Math.abs(Math.sin((a * flutes) / 2)), 0.6);
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
}
void mesh;

/**
 * Westwing Collection TV-Lowboard Zumi: B 180 × T 45 × H 55 cm, Beinhöhe 25 cm, Korpus Eichenfurnier
 * mit abgerundeten Ecken, sechs Fächer hinter Türen, Griffe goldfarben, Platte Travertin.
 */
export function zumiLowboard(M, { w = 1.8, d = 0.45, h = 0.55, legH = 0.25, mat = 'oakNatural', top = 'travertine', handle = 'brassBrushed' } = {}) {
  const g = new THREE.Group(), W = M[mat];
  for (const x of [-w / 2 + 0.1, w / 2 - 0.1]) for (const z of [-d / 2 + 0.08, d / 2 - 0.08]) cyl(g, W, 0.022, 0.016, legH, [x, 0, z], 24);
  const bodyH = h - legH - 0.03;
  rboxOn(g, W, [w, bodyH, d - 0.02], [0, legH, -0.01], 0.05, 4);
  for (let i = 1; i < 3; i++) box(g, M.matteBlack, [0.003, bodyH - 0.03, 0.003], [-w / 2 + (w * i) / 3, legH + bodyH / 2, d / 2 - 0.009]);
  for (let i = 0; i < 3; i++) cyl(g, M[handle], 0.012, 0.012, 0.012, [-w / 2 + (w * (i + 0.5)) / 3, legH + bodyH * 0.7, d / 2 - 0.006], 16).rotation.x = Math.PI / 2;
  rboxOn(g, M[top], [w + 0.01, 0.03, d + 0.005], [0, h - 0.03, 0], 0.012, 3);
  return g;
}

/** Westwing Collection Couchtisch Hilda: rund Ø 102 × H 35 cm, Eiche massiv, breite Rundbeine. */
export function hildaTable(M, { dia = 1.02, h = 0.35, mat = 'oakNatural' } = {}) {
  const g = new THREE.Group(), W = M[mat];
  for (let i = 0; i < 3; i++) { const a = (i / 3) * Math.PI * 2 + 0.3; cyl(g, W, 0.075, 0.075, h - 0.035, [Math.cos(a) * dia * 0.28, 0, Math.sin(a) * dia * 0.28], 40); }
  extrudePlan(g, W, circle(dia / 2, 96), 0.035, h - 0.035, 0.008);
  return g;
}
