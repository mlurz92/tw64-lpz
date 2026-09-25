# WE 13 · Raumatelier

Maßstäbliche, fotorealistische Einrichtungsplanung der Wohnung **WE 13, Täubchenweg 62–64, Leipzig (3. OG, 97,56 m², Blick in den Park)** in **vier umschaltbaren Stilwelten** – alle aus den Moodboards abgeleitet, alle auf dieselbe gemessene Raumgeometrie geplant und überwiegend mit aktuellen Möbeln von **Westwing** und **IKEA** (Herstellermaße, Recherche 09/2026) möbliert.

Die Anwendung verbindet die aus dem Ausführungsplan rekonstruierte Raumgeometrie mit einer vollständig durchgeplanten Möblierung und rendert sie mit der **WebGPU-Engine von three.js (r186)** – wahlweise als schnelle Echtzeitansicht oder im Modus **„Realistisch“** mit globaler Beleuchtung, Spiegelungen und temporalem Anti-Aliasing in Echtzeit.

## Schnellstart

Ein Build-Schritt ist nicht nötig; die Anwendung besteht aus ES-Modulen und muss über einen lokalen Webserver geöffnet werden (Module/Texturen lassen sich nicht per `file://` laden):

```bash
python3 -m http.server 8000
# oder: npx serve .
```

Danach <http://localhost:8000> öffnen. Empfohlen: aktueller Chrome/Edge (WebGPU), Safari 26+ oder Firefox 141+ mit aktivierter Hardwarebeschleunigung. Ohne WebGPU schaltet die Engine automatisch auf ihr **WebGL-2-Backend** (gleiches Bild, etwas langsamer); das aktive Backend steht unten rechts im 3D-Viewer. Direktlink auf eine Stilwelt: `#stil=metallic`, `#stil=soft`, `#stil=brutal`, `#stil=quiet` (die zuletzt gewählte Stilwelt wird gemerkt).

## Stilwelten (Möblierungsvarianten)

Umschalten **direkt im 3D-Viewer** über die Stilwelt-Leiste oben (oder die Tasten **1–4**) bzw. über die Reiter unter *Konzept & Möbel*. Beim Wechsel werden Möblierung, Wandgestaltung, Material-Thema, Einbaufronten und Leuchten neu aufgebaut; Kamera, Lichtstimmung, Darstellung (Standard/Realistisch) und Ansicht bleiben erhalten. Grundriss, Möbelliste, Planungsprüfung und Exporte folgen automatisch.

| | **Refined Metallic Japandi** (Signatur) | **Japandi × Soft Brutalism** | **Refined Brutalism** | **Cool Quiet Luxury** |
|---|---|---|---|---|
| Idee | Räuchereiche kanneliert, Calacatta, Bronze, Salbei | Hell & erdig: Eiche natur, Travertin, Sand-/Lehmputz, Cognac + Salbei | Dunkel & architektonisch: Betonspachtel, Räuchereiche, dunkler Stein, Moos | Weiß & grafisch: Eiche natur vs. Eiche dunkel, Mattschwarz, Amberglas |
| Medienwand W11 | **Räuchereichen-Lamellen (dunkel)** + LED-Voute, Lowboard 260 cm (BESTÅ + Maßfronten), The Frame 65″ | Strukturputz Sand, Westwing **Zumi** (180 × 45 × 55, Eiche/Travertin) | Betonspachtel, Lowboard 278 cm (BESTÅ + Maßfronten), 2 Wandleuchten | Lamellen Eiche dunkel, IKEA **BESTÅ** 240 cm mit **BJÖRKÖVIKEN**-Fronten braun gebeizt |
| Sofa | Westwing **Alba** 3-Sitzer (235 × 114) | IKEA **SÖDERHAMN** 3er (198 × 99) | Westwing **Lennon** 3-Sitzer (238 × 119) | Westwing **Wolke** 3-Sitzer (256 × 118) |
| Couchtisch | Calacatta Ø 100 auf Bronzetrommel (Maß) | Westwing **Hilda** Ø 102 (Eiche massiv) | Block-Couchtisch Naturstein dunkel (Maß) | Westwing **Marisa** Ø 70 + Trommel Ø 50 |
| Sessel | Westwing **Mikkel** | IKEA **EKENÄSET** (Leseplatz) | Westwing **Mikkel** Moosgrün | Westwing **Mikkel** dunkelgrün |
| Essplatz | Westwing **Sahra** Ø 116 + 4 × **Adrien** | IKEA **STOCKHOLM 2025** Ø 115 + 4 Stühle, Westwing **Nebo** | Westwing **Calary** Ø 120 + 4 × **Lukas** | IKEA **STOCKHOLM 2025** Ø 115 + 4 × Westwing **Adrien** |
| Sideboard | Westwing **Calary** (160 × 45 × 75) | IKEA **STOCKHOLM 2025** (161 × 42 × 83) | Westwing **Chandler** (165 × 43 × 75) | Westwing **Calary** matt schwarz |
| Bett | Westwing **Dream** 180 vor Räuchereichen-Lamellen | Westwing **Dream** 180, Cord | Plattformbett Räuchereiche (Maß) + Wandpaneel | IKEA **TÄLLÅSEN** 180 |
| Kleiderschrank | IKEA **PAX** 3 × 100 × 58 × 236, kannelierte Maßfronten | PAX, Eichenfronten + Holzknöpfe | PAX, Räuchereiche glatt + Griffkante | PAX, Eiche dunkel + Griffstangen schwarz |
| Arbeiten | IKEA **HYLTARP** + **TONSTAD** 140 × 75, Westwing **Alain** (Leder Caramel), **Bibliothekswand** 150 × 40 × 252 | dto., Bibliothekswand Eiche mit **BJÖRKÖVIKEN** Birke | dto., Alain schwarz, Bibliothekswand Räuchereiche | dto., Alain schwarz, Bibliothekswand mit **BJÖRKÖVIKEN** braun gebeizt |
| Teppich Wohnen | IKEA **STOENSE** 240 × 350 beige | STOENSE 240 × 350 beige | STOENSE 200 × 300 grau | STOENSE 240 × 350 elfenbeinweiß |

Gemeinsam für alle Stilwelten: Bestandsküche (Nussbaum/Granit), **Bäder nach HLS-Plan** (siehe unten), Einbaugarderobe Diele (PAX 35 cm tief), HWR, Vorhänge (Verdunkelung IKEA **MAJGULL** im Schlafzimmer), Grundlicht.

> **Produktangaben:** Artikelnamen und Maße stammen aus den Herstellerangaben (Recherche 09/2026, u. a. Westwing-Neuheiten Zumi, Hilda, Alain; IKEA BJÖRKÖVIKEN, STOENSE 240 × 350). Westwing **Abby** ist derzeit nicht lieferbar und wurde durch **Sahra** Ø 116 ersetzt. Maßanfertigungen und reine Stilreferenzen sind in der Möbelliste gekennzeichnet. Vor Bestellung Verfügbarkeit, Bezug/Farbe, Liefer- und Montagemaße prüfen.

### Bäder (nach Ausführungsplan HLS)

| | **Bad** | **Dusche / Gäste-WC** |
|---|---|---|
| Vorwand | Waschtisch-Vorwand W37 mit **Ablage 1,18 m** (90 × 25 cm), Wannen-Vorwand W38 mit Ablage 1,18 m | Vorwand über die volle Wand W43 mit **Ablage 1,18 m** (131 × 15 cm) |
| Spiegel | **Maßspiegel über die volle Breite des Waschtisch-Vorsprungs oberhalb der Ablage bis zur Decke (90 × 138 cm)** – endet bündig an der Wannenkante, über der Wanne bleibt die Wand gefliest | **Maßspiegel über die gesamte Wand W43 oberhalb der Ablage bis zur Decke (131 × 138 cm)** |
| Waschtisch | Laufen **VAL** 60 × 42 + schwebender Unterschrank (2 Schubkästen) | Laufen **VAL** 60 × 42 + Unterschrank |
| WC | Laufen **Meda**, Vorwand W35 | Laufen **Meda**, W46 |
| Wäsche | **Waschtrockner** (Frontlader 60 × 60 × 85) in der ersten Nische direkt neben der Tür, Steinablage über die volle Nischenbreite, Hängeschrank 76 × 35 × 72 darüber | – |
| Wanne / Dusche | Villeroy & Boch **Collaro** 180 × 80, eingefliest | Walk-in 105 × 80, Linienrinne, Glas L-förmig |
| Armaturen | **alle schwarz matt**: Duravit **Tulum** Waschtischmischer, Wannenthermostat Aufputz mit Handbrause | **alle schwarz matt**: Duravit **Tulum** Duschsystem Aufputz (Kopf- und Handbrause), Waschtischmischer |
| Licht | 2 IP44-Pendel vor der Spiegelwand + Einbaustrahler, 3000 K | 2 IP44-Pendel + Einbaustrahler, 3000 K |
| Heizkörper | Handtuchheizkörper 60 × 180 schwarz (W39) | Handtuchheizkörper 60 × 180 schwarz (W44) |

Die Spiegel werden als **echte planare Spiegelungen** gerendert (Reflector-Knoten), sobald man im Raum steht. Fensterlose Räume (Bäder, HWR) bleiben auch bei „Tageslicht“ beleuchtet.

### Luxus-Prinzipien (angewendet in allen Stilwelten)

| Prinzip | Umsetzung in WE 13 |
|---|---|
| Durchgehende Einbau-Joinery statt Einzelmöbel | schwebendes Lowboard über die Medienwand, raumhohe Bibliothekswand W28, PAX mit Deckenblende |
| Verdeckter Stauraum, sichtbare Ruhe | grifflose/kannelierte Fronten, Push-to-open, verdeckte Kabelführung; offen nur kuratierte Deko |
| Materialehrlichkeit | Echtholz/-furnier, Naturstein, Kalk-/Lehmputz, Leinen, Wolle, Bouclé; je Stilwelt nur ein Metallton |
| Mehrschichtiges Licht 2700 K, CRI > 95 | Grundlicht entblendet, indirekte LED-Vouten/-Unterleuchtung, Zonen- und Stimmungslicht; Bad 3000 K |
| Großzügige Proportionen | Teppich 240 × 350 (Sofa und Sessel stehen darauf), deckenhohe, bodenlange Vorhänge, Kunst mit Bildmitte ≈ 1,45 m |
| Spiegel als Architektur | Maßspiegel oberhalb der Ablagen bis zur Decke: im Gäste-WC wandfüllend, im Bad über die Breite des Waschtisch-Vorsprungs (nicht über der Wanne) |
| Wenige, starke Setzungen | je Raum ein Statement (Lamellen-, Spiegel-, Bibliothekswand) |

### Stauraum

| Raum | Stauraum |
|---|---|
| Diele | Einbaugarderobe PAX 200 × 40 × 256 mit Sitznische |
| Wohnen | Lowboard 1,8–2,78 m (je Stil), Sideboard, Highboard/Regal an W08 |
| Schlafen | PAX 300 × 58 × 236 + Deckenblende, Nachttische |
| Arbeiten | Bibliothekswand 150 × 40 × 252 (geschlossene Unterschränke + 4 beleuchtete Böden) |
| Bad / WC | Unterschränke mit Schubkästen, Ablagen 1,18 m, Hängeschrank über dem Waschtrockner in der Türnische |
| HWR | Hochschrank 80 × 45 × 220, Regal mit Körben |

### Geometrie & Zonierung

Alle Stilwelten nutzen dieselbe, aus den Maßketten abgeleitete Zonierung (lokale Wandkoordinaten, u entlang der Wand, v in den Raum):

| Raum | Zonierung |
|---|---|
| **Wohnen** | Medienwand W11 (284 cm) – Lounge (Sofarücken 0,5 m vor dem Wandversatz W09, Sehabstand ≈ 3,2–3,4 m, 40–45 cm Knieraum) – Hauptweg Diele → Essplatz/Küche/Schlafen ≥ 1,0 m – Lesenische W05/W06 |
| **Essen** | Tischmitte vor W06, 1,1 m Durchgang zur Küche, 90-cm-Türzone Schlafen frei; Sideboard an W07, Regal/Highboard an W08 |
| **Schlafen** | Bett mittig an W20, Schrank 300 cm an W22 mit ≈ 0,9 m Gang (Türen frei schwenkbar), Leseplatz in der Südostecke |
| **Arbeiten / Gäste** | Bettsofa an W23 außerhalb der Türzone, Schreibtisch mit seitlichem Tageslicht an W24/W26, Bibliothekswand über die volle Wand W28 |

## Ansichten

| Ansicht | Inhalt |
|---|---|
| **3D-Rundgang** | Dollhouse (ohne Decke) und Begehung auf Augenhöhe, 14 Kamerastationen, drei Lichtstimmungen, **Stilwelt-Leiste**, Darstellung **Standard / Realistisch**, Möbel anklicken → Details |
| **Grundriss** | Maßstäblicher Plan (SVG) aus derselben Datenbasis: Wände mit Öffnungen, Wandmaße, nummerierte Möbel-Grundflächen, Raumfokus, Zoom/Pan |
| **Wandmaße** | Alle 52 Wände mit Länge, Öffnungen, Nettoabschnitten und Prüfstatus |
| **Konzept & Möbel** | Stilwelt-Reiter, Farbpalette, Materialität, Wandgestaltung, Lichtplanung, **Luxus-Prinzipien**, Planungsprüfung, Raumkonzepte, Möbel- und Ausstattungsliste, Moodboards |

### Bedienung 3D

| Aktion | Dollhouse | Begehung |
|---|---|---|
| Drehen / Umsehen | linke Maustaste ziehen | linke Maustaste ziehen |
| Verschieben | rechte Maustaste / Umschalt + ziehen | `W` `A` `S` `D` (Umschalt = schneller), `Q`/`E` Höhe |
| Zoom | Mausrad | – |
| Stilwelt wechseln | Leiste oben oder `1`–`4` | Leiste oben oder `1`–`4` |
| Möbel-Info | Klick auf Möbel | Klick auf Möbel |

## Rendering

### Engine: three.js WebGPU (r186) statt WebGL-Renderer + Pathtracer

Der bisherige Weg (WebGL-Renderer + progressiver GPU-Pathtracer) war für die fotorealistische Ansicht zu langsam: BVH-Aufbau blockierte die Oberfläche, und ein rauschfreies Bild brauchte Hunderte Samples bei stillstehender Kamera. **Unreal Engine** wurde geprüft, ist für diese Web-Anwendung aber nicht einsetzbar: Der HTML5/WebGL-Export wurde mit UE 4.24 eingestellt, und *Pixel Streaming* benötigt einen dauerhaft laufenden GPU-Server, der das Bild als Video streamt – keine Offline-Nutzung, laufende Kosten, Latenz. Stattdessen nutzt die App die **WebGPU-Engine von three.js**, die dieselben Techniken wie moderne Game-Engines (vgl. Unreal Lumen/SSR/TAA) als Echtzeit-Nachbearbeitung im Browser bereitstellt:

| Darstellung | Pipeline (TSL-Nodes, `src/engine/render.js`) | Einsatz |
|---|---|---|
| **Standard** | Normal-Prepass → **SSAO** (entrauscht, halbe Auflösung) nur im Umgebungslicht (`builtinAOContext`) → Szenen-Pass mit **4× MSAA** → Bloom → SMAA; in Bewegung schlanke Variante ohne AO/MSAA | schnelles Planen, schwächere Geräte |
| **Realistisch** | MRT-Szenen-Pass (Farbe, Albedo, Normalen, Bewegungsvektoren, Metall/Rauheit) → **SSGI** (Screen-Space Global Illumination: Lichtbounce, Farbbluten, Kontaktschatten) → **SSR** (Spiegelungen auf Boden, Stein, Metall) → Bloom → **TRAA** (temporales Anti-Aliasing, konvergiert in ≈ 40 Bildern) | fotorealistische Ansichten und Exporte, bleibt interaktiv |

Gemeinsame Grundlagen:

- **PBR-Materialien** (`MeshPhysicalMaterial`, automatisch in Node-Materialien übersetzt): Sheen für Textilien, Clearcoat für Lack/Stein; CC0-Fotoscans (Poly Haven) und vorberechnete prozedurale Texturen.
- **Weiche Sonnenschatten** (4K Shadow Map, Frustum deckt die gesamte Plandiagonale ab – keine Lichtlecks in Eckräumen).
- **Lokale Raum-Lightprobe:** In der Begehung wird der Raum um die Kamera in eine Cubemap aufgenommen und in zwei Durchgängen (zwei Lichtbounces) als bildbasiertes Licht verwendet; im Modus *Realistisch* ergänzt SSGI den Nahbereich.
- **Belichtungsautomatik:** log. Mittelwert der Leuchtdichte der Lightprobe (asynchrones GPU-Readback) → Zielwert der Lichtstimmung; der Belichtungsregler wirkt als Korrektur.
- **Außenraum 3. OG mit Blick in den Park** (`builders/surroundings.js`, nur in der Begehung): Der Blick aus den Fenstern ist echte Geometrie statt eines Panoramafotos auf Straßenniveau – Parkrasen mit Kieswegen und Parkleuchten **9,28 m unter dem Fertigfußboden** (laut Plan „+9,28 OK FFB“), rund 150 Laubbäume (instanziert, 10–17 m hoch, spätsommerliche Grüntöne) mit freier Rasenfläche vor den Fensterfassaden, Eingangsstraße mit Gründerzeit-Häuserzeile, Stadtkante am Horizont, Luftperspektive ab 50 m. Das Gebäude selbst ist mit Erdgeschoss bis 2. OG, Geschossbändern, Fenstern und gestapelten Balkonen darunter sowie dem 4. OG darüber modelliert. Die Himmel sind reine Himmelspanoramen ohne Bodenkulisse; ihre Sonnenscheibe wird automatisch vermessen (Schwerpunkt der Scheibe) und exakt auf die Richtung des Schattenwurfs gedreht (Abweichung < 0,5°), die Scheibe selbst wird im Umgebungslicht gekappt, damit die Sonne nicht doppelt wirkt.
- **Planare Spiegel:** Reflector-Knoten für alle Spiegel (Bad-Spiegelwände, Dielenspiegel) in der Begehung, gerendert nur wenn sichtbar; im Dollhouse Lightprobe-Spiegelung.
- **Lichtstimmungen:** *Tageslicht* (Sonne aus Südost, Himmel Poly Haven *Kloofendal 48d*; fensterlose Räume beleuchtet), *Goldene Stunde* (tief stehende Sonne, *Qwantani Late Afternoon*), *Abend* (Dämmerung, *Qwantani Dusk 2* (alle Leuchten, 2700 K, Bad 3000 K). Leuchtenwerte photometrisch (Lumen → Candela/Nits).

### Performance

| Maßnahme | Wirkung |
|---|---|
| **Rendern bei Bedarf** | Standard: nur bei Änderungen; Realistisch: bis zur Konvergenz (≈ 40 Bilder), danach Ruhe |
| **Zweistufige Qualität** | Standard in Bewegung ohne AO/MSAA, nach 160 ms Stillstand ein verfeinertes Bild |
| **Statische Schatten** | Sonnen-Shadow-Map nur nach Szenen-, Stil-, Modus- oder Stimmungswechsel |
| **Licht-Budget** (`lighting.js`) | Feste Punkt-/Spot-Slots, belegt mit den Leuchten des aktuellen Raums – kein Lichtdurchschlag durch Wände |
| **Adaptive Auflösung** | Pixel-Ratio sinkt stufenweise bei < 28 fps in Bewegung und steigt bei Reserve |
| **Halbe Auflösung für AO/SSR** | SSAO und SSR in halber Auflösung, Normal-/Albedo-/Metall-Puffer als 8-Bit-Texturen |
| **Vorberechnete Texturen** | prozedurale Texturen als WebP (3,7 MB), Dekodierung außerhalb des Hauptthreads |
| **Asynchrone Shader-Kompilierung** | `compileAsync` vor dem ersten Bild; WebGPU-Pipelines werden gecacht |

Qualitätsstufen *Hoch/Mittel/Schnell* steuern Pixel-Ratio, Schattenauflösung und die Sample-Zahlen von SSAO, SSGI und SSR.

## Automatische Planungsprüfung

`src/core/validate.js` prüft bei jedem Start und nach jedem Stilwechsel sämtliche Positionen der aktiven Stilwelt gegen die gemessene Geometrie:

| Prüfung | Kriterium |
|---|---|
| Raumkontur | jede Grundfläche liegt innerhalb der Innenkontur (Toleranz 1,2 cm für wandbündige Elemente) |
| Kollisionen | keine Überschneidung von Möbeln im selben Raum (SAT-Test) |
| Türen | 90 cm tiefe Bewegungsfläche vor jeder Tür beidseitig frei |
| Fenster / Balkontüren | 45 cm Zugang; Balkontüren vollständig frei, Fenster höchstens zur Hälfte verstellt |

Stand dieser Planung: **alle vier Stilwelten bestehen sämtliche Prüfungen** (je ≈ 440–470 Einzelprüfungen).

## Maße und Genauigkeit

Die Raumkonturen stammen aus den Vektordaten des Ausführungsplans und sind auf drei Maßketten kalibriert (Arbeiten/Gäste-Breite 3,48 m, Innentür 0,885 m, Badtür 0,76 m). Raumhöhe 2,56 m, Türen 2,135 m, bodentiefe Fenster (BRH 0,00). Sanitärobjekte, Vorwände (Ablage 1,18 m) und Heizkörper folgen den Angaben des HLS-Plans. Die Wandstärken werden aus den Abständen benachbarter Raumkonturen abgeleitet; dünne Trennwände innerhalb eines Raums (z. B. die 10-cm-Wand zwischen Waschtrockner-Nische und WC-Vorwand im Bad) werden als solche erkannt und nicht als 36-cm-Außenwand gebaut. Fertigfußboden +9,28 m (3. OG), Geschosshöhe darunter 3,09 m.

> **Wichtig:** Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß und keine Fertigungsgrundlage. Vor Möbelkauf, Einbau oder Montage lichte Maße, Türanschläge, Heizkörper, Elektro- und Sanitäranschlüsse vor Ort prüfen – insbesondere die Spiegelmaße gegen die ausgeführten Vorwände und die Nischenmaße gegen den gewählten Waschtrockner.

## Export

- 3D-Ansicht als PNG und in doppelter Auflösung – im Modus *Realistisch* wird bis zur Konvergenz gewartet; Dateiname enthält Stilwelt, Station und Darstellung
- Grundriss mit Möblierung und Maßen als SVG · Druckansicht / PDF
- Wandmaße und Nettoabschnitte als CSV
- Möbelliste der aktiven Stilwelt als CSV
- Geometrie + Einrichtung als JSON

## Architektur

```text
.
├── index.html                    # App-Shell, Import-Map (three → vendor/three.webgpu.min.js, three/tsl)
├── styles/app.css                # UI (Japandi-Designsprache, responsiv, Druckansicht, Stilwelt-Leiste)
├── src/
│   ├── main.js                   # Bootstrap, UI-Logik, Stilwechsel (Leiste + Tasten 1–4), Export
│   ├── core/geometry.js          # Planmaße → Meter, Wandrahmen, Wandstärken, Polygon-Utilities
│   ├── core/validate.js          # Planungsprüfung (Kontur, Kollision, Türen, Fenster)
│   ├── data/plan.js              # rekonstruierte Planvektoren (Quelle der Maßketten)
│   ├── data/styles.js            # vier Stilwelten, Luxus-Prinzipien, gemeinsame Raumtexte
│   ├── data/design.js            # gemeinsamer Bestand (Küche, Bäder nach HLS-Plan, HWR, Diele) + Stil-Möblierung
│   ├── engine/
│   │   ├── viewer.js             # WebGPU-Renderer, Render-Modi, Lightprobe, Belichtung, Spiegel, Kameras, Stimmungen
│   │   ├── render.js             # TSL-Pipelines: Standard (SSAO, MSAA, SMAA) und Realistisch (SSGI, SSR, TRAA)
│   │   ├── lighting.js           # Licht-Budget je Raum (feste Slots, fensterlose Räume)
│   │   ├── scene.js              # Szenenaufbau je Stilwelt + Positionsregister
│   │   ├── materials.js          # PBR-Materialbibliothek, Stil-Themen, prozedurale Textur-Tabelle
│   │   ├── textures.js · uv.js · models.js
│   │   └── builders/             # parametrische Modelle
│   │       ├── architecture.js   # Wände, Laibungen, Böden, Decken, Fenster, Türen, Balkone
│   │       ├── catalog.js        # Westwing-/IKEA-Modelle (inkl. Zumi, Hilda, PAX, BESTÅ …)
│   │       ├── furniture.js      # Maßmöbel (Lamellenwand, Lowboard, Bibliothekswand …)
│   │       ├── surroundings.js   # Park (9,28 m tiefer), Bäume, Straße, Stadtkante, Gebäude unter/über WE 13
│   │       ├── bath.js           # Vorwände 1,18 m, Maßspiegel, Waschtrockner-Nische, Laufen VAL/Meda, V&B Collaro, Duravit Tulum
│   │       └── kitchen.js · decor.js · textiles.js · common.js
│   └── ui/plan2d.js              # SVG-Grundriss
├── vendor/                       # three.js r186 (WebGPU + TSL) und Add-ons (lokal, offline, versionsfest)
├── assets/                       # CC0-Assets (lib/), Ausführungsplan (PDF), Moodboards
└── tools/
    ├── build-vendor.mjs          # erzeugt vendor/ aus npm-Paketen (esbuild)
    ├── bake-textures.mjs · bake.html
    └── fetch-assets.py
```

### Abhängigkeiten neu erzeugen

```bash
cd tools && npm install && node build-vendor.mjs   # vendor/ (three.webgpu.min.js, three.tsl.min.js, three-addons.js)
python3 tools/fetch-assets.py                      # assets/lib/
cd tools && npx playwright install chromium && node bake-textures.mjs   # assets/lib/textures/baked/
```

Nach Änderungen an einem Textur-Generator (`PROCEDURAL` in `src/engine/materials.js`) die Texturen neu backen – sonst lädt die App die alten Dateien.

### Neue Stilwelt anlegen

Ein Eintrag in `STYLES` (`src/data/styles.js`) genügt: `theme`, `wallOverride`, `decor`, Texte (`palette`, `materials`, `walls`, `lightPlan`, `notes`) und `furnish(ctx)` mit den Raum-Helfern `living`, `dining`, `bedroom`, `office` (inkl. `library`). Die Stilwelt-Leiste und Taste 5 ff. entstehen automatisch; die Planungsprüfung zeigt sofort, ob alles passt.

## Quellen der Produkt- und Gestaltungsrecherche (09/2026)

- Westwing Collection: [Markenseite](https://www.westwing.de/brands/westwing-collection/), [Neuheiten](https://www.westwing.de/new-products/), [TV-Lowboard Zumi](https://www.westwing.ch/zumi-lowboard-oak-marble-top-en-26wes55818.html), [Esstisch Sahra](https://www.westwing.de/runder-esstisch-sahra-o-116-cm-152091.html), [Esstisch Abby](https://www.westwing.de/runder-marmor-esstisch-abby-o-120-cm-158095.html), [Pendel Helen](https://www.westwing.ch/helen-pendant-light-terracotta-d38cm-en-26wes87525.html)
- IKEA: [Neuheiten](https://www.ikea.com/de/de/new/new-products/), [BJÖRKÖVIKEN Tür braun gebeiztes Eichenfurnier 60 × 64](https://www.ikea.com/de/de/p/bjoerkoeviken-tuer-braun-gebeiztes-eichenfurnier-70490948/)
- Gestaltung: [Homes & Gardens – Storage that looks expensive (2026)](https://www.homesandgardens.com/interior-design/what-storage-makes-a-house-look-expensive-in-2026), [House of Nuances – Quiet Luxury 2026](https://houseofnuances.com/blog/quiet-luxury-interior-design), [Finest Furniture Studio – Luxury ideas 2026](https://finestfurniturestudio.co.uk/luxury-interior-design-ideas/)
- Rendering: three.js r186 – [SSGI](https://threejs.org/examples/webgpu_postprocessing_ssgi.html), [SSR](https://threejs.org/examples/webgpu_postprocessing_ssr.html), [TRAA](https://threejs.org/examples/webgpu_postprocessing_traa.html), [AO](https://threejs.org/examples/webgpu_postprocessing_ao.html)

## Lizenzen

- three.js: MIT (siehe `vendor/LICENSE.three.txt`)
- Texturen, HDRIs und Modelle: [Poly Haven](https://polyhaven.com), CC0
- Schriften: Cormorant Garamond, Jost (Google Fonts, OFL)
- Westwing, IKEA, Laufen, Villeroy & Boch, Duravit und genannte Produktnamen sind Marken der jeweiligen Inhaber; die Modelle sind vereinfachte Nachbildungen zu Planungszwecken.
