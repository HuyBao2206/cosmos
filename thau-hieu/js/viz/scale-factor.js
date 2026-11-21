// Năng lượng tối và lịch sử giãn nở: hệ số tỉ lệ a(t) cho các mô hình khác nhau (tích phân phương trình Friedmann, cosmology.js).
// Giữ Ωm = 0,31 (Planck 2018), chỉnh ΩΛ: ΩΛ = 0 → giãn nở chậm dần mãi; ΩΛ = 0,69 → chậm dần rồi tăng tốc từ khoảng 6 tỷ năm trước.
// Đường cong mô hình Planck có a = 1 ở t ≈ 13,8 tỷ năm (có test).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { scaleFactorHistory, ageAtA } from '../../../shared/js/astro/cosmology.js';

const OM = 0.3111;

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Hệ số tỉ lệ của vũ trụ theo thời gian với các lượng năng lượng tối khác nhau');
  let OL = 0.6889, curves = {};
  const say = readout(F.panel);
  const sL = slider(F.panel, { label: 'Năng lượng tối ΩΛ (giữ Ωm = 0,31)', min: 0, max: 1.2, step: 0.01, value: OL, format: (v) => fmt(v, 2), onInput: (v) => { OL = v; show(); } });
  buttons(F.panel, [{ label: 'Không năng lượng tối', value: 0 }, { label: 'Vũ trụ của ta (Planck 2018)', value: 0.6889 }, { label: 'Nhiều năng lượng tối', value: 1.1 }], (v) => sL.set(v));

  const hist = (ol) => { const k = ol.toFixed(2); if (!curves[k]) curves[k] = scaleFactorHistory({ Om: OM, OL: ol, Or: 9.1e-5 }, 40, 800); return curves[k]; };
  function accelStart(ol) {
    // gia tốc ä > 0 khi ΩΛ > Ωm/(2a³) ⇒ a* = (Ωm / 2ΩΛ)^{1/3}
    if (ol <= 0) return null;
    const a = Math.cbrt(OM / (2 * ol));
    return a < 1 ? { a, z: 1 / a - 1, t: ageAtA(a, { Om: OM, OL: ol, Or: 9.1e-5 }), now: ageAtA(1, { Om: OM, OL: ol, Or: 9.1e-5 }) } : null;
  }
  function show() {
    const acc = accelStart(OL);
    const age = ageAtA(1, { Om: OM, OL, Or: 9.1e-5 });
    say(`<span>Tuổi vũ trụ trong mô hình này <b>${fmt(age, 1)} tỷ năm</b></span>
      <span>${acc ? `Giãn nở bắt đầu tăng tốc ở z ≈ <b>${fmt(acc.z, 2)}</b>, cách nay <b>${fmt(acc.now - acc.t, 1)} tỷ năm</b>` : 'Không có giai đoạn tăng tốc: lực hút của vật chất làm giãn nở chậm dần mãi'}</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const x0 = 46, x1 = w - 16, y0 = 24, y1 = h - 38;
    const X = (t) => x0 + (t / 40) * (x1 - x0), Y = (a) => y1 - (a / 4) * (y1 - y0);
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    [0, 10, 20, 30, 40].forEach((t) => ctx.fillText(`${t}`, X(t), y1 + 13));
    ctx.fillText('thời gian sau Vụ Nổ Lớn (tỷ năm)', (x0 + x1) / 2, y1 + 28);
    ctx.textAlign = 'right'; [1, 2, 3, 4].forEach((a) => ctx.fillText(`${a}`, x0 - 6, Y(a) + 3));
    ctx.save(); ctx.translate(14, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.textAlign = 'center'; ctx.fillText('kích thước tương đối a (hôm nay = 1)', 0, 0); ctx.restore();
    const line = (pts, col, lw, dash = []) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.setLineDash(dash); ctx.beginPath(); pts.forEach(([t, a], i) => { if (a > 4.2) return; i ? ctx.lineTo(X(t), Y(a)) : ctx.moveTo(X(t), Y(a)); }); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1; };
    line(hist(0), 'rgba(255,176,124,.7)', 1.2, [5, 4]);
    line(hist(0.6889), 'rgba(159,212,232,.75)', 1.2, [2, 3]);
    line(hist(OL), accent, 2.2);
    // "hôm nay" của mô hình đang chọn
    const age = ageAtA(1, { Om: OM, OL, Or: 9.1e-5 });
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(X(age), Y(1), 4.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(10.5, 600); ctx.textAlign = 'left'; ctx.fillText('hôm nay', X(age) + 8, Y(1) + 14);
    const acc = accelStart(OL);
    if (acc) { ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(X(acc.t), Y(acc.a), 4, 0, Math.PI * 2); ctx.fill(); ctx.font = FONT(10); ctx.fillText('bắt đầu tăng tốc', X(acc.t) + 8, Y(acc.a) - 6); }
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText('đường cam: không có năng lượng tối · đường xanh chấm: Planck 2018 · đường sáng: mô hình đang chọn', x0 + 8, y0 + 4);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
