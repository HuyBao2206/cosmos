// Số phận vũ trụ: kích thước tương đối a(t) từ Vụ Nổ Lớn tới 120 tỷ năm, theo bản chất năng lượng tối.
// Quá khứ: mô hình Planck 2018 (scaleFactorHistory). Tương lai: tích phân Friedmann với w hằng (futureHistory) — có test.
// w = −1: giãn nở mãi (nguội dần). w < −1: năng lượng "ma" → Big Rip ở thời gian hữu hạn (bigRipTime).
// Mật độ năng lượng tối âm (minh hoạ một số mô hình 2025): giãn nở dừng rồi co lại (Big Crunch). Trục dọc thang log.
import { frame, slider, buttons, readout, loop, FONT, fmt } from '../../../thau-hieu/js/viz/_kit.js';
import { scaleFactorHistory, futureHistory, bigRipTime, ageAtA } from '../../../shared/js/astro/cosmology.js';

const T_MAX = 120, T0 = ageAtA(1);

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Kích thước vũ trụ theo thời gian trong các kịch bản số phận khác nhau');
  let w = -1, crunch = false, cache = {};
  const past = scaleFactorHistory({}, T0, 600).filter(([t]) => t <= T0);
  const say = readout(F.panel);
  const sW = slider(F.panel, { label: 'Phương trình trạng thái của năng lượng tối w', min: -1.5, max: -0.7, step: 0.01, value: w, format: (v) => fmt(v, 2), onInput: (v) => { w = v; crunch = false; show(); } });
  buttons(F.panel, [
    { label: 'Hằng số vũ trụ (w = −1)', value: -1 }, { label: 'Năng lượng ma (w = −1,5)', value: -1.5 }, { label: 'Năng lượng tối yếu dần (w = −0,8)', value: -0.8 },
    { label: 'Năng lượng tối âm (co lại)', value: 'crunch' },
  ], (v) => { if (v === 'crunch') { crunch = true; show(); } else { sW.set(v); } });

  const fut = () => { const k = crunch ? 'c' : w.toFixed(2); if (!cache[k]) cache[k] = crunch ? futureHistory({ w: -1, ODE: -0.25 }, T_MAX, 3000) : futureHistory({ w }, T_MAX, 3000); return cache[k]; };
  function show() {
    let txt;
    if (crunch) {
      const f = fut(), peak = f.reduce((m, p) => (p[1] > m[1] ? p : m), f[0]), end = f.at(-1);
      txt = `<span>Năng lượng tối âm (minh hoạ): giãn nở dừng lúc vũ trụ khoảng <b>${fmt(peak[0], 0)} tỷ năm</b> tuổi rồi co lại, sụp ở khoảng <b>${fmt(end[0], 0)} tỷ năm</b></span><span>Kịch bản <b>Co lớn</b> — suy đoán; chỉ xảy ra nếu năng lượng tối đổi dấu</span>`;
    } else if (w < -1) {
      txt = `<span>Năng lượng “ma”: mật độ năng lượng tối tăng dần; <b>Xé toạc lớn</b> sau khoảng <b>${fmt(bigRipTime(w, 67.66, 0.3111), 0)} tỷ năm</b> nữa</span><span>Suy đoán — dữ liệu hiện nay không ưa w < −1</span>`;
    } else if (w > -1) {
      txt = `<span>Năng lượng tối loãng dần: giãn nở vẫn tiếp diễn nhưng chậm hơn trường hợp w = −1</span><span>Hướng mà DESI hơi ưa (2,6–3,2σ, đang tranh luận)</span>`;
    } else {
      txt = '<span>Hằng số vũ trụ: giãn nở tăng tốc mãi; các thiên hà xa dần khuất khỏi tầm nhìn, sao thôi hình thành sau khoảng 100 nghìn tỷ năm — “chết nhiệt”</span><span>Hệ quả của mô hình chuẩn — được ủng hộ mạnh</span>';
    }
    say(txt);
    L.kick();
  }

  function draw() {
    const { w: W, h: H } = size;
    if (!W) return true;
    ctx.clearRect(0, 0, W, H);
    const x0 = 52, x1 = W - 16, y0 = 20, y1 = H - 40;
    const X = (t) => x0 + (t / T_MAX) * (x1 - x0);
    const lmin = -2, lmax = 3;
    const Y = (a) => y1 - ((Math.log10(Math.max(a, 1e-2)) - lmin) / (lmax - lmin)) * (y1 - y0);
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    [0, 20, 40, 60, 80, 100, 120].forEach((t) => ctx.fillText(`${t}`, X(t), y1 + 14));
    ctx.fillText('thời gian sau Vụ Nổ Lớn (tỷ năm)', (x0 + x1) / 2, y1 + 30);
    ctx.textAlign = 'right'; [[0.01, '0,01'], [0.1, '0,1'], [1, '1'], [10, '10'], [100, '100'], [1000, '1 000']].forEach(([a, s]) => ctx.fillText(s, x0 - 5, Y(a) + 3));
    // hôm nay
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(236,230,216,.3)'; ctx.beginPath(); ctx.moveTo(X(T0), y0); ctx.lineTo(X(T0), y1); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.textAlign = 'left'; ctx.fillText('hôm nay', X(T0) + 5, y0 + 10);
    const line = (pts, col, lw) => { ctx.strokeStyle = col; ctx.lineWidth = lw; ctx.beginPath(); let s = false; for (const [t, a] of pts) { if (t > T_MAX) break; const y = Y(a); s ? ctx.lineTo(X(t), y) : (ctx.moveTo(X(t), y), s = true); } ctx.stroke(); ctx.lineWidth = 1; };
    line(past, 'rgba(236,230,216,.8)', 2);
    // tham chiếu w = −1
    if (crunch || Math.abs(w + 1) > 0.01) line(futureHistory({ w: -1 }, T_MAX, 1500), 'rgba(159,212,232,.4)', 1);
    const f = fut();
    line(f, accent, 2.4);
    const end = f.at(-1);
    if (end[0] < T_MAX - 1) {
      ctx.fillStyle = accent; ctx.font = FONT(11, 600); ctx.textAlign = 'center';
      ctx.fillText(crunch ? 'Co lớn' : 'Xé toạc lớn', X(end[0]), crunch ? Y(0.02) - 8 : y0 + 26);
    }
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'right';
    ctx.fillText('đường xanh mảnh: hằng số vũ trụ (w = −1) để so sánh', x1, y1 - 8);
    return false;
  }
  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
