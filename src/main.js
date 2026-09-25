// Application bootstrap and UI wiring.
import { Viewer, MOODS, STATIONS, RENDER_MODES } from './engine/viewer.js';
import { createMaterials } from './engine/materials.js';
import { ModelLibrary } from './engine/models.js';
import { ApartmentScene } from './engine/scene.js';
import { PlanView } from './ui/plan2d.js';
import { ROOMS, WALLS, BALCONIES } from './core/geometry.js';
import { STYLES, DEFAULT_STYLE } from './data/design.js';
import { roomNotes, LUXURY_PRINCIPLES } from './data/styles.js';
import PLAN from './data/plan.js';
import { validateLayout } from './core/validate.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f2 = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
const STORE_KEY = 'we13-style';
function initialStyle() {
  const h = new URLSearchParams(location.hash.slice(1)).get('stil');
  if (h && STYLES[h]) return h;
  try { const v = localStorage.getItem(STORE_KEY); if (v && STYLES[v]) return v; } catch { /* storage unavailable */ }
  return DEFAULT_STYLE;
}
const roomName = (id) => ROOMS.find((r) => r.id === id)?.name ?? BALCONIES.find((b) => b.id === id)?.name ?? id;

function progress(p, text) {
  $('#loadBar').style.width = `${Math.round(p * 100)}%`;
  if (text) $('#loadText').textContent = text;
}
function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600);
}

async function boot() {
  let viewer;
  try {
    viewer = await new Viewer($('#stage')).init();
  } catch (e) {
    progress(1, 'Weder WebGPU noch WebGL 2 verfügbar – bitte Hardwarebeschleunigung aktivieren.');
    console.error(e);
    return;
  }
  const T = { t0: performance.now() }; const mark = (k) => { T[k] = Math.round(performance.now() - T.t0); };
  progress(0.05, 'Materialien, Hölzer und Stein werden erzeugt …');
  const [M, lib] = await Promise.all([
    createMaterials().then((m) => { mark('materials'); return m; }),
    (async () => { const l = new ModelLibrary(); await l.load((p) => progress(0.1 + p * 0.3, 'Pflanzen und Keramik werden geladen …')); return l; })(),
  ]);
  progress(0.5, 'Wohnung wird aufgebaut …');
  await new Promise((r) => setTimeout(r, 30));
  mark('assets');
  const styleId = initialStyle();
  const apartment = new ApartmentScene(M, lib, styleId).build();
  mark('build');
  progress(0.72, 'Shader werden kompiliert, Licht und Umgebung berechnet …');
  viewer.setMode('orbit');
  await viewer.setApartment(apartment);
  mark('scene');
  viewer.goto('overview', false);
  viewer.renderNow();
  mark('firstFrame');
  progress(1, 'Fertig');
  setTimeout(() => $('#loader').classList.add('done'), 250);
  setTimeout(() => { $('#loader').style.display = 'none'; }, 1300);

  const ui = new UI(viewer, apartment, { M, lib });
  window.__app = { viewer, get apartment() { return ui.a; }, M, lib, timing: T, setVariant: (id) => ui.setStyle(id), validate: () => validateLayout(ui.a.items) };
  ui.init();
}

class UI {
  constructor(viewer, apartment, { M, lib }) { this.v = viewer; this.a = apartment; this.M = M; this.lib = lib; }

  get style() { return this.a.style; }
  get notes() { return roomNotes(this.a.style); }

  init() {
    this.tabs(); this.toolbar(); this.stylePicker(); this.stations(); this.details(); this.planView(); this.wallsView(); this.conceptView(); this.dialogs();
    this.v.on((type, data) => {
      if (type === 'pick') { this.showItem(data); this.plan?.select(data); }
      if (type === 'station') $$('#stationList button').forEach((b) => b.classList.toggle('active', b.dataset.id === data));
      if (type === 'mode') $$('#modeSeg button').forEach((b) => b.classList.toggle('active', b.dataset.mode === data));
      if (type === 'mood') $$('#moodSeg button').forEach((b) => b.classList.toggle('active', b.dataset.mood === data));
      if (type === 'render') {
        $$('#renderSeg button').forEach((b) => b.classList.toggle('active', b.dataset.render === data));
        document.body.classList.toggle('is-realistic', data === 'realistic');
      }
      if (type === 'converge') $('#converge i').style.width = `${Math.round(data * 100)}%`;
    });
    this.showRoom('living');
    if (window.matchMedia('(max-width: 700px)').matches) { $('#details').classList.add('hidden'); $('#stations').classList.add('collapsed'); $('[data-collapse="stations"]').textContent = '+'; }
  }

  tabs() {
    $$('.tabs button').forEach((b) => b.addEventListener('click', () => {
      $$('.tabs button').forEach((x) => x.classList.toggle('active', x === b));
      $$('.view').forEach((v) => v.classList.toggle('active', v.id === 'view-' + b.dataset.view));
      if (b.dataset.view === 'plan') this.plan.render();
      this.v.renderer.setAnimationLoop(b.dataset.view === '3d' ? () => this.v.loop() : null);
      if (b.dataset.view === '3d') this.v.invalidate();
    }));
  }

  toolbar() {
    const v = this.v;
    $$('#modeSeg button').forEach((b) => b.addEventListener('click', () => {
      if (b.dataset.mode === 'walk') v.goto(STATIONS.find((s) => s.id === v.station)?.mode === 'walk' ? v.station : 'living');
      else v.goto('overview');
    }));
    $('#moodSeg').innerHTML = Object.entries(MOODS).map(([k, m]) => `<button data-mood="${k}" class="${k === v.mood ? 'active' : ''}">${m.label}</button>`).join('');
    $$('#moodSeg button').forEach((b) => b.addEventListener('click', () => v.applyMood(b.dataset.mood)));
    $('#renderSeg').innerHTML = Object.entries(RENDER_MODES).map(([k, m]) => `<button data-render="${k}" title="${esc(m.title)}" class="${k === v.renderMode ? 'active' : ''}">${esc(m.label)}</button>`).join('');
    $$('#renderSeg button').forEach((b) => b.addEventListener('click', () => {
      v.setRenderMode(b.dataset.render);
      if (b.dataset.render === 'realistic') toast('Realistisch: globale Beleuchtung und Spiegelungen in Echtzeit – das Bild beruhigt sich nach ≈ 1 s Stillstand.');
    }));
    $('#engineBadge').textContent = `${v.backend} · three.js r186`;
    $('#exposure').addEventListener('input', (e) => v.setExposure(+e.target.value));
    $('#quality').addEventListener('change', (e) => v.setQuality(e.target.value));
    $('#btnShot').addEventListener('click', async () => this.download(await v.screenshot(), this.shotName()));
    $('[data-collapse="stations"]').addEventListener('click', (e) => { const p = $('#stations'); p.classList.toggle('collapsed'); e.target.textContent = p.classList.contains('collapsed') ? '+' : '–'; });
  }

  stations() {
    $('#stationList').innerHTML = STATIONS.map((s) => `<button data-id="${s.id}">${esc(s.label)}</button>`).join('');
    $$('#stationList button').forEach((b) => b.addEventListener('click', () => {
      this.v.goto(b.dataset.id);
      const st = STATIONS.find((s) => s.id === b.dataset.id);
      const room = { living: 'living', sofa: 'living', dining: 'living', hall: 'living', kitchen: 'kitchen', bedroom: 'bedroom', wardrobe: 'bedroom', office: 'office', library: 'office', bath: 'bath', guestbath: 'guestbath', balcony: 'balcony1' }[st.id];
      if (room) this.showRoom(room);
    }));
  }

  details() {
    this.detailEl = $('#detailBody');
    $('#detailClose').onclick = () => $('#details').classList.add('hidden');
    setTimeout(() => $('#hint').classList.add('off'), 9000);
  }

  showRoom(id) {
    const n = this.notes[id]; if (!n) return;
    this.lastRoom = id;
    $('#details').classList.remove('hidden');
    const r = ROOMS.find((x) => x.id === id), items = this.a.byRoom.get(id) ?? [];
    this.detailEl.innerHTML = `<span class="chip">Raum</span><h3>${esc(n.title)}</h3>
      ${r ? `<div class="sub">${f2(r.wfl)} m² Wohnfläche · Plan ${f2(r.planArea)} m²</div>` : ''}
      <p class="spec">${esc(n.zoning)}</p><ul>${n.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <div class="eyebrow" style="margin-top:14px">${items.filter((i) => i.cat !== 'Leuchte' || i.plan !== false).length} Positionen</div>`;
  }

  showItem(id) {
    if (!id) return;
    const it = this.a.items.find((i) => i.id === id); if (!it) return;
    $('#details').classList.remove('hidden');
    const dims = it.size ? `${Math.round(it.size[0] * 100)} × ${Math.round(it.size[1] * 100)} cm` : '–';
    this.detailEl.innerHTML = `<span class="chip">${esc(it.cat)}</span><h3>${esc(it.name)}</h3><p class="spec">${esc(it.spec)}</p>
      <dl><dt>Raum</dt><dd>${esc(roomName(it.room))}</dd><dt>Grundfläche</dt><dd>${dims}</dd>${it.elevation ? `<dt>Höhe</dt><dd>${f2(it.elevation)} m</dd>` : ''}</dl>
      <p style="margin-top:14px"><button class="ghost" id="btnFocus">Heranzoomen</button> <button class="ghost" id="btnRoom">Raumkonzept</button></p>`;
    $('#btnFocus').onclick = () => this.v.focusItem(id);
    $('#btnRoom').onclick = () => this.showRoom(it.room);
  }

  planView() {
    this.plan = new PlanView($('#plan'), this.a, {
      onSelect: ({ item, room }) => {
        if (item) { this.planInfoItem(item); this.v.select(item); }
        if (room) this.planInfoRoom(room);
      },
    });
    for (const [id, key] of [['#layerFurniture', 'furniture'], ['#layerDims', 'dims'], ['#layerLabels', 'labels'], ['#layerSoft', 'soft']]) {
      $(id).addEventListener('change', (e) => this.plan.set(key, e.target.checked));
    }
    const rooms = [...ROOMS.map((r) => [r.id, r.name, r.wfl]), ...BALCONIES.map((b) => [b.id, b.name, b.area])];
    $('#roomList').innerHTML = `<button data-room="" class="active"><span>Gesamte Wohnung</span><small>97,56 m²</small></button>` + rooms.map(([id, n, a]) => `<button data-room="${id}"><span>${esc(n)}</span><small>${f2(a)} m²</small></button>`).join('');
    $$('#roomList button').forEach((b) => b.addEventListener('click', () => {
      $$('#roomList button').forEach((x) => x.classList.toggle('active', x === b));
      this.plan.focusRoom(b.dataset.room || null);
      if (b.dataset.room) this.planInfoRoom(b.dataset.room);
    }));
    this.planInfoRoom('living');
  }

  planInfoRoom(id) {
    const n = this.notes[id]; const items = (this.a.byRoom.get(id) ?? []).filter((i) => i.footprint && i.plan !== false && i.plan !== 'soft');
    $('#planInfo').innerHTML = `<div class="eyebrow">Raum</div><h4>${esc(n?.title ?? roomName(id))}</h4><p class="sub">${esc(n?.zoning ?? '')}</p>
      <table class="inv">${items.map((i) => `<tr data-item="${i.id}"><td>${this.plan.number(i.id)}</td><td>${esc(i.name)}</td></tr>`).join('')}</table>`;
    $$('#planInfo tr').forEach((tr) => tr.addEventListener('click', () => { this.plan.select(tr.dataset.item); this.planInfoItem(tr.dataset.item); }));
  }

  planInfoItem(id) {
    const it = this.a.items.find((i) => i.id === id);
    $('#planInfo').innerHTML = `<div class="eyebrow">Position ${this.plan.number(id)} · ${esc(it.cat)}</div><h4>${esc(it.name)}</h4><p>${esc(it.spec)}</p>
      <p class="sub">${it.size ? `${Math.round(it.size[0] * 100)} × ${Math.round(it.size[1] * 100)} cm · ` : ''}${esc(roomName(it.room))}</p>
      <button class="ghost" id="planTo3d">Im 3D-Modell zeigen</button>`;
    $('#planTo3d').onclick = () => { $('.tabs button[data-view="3d"]').click(); this.v.focusItem(id); this.showItem(id); };
  }

  wallsView() {
    const sel = $('#wallRoom');
    sel.innerHTML = `<option value="">Alle Räume</option>` + ROOMS.map((r) => `<option value="${r.id}">${esc(r.name)}</option>`).join('');
    const draw = () => {
      const room = sel.value, min = +$('#wallMin').value || 0;
      const rows = WALLS.filter((w) => (!room || w.room === room) && w.length >= min);
      $('#wallTable').innerHTML = `<thead><tr><th>Wand</th><th>Raum</th><th>Länge</th><th>Öffnungen</th><th>Nettoabschnitte (möblierbar)</th><th>Summe netto</th><th>Status</th></tr></thead><tbody>` +
        rows.map((w) => {
          const net = w.parts.map(([a, b]) => (b - a) * w.length).filter((x) => x > 0.005);
          return `<tr><td><strong>${w.id}</strong></td><td>${esc(roomName(w.room))}</td><td class="num">${f2(w.length)} m</td>
          <td>${w.openings.map((o) => `<span class="pill op">${o.type === 'door' ? 'Tür' : o.type === 'sliding' ? 'Schiebetür' : 'Fenster'} ${f2(o.width)}</span>`).join('') || '–'}</td>
          <td>${net.map((x) => `<span class="pill">${f2(x)}</span>`).join('') || '–'}</td><td class="num">${f2(net.reduce((s, x) => s + x, 0))} m</td>
          <td>${w.review ? '<span class="pill warn">prüfen</span>' : w.furnishable ? 'geprüft' : '<span class="pill warn">Anschluss ungeklärt</span>'}</td></tr>`;
        }).join('') + '</tbody>';
    };
    sel.addEventListener('change', draw); $('#wallMin').addEventListener('input', draw); draw();
  }

  conceptView() {
    const st = this.style;
    const items = this.a.items.filter((i) => i.plan !== false || ['Leuchte', 'Kunst', 'Textil'].includes(i.cat)).filter((i) => !i.id.startsWith('spot-'));
    const byRoom = new Map();
    for (const it of items) { if (!byRoom.has(it.room)) byRoom.set(it.room, []); byRoom.get(it.room).push(it); }
    const brands = { Westwing: items.filter((i) => /Westwing/.test(i.name + i.spec)).length, IKEA: items.filter((i) => /IKEA/.test(i.name + i.spec)).length };
    const moods = [st.moodboard, ...Object.values(STYLES).map((x) => x.moodboard).filter((m) => m !== st.moodboard), 'Farben neu.png', 'kitchen-reference.png'];
    $('#concept').innerHTML = `
      <div class="style-tabs" role="tablist" aria-label="Stilwelt">${Object.values(STYLES).map((x) => `<button role="tab" data-style="${x.id}" class="${x.id === st.id ? 'active' : ''}"><span class="dots">${x.palette.slice(1, 7).map(([, c]) => `<i style="background:${c}"></i>`).join('')}</span>${esc(x.label)}</button>`).join('')}</div>
      <div class="concept-hero"><div><div class="eyebrow">Einrichtungskonzept WE 13 · Stilwelt</div><h2>${esc(st.label)}</h2><p class="lead"><strong>${esc(st.claim)}</strong> ${esc(st.lead)} Jede Position ist maßstäblich aus dem Ausführungsplan abgeleitet; Wege, Türschwenkbereiche und Fensterzugänge bleiben frei.</p>
        <p class="sub">${brands.Westwing} Positionen Westwing · ${brands.IKEA} Positionen IKEA · übrige: Bestand, Einbauten nach Maß, Deko</p></div>
      <div class="swatches">${st.palette.map(([n, c]) => `<div class="swatch" style="background:${c}"><span>${esc(n)}<br>${c}</span></div>`).join('')}</div></div>
      <div class="concept-cols">
        <div><div class="eyebrow">Materialität</div><div class="materials-list">${st.materials.map(([m, u]) => `<div>${esc(m)}<small>${esc(u)}</small></div>`).join('')}</div></div>
        <div><div class="eyebrow">Wandgestaltung</div><div class="materials-list">${st.walls.map(([m, u]) => `<div>${esc(m)}<small>${esc(u)}</small></div>`).join('')}</div></div>
        <div><div class="eyebrow">Lichtplanung</div><div class="materials-list">${st.lightPlan.map((l) => `<div>${esc(l)}</div>`).join('')}</div></div>
      </div>
      <div class="eyebrow" style="margin-top:28px">Luxus-Prinzipien · angewendet in allen Stilwelten</div>
      <div class="materials-list luxury">${LUXURY_PRINCIPLES.map(([t, d]) => `<div>${esc(t)}<small>${esc(d)}</small></div>`).join('')}</div>
      ${this.auditHtml()}
      <div class="cards">${Object.entries(this.notes).map(([id, n]) => `<div class="card"><div class="eyebrow">${esc(roomName(id))}</div><h4>${esc(n.title)}</h4><p>${esc(n.zoning)}</p>${n.points.length ? `<ul>${n.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
      <div class="eyebrow">Möbel- und Ausstattungsliste · ${esc(st.label)}</div><h3 style="margin:6px 0 14px">${items.length} Positionen</h3>
      <div class="table-wrap"><table class="inv"><thead><tr><th>#</th><th>Position</th><th>Raum</th><th>Kategorie</th><th>Maß (B × T)</th><th>Spezifikation / Bezugsquelle</th></tr></thead><tbody>
      ${[...byRoom].map(([room, list]) => list.map((i, k) => `<tr data-item="${i.id}"><td>${k + 1}</td><td>${esc(i.name)}</td><td>${esc(roomName(room))}</td><td>${esc(i.cat)}</td><td class="num">${i.size ? `${Math.round(i.size[0] * 100)} × ${Math.round(i.size[1] * 100)}` : '–'}</td><td>${esc(i.spec)}</td></tr>`).join('')).join('')}
      </tbody></table></div>
      <p class="sub" style="margin-top:10px">Westwing- und IKEA-Artikel mit Herstellermaßen (Recherche 09/2026); Maßanfertigungen und Stilreferenzen sind gekennzeichnet. Verfügbarkeit, Bezüge/Farben, Liefermaße und Montageabstände vor Bestellung prüfen.</p>
      <div class="eyebrow" style="margin-top:36px">Stilreferenzen</div>
      <div class="moodboards">${moods.map((m) => `<a href="assets/${encodeURIComponent(m)}" target="_blank" rel="noopener"><img loading="lazy" src="assets/${encodeURIComponent(m)}" alt="${esc(m.replace('.png', ''))}"></a>`).join('')}</div>`;
    $$('#concept tr[data-item]').forEach((tr) => tr.addEventListener('click', () => { $('.tabs button[data-view="3d"]').click(); this.v.focusItem(tr.dataset.item); this.showItem(tr.dataset.item); }));
    $$('#concept .style-tabs button').forEach((b) => b.addEventListener('click', () => this.setStyle(b.dataset.style)));
  }

  /** Stilwelt-Leiste direkt im 3D-Viewer (plus Tasten 1–4). */
  stylePicker() {
    const bar = $('#styleBar'), ids = Object.keys(STYLES);
    const render = () => {
      bar.innerHTML = Object.values(STYLES).map((x, i) => `<button role="tab" data-style="${x.id}" aria-selected="${x.id === this.style.id}" class="${x.id === this.style.id ? 'active' : ''}" title="${esc(x.label)} – ${esc(x.claim)}">
        <span class="dots">${x.palette.slice(1, 6).map(([, c]) => `<i style="background:${c}"></i>`).join('')}</span>${esc(x.short)}<kbd>${i + 1}</kbd></button>`).join('');
      $$('#styleBar button').forEach((b) => b.addEventListener('click', () => this.setStyle(b.dataset.style)));
    };
    this.renderStylePicker = render;
    render();
    window.addEventListener('keydown', (e) => {
      if (e.target.closest('input,textarea,select') || e.ctrlKey || e.metaKey || e.altKey) return;
      const i = +e.key - 1;
      if (ids[i] && $('#view-3d').classList.contains('active')) this.setStyle(ids[i]);
    });
  }

  /** Switches the furnishing style: rebuilds the apartment, keeps camera, mood and selection context. */
  async setStyle(id) {
    if (!STYLES[id] || id === this.style.id || this.busy) return;
    this.busy = true;
    document.body.classList.add('is-switching');
    $('#switching').textContent = `${STYLES[id].label} wird eingerichtet …`;
    try {
      await new Promise((r) => requestAnimationFrame(() => setTimeout(r, 20)));
      const a = new ApartmentScene(this.M, this.lib, id).build();
      const cam = { pos: this.v.camera.position.clone(), target: this.v.controls.target.clone() };
      await this.v.setApartment(a);
      this.v.camera.position.copy(cam.pos); this.v.controls.target.copy(cam.target); this.v.controls.update();
      this.a = a;
      try { localStorage.setItem(STORE_KEY, id); } catch { /* storage unavailable */ }
      history.replaceState(null, '', '#stil=' + id);
      this.plan.apartment = a; this.plan.selected = null; this.plan.render();
      this.planInfoRoom('living');
      this.conceptView();
      this.renderStylePicker();
      this.showRoom(ROOMS.some((r) => r.id === this.lastRoom) ? this.lastRoom : 'living');
      document.title = `WE 13 · ${STYLES[id].short} · Raumatelier`;
      toast(`Stilwelt: ${STYLES[id].label}`);
    } catch (e) {
      console.error(e); toast('Stilwechsel fehlgeschlagen: ' + e.message);
    } finally {
      document.body.classList.remove('is-switching');
      this.busy = false;
    }
  }

  auditHtml() {
    const r = validateLayout(this.a.items), c = r.checks;
    const total = c.containment + c.collisions + c.doors + c.windows;
    return `<div class="audit ${r.ok ? 'ok' : 'bad'}"><div><div class="eyebrow">Automatische Planungsprüfung</div>
      <h4>${r.issues.length ? `${r.issues.length} Hinweis(e)` : 'Alle Prüfungen bestanden'}</h4>
      <p>${total} Einzelprüfungen: ${c.containment}× Lage innerhalb der gemessenen Raumkontur · ${c.collisions}× Kollisionsfreiheit · ${c.doors}× 90-cm-Bewegungsfläche vor Türen · ${c.windows}× Zugang zu Fenstern/Balkontüren.</p>
      ${r.issues.length ? `<ul>${r.issues.map((i) => `<li><strong>${esc(i.type)}:</strong> ${esc(i.msg)}</li>`).join('')}</ul>` : ''}</div></div>`;
  }

  dialogs() {
    $('#btnExport').onclick = () => $('#dlgExport').showModal();
    $('#btnSources').onclick = () => { this.sources(); $('#dlgSources').showModal(); };
    $$('dialog [data-close]').forEach((b) => b.addEventListener('click', () => b.closest('dialog').close()));
    $$('[data-export]').forEach((b) => b.addEventListener('click', () => { this.export(b.dataset.export); $('#dlgExport').close(); }));
  }

  sources() {
    $('#sourcesBody').innerHTML = `<p>Raumkonturen aus den Vektordaten des Ausführungsplans <em>TWL62-64_WE 13_AP ELT HLS_M100 (01.06.2026)</em>, Maßstab ${f2(PLAN.scale)} pt/m, kalibriert auf:</p>
      <table><thead><tr><th>Referenz</th><th>Vektor</th><th>Planmaß</th></tr></thead><tbody>${PLAN.calibration.map((c) => `<tr><td>${esc(c.label)}</td><td class="num">${f2(c.vector)} pt</td><td class="num">${f2(c.reference)} m</td></tr>`).join('')}</tbody></table>
      <p style="margin-top:14px">Raumhöhe 2,56 m (RH laut Raumstempel), Türen 2,135 m lichte Höhe, bodentiefe Fenster (BRH 0,00). Wandstärken werden aus den Abständen benachbarter Raumkonturen abgeleitet (Außenwände 36 cm).</p>
      <p><strong>Wichtig:</strong> Planungs- und Visualisierungswerkzeug, kein Bestandsaufmaß. Vor Möbelkauf, Einbau oder Montage lichte Maße, Türanschläge, Heizkörper, Elektro- und Sanitäranschlüsse vor Ort prüfen.</p>
      <p><a href="assets/TWL62-64_WE%2013_AP%20ELT%20HLS_M100_A4_20260601.pdf" target="_blank" rel="noopener">Architektenplan (PDF) öffnen ↗</a></p>`;
  }

  shotName(suffix = '') { return `WE13_${this.style.id}_${this.v.station ?? 'ansicht'}_${this.v.renderMode}${suffix}.png`; }

  download(url, name) {
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
    if (url.startsWith('blob:')) setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  blob(text, type) { return URL.createObjectURL(new Blob([text], { type })); }

  async export(kind) {
    const v = this.v;
    if (kind === 'png') this.download(await v.screenshot(), this.shotName());
    if (kind === 'png4k') {
      const pr = v.renderer.getPixelRatio(); v.renderer.setPixelRatio(pr * 2); v.resize();
      try { this.download(await v.screenshot(), this.shotName('_2x')); } finally { v.renderer.setPixelRatio(pr); v.resize(); }
    }
    if (kind === 'svg') this.download(this.blob(this.plan.svg({ forExport: true }), 'image/svg+xml'), `WE13_grundriss_${this.style.id}.svg`);
    if (kind === 'csvWalls') {
      const rows = [['Wand', 'Raum', 'Laenge_m', 'Oeffnungen', 'Nettoabschnitte_m', 'Netto_Summe_m', 'Pruefen']];
      for (const w of WALLS) {
        const net = w.parts.map(([a, b]) => (b - a) * w.length).filter((x) => x > 0.005);
        rows.push([w.id, roomName(w.room), w.length.toFixed(3), w.openings.map((o) => `${o.type}:${o.width.toFixed(3)}`).join(' | '), net.map((x) => x.toFixed(3)).join(' | '), net.reduce((s, x) => s + x, 0).toFixed(3), w.review ? 'ja' : 'nein']);
      }
      this.download(this.blob(csv(rows), 'text/csv'), 'WE13_wandmasse.csv');
    }
    if (kind === 'csvItems') {
      const rows = [['ID', 'Position', 'Raum', 'Kategorie', 'Breite_cm', 'Tiefe_cm', 'Spezifikation', 'X_m', 'Y_m', 'Drehung_grad']];
      for (const i of this.a.items) rows.push([i.id, i.name, roomName(i.room), i.cat, i.size ? Math.round(i.size[0] * 100) : '', i.size ? Math.round(i.size[1] * 100) : '', i.spec, i.pos[0].toFixed(3), i.pos[1].toFixed(3), ((i.yaw * 180) / Math.PI).toFixed(1)]);
      this.download(this.blob(csv(rows), 'text/csv'), `WE13_moebelliste_${this.style.id}.csv`);
    }
    if (kind === 'json') {
      const data = { style: this.style.id, plan: PLAN, rooms: ROOMS, furniture: this.a.items.map(({ object, ...rest }) => rest) };
      this.download(this.blob(JSON.stringify(data, null, 1), 'application/json'), `WE13_geometrie_einrichtung_${this.style.id}.json`);
    }
    if (kind === 'print') { $('.tabs button[data-view="plan"]').click(); setTimeout(() => window.print(), 300); }
    toast('Export erstellt');
  }
}

function csv(rows) { return '﻿' + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n'); }

boot().catch((e) => { console.error(e); progress(1, 'Fehler beim Laden: ' + e.message); });
