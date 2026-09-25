// Vier Stilwelten für WE 13 – alle aus den Moodboards abgeleitet und auf dieselbe gemessene
// Geometrie geplant. Jede Stilwelt definiert:
//   theme      – Material-Thema (Wandfarben/Kalkputz, Holz-, Metall- und Stein-Umschlüsselung)
//   finish     – Wandmaterial je Raum und Akzentwände (Wandgestaltung)
//   decor      – Ausführungsangaben für gemeinsam genutzte Einbauten (Diele, Bäder, HWR)
//   furnish()  – stilspezifische Möblierung (Wohnen, Essen, Schlafen, Arbeiten)
// Produktangaben: reale Artikel von Westwing (Westwing Collection) und IKEA mit Herstellermaßen
// (Stand Recherche 09/2026). Maßanfertigungen und Stilreferenzen sind als solche gekennzeichnet.
import { FINISH } from '../engine/builders/architecture.js';

const withWalls = (walls) => Object.fromEntries(Object.entries(FINISH).map(([k, v]) => [k, { ...v, ...(walls[k] ? { wall: walls[k] } : {}) }]));

// ------------------------------------------------------------------ gemeinsame Zonierung
// Wohnbereich im Rahmen von W11 (u entlang der Medienwand, v Richtung Essplatz):
// Medienwand v = 0 · Lounge v ≈ 1–4 · Hauptweg Diele → Essplatz/Küche/Schlafen u ≈ 2,8–4,1 ·
// Essplatz Mitte (3,45 | 5,65) · Sideboard an W07 · Lesenische W05/W06.
const SOFA_BACK = 4.0;          // Sofarücken (v), 0,5 m vor dem Wandversatz W09
const DINING = [3.45, 5.65];    // Tischmitte (u, v) – 1,1 m Durchgang zur Küche, Türzone Schlafen frei

function living(ctx, o) {
  const { M, lib, add, at, grp, fr, F, D, T, C } = ctx;
  const L = fr.W11, sofaV = SOFA_BACK - o.sofa.size[1] / 2, sofaFront = sofaV - o.sofa.size[1] / 2;
  o.media(ctx, L);
  add({ id: 'sofa', room: 'living', cat: 'Polster', ...o.sofa.meta, size: o.sofa.size }, o.sofa.build(), at(L, 1.42, sofaV, Math.PI));
  o.coffee(ctx, L, sofaFront);
  // Großer Teppich: Sofa und Sessel stehen mit den Vorderfüßen darauf (Luxus-Regel „Rug anchors the group“)
  const [rw, rd] = o.rug.size ?? [2.4, 3.5];
  add({ id: 'rug-living', room: 'living', cat: 'Textil', name: `Teppich ${rw * 100} × ${rd * 100}`, spec: o.rug.spec, size: [rw, rd], plan: 'soft' }, T.rug(M, rw, rd, { mat: o.rug.mat, border: o.rug.border ?? o.rug.mat }), at(L, 1.42, rd > 3.2 ? 2.3 : 2.45));
  add({ id: 'lounge', room: 'living', cat: 'Polster', ...o.lounge.meta, size: o.lounge.size }, o.lounge.build(), { ...at(L, 4.5, 2.92), yaw: L.face(-3.05, -0.85) });
  add({ id: 'floorlamp-living', room: 'living', cat: 'Leuchte', ...o.lamp.meta, size: [0.45, 0.45], round: true }, o.lamp.build(), at(L, 4.72, 2.6));
  // Einbaubank an W10: setzt die Medienwand-Einbauten ums Eck fort (Stauraum + Sitzplatz, 2,25 m)
  const W10 = fr.W10, benchL = 2.25, benchV0 = 0.47, benchU = W10.length - (benchV0 + benchL / 2);
  const b = o.bench;
  add({ id: 'bench-living', room: 'living', cat: 'Möbel', ...b.meta, size: [benchL, 0.4] },
    grp([F.builtInBench(M, { w: benchL, ...b.opts })],
      [D.pottedPlant(M, lib, 'calathea', { height: 0.62, potR: 0.13, potH: 0.22, potMat: o.pot ?? 'stonewareCharcoal', shape: 'bowl', maxR: 0.26 }), benchL / 2 - 0.24, b.opts.h ?? 0.44, 0],
      [D.bookStack(M, 3, { seed: 27, w: 0.3, d: 0.22 }), b.opts.cushionMat ? benchL / 2 - 0.62 : -benchL / 2 + 0.3, b.opts.h ?? 0.44, 0.02, 0.15],
      [D.bowl(M, o.bowl ?? 'bronze', 0.13, 0.05), b.opts.cushionMat ? benchL / 2 - 0.95 : -benchL / 2 + 0.72, b.opts.h ?? 0.44, 0.03]),
    at(W10, benchU, 0.2));
  add({ id: 'plant-living', room: 'living', name: 'Solitärpflanze Pachira 190 cm', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Keramik Anthrazit'} Ø 44, Ecke hinter dem Sofa`, size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachira', { height: 1.95, potR: 0.22, potH: 0.5, maxR: 0.34, potMat: o.pot ?? 'stonewareCharcoal' }), at(L, 0.3, 4.26));
  // Kunst mittig über der Bank, Bildmitte ≈ 1,45 m (Galerie-Regel)
  add({ id: 'art-living', room: 'living', cat: 'Kunst', plan: false, ...o.art.meta, size: [o.art.w, 0.04] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 4, frame: o.art.frame ?? 'oakLight' }), at(W10, benchU, 0.03, 0, Math.max(1.42, 0.44 + 0.28 + o.art.h / 2)));
  o.extra?.(ctx, L);
  void F; void C; void grp;
}

function dining(ctx, o) {
  const { M, lib, add, at, grp, fr, D } = ctx;
  const L = fr.W11;
  const g = new ctx.THREE.Group();
  g.add(o.table.build());
  g.add(ctx.helpers.chairsAround(4, o.chairR ?? 0.72, o.chair));
  g.add(grp([D.vase(M, 'amphora', o.vase ?? 'stonewareCharcoal', 0.85), 0.05, o.table.h, 0.02], [D.branches(M, { h: 0.55, seed: 5 }), 0.05, o.table.h + 0.3, 0.02], [D.tray(M, 'bronzeDark', 0.36, 0.24), -0.22, o.table.h, -0.12, 0.3]));
  add({ id: 'dining', room: 'living', cat: 'Tisch', ...o.table.meta, size: [2.15, 2.15], round: true }, g, at(L, DINING[0], DINING[1], 0.08));
  add({ id: 'pendant-dining', room: 'living', cat: 'Leuchte', plan: false, ...o.pendant.meta, size: [0.8, 0.8], round: true }, o.pendant.build(), at(L, DINING[0], DINING[1], o.pendant.rot ?? 0));
  const sb = o.sideboard;
  add({ id: 'sideboard', room: 'living', cat: 'Möbel', ...sb.meta, size: [sb.w, sb.d] },
    grp([sb.build()],
      [D.mushroomLamp(M, { h: 0.46, r: 0.19, mat: o.lampMat ?? 'bronze' }), -sb.w / 2 + 0.3, sb.h, -0.02],
      [D.vase(M, 'amphora', o.vase2 ?? 'stonewareSand', 1.05), sb.w / 2 - 0.35, sb.h, -0.05],
      [D.branches(M, { h: 0.75, spread: 0.45, seed: 9 }), sb.w / 2 - 0.35, sb.h + 0.39, -0.05],
      [D.bowl(M, o.bowl ?? 'bronze', 0.16, 0.06), 0.1, sb.h, 0.02],
      [D.stoneStack(M), sb.w / 2 - 0.12, sb.h, 0.08]),
    at(fr.W07, 1.56, sb.d / 2 + 0.005));
  add({ id: 'art-dining', room: 'living', cat: 'Kunst', plan: false, ...o.art.meta, size: [o.art.w, 0.04] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 2, frame: o.art.frame ?? 'oakLight' }), at(fr.W07, 1.56, 0.03, 0, sb.h + 0.15 + o.art.h / 2 + 0.12));
  add({ id: 'plant-dining', room: 'living', name: 'Solitärpflanze 180 cm', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Steinzeug Sand'}`, size: [0.44, 0.44], round: true },
    D.pottedPlant(M, lib, 'pachiraMid', { height: 1.8, potR: 0.22, potH: 0.46, potMat: o.pot ?? 'stonewareSand', shape: 'bowl', seed: 2, maxR: 0.3 }), at(L, 4.68, 7.08));
  const hb = o.highboard;
  add({ id: 'highboard', room: 'living', cat: 'Möbel', ...hb.meta, size: [hb.w, hb.d] }, hb.build(), at(fr.W08, 0.678, hb.d / 2 + 0.005));
}

function bedroom(ctx, o) {
  const { M, lib, add, at, grp, fr, D, T } = ctx;
  const W20 = fr.W20, S = fr.W19;
  const wallD = o.wall ? o.wall.d : 0;
  if (o.wall) add({ id: 'bed-wall', room: 'bedroom', cat: 'Wand', anchor: 'back', ...o.wall.meta, size: [4.17, o.wall.d] }, o.wall.build(), at(W20, 2.087, 0));
  add({ id: 'bed', room: 'bedroom', cat: 'Bett', ...o.bed.meta, size: o.bed.size }, o.bed.build(), at(W20, 2.087, wallD + o.bed.size[1] / 2 + 0.005));
  for (const [id, u] of [['nightstand-n', o.nightU?.[0] ?? 0.8], ['nightstand-s', o.nightU?.[1] ?? 3.37]]) {
    const n = o.night;
    add({ id, room: 'bedroom', cat: 'Möbel', ...n.meta, size: n.size },
      grp([n.build()], [D.bookStack(M, 2, { seed: u * 10, w: 0.22, d: 0.16 }), -0.08, n.top, 0], [D.vase(M, 'bud', o.vase ?? 'stonewareSage', 1), 0.12, n.top, 0.05]),
      at(W20, u, wallD + n.size[1] / 2 + 0.005));
    add({ id: id + '-pendant', room: 'bedroom', cat: 'Leuchte', plan: false, ...o.pendant.meta, size: [0.2, 0.2], round: true }, o.pendant.build(), at(W20, u, wallD + 0.26));
  }
  add({ id: 'art-bed', room: 'bedroom', cat: 'Kunst', plan: false, ...o.art.meta, size: [o.art.w, 0.03] }, D.artwork(M, o.art.kind, o.art.w, o.art.h, { seed: o.art.seed ?? 6, frame: o.art.frame ?? 'oakLight' }), at(W20, 2.087, wallD + 0.02, 0, o.art.y));
  add({ id: 'wardrobe', room: 'bedroom', cat: 'Möbel', ...o.wardrobe.meta, size: [3.0, 0.6] }, o.wardrobe.build(), at(fr.W22, 1.5, 0.3));
  add({ id: 'reading-chair', room: 'bedroom', cat: 'Polster', ...o.chair.meta, size: o.chair.size, round: o.chair.round }, o.chair.build(), { ...at(S, 2.6, 3.64), yaw: S.face(-0.55, -1) });
  add({ id: 'floorlamp-bed', room: 'bedroom', cat: 'Leuchte', ...o.lamp.meta, size: [0.4, 0.4], round: true }, o.lamp.build(), at(S, 1.98, 3.93));
  add({ id: 'plant-bed', room: 'bedroom', name: 'Pflanze Alocasia', cat: 'Pflanze', spec: `Kübel ${o.potName ?? 'Steinzeug Salbei'}`, size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'alocasia', { height: 1.05, potR: 0.18, potH: 0.36, potMat: o.pot ?? 'stonewareSage', shape: 'bowl', maxR: 0.26 }), at(S, 3.5, 3.95));
  add({ id: 'rug-bed', room: 'bedroom', name: 'Teppich 200 × 300', cat: 'Textil', spec: o.rug.spec, size: [2.0, 3.0], plan: 'soft' },
    T.rug(M, 2.0, 3.0, { mat: o.rug.mat, border: o.rug.mat }), at(S, 2.2, 2.087));
}

function office(ctx, o) {
  const { M, lib, add, at, grp, fr, D, T, C, F } = ctx;
  const O = fr.W23;
  add({ id: 'sofabed', room: 'office', name: 'IKEA HYLTARP Bettsofa 2', cat: 'Polster', spec: `${o.sofabed.fabricName} · 182 × 93 × 82 cm, Sitzhöhe 48 cm, Liegefläche 140 × 200 cm (Westwing-Kissen)`, size: [1.82, 0.93] },
    C.sofaBed(M, o.sofabed.opts), at(O, 1.95, 0.47));
  add({ id: 'art-office', room: 'office', cat: 'Kunst', plan: false, ...o.art.meta, size: [0.9, 0.03] }, D.artwork(M, o.art.kind, 0.9, 0.7, { seed: o.art.seed ?? 11, frame: o.art.frame ?? 'oakLight' }), at(O, 1.95, 0.025, 0, 1.45));
  add({ id: 'desk', room: 'office', name: 'IKEA TONSTAD Schreibtisch 140 × 75', cat: 'Tisch', spec: `${o.desk.name} · 140 × 75 × 75 cm, Schublade, Massivholzknopf`, size: [1.4, 0.75] },
    grp([C.deskT(M, { mat: o.desk.mat, knob: o.desk.mat })], [D.mushroomLamp(M, { h: 0.36, r: 0.14, mat: o.desk.lamp ?? 'bronze' }), -0.5, 0.75, -0.2], [ctx.helpers.laptop(M), 0.05, 0.75, 0.02], [D.bookStack(M, 3, { seed: 31, w: 0.26, d: 0.2 }), 0.52, 0.75, -0.18, 0.2]),
    at(O, 3.48 - 0.375 - 0.005, 1.95, -Math.PI / 2));
  add({ id: 'task-chair', room: 'office', name: 'Westwing Leder-Bürostuhl Alain', cat: 'Polster', spec: `Westwing Collection, höhenverstellbar, Armlehnen · ${o.chairSpec}`, size: [0.6, 0.6], round: true },
    F.taskChair(M, { fabric: o.chairFabric }), at(O, 2.42, 1.95, Math.PI / 2));
  // Raumhohe Bibliothekswand über die volle Wand W28 (150 cm): unten geschlossen, oben offen
  const lw = F.libraryWall(M, { w: 1.5, d: 0.4, h: 2.52, ...o.library.opts });
  const styled = new ctx.THREE.Group(); styled.position.z = lw.userData.shelfZ + 0.02; lw.add(styled);
  ctx.helpers.styleShelf(M, lib, styled, lw.userData.shelves.slice(1), 1.4, { bowl: o.library.bowl ?? 'bronzeDark', vase: o.library.vase ?? 'stonewareSand' });
  add({ id: 'shelving', room: 'office', cat: 'Möbel', name: 'Bibliothekswand raumhoch 150 cm', spec: o.library.spec, size: [1.5, 0.4] }, lw, at(fr.W28, 0.75, 0.2));
  add({ id: 'floorlamp-office', room: 'office', name: 'Stehleuchte', cat: 'Leuchte', spec: o.lampSpec ?? 'Leinenschirm plissiert, 2700 K', size: [0.32, 0.32], round: true },
    D.floorLamp(M, { h: 1.55 }), at(O, 0.62, 0.17));
  add({ id: 'plant-office', room: 'office', name: 'Pflanze Pachira 120 cm', cat: 'Pflanze', spec: '', size: [0.36, 0.36], round: true },
    D.pottedPlant(M, lib, 'pachiraSmall', { height: 1.3, potR: 0.18, potH: 0.38, maxR: 0.25, potMat: o.pot ?? 'stonewareCharcoal' }), at(O, 3.2, 0.9));
  add({ id: 'rug-office', room: 'office', name: 'Teppich 200 × 140', cat: 'Textil', spec: o.rugSpec ?? 'Wolle, Taupe', size: [2.0, 1.4], plan: 'soft' },
    T.rug(M, 2.0, 1.4, { mat: o.rugMat ?? 'rugDark', border: o.rugMat ?? 'rugDark' }), at(O, 1.95, 1.55));
}

/** Small helpers used inside style definitions. */
const nightFloat = (spec) => ({ meta: { name: 'Nachttisch schwebend', spec }, size: [0.5, 0.38], top: 0.578, build: null });
const shelfItem = (ctx, { name, spec, w, d, h, shelves, mat }) => ({
  meta: { name, spec }, w, d,
  build: () => { const g = ctx.C.bookcase(ctx.M, { w, d, h, shelves, mat }); ctx.helpers.styleShelf(ctx.M, ctx.lib, g, h < 1.5 ? [...g.userData.shelves.slice(1), h] : g.userData.shelves.slice(1), w, { bowl: 'bronzeDark' }); return g; },
});

// ============================================================================================
export const STYLES = {
  // ------------------------------------------------------------------ 1 · Signatur
  metallic: {
    id: 'metallic',
    label: 'Refined Metallic Japandi',
    short: 'Metallic Japandi',
    claim: 'Ruhig. Kuratiert. Zeitgenössisch.',
    lead: 'Das Signatur-Konzept: warme Eiche, kannelierte Räuchereiche, heller Calacatta, gebürstete Bronze und Salbei-Akzente auf warm-greigem Kalkputz. Skulpturale Rundformen in Bouclé setzen den weichen Kontrapunkt zu den linearen Lamellenwänden.',
    moodboard: 'Moodboard Refined Metallic Japandi.png',
    palette: [['Crisp Off-White', '#ECE8E1'], ['Soft Gray', '#C9C4BC'], ['Taupe Greige', '#B3AA9D'], ['Muted Sage', '#8A9582'], ['Warm Taupe', '#8B7D6F'], ['Warm Bronze', '#6E5A45'], ['Charcoal', '#333230'], ['Soft Black', '#1E1E1D']],
    materials: [
      ['Eiche natur, Landhausdiele 190 × 20 cm, geölt', 'Boden Wohnen/Schlafen/Arbeiten/Küche'],
      ['Räuchereiche, kanneliert', 'Lamellen der Medienwand, Lowboard, Einbaubank, Sideboard (Westwing Calary), Bibliothekswand, Nachttische'],
      ['Calacatta-Marmor, hell', 'Couchtisch, Deckplatten Lowboard/Einbaubank, Ablagen der Bad-Vorwände'],
      ['Bronze, gebürstet', 'Leuchten, Griffe, Armaturen, Sockel'],
      ['Bouclé Off-White · Taupe · Samt Salbei', 'Sofa Alba, Bett Dream, Kissen, Sessel'],
      ['Kalkputz warm-greige, Akzent Taupe/Salbei', 'Wände; Schlafzimmer eine Nuance tiefer'],
      ['Kalkstein 60 × 120 cm', 'Bäder, raumhoch; HWR-Boden'],
    ],
    walls: [
      ['Medienwand W11', 'Raumhohe Räuchereichen-Lamellen (dunkel, wie Bett- und Einbauten) auf schwarzem Akustikfilz, LED-Voute oben'],
      ['Lesewand W10', 'Schwebende, kannelierte Einbaubank 225 cm (Stauraum) als Fortsetzung des Lowboards, Kunst mittig darüber'],
      ['Essplatz W07', 'Kalkputz Taupe (tiefer Ton, stärkere Struktur) als Bühne für Sideboard und Kunst'],
      ['Schlafen W20', 'Räuchereichen-Lamellenwand hinter dem Bett'],
      ['Arbeiten W23', 'Kalkputz Salbei hinter dem Schlafsofa'],
      ['Übrige Wände', 'Kalkputz Warm-Greige, Schlafzimmer eine Nuance tiefer; Sockel im Wandton'],
    ],
    lightPlan: ['Grundlicht: entblendete LED-Einbaustrahler 2700 K, CRI > 95', 'Akzent: LED-Voute an der Lamellenwand, hinterleuchtete Regalböden', 'Zonen: Bronze-Saucer Ø 80 über dem Esstisch, Opal-Pendel neben dem Bett', 'Stimmung: Pilz-Tischleuchten, Stehleuchte Kaya am Lesesessel'],
    theme: null,
    finish: FINISH,
    wallOverride: { W07: 'wallAccent', W23: 'wallSage' },
    decor: { metal: 'Bronze gebürstet', builtIn: 'Räuchereiche kanneliert', bathFront: 'Räuchereiche', bathTop: 'Calacatta', vase: 'stonewareCharcoal', hallArt: { kind: 'ink', name: 'Tuschezeichnung 60 × 80' } },
    notes: {
      living: { title: 'Wohnen · Essen · Diele', zoning: 'Drei Zonen entlang der Raumtiefe: Medienwand (W11) – Lounge – Essplatz vor der Fensterfront (W06).', points: [
        'Raumhohe Räuchereichen-Lamellenwand (dunkel) mit LED-Voute; schwebendes, kanneliertes Lowboard 260 cm, The Frame 65″ im Kunstmodus.',
        'L-förmige Einbau-Joinery: kannelierte Einbaubank 225 cm an W10 mit drei Schubkästen und Calacatta-Deckplatte – Stauraum, Sitz- und Ablagefläche zugleich.',
        'Westwing Sofa Alba (Nierenform, 235 × 114 cm) in Teddy-Bouclé; Sehabstand ≈ 3,2 m; Marmor-Rundtisch Ø 100 mit 45 cm Knieraum.',
        'Hauptweg Diele → Essplatz/Küche/Schlafen ≥ 1,0 m frei; Westwing-Sessel Mikkel + Stehleuchte Kaya in der Fensternische.',
        'Westwing Esstisch Sahra Ø 116 (organischer Säulenfuß) mit vier Westwing-Armlehnstühlen Adrien, Bronze-Saucer darüber; 1,1 m Durchgang zur Küche.',
        'Westwing Sideboard Calary (Dark Oak, geriffelte Schiebetüren) vor Taupe-Kalkputz (W07).',
      ] },
      bedroom: { title: 'Schlafen', zoning: 'Bett mit Kopfteil an W20, PAX-Einbauschrank an W22, Leseplatz am Fenster (Südostecke).', points: ['Westwing Polsterbett Dream 180 × 200 (196 × 222 cm) in Bouclé Taupe vor Räuchereichen-Lamellen; schwebende Nachttische, Opal-Pendel.', 'IKEA PAX 3 × 100 × 58 × 236 cm mit kannelierten Maßfronten und Deckenblende; 91 cm Gang zum Bettende, Türen frei schwenkbar.', 'Samt-Drehsessel + Stehleuchte in der Fensterecke; Verdunkelung IKEA MAJGULL.'] },
      office: { title: 'Arbeiten / Gäste', zoning: 'Bettsofa an W23, Schreibtisch mit seitlichem Tageslicht an W24/W26, raumhohe Bibliothekswand an W28.', points: ['IKEA HYLTARP Bettsofa (182 × 93 cm, Liegefläche 140 × 200) in Salbei – ausgeklappt bleibt der Schreibtisch nutzbar.', 'IKEA TONSTAD Schreibtisch 140 × 75, Westwing Leder-Bürostuhl Alain (Caramel).', 'Bibliothekswand Räuchereiche über die volle Wand (150 × 40 × 252): kannelierte Unterschränke, beleuchtete Böden.'] },
    },
    furnish(ctx) {
      const { M, add, at, grp, F, D, C } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'tv-wall', room: 'living', name: 'Lamellenwand Räuchereiche mit LED-Voute', cat: 'Wand', spec: 'Maßanfertigung: Räuchereichen-Lamellen 30 × 22 mm (dunkel, passend zu Bettwand und Einbauten) auf Akustikfilz schwarz, raumhoch, 284 cm', size: [2.84, 0.034], anchor: 'back' },
            grp([F.slatWall(M, { w: 2.839, mat: 'smokedOak' })], [D.ledLine(M, 2.7, { lumensPerM: 500 }), 0, 2.5, 0.08]), at(L, 1.4195, 0));
          add({ id: 'lowboard', room: 'living', name: 'Lowboard schwebend, kanneliert 260 cm', cat: 'Möbel', spec: 'IKEA BESTÅ-Korpusse wandhängend (2 × 120 × 40 × 38 + Maßwange) mit Maßfronten Räuchereiche kanneliert, Calacatta-Deckplatte, Kabelkanal verdeckt · 260 × 42 cm, Montagehöhe 22 cm', size: [2.6, 0.42] },
            grp([F.lowboard(M, { w: 2.6 })], [D.mushroomLamp(M), -1.02, 0.62, 0.02], [D.bookStack(M, 3, { seed: 3 }), 0.78, 0.62, 0.02, 0.2], [D.vase(M, 'moon', 'stonewareCharcoal', 0.9), 1.05, 0.62, 0.0], [D.bowl(M, 'bronze', 0.12, 0.05), 0.5, 0.62, 0.05]),
            at(L, 1.42, 0.034 + 0.21));
          add({ id: 'tv', room: 'living', name: 'Samsung The Frame 65″ (Kunstmodus)', cat: 'Technik', spec: 'Wandmontage bündig, Rahmen Eiche hell, Bildmitte 1,20 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65 }), at(L, 1.42, 0.034 + 0.016, 0, 1.2));
        },
        sofa: { size: [2.35, 1.14], meta: { name: 'Westwing Sofa Alba (3-Sitzer)', spec: 'Westwing Collection, Nierenform, Teddy-Bouclé Off-White · 235 × 114 × 69 cm, Sitzhöhe 43 cm' }, build: () => F.curvedSofa(M, { w: 2.35, d: 1.14, h: 0.69, plinth: 'matteBlack' }) },
        coffee: (c, L, front) => {
          add({ id: 'coffee', room: 'living', name: 'Couchtisch rund Ø 100', cat: 'Tisch', spec: 'Calacatta-Marmor auf Bronze-Trommelfuß, H 36 cm (Maßanfertigung Naturstein)', size: [1.0, 1.0], round: true },
            grp([F.coffeeTableRound(M)], [D.bookStack(M, 2, { seed: 8, w: 0.32, d: 0.24 }), 0.18, 0.36, 0.1, 0.4], [D.vase(M, 'bottle', 'stonewareSage', 0.8), -0.12, 0.36, -0.12], [D.bowl(M, 'bronze', 0.15, 0.06), 0.02, 0.36, 0.24], [D.candle(M, 0.1, 0.035), 0.24, 0.414, 0.14]),
            at(L, 1.42, front - 0.45 - 0.5));
          add({ id: 'side-table', room: 'living', name: 'Beistelltisch Travertin Ø 42', cat: 'Tisch', spec: 'Travertin, Bronzesäule, H 52 cm', size: [0.42, 0.42], round: true },
            grp([F.sideTable(M)], [D.bookStack(M, 2, { seed: 12, w: 0.24, d: 0.18 }), 0, 0.52, 0], [D.vase(M, 'bud', 'stoneware', 1.1), 0.08, 0.57, 0.06]), at(L, 2.9, 3.3));
        },
        rug: { mat: 'rug', border: 'rugDark', spec: 'IKEA STOENSE Kurzflor 240 × 350 cm, beige' },
        bench: { meta: { name: 'Einbaubank schwebend, kanneliert', spec: 'Maßanfertigung Räuchereiche kanneliert auf IKEA BESTÅ-Korpussen, 3 Schubkästen, Calacatta-Deckplatte, LED-Unterleuchtung · 225 × 40 × 44 cm' }, opts: { mat: 'smokedOak', top: 'marbleFine', fronts: 'fluted', lift: 0.12 } },
        lounge: { size: [0.66, 0.77], meta: { name: 'Westwing Loungesessel Mikkel', spec: 'Bouclé Off-White, Gestell Holz dunkel · 66 × 77 × 79 cm, Sitzhöhe 46 cm' }, build: () => grp([C.armchair(M, { w: 0.66, d: 0.77, h: 0.79, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'walnut', fabric: 'boucle' })], [(() => { const k = ctx.T.cushion(M, 'velvetSage', [0.4, 0.32, 0.13]); k.rotation.x = -0.3; return k; })(), 0, 0.64, -0.17]) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß anthrazit, Schirm Baumwolle/Leinen Ø 45 cm, H 156 cm, 2700 K' }, build: () => C.drumFloorLamp(M) },
        art: { kind: 'fields', w: 1.1, h: 0.85, seed: 4, meta: { name: 'Kunstwerk „Stein & Salbei“ 110 × 85', spec: 'Acryl auf Leinwand, Schattenfugenrahmen Eiche' } },
      });
      dining(ctx, {
        table: { h: 0.75, meta: { name: 'Westwing Esstisch Sahra Ø 116 + 4 Armlehnstühle Adrien', spec: 'Westwing Collection, organischer Säulenfuß Ø 55, lackiert Greige · Ø 116 × 75 cm; Westwing Cord-/Bouclé-Armlehnstühle Adrien beige, Gestell schwarz' }, build: () => C.roundTable(M, { dia: 1.16, top: 'lacquerGreige', topT: 0.025, base: 'drum', baseMat: 'lacquerGreige', baseDia: 0.55 }) },
        chair: () => C.chair(M, { kind: 'shell', fabric: 'boucleOat', frame: 'blackMatte' }),
        pendant: { meta: { name: 'Pendelleuchte Saucer Ø 80', spec: 'Bronze gebürstet, Opaldiffusor, Unterkante 1,61 m (Designleuchte, Stilreferenz)' }, build: () => D.saucerPendant(M) },
        sideboard: { w: 1.6, d: 0.45, h: 0.75, meta: { name: 'Westwing Sideboard Calary', spec: 'Dark Oak, geriffelte Schiebetüren, Eichenbeine 17 cm · 160 × 45 × 75 cm' }, build: () => C.cabinet(M, { w: 1.6, d: 0.45, h: 0.75, legH: 0.17, fronts: 'ribbed', doors: 2, mat: 'smokedOak', pull: 'bronze' }) },
        art: { kind: 'landscape', w: 1.2, h: 0.85, meta: { name: 'Kunstwerk „Nebellandschaft“ 120 × 85', spec: 'Öl/Acryl, Rahmen Eiche' } },
        highboard: { w: 0.9, d: 0.35, meta: { name: 'Highboard Rauchglas (Bar/Gläser)', spec: 'Maßanfertigung Räuchereiche, Rauchglastüren, LED-Innenlicht · 90 × 35 × 155 cm' }, build: () => grp([F.glassHighboard(M)], [D.vase(M, 'bud', 'stonewareCharcoal', 1.2), -0.22, 1.55, 0], [D.bookStack(M, 2, { seed: 17, w: 0.26, d: 0.2 }), 0.18, 1.55, 0.0, 0.3]) },
      });
      bedroom(ctx, {
        wall: { d: 0.034, meta: { name: 'Lamellenwand Räuchereiche', spec: 'Maßanfertigung, raumhoch, 417 cm' }, build: () => F.slatWall(M, { w: 4.17, mat: 'smokedOak' }) },
        bed: { size: [1.96, 2.22], meta: { name: 'Westwing Polsterbett Dream 180 × 200', spec: 'Bouclé Taupe · 196 × 222 cm, Kopfteil H 110 / T 14 cm; Bettwäsche Leinen, Plaid Salbei' }, build: () => C.bedModel(M, { kind: 'dream', frame: 'boucleTaupe' }) },
        night: { ...nightFloat('Maßanfertigung Räuchereiche kanneliert, Marmorplatte · 50 × 38 cm'), build: () => F.nightstand(M) },
        pendant: { meta: { name: 'Opal-Pendel', spec: 'Opalglas Ø 20, Bronze' }, build: () => D.globePendant(M, { drop: 1.0 }) },
        art: { kind: 'sage', w: 1.2, h: 0.75, y: 1.72, meta: { name: 'Kunstwerk „Salbei“ 120 × 75', spec: 'Acryl, Rahmen Eiche' } },
        wardrobe: { meta: { name: 'Einbauschrank IKEA PAX 300 cm', spec: 'IKEA PAX 3 × 100 × 58 × 236 cm, Maßfronten Räuchereiche kanneliert, Griffleisten Bronze, Deckenblende' }, build: () => C.paxWardrobe(M, { fronts: 'fluted', frontMat: 'smokedOak', handle: 'bar', handleMat: 'bronze' }) },
        chair: { size: [0.78, 0.78], round: true, meta: { name: 'Drehsessel Samt Salbei', spec: 'Ø 78 cm, Bronzefuß (Stilreferenz)' }, build: () => F.tubChair(M) },
        lamp: { meta: { name: 'Stehleuchte Bronze / Plissee', spec: 'Marmorfuß, Leinenschirm plissiert, 2700 K' }, build: () => D.floorLamp(M, { h: 1.5 }) },
        rug: { mat: 'rug', spec: 'IKEA STOENSE Kurzflor 200 × 300 cm, beige' },
      });
      office(ctx, {
        sofabed: { fabricName: 'Bezug Salbei', opts: { fabric: 'linenSage', legs: 'oakDark', pillows: ['linenIvory', 'velvetCognac'] } },
        art: { kind: 'ink', meta: { name: 'Tuschebild 90 × 70', spec: 'Rahmen Eiche' } },
        desk: { name: 'Eichenfurnier', mat: 'oakNatural', lamp: 'bronze' },
        chairFabric: 'leatherCognac', chairSpec: 'Leder Caramel',
        library: { spec: 'IKEA BESTÅ-Unterschränke (2 × 60 + Passteil) mit Maßfronten Räuchereiche kanneliert, Regalaufsatz Räuchereiche mit LED je Boden · 150 × 40 × 252 cm', opts: { mat: 'smokedOak', fronts: 'fluted', doors: 2 } },
      });
    },
  },

  // ------------------------------------------------------------------ 2 · Soft Brutalism
  soft: {
    id: 'soft',
    label: 'Japandi × Soft Brutalism',
    short: 'Soft Brutalism',
    claim: 'Ruhe in Form und Material.',
    lead: 'Heller und erdiger: Eiche natur, Travertin, sandfarbener Kalk- und Lehmputz mit spürbarer Struktur, Leinen und Wolle. Cognac- und Salbeiakzente, brüniertes Messing und Anthrazit geben Halt. Überwiegend IKEA STOCKHOLM 2025 / TONSTAD, ergänzt um Westwing-Stücke.',
    moodboard: 'Moodboard Japandi x Soft Brutalism.png',
    palette: [['Off-White', '#ECE7DE'], ['Sand', '#DCCFBD'], ['Greige', '#BDB1A1'], ['Taupe', '#9A8D7D'], ['Cognac', '#9A5E3A'], ['Salbei', '#8A9582'], ['Messing brüniert', '#A8854F'], ['Anthrazit', '#2E2D2B']],
    materials: [
      ['Eiche natur, gebürstetes Furnier', 'Westwing Zumi (TV), IKEA STOCKHOLM 2025 (Sideboard, Esstisch), TONSTAD, Einbaubank, PAX-Fronten'],
      ['Travertin, hell', 'Deckplatte Westwing Zumi, Beistelltisch, Ablagen der Bad-Vorwände'],
      ['Kalk-/Lehmputz Sand mit Struktur', 'Medienwand W11 und Bettwand W20 als Strukturflächen'],
      ['Leinen · Wolle · Cord', 'Sofa SÖDERHAMN, Bett Dream (Cord), Kissen Cognac/Salbei'],
      ['Messing brüniert · Anthrazit', 'Leuchten, Griffe, Armaturen'],
      ['Kalkstein 60 × 120 cm', 'Bäder'],
    ],
    walls: [
      ['Medienwand W11', 'Strukturputz Sand (kräftige Kelle), TV wandbündig, lineare Messingleuchte'],
      ['Lesewand W10', 'Einbau-Sitzbank Eiche mit Leinenpolster (Stauraum), Gips-Relief darüber'],
      ['Schlafen W20', 'Lehmputz Terrakotta-Sand hinter dem Bett, Gips-Relief als Kunst'],
      ['Arbeiten W23', 'Kalkputz Salbei'],
      ['Übrige Wände', 'Kalkputz Off-White/Sand, Sockel im Wandton'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K', 'Essplatz: Westwing Nebo (linear, 3 Glasschirme, 120 cm)', 'Wandlicht: lineare Leuchte Messing an der Medienwand', 'Stimmung: Stehlampe Kaya (Betonfuß beige), Pilz-Tischleuchten, schwarze Zylinderpendel am Bett'],
    theme: {
      id: 'soft',
      walls: { wall: ['#E6DED2', 0.5], wallDeep: ['#DDD2C3', 0.55], wallAccent: ['#CFC1AE', 1.25], wallClay: ['#C9B39D', 1.0], wallSage: ['#B4B8A4', 0.7] },
      tint: { skirting: '#D8CEBF' },
      remap: { smokedOak: 'oakNatural', marble: 'travertineVein', marbleFine: 'travertineVein', bronze: 'brassBrushed', boucle: 'boucleOat' },
    },
    finish: withWalls({}),
    wallOverride: { W11: 'wallAccent', W20: 'wallClay', W23: 'wallSage' },
    decor: { metal: 'Messing brüniert', builtIn: 'Eiche natur', bathFront: 'Eiche natur', bathTop: 'Travertin', vase: 'stonewareSand', hallArt: { kind: 'arch', name: 'Grafik „Bogen“ 60 × 80' }, balcony: { cushion: 'linenBeige', cushionName: 'Sand', pot: 'stonewareRaw' } },
    notes: {
      living: { title: 'Wohnen · Essen · Diele', zoning: 'Medienwand in Strukturputz – Gesprächsinsel um den Travertin-Couchtisch – Essplatz vor W06.', points: [
        'Westwing TV-Lowboard Zumi (180 × 45 × 55, Eiche, Travertinplatte, sechs Fächer) unter wandbündigem TV; Strukturputz Sand und lineare Messingleuchte.',
        'IKEA SÖDERHAMN 3er-Sofa (198 × 99 cm, Sitzhöhe 40) mit Cognac-/Salbeikissen, Westwing Couchtisch Hilda Ø 102 (Eiche massiv).',
        'Einbau-Sitzbank Eiche 225 cm an W10 mit Leinenpolster und drei Schubkästen; IKEA EKENÄSET als Leseplatz in der Fensternische.',
        'IKEA STOCKHOLM 2025 Tisch Ø 115 mit vier STOCKHOLM-2025-Stühlen (Eiche/Leder), Westwing Nebo darüber.',
        'IKEA STOCKHOLM 2025 Sideboard (161 × 42 × 83) an W07, IKEA TONSTAD Regal an W08 als Übergang zur Küche.',
      ] },
      bedroom: { title: 'Schlafen', zoning: 'Bett vor Lehmputzwand W20, PAX an W22, Leseplatz am Fenster.', points: ['Westwing Polsterbett Dream 180 × 200 in Cord hellbeige; IKEA TONSTAD Ablagetische (40 × 40 × 59) als Nachttische.', 'IKEA PAX 3 × 100 × 58 × 236 mit Eichenfronten und Holzknöpfen, Deckenblende.', 'IKEA EKENÄSET + Stehlampe Kaya am Fenster.'] },
      office: { title: 'Arbeiten / Gäste', zoning: 'Bettsofa an W23, Schreibtisch an W24/W26, raumhohe Bibliothekswand an W28.', points: ['IKEA HYLTARP Bettsofa (182 × 93, 140 × 200) in Leinen-Sand mit Cognac-Kissen.', 'IKEA TONSTAD Schreibtisch 140 × 75, Westwing Leder-Bürostuhl Alain (Caramel).', 'Bibliothekswand Eiche 150 × 40 × 252: IKEA BESTÅ mit BJÖRKÖVIKEN-Fronten Birkenfurnier unten, offene Böden oben.'] },
    },
    furnish(ctx) {
      const { M, add, at, grp, F, D, C } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'lowboard', room: 'living', name: 'Westwing TV-Lowboard Zumi', cat: 'Möbel', spec: 'Westwing Collection: Eichenfurnier, abgerundete Ecken, sechs Fächer, Griffe goldfarben, Platte Travertin beige · 180 × 45 × 55 cm, Beinhöhe 25 cm', size: [1.8, 0.45] },
            grp([C.zumiLowboard(M)], [D.vase(M, 'amphora', 'stonewareRaw', 0.7), -0.6, 0.55, 0], [D.bookStack(M, 2, { seed: 5 }), 0.45, 0.55, 0.02, 0.2], [D.bowl(M, 'stonewareCharcoal', 0.13, 0.06), 0.1, 0.55, 0.04]),
            at(L, 1.42, 0.23));
          add({ id: 'tv', room: 'living', name: 'TV 65″ wandbündig', cat: 'Technik', spec: 'Flachwandhalterung, Bildmitte 1,30 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65, bezel: 'matteBlack', art: false }), at(L, 1.42, 0.02, 0, 1.3));
          add({ id: 'sconce-media', room: 'living', name: 'Wandleuchte linear', cat: 'Leuchte', spec: 'Messing brüniert/Opal, H 60 cm', size: [0.05, 0.05], plan: false }, D.linearSconce(M, { h: 0.6 }), at(L, 2.55, 0.05, 0, 1.5));
        },
        sofa: { size: [1.98, 0.99], meta: { name: 'IKEA SÖDERHAMN 3er-Sofa', spec: 'Bezug beige (Leinenoptik), Kissen Cognac/Salbei · 198 × 99 × 83 cm, Sitzhöhe 40 cm, Sitztiefe 48 cm' }, build: () => C.sofa(M, { w: 1.98, d: 0.99, h: 0.83, seatH: 0.4, arm: 0.06, kind: 'slim', fabric: 'linenBeige', legs: 'blackMatte', pillows: ['linenCognac', 'linenSage', 'linenIvory'], throwMat: 'throwCognac' }) },
        coffee: (c, L, front) => {
          add({ id: 'coffee', room: 'living', name: 'Westwing Couchtisch Hilda Ø 102', cat: 'Tisch', spec: 'Westwing Collection, Eiche massiv hell, breite Rundbeine · Ø 102 × 35 cm', size: [1.02, 1.02], round: true },
            grp([C.hildaTable(M)], [D.bookStack(M, 2, { seed: 9, w: 0.3, d: 0.22 }), -0.2, 0.35, 0.05, 0.1], [D.bowl(M, 'stonewareCharcoal', 0.14, 0.06), 0.22, 0.35, -0.08], [D.candle(M, 0.12, 0.03), 0.05, 0.35, 0.25]),
            at(L, 1.42, front - 0.42 - 0.51));
          add({ id: 'side-table', room: 'living', name: 'Beistelltisch Travertin Ø 42', cat: 'Tisch', spec: 'Travertin, Säule Messing brüniert, H 52 cm', size: [0.42, 0.42], round: true },
            grp([F.sideTable(M)], [D.vase(M, 'bud', 'stonewareClay', 1.1), 0.05, 0.52, 0.03]), at(L, 2.72, 3.4));
        },
        rug: { mat: 'rug', spec: 'IKEA STOENSE Kurzflor 240 × 350 cm, beige' },
        bench: { meta: { name: 'Einbau-Sitzbank Eiche mit Leinenpolster', spec: 'Maßanfertigung Eiche natur auf IKEA BESTÅ-Korpussen, 3 Schubkästen, Sitzpolster Leinen Sand, Kissen Cognac/Salbei · 225 × 40 × 44 cm' }, opts: { mat: 'oakNatural', fronts: 'plain', lift: 0.1, cushionMat: 'linenBeige', pillows: ['linenCognac', 'linenSage'] } },
        bowl: 'stonewareCharcoal',
        lounge: { size: [0.64, 0.78], meta: { name: 'IKEA EKENÄSET Sessel', spec: 'Eiche/Kilanda hellbeige · 64 × 78 × 76 cm (Leseplatz)' }, build: () => grp([C.armchair(M, { fabric: 'linenBeige', wood: 'oakNatural' })], [(() => { const k = ctx.T.cushion(M, 'linenCognac', [0.4, 0.3, 0.12]); k.rotation.x = -0.3; return k; })(), 0, 0.62, -0.18]) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß beige, Schirm Baumwolle/Leinen Ø 45 cm, H 156 cm' }, build: () => C.drumFloorLamp(M, { base: 'stonewareRaw', stem: 'brassBrushed' }) },
        pot: 'stonewareRaw', potName: 'Steinzeug roh',
        art: { kind: 'relief', w: 0.9, h: 0.9, seed: 4, frame: 'oakNatural', meta: { name: 'Gips-Relief 90 × 90', spec: 'Kalk/Gips auf Holzplatte, Schattenfugenrahmen Eiche' } },
      });
      dining(ctx, {
        table: { h: 0.75, meta: { name: 'IKEA STOCKHOLM 2025 Tisch Ø 115 + 4 Stühle', spec: 'Eichenfurnier; STOCKHOLM-2025-Stühle Eiche/dunkelbraun Leder (Bugholz)' }, build: () => C.roundTable(M, { dia: 1.15, top: 'oakNatural', topT: 0.03, base: 'legs', baseMat: 'oakNatural' }) },
        chair: () => C.chair(M, { kind: 'bentwood', fabric: 'leatherBrown', frame: 'oakNatural' }), chairR: 0.68,
        pendant: { rot: Math.PI / 2, meta: { name: 'Westwing Pendelleuchte Nebo', spec: 'Glasschirme Ø 9/11/13, Gestell gold · 120 cm, Höhe 87–120 cm' }, build: () => C.linearPendant(M) },
        sideboard: { w: 1.61, d: 0.42, h: 0.83, meta: { name: 'IKEA STOCKHOLM 2025 Sideboard', spec: 'Eichenfurnier gebürstet, Push-to-open · 161 × 42 × 83 cm' }, build: () => C.cabinet(M, { w: 1.61, d: 0.42, h: 0.83, legH: 0.13, fronts: 'plain', doors: 3, mat: 'oakNatural' }) },
        lampMat: 'brassBrushed', vase2: 'stonewareClay', bowl: 'stonewareCharcoal', vase: 'stonewareRaw', pot: 'stonewareRaw', potName: 'Steinzeug roh',
        art: { kind: 'arch', w: 1.0, h: 0.7, frame: 'oakNatural', meta: { name: 'Grafik „Bogen“ 100 × 70', spec: 'Pigmentdruck, Rahmen Eiche' } },
        highboard: shelfItem(ctx, { name: 'IKEA TONSTAD Regal', spec: 'Eichenfurnier · 121 × 37 × 120 cm', w: 1.21, d: 0.37, h: 1.2, shelves: 2, mat: 'oakNatural' }),
      });
      bedroom(ctx, {
        bed: { size: [1.96, 2.22], meta: { name: 'Westwing Polsterbett Dream 180 × 200', spec: 'Cord hellbeige · 196 × 222 cm, Kopfteil H 110 cm; Leinenbettwäsche, Plaid Cognac' }, build: () => C.bedModel(M, { kind: 'dream', frame: 'cordBeige', throwMat: 'throwCognac', pillows: ['linenCognac', 'linenSage'] }) },
        night: { meta: { name: 'IKEA TONSTAD Ablagetisch', spec: 'Eichenfurnier · 40 × 40 × 59 cm' }, size: [0.4, 0.4], top: 0.59, build: () => C.sideBox(M) },
        pendant: { meta: { name: 'Zylinderpendel schwarz', spec: 'Metall mattschwarz, Opal-Abschluss' }, build: () => C.cylinderPendant(M) },
        art: { kind: 'relief', w: 0.9, h: 0.9, y: 1.68, seed: 9, frame: 'oakNatural', meta: { name: 'Gips-Relief 90 × 90', spec: 'Kalk/Gips, Rahmen Eiche' } },
        wardrobe: { meta: { name: 'Einbauschrank IKEA PAX 300 cm', spec: 'IKEA PAX 3 × 100 × 58 × 236 cm, Fronten Eiche, Holzknöpfe, Deckenblende' }, build: () => C.paxWardrobe(M, { fronts: 'flat', frontMat: 'oakNatural', handle: 'knob', handleMat: 'oakNatural', plinth: 'oakNatural' }) },
        chair: { size: [0.64, 0.78], meta: { name: 'IKEA EKENÄSET Sessel', spec: 'Eiche/Kilanda hellbeige · 64 × 78 × 76 cm' }, build: () => C.armchair(M, { fabric: 'linenBeige', wood: 'oakNatural' }) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß beige, Schirm Ø 45 cm' }, build: () => C.drumFloorLamp(M, { base: 'stonewareRaw', stem: 'brassBrushed' }) },
        pot: 'stonewareClay', potName: 'Terrakotta', vase: 'stonewareClay',
        rug: { mat: 'rug', spec: 'IKEA STOENSE Kurzflor 200 × 300 cm, beige' },
      });
      office(ctx, {
        sofabed: { fabricName: 'Bezug Leinen-Sand', opts: { fabric: 'linenBeige', legs: 'oakNatural', pillows: ['linenCognac', 'linenSage'] } },
        art: { kind: 'ink', meta: { name: 'Tuschebild 90 × 70', spec: 'Rahmen Eiche' }, frame: 'oakNatural' },
        desk: { name: 'Eichenfurnier', mat: 'oakNatural', lamp: 'brassBrushed' },
        chairFabric: 'leatherCognac', chairSpec: 'Leder Caramel',
        pot: 'stonewareRaw',
        library: { spec: 'IKEA BESTÅ-Unterschränke (2 × 60 × 40 × 64 + Passteil) mit IKEA BJÖRKÖVIKEN-Fronten Birkenfurnier, Regalaufsatz Eiche nach Maß · 150 × 40 × 252 cm', opts: { mat: 'oakNatural', front: 'beech', fronts: 'plain', doors: 2, pull: 'brassBrushed' }, bowl: 'stonewareCharcoal', vase: 'stonewareRaw' },
        rugMat: 'rug', rugSpec: 'Wolle, Sand',
      });
    },
  },

  // ------------------------------------------------------------------ 3 · Refined Brutalism
  brutal: {
    id: 'brutal',
    label: 'Refined Brutalism',
    short: 'Refined Brutalism',
    claim: 'Architektonisch. Geerdet. Leiser Luxus.',
    lead: 'Die dunkelste, architektonischste Variante: warmgrauer Kalkputz mit kräftiger Struktur, eine Betonspachtel-Medienwand, Räuchereiche in ruhigen Flächen, dunkler Naturstein, Bouclé in Hafer und Moosgrün, brünierter Stahl. Lange, niedrige Horizontalen und indirektes Licht.',
    moodboard: 'Moodboard Refined Brutalism.png',
    palette: [['Soft Off-White', '#E7E3DC'], ['Pale Greige', '#CFC8BD'], ['Warm Concrete', '#A69E92'], ['Mushroom Taupe', '#857A6D'], ['Muted Sage', '#7F8870'], ['Smoked Brown', '#4E4339'], ['Charcoal', '#34322F'], ['Muted Black', '#1C1B1A']],
    materials: [
      ['Räuchereiche, ruhige Flächen', 'Lowboard (Maß auf BESTÅ), Wandpaneel Schlafen, PAX-Fronten, Westwing Chandler'],
      ['Betonspachtel / Kalkputz warmgrau', 'Medienwand W11, alle Wände mit kräftiger Struktur'],
      ['Naturstein dunkel, geschliffen', 'Block-Couchtisch'],
      ['Eiche dunkel', 'Westwing Esstisch Calary Ø 120 mit Stauraum'],
      ['Bouclé Hafer · Moosgrün', 'Westwing Lennon, Mikkel, Lukas'],
      ['Stahl brüniert · Bronze', 'Leuchten, Griffe'],
    ],
    walls: [
      ['Medienwand W11', 'Betonspachtel warmgrau über die volle Breite, zwei lineare Wandleuchten schwarz'],
      ['Lesewand W10', 'Schwebende Einbaubank Räuchereiche mit Natursteinplatte und Bouclé-Polster – lange Horizontale ums Eck'],
      ['Essplatz W07', 'Kalkputz Pilz-Taupe, Gips-Relief'],
      ['Schlafen W20', 'Räuchereichen-Paneel H 120 cm mit LED-Ablage und integrierten Nachttischen'],
      ['Arbeiten W23', 'Kalkputz Moos-Salbei'],
      ['Übrige Wände', 'Kalkputz warmgrau mit starker Kellenstruktur; Sockel dunkel'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K, gedimmt', 'Indirekt: Unterleuchtung Lowboard und Plattformbett, LED-Ablage am Bettpaneel', 'Wandlicht: lineare Wandleuchten schwarz an der Medienwand', 'Essplatz: Saucer schwarz Ø 60; Stehlampe Kaya anthrazit'],
    theme: {
      id: 'brutal',
      walls: { wall: ['#D1C9BD', 1.05], wallDeep: ['#C7BEB1', 1.05], wallConcrete: ['#A49C90', 1.4], wallAccent: ['#B5AB9D', 1.15], wallSage: ['#9EA48F', 0.9] },
      tint: { smokedOak: '#7e7064', floorOak: '#e4d6c6', skirting: '#8f8579' },
      remap: { boucle: 'boucleOat' },
    },
    finish: withWalls({}),
    wallOverride: { W11: 'wallConcrete', W07: 'wallAccent', W23: 'wallSage' },
    decor: { metal: 'Stahl brüniert / Bronze', builtIn: 'Räuchereiche glatt', bathFront: 'Räuchereiche', bathTop: 'Calacatta', vase: 'stonewareRaw', hallArt: { kind: 'monolith', name: 'Grafik „Monolith“ 60 × 80' }, balcony: { cushion: 'linenCharcoal', cushionName: 'Anthrazit', pot: 'concreteDark' } },
    notes: {
      living: { title: 'Wohnen · Essen · Diele', zoning: 'Langes, schwebendes Lowboard über die volle Medienwand – tiefe Lounge – Essplatz mit dunklem Holztisch.', points: [
        'Lowboard 278 cm (Maß auf IKEA BESTÅ) mit Unterleuchtung vor Betonspachtel; The Frame 65″ mit Räuchereiche-Rahmen.',
        'Westwing Lennon 3-Sitzer (238 × 119 cm, Bouclé) mit Moos-Kissen; Block-Couchtisch aus dunklem Naturstein.',
        'Einbaubank Räuchereiche 225 cm an W10 (drei Schubkästen, dunkle Natursteinplatte, Bouclé-Sitzpolster) – setzt das Lowboard als lange Horizontale fort.',
        'Westwing Mikkel (Moosgrün) + Kaya anthrazit in der Fensternische.',
        'Westwing Esstisch Calary Ø 120 (Eiche dunkel, Stauraum im Fuß) mit vier Westwing Lukas; schwarzer Saucer darüber.',
        'Westwing Sideboard Chandler (165 × 43 × 75, massive Eiche dunkel) vor Pilz-Taupe mit Gips-Relief.',
      ] },
      bedroom: { title: 'Schlafen', zoning: 'Plattformbett vor Räuchereichen-Paneel (W20), PAX an W22, Leseplatz am Fenster.', points: ['Plattformbett Räuchereiche (Maß, 210 × 220 cm) mit umlaufender Unterleuchtung; Paneel H 120 cm mit LED-Ablage und schwebenden Nachttischen.', 'IKEA PAX 3 × 100 × 58 × 236 mit glatten Räuchereichen-Fronten und Griffkanten.', 'Samt-Drehsessel Moos + Kaya am Fenster.'] },
      office: { title: 'Arbeiten / Gäste', zoning: 'Bettsofa an W23, Schreibtisch an W24/W26, raumhohe Bibliothekswand an W28.', points: ['IKEA HYLTARP Bettsofa in Taupe.', 'IKEA TONSTAD Schreibtisch braun gebeizt, Westwing Leder-Bürostuhl Alain schwarz.', 'Bibliothekswand Räuchereiche 150 × 40 × 252 mit grifflosen Unterschränken und beleuchteten Böden.'] },
    },
    furnish(ctx) {
      const { M, add, at, grp, F, D, C } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'lowboard', room: 'living', name: 'Lowboard schwebend 278 cm', cat: 'Möbel', spec: 'IKEA BESTÅ-Korpusse wandhängend mit Maßfronten Räuchereiche, grifflos, LED-Unterleuchtung · 278 × 42 × 36 cm', size: [2.78, 0.42] },
            grp([F.lowboard(M, { w: 2.78, h: 0.36, lift: 0.2, mat: 'smokedOak', top: 'smokedOak', fronts: 'plain' })], [D.mushroomLamp(M, { mat: 'steelBlackened' }), 1.0, 0.56, 0.02], [D.vase(M, 'moon', 'stonewareRaw', 1.1), -1.0, 0.56, 0.0], [D.bookStack(M, 3, { seed: 13 }), -0.6, 0.56, 0.02, 0.2]),
            at(L, 1.42, 0.215));
          add({ id: 'tv', room: 'living', name: 'Samsung The Frame 65″ (Kunstmodus)', cat: 'Technik', spec: 'Rahmen Räuchereiche, Bildmitte 1,25 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65, bezel: 'smokedOak' }), at(L, 1.42, 0.02, 0, 1.25));
          for (const [id, u] of [['sconce-media-l', 0.3], ['sconce-media-r', 2.54]]) add({ id, room: 'living', name: 'Wandleuchte linear schwarz', cat: 'Leuchte', spec: 'Stahl brüniert/Opal, H 60 cm', size: [0.05, 0.05], plan: false }, D.linearSconce(M, { h: 0.6, mat: 'steelBlackened' }), at(L, u, 0.05, 0, 1.5));
        },
        sofa: { size: [2.38, 1.19], meta: { name: 'Westwing Sofa Lennon (3-Sitzer)', spec: 'Westwing Collection, modular, Bouclé Off-White · 238 × 119 × 68 cm, Sitzhöhe 43 cm' }, build: () => C.sofa(M, { w: 2.38, d: 1.19, h: 0.68, seatH: 0.43, arm: 0.24, kind: 'block', fabric: 'boucleOat', seats: 2, pillows: ['velvetMoss', 'velvetMoss', 'linenTaupe'], throwMat: 'throwMoss' }) },
        coffee: (c, L, front) => {
          add({ id: 'coffee', room: 'living', name: 'Block-Couchtisch Naturstein', cat: 'Tisch', spec: 'Naturstein dunkel, geschliffen · 110 × 75 × 33 cm (Maßanfertigung)', size: [1.1, 0.75] },
            grp([C.blockTable(M)], [D.bowl(M, 'stonewareCharcoal', 0.18, 0.07), 0.2, 0.33, 0.05], [D.bookStack(M, 2, { seed: 19, w: 0.3, d: 0.22 }), -0.25, 0.33, -0.05, -0.2]),
            at(L, 1.42, front - 0.45 - 0.375));
          add({ id: 'floor-vase', room: 'living', name: 'Bodenvase mit Zweigen', cat: 'Deko', spec: 'Steinzeug roh, H 55 cm', size: [0.34, 0.34], round: true },
            grp([D.vase(M, 'amphora', 'stonewareRaw', 1.3)], [D.branches(M, { h: 0.9, spread: 0.5, seed: 21 }), 0, 0.5, 0]), at(L, 4.75, 3.62));
        },
        rug: { mat: 'rugGrey', size: [2.0, 3.0], spec: 'IKEA STOENSE Kurzflor 200 × 300 cm, grau' },
        bench: { meta: { name: 'Einbaubank schwebend mit Natursteinplatte', spec: 'Maßanfertigung Räuchereiche glatt, grifflos, 3 Schubkästen, Naturstein dunkel geschliffen, Sitzpolster Bouclé Hafer · 225 × 40 × 44 cm' }, opts: { mat: 'smokedOak', top: 'stoneDark', fronts: 'plain', lift: 0.14, cushionMat: 'boucleOat', pillows: ['velvetMoss'] } },
        bowl: 'stonewareCharcoal',
        lounge: { size: [0.66, 0.77], meta: { name: 'Westwing Loungesessel Mikkel', spec: 'Bouclé dunkelgrün, Holz dunkel · 66 × 77 × 79 cm' }, build: () => C.armchair(M, { w: 0.66, d: 0.77, h: 0.79, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakDark', fabric: 'boucleMoss' }) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß anthrazit, Schirm Ø 45 cm, H 156 cm' }, build: () => C.drumFloorLamp(M, { stem: 'steelBlackened' }) },
        pot: 'concreteDark', potName: 'Beton dunkel',
        art: { kind: 'monolith', w: 1.0, h: 1.0, seed: 4, frame: 'smokedOak', meta: { name: 'Kunstwerk „Monolith“ 100 × 100', spec: 'Acryl/Sand auf Leinwand, Rahmen Räuchereiche' } },
      });
      dining(ctx, {
        table: { h: 0.75, meta: { name: 'Westwing Esstisch Calary Ø 120 + 4 Stühle Lukas', spec: 'Eiche dunkel, geriffelter Fuß mit Stauraum; Westwing Bouclé-Polsterstühle Lukas (Hafer, Holzbeine)' }, build: () => C.roundTable(M, { dia: 1.2, top: 'oakDark', topT: 0.035, base: 'ribbed', baseMat: 'oakDark', baseDia: 0.62 }) },
        chair: () => C.chair(M, { kind: 'block', fabric: 'boucleOat', frame: 'oakDark', w: 0.52, d: 0.55, h: 0.8, seatH: 0.47 }),
        pendant: { meta: { name: 'Pendelleuchte Saucer Ø 60 schwarz', spec: 'Metall mattschwarz, Opaldiffusor (Stilreferenz)' }, build: () => D.saucerPendant(M, { dia: 0.6, mat: 'steelBlackened' }) },
        sideboard: { w: 1.65, d: 0.43, h: 0.75, meta: { name: 'Westwing Sideboard Chandler', spec: 'Massive Eiche, dunkel lackiert, Push-to-open, Füße 20 cm · 165 × 43 × 75 cm' }, build: () => C.cabinet(M, { w: 1.65, d: 0.43, h: 0.75, legH: 0.2, fronts: 'panel', doors: 4, mat: 'oakDark' }) },
        lampMat: 'steelBlackened', vase: 'stonewareRaw', vase2: 'stonewareRaw', bowl: 'stonewareCharcoal', pot: 'concreteDark', potName: 'Beton dunkel',
        art: { kind: 'relief', w: 1.0, h: 0.8, seed: 12, frame: 'smokedOak', meta: { name: 'Gips-Relief 100 × 80', spec: 'Kalk/Gips, Rahmen Räuchereiche' } },
        highboard: { w: 0.9, d: 0.35, meta: { name: 'Highboard Rauchglas (Bar/Gläser)', spec: 'Maßanfertigung Räuchereiche, Rauchglastüren, LED-Innenlicht · 90 × 35 × 155 cm' }, build: () => grp([F.glassHighboard(M)], [D.vase(M, 'bud', 'stonewareRaw', 1.2), -0.22, 1.55, 0]) },
      });
      bedroom(ctx, {
        wall: { d: 0.03, meta: { name: 'Wandpaneel Räuchereiche mit LED-Ablage', spec: 'Maßanfertigung, 417 × 120 cm, Fugenbild 35 cm' }, build: () => C.bedPanel(M, { tables: [] }) },
        bed: { size: [2.1, 2.2], meta: { name: 'Plattformbett Räuchereiche 180 × 200', spec: 'Maßanfertigung, Außenmaß 210 × 220 cm, Unterleuchtung; Leinen Sand, Plaid Moos' }, build: () => C.bedModel(M, { kind: 'platform', wood: 'smokedOak', bedding: 'beddingSand', accent: 'bedding', throwMat: 'throwMoss', pillows: ['velvetMoss', 'linenTaupe'] }) },
        nightU: [0.76, 3.41],
        night: { meta: { name: 'Nachttisch schwebend (Paneel)', spec: 'Räuchereiche, im Paneel verankert · 50 × 36 cm' }, size: [0.5, 0.36], top: 0.58, build: () => { const g = new ctx.THREE.Group(); ctx.boxOn(g, M.smokedOak, [0.5, 0.16, 0.36], [0, 0.42, 0]); return g; } },
        pendant: { meta: { name: 'Zylinderpendel', spec: 'Stahl brüniert, Opal-Abschluss' }, build: () => C.cylinderPendant(M, { mat: 'steelBlackened' }) },
        art: { kind: 'sage', w: 1.0, h: 0.7, y: 1.82, seed: 8, frame: 'smokedOak', meta: { name: 'Kunstwerk „Moos“ 100 × 70', spec: 'Acryl, Rahmen Räuchereiche' } },
        wardrobe: { meta: { name: 'Einbauschrank IKEA PAX 300 cm', spec: 'IKEA PAX 3 × 100 × 58 × 236 cm, Fronten Räuchereiche glatt mit Griffkante, Deckenblende' }, build: () => C.paxWardrobe(M, { fronts: 'flat', frontMat: 'smokedOak', handle: 'edge', handleMat: 'steelBlackened' }) },
        chair: { size: [0.78, 0.78], round: true, meta: { name: 'Drehsessel Samt Moos', spec: 'Ø 78 cm (Stilreferenz)' }, build: () => F.tubChair(M, { fabric: 'velvetMoss' }) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß anthrazit, Schirm Ø 45 cm' }, build: () => C.drumFloorLamp(M, { stem: 'steelBlackened' }) },
        pot: 'concreteDark', potName: 'Beton dunkel', vase: 'stonewareRaw',
        rug: { mat: 'rugGrey', spec: 'IKEA STOENSE Kurzflor 200 × 300 cm, grau' },
      });
      office(ctx, {
        sofabed: { fabricName: 'Bezug Taupe', opts: { fabric: 'linenTaupe', legs: 'oakDark', pillows: ['velvetMoss', 'boucleOat'] } },
        art: { kind: 'monolith', seed: 3, frame: 'smokedOak', meta: { name: 'Grafik „Monolith“ 90 × 70', spec: 'Rahmen Räuchereiche' } },
        desk: { name: 'braun gebeiztes Eichenfurnier', mat: 'oakDark', lamp: 'steelBlackened' },
        chairFabric: 'leatherBlack', chairSpec: 'Leder schwarz',
        pot: 'concreteDark',
        library: { spec: 'IKEA BESTÅ-Unterschränke mit Maßfronten Räuchereiche grifflos, Regalaufsatz Räuchereiche mit LED je Boden · 150 × 40 × 252 cm', opts: { mat: 'smokedOak', fronts: 'plain', doors: 2 }, bowl: 'stonewareCharcoal', vase: 'stonewareRaw' },
        rugMat: 'rugGrey', rugSpec: 'Wolle, Grau',
      });
    },
  },

  // ------------------------------------------------------------------ 4 · Cool Quiet Luxury
  quiet: {
    id: 'quiet',
    label: 'Cool Quiet Luxury',
    short: 'Quiet Luxury',
    claim: 'Klare Architektur. Dunkle Akzente.',
    lead: 'Die kühlste, grafischste Variante: weiße Wände und hellgrauer Stein, Eichenparkett natur gegen warm-dunkles Eichenfurnier, mattschwarzes Metall, Salbei sanft bis tief und getöntes Glas. Viel Weißraum, klare Kanten, wenige kraftvolle Setzungen.',
    moodboard: 'Moodboard Cool Quiet Luxury.png',
    palette: [['Wandfarbe Weiß', '#ECE9E4'], ['Steingrau hell', '#CFCBC3'], ['Eiche natur', '#C08A56'], ['Graphit', '#2B2B2A'], ['Salbei sanft', '#9AA58E'], ['Salbei tief', '#3F4A35'], ['Bronze dunkel', '#4A3526'], ['Mattschwarz', '#151515']],
    materials: [
      ['Eiche natur (Parkett) · Eiche Furnier warm dunkel', 'Boden; Lamellenwände, PAX-Fronten, TONSTAD braun gebeizt'],
      ['Metall mattschwarz', 'Leuchten, Griffe, Armaturen, Westwing Calary matt schwarz'],
      ['Bouclé Greige · Salbei tief', 'Westwing Wolke, Adrien (olivgrün), Mikkel'],
      ['Glas getönt (Amber)', 'Pendelleuchten Essplatz'],
      ['Marmor hell', 'Westwing Marisa, Waschtische'],
      ['Stein hellgrau', 'Akzentwand W07'],
    ],
    walls: [
      ['Medienwand W11', 'Lamellen Eiche dunkel, raumhoch, LED-Voute'],
      ['Lesewand W10', 'Einbaubank Eiche dunkel mit Marmorplatte, grifflos – grafische Horizontale ums Eck'],
      ['Essplatz W07', 'Kalkputz Steingrau hell'],
      ['Schlafen W20', 'Lamellen Eiche dunkel hinter dem Bett'],
      ['Arbeiten W23', 'Salbei sanft'],
      ['Übrige Wände', 'Wandfarbe Weiß (feine Kalkstruktur), Sockel weiß'],
    ],
    lightPlan: ['Grundlicht: LED-Einbaustrahler 2700 K', 'Essplatz: zwei Amber-Glaspendel', 'Akzent: LED-Voute an den Lamellenwänden', 'Stimmung: Pilzleuchte Westwing Walter schwarz, Kaya anthrazit, schwarze Zylinderpendel'],
    theme: {
      id: 'quiet',
      walls: { wall: ['#ECE9E4', 0.25], wallDeep: ['#E5E1DA', 0.3], wallStone: ['#D0CCC4', 0.55], wallSage: ['#B5BAAB', 0.5] },
      tint: { skirting: '#E6E2DB', floorOak: '#fbf3e8' },
      remap: { smokedOak: 'oakDark', bronze: 'blackMatte', marbleFine: 'marble' },
    },
    finish: withWalls({}),
    wallOverride: { W07: 'wallStone', W23: 'wallSage' },
    decor: { metal: 'Mattschwarz', builtIn: 'Eiche Furnier warm dunkel', bathFront: 'Eiche dunkel', bathTop: 'Marmor hell', vase: 'stonewareCharcoal', hallArt: { kind: 'botanical', name: 'Grafik „Blätter“ 60 × 80' }, balcony: { cushion: 'linenIvory', cushionName: 'Ecru', pot: 'stonewareCharcoal' } },
    notes: {
      living: { title: 'Wohnen · Essen · Diele', zoning: 'Dunkle Lamellenwand als Rückgrat – helle Lounge – Essplatz mit Amberlicht.', points: [
        'Lamellen Eiche dunkel mit LED-Voute; IKEA BESTÅ wandhängend 240 × 42 × 38 mit BJÖRKÖVIKEN-Fronten braun gebeiztes Eichenfurnier, TV schwarz.',
        'Einbaubank Eiche dunkel 225 cm an W10 mit Marmorplatte und drei Schubkästen (Stauraum für Medien, Decken, Bücher).',
        'Westwing Sofa Wolke (3-Sitzer, 256 × 118 cm) in Bouclé; Couchtisch-Duo Westwing Marisa (Ø 70, Marmor) + Trommel Eiche dunkel.',
        'Westwing Mikkel dunkelgrün am Fenster.',
        'IKEA STOCKHOLM 2025 Tisch Ø 115 (Eiche) mit vier Westwing Adrien in Olivgrün, zwei Amber-Glaspendel.',
        'Westwing Sideboard Calary matt schwarz vor Steingrau, IKEA TONSTAD Bücherregal braun gebeizt an W08.',
      ] },
      bedroom: { title: 'Schlafen', zoning: 'Bett vor dunkler Lamellenwand (W20), PAX an W22, Leseplatz am Fenster.', points: ['IKEA TÄLLÅSEN 180 × 200 (195 × 213 cm, Kopfteil H 107) in Kulsta graugrün; IKEA TONSTAD Ablagetische braun gebeizt.', 'IKEA PAX 3 × 100 × 58 × 236 mit Fronten Eiche dunkel, Griffstangen mattschwarz.', 'Westwing Mikkel (Off-White) + Kaya am Fenster.'] },
      office: { title: 'Arbeiten / Gäste', zoning: 'Bettsofa an W23, Schreibtisch an W24/W26, raumhohe Bibliothekswand an W28.', points: ['IKEA HYLTARP Bettsofa in Beige mit Salbeikissen.', 'IKEA TONSTAD Schreibtisch Eiche, Westwing Leder-Bürostuhl Alain schwarz.', 'Bibliothekswand 150 × 40 × 252: IKEA BESTÅ mit BJÖRKÖVIKEN-Fronten braun gebeizt, offene Böden Eiche dunkel, Griffe mattschwarz.'] },
    },
    furnish(ctx) {
      const { M, add, at, grp, F, D, C } = ctx;
      living(ctx, {
        media: (c, L) => {
          add({ id: 'tv-wall', room: 'living', name: 'Lamellenwand Eiche dunkel mit LED-Voute', cat: 'Wand', spec: 'Maßanfertigung: Lamellen Eichenfurnier warm dunkel auf Akustikfilz, raumhoch, 284 cm', size: [2.84, 0.034], anchor: 'back', plan: true },
            grp([F.slatWall(M, { w: 2.839, mat: 'oakDark' })], [D.ledLine(M, 2.7, { lumensPerM: 500 }), 0, 2.5, 0.08]), at(L, 1.4195, 0));
          add({ id: 'lowboard', room: 'living', name: 'IKEA BESTÅ wandhängend 240 cm', cat: 'Möbel', spec: 'IKEA BESTÅ 2 × 120 × 40 × 38 wandhängend, Fronten IKEA BJÖRKÖVIKEN braun gebeiztes Eichenfurnier, grifflos (Push-to-open), Deckplatte Eiche dunkel · 240 × 42 × 38 cm, Montagehöhe 25 cm', size: [2.4, 0.42] },
            grp([F.lowboard(M, { w: 2.4, h: 0.38, lift: 0.25, mat: 'oakDark', top: 'oakDark', fronts: 'plain' })], [D.mushroomLamp(M, { h: 0.34, r: 0.125, mat: 'blackMatte' }), -0.85, 0.63, 0.02], [D.vase(M, 'moon', 'stonewareCharcoal', 0.8), 0.8, 0.63, 0], [D.bowl(M, 'bronzeDark', 0.12, 0.05), 0.35, 0.63, 0.04]),
            at(L, 1.42, 0.034 + 0.21));
          add({ id: 'tv', room: 'living', name: 'TV 65″', cat: 'Technik', spec: 'Wandmontage bündig, Bildmitte 1,25 m', size: [1.46, 0.03], plan: false }, F.frameTV(M, { inch: 65, bezel: 'matteBlack', art: false }), at(L, 1.42, 0.034 + 0.016, 0, 1.25));
        },
        sofa: { size: [2.56, 1.18], meta: { name: 'Westwing Sofa Wolke (3-Sitzer)', spec: 'Westwing Collection, modular, Bouclé Greige · 256 × 118 × 65 cm, Sitzhöhe 41 cm, Armlehnen 50 cm' }, build: () => C.sofa(M, { w: 2.56, d: 1.18, h: 0.65, seatH: 0.41, armH: 0.5, arm: 0.3, kind: 'cloud', fabric: 'boucle', pillows: ['velvetMoss', 'boucleSage', 'velvetMoss'], throwMat: 'throwSage' }) },
        coffee: (c, L, front) => {
          add({ id: 'coffee', room: 'living', name: 'Westwing Couchtisch Marisa Ø 70', cat: 'Tisch', spec: 'Naturmarmor weiß-grau · Ø 70 × 35 cm', size: [0.7, 0.7], round: true },
            grp([C.drumTable(M, { dia: 0.7, h: 0.35, top: 'marble' })], [D.bookStack(M, 2, { seed: 8, w: 0.3, d: 0.22 }), 0.05, 0.35, 0.05, 0.3], [D.vase(M, 'bottle', 'stonewareCharcoal', 0.8), -0.18, 0.35, -0.08]),
            at(L, 1.2, front - 0.45 - 0.35));
          add({ id: 'coffee-2', room: 'living', name: 'Beistelltisch Trommel Ø 50', cat: 'Tisch', spec: 'Eiche Furnier warm dunkel, H 42 cm (Stilreferenz)', size: [0.5, 0.5], round: true },
            grp([C.drumTable(M, { dia: 0.5, h: 0.42, top: 'oakDark', fluted: true })], [D.bowl(M, 'bronzeDark', 0.13, 0.05), 0, 0.42, 0]), at(L, 1.85, front - 0.4 - 0.25 - 0.18));
        },
        rug: { mat: 'rugIvory', spec: 'IKEA STOENSE Kurzflor 240 × 350 cm, elfenbeinweiß' },
        bench: { meta: { name: 'Einbaubank schwebend, Eiche dunkel', spec: 'Maßanfertigung Eichenfurnier warm dunkel auf IKEA BESTÅ-Korpussen, grifflos, 3 Schubkästen, Marmorplatte hell · 225 × 40 × 44 cm' }, opts: { mat: 'oakDark', top: 'marble', fronts: 'plain', lift: 0.14 } },
        bowl: 'bronzeDark',
        lounge: { size: [0.66, 0.77], meta: { name: 'Westwing Loungesessel Mikkel', spec: 'Bouclé dunkelgrün, Holz dunkel · 66 × 77 × 79 cm' }, build: () => C.armchair(M, { w: 0.66, d: 0.77, h: 0.79, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakDark', fabric: 'boucleMoss' }) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß anthrazit, Schirm Ø 45 cm, H 156 cm' }, build: () => C.drumFloorLamp(M) },
        art: { kind: 'botanical', w: 0.9, h: 1.1, seed: 4, frame: 'oakDark', meta: { name: 'Kunstwerk „Blätter“ 90 × 110', spec: 'Pigmentdruck, Rahmen Eiche dunkel' } },
      });
      dining(ctx, {
        table: { h: 0.75, meta: { name: 'IKEA STOCKHOLM 2025 Tisch Ø 115 + 4 Westwing Adrien', spec: 'Eichenfurnier; Westwing Bouclé-Stühle Adrien olivgrün, Gestell schwarz (56 × 51 × 82)' }, build: () => C.roundTable(M, { dia: 1.15, top: 'oakNatural', topT: 0.03, base: 'legs', baseMat: 'oakNatural' }) },
        chair: () => C.chair(M, { kind: 'shell', fabric: 'boucleMoss', frame: 'blackMatte' }),
        pendant: { meta: { name: 'Glaspendel Amber (2 ×)', spec: 'Glas getönt, Baldachin Messing, Unterkante 1,61 m (Stilreferenz)' }, build: () => grp([C.glassPendant(M), -0.26, 0, 0], [C.glassPendant(M), 0.26, 0, 0]) },
        sideboard: { w: 1.6, d: 0.45, h: 0.75, meta: { name: 'Westwing Sideboard Calary', spec: 'Matt schwarz, geriffelte Schiebetüren, Eichenbeine 17 cm · 160 × 45 × 75 cm' }, build: () => C.cabinet(M, { w: 1.6, d: 0.45, h: 0.75, legH: 0.17, fronts: 'ribbed', doors: 2, mat: 'lacquerBlack', legMat: 'oakDark' }) },
        lampMat: 'blackMatte', vase: 'stonewareCharcoal', vase2: 'stonewareCharcoal', bowl: 'bronzeDark',
        art: { kind: 'landscape', w: 1.2, h: 0.85, frame: 'oakDark', meta: { name: 'Kunstwerk „Nebellandschaft“ 120 × 85', spec: 'Öl/Acryl, Rahmen Eiche dunkel' } },
        highboard: shelfItem(ctx, { name: 'IKEA TONSTAD Bücherregal', spec: 'braun gebeiztes Eichenfurnier · 82 × 37 × 201 cm', w: 0.82, d: 0.37, h: 2.01, shelves: 5, mat: 'oakDark' }),
      });
      bedroom(ctx, {
        wall: { d: 0.034, meta: { name: 'Lamellenwand Eiche dunkel', spec: 'Maßanfertigung, raumhoch, 417 cm' }, build: () => F.slatWall(M, { w: 4.17, mat: 'oakDark' }) },
        bed: { size: [1.95, 2.13], meta: { name: 'IKEA TÄLLÅSEN Bettgestell 180 × 200', spec: 'gepolstert, Kulsta graugrün · 195 × 213 cm, Kopfteil H 107 cm; Leinen Weiß/Sand, Plaid Salbei tief' }, build: () => C.bedModel(M, { kind: 'dream', outerW: 1.95, outerL: 2.13, headH: 1.07, headT: 0.1, frame: 'linenSage', throwMat: 'throwMoss', pillows: ['velvetMoss', 'linenIvory'] }) },
        night: { meta: { name: 'IKEA TONSTAD Ablagetisch', spec: 'braun gebeiztes Eichenfurnier · 40 × 40 × 59 cm' }, size: [0.4, 0.4], top: 0.59, build: () => C.sideBox(M, { mat: 'oakDark', knob: 'oakDark' }) },
        pendant: { meta: { name: 'Zylinderpendel schwarz', spec: 'Metall mattschwarz' }, build: () => C.cylinderPendant(M) },
        art: { kind: 'botanical', w: 0.9, h: 0.7, y: 1.66, seed: 3, frame: 'oakDark', meta: { name: 'Grafik „Blätter“ 90 × 70', spec: 'Rahmen Eiche dunkel' } },
        wardrobe: { meta: { name: 'Einbauschrank IKEA PAX 300 cm', spec: 'IKEA PAX 3 × 100 × 58 × 236 cm, Fronten Eiche dunkel, Griffstangen mattschwarz, Deckenblende' }, build: () => C.paxWardrobe(M, { fronts: 'flat', frontMat: 'oakDark', handle: 'bar', handleMat: 'blackMatte' }) },
        chair: { size: [0.66, 0.77], meta: { name: 'Westwing Loungesessel Mikkel', spec: 'Bouclé Off-White, Holz dunkel · 66 × 77 × 79 cm' }, build: () => C.armchair(M, { w: 0.66, d: 0.77, h: 0.79, seatH: 0.46, armH: 0.58, arms: 'upholstered', wood: 'oakDark', fabric: 'boucle' }) },
        lamp: { meta: { name: 'Westwing Stehlampe Kaya', spec: 'Betonfuß anthrazit, Schirm Ø 45 cm' }, build: () => C.drumFloorLamp(M) },
        pot: 'stonewareCharcoal', potName: 'Keramik schwarz', vase: 'stonewareCharcoal',
        rug: { mat: 'rugIvory', spec: 'IKEA STOENSE Kurzflor 200 × 300 cm, elfenbeinweiß' },
      });
      office(ctx, {
        sofabed: { fabricName: 'Bezug Beige', opts: { fabric: 'linenBeige', legs: 'oakDark', pillows: ['velvetMoss', 'linenIvory'] } },
        art: { kind: 'botanical', seed: 7, frame: 'oakDark', meta: { name: 'Grafik „Blätter“ 90 × 70', spec: 'Rahmen Eiche dunkel' } },
        desk: { name: 'Eichenfurnier', mat: 'oakNatural', lamp: 'blackMatte' },
        chairFabric: 'leatherBlack', chairSpec: 'Leder schwarz',
        library: { spec: 'IKEA BESTÅ-Unterschränke (2 × 60 × 40 × 64 + Passteil) mit IKEA BJÖRKÖVIKEN-Fronten braun gebeiztes Eichenfurnier, Griffe mattschwarz, Regalaufsatz Eiche dunkel mit LED · 150 × 40 × 252 cm', opts: { mat: 'oakDark', fronts: 'plain', doors: 2, pull: 'blackMatte' }, bowl: 'bronzeDark', vase: 'stonewareCharcoal' },
        rugMat: 'rugIvory', rugSpec: 'Wolle, Ecru',
      });
    },
  },
};

export const DEFAULT_STYLE = 'metallic';

/**
 * Luxus-Einrichtungsregeln (Recherche 09/2026: Quiet-Luxury-/Designer-Leitlinien) und wie sie in
 * WE 13 umgesetzt sind – gilt für alle Stilwelten.
 */
export const LUXURY_PRINCIPLES = [
  ['Durchgehende Einbau-Joinery statt Einzelmöbel', 'Lowboard und Einbaubank laufen als eine schwebende Horizontale ums Eck (W11 → W10), Bibliothekswand raumhoch über die volle Wand W28, PAX mit Deckenblende – Stauraum verschwindet in der Architektur.'],
  ['Verdeckter Stauraum, sichtbare Ruhe', 'Grifflose bzw. kannelierte Fronten, Push-to-open, Kabelkanäle im Lowboard; offen bleibt nur kuratierte Deko (Bücher, Keramik, Grün) in Dreiergruppen.'],
  ['Materialehrlichkeit vor Dekor', 'Massivholz/Echtholzfurnier, Naturstein (Calacatta, Travertin, dunkler Naturstein), Kalk-/Lehmputz, Leinen, Wolle, Bouclé; Metalle je Stilwelt nur in einem Ton.'],
  ['Mehrschichtiges Licht 2700 K, CRI > 95', 'Grundlicht entblendet, indirekte LED-Vouten und -Unterleuchtung, Zonenlicht über Tisch/Bett, Stimmungslicht auf Tisch- und Stehleuchten; Badpendel IP44 als Gesichtslicht vor den Spiegelwänden.'],
  ['Großzügige Proportionen', 'Teppich 240 × 350 cm: Sofa und Sessel stehen darauf; Vorhänge an der Decke, bodenlang und breiter als die Öffnung; Kunst mit Bildmitte ≈ 1,45 m bzw. 25 cm über dem Möbel.'],
  ['Spiegel als Architektur', 'Maßgefertigte Spiegel oberhalb der Vorwand-Ablagen (1,18 m) bis zur Decke – im Gäste-WC wandfüllend, im Bad über die volle Breite des Waschtisch-Vorsprungs – verdoppeln die Raumtiefe; Armaturen, Brausen und Heizkörper durchgehend schwarz matt.'],
  ['Wenige, starke Setzungen', 'Je Raum ein Statement (Lamellenwand, Spiegelwand, Bibliothekswand), Rest zurückhaltend; eine Solitärpflanze je Zone statt vieler kleiner.'],
];

/** Room notes shared by all styles (fixed installations). */
export const SHARED_NOTES = {
  kitchen: { title: 'Kochen', zoning: 'Bestandsküche gemäß Referenz: Zeile an W18, Block an W16, Arbeitsgang 1,65 m.', points: ['Nussbaumfronten, gesprenkelte Granitplatte und -rückwand, schwarze Spüle/Armatur bleiben erhalten.', 'Styling mit Eichenbrett, Keramik und Grün; LED-Unterbauleuchte + zwei Einbaustrahler.'] },
  bath: { title: 'Bad', zoning: 'Nach HLS-Plan: Waschtrockner in der ersten Nische direkt neben der Tür, WC Laufen Meda an der Vorwand W35, Waschtisch Laufen VAL 60 × 42 vor der Vorwand W37 (Ablage 1,18 m), Wanne V&B Collaro 180 × 80 an W38, Handtuchheizkörper 60 × 180 an W39.', points: ['Maßspiegel über die volle Breite des Waschtisch-Vorsprungs oberhalb der Ablage bis zur Decke (90 × 138 cm), endet bündig an der Wannenkante; zwei IP44-Pendel davor als blendfreies Gesichtslicht.', 'Alle Armaturen schwarz matt (Duravit Tulum: Waschtischmischer, Wannenthermostat Aufputz mit Handbrause); Drückerplatte und Heizkörper ebenfalls schwarz.', 'Stauraum: Waschtrockner unter Steinablage mit Hängeschrank darüber, Unterschrank mit zwei Schubkästen, Ablagen 1,18 m an Waschtisch und Wanne.'] },
  guestbath: { title: 'Dusche / Gäste-WC', zoning: 'Walk-in-Dusche 105 × 80 cm an der Vorwand W41, Waschtisch Laufen VAL 60 × 42 vor der Vorwand W43 (Ablage 1,18 m über die volle Wandbreite), WC an W46, Handtuchheizkörper 60 × 180 an W44.', points: ['Maßspiegel über die gesamte Wand W43 oberhalb der Ablage bis zur Decke (131 × 138 cm), zwei IP44-Pendel.', 'Duschsystem Aufputz Duravit Tulum mit Kopf- und Handbrause, Linienrinne, Glas mit Profil – alles schwarz matt; beleuchtete Nische.'] },
  utility: { title: 'HWR', zoning: 'Hochschrank in der Nische W50, offenes Regal an W49 östlich der Tür, Technik (Unterverteilung W47, Heizkreisverteiler W48) frei zugänglich; Türschwenk 76 cm frei.', points: ['Geschlossener Stauraum für Staubsauger/Vorräte, Körbe für Kleinteile.'] },
  balcony1: { title: 'Balkon 1', zoning: 'Lounge mit zwei Teak-Sesseln und Pflanzkübeln.', points: [] },
  balcony2: { title: 'Balkon 2', zoning: 'Bistro-Platz am Küchenaustritt.', points: [] },
};

export const roomNotes = (style) => {
  const n = style.notes;
  return { living: n.living, kitchen: SHARED_NOTES.kitchen, bedroom: n.bedroom, office: n.office, bath: SHARED_NOTES.bath, guestbath: SHARED_NOTES.guestbath, utility: SHARED_NOTES.utility, balcony1: SHARED_NOTES.balcony1, balcony2: SHARED_NOTES.balcony2 };
};
