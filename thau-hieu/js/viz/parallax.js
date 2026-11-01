// Thị sai năm: Trái Đất đi vòng quanh Mặt Trời → ngôi sao gần như "lắc qua lắc lại" trên nền sao xa.
// Bên trái: nhìn từ trên xuống (góc bị phóng đại rất nhiều). Bên phải: thị trường kính thiên văn,
// biên độ dịch chuyển tỉ lệ đúng với p, kèm hệ số phóng đại hiển thị rõ.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { pcToParallax, pcToLy } from '../../../shared/js/astro/physics.js';

const ARCSEC = Math.PI / (180 * 3600);

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

export function mount(host, opts = {}) {
  const F = frame(host, { note: 'Hình bên trái: góc bị phóng đại để dễ thấy' });
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Mô phỏng thị sai: Trái Đất quay quanh Mặt Trời và ngôi sao gần dịch chuyển trên nền sao xa');
  let dPc = opts.start || 1.30197;
  const r = rng(7);
  const bg = Array.from({ length: 46 }, () => ({ x: r() * 2 - 1, y: r() * 2 - 1, s: 0.4 + r() * 1.1, a: 0.25 + r() * 0.5 }));

  const say = readout(F.panel);
  const s = slider(F.panel, {
    label: 'Khoảng cách tới ngôi sao', min: 1, max: 10_000, log: true, value: dPc,
    format: (v) => `${fmt(v, v < 10 ? 2 : 0)} pc · ${fmt(pcToLy(v), v < 10 ? 1 : 0)} năm ánh sáng`,
    onInput: (v) => { dPc = v; show(); },
  });
  buttons(F.panel, [
    { label: 'Proxima Centauri', value: 1.30197 },
    { label: '61 Cygni', value: 1 / 0.28615 },
    { label: 'Tinh vân Orion', value: 400 },
    { label: 'Tâm Ngân Hà', value: 8180 },
  ], (v) => s.set(v));

  function zoomFor(p) { return Math.pow(10, Math.max(0, Math.floor(-Math.log10(p)))); }

  function show() {
    const p = pcToParallax(dPc);                       // giây cung
    const pTxt = p >= 0.1 ? `${fmt(p, 3)}″` : `${fmt(p * 1000, p * 1000 < 1 ? 3 : 2)} mas`;
    const coinKm = 0.01 / (p * ARCSEC) / 1000;         // khoảng cách đặt đồng xu 1 cm để chắn cùng góc
    const gaia = (0.025e-3 / p) * 100, hip = (1e-3 / p) * 100;
    const pct = (x) => (x < 0.01 ? '< 0,01 %' : x > 100 ? 'không đo được' : `~${fmt(x, x < 1 ? 2 : 0)} %`);
    say(`<span>Góc thị sai <b>p = ${pTxt}</b></span>
      <span>d = 1/p = <b>${fmt(dPc, dPc < 10 ? 3 : 0)} pc</b></span>
      <span>Bằng góc nhìn đồng xu 1 cm đặt cách <b>${fmt(coinKm, coinKm < 100 ? 1 : 0)} km</b></span>
      <span>Sai số khoảng cách: Hipparcos <b>${pct(hip)}</b> · Gaia (sao sáng) <b>${pct(gaia)}</b></span>`);
    L?.kick();
  }

  let theta = 0;
  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) theta += dt * (Math.PI * 2 / 7);   // 1 năm ≈ 7 giây
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 560;
    const p = pcToParallax(dPc);

    /* —— Nhìn từ trên xuống —— */
    const A = narrow ? { x: 0, y: 0, w, h: h * 0.52 } : { x: 0, y: 0, w: w * 0.56, h };
    const cx = A.x + A.w / 2, R = Math.min(A.w * 0.2, A.h * 0.16);
    const sunY = A.y + A.h - R - 26;
    // khoảng cách hiển thị: log (phóng đại rất nhiều)
    const top = A.y + 70, k = Math.log10(dPc) / 4;
    const starY = sunY - R - 30 - Math.max(0, sunY - R - 30 - top) * (0.15 + 0.85 * k);
    ctx.strokeStyle = 'rgba(236,230,216,.18)';
    ctx.beginPath(); ctx.ellipse(cx, sunY, R, R, 0, 0, Math.PI * 2); ctx.stroke();
    // Mặt Trời
    const gs = ctx.createRadialGradient(cx, sunY, 0, cx, sunY, 16);
    gs.addColorStop(0, '#fff3c4'); gs.addColorStop(0.4, 'rgba(255,214,120,.8)'); gs.addColorStop(1, 'rgba(255,200,90,0)');
    ctx.fillStyle = gs; ctx.beginPath(); ctx.arc(cx, sunY, 16, 0, Math.PI * 2); ctx.fill();
    // Trái Đất
    const ex = cx + R * Math.cos(theta), ey = sunY + R * Math.sin(theta) * 0.999;
    // nền sao xa (dải trên cùng)
    ctx.fillStyle = 'rgba(236,230,216,.06)';
    ctx.fillRect(A.x + 10, A.y + 30, A.w - 20, 16);
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    ctx.fillText('nền sao rất xa', cx, A.y + 42);
    // tia nhìn: Trái Đất → sao → nền
    const proj = (x0, y0) => { const t = (A.y + 46 - y0) / (starY - y0); return x0 + (cx - x0) * t; };
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(159,212,232,.35)';
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(proj(ex, ey), A.y + 46); ctx.stroke();
    ctx.setLineDash([]);
    ctx.strokeStyle = 'rgba(159,212,232,.8)';
    ctx.beginPath(); ctx.moveTo(ex, ey); ctx.lineTo(cx, starY); ctx.stroke();
    // đường đáy 1 au và góc p
    ctx.strokeStyle = 'rgba(236,230,216,.3)';
    ctx.beginPath(); ctx.moveTo(cx, sunY); ctx.lineTo(cx, starY); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(cx, sunY); ctx.lineTo(ex, ey); ctx.stroke();
    const a0 = Math.PI / 2, a1 = Math.atan2(ey - starY, ex - cx);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.arc(cx, starY, 26, Math.min(a0, a1), Math.max(a0, a1)); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = accent; ctx.font = FONT(12, 600);
    ctx.textAlign = ex > cx ? 'left' : 'right';
    ctx.fillText('p', cx + (ex > cx ? 30 : -30), starY + 30);
    ctx.fillStyle = '#9ec7ff'; ctx.beginPath(); ctx.arc(ex, ey, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.font = FONT(11); ctx.textAlign = ex > cx ? 'left' : 'right';
    ctx.fillText('Trái Đất', ex + (ex > cx ? 10 : -10), ey + 4);
    ctx.textAlign = 'center';
    ctx.fillText('1 au', (cx + ex) / 2, (sunY + ey) / 2 + 16);
    // ngôi sao
    const gl = ctx.createRadialGradient(cx, starY, 0, cx, starY, 14);
    gl.addColorStop(0, '#ffffff'); gl.addColorStop(0.35, 'rgba(159,212,232,.9)'); gl.addColorStop(1, 'rgba(159,212,232,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(cx, starY, 14, 0, Math.PI * 2); ctx.fill();

    /* —— Thị trường kính thiên văn —— */
    const B = narrow ? { x: 0, y: h * 0.52, w, h: h * 0.48 } : { x: w * 0.56, y: 0, w: w * 0.44, h };
    const rr = Math.min(B.w, B.h) * 0.36, bx = B.x + B.w / 2, by = B.y + B.h / 2 + 6;
    ctx.save();
    ctx.beginPath(); ctx.arc(bx, by, rr, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#04050a'; ctx.fillRect(bx - rr, by - rr, rr * 2, rr * 2);
    bg.forEach((b) => { ctx.fillStyle = `rgba(236,230,216,${b.a})`; ctx.beginPath(); ctx.arc(bx + b.x * rr, by + b.y * rr, b.s, 0, Math.PI * 2); ctx.fill(); });
    const zoom = zoomFor(p);
    const amp = Math.min(1, p * zoom) * rr * 0.62;
    // hai vị trí cực (cách nhau nửa năm) = 2p
    ctx.strokeStyle = 'rgba(159,212,232,.35)';
    [-1, 1].forEach((sgn) => { ctx.beginPath(); ctx.moveTo(bx + sgn * amp, by - 10); ctx.lineTo(bx + sgn * amp, by + 10); ctx.stroke(); });
    ctx.beginPath(); ctx.moveTo(bx - amp, by + 16); ctx.lineTo(bx + amp, by + 16); ctx.stroke();
    ctx.fillStyle = 'rgba(159,212,232,.75)'; ctx.font = FONT(11); ctx.textAlign = 'center';
    ctx.fillText('2p', bx, by + 30);
    const sx = bx - Math.cos(theta) * amp;
    const g2 = ctx.createRadialGradient(sx, by, 0, sx, by, 11);
    g2.addColorStop(0, '#fff'); g2.addColorStop(0.4, 'rgba(159,212,232,.9)'); g2.addColorStop(1, 'rgba(159,212,232,0)');
    ctx.fillStyle = g2; ctx.beginPath(); ctx.arc(sx, by, 11, 0, Math.PI * 2); ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(236,230,216,.25)';
    ctx.beginPath(); ctx.arc(bx, by, rr, 0, Math.PI * 2); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(11); ctx.textAlign = 'center';
    ctx.fillText('Qua kính thiên văn', bx, by - rr - 12);
    ctx.fillStyle = zoom > 1 ? accent : 'rgba(236,230,216,.45)';
    const fov = 2 / 0.62 / zoom;
    ctx.fillText(`khung nhìn rộng ≈ ${fov >= 0.1 ? fmt(fov, 2) + '″' : fmt(fov * 1000, fov * 1000 < 1 ? 2 : 1) + ' mas'}${zoom > 1 ? ` · phóng to ×${fmt(zoom)}` : ''}`, bx, by + rr + 20);
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
