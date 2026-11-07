// Ba định luật Kepler trên một quỹ đạo elip chỉnh được.
// Định luật 1: elip, Mặt Trời ở một tiêu điểm. Định luật 2: trong những khoảng thời gian bằng nhau, đoạn nối quét những diện tích bằng nhau
// (tô 8 "múi" cách đều về thời gian). Định luật 3: T² = a³ (a theo au, T theo năm, quanh 1 M☉).
// Chuyển động giải đúng phương trình Kepler M = E − e sin E (solveKepler trong kepler.js, có test với DE421).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { solveKepler } from '../../../shared/js/astro/kepler.js';
import { periodYears, visViva, GM_SUN, AU } from '../../../shared/js/astro/physics.js';

const SLICES = 8;

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Quỹ đạo elip với Mặt Trời ở tiêu điểm, các múi diện tích quét trong thời gian bằng nhau');
  let e = 0.6, a = 1, Mphase = 0, showAreas = true;
  const say = readout(F.panel);
  const sE = slider(F.panel, { label: 'Độ lệch tâm e', min: 0, max: 0.95, step: 0.005, value: e, format: (v) => fmt(v, 3), onInput: (v) => { e = v; show(); } });
  const sA = slider(F.panel, { label: 'Bán trục lớn a', min: 0.3, max: 40, log: true, value: a, format: (v) => `${fmt(v, v < 10 ? 2 : 1)} au`, onInput: (v) => { a = v; show(); } });
  buttons(F.panel, [
    { label: 'Trái Đất', value: [0.0167, 1] }, { label: 'Sao Hoả', value: [0.0934, 1.524] }, { label: 'Sao Mộc', value: [0.0489, 5.203] },
    { label: 'Sao chổi Halley', value: [0.967, 17.8] }, { label: 'Hiện/ẩn múi diện tích', value: 'areas' },
  ], (v) => { if (v === 'areas') { showAreas = !showAreas; L.kick(); return; } sE.set(v[0]); sA.set(v[1]); });

  function show() {
    const T = periodYears(a);
    const vp = visViva(GM_SUN, a * (1 - e) * AU, a * AU) / 1000, va = visViva(GM_SUN, a * (1 + e) * AU, a * AU) / 1000;
    say(`<span>Chu kỳ T = a<sup>3/2</sup> = <b>${T < 2 ? fmt(T * 365.25, 0) + ' ngày' : fmt(T, T < 20 ? 2 : 1) + ' năm'}</b></span>
      <span>Gần Mặt Trời nhất <b>${fmt(a * (1 - e), 3)} au</b>, xa nhất <b>${fmt(a * (1 + e), 3)} au</b></span>
      <span>Tốc độ ở điểm gần nhất <b>${fmt(vp, 1)} km/s</b>, ở điểm xa nhất <b>${fmt(va, 1)} km/s</b></span>`);
    L.kick();
  }

  // vị trí trên elip (toạ độ quỹ đạo, đơn vị a; tiêu điểm ở gốc) từ dị thường trung bình M
  const pos = (M) => { const E = solveKepler(M, e); return [Math.cos(E) - e, Math.sqrt(1 - e * e) * Math.sin(E)]; };

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    // tốc độ hoạt ảnh: một vòng trong ~8 s bất kể a (để nhìn rõ định luật 2); định luật 3 đọc ở bảng số
    if (!opts.reduced) Mphase = (Mphase + dt * (2 * Math.PI) / 8) % (2 * Math.PI);
    ctx.clearRect(0, 0, w, h);
    const bA = Math.sqrt(1 - e * e);
    const scale = Math.min((w - 40) / 2, (h - 50) / (2 * bA + 0.0001), (h - 50) / 2) * 0.95;
    const cx = w / 2 + e * scale, cy = h / 2 + 4;          // tiêu điểm (Mặt Trời)
    const P = ([x, y]) => [cx + x * scale, cy - y * scale];
    // múi diện tích
    if (showAreas) {
      for (let k = 0; k < SLICES; k++) {
        const m0 = (k / SLICES) * 2 * Math.PI, m1 = ((k + 1) / SLICES) * 2 * Math.PI;
        ctx.beginPath(); ctx.moveTo(cx, cy);
        for (let i = 0; i <= 24; i++) { const [x, y] = P(pos(m0 + ((m1 - m0) * i) / 24)); ctx.lineTo(x, y); }
        ctx.closePath();
        ctx.fillStyle = k % 2 ? 'rgba(143,179,255,.10)' : 'rgba(143,179,255,.20)'; ctx.fill();
      }
    }
    // elip
    ctx.strokeStyle = 'rgba(236,230,216,.45)'; ctx.lineWidth = 1.2; ctx.beginPath();
    for (let i = 0; i <= 240; i++) { const t = (i / 240) * 2 * Math.PI; const [x, y] = P([Math.cos(t) - e, bA * Math.sin(t)]); i ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.lineWidth = 1;
    // trục lớn, hai tiêu điểm
    const [ax0, ay] = P([-1 - e, 0]), [ax1] = P([1 - e, 0]);
    ctx.setLineDash([3, 4]); ctx.strokeStyle = 'rgba(236,230,216,.18)'; ctx.beginPath(); ctx.moveTo(ax0, ay); ctx.lineTo(ax1, ay); ctx.stroke(); ctx.setLineDash([]);
    const [fx2, fy2] = P([-2 * e, 0]);
    ctx.strokeStyle = 'rgba(236,230,216,.4)'; ctx.beginPath(); ctx.arc(fx2, fy2, 3, 0, Math.PI * 2); ctx.stroke();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.textAlign = 'center';
    if (e > 0.08) ctx.fillText('tiêu điểm thứ hai (trống)', fx2, fy2 + 16);
    ctx.fillText('cận điểm', ax1 - 4, ay - 10); ctx.fillText('viễn điểm', ax0 + 4, ay - 10);
    // Mặt Trời
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 16);
    g.addColorStop(0, '#fff7e0'); g.addColorStop(0.4, '#ffd27a'); g.addColorStop(1, 'rgba(255,190,90,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 16, 0, Math.PI * 2); ctx.fill();
    // hành tinh + vectơ vận tốc
    const p = pos(Mphase), [px, py] = P(p);
    const r = Math.hypot(p[0], p[1]);
    const E = solveKepler(Mphase, e), dEdM = 1 / (1 - e * Math.cos(E));
    const vx = -Math.sin(E) * dEdM, vy = bA * Math.cos(E) * dEdM;
    ctx.strokeStyle = 'rgba(236,230,216,.35)'; ctx.beginPath(); ctx.moveTo(cx, cy); ctx.lineTo(px, py); ctx.stroke();
    const vl = 34;
    ctx.strokeStyle = accent; ctx.lineWidth = 1.6; ctx.beginPath(); ctx.moveTo(px, py); ctx.lineTo(px + vx * vl, py - vy * vl); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#9fd4e8'; ctx.beginPath(); ctx.arc(px, py, 6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText(`r = ${fmt(r * a, 2)} au`, px + 10, py - 8);
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.fillText('mũi tên: vận tốc (tỉ lệ tương đối)', 14, h - 12);
    return !opts.reduced;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
