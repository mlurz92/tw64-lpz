// Run after starting `node tools/dev-server.mjs`: `node tools/smoke.mjs`.
import { chromium } from 'playwright';

const browser = await chromium.launch({ channel: 'chrome', headless: true,
  args: ['--enable-webgl', '--use-gl=angle', '--use-angle=swiftshader'] });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
const errors = [];
const shellOnly = process.argv.includes('--shell-only');
page.on('pageerror', (error) => errors.push(error.message));
page.on('console', (message) => { if (message.type() === 'error') errors.push(message.text()); });
try {
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => !!window.__app, { timeout: 120_000 });
  const shell = await page.evaluate(async () => {
    const THREE = await import('three');
    const { ROOMS, WALLS, OFFSET } = await import('/src/core/geometry.js');
    const { analyseWalls } = await import('/src/engine/builders/architecture.js');
    const apartment = window.__app.apartment;
    const hitWall = (a, b, height) => {
      const dx = b[0] - a[0], dz = b[1] - a[1], length = Math.hypot(dx, dz);
      const nx = -dz / length, nz = dx / length;
      const x = (a[0] + b[0]) / 2, z = (a[1] + b[1]) / 2;
      const ray = new THREE.Raycaster(new THREE.Vector3(x + nx * 0.04 - OFFSET.x, height, z + nz * 0.04 - OFFSET.y),
        new THREE.Vector3(-nx, 0, -nz), 0, 0.5);
      return ray.intersectObject(apartment.architecture, true).some((hit) => hit.object.name.startsWith('walls-'));
    };
    const living = ROOMS.find((room) => room.id === 'living');
    const windowWall = WALLS.find((wall) => wall.id === 'W06');
    const opening = windowWall.openings[0];
    const onWindow = (u) => [windowWall.a[0] + windowWall.dir[0] * u, windowWall.a[1] + windowWall.dir[1] * u];
    const gaps = [];
    const wallInfo = analyseWalls().info;
    for (const wall of WALLS.filter((item) => wallInfo.get(item.id).exterior)) {
      const samples = Math.max(1, Math.ceil(wall.length / 0.25));
      for (let step = 0; step < samples; step++) {
        const u = wall.length * (step + 0.5) / samples;
        const a = [wall.a[0] + wall.dir[0] * u, wall.a[1] + wall.dir[1] * u];
        const b = [a[0] + wall.dir[0] * 0.01, a[1] + wall.dir[1] * 0.01];
        const openingAt = wall.openings.some((hole) => u > hole.u0 && u < hole.u1);
        for (const height of openingAt ? [-0.12, 2.48] : [0.4, 1.2, 2.48]) {
          if (!hitWall(a, b, height)) gaps.push(`${wall.id}@${u.toFixed(2)}/${height}`);
        }
      }
    }
    return { returnClosed: hitWall(living.points[8], living.points[9], 1.2),
      windowBaseClosed: hitWall(onWindow(opening.u0), onWindow(opening.u1), -0.12), gaps };
  });
  console.log('shell:', shell);
  if (!shell.returnClosed || !shell.windowBaseClosed || shell.gaps.length) errors.push(`Open wall shell: ${JSON.stringify(shell)}`);
  if (!shellOnly) for (const id of ['metallic', 'soft', 'brutal', 'quiet']) {
    if (id !== 'metallic') await page.evaluate((style) => window.__app.setVariant(style), id);
    await page.waitForFunction((style) => window.__app.apartment.style.id === style, id, { timeout: 60_000 });
    const audit = await page.evaluate(() => window.__app.validate());
    const facing = audit.issues.filter((issue) => issue.type === 'Ausrichtung');
    console.log(`${id}: ${audit.issues.length} layout issues, ${facing.length} orientation issues`);
    if (audit.issues.length) errors.push(`${id}: ${audit.issues.map((issue) => issue.msg).join('; ')}`);
  }
  if (!shellOnly) {
    await page.getByRole('button', { name: 'Realistisch' }).click();
    await page.waitForFunction(() => window.__app.viewer.renderMode === 'realistic');
    await page.getByRole('button', { name: 'Wohnen · Blick zur Medienwand' }).click();
    await page.waitForFunction(() => window.__app.viewer.station === 'living');
    const before = await page.evaluate(() => window.__app.viewer.stats.frames);
    await page.waitForFunction((frames) => window.__app.viewer.stats.frames >= frames + 3, before, { timeout: 60_000 });
    console.log('renderer:', await page.evaluate(() => ({ backend: window.__app.viewer.backend, quality: window.__app.viewer.quality, frames: window.__app.viewer.stats.frames })));
  }
} finally {
  await browser.close();
}
if (errors.length) { console.error(errors.join('\n')); process.exitCode = 1; }
