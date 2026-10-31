// Ba cửa vào trên trang chủ, mỗi cửa một hình ảnh động riêng (Canvas 2D, dừng khi ra khỏi màn hình).
import { prefersReducedMotion, isLowPower, onInView, onVisibilityChange } from '../shared/js/util.js';

function setupCanvas(canvas) {
  const ctx = canvas.getContext('2d');
  const s = { ctx, w: 0, h: 0, dpr: 1 };
  const fit = () => {
    s.dpr = Math.min(devicePixelRatio || 1, 2);
    s.w = canvas.clientWidth; s.h = canvas.clientHeight;
    canvas.width = Math.round(s.w * s.dpr); canvas.height = Math.round(s.h * s.dpr);
    ctx.setTransform(s.dpr, 0, 0, s.dpr, 0, 0);
  };
  fit(); addEventListener('resize', fit);
  return s;
}

function animate(el, draw) {
  const reduced = prefersReducedMotion();
  let raf = 0, on = false, t0 = performance.now(), visible = false;
  const loop = (now) => { draw((now - t0) / 1000); if (on) raf = requestAnimationFrame(loop); };
  const start = () => { if (reduced) { draw(12); return; } if (!on) { on = true; raf = requestAnimationFrame(loop); } };
  const stop = () => { on = false; cancelAnimationFrame(raf); };
  onInView(el, (v) => { visible = v; v ? start() : stop(); });
  onVisibilityChange((v) => (v && visible ? start() : stop()));
  draw(12);
}

// 1. Hệ hành tinh thu nhỏ: chu kỳ tỉ lệ a^1,5 (định luật Kepler thứ ba)
function orrery(canvas) {
  const s = setupCanvas(canvas);
  const P = [
    { a: 0.20, r: 1.6, c: '#b9b1a8' }, { a: 0.30, r: 2.4, c: '#e8d3a8' }, { a: 0.40, r: 2.5, c: '#7fb0ff' },
    { a: 0.52, r: 2.0, c: '#d9805a' }, { a: 0.72, r: 5.0, c: '#e2c8a4' }, { a: 0.92, r: 4.2, c: '#e8d8a8', ring: true },
  ].map((p, i) => ({ ...p, ph: i * 1.7 }));
  animate(canvas, (t) => {
    const { ctx, w, h } = s;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.52, R = Math.min(w * 0.46, h * 1.05);
    const tilt = 0.34;
    const items = [];
    for (const p of P) {
      ctx.strokeStyle = 'rgba(236,230,216,.13)'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.ellipse(cx, cy, p.a * R, p.a * R * tilt, 0, 0, 6.2832); ctx.stroke();
      const ang = p.ph + t * 0.9 / Math.pow(p.a / 0.2, 1.5);
      items.push({ p, x: cx + Math.cos(ang) * p.a * R, y: cy + Math.sin(ang) * p.a * R * tilt, z: Math.sin(ang) });
    }
    const sun = () => {
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34);
      g.addColorStop(0, '#fff6dc'); g.addColorStop(0.25, 'rgba(255,214,140,.9)'); g.addColorStop(1, 'rgba(255,170,60,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 34, 0, 6.2832); ctx.fill();
    };
    items.sort((a, b) => a.z - b.z);
    let drawnSun = false;
    for (const it of items) {
      if (!drawnSun && it.z > 0) { sun(); drawnSun = true; }
      // phía đêm của hành tinh quay ra xa Mặt Trời
      const a = Math.atan2(cy - it.y, cx - it.x);
      const g = ctx.createLinearGradient(it.x + Math.cos(a) * it.p.r, it.y + Math.sin(a) * it.p.r, it.x - Math.cos(a) * it.p.r, it.y - Math.sin(a) * it.p.r);
      g.addColorStop(0, it.p.c); g.addColorStop(1, '#0a0a10');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(it.x, it.y, it.p.r, 0, 6.2832); ctx.fill();
      if (it.p.ring) { ctx.strokeStyle = 'rgba(232,216,168,.5)'; ctx.beginPath(); ctx.ellipse(it.x, it.y, it.p.r * 2.2, it.p.r * 0.7, -0.3, 0, 6.2832); ctx.stroke(); }
    }
    if (!drawnSun) sun();
  });
}

// 3. Tinh vân xoáy với dấu hỏi tạo từ sao
function nebula(canvas) {
  const s = setupCanvas(canvas);
  const low = isLowPower();
  const N = low ? 700 : 1500;
  const parts = Array.from({ length: N }, () => ({
    r: Math.pow(Math.random(), 0.7), a: Math.random() * 6.2832, sp: 0.04 + Math.random() * 0.1,
    c: Math.random() < 0.5 ? [183, 155, 230] : Math.random() < 0.6 ? [120, 140, 255] : [255, 150, 200], s: Math.random() * 1.6 + 0.3,
  }));
  // điểm của dấu hỏi lấy từ chữ "?" vẽ ẩn
  let qpts = [];
  const buildQ = () => {
    const off = document.createElement('canvas'); off.width = off.height = 200;
    const o = off.getContext('2d');
    o.fillStyle = '#fff'; o.textAlign = 'center'; o.textBaseline = 'middle';
    o.font = '500 180px "Cormorant Garamond", Georgia, serif'; o.fillText('?', 100, 108);
    const d = o.getImageData(0, 0, 200, 200).data;
    qpts = [];
    for (let y = 0; y < 200; y += 6) for (let x = 0; x < 200; x += 6)
      if (d[(y * 200 + x) * 4 + 3] > 140) qpts.push({ x: x / 200 - 0.5, y: y / 200 - 0.5, ph: Math.random() * 6.28, big: Math.random() < 0.18 });
  };
  buildQ(); document.fonts?.ready.then(buildQ);
  animate(canvas, (t) => {
    const { ctx, w, h } = s;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, R = Math.max(w, h) * 0.62;
    ctx.globalCompositeOperation = 'lighter';
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.7);
    g.addColorStop(0, 'rgba(120,80,190,.28)'); g.addColorStop(0.5, 'rgba(70,50,140,.12)'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
    for (const p of parts) {
      // xoắn: góc tăng nhanh hơn ở gần tâm, nhánh logarit
      const a = p.a + t * p.sp / (0.25 + p.r) + Math.log(0.05 + p.r) * 2.2;
      const x = cx + Math.cos(a) * p.r * R, y = cy + Math.sin(a) * p.r * R * 0.62;
      ctx.fillStyle = `rgba(${p.c[0]},${p.c[1]},${p.c[2]},${0.22 * (1 - p.r * 0.6)})`;
      ctx.fillRect(x, y, p.s, p.s);
    }
    const q = Math.min(w, h) * 0.62;
    for (const p of qpts) {
      const tw = 0.55 + 0.45 * Math.sin(t * 1.6 + p.ph);
      const x = cx + p.x * q, y = cy + p.y * q;
      ctx.fillStyle = `rgba(240,232,255,${0.5 + 0.5 * tw})`;
      ctx.beginPath(); ctx.arc(x, y, p.big ? 1.9 : 1.1, 0, 6.2832); ctx.fill();
      if (p.big) {
        const gg = ctx.createRadialGradient(x, y, 0, x, y, 7);
        gg.addColorStop(0, `rgba(200,180,255,${0.35 * tw})`); gg.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(x, y, 7, 0, 6.2832); ctx.fill();
      }
    }
    ctx.globalCompositeOperation = 'source-over';
  });
}

export function initPortals(root) {
  root.querySelectorAll('[data-portal-anim="orrery"]').forEach(orrery);
  root.querySelectorAll('[data-portal-anim="nebula"]').forEach(nebula);
  // Cửa "Thấu hiểu": phương trình và sơ đồ ẩn hiện bằng CSS (xem home.css)
}
