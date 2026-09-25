# WE 13 · Virtuelles Raumatelier

Interaktives Maß-, Möblierungs- und 3D-Modell der Wohnung WE 13 am Täubchenweg 62–64 in Leipzig. Die Anwendung verbindet die aus dem Architektenplan rekonstruierte Raumgeometrie mit einem luxuriösen **Japandi / Refined-Brutalism**-Konzept in Eiche, Marmor, Kupfer und Salbei.

## Schnellstart

Die Anwendung benötigt keinen Build-Schritt und keine Installation:

```bash
python3 -m http.server 8000
```

Danach <http://localhost:8000> öffnen. `index.html` kann auch direkt im Browser geöffnet werden; ein lokaler Webserver ist für reproduzierbares Verhalten dennoch empfehlenswert.

## Ansichten

1. **Grundriss** – interaktive Raumkonturen, Flächen und Öffnungen
2. **Wandmaße** – einzelne Wandflächen mit Quellen- und Prüfstatus
3. **Nettoabschnitte** – tatsächlich nutzbare Wandstrecken nach Abzug der Öffnungen
4. **Einrichtung** – maßstäbliche Möbel, Materialfarben und reservierte Bewegungsflächen
5. **3D-Modell** – hardwarebeschleunigte WebGL-Szene mit Schatten, Materialtexturen, Raumfilter und steuerbarer Kamera
6. **Renderings** – kuratierte fotorealistische Stilvisualisierungen

Im 3D-Modell lässt sich die Kamera mit Ziehen drehen, mit `Umschalt` + Ziehen verschieben und mit dem Mausrad zoomen. Über den Inspector können Schnittwände, Raumlabels, Möblierung, Bewegungsflächen und das ausgeklappte Doppel-Gästebett geschaltet werden.

## Einrichtungskonzept

- **Wohnen:** Westwing-inspirierte Polstermöbel, Marmor-Couchtisch, Salbei-Akzente und ein wandhängender Samsung The Frame über einem IKEA BESTÅ Lowboard.
- **Essen:** nach rechts versetzte Vierergruppe mit Marmorplatte, Kupfergestell und Westwing Ulrica Stühlen; ein geschlossenes BESTÅ-Sideboard schafft zusätzlichen Stauraum.
- **Arbeiten / Gäste:** Schreibtisch am seitlichen Tageslicht, IKEA EKET und ein kompaktes Doppel-Schlafsofa mit ca. 140 × 200 cm Liegefläche.
- **Schlafen:** 180-cm-Bett, fünfteiliger IKEA PAX, Marmor-Nachttische und ein salbeifarbener Lesesessel.
- **HWR:** zwei robuste IKEA BROR-Regale für Vorräte, Haushaltsgeräte und Boxen.
- **Boden:** texturierte Eichendielen mit 1,90 m Dielenlänge; die Breite von 20 cm ist eine Entwurfsannahme.

Produktnamen beschreiben die gestalterische Produktempfehlung beziehungsweise Größenklasse. Verfügbarkeit, exakte Varianten, Preise, Liefermaße und Montageabstände sind vor Bestellung beim Hersteller zu prüfen.

## Maße und Genauigkeit

Die Raumkonturen wurden aus den Vektordaten des beigefügten Ausführungsplans rekonstruiert und anhand mehrerer bekannter Maßketten kalibriert. Die Anwendung unterscheidet zwischen Planflächen, Wohnflächenberechnung und Modellflächen und dokumentiert Abweichungen im Dialog **Maßgrundlage**.

> **Wichtig:** Das Modell ist ein Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß und keine freigegebene Fertigungsgrundlage. Vor Möbelkauf, Küchenbau oder Montage sind lichte Maße, Türanschläge, Heizkörper, Elektroanschlüsse und Bautoleranzen vor Ort zu prüfen.

## Export

Über **Exportieren** stehen folgende Formate zur Verfügung:

- aktueller Grundriss als SVG
- aktuelle 3D-Ansicht als PNG
- Wand- und Nettoabschnitte als CSV
- Geometriedaten als JSON
- Druckansicht / PDF über den Browser

## Projektstruktur

```text
.
├── index.html                         # Anwendung, Geometriedaten und lokale WebGL-Engine
├── README.md                          # Projektdokumentation
└── assets/
    ├── TWL62-64_WE 13_...pdf          # technischer Ausgangsplan
    ├── Moodboard ...png               # Stilreferenzen
    ├── Farben neu.png                 # Farbwelt
    └── kitchen-reference.png          # Referenz der vorhandenen Küche
```

Die WebGL-Engine und wesentliche Bildressourcen sind in `index.html` eingebettet. Dadurch bleibt die Präsentation offline nutzbar und ist nicht von externen CDNs abhängig.

## Browser

Empfohlen werden aktuelle Versionen von Chrome, Edge, Firefox oder Safari mit aktiviertem WebGL 2. Bei deaktivierter Hardwarebeschleunigung bleiben Grundriss, Maßansichten, Möblierungsplan und Exporte weiterhin nutzbar; die 3D-Darstellung kann jedoch eingeschränkt sein.
