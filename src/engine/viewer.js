// Real-time renderer (PBR + IBL + soft shadows + GTAO + bloom + SMAA), camera modes, moods and
// the bridge to the progressive GPU path tracer.
import * as THREE from 'three';
import {
  OrbitControls, HDRLoader, EffectComposer, RenderPass, GTAOPass, UnrealBloomPass, SMAAPass, OutputPass, RectAreaLightUniformsLib,
} from '../../vendor/three-addons.js';
import { OFFSET, APARTMENT_BOUNDS, ROOM_HEIGHT } from '../core/geometry.js';
import { setMaxAnisotropy } from './textures.js';
import { PathTracer } from './pathtracer.js';

export const MOODS = {
  day: { label: 'Tageslicht', hdri: 'urban_courtyard_02', env: 1.0, bg: 1.0, sun: 3.2, sunColor: '#fff4e6', sunDir: [0.62, 0.62, 0.48], lamps: 0, exposure: 1.0, rot: 0.6 },
  golden: { label: 'Goldene Stunde', hdri: 'the_sky_is_on_fire', env: 0.5, bg: 0.9, sun: 2.0, sunColor: '#ffbf85', sunDir: [-0.35, 0.28, 0.89], lamps: 0.35, exposure: 0.95, rot: 2.4 },
  evening: { label: 'Abend', hdri: 'the_sky_is_on_fire', env: 0.05, bg: 0.1, sun: 0, sunColor: '#ffffff', sunDir: [0, 1, 0], lamps: 1, exposure: 0.95, rot: 2.4 },
};

export const STATIONS = [
  { id: 'overview', label: 'Übersicht (Dollhouse)', mode: 'orbit', pos: [0.8, 21, 28], target: [10.4, -0.6, 14.4], fov: 36 },
  { id: 'top', label: 'Draufsicht', mode: 'orbit', pos: [10.2, 27, 14.4], target: [10.2, 0, 13.7], fov: 36 },
  { id: 'living', label: 'Wohnen · Blick zur Medienwand', mode: 'walk', pos: [8.35, 1.38, 14.55], target: [6.2, 1.0, 9.6], fov: 62 },
  { id: 'sofa', label: 'Wohnen · Sofa & Fensterfront', mode: 'walk', pos: [6.55, 1.5, 9.95], target: [9.4, 0.7, 13.4], fov: 66 },
  { id: 'dining', label: 'Essen · Sideboard & Pendel', mode: 'walk', pos: [8.9, 1.5, 12.7], target: [7.6, 0.95, 16.9], fov: 62 },
  { id: 'hall', label: 'Diele · Eingang', mode: 'walk', pos: [9.35, 1.55, 8.35], target: [13.0, 1.1, 6.3], fov: 64 },
  { id: 'kitchen', label: 'Küche', mode: 'walk', pos: [5.85, 1.5, 16.2], target: [3.0, 1.05, 16.9], fov: 64 },
  { id: 'bedroom', label: 'Schlafen', mode: 'walk', pos: [6.35, 1.5, 17.6], target: [9.4, 0.9, 19.9], fov: 64 },
  { id: 'wardrobe', label: 'Schlafen · Blick zum Schrank', mode: 'walk', pos: [8.7, 1.45, 21.1], target: [6.0, 1.1, 18.9], fov: 64 },
  { id: 'office', label: 'Arbeiten / Gäste', mode: 'walk', pos: [14.05, 1.5, 10.1], target: [16.5, 0.85, 7.9], fov: 66 },
  { id: 'bath', label: 'Bad', mode: 'walk', pos: [14.05, 1.55, 7.2], target: [16.8, 1.0, 5.9], fov: 70 },
  { id: 'guestbath', label: 'Dusche / Gäste-WC', mode: 'walk', pos: [11.35, 1.55, 7.25], target: [9.8, 1.1, 5.9], fov: 72 },
  { id: 'balcony', label: 'Balkon 1', mode: 'walk', pos: [13.1, 1.55, 10.4], target: [10.6, 0.8, 9.6], fov: 66 },
];

export const LAMP_SCALE = 0.08;
const w3 = ([x, y, z]) => new THREE.Vector3(x - OFFSET.x, y, z - OFFSET.y);

export class Viewer {
  constructor(container) {
    this.container = container;
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1;
    r.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(r.domElement);
    setMaxAnisotropy(r.capabilities.getMaxAnisotropy());
    RectAreaLightUniformsLib.init();

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
    this.controls = new OrbitControls(this.camera, r.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.mode = 'orbit';
    this.mood = 'day';
    this.quality = 'high';
    this.keys = new Set();
    this.clock = new THREE.Clock();
    this.hdris = new Map();
    this.pmrem = new THREE.PMREMGenerator(r);
    this.listeners = new Set();

    // sun
    const sun = this.sun = new THREE.DirectionalLight('#fff4e6', 3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    const b = APARTMENT_BOUNDS, span = Math.max(b.maxX - b.minX, b.maxY - b.minY) * 0.62;
    Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 1, far: 80 });
    sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.02; sun.shadow.radius = 3;
    this.center = new THREE.Vector3((b.minX + b.maxX) / 2 - OFFSET.x, 0, (b.minY + b.maxY) / 2 - OFFSET.y);
    sun.target.position.copy(this.center);
    this.scene.add(sun, sun.target);
    // Raster stand-in for floor/wall bounce light: bright warm "ground" colour lifts ceilings.
    this.fill = new THREE.HemisphereLight('#8f8a82', '#efe3d2', 0.8);
    this.scene.add(this.fill);

    // backdrop for the dollhouse view
    this.studioBg = new THREE.Color('#e9e5de');
    const ground = this.ground = new THREE.Mesh(new THREE.CircleGeometry(40, 64), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.29; ground.receiveShadow = true;
    this.scene.add(ground);

    this.setupComposer();
    this.pathTracer = new PathTracer(this);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.resizeObserver.observe(container);
    this.resize();

    this.controls.addEventListener('change', () => this.onCameraChange());
    window.addEventListener('keydown', (e) => { if (!e.target.closest('input,textarea,select')) this.keys.add(e.key.toLowerCase()); });
    window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()));
    r.domElement.addEventListener('pointerdown', (e) => { this._down = [e.clientX, e.clientY]; });
    r.domElement.addEventListener('pointerup', (e) => {
      if (this._down && Math.hypot(e.clientX - this._down[0], e.clientY - this._down[1]) < 4) this.pick(e);
    });
    r.setAnimationLoop(() => this.loop());
  }

  setupComposer() {
    const r = this.renderer;
    const composer = this.composer = new EffectComposer(r, new THREE.WebGLRenderTarget(1, 1, { type: THREE.HalfFloatType, samples: 0 }));
    this.renderPass = new RenderPass(this.scene, this.camera);
    composer.addPass(this.renderPass);
    this.gtao = new GTAOPass(this.scene, this.camera, 1, 1);
    this.gtao.output = GTAOPass.OUTPUT.Default;
    this.gtao.blendIntensity = 0.85;
    this.gtao.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.2, thickness: 1.2, scale: 1.0, samples: 16 });
    this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 16 });
    composer.addPass(this.gtao);
    this.bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.1, 0.45, 1.4);
    composer.addPass(this.bloom);
    this.smaa = new SMAAPass();
    composer.addPass(this.smaa);
    this.output = new OutputPass();
    composer.addPass(this.output);
  }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(type, data) { for (const fn of this.listeners) fn(type, data); }

  setApartment(apartment) {
    this.apartment = apartment;
    this.scene.add(apartment.root);
    this.mirrors = [];
    apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.mirror) this.mirrors.push(o); });
    this.applyMood(this.mood);
  }

  /**
   * Raster mirrors: one-off cube capture of the room in front of each mirror, so mirrors show
   * the interior instead of the outdoor HDRI. (The path tracer computes true reflections.)
   */
  captureMirrors() {
    if (!this.mirrors?.length) return;
    const ceil = this.apartment.architecture.getObjectByName('ceilings'), wasVisible = ceil.visible;
    ceil.visible = true;
    const bg = this.scene.background; this.scene.background = this.hdriTex;
    for (const m of this.mirrors) {
      if (!m.userData.cube) {
        m.userData.cube = new THREE.WebGLCubeRenderTarget(256, { type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
        m.userData.cubeCam = new THREE.CubeCamera(0.05, 40, m.userData.cube);
        m.material = m.material.clone();
        m.material.envMap = m.userData.cube.texture;
        m.material.userData = { ...m.material.userData, mirror: true };
      }
      const cam = m.userData.cubeCam, n = new THREE.Vector3(0, 0, 1).transformDirection(m.matrixWorld);
      m.getWorldPosition(cam.position).add(n.multiplyScalar(0.35));
      m.visible = false;
      cam.update(this.renderer, this.scene);
      m.visible = true;
    }
    this.scene.background = bg;
    ceil.visible = wasVisible;
  }

  async loadHDRI(name) {
    if (this.hdris.has(name)) return this.hdris.get(name);
    const p = new HDRLoader().loadAsync(`./assets/lib/hdri/${name}.hdr`).then((tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      return { tex, env: this.pmrem.fromEquirectangular(tex).texture };
    });
    this.hdris.set(name, p);
    return p;
  }

  async applyMood(name) {
    const m = MOODS[name]; this.mood = name;
    const { tex, env } = await this.loadHDRI(m.hdri);
    const s = this.scene;
    s.environment = env;
    s.environmentIntensity = m.env;
    s.environmentRotation.set(0, m.rot, 0);
    s.backgroundRotation.set(0, m.rot, 0);
    this.hdriTex = tex;
    this.sun.intensity = m.sun;
    this.sun.visible = m.sun > 0;
    this.sun.color.set(m.sunColor);
    const d = new THREE.Vector3(...m.sunDir).normalize().multiplyScalar(30);
    this.sun.position.copy(this.center).add(d);
    this.fill.intensity = { day: 0.85, golden: 0.45, evening: 0.12 }[name];
    this.renderer.toneMappingExposure = m.exposure * (this.exposureTrim ?? 1);
    this.setLamps(m.lamps);
    this.captureMirrors();
    this.updateBackground();
    this.pathTracer.invalidate('environment');
    this.emit('mood', name);
  }

  setExposure(v) { this.exposureTrim = v; this.renderer.toneMappingExposure = MOODS[this.mood].exposure * v; this.pathTracer.invalidate('camera'); }

  setLamps(level) {
    if (!this.apartment) return;
    // Photometric values (lm → cd / nits) scaled into the renderer's exposure range, in which the
    // sun is ≈ 3 instead of ~100 000 lx. Keeps lamps, daylight and path tracer consistent.
    for (const l of this.apartment.lights) l.intensity = l.userData.candela * level * LAMP_SCALE;
    const mats = new Set();
    this.apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.emissiveOn) mats.add(o.material); });
    for (const m of mats) m.emissiveIntensity = m.userData.emissiveOn * level;
    this.pathTracer.invalidate('lights');
  }

  updateBackground() {
    const s = this.scene;
    if (this.mode === 'orbit') {
      s.background = this.studioBg;
      s.backgroundIntensity = 1;
    } else {
      s.background = this.hdriTex;
      s.backgroundIntensity = MOODS[this.mood].bg;
      s.backgroundBlurriness = 0.0;
    }
    this.ground.visible = this.mode === 'orbit';
  }

  setMode(mode) {
    this.mode = mode;
    this.apartment?.setCeilingsVisible(mode === 'walk');
    const c = this.controls;
    if (mode === 'orbit') {
      c.enableZoom = true; c.enablePan = true; c.minDistance = 2; c.maxDistance = 45; c.maxPolarAngle = Math.PI * 0.49;
      c.rotateSpeed = 0.8;
    } else {
      c.enableZoom = false; c.enablePan = false; c.minDistance = 0; c.maxDistance = Infinity; c.maxPolarAngle = Math.PI;
      c.rotateSpeed = -0.35;
    }
    this.updateBackground();
    this.pathTracer.invalidate('scene');
    this.emit('mode', mode);
  }

  /** Camera position that frames the whole apartment from direction (az° from south towards west = negative, el°). */
  frameAll(az = -35, el = 42) {
    const box = new THREE.Box3().setFromObject(this.apartment.architecture.getObjectByName('floors'));
    box.max.y = ROOM_HEIGHT;
    const center = box.getCenter(new THREE.Vector3());
    const dir = new THREE.Vector3(Math.sin(THREE.MathUtils.degToRad(az)) * Math.cos(THREE.MathUtils.degToRad(el)), Math.sin(THREE.MathUtils.degToRad(el)), Math.cos(THREE.MathUtils.degToRad(az)) * Math.cos(THREE.MathUtils.degToRad(el)));
    const cam = this.camera.clone(); cam.fov = 36; cam.aspect = this.camera.aspect; cam.updateProjectionMatrix();
    const pts = [];
    for (const x of [box.min.x, box.max.x]) for (const y of [box.min.y, box.max.y]) for (const z of [box.min.z, box.max.z]) pts.push(new THREE.Vector3(x, y, z));
    let target = center.clone(), d = 30;
    for (let it = 0; it < 6; it++) {
      let lo = 5, hi = 120;
      for (let k = 0; k < 30; k++) {
        d = (lo + hi) / 2;
        cam.position.copy(target).addScaledVector(dir, d); cam.lookAt(target); cam.updateMatrixWorld();
        const ext = pts.reduce((m, p) => { const q = p.clone().project(cam); return Math.max(m, Math.abs(q.x), Math.abs(q.y)); }, 0);
        if (ext > 0.9) lo = d; else hi = d;
      }
      // recentre on the projected bounds
      const q = pts.map((p) => p.clone().project(cam));
      const cx = (Math.min(...q.map((v) => v.x)) + Math.max(...q.map((v) => v.x))) / 2, cy = (Math.min(...q.map((v) => v.y)) + Math.max(...q.map((v) => v.y))) / 2;
      const shift = new THREE.Vector3(cx, cy, q[0].z).unproject(cam).sub(new THREE.Vector3(0, 0, q[0].z).unproject(cam));
      target.add(shift);
    }
    const pos = target.clone().addScaledVector(dir, d);
    return { id: 'overview', mode: 'orbit', pos: [pos.x + OFFSET.x, pos.y, pos.z + OFFSET.y], target: [target.x + OFFSET.x, target.y, target.z + OFFSET.y], fov: 36 };
  }

  goto(station, animate = true) {
    if (station === 'overview' && this.apartment) station = { ...STATIONS[0], ...this.frameAll() };
    if (station === 'top' && this.apartment) station = { ...STATIONS[1], ...this.frameAll(0, 89), id: 'top' };
    const st = typeof station === 'string' ? STATIONS.find((s) => s.id === station) : station;
    if (!st) return;
    if (st.mode !== this.mode) this.setMode(st.mode);
    const pos = w3(st.pos), target = w3(st.target);
    if (st.mode === 'walk') {
      // orbit pivot sits a few cm in front of the eye → dragging = looking around
      const dir = target.clone().sub(pos).normalize();
      this._walkTarget = pos.clone().add(dir.multiplyScalar(0.05));
    }
    const endTarget = st.mode === 'walk' ? this._walkTarget : target;
    this.camera.fov = st.fov ?? 45; this.camera.updateProjectionMatrix();
    this.station = st.id;
    this.emit('station', st.id);
    if (!animate) { this.camera.position.copy(pos); this.controls.target.copy(endTarget); this.controls.update(); this.onCameraChange(); return; }
    const p0 = this.camera.position.clone(), t0 = this.controls.target.clone(), start = performance.now(), dur = 900;
    this._anim = (now) => {
      const k = Math.min(1, (now - start) / dur), e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
      this.camera.position.lerpVectors(p0, pos, e);
      this.controls.target.lerpVectors(t0, endTarget, e);
      this.controls.update();
      if (k >= 1) this._anim = null;
    };
  }

  onCameraChange() { this.pathTracer.invalidate('camera'); }

  resize() {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.renderer.domElement.style.width = '100%';
    this.renderer.domElement.style.height = '100%';
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    const pr = this.renderer.getPixelRatio();
    this.composer.setSize(w, h);
    this.composer.setPixelRatio(pr);
    this.pathTracer.invalidate('camera');
  }

  setQuality(q) {
    this.quality = q;
    const pr = q === 'high' ? Math.min(window.devicePixelRatio, 2) : 1;
    this.renderer.setPixelRatio(pr);
    this.gtao.enabled = q !== 'low';
    this.sun.shadow.mapSize.set(q === 'low' ? 2048 : 4096, q === 'low' ? 2048 : 4096);
    this.sun.shadow.map?.dispose(); this.sun.shadow.map = null;
    this.resize();
  }

  walkUpdate(dt) {
    if (this.mode !== 'walk' || !this.keys.size) return;
    const speed = (this.keys.has('shift') ? 2.4 : 1.2) * dt;
    const fwd = new THREE.Vector3(); this.camera.getWorldDirection(fwd); fwd.y = 0; fwd.normalize();
    const right = new THREE.Vector3().crossVectors(fwd, new THREE.Vector3(0, 1, 0));
    const mv = new THREE.Vector3();
    if (this.keys.has('w') || this.keys.has('arrowup')) mv.add(fwd);
    if (this.keys.has('s') || this.keys.has('arrowdown')) mv.sub(fwd);
    if (this.keys.has('d') || this.keys.has('arrowright')) mv.add(right);
    if (this.keys.has('a') || this.keys.has('arrowleft')) mv.sub(right);
    if (this.keys.has('e')) mv.y += 1;
    if (this.keys.has('q')) mv.y -= 1;
    if (!mv.lengthSq()) return;
    mv.normalize().multiplyScalar(speed);
    this.camera.position.add(mv); this.controls.target.add(mv);
    this.camera.position.y = THREE.MathUtils.clamp(this.camera.position.y, 0.4, ROOM_HEIGHT - 0.15);
    this.controls.target.y = THREE.MathUtils.clamp(this.controls.target.y, 0.3, ROOM_HEIGHT);
    this.controls.update();
  }

  pick(e) {
    if (!this.apartment) return;
    const rect = this.renderer.domElement.getBoundingClientRect();
    const ndc = new THREE.Vector2(((e.clientX - rect.left) / rect.width) * 2 - 1, -((e.clientY - rect.top) / rect.height) * 2 + 1);
    const ray = new THREE.Raycaster(); ray.setFromCamera(ndc, this.camera);
    const hits = ray.intersectObject(this.apartment.furniture, true).filter((h) => h.object.visible && !h.object.material?.userData?.glass);
    const id = hits[0]?.object.userData.itemId ?? null;
    this.select(id);
    this.emit('pick', id);
  }

  select(id) {
    if (this.selHelper) { this.scene.remove(this.selHelper); this.selHelper = null; }
    if (!id || !this.apartment) return;
    const it = this.apartment.items.find((i) => i.id === id);
    if (!it) return;
    const box = new THREE.Box3().setFromObject(it.object);
    this.selHelper = new THREE.Box3Helper(box, new THREE.Color('#b0875a'));
    this.scene.add(this.selHelper);
  }

  focusItem(id) {
    const it = this.apartment?.items.find((i) => i.id === id);
    if (!it) return;
    const box = new THREE.Box3().setFromObject(it.object), c = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3()).length();
    if (this.mode !== 'orbit') this.setMode('orbit');
    const dir = this.camera.position.clone().sub(this.controls.target).normalize();
    const pos = c.clone().add(dir.multiplyScalar(Math.max(2.5, size * 1.8)));
    pos.y = Math.max(pos.y, c.y + 1.2);
    this.goto({ id: 'item', mode: 'orbit', pos: [pos.x + OFFSET.x, pos.y, pos.z + OFFSET.y], target: [c.x + OFFSET.x, c.y, c.z + OFFSET.y], fov: this.camera.fov });
    this.select(id);
  }

  loop() {
    const dt = Math.min(0.05, this.clock.getDelta());
    if (this._anim) this._anim(performance.now());
    this.walkUpdate(dt);
    this.controls.update();
    if (this.pathTracer.active) {
      this.pathTracer.render();
    } else {
      if (this.selHelper) this.selHelper.visible = true;
      this.composer.render(dt);
    }
    this.emit('frame', dt);
  }

  screenshot(scale = 1) {
    if (!this.pathTracer.active) this.composer.render(0);
    return this.renderer.domElement.toDataURL('image/png');
  }
}
