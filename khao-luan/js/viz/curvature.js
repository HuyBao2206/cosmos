// Độ cong của không gian: tổng ba góc của một tam giác thật lớn cho biết không gian phẳng, cong dương hay cong âm.
// Vẽ tam giác trên mặt cong dương (đóng), phẳng, cong âm (mở). Theo định lý Gauss–Bonnet, tổng góc lệch khỏi 180° một lượng
// tỉ lệ với (độ cong × diện tích tam giác); hình là minh hoạ với đơn vị tuỳ ý. Bảng số ghi Ω_K đo được (Planck 2018 + BAO).
import { frame, slider, buttons, readout, loop, FONT, fmt } from '../../../thau-hieu/js/viz/_kit.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Tam giác trên không gian cong dương, phẳng và cong âm; tổng ba góc khác nhau');
  let k = 0.6, t = 0;   // k > 0: cong dương; k < 0: cong âm (đơn vị tuỳ ý cho hình)
  const say = readout(F.panel);
  const sK = slider(F.panel, { label: 'Độ cong của không gian (minh hoạ)', min: -1, max: 1, step: 0.01, value: k, format: (v) => (Math.abs(v) < 0.02 ? 'phẳng' : v > 0 ? `dương ${fmt(v, 2)}` : `âm ${fmt(-v, 2)}`), onInput: (v) => { k = v; show(); } });
  buttons(F.panel, [{ label: 'Cong dương (đóng)', value: 0.8 }, { label: 'Phẳng', value: 0 }, { label: 'Cong âm (mở)', value: -0.8 }], (v) => sK.set(v));

  // tam giác có "kích thước góc" s (rad trên mặt cong bán kính 1): tam giác đều, diện tích chuẩn hoá A = s²·√3/4
  const S = 1.1;
  const angleSum = () => 180 + k * (S * S * Math.sqrt(3) / 4) * (180 / Math.PI) * 1.6;
  function show() {
    const sum = angleSum();
    say(`<span>Tổng ba góc của tam giác: <b>${fmt(sum, 1)}°</b> ${Math.abs(k) < 0.02 ? '— đúng 180° như hình học Euclid' : k > 0 ? '— lớn hơn 180°: không gian đóng, hữu hạn' : '— nhỏ hơn 180°: không gian mở'}</span>
      <span>Đo thật (Planck 2018 + BAO): Ω_K = 0,0007 ± 0,0019 — phẳng trong sai số khoảng 0,2 %</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt * 0.25;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h * 0.46, R = Math.min(w * 0.36, h * 0.62);
    // bề mặt: lưới chiếu phối cảnh của z = k·(x² − ... ) — cầu (k>0) vòm lên, yên ngựa (k<0)
    const surf = (u, v) => {
      const z = k > 0 ? k * (1 - (u * u + v * v)) * 0.9 : -k * (u * u - v * v) * 0.55;
      const ca = Math.cos(t), sa = Math.sin(t);
      const x = u * ca - v * sa, y = u * sa + v * ca;
      return [cx + x * R, cy + y * R * 0.45 - z * R * 0.55];
    };
    ctx.strokeStyle = 'rgba(166,232,184,.16)';
    for (let i = -6; i <= 6; i++) for (const dir of [0, 1]) {
      ctx.beginPath();
      for (let j = -30; j <= 30; j++) { const a = i / 6, b = j / 30; const [x, y] = dir ? surf(a, b) : surf(b, a); j === -30 ? ctx.moveTo(x, y) : ctx.lineTo(x, y); }
      ctx.stroke();
    }
    // tam giác: cạnh cong theo độ cong (vẽ phồng ra hoặc lõm vào trên mặt chiếu)
    const P = [[0, -0.62], [0.55, 0.38], [-0.55, 0.38]];
    ctx.strokeStyle = accent; ctx.lineWidth = 2.2; ctx.beginPath();
    for (let e = 0; e < 3; e++) {
      const [a, b] = [P[e], P[(e + 1) % 3]];
      const mx = (a[0] + b[0]) / 2, my = (a[1] + b[1]) / 2, bulge = k * 0.22;
      for (let s = 0; s <= 24; s++) {
        const q = s / 24, bx = a[0] + (b[0] - a[0]) * q, by = a[1] + (b[1] - a[1]) * q;
        const off = 4 * q * (1 - q) * bulge;
        const [x, y] = surf(bx + mx * off, by + my * off);
        e === 0 && s === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
    }
    ctx.closePath(); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(14, 600); ctx.textAlign = 'center';
    ctx.fillText(`${fmt(angleSum(), 1)}°`, cx, h - 18);
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.fillText('tổng ba góc', cx, h - 4);
    return !opts.reduced;
  }
  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
