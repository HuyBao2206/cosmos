// Khẩu pháo của Newton: bắn ngang từ một ngọn núi rất cao (giả định không có không khí) với vận tốc chỉnh được.
// Quỹ đạo tích phân số (bước Velocity Verlet, GM Trái Đất thật) → rơi xuống, bay vòng quanh, hay thoát hẳn.
// Ngưỡng ở độ cao h: v₁ = √(GM/r), v₂ = √(2GM/r). Ở mặt đất v₁ ≈ 7,9 km/s, v₂ ≈ 11,2 km/s.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { GM_EARTH, R_EARTH, orbitType } from '../../../shared/js/astro/physics.js';

const H0 = 400e3;   // độ cao "đỉnh núi" — bằng độ cao trạm ISS để so sánh
const R0 = R_EARTH + H0;
const V1 = Math.sqrt(GM_EARTH / R0), V2 = Math.sqrt(2 * GM_EARTH / R0);

function simulate(v) {
  // trả về danh sách điểm [x, y] (m) và kết cục
  let x = 0, y = R0, vx = v, vy = 0;
  const acc = (x, y) => { const r = Math.hypot(x, y); const k = -GM_EARTH / r ** 3; return [k * x, k * y]; };
  let [ax, ay] = acc(x, y);
  const pts = [[x, y]];
  const dt = 4;
  let fate = 'orbit', angle = 0, prev = Math.atan2(x, y);
  for (let i = 0; i < 40000; i++) {
    x += vx * dt + 0.5 * ax * dt * dt; y += vy * dt + 0.5 * ay * dt * dt;
    const [nx, ny] = acc(x, y);
    vx += 0.5 * (ax + nx) * dt; vy += 0.5 * (ay + ny) * dt; ax = nx; ay = ny;
    if (i % 4 === 0) pts.push([x, y]);
    const r = Math.hypot(x, y);
    if (r < R_EARTH) { fate = 'crash'; pts.push([x, y]); break; }
    if (r > 12 * R_EARTH) { fate = 'escape'; break; }
    const a = Math.atan2(x, y); let d = a - prev; if (d < -Math.PI) d += 2 * Math.PI; if (d > Math.PI) d -= 2 * Math.PI; angle += d; prev = a;
    if (Math.abs(angle) >= 2 * Math.PI) { fate = 'orbit'; pts.push([x, y]); break; }
  }
  return { pts, fate };
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Khẩu pháo của Newton bắn ngang quanh Trái Đất với vận tốc chỉnh được');
  let v = 7000, sim = simulate(v), t0 = performance.now(), trails = [];
  const say = readout(F.panel);
  const sV = slider(F.panel, { label: 'Vận tốc bắn ngang', min: 2000, max: 12500, step: 10, value: v, format: (x) => `${fmt(x / 1000, 2)} km/s`, onInput: (x) => { v = x; fire(); } });
  buttons(F.panel, [
    { label: '5 km/s', value: 5000 }, { label: 'Vận tốc cấp 1 (tròn)', value: V1 }, { label: '9 km/s (elip)', value: 9000 },
    { label: 'Vận tốc cấp 2 (thoát)', value: V2 + 5 }, { label: 'Xoá vết', value: 'clear' },
  ], (x) => { if (x === 'clear') { trails = []; L.kick(); return; } sV.set(x); });

  function fire() {
    if (sim) trails = [...trails.slice(-4), sim];
    sim = simulate(v); t0 = performance.now();
    const kind = orbitType(GM_EARTH, R0, v);
    const fateTxt = sim.fate === 'crash' ? 'rơi xuống mặt đất' : kind === 'bound' ? (Math.abs(v - V1) < 40 ? 'bay vòng tròn quanh Trái Đất' : 'bay vòng quanh trên một quỹ đạo elip') : 'thoát khỏi Trái Đất, không bao giờ quay lại';
    say(`<span>Viên đạn <b>${fateTxt}</b></span><span>Ở độ cao ${fmt(H0 / 1000)} km: v₁ = <b>${fmt(V1 / 1000, 2)} km/s</b>, v₂ = <b>${fmt(V2 / 1000, 2)} km/s</b></span>
      ${kind === 'bound' && sim.fate !== 'crash' ? `<span>Chu kỳ quỹ đạo <b>${fmt(2 * Math.PI * Math.sqrt((1 / (2 / R0 - v * v / GM_EARTH)) ** 3 / GM_EARTH) / 60, 0)} phút</b></span>` : ''}`);
    L.kick();
  }

  function draw(now) {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    // khung nhìn: từ 1,15 R phía trên tâm tới 2,45 R phía dưới (đủ chứa elip 9 km/s), ±2,1 R hai bên
    const s = Math.min(w / (4.2 * R_EARTH), (h - 16) / (3.6 * R_EARTH));
    const cx = w / 2, cy = 8 + 1.15 * R_EARTH * s;
    const P = ([x, y]) => [cx + x * s, cy - y * s];
    // Trái Đất
    const R = R_EARTH * s;
    const g = ctx.createRadialGradient(cx - R * 0.3, cy - R * 0.4, R * 0.1, cx, cy, R);
    g.addColorStop(0, '#5d8fd8'); g.addColorStop(0.7, '#1f3d78'); g.addColorStop(1, '#0d1a36');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();
    ctx.strokeStyle = 'rgba(159,212,232,.35)'; ctx.beginPath(); ctx.arc(cx, cy, R + 2, 0, Math.PI * 2); ctx.stroke();
    // núi (cao phóng đại để nhìn thấy)
    const [mx, my] = P([0, R0]);
    ctx.fillStyle = '#6b6252'; ctx.beginPath(); ctx.moveTo(mx - 14, cy - R + 3); ctx.lineTo(mx, my); ctx.lineTo(mx + 14, cy - R + 3); ctx.closePath(); ctx.fill();
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText(`núi cao ${fmt(H0 / 1000)} km (không có không khí)`, mx + 16, my - 4);
    // vết cũ
    trails.forEach((tr, i) => {
      ctx.strokeStyle = `rgba(236,230,216,${0.08 + i * 0.03})`; ctx.beginPath();
      tr.pts.forEach((p, j) => { const [x, y] = P(p); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }); ctx.stroke();
    });
    // vết hiện tại, vẽ dần
    const n = sim.pts.length;
    const k = opts.reduced ? n : Math.min(n, Math.floor(((now - t0) / 4200) * n) + 2);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.8; ctx.beginPath();
    for (let j = 0; j < k; j++) { const [x, y] = P(sim.pts[j]); j ? ctx.lineTo(x, y) : ctx.moveTo(x, y); }
    ctx.stroke(); ctx.lineWidth = 1;
    const [bx, by] = P(sim.pts[Math.max(0, k - 1)]);
    ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(bx, by, 4, 0, Math.PI * 2); ctx.fill();
    return k < n;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  fire();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
