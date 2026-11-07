// Phổ điện từ: kéo dọc trục bước sóng (thang log, 1 pm → 1 km) để đọc tần số, năng lượng photon,
// dải phổ, và bức xạ đó xuyên được tới độ cao nào trong khí quyển (sơ đồ định tính theo hình quen thuộc của NASA/ESA).
// Công thức: ν = c/λ, E = hc/λ (physics.js, có test).
import { frame, buttons, readout, loop, drag, logAxis, wavelengthRGB, pow10, FONT, fmt, sci } from './_kit.js';
import { frequency, photonEnergyEV } from '../../../shared/js/astro/physics.js';

const LMIN = 1e-12, LMAX = 1e3;
// Ranh giới quy ước (các nguồn lệch nhau; xem research/anh-sang.md §1)
const BANDS = [
  { id: 'gamma', name: 'Tia gamma', a: LMIN, b: 1e-11, col: '#c9a8ff', ex: 'hạt nhân phân rã, siêu tân tinh, chớp gamma' },
  { id: 'x', name: 'Tia X', a: 1e-11, b: 1e-8, col: '#a8b8ff', ex: 'khí triệu độ quanh hố đen, vành nhật hoa' },
  { id: 'uv', name: 'Tử ngoại', a: 1e-8, b: 380e-9, col: '#9fc6ff', ex: 'sao nóng loại O, B' },
  { id: 'vis', name: 'Khả kiến', a: 380e-9, b: 750e-9, col: null, ex: 'bề mặt Mặt Trời và các ngôi sao' },
  { id: 'ir', name: 'Hồng ngoại', a: 750e-9, b: 1e-3, col: '#ffb07c', ex: 'bụi ấm, tiền sao, thiên hà rất xa (đã bị kéo dài bước sóng)' },
  { id: 'mw', name: 'Vi sóng', a: 1e-3, b: 0.3, col: '#ff9a8f', ex: 'bức xạ phông vi sóng vũ trụ' },
  { id: 'radio', name: 'Vô tuyến', a: 0.3, b: LMAX, col: '#e88fb3', ex: 'pulsar, khí hydro trung hoà (vạch 21 cm), tia phản lực của chuẩn tinh' },
];
// Độ cao (km) mà một nửa bức xạ bị hấp thụ — dạng bậc thang phác hoạ, chỉ để định hướng.
const ALT = [
  [LMIN, 40], [1e-11, 40], [1e-9, 90], [1e-8, 120], [1e-7, 70], [2.0e-7, 50], [3.0e-7, 25], [3.2e-7, 0], [1e-6, 0],
  [1.3e-6, 4], [1.6e-6, 0], [1.8e-6, 5], [2.2e-6, 0], [2.5e-6, 6], [3.5e-6, 0], [4.2e-6, 6], [8e-6, 2], [1.3e-5, 0], [1.5e-5, 12],
  [1e-4, 30], [3e-4, 20], [8e-4, 6], [1.2e-3, 2], [1e-2, 0], [10, 0], [20, 100], [LMAX, 200],
];
const altAt = (l) => {
  for (let i = 1; i < ALT.length; i++) if (l <= ALT[i][0]) {
    const [l0, a0] = ALT[i - 1], [l1, a1] = ALT[i];
    const k = (Math.log10(l) - Math.log10(l0)) / (Math.log10(l1) - Math.log10(l0));
    return a0 + (a1 - a0) * k;
  }
  return 200;
};
const bandOf = (l) => BANDS.find((b) => l >= b.a && l < b.b) || BANDS[BANDS.length - 1];

function fmtLen(l) {
  if (l < 1e-9) return `${fmt(l * 1e12, l < 1e-11 ? 2 : 1)} pm`;
  if (l < 1e-6) return `${fmt(l * 1e9, l < 1e-8 ? 2 : 0)} nm`;
  if (l < 1e-3) return `${fmt(l * 1e6, l < 1e-5 ? 2 : 1)} μm`;
  if (l < 1) return `${fmt(l * 1e3, l < 1e-2 ? 2 : 1)} mm`;
  if (l < 1e3) return `${fmt(l, l < 10 ? 2 : 0)} m`;
  return `${fmt(l / 1e3, 1)} km`;
}
function fmtHz(f) {
  const u = [[1e18, 'EHz'], [1e15, 'PHz'], [1e12, 'THz'], [1e9, 'GHz'], [1e6, 'MHz'], [1e3, 'kHz'], [1, 'Hz']];
  for (const [k, n] of u) if (f >= k) return `${fmt(f / k, f / k < 10 ? 2 : 0)} ${n}`;
  return `${fmt(f, 1)} Hz`;
}
function fmtEV(e) {
  if (e >= 1e6) return `${fmt(e / 1e6, 2)} MeV`;
  if (e >= 1e3) return `${fmt(e / 1e3, 2)} keV`;
  if (e >= 0.01) return `${fmt(e, 2)} eV`;
  return `${sci(e, 2)} eV`;
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Phổ điện từ từ tia gamma tới sóng vô tuyến, kèm độ cao mà mỗi loại bức xạ xuyên tới trong khí quyển');
  let lam = 550e-9, t = 0;
  const say = readout(F.panel);
  const box = buttons(F.panel, [
    { label: 'Tia X 1 nm', value: 1e-9 }, { label: 'Tử ngoại 200 nm', value: 200e-9 }, { label: 'Lục 550 nm', value: 550e-9 },
    { label: 'Hồng ngoại 10 μm', value: 10e-6 }, { label: 'Phông vi sóng 1 mm', value: 1.06e-3 }, { label: 'Hydro 21 cm', value: 0.21106 },
  ], (v) => { lam = v; show(); });
  box.children[2].setAttribute('aria-pressed', 'true');
  // bàn phím: phím mũi tên trên canvas
  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', (e) => {
    const k = { ArrowLeft: -0.05, ArrowRight: 0.05, ArrowDown: -0.05, ArrowUp: 0.05 }[e.key];
    if (k) { lam = Math.min(LMAX * 0.99, Math.max(LMIN * 1.01, lam * Math.pow(10, k * 4))); show(); e.preventDefault(); }
  });

  let ax;
  const unDrag = drag(canvas, { onDrag: (x) => { if (!ax) return; lam = Math.min(LMAX * 0.999, Math.max(LMIN * 1.001, ax.V(x))); show(); } });

  function show() {
    const b = bandOf(lam);
    const alt = altAt(lam);
    const reach = alt < 0.5 ? 'tới được mặt đất' : alt > 150 ? 'bị tầng điện li phản xạ, không tới mặt đất' : `bị hấp thụ ở độ cao khoảng ${fmt(alt)} km`;
    say(`<span>Bước sóng <b>${fmtLen(lam)}</b></span><span>Tần số <b>${fmtHz(frequency(lam))}</b></span><span>Năng lượng photon <b>${fmtEV(photonEnergyEV(lam))}</b></span>
      <span><b>${b.name}</b> — ví dụ nguồn: ${b.ex}</span><span>Trong khí quyển: <b>${reach}</b></span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 560;
    const x0 = 16, x1 = w - 16;
    ax = logAxis(LMIN, LMAX, x0, x1);
    const bandY = h * (narrow ? 0.5 : 0.52), bandH = 26;
    // dải phổ
    BANDS.forEach((b) => {
      const xa = ax.X(b.a), xb = ax.X(b.b);
      if (b.id === 'vis') {
        for (let x = xa; x < xb; x++) { const nm = ax.V(x + 0.5) * 1e9; const [r, g, bl] = wavelengthRGB(nm); ctx.fillStyle = `rgb(${r},${g},${bl})`; ctx.fillRect(x, bandY, 1.2, bandH); }
      } else { ctx.fillStyle = b.col + '33'; ctx.fillRect(xa, bandY, xb - xa, bandH); ctx.fillStyle = b.col + '88'; ctx.fillRect(xa, bandY, 1, bandH); }
      if (!narrow || b.id !== 'vis') {
        ctx.fillStyle = 'rgba(236,230,216,.75)'; ctx.font = FONT(narrow ? 9.5 : 11, 500); ctx.textAlign = 'center';
        const lx = b.id === 'vis' ? (xa + xb) / 2 : (xa + xb) / 2;
        ctx.fillText(narrow && b.id === 'radio' ? 'Vô tuyến' : b.name, lx, bandY + bandH + 16);
      }
    });
    // trục log
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    for (let e = -12; e <= 3; e += narrow ? 3 : 1) { const x = ax.X(10 ** e); ctx.fillRect(x, bandY + bandH, 1, 4); }
    [[1e-12, '1 pm'], [1e-9, '1 nm'], [1e-6, '1 μm'], [1e-3, '1 mm'], [1, '1 m'], [1e3, '1 km']].forEach(([v, s]) => ctx.fillText(s, ax.X(v), bandY + bandH + 32));
    ctx.textAlign = 'left'; ctx.fillText('bước sóng (thang log) → dài hơn, năng lượng thấp hơn', x0, bandY + bandH + 48);

    // khí quyển: vùng trên dải là độ cao (0–200 km, thang căn bậc hai cho dễ nhìn)
    const top = 34, ground = bandY - 14;
    const yAlt = (km) => ground - Math.sqrt(Math.min(km, 200) / 200) * (ground - top);
    ctx.fillStyle = 'rgba(159,212,232,.06)';
    ctx.beginPath(); ctx.moveTo(x0, ground);
    for (let x = x0; x <= x1; x += 2) ctx.lineTo(x, yAlt(altAt(ax.V(x))));
    ctx.lineTo(x1, ground); ctx.closePath(); ctx.fill();
    ctx.strokeStyle = 'rgba(159,212,232,.55)'; ctx.beginPath();
    for (let x = x0; x <= x1; x += 2) { const y = yAlt(altAt(ax.V(x))); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.stroke();
    ctx.strokeStyle = 'rgba(236,230,216,.25)'; ctx.beginPath(); ctx.moveTo(x0, ground); ctx.lineTo(x1, ground); ctx.stroke();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'left';
    ctx.fillText('mặt đất', x0 + 2, ground - 4);
    [[10, '10 km'], [50, '50 km'], [100, '100 km']].forEach(([k, s]) => { const y = yAlt(k); ctx.fillStyle = 'rgba(236,230,216,.08)'; ctx.fillRect(x0, y, x1 - x0, 1); ctx.fillStyle = 'rgba(236,230,216,.4)'; ctx.fillText(s, x0 + 2, y - 3); });
    ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(159,212,232,.75)';
    ctx.fillText('độ cao mà bức xạ bị khí quyển chặn (phác hoạ)', x1, top - 12);
    if (!narrow) {
      ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.textAlign = 'center';
      ctx.fillText('cửa sổ quang học', ax.X(560e-9), ground - 18);
      ctx.fillText('cửa sổ vô tuyến', ax.X(0.3), ground - 18);
    }

    // con trỏ + sóng
    const cx = ax.X(lam);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(cx, top - 4); ctx.lineTo(cx, bandY + bandH + 4); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(cx, bandY + bandH / 2, 7, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#05060b'; ctx.beginPath(); ctx.arc(cx, bandY + bandH / 2, 3, 0, Math.PI * 2); ctx.fill();
    // sóng minh hoạ: chu kỳ trên màn hình tăng theo log λ (không theo tỉ lệ)
    const wy = h - (narrow ? 34 : 40), amp = 11;
    const per = 8 + ((Math.log10(lam) + 12) / 15) * 140;
    const nm = lam * 1e9, rgb = nm >= 380 && nm <= 750 ? wavelengthRGB(nm) : null;
    ctx.strokeStyle = rgb ? `rgb(${rgb})` : bandOf(lam).col; ctx.lineWidth = 1.6; ctx.beginPath();
    for (let x = x0; x <= x1; x += 1.5) { const y = wy + amp * Math.sin(((x - x0) / per - t * 0.8) * Math.PI * 2); x === x0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
    ctx.stroke(); ctx.lineWidth = 1;
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); unDrag(); F.destroyResize(); } };
}
