# WE 13 · Raumatelier

Maßstäbliche, fotorealistische Einrichtungsplanung der Wohnung **WE 13, Täubchenweg 62–64, Leipzig (3. OG, 97,56 m²)** in **vier umschaltbaren Stilwelten** – alle aus den Moodboards abgeleitet, alle auf dieselbe gemessene Raumgeometrie geplant und überwiegend mit realen Möbeln von **Westwing** und **IKEA** (Herstellermaße) möbliert.

Die Anwendung verbindet die aus dem Ausführungsplan rekonstruierte Raumgeometrie mit einer vollständig durchgeplanten Möblierung und rendert sie in Echtzeit (PBR mit lokaler Raum-Lightprobe) oder physikalisch korrekt per GPU-Pathtracing.

## Schnellstart

Ein Build-Schritt ist nicht nötig; die Anwendung besteht aus ES-Modulen und muss über einen lokalen Webserver geöffnet werden (Module/Texturen lassen sich nicht per `file://` laden):

```bash
python3 -m http.server 8000
# oder: npx serve .
```

Danach <http://localhost:8000> öffnen. Empfohlen: aktueller Chrome, Edge, Firefox oder Safari mit **WebGL 2** und aktivierter Hardwarebeschleunigung. Direktlink auf eine Stilwelt: `#stil=metallic`, `#stil=soft`, `#stil=brutal`, `#stil=quiet` (die zuletzt gewählte Stilwelt wird gemerkt).

## Stilwelten (Möblierungsvarianten)

Umschalten über **Stilwelt ▾** in der 3D-Werkzeugleiste oder die Reiter unter *Konzept & Möbel*. Beim Wechsel werden Möblierung, Wandgestaltung (Putzfarben, Struktur, Akzentwände, Paneele), Material-Thema (Hölzer, Metalle, Stein, Textilien), Einbaufronten und Leuchten neu aufgebaut; Kamera, Lichtstimmung und Ansicht bleiben erhalten. Grundriss, Möbelliste, Planungsprüfung und Exporte folgen automatisch der aktiven Stilwelt.

| | **Refined Metallic Japandi** (Signatur) | **Japandi × Soft Brutalism** | **Refined Brutalism** | **Cool Quiet Luxury** |
|---|---|---|---|---|
| Idee | Warme Eiche, kannelierte Räuchereiche, Calacatta, Bronze, Salbei | Hell & erdig: Eiche natur, Travertin, Sand-/Lehmputz, Cognac + Salbei | Dunkel & architektonisch: Betonspachtel, Räuchereiche, dunkler Stein, Moos | Weiß & grafisch: Eiche natur vs. Eiche dunkel, Mattschwarz, Amberglas |
| Sofa | Westwing **Alba** 3-Sitzer (Nierenform, 235 × 114) | IKEA **SÖDERHAMN** 3er (198 × 99) | Westwing **Lennon** 3-Sitzer (238 × 119) | Westwing **Wolke** 3-Sitzer (256 × 118) |
| Couchtisch | Calacatta Ø 100 auf Bronzetrommel (Maß) | Westwing **Distinct** Travertin (100 × 55) | Block-Couchtisch Naturstein dunkel (Maß) | Westwing **Marisa** Ø 70 + Trommel Ø 50 |
| Sessel | Westwing **Mikkel** (66 × 77) | 2 × IKEA **EKENÄSET** (64 × 78) | Westwing **Mikkel** Moosgrün | Westwing **Mikkel** dunkelgrün |
| Medienwand | Eichen-Lamellen + LED-Voute, BESTÅ-Lowboard (Maßfronten), The Frame 65″ | Strukturputz Sand, IKEA **STOCKHOLM 2025 TV-Bank** (179 × 42 × 56) | Betonspachtel, Lowboard 278 cm (BESTÅ + Maßfronten), 2 Wandleuchten | Lamellen Eiche dunkel, IKEA **BESTÅ** schwarzbraun (180 × 42 × 38) |
| Essplatz | Westwing **Abby** Ø 120 + 4 × **Adrien** | IKEA **STOCKHOLM 2025** Ø 115 + 4 Stühle, Westwing **Nebo** | Westwing **Calary** Ø 120 (Stauraum) + 4 × **Lukas** | IKEA **STOCKHOLM 2025** Ø 115 + 4 × Westwing **Adrien** olivgrün |
| Sideboard | Westwing **Calary** Dark Oak (160 × 45 × 75) | IKEA **STOCKHOLM 2025** (161 × 42 × 83) | Westwing **Chandler** (165 × 43 × 75) | Westwing **Calary** matt schwarz |
| Bett | Westwing **Dream** 180 (196 × 222), Bouclé Taupe | Westwing **Dream** 180, Cord hellbeige | Plattformbett Räuchereiche (Maß) + Wandpaneel | IKEA **TÄLLÅSEN** 180 (195 × 213), graugrün |
| Nachttisch | schwebend, kanneliert (Maß) | IKEA **TONSTAD** Ablagetisch (40 × 40 × 59) | im Paneel verankert (Maß) | IKEA **TONSTAD** braun gebeizt |
| Kleiderschrank | IKEA **PAX** 3 × 100 × 58 × 236, kannelierte Maßfronten | PAX, Eichenfronten + Holzknöpfe | PAX, Räuchereiche glatt + Griffkante | PAX, Eiche dunkel + Griffstangen schwarz |
| Arbeiten | IKEA **HYLTARP** Bettsofa (182 × 93, 140 × 200) + **TONSTAD** Schreibtisch 140 × 75 | HYLTARP + TONSTAD + TONSTAD Bücherregal | HYLTARP + TONSTAD braun gebeizt + Einbauregal | HYLTARP + TONSTAD + TONSTAD Bücherregal braun |
| Leuchten | Bronze-Saucer, Opal-Pendel, Westwing **Kaya** | Westwing **Nebo**, Messing-Wandleuchte, schwarze Zylinderpendel | Saucer schwarz, lineare Wandleuchten, LED-Ablagen | 2 × Amberglas-Pendel, Pilzleuchte schwarz |
| Teppiche | IKEA **STOENSE** 200 × 300 beige | STOENSE beige | STOENSE grau | STOENSE elfenbeinweiß |

Gemeinsam für alle Stilwelten: Bestandsküche (Nussbaum/Granit), Sanitärobjekte, Einbaugarderobe Diele (PAX 35 cm tief), HWR, Vorhänge (Verdunkelung IKEA **MAJGULL** im Schlafzimmer), Grundlicht. Fronten, Waschtischoberflächen, Armaturen und Metallfarben folgen dem Material-Thema der Stilwelt.

> **Produktangaben:** Artikelnamen und Maße der Westwing- und IKEA-Produkte stammen aus den Herstellerangaben (Recherche 09/2026). Maßanfertigungen und reine Stilreferenzen sind in der Möbelliste gekennzeichnet. Vor Bestellung Verfügbarkeit, Bezug/Farbe, Liefer- und Montagemaße prüfen.

### Geometrie & Zonierung

Alle Stilwelten nutzen dieselbe, aus den Maßketten abgeleitete Zonierung (lokale Wandkoordinaten, u entlang der Wand, v in den Raum):

| Raum | Zonierung |
|---|---|
| **Wohnen** | Medienwand W11 (284 cm) – Lounge (Sofarücken 0,5 m vor dem Wandversatz W09, Sehabstand ≈ 3,2–3,4 m, 40–45 cm Knieraum) – Hauptweg Diele → Essplatz/Küche/Schlafen ≥ 1,0 m – Lesenische W05/W06 |
| **Essen** | Tischmitte vor W06, 1,1 m Durchgang zur Küche, 90-cm-Türzone Schlafen frei; Sideboard an W07, Regal/Highboard an W08 als Übergang zur Küche |
| **Schlafen** | Bett mittig an W20, Schrank 300 cm an W22 mit ≈ 0,9 m Gang (Türen frei schwenkbar), Leseplatz in der Südostecke zwischen Bett und Fenster |
| **Arbeiten / Gäste** | Bettsofa an W23 außerhalb der Türzone, Schreibtisch mit seitlichem Tageslicht an W24/W26, Regal an W28 |

## Ansichten

| Ansicht | Inhalt |
|---|---|
| **3D-Rundgang** | Dollhouse (ohne Decke) und Begehung auf Augenhöhe, 13 Kamerastationen, drei Lichtstimmungen, Stilwelt-Umschalter, Pathtracing, Möbel anklicken → Details |
| **Grundriss** | Maßstäblicher Plan (SVG) aus derselben Datenbasis: Wände mit Öffnungen, Wandmaße, nummerierte Möbel-Grundflächen, Raumfokus, Zoom/Pan |
| **Wandmaße** | Alle 52 Wände mit Länge, Öffnungen, Nettoabschnitten (möblierbare Strecken) und Prüfstatus |
| **Konzept & Möbel** | Stilwelt-Reiter, Farbpalette, Materialität, **Wandgestaltung**, **Lichtplanung**, automatische Planungsprüfung, Raumkonzepte, vollständige Möbel- und Ausstattungsliste mit Bezugsquelle, Moodboards |

### Bedienung 3D

| Aktion | Dollhouse | Begehung |
|---|---|---|
| Drehen / Umsehen | linke Maustaste ziehen | linke Maustaste ziehen |
| Verschieben | rechte Maustaste / Umschalt + ziehen | `W` `A` `S` `D` (Umschalt = schneller), `Q`/`E` Höhe |
| Zoom | Mausrad | – |
| Möbel-Info | Klick auf Möbel | Klick auf Möbel |

## Rendering

- **Echtzeit (WebGL 2, Three.js r182):** physikalisch basierte Materialien (`MeshPhysicalMaterial` mit Sheen für Textilien, Clearcoat für Lack/Stein), weiche Sonnenschatten (4K Shadow Map), Ground-Truth Ambient Occlusion (GTAO), dezentes Bloom, SMAA, Khronos PBR Neutral Tonemapping, lokale Cubemap-Spiegelungen für Spiegel.
- **Lokale Raum-Lightprobe:** In der Begehung wird der Raum um die Kamera (Decken an, Himmel nur durch die Fenster) in eine Cubemap aufgenommen und in zwei Durchgängen (= zwei Lichtbounces) als bildbasiertes Licht verwendet. Indirektes Licht und Spiegelungen zeigen damit den tatsächlichen Raum statt des Außenhimmels; Fensterwände werden heller, Raumtiefen dunkler. Neuaufnahme automatisch bei Raumwechsel oder > 1 m Bewegung.
- **Belichtungsautomatik:** Die Lightprobe wird wie ein Kamerabelichtungsmesser ausgewertet (log. Mittelwert der Leuchtdichte) und auf den Zielwert der Lichtstimmung abgebildet; der Belichtungsregler wirkt als Korrektur.
- **Fotorealistisch (three-gpu-pathtracer):** progressives GPU-Pathtracing mit globaler Beleuchtung, echter Lichtbrechung in Glas, weichen Flächenlicht-Schatten und Mehrfachreflexion; alle Leuchten aktiv. Button **„Fotorealistisch rendern“** – das Bild verfeinert sich mit jedem Sample (Kamera ruhig halten); Export als PNG.
- **Lichtstimmungen:** *Tageslicht* (Stadthimmel + Sonne aus Südost), *Goldene Stunde* (tief stehende Sonne aus West-Südwest, Leuchten gedimmt), *Abend* (alle Leuchten, 2700 K, weißabgeglichen). Leuchtenwerte photometrisch (Lumen → Candela/Nits) hinterlegt.
- **Wände:** Kalkputz-Albedo (neutral, je Stil eingefärbt) + fotografierte Putzstruktur mit stilabhängiger Reliefstärke; Akzentwände als Strukturputz, Betonspachtel, Lehmputz, Holzlamellen oder Holzpaneel mit LED-Ablage.
- **Materialien:** CC0-Fotoscans von Poly Haven (Eiche, Räuchereiche, Nussbaum, Kalkputz, Bouclé, Leinen, Samt, Wolle) sowie prozedurale Texturen: Landhausdielen 190 × 20 cm, Calacatta, dunkler Naturstein, Travertin (klassisch und geädert), Granit, Kalkstein 60 × 120 cm, Kalkputz, Wolle und eigens generierte Kunstwerke.

### Performance

| Maßnahme | Wirkung |
|---|---|
| **Rendern bei Bedarf** | Bilder werden nur gezeichnet, wenn sich etwas ändert (Kamera, Animation, Stimmung, Stil, Auswahl); ein Standbild kostet keine GPU-Last |
| **Zweistufige Qualität** | Während der Bewegung ohne GTAO, nach 160 ms Stillstand ein verfeinertes Bild mit Ambient Occlusion |
| **Statische Schatten** | Die Sonnen-Shadow-Map wird nur nach Szenen-, Stil-, Modus- oder Stimmungswechsel neu berechnet statt in jedem Bild |
| **Licht-Budget** (`lighting.js`) | Feste Anzahl Punkt-/Spot-Slots (keine Shader-Neukompilierung beim Gehen), belegt mit den Leuchten des aktuellen Raums (plus offen verbundener Räume) – verhindert zugleich Lichtdurchschlag durch Wände; bei Tageslicht sind alle Leuchten aus dem Shader entfernt |
| **Adaptive Auflösung** | Pixel-Ratio sinkt stufenweise, wenn Bilder während der Bewegung langsamer als ≈ 28 fps sind, und steigt bei Reserve wieder |
| **Vorberechnete Texturen** | Prozedurale Texturen liegen als WebP (3,6 MB) in `assets/lib/textures/baked/` und werden parallel, außerhalb des Hauptthreads dekodiert (Generator bleibt Fallback) |
| **Asynchrone Shader-Kompilierung** | `compileAsync` vor dem ersten Bild und vor Stimmungswechseln (paralleles Kompilieren, wo unterstützt); einheitliche Umgebungs-Cubemaps (256²) vermeiden zusätzliche Shader-Varianten |
| **Schnelle Kunstwerk-Texturen, Material-Caches** | Körnung als Musterkachel statt Pro-Pixel-Rauschen; Kunstwerk- und Theme-Materialien werden gecacht und zwischen Stilwelten geteilt |
| **Pathtracer** | 5 Bounces / 6 Transmissionsbounces, Glossy-Filter 0,5, BVH-Neuaufbau nur bei Szenenwechsel |

Gemessen im Headless-Chromium (Software-GPU): Start bis zum ersten Bild von ≈ 41 s auf ≈ 15 s ohne bzw. deutlich darunter mit vorberechneten Texturen; auf Hardware-GPUs entsprechend schneller. Mit der Qualitätsstufe *Mittel*/*Schnell* lassen sich schwächere Geräte zusätzlich entlasten.

## Automatische Planungsprüfung

`src/core/validate.js` prüft bei jedem Start und nach jedem Stilwechsel sämtliche Positionen der aktiven Stilwelt gegen die gemessene Geometrie und zeigt das Ergebnis unter *Konzept & Möbel*:

| Prüfung | Kriterium |
|---|---|
| Raumkontur | jede Grundfläche liegt innerhalb der Innenkontur (Toleranz 1,2 cm für wandbündige Elemente) |
| Kollisionen | keine Überschneidung von Möbeln im selben Raum (SAT-Test, gewollte Paare wie Stuhl unter Tisch ausgenommen) |
| Türen | 90 cm tiefe Bewegungsfläche vor jeder Tür beidseitig frei |
| Fenster / Balkontüren | 45 cm Zugang; Balkontüren vollständig frei, Fenster höchstens zur Hälfte verstellt |

Stand dieser Planung: **alle vier Stilwelten bestehen sämtliche Prüfungen** (je ≈ 420 Einzelprüfungen).

## Maße und Genauigkeit

Die Raumkonturen stammen aus den Vektordaten des beigefügten Ausführungsplans und sind auf drei Maßketten kalibriert (Arbeiten/Gäste-Breite 3,48 m, Innentür 0,885 m, Badtür 0,76 m). Raumhöhe 2,56 m, Türen 2,135 m, bodentiefe Fenster (BRH 0,00). Wandstärken werden aus den Abständen benachbarter Raumkonturen abgeleitet (Außenwände 36 cm).

> **Wichtig:** Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß und keine Fertigungsgrundlage. Vor Möbelkauf, Einbau oder Montage lichte Maße, Türanschläge, Heizkörper, Elektro- und Sanitäranschlüsse vor Ort prüfen.

## Export

- 3D-Ansicht als PNG (auch das Pathtracing-Ergebnis) und in doppelter Auflösung – Dateiname enthält die Stilwelt
- Grundriss mit Möblierung und Maßen als SVG · Druckansicht / PDF
- Wandmaße und Nettoabschnitte als CSV
- Möbelliste der aktiven Stilwelt mit Positionen, Maßen und Spezifikation als CSV
- Geometrie + Einrichtung als JSON

## Architektur

```text
.
├── index.html                    # App-Shell, Import-Map (three → vendor/)
├── styles/app.css                # UI (Japandi-Designsprache, responsiv, Druckansicht, Stilwahl)
├── src/
│   ├── main.js                   # Bootstrap, UI-Logik, Stilwechsel, Export
│   ├── core/geometry.js          # Planmaße → Meter, Wandrahmen, Wandstärken, Polygon-Utilities
│   ├── core/validate.js          # Planungsprüfung (Kontur, Kollision, Türen, Fenster)
│   ├── data/plan.js              # rekonstruierte Planvektoren (Quelle der Maßketten)
│   ├── data/styles.js            # vier Stilwelten: Thema, Wandgestaltung, Lichtplan, Möblierung, Texte
│   ├── data/design.js            # gemeinsamer Bestand (Küche, Bäder, HWR, Diele, Vorhänge, Grundlicht) + Stil-Möblierung
│   ├── engine/
│   │   ├── viewer.js             # Renderer, On-Demand-Loop, Post-Processing, Lightprobe, Belichtung, Kameras, Stimmungen
│   │   ├── lighting.js           # Licht-Budget je Raum (feste Slots)
│   │   ├── pathtracer.js         # progressives GPU-Pathtracing
│   │   ├── scene.js              # Szenenaufbau je Stilwelt + Positionsregister (für Plan & Liste)
│   │   ├── materials.js          # PBR-Materialbibliothek, Stil-Themen, prozedurale Textur-Tabelle
│   │   ├── textures.js           # Foto-, vorberechnete und prozedurale Texturen, Kunstwerke
│   │   ├── uv.js                 # metrische UV-Projektion (Maserung folgt der Längsachse)
│   │   ├── models.js             # GLTF-Bibliothek (Pflanzen, Keramik)
│   │   └── builders/             # parametrische Modelle
│   │       ├── architecture.js   # Wände mit Öffnungen, Laibungen, Böden, Decken, Fenster, Türen, Balkone
│   │       ├── catalog.js        # Westwing-/IKEA-Modelle (Sofas, Sessel, Stühle, Tische, Schränke, PAX, Betten, Leuchten)
│   │       ├── furniture.js      # Maßmöbel (Lamellenwand, Lowboard, Rundsofa, Einbauten …)
│   │       ├── kitchen.js · bath.js · decor.js · textiles.js
│   └── ui/plan2d.js              # SVG-Grundriss
├── vendor/                       # Three.js r182 + Add-ons + three-gpu-pathtracer (lokal, offline, versionsfest)
├── assets/
│   ├── lib/                      # CC0-Assets (Poly Haven): textures/ (inkl. baked/), hdri/, models/
│   ├── TWL62-64_WE 13_…pdf       # Ausführungsplan
│   └── Moodboard …png · Farben neu.png · kitchen-reference.png
└── tools/
    ├── build-vendor.mjs          # erzeugt vendor/ aus npm-Paketen (esbuild)
    ├── bake-textures.mjs · bake.html  # backt die prozeduralen Texturen nach assets/lib/textures/baked/
    └── fetch-assets.py           # lädt die CC0-Assets von Poly Haven
```

### Abhängigkeiten neu erzeugen

```bash
cd tools && npm install && node build-vendor.mjs   # vendor/
python3 tools/fetch-assets.py                      # assets/lib/
cd tools && npx playwright install chromium && node bake-textures.mjs   # assets/lib/textures/baked/
```

Nach Änderungen an einem Textur-Generator oder seinen Parametern (`PROCEDURAL` in `src/engine/materials.js`) die Texturen neu backen – sonst lädt die App die alten Dateien. Wird `baked/` gelöscht, erzeugt die App die Texturen wieder zur Laufzeit.

### Neue Stilwelt anlegen

Ein Eintrag in `STYLES` (`src/data/styles.js`) genügt: `theme` (Wandfarben/Reliefstärke, Umschlüsselung von Material-Slots wie `bronze → blackMatte`, Tönungen), `wallOverride` (Akzentwände), `decor` (Ausführung der gemeinsamen Einbauten), Texte (`palette`, `materials`, `walls`, `lightPlan`, `notes`) und `furnish(ctx)` mit den Raum-Helfern `living`, `dining`, `bedroom`, `office`. Die Planungsprüfung zeigt sofort, ob alles passt.

## Lizenzen

- Three.js, three-mesh-bvh, three-gpu-pathtracer: MIT (siehe `vendor/LICENSE.*`)
- Texturen, HDRIs und Modelle: [Poly Haven](https://polyhaven.com), CC0
- Schriften: Cormorant Garamond, Jost (Google Fonts, OFL)
- Westwing, IKEA und genannte Produktnamen sind Marken der jeweiligen Inhaber; die Modelle sind vereinfachte Nachbildungen zu Planungszwecken.
