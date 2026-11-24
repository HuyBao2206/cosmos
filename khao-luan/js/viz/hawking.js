// Bức xạ Hawking theo khối lượng hố đen: nhiệt độ T = ħc³/(8πGMk_B) và thời gian bốc hơi (gần đúng, chỉ photon)
// t ≈ 5120πG²M³/(ħc⁴) — physics.js, có test (1 M☉: 6,2 × 10⁻⁸ K, ~2 × 10⁶⁷ năm). Hố đen chỉ thực sự mất khối lượng khi
// nóng hơn phông vi sóng (2,7255 K) — với hiện nay, mọi hố đen khối lượng sao đều đang lạnh hơn nó.
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from '../../../thau-hieu/js/viz/_kit.js';
import { hawkingTemperature, evaporationTime, M_SUN, M_EARTH, JULIAN_YEAR } from '../../../shared/js/astro/physics.js';

const T_CMB = 2.7255;
const AGE = 13.787e9;

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Nhiệt độ Hawking và thời gian bốc hơi của hố đen theo khối lượng');
  let M = M_SUN;
  const say = readout(F.panel);
  const sM = slider(F.panel, { label: 'Khối lượng hố đen', min: 1e10, max: 1e10 * M_SUN, log: true, value: M,
    format: (v) => (v < 1e20 ? `${sci(v, 1)} kg` : v < 0.1 * M_SUN ? `${sci(v / M_EARTH, 1)} lần Trái Đất` : `${v / M_SUN < 1e4 ? fmt(v / M_SUN, 1) : sci(v / M_SUN, 1)} M☉`), onInput: (v) => { M = v; show(); } });
  buttons(F.panel, [
    { label: 'Ngọn núi (10¹² kg)', value: 1e12 }, { label: 'Bằng nhiệt độ phông vi sóng', value: 4.5e22 }, { label: 'Mặt Trời', value: M_SUN },
    { label: 'Sgr A*', value: 4.3e6 * M_SUN }, { label: 'M87*', value: 6.5e9 * M_SUN },
  ], (v) => sM.set(v));

  function show() {
    const T = hawkingTemperature(M), ty = evaporationTime(M) / JULIAN_YEAR;
    const warm = T > T_CMB;
    say(`<span>Nhiệt độ Hawking <b>${T < 0.01 || T > 1e5 ? sci(T, 2) : fmt(T, 2)} K</b> — ${warm ? 'nóng hơn phông vi sóng: đang mất khối lượng' : 'lạnh hơn phông vi sóng (2,7 K): hiện nay hấp thụ nhiều hơn phát ra'}</span>
      <span>Thời gian bốc hơi (nếu cô lập) <b>${ty < 1 ? sci(ty * JULIAN_YEAR, 1) + ' giây' : sci(ty, 1) + ' năm'}</b>${ty < AGE ? ' — ngắn hơn tuổi vũ trụ' : ` — gấp ${sci(ty / AGE, 0)} lần tuổi vũ trụ`}</span>
      <span>Chưa từng quan sát được bức xạ Hawking từ một hố đen thật.</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const x0 = 56, x1 = w - 18, y0 = 22, y1 = h - 42;
    const lmMin = 10, lmMax = Math.log10(1e10 * M_SUN);
    const X = (m) => x0 + ((Math.log10(m) - lmMin) / (lmMax - lmMin)) * (x1 - x0);
    const tMin = -18, tMax = 14;   // log10 K
    const Y = (T) => y1 - ((Math.log10(T) - tMin) / (tMax - tMin)) * (y1 - y0);
    ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    // vùng "nóng hơn CMB"
    ctx.fillStyle = 'rgba(255,176,124,.07)'; ctx.fillRect(x0, y0, x1 - x0, Y(T_CMB) - y0);
    ctx.setLineDash([4, 4]); ctx.strokeStyle = 'rgba(255,176,124,.6)'; ctx.beginPath(); ctx.moveTo(x0, Y(T_CMB)); ctx.lineTo(x1, Y(T_CMB)); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(255,176,124,.85)'; ctx.font = FONT(10); ctx.textAlign = 'right'; ctx.fillText('nhiệt độ phông vi sóng 2,7 K', x1, Y(T_CMB) - 5);
    // đường T(M) ∝ 1/M
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let i = 0; i <= 200; i++) { const lm = lmMin + (i / 200) * (lmMax - lmMin), m = 10 ** lm; const y = Y(hawkingTemperature(m)); i ? ctx.lineTo(X(m), y) : ctx.moveTo(X(m), y); }
    ctx.stroke(); ctx.lineWidth = 1;
    // trục
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    [[1e12, 'núi'], [M_EARTH, 'Trái Đất'], [M_SUN, 'Mặt Trời'], [1e9 * M_SUN, '10⁹ M☉']].forEach(([m, s]) => { ctx.fillRect(X(m), y1, 1, 4); ctx.fillText(s, X(m), y1 + 15); });
    ctx.fillText('khối lượng (thang log)', (x0 + x1) / 2, y1 + 32);
    ctx.textAlign = 'right'; [[1e12, '10¹² K'], [1e6, '10⁶ K'], [1, '1 K'], [1e-6, '10⁻⁶ K'], [1e-12, '10⁻¹² K']].forEach(([T, s]) => ctx.fillText(s, x0 - 5, Y(T) + 3));
    // điểm chọn
    const px = X(M), py = Y(hawkingTemperature(M));
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(px, py, 5, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(255,255,255,.35)'; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px, y1); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.textAlign = 'left'; ctx.fillText('nhỏ hơn thì nóng hơn: T ∝ 1/M', x0 + 8, y0 + 12);
    return false;
  }
  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
