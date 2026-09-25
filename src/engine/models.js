// GLTF model library (Poly Haven CC0 plants and ceramics). Loads once, hands out clones.
import * as THREE from 'three';
import { GLTFLoader } from '../../vendor/three-addons.js';

const BASE = './assets/lib/models/';

/** name → [file, node names to include (null = all), material tweak] */
const CATALOG = {
  pachira: ['pachira_aquatica_01', ['pachira_aquatica_01_bark_d', 'pachira_aquatica_01_leaves_d']],
  pachiraMid: ['pachira_aquatica_01', ['pachira_aquatica_01_bark_c', 'pachira_aquatica_01_leaves_c']],
  pachiraSmall: ['pachira_aquatica_01', ['pachira_aquatica_01_bark_a', 'pachira_aquatica_01_leaves_a']],
  alocasia: ['potted_plant_02', ['potted_plant_02_leaves']],
  succulent: ['potted_plant_04', null],
  calathea: ['calathea_orbifolia_01', ['calathea_orbifolia_01_a']],
  calatheaSmall: ['calathea_orbifolia_01', ['calathea_orbifolia_01_b']],
  fern: ['fern_02', ['fern_02_b']],
  vaseA: ['ceramic_vase_01', null],
  vaseB: ['ceramic_vase_02', null],
  vaseC: ['ceramic_vase_04', null],
  branchA: ['dry_branches_medium_01', ['dry_branches_medium_01_a']],
  branchB: ['dry_branches_medium_01', ['dry_branches_medium_01_b']],
};

export class ModelLibrary {
  constructor() { this.files = new Map(); this.parts = new Map(); }

  async load(onProgress) {
    const loader = new GLTFLoader();
    const files = [...new Set(Object.values(CATALOG).map(([f]) => f))];
    let done = 0;
    await Promise.all(files.map(async (f) => {
      try {
        const gltf = await loader.loadAsync(`${BASE}${f}/${f}.gltf`);
        gltf.scene.updateMatrixWorld(true);
        this.files.set(f, gltf.scene);
      } catch (e) {
        console.warn('Modell nicht geladen:', f, e);
      }
      onProgress?.(++done / files.length);
    }));
    for (const [name, [file, nodes]] of Object.entries(CATALOG)) {
      const scene = this.files.get(file);
      if (!scene) continue;
      const g = new THREE.Group();
      scene.children.forEach((c) => {
        if (nodes && !nodes.includes(c.name)) return;
        const cl = c.clone(true);
        g.add(cl);
      });
      // normalise: remove the per-variant x offset so the group is centred at its footprint
      const bb = new THREE.Box3().setFromObject(g), cx = (bb.min.x + bb.max.x) / 2, cz = (bb.min.z + bb.max.z) / 2;
      g.children.forEach((c) => { c.position.x -= cx; c.position.z -= cz; });
      g.traverse((o) => {
        if (!o.isMesh) return;
        o.castShadow = true; o.receiveShadow = true;
        o.geometry.userData.shared = true;
        o.userData.keepUV = true;
        const m = o.material;
        if (m && m.isMeshStandardMaterial) {
          // foliage: alpha-tested, double sided, no transparency sorting
          if (m.alphaMap || m.transparent || /leav|leaf|calathea|fern|pachira_aquatica_01_leaves/i.test(m.name)) {
            m.transparent = false; m.alphaTest = 0.5; m.side = THREE.DoubleSide;
          }
          m.envMapIntensity = 1;
        }
      });
      this.parts.set(name, g);
    }
  }

  /** Returns a deep clone (materials shared). */
  get(name) {
    const p = this.parts.get(name);
    return p ? p.clone(true) : null;
  }
}
