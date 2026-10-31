// Tiện ích dùng chung

export const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Đoán máy yếu: ít nhân CPU, ít RAM, màn hình nhỏ cảm ứng, hoặc bật tiết kiệm dữ liệu. */
export function isLowPower() {
  const n = navigator;
  const cores = n.hardwareConcurrency || 4;
  const mem = n.deviceMemory || 4;
  const save = n.connection && n.connection.saveData;
  const smallTouch = window.matchMedia('(pointer: coarse)').matches && Math.min(screen.width, screen.height) < 500;
  return save || cores <= 4 || mem <= 3 || (smallTouch && cores <= 6);
}

export const isTouch = () => window.matchMedia('(pointer: coarse)').matches;

export function onVisibilityChange(cb) {
  document.addEventListener('visibilitychange', () => cb(!document.hidden));
}

/** Gọi cb(true/false) khi phần tử vào/ra khỏi màn hình. */
export function onInView(el, cb, rootMargin = '100px') {
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) cb(e.isIntersecting);
  }, { rootMargin });
  io.observe(el);
  return () => io.disconnect();
}

export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGL2RenderingContext && c.getContext('webgl2')) || !!c.getContext('webgl');
  } catch { return false; }
}

/** Định dạng số kiểu Việt Nam: dấu phẩy thập phân, khoảng trắng hẹp phân tách nghìn. */
export function fmt(n, digits = 0) {
  if (!isFinite(n)) return '—';
  const s = Math.abs(n).toFixed(digits);
  let [int, dec] = s.split('.');
  int = int.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return (n < 0 ? '−' : '') + int + (dec ? ',' + dec : '');
}

/** Số dạng khoa học: 5,97 × 10²⁴ */
export function sci(n, digits = 2) {
  if (n === 0) return '0';
  const e = Math.floor(Math.log10(Math.abs(n)));
  const m = n / Math.pow(10, e);
  if (e >= -2 && e <= 5) return fmt(n, digits);
  return `${fmt(m, digits)} × 10${superscript(e)}`;
}

const SUP = { '-': '⁻', '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
export const superscript = (n) => String(n).split('').map((c) => SUP[c] ?? c).join('');

export const clamp = (x, a, b) => Math.max(a, Math.min(b, x));
export const lerp = (a, b, t) => a + (b - a) * t;
export const smoothstep = (a, b, x) => { const t = clamp((x - a) / (b - a), 0, 1); return t * t * (3 - 2 * t); };

/** Đường dẫn gốc của site (để chạy được cả ở / và ở /cosmos/). */
export function siteRoot() {
  return document.documentElement.dataset.root || './';
}
