// Nhìn xa là nhìn về quá khứ: chọn một thiên thể → ánh sáng đã đi bao lâu (trục log),
// và thời điểm đó nằm đâu trên lịch sử 13,8 tỷ năm của vũ trụ (trục tuyến tính).
import { frame, buttons, readout, loop, FONT, fmt, fmtDuration } from './_kit.js';

const YEAR = 365.25 * 86400;
const AGE = 13.787e9;                       // năm — Planck 2018
const OBJ = [
  { name: 'Mặt Trăng', s: 1.282 },
  { name: 'Mặt Trời', s: 499.0 },
  { name: 'Sao Hải Vương', s: 30.07 * 499.0 },
  { name: 'Proxima Centauri', s: 4.2465 * YEAR },
  { name: 'Tinh vân Orion', s: 1300 * YEAR, approx: true },
  { name: 'Tâm Ngân Hà', s: 26_700 * YEAR, approx: true },
  { name: 'Andromeda', s: 2.5e6 * YEAR, approx: true },
  { name: 'MoM-z14', s: (AGE - 280e6) * YEAR, approx: true, z: '14,44', seen: 280e6 },
  { name: 'Bức xạ nền vi sóng', short: 'Nền vi sóng', s: (AGE - 380e3) * YEAR, approx: true, seen: 380e3 },
];
const TICKS = [[1, '1 giây'], [60, '1 phút'], [3600, '1 giờ'], [86400, '1 ngày'], [YEAR, '1 năm'], [1e3 * YEAR, '1 nghìn năm'], [1e6 * YEAR, '1 triệu năm'], [1e9 * YEAR, '1 tỷ năm']];

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Thời gian ánh sáng đi từ các thiên thể tới ta, trên thang log và trên lịch sử vũ trụ');
  let sel = OBJ[6], t0 = performance.now();
  const say = readout(F.panel);
  const box = buttons(F.panel, OBJ.map((o) => ({ label: o.short || o.name, value: o })), (o) => { sel = o; t0 = performance.now(); show(); });
  box.children[6]?.setAttribute('aria-pressed', 'true');

  function show() {
    const yrs = sel.s / YEAR;
    const when = sel.seen ? `lúc vũ trụ mới khoảng <b>${sel.seen >= 1e6 ? fmt(sel.seen / 1e6) + ' triệu' : fmt(sel.seen / 1e3) + ' nghìn'} năm tuổi</b>${sel.z ? ` (dịch chuyển đỏ z = ${sel.z})` : ''}` : `như cách đây <b>${fmtDuration(sel.s)}</b>`;
    say(`<span>Ánh sáng từ <b>${sel.name}</b> đã đi ${sel.approx ? 'khoảng ' : ''}<b>${fmtDuration(sel.s)}</b></span><span>Ta đang thấy nó ${when}</span>${yrs > 1e8 ? '<span>Lưu ý: đây là thời gian ánh sáng đi, không phải khoảng cách hiện nay — vũ trụ đã giãn nở trong lúc đó.</span>' : ''}`);
    L?.kick();
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const lo = -0.4, hi = Math.log10(AGE * YEAR) + 0.15;
    const x0 = 70, x1 = w - 22, ay = h * 0.36;
    const X = (s) => x0 + ((Math.log10(s) - lo) / (hi - lo)) * (x1 - x0);
    // trục log thời gian ánh sáng
    ctx.strokeStyle = 'rgba(236,230,216,.25)';
    ctx.beginPath(); ctx.moveTo(x0, ay); ctx.lineTo(x1, ay); ctx.stroke();
    ctx.font = FONT(10); ctx.textAlign = 'center';
    TICKS.forEach(([s, l], i) => {
      const x = X(s);
      ctx.strokeStyle = 'rgba(236,230,216,.3)'; ctx.beginPath(); ctx.moveTo(x, ay - 4); ctx.lineTo(x, ay + 4); ctx.stroke();
      if (w > 600 || i % 2 === 0) { ctx.fillStyle = 'rgba(236,230,216,.42)'; ctx.fillText(l, x, ay + 18); }
    });
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.textAlign = 'left'; ctx.font = FONT(10.5);
    ctx.fillText('Ánh sáng đã đi bao lâu (thang log)', x0, 22);
    // mắt người xem
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = 'center';
    ctx.fillText('Bạn', 30, ay - 14);
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(10); ctx.fillText('bây giờ', 30, ay + 18);
    // các thiên thể
    OBJ.forEach((o, i) => {
      const x = X(o.s), on = o === sel;
      ctx.fillStyle = on ? accent : 'rgba(236,230,216,.75)';
      ctx.beginPath(); ctx.arc(x, ay, on ? 5 : 3, 0, Math.PI * 2); ctx.fill();
      if (on || w > 760) {
        ctx.font = FONT(on ? 11.5 : 10, on ? 600 : 400); ctx.fillStyle = on ? '#ece6d8' : 'rgba(236,230,216,.55)';
        ctx.textAlign = x > w - 70 ? 'right' : 'center';
        ctx.fillText(o.short || o.name, x, ay - 14 - (on ? 0 : (i % 2) * 13));
      }
    });
    // photon chạy về phía bạn (trên thang log)
    const k = opts.reduced ? 1 : Math.max(0, Math.min(1, (now - t0) / 1800));
    const e = 1 - Math.pow(1 - k, 3);
    const xs = X(sel.s), xe = 44;
    const xp = xs + (xe - xs) * e;
    const g = ctx.createLinearGradient(xs, 0, xp, 0);
    g.addColorStop(0, 'rgba(159,212,232,0)'); g.addColorStop(1, accent);
    ctx.strokeStyle = g; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(xs, ay); ctx.lineTo(xp, ay); ctx.stroke(); ctx.lineWidth = 1;
    const gp = ctx.createRadialGradient(xp, ay, 0, xp, ay, 9);
    gp.addColorStop(0, '#fff'); gp.addColorStop(1, 'rgba(159,212,232,0)');
    ctx.fillStyle = gp; ctx.beginPath(); ctx.arc(xp, ay, 9, 0, Math.PI * 2); ctx.fill();

    // lịch sử vũ trụ (tuyến tính)
    const by = h * 0.76, bx0 = 30, bx1 = w - 30;
    const BX = (age) => bx0 + (age / AGE) * (bx1 - bx0);
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.textAlign = 'left'; ctx.font = FONT(10.5);
    ctx.fillText('Lịch sử vũ trụ, 13,8 tỷ năm (thang tuyến tính)', bx0, by + 44);
    const gb = ctx.createLinearGradient(bx0, 0, bx1, 0);
    gb.addColorStop(0, 'rgba(255,214,150,.55)'); gb.addColorStop(0.08, 'rgba(159,212,232,.25)'); gb.addColorStop(1, 'rgba(159,212,232,.12)');
    ctx.fillStyle = gb; ctx.beginPath(); ctx.roundRect(bx0, by - 6, bx1 - bx0, 12, 6); ctx.fill();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)';
    ctx.textAlign = 'left'; ctx.fillText('Big Bang', bx0, by + 24);
    ctx.textAlign = 'right'; ctx.fillText('bây giờ', bx1, by + 24);
    ctx.textAlign = 'center';
    const sunX = BX(AGE - 4.6e9);
    ctx.fillText('Mặt Trời hình thành', sunX, by + 24);
    ctx.strokeStyle = 'rgba(236,230,216,.3)'; ctx.beginPath(); ctx.moveTo(sunX, by + 8); ctx.lineTo(sunX, by + 13); ctx.stroke();
    const emit = AGE - sel.s / YEAR;
    const ex = BX(emit);
    ctx.fillStyle = accent; ctx.beginPath(); ctx.moveTo(ex, by - 9); ctx.lineTo(ex - 6, by - 19); ctx.lineTo(ex + 6, by - 19); ctx.closePath(); ctx.fill();
    ctx.font = FONT(11, 600); ctx.textAlign = ex < 110 ? 'left' : ex > w - 110 ? 'right' : 'center';
    ctx.fillText(sel.s / YEAR < 1e7 ? 'ánh sáng rời đi: gần như "vừa xong"' : 'ánh sáng rời đi lúc này', ex < 110 ? ex - 6 : ex > w - 110 ? ex + 6 : ex, by - 24);
    if (sel.s / YEAR > 1e7) {
      ctx.strokeStyle = 'rgba(159,212,232,.35)'; ctx.setLineDash([3, 4]);
      ctx.beginPath(); ctx.moveTo(ex, by); ctx.lineTo(bx1, by); ctx.stroke(); ctx.setLineDash([]);
    }
    return k < 1;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
