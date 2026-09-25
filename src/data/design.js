// Einrichtungskonzept WE 13 · "Refined Metallic Japandi"
// Every placement is expressed in the local frame of a measured wall (u along the wall from its
// start point, v perpendicular into the room) or in absolute plan metres. All distances in m.
import * as F from '../engine/builders/furniture.js';
import * as K from '../engine/builders/kitchen.js';
import * as B from '../engine/builders/bath.js';
import * as D from '../engine/builders/decor.js';
import * as T from '../engine/builders/textiles.js';
import { box, boxOn, cyl, rboxOn, THREE } from '../engine/builders/common.js';
import { WALLS, wall } from '../core/geometry.js';

export const CONCEPT = {
  title: 'Refined Metallic Japandi',
  claim: 'Ruhig. Kuratiert. Zeitgenössisch.',
  palette: [
    ['Crisp Off-White', '#ECE8E1'], ['Soft Gray', '#C9C4BC'], ['Taupe Greige', '#B3AA9D'], ['Muted Sage', '#8A9582'],
    ['Warm Taupe', '#8B7D6F'], ['Warm Bronze', '#6E5A45'], ['Charcoal', '#333230'], ['Soft Black', '#1E1E1D'],
  ],
  materials: [
    ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
    ['Räuchereiche, kanneliert', 'Lowboard, Sideboard, Einbauschränke, Nachttische'],
    ['Calacatta-Marmor, hell', 'Couchtisch, Esstisch, Deckplatten, Waschtisch'],
    ['Bronze, gebürstet', 'Leuchten, Griffe, Armaturen, Sockel'],
    ['Bouclé Ivory · Leinen · Samt Salbei', 'Polster, Kissen, Vorhänge'],
    ['Kalkputz warm-greige', 'Wände; Schlafzimmer eine Nuance tiefer'],
    ['Kalkstein 60 × 120 cm', 'Bäder, raumhoch; HWR-Boden'],
  ],
};

export const ROOM_NOTES = {
  living: {
    title: 'Wohnen · Essen · Diele',
    zoning: 'Drei Zonen entlang der Raumtiefe: Medienwand (W11) – Lounge – Essplatz vor der Fensterfront (W06).',
    points: [
      'Raumhohe Lamellenwand in Eiche an W11 mit indirekter LED-Voute; schwebendes, kanneliertes Lowboard und The Frame 65″ im Kunstmodus.',
      'Skulpturales Rundsofa 250 cm, Sehabstand ≈ 3,3 m (optimal für 65″); Marmor-Rundtisch Ø 100 cm mit 40 cm Knieraum.',
      'Freie Hauptachse Diele → Balkon → Essplatz ≥ 0,94 m östlich des Sofas; Lesesessel in der Fensternische W05/W06.',
      'Runder Esstisch Ø 130 cm mit vier Schalenstühlen (diagonal gestellt) unter einer Bronze-Pendelleuchte Ø 80 cm; 1,2 m Durchgang zu Küche und Schlafzimmer.',
      'Sideboard 200 cm an W07 als Schauwand mit Kunst, Bronzelampe und Zweigen; Solitärpflanzen setzen vertikale Akzente.',
    ],
  },
  kitchen: {
    title: 'Kochen',
    zoning: 'Bestandsküche gemäß Referenz: Zeile an W18, Block an W16, Arbeitsgang 1,65 m.',
    points: ['Nussbaumfronten, gesprenkelte Granitplatte und -rückwand, schwarze Spüle/Armatur bleiben erhalten.', 'Styling mit Eichenbrett, Keramik und Grün; LED-Unterbauleuchte + zwei Einbaustrahler.'],
  },
  bedroom: {
    title: 'Schlafen',
    zoning: 'Bett quer mit Kopfteil an W20, raumhoher Einbauschrank an W22, Leseplatz am Fenster.',
    points: ['Räuchereichen-Lamellenwand mit gepolstertem Kanal-Kopfteil und schwebenden Nachttischen; Opal-Pendel statt Nachttischlampen.', 'Einbauschrank 300 cm, deckenhoch, kannelierte Fronten; 92 cm Gang zum Bettende.', 'Samt-Drehsessel in Salbei + Stehleuchte am Fenster, Dim-out-Leinenvorhänge.'],
  },
  office: {
    title: 'Arbeiten / Gäste',
    zoning: 'Schlafsofa an W23, Schreibtisch mit seitlichem Tageslicht an W24/W26, Regal an W28.',
    points: ['Schlafsofa 200 cm (Liegefläche 140 × 200 cm) – ausgeklappt bleibt der Schreibtisch nutzbar.', 'Hinterleuchtetes Einbauregal aus Räuchereiche; Tuschebild als ruhiger Fokus.'],
  },
  bath: {
    title: 'Bad',
    zoning: 'Wanne an W38, Waschtisch an W37, WC an der Vorwand W35, Waschturm in der Nische.',
    points: ['Kalkstein raumhoch, Calacatta-Waschtisch mit integriertem Becken, Bronzearmaturen.', 'Waschmaschine/Trockner hinter Räuchereiche-Fronten; Handtuchheizkörper an W39.'],
  },
  guestbath: {
    title: 'Dusche / Gäste-WC',
    zoning: 'Walk-in-Dusche 105 × 80 cm, Aufsatzbecken an W43, WC an W46.',
    points: ['Regendusche Bronze, beleuchtete Nische, Glaswand mit schwarzem Profil.'],
  },
  utility: {
    title: 'HWR',
    zoning: 'Hochschrank in der Nische W50, offenes Regal an W49 östlich der Tür, Technik (Unterverteilung W47, Heizkreisverteiler W48) frei zugänglich; Türschwenk 76 cm frei.',
    points: ['Geschlossener Stauraum für Staubsauger/Vorräte, Körbe für Kleinteile.'],
  },
  balcony1: { title: 'Balkon 1', zoning: 'Lounge mit zwei Teak-Sesseln und Pflanzkübeln.', points: [] },
  balcony2: { title: 'Balkon 2', zoning: 'Bistro-Platz am Küchenaustritt.', points: [] },
};

// ------------------------------------------------------------------------------------------
// Placement helpers
const frameOf = (id) => {
  const w = wall(id);
  return {
    p: (u, v) => [w.a[0] + w.dir[0] * u + w.n[0] * v, w.a[1] + w.dir[1] * u + w.n[1] * v],
    yaw: Math.atan2(-w.dir[1], w.dir[0]),
    // yaw that makes the object's front face the frame direction (du, dv)
    face: (du, dv) => Math.atan2(-w.dir[1], w.dir[0]) + Math.atan2(du, dv),
  };
};

/**
 * Builds the complete furnishing. `add(meta, object, placement)` is provided by the scene.
 * meta: { id, room, name, cat, spec, size:[w,d], round?, plan? }
 */
export function furnish({ M, lib, add }) {
  const L = frameOf('W11'), HALL = frameOf('W13'), W14 = frameOf('W14'), W10 = frameOf('W10'), W07 = frameOf('W07');
  const W02 = frameOf('W02');
  const at = (fr, u, v, rot = 0, y = 0) => ({ pos: fr.p(u, v), yaw: fr.yaw + rot, y });
  const abs = (x, y, yaw = 0, h = 0) => ({ pos: [x, y], yaw, y: h });
  const grp = (...children) => { const g = new THREE.Group(); children.forEach(([o, x = 0, y = 0, z = 0, ry = 0]) => { o.position.set(x, y, z); o.rotation.y = ry; g.add(o); }); return g; };

  // ======================================================================== WOHNEN
  add({ id: 'tv-wall', room: 'living', name: 'Lamellenwand Eiche mit LED-Voute', cat: 'Wand', spec: 'Eichenlamellen 30 × 22 mm auf Akustikfilz schwarz, raumhoch, 284 cm', size: [2.84, 0.034], anchor: 'back', plan: true },
    grp([F.slatWall(M, { w: 2.839, mat: 'oak' })], [D.ledLine(M, 2.7, { lumensPerM: 500 }), 0, 2.5, 0.08]), at(L, 1.4195, 0));
  add({ id: 'lowboard', room: 'living', name: 'Lowboard schwebend, kanneliert', cat: 'Möbel', spec: 'Räuchereiche, Calacatta-Deckplatte · 220 × 42 × 40 cm, Montagehöhe 22 cm', size: [2.2, 0.42] },
    grp([F.lowboard(M, { w: 2.2 })],
      [D.mushroomLamp(M), -0.82, 0.62, 0.02],
      [D.bookStack(M, 3, { seed: 3 }), 0.62, 0.62, 0.02, 0.2],
      [D.vase(M, 'moon', 'stonewareCharcoal', 0.9), 0.85, 0.62, 0.0],
      [D.bowl(M, 'bronze', 0.12, 0.05), 0.4, 0.62, 0.05]),
    at(L, 1.45, 0.034 + 0.21));
  add({ id: 'tv', room: 'living', name: 'Samsung The Frame 65″ (Kunstmodus)', cat: 'Technik', spec: 'Wandmontage bündig, Rahmen Eiche hell, Bildmitte 1,20 m', size: [1.46, 0.03], plan: false },
    F.frameTV(M, { inch: 65 }), at(L, 1.45, 0.034 + 0.016, 0, 1.2));
  add({ id: 'sofa', room: 'living', name: 'Rundsofa Bouclé 250 cm', cat: 'Polster', spec: 'Ivory-Bouclé, Sitzhöhe 44 cm, Bronzesockel · Stilreferenz: Westwing / Sofa Company „curved“', size: [2.5, 1.0] },
    F.curvedSofa(M, { w: 2.5, d: 1.0 }), at(L, 1.45, 3.45, Math.PI));
  add({ id: 'coffee', room: 'living', name: 'Couchtisch rund Ø 100', cat: 'Tisch', spec: 'Calacatta-Marmor, Trommelfuß Bronze, H 36 cm', size: [1.0, 1.0], round: true },
    grp([F.coffeeTableRound(M)],
      [D.bookStack(M, 2, { seed: 8, w: 0.32, d: 0.24 }), 0.18, 0.36, 0.1, 0.4],
      [D.vase(M, 'bottle', 'stonewareSage', 0.8), -0.12, 0.36, -0.12],
      [D.bowl(M, 'bronze', 0.15, 0.06), 0.02, 0.36, 0.24],
      [D.candle(M, 0.1, 0.035), 0.24, 0.414, 0.14]),
    at(L, 1.45, 2.05));
  add({ id: 'rug-living', room: 'living', name: 'Wollteppich 260 × 230', cat: 'Textil', spec: 'Handgetuftet, Greige mit Taupe-Einfassung', size: [2.6, 2.3], plan: 'soft' },
    T.rug(M, 2.6, 2.3), at(L, 1.45, 2.2));
  add({ id: 'side-table', room: 'living', name: 'Beistelltisch Travertin Ø 42', cat: 'Tisch', spec: 'Travertin, Bronzesäule, H 52 cm', size: [0.42, 0.42], round: true },
    grp([F.sideTable(M)], [D.bookStack(M, 2, { seed: 12, w: 0.24, d: 0.18 }), 0, 0.52, 0], [D.vase(M, 'bud', 'stoneware', 1.1), 0.08, 0.57, 0.06]),
    at(L, 2.92, 3.2));
  add({ id: 'lounge', room: 'living', name: 'Lesesessel Nussbaum / Bouclé', cat: 'Polster', spec: 'Massivholzgestell Nussbaum, lose Bouclé-Kissen', size: [0.72, 0.8] },
    grp([F.loungeChair(M)], [(() => { const c = T.cushion(M, 'velvetSage', [0.42, 0.34, 0.14]); c.rotation.x = -0.3; return c; })(), 0, 0.62, -0.18]),
    { ...at(L, 4.5, 2.92), yaw: L.face(-3.05, -0.85) });
  add({ id: 'floorlamp-living', room: 'living', name: 'Stehleuchte Bronze / Plissee', cat: 'Leuchte', spec: 'Marmorfuß, Leinenschirm plissiert, 2700 K', size: [0.32, 0.32], round: true },
    D.floorLamp(M), at(L, 4.72, 2.58));
  add({ id: 'plant-living', room: 'living', name: 'Solitärpflanze Pachira 190 cm', cat: 'Pflanze', spec: 'Konischer Keramikkübel Anthrazit Ø 44', size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachira', { height: 1.95, potR: 0.22, potH: 0.5, maxR: 0.34 }), at(L, 0.36, 1.02));
  add({ id: 'art-living', room: 'living', name: 'Kunstwerk „Stein & Salbei“ 110 × 85', cat: 'Kunst', spec: 'Acryl auf Leinwand, Schattenfugenrahmen Eiche', size: [1.1, 0.04], plan: false },
    D.artwork(M, 'fields', 1.1, 0.85, { seed: 4 }), at(W10, 4.516 - 3.2, 0.03, 0, 1.55));

  // Essplatz
  const dining = new THREE.Group();
  dining.add(F.diningTableRound(M, { dia: 1.3 }));
  for (let i = 0; i < 4; i++) {
    const a = Math.PI / 4 + (i * Math.PI) / 2, r = 0.66;
    const c = F.diningChair(M); c.position.set(Math.sin(a) * r, 0, Math.cos(a) * r); c.rotation.y = a + Math.PI; dining.add(c);
  }
  dining.add(grp([D.vase(M, 'amphora', 'stonewareCharcoal', 0.85), 0.05, 0.75, 0.02], [D.branches(M, { h: 0.55, seed: 5 }), 0.05, 1.05, 0.02], [D.tray(M, 'bronzeDark', 0.36, 0.24), -0.22, 0.75, -0.12, 0.3]));
  add({ id: 'dining', room: 'living', name: 'Esstisch rund Ø 130 + 4 Schalenstühle', cat: 'Tisch', spec: 'Calacatta, kannelierter Säulenfuß Räuchereiche; Stühle Bouclé mit Bronzebeinen', size: [2.05, 2.05], round: true },
    dining, at(L, 3.45, 5.65, 0.08));
  add({ id: 'pendant-dining', room: 'living', name: 'Pendelleuchte Saucer Ø 80', cat: 'Leuchte', spec: 'Bronze gebürstet, Opaldiffusor, Unterkante 1,61 m', size: [0.8, 0.8], round: true, plan: false },
    D.saucerPendant(M), at(L, 3.45, 5.65));
  add({ id: 'sideboard', room: 'living', name: 'Sideboard 200 kanneliert', cat: 'Möbel', spec: 'Räuchereiche, Calacatta-Deckplatte, Bronzesockel · 200 × 45 × 76 cm', size: [2.0, 0.45] },
    grp([F.sideboard(M)],
      [D.mushroomLamp(M, { h: 0.46, r: 0.19 }), -0.68, 0.76, -0.02],
      [D.vase(M, 'amphora', 'stonewareSand', 1.05), 0.55, 0.76, -0.05],
      [D.branches(M, { h: 0.75, spread: 0.45, seed: 9 }), 0.55, 1.15, -0.05],
      [D.bowl(M, 'bronze', 0.16, 0.06), 0.1, 0.76, 0.02],
      [D.stoneStack(M), 0.82, 0.76, 0.08]),
    at(W07, 1.56, 0.225));
  add({ id: 'art-dining', room: 'living', name: 'Kunstwerk „Nebellandschaft“ 120 × 85', cat: 'Kunst', spec: 'Öl/Acryl, Rahmen Eiche', size: [1.2, 0.04], plan: false },
    D.artwork(M, 'landscape', 1.2, 0.85, { seed: 2 }), at(W07, 1.56, 0.03, 0, 1.58));
  add({ id: 'plant-dining', room: 'living', name: 'Solitärpflanze Pachira 180 cm', cat: 'Pflanze', spec: 'Kübel Steinzeug Sand', size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachiraMid', { height: 1.8, potR: 0.22, potH: 0.46, potMat: 'stonewareSand', shape: 'bowl', seed: 2, maxR: 0.3 }), at(L, 4.68, 7.08));

  add({ id: 'highboard', room: 'living', name: 'Highboard Rauchglas (Bar/Gläser)', cat: 'Möbel', spec: 'Räuchereiche, Rauchglastüren, LED-Innenlicht · 90 × 35 × 155 cm', size: [0.9, 0.35] },
    grp([F.glassHighboard(M)], [D.vase(M, 'bud', 'stonewareCharcoal', 1.2), -0.22, 1.55, 0], [D.bookStack(M, 2, { seed: 17, w: 0.26, d: 0.2 }), 0.18, 1.55, 0.0, 0.3]),
    at(frameOf('W08'), 0.678, 0.175));

  // Diele
  add({ id: 'hall-wardrobe', room: 'living', name: 'Garderobe Einbau mit Sitznische', cat: 'Möbel', spec: 'Räuchereiche kanneliert, deckenhoch · 200 × 40 cm, Nische 85 cm mit Polsterbank und LED', size: [2.0, 0.4] },
    F.hallWardrobe(M), at(W14, 1.0095, 0.2));
  add({ id: 'console', room: 'living', name: 'Wandkonsole + Rundspiegel Ø 80', cat: 'Möbel', spec: 'Räuchereiche/Calacatta, Spiegel mit Bronzerahmen', size: [1.2, 0.32] },
    grp([F.wallConsole(M)], [D.roundMirror(M, 0.8), 0, 1.58, -0.14], [D.tray(M, 'bronzeDark', 0.34, 0.2), -0.3, 0.96, 0.0], [D.vase(M, 'bottle', 'stonewareCharcoal', 1.2), 0.32, 0.96, -0.02], [D.branches(M, { h: 0.5, seed: 14 }), 0.32, 1.35, -0.02]),
    at(HALL, 0.75, 0.16));
  add({ id: 'art-hall', room: 'living', name: 'Tuschezeichnung 60 × 80', cat: 'Kunst', spec: 'Papier auf Karton, Rahmen Eiche', size: [0.6, 0.03], plan: false },
    D.artwork(M, 'ink', 0.6, 0.8, { seed: 7 }), at(W02, 0.5, 0.025, 0, 1.5));

  // ======================================================================== KÜCHE
  const K18 = frameOf('W18'), K16 = frameOf('W16');
  add({ id: 'kitchen-row', room: 'kitchen', name: 'Küchenzeile (Bestand) 360 cm', cat: 'Küche', spec: 'Nussbaum, Granit gesprenkelt, Backofen/Kühlschrank in Hochschränken', size: [3.6, 0.6] },
    grp([K.kitchenRow(M)],
      [K.kitchenStyling(M), -0.35, 0.94, -0.1],
      [D.vase(M, 'moon', 'stonewareSage', 0.7), 0.95, 0.94, -0.18],
      [D.pottedPlant(M, lib, 'calatheaSmall', { height: 0.38, potR: 0.08, potH: 0.12, potMat: 'stonewareSand', shape: 'cylinder' }), 1.08, 0.94, -0.16]),
    at(K18, 1.8235, 0.3));
  add({ id: 'kitchen-block', room: 'kitchen', name: 'Block 120 × 60 (Bestand)', cat: 'Küche', spec: 'Schwarz, Granitplatte', size: [1.24, 0.64] },
    grp([K.kitchenBlock(M)], [D.bowl(M, 'stonewareCharcoal', 0.16, 0.08), -0.25, 0.92, 0], [lemons(M), -0.25, 0.94, 0], [D.bookStack(M, 2, { seed: 21, w: 0.26, d: 0.2 }), 0.3, 0.92, 0.02, -0.2]),
    at(K16, 0.85, 0.32));

  // ======================================================================== SCHLAFEN
  const S = frameOf('W19'), W20 = frameOf('W20'), W22 = frameOf('W22');
  add({ id: 'bed-wall', room: 'bedroom', name: 'Lamellenwand Räuchereiche', cat: 'Wand', spec: 'Raumhoch, 417 cm', size: [4.17, 0.034], anchor: 'back' },
    F.slatWall(M, { w: 4.17, mat: 'smokedOak' }), at(W20, 2.087, 0));
  add({ id: 'bed', room: 'bedroom', name: 'Polsterbett 180 × 200', cat: 'Bett', spec: 'Kanal-Kopfteil Leinen grau, Bettwäsche Leinen, Plaid Salbei · Außenmaß 194 × 212 cm', size: [1.94, 2.12 + 0.14] },
    F.bed(M), at(W20, 2.087, 0.034 + 1.13 + 0.005, 0));
  for (const [id, u] of [['nightstand-n', 0.8], ['nightstand-s', 3.37]]) {
    add({ id, room: 'bedroom', name: 'Nachttisch schwebend', cat: 'Möbel', spec: 'Räuchereiche kanneliert, Marmorplatte, 50 × 38 cm', size: [0.5, 0.38] },
      grp([F.nightstand(M)], [D.bookStack(M, 2, { seed: u * 10, w: 0.22, d: 0.16 }), -0.08, 0.578, 0], [D.vase(M, 'bud', 'stonewareSage', 1), 0.14, 0.578, 0.05]),
      at(W20, u, 0.034 + 0.19));
    add({ id: id + '-pendant', room: 'bedroom', name: 'Opal-Pendel', cat: 'Leuchte', spec: 'Opalglas Ø 20, Bronze', size: [0.2, 0.2], round: true, plan: false },
      D.globePendant(M, { drop: 1.0 }), at(W20, u, 0.3));
  }
  add({ id: 'art-bed', room: 'bedroom', name: 'Kunstwerk „Salbei“ 120 × 75', cat: 'Kunst', spec: 'Acryl, Rahmen Eiche', size: [1.2, 0.03], plan: false },
    D.artwork(M, 'sage', 1.2, 0.75, { seed: 6 }), at(W20, 2.087, 0.034 + 0.02, 0, 1.72));
  add({ id: 'wardrobe', room: 'bedroom', name: 'Einbauschrank deckenhoch 300 cm', cat: 'Möbel', spec: 'Räuchereiche kanneliert, Griffleisten Bronze · 300 × 62 × 252 cm (Korpus z. B. PAX)', size: [3.0, 0.62] },
    F.wardrobe(M), at(W22, 1.5, 0.31));
  add({ id: 'reading-chair', room: 'bedroom', name: 'Drehsessel Samt Salbei', cat: 'Polster', spec: 'Ø 78 cm, Bronzefuß', size: [0.78, 0.78], round: true },
    F.tubChair(M), { ...at(S, 1.1, 3.58), yaw: S.face(0.7, -1) });
  add({ id: 'floorlamp-bed', room: 'bedroom', name: 'Stehleuchte Bronze', cat: 'Leuchte', spec: 'Plissee-Schirm, 2700 K', size: [0.32, 0.32], round: true },
    D.floorLamp(M, { h: 1.5 }), at(S, 1.62, 3.9));
  add({ id: 'plant-bed', room: 'bedroom', name: 'Pflanze Alocasia', cat: 'Pflanze', spec: 'Kübel Steinzeug Salbei', size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'alocasia', { height: 1.05, potR: 0.18, potH: 0.36, potMat: 'stonewareSage', shape: 'bowl', maxR: 0.26 }), at(S, 3.48, 3.9));
  add({ id: 'rug-bed', room: 'bedroom', name: 'Wollteppich 230 × 300', cat: 'Textil', spec: 'Greige meliert', size: [2.3, 3.0], plan: 'soft' },
    T.rug(M, 2.3, 3.0, { mat: 'rug', border: 'rug' }), at(S, 2.15, 2.087));

  // ======================================================================== ARBEITEN / GÄSTE
  const O = frameOf('W23'), W28 = frameOf('W28');
  add({ id: 'sofabed', room: 'office', name: 'Schlafsofa 200 (140 × 200)', cat: 'Polster', spec: 'Leinen Salbei, Eichenfüße · Stilreferenz Innovation Living / IKEA FRIHETEN-Klasse', size: [2.0, 0.95] },
    F.sofaBed(M), at(O, 1.95, 0.485));
  add({ id: 'art-office', room: 'office', name: 'Tuschebild 90 × 70', cat: 'Kunst', spec: 'Rahmen Eiche', size: [0.9, 0.03], plan: false },
    D.artwork(M, 'ink', 0.9, 0.7, { seed: 11 }), at(O, 1.95, 0.025, 0, 1.45));
  add({ id: 'desk', room: 'office', name: 'Schreibtisch 140 × 65', cat: 'Tisch', spec: 'Eiche hell, Schubkasten Räuchereiche, Kufen schwarz', size: [1.4, 0.65] },
    grp([F.desk(M, { w: 1.4 })], [D.mushroomLamp(M, { h: 0.38, r: 0.15 }), -0.5, 0.75, -0.18], [laptop(M), 0.05, 0.75, 0.02], [D.bookStack(M, 3, { seed: 31, w: 0.26, d: 0.2 }), 0.52, 0.75, -0.16, 0.2]),
    at(O, 3.155, 1.95, -Math.PI / 2));
  add({ id: 'task-chair', room: 'office', name: 'Bürostuhl Samt Salbei', cat: 'Polster', spec: 'Bronze-Fußkreuz', size: [0.6, 0.6], round: true },
    F.taskChair(M), at(O, 2.55, 1.95, Math.PI / 2));
  add({ id: 'shelving', room: 'office', name: 'Einbauregal hinterleuchtet', cat: 'Möbel', spec: 'Räuchereiche, LED je Boden · 130 × 35 × 230 cm', size: [1.3, 0.35] },
    shelfStyled(M, lib), at(W28, 0.78, 0.175));
  add({ id: 'floorlamp-office', room: 'office', name: 'Stehleuchte', cat: 'Leuchte', spec: 'Bronze/Leinen', size: [0.32, 0.32], round: true },
    D.floorLamp(M, { h: 1.55 }), at(O, 0.62, 0.17));
  add({ id: 'plant-office', room: 'office', name: 'Pflanze Pachira 120 cm', cat: 'Pflanze', spec: 'Kübel Anthrazit', size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'pachiraSmall', { height: 1.3, potR: 0.18, potH: 0.38, maxR: 0.25 }), at(O, 3.2, 0.9));
  add({ id: 'rug-office', room: 'office', name: 'Teppich 200 × 140', cat: 'Textil', spec: 'Wolle, Taupe', size: [2.0, 1.4], plan: 'soft' },
    T.rug(M, 2.0, 1.4, { mat: 'rugDark', border: 'rugDark' }), at(O, 1.95, 1.55));

  // ======================================================================== BAD
  add({ id: 'laundry', room: 'bath', name: 'Waschturm WM/TR hinter Fronten', cat: 'Möbel', spec: 'Räuchereiche, 72 × 62 × 210 cm', size: [0.72, 0.62] },
    B.laundryTower(M), abs(14.076, 5.883 + 0.315, 0));
  add({ id: 'wc-bath', room: 'bath', name: 'Wand-WC spülrandlos', cat: 'Sanitär', spec: 'Drückerplatte Bronze', size: [0.37, 0.57], anchor: 'back' },
    B.wc(M), abs(14.956, 5.883, 0));
  add({ id: 'vanity-bath', room: 'bath', name: 'Waschtisch 80 schwebend', cat: 'Sanitär', spec: 'Calacatta mit integriertem Becken, Räuchereiche, Wandarmatur Bronze', size: [0.8, 0.46] },
    grp([B.vanity(M)], [D.rectMirror(M, 0.7, 0.9), 0, 1.55, -0.22], [B.bathProps(M), 0.25, 0.86, -0.12]),
    abs(15.87, 5.634 + 0.23, 0));
  add({ id: 'tub', room: 'bath', name: 'Einbauwanne 180 × 80', cat: 'Sanitär', spec: 'Kalkstein-Verkleidung, Glas-Duschwand, Regenbrause Bronze', size: [1.8, 0.8] },
    B.bathtub(M), abs(16.776, 6.554, -Math.PI / 2));
  add({ id: 'towel-bath', room: 'bath', name: 'Handtuchheizkörper Bronze', cat: 'Sanitär', spec: '50 × 120 cm', size: [0.5, 0.1], anchor: 'back' },
    B.towelRadiator(M), abs(15.2, 7.473, Math.PI));
  add({ id: 'stool-bath', room: 'bath', name: 'Hocker Teak + Handtücher', cat: 'Deko', spec: 'Ø 32', size: [0.32, 0.32], round: true },
    grp([teakStool(M)], [T.foldedThrow(M, 'towel', 0.3, 0.22, 0.05), 0, 0.45, 0], [D.candle(M, 0.09, 0.04), 0.08, 0.5, 0.06]),
    abs(16.12, 7.2, 0));
  add({ id: 'plant-bath', room: 'bath', name: 'Farn im Steinzeugtopf', cat: 'Pflanze', spec: '', size: [0.3, 0.3], round: true },
    D.pottedPlant(M, lib, 'fern', { height: 0.6, potR: 0.14, potH: 0.28, potMat: 'stonewareCharcoal', shape: 'cylinder', maxR: 0.22 }), abs(14.75, 7.28, 0));

  // ======================================================================== DUSCHE / GÄSTE-WC
  add({ id: 'shower-guest', room: 'guestbath', name: 'Walk-in-Dusche 105 × 80', cat: 'Sanitär', spec: 'bodengleich, Linienrinne, Regenbrause Bronze, Nische beleuchtet', size: [1.05, 0.8] },
    B.walkInShower(M), abs(9.884, 6.132, 0));
  add({ id: 'vanity-guest', room: 'guestbath', name: 'Waschtisch mit Aufsatzbecken', cat: 'Sanitär', spec: 'Räuchereiche/Calacatta, Becken Steinzeug', size: [0.7, 0.42] },
    grp([B.vesselVanity(M)], [D.roundMirror(M, 0.6, { led: true }), 0, 1.5, -0.19], [B.bathProps(M), -0.24, 0.825, -0.1]),
    abs(11.1, 5.583 + 0.21, 0));
  add({ id: 'wc-guest', room: 'guestbath', name: 'Wand-WC', cat: 'Sanitär', spec: 'Drückerplatte Bronze', size: [0.37, 0.57], anchor: 'back' },
    B.wc(M), abs(9.359, 7.05, Math.PI / 2));
  add({ id: 'towel-guest', room: 'guestbath', name: 'Handtuchheizkörper', cat: 'Sanitär', spec: '50 × 100 cm', size: [0.5, 0.1], anchor: 'back' },
    B.towelRadiator(M, { h: 1.0, y0: 0.35 }), abs(11.716, 6.75, -Math.PI / 2));
  add({ id: 'sconce-guest', room: 'guestbath', name: 'Wandleuchte linear', cat: 'Leuchte', spec: 'Bronze/Opal', size: [0.05, 0.05], plan: false },
    D.linearSconce(M, { h: 0.45 }), abs(10.62, 5.583 + 0.05, 0, 1.5));

  // ======================================================================== HWR
  const U = frameOf('W47'), W48 = frameOf('W48'), W49 = frameOf('W49');
  add({ id: 'utility-tall', room: 'utility', name: 'Hochschrank Vorräte/Sauger', cat: 'Möbel', spec: 'Räuchereiche, in der Nische W50 · 80 × 45 × 220 cm (Türschwenk frei)', size: [0.8, 0.45] },
    grp([boxOn(new THREE.Group(), M.smokedOak, [0.8, 2.2, 0.45], [0, 0, 0]).parent], [(() => { const g = new THREE.Group(); box(g, M.matteBlack, [0.004, 2.1, 0.004], [0, 1.1, 0.226]); box(g, M.bronze, [0.014, 0.5, 0.02], [-0.04, 1.1, 0.235]); box(g, M.bronze, [0.014, 0.5, 0.02], [0.04, 1.1, 0.235]); return g; })()]),
    at(frameOf('W50'), 0.42, 0.226));
  add({ id: 'utility-tech', room: 'utility', name: 'Unterverteilung + Router', cat: 'Technik', spec: 'Bestand, frei zugänglich', size: [0.6, 0.1], plan: false },
    techPanel(M), at(U, 1.72, 0.0, 0, 1.0));
  add({ id: 'utility-manifold', room: 'utility', name: 'Heizkreisverteiler (Bestand)', cat: 'Technik', spec: 'Revisionsschrank', size: [0.8, 0.12] },
    grp([boxOn(new THREE.Group(), M.plasticWhite, [0.8, 0.7, 0.12], [0, 0.3, 0]).parent]), at(W48, 0.55, 0.06));
  add({ id: 'utility-shelf', room: 'utility', name: 'Regal mit Körben', cat: 'Möbel', spec: 'Eiche/Stahl schwarz, 100 × 35 × 190 cm', size: [1.0, 0.35] },
    utilityShelf(M), at(W49, 0.62, 0.175));

  // ======================================================================== BALKONE
  add({ id: 'b1-lounge-a', room: 'balcony1', name: 'Outdoor-Sessel Teak', cat: 'Outdoor', spec: 'Teak, Kissen Outdoor-Leinen', size: [0.74, 0.82] },
    F.outdoorLounge(M), abs(11.84, 9.98, 0.25));
  add({ id: 'b1-lounge-b', room: 'balcony1', name: 'Outdoor-Sessel Teak', cat: 'Outdoor', spec: 'Teak, Kissen Outdoor-Leinen', size: [0.74, 0.82] },
    F.outdoorLounge(M), abs(12.84, 9.98, -0.25));
  add({ id: 'b1-table', room: 'balcony1', name: 'Beistelltisch Travertin', cat: 'Outdoor', spec: 'Ø 42', size: [0.42, 0.42], round: true },
    grp([F.sideTable(M, { h: 0.45 })], [D.candle(M, 0.14, 0.05), 0, 0.45, 0]), abs(12.34, 10.22, 0));
  add({ id: 'b1-tree', room: 'balcony1', name: 'Kübelpflanze groß', cat: 'Pflanze', spec: 'Pflanzkübel Anthrazit Ø 50', size: [0.5, 0.5], round: true },
    D.pottedPlant(M, lib, 'pachira', { height: 1.9, potR: 0.25, potH: 0.55, seed: 3, maxR: 0.34 }), abs(10.74, 9.66, 0));
  add({ id: 'b1-fern', room: 'balcony1', name: 'Farn im Kübel', cat: 'Pflanze', spec: '', size: [0.4, 0.4], round: true },
    D.pottedPlant(M, lib, 'fern', { height: 0.8, potR: 0.2, potH: 0.42, potMat: 'stonewareSand', shape: 'cylinder', maxR: 0.3 }), abs(10.55, 11.7, 0));
  add({ id: 'b2-bistro', room: 'balcony2', name: 'Bistro-Set 2 Personen', cat: 'Outdoor', spec: 'Travertin-Tisch Ø 64, Teak-Stühle', size: [1.5, 0.64] },
    grp([F.bistroSet(M)], [D.vase(M, 'bud', 'stonewareSage', 1), 0.05, 0.75, 0]), abs(3.95, 20.15, -0.14));
  add({ id: 'b2-plant', room: 'balcony2', name: 'Kübelpflanze', cat: 'Pflanze', spec: '', size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachiraMid', { height: 1.6, potR: 0.22, potH: 0.5, seed: 5, maxR: 0.3 }), abs(4.9, 19.66, 0));

  // ======================================================================== CURTAINS & LIGHT
  const curtains = [['W06', 0, 'curtain'], ['W06', 1, 'curtain'], ['W04', 0, 'curtain'], ['W03', 0, 'curtain'], ['W21', 0, 'curtainDim'], ['W21', 1, 'curtainDim'], ['W27', 0, 'curtain'], ['W27', 1, 'curtain']];
  curtains.forEach(([wid, i, mat], k) => {
    const w = WALLS.find((x) => x.id === wid), o = w.openings[i], fr = frameOf(wid);
    const span = o.u1 - o.u0;
    add({ id: `curtain-${wid}-${i}`, room: w.room, name: 'Vorhang Leinen, Deckenschiene', cat: 'Textil', spec: mat === 'curtainDim' ? 'Dim-out-Leinen Greige, Wellenfalte' : 'Leinen Ivory, Wellenfalte', size: [span + 0.56, 0.1], plan: false },
      T.curtainSet(M, span, { mat, seed: k * 3 + 1, top: 2.49 }), at(fr, (o.u0 + o.u1) / 2, 0.11));
  });

  const spots = [
    ['living', 9.65, 8.3], ['living', 10.9, 8.3], ['living', 12.15, 8.3], ['living', 12.72, 6.55],
    ['kitchen', 4.55, 16.15], ['kitchen', 4.35, 17.6], ['bath', 14.95, 6.85], ['bath', 16.0, 6.7], ['guestbath', 10.9, 6.95],
    ['utility', 5.1, 14.55], ['living', 7.3, 9.95], ['living', 6.0, 10.2 + 3.2],
  ];
  spots.forEach(([room, x, y], i) => add({ id: 'spot-' + i, room, name: 'Einbaustrahler', cat: 'Leuchte', spec: 'LED 2700 K, entblendet', size: [0.09, 0.09], round: true, plan: false, ceiling: true },
    D.downlight(M, { light: true, lumens: room === 'living' ? 260 : 320, angle: 1.2 }), abs(x, y, 0, 2.56)));

  add({ id: 'sconce-hall', room: 'living', name: 'Wandleuchte linear', cat: 'Leuchte', spec: 'Bronze/Opal', size: [0.05, 0.05], plan: false },
    D.linearSconce(M), at(HALL, 1.3, 0.05, 0, 1.6));
}

// ------------------------------------------------------------------------------------------
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

function shelfStyled(M, lib) {
  const g = new THREE.Group();
  g.add(F.shelving(M));
  const rows = [[0.82, [[-0.3, 'books', 0.5], [0.35, 'vase']]], [1.22, [[0.2, 'books', 0.6], [-0.4, 'bowl']]], [1.62, [[-0.2, 'stack'], [0.3, 'plant']]], [2.0, [[0, 'books', 0.9]]]];
  for (const [y, items] of rows) for (const [x, kind, w] of items) {
    let o;
    if (kind === 'books') o = D.bookRow(M, w, { seed: Math.round(y * 10), h: 0.24, d: 0.2 });
    else if (kind === 'vase') o = D.vase(M, 'amphora', 'stonewareSand', 0.7);
    else if (kind === 'bowl') o = D.bowl(M, 'bronze', 0.12, 0.05);
    else if (kind === 'stack') o = D.bookStack(M, 3, { seed: 44, w: 0.26, d: 0.2 });
    else o = D.pottedPlant(M, lib, 'succulent', { height: 0.24, potR: 0.07, potH: 0.1, potMat: 'stonewareCharcoal', shape: 'cylinder' });
    o.position.set(x, y + 0.025, -0.02);
    g.add(o);
  }
  return g;
}
