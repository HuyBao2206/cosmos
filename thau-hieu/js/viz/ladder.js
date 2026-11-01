// Thang khoảng cách vũ trụ: mỗi phương pháp chỉ dùng được trong một dải; vùng chồng lấn là nơi bậc dưới hiệu chuẩn bậc trên.
// Trục: năm ánh sáng, thang log (ở vùng xa nhất, "khoảng cách" hiểu theo thời gian ánh sáng đi).
import { frame, slider, readout, loop, FONT, fmt, sci } from './_kit.js';

const LMIN = -8, LMAX = 10.5;
const RUNGS = [
  { name: 'Radar & laser', from: 4e-8, to: 5e-4, col: '#e8e4da', how: 'đo thời gian khứ hồi của sóng vô tuyến/laser (cả tín hiệu tàu vũ trụ) · xác định au' },
  { name: 'Thị sai (Gaia)', from: 4, to: 3e4, fade: 1e4, col: '#9fd4e8', how: 'hình học tam giác trên đường đáy 1 au · không cần biết gì về ngôi sao' },
  { name: 'Cepheid', from: 300, to: 1.3e8, col: '#f4e19c', how: 'chu kỳ → độ trưng (định luật Leavitt), hiệu chuẩn bằng thị sai' },
  { name: 'Siêu tân tinh Ia', from: 2e7, to: 1e10, col: '#ffb07c', how: 'nến chuẩn hoá được, hiệu chuẩn bằng Cepheid trong cùng thiên hà' },
  { name: 'Định luật Hubble', from: 1e8, to: 1.38e10, col: '#c4a8ff', how: 'dịch chuyển đỏ → khoảng cách, cần biết H₀ và mô hình vũ trụ' },
];
const MARKS = [
  { name: 'Mặt Trăng', ly: 4.06e-8 }, { name: 'Mặt Trời', ly: 1.58e-5 }, { name: 'Sao Hải Vương', ly: 4.75e-4 },
  { name: 'Proxima', ly: 4.2465 }, { name: 'Orion', ly: 1300 }, { name: 'Tâm Ngân Hà', ly: 26_700 },
  { name: 'Andromeda', ly: 2.5e6 }, { name: 'NGC 5468', ly: 1.3e8 }, { name: 'MoM-z14', ly: 1.35e10 },
];

function lyText(ly) {
  if (ly < 1e-3) return `${sci(ly * 9.4607e12, 2)} km`;
  if (ly < 1e6) return `${fmt(ly, ly < 10 ? 2 : 0)} năm ánh sáng`;
  if (ly < 1e9) return `${fmt(ly / 1e6, ly < 1e7 ? 1 : 0)} triệu năm ánh sáng`;
  return `${fmt(ly / 1e9, 1)} tỷ năm ánh sáng`;
}

export function mount(host, opts = {}) {
  const F = frame(host, { note: 'Thang logarit · vùng chồng lấn = nơi hiệu chuẩn' });
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Thang khoảng cách vũ trụ gồm năm bậc phương pháp và các thiên thể mốc');
  let cur = Math.log10(2.5e6);
  const say = readout(F.panel);
  const s = slider(F.panel, {
    label: 'Chỉ vào một khoảng cách', min: Math.pow(10, LMIN), max: Math.pow(10, LMAX), log: true, value: 2.5e6,
    format: lyText, onInput: (v) => { cur = Math.log10(v); show(); },
  });

  function show() {
    const d = Math.pow(10, cur);
    const act = RUNGS.filter((r) => d >= r.from && d <= r.to);
    say(act.length
      ? act.map((r) => `<span><b style="color:${r.col}">${r.name}</b> — ${r.how}</span>`).join('')
      : `<span>${d > 1.38e10 ? 'Vượt quá thời gian ánh sáng đi tối đa (~13,8 tỷ năm); ở đây chỉ còn khoảng cách theo mô hình vũ trụ học.' : d < 4e-8 ? 'Khoảng cách này đo trực tiếp bằng thước, GPS hay laser trên mặt đất.' : 'Chưa phương pháp thiên văn nào đo được ở khoảng này — vùng giữa Hệ Mặt Trời và ngôi sao gần nhất chỉ có tàu vũ trụ đi qua.'}</span>`);
    L?.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return false;
    ctx.clearRect(0, 0, w, h);
    const x0 = 22, x1 = w - 22;
    const X = (lg) => x0 + ((lg - LMIN) / (LMAX - LMIN)) * (x1 - x0);
    const top = 58, rowH = Math.min(38, (h - 130) / RUNGS.length);
    const axisY = top + rowH * RUNGS.length + 18;
    const d = Math.pow(10, cur);
    RUNGS.forEach((r, i) => {
      const y = top + i * rowH;
      const a = X(Math.log10(r.from)), b = X(Math.log10(r.to));
      const on = d >= r.from && d <= r.to;
      const g = ctx.createLinearGradient(a, 0, b, 0);
      g.addColorStop(0, r.col + '00'); g.addColorStop(0.12, r.col + (on ? 'cc' : '66'));
      if (r.fade) g.addColorStop((X(Math.log10(r.fade)) - a) / (b - a), r.col + (on ? 'cc' : '66'));
      g.addColorStop(1, r.col + '00');
      ctx.fillStyle = g;
      const bh = rowH * 0.52;
      ctx.beginPath(); ctx.roundRect(a, y, b - a, bh, bh / 2); ctx.fill();
      ctx.fillStyle = on ? '#05060b' : '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = 'left';
      const tw = ctx.measureText(r.name).width;
      const tx = Math.min(x1 - tw - 4, Math.max(a + 12, Math.min(b - tw - 12, (a + b) / 2 - 40)));
      ctx.fillText(r.name, tx, y + bh * 0.7);
      // mũi tên hiệu chuẩn sang bậc trên
      const nx = RUNGS[i + 1];
      if (nx) {
        const lo = Math.max(r.from, nx.from), hi = Math.min(r.to, nx.to);
        const ax = hi > lo ? X((Math.log10(lo) + Math.log10(hi)) / 2) : X(Math.log10(r.to));
        ctx.strokeStyle = 'rgba(236,230,216,.55)'; ctx.setLineDash([2, 3]);
        ctx.beginPath(); ctx.moveTo(ax, y + bh + 2); ctx.lineTo(ax, y + rowH - 3); ctx.stroke(); ctx.setLineDash([]);
        ctx.fillStyle = 'rgba(236,230,216,.7)';
        ctx.beginPath(); ctx.moveTo(ax, y + rowH - 1); ctx.lineTo(ax - 3.5, y + rowH - 7); ctx.lineTo(ax + 3.5, y + rowH - 7); ctx.closePath(); ctx.fill();
      }
    });
    // trục
    ctx.strokeStyle = 'rgba(236,230,216,.25)';
    ctx.beginPath(); ctx.moveTo(x0, axisY); ctx.lineTo(x1, axisY); ctx.stroke();
    ctx.font = FONT(10); ctx.fillStyle = 'rgba(236,230,216,.42)'; ctx.textAlign = 'center';
    for (let e = LMIN; e <= LMAX; e += 1) {
      const x = X(e);
      ctx.beginPath(); ctx.moveTo(x, axisY - 3); ctx.lineTo(x, axisY + 3); ctx.stroke();
      if (e % (w < 600 ? 4 : 2) === 0) ctx.fillText(e === 0 ? '1 ly' : `10${sup(e)}`, x, axisY + 16);
    }
    // mốc
    ctx.font = FONT(10.5);
    const rows = [[], [], []];
    MARKS.forEach((m) => {
      const x = X(Math.log10(m.ly));
      const tw = ctx.measureText(m.name).width + 10;
      let r = 0;
      for (; r < rows.length - 1; r++) if (rows[r].every(([a, b]) => x - tw / 2 > b || x + tw / 2 < a)) break;
      rows[r].push([x - tw / 2, x + tw / 2]);
      const yy = axisY + 32 + r * 14;
      ctx.fillStyle = '#ece6d8'; ctx.beginPath(); ctx.arc(x, axisY, 2.6, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = 'rgba(236,230,216,.66)';
      ctx.textAlign = x < 40 ? 'left' : x > w - 40 ? 'right' : 'center';
      ctx.fillText(m.name, x, yy);
    });
    // con trỏ
    const px = X(cur);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(px, top - 12); ctx.lineTo(px, axisY + 6); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = accent; ctx.font = FONT(11, 600);
    ctx.textAlign = px < 90 ? 'left' : px > w - 90 ? 'right' : 'center';
    ctx.fillText(lyText(d), px, top - 18);
    return false;
  }
  const SUP = { '-': '⁻', 0: '⁰', 1: '¹', 2: '²', 3: '³', 4: '⁴', 5: '⁵', 6: '⁶', 7: '⁷', 8: '⁸', 9: '⁹' };
  function sup(n) { return String(n).split('').map((c) => SUP[c]).join(''); }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  let drag = false;
  const toVal = (e) => {
    const r = canvas.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left - 22) / (r.width - 44)));
    s.set(Math.pow(10, LMIN + t * (LMAX - LMIN)));
  };
  canvas.style.touchAction = 'pan-y'; canvas.style.cursor = 'ew-resize';
  canvas.addEventListener('pointerdown', (e) => { drag = true; toVal(e); });
  const move = (e) => drag && toVal(e), up = () => { drag = false; };
  window.addEventListener('pointermove', move); window.addEventListener('pointerup', up);
  show();
  return { destroy() { L.stop(); F.destroyResize(); window.removeEventListener('pointermove', move); window.removeEventListener('pointerup', up); } };
}
