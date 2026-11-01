// Định luật nghịch đảo bình phương + ngọn nến chuẩn: cùng một lượng ánh sáng trải trên diện tích tăng theo d²,
// nên xa gấp đôi thì mờ đi 4 lần. Biết độ sáng thật của SN Ia (M ≈ −19,3), đo độ sáng biểu kiến ⇒ suy ra d.
// Bỏ qua bụi và các hiệu ứng vũ trụ học (dịch chuyển đỏ, giãn nở) — cần thiết khi d vượt vài trăm Mpc.
import { frame, slider, readout, loop, FONT, fmt } from './_kit.js';
import { apparentMag, pcToLy } from '../../../shared/js/astro/physics.js';

const M_SN = -19.3;

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Ánh sáng trải ra trên diện tích tăng theo bình phương khoảng cách; độ sáng biểu kiến của siêu tân tinh Ia theo khoảng cách');
  let dMpc = 20;
  const say = readout(F.panel);
  slider(F.panel, {
    label: 'Khoảng cách tới siêu tân tinh Ia', min: 1, max: 1000, log: true, value: dMpc,
    format: (v) => `${fmt(v, v < 10 ? 1 : 0)} Mpc · ${fmt(pcToLy(v * 1e6) / 1e6, 0)} triệu năm ánh sáng`,
    onInput: (v) => { dMpc = v; show(); },
  });

  const mOf = (d) => apparentMag(M_SN, d * 1e6);
  function show() {
    const m = mOf(dMpc);
    const warn = dMpc > 200 ? '<span style="color:var(--c)">Ở khoảng cách này phải tính thêm giãn nở vũ trụ — con số chỉ là xấp xỉ.</span>' : '';
    say(`<span>Cấp sao biểu kiến lúc cực đại <b>m ≈ ${fmt(m, 1)}</b></span>
      <span>Mờ hơn ngưỡng mắt thường (m ≈ 6) khoảng <b>${m > 6 ? fmt(Math.pow(10, (m - 6) / 2.5), 0) : '—'}</b> lần</span>
      ${dMpc > 200 ? '' : `<span>Ánh sáng đã đi <b>${fmt(pcToLy(dMpc * 1e6) / 1e6, 0)} triệu năm</b></span>`}${warn}`);
    L?.kick();
  }

  // hạt ánh sáng
  const N = 90;
  const ph = Array.from({ length: N }, (_, i) => ({ t: i / N, u: Math.random() * 2 - 1, v: Math.random() * 2 - 1 }));

  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 620;
    const A = narrow ? { x: 0, y: 0, w, h: h * 0.55 } : { x: 0, y: 0, w: w * 0.58, h };
    const B = narrow ? { x: 0, y: h * 0.55, w, h: h * 0.45 } : { x: w * 0.58, y: 0, w: w * 0.42, h };

    /* —— hình nón ánh sáng —— */
    const ox = A.x + 30, oy = A.y + A.h * 0.42;
    const unit = (A.w - 70) / 3.2;
    const half = (k) => Math.min(A.h * 0.105, unit * 0.32) * k;   // nửa cạnh khung ở khoảng cách k
    const skew = 0.42;                                          // phối cảnh: cạnh đứng co lại
    const quad = (k) => {
      const x = ox + unit * k, s = half(k);
      return [[x - s * skew, oy - s], [x + s * skew, oy - s * 0.55], [x + s * skew, oy + s], [x - s * skew, oy + s * 0.45]];
    };
    // tia biên
    ctx.strokeStyle = 'rgba(159,212,232,.16)';
    quad(3).forEach(([x, y]) => { ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(x, y); ctx.stroke(); });
    [1, 2, 3].forEach((k) => {
      const q = quad(k);
      ctx.fillStyle = `rgba(159,212,232,${0.16 / (k * k) + 0.02})`;
      ctx.beginPath(); q.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.closePath(); ctx.fill();
      ctx.strokeStyle = 'rgba(159,212,232,.55)'; ctx.stroke();
      // lưới k × k
      ctx.strokeStyle = 'rgba(159,212,232,.25)';
      for (let i = 1; i < k; i++) {
        const t = i / k;
        const l = (a, b) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
        let p1 = l(q[0], q[1]), p2 = l(q[3], q[2]);
        ctx.beginPath(); ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.stroke();
        p1 = l(q[0], q[3]); p2 = l(q[1], q[2]);
        ctx.beginPath(); ctx.moveTo(...p1); ctx.lineTo(...p2); ctx.stroke();
      }
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(12, 600); ctx.textAlign = 'center';
      ctx.fillText(`${k}d`, ox + unit * k, oy + half(k) + 22);
      ctx.font = FONT(11); ctx.fillStyle = 'rgba(236,230,216,.62)';
      ctx.fillText(k === 1 ? 'độ sáng 1' : `độ sáng 1/${k * k}`, ox + unit * k, oy + half(k) + 38);
    });
    // hạt
    if (!opts.reduced) ph.forEach((p) => { p.t += dt * 0.22; if (p.t > 1) { p.t -= 1; p.u = Math.random() * 2 - 1; p.v = Math.random() * 2 - 1; } });
    ctx.fillStyle = 'rgba(255,248,220,.85)';
    ph.forEach((p) => {
      const k = p.t * 3.15, s = half(k);
      const x = ox + unit * k + p.u * s * skew, y = oy + p.v * s * 0.8 - p.u * s * 0.2;
      ctx.globalAlpha = Math.max(0, 1 - p.t * 0.6);
      ctx.beginPath(); ctx.arc(x, y, 1.3, 0, Math.PI * 2); ctx.fill();
    });
    ctx.globalAlpha = 1;
    const gl = ctx.createRadialGradient(ox, oy, 0, ox, oy, 16);
    gl.addColorStop(0, '#fff'); gl.addColorStop(0.4, 'rgba(255,240,200,.8)'); gl.addColorStop(1, 'rgba(255,240,200,0)');
    ctx.fillStyle = gl; ctx.beginPath(); ctx.arc(ox, oy, 16, 0, Math.PI * 2); ctx.fill();

    /* —— ngọn nến chuẩn trên thang cấp sao —— */
    const m = mOf(dMpc);
    const bx0 = B.x + 24, bx1 = B.x + B.w - 24, by = B.y + B.h * (narrow ? 0.62 : 0.66);
    const lo = -2, hi = 32;
    const MXp = (mm) => bx0 + ((mm - lo) / (hi - lo)) * (bx1 - bx0);
    // thiên hà chủ
    const gx = B.x + B.w / 2, gy = B.y + B.h * (narrow ? 0.28 : 0.33);
    const gs = Math.min(B.w * 0.3, B.h * 0.16) * Math.max(0.25, Math.min(1, 1.2 - Math.log10(dMpc) * 0.3));
    const gg = ctx.createRadialGradient(gx, gy, 0, gx, gy, gs);
    gg.addColorStop(0, 'rgba(236,230,216,.32)'); gg.addColorStop(1, 'rgba(236,230,216,0)');
    ctx.save(); ctx.translate(gx, gy); ctx.scale(1, 0.45); ctx.translate(-gx, -gy);
    ctx.fillStyle = gg; ctx.beginPath(); ctx.arc(gx, gy, gs, 0, Math.PI * 2); ctx.fill(); ctx.restore();
    const vis = Math.max(0.12, Math.min(1, (26 - m) / 22));
    const snx = gx + gs * 0.35, sny = gy - gs * 0.08, sr = 3 + vis * 12;
    const gsn = ctx.createRadialGradient(snx, sny, 0, snx, sny, sr * 2);
    gsn.addColorStop(0, `rgba(255,255,255,${vis})`); gsn.addColorStop(0.3, `rgba(159,212,232,${vis * 0.8})`); gsn.addColorStop(1, 'rgba(159,212,232,0)');
    ctx.fillStyle = gsn; ctx.beginPath(); ctx.arc(snx, sny, sr * 2, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(11); ctx.textAlign = 'center';
    ctx.fillText('Siêu tân tinh Ia trong thiên hà chủ', gx, B.y + 22);
    // thang
    ctx.strokeStyle = 'rgba(236,230,216,.25)';
    ctx.beginPath(); ctx.moveTo(bx0, by); ctx.lineTo(bx1, by); ctx.stroke();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.45)';
    for (let mm = 0; mm <= 30; mm += 5) { const x = MXp(mm); ctx.beginPath(); ctx.moveTo(x, by - 4); ctx.lineTo(x, by + 4); ctx.stroke(); ctx.fillText(String(mm), x, by + 18); }
    ctx.fillText('cấp sao biểu kiến m (số lớn hơn = mờ hơn) →', (bx0 + bx1) / 2, by + 34);
    const x6 = MXp(6);
    ctx.fillStyle = 'rgba(236,230,216,.1)'; ctx.fillRect(bx0, by - 22, x6 - bx0, 18);
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.textAlign = 'left'; ctx.fillText('mắt thường', bx0 + 4, by - 9);
    const xm = MXp(Math.min(hi, m));
    ctx.fillStyle = accent; ctx.beginPath(); ctx.moveTo(xm, by - 6); ctx.lineTo(xm - 6, by - 16); ctx.lineTo(xm + 6, by - 16); ctx.closePath(); ctx.fill();
    ctx.font = FONT(12, 600); ctx.textAlign = 'center'; ctx.fillText(`m ≈ ${fmt(m, 1)}`, Math.min(bx1 - 20, Math.max(bx0 + 20, xm)), by - 24);
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
