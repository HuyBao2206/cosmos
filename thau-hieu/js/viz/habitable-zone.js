// Vùng có thể sống được quanh các ngôi sao dãy chính khác nhau, theo hệ số của Kopparapu và cộng sự (2013/2014):
// biên bảo thủ (hiệu ứng nhà kính mất kiểm soát → nhà kính cực đại) và biên lạc quan (Sao Kim gần đây → Sao Hoả sơ khai).
// Độ trưng và nhiệt độ sao từ quan hệ dãy chính trong physics.js (xấp xỉ giáo khoa). Kéo một hành tinh để đọc nhiệt độ cân bằng.
import { frame, slider, buttons, readout, loop, drag, FONT, fmt } from './_kit.js';
import { hzDistance, msLuminosity, msRadius, teff, equilibriumTemp, L_SUN, AU } from '../../../shared/js/astro/physics.js';

const PLANETS = [['Sao Kim', 0.723], ['Trái Đất', 1], ['Sao Hoả', 1.524]];

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Vùng có thể sống được quanh ngôi sao, thay đổi theo khối lượng sao');
  let M = 1, dPl = 1, star;
  const say = readout(F.panel);
  const sM = slider(F.panel, { label: 'Khối lượng ngôi sao', min: 0.1, max: 1.5, log: true, value: M, format: (v) => `${fmt(v, 2)} M☉`, onInput: (v) => { M = v; show(); } });
  buttons(F.panel, [
    { label: 'Sao lùn đỏ 0,1 M☉', value: 0.1 }, { label: 'Sao lùn K (0,7 M☉)', value: 0.7 }, { label: 'Mặt Trời', value: 1 }, { label: 'Sao F (1,4 M☉)', value: 1.4 },
  ], (v) => sM.set(v));

  function calc() {
    const L = M === 1 ? 1 : msLuminosity(M), R = M === 1 ? 1 : msRadius(M), T = M === 1 ? 5772 : teff(L, R);
    return { L, T, rv: hzDistance('recentVenus', T, L), rg: hzDistance('runawayGreenhouse', T, L), mg: hzDistance('maximumGreenhouse', T, L), em: hzDistance('earlyMars', T, L) };
  }
  function show() {
    star = calc();
    const s = star;
    if (dPl < s.rv * 0.5 || dPl > s.em * 2) dPl = (s.rg + s.mg) / 2;
    const Teq = equilibriumTemp(s.L * L_SUN, dPl * AU, 0.3);
    say(`<span>Sao: độ trưng <b>${s.L < 0.01 ? fmt(s.L * 1000, 1) + ' phần nghìn' : fmt(s.L, 2)} L☉</b>, bề mặt <b>~${fmt(Math.round(s.T / 10) * 10)} K</b></span>
      <span>Vùng sống được (bảo thủ) <b>${fmt(s.rg, s.rg < 0.1 ? 3 : 2)}–${fmt(s.mg, s.mg < 0.1 ? 3 : 2)} au</b>; lạc quan ${fmt(s.rv, s.rv < 0.1 ? 3 : 2)}–${fmt(s.em, s.em < 0.1 ? 3 : 2)} au</span>
      <span>Hành tinh thử ở ${fmt(dPl, dPl < 0.1 ? 3 : 2)} au: nhiệt độ cân bằng <b>${fmt(Teq - 273.15, 0)} °C</b> (chưa tính hiệu ứng nhà kính; Trái Đất: khoảng −18 °C, thực tế +15 °C)</span>`);
    L.kick();
  }

  let AX;
  const unDrag = drag(canvas, { onDrag: (x) => { if (!AX) return; dPl = Math.max(AX.min, Math.min(AX.max, AX.V(x))); show(); } });

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    const s = star;
    ctx.clearRect(0, 0, w, h);
    const x0 = 30, x1 = w - 20, cy = h * 0.5;
    const min = s.rv * 0.25, max = Math.max(s.em * 2.2, 0.05);
    const lo = Math.log10(min), hi = Math.log10(max);
    const X = (d) => x0 + ((Math.log10(d) - lo) / (hi - lo)) * (x1 - x0);
    AX = { min, max, V: (x) => 10 ** (lo + ((x - x0) / (x1 - x0)) * (hi - lo)) };
    // dải vùng sống được
    ctx.fillStyle = 'rgba(127,224,212,.10)'; ctx.fillRect(X(s.rv), cy - 60, X(s.em) - X(s.rv), 120);
    ctx.fillStyle = 'rgba(127,224,212,.22)'; ctx.fillRect(X(s.rg), cy - 60, X(s.mg) - X(s.rg), 120);
    ctx.fillStyle = 'rgba(255,140,100,.06)'; ctx.fillRect(x0, cy - 60, X(s.rv) - x0, 120);
    ctx.fillStyle = 'rgba(140,170,255,.06)'; ctx.fillRect(X(s.em), cy - 60, x1 - X(s.em), 120);
    ctx.font = FONT(10.5); ctx.textAlign = 'center'; ctx.fillStyle = 'rgba(236,230,216,.7)';
    ctx.fillText('quá nóng', (x0 + X(s.rv)) / 2, cy - 68); ctx.fillText('vùng có thể sống được', (X(s.rg) + X(s.mg)) / 2, cy - 68); ctx.fillText('quá lạnh', (X(s.em) + x1) / 2, cy - 68);
    // sao
    const sc = s.T > 6000 ? '#f4f6ff' : s.T > 5000 ? '#fff1d8' : s.T > 3800 ? '#ffd2a0' : '#ff9e70';
    const g = ctx.createRadialGradient(x0 - 6, cy, 0, x0 - 6, cy, 30);
    g.addColorStop(0, '#fff'); g.addColorStop(0.4, sc); g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x0 - 6, cy, 30, 0, Math.PI * 2); ctx.fill();
    // hành tinh Hệ Mặt Trời (khi là Mặt Trời)
    if (Math.abs(M - 1) < 0.02) PLANETS.forEach(([n, d]) => { const x = X(d); ctx.fillStyle = 'rgba(236,230,216,.7)'; ctx.beginPath(); ctx.arc(x, cy + 34, 3, 0, Math.PI * 2); ctx.fill(); ctx.fillText(n, x, cy + 50); });
    // hành tinh thử (kéo được)
    const px = X(dPl);
    ctx.strokeStyle = accent; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(px, cy, 9, 0, Math.PI * 2); ctx.stroke(); ctx.lineWidth = 1;
    ctx.fillStyle = '#7fb0ff'; ctx.beginPath(); ctx.arc(px, cy, 5, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ece6d8'; ctx.fillText('kéo hành tinh', px, cy - 16);
    // trục
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5);
    for (let e = -3; e <= 1; e++) for (const m of [1, 2, 5]) { const d = m * 10 ** e; if (d < min || d > max) continue; const x = X(d); ctx.fillRect(x, cy + 62, 1, 4); if (m === 1 || (hi - lo) < 1.5) ctx.fillText(`${fmt(d, d < 0.1 ? 3 : d < 1 ? 2 : 0)}`, x, cy + 78); }
    ctx.fillText('khoảng cách tới sao (au, thang log)', (x0 + x1) / 2, cy + 94);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); unDrag(); F.destroyResize(); } };
}
