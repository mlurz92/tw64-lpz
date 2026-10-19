// Konzept-Reader: die vier Möblierungskonzepte (PDF) als lesbare, verlinkte Konzeptseiten in der
// App – Text, Tabellen, Farbpaletten und die Produktliste kommen wörtlich aus den PDFs (siehe
// tools/concepts/build.py); Pläne, Raumkonzepte, Wandansichten und Moodboards werden als
// Originalseiten mit pdf.js gerendert. Der Original-Viewer zeigt jede PDF-Seite vektorscharf in
// beliebiger Vergrößerung.

const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const eur = (v) => v == null ? '–' : v.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + ' €';

/** Inline markup of the extracted text: **bold** and [text](url) – escaped otherwise. */
export function inline(s) {
  let out = '', i = 0;
  const re = /\*\*(.+?)\*\*|\[([^\]]+)\]\((https?:[^)\s]+)\)/g;
  let m;
  while ((m = re.exec(s))) {
    out += esc(s.slice(i, m.index));
    if (m[1] !== undefined) out += `<strong>${inline(m[1])}</strong>`;
    else out += `<a href="${esc(m[3])}" target="_blank" rel="noopener noreferrer">${esc(m[2])}</a>`;
    i = m.index + m[0].length;
  }
  return out + esc(s.slice(i));
}

// ------------------------------------------------------------------------------------------
// pdf.js (vendor/pdfjs, lazy) – documents cached per URL
let pdfjs = null;
const docs = new Map();
async function lib() {
  if (!pdfjs) {
    pdfjs = await import('../../vendor/pdfjs/pdf.min.js');
    pdfjs.GlobalWorkerOptions.workerSrc = new URL('../../vendor/pdfjs/pdf.worker.min.js', import.meta.url).href;
  }
  return pdfjs;
}
export async function openPdf(url) {
  if (!docs.has(url)) docs.set(url, lib().then((p) => p.getDocument({ url, disableRange: true, disableStream: true, isEvalSupported: false }).promise));
  return docs.get(url);
}

/** Renders one page into a canvas of CSS width `cssW` (device-pixel sharp). */
export async function renderPage(doc, n, canvas, cssW, { quality = 1 } = {}) {
  const page = await doc.getPage(n);
  const base = page.getViewport({ scale: 1 });
  const dpr = Math.min(3, (window.devicePixelRatio || 1) * quality);
  const scale = (cssW / base.width) * dpr;
  const vp = page.getViewport({ scale });
  // canvas memory limit (iOS ≈ 16 MP): reduce resolution for very large zoom levels
  const k = Math.min(1, Math.sqrt(16e6 / (vp.width * vp.height)));
  const v2 = k < 1 ? page.getViewport({ scale: scale * k }) : vp;
  canvas.width = Math.floor(v2.width); canvas.height = Math.floor(v2.height);
  canvas.style.width = `${cssW}px`; canvas.style.height = `${(cssW * base.height) / base.width}px`;
  const task = page.render({ canvasContext: canvas.getContext('2d'), viewport: v2 });
  canvas._task?.cancel?.();
  canvas._task = task;
  try { await task.promise; } catch (e) { if (e?.name !== 'RenderingCancelledException') throw e; }
  return { w: base.width, h: base.height };
}

// ------------------------------------------------------------------------------------------
/** Full-screen original viewer (dialog #dlgPdf): thumbnails, zoom, page jump, download. */
export class PdfViewer {
  constructor(dialog) {
    this.d = dialog;
    this.d.innerHTML = `
      <div class="pdf-head">
        <div class="pdf-title"><span class="eyebrow">Original-PDF</span><strong id="pdfTitle"></strong></div>
        <div class="pdf-tools">
          <button class="icon" data-pdf="prev" aria-label="Vorherige Seite">‹</button>
          <span class="pdf-page"><input id="pdfPage" type="number" min="1" value="1" aria-label="Seite"> / <span id="pdfCount">–</span></span>
          <button class="icon" data-pdf="next" aria-label="Nächste Seite">›</button>
          <span class="sep"></span>
          <button class="icon" data-pdf="out" aria-label="Verkleinern">−</button>
          <span id="pdfZoom" class="pdf-zoom">100 %</span>
          <button class="icon" data-pdf="in" aria-label="Vergrößern">+</button>
          <button class="ghost small" data-pdf="fit">Breite</button>
          <a class="ghost small" id="pdfDownload" download>PDF ↓</a>
          <button class="icon" data-pdf="close" aria-label="Schließen">✕</button>
        </div>
      </div>
      <div class="pdf-body"><nav class="pdf-thumbs" id="pdfThumbs" aria-label="Seiten"></nav><div class="pdf-pages" id="pdfPages"></div></div>`;
    this.pagesEl = this.d.querySelector('#pdfPages'); this.thumbsEl = this.d.querySelector('#pdfThumbs');
    this.zoom = 1;
    this.d.querySelectorAll('[data-pdf]').forEach((b) => b.addEventListener('click', () => this.cmd(b.dataset.pdf)));
    this.d.querySelector('#pdfPage').addEventListener('change', (e) => this.goto(+e.target.value));
    this.d.addEventListener('close', () => { this.pagesEl.innerHTML = ''; this.thumbsEl.innerHTML = ''; this.io?.disconnect(); });
    this.d.addEventListener('keydown', (e) => {
      if (e.target.tagName === 'INPUT') return;
      if (e.key === '+' || e.key === '=') this.cmd('in');
      if (e.key === '-') this.cmd('out');
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); this.cmd('next'); }
      if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); this.cmd('prev'); }
    });
    // pinch / ctrl+wheel zoom on the pages
    this.pagesEl.addEventListener('wheel', (e) => { if (e.ctrlKey) { e.preventDefault(); this.setZoom(this.zoom * (e.deltaY < 0 ? 1.12 : 1 / 1.12)); } }, { passive: false });
    let pinch = null;
    this.pagesEl.addEventListener('touchstart', (e) => { if (e.touches.length === 2) pinch = { d: dist(e.touches), z: this.zoom }; }, { passive: true });
    this.pagesEl.addEventListener('touchmove', (e) => { if (pinch && e.touches.length === 2) { const k = dist(e.touches) / pinch.d; this.pagesEl.style.setProperty('--pinch', String(Math.max(0.5, Math.min(3, k)))); this.pinchK = k; } }, { passive: true });
    this.pagesEl.addEventListener('touchend', () => { if (pinch && this.pinchK) { this.pagesEl.style.removeProperty('--pinch'); this.setZoom(pinch.z * this.pinchK); } pinch = null; this.pinchK = null; });
    const dist = (t) => Math.hypot(t[0].clientX - t[1].clientX, t[0].clientY - t[1].clientY);
  }

  async open(url, title, page = 1) {
    this.url = url; this.d.querySelector('#pdfTitle').textContent = title;
    const dl = this.d.querySelector('#pdfDownload'); dl.href = url; dl.setAttribute('download', url.split('/').pop());
    if (!this.d.open) this.d.showModal();
    this.pagesEl.innerHTML = '<div class="pdf-loading">Original wird geladen …</div>';
    try { this.doc = await openPdf(url); } catch (e) { this.pagesEl.innerHTML = `<div class="pdf-loading">PDF konnte nicht geladen werden (${esc(e.message)}). <a href="${esc(url)}" target="_blank" rel="noopener">Direkt öffnen ↗</a></div>`; return; }
    this.n = this.doc.numPages; this.d.querySelector('#pdfCount').textContent = this.n; this.d.querySelector('#pdfPage').max = this.n;
    this.sizes = [];
    for (let i = 1; i <= this.n; i++) { const p = await this.doc.getPage(i); const v = p.getViewport({ scale: 1 }); this.sizes.push([v.width, v.height]); }
    this.build();
    this.goto(page, false);
  }

  width() { return Math.max(240, (this.pagesEl.clientWidth - 32) * this.zoom); }

  build() {
    this.io?.disconnect();
    const W = this.width();
    this.pagesEl.innerHTML = this.sizes.map(([w, h], i) => `<div class="pdf-sheet" data-page="${i + 1}" style="width:${W}px;height:${(W * h) / w}px"><canvas></canvas><span class="pdf-num">${i + 1}</span></div>`).join('');
    this.thumbsEl.innerHTML = this.sizes.map(([w, h], i) => `<button data-page="${i + 1}" aria-label="Seite ${i + 1}"><canvas style="width:120px;height:${(120 * h) / w}px"></canvas><span>${i + 1}</span></button>`).join('');
    this.thumbsEl.querySelectorAll('button').forEach((b) => b.addEventListener('click', () => this.goto(+b.dataset.page)));
    this.io = new IntersectionObserver((entries) => {
      for (const e of entries) {
        const el = e.target, n = +el.dataset.page;
        if (e.isIntersecting && el.dataset.done !== String(this.zoom)) {
          el.dataset.done = String(this.zoom);
          const thumb = el.tagName === 'BUTTON';
          renderPage(this.doc, n, el.querySelector('canvas'), thumb ? 120 : this.width(), { quality: thumb ? 1 : 1.25 }).catch(() => {});
        }
        if (e.isIntersecting && el.classList.contains('pdf-sheet') && e.intersectionRatio > 0.25) this.mark(n);
      }
    }, { root: null, rootMargin: '600px 0px', threshold: [0, 0.3] });
    this.pagesEl.querySelectorAll('.pdf-sheet').forEach((el) => this.io.observe(el));
    this.thumbsEl.querySelectorAll('button').forEach((el) => this.io.observe(el));
  }

  mark(n) {
    this.cur = n; this.d.querySelector('#pdfPage').value = n;
    this.thumbsEl.querySelectorAll('button').forEach((b) => b.classList.toggle('active', +b.dataset.page === n));
  }

  goto(n, smooth = true) {
    n = Math.max(1, Math.min(this.n ?? 1, n || 1));
    const el = this.pagesEl.querySelector(`.pdf-sheet[data-page="${n}"]`);
    if (el) this.pagesEl.scrollTo({ top: el.offsetTop - 12, behavior: smooth ? 'smooth' : 'auto' });
    this.mark(n);
    this.thumbsEl.querySelector(`[data-page="${n}"]`)?.scrollIntoView({ block: 'nearest' });
  }

  setZoom(z) {
    const n = this.cur ?? 1;
    this.zoom = Math.max(0.5, Math.min(6, z));
    this.d.querySelector('#pdfZoom').textContent = `${Math.round(this.zoom * 100)} %`;
    this.build(); this.goto(n, false);
  }

  cmd(c) {
    if (c === 'close') this.d.close();
    if (c === 'next') this.goto((this.cur ?? 1) + 1);
    if (c === 'prev') this.goto((this.cur ?? 1) - 1);
    if (c === 'in') this.setZoom(this.zoom * 1.25);
    if (c === 'out') this.setZoom(this.zoom / 1.25);
    if (c === 'fit') this.setZoom(1);
  }
}

// ------------------------------------------------------------------------------------------
/**
 * Concept page for one concept style. hooks: { styleTabs(html), onItem(pos), viewer: PdfViewer, itemOf(pos) }
 */
export function renderConcept(root, style, hooks) {
  const D = style.data;
  const items = new Map(); for (const r of D.items) { if (!items.has(r.pos)) items.set(r.pos, []); items.get(r.pos).push(r); }
  const chapters = [];
  for (const p of D.pages) for (const b of [...p.blocks, ...(p.notes ?? [])]) if (b.type === 'h1') chapters.push({ text: b.text, num: b.num ?? (p.blocks[0]?.title?.match(/^(\d+)\s/)?.[1] ?? null), page: p.page });
  const kpis = D.pages.flatMap((p) => p.blocks).find((b) => b.type === 'kpis');
  const lead = (() => { for (const p of D.pages) { const i = p.blocks.findIndex((b) => b.type === 'h2' && b.text === 'Leitidee'); if (i >= 0) return p.blocks[i + 1]; } return null; })();
  const file = D.file, title = D.title.replace(/^WE 13 – /, '');

  const productRows = (codes) => codes.map((c) => (items.get(c) ?? []).map((r) => `
    <tr data-pos="${esc(r.pos)}" class="${hooks.itemOf(r.pos) ? 'in3d' : ''}">
      <td class="pos"><span class="pos-badge">${esc(r.pos)}</span></td>
      <td><div class="pname">${r.url ? `<a href="${esc(r.url)}" target="_blank" rel="noopener noreferrer">${esc(r.name)}</a>` : esc(r.name)}${r.flags.map((f) => ` <span class="flag flag-${esc(f.normalize('NFD').replace(/[^a-z]/gi, '').toLowerCase())}">${esc(f)}</span>`).join('')}</div>
        ${r.finish ? `<div class="pfinish">${esc(r.finish)}</div>` : ''}${r.note ? `<div class="pnote">${esc(r.note)}</div>` : ''}</td>
      <td class="dims">${esc(r.dims || '–')}</td><td>${esc(r.retailer)}</td><td class="num">${esc(r.qty)}</td>
      <td class="num">${eur(r.unit)}</td><td class="num"><strong>${eur(r.sum)}</strong></td><td class="deliv">${esc(r.delivery)}</td>
      <td class="go">${hooks.itemOf(r.pos) ? `<button class="ghost small" data-show="${esc(r.pos)}" title="Im 3D-Modell zeigen">3D</button>` : ''}</td>
    </tr>`).join('')).join('');
  const productTable = (codes) => `<div class="table-wrap"><table class="inv products"><thead><tr><th>Pos.</th><th>Produkt · Ausführung</th><th>Maße</th><th>Händler</th><th class="num">Anz.</th><th class="num">Einzel</th><th class="num">Summe</th><th>Lieferung</th><th></th></tr></thead><tbody>${productRows(codes)}</tbody></table></div>`;

  const block = (b, p) => {
    switch (b.type) {
      case 'h1': return `<h2 class="doc-h1" id="kap-${esc(style.id)}-${esc(b.num ?? '')}"><span class="num">${esc(b.num ?? '')}</span>${esc(b.text)}</h2>`;
      case 'h2': return `<h3 class="doc-h2">${esc(b.text)}</h3>`;
      case 'p': return `<p class="${b.small ? 'small' : ''}">${inline(b.text)}</p>`;
      case 'ul': return `<ul>${b.items.map((t) => `<li>${inline(t)}</li>`).join('')}</ul>`;
      case 'table': return `<div class="table-wrap"><table class="doc-table"><thead><tr>${b.head.map((h) => `<th>${inline(h.replace(/\*\*/g, ''))}</th>`).join('')}</tr></thead><tbody>${b.rows.map((r) => `<tr>${r.map((c) => `<td>${inline(c)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
      case 'swatches': return `<div class="doc-swatches">${b.items.map((s) => `<div class="doc-swatch"><i style="background:${esc(s.hex)}"></i><strong>${esc(s.name)}</strong><small>${esc(s.use)}</small><small class="hex">${esc(s.hex)} · ${esc(s.role)}</small></div>`).join('')}</div>`;
      case 'kpis': return '';
      case 'products': return productTable(b.pos);
      case 'figure': return `<figure class="doc-figure" data-page="${b.page}"><div class="fig-canvas"><canvas></canvas><div class="fig-loading">Originalseite ${b.page} wird gerendert …</div></div>
        <figcaption><span>${esc(b.title || p.section || 'Originalseite')} · Seite ${b.page}</span><button class="ghost small" data-open-page="${b.page}">Im Original-Viewer öffnen ↗</button></figcaption></figure>`;
      default: return '';
    }
  };

  /** Figure pages: chapter heading first, the original page, then its text (room concepts, captions). */
  const pageHtml = (p) => {
    if (!p.figure) return p.blocks.map((b) => block(b, p)).join('');
    const notes = p.notes ?? [], h1 = notes.find((b) => b.type === 'h1');
    const num = h1 ? chapters.find((c) => c.page === p.page)?.num : null;
    return (h1 ? block({ ...h1, num }, p) : '') + p.blocks.map((b) => block(b, p)).join('') + notes.filter((b) => b !== h1).map((b) => block(b, p)).join('');
  };

  root.innerHTML = `
    ${hooks.styleTabs}
    <div class="concept-doc">
      <header class="doc-hero">
        <div>
          <div class="eyebrow">Möblierungskonzept · Original-PDF · ${D.pages.length} Seiten</div>
          <h2>${esc(title)}</h2>
          ${lead ? `<p class="lead">${inline(lead.text)}</p>` : ''}
          <div class="doc-actions">
            <button data-open-page="1">Möblierungsplan (Blatt 1) öffnen</button>
            <button class="ghost" data-open-page="2">Konzept im Original lesen</button>
            <a class="ghost btn" href="${esc(file)}" download>PDF herunterladen</a>
          </div>
        </div>
        <button class="doc-plan" data-open-page="1" aria-label="Möblierungsplan im Original öffnen"><canvas id="docPlanThumb"></canvas><span>Blatt 1 · Möblierungsplan M 1:50 (A2)</span></button>
      </header>
      ${kpis ? `<div class="doc-kpis">${kpis.items.map((k) => `<div><strong>${esc(k.value)}</strong><span>${esc(k.label)}</span><small>${esc(k.note)}</small></div>`).join('')}</div>` : ''}
      <div class="doc-layout">
        <nav class="doc-toc" aria-label="Kapitel">
          <div class="eyebrow">Kapitel</div>
          ${chapters.map((c) => `<a href="#kap-${esc(style.id)}-${esc(c.num ?? '')}" data-toc="${esc(c.num ?? '')}"><span>${esc(c.num ?? '')}</span>${esc(c.text)}</a>`).join('')}
          <div class="doc-total"><span>Gesamtbudget</span><strong>${eur(D.total)}</strong><small>${D.items.length} Positionen · Summe der Produktliste</small></div>
        </nav>
        <article class="doc-body">${D.pages.filter((p) => p.page > 1).map((p) => `<section class="doc-page" data-page="${p.page}">${pageHtml(p)}<div class="doc-pageno"><button class="linkish" data-open-page="${p.page}">Seite ${p.page} im Original</button></div></section>`).join('')}</article>
      </div>
    </div>`;

  root.querySelectorAll('[data-open-page]').forEach((b) => b.addEventListener('click', () => hooks.viewer.open(file, D.title, +b.dataset.openPage)));
  root.querySelectorAll('[data-show]').forEach((b) => b.addEventListener('click', (e) => { e.stopPropagation(); hooks.onItem(b.dataset.show); }));
  root.querySelectorAll('.doc-toc a').forEach((a) => a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = root.querySelector(a.getAttribute('href').replace(/([.:])/g, '\\$1'));
    t?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }));

  // original pages (plans, elevations, moodboards) render when they scroll into view
  openPdf(file).then((doc) => {
    const thumb = root.querySelector('#docPlanThumb');
    if (thumb) renderPage(doc, 1, thumb, (thumb.parentElement.clientWidth || 436) - 18, { quality: 1.5 }).then(() => { thumb.style.width = '100%'; thumb.style.height = 'auto'; }).catch(() => {});
    const io = new IntersectionObserver((entries) => {
      for (const e of entries) if (e.isIntersecting) {
        const f = e.target; io.unobserve(f);
        const c = f.querySelector('canvas');
        renderPage(doc, +f.dataset.page, c, f.querySelector('.fig-canvas').clientWidth || 800, { quality: 1.5 }).then(() => f.classList.add('ready')).catch(() => {});
      }
    }, { rootMargin: '400px 0px' });
    root.querySelectorAll('.doc-figure').forEach((f) => io.observe(f));
  }).catch(() => root.querySelectorAll('.fig-loading').forEach((el) => { el.textContent = 'Originalseite konnte nicht geladen werden – „Im Original-Viewer öffnen“ versuchen.'; }));
}
