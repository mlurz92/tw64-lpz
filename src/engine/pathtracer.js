// Progressive, physically based GPU path tracing (three-gpu-pathtracer) of the live scene:
// global illumination, soft area shadows, real reflections/refraction through glass.
import { WebGLPathTracer, DenoiseMaterial, FullScreenQuad } from '../../vendor/three-addons.js';

const MOODS_EXPOSURE = (v) => (v.constructor.MOODS?.[v.mood]?.exposure ?? 1) * (v.exposureTrim ?? 1);

export class PathTracer {
  constructor(viewer) {
    this.viewer = viewer;
    this.active = false;
    this.pt = null;
    this.maxSamples = 2000;
    this.pending = new Set();
    this.building = false;
    this.denoise = true;
  }

  async start({ onProgress } = {}) {
    const v = this.viewer;
    if (!this.pt) {
      const pt = this.pt = new WebGLPathTracer(v.renderer);
      pt.tiles.set(2, 2);
      pt.bounces = 5;
      pt.transmissiveBounces = 6;
      pt.filterGlossyFactor = 0.5;
      pt.minSamples = 1;
      pt.renderDelay = 0;
      pt.dynamicLowRes = false;
      pt.fadeDuration = 0;
      // Display pass: edge-aware denoise + the same tone mapping / sRGB output as the raster view.
      const dq = this.displayQuad = new FullScreenQuad(new DenoiseMaterial({ map: null, premultipliedAlpha: v.renderer.getContextAttributes().premultipliedAlpha }));
      pt.renderToCanvasCallback = (target, renderer, quad) => {
        const m = dq.material, n = this.pt.samples;
        m.map = quad.material.map;
        m.sigma = this.denoise ? Math.min(5, Math.max(0.5, 12 / Math.sqrt(n + 1))) : 0.01;
        m.threshold = 0.08; m.kSigma = 1;
        const ac = renderer.autoClear; renderer.autoClear = false;
        dq.render(renderer);
        renderer.autoClear = ac;
      };
      pt.textureSize.set(1024, 1024);
      pt.renderScale = Math.min(1, 1.5 / v.renderer.getPixelRatio());
    }
    this.active = true;
    v.rig?.setAll(true);
    this.swapGlass(true);
    this.swapEnvironment(true);
    await this.rebuild(onProgress);
    v.emit('pathtracer', { active: true });
  }

  stop() {
    this.active = false;
    this.viewer.rig?.setAll(false);
    this.swapGlass(false);
    this.swapEnvironment(false);
    this.viewer.invalidate();
    this.viewer.ground.visible = this.viewer.mode === 'orbit';
    this.viewer.emit('pathtracer', { active: false });
  }

  /** The path tracer samples the equirectangular HDR directly (importance sampled), not PMREM. */
  swapEnvironment(pt) {
    const v = this.viewer;
    if (pt) {
      const m = v.constructor.MOODS?.[v.mood];
      const s = v.scene;
      s.environment = v.hdriTex;
      if (m) { s.environmentIntensity = m.env; s.environmentRotation.set(0, m.rot, 0); }
      v.fill.intensity = 0;
    } else v.applyEnvironment();
  }

  /** Glass: physically refractive in the path tracer, thin transparent coat in raster mode. */
  swapGlass(pt) {
    const mats = new Set();
    this.viewer.scene.traverse((o) => { if (o.isMesh && o.material?.userData?.pt) mats.add(o.material); });
    for (const m of mats) {
      if (pt) {
        m.userData.raster ??= { transmission: m.transmission, opacity: m.opacity, transparent: m.transparent, thickness: m.thickness, color: '#' + m.color.getHexString() };
        Object.entries(m.userData.pt).forEach(([k, v]) => { if (k === 'color') m.color.set(v); else m[k] = v; });
      } else if (m.userData.raster) {
        Object.entries(m.userData.raster).forEach(([k, v]) => { if (k === 'color') m.color.set(v); else m[k] = v; });
      }
      m.needsUpdate = true;
    }
  }

  async rebuild(onProgress) {
    const v = this.viewer;
    this.building = true;
    v.emit('pathtracer', { active: true, building: true });
    v.ground.visible = false;
    if (v.selHelper) v.selHelper.visible = false;
    this.swapEnvironment(true);
    v.renderer.toneMappingExposure = MOODS_EXPOSURE(v);
    // let the UI paint the "building" state before the synchronous BVH build blocks the thread
    await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 30)));
    this.pt.setScene(v.scene, v.camera);
    onProgress?.(1);
    this.building = false;
    this.pending.clear();
    v.emit('pathtracer', { active: true, building: false });
  }

  invalidate(kind) {
    if (!this.active || !this.pt) return;
    this.pending.add(kind);
  }

  flush() {
    if (!this.pending.size || this.building) return;
    const p = this.pending, pt = this.pt;
    if (p.has('scene')) { this.pending = new Set(); this.rebuild(); return; }
    if (p.has('environment')) { this.swapEnvironment(true); pt.updateEnvironment(); }
    if (p.has('lights')) { pt.updateLights(); pt.updateMaterials(); }
    if (p.has('camera')) pt.updateCamera();
    p.clear();
  }

  get samples() { return this.pt ? Math.floor(this.pt.samples) : 0; }

  render() {
    if (this.building) { this.viewer.renderer.render(this.viewer.scene, this.viewer.camera); return; }
    this.flush();
    if (this.pt.samples < this.maxSamples) this.pt.renderSample();
    this.viewer.emit('samples', this.samples);
  }
}
