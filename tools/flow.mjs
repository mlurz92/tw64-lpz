// UI flow check: all styles validate, photo mode start/stop, mood and style switch without errors.
import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.CHANNEL ?? 'chrome', headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
// desktop layout (> 1180 px): light, render mode and stations sit in the toolbar and side panel
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const progress = setInterval(() => page.evaluate(() => ({mood:window.__app?.viewer.mood, photo:window.__app?.viewer.photo?.status(), compiling:window.__app?.viewer.photo?.pt?.isCompiling})).then(s => console.log('progress', JSON.stringify(s))).catch(()=>{}), 20000);
try {
// path tracing on a software GPU makes animation frames slow; actionability checks wait for them
page.setDefaultTimeout(240_000);
const errors = [];
page.on('pageerror', (e) => errors.push('PAGEERROR ' + e.message + ' ' + (e.stack ?? '').slice(0, 400)));
page.on('console', (m) => { if (m.type() === 'error' && !/ERR_CERT|ERR_FAILED|WebGPU/.test(m.text())) errors.push(m.text().slice(0, 300)); });
await page.route('https://**/*', route => route.abort());
await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
await page.waitForFunction(() => !!window.__app?.viewer?.apartment, null, { timeout: 300_000 });
for (const id of ['metallic', 'soft', 'brutal', 'quiet']) {
  await page.evaluate((s) => window.__app.setVariant(s), id);
  await page.waitForFunction((s) => window.__app.apartment.style.id === s && !window.__app.viewer.suspended, id, { timeout: 120_000 });
  const audit = await page.evaluate(() => window.__app.validate());
  console.log(id, audit.issues.length, 'issues', audit.issues.map((i) => i.msg).join(' | ').slice(0, 500));
  if (audit.issues.length) errors.push(`${id}: ${audit.issues.map(i => i.msg).join(' | ')}`);
}
await page.evaluate(() => { window.__app.viewer.photoOverride = { samples: 4, pixels: 65536 }; });
await page.getByRole('button', { name: 'Fotorealistisch' }).click();
await page.getByRole('button', { name: 'Küche' }).click();
await page.waitForFunction(() => window.__app.viewer.photo?.state === 'done' && !window.__app.viewer.photo.meterPending, null, { timeout: 600_000 });
console.log('photo started', await page.evaluate(() => window.__app.viewer.photo.status()));
await page.getByRole('button', { name: 'Goldene Stunde' }).click();
await page.waitForFunction(() => window.__app.viewer.mood === 'golden' && window.__app.viewer.photo?.state === 'done' && !window.__app.viewer.photo.meterPending, null, { timeout:600000 });
const golden = await page.evaluate(() => {
  const v=window.__app.viewer, p=v.photo, sun=p.scene.children.find(o=>o.userData.source===v.sun);
  return { mood:v.mood, lightingKey:p.lightingKey, sunIntensity:sun.intensity, sunPosition:sun.position.toArray(), worldPosition:sun.matrixWorld.elements.slice(12,15), environment:p.scene.environment===v.hdriTex, status:p.status() };
});
console.log('golden hour', golden);
if (!golden.environment || golden.sunIntensity!==2.4 || !golden.lightingKey.startsWith('golden|') || golden.sunPosition.some((x,i)=>Math.abs(x-golden.worldPosition[i])>1e-6)) errors.push('Goldene Stunde nicht synchronisiert');
await page.getByRole('button', { name: 'Abend', exact:true }).click();
await page.waitForTimeout(500);
console.log('after mood', await page.evaluate(() => window.__app.viewer.photo.status()));
await page.getByRole('button', { name: 'Übersicht (Dollhouse)' }).click();
await page.waitForFunction(() => window.__app.viewer.photo?.samples >= 1 && window.__app.viewer.mode === 'orbit', null, { timeout: 600_000 });
console.log('dollhouse photo', await page.evaluate(() => window.__app.viewer.photo.status()), await page.locator('#photoStatus').textContent());
await page.getByRole('button', { name: 'Standard' }).click();
console.log('back to standard', await page.evaluate(() => [window.__app.viewer.renderMode, window.__app.viewer.photo.active]));
const recovery = await page.evaluate(async () => {
  const p = window.__app.viewer.photo, prototype = Object.getPrototypeOf(p);
  const tracer = p.pt._pathTracer, compile = tracer.compileMaterial;
  let compilations = 0;
  tracer.compileMaterial = async () => { compilations++; };
  let batchesCompiles;
  try {
    tracer._compileFunction(); tracer._compileFunction(); tracer._compileFunction();
    await tracer._compilePromise;
    batchesCompiles = compilations===1;
  } finally { tracer.compileMaterial = compile; }
  const textures = p.pt._pathTracer.material.textures, upload = textures.setTextures;
  let uploads = 0;
  textures.setTextures = () => { uploads++; };
  let skipsTextures, defaultUploads;
  try {
    p.pt.updateMaterials({ uploadTextures:false }); skipsTextures = uploads===0;
    p.pt.updateMaterials(); defaultUploads = uploads===1;
  } finally { textures.setTextures = upload; }
  const glazing = []; p.scene.traverse(o=>{ if(o.isMesh && o.material.transmission===1 && o.material.color.r>.9) glazing.push(o.material.castShadow); });
  const failed = Object.create(prototype); failed.state = 'error'; failed.message = 'injected';
  let rejected = false; try { await failed.finished(); } catch { rejected = true; }
  const render = p.renderer.render, target = p.renderer.getRenderTarget();
  const saved = []; p.scene.traverse(o => { if (o.isMesh) saved.push([o,o.material,o.visible]); });
  const background = p.scene.background, toneMapping = p.renderer.toneMapping;
  p.renderer.render = () => { throw new Error('injected auxiliary render failure'); };
  try { p.features(2,2); } catch {} finally { p.renderer.render = render; }
  const restored = saved.every(([o,m,v]) => o.material === m && o.visible === v) && p.scene.background === background && p.renderer.toneMapping === toneMapping && p.renderer.getRenderTarget() === target;
  const fallback = Object.create(prototype);
  Object.assign(fallback, { request:1, samples:4, budget:()=>({samples:4}), state:'tracing', emit:()=>{}, renderer:{domElement:{}}, denoiseCanvas:{}, el:document.createElement('div'), features:()=>{throw Error('injected');} });
  fallback.denoise();
  return { rejected, restored, fallbackDone:fallback.state==='done' && !fallback.denoising, skipsTextures, defaultUploads, batchesCompiles, glazingPassesSun:glazing.length>0 && glazing.every(v=>v===false) };
});
console.log('photo failure recovery', recovery);
if (Object.values(recovery).some(v=>!v)) errors.push('Photo error recovery failed');
console.log(errors.join('\n') || 'no errors');
if (errors.length) process.exitCode = 1;
} finally {
  clearInterval(progress);
  await browser.close();
}
