// Verified retailer catalogue for WE 13 (research 2026-09-28, product pages of westwing.de and
// ikea.com/de read directly: name, SKU colour, manufacturer dimensions, availability "InStock").
// Dimensions: [width, depth, height] in metres; round pieces: [Ø, Ø, height].
//
// Every style world selects its pieces per slot in STYLE_PRODUCTS. The 3D models in styles.js are
// parametric reproductions built from exactly these dimensions and finishes – a theme can never
// recolour a purchased product into a fictitious variant.
const CHECKED = '2026-09-28';
const ww = (name, size, path, finish, extra = {}) => ({ retailer: 'Westwing', name, size, url: `https://www.westwing.de/${path}.html`, finish, checked: CHECKED, ...extra });
const ikea = (name, size, path, finish, extra = {}) => ({ retailer: 'IKEA', name, size, url: `https://www.ikea.com/de/de/p/${path}/`, finish, checked: CHECKED, ...extra });

export const PRODUCTS = {
  // ------------------------------------------------------------------ sofas & lounge chairs
  albaGrey: ww('Sofa Alba (3-Sitzer), Nierenform', [2.35, 1.14, 0.69], '3-seater-sofa-alba-grey-174231', 'Bouclé Grau, Füße Schwarz matt; Sitzhöhe 43 cm, Sitztiefe 65/86 cm'),
  melvaOffWhite: ww('Sofa Melva (3-Sitzer)', [2.38, 1.01, 0.75], 'sofa-melva-3-sitzer-156176', 'Webstoff Off White, Füße Schwarz matt; Sitzhöhe 45 cm, Armlehnen H 58 cm'),
  lennonBoucle: ww('Modulares Sofa Lennon (3-Sitzer) aus Bouclé', [2.38, 1.19, 0.68], 'modulares-sofa-lennon-3-sitzer-aus-boucle-156383', 'Bouclé Greige, Füße Schwarz; Sitzhöhe 43 cm, Armlehnen 32 cm breit'),
  lennonLinen: ww('Modulares Sofa Lennon (3-Sitzer) aus Leinen-Mix', [2.38, 1.19, 0.68], 'modulares-sofa-lennon-3-sitzer-in-leinen-optik-164221', 'Leinen-Mix Grau, Füße Schwarz; Sitzhöhe 43 cm, Armlehnen 32 cm breit'),
  mikkelOffWhite: ww('Bouclé-Loungesessel Mikkel', [0.66, 0.77, 0.79], 'boucle-loungesessel-mikkel-158924', 'Bouclé Off White, Gestell Dunkles Holz; Sitzhöhe 46 cm, Armlehnen H 58 cm'),
  mikkelGreen: ww('Loungesessel Mikkel', [0.66, 0.77, 0.79], 'xx-de-25wes51406', 'Webstoff Dunkelgrün (Leinen-Mix), Gestell Dunkles Holz; Sitzhöhe 46 cm'),
  rae: ww('Eichenholz-Loungesessel Rae', [0.90, 0.81, 0.77], 'rae-en-25wes99666', 'Bezug Taupe, Gestell Dunkles Eichenholz; Sitzhöhe 42 cm, Armlehnen H 60 cm'),
  ekenaset: { ...ikea('EKENÄSET Sessel', [0.64, 0.78, 0.76], 'x', 'Eiche/Gunnared Beige; Sitzhöhe 45 cm'), url: 'https://www.ikea.com/de/en/p/ekenaeset-armchair-oak-gunnared-beige-60506898/' },

  // ------------------------------------------------------------------ coffee & side tables
  alys: ww('Großer Marmor-Couchtisch Alys', [1.2, 0.75, 0.35], 'marmor-couchtisch-alys-117459', 'Marmor weiß, glänzend; Gestell Metall goldfarben matt; Platte 17 mm'),
  alysSide: ww('Runder Marmor-Beistelltisch Alys', [0.4, 0.4, 0.5], 'runder-marmor-beistelltisch-alys-95163', 'Marmor weiß, glänzend; Gestell Metall goldfarben matt'),
  distinct: ww('Travertin-Couchtisch Distinct mit zwei Tischplatten (Ferm Living)', [1.0, 0.55, 0.35], 'travertin-couchtisch-distinct-mit-zwei-tischplatten-165645', 'Travertin Beige, zwei Plattenhöhen'),
  marisaTravSide: ww('Runder Beistelltisch Marisa aus Travertin', [0.35, 0.35, 0.5], 'runder-beistelltisch-marisa-aus-travertin-147375', 'Travertin Beige'),
  naida: ww('Couchtisch Naida aus Eichenholz und Marmor', [1.42, 0.6, 0.35], 'naida-fsc-coffee-table-w370-x-h600-x-l1470-mm-black-marble-black-oak-en-25wes18259', 'Marmor Schwarz, Wangen Eiche schwarz'),
  andrew: ww('Runde Couchtische Andrew aus Mangoholz, 2er-Set', [0.9, 0.9, 0.35], 'couchtisch-2er-set-andrew-aus-schwarzem-mangoholz-111011', 'Mangoholz schwarz lackiert, Gestell Metall schwarz matt; Ø 90 × 35 und Ø 72 × 31 cm'),

  // ------------------------------------------------------------------ media / storage
  calaryTvBrown: ww('TV-Board Calary mit geriffelter Front', [1.8, 0.4, 0.55], 'xl-lowboard-calary-mit-geriffelter-front-in-braun-171110', 'Dunkles Eichenholz, geriffelte Front, Griffe Schwarz; Beine 27 cm'),
  calaryTvBlack: ww('TV-Lowboard Calary mit geriffelter Front', [1.8, 0.4, 0.55], 'xl-lowboard-calary-mit-geriffelter-front-in-schwarz-171111', 'Schwarz matt (Eichenfurnier), geriffelte Front; Beine 27 cm'),
  zumiTv: ww('Holz-TV-Lowboard Zumi mit Travertinplatte', [1.8, 0.45, 0.55], 'zumi-lowboard-oak-marble-top-en-26wes55818', 'Helles Holz, Platte Travertin Beige, Griffe goldfarben; Füße 25 cm'),
  elonaXL: ww('Großes Lowboard Elona', [2.2, 0.46, 0.55], 'fsc-elona-lowboard-xl-220x46x55cm-black-en-25wes97729', 'Schwarz matt; Füße 20 cm'),
  calarySideDark: ww('Sideboard Calary mit geriffelter Front', [1.6, 0.45, 0.75], 'holz-sideboard-calary-mit-geriffelter-front-147950', 'Dunkles Eichenholz, geriffelte Schiebetüren, Griffe Schwarz; Beine 17 cm'),
  calarySideBlack: ww('Sideboard Calary mit geriffelter Front', [1.6, 0.45, 0.75], 'holz-sideboard-calary-mit-geriffelter-front-137254', 'Schwarz matt, geriffelte Schiebetüren; Beine 17 cm'),
  zumiSide: ww('Holz-Sideboard Zumi mit Travertinplatte', [1.6, 0.45, 0.75], 'holz-sideboard-zumi-mit-abgerundeten-ecken-und-travertinplatte-159345', 'Helles Eichenholz, Platte Travertin Beige, Griffe goldfarben; Füße 20 cm'),
  chandlerSide: ww('Sideboard Chandler aus Eichenholz', [1.65, 0.43, 0.75], 'handgefertigtes-sideboard-chandler-aus-massivem-eichenholz-159331', 'Massives Eichenholz, dunkel lackiert; Füße 20 cm'),
  rudsta: ikea('RUDSTA Vitrine', [0.8, 0.37, 1.2], 'rudsta-vitrine-anthrazit-50450137', 'Anthrazit; Stahl, Glasfront, Glasseiten und Glasböden'),

  // ------------------------------------------------------------------ dining
  noam: ww('Runder Esstisch Noam mit Marmor-Tischplatte, Ø 120 cm', [1.2, 1.2, 0.76], 'runder-esstisch-noam-mit-marmor-tischplatte-o-120-cm-163551', 'Marmor Hellbeige marmoriert; Säulenfuß Metall gebürstet Ø 30'),
  sculpt: ww('Runder Esstisch Sculpt mit Travertin-Tischplatte, Ø 110 cm', [1.1, 1.1, 0.73], 'runder-esstisch-sculpt-mit-travertin-tischplatte-o-110-cm-162752', 'Travertin Beige 3 cm; skulpturaler Fuß Mangoholz dunkel Ø 56'),
  nelly: ww('Runder Esstisch Nelly mit Rillenstruktur, Ø 115 cm', [1.15, 1.15, 0.75], 'runder-esstisch-nelly-mit-rillenstruktur-in-verschiedenen-groessen-163520', 'Dunkles Eichenholz; kannelierter Säulenfuß'),
  yumi: ww('Runder Esstisch Yumi aus Eichenholz, Ø 115 cm', [1.15, 1.15, 0.74], 'runder-esstisch-yumi-20371', 'Helles Holz (Eichenfurnier), Beine Eiche'),
  pedraBeige: ww('Runder Esstisch Pedra, Ø 152 cm (Gallery Direct)', [1.52, 1.52, 0.75], 'pedra-round-dining-tble-travertine-en-25gae90766', 'Beton glasfaserverstärkt, Hellbeige; monolithischer Säulenfuß, 171 kg'),
  pedraGrey: ww('Runder Esstisch Pedra, Ø 152 cm (Gallery Direct)', [1.52, 1.52, 0.75], 'pedra-round-dining-table-linen-en-25gae48983', 'Beton glasfaserverstärkt, Hellgrau; monolithischer Säulenfuß, 171 kg'),
  tavolo: ww('Runder Esstisch Tavolo a Dischi, Ø 150 cm (GUBI)', [1.5, 1.5, 0.74], 'tavolo-a-dischi-dining-table-round-o150-veneer-base-american-walnut-high-gloss-lacquered-base-top-american-walnut-high-gloss-lacquered-en-26gub19305', 'Amerikanisches Walnussfurnier, hochglanzlackiert; Fuß aus gestapelten Scheiben'),
  celia: ww('Bouclé-Armlehnstuhl Celia', [0.61, 0.59, 0.8], 'boucle-armlehnstuhl-celia-164171', 'Bouclé Hellbeige, Beine Schwarz matt; Sitzhöhe 48 cm'),
  imaraOffWhite: ww('Polsterstuhl Imara aus Eichenholz', [0.51, 0.48, 0.8], 'imara-chair-dark-brown-wood-color-oak-ote-chacha-140-beige-en-25wes68918', 'Bezug Off White, Gestell Dunkles Holz; Sitzhöhe 48 cm'),
  imaraOlive: ww('Polsterstuhl Imara aus Eichenholz', [0.51, 0.48, 0.8], 'imara-chair-dark-brown-wood-color-oak-ote-chacha-371-dark-green-en-25wes61212', 'Bezug Olivgrün, Gestell Dunkles Holz; Sitzhöhe 48 cm'),
  kris: ww('Teddy-Bouclé-Polsterstuhl Kris', [0.56, 0.54, 0.78], 'kris_ote-wales-170-taupe-brown-wood-en-25wes24130', 'Teddy-Bouclé Nougat, Beine Dunkles Holz; Sitzhöhe 46 cm'),

  // ------------------------------------------------------------------ lighting
  rim: ww('Große LED-Pendelleuchte Rim (Maytoni)', [0.8, 0.8, 0.1], 'large-led-pendant-rim-en-26may57311', 'Messing, Aluminium; Abhängung 10–120 cm'),
  elettra: ww('Große LED-Pendelleuchte Elettra (Nova Luce)', [1.2, 0.02, 0.02], 'pendelleuchte-elettra-133187', 'Schwarz, Diffusor Weiß; Abhängung bis 150 cm'),
  level: ww('Pendelleuchte Level', [0.53, 0.53, 0.2], 'dimmbare-pendelleuchte-level-135813', 'Metall Schwarz, dimmbar; Abhängung bis 150 cm'),
  hamilton: ww('Große Pendelleuchte Hamilton', [0.81, 0.15, 0.13], 'pendelleuchte-hamilton-in-bernsteinfarben-127737', 'Glasschirme bernsteinfarben Ø 15, Baldachin goldfarben'),
  antic: ww('Kleine Pendelleuchte Antic (Maytoni)', [0.1, 0.1, 0.38], 'kleine-pendelleuchte-antic-160856', 'Glas Greige transparent, Baldachin/Dekor goldfarben'),
  paris: ww('Kleine Pendelleuchte Paris (House Nordic)', [0.06, 0.06, 0.28], 'kleine-pendelleuchte-paris-in-schwarz-146806', 'Stahl Schwarz'),
  bun: ww('Stehlampe Bun mit Marmorfuß', [0.4, 0.4, 1.53], 'bun-floor-lamp-brown-en-25wes95914', 'Marmorfuß Braun Ø 20 × 28, Gestell goldfarben, Schirm Weiß Ø 40'),
  kayaBeige: ww('Stehlampe Kaya mit Betonfuß', [0.45, 0.45, 1.56], 'stehlampe-kaya-mit-betonfuss-159695', 'Betonfuß Beige Ø 19, Schirm Cremeweiß Ø 45 × 36'),
  kayaAnthracite: ww('Stehlampe Kaya mit Betonfuß', [0.45, 0.45, 1.56], 'stehlampe-kaya-mit-betonfuss-145841', 'Betonfuß Anthrazit Ø 19, Schirm Cremeweiß Ø 45 × 36'),
  neron: ww('Große Leselampe Neron', [0.3, 1.05, 1.71], 'stehlampe-neron-122121', 'Metall Schwarz matt, Innenseite Schirm Messing; Sockel Ø 30, Ausladung 105 cm'),

  // ------------------------------------------------------------------ rugs
  amaroGreyXL: ww('Handgewebter Wollteppich Amaro, 300 × 400 cm', [3.0, 4.0, 0.01], 'handgewebter-wollteppich-amaro-161991', 'Hellbeige/Grau, 67 % Wolle, 33 % Baumwolle, Größe XL'),
  amaroCreamXL: ww('Handgewebter Wollteppich Amaro, 300 × 400 cm', [3.0, 4.0, 0.01], 'handgewebter-wollteppich-amaro-118190', 'Hellbeige/Cremeweiß, 67 % Wolle, 33 % Baumwolle, Größe XL'),
  amaroBrownL: ww('Handgewebter Wollteppich Amaro, 200 × 300 cm', [2.0, 3.0, 0.01], 'handgewebter-wollteppich-amaro-161988', 'Hellbeige/Hellbraun, 67 % Wolle, 33 % Baumwolle, Größe L'),
  amaroCreamS: ww('Handgewebter Wollteppich Amaro, 120 × 180 cm', [1.8, 1.2, 0.01], 'handgewebter-wollteppich-amaro-118190', 'Hellbeige/Cremeweiß, Wolle/Baumwolle, Größe S'),
  amaroGreyS: ww('Handgewebter Wollteppich Amaro, 120 × 180 cm', [1.8, 1.2, 0.01], 'handgewebter-wollteppich-amaro-161991', 'Hellbeige/Grau, Wolle/Baumwolle, Größe S'),
  janeTaupeXL: ww('Handgewebter Viskoseteppich Jane, 300 × 400 cm', [3.0, 4.0, 0.01], 'handgewebter-viskoseteppich-jane-96965', 'Taupe, 100 % Viskose, Größe XL'),
  janeLightGreyXL: ww('Handgewebter Viskoseteppich Jane, 300 × 400 cm', [3.0, 4.0, 0.01], 'handgewebter-viskoseteppich-jane-115279', 'Hellgrau, 100 % Viskose, Größe XL'),
  janeTaupeL: ww('Handgewebter Viskoseteppich Jane, 200 × 300 cm', [2.0, 3.0, 0.01], 'handgewebter-viskoseteppich-jane-96965', 'Taupe, 100 % Viskose, Größe L'),
  janeGreyL: ww('Handgewebter Viskoseteppich Jane, 200 × 300 cm', [2.0, 3.0, 0.01], 'handgewebter-viskoseteppich-jane-115280', 'Grau, 100 % Viskose, Größe L'),
  janeSageL: ww('Handgewebter Viskoseteppich Jane, 200 × 300 cm', [2.0, 3.0, 0.01], 'handgewebter-viskoseteppich-jane-96969', 'Salbeigrün, 100 % Viskose, Größe L'),
  janeTaupeS: ww('Handgewebter Viskoseteppich Jane, 120 × 180 cm', [1.8, 1.2, 0.01], 'handgewebter-viskoseteppich-jane-96965', 'Taupe, 100 % Viskose, Größe S'),

  // ------------------------------------------------------------------ sleeping
  dreamGrey: ww('Polsterbett Dream, Liegefläche 180 × 200 cm', [1.96, 2.22, 1.1], 'polsterbett-dream-111759', 'Webstoff Hellgrau; Kopfteil H 110 / T 14 cm; Lattenrost/Matratze separat'),
  dreamAnthracite: ww('Polsterbett Dream, Liegefläche 180 × 200 cm', [1.96, 2.22, 1.1], 'polsterbett-dream-111776', 'Webstoff Anthrazit; Kopfteil H 110 / T 14 cm; Lattenrost/Matratze separat'),
  archeTaupe: ww('Polsterbett Arche mit Schubladen, Liegefläche 180 × 200 cm', [2.0, 2.18, 1.03], 'polsterbett-arche-mit-stauraum-163543', 'Webstoff Taupe; Kopfteil H 103 / T 10 cm, zwei Schubladen'),
  sato: ww('Holzbett Sato mit Schubladen und Kopfteil, Liegefläche 180 × 200 cm', [2.27, 2.06, 0.9], 'holzbett-sato-mit-stauraum-und-kopfteil-157969', 'Dunkles Eichenholz (Furnier); Kopfteil H 90 cm, Stauraumhöhe 16 cm'),
  calaryNight: ww('Nachttisch Calary mit geriffelter Front', [0.45, 0.45, 0.5], 'calary-nightstand-dark-brown-en-26wes83972', 'Dunkles Holz (Eichenfurnier), rund, Knäufe gebürstet'),
  calaryWallNight: ww('Wandnachttisch Calary mit geriffelter Front', [0.4, 0.26, 0.3], 'holz-nachttisch-calary-mit-geriffelter-front-147957', 'Dunkles Holz (Eichenfurnier), Griff Schwarz; wandhängend'),
  farsta: ww('Wand-Nachttisch Farsta mit Schublade', [0.4, 0.3, 0.15], 'wand-nachttisch-farsta-mit-schublade-122036', 'Helles Holz (Eichenfurnier); wandhängend'),
  diana: ww('Nachttisch Diana aus Eichenholz mit Schublade', [0.5, 0.45, 0.55], 'nachttisch-diana-aus-eichenholz-mit-schublade-156012', 'Dunkles Holz, Griffe Schwarz; Füße 24 cm'),
  pax: ikea('PAX Korpus Kleiderschrank', [0.998, 0.58, 2.364], 'pax-korpus-kleiderschrank-weiss-80458207', 'Weiß; Türen und Inneneinrichtung separat'),
  paxDark: ikea('PAX Korpus Kleiderschrank', [0.998, 0.58, 2.364], 'pax-korpus-kleiderschrank-dunkelgrau-20458205', 'Dunkelgrau; Türen und Inneneinrichtung separat'),
  paxFlat: ikea('PAX Korpus Kleiderschrank', [0.998, 0.355, 2.364], 'pax-korpus-kleiderschrank-weiss-70458199', 'Weiß, 35 cm tief; Inneneinrichtung separat'),
  tonstadDoorOak: ikea('TONSTAD Tür', [0.495, 0.018, 2.294], 'tonstad-tuer-eichenfurnier-90510262', 'Eichenfurnier gebürstet; Scharniere separat'),
  tonstadDoorBrown: ikea('TONSTAD Tür', [0.495, 0.018, 2.294], 'tonstad-tuer-braun-gebeiztes-eichenfurnier-30510255', 'Braun gebeiztes Eichenfurnier; Scharniere separat'),

  // ------------------------------------------------------------------ office / guests
  eliotGrey: ww('Schlafsofa Eliot (2-Sitzer)', [1.8, 1.0, 0.7], 'schlafsofa-eliot-2-sitzer-156802', 'Webstoff Hellgrau, Füße Schwarz matt; Liegefläche 140 × 210 cm', { unfolded: 2.1 }),
  eliotBeige: ww('Schlafsofa Eliot (2-Sitzer)', [1.8, 1.0, 0.7], 'schlafsofa-eliot-2-sitzer-156800', 'Webstoff Beige, Füße Schwarz matt; Liegefläche 140 × 210 cm', { unfolded: 2.1 }),
  eliotDarkGrey: ww('Schlafsofa Eliot (2-Sitzer)', [1.8, 1.0, 0.7], 'schlafsofa-eliot-2-sitzer-156801', 'Webstoff Dunkelgrau, Füße Schwarz matt; Liegefläche 140 × 210 cm', { unfolded: 2.1 }),
  eliotGreen: ww('Schlafsofa Eliot (2-Sitzer) aus Teddy-Bouclé', [1.8, 1.0, 0.7], 'boucle-schlafsofa-eliot-2-sitzer-156807', 'Teddy-Bouclé Dunkelgrün, Füße Schwarz matt; Liegefläche 140 × 210 cm', { unfolded: 2.1 }),
  calaryDesk: ww('Schreibtisch Calary mit geriffelter Front', [1.3, 0.5, 0.75], 'holz-schreibtisch-calary-mit-geriffelter-front-147953', 'Dunkles Holz (Eichenfurnier), Beine massive Eiche, Knäufe gebürstet'),
  calaryDeskBlack: ww('Schreibtisch Calary mit geriffelter Front', [1.3, 0.5, 0.75], 'holz-schreibtisch-calary-mit-geriffelter-front-140286', 'Schwarz matt (Eichenfurnier), geriffelte Fächer'),
  libbyDesk: ww('Holz-Schreibtisch Libby mit Schubladen', [1.4, 0.6, 0.76], 'wooden-desk-libby-with-drawers-en-24wes25865', 'Dunkles Holz, Tischplatte Eiche'),
  reneeDesk: ww('Holz-Schreibtisch Renee', [1.1, 0.6, 0.77], 'holz-schreibtisch-renee-in-beige-163368', 'Tischplatte Helles Holz, Gestell Schwarz matt'),
  piaCaramel: ww('Leder-Drehstuhl Pia mit Armlehnen, höhenverstellbar', [0.62, 0.58, 0.83], 'pia-office-chair-leather-caramel-3109-4-metal-color-pantone-7603-c-en-25wes85921', 'Leder Hellbraun (Caramel), Gestell Braun; Sitzhöhe 45–59 cm'),
  piaSage: ww('Polster-Schreibtischstuhl Pia mit Armlehne, höhenverstellbar', [0.62, 0.58, 0.83], 'pia-office-chair-fabric-sic-austin-easy-clean-13-winter-moss-metal-color-pantone-6189-c-en-25wes41276', 'Webstoff Salbeigrün; Sitzhöhe 45–59 cm'),
  piaTaupe: ww('Polster-Schreibtischstuhl Pia mit Armlehne, höhenverstellbar', [0.62, 0.58, 0.83], 'pia-office-chair-fabric-sic-austin-easy-clean-3-antelope-metal-color-warm-grey-8c-en-25wes18333', 'Webstoff Taupe; Sitzhöhe 45–59 cm'),
  piaBeige: ww('Leder-Drehstuhl Pia mit Armlehnen, höhenverstellbar', [0.62, 0.58, 0.83], 'pia-office-chair-leather-beige-h3-metal-color-pantone-warm-grey-8c-en-25wes11523', 'Leder Hellbeige, Gestell Greige; Sitzhöhe 45–59 cm'),
  libbyShelfDark: ww('Hohes Holz-Regal Libby', [1.2, 0.37, 1.9], 'hohes-holz-regal-libby-158876', 'Dunkles Holz (Eichenfurnier), Füße massive Eiche 12 cm'),
  libbyShelfLight: ww('Hohes Holz-Regal Libby', [1.2, 0.37, 1.9], 'hohes-holz-regal-libby-158870', 'Helles Holz (Eichenfurnier), Füße massive Eiche 12 cm'),
  libbyShelfBlack: ww('Hohes Holz-Regal Libby', [1.2, 0.37, 1.9], 'hohes-holz-regal-libby-158873', 'Schwarz (Eichenfurnier), Füße 12 cm'),
  portlyn: ww('Regal Portlyn', [1.5, 0.34, 1.59], 'berlin-4-levels-150-bookcase-walnut-veneer-de-25tem80553', 'Walnussfurnier dunkel, vier Ebenen'),

  // ------------------------------------------------------------------ hall
  larsenConsole: ww('Holz-Wandkonsole Larsen', [1.12, 0.3, 0.17], 'holz-wandkonsole-larsen-161618', 'Dunkles Holz (Eichenfurnier); wandhängend'),
  calaryConsole: ww('Konsole Calary mit geriffelter Front', [1.0, 0.35, 0.8], 'holz-konsole-calary-mit-geriffelter-front-147944', 'Helles Holz (Eichenfurnier), Griffe goldfarben; Beine 68 cm'),

  // ------------------------------------------------------------------ shared modules (utility, bath, balconies)
  utility: ikea('ENHET Hochschrank mit Tür', [0.3, 0.321, 1.8], 'enhet-hochschrank-mit-tuer-weiss-10623036', 'Weiß; Wandmontage'),
  ivar: ikea('IVAR Regal', [0.89, 0.3, 1.79], 'ivar-regal-kiefer-s89404578', 'Kiefer'),
  outdoor: ikea('NÄMMARÖ Sessel draußen', [0.69, 0.78, 0.69], 'naemmaroe-sessel-draussen-hellbraun-lasiert-40510306', 'Akazie hellbraun lasiert; Sitzhöhe 30 cm, Polster separat'),
  bistro: ikea('TÄRNÖ Tisch + 2 Stühle', [0.55, 0.54, 0.7], 'taernoe-tisch-2-stuehle-aussen-schwarz-hellbraun-lasiert-s69898415', 'Akazie/Stahl schwarz; Stühle je 39 × 40 × 79 cm'),
  stool: ikea('VILTO Badezimmerhocker', [0.4, 0.32, 0.25], 'vilto-badezimmerhocker-birke-60344453', 'Birke'),
  vanity: ikea('ENHET Waschbeckenschrank mit Boden', [0.6, 0.4, 0.6], 'enhet-waschbeckenschrank-mit-boden-weiss-30440465', 'Weiß; offener Korpus'),
  laundry: { ...ikea('ENHET Wandschrank mit Tür', [0.6, 0.32, 0.75], 'x', 'Weiß; oberhalb des vorhandenen Waschtrockners'), url: 'https://www.ikea.com/de/en/p/enhet-wall-cabinet-with-door-white-40623025/' },
};

/**
 * Selection per style world. Value: product key, [key, quantity] or a list of those (several
 * articles in one planning position, e.g. PAX carcasses + doors).
 */
const SHARED = {
  highboard: 'rudsta', 'hall-wardrobe': [['paxFlat', 2], ['tonstadDoorOak', 4]],
  'utility-tall': ['utility', 2], 'utility-shelf': 'ivar',
  'b1-lounge-a': 'outdoor', 'b1-lounge-b': 'outdoor', 'b1-table': 'bistro', 'b2-bistro': 'bistro',
  'stool-bath': 'stool', 'vanity-bath': 'vanity', 'vanity-guest': 'vanity', laundry: 'laundry',
};
export const STYLE_PRODUCTS = {
  metallic: {
    sofa: 'albaGrey', lounge: 'mikkelOffWhite', 'reading-chair': 'mikkelOffWhite', coffee: 'alys', 'side-table': 'alysSide',
    lowboard: 'calaryTvBrown', dining: [['tavolo', 1], ['celia', 6]], chair: ['celia', 6], 'pendant-dining': 'rim', sideboard: 'calarySideDark',
    bed: 'dreamGrey', 'nightstand-n': 'calaryNight', 'nightstand-s': 'calaryNight', 'nightstand-n-pendant': 'antic', 'nightstand-s-pendant': 'antic',
    wardrobe: [['paxDark', 3], ['tonstadDoorBrown', 6]], 'hall-wardrobe': [['paxFlat', 2], ['tonstadDoorBrown', 4]], console: 'larsenConsole',
    'floorlamp-living': 'bun', 'floorlamp-bed': 'bun', 'floorlamp-office': 'bun',
    'rug-living': 'amaroGreyXL', 'rug-bed': 'janeTaupeL', 'rug-office': 'amaroGreyS',
    sofabed: 'eliotGrey', desk: 'calaryDesk', 'task-chair': 'piaCaramel', shelving: 'libbyShelfDark',
  },
  soft: {
    sofa: 'melvaOffWhite', lounge: 'ekenaset', 'reading-chair': 'ekenaset', 'armchair-2': 'ekenaset', coffee: 'distinct', 'side-table': 'marisaTravSide',
    lowboard: 'zumiTv', dining: [['pedraBeige', 1], ['imaraOffWhite', 6]], chair: ['imaraOffWhite', 6], 'pendant-dining': 'elettra', sideboard: 'zumiSide',
    bed: 'archeTaupe', 'nightstand-n': 'farsta', 'nightstand-s': 'farsta', 'nightstand-n-pendant': 'paris', 'nightstand-s-pendant': 'paris',
    wardrobe: [['pax', 3], ['tonstadDoorOak', 6]], console: 'calaryConsole',
    'floorlamp-living': 'kayaBeige', 'floorlamp-bed': 'kayaBeige', 'floorlamp-office': 'kayaBeige',
    'rug-living': 'amaroCreamXL', 'rug-bed': 'amaroBrownL', 'rug-office': 'amaroCreamS',
    sofabed: 'eliotBeige', desk: 'libbyDesk', 'task-chair': 'piaSage', shelving: 'libbyShelfLight',
  },
  brutal: {
    sofa: 'lennonBoucle', lounge: 'rae', 'reading-chair': 'mikkelOffWhite', coffee: 'naida',
    lowboard: 'calaryTvBlack', dining: [['pedraGrey', 1], ['kris', 6]], chair: ['kris', 6], 'pendant-dining': 'level', sideboard: 'chandlerSide',
    bed: 'sato', 'nightstand-n': 'calaryWallNight', 'nightstand-s': 'calaryWallNight', 'nightstand-n-pendant': 'paris', 'nightstand-s-pendant': 'paris',
    wardrobe: [['paxDark', 3], ['tonstadDoorBrown', 6]], 'hall-wardrobe': [['paxFlat', 2], ['tonstadDoorBrown', 4]], console: 'larsenConsole',
    'floorlamp-living': 'kayaAnthracite', 'floorlamp-bed': 'kayaAnthracite', 'floorlamp-office': 'kayaAnthracite',
    'rug-living': 'janeTaupeXL', 'rug-bed': 'janeGreyL', 'rug-office': 'janeTaupeS',
    sofabed: 'eliotDarkGrey', desk: 'calaryDeskBlack', 'task-chair': 'piaTaupe', shelving: 'libbyShelfBlack',
  },
  quiet: {
    sofa: 'lennonLinen', lounge: 'mikkelGreen', 'reading-chair': 'mikkelGreen', coffee: 'andrew',
    lowboard: 'elonaXL', dining: [['tavolo', 1], ['imaraOlive', 6]], chair: ['imaraOlive', 6], 'pendant-dining': 'hamilton', sideboard: 'calarySideBlack',
    bed: 'dreamAnthracite', 'nightstand-n': 'diana', 'nightstand-s': 'diana', 'nightstand-n-pendant': 'paris', 'nightstand-s-pendant': 'paris',
    wardrobe: [['paxDark', 3], ['tonstadDoorBrown', 6]], 'hall-wardrobe': [['paxFlat', 2], ['tonstadDoorBrown', 4]], console: 'larsenConsole',
    'floorlamp-living': 'neron', 'floorlamp-bed': 'neron', 'floorlamp-office': 'neron',
    'rug-living': 'janeLightGreyXL', 'rug-bed': 'janeSageL', 'rug-office': 'amaroGreyS',
    sofabed: 'eliotGreen', desk: 'reneeDesk', 'task-chair': 'piaBeige', shelving: 'portlyn',
  },
};

/** Purchase positions of one planning slot: [{ ...product, key, quantity }] (empty = not sourced). */
export function slotProducts(style, slot) {
  const sel = STYLE_PRODUCTS[style]?.[slot] ?? SHARED[slot];
  if (!sel) return [];
  const list = typeof sel === 'string' ? [[sel, 1]] : typeof sel[0] === 'string' ? [sel] : sel;
  return list.map(([key, quantity = 1]) => ({ ...PRODUCTS[key], key, quantity }));
}
/** Main article of a slot (throws for unknown slots so a missing selection cannot go unnoticed). */
export function styleProduct(style, slot) {
  const p = slotProducts(style, slot)[0];
  if (!p) throw new Error(`Kein Produkt für ${style}/${slot}`);
  return p;
}

const cm = (m) => Math.round(m * 1000) / 10;
export const dims = (p) => p.size[0] === p.size[1] && !/Regal|Teppich/.test(p.name) && p.size[2] < 2 && /rund|Rund|Ø|Nachttisch Calary|Pendel|Stehlampe/.test(p.name + p.finish)
  ? `Ø ${cm(p.size[0])} × H ${cm(p.size[2])} cm` : `${cm(p.size[0])} × ${cm(p.size[1])} × ${cm(p.size[2])} cm`;

/**
 * Attaches the purchase positions to a planned item: retailer name, finish, manufacturer
 * dimensions and direct product links. The 3D object itself is built by the style from the
 * same product data, so geometry, detail card, CSV and JSON can never diverge.
 */
export function catalogueFurniture(ctx, meta, object, placement) {
  const products = slotProducts(ctx.style.id, meta.id);
  if (!products.length) return { meta, object: typeof object === 'function' ? object() : object, placement };
  const [p] = products;
  const extra = products.slice(1).map((x) => `${x.quantity} × ${x.retailer} ${x.name} (${x.finish})`).join(' + ');
  const qty = p.quantity > 1 ? `${p.quantity} × ` : '';
  const name = meta.productName ?? `${qty}${p.retailer} ${p.name}`;
  const spec = [meta.productSpec ?? `${p.finish} · Herstellermaße ${dims(p)}`, extra, meta.note].filter(Boolean).join(' · ');
  return { meta: { ...meta, name, spec, products }, object: typeof object === 'function' ? object() : object, placement };
}

// ------------------------------------------------------------------ product finishes
const finishCache = new WeakMap();
/** A purchased finish: clone of a base material slot in the product's real colour (cached). */
export function finish(base, name, color, { dropMap = false } = {}) {
  let variants = finishCache.get(base);
  if (!variants) finishCache.set(base, variants = new Map());
  const key = `${name}:${color}:${dropMap}`;
  if (!variants.has(key)) {
    const m = base[name].clone(); m.color.set(color);
    if (dropMap) m.map = null;
    if (m.sheenColor) m.sheenColor.copy(m.color).lerp(m.color.clone().setRGB(1, 1, 1), 0.25);
    variants.set(key, m);
  }
  return variants.get(key);
}
