// Bán kính Schwarzschild theo khối lượng: kéo khối lượng từ Trái Đất tới M87* → r_s = 2GM/c², đặt cạnh một vật quen thuộc cùng cỡ.
// Vẽ các vòng đặc trưng (đơn vị r_s): chân trời 1, quả cầu photon 1,5, bóng nhìn từ xa √27/2 ≈ 2,6, ISCO 3.
// Kèm mật độ trung bình bên trong chân trời (∝ 1/M²) và lực kéo giãn trên người cao 2 m ở chân trời (∝ 1/M²) — physics.js, có test.
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { schwarzschildRadius, meanDensity, tidalStretch, M_SUN, M_EARTH, AU } from '../../../shared/js/astro/physics.js';

// vật so sánh: [bán kính (m), tên]
const REF = [
  [0.0089, 'một viên bi (~1 cm)'], [0.25, 'một quả bóng'], [50, 'một toà nhà'], [3e3, 'một thị trấn nhỏ'], [3e4, 'một thành phố'],
  [6.371e6, 'Trái Đất'], [6.957e8, 'Mặt Trời'], [0.39 * AU, 'quỹ đạo Sao Thuỷ'], [5.2 * AU, 'quỹ đạo Sao Mộc'], [39.5 * AU, 'quỹ đạo Sao Diêm Vương'], [1000 * AU, '1 000 au'],
];
function refFor(r) {
  let best = REF[0];
  for (const x of REF) if (Math.abs(Math.log10(x[0] / r)) < Math.abs(Math.log10(best[0] / r))) best = x;
  return best;
}
function fmtLen(m) {
  if (m < 1) return `${fmt(m * 1000, m < 0.01 ? 1 : 0)} mm`;
  if (m < 1e3) return `${fmt(m, 0)} m`;
  if (m < 1e7) return `${fmt(m / 1e3, m < 1e4 ? 1 : 0)} km`;
  if (m < 0.1 * AU) return `${fmt(m / 1e9, 1)} triệu km`;
  return `${fmt(m / AU, m < 10 * AU ? 2 : 0)} au`;
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Kích thước chân trời sự kiện và các vòng đặc trưng quanh hố đen theo khối lượng');
  let M = 10 * M_SUN;
  const say = readout(F.panel);
  const sM = slider(F.panel, {
    label: 'Khối lượng', min: M_EARTH, max: 1e10 * M_SUN, log: true, value: M,
    format: (v) => (v < 0.01 * M_SUN ? `${fmt(v / M_EARTH, v < 10 * M_EARTH ? 1 : 0)} lần Trái Đất` : `${v / M_SUN < 1e4 ? fmt(v / M_SUN, v < 10 * M_SUN ? 1 : 0) : sci(v / M_SUN, 2)} M☉`),
    onInput: (v) => { M = v; show(); },
  });
  buttons(F.panel, [
    { label: 'Trái Đất', value: M_EARTH }, { label: 'Mặt Trời', value: M_SUN }, { label: 'Cygnus X-1 (21 M☉)', value: 21.2 * M_SUN },
    { label: 'Sgr A* (4,3 triệu M☉)', value: 4.3e6 * M_SUN }, { label: 'M87* (6,5 tỷ M☉)', value: 6.5e9 * M_SUN },
  ], (v) => sM.set(v));

  function show() {
    const rs = schwarzschildRadius(M);
    const rho = meanDensity(M, rs);
    const tide = tidalStretch(M, rs, 2);
    const ref = refFor(rs);
    say(`<span>Bán kính chân trời <b>${fmtLen(rs)}</b> — cỡ ${ref[1]}</span>
      <span>Mật độ trung bình bên trong chân trời <b>${rho > 1e3 ? sci(rho / 1000, 1) + ' tấn/m³' : rho > 1 ? fmt(rho, 0) + ' kg/m³' : sci(rho, 1) + ' kg/m³'}</b>${rho < 1000 ? ' — loãng hơn nước' : ''}</span>
      <span>Lực kéo giãn trên người cao 2 m ở chân trời: <b>${tide > 1e3 ? sci(tide / 9.81, 1) : fmt(tide / 9.81, tide / 9.81 < 0.01 ? 5 : 2)} lần g</b>${tide / 9.81 < 1 ? ' — vượt qua mà không bị xé' : ' — bị kéo sợi mì trước khi tới chân trời'}</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const cx = w < 560 ? w * 0.5 : w * 0.55, cy = w < 560 ? h * 0.6 : h * 0.5, unit = Math.min(w, h) * (w < 560 ? 0.11 : 0.13);   // 1 r_s
    // vòng ISCO, bóng, quả cầu photon
    const rings = [[3, 'quỹ đạo tròn bền trong cùng (3 r_s)', 'rgba(159,212,232,.5)', [4, 4]], [Math.sqrt(27) / 2, 'bóng nhìn từ xa (≈ 2,6 r_s)', 'rgba(255,190,140,.75)', []], [1.5, 'quả cầu photon (1,5 r_s)', 'rgba(255,240,200,.45)', [2, 3]]];
    rings.forEach(([k, label, col, dash], i) => {
      ctx.strokeStyle = col; ctx.setLineDash(dash); ctx.lineWidth = i === 1 ? 1.5 : 1;
      ctx.beginPath(); ctx.arc(cx, cy, k * unit, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]); ctx.lineWidth = 1;
      // chú giải bên trái, không đè lên hình
      const ly = 22 + i * 18;
      ctx.strokeStyle = col; ctx.setLineDash(dash); ctx.beginPath(); ctx.moveTo(14, ly); ctx.lineTo(40, ly); ctx.stroke(); ctx.setLineDash([]);
      ctx.font = FONT(10.5); ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(236,230,216,.75)';
      ctx.fillText(label, 46, ly + 4);
    });
    // chân trời
    const g = ctx.createRadialGradient(cx, cy, unit * 0.9, cx, cy, unit * 1.12);
    g.addColorStop(0, '#000'); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, unit * 1.12, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#000'; ctx.beginPath(); ctx.arc(cx, cy, unit, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, unit, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = 'rgba(236,230,216,.85)'; ctx.font = FONT(11, 600); ctx.textAlign = 'center';
    ctx.fillText('chân trời sự kiện', cx, cy + 4);
    ctx.font = FONT(10.5); ctx.fillStyle = 'rgba(236,230,216,.6)';
    ctx.fillText(`r_s = ${fmtLen(schwarzschildRadius(M))}`, cx, cy + 20);
    ctx.textAlign = 'left'; ctx.strokeStyle = accent; ctx.beginPath(); ctx.moveTo(14, 22 + 3 * 18); ctx.lineTo(40, 22 + 3 * 18); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.75)'; ctx.fillText('chân trời sự kiện (1 r_s)', 46, 26 + 3 * 18); ctx.textAlign = 'center';
    // thước: vật quen thuộc cùng cỡ
    const rs = schwarzschildRadius(M), ref = refFor(rs);
    const rr = Math.min(unit * 2.8, (ref[0] / rs) * unit);
    ctx.strokeStyle = 'rgba(236,230,216,.25)'; ctx.setLineDash([1, 3]);
    ctx.beginPath(); ctx.arc(cx, cy, rr, Math.PI * 0.6, Math.PI * 0.9); ctx.stroke(); ctx.setLineDash([]);
    ctx.textAlign = 'left'; ctx.fillStyle = 'rgba(236,230,216,.5)';
    ctx.fillText(`(vòng chấm: bán kính ${ref[1]})`, 12, h - 12);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
