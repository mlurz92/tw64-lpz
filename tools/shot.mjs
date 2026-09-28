// Screenshot helper: node tools/shot.mjs <outdir> [style] [mode] [stations...]
// env: WEBGPU=1 (try WebGPU), Q=high|medium|low, PT=<samples> (photo mode budget), MOOD=day|golden|evening
import { chromium } from 'playwright';
import fs from 'node:fs';
const [out = '.', style = 'metallic', render = 'standard', ...stations] = process.argv.slice(2);
const gpu = process.env.WEBGPU === '1';
const browser = await chromium.launch({ headless: true, channel: process.env.CH || undefined,
  args: gpu ? ['--enable-unsafe-webgpu', '--enable-features=Vulkan', '--use-vulkan=swiftshader', '--use-webgpu-adapter=swiftshader', '--ignore-gpu-blocklist']
            : ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader', '--ignore-gpu-blocklist', '--disable-features=WebGPU'] });
const page = await browser.newPage({ viewport: { width: +(process.env.W || 1280), height: +(process.env.H || 800) } });
const logs = [];
page.on('pageerror', (e) => logs.push('PAGEERROR ' + e.message + '\n' + e.stack?.slice(0, 600)));
page.on('console', (m) => { if (['error', 'warning'].includes(m.type()) && !/GL Driver|GroupMarker|WebGPU|ERR_CERT/.test(m.text())) logs.push(m.type() + ' ' + m.text().slice(0, 400)); });
if (process.env.Q) await page.addInitScript((q) => localStorage.setItem('we13-quality', q), process.env.Q);
const t0 = Date.now();
await page.goto(`http://127.0.0.1:8000/#stil=${style}`, { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
console.log('loaded', (Date.now() - t0) / 1000, await page.evaluate(() => [window.__app.viewer.backend, window.__app.viewer.quality]));
if (process.env.PT) await page.evaluate((n) => { window.__app.viewer.photoOverride = { samples: n }; }, +process.env.PT);
if (process.env.MOOD) await page.evaluate((m) => window.__app.viewer.applyMood(m), process.env.MOOD);
if (render !== 'standard') await page.evaluate((r) => window.__app.viewer.setRenderMode(r), render);
for (const st of stations.length ? stations : ['overview', 'living', 'sofa', 'dining', 'bedroom', 'office', 'bath']) {
  const t = Date.now();
  await page.evaluate((s) => window.__app.viewer.goto(s, false), st);
  const url = await page.evaluate(() => window.__app.viewer.screenshot());
  fs.writeFileSync(`${out}/${style}-${render}-${st}.png`, Buffer.from(url.split(',')[1], 'base64'));
  console.log(st, (Date.now() - t) / 1000, render === 'photo' ? await page.evaluate(() => window.__app.viewer.photo?.status()) : '');
}
console.log(logs.slice(0, 30).join('\n'));
await browser.close();
