// Existing kitchen (reference image): dark walnut fronts, speckled white granite worktop and
// splashback, black undermount sink, black tap, black oven, tall units left/right, block unit.
import * as THREE from 'three';
import { box, boxOn, cyl, tube, lathe, rboxOn } from './common.js';

/** Kitchen row. Origin at floor, centre of the row's wall line (back at z = −d/2). */
export function kitchenRow(M, { L = 3.6, d = 0.6, H = 2.3 } = {}) {
  const g = new THREE.Group();
  const x0 = -L / 2, tall = 0.6, top = 0.9, wt = 0.04, base = L - tall * 2;
  const front = d / 2;
  // plinth
  boxOn(g, M.matteBlack, [L, 0.1, d - 0.06], [0, 0, -0.03]);
  // carcasses
  boxOn(g, M.walnut, [tall, H - 0.1, d], [x0 + tall / 2, 0.1, 0]);
  boxOn(g, M.walnut, [tall, H - 0.1, d], [-x0 - tall / 2, 0.1, 0]);
  boxOn(g, M.walnut, [base, top - 0.1, d - 0.02], [0, 0.1, -0.01]);
  // front seams (shadow gaps) – thin black lines
  const seam = (x, y, w, h) => box(g, M.matteBlack, [w, h, 0.004], [x, y, front + 0.001]);
  // left tall: drawer / oven / top doors
  seam(x0 + tall / 2, 0.62, tall - 0.01, 0.004);
  seam(x0 + tall / 2, 1.24, tall - 0.01, 0.004);
  seam(x0 + tall / 2, 1.78, tall - 0.01, 0.004);
  boxOn(g, M.appliance, [tall - 0.03, 0.58, 0.02], [x0 + tall / 2, 0.64, front + 0.004]);
  box(g, M.smokedGlass, [tall - 0.16, 0.3, 0.004], [x0 + tall / 2, 0.88, front + 0.016]).userData.keep = true;
  box(g, M.matteBlack, [tall - 0.12, 0.05, 0.006], [x0 + tall / 2, 1.17, front + 0.016]);
  box(g, M.steel, [tall - 0.14, 0.012, 0.02], [x0 + tall / 2, 1.12, front + 0.03]);
  // right tall: fridge/freezer fronts
  seam(-x0 - tall / 2, 0.86, tall - 0.01, 0.004);
  seam(-x0 - tall / 2, 1.78, tall - 0.01, 0.004);
  // base run fronts: drawers under hob, doors under sink
  seam(0, top - 0.05, base, 0.004);
  seam(-base / 2 + 0.9, 0.5, 0.004, 0.8);
  seam(-base / 2 + 0.9, 0.52, 0.9, 0.004);
  seam(-base / 2 + 0.45, 0.32, 0.9, 0.004);
  seam(base / 2 - 0.75, 0.5, 0.004, 0.8);
  seam(base / 2 - 0.375, 0.5, 0.004, 0.8);
  // handle grooves (black J-profiles)
  for (const [x, y, w] of [[-base / 2 + 0.45, top - 0.09, 0.8], [-base / 2 + 0.45, 0.5, 0.8], [-base / 2 + 0.45, 0.3, 0.8], [0.3, top - 0.09, 0.55], [base / 2 - 0.375, top - 0.09, 0.7], [x0 + tall / 2, 0.58, 0.5], [-x0 - tall / 2, 0.82, 0.5], [-x0 - tall / 2, 1.74, 0.5]]) {
    box(g, M.matteBlack, [w, 0.018, 0.014], [x, y, front + 0.006]);
  }
  // worktop + splashback in speckled granite
  boxOn(g, M.granite, [base, wt, d + 0.02], [0, top, 0.01]);
  boxOn(g, M.granite, [base, 0.6, 0.02], [0, top + wt, -d / 2 + 0.01]);
  // wall cabinets (two rows of fronts)
  const wy = top + wt + 0.6, wd = 0.36;
  boxOn(g, M.walnut, [base, H - wy, wd], [0, wy, -d / 2 + wd / 2]);
  const n = 3, ww = base / n;
  for (let i = 1; i < n; i++) box(g, M.matteBlack, [0.004, H - wy, 0.004], [-base / 2 + ww * i, wy + (H - wy) / 2, -d / 2 + wd + 0.001]);
  box(g, M.matteBlack, [base, 0.004, 0.004], [0, wy + (H - wy) * 0.5, -d / 2 + wd + 0.001]);
  const led = box(g, M.ledStrip, [base - 0.1, 0.006, 0.012], [0, wy - 0.006, -d / 2 + wd - 0.05]); led.castShadow = false;
  // top filler
  boxOn(g, M.matteBlack, [L, 0.03, d], [0, H, 0]);
  // hob with downdraft (flush black glass)
  const hx = -base / 2 + 0.45;
  boxOn(g, M.appliance, [0.8, 0.006, 0.52], [hx, top + wt, 0.0]);
  box(g, M.matteBlack, [0.08, 0.002, 0.3], [hx, top + wt + 0.0065, 0.0]);
  for (const [x, z, r] of [[-0.22, -0.1, 0.1], [0.22, -0.1, 0.1], [-0.22, 0.12, 0.08], [0.22, 0.12, 0.08]]) {
    const c = cyl(g, M.steel, r, r, 0.0005, [hx + x, top + wt + 0.006, z], 48); c.material = M.frame;
  }
  // undermount sink (black granite) + tap
  const sx = base / 2 - 0.45;
  boxOn(g, M.matteBlack, [0.5, 0.004, 0.4], [sx, top + wt - 0.18, 0.02]);
  for (const [x, z, w, dd] of [[sx, 0.22, 0.5, 0.01], [sx, -0.18, 0.5, 0.01], [sx - 0.25, 0.02, 0.01, 0.4], [sx + 0.25, 0.02, 0.01, 0.4]]) boxOn(g, M.matteBlack, [w, 0.18, dd], [x, top + wt - 0.18, z]);
  // cut-out: cover worktop hole with sink edge ring (visual)
  box(g, M.matteBlack, [0.5, 0.041, 0.4], [sx, top + wt / 2 + 0.0005, 0.02]).scale.set(1, 1, 1);
  cyl(g, M.matteBlack, 0.028, 0.03, 0.05, [sx, top + wt, -0.22], 24);
  tube(g, M.matteBlack, [[sx, top + wt + 0.05, -0.22], [sx, top + wt + 0.33, -0.22], [sx, top + wt + 0.38, -0.16], [sx, top + wt + 0.33, -0.05], [sx, top + wt + 0.22, -0.04]], 0.013, 32);
  box(g, M.matteBlack, [0.012, 0.012, 0.1], [sx + 0.035, top + wt + 0.15, -0.2]);
  return g;
}

/** Freestanding block unit (per reference: black carcass, granite top). */
export function kitchenBlock(M, { w = 1.2, d = 0.6, h = 0.92 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.matteBlack, [w - 0.06, 0.1, d - 0.08], [0, 0, 0]);
  boxOn(g, M.appliance, [w, h - 0.14, d], [0, 0.1, 0]);
  box(g, M.walnut, [0.02, h - 0.14, d], [-w / 2 + 0.01, 0.1 + (h - 0.14) / 2, 0]);
  box(g, M.walnut, [0.02, h - 0.14, d], [w / 2 - 0.01, 0.1 + (h - 0.14) / 2, 0]);
  box(g, M.frame, [0.004, h - 0.18, 0.004], [0, 0.1 + (h - 0.14) / 2, d / 2 + 0.001]);
  boxOn(g, M.granite, [w + 0.04, 0.04, d + 0.04], [0, h - 0.04, 0]);
  return g;
}

/** Styling for the worktop: board, oil bottle, bowl of lemons. */
export function kitchenStyling(M) {
  const g = new THREE.Group();
  rboxOn(g, M.oak, [0.42, 0.025, 0.3], [0, 0, 0], 0.01, 2).rotation.y = 0.1;
  lathe(g, M.smokedGlass, [[0, 0], [0.035, 0], [0.036, 0.2], [0.012, 0.25], [0.012, 0.28]], [0.3, 0, -0.05], 24);
  return g;
}
