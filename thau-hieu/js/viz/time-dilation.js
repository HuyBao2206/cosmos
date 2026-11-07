// Giãn nở thời gian: hai đồng hồ — một ở Trái Đất, một trên tàu vũ trụ chuyển động với vận tốc v.
// Nhìn từ Trái Đất, đồng hồ trên tàu chạy chậm đi γ = 1/√(1 − v²/c²) lần. Kèm "đồng hồ ánh sáng":
// một xung sáng nảy giữa hai gương; trên tàu đang chạy, đường đi chéo dài hơn nên mỗi nhịp mất nhiều thời gian hơn.
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { lorentzGamma, C } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Đồng hồ trên tàu vũ trụ chạy chậm lại khi tàu đi nhanh gần tốc độ ánh sáng');
  let beta = 0.8, tEarth = 0, tShip = 0, x = 0;
  const say = readout(F.panel);
  const sB = slider(F.panel, {
    label: 'Vận tốc tàu (phần tốc độ ánh sáng)', min: 0, max: 0.9999, step: 0.0001, value: beta,
    format: (v) => `${fmt(v * 100, v > 0.99 ? 2 : 1)} % c`, onInput: (v) => { beta = v; show(); },
  });
  buttons(F.panel, [
    { label: 'ISS (7,66 km/s)', value: 7660 / C }, { label: 'Parker Solar Probe (~192 km/s)', value: 192e3 / C }, { label: '50 % c', value: 0.5 },
    { label: '86,6 % c (γ = 2)', value: Math.sqrt(3) / 2 }, { label: '99,5 % c (muon)', value: 0.995 }, { label: 'Đặt lại đồng hồ', value: 'reset' },
  ], (v) => { if (v === 'reset') { tEarth = tShip = 0; L.kick(); return; } sB.set(v); });

  function show() {
    const g = lorentzGamma(beta);
    const lag = (1 - 1 / g);
    const perDay = lag * 86400;
    say(`<span>Hệ số Lorentz γ = <b>${g < 1.0001 ? '1 + ' + sci(g - 1, 2) : fmt(g, g < 10 ? 3 : 1)}</b></span>
      <span>Khi trên Trái Đất trôi qua 1 năm, trên tàu trôi qua <b>${g < 1.001 ? '1 năm trừ ' + (perDay * 365.25 < 1 ? fmt(perDay * 365.25 * 1000, 2) + ' ms' : fmt(perDay * 365.25, 2) + ' s') : fmt(365.25 / g, 1) + ' ngày'}</b></span>
      ${g < 1.001 ? `<span>Chậm đi khoảng <b>${perDay < 1e-3 ? fmt(perDay * 1e6, 2) + ' μs' : fmt(perDay * 1000, 2) + ' ms'}</b> mỗi ngày</span>` : ''}`);
    L.kick();
  }

  function clock(cx, cy, r, t, label, sub) {
    ctx.strokeStyle = 'rgba(236,230,216,.45)'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    for (let i = 0; i < 12; i++) { const a = (i / 12) * Math.PI * 2; ctx.beginPath(); ctx.moveTo(cx + Math.sin(a) * r * 0.85, cy - Math.cos(a) * r * 0.85); ctx.lineTo(cx + Math.sin(a) * r, cy - Math.cos(a) * r); ctx.stroke(); }
    const a = (t / 12) * Math.PI * 2;   // một vòng = 12 "giây hoạt ảnh"
    ctx.strokeStyle = accent; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(cx + Math.sin(a) * r * 0.78, cy - Math.cos(a) * r * 0.78); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11.5, 600); ctx.textAlign = 'center'; ctx.fillText(label, cx, cy + r + 18);
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5); ctx.fillText(sub, cx, cy + r + 33);
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    const g = lorentzGamma(beta);
    if (!opts.reduced) { tEarth += dt; tShip += dt / g; x = (x + dt * beta * 0.25) % 1; }
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 560;
    const r = Math.min(54, h * 0.16);
    clock(narrow ? w * 0.27 : w * 0.16, r + 26, r, tEarth, 'Đồng hồ Trái Đất', `${fmt(tEarth, 1)} s`);
    clock(narrow ? w * 0.73 : w * 0.38, r + 26, r, tShip, 'Đồng hồ trên tàu', `${fmt(tShip, 1)} s`);

    // đồng hồ ánh sáng: nhìn từ Trái Đất
    const by = narrow ? r * 2 + 90 : 40, bh = narrow ? h - by - 30 : h - 80;
    const bx0 = narrow ? 16 : w * 0.52, bx1 = w - 16;
    const L0 = Math.min(bh * 0.7, 160);                 // khoảng cách hai gương (px)
    const mTop = by + (bh - L0) / 2, mBot = mTop + L0;
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText('Đồng hồ ánh sáng trên tàu, nhìn từ Trái Đất', bx0, by + 4);
    // trong hệ Trái Đất: ánh sáng đi chéo, quãng đường mỗi lượt = L0·γ
    const span = bx1 - bx0 - 40;
    const shipX = bx0 + 20 + x * span;
    // đường đi của tia sáng (zigzag) — mỗi lượt đi ngang β·γ·L0
    const step = beta * g * L0;
    ctx.strokeStyle = 'rgba(255,240,200,.5)'; ctx.beginPath();
    let px = shipX, py = mBot, up = true, n = 0;
    ctx.moveTo(px, py);
    while (px > bx0 + 4 && n < 60 && step > 0.5) { px -= step; py = up ? mTop : mBot; up = !up; ctx.lineTo(Math.max(px, bx0 + 4), py); n++; }
    ctx.stroke();
    // gương & tàu
    ctx.fillStyle = '#9fd4e8';
    ctx.fillRect(shipX - 22, mTop - 4, 44, 3); ctx.fillRect(shipX - 22, mBot + 1, 44, 3);
    ctx.strokeStyle = 'rgba(159,212,232,.25)'; ctx.strokeRect(shipX - 28, mTop - 10, 56, L0 + 20);
    // xung sáng hiện tại
    const phase = (tShip * 2) % 2;        // một lượt mỗi 0,5 s thời gian riêng
    const yy = phase < 1 ? mBot - phase * L0 : mTop + (phase - 1) * L0;
    const glow = ctx.createRadialGradient(shipX, yy, 0, shipX, yy, 9);
    glow.addColorStop(0, '#fff'); glow.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(shipX, yy, 9, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10);
    ctx.fillText(beta > 0.05 ? `tia sáng đi chéo dài gấp γ = ${fmt(g, 2)} lần` : 'tàu gần như đứng yên: tia đi thẳng', bx0, mBot + 30);
    ctx.fillText('→ chiều chuyển động', bx1 - 120, mBot + 30);
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
