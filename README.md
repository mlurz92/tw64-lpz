# WE 13 · Raumatelier

Maßstäbliche, fotorealistische Einrichtungsplanung der Wohnung **WE 13, Täubchenweg 62–64, Leipzig (3. OG, 97,56 m², Blick in den Park)** in **vier umschaltbaren Stilwelten** – alle aus den Moodboards abgeleitet, alle auf dieselbe gemessene Raumgeometrie geplant und ausschließlich mit recherchierten neuen Möbeln von **Westwing** und **IKEA** (Herstellermaße, Recherche 09/2026) möbliert.

Die Anwendung verbindet die aus dem Ausführungsplan rekonstruierte Raumgeometrie mit einer vollständig durchgeplanten Möblierung und rendert sie in drei Stufen:

| Darstellung | Engine | Wofür |
|---|---|---|
| **Standard** | three.js r186 **WebGPU** (Rasterisierung, PBR, SSAO, MSAA) | flüssiges Planen und Begehen |
| **Realistisch** | WebGPU + Screen-Space-GI, Spiegelungen (SSR), temporales AA | Echtzeit-Eindruck mit Lichtbounce |
| **Fotorealistisch** *(neu)* | **GPU-Pathtracer** (three-gpu-pathtracer, WebGL 2) + **KI-Entrauschung Intel Open Image Denoise** (oidn-web, WebGPU) | physikalisch korrekte Standbilder in Archviz-Qualität, startet automatisch, sobald die Kamera ruht |

## Schnellstart

Ein Build-Schritt ist nicht nötig; die Anwendung besteht aus ES-Modulen und muss über einen lokalen Webserver geöffnet werden (Module/Texturen lassen sich nicht per `file://` laden):

```bash
python3 -m http.server 8000
# oder: node tools/dev-server.mjs
```

Danach <http://localhost:8000> öffnen. Auf Smartphone und Tablet lässt sich die App über *Zum Home-Bildschirm* wie eine native App installieren (Web-App-Manifest, Vollbild ohne Browserleiste); ein Service Worker hält Texturen, Himmel, Modelle und Engine auf dem Gerät vor – ab dem zweiten Besuch lädt die App ohne erneuten Download der ≈ 60 MB und funktioniert offline (Details unter *Tempo & Touch*). Die Pathtracing-Engine (≈ 1 MB) und die Denoiser-Gewichte (1,8 MB) werden erst beim ersten Wechsel auf *Fotorealistisch* geladen. Empfohlen: aktueller Chrome/Edge (WebGPU), Safari 26+ oder Firefox 141+ mit aktivierter Hardwarebeschleunigung. Ohne WebGPU schaltet die Engine automatisch auf ihr **WebGL-2-Backend** (gleiches Bild, etwas langsamer); das aktive Backend steht unten links im 3D-Viewer (Desktop). Direktlink auf eine Stilwelt: `#stil=metallic`, `#stil=soft`, `#stil=brutal`, `#stil=quiet` (die zuletzt gewählte Stilwelt wird gemerkt).

## Stilwelten (Möblierungsvarianten)

Umschalten **direkt im 3D-Viewer** über die Stilwelt-Leiste oben (oder die Tasten **1–4**) bzw. über die Reiter unter *Konzept & Möbel*. Beim Wechsel werden Möblierung, Wandgestaltung, Material-Thema, Einbaufronten und Leuchten neu aufgebaut; Kamera, Lichtstimmung, Darstellung (Standard/Realistisch) und Ansicht bleiben erhalten. Grundriss, Möbelliste, Planungsprüfung und Exporte folgen automatisch.

Die vier Stilwelten variieren Architektur, Wandgestaltung, Kunst, Kissen und Licht. Die kaufbaren Möbel folgen einem gemeinsamen, maßhaltigen Katalog mit echten Ausführungen; ein Stilwechsel färbt gekaufte Produkte nicht fiktiv um.

| Bereich | Recherchierte Auswahl |
|---|---|
| Wohnen | Westwing Alba 2-Sitzer (185 × 114), Mikkel, Marisa; IKEA GLADOM, zwei offene BESTÅ-Korpusse (240 cm) |
| Essen | IKEA STOCKHOLM 2025 Ø 115 mit vier LISABO; Westwing Calary 160 × 45; IKEA TONSTAD Regal |
| Schlafen | IKEA TÄLLÅSEN 180 × 200, zwei TONSTAD-Ablagetische, drei PAX-Korpusse mit sechs FORSAND-Türen; Mikkel |
| Arbeiten / Gäste | IKEA HYLTARP Kilanda Blassblau, TONSTAD Schreibtisch Elfenbeinweiß, drei BILLY; Westwing Zara Hellbeige/Edelstahl |
| Diele / HWR | IKEA PAX/FORSAND, LACK, ENHET und IVAR |
| Bäder / Balkone | IKEA ENHET, VILTO, NÄMMARÖ und TÄRNÖ |

Alle neuen Möbel stammen von **IKEA oder Westwing**. Die vollständigen direkten Produktlinks, Ausführungen, Herstellermaße und Zusammenstellungen stehen in [docs/PRODUCT_RESEARCH.md](docs/PRODUCT_RESEARCH.md), Recherche **28.09.2026**. Der verbindliche Katalog ist in src/data/products.js hinterlegt. Möbel-Detailkarten zeigen Händlerlinks, Mengen und Recherchedatum; CSV und JSON enthalten die Produktbelege.

Bestandsküche, Sanitärobjekte, Geräte und bauliche Gestaltung bleiben separat als Bestand bzw. Gestaltung gekennzeichnet. Die 3D-Modelle bilden die recherchierten Produkte vereinfacht nach. Wandgestaltung und Dekoration folgen weiterhin den vier Moodboards. PAX verwendet reale FORSAND-Türen statt fiktiver Maßfronten; BESTÅ bleibt als offener Korpus dargestellt. Höffner wäre als Händler zulässig, ist für diese Auswahl nicht nötig.

### Bäder (nach Ausführungsplan HLS)

Bad, Dusche/Gäste-WC und HWR sind an Wand und Boden mit mattem Feinsteinzeug **Iron 60 × 60 cm** dargestellt.

| | **Bad** | **Dusche / Gäste-WC** |
|---|---|---|
| Vorwand | Waschtisch-Vorwand W37 mit **Ablage 1,18 m** (90 × 25 cm), Wannen-Vorwand W38 mit Ablage 1,18 m | Vorwand über die volle Wand W43 mit **Ablage 1,18 m** (131 × 15 cm) |
| Spiegel | **Maßspiegel über die volle Breite des Waschtisch-Vorsprungs oberhalb der Ablage bis zur Decke (90 × 138 cm)** – endet bündig an der Wannenkante, über der Wanne bleibt die Wand gefliest | **Maßspiegel über die gesamte Wand W43 oberhalb der Ablage bis zur Decke (131 × 138 cm)** |
| Waschtisch | Laufen **VAL** 60 × 42 + offener IKEA ENHET-Korpus 60 × 40 × 60 | Laufen **VAL** 60 × 42 + IKEA ENHET-Korpus |
| WC | Laufen **Meda**, Vorwand W35 | Laufen **Meda**, W46 |
| Wäsche | **Waschtrockner** (Frontlader 60 × 60 × 85) in der ersten Nische direkt neben der Tür, Steinablage über die volle Nischenbreite, IKEA ENHET-Wandschrank 60 × 32 × 75 darüber | – |
| Wanne / Dusche | Villeroy & Boch **Collaro** 180 × 80, eingefliest | Walk-in 105 × 80, Linienrinne, Glas L-förmig |
| Armaturen | **alle schwarz matt**: Duravit **Tulum** Waschtischmischer, Wannenthermostat Aufputz mit Handbrause | **alle schwarz matt**: Duravit **Tulum** Duschsystem Aufputz (Kopf- und Handbrause), Waschtischmischer |
| Licht | 2 IP44-Pendel vor der Spiegelwand + Einbaustrahler, 3000 K | 2 IP44-Pendel + Einbaustrahler, 3000 K |
| Heizkörper | Handtuchheizkörper 60 × 180 schwarz (W39) | Handtuchheizkörper 60 × 180 schwarz (W44) |

Die Spiegel nutzen auf WebGPU die lokale Raum-Lightprobe für stabile Reflexionen ohne zusätzliche Vollbildpässe; im WebGL-2-Backend werden in der Begehung planare Reflector-Knoten verwendet. Fensterlose Räume (Bäder, HWR) bleiben auch bei „Tageslicht“ beleuchtet.

### Luxus-Prinzipien (angewendet in allen Stilwelten)

| Prinzip | Umsetzung in WE 13 |
|---|---|
| Maßhaltige Serienmodule | BESTÅ 240 cm, BILLY 120 cm und PAX/FORSAND in realen Herstellermaßen |
| Ruhige Flächen | weiße PAX/FORSAND-Fronten, offene BESTÅ-/BILLY-Fächer, Calary mit geriffelter Holzfront |
| Materialehrlichkeit | Echtholz/-furnier, Naturstein, Kalk-/Lehmputz, Leinen, Wolle, Bouclé; je Stilwelt nur ein Metallton |
| Mehrschichtiges Licht 2700 K, CRI > 95 | Grundlicht entblendet, indirekte LED-Vouten/-Unterleuchtung, Zonen- und Stimmungslicht; Bad 3000 K |
| Großzügige Proportionen | Teppich 300 × 400 (Sofa, Couch- und Beistelltisch stehen vollständig darauf, vom Lowboard bis 35 cm hinter den Sofarücken), deckenhohe, bodenlange Vorhänge, Kunst mit Bildmitte ≈ 1,45 m |
| Spiegel als Architektur | Maßspiegel oberhalb der Ablagen bis zur Decke: im Gäste-WC wandfüllend, im Bad über die Breite des Waschtisch-Vorsprungs (nicht über der Wanne) |
| Relief statt Farbe an den Wänden *(neu)* | Grundwände bleiben weiß, gewinnen aber Tiefe: **Wandfelder** über die volle Wand W10 (4,28 m) im Wohnen und an der Blickwand W19 neben dem Bett, Brüstungsprofil H 80 cm, Kunst mittig im großen Feld. Profil je Stilwelt: *Boiserie klassisch* (Metallic Japandi, Quiet Luxury), *Leistenrahmen Japandi* (Soft Brutalism), *Schattenfugen-Rahmen* (Refined Brutalism) |
| Galerielicht *(neu)* | **Bilderleuchten** (2700 K, CRI > 95) über jedem Hauptkunstwerk – Diele, Wohnen, Essen, Schlafen, Arbeiten – im Metallton der Stilwelt (Bronze, Messing brüniert, Stahl brüniert, Mattschwarz) |
| Licht auf Textil, Technik unsichtbar *(neu)* | **Vorhangvouten** wand-zu-wand (20 × 10 cm) an allen Fensterwänden (W03, W04, W06, W21, W27): verdecken die Schienen, eine LED-Linie streift die bodenlangen Vorhänge |
| Wenige, starke Setzungen | je Raum ein Statement (Lamellen-, Spiegel-, Bibliothekswand) |

### Stauraum

| Raum | Stauraum |
|---|---|
| Diele | 2 × PAX 99,8 × 35,5 × 236,4 + FORSAND-Türen |
| Wohnen | BESTÅ 240 × 40 × 38, Calary, TONSTAD-Regal an W08 |
| Schlafen | 3 × PAX 99,8 × 58 × 236,4 + FORSAND, TONSTAD-Ablagetische |
| Arbeiten | 3 × BILLY 40 × 28 × 202 |
| Bad / WC | offene ENHET-Korpusse, Ablagen 1,18 m, ENHET-Wandschrank über dem Waschtrockner |
| HWR | 2 × ENHET 30 × 32,1 × 180, IVAR 89 × 30 × 179 |

### Geometrie & Zonierung

Alle Stilwelten nutzen dieselbe, aus den Maßketten abgeleitete Zonierung (lokale Wandkoordinaten, u entlang der Wand, v in den Raum):

| Raum | Zonierung |
|---|---|
| **Wohnen** | Medienwand W11 (284 cm) – Lounge (Sofarücken 0,5 m vor dem Wandversatz W09, Sehabstand ≈ 3,2–3,4 m, 40–45 cm Knieraum, Teppich 300 × 400 mit 15 cm Wandabstand zu W10) – Hauptweg Diele → Essplatz/Küche/Schlafen ≥ 1,0 m – Lesenische W05/W06 |
| **Essen** | Tischmitte vor W06, 1,1 m Durchgang zur Küche, 90-cm-Türzone Schlafen frei; Sideboard an W07, Regal/Highboard an W08 |
| **Schlafen** | Bett mittig an W20, Schrank 300 cm an W22 mit ≈ 0,9 m Gang (Türen frei schwenkbar), Leseplatz in der Südostecke |
| **Arbeiten / Gäste** | Bettsofa an W23 außerhalb der Türzone, Schreibtisch mit seitlichem Tageslicht an W24/W26, BILLY-Regalgruppe an W28 |

## Ansichten

| Ansicht | Inhalt |
|---|---|
| **3D-Rundgang** | Dollhouse (ohne Decke) und Begehung auf Augenhöhe, 14 Kamerastationen, drei Lichtstimmungen, **Stilwelt-Leiste**, Darstellung **Standard / Realistisch / Fotorealistisch**, Möbel anklicken → Details, **Vollbild**; auf Smartphones mit Chips, Bottom-Sheets und Geh-Joystick (siehe *Responsives Layout*) |
| **Grundriss** | Maßstäblicher Plan (SVG) aus derselben Datenbasis: Wände mit Öffnungen, Wandmaße, nummerierte Möbel-Grundflächen, Raumfokus, Zoom/Pan |
| **Wandmaße** | Alle 52 Wände mit Länge, Öffnungen, Nettoabschnitten und Prüfstatus |
| **Konzept & Möbel** | Stilwelt-Reiter, Farbpalette, Materialität, Wandgestaltung, Lichtplanung, **Luxus-Prinzipien**, Planungsprüfung, Raumkonzepte, Möbel- und Ausstattungsliste, Moodboards |

### Bedienung 3D

| Aktion | Dollhouse | Begehung |
|---|---|---|
| Drehen / Umsehen | linke Maustaste ziehen | linke Maustaste ziehen |
| Verschieben | rechte Maustaste / Umschalt + ziehen | `W` `A` `S` `D` (Umschalt = schneller), `Q`/`E` Höhe |
| Zoom / Gehen | Mausrad | **Mausrad = vor/zurück gehen** |
| Hinbewegen *(neu)* | **Doppelklick** → Flug zum Punkt, Abstand halbiert, der Punkt wird Drehpunkt | **Doppelklick auf den Boden** → dorthin gehen; auf Wand/Möbel → Halt 60 cm davor |
| Stilwelt wechseln | Leiste oben oder `1`–`4` | Leiste oben oder `1`–`4` |
| Möbel-Info | Klick auf Möbel | Klick auf Möbel |
| Vollbild (nur 3D) | `F` oder ⛶ unten rechts, `Esc` beendet | `F` oder ⛶ unten rechts, `Esc` beendet |

### Bedienung auf Smartphone und Tablet

| Aktion | Dollhouse | Begehung |
|---|---|---|
| Drehen / Umsehen | ein Finger ziehen | ein Finger ziehen; zwei Finger ziehen ebenfalls (ohne Sprung beim Aufsetzen des zweiten Fingers) |
| Verschieben / Zoom | zwei Finger (Pinch + Verschieben) | – |
| Gehen / Hinbewegen | **Doppeltippen** → Flug zum Punkt (halber Abstand) | **Doppeltippen auf den Boden** → dorthin gehen; **Pinch** = vor/zurück; **virtueller Joystick** unten links (Auslenkung = Tempo, Vollausschlag = schnell, kurzer Vibrationsimpuls beim Greifen auf Android) |
| Möbel-Info | antippen → Detailkarte klappt unten ein Stück auf; **Hochwischen** oder Tippen öffnet sie ganz, Wischen nach unten schließt. Das Antippen wartet das Doppeltipp-Fenster (≈ 0,3 s) ab, damit ein Doppeltippen nicht zuerst die Karte unter dem zweiten Tipp öffnet | dto. |
| Laufender Kameraflug | neuer Fingerkontakt übernimmt sofort (Flug bricht ab) | dto. |
| Sheets | Wischen am Griff/Kopf oder – wenn der Inhalt oben steht – **am Inhalt selbst** nach unten schließt; im Querformat (Schublade rechts) nach rechts wischen | dto. |
| Grundriss | ein Finger verschieben, **zwei Finger zoomen**, **Doppeltippen zoomt** auf den Punkt (tief gezoomt: zurück zur ganzen Wohnung), +/−/⛶-Knöpfe mit weichem Übergang; Maßstabsbalken passt sich an (25 cm … 10 m) | – |

## Responsives Layout (neu)

Die Oberfläche erkennt beim Laden und bei jeder Größen- oder Orientierungsänderung **Geräteklasse und Eingabeart** (`src/ui/layout.js`, CSS-Media-Queries `pointer: coarse`, `hover: none`, Breite, Höhe, Orientierung) und ordnet die Bedienelemente so an, dass die **3D-Ansicht möglichst viel Fläche** behält. Die Bedienelemente werden dabei nur umgehängt, nicht dupliziert – Zustand und Ereignisse bleiben identisch.

| Gerät | Navigation | 3D-Arbeitsfläche |
|---|---|---|
| **Desktop** (> 1180 px) | Kopfzeile mit Reitern | Kamerastationen links, Details rechts, Stilwelt-Leiste oben, vollständige Werkzeugleiste unten; ⛶ Vollbild |
| **Tablet** (≤ 1180 px) | Kopfzeile, Symbole für Maßgrundlage | Kamerastationen eingeklappt, Detailpanel erst bei Bedarf, Stilwelt-Leiste über der Werkzeugleiste; Werkzeugleiste auf Dollhouse/Begehung + **„Ansicht“** reduziert (Licht, Darstellung, Belichtung, Qualität, PNG im Sheet); größere Touch-Ziele |
| **Smartphone hoch** (≤ 700 px) | kompakte Kopfzeile (Symbol-Buttons), **App-Navigation unten** (3D · Plan · Maße · Konzept) | randlose 3D-Ansicht; oben zwei Chips (**aktuelle Kamerastation** in Kurzform, **Stilwelt** – kürzt zuerst) und ⛶; unten nur Dollhouse/Begehung + **„Ansicht“** über die volle Breite (bis 360 px Displaybreite vollständig sichtbar, darunter „Ansicht“ als Symbol). Stationen, Stilwelten sowie Licht/Darstellung/Belichtung/Qualität/PNG öffnen sich als **Bottom-Sheets** (Wischen nach unten oder Tippen daneben schließt; die Szene bleibt dahinter sichtbar, Änderungen wirken live) |
| **Smartphone quer** (Höhe ≤ 520 px) | Kopfzeile wird zur **schmalen Seitenleiste** links (Symbole) – die volle Bildhöhe gehört der 3D-Ansicht | Chips oben links, Detailkarte rechts oben, Sheets zentriert |

Weitere Anpassungen:

- **Vollbild/Immersiv** (alle Geräte): blendet alle Bedienelemente aus und nutzt – wo der Browser es erlaubt – die native Fullscreen-API; auf dem iPhone (ohne Fullscreen-API) greift der CSS-Immersivmodus. Joystick und Pathtracing-Fortschritt bleiben sichtbar.
- **Overlays treten zurück**, solange ein Finger das Modell bewegt (Deckkraft 18 %, nicht klickbar).
- **Sichtfeld im Hochformat:** Die FOV-Werte der Kamerastationen sind für Querformat abgestimmt; im Hochformat würde der horizontale Bildwinkel in der Begehung auf einen schmalen Ausschnitt schrumpfen. Der vertikale Bildwinkel wird deshalb in Richtung des Querformat-Bildwinkels (Referenz 3 : 2) erweitert, begrenzt auf 85° gegen Verzerrung.
- **Auflösung:** kleine Canvas (< 0,6 MP, also Smartphones) dürfen bis 1,5× Gerätepixel rendern, auch in der Stufe *Schnell* – das Pixelbudget der Qualitätsstufe und die adaptive Auflösung begrenzen die Last weiterhin.
- `100dvh`, `viewport-fit=cover` und `env(safe-area-inset-*)`: kein Springen beim Ein-/Ausblenden der Browserleiste, Notch und Home-Indikator werden freigehalten.
- Grundriss auf dem Smartphone randlos, Ebenen/Räume/Positionen als ausklappbares Sheet; Antippen eines Raums oder einer Position öffnet es automatisch (Verschieben/Zoomen dagegen nicht mehr – vorher klappte jedes Loslassen nach dem Verschieben das Sheet über den halben Plan), Hochwischen am Griff öffnet, Herunterwischen schließt; ein in der Raumliste gewählter Raum wird bei geschlossenem Sheet sichtbar eingepasst.
- Wandmaß-Tabelle mit fixierter erster Spalte beim seitlichen Scrollen, Stilwelt-Reiter im Konzept als wischbare Zeile.

## Tempo & Touch (Update 09/2026)

Ziel: kein spürbares Stocken mehr – weder beim ersten Drehen, beim Betreten der Begehung, beim Raum- oder Lichtwechsel noch beim Stilwechsel – und eine Touch-Bedienung, die sich wie eine native App anfühlt.

**Ursachenanalyse** (CPU-Profil und Zählung der Shader-Programme im Browser, Smartphone-Viewport):

| Befund | Wirkung vorher |
|---|---|
| Shader wurden **synchron beim ersten Gebrauch** kompiliert – `compileAsync` erfasste nur eine nie genutzte Variante und wegen Frustum-Culling kaum Objekte | Hänger beim ersten Drehen, beim ersten Betreten der Begehung, beim ersten Abendlicht und nach jedem Stilwechsel |
| Der Renderer schlüsselt jedes Material auf die **Identität der sichtbaren Lichter, des Umgebungs-Nodes und des Nebels** | jeder Raumwechsel in der Begehung (andere Leuchten), jede neue Raum-Lightprobe (neue Umgebungstextur), jeder Wechsel Dollhouse ↔ Begehung (Nebel an/aus) und jede Lichtstimmung baute die Node-Graphen aller ≈ 300 Zeichenobjekte neu |
| Bewegtbild, Ruhebild (SSAO) und Lightprobe erzeugten **je eigene Shader** pro Material | doppelte Kompilierarbeit |
| **≈ 530 MB Texturspeicher** auch auf dem Smartphone (neun 2K-Holz-/Bodentexturen à ≈ 20 MB inkl. Mipmaps) | Speicherdruck, langsame Uploads, Tab-Abstürze in Safari möglich |
| Grundriss-SVG wurde bei **jedem** Pan-/Zoom-Ende und bei jedem Mausrad-Ereignis komplett neu erzeugt | ruckelnder Grundriss |
| Werkzeugleiste auf dem Smartphone breiter als der Bildschirm („Ansicht“ abgeschnitten), dadurch horizontal verschiebbare App (Sheets rutschten nach links) | auf schmalen Geräten kaum bedienbar |
| Unschärfe-Glas (`backdrop-filter`) über dem laufenden 3D-Bild | ganzflächiges Neu-Weichzeichnen bei jedem Bild auf Mobil-GPUs |
| Hover-Zustände „klebten“ nach dem Antippen, iOS zoomte beim Fokussieren von Eingabefeldern (< 16 px), Doppeltipp-Zoom-Verzögerung auf Bedienelementen | unruhige Touch-Bedienung |

**Messung** (gleiche Maschine, Software-GPU SwiftShader ohne parallele Shader-Kompilierung, Smartphone-Viewport, Stufe *Schnell* – absolute Zeiten sind auf echter Hardware um ein Vielfaches kürzer, die Verhältnisse gelten):

| | vorher | nachher |
|---|---|---|
| Laden bis zum ersten Bild | 19,5 s (nur das Ruhebild kompiliert) | **17,5 s** (alle Varianten vorkompiliert) |
| erstes Drehen / erste Begehung / erstes Abendlicht | +2,3 s / +9,1 s / +5,6 s Kompilier-Hänger | **keine** Szenen-Shader-Kompilierung mehr |
| Stilwechsel | 16,0 s | **6,2 s**; Rückwechsel auf eine besuchte Stilwelt **3,2 s** (Cache) |
| Texturspeicher Smartphone | ≈ 530 MB | **≈ 390 MB** (−140 MB) |

Die Bildausgabe ist unverändert (Vergleichsaufnahmen Tageslicht und Abend, Dollhouse und Begehung, alt ↔ neu bildgleich).

**Maßnahmen:**

| Maßnahme | Umsetzung |
|---|---|
| **Stabile Shader** | feste **Proxy-Licht-Slots** (`lighting.js`): die Leuchten der Wohnung bleiben unsichtbare Datenquellen, Position, Farbe, Reichweite, Kegel und Intensität werden in einen festen Satz Punkt-/Spot-/Flächenlichter kopiert; **ein** Umgebungs-Node (PMREM), dessen Textur zwischen Himmel und Raum-Lightprobe getauscht wird; Nebel immer aktiv (im Dollhouse mit 5–10 km Reichweite, also unsichtbar); die Sonne hat am Abend Intensität 0, statt ausgeblendet zu werden (den Bodenschatten im Dollhouse blendet die App dann aus). Lichtstimmung, Raum, Lightprobe und Kameramodus ändern nur noch Uniforms |
| **Ein Shader je Material** | Bewegtbild und Lightprobe rendern mit demselben AO-Kontext wie das SSAO-Ruhebild, lesen aber ein 1 × 1-Weiß-Ziel – der erzeugte Shader-Code ist identisch, jedes Material kompiliert ein beleuchtetes Programm statt zwei |
| **Shader-Vorkompilierung** | alle Varianten (Bewegtbild, Normal-Prepass mit dem vom SSAO geerbten Kontext, Lightprobe, auf Wunsch *Realistisch*) werden hinter Ladebildschirm bzw. Stilwechsel-Overlay **asynchron** kompiliert (WebGL 2: `KHR_parallel_shader_compile`, WebGPU: asynchrone Pipelines) – mit Decken, Außenraum, Himmel und Dollhouse-Boden und ohne Frustum-Culling. *Realistisch* und ein Qualitätswechsel kompilieren beim ersten Gebrauch ebenso asynchron (Statusanzeige „… wird vorbereitet“), statt einen eingefrorenen Frame zu erzeugen |
| **Stilwelt-Cache** | besuchte Stilwelten bleiben (abgehängt) auf der GPU: Schnell 2, Mittel 3, Hoch alle 4; ältere geben ihren Speicher frei |
| **Texturbudget** | Stufe *Schnell* (Smartphones) begrenzt Texturen auf 1024 px (Verkleinerung per `createImageBitmap` außerhalb des Hauptthreads) |
| **Bewegtbild auf Mobil-GPUs** | *Schnell* rendert in Bewegung ohne Bloom (teuerste Stufe, in Bewegung unsichtbar); die adaptive Auflösung greift schon unter 40 fps (vorher 28 fps) |
| **Bildratenunabhängige Dämpfung** | das Nachgleiten der Kamera ist auf 60-Hz-, 120-Hz-Displays und langsamen Telefonen gleich lang (vorher Zeitlupen-Nachlauf auf trägen Geräten) |
| **Himmel vorab** | der Tageslicht-Himmel lädt parallel zu den Materialien; die übrigen Himmel laden im Leerlauf nach (nicht bei *Datensparen*/2G) – Lichtstimmungswechsel ohne Wartezeit; solange ein Himmel noch lädt, pulsiert die Schaltfläche, bei schnellem Umschalten gewinnt die zuletzt gewählte Stimmung |
| **Grundriss ohne Neuaufbau** | Pan/Zoom/Pinch ändern nur die `viewBox` (einmal je Bildschirmbild), eine Auswahl nur eine CSS-Klasse, der Maßstabsbalken ist ein HTML-Overlay; Raumfokus und Zoom-Knöpfe mit weichem Übergang |
| **Touch-Oberfläche** | Blur-Glas auf Touch-Geräten durch deckende Flächen ersetzt; Hover nur mit echter Maus; Tipp-Feedback (leichtes Eindrücken); `touch-action: manipulation` (kein Doppeltipp-Zoom auf Knöpfen), keine Textauswahl/Callouts auf der App-Oberfläche; Eingabefelder ≥ 16 px (kein iOS-Zoom); Touch-Ziele ≥ 40–44 px; Überblendung der Overlays nur in der 3D-Ansicht statt am ganzen Dokument; Tipp-Erkennung über Ereignis-Zeitstempel (ein langer Frame zwischen Aufsetzen und Loslassen gilt nicht als langes Drücken); die Gesten-Hilfe verschwindet bei der ersten Berührung |
| **Start & Wiederbesuch** | `modulepreload` für die Engine-Module (paralleler statt gestufter Abruf), Web-Schriften blockieren das erste Bild nicht mehr, **Service Worker** (`sw.js`): `assets/` *cache first*, `vendor/` *stale-while-revalidate*, App-Code *network first* (online immer aktuell, offline lauffähig), **Web-App-Manifest** mit Symbolen |
| **Barrierefreiheit & Kleinigkeiten** | `aria-pressed` an allen Umschaltern, `aria-expanded` am Grundriss-Sheet; Kameraflüge und Übergänge respektieren *Bewegung reduzieren*; Doppelklick auf den Belichtungsregler setzt ihn zurück; Dialoge schließen per Tipp auf den abgedunkelten Hintergrund |

> **Service Worker und Asset-Änderungen:** Dateien unter `assets/` liefert der Service Worker dauerhaft vom Gerät. Wer dort eine Datei unter gleichem Namen ersetzt (z. B. neu gebackene Texturen), erhöht `VERSION` in `sw.js`; der neue Worker startet dann mit leerem Asset-Cache. Code, Styles und HTML sind davon nicht betroffen.

## Rendering

### Fotorealistisch: Pathtracing + KI-Entrauschung (neu)

Die Echtzeit-Techniken (SSAO, SSGI, SSR) sind Näherungen im Bildraum: Licht von außerhalb des Bildes fehlt, Spiegel zeigen nur, was ohnehin sichtbar ist, Innenräume wirken flach. Für Standbilder in Archviz-Qualität arbeitet die App deshalb **hybrid** – wie Enscape, Twinmotion oder D5: Die Kamera wird in Echtzeit (WebGPU) bewegt; sobald sie ruht, übernimmt ein **unverzerrter GPU-Pathtracer** und rechnet dieselbe Szene physikalisch korrekt.

| Schritt | Umsetzung (`src/engine/photo.js`) |
|---|---|
| Szenenabgleich | Proxy-Szene aus exakt dem, was der Rasterizer zeigt (Layer 0, sichtbare Meshes, instanzierte Bäume/Häuser expandiert); **dieselben** Geometrien, Materialien und Texturen – WebGPU- und WebGL-Build teilen sich einen three.js-Kern (`vendor/three-core-*.js`, esbuild-Code-Splitting) |
| Glas, Spiegel, Licht | Fensterglas als echte Transmission mit Fresnel-Spiegelung, Spiegel als ideale Metallfläche, alle Leuchten der Wohnung als physikalische Lichtquellen, Sonne + HDR-Himmel |
| **Sky-Portale** | je Außenfenster/Balkontür ein Flächenlicht in der Öffnung (für Kamerastrahlen unsichtbar) mit der kosinusgewichteten mittleren Himmelsleuchtdichte dieser Blickrichtung (aus dem HDR-Panorama, Weißabgleich für Innenräume); 70 % des Himmelslichts laufen über die direkt abgetasteten Portale, 30 % über das Environment – kein Doppelzählen, **um ein Vielfaches schnellere Konvergenz** in fensterbeleuchteten Räumen (Technik der Offline-Renderer V-Ray/Corona) |
| Licht-Auswahl | Next-Event-Estimation nur mit Lampen und Portalen des Kameraraums (+ offen verbundene Räume) statt aller 43 Lichtquellen |
| BVH | Aufbau im Web Worker (three-mesh-bvh), ≈ 640 k Dreiecke, blockiert die Oberfläche nicht |
| Pathtracing | three-gpu-pathtracer 0.0.24: Multiple Importance Sampling, 3–5 Bounces, Glossy-Filter gegen Fireflies, in Kacheln (2×2 bzw. 3×3) → jedes Einzelbild bleibt kurz, auch auf integrierter Grafik |
| Belichtung | Kamera-artige Matrixmessung (mittengewichteter log. Mittelwert des HDR-Akkumulators) nach 4/16/48 Samples; Belichtungsregler wirkt ohne Neustart |
| **KI-Entrauschung** | Intel **Open Image Denoise** (U-Net, oidn-web auf WebGPU) mit Albedo- und Normalen-Hilfsbildern: sauberes Bild nach 48 Samples, finale Entrauschung bei Erreichen des Sample-Budgets (Hoch 384 / Mittel 192 / Schnell 96) |
| Export | PNG-Export wartet im Modus *Fotorealistisch* auf das fertig entrauschte Bild; *PNG 2×* rechnet den Pathtracer in doppelter Auflösung |

Ohne WebGPU (reines WebGL 2) läuft der Pathtracer ebenfalls, nur ohne KI-Entrauschung (mehr Samples nötig).

### Behobene Darstellungsfehler (Update 09/2026)

| Fehler | Ursache | Behebung |
|---|---|---|
| Wandsäule 37 × 36 cm in der Diele vor der Bürotür (sichtbar als heller Streifen im Türblatt) | 1,6-cm-Versatzwand W29 fand keine Nachbarkontur → als 36-cm-Außenwand gebaut und um die Dicke von W28 verlängert | Versatzwände < 5 cm übernehmen die dünnere Nachbarwand, keine Eckverlängerung; Prüfskript: kein Wandkörper ragt in eine Raumkontur |
| WebGPU brach in manchen Chrome-Versionen bei der ersten Lightprobe ab (`createView … swizzle`) | three.js r186 sendet immer `swizzle: 'rgba'`; ältere Implementierungen erwarten ein Dictionary | Build-Patch in `tools/build-vendor.mjs`: Identitäts-Swizzle wird weggelassen |
| Vorhangpaket am rechten Fenster W06 ragte 8 cm in die Wand W07 | Paket symmetrisch 28 cm über die Laibung | Paket auf die Wandlänge begrenzt, Laibung bleibt bedeckt |
| Spiegel im Bad dunkelgrau | Lightprobe direkt vor dem schwarzen Heizkörper aufgenommen, nur 1–2 Lichtdurchgänge | Probe-Punkt mit Wandabstand, 3 (Schnell: 2) Lichtdurchgänge |
| Station „Schlafen“ blickte gegen die Schrankseite, „Blick zum Schrank“ stand im Lesesessel, „Bibliothekswand“ im Vorhang | Kamerapositionen | Stationen neu gesetzt |
| PNG 2× nur in einfacher Auflösung | `resize()` setzte die verdoppelte Pixel-Ratio sofort zurück | Exportfaktor wird in der Pixel-Ratio-Berechnung berücksichtigt |

### Engine: three.js WebGPU (r186) für die Echtzeitansicht

Der bisherige Weg (WebGL-Renderer + progressiver GPU-Pathtracer) war für die fotorealistische Ansicht zu langsam: BVH-Aufbau blockierte die Oberfläche, und ein rauschfreies Bild brauchte Hunderte Samples bei stillstehender Kamera. **Unreal Engine** wurde geprüft, ist für diese Web-Anwendung aber nicht einsetzbar: Der HTML5/WebGL-Export wurde mit UE 4.24 eingestellt, und *Pixel Streaming* benötigt einen dauerhaft laufenden GPU-Server, der das Bild als Video streamt – keine Offline-Nutzung, laufende Kosten, Latenz. Stattdessen nutzt die App die **WebGPU-Engine von three.js**, die dieselben Techniken wie moderne Game-Engines (vgl. Unreal Lumen/SSR/TAA) als Echtzeit-Nachbearbeitung im Browser bereitstellt:

| Darstellung | Pipeline (TSL-Nodes, `src/engine/render.js`) | Einsatz |
|---|---|---|
| **Standard** | Normal-Prepass → **SSAO** (entrauscht, halbe Auflösung) nur im Umgebungslicht (`builtinAOContext`) → Szenen-Pass mit **4× MSAA** (Hoch/Mittel) oder ohne MSAA (Schnell) → Bloom → SMAA; in Bewegung schlanke Variante ohne AO/MSAA | schnelles Planen, schwächere Geräte |
| **Realistisch** | Vier MRT-Renderziele (Farbe, Albedo/Metall, Normalen/Rauheit, Bewegungsvektoren) → **SSGI** (Screen-Space Global Illumination: Lichtbounce, Farbbluten, Kontaktschatten) → **SSR** (Spiegelungen auf Boden, Stein, Metall) → Bloom → **TRAA** (temporales Anti-Aliasing, 40/24/12 Konvergenzbilder nach Qualitätsstufe) | während der Kamerabewegung schnelle Vorschau, danach Konvergenz |

Gemeinsame Grundlagen:

- **PBR-Materialien** (automatisch in Node-Materialien übersetzt): `MeshPhysicalMaterial` nur wo eine physikalische Schicht wirkt (Sheen für Textilien, Clearcoat für Lack/Stein, IOR für Glas), sonst `MeshStandardMaterial` – identische Reflexion (F0 = 0,04 ≙ IOR 1,5) mit günstigerem Shader; CC0-Fotoscans (Poly Haven) und vorberechnete prozedurale Texturen.
- **Weiche Sonnenschatten** (PCF mit Abtastradius – `PCFSoftShadowMap` existiert in r186/WebGPU nicht mehr; Schattenkarte 3072/2048/1536 Pixel nach Qualitätsstufe, Frustum deckt die gesamte Plandiagonale ab). Die Dachplatte folgt der Gebäudekontur. Große, opake Möbel werfen gezielt Sonnenlichtschatten; kleine Dekoteile bleiben aus der Schattenkarte. AO/SSGI ergänzen den Möbelkontakt.
- **Geschlossene Wandhülle:** Die 9,9-cm-Rückführung zwischen Küchen-Trennwand und W08 ist als Wandstück modelliert, während die 1,57-m-Öffnung zwischen Küche und Wohnen offen bleibt. Unter Fenster-, Balkon- und Türöffnungen schließt ein massiver Wand-Sockel bis zur Unterkante der Bodenplatte; Wandenden, Unterseiten und obere Abschlüsse sind geschlossen. So scheinen weder Außenraum noch Himmel durch konstruktive Spalten.
- **Lokale Raum-Lightprobe:** In der Begehung wird der Raum um die Kamera in eine Cubemap mit 256 oder 128 Pixeln je Fläche aufgenommen – **nicht am Kamerastandort, sondern am nächstgelegenen Punkt mit ≥ 0,7 m Wandabstand** (vorher sah die Probe im Bad aus 17 cm Abstand fast nur den schwarzen Handtuchheizkörper, die Spiegel wirkten dunkelgrau). *Hoch/Mittel* berechnen drei Lichtdurchgänge, *Schnell* zwei; auf WebGPU liefert sie auch die Spiegelreflexion, auf WebGL 2 werden planare Spiegel während der Aufnahme ausgesetzt. Im Modus *Realistisch* ergänzt SSGI den Nahbereich.
- **Belichtungsautomatik:** log. Mittelwert der Leuchtdichte der Lightprobe (asynchrones GPU-Readback) → Zielwert der Lichtstimmung; der Belichtungsregler wirkt als Korrektur. Vor jeder Aufnahme (auch bei PNG-Export direkt nach Stationswechsel) wird zuerst das Licht-Budget des Zielraums aktiviert – sonst wurde z. B. das Bad mit den Leuchten des Vorraums gemessen und massiv überbelichtet.
- **Außenraum 3. OG mit Blick in den Park** (`builders/surroundings.js`, nur in der Begehung): Der Blick aus den Fenstern ist echte Geometrie statt eines Panoramafotos auf Straßenniveau – Parkrasen mit Kieswegen und Parkleuchten **9,28 m unter dem Fertigfußboden** (laut Plan „+9,28 OK FFB“), rund 150 Laubbäume (instanziert, 10–17 m hoch, spätsommerliche Grüntöne) mit freier Rasenfläche vor den Fensterfassaden, Eingangsstraße mit Gründerzeit-Häuserzeile, Stadtkante am Horizont, Luftperspektive ab 50 m. Das Gebäude selbst ist mit Erdgeschoss bis 2. OG, Geschossbändern, Fenstern und gestapelten Balkonen (je mit Kragplatte) darunter sowie dem 4. OG darüber modelliert. Die Himmel sind reine Himmelspanoramen ohne Bodenkulisse; ihre Sonnenscheibe wird automatisch vermessen (Schwerpunkt der Scheibe) und exakt auf die Richtung des Schattenwurfs gedreht (Abweichung < 0,5°), die Scheibe selbst wird im Umgebungslicht gekappt, damit die Sonne nicht doppelt wirkt.
- **Tiefenpuffer ohne Z-Fighting:** Keine zwei sichtbaren Flächen liegen koplanar. Das Geschossband des eigenen Geschosses in der Außenszene endet unter der Rohdecke (−8 cm statt ±0, vorher flackerte es in der Begehung flächig durch den Parkettboden); Rasen mit Polygon-Offset gegenüber Wegen, Vorplatz und Straße, sich kreuzende Parkwege auf getrennten Höhen. TV und Gemälde: Bildfläche, Passepartout und Rahmen liegen ≥ 2,5 mm auseinander (vorher 0,2–0,5 mm → Flackern des Fernsehbilds). Near-/Far-Ebene je Kameramodus (Dollhouse 0,25–200 m, Begehung 0,05–700 m): 5× feinerer Tiefenpuffer in der Übersicht, Stadtkante nicht mehr abgeschnitten.
- **Planare Spiegel:** Reflector-Knoten für alle Spiegel (Bad-Spiegelwände, Dielenspiegel) in der Begehung, gerendert nur wenn sichtbar; im Dollhouse Lightprobe-Spiegelung.
- **Lichtstimmungen:** *Tageslicht* (Sonne aus Südost, Himmel Poly Haven *Kloofendal 48d*; fensterlose Räume beleuchtet), *Goldene Stunde* (tief stehende Sonne, *Qwantani Late Afternoon*), *Abend* (Dämmerung, *Qwantani Dusk 2* (alle Leuchten, 2700 K, Bad 3000 K). Leuchtenwerte photometrisch (Lumen → Candela/Nits).

### Performance

| Maßnahme | Wirkung |
|---|---|
| **Rendern bei Bedarf** | Standard: nur bei Änderungen; Realistisch: schnelle Vorschau beim Bewegen, bis zur Konvergenz (40/24/12 Bilder für Hoch/Mittel/Schnell) im Stillstand, danach Ruhe – im Stillstand 0 Bilder/s |
| **Bildraten-Deckel** | höchstens ≈ 60 gerenderte Bilder/s, auch auf 120/144-Hz-Displays (Steuerung und Animation laufen weiter mit voller Rate) → spürbar weniger Leistungsaufnahme beim Bewegen |
| **Lastverteilung Lightprobe** | Aufnahme der Raum-Lightprobe nur im Stillstand und je Tick nur ein Schritt (eine Würfelseite oder die Vorfilterung, 21 Schritte für drei Lichtdurchgänge à 6 × 128² Pixel) → keine Lastspitze, auch nicht auf integrierter Grafik |
| **Pathtracer nur im Stillstand** | Beim Bewegen rendert ausschließlich die schlanke WebGPU-Pipeline; der Pathtracer startet erst nach 160 ms Ruhe, rechnet in Kacheln (Mittel: 3 × 3 → ≈ 1/9 Bild je Frame), stoppt bei der ersten Bewegung und legt die GPU nach Erreichen des Sample-Budgets still. Engine, BVH-Worker und Denoiser-Gewichte werden erst bei Bedarf geladen; die Texturatlas-Größe folgt der Qualitätsstufe (1024 / 640 / 512 px) |
| **Zusammengefasste Geometrie** (`scene.js`) | Statische, opake Möbel-, Fenster- und Türteile je Raum und Material zu einem Mesh vereint: ≈ 560 → ≈ 290 Draw-Calls in der Wohnung. Frustum-Culling und Front-to-Back-Sortierung bleiben je Raum erhalten; die Einzelobjekte liegen auf einem eigenen Layer nur für Auswahl, Hervorhebung und Grundriss |
| **Pixelbudget** | Zeichenpuffer höchstens 3,7 / 2,1 / 1,1 Megapixel (Hoch/Mittel/Schnell) – ein 4K-Bildschirm mit 150 % Skalierung rendert sonst 8,3 MP je Bild |
| **Automatische Qualitätsstufe** | nach GPU: integrierte Grafik (Intel Iris Xe/UHD wie im NUC 11–13, AMD-APUs, Apple M) → *Mittel*; dedizierte GPU → *Hoch*; Software-Renderer, Mali/Adreno/PowerVR und Smartphones → *Schnell*; Tablets (Touch, kürzere Bildschirmseite ≥ 700 px) → *Mittel*. Eine manuelle Wahl wird gespeichert |
| **Außenraum schlank** | Baumkronen mit 80 statt 320 Dreiecken je Blattballen (Park 420 k → 105 k Dreiecke) |
| **Zweistufige Qualität** | Standard in Bewegung ohne AO/MSAA (auf *Schnell* auch ohne Bloom), nach 160 ms Stillstand ein Bild mit AO; auf Schnell ohne 4× MSAA |
| **Statische Schatten** | Sonnen-Shadow-Map nur nach Szenen-, Stil-, Modus- oder Stimmungswechsel |
| **Licht-Budget** (`lighting.js`) | Feste Proxy-Slots (Punkt/Spot/Fläche 8/8/2, 5/5/1, 3/3/1 nach Qualitätsstufe), belegt mit den Leuchten des aktuellen Raums (Dollhouse: stärkste je Raum) – kein Lichtdurchschlag durch Wände, jeder Slot kostet eine BRDF-Auswertung je Pixel; die Slot-Objekte bleiben immer dieselben (stabile Shader, siehe *Tempo & Touch*) |
| **Adaptive Auflösung** | Pixel-Ratio sinkt stufenweise bei < 40 fps in Bewegung und steigt bei Reserve |
| **Halbe Auflösung für AO/SSR** | SSAO und SSR in halber Auflösung; Metall/Rauheit liegen in den Alphakanälen der 8-Bit-Albedo-/Normalenpuffer. Vier Renderziele halten das WebGPU-Basislimit ein. |
| **Vorberechnete Texturen** | prozedurale Texturen als WebP (3,7 MB), Dekodierung außerhalb des Hauptthreads |
| **Asynchrone Shader-Kompilierung** | alle Pass-Varianten vor dem ersten Bild bzw. hinter dem Stilwechsel-Overlay (siehe *Tempo & Touch*); WebGPU-Pipelines und WebGL-Programme werden über den Shader-Code geteilt und gecacht |

Qualitätsstufen *Hoch/Mittel/Schnell* steuern Pixel-Ratio (maximal 1,5/1,25/1) und Pixelbudget, Schattenauflösung, Licht-Slots, Raum-Lightprobe und die Sample-Zahlen von SSAO, SSGI und SSR.

## Profil für Intel NUC13ANKi5

Der NUC13ANKi5 verwendet einen Core i5-1340P (4 Performance- und 8 Efficient-Kerne, 16 Threads) und Iris Xe mit 80 Ausführungseinheiten; siehe [Intel-Produktbrief](https://download.intel.com/newsroom/2023/client-computing/Intel-NUC-13-Pro-Product-Brief.pdf). Die integrierte Grafik nutzt gemeinsamen Arbeitsspeicher. Als Ausgangspunkt die Qualitätsstufe **Mittel** verwenden.

- Der BVH-Aufbau läuft in einem wiederverwendeten Web Worker. Szenenaufbauten werden serialisiert; Kamerabewegungen und Stilwechsel entwerten alte Aufträge, statt konkurrierende Worker-Aufbauten auszulösen.
- Pathtracing startet nach Kameraruhe direkt. Es wartet nicht mehr auf die zusätzlichen Raster-Lightprobe-Pässe oder auf Echtzeit-GI-Konvergenz. Der letzte Rasterframe bleibt während der Vorbereitung sichtbar.
- Mittel begrenzt das Photobild auf etwa **1 Megapixel**, 4 × 4 Kacheln, 4 Bounces und 640-Pixel-Materialtexturen. Der hochauflösende PNG-Export behält seinen eigenen Skalierungsfaktor.
- OIDN lädt und kompiliert erst nach acht Samples. Während dieser Vorbereitung und während der Entrauschung pausiert Pathtracing, damit WebGL und WebGPU nicht gleichzeitig die Iris Xe beanspruchen.
- Belichtungsmessung liest den HDR-Puffer asynchron aus; unveränderte Lichtdaten werden nicht erneut auf die GPU übertragen. Ohne WebGPU endet das Rendering korrekt am Sample-Ziel ohne OIDN.

Das Betriebssystem und der Browser verteilen CPU-Arbeit auf P-/E-Kerne; JavaScript setzt keine Kern-Affinität. Kalte Shaderkompilierung verursacht weiterhin Startzeit. Ein direkter NUC-Hardwaretest wurde nicht durchgeführt.

Reproduzierbarer Vergleich: lokaler Server, Chrome headless/SwiftShader, 800 × 600, identische möblierte Szene, Station Bad, ein Sample, externe Netzaufrufe blockiert. Referenz-Renderer aus Commit 0ed7b95: **33,737 s**, geändert: **20,052 s** bis zum ersten Sample (ein Messpaar, rund **41 % kürzer**). Das ist ein Software-GPU-Vergleich, kein NUC-Benchmark; die Dollhouse-Kaltstartmessung zeigte keine belastbare Verbesserung. Wiederholen mit node tools/perf-photo.mjs --baseline und node tools/perf-photo.mjs, nacheinander.

## Automatische Planungsprüfung

`src/core/validate.js` prüft bei jedem Start und nach jedem Stilwechsel sämtliche Positionen der aktiven Stilwelt gegen die gemessene Geometrie:

| Prüfung | Kriterium |
|---|---|
| Raumkontur | jede Grundfläche liegt innerhalb der Innenkontur (Toleranz 1,2 cm für wandbündige Elemente) |
| Kollisionen | keine Überschneidung von Möbeln im selben Raum (SAT-Test) |
| Türen | 90 cm tiefe Bewegungsfläche vor jeder Tür beidseitig frei |
| Fenster / Balkontüren | 45 cm Zugang; Balkontüren vollständig frei, Fenster höchstens zur Hälfte verstellt |
| Ausrichtung | Sofa zur Medienwand, Bettfuß in den Raum, Schlafsofa vom Wandrücken weg |

Alle vier Stilwelten bestehen die aktuelle Geometrie- und Möbelbelegprüfung: 26/27/25/26 Möbelpositionen, keine fehlenden Produktbelege und keine Geometriefehler. node tools/catalog-check.mjs prüft dies automatisch. HYLTARP wird dabei geschlossen geprüft; der ausgeklappte Zustand benötigt gesonderte Freifläche.

`node tools/flow.mjs` spielt den UI-Ablauf im Desktop-Layout (1280 × 720) durch: alle Stilwelten, Fotorealistisch starten, Lichtstimmung, Dollhouse, zurück zu Standard. `node tools/touch.mjs` prüft die Touch-Bedienung im Smartphone-Hochformat mit echten Mehrfinger-Ereignissen (17 Prüfungen: Antippen → Detailkarte, Wegwischen, Doppeltippen im Dollhouse und in der Begehung, Pinch-Gehen, Umsehen, Sheets, Werkzeugleiste vollständig sichtbar, kein seitliches Verrutschen, Grundriss-Verschieben/-Pinch/-Doppeltippen/-Raumauswahl).

Ein Browser-Smoke-Test prüft zusätzlich alle vier Stilwelten, die geschlossene Wandrückführung, den Sockel unter einem Außenfenster, alle Fassadenabschnitte im 25-cm-Raster sowie die Modi Standard, Realistisch und Fotorealistisch (BVH-Aufbau + Samples). Bei laufendem Entwicklungsserver: `node tools/smoke.mjs` (lokal installiertes Chrome; ohne Chrome `CHANNEL=chromium node tools/smoke.mjs`).

## Maße und Genauigkeit

Die Raumkonturen stammen aus den Vektordaten des Ausführungsplans und sind auf drei Maßketten kalibriert (Arbeiten/Gäste-Breite 3,48 m, Innentür 0,885 m, Badtür 0,76 m). Raumhöhe 2,56 m, Türen 2,135 m, bodentiefe Fenster (BRH 0,00). Sanitärobjekte, Vorwände (Ablage 1,18 m) und Heizkörper folgen den Angaben des HLS-Plans. Die Wandstärken werden aus den Abständen benachbarter Raumkonturen abgeleitet; dünne Trennwände innerhalb eines Raums (z. B. die 10-cm-Wand zwischen Waschtrockner-Nische und WC-Vorwand im Bad) werden als solche erkannt und nicht als 36-cm-Außenwand gebaut. Fertigfußboden +9,28 m (3. OG), Geschosshöhe darunter 3,09 m.

> **Wichtig:** Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß und keine Fertigungsgrundlage. Vor Möbelkauf, Einbau oder Montage lichte Maße, Türanschläge, Heizkörper, Elektro- und Sanitäranschlüsse vor Ort prüfen – insbesondere die Spiegelmaße gegen die ausgeführten Vorwände und die Nischenmaße gegen den gewählten Waschtrockner.

## Export

- 3D-Ansicht als PNG und in doppelter Auflösung – im Modus *Realistisch* wird bis zur Konvergenz gewartet, im Modus *Fotorealistisch* bis zum fertig entrauschten Pathtracing-Bild; Dateiname enthält Stilwelt, Station und Darstellung (die 2×-Ausgabe verdoppelt jetzt tatsächlich die Auflösung – vorher setzte die Größenanpassung den Faktor sofort zurück)
- Grundriss mit Möblierung und Maßen als SVG · Druckansicht / PDF
- Wandmaße und Nettoabschnitte als CSV
- Möbelliste der aktiven Stilwelt als CSV
- Geometrie + Einrichtung als JSON

## Architektur

```text
.
├── index.html                    # App-Shell, Import-Map (three → vendor/three.webgpu.min.js, three/tsl), Modul-Preloads
├── manifest.webmanifest          # Web-App-Manifest (Installation auf dem Home-Bildschirm)
├── sw.js                         # Service Worker: Assets cache-first, vendor/ stale-while-revalidate, Code network-first
├── styles/app.css                # UI (Japandi-Designsprache, Geräteklassen, Sheets, Druckansicht, Stilwelt-Leiste)
├── src/
│   ├── main.js                   # Bootstrap, UI-Logik, Stilwechsel (Leiste + Tasten 1–4), Export
│   ├── core/geometry.js          # Planmaße → Meter, Wandrahmen, Wandstärken, Polygon-Utilities
│   ├── core/validate.js          # Planungsprüfung (Kontur, Kollision, Türen, Fenster, Ausrichtung)
│   ├── data/plan.js              # rekonstruierte Planvektoren (Quelle der Maßketten)
│   ├── data/products.js          # recherchierte Artikel, Maße, Ausführungen, Mengen, Platzierung
│   ├── data/styles.js            # vier Stilwelten, Luxus-Prinzipien, gemeinsame Raumtexte
│   ├── data/design.js            # gemeinsamer Bestand (Küche, Bäder nach HLS-Plan, HWR, Diele) + Stil-Möblierung
│   ├── engine/
│   │   ├── viewer.js             # WebGPU-Renderer, Render-Modi, Shader-Vorkompilierung, Lightprobe, Belichtung, Spiegel,
│   │   │                         # Kameras, Stimmungen, Gesten (Tippen, Doppeltippen, Pinch-/Mausrad-Gehen)
│   │   ├── render.js             # TSL-Pipelines: Standard (SSAO, MSAA, SMAA) und Realistisch (SSGI, SSR, TRAA)
│   │   ├── photo.js              # Fotorealistisch: Pathtracer, Sky-Portale, Belichtung, KI-Entrauschung (OIDN)
│   │   ├── lighting.js           # Licht-Budget je Raum (feste Proxy-Slots, fensterlose Räume)
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
│   ├── ui/layout.js              # Geräteklasse/Eingabeart, Bottom-Sheets (Wischgesten), Joystick, Vollbild, Umhängen der Bedienelemente
│   └── ui/plan2d.js              # SVG-Grundriss (Maus, Touch, Pinch-Zoom, Doppeltippen, Maßstabsbalken – ohne Neuaufbau beim Zoomen)
├── vendor/                       # three.js r186 (WebGPU + TSL, gemeinsamer Kern), Add-ons, Pathtracer-Bundle,
│                                 # BVH-Worker (lokal, offline, versionsfest)
├── assets/                       # CC0-Assets (lib/), OIDN-Gewichte (lib/oidn/), App-Symbole (icons/), Ausführungsplan (PDF), Moodboards
└── tools/
    ├── build-vendor.mjs          # erzeugt vendor/ aus npm-Paketen (esbuild; auch unter Windows)
    ├── smoke.mjs                 # Browserprüfung aller Stile, Wandhülle und aller drei Render-Modi
    ├── catalog-check.mjs         # Möbelbelege und Geometrie aller vier Stilwelten
    ├── perf-photo.mjs            # vergleichbarer Startzeit-Benchmark
    ├── research-docs.mjs         # Produkttabelle aus products.js regenerieren
    ├── flow.mjs                  # UI-Ablauf: Stilwechsel, Fotorealistisch starten/stoppen, Stimmung, Dollhouse
    ├── touch.mjs                 # Touch-Regressionstest (Smartphone): Tippen, Doppeltippen, Pinch, Sheets, Grundriss
    ├── shot.mjs · probe.mjs      # Screenshots von Stationen bzw. frei gewählten Kameras (headless)
    ├── pathtracer-entry.js       # Einstieg des Pathtracer-Bundles
    ├── bake-textures.mjs · bake.html
    └── fetch-assets.py
```

### Abhängigkeiten neu erzeugen

```bash
cd tools && npm install && node build-vendor.mjs   # vendor/ (three.webgpu.min.js + three-core-*.js, three.tsl.min.js, three-addons.js, pathtracer.js, generateMeshBVH.worker.js)
python3 tools/fetch-assets.py                      # assets/lib/
cd tools && npx playwright install chromium && node bake-textures.mjs   # assets/lib/textures/baked/
```

Nach Änderungen an einem Textur-Generator (`PROCEDURAL` in `src/engine/materials.js`) die Texturen neu backen – sonst lädt die App die alten Dateien.

### Neue Stilwelt anlegen

Ein Eintrag in `STYLES` (`src/data/styles.js`) genügt: `theme`, `wallOverride`, `decor`, Texte (`palette`, `materials`, `walls`, `lightPlan`, `notes`) und `furnish(ctx)` mit den Raum-Helfern `living`, `dining`, `bedroom`, `office` (inkl. `library`). Die Stilwelt-Leiste und Taste 5 ff. entstehen automatisch; die Planungsprüfung zeigt sofort, ob alles passt.

## Quellen der Produkt- und Gestaltungsrecherche (09/2026)

- Vollständige Möbel-Primärquellen: [Produktrecherche](docs/PRODUCT_RESEARCH.md). Die folgenden Gestaltungsquellen dienen der Architektur und Dekoration; ihr Sortiment ersetzt nicht den verbindlichen Möbelkatalog.
- Westwing Collection: [Markenseite](https://www.westwing.de/brands/westwing-collection/), [Neuheiten](https://www.westwing.de/new-products/), [TV-Lowboard Zumi](https://www.westwing.ch/zumi-lowboard-oak-marble-top-en-26wes55818.html), [Esstisch Sahra](https://www.westwing.de/runder-esstisch-sahra-o-116-cm-152091.html), [Esstisch Abby](https://www.westwing.de/runder-marmor-esstisch-abby-o-120-cm-158095.html), [Pendel Helen](https://www.westwing.ch/helen-pendant-light-terracotta-d38cm-en-26wes87525.html)
- IKEA: [Neuheiten](https://www.ikea.com/de/de/new/new-products/), [BJÖRKÖVIKEN Tür braun gebeiztes Eichenfurnier 60 × 64](https://www.ikea.com/de/de/p/bjoerkoeviken-tuer-braun-gebeiztes-eichenfurnier-70490948/)
- Gestaltung: [Homes & Gardens – Storage that looks expensive (2026)](https://www.homesandgardens.com/interior-design/what-storage-makes-a-house-look-expensive-in-2026), [House of Nuances – Quiet Luxury 2026](https://houseofnuances.com/blog/quiet-luxury-interior-design), [Finest Furniture Studio – Luxury ideas 2026](https://finestfurniturestudio.co.uk/luxury-interior-design-ideas/)
- Wandflächen und Dekoration: [Westwing – Luxus Wohnen](https://www.westwing.de/inspiration/einrichten/wohnung-einrichten/luxus-wohnen/), [Westwing – Wanddeko im Wohnzimmer](https://www.westwing.de/inspiration/deko-ideen/wandgestaltung-dekorieren/wanddeko-im-wohnzimmer/), [IKEA – Wandgestaltungsideen](https://www.ikea.com/de/de/rooms/living-room/how-to/living-room-wall-decor-ideas-for-your-home-pub454dbe30/). Umgesetzt als einzelne starke Akzentwand je Zone, großformatige Kunst, gezielte Leuchten und gruppierte Accessoires.
- Wandgestaltung 2026: [Decorfin – Modern luxury wall finishes](https://decorfinusa.com/2026/06/24/12-aesthetic-modern-luxury-wall-finishes/), [House of Nuances – Quiet Luxury 2026](https://houseofnuances.com/blog/quiet-luxury-interior-design), [Wall panelling trends 2026](https://homelydesignstudio.com/2026/04/22/10-must-try-wall-panel-designs-that-will-dominate-modern-interiors-in-2026/), [Luxury interior lighting guide 2026](https://luxehomedecore.com/luxury-interior-lighting-guide/), [Westwing – Wandleuchten](https://www.westwing.de/wandleuchten/). Umgesetzt als Wandfelder in Wandweiß (Relief statt Farbe), Galerielicht über der Kunst und Vorhangvouten mit indirektem Licht.
- Pathtracing: [three-gpu-pathtracer](https://github.com/gkjohnson/three-gpu-pathtracer), [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh), [oidn-web](https://github.com/pissang/oidn-web) (Intel Open Image Denoise, Gewichte [RenderKit/oidn-weights](https://github.com/RenderKit/oidn-weights))
- Rendering: three.js r186 – [SSGI](https://threejs.org/examples/webgpu_postprocessing_ssgi.html), [SSR](https://threejs.org/examples/webgpu_postprocessing_ssr.html), [TRAA](https://threejs.org/examples/webgpu_postprocessing_traa.html), [AO](https://threejs.org/examples/webgpu_postprocessing_ao.html)

## Lizenzen

- three.js: MIT (siehe `vendor/LICENSE.three.txt`)
- three-gpu-pathtracer, three-mesh-bvh, oidn-web: MIT (siehe `vendor/LICENSE.*.txt`); Open-Image-Denoise-Gewichte: Apache 2.0 (Intel RenderKit)
- Texturen, HDRIs und Modelle: [Poly Haven](https://polyhaven.com), CC0
- Schriften: Cormorant Garamond, Jost (Google Fonts, OFL)
- Westwing, IKEA, Laufen, Villeroy & Boch, Duravit und genannte Produktnamen sind Marken der jeweiligen Inhaber; die Modelle sind vereinfachte Nachbildungen zu Planungszwecken.
