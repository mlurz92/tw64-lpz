// Bakes the procedural textures (marble, stone, wood floors, limewash, wool …) to WebP files in
// assets/lib/textures/baked/ plus manifest.json. The app loads them instead of generating them
// on the main thread at startup (≈ 5–8 s CPU saved); without the files it falls back to the
// generators. Re-run after changing a generator or its parameters in src/engine/materials.js:
//   cd tools && npm install && npx playwright install chromium && node bake-textures.mjs
import http from 'node:http';
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { chromium } from 'playwright';

const root = new URL('..', import.meta.url).pathname;
const outDir = join(root, 'assets/lib/textures/baked');
const types = { '.html': 'text/html', '.js': 'text/javascript', '.json': 'application/json', '.jpg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp', '.hdr': 'application/octet-stream' };

const server = http.createServer(async (req, res) => {
  const path = normalize(decodeURIComponent(req.url.split('?')[0])).replace(/^(\.\.[/\\])+/, '');
  try { const body = await readFile(join(root, path)); res.writeHead(200, { 'content-type': types[extname(path)] ?? 'application/octet-stream' }); res.end(body); }
  catch { res.writeHead(404); res.end(); }
});
await new Promise((r) => server.listen(0, r));
const port = server.address().port;

const browser = await chromium.launch({ executablePath: process.env.CHROMIUM_PATH || undefined });
const page = await browser.newPage();
page.on('pageerror', (e) => console.error(e));
await page.goto(`http://localhost:${port}/tools/bake.html`);
await page.waitForFunction(() => window.__baked, null, { timeout: 600000 });
const baked = await page.evaluate(() => window.__baked);
await browser.close(); server.close();

await rm(outDir, { recursive: true, force: true });
await mkdir(outDir, { recursive: true });
const manifest = {};
let bytes = 0;
for (const [key, { maps, extra }] of Object.entries(baked)) {
  manifest[key] = { maps: {}, extra };
  for (const [slot, m] of Object.entries(maps)) {
    const file = `${key}_${slot}.webp`, buf = Buffer.from(m.data.split(',')[1], 'base64');
    await writeFile(join(outDir, file), buf); bytes += buf.length;
    manifest[key].maps[slot] = { file, srgb: m.srgb, size: m.size };
  }
}
await writeFile(join(outDir, 'manifest.json'), JSON.stringify(manifest, null, 1));
console.log(`baked ${Object.keys(manifest).length} texture sets, ${(bytes / 1048576).toFixed(1)} MB →`, outDir);
