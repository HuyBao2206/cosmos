// Dịch chuyển đỏ: kéo thanh z để thấy các vạch quang phổ của một thiên hà trượt sang phía đỏ (hoặc xanh nếu z < 0).
// λ_quan sát = λ_phát · (1 + z). Trục 90 nm – 5 μm (thang log), vùng khả kiến tô màu, vùng hồng ngoại của JWST đánh dấu.
// Diễn giải: nếu là chuyển động (Doppler tương đối tính) → v; nếu là giãn nở vũ trụ (ΛCDM Planck 2018) → tuổi vũ trụ lúc phát.
import { frame, slider, buttons, readout, loop, wavelengthRGB, FONT, fmt } from './_kit.js';
import { betaFromZ, C } from '../../../shared/js/astro/physics.js';
import { ageAtZ, lookbackTime } from '../../../shared/js/astro/cosmology.js';

// Vạch tham chiếu (nm, chân không cho Lyα, không khí cho vạch quang học)
const LINES = [
  { nm: 121.567, n: 'Lyα', strong: true }, { nm: 372.7, n: '[O II]' }, { nm: 393.37, n: 'K' }, { nm: 396.85, n: 'H' },
  { nm: 486.13, n: 'Hβ' }, { nm: 500.7, n: '[O III]' }, { nm: 656.28, n: 'Hα', strong: true },
];
const LYMAN_LIMIT = 91.2;
const LO = Math.log10(90), HI = Math.log10(5000);
// thang trượt: u ∈ [−1, 1.2] → 1+z = 10^u (âm = dịch chuyển xanh), giới hạn z ≥ −0,5
const zFromU = (u) => Math.max(-0.5, Math.pow(10, u) - 1);
const uFromZ = (z) => Math.log10(1 + z);

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, accent, canvas } = F;
  canvas.setAttribute('aria-label', 'Phổ thiên hà với các vạch trượt theo dịch chuyển đỏ z');
  let z = 0.158;
  const say = readout(F.panel);
  const sZ = slider(F.panel, {
    label: 'Dịch chuyển đỏ z', min: -0.3, max: 1.21, step: 0.0001, value: uFromZ(z),
    format: (u) => { const zz = zFromU(u); return `z = ${fmt(zz, Math.abs(zz) < 0.01 ? 4 : Math.abs(zz) < 1 ? 3 : 2)}`; },
    onInput: (u) => { z = zFromU(u); show(); },
  });
  buttons(F.panel, [
    { label: 'Andromeda', value: -0.001 }, { label: 'Phòng thí nghiệm', value: 0 }, { label: 'M87', value: 0.00428 },
    { label: 'Chuẩn tinh 3C 273', value: 0.158 }, { label: 'z = 1', value: 1 }, { label: 'MoM-z14', value: 14.44 },
  ], (v) => sZ.set(uFromZ(v)));

  function show() {
    const beta = betaFromZ(z);
    const motion = z < 0 ? `đang tiến lại gần với vận tốc <b>${fmt(-beta * C / 1000, 0)} km/s</b>` : `đang lùi xa với vận tốc <b>${fmt(beta * C / 1000, beta < 0.1 ? 0 : 0)} km/s</b> (${fmt(beta * 100, 1)} % tốc độ ánh sáng)`;
    const cosmo = z > 0.01 ? `<span>Nếu do vũ trụ giãn nở: ánh sáng rời đi cách đây <b>${fmt(lookbackTime(z), 2)} tỷ năm</b>, lúc vũ trụ mới <b>${ageAtZ(z) < 1 ? fmt(ageAtZ(z) * 1000, 0) + ' triệu' : fmt(ageAtZ(z), 2) + ' tỷ'} năm tuổi</b></span>` : '';
    say(`<span>Hα (656,3 nm) đo được ở <b>${fmt(656.28 * (1 + z), 1)} nm</b></span>
      <span>Nếu chỉ do chuyển động: ${motion}</span>${cosmo}
      ${z > 1 ? '<span>Với z lớn, cách hiểu "vận tốc" mất ý nghĩa: đây là không gian giãn ra trong lúc ánh sáng đi.</span>' : ''}`);
    L.kick();
  }

  function draw() {
    const { w, h } = size;
    if (!w) return true;
    ctx.clearRect(0, 0, w, h);
    const x0 = 16, x1 = w - 16;
    const X = (nm) => x0 + ((Math.log10(nm) - LO) / (HI - LO)) * (x1 - x0);
    const mid = h * 0.5, sH = Math.min(56, h * 0.16);
    const yRest = mid - sH - 40, yObs = mid + 10;

    // vùng quan sát: khả kiến (mắt, kính mặt đất), hồng ngoại gần JWST NIRSpec 0,6–5,3 μm
    ctx.fillStyle = 'rgba(255,176,124,.06)'; ctx.fillRect(X(600), 22, X(5000) - X(600), h - 44);
    ctx.fillStyle = 'rgba(255,176,124,.7)'; ctx.font = FONT(10); ctx.textAlign = 'right';
    ctx.fillText('JWST NIRSpec (0,6–5,3 μm) →', x1, 34);
    // dải khả kiến làm nền cho phổ
    const strip = (y, shift, label) => {
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10.5, 500); ctx.textAlign = 'left'; ctx.fillText(label, x0, y - 8);
      for (let x = x0; x < x1; x++) {
        const nm = Math.pow(10, LO + ((x - x0) / (x1 - x0)) * (HI - LO));
        const nmRest = nm / (1 + shift);
        let I = nmRest < LYMAN_LIMIT ? 0.03 : nmRest < 121.567 ? 0.25 : 0.55 + 0.25 * Math.exp(-((Math.log10(nmRest) - 2.8) ** 2) / 0.2);
        let r = 120, g = 110, b = 130;
        if (nm >= 380 && nm <= 750) [r, g, b] = wavelengthRGB(nm);
        else if (nm > 750) { r = 150; g = 70; b = 60; } else { r = 110; g = 90; b = 170; }
        ctx.fillStyle = `rgb(${Math.round(r * I)},${Math.round(g * I)},${Math.round(b * I)})`;
        ctx.fillRect(x, y, 1.2, sH);
      }
      LINES.forEach((l) => {
        const nm = l.nm * (1 + shift); if (nm < 90 || nm > 5000) return;
        const x = X(nm);
        ctx.fillStyle = l.n === 'Lyα' || l.n.startsWith('[') ? 'rgba(255,255,255,.85)' : 'rgba(2,3,6,.9)';
        ctx.fillRect(x - 1, y, 2, sH);
      });
    };
    strip(yRest, 0, 'Phổ lúc phát ra (phòng thí nghiệm, z = 0)');
    strip(yObs, z, `Phổ ta đo được (z = ${fmt(z, Math.abs(z) < 0.01 ? 4 : 3)})`);
    // nối vạch
    LINES.forEach((l) => {
      const a = X(l.nm), b = l.nm * (1 + z);
      if (b < 90 || b > 5000) return;
      ctx.strokeStyle = l.strong ? accent : 'rgba(159,212,232,.35)'; ctx.lineWidth = l.strong ? 1.4 : 1;
      ctx.beginPath(); ctx.moveTo(a, yRest + sH); ctx.bezierCurveTo(a, (yRest + sH + yObs) / 2, X(b), (yRest + sH + yObs) / 2, X(b), yObs); ctx.stroke();
      ctx.lineWidth = 1;
      if (l.strong || (w > 900 && l.n !== 'K' && l.n !== 'H' && l.n !== '[O II]')) { ctx.fillStyle = l.strong ? '#ece6d8' : 'rgba(236,230,216,.55)'; ctx.font = FONT(10, l.strong ? 600 : 400); ctx.textAlign = 'center'; ctx.fillText(l.n, X(b), yObs + sH + 14); }
    });
    // trục
    ctx.fillStyle = 'rgba(236,230,216,.45)'; ctx.font = FONT(9.5); ctx.textAlign = 'center';
    const ty = yObs + sH + 34;
    [[100, '100 nm'], [200, '200'], [400, '400'], [700, '700 nm'], [1000, '1 μm'], [2000, '2 μm'], [5000, '5 μm']].forEach(([nm, s]) => ctx.fillText(s, X(nm), ty));
    ctx.fillText('bước sóng (thang log)', (x0 + x1) / 2, ty + 15);
    return false;
  }

  const L = loop(host, draw, { continuous: false });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
