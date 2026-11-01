// Sao lùn trắng: càng nặng càng NHỎ (áp suất suy biến electron). Quan hệ khối lượng – bán kính Nauenberg (1972),
// so sánh cùng tỉ lệ với Trái Đất; mật độ và "một thìa cà phê" (5 cm³) vật chất.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { wdRadius, WD_M3, R_SUN, R_EARTH, M_SUN, meanDensity } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host, { note: 'Sao lùn trắng và Trái Đất vẽ cùng tỉ lệ' });
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'So sánh kích thước sao lùn trắng theo khối lượng với Trái Đất');
  let M = 0.6, shown = 0.6;
  const say = readout(F.panel);
  const s = slider(F.panel, {
    label: 'Khối lượng sao lùn trắng', min: 0.2, max: 1.45, step: 0.005, value: M,
    format: (v) => `${fmt(v, 2)} M☉`, onInput: (v) => { M = v; show(); },
  });
  buttons(F.panel, [{ label: 'Điển hình 0,6', value: 0.6 }, { label: 'Sirius B 1,02', value: 1.018 }, { label: 'Sát giới hạn', value: 1.42 }], (v) => s.set(v));

  function show() {
    const R = wdRadius(M) * R_SUN;
    if (!R || M >= 1.44) {
      say('<span><b style="color:var(--c)">Vượt giới hạn Chandrasekhar (~1,4 M☉):</b> áp suất electron không còn chống nổi trọng lực — không có sao lùn trắng bền nào nặng như vậy.</span>');
    } else {
      const rho = meanDensity(M * M_SUN, R);              // kg/m³
      const spoon = rho * 5e-6 / 1000;                    // tấn trong 5 cm³
      say(`<span>Bán kính <b>~${fmt(R / 1000, 0)} km</b> (${fmt(R / R_EARTH, 2)} lần Trái Đất)</span>
        <span>Mật độ trung bình <b>~${fmt(rho / 1e9, rho < 1e10 ? 1 : 0)} tấn/cm³</b></span>
        <span>Một thìa cà phê (5 cm³) nặng <b>~${fmt(spoon, spoon < 10 ? 1 : 0)} tấn</b></span>`);
    }
    L?.kick();
  }

  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    shown += (M - shown) * Math.min(1, dt * 8);
    ctx.clearRect(0, 0, w, h);
    const cy = h * 0.5;
    const scale = Math.min(w * (w < 560 ? 0.11 : 0.17), h * 0.3) / R_EARTH;          // px trên mét
    // rìa Mặt Trời (cùng tỉ lệ thì Mặt Trời lớn gấp 109 lần Trái Đất)
    const sunR = R_SUN * scale;
    const sx = -sunR + Math.min(w * 0.08, 40);
    const gs = ctx.createRadialGradient(sx, cy, sunR * 0.96, sx, cy, sunR * 1.01);
    gs.addColorStop(0, 'rgba(255,214,140,.32)'); gs.addColorStop(1, 'rgba(255,214,140,0)');
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(sx, cy, sunR * 1.01, 0, Math.PI * 2); ctx.fill();
    ctx.save(); ctx.translate(16, h - 16); ctx.font = FONT(10); ctx.fillStyle = 'rgba(255,214,140,.7)'; ctx.textAlign = 'left';
    ctx.fillText('← rìa Mặt Trời (cùng tỉ lệ)', 0, 0); ctx.restore();
    // Trái Đất
    const ex = w * 0.42, er = R_EARTH * scale;
    const ge = ctx.createRadialGradient(ex - er * 0.3, cy - er * 0.3, er * 0.1, ex, cy, er);
    ge.addColorStop(0, '#7fb6e8'); ge.addColorStop(0.7, '#2f5f8f'); ge.addColorStop(1, '#173450');
    ctx.fillStyle = ge; ctx.beginPath(); ctx.arc(ex, cy, er, 0, Math.PI * 2); ctx.fill();
    ctx.font = FONT(12); ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.textAlign = 'center';
    ctx.fillText('Trái Đất', ex, cy + er + 20);
    // sao lùn trắng
    const wx = w * 0.75;
    const R = wdRadius(Math.min(shown, WD_M3 * 0.999)) * R_SUN;
    const over = M >= 1.44;
    const wr = Math.max(over ? 0 : 1.5, R * scale);
    if (!over) {
      const halo = ctx.createRadialGradient(wx, cy, wr * 0.95, wx, cy, wr * 1.3 + 4);
      halo.addColorStop(0, 'rgba(200,220,255,.4)'); halo.addColorStop(1, 'rgba(200,220,255,0)');
      ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(wx, cy, wr * 1.3 + 4, 0, Math.PI * 2); ctx.fill();
      const gw = ctx.createRadialGradient(wx - wr * 0.3, cy - wr * 0.3, 0, wx, cy, wr);
      gw.addColorStop(0, '#ffffff'); gw.addColorStop(1, '#cfdcff');
      ctx.fillStyle = gw; ctx.beginPath(); ctx.arc(wx, cy, wr, 0, Math.PI * 2); ctx.fill();
    } else {
      ctx.strokeStyle = accent; ctx.setLineDash([3, 4]); ctx.beginPath(); ctx.arc(wx, cy, er * 0.4, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = accent; ctx.font = FONT(11, 600); ctx.fillText('sụp đổ', wx, cy + 4);
    }
    ctx.font = FONT(12); ctx.fillStyle = 'rgba(236,230,216,.7)';
    ctx.fillText(`Sao lùn trắng ${fmt(M, 2)} M☉`, wx, cy + Math.max(er * 0.5, wr * 1.3) + 20);
    // thanh khối lượng – bán kính nhỏ
    const bx0 = 18, by0 = 40, bw = 150, bh = 56;
    if (w > 480) {
      ctx.strokeStyle = 'rgba(236,230,216,.14)'; ctx.strokeRect(bx0, by0, bw, bh);
      ctx.strokeStyle = 'rgba(220,232,255,.7)'; ctx.beginPath();
      for (let i = 0; i <= 60; i++) { const m = 0.2 + (i / 60) * (WD_M3 - 0.2); const y = by0 + bh - (wdRadius(m) / 0.022) * bh; const x = bx0 + ((m - 0.2) / (1.5 - 0.2)) * bw; i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
      ctx.stroke();
      const mx = bx0 + ((Math.min(shown, 1.45) - 0.2) / 1.3) * bw, my = by0 + bh - (wdRadius(Math.min(shown, WD_M3 * 0.999)) / 0.022) * bh;
      ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(mx, my, 3.5, 0, Math.PI * 2); ctx.fill();
      ctx.font = FONT(9.5); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'left';
      ctx.fillText('bán kính ↓ khi khối lượng →', bx0 + 4, by0 + bh + 13);
    }
    return Math.abs(M - shown) > 1e-4;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
