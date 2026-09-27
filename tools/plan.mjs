import { chromium } from 'playwright';
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } });
await page.goto(`http://127.0.0.1:8000/#stil=${process.argv[3] || 'metallic'}`);
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
await page.click('button[data-view="plan"]');
await page.waitForTimeout(1500);
await page.locator('#plan').screenshot({ path: process.argv[2] });
await browser.close();
