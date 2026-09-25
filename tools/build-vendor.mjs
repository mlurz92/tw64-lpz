// Builds ../vendor/ from npm packages: `cd tools && npm install && node build-vendor.mjs`
import { build } from 'esbuild';
import { cpSync, mkdirSync } from 'node:fs';
const out = new URL('../vendor/', import.meta.url).pathname;
mkdirSync(out, { recursive: true });
for (const f of ['three.module.min.js', 'three.core.min.js']) cpSync(`node_modules/three/build/${f}`, out + f);
cpSync('node_modules/three/LICENSE', out + 'LICENSE.three.txt');
cpSync('node_modules/three-gpu-pathtracer/LICENSE', out + 'LICENSE.three-gpu-pathtracer.txt');
cpSync('node_modules/three-mesh-bvh/LICENSE', out + 'LICENSE.three-mesh-bvh.txt');
await build({
  entryPoints: ['vendor-entry.js'], bundle: true, format: 'esm', minify: true, target: 'es2022',
  outfile: out + 'three-addons.js', legalComments: 'eof',
  // Only the bare 'three' specifier stays external; add-on files are bundled.
  plugins: [{ name: 'three-external', setup(b) { b.onResolve({ filter: /^three$/ }, () => ({ path: 'three', external: true })); } }],
});
console.log('vendor built →', out);
