// Căng thẳng Hubble: các phép đo H₀ (km/s/Mpc) với thanh sai số 1σ, xếp theo phương pháp.
// Số liệu: research/lich-su-vu-tru.md §3, research/kl-khu-vuc-toi.md §C (tra cứu 11/2026). Sai số bất đối xứng giữ nguyên.
// Nút lọc làm nổi nhóm "vũ trụ sớm" / "thang khoảng cách" / "cách độc lập"; dải màu là hai giá trị trung tâm Planck và SH0ES.
import { frame, buttons, readout, loop, FONT, fmt } from '../../../thau-hieu/js/viz/_kit.js';

export const H0 = [
  { g: 'early', name: 'Planck 2018 (phông vi sóng, ΛCDM)', v: 67.4, lo: 0.5, hi: 0.5, year: 2018 },
  { g: 'early', name: 'Planck + ACT DR6', v: 67.62, lo: 0.5, hi: 0.5, year: 2025 },
  { g: 'early', name: 'SPT-3G riêng', v: 66.66, lo: 0.6, hi: 0.6, year: 2025 },
  { g: 'early', name: 'DESI DR2 BAO + BBN (không dùng CMB)', v: 68.51, lo: 0.58, hi: 0.58, year: 2025 },
  { g: 'ladder', name: 'CCHP 2025 (TRGB, HST + JWST)', v: 70.39, lo: 1.94, hi: 1.94, year: 2025 },
  { g: 'ladder', name: 'SH0ES 2022 (Cepheid + SN Ia)', v: 73.04, lo: 1.04, hi: 1.04, year: 2022 },
  { g: 'ladder', name: 'SH0ES JAGB 2025', v: 73.3, lo: 2.4, hi: 2.4, year: 2025 },
  { g: 'ladder', name: 'H0DN 2026 (mạng khoảng cách)', v: 73.5, lo: 0.81, hi: 0.81, year: 2026 },
  { g: 'indep', name: 'Maser nước (MCP 2020)', v: 73.9, lo: 3.0, hi: 3.0, year: 2020 },
  { g: 'indep', name: 'Thấu kính trễ thời gian TDCOSMO 2025', v: 71.6, lo: 3.3, hi: 3.9, year: 2025 },
  { g: 'indep', name: 'Sóng hấp dẫn GW170817 (“còi chuẩn”)', v: 70.0, lo: 8.0, hi: 12.0, year: 2017 },
];
const GROUPS = { early: { label: 'Vũ trụ sớm', col: '#9fb6ff' }, ladder: { label: 'Thang khoảng cách', col: '#e6c27a' }, indep: { label: 'Cách độc lập', col: '#a6e8b8' } };

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, canvas } = F;
  canvas.setAttribute('aria-label', 'Các phép đo hằng số Hubble với thanh sai số, chia theo phương pháp');
  let focus = null;
  const say = readout(F.panel);
  buttons(F.panel, [{ label: 'Tất cả', value: null }, ...Object.entries(GROUPS).map(([k, g]) => ({ label: g.label, value: k }))], (v) => { focus = v; show(); });
  function show() {
    const sel = H0.filter((m) => !focus || m.g === focus);
    const wmean = (arr) => { let s = 0, ws = 0; for (const m of arr) { const s2 = ((m.lo + m.hi) / 2) ** -2; s += m.v * s2; ws += s2; } return [s / ws, Math.sqrt(1 / ws)]; };
    const [m, e] = wmean(sel);
    say(`<span>${focus ? `${GROUPS[focus].label}: trung bình có trọng số <b>${fmt(m, 1)} ± ${fmt(e, 1)}</b> km/s/Mpc` : 'Chọn một nhóm để tính trung bình — gộp tất cả lại sẽ che mất chính chỗ chênh lệch cần xem.'}</span>
      <span>Planck 67,4 ± 0,5 và SH0ES 73,04 ± 1,04 lệch nhau <b>${fmt((73.04 - 67.4) / Math.hypot(0.5, 1.04), 1)}σ</b></span>`);
    L.kick();
  }
  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const narrow = w < 600;
    const lw = narrow ? 0 : Math.min(280, w * 0.38);
    const x0 = lw + 20, x1 = w - 20, y0 = 30, y1 = h - 36;
    const lo = 60, hi = 84;
    const X = (v) => x0 + ((v - lo) / (hi - lo)) * (x1 - x0);
    // dải Planck và SH0ES
    [[67.4, 0.5, '#9fb6ff'], [73.04, 1.04, '#e6c27a']].forEach(([v, e, c]) => { ctx.fillStyle = c + '22'; ctx.fillRect(X(v - e), y0 - 10, X(v + e) - X(v - e), y1 - y0 + 10); });
    ctx.strokeStyle = 'rgba(236,230,216,.15)'; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    for (let v = 60; v <= 84; v += 4) { ctx.fillText(`${v}`, X(v), y1 + 14); ctx.fillStyle = 'rgba(236,230,216,.06)'; ctx.fillRect(X(v), y0 - 10, 1, y1 - y0 + 10); ctx.fillStyle = 'rgba(236,230,216,.5)'; }
    ctx.fillText('H₀ (km/s/Mpc)', (x0 + x1) / 2, y1 + 28);
    const row = (y1 - y0) / H0.length;
    H0.forEach((m, i) => {
      const y = y0 + row * (i + 0.5), G = GROUPS[m.g], dim = focus && focus !== m.g;
      ctx.globalAlpha = dim ? 0.22 : 1;
      ctx.strokeStyle = G.col; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(X(Math.max(lo, m.v - m.lo)), y); ctx.lineTo(X(Math.min(hi, m.v + m.hi)), y); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = G.col; ctx.beginPath(); ctx.arc(X(m.v), y, 4.5, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(narrow ? 9.5 : 11); ctx.textAlign = narrow ? 'left' : 'right';
      if (narrow) ctx.fillText(m.name, x0, y - 7); else ctx.fillText(m.name, lw + 10, y + 4);
      ctx.globalAlpha = 1;
    });
    return false;
  }
  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
