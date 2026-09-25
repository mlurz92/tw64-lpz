// Re-exports all engine add-ons used by the app. 'three', 'three/webgpu' and 'three/tsl' stay
// external so that the app and all add-ons share exactly one THREE instance (see build-vendor.mjs).
export { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
export { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
export { RectAreaLightTexturesLib } from 'three/examples/jsm/lights/RectAreaLightTexturesLib.js';
// TSL post-processing (render pipeline of the WebGPU renderer)
export { ao } from 'three/examples/jsm/tsl/display/GTAONode.js';
export { ssao } from 'three/examples/jsm/tsl/display/SSAONode.js';
export { ssgi } from 'three/examples/jsm/tsl/display/SSGINode.js';
export { ssr } from 'three/examples/jsm/tsl/display/SSRNode.js';
export { traa } from 'three/examples/jsm/tsl/display/TRAANode.js';
export { smaa } from 'three/examples/jsm/tsl/display/SMAANode.js';
export { bloom } from 'three/examples/jsm/tsl/display/BloomNode.js';
