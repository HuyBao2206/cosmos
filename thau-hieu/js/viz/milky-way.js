// Ngân Hà nhìn từ trên xuống (hình minh hoạ dựng bằng hạt, không phải ảnh chụp — chưa tàu nào ra khỏi đĩa Ngân Hà):
// xoắn ốc có thanh, đường kính đĩa ~100 000 năm ánh sáng, Mặt Trời cách tâm R₀ ≈ 27 000 năm ánh sáng (GRAVITY 2021),
// trên nhánh Orion. Thanh trượt "thời gian" cho Mặt Trời đi quanh tâm: một vòng ≈ 2πR₀/v (physics.js).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { circularPeriodYears, KPC } from '../../../shared/js/astro/physics.js';
import { isLowPower } from '../../../shared/js/util.js';

const R0_LY = 27000, V = 230e3, R0 = 8.275 * KPC;
const T_GAL = circularPeriodYears(R0, V);          // ≈ 220 triệu năm
const DISK_LY = 50000;                              // bán kính đĩa (minh hoạ)

function rng(seed) { return () => ((seed = (seed * 16807) % 2147483647) - 1) / 2147483646; }
const gauss = (r) => { let u = 0; while (!u) u = r(); return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r()); };

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Hình minh hoạ Ngân Hà nhìn từ trên xuống, vị trí Mặt Trời trên nhánh Orion');
  let tMyr = 0, side = false;
  const r = rng(11), pts = [];
  const N = isLowPower() ? 5000 : 11000;
  const ARMS = [[0, 1], [Math.PI, 1], [Math.PI / 2, 0.55], [Math.PI * 1.5, 0.55]];   // 2 nhánh chính + 2 phụ
  for (let i = 0; i < N; i++) {
    const u = r();
    if (u < 0.12) { const x = (r() * 2 - 1) * 0.2, y = gauss(r) * 0.035; const a = 0.47; pts.push([x * Math.cos(a) - y * Math.sin(a), x * Math.sin(a) + y * Math.cos(a), 1]); continue; }   // thanh
    if (u < 0.2) { const rr = Math.abs(gauss(r)) * 0.07; const t = r() * 6.283; pts.push([rr * Math.cos(t), rr * Math.sin(t), 1]); continue; }   // chỗ phình
    const arm = ARMS[Math.floor(r() * ARMS.length)];
    if (r() > arm[1] + 0.25) { const rr = 0.1 + Math.pow(r(), 0.8) * 0.9, t = r() * 6.283; pts.push([rr * Math.cos(t), rr * Math.sin(t), 0]); continue; }
    const rr = 0.18 + Math.pow(r(), 0.85) * 0.85;
    const th = arm[0] + Math.log(rr / 0.18) / 0.22 + gauss(r) * 0.22;
    pts.push([rr * Math.cos(th), rr * Math.sin(th), 2]);
  }
  // nhánh Orion: một đoạn ngắn quanh vị trí Mặt Trời
  const sunR = R0_LY / DISK_LY, sunA0 = -2.05;
  for (let i = 0; i < 500; i++) { const a = sunA0 + (r() - 0.5) * 0.9, rr = sunR + (a - sunA0) * 0.12 + gauss(r) * 0.02; pts.push([rr * Math.cos(a), rr * Math.sin(a), 2]); }

  const say = readout(F.panel);
  slider(F.panel, { label: 'Thời gian (triệu năm)', min: 0, max: 450, step: 1, value: 0, format: (v) => `${fmt(v)} triệu năm`, onInput: (v) => { tMyr = v; show(); } });
  buttons(F.panel, [{ label: 'Nhìn từ trên / nhìn ngang', value: 'side' }, { label: 'Về hiện tại', value: 'now' }], (v) => {
    if (v === 'side') side = !side; else { tMyr = 0; F.panel.querySelector('input').value = 0; F.panel.querySelector('input').dispatchEvent(new Event('input')); }
    L.kick();
  });

  function show() {
    say(`<span>Mặt Trời cách tâm <b>~${fmt(R0_LY)} năm ánh sáng</b>, đi với <b>~${fmt(V / 1000)} km/s</b></span>
      <span>Một vòng quanh tâm ("năm thiên hà") ≈ <b>${fmt(T_GAL / 1e6)} triệu năm</b></span>
      <span>Sau ${fmt(tMyr)} triệu năm: <b>${fmt(tMyr / (T_GAL / 1e6), 2)}</b> vòng${tMyr >= 66 ? ' · khủng long tuyệt chủng cách nay 66 triệu năm' : ''}</span>`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const cx = w / 2, cy = h / 2, R = Math.min(w, h) * 0.46;
    // các nhánh quay chậm hơn sao (sóng mật độ), minh hoạ: cho đĩa quay theo vận tốc góc tại R0 nhân 0,5
    const rot = -(tMyr / (T_GAL / 1e6)) * Math.PI * 2;
    const rotArms = rot * 0.5;
    const ca = Math.cos(rotArms), sa = Math.sin(rotArms);
    const flat = side ? 0.06 : 1;
    ctx.globalCompositeOperation = 'lighter';
    for (const [x, y, k] of pts) {
      const X = x * ca - y * sa, Y = (x * sa + y * ca) * flat;
      ctx.fillStyle = k === 1 ? 'rgba(255,214,170,.5)' : k === 2 ? 'rgba(175,205,255,.45)' : 'rgba(220,215,230,.25)';
      ctx.fillRect(cx + X * R, cy + Y * R, 1.4, 1.4);
    }
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, R * 0.14);
    g.addColorStop(0, 'rgba(255,225,185,.6)'); g.addColorStop(1, 'rgba(255,200,150,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.ellipse(cx, cy, R * 0.14, R * 0.14 * (side ? 0.35 : 1), 0, 0, Math.PI * 2); ctx.fill();
    ctx.globalCompositeOperation = 'source-over';
    // Mặt Trời
    const a = sunA0 + rot;
    const sx = cx + Math.cos(a) * sunR * R, sy = cy + Math.sin(a) * sunR * R * flat;
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(sx, sy, 7, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#fff6d0'; ctx.beginPath(); ctx.arc(sx, sy, 2.5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = sx > cx ? 'left' : 'right';
    ctx.fillText('Mặt Trời', sx + (sx > cx ? 12 : -12), sy + 4);
    if (!side) {
      ctx.setLineDash([2, 4]); ctx.strokeStyle = 'rgba(236,230,216,.15)'; ctx.beginPath(); ctx.arc(cx, cy, sunR * R, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);
    }
    // thước 10 000 năm ánh sáng
    const bar = (10000 / DISK_LY) * R;
    ctx.strokeStyle = 'rgba(236,230,216,.6)'; ctx.beginPath(); ctx.moveTo(14, h - 16); ctx.lineTo(14 + bar, h - 16); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10); ctx.textAlign = 'left'; ctx.fillText('10 000 năm ánh sáng', 14, h - 22);
    ctx.textAlign = 'right'; ctx.fillText('hình minh hoạ dựng từ dữ liệu, không phải ảnh chụp', w - 12, h - 10);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
