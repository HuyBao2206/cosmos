// Thước log: kéo con trỏ dọc thang khoảng cách (mỗi vạch = gấp 10 lần), đọc ra km / au / năm ánh sáng / parsec
// và thời gian ánh sáng đi. options.unit = 'au' (Hệ Mặt Trời → sao gần nhất) | 'ly' (sao gần → thiên hà xa).
import { frame, slider, buttons, readout, loop, fmtDuration, fmtKm, FONT, fmt, sci } from './_kit.js';
import { AU, LY, PC, lightTime } from '../../../shared/js/astro/physics.js';

const KM = 1000;
const SETS = {
  au: {
    min: 1e8, max: 1e17,
    start: AU,
    objects: [
      { name: 'Mặt Trăng', m: 384_400 * KM },
      { name: 'Mặt Trời', m: AU },
      { name: 'Sao Mộc', m: 5.2 * AU },
      { name: 'Sao Hải Vương', m: 30.07 * AU },
      { name: 'Nhật quyển dừng', m: 121.6 * AU, approx: true },
      { name: 'Voyager 1 (11/2026)', m: LY / 365.25, approx: true },
      { name: 'Đám mây Oort (rìa trong, ước tính)', short: 'Mây Oort (rìa trong)', m: 2000 * AU, approx: true },
      { name: 'Proxima Centauri', m: 4.2465 * LY },
    ],
  },
  ly: {
    min: 1 * LY, max: 1e9 * LY,
    start: 4.2465 * LY,
    objects: [
      { name: 'Proxima Centauri', m: 4.2465 * LY },
      { name: '61 Cygni', m: 11.4 * LY },
      { name: 'Tinh vân Orion', m: 1300 * LY, approx: true },
      { name: 'Tâm Ngân Hà', m: 26_700 * LY, approx: true },
      { name: 'Mây Magellan Lớn', m: 160_000 * LY, approx: true },
      { name: 'Andromeda', m: 2.5e6 * LY, approx: true },
      { name: 'NGC 5468', m: 1.3e8 * LY, approx: true },
    ],
  },
};

export function mount(host, opts = {}) {
  const set = SETS[opts.unit] || SETS.au;
  const F = frame(host, { note: 'Thang logarit · mỗi vạch lớn = xa gấp 10 lần' });
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Thước khoảng cách theo thang logarit với các thiên thể mốc');
  const lmin = Math.log10(set.min), lmax = Math.log10(set.max);
  let target = Math.log10(set.start), cur = target;

  const say = readout(F.panel);
  const s = slider(F.panel, {
    label: 'Khoảng cách', min: set.min, max: set.max, log: true, value: set.start,
    format: (v) => fmtKm(v),
    onInput: (v) => { target = Math.log10(v); show(v); L?.kick(); },
  });
  buttons(F.panel, set.objects.map((o) => ({ label: o.short || o.name, value: o.m })), (m) => s.set(m));

  function show(m) {
    const t = lightTime(m);
    const au = m / AU, ly = m / LY, pc = m / PC;
    const auTxt = au < 0.01 ? fmt(au, 5) : au < 100 ? fmt(au, 2) : au < 1e6 ? fmt(au, 0) : sci(au, 2);
    const lyTxt = ly < 1e-3 ? sci(ly, 2) : ly < 100 ? fmt(ly, ly < 1 ? 4 : 2) : ly < 1e6 ? fmt(ly, 0) : sci(ly, 2);
    say(`<span><b>${auTxt}</b> au</span><span><b>${lyTxt}</b> năm ánh sáng</span><span><b>${pc < 0.01 ? sci(pc, 2) : fmt(pc, pc < 100 ? 3 : 0)}</b> pc</span><span>ánh sáng đi mất <b>${fmtDuration(t)}</b></span>`);
  }

  const X = (lg) => 28 + ((lg - lmin) / (lmax - lmin)) * (size.w - 56);

  // Xếp nhãn so le để không chồng nhau
  function placeLabels() {
    ctx.font = FONT(12);
    const rows = [[], [], [], []];
    return set.objects.map((o) => {
      const x = X(Math.log10(o.m));
      const label = o.short || o.name;
      const w = ctx.measureText(label).width + 14;
      let r = 0;
      for (; r < rows.length; r++) if (rows[r].every(([a, b]) => x - w / 2 > b || x + w / 2 < a)) break;
      if (r === rows.length) return { ...o, x, r: 0, label, hidden: true };
      rows[r].push([x - w / 2, x + w / 2]);
      return { ...o, x, r, label };
    });
  }

  function draw(_, dt) {
    const { w, h } = size;
    if (!w) return true;
    cur += (target - cur) * Math.min(1, dt * 9);
    ctx.clearRect(0, 0, w, h);
    const y = Math.round(h * 0.56);
    // trục
    ctx.strokeStyle = 'rgba(236,230,216,.22)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(X(lmin), y); ctx.lineTo(X(lmax), y); ctx.stroke();
    ctx.font = FONT(10); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(236,230,216,.42)';
    const unitM = opts.unit === 'ly' ? LY : 1000;
    const step = size.w < 600 ? 3 : (lmax - lmin) > 10 ? 2 : 1;
    for (let e = Math.ceil(lmin); e <= lmax; e++) {
      const x = X(e);
      ctx.strokeStyle = 'rgba(236,230,216,.28)';
      ctx.beginPath(); ctx.moveTo(x, y - 5); ctx.lineTo(x, y + 5); ctx.stroke();
      for (let k = 2; k < 10; k++) {
        const xm = X(e + Math.log10(k));
        if (xm > X(lmax)) break;
        ctx.strokeStyle = 'rgba(236,230,216,.1)';
        ctx.beginPath(); ctx.moveTo(xm, y - 2); ctx.lineTo(xm, y + 2); ctx.stroke();
      }
      if ((e - Math.ceil(lmin)) % step === 0) {
        const v = Math.pow(10, e) / unitM;
        ctx.fillText(opts.unit === 'ly' ? `${v >= 1e6 ? sci(v, 0) : fmt(v)} ly` : `${sci(v, 0)} km`, x, y + 20);
      }
    }
    // thiên thể mốc
    const labels = placeLabels();
    const near = (o) => Math.abs(Math.log10(o.m) - cur) < 0.12;
    labels.forEach((o) => {
      const ly = y - 22 - o.r * 22;
      const hot = near(o);
      ctx.strokeStyle = hot ? accent : 'rgba(236,230,216,.2)';
      ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.moveTo(o.x, y); ctx.lineTo(o.x, ly + 4); ctx.stroke();
      ctx.setLineDash([]);
      ctx.fillStyle = hot ? accent : '#ece6d8';
      ctx.beginPath(); ctx.arc(o.x, y, hot ? 4 : 3, 0, Math.PI * 2); ctx.fill();
      if (o.hidden && !hot) return;
      ctx.font = FONT(12, hot ? 600 : 400);
      ctx.fillStyle = hot ? '#ece6d8' : 'rgba(236,230,216,.66)';
      ctx.textAlign = o.x < 70 ? 'left' : o.x > w - 70 ? 'right' : 'center';
      ctx.fillText(o.label, o.x, ly);
    });
    // con trỏ
    const px = X(cur);
    const g = ctx.createLinearGradient(px, 0, px, h);
    g.addColorStop(0, 'rgba(159,212,232,0)'); g.addColorStop(0.5, accent); g.addColorStop(1, 'rgba(159,212,232,0)');
    ctx.strokeStyle = g; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(px, 18); ctx.lineTo(px, h - 18); ctx.stroke();
    ctx.lineWidth = 1;
    ctx.fillStyle = accent;
    ctx.beginPath(); ctx.moveTo(px, y - 9); ctx.lineTo(px + 6, y); ctx.lineTo(px, y + 9); ctx.lineTo(px - 6, y); ctx.closePath(); ctx.fill();
    // vạch "ánh sáng" chạy từ gốc tới con trỏ
    ctx.strokeStyle = 'rgba(159,212,232,.35)'; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(X(lmin), y); ctx.lineTo(px, y); ctx.stroke();
    ctx.lineWidth = 1;
    return Math.abs(target - cur) > 1e-4;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  // kéo trực tiếp trên canvas
  let drag = false;
  const toVal = (e) => {
    const r = canvas.getBoundingClientRect();
    const t = Math.min(1, Math.max(0, (e.clientX - r.left - 28) / (r.width - 56)));
    s.set(Math.pow(10, lmin + t * (lmax - lmin)));
  };
  canvas.style.touchAction = 'pan-y';
  canvas.style.cursor = 'ew-resize';
  canvas.addEventListener('pointerdown', (e) => { drag = true; toVal(e); });
  const move = (e) => drag && toVal(e);
  window.addEventListener('pointermove', move);
  const up = () => { drag = false; };
  window.addEventListener('pointerup', up);
  show(set.start);
  return {
    destroy() { L.stop(); F.destroyResize(); window.removeEventListener('pointerup', up); window.removeEventListener('pointermove', move); },
  };
}
