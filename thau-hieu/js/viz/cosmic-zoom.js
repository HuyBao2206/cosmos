// Phóng to dần từ Ngân Hà ra Laniakea: mỗi bậc thang trọng lực gom vật chất ở một kích thước.
// Kích thước (làm tròn, xem research/thien-ha-cau-truc-lon.md): đĩa Ngân Hà ~100 000 năm ánh sáng; Andromeda cách ~2,5 triệu;
// Nhóm Địa phương ~10 triệu; Đám Virgo cách ~54 triệu; Laniakea ~520 triệu năm ánh sáng. Vị trí các chấm là minh hoạ.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
const gauss = (r) => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };

// đối tượng: [x, y] (triệu năm ánh sáng, Ngân Hà ở gốc), bán kính (triệu nas), nhãn, màu
const r = rng(5);
const OBJ = [];
OBJ.push({ x: 0, y: 0, R: 0.05, name: 'Ngân Hà', col: '#ffe0b0', big: true });
OBJ.push({ x: 2.2, y: -1.2, R: 0.06, name: 'Andromeda', col: '#ffd7a8', big: true });
OBJ.push({ x: 2.6, y: -0.6, R: 0.02, name: 'M33', col: '#cfe0ff' });
for (let i = 0; i < 60; i++) OBJ.push({ x: 1.1 + gauss(r) * 1.6, y: -0.6 + gauss(r) * 1.3, R: 0.004, col: '#bfc8d8' });   // thiên hà lùn
// Đám Virgo ~54 triệu nas
const VX = 40, VY = 36;
OBJ.push({ x: VX, y: VY, R: 4, name: 'Đám Virgo', col: '#ffe9c4', label: true });
for (let i = 0; i < 400; i++) OBJ.push({ x: VX + gauss(r) * 2.6, y: VY + gauss(r) * 2.6, R: 0.06, col: '#f3e2c8' });
// các nhóm, đám khác trong Laniakea (minh hoạ, dọc các sợi hướng về vùng hút lớn)
const GA = [-150, 90];
for (let i = 0; i < 1800; i++) {
  const t = r(), s = Math.floor(r() * 5);
  const ends = [[0, 0], [VX, VY], [-60, -120], [120, 60], [-210, 10], [40, 200]];
  const a = ends[s + 1] || ends[0], b = GA;
  const x = a[0] + (b[0] - a[0]) * t + gauss(r) * 14, y = a[1] + (b[1] - a[1]) * t + gauss(r) * 14;
  OBJ.push({ x, y, R: 0.5, col: '#a6e8b8' });
}
OBJ.push({ x: GA[0], y: GA[1], R: 12, name: 'Vùng hút lớn (Great Attractor)', col: '#c6f0d0', label: true });

const LEVELS = [
  { s: 0.25, name: 'Ngân Hà', txt: 'Ngân Hà: đĩa rộng khoảng 100 000 năm ánh sáng, hàng trăm tỷ ngôi sao.' },
  { s: 6, name: 'Nhóm Địa phương', txt: 'Nhóm Địa phương: Ngân Hà, Andromeda (cách ~2,5 triệu năm ánh sáng), M33 và hơn một trăm thiên hà lùn, trải trong khoảng 10 triệu năm ánh sáng.' },
  { s: 110, name: 'Đám Virgo', txt: 'Đám Virgo: khoảng 2 000 thiên hà, cách ta khoảng 54 triệu năm ánh sáng — đám thiên hà lớn gần nhất.' },
  { s: 560, name: 'Laniakea', txt: 'Siêu đám Laniakea (Tully và cộng sự 2014): khoảng 520 triệu năm ánh sáng, chừng 100 000 thiên hà, mọi dòng chuyển động đều hướng về Vùng hút lớn.' },
];

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Phóng to từ Ngân Hà ra Nhóm Địa phương, Đám Virgo và siêu đám Laniakea');
  let span = 0.25, target = 0.25;          // bề rộng khung nhìn (triệu năm ánh sáng)
  const say = readout(F.panel);
  const sS = slider(F.panel, { label: 'Bề rộng khung nhìn', min: 0.2, max: 700, log: true, value: span, format: (v) => (v < 1 ? `${fmt(v * 1000)} nghìn năm ánh sáng` : `${fmt(v, v < 10 ? 1 : 0)} triệu năm ánh sáng`), onInput: (v) => { target = v; show(); } });
  buttons(F.panel, LEVELS.map((l) => ({ label: l.name, value: l.s })), (v) => sS.set(v));

  function show() {
    const lv = LEVELS.reduce((a, l) => (Math.abs(Math.log(l.s / target)) < Math.abs(Math.log(a.s / target)) ? l : a));
    say(`<span>${lv.txt}</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    span = opts.reduced ? target : Math.exp(Math.log(span) + (Math.log(target) - Math.log(span)) * Math.min(1, dt * 4));
    ctx.clearRect(0, 0, w, h);
    // tâm khung: dịch dần từ Ngân Hà sang giữa Laniakea khi phóng to
    const k = Math.min(1, Math.max(0, Math.log(span / 20) / Math.log(600 / 20)));
    const cxw = -70 * k, cyw = 40 * k;
    const px = Math.min(w, h) / span;
    const X = (x) => w / 2 + (x - cxw) * px, Y = (y) => h / 2 - (y - cyw) * px;
    ctx.globalCompositeOperation = 'lighter';
    for (const o of OBJ) {
      const x = X(o.x), y = Y(o.y);
      if (x < -50 || x > w + 50 || y < -50 || y > h + 50) continue;
      const rr = Math.max(o.big ? 2.2 : 0.9, o.R * px);
      if (rr > 6) {
        const g = ctx.createRadialGradient(x, y, 0, x, y, rr);
        g.addColorStop(0, o.col); g.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.globalAlpha = o.label ? 0.25 : 0.9; ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, rr, 0, Math.PI * 2); ctx.fill(); ctx.globalAlpha = 1;
      } else { ctx.fillStyle = o.col; ctx.globalAlpha = 0.7; ctx.fillRect(x - rr / 2, y - rr / 2, rr, rr); ctx.globalAlpha = 1; }
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.font = FONT(11, 600); ctx.textAlign = 'left'; ctx.fillStyle = '#ece6d8';
    for (const o of OBJ) if (o.name) {
      const x = X(o.x), y = Y(o.y), rr = o.R * px;
      if (x < 0 || x > w || y < 0 || y > h) continue;
      if (o.label && rr > Math.min(w, h)) continue;
      if (!o.label && span > 40) continue;
      ctx.fillText(o.name, x + Math.max(8, o.label ? rr * 0.7 : 8), y - 6);
    }
    if (span > 40) { ctx.strokeStyle = accent; ctx.beginPath(); ctx.arc(X(0), Y(0), 5, 0, Math.PI * 2); ctx.stroke(); ctx.fillStyle = accent; ctx.font = FONT(10.5); ctx.fillText('ta ở đây', X(0) + 9, Y(0) + 14); }
    // thước
    const nice = [0.01, 0.1, 1, 10, 100][Math.max(0, Math.min(4, Math.floor(Math.log10(span / 4)) + 2))];
    ctx.strokeStyle = 'rgba(236,230,216,.6)'; ctx.beginPath(); ctx.moveTo(14, h - 16); ctx.lineTo(14 + nice * px, h - 16); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10); ctx.fillText(nice < 1 ? `${fmt(nice * 1e6)} năm ánh sáng` : `${fmt(nice)} triệu năm ánh sáng`, 14, h - 22);
    ctx.textAlign = 'right'; ctx.fillText('vị trí các chấm là minh hoạ', w - 12, h - 10);
    return Math.abs(Math.log(span / target)) > 0.002;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
