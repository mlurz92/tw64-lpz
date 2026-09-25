// Application bootstrap and UI wiring.
import { Viewer, MOODS, STATIONS } from './engine/viewer.js';
import { createMaterials } from './engine/materials.js';
import { ModelLibrary } from './engine/models.js';
import { ApartmentScene } from './engine/scene.js';
import { PlanView } from './ui/plan2d.js';
import { ROOMS, WALLS, BALCONIES } from './core/geometry.js';
import { CONCEPT, ROOM_NOTES } from './data/design.js';
import PLAN from './data/plan.js';
import { validateLayout } from './core/validate.js';

const $ = (s) => document.querySelector(s);
const $$ = (s) => [...document.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const f2 = (n) => n.toLocaleString('de-DE', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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
    viewer = new Viewer($('#stage'));
  } catch (e) {
    progress(1, 'WebGL 2 ist nicht verfügbar – bitte Hardwarebeschleunigung aktivieren.');
    console.error(e);
    return;
  }
  progress(0.05, 'Materialien, Hölzer und Stein werden erzeugt …');
  const [M, lib] = await Promise.all([
    createMaterials(),
    (async () => { const l = new ModelLibrary(); await l.load((p) => progress(0.1 + p * 0.3, 'Pflanzen und Keramik werden geladen …')); return l; })(),
  ]);
  progress(0.5, 'Wohnung wird aufgebaut …');
  await new Promise((r) => setTimeout(r, 30));
  const apartment = new ApartmentScene(M, lib).build();
  progress(0.75, 'Licht und Umgebung werden berechnet …');
  viewer.setApartment(apartment);
  await viewer.loadHDRI(MOODS.day.hdri);
  viewer.setMode('orbit');
  viewer.goto('overview', false);
  progress(0.92, 'Shader werden kompiliert …');
  await viewer.renderer.compileAsync?.(viewer.scene, viewer.camera).catch(() => {});
  progress(1, 'Fertig');
  setTimeout(() => $('#loader').classList.add('done'), 250);
  setTimeout(() => { $('#loader').style.display = 'none'; }, 1300);

  window.__app = { viewer, apartment, M, lib };
  const ui = new UI(viewer, apartment);
  ui.init();
}

class UI {
  constructor(viewer, apartment) { this.v = viewer; this.a = apartment; }

  init() {
    this.tabs(); this.toolbar(); this.stations(); this.details(); this.planView(); this.wallsView(); this.conceptView(); this.dialogs();
    this.v.on((type, data) => {
      if (type === 'pick') { this.showItem(data); this.plan?.select(data); }
      if (type === 'station') $$('#stationList button').forEach((b) => b.classList.toggle('active', b.dataset.id === data));
      if (type === 'mode') $$('#modeSeg button').forEach((b) => b.classList.toggle('active', b.dataset.mode === data));
      if (type === 'mood') $$('#moodSeg button').forEach((b) => b.classList.toggle('active', b.dataset.mood === data));
      if (type === 'samples') $('#ptLabel').textContent = `Pathtracing · ${data} Samples`;
      if (type === 'pathtracer') {
        $('#btnPT').classList.toggle('on', data.active);
        if (!data.active) $('#ptLabel').textContent = 'Fotorealistisch rendern';
        else if (data.building) $('#ptLabel').textContent = `BVH wird aufgebaut ${data.progress ? Math.round(data.progress * 100) + ' %' : '…'}`;
      }
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
    $('#btnPT').addEventListener('click', async () => {
      if (v.pathTracer.active) { v.pathTracer.stop(); return; }
      toast('Pathtracer startet – das Bild verfeinert sich mit jedem Sample. Kamera ruhig halten.');
      try { await v.pathTracer.start(); } catch (e) { console.error(e); v.pathTracer.stop(); toast('Pathtracing wird von diesem Gerät nicht unterstützt.'); }
    });
    $('#exposure').addEventListener('input', (e) => v.setExposure(+e.target.value));
    $('#quality').addEventListener('change', (e) => v.setQuality(e.target.value));
    $('#btnShot').addEventListener('click', () => this.download(v.screenshot(), `WE13_${v.station ?? 'ansicht'}.png`));
    $('[data-collapse="stations"]').addEventListener('click', (e) => { const p = $('#stations'); p.classList.toggle('collapsed'); e.target.textContent = p.classList.contains('collapsed') ? '+' : '–'; });
  }

  stations() {
    $('#stationList').innerHTML = STATIONS.map((s) => `<button data-id="${s.id}">${esc(s.label)}</button>`).join('');
    $$('#stationList button').forEach((b) => b.addEventListener('click', () => {
      this.v.goto(b.dataset.id);
      const st = STATIONS.find((s) => s.id === b.dataset.id);
      const room = { living: 'living', sofa: 'living', dining: 'living', hall: 'living', kitchen: 'kitchen', bedroom: 'bedroom', wardrobe: 'bedroom', office: 'office', bath: 'bath', guestbath: 'guestbath', balcony: 'balcony1' }[st.id];
      if (room) this.showRoom(room);
    }));
  }

  details() {
    this.detailEl = $('#detailBody');
    $('#detailClose').onclick = () => $('#details').classList.add('hidden');
    setTimeout(() => $('#hint').classList.add('off'), 9000);
  }

  showRoom(id) {
    const n = ROOM_NOTES[id]; if (!n) return;
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
    const n = ROOM_NOTES[id]; const items = (this.a.byRoom.get(id) ?? []).filter((i) => i.footprint && i.plan !== false && i.plan !== 'soft');
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
    const items = this.a.items.filter((i) => i.plan !== false || ['Leuchte', 'Kunst', 'Textil'].includes(i.cat)).filter((i) => !i.id.startsWith('spot-'));
    const byRoom = new Map();
    for (const it of items) { if (!byRoom.has(it.room)) byRoom.set(it.room, []); byRoom.get(it.room).push(it); }
    const moods = ['Moodboard Refined Metallic Japandi.png', 'Farben neu.png', 'Moodboard Japandi x Soft Brutalism.png', 'Moodboard Refined Brutalism.png', 'Moodboard Cool Quiet Luxury.png', 'kitchen-reference.png'];
    $('#concept').innerHTML = `
      <div class="concept-hero"><div><div class="eyebrow">Einrichtungskonzept WE 13</div><h2>${esc(CONCEPT.title)}</h2><p class="lead">${esc(CONCEPT.claim)} Warme Eiche, Räuchereiche mit Kannelierung, heller Calacatta, gebürstete Bronze und Salbei-Akzente auf warm-greigem Kalkputz. Jede Position ist maßstäblich aus dem Ausführungsplan abgeleitet; Wege, Türschwenkbereiche und Fensterzugänge bleiben frei.</p></div>
      <div class="swatches">${CONCEPT.palette.map(([n, c]) => `<div class="swatch" style="background:${c}"><span>${esc(n)}<br>${c}</span></div>`).join('')}</div></div>
      <div class="eyebrow" style="margin-top:40px">Materialität</div>
      <div class="materials-list">${CONCEPT.materials.map(([m, u]) => `<div>${esc(m)}<small>${esc(u)}</small></div>`).join('')}</div>
      ${this.auditHtml()}
      <div class="cards">${Object.entries(ROOM_NOTES).map(([id, n]) => `<div class="card"><div class="eyebrow">${esc(roomName(id))}</div><h4>${esc(n.title)}</h4><p>${esc(n.zoning)}</p>${n.points.length ? `<ul>${n.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : ''}</div>`).join('')}</div>
      <div class="eyebrow">Möbel- und Ausstattungsliste</div><h3 style="margin:6px 0 14px">${items.length} Positionen</h3>
      <div class="table-wrap"><table class="inv"><thead><tr><th>#</th><th>Position</th><th>Raum</th><th>Kategorie</th><th>Maß (B × T)</th><th>Spezifikation / Empfehlung</th></tr></thead><tbody>
      ${[...byRoom].map(([room, list]) => list.map((i, k) => `<tr data-item="${i.id}"><td>${k + 1}</td><td>${esc(i.name)}</td><td>${esc(roomName(room))}</td><td>${esc(i.cat)}</td><td class="num">${i.size ? `${Math.round(i.size[0] * 100)} × ${Math.round(i.size[1] * 100)}` : '–'}</td><td>${esc(i.spec)}</td></tr>`).join('')).join('')}
      </tbody></table></div>
      <p class="sub" style="margin-top:10px">Produktnamen sind Stil- bzw. Größenreferenzen. Verfügbarkeit, Varianten, Liefermaße und Montageabstände vor Bestellung prüfen.</p>
      <div class="eyebrow" style="margin-top:36px">Stilreferenzen</div>
      <div class="moodboards">${moods.map((m) => `<a href="assets/${encodeURIComponent(m)}" target="_blank" rel="noopener"><img loading="lazy" src="assets/${encodeURIComponent(m)}" alt="${esc(m.replace('.png', ''))}"></a>`).join('')}</div>`;
    $$('#concept tr[data-item]').forEach((tr) => tr.addEventListener('click', () => { $('.tabs button[data-view="3d"]').click(); this.v.focusItem(tr.dataset.item); this.showItem(tr.dataset.item); }));
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

  download(url, name) {
    const a = document.createElement('a'); a.href = url; a.download = name; a.click();
    if (url.startsWith('blob:')) setTimeout(() => URL.revokeObjectURL(url), 2000);
  }

  blob(text, type) { return URL.createObjectURL(new Blob([text], { type })); }

  export(kind) {
    const v = this.v;
    if (kind === 'png') this.download(v.screenshot(), `WE13_${v.station ?? 'ansicht'}${v.pathTracer.active ? '_pathtraced' : ''}.png`);
    if (kind === 'png4k') {
      const pr = v.renderer.getPixelRatio(); v.renderer.setPixelRatio(pr * 2); v.resize();
      v.composer.render(0); this.download(v.renderer.domElement.toDataURL('image/png'), 'WE13_ansicht_2x.png');
      v.renderer.setPixelRatio(pr); v.resize();
    }
    if (kind === 'svg') this.download(this.blob(this.plan.svg({ forExport: true }), 'image/svg+xml'), 'WE13_grundriss_einrichtung.svg');
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
      this.download(this.blob(csv(rows), 'text/csv'), 'WE13_moebelliste.csv');
    }
    if (kind === 'json') {
      const data = { plan: PLAN, rooms: ROOMS, furniture: this.a.items.map(({ object, ...rest }) => rest) };
      this.download(this.blob(JSON.stringify(data, null, 1), 'application/json'), 'WE13_geometrie_einrichtung.json');
    }
    if (kind === 'print') { $('.tabs button[data-view="plan"]').click(); setTimeout(() => window.print(), 300); }
    toast('Export erstellt');
  }
}

function csv(rows) { return '﻿' + rows.map((r) => r.map((c) => `"${String(c).replace(/"/g, '""')}"`).join(';')).join('\n'); }

boot().catch((e) => { console.error(e); progress(1, 'Fehler beim Laden: ' + e.message); });
