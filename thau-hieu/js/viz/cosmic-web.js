// Mạng lưới vũ trụ hình thành từ những gợn mật độ nhỏ: gần đúng Zel'dovich (1970), x = q + D(t)·∇ψ(q).
// ψ là một trường ngẫu nhiên Gauss (tổng các sóng phẳng với phổ năng lượng giảm theo số sóng) — hạt ban đầu xếp đều,
// kéo thanh "thời gian" (hệ số tăng trưởng D) để thấy chúng dồn thành tường, sợi, nút và để lại khoảng trống.
// Zel'dovich đúng ở giai đoạn đầu; về sau (khi các dòng cắt nhau) các mô phỏng N vật đầy đủ mới cho kết quả chính xác.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { isLowPower } from '../../../shared/js/util.js';

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Các hạt vật chất dồn từ phân bố gần đều thành mạng lưới sợi và khoảng trống');
  const G = isLowPower() ? 90 : 140;                  // lưới hạt G × G
  let D = 0.9, seed = 3, target = 0.9, disp = null;
  const say = readout(F.panel);
  const sD = slider(F.panel, { label: 'Thời gian (mức tăng trưởng của gợn mật độ)', min: 0, max: 1.4, step: 0.01, value: D, format: (v) => (v < 0.05 ? 'vũ trụ sơ khai' : v < 0.7 ? 'đang dồn lại' : v < 1.05 ? 'hiện nay (minh hoạ)' : 'tương lai'), onInput: (v) => { target = v; L.kick(); } });
  buttons(F.panel, [{ label: 'Từ đầu ▶', value: 'play' }, { label: 'Vũ trụ khác (gợn ngẫu nhiên mới)', value: 'seed' }], (v) => {
    if (v === 'seed') { seed++; build(); } else { D = 0; target = 0.9; sD.set(0.9); D = 0; }
    L.kick();
  });

  function build() {
    const r = rng(seed * 7919 + 1);
    const modes = [];
    for (let i = 0; i < 90; i++) {
      const k = 2 + Math.pow(r(), 1.6) * 14;           // số sóng (đơn vị 2π/hộp)
      const a = r() * Math.PI * 2;
      const amp = Math.pow(k, -2.1) * (0.6 + 0.8 * r());
      modes.push([k * Math.cos(a) * 2 * Math.PI, k * Math.sin(a) * 2 * Math.PI, amp, r() * Math.PI * 2]);
    }
    // độ dịch chuyển = ∇ψ: với ψ = Σ A sin(k·q + φ) → ∇ψ = Σ A k cos(k·q + φ)
    disp = new Float32Array(G * G * 2);
    let mx = 0;
    for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
      const qx = (i + 0.5) / G, qy = (j + 0.5) / G;
      let dx = 0, dy = 0;
      for (const [kx, ky, A, ph] of modes) { const c = A * Math.cos(kx * qx + ky * qy + ph); dx += c * kx; dy += c * ky; }
      disp[(j * G + i) * 2] = -dx; disp[(j * G + i) * 2 + 1] = -dy;
      mx = Math.max(mx, Math.hypot(dx, dy));
    }
    // chuẩn hoá: D = 1 ứng với dịch chuyển cực đại ~ 6 ô lưới
    for (let n = 0; n < disp.length; n++) disp[n] *= (6 / G) / mx;
    say('<span>Mỗi chấm là một “hạt” vật chất (chủ yếu là vật chất tối). Lúc đầu gần như đều — như bức xạ phông vi sóng cho thấy, chênh lệch chỉ cỡ một phần trăm nghìn.</span><span>Hấp dẫn làm vùng hơi đặc hút thêm: vật chất chảy thành tường, sợi, rồi dồn về các nút — nơi các đám thiên hà hình thành.</span>');
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (opts.reduced) D = target; else D += (target - D) * Math.min(1, dt * 1.5);
    ctx.clearRect(0, 0, w, h);
    const S = Math.min(w, h) - 20, x0 = (w - S) / 2, y0 = 10;
    ctx.globalCompositeOperation = 'lighter';
    ctx.fillStyle = `rgba(166,232,184,${0.18 + 0.05 * (1 - Math.min(1, D))})`;
    const sc = D * D * 0.9 + D * 0.1;    // tăng trưởng nhanh dần
    for (let j = 0; j < G; j++) for (let i = 0; i < G; i++) {
      const n = (j * G + i) * 2;
      let x = (i + 0.5) / G + disp[n] * sc * 4, y = (j + 0.5) / G + disp[n + 1] * sc * 4;
      x -= Math.floor(x); y -= Math.floor(y);           // hộp tuần hoàn
      ctx.fillRect(x0 + x * S, y0 + y * S, 1.6, 1.6);
    }
    ctx.globalCompositeOperation = 'source-over';
    ctx.strokeStyle = 'rgba(236,230,216,.12)'; ctx.strokeRect(x0, y0, S, S);
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText('mô hình 2D, gần đúng Zel’dovich', x0 + 6, y0 + S - 8);
    return Math.abs(target - D) > 0.002;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  build();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
