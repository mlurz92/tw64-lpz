// Lazily loaded photoreal engine (vendor/pathtracer.js): three.js WebGL renderer, GPU path tracer
// (three-gpu-pathtracer + three-mesh-bvh) and the Open Image Denoise U-Net on WebGPU (oidn-web).
// 'three' resolves to the WebGL build here; it shares the three.core chunk with the WebGPU build,
// so geometries, materials and textures of the app are the very same classes.
export { WebGLRenderer, WebGLRenderTarget } from 'three';
export { WebGLPathTracer, PhysicalCamera } from 'three-gpu-pathtracer';
export { GenerateMeshBVHWorker } from 'three-mesh-bvh/src/workers/GenerateMeshBVHWorker.js';
export { initUNetFromURL } from 'oidn-web';
