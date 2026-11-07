// Lực thuỷ triều: Trái Đất nhìn từ phía cực Bắc, Mặt Trăng và Mặt Trời ở các góc chỉnh được.
// Mỗi vật kéo các điểm trên Trái Đất với gia tốc khác nhau; trừ đi gia tốc tại tâm còn lại trường thuỷ triều
// a = (GM r / d³) · (3 cos²φ − 1) theo phương bán kính — hai chỗ phình ở phía gần và phía xa.
// Chỗ phình vẽ phóng đại rất nhiều (triều đại dương thật chỉ cỡ vài chục cm ngoài khơi). Tỉ lệ Mặt Trời/Mặt Trăng ≈ 0,46 lấy từ tidalAccel.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { tidalAccel, M_SUN, AU, M_MOON, D_MOON, R_EARTH } from '../../../shared/js/astro/physics.js';

const kMoon = tidalAccel(M_MOON, D_MOON, R_EARTH), kSun = tidalAccel(M_SUN, AU, R_EARTH);

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Hai chỗ phình thuỷ triều trên Trái Đất do Mặt Trăng và Mặt Trời');
  let moonAng = 0, sunOn = true, arrows = true, t = 0;
  const say = readout(F.panel);
  const sA = slider(F.panel, { label: 'Góc Mặt Trăng – Trái Đất – Mặt Trời', min: 0, max: 180, step: 1, value: moonAng, format: (v) => `${fmt(v)}°`, onInput: (v) => { moonAng = v; show(); } });
  buttons(F.panel, [
    { label: 'Trăng mới (triều cường)', value: 0 }, { label: 'Bán nguyệt (triều kém)', value: 90 }, { label: 'Trăng tròn (triều cường)', value: 180 },
    { label: 'Bật/tắt Mặt Trời', value: 'sun' }, { label: 'Bật/tắt mũi tên lực', value: 'arr' },
  ], (v) => { if (v === 'sun') { sunOn = !sunOn; show(); } else if (v === 'arr') { arrows = !arrows; L.kick(); } else sA.set(v); });

  // biên độ triều (tương đối) theo hướng θ trên Trái Đất
  const field = (th) => {
    const m = moonAng * Math.PI / 180;
    let s = kMoon * (3 * Math.cos(th - m) ** 2 - 1) / 2;
    if (sunOn) s += kSun * (3 * Math.cos(th) ** 2 - 1) / 2;
    return s;
  };
  function show() {
    const m = moonAng * Math.PI / 180;
    // biên độ tổng hợp (cao nhất − thấp nhất) so với chỉ Mặt Trăng
    let hi = -1e9, lo = 1e9;
    for (let i = 0; i < 360; i++) { const v = field(i * Math.PI / 180); hi = Math.max(hi, v); lo = Math.min(lo, v); }
    const rel = (hi - lo) / (1.5 * kMoon);
    say(`<span>Lực thuỷ triều của Mặt Trời bằng <b>${fmt(kSun / kMoon, 2)}</b> lần của Mặt Trăng</span>
      <span>Chênh lệch triều cao – thấp: <b>${fmt(rel * 100, 0)} %</b> so với khi chỉ có Mặt Trăng</span>
      <span>${!sunOn ? 'Chỉ có Mặt Trăng' : Math.abs(Math.cos(m)) > 0.95 ? '<b>Triều cường</b>: hai lực cộng vào nhau' : Math.abs(Math.cos(m)) < 0.2 ? '<b>Triều kém</b>: hai lực bù trừ một phần' : 'Giữa triều cường và triều kém'}</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt;
    ctx.clearRect(0, 0, w, h);
    const cx = w * 0.5, cy = h * 0.52, R = Math.min(w, h) * 0.2;
    const m = moonAng * Math.PI / 180;
    // Mặt Trời (bên phải, xa — chỉ là hướng)
    if (sunOn) {
      const sx = w - 26, g = ctx.createRadialGradient(sx, cy, 0, sx, cy, 40);
      g.addColorStop(0, '#fff7e0'); g.addColorStop(0.35, '#ffd27a'); g.addColorStop(1, 'rgba(255,190,90,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, cy, 40, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10.5); ctx.textAlign = 'right'; ctx.fillText('về phía Mặt Trời →', w - 10, cy + 56);
    }
    // nước: chỗ phình (phóng đại)
    const amp = R * 0.42 / (1.5 * kMoon);
    ctx.fillStyle = 'rgba(80,150,230,.35)'; ctx.strokeStyle = 'rgba(159,212,232,.7)';
    ctx.beginPath();
    for (let i = 0; i <= 180; i++) {
      const th = (i / 180) * 2 * Math.PI, r = R * 1.08 + amp * (field(th) + 0.5 * (kMoon + (sunOn ? kSun : 0)));
      const x = cx + r * Math.cos(th), y = cy - r * Math.sin(th);
      i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
    }
    ctx.closePath(); ctx.fill(); ctx.stroke();
    // Trái Đất
    const g2 = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.3, R * 0.1, cx, cy, R);
    g2.addColorStop(0, '#4f7a4a'); g2.addColorStop(1, '#22361f');
    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.font = FONT(10.5); ctx.textAlign = 'center'; ctx.fillText('Trái Đất (nhìn từ cực Bắc)', cx, cy + 4);
    // mũi tên lực thuỷ triều quanh Trái Đất
    if (arrows) {
      ctx.strokeStyle = accent; ctx.fillStyle = accent;
      for (let i = 0; i < 16; i++) {
        const th = (i / 16) * 2 * Math.PI;
        // trường thuỷ triều 2D đầy đủ (cả thành phần tiếp tuyến) cho mỗi vật: a ∝ (2cosφ·r̂_dir − sinφ…) — dùng dạng véc-tơ: 3(n·u)u − n
        let ax = 0, ay = 0;
        const n = [Math.cos(th), Math.sin(th)];
        const add = (ang, k) => { const u = [Math.cos(ang), Math.sin(ang)], d = n[0] * u[0] + n[1] * u[1]; ax += k * (3 * d * u[0] - n[0]); ay += k * (3 * d * u[1] - n[1]); };
        add(m, kMoon); if (sunOn) add(0, kSun);
        const s = (R * 0.28) / (2 * kMoon);
        const x0 = cx + R * 0.72 * n[0], y0 = cy - R * 0.72 * n[1];
        const x1 = x0 + ax * s, y1 = y0 - ay * s;
        ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x1, y1); ctx.stroke();
        const an = Math.atan2(y1 - y0, x1 - x0);
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x1 - 6 * Math.cos(an - 0.4), y1 - 6 * Math.sin(an - 0.4)); ctx.lineTo(x1 - 6 * Math.cos(an + 0.4), y1 - 6 * Math.sin(an + 0.4)); ctx.closePath(); ctx.fill();
      }
    }
    // Mặt Trăng trên quỹ đạo (không theo tỉ lệ)
    const om = R * 2.05;
    ctx.strokeStyle = 'rgba(236,230,216,.12)'; ctx.setLineDash([2, 4]); ctx.beginPath(); ctx.arc(cx, cy, om, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    const mx = cx + om * Math.cos(m), my = cy - om * Math.sin(m);
    ctx.fillStyle = '#d8d3c8'; ctx.beginPath(); ctx.arc(mx, my, R * 0.27, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.font = FONT(10.5); ctx.textAlign = 'center'; ctx.fillText('Mặt Trăng', mx, my - R * 0.27 - 6);
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'left'; ctx.fillText('Chỗ phình của nước vẽ phóng đại rất nhiều; khoảng cách không theo tỉ lệ.', 12, h - 12);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
