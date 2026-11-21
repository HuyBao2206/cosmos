// Vật chất tối qua đường cong quay của thiên hà. Trái: đĩa sao nhìn từ trên, mỗi vòng sao quay với vận tốc v(r).
// Phải: v(r) dự đoán từ vật chất nhìn thấy (chỗ phình + đĩa hàm mũ, gần đúng) so với khi thêm quầng vật chất tối đẳng nhiệt.
// Đĩa hàm mũ: dùng công thức Freeman (1970) v² = 4πGΣ₀R_d y² [I₀K₀ − I₁K₁](y), y = r/(2R_d). Quầng: isothermalHaloVelocity (physics.js).
// Thông số kiểu Ngân Hà (minh hoạ): chỗ phình 1,5 × 10¹⁰ M☉, đĩa 5 × 10¹⁰ M☉, R_d = 3 kpc; quầng v∞ chỉnh được.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { G, M_SUN, KPC, isothermalHaloVelocity } from '../../../shared/js/astro/physics.js';

// Hàm Bessel biến dạng (xấp xỉ đa thức Abramowitz & Stegun 9.8.1–9.8.8)
function I0(x) { const t = x / 3.75; if (x <= 3.75) { const t2 = t * t; return 1 + t2 * (3.5156229 + t2 * (3.0899424 + t2 * (1.2067492 + t2 * (0.2659732 + t2 * (0.0360768 + t2 * 0.0045813))))); } const it = 1 / t; return (Math.exp(x) / Math.sqrt(x)) * (0.39894228 + it * (0.01328592 + it * (0.00225319 + it * (-0.00157565 + it * (0.00916281 + it * (-0.02057706 + it * (0.02635537 + it * (-0.01647633 + it * 0.00392377)))))))); }
function I1(x) { const t = x / 3.75; if (x <= 3.75) { const t2 = t * t; return x * (0.5 + t2 * (0.87890594 + t2 * (0.51498869 + t2 * (0.15084934 + t2 * (0.02658733 + t2 * (0.00301532 + t2 * 0.00032411)))))); } const it = 1 / t; return (Math.exp(x) / Math.sqrt(x)) * (0.39894228 + it * (-0.03988024 + it * (-0.00362018 + it * (0.00163801 + it * (-0.01031555 + it * (0.02282967 + it * (-0.02895312 + it * (0.01787654 - it * 0.00420059)))))))); }
function K0(x) { if (x <= 2) { const t = x * x / 4; return -Math.log(x / 2) * I0(x) + (-0.57721566 + t * (0.42278420 + t * (0.23069756 + t * (0.03488590 + t * (0.00262698 + t * (0.00010750 + t * 0.0000074)))))); } const t = 2 / x; return (Math.exp(-x) / Math.sqrt(x)) * (1.25331414 + t * (-0.07832358 + t * (0.02189568 + t * (-0.01062446 + t * (0.00587872 + t * (-0.00251540 + t * 0.00053208)))))); }
function K1(x) { if (x <= 2) { const t = x * x / 4; return Math.log(x / 2) * I1(x) + (1 / x) * (1 + t * (0.15443144 + t * (-0.67278579 + t * (-0.18156897 + t * (-0.01919402 + t * (-0.00110404 - t * 0.00004686)))))); } const t = 2 / x; return (Math.exp(-x) / Math.sqrt(x)) * (1.25331414 + t * (0.23498619 + t * (-0.03655620 + t * (0.01504268 + t * (-0.00780353 + t * (0.00325614 - t * 0.00068245)))))); }

const M_BULGE = 1.5e10 * M_SUN, M_DISK = 5e10 * M_SUN, RD = 3 * KPC, A_B = 0.6 * KPC;
/** v (m/s) do vật chất nhìn thấy: chỗ phình Hernquist + đĩa hàm mũ Freeman */
export function vVisible(r) {
  const vb2 = G * M_BULGE * r / (r + A_B) ** 2;
  const y = r / (2 * RD), S0 = M_DISK / (2 * Math.PI * RD * RD);
  const vd2 = 4 * Math.PI * G * S0 * RD * y * y * (I0(y) * K0(y) - I1(y) * K1(y));
  return Math.sqrt(vb2 + Math.max(0, vd2));
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Đường cong quay của một thiên hà xoắn ốc: dự đoán từ vật chất thấy được và khi có quầng vật chất tối');
  let vh = 215e3, rc = 4 * KPC, t = 0;
  const say = readout(F.panel);
  const sH = slider(F.panel, { label: 'Quầng vật chất tối (vận tốc tiệm cận)', min: 0, max: 260e3, step: 1e3, value: vh, format: (v) => (v ? `${fmt(v / 1000)} km/s` : 'không có'), onInput: (v) => { vh = v; show(); } });
  buttons(F.panel, [{ label: 'Chỉ vật chất nhìn thấy', value: 0 }, { label: 'Thêm quầng vật chất tối', value: 215e3 }], (v) => sH.set(v));

  const vTot = (r) => Math.sqrt(vVisible(r) ** 2 + (vh ? isothermalHaloVelocity(r, rc, vh) ** 2 : 0));
  // "số liệu quan sát" minh hoạ: đường cong phẳng ~220–230 km/s (kiểu Ngân Hà); không phải số đo thật
  const OBS = [2, 4, 6, 8, 10, 12, 15, 18, 22, 26].map((k) => [k, (k < 3 ? 205 : 222 + Math.sin(k) * 4) * 1e3]);

  function show() {
    const r = 25 * KPC;
    const mDark = vh ? (isothermalHaloVelocity(r, rc, vh) ** 2 * r) / G / M_SUN : 0;
    say(`<span>Ở 25 kpc: chỉ vật chất thấy được → <b>${fmt(vVisible(r) / 1000)} km/s</b>; tổng → <b>${fmt(vTot(r) / 1000)} km/s</b></span>
      <span>Khối lượng tối cần thêm trong 25 kpc: <b>${mDark ? fmt(mDark / 1e10, 0) + ' × 10¹⁰ M☉' : '0'}</b> (vật chất thấy được: 6,5 × 10¹⁰ M☉)</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 640;
    // đĩa quay (trái)
    const cx = narrow ? w / 2 : w * 0.24, cy = narrow ? h * 0.27 : h * 0.5, R = narrow ? Math.min(w * 0.4, h * 0.22) : Math.min(w * 0.2, h * 0.42);
    for (let k = 1; k <= 12; k++) {
      const r = (k / 12) * 26 * KPC, rr = (k / 12) * R;
      const om = vTot(r) / r;                         // rad/s
      const ang = t * om * 3.2e15;                    // tăng tốc cực lớn để nhìn thấy
      ctx.strokeStyle = 'rgba(236,230,216,.07)'; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
      for (let j = 0; j < 3; j++) {
        const a = ang + j * 2.094 + k * 0.4;
        ctx.fillStyle = k < 4 ? '#ffd9a8' : '#cfe0ff';
        ctx.beginPath(); ctx.arc(cx + Math.cos(a) * rr, cy + Math.sin(a) * rr, 2.6, 0, Math.PI * 2); ctx.fill();
      }
    }
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    ctx.fillText('sao ở mọi bán kính quay với tốc độ gần như nhau', cx, cy + R + 16);
    // đồ thị (phải)
    const x0 = narrow ? 44 : w * 0.52, x1 = w - 16, y0 = narrow ? h * 0.56 : 30, y1 = h - 34;
    const X = (kpc) => x0 + (kpc / 30) * (x1 - x0), Y = (v) => y1 - (v / 300e3) * (y1 - y0);
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    [0, 10, 20, 30].forEach((k) => ctx.fillText(`${k}`, X(k), y1 + 13));
    ctx.fillText('khoảng cách tới tâm (kpc)', (x0 + x1) / 2, y1 + 26);
    ctx.textAlign = 'right'; [100, 200, 300].forEach((v) => ctx.fillText(`${v}`, x0 - 5, Y(v * 1e3) + 3));
    ctx.save(); ctx.translate(x0 - 30, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('vận tốc quay (km/s)', 0, 0); ctx.restore();
    const curve = (f, col, dash, lw) => { ctx.strokeStyle = col; ctx.setLineDash(dash); ctx.lineWidth = lw; ctx.beginPath(); for (let i = 1; i <= 120; i++) { const k = (i / 120) * 30, v = f(k * KPC); i > 1 ? ctx.lineTo(X(k), Y(v)) : ctx.moveTo(X(k), Y(v)); } ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1; };
    curve(vVisible, 'rgba(255,217,168,.85)', [4, 4], 1.5);
    if (vh) curve((r) => isothermalHaloVelocity(r, rc, vh), 'rgba(166,232,184,.5)', [2, 3], 1);
    curve(vTot, accent, [], 2);
    OBS.forEach(([k, v]) => { ctx.strokeStyle = 'rgba(255,255,255,.8)'; ctx.beginPath(); ctx.arc(X(k), Y(v), 3, 0, Math.PI * 2); ctx.stroke(); });
    ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillStyle = 'rgba(255,217,168,.9)'; ctx.fillText('chỉ sao và khí nhìn thấy', X(17), Y(vVisible(17 * KPC)) + 16);
    ctx.fillStyle = accent; ctx.fillText('tổng', X(27), Y(vTot(27 * KPC)) - 8);
    ctx.fillStyle = 'rgba(255,255,255,.7)'; ctx.fillText('○ quan sát (minh hoạ)', x0 + 8, y0 + 8);
    return !opts.reduced;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
