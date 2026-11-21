// Dòng thời gian vũ trụ trên thang log: kéo con trỏ từ 1 giây tới 13,8 tỷ năm.
// Ở mỗi thời điểm: kích thước tương đối a = 1/(1+z), dịch chuyển đỏ, nhiệt độ bức xạ T = 2,7255 K × (1+z) — tính từ mô hình ΛCDM
// (Planck 2018, cosmology.js, có test). Ở giai đoạn rất sớm (< vài phút) mô hình đơn giản này bỏ qua sự huỷ cặp electron–positron,
// nên nhiệt độ chỉ đúng về bậc độ lớn. Các mốc lấy theo research/lich-su-vu-tru.md.
import { frame, buttons, readout, loop, drag, FONT, fmt, sci } from './_kit.js';
import { ageAtA, T_CMB } from '../../../shared/js/astro/cosmology.js';

const YR = 365.25 * 86400;
const T0 = ageAtA(1);                               // tỷ năm
// tra ngược a(t): lập bảng log a → t
const TABLE = [];
for (let la = -11; la <= 0.0001; la += 0.05) TABLE.push([la, ageAtA(10 ** la) * 1e9 * YR]);   // [log a, t (s)]
function aOfT(ts) {
  if (ts <= TABLE[0][1]) return 10 ** TABLE[0][0] * Math.sqrt(ts / TABLE[0][1]);   // kỷ nguyên bức xạ: a ∝ t^{1/2}
  for (let i = 1; i < TABLE.length; i++) if (TABLE[i][1] >= ts) {
    const [l0, t0] = TABLE[i - 1], [l1, t1] = TABLE[i];
    const k = (Math.log(ts) - Math.log(t0)) / (Math.log(t1) - Math.log(t0));
    return 10 ** (l0 + (l1 - l0) * k);
  }
  return 1;
}
const EVENTS = [
  { t: 1, name: 'Neutrino tách khỏi vật chất', short: '1 giây' },
  { t: 180, name: 'Tổng hợp hạt nhân Vụ Nổ Lớn: H, He, chút Li', short: '~3 phút' },
  { t: 1200, name: 'Kết thúc tổng hợp hạt nhân', short: '~20 phút' },
  { t: 380e3 * YR, name: 'Tái kết hợp — vũ trụ trong suốt, phát ra bức xạ phông vi sóng', short: '380 000 năm' },
  { t: 150e6 * YR, name: 'Những ngôi sao đầu tiên (ước tính 100–200 triệu năm)', short: '~150 triệu năm' },
  { t: 283e6 * YR, name: 'Thiên hà MoM-z14 (z = 14,44) phát ra ánh sáng ta thấy hôm nay', short: '~280 triệu năm' },
  { t: 1e9 * YR, name: 'Tái ion hoá cơ bản hoàn tất', short: '~1 tỷ năm' },
  { t: (T0 - 4.6) * 1e9 * YR, name: 'Hệ Mặt Trời hình thành', short: '9,2 tỷ năm' },
  { t: (T0 - 6.1) * 1e9 * YR, name: 'Giãn nở bắt đầu tăng tốc (năng lượng tối trội)', short: '~7,7 tỷ năm' },
  { t: T0 * 1e9 * YR, name: 'Hôm nay', short: `${fmt(T0, 2)} tỷ năm` },
];
const LO = 0, HI = Math.log10(T0 * 1e9 * YR);

function fmtT(s) {
  if (s < 60) return `${fmt(s, s < 10 ? 1 : 0)} giây`;
  if (s < 3600) return `${fmt(s / 60, 0)} phút`;
  if (s < 86400 * 2) return `${fmt(s / 3600, 1)} giờ`;
  const y = s / YR;
  if (y < 1) return `${fmt(s / 86400, 0)} ngày`;
  if (y < 1e3) return `${fmt(y, 0)} năm`;
  if (y < 1e6) return `${fmt(y / 1e3, 0)} nghìn năm`;
  if (y < 1e9) return `${fmt(y / 1e6, 0)} triệu năm`;
  return `${fmt(y / 1e9, 2)} tỷ năm`;
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Dòng thời gian vũ trụ từ một giây sau Vụ Nổ Lớn tới hôm nay, kèm nhiệt độ và kích thước tương đối');
  let lt = Math.log10(380e3 * YR);
  const say = readout(F.panel);
  buttons(F.panel, EVENTS.map((e) => ({ label: e.short, value: e.t })), (t) => { lt = Math.log10(t); show(); });
  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', (e) => { const d = { ArrowLeft: -0.1, ArrowRight: 0.1 }[e.key]; if (d) { lt = Math.max(LO, Math.min(HI, lt + d)); show(); e.preventDefault(); } });
  let X0 = 0, X1 = 1;
  const unDrag = drag(canvas, { onDrag: (x) => { lt = Math.max(LO, Math.min(HI, LO + ((x - X0) / (X1 - X0)) * (HI - LO))); show(); } });

  function state() {
    const ts = 10 ** lt, a = aOfT(ts), z = 1 / a - 1, T = T_CMB / a;
    return { ts, a, z, T };
  }
  function show() {
    const { ts, a, z, T } = state();
    const ev = EVENTS.reduce((b, e) => (Math.abs(Math.log10(e.t) - lt) < Math.abs(Math.log10(b.t) - lt) ? e : b));
    const near = Math.abs(Math.log10(ev.t) - lt) < 0.15;
    say(`<span>Tuổi vũ trụ <b>${fmtT(ts)}</b></span><span>Nhiệt độ bức xạ <b>${T < 1e4 ? fmt(T, T < 10 ? 2 : 0) : sci(T, 1)} K</b></span>
      <span>Khoảng cách giữa các thiên hà (so với hôm nay) <b>${a < 1e-3 ? '1/' + sci(1 / a, 1) : a < 0.5 ? '1/' + fmt(1 / a, 0) : fmt(a, 2)}</b>${z > 0.01 ? ` · z = ${z < 100 ? fmt(z, 2) : sci(z, 1)}` : ''}</span>
      ${near ? `<span><b>${ev.name}</b></span>` : ''}`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    X0 = 20; X1 = w - 20;
    const X = (l) => X0 + ((l - LO) / (HI - LO)) * (X1 - X0);
    const y = h * 0.62;
    // dải màu theo nhiệt độ: nóng (trắng vàng) → lạnh (đen); sau tái kết hợp "thời kỳ tối" rồi sao sáng lên
    for (let x = X0; x < X1; x++) {
      const l = LO + ((x - X0) / (X1 - X0)) * (HI - LO), ts = 10 ** l, T = T_CMB / aOfT(ts);
      let col;
      if (ts < 380e3 * YR) { const k = Math.min(1, Math.log10(T / 3000) / 7); col = `rgb(${255},${Math.round(150 + 105 * k)},${Math.round(80 + 170 * k)})`; }
      else if (ts < 150e6 * YR) col = 'rgb(20,14,22)';
      else { const k = Math.min(1, (l - Math.log10(150e6 * YR)) / 1.2); col = `rgb(${Math.round(20 + 30 * k)},${Math.round(20 + 30 * k)},${Math.round(40 + 50 * k)})`; }
      ctx.fillStyle = col; ctx.fillRect(x, y - 10, 1.2, 20);
    }
    // các mốc
    EVENTS.forEach((e, i) => {
      const x = X(Math.log10(e.t));
      ctx.strokeStyle = 'rgba(236,230,216,.4)'; ctx.beginPath(); ctx.moveTo(x, y - 14); ctx.lineTo(x, y - 24 - (i % 3) * 16); ctx.stroke();
      ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.font = FONT(w < 600 ? 9 : 10); ctx.textAlign = i === EVENTS.length - 1 ? 'right' : 'center';
      if (w > 600 || i % 2 === 0) ctx.fillText(e.short, x, y - 28 - (i % 3) * 16);
    });
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    [[0, '1 s'], [Math.log10(3600), '1 giờ'], [Math.log10(YR), '1 năm'], [Math.log10(1e3 * YR), '1 nghìn năm'], [Math.log10(1e6 * YR), '1 triệu năm'], [Math.log10(1e9 * YR), '1 tỷ năm']].forEach(([l, s]) => ctx.fillText(s, X(l), y + 26));
    ctx.fillText('thời gian sau Vụ Nổ Lớn (thang log)', (X0 + X1) / 2, y + 42);
    // con trỏ
    const x = X(lt);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(x, y - 18); ctx.lineTo(x, y + 14); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = accent; ctx.beginPath(); ctx.arc(x, y, 6, 0, Math.PI * 2); ctx.fill();
    // khung trên: "hộp" vũ trụ co giãn — ô lưới đồng chuyển động
    const { a } = state();
    const box = Math.max(3, Math.min(h * 0.2, 6 + (Math.log10(a) + 10) / 10 * h * 0.18));
    const bx = w / 2, by = h * 0.25;
    ctx.strokeStyle = 'rgba(232,228,218,.25)';
    for (let i = -3; i <= 3; i++) { ctx.beginPath(); ctx.moveTo(bx + i * box / 3, by - box); ctx.lineTo(bx + i * box / 3, by + box); ctx.stroke(); ctx.beginPath(); ctx.moveTo(bx - box, by + i * box / 3); ctx.lineTo(bx + box, by + i * box / 3); ctx.stroke(); }
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText('một vùng không gian, phóng to theo log của kích thước', bx + Math.max(box, 30) + 10, by + 4);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); unDrag(); F.destroyResize(); } };
}
