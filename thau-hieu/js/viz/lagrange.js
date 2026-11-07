// Điểm Lagrange: bản đồ thế hiệu dụng trong hệ quay cùng hai vật (bài toán ba vật hạn chế, quỹ đạo tròn).
// Φ = −(1−μ)/r₁ − μ/r₂ − ½(x² + y²) (đơn vị chuẩn hoá). Đường đồng mức và vị trí L1…L5 tính số (lagrangePoints, có test).
// Kéo thanh tỉ lệ khối lượng; bấm vào bản đồ để thả một vật thử và xem nó trôi đi hay quẩn quanh (tích phân có lực Coriolis).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { lagrangePoints, L45_RATIO } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Bản đồ thế hấp dẫn hiệu dụng trong hệ quay với năm điểm Lagrange');
  let mu = 0.0121, img = null, imgKey = '', probe = null, trail = [];
  const say = readout(F.panel);
  const sMu = slider(F.panel, {
    label: 'Tỉ lệ khối lượng vật nhỏ / tổng', min: 1e-3, max: 0.3, log: true, value: mu,
    format: (v) => `μ = ${fmt(v, v < 0.01 ? 4 : 3)}`, onInput: (v) => { mu = v; probe = null; trail = []; show(); },
  });
  buttons(F.panel, [
    { label: 'Trái Đất – Mặt Trăng', value: 0.01215 }, { label: 'Mặt Trời – Sao Mộc', value: 0.000954 }, { label: 'Hai sao 3:1', value: 0.25 },
    { label: 'Thả vật thử gần L4', value: 'L4' }, { label: 'Thả vật thử gần L1', value: 'L1' },
  ], (v) => {
    if (v === 'L4' || v === 'L1') { const L = lagrangePoints(mu)[v]; dropAt(L[0] + 0.01, L[1] + 0.01); return; }
    sMu.set(v);
  });

  function show() {
    const ratio = (1 - mu) / mu;
    say(`<span>Vật lớn nặng gấp <b>${fmt(ratio, ratio < 100 ? 1 : 0)}</b> lần vật nhỏ</span>
      <span>L4, L5 <b>${ratio > L45_RATIO ? 'ổn định' : 'không ổn định'}</b> (cần tỉ lệ trên ${fmt(L45_RATIO, 2)})</span>
      <span>L1, L2, L3 luôn không ổn định — tàu ở đó phải tự hiệu chỉnh quỹ đạo</span>`);
    L.kick();
  }

  const pot = (x, y) => {
    const r1 = Math.hypot(x + mu, y), r2 = Math.hypot(x - 1 + mu, y);
    return -(1 - mu) / r1 - mu / r2 - 0.5 * (x * x + y * y);
  };
  function dropAt(x, y) { probe = { x, y, vx: 0, vy: 0 }; trail = [[x, y]]; L.kick(); }
  // phương trình chuyển động trong hệ quay (ω = 1): a = −∇Φ + 2(vy, −vx)
  function step(p, dt) {
    const g = (x, y) => {
      const r1 = Math.hypot(x + mu, y) ** 3, r2 = Math.hypot(x - 1 + mu, y) ** 3;
      return [x - (1 - mu) * (x + mu) / r1 - mu * (x - 1 + mu) / r2, y - (1 - mu) * y / r1 - mu * y / r2];
    };
    for (let i = 0; i < 8; i++) {
      const h = dt / 8;
      const [gx, gy] = g(p.x, p.y);
      p.vx += (gx + 2 * p.vy) * h; p.vy += (gy - 2 * p.vx) * h;
      p.x += p.vx * h; p.y += p.vy * h;
    }
  }

  let view;
  canvas.addEventListener('click', (e) => {
    if (!view) return;
    const r = canvas.getBoundingClientRect();
    dropAt((e.clientX - r.left - view.cx) / view.s, -(e.clientY - r.top - view.cy) / view.s);
  });

  function render(w, h) {
    // ảnh nền thế hiệu dụng ở độ phân giải thấp
    const key = `${w}x${h}:${mu}`;
    if (imgKey === key) return;
    imgKey = key;
    const W = Math.ceil(w / 3), H = Math.ceil(h / 3);
    const off = document.createElement('canvas');
    off.width = W; off.height = H;
    const c2 = off.getContext('2d'), id = c2.createImageData(W, H);
    const { cx, cy, s } = view;
    const Lp = lagrangePoints(mu);
    const ref = pot(...Lp.L1);
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const x = (i * 3 - cx) / s, y = -(j * 3 - cy) / s;
      const v = pot(x, y);
      const d = Math.max(-1, Math.min(1, (v - ref) * 3));
      const lv = Math.log(-v);                                     // đồng mức cách đều theo log thế năng
      const band = Math.pow(0.5 + 0.5 * Math.cos(lv * 70), 12) * (v < ref - 1.2 ? 0 : 1);
      const k = (j * W + i) * 4;
      const base = d < 0 ? 18 + 20 * (1 + d) : 18 + 40 * (1 - d);
      id.data[k] = base * 0.7 + band * 30; id.data[k + 1] = base * 0.85 + band * 45; id.data[k + 2] = base * 1.4 + band * 70; id.data[k + 3] = 255;
    }
    c2.putImageData(id, 0, 0);
    img = off;
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    const s = Math.min(w / 3.0, h / 2.4);
    view = { cx: w / 2, cy: h / 2, s };
    render(w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    if (img) ctx.drawImage(img, 0, 0, w, h);
    const P = (x, y) => [view.cx + x * s, view.cy - y * s];
    // hai vật
    const [x1, y1] = P(-mu, 0), [x2, y2] = P(1 - mu, 0);
    ctx.fillStyle = '#ffd27a'; ctx.beginPath(); ctx.arc(x1, y1, 12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#9fc6ff'; ctx.beginPath(); ctx.arc(x2, y2, Math.max(4, 12 * Math.cbrt(mu / (1 - mu)) * 2), 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(236,230,216,.15)'; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.arc(x1, y1, (1) * s, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // điểm Lagrange
    const Lp = lagrangePoints(mu);
    Object.entries(Lp).forEach(([k, [x, y]]) => {
      const [px, py] = P(x, y);
      ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
      ctx.beginPath(); ctx.moveTo(px - 6, py); ctx.lineTo(px + 6, py); ctx.moveTo(px, py - 6); ctx.lineTo(px, py + 6); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(12, 600); ctx.textAlign = 'center'; ctx.fillText(k, px, py - 10);
    });
    // vật thử
    if (probe) {
      step(probe, 0.06);
      trail.push([probe.x, probe.y]); if (trail.length > 900) trail.shift();
      ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.beginPath();
      trail.forEach(([x, y], i) => { const [px, py] = P(x, y); i ? ctx.lineTo(px, py) : ctx.moveTo(px, py); }); ctx.stroke();
      const [px, py] = P(probe.x, probe.y);
      ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, py, 3.5, 0, Math.PI * 2); ctx.fill();
      if (Math.hypot(probe.x, probe.y) > 3 || Math.hypot(probe.x + mu, probe.y) < 0.02 || Math.hypot(probe.x - 1 + mu, probe.y) < 0.005) probe = null;
    }
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText('Hệ quay cùng hai vật. Bấm vào bản đồ để thả một vật thử đứng yên.', 12, h - 12);
    return !!probe && !opts.reduced;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => { imgKey = ''; L.kick(); });
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
