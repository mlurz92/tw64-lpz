// Scaled 2D plan (SVG, units = metres) generated from the same geometry and furnishing data as
// the 3D scene: rooms, walls with openings, dimension labels and furniture footprints.
import { ROOMS, WALLS, BALCONIES, add, mul, sub, len, polygonArea } from '../core/geometry.js';
import { analyseWalls } from '../engine/builders/architecture.js';

export const CAT_COLORS = {
  Polster: '#b9c0ae', Tisch: '#e4ddd0', Möbel: '#8f7e6c', Bett: '#ddd5c8', Küche: '#6d4c3c', Sanitär: '#d7dcda',
  Pflanze: '#8b9f7a', Leuchte: '#b08b5e', Textil: '#e9e2d6', Outdoor: '#b88f64', Wand: '#a58867', Technik: '#9b9b98', Kunst: '#c9b79a', Deko: '#c4b59f',
};
const ROOM_FILL = { living: '#f1ece3', kitchen: '#efe8dc', bedroom: '#ede6db', office: '#eef0e8', bath: '#e6ebea', guestbath: '#e6ebea', utility: '#eceae5' };
const f2 = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const pts = (p) => p.map(([x, y]) => `${x.toFixed(3)},${y.toFixed(3)}`).join(' ');

export class PlanView {
  constructor(el, apartment, { onSelect } = {}) {
    this.el = el; this.apartment = apartment; this.onSelect = onSelect;
    this.layers = { furniture: true, dims: true, labels: true, soft: false };
    this.selected = null; this.room = null;
    const b = { minX: 2.2, maxX: 17.9, minY: 5.0, maxY: 22.1 };
    this.home = [b.minX, b.minY, b.maxX - b.minX, b.maxY - b.minY];
    this.vb = [...this.home];
    this.render();
    this.bind();
  }

  set(layer, v) { this.layers[layer] = v; this.render(); }

  focusRoom(id) {
    this.room = id;
    if (!id) { this.vb = [...this.home]; this.render(); return; }
    const r = ROOMS.find((x) => x.id === id) || BALCONIES.find((x) => x.id === id);
    const xs = r.points.map((p) => p[0]), ys = r.points.map((p) => p[1]);
    const pad = 0.8, w = Math.max(...xs) - Math.min(...xs) + pad * 2, h = Math.max(...ys) - Math.min(...ys) + pad * 2;
    const rect = this.el.getBoundingClientRect(), ar = rect.width / Math.max(1, rect.height);
    const W = Math.max(w, h * ar), H = W / ar;
    this.vb = [(Math.min(...xs) + Math.max(...xs)) / 2 - W / 2, (Math.min(...ys) + Math.max(...ys)) / 2 - H / 2, W, H];
    this.render();
  }

  svg({ forExport = false } = {}) {
    const L = this.layers, items = this.apartment.items;
    const { info } = analyseWalls();
    let s = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${this.vb.map((v) => v.toFixed(3)).join(' ')}" font-family="Jost, Arial, sans-serif">`;
    s += `<rect x="-50" y="-50" width="200" height="200" fill="#f7f4ee"/>`;
    // balconies
    for (const b of BALCONIES) {
      s += `<polygon points="${pts(b.points)}" fill="#e3ddd2" stroke="#b9ae9d" stroke-width="0.02" data-room="${b.id}"/>`;
      for (let x = 0; x < 40; x++) { /* deck hatching */ }
      s += `<text x="${b.label[0]}" y="${b.label[1]}" font-size="0.2" fill="#7a7266" text-anchor="middle">${esc(b.name)} · ${f2(b.area)} m²</text>`;
    }
    // rooms
    for (const r of ROOMS) {
      const on = !this.room || this.room === r.id;
      s += `<polygon class="room" data-room="${r.id}" points="${pts(r.points)}" fill="${ROOM_FILL[r.id]}" opacity="${on ? 1 : 0.55}"/>`;
    }
    // soft items (rugs) below furniture
    const drawItem = (it) => {
      const col = CAT_COLORS[it.cat] ?? '#ccc';
      const sel = this.selected === it.id;
      return `<g class="furn${sel ? ' sel' : ''}" data-item="${it.id}"><title>${esc(it.name)}</title><polygon points="${pts(it.footprint)}" fill="${col}" fill-opacity="${it.plan === 'soft' ? 0.45 : 0.92}" stroke="${sel ? '#8a6a48' : '#5d554b'}" stroke-width="${sel ? 0.04 : 0.012}"/></g>`;
    };
    const visible = items.filter((it) => it.footprint && it.plan !== false);
    if (L.furniture && L.soft) for (const it of visible.filter((i) => i.plan === 'soft')) s += drawItem(it);
    // walls
    for (const w of WALLS) {
      const { t, extStart } = info.get(w.id);
      const P = (u, v) => add(add(w.a, mul(w.dir, u)), mul(w.n, v));
      const cuts = [...w.openings].sort((a, b) => a.u0 - b.u0);
      let u = -extStart;
      const seg = (u0, u1) => { if (u1 - u0 > 1e-4) s += `<polygon points="${pts([P(u0, 0), P(u1, 0), P(u1, -t), P(u0, -t)])}" fill="#2f2e2b"/>`; };
      for (const o of cuts) {
        seg(u, o.u0);
        if (o.type === 'door') {
          s += `<polygon points="${pts([P(o.u0, 0), P(o.u1, 0), P(o.u1, -t), P(o.u0, -t)])}" fill="#f7f4ee"/>`;
          s += `<line x1="${P(o.u0, -t / 2)[0]}" y1="${P(o.u0, -t / 2)[1]}" x2="${P(o.u1, -t / 2)[0]}" y2="${P(o.u1, -t / 2)[1]}" stroke="#8a6a48" stroke-width="0.03"/>`;
        } else {
          s += `<polygon points="${pts([P(o.u0, 0), P(o.u1, 0), P(o.u1, -t), P(o.u0, -t)])}" fill="#fbfaf7" stroke="#2f2e2b" stroke-width="0.01"/>`;
          for (const k of [0.35, 0.65]) s += `<line x1="${P(o.u0, -t * k)[0]}" y1="${P(o.u0, -t * k)[1]}" x2="${P(o.u1, -t * k)[0]}" y2="${P(o.u1, -t * k)[1]}" stroke="#6f8aa0" stroke-width="0.012"/>`;
        }
        u = o.u1;
      }
      seg(u, w.length);
    }
    // furniture
    if (L.furniture) {
      for (const it of visible.filter((i) => i.plan !== 'soft')) s += drawItem(it);
      if (L.labels) {
        visible.filter((i) => i.plan !== 'soft').forEach((it) => {
          const c = centroid(it.footprint), n = this.number(it.id);
          s += `<g pointer-events="none"><circle cx="${c[0]}" cy="${c[1]}" r="0.11" fill="#f7f4ee" stroke="#5d554b" stroke-width="0.01"/><text x="${c[0]}" y="${c[1] + 0.045}" font-size="0.12" text-anchor="middle" fill="#2f2e2b">${n}</text></g>`;
        });
      }
    }
    // dimensions
    if (L.dims) {
      for (const w of WALLS) {
        if (w.length < 0.5 || (this.room && w.room !== this.room)) continue;
        const m = add(add(w.a, mul(w.dir, w.length / 2)), mul(w.n, 0.2));
        let ang = (Math.atan2(w.dir[1], w.dir[0]) * 180) / Math.PI;
        if (ang > 90) ang -= 180; if (ang < -90) ang += 180;
        s += `<text x="${m[0]}" y="${m[1]}" font-size="0.13" fill="#8a6a48" text-anchor="middle" dominant-baseline="middle" transform="rotate(${ang.toFixed(2)} ${m[0]} ${m[1]})" pointer-events="none">${f2(w.length)}</text>`;
      }
    }
    // room labels
    for (const r of ROOMS) {
      const [x, y] = r.label;
      s += `<g pointer-events="none"><text x="${x}" y="${y}" font-size="0.24" font-family="Cormorant Garamond, serif" text-anchor="middle" fill="#2f2e2b">${esc(r.name)}</text><text x="${x}" y="${y + 0.24}" font-size="0.15" text-anchor="middle" fill="#7a7266">${f2(r.wfl)} m² Wfl.</text></g>`;
    }
    // north / scale bar
    const [vx, vy, vw, vh] = this.vb;
    const sx = vx + vw * 0.04, sy = vy + vh * 0.96;
    s += `<g pointer-events="none"><rect x="${sx}" y="${sy - 0.05}" width="1" height="0.05" fill="#2f2e2b"/><rect x="${sx + 1}" y="${sy - 0.05}" width="1" height="0.05" fill="#fff" stroke="#2f2e2b" stroke-width="0.01"/><text x="${sx}" y="${sy - 0.1}" font-size="0.14" fill="#2f2e2b">0</text><text x="${sx + 1.95}" y="${sy - 0.1}" font-size="0.14" fill="#2f2e2b">2 m</text></g>`;
    if (forExport) {
      s += `<text x="${vx + vw * 0.04}" y="${vy + vh * 0.04}" font-size="0.28" font-family="Cormorant Garamond, serif" fill="#2f2e2b">WE 13 · Einrichtungsplan Refined Metallic Japandi</text>`;
      s += `<text x="${vx + vw * 0.04}" y="${vy + vh * 0.04 + 0.26}" font-size="0.13" fill="#7a7266">Rekonstruierte Planmaße (m) · kein Bestandsaufmaß · Legende siehe Möbelliste</text>`;
    }
    return s + '</svg>';
  }

  number(id) { return this.apartment.items.filter((i) => i.footprint && i.plan !== false && i.plan !== 'soft').findIndex((i) => i.id === id) + 1; }

  render() { this.el.innerHTML = this.svg(); }

  select(id) { this.selected = id; this.render(); }

  bind() {
    const el = this.el;
    let drag = null;
    const toUnits = (dx, dy) => { const r = el.getBoundingClientRect(); const k = Math.max(this.vb[2] / r.width, this.vb[3] / r.height); return [dx * k, dy * k]; };
    el.addEventListener('pointerdown', (e) => { drag = { x: e.clientX, y: e.clientY, vb: [...this.vb], moved: false }; el.setPointerCapture(e.pointerId); });
    el.addEventListener('pointermove', (e) => {
      if (!drag) return;
      const [dx, dy] = toUnits(e.clientX - drag.x, e.clientY - drag.y);
      if (Math.abs(e.clientX - drag.x) + Math.abs(e.clientY - drag.y) > 3) drag.moved = true;
      this.vb = [drag.vb[0] - dx, drag.vb[1] - dy, drag.vb[2], drag.vb[3]];
      el.querySelector('svg').setAttribute('viewBox', this.vb.join(' '));
    });
    el.addEventListener('pointerup', (e) => {
      const d = drag; drag = null;
      if (d && !d.moved) {
        const target = document.elementFromPoint(e.clientX, e.clientY);
        const item = target?.closest('[data-item]')?.dataset.item;
        const room = target?.closest('[data-room]')?.dataset.room;
        if (item) { this.select(item); this.onSelect?.({ item }); } else if (room) this.onSelect?.({ room });
      } else this.render();
    });
    el.addEventListener('wheel', (e) => {
      e.preventDefault();
      const r = el.getBoundingClientRect(), k = Math.exp(e.deltaY * 0.0012);
      const svg = el.querySelector('svg'), pt = svg.createSVGPoint(); pt.x = e.clientX; pt.y = e.clientY;
      const p = pt.matrixTransform(svg.getScreenCTM().inverse());
      const [x, y, w, h] = this.vb, nw = Math.min(40, Math.max(1.5, w * k)), nh = h * (nw / w);
      this.vb = [p.x - (p.x - x) * (nw / w), p.y - (p.y - y) * (nh / h), nw, nh];
      void r;
      this.render();
    }, { passive: false });
    el.addEventListener('dblclick', () => this.focusRoom(null));
  }
}

function centroid(p) {
  const a = polygonArea(p);
  if (Math.abs(a) < 1e-6) return p.reduce((s, q) => [s[0] + q[0] / p.length, s[1] + q[1] / p.length], [0, 0]);
  let cx = 0, cy = 0;
  for (let i = 0; i < p.length; i++) {
    const [x0, y0] = p[i], [x1, y1] = p[(i + 1) % p.length], f = x0 * y1 - x1 * y0;
    cx += (x0 + x1) * f; cy += (y0 + y1) * f;
  }
  return [cx / (6 * a), cy / (6 * a)];
}
export { sub, len };
