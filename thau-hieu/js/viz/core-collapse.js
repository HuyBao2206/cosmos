// Siêu tân tinh sụp lõi: cấu trúc "củ hành" của sao nặng cuối đời → lõi sắt sụp trong chưa tới một giây →
// bật ngược, sao neutron hình thành, chớp neutrino → sóng xung kích thổi bay các lớp ngoài.
// Phân bổ năng lượng (~10⁴⁶ J): ~99 % neutrino, ~1 % động năng, ~0,01 % ánh sáng.
import { frame, buttons, readout, loop, FONT } from './_kit.js';

const LAYERS = [
  { n: 'H', c: '#ffb07c' }, { n: 'He', c: '#f4e19c' }, { n: 'C', c: '#c4a8ff' }, { n: 'O', c: '#8fb3ff' },
  { n: 'Ne', c: '#7fe0d4' }, { n: 'Si', c: '#a6e8b8' }, { n: 'Fe', c: '#e8e4da' },
];
const STAGES = [
  'Cuối đời, sao nặng có cấu trúc nhiều lớp như củ hành: lớp ngoài còn hydro, càng vào trong càng là nguyên tố nặng, tâm là lõi sắt. Hợp hạch sắt thành nguyên tố nặng hơn không còn toả năng lượng — lò phản ứng tắt.',
  'Lõi sắt vượt khoảng 1,4 khối lượng Mặt Trời: áp suất electron thua trọng lực, lõi sụp đổ trong chưa tới một giây.',
  'Lõi nén tới mật độ hạt nhân thì cứng lại và bật ngược. Một sao neutron ra đời; chớp neutrino mang đi gần như toàn bộ năng lượng.',
  'Sóng xung kích (được neutrino “tiếp sức” — cơ chế chi tiết vẫn đang nghiên cứu) thổi tung các lớp ngoài: một siêu tân tinh.',
];
const ENERGY = [['Neutrino', 99, '#9fd4e8'], ['Động năng lớp vỏ', 1, '#ffb07c'], ['Ánh sáng', 0.01, '#fff3b0']];

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

export function mount(host, opts = {}) {
  const F = frame(host, { note: 'Không theo tỉ lệ' });
  const { ctx, size, canvas } = F;
  canvas.setAttribute('aria-label', 'Hoạt hình siêu tân tinh sụp lõi và phân bổ năng lượng');
  let t0 = null, stage = 0;
  const r = rng(3);
  const nus = Array.from({ length: 140 }, () => ({ a: r() * Math.PI * 2, v: 0.7 + r() * 0.6 }));
  const say = readout(F.panel);
  buttons(F.panel, [{ label: 'Cho lõi sụp ▶', value: 'go' }, { label: 'Làm lại', value: 'reset' }], (v) => {
    t0 = v === 'go' ? performance.now() : null; stage = 0; show(); L.kick();
  });
  function show() { say(`<span>${STAGES[stage]}</span>`); }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 600;
    const cx = narrow ? w / 2 : w * 0.36, cy = narrow ? h * 0.42 : h / 2;
    const R = Math.min(narrow ? w * 0.36 : w * 0.28, h * (narrow ? 0.36 : 0.42));
    const t = t0 == null ? 0 : opts.reduced ? 6 : Math.max(0, (now - t0) / 1000);
    const st = t0 == null ? 0 : t < 1.4 ? 1 : t < 2.6 ? 2 : 3;
    if (st !== stage) { stage = st; show(); }
    const coreK = st >= 1 ? Math.min(1, t / 1.4) : 0;               // sụp lõi
    const blast = Math.max(0, t - 2.4);                              // sóng xung kích
    const fade = Math.max(0, 1 - blast / 3.2);
    // các lớp
    LAYERS.forEach((l, i) => {
      const f = 1 - i / LAYERS.length;
      let rr = R * f;
      if (l.n === 'Fe') rr *= 1 - 0.85 * (coreK * coreK);
      else if (blast > 0) rr *= 1 + blast * (0.5 + f * 0.6);
      ctx.globalAlpha = l.n === 'Fe' ? (st >= 2 ? 0 : 1) : 0.85 * fade;
      ctx.fillStyle = l.c; ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2);
      ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = 'rgba(5,6,11,.42)'; ctx.beginPath(); ctx.arc(cx, cy, rr - 1.5, 0, Math.PI * 2); ctx.fill();
      if (st === 0 || (st === 1 && l.n !== 'Fe')) {
        ctx.fillStyle = '#05060b'; ctx.font = FONT(11, 600); ctx.textAlign = 'center';
        const inner = R * (1 - (i + 1) / LAYERS.length);
        ctx.fillStyle = l.c; ctx.fillText(l.n, cx, cy - (l.n === 'Fe' ? 0 : (rr + inner) / 2) + 4);
      }
    });
    // sao neutron + neutrino
    if (st >= 2) {
      const k = Math.min(1, (t - 1.4) / 0.4);
      const gn = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14 + 30 * (1 - k));
      gn.addColorStop(0, '#ffffff'); gn.addColorStop(0.4, 'rgba(143,179,255,.9)'); gn.addColorStop(1, 'rgba(143,179,255,0)');
      ctx.fillStyle = gn; ctx.beginPath(); ctx.arc(cx, cy, 44, 0, Math.PI * 2); ctx.fill();
      const tn = t - 1.4;
      ctx.fillStyle = '#9fd4e8';
      nus.forEach((n) => {
        const d = tn * n.v * R * 1.6;
        if (d > Math.max(w, h)) return;
        ctx.globalAlpha = Math.max(0, 1 - d / (R * 3));
        ctx.beginPath(); ctx.arc(cx + Math.cos(n.a) * d, cy + Math.sin(n.a) * d, 1.6, 0, Math.PI * 2); ctx.fill();
      });
      ctx.globalAlpha = 1;
      ctx.font = FONT(11, 600); ctx.fillStyle = '#ece6d8'; ctx.textAlign = 'center';
      ctx.fillText('sao neutron', cx, cy + 30);
    }
    // phân bổ năng lượng
    const ex = narrow ? 20 : w * 0.68, ey = narrow ? h * 0.82 : h * 0.3, ew = narrow ? w - 40 : w * 0.28;
    if (narrow) { ctx.fillStyle = 'rgba(5,6,11,.82)'; ctx.fillRect(0, ey - 22, w, h - ey + 22); }
    ctx.textAlign = 'left'; ctx.font = FONT(11, 600); ctx.fillStyle = '#ece6d8';
    if (!narrow) ctx.fillText('Năng lượng giải phóng (~10⁴⁶ J)', ex, ey - 18);
    ENERGY.forEach(([n, p, c], i) => {
      const y = ey + i * (narrow ? 18 : 40);
      const bw = Math.max(1.5, (p / 100) * ew * (narrow ? 0.6 : 1));
      ctx.globalAlpha = st >= 2 || t0 == null ? 1 : 0.35;
      ctx.fillStyle = c; ctx.fillRect(narrow ? ex + ew * 0.4 : ex, narrow ? y - 8 : y + 6, bw, narrow ? 8 : 10);
      ctx.fillStyle = 'rgba(236,230,216,.75)'; ctx.font = FONT(narrow ? 10.5 : 11.5);
      ctx.fillText(`${n} ~${p === 0.01 ? '0,01' : p} %`, ex, narrow ? y : y);
      ctx.globalAlpha = 1;
    });
    return t0 != null && t < 6;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
