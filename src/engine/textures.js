// Texture factory: CC0 photo textures (Poly Haven) + procedural textures generated on canvas.
// Every texture here is "physical": its tile size in metres is stored in texture.userData.size,
// geometry UVs are generated in metres / size (see uv.js), so all textures keep repeat = 1.
import * as THREE from 'three';

const LIB = './assets/lib/textures/';
const loader = new THREE.ImageBitmapLoader().setOptions({ imageOrientation: 'flipY' });
const cache = new Map();

export let maxAnisotropy = 8;
export const setMaxAnisotropy = (v) => { maxAnisotropy = v; };

function finish(tex, { srgb = false, size = 1 } = {}) {
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.colorSpace = srgb ? THREE.SRGBColorSpace : THREE.NoColorSpace;
  tex.anisotropy = maxAnisotropy;
  tex.userData.size = size;
  tex.needsUpdate = true;
  return tex;
}

function loadBitmap(name) {
  if (!cache.has(name)) {
    cache.set(name, new Promise((res, rej) => loader.load(LIB + name, res, undefined, rej)));
  }
  return cache.get(name);
}

// ------------------------------------------------------------------ baked procedural textures
// Procedural textures are generated once by tools/bake-textures.mjs and shipped as WebP files
// (assets/lib/textures/baked/). At runtime they load in parallel and decode off the main thread;
// the generators below stay as fallback (and as the single source of truth for baking).
let manifestPromise = null;
export let BAKE_MODE = false;
export const setBakeMode = (v) => { BAKE_MODE = v; };
function manifest() {
  manifestPromise ??= fetch(LIB + 'baked/manifest.json').then((r) => (r.ok ? r.json() : null)).catch(() => null);
  return manifestPromise;
}

/** Returns the baked texture set `key` if available, otherwise runs the generator. */
export async function procedural(key, gen) {
  const man = BAKE_MODE ? null : await manifest();
  const entry = man?.[key];
  if (entry) {
    try {
      const out = { ...(entry.extra ?? {}) };
      await Promise.all(Object.entries(entry.maps).map(async ([slot, m]) => {
        const tex = new THREE.Texture(await loadBitmap('baked/' + m.file));
        tex.flipY = false;
        out[slot] = finish(tex, { srgb: m.srgb, size: m.size });
      }));
      return out;
    } catch (e) {
      console.warn('Baked texture unavailable, generating:', key, e);
    }
  }
  return gen();
}

/** Loads a Poly Haven map as texture. */
export async function photo(name, opts) {
  const bmp = await loadBitmap(name);
  const tex = new THREE.Texture(bmp);
  tex.flipY = false;
  return finish(tex, opts);
}

// ------------------------------------------------------------------ noise
function mulberry32(a) {
  return () => {
    a |= 0; a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Tileable value noise on a period grid (period in cells). */
function makeNoise(seed) {
  const rnd = mulberry32(seed), P = 256, g = new Float32Array(P * P);
  for (let i = 0; i < g.length; i++) g[i] = rnd();
  const fade = (t) => t * t * t * (t * (t * 6 - 15) + 10);
  return (x, y, period) => {
    const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
    const x0 = ((xi % period) + period) % period, y0 = ((yi % period) + period) % period;
    const x1 = (x0 + 1) % period, y1 = (y0 + 1) % period;
    const v = (a, b) => g[(b & 255) * P + (a & 255)];
    const u = fade(xf), w = fade(yf);
    const a = v(x0, y0) + (v(x1, y0) - v(x0, y0)) * u;
    const b = v(x0, y1) + (v(x1, y1) - v(x0, y1)) * u;
    return a + (b - a) * w;
  };
}

function fbm(noise, x, y, period, oct = 5, gain = 0.5) {
  let s = 0, amp = 0.5, f = 1, norm = 0;
  for (let i = 0; i < oct; i++) {
    s += amp * noise(x * f, y * f, period * f);
    norm += amp; amp *= gain; f *= 2;
  }
  return s / norm;
}

function canvas(w, h = w) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  return c;
}

function canvasTexture(c, opts) {
  const tex = new THREE.CanvasTexture(c);
  return finish(tex, opts);
}

/** Converts a height field (Float32Array, tileable) into a tangent-space normal map canvas. */
function heightToNormal(h, W, H, strength) {
  const c = canvas(W, H), ctx = c.getContext('2d'), img = ctx.createImageData(W, H), d = img.data;
  for (let y = 0; y < H; y++) {
    for (let x = 0; x < W; x++) {
      const l = h[y * W + ((x - 1 + W) % W)], r = h[y * W + ((x + 1) % W)];
      const u = h[((y - 1 + H) % H) * W + x], dn = h[((y + 1) % H) * W + x];
      let nx = (l - r) * strength, ny = (dn - u) * strength, nz = 1;
      const il = 1 / Math.hypot(nx, ny, nz);
      const i = (y * W + x) * 4;
      d[i] = (nx * il * 0.5 + 0.5) * 255; d[i + 1] = (ny * il * 0.5 + 0.5) * 255;
      d[i + 2] = (nz * il * 0.5 + 0.5) * 255; d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return c;
}

// ------------------------------------------------------------------ stone
/**
 * Calacatta-like marble: warm white base, soft grey clouds and long, domain-warped veins.
 * Returns { map, roughnessMap, normalMap }.
 */
export function marble({ seed = 7, size = 1.6, res = 1024, base = [242, 239, 233], vein = [118, 112, 104], goldish = [176, 150, 118], veins = 1 } = {}) {
  const noise = makeNoise(seed), W = res;
  const c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  const hf = new Float32Array(W * W);
  const r = canvas(W), rctx = r.getContext('2d'), rimg = rctx.createImageData(W, W), rd = rimg.data;
  for (let y = 0; y < W; y++) {
    for (let x = 0; x < W; x++) {
      const u = (x / W) * 4, v = (y / W) * 4;
      const warp = fbm(noise, u + 1.7, v + 9.2, 4, 5) * 3.2;
      const warp2 = fbm(noise, u * 2 + 5.3, v * 2 + 1.1, 8, 4) * 1.4;
      // main veins: level set of a warped diagonal field
      const f1 = Math.sin((u * 0.9 + v * 0.55 + warp) * Math.PI * veins);
      const f2 = Math.sin((u * 1.9 - v * 0.8 + warp2 + warp * 0.5) * Math.PI * 1.6);
      const vein1 = Math.exp(-Math.pow(Math.abs(f1) / 0.035, 1.2));
      const vein2 = Math.exp(-Math.pow(Math.abs(f2) / 0.018, 1.3)) * 0.55;
      const cloud = fbm(noise, u * 1.5 + 3, v * 1.5 + 7, 6, 5);
      const k = Math.min(1, vein1 * (0.65 + cloud * 0.6) + vein2 * cloud);
      const warm = Math.max(0, fbm(noise, u + 11, v + 3, 4, 3) - 0.45) * 1.6;
      const i = (y * W + x) * 4;
      for (let ch = 0; ch < 3; ch++) {
        const cl = base[ch] - (cloud - 0.5) * 16;
        const vc = vein[ch] * (1 - warm) + goldish[ch] * warm;
        d[i + ch] = cl * (1 - k) + vc * k;
      }
      d[i + 3] = 255;
      hf[y * W + x] = -k * 0.2 + cloud * 0.05;
      const rough = 0.1 + k * 0.08 + cloud * 0.04;
      rd[i] = rd[i + 1] = rd[i + 2] = rough * 255; rd[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  rctx.putImageData(rimg, 0, 0);
  return {
    map: canvasTexture(c, { srgb: true, size }),
    roughnessMap: canvasTexture(r, { size }),
    normalMap: canvasTexture(heightToNormal(hf, W, W, 2.0), { size }),
  };
}

/** Speckled white granite (kitchen worktop according to reference photo). */
export function granite({ seed = 3, size = 0.9, res = 1024 } = {}) {
  const rnd = mulberry32(seed), noise = makeNoise(seed + 1), W = res;
  const c = canvas(W), ctx = c.getContext('2d');
  const img = ctx.createImageData(W, W), d = img.data;
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const n = fbm(noise, (x / W) * 16, (y / W) * 16, 16, 4);
    const i = (y * W + x) * 4, v = 222 + (n - 0.5) * 34;
    d[i] = v; d[i + 1] = v - 2; d[i + 2] = v - 6; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  const dot = (x, y, r, col) => {
    for (const ox of [-W, 0, W]) for (const oy of [-W, 0, W]) {
      ctx.beginPath(); ctx.fillStyle = col;
      ctx.ellipse(x + ox, y + oy, r, r * (0.5 + rnd() * 0.7), rnd() * Math.PI, 0, Math.PI * 2); ctx.fill();
    }
  };
  for (let i = 0; i < 5200; i++) dot(rnd() * W, rnd() * W, 0.6 + rnd() ** 3 * 4.2, `rgba(${30 + rnd() * 40},${28 + rnd() * 30},${30 + rnd() * 30},${0.55 + rnd() * 0.45})`);
  for (let i = 0; i < 900; i++) dot(rnd() * W, rnd() * W, 0.8 + rnd() * 2.5, `rgba(${120 + rnd() * 40},${50 + rnd() * 25},${45 + rnd() * 20},${0.5 + rnd() * 0.4})`);
  for (let i = 0; i < 1400; i++) dot(rnd() * W, rnd() * W, 1 + rnd() * 5, `rgba(150,150,152,${0.15 + rnd() * 0.25})`);
  return { map: canvasTexture(c, { srgb: true, size }) };
}

/** Seamless ceramic tile texture; format and tone are supplied by the material preset. */
export function limestoneTiles({ seed = 11, tileW = 0.6, tileH = 1.2, cols = 4, rows = 2, res = 2048, base = [200, 192, 180], grout = [168, 160, 150] } = {}) {
  const noise = makeNoise(seed), rnd = mulberry32(seed + 5);
  const Wm = tileW * cols, Hm = tileH * rows, W = res, H = Math.round(res * (Hm / Wm));
  const c = canvas(W, H), ctx = c.getContext('2d'), img = ctx.createImageData(W, H), d = img.data;
  const hf = new Float32Array(W * H);
  const tint = Array.from({ length: cols * rows }, () => (rnd() - 0.5) * 10);
  const g = Math.max(1, Math.round((0.002 / Wm) * W));
  for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
    const mx = (x / W) * Wm, my = (y / H) * Hm;
    const tx = Math.floor(mx / tileW), ty = Math.floor(my / tileH);
    const lx = x - Math.round((tx * tileW / Wm) * W), ly = y - Math.round((ty * tileH / Hm) * H);
    const isGrout = lx < g || ly < g;
    const n = fbm(noise, (x / W) * 12, (y / H) * 12 * (H / W), 12, 5);
    const fleck = Math.pow(fbm(noise, (x / W) * 64 + 3, (y / H) * 64 * (H / W) + 3, 64, 2), 8) * 22;
    const i = (y * W + x) * 4;
    for (let ch = 0; ch < 3; ch++) {
      d[i + ch] = isGrout ? grout[ch] : base[ch] + (n - 0.5) * 12 + tint[ty * cols + tx] * 0.6 - fleck;
    }
    d[i + 3] = 255;
    hf[y * W + x] = isGrout ? -1 : n * 0.08;
  }
  ctx.putImageData(img, 0, 0);
  return {
    map: canvasTexture(c, { srgb: true, size: Wm }),
    normalMap: canvasTexture(heightToNormal(hf, W, H, 1.5), { size: Wm }),
    aspect: Hm / Wm,
  };
}

/** Fine travertine / stone for tables and trays. */
export function travertine({ seed = 21, size = 0.8, res = 1024 } = {}) {
  const noise = makeNoise(seed), W = res;
  const c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  const hf = new Float32Array(W * W);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / W;
    const bands = fbm(noise, u * 3, v * 22, 3, 5);
    const pores = Math.pow(Math.max(0, fbm(noise, u * 40 + 7, v * 90 + 3, 40, 2) - 0.62), 1.5) * 4;
    const i = (y * W + x) * 4;
    d[i] = 214 + (bands - 0.5) * 30 - pores * 60; d[i + 1] = 202 + (bands - 0.5) * 28 - pores * 60;
    d[i + 2] = 184 + (bands - 0.5) * 24 - pores * 55; d[i + 3] = 255;
    hf[y * W + x] = -pores;
  }
  ctx.putImageData(img, 0, 0);
  return { map: canvasTexture(c, { srgb: true, size }), normalMap: canvasTexture(heightToNormal(hf, W, W, 3), { size }) };
}

// ------------------------------------------------------------------ wood floors
/**
 * Composes a plank floor from a photographed veneer: randomised plank windows, staggered end
 * joints, subtle tone variation and micro-bevel. Grain must run vertically in the veneer image.
 * Tile covers `lengthTile` × (rows · width) metres; x = plank length direction.
 */
export async function plankFloor({ veneer = 'oak_veneer_01', plankL = 1.9, plankW = 0.2, rows = 16, planksPerRow = 2, res = 2048, seed = 5, gap = 0.0015, tone = 1, variance = 0.07, grainVertical = true, hasRough = true } = {}) {
  const [diff, rough] = await Promise.all([
    loadBitmap(veneer + '_diff.jpg'), hasRough ? loadBitmap(veneer + '_rough.jpg').catch(() => null) : Promise.resolve(null),
  ]);
  const Lm = plankL * planksPerRow, Hm = plankW * rows;
  const W = res, H = Math.round(res * (Hm / Lm));
  const pxX = W / Lm, pxY = H / Hm;
  const rnd = mulberry32(seed);
  const mk = () => { const c = canvas(W, H); return [c, c.getContext('2d')]; };
  const [cd, xd] = mk(), [cn, xn] = mk(), [cr, xr] = mk();
  xr.fillStyle = '#9a9a9a'; xr.fillRect(0, 0, W, H);
  xn.fillStyle = 'rgb(128,128,255)'; xn.fillRect(0, 0, W, H);
  const srcW = diff.width, srcH = diff.height;
  for (let r = 0; r < rows; r++) {
    const offset = (0.25 + rnd() * 0.55) * plankL;
    for (let k = -1; k < planksPerRow + 1; k++) {
      const x0 = (k * plankL + offset + r * 0.37 * plankL) % Lm;
      const px = x0 * pxX, py = r * plankW * pxY, pw = plankL * pxX, ph = plankW * pxY;
      // source window: a strip of the veneer, rotated so grain runs along the plank
      const sw = srcW * (plankW / 1.0) * 1.1, sx = rnd() * (srcW - sw), flip = rnd() > 0.5;
      const t = tone * (1 + (rnd() - 0.5) * variance * 2), hue = (rnd() - 0.5) * 6;
      for (const ox of [-W, 0, W]) {
        for (const [ctx, img, isNormal] of [[xd, diff, false], [xr, rough, false]]) {
          if (!img) continue;
          ctx.save();
          ctx.beginPath(); ctx.rect(px + ox, py, pw, ph); ctx.clip();
          ctx.translate(px + ox, py + ph / 2);
          if (grainVertical) {
            ctx.rotate(-Math.PI / 2);
            if (flip) ctx.scale(-1, 1);
            ctx.drawImage(img, sx, 0, sw, srcH, -ph / 2, 0, ph, pw);
          } else {
            ctx.drawImage(img, 0, sx, srcW, sw, 0, -ph / 2, pw, ph);
          }
          ctx.restore();
          if (!isNormal && ctx === xd) {
            ctx.fillStyle = t > 1 ? `rgba(255,248,236,${(t - 1) * 1.2})` : `rgba(40,26,14,${(1 - t) * 1.1})`;
            ctx.fillRect(px + ox, py, pw, ph);
            if (hue) { ctx.fillStyle = `rgba(${hue > 0 ? '160,110,60' : '110,110,120'},${Math.abs(hue) / 60})`; ctx.fillRect(px + ox, py, pw, ph); }
          }
        }
        // bevel / joint lines
        const g = Math.max(1, gap * pxY);
        xd.fillStyle = 'rgba(38,26,16,0.55)';
        xd.fillRect(px + ox, py, pw, g); xd.fillRect(px + ox, py, g, ph);
        xn.fillStyle = 'rgb(128,40,200)'; xn.fillRect(px + ox, py, pw, g * 1.2);
        xn.fillStyle = 'rgb(128,215,215)'; xn.fillRect(px + ox, py + g * 1.2, pw, g);
        xn.fillStyle = 'rgb(40,128,200)'; xn.fillRect(px + ox, py, g * 1.2, ph);
        xr.fillStyle = 'rgba(230,230,230,0.9)'; xr.fillRect(px + ox, py, pw, g); xr.fillRect(px + ox, py, g, ph);
      }
    }
  }
  // oiled finish: overall roughness slightly lower, gentle variation
  xr.fillStyle = 'rgba(70,70,70,0.25)'; xr.fillRect(0, 0, W, H);
  return {
    map: canvasTexture(cd, { srgb: true, size: Lm }),
    normalMap: canvasTexture(cn, { size: Lm }),
    roughnessMap: canvasTexture(cr, { size: Lm }),
    aspect: Hm / Lm,
  };
}

/**
 * Limewash / Kalkputz albedo: neutral, near-white cloudy mottling with crossed brush strokes.
 * The material colour tints it, so one texture serves every wall colour of every style.
 */
export function limewash({ seed = 51, size = 2.4, res = 1024 } = {}) {
  const noise = makeNoise(seed), W = res;
  const c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / W;
    const cloud = fbm(noise, u * 3 + 1.3, v * 3 + 7.1, 3, 5);
    const fine = fbm(noise, u * 24 + 4, v * 24 + 9, 24, 3);
    // crossed strokes: noise stretched along both diagonals
    const s1 = fbm(noise, (u + v) * 20, (u - v) * 3 + 5, 20, 3), s2 = fbm(noise, (u - v) * 3 + 11, (u + v) * 20 + 2, 20, 3);
    const k = 238 + (cloud - 0.5) * 34 + (fine - 0.5) * 8 + (Math.max(s1, s2) - 0.55) * 14;
    const i = (y * W + x) * 4;
    d[i] = k; d[i + 1] = k - 0.6; d[i + 2] = k - 1.5; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return { map: canvasTexture(c, { srgb: true, size }) };
}

/** Honed dark stone (Pietra grey / basalt) with soft cloudy veils and fine calcite threads. */
export function darkStone({ seed = 61, size = 1.2, res = 1024 } = {}) {
  return marble({ seed, size, res, base: [74, 71, 67], vein: [128, 122, 114], goldish: [110, 98, 84], veins: 0.8 });
}

/** Light, veined travertine (Travertino Classico, cross-cut). */
export function travertineVein({ seed = 23, size = 1.1, res = 1024 } = {}) {
  const noise = makeNoise(seed), W = res;
  const c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  const hf = new Float32Array(W * W);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / W;
    const warp = fbm(noise, u * 2, v * 2, 2, 4) * 1.8;
    const bands = fbm(noise, u * 2 + warp, v * 14, 2, 5);
    const pores = Math.pow(Math.max(0, fbm(noise, u * 50 + 7, v * 120 + 3, 50, 2) - 0.64), 1.4) * 4;
    const i = (y * W + x) * 4;
    d[i] = 226 + (bands - 0.5) * 34 - pores * 55; d[i + 1] = 214 + (bands - 0.5) * 32 - pores * 55; d[i + 2] = 196 + (bands - 0.5) * 30 - pores * 50; d[i + 3] = 255;
    hf[y * W + x] = -pores + bands * 0.02;
  }
  ctx.putImageData(img, 0, 0);
  return { map: canvasTexture(c, { srgb: true, size }), normalMap: canvasTexture(heightToNormal(hf, W, W, 3), { size }) };
}

// ------------------------------------------------------------------ textiles / art
/** Tileable rug: heathered wool with a subtle tone-in-tone border handled by geometry. */
export function wool({ seed = 31, size = 0.5, res = 512, color = [200, 190, 175], spread = 18 } = {}) {
  const noise = makeNoise(seed), W = res;
  const c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const n = fbm(noise, (x / W) * 32, (y / W) * 32, 32, 3) - 0.5;
    const hn = noise((x / W) * 256, (y / W) * 256, 256) - 0.5;
    const i = (y * W + x) * 4;
    for (let ch = 0; ch < 3; ch++) d[i + ch] = color[ch] + n * spread + hn * spread * 0.8;
    d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return canvasTexture(c, { srgb: true, size });
}

let _grainTile = null;
function grainTile() {
  if (_grainTile) return _grainTile;
  const W = 256, c = canvas(W), ctx = c.getContext('2d'), img = ctx.createImageData(W, W), d = img.data;
  const noise = makeNoise(77), rnd = mulberry32(78);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const v = 128 + (fbm(noise, (x / W) * 16, (y / W) * 16, 16, 3) - 0.5) * 120 + (rnd() - 0.5) * 50;
    const i = (y * W + x) * 4; d[i] = d[i + 1] = d[i + 2] = v; d[i + 3] = 255;
  }
  ctx.putImageData(img, 0, 0);
  return (_grainTile = c);
}

/**
 * Abstract artwork in the moodboard language (misty sage landscapes, stone colour fields,
 * bronze accents). Returns a CanvasTexture; UVs of the canvas plane are 0..1.
 */
export function artwork(kind = 'landscape', { seed = 1, w = 1200, h = 900 } = {}) {
  const c = canvas(w, h), ctx = c.getContext('2d'), rnd = mulberry32(seed), noise = makeNoise(seed + 3);
  // canvas grain: one small tileable noise tile, composited as a pattern (fast)
  const grain = () => {
    ctx.save();
    ctx.globalCompositeOperation = 'overlay'; ctx.globalAlpha = 0.22;
    ctx.fillStyle = ctx.createPattern(grainTile(), 'repeat');
    ctx.fillRect(0, 0, w, h);
    ctx.restore();
  };
  void noise;
  const stroke = (x, y, len, width, col, ang) => {
    ctx.save(); ctx.translate(x, y); ctx.rotate(ang);
    const g = ctx.createLinearGradient(0, -width, 0, width);
    g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, col); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(-len / 2, -width, len, width * 2); ctx.restore();
  };
  if (kind === 'landscape') {
    // misty dark-sage landscape (moodboard "Refined Metallic Japandi")
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#c9c8bb'); g.addColorStop(0.42, '#a7ab9a'); g.addColorStop(0.55, '#6f7a67');
    g.addColorStop(0.75, '#4b5647'); g.addColorStop(1, '#343d33');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 260; i++) {
      const y = h * (0.38 + rnd() * 0.6), a = 0.04 + rnd() * 0.08;
      stroke(rnd() * w, y, w * (0.2 + rnd() * 0.6), 6 + rnd() * 30, `rgba(${40 + rnd() * 50},${55 + rnd() * 50},${45 + rnd() * 40},${a})`, (rnd() - 0.5) * 0.08);
    }
    for (let i = 0; i < 120; i++) stroke(rnd() * w, h * (0.1 + rnd() * 0.35), w * (0.3 + rnd() * 0.5), 10 + rnd() * 40, `rgba(235,232,222,${0.03 + rnd() * 0.05})`, (rnd() - 0.5) * 0.05);
    ctx.fillStyle = 'rgba(52,60,50,0.55)';
    ctx.beginPath(); ctx.moveTo(0, h * 0.62);
    for (let x = 0; x <= w; x += 8) ctx.lineTo(x, h * (0.6 - 0.07 * Math.sin(x / w * 3.1 + 0.4) - fbm(noise, x / w * 6, 0.5, 6, 4) * 0.06));
    ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.fill();
  } else if (kind === 'fields') {
    // stone colour fields with a sage block (moodboard "Refined Brutalism")
    ctx.fillStyle = '#d9d1c4'; ctx.fillRect(0, 0, w, h);
    const blocks = [['#cfc5b5', 0.08, 0.07, 0.56, 0.5], ['#e3dccf', 0.5, 0.07, 0.42, 0.38], ['#7c8a72', 0.08, 0.52, 0.38, 0.4], ['#bdb09d', 0.5, 0.48, 0.42, 0.44]];
    for (const [col, x, y, bw, bh] of blocks) {
      ctx.fillStyle = col; ctx.fillRect(x * w, y * h, bw * w, bh * h);
      for (let i = 0; i < 60; i++) stroke(x * w + rnd() * bw * w, y * h + rnd() * bh * h, bw * w * 0.8, 8 + rnd() * 20, `rgba(255,255,255,${0.02 + rnd() * 0.04})`, (rnd() - 0.5) * 0.3);
    }
    ctx.strokeStyle = 'rgba(120,96,64,0.5)'; ctx.lineWidth = 3;
    ctx.beginPath(); ctx.moveTo(w * 0.47, h * 0.12); ctx.lineTo(w * 0.47, h * 0.88); ctx.stroke();
  } else if (kind === 'ink') {
    // single calligraphic ink gesture on warm paper (Japandi)
    ctx.fillStyle = '#ece6da'; ctx.fillRect(0, 0, w, h);
    ctx.lineCap = 'round';
    let x = w * 0.28, y = h * 0.62;
    for (let i = 0; i < 180; i++) {
      const t = i / 180, r = w * 0.2;
      const nx = w * 0.5 + Math.cos(t * Math.PI * 1.75 + 2.2) * r, ny = h * 0.5 + Math.sin(t * Math.PI * 1.75 + 2.2) * r * 0.95;
      ctx.strokeStyle = `rgba(40,42,38,${0.85 - t * 0.5})`; ctx.lineWidth = 34 * (1 - t * 0.7) + rnd() * 3;
      ctx.beginPath(); ctx.moveTo(x, y); ctx.lineTo(nx, ny); ctx.stroke(); x = nx; y = ny;
    }
    ctx.fillStyle = 'rgba(140,60,40,0.8)'; ctx.fillRect(w * 0.78, h * 0.78, w * 0.035, w * 0.035);
  } else if (kind === 'sage') {
    // soft sage monochrome with textured brushwork (bedroom)
    ctx.fillStyle = '#9aa38d'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 400; i++) stroke(rnd() * w, rnd() * h, 80 + rnd() * 300, 6 + rnd() * 24, `rgba(${110 + rnd() * 90},${120 + rnd() * 80},${100 + rnd() * 70},${0.05 + rnd() * 0.1})`, rnd() * Math.PI);
    ctx.fillStyle = 'rgba(232,226,214,0.85)';
    ctx.beginPath(); ctx.arc(w * 0.62, h * 0.4, h * 0.16, 0, Math.PI * 2); ctx.fill();
  } else if (kind === 'arch') {
    // Soft Brutalism: sand ground, terracotta arch and a cognac sun
    ctx.fillStyle = '#ddd2c1'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 220; i++) stroke(rnd() * w, rnd() * h, 120 + rnd() * 400, 8 + rnd() * 30, `rgba(${200 + rnd() * 40},${185 + rnd() * 40},${160 + rnd() * 40},${0.05 + rnd() * 0.08})`, (rnd() - 0.5) * 0.4);
    ctx.fillStyle = '#b77a55';
    ctx.beginPath(); ctx.moveTo(w * 0.3, h * 0.86); ctx.lineTo(w * 0.3, h * 0.5); ctx.arc(w * 0.46, h * 0.5, w * 0.16, Math.PI, 0); ctx.lineTo(w * 0.62, h * 0.86); ctx.fill();
    ctx.fillStyle = 'rgba(122,132,106,0.9)'; ctx.fillRect(w * 0.55, h * 0.62, w * 0.2, h * 0.24);
    ctx.fillStyle = '#8e5a3a'; ctx.beginPath(); ctx.arc(w * 0.7, h * 0.28, h * 0.07, 0, Math.PI * 2); ctx.fill();
  } else if (kind === 'botanical') {
    // Quiet Luxury: overlapping round sage leaves on warm paper (moodboard "Cool Quiet Luxury")
    ctx.fillStyle = '#ebe6dc'; ctx.fillRect(0, 0, w, h);
    const leaves = [[0.45, 0.35, 0.2, '#6f7d63'], [0.58, 0.55, 0.17, '#8a9582'], [0.38, 0.62, 0.13, '#4f5c47'], [0.55, 0.28, 0.1, '#a3ad96']];
    for (const [x, y, r, col] of leaves) {
      ctx.fillStyle = col; ctx.beginPath(); ctx.arc(w * x, h * y, h * r, 0, Math.PI * 2); ctx.fill();
      ctx.strokeStyle = 'rgba(235,230,220,0.35)'; ctx.lineWidth = 3;
      for (let k = 0; k < 7; k++) { const a = (k / 7) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(w * x, h * y); ctx.lineTo(w * x + Math.cos(a) * h * r * 0.92, h * y + Math.sin(a) * h * r * 0.92); ctx.stroke(); }
    }
    ctx.strokeStyle = 'rgba(60,64,52,0.8)'; ctx.lineWidth = 4;
    ctx.beginPath(); ctx.moveTo(w * 0.47, h * 0.95); ctx.quadraticCurveTo(w * 0.5, h * 0.7, w * 0.45, h * 0.35); ctx.stroke();
  } else if (kind === 'monolith') {
    // Refined Brutalism: stone ground, off-white square, muted sage block (moodboard)
    ctx.fillStyle = '#b9ae9f'; ctx.fillRect(0, 0, w, h);
    for (let i = 0; i < 300; i++) stroke(rnd() * w, rnd() * h, 60 + rnd() * 260, 6 + rnd() * 20, `rgba(${150 + rnd() * 60},${140 + rnd() * 60},${125 + rnd() * 60},${0.06 + rnd() * 0.1})`, rnd() * Math.PI);
    ctx.fillStyle = '#ddd5c7'; ctx.fillRect(w * 0.2, h * 0.14, w * 0.6, h * 0.72);
    ctx.fillStyle = '#7b8570'; ctx.fillRect(w * 0.2, h * 0.5, w * 0.3, h * 0.36);
    for (let i = 0; i < 120; i++) stroke(w * 0.2 + rnd() * w * 0.6, h * 0.14 + rnd() * h * 0.72, 80 + rnd() * 200, 5 + rnd() * 14, `rgba(255,255,255,${0.03 + rnd() * 0.05})`, (rnd() - 0.5) * 0.6);
  } else if (kind === 'relief') {
    // plaster relief (off-white), relies mostly on normal map
    ctx.fillStyle = '#e4ddd1'; ctx.fillRect(0, 0, w, h);
  }
  grain();
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = maxAnisotropy;
  return tex;
}

/** Normal map with organic relief swirls for the plaster artwork. */
export function reliefNormal({ seed = 4, res = 512 } = {}) {
  const noise = makeNoise(seed), W = res, hf = new Float32Array(W * W);
  for (let y = 0; y < W; y++) for (let x = 0; x < W; x++) {
    const u = x / W, v = y / W;
    const f = fbm(noise, u * 4, v * 4, 4, 5);
    hf[y * W + x] = Math.sin(f * 28) * 0.5 + fbm(noise, u * 30, v * 30, 30, 2) * 0.3;
  }
  const tex = new THREE.CanvasTexture(heightToNormal(hf, W, W, 3.5));
  tex.colorSpace = THREE.NoColorSpace;
  return tex;
}

/** Soft radial gradient used for lamp shades / glow cards. */
export function gradientTexture(stops, { w = 256, h = 256, radial = false } = {}) {
  const c = canvas(w, h), ctx = c.getContext('2d');
  const g = radial ? ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, w / 2) : ctx.createLinearGradient(0, 0, 0, h);
  for (const [t, col] of stops) g.addColorStop(t, col);
  ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}

/** Book spines texture strip for procedural book rows. */
export function bookSpines({ seed = 9, count = 24 } = {}) {
  const w = 1024, h = 256, c = canvas(w, h), ctx = c.getContext('2d'), rnd = mulberry32(seed);
  const pal = ['#e8e2d6', '#d4cab8', '#b9ab95', '#8f8676', '#5e5a52', '#3a3a36', '#7f8b74', '#a58d6f', '#2f332f', '#c9c0ae'];
  let x = 0;
  while (x < w) {
    const bw = 18 + rnd() * 34, col = pal[Math.floor(rnd() * pal.length)];
    ctx.fillStyle = col; ctx.fillRect(x, 0, bw, h);
    ctx.fillStyle = 'rgba(255,255,255,0.08)'; ctx.fillRect(x + 1, 0, 2, h);
    ctx.fillStyle = 'rgba(0,0,0,0.25)'; ctx.fillRect(x + bw - 1.5, 0, 1.5, h);
    if (rnd() > 0.35) { ctx.fillStyle = rnd() > 0.5 ? 'rgba(20,20,20,0.6)' : 'rgba(240,235,225,0.75)'; ctx.fillRect(x + bw * 0.3, h * 0.2, bw * 0.4, h * (0.25 + rnd() * 0.3)); }
    x += bw;
  }
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  return tex;
}
