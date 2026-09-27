// UI flow check: all styles validate, photo mode start/stop, mood and style switch without errors.
import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
// desktop layout (> 1180 px): light, render mode and stations sit in the toolbar and side panel
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
// path tracing on a software GPU makes animation frames slow; actionability checks wait for them
page.setDefaultTimeout(240_000);
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message + ' ' + (e.stack ?? '').slice(0, 400)));
page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CERT|WebGPU/.test(m.text())) errors.push(m.text().slice(0, 300)); });
await page.goto('http://127.0.0.1:8000/');
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
for (const id of ['metallic', 'soft', 'brutal', 'quiet']) {
  await page.evaluate((s) => window.__app.setVariant(s), id);
  await page.waitForFunction((s) => window.__app.apartment.style.id === s && !window.__app.viewer.suspended, id, { timeout: 120_000 });
  const audit = await page.evaluate(() => window.__app.validate());
  console.log(id, audit.issues.length, 'issues', audit.issues.map((i) => i.msg).join(' | ').slice(0, 500));
}
await page.evaluate(() => { window.__app.viewer.photoOverride = { samples: 3 }; });
await page.getByRole('button', { name: 'Fotorealistisch' }).click();
await page.getByRole('button', { name: 'Küche' }).click();
await page.waitForFunction(() => window.__app.viewer.photo?.samples >= 1, null, { timeout: 600_000 });
console.log('photo started', await page.evaluate(() => window.__app.viewer.photo.status()));
await page.getByRole('button', { name: 'Abend' }).click();
await page.waitForTimeout(500);
console.log('after mood', await page.evaluate(() => window.__app.viewer.photo.status()));
await page.getByRole('button', { name: 'Übersicht (Dollhouse)' }).click();
await page.waitForFunction(() => window.__app.viewer.photo?.samples >= 1 && window.__app.viewer.mode === 'orbit', null, { timeout: 600_000 });
console.log('dollhouse photo', await page.evaluate(() => window.__app.viewer.photo.status()), await page.locator('#photoStatus').textContent());
await page.getByRole('button', { name: 'Standard' }).click();
console.log('back to standard', await page.evaluate(() => [window.__app.viewer.renderMode, window.__app.viewer.photo.active]));
console.log(errors.join('\n') || 'no errors');
await browser.close();
