// Sanitary objects after the HLS plan (Ausführungsplan 01.06.2026): Laufen VAL 60 × 42 washbasins
// on half-height pre-walls with a 1.18 m shelf ("Ablage 1,18 m"), Laufen Meda wall-hung WCs,
// Villeroy & Boch Collaro 180 × 80 bath, Duravit Tulum exposed shower/bath sets, towel radiators
// 60 × 180, stacked washer/dryer – all fittings in matt black. Full-wall mirrors (made to measure)
// cover the entire wall above each pre-wall shelf.
import * as THREE from 'three';
import { box, boxOn, rbox, rboxOn, cyl, tube, mesh, lathe, roundedRect, sphere } from './common.js';

function shapeWithHole(outer, hole) {
  const s = new THREE.Shape(outer.map(([x, z]) => new THREE.Vector2(x, -z)));
  s.holes.push(new THREE.Path(hole.map(([x, z]) => new THREE.Vector2(x, -z)).reverse()));
  return s;
}
function extrudeShape(parent, mat, shape, h, y0) {
  const geo = new THREE.ExtrudeGeometry(shape, { depth: h, bevelEnabled: false, curveSegments: 32 });
  geo.rotateX(-Math.PI / 2); geo.translate(0, y0, 0);
  const m = mesh(geo, mat); parent.add(m); return m;
}
const rect = (w, d, cx = 0, cz = 0) => [[cx - w / 2, cz - d / 2], [cx + w / 2, cz - d / 2], [cx + w / 2, cz + d / 2], [cx - w / 2, cz + d / 2]];

export const LEDGE_H = 1.18;   // "Ablage 1,18 m" laut Ausführungsplan

// ------------------------------------------------------------------ pre-wall + mirror
/**
 * Half-height pre-wall (installation wall) with stone shelf on top. Origin: wall face, centre of
 * the run; the ledge extends forward (+z) by d. Tiled front and sides, stone top 2 cm.
 */
export function preWall(M, { w, d, h = LEDGE_H, top = 'marble' } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.tileWall, [w, h - 0.02, d], [0, 0, d / 2]);
  boxOn(g, M[top], [w, 0.02, d + 0.01], [0, h - 0.02, (d + 0.01) / 2]);
  return g;
}

/**
 * Full-wall mirror made to measure: covers the whole wall from the shelf to the ceiling with a
 * 5 mm shadow gap all round. Origin: wall face, bottom centre. Single plane → planar reflector.
 */
export function wallMirror(M, w, h) {
  const g = new THREE.Group();
  box(g, M.matteBlack, [w - 0.01, h - 0.01, 0.004], [0, h / 2, 0.002]).castShadow = false;
  const m = mesh(new THREE.PlaneGeometry(w - 0.01, h - 0.01), M.mirror, [0, h / 2, 0.0065]);
  m.userData.keepUV = true; m.castShadow = false;
  g.add(m);
  return g;
}

// ------------------------------------------------------------------ fittings (matt black)
/** Single-lever basin mixer (Duravit Tulum M), origin at deck. */
export function basinMixer(M, { reach = 0.13, h = 0.17 } = {}) {
  const g = new THREE.Group(), k = M.fittingBlack;
  cyl(g, k, 0.024, 0.026, h, [0, 0, 0], 32);
  cyl(g, k, 0.026, 0.026, 0.004, [0, h, 0], 32);
  const sp = cyl(g, k, 0.012, 0.012, reach, [0, 0, 0], 20);
  sp.rotation.x = Math.PI / 2; sp.position.set(0, h - 0.03, reach / 2);
  cyl(g, k, 0.013, 0.013, 0.012, [0, h - 0.042, reach - 0.006], 20);
  const lever = box(g, k, [0.012, 0.012, 0.09], [0, h + 0.02, -0.03]); lever.rotation.x = -0.35;
  return g;
}

/** Exposed thermostat bar with spout + hand shower on holder (Duravit Tulum AP). Origin: wall face. */
export function exposedThermostat(M, { spout = true, width = 0.32 } = {}) {
  const g = new THREE.Group(), k = M.fittingBlack;
  const bar = cyl(g, k, 0.028, 0.028, width, [0, 0, 0], 32); bar.rotation.z = Math.PI / 2; bar.position.set(0, 0, 0.06);
  for (const x of [-width / 2 + 0.03, width / 2 - 0.03]) { const a = cyl(g, k, 0.012, 0.012, 0.06, [0, 0, 0], 16); a.rotation.x = Math.PI / 2; a.position.set(x, 0, 0.03); }
  for (const x of [-width / 2, width / 2]) { const knob = cyl(g, k, 0.03, 0.03, 0.03, [0, 0, 0], 32); knob.rotation.z = Math.PI / 2; knob.position.set(x, 0, 0.06); }
  if (spout) { const sp = cyl(g, k, 0.012, 0.012, 0.14, [0, 0, 0], 16); sp.rotation.x = Math.PI / 2; sp.position.set(0, -0.04, 0.13); }
  // hand shower on holder + hose
  box(g, k, [0.03, 0.05, 0.05], [width / 2 + 0.12, 0.22, 0.025]);
  const hs = cyl(g, k, 0.013, 0.018, 0.22, [width / 2 + 0.12, 0.13, 0.06], 20); hs.rotation.x = 0.12;
  cyl(g, k, 0.035, 0.035, 0.02, [width / 2 + 0.12, 0.34, 0.07], 32);
  tube(g, k, [[width / 2 - 0.02, -0.01, 0.06], [width / 2 + 0.05, -0.2, 0.08], [width / 2 + 0.12, -0.12, 0.07], [width / 2 + 0.12, 0.13, 0.06]], 0.006, 24);
  return g;
}

/** Duravit Tulum shower system (exposed): thermostat, riser, rain head Ø 25, hand shower. */
export function showerSystem(M, { head = 2.15 } = {}) {
  const g = new THREE.Group(), k = M.fittingBlack;
  const t = exposedThermostat(M, { spout: false, width: 0.3 }); t.position.y = 1.05; g.add(t);
  cyl(g, k, 0.012, 0.012, head - 1.1, [0, 1.1, 0.06], 16);
  box(g, k, [0.02, 0.02, 0.36], [0, head, 0.06 + 0.17]);
  cyl(g, k, 0.125, 0.125, 0.012, [0, head - 0.02, 0.36], 64);
  return g;
}

// ------------------------------------------------------------------ ceramics
/** Laufen VAL washbasin 60 × 42 (SaphirKeramik, thin rim, tap bank at the back). Back at z = 0. */
export function valBasin(M, { w = 0.6, d = 0.42, y = 0.85 } = {}) {
  const g = new THREE.Group();
  const hole = roundedRect(w - 0.08, d - 0.16, 0.04);
  const c = [0, 0.04]; // bowl sits towards the front, tap bank at the back
  const holeC = hole.map(([x, z]) => [x, z + c[1]]);
  const outer = roundedRect(w, d, 0.012).map(([x, z]) => [x, z + d / 2]);
  const holeM = holeC.map(([x, z]) => [x, z + d / 2]);
  extrudeShape(g, M.ceramicWhite, shapeWithHole(outer, holeM), 0.012, y - 0.012);
  // bowl walls + floor
  extrudeShape(g, M.ceramicWhite, shapeWithHole(roundedRect(w - 0.07, d - 0.15, 0.045).map(([x, z]) => [x, z + c[1] + d / 2]), holeM), 0.12, y - 0.132);
  const floor = new THREE.Shape(holeM.map(([x, z]) => new THREE.Vector2(x, -z)));
  extrudeShape(g, M.ceramicWhite, floor, 0.008, y - 0.128);
  cyl(g, M.fittingBlack, 0.018, 0.018, 0.002, [0, y - 0.12, c[1] + d / 2 + 0.02], 24);
  // outer shell (thin apron)
  extrudeShape(g, M.ceramicWhite, shapeWithHole(roundedRect(w, d, 0.012).map(([x, z]) => [x, z + d / 2]), roundedRect(w - 0.01, d - 0.01, 0.01).map(([x, z]) => [x, z + d / 2])), 0.13, y - 0.14);
  const mix = basinMixer(M); mix.position.set(0, y, 0.045); g.add(mix);
  return g;
}

/** Floating vanity unit with two drawers below the basin (push-to-open). Back at z = 0. */
export function vanityUnit(M, { w = 0.58, d = 0.4, h = 0.4, top = 0.72, front = 'smokedOak' } = {}) {
  const g = new THREE.Group();
  boxOn(g, M[front], [w, h, d], [0, top - h, d / 2]);
  box(g, M.matteBlack, [w - 0.004, 0.004, 0.004], [0, top - h / 2, d + 0.001]);
  const led = boxOn(g, M.ledStrip, [w - 0.06, 0.006, 0.01], [0, top - h - 0.008, d / 2]); led.castShadow = false;
  return g;
}

/** Wall-hung WC Laufen Meda, rimless, with concealed cistern and matt black flush plate. Back at z = 0. */
export function wc(M) {
  const g = new THREE.Group();
  const pts = roundedRect(0.36, 0.53, 0.17);
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z))), { depth: 0.3, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 6, curveSegments: 32 });
  geo.rotateX(-Math.PI / 2); geo.translate(0, 0.1, 0.295);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) { // taper towards the wall
    const y = pos.getY(i), k = 0.8 + 0.2 * ((y - 0.07) / 0.36);
    pos.setX(i, pos.getX(i) * k);
  }
  geo.computeVertexNormals();
  g.add(mesh(geo, M.ceramicWhite));
  rboxOn(g, M.ceramicWhite, [0.36, 0.02, 0.49], [0, 0.43, 0.295], 0.01, 3);
  box(g, M.fittingBlack, [0.24, 0.16, 0.008], [0, 1.05, 0.004]);
  box(g, M.matteBlack, [0.1, 0.13, 0.004], [-0.055, 1.05, 0.01]);
  box(g, M.matteBlack, [0.1, 0.13, 0.004], [0.055, 1.05, 0.01]);
  return g;
}

/**
 * Villeroy & Boch Collaro 180 × 80, tiled in (stone rim), exposed Tulum bath thermostat on the
 * 10 cm shelf wall. Origin: centre of the tub; length along local x, the long wall at −z.
 */
export function bathtub(M, { L = 1.8, w = 0.8, h = 0.58 } = {}) {
  const g = new THREE.Group();
  const inner = roundedRect(L - 0.1, w - 0.1, 0.16);
  extrudeShape(g, M.tileWall, shapeWithHole(rect(L, w), roundedRect(L - 0.02, w - 0.02, 0.18)), h - 0.02, 0);
  extrudeShape(g, M.ceramicWhite, shapeWithHole(roundedRect(L - 0.02, w - 0.02, 0.18), inner), 0.02, h - 0.02);
  extrudeShape(g, M.ceramicWhite, shapeWithHole(roundedRect(L - 0.08, w - 0.08, 0.17), inner), 0.42, h - 0.44);
  extrudeShape(g, M.ceramicWhite, new THREE.Shape(inner.map(([x, z]) => new THREE.Vector2(x, -z))), 0.02, h - 0.44);
  cyl(g, M.fittingBlack, 0.022, 0.022, 0.003, [L / 2 - 0.25, h - 0.42, 0], 24);
  return g;
}

/** Walk-in shower tray zone 105 × 80 with linear drain and black-framed glass (L-shaped). */
export function walkInShower(M, { w = 1.05, d = 0.8, front = 0.47 } = {}) {
  const g = new THREE.Group();
  box(g, M.fittingBlack, [w - 0.12, 0.004, 0.05], [0, 0.002, -d / 2 + 0.08]);
  // fixed side panel towards the washbasin (x = +w/2) and partial front panel (x from −w/2)
  const side = box(g, M.glass, [0.01, 2.0, d], [w / 2 - 0.005, 1.0, 0]);
  side.userData.keep = true; side.castShadow = false;
  const fr = box(g, M.glass, [front, 2.0, 0.01], [-w / 2 + front / 2, 1.0, d / 2 - 0.005]);
  fr.userData.keep = true; fr.castShadow = false;
  for (const [sx, sz, lx, lz] of [[w / 2 - 0.005, 0, 0.018, d], [-w / 2 + front / 2, d / 2 - 0.005, front, 0.018]]) {
    box(g, M.fittingBlack, [lx, 0.018, lz], [sx, 0.009, sz]);
    box(g, M.fittingBlack, [lx, 0.018, lz], [sx, 2.0, sz]);
  }
  box(g, M.fittingBlack, [0.015, 0.015, 0.56], [-w / 2 + front - 0.01, 2.0, d / 2 - 0.28]); // stabiliser to the wall
  const sys = showerSystem(M); sys.position.set(0.1, 0, -d / 2); g.add(sys);
  // lit niche in the pre-wall
  box(g, M.limestone, [0.45, 0.28, 0.02], [-0.3, 1.35, -d / 2 + 0.01]);
  const led = box(g, M.ledStrip, [0.42, 0.005, 0.01], [-0.3, 1.48, -d / 2 + 0.03]); led.castShadow = false;
  return g;
}

/** Towel radiator 60 × 180 (matt black) with folded towels. Back at z = 0. */
export function towelRadiator(M, { w = 0.6, h = 1.8, y0 = 0.15 } = {}) {
  const g = new THREE.Group(), k = M.fittingBlack;
  box(g, k, [0.03, h, 0.03], [-w / 2, y0 + h / 2, 0.06]);
  box(g, k, [0.03, h, 0.03], [w / 2, y0 + h / 2, 0.06]);
  const n = Math.round(h / 0.08);
  for (let i = 0; i < n; i++) box(g, k, [w, 0.016, 0.016], [0, y0 + 0.05 + i * (h - 0.1) / (n - 1), 0.06]);
  rbox(g, M.towel, [w - 0.08, 0.45, 0.05], [0, y0 + h - 0.35, 0.09], 0.02, 3);
  rbox(g, M.towelTaupe, [w - 0.12, 0.34, 0.05], [0, y0 + h * 0.42, 0.095], 0.02, 3);
  return g;
}

/** Tall cabinet hiding washer + dryer (stacked). */
export function laundryTower(M, { w = 0.72, d = 0.62, h = 2.1, front = 'smokedOak' } = {}) {
  const g = new THREE.Group();
  boxOn(g, M[front], [w, h, d], [0, 0, 0]);
  box(g, M.matteBlack, [w - 0.01, 0.004, 0.004], [0, h * 0.5, d / 2 + 0.001]);
  box(g, M.fittingBlack, [0.014, 0.5, 0.02], [w / 2 - 0.06, h * 0.5 + 0.35, d / 2 + 0.012]);
  box(g, M.fittingBlack, [0.014, 0.5, 0.02], [w / 2 - 0.06, h * 0.5 - 0.35, d / 2 + 0.012]);
  return g;
}

/** Bath accessories: soap pump, diffuser. */
export function bathProps(M) {
  const g = new THREE.Group();
  lathe(g, M.stonewareCharcoal, [[0, 0], [0.035, 0], [0.036, 0.14], [0.012, 0.16], [0.008, 0.19]], [0, 0, 0], 24);
  lathe(g, M.stonewareSand, [[0, 0], [0.04, 0], [0.042, 0.1], [0.01, 0.12], [0.008, 0.13]], [0.12, 0, 0.02], 24);
  for (let i = 0; i < 5; i++) { const s = cyl(g, M.fittingBlack, 0.002, 0.002, 0.25, [0.12, 0.1, 0.02], 4); s.rotation.set(Math.sin(i * 2.1) * 0.2, 0, Math.cos(i * 1.7) * 0.2); }
  sphere(g, M.stonewareSand, 0.001, [0, 0, 0], 4);
  return g;
}

/** Shelf styling on the 1.18 m ledge: stacked towels, tray with bottles, candle. */
export function ledgeProps(M, { mat = 'stonewareSand' } = {}) {
  const g = new THREE.Group();
  rboxOn(g, M.towel, [0.3, 0.05, 0.16], [0, 0, 0], 0.015, 3);
  rboxOn(g, M.towelTaupe, [0.3, 0.05, 0.16], [0, 0.05, 0], 0.015, 3);
  lathe(g, M[mat], [[0, 0], [0.045, 0], [0.05, 0.02], [0.05, 0.16], [0.02, 0.19], [0.012, 0.22]], [0.28, 0, 0], 24);
  cyl(g, M.candle, 0.035, 0.035, 0.08, [0.4, 0, 0.02], 24);
  return g;
}

/** Small bath pendant IP44 (opal globe on black cord), origin at floor under the lamp. */
export function bathPendant(M, lampLight, { r = 0.07, y = 1.62, ceiling = 2.56 } = {}) {
  const g = new THREE.Group();
  cyl(g, M.fittingBlack, 0.03, 0.03, 0.012, [0, ceiling - 0.012, 0]);
  cyl(g, M.fittingBlack, 0.0018, 0.0018, ceiling - y - r, [0, y + r * 0.8, 0], 6).castShadow = false;
  cyl(g, M.fittingBlack, 0.02, 0.024, 0.05, [0, y + r * 0.75, 0]);
  const s = sphere(g, M.opalInterior, r, [0, y, 0], 32); s.castShadow = false;
  const l = lampLight('point', 220, { distance: 4, color: new THREE.Color('#ffe6cc') }); // 3000 K
  l.position.set(0, y, 0); g.add(l);
  return g;
}
