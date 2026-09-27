import { chromium } from 'playwright';
import fs from 'node:fs';
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
const page = await browser.newPage({ viewport: { width: 700, height: 500 } });
await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
const S = process.argv[2];
for (const p of ['refinedLow', 'still']) {
  const url = await page.evaluate(async (p) => {
    const v = window.__app.viewer; v.goto('bath', false); await v.settle();
    if (p === 'still') { for (const m of v.mirrors) if (m.userData.mirrorMats) m.material = m.userData.mirrorMats.still; }
    v.rig.update(v.mode, v.camera.position); v.pipelines.refinedLow.render();
    return v.renderer.domElement.toDataURL('image/png');
  }, p);
  fs.writeFileSync(`${S}/mirror-${p}.png`, Buffer.from(url.split(',')[1], 'base64'));
}
await browser.close();
