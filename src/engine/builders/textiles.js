// Soft furnishings: curtains with wave folds, rugs, cushions, throws, bedding.
import * as THREE from 'three';
import { box, rbox, mesh, rng, roundedRect, extrudePlan } from './common.js';

/**
 * Gathered curtain panel hanging from `top` to 1 cm above the floor.
 * width = stacked width (gathered); folds = number of waves.
 */
export function curtainPanel(M, { width = 0.4, top = 2.47, folds = 7, depth = 0.07, mat = 'curtain', seed = 1 } = {}) {
  const g = new THREE.Group(), r = rng(seed), h = top - 0.012;
  const seg = folds * 12, geo = new THREE.PlaneGeometry(width, h, seg, 24);
  const pos = geo.attributes.position;
  const phase = r() * Math.PI;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i), y = pos.getY(i), t = (x / width + 0.5) * folds * Math.PI * 2;
    const hem = 1 + (1 - (y / h + 0.5)) * 0.18; // folds flare towards the hem
    const z = Math.sin(t + phase) * depth * 0.5 * hem + Math.sin(t * 0.5 + phase * 2) * depth * 0.12;
    pos.setZ(i, z);
  }
  geo.computeVertexNormals();
  geo.translate(0, h / 2 + 0.012, 0);
  const m = mesh(geo, M[mat]);
  m.userData.keepUV = false;
  g.add(m);
  return g;
}

/** Ceiling track + two gathered curtains framing an opening of `span` metres. */
export function curtainSet(M, span, { stack = 0.42, extra = 0.28, mat = 'curtain', top = 2.5, sheer = false, seed = 3 } = {}) {
  const g = new THREE.Group();
  const total = span + extra * 2;
  box(g, M.blackMetal, [total, 0.02, 0.035], [0, top + 0.02, 0]);
  const left = curtainPanel(M, { width: stack, top, mat, seed });
  left.position.x = -total / 2 + stack / 2 + 0.02;
  const right = curtainPanel(M, { width: stack, top, mat, seed: seed + 7 });
  right.position.x = total / 2 - stack / 2 - 0.02;
  g.add(left, right);
  if (sheer) {
    const s = curtainPanel(M, { width: stack * 0.7, top, mat: 'curtain', seed: seed + 13, depth: 0.05, folds: 5 });
    s.position.set(-total / 2 + stack + 0.12, 0, -0.05);
    g.add(s);
  }
  return g;
}

/** Flat rug with rounded corners and a slightly raised bound edge. */
export function rug(M, w, d, { mat = 'rug', border = 'rugDark', r = 0.04, h = 0.014 } = {}) {
  const g = new THREE.Group();
  if (M[border] === M[mat]) {
    extrudePlan(g, M[mat], roundedRect(w, d, r), h, 0).castShadow = false;
    return g;
  }
  const outer = extrudePlan(g, M[border], roundedRect(w, d, r), h * 0.9, 0);
  outer.castShadow = false;
  const inner = extrudePlan(g, M[mat], roundedRect(w - 0.1, d - 0.1, r), h, 0);
  inner.castShadow = false;
  return g;
}

/** Round rug. */
export function rugRound(M, dia, { mat = 'rug', h = 0.014 } = {}) {
  const g = new THREE.Group();
  const pts = Array.from({ length: 96 }, (_, i) => [Math.cos((i / 96) * Math.PI * 2) * dia / 2, Math.sin((i / 96) * Math.PI * 2) * dia / 2]);
  extrudePlan(g, M[mat], pts, h, 0).castShadow = false;
  return g;
}

/** Soft cushion: puffy rounded box with slight pinch. size = [w, h, t]. */
export function cushion(M, mat, [w, h, t] = [0.5, 0.5, 0.16]) {
  const g = new THREE.Group();
  const geo = new THREE.SphereGeometry(0.5, 48, 32);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    let x = pos.getX(i), y = pos.getY(i), z = pos.getZ(i);
    // squarish silhouette (superellipse) + thinning towards corners
    const sx = Math.sign(x) * Math.pow(Math.abs(x * 2), 0.55) / 2;
    const sy = Math.sign(y) * Math.pow(Math.abs(y * 2), 0.55) / 2;
    const edge = Math.max(Math.abs(sx), Math.abs(sy)) * 2;
    const zz = z * (1 - Math.pow(edge, 3) * 0.75);
    pos.setXYZ(i, sx * w, sy * h, zz * t);
  }
  geo.computeVertexNormals();
  const m = mesh(geo, M[mat]);
  g.add(m);
  return g;
}

/** Draped throw over an edge: bent slab. */
export function throwBlanket(M, mat, w = 0.55, drop = 0.35, run = 0.5, t = 0.02) {
  const g = new THREE.Group();
  const shape = new THREE.Shape();
  shape.moveTo(0, 0); shape.lineTo(run, 0); shape.quadraticCurveTo(run + 0.06, 0, run + 0.06, -0.06); shape.lineTo(run + 0.06, -drop);
  shape.lineTo(run + 0.06 + t, -drop); shape.lineTo(run + 0.06 + t, -0.06); shape.quadraticCurveTo(run + 0.06 + t, t, run, t); shape.lineTo(0, t); shape.closePath();
  const geo = new THREE.ExtrudeGeometry(shape, { depth: w, bevelEnabled: true, bevelSize: 0.006, bevelThickness: 0.006, bevelSegments: 2, curveSegments: 12 });
  geo.translate(0, 0, -w / 2);
  const m = mesh(geo, M[mat]);
  g.add(m);
  return g;
}

/** Folded throw on a surface. */
export function foldedThrow(M, mat, w = 0.5, d = 0.35, h = 0.06) {
  const g = new THREE.Group();
  rbox(g, M[mat], [w, h, d], [0, h / 2, 0], 0.025, 4);
  return g;
}
