// Chuyển trang "bước nhảy siêu tốc": các ngôi sao kéo dài thành vệt sáng toả ra từ tâm,
// màn hình chìm vào nền tối (không bao giờ loé trắng), rồi trang mới hiện ra từ vệt sao đang chậm lại.
import { prefersReducedMotion, isLowPower } from './util.js';
import { pickStarColor } from './starfield.js';

const KEY = 'cosmos:warp';

function makeOverlay() {
  const c = document.createElement('canvas');
  c.className = 'warp';
  c.setAttribute('aria-hidden', 'true');
  document.body.appendChild(c);
  return c;
}

function runWarp(canvas, { dir, duration }) {
  return new Promise((resolve) => {
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const w = innerWidth, h = innerHeight;
    canvas.width = w * dpr; canvas.height = h * dpr;
    ctx.scale(dpr, dpr);
    const n = isLowPower() ? 260 : 600;
    const stars = Array.from({ length: n }, () => {
      const a = Math.random() * Math.PI * 2;
      const c = pickStarColor();
      return { a, r: Math.pow(Math.random(), 0.6) * Math.hypot(w, h) * 0.5, rgb: c.rgb, s: 0.6 + Math.random() * 1.4 };
    });
    canvas.style.opacity = '1';
    const t0 = performance.now();
    function frame(now) {
      const p = Math.min(1, (now - t0) / duration);
      // dir = 1: tăng tốc (rời trang). dir = -1: giảm tốc (tới trang mới)
      const k = dir > 0 ? p * p * p : Math.pow(1 - p, 2);
      const bgA = dir > 0 ? Math.min(1, p * 1.6) : Math.max(0, 1 - p * 1.25);
      ctx.clearRect(0, 0, w, h);
      ctx.fillStyle = `rgba(5,6,11,${bgA})`;
      ctx.fillRect(0, 0, w, h);
      ctx.lineCap = 'round';
      const cx = w / 2, cy = h / 2;
      for (const s of stars) {
        const r = s.r * (1 + k * 1.8);
        const len = 2 + k * 260 * (0.3 + s.r / Math.hypot(w, h));
        const x1 = cx + Math.cos(s.a) * r, y1 = cy + Math.sin(s.a) * r;
        const x0 = cx + Math.cos(s.a) * Math.max(0, r - len), y0 = cy + Math.sin(s.a) * Math.max(0, r - len);
        const alpha = dir > 0 ? Math.min(1, 0.2 + p) : Math.max(0, 1 - p * 1.1);
        ctx.strokeStyle = `rgba(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]},${alpha})`;
        ctx.lineWidth = s.s;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
      }
      if (p < 1) requestAnimationFrame(frame); else resolve();
    }
    requestAnimationFrame(frame);
  });
}

export function initTransitions() {
  const reduced = prefersReducedMotion();
  const root = document.documentElement;
  const overlay = makeOverlay();

  // Tới trang mới
  let arriving = false;
  try { arriving = sessionStorage.getItem(KEY) === '1'; sessionStorage.removeItem(KEY); } catch {}
  if (arriving && !reduced) {
    root.classList.add('is-arriving');
    runWarp(overlay, { dir: -1, duration: 1000 }).then(() => {
      overlay.style.opacity = '0';
    });
    requestAnimationFrame(() => requestAnimationFrame(() => {
      root.classList.remove('is-arriving');
      root.classList.add('is-arrived');
    }));
  }

  // Quay lại bằng nút Back (bfcache): dọn trạng thái
  window.addEventListener('pageshow', (e) => {
    if (e.persisted) { overlay.style.opacity = '0'; overlay.classList.remove('is-active'); root.classList.remove('is-leaving'); }
  });

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href]');
    if (!a || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (a.target && a.target !== '_self') return;
    if (a.hasAttribute('download') || a.dataset.noTransition !== undefined) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin) return;
    if (url.pathname === location.pathname && url.hash) return; // neo trong trang
    if (url.href === location.href) return;
    e.preventDefault();
    try { sessionStorage.setItem(KEY, '1'); } catch {}
    overlay.classList.add('is-active');
    if (reduced) {
      overlay.style.transition = 'opacity .25s';
      overlay.style.background = '#05060b';
      overlay.style.opacity = '1';
      setTimeout(() => (location.href = url.href), 260);
      return;
    }
    runWarp(overlay, { dir: 1, duration: 750 }).then(() => (location.href = url.href));
  });
}
