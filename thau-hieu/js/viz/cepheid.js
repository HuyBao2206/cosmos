// Cepheid như một "ngọn hải đăng": chu kỳ nhấp nháy → độ trưng thật (định luật Leavitt) → so với độ sáng biểu kiến → khoảng cách.
// Quan hệ dùng: ⟨M_V⟩ = −2,77 log P − 1,44 (Lanoix et al. 1999). Bỏ qua bụi che khuất (bụi làm sao mờ đi ⇒ ước lượng xa hơn thật).
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { cepheidAbsMag, magToLsun, distanceModulusToPc, pcToLy } from '../../../shared/js/astro/physics.js';

// Dạng đường cong ánh sáng điển hình: sáng lên nhanh, mờ đi chậm (0 = mờ nhất, 1 = sáng nhất)
const shape = (ph) => {
  ph = ((ph % 1) + 1) % 1;
  const v = ph < 0.18 ? ph / 0.18 : 1 - (ph - 0.18) / 0.82;
  return v * v * (3 - 2 * v);
};
const AMP = 0.8; // biên độ minh hoạ (cấp sao)

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Sao Cepheid nhấp nháy, đường cong ánh sáng và quan hệ chu kỳ – độ trưng');
  let P = 5.366, m = 3.95, phase = 0;

  const say = readout(F.panel);
  const sP = slider(F.panel, {
    label: 'Chu kỳ đo được', min: 1, max: 100, log: true, value: P,
    format: (v) => `${fmt(v, v < 10 ? 2 : 1)} ngày`, onInput: (v) => { P = v; show(); },
  });
  const sM = slider(F.panel, {
    label: 'Cấp sao biểu kiến trung bình', min: 1, max: 28, step: 0.05, value: m,
    format: (v) => fmt(v, 2), onInput: (v) => { m = v; show(); },
  });
  buttons(F.panel, [
    { label: 'δ Cephei', value: [5.366, 3.95] },
    { label: 'Ví dụ: trong Andromeda', value: [30, 18.8] },
    { label: 'Ví dụ: NGC 5468', value: [50, 26.9] },
  ], ([p, mm]) => { sP.set(p); sM.set(mm); });

  function show() {
    const M = cepheidAbsMag(P), Ls = magToLsun(M), d = distanceModulusToPc(m, M), ly = pcToLy(d);
    const lyTxt = ly < 1e6 ? `${fmt(ly, 0)} năm ánh sáng` : `${fmt(ly / 1e6, ly < 1e7 ? 2 : 0)} triệu năm ánh sáng`;
    say(`<span>Độ trưng thật <b>M = ${fmt(M, 2)}</b> ≈ <b>${Ls < 1e5 ? fmt(Ls, 0) : sci(Ls, 1)} L☉</b></span>
      <span>m − M = <b>${fmt(m - M, 2)}</b></span>
      <span>⇒ khoảng cách <b>${d < 1e6 ? fmt(d, 0) + ' pc' : fmt(d / 1e6, 1) + ' Mpc'}</b> ≈ <b>${lyTxt}</b></span>`);
    L?.kick();
  }

  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    // 1 chu kỳ hiển thị trong 1,2–3,6 giây: chu kỳ dài thì nhịp chậm hơn (thang log)
    if (!opts.reduced) phase += dt / (1.2 + 1.2 * Math.log10(P));
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 620;
    const bri = opts.reduced ? 0.7 : shape(phase);

    const S = narrow ? { x: 0, y: 0, w: w * 0.38, h: h * 0.5 } : { x: 0, y: 0, w: w * 0.24, h };
    const C = narrow ? { x: 0, y: h * 0.5, w, h: h * 0.5 } : { x: w * 0.24, y: 0, w: w * 0.44, h };
    const Q = narrow ? { x: w * 0.38, y: 0, w: w * 0.62, h: h * 0.5 } : { x: w * 0.68, y: 0, w: w * 0.32, h };

    /* ngôi sao */
    const sx = S.x + S.w / 2, sy = S.y + S.h / 2;
    const r0 = Math.min(S.w, S.h) * 0.17 * (0.85 + 0.15 * Math.min(1, Math.log10(P) / 2));
    const rad = r0 * (1 + 0.06 * (bri - 0.5));
    const halo = ctx.createRadialGradient(sx, sy, rad * 0.8, sx, sy, rad * (1.6 + bri * 1.1));
    halo.addColorStop(0, `rgba(255,236,190,${0.18 + bri * 0.4})`); halo.addColorStop(1, 'rgba(255,200,120,0)');
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(sx, sy, rad * 2.8, 0, Math.PI * 2); ctx.fill();
    const core = ctx.createRadialGradient(sx - rad * 0.3, sy - rad * 0.3, 0, sx, sy, rad);
    core.addColorStop(0, '#fffaf0'); core.addColorStop(1, `rgb(${235 + bri * 20},${190 + bri * 40},${120 + bri * 60})`);
    ctx.fillStyle = core; ctx.beginPath(); ctx.arc(sx, sy, rad, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(11); ctx.textAlign = 'center';
    ctx.fillText('Lớp ngoài co – giãn', sx, sy + r0 * 2.9 + 4);

    /* đường cong ánh sáng: 2 chu kỳ */
    const pad = 34, cx0 = C.x + pad, cx1 = C.x + C.w - 14, cy0 = C.y + 40, cy1 = C.y + C.h - 40;
    const yOf = (v) => cy1 - v * (cy1 - cy0);
    ctx.strokeStyle = 'rgba(236,230,216,.14)';
    ctx.beginPath(); ctx.moveTo(cx0, cy1); ctx.lineTo(cx1, cy1); ctx.moveTo(cx0, cy0); ctx.lineTo(cx0, cy1); ctx.stroke();
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const t = i / 200, x = cx0 + t * (cx1 - cx0), y = yOf(shape(t * 2 + 0.82)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.lineWidth = 1;
    const tNow = (((phase - 0.82) % 2) + 2) % 2 / 2;
    if (!opts.reduced) { ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(cx0 + tNow * (cx1 - cx0), yOf(shape(phase)), 4, 0, Math.PI * 2); ctx.fill(); }
    // đánh dấu 1 chu kỳ
    const pk = (k) => cx0 + ((k - 0.82 + 0.18 + 2) % 2) / 2 * (cx1 - cx0);
    const xa = pk(0.18), xb = pk(1.18);
    ctx.strokeStyle = 'rgba(236,230,216,.5)';
    ctx.beginPath(); ctx.moveTo(Math.min(xa, xb), cy0 - 14); ctx.lineTo(Math.max(xa, xb), cy0 - 14); ctx.stroke();
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(12, 600); ctx.textAlign = 'center';
    ctx.fillText(`P = ${fmt(P, P < 10 ? 2 : 1)} ngày`, (xa + xb) / 2, cy0 - 20);
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)';
    ctx.fillText('thời gian →', (cx0 + cx1) / 2, cy1 + 18);
    ctx.save(); ctx.translate(C.x + 14, (cy0 + cy1) / 2); ctx.rotate(-Math.PI / 2);
    ctx.fillText('độ sáng', 0, 0); ctx.restore();
    ctx.textAlign = 'right';
    ctx.fillText(`m ≈ ${fmt(m - AMP / 2, 1)}`, cx0 - 4, cy0 + 4);
    ctx.fillText(`${fmt(m + AMP / 2, 1)}`, cx0 - 4, cy1);

    /* quan hệ chu kỳ – độ trưng */
    const qx0 = Q.x + 44, qx1 = Q.x + Q.w - 16, qy0 = Q.y + 40, qy1 = Q.y + Q.h - 44;
    const MX = (lp) => qx0 + (lp / 2) * (qx1 - qx0);
    const MY = (M) => qy0 + ((M - -7.5) / (-1.2 - -7.5)) * (qy1 - qy0);
    ctx.strokeStyle = 'rgba(236,230,216,.14)';
    ctx.beginPath(); ctx.moveTo(qx0, qy0); ctx.lineTo(qx0, qy1); ctx.lineTo(qx1, qy1); ctx.stroke();
    ctx.strokeStyle = 'rgba(159,212,232,.55)'; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(MX(0), MY(cepheidAbsMag(1))); ctx.lineTo(MX(2), MY(cepheidAbsMag(100))); ctx.stroke(); ctx.lineWidth = 1;
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'center';
    [1, 10, 100].forEach((d) => ctx.fillText(`${d}`, MX(Math.log10(d)), qy1 + 14));
    ctx.fillText('chu kỳ (ngày, thang log)', (qx0 + qx1) / 2, qy1 + 30);
    ctx.textAlign = 'right';
    [-2, -4, -6].forEach((M) => ctx.fillText(fmt(M), qx0 - 6, MY(M) + 3));
    ctx.save(); ctx.translate(Q.x + 12, (qy0 + qy1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center';
    ctx.fillText('sáng hơn ↑   M', 0, 0); ctx.restore();
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = 'left';
    ctx.fillText('Định luật Leavitt', qx0 + 6, qy0 - 14);
    const M = cepheidAbsMag(P), px = MX(Math.log10(P)), py = MY(M);
    ctx.setLineDash([2, 3]); ctx.strokeStyle = 'rgba(236,230,216,.35)';
    ctx.beginPath(); ctx.moveTo(px, qy1); ctx.lineTo(px, py); ctx.lineTo(qx0, py); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
