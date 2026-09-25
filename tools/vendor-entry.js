// Re-exports all engine add-ons used by the app. 'three' stays external so that
// the app and all add-ons share exactly one THREE instance (see build-vendor.mjs).
export { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
export { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
export { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
export { HDRLoader } from 'three/examples/jsm/loaders/HDRLoader.js';
export { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
export * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
export { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib.js';
export { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
export { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
export { GTAOPass } from 'three/examples/jsm/postprocessing/GTAOPass.js';
export { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
export { SMAAPass } from 'three/examples/jsm/postprocessing/SMAAPass.js';
export { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
export { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
export { FullScreenQuad } from 'three/examples/jsm/postprocessing/Pass.js';
export { mergeVertices } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
export { WebGLPathTracer, PhysicalCamera, GradientEquirectTexture, BlurredEnvMapGenerator, DenoiseMaterial } from 'three-gpu-pathtracer';
