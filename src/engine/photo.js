// "Fotorealistisch": unbiased GPU path tracing + AI denoising for final-quality stills.
//
// The interactive view stays on the WebGPU rasteriser. As soon as the camera rests, this engine
// takes over on its own canvas above it:
//   1. Scene sync     – a proxy scene of exactly what the rasteriser draws (layer 0, visible
//                       meshes, instanced trees expanded), same geometries/materials/textures
//                       (one three.js core instance for both renderers, see tools/build-vendor.mjs).
//                       Glass becomes real transmission, every lamp of the apartment is lit.
//   2. BVH            – built in a Web Worker (three-mesh-bvh), the UI never blocks.
//   3. Path tracing   – three-gpu-pathtracer (WebGL 2): multiple importance sampling, soft
//                       area light, sky and sun light, 4–5 bounces, physically correct
//                       inter-reflections, transmission and contact shadows. Rendered in tiles,
//                       so every animation frame stays short even on integrated graphics.
//   4. Exposure       – log-average luminance of the converging HDR image (like a camera meter).
//   5. Denoising      – Intel Open Image Denoise U-Net on WebGPU (oidn-web) with albedo and
//                       normal feature images: a clean image after 48 samples, refined once
//                       more when the sample budget is reached.
// Any camera movement hides the overlay immediately and restarts the accumulation.
import * as THREE from 'three';
import { LAMP_SCALE } from './lighting.js';
import { WALLS, OFFSET, WINDOW_HEAD, add as add2, mul as mul2 } from '../core/geometry.js';
import { analyseWalls } from './builders/architecture.js';

const BUDGET = { high: { samples: 384, scale: 1, tiles: 2, bounces: 5, tex: 1024 },
  medium: { samples: 192, scale: 0.8, tiles: 3, bounces: 4, tex: 768 },
  low: { samples: 96, scale: 0.6, tiles: 3, bounces: 3, tex: 512 } };
const FIRST_DENOISE = 48;
const EXPOSURE_AT = [4, 16, 48];
/**
 * Sky portals: share of the sky light that reaches the interior through area lights in the window
 * openings (sampled directly → fast convergence) instead of through random bounce paths. The
 * environment keeps the rest, so paths leaving through a window are not counted twice.
 */
const PORTAL_SHARE = 0.7;
const WEIGHTS = { high: './assets/lib/oidn/rt_ldr_alb_nrm.tza', medium: './assets/lib/oidn/rt_ldr_alb_nrm.tza', low: './assets/lib/oidn/rt_ldr_alb_nrm_small.tza' };

let enginePromise = null;
const loadEngine = () => (enginePromise ??= import('../../vendor/pathtracer.js'));

export class PhotoRenderer {
  constructor(viewer) {
    this.v = viewer;
    this.state = 'idle';   // idle | building | tracing | denoising | done | error
    this.samples = 0;
    this.listeners = new Set();
    this.sceneKey = null;
    this.exposure = 1;
    this.denoisedAt = 0;
    const wrap = this.el = document.createElement('div');
    wrap.className = 'photo-layer';
    viewer.container.appendChild(wrap);
  }

  /** Sample budget of the quality preset (viewer.photoOverride: tests, e.g. { samples: 8 }). */
  budget() { return { ...BUDGET[this.v.quality], ...(this.v.photoOverride ?? {}) }; }

  on(fn) { this.listeners.add(fn); return () => this.listeners.delete(fn); }
  emit() { const st = this.status(); for (const fn of this.listeners) fn(st); this.v.emit('photo', st); }
  status() {
    const b = this.budget();
    return { state: this.state, samples: this.samples, target: b.samples, denoised: this.denoisedAt > 0, message: this.message };
  }

  /** Creates the WebGL renderer, the path tracer and (if WebGPU exists) the denoiser. */
  async init() {
    if (this.pt) return;
    const E = this.E = await loadEngine();
    const r = this.renderer = new E.WebGLRenderer({ antialias: false, preserveDrawingBuffer: true, powerPreference: 'high-performance' });
    r.outputColorSpace = THREE.SRGBColorSpace;
    r.setPixelRatio(1);
    r.domElement.className = 'photo-canvas';
    this.el.appendChild(r.domElement);
    this.denoiseCanvas = document.createElement('canvas');
    this.denoiseCanvas.className = 'photo-canvas denoised';
    this.el.appendChild(this.denoiseCanvas);
    const pt = this.pt = new E.WebGLPathTracer(r);
    pt.setBVHWorker(new E.GenerateMeshBVHWorker());
    pt.multipleImportanceSampling = true;
    pt.filterGlossyFactor = 0.6;   // suppresses fireflies on glossy stone and metal
    pt.transmissiveBounces = 8;
    pt.minSamples = 1;
    pt.renderDelay = 0;
    pt.fadeDuration = 0;
    pt.rasterizeScene = false;
    pt.dynamicLowRes = false;
    this.camera = new THREE.PerspectiveCamera();
    this.denoiser = null;
    if (navigator.gpu) {
      this.denoiserPromise = E.initUNetFromURL(WEIGHTS[this.v.quality], undefined, { aux: true })
        .then((u) => { this.denoiser = u; return u; })
        .catch((e) => { console.warn('KI-Entrauschung nicht verfügbar', e); return null; });
    }
  }

  /** Starts (or continues) the photoreal render of the current viewer camera. */
  async start() {
    this.active = true;
    try {
      await this.init();
      if (!this.active) return;
      const key = this.v.photoSceneKey();
      if (key !== this.sceneKey) {
        this.state = 'building'; this.message = 'Szene wird für Pathtracing aufbereitet …'; this.emit();
        this.sceneKey = key;
        await this.buildScene();
        if (!this.active || key !== this.sceneKey) return;
      } else {
        this.syncLighting();
      }
      this.resize();
      this.syncCamera();
      this.state = 'tracing'; this.message = null;
      this.el.classList.add('on');
      this.emit();
    } catch (e) {
      console.error(e);
      this.state = 'error'; this.message = 'Pathtracing auf diesem Gerät nicht verfügbar.';
      this.emit();
    }
  }

  /** Camera moved / mode left: hide the overlay and drop the accumulation. */
  stop() {
    this.active = false;
    this.abortDenoise?.(); this.abortDenoise = null;
    this.el.classList.remove('on', 'denoised');
    this.samples = 0; this.denoisedAt = 0; this.meterSteps = 0;
    if (this.state !== 'error') this.state = 'idle';
    this.pt?.reset();
    this.emit();
  }

  /** Scene content changed (style, mode, ceilings): rebuild on the next start. */
  invalidateScene() { this.sceneKey = null; }

  dispose() {
    this.stop();
    this.pt?.dispose(); this.renderer?.dispose();
    this.el.remove();
  }

  // ------------------------------------------------------------------ scene
  /**
   * Proxy scene: what the rasteriser shows, as plain meshes in world space. The furniture
   * originals on the picking layer are skipped (their merged twins are drawn); instanced trees
   * and houses become one mesh per instance.
   */
  collect() {
    const v = this.v, scene = new THREE.Scene(), mats = new Map();
    v.scene.updateMatrixWorld(true);
    const layer0 = new THREE.Layers();
    const inst = new THREE.Matrix4();
    const add = (o, matrix) => {
      const m = new THREE.Mesh(o.geometry, this.material(o, mats));
      m.matrixAutoUpdate = false;
      m.matrix.copy(matrix);
      scene.add(m);
    };
    v.scene.traverseVisible((o) => {
      if (!o.isMesh || !o.layers.test(layer0) || o === v.ground) return;
      if (o.material?.isShadowMaterial || o.material?.visible === false) return;
      if (o.isInstancedMesh) {
        for (let i = 0; i < o.count; i++) { o.getMatrixAt(i, inst); add(o, inst.premultiply(o.matrixWorld)); }
      } else add(o, o.matrixWorld);
    });
    // dollhouse: a studio floor under the model catches the soft sky shadows
    if (v.mode === 'orbit') {
      const floor = new THREE.Mesh(new THREE.CircleGeometry(60, 48), new THREE.MeshStandardMaterial({ color: '#e7e2da', roughness: 0.9 }));
      floor.rotation.x = -Math.PI / 2; floor.position.y = -0.29; floor.updateMatrix(); floor.matrixAutoUpdate = false;
      scene.add(floor);
    }
    // all apartment lamps take part in the light transport (walls occlude them correctly here)
    for (const l of v.apartment?.lights ?? []) {
      const c = l.clone(); c.matrixAutoUpdate = false; c.matrix.copy(l.matrixWorld);
      if (c.isSpotLight) { c.target = new THREE.Object3D(); c.target.position.copy(l.target.getWorldPosition(new THREE.Vector3())); scene.add(c.target); c.radius = 0.035; }
      c.userData.source = l;
      scene.add(c);
    }
    if (v.mode === 'walk') for (const p of this.portals()) scene.add(p);
    const sun = v.sun.clone(); sun.userData.source = v.sun;
    sun.position.copy(v.sun.position); sun.target = new THREE.Object3D(); sun.target.position.copy(v.sun.target.position);
    scene.add(sun, sun.target);
    this.scene = scene;
    return scene;
  }

  /**
   * One rectangular area light per exterior window / balcony door, in the opening just inside the
   * glass, facing into the room. Invisible to camera rays; its radiance is the cosine-weighted
   * average of the sky seen through that opening (from the HDR panorama).
   */
  portals() {
    const out = [], info = analyseWalls().info;
    for (const w of WALLS) {
      if (!info.get(w.id)?.exterior) continue;
      for (const o of w.openings) {
        if (o.type === 'door') continue;
        const width = o.u1 - o.u0, c = add2(add2(w.a, mul2(w.dir, (o.u0 + o.u1) / 2)), mul2(w.n, 0.012));
        const l = new THREE.RectAreaLight('#ffffff', 0, width - 0.1, WINDOW_HEAD - 0.1);
        l.position.set(c[0] - OFFSET.x, WINDOW_HEAD / 2, c[1] - OFFSET.y);
        l.lookAt(l.position.x + w.n[0], l.position.y, l.position.z + w.n[1]);
        l.updateMatrix(); l.matrixAutoUpdate = false;
        l.userData.portal = [-w.n[0], -w.n[1]]; // outward plan direction
        out.push(l);
      }
    }
    return out;
  }

  /** Cosine-weighted mean sky radiance around a horizontal outward direction (plan x/y). */
  skyRadiance([ox, oy]) {
    const v = this.v, tex = v.hdriTex, img = tex?.image;
    if (!img?.data) return new THREE.Color(0, 0, 0);
    const { data, width: W, height: H } = img, half = data instanceof Uint16Array, get = half ? THREE.DataUtils.fromHalfFloat : (x) => x;
    const n = new THREE.Vector3(ox, 0, oy).normalize(), t = new THREE.Vector3(0, 1, 0), b = new THREE.Vector3().crossVectors(n, t);
    const rot = v.rot ?? 0, sum = new THREE.Color(0, 0, 0), d = new THREE.Vector3();
    const N = 24;
    let cnt = 0;
    for (let i = 0; i < N; i++) for (let j = 0; j < N; j++) {
      // cosine-weighted hemisphere (stratified)
      const r1 = (i + 0.5) / N, r2 = (j + 0.5) / N, r = Math.sqrt(r1), phi = 2 * Math.PI * r2;
      d.copy(n).multiplyScalar(Math.sqrt(1 - r1)).addScaledVector(b, r * Math.cos(phi)).addScaledVector(t, r * Math.sin(phi));
      // world direction → panorama direction (inverse of the environment rotation about Y)
      const cs = Math.cos(-rot), sn = Math.sin(-rot), x = d.x * cs + d.z * sn, z = -d.x * sn + d.z * cs;
      const u = 0.5 + Math.atan2(z, x) / (2 * Math.PI), vv = 0.5 - Math.asin(THREE.MathUtils.clamp(d.y, -1, 1)) / Math.PI;
      const px = Math.min(W - 1, Math.floor(((u % 1) + 1) % 1 * W)), py = Math.min(H - 1, Math.floor(vv * H));
      const k = (py * W + px) * 4;
      // below the horizon the park and the facades are lit, not the sky: ≈ 35 % of the sky value
      const g = d.y < 0 ? 0.35 : 1;
      sum.r += get(data[k]) * g; sum.g += get(data[k + 1]) * g; sum.b += get(data[k + 2]) * g; cnt++;
    }
    return sum.multiplyScalar(1 / cnt);
  }

  /**
   * Path-traced counterpart of a raster material. The rasteriser fakes glass with a thin
   * transparent coat; here it is real transmission (clear, smoked or amber) with Fresnel
   * reflections. Planar-reflector node materials fall back to the physical mirror.
   */
  material(o, cache) {
    let src = o.userData.mirrorMats?.still ?? o.material;
    if (src.isNodeMaterial && !src.isMeshStandardMaterial) src = new THREE.MeshStandardMaterial({ color: '#888' });
    if (!src.userData?.glass) return src;
    if (cache.has(src)) return cache.get(src);
    const tint = src.color.clone();
    const clear = src.opacity < 0.3;
    const m = new THREE.MeshPhysicalMaterial({
      color: clear ? new THREE.Color('#fbfdfc') : tint.lerp(new THREE.Color('#ffffff'), 0.25),
      metalness: 0, roughness: Math.max(0.0, src.roughness * 0.5), ior: src.ior ?? 1.52,
      transmission: 1, thickness: 0, transparent: false, side: THREE.DoubleSide,
      emissive: src.emissive?.clone() ?? new THREE.Color(0), emissiveIntensity: src.emissiveIntensity ?? 0,
    });
    m.userData = { ...src.userData, ptSource: src };
    cache.set(src, m);
    return m;
  }

  async buildScene() {
    const pt = this.pt, b = this.budget();
    const scene = this.collect();
    this.applyEnvironment(scene);
    pt.textureSize.set(b.tex, b.tex);
    pt.bounces = b.bounces;
    pt.tiles.set(b.tiles, b.tiles);
    await pt.setSceneAsync(scene, this.camera, { onProgress: (p) => { this.message = `BVH wird aufgebaut … ${Math.round(p * 100)} %`; this.emit(); } });
    this.syncLighting();
  }

  applyEnvironment(scene = this.scene) {
    const v = this.v, m = v.moodSettings();
    scene.environment = v.hdriTex;
    scene.environmentIntensity = m.env * (v.mode === 'walk' ? 1 - PORTAL_SHARE : 1);
    scene.environmentRotation.set(0, v.rot ?? 0, 0);
    if (v.mode === 'orbit') { scene.background = v.studioBg; scene.backgroundIntensity = 1; }
    else { scene.background = v.hdriTex; scene.backgroundIntensity = m.bg; scene.backgroundRotation.set(0, v.rot ?? 0, 0); }
  }

  /** Mood / lamp level changed: copy light intensities, emissive levels and the environment. */
  syncLighting() {
    if (!this.scene) return;
    const rig = this.v.rig;
    const m = this.v.moodSettings();
    this.scene.traverse((o) => {
      if (o.userData.portal) {
        const c = this.skyRadiance(o.userData.portal).multiplyScalar(m.env * PORTAL_SHARE);
        // camera white balance for interiors: the blue cast of the open sky is halved
        const Y = 0.2126 * c.r + 0.7152 * c.g + 0.0722 * c.b;
        c.lerp(new THREE.Color(Y, Y, Y), 0.5);
        const L = Math.max(c.r, c.g, c.b);
        o.intensity = L; if (L > 0) o.color.setRGB(c.r / L, c.g / L, c.b / L);
        return;
      }
      const src = o.userData.source;
      if (!o.isLight || !src) return;
      if (src === this.v.sun) { o.intensity = src.visible ? src.intensity : 0; o.color.copy(src.color); o.position.copy(src.position); o.updateMatrix(); return; }
      const level = rig ? rig.levelOf(src) : 0;
      o.intensity = level > 0 ? src.userData.candela * level * LAMP_SCALE : 0;
    });
    this.scene.traverse((o) => { const s = o.material?.userData?.ptSource; if (s) o.material.emissiveIntensity = s.emissiveIntensity; });
    this.applyEnvironment();
    this.pt.updateLights();
    this.pt.updateMaterials();
    this.pt.updateEnvironment();
    this.meterSteps = 0;
    const r = this.renderer;
    r.toneMapping = this.v.renderer.toneMapping;
    r.toneMappingExposure = this.v.renderer.toneMappingExposure;
    this.exposure = r.toneMappingExposure / (this.v.exposureTrim ?? 1);
  }

  syncCamera() {
    const c = this.camera, src = this.v.camera;
    c.position.copy(src.position); c.quaternion.copy(src.quaternion);
    c.fov = src.fov; c.aspect = src.aspect; c.near = src.near; c.far = src.far;
    c.updateProjectionMatrix(); c.updateMatrixWorld();
    this.pt.setCamera(c);
    this.samples = 0; this.denoisedAt = 0; this.meterSteps = 0;
    this.el.classList.remove('denoised');
  }

  resize() {
    const v = this.v, b = BUDGET[v.quality];
    const w = v.container.clientWidth || 1, h = v.container.clientHeight || 1;
    const scale = Math.min(window.devicePixelRatio || 1, 1.25) * b.scale * (v.exportScale ?? 1);
    this.renderer.setSize(Math.round(w * scale), Math.round(h * scale), false);
  }

  // ------------------------------------------------------------------ progressive loop
  /** One tick from the viewer loop. Returns true while the GPU is busy with the photo. */
  tick() {
    if (!this.active || this.state !== 'tracing' || this.pt.isCompiling) return this.active;
    const b = this.budget();
    if (this.samples >= b.samples) return false;
    this.pt.renderSample();
    const s = Math.floor(this.pt.samples);
    if (s !== this.samples) {
      this.samples = s;
      if (EXPOSURE_AT[this.meterSteps ?? 0] !== undefined && s >= EXPOSURE_AT[this.meterSteps ?? 0]) { this.meterSteps = (this.meterSteps ?? 0) + 1; this.meter(); }
      if (this.denoiser && ((s >= FIRST_DENOISE && !this.denoisedAt) || s >= b.samples)) this.denoise();
      this.emit();
    }
    return true;
  }

  /** Camera-like exposure from the HDR accumulation (log average, bright windows clipped). */
  meter() {
    const t = this.pt.target, r = this.renderer;
    const w = t.width, h = t.height, step = 6;
    const buf = new Float32Array(w * h * 4);
    try { r.readRenderTargetPixels(t, 0, 0, w, h, buf); } catch { return; }
    let sum = 0, n = 0;
    for (let y = 0; y < h; y += step) for (let x = 0; x < w; x += step) {
      const i = (y * w + x) * 4, L = 0.2126 * buf[i] + 0.7152 * buf[i + 1] + 0.0722 * buf[i + 2];
      if (!Number.isFinite(L)) continue;
      // centre-weighted like a camera's matrix metering
      const dx = x / w - 0.5, dy = y / h - 0.5, wgt = 1.5 - Math.min(1, Math.hypot(dx, dy) * 1.6);
      sum += Math.log(2e-3 + Math.min(L, 16)) * wgt; n += wgt;
    }
    if (!n) return;
    const avg = Math.exp(sum / n), key = this.v.moodSettings().photoKey ?? 0.2;
    this.exposure = THREE.MathUtils.clamp(key / avg, 0.05, 12);
    this.applyExposure();
  }

  applyExposure() {
    if (!this.renderer) return;
    this.renderer.toneMappingExposure = this.exposure * (this.v.exposureTrim ?? 1);
    this.present();
  }

  /** Re-displays the accumulated image (new exposure) without adding a sample. */
  present() {
    if (!this.pt || !this.samples) return;
    const paused = this.pt.pausePathTracing;
    this.pt.pausePathTracing = true;
    this.pt.renderSample();
    this.pt.pausePathTracing = paused;
    if (this.denoisedAt && !this.denoising && this.denoiser) { this.denoisedAt = 0; this.denoise(); }
  }

  // ------------------------------------------------------------------ denoising
  /** Feature images for OIDN: surface albedo and normals (glass skipped, i.e. see-through). */
  features(w, h) {
    const r = this.renderer, scene = this.scene;
    const rt = (this._aux ??= new THREE.WebGLRenderTarget(w, h, { type: THREE.UnsignedByteType }));
    if (rt.width !== w || rt.height !== h) rt.setSize(w, h);
    const read = () => { const px = new Uint8ClampedArray(w * h * 4); r.readRenderTargetPixels(rt, 0, 0, w, h, px); return flipY(px, w, h); };
    const saved = [], bg = scene.background, tm = r.toneMapping;
    r.toneMapping = THREE.NoToneMapping;
    const albedoMats = new Map(), normalMat = new THREE.MeshNormalMaterial({ side: THREE.DoubleSide });
    scene.traverse((o) => {
      if (!o.isMesh) return;
      saved.push([o, o.material, o.visible]);
      if (o.material.transmission > 0) { o.visible = false; return; }
      let a = albedoMats.get(o.material);
      if (!a) {
        const s = o.material;
        a = new THREE.MeshBasicMaterial({ color: s.metalness > 0.9 ? new THREE.Color(1, 1, 1).lerp(s.color, 0.5) : s.color, map: s.map ?? null, side: THREE.DoubleSide });
        albedoMats.set(s, a);
      }
      o.material = a;
    });
    scene.background = scene.background?.isColor ? scene.background : new THREE.Color(0.8, 0.85, 0.9);
    r.setRenderTarget(rt); r.setClearColor(0xffffff, 1); r.clear(); r.render(scene, this.camera);
    const albedo = read();
    for (const [o] of saved) if (o.visible) o.material = normalMat;
    scene.background = new THREE.Color(0.5, 0.5, 1);
    r.setRenderTarget(rt); r.clear(); r.render(scene, this.camera);
    const normal = read();
    r.setRenderTarget(null);
    for (const [o, m, vis] of saved) { o.material = m; o.visible = vis; }
    scene.background = bg; r.toneMapping = tm;
    albedoMats.forEach((m) => m.dispose()); normalMat.dispose();
    return { albedo, normal };
  }

  denoise() {
    if (this.denoising) return;
    const target = this.budget().samples;
    const final = this.samples >= target;
    this.denoising = true;
    this.state = final ? 'denoising' : this.state;
    this.emit();
    const canvas = this.renderer.domElement, w = canvas.width, h = canvas.height;
    const out = this.denoiseCanvas;
    const scratch = (this._scratch ??= document.createElement('canvas'));
    scratch.width = w; scratch.height = h;
    const sctx = scratch.getContext('2d', { willReadFrequently: true });
    sctx.drawImage(canvas, 0, 0);
    const color = sctx.getImageData(0, 0, w, h);
    const { albedo, normal } = this.features(w, h);
    const outCtx = out.getContext('2d');
    const at = this.samples;
    this.abortDenoise = this.denoiser.tileExecute({
      color, albedo: new ImageData(albedo, w, h), normal: new ImageData(normal, w, h),
      done: (img) => {
        this.denoising = false; this.abortDenoise = null;
        if (!this.active) return;
        if (out.width !== w || out.height !== h) { out.width = w; out.height = h; }
        if (img instanceof ImageData) outCtx.putImageData(img, 0, 0);
        this.denoisedAt = at;
        this.el.classList.add('denoised');
        if (final) this.state = 'done';
        this.emit();
        if (final) { const ws = this.waiters; this.waiters = []; ws?.forEach((f) => f()); }
      },
      progress: (_, tile, rect) => {
        if (!this.active || !tile) return;
        if (out.width !== w || out.height !== h) { out.width = w; out.height = h; }
        outCtx.putImageData(tile, rect.x, rect.y);
      },
    });
  }

  /** Resolves once the sample budget is reached and (where available) the image is denoised. */
  finished() {
    const target = this.budget().samples;
    if (this.state === 'done' || (!this.denoiser && this.samples >= target && !this.denoising)) return Promise.resolve();
    return new Promise((res) => {
      (this.waiters ??= []).push(res);
      const off = this.on((s) => { if (s.state === 'error' || (!this.denoiser && s.samples >= target)) { off(); res(); } });
    });
  }

  /** PNG of the finished photo (denoised if available). */
  dataURL() {
    return (this.denoisedAt ? this.denoiseCanvas : this.renderer.domElement).toDataURL('image/png');
  }
}

function flipY(px, w, h) {
  const row = w * 4, tmp = new Uint8ClampedArray(row);
  for (let y = 0; y < h >> 1; y++) {
    const a = y * row, b = (h - 1 - y) * row;
    tmp.set(px.subarray(a, a + row)); px.copyWithin(a, b, b + row); px.set(tmp, b);
  }
  return px;
}
