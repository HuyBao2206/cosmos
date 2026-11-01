// Tiêu chuẩn Jeans: đám mây co sụp khi khối lượng vượt khối lượng Jeans M_J (trọng lực thắng áp suất khí).
// M_J tăng theo nhiệt độ (T^{3/2}) và giảm theo mật độ (n^{-1/2}). Thời gian co sụp ~ thời gian rơi tự do t_ff.
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { jeansMass, freeFallTime, M_SUN, M_H, LY } from '../../../shared/js/astro/physics.js';

const YEAR = 365.25 * 86400;
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

export function mount(host, opts = {}) {
  const F = frame(host, { note: 'Kích thước đám mây đã được co giãn cho vừa khung' });
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Mô phỏng đám mây khí co sụp hoặc giữ nguyên tuỳ theo khối lượng Jeans');
  let T = 10, n = 1e4, M = 10, t0 = performance.now();
  const r = rng(11);
  const P = Array.from({ length: 320 }, () => {
    const a = r() * Math.PI * 2, d = Math.sqrt(r());
    return { a, d, ph: r() * 6.28, s: 0.6 + r() * 1.2 };
  });

  const say = readout(F.panel);
  const restart = () => { t0 = performance.now(); show(); };
  const sT = slider(F.panel, { label: 'Nhiệt độ khí', min: 5, max: 100, log: true, value: T, format: (v) => `${fmt(v, 0)} K`, onInput: (v) => { T = v; restart(); } });
  const sN = slider(F.panel, { label: 'Mật độ', min: 100, max: 1e6, log: true, value: n, format: (v) => `${sci(v, 1)} phân tử/cm³`, onInput: (v) => { n = v; restart(); } });
  const sM = slider(F.panel, { label: 'Khối lượng đám mây', min: 0.3, max: 3000, log: true, value: M, format: (v) => `${fmt(v, v < 10 ? 1 : 0)} M☉`, onInput: (v) => { M = v; restart(); } });
  buttons(F.panel, [
    { label: 'Lõi phân tử lạnh', value: [10, 1e4, 10] },
    { label: 'Khí ấm, loãng', value: [80, 300, 100] },
    { label: 'Mây khổng lồ', value: [15, 300, 2000] },
  ], ([a, b, c]) => { sT.set(a); sN.set(b); sM.set(c); });

  const mj = () => jeansMass(T, n) / M_SUN;
  function show() {
    const J = mj(), tff = freeFallTime(n) / YEAR;
    const rho = n * 1e6 * 2.33 * M_H, R = Math.cbrt((3 * M * M_SUN) / (4 * Math.PI * rho)) / LY;
    const collapse = M > J;
    say(`<span>Khối lượng Jeans <b>M<sub>J</sub> ≈ ${fmt(J, J < 10 ? 1 : 0)} M☉</b></span>
      <span>Đám mây rộng khoảng <b>${fmt(2 * R, R < 5 ? 1 : 0)} năm ánh sáng</b></span>
      <span>${collapse ? `<b style="color:var(--c)">Nặng hơn M<sub>J</sub>: trọng lực thắng — đám mây co sụp</b>, trong khoảng <b>${tff < 1e6 ? fmt(tff / 1e3, 0) + ' nghìn' : fmt(tff / 1e6, 1) + ' triệu'} năm</b>` : '<b>Nhẹ hơn M<sub>J</sub>: áp suất khí đủ chống đỡ — đám mây không co sụp</b>'}</span>`);
    L?.kick();
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2 + 6;
    const R0 = Math.min(w, h) * 0.36;
    const J = mj(), collapse = M > J;
    const dur = 4200;                                              // ms cho cả quá trình (đã tua nhanh)
    const k = opts.reduced ? (collapse ? 1 : 0) : Math.max(0, Math.min(1, (now - t0) / dur));
    // co sụp: bán kính giảm nhanh dần (dạng rơi tự do), lõi sáng lên
    const f = collapse ? Math.max(0.06, Math.cos((k * Math.PI) / 2) ** 1.4) : 1;
    const jit = Math.sqrt(T / 10) * 1.6;
    // vùng khí
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R0 * f * 1.15);
    g.addColorStop(0, `rgba(255,176,124,${0.1 + (1 - f) * 0.25})`); g.addColorStop(1, 'rgba(255,176,124,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R0 * 1.2, 0, Math.PI * 2); ctx.fill();
    const t = now / 1000;
    P.forEach((p) => {
      // hạt gần tâm co nhanh hơn một chút → lõi đặc hình thành trước
      const ff = collapse ? Math.max(0.03, f * (0.55 + 0.45 * p.d)) : 1;
      const rr = p.d * R0 * ff;
      const spin = collapse ? (1 - f) * 2.2 / (0.3 + p.d) : 0;      // bảo toàn mômen động lượng: quay nhanh dần
      const a = p.a + spin;
      const x = cx + Math.cos(a) * rr + Math.sin(t * 2 + p.ph) * jit;
      const y = cy + Math.sin(a) * rr * (collapse ? 1 - (1 - f) * 0.55 : 1) + Math.cos(t * 1.7 + p.ph) * jit;
      ctx.fillStyle = `rgba(236,214,190,${0.35 + 0.4 * (1 - p.d)})`;
      ctx.beginPath(); ctx.arc(x, y, p.s, 0, Math.PI * 2); ctx.fill();
    });
    if (collapse && k > 0.55) {
      const b = Math.min(1, (k - 0.55) / 0.45);
      const gs = ctx.createRadialGradient(cx, cy, 0, cx, cy, 34 * b + 6);
      gs.addColorStop(0, `rgba(255,255,240,${b})`); gs.addColorStop(0.3, `rgba(255,190,120,${0.7 * b})`); gs.addColorStop(1, 'rgba(255,150,90,0)');
      ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(cx, cy, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(12, 600); ctx.textAlign = 'center';
      ctx.fillText('tiền sao + đĩa khí', cx, cy + 58);
    }
    // thanh so sánh M với M_J
    const bx0 = 24, bx1 = Math.min(w - 24, 260), by = h - 26;
    const lo = Math.log10(0.3), hi = Math.log10(3e4);
    const X = (v) => bx0 + ((Math.log10(v) - lo) / (hi - lo)) * (bx1 - bx0);
    ctx.strokeStyle = 'rgba(236,230,216,.2)'; ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx1, by); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.fillRect(X(Math.min(J, 3e4)) - 1, by - 8, 2, 16);
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(X(M), by, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = FONT(10); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(236,230,216,.6)';
    ctx.fillText('● đám mây   | khối lượng Jeans  (thang log)', bx0, by - 14);
    return k < 1 || !opts.reduced;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
