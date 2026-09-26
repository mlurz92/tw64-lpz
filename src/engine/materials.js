// Physically based material library. One base library (Refined Metallic Japandi) plus style
// themes that remap or re-tint slots (see themeMaterials). All materials are MeshPhysicalMaterial
// (sheen for textiles, clearcoat for lacquer and stone); the WebGPU renderer turns them into node
// materials automatically.
import * as THREE from 'three';
import * as TX from './textures.js';

export const PALETTE = {
  offWhite: '#ECE8E1', softGray: '#C9C4BC', greige: '#B3AA9D', taupe: '#8B7D6F',
  sage: '#8A9582', sageDeep: '#5B6653', bronze: '#6E5A45', charcoal: '#333230', softBlack: '#1E1E1D',
  wall: '#DDD6CB', wallDeep: '#CFC6B8', ceiling: '#F0EDE8', linen: '#D8CFBF', ivory: '#E9E3D8',
};

/**
 * Procedural texture sets (key → generator). Used at runtime (baked WebP first, generator as
 * fallback) and by tools/bake-textures.mjs, so both always produce identical textures.
 */
export const PROCEDURAL = {
  floorOak: () => TX.plankFloor({ veneer: 'oak_veneer_01', seed: 13, tone: 0.97, variance: 0.06 }),
  deck: () => TX.plankFloor({ veneer: 'washed_grey_oak_veneer', plankL: 2.4, plankW: 0.14, rows: 16, planksPerRow: 1, seed: 3, gap: 0.006, tone: 0.9, variance: 0.1, hasRough: false }),
  calacatta: () => TX.marble({ seed: 12, size: 1.4 }),
  calacattaFine: () => TX.marble({ seed: 29, size: 0.8, veins: 1.3 }),
  granite: () => TX.granite({ size: 0.9 }),
  // Iron: 60 x 60 cm matt porcelain, repeated in baths and utility room.
  tiles: () => TX.limestoneTiles({ seed: 27, tileW: 0.6, tileH: 0.6, cols: 4, rows: 4, res: 1024, base: [106, 108, 109], grout: [75, 77, 78] }),
  tilesFloor: () => TX.limestoneTiles({ seed: 35, tileW: 0.6, tileH: 0.6, cols: 4, rows: 4, res: 1024, base: [101, 103, 104], grout: [72, 74, 75] }),
  travertine: () => TX.travertine({ size: 0.9 }),
  travertineVein: () => TX.travertineVein({}),
  darkStone: () => TX.darkStone({}),
  limewash: () => TX.limewash({}),
  wool: () => ({ map: TX.wool({ color: [200, 196, 190], size: 0.6 }) }),
};

const phys = (p) => new THREE.MeshPhysicalMaterial(p);
const uv = (m, size, grain = null) => { m.userData.uv = { size, grain }; return m; };

/** Builds all base materials (async because of photo textures). */
export async function createMaterials() {
  const P = Object.fromEntries(await Promise.all(Object.entries(PROCEDURAL).map(async ([k, gen]) => [k, await TX.procedural(k, gen)])));
  const [
    oakD, oakR, oakN, darkD, darkR, darkN, walD, walR, walN, lightD, lightR, lightN,
    plasterN, plasterR, teddyN, teddyD, linenN, woolN, velvetN,
  ] = await Promise.all([
    TX.photo('oak_veneer_01_diff.jpg', { srgb: true, size: 1.2 }), TX.photo('oak_veneer_01_rough.jpg', { size: 1.2 }), TX.photo('oak_veneer_01_nor.jpg', { size: 1.2 }),
    TX.photo('black_oak_veneer_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('black_oak_veneer_rough.jpg', { size: 0.9 }), TX.photo('black_oak_veneer_nor.jpg', { size: 0.9 }),
    TX.photo('european_walnut_veneer_04_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('european_walnut_veneer_04_rough.jpg', { size: 0.9 }), TX.photo('european_walnut_veneer_04_nor.jpg', { size: 0.9 }),
    TX.photo('white_oak_veneer_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('white_oak_veneer_rough.jpg', { size: 0.9 }), TX.photo('white_oak_veneer_nor.jpg', { size: 0.9 }),
    TX.photo('plastered_wall_04_nor.jpg', { size: 1.6 }), TX.photo('plastered_wall_04_rough.jpg', { size: 1.6 }),
    TX.photo('curly_teddy_natural_nor.jpg', { size: 0.28 }), TX.photo('curly_teddy_natural_diff.jpg', { srgb: true, size: 0.28 }),
    TX.photo('rough_linen_nor.jpg', { size: 0.25 }), TX.photo('poly_wool_herringbone_nor.jpg', { size: 0.3 }),
    TX.photo('velour_velvet_nor.jpg', { size: 0.25 }),
  ]);
  // surroundings: park lawn (9.28 m below), gravel paths, foliage
  const [grassD, grassN, gravelD, leafD] = await Promise.all([
    TX.photo('leafy_grass_diff.jpg', { srgb: true, size: 2.5 }), TX.photo('leafy_grass_nor.jpg', { size: 2.5 }),
    TX.photo('gravel_floor_diff.jpg', { srgb: true, size: 2.0 }), TX.photo('leafy_grass_diff.jpg', { srgb: true, size: 1.4 }),
  ]);
  const lime = P.limewash.map;

  const M = {};
  const T = M._tex = { oakD, oakR, oakN, darkD, darkR, darkN, walD, walR, walN, lightD, lightR, lightN, plasterN, plasterR, teddyN, teddyD, linenN, woolN, velvetN, lime, P };
  // --- architecture ---------------------------------------------------------------------
  // Walls: limewash albedo (neutral, tinted by colour) + photographed plaster relief.
  // Existing apartment walls: plain white paint; colour and strong texture are reserved for
  // the deliberately selected accent walls.
  M.wall = uv(phys({ color: '#ffffff', roughness: 0.94, normalMap: plasterN, normalScale: new THREE.Vector2(0.08, 0.08) }), 1.6);
  M.wallDeep = M.wall;
  M.wallAccent = wallMaterial(T, '#BFB3A3', 0.9);
  M.wallSage = wallMaterial(T, '#A7AE9C', 0.7);
  M.wallCap = phys({ color: '#3b3935', roughness: 0.9 });
  M.ceiling = uv(phys({ color: PALETTE.ceiling, roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.12, 0.12) }), 1.6);
  M.floorOak = uv(phys({ map: P.floorOak.map, normalMap: P.floorOak.normalMap, roughnessMap: P.floorOak.roughnessMap, roughness: 1, color: '#ffffff', clearcoat: 0.08, clearcoatRoughness: 0.55 }), 3.8);
  M.floorOak.userData.uv.aspect = P.floorOak.aspect;
  M.deck = uv(phys({ map: P.deck.map, normalMap: P.deck.normalMap, roughness: 0.8, color: '#c9c2b8' }), 2.4);
  M.tileWall = uv(phys({ map: P.tiles.map, normalMap: P.tiles.normalMap, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 0.82, color: '#ffffff' }), 2.4);
  M.tileFloor = uv(phys({ map: P.tilesFloor.map, normalMap: P.tilesFloor.normalMap, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 0.88, color: '#ffffff' }), 2.4);
  M.skirting = phys({ color: PALETTE.wallDeep, roughness: 0.6 });
  M.slab = phys({ color: '#d7d2ca', roughness: 0.95 });
  M.facade = uv(phys({ color: '#E6E2DA', roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.5, 0.5) }), 1.6);

  // --- woods ---------------------------------------------------------------------------
  M.oak = uv(phys({ map: oakD, roughnessMap: oakR, normalMap: oakN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.85, color: '#e3d9cc' }), 1.2, 'v');
  M.oakLight = uv(phys({ map: lightD, roughnessMap: lightR, normalMap: lightN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.8, color: '#e8d6bf' }), 0.9, 'u');
  M.oakNatural = uv(phys({ map: lightD, roughnessMap: lightR, normalMap: lightN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.78, color: '#d8bf9c' }), 0.9, 'u');
  M.smokedOak = uv(phys({ map: darkD, roughnessMap: darkR, normalMap: darkN, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.75, color: '#9a8a7c', clearcoat: 0.12, clearcoatRoughness: 0.5 }), 0.9, 'u');
  M.oakDark = uv(phys({ map: walD, roughnessMap: walR, normalMap: walN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.7, color: '#6e5646', clearcoat: 0.12, clearcoatRoughness: 0.5 }), 0.9, 'u');
  M.walnut = uv(phys({ map: walD, roughnessMap: walR, normalMap: walN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.6, color: '#5d4a40', clearcoat: 0.25, clearcoatRoughness: 0.35 }), 0.9, 'u');
  M.teak = uv(phys({ map: walD, roughness: 0.75, color: '#a57a55' }), 0.9, 'u');
  M.beech = uv(phys({ map: lightD, roughnessMap: lightR, normalMap: lightN, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 0.7, color: '#e2c6a2' }), 0.9, 'u');

  // --- stones --------------------------------------------------------------------------
  M.marble = uv(phys({ map: P.calacatta.map, roughnessMap: P.calacatta.roughnessMap, normalMap: P.calacatta.normalMap, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 1, clearcoat: 0.4, clearcoatRoughness: 0.12 }), 1.4);
  M.marbleFine = uv(phys({ map: P.calacattaFine.map, roughnessMap: P.calacattaFine.roughnessMap, normalMap: P.calacattaFine.normalMap, roughness: 1, clearcoat: 0.4, clearcoatRoughness: 0.12 }), 0.8);
  M.granite = uv(phys({ map: P.granite.map, roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.15 }), 0.9);
  M.travertine = uv(phys({ map: P.travertine.map, normalMap: P.travertine.normalMap, roughness: 0.6 }), 0.9);
  M.travertineVein = uv(phys({ map: P.travertineVein.map, normalMap: P.travertineVein.normalMap, roughness: 0.55 }), 1.1);
  M.stoneDark = uv(phys({ map: P.darkStone.map, roughnessMap: P.darkStone.roughnessMap, normalMap: P.darkStone.normalMap, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 1, clearcoat: 0.15, clearcoatRoughness: 0.4 }), 1.2);
  M.limestone = uv(phys({ map: P.tiles.map, roughness: 0.6 }), 2.4);
  M.concrete = uv(phys({ color: '#9d978d', roughness: 0.9, normalMap: plasterN, normalScale: new THREE.Vector2(0.8, 0.8) }), 1.6);
  M.concreteDark = uv(phys({ color: '#5f5a54', roughness: 0.92, normalMap: plasterN, normalScale: new THREE.Vector2(0.9, 0.9) }), 1.2);

  // --- metals / glass ------------------------------------------------------------------
  M.bronze = phys({ color: '#8a6a48', metalness: 1, roughness: 0.34 });
  M.bronzeDark = phys({ color: '#5a4431', metalness: 1, roughness: 0.4 });
  M.brass = phys({ color: '#b8925f', metalness: 1, roughness: 0.28 });
  M.brassBrushed = phys({ color: '#a8854f', metalness: 1, roughness: 0.42 });
  M.blackMetal = phys({ color: '#1c1c1b', metalness: 0.5, roughness: 0.42 });
  M.blackMatte = phys({ color: '#181818', metalness: 0.2, roughness: 0.62 });
  M.steelBlackened = phys({ color: '#2b2a28', metalness: 0.85, roughness: 0.5 });
  M.frame = phys({ color: '#2a2a29', metalness: 0.35, roughness: 0.5 });
  M.chrome = phys({ color: '#d8d8d8', metalness: 1, roughness: 0.08 });
  // Bath fittings (all styles): matt black PVD, satin sheen
  M.fittingBlack = phys({ color: '#121212', metalness: 0.6, roughness: 0.36, clearcoat: 0.25, clearcoatRoughness: 0.45 });
  M.steel = phys({ color: '#9a9a98', metalness: 1, roughness: 0.3 });
  // Glass: thin transparent coat (no screen-space transmission, which would need an extra
  // opaque pass per frame); reflections come from the room probe and, in the realistic mode, SSR.
  M.glass = phys({ color: '#f4f7f6', metalness: 0, roughness: 0.03, ior: 1.52, transparent: true, opacity: 0.1, depthWrite: false, envMapIntensity: 1.2 });
  M.glass.userData = { glass: true };
  M.smokedGlass = phys({ color: '#3a3836', metalness: 0, roughness: 0.06, ior: 1.52, transparent: true, opacity: 0.55, depthWrite: false });
  M.smokedGlass.userData = { glass: true };
  M.amberGlass = phys({ color: '#9a6a36', metalness: 0, roughness: 0.08, ior: 1.52, transparent: true, opacity: 0.6, depthWrite: false, emissive: new THREE.Color('#ffb265'), emissiveIntensity: 0 });
  M.amberGlass.userData = { glass: true, emissiveOn: 0.6 };
  M.mirror = phys({ color: '#f4f4f4', metalness: 1, roughness: 0.015 });
  M.mirror.userData.mirror = true;

  // --- textiles ------------------------------------------------------------------------
  const fabric = (color, normal, nScale = 0.8, sheen = '#ffffff', size = 0.25, rough = 0.95) =>
    uv(phys({ color, roughness: rough, normalMap: normal, normalScale: new THREE.Vector2(nScale, nScale), sheen: 1, sheenColor: new THREE.Color(sheen), sheenRoughness: 0.75 }), size);
  const boucle = (color, sheen) => uv(phys({ color, map: teddyD, roughness: 1, normalMap: teddyN, normalScale: new THREE.Vector2(1.1, 1.1), sheen: 1, sheenColor: new THREE.Color(sheen), sheenRoughness: 0.9 }), 0.28);
  M.boucle = boucle('#E7E1D6', '#f4efe6');
  M.boucleSage = boucle('#8f9a85', '#aab59f');
  M.boucleOat = boucle('#D9CDBA', '#ebe1d1');
  M.boucleTaupe = boucle('#A89A89', '#c7baa9');
  M.boucleMoss = boucle('#5F6A4E', '#8a9676');
  M.boucleCharcoal = boucle('#57534e', '#7d7872');
  M.linenGrey = fabric('#BDB6AB', linenN, 0.9, '#d9d3c8');
  M.linenIvory = fabric('#E4DDD0', linenN, 0.9, '#f3eee6');
  M.linenBeige = fabric('#CFC3B0', linenN, 0.9, '#e6dccb');
  M.linenSage = fabric('#7F8B74', linenN, 0.9, '#a9b39e');
  M.linenTaupe = fabric('#9C8F80', linenN, 0.9, '#bcb0a2');
  M.linenCharcoal = fabric('#4A4845', linenN, 0.9, '#77736d');
  M.linenCognac = fabric('#9A5E3A', linenN, 0.9, '#c58a62');
  M.cordBeige = fabric('#D3C6B2', velvetN, 1.0, '#e8ddcc', 0.2, 0.9);
  M.velvetSage = fabric('#5E6B55', velvetN, 0.6, '#9aa88e', 0.25, 0.8);
  M.velvetMoss = fabric('#434d38', velvetN, 0.6, '#7b8a67', 0.25, 0.8);
  M.velvetCognac = fabric('#8E5A3A', velvetN, 0.6, '#c08a64', 0.25, 0.8);
  M.woolGreige = fabric('#A89D8E', woolN, 0.8, '#c9bfb1', 0.3);
  M.leatherCognac = phys({ color: '#7a4b2f', roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.45 });
  M.leatherBrown = phys({ color: '#4a3326', roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.45 });
  M.leatherBlack = phys({ color: '#1f1d1b', roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  M.curtain = uv(phys({ color: '#E3DCCF', roughness: 1, normalMap: linenN, normalScale: new THREE.Vector2(0.6, 0.6), sheen: 1, sheenColor: new THREE.Color('#fbf6ee'), sheenRoughness: 0.6, side: THREE.DoubleSide }), 0.25);
  M.curtainDim = uv(phys({ color: '#B8AE9F', roughness: 1, normalMap: linenN, normalScale: new THREE.Vector2(0.6, 0.6), sheen: 1, sheenColor: new THREE.Color('#d6cdbf'), sheenRoughness: 0.6, side: THREE.DoubleSide }), 0.25);
  // Rugs share one neutral heathered wool map, tinted by colour.
  const rug = (color, sheen) => uv(phys({ map: P.wool.map, color, roughness: 1, normalMap: woolN, normalScale: new THREE.Vector2(1.2, 1.2), sheen: 1, sheenColor: new THREE.Color(sheen), sheenRoughness: 0.9 }), 0.6);
  M.rug = rug('#E0D2BE', '#e2d9ca');
  M.rugDark = rug('#A89A86', '#b1a797');
  M.rugIvory = rug('#EDE6DA', '#f4eee4');
  M.rugGrey = rug('#A9A49C', '#c4bfb7');
  M.rugSage = rug('#9FA592', '#bcc1b0');
  M.bedding = fabric('#EEE9E0', linenN, 0.7, '#ffffff', 0.25);
  M.beddingSand = fabric('#D9CFBF', linenN, 0.7, '#efe6d8', 0.25);
  M.throwSage = fabric('#65705C', woolN, 1.0, '#8d9883', 0.3);
  M.throwMoss = fabric('#4f5a43', woolN, 1.0, '#7a866c', 0.3);
  M.throwCognac = fabric('#8a5536', woolN, 1.0, '#b27c58', 0.3);
  M.towel = fabric('#E6DFD3', woolN, 1.3, '#f5efe6', 0.2);
  M.towelTaupe = fabric('#A59888', woolN, 1.3, '#c7baa9', 0.2);

  // --- surroundings (park, street, building) --------------------------------------------
  M.grass = uv(phys({ map: grassD, normalMap: grassN, normalScale: new THREE.Vector2(0.8, 0.8), roughness: 0.95, color: '#b4cc9c' }), 2.5);
  M.gravelPath = uv(phys({ map: gravelD, roughness: 0.9, color: '#e9e1d2' }), 2.0);
  M.asphalt = uv(phys({ color: '#5b5b58', roughness: 0.92, normalMap: plasterN, normalScale: new THREE.Vector2(0.6, 0.6) }), 1.6);
  M.pavement = uv(phys({ color: '#b9b2a6', roughness: 0.9, normalMap: plasterN, normalScale: new THREE.Vector2(0.4, 0.4) }), 1.6);
  M.bark = phys({ color: '#4d4238', roughness: 0.95 });
  M.foliage = uv(phys({ map: leafD, normalMap: grassN, normalScale: new THREE.Vector2(0.9, 0.9), roughness: 0.95, color: '#ffffff', sheen: 0.6, sheenColor: new THREE.Color('#d6e6a4'), sheenRoughness: 0.7 }), 0.9);
  M.facadeBand = uv(phys({ color: '#d4cec4', roughness: 0.9, normalMap: plasterN, normalScale: new THREE.Vector2(0.4, 0.4) }), 1.6);
  M.windowDark = phys({ color: '#20262b', metalness: 0.2, roughness: 0.08, clearcoat: 1, clearcoatRoughness: 0.05 });
  M.parkLamp = phys({ color: '#f5efe4', roughness: 0.4, emissive: new THREE.Color('#ffd9a8'), emissiveIntensity: 0 });
  M.parkLamp.userData.emissiveOn = 4;

  // --- ceramics / misc -----------------------------------------------------------------
  M.ceramicWhite = phys({ color: '#F4F2EE', roughness: 0.12, clearcoat: 0.6, clearcoatRoughness: 0.1 });
  M.stoneware = phys({ color: '#3d3c39', roughness: 0.7 });
  M.stonewareSage = phys({ color: '#7d876f', roughness: 0.65 });
  M.stonewareSand = phys({ color: '#cbbfae', roughness: 0.8 });
  M.stonewareCharcoal = phys({ color: '#2a2927', roughness: 0.55, clearcoat: 0.2 });
  M.stonewareClay = phys({ color: '#a8704c', roughness: 0.8 });
  M.stonewareRaw = uv(phys({ color: '#a39a8c', roughness: 0.9, normalMap: plasterN, normalScale: new THREE.Vector2(1.2, 1.2) }), 0.5);
  M.lacquerGreige = phys({ color: '#9A9185', roughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  M.lacquerBlack = phys({ color: '#1d1c1b', roughness: 0.55, clearcoat: 0.2, clearcoatRoughness: 0.5 });
  M.doorLeaf = uv(phys({ map: darkD, roughnessMap: darkR, normalMap: darkN, normalScale: new THREE.Vector2(0.4, 0.4), color: '#b8a99a', roughness: 0.7 }), 0.9, 'u');
  M.matteBlack = phys({ color: '#141414', roughness: 0.6 });
  M.plasticWhite = phys({ color: '#efefec', roughness: 0.35 });
  M.appliance = phys({ color: '#101010', metalness: 0.3, roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.08 });
  M.screen = phys({ color: '#050505', roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 });
  M.paper = phys({ color: '#efe9de', roughness: 0.95 });
  M.soil = phys({ color: '#3b3026', roughness: 1 });
  M.pebbles = phys({ color: '#bdb6aa', roughness: 0.7 });
  M.candle = phys({ color: '#efe8dc', roughness: 0.6 });
  M.leaf = phys({ color: '#56643f', roughness: 0.6, side: THREE.DoubleSide, sheen: 0.4, sheenColor: new THREE.Color('#9fb07f') });
  M.lemon = phys({ color: '#d9b43c', roughness: 0.55 });
  M.apple = phys({ color: '#8a2f22', roughness: 0.35, clearcoat: 0.5 });

  // --- emissive ------------------------------------------------------------------------
  M.lampShade = phys({ color: '#f3ebdd', roughness: 0.9, emissive: new THREE.Color('#ffd9a6'), emissiveIntensity: 0, side: THREE.DoubleSide });
  M.lampShade.userData.emissiveOn = 0.7;
  M.opal = phys({ color: '#f7f1e8', roughness: 0.4, emissive: new THREE.Color('#ffdcb0'), emissiveIntensity: 0 });
  M.opal.userData.emissiveOn = 2.2;
  // opal of lamps in windowless rooms (bath pendants): glows in daylight as well
  M.opalInterior = M.opal.clone(); M.opalInterior.userData = { emissiveOn: 2.2, interior: true };
  M.ledStrip = phys({ color: '#fff3e0', roughness: 0.5, emissive: new THREE.Color('#ffcf94'), emissiveIntensity: 0 });
  M.ledStrip.userData.emissiveOn = 2.5;
  M.downlight = phys({ color: '#fbf6ec', roughness: 0.3, emissive: new THREE.Color('#fff0dc'), emissiveIntensity: 0 });
  M.downlight.userData.emissiveOn = 3;
  M.candleFlame = phys({ color: '#ffb35c', emissive: new THREE.Color('#ff9a3c'), emissiveIntensity: 0 });
  M.candleFlame.userData.emissiveOn = 5;

  for (const [k, m] of Object.entries(M)) if (m.isMaterial) m.name = k;
  return M;
}

// The limewash map averages ≈ 0.9 (linear); lift the tint so walls read at their nominal colour.
function limewashTint(color) {
  const c = new THREE.Color(color);
  c.r = Math.min(0.97, c.r * 1.1); c.g = Math.min(0.97, c.g * 1.1); c.b = Math.min(0.97, c.b * 1.1);
  return c;
}

/** Limewash wall: neutral limewash albedo tinted by `color`, plaster relief of given strength. */
function wallMaterial(T, color, relief = 0.4, size = 2.4) {
  const m = new THREE.MeshPhysicalMaterial({
    color: limewashTint(color), map: T.lime, roughness: 0.93,
    normalMap: T.plasterN, normalScale: new THREE.Vector2(relief, relief), roughnessMap: T.plasterR,
  });
  m.userData.uv = { size };
  return m;
}

/**
 * Style theme: returns a material set that inherits the base library and overrides slots.
 *  walls:  { key: [colour, relief] }   → new limewash wall materials
 *  remap:  { slot: otherSlot }         → e.g. bronze → blackMatte (all builders follow)
 *  tint:   { slot: colour }            → clone with new base colour (e.g. floor tone)
 */
const themeCache = new Map();
export function themeMaterials(M, theme) {
  if (!theme) return M;
  if (themeCache.has(theme.id)) return themeCache.get(theme.id);
  const S = Object.create(M);
  for (const [k, [color, relief]] of Object.entries(theme.walls ?? {})) {
    if (k === 'wall' || k === 'wallDeep') continue; // base walls stay white in every style
    S[k] = wallMaterial(M._tex, color, relief); S[k].name = `${theme.id}-${k}`;
  }
  for (const [k, color] of Object.entries(theme.tint ?? {})) {
    const m = M[k].clone(); m.color.set(color); m.name = `${theme.id}-${k}`; S[k] = m;
  }
  for (const [k, target] of Object.entries(theme.remap ?? {})) S[k] = S[target];
  themeCache.set(theme.id, S);
  return S;
}

/** Artwork material: canvas painting with fine gesso normal (cached per kind + seed). */
const artCache = new Map();
export function artMaterial(kind, seed) {
  const key = kind + seed;
  if (artCache.has(key)) return artCache.get(key);
  const tex = TX.artwork(kind, { seed });
  const m = new THREE.MeshPhysicalMaterial({ map: tex, roughness: kind === 'ink' ? 0.9 : 0.75 });
  if (kind === 'relief') { m.normalMap = TX.reliefNormal({ seed }); m.normalScale = new THREE.Vector2(1.6, 1.6); }
  m.name = 'art-' + kind;
  artCache.set(key, m);
  return m;
}
