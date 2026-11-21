// Bức xạ phông vi sóng: lúc phát ra (z ≈ 1 090) là bức xạ vật đen ~2 970 K, ánh sáng cam đỏ; vũ trụ giãn nở kéo dài bước sóng
// nên hôm nay nó là bức xạ vật đen 2,7255 K, đỉnh ở vùng vi sóng. Kéo thời gian để thấy đường Planck trượt và màu bầu trời đổi.
// Bên dưới: bản đồ gợn nhiệt độ ngẫu nhiên (minh hoạ, biên độ ~10⁻⁵ phóng đại) — không phải bản đồ Planck thật.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { planck, wienPeak } from '../../../shared/js/astro/physics.js';
import { T_CMB, ageAtZ } from '../../../shared/js/astro/cosmology.js';

const Z_REC = 1089.9;

function skyRGB(T) {
  // màu nhìn thấy của vật đen (xấp xỉ); dưới ~700 K gần như không phát ánh sáng nhìn thấy
  if (T < 800) return [0, 0, 0];
  const k = Math.min(1, (T - 800) / 2400);
  return [Math.round(255 * Math.min(1, k * 1.6)), Math.round(150 * k * k), Math.round(60 * k * k * k)];
}

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Phổ vật đen của bức xạ phông vi sóng nguội dần từ khoảng 3 000 K xuống 2,7 K khi vũ trụ giãn nở');
  let lz = Math.log10(1 + Z_REC), map = null;
  const say = readout(F.panel);
  const sZ = slider(F.panel, {
    label: 'Dịch chuyển đỏ (thời điểm)', min: 0, max: Math.log10(1 + Z_REC), step: 0.001, value: lz,
    format: (v) => `z = ${fmt(10 ** v - 1, 10 ** v - 1 < 10 ? 2 : 0)}`, onInput: (v) => { lz = v; show(); },
  });
  sZ.input.style.direction = 'rtl';    // kéo sang phải = thời gian trôi tới
  buttons(F.panel, [{ label: 'Lúc phát ra (380 000 năm)', value: Math.log10(1 + Z_REC) }, { label: 'z = 10', value: Math.log10(11) }, { label: 'Hôm nay', value: 0 }], (v) => sZ.set(v));

  function show() {
    const z = 10 ** lz - 1, T = T_CMB * (1 + z), age = ageAtZ(z);
    const pk = wienPeak(T);
    say(`<span>Nhiệt độ bức xạ <b>${T < 10 ? fmt(T, 3) : fmt(T, 0)} K</b> (= 2,7255 K × (1 + z))</span>
      <span>Tuổi vũ trụ <b>${age < 1e-3 ? fmt(age * 1e6, 0) + ' nghìn' : age < 1 ? fmt(age * 1e3, 0) + ' triệu' : fmt(age, 2) + ' tỷ'} năm</b></span>
      <span>Đỉnh phổ (theo bước sóng) ở <b>${pk < 1e-6 ? fmt(pk * 1e9, 0) + ' nm' : pk < 1e-3 ? fmt(pk * 1e6, 1) + ' μm' : fmt(pk * 1e3, 2) + ' mm'}</b>${pk < 750e-9 ? ' — ánh sáng nhìn thấy' : pk < 1e-3 ? ' — hồng ngoại' : ' — vi sóng'}</span>`);
    L.kick();
  }

  function buildMap(W, H) {
    let s = 9;
    const r = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
    const modes = Array.from({ length: 60 }, () => { const k = 2 + r() * 18, a = r() * 6.283; return [k * Math.cos(a), k * Math.sin(a), Math.pow(k, -1), r() * 6.283]; });
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const c2 = c.getContext('2d'), id = c2.createImageData(W, H);
    const vals = new Float32Array(W * H); let mx = 0;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      let v = 0; const x = i / W * 2, y = j / H;
      for (const [kx, ky, A, ph] of modes) v += A * Math.sin(kx * x * 3.14 + ky * y * 3.14 + ph);
      vals[j * W + i] = v; mx = Math.max(mx, Math.abs(v));
    }
    for (let p = 0; p < W * H; p++) {
      const v = vals[p] / mx;
      id.data[p * 4] = 128 + 120 * v; id.data[p * 4 + 1] = 110 + 40 * v - 20 * Math.abs(v); id.data[p * 4 + 2] = 128 - 120 * v; id.data[p * 4 + 3] = 255;
    }
    c2.putImageData(id, 0, 0);
    return c;
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const z = 10 ** lz - 1, T = T_CMB * (1 + z);
    // nền: màu "bầu trời" nhìn bằng mắt
    const [r, g, b] = skyRGB(T);
    ctx.fillStyle = `rgb(${r},${g},${b})`; ctx.globalAlpha = 0.35; ctx.fillRect(0, 0, w, h); ctx.globalAlpha = 1;
    // phổ Planck: trục bước sóng 100 nm – 10 cm (log), chuẩn hoá theo đỉnh của chính nó
    const x0 = 40, x1 = w - 16, y0 = 30, y1 = h * 0.62;
    const lo = Math.log10(1e-7), hi = Math.log10(0.1);
    const X = (l) => x0 + ((Math.log10(l) - lo) / (hi - lo)) * (x1 - x0);
    const vis = ctx.createLinearGradient(X(380e-9), 0, X(750e-9), 0);
    vis.addColorStop(0, 'rgba(140,90,255,.25)'); vis.addColorStop(0.5, 'rgba(90,255,120,.25)'); vis.addColorStop(1, 'rgba(255,60,60,.25)');
    ctx.fillStyle = vis; ctx.fillRect(X(380e-9), y0, X(750e-9) - X(380e-9), y1 - y0);
    ctx.fillStyle = 'rgba(255,190,140,.07)'; ctx.fillRect(X(1e-3), y0, X(0.1) - X(1e-3), y1 - y0);
    const pk = wienPeak(T), Bm = planck(pk, T);
    ctx.strokeStyle = accent; ctx.lineWidth = 2; ctx.beginPath();
    for (let x = x0; x <= x1; x += 2) {
      const l = 10 ** (lo + ((x - x0) / (x1 - x0)) * (hi - lo));
      const yy = y1 - (planck(l, T) / Bm) * (y1 - y0 - 6);
      x === x0 ? ctx.moveTo(x, yy) : ctx.lineTo(x, yy);
    }
    ctx.stroke(); ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(236,230,216,.2)'; ctx.beginPath(); ctx.moveTo(x0, y1); ctx.lineTo(x1, y1); ctx.stroke();
    ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    [[1e-7, '100 nm'], [1e-6, '1 μm'], [1e-5, '10 μm'], [1e-4, '100 μm'], [1e-3, '1 mm'], [1e-2, '1 cm'], [0.1, '10 cm']].forEach(([l, s]) => ctx.fillText(s, X(l), y1 + 13));
    ctx.fillText('khả kiến', X(530e-9), y0 + 12); ctx.fillText('vi sóng', X(1e-2), y0 + 12);
    // bản đồ gợn (minh hoạ)
    const mh = h - y1 - 34, mw = Math.min(w - 40, mh * 2);
    if (mh > 30) {
      if (!map) map = buildMap(160, 80);
      const mx0 = (w - mw) / 2, my0 = y1 + 26;
      ctx.save(); ctx.beginPath(); ctx.ellipse(mx0 + mw / 2, my0 + mh / 2, mw / 2, mh / 2, 0, 0, Math.PI * 2); ctx.clip();
      ctx.imageSmoothingEnabled = true; ctx.drawImage(map, mx0, my0, mw, mh); ctx.restore();
      ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(9.5); ctx.textAlign = 'right';
      ctx.fillText('gợn nhiệt độ ~1/100 000 (phóng đại, minh hoạ)', w - 12, h - 6);
    }
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
