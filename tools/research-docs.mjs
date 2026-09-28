// Regenerate the source-backed product table after updating products.js.
import fs from 'node:fs';
import { PRODUCTS } from '../src/data/products.js';
const rows = Object.values(PRODUCTS).map(p => `| ${p.retailer} | [${p.name}](${p.url}) | ${p.size.map(x => Math.round(x * 1000) / 10).join(' × ')} | ${p.finish} |`);
fs.mkdirSync(new URL('../docs/', import.meta.url), { recursive: true });
fs.writeFileSync(new URL('../docs/PRODUCT_RESEARCH.md', import.meta.url), `# Möbelrecherche WE 13

Recherche am 28.09.2026 anhand der direkt verlinkten Händlerseiten. Der zentrale Katalog src/data/products.js bestimmt Produktnamen, Ausführung, Maße, Mengen und Produktlinks in allen vier Stilwelten. Die 3D-Modelle sind vereinfachte Nachbildungen, keine Hersteller-CAD-Dateien. Die Produktfarben bleiben bei Stilwechseln erhalten; Wandflächen, Kunst, Textilien und Licht setzen die Stilakzente.

| Händler | Produkt / Primärquelle | B × T × H (cm) | Ausführung / Ergänzungen |
|---|---|---|---|
${rows.join('\n')}

## Zusammenstellungen und Platzierung

- Wohnen: Alba-Zweisitzer statt übergroßer Dreisitzer; Mikkel und Marisa bilden mit dem bestehenden großen Teppich die Sitzgruppe. STOCKHOLM 2025 mit vier LISABO-Stühlen steht vor W06; Calary und TONSTAD folgen W07/W08.
- Medienwand: zwei offene BESTÅ-Korpusse, insgesamt 240 cm, Montagehöhe 25 cm. Keine erfundenen Maßfronten.
- Schlafen: TÄLLÅSEN, zwei TONSTAD-Ablagetische, drei PAX-Korpusse und sechs FORSAND-Türen. Die reale Frontdicke geht in die Grundfläche ein.
- Diele: zwei flache PAX-Korpusse mit vier FORSAND-Türen und LACK-Wandregal. Scharniere, Griffe und Inneneinrichtung sind separat zu planen; keine fiktive Sitznische.
- Arbeiten: TONSTAD, Zara, HYLTARP und drei BILLY-Regale (120 cm Gesamtbreite). HYLTARP benötigt ausgeklappt 240 cm Tiefe; die Kollisionsprüfung bildet den geschlossenen Zustand ab.
- Bad: ENHET unter den vorhandenen Laufen-Waschtischen; ENHET-Wandschrank über dem vorhandenen Waschtrockner. VILTO ist 25 cm hoch.
- HWR: zwei ENHET-Hochschränke und IVAR. Die vorhandenen Technikanschlüsse bleiben zugänglich.
- Balkon 1: zwei NÄMMARÖ und nur der Tisch aus dem TÄRNÖ-Set; zusätzlich gelieferte Stühle sind hier nicht eingeplant. Balkon 2: komplettes TÄRNÖ-Set. Die Platzierung berücksichtigt die geknickte Balkonkontur.

Bestandsküche, Sanitärobjekte, Elektrogeräte, bauliche Wandverkleidungen, Spiegel, Kunst und Dekoration sind Bestand bzw. Gestaltungselemente. Sie sind keine neu beschafften Möbel und werden nicht als IKEA-/Westwing-Produkte ausgegeben. Kaufbare Möbelpositionen der Kategorien Möbel, Polster, Bett, Tisch und Outdoor haben ausnahmslos Katalogbelege. Höffner ist zulässig, wurde für diese Auswahl aber nicht benötigt.

Die Detailkarte zeigt Produktlinks und Recherchedatum. CSV und JSON exportieren die Produktbelege. node tools/catalog-check.mjs prüft alle vier Stilwelten auf fehlende Belege, Händler, Maße und Geometriefehler. Produktdaten sind Recherchewerte; Verfügbarkeit, Montage und Anschlüsse vor Bestellung am konkreten Artikel bzw. vor Ort prüfen.
`);
