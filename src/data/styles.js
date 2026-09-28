// Vier Stilwelten für WE 13 – alle aus den Moodboards abgeleitet und auf dieselbe gemessene
// Geometrie geplant. Jede Stilwelt definiert:
//   theme      – Material-Thema (Wandfarben/Kalkputz, Holz-, Metall- und Stein-Umschlüsselung)
//   finish     – Wandmaterial je Raum und Akzentwände (Wandgestaltung)
//   decor      – Ausführungsangaben für gemeinsam genutzte Einbauten (Diele, Bäder, HWR)
//   furnish()  – stilspezifische Wandgestaltung, Styling und Kunst
// Alle kaufbaren Möbel, Leuchten und Teppiche kommen aus dem verifizierten Händlerkatalog
// (products.js, Westwing / IKEA, Recherche 28.09.2026): Maße, Ausführung und 3D-Modell folgen
// dem Artikel, die Platzierung leitet sich aus den Herstellermaßen ab.
import { styleProduct, slotProducts, dims } from './products.js';
import { FINISH } from '../engine/builders/architecture.js';

const withWalls = (walls) => Object.fromEntries(Object.entries(FINISH).map(([k, v]) => [k, { ...v, ...(walls[k] ? { wall: walls[k] } : {}) }]));

// ------------------------------------------------------------------ gemeinsame Zonierung
// Wohnbereich im Rahmen von W11 (u entlang der Medienwand, v Richtung Essplatz):
// Medienwand v = 0 · Lounge v ≈ 1–4 · Hauptweg Diele → Essplatz/Küche/Schlafen u ≈ 2,8–4,1 ·
// Essplatz Mitte (3,45 | 5,65) · Sideboard an W07 · Lesenische W05/W06.
const SOFA_BACK = 4.0;          // Sofarücken (v), 0,5 m vor dem Wandversatz W09
const DINING = [3.45, 5.65];    // Tischmitte (u, v) – 1,1 m Durchgang zur Küche, Türzone Schlafen frei
const KNEE = 0.45;              // Knieraum Sofa ↔ Couchtisch (Luxus-Regel 40–45 cm)

/** Catalogue article of a slot and its 3D model (styling options pass through to the model). */
const P = (ctx, slot) => styleProduct(ctx.style.id, slot);
const model = (ctx, slot, opts) => ctx.product(P(ctx, slot).key, opts);

function living(ctx, o) {
  const { M, lib, add, at, grp, fr, D } = ctx;
  const L = fr.W11, back = o.wallD ?? 0;
  o.media(ctx, L);
  // Lowboard: steht auf dem Boden vor der Medienwand, mittig unter dem TV (Achse u = 1,42).
  const lb = P(ctx, 'lowboard'), [lw, ld, lh] = lb.size;
  add({ id: 'lowboard', room: 'living', cat: 'Möbel', size: [lw, ld] },
    grp([model(ctx, 'lowboard')], [D.mushroomLamp(M, { h: 0.36, r: 0.14, mat: o.lampMat ?? 'bronze' }), -lw / 2 + 0.25, lh, 0.02], [D.bookStack(M, 3, { seed: 3 }), lw / 2 - 0.45, lh, 0.02, 0.2], [D.vase(M, 'moon', o.vase ?? 'stonewareCharcoal', 0.9), lw / 2 - 0.16, lh, 0.0], [D.bowl(M, o.bowl ?? 'bronze', 0.12, 0.05), 0.35, lh, 0.05]),
    at(L, 1.42, back + ld / 2 + 0.02));
  const sofa = P(ctx, 'sofa'), [, sd] = sofa.size, front = SOFA_BACK - sd;
  add({ id: 'sofa', room: 'living', cat: 'Polster', size: sofa.size.slice(0, 2) }, () => model(ctx, 'sofa', o.sofaStyle), at(L, 1.42, SOFA_BACK - sd / 2, Math.PI));
  // Couchtisch mittig vor dem Sofa, 45 cm Knieraum; Längsseite parallel zum Sofa.
  const ct = P(ctx, 'coffee'), [cw, cd, ch] = ct.size;
  const coffeeProps = o.coffeeProps ?? ((top) => [[D.bookStack(M, 2, { seed: 8, w: 0.32, d: 0.24 }), 0.18, top, 0.08, 0.4], [D.vase(M, 'bottle', o.vase ?? 'stonewareSage', 0.8), -0.16, top, -0.08], [D.bowl(M, o.bowl ?? 'bronze', 0.15, 0.06), 0.02, top, 0.16]]);
  // Andrew: zwei ineinandergeschobene Trommeltische (Ø 90 + Ø 72) – gemeinsame Stellfläche 128 × 102.
  const [fw, fd] = ct.key === 'andrew' ? [1.28, 1.02] : [cw, cd];
  add({ id: 'coffee', room: 'living', cat: 'Tisch', size: [fw, fd], round: cw === cd && ct.key !== 'andrew' },
    grp([model(ctx, 'coffee')], ...coffeeProps(ch)), at(L, 1.42, front - KNEE - fd / 2));
  if (slotProducts(ctx.style.id, 'side-table').length) {
    const st = P(ctx, 'side-table');
    add({ id: 'side-table', room: 'living', cat: 'Tisch', size: st.size.slice(0, 2), round: true },
      grp([model(ctx, 'side-table')], [D.bookStack(M, 2, { seed: 12, w: 0.22, d: 0.17 }), 0, st.size[2], 0], [D.vase(M, 'bud', o.vase ?? 'stoneware', 1.1), 0.07, st.size[2], 0.05]), at(L, 2.84, 3.35));
  }
  o.extraLiving?.(ctx, L);
  // Teppich 300 × 400: Sofa, Couch- und Beistelltisch stehen vollständig darauf; 15 cm Abstand
  // zu W10, beginnt am Lowboard und endet hinter dem Sofarücken.
  const rug = P(ctx, 'rug-living'), [rw, rd] = rug.size;
  add({ id: 'rug-living', room: 'living', cat: 'Textil', size: [rw, rd], plan: 'soft' }, model(ctx, 'rug-living'), at(L, 0.15 + rw / 2, 0.35 + rd / 2));
  const lounge = P(ctx, 'lounge');
  add({ id: 'lounge', room: 'living', cat: 'Polster', size: lounge.size.slice(0, 2) },
    () => grp([model(ctx, 'lounge')], [(() => { const k = ctx.T.cushion(M, o.loungeCushion ?? 'velvetSage', [0.4, 0.32, 0.13]); k.rotation.x = -0.3; return k; })(), 0, lounge.size[2] * 0.62 + 0.14, -lounge.size[1] / 2 + 0.24]),
    { ...at(L, 4.5, 2.92), yaw: L.face(-3.05, -0.85) });
  const lamp = P(ctx, 'floorlamp-living');
  add({ id: 'floorlamp-living', room: 'living', cat: 'Leuchte', size: [lamp.key === 'neron' ? 0.3 : lamp.size[0], lamp.key === 'neron' ? 0.3 : lamp.size[1]], round: true }, () => model(ctx, 'floorlamp-living'),
    lamp.key === 'neron' ? { ...at(L, 4.72, 2.6), yaw: L.face(-0.45, 0.55) } : at(L, 4.72, 2.6));
  add({ id: 'plant-living', room: 'living', name: 'Solitärpflanze Pachira 190 cm', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Keramik Anthrazit'} Ø 44`, size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachira', { height: 1.95, potR: 0.22, potH: 0.5, maxR: 0.34, potMat: o.pot ?? 'stonewareCharcoal' }), at(L, 0.36, o.plantV ?? 1.02));
  // W10 (4,52 m, längste freie Wand): Wandfelder in Wandweiß über die volle Länge, das Kunstwerk
  // sitzt mittig im großen Feld und bekommt eine Bilderleuchte (Galerielicht).
  const PS = panelStyle(ctx);
  const artY = 1.64;
  add({ id: 'panels-living', room: 'living', cat: 'Wand', name: `Wandfelder ${PS.name} (W10)`, spec: `${PS.spec} · Felder 219/98/87 × 148 cm oben, Sockelfelder 58 cm, Brüstungsprofil H 80 cm, Wandweiß seidenmatt`, size: [4.28, 0.02], plan: false },
    D.boiserie(M, { w: 4.28, profile: PS.profile, rail: 0.8, fields: [[0, 2.19, 0.9, 2.38], [2.31, 3.29, 0.9, 2.38], [3.41, 4.28, 0.9, 2.38], [0, 2.19, 0.14, 0.72], [2.31, 3.29, 0.14, 0.72], [3.41, 4.28, 0.14, 0.72]] }), at(fr.W10, 0.12, 0.001));
  add({ id: 'art-living', room: 'living', cat: 'Kunst', plan: false, ...o.art.meta, name: o.art.meta.name.replace(/\d+ × \d+/, `${Math.round(o.art.w * 100)} × ${Math.round(o.art.h * 100)}`), size: [o.art.w, 0.04] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 4, frame: o.art.frame ?? 'oakLight' }), at(fr.W10, 1.215, 0.03, 0, artY));
  add({ id: 'picture-light-living', room: 'living', cat: 'Leuchte', name: 'Bilderleuchte LED 60 cm', spec: `${PS.metalName}, 2700 K, CRI > 95, schwenkbar (Galerielicht über dem Kunstwerk)`, size: [0.6, 0.18], plan: false },
    D.pictureLight(M, 0.6, { mat: PS.metal, drop: o.art.h / 2 + 0.09 }), at(fr.W10, 1.215, 0, 0, artY + o.art.h / 2 + 0.09));
}

function dining(ctx, o) {
  const { M, lib, add, at, grp, fr, D } = ctx;
  const L = fr.W11;
  const table = P(ctx, 'dining'), chair = P(ctx, 'chair'), [dia, , th] = table.size;
  // Stühle 12 cm unter die Tischkante geschoben; Stellfläche Tisch + Stühle für die Planprüfung.
  const r = dia / 2 + chair.size[1] / 2 - 0.12, span = 2 * (r + chair.size[1] / 2);
  const g = new ctx.THREE.Group();
  g.add(model(ctx, 'dining'));
  g.add(ctx.helpers.chairsAround(4, r, () => model(ctx, 'chair')));
  g.add(grp([D.vase(M, 'amphora', o.vase ?? 'stonewareCharcoal', 0.85), 0.05, th, 0.02], [D.branches(M, { h: 0.55, seed: 5 }), 0.05, th + 0.3, 0.02], [D.tray(M, o.tray ?? 'bronzeDark', 0.36, 0.24), -0.22, th, -0.12, 0.3]));
  add({ id: 'dining', room: 'living', cat: 'Tisch', productName: `${table.retailer} ${table.name.replace(/, Ø.*$/, '')} + 4 × ${chair.name}`, size: [span, span], round: true }, g, at(L, DINING[0], DINING[1], 0.08));
  const pend = P(ctx, 'pendant-dining');
  add({ id: 'pendant-dining', room: 'living', cat: 'Leuchte', plan: false, note: 'Unterkante 1,61 m über Boden (≈ 86 cm über der Tischplatte)', size: [Math.max(0.2, pend.size[0]), Math.max(0.2, pend.size[1])], round: true }, model(ctx, 'pendant-dining'), at(L, DINING[0], DINING[1], o.pendantRot ?? 0));
  const sb = P(ctx, 'sideboard'), [sw, sd, sh] = sb.size;
  add({ id: 'sideboard', room: 'living', cat: 'Möbel', size: [sw, sd] },
    grp([model(ctx, 'sideboard')],
      [D.mushroomLamp(M, { h: 0.46, r: 0.19, mat: o.lampMat ?? 'bronze' }), -sw / 2 + 0.3, sh, -0.02],
      [D.vase(M, 'amphora', o.vase2 ?? 'stonewareSand', 1.05), sw / 2 - 0.35, sh, -0.05],
      [D.branches(M, { h: 0.75, spread: 0.45, seed: 9 }), sw / 2 - 0.35, sh + 0.39, -0.05],
      [D.bowl(M, o.bowl ?? 'bronze', 0.16, 0.06), 0.1, sh, 0.02],
      [D.stoneStack(M), sw / 2 - 0.12, sh, 0.08]),
    at(fr.W07, 1.56, sd / 2 + 0.005));
  const artY = sh + 0.15 + o.art.h / 2 + 0.12, PS = panelStyle(ctx);
  add({ id: 'art-dining', room: 'living', cat: 'Kunst', plan: false, ...o.art.meta, name: o.art.meta.name.replace(/\d+ × \d+/, `${Math.round(o.art.w * 100)} × ${Math.round(o.art.h * 100)}`), size: [o.art.w, 0.04] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 2, frame: o.art.frame ?? 'oakLight' }), at(fr.W07, 1.56, 0.03, 0, artY));
  add({ id: 'picture-light-dining', room: 'living', cat: 'Leuchte', name: 'Bilderleuchte LED 50 cm', spec: `${PS.metalName}, 2700 K, CRI > 95`, size: [0.5, 0.18], plan: false },
    D.pictureLight(M, 0.5, { mat: PS.metal, drop: o.art.h / 2 + 0.09, lumens: 220 }), at(fr.W07, 1.56, 0, 0, artY + o.art.h / 2 + 0.09));
  add({ id: 'plant-dining', room: 'living', name: 'Solitärpflanze 180 cm', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Steinzeug Sand'}`, size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachiraMid', { height: 1.8, potR: 0.22, potH: 0.46, potMat: o.pot ?? 'stonewareSand', shape: 'bowl', seed: 2, maxR: 0.3 }), at(L, 4.68, 7.08));
  // Glasvitrine IKEA RUDSTA rechts neben der Küche (W08), in allen Stilwelten.
  const hb = P(ctx, 'highboard'), [hw, hd, hh] = hb.size;
  add({ id: 'highboard', room: 'living', cat: 'Möbel', size: [hw, hd] },
    () => grp([ctx.product(hb.key)], [D.vase(M, 'bud', o.vase ?? 'stonewareCharcoal', 1.2), -0.2, hh, 0], [D.bookStack(M, 2, { seed: 17, w: 0.26, d: 0.2 }), 0.16, hh, 0.0, 0.3]),
    at(fr.W08, 0.678, hd / 2 + 0.005));
}

function bedroom(ctx, o) {
  const { M, lib, add, at, grp, fr, D } = ctx;
  const W20 = fr.W20, S = fr.W19;
  const wallD = o.wall ? o.wall.d : 0;
  if (o.wall) add({ id: 'bed-wall', room: 'bedroom', cat: 'Wand', anchor: 'back', ...o.wall.meta, size: [4.17, o.wall.d] }, o.wall.build(), at(W20, 2.087, 0));
  const bed = P(ctx, 'bed'), [bw, bl] = bed.size;
  add({ id: 'bed', room: 'bedroom', cat: 'Bett', size: [bw, bl] }, () => model(ctx, 'bed', o.bedStyle), at(W20, 2.087, wallD + bl / 2 + 0.005));
  // Nachttische symmetrisch, 5 cm neben dem Bettrahmen.
  const nt = P(ctx, 'nightstand-n'), [nw, nd] = nt.size, off = bw / 2 + nw / 2 + 0.05;
  for (const [id, u] of [['nightstand-n', 2.087 - off], ['nightstand-s', 2.087 + off]]) {
    const obj = model(ctx, id), top = obj.userData.top ?? nt.size[2];
    add({ id, room: 'bedroom', cat: 'Möbel', size: [nw, nd], round: nt.key === 'calaryNight' },
      grp([obj], [D.bookStack(M, 2, { seed: u * 10, w: 0.2, d: 0.15 }), -0.07, top, 0], [D.vase(M, 'bud', o.vase ?? 'stonewareSage', 1), 0.1, top, 0.04]),
      at(W20, u, wallD + nd / 2 + 0.005));
    add({ id: id + '-pendant', room: 'bedroom', cat: 'Leuchte', plan: false, size: [0.2, 0.2], round: true }, model(ctx, id + '-pendant'), at(W20, u, wallD + 0.22));
  }
  add({ id: 'art-bed', room: 'bedroom', cat: 'Kunst', plan: false, ...o.art.meta, name: o.art.meta.name.replace(/\d+ × \d+/, `${Math.round(o.art.w * 100)} × ${Math.round(o.art.h * 100)}`), size: [o.art.w, 0.03] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 6, frame: o.art.frame ?? 'oakLight' }), at(W20, 2.087, wallD + 0.02, 0, Math.max(o.art.y, bed.size[2] + 0.12 + o.art.h / 2)));
  // Einbauschrank: 3 IKEA PAX-Korpusse mit 6 TONSTAD-Türen, bis zur Decke geschlossen (Blende).
  const wd = slotProducts(ctx.style.id, 'wardrobe');
  add({ id: 'wardrobe', room: 'bedroom', cat: 'Möbel', productName: `IKEA PAX Einbauschrank 300 cm mit TONSTAD-Türen`, note: 'Deckenblende und Sockel bauseits, Innenausstattung nach Bedarf', size: [3.0, 0.6] },
    () => ctx.product(wd[0].key, { count: 3, door: wd[1].key, ceiling: true }), at(fr.W22, 1.5, 0.3));
  // W19 neben dem Bett (vom Bett aus die Blickwand): Wandfelder + Kunst mit Bilderleuchte
  const PS = panelStyle(ctx), side = ctx.style.decor?.hallArt ?? { kind: 'ink' };
  add({ id: 'panels-bed', room: 'bedroom', cat: 'Wand', name: `Wandfelder ${PS.name} (W19)`, spec: `${PS.spec} · 2 Felder 100 × 148 cm + Sockelfelder, Brüstungsprofil H 80 cm, Wandweiß seidenmatt`, size: [2.2, 0.02], plan: false },
    D.boiserie(M, { w: 2.2, profile: PS.profile, rail: 0.8, fields: [[0, 2.2, 0.9, 2.38], [0, 1.04, 0.14, 0.72], [1.16, 2.2, 0.14, 0.72]] }), at(fr.W19, 1.2, 0.001));
  add({ id: 'art-bed-side', room: 'bedroom', cat: 'Kunst', plan: false, name: `${(side.name ?? 'Grafik').replace(/\s*\d+ × \d+/, '')} 120 × 90`, spec: 'Pigmentdruck auf Büttenpapier, Schattenfugenrahmen', size: [1.2, 0.03] },
    D.artwork(M, side.kind, 1.2, 0.9, { seed: 23, frame: o.art.frame ?? 'oakLight' }), at(fr.W19, 2.3, 0.025, 0, 1.64));
  add({ id: 'picture-light-bed', room: 'bedroom', cat: 'Leuchte', name: 'Bilderleuchte LED 50 cm', spec: `${PS.metalName}, 2700 K, dimmbar`, size: [0.5, 0.18], plan: false },
    D.pictureLight(M, 0.5, { mat: PS.metal, drop: 0.54, lumens: 200 }), at(fr.W19, 2.3, 0, 0, 1.64 + 0.54));
  const rc = P(ctx, 'reading-chair');
  add({ id: 'reading-chair', room: 'bedroom', cat: 'Polster', size: rc.size.slice(0, 2) }, () => model(ctx, 'reading-chair'), { ...at(S, 2.4, 3.7), yaw: S.face(-0.3, -1) });
  const bl2 = P(ctx, 'floorlamp-bed');
  add({ id: 'floorlamp-bed', room: 'bedroom', cat: 'Leuchte', size: bl2.key === 'neron' ? [0.3, 0.3] : bl2.size.slice(0, 2), round: true }, () => model(ctx, 'floorlamp-bed'),
    bl2.key === 'neron' ? { ...at(S, 1.9, 4.0), yaw: S.face(0.75, -0.35) } : at(S, 1.98, 3.93));
  add({ id: 'plant-bed', room: 'bedroom', name: 'Pflanze Alocasia', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Steinzeug Salbei'}`, size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'alocasia', { height: 1.05, potR: 0.18, potH: 0.36, potMat: o.pot ?? 'stonewareSage', shape: 'bowl', maxR: 0.26 }), at(S, 3.5, 3.95));
  const rug = P(ctx, 'rug-bed');
  add({ id: 'rug-bed', room: 'bedroom', cat: 'Textil', size: rug.size.slice(0, 2), plan: 'soft' }, model(ctx, 'rug-bed'), at(S, 2.2, 2.087));
}

function office(ctx, o) {
  const { M, lib, add, at, grp, fr, D } = ctx;
  const O = fr.W23;
  const sb = P(ctx, 'sofabed'), [sbw, sbd] = sb.size;
  add({ id: 'sofabed', room: 'office', cat: 'Polster', size: [sbw, sbd] }, () => model(ctx, 'sofabed', { pillows: o.sofabedPillows }), at(O, 1.8, sbd / 2 + 0.005));
  add({ id: 'art-office', room: 'office', cat: 'Kunst', plan: false, ...o.art.meta, name: o.art.meta.name.replace(/\d+ × \d+/, '145 × 100'), size: [1.45, 0.03] }, D.artwork(M, o.art.kind, 1.45, 1.0, { seed: o.art.seed ?? 11, frame: o.art.frame ?? 'oakLight' }), at(O, 1.8, 0.025, 0, 1.5));
  const PS = panelStyle(ctx);
  add({ id: 'picture-light-office', room: 'office', cat: 'Leuchte', name: 'Bilderleuchte LED 60 cm', spec: `${PS.metalName}, 2700 K, CRI > 95`, size: [0.6, 0.18], plan: false },
    D.pictureLight(M, 0.6, { mat: PS.metal, drop: 0.59, lumens: 240 }), at(O, 1.8, 0, 0, 1.5 + 0.59));
  // Schreibtisch mit seitlichem Tageslicht an W24/W26, Stuhl 30 cm vor der Tischkante.
  const desk = P(ctx, 'desk'), [dw, dd, dh] = desk.size;
  add({ id: 'desk', room: 'office', cat: 'Tisch', size: [dw, dd] },
    grp([model(ctx, 'desk')], [D.mushroomLamp(M, { h: 0.36, r: 0.14, mat: o.deskLamp ?? 'bronze' }), -dw / 2 + 0.2, dh, -dd / 2 + 0.14], [ctx.helpers.laptop(M), 0.05, dh, 0.0], [D.bookStack(M, 3, { seed: 31, w: 0.26, d: 0.2 }), dw / 2 - 0.2, dh, -dd / 2 + 0.13, 0.2]),
    at(O, 3.48 - dd / 2 - 0.005, 1.95, -Math.PI / 2));
  const tc = P(ctx, 'task-chair');
  add({ id: 'task-chair', room: 'office', cat: 'Polster', size: tc.size.slice(0, 2), round: true }, () => model(ctx, 'task-chair'), at(O, 3.48 - dd - 0.3, 1.95, Math.PI / 2));
  // Regal an W28 (150 cm), mittig; Böden mit Büchern, Keramik und Sukkulente gestylt.
  const sh = P(ctx, 'shelving'), [shw, shd] = sh.size, shelf = model(ctx, 'shelving');
  ctx.helpers.styleShelf(M, lib, shelf, [...(shelf.userData.shelves ?? []).slice(1), shelf.userData.top].filter(Boolean), shw - 0.1, { bowl: o.shelfBowl ?? 'bronzeDark', vase: o.shelfVase ?? 'stonewareSand' });
  add({ id: 'shelving', room: 'office', cat: 'Möbel', size: [shw, shd] }, shelf, at(fr.W28, 0.75, shd / 2 + 0.005));
  const fl = P(ctx, 'floorlamp-office');
  add({ id: 'floorlamp-office', room: 'office', cat: 'Leuchte', size: fl.key === 'neron' ? [0.3, 0.3] : fl.size.slice(0, 2), round: true }, () => model(ctx, 'floorlamp-office'),
    fl.key === 'neron' ? { ...at(O, 3.02, 0.24), yaw: O.face(-0.9, 0.45) } : at(O, 3.0, 0.27));
  add({ id: 'plant-office', room: 'office', name: 'Pflanze Pachira 120 cm', cat: 'Pflanze', spec: '', size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'pachiraSmall', { height: 1.3, potR: 0.18, potH: 0.38, maxR: 0.25, potMat: o.pot ?? 'stonewareCharcoal' }), at(O, 3.2, 0.9));
  const rug = P(ctx, 'rug-office');
  add({ id: 'rug-office', room: 'office', cat: 'Textil', size: rug.size.slice(0, 2), plan: 'soft' }, model(ctx, 'rug-office'), at(O, 1.8, 1.55));
}

/** Wall-panel profile and gallery-light metal of the active style (luxury wall treatment). */
function panelStyle(ctx) {
  const d = ctx.style.decor ?? {};
  const PR = { classic: ['Boiserie klassisch', 'Stuckleisten aus PU/Hartschaum (z. B. Orac Decor), zweistufiges Profil 34 mm'],
    flat: ['Leistenrahmen Japandi', 'glatte Vierkantleisten 30 × 12 mm, lackiert'],
    shadow: ['Schattenfugen-Rahmen', 'kräftige Vierkantleisten 45 × 20 mm, lackiert'] }[d.panel ?? 'classic'];
  return { profile: d.panel ?? 'classic', name: PR[0], spec: PR[1], metal: d.lightMetal ?? 'bronze', metalName: d.lightMetalName ?? 'Bronze gebürstet' };
}

// ============================================================================================
export const STYLES = {
  // ------------------------------------------------------------------ 1 · Signatur
  metallic: {
    id: 'metallic',
    label: 'Refined Metallic Japandi',
    short: 'Metallic Japandi',
    claim: 'Ruhig. Kuratiert. Zeitgenössisch.',
    lead: 'Das Signatur-Konzept: helle Marmorflächen, dunkle kannelierte Eiche, warmes Messing und Salbei-Akzente vor Räuchereichen-Lamellen. Das geschwungene Bouclé-Sofa Alba und der flache Messing-Pendel Rim setzen die skulpturalen Rundformen des Moodboards um.',
    moodboard: 'Moodboard Refined Metallic Japandi.png',
    palette: [['Crisp Off-White', '#ECE8E1'], ['Soft Gray', '#C9C4BC'], ['Taupe Greige', '#B3AA9D'], ['Muted Sage', '#8A9582'], ['Warm Taupe', '#8B7D6F'], ['Warm Bronze', '#6E5A45'], ['Charcoal', '#333230'], ['Soft Black', '#1E1E1D']],
    materials: [
      ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
      ['Weiße Wände, Akzent Taupe', 'Grundwände weiß; Essplatz W07 als zurückhaltende Akzentfläche'],
      ['Feinsteinzeug Iron 60 × 60 cm', 'Bäder und HWR, Wand und Boden'],
    ],
    walls: [
      ['Medienwand W11', 'Raumhohe Räuchereichen-Lamellen (dunkel, wie Bett- und Einbauten) auf schwarzem Akustikfilz, LED-Voute oben'],
      ['Essplatz W07', 'Kalkputz Taupe (tiefer Ton, stärkere Struktur) als Bühne für Sideboard und Kunst'],
      ['Schlafen W20', 'Räuchereichen-Lamellenwand hinter dem Bett'],
      ['Arbeiten W23', 'Gedämpfter Salbei-Kalkputz als ruhiger Hintergrund für die großformatige Kunst'],
      ['Wohnen W10 · Schlafen W19', 'Boiserie klassisch in Wandweiß (zweistufige Stuckleisten, Brüstungsprofil H 80 cm); Kunst mittig im großen Feld mit Bilderleuchte Bronze'],
      ['Übrige Wände', 'Weiße Wandfarbe mit feiner Struktur; Sockel im Wandton'],
    ],
    lightPlan: ['Grundlicht: entblendete LED-Einbaustrahler 2700 K, CRI > 95', 'Akzent: LED-Voute an der Lamellenwand', 'Zonen: Maytoni Rim Ø 80 Messing über dem Esstisch, Glaspendel Antic greige/gold neben dem Bett', 'Stimmung: Pilz-Tischleuchten, Stehlampe Bun (Marmorfuß, Gold) am Lesesessel', 'Galerie: Bilderleuchten Bronze über jedem Hauptkunstwerk; Vorhangvouten mit LED streifen die Vorhänge'],
    theme: null,
    finish: FINISH,
    wallOverride: { W07: 'wallAccent', W23: 'wallSage' },
    decor: { panel: 'classic', lightMetal: 'bronze', lightMetalName: 'Bronze gebürstet', metal: 'Bronze gebürstet', builtIn: 'Eiche braun gebeizt', bathFront: 'Räuchereiche', bathTop: 'Calacatta', vase: 'stonewareCharcoal', hallArt: { kind: 'ink', name: 'Tuschezeichnung 60 × 80' } },
    furnish(ctx) {
      const { M, add, at, grp, F, D } = ctx;
      living(ctx, {
        wallD: 0.034,
        media: (c, L) => {
          add({ id: 'tv-wall', room: 'living', name: 'Lamellenwand Räuchereiche mit LED-Voute', cat: 'Wand', spec: 'Maßanfertigung: Räuchereichen-Lamellen 30 × 22 mm (dunkel, passend zu Bettwand und Calary-Möbeln) auf Akustikfilz schwarz, raumhoch, 284 cm', size: [2.84, 0.034], anchor: 'back' },
            grp([F.slatWall(M, { w: 2.839, mat: 'smokedOak' })], [D.ledLine(M, 2.7, { lumensPerM: 500 }), 0, 2.5, 0.08]), at(L, 1.4195, 0));
          add({ id: 'tv', room: 'living', name: 'Samsung The Frame 65″ (Kunstmodus)', cat: 'Technik', spec: 'Wandmontage bündig, Rahmen Eiche hell, Bildmitte 1,20 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65 }), at(L, 1.42, 0.034 + 0.016, 0, 1.2));
        },
        sofaStyle: { pillows: ['velvetSage', 'velvetSage', 'linenIvory'], throwMat: 'throwSage' },
        loungeCushion: 'velvetSage',
        art: { kind: 'fields', w: 1.6, h: 1.15, seed: 4, meta: { name: 'Kunstwerk „Stein & Salbei“ 110 × 85', spec: 'Acryl auf Leinwand, Schattenfugenrahmen Eiche' } },
      });
      dining(ctx, {
        art: { kind: 'landscape', w: 1.45, h: 1.0, meta: { name: 'Kunstwerk „Nebellandschaft“ 120 × 85', spec: 'Öl/Acryl, Rahmen Eiche' } },
      });
      bedroom(ctx, {
        wall: { d: 0.034, meta: { name: 'Lamellenwand Räuchereiche', spec: 'Maßanfertigung, raumhoch, 417 cm' }, build: () => F.slatWall(M, { w: 4.17, mat: 'smokedOak' }) },
        bedStyle: { throwMat: 'throwSage', pillows: ['velvetSage', 'linenTaupe'] },
        art: { kind: 'sage', w: 1.55, h: 0.9, y: 1.72, meta: { name: 'Kunstwerk „Salbei“ 120 × 75', spec: 'Acryl, Rahmen Eiche' } },
      });
      office(ctx, {
        sofabedPillows: ['velvetSage', 'linenIvory'],
        art: { kind: 'ink', meta: { name: 'Tuschebild 90 × 70', spec: 'Rahmen Eiche' } },
      });
    },
  },

  // ------------------------------------------------------------------ 2 · Soft Brutalism
  soft: {
    id: 'soft',
    label: 'Japandi × Soft Brutalism',
    short: 'Soft Brutalism',
    claim: 'Ruhe in Form und Material.',
    lead: 'Heller und erdiger: weiße Grundwände, gezielte Akzente aus sandfarbenem Strukturputz, helle Eiche, Travertin, Leinen und Wolle. Cognac- und Salbeiakzente, brüniertes Messing und Anthrazit geben Halt; Travertin-Esstisch auf skulpturalem Fuß, Holzrahmensessel und lineare Pendelleuchte wie im Moodboard.',
    moodboard: 'Moodboard Japandi x Soft Brutalism.png',
    palette: [['Off-White', '#ECE7DE'], ['Sand', '#DCCFBD'], ['Greige', '#BDB1A1'], ['Taupe', '#9A8D7D'], ['Cognac', '#9A5E3A'], ['Salbei', '#8A9582'], ['Messing brüniert', '#A8854F'], ['Anthrazit', '#2E2D2B']],
    materials: [
      ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
      ['Weiße Grundwände, Strukturputz Sand', 'Grundwände weiß; Medienwand und Bettwand als Strukturflächen'],
      ['Feinsteinzeug Iron 60 × 60 cm', 'Bäder und HWR, Wand und Boden'],
    ],
    walls: [
      ['Medienwand W11', 'Strukturputz Sand (kräftige Kelle), TV wandbündig, lineare Messingleuchte'],
      ['Schlafen W20', 'Lehmputz Terrakotta-Sand hinter dem Bett, Gips-Relief als Kunst'],
      ['Arbeiten W23', 'Feiner Lehmputz in Sandton hinter dem Schlafsofa und der großformatigen Kunst'],
      ['Wohnen W10 · Schlafen W19', 'Leistenrahmen Japandi (glatte Vierkantleisten) in Wandweiß, Kunst im großen Feld, Bilderleuchte Messing brüniert'],
      ['Übrige Wände', 'Weiße Wandfarbe mit feiner Struktur, Sockel im Wandton'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K', 'Essplatz: Nova Luce Elettra (lineares LED-Profil 120 cm, schwarz)', 'Wandlicht: lineare Leuchte Messing an der Medienwand', 'Stimmung: Stehlampe Kaya (Betonfuß beige), Pilz-Tischleuchten, schwarze Zylinderpendel Paris am Bett', 'Galerie: Bilderleuchten Messing brüniert; Vorhangvouten mit LED'],
    theme: {
      id: 'soft',
      walls: { wall: ['#E6DED2', 0.5], wallDeep: ['#DDD2C3', 0.55], wallAccent: ['#CFC1AE', 1.25], wallClay: ['#C9B39D', 1.0], wallSage: ['#B4B8A4', 0.7] },
      tint: { skirting: '#D8CEBF' },
      remap: { smokedOak: 'oakNatural', marble: 'travertineVein', marbleFine: 'travertineVein', bronze: 'brassBrushed', boucle: 'boucleOat' },
    },
    finish: withWalls({}),
    wallOverride: { W11: 'wallAccent', W20: 'wallClay', W23: 'wallClay' },
    decor: { panel: 'flat', lightMetal: 'brassBrushed', lightMetalName: 'Messing brüniert', metal: 'Messing brüniert', builtIn: 'Eiche natur', bathFront: 'Eiche natur', bathTop: 'Travertin', vase: 'stonewareSand', hallArt: { kind: 'arch', name: 'Grafik „Bogen“ 60 × 80' }, balcony: { cushion: 'linenBeige', cushionName: 'Sand', pot: 'stonewareRaw' } },
    furnish(ctx) {
      const { M, add, at, F, D } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'tv', room: 'living', name: 'TV 65″ wandbündig', cat: 'Technik', spec: 'Flachwandhalterung, Bildmitte 1,30 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65, bezel: 'matteBlack', art: false }), at(L, 1.42, 0.02, 0, 1.3));
          add({ id: 'sconce-media', room: 'living', name: 'Wandleuchte linear', cat: 'Leuchte', spec: 'Messing brüniert/Opal, H 60 cm', size: [0.05, 0.05], plan: false }, D.linearSconce(M, { h: 0.6 }), at(L, 2.55, 0.05, 0, 1.5));
        },
        sofaStyle: { pillows: ['linenCognac', 'linenSage', 'linenIvory'], throwMat: 'throwCognac' },
        loungeCushion: 'linenCognac', lampMat: 'brassBrushed', bowl: 'stonewareCharcoal', vase: 'stonewareRaw',
        coffeeProps: (top) => [[D.bookStack(M, 2, { seed: 9, w: 0.3, d: 0.22 }), -0.3, 0.31, 0.02, 0.1], [D.bowl(M, 'stonewareCharcoal', 0.13, 0.06), 0.28, 0.22, 0.02], [D.candle(M, 0.12, 0.03), -0.05, 0.31, -0.1]],
        extraLiving: (c, L) => {
          const p = ctx.product('ekenaset');
          add({ id: 'armchair-2', room: 'living', cat: 'Polster', size: [0.64, 0.78] }, p, { ...at(L, 0.44, 1.55), yaw: L.face(1, 0) });
        },
        pot: 'stonewareRaw', potName: 'Steinzeug roh', plantV: 0.8,
        art: { kind: 'relief', w: 1.5, h: 1.15, seed: 4, frame: 'oakNatural', meta: { name: 'Gips-Relief 90 × 90', spec: 'Kalk/Gips auf Holzplatte, Schattenfugenrahmen Eiche' } },
      });
      dining(ctx, {
        pendantRot: Math.PI / 2, lampMat: 'brassBrushed', vase2: 'stonewareClay', bowl: 'stonewareCharcoal', vase: 'stonewareRaw', tray: 'brassBrushed', pot: 'stonewareRaw', potName: 'Steinzeug roh',
        art: { kind: 'arch', w: 1.4, h: 1.0, frame: 'oakNatural', meta: { name: 'Grafik „Bogen“ 100 × 70', spec: 'Pigmentdruck, Rahmen Eiche' } },
      });
      bedroom(ctx, {
        bedStyle: { throwMat: 'throwCognac', pillows: ['linenCognac', 'linenSage'] },
        art: { kind: 'relief', w: 1.5, h: 0.95, y: 1.68, seed: 9, frame: 'oakNatural', meta: { name: 'Gips-Relief 90 × 90', spec: 'Kalk/Gips, Rahmen Eiche' } },
        pot: 'stonewareClay', potName: 'Terrakotta', vase: 'stonewareClay',
      });
      office(ctx, {
        sofabedPillows: ['linenCognac', 'linenSage'], deskLamp: 'brassBrushed', shelfBowl: 'stonewareCharcoal', shelfVase: 'stonewareRaw',
        art: { kind: 'ink', meta: { name: 'Tuschebild 90 × 70', spec: 'Rahmen Eiche' }, frame: 'oakNatural' },
        pot: 'stonewareRaw',
      });
    },
  },

  // ------------------------------------------------------------------ 3 · Refined Brutalism
  brutal: {
    id: 'brutal',
    label: 'Refined Brutalism',
    short: 'Refined Brutalism',
    claim: 'Architektonisch. Geerdet. Leiser Luxus.',
    lead: 'Architektonisch und geerdet: weiße Grundwände mit ausgewählter Betonspachtel-Medienwand, dunkle Eiche in ruhigen Flächen, schwarzer Marmor, Bouclé in Greige und Nougat, brünierter Stahl. Modulares Bouclé-Sofa, Plattform-Holzbett und lange, niedrige Horizontalen mit indirektem Licht.',
    moodboard: 'Moodboard Refined Brutalism.png',
    palette: [['Soft Off-White', '#E7E3DC'], ['Pale Greige', '#CFC8BD'], ['Warm Concrete', '#A69E92'], ['Mushroom Taupe', '#857A6D'], ['Muted Sage', '#7F8870'], ['Smoked Brown', '#4E4339'], ['Charcoal', '#34322F'], ['Muted Black', '#1C1B1A']],
    materials: [
      ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
      ['Weiße Grundwände, Betonspachtel warmgrau', 'Grundwände weiß; nur Medienwand W11 und Essplatz W07 als Akzente'],
      ['Feinsteinzeug Iron 60 × 60 cm', 'Bäder und HWR, Wand und Boden'],
    ],
    walls: [
      ['Medienwand W11', 'Betonspachtel warmgrau über die volle Breite, zwei lineare Wandleuchten schwarz'],
      ['Essplatz W07', 'Kalkputz Pilz-Taupe, Gips-Relief'],
      ['Schlafen W20', 'Räuchereichen-Paneel H 120 cm mit LED-Ablage hinter dem Holzbett'],
      ['Arbeiten W23', 'Mineralischer Betonspachtel als zurückhaltende Bühne für das Kunstwerk'],
      ['Wohnen W10 · Schlafen W19', 'Schattenfugen-Rahmen (kräftige Vierkantleisten) in Wandweiß – architektonisches Relief, Bilderleuchte Stahl brüniert'],
      ['Übrige Wände', 'Weiße Wandfarbe mit feiner Struktur; Sockel im Wandton'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K, gedimmt', 'Indirekt: LED-Ablage am Bettpaneel', 'Wandlicht: lineare Wandleuchten schwarz an der Medienwand', 'Essplatz: Pendelleuchte Level Ø 53 schwarz; Stehlampe Kaya anthrazit', 'Galerie: Bilderleuchten Stahl brüniert; Vorhangvouten mit LED'],
    theme: {
      id: 'brutal',
      walls: { wall: ['#D1C9BD', 1.05], wallDeep: ['#C7BEB1', 1.05], wallConcrete: ['#A49C90', 1.4], wallAccent: ['#B5AB9D', 1.15], wallSage: ['#9EA48F', 0.9] },
      tint: { smokedOak: '#7e7064', floorOak: '#e4d6c6', skirting: '#8f8579' },
      remap: { boucle: 'boucleOat' },
    },
    finish: withWalls({}),
    wallOverride: { W11: 'wallConcrete', W07: 'wallAccent', W23: 'wallConcrete' },
    decor: { panel: 'shadow', lightMetal: 'steelBlackened', lightMetalName: 'Stahl brüniert', metal: 'Stahl brüniert / Bronze', builtIn: 'Eiche braun gebeizt', bathFront: 'Räuchereiche', bathTop: 'Calacatta', vase: 'stonewareRaw', hallArt: { kind: 'monolith', name: 'Grafik „Monolith“ 60 × 80' }, balcony: { cushion: 'linenCharcoal', cushionName: 'Anthrazit', pot: 'concreteDark' } },
    furnish(ctx) {
      const { M, add, at, grp, D } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'tv', room: 'living', name: 'Samsung The Frame 65″ (Kunstmodus)', cat: 'Technik', spec: 'Rahmen Räuchereiche, Bildmitte 1,25 m', size: [1.46, 0.03], plan: false }, ctx.F.frameTV(M, { inch: 65, bezel: 'smokedOak' }), at(L, 1.42, 0.02, 0, 1.25));
          for (const [id, u] of [['sconce-media-l', 0.3], ['sconce-media-r', 2.54]]) add({ id, room: 'living', name: 'Wandleuchte linear schwarz', cat: 'Leuchte', spec: 'Stahl brüniert/Opal, H 60 cm', size: [0.05, 0.05], plan: false }, D.linearSconce(M, { h: 0.6, mat: 'steelBlackened' }), at(L, u, 0.05, 0, 1.5));
        },
        sofaStyle: { pillows: ['velvetMoss', 'velvetMoss', 'linenTaupe'], throwMat: 'throwMoss' },
        loungeCushion: 'velvetMoss', lampMat: 'steelBlackened', bowl: 'stonewareCharcoal', vase: 'stonewareRaw',
        coffeeProps: (top) => [[D.bowl(M, 'stonewareCharcoal', 0.18, 0.07), 0.25, top, 0.05], [D.bookStack(M, 2, { seed: 19, w: 0.3, d: 0.22 }), -0.3, top, -0.05, -0.2]],
        extraLiving: (c, L) => add({ id: 'floor-vase', room: 'living', name: 'Bodenvase mit Zweigen', cat: 'Deko', spec: 'Steinzeug roh, H 55 cm', size: [0.34, 0.34], round: true },
          grp([D.vase(M, 'amphora', 'stonewareRaw', 1.3)], [D.branches(M, { h: 0.9, spread: 0.5, seed: 21 }), 0, 0.5, 0]), at(L, 2.85, 3.62)),
        pot: 'concreteDark', potName: 'Beton dunkel',
        art: { kind: 'monolith', w: 1.6, h: 1.2, seed: 4, frame: 'smokedOak', meta: { name: 'Kunstwerk „Monolith“ 100 × 100', spec: 'Acryl/Sand auf Leinwand, Rahmen Räuchereiche' } },
      });
      dining(ctx, {
        lampMat: 'steelBlackened', vase: 'stonewareRaw', vase2: 'stonewareRaw', bowl: 'stonewareCharcoal', tray: 'steelBlackened', pot: 'concreteDark', potName: 'Beton dunkel',
        art: { kind: 'relief', w: 1.4, h: 1.0, seed: 12, frame: 'smokedOak', meta: { name: 'Gips-Relief 100 × 80', spec: 'Kalk/Gips, Rahmen Räuchereiche' } },
      });
      bedroom(ctx, {
        wall: { d: 0.03, meta: { name: 'Wandpaneel Räuchereiche mit LED-Ablage', spec: 'Maßanfertigung, 417 × 120 cm, Fugenbild 35 cm' }, build: () => ctx.C.bedPanel(M, { tables: [] }) },
        bedStyle: { bedding: 'beddingSand', accent: 'bedding', throwMat: 'throwMoss', pillows: ['velvetMoss', 'linenTaupe'] },
        art: { kind: 'sage', w: 1.5, h: 0.85, y: 1.78, seed: 8, frame: 'smokedOak', meta: { name: 'Kunstwerk „Moos“ 100 × 70', spec: 'Acryl, Rahmen Räuchereiche' } },
        pot: 'concreteDark', potName: 'Beton dunkel', vase: 'stonewareRaw',
      });
      office(ctx, {
        sofabedPillows: ['velvetMoss', 'boucleOat'], deskLamp: 'steelBlackened', shelfBowl: 'stonewareCharcoal', shelfVase: 'stonewareRaw',
        art: { kind: 'monolith', seed: 3, frame: 'smokedOak', meta: { name: 'Grafik „Monolith“ 90 × 70', spec: 'Rahmen Räuchereiche' } },
        pot: 'concreteDark',
      });
    },
  },

  // ------------------------------------------------------------------ 4 · Cool Quiet Luxury
  quiet: {
    id: 'quiet',
    label: 'Cool Quiet Luxury',
    short: 'Quiet Luxury',
    claim: 'Klare Architektur. Dunkle Akzente.',
    lead: 'Die kühlste, grafischste Variante: weiße Wände und hellgrauer Stein, Eichenparkett natur gegen warm-dunkles Eichenfurnier, mattschwarzes Metall, Salbei sanft bis tief und getöntes Glas. Graues Leinen-Sofa, dunkle Trommeltische, olivgrüne Polsterstühle und Amber-Glaspendel wie im Moodboard.',
    moodboard: 'Moodboard Cool Quiet Luxury.png',
    palette: [['Wandfarbe Weiß', '#ECE9E4'], ['Steingrau hell', '#CFCBC3'], ['Eiche natur', '#C08A56'], ['Graphit', '#2B2B2A'], ['Salbei sanft', '#9AA58E'], ['Salbei tief', '#3F4A35'], ['Bronze dunkel', '#4A3526'], ['Mattschwarz', '#151515']],
    materials: [
      ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
      ['Weiße Grundwände, Stein hellgrau', 'Grundwände weiß; Akzentwand W07 in Steingrau'],
      ['Feinsteinzeug Iron 60 × 60 cm', 'Bäder und HWR, Wand und Boden'],
    ],
    walls: [
      ['Medienwand W11', 'Lamellen Eiche dunkel, raumhoch, LED-Voute'],
      ['Essplatz W07', 'Kalkputz Steingrau hell'],
      ['Schlafen W20', 'Lamellen Eiche dunkel hinter dem Bett'],
      ['Arbeiten W23', 'Helle Steinstruktur mit großformatiger Kunst und dunklem Eichenrahmen'],
      ['Wohnen W10 · Schlafen W19', 'Boiserie klassisch in Wandweiß – Pariser Wandfelder als leiser Kontrast zur grafischen Möblierung, Bilderleuchte mattschwarz'],
      ['Übrige Wände', 'Wandfarbe Weiß (feine Kalkstruktur), Sockel weiß'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K', 'Essplatz: Westwing Hamilton (Glasschirme bernsteinfarben)', 'Akzent: LED-Voute an den Lamellenwänden', 'Stimmung: Leselampe Neron schwarz/Messing, Pilzleuchten schwarz, Zylinderpendel Paris am Bett', 'Galerie: Bilderleuchten mattschwarz; Vorhangvouten mit LED'],
    theme: {
      id: 'quiet',
      walls: { wall: ['#ECE9E4', 0.25], wallDeep: ['#E5E1DA', 0.3], wallStone: ['#D0CCC4', 0.55], wallSage: ['#B5BAAB', 0.5] },
      tint: { skirting: '#E6E2DB', floorOak: '#fbf3e8' },
      remap: { smokedOak: 'oakDark', bronze: 'blackMatte', marbleFine: 'marble' },
    },
    finish: withWalls({}),
    wallOverride: { W07: 'wallStone', W23: 'wallStone' },
    decor: { panel: 'classic', lightMetal: 'blackMatte', lightMetalName: 'Mattschwarz', metal: 'Mattschwarz', builtIn: 'Eiche braun gebeizt', bathFront: 'Eiche dunkel', bathTop: 'Marmor hell', vase: 'stonewareCharcoal', hallArt: { kind: 'botanical', name: 'Grafik „Blätter“ 60 × 80' }, balcony: { cushion: 'linenIvory', cushionName: 'Ecru', pot: 'stonewareCharcoal' } },
    furnish(ctx) {
      const { M, add, at, grp, F, D } = ctx;
      living(ctx, {
        wallD: 0.034,
        media: (c, L) => {
          add({ id: 'tv-wall', room: 'living', name: 'Lamellenwand Eiche dunkel mit LED-Voute', cat: 'Wand', spec: 'Maßanfertigung: Lamellen Eichenfurnier warm dunkel auf Akustikfilz, raumhoch, 284 cm', size: [2.84, 0.034], anchor: 'back', plan: true },
            grp([F.slatWall(M, { w: 2.839, mat: 'oakDark' })], [D.ledLine(M, 2.7, { lumensPerM: 500 }), 0, 2.5, 0.08]), at(L, 1.4195, 0));
          add({ id: 'tv', room: 'living', name: 'TV 65″', cat: 'Technik', spec: 'Wandmontage bündig, Bildmitte 1,25 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65, bezel: 'matteBlack', art: false }), at(L, 1.42, 0.034 + 0.016, 0, 1.25));
        },
        sofaStyle: { pillows: ['velvetMoss', 'boucleSage', 'velvetMoss'], throwMat: 'throwSage' },
        loungeCushion: 'linenIvory', lampMat: 'blackMatte', bowl: 'bronzeDark',
        coffeeProps: () => [[D.bookStack(M, 2, { seed: 8, w: 0.3, d: 0.22 }), -0.12, 0.35, -0.02, 0.3], [D.vase(M, 'bottle', 'stonewareCharcoal', 0.8), -0.38, 0.35, -0.14], [D.bowl(M, 'bronzeDark', 0.13, 0.05), 0.36, 0.31, 0.26]],
        art: { kind: 'botanical', w: 1.5, h: 1.15, seed: 4, frame: 'oakDark', meta: { name: 'Kunstwerk „Blätter“ 90 × 110', spec: 'Pigmentdruck, Rahmen Eiche dunkel' } },
      });
      dining(ctx, {
        lampMat: 'blackMatte', vase: 'stonewareCharcoal', vase2: 'stonewareCharcoal', bowl: 'bronzeDark', tray: 'blackMatte',
        art: { kind: 'landscape', w: 1.4, h: 1.0, frame: 'oakDark', meta: { name: 'Kunstwerk „Nebellandschaft“ 120 × 85', spec: 'Öl/Acryl, Rahmen Eiche dunkel' } },
      });
      bedroom(ctx, {
        wall: { d: 0.034, meta: { name: 'Lamellenwand Eiche dunkel', spec: 'Maßanfertigung, raumhoch, 417 cm' }, build: () => F.slatWall(M, { w: 4.17, mat: 'oakDark' }) },
        bedStyle: { throwMat: 'throwMoss', pillows: ['velvetMoss', 'linenIvory'] },
        art: { kind: 'botanical', w: 1.5, h: 0.9, y: 1.66, seed: 3, frame: 'oakDark', meta: { name: 'Grafik „Blätter“ 90 × 70', spec: 'Rahmen Eiche dunkel' } },
        pot: 'stonewareCharcoal', potName: 'Keramik schwarz', vase: 'stonewareCharcoal',
      });
      office(ctx, {
        sofabedPillows: ['linenIvory', 'velvetMoss'], deskLamp: 'blackMatte', shelfBowl: 'bronzeDark', shelfVase: 'stonewareCharcoal',
        art: { kind: 'botanical', seed: 7, frame: 'oakDark', meta: { name: 'Grafik „Blätter“ 90 × 70', spec: 'Rahmen Eiche dunkel' } },
      });
    },
  },
};

export const DEFAULT_STYLE = 'metallic';

// Purchase list, room notes and material rows follow exactly the SKU selection of the scene.
for (const style of Object.values(STYLES)) {
  const describe = (slot) => { const p = styleProduct(style.id, slot); return `${p.quantity > 1 ? p.quantity + ' × ' : ''}${p.retailer} ${p.name} · ${p.finish} · ${dims(p)}`; };
  const has = (slot) => slotProducts(style.id, slot).length > 0;
  style.materials = [
    ['Sitzgruppe', describe('sofa') + '; ' + describe('lounge')],
    ['Tische', describe('coffee') + (has('side-table') ? '; ' + describe('side-table') : '') + '; ' + describe('dining') + ' mit ' + describe('chair')],
    ['Stauraum', describe('lowboard') + '; ' + describe('sideboard') + '; ' + describe('highboard')],
    ['Schlafen', describe('bed') + '; 2 × ' + describe('nightstand-n') + '; IKEA PAX mit ' + slotProducts(style.id, 'wardrobe')[1].name + ' ' + slotProducts(style.id, 'wardrobe')[1].finish],
    ['Arbeiten / Gäste', describe('desk') + '; ' + describe('task-chair') + '; ' + describe('sofabed') + '; ' + describe('shelving')],
    ['Licht & Teppiche', [describe('pendant-dining'), describe('floorlamp-living'), describe('nightstand-n-pendant'), describe('rug-living'), describe('rug-bed')].join('; ')],
    ...style.materials,
  ];
  style.notes = {
    living: { title: 'Wohnen / Essen', zoning: 'Medienwand W11 – Lounge auf dem 300 × 400-Teppich – Essplatz vor W06; Sideboard an W07, Glasvitrine IKEA RUDSTA rechts neben der Küche an W08.', points: [
      describe('sofa') + ', Sofarücken 0,5 m vor dem Wandversatz W09; ' + describe('coffee') + ' mit 45 cm Knieraum.',
      describe('lowboard') + ' mittig unter dem TV; ' + describe('lounge') + ' mit ' + describe('floorlamp-living') + ' in der Fensternische.',
      describe('dining') + ' mit vier Stühlen ' + describe('chair') + '; darüber ' + describe('pendant-dining') + '.',
      describe('sideboard') + ' vor der Akzentwand W07; ' + describe('rug-living') + '.',
    ] },
    bedroom: { title: 'Schlafen', zoning: 'Bett mittig an W20, Einbauschrank IKEA PAX 300 cm an W22 mit ≈ 0,9 m Gang, Leseplatz in der Südostecke.', points: [
      describe('bed') + '; zwei ' + describe('nightstand-n') + ' mit ' + describe('nightstand-n-pendant') + '.',
      '3 × ' + describe('wardrobe') + ' + 6 × ' + slotProducts(style.id, 'wardrobe')[1].name + ' (' + slotProducts(style.id, 'wardrobe')[1].finish + ').',
      describe('reading-chair') + ' + ' + describe('floorlamp-bed') + '; ' + describe('rug-bed') + '.',
    ] },
    office: { title: 'Arbeiten / Gäste', zoning: 'Schlafsofa an W23, Schreibtisch mit seitlichem Tageslicht an W24/W26, Regal an W28.', points: [
      describe('sofabed') + ' – ausgeklappt 210 cm tief; dafür wird der Bürostuhl zur Seite gerollt.',
      describe('desk') + '; ' + describe('task-chair') + '.',
      describe('shelving') + '; ' + describe('floorlamp-office') + '; ' + describe('rug-office') + '.',
    ] },
  };
}

/**
 * Luxus-Einrichtungsregeln (Recherche 09/2026: Quiet-Luxury-/Designer-Leitlinien) und wie sie in
 * WE 13 umgesetzt sind – gilt für alle Stilwelten.
 */
export const LUXURY_PRINCIPLES = [
  ['Wenige, hochwertige Stücke statt Masse', 'Pro Zone ein Hauptmöbel in Massivholz, Echtholzfurnier, Naturstein oder Bouclé (Westwing Collection); keine offenen Budget-Korpusse, keine Tablett- oder Klapptische.'],
  ['Ein Material, ein Metall, ein Holzton je Stilwelt', 'Metallic Japandi: Marmor + Messing + dunkle Eiche · Soft Brutalism: Travertin + Messing + helle Eiche · Refined Brutalism: schwarzer Marmor + brünierter Stahl + dunkle Eiche · Quiet Luxury: Mattschwarz + dunkles Holz + Salbei.'],
  ['Rundformen gegen Architektur', 'Geschwungenes Sofa, runde Esstische, Trommel- und Rundtische brechen die orthogonale Raumgeometrie; Rechtecktische nur, wo das Moodboard Blockformen zeigt.'],
  ['Mehrschichtiges Licht 2700 K, CRI > 95', 'Grundlicht entblendet, indirekte LED-Vouten, Zonenlicht über Tisch und Bett (Pendel mit Unterkante ≈ 86 cm über der Tischplatte), Stimmungslicht auf Tisch- und Stehleuchten; Badpendel IP44 als Gesichtslicht vor den Spiegelwänden.'],
  ['Großzügige Proportionen', 'Teppich 300 × 400 cm: Sofa, Couch- und Beistelltisch stehen vollständig darauf; Bettteppich 200 × 300 cm ragt seitlich über das Bett; Vorhänge an der Decke, bodenlang und breiter als die Öffnung; Kunst mit Bildmitte ≈ 1,45 m bzw. 25 cm über dem Möbel.'],
  ['Stauraum geschlossen und deckenhoch', 'IKEA PAX mit TONSTAD-Türen in Eichenfurnier bis zur Decke (Blende), grifflose Flächen; offene Regale nur als kuratierte Bibliothek.'],
  ['Spiegel als Architektur', 'Maßgefertigte Spiegel oberhalb der Vorwand-Ablagen (1,18 m) bis zur Decke – im Gäste-WC wandfüllend, im Bad über die volle Breite des Waschtisch-Vorsprungs; Armaturen, Brausen und Heizkörper durchgehend schwarz matt.'],
  ['Relief statt Farbe an den Wänden', 'Die Grundwände bleiben weiß, gewinnen aber Tiefe: Wandfelder an W10 und W19, Brüstungsprofil auf 80 cm; Kalk-/Lehmputz, Beton und Lamellen bleiben den Akzentwänden vorbehalten.'],
  ['Galerielicht und Licht auf Textil', 'Bilderleuchten über jedem Hauptkunstwerk; Vorhangvouten wand-zu-wand verdecken die Schienen und streifen die bodenlangen Vorhänge mit indirektem LED-Licht.'],
];

/** Room notes shared by all styles (fixed installations). */
export const SHARED_NOTES = {
  kitchen: { title: 'Kochen', zoning: 'Bestandsküche gemäß Referenz: Zeile an W18, Block an W16, Arbeitsgang 1,65 m.', points: ['Nussbaumfronten, gesprenkelte Granitplatte und -rückwand, schwarze Spüle/Armatur bleiben erhalten.', 'Styling mit Eichenbrett, Keramik und Grün; LED-Unterbauleuchte + zwei Einbaustrahler.'] },
  bath: { title: 'Bad', zoning: 'Sanitärobjekte und Anschlüsse nach HLS-Plan; IKEA ENHET als Stauraum unter dem vorhandenen Laufen-Waschtisch und über dem Waschtrockner.', points: ['Wände und Boden: Feinsteinzeug Iron 60 × 60 cm.', 'Maßspiegel oberhalb der 1,18-m-Ablage; schwarze Armaturen.', 'ENHET offener Waschbeckenschrank 60 × 40 × 60 cm und Wandschrank mit Tür 60 × 32 × 75 cm; VILTO Hocker 40 × 32 × 25 cm.'] },
  guestbath: { title: 'Dusche / Gäste-WC', zoning: 'Walk-in-Dusche 105 × 80 cm an der Vorwand W41, Waschtisch Laufen VAL 60 × 42 vor der Vorwand W43 (Ablage 1,18 m über die volle Wandbreite), WC an W46, Handtuchheizkörper 60 × 180 an W44.', points: ['Wände und Boden: Feinsteinzeug Iron 60 × 60 cm.', 'Maßspiegel über die gesamte Wand W43 oberhalb der Ablage bis zur Decke (131 × 138 cm), zwei IP44-Pendel.', 'Duschsystem Aufputz Duravit Tulum mit Kopf- und Handbrause, Linienrinne, Glas mit Profil – alles schwarz matt; beleuchtete Nische.'] },
  utility: { title: 'HWR', zoning: 'Zwei IKEA ENHET-Hochschränke in der Nische W50, IKEA IVAR an W49 östlich der Tür, Technik (Unterverteilung W47, Heizkreisverteiler W48) frei zugänglich; Türschwenk 76 cm frei.', points: ['Wände und Boden: Feinsteinzeug Iron 60 × 60 cm.', 'Geschlossener Stauraum für Vorräte, Körbe für Kleinteile.'] },
  balcony1: { title: 'Balkon 1', zoning: 'Zwei IKEA NÄMMARÖ-Sessel aus Akazie, kompakter TÄRNÖ-Tisch und Pflanzkübel innerhalb der geknickten Balkonkontur.', points: [] },
  balcony2: { title: 'Balkon 2', zoning: 'IKEA TÄRNÖ Bistro-Set am Küchenaustritt.', points: [] },
};

export const roomNotes = (style) => {
  const n = style.notes;
  return { living: n.living, kitchen: SHARED_NOTES.kitchen, bedroom: n.bedroom, office: n.office, bath: SHARED_NOTES.bath, guestbath: SHARED_NOTES.guestbath, utility: SHARED_NOTES.utility, balcony1: SHARED_NOTES.balcony1, balcony2: SHARED_NOTES.balcony2 };
};
