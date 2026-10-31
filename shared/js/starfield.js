// Nền sao dùng chung (Canvas 2D, nhẹ).
// Màu sao theo nhiệt độ bề mặt: bảng "What color are the stars?" của Mitchell Charity
// (vendian.org/mncharity/dir3/starcolor), tương ứng các lớp quang phổ O/B, A, F, G, K, M.
// Tỉ lệ các lớp gần với phân bố sao nhìn thấy bằng mắt thường (sao sáng thiên về B, A, K).
import { prefersReducedMotion, isLowPower, onVisibilityChange } from './util.js';

export const STAR_COLORS = [
  { cls: 'O/B', temp: 20000, rgb: [155, 176, 255], w: 0.10 },
  { cls: 'A',   temp: 8500,  rgb: [202, 215, 255], w: 0.20 },
  { cls: 'F',   temp: 6500,  rgb: [248, 247, 255], w: 0.16 },
  { cls: 'G',   temp: 5600,  rgb: [255, 244, 234], w: 0.16 },
  { cls: 'K',   temp: 4400,  rgb: [255, 210, 161], w: 0.28 },
  { cls: 'M',   temp: 3300,  rgb: [255, 204, 111], w: 0.10 },
];

export function pickStarColor(r = Math.random()) {
  let acc = 0;
  for (const c of STAR_COLORS) { acc += c.w; if (r <= acc) return c; }
  return STAR_COLORS[STAR_COLORS.length - 1];
}

/** Sprite tròn có quầng cho từng màu (vẽ trước một lần). */
export function makeStarSprites(size = 32) {
  return STAR_COLORS.map(({ rgb }) => {
    const c = document.createElement('canvas');
    c.width = c.height = size;
    const g = c.getContext('2d');
    const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    const [r, gg, b] = rgb;
    grd.addColorStop(0, `rgba(255,255,255,1)`);
    grd.addColorStop(0.12, `rgba(${r},${gg},${b},0.95)`);
    grd.addColorStop(0.35, `rgba(${r},${gg},${b},0.22)`);
    grd.addColorStop(1, `rgba(${r},${gg},${b},0)`);
    g.fillStyle = grd;
    g.fillRect(0, 0, size, size);
    return c;
  });
}

export function createStarfield(canvas, opts = {}) {
  const ctx = canvas.getContext('2d', { alpha: false });
  const reduced = prefersReducedMotion();
  const low = isLowPower();
  const sprites = makeStarSprites();
  const dprCap = low ? 1.25 : 2;
  let w = 0, h = 0, dpr = 1, stars = [], running = false, raf = 0;
  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  const density = opts.density ?? 1;
  const bg = opts.background ?? '#05060b';

  function build() {
    dpr = Math.min(window.devicePixelRatio || 1, dprCap);
    w = canvas.clientWidth; h = canvas.clientHeight;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    const n = Math.round(Math.min(low ? 520 : 1300, (w * h) / (low ? 2600 : 1250)) * density);
    stars = [];
    for (let i = 0; i < n; i++) {
      // Phân bố độ sáng theo luật luỹ thừa: rất nhiều sao mờ, ít sao sáng
      const m = Math.pow(Math.random(), 3.2);
      const c = pickStarColor();
      stars.push({
        x: Math.random(), y: Math.random(),
        z: 0.15 + Math.random() * 0.85,
        size: 0.35 + m * 2.1,
        a: 0.25 + m * 0.75,
        sprite: STAR_COLORS.indexOf(c),
        rgb: c.rgb,
        tw: 0.4 + Math.random() * 1.6,
        ph: Math.random() * Math.PI * 2,
      });
    }
  }

  function draw(t) {
    pointer.x += (pointer.tx - pointer.x) * 0.04;
    pointer.y += (pointer.ty - pointer.y) * 0.04;
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    const scrollShift = (opts.scrollParallax !== false) ? (window.scrollY || 0) * 0.02 : 0;
    for (const s of stars) {
      const px = (s.x * w + pointer.x * 22 * s.z + w) % w;
      let py = (s.y * h + pointer.y * 16 * s.z - scrollShift * s.z) % h;
      if (py < 0) py += h;
      // nhấp nháy rất nhẹ (±10 %)
      const tw = reduced ? 1 : 1 + 0.1 * Math.sin(t * 0.001 * s.tw + s.ph);
      const a = Math.min(1, s.a * tw);
      if (s.size > 1.4) {
        const d = s.size * 5;
        ctx.globalAlpha = a;
        ctx.drawImage(sprites[s.sprite], px - d / 2, py - d / 2, d, d);
      } else {
        ctx.globalAlpha = a * 0.9;
        ctx.fillStyle = `rgb(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]})`;
        ctx.fillRect(px, py, s.size, s.size);
      }
    }
    ctx.globalAlpha = 1;
  }

  function loop(t) {
    if (!running) return;
    draw(t);
    raf = requestAnimationFrame(loop);
  }

  function start() {
    if (running) return;
    if (reduced) { draw(0); return; }
    running = true; raf = requestAnimationFrame(loop);
  }
  function stop() { running = false; cancelAnimationFrame(raf); }

  build();
  start();

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { build(); if (reduced) draw(0); }, 150);
  });
  if (!reduced) {
    window.addEventListener('pointermove', (e) => {
      pointer.tx = (e.clientX / innerWidth - 0.5) * 2;
      pointer.ty = (e.clientY / innerHeight - 0.5) * 2;
    }, { passive: true });
    window.addEventListener('deviceorientation', (e) => {
      if (e.gamma == null) return;
      pointer.tx = Math.max(-1, Math.min(1, e.gamma / 30));
      pointer.ty = Math.max(-1, Math.min(1, (e.beta - 45) / 30));
    }, { passive: true });
  }
  onVisibilityChange((visible) => (visible ? start() : stop()));

  return { start, stop, rebuild: build };
}
