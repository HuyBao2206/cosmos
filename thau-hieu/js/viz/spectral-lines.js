// Quang phổ và vạch hấp thụ.
// Trên: đường cong vật đen (định luật Planck) của một ngôi sao — kéo nhiệt độ để thấy đỉnh trượt theo định luật Wien.
// Dưới: dải quang phổ của ngôi sao với các vạch tối; chọn một nguyên tố để đặt "vân tay" vạch phát xạ của nó lên trên mà so.
// Bước sóng vạch: các vạch Fraunhofer chuẩn (đo trong không khí, nm). Độ đậm vạch theo nhiệt độ là phác hoạ định tính
// theo dãy phân loại quang phổ (H mạnh nhất ở sao loại A ~10 000 K; Ca II, Na mạnh ở sao lạnh G–K).
import { frame, slider, buttons, readout, loop, wavelengthRGB, FONT, fmt } from './_kit.js';
import { planck, wienPeak } from '../../../shared/js/astro/physics.js';

const ELEMENTS = {
  H: { name: 'Hydro', lines: [656.281, 486.134, 434.047, 410.175], strength: (T) => gauss(Math.log10(T), 4.0, 0.22) },
  He: { name: 'Heli', lines: [587.562, 667.815, 501.568, 471.314, 447.148], strength: (T) => 0.9 * gauss(Math.log10(T), 4.4, 0.13) },
  Na: { name: 'Natri', lines: [588.995, 589.592], strength: (T) => gauss(Math.log10(T), 3.55, 0.12) },
  Ca: { name: 'Canxi (ion)', lines: [393.366, 396.847], strength: (T) => gauss(Math.log10(T), 3.7, 0.16) },
  Mg: { name: 'Magie', lines: [518.362, 517.270, 516.733], strength: (T) => 0.8 * gauss(Math.log10(T), 3.68, 0.15) },
  Fe: { name: 'Sắt', lines: [527.039, 430.790, 438.355, 495.761, 404.581, 466.814], strength: (T) => 0.75 * gauss(Math.log10(T), 3.68, 0.14) },
};
function gauss(x, m, s) { return Math.exp(-0.5 * ((x - m) / s) ** 2); }
const VMIN = 380, VMAX = 750;

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Đường cong bức xạ vật đen và dải quang phổ có vạch hấp thụ của một ngôi sao');
  let T = 5772, el = 'H';
  const say = readout(F.panel);
  slider(F.panel, {
    label: 'Nhiệt độ bề mặt ngôi sao', min: 2800, max: 40000, log: true, value: T,
    format: (v) => `${fmt(Math.round(v / 10) * 10)} K`, onInput: (v) => { T = v; show(); },
  });
  const box = buttons(F.panel, Object.entries(ELEMENTS).map(([k, e]) => ({ label: e.name, value: k })), (k) => { el = k; show(); });
  box.children[0].setAttribute('aria-pressed', 'true');

  function show() {
    const peak = wienPeak(T) * 1e9;
    const where = peak < 380 ? 'tử ngoại (sao trông xanh trắng)' : peak > 750 ? 'hồng ngoại (sao trông đỏ cam)' : 'vùng khả kiến';
    const s = ELEMENTS[el].strength(T);
    say(`<span>Đỉnh phát xạ <b>${fmt(peak, 0)} nm</b> — ${where}</span>
      <span>Vạch ${ELEMENTS[el].name.toLowerCase()} ở nhiệt độ này: <b>${s > 0.6 ? 'rất đậm' : s > 0.3 ? 'rõ' : s > 0.1 ? 'mờ' : 'gần như không thấy'}</b></span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const x0 = 46, x1 = w - 16;
    // trục: 150 nm – 2 500 nm (log) cho đường Planck, dải khả kiến nổi bật
    const lo = Math.log10(150), hi = Math.log10(2500);
    const X = (nm) => x0 + ((Math.log10(nm) - lo) / (hi - lo)) * (x1 - x0);
    const pTop = 30, pBot = h * 0.5;
    // nền vùng khả kiến
    const g = ctx.createLinearGradient(X(VMIN), 0, X(VMAX), 0);
    for (let nm = VMIN; nm <= VMAX; nm += 10) { const [r, gg, b] = wavelengthRGB(nm); g.addColorStop((nm - VMIN) / (VMAX - VMIN), `rgba(${r},${gg},${b},.10)`); }
    ctx.fillStyle = g; ctx.fillRect(X(VMIN), pTop, X(VMAX) - X(VMIN), pBot - pTop);
    // đường Planck, chuẩn hoá theo đỉnh
    const peakNm = wienPeak(T) * 1e9, Bmax = planck(peakNm * 1e-9, T);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = x0; x <= x1; x += 2) {
      const nm = Math.pow(10, lo + ((x - x0) / (x1 - x0)) * (hi - lo));
      const y = pBot - (planck(nm * 1e-9, T) / Bmax) * (pBot - pTop - 8);
      x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke(); ctx.lineWidth = 1;
    // đỉnh
    if (peakNm > 150 && peakNm < 2500) {
      const px = X(peakNm);
      ctx.setLineDash([3, 3]); ctx.strokeStyle = 'rgba(236,230,216,.4)'; ctx.beginPath(); ctx.moveTo(px, pTop); ctx.lineTo(px, pBot); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = px > w - 120 ? 'right' : 'left';
      ctx.fillText(`λ đỉnh = ${fmt(peakNm, 0)} nm`, px + (px > w - 120 ? -6 : 6), pTop + 12);
    }
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(x0, pBot); ctx.lineTo(x1, pBot); ctx.stroke();
    ctx.font = FONT(9.5); ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    [200, 300, 500, 1000, 2000].forEach((nm) => ctx.fillText(`${fmt(nm)} nm`, X(nm), pBot + 13));
    ctx.save(); ctx.translate(16, (pTop + pBot) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('cường độ (chuẩn hoá)', 0, 0); ctx.restore();
    // sao (màu tổng hợp xấp xỉ)
    const starCol = starRGB(T);
    const sx = x1 - 26, sy = pTop + 30;
    const rg = ctx.createRadialGradient(sx, sy, 0, sx, sy, 24);
    rg.addColorStop(0, '#fff'); rg.addColorStop(0.4, `rgb(${starCol})`); rg.addColorStop(1, `rgba(${starCol},0)`);
    ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(sx, sy, 24, 0, Math.PI * 2); ctx.fill();

    // dải quang phổ khả kiến (tuyến tính 380–750 nm)
    const sx0 = 16, sx1 = w - 16;
    const XS = (nm) => sx0 + ((nm - VMIN) / (VMAX - VMIN)) * (sx1 - sx0);
    const s1 = pBot + 40, sH = Math.min(46, h * 0.12), s2 = s1 + sH + 26;
    ctx.font = FONT(10, 500); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(236,230,216,.6)';
    ctx.fillText('Quang phổ ngôi sao (vạch hấp thụ tối)', sx0, s1 - 7);
    for (let x = sx0; x < sx1; x++) {
      const nm = VMIN + ((x - sx0) / (sx1 - sx0)) * (VMAX - VMIN);
      const [r, gg, b] = wavelengthRGB(nm);
      const I = Math.pow(planck(nm * 1e-9, T) / Math.max(planck(VMIN * 1e-9, T), planck(VMAX * 1e-9, T), planck(Math.min(Math.max(peakNm, VMIN), VMAX) * 1e-9, T)), 0.5);
      ctx.fillStyle = `rgb(${Math.round(r * I)},${Math.round(gg * I)},${Math.round(b * I)})`;
      ctx.fillRect(x, s1, 1.2, sH);
    }
    for (const [k, e] of Object.entries(ELEMENTS)) {
      const s = e.strength(T);
      if (s < 0.04) continue;
      e.lines.forEach((nm, i) => {
        const x = XS(nm);
        ctx.fillStyle = `rgba(3,4,8,${Math.min(0.95, s * (i === 0 ? 1 : 0.8))})`;
        ctx.fillRect(x - 1 - s, s1, 2 + 2 * s, sH);
      });
    }
    // vân tay vạch phát xạ của nguyên tố được chọn
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.fillText(`Vạch phát xạ của ${ELEMENTS[el].name.toLowerCase()} đo trong phòng thí nghiệm`, sx0, s2 - 7);
    ctx.fillStyle = '#05060b'; ctx.fillRect(sx0, s2, sx1 - sx0, sH * 0.7);
    ctx.strokeStyle = 'rgba(236,230,216,.12)'; ctx.strokeRect(sx0, s2, sx1 - sx0, sH * 0.7);
    ELEMENTS[el].lines.forEach((nm) => {
      const x = XS(nm), [r, gg, b] = wavelengthRGB(nm);
      ctx.fillStyle = `rgb(${r},${gg},${b})`; ctx.fillRect(x - 1.2, s2, 2.4, sH * 0.7);
      ctx.strokeStyle = `rgba(${r},${gg},${b},.35)`; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(x, s2); ctx.lineTo(x, s1 + sH); ctx.stroke(); ctx.setLineDash([]);
    });
    ctx.font = FONT(9.5); ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    [400, 450, 500, 550, 600, 650, 700].forEach((nm) => ctx.fillText(`${nm}`, XS(nm), s2 + sH * 0.7 + 13));
    ctx.textAlign = 'right'; ctx.fillText('nm', sx1, s2 + sH * 0.7 + 13);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}

/** Màu xấp xỉ của một vật đen nhiệt độ T (bảng nội suy theo log T, giống biểu đồ H–R) */
function starRGB(T) {
  const C = [[2800, [255, 170, 100]], [4000, [255, 209, 163]], [5800, [255, 244, 234]], [7500, [248, 247, 255]], [10000, [204, 219, 255]], [40000, [155, 176, 255]]];
  for (let i = 1; i < C.length; i++) if (T <= C[i][0]) {
    const [t0, a] = C[i - 1], [t1, b] = C[i], k = (Math.log10(T) - Math.log10(t0)) / (Math.log10(t1) - Math.log10(t0));
    return a.map((c, j) => Math.round(c + (b[j] - c) * k)).join(',');
  }
  return '155,176,255';
}
