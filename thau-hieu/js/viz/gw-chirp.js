// Sóng hấp dẫn: hai hố đen xoắn ốc vào nhau. Tần số sóng tăng dần ("tiếng chíp") theo gần đúng Newton bậc tứ cực:
// f(τ) = (1/π)(5/(256τ))^{3/8}(G𝓜/c³)^{−5/8}, biên độ ∝ f^{2/3}. Vòng hạt thử phía dưới co giãn theo phân cực "+".
// Dạng sóng sau khi hợp nhất (ringdown) vẽ định tính. Hàm gwFrequency/gwTimeToMerger/chirpMass có test (GW150914).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { chirpMass, gwFrequency, gwTimeToMerger, M_SUN, G, C } from '../../../shared/js/astro/physics.js';

const F_START = 30;         // Hz — gần ngưỡng nhạy của LIGO

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Hai hố đen xoắn ốc vào nhau và dạng sóng hấp dẫn tăng dần tần số');
  let m1 = 36, m2 = 29, slow = 8, t = 0;
  const say = readout(F.panel);
  const s1 = slider(F.panel, { label: 'Khối lượng hố đen 1', min: 1.4, max: 80, step: 0.1, value: m1, format: (v) => `${fmt(v, 1)} M☉`, onInput: (v) => { m1 = v; reset(); } });
  const s2 = slider(F.panel, { label: 'Khối lượng hố đen 2', min: 1.4, max: 80, step: 0.1, value: m2, format: (v) => `${fmt(v, 1)} M☉`, onInput: (v) => { m2 = v; reset(); } });
  buttons(F.panel, [
    { label: 'GW150914 (36 + 29)', value: [36, 29] }, { label: 'GW170817 (sao neutron)', value: [1.46, 1.27] }, { label: 'Phát lại', value: 'replay' },
  ], (v) => { if (v === 'replay') { reset(); return; } s1.set(v[0]); s2.set(v[1]); });

  const Mc = () => chirpMass(m1, m2) * M_SUN;
  let tau0 = 0, fMax = 0;
  function reset() {
    tau0 = gwTimeToMerger(F_START, Mc());
    // tần số tại quỹ đạo tròn bền trong cùng (ISCO) của tổng khối lượng: f ≈ c³/(6^{3/2} π G M)
    fMax = C ** 3 / (Math.pow(6, 1.5) * Math.PI * G * (m1 + m2) * M_SUN);
    // làm chậm hoạt ảnh sao cho phần nghe được kéo dài ~6 s
    slow = Math.max(1, 6 / tau0);
    t = 0;
    say(`<span>Khối lượng chirp <b>${fmt(chirpMass(m1, m2), 1)} M☉</b></span>
      <span>Từ ${F_START} Hz tới lúc hợp nhất: <b>${tau0 < 1 ? fmt(tau0 * 1000, 0) + ' ms' : fmt(tau0, 1) + ' s'}</b>${slow > 1.5 ? ` (hoạt ảnh chậm ${fmt(slow, 0)} lần)` : ''}</span>
      <span>Cuối pha xoắn ốc (quỹ đạo tròn bền trong cùng) sóng đạt khoảng <b>${fmt(fMax, 0)} Hz</b>, rồi còn tăng trong lúc hợp nhất — nằm trong dải tai người nghe được</span>`);
    L.kick();
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt / slow; else t = tau0 * 0.98;
    const total = tau0 + 0.03;
    if (t > total + 0.6 / slow * 4) t = 0;
    ctx.clearRect(0, 0, w, h);
    const tauNow = Math.max(1e-4, tau0 - t);
    const merged = t >= tau0;
    let f = merged ? fMax : Math.min(fMax, gwFrequency(tauNow, Mc()));
    // quỹ đạo: tần số quỹ đạo = f/2; bán kính ∝ f^{-2/3}
    const cx = w * 0.25, cy = h * 0.42;
    const rMax = Math.min(w * 0.18, h * 0.3);
    const r = merged ? 0 : rMax * Math.pow(f / F_START, -2 / 3);
    const phase = 2 * Math.PI * orbitPhase(t);
    const q = m2 / (m1 + m2);
    const R1 = 6 + 10 * Math.cbrt(m1 / 40), R2 = 6 + 10 * Math.cbrt(m2 / 40);
    if (!merged) {
      [[1 - q, R1, 0], [q, R2, Math.PI]].forEach(([k, R, off]) => {
        const x = cx + Math.cos(phase + off) * r * k * 2, y = cy + Math.sin(phase + off) * r * k * 2 * 0.45;
        ctx.fillStyle = '#000'; ctx.strokeStyle = 'rgba(255,190,140,.7)'; ctx.lineWidth = 2;
        ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1;
      });
    } else {
      const R = 6 + 10 * Math.cbrt((m1 + m2) * 0.95 / 40);
      ctx.fillStyle = '#000'; ctx.strokeStyle = 'rgba(255,190,140,.8)'; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill(); ctx.stroke(); ctx.lineWidth = 1;
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11, 600); ctx.textAlign = 'center'; ctx.fillText('đã hợp nhất', cx, cy + R + 18);
    }
    // vòng hạt thử: biến dạng phân cực +, biên độ ∝ f^{2/3} (phóng đại cực lớn)
    const hAmp = merged ? 0.3 * Math.exp(-(t - tau0) * slow * 3) : 0.3 * Math.pow(f / fMax, 2 / 3);
    const hNow = hAmp * Math.cos(2 * phase);
    const rx = cx, ry = h * 0.82, rr = Math.min(36, h * 0.1);
    ctx.fillStyle = 'rgba(236,230,216,.85)';
    for (let i = 0; i < 16; i++) {
      const a = (i / 16) * Math.PI * 2;
      ctx.beginPath(); ctx.arc(rx + rr * Math.cos(a) * (1 + hNow / 2), ry + rr * Math.sin(a) * (1 - hNow / 2), 2.4, 0, Math.PI * 2); ctx.fill();
    }
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(10); ctx.textAlign = 'center';
    ctx.fillText('vòng hạt thử khi sóng đi qua (phóng đại ~10²⁰ lần)', rx, ry + rr + 18);

    // dạng sóng
    const x0 = w * 0.48, x1 = w - 16, wy = h * 0.42, amp = h * 0.22;
    ctx.strokeStyle = 'rgba(236,230,216,.12)'; ctx.beginPath(); ctx.moveTo(x0, wy); ctx.lineTo(x1, wy); ctx.stroke();
    ctx.strokeStyle = accent; ctx.lineWidth = 1.4; ctx.beginPath();
    const N = 900;
    for (let i = 0; i <= N; i++) {
      const tt = (i / N) * total;
      let y;
      if (tt < tau0) {
        const ff = Math.min(fMax, gwFrequency(Math.max(1e-4, tau0 - tt), Mc()));
        y = Math.pow(ff / fMax, 2 / 3) * Math.cos(2 * Math.PI * 2 * orbitPhase(tt));
      } else {
        y = Math.exp(-(tt - tau0) * 300) * Math.cos(2 * Math.PI * 2 * orbitPhase(tau0) + 2 * Math.PI * fMax * 1.6 * (tt - tau0));
      }
      const x = x0 + (i / N) * (x1 - x0);
      i ? ctx.lineTo(x, wy - y * amp) : ctx.moveTo(x, wy - y * amp);
    }
    ctx.stroke(); ctx.lineWidth = 1;
    const xn = x0 + Math.min(1, t / total) * (x1 - x0);
    ctx.strokeStyle = 'rgba(255,255,255,.6)'; ctx.beginPath(); ctx.moveTo(xn, wy - amp - 8); ctx.lineTo(xn, wy + amp + 8); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.55)'; ctx.font = FONT(10); ctx.textAlign = 'left';
    ctx.fillText(`dạng sóng (biến dạng h) — tần số hiện tại ~${fmt(f, 0)} Hz`, x0, wy - amp - 14);
    ctx.fillText('thời gian →', x1 - 64, wy + amp + 20);
    return true;
  }

  // pha quỹ đạo tích luỹ (vòng) từ lúc bắt đầu: ∫ f_orb dt, f_orb = f/2 — tích phân số có bộ nhớ đệm
  let cacheKey = '', table = [];
  function orbitPhase(tt) {
    const k = `${m1},${m2}`;
    if (k !== cacheKey) {
      cacheKey = k; table = [];
      let ph = 0; const n = 4000;
      for (let i = 0; i <= n; i++) {
        const ti = (i / n) * tau0;
        table.push(ph);
        ph += (Math.min(fMax, gwFrequency(Math.max(1e-4, tau0 - ti), Mc())) / 2) * (tau0 / n);
      }
    }
    const x = Math.max(0, Math.min(1, tt / tau0)) * (table.length - 1);
    const i = Math.floor(x);
    return table[Math.min(i, table.length - 1)] + (x - i) * ((table[i + 1] ?? table[i]) - table[i]);
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  reset();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
