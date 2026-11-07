// Bộ khung dùng chung cho các minh hoạ tương tác: bố cục (vùng vẽ + bảng điều khiển), canvas sắc nét theo DPR,
// thanh trượt có nhãn, vòng vẽ tự dừng khi ra khỏi màn hình/tab ẩn, định dạng số kiểu Việt Nam.
import { fmt, sci, onInView, onVisibilityChange, isLowPower } from '../../../shared/js/util.js';
export { fmt, sci };

export function frame(host, { svg = false, note } = {}) {
  host.innerHTML = '';
  const root = document.createElement('div');
  root.className = 'vz';
  const area = document.createElement('div');
  area.className = 'vz-canvas';
  const panel = document.createElement('div');
  panel.className = 'vz-panel';
  root.append(area, panel);
  host.append(root);
  let canvas = null, ctx = null, svgEl = null;
  if (svg) {
    svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    area.append(svgEl);
  } else {
    canvas = document.createElement('canvas');
    canvas.setAttribute('role', 'img');
    area.append(canvas);
    ctx = canvas.getContext('2d');
  }
  if (note) { const p = document.createElement('p'); p.className = 'vz-note'; p.textContent = note; area.append(p); }
  const accent = getComputedStyle(host).getPropertyValue('--c').trim() || '#9fd4e8';
  const size = { w: 0, h: 0, dpr: 1 };
  const resizeCbs = [];
  const ro = new ResizeObserver(() => {
    const r = area.getBoundingClientRect();
    size.w = r.width; size.h = r.height;
    size.dpr = Math.min(devicePixelRatio || 1, isLowPower() ? 1.25 : 2);
    if (canvas) { canvas.width = Math.round(r.width * size.dpr); canvas.height = Math.round(r.height * size.dpr); ctx.setTransform(size.dpr, 0, 0, size.dpr, 0, 0); }
    if (svgEl) svgEl.setAttribute('viewBox', `0 0 ${r.width} ${r.height}`);
    resizeCbs.forEach((f) => f(size));
  });
  ro.observe(area);
  return { root, area, panel, canvas, ctx, svg: svgEl, size, accent, onResize: (f) => resizeCbs.push(f), destroyResize: () => ro.disconnect() };
}

/** Thanh trượt. opts: { label, min, max, step, value, log (thang log10), format(v) → chuỗi, onInput(v) } */
export function slider(panel, opts) {
  const wrap = document.createElement('div');
  wrap.className = 'vz-ctrl';
  const id = `vz-${Math.random().toString(36).slice(2, 8)}`;
  wrap.innerHTML = `<label for="${id}"><span>${opts.label}</span><output for="${id}"></output></label><input id="${id}" type="range">`;
  const input = wrap.querySelector('input'), out = wrap.querySelector('output');
  const toPos = (v) => (opts.log ? Math.log10(v) : v);
  const fromPos = (p) => (opts.log ? Math.pow(10, p) : p);
  input.min = toPos(opts.min); input.max = toPos(opts.max);
  input.step = opts.step ?? (opts.log ? 0.001 : (opts.max - opts.min) / 400);
  input.value = toPos(opts.value);
  if (opts.aria) input.setAttribute('aria-label', opts.aria);
  // Lần đầu chỉ ghi nhãn, không gọi onInput (module tự vẽ trạng thái ban đầu sau khi dựng xong)
  const update = (init) => {
    const v = fromPos(+input.value);
    const txt = opts.format ? opts.format(v) : fmt(v, 2);
    out.textContent = txt;
    input.setAttribute('aria-valuetext', txt);
    if (init !== true) opts.onInput?.(v);
  };
  input.addEventListener('input', update);
  panel.append(wrap);
  update(true);
  return { input, get value() { return fromPos(+input.value); }, set(v) { input.value = toPos(v); update(); } };
}

/** Dải nút chọn nhanh (preset). items: [{ label, value }] */
export function buttons(panel, items, onPick) {
  const box = document.createElement('div');
  box.className = 'vz-btns';
  items.forEach((it) => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = 'btn'; b.textContent = it.label;
    b.addEventListener('click', () => { box.querySelectorAll('.btn').forEach((x) => x.setAttribute('aria-pressed', String(x === b))); onPick(it.value, it); });
    box.append(b);
  });
  panel.append(box);
  return box;
}

/** Ô đọc số liệu: trả về hàm set(html) */
export function readout(panel) {
  const p = document.createElement('p');
  p.className = 'vz-readout';
  p.setAttribute('aria-live', 'polite');
  panel.append(p);
  return (html) => { p.innerHTML = html; };
}

/** Vòng vẽ: chỉ chạy khi minh hoạ trong màn hình và tab đang mở. draw(t, dt) trả về true nếu cần vẽ tiếp. */
export function loop(host, draw, { root, continuous = true } = {}) {
  let raf = 0, inView = false, visible = !document.hidden, last = performance.now(), alive = true;
  const tick = (t) => {
    raf = 0;
    if (!alive) return;
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    const more = draw(t, dt);
    if ((continuous || more) && inView && visible) raf = requestAnimationFrame(tick);
  };
  const kick = () => { if (!raf && alive && inView && visible) { last = performance.now(); raf = requestAnimationFrame(tick); } };
  const stopView = onInView(host, (v) => { inView = v; if (v) kick(); }, '50px');
  onVisibilityChange((v) => { visible = v; if (v) kick(); });
  return { kick, stop() { alive = false; cancelAnimationFrame(raf); stopView(); } };
}

/** Định dạng thời gian ánh sáng (giây) thành chữ tiếng Việt dễ đọc */
export function fmtDuration(s) {
  if (s < 60) return `${fmt(s, s < 10 ? 2 : 1)} giây`;
  if (s < 3600) { const m = Math.floor(s / 60); return `${m} phút ${Math.round(s - m * 60)} giây`; }
  if (s < 86400) return `${fmt(s / 3600, 1)} giờ`;
  const days = s / 86400;
  if (days < 365.25) return `${fmt(days, 1)} ngày`;
  const y = days / 365.25;
  if (y < 1000) return `${fmt(y, y < 10 ? 2 : 0)} năm`;
  if (y < 1e6) return `${fmt(y / 1000, 1)} nghìn năm`;
  if (y < 1e9) return `${fmt(y / 1e6, 1)} triệu năm`;
  return `${fmt(y / 1e9, 2)} tỷ năm`;
}

/** Định dạng khoảng cách (m) theo đơn vị hợp lý: km / triệu km / tỷ km / nghìn tỷ km */
export function fmtKm(m) {
  const km = m / 1000;
  if (km < 1e6) return `${fmt(km, 0)} km`;
  if (km < 1e9) return `${fmt(km / 1e6, 1)} triệu km`;
  if (km < 1e12) return `${fmt(km / 1e9, 1)} tỷ km`;
  return `${sci(km, 2)} km`;
}

/** Chữ trên canvas dùng font của site */
export const FONT = (px, w = 400) => `${w} ${px}px "Be Vietnam Pro", system-ui, sans-serif`;
export const SERIF = (px, w = 500) => `${w} ${px}px "Cormorant Garamond", Georgia, serif`;

/** Màu xấp xỉ của ánh sáng đơn sắc bước sóng nm (380–750 nm), theo cách xấp xỉ quen thuộc của Dan Bruton. Trả [r,g,b] 0–255. */
export function wavelengthRGB(nm) {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 750) { r = 1; }
  let k = 1;
  if (nm < 380 || nm > 750) k = 0;
  else if (nm < 420) k = 0.3 + (0.7 * (nm - 380)) / 40;
  else if (nm > 700) k = 0.3 + (0.7 * (750 - nm)) / 50;
  const f = (c) => Math.round(255 * Math.pow(c * k, 0.8));
  return [f(r), f(g), f(b)];
}

/** Kéo bằng con trỏ trên canvas: onDrag(x, y, e) với toạ độ CSS px trong canvas; onDown trả false để bỏ qua. */
export function drag(canvas, { onDown, onDrag, onUp } = {}) {
  let active = false;
  const pos = (e) => { const r = canvas.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const down = (e) => {
    const [x, y] = pos(e);
    if (onDown && onDown(x, y, e) === false) return;
    active = true; canvas.setPointerCapture?.(e.pointerId); onDrag?.(x, y, e); e.preventDefault();
  };
  const move = (e) => { if (!active) return; const [x, y] = pos(e); onDrag?.(x, y, e); };
  const up = (e) => { if (!active) return; active = false; onUp?.(e); };
  canvas.style.touchAction = 'none';
  canvas.addEventListener('pointerdown', down);
  canvas.addEventListener('pointermove', move);
  canvas.addEventListener('pointerup', up);
  canvas.addEventListener('pointercancel', up);
  return () => { canvas.removeEventListener('pointerdown', down); canvas.removeEventListener('pointermove', move); canvas.removeEventListener('pointerup', up); canvas.removeEventListener('pointercancel', up); };
}

/** Phép đổi thang log cho trục: trả hàm x(v) và v(x) */
export function logAxis(vMin, vMax, x0, x1) {
  const a = Math.log10(vMin), b = Math.log10(vMax);
  return { X: (v) => x0 + ((Math.log10(v) - a) / (b - a)) * (x1 - x0), V: (x) => Math.pow(10, a + ((x - x0) / (x1 - x0)) * (b - a)) };
}

/** Viết số mũ cơ số 10 dạng "10⁻⁹" */
const SUPS = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
export const pow10 = (e) => `10${String(e).split('').map((c) => SUPS[c] ?? c).join('')}`;
