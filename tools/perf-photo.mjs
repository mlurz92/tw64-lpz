import { chromium } from 'playwright';
import { execFileSync } from 'node:child_process';
const baseline = process.argv.includes('--baseline');
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
try {
  const page = await browser.newPage({ viewport: { width: 800, height: 600 } });
  page.on('pageerror', e => console.error(e.message));
  await page.route('https://**/*', route => route.abort());
  if (baseline) for (const file of ['src/engine/viewer.js', 'src/engine/photo.js']) {
    const body = execFileSync('git', ['show', `0ed7b95:${file}`], { encoding: 'utf8', cwd: new URL('..', import.meta.url) });
    await page.route(`**/${file}`, route => route.fulfill({ contentType: 'text/javascript', body }));
  }
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__app?.viewer?.apartment && !window.__app.viewer.suspended, null, { timeout: 300000 });
  await page.evaluate(() => window.__app.viewer.goto('bath', false));
  await page.waitForFunction(() => !window.__app.viewer.suspended, null, { timeout: 300000 });
  await page.evaluate(() => {
    const v = window.__app.viewer;
    v.photoOverride = { samples: 1 };
    window.__photoStart = performance.now();
    v.setRenderMode('photo');
  });
  await page.waitForFunction(() => window.__app.viewer.photo?.samples >= 1 || window.__app.viewer.photo?.state === 'error', null, { timeout: 600000 });
  console.log(JSON.stringify({ baseline, ...await page.evaluate(() => ({ firstSampleMs: Math.round(performance.now() - window.__photoStart), status: window.__app.viewer.photo.status() })) }, null, 2));
} finally { await browser.close(); }
