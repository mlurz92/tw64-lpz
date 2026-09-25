// Sanitary objects: floating vanity with integrated Calacatta basin, wall-hung WC, built-in bath,
// walk-in shower, towel radiator and the washer/dryer tall cabinet.
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

/** Wall-mounted spout + mixer in brushed bronze. Origin at wall (z = 0), y = spout height. */
export function wallTap(M, { reach = 0.18, y = 0 } = {}) {
  const g = new THREE.Group();
  cyl(g, M.bronze, 0.028, 0.028, 0.008, [0, y - 0.004, 0.004], 32).rotation.x = Math.PI / 2;
  const sp = cyl(g, M.bronze, 0.011, 0.011, reach, [0, 0, 0], 20);
  sp.rotation.x = Math.PI / 2; sp.position.set(0, y, reach / 2);
  const hd = cyl(g, M.bronze, 0.014, 0.014, 0.06, [0.12, 0, 0], 20); hd.rotation.x = Math.PI / 2; hd.position.set(0.12, y + 0.0, 0.03);
  box(g, M.bronze, [0.008, 0.008, 0.05], [0.12, y + 0.02, 0.06]);
  return g;
}

/** Floating vanity: smoked oak drawer, Calacatta top with integrated basin. Back at z = −d/2. */
export function vanity(M, { w = 0.8, d = 0.46, y = 0.86, basinW = 0.5, basinD = 0.32 } = {}) {
  const g = new THREE.Group();
  const th = 0.03, dh = 0.36;
  boxOn(g, M.smokedOak, [w, dh, d - 0.02], [0, y - th - dh, -0.01]);
  box(g, M.bronze, [0.22, 0.012, 0.014], [0, y - th - 0.06, d / 2 - 0.013]);
  const led = boxOn(g, M.ledStrip, [w - 0.1, 0.006, 0.01], [0, y - th - dh - 0.008, 0]); led.castShadow = false;
  const hole = roundedRect(basinW, basinD, 0.08);
  extrudeShape(g, M.marble, shapeWithHole(rect(w, d), hole), th, y - th);
  // basin sides and floor
  extrudeShape(g, M.marble, shapeWithHole(roundedRect(basinW + 0.04, basinD + 0.04, 0.1), hole), 0.12, y - th - 0.12);
  const floor = new THREE.Shape(roundedRect(basinW, basinD, 0.08).map(([x, z]) => new THREE.Vector2(x, -z)));
  extrudeShape(g, M.marble, floor, 0.01, y - th - 0.11);
  cyl(g, M.bronze, 0.018, 0.018, 0.002, [0, y - th - 0.1, 0], 24);
  const tap = wallTap(M, { reach: 0.17, y: y + 0.2 }); tap.position.z = -d / 2; g.add(tap);
  return g;
}

/** Vessel-basin vanity for the guest WC. */
export function vesselVanity(M, { w = 0.7, d = 0.42, y = 0.8 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.smokedOak, [w, 0.22, d], [0, y - 0.22, 0]);
  boxOn(g, M.marble, [w + 0.01, 0.025, d + 0.005], [0, y, 0]);
  lathe(g, M.stonewareSand, [[0, 0], [0.12, 0], [0.19, 0.06], [0.2, 0.13], [0.19, 0.135], [0.185, 0.07], [0.12, 0.012], [0, 0.015]], [0, y + 0.025, 0.02], 64);
  const tap = wallTap(M, { reach: 0.2, y: y + 0.32 }); tap.position.z = -d / 2; g.add(tap);
  return g;
}

/** Wall-hung WC with concealed cistern and bronze flush plate. Back at z = 0. */
export function wc(M) {
  const g = new THREE.Group();
  const bowl = new THREE.Group(); g.add(bowl);
  const pts = roundedRect(0.36, 0.54, 0.17);
  const geo = new THREE.ExtrudeGeometry(new THREE.Shape(pts.map(([x, z]) => new THREE.Vector2(x, -z))), { depth: 0.3, bevelEnabled: true, bevelSize: 0.03, bevelThickness: 0.03, bevelSegments: 6, curveSegments: 32 });
  geo.rotateX(-Math.PI / 2); geo.translate(0, 0.1, 0.3);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) { // taper towards the wall
    const y = pos.getY(i), k = 0.8 + 0.2 * ((y - 0.07) / 0.36);
    pos.setX(i, pos.getX(i) * k);
  }
  geo.computeVertexNormals();
  bowl.add(mesh(geo, M.ceramicWhite));
  rboxOn(g, M.ceramicWhite, [0.37, 0.02, 0.5], [0, 0.43, 0.3], 0.01, 3);
  box(g, M.bronze, [0.24, 0.16, 0.012], [0, 1.05, 0.006]);
  box(g, M.bronzeDark, [0.1, 0.13, 0.004], [-0.055, 1.05, 0.014]);
  box(g, M.bronzeDark, [0.1, 0.13, 0.004], [0.055, 1.05, 0.014]);
  return g;
}

/** Built-in bathtub with limestone surround, bronze wall mixer, fixed glass screen + rain head. */
export function bathtub(M, { L = 1.8, w = 0.8, h = 0.56, screen = 0.8 } = {}) {
  const g = new THREE.Group();
  const inner = roundedRect(L - 0.16, w - 0.18, 0.2);
  extrudeShape(g, M.limestone, shapeWithHole(rect(L, w), inner), h, 0);
  extrudeShape(g, M.ceramicWhite, shapeWithHole(roundedRect(L - 0.14, w - 0.16, 0.21), inner), 0.41, h - 0.42);
  const bottom = new THREE.Shape(inner.map(([x, z]) => new THREE.Vector2(x, -z)));
  extrudeShape(g, M.ceramicWhite, bottom, 0.02, h - 0.42);
  // water (subtle) – omitted for clarity. Mixer on the wall side (−z)
  const tap = wallTap(M, { reach: 0.2, y: h + 0.2 }); tap.position.set(-L / 2 + 0.35, 0, -w / 2); g.add(tap);
  // fixed shower screen along the long edge near the head end
  const gl = box(g, M.glass, [screen, 1.4, 0.01], [-L / 2 + screen / 2 + 0.02, h + 0.72, w / 2 - 0.05]);
  gl.userData.keep = true; gl.castShadow = false;
  box(g, M.blackMetal, [screen, 0.02, 0.02], [-L / 2 + screen / 2 + 0.02, h + 1.43, w / 2 - 0.05]);
  // rain shower head + arm
  tube(g, M.bronze, [[-L / 2 + 0.3, 2.15, -w / 2 - 0.005], [-L / 2 + 0.3, 2.2, -w / 2 + 0.15], [-L / 2 + 0.3, 2.2, -w / 2 + 0.3]], 0.011, 16);
  cyl(g, M.bronze, 0.13, 0.13, 0.012, [-L / 2 + 0.3, 2.185, -w / 2 + 0.3], 48);
  // hand shower on bar
  box(g, M.bronze, [0.018, 0.8, 0.018], [-L / 2 + 0.6, h + 0.8, -w / 2 + 0.02]);
  return g;
}

/** Walk-in shower tray area with linear drain, glass panel, rain shower and lit niche. */
export function walkInShower(M, { w = 1.05, d = 0.8, glassW = 0.8 } = {}) {
  const g = new THREE.Group();
  box(g, M.bronzeDark, [w - 0.1, 0.004, 0.05], [0, 0.002, -d / 2 + 0.06]);
  const gl = box(g, M.glass, [glassW, 2.0, 0.01], [-w / 2 + glassW / 2, 1.0, d / 2]);
  gl.userData.keep = true; gl.castShadow = false;
  box(g, M.blackMetal, [glassW, 0.02, 0.025], [-w / 2 + glassW / 2, 0.01, d / 2]);
  tube(g, M.blackMetal, [[-w / 2 + glassW - 0.01, 2.0, d / 2], [-w / 2 + glassW - 0.01, 2.35, d / 2], [-w / 2 + glassW - 0.01, 2.56, d / 2]], 0.008, 4);
  tube(g, M.bronze, [[0, 2.2, -d / 2], [0, 2.25, -d / 2 + 0.2], [0, 2.25, -d / 2 + 0.35]], 0.011, 16);
  cyl(g, M.bronze, 0.12, 0.12, 0.012, [0, 2.235, -d / 2 + 0.35], 48);
  const mix = cyl(g, M.bronze, 0.03, 0.03, 0.03, [0.25, 1.05, -d / 2 + 0.015], 32); mix.rotation.x = Math.PI / 2;
  box(g, M.bronze, [0.018, 0.9, 0.018], [0.4, 1.3, -d / 2 + 0.02]);
  // lit wall niche
  box(g, M.limestone, [0.6, 0.3, 0.02], [0, 1.3, -d / 2 + 0.01]);
  const led = box(g, M.ledStrip, [0.56, 0.005, 0.01], [0, 1.44, -d / 2 + 0.03]); led.castShadow = false;
  return g;
}

/** Ladder towel radiator (bronze) with folded towels. */
export function towelRadiator(M, { w = 0.5, h = 1.2, y0 = 0.25 } = {}) {
  const g = new THREE.Group();
  box(g, M.bronzeDark, [0.025, h, 0.025], [-w / 2, y0 + h / 2, 0.05]);
  box(g, M.bronzeDark, [0.025, h, 0.025], [w / 2, y0 + h / 2, 0.05]);
  for (let i = 0; i < 8; i++) box(g, M.bronzeDark, [w, 0.018, 0.018], [0, y0 + 0.05 + i * (h - 0.1) / 7, 0.05]);
  rbox(g, M.towel, [w - 0.06, 0.4, 0.05], [0, y0 + h - 0.25, 0.08], 0.02, 3);
  rbox(g, M.towelTaupe, [w - 0.1, 0.3, 0.05], [0, y0 + h * 0.45, 0.085], 0.02, 3);
  return g;
}

/** Tall cabinet hiding washer + dryer (stacked). */
export function laundryTower(M, { w = 0.72, d = 0.62, h = 2.1 } = {}) {
  const g = new THREE.Group();
  boxOn(g, M.smokedOak, [w, h, d], [0, 0, 0]);
  box(g, M.matteBlack, [w - 0.01, 0.004, 0.004], [0, h * 0.5, d / 2 + 0.001]);
  box(g, M.bronze, [0.014, 0.5, 0.02], [w / 2 - 0.06, h * 0.5 + 0.35, d / 2 + 0.012]);
  box(g, M.bronze, [0.014, 0.5, 0.02], [w / 2 - 0.06, h * 0.5 - 0.35, d / 2 + 0.012]);
  return g;
}

/** Bath accessories: soap pump, diffuser, candle. */
export function bathProps(M) {
  const g = new THREE.Group();
  lathe(g, M.stonewareCharcoal, [[0, 0], [0.035, 0], [0.036, 0.14], [0.012, 0.16], [0.008, 0.19]], [0, 0, 0], 24);
  lathe(g, M.stonewareSand, [[0, 0], [0.04, 0], [0.042, 0.1], [0.01, 0.12], [0.008, 0.13]], [0.12, 0, 0.02], 24);
  for (let i = 0; i < 5; i++) { const s = cyl(g, M.bronzeDark, 0.002, 0.002, 0.25, [0.12, 0.1, 0.02], 4); s.rotation.set(Math.sin(i * 2.1) * 0.2, 0, Math.cos(i * 1.7) * 0.2); }
  sphere(g, M.stonewareSand, 0.001, [0, 0, 0], 4);
  return g;
}
