// Rebuilds docs/PRODUCT_RESEARCH.md from the authoritative catalogue (src/data/products.js):
//   node tools/research-docs.mjs
import fs from 'node:fs';
import { PRODUCTS, STYLE_PRODUCTS, slotProducts, dims } from '../src/data/products.js';

const STYLES = { metallic: 'Refined Metallic Japandi', soft: 'Japandi × Soft Brutalism', brutal: 'Refined Brutalism', quiet: 'Cool Quiet Luxury' };
const SLOTS = [
  ['Sofa', 'sofa'], ['Sessel Wohnen', 'lounge'], ['Couchtisch', 'coffee'], ['Beistelltisch', 'side-table'], ['TV-Lowboard', 'lowboard'],
  ['Esstisch', 'dining'], ['Esszimmerstühle', 'chair'], ['Pendel Essplatz', 'pendant-dining'], ['Sideboard', 'sideboard'], ['Vitrine', 'highboard'],
  ['Stehleuchte', 'floorlamp-living'], ['Teppich Wohnen', 'rug-living'], ['Bett', 'bed'], ['Nachttische (2 ×)', 'nightstand-n'], ['Pendel Bett (2 ×)', 'nightstand-n-pendant'],
  ['Kleiderschrank', 'wardrobe'], ['Lesesessel', 'reading-chair'], ['Teppich Schlafen', 'rug-bed'], ['Schlafsofa', 'sofabed'], ['Schreibtisch', 'desk'],
  ['Bürostuhl', 'task-chair'], ['Regal', 'shelving'], ['Teppich Arbeiten', 'rug-office'], ['Garderobe', 'hall-wardrobe'], ['Konsole Diele', 'console'],
];
const cell = (style, slot) => {
  const list = slotProducts(style, slot);
  return list.length ? list.map((p) => `${p.quantity > 1 ? p.quantity + ' × ' : ''}[${p.retailer} ${p.name}](${p.url}) – ${p.finish}`).join('<br>') : '–';
};
const matrix = SLOTS.map(([label, slot]) => `| ${label} | ${Object.keys(STYLES).map((s) => cell(s, slot)).join(' | ')} |`);
const used = new Set(Object.keys(STYLES).flatMap((s) => SLOTS.flatMap(([, slot]) => slotProducts(s, slot).map((p) => p.key))));
const shared = ['utility', 'ivar', 'outdoor', 'bistro', 'stool', 'vanity', 'laundry', 'rudsta', 'paxFlat'];
const rows = Object.entries(PRODUCTS).filter(([k]) => used.has(k) || shared.includes(k))
  .map(([, p]) => `| ${p.retailer} | [${p.name}](${p.url}) | ${dims(p)} | ${p.finish} |`);

fs.writeFileSync(new URL('../docs/PRODUCT_RESEARCH.md', import.meta.url), `# Möbelrecherche WE 13

Recherche: **28.09.2026**. Jede Position wurde direkt auf der Händler-Produktseite geprüft (westwing.de, ikea.com/de): Artikelname, Ausführung/Farbe der verlinkten Variante, Herstellermaße und Lieferstatus „auf Lager“. Bei Betten und Teppichen gilt die angegebene Größenvariante (Außenmaße laut Variantendatenblatt). Die 3D-Modelle sind parametrische Nachbildungen aus genau diesen Maßen und Oberflächen, keine Hersteller-CAD-Dateien.

## Auswahlprinzip

Die Vorversion setzte vielfach Budget-Serienmöbel ein (offene BESTÅ-Korpusse, BILLY, LISABO, GLADOM-Tablett-Tisch, ÅRSTID, MICKE, HYLTARP) und einen hellblauen Wolke-Bezug, der in keinem Moodboard vorkommt. Diese Positionen wurden gegen die Moodboards und aktuelle Luxus-Einrichtungsregeln geprüft und ersetzt:

| Regel | Umsetzung |
|---|---|
| Wenige, hochwertige Hauptstücke | Massivholz/Echtholzfurnier, Naturstein (Marmor, Travertin), Bouclé und Leinen-Mix; keine offenen Budget-Korpusse |
| Ein Stein, ein Metall, ein Holzton je Stilwelt | Metallic: heller Marmor + Messing + dunkle Eiche · Soft: Travertin + Messing + helle Eiche · Brutal: schwarzer Marmor + Stahl/Schwarz + dunkle Eiche · Quiet: Mattschwarz + dunkles Holz + Salbei/Oliv |
| Formensprache des Moodboards | geschwungenes Bouclé-Sofa und flacher Messing-Pendel (Metallic), Holzrahmensessel + linearer Pendel + Travertin-Esstisch (Soft), modulares Bouclé-Sofa + Plattform-Holzbett + schwarzer Steintisch (Brutal), Trommeltische + olivgrüne Polsterstühle + Amberglas (Quiet) |
| Proportionen | Teppich 300 × 400 unter der ganzen Sitzgruppe, 200 × 300 unter dem Bett; Sofa 235–238 cm vor 284 cm Medienwand; Lowboard 180–220 cm |
| Geschlossener, deckenhoher Stauraum | IKEA PAX mit TONSTAD-Türen in Eichenfurnier (natur bzw. braun gebeizt) statt weißer Standardtüren |

Die Glasvitrine rechts neben der Küche bleibt auf Wunsch in allen Stilwelten: **IKEA RUDSTA Anthrazit, 80 × 37 × 120 cm**, Glasfront, Glasseiten, Glasböden. Höffner ist als Händler zulässig; für die gewählten Ausführungen boten Westwing und IKEA die passenderen, belegten Varianten.

## Auswahl je Stilwelt

| Position | ${Object.values(STYLES).join(' | ')} |
|---|---|---|---|---|
${matrix.join('\n')}

## Produktbelege

| Händler | Artikel / Primärquelle | Herstellermaße (B × T × H) | Ausführung |
|---|---|---|---|
${rows.join('\n')}

## Planung und Grenzen

- Platzierung aus Herstellermaßen: Sofarücken 0,5 m vor dem Wandversatz W09, Couchtisch mit 45 cm Knieraum, Lowboard mittig unter dem TV, Nachttische 5 cm neben dem Bettrahmen, Esszimmerstühle 12 cm unter die Tischkante geschoben, Pendel mit Unterkante ≈ 86 cm über der Tischplatte.
- \`node tools/catalog-check.mjs\` prüft je Stilwelt: Händlerbeleg und Host für jede Möbel-, Leuchten- und Teppichposition, Modell innerhalb der Stellfläche, Raumkontur, Kollisionen, 90-cm-Türbereiche, Fensterzugang, Glasvitrine sowie das ausgeklappte Schlafsofa (Liegefläche 210 cm, Bürostuhl beiseite).
- Küche, Sanitärobjekte, Geräte, Maßspiegel, Vorhänge, Wandfelder und Kunst sind Bestand bzw. Gestaltung und nicht Teil der Händlerliste. Scharniere (PAX/TONSTAD), Inneneinrichtungen, Matratzen und Lattenroste sind vor Bestellung zu ergänzen.
- Händlerverfügbarkeit und Preise sind eine Momentaufnahme vom Recherchetag.
`);
console.log('docs/PRODUCT_RESEARCH.md aktualisiert:', rows.length, 'Artikel');
