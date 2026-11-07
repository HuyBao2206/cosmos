// Thấu kính hấp dẫn: một thiên hà nền (nguồn) sau một khối lượng điểm (thấu kính). Kéo nguồn để thấy ảnh bị kéo thành cung,
// tách làm hai, và thành vành Einstein khi thẳng hàng.
// Dựng ảnh bằng dò tia ngược từng điểm ảnh theo phương trình thấu kính điểm: β = θ − θ_E² θ/|θ|² (đơn vị θ_E).
// Độ sáng bề mặt được bảo toàn (định lý Liouville), nên chỉ cần lấy mẫu nguồn tại β. Hàm pointLensImages có test.
import { frame, slider, buttons, readout, loop, drag, FONT, fmt } from './_kit.js';
import { pointLensImages } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Ảnh một thiên hà nền bị thấu kính hấp dẫn bẻ thành cung và vành Einstein');
  let bx = 0.6, by = 0.25, srcR = 0.28, showSrc = true, img = null, key = '';
  const say = readout(F.panel);
  slider(F.panel, { label: 'Kích thước thiên hà nền', min: 0.08, max: 0.6, step: 0.01, value: srcR, format: (v) => `${fmt(v, 2)} θ_E`, onInput: (v) => { srcR = v; show(); } });
  buttons(F.panel, [
    { label: 'Thẳng hàng (vành Einstein)', value: [0, 0] }, { label: 'Lệch ít (cung sáng)', value: [0.25, 0.1] }, { label: 'Lệch nhiều (hai ảnh)', value: [1.3, 0.4] },
    { label: 'Hiện/ẩn vị trí thật', value: 'src' },
  ], (v) => { if (v === 'src') showSrc = !showSrc; else [bx, by] = v; show(); });

  let view;
  const unDrag = drag(canvas, { onDrag: (x, y) => { if (!view) return; bx = (x - view.cx) / view.s; by = -(y - view.cy) / view.s; show(); } });

  function show() {
    const b = Math.hypot(bx, by);
    const im = pointLensImages(Math.max(b, 1e-6));
    say(`<span>Nguồn lệch <b>${fmt(b, 2)} θ_E</b> khỏi đường thẳng hàng</span>
      <span>${b < 0.02 ? 'Gần như thẳng hàng: ảnh thành <b>vành Einstein</b>' : `Hai ảnh ở <b>${fmt(im.theta[0], 2)}</b> và <b>${fmt(Math.abs(im.theta[1]), 2)} θ_E</b> về hai phía`}</span>
      <span>Tổng độ phóng đại (nguồn điểm) <b>${b < 0.02 ? 'rất lớn' : fmt(im.total, 2) + ' lần'}</b></span>`);
    L.kick();
  }

  // độ sáng của thiên hà nền tại (u, v) (đơn vị θ_E): đĩa elip có nhánh xoắn đơn giản
  function src(u, v) {
    const du = u - bx, dv = v - by;
    const r = Math.hypot(du / 1, dv / 0.75) / srcR;
    if (r > 1.3) return 0;
    const a = Math.atan2(dv, du);
    const arms = 0.55 + 0.45 * Math.cos(2 * a - 5 * r);
    return Math.max(0, Math.exp(-r * r * 2.2) * 1.2 + 0.35 * arms * Math.exp(-r * 2.2) * (r > 0.15 ? 1 : 0));
  }

  function render(w, h) {
    const k = `${w}x${h}:${bx},${by},${srcR}`;
    if (k === key) return;
    key = k;
    const step = w * h > 500000 ? 3 : 2;
    const W = Math.ceil(w / step), H = Math.ceil(h / step);
    const c = img?.width === W && img?.height === H ? img : Object.assign(document.createElement('canvas'), { width: W, height: H });
    const c2 = c.getContext('2d'), id = c2.createImageData(W, H);
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const tx = (i * step - view.cx) / view.s, ty = -(j * step - view.cy) / view.s;
      const t2 = tx * tx + ty * ty + 1e-9;
      const u = tx - tx / t2, v = ty - ty / t2;            // phương trình thấu kính
      const I = Math.min(1.4, src(u, v));
      const p = (j * W + i) * 4;
      id.data[p] = 255 * Math.min(1, I * 0.95); id.data[p + 1] = 255 * Math.min(1, I * 0.85); id.data[p + 2] = 255 * Math.min(1, I * 1.05 + 0.02); id.data[p + 3] = 255;
    }
    c2.putImageData(id, 0, 0);
    img = c;
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    view = { cx: w / 2, cy: h / 2, s: Math.min(w, h) / 4.2 };
    render(w, h);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true;
    ctx.drawImage(img, 0, 0, w, h);
    const { cx, cy, s } = view;
    // vòng Einstein (tham chiếu)
    ctx.strokeStyle = 'rgba(196,168,255,.35)'; ctx.setLineDash([3, 5]); ctx.beginPath(); ctx.arc(cx, cy, s, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    // thấu kính
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, 14);
    g.addColorStop(0, 'rgba(255,220,160,.95)'); g.addColorStop(1, 'rgba(255,200,120,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, 14, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10.5); ctx.textAlign = 'center';
    ctx.fillText('thấu kính (khối lượng)', cx, cy + 28);
    ctx.fillText('bán kính Einstein θ_E', cx, cy - s - 8);
    if (showSrc) {
      const px = cx + bx * s, py = cy - by * s;
      ctx.strokeStyle = accent; ctx.setLineDash([2, 3]);
      ctx.beginPath(); ctx.ellipse(px, py, srcR * s, srcR * s * 0.75, 0, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
      ctx.fillStyle = accent; ctx.textAlign = 'left'; ctx.fillText('vị trí thật của thiên hà nền (kéo được)', px + srcR * s + 6, py);
    }
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => { key = ''; L.kick(); });
  show();
  return { destroy() { L.stop(); unDrag(); F.destroyResize(); } };
}
