// Biểu đồ Hertzsprung–Russell: trục ngang là nhiệt độ bề mặt (nóng bên TRÁI), trục dọc là độ trưng (thang log).
// Kéo khối lượng → vị trí trên dãy chính (L, R, T theo quan hệ giáo khoa trong physics.js), thời gian sống, kết cục.
// "Xem nó già đi" vẽ đường tiến hoá phác hoạ (định tính).
import { frame, slider, buttons, readout, loop, FONT, fmt, sci } from './_kit.js';
import { msLuminosity, msRadius, teff, msLifetime, stellarFate } from '../../../shared/js/astro/physics.js';

const TMAX = 45000, TMIN = 2400, LMIN = 1e-4, LMAX = 3e6;
const COLS = [[2400, [255, 160, 90]], [3000, [255, 180, 107]], [4000, [255, 209, 163]], [5000, [255, 228, 206]], [5800, [255, 244, 234]], [7000, [248, 247, 255]], [10000, [204, 219, 255]], [20000, [170, 191, 255]], [45000, [155, 176, 255]]];
function tColor(T, a = 1) {
  const lt = Math.log10(T);
  for (let i = 1; i < COLS.length; i++) {
    if (T <= COLS[i][0]) {
      const [t0, c0] = COLS[i - 1], [t1, c1] = COLS[i];
      const k = (lt - Math.log10(t0)) / (Math.log10(t1) - Math.log10(t0));
      return `rgba(${c0.map((c, j) => Math.round(c + (c1[j] - c) * k)).join(',')},${a})`;
    }
  }
  return `rgba(155,176,255,${a})`;
}
function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
const FATE = { 'brown-dwarf': 'sao lùn nâu (không thành sao)', 'white-dwarf': 'sao lùn trắng', 'neutron-star': 'sao neutron (sau siêu tân tinh)', 'black-hole': 'hố đen hoặc sao neutron (sau siêu tân tinh)' };

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Biểu đồ Hertzsprung–Russell với dãy chính, sao khổng lồ và sao lùn trắng');
  let M = 1, aging = false, t0 = 0;
  // quần thể sao nền (minh hoạ)
  const r = rng(5), pop = [];
  for (let i = 0; i < 420; i++) {
    const m = Math.pow(10, -0.9 + Math.pow(r(), 1.8) * 2.4);
    const L = msLuminosity(m) * Math.pow(10, (r() - 0.5) * 0.35), T = teff(msLuminosity(m), msRadius(m)) * Math.pow(10, (r() - 0.5) * 0.03);
    pop.push([T, L]);
  }
  for (let i = 0; i < 70; i++) pop.push([3600 + r() * 1700, Math.pow(10, 1.3 + r() * 1.9)]);          // khổng lồ đỏ
  for (let i = 0; i < 22; i++) pop.push([3500 + r() * 22000, Math.pow(10, 4.1 + r() * 1.6)]);         // siêu khổng lồ
  for (let i = 0; i < 45; i++) { const T = 5500 + r() * 24000; pop.push([T, Math.pow(10, -3.8 + (Math.log10(T) - 3.74) * 2.2 + (r() - 0.5) * 0.5)]); } // sao lùn trắng

  const say = readout(F.panel);
  const sM = slider(F.panel, { label: 'Khối lượng sao (lúc sinh ra)', min: 0.1, max: 60, log: true, value: M, format: (v) => `${fmt(v, v < 1 ? 2 : v < 10 ? 1 : 0)} M☉`, onInput: (v) => { M = v; aging = false; show(); } });
  buttons(F.panel, [
    { label: 'Sao lùn đỏ 0,2 M☉', value: 0.2 }, { label: 'Mặt Trời', value: 1 }, { label: 'Sao 2 M☉', value: 2 }, { label: 'Sao 15 M☉', value: 15 },
    { label: 'Xem nó già đi ▶', value: 'age' },
  ], (v) => { if (v === 'age') { if (M < 0.5) { say('<span>Sao nhẹ như vậy sống lâu hơn tuổi hiện nay của vũ trụ — chưa sao nào kịp già đi. Hãy chọn khối lượng từ 0,5 M☉ trở lên.</span>'); return; } aging = true; t0 = performance.now(); L.kick(); } else { sM.set(v); } });

  function star() { const L = msLuminosity(M), R = msRadius(M); return { L, R, T: teff(L, R) }; }
  function show() {
    const { L, R, T } = star();
    const life = msLifetime(M);
    const lifeTxt = M > 20 ? 'chỉ vài triệu năm' : life > 1.38e10 ? `~${life > 1e12 ? sci(life, 0) : fmt(life / 1e9, 0) + ' tỷ'} năm — lâu hơn tuổi vũ trụ` : life >= 1e9 ? `~${fmt(life / 1e9, 1)} tỷ năm` : `~${fmt(life / 1e6, 0)} triệu năm`;
    say(`<span>Độ trưng <b>${L < 0.01 ? sci(L, 1) : L < 100 ? fmt(L, L < 1 ? 3 : 1) : sci(L, 1)} L☉</b></span>
      <span>Nhiệt độ bề mặt <b>~${fmt(Math.round(T / 100) * 100)} K</b></span><span>Bán kính <b>~${fmt(R, R < 1 ? 2 : 1)} R☉</b></span>
      <span>Sống trên dãy chính <b>${lifeTxt}</b></span><span>Kết cục (xấp xỉ): <b>${FATE[stellarFate(M)]}</b></span>`);
    L_?.kick?.();
  }
  let L_;

  function track() {
    // đường đi phác hoạ (định tính) sau khi rời dãy chính
    const s = star(), pts = [[s.T, s.L]];
    if (M < 8) {
      pts.push([s.T * 0.85, s.L * 1.8], [4500, s.L * 8], [3600, Math.max(s.L * 400, 300)], [4800, s.L * 50], [3300, Math.max(s.L * 1500, 2000)], [30000, Math.max(s.L * 1500, 2000)], [40000, 100], [25000, 0.05], [8000, 3e-4]);
    } else {
      pts.push([s.T * 0.7, s.L * 1.3], [12000, s.L * 1.5], [6000, s.L * 1.6], [3600, s.L * 1.7]);
    }
    return pts;
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const x0 = 54, x1 = w - 18, y0 = 34, y1 = h - 40;
    const X = (T) => x0 + ((Math.log10(TMAX) - Math.log10(Math.min(Math.max(T, TMIN), TMAX))) / (Math.log10(TMAX) - Math.log10(TMIN))) * (x1 - x0);
    const Y = (L) => y1 - ((Math.log10(L) - Math.log10(LMIN)) / (Math.log10(LMAX) - Math.log10(LMIN))) * (y1 - y0);
    // khung & trục
    ctx.strokeStyle = 'rgba(236,230,216,.14)'; ctx.strokeRect(x0, y0, x1 - x0, y1 - y0);
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.45)';
    ctx.textAlign = 'right';
    [-4, -2, 0, 2, 4, 6].forEach((e) => { const y = Y(10 ** e); ctx.fillText(e === 0 ? '1' : `10${e < 0 ? '⁻' : ''}${'⁰¹²³⁴⁵⁶'[Math.abs(e)]}`, x0 - 6, y + 3); ctx.strokeStyle = 'rgba(236,230,216,.05)'; ctx.beginPath(); ctx.moveTo(x0, y); ctx.lineTo(x1, y); ctx.stroke(); });
    ctx.textAlign = 'center';
    [40000, 20000, 10000, 6000, 3000].forEach((T) => ctx.fillText(`${fmt(T)} K`, X(T), y1 + 14));
    ctx.fillText('← nóng hơn          nhiệt độ bề mặt          lạnh hơn →', (x0 + x1) / 2, y1 + 30);
    // loại quang phổ
    [['O', 45000, 30000], ['B', 30000, 10000], ['A', 10000, 7500], ['F', 7500, 6000], ['G', 6000, 5200], ['K', 5200, 3700], ['M', 3700, 2400]].forEach(([s, a, b]) => {
      ctx.fillStyle = tColor(Math.sqrt(a * b), 0.8); ctx.font = FONT(11, 600); ctx.fillText(s, (X(a) + X(b)) / 2, y0 - 10);
    });
    ctx.save(); ctx.translate(14, (y0 + y1) / 2); ctx.rotate(-Math.PI / 2); ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.45)';
    ctx.fillText('độ trưng (L☉, thang log) — sáng hơn ↑', 0, 0); ctx.restore();
    // quần thể
    pop.forEach(([T, L]) => { ctx.fillStyle = tColor(T, 0.55); ctx.beginPath(); ctx.arc(X(T), Y(L), 1.6, 0, Math.PI * 2); ctx.fill(); });
    ctx.font = FONT(11); ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.textAlign = 'left';
    ctx.fillText('Dãy chính', X(16000), Y(msLuminosity(4)) - 18);
    ctx.fillText('Khổng lồ đỏ', X(4300), Y(1500));
    ctx.fillText('Siêu khổng lồ', X(14000), Y(4e5));
    ctx.fillText('Sao lùn trắng', X(22000), Y(2e-4) - 4);
    // sao được chọn
    const s = star();
    let px = X(s.T), py = Y(s.L), label = 'trên dãy chính';
    if (aging) {
      const pts = track();
      const k = opts.reduced ? 1 : Math.max(0, Math.min(1, (now - t0) / 6000));
      const segs = pts.length - 1, f = k * segs, i = Math.min(segs - 1, Math.floor(f)), u = f - i;
      ctx.strokeStyle = 'rgba(159,212,232,.5)'; ctx.setLineDash([3, 3]); ctx.beginPath();
      for (let j = 0; j <= i + 1 && j < pts.length; j++) {
        const [T, L] = j === i + 1 ? [Math.pow(10, Math.log10(pts[i][0]) + (Math.log10(pts[i + 1][0]) - Math.log10(pts[i][0])) * u), Math.pow(10, Math.log10(pts[i][1]) + (Math.log10(pts[i + 1][1]) - Math.log10(pts[i][1])) * u)] : pts[j];
        j ? ctx.lineTo(X(T), Y(L)) : ctx.moveTo(X(T), Y(L));
        if (j === i + 1) { px = X(T); py = Y(L); }
      }
      ctx.stroke(); ctx.setLineDash([]);
      label = k < 1 ? 'đang già đi (đường phác hoạ)' : M < 8 ? 'sao lùn trắng, nguội dần' : 'siêu tân tinh!';
      if (k >= 1 && M >= 8) {
        const g = ctx.createRadialGradient(px, py, 0, px, py, 40);
        g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(1, 'rgba(255,176,124,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, 40, 0, Math.PI * 2); ctx.fill();
      }
      if (k < 1) L_.kick();
    }
    const rr = Math.max(4, Math.min(16, 6 + Math.log10(s.R) * 4));
    const g = ctx.createRadialGradient(px, py, 0, px, py, rr * 2.4);
    g.addColorStop(0, '#fff'); g.addColorStop(0.35, tColor(s.T, 1)); g.addColorStop(1, tColor(s.T, 0));
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(px, py, rr * 2.4, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, py, rr + 4, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    ctx.font = FONT(11.5, 600); ctx.fillStyle = '#ece6d8'; ctx.textAlign = px > w - 160 ? 'right' : 'left';
    ctx.fillText(`${fmt(M, M < 1 ? 2 : 1)} M☉ · ${label}`, px + (px > w - 160 ? -rr - 10 : rr + 10), py - rr - 4);
    return false;
  }

  L_ = loop(host, draw, { continuous: false });
  const L = L_;
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
