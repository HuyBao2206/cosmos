// "Bụi sao" trong cơ thể: thành phần nguyên tố (người tham chiếu ICRP, xấp xỉ) và nơi chúng được tạo ra.
// Hydro có từ Vụ Nổ Lớn; gần như mọi nguyên tố còn lại sinh ra trong các ngôi sao. Mỗi ô = 1 % (khối lượng hoặc số nguyên tử).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';

const ORIGIN = {
  bb: { n: 'Vụ Nổ Lớn', c: '#9fd4e8' },
  lo: { n: 'Sao khối lượng thấp lúc cuối đời', c: '#f4e19c' },
  hi: { n: 'Sao nặng nổ tung (siêu tân tinh)', c: '#ffb07c' },
  mix: { n: 'Cả sao khối lượng thấp lẫn sao nặng', c: '#c4a8ff' },
};
// % khối lượng (ICRP, người tham chiếu — xấp xỉ) và khối lượng nguyên tử để quy ra số nguyên tử
const EL = [
  { s: 'O', n: 'Oxy', m: 61.4, A: 16.0, o: 'hi' },
  { s: 'C', n: 'Carbon', m: 22.9, A: 12.0, o: 'mix' },
  { s: 'H', n: 'Hydro', m: 10.0, A: 1.008, o: 'bb' },
  { s: 'N', n: 'Nitơ', m: 2.6, A: 14.0, o: 'lo' },
  { s: '…', n: 'Ca, P, K, S, Na, Cl, Mg…', m: 3.1, A: 30, o: 'hi' },
];

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, canvas } = F;
  canvas.setAttribute('aria-label', 'Thành phần nguyên tố của cơ thể người và nguồn gốc vũ trụ của chúng');
  let kg = 60, byAtoms = false, t0 = performance.now();
  const say = readout(F.panel);
  slider(F.panel, { label: 'Cân nặng của bạn', min: 20, max: 120, step: 1, value: kg, format: (v) => `${fmt(v)} kg`, onInput: (v) => { kg = v; show(); } });
  const box = buttons(F.panel, [{ label: 'Theo khối lượng', value: false }, { label: 'Theo số nguyên tử', value: true }], (v) => { byAtoms = v; t0 = performance.now(); show(); L.kick(); });
  box.firstChild.setAttribute('aria-pressed', 'true');

  function shares() {
    if (!byAtoms) return EL.map((e) => ({ ...e, p: e.m }));
    const tot = EL.reduce((a, e) => a + e.m / e.A, 0);
    return EL.map((e) => ({ ...e, p: ((e.m / e.A) / tot) * 100 }));
  }
  function show() {
    const sh = shares(), h = sh.find((e) => e.s === 'H').p;
    say(`<span>${EL.slice(0, 4).map((e) => `${e.n} <b>~${fmt((kg * e.m) / 100, (kg * e.m) / 100 < 10 ? 1 : 0)} kg</b>`).join(' · ')}</span>
      <span>${byAtoms ? `Theo số nguyên tử, hydro chiếm <b>~${fmt(h, 0)} %</b> — phần lớn nguyên tử trong bạn có từ Vụ Nổ Lớn.` : `Khoảng <b>${fmt(100 - h, 0)} %</b> khối lượng cơ thể bạn (mọi thứ trừ hydro) được tạo ra bên trong các ngôi sao.`}</span>`);
    L?.kick();
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 600;
    const sh = shares();
    // lưới 10 × 10
    const cells = [];
    let acc = 0;
    sh.forEach((e) => { acc += e.p; while (cells.length < Math.round(acc) && cells.length < 100) cells.push(e); });
    while (cells.length < 100) cells.push(sh[sh.length - 1]);
    const gs = Math.min((narrow ? w - 40 : w * 0.46) / 10, (h - (narrow ? 150 : 60)) / 10);
    const gx = narrow ? (w - gs * 10) / 2 : 30, gy = narrow ? 18 : (h - gs * 10) / 2;
    const k = opts.reduced ? 1 : Math.min(1, (now - t0) / 900);
    cells.forEach((e, i) => {
      const col = i % 10, row = Math.floor(i / 10);
      const show = k * 100 >= i;
      ctx.globalAlpha = show ? 1 : 0.12;
      ctx.fillStyle = ORIGIN[e.o].c;
      ctx.beginPath(); ctx.roundRect(gx + col * gs + 1.5, gy + row * gs + 1.5, gs - 3, gs - 3, 3); ctx.fill();
      ctx.globalAlpha = 1;
      if (gs > 22) { ctx.fillStyle = 'rgba(5,6,11,.65)'; ctx.font = FONT(gs * 0.38, 600); ctx.textAlign = 'center'; ctx.fillText(e.s, gx + col * gs + gs / 2, gy + row * gs + gs * 0.64); }
    });
    // chú giải
    const lx = narrow ? 20 : gx + gs * 10 + 34, ly = narrow ? gy + gs * 10 + 24 : gy + 10;
    ctx.textAlign = 'left';
    Object.values(ORIGIN).forEach((o, i) => {
      const y = ly + i * (narrow ? 20 : 30);
      ctx.fillStyle = o.c; ctx.beginPath(); ctx.roundRect(lx, y - 10, 14, 14, 3); ctx.fill();
      ctx.fillStyle = 'rgba(236,230,216,.8)'; ctx.font = FONT(narrow ? 11 : 12);
      ctx.fillText(o.n, lx + 22, y + 1);
    });
    if (!narrow) {
      ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10.5);
      ctx.fillText('Mỗi ô = 1 %. Nguồn gốc chính theo bảng của J. A. Johnson (2019);', lx, ly + 4 * 30 + 10);
      ctx.fillText('nhiều nguyên tố có nhiều nguồn cùng lúc.', lx, ly + 4 * 30 + 26);
    }
    return k < 1;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
