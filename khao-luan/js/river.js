// "Dòng chảy của chắc chắn": mỗi ý tưởng là một làn ngang; vị trí đốm sáng trên làn là mức chắc chắn (bị bác bỏ → đã xác lập)
// tại năm đang chọn, nội suy mượt giữa các mốc lịch sử có nguồn (content/river.js). Kéo thanh năm hoặc bấm phát.
// Bấm một đốm có hồ sơ → mở hồ sơ câu hỏi mở tương ứng. Bàn phím: ←/→ đổi năm khi thanh trượt đang được chọn.
import { IDEAS, YEAR_MIN, YEAR_MAX } from '../content/river.js';
import { LEVELS } from '../content/questions.js';
import { onInView, onVisibilityChange, prefersReducedMotion, isLowPower } from '../../shared/js/util.js';

const FONT = (px, w = 400) => `${w} ${px}px "Be Vietnam Pro", system-ui, sans-serif`;
const LV = Object.fromEntries(LEVELS.map((l, i) => [l.id, i]));
const ease = (t) => (t <= 0 ? 0 : t >= 1 ? 1 : t * t * (3 - 2 * t));
const TRANS = 4;   // số năm để một ý tưởng "trôi" sang mức mới sau một mốc

/** Mức chắc chắn (số thực 0–4) của một ý tưởng tại năm y; null nếu ý tưởng chưa xuất hiện */
export function levelAt(idea, y) {
  const k = idea.keys;
  if (y < k[0][0]) return null;
  let v = LV[k[0][1]];
  for (let i = 1; i < k.length; i++) {
    if (y < k[i][0]) break;
    const from = v, to = LV[k[i][1]];
    v = from + (to - from) * ease((y - k[i][0]) / TRANS);
  }
  return v;
}
/** Mốc gần nhất đã xảy ra (≤ y) của một ý tưởng */
const lastKey = (idea, y) => { let r = null; for (const k of idea.keys) if (k[0] <= y) r = k; return r; };

export function mountRiver(host, { onOpen } = {}) {
  const reduced = prefersReducedMotion();
  host.innerHTML = `<div class="rv-stage"><canvas role="img" aria-label="Các ý tưởng về vũ trụ trên thang mức độ chắc chắn theo thời gian"></canvas><div class="rv-tip" hidden></div></div>
    <div class="rv-controls">
      <output class="rv-year" for="rv-range" aria-live="off">${YEAR_MAX}</output>
      <input id="rv-range" type="range" min="${YEAR_MIN}" max="${YEAR_MAX}" step="0.25" value="${YEAR_MAX}" aria-label="Năm">
      <button type="button" class="btn rv-play">▶ Phát từ ${YEAR_MIN}</button>
      <p class="rv-event" aria-live="polite"></p>
    </div>`;
  const stage = host.querySelector('.rv-stage'), canvas = host.querySelector('canvas'), ctx = canvas.getContext('2d');
  const range = host.querySelector('input'), out = host.querySelector('.rv-year'), evEl = host.querySelector('.rv-event');
  const tip = host.querySelector('.rv-tip'), playBtn = host.querySelector('.rv-play');
  let year = YEAR_MAX, playing = false, w = 0, h = 0, dpr = 1, raf = 0, inView = true, visible = true, hits = [], hover = null, t = 0;

  const ro = new ResizeObserver(() => {
    const r = stage.getBoundingClientRect(); w = r.width; h = r.height;
    dpr = Math.min(devicePixelRatio || 1, isLowPower() ? 1.25 : 2);
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr); ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    kick();
  });
  ro.observe(stage);

  function setYear(y, fromInput) {
    year = Math.max(YEAR_MIN, Math.min(YEAR_MAX, y));
    if (!fromInput) range.value = year;
    out.textContent = Math.floor(year);
    range.setAttribute('aria-valuetext', `năm ${Math.floor(year)}`);
    // sự kiện mới nhất trên toàn bộ các ý tưởng
    let best = null;
    for (const idea of IDEAS) for (const k of idea.keys) if (k[0] <= year && (!best || k[0] >= best.k[0])) best = { idea, k };
    evEl.innerHTML = best ? `<span class="rv-ev-year">${best.k[0]}</span><b>${best.idea.name}</b> — ${best.k[2]}` : '';
    kick();
  }
  range.addEventListener('input', () => { playing = false; playBtn.textContent = `▶ Phát từ ${YEAR_MIN}`; setYear(+range.value, true); });
  playBtn.addEventListener('click', () => {
    playing = !playing;
    if (playing && year >= YEAR_MAX - 0.5) setYear(YEAR_MIN);
    playBtn.textContent = playing ? '❚❚ Dừng' : `▶ Phát từ ${YEAR_MIN}`;
    if (reduced && playing) { setYear(YEAR_MAX); playing = false; playBtn.textContent = `▶ Phát từ ${YEAR_MIN}`; }
    kick();
  });

  function layout() {
    const narrow = w < 640;
    const top = narrow ? 44 : 54, bottom = h - 14;
    const labelW = narrow ? Math.min(118, w * 0.34) : Math.min(230, w * 0.2);
    const x0 = labelW + (narrow ? 26 : 60), x1 = w - (narrow ? 30 : 70);
    const lane = (bottom - top) / IDEAS.length;
    return { narrow, top, bottom, labelW, x0, x1, lane, X: (v) => x0 + (v / 4) * (x1 - x0) };
  }

  function draw(dt) {
    if (!w) return;
    t += dt;
    const L = layout();
    ctx.clearRect(0, 0, w, h);
    // cột mức chắc chắn
    LEVELS.forEach((lv, i) => {
      const cx = L.X(i), half = (L.x1 - L.x0) / 8;
      const g = ctx.createLinearGradient(cx - half, 0, cx + half, 0);
      g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(0.5, lv.color + '12'); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.fillRect(cx - half, L.top - 10, half * 2, L.bottom - L.top + 10);
      ctx.fillStyle = lv.color; ctx.font = FONT(L.narrow ? 9 : 11, 500); ctx.textAlign = 'center';
      if (L.narrow) { const words = lv.label.split(' '); ctx.fillText(words.slice(0, 2).join(' '), cx, 16); if (words.length > 2) ctx.fillText(words.slice(2).join(' '), cx, 28); }
      else ctx.fillText(lv.label.toUpperCase(), cx, 26);
    });
    ctx.strokeStyle = 'rgba(236,230,216,.08)';
    ctx.beginPath(); ctx.moveTo(L.x0, L.top - 6); ctx.lineTo(L.x1, L.top - 6); ctx.stroke();
    hits = [];
    IDEAS.forEach((idea, i) => {
      const y = L.top + L.lane * (i + 0.5);
      // làn
      ctx.strokeStyle = 'rgba(236,230,216,.05)'; ctx.beginPath(); ctx.moveTo(L.x0, y); ctx.lineTo(L.x1, y); ctx.stroke();
      const v = levelAt(idea, year);
      const on = v !== null;
      ctx.fillStyle = on ? (hover === idea ? '#fff' : 'rgba(236,230,216,.85)') : 'rgba(236,230,216,.22)';
      ctx.font = FONT(L.narrow ? 10 : 12.5, on ? 500 : 400); ctx.textAlign = 'right';
      const nm = !L.narrow && ctx.measureText(idea.name).width <= L.labelW - 6 ? idea.name : idea.short || idea.name;
      ctx.fillText(nm, L.labelW, y + 4);
      if (!on) return;
      // vệt: vị trí các năm trước
      ctx.beginPath();
      let started = false;
      for (let yy = idea.keys[0][0]; yy <= year; yy += 0.5) {
        const vv = levelAt(idea, yy); const px = L.X(vv);
        started ? ctx.lineTo(px, y) : (ctx.moveTo(px, y), started = true);
      }
      ctx.strokeStyle = idea.color + '55'; ctx.lineWidth = 2; ctx.stroke(); ctx.lineWidth = 1;
      // đốm tinh vân
      const px = L.X(v), r = Math.min(L.lane * 0.42, 15);
      const pulse = reduced ? 1 : 1 + 0.08 * Math.sin(t * 2 + i);
      const g = ctx.createRadialGradient(px, y, 0, px, y, r * 2.4 * pulse);
      g.addColorStop(0, '#ffffff'); g.addColorStop(0.18, idea.color); g.addColorStop(0.5, idea.color + '55'); g.addColorStop(1, idea.color + '00');
      ctx.globalCompositeOperation = 'lighter';
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, y, r * 2.4 * pulse, 0, Math.PI * 2); ctx.fill();
      ctx.globalCompositeOperation = 'source-over';
      if (idea.q) { ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.beginPath(); ctx.arc(px, y, r * 0.9, 0, Math.PI * 2); ctx.stroke(); }
      hits.push({ idea, x: px, y, r: Math.max(r * 1.4, 14) });
    });
  }

  function frame(now) {
    raf = 0;
    const dt = Math.min(0.05, (now - (frame.last || now)) / 1000); frame.last = now;
    if (playing) { setYear(year + dt * 6); if (year >= YEAR_MAX) { playing = false; playBtn.textContent = `▶ Phát từ ${YEAR_MIN}`; } }
    draw(dt);
    if ((playing || !reduced) && inView && visible && !paused()) raf = requestAnimationFrame(frame);
  }
  // tạm dừng khi một hồ sơ (dialog) đang mở phủ lên trang
  const paused = () => document.documentElement.classList.contains('kc-open');
  new MutationObserver(() => { if (!paused()) kick(); }).observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
  function kick() { if (!raf && inView && visible && !paused()) { frame.last = performance.now(); raf = requestAnimationFrame(frame); } }

  const pick = (e) => {
    const r = canvas.getBoundingClientRect(), x = e.clientX - r.left, y = e.clientY - r.top;
    return hits.find((h) => Math.hypot(h.x - x, h.y - y) < h.r) || null;
  };
  canvas.addEventListener('pointermove', (e) => {
    const hit = pick(e);
    hover = hit?.idea || null;
    canvas.style.cursor = hit?.idea.q ? 'pointer' : 'default';
    if (!hit) { tip.hidden = true; kick(); return; }
    const k = lastKey(hit.idea, year), lv = LEVELS[Math.round(levelAt(hit.idea, year))];
    tip.innerHTML = `<b>${hit.idea.name}</b><span>${lv.label} (${Math.floor(year)})</span><br><span>${k ? `${k[0]}: ${k[2]}` : ''}</span>${hit.idea.q ? '<br><span style="color:var(--accent)">Bấm để mở hồ sơ →</span>' : ''}`;
    tip.hidden = false;
    const sr = stage.getBoundingClientRect();
    tip.style.left = `${Math.min(sr.width - 270, Math.max(8, hit.x + 16))}px`;
    tip.style.top = `${Math.min(sr.height - 120, Math.max(8, hit.y - 20))}px`;
    kick();
  });
  canvas.addEventListener('pointerleave', () => { tip.hidden = true; hover = null; kick(); });
  canvas.addEventListener('click', (e) => { const hit = pick(e); if (hit?.idea.q) onOpen?.(hit.idea.q, { x: e.clientX, y: e.clientY }); });

  const stopView = onInView(stage, (v) => { inView = v; if (v) kick(); }, '80px');
  onVisibilityChange((v) => { visible = v; if (v) kick(); });
  setYear(YEAR_MAX);
  return { setYear, destroy() { cancelAnimationFrame(raf); stopView(); ro.disconnect(); } };
}
