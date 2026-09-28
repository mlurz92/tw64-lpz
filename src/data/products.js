// Manufacturer research, 2026-09-28. Dimensions [width, depth, height] in metres.
// This catalogue is authoritative for purchased furniture in every style world.
const ikea = (name, size, path, finish) => ({ retailer: 'IKEA', name, size, url: `https://www.ikea.com/de/de/p/${path}/`, finish, checked: '2026-09-28' });
const westwing = (name, size, path, finish) => ({ retailer: 'Westwing', name, size, url: `https://www.westwing.de/${path}`, finish, checked: '2026-09-28' });
export const PRODUCTS = {
  soderhamn: ikea('SÖDERHAMN 3er-Sofa', [1.98,.99,.83], 'soederhamn-3er-sofa-gunnared-beige-s79305423', 'Gunnared Beige; Sitzhöhe 40 cm'),
  lennon: westwing('Lennon Sofa (3-Sitzer)', [2.38,1.19,.68], 'modulares-sofa-lennon-3-sitzer-120821.html', 'Webstoff Grau; Sitzhöhe 43 cm'),
  wolke: westwing('Wolke Sofa (3-Sitzer)', [2.56,1.18,.65], 'modulares-sofa-wolke-3-sitzer-aus-boucle-159816.html', 'Bouclé Hellblau; Sitzhöhe 41 cm'),
  ekenaset: { ...ikea('EKENÄSET Sessel', [.64,.78,.76], 'ekenaeset-armchair-oak-gunnared-beige-60506898', 'Eiche/Gunnared Beige; Sitzhöhe 45 cm'), url: 'https://www.ikea.com/de/en/p/ekenaeset-armchair-oak-gunnared-beige-60506898/' },
  ekenasetBlack: { ...ikea('EKENÄSET Sessel', [.64,.78,.76], 'ekenaeset-armchair-jonsbyn-black-70539011', 'Dunkelbraunes Holz/Jonsbyn Schwarz; Sitzhöhe 45 cm'), url: 'https://www.ikea.com/de/en/p/ekenaeset-armchair-jonsbyn-black-70539011/' },
  hilda: westwing('Hilda Couchtisch', [1.02,1.02,.35], 'hilda-coffee-table-d1020-x-h350-mm-fsc-solid-oak-natural-en-26wes90276.html', 'Eiche natur'),
  calaryCoffee: westwing('Calary Couchtisch', [.8,.8,.30], 'calary-coffee-tables-round-s-light-oak-en-26wes67590.html', 'Helles Eichenholz; geriffelte Schiebetür'),
  sahra: westwing('Sahra Esstisch', [1.16,1.16,.75], 'runder-esstisch-sahra-o-116-cm-152091.html', 'Hellbeige lackiert; MDF/Fiberglas; Säulenfuß Ø 55 cm'),
  calaryTable: westwing('Calary Esstisch', [1,1,.75], 'runder-esstisch-calary-aus-eichenholz-150929.html', 'Dunkles Eichenholz; geriffelter Stauraumfuß'),
  stockholmSide: ikea('STOCKHOLM 2025 Sideboard', [1.608,.42,.832], 'stockholm-2025-sideboard-eichenfurnier-10586604', 'Eichenfurnier'),
  calaryBlack: westwing('Calary Sideboard', [1.6,.45,.75], 'holz-sideboard-calary-mit-geriffelter-front-137254.html', 'Mattschwarz; Eichenholz, geriffelte Schiebetüren'),
  rudsta: ikea('RUDSTA Vitrine', [.8,.37,1.2], 'rudsta-vitrine-anthrazit-50450137', 'Anthrazit; Stahl/Aluminium, Glasfront, Glasseiten und Glasböden'),
  bedGreen: ikea('TÄLLÅSEN Bettgestell 180 × 200', [1.95,2.13,1.07], 'taellasen-bettgestell-gepolstert-kulsta-graugruen-10538929', 'Kulsta Graugrün; Matratze und Lattenrost separat'),
  idanas: ikea('IDANÄS Polsterbett mit Aufbewahrung 180 × 200', [1.9,2.24,1.2], 'idanaes-bettgestell-gepolstert-mit-aufbew-naggen-beige-50588088', 'Naggen Beige; Matratze separat'),
  idanasGrey: ikea('IDANÄS Polsterbett mit Aufbewahrung 180 × 200', [1.9,2.24,1.2], 'idanaes-bettgestell-gepolstert-mit-aufbew-gunnared-dunkelgrau-80458976', 'Gunnared Dunkelgrau; Matratze separat'),
  nightBrown: ikea('TONSTAD Ablagetisch', [.4,.4,.59], 'tonstad-ablagetisch-braun-gebeiztes-eichenfurnier-40489319', 'Braun gebeiztes Eichenfurnier'),
  nightWhite: ikea('TONSTAD Ablagetisch', [.4,.4,.59], 'tonstad-ablagetisch-elfenbeinweiss-80510007', 'Elfenbeinweiß'),
  deskOak: ikea('TONSTAD Schreibtisch', [1.4,.75,.75], 'tonstad-schreibtisch-eichenfurnier-30538198', 'Eichenfurnier'),
  micke: ikea('MICKE Schreibtisch', [1.05,.5,.75], 'micke-schreibtisch-schwarzbraun-10244743', 'Schwarzbraun'),
  billyOak: ikea('BILLY Bücherregal', [.4,.28,2.02], 'billy-buecherregal-eichenachbildung-60477382', 'Eichenachbildung (Papierfolie)'),
  billyBlack: ikea('BILLY Bücherregal', [.4,.28,2.02], 'billy-buecherregal-schwarz-eichenachbildung-70477334', 'Schwarze Eichenachbildung (Papierfolie)'),
  sofabedBeige: ikea('HYLTARP 2er-Bettsofa', [1.82,.93,.91], 'hyltarp-2er-bettsofa-hemmesta-hellbeige-s49514871', 'Hemmesta Hellbeige; ausgeklappt 240 cm tief'),
  sofabedGrey: ikea('HYLTARP 2er-Bettsofa', [1.82,.93,.91], 'hyltarp-2er-bettsofa-gransel-grau-s99514859', 'Gransel Grau; ausgeklappt 240 cm tief'),
  bestaBlack: ikea('BESTÅ Korpus', [1.2,.4,.38], 'besta-korpus-schwarzbraun-70245952', 'Schwarzbraun; offene Fächer, Wandmontage 25 cm'),
  chairBlack: ikea('LISABO Stuhl', [.46,.51,.8], 'lisabo-stuhl-schwarz-60446786', 'Schwarz; Eschenfurnier/Birke; Sitzhöhe 45 cm'),
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

// Explicit SKU selections: a theme cannot recolour a purchased product into a fictional variant.
export const STYLE_PRODUCTS = {
  metallic: { sofa: 'alba', coffee: 'marisa', dining: 'sahra', bed: 'idanas', 'nightstand-n': 'nightBrown', 'nightstand-s': 'nightBrown', desk: 'deskOak', shelving: 'billyBlack', sofabed: 'sofabedBeige', lowboard: 'bestaBlack' },
  soft: { sofa: 'soderhamn', lounge: 'ekenaset', 'reading-chair': 'ekenaset', coffee: 'hilda', sideboard: 'stockholmSide', desk: 'deskOak', shelving: 'billyOak', sofabed: 'sofabedBeige' },
  brutal: { sofa: 'lennon', lounge: 'ekenasetBlack', 'reading-chair': 'ekenasetBlack', coffee: 'calaryCoffee', dining: 'calaryTable', sideboard: 'calaryBlack', bed: 'idanasGrey', 'nightstand-n': 'gladom', 'nightstand-s': 'gladom', desk: 'micke', shelving: 'billyBlack', sofabed: 'sofabedGrey', lowboard: 'bestaBlack', chair: 'chairBlack' },
  quiet: { sofa: 'wolke', sideboard: 'calaryBlack', bed: 'bedGreen', 'nightstand-n': 'nightWhite', 'nightstand-s': 'nightWhite', chair: 'chairBlack' },
};
export const styleProduct = (style, id) => PRODUCTS[id === 'highboard' ? 'rudsta' : STYLE_PRODUCTS[style]?.[id] ?? SLOTS[id]?.[0] ?? (id === 'dining' ? 'table' : id === 'chair' ? 'chair' : 'mikkel')];
const finishCache = new WeakMap();
function finishMaterial(base, name, color) {
  let variants = finishCache.get(base);
  if (!variants) finishCache.set(base, variants = new Map());
  const key = `${name}:${color}`;
  if (!variants.has(key)) {
    const m = base[name].clone(); m.color.set(color);
    // The photographed beige boucle albedo must not tint the researched light-blue SKU.
    if (name === 'boucle') m.map = null;
    if (m.sheenColor) m.sheenColor.copy(m.color).lerp(m.color.clone().setRGB(1,1,1),.25);
    variants.set(key,m);
  }
  return variants.get(key);
}

/** Replace custom furniture with sourced pieces; keep measured wall anchors and circulation. */
export function catalogueFurniture(ctx, meta, original, placement) {
  const slot = SLOTS[meta.id] ?? (meta.id === 'side-table' ? ['gladom'] : meta.id === 'armchair-2' ? ['mikkel'] : /^floorlamp-/.test(meta.id) ? ['floorlamp'] : null);
  if (!slot && meta.id !== 'dining') {
    const part = meta.id === 'laundry' ? 'laundry' : /^vanity-/.test(meta.id) ? 'vanity' : null;
    return { meta: part ? { ...meta, name: part === 'laundry' ? 'Waschtrockner (Bestand) + IKEA ENHET Wandschrank' : 'Laufen VAL (Bestand) + IKEA ENHET Unterschrank', spec: `${PRODUCTS[part].finish} · ${PRODUCTS[part].size.map(x => x * 100).join(' × ')} cm; Anschlüsse nach HLS-Plan`, products: [{ ...PRODUCTS[part], quantity: 1 }] } : meta, object: typeof original === 'function' ? original() : original, placement };
  }
  const { C, THREE, box, boxOn } = ctx;
  // Purchased finishes must not inherit a theme's fictitious wood/fabric substitutions.
  const M = Object.create(ctx.productM);
  if (meta.id === 'dining' && ctx.style.id === 'metallic') M.plasticBeige = finishMaterial(ctx.productM,'plasticWhite','#d8cdbb');
  const [defaultKey, quantity = 1] = slot ?? ['table'];
  const selected = meta.id === 'highboard' ? 'rudsta' : STYLE_PRODUCTS[ctx.style.id]?.[meta.id] ?? defaultKey;
  const p = PRODUCTS[selected], [w, d, h] = p.size;
  const aliases = { soderhamn:'alba', lennon:'alba', wolke:'alba', ekenaset:'mikkel', ekenasetBlack:'mikkel', hilda:'hilda', calaryCoffee:'calaryCoffee', sahra:'table', calaryTable:'table', stockholmSide:'calary', calaryBlack:'calary', bedGreen:'bed', idanas:'bed', idanasGrey:'bed', nightBrown:'night', nightWhite:'night', deskOak:'desk', micke:'micke', billyOak:'billy', billyBlack:'billy', sofabedBeige:'sofabed', sofabedGrey:'sofabed', bestaBlack:'besta' };
  const key = aliases[selected] ?? selected;
  const fabric = selected === 'wolke' ? 'productBlue' : selected === 'lennon' || selected === 'idanasGrey' ? 'productGrey' : selected === 'bedGreen' ? 'linenSage' : 'linenBeige';
  if (selected === 'lennon' || selected === 'idanasGrey') M.productGrey = finishMaterial(ctx.productM,'linenGrey',selected === 'idanasGrey' ? '#4b4c50' : '#aaa8a6');
  if (selected === 'wolke') M.productBlue = finishMaterial(ctx.productM,'boucle','#b8c5cf');
  if (selected === 'billyBlack' || selected === 'bestaBlack') M.oakDark = finishMaterial(ctx.productM,'oakDark','#302822');
  // IKEA's English German-market pages expose these exact researched SKUs.
  const wood = selected === 'billyBlack' || selected === 'bestaBlack' ? 'oakDark' : /Black/.test(selected) ? 'blackMatte' : selected === 'nightBrown' ? 'oakDark' : 'oakNatural';
  const g = new THREE.Group();
  const cabinet = (width, depth, height, mat = 'plasticWhite') => C.cabinet(M, { w: width, d: depth, h: height, legH: 0, mat, doors: 2 });
  switch (key) {
    case 'alba': g.add(C.sofa(M, { w, d, h, seatH: selected === 'soderhamn' ? .4 : selected === 'wolke' ? .41 : .43, kind: selected === 'soderhamn' ? 'slim' : selected === 'lennon' ? 'block' : 'cloud', seats: selected === 'alba' || selected === 'soderhamn' ? 2 : 3, arm: selected === 'soderhamn' ? .06 : selected === 'lennon' ? .32 : .2, legs: selected === 'soderhamn' ? 'steel' : null, fabric, pillows: ['linenIvory', ctx.style.id === 'brutal' ? 'velvetMoss' : 'velvetSage'] })); break;
    case 'mikkel': g.add(C.armchair(M, { w, d, h, seatH: selected === 'mikkel' ? .46 : .45, armH: selected === 'mikkel' ? .58 : .63, arms: selected === 'mikkel' ? 'upholstered' : 'wood', wood: selected === 'ekenasetBlack' ? 'oakDark' : 'oakNatural', fabric: selected === 'mikkel' ? 'boucle' : selected === 'ekenasetBlack' ? 'blackMatte' : 'linenBeige' })); break;
    case 'hilda': g.add(C.hildaTable(M, { dia:w, h, mat:'oakNatural' })); break;
    case 'calaryCoffee': g.add(C.drumTable(M, { dia:w, h, top:'oakNatural', base:'oakNatural', baseDia:w-.04, fluted:true })); break;
    case 'marisa': g.add(C.drumTable(M, { dia: w, h, top: 'marble' })); break;
    case 'gladom':
      ctx.cyl(g, M.blackMatte, w / 2, w / 2, 0.018, [0, h - 0.018, 0]);
      for (const x of [-0.15, 0.15]) for (const z of [-0.15, 0.15]) boxOn(g, M.blackMatte, [0.012, h - 0.018, 0.012], [x, 0, z]); break;
    case 'calary': g.add(C.cabinet(M, { w, d, h, legH: selected === 'stockholmSide' ? .22 : .17, fronts: selected === 'stockholmSide' ? 'plain' : 'ribbed', mat: selected === 'stockholmSide' ? 'oakNatural' : selected === 'calaryBlack' ? 'blackMatte' : 'oakDark' })); break;
    case 'rudsta': {
      const frame = M.blackMatte;
      for (const x of [-w/2+.015,w/2-.015]) for (const z of [-d/2+.015,d/2-.015]) boxOn(g,frame,[.03,h,.03],[x,0,z]);
      for (const y of [.15,h-.025]) boxOn(g,frame,[w,.025,d],[0,y,0]);
      boxOn(g,frame,[w-.03,h-.175,.015],[0,.175,-d/2+.0075]);
      for (const y of [.45,.78]) boxOn(g,M.glass,[w-.04,.008,d-.04],[0,y,0]);
      for (const x of [-w/2+.012,w/2-.012]) boxOn(g,M.glass,[.006,h-.19,d-.04],[x,.175,0]);
      for (const x of [-w/4,w/4]) { boxOn(g,M.glass,[w/2-.025,h-.19,.006],[x,.175,d/2-.012]); boxOn(g,frame,[.012,h-.175,.018],[x+w/4-.012,.175,d/2-.012]); }
      break;
    }
    case 'highboard': case 'billy': case 'ivar':
      for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 5, mat: key === 'ivar' || selected !== 'billy' && key === 'billy' ? wood : 'plasticWhite', back: key !== 'ivar' }); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); }
      break;
    case 'pax': case 'hall':
      for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 3, mat: 'plasticWhite' }); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); }
      for (let i = 0; i < quantity * 2; i++) boxOn(g, M.plasticWhite, [0.495, 2.294, 0.018], [(i - (quantity * 2 - 1) / 2) * 0.499, 0.07, d / 2 + 0.009]);
      break;
    case 'utility': for (let i = 0; i < quantity; i++) { const b = cabinet(w, d, h); b.position.x = (i - (quantity - 1) / 2) * w; g.add(b); } break;
    case 'besta': for (let i = 0; i < quantity; i++) { const b = C.bookcase(M, { w, d, h, shelves: 1, mat: selected === 'bestaBlack' ? 'oakDark' : 'plasticWhite' }); b.position.set((i - (quantity - 1) / 2) * w, 0.25, 0); g.add(b); } break;
    case 'console': boxOn(g, M.plasticWhite, [w, h, d], [0, 0.91, 0]); g.add(ctx.grp([ctx.D.roundMirror(M, 0.8), 0, 1.58, -0.12])); break;
    case 'bed': g.add(C.bedModel(M, { outerW: w, outerL: d, headH: h, headT: 0.1, frame: fabric, throwMat: ctx.style.id === 'brutal' ? 'throwMoss' : 'throwSage' })); break;
    case 'night': g.add(C.sideBox(M, { w, d, h, mat: selected === 'nightWhite' ? 'plasticWhite' : wood, knob: selected === 'nightWhite' ? 'plasticWhite' : wood })); break;
    case 'desk': g.add(C.deskT(M, { w, d, h, mat: selected === 'deskOak' ? 'oakNatural' : 'plasticWhite' })); g.add(ctx.grp([ctx.helpers.laptop(M), 0.05, h, 0.02])); break;
    case 'micke': {
      boxOn(g,M.oakDark,[w,.035,d],[0,h-.035,0]); boxOn(g,M.oakDark,[.32,h-.035,d-.025],[-w/2+.16,0,0]);
      for (const z of [-d/2+.025,d/2-.025]) boxOn(g,M.blackMatte,[.025,h-.035,.025],[w/2-.025,0,z]);
      boxOn(g,M.oakDark,[w-.32,.1,.02],[.16,h-.135,d/2-.015]); g.add(ctx.grp([ctx.helpers.laptop(M),0,h,0])); break;
    }
    case 'sofabed': {
      if (selected === 'sofabed') M.linenBlue = finishMaterial(ctx.productM,'linenGrey','#b8c5cf');
      g.add(C.sofaBed(M, { w, d, h, fabric: selected === 'sofabedBeige' ? 'linenBeige' : selected === 'sofabedGrey' ? 'linenGrey' : 'linenBlue' })); break;
    }
    case 'zara': {
      M.productLeather = finishMaterial(ctx.productM,'leatherCognac','#d5c5b3');
      const c = ctx.F.taskChair(M, { fabric: 'productLeather' });
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
      g.add(C.roundTable(M, { dia: w, h, top: selected === 'sahra' ? 'plasticBeige' : selected === 'calaryTable' ? 'oakDark' : 'oakNatural', base: selected === 'sahra' ? 'drum' : selected === 'calaryTable' ? 'ribbed' : 'legs', baseMat: selected === 'sahra' ? 'plasticBeige' : selected === 'calaryTable' ? 'oakDark' : 'oakNatural', baseDia: selected === 'sahra' ? .55 : .61 }));
      g.add(ctx.helpers.chairsAround(4, 0.72, () => {
        const c = new THREE.Group(), [cw, cd, ch] = styleProduct(ctx.style.id,'chair').size;
        const M = { oakNatural: ctx.productM[STYLE_PRODUCTS[ctx.style.id]?.chair === 'chairBlack' ? 'blackMatte' : 'oakNatural'] };
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
  // Parametric sloping backs/arms can extend beyond nominal dimensions. Keep the purchased
  // furniture (before styling props are transferred) inside its actual planning footprint.
  const bounds = new THREE.Box3().setFromObject(g).getSize(new THREE.Vector3());
  if (bounds.x > size[0] + .002) g.scale.x *= size[0] / bounds.x;
  if (bounds.z > size[1] + .002) g.scale.z *= size[1] / bounds.z;
  const place = { ...placement, pos: [...placement.pos] };
  // Preserve a cabinet's wall clearance, the sofa's back line and bed headboard position.
  const wallSlots = new Set(['sideboard', 'highboard', 'bed', 'nightstand-n', 'nightstand-s', 'wardrobe', 'hall-wardrobe', 'console', 'lowboard', 'utility-tall', 'utility-shelf', 'shelving', 'sofabed', 'desk']);
  if (wallSlots.has(meta.id) || meta.id === 'sofa') {
    const delta = (size[1] - meta.size[1]) / 2;
    place.pos[0] += Math.sin(place.yaw) * delta; place.pos[1] += Math.cos(place.yaw) * delta;
  }
  if (meta.id === 'b1-table') place.pos = [12.25, 10.22];
  if (meta.id === 'b1-lounge-a') { place.pos = [11.6, 9.98]; place.yaw = 0; }
  if (meta.id === 'b1-lounge-b') { place.pos = [12.9, 9.98]; place.yaw = 0; }
  const products = [{ ...p, quantity: meta.id === 'b1-table' ? 1 : quantity }];
  if (key === 'table') products.push({ ...styleProduct(ctx.style.id,'chair'), quantity: 4 });
  if (['pax', 'hall'].includes(key)) products.push({ ...PRODUCTS.forsand, quantity: quantity * 2 });
  if (['pax', 'hall'].includes(key)) for (const child of g.children) child.position.z -= 0.009;
  if (['sideboard', 'coffee', 'nightstand-n', 'nightstand-s', 'dining'].includes(meta.id)) {
    const oldTop = new THREE.Box3().setFromObject(original.children[0]).max.y;
    for (const child of [...original.children].slice(meta.id === 'dining' ? 2 : 1)) {
      child.position.y += h - oldTop;
      g.add(child);
    }
  }
  const round = ['marisa', 'gladom', 'table', 'hilda', 'calaryCoffee'].includes(key);
  return { meta: { ...meta, name: `${p.retailer} ${p.name}${quantity > 1 ? ` (${quantity} ×)` : ''}${key === 'table' ? ' + 4 IKEA LISABO' : ''}`, spec: `${p.finish} · Herstellermaße ${p.size.map(x => Math.round(x * 1000) / 10).join(' × ')} cm${meta.id === 'b1-table' ? '; nur Tisch aus dem Set' : ''}`, size, round, products }, object: g, placement: place };
}
