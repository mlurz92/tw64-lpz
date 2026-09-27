// Casts rays through pixels of a camera: node ray.mjs px py pz tx ty tz fov W H x1,y1 x2,y2 ...
import { chromium } from 'playwright';
const [px, py, pz, tx, ty, tz, fov, W, H, ...pix] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
const page = await browser.newPage({ viewport: { width: +W, height: +H } });
await page.goto('http://127.0.0.1:8000/');
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, { timeout: 300_000 });
const res = await page.evaluate(async ([p, t, f, pix]) => {
  const THREE = await import('three');
  const v = window.__app.viewer; v.goto({ id: 'probe', mode: 'walk', pos: p, target: t, fov: f }, false);
  v.camera.updateMatrixWorld();
  const rect = v.renderer.domElement.getBoundingClientRect();
  return pix.map((s) => {
    const [x, y] = s.split(',').map(Number);
    const ray = new THREE.Raycaster(); ray.setFromCamera(new THREE.Vector2(x / rect.width * 2 - 1, -(y / rect.height) * 2 + 1), v.camera);
    return s + ' → ' + ray.intersectObject(v.scene, true).slice(0, 4).map((h) => `${h.object.name || h.object.parent?.name || h.object.type}[${h.object.material?.name}] d=${h.distance.toFixed(3)} @${(h.point.x + 10.2).toFixed(3)},${h.point.y.toFixed(2)},${(h.point.z + 13.4).toFixed(3)}`).join(' | ');
  });
}, [[+px, +py, +pz], [+tx, +ty, +tz], +fov, pix]);
console.log(res.join('\n'));
await browser.close();
