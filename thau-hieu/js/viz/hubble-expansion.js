// Định luật Hubble–Lemaître: một vùng có các thiên hà; mọi khoảng cách nhân lên cùng một hệ số theo thời gian.
// Bấm vào bất kỳ thiên hà nào để đứng ở đó: từ chỗ nào nhìn cũng thấy các thiên hà khác lùi xa với v tỉ lệ thuận với d — không có tâm.
// Bên phải: đồ thị v theo d từ chỗ đang đứng; độ dốc là H (đơn vị minh hoạ), kèm H0 thật để quy đổi (cosmology.js).
import { frame, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { hubbleVelocity } from '../../../shared/js/astro/cosmology.js';

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Các thiên hà cùng lùi xa nhau khi không gian giãn nở; từ thiên hà nào nhìn cũng thấy vận tốc tỉ lệ với khoảng cách');
  const r = rng(21);
  const GAL = Array.from({ length: 110 }, () => [(r() * 2 - 1) * 2.2, (r() * 2 - 1) * 2.2, 0.6 + r() * 0.8]);
  GAL[0] = [0, 0, 1.2];
  let home = 0, t = 0, playing = !opts.reduced, H0 = 70;
  const say = readout(F.panel);
  buttons(F.panel, [{ label: 'Dừng / chạy', value: 'p' }, { label: 'Về đầu', value: 'r' }, { label: 'H₀ = 67,4 (Planck)', value: 67.4 }, { label: 'H₀ = 73,0 (SH0ES)', value: 73.04 }], (v) => {
    if (v === 'p') playing = !playing; else if (v === 'r') t = 0; else { H0 = v; show(); }
    L.kick();
  });

  function show() {
    say(`<span>Bấm vào một thiên hà để đứng ở đó (vòng tròn sáng là “ta”)</span>
      <span>Với H₀ = <b>${fmt(H0, 1)} km/s/Mpc</b>: thiên hà cách 100 Mpc (~326 triệu năm ánh sáng) lùi xa <b>${fmt(hubbleVelocity(100, H0))} km/s</b></span>`);
    L.kick();
  }

  let view;
  canvas.addEventListener('click', (e) => {
    if (!view) return;
    const rc = canvas.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top;
    let best = -1, bd = 1e9;
    GAL.forEach((g, i) => { const [px, py] = view.P(g); const d = Math.hypot(px - x, py - y); if (d < bd) { bd = d; best = i; } });
    if (bd < 30) { home = best; L.kick(); }
  });

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (playing) t = (t + dt * 0.12) % 1.6;
    const a = 1 + t;                                 // hệ số tỉ lệ (minh hoạ)
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 620;
    const pw = narrow ? w - 20 : w * 0.56, ph = narrow ? h * 0.58 : h - 20;
    const cx = 10 + pw / 2, cy = 10 + ph / 2, s = Math.min(pw, ph) / 2 / 2.4;
    const hx = GAL[home][0], hy = GAL[home][1];
    // khung nhìn bám theo thiên hà "nhà" để thấy mọi thứ lùi ra từ đó
    const P = (g, aa = a) => [cx + (g[0] - hx) * aa * s, cy + (g[1] - hy) * aa * s];
    view = { P };
    ctx.save(); ctx.beginPath(); ctx.rect(10, 10, pw, ph); ctx.clip();
    // lưới đồng chuyển động
    ctx.strokeStyle = 'rgba(232,228,218,.06)';
    for (let k = -6; k <= 6; k++) {
      const [ax, ay] = P([k / 3, -2]), [bx, by] = P([k / 3, 2]); ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(bx, by); ctx.stroke();
      const [cx1, cy1] = P([-2, k / 3]), [dx1, dy1] = P([2, k / 3]); ctx.beginPath(); ctx.moveTo(cx1, cy1); ctx.lineTo(dx1, dy1); ctx.stroke();
    }
    GAL.forEach((g, i) => {
      const [x, y] = P(g), [x0, y0] = P(g, 1);
      if (i !== home) { ctx.strokeStyle = 'rgba(159,212,232,.25)'; ctx.beginPath(); ctx.moveTo(x0, y0); ctx.lineTo(x, y); ctx.stroke(); }
      ctx.fillStyle = i === home ? '#fff' : 'rgba(232,228,218,.85)';
      ctx.beginPath(); ctx.ellipse(x, y, 4 * g[2], 2.4 * g[2], i, 0, Math.PI * 2); ctx.fill();
    });
    const [hxp, hyp] = P(GAL[home]);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(hxp, hyp, 10, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    ctx.restore();
    ctx.strokeStyle = 'rgba(236,230,216,.12)'; ctx.strokeRect(10, 10, pw, ph);
    // đồ thị v–d
    const gx0 = narrow ? 44 : w * 0.62 + 30, gx1 = w - 16, gy0 = narrow ? h * 0.66 : 30, gy1 = h - 30;
    ctx.strokeStyle = 'rgba(236,230,216,.2)'; ctx.beginPath(); ctx.moveTo(gx0, gy0); ctx.lineTo(gx0, gy1); ctx.lineTo(gx1, gy1); ctx.stroke();
    const dMax = 2.6 * a;
    const inView = (g) => Math.hypot(g[0] - hx, g[1] - hy) < 2.6;
    GAL.forEach((g, i) => {
      if (i === home || !inView(g)) return;
      const d = Math.hypot(g[0] - hx, g[1] - hy) * a;      // khoảng cách hiện tại
      const v = d / a;                                     // v = (da/dt)·d₀ = (ȧ/a)·d, với ȧ = 1 (đơn vị minh hoạ)
      ctx.fillStyle = 'rgba(232,228,218,.85)'; ctx.beginPath(); ctx.arc(gx0 + (d / dMax) * (gx1 - gx0), gy1 - (v / 2.6) * (gy1 - gy0), 2.5, 0, Math.PI * 2); ctx.fill();
    });
    ctx.strokeStyle = accent; ctx.beginPath(); ctx.moveTo(gx0, gy1); ctx.lineTo(gx1, gy1 - (dMax / a / 2.6) * (gy1 - gy0)); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    ctx.fillText('khoảng cách d →', (gx0 + gx1) / 2, gy1 + 16);
    ctx.save(); ctx.translate(gx0 - 14, (gy0 + gy1) / 2); ctx.rotate(-Math.PI / 2); ctx.fillText('vận tốc lùi xa v', 0, 0); ctx.restore();
    ctx.textAlign = 'left'; ctx.fillStyle = accent; ctx.fillText('v = H·d (đường thẳng)', gx0 + 8, gy0 + 10);
    return playing;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
