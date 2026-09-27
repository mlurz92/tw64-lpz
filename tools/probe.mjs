// Renders one custom camera: node probe.mjs out.png px py pz tx ty tz fov [style] [render]
import { chromium } from 'playwright';
import fs from 'node:fs';
const [out, px, py, pz, tx, ty, tz, fov = 50, style = 'metallic', render = 'standard'] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
const page = await browser.newPage({ viewport: { width: +(process.env.W || 1000), height: +(process.env.H || 700) } });
if (process.env.Q) await page.addInitScript((q) => localStorage.setItem('we13-quality', q), process.env.Q);
await page.goto(`http://127.0.0.1:8000/#stil=${style}`, { waitUntil: 'domcontentloaded', timeout: 120_000 });
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
if (render !== 'standard') await page.evaluate((r) => window.__app.viewer.setRenderMode(r), render);
if (process.env.TM) await page.evaluate(async (tm) => { const THREE = await import('three'); const v = window.__app.viewer; v.renderer.toneMapping = THREE[tm]; for (const p of ['fast', 'refined', 'refinedLow', 'realistic']) v.pipelines[p].needsUpdate = true; }, process.env.TM);
const url = await page.evaluate(async ([p, t, f, mode]) => {
  const v = window.__app.viewer; v.goto({ id: 'probe', mode, pos: p, target: t, fov: f }, false);
  return v.screenshot();
}, [[+px, +py, +pz], [+tx, +ty, +tz], +fov, process.env.MODE || 'walk']);
fs.writeFileSync(out, Buffer.from(url.split(',')[1], 'base64'));
await browser.close();
