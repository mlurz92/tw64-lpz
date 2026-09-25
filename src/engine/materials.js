// Physically based material library for the "Refined Metallic Japandi" concept.
// All materials are MeshPhysicalMaterial so that the WebGL renderer and the GPU path tracer
// share one description (sheen for textiles, clearcoat for lacquer, transmission for glass).
import * as THREE from 'three';
import * as TX from './textures.js';

export const PALETTE = {
  offWhite: '#ECE8E1', softGray: '#C9C4BC', greige: '#B3AA9D', taupe: '#8B7D6F',
  sage: '#8A9582', sageDeep: '#5B6653', bronze: '#6E5A45', charcoal: '#333230', softBlack: '#1E1E1D',
  wall: '#DDD6CB', wallDeep: '#CFC6B8', ceiling: '#F0EDE8', linen: '#D8CFBF', ivory: '#E9E3D8',
};

const phys = (p) => new THREE.MeshPhysicalMaterial(p);
const uv = (m, size, grain = null) => { m.userData.uv = { size, grain }; return m; };

/** Builds all materials (async because of photo textures). */
export async function createMaterials() {
  const [
    oakD, oakR, oakN, darkD, darkR, darkN, walD, walR, walN, lightD, lightR, lightN,
    plasterN, plasterR, teddyN, teddyD, linenN, woolN, velvetN, deckD, deckN,
  ] = await Promise.all([
    TX.photo('oak_veneer_01_diff.jpg', { srgb: true, size: 1.2 }), TX.photo('oak_veneer_01_rough.jpg', { size: 1.2 }), TX.photo('oak_veneer_01_nor.jpg', { size: 1.2 }),
    TX.photo('black_oak_veneer_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('black_oak_veneer_rough.jpg', { size: 0.9 }), TX.photo('black_oak_veneer_nor.jpg', { size: 0.9 }),
    TX.photo('european_walnut_veneer_04_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('european_walnut_veneer_04_rough.jpg', { size: 0.9 }), TX.photo('european_walnut_veneer_04_nor.jpg', { size: 0.9 }),
    TX.photo('white_oak_veneer_diff.jpg', { srgb: true, size: 0.9 }), TX.photo('white_oak_veneer_rough.jpg', { size: 0.9 }), TX.photo('white_oak_veneer_nor.jpg', { size: 0.9 }),
    TX.photo('plastered_wall_04_nor.jpg', { size: 1.6 }), TX.photo('plastered_wall_04_rough.jpg', { size: 1.6 }),
    TX.photo('curly_teddy_natural_nor.jpg', { size: 0.28 }), TX.photo('curly_teddy_natural_diff.jpg', { srgb: true, size: 0.28 }),
    TX.photo('rough_linen_nor.jpg', { size: 0.25 }), TX.photo('poly_wool_herringbone_nor.jpg', { size: 0.3 }),
    TX.photo('velour_velvet_nor.jpg', { size: 0.25 }),
    TX.photo('washed_grey_oak_veneer_diff.jpg', { srgb: true, size: 1 }), TX.photo('washed_grey_oak_veneer_nor.jpg', { size: 1 }),
  ]);

  const floorOak = await TX.plankFloor({ veneer: 'oak_veneer_01', seed: 13, tone: 0.97, variance: 0.06 });
  const deckTex = await TX.plankFloor({ veneer: 'washed_grey_oak_veneer', plankL: 2.4, plankW: 0.14, rows: 16, planksPerRow: 1, seed: 3, gap: 0.006, tone: 0.9, variance: 0.1, hasRough: false });
  const calacatta = TX.marble({ seed: 12, size: 1.4 });
  const calacattaFine = TX.marble({ seed: 29, size: 0.8, veins: 1.3 });
  const graniteTex = TX.granite({ size: 0.9 });
  const tiles = TX.limestoneTiles({});
  const tilesFloor = TX.limestoneTiles({ seed: 19, base: [178, 170, 158], grout: [150, 143, 133] });
  const trav = TX.travertine({ size: 0.9 });
  const rugWool = TX.wool({ color: [196, 186, 170], size: 0.6 });
  const rugWoolDark = TX.wool({ seed: 44, color: [150, 140, 126], size: 0.6 });

  const M = {};
  // --- architecture ---------------------------------------------------------------------
  M.wall = uv(phys({ color: PALETTE.wall, roughness: 0.92, normalMap: plasterN, normalScale: new THREE.Vector2(0.35, 0.35), roughnessMap: plasterR }), 1.6);
  M.wallDeep = uv(phys({ color: PALETTE.wallDeep, roughness: 0.92, normalMap: plasterN, normalScale: new THREE.Vector2(0.45, 0.45), roughnessMap: plasterR }), 1.6);
  M.wallAccent = uv(phys({ color: '#BFB3A3', roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.9, 0.9), roughnessMap: plasterR }), 1.2);
  M.wallSage = uv(phys({ color: '#A7AE9C', roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.7, 0.7), roughnessMap: plasterR }), 1.4);
  M.wallCap = phys({ color: '#3b3935', roughness: 0.9 });
  M.ceiling = uv(phys({ color: PALETTE.ceiling, roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.12, 0.12) }), 1.6);
  M.floorOak = uv(phys({ map: floorOak.map, normalMap: floorOak.normalMap, roughnessMap: floorOak.roughnessMap, roughness: 1, color: '#ffffff', clearcoat: 0.08, clearcoatRoughness: 0.55 }), 3.8);
  M.floorOak.userData.uv.aspect = floorOak.aspect;
  M.deck = uv(phys({ map: deckTex.map, normalMap: deckTex.normalMap, roughness: 0.8, color: '#c9c2b8' }), 2.4);
  M.tileWall = uv(phys({ map: tiles.map, normalMap: tiles.normalMap, roughness: 0.55, color: '#ffffff' }), 2.4);
  M.tileFloor = uv(phys({ map: tilesFloor.map, normalMap: tilesFloor.normalMap, roughness: 0.6, color: '#ffffff' }), 2.4);
  M.skirting = phys({ color: PALETTE.wallDeep, roughness: 0.6 });
  M.slab = phys({ color: '#d7d2ca', roughness: 0.95 });
  M.facade = uv(phys({ color: '#E6E2DA', roughness: 0.95, normalMap: plasterN, normalScale: new THREE.Vector2(0.5, 0.5) }), 1.6);

  // --- woods ---------------------------------------------------------------------------
  M.oak = uv(phys({ map: oakD, roughnessMap: oakR, normalMap: oakN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.85, color: '#e3d9cc' }), 1.2, 'v');
  M.oakLight = uv(phys({ map: lightD, roughnessMap: lightR, normalMap: lightN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.8, color: '#e8d6bf' }), 0.9, 'u');
  M.smokedOak = uv(phys({ map: darkD, roughnessMap: darkR, normalMap: darkN, normalScale: new THREE.Vector2(0.5, 0.5), roughness: 0.75, color: '#9a8a7c', clearcoat: 0.12, clearcoatRoughness: 0.5 }), 0.9, 'u');
  M.walnut = uv(phys({ map: walD, roughnessMap: walR, normalMap: walN, normalScale: new THREE.Vector2(0.4, 0.4), roughness: 0.6, color: '#5d4a40', clearcoat: 0.25, clearcoatRoughness: 0.35 }), 0.9, 'u');
  M.teak = uv(phys({ map: walD, roughness: 0.75, color: '#a57a55' }), 0.9, 'u');

  // --- stones --------------------------------------------------------------------------
  M.marble = uv(phys({ map: calacatta.map, roughnessMap: calacatta.roughnessMap, normalMap: calacatta.normalMap, normalScale: new THREE.Vector2(0.3, 0.3), roughness: 1, clearcoat: 0.4, clearcoatRoughness: 0.12 }), 1.4);
  M.marbleFine = uv(phys({ map: calacattaFine.map, roughnessMap: calacattaFine.roughnessMap, normalMap: calacattaFine.normalMap, roughness: 1, clearcoat: 0.4, clearcoatRoughness: 0.12 }), 0.8);
  M.granite = uv(phys({ map: graniteTex.map, roughness: 0.28, clearcoat: 0.5, clearcoatRoughness: 0.15 }), 0.9);
  M.travertine = uv(phys({ map: trav.map, normalMap: trav.normalMap, roughness: 0.6 }), 0.9);
  M.limestone = uv(phys({ map: tiles.map, roughness: 0.6 }), 2.4);
  M.concrete = uv(phys({ color: '#9d978d', roughness: 0.9, normalMap: plasterN, normalScale: new THREE.Vector2(0.8, 0.8) }), 1.6);

  // --- metals / glass ------------------------------------------------------------------
  M.bronze = phys({ color: '#8a6a48', metalness: 1, roughness: 0.34 });
  M.bronzeDark = phys({ color: '#5a4431', metalness: 1, roughness: 0.4 });
  M.brass = phys({ color: '#b8925f', metalness: 1, roughness: 0.28 });
  M.blackMetal = phys({ color: '#1c1c1b', metalness: 0.5, roughness: 0.42 });
  M.frame = phys({ color: '#2a2a29', metalness: 0.35, roughness: 0.5 });
  M.chrome = phys({ color: '#d8d8d8', metalness: 1, roughness: 0.08 });
  M.steel = phys({ color: '#9a9a98', metalness: 1, roughness: 0.3 });
  // Glass: the raster view uses a thin transparent coat (no screen-space transmission, which
  // conflicts with post-processing targets); the path tracer switches to true refraction.
  M.glass = phys({ color: '#f4f7f6', metalness: 0, roughness: 0.03, ior: 1.52, transparent: true, opacity: 0.1, depthWrite: false, envMapIntensity: 1.2 });
  M.glass.userData = { glass: true, pt: { transmission: 1, opacity: 1, transparent: false, thickness: 0.008 } };
  M.smokedGlass = phys({ color: '#3a3836', metalness: 0, roughness: 0.06, ior: 1.52, transparent: true, opacity: 0.55, depthWrite: false });
  M.smokedGlass.userData = { glass: true, pt: { transmission: 0.8, opacity: 1, transparent: false, thickness: 0.01, color: '#8f8a84' } };
  M.mirror = phys({ color: '#f4f4f4', metalness: 1, roughness: 0.015 });
  M.mirror.userData.mirror = true;

  // --- textiles ------------------------------------------------------------------------
  const fabric = (color, normal, nScale = 0.8, sheen = '#ffffff', size = 0.25, rough = 0.95) =>
    uv(phys({ color, roughness: rough, normalMap: normal, normalScale: new THREE.Vector2(nScale, nScale), sheen: 1, sheenColor: new THREE.Color(sheen), sheenRoughness: 0.75 }), size);
  M.boucle = uv(phys({ color: '#E7E1D6', map: teddyD, roughness: 1, normalMap: teddyN, normalScale: new THREE.Vector2(1.1, 1.1), sheen: 1, sheenColor: new THREE.Color('#f4efe6'), sheenRoughness: 0.9 }), 0.28);
  M.boucleSage = uv(phys({ color: '#8f9a85', map: teddyD, roughness: 1, normalMap: teddyN, normalScale: new THREE.Vector2(1.1, 1.1), sheen: 1, sheenColor: new THREE.Color('#aab59f'), sheenRoughness: 0.9 }), 0.28);
  M.linenGrey = fabric('#BDB6AB', linenN, 0.9, '#d9d3c8');
  M.linenIvory = fabric('#E4DDD0', linenN, 0.9, '#f3eee6');
  M.linenSage = fabric('#7F8B74', linenN, 0.9, '#a9b39e');
  M.linenTaupe = fabric('#9C8F80', linenN, 0.9, '#bcb0a2');
  M.linenCharcoal = fabric('#4A4845', linenN, 0.9, '#77736d');
  M.velvetSage = fabric('#5E6B55', velvetN, 0.6, '#9aa88e', 0.25, 0.8);
  M.velvetCognac = fabric('#8E5A3A', velvetN, 0.6, '#c08a64', 0.25, 0.8);
  M.woolGreige = fabric('#A89D8E', woolN, 0.8, '#c9bfb1', 0.3);
  M.leatherCognac = phys({ color: '#7a4b2f', roughness: 0.55, clearcoat: 0.3, clearcoatRoughness: 0.45 });
  M.leatherBlack = phys({ color: '#1f1d1b', roughness: 0.5, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  M.curtain = uv(phys({ color: '#E3DCCF', roughness: 1, normalMap: linenN, normalScale: new THREE.Vector2(0.6, 0.6), sheen: 1, sheenColor: new THREE.Color('#fbf6ee'), sheenRoughness: 0.6, side: THREE.DoubleSide }), 0.25);
  M.curtainDim = uv(phys({ color: '#B8AE9F', roughness: 1, normalMap: linenN, normalScale: new THREE.Vector2(0.6, 0.6), sheen: 1, sheenColor: new THREE.Color('#d6cdbf'), sheenRoughness: 0.6, side: THREE.DoubleSide }), 0.25);
  M.rug = uv(phys({ map: rugWool, roughness: 1, normalMap: woolN, normalScale: new THREE.Vector2(1.2, 1.2), sheen: 1, sheenColor: new THREE.Color('#e2d9ca'), sheenRoughness: 0.9 }), 0.6);
  M.rugDark = uv(phys({ map: rugWoolDark, roughness: 1, normalMap: woolN, normalScale: new THREE.Vector2(1.2, 1.2), sheen: 1, sheenColor: new THREE.Color('#b1a797'), sheenRoughness: 0.9 }), 0.6);
  M.bedding = fabric('#EEE9E0', linenN, 0.7, '#ffffff', 0.25);
  M.beddingSand = fabric('#D9CFBF', linenN, 0.7, '#efe6d8', 0.25);
  M.throwSage = fabric('#65705C', woolN, 1.0, '#8d9883', 0.3);
  M.towel = fabric('#E6DFD3', woolN, 1.3, '#f5efe6', 0.2);
  M.towelTaupe = fabric('#A59888', woolN, 1.3, '#c7baa9', 0.2);

  // --- ceramics / misc -----------------------------------------------------------------
  M.ceramicWhite = phys({ color: '#F4F2EE', roughness: 0.12, clearcoat: 0.6, clearcoatRoughness: 0.1 });
  M.stoneware = phys({ color: '#3d3c39', roughness: 0.7 });
  M.stonewareSage = phys({ color: '#7d876f', roughness: 0.65 });
  M.stonewareSand = phys({ color: '#cbbfae', roughness: 0.8 });
  M.stonewareCharcoal = phys({ color: '#2a2927', roughness: 0.55, clearcoat: 0.2 });
  M.lacquerGreige = phys({ color: '#9A9185', roughness: 0.45, clearcoat: 0.3, clearcoatRoughness: 0.4 });
  M.doorLeaf = uv(phys({ map: darkD, roughnessMap: darkR, normalMap: darkN, normalScale: new THREE.Vector2(0.4, 0.4), color: '#b8a99a', roughness: 0.7 }), 0.9, 'u');
  M.matteBlack = phys({ color: '#141414', roughness: 0.6 });
  M.plasticWhite = phys({ color: '#efefec', roughness: 0.35 });
  M.appliance = phys({ color: '#101010', metalness: 0.3, roughness: 0.25, clearcoat: 0.8, clearcoatRoughness: 0.08 });
  M.screen = phys({ color: '#050505', roughness: 0.1, clearcoat: 1, clearcoatRoughness: 0.05 });
  M.paper = phys({ color: '#efe9de', roughness: 0.95 });
  M.soil = phys({ color: '#3b3026', roughness: 1 });
  M.pebbles = phys({ color: '#bdb6aa', roughness: 0.7 });
  M.candle = phys({ color: '#efe8dc', roughness: 0.6 });
  M.candle.userData.pt = { transmission: 0.2, thickness: 0.05 };
  M.leaf = phys({ color: '#56643f', roughness: 0.6, side: THREE.DoubleSide, sheen: 0.4, sheenColor: new THREE.Color('#9fb07f') });
  M.lemon = phys({ color: '#d9b43c', roughness: 0.55 });
  M.apple = phys({ color: '#8a2f22', roughness: 0.35, clearcoat: 0.5 });

  // --- emissive ------------------------------------------------------------------------
  M.lampShade = phys({ color: '#f3ebdd', roughness: 0.9, emissive: new THREE.Color('#ffd9a6'), emissiveIntensity: 0, side: THREE.DoubleSide });
  M.lampShade.userData.pt = { transmission: 0.35, thickness: 0.01 };
  M.lampShade.userData.emissiveOn = 0.7;
  M.opal = phys({ color: '#f7f1e8', roughness: 0.4, emissive: new THREE.Color('#ffdcb0'), emissiveIntensity: 0 });
  M.opal.userData.emissiveOn = 2.2;
  M.ledStrip = phys({ color: '#fff3e0', roughness: 0.5, emissive: new THREE.Color('#ffcf94'), emissiveIntensity: 0 });
  M.ledStrip.userData.emissiveOn = 2.5;
  M.downlight = phys({ color: '#fbf6ec', roughness: 0.3, emissive: new THREE.Color('#fff0dc'), emissiveIntensity: 0 });
  M.downlight.userData.emissiveOn = 3;
  M.candleFlame = phys({ color: '#ffb35c', emissive: new THREE.Color('#ff9a3c'), emissiveIntensity: 0 });
  M.candleFlame.userData.emissiveOn = 5;

  for (const [k, m] of Object.entries(M)) m.name = k;
  return M;
}

/** Artwork material: canvas painting with fine gesso normal. */
export function artMaterial(kind, seed) {
  const tex = TX.artwork(kind, { seed });
  const m = new THREE.MeshPhysicalMaterial({ map: tex, roughness: kind === 'ink' ? 0.9 : 0.75 });
  if (kind === 'relief') { m.normalMap = TX.reliefNormal({ seed }); m.normalScale = new THREE.Vector2(1.6, 1.6); }
  m.name = 'art-' + kind;
  return m;
}
