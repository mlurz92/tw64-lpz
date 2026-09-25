// Builds ../vendor/ from npm packages: `cd tools && npm install && node build-vendor.mjs`
//   three.webgpu.min.js  – three.js core + WebGPURenderer (WebGL 2 fallback built in)
//   three.tsl.min.js     – Three Shading Language (node functions)
//   three-addons.js      – controls, loaders, geometry utils, TSL post-processing nodes
import { build } from 'esbuild';
import { cpSync, mkdirSync, rmSync } from 'node:fs';
const out = new URL('../vendor/', import.meta.url).pathname;
rmSync(out, { recursive: true, force: true });
mkdirSync(out, { recursive: true });
cpSync('node_modules/three/LICENSE', out + 'LICENSE.three.txt');
const common = { bundle: true, format: 'esm', minify: true, target: 'es2022', legalComments: 'eof' };
const external = (names) => ({ name: 'external', setup(b) { b.onResolve({ filter: new RegExp(`^(${names.join('|')})$`) }, (a) => ({ path: a.path, external: true })); } });
await build({ ...common, entryPoints: ['node_modules/three/build/three.webgpu.js'], outfile: out + 'three.webgpu.min.js' });
await build({ ...common, entryPoints: ['node_modules/three/build/three.tsl.js'], outfile: out + 'three.tsl.min.js', plugins: [external(['three/webgpu'])] });
await build({ ...common, entryPoints: ['vendor-entry.js'], outfile: out + 'three-addons.js', plugins: [external(['three', 'three/webgpu', 'three/tsl'])] });
console.log('vendor built →', out);
