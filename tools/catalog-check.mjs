import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.CHANNEL ?? 'chrome', headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });
  await page.route('https://**/*', route => route.abort());
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__app?.apartment && !window.__app.viewer.suspended, null, { timeout: 300000 });
  const result = await page.evaluate(async () => {
    const { ApartmentScene } = await import('/src/engine/scene.js');
    const { validateLayout } = await import('/src/core/validate.js');
    const { STYLES } = await import('/src/data/styles.js');
    const a = window.__app.apartment;
    return Object.keys(STYLES).map(style => {
      const scene = new ApartmentScene(a.baseM, a.lib, style).build();
      const furniture = scene.items.filter(i => ['Möbel', 'Polster', 'Bett', 'Tisch', 'Outdoor'].includes(i.cat));
      const missing = furniture.filter(i => !i.products?.length).map(i => i.id);
      const invalid = furniture.flatMap(i => (i.products ?? []).filter(p => !['IKEA', 'Westwing', 'Höffner'].includes(p.retailer) || !p.url.startsWith('https://') || p.size.some(n => !(n > 0))).map(p => `${i.id}: ${p.name}`));
      const issues = validateLayout(scene.items).issues;
      return { style, furniture: furniture.length, missing, invalid, issues };
    });
  });
  console.log(JSON.stringify(result, null, 2));
  if (result.some(r => r.missing.length || r.invalid.length || r.issues.length)) process.exitCode = 1;
} finally { await browser.close(); }
