// Einrichtung WE 13: gemeinsamer Bestand (Küche, Bäder, HWR, Einbauten, Vorhänge, Grundlicht)
// plus die stilspezifische Möblierung aus styles.js. Jede Platzierung ist im lokalen Rahmen einer
// gemessenen Wand angegeben (u entlang der Wand ab ihrem Startpunkt, v senkrecht in den Raum)
// oder in absoluten Planmetern. Alle Maße in m.
import * as F from '../engine/builders/furniture.js';
import * as K from '../engine/builders/kitchen.js';
import * as B from '../engine/builders/bath.js';
import * as D from '../engine/builders/decor.js';
import * as T from '../engine/builders/textiles.js';
import * as C from '../engine/builders/catalog.js';
import { box, boxOn, cyl, rboxOn, THREE } from '../engine/builders/common.js';
import { WALLS, wall } from '../core/geometry.js';
import { STYLES, DEFAULT_STYLE } from './styles.js';

export { STYLES, DEFAULT_STYLE };

// ------------------------------------------------------------------------------------------
// Placement helpers
export const frameOf = (id) => {
  const w = wall(id);
  return {
    p: (u, v) => [w.a[0] + w.dir[0] * u + w.n[0] * v, w.a[1] + w.dir[1] * u + w.n[1] * v],
    yaw: Math.atan2(-w.dir[1], w.dir[0]),
    // yaw that makes the object's front face the frame direction (du, dv)
    face: (du, dv) => Math.atan2(-w.dir[1], w.dir[0]) + Math.atan2(du, dv),
    length: w.length,
  };
};

/**
 * Builds the complete furnishing for one style. `add(meta, object, placement)` is provided by
 * the scene. meta: { id, room, name, cat, spec, size:[w,d], round?, plan?, allow? }
 */
export function furnish({ M, lib, add, style = STYLES[DEFAULT_STYLE] }) {
  const at = (fr, u, v, rot = 0, y = 0) => ({ pos: fr.p(u, v), yaw: fr.yaw + rot, y });
  const abs = (x, y, yaw = 0, h = 0) => ({ pos: [x, y], yaw, y: h });
  const grp = (...children) => { const g = new THREE.Group(); children.forEach(([o, x = 0, y = 0, z = 0, ry = 0]) => { o.position.set(x, y, z); o.rotation.y = ry; g.add(o); }); return g; };
  const fr = Object.fromEntries(['W02', 'W07', 'W08', 'W10', 'W11', 'W13', 'W14', 'W16', 'W18', 'W19', 'W20', 'W21', 'W22', 'W23', 'W28', 'W47', 'W48', 'W49', 'W50'].map((id) => [id, frameOf(id)]));
  const ctx = { M, lib, add, at, abs, grp, fr, F, K, B, D, T, C, THREE, box, boxOn, cyl, rboxOn, helpers: { lemons, laptop, shelfStyled, styleShelf, chairsAround } };
  const S = style.decor ?? {};

  // ======================================================================== STIL: Wohnen, Essen, Schlafen, Arbeiten
  style.furnish(ctx);

  // ======================================================================== DIELE (Einbau, alle Stile)
  add({ id: 'hall-wardrobe', room: 'living', name: 'Einbaugarderobe mit Sitznische', cat: 'Möbel', spec: `IKEA PAX-Korpusse 100 × 35 × 236 cm mit Maßfronten ${S.builtIn ?? 'Räuchereiche kanneliert'}, Deckenblende · 200 × 40 cm, Nische 85 cm mit Polsterbank und LED`, size: [2.0, 0.4] },
    F.hallWardrobe(M), at(fr.W14, 1.0095, 0.2));
  add({ id: 'console', room: 'living', name: 'Wandkonsole + Rundspiegel Ø 80', cat: 'Möbel', spec: `Konsole ${S.builtIn ?? 'Räuchereiche'}, Spiegel mit Metallrahmen ${S.metal ?? 'Bronze'}`, size: [1.2, 0.32] },
    grp([F.wallConsole(M)], [D.roundMirror(M, 0.8), 0, 1.58, -0.14], [D.tray(M, 'bronzeDark', 0.34, 0.2), -0.3, 0.96, 0.0], [D.vase(M, 'bottle', S.vase ?? 'stonewareCharcoal', 1.2), 0.32, 0.96, -0.02], [D.branches(M, { h: 0.5, seed: 14 }), 0.32, 1.35, -0.02]),
    at(fr.W13, 0.75, 0.16));
  add({ id: 'art-hall', room: 'living', name: (S.hallArt?.name ?? 'Tuschezeichnung').replace(/\d+ × \d+/, '90 × 120'), cat: 'Kunst', spec: 'Rahmen Eiche, Schattenfuge', size: [0.9, 0.03], plan: false },
    D.artwork(M, S.hallArt?.kind ?? 'ink', 0.9, 1.2, { seed: 7 }), at(fr.W02, 0.55, 0.025, 0, 1.45));

  // ======================================================================== KÜCHE (Bestand)
  add({ id: 'kitchen-row', room: 'kitchen', name: 'Küchenzeile (Bestand) 360 cm', cat: 'Küche', spec: 'Nussbaum, Granit gesprenkelt, Backofen/Kühlschrank in Hochschränken', size: [3.6, 0.6] },
    grp([K.kitchenRow(M)],
      [K.kitchenStyling(M), -0.35, 0.94, -0.1],
      [D.vase(M, 'moon', S.vase ?? 'stonewareSage', 0.7), 0.95, 0.94, -0.18],
      [D.pottedPlant(M, lib, 'calatheaSmall', { height: 0.38, potR: 0.08, potH: 0.12, potMat: 'stonewareSand', shape: 'cylinder' }), 1.08, 0.94, -0.16]),
    at(fr.W18, 1.8235, 0.3));
  add({ id: 'kitchen-block', room: 'kitchen', name: 'Block 120 × 60 (Bestand)', cat: 'Küche', spec: 'Schwarz, Granitplatte', size: [1.24, 0.64] },
    grp([K.kitchenBlock(M)], [D.bowl(M, 'stonewareCharcoal', 0.16, 0.08), -0.25, 0.92, 0], [lemons(M), -0.25, 0.94, 0], [D.bookStack(M, 2, { seed: 21, w: 0.26, d: 0.2 }), 0.3, 0.92, 0.02, -0.2]),
    at(fr.W16, 0.85, 0.32));

  // ======================================================================== BAD (nach HLS-Plan)
  // Vorwand mit Ablage 1,18 m hinter dem Waschtisch (W37) und entlang der Wanne (W38); darüber
  // raumbreite Maßspiegel. Armaturen durchgehend schwarz matt (Duravit Tulum).
  const front = S.bathFront ?? 'Räuchereiche', top = S.bathTop ?? 'Calacatta';
  const BLACK = 'schwarz matt';
  add({ id: 'laundry', room: 'bath', name: 'Waschtrockner in der Nische neben der Tür', cat: 'Möbel', spec: `Waschtrockner (Frontlader) 60 × 60 × 85 cm in der ersten Nische direkt neben der Badtür, Arbeitsplatte ${top} über die volle Nischenbreite, Hängeschrank ${front} 76 × 35 × 72 cm mit LED darunter · Nische 76 × 65 cm`, size: [0.758, 0.62] },
    B.laundryNiche(M), abs(14.076, 5.883 + 0.32, 0));
  add({ id: 'wc-bath', room: 'bath', name: 'Wand-WC Laufen Meda, spülrandlos', cat: 'Sanitär', spec: `Tiefspüler, Vorwand W35, Drückerplatte ${BLACK}`, size: [0.36, 0.56], anchor: 'back' },
    B.wc(M), abs(14.956, 5.883, 0));
  add({ id: 'ledge-bath', room: 'bath', name: 'Vorwand mit Ablage H 1,18 m', cat: 'Sanitär', spec: `Installationswand hinter dem Waschtisch, Fliese Iron 60 × 60 cm, Ablage ${top} 2 cm · 90 × 25 cm`, size: [0.901, 0.249], anchor: 'back' },
    grp([B.preWall(M, { w: 0.901, d: 0.249 })], [B.ledgeProps(M), -0.22, B.LEDGE_H, 0.12]), abs(15.8055, 5.634, 0));
  add({ id: 'mirror-bath', room: 'bath', name: 'Spiegel nach Maß 90 × 138 cm', cat: 'Sanitär', spec: 'Maßanfertigung: Kristallspiegel über die volle Breite des Waschtisch-Vorsprungs (W36 bis Wannenkante) oberhalb der Ablage (1,18 m) bis zur Decke, Schattenfuge 5 mm; über der Wanne bleibt die Wand gefliest', size: [0.901, 0.01], plan: false },
    B.wallMirror(M, 0.901, 2.56 - B.LEDGE_H), abs(15.8055, 5.634, 0, B.LEDGE_H));
  add({ id: 'vanity-bath', room: 'bath', name: 'Waschtisch Laufen VAL 60 × 42 + Unterschrank', cat: 'Sanitär', spec: `SaphirKeramik weiß, Einhebelmischer Duravit Tulum ${BLACK}; Unterschrank schwebend 58 × 40 × 40 cm, 2 Schubkästen, Front ${front}`, size: [0.6, 0.42], anchor: 'back' },
    grp([B.valBasin(M)], [B.vanityUnit(M, { top: 0.705 })], [B.bathProps(M), 0.2, 0.85, 0.06]), abs(15.8055, 5.883, 0));
  for (const [k, x] of [['l', 15.47], ['r', 16.14]]) add({ id: 'pendant-bath-' + k, room: 'bath', name: 'Badpendel IP44', cat: 'Leuchte', spec: `Opalglas Ø 14, Baldachin ${BLACK}, vor der Spiegelwand (Gesichtslicht)`, size: [0.14, 0.14], round: true, plan: false },
    B.bathPendant(M, D.lampLight), abs(x, 5.634 + 0.16, 0));
  add({ id: 'ledge-tub', room: 'bath', name: 'Vorwand Wanne mit Ablage H 1,18 m', cat: 'Sanitär', spec: `Installationswand W38, Ablage ${top} · 180 × 10 cm`, size: [1.8, 0.1], anchor: 'back' },
    grp([B.preWall(M, { w: 1.8, d: 0.1 })], [D.candle(M, 0.1, 0.035), 0.55, B.LEDGE_H, 0.05], [D.vase(M, 'bud', S.vase ?? 'stonewareCharcoal', 1), -0.6, B.LEDGE_H, 0.05]), abs(17.176, 6.534, -Math.PI / 2));
  add({ id: 'tub', room: 'bath', name: 'Badewanne Villeroy & Boch Collaro 180 × 80', cat: 'Sanitär', spec: `Acryl, eingefliest (Iron 60 × 60 cm); Wannenthermostat Aufputz Duravit Tulum mit Handbrause ${BLACK}`, size: [1.8, 0.82] },
    grp([B.bathtub(M)], [B.exposedThermostat(M), 0.15, 0.8, -0.41]), abs(16.666, 6.534, -Math.PI / 2));
  add({ id: 'towel-bath', room: 'bath', name: 'Handtuchheizkörper 60 × 180', cat: 'Sanitär', spec: `${BLACK}, W39`, size: [0.6, 0.1], anchor: 'back' },
    B.towelRadiator(M), abs(15.006, 7.473, Math.PI));
  add({ id: 'stool-bath', room: 'bath', name: 'Hocker Teak + Handtücher', cat: 'Deko', spec: 'Ø 32', size: [0.32, 0.32], round: true },
    grp([teakStool(M)], [T.foldedThrow(M, 'towel', 0.3, 0.22, 0.05), 0, 0.45, 0], [D.candle(M, 0.09, 0.04), 0.08, 0.5, 0.06]),
    abs(15.62, 7.25, 0));
  add({ id: 'plant-bath', room: 'bath', name: 'Farn im Steinzeugtopf', cat: 'Pflanze', spec: '', size: [0.28, 0.28], round: true },
    D.pottedPlant(M, lib, 'fern', { height: 0.6, potR: 0.13, potH: 0.28, potMat: 'stonewareCharcoal', shape: 'cylinder', maxR: 0.2 }), abs(16.08, 7.28, 0));

  // ======================================================================== DUSCHE / GÄSTE-WC
  add({ id: 'shower-guest', room: 'guestbath', name: 'Walk-in-Dusche 105 × 80', cat: 'Sanitär', spec: `bodengleich, Linienrinne ${BLACK}, Duschsystem Aufputz Duravit Tulum (Thermostat, Kopfbrause Ø 25, Handbrause) ${BLACK}, Glas mit Profil ${BLACK}, beleuchtete Nische`, size: [1.05, 0.8] },
    B.walkInShower(M), abs(9.884, 6.132, 0));
  add({ id: 'ledge-guest', room: 'guestbath', name: 'Vorwand mit Ablage H 1,18 m', cat: 'Sanitär', spec: `über die gesamte Wand W43, Fliese Iron 60 × 60 cm, Ablage ${top} · 131 × 15 cm`, size: [1.307, 0.149], anchor: 'back' },
    grp([B.preWall(M, { w: 1.307, d: 0.149 })], [B.ledgeProps(M), 0.22, B.LEDGE_H, 0.075]), abs(11.0625, 5.583, 0));
  add({ id: 'mirror-guest', room: 'guestbath', name: 'Spiegelwand nach Maß 131 × 138 cm', cat: 'Sanitär', spec: 'Maßanfertigung: Kristallspiegel über die gesamte Wand W43 oberhalb der Ablage (1,18 m) bis zur Decke, Schattenfuge 5 mm', size: [1.307, 0.01], plan: false },
    B.wallMirror(M, 1.307, 2.56 - B.LEDGE_H), abs(11.0625, 5.583, 0, B.LEDGE_H));
  add({ id: 'vanity-guest', room: 'guestbath', name: 'Waschtisch Laufen VAL 60 × 42 + Unterschrank', cat: 'Sanitär', spec: `SaphirKeramik weiß, Einhebelmischer Duravit Tulum ${BLACK}; Unterschrank schwebend 58 × 40 × 40 cm, Front ${front}`, size: [0.6, 0.42], anchor: 'back' },
    grp([B.valBasin(M)], [B.vanityUnit(M, { top: 0.705 })], [B.bathProps(M), -0.2, 0.85, 0.06]), abs(11.058, 5.732, 0));
  for (const [k, x] of [['l', 10.6], ['r', 11.52]]) add({ id: 'pendant-guest-' + k, room: 'guestbath', name: 'Badpendel IP44', cat: 'Leuchte', spec: `Opalglas Ø 14, Baldachin ${BLACK}`, size: [0.14, 0.14], round: true, plan: false },
    B.bathPendant(M, D.lampLight), abs(x, 5.583 + 0.075, 0));
  add({ id: 'wc-guest', room: 'guestbath', name: 'Wand-WC Laufen Meda', cat: 'Sanitär', spec: `Tiefspüler, Drückerplatte ${BLACK}`, size: [0.36, 0.56], anchor: 'back' },
    B.wc(M), abs(9.359, 7.05, Math.PI / 2));
  add({ id: 'towel-guest', room: 'guestbath', name: 'Handtuchheizkörper 60 × 180', cat: 'Sanitär', spec: `${BLACK}, W44`, size: [0.6, 0.1], anchor: 'back' },
    B.towelRadiator(M), abs(11.716, 7.04, -Math.PI / 2));

  // ======================================================================== HWR
  add({ id: 'utility-tall', room: 'utility', name: 'Hochschrank Vorräte/Sauger', cat: 'Möbel', spec: `IKEA PAX 75 × 58 × 201 bzw. Maßkorpus, Front ${front}, in der Nische W50 · 80 × 45 × 220 cm (Türschwenk frei)`, size: [0.8, 0.45] },
    grp([boxOn(new THREE.Group(), M.smokedOak, [0.8, 2.2, 0.45], [0, 0, 0]).parent], [(() => { const g = new THREE.Group(); box(g, M.matteBlack, [0.004, 2.1, 0.004], [0, 1.1, 0.226]); box(g, M.bronze, [0.014, 0.5, 0.02], [-0.04, 1.1, 0.235]); box(g, M.bronze, [0.014, 0.5, 0.02], [0.04, 1.1, 0.235]); return g; })()]),
    at(fr.W50, 0.42, 0.226));
  add({ id: 'utility-tech', room: 'utility', name: 'Unterverteilung + Router', cat: 'Technik', spec: 'Bestand, frei zugänglich', size: [0.6, 0.1], plan: false },
    techPanel(M), at(fr.W47, 1.72, 0.0, 0, 1.0));
  add({ id: 'utility-manifold', room: 'utility', name: 'Heizkreisverteiler (Bestand)', cat: 'Technik', spec: 'Revisionsschrank', size: [0.8, 0.12] },
    grp([boxOn(new THREE.Group(), M.plasticWhite, [0.8, 0.7, 0.12], [0, 0.3, 0]).parent]), at(fr.W48, 0.55, 0.06));
  add({ id: 'utility-shelf', room: 'utility', name: 'Regal mit Körben', cat: 'Möbel', spec: 'IKEA IVAR-Klasse, Eiche/Stahl schwarz, 100 × 35 × 190 cm', size: [1.0, 0.35] },
    utilityShelf(M), at(fr.W49, 0.62, 0.175));

  // ======================================================================== BALKONE
  const bl = S.balcony ?? {};
  add({ id: 'b1-lounge-a', room: 'balcony1', name: 'Outdoor-Sessel Teak', cat: 'Outdoor', spec: `Teak, Kissen Outdoor-Leinen ${bl.cushionName ?? 'Greige'}`, size: [0.74, 0.82] },
    F.loungeChair(M, { w: 0.74, d: 0.82, fabric: bl.cushion ?? 'linenGrey', wood: 'teak' }), abs(11.84, 9.98, 0.25));
  add({ id: 'b1-lounge-b', room: 'balcony1', name: 'Outdoor-Sessel Teak', cat: 'Outdoor', spec: `Teak, Kissen Outdoor-Leinen ${bl.cushionName ?? 'Greige'}`, size: [0.74, 0.82] },
    F.loungeChair(M, { w: 0.74, d: 0.82, fabric: bl.cushion ?? 'linenGrey', wood: 'teak' }), abs(12.84, 9.98, -0.25));
  add({ id: 'b1-table', room: 'balcony1', name: 'Beistelltisch Travertin', cat: 'Outdoor', spec: 'Ø 42', size: [0.42, 0.42], round: true },
    grp([F.sideTable(M, { h: 0.45 })], [D.candle(M, 0.14, 0.05), 0, 0.45, 0]), abs(12.34, 10.22, 0));
  add({ id: 'b1-tree', room: 'balcony1', name: 'Kübelpflanze groß', cat: 'Pflanze', spec: 'Pflanzkübel Ø 50', size: [0.5, 0.5], round: true },
    D.pottedPlant(M, lib, 'pachira', { height: 1.9, potR: 0.25, potH: 0.55, seed: 3, maxR: 0.34, potMat: bl.pot ?? 'stonewareCharcoal' }), abs(10.74, 9.66, 0));
  add({ id: 'b1-fern', room: 'balcony1', name: 'Farn im Kübel', cat: 'Pflanze', spec: '', size: [0.4, 0.4], round: true },
    D.pottedPlant(M, lib, 'fern', { height: 0.8, potR: 0.2, potH: 0.42, potMat: 'stonewareSand', shape: 'cylinder', maxR: 0.3 }), abs(10.55, 11.7, 0));
  add({ id: 'b2-bistro', room: 'balcony2', name: 'Bistro-Set 2 Personen', cat: 'Outdoor', spec: 'Travertin-Tisch Ø 64, Teak-Stühle', size: [1.5, 0.64] },
    grp([F.bistroSet(M)], [D.vase(M, 'bud', 'stonewareSage', 1), 0.05, 0.75, 0]), abs(3.95, 20.15, -0.14));
  add({ id: 'b2-plant', room: 'balcony2', name: 'Kübelpflanze', cat: 'Pflanze', spec: '', size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachiraMid', { height: 1.6, potR: 0.22, potH: 0.5, seed: 5, maxR: 0.3, potMat: bl.pot ?? 'stonewareCharcoal' }), abs(4.9, 19.66, 0));

  // ======================================================================== VORHÄNGE & GRUNDLICHT
  const cur = S.curtains ?? {};
  const curtains = [['W06', 0, 'curtain'], ['W06', 1, 'curtain'], ['W04', 0, 'curtain'], ['W03', 0, 'curtain'], ['W21', 0, 'curtainDim'], ['W21', 1, 'curtainDim'], ['W27', 0, 'curtain'], ['W27', 1, 'curtain']];
  curtains.forEach(([wid, i, mat], k) => {
    const w = WALLS.find((x) => x.id === wid), o = w.openings[i], f = frameOf(wid);
    const span = o.u1 - o.u0;
    add({ id: `curtain-${wid}-${i}`, room: w.room, name: 'Vorhang, Deckenschiene', cat: 'Textil', spec: mat === 'curtainDim' ? (cur.dim ?? 'IKEA MAJGULL Verdunkelung 145 × 300, grau, gekürzt') : (cur.day ?? 'Leinen Ivory, Wellenfalte'), size: [span + 0.56, 0.1], plan: false },
      T.curtainSet(M, span, { mat, seed: k * 3 + 1, top: 2.49 }), at(f, (o.u0 + o.u1) / 2, 0.11));
  });

  const spots = [
    ['living', 9.65, 8.3], ['living', 10.9, 8.3], ['living', 12.15, 8.3], ['living', 12.72, 6.55],
    ['kitchen', 4.55, 16.15], ['kitchen', 4.35, 17.6], ['bath', 14.95, 6.85], ['bath', 16.0, 6.7], ['guestbath', 10.9, 6.95],
    ['utility', 5.1, 14.55], ['living', 7.3, 9.95], ['living', 6.0, 10.2 + 3.2],
  ];
  spots.forEach(([room, x, y], i) => add({ id: 'spot-' + i, room, name: 'Einbaustrahler', cat: 'Leuchte', spec: /bath/.test(room) ? 'LED 3000 K, CRI > 95, IP44, entblendet' : 'LED 2700 K, CRI > 95, entblendet', size: [0.09, 0.09], round: true, plan: false, ceiling: true },
    D.downlight(M, { light: true, lumens: room === 'living' ? 260 : 320, angle: 1.2, color: /bath/.test(room) ? D.NEUTRAL_WARM : undefined }), abs(x, y, 0, 2.56)));

  add({ id: 'sconce-hall', room: 'living', name: 'Wandleuchte linear', cat: 'Leuchte', spec: `${S.metal ?? 'Bronze'}/Opal`, size: [0.05, 0.05], plan: false },
    D.linearSconce(M), at(fr.W13, 1.3, 0.05, 0, 1.6));
}

// ------------------------------------------------------------------------------------------
// Styling helpers shared by the styles
export function chairsAround(n, r, make, offset = Math.PI / 4) {
  const g = new THREE.Group();
  for (let i = 0; i < n; i++) {
    const a = offset + (i * Math.PI * 2) / n;
    const c = make(); c.position.set(Math.sin(a) * r, 0, Math.cos(a) * r); c.rotation.y = a + Math.PI; g.add(c);
  }
  return g;
}

function lemons(M) {
  const g = new THREE.Group();
  for (const [x, z, s] of [[0, 0, 1], [0.05, 0.03, 0.95], [-0.04, 0.04, 1.05], [0.01, -0.05, 0.9]]) {
    const m = new THREE.Mesh(new THREE.SphereGeometry(0.035 * s, 20, 14), M.lemon);
    m.scale.set(1, 0.85, 1.25); m.position.set(x, 0.03, z); m.rotation.y = x * 20; m.castShadow = true;
    g.add(m);
  }
  return g;
}

function laptop(M) {
  const g = new THREE.Group();
  boxOn(g, M.steel, [0.32, 0.012, 0.22], [0, 0, 0]);
  const lid = boxOn(g, M.steel, [0.32, 0.21, 0.006], [0, 0.012, -0.11]);
  lid.rotation.x = -0.25;
  return g;
}

function teakStool(M) {
  const g = new THREE.Group();
  cyl(g, M.teak, 0.16, 0.14, 0.45, [0, 0, 0], 32);
  return g;
}

function techPanel(M) {
  const g = new THREE.Group();
  box(g, M.plasticWhite, [0.6, 0.9, 0.1], [0, 0.45, 0.05]);
  box(g, M.steel, [0.56, 0.004, 0.004], [0, 0.45, 0.101]);
  box(g, M.plasticWhite, [0.24, 0.04, 0.16], [-0.7, 0.3, 0.08]);
  return g;
}

function utilityShelf(M) {
  const g = new THREE.Group();
  for (const x of [-0.48, 0.48]) for (const z of [-0.155, 0.155]) box(g, M.blackMetal, [0.02, 1.9, 0.02], [x, 0.95, z]);
  for (const y of [0.1, 0.55, 1.0, 1.45, 1.88]) boxOn(g, M.oak, [1.0, 0.025, 0.35], [0, y, 0]);
  for (const [x, y] of [[-0.25, 0.125], [0.25, 0.125], [-0.25, 0.575], [0.25, 0.575]]) rboxOn(g, M.linenTaupe, [0.4, 0.3, 0.3], [x, y, 0], 0.02, 2);
  return g;
}

/** Built-in backlit shelving with books, ceramics and a succulent. */
function shelfStyled(M, lib, opts = {}) {
  const g = new THREE.Group();
  g.add(F.shelving(M, opts));
  styleShelf(M, lib, g, [0.845, 1.245, 1.645, 2.025], opts.w ?? 1.3);
  return g;
}

/** Places books, ceramics and a plant on shelves at heights ys (shelf top surfaces). */
function styleShelf(M, lib, g, ys, w, { vase = 'stonewareSand', bowl = 'bronze' } = {}) {
  const k = w / 1.3;
  const rows = [[[-0.3, 'books', 0.5], [0.35, 'vase']], [[0.2, 'books', 0.6], [-0.4, 'bowl']], [[-0.2, 'stack'], [0.3, 'plant']], [[0, 'books', 0.9]]];
  ys.forEach((y, i) => {
    for (const [x, kind, bw] of rows[i % rows.length]) {
      let o;
      if (kind === 'books') o = D.bookRow(M, Math.min(w - 0.1, bw * k), { seed: Math.round(y * 10), h: 0.24, d: 0.2 });
      else if (kind === 'vase') o = D.vase(M, 'amphora', vase, 0.7);
      else if (kind === 'bowl') o = D.bowl(M, bowl, 0.12, 0.05);
      else if (kind === 'stack') o = D.bookStack(M, 3, { seed: 44, w: 0.26, d: 0.2 });
      else o = D.pottedPlant(M, lib, 'succulent', { height: 0.24, potR: 0.07, potH: 0.1, potMat: 'stonewareCharcoal', shape: 'cylinder' });
      o.position.set(x * k, y + 0.002, -0.02);
      g.add(o);
    }
  });
}
