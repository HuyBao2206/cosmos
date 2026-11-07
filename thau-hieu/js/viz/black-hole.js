// Ảnh một hố đen không quay (Schwarzschild) có đĩa bồi tụ mỏng, dựng bằng dò tia ngược.
// Với mỗi điểm ảnh (α, β) của người quan sát ở xa, tia sáng nằm trong một mặt phẳng; phương trình quỹ đạo photon
//   d²u/dφ² = 3u² − u   (u = M/r, đơn vị G = c = M = 1)
// được tích phân (RK4) từ vô cực với du/dφ = 1/b. Mỗi lần tia cắt mặt phẳng đĩa trong khoảng [r_in, r_out] là một lần "trúng đĩa"
// (lần đầu: ảnh chính; lần sau: ảnh thứ cấp vòng qua sau hố đen). Tia rơi qua r = 2 (chân trời) cho màu đen.
// Độ sáng: hệ số dịch chuyển tần số g = √(1 − 3/r) / (1 + Ω·α·sin i) với Ω = r^{−3/2} (đĩa Kepler quanh Schwarzschild),
// cường độ quan sát ∝ g⁴ · ε(r), ε(r) ∝ r⁻³(1 − √(6/r)) (dạng đĩa mỏng), màu theo nhiệt độ ∝ g · r^{−3/4}.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { isLowPower } from '../../../shared/js/util.js';

const R_IN = 6, R_OUT = 20;          // ISCO và mép ngoài đĩa (đơn vị GM/c²)
const FOV = 26;                      // nửa bề rộng trường nhìn (GM/c²)

/** Dò một tia: trả về danh sách các bán kính r tại những lần cắt mặt phẳng đĩa, và có bị nuốt không */
export function traceRay(b, phiCross0, maxCross = 3) {
  // u(φ): bắt đầu ở u≈0 (rất xa), u' = 1/b
  let u = 0, du = 1 / b, phi = 0;
  const h = Math.min(0.02, 0.5 / (1 + 6 / b));
  const hits = [];
  let k = 0, nextCross = phiCross0;
  for (let i = 0; i < 4000; i++) {
    // RK4 cho hệ (u, du)
    const f = (uu) => 3 * uu * uu - uu;
    const k1u = du, k1v = f(u);
    const k2u = du + 0.5 * h * k1v, k2v = f(u + 0.5 * h * k1u);
    const k3u = du + 0.5 * h * k2v, k3v = f(u + 0.5 * h * k2u);
    const k4u = du + h * k3v, k4v = f(u + h * k3u);
    const nu = u + (h / 6) * (k1u + 2 * k2u + 2 * k3u + k4u);
    const ndu = du + (h / 6) * (k1v + 2 * k2v + 2 * k3v + k4v);
    const nphi = phi + h;
    if (nphi >= nextCross && phi < nextCross) {
      const t = (nextCross - phi) / h, uc = u + (nu - u) * t;
      if (uc > 0) hits.push(1 / uc);
      k++; nextCross = phiCross0 + k * Math.PI;
      if (k >= maxCross) return { hits, captured: false };
    }
    u = nu; du = ndu; phi = nphi;
    if (u >= 0.5) return { hits, captured: true };     // qua chân trời r = 2M
    if (u <= 0 && phi > 0.1) return { hits, captured: false };   // thoát ra xa
  }
  return { hits, captured: false };
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, canvas } = F;
  canvas.setAttribute('aria-label', 'Ảnh mô phỏng hố đen với đĩa bồi tụ, ánh sáng phía sau bị bẻ cong lên phía trên');
  let inc = 80, beaming = true, job = null, img = null, done = false;
  const say = readout(F.panel);
  slider(F.panel, { label: 'Góc nhìn so với trục đĩa', min: 5, max: 88, step: 1, value: inc, format: (v) => `${fmt(v)}°`, onInput: (v) => { inc = v; start(); } });
  buttons(F.panel, [
    { label: 'Nhìn gần ngang (80°)', value: 80 }, { label: 'Nghiêng 45°', value: 45 }, { label: 'Nhìn từ trên (10°)', value: 10 },
    { label: 'Bật/tắt hiệu ứng Doppler', value: 'beam' },
  ], (v) => { if (v === 'beam') beaming = !beaming; else { inc = v; F.panel.querySelector('input').value = v; F.panel.querySelector('input').dispatchEvent(new Event('input')); return; } start(); });

  function start() {
    const { w, h } = size;
    if (!w) return;
    const scale = isLowPower() ? 0.32 : 0.45;
    const W = Math.max(120, Math.round(w * scale)), H = Math.max(80, Math.round(h * scale));
    img = new ImageData(W, H);
    job = { W, H, row: 0, i: inc * Math.PI / 180, beam: beaming };
    done = false;
    say(`<span>Góc nhìn <b>${fmt(inc)}°</b> so với trục quay của đĩa</span><span>Đĩa từ <b>${R_IN}</b> tới <b>${R_OUT}</b> GM/c² (mép trong là quỹ đạo tròn bền trong cùng)</span>
      <span>${beaming ? 'Bên trái sáng hơn: khí ở đó đang lao về phía ta (hiệu ứng Doppler tương đối tính)' : 'Đã tắt hiệu ứng Doppler: chỉ còn dịch chuyển đỏ hấp dẫn'}</span>`);
    L.kick();
  }

  function shade(r, alpha, si, beam) {
    if (r < R_IN || r > R_OUT) return null;
    const Om = Math.pow(r, -1.5);
    const g = Math.sqrt(1 - 3 / r) / (beam ? 1 + Om * alpha * si : 1);
    const em = Math.pow(r, -3) * (1 - Math.sqrt(R_IN / r));
    const I = Math.pow(g, 4) * em;
    const T = g * Math.pow(r / R_IN, -0.75);   // nhiệt độ tương đối
    return { I, T };
  }

  function work(budgetMs) {
    if (!job || done) return;
    const t0 = performance.now();
    const { W, H, i, beam } = job;
    const si = Math.sin(i), ci = Math.cos(i);
    const unit = (2 * FOV) / Math.min(W, H);      // GM/c² trên mỗi điểm ảnh
    while (job.row < H && performance.now() - t0 < budgetMs) {
      const y = job.row;
      for (let x = 0; x < W; x++) {
        const alpha = (x + 0.5 - W / 2) * unit;
        const beta = -(y + 0.5 - H / 2) * unit;
        const b = Math.hypot(alpha, beta) || 1e-6;
        // góc φ của lần cắt mặt phẳng đĩa đầu tiên: cosφ·cos i + sinφ·(β/b)·sin i = 0
        let phi0 = Math.atan2(-ci, (beta / b) * si);
        if (phi0 <= 0) phi0 += Math.PI;
        const { hits, captured } = traceRay(b, phi0, 3);
        let R = 0, G = 0, B = 0, transmit = 1;
        for (const r of hits) {
          const s = shade(r, alpha, si, beam);
          if (!s) continue;
          const v = Math.min(1.6, s.I * 900) * transmit;
          // màu: nóng → trắng xanh, nguội → cam đỏ
          const t = Math.min(1.4, s.T * 1.15);
          R += v * 255 * Math.min(1, 0.55 + 0.6 * t);
          G += v * 255 * Math.min(1, 0.25 + 0.6 * t * t);
          B += v * 255 * Math.min(1, 0.05 + 0.75 * t * t * t);
          transmit *= 0.15;    // đĩa gần như đục
        }
        if (captured && !hits.some((r) => r >= R_IN && r <= R_OUT)) { R = G = B = 0; }
        else if (!hits.some((r) => r >= R_IN && r <= R_OUT)) {
          // nền sao mờ (giả lập) để thấy chỗ tối
          const n = Math.sin(alpha * 12.9898 + beta * 78.233) * 43758.5453;
          const st = (n - Math.floor(n)) > 0.996 ? 120 : 6;
          R += st; G += st; B += st + 4;
        }
        const p = (y * W + x) * 4;
        img.data[p] = Math.min(255, R); img.data[p + 1] = Math.min(255, G); img.data[p + 2] = Math.min(255, B); img.data[p + 3] = 255;
      }
      job.row++;
    }
    if (job.row >= H) done = true;
  }

  const off = document.createElement('canvas');
  function draw() {
    const { w, h } = size;
    if (!w) return true;
    if (!job) start();
    work(opts.reduced ? 400 : 14);
    off.width = job.W; off.height = job.H;
    off.getContext('2d').putImageData(img, 0, 0);
    ctx.clearRect(0, 0, w, h);
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(off, 0, 0, w, h);
    // thước tỉ lệ: bán kính chân trời r = 2GM/c²
    const pxPerM = Math.min(w, h) / (2 * FOV);
    ctx.strokeStyle = 'rgba(236,230,216,.35)'; ctx.setLineDash([2, 4]);
    ctx.beginPath(); ctx.arc(w / 2, h / 2, 2 * pxPerM, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText('vòng đứt: kích thước chân trời sự kiện nếu không có bẻ cong ánh sáng', 12, h - 12);
    if (!done) { ctx.textAlign = 'right'; ctx.fillText(`đang dò tia… ${Math.round((job.row / job.H) * 100)} %`, w - 12, 18); }
    return !done;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => { job = null; L.kick(); });
  return { destroy() { L.stop(); F.destroyResize(); } };
}
