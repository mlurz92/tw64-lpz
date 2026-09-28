// Time from choosing "Fotorealistisch" (camera at rest) to the first path-traced sample.
//   node tools/perf-photo.mjs           → cold start (prewarm disabled, ?prewarm=0)
//   node tools/perf-photo.mjs --prewarm → the app prepared the path tracer while idle first
// Headless Chrome with SwiftShader (software GPU): absolute times are far slower than on a real
// GPU (e.g. NUC13 Iris Xe); compare the two modes and the per-phase timings.
import { chromium } from 'playwright';
const prewarm = process.argv.includes('--prewarm');
const browser = await chromium.launch({ channel: process.env.CHANNEL || undefined, headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
try {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  page.on('pageerror', e => console.error(e.message));
  await page.route('https://**/*', route => route.abort());
  // SwiftShader is detected as "low"; measure the NUC default preset ("medium").
  await page.addInitScript(() => localStorage.setItem('we13-quality', 'medium'));
  await page.goto(`http://127.0.0.1:8000/?prewarm=${prewarm ? 1 : 0}`, { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__app?.viewer?.apartment && !window.__app.viewer.suspended, null, { timeout: 300000 });
  await page.evaluate(() => window.__app.viewer.goto('living', false));
  await page.waitForFunction(() => !window.__app.viewer.suspended, null, { timeout: 300000 });
  let prewarmMs = null;
  if (prewarm) {
    const t0 = Date.now();
    await page.waitForFunction(() => { const p = window.__app.viewer.photo; return p?.warmKey && p.warmKey === window.__app.viewer.photoSceneKey() && !p.pt?.isCompiling; }, null, { timeout: 900000, polling: 500 });
    prewarmMs = Date.now() - t0;
  }
  await page.evaluate(() => {
    const v = window.__app.viewer;
    v.photoOverride = { samples: 1 };
    window.__photoStart = performance.now();
    v.setRenderMode('photo');
  });
  await page.waitForFunction(() => window.__app.viewer.photo?.samples >= 1 || window.__app.viewer.photo?.state === 'error', null, { timeout: 900000 });
  if (await page.evaluate(() => window.__app.viewer.photo.state === 'error')) throw new Error('Pathtracing fehlgeschlagen; keine gültige Messung');
  const r = await page.evaluate(() => {
    const v = window.__app.viewer; let tris = 0, meshes = 0;
    v.photo.scene.traverse(o => { if (o.isMesh) { meshes++; tris += (o.geometry.index?.count ?? o.geometry.attributes.position.count) / 3; } });
    return { quality: v.quality, firstSampleMs: Math.round(performance.now() - window.__photoStart), meshes, triangles: Math.round(tris), timings: v.photo.status().timings };
  });
  console.log(JSON.stringify({ prewarm, gpu: 'Chrome SwiftShader (Software-GPU)', prewarmMs, ...r }, null, 2));
} finally { await browser.close(); }
