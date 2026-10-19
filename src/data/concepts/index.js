// Die vier Möblierungskonzepte (PDF-Originale unter assets/konzepte/) als Stilwelten.
//
// Daten: src/data/concepts/<id>.js – erzeugt mit tools/concepts/build.py aus den PDFs: Text- und
// Tabellenblöcke aller Seiten, Produktliste mit Preisen, Lieferzeiten und Händlerlinks,
// Raumsummen sowie die Positionen des Möblierungsplans (Blatt 1, Maßstab 1:50) in Planmetern
// der App – die Konzeptpläne sind aus demselben Rohbau-Grundriss gezeichnet (Abweichung ≤ 12 mm).
// Jedes Objekt steht an der Stelle und in der Ausrichtung, die der Möblierungsplan zeigt; seine
// Maße folgen der Produktliste, Höhen den Wandansichten (Kapitel 6/7 der Konzepte).
import { WALLS } from '../../core/geometry.js';
import { FINISH } from '../../engine/builders/architecture.js';
import * as K from './models.js';
import travertin from './travertin.js';
import espresso from './espresso.js';
import stone from './stone.js';
import ivory from './ivory.js';

export const CONCEPT_DATA = { travertin, espresso, stone, ivory };

const DEG = Math.PI / 180;
const DIR = { N: [0, -1], S: [0, 1], E: [1, 0], W: [-1, 0] };

/** Nearest wall to a plan point: foot point on the wall face, inward normal, yaw facing into the room. */
function onWall(x, y, room = null) {
  let best = null;
  for (const w of WALLS) {
    if (room && w.room !== room) continue;
    const px = x - w.a[0], py = y - w.a[1];
    const u = Math.max(0, Math.min(w.length, px * w.dir[0] + py * w.dir[1]));
    const fx = w.a[0] + w.dir[0] * u, fy = w.a[1] + w.dir[1] * u, d = Math.hypot(x - fx, y - fy);
    if (!best || d < best.d) best = { d, foot: [fx, fy], n: w.n, wall: w, u };
  }
  return { ...best, yaw: Math.atan2(best.n[0], best.n[1]) };
}

/** Yaw (one of the four orientations of the drawn rectangle) whose front looks along `dir`. */
function yawToward(p, dir) {
  const base = -(p?.a ?? 0) * DEG;
  let best = base, score = -2;
  for (let k = 0; k < 4; k++) {
    const y = base + (k * Math.PI) / 2, s = Math.sin(y) * dir[0] + Math.cos(y) * dir[1];
    if (s > score) { score = s; best = y; }
  }
  return best;
}

const eur = (v) => v == null ? '' : v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

// ------------------------------------------------------------------------------------------
// Konzeptspezifische Ausführung (Farben/Materialien laut Produktliste und Farbpalette)
const CFG = {
  travertin: {
    label: 'Konzept 1 · Travertin · Kupfer · Salbei', short: 'Travertin · Kupfer', claim: 'Ruhiger Luxus auf Natureiche-Dielen.',
    theme: { walls: { kWall: ['#F4F0E8', 0.15], kAccent: ['#BCC6B0', 0.3] }, tint: { skirting: '#ece6dc' } },
    rooms: { living: 'kWall', kitchen: 'kWall', bedroom: 'kWall', office: 'kWall' }, overrides: { W20: 'kAccent' },
    tv: 1.125, slat: ['oakNatural', '#dcc3a0'], pendant: 'kushi', ceiling: 'lido', kitchenLamp: 'lido', metal: 'copper',
    curtain: '#f3f0ea', curtainBack: '#cdbfa8',
    W1: { m: 'sofaLennon', fabric: ['boucle', '#b9aa97', { dropMap: true }], pillows: ['pSage', 'pSage', 'pIvory', 'pSage'], throwMat: 'throwSage' },
    W3: { kind: 'panel', color: '#8a6a55', legH: 0.15 }, E4: { kind: 'panel', color: '#8a6a55', legH: 0.2 },
    W4: ['velvetSage', '#97a88e'], W5: { mat: 'travertineVein' }, W6: 'kushi', W7: 'eloise', W17: 'kian',
    W8: '#dcd6cb', E9: '#c4b6a3', S12: '#e4d8c4',
    W19: { palette: ['#e9e2d6', '#cbbda8', '#a99b88', '#8f8a83', '#ddd3c4'], frame: '#c7a57a', style: 'abstract' },
    W20: { pot: '#d6c9b1' }, W21: { kind: 'metal', color: '#a7b59e' },
    E1: { top: 'marble', topColor: '#efe7da', base: 'drum', baseMat: 'oakDark', baseColor: '#4a3426' },
    chair: { m: 'chairNik', fabric: ['boucle', '#a7b59e', { dropMap: true }], wood: '#cfae80' },
    E5: 'mabell', E6: 'ph',
    E7: { palette: ['#e7dfd2', '#c8b9a2', '#a39279', '#e2d6c3'], frame: '#9c8f80', style: 'leaf', w: 0.53, h: 0.73, y: 1.45 },
    F1: { front: '#f3eee3', wood: false }, F15: 'bissa', F7: { kind: 'chandler', top: 'travertineVein' }, F8: { kind: 'ayu', w: 0.6, h: 0.6, y: 1.5 }, F9: 'kian',
    S1: { fabric: ['boucle', '#b9aa97', { dropMap: true }], bedding: ['linenSage', '#c9d3bf'], accent: ['linenIvory', '#e9e4da'], throwC: ['linenIvory', '#f1ece2'], pillows: ['pSage', 'pSage'] },
    S4: 'holden', S5: 'kian',
    A1: { fabric: ['boucle', '#d4c6b0', { dropMap: true }], pillows: ['pSage', 'pSage'] }, A2: 'mittzon', A3: 'hattefjall', A4: 'billy', A6: 'kian',
    pillows: { pSage: ['linenSage', '#8f9a87'], pIvory: ['linenIvory', '#ece6da'] },
  },
  espresso: {
    label: 'Konzept 2 · Espresso · Petrol · Chrom', short: 'Espresso · Petrol', claim: 'Boutique-Hotel statt Musterwohnung.',
    theme: { walls: { kWall: ['#E7DCCB', 1.0], kWhite: ['#F4F0E8', 0.15], kBed: ['#5E4232', 0.45], kBedCeil: ['#5E4232', 0.3] }, tint: { skirting: '#d9ccb8' } },
    rooms: { living: 'kWall', kitchen: 'kWhite', bedroom: 'kBed', office: 'kWhite' }, ceilings: { bedroom: 'kBedCeil' },
    tv: 1.08, slat: ['walnut', '#86624a'], pendant: 'mirrorball', ceiling: 'vanja', kitchenLamp: 'gasgrund', metal: 'chrome',
    curtain: '#e6dccb', curtainBack: '#4a3326',
    W1: { m: 'sofaTribeca', fabric: ['boucle', '#5e4232', { dropMap: true }], pillows: ['pBordeaux', 'pRust', 'pRust', 'pBordeaux'], throwMat: 'throwWine' },
    W2: 'burl', W3: { kind: 'wave', color: '#74543f', legH: 0.1 }, E4: { kind: 'ribbed', color: '#74543f', legH: 0.17 },
    W4: ['boucle', '#2f7074', { dropMap: true }], W5: { mat: 'chrome', color: '#d8d8d8' }, W6: 'multilite', W7: 'globe', W17: 'panthella',
    W8: '#e2ccb6', E9: '#d8b39a', S12: '#ece2d2', relief: true,
    W19: { palette: ['#e7ddcc', '#8c6a50', '#5e4232', '#b08a6a', '#3b2a20'], frame: '#a07a52', style: 'abstract' },
    W20: { pot: '#4b3427' }, W21: { kind: 'wood', color: '#74543f' },
    E1: { top: 'marble', topColor: '#4d6b5c', base: 'slim', baseMat: 'steel' },
    chair: { m: 'chairJordan', leather: '#5a3a28' },
    E5: 'ic', E6: 'ict1',
    E7: { palette: ['#efe7da', '#8b5a3c', '#3a2b22', '#c9a88a', '#1e1b19'], frame: null, style: 'strokes', w: 0.9, h: 1.2, y: 1.55 },
    F1: { front: '#e2cba8', wood: true, filler: '#e7dccb' }, F15: 'seaford', F7: { kind: 'noam', top: 'marble', topColor: '#4d6b5c' }, F8: { kind: 'polaris', w: 0.63, h: 0.67, y: 1.5 }, F9: 'vp9',
    S1: { fabric: ['cordBeige', '#6f7451'], bedding: ['linenCognac', '#c49a6c'], accent: ['linenCognac', '#b98a5e'], throwC: ['linenCharcoal', '#4a3326'], pillows: ['pBrown', 'pBrown'] },
    S4: 'soren', S5: 'vp3',
    A1: { fabric: ['boucle', '#a6573c', { dropMap: true }], pillows: ['pRust', 'pRust'] }, A2: 'mittzon', A3: 'hattefjall', A4: 'billy', A6: 'vp9',
    pillows: { pBordeaux: ['velvetCognac', '#6e232f'], pRust: ['linenCognac', '#a8573a'], pBrown: ['velvetCognac', '#4a3326'] },
    throws: { throwWine: ['throwCognac', '#5a2f2a'] },
  },
  stone: {
    label: 'Konzept 2 · Stone · Petrol · Salbei', short: 'Stone · Petrol', claim: 'Gedeckte Bühne, starke Einzelstücke.',
    theme: { walls: { kWall: ['#DCD3C6', 0.3], kWhite: ['#F4F0E8', 0.15] }, tint: { skirting: '#cfc6b8' } },
    rooms: { living: 'kWall', kitchen: 'kWhite', bedroom: 'kWall', office: 'kWhite' },
    tv: 1.125, slat: ['oakNatural', '#dcc3a0'], pendant: 'mirrorball', ceiling: 'vanja', kitchenLamp: 'gasgrund', metal: 'chrome',
    curtain: '#e6dccb', curtainBack: '#cdbfa8',
    W1: { m: 'sofaLennon', fabric: ['boucle', '#cfc6b8', { dropMap: true }], pillows: ['pPetrol', 'pSage', 'pSage', 'pPetrol'], throwMat: 'throwSage' },
    W2: 'distinct', W3: { kind: 'plain', color: '#e3c8a2', wood: 'oakNatural', legH: 0.15, handle: 'brushed' }, E4: { kind: 'ribbed', color: '#e3c8a2', wood: 'oakNatural', legH: 0.17, handle: 'brushed' },
    W4: ['boucle', '#2f7074', { dropMap: true }], W5: 'componibili', W6: 'multilite', W7: 'globe', W17: 'vp9',
    W8: '#e4e2dd', E9: '#ece5d9', S12: '#ece5d9',
    W19: { palette: ['#e9e6dc', '#6f8f6a', '#3f6d5a', '#3b5670', '#d9a6a0', '#a9c09a'], frame: '#c7a57a', style: 'abstract' },
    W20: { pot: '#cfc8bd' }, W21: { kind: 'tylko', color: '#94a98f' },
    E1: { top: 'marble', topColor: '#efe8dd', base: 'slim', baseMat: 'steel' },
    chair: { m: 'chairNik', fabric: ['boucle', '#94a98f', { dropMap: true }], wood: '#cfae80' },
    E5: 'ic', E6: 'ict1',
    E7: { palette: ['#eef0ea', '#7e9a86', '#4d6e58', '#a9bfa6', '#ffffff'], frame: '#1b1b1b', style: 'bands', w: 0.91, h: 1.21, y: 1.555 },
    F1: { front: '#e2cba8', wood: true, filler: '#dcd3c6' }, F15: 'seaford', F7: { kind: 'noam', top: 'marble', topColor: '#efe8dd' }, F8: { kind: 'polaris', w: 0.63, h: 0.67, y: 1.5 }, F9: 'vp9',
    S1: { fabric: ['cordBeige', '#3f6680'], bedding: ['linenSage', '#c9d3bf'], accent: ['linenIvory', '#e9e4da'], throwC: ['linenIvory', '#f1ece2'], pillows: ['pPetrol', 'pPetrol'] },
    S4: 'coya', S5: 'vp3',
    A1: { fabric: ['boucle', '#94a98f', { dropMap: true }], pillows: ['pSage', 'pSage'] }, A2: 'mittzon', A3: 'hattefjall', A4: 'tylkoTall', A4color: '#3b5670', A6: 'vp9',
    pillows: { pPetrol: ['velvetSage', '#2c5b5d'], pSage: ['velvetSage', '#94a98f'] },
  },
  ivory: {
    label: 'Konzept 2 · Ivory · Petrol · Messing', short: 'Ivory · Messing', claim: 'Galerie-Weiß, Stein, Messing – und eine Leitfarbe.',
    theme: { walls: { kWall: ['#F1ECE3', 0.15], kAccent: ['#1F5A60', 0.35], kCeil: ['#F1ECE3', 0.1] }, tint: { skirting: '#ebe5da' } },
    rooms: { living: 'kWall', kitchen: 'kWall', bedroom: 'kWall', office: 'kWall' }, overrides: { W20: 'kAccent' }, ceilings: { living: 'kCeil', kitchen: 'kCeil', bedroom: 'kCeil', office: 'kCeil' },
    tv: 1.125, slat: ['oakNatural', '#dcc3a0'], pendant: 'semi', ceiling: 'vanja', bedCeiling: 'svep', kitchenLamp: 'gasgrund', metal: 'brass',
    curtain: '#efe9de', curtainBack: '#cdbfa8',
    W1: { m: 'sofaLennon', fabric: ['cordBeige', '#dcd3c4'], pillows: ['pPetrol', 'pCream', 'pCream', 'pPetrol'], throwMat: 'throwIvory' },
    W2: 'monolith', W3: { kind: 'plain', color: '#e3c8a2', wood: 'oakNatural', legH: 0.15, handle: 'gold' }, E4: { kind: 'ribbed', color: '#e3c8a2', wood: 'oakNatural', legH: 0.17, handle: 'gold' },
    W4: ['boucle', '#1f5a60', { dropMap: true }], W5: { mat: 'travertineVein' }, W6: 'icf1', W7: 'globe', W17: 'multiliteportable',
    W8: '#efe9de', E9: '#f1ece2', S12: '#efe9de', relief: true,
    W19: { palette: ['#f2eee6', '#1f2f4f', '#3d5a85', '#c8d2dc', '#e9e2d6'], frame: '#c7a57a', style: 'strokes' },
    W20: 'hourglass', W21: { kind: 'tylko', color: '#e9e0d0' },
    E1: { top: 'marble', topColor: '#efe7da', base: 'drum', baseMat: 'oakDark', baseColor: '#4a3426' },
    chair: { m: 'chairNik', fabric: ['linenIvory', '#efe9de'], wood: '#d9bf98' },
    E5: 'ic', E6: 'ict1',
    E7: { palette: ['#efe8dc', '#c9a55c', '#9a9590', '#e2d3b8', '#ffffff'], frame: '#d8c3a0', style: 'abstract', w: 0.9, h: 1.18, y: 1.54 },
    F1: { front: '#e2cba8', wood: true, filler: '#f1ece3' }, F15: 'seaford', F7: { kind: 'chandler', top: 'travertineVein' }, F8: { kind: 'laviena', w: 0.6, h: 1.01, y: 1.55 }, F9: 'panthella',
    S1: { fabric: ['cordBeige', '#efe9de'], bedding: ['linenIvory', '#fbfaf7'], accent: ['linenIvory', '#f6f4ef'], throwC: ['linenTaupe', '#bfae98'], pillows: ['pPetrol', 'pPetrol'] },
    S4: 'zumi', S5: 'ict1low',
    A1: { fabric: ['boucle', '#d8cbb5', { dropMap: true }], pillows: ['pCream', 'pCream'] }, A2: 'marte', A3: 'lucie', A4: 'tylkoTall', A4color: '#2e3f57', A6: 'bestlite',
    pillows: { pPetrol: ['velvetSage', '#1f5a60'], pCream: ['boucle', '#efe9de', { dropMap: true }] },
    throws: { throwIvory: ['linenIvory', '#f1ece2'] },
  },
};

// ------------------------------------------------------------------------------------------
/** Room notes for the 3D detail panel: the room-concept bullets of chapter 5/6, assigned by position codes. */
function notesOf(data) {
  const bullets = [];
  for (const p of data.pages) for (const b of p.notes ?? []) if (b.type === 'ul') bullets.push(...b.items);
  const strip = (s) => s.replace(/\*\*/g, '').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
  const pick = (re) => bullets.filter((t) => re.test(t)).map(strip);
  const heads = []; for (const p of data.pages) for (const b of p.notes ?? []) if (b.type === 'h2' && /^\d\.\d/.test(b.text)) heads.push(b.text);
  const zone = (re) => heads.filter((t) => re.test(t)).join(' · ');
  return {
    living: { title: 'Wohnen / Essen / Diele', zoning: zone(/Wohnen|Diele/), points: pick(/\((W\d|E\d)|W\d+\)|E\d+\)|\(F\d|F\d+\)|Garderobe|Entrée|Schuhschrank/).filter((t) => !/Bett|Schlafsofa|Bibliothek|Küche|HWR|Balkon/.test(t.slice(0, 40))) },
    bedroom: { title: 'Schlafen', zoning: zone(/Schlafen/), points: pick(/\(S\d|S\d+\)|S\d+[,/]|Bett |Nachttisch|Schrankwand|Color-Drenching|Kopfteilwand/) },
    office: { title: 'Arbeit / Gast', zoning: zone(/Arbeit/), points: pick(/\(A\d|A\d+\)|Schlafsofa|Schreibtisch|Bibliothek/) },
    kitchen: { title: 'Kochen', zoning: zone(/Kochen/), points: pick(/Küche/) },
    utility: { title: 'HWR', zoning: zone(/HWR/), points: pick(/HWR/) },
    balcony1: { title: 'Balkon 1', zoning: pick(/Balkon 1/).join(' '), points: [] },
    balcony2: { title: 'Balkon 2', zoning: pick(/Balkon 2/).join(' '), points: [] },
  };
}

/** Palette of the concept (swatches of chapter 1) as [name, hex] pairs. */
function paletteOf(data) {
  for (const p of data.pages) for (const b of p.blocks) if (b.type === 'swatches') return b.items.map((s) => [s.name, s.hex]);
  return [];
}
function leadOf(data) {
  for (const p of data.pages) { const i = p.blocks.findIndex((b) => b.type === 'h2' && b.text === 'Leitidee'); if (i >= 0) return p.blocks[i + 1].text; }
  return '';
}

// ------------------------------------------------------------------------------------------
function furnishConcept(ctx, id) {
  const cfg = CFG[id], data = CONCEPT_DATA[id], P = data.plan, { add, abs, grp, M } = ctx;
  const rows = new Map(); for (const r of data.items) if (!rows.has(r.pos)) rows.set(r.pos, r);
  const row = (c) => rows.get(c);
  const prod = (c) => { const r = row(c); return r ? { retailer: r.retailer, name: `${r.name}${r.finish ? ' · ' + r.finish : ''}`, url: r.url, quantity: typeof r.qty === 'number' ? r.qty : 1, checked: `${r.pos} · ${eur(r.sum)} · ${r.delivery}`, price: r.sum, pos: r.pos } : null; };
  // decor textiles of the concept in the style material library (pillows, throws, bedding)
  const fab = (k, spec) => { if (!M[k] && spec) M[k] = K.tint(ctx, ...spec); return k; };
  for (const [k, spec] of Object.entries(cfg.pillows ?? {})) fab(k, spec);
  for (const [k, spec] of Object.entries(cfg.throws ?? {})) fab(k, spec);

  /** Registers one planned position: meta from the product list (name, finish, dims, price, link). */
  const put = (code, id2, room, cat, object, place, extra = {}) => {
    const codes = extra.codes ?? [code];
    const list = codes.map(prod).filter(Boolean), r = row(codes[0]);
    if (!object) return;
    const name = extra.name ?? (r ? `${r.qty > 1 ? r.qty + ' × ' : ''}${r.name}` : code);
    const spec = extra.spec ?? (r ? [r.finish, r.dims && `Maße ${r.dims}`, r.retailer, r.sum != null && `${eur(r.sum)}${r.qty > 1 ? ` (${r.qty} × ${eur(r.unit)})` : ''}`, r.delivery && `Lieferung ${r.delivery}`, r.note].filter(Boolean).join(' · ') : '');
    add({ id: id2, room, cat, name: `${codes[0].replace(/[a-d]$/, '')} · ${name}`, spec, products: list, code: codes[0].replace(/[a-d]$/, ''), ...extra.meta }, object, place);
  };
  const at = (code, dir, y = 0) => { const p = P[code]; return abs(p.x, p.y, typeof dir === 'number' ? dir : yawToward(p, DIR[dir] ?? dir), y); };
  const wallAt = (code, y = 0, inset = 0, room = null) => { const p = P[code], w = onWall(p.x, p.y, room); return abs(w.foot[0] + w.n[0] * inset, w.foot[1] + w.n[1] * inset, w.yaw, y); };
  /** Wall-standing furniture: plan centre, back parallel to the nearest wall. */
  const against = (code, depth, room = null, inset = 0) => { const p = P[code], w = onWall(p.x, p.y, room); const c = [w.foot[0] + w.n[0] * (depth / 2 + 0.005 + inset), w.foot[1] + w.n[1] * (depth / 2 + 0.005 + inset)]; const along = [w.wall.dir[0], w.wall.dir[1]]; const t = (p.x - c[0]) * along[0] + (p.y - c[1]) * along[1]; return abs(c[0] + along[0] * t, c[1] + along[1] * t, w.yaw); };
  const size = (code) => { const r = row(code.replace(/[a-d]$/, '')); return r?.size ?? null; };
  const S = (code, fallback) => { const s = size(code) ?? fallback; return [s[0], s[1], s[2] ?? fallback?.[2] ?? 0.5]; };

  // ============================================================ Wohnen
  const sofaS = S('W1', [2.38, 1.19, 0.68]);
  const W1 = cfg.W1, sofaPillows = W1.pillows.map((p) => fab(p, cfg.pillows[p]));
  put('W1', 'sofa', 'living', 'Polster', K[W1.m](ctx, { w: sofaS[0], d: sofaS[1], h: sofaS[2], fabric: W1.fabric, pillows: sofaPillows, throwMat: W1.throwMat }), at('W1', 'N'),
    { codes: ['W1', 'W9', 'W23', 'W10', 'W11'].filter(row), meta: { size: sofaS.slice(0, 2) } });

  // coffee table(s)
  const W2 = cfg.W2;
  if (id === 'travertin') {
    put('W2', 'coffee', 'living', 'Tisch', K.travertineBlockTable(ctx, { w: 0.8, d: 0.7, h: 0.35 }), at('W2', 'N'), { meta: { size: [0.8, 0.7] } });
    add({ id: 'coffee-2', room: 'living', cat: 'Tisch', name: 'W2 · Distinct Grande Duo – zweiter Tisch 70 × 53 × 23', spec: 'Travertin beige, massiv, weiche Kanten; versetzt mittig vor dem Sofa', size: [0.53, 0.7], products: [] },
      grp([K.travertineBlockTable(ctx, { w: 0.53, d: 0.7, h: 0.23 })], [K.D.bookStack(ctx.productM, 2, { seed: 8, w: 0.22, d: 0.3 }), 0, 0.23, 0]), at('W2b', 'N'));
  } else {
    const s = S('W2', [1.0, 0.55, 0.35]);
    const tbl = W2 === 'burl' ? K.burlTable(ctx, { w: s[0], d: s[1], h: s[2] }) : W2 === 'distinct' ? K.C.distinctTable(ctx.productM, { mat: 'travertineVein' }) : K.monolithTable(ctx, { w: s[0], d: s[1], h: s[2] });
    const props = id === 'ivory'
      ? [[K.D.tray(ctx.productM, 'travertineVein', 0.3, 0.3), -0.22, s[2], 0.0], [K.D.candle(ctx.productM, 0.17, 0.02), -0.27, s[2] + 0.006, -0.05], [K.D.candle(ctx.productM, 0.12, 0.02), -0.18, s[2] + 0.006, 0.05], [K.D.bookStack(ctx.productM, 2, { seed: 3, w: 0.34, d: 0.26 }), 0.22, s[2], 0.0], [K.D.bowl(ctx.productM, 'marble', 0.16, 0.08), 0.22, s[2] + 0.06, 0.0]]
      : [[K.D.bookStack(ctx.productM, 2, { seed: 8, w: 0.3, d: 0.22 }), 0.2, s[2], 0], [K.D.vase(ctx.productM, 'bottle', 'stonewareCharcoal', 0.8), -0.2, s[2], 0]];
    put('W2', 'coffee', 'living', 'Tisch', grp([tbl], ...props), at('W2', 'N'), { codes: ['W2', 'W25', 'W27', 'W28', 'W29'].filter(row), meta: { size: s.slice(0, 2) } });
  }

  // TV wall: slat field (W18) flush from the west corner of W11, TV on the slats, lowboard below
  const sl = P.W18, slw = onWall(sl.x, sl.y, 'living');
  put('W18', 'tv-wall', 'living', 'Wand', K.slats(ctx, { w: 2.4, wood: cfg.slat[0], color: cfg.slat[1] }), abs(slw.foot[0], slw.foot[1], slw.yaw), { meta: { size: [2.4, 0.036], anchor: 'back' } });
  const tvw = onWall(P.TV.x, P.TV.y, 'living');
  add({ id: 'tv', room: 'living', cat: 'Technik', name: 'TV 65″ auf dem Lamellenfeld', spec: `Bestand / nicht im Budget; Wandhalter mit Abstandshaltern durch die Lamellen, Kabel durch das Lowboard; TV-Mitte ${cfg.tv.toFixed(2).replace('.', ',')} m`, size: [1.46, 0.03], plan: false },
    K.F.frameTV(ctx.M, { inch: 65, bezel: 'matteBlack', art: false }), abs(tvw.foot[0] + tvw.n[0] * 0.052, tvw.foot[1] + tvw.n[1] * 0.052, tvw.yaw, cfg.tv));
  const lbS = S('W3', [1.8, 0.45, 0.55]);
  const lb = K.cabinet(ctx, { w: lbS[0], d: lbS[1], h: lbS[2], ...cfg.W3 });
  const W17 = P.W17, lampOnLb = K.tableLamp(ctx, { kind: cfg.W17, metal: cfg.metal });
  const lbPlace = against('W3', lbS[1], 'living', 0.037); // in front of the slat field
  // lamp position along the lowboard from the plan
  const lbLocal = (pt) => { const dx = pt.x - lbPlace.pos[0], dy = pt.y - lbPlace.pos[1], c = Math.cos(lbPlace.yaw), s2 = Math.sin(lbPlace.yaw); return [dx * c - dy * s2, -(dx * s2 + dy * c)]; };
  const [lx] = lbLocal(W17);
  const lbProps = [[lampOnLb, lx, lbS[2], 0]];
  if (id === 'ivory') lbProps.push([K.D.vase(ctx.productM, 'moon', 'stonewareSand', 1.1), lbS[0] / 2 - 0.25, lbS[2], 0], [K.D.branches(ctx.productM, { h: 0.6, seed: 7 }), lbS[0] / 2 - 0.25, lbS[2] + 0.28, 0]);
  else lbProps.push([K.D.bookStack(ctx.productM, 3, { seed: 11 }), lbS[0] / 2 - 0.35, lbS[2], 0]);
  put('W3', 'lowboard', 'living', 'Möbel', grp([lb], ...lbProps), lbPlace, { codes: ['W3', 'W17', 'W26'].filter(row), meta: { size: lbS.slice(0, 2) } });

  // armchair Sofia + side table + reading light
  const arS = S('W4', [0.97, 0.9, 0.72]);
  put('W4', 'lounge', 'living', 'Polster', grp([K.armchairSofia(ctx, { w: arS[0], d: arS[1], h: arS[2], fabric: cfg.W4 })], [(() => { const k = K.T.cushion(ctx.M, sofaPillows[0], [0.42, 0.42, 0.14]); k.rotation.x = -0.3; return k; })(), 0, 0.58, -0.18]), at('W4', 'W'), { meta: { size: arS.slice(0, 2) } });
  const sideS = S('W5', [0.35, 0.35, 0.5]);
  const side = cfg.W5 === 'componibili' ? K.componibili(ctx, { dia: sideS[0], h: sideS[2] }) : K.drumSide(ctx, { dia: sideS[0], h: sideS[2], mat: cfg.W5.mat, color: cfg.W5.color ?? null });
  put('W5', 'side-table', 'living', 'Tisch', side, at('W5', 0), { meta: { size: [sideS[0], sideS[0]], round: true } });
  const flS = row('W6'), flH = (flS?.dims.match(/H\s*([\d,]+)/)?.[1] ?? '150').replace(',', '.') / 100;
  put('W6', 'floorlamp-living', 'living', 'Leuchte', K.floorLamp(ctx, { kind: cfg.W6, h: flH }), at('W6', 'W'), { meta: { size: [0.36, 0.36], round: true } });
  put('W7', 'pendant-living', 'living', 'Leuchte', cfg.W7 === 'eloise' ? K.ceilingLamp(ctx, { kind: 'eloise', dia: 0.4, h: 0.15 }) : K.pendant(ctx, { kind: 'globe', dia: 0.45, bottom: 2.1 }), at('W7', 0), { meta: { size: [0.45, 0.45], round: true, plan: false } });

  // rug, art, plant, vitrine
  const rug = (code, idd, roomId, color, rnd = false) => { const s = S(code, [2, 3]); const p = P[code]; const along = p.w >= p.h; put(code, idd, roomId, 'Textil', K.rug(ctx, { w: rnd ? s[0] : (along ? Math.max(s[0], s[1]) : Math.min(s[0], s[1])), d: rnd ? s[0] : (along ? Math.min(s[0], s[1]) : Math.max(s[0], s[1])), round: rnd, color, relief: cfg.relief }), abs(p.x, p.y, -p.a * DEG), { meta: { size: rnd ? [s[0], s[0]] : [p.w, p.h], plan: 'soft', round: rnd } }); };
  rug('W8', 'rug-living', 'living', cfg.W8);
  const W19 = cfg.W19, aS = S('W19', [0.92, 0.03, 1.2]), aw = row('W19').dims.match(/B\s*(\d+)\s*×\s*H\s*(\d+)/);
  const [artW, artH] = aw ? [aw[1] / 100, aw[2] / 100] : [aS[0], 1.2];
  put('W19', 'art-living', 'living', 'Kunst', K.art(ctx, { w: artW, h: artH, palette: W19.palette, frame: W19.frame, style: W19.style, seed: 4 }), wallAt('W19', 0.95 + artH / 2, 0.022, 'living'), { meta: { size: [artW, 0.04], plan: false } });
  if (cfg.W20 === 'hourglass') put('W20', 'plant-living', 'living', 'Pflanze', K.hourglassPlant(ctx, { height: 1.8 }), at('W20', 0), { codes: ['W20', 'W24'], meta: { size: [0.4, 0.4], round: true } });
  else put('W20', 'plant-living', 'living', 'Pflanze', K.plant(ctx, { height: 1.7, potR: 0.16, potH: 0.34, potColor: cfg.W20.pot, model: 'pachira', maxR: 0.42 }), at('W20', 0), { meta: { size: [0.32, 0.32], round: true } });
  const vS = S('W21', [0.85, 0.4, 1.7]), W21 = cfg.W21;
  const vit = W21.kind === 'tylko' ? K.tylko(ctx, { w: vS[0], d: vS[1], h: vS[2], color: W21.color }) : K.vitrine(ctx, { w: vS[0], d: vS[1], h: vS[2], kind: W21.kind, color: W21.color });
  if (W21.kind === 'tylko') ctx.helpers.styleShelf(ctx.M, ctx.lib, vit, vit.userData.shelves, vS[0] - 0.08, { bowl: cfg.metal === 'brass' ? 'brassBrushed' : 'stonewareCharcoal', vase: 'stonewareSand' });
  put('W21', 'highboard', 'living', 'Möbel', vit, against('W21', vS[1], 'living'), { meta: { size: vS.slice(0, 2) } });

  // ============================================================ Essen
  const tS = S('E1', [1.2, 1.2, 0.75]), E1 = cfg.E1;
  const tableProps = id === 'ivory'
    ? [[K.D.bowl(ctx.productM, 'stonewareSand', 0.2, 0.12), 0, tS[2], 0], [K.D.candle(ctx.productM, 0.07, 0.03), 0.26, tS[2], 0.05], [K.D.candle(ctx.productM, 0.07, 0.03), 0.3, tS[2] + 0.07, 0.0]]
    : [[K.D.vase(ctx.productM, 'amphora', id === 'espresso' ? 'stonewareCharcoal' : 'stonewareSand', 0.8), 0.05, tS[2], 0.02], [K.D.branches(ctx.productM, { h: 0.5, seed: 5 }), 0.05, tS[2] + 0.3, 0.02]];
  put('E1', 'dining', 'living', 'Tisch', grp([K.diningRound(ctx, { dia: tS[0], h: tS[2], ...E1 })], ...tableProps), at('E1', 0), { codes: ['E1', 'E10', 'E11'].filter((c) => row(c) && (c === 'E1' || id === 'ivory')), meta: { size: [tS[0], tS[0]], round: true } });
  const chS = S('E2', [0.58, 0.54, 0.8]), ch = cfg.chair, tc = [P.E1.x, P.E1.y];
  ['E2a', 'E2b', 'E2c', 'E2d'].forEach((c, i) => {
    const p = P[c]; const dir = [tc[0] - p.x, tc[1] - p.y];
    const obj = K[ch.m](ctx, { w: chS[0], d: chS[1], h: chS[2], fabric: ch.fabric, wood: ch.wood, leather: ch.leather });
    put('E2', `chair-${i + 1}`, 'living', 'Polster', obj, abs(p.x, p.y, Math.atan2(dir[0], dir[1])), { name: `${row('E2').name} (${i + 1}/4)`, meta: { size: chS.slice(0, 2), allow: ['dining'] } });
  });
  put('E12', 'niche-chair', 'living', 'Polster', K[ch.m](ctx, { w: chS[0], d: chS[1], h: chS[2], fabric: ch.fabric, wood: ch.wood, leather: ch.leather }), at('E12', 'S'), { meta: { size: chS.slice(0, 2) } });
  rug('E9', 'rug-dining', 'living', cfg.E9, true);
  if (cfg.pendant === 'kushi') put('E3', 'pendant-dining', 'living', 'Leuchte', K.pendant(ctx, { kind: 'kushi', bottom: tS[2] + 0.65, offsets: [[0.14, 0.0, tS[2] + 0.65], [-0.07, 0.12, tS[2] + 0.72], [-0.07, -0.12, tS[2] + 0.8]] }), abs(P.E1.x, P.E1.y, -P.E1.a * DEG), { meta: { size: [0.4, 0.4], round: true, plan: false } });
  else put('E3', 'pendant-dining', 'living', 'Leuchte', K.pendant(ctx, { kind: cfg.pendant, dia: cfg.pendant === 'semi' ? 0.47 : 0.4, bottom: tS[2] + 0.67 }), abs(P.E1.x, P.E1.y, 0), { meta: { size: [0.45, 0.45], round: true, plan: false } });
  const sbS = S('E4', [1.6, 0.45, 0.75]);
  const sbPlace = against('E4', sbS[1], 'living');
  const sbLocal = (pt) => { const dx = pt.x - sbPlace.pos[0], dy = pt.y - sbPlace.pos[1], c = Math.cos(sbPlace.yaw), s2 = Math.sin(sbPlace.yaw); return dx * c - dy * s2; };
  const sbProps = [[K.tableLamp(ctx, { kind: cfg.E6, metal: cfg.metal }), sbLocal(P.E6), sbS[2], -0.04]];
  if (P.E8) sbProps.push([K.plant(ctx, { height: 0.5, potR: 0.12, potH: 0.26, potColor: '#a7b59e', model: 'calatheaSmall', shape: 'cylinder', maxR: 0.2 }), sbLocal(P.E8), sbS[2], 0]);
  else if (id === 'ivory') sbProps.push([K.D.vase(ctx.productM, 'amphora', 'stonewareSand', 1.2), -sbS[0] / 2 + 0.25, sbS[2], 0], [K.D.branches(ctx.productM, { h: 0.7, spread: 0.45, seed: 9, leaves: false }), -sbS[0] / 2 + 0.25, sbS[2] + 0.42, 0], [K.D.bookStack(ctx.productM, 1, { seed: 15, w: 0.23, d: 0.3 }), sbS[0] / 2 - 0.45, sbS[2], 0]);
  else sbProps.push([K.D.vase(ctx.productM, 'moon', 'stonewareSand', 0.9), -sbS[0] / 2 + 0.3, sbS[2], 0]);
  put('E4', 'sideboard', 'living', 'Möbel', grp([K.cabinet(ctx, { w: sbS[0], d: sbS[1], h: sbS[2], ...cfg.E4 })], ...sbProps), sbPlace, { codes: ['E4', 'E6', 'E8', 'E13', 'E15'].filter(row), meta: { size: sbS.slice(0, 2) } });
  // art above the sideboard (pair in a profile frame in concept 1)
  const E7 = cfg.E7;
  if (P.E7a) {
    for (const [c, k] of [['E7a', 1], ['E7b', 2]]) put('E7', `art-dining-${k}`, 'living', 'Kunst', K.art(ctx, { w: E7.w, h: E7.h, palette: E7.palette, frame: E7.frame, style: E7.style, seed: 10 + k }), wallAt(c, E7.y, 0.022, 'living'), { name: `${row('E7').name} (${k}/2)`, meta: { size: [E7.w, 0.04], plan: false } });
    const mid = { x: (P.E7a.x + P.E7b.x) / 2, y: (P.E7a.y + P.E7b.y) / 2 }, w = onWall(mid.x, mid.y, 'living');
    put('E10', 'frame-dining', 'living', 'Wand', K.D.boiserie(ctx.M, { w: 1.4, fields: [[0, 1.4, 0.95, 1.95]] }), abs(w.foot[0] - w.wall.dir[0] * 0.7, w.foot[1] - w.wall.dir[1] * 0.7, w.yaw), { codes: ['E10', 'E11'], meta: { size: [1.4, 0.02], plan: false } });
  } else if (P.E7) put('E7', 'art-dining', 'living', 'Kunst', K.art(ctx, { w: E7.w, h: E7.h, palette: E7.palette, frame: E7.frame ?? '#3a2b22', style: E7.style, seed: 12, float: !!E7.frame }), wallAt('E7', E7.y, 0.022, 'living'), { meta: { size: [E7.w, 0.04], plan: false } });
  put('E5', 'sconce-dining', 'living', 'Leuchte', K.wallLamp(ctx, { kind: cfg.E5 === 'mabell' ? 'mabell' : 'ic', metal: cfg.metal }), wallAt('E5', 1.8, 0, 'living'), { meta: { size: [0.28, 0.2], plan: false } });

  // ============================================================ Diele
  const F1 = cfg.F1;
  put('F1', 'hall-wardrobe', 'living', 'Möbel', K.pax(ctx, { w: 1.5, d: 0.35, doors: 3, front: F1.front, frontWood: F1.wood, filler: F1.filler }), against('F1', 0.37, 'living'), { codes: ['F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F17'].filter(row), name: `PAX Garderobe 150 × 35 × 236 + 3 × TONSTAD + Deckenblende`, meta: { size: [1.5, 0.37] } });
  const shS = S('F15', [0.49, 0.28, 1.35]);
  put('F15', 'shoe-cabinet', 'living', 'Möbel', K.shoeCabinet(ctx, { w: shS[0], d: shS[1], h: shS[2], kind: cfg.F15 }), against('F15', shS[1], 'living'), { meta: { size: shS.slice(0, 2) } });
  const cS = S('F7', [1.1, 0.4, 0.8]), F7 = cfg.F7, cPlace = against('F7', cS[1], 'living');
  const cLocal = (pt) => { const dx = pt.x - cPlace.pos[0], dy = pt.y - cPlace.pos[1], c = Math.cos(cPlace.yaw), s2 = Math.sin(cPlace.yaw); return dx * c - dy * s2; };
  const cProps = [[K.tableLamp(ctx, { kind: cfg.F9, metal: cfg.metal }), cLocal(P.F9), cS[2], 0]];
  if (P.F11) cProps.push([K.plant(ctx, { height: 0.45, potR: 0.12, potH: 0.26, potColor: '#a7b59e', model: 'calatheaSmall', shape: 'cylinder', maxR: 0.18 }), cLocal(P.F11), cS[2], 0]);
  if (id === 'ivory') cProps.push([K.D.tray(ctx.productM, 'travertineVein', 0.3, 0.15), 0.25, cS[2], 0], [K.D.vase(ctx.productM, 'moon', 'stonewareSand', 1.1), 0.3, cS[2] + 0.006, 0.0], [K.D.branches(ctx.productM, { h: 0.55, seed: 3 }), 0.3, cS[2] + 0.3, 0]);
  else if (id !== 'travertin') cProps.push([K.D.bowl(ctx.productM, 'stonewareCharcoal', 0.12, 0.05), 0.3, cS[2], 0]);
  put('F7', 'console', 'living', 'Möbel', grp([K.console_(ctx, { w: cS[0], d: cS[1], h: cS[2], kind: F7.kind, top: F7.top, topColor: F7.topColor ?? null })], ...cProps), cPlace, { codes: ['F7', 'F9', 'F11', 'F18'].filter(row), meta: { size: cS.slice(0, 2) } });
  const F8 = cfg.F8;
  put('F8', 'mirror-hall', 'living', 'Deko', K.mirror(ctx, { kind: F8.kind, w: F8.w, h: F8.h }), wallAt('F8', F8.y, 0.012, 'living'), { meta: { size: [F8.w, 0.03], plan: false } });
  if (id === 'travertin') { const w = onWall(P.F8.x, P.F8.y, 'living'); put('F16', 'frame-hall', 'living', 'Wand', K.D.boiserie(ctx.M, { w: 1.3, fields: [[0, 1.3, 0.9, 2.1]] }), abs(w.foot[0] - w.wall.dir[0] * 0.65, w.foot[1] - w.wall.dir[1] * 0.65, w.yaw), { meta: { size: [1.3, 0.02], plan: false } }); }
  ['F10a', 'F10b', 'F10c'].forEach((c, i) => put('F10', `ceiling-hall-${i + 1}`, 'living', 'Leuchte', K.ceilingLamp(ctx, { kind: cfg.ceiling, canopy: cfg.ceiling === 'vanja' ? 'steel' : 'blackMatte' }), at(c, 0), { name: `${row('F10').name} (${i + 1}/3)`, meta: { size: [0.2, 0.2], round: true, plan: false } }));

  // ============================================================ Schlafen
  const bS = S('S1', [1.96, 2.22, 1.1]), S1 = cfg.S1;
  const bedding = fab(`bed-${id}`, S1.bedding), accent = fab(`bedAccent-${id}`, S1.accent), throwB = fab(`bedThrow-${id}`, S1.throwC);
  const bPillows = S1.pillows.map((p) => fab(p, cfg.pillows[p]));
  const bp = P.S1, bw = onWall(bp.x, bp.y, 'bedroom'), bcen = [bw.foot[0] + bw.n[0] * (bS[1] / 2 + 0.005), bw.foot[1] + bw.n[1] * (bS[1] / 2 + 0.005)];
  const tb = [bw.wall.dir[0], bw.wall.dir[1]], tt = (bp.x - bcen[0]) * tb[0] + (bp.y - bcen[1]) * tb[1];
  put('S1', 'bed', 'bedroom', 'Bett', K.bedDream(ctx, { w: bS[0], d: bS[1], h: bS[2], fabric: S1.fabric, bedding, accent, throwMat: throwB, pillows: bPillows }), abs(bcen[0] + tb[0] * tt, bcen[1] + tb[1] * tt, bw.yaw),
    { codes: ['S1', 'S3', 'S13', 'S14', 'S15', 'S19'].filter(row), meta: { size: [bS[0], bS[1]] } });
  const nS = S('S4', [0.45, 0.45, 0.52]);
  ['S4a', 'S4b'].forEach((c, i) => {
    const obj = K.nightstand(ctx, { w: nS[0], d: nS[1], h: nS[2], kind: cfg.S4 });
    put('S4', `nightstand-${i ? 's' : 'n'}`, 'bedroom', 'Möbel', grp([obj], [K.tableLamp(ctx, { kind: cfg.S5, metal: cfg.metal }), 0, nS[2], -0.02]), against(c, nS[1], 'bedroom'), { codes: ['S4', 'S5'], name: `${row('S4').name} (${i + 1}/2)`, meta: { size: nS.slice(0, 2) } });
  });
  ['S6a', 'S6b'].forEach((c, i) => put('S6', `ceiling-bed-${i + 1}`, 'bedroom', 'Leuchte', cfg.bedCeiling === 'svep' ? K.ceilingLamp(ctx, { kind: 'svep', dia: 0.45, h: 0.18 }) : K.ceilingLamp(ctx, { kind: cfg.ceiling, canopy: cfg.ceiling === 'vanja' ? 'steel' : 'blackMatte' }), at(c, 0), { name: `${row('S6').name} (${i + 1}/2)`, meta: { size: [0.2, 0.2], round: true, plan: false } }));
  put('S7', 'wardrobe', 'bedroom', 'Möbel', K.pax(ctx, { w: 3.0, d: 0.58, doors: 6, front: F1.front, frontWood: F1.wood, filler: id === 'espresso' ? '#5e4232' : F1.filler }), against('S7', 0.6, 'bedroom'),
    { codes: ['S7', 'S8', 'S9', 'S10', 'S11', 'S21'].filter(row), name: 'PAX Schrankwand 300 × 58 × 236 + 6 × TONSTAD + Deckenblende', meta: { size: [3.0, 0.6] } });
  rug('S12', 'rug-bed', 'bedroom', cfg.S12);
  if (row('S23')) put('S23', 'art-bed', 'bedroom', 'Kunst', K.art(ctx, { w: 1.5, h: 1.0, palette: ['#f5f2ec', '#2e4f7a', '#7f9cc0', '#e3d6bf', '#ffffff'], frame: '#efe9de', style: 'strokes', seed: 23, float: false }), abs(bw.foot[0] + bw.n[0] * 0.02 + tb[0] * tt, bw.foot[1] + bw.n[1] * 0.02 + tb[1] * tt, bw.yaw, 1.1 + 0.2 + 0.5), { meta: { size: [1.5, 0.03], plan: false } });

  // ============================================================ Arbeit / Gast
  const eS = S('A1', [1.8, 1.0, 0.7]);
  put('A1', 'sofabed', 'office', 'Polster', K.sofaBedEliot(ctx, { w: eS[0], d: eS[1], h: eS[2], fabric: cfg.A1.fabric, pillows: cfg.A1.pillows.map((p) => fab(p, cfg.pillows[p])) }), against('A1', eS[1], 'office'), { codes: ['A1', 'A10'], meta: { size: eS.slice(0, 2) } });
  const dS = S('A2', [1.2, 0.6, 0.75]), dPlace = against('A2', 0.6, 'office');
  const dLocal = (pt) => { const dx = pt.x - dPlace.pos[0], dy = pt.y - dPlace.pos[1], c = Math.cos(dPlace.yaw), s2 = Math.sin(dPlace.yaw); return dx * c - dy * s2; };
  put('A2', 'desk', 'office', 'Tisch', grp([K.desk(ctx, { w: 1.2, d: 0.6, h: 0.75, kind: cfg.A2 })], [K.tableLamp(ctx, { kind: cfg.A6, metal: cfg.metal }), dLocal(P.A6), 0.75, -0.12], [ctx.helpers.laptop(ctx.M), 0.05, 0.75, 0.02]), dPlace, { codes: ['A2', 'A6'], meta: { size: [1.2, 0.6] } });
  void dS;
  put('A3', 'task-chair', 'office', 'Polster', cfg.A3 === 'lucie' ? K.chairLucie(ctx, {}) : K.chairHattefjall(ctx, {}), at('A3', 'E'), { meta: { size: [0.62, 0.62], round: true } });
  // A12: Glas-Bodenschutzmatte 120 × 90 unter dem Drehstuhl (schützt die Natureiche-Dielen)
  const mat = new ctx.THREE.Group(); const gm = ctx.box(mat, ctx.productM.glass, [0.9, 0.004, 1.2], [0, 0.002, 0]); gm.castShadow = false;
  put('A12', 'floor-mat', 'office', 'Textil', mat, at('A3', 'E'), { meta: { size: [0.9, 1.2], plan: 'soft' } });
  const shelfS = S('A4', [0.8, 0.28, 2.37]);
  let shelf;
  if (cfg.A4 === 'billy') shelf = K.billy(ctx, {});
  else shelf = K.tylko(ctx, { w: shelfS[0], d: shelfS[1], h: shelfS[2], color: cfg.A4color, cols: 1, doorsH: 0.6 });
  ctx.helpers.styleShelf(ctx.M, ctx.lib, shelf, (shelf.userData.shelves ?? []).filter((y) => y > 0.5 && y < 2.2), shelfS[0] - 0.08, { bowl: cfg.metal === 'brass' ? 'brassBrushed' : 'stonewareCharcoal', vase: 'stonewareSand' });
  put('A4', 'shelving', 'office', 'Möbel', shelf, against('A4', cfg.A4 === 'billy' ? 0.28 : shelfS[1], 'office'), { codes: ['A4', 'A11', 'A13', 'A14', 'A15'].filter(row), meta: { size: [shelfS[0], cfg.A4 === 'billy' ? 0.28 : shelfS[1]] } });
  put('A7', 'ceiling-office', 'office', 'Leuchte', K.ceilingLamp(ctx, { kind: cfg.ceiling, canopy: cfg.ceiling === 'vanja' ? 'steel' : 'blackMatte' }), at('A7', 0), { meta: { size: [0.2, 0.2], round: true, plan: false } });

  // ============================================================ Kochen, HWR, Balkone
  const kl = cfg.kitchenLamp === 'gasgrund' ? () => K.ceilingLamp(ctx, { kind: 'gasgrund', dia: 0.3, h: 0.11 }) : () => K.ceilingLamp(ctx, { kind: 'lido' });
  put('K1', 'ceiling-kitchen', 'kitchen', 'Leuchte', kl(), at('K1', 0), { meta: { size: [0.3, 0.3], round: true, plan: false } });
  put('H2', 'ceiling-utility', 'utility', 'Leuchte', kl(), at('H2', 0), { meta: { size: [0.3, 0.3], round: true, plan: false } });
  ['H1a', 'H1b'].forEach((c, i) => put('H1', `utility-shelf-${i + 1}`, 'utility', 'Möbel', K.boaxel(ctx, {}), against(c, 0.4, 'utility'), { name: `${row('H1').name} (${i + 1}/2)`, meta: { size: [0.62, 0.4] } }));
  put('B1', 'b2-table', 'balcony2', 'Outdoor', grp([K.outdoor(ctx, { kind: 'hirayTable', w: 0.65, d: 0.65, h: 0.72 })], [K.D.vase(ctx.productM, 'bud', 'stonewareSage', 1), 0.05, 0.72, 0]), at('B1', 0), { meta: { size: [0.65, 0.65], round: true } });
  put('B2', 'b2-chair-1', 'balcony2', 'Outdoor', K.outdoor(ctx, { kind: 'hirayChair', w: 0.53, d: 0.55, h: 0.79 }), at('B2a', 'E'), { name: `${row('B2').name} (1/2)`, meta: { size: [0.53, 0.55], allow: ['b2-table'] } });
  put('B2', 'b2-chair-2', 'balcony2', 'Outdoor', K.outdoor(ctx, { kind: 'hirayChair', w: 0.53, d: 0.55, h: 0.79 }), at('B2b', 'W'), { name: `${row('B2').name} (2/2)`, meta: { size: [0.53, 0.55], allow: ['b2-table'] } });
  put('B3', 'b1-sofa', 'balcony1', 'Outdoor', K.outdoor(ctx, { kind: 'segeron', w: 1.52, d: 0.76, h: 0.76 }), (() => { const pl = at('B3', 'N'); pl.pos = [pl.pos[0], pl.pos[1] - 0.1]; return pl; })(), { meta: { size: [1.52, 0.76] } });

  // ============================================================ Vorhänge (VIDGA-Deckenschienen)
  const curtainRows = { living: ['W13', 'W14', 'W15'], hall: ['F12', 'F13', 'F14'], bedroom: ['S16', 'S17', 'S18'], office: ['A8', 'A9'] };
  const sets = [['W06', 0, 'living'], ['W06', 1, 'living'], ['W04', 0, 'living'], ['W03', 0, 'hall'], ['W21', 0, 'bedroom'], ['W21', 1, 'bedroom'], ['W27', 0, 'office'], ['W27', 1, 'office']];
  sets.forEach(([wid, i, key], k) => {
    const w = WALLS.find((x) => x.id === wid), o = w.openings[i], fr = ctx.frameOf(wid);
    const left = Math.max(0.03, o.u0 - 0.26), right = Math.min(w.length - 0.03, o.u1 + 0.26), span = right - left - 0.52;
    const codes = curtainRows[key].filter(row);
    put(codes[0], `curtain-${wid}-${i}`, w.room, 'Textil', K.curtains(ctx, span, { color: cfg.curtain, seed: k * 3 + 1, back: key === 'bedroom' ? cfg.curtainBack : null }), ctx.at(fr, (left + right) / 2, 0.09),
      { codes, meta: { size: [span + 0.52, 0.1], plan: false } });
  });
}

// ------------------------------------------------------------------------------------------
function makeStyle(id) {
  const cfg = CFG[id], data = CONCEPT_DATA[id];
  const finish = Object.fromEntries(Object.entries(FINISH).map(([k, v]) => [k, { ...v, ...(cfg.rooms[k] ? { wall: cfg.rooms[k] } : {}), ...(cfg.ceilings?.[k] ? { ceiling: cfg.ceilings[k] } : {}) }]));
  return {
    id, concept: true, data,
    label: cfg.label, short: cfg.short, claim: cfg.claim, lead: leadOf(data).replace(/\*\*/g, ''),
    moodboard: null, palette: paletteOf(data), materials: [], walls: [], lightPlan: [],
    theme: { id: 'concept-' + id, ...cfg.theme }, finish, wallOverride: cfg.overrides ?? {},
    decor: { panel: 'flat', lightMetal: 'brassBrushed', lightMetalName: '' },
    // the concept furnishes the hall, utility room, balconies, curtains and ceiling lights itself
    replaces: new Set(['hall', 'utility', 'balconies', 'curtains', 'pelmets', 'spots', 'sconce']),
    notes: notesOf(data),
    furnish: (ctx) => furnishConcept(ctx, id),
  };
}

export const CONCEPT_STYLES = Object.fromEntries(Object.keys(CFG).map((id) => [id, makeStyle(id)]));
