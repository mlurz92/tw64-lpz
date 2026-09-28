import { chromium } from 'playwright';
const browser = await chromium.launch({ channel: process.env.CHANNEL ?? 'chrome', headless: true, args: ['--use-angle=swiftshader', '--disable-features=WebGPU'] });
try {
  const page = await browser.newPage({ viewport: { width: 1000, height: 700 } });
  await page.route('https://**/*', route => route.abort());
  await page.goto('http://127.0.0.1:8000/', { waitUntil: 'domcontentloaded' });
  await page.waitForFunction(() => window.__app?.apartment && !window.__app.viewer.suspended, null, { timeout: 300000 });
  const result = await page.evaluate(async () => {
    const { ApartmentScene, footprintOf } = await import('/src/engine/scene.js');
    const { validateLayout } = await import('/src/core/validate.js');
    const { STYLES } = await import('/src/data/styles.js');
    const THREE = await import('three');
    const { OFFSET } = await import('/src/core/geometry.js');
    const a = window.__app.apartment;
    return Object.keys(STYLES).map(style => {
      const scene = new ApartmentScene(a.baseM, a.lib, style).build();
      const furniture = scene.items.filter(i => ['Möbel', 'Polster', 'Bett', 'Tisch', 'Outdoor'].includes(i.cat));
      const missing = furniture.filter(i => !i.products?.length).map(i => i.id);
      const hosts = { IKEA: 'www.ikea.com', Westwing: 'www.westwing.de', Höffner: 'www.hoeffner.de' };
      const invalid = furniture.flatMap(i => (i.products ?? []).filter(p => {
        const url = new URL(p.url);
        return url.protocol !== 'https:' || url.hostname !== hosts[p.retailer] || !p.checked || !(p.quantity > 0) || p.size.length !== 3 || p.size.some(n => !Number.isFinite(n) || !(n > 0));
      }).map(p => `${i.id}: ${p.name}`));
      for (const i of furniture.filter(i => ['sofa','bed','desk','highboard','sofabed'].includes(i.id))) {
        const bounds = new THREE.Box3().setFromObject(i.object);
        const xs=i.footprint.map(p=>p[0]-OFFSET.x), zs=i.footprint.map(p=>p[1]-OFFSET.y);
        if (bounds.min.x < Math.min(...xs)-.015 || bounds.max.x > Math.max(...xs)+.015 || bounds.min.z < Math.min(...zs)-.015 || bounds.max.z > Math.max(...zs)+.015) invalid.push(`${i.id}: 3D-Modell ragt über die Planungsfläche`);
      }
      const issues = validateLayout(scene.items).issues;
      const hasFinish = (id, hex, neutralMap = false) => {
        let found = false;
        scene.items.find(i=>i.id===id).object.traverse(o=>{ if(o.isMesh && o.material.color?.getHexString()===hex && (!neutralMap || !o.material.map)) found=true; });
        return found;
      };
      if (style === 'quiet' && !hasFinish('sofa','b8c5cf',true)) invalid.push('Wolke Hellblau wird durch eine fremde Albedotextur verfärbt');
      if (style === 'brutal' && !hasFinish('bed','4b4c50')) invalid.push('IDANÄS Dunkelgrau ist nicht dunkelgrau modelliert');
      // Guest use: roll the office chair aside, then open HYLTARP to its full 240 cm depth.
      const guestItems = scene.items.filter(i => i.id !== 'task-chair').map(i => {
        if (i.id !== 'sofabed') return i;
        const delta = (2.4-i.size[1])/2;
        const pos = [i.pos[0]+Math.sin(i.yaw)*delta, i.pos[1]+Math.cos(i.yaw)*delta];
        return {...i, pos, size:[i.size[0],2.4], footprint:footprintOf(pos,i.yaw,[i.size[0],2.4])};
      });
      const guestIssues = validateLayout(guestItems).issues;
      const selections = Object.fromEntries(['sofa','bed','coffee','desk','highboard'].map(id => [id, scene.items.find(i => i.id === id)?.products?.[0]?.url]));
      const glass = scene.items.find(i => i.id === 'highboard');
      let glassMeshes = 0; glass.object.traverse(o => { if (o.isMesh && o.material?.userData?.glass) glassMeshes++; });
      if (!glassMeshes || !selections.highboard?.includes('rudsta')) invalid.push('Glasvitrine fehlt');
      return { style, furniture: furniture.length, missing, invalid, issues, guestIssues, selections, glassMeshes };
    });
  });
  console.log(JSON.stringify(result, null, 2));
  if (result.some(r => r.missing.length || r.invalid.length || r.issues.length || r.guestIssues.length)) process.exitCode = 1;
  for (const [id, minimum] of [['sofa',4],['bed',4],['coffee',3],['desk',3]]) {
    if (new Set(result.map(r => r.selections[id])).size < minimum) { console.error(`${id}: Stilvarianten fehlen`); process.exitCode = 1; }
  }
} finally { await browser.close(); }
