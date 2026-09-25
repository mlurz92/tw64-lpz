// Metric UV generation: every face gets a planar projection of its (object-space) position in
// metres divided by the material's physical texture size. Wood grain follows the longest axis.
import * as THREE from 'three';

/**
 * @param {THREE.BufferGeometry} geo  non-indexed or indexed geometry with normals
 * @param {number} size               texture tile size in metres
 * @param {'u'|'v'|null} grain        texture axis carrying the wood grain (null = isotropic)
 */
export function metricUV(geo, size = 1, grain = null) {
  if (geo.index) geo = geo.toNonIndexed();
  if (!geo.attributes.normal) geo.computeVertexNormals();
  geo.computeBoundingBox();
  const bb = geo.boundingBox, ext = new THREE.Vector3().subVectors(bb.max, bb.min);
  const pos = geo.attributes.position, nor = geo.attributes.normal, n = pos.count;
  const uv = new Float32Array(n * 2);
  const a = new THREE.Vector3(), b = new THREE.Vector3(), c = new THREE.Vector3(), fn = new THREE.Vector3();
  for (let i = 0; i < n; i += 3) {
    // face normal (average of vertex normals keeps smooth-shaded curves stable)
    fn.set(0, 0, 0);
    for (let k = 0; k < 3; k++) fn.x += nor.getX(i + k), fn.y += nor.getY(i + k), fn.z += nor.getZ(i + k);
    const ax = Math.abs(fn.x), ay = Math.abs(fn.y), az = Math.abs(fn.z);
    // projection axes (p, q) for this face
    let P, Q;
    if (ay >= ax && ay >= az) { P = 'x'; Q = 'z'; } else if (ax >= az) { P = 'z'; Q = 'y'; } else { P = 'x'; Q = 'y'; }
    let swap = false;
    if (grain) {
      const longP = ext[P] >= ext[Q];
      // grain along texture u → the longer projected axis must map to u
      swap = grain === 'u' ? !longP : longP;
    }
    for (let k = 0; k < 3; k++) {
      const v = [a, b, c][k].fromBufferAttribute(pos, i + k);
      let s = v[P] / size, t = v[Q] / size;
      if (swap) [s, t] = [t, s];
      uv[(i + k) * 2] = s; uv[(i + k) * 2 + 1] = t;
    }
  }
  geo.setAttribute('uv', new THREE.BufferAttribute(uv, 2));
  return geo;
}

/** Applies metricUV to every mesh below root whose material asks for it. */
export function applyMetricUVs(root) {
  root.traverse((o) => {
    if (!o.isMesh || o.userData.keepUV) return;
    const mat = Array.isArray(o.material) ? o.material[0] : o.material;
    const cfg = mat?.userData?.uv;
    if (!cfg) return;
    o.geometry = metricUV(o.geometry, cfg.size, cfg.grain ?? null);
  });
}
