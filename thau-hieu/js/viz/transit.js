// Hai cách tìm ngoại hành tinh phổ biến nhất.
// Quá cảnh: hành tinh đi ngang trước sao làm sao mờ đi (R_p/R_*)² (có tối rìa đơn giản để đường cong tròn đáy) — transitDepth.
// Vận tốc xuyên tâm: sao "lắc" quanh khối tâm, vạch phổ dịch qua lại với biên độ K — rvSemiAmplitude (physics.js, có test).
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { transitDepth, rvSemiAmplitude, R_EARTH, R_SUN, M_EARTH, M_SUN, R_JUP, M_JUP, JULIAN_YEAR } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Hành tinh đi qua trước ngôi sao làm độ sáng giảm, và ngôi sao lắc qua lại do lực hút của hành tinh');
  let rp = 11.2, mp = 317.8, Pyr = 11.86, ph = 0.42;   // theo bán kính / khối lượng Trái Đất
  const say = readout(F.panel);
  const sR = slider(F.panel, { label: 'Bán kính hành tinh', min: 0.5, max: 20, log: true, value: rp, format: (v) => `${fmt(v, v < 3 ? 2 : 1)} lần Trái Đất`, onInput: (v) => { rp = v; show(); } });
  const sM = slider(F.panel, { label: 'Khối lượng hành tinh', min: 0.3, max: 3000, log: true, value: mp, format: (v) => `${fmt(v, v < 3 ? 2 : 0)} lần Trái Đất`, onInput: (v) => { mp = v; show(); } });
  buttons(F.panel, [
    { label: 'Sao Mộc (quanh Mặt Trời)', value: [R_JUP / R_EARTH, M_JUP / M_EARTH, 11.862] },
    { label: 'Trái Đất (quanh Mặt Trời)', value: [1, 1, 1] },
    { label: 'Sao Mộc nóng (4,2 ngày)', value: [R_JUP / R_EARTH * 1.3, 150, 4.23 / 365.25] },
  ], (v) => { Pyr = v[2]; sR.set(v[0]); sM.set(v[1]); });

  function show() {
    const d = transitDepth(rp * R_EARTH, R_SUN);
    const K = rvSemiAmplitude(mp * M_EARTH, M_SUN, Pyr * JULIAN_YEAR);
    say(`<span>Quá cảnh: sao mờ đi <b>${d < 1e-3 ? fmt(d * 1e6, 0) + ' phần triệu' : fmt(d * 100, 2) + ' %'}</b></span>
      <span>Vận tốc xuyên tâm: sao lắc với biên độ <b>${K < 1 ? fmt(K * 100, 1) + ' cm/s' : fmt(K, 1) + ' m/s'}</b> (chu kỳ ${Pyr < 0.1 ? fmt(Pyr * 365.25, 1) + ' ngày' : fmt(Pyr, 2) + ' năm'}, sao giống Mặt Trời)</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) ph = (ph + dt * 0.07) % 1;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 620;
    // sao + hành tinh đi ngang
    const cx = narrow ? w / 2 : w * 0.22, cy = narrow ? h * 0.2 : h * 0.32, R = Math.min(narrow ? w * 0.18 : w * 0.13, h * 0.17);
    const rr = Math.max(1.5, (rp * R_EARTH / R_SUN) * R);
    const x = cx + (ph * 2 - 1) * R * 2.2;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R);
    g.addColorStop(0, '#fff8e8'); g.addColorStop(0.75, '#ffd590'); g.addColorStop(1, '#d48a3a');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#05060b'; ctx.beginPath(); ctx.arc(x, cy + R * 0.2, rr, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    ctx.fillText('hành tinh đi ngang trước sao (theo tỉ lệ bán kính)', cx, cy + R + 16);
    // đường cong ánh sáng
    const depth = transitDepth(rp * R_EARTH, R_SUN);
    const flux = (p) => {
      const xx = (p * 2 - 1) * 2.2, yy = 0.2, k = rp * R_EARTH / R_SUN;
      const d = Math.hypot(xx, yy);
      if (d > 1 + k) return 1;
      const mu = Math.sqrt(Math.max(0, 1 - Math.min(1, d) ** 2));
      const ld = (1 - 0.6 * (1 - mu)) / (1 - 0.6 / 3);            // tối rìa tuyến tính, u = 0,6
      const cover = d < 1 - k ? 1 : (1 + k - d) / (2 * k);
      return 1 - depth * ld * cover;
    };
    const lx0 = narrow ? 20 : w * 0.42, lx1 = w - 16, ly0 = narrow ? h * 0.36 : 24, ly1 = narrow ? h * 0.62 : h * 0.46;
    const dShow = Math.max(depth * 1.3, 2e-4);
    const LY = (f) => ly0 + ((1 - f) / dShow) * (ly1 - ly0);
    ctx.strokeStyle = 'rgba(236,230,216,.15)'; ctx.strokeRect(lx0, ly0, lx1 - lx0, ly1 - ly0);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.8; ctx.beginPath();
    for (let i = 0; i <= 300; i++) { const p = i / 300, X = lx0 + p * (lx1 - lx0); i ? ctx.lineTo(X, LY(flux(p))) : ctx.moveTo(X, LY(flux(p))); }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(lx0 + ph * (lx1 - lx0), LY(flux(ph)), 3.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText(`độ sáng của sao (trục dọc phóng to: đáy = −${depth < 1e-3 ? fmt(dShow * 1e6, 0) + ' ppm' : fmt(dShow * 100, 2) + ' %'})`, lx0 + 6, ly0 + 13);
    // vận tốc xuyên tâm
    const K = rvSemiAmplitude(mp * M_EARTH, M_SUN, Pyr * JULIAN_YEAR);
    const ry0 = narrow ? h * 0.7 : h * 0.58, ry1 = h - 26, rmid = (ry0 + ry1) / 2;
    ctx.strokeStyle = 'rgba(236,230,216,.15)'; ctx.strokeRect(lx0, ry0, lx1 - lx0, ry1 - ry0);
    ctx.beginPath(); ctx.moveTo(lx0, rmid); ctx.lineTo(lx1, rmid); ctx.stroke();
    ctx.strokeStyle = '#ffb07c'; ctx.lineWidth = 1.6; ctx.beginPath();
    for (let i = 0; i <= 300; i++) { const p = i / 300, X = lx0 + p * (lx1 - lx0), Y = rmid - Math.sin((p - 0.5) * 2 * Math.PI) * (ry1 - ry0) * 0.38; i ? ctx.lineTo(X, Y) : ctx.moveTo(X, Y); }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.fillText(`vận tốc xuyên tâm của sao: ±${K < 1 ? fmt(K * 100, 1) + ' cm/s' : fmt(K, 1) + ' m/s'} (về phía ta / ra xa)`, lx0 + 6, ry0 + 13);
    // ngôi sao lắc (phóng đại) với vạch phổ dịch
    if (!narrow) {
      const sx = cx + Math.sin((ph - 0.5) * 2 * Math.PI) * 10, sy = h * 0.74;
      ctx.fillStyle = '#ffd590'; ctx.beginPath(); ctx.arc(sx, sy, 10, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'center'; ctx.fillText('sao lắc quanh khối tâm (phóng đại)', cx, sy + 26);
    }
    return !opts.reduced;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
