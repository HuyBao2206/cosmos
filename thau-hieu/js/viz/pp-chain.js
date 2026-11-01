// Chuỗi proton–proton (nhánh chính pp-I): 4 proton → 1 hạt nhân heli-4. Khối lượng hụt 0,71 % thành năng lượng (E = Δm c²).
// Khối lượng nguyên tử: ¹H 1,007 825 u; ⁴He 4,002 602 u; 1 u = 931,494 MeV/c².
import { frame, buttons, readout, loop, FONT, fmt } from './_kit.js';

const P = '#ff9a7a', N = '#b9b3a6';
const STEPS = [
  { title: '1 · Hai proton hợp nhất', eq: 'p + p → ²H + e⁺ + ν', l: [['p'], ['p']], r: [['p', 'n']], out: ['e⁺', 'ν'], note: 'Một proton phải biến thành neutron (tương tác yếu) — bước cực hiếm, quyết định nhịp “đốt” chậm của Mặt Trời.' },
  { title: '2 · Deuteri bắt thêm proton', eq: '²H + p → ³He + γ', l: [['p', 'n'], ['p']], r: [['p', 'p', 'n']], out: ['γ'], note: 'Xảy ra nhanh hơn bước 1 rất nhiều. Hai bước đầu diễn ra hai lần cho mỗi hạt heli-4.' },
  { title: '3 · Hai heli-3 gặp nhau', eq: '³He + ³He → ⁴He + p + p', l: [['p', 'p', 'n'], ['p', 'p', 'n']], r: [['p', 'p', 'n', 'n'], ['p'], ['p']], out: [], note: 'Trả lại hai proton. Kết quả cả chuỗi: 4 proton → 1 heli-4 + 2 positron + 2 neutrino + năng lượng.' },
];

function nucleus(ctx, x, y, parts, r) {
  const n = parts.length;
  parts.forEach((p, i) => {
    const a = (i / n) * Math.PI * 2 + 0.6, d = n === 1 ? 0 : r * 0.85;
    const px = x + Math.cos(a) * d, py = y + Math.sin(a) * d;
    const g = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, 0, px, py, r);
    g.addColorStop(0, '#fff'); g.addColorStop(0.25, p === 'p' ? P : N); g.addColorStop(1, p === 'p' ? '#a8503a' : '#5d5a54');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, r, 0, Math.PI * 2); ctx.fill();
  });
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Ba bước của chuỗi proton–proton biến hydro thành heli');
  let step = 0, t0 = performance.now(), auto = !opts.reduced;
  const say = readout(F.panel);
  const box = buttons(F.panel, [...STEPS.map((s, i) => ({ label: `Bước ${i + 1}`, value: i })), { label: 'Tự chạy', value: -1 }], (v) => {
    auto = v === -1; if (!auto) step = v; t0 = performance.now(); show(); L.kick();
  });
  box.lastChild.setAttribute('aria-pressed', String(auto));

  const mIn = 4 * 1.007825, mOut = 4.002602, dm = mIn - mOut;
  function show() {
    const s = STEPS[step];
    say(`<span><b>${s.eq}</b></span><span>${s.note}</span>
      <span>Cả chuỗi: ${fmt(mIn, 4)} u → ${fmt(mOut, 4)} u, hụt <b>${fmt(dm, 4)} u = ${fmt((dm / mIn) * 100, 2)} %</b> ⇒ <b>${fmt(dm * 931.494, 1)} MeV</b> mỗi hạt heli (kể cả phần positron huỷ với electron; ~2 % bị neutrino mang đi)</span>`);
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    let k = Math.max(0, (now - t0) / 2600);
    if (auto && k >= 1) { step = (step + 1) % 3; t0 = now; k = 0; show(); }
    k = opts.reduced ? 1 : Math.min(1, k);
    ctx.clearRect(0, 0, w, h);
    const s = STEPS[step];
    const cy = h * 0.42, r = Math.min(13, w / 50);
    // chỉ báo tiến trình 3 bước
    ctx.font = FONT(11); ctx.textAlign = 'center';
    STEPS.forEach((st, i) => {
      if (w < 560 && i !== step) return;
      const x = w < 560 ? w / 2 : w * (0.2 + i * 0.3);
      ctx.fillStyle = i === step ? accent : 'rgba(236,230,216,.35)';
      ctx.fillText(st.title, x, 28);
      if (i === step) { ctx.fillRect(x - 24, 36, 48, 2); }
    });
    // hai hạt tiến lại gần → chớp sáng → sản phẩm
    const meet = Math.min(1, k / 0.45), flash = k > 0.45 && k < 0.65 ? 1 - Math.abs(k - 0.55) / 0.1 : 0;
    const ease = 1 - Math.pow(1 - meet, 3);
    if (k < 0.55) {
      const sep = (1 - ease) * w * 0.22 + r * 2.4;
      nucleus(ctx, w / 2 - sep, cy, s.l[0], r);
      nucleus(ctx, w / 2 + sep, cy, s.l[1], r);
    } else {
      const spread = Math.min(1, (k - 0.55) / 0.35);
      const prods = s.r;
      prods.forEach((pp, i) => {
        const off = (i - (prods.length - 1) / 2) * spread * w * 0.16;
        nucleus(ctx, w / 2 + off, cy + (i === 0 ? 0 : -spread * 20 * (i % 2 ? 1 : -1)), pp, r);
      });
      s.out.forEach((o, i) => {
        const a = -0.6 + i * 1.2, d = spread * Math.min(w, h) * 0.28;
        const x = w / 2 + Math.cos(a + Math.PI / 2) * d * (i ? 1 : -1), y = cy + Math.sin(a - Math.PI / 2) * d * 0.6 - 10;
        ctx.fillStyle = o === 'γ' ? '#fff3b0' : o === 'ν' ? '#9fd4e8' : '#ffd0e0';
        ctx.font = FONT(15, 600); ctx.textAlign = 'center'; ctx.globalAlpha = spread;
        ctx.fillText(o, x, y); ctx.globalAlpha = 1;
      });
    }
    if (flash > 0) {
      const g = ctx.createRadialGradient(w / 2, cy, 0, w / 2, cy, 60);
      g.addColorStop(0, `rgba(255,250,220,${flash})`); g.addColorStop(1, 'rgba(255,220,150,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w / 2, cy, 60, 0, Math.PI * 2); ctx.fill();
    }
    // chú giải
    ctx.font = FONT(11); ctx.textAlign = 'left';
    const ly = h * 0.72;
    [[P, 'proton'], [N, 'neutron']].forEach(([c, l], i) => {
      ctx.fillStyle = c; ctx.beginPath(); ctx.arc(24 + i * 92, ly, 5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.fillText(l, 34 + i * 92, ly + 4);
    });
    ctx.fillText('γ tia gamma · ν neutrino · e⁺ positron', 24, ly + 22);
    // quy mô Mặt Trời
    ctx.textAlign = 'right'; ctx.fillStyle = 'rgba(236,230,216,.75)'; ctx.font = FONT(11.5);
    const tx = w - 20;
    if (w > 520) {
      ctx.fillText('Mỗi giây trong lõi Mặt Trời (ESA):', tx, ly);
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(12, 600);
      ctx.fillText('~600 triệu tấn H → ~596 triệu tấn He', tx, ly + 20);
      ctx.fillStyle = accent; ctx.fillText('~4 triệu tấn hoá thành năng lượng', tx, ly + 40);
    }
    return auto || k < 1;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
