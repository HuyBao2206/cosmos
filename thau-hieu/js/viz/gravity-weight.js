// Định luật vạn vật hấp dẫn: chọn một thiên thể, kéo độ cao → gia tốc rơi tự do g = GM/r² và trọng lượng của một người 60 kg.
// Đồ thị g theo khoảng cách tới tâm (thang tuyến tính, đơn vị bán kính thiên thể) cho thấy luật nghịch đảo bình phương.
// Khối lượng & bán kính: NSSDCA (Trái Đất, Mặt Trăng, Sao Hoả, Sao Mộc); Mặt Trời: IAU 2015 B3; sao lùn trắng: Sirius B (xấp xỉ).
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { surfaceGravity, M_SUN, R_SUN } from '../../../shared/js/astro/physics.js';

const BODIES = {
  earth: { name: 'Trái Đất', M: 5.972e24, R: 6.371e6, col: '#5d8fd8' },
  moon: { name: 'Mặt Trăng', M: 7.346e22, R: 1.7374e6, col: '#cfcac0' },
  mars: { name: 'Sao Hoả', M: 6.417e23, R: 3.3895e6, col: '#d9805a' },
  jupiter: { name: 'Sao Mộc', M: 1.898e27, R: 6.9911e7, col: '#e2c8a4' },
  sun: { name: 'Mặt Trời', M: M_SUN, R: R_SUN, col: '#ffd27a' },
  wd: { name: 'Sao lùn trắng Sirius B', M: 1.018 * M_SUN, R: 5.84e6, col: '#dfe8ff' },
};
const MASS = 60; // kg

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Gia tốc trọng trường giảm theo bình phương khoảng cách tới tâm thiên thể');
  let id = 'earth', k = 1;   // k = r / R
  const say = readout(F.panel);
  slider(F.panel, { label: 'Khoảng cách tới tâm (theo bán kính thiên thể)', min: 1, max: 10, step: 0.01, value: k, format: (v) => `${fmt(v, 2)} R`, onInput: (v) => { k = v; show(); } });
  const box = buttons(F.panel, Object.entries(BODIES).map(([key, b]) => ({ label: b.name, value: key })), (v) => { id = v; show(); });
  box.children[0].setAttribute('aria-pressed', 'true');

  function show() {
    const b = BODIES[id];
    const g = surfaceGravity(b.M, b.R * k);
    const alt = (k - 1) * b.R / 1000;
    say(`<span>Độ cao <b>${alt < 1e4 ? fmt(alt, 0) : sci(alt, 2)} km</b> trên bề mặt ${b.name}</span>
      <span>g = <b>${g < 1000 ? fmt(g, 2) : sci(g, 2)} m/s²</b> (${g / 9.80665 < 100 ? fmt(g / 9.80665, 2) : sci(g / 9.80665, 2)} lần g chuẩn)</span>
      <span>Người ${MASS} kg chịu lực hút <b>${sci(MASS * g, 3)} N</b> — như nặng <b>${MASS * g / 9.80665 < 1e4 ? fmt(MASS * g / 9.80665, 1) : sci(MASS * g / 9.80665, 2)} kg</b> trên Trái Đất</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const b = BODIES[id];
    const narrow = w < 600;
    // trái: thiên thể và vị trí người; phải: đồ thị g(r)
    const gx0 = narrow ? 40 : w * 0.42, gx1 = w - 18, gy0 = 30, gy1 = h - 40;
    const X = (kk) => gx0 + ((kk - 1) / 9) * (gx1 - gx0);
    const Y = (f) => gy1 - f * (gy1 - gy0);   // f = g/g_bề mặt
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const kk = 1 + 9 * i / 200; const x = X(kk), y = Y(1 / (kk * kk)); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.lineWidth = 1;
    const px = X(k), py = Y(1 / (k * k));
    ctx.setLineDash([2, 3]); ctx.strokeStyle = 'rgba(236,230,216,.4)'; ctx.beginPath(); ctx.moveTo(px, gy1); ctx.lineTo(px, py); ctx.lineTo(gx0, py); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'center';
    [1, 2, 3, 5, 10].forEach((kk) => ctx.fillText(`${kk} R`, X(kk), gy1 + 14));
    ctx.fillText('khoảng cách tới tâm', (gx0 + gx1) / 2, gy1 + 30);
    ctx.textAlign = 'right';
    [[1, '100 %'], [0.25, '25 %'], [1 / 9, '11 %']].forEach(([f, s]) => ctx.fillText(s, gx0 - 6, Y(f) + 3));
    ctx.textAlign = 'left'; ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600);
    ctx.fillText('g so với ở bề mặt: gấp đôi khoảng cách → còn 1/4', gx0 + 8, gy0 + 4);
    if (!narrow) {
      // thiên thể (cỡ tương đối với khung, không theo tỉ lệ giữa các thiên thể)
      const cx = w * 0.2, cy = h * 0.55, R = Math.min(w * 0.12, h * 0.22);
      const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
      g.addColorStop(0, '#fff'); g.addColorStop(0.25, b.col); g.addColorStop(1, 'rgba(0,0,0,.6)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
      const ry = cy - R * Math.min(k, (cy - 20) / R);
      ctx.strokeStyle = 'rgba(236,230,216,.3)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx, ry); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = '#ece6d8'; ctx.beginPath(); ctx.arc(cx, ry, 4, 0, Math.PI * 2); ctx.fill();
      const arrow = 40 / (k * k);
      ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(cx + 12, ry); ctx.lineTo(cx + 12, ry + arrow); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10.5); ctx.textAlign = 'center'; ctx.fillText(b.name, cx, cy + R + 18);
    }
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
