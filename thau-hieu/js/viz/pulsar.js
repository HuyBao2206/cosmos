// Pulsar: sao neutron quay đều, hai chùm bức xạ dọc trục từ quét qua không gian như đèn hải đăng.
// Mỗi lần chùm quét qua Trái Đất ta thu được một "xung". Chuyển động được làm chậm để mắt theo kịp (hiển thị hệ số).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { equatorialSpeed, C } from '../../../shared/js/astro/physics.js';

const R_NS = 12_000; // m — bán kính điển hình (NICER: ~12–13 km)

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Sao neutron quay với hai chùm bức xạ, và chuỗi xung thu được trên Trái Đất');
  let P = 1.3373, phase = 0;
  const alpha = 0.5;                                   // góc lệch giữa trục quay và trục từ (rad)
  const trace = [];
  const say = readout(F.panel);
  const s = slider(F.panel, {
    label: 'Chu kỳ quay', min: 0.0014, max: 10, log: true, value: P,
    format: (v) => (v < 1 ? `${fmt(v * 1000, v < 0.01 ? 2 : 1)} ms` : `${fmt(v, 3)} s`), onInput: (v) => { P = v; show(); },
  });
  buttons(F.panel, [
    { label: 'CP 1919 (1967)', value: 1.3373 },
    { label: 'Pulsar Con Cua', value: 0.033 },
    { label: 'Nhanh nhất: 716 vòng/s', value: 1 / 716 },
  ], (v) => s.set(v));

  const visualP = () => Math.max(0.9, Math.min(4, 1.6 * Math.pow(P / 1.337, 0.25)));
  function show() {
    const v = equatorialSpeed(R_NS, P);
    const slow = visualP() / P;
    say(`<span><b>${fmt(1 / P, 1 / P < 10 ? 2 : 0)}</b> vòng mỗi giây</span>
      <span>Xích đạo (bán kính ~12 km) chạy <b>${fmt(v / 1000, 0)} km/s</b> ≈ <b>${fmt((v / C) * 100, v / C < 0.01 ? 3 : 1)} %</b> tốc độ ánh sáng</span>
      <span>Hình động được làm chậm <b>×${slow < 2 ? fmt(slow, 1) : fmt(slow, 0)}</b></span>`);
  }

  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) phase += (dt / visualP()) * Math.PI * 2;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 560;
    const cx = narrow ? w * 0.5 : w * 0.3, cy = narrow ? h * 0.36 : h * 0.5;
    const rad = Math.min(w, h) * 0.06;
    // trục quay
    ctx.strokeStyle = 'rgba(236,230,216,.25)'; ctx.setLineDash([3, 4]);
    ctx.beginPath(); ctx.moveTo(cx, cy - rad * 4); ctx.lineTo(cx, cy + rad * 4); ctx.stroke(); ctx.setLineDash([]);
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    ctx.fillText('trục quay', cx, cy - rad * 4 - 6);
    // chùm (vector 3D, nhìn từ cạnh: x sang phải, y lên, z hướng vào màn hình)
    const b = [Math.sin(alpha) * Math.cos(phase), Math.cos(alpha), Math.sin(alpha) * Math.sin(phase)];
    const len = Math.min(w, h) * (narrow ? 0.3 : 0.42);
    [1, -1].forEach((sg) => {
      const bx = b[0] * sg, by = b[1] * sg, bz = b[2] * sg;
      const ex = cx + bx * len, ey = cy - by * len;
      const a = 0.35 + 0.35 * (1 - bz);
      const perp = [-(ey - cy), ex - cx]; const pl = Math.hypot(...perp) || 1;
      const spread = 0.14;
      const g = ctx.createLinearGradient(cx, cy, ex, ey);
      g.addColorStop(0, `rgba(159,212,232,${a})`); g.addColorStop(1, 'rgba(159,212,232,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.moveTo(cx, cy);
      ctx.lineTo(ex + (perp[0] / pl) * len * spread, ey + (perp[1] / pl) * len * spread);
      ctx.lineTo(ex - (perp[0] / pl) * len * spread, ey - (perp[1] / pl) * len * spread);
      ctx.closePath(); ctx.fill();
    });
    // sao neutron
    const gs = ctx.createRadialGradient(cx - rad * 0.3, cy - rad * 0.3, 0, cx, cy, rad);
    gs.addColorStop(0, '#ffffff'); gs.addColorStop(1, '#8fb3ff');
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
    // cường độ nhận được tại Trái Đất (người quan sát nằm theo hướng (sin α, cos α, 0))
    const o = [Math.sin(alpha), Math.cos(alpha), 0];
    const dot = (sg) => sg * (b[0] * o[0] + b[1] * o[1] + b[2] * o[2]);
    const I = Math.exp(-(1 - dot(1)) / 0.015);
    trace.push(I); if (trace.length > 240) trace.shift();
    // Trái Đất
    const ox = cx + o[0] * len * 1.05, oy = cy - o[1] * len * 1.05;
    ctx.fillStyle = `rgba(127,182,232,${0.6 + I * 0.4})`; ctx.beginPath(); ctx.arc(ox, oy, 6, 0, Math.PI * 2); ctx.fill();
    if (I > 0.05) { ctx.strokeStyle = `rgba(255,255,255,${I})`; ctx.beginPath(); ctx.arc(ox, oy, 6 + I * 10, 0, Math.PI * 2); ctx.stroke(); }
    ctx.fillStyle = 'rgba(236,230,216,.65)'; ctx.font = FONT(11); ctx.textAlign = 'left';
    ctx.fillText('Trái Đất (rất xa)', ox + 12, oy + 4);
    // chuỗi xung
    const px0 = narrow ? 20 : w * 0.58, px1 = w - 20, py = narrow ? h * 0.86 : h * 0.62, ph = narrow ? h * 0.16 : h * 0.3;
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(px0, py); ctx.lineTo(px1, py); ctx.stroke();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.6; ctx.beginPath();
    trace.forEach((v, i) => { const x = px0 + (i / 240) * (px1 - px0), y = py - v * ph; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); });
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText('Tín hiệu kính thiên văn thu được', px0, py - ph - 10);
    ctx.fillText('thời gian →', px0, py + 16);
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
