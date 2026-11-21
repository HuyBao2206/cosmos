// Các loại thiên hà theo sơ đồ "âm thoa" của Hubble (1926, 1936): elip E0–E7 → dạng thấu kính S0 → xoắn ốc Sa–Sc (nhánh trên)
// và xoắn ốc có thanh SBa–SBc (nhánh dưới); thiên hà không đều đứng riêng. Bấm một ô để dựng thiên hà mẫu bằng hạt.
// Hình dạng sinh theo quy tắc phân loại (độ dẹt E_n: b/a = 1 − n/10; Sa→Sc: chỗ phình nhỏ dần, nhánh mở dần) — minh hoạ, không phải ảnh thật.
import { frame, buttons, readout, loop, FONT } from './_kit.js';
import { isLowPower } from '../../../shared/js/util.js';

const TYPES = [
  { id: 'E0', fork: [0, 0], kind: 'E', n: 0, txt: 'Elip gần tròn. Chủ yếu là sao già màu vàng đỏ, rất ít khí để sinh sao mới.' },
  { id: 'E3', fork: [1, 0], kind: 'E', n: 3 },
  { id: 'E7', fork: [2, 0], kind: 'E', n: 7, txt: 'Elip dẹt nhất trong sơ đồ (trục ngắn bằng 3/10 trục dài).' },
  { id: 'S0', fork: [3, 0], kind: 'S0', txt: 'Dạng thấu kính: có đĩa và chỗ phình nhưng không có nhánh xoắn rõ, ít khí.' },
  { id: 'Sa', fork: [4, -1], kind: 'S', bulge: 0.55, pitch: 0.18, txt: 'Xoắn ốc Sa: chỗ phình lớn, nhánh cuộn chặt.' },
  { id: 'Sb', fork: [5, -1], kind: 'S', bulge: 0.35, pitch: 0.3 },
  { id: 'Sc', fork: [6, -1], kind: 'S', bulge: 0.18, pitch: 0.45, txt: 'Xoắn ốc Sc: chỗ phình nhỏ, nhánh mở rộng, nhiều vùng sinh sao xanh.' },
  { id: 'SBa', fork: [4, 1], kind: 'SB', bulge: 0.5, pitch: 0.2 },
  { id: 'SBb', fork: [5, 1], kind: 'SB', bulge: 0.32, pitch: 0.32, txt: 'Xoắn ốc có thanh SBb — kiểu mà Ngân Hà thuộc về (thường xếp là SBbc).' },
  { id: 'SBc', fork: [6, 1], kind: 'SB', bulge: 0.18, pitch: 0.45 },
  { id: 'Irr', fork: [7, 0], kind: 'Irr', txt: 'Không đều: không có hình dạng rõ, thường nhỏ và nhiều khí, như hai Đám Mây Magellan.' },
];

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
const gauss = (r) => { let u = 0, v = 0; while (!u) u = r(); v = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v); };

function makeGalaxy(T, N) {
  const r = rng(7 + T.id.length * 31 + T.id.charCodeAt(T.id.length - 1));
  const pts = [];          // [x, y, z, R, G, B, size]
  const old = [255, 214, 170], young = [170, 200, 255], pink = [255, 150, 190];
  if (T.kind === 'E') {
    const q = 1 - T.n / 10;
    for (let i = 0; i < N; i++) {
      const rad = Math.pow(r(), 2.2) * 1.0;
      const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1);
      pts.push([rad * Math.sin(ph) * Math.cos(th), rad * Math.sin(ph) * Math.sin(th) * q, rad * Math.cos(ph) * q, ...old, 1]);
    }
    return pts;
  }
  if (T.kind === 'Irr') {
    const clumps = Array.from({ length: 7 }, () => [gauss(r) * 0.35, gauss(r) * 0.25, 0.08 + r() * 0.18]);
    for (let i = 0; i < N; i++) {
      const c = clumps[Math.floor(r() * clumps.length)];
      const col = r() < 0.45 ? young : r() < 0.1 ? pink : old;
      pts.push([c[0] + gauss(r) * c[2], c[1] + gauss(r) * c[2], gauss(r) * 0.06, ...col, 1]);
    }
    return pts;
  }
  const bulge = T.bulge ?? 0.45;
  for (let i = 0; i < N; i++) {
    const u = r();
    if (u < bulge * 0.6) {            // chỗ phình
      const rad = Math.pow(r(), 2) * 0.28;
      const th = r() * Math.PI * 2, ph = Math.acos(2 * r() - 1);
      pts.push([rad * Math.sin(ph) * Math.cos(th), rad * Math.sin(ph) * Math.sin(th), rad * Math.cos(ph) * 0.7, ...old, 1]);
      continue;
    }
    if (T.kind === 'SB' && u < bulge * 0.6 + 0.12) {   // thanh
      const x = (r() * 2 - 1) * 0.45;
      pts.push([x, gauss(r) * 0.05, gauss(r) * 0.03, ...old, 1]);
      continue;
    }
    // đĩa: nhánh xoắn logarit r = r0·e^{bθ}
    const rad = 0.12 + Math.pow(r(), 0.9) * 0.9;
    if (T.kind === 'S0') {
      const th = r() * Math.PI * 2;
      pts.push([rad * Math.cos(th), rad * Math.sin(th), gauss(r) * 0.02, ...old, 1]);
      continue;
    }
    const arm = Math.floor(r() * 2);
    const b = T.pitch;
    const start = T.kind === 'SB' ? 0.45 : 0.12;
    const th0 = Math.log(Math.max(rad, start) / start) / b + arm * Math.PI;
    const spread = 0.18 + 0.25 * r();
    const th = th0 + gauss(r) * spread;
    const ins = r() < 0.55;
    const col = ins ? (r() < 0.12 ? pink : young) : old;
    pts.push([rad * Math.cos(th), rad * Math.sin(th), gauss(r) * 0.02, ...col, ins ? 1.2 : 0.8]);
  }
  return pts;
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Sơ đồ âm thoa phân loại thiên hà của Hubble và hình mẫu từng loại');
  let sel = TYPES[8], pts = null, rot = 0;
  const N = isLowPower() ? 2500 : 6000;
  const say = readout(F.panel);
  const box = buttons(F.panel, TYPES.map((t) => ({ label: t.id, value: t })), (t) => pick(t));
  box.children[8].setAttribute('aria-pressed', 'true');
  function pick(t) {
    sel = t; pts = makeGalaxy(t, N);
    say(`<span>Loại <b>${t.id}</b></span><span>${t.txt || (t.kind === 'E' ? `Elip E${t.n}: trục ngắn bằng ${10 - t.n}/10 trục dài, nhìn trên bầu trời.` : t.kind === 'SB' ? 'Xoắn ốc có thanh: các nhánh bắt đầu từ hai đầu một thanh sao thẳng qua tâm.' : 'Xoắn ốc: đĩa phẳng có nhánh, chỗ phình sao già ở tâm.')}</span>`);
    L.kick();
  }

  let boxes = [];
  canvas.addEventListener('click', (e) => {
    const rc = canvas.getBoundingClientRect(), x = e.clientX - rc.left, y = e.clientY - rc.top;
    const hit = boxes.find((b) => Math.hypot(b.x - x, b.y - y) < 18);
    if (hit) { pick(hit.t); box.querySelectorAll('.btn').forEach((b, i) => b.setAttribute('aria-pressed', String(TYPES[i] === hit.t))); }
  });

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) rot += dt * 0.08;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 640;
    // âm thoa
    const fx0 = 26, fx1 = narrow ? w - 26 : w * 0.5, fy = narrow ? 52 : h * 0.5, dy = narrow ? 26 : 50;
    const X = (i) => fx0 + (i / 7) * (fx1 - fx0);
    ctx.strokeStyle = 'rgba(236,230,216,.22)'; ctx.lineWidth = 1.2; ctx.beginPath();
    ctx.moveTo(X(0), fy); ctx.lineTo(X(3), fy); ctx.lineTo(X(6), fy - dy); ctx.moveTo(X(3), fy); ctx.lineTo(X(6), fy + dy); ctx.stroke(); ctx.lineWidth = 1;
    boxes = [];
    TYPES.forEach((t) => {
      const x = X(t.fork[0]), y = fy + t.fork[1] * dy;
      boxes.push({ x, y, t });
      const on = t === sel;
      ctx.fillStyle = on ? accent : 'rgba(236,230,216,.12)';
      ctx.beginPath(); ctx.arc(x, y, on ? 15 : 13, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = on ? '#05060b' : '#ece6d8'; ctx.font = FONT(narrow ? 9 : 10.5, 600); ctx.textAlign = 'center'; ctx.fillText(t.id, x, y + 4);
    });
    if (!narrow) {
      ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(10); ctx.textAlign = 'center';
      ctx.fillText('xoắn ốc thường', X(5), fy - dy - 22); ctx.fillText('xoắn ốc có thanh', X(5), fy + dy + 30);
      ctx.fillText('elip', X(1), fy - 24);
    }
    // thiên hà mẫu
    const gcx = narrow ? w / 2 : w * 0.76, gcy = narrow ? h * 0.58 : h * 0.5, R = narrow ? Math.min(w, h) * 0.34 : Math.min(w * 0.22, h * 0.42);
    const tilt = sel.kind === 'E' ? 0 : 0.95;     // nghiêng đĩa để thấy khối 3D
    const ca = Math.cos(rot), sa = Math.sin(rot), ct = Math.cos(tilt), st = Math.sin(tilt);
    ctx.globalCompositeOperation = 'lighter';
    for (const p of pts) {
      let x = p[0] * ca - p[1] * sa, y = p[0] * sa + p[1] * ca, z = p[2];
      if (sel.kind === 'E') { x = p[0]; y = p[1]; }
      const yy = y * ct - z * st;
      ctx.fillStyle = `rgba(${p[3]},${p[4]},${p[5]},0.55)`;
      ctx.fillRect(gcx + x * R, gcy + yy * R, p[6] * 1.3, p[6] * 1.3);
    }
    const g = ctx.createRadialGradient(gcx, gcy, 0, gcx, gcy, R * (sel.kind === 'Irr' ? 0.2 : 0.35));
    g.addColorStop(0, 'rgba(255,225,190,.35)'); g.addColorStop(1, 'rgba(255,200,150,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(gcx, gcy, R * 0.35, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText('Bấm một ô trên sơ đồ · hình mẫu dựng bằng hạt, không phải ảnh thật', 12, h - 10);
    return !opts.reduced;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  pick(sel);
  return { destroy() { L.stop(); F.destroyResize(); } };
}
