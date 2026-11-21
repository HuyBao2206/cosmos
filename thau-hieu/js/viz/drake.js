// Phương trình Drake (1961) như một khung suy luận, không phải phép tính có đáp án.
// Hai thừa số đầu đã đo được khá tốt (n_e còn là ước tính thô) nhờ thiên văn học; bốn thừa số sau là ẩn số hoàn toàn — người xem tự chỉnh để thấy
// kết quả trải từ "chỉ có ta" tới "hàng triệu nền văn minh". Mỗi thừa số ghi rõ mức hiểu biết hiện nay.
import { frame, slider, readout, loop, FONT, fmt, sci } from './_kit.js';
import { drake } from '../../../shared/js/astro/physics.js';

const FACTORS = [
  { k: 'R', label: 'R* — số sao mới hình thành mỗi năm trong Ngân Hà', min: 0.5, max: 10, v: 1.5, log: true, known: 'đo được: cỡ 1–2 sao/năm' },
  { k: 'fp', label: 'f_p — tỉ lệ sao có hành tinh', min: 0.1, max: 1, v: 1, known: 'đo được: hầu hết các sao có hành tinh' },
  { k: 'ne', label: 'n_e — số hành tinh có thể sống được mỗi hệ', min: 0.01, max: 1, v: 0.2, log: true, known: 'ước tính thô: 0,1–0,5 (còn tranh luận)' },
  { k: 'fl', label: 'f_l — tỉ lệ nơi sự sống thực sự xuất hiện', min: 1e-6, max: 1, v: 0.1, log: true, known: 'chưa biết — chỉ có một ví dụ là Trái Đất' },
  { k: 'fi', label: 'f_i — tỉ lệ sự sống tiến hoá ra trí tuệ', min: 1e-6, max: 1, v: 0.01, log: true, known: 'chưa biết' },
  { k: 'fc', label: 'f_c — tỉ lệ phát ra tín hiệu dò được', min: 1e-3, max: 1, v: 0.1, log: true, known: 'chưa biết' },
  { k: 'L', label: 'L — thời gian một nền văn minh phát tín hiệu (năm)', min: 10, max: 1e8, v: 1e4, log: true, known: 'chưa biết' },
];
const show = (v) => (v >= 1000 || v < 0.01 ? sci(v, 1) : fmt(v, v < 1 ? 2 : v < 10 ? 1 : 0));

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Phương trình Drake: tích của bảy thừa số, phần lớn chưa biết');
  const val = Object.fromEntries(FACTORS.map((f) => [f.k, f.v]));
  const say = readout(F.panel);
  FACTORS.forEach((f) => slider(F.panel, { label: f.label, min: f.min, max: f.max, log: f.log, step: f.log ? undefined : 0.01, value: f.v, format: show, onInput: (v) => { val[f.k] = v; upd(); } }));
  function N() { return drake(val.R, val.fp, val.ne, val.fl, val.fi, val.fc, val.L); }
  function upd() {
    const n = N();
    say(`<span>N ≈ <b>${n < 1 ? fmt(n, n < 0.001 ? 6 : 3) : show(n)}</b> nền văn minh đang phát tín hiệu dò được trong Ngân Hà ${n < 1 ? '— nghĩa là nhiều khả năng ta là duy nhất' : ''}</span>
      <span>Chỉ cần đổi các thừa số chưa biết, kết quả có thể thay đổi hàng chục bậc độ lớn. Phương trình cho biết cần đo gì, không cho biết đáp án.</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    // thanh log cho từng thừa số + kết quả
    const x0 = 16, x1 = w - 16, rowH = (h - 70) / FACTORS.length;
    FACTORS.forEach((f, i) => {
      const y = 14 + i * rowH;
      const known = i < 2;
      ctx.fillStyle = known ? 'rgba(127,224,212,.85)' : 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5, known ? 600 : 400); ctx.textAlign = 'left';
      ctx.fillText(`${f.label.split(' — ')[0]} = ${show(val[f.k])}`, x0, y + 11);
      ctx.fillStyle = 'rgba(236,230,216,.4)'; ctx.font = FONT(9.5); ctx.textAlign = 'right';
      ctx.fillText(f.known, x1, y + 11);
      // vùng có thể của giá trị (chưa biết: toàn thanh)
      const bx0 = x0, bx1 = x1, by = y + 16;
      ctx.fillStyle = 'rgba(236,230,216,.08)'; ctx.fillRect(bx0, by, bx1 - bx0, 5);
      const p = f.log ? (Math.log10(val[f.k]) - Math.log10(f.min)) / (Math.log10(f.max) - Math.log10(f.min)) : (val[f.k] - f.min) / (f.max - f.min);
      ctx.fillStyle = known ? 'rgba(127,224,212,.85)' : accent; ctx.fillRect(bx0, by, (bx1 - bx0) * p, 5);
    });
    const n = N(), y = h - 34;
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(13, 600); ctx.textAlign = 'center';
    ctx.fillText(`N = R* · f_p · n_e · f_l · f_i · f_c · L ≈ ${n < 1 ? fmt(n, n < 0.001 ? 6 : 3) : show(n)}`, w / 2, y);
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.fillText('xanh: đã đo được · còn lại: ước tính thô hoặc hoàn toàn chưa biết', w / 2, y + 18);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  upd();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
