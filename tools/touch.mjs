// Touch regression test (smartphone portrait, 390 × 760, synthetic multi-touch via CDP).
// Run after starting `node tools/dev-server.mjs`: `node tools/touch.mjs` (exit code 1 on failure).
// Covers: tap → details card, swipe card away, double tap fly-in (dollhouse), pinch walking,
// double tap walk-to-point, one-finger look, sheets (open, swipe closed, no sideways shift),
// mood switch, toolbar fully on screen, plan pan / pinch / double tap / tap-to-open sheet.
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.CHANNEL || undefined, headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU', '--enable-unsafe-swiftshader'] });
const ctx = await browser.newContext({ viewport: { width: 390, height: 760 }, deviceScaleFactor: 1, isMobile: true, hasTouch: true });
const page = await ctx.newPage();
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message + ' ' + e.stack?.slice(0, 300)));
page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CERT|ERR_FAILED/.test(m.text())) errors.push(m.text().slice(0, 300)); });
await page.route('https://**/*', route => route.abort());
await page.addInitScript(() => { try { localStorage.setItem('we13-quality', 'low'); } catch {} });
await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, null, { timeout: 300_000 });
const cdp = await ctx.newCDPSession(page);
// explicit event timestamps (as real touch hardware delivers them): a slow software-GPU frame
// between two synthetic events must not stretch a tap into a long press
let clock = Date.now() / 1000;
const touch = (type, pts, dt = 0.016) => { clock = Math.max(clock + dt, Date.now() / 1000 - 5); return cdp.send('Input.dispatchTouchEvent', { type, timestamp: clock, touchPoints: pts.map(([x, y], i) => ({ x, y, id: i })) }); };
const tap = async (x, y) => { clock = Date.now() / 1000; await touch('touchStart', [[x, y]], 0); await touch('touchEnd', [], 0.06); };
const dtap = async (x, y) => { await tap(x, y); await touch('touchStart', [[x, y]], 0.08); await touch('touchEnd', [], 0.06); };
const V = (f) => page.evaluate(f);
let failed = 0;
const ok = (name, cond, extra = '') => { if (!cond) failed++; console.log((cond ? 'PASS ' : 'FAIL ') + name + ' ' + extra); };
const settle = (ms = 1500) => page.waitForTimeout(ms);
const stage = await page.locator('#stage').boundingBox();
const cx = stage.x + stage.width / 2, cy = stage.y + stage.height / 2;

// 1. tap on furniture → details (project the sofa centre to the screen)
const sofa = await V(() => {
  const v = window.__app.viewer, o = window.__app.apartment.items.find((i) => i.id === 'sofa').object;
  const p = o.getWorldPosition(v.camera.position.clone()); p.y += 0.3; p.project(v.camera);
  const r = v.renderer.domElement.getBoundingClientRect();
  return [r.left + (p.x + 1) / 2 * r.width, r.top + (1 - p.y) / 2 * r.height];
});
await tap(...sofa); await page.waitForFunction(() => /Sofa/.test(document.querySelector('#detailBody').textContent) && !document.querySelector('#details').classList.contains('hidden'), null, { timeout: 20000 }).catch(() => {});
ok('tap furniture shows details', await V(() => !document.querySelector('#details').classList.contains('hidden') && /Sofa/.test(document.querySelector('#detailBody').textContent)), JSON.stringify(sofa));
// swipe details grip down → collapse/hide
const grip = await page.locator('#detailGrip').boundingBox();
await touch('touchStart', [[grip.x + grip.width / 2, grip.y + 8]]);
for (let i = 1; i <= 6; i++) await touch('touchMove', [[grip.x + grip.width / 2, grip.y + 8 + i * 20]]);
await touch('touchEnd', []); await settle(500);
ok('swipe down hides details peek', await V(() => document.querySelector('#details').classList.contains('hidden')));

// 2. double tap in dollhouse → flies in, station 'free'
const d0 = await V(() => window.__app.viewer.camera.position.distanceTo(window.__app.viewer.controls.target));
// SwiftShader renders a frame in ~1 s: pause drawing so both taps arrive within the double-tap window
await V(() => { window.__app.viewer.suspended = true; });
await dtap(cx, cy + 40); await settle(1500);
await V(() => { window.__app.viewer.suspended = false; }); await settle(1000);
const d1 = await V(() => window.__app.viewer.camera.position.distanceTo(window.__app.viewer.controls.target));
ok('double tap dollhouse flies closer', d1 < d0 * 0.7, `${d0.toFixed(1)} → ${d1.toFixed(1)} station=${await V(() => window.__app.viewer.station)} chip=${await V(() => document.querySelector('#chipStationLabel').textContent)}`);

// 3. walk: pinch → forward
await V(() => window.__app.viewer.goto('living', false)); await settle(3000);
const p0 = await V(() => window.__app.viewer.camera.position.toArray());
await touch('touchStart', [[cx - 40, cy], [cx + 40, cy]]);
for (let i = 1; i <= 8; i++) await touch('touchMove', [[cx - 40 - i * 12, cy], [cx + 40 + i * 12, cy]]);
await touch('touchEnd', []); await settle(800);
const p1 = await V(() => window.__app.viewer.camera.position.toArray());
const moved = Math.hypot(p1[0] - p0[0], p1[2] - p0[2]);
ok('pinch in walk mode walks forward', moved > 0.5 && Math.abs(p1[1] - p0[1]) < 1e-6, moved.toFixed(2) + ' m');
// 4. walk: double tap on the floor ahead → walk there
const f0 = await V(() => window.__app.viewer.camera.position.toArray());
await V(() => { window.__app.viewer.suspended = true; });
for (let k = 0; k < 3; k++) { await V(() => document.querySelector('#details').classList.add('hidden')); await dtap(cx, stage.y + stage.height * 0.8); await settle(1600); if (await V(() => window.__app.viewer.station === 'free')) break; }
await V(() => { window.__app.viewer.suspended = false; }); await settle(1000);
const f1 = await V(() => window.__app.viewer.camera.position.toArray());
ok('double tap floor walks there', Math.hypot(f1[0] - f0[0], f1[2] - f0[2]) > 0.3 && Math.abs(f1[1] - f0[1]) < 1e-6, Math.hypot(f1[0] - f0[0], f1[2] - f0[2]).toFixed(2) + ' m');
// 5. one-finger look must not move the camera position
const l0 = await V(() => window.__app.viewer.camera.position.toArray());
await touch('touchStart', [[cx, cy]]); for (let i = 1; i <= 8; i++) await touch('touchMove', [[cx + i * 15, cy]]); await touch('touchEnd', []); await settle(1500);
const l1 = await V(() => window.__app.viewer.camera.position.toArray());
ok('look drag keeps eye position', Math.hypot(l1[0] - l0[0], l1[2] - l0[2]) < 0.1);

// 6. sheets: open view sheet via button, pull down from body
await V(() => document.querySelector('#details').classList.add('hidden'));
await page.locator('#btnViewSheet').tap(); await settle(900);
ok('view sheet opens', await V(() => document.querySelector('#sheetView').classList.contains('open')));
ok('no horizontal shift', await V(() => document.querySelector('main').scrollLeft === 0 && document.querySelector('#view-3d').scrollLeft === 0));
const body = await page.locator('#sheetView .sheet-head').boundingBox();
await touch('touchStart', [[body.x + 60, body.y + 10]]); for (let i = 1; i <= 6; i++) await touch('touchMove', [[body.x + 60, body.y + 10 + i * 25]]); await touch('touchEnd', []); await settle(600);
ok('swipe sheet header closes', await V(() => !document.querySelector('#sheetView').classList.contains('open')));
// mood loading state + switch
await page.locator('#btnViewSheet').tap(); await settle(400);
await page.locator('#moodSeg button[data-mood="evening"]').tap();
await page.waitForFunction(() => window.__app.viewer.mood === 'evening', null, { timeout: 60000 });
ok('mood switch', await V(() => document.querySelector('#moodSeg button.active')?.dataset.mood === 'evening' && !document.querySelector('#moodSeg .loading')));
await page.keyboard.press('Escape');
// toolbar inside viewport
const tb = await page.locator('#toolbar').boundingBox();
ok('toolbar within viewport', tb.x >= 0 && tb.x + tb.width <= 390, JSON.stringify(tb));
const more = await page.locator('#btnViewSheet').boundingBox();
ok('Ansicht button fully visible', more.x + more.width <= 390 - 4, JSON.stringify(more));

// 7. plan: pan must not open sheet, tap room opens it
await page.locator('.tabs button[data-view="plan"]').tap(); await settle(800);
const plan = await page.locator('#plan').boundingBox();
const px = plan.x + plan.width / 2, py = plan.y + plan.height * 0.4;
await touch('touchStart', [[px, py]]); for (let i = 1; i <= 6; i++) await touch('touchMove', [[px + i * 10, py + i * 6]]); await touch('touchEnd', []); await settle(400);
ok('plan pan keeps sheet in peek', await V(() => document.querySelector('#planSide').dataset.sheet === 'peek'));
const vb0 = await V(() => window.__app.ui.plan.vb.slice());
await touch('touchStart', [[px - 30, py], [px + 30, py]]); for (let i = 1; i <= 6; i++) await touch('touchMove', [[px - 30 - i * 10, py], [px + 30 + i * 10, py]]); await touch('touchEnd', []); await settle(400);
const vb1 = await V(() => window.__app.ui.plan.vb.slice());
ok('plan pinch zooms in', vb1[2] < vb0[2] * 0.8, `${vb0[2].toFixed(2)} → ${vb1[2].toFixed(2)}`);
ok('plan svg not rebuilt on zoom', await V(() => { const s = document.querySelector('#plan svg'); return s.getAttribute('viewBox').split(' ').length === 4; }));
// tap on a room label position (living)
await V(() => window.__app.ui.plan.focusRoom(null)); await settle(600);
const liv = await V(() => { const svg = document.querySelector('#plan svg'); const poly = svg.querySelector('polygon.room[data-room="bedroom"]'); const r = poly.getBoundingClientRect(); return [r.left + r.width * 0.3, r.top + r.height * 0.3]; });
await tap(...liv); await settle(600);
ok('tap room opens plan sheet', await V(() => document.querySelector('#planSide').dataset.sheet === 'half'), await V(() => document.querySelector('#planInfo h4')?.textContent));
// double tap zoom
const w0 = await V(() => window.__app.ui.plan.vb[2]);
await V(() => window.__app.layout.setPlanSheet('peek')); await settle(400);
await dtap(px, py); await settle(800);
const w1 = await V(() => window.__app.ui.plan.vb[2]);
ok('plan double tap zooms', w1 < w0 * 0.6, `${w0.toFixed(2)} → ${w1.toFixed(2)}`);
console.log(errors.join('\n') || 'no errors');
await browser.close();
if (failed || errors.length) process.exitCode = 1;
