// Manufacturer research, 2026-09-28. Dimensions [width, depth, height] in metres.
// This catalogue is authoritative for purchased furniture in every style world.
const ikea = (name, size, path, finish) => ({ retailer: 'IKEA', name, size, url: `https://www.ikea.com/de/de/p/${path}/`, finish, checked: '2026-09-28' });
const westwing = (name, size, path, finish) => ({ retailer: 'Westwing', name, size, url: `https://www.westwing.de/${path}`, finish, checked: '2026-09-28' });
export const PRODUCTS = {
  alba: westwing('Alba Sofa (2-Sitzer)', [1.85, 1.14, 0.69], '2-seater-sofa-alba-beige-174244.html?simple=DEQ25WES97295-225246', 'Webstoff Beige; Sitzhöhe 43 cm'),
  mikkel: westwing('Mikkel Loungesessel', [0.66, 0.77, 0.79], 'boucle-loungesessel-mikkel-158923.html', 'Bouclé Off White, Gummibaumholz; Sitzhöhe 46 cm'),
  marisa: westwing('Marisa Couchtisch', [0.7, 0.7, 0.35], 'runder-couchtisch-marisa-aus-marmor-161281.html', 'Naturmarmor weiß-grau'),
  calary: westwing('Calary Sideboard', [1.6, 0.45, 0.75], 'holz-sideboard-calary-mit-geriffelter-front-147950.html', 'Dunkles Eichenholz, geriffelte Schiebetüren; Beine 17 cm'),
  zara: westwing('Zara Bürostuhl', [0.58, 0.59, 0.95], 'office-chair-zara-with-armrests-adjustable-height-en-25wes19323.html', 'Leder Hellbeige, Edelstahl; Höhe 85–95 cm'),
  desk: ikea('TONSTAD Schreibtisch', [1.4, 0.75, 0.75], 'tonstad-schreibtisch-elfenbeinweiss-70538200', 'Elfenbeinweiß'),
  night: ikea('TONSTAD Ablagetisch', [0.4, 0.4, 0.59], 'tonstad-ablagetisch-eichenfurnier-80489322', 'Eichenfurnier'),
  highboard: ikea('TONSTAD Bücherregal', [0.81, 0.371, 2.008], 'tonstad-buecherregal-elfenbeinweiss-10528464', 'Elfenbeinweiß'),
  bed: ikea('TÄLLÅSEN Bettgestell 180 × 200', [1.95, 2.13, 1.07], 'taellasen-bettgestell-gepolstert-kulsta-hellbeige-30572795', 'Kulsta Hellbeige; Matratze und Lattenrost separat'),
  sofabed: ikea('HYLTARP 2er-Bettsofa', [1.82, 0.93, 0.91], 'hyltarp-2er-bettsofa-kilanda-blassblau-s79489592', 'Kilanda Blassblau; Rückenstütze 82 cm, mit Kissen 91 cm; ausgeklappt 240 cm tief'),
  table: ikea('STOCKHOLM 2025 Esstisch', [1.15, 1.15, 0.75], 'stockholm-2025-tisch-eichenfurnier-eichenfurnier-s49579985', 'Eichenfurnier'),
  chair: ikea('LISABO Stuhl', [0.46, 0.51, 0.8], 'lisabo-stuhl-esche-00457235', 'Eschenfurnier und massive Birke; Sitzhöhe 45 cm'),
  pax: ikea('PAX Korpus', [0.998, 0.58, 2.364], 'pax-korpus-kleiderschrank-weiss-80458207', 'Weiß; offen, Türen und Inneneinrichtung separat'),
  forsand: ikea('FORSAND Tür', [0.495, 0.018, 2.294], 'forsand-tuer-weiss-60391091', 'Weiß; KOMPLEMENT Scharniere und Griffe separat'),
  floorlamp: ikea('ÅRSTID Standleuchte', [0.36, 0.36, 1.55], 'arstid-standleuchte-vernickelt-weiss-60163862', 'Vernickelt/Weiß; E27-Leuchtmittel separat'),
  hall: ikea('PAX Korpus flach', [0.998, 0.355, 2.364], 'pax-korpus-kleiderschrank-weiss-70458199', 'Weiß; offen, Inneneinrichtung separat'),
  billy: ikea('BILLY Bücherregal', [0.4, 0.28, 2.02], 'billy-buecherregal-weiss-50263838', 'Weiß'),
  utility: ikea('ENHET Hochschrank mit Tür', [0.3, 0.321, 1.8], 'enhet-hochschrank-mit-tuer-weiss-10623036', 'Weiß; Wandmontage'),
  ivar: ikea('IVAR Regal', [0.89, 0.3, 1.79], 'ivar-regal-kiefer-s89404578', 'Kiefer'),
  console: ikea('LACK Wandregal', [1.1, 0.26, 0.05], 'lack-wandregal-weiss-90282180', 'Weiß; Montagehöhe 91 cm'),
  besta: ikea('BESTÅ Korpus', [1.2, 0.4, 0.38], 'besta-korpus-weiss-60245844', 'Weiß; offene Fächer, Wandmontage 25 cm'),
  gladom: { ...ikea('GLADOM Beistelltisch', [0.45, 0.45, 0.53], 'gladom-tablettisch-schwarz-50411990', 'Schwarz; Stahl; nur innen'), url: 'https://www.ikea.com/de/en/p/gladom-tray-table-black-50411990/' },
  outdoor: ikea('NÄMMARÖ Sessel draußen', [0.69, 0.78, 0.69], 'naemmaroe-sessel-draussen-hellbraun-lasiert-40510306', 'Akazie hellbraun lasiert; Sitzhöhe 30 cm, Polster separat'),
  bistro: ikea('TÄRNÖ Tisch + 2 Stühle', [0.55, 0.54, 0.7], 'taernoe-tisch-2-stuehle-aussen-schwarz-hellbraun-lasiert-s69898415', 'Akazie/Stahl schwarz; Stühle je 39 × 40 × 79 cm'),
  stool: ikea('VILTO Badezimmerhocker', [0.4, 0.32, 0.25], 'vilto-badezimmerhocker-birke-60344453', 'Birke'),
  vanity: ikea('ENHET Waschbeckenschrank', [0.6, 0.4, 0.6], 'enhet-waschbeckenschrank-mit-boden-weiss-30440465', 'Weiß; offener Korpus'),
  laundry: { ...ikea('ENHET Wandschrank mit Tür', [0.6, 0.32, 0.75], 'enhet-wall-cabinet-with-door-white-40623025', 'Weiß; oberhalb des vorhandenen Waschtrockners'), url: 'https://www.ikea.com/de/en/p/enhet-wall-cabinet-with-door-white-40623025/' },
};

const SLOTS = { sofa: ['alba'], lounge: ['mikkel'], 'reading-chair': ['mikkel'], coffee: ['marisa'], 'coffee-2': ['gladom'], sideboard: ['calary'], highboard: ['highboard'], bed: ['bed'], 'nightstand-n': ['night'], 'nightstand-s': ['night'], wardrobe: ['pax', 3], sofabed: ['sofabed'], desk: ['desk'], 'task-chair': ['zara'], shelving: ['billy', 3], 'hall-wardrobe': ['hall', 2], console: ['console'], lowboard: ['besta', 2], 'utility-tall': ['utility', 2], 'utility-shelf': ['ivar'], 'b1-lounge-a': ['outdoor'], 'b1-lounge-b': ['outdoor'], 'b1-table': ['bistro'], 'b2-bistro': ['bistro'], 'stool-bath': ['stool'] };

/** Replace custom furniture with sourced pieces; keep measured wall anchors and circulation. */
export function catalogueFurniture(ctx, meta, original, placement) {
  const slot = SLOTS[meta.id] ?? (meta.id === 'side-table' ? ['gladom'] : meta.id === 'armchair-2' ? ['mikkel'] : /^floorlamp-/.test(meta.id) ? ['floorlamp'] : null);
  if (!slot && meta.id !== 'dining') {
    const part = meta.id === 'laundry' ? 'laundry' : /^vanity-/.test(meta.id) ? 'vanity' : null;
    return { meta: part ? { ...meta, name: part === 'laundry' ? 'Waschtrockner (Bestand) + IKEA ENHET Wandschrank' : 'Laufen VAL (Bestand) + IKEA ENHET Unterschrank', spec: `${PRODUCTS[part].finish} · ${PRODUCTS[part].size.map(x => x * 100).join(' × ')} cm; Anschlüsse nach HLS-Plan`, products: [{ ...PRODUCTS[part], quantity: 1 }] } : meta, object: typeof original === 'function' ? original() : original, placement };
  }
  const { C, THREE, box, boxOn } = ctx;
  // Purchased finishes must not inherit a theme's fictitious wood/fabric substitutions.
  const M = ctx.productM;
  const [key, quantity = 1] = slot ?? ['table'];
  const p = PRODUCTS[key], [w, d, h] = p.size;
  const g = new THREE.Group();
  const cabinet = (width, depth, height, mat = 'plasticWhite') => C.cabinet(M, { w: width, d: depth, h: height, legH: 0, mat, doors: 2 });
  switch (key) {
    case 'alba': g.add(C.sofa(M, { w, d, h, seatH: 0.43, kind: 'cloud', fabric: 'linenBeige', pillows: ['linenIvory', ctx.style.id === 'brutal' ? 'velvetMoss' : 'velvetSage'] })); break;
    case 'mikkel': g.add(C.armchair(M, { w, d, h, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakNatural', fabric: 'boucleOat' })); break;
    case 'marisa': g.add(C.drumTable(M, { dia: w, h, top: 'marble' })); break;
    case 'gladom':
      ctx.cyl(g, M.blackMatte, w / 2, w / 2, 0.018, [0, h - 0.018, 0]);
      for (const x of [-0.15, 0.15]) for (const z of [-0.15, 0.15]) boxOn(g, M.blackMatte, [0.012, h - 0.018, 0.012], [x, 0, z]); break;
    case 'calary': g.add(C.cabinet(M, { w, d, h, legH: 0.17, fronts: 'ribbed', mat: 'oakDark' })); break;
    case 'highboard': case 'billy': case 'ivar':
      for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 5, mat: key === 'ivar' ? 'oakNatural' : 'plasticWhite', back: key !== 'ivar' }); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); }
      break;
    case 'pax': case 'hall':
      for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 3, mat: 'plasticWhite' }); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); }
      for (let i = 0; i < quantity * 2; i++) boxOn(g, M.plasticWhite, [0.495, 2.294, 0.018], [(i - (quantity * 2 - 1) / 2) * 0.499, 0.07, d / 2 + 0.009]);
      break;
    case 'utility': for (let i = 0; i < quantity; i++) { const b = cabinet(w, d, h); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); } break;
    case 'besta': for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 1, mat: 'plasticWhite' }); b.position.set((i - (quantity - 1) / 2) * w, 0.25, 0); g.add(b); } break;
    case 'console': boxOn(g, M.plasticWhite, [w, h, d], [0, 0.91, 0]); g.add(ctx.grp([ctx.D.roundMirror(M, 0.8), 0, 1.58, -0.12])); break;
    case 'bed': g.add(C.bedModel(M, { outerW: w, outerL: d, headH: h, headT: 0.1, frame: 'linenBeige', throwMat: ctx.style.id === 'brutal' ? 'throwMoss' : 'throwSage' })); break;
    case 'night': g.add(C.sideBox(M, { w, d, h })); break;
    case 'desk': g.add(C.deskT(M, { w, d, h, mat: 'plasticWhite' })); g.add(ctx.grp([ctx.helpers.laptop(M), 0.05, h, 0.02])); break;
    case 'sofabed': {
      const blue = Object.create(M); blue.linenBlue = M.linenGrey.clone(); blue.linenBlue.color.set('#b8c5cf');
      g.add(C.sofaBed(blue, { w, d, h, fabric: 'linenBlue' })); break;
    }
    case 'zara': {
      const c = ctx.F.taskChair(M, { fabric: 'linenBeige' });
      c.traverse(o => { if (o.isMesh && o.material === M.bronzeDark) o.material = M.steel; });
      const bounds = new THREE.Box3().setFromObject(c).getSize(new THREE.Vector3());
      c.scale.set(w / bounds.x, h / bounds.y, d / bounds.z);
      g.add(c);
      for (const x of [-0.265, 0.265]) { boxOn(g, M.steel, [0.018, 0.17, 0.018], [x, 0.48, 0]); box(g, M.steel, [0.035, 0.02, 0.3], [x, 0.66, 0]); }
      break;
    }
    case 'floorlamp': {
      const l = ctx.D.floorLamp(M, { h });
      l.scale.x = l.scale.z = 0.36 / 0.455;
      l.traverse(o => { if (o.isMesh && o.material === M.bronze) o.material = M.steel; if (o.isMesh && o.material === M.marble) o.material = M.steel; });
      g.add(l); break;
    }
    case 'table': {
      g.add(C.roundTable(M, { dia: w, h, top: 'oakNatural', base: 'legs', baseMat: 'oakNatural' }));
      g.add(ctx.helpers.chairsAround(4, 0.72, () => {
        const c = new THREE.Group(), [cw, cd, ch] = PRODUCTS.chair.size;
        for (const x of [-cw / 2 + 0.025, cw / 2 - 0.025]) for (const z of [-cd / 2 + 0.025, cd / 2 - 0.025]) boxOn(c, M.oakNatural, [0.035, z < 0 ? ch - 0.1 : 0.435, 0.035], [x, 0, z]);
        boxOn(c, M.oakNatural, [0.44, 0.015, 0.39], [0, 0.435, 0.035]);
        boxOn(c, M.oakNatural, [cw, 0.16, 0.025], [0, ch - 0.16, -cd / 2 + 0.025]);
        return c;
      }));
      break;
    }
    case 'outdoor': {
      // Square slatted frame, manufacturer seat/arm heights; no fictitious teak finish.
      for (const x of [-w / 2 + 0.025, w / 2 - 0.025]) for (const z of [-d / 2 + 0.025, d / 2 - 0.025]) boxOn(g, M.teak, [0.05, 0.6, 0.05], [x, 0, z]);
      for (let i = 0; i < 7; i++) boxOn(g, M.teak, [w, 0.025, 0.09], [0, 0.275, -0.33 + i * 0.11]);
      for (let i = 0; i < 4; i++) box(g, M.teak, [w, 0.075, 0.025], [0, 0.35 + i * 0.1, -d / 2 + 0.025]);
      for (const x of [-w / 2 + 0.025, w / 2 - 0.025]) boxOn(g, M.teak, [0.05, 0.025, d], [x, 0.6, 0]); break;
    }
    case 'bistro': {
      boxOn(g, M.teak, [w, 0.025, d], [0, h - 0.025, 0]);
      for (const x of [-0.22, 0.22]) for (const z of [-0.2, 0.2]) boxOn(g, M.blackMatte, [0.018, h - 0.025, 0.018], [x, 0, z]);
      if (meta.id === 'b2-bistro') for (const sign of [-1, 1]) { const c = C.chair(M, { w: 0.39, d: 0.4, h: 0.79, seatH: 0.45, fabric: 'teak', frame: 'blackMatte' }); c.position.x = sign * 0.52; c.rotation.y = -sign * Math.PI / 2; g.add(c); }
      break;
    }
    case 'stool': boxOn(g, M.oakNatural, [w, 0.025, d], [0, h - 0.025, 0]); for (const x of [-0.16, 0.16]) for (const z of [-0.12, 0.12]) boxOn(g, M.oakNatural, [0.03, h - 0.025, 0.03], [x, 0, z]); break;
  }
  const size = key === 'table' ? [2.15, 2.15] : meta.id === 'b2-bistro' ? [1.44, 0.54] : [w * quantity, d + (['pax', 'hall'].includes(key) ? 0.018 : 0)];
  const place = { ...placement, pos: [...placement.pos] };
  // Preserve a cabinet's wall clearance, the sofa's back line and bed headboard position.
  const wallSlots = new Set(['sideboard', 'highboard', 'bed', 'nightstand-n', 'nightstand-s', 'wardrobe', 'hall-wardrobe', 'console', 'lowboard', 'utility-tall', 'utility-shelf', 'shelving', 'sofabed']);
  if (wallSlots.has(meta.id) || meta.id === 'sofa') {
    const delta = (size[1] - meta.size[1]) / 2;
    place.pos[0] += Math.sin(place.yaw) * delta; place.pos[1] += Math.cos(place.yaw) * delta;
  }
  if (meta.id === 'b1-table') place.pos = [12.25, 10.22];
  if (meta.id === 'b1-lounge-a') { place.pos = [11.6, 9.98]; place.yaw = 0; }
  if (meta.id === 'b1-lounge-b') { place.pos = [12.9, 9.98]; place.yaw = 0; }
  const products = [{ ...p, quantity: meta.id === 'b1-table' ? 1 : quantity }];
  if (key === 'table') products.push({ ...PRODUCTS.chair, quantity: 4 });
  if (['pax', 'hall'].includes(key)) products.push({ ...PRODUCTS.forsand, quantity: quantity * 2 });
  if (['pax', 'hall'].includes(key)) for (const child of g.children) child.position.z -= 0.009;
  if (['sideboard', 'coffee', 'nightstand-n', 'nightstand-s', 'dining'].includes(meta.id)) {
    const oldTop = new THREE.Box3().setFromObject(original.children[0]).max.y;
    for (const child of [...original.children].slice(meta.id === 'dining' ? 2 : 1)) {
      child.position.y += h - oldTop;
      g.add(child);
    }
  }
  const round = ['marisa', 'gladom', 'table'].includes(key);
  return { meta: { ...meta, name: `${p.retailer} ${p.name}${quantity > 1 ? ` (${quantity} ×)` : ''}${key === 'table' ? ' + 4 IKEA LISABO' : ''}`, spec: `${p.finish} · Herstellermaße ${p.size.map(x => Math.round(x * 1000) / 10).join(' × ')} cm${meta.id === 'b1-table' ? '; nur Tisch aus dem Set' : ''}`, size, round, products }, object: g, placement: place };
}
