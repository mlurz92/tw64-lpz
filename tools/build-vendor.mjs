// Builds ../vendor/ from npm packages: `cd tools && npm install && node build-vendor.mjs`
//   three.webgpu.min.js  – three.js WebGPURenderer (WebGL 2 fallback built in)
//   three.tsl.min.js     – Three Shading Language (node functions)
//   three-addons.js      – controls, loaders, geometry utils, TSL post-processing nodes
//   pathtracer.js        – photoreal engine, loaded on demand: WebGLRenderer, three-gpu-pathtracer,
//                          three-mesh-bvh, oidn-web (AI denoiser)
//   generateMeshBVH.worker.js – BVH construction off the main thread
//   three-core-*.js      – shared three.js core: the WebGPU and the WebGL build use one instance
import { build } from 'esbuild';
import { cpSync, mkdirSync, readFileSync, writeFileSync, readdirSync, rmSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const toolsDir = fileURLToPath(new URL('./', import.meta.url));
const out = fileURLToPath(new URL('../vendor/', import.meta.url));
mkdirSync(out, { recursive: true });
for (const f of readdirSync(out)) if (/^(three-core|chunk)-.*\.js$/.test(f)) rmSync(join(out, f));
cpSync(join(toolsDir, 'node_modules/three/LICENSE'), join(out, 'LICENSE.three.txt'));
cpSync(join(toolsDir, 'node_modules/three-gpu-pathtracer/LICENSE'), join(out, 'LICENSE.three-gpu-pathtracer.txt'));
cpSync(join(toolsDir, 'node_modules/three-mesh-bvh/LICENSE'), join(out, 'LICENSE.three-mesh-bvh.txt'));
cpSync(join(toolsDir, 'node_modules/oidn-web/LICENSE'), join(out, 'LICENSE.oidn-web.txt'));
const common = { absWorkingDir: toolsDir, bundle: true, format: 'esm', minify: true, target: 'es2022', legalComments: 'eof' };
const external = (names) => ({ name: 'external', setup(b) { b.onResolve({ filter: new RegExp(`^(${names.join('|')})$`) }, (a) => ({ path: a.path, external: true })); } });
const threeDir = join(toolsDir, 'node_modules/three');
// bare 'three' → the WebGL build (which itself imports the shared three.core.js)
const threeWebGL = { name: 'three-webgl', setup(b) { b.onResolve({ filter: /^three$/ }, () => ({ path: join(threeDir, 'build/three.module.js') })); } };
// One code-split build: the WebGPU renderer (app) and the photoreal engine share the core chunk.
await build({
  ...common, splitting: true, outdir: out, chunkNames: 'three-core-[hash]',
  entryPoints: { 'three.webgpu.min': 'node_modules/three/build/three.webgpu.js', pathtracer: 'pathtracer-entry.js' },
  plugins: [threeWebGL],
});
await build({ ...common, entryPoints: ['node_modules/three/build/three.tsl.js'], outfile: join(out, 'three.tsl.min.js'), plugins: [external(['three/webgpu'])] });
await build({ ...common, entryPoints: ['vendor-entry.js'], outfile: join(out, 'three-addons.js'), plugins: [external(['three', 'three/webgpu', 'three/tsl'])] });
// Worker: self-contained (own three instance, only math and buffers cross the boundary).
await build({ ...common, entryPoints: ['node_modules/three-mesh-bvh/src/workers/generateMeshBVH.worker.js'], outfile: join(out, 'generateMeshBVH.worker.js'), plugins: [threeWebGL] });
// Compatibility patch: r186 always sends `swizzle: 'rgba'` in texture-view descriptors. Chrome
// builds that implement the older dictionary form of GPUTextureComponentSwizzle reject the string
// (TypeError in createView → the PMREM/probe capture aborts). The default swizzle is identity,
// so the member is simply omitted.
const core = join(out, 'three.webgpu.min.js');
writeFileSync(core, readFileSync(core, 'utf8').replaceAll('this.swizzle="rgba"', 'this.swizzle=void 0'));
console.log('vendor built →', out);
