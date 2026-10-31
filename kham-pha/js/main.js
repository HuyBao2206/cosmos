// Khám phá vũ trụ — điều phối ba phần C1, C2, C3
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger.js';
import { initSite, initSmoothScroll } from '../../shared/js/site.js';
import { hasWebGL, fmt } from '../../shared/js/util.js';
import { heliocentric, julianDate } from '../../shared/js/astro/kepler.js';
import { PLANETS } from './planets-data.js';

gsap.registerPlugin(ScrollTrigger);
initSite();
initSmoothScroll(gsap, ScrollTrigger);

const $ = (sel, root = document) => root.querySelector(sel);
const ss = $('#he-mat-troi');
const q = (k) => $(`[data-ss="${k}"]`, ss);

// ---------- Định dạng ----------
const fmtHours = (h) => {
  const a = Math.abs(h);
  if (a < 48) return `${fmt(a, 1)} giờ`;
  return `${fmt(a / 24, a / 24 < 100 ? 1 : 0)} ngày`;
};
const fmtYear = (d) => (d < 1000 ? `${fmt(d, 1)} ngày` : `${fmt(d / 365.25, d / 365.25 < 100 ? 1 : 0)} năm`);

async function initC1() {
  if (!hasWebGL()) { document.documentElement.classList.add('no-webgl'); drawFallback(); return; }
  const { initSolarSystem, MODES, SPEEDS, formatDate, formatLightTime } = await import('./solar-system.js');
  const ui = {};
  let sys;
  try { sys = await initSolarSystem(ss, ui); }
  catch (e) { console.warn('Không khởi tạo được WebGL:', e); document.documentElement.classList.add('no-webgl'); drawFallback(); return; }
  const html = document.documentElement;

  // ---------- Tab trong bảng điều khiển ----------
  const tabs = [...ss.querySelectorAll('[role="tab"]')];
  const setTab = (id, focus = false) => {
    for (const t of tabs) {
      const on = t.dataset.tab === id;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    }
    ss.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== id; });
  };
  ss.querySelector('.ss-tabs').addEventListener('click', (e) => { const t = e.target.closest('[data-tab]'); if (t) setTab(t.dataset.tab); });
  ss.querySelector('.ss-tabs').addEventListener('keydown', (e) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
    const i = tabs.findIndex((t) => t.getAttribute('aria-selected') === 'true');
    setTab(tabs[(i + (e.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length].dataset.tab, true);
  });

  // ---------- Mở / đóng toàn màn hình ----------
  let isFull = false;
  const open = () => {
    if (isFull) return;
    isFull = true;
    ss.classList.add('is-full'); html.classList.add('ss-fullscreen');
    sys.setInteractive(true);
    history.pushState({ ssFull: true }, '');
    requestAnimationFrame(() => { sys.resetView(); q('close').focus({ preventScroll: true }); });
  };
  const close = (fromPop = false) => {
    if (!isFull) return;
    isFull = false;
    sys.unfocus();
    ss.classList.remove('is-full'); html.classList.remove('ss-fullscreen');
    sys.setInteractive(false);
    if (!fromPop && history.state?.ssFull) history.back();
    requestAnimationFrame(() => { ss.scrollIntoView({ block: 'center' }); q('open').focus({ preventScroll: true }); });
  };
  q('open').addEventListener('click', open);
  q('close').addEventListener('click', () => close());
  addEventListener('popstate', () => close(true));
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape' || !isFull) return;
    if (sys.state.focus) sys.unfocus(); else close();
  });
  // Chặn thao tác phóng to của trình duyệt khi đang điều khiển mô hình (chụm hai ngón, nhấn đúp)
  const stage = ss.querySelector('.ss-stage');
  ['gesturestart', 'gesturechange'].forEach((t) => stage.addEventListener(t, (e) => { if (isFull) e.preventDefault(); }, { passive: false }));
  stage.addEventListener('touchmove', (e) => { if (isFull && e.touches.length > 1) e.preventDefault(); }, { passive: false });
  let lastTap = 0;
  stage.addEventListener('touchend', (e) => { const now = Date.now(); if (isFull && now - lastTap < 320) e.preventDefault(); lastTap = now; }, { passive: false });

  // ---------- Thời gian ----------
  const speed = q('speed'), speedLabel = q('speed-label');
  const syncSpeed = () => { speed.value = sys.state.speedIndex; speedLabel.textContent = SPEEDS[sys.state.speedIndex].label; };
  speed.addEventListener('input', () => { sys.setSpeed(+speed.value); syncSpeed(); });
  q('today').addEventListener('click', () => { sys.today(); syncSpeed(); });
  q('date-input').addEventListener('change', (e) => {
    if (!e.target.value) return;
    const [y, m, d] = e.target.value.split('-').map(Number);
    const dt = new Date(Date.UTC(2000, m - 1, d, 12)); dt.setUTCFullYear(y);
    sys.setDate(dt); syncSpeed();
  });
  ui.onTick = (jd) => {
    const t = formatDate(jd);
    q('date').textContent = t; q('date-side').textContent = t; q('date-intro').textContent = t;
    const now = julianDate(new Date());
    q('live').textContent = sys.state.live ? 'Hôm nay' : Math.abs(jd - now) < 0.5 ? 'Hôm nay' : jd < now ? 'Quá khứ' : 'Tương lai';
  };
  ui.onTick(sys.state.jd);

  // ---------- Tỉ lệ ----------
  const caption = q('caption');
  const setCaption = (id) => { caption.innerHTML = `<b>${MODES[id].label}.</b> ${MODES[id].caption}`; };
  setCaption('easy');
  q('modes').addEventListener('click', (e) => {
    const b = e.target.closest('[data-mode]'); if (!b) return;
    q('modes').querySelectorAll('[data-mode]').forEach((x) => { const on = x === b; x.classList.toggle('is-active', on); x.setAttribute('aria-pressed', String(on)); });
    sys.setMode(b.dataset.mode);
  });
  ui.onMode = (id) => setCaption(id);

  // ---------- Xung ánh sáng ----------
  const out = q('pulse-out'), list = q('pulse-list'), clock = q('pulse-clock');
  q('pulse').addEventListener('click', () => sys.firePulse());
  q('rate').addEventListener('change', (e) => sys.setPulseRate(+e.target.value));
  sys.setPulseRate(+q('rate').value);
  ui.onPulse = (targets) => {
    setTab('light');
    out.hidden = false;
    list.innerHTML = targets.filter((t) => t.id !== 'pluto').map((t) => `<li data-id="${t.id}"><span>${t.name}</span><b>${formatLightTime(t.sec)}</b></li>`).join('');
  };
  ui.onPulseTick = (simSec, targets) => {
    const h = Math.floor(simSec / 3600), m = Math.floor((simSec % 3600) / 60), s = Math.floor(simSec % 60);
    clock.textContent = `${h ? h + ':' : ''}${String(m).padStart(h ? 2 : 1, '0')}:${String(s).padStart(2, '0')}`;
    for (const t of targets) list.querySelector(`[data-id="${t.id}"]`)?.classList.toggle('arrived', t.arrived);
  };

  // ---------- Hành tinh ----------
  q('pick').innerHTML = PLANETS.map((p) => `<button type="button" data-id="${p.id}"><img src="./assets/disks/${p.id}.webp" alt="">${p.vi}</button>`).join('');
  q('pick').addEventListener('click', (e) => { const b = e.target.closest('[data-id]'); if (b) sys.focusPlanet(b.dataset.id); });
  const f = (k) => $(`[data-f="${k}"]`, ss);
  ui.onFocus = (p, info) => {
    q('planet-pick').hidden = !!p;
    q('planet-info').hidden = !p;
    if (!p) return;
    setTab('planet');
    f('name').textContent = p.vi;
    f('en').textContent = p.dwarf ? `${p.en} · hành tinh lùn` : p.en;
    f('d').innerHTML = `${fmt(p.diameter)} km<small>${fmt(p.diameter / 12756, 2)} lần Trái Đất</small>`;
    f('rot').innerHTML = `${fmtHours(p.rotation)}<small>${p.rotation < 0 ? 'quay ngược chiều' : 'so với các sao'}</small>`;
    f('year').innerHTML = `${fmtYear(p.period)}<small>${fmt(p.period / 365.25, 2)} năm Trái Đất</small>`;
    f('light').textContent = `Ánh sáng Mặt Trời tới ${p.vi} lúc này mất ${formatLightTime(info.lightSec)}.`;
    f('profile').href = `#ho-so-${p.id}`;
  };
  f('profile').addEventListener('click', () => close());
  q('back').addEventListener('click', () => sys.unfocus());
  q('reset').addEventListener('click', () => sys.resetView());
  window.__cosmos = Object.assign(sys, { open, close }); // tiện cho kiểm thử
}

// Sơ đồ 2D khi không có WebGL
function drawFallback() {
  const c = q('fallback'), g = c.getContext('2d');
  const jd = julianDate(new Date()), W = c.width, cx = W / 2;
  g.fillStyle = '#05060b'; g.fillRect(0, 0, W, W);
  g.fillStyle = '#ffe2a0'; g.beginPath(); g.arc(cx, cx, 6, 0, 6.283); g.fill();
  for (const p of PLANETS) {
    const h = heliocentric(p.id, jd), r = Math.hypot(h.x, h.y);
    const k = (Math.sqrt(r) / Math.sqrt(40)) * (W / 2 - 20) / r;
    g.strokeStyle = 'rgba(236,230,216,.18)'; g.beginPath(); g.arc(cx, cx, r * k, 0, 6.283); g.stroke();
    g.fillStyle = p.color; g.beginPath(); g.arc(cx + h.x * k, cx - h.y * k, 4, 0, 6.283); g.fill();
    g.fillStyle = '#b9b3a6'; g.font = '13px sans-serif'; g.fillText(p.vi, cx + h.x * k + 7, cx - h.y * k + 4);
  }
}

initC1();

// C2 — Hồ sơ các hành tinh
import('./profiles.js').then(({ initProfiles }) => initProfiles($('#ho-so')));

// C3 — Các vị thần trên bầu trời
import('./gods.js').then(({ initGods }) => initGods($('#cac-vi-than')));
