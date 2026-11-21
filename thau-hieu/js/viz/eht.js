// Vì sao cần một kính thiên văn cỡ Trái Đất: ảnh vành sáng quanh M87* (hoặc Sgr A*) nhìn với độ phân giải θ ≈ λ/D.
// Ảnh "thật" mô hình hoá: vành mảnh đường kính đo được (M87*: 42 μas; Sgr A*: 51,8 μas), sáng hơn ở một phía (Doppler).
// Ảnh quan sát = tích chập vành với chùm Gauss có FWHM = λ/D (tính trực tiếp bằng tổng các điểm Gauss trên vành).
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { RAD_TO_ARCSEC } from '../../../shared/js/astro/physics.js';

const TARGETS = {
  m87: { name: 'M87*', ring: 42, bright: Math.PI / 2 + 0.3, info: '6,5 tỷ M☉, cách ~55 triệu năm ánh sáng' },
  sgr: { name: 'Sgr A*', ring: 51.8, bright: Math.PI * 0.15, info: '~4,3 triệu M☉, cách ~27 000 năm ánh sáng' },
};
const LAMBDA = 1.3e-3;           // m — bước sóng quan sát của EHT (230 GHz)
const FOV = 120;                 // μas, bề rộng khung

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Ảnh vành sáng quanh hố đen nhìn với độ phân giải tăng dần khi mở rộng đường đáy');
  let D = 1e6, tgt = 'm87', key = '', img = null;
  const say = readout(F.panel);
  const sD = slider(F.panel, {
    label: 'Khoảng cách xa nhất giữa hai kính (đường đáy)', min: 10, max: 1.27e7, log: true, value: D,
    format: (v) => (v < 1e3 ? `${fmt(v, 0)} m` : `${fmt(v / 1e3, v < 1e4 ? 1 : 0)} km`), onInput: (v) => { D = v; show(); },
  });
  const box = buttons(F.panel, [
    { label: 'M87*', value: 'm87' }, { label: 'Sgr A*', value: 'sgr' },
    { label: 'Một kính 30 m', value: 30 }, { label: 'Mạng ALMA (16 km)', value: 1.6e4 }, { label: 'Cỡ Trái Đất (EHT)', value: 1.07e7 },
  ], (v) => { if (typeof v === 'string') { tgt = v; show(); } else sD.set(v); });
  box.children[0].setAttribute('aria-pressed', 'true');

  const beamUas = () => (LAMBDA / D) * RAD_TO_ARCSEC * 1e6;
  function show() {
    const b = beamUas(), T = TARGETS[tgt];
    say(`<span>Độ phân giải ở bước sóng 1,3 mm: θ ≈ λ/D = <b>${b > 1e6 ? fmt(b / 1e6, 1) + '″' : b > 1000 ? fmt(b / 1000, 1) + ' mili giây cung' : fmt(b, 0) + ' micro giây cung'}</b></span>
      <span>Vành của ${T.name} rộng <b>${fmt(T.ring, 1)} μas</b> (${T.info})</span>
      <span>${b < T.ring * 0.6 ? '<b>Thấy được vành và bóng tối ở giữa</b>' : b < T.ring * 2 ? 'Bắt đầu thấy một đốm hơi dẹt' : 'Chỉ là một chấm mờ, không phân giải được'}</span>`);
    L.kick();
  }

  function render(W, H) {
    const k = `${W}x${H}:${D}:${tgt}`;
    if (k === key) return;
    key = k;
    const T = TARGETS[tgt];
    const N = 96, R = T.ring / 2;
    const ringW = 4;                                            // bề dày nội tại của vành (μas, mô hình)
    const sig = Math.sqrt((beamUas() / 2.355) ** 2 + (ringW / 2.355) ** 2);
    const pts = [];
    for (let i = 0; i < N; i++) { const a = (i / N) * 2 * Math.PI; pts.push([R * Math.cos(a), R * Math.sin(a), 1 + 0.85 * Math.cos(a - T.bright)]); }
    const c = document.createElement('canvas'); c.width = W; c.height = H;
    const c2 = c.getContext('2d'), id = c2.createImageData(W, H);
    const buf = new Float32Array(W * H); let mx = 0;
    const s2 = 2 * sig * sig;
    for (let j = 0; j < H; j++) for (let i = 0; i < W; i++) {
      const x = (i / W - 0.5) * FOV, y = (0.5 - j / H) * FOV * (H / W);
      let v = 0;
      for (const [px, py, wt] of pts) { const d2 = (x - px) ** 2 + (y - py) ** 2; if (d2 < 25 * s2) v += wt * Math.exp(-d2 / s2); }
      buf[j * W + i] = v; if (v > mx) mx = v;
    }
    for (let p = 0; p < W * H; p++) {
      const v = Math.pow(buf[p] / (mx || 1), 0.9);
      id.data[p * 4] = 255 * Math.min(1, v * 1.25); id.data[p * 4 + 1] = 255 * Math.min(1, v * v * 0.95); id.data[p * 4 + 2] = 255 * Math.min(1, v * v * v * 0.5); id.data[p * 4 + 3] = 255;
    }
    c2.putImageData(id, 0, 0);
    img = c;
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    const sq = Math.min(w, h) - 30;
    render(Math.round(Math.min(160, sq / 2.5)), Math.round(Math.min(160, sq / 2.5)));
    ctx.clearRect(0, 0, w, h);
    const x0 = (w - sq) / 2, y0 = 12;
    ctx.imageSmoothingEnabled = true; ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(img, x0, y0, sq, sq);
    // vòng tròn chùm (beam)
    const pxPerUas = sq / FOV, b = beamUas();
    if (b < FOV * 0.9) {
      ctx.strokeStyle = 'rgba(236,230,216,.7)'; ctx.beginPath(); ctx.arc(x0 + 24 + (b * pxPerUas) / 2, y0 + sq - 24 - (b * pxPerUas) / 2, (b * pxPerUas) / 2, 0, Math.PI * 2); ctx.stroke();
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10); ctx.textAlign = 'left'; ctx.fillText('độ phân giải', x0 + 24 + b * pxPerUas + 6, y0 + sq - 24 - (b * pxPerUas) / 2 + 3);
    }
    // thước 50 μas
    ctx.strokeStyle = accent; ctx.beginPath(); ctx.moveTo(x0 + sq - 24 - 50 * pxPerUas, y0 + sq - 16); ctx.lineTo(x0 + sq - 24, y0 + sq - 16); ctx.stroke();
    ctx.fillStyle = accent; ctx.font = FONT(10); ctx.textAlign = 'right'; ctx.fillText('50 μas', x0 + sq - 24, y0 + sq - 22);
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.textAlign = 'center';
    ctx.fillText('mô hình vành sáng, không phải ảnh EHT thật · màu giả', w / 2, h - 4);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
