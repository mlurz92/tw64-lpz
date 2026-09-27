// Device-aware layout: classifies the viewport (phone portrait/landscape, tablet, desktop) and the
// primary input (touch or mouse), and adapts the 3D workspace so the rendering keeps as much of the
// screen as possible:
//  · phones: permanent panels become bottom sheets opened from compact chips, the toolbar shrinks to
//    camera mode + "Ansicht"; object details dock as a peekable sheet
//  · touch in walk mode: virtual joystick (walk) + one-finger look
//  · every device: immersive mode (canvas only, native fullscreen where available)
// Controls are relocated between their desktop place and the sheets, so every listener stays bound.

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

const MQ = {
  phone: matchMedia('(max-width: 700px)'),
  phoneLand: matchMedia('(orientation: landscape) and (max-height: 520px) and (max-width: 1100px)'),
  tablet: matchMedia('(max-width: 1180px)'),
  touch: matchMedia('(pointer: coarse)'),
  hoverless: matchMedia('(hover: none)'),
};

export function classify() {
  const layout = MQ.phoneLand.matches ? 'phone-land' : MQ.phone.matches ? 'phone' : MQ.tablet.matches ? 'tablet' : 'desktop';
  const input = MQ.touch.matches || (MQ.hoverless.matches && navigator.maxTouchPoints > 0) ? 'touch' : 'mouse';
  return { layout, input, compact: layout === 'phone' || layout === 'phone-land' };
}

export class Layout {
  constructor(viewer) {
    this.v = viewer;
    this.slots = new Map(); // relocated node → placeholder at its desktop position
    this.openSheet = null;
    this.state = null;
  }

  init() {
    this.bindSheets();
    this.bindDetails();
    this.bindPlanSheet();
    this.bindImmersive();
    this.bindJoystick();
    this.bindDragFade();
    this.bindHint();
    const update = () => this.apply();
    for (const q of Object.values(MQ)) q.addEventListener('change', update);
    window.addEventListener('resize', () => { clearTimeout(this._rt); this._rt = setTimeout(update, 120); });
    this.v.on((type) => { if (type === 'mode') this.updateJoystick(); });
    this.apply();
    return this;
  }

  /** Re-evaluates device class; relocates controls only when the class actually changes. */
  apply() {
    const s = classify(), b = document.body, prev = this.state;
    b.dataset.layout = s.layout; b.dataset.input = s.input;
    this.state = s;
    if (prev && prev.layout === s.layout && prev.input === s.input) return;
    this.closeSheet();
    // phones and tablets: light/render/quality live in the "Ansicht" sheet, the toolbar stays short
    const sheets = s.compact || s.layout === 'tablet';
    b.classList.toggle('use-sheets', sheets);
    if (s.compact) this.mount($('#stationList'), $('[data-slot="stations"]')); else this.unmount($('#stationList'));
    if (sheets) this.mount($('#toolGroup'), $('[data-slot="tools"]')); else this.unmount($('#toolGroup'));
    // first classification: start with free view on small screens (details/stations on demand)
    if (!prev) {
      if (s.layout !== 'desktop') $('#details').classList.add('hidden');
      if (s.layout === 'tablet' || s.compact) this.collapseStations(true);
      this.setPlanSheet(s.compact ? 'peek' : null);
    } else if (prev.compact !== s.compact) this.setPlanSheet(s.compact ? 'peek' : null);
    this.setHint(s);
    this.updateJoystick();
    this.v.invalidate?.();
  }

  mount(node, target) {
    if (!node || !target || node.parentElement === target) return;
    if (!this.slots.has(node)) {
      const ph = document.createComment('slot:' + (node.id || 'node'));
      node.before(ph);
      this.slots.set(node, ph);
    }
    target.appendChild(node);
  }

  unmount(node) {
    const ph = node && this.slots.get(node);
    if (ph) { ph.replaceWith(node); this.slots.delete(node); }
  }

  collapseStations(on) {
    const p = $('#stations'), btn = $('[data-collapse="stations"]');
    p.classList.toggle('collapsed', on);
    if (btn) btn.textContent = on ? '+' : '–';
  }

  setHint({ input, compact }) {
    const hint = $('#hint');
    if (!hint) return;
    hint.textContent = input === 'touch'
      ? 'Ziehen: drehen · zwei Finger: zoomen · Doppeltippen: hinfliegen / hingehen · Antippen: Details' + (compact ? '' : ' · ⛶: Vollbild')
      : 'Ziehen: drehen · Rechtsklick/Umschalt: verschieben · Rad: zoomen · Doppelklick: hinfliegen / hingehen · Klick auf Möbel: Details · 1–4: Stilwelt · F: Vollbild';
  }

  /** The gesture hint leaves after the first interaction with the model (or after 9 s). */
  bindHint() {
    const hide = () => $('#hint')?.classList.add('off');
    $('#stage').addEventListener('pointerdown', hide, { once: true });
    setTimeout(hide, 9000);
  }

  // ---------------------------------------------------------------- bottom sheets
  bindSheets() {
    $$('[data-sheet-open]').forEach((b) => b.addEventListener('click', () => {
      const id = b.dataset.sheetOpen;
      if (this.openSheet?.id === id) this.closeSheet(); else this.showSheet(id);
    }));
    $$('.sheet [data-sheet-close]').forEach((b) => b.addEventListener('click', () => this.closeSheet()));
    $('#sheetBackdrop').addEventListener('click', () => this.closeSheet());
    window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && this.openSheet) this.closeSheet(); });
    for (const sheet of $$('.sheet')) {
      const close = () => this.closeSheet();
      this.swipeToClose(sheet, $('.sheet-grip', sheet), close, $('.sheet-head', sheet));
      this.pullFromBody(sheet, $('.sheet-body', sheet), close);
    }
    // choosing a station or style in a sheet closes it – the view is what the user wants to see
    $('#stationList').addEventListener('click', (e) => {
      if (!e.target.closest('button')) return;
      if (this.state?.compact) this.closeSheet();
      else if (this.state?.layout === 'tablet') this.collapseStations(true); // tablets: free the view again
    });
    $('#styleSheet').addEventListener('click', (e) => { if (e.target.closest('button')) this.closeSheet(); });
  }

  showSheet(id) {
    this.closeSheet();
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('open'); el.setAttribute('aria-hidden', 'false');
    document.body.classList.add('sheet-open');
    $$(`[data-sheet-open="${id}"]`).forEach((b) => b.setAttribute('aria-expanded', 'true'));
    this.openSheet = el;
    $('.sheet-body button.active, .sheet-body button', el)?.focus({ preventScroll: true });
  }

  closeSheet() {
    const el = this.openSheet;
    if (!el) return;
    el.classList.remove('open'); el.setAttribute('aria-hidden', 'true'); el.style.transform = '';
    document.body.classList.remove('sheet-open');
    $$(`[data-sheet-open="${el.id}"]`).forEach((b) => b.setAttribute('aria-expanded', 'false'));
    this.openSheet = null;
  }

  /**
   * Drag a sheet by its grip/header: it follows the finger; releasing beyond 70 px (or a flick)
   * closes it. Landscape drawers (phone-land) are dragged to the right instead of down.
   * An upward drag/flick calls onOpen (details and plan sheets expand).
   */
  swipeToClose(sheet, ...args) {
    const [onClose, onOpen] = args.filter((h) => typeof h === 'function');
    for (const h of args.filter((x) => x instanceof Element)) {
      let start = null;
      h.addEventListener('pointerdown', (e) => {
        if (e.pointerType === 'mouse' || e.target.closest('button:not(.sheet-grip), a, input, select')) return;
        start = { x: e.clientX, y: e.clientY, t: performance.now(), axis: this.sheetAxis(sheet), moved: false };
        h.setPointerCapture(e.pointerId);
        sheet.style.transition = 'none';
      });
      h.addEventListener('pointermove', (e) => {
        if (!start) return;
        const d = start.axis === 'x' ? e.clientX - start.x : e.clientY - start.y;
        if (Math.abs(d) > 6) start.moved = true;
        // closing direction follows the finger 1 : 1, the opening direction with resistance
        sheet.style.transform = start.axis === 'x' ? `translateX(${Math.max(0, d)}px)` : `translateY(${d > 0 ? d : onOpen ? d / 4 : 0}px)`;
      });
      const end = (e) => {
        if (!start) return;
        const d = start.axis === 'x' ? e.clientX - start.x : e.clientY - start.y, v = d / Math.max(1, performance.now() - start.t);
        const moved = start.moved;
        start = null; sheet.style.transition = ''; sheet.style.transform = '';
        if (d > 70 || v > 0.6) { onClose(); if (moved) this.swallowClick(h); } else if (onOpen && (d < -40 || v < -0.5)) { onOpen(); if (moved) this.swallowClick(h); }
      };
      h.addEventListener('pointerup', end);
      h.addEventListener('pointercancel', end);
    }
  }

  sheetAxis(sheet) { return this.state?.layout === 'phone-land' && sheet.classList.contains('sheet') ? 'x' : 'y'; }

  /** A drag that ended on a grip must not additionally fire its click (toggle) handler. */
  swallowClick(el) {
    const stop = (e) => { e.stopPropagation(); e.preventDefault(); };
    el.addEventListener('click', stop, { capture: true, once: true });
    setTimeout(() => el.removeEventListener('click', stop, { capture: true }), 350);
  }

  /**
   * Pull-to-close from the scrollable body of a sheet: when its content is scrolled to the top,
   * a downward drag moves the whole sheet (like native iOS/Android sheets); otherwise the content
   * scrolls normally. Touch events, because the browser would claim a pointer drag for scrolling.
   */
  pullFromBody(sheet, body, onClose) {
    if (!body) return;
    let s = null;
    body.addEventListener('touchstart', (e) => {
      s = e.touches.length === 1 ? { y: e.touches[0].clientY, t: performance.now(), pulling: false } : null;
    }, { passive: true });
    body.addEventListener('touchmove', (e) => {
      if (!s || this.sheetAxis(sheet) === 'x') return;
      const dy = e.touches[0].clientY - s.y;
      if (!s.pulling) {
        if (body.scrollTop <= 0 && dy > 8) { s.pulling = true; s.y += 8; sheet.style.transition = 'none'; } else if (Math.abs(dy) > 8) { s = null; return; } else return;
      }
      e.preventDefault();
      sheet.style.transform = `translateY(${Math.max(0, e.touches[0].clientY - s.y)}px)`;
    }, { passive: false });
    const end = (e) => {
      if (!s?.pulling) { s = null; return; }
      const t = e.changedTouches[0], dy = t.clientY - s.y, v = dy / Math.max(1, performance.now() - s.t);
      s = null; sheet.style.transition = ''; sheet.style.transform = '';
      if (dy > 80 || v > 0.7) onClose();
    };
    body.addEventListener('touchend', end);
    body.addEventListener('touchcancel', end);
  }

  // ---------------------------------------------------------------- details (peek sheet on phones)
  bindDetails() {
    const d = $('#details'), grip = $('#detailGrip');
    const toggle = () => d.classList.toggle('expanded');
    grip.addEventListener('click', toggle);
    grip.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
    // tapping the collapsed header expands it; swiping down collapses, then hides
    d.addEventListener('click', (e) => {
      if (!this.state?.compact || d.classList.contains('expanded') || e.target.closest('button,a,#detailGrip')) return;
      d.classList.add('expanded');
    });
    this.swipeToClose(d, grip, () => {
      if (d.classList.contains('expanded')) d.classList.remove('expanded'); else d.classList.add('hidden');
    }, () => d.classList.add('expanded'));
    // new content always starts collapsed on phones so the 3D view stays visible
    new MutationObserver(() => { if (this.state?.compact) { d.classList.remove('expanded'); d.scrollTop = 0; } })
      .observe($('#detailBody'), { childList: true });
  }

  // ---------------------------------------------------------------- plan side panel as sheet
  bindPlanSheet() {
    const side = $('#planSide');
    $('#planGrip').addEventListener('click', () => this.setPlanSheet(side.dataset.sheet === 'peek' ? 'half' : 'peek'));
    this.swipeToClose(side, $('#planGrip'), () => this.setPlanSheet('peek'), () => this.setPlanSheet('half'));
    $$('.plan-zoom [data-zoom]').forEach((b) => b.addEventListener('click', () => {
      const plan = this.planView;
      if (!plan) return;
      if (b.dataset.zoom === 'fit') plan.focusRoom(null);
      else plan.zoomBy(b.dataset.zoom === 'in' ? 0.6 : 1 / 0.6, undefined, undefined, { animate: true });
    }));
  }

  setPlanSheet(state) {
    const side = $('#planSide');
    if (state) side.dataset.sheet = state; else delete side.dataset.sheet;
    $('#planGrip')?.setAttribute('aria-expanded', String(state !== 'peek'));
  }

  /** A room or position chosen in the plan: on phones the sheet opens so its info is visible. */
  revealPlanInfo() {
    if (this.state?.compact) { this.setPlanSheet('half'); $('#planSide').scrollTop = 0; }
  }

  // ---------------------------------------------------------------- immersive / fullscreen
  bindImmersive() {
    const toggle = () => this.setImmersive(!document.body.classList.contains('immersive'));
    $('#btnImmersive').addEventListener('click', toggle);
    $('#btnImmersiveExit').addEventListener('click', () => this.setImmersive(false));
    window.addEventListener('keydown', (e) => {
      if (e.target.closest?.('input,textarea,select,dialog') || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.key.toLowerCase() === 'f' && $('#view-3d').classList.contains('active')) toggle();
      if (e.key === 'Escape' && document.body.classList.contains('immersive') && !this.openSheet) this.setImmersive(false);
    });
    document.addEventListener('fullscreenchange', () => {
      if (!document.fullscreenElement && this._fsByUs) { this._fsByUs = false; this.setImmersive(false); }
    });
  }

  setImmersive(on) {
    const b = document.body;
    if (b.classList.contains('immersive') === on) return;
    this.closeSheet();
    b.classList.toggle('immersive', on);
    const root = document.documentElement;
    if (on && root.requestFullscreen && !document.fullscreenElement) {
      root.requestFullscreen({ navigationUI: 'hide' }).then(() => { this._fsByUs = true; }).catch(() => {});
    } else if (!on && document.fullscreenElement && this._fsByUs) {
      this._fsByUs = false; document.exitFullscreen().catch(() => {});
    }
    this.v.invalidate?.();
  }

  // ---------------------------------------------------------------- touch joystick (walk mode)
  bindJoystick() {
    const joy = $('#joystick'), knob = $('.joy-knob', joy);
    let id = null, cx = 0, cy = 0;
    const R = 44;
    const set = (x, y) => {
      let dx = x - cx, dy = y - cy;
      const d = Math.hypot(dx, dy);
      if (d > R) { dx *= R / d; dy *= R / d; }
      knob.style.transform = `translate(${dx}px, ${dy}px)`;
      // small dead zone against drift, then a soft response curve for fine steps
      const m = Math.max(0, (Math.min(d, R) / R - 0.12) / 0.88), k = d > 0 ? (m * m * 0.4 + m * 0.6) / (Math.min(d, R) / R || 1) : 0;
      this.v.setMoveInput((dx / R) * k, (-dy / R) * k);
    };
    joy.addEventListener('pointerdown', (e) => {
      e.preventDefault(); e.stopPropagation();
      id = e.pointerId; joy.setPointerCapture(id); joy.classList.add('active');
      navigator.vibrate?.(8); // Android: short tick when the stick is grabbed
      const r = joy.getBoundingClientRect(); cx = r.left + r.width / 2; cy = r.top + r.height / 2;
      set(e.clientX, e.clientY);
    });
    joy.addEventListener('pointermove', (e) => { if (e.pointerId === id) set(e.clientX, e.clientY); });
    const end = (e) => {
      if (e.pointerId !== id) return;
      id = null; joy.classList.remove('active'); knob.style.transform = '';
      this.v.setMoveInput(0, 0);
    };
    joy.addEventListener('pointerup', end);
    joy.addEventListener('pointercancel', end);
    joy.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  updateJoystick() {
    const show = this.state?.input === 'touch' && this.v.mode === 'walk';
    document.body.classList.toggle('show-joystick', !!show);
    if (!show) this.v.setMoveInput?.(0, 0);
  }

  // ---------------------------------------------------------------- overlays fade while navigating
  bindDragFade() {
    // class on the 3D view only: a body class would restyle the whole document twice per drag
    const stage = $('#stage'), b = $('#view-3d');
    let t = null;
    stage.addEventListener('pointerdown', (e) => {
      if (e.pointerType !== 'touch') return;
      clearTimeout(t); t = setTimeout(() => b.classList.add('is-navigating'), 180);
    });
    const end = () => { clearTimeout(t); t = null; b.classList.remove('is-navigating'); };
    stage.addEventListener('pointerup', end);
    stage.addEventListener('pointercancel', end);
    stage.addEventListener('pointerleave', end);
  }
}
