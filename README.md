# WE 13 · Raumatelier

Maßstäbliche, fotorealistische Einrichtungsplanung der Wohnung **WE 13, Täubchenweg 62–64, Leipzig (3. OG, 97,56 m²)** im Stil **Refined Metallic Japandi** – warme Eiche, kannelierte Räuchereiche, heller Calacatta, gebürstete Bronze und Salbei auf warm-greigem Kalkputz.

Die Anwendung verbindet die aus dem Ausführungsplan rekonstruierte Raumgeometrie mit einer vollständig durchgeplanten, luxuriösen Möblierung und rendert sie in Echtzeit (PBR) oder physikalisch korrekt per GPU-Pathtracing.

## Schnellstart

Ein Build-Schritt ist nicht nötig; die Anwendung besteht aus ES-Modulen und muss über einen lokalen Webserver geöffnet werden (Module/Texturen lassen sich nicht per `file://` laden):

```bash
python3 -m http.server 8000
# oder: npx serve .
```

Danach <http://localhost:8000> öffnen. Empfohlen: aktueller Chrome, Edge, Firefox oder Safari mit **WebGL 2** und aktivierter Hardwarebeschleunigung.

## Ansichten

| Ansicht | Inhalt |
|---|---|
| **3D-Rundgang** | Dollhouse (ohne Decke) und Begehung auf Augenhöhe, 13 Kamerastationen, drei Lichtstimmungen, Pathtracing, Möbel anklicken → Details |
| **Grundriss** | Maßstäblicher Plan (SVG) aus derselben Datenbasis: Wände mit Öffnungen, Wandmaße, nummerierte Möbel-Grundflächen, Raumfokus, Zoom/Pan |
| **Wandmaße** | Alle 52 Wände mit Länge, Öffnungen, Nettoabschnitten (möblierbare Strecken) und Prüfstatus |
| **Konzept & Möbel** | Farbpalette, Materialität, automatische Planungsprüfung, Raumkonzepte, vollständige Möbel- und Ausstattungsliste, Moodboards |

### Bedienung 3D

| Aktion | Dollhouse | Begehung |
|---|---|---|
| Drehen / Umsehen | linke Maustaste ziehen | linke Maustaste ziehen |
| Verschieben | rechte Maustaste / Umschalt + ziehen | `W` `A` `S` `D` (Umschalt = schneller), `Q`/`E` Höhe |
| Zoom | Mausrad | – |
| Möbel-Info | Klick auf Möbel | Klick auf Möbel |

## Rendering

- **Echtzeit (WebGL 2, Three.js r182):** physikalisch basierte Materialien (`MeshPhysicalMaterial` mit Sheen für Textilien, Clearcoat für Lack/Stein), bildbasierte Beleuchtung aus HDR-Umgebungen, weiche Sonnenschatten (4K Shadow Map), Ground-Truth Ambient Occlusion (GTAO), dezentes Bloom, SMAA, Khronos PBR Neutral Tonemapping, lokale Cubemap-Spiegelungen für Spiegel.
- **Fotorealistisch (three-gpu-pathtracer):** progressives GPU-Pathtracing mit globaler Beleuchtung, echter Lichtbrechung in Glas, weichen Flächenlicht-Schatten und Mehrfachreflexion. Button **„Fotorealistisch rendern“** – das Bild verfeinert sich mit jedem Sample (Kamera ruhig halten); Export als PNG.
- **Lichtstimmungen:** *Tageslicht* (bedeckter Stadthimmel + Sonne aus Südost), *Goldene Stunde* (tief stehende Sonne aus West-Südwest, Leuchten gedimmt), *Abend* (alle Leuchten, 2700 K). Leuchtenwerte sind photometrisch (Lumen → Candela/Nits) hinterlegt und einheitlich in den Belichtungsbereich skaliert.
- **Materialien:** CC0-Fotoscans von Poly Haven (Eichen-, Räuchereichen-, Nussbaum-Furnier, Kalkputz, Bouclé, Leinen, Samt, Wolle) sowie prozedural erzeugte Texturen: Landhausdielen 190 × 20 cm mit versetzten Stößen und Mikrofase, Calacatta-Marmor, gesprenkelter Granit (Küchenbestand), Kalkstein-Großformat 60 × 120 cm, Travertin und eigens generierte Kunstwerke.

## Einrichtungskonzept

| Raum | Konzept |
|---|---|
| **Wohnen** | Raumhohe Eichen-Lamellenwand mit LED-Voute an W11, schwebendes kanneliertes Lowboard, Samsung The Frame 65″ im Kunstmodus, Bouclé-Rundsofa 250 cm (Sehabstand ≈ 3,3 m), Marmor-Rundtisch Ø 100, Nussbaum-Lesesessel in der Fensternische, Wollteppich 260 × 230, Solitärpflanze |
| **Essen** | Calacatta-Rundtisch Ø 130 auf kanneliertem Säulenfuß, vier Bouclé-Schalenstühle diagonal, Bronze-Pendel Ø 80, Sideboard 200 cm vor Taupe-Kalkputz-Akzentwand (W07), Rauchglas-Highboard an W08 |
| **Diele** | Deckenhohe Einbaugarderobe mit beleuchteter Sitznische, Wandkonsole mit Rundspiegel Ø 80, Tuschezeichnung, Einbaustrahler |
| **Küche** | Bestandsküche gemäß Referenz (Nussbaum, Granit, schwarze Spüle/Armatur), Zeile an W18, Block an W16, Arbeitsgang 1,65 m; Styling mit Eichenbrett, Keramik, Grün |
| **Schlafen** | Räuchereichen-Lamellenwand, Polsterbett 180 × 200 mit Kanal-Kopfteil, schwebende Nachttische, Opal-Pendel, Einbauschrank 300 cm deckenhoch, Samt-Drehsessel + Stehleuchte am Fenster, Dim-out-Vorhänge |
| **Arbeiten / Gäste** | Salbei-Akzentwand (W23), Schlafsofa 200 cm (140 × 200 Liegefläche), Schreibtisch mit seitlichem Tageslicht, hinterleuchtetes Einbauregal |
| **Bad** | Kalkstein raumhoch, Einbauwanne 180 × 80 mit Glaswand und Regenbrause, Calacatta-Waschtisch mit integriertem Becken, LED-Spiegel, Waschturm hinter Räuchereiche-Fronten, Handtuchheizkörper |
| **Dusche / Gäste-WC** | Walk-in-Dusche 105 × 80 mit Linienrinne und beleuchteter Nische, Aufsatzbecken, Rundspiegel, lineare Wandleuchte |
| **HWR** | Hochschrank, offenes Regal mit Körben, Technik frei zugänglich |
| **Balkone** | Balkon 1: zwei Teak-Sessel, Travertin-Beistelltisch, Kübelpflanzen · Balkon 2: Bistro-Set |

Alle Positionen sind maßstäblich in lokalen Wandkoordinaten (u entlang der gemessenen Wand, v in den Raum) platziert.

### Automatische Planungsprüfung

`src/core/validate.js` prüft bei jedem Start sämtliche Positionen gegen die gemessene Geometrie und zeigt das Ergebnis unter *Konzept & Möbel*:

| Prüfung | Kriterium |
|---|---|
| Raumkontur | jede Grundfläche liegt innerhalb der Innenkontur (Toleranz 1,2 cm für wandbündige Elemente) |
| Kollisionen | keine Überschneidung von Möbeln im selben Raum (SAT-Test, gewollte Paare wie Stuhl unter Tisch ausgenommen) |
| Türen | 90 cm tiefe Bewegungsfläche vor jeder Tür beidseitig frei |
| Fenster / Balkontüren | 45 cm Zugang; Balkontüren vollständig frei, Fenster höchstens zur Hälfte verstellt |

Stand dieser Planung: **alle Prüfungen bestanden**. Produktnamen sind Stil- bzw. Größenreferenzen – Verfügbarkeit, Varianten, Liefer- und Montagemaße vor Bestellung prüfen.

## Maße und Genauigkeit

Die Raumkonturen stammen aus den Vektordaten des beigefügten Ausführungsplans und sind auf drei Maßketten kalibriert (Arbeiten/Gäste-Breite 3,48 m, Innentür 0,885 m, Badtür 0,76 m). Raumhöhe 2,56 m, Türen 2,135 m, bodentiefe Fenster (BRH 0,00). Wandstärken werden aus den Abständen benachbarter Raumkonturen abgeleitet (Außenwände 36 cm).

> **Wichtig:** Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß und keine Fertigungsgrundlage. Vor Möbelkauf, Einbau oder Montage lichte Maße, Türanschläge, Heizkörper, Elektro- und Sanitäranschlüsse vor Ort prüfen.

## Export

- 3D-Ansicht als PNG (auch das Pathtracing-Ergebnis) und in doppelter Auflösung
- Grundriss mit Möblierung und Maßen als SVG · Druckansicht / PDF
- Wandmaße und Nettoabschnitte als CSV
- Möbelliste mit Positionen, Maßen und Spezifikation als CSV
- Geometrie + Einrichtung als JSON

## Architektur

```text
.
├── index.html                    # App-Shell, Import-Map (three → vendor/)
├── styles/app.css                # UI (Japandi-Designsprache, responsiv, Druckansicht)
├── src/
│   ├── main.js                   # Bootstrap, UI-Logik, Export
│   ├── core/geometry.js          # Planmaße → Meter, Wandrahmen, Wandstärken, Polygon-Utilities
│   ├── data/plan.js              # rekonstruierte Planvektoren (Quelle der Maßketten)
│   ├── data/design.js            # Einrichtungskonzept: jede Position mit Maß, Material, Spezifikation
│   ├── engine/
│   │   ├── viewer.js             # Renderer, Post-Processing, Kameras, Lichtstimmungen, Picking
│   │   ├── pathtracer.js         # progressives GPU-Pathtracing
│   │   ├── scene.js              # Szenenaufbau + Positionsregister (für Plan & Liste)
│   │   ├── materials.js          # PBR-Materialbibliothek
│   │   ├── textures.js           # Foto- und prozedurale Texturen (Dielen, Marmor, Granit, Kalkstein, Kunst)
│   │   ├── uv.js                 # metrische UV-Projektion (Maserung folgt der Längsachse)
│   │   ├── models.js             # GLTF-Bibliothek (Pflanzen, Keramik)
│   │   └── builders/             # parametrische Modelle
│   │       ├── architecture.js   # Wände mit Öffnungen, Laibungen, Schnittkanten, Böden, Decken, Fenster, Türen, Balkone
│   │       ├── furniture.js      # Sofa, Tische, Stühle, Bett, Schränke, Regale …
│   │       ├── kitchen.js · bath.js · decor.js · textiles.js
│   └── ui/plan2d.js              # SVG-Grundriss
├── vendor/                       # Three.js r182 + Add-ons + three-gpu-pathtracer (lokal, offline, versionsfest)
├── assets/
│   ├── lib/                      # CC0-Assets (Poly Haven): textures/, hdri/, models/
│   ├── TWL62-64_WE 13_…pdf       # Ausführungsplan
│   └── Moodboard …png · Farben neu.png · kitchen-reference.png
└── tools/
    ├── build-vendor.mjs          # erzeugt vendor/ aus npm-Paketen (esbuild)
    └── fetch-assets.py           # lädt die CC0-Assets von Poly Haven
```

### Abhängigkeiten neu erzeugen

```bash
cd tools && npm install && node build-vendor.mjs   # vendor/
python3 tools/fetch-assets.py                      # assets/lib/
```

## Lizenzen

- Three.js, three-mesh-bvh, three-gpu-pathtracer: MIT (siehe `vendor/LICENSE.*`)
- Texturen, HDRIs und Modelle: [Poly Haven](https://polyhaven.com), CC0
- Schriften: Cormorant Garamond, Jost (Google Fonts, OFL)
