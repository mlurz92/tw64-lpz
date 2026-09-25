// Real-time renderer on the three.js WebGPU engine (r186): PBR + image-based light + soft sun
// shadows, TSL post-processing (render.js), planar mirror reflections, camera modes and moods.
//
// Two render modes
//  · Standard   – on-demand: frames are only drawn while something changes. While the camera
//                 moves a lean pipeline runs; once it rests, one refined frame with SSAO follows.
//  · Realistisch – screen-space global illumination (SSGI), screen-space reflections (SSR) and
//                 temporal anti-aliasing (TRAA). Renders continuously while moving and converges
//                 for ≈ 40 frames when the camera rests, then idles as well.
//
// Performance model
//  · Static shadows: the sun's shadow map is re-rendered only after scene/mood/style changes.
//  · Light budget (lighting.js): fixed slot count, only lamps relevant for the current room.
//  · Adaptive resolution: if frames during motion stay slow, the pixel ratio steps down.
//  · Local room probe: in walk mode the room around the camera is captured into a cube map
//    (two bounces) and used as image-based light → indirect light and reflections of the actual
//    room instead of the outdoor sky; its luminance drives the automatic exposure.
//  · Mirrors: true planar reflections (reflector nodes) in walk mode, only rendered when a mirror
//    is in view; in the dollhouse view they fall back to the room probe.
import * as THREE from 'three/webgpu';
import { reflector, vec4 } from 'three/tsl';
import { OrbitControls, HDRLoader, RectAreaLightTexturesLib } from '../../vendor/three-addons.js';
import { OFFSET, APARTMENT_BOUNDS, ROOM_HEIGHT } from '../core/geometry.js';
import { setMaxAnisotropy } from './textures.js';
import { LightRig, LAMP_SCALE, INTERIOR_LEVEL } from './lighting.js';
import { createPipelines } from './render.js';

export { LAMP_SCALE };

export const MOODS = {
  // Pure-sky panoramas (no ground scenery – park and city are real geometry 9.28 m below).
  // sunAz: world azimuth of the sun (°, atan2(z, x)); the panorama is rotated so that its sun
  // disc sits exactly there, the elevation is measured from the panorama (minEl = lower bound).
  day: { label: 'Tageslicht', hdri: 'kloofendal_48d_partly_cloudy_puresky', env: 0.9, bg: 1.0, sun: 3.2, sunColor: '#fff4e6', sunAz: 38, minEl: 20, maxEl: 90, lamps: 0, exposure: 1.0, key: 0.2, maxExp: 4.5, fill: [0.85, 0.12], fog: '#c3cdd6' },
  golden: { label: 'Goldene Stunde', hdri: 'qwantani_late_afternoon_puresky', env: 0.8, bg: 0.95, sun: 2.4, sunColor: '#ffc690', sunAz: 112, minEl: 6, maxEl: 90, lamps: 0.35, exposure: 0.95, key: 0.17, maxExp: 3.5, fill: [0.45, 0.06], fog: '#d8b99a' },
  evening: { label: 'Abend', hdri: 'qwantani_dusk_2_puresky', env: 0.35, bg: 0.45, sun: 0, sunColor: '#ffffff', sunAz: 112, minEl: 0, maxEl: 90, lamps: 1, exposure: 0.95, key: 0.1, maxExp: 3, fill: [0.12, 0.015], fog: '#3a4152' },
};

export const RENDER_MODES = {
  standard: { label: 'Standard', title: 'Echtzeit-PBR mit Umgebungsverdeckung (SSAO), schnell' },
  realistic: { label: 'Realistisch', title: 'Globale Beleuchtung (SSGI), Spiegelungen (SSR), temporales Anti-Aliasing' },
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
  { id: 'library', label: 'Arbeiten · Bibliothekswand', mode: 'walk', pos: [16.45, 1.5, 9.75], target: [13.7, 1.25, 9.55], fov: 64 },
  { id: 'bath', label: 'Bad · Waschplatz & Spiegelwand', mode: 'walk', pos: [15.2, 1.6, 7.3], target: [16.1, 1.2, 5.6], fov: 72 },
  { id: 'guestbath', label: 'Dusche / Gäste-WC', mode: 'walk', pos: [10.2, 1.6, 7.35], target: [11.0, 1.2, 5.6], fov: 72 },
  { id: 'balcony', label: 'Balkon 1', mode: 'walk', pos: [13.1, 1.55, 10.4], target: [10.6, 0.8, 9.6], fov: 66 },
];

const ENV_SIZE = 256;           // cube size of the room probe
const PROBE_MOVE = 1.0;         // re-capture the room probe after this many metres
const SETTLE_MS = 160;          // camera must be still this long before the refined frame
const CONVERGE_FRAMES = 40;     // realistic mode: temporal accumulation frames at rest
const w3 = ([x, y, z]) => new THREE.Vector3(x - OFFSET.x, y, z - OFFSET.y);

export class Viewer {
  static MOODS = MOODS;
  constructor(container) {
    this.container = container;
    const r = this.renderer = new THREE.WebGPURenderer({ antialias: false, powerPreference: 'high-performance' });
    this.basePR = Math.min(window.devicePixelRatio, 2);
    this.prScale = 1;
    r.setPixelRatio(this.basePR);
    r.shadowMap.enabled = true;
    r.shadowMap.type = THREE.PCFShadowMap;
    r.toneMapping = THREE.NeutralToneMapping;
    r.toneMappingExposure = 1;
    r.outputColorSpace = THREE.SRGBColorSpace;
    container.appendChild(r.domElement);
    r.domElement.style.width = '100%';
    r.domElement.style.height = '100%';

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(40, 1, 0.05, 200);
    this.controls = new OrbitControls(this.camera, r.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.08;
    this.mode = 'orbit';
    this.mood = 'day';
    this.quality = 'high';
    this.renderMode = 'standard';
    this.keys = new Set();
    this.timer = new THREE.Timer();
    this.hdris = new Map();
    this.listeners = new Set();
    this.needsRender = true;
    this.refined = false;
    this.accum = 0;
    this.lastMove = 0;
    this.frameTimes = [];
    this.stats = { frames: 0, refined: 0, probes: 0 };

    // sun: static 4K shadow map, re-rendered on demand only
    const sun = this.sun = new THREE.DirectionalLight('#fff4e6', 3);
    sun.castShadow = true;
    sun.shadow.mapSize.set(4096, 4096);
    // the orthographic shadow frustum must enclose the whole plan diagonal (else corner rooms such
    // as the bath fall outside the shadow map and are lit through the walls)
    const b = APARTMENT_BOUNDS, span = Math.hypot(b.maxX - b.minX, b.maxY - b.minY) / 2 + 1.5;
    Object.assign(sun.shadow.camera, { left: -span, right: span, top: span, bottom: -span, near: 1, far: 80 });
    sun.shadow.bias = -0.0001; sun.shadow.normalBias = 0.03; sun.shadow.radius = 3;
    sun.shadow.autoUpdate = false;
    this.center = new THREE.Vector3((b.minX + b.maxX) / 2 - OFFSET.x, 0, (b.minY + b.maxY) / 2 - OFFSET.y);
    sun.target.position.copy(this.center);
    this.scene.add(sun, sun.target);
    // Raster stand-in for multi-bounce light; weak in walk mode where the room probe takes over.
    this.fill = new THREE.HemisphereLight('#8f8a82', '#efe3d2', 0.8);
    this.scene.add(this.fill);

    // backdrop for the dollhouse view
    this.studioBg = new THREE.Color('#e9e5de');
    // aerial perspective for the park and the city edge; starts beyond the apartment (50 m)
    this.fog = new THREE.Fog('#c3cdd6', 50, 520);
    this.outdoorEmissive = new Set();
    const ground = this.ground = new THREE.Mesh(new THREE.CircleGeometry(40, 64), new THREE.ShadowMaterial({ opacity: 0.18 }));
    ground.rotation.x = -Math.PI / 2; ground.position.y = -0.29; ground.receiveShadow = true;
    this.scene.add(ground);

    this.resizeObserver = new ResizeObserver(() => this.resize());
    this.controls.addEventListener('change', () => this.onCameraChange());
    window.addEventListener('keydown', (e) => { if (!e.target.closest?.('input,textarea,select')) { this.keys.add(e.key.toLowerCase()); this.invalidate(); } });
    window.addEventListener('keyup', (e) => this.keys.delete(e.key.toLowerCase()));
    window.addEventListener('blur', () => this.keys.clear());
    r.domElement.addEventListener('pointerdown', (e) => { this._down = [e.clientX, e.clientY]; });
    r.domElement.addEventListener('pointerup', (e) => {
      if (this._down && Math.hypot(e.clientX - this._down[0], e.clientY - this._down[1]) < 4) this.pick(e);
    });
  }

  /** Initialises the GPU backend (WebGPU, otherwise WebGL 2) and the render pipelines. */
  async init() {
    const r = this.renderer;
    await r.init();
    this.backend = r.backend.isWebGPUBackend ? 'WebGPU' : 'WebGL 2';
    setMaxAnisotropy(r.backend.capabilities?.getMaxAnisotropy?.() ?? (r.backend.isWebGPUBackend ? 16 : 8));
    THREE.RectAreaLightNode.setLTC(RectAreaLightTexturesLib.init());
    this.pmrem = new THREE.PMREMGenerator(r);
    this.pipelines = createPipelines(r, this.scene, this.camera);
    this.pipelines.setQuality(this.quality);
    this.resizeObserver.observe(this.container);
    this.resize();
    r.setAnimationLoop(() => this.loop());
    return this;
  }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit(type, data) { for (const fn of this.listeners) fn(type, data); }

  /** Requests a new frame (and a refined one after it). */
  invalidate() { this.needsRender = true; this.refined = false; this.accum = 0; }
  /** Scene content changed: shadows, mirrors and probe must be re-rendered as well. */
  sceneChanged() { this.sun.shadow.needsUpdate = true; this.probeDirty = true; this.invalidate(); }

  /** Replaces the apartment (initial load and style switch). */
  async setApartment(apartment) {
    this.suspended = true;
    try {
      if (this.apartment) { this.select(null); this.apartment.dispose(); }
      this.apartment = apartment;
      this.scene.add(apartment.root);
      this.setupMirrors(apartment);
      this.rig = new LightRig(apartment);
      this.emissive = new Set();
      apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.emissiveOn) this.emissive.add(o.material); });
      const m = MOODS[this.mood];
      const { env } = await this.loadHDRI(m.hdri);
      this.hdriEnv = env;
      this.scene.environment = env;
      this.rig.setLevel(m.lamps);
      apartment.setCeilingsVisible(true);
      await this.precompile();
      apartment.setCeilingsVisible(this.mode === 'walk');
      this.probeDirty = true;
      await this.applyMood(this.mood);
    } finally {
      this.suspended = false;
      this.invalidate();
    }
  }

  // ------------------------------------------------------------------ mirrors
  /**
   * Every mirror gets its own planar reflector (true reflection of the room, rendered only when
   * the mirror is visible) and keeps the metallic probe material for the dollhouse view.
   */
  setupMirrors(apartment) {
    this.mirrors = [];
    apartment.root.traverse((o) => { if (o.isMesh && o.material?.userData?.mirror) this.mirrors.push(o); });
    for (const m of this.mirrors) {
      const rf = reflector({ resolutionScale: this.quality === 'low' ? 0.5 : 0.75, bounces: false });
      m.add(rf.target);
      const live = new THREE.MeshBasicNodeMaterial();
      const tint = m.material.userData.tint ?? 0.9;
      live.colorNode = vec4(rf.rgb.mul(tint), 1);
      live.name = 'mirror-live';
      m.userData.mirrorMats = { live, still: m.material };
    }
    this.updateMirrors();
  }

  updateMirrors() {
    const live = this.mode === 'walk';
    for (const m of this.mirrors ?? []) m.material = live ? m.userData.mirrorMats.live : m.userData.mirrorMats.still;
  }

  /** HDRI → (equirect for the background, PMREM for image-based light). */
  async loadHDRI(name) {
    if (this.hdris.has(name)) return this.hdris.get(name);
    const p = new HDRLoader().loadAsync(`./assets/lib/hdri/${name}.hdr`).then((tex) => {
      tex.mapping = THREE.EquirectangularReflectionMapping;
      const sun = analyseSky(tex);
      const env = this.pmrem.fromEquirectangular(tex).texture;
      return { tex, env, sun };
    });
    this.hdris.set(name, p);
    return p;
  }

  async applyMood(name) {
    const m = MOODS[name]; this.mood = name;
    const { tex, env, sun } = await this.loadHDRI(m.hdri);
    this.hdriEnv = env;
    this.hdriTex = tex;
    // rotate the panorama so that its sun disc lies at the mood's azimuth (verified by render:
    // a positive rotation moves the panorama's content to larger world azimuths … inverse)
    const az = THREE.MathUtils.degToRad(m.sunAz);
    this.rot = sun.phi - az;
    const el = THREE.MathUtils.degToRad(THREE.MathUtils.clamp(THREE.MathUtils.radToDeg(sun.el), m.minEl, m.maxEl));
    this.sunDir = new THREE.Vector3(Math.cos(az) * Math.cos(el), Math.sin(el), Math.sin(az) * Math.cos(el));
    this.scene.backgroundRotation.set(0, this.rot, 0);
    this.fog.color.set(m.fog);
    this.sun.intensity = m.sun;
    this.sun.visible = m.sun > 0;
    this.sun.color.set(m.sunColor);
    this.sun.position.copy(this.center).addScaledVector(this.sunDir, 30);
    this.setLamps(m.lamps);
    this.sceneChanged();
    this.applyEnvironment();
    this.updateBackground();
    this.emit('mood', name);
  }

  /** Environment + exposure for the current mode: HDRI outside, room probe inside. */
  applyEnvironment() {
    const m = MOODS[this.mood], s = this.scene, walk = this.mode === 'walk', probe = walk && this.probeEnv;
    // In the realistic mode SSGI adds short-range bounce light itself → slightly less probe light.
    const giTrim = this.renderMode === 'realistic' ? 0.82 : 1;
    if (probe) { s.environment = this.probeEnv; s.environmentIntensity = giTrim; s.environmentRotation.set(0, 0, 0); }
    else { s.environment = this.hdriEnv; s.environmentIntensity = m.env * giTrim; s.environmentRotation.set(0, this.rot ?? 0, 0); }
    this.fill.intensity = m.fill[probe ? 1 : 0];
    this.renderer.toneMappingExposure = (probe ? this.autoExposure : m.exposure) * (this.exposureTrim ?? 1);
    this.invalidate();
  }

  setExposure(v) { this.exposureTrim = v; this.applyEnvironment(); }

  setLamps(level) {
    if (!this.apartment) return;
    this.rig.setLevel(level);
    for (const m of this.outdoorEmissive) m.emissiveIntensity = m.userData.emissiveOn * level;
    for (const m of this.emissive) m.emissiveIntensity = m.userData.emissiveOn * (m.userData.interior ? Math.max(level, INTERIOR_LEVEL) : level);
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
    // outdoor scene (park 9.28 m below, building, city) and aerial perspective: walk mode only
    const walk = this.mode === 'walk';
    if (this.surroundings) this.surroundings.visible = walk;
    s.fog = walk ? this.fog : null;
    this.invalidate();
  }

  /** Adds the outdoor scene (built once, independent of the furnishing style). */
  setSurroundings(group) {
    this.surroundings = group;
    this.scene.add(group);
    group.traverse((o) => { if (o.isMesh && o.material?.userData?.emissiveOn) this.outdoorEmissive.add(o.material); });
    this.updateBackground();
    this.sceneChanged();
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
    this.updateMirrors();
    this.sceneChanged(); // ceilings toggled → shadow map must be re-rendered
    this.updateBackground();
    this.applyEnvironment();
    this.emit('mode', mode);
  }

  /** 'standard' | 'realistic' */
  setRenderMode(mode) {
    if (!RENDER_MODES[mode] || mode === this.renderMode) return;
    this.renderMode = mode;
    this.applyEnvironment();
    this.emit('render', mode);
  }

  // ------------------------------------------------------------------ room probe
  /**
   * Captures the room around the camera (ceilings on, windows showing the sky) into a cube map
   * and prefilters it for image-based lighting. Two passes = two light bounces.
   */
  captureProbe() {
    if (!this.apartment || this.mode !== 'walk') return;
    const r = this.renderer, s = this.scene;
    this.probeRT ??= new THREE.CubeRenderTarget(ENV_SIZE, { type: THREE.HalfFloatType });
    this.probeCam ??= new THREE.CubeCamera(0.05, 60, this.probeRT);
    const pos = this.camera.position.clone();
    pos.y = THREE.MathUtils.clamp(pos.y, 0.9, 1.6);
    this.probeCam.position.copy(pos);
    this.probeCam.updateMatrixWorld();
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
    this.probeTarget?.dispose();
    this.probeTarget = target;
    this.probeEnv = target.texture;
    this.probePos = this.camera.position.clone();
    this.probeRoom = LightRig.roomAt(this.camera.position);
    this.probeDirty = false;
    if (this.selHelper) this.selHelper.visible = sel;
    this.stats.probes++;
    this.autoExposure ??= Math.min(m.maxExp, 1.4);
    this.applyEnvironment();
    this.metering = this.meter(m).then((exp) => { if (exp) { this.autoExposure = exp; this.applyEnvironment(); } });
  }

  /**
   * Camera-like auto exposure: log-average luminance of the captured room (all six faces,
   * sparse samples) mapped to the mood's key value. GPU read-back is asynchronous.
   */
  async meter(m) {
    const token = (this._meterToken = (this._meterToken ?? 0) + 1);
    try {
      const n = ENV_SIZE, faces = [];
      for (let f = 0; f < 6; f++) faces.push(await this.renderer.readRenderTargetPixelsAsync(this.probeRT, 0, 0, n, n, 0, f));
      if (token !== this._meterToken) return null;
      let sum = 0, cnt = 0, any = false;
      const half = faces[0] instanceof Uint16Array, val = half ? THREE.DataUtils.fromHalfFloat : (x) => x;
      for (const buf of faces) {
        for (let i = 0; i < buf.length; i += 4 * 7) {
          const L = 0.2126 * val(buf[i]) + 0.7152 * val(buf[i + 1]) + 0.0722 * val(buf[i + 2]);
          sum += Math.log(1e-4 + Math.min(L, 50)); cnt++; any ||= L > 0;
        }
      }
      if (!any) return null;
      const avg = Math.exp(sum / cnt);
      this.stats.meter = avg;
      return Math.min(m.maxExp, THREE.MathUtils.clamp(m.key / avg, 0.08, 6));
    } catch (e) {
      console.warn('Belichtungsmessung nicht verfügbar', e);
      return null;
    }
  }

  /** Black PMREM: "no image light" for the first probe bounce. */
  blackEnv() {
    if (!this._black) {
      const s = new THREE.Scene(); s.background = new THREE.Color(0, 0, 0);
      this._black = this.pmrem.fromScene(s, 0, 0.1, 1).texture;
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
    const target = center.clone();
    let d = 30;
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

  onCameraChange() { this.lastMove = performance.now(); this.invalidate(); }

  resize() {
    const w = this.container.clientWidth || 1, h = this.container.clientHeight || 1;
    this.renderer.setSize(w, h, false);
    this.camera.aspect = w / h; this.camera.updateProjectionMatrix();
    this.invalidate();
  }

  setQuality(q) {
    this.quality = q;
    this.basePR = q === 'high' ? Math.min(window.devicePixelRatio, 2) : q === 'medium' ? Math.min(window.devicePixelRatio, 1.25) : 1;
    this.prScale = 1;
    this.renderer.setPixelRatio(this.basePR);
    const s = q === 'low' ? 2048 : 4096;
    this.sun.shadow.mapSize.set(s, s);
    this.sun.shadow.map?.dispose(); this.sun.shadow.map = null;
    this.pipelines?.setQuality(q);
    this.sceneChanged();
    this.resize();
  }

  /** Steps the pixel ratio down/up from measured frame times during motion (hysteresis). */
  adaptResolution(dt) {
    const ft = this.frameTimes;
    ft.push(dt); if (ft.length < 20) return;
    const avg = ft.reduce((a, b) => a + b, 0) / ft.length; ft.length = 0;
    let s = this.prScale;
    const min = this.renderMode === 'realistic' ? 0.5 : 0.55;
    if (avg > 1 / 28 && s > min) s = Math.max(min, s - 0.15);
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
    this.timer.update();
    const dt = Math.min(0.1, this.timer.getDelta()), now = performance.now();
    let moving = false;
    if (this._anim) { this._anim(now); moving = true; }
    if (this.walkUpdate(Math.min(dt, 0.05))) moving = true;
    if (this.controls.update()) moving = true;
    if (moving) { this.lastMove = now; this.invalidate(); }
    if (this.suspended || !this.pipelines) return;
    const still = now - this.lastMove > SETTLE_MS;
    // light budget follows the camera (walk mode: room of the camera)
    if (this.rig?.update(this.mode, this.camera.position)) this.invalidate();
    if (still && this.probeStale()) { this.captureProbe(); this.needsRender = true; }
    if (this.renderMode === 'realistic') {
      // temporal accumulation: keep rendering until converged
      if (!this.needsRender && this.accum >= CONVERGE_FRAMES) return;
      this.pipelines.realistic.render();
      this.needsRender = false;
      this.accum = still ? this.accum + 1 : 0;
      this.refined = this.accum >= CONVERGE_FRAMES;
      if (still) this.emit('converge', Math.min(1, this.accum / CONVERGE_FRAMES));
      if (this.refined) { const w = this.waiters; this.waiters = []; w?.forEach((f) => f()); }
    } else {
      if (!this.needsRender && (this.refined || !still)) return;
      const hq = still && this.quality !== 'low';
      (hq ? this.pipelines.refined : this.pipelines.fast).render();
      this.needsRender = false;
      this.refined = still;
      if (hq) this.stats.refined++;
    }
    this.stats.frames++;
    if (moving) this.adaptResolution(dt);
    this.emit('frame', dt);
  }

  /**
   * Waits until the current view is final: room probe and exposure measured and – in the
   * realistic mode – the temporal accumulation converged (TRAA/SSGI need real animation frames).
   */
  async settle() {
    if (this.probeStale()) this.captureProbe();
    await this.metering;
    if (this.renderMode === 'realistic' && this.renderer.getAnimationLoop()) {
      this.needsRender = true;
      await new Promise((res) => { (this.waiters ??= []).push(res); });
    }
  }

  /** Renders a finished frame immediately (first frame, screenshots, exports). */
  renderNow() {
    if (this.probeStale()) this.captureProbe();
    const p = this.pipelines;
    (this.renderMode === 'realistic' ? p.realistic : this.quality !== 'low' ? p.refined : p.fast).render();
    this.refined = true; this.needsRender = false;
  }

  /** PNG of the current view: settle, then render and read back in the same task. */
  async screenshot() {
    await this.settle();
    this.renderNow();
    return this.renderer.domElement.toDataURL('image/png');
  }

  /** Compiles the shader variants of the current scene state (parallel where supported). */
  async precompile() {
    const was = this.suspended;
    this.suspended = true;
    try {
      await this.renderer.compileAsync(this.scene, this.camera).catch((e) => console.warn(e));
    } finally {
      this.suspended = was;
      this.invalidate();
    }
  }
}

/**
 * Finds the sun in an equirectangular HDR (brightest texel of the upper hemisphere) and clamps
 * the disc so that the image-based light does not add a second sun to the directional light.
 * Returns its azimuth phi (atan2(z, x) convention of three.js) and elevation in radians.
 */
function analyseSky(tex) {
  const { data, width: w, height: h } = tex.image;
  const half = data instanceof Uint16Array, get = half ? THREE.DataUtils.fromHalfFloat : (v) => v;
  let best = -1, bx = 0, by = 0;
  const orig = new Float32Array(w * h);
  for (let y = 0; y < h; y++) for (let x = 0; x < w; x++) {
    const i = (y * w + x) * 4, L = 0.2126 * get(data[i]) + 0.7152 * get(data[i + 1]) + 0.0722 * get(data[i + 2]);
    orig[y * w + x] = L;
    if (y < h / 2 && L > best) { best = L; bx = x; by = y; }
  }
  const cap = 40; // luminance cap for the sun disc (the DirectionalLight carries the sun)
  for (let i = 0; i < data.length; i += 4) {
    const L = 0.2126 * get(data[i]) + 0.7152 * get(data[i + 1]) + 0.0722 * get(data[i + 2]);
    if (L > cap) {
      const k = cap / L;
      for (let c = 0; c < 3; c++) data[i + c] = half ? THREE.DataUtils.toHalfFloat(get(data[i + c]) * k) : data[i + c] * k;
    }
  }
  tex.needsUpdate = true;
  // disc centre: luminance-weighted centroid of the texels above half the peak (±3° window)
  let sx = 0, sy = 0, sw = 0;
  const R = Math.round(w / 120);
  for (let dy = -R; dy <= R; dy++) for (let dx = -R; dx <= R; dx++) {
    const y = by + dy, x = (bx + dx + w) % w;
    if (y < 0 || y >= h) continue;
    const i = (y * w + x) * 4, L = orig[y * w + x];
    if (L > best * 0.5) { sx += dx * L; sy += dy * L; sw += L; }
    void i;
  }
  const u = (bx + (sw ? sx / sw : 0) + 0.5) / w, v = (by + (sw ? sy / sw : 0) + 0.5) / h;
  return { phi: (u - 0.5) * Math.PI * 2, el: (0.5 - v) * Math.PI, peak: best };
}
