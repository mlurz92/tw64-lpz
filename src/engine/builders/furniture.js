// Furniture in the Refined Metallic Japandi language: soft curves, bouclé, smoked oak with
// fluting, Calacatta marble and brushed bronze. Origin = floor centre of footprint, +z = front.
import * as THREE from 'three';
import { box, boxOn, rbox, rboxOn, cyl, lathe, mesh, tube, extrudePlan, roundedRect, circle } from './common.js';
import { cushion, throwBlanket, foldedThrow } from './textiles.js';
import { artMaterial } from '../materials.js';

// ------------------------------------------------------------------ helpers
function superEllipseHalf(a, b, n = 4, seg = 48, from = 0, to = -Math.PI) {
  const pts = [];
  for (let i = 0; i <= seg; i++) {
    const t = from + ((to - from) * i) / seg, c = Math.cos(t), s = Math.sin(t);
    pts.push([a * Math.sign(c) * Math.pow(Math.abs(c), 2 / n), b * Math.sign(s) * Math.pow(Math.abs(s), 2 / n)]);
  }
  return pts;
}

/** Vertical fluting (half-round reeds) over a w × h area, facing +z. */
export function fluting(parent, mat, w, h, { pitch = 0.032, r = 0.014, y0 = 0, z = 0 } = {}) {
  const n = Math.floor(w / pitch), off = (w - n * pitch) / 2;
  const geo = new THREE.CylinderGeometry(r, r, h, 12, 1, true, -Math.PI / 2, Math.PI);
  for (let i = 0; i < n; i++) {
    const m = mesh(geo, mat, [-w / 2 + off + pitch * (i + 0.5), y0 + h / 2, z]);
    m.scale.z = 0.55;
    parent.add(m);
  }
}

/** Scalloped (fluted) disc outline for pedestals. */
function flutedCircle(r, flutes = 28, depth = 0.012, seg = 360) {
  return Array.from({ length: seg }, (_, i) => {
    const a = (i / seg) * Math.PI * 2, rr = r - depth * Math.pow(Math.abs(Math.sin((a * flutes) / 2)), 0.6);
    return [Math.cos(a) * rr, Math.sin(a) * rr];
  });
}

// ------------------------------------------------------------------ living
/** Sculptural curved sofa in ivory bouclé (moodboard key piece). */
export function curvedSofa(M, { w = 2.5, d = 1.0, h = 0.72, fabric = 'boucle', pillows = ['velvetSage', 'velvetSage', 'linenIvory'], plinth = 'bronzeDark', throwMat = 'throwSage' } = {}) {
  const g = new THREE.Group();
  const bev = 0.045, armW = 0.2, backW = 0.24, front = d / 2 - 0.02;
  const a = w / 2 - bev, b = d / 2 - bev;
  // plinth
  extrudePlan(g, M[plinth], roundedRect(w - 0.3, d - 0.3, 0.25), 0.07, 0);
  // back + arms band
  const outer = [[a, front - bev], [a, 0], ...superEllipseHalf(a, b, 5).slice(1, -1), [-a, 0], [-a, front - bev]];
  const ia = a - armW + bev * 2, ib = b - backW + bev * 2;
  const inner = [[-ia, front - bev], [-ia, 0], ...superEllipseHalf(ia, ib, 5, 48, -Math.PI, 0).slice(1, -1), [ia, 0], [ia, front - bev]];
  extrudePlan(g, M[fabric], [...outer, ...inner], h - 0.07, 0.07, bev);
  // seat deck
  const deck = [[-ia - 0.01, front - bev], [-ia - 0.01, 0], ...superEllipseHalf(ia + 0.01, ib + 0.01, 5, 48, -Math.PI, 0).slice(1, -1), [ia + 0.01, 0], [ia + 0.01, front - bev]];
  extrudePlan(g, M[fabric], deck, 0.3, 0.07, bev);
  // seat cushions
  const seatW = (ia * 2) / 2 - 0.01, seatD = front + ib * 0.55;
  for (const s of [-1, 1]) rbox(g, M[fabric], [seatW, 0.13, seatD], [s * (seatW / 2 + 0.005), 0.37 + 0.065, front - seatD / 2 + 0.01], 0.05, 5);
  // back cushions, leaning
  for (const s of [-1, 1]) {
    const c = rbox(g, M[fabric], [seatW - 0.04, 0.4, 0.18], [s * (seatW / 2 + 0.005), 0.64, -ib * 0.62], 0.07, 5);
    c.rotation.x = -0.18; c.rotation.y = s * 0.12;
  }
  // throw pillows
  const px = [-ia + 0.3, -ia + 0.62, ia - 0.3];
  pillows.forEach((p, i) => {
    const c = cushion(M, p, [0.48, 0.48, 0.16]);
    c.position.set(px[i] ?? 0, 0.72, -ib * 0.35);
    c.rotation.set(-0.3, (i === 2 ? -1 : 1) * 0.35, (i - 1) * 0.08);
    g.add(c);
  });
  if (throwMat) {
    const t = throwBlanket(M, throwMat, 0.55, 0.42, 0.32);
    t.position.set(ia - 0.02, 0.5, 0.05); t.rotation.y = 0;
    g.add(t);
  }
  return g;
}

/** Round coffee table: Calacatta top, drum pedestal in brushed bronze. */
export function coffeeTableRound(M, { dia = 1.0, h = 0.36 } = {}) {
  const g = new THREE.Group();
  extrudePlan(g, M.bronze, circle(dia * 0.26, 96), h - 0.045, 0.0, 0.004);
  extrudePlan(g, M.bronzeDark, circle(dia * 0.3, 96), 0.012, 0.0);
  extrudePlan(g, M.marble, circle(dia / 2, 128), 0.045, h - 0.045, 0.008);
  return g;
}

/** Round side table: travertine top on bronze stem. */
export function sideTable(M, { dia = 0.42, h = 0.52, top = 'travertine' } = {}) {
  const g = new THREE.Group();
  extrudePlan(g, M.bronze, circle(dia * 0.35, 64), 0.015, 0);
  cyl(g, M.bronze, 0.03, 0.03, h - 0.05, [0, 0.015, 0], 24);
  extrudePlan(g, M[top], circle(dia / 2, 96), 0.035, h - 0.035, 0.006);
  return g;
}

/** Floating media lowboard, smoked oak with fluted doors and marble top. Origin: floor. */
export function lowboard(M, { w = 2.2, d = 0.42, h = 0.4, lift = 0.22, mat = 'smokedOak', top = 'marbleFine', fronts = 'fluted' } = {}) {
  const g = new THREE.Group();
  boxOn(g, M[mat], [w, h - 0.03, d - 0.02], [0, lift, -0.01]);
  if (fronts === 'fluted') fluting(g, M[mat], w - 0.04, h - 0.07, { y0: lift + 0.02, z: d / 2 - 0.02 });
  else for (let i = 1; i < 4; i++) box(g, M.matteBlack, [0.003, h - 0.05, 0.003], [-w / 2 + (w * i) / 4, lift + (h - 0.03) / 2, d / 2 - 0.009]);
  boxOn(g, M[top ?? mat], [w + 0.01, 0.03, d], [0, lift + h - 0.03, 0]);
  const led = boxOn(g, M.ledStrip, [w - 0.2, 0.006, 0.01], [0, lift - 0.008, 0]); led.castShadow = false;
  return g;
}

/** Samsung The Frame style TV in art mode: thin panel with light oak bezel. */
export function frameTV(M, { inch = 65, bezel = 'oakLight', art: artMode = true } = {}) {
  const g = new THREE.Group();
  const diag = inch * 0.0254, w = diag * 0.8716, h = diag * 0.4903;
  box(g, M[bezel], [w + 0.05, h + 0.05, 0.028], [0, 0, 0]);
  if (!artMode) { const s = mesh(new THREE.PlaneGeometry(w, h), M.screen, [0, 0, 0.0145]); s.userData.keepUV = true; g.add(s); return g; }
  const scr = new THREE.Group();
  const art = frameArt(M);
  const p = mesh(new THREE.PlaneGeometry(w - 0.1, h - 0.1), art, [0, 0, 0.0145]); p.userData.keepUV = true; scr.add(p);
  const mat = mesh(new THREE.PlaneGeometry(w, h), M.paper, [0, 0, 0.0142]); mat.userData.keepUV = true; scr.add(mat);
  g.add(scr);
  return g;
}
let _frameArt = null;
const frameArt = () => (_frameArt ??= artMaterial('landscape', 21));

/** Slatted wall panel: vertical slats on a dark backing, optional LED cove on top. */
export function slatWall(M, { w = 2.8, h = 2.56, slat = 0.03, depth = 0.022, pitch = 0.046, mat = 'oak', backing = 'matteBlack' } = {}) {
  const g = new THREE.Group();
  boxOn(g, M[backing], [w, h, 0.012], [0, 0, 0.006]);
  const n = Math.floor(w / pitch), off = (w - n * pitch) / 2;
  const geo = new THREE.BoxGeometry(slat, h, depth);
  for (let i = 0; i < n; i++) g.add(mesh(geo, M[mat], [-w / 2 + off + pitch * (i + 0.5), h / 2, 0.012 + depth / 2]));
  return g;
}

/** Japandi lounge chair: solid walnut frame, loose bouclé cushions. */
export function loungeChair(M, { w = 0.72, d = 0.8, fabric = 'boucle', wood = 'walnut' } = {}) {
  const g = new THREE.Group();
  const seatY = 0.36, armY = 0.58;
  for (const s of [-1, 1]) {
    const x = s * (w / 2 - 0.025);
    tube(g, M[wood], [[x, 0, d / 2 - 0.08], [x, armY - 0.05, d / 2 - 0.06], [x, armY, d / 2 - 0.12], [x, armY, -d / 2 + 0.2], [x, armY + 0.02, -d / 2 + 0.12]], 0.018, 48);
    tube(g, M[wood], [[x, 0, -d / 2 + 0.08], [x, seatY - 0.06, -d / 2 + 0.12], [x, 0.78, -d / 2 + 0.02]], 0.018, 32);
    tube(g, M[wood], [[x, seatY - 0.08, d / 2 - 0.1], [x, seatY - 0.1, -d / 2 + 0.14]], 0.014, 8);
  }
  box(g, M[wood], [w - 0.05, 0.03, 0.03], [0, seatY - 0.09, d / 2 - 0.1]);
  box(g, M[wood], [w - 0.05, 0.03, 0.03], [0, seatY - 0.1, -d / 2 + 0.16]);
  box(g, M[wood], [w - 0.05, 0.03, 0.03], [0, 0.72, -d / 2 + 0.05]);
  rbox(g, M[fabric], [w - 0.1, 0.12, d - 0.2], [0, seatY + 0.02, 0.05], 0.045, 5);
  const back = rbox(g, M[fabric], [w - 0.12, 0.46, 0.12], [0, 0.6, -d / 2 + 0.16], 0.05, 5);
  back.rotation.x = -0.28;
  return g;
}

/** Wide saucer-like swivel lounge in sage velvet (bedroom reading chair). */
export function tubChair(M, { dia = 0.78, fabric = 'velvetSage' } = {}) {
  const g = new THREE.Group();
  cyl(g, M.bronze, 0.2, 0.22, 0.02, [0, 0, 0], 48);
  cyl(g, M.bronze, 0.04, 0.04, 0.16, [0, 0.02, 0], 24);
  const r = dia / 2, band = [];
  const outerArc = circle(r, 96).filter(([x, z]) => z < r * 0.35);
  const angs = outerArc.map(([x, z]) => Math.atan2(z, x));
  void angs;
  const arc = (rad, from, to, seg = 64) => Array.from({ length: seg + 1 }, (_, i) => { const t = from + ((to - from) * i) / seg; return [Math.cos(t) * rad, Math.sin(t) * rad]; });
  band.push(...arc(r, 0.35, Math.PI - 0.35), ...arc(r - 0.13, Math.PI - 0.35, 0.35));
  const bandNeg = band.map(([x, z]) => [x, -z]);
  extrudePlan(g, M[fabric], bandNeg, 0.48, 0.2, 0.05);
  extrudePlan(g, M[fabric], circle(r - 0.06, 96), 0.22, 0.18, 0.06);
  const c = cushion(M, 'linenIvory', [0.4, 0.34, 0.14]); c.position.set(0, 0.55, -0.16); c.rotation.x = -0.25; g.add(c);
  return g;
}

/** Curved upholstered dining chair (shell back), slim bronze legs. */
export function diningChair(M, { fabric = 'boucle', legs = 'bronzeDark' } = {}) {
  const g = new THREE.Group();
  const seatH = 0.47, r = 0.26;
  for (const [x, z] of [[-0.19, 0.18], [0.19, 0.18], [-0.18, -0.17], [0.18, -0.17]]) {
    const leg = cyl(g, M[legs], 0.011, 0.014, seatH - 0.06, [x, 0, z], 12);
    leg.rotation.set(z > 0 ? 0.04 : -0.06, 0, x > 0 ? -0.04 : 0.04);
  }
  extrudePlan(g, M[fabric], roundedRect(0.5, 0.48, 0.2), 0.09, seatH - 0.08, 0.03);
  const arc = (rad, from, to, seg = 48) => Array.from({ length: seg + 1 }, (_, i) => { const t = from + ((to - from) * i) / seg; return [Math.cos(t) * rad, -Math.sin(t) * rad * 0.92]; });
  const shell = [...arc(r, -0.15, Math.PI + 0.15), ...arc(r - 0.055, Math.PI + 0.15, -0.15)];
  const s = extrudePlan(g, M[fabric], shell, 0.36, seatH - 0.02, 0.025);
  s.position.z = -0.02;
  return g;
}

/** Round dining table: Calacatta top, fluted smoked-oak pedestal. */
export function diningTableRound(M, { dia = 1.3, h = 0.75 } = {}) {
  const g = new THREE.Group();
  extrudePlan(g, M.bronzeDark, circle(0.3, 96), 0.02, 0);
  extrudePlan(g, M.smokedOak, flutedCircle(0.23, 30, 0.012), h - 0.08, 0.02);
  extrudePlan(g, M.smokedOak, circle(0.3, 96), 0.03, h - 0.065);
  extrudePlan(g, M.marble, circle(dia / 2, 160), 0.035, h - 0.035, 0.008);
  return g;
}

/** Sideboard: smoked oak, fluted fronts, marble top, recessed bronze plinth. */
export function sideboard(M, { w = 2.0, d = 0.45, h = 0.76, doors = 4 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.bronzeDark, [w - 0.12, 0.1, d - 0.1], [0, 0, -0.02]);
  boxOn(g, M.smokedOak, [w, h - 0.13, d - 0.02], [0, 0.1, -0.01]);
  const dw = w / doors;
  for (let i = 0; i < doors; i++) {
    const sub = new THREE.Group(); sub.position.set(-w / 2 + dw * (i + 0.5), 0, 0); g.add(sub);
    fluting(sub, M.smokedOak, dw - 0.012, h - 0.17, { y0: 0.12, z: d / 2 - 0.02, pitch: 0.03, r: 0.012 });
  }
  for (let i = 1; i < doors; i += 2) box(g, M.bronze, [0.012, 0.16, 0.015], [-w / 2 + dw * i, 0.55, d / 2 - 0.005]);
  boxOn(g, M.marble, [w + 0.01, 0.03, d + 0.01], [0, h - 0.03, 0]);
  return g;
}

/** Wall-mounted console with drawer (hall). */
export function wallConsole(M, { w = 1.2, d = 0.32, h = 0.16, y = 0.78 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.smokedOak, [w, h, d], [0, y, 0]);
  boxOn(g, M.marbleFine, [w + 0.01, 0.02, d + 0.005], [0, y + h, 0]);
  box(g, M.bronze, [0.2, 0.012, 0.012], [0, y + h / 2, d / 2 + 0.006]);
  return g;
}

/** Built-in entrance wardrobe with open, backlit niche and upholstered bench. */
export function hallWardrobe(M, { w = 2.0, d = 0.4, h = 2.56, niche = 0.85 } = {}) {
  const g = new THREE.Group();
  const closed = w - niche, x0 = -w / 2;
  // closed part (handle-less, fluted)
  boxOn(g, M.smokedOak, [closed, h, d], [x0 + closed / 2, 0, 0]);
  const doors = 2, dw = closed / doors;
  for (let i = 0; i < doors; i++) {
    const s = new THREE.Group(); s.position.set(x0 + dw * (i + 0.5), 0, 0); g.add(s);
    fluting(s, M.smokedOak, dw - 0.01, h - 0.12, { y0: 0.08, z: d / 2, pitch: 0.034, r: 0.013 });
    box(g, M.bronze, [0.014, 0.9, 0.018], [x0 + dw * (i + 1) - 0.05, 1.1, d / 2 + 0.012]);
  }
  // niche carcass
  const nx = x0 + closed + niche / 2;
  boxOn(g, M.smokedOak, [niche, 0.03, d], [nx, h - 0.35, 0]);
  boxOn(g, M.smokedOak, [0.03, h, d], [x0 + w - 0.015, 0, 0]);
  boxOn(g, M.oak, [niche - 0.03, 0.4, d - 0.02], [nx - 0.015, 0, -0.01]);
  rboxOn(g, M.linenTaupe, [niche - 0.05, 0.07, d - 0.04], [nx - 0.015, 0.4, -0.01], 0.02, 3);
  box(g, M.oak, [niche - 0.03, 0.02, 0.26], [nx - 0.015, 1.75, -0.06]);
  const led = box(g, M.ledStrip, [niche - 0.08, 0.006, 0.01], [nx - 0.015, h - 0.36, d / 2 - 0.04]); led.castShadow = false;
  for (let i = 0; i < 3; i++) {
    const hx = nx - niche / 2 + 0.18 + i * 0.22;
    cyl(g, M.bronze, 0.012, 0.012, 0.012, [hx, 1.62, -d / 2 + 0.005], 16).rotation.x = Math.PI / 2;
    box(g, M.bronze, [0.014, 0.014, 0.07], [hx, 1.62, -d / 2 + 0.04]);
  }
  return g;
}

/** Highboard with smoked-glass doors and lit interior (bar / glassware). */
export function glassHighboard(M, { w = 0.9, d = 0.35, h = 1.55 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.bronzeDark, [w - 0.08, 0.08, d - 0.06], [0, 0, 0]);
  boxOn(g, M.smokedOak, [w, 0.03, d], [0, 0.08, 0]);
  boxOn(g, M.smokedOak, [w, 0.03, d], [0, h - 0.03, 0]);
  for (const s of [-1, 1]) boxOn(g, M.smokedOak, [0.03, h - 0.08, d], [s * (w / 2 - 0.015), 0.08, 0]);
  boxOn(g, M.smokedOak, [w - 0.06, h - 0.14, 0.015], [0, 0.11, -d / 2 + 0.008]);
  for (const y of [0.52, 0.95]) boxOn(g, M.smokedGlass, [w - 0.06, 0.008, d - 0.04], [0, y, 0]).userData.keep = true;
  for (const s of [-1, 1]) {
    const door = boxOn(g, M.smokedGlass, [w / 2 - 0.035, h - 0.16, 0.008], [s * (w / 4 - 0.005), 0.12, d / 2 - 0.004]);
    door.userData.keep = true; door.castShadow = false;
    box(g, M.bronze, [0.012, 0.3, 0.018], [s * 0.035, h * 0.55, d / 2 + 0.01]);
  }
  const led = box(g, M.ledStrip, [w - 0.1, 0.005, 0.01], [0, h - 0.05, 0]); led.castShadow = false;
  // glassware silhouettes
  for (const [x, y] of [[-0.25, 0.1], [-0.15, 0.1], [0.12, 0.1], [0.22, 0.1], [-0.2, 0.53], [0.18, 0.53]]) {
    lathe(g, M.smokedGlass, [[0, 0], [0.035, 0], [0.036, 0.015], [0.008, 0.02], [0.006, 0.12], [0.035, 0.14], [0.04, 0.2], [0.036, 0.2], [0.03, 0.15]], [x, y + 0.03, 0.02], 20).userData.keep = true;
  }
  return g;
}

// ------------------------------------------------------------------ bedroom
/** Upholstered bed with channel-tufted headboard, layered linen bedding. Head at −z. */
export function bed(M, { mattressW = 1.8, mattressL = 2.0, frame = 'linenGrey' } = {}) {
  const g = new THREE.Group();
  const W = mattressW + 0.14, L = mattressL + 0.12;
  boxOn(g, M.bronzeDark, [W - 0.2, 0.08, L - 0.2], [0, 0, 0.02]);
  rboxOn(g, M[frame], [W, 0.24, L], [0, 0.07, 0.02], 0.03, 3);
  // headboard (channels)
  const hbH = 1.18, ch = 8, cw = W / ch;
  for (let i = 0; i < ch; i++) rboxOn(g, M[frame], [cw - 0.004, hbH, 0.1], [-W / 2 + cw * (i + 0.5), 0.07, -L / 2 - 0.02], 0.045, 4);
  // mattress + bedding
  rboxOn(g, M.bedding, [mattressW, 0.22, mattressL], [0, 0.3, 0.04], 0.05, 4);
  rboxOn(g, M.bedding, [mattressW + 0.1, 0.1, mattressL * 0.72], [0, 0.46, 0.33], 0.05, 5);
  rboxOn(g, M.throwSage, [mattressW + 0.16, 0.035, 0.52], [0, 0.55, 0.62], 0.016, 3);
  // pillows
  const pl = [[-0.44, 'bedding', 0.62, 0.42], [0.44, 'bedding', 0.62, 0.42], [-0.4, 'beddingSand', 0.55, 0.38], [0.4, 'beddingSand', 0.55, 0.38], [-0.14, 'velvetSage', 0.42, 0.32], [0.18, 'linenTaupe', 0.4, 0.3]];
  pl.forEach(([x, mat, w, h], i) => {
    const c = cushion(M, mat, [w, h, 0.17]);
    const row = i < 2 ? 0 : i < 4 ? 1 : 2;
    c.position.set(x, 0.62 + (row === 0 ? 0.1 : row === 1 ? 0.06 : 0.02), -L / 2 + 0.2 + row * 0.12);
    c.rotation.set(-1.2 + row * 0.15, (i % 2 ? -1 : 1) * 0.05, 0);
    g.add(c);
  });
  return g;
}

/** Floating nightstand with drawer. Origin: floor under its front centre footprint. */
export function nightstand(M, { w = 0.5, d = 0.38, h = 0.2, y = 0.36 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.smokedOak, [w, h, d], [0, y, 0]);
  fluting(g, M.smokedOak, w - 0.03, h - 0.04, { y0: y + 0.02, z: d / 2, pitch: 0.026, r: 0.01 });
  boxOn(g, M.marbleFine, [w, 0.018, d], [0, y + h, 0]);
  return g;
}

/** Floor-to-ceiling built-in wardrobe with fluted smoked-oak doors and long bronze pulls. */
export function wardrobe(M, { w = 3.0, d = 0.62, h = 2.52, doors = 6 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.matteBlack, [w, 0.08, d - 0.08], [0, 0, -0.04]);
  boxOn(g, M.smokedOak, [w, h - 0.08, d - 0.02], [0, 0.08, -0.01]);
  const dw = w / doors;
  for (let i = 0; i < doors; i++) {
    const s = new THREE.Group(); s.position.set(-w / 2 + dw * (i + 0.5), 0, 0); g.add(s);
    fluting(s, M.smokedOak, dw - 0.008, h - 0.12, { y0: 0.1, z: d / 2 - 0.02, pitch: 0.034, r: 0.013 });
    const px = (i % 2 === 0 ? dw / 2 - 0.05 : -dw / 2 + 0.05);
    box(s, M.bronze, [0.014, 0.8, 0.02], [px, 1.1, d / 2 + 0.012]);
  }
  return g;
}

// ------------------------------------------------------------------ office
/** Sofa bed (opens to 140 × 200 cm) in sage linen with bolster arms. */
export function sofaBed(M, { w = 2.0, d = 0.95, open = false } = {}) {
  const g = new THREE.Group();
  const fabric = 'linenSage';
  for (const x of [-w / 2 + 0.12, w / 2 - 0.12]) for (const z of [-d / 2 + 0.1, d / 2 - 0.1]) cyl(g, M.oak, 0.02, 0.016, 0.12, [x, 0, z], 16);
  if (open) {
    rboxOn(g, M[fabric], [w, 0.25, 1.5], [0, 0.12, -d / 2 + 0.75], 0.04, 4);
    rboxOn(g, M.bedding, [w - 0.06, 0.1, 1.44], [0, 0.37, -d / 2 + 0.75], 0.04, 4);
    return g;
  }
  rboxOn(g, M[fabric], [w, 0.26, d], [0, 0.12, 0], 0.04, 4);
  rboxOn(g, M[fabric], [w - 0.36, 0.14, d - 0.24], [0, 0.38, 0.1], 0.05, 5);
  rboxOn(g, M[fabric], [w, 0.42, 0.22], [0, 0.38, -d / 2 + 0.11], 0.06, 5);
  for (const s of [-1, 1]) {
    const bol = cyl(g, M[fabric], 0.1, 0.1, d - 0.25, [s * (w / 2 - 0.1), 0, 0.1], 32);
    bol.rotation.x = Math.PI / 2; bol.position.y = 0.5;
  }
  for (const [x, mat] of [[-0.35, 'linenIvory'], [0.3, 'velvetCognac'], [0.62, 'linenIvory']]) {
    const c = cushion(M, mat, [0.44, 0.44, 0.15]); c.position.set(x, 0.66, -d / 2 + 0.3); c.rotation.x = -0.25; g.add(c);
  }
  return g;
}

/** Desk: oak top, smoked-oak drawer, black sled legs. */
export function desk(M, { w = 1.5, d = 0.65, h = 0.75 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.oakLight, [w, 0.035, d], [0, h - 0.035, 0]);
  boxOn(g, M.smokedOak, [0.55, 0.1, d - 0.08], [w / 2 - 0.35, h - 0.135, 0]);
  box(g, M.bronze, [0.16, 0.01, 0.012], [w / 2 - 0.35, h - 0.085, d / 2 - 0.035]);
  for (const s of [-1, 1]) {
    const x = s * (w / 2 - 0.06);
    box(g, M.blackMetal, [0.03, h - 0.035, 0.03], [x, (h - 0.035) / 2, d / 2 - 0.06]);
    box(g, M.blackMetal, [0.03, h - 0.035, 0.03], [x, (h - 0.035) / 2, -d / 2 + 0.06]);
    box(g, M.blackMetal, [0.03, 0.03, d - 0.1], [x, 0.015, 0]);
    box(g, M.blackMetal, [0.03, 0.03, d - 0.1], [x, h - 0.05, 0]);
  }
  return g;
}

/** Upholstered task chair on five-star bronze base. */
export function taskChair(M, { fabric = 'velvetSage' } = {}) {
  const g = new THREE.Group();
  for (let i = 0; i < 5; i++) {
    const a = (i / 5) * Math.PI * 2, x = Math.cos(a) * 0.3, z = Math.sin(a) * 0.3;
    tube(g, M.bronzeDark, [[0, 0.1, 0], [x * 0.6, 0.085, z * 0.6], [x, 0.07, z]], 0.014, 12);
    const w = mesh(new THREE.SphereGeometry(0.03, 16, 12), M.matteBlack, [x, 0.03, z]); g.add(w);
  }
  cyl(g, M.bronzeDark, 0.025, 0.025, 0.32, [0, 0.1, 0], 16);
  rboxOn(g, M[fabric], [0.5, 0.09, 0.48], [0, 0.42, 0.02], 0.04, 4);
  const back = rbox(g, M[fabric], [0.46, 0.42, 0.08], [0, 0.78, -0.22], 0.05, 5); back.rotation.x = -0.12;
  box(g, M.bronzeDark, [0.04, 0.3, 0.03], [0, 0.55, -0.24]);
  return g;
}

/** Built-in shelving with backlit shelves (smoked oak). */
export function shelving(M, { w = 1.3, d = 0.35, h = 2.3, shelves = [0.42, 0.82, 1.22, 1.62, 2.0], mat = 'smokedOak' } = {}) {
  const g = new THREE.Group();
  M = { smokedOak: M[mat], wallDeep: M.wallDeep, ledStrip: M.ledStrip };
  boxOn(g, M.smokedOak, [w, 0.4, d], [0, 0, 0]);
  boxOn(g, M.smokedOak, [0.03, h, d], [-w / 2 + 0.015, 0, 0]);
  boxOn(g, M.smokedOak, [0.03, h, d], [w / 2 - 0.015, 0, 0]);
  boxOn(g, M.smokedOak, [w, 0.03, d], [0, h - 0.03, 0]);
  boxOn(g, M.wallDeep, [w - 0.06, h - 0.4, 0.01], [0, 0.4, -d / 2 + 0.005]);
  for (const y of shelves.slice(1)) {
    boxOn(g, M.smokedOak, [w - 0.06, 0.025, d - 0.02], [0, y, -0.01]);
    const led = box(g, M.ledStrip, [w - 0.12, 0.004, 0.008], [0, y - 0.004, d / 2 - 0.05]); led.castShadow = false;
  }
  fluting(g, M.smokedOak, w - 0.04, 0.34, { y0: 0.03, z: d / 2, pitch: 0.03, r: 0.012 });
  return g;
}

// ------------------------------------------------------------------ outdoor
export function outdoorLounge(M) {
  return loungeChair(M, { w: 0.74, d: 0.82, fabric: 'linenGrey', wood: 'teak' });
}

export function bistroSet(M) {
  const g = new THREE.Group();
  cyl(g, M.blackMetal, 0.2, 0.22, 0.015, [0, 0, 0], 32);
  cyl(g, M.blackMetal, 0.02, 0.02, 0.7, [0, 0.015, 0], 16);
  extrudePlan(g, M.travertine, circle(0.32, 96), 0.03, 0.72, 0.005);
  for (const s of [-1, 1]) {
    const c = new THREE.Group();
    for (const [x, z] of [[-0.19, 0.18], [0.19, 0.18], [-0.19, -0.18], [0.19, -0.18]]) cyl(c, M.teak, 0.014, 0.014, 0.44, [x, 0, z], 10);
    boxOn(c, M.teak, [0.44, 0.03, 0.42], [0, 0.44, 0]);
    boxOn(c, M.teak, [0.44, 0.34, 0.03], [0, 0.47, -0.2]);
    rboxOn(c, M.linenGrey, [0.4, 0.05, 0.38], [0, 0.47, 0.01], 0.02, 3);
    c.position.set(s * 0.55, 0, 0); c.rotation.y = -s * Math.PI / 2;
    g.add(c);
  }
  return g;
}

export { foldedThrow };

// ------------------------------------------------------------------ storage joinery
/**
 * Floating built-in bench/lowboard (continues the media wall joinery round the corner):
 * drawers with shadow gaps or fluting, stone/wood top, LED under-light, optional seat cushions.
 * Origin: floor centre, back at z = −d/2.
 */
export function builtInBench(M, { w = 2.2, d = 0.4, h = 0.44, lift = 0.12, mat = 'smokedOak', top = null, fronts = 'plain', drawers = 3, cushionMat = null, pillows = [] } = {}) {
  const g = new THREE.Group(), W = M[mat];
  const bodyH = h - lift - 0.03;
  boxOn(g, W, [w, bodyH, d - 0.02], [0, lift, -0.01]);
  const dw = w / drawers;
  if (fronts === 'fluted') fluting(g, W, w - 0.04, bodyH - 0.04, { y0: lift + 0.02, z: d / 2 - 0.02 });
  for (let i = 1; i < drawers; i++) box(g, M.matteBlack, [0.003, bodyH - 0.02, 0.003], [-w / 2 + dw * i, lift + bodyH / 2, d / 2 - 0.009]);
  boxOn(g, M[top ?? mat], [w + 0.01, 0.03, d], [0, h - 0.03, 0]);
  const led = boxOn(g, M.ledStrip, [w - 0.2, 0.006, 0.01], [0, lift - 0.008, 0]); led.castShadow = false;
  if (cushionMat) {
    rboxOn(g, M[cushionMat], [w * 0.62, 0.07, d - 0.04], [-w * 0.17, h, 0.0], 0.03, 3);
    pillows.forEach((p, i) => { const k = cushion(M, p, [0.46, 0.42, 0.14]); k.position.set(-w * 0.45 + i * 0.5, h + 0.27, -d / 2 + 0.08); k.rotation.x = -0.12; g.add(k); });
  }
  return g;
}

/**
 * Floor-to-ceiling library wall: closed base cabinets (d) with fronts, open shelves above
 * (0.3 deep) with LED per shelf. Returns the group; userData.shelves = shelf top heights.
 */
export function libraryWall(M, { w = 1.5, d = 0.4, h = 2.52, baseH = 0.76, mat = 'smokedOak', front = null, fronts = 'plain', doors = 2, shelfD = 0.3, shelves = 4, pull = null } = {}) {
  const g = new THREE.Group(), W = M[mat], F = M[front ?? mat], t = 0.025;
  boxOn(g, W, [w, 0.06, d - 0.04], [0, 0, -0.02]);
  boxOn(g, W, [w, baseH - 0.06, d - 0.02], [0, 0.06, -0.01]);
  const dw = w / doors;
  for (let i = 0; i < doors; i++) {
    const cx = -w / 2 + dw * (i + 0.5);
    if (fronts === 'fluted') { const s = new THREE.Group(); s.position.x = cx; g.add(s); fluting(s, F, dw - 0.008, baseH - 0.1, { y0: 0.08, z: d / 2 - 0.02 }); }
    else box(g, F, [dw - 0.004, baseH - 0.08, 0.018], [cx, 0.07 + (baseH - 0.08) / 2, d / 2 - 0.009]);
    if (pull) box(g, M[pull], [0.012, 0.16, 0.015], [cx + (i % 2 ? -1 : 1) * (dw / 2 - 0.05), baseH - 0.14, d / 2 + 0.006]);
  }
  boxOn(g, W, [w + 0.01, t, d], [0, baseH, 0]);
  const z0 = -d / 2 + shelfD / 2;
  for (const s of [-1, 1]) boxOn(g, W, [t, h - baseH - t, shelfD], [s * (w / 2 - t / 2), baseH + t, z0]);
  boxOn(g, M.wallDeep ?? W, [w - 2 * t, h - baseH - t, 0.01], [0, baseH + t, -d / 2 + 0.005]);
  const ys = [];
  for (let i = 1; i <= shelves; i++) {
    const y = baseH + t + ((h - baseH - t) * i) / (shelves + 1);
    boxOn(g, W, [w - 2 * t, t, shelfD], [0, y, z0]); ys.push(y + t);
    const led = box(g, M.ledStrip, [w - 0.1, 0.004, 0.008], [0, y - 0.004, z0 + shelfD / 2 - 0.04]); led.castShadow = false;
  }
  boxOn(g, W, [w, t, shelfD], [0, h - t, z0]);
  g.userData.shelves = [baseH + t, ...ys];
  g.userData.shelfZ = z0;
  return g;
}
