// Real-time renderer (PBR + IBL + soft shadows + GTAO + bloom + SMAA), camera modes, moods and
// the bridge to the progressive GPU path tracer.
//
// Performance model
//  · Render on demand: frames are only drawn while something changes (camera, animation,
//    mood, style, selection). A still image costs nothing.
//  · Two-tier quality: while the camera moves, GTAO is skipped; once it settles one refined
//    frame with ambient occlusion is drawn.
//  · Static shadows: the scene is static, so the sun's shadow map is rendered only after scene,
//    mood or style changes, not every frame.
//  · Light budget (lighting.js): fixed slot count, only lamps relevant for the current room.
//  · Adaptive resolution: if frames during motion stay slow, the pixel ratio steps down (and
//    back up once there is headroom).
//  · Local room probe: in walk mode the room around the camera is captured into a small cube
//    map (two bounces) and used as image-based light → realistic indirect light and reflections
//    of the actual room instead of the outdoor sky.
import * as THREE from 'three';
import {
  OrbitControls, HDRLoader, EffectComposer, RenderPass, GTAOPass, UnrealBloomPass, SMAAPass, OutputPass, RectAreaLightUniformsLib,
} from '../../vendor/three-addons.js';
import { OFFSET, APARTMENT_BOUNDS, ROOM_HEIGHT } from '../core/geometry.js';
import { setMaxAnisotropy } from './textures.js';
import { PathTracer } from './pathtracer.js';
import { LightRig, LAMP_SCALE } from './lighting.js';

export { LAMP_SCALE };

export const MOODS = {
  day: { label: 'Tageslicht', hdri: 'urban_courtyard_02', env: 1.0, bg: 1.0, sun: 3.2, sunColor: '#fff4e6', sunDir: [0.62, 0.62, 0.48], lamps: 0, exposure: 1.0, key: 0.2, maxExp: 4.5, fill: [0.85, 0.12], rot: 0.6 },
  golden: { label: 'Goldene Stunde', hdri: 'the_sky_is_on_fire', env: 0.5, bg: 0.9, sun: 2.0, sunColor: '#ffbf85', sunDir: [-0.35, 0.28, 0.89], lamps: 0.35, exposure: 0.95, key: 0.17, maxExp: 3.5, fill: [0.45, 0.06], rot: 2.4 },
  evening: { label: 'Abend', hdri: 'the_sky_is_on_fire', env: 0.05, bg: 0.1, sun: 0, sunColor: '#ffffff', sunDir: [0, 1, 0], lamps: 1, exposure: 0.95, key: 0.1, maxExp: 3, fill: [0.12, 0.015], rot: 2.4 },
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

const ENV_SIZE = 256;           // cube size of every environment → identical shader variants
const PROBE_MOVE = 1.0;         // re-capture the room probe after this many metres
const SETTLE_MS = 160;          // camera must be still this long before the refined frame
const w3 = ([x, y, z]) => new THREE.Vector3(x - OFFSET.x, y, z - OFFSET.y);

export class Viewer {
  static MOODS = MOODS;
  constructor(container) {
    this.container = container;
    const r = this.renderer = new THREE.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    this.basePR = Math.min(window.devicePixelRatio, 2);
    this.prScale = 1;
    r.setPixelRatio(this.basePR);
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFSoftShadowMap;
    r.shadowMap.autoUpdate = false;
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
    this.needsRender = true;
    this.refined = false;
    this.lastMove = 0;
    this.frameTimes = [];
    this.stats = { frames: 0, refined: 0, probes: 0 };

    // sun
    const sun = this.sun = new THREE.DirectionalLight('#fff4e6', 3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    const b = APARTMENT_BOUNDS, span = Math.max(b.maxX - b.minX, b.maxY - b.minY) * 0.62;
    Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 1, far: 80 });
    sun.shadow.bias = -0.00004; sun.shadow.normalBias = 0.025; sun.shadow.radius = 3;
    this.center = new THREE.Vector3((b.minX + b.maxX) / 2 - OFFSET.x, 0, (b.minY + b.maxY) / 2 - OFFSET.y);
    sun.target.position.copy(this.center);
    this.scene.add(sun, sun.target);
    // Raster stand-in for multi-bounce light; weak in walk mode where the room probe takes over.
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
    window.addEventListener('keydown', (e) => { if (!e.target.closest('input,textarea,select')) { this.keys.add(e.key.toLowerCase()); this.invalidate(); } });
    window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => this.keys.clear());
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
    this.gtao.updateGtaoMaterial({ radius: 0.35, distanceExponent: 1.2, thickness: 1.2, scale: 1.0, samples: 12 });
    this.gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
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

  /** Requests a new frame (and a refined one after it). */
  invalidate() { this.needsRender = true; this.refined = false; }
  /** Scene content changed: shadows, mirrors and probe must be re-rendered as well. */
  sceneChanged() { this.renderer.shadowMap.needsUpdate = true; this.probeDirty = true; this.invalidate(); }

  /**
   * Replaces the apartment (initial load and style switch). Shader programs are compiled
   * asynchronously first (parallel where supported), then shadows, mirrors and probe follow.
   */
  async setApartment(apartment) {
    this.suspended = true;
    try {
      if (this.apartment) { this.select(null); this.apartment.dispose(); this.pathTracer.stop(); }
      this.apartment = apartment;
      this.scene.add(apartment.root);
      this.mirrors = [];
      apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.mirror) this.mirrors.push(o); });
      this.rig = new LightRig(apartment);
      this.emissive = new Set();
      apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.emissiveOn) this.emissive.add(o.material); });
      const m = MOODS[this.mood];
      const { env } = await this.loadHDRI(m.hdri);
      this.scene.environment = env;
      this.rig.setLevel(m.lamps);
      apartment.setCeilingsVisible(true);
      await this.precompile(true);
      apartment.setCeilingsVisible(this.mode === 'walk');
      this.probeDirty = true;
      await this.applyMood(this.mood);
    } finally {
      this.suspended = false;
      this.invalidate();
    }
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
        m.userData.cube = new THREE.WebGLCubeRenderTarget(128, { type: THREE.HalfFloatType, generateMipmaps: true, minFilter: THREE.LinearMipmapLinearFilter });
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

  /** HDRI → (equirect for background/path tracer, 256² cube PMREM for image-based light). */
  async loadHDRI(name) {
    if (this.hdris.has(name)) return this.hdris.get(name);
    const p = new HDRLoader().loadAsync(`./assets/lib/hdri/${name}.hdr`).then((tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      const cube = new THREE.WebGLCubeRenderTarget(ENV_SIZE, { type: THREE.HalfFloatType }).fromEquirectangularTexture(this.renderer, tex);
      const env = this.pmrem.fromCubemap(cube.texture).texture;
      cube.dispose();
      return { tex, env };
    });
    this.hdris.set(name, p);
    return p;
  }

  async applyMood(name) {
    const m = MOODS[name]; this.mood = name;
    const { tex, env } = await this.loadHDRI(m.hdri);
    const s = this.scene;
    this.hdriEnv = env;
    this.hdriTex = tex;
    s.environmentRotation.set(0, m.rot, 0);
    s.backgroundRotation.set(0, m.rot, 0);
    this.sun.intensity = m.sun;
    this.sun.visible = m.sun > 0;
    this.sun.color.set(m.sunColor);
    const d = new THREE.Vector3(...m.sunDir).normalize().multiplyScalar(30);
    this.sun.position.copy(this.center).add(d);
    const variant = (m.lamps > 0) !== (this.rig.level > 0) || !s.environment;
    this.setLamps(m.lamps);
    if (variant && !this.suspended) { s.environment = env; await this.precompile(); }
    this.sceneChanged();
    this.applyEnvironment();
    this.captureMirrors();
    this.updateBackground();
    this.pathTracer.invalidate('environment');
    this.emit('mood', name);
  }

  /** Environment + exposure for the current mode: HDRI outside, room probe inside. */
  applyEnvironment() {
    const m = MOODS[this.mood], s = this.scene, walk = this.mode === 'walk';
    if (this.pathTracer?.active) { this.renderer.toneMappingExposure = m.exposure * (this.exposureTrim ?? 1); return; }
    if (walk && this.probeEnv) { s.environment = this.probeEnv; s.environmentIntensity = 1; s.environmentRotation.set(0, 0, 0); }
    else { s.environment = this.hdriEnv; s.environmentIntensity = m.env; s.environmentRotation.set(0, m.rot, 0); }
    this.fill.intensity = m.fill[walk && this.probeEnv ? 1 : 0];
    this.renderer.toneMappingExposure = (walk && this.probeEnv ? this.autoExposure : m.exposure) * (this.exposureTrim ?? 1);
    this.invalidate();
  }

  setExposure(v) { this.exposureTrim = v; this.applyEnvironment(); this.pathTracer.invalidate('camera'); }

  setLamps(level) {
    if (!this.apartment) return;
    this.rig.setLevel(level);
    for (const m of this.emissive) m.emissiveIntensity = m.userData.emissiveOn * level;
    this.pathTracer.invalidate('lights');
    this.invalidate();
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
    this.invalidate();
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
    this.sceneChanged(); // ceilings toggled → shadow map must be re-rendered
    this.updateBackground();
    this.applyEnvironment();
    this.pathTracer.invalidate('scene');
    this.emit('mode', mode);
  }

  // ------------------------------------------------------------------ room probe
  /**
   * Captures the room around the camera (ceilings on, windows showing the sky) into a cube map
   * and prefilters it for image-based lighting. Two passes = two light bounces.
   */
  captureProbe() {
    if (!this.apartment || this.mode !== 'walk') return;
    const r = this.renderer, s = this.scene;
    this.probeRT ??= new THREE.WebGLCubeRenderTarget(ENV_SIZE, { type: THREE.HalfFloatType });
    this.probeCam ??= new THREE.CubeCamera(0.05, 60, this.probeRT);
    const pos = this.camera.position.clone();
    pos.y = THREE.MathUtils.clamp(pos.y, 0.9, 1.6);
    this.probeCam.position.copy(pos);
    const sel = this.selHelper?.visible; if (this.selHelper) this.selHelper.visible = false;
    const m = MOODS[this.mood];
    // pass 0: direct light only (sun, lamps, faint fill) + sky through the windows;
    // pass 1: lit additionally by pass 0 → the stored probe carries two bounces.
    let target = null;
    for (let pass = 0; pass < 2; pass++) {
      s.environment = target?.texture ?? this.blackEnv();
      s.environmentIntensity = 1;
      s.environmentRotation.set(0, 0, 0);
      this.fill.intensity = m.fill[1];
      this.probeCam.update(r, s);
      const next = this.pmrem.fromCubemap(this.probeRT.texture);
      target?.dispose();
      target = next;
    }
    this.autoExposure = Math.min(m.maxExp, this.meter(m.key));
    this.probeTarget?.dispose();
    this.probeTarget = target;
    this.probeEnv = target.texture;
    this.probePos = this.camera.position.clone();
    this.probeRoom = LightRig.roomAt(this.camera.position);
    this.probeDirty = false;
    if (this.selHelper) this.selHelper.visible = sel;
    this.stats.probes++;
    this.applyEnvironment();
  }

  /**
   * Camera-like auto exposure: log-average luminance of the captured room (all six faces,
   * sparse samples) mapped to the mood's key value.
   */
  meter(key) {
    const rt = this.probeRT, n = ENV_SIZE, buf = new Uint16Array(n * n * 4);
    let sum = 0, cnt = 0, any = false;
    for (let f = 0; f < 6; f++) {
      this.renderer.readRenderTargetPixels(rt, 0, 0, n, n, buf, f);
      for (let i = 0; i < buf.length; i += 4 * 7) {
        const L = 0.2126 * THREE.DataUtils.fromHalfFloat(buf[i]) + 0.7152 * THREE.DataUtils.fromHalfFloat(buf[i + 1]) + 0.0722 * THREE.DataUtils.fromHalfFloat(buf[i + 2]);
        sum += Math.log(1e-4 + Math.min(L, 50)); cnt++; any ||= L > 0;
      }
    }
    if (!any) return 1.4; // read-back unsupported → sensible interior default
    const avg = Math.exp(sum / cnt);
    this.stats.meter = avg;
    return THREE.MathUtils.clamp(key / avg, 0.08, 6);
  }

  /** Black PMREM of the standard size: "no image light" without switching shader variants. */
  blackEnv() {
    if (!this._black) {
      const rt = new THREE.WebGLCubeRenderTarget(ENV_SIZE, { type: THREE.HalfFloatType });
      rt.clear(this.renderer, true, false, false);
      this._black = this.pmrem.fromCubemap(rt.texture).texture;
      rt.dispose();
    }
    return this._black;
  }

  probeStale() {
    if (this.mode !== 'walk') return false;
    if (this.probeDirty || !this.probeEnv) return true;
    if (this.probePos.distanceTo(this.camera.position) > PROBE_MOVE) return true;
    return LightRig.roomAt(this.camera.position) !== this.probeRoom;
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
    this.invalidate();
  }

  onCameraChange() { this.lastMove = performance.now(); this.invalidate(); this.pathTracer.invalidate('camera'); }

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
    this.invalidate();
  }

  setQuality(q) {
    this.quality = q;
    this.basePR = q === 'high' ? Math.min(window.devicePixelRatio, 2) : q === 'medium' ? Math.min(window.devicePixelRatio, 1.25) : 1;
    this.prScale = 1;
    this.renderer.setPixelRatio(this.basePR);
    this.sun.shadow.mapSize.set(q === 'low' ? 2048 : 4096, q === 'low' ? 2048 : 4096);
    this.sun.shadow.map?.dispose(); this.sun.shadow.map = null;
    this.renderer.shadowMap.needsUpdate = true;
    this.resize();
  }

  /** Steps the pixel ratio down/up from measured frame times during motion (hysteresis). */
  adaptResolution(dt) {
    const ft = this.frameTimes;
    ft.push(dt); if (ft.length < 20) return;
    const avg = ft.reduce((a, b) => a + b, 0) / ft.length; ft.length = 0;
    let s = this.prScale;
    if (avg > 1 / 28 && s > 0.55) s = Math.max(0.55, s - 0.15);
    else if (avg < 1 / 55 && s < 1) s = Math.min(1, s + 0.15);
    if (s !== this.prScale) { this.prScale = s; this.renderer.setPixelRatio(this.basePR * s); this.resize(); }
  }

  walkUpdate(dt) {
    if (this.mode !== 'walk' || !this.keys.size) return false;
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
    if (!mv.lengthSq()) return false;
    mv.normalize().multiplyScalar(speed);
    this.camera.position.add(mv); this.controls.target.add(mv);
    this.camera.position.y = THREE.MathUtils.clamp(this.camera.position.y, 0.4, ROOM_HEIGHT - 0.15);
    this.controls.target.y = THREE.MathUtils.clamp(this.controls.target.y, 0.3, ROOM_HEIGHT);
    this.controls.update();
    return true;
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
    if (this.selHelper) { this.scene.remove(this.selHelper); this.selHelper.dispose?.(); this.selHelper = null; }
    this.invalidate();
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
    const dt = Math.min(0.1, this.clock.getDelta()), now = performance.now();
    let moving = false;
    if (this._anim) { this._anim(now); moving = true; }
    if (this.walkUpdate(Math.min(dt, 0.05))) moving = true;
    if (this.controls.update()) moving = true;
    if (moving) { this.lastMove = now; this.needsRender = true; this.refined = false; }
    if (this.suspended) return;
    if (this.pathTracer.active) { this.pathTracer.render(); this.emit('frame', dt); return; }
    const still = now - this.lastMove > SETTLE_MS;
    // light budget follows the camera (walk mode: room of the camera)
    if (this.rig?.update(this.mode, this.camera.position)) this.invalidate();
    if (still && this.probeStale()) { this.captureProbe(); this.needsRender = true; }
    if (!this.needsRender && (this.refined || !still)) return;
    const hq = still;
    this.gtao.enabled = hq && this.quality !== 'low';
    if (this.selHelper) this.selHelper.visible = true;
    this.composer.render(dt);
    this.stats.frames++;
    if (moving) this.adaptResolution(dt);
    this.needsRender = false;
    this.refined = hq;
    if (hq) this.stats.refined++;
    this.emit('frame', dt);
  }

  /** Renders a refined frame immediately (screenshots / exports). */
  renderNow() {
    if (this.pathTracer.active) return;
    if (this.probeStale()) this.captureProbe();
    this.gtao.enabled = this.quality !== 'low';
    this.composer.render(0);
    this.refined = true; this.needsRender = false;
  }

  screenshot() {
    this.renderNow();
    return this.renderer.domElement.toDataURL('image/png');
  }

  /** Compiles the shader variants of the current scene state without drawing (parallel where supported). */
  async precompile(keepSuspended = false) {
    if (!this.renderer.compileAsync) return;
    this.suspended = true;
    try {
      await this.renderer.compileAsync(this.scene, this.camera).catch(() => {});
    } finally {
      if (!keepSuspended) this.suspended = false;
      this.invalidate();
    }
  }
}
