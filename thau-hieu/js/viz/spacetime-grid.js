// Kéo một vật nặng trên lưới không gian: lưới lõm xuống (hình nhúng của không gian quanh một khối lượng, phối cảnh 3D),
// và các tia sáng song song đi qua bị bẻ cong về phía vật.
// Tia sáng: tích phân số trong gần đúng trường yếu với gia tốc vuông góc 2GM/r² (gấp đôi Newton) → góc lệch toàn phần 4GM/(c²b),
// đúng giá trị của thuyết tương đối tổng quát (lightDeflection, có test: 1,75″ ở mép Mặt Trời). Độ mạnh được phóng đại để nhìn thấy.
// Cảnh báo sư phạm: lưới lõm chỉ là hình ảnh của độ cong KHÔNG GIAN; độ cong của THỜI GIAN mới là phần chính gây ra rơi tự do.
import { frame, slider, buttons, readout, loop, drag, FONT, fmt } from './_kit.js';
import { lightDeflection, schwarzschildRadius, M_SUN, R_SUN, RAD_TO_ARCSEC } from '../../../shared/js/astro/physics.js';

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Lưới không-thời gian bị một khối lượng uốn cong, tia sáng đi qua bị bẻ hướng');
  let mass = 0.5, mx = 0.5, my = 0.5, rays = true;     // vị trí vật (0–1) trên mặt phẳng
  const say = readout(F.panel);
  slider(F.panel, { label: 'Khối lượng (phóng đại để thấy rõ)', min: 0.05, max: 1, step: 0.01, value: mass, format: (v) => `${fmt(v * 100)} %`, onInput: (v) => { mass = v; show(); } });
  buttons(F.panel, [{ label: 'Bật/tắt tia sáng', value: 'rays' }, { label: 'Đưa vật về giữa', value: 'center' }], (v) => {
    if (v === 'rays') rays = !rays; else { mx = 0.5; my = 0.5; }
    L.kick();
  });

  function show() {
    const sun = lightDeflection(M_SUN, R_SUN) * RAD_TO_ARCSEC;
    say(`<span>Kéo vật nặng trên mặt lưới.</span><span>Với Mặt Trời thật, tia sáng sượt mép bị lệch <b>${fmt(sun, 2)}″</b> — gấp đôi dự đoán theo Newton.</span>
      <span>Bán kính Schwarzschild của Mặt Trời <b>${fmt(schwarzschildRadius(M_SUN) / 1000, 2)} km</b>, nhỏ hơn bán kính thật ~236 000 lần: độ cong rất nhỏ.</span>`);
    L.kick();
  }

  // phối cảnh: mặt phẳng (u,v) ∈ [0,1]², chiều sâu z ≤ 0 (lõm)
  let proj;
  const depth = (u, v) => {
    const d = Math.hypot(u - mx, v - my);
    return -mass * 0.22 / Math.sqrt(d * d + 0.004 + 0.02 * (1 - mass));
  };
  function setupProj(w, h) {
    const cx = w / 2, top = h * 0.18, bot = h * 0.95;
    proj = (u, v, z) => {
      // v = 0 xa (trên), v = 1 gần (dưới); thu nhỏ theo khoảng cách
      const s = 0.45 + 0.55 * v;
      const x = cx + (u - 0.5) * w * 0.95 * s;
      const y = top + (bot - top) * (v * 0.85 + 0.15 * v * v) - z * h * 0.18 * s;
      return [x, y];
    };
  }
  const unproj = (x, y) => {
    // tìm (u,v) gần nhất trên mặt phẳng z = 0 (nghịch đảo xấp xỉ)
    const { w, h } = size; const top = h * 0.18, bot = h * 0.95;
    let v = (y - top) / (bot - top); v = Math.max(0.02, Math.min(0.98, v));
    for (let i = 0; i < 6; i++) { const f = v * 0.85 + 0.15 * v * v - (y - top) / (bot - top); v -= f / (0.85 + 0.3 * v); }
    const s = 0.45 + 0.55 * v;
    const u = 0.5 + (x - w / 2) / (w * 0.95 * s);
    return [Math.max(0.05, Math.min(0.95, u)), Math.max(0.08, Math.min(0.95, v))];
  };
  const unDrag = drag(canvas, { onDrag: (x, y) => { [mx, my] = unproj(x, y); L.kick(); } });
  canvas.tabIndex = 0;
  canvas.addEventListener('keydown', (e) => {
    const d = { ArrowLeft: [-0.03, 0], ArrowRight: [0.03, 0], ArrowUp: [0, -0.03], ArrowDown: [0, 0.03] }[e.key];
    if (d) { mx = Math.max(0.05, Math.min(0.95, mx + d[0])); my = Math.max(0.08, Math.min(0.95, my + d[1])); L.kick(); e.preventDefault(); }
  });

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    setupProj(w, h);
    ctx.clearRect(0, 0, w, h);
    const N = 26;
    // lưới
    for (let k = 0; k <= N; k++) {
      for (const dir of [0, 1]) {
        ctx.beginPath();
        for (let i = 0; i <= 80; i++) {
          const a = k / N, b = i / 80;
          const u = dir ? a : b, v = dir ? b : a;
          const [x, y] = proj(u, v, depth(u, v));
          i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
        }
        const near = dir ? 0.5 : k / N;
        ctx.strokeStyle = `rgba(196,168,255,${0.12 + 0.25 * near})`; ctx.stroke();
      }
    }
    // tia sáng: đi theo hướng +u (trái → phải) trên mặt phẳng, tích phân gia tốc vuông góc
    if (rays) {
      const K = mass * 0.0016;      // "2GM/c²" trong đơn vị mặt phẳng (phóng đại)
      for (let j = 0; j < 9; j++) {
        let u = 0.0, v = 0.12 + j * 0.1, du = 1, dv = 0;
        const pts = [];
        for (let s = 0; s < 400; s++) {
          const ru = u - mx, rv = v - my, r2 = ru * ru + rv * rv + 0.0004, r = Math.sqrt(r2);
          // gia tốc 2GM/r² hướng về vật, chỉ giữ thành phần vuông góc với hướng bay (ánh sáng không đổi tốc độ)
          let au = -2 * K * ru / (r2 * r), av = -2 * K * rv / (r2 * r);
          const dot = au * du + av * dv; au -= dot * du; av -= dot * dv;
          const ds = 0.003;
          du += au * ds; dv += av * ds;
          const n = Math.hypot(du, dv); du /= n; dv /= n;
          u += du * ds; v += dv * ds;
          if (r < 0.03 + 0.03 * mass) break;
          pts.push(proj(u, v, depth(u, v)));
          if (u > 1 || v < 0 || v > 1) break;
        }
        ctx.strokeStyle = 'rgba(255,240,200,.75)'; ctx.lineWidth = 1.3; ctx.beginPath();
        pts.forEach(([x, y], i) => (i ? ctx.lineTo(x, y) : ctx.moveTo(x, y))); ctx.stroke(); ctx.lineWidth = 1;
      }
    }
    // vật nặng
    const [ox, oy] = proj(mx, my, depth(mx, my) * 0.9);
    const R = 8 + mass * 16;
    const g = ctx.createRadialGradient(ox - R * 0.3, oy - R * 0.4, 1, ox, oy, R);
    g.addColorStop(0, '#fff7e0'); g.addColorStop(0.5, '#ffd27a'); g.addColorStop(1, '#b8792c');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(ox, oy - R * 0.6, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = accent; ctx.setLineDash([2, 3]); ctx.beginPath(); ctx.arc(ox, oy - R * 0.6, R + 6, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10.5); ctx.textAlign = 'left';
    ctx.fillText('Kéo vật nặng · tia sáng đi từ trái sang phải', 12, 18);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); unDrag(); F.destroyResize(); } };
}
