// Vì sao cần kính thiên văn ngoài không gian: ảnh một sao đôi cách nhau 0,1″ nhìn qua kính đường kính D ở bước sóng λ.
// Trong không gian: độ nhoè chỉ do nhiễu xạ (FWHM ≈ 1,03 λ/D; giới hạn Rayleigh 1,22 λ/D).
// Trên mặt đất: nhiễu loạn khí quyển làm nhoè thêm (seeing ~0,8″ ở đài tốt), và tử ngoại, phần lớn hồng ngoại bị chặn hẳn.
// Ảnh dựng bằng hàm điểm Gauss tương đương (xấp xỉ đỉnh Airy) — đủ để so sánh độ phân giải, không mô phỏng vành nhiễu xạ.
import { frame, slider, buttons, readout, loop, FONT, fmt } from './_kit.js';
import { diffractionLimitArcsec } from '../../../shared/js/astro/physics.js';

const BANDS = {
  uv: { name: 'Tử ngoại 250 nm', lam: 250e-9, ground: false, why: 'tầng ozone hấp thụ' },
  vis: { name: 'Khả kiến 550 nm', lam: 550e-9, ground: true },
  ir: { name: 'Hồng ngoại 10 μm', lam: 10e-6, ground: 'partial', why: 'hơi nước và CO₂ hấp thụ phần lớn; chỉ có vài “cửa sổ” hẹp' },
  fir: { name: 'Hồng ngoại xa 100 μm', lam: 100e-6, ground: false, why: 'hơi nước hấp thụ' },
};
const SEP = 0.1;           // giây cung giữa hai sao
const FOV = 1.6;           // trường nhìn (giây cung)

export function mount(host, opts = {}) {
  const F = frame(host);
  const { ctx, size, canvas } = F;
  canvas.setAttribute('aria-label', 'So sánh ảnh một sao đôi chụp từ mặt đất và từ không gian');
  let D = 2.4, band = 'vis', seeing = 0.8, t = 0;
  const say = readout(F.panel);
  slider(F.panel, { label: 'Đường kính gương', min: 0.1, max: 40, log: true, value: D, format: (v) => `${fmt(v, v < 1 ? 2 : 1)} m`, onInput: (v) => { D = v; show(); } });
  slider(F.panel, { label: 'Nhiễu loạn khí quyển (seeing)', min: 0.3, max: 2.5, step: 0.05, value: seeing, format: (v) => `${fmt(v, 2)}″`, onInput: (v) => { seeing = v; show(); } });
  const box = buttons(F.panel, [
    ...Object.entries(BANDS).map(([k, b]) => ({ label: b.name, value: k })),
    { label: 'Hubble 2,4 m', value: 'hst' }, { label: 'Webb 6,5 m', value: 'jwst' }, { label: 'ELT 39 m (mặt đất)', value: 'elt' },
  ], (v) => {
    if (v === 'hst') { D = 2.4; band = 'vis'; } else if (v === 'jwst') { D = 6.5; band = 'ir'; } else if (v === 'elt') { D = 39; band = 'vis'; } else band = v;
    F.panel.querySelectorAll('input[type=range]')[0].value = Math.log10(D); F.panel.querySelectorAll('input[type=range]')[0].dispatchEvent(new Event('input'));
    show();
  });
  box.children[1].setAttribute('aria-pressed', 'true');

  const res = () => {
    const B = BANDS[band];
    const diff = diffractionLimitArcsec(B.lam, D);              // Rayleigh
    const fwhmSpace = (1.03 / 1.22) * diff;
    const fwhmGround = Math.sqrt(fwhmSpace ** 2 + seeing ** 2);
    return { B, diff, fwhmSpace, fwhmGround };
  };
  function show() {
    const { B, diff, fwhmGround } = res();
    const ok = (f) => (f < SEP * 0.9 ? 'tách được hai sao' : 'hai sao nhoè làm một');
    const groundTxt = B.ground === false ? `<b>không có ảnh</b> — ${B.why}` : `độ nhoè ~${fmt(fwhmGround, 2)}″, ${ok(fwhmGround)}${B.ground === 'partial' ? ' (chỉ ở các cửa sổ hẹp; nền trời nóng còn sáng chói ở hồng ngoại)' : ''}`;
    say(`<span>Giới hạn nhiễu xạ 1,22 λ/D = <b>${fmt(diff, diff < 0.1 ? 3 : 2)}″</b></span>
      <span>Trong không gian: <b>${ok(res().fwhmSpace)}</b></span><span>Trên mặt đất: ${groundTxt}</span>`);
    L.kick();
  }

  function star(cx, cy, scale, fwhm, jitter) {
    const sig = (fwhm / 2.355) * scale;
    [[-SEP / 2, 1], [SEP / 2, 0.75]].forEach(([dx, a]) => {
      const x = cx + dx * scale + jitter[0], y = cy + jitter[1];
      const R = Math.max(1.5, sig * 3.2);
      const g = ctx.createRadialGradient(x, y, 0, x, y, R);
      const peak = Math.min(1, a * Math.max(0.12, Math.min(1, (6 / Math.max(sig, 0.5)))));
      g.addColorStop(0, `rgba(255,248,235,${peak})`); g.addColorStop(0.3, `rgba(255,236,200,${peak * 0.45})`); g.addColorStop(1, 'rgba(255,220,180,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, R, 0, Math.PI * 2); ctx.fill();
    });
  }

  function draw(now, dt) {
    const { w, h } = size;
    if (!w) return true;
    if (!opts.reduced) t += dt;
    ctx.clearRect(0, 0, w, h);
    const { B, fwhmSpace, fwhmGround } = res();
    const narrow = w < 560;
    const pw = narrow ? w - 32 : (w - 48) / 2, ph = narrow ? (h - 60) / 2 : h - 70;
    const panes = narrow ? [[16, 36], [16, 36 + ph + 24]] : [[16, 40], [32 + pw, 40]];
    const scale = Math.min(pw, ph) / FOV;
    [['Từ mặt đất', 'ground'], ['Từ không gian', 'space']].forEach(([title, k], i) => {
      const [px, py] = panes[i];
      ctx.save(); ctx.beginPath(); ctx.rect(px, py, pw, ph); ctx.clip();
      const sky = k === 'ground' && band !== 'vis' && B.ground ? 'rgba(60,30,25,.55)' : '#020308';
      ctx.fillStyle = sky; ctx.fillRect(px, py, pw, ph);
      const cx = px + pw / 2, cy = py + ph / 2;
      if (k === 'ground' && B.ground === false) {
        ctx.fillStyle = 'rgba(236,230,216,.5)'; ctx.font = FONT(12); ctx.textAlign = 'center';
        ctx.fillText('Không có bức xạ nào tới mặt đất', cx, cy - 4); ctx.font = FONT(10.5); ctx.fillText(`(${B.why})`, cx, cy + 14);
      } else {
        const jit = k === 'ground' && !opts.reduced ? [Math.sin(t * 7.3) * seeing * scale * 0.08, Math.cos(t * 5.1) * seeing * scale * 0.08] : [0, 0];
        star(cx, cy, scale, k === 'ground' ? fwhmGround : fwhmSpace, jit);
      }
      // thước 0,1″
      ctx.strokeStyle = 'rgba(236,230,216,.5)'; ctx.beginPath(); ctx.moveTo(px + 12, py + ph - 14); ctx.lineTo(px + 12 + SEP * scale, py + ph - 14); ctx.stroke();
      ctx.fillStyle = 'rgba(236,230,216,.6)'; ctx.font = FONT(10); ctx.textAlign = 'left'; ctx.fillText('0,1″', px + 16 + SEP * scale, py + ph - 10);
      ctx.restore();
      ctx.strokeStyle = 'rgba(236,230,216,.14)'; ctx.strokeRect(px, py, pw, ph);
      ctx.fillStyle = '#ece6d8'; ctx.font = FONT(11.5, 600); ctx.textAlign = 'left'; ctx.fillText(title, px, py - 10);
    });
    return true;
  }

  const L = loop(host, draw, { continuous: !opts.reduced });
  F.onResize(() => L.kick());
  show();
  return { destroy() { L.stop(); F.destroyResize(); } };
}
