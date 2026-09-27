// Builds ../vendor/ from npm packages: `cd tools && npm install && node build-vendor.mjs`
//   three.webgpu.min.js  – three.js core + WebGPURenderer (WebGL 2 fallback built in)
//   three.tsl.min.js     – Three Shading Language (node functions)
//   three-addons.js      – controls, loaders, geometry utils, TSL post-processing nodes
import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
const toolsDir = fileURLToPath(new URL('./', import.meta.url));
const out = fileURLToPath(new URL('../vendor/', import.meta.url));
mkdirSync(out, { recursive: true });
cpSync(join(toolsDir, 'node_modules/three/LICENSE'), join(out, 'LICENSE.three.txt'));
const common = { absWorkingDir: toolsDir, bundle: true, format: 'esm', minify: true, target: 'es2022', legalComments: 'eof' };
const external = (names) => ({ name: 'external', setup(b) { b.onResolve({ filter: new RegExp(`^(${names.join('|')})$`) }, (a) => ({ path: a.path, external: true })); } });
await build({ ...common, entryPoints: ['node_modules/three/build/three.webgpu.js'], outfile: join(out, 'three.webgpu.min.js') });
await build({ ...common, entryPoints: ['node_modules/three/build/three.tsl.js'], outfile: join(out, 'three.tsl.min.js'), plugins: [external(['three/webgpu'])] });
await build({ ...common, entryPoints: ['vendor-entry.js'], outfile: join(out, 'three-addons.js'), plugins: [external(['three', 'three/webgpu', 'three/tsl'])] });
console.log('vendor built →', out);
