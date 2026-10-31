// "Tỉ lệ của bạn" — cuộn trang là camera lùi dần, theo tinh thần thước phim Powers of Ten (Eames, 1977).
// Mọi vật thể được vẽ theo đúng tỉ lệ của nó ở bề rộng khung hình hiện tại (đo bằng mét).
// Tâm khung hình luôn là Trái Đất: Mặt Trời lệch 1 AU, Ngân Hà lệch ~26 700 năm ánh sáng…
// Các hành tinh ở đúng vị trí của ngày hôm nay (tham số Kepler, JPL).
import { heliocentric, orbitPath, julianDate, PLANET_IDS } from '../shared/js/astro/kepler.js';
import { prefersReducedMotion, isLowPower, onInView, onVisibilityChange, fmt, clamp, smoothstep } from '../shared/js/util.js';
import { pickStarColor } from '../shared/js/starfield.js';

const AU = 149597870700;           // m (IAU 2012, định nghĩa)
const LY = 9.4607304725808e15;     // m (năm Julius × c)
const KM = 1000;

// Bề rộng khung hình (cạnh ngắn của màn hình) từ 10^7,35 m tới 10^27,25 m
const LOG_MIN = 7.35, LOG_MAX = 27.25;

/** Định dạng bề rộng khung hình bằng đơn vị dễ cảm nhận nhất. */
function formatSpan(m) {
  if (m < 1e9) return `${fmt(m / KM, 0)} km`;
  if (m < 0.2 * AU) return `${fmt(m / 1e9, m < 1e10 ? 1 : 0)} triệu km`;
  if (m < 0.05 * LY) return `${fmt(m / AU, m < 10 * AU ? 1 : 0)} AU`;
  if (m < 1e6 * LY) return `${fmt(m / LY, m < 10 * LY ? 1 : 0)} năm ánh sáng`;
  if (m < 1e9 * LY) return `${fmt(m / LY / 1e6, m < 1e7 * LY ? 1 : 0)} triệu năm ánh sáng`;
  return `${fmt(m / LY / 1e9, 1)} tỉ năm ánh sáng`;
}

/** Độ dài "tròn" (1, 2, 5 × 10ⁿ) trong đơn vị hiển thị phù hợp, không lớn hơn m. */
function niceLength(m) {
  const units = m < 1e9 ? [KM, 'km'] : m < 0.2 * AU ? [1e9, 'triệu km'] : m < 0.05 * LY ? [AU, 'AU']
    : m < 1e6 * LY ? [LY, 'năm ánh sáng'] : m < 1e9 * LY ? [1e6 * LY, 'triệu năm ánh sáng'] : [1e9 * LY, 'tỉ năm ánh sáng'];
  const v = m / units[0];
  const p10 = Math.pow(10, Math.floor(Math.log10(v)));
  const n = [5, 2, 1].map((k) => k * p10).find((x) => x <= v) || p10;
  return [n * units[0], `${fmt(n, n < 1 ? 1 : 0)} ${units[1]}`];
}

function loadImg(src) {
  return new Promise((res) => { const i = new Image(); i.onload = () => res(i); i.onerror = () => res(null); i.src = src; });
}

// PRNG ổn định để bố cục giống nhau mỗi lần tải
function mulberry(seed) {
  return () => { seed |= 0; seed = (seed + 0x6D2B79F5) | 0; let t = Math.imul(seed ^ (seed >>> 15), 1 | seed); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

export async function initPowers(section) {
  const canvas = section.querySelector('canvas');
  const ctx = canvas.getContext('2d');
  const hud = {
    span: section.querySelector('[data-hud="span"]'),
    exp: section.querySelector('[data-hud="exp"]'),
    bar: section.querySelector('[data-hud="bar"]'),
    barLabel: section.querySelector('[data-hud="bar-label"]'),
    rail: section.querySelector('[data-hud="rail"]'),
  };
  const steps = [...section.querySelectorAll('.pw-step')].map((el) => ({ el, log: +el.dataset.log }));
  const intro = section.querySelector('.pw-intro');
  const reduced = prefersReducedMotion();
  const low = isLowPower();
  const assets = section.dataset.assets;

  const earthImg = await loadImg(`${assets}earth-disk.webp`);
  // Ảnh lớn (Ngân Hà, mạng lưới vũ trụ) chỉ tải khi người xem bắt đầu lùi xa
  let galaxyImg = null, lanImg = null, uniImg = null, heavyRequested = false;
  const galMeta = { x_ly: -25061.6, y_ly: -9121.7, span_ly: 120000 }; // khớp home/assets/galaxy.json
  function requestHeavy() {
    if (heavyRequested) return; heavyRequested = true;
    loadImg(`${assets}galaxy.webp`).then((i) => { galaxyImg = i; render(current); });
    loadImg(`${assets}web-laniakea.webp`).then((i) => { lanImg = i; render(current); });
    loadImg(`${assets}web-universe.webp`).then((i) => { uniImg = i; render(current); });
  }

  // ---------- Dữ liệu hệ Mặt Trời hôm nay ----------
  const jd = julianDate(new Date());
  const E = heliocentric('earth', jd);
  // Xoay toàn cảnh để Mặt Trời nằm phía trái-trên của Trái Đất (khớp hướng chiếu sáng của ảnh Trái Đất)
  const sunAng = Math.atan2(-E.y, -E.x);
  const lightAng = Math.atan2(0.2, -0.75);
  const rot = lightAng - sunAng;
  const cr = Math.cos(rot), sr = Math.sin(rot);
  const R = (x, y) => [x * cr - y * sr, x * sr + y * cr];
  const sunPos = R(-E.x * AU, -E.y * AU); // so với Trái Đất
  const PLANETS = {
    mercury: { d: 4879e3, c: '#b9b1a8', vi: 'Sao Thuỷ' }, venus: { d: 12104e3, c: '#e8d3a8', vi: 'Sao Kim' },
    earth: { d: 12756e3, c: '#7fb0ff', vi: 'Trái Đất' }, mars: { d: 6792e3, c: '#d9805a', vi: 'Sao Hoả' },
    jupiter: { d: 142984e3, c: '#e2c8a4', vi: 'Sao Mộc' }, saturn: { d: 120536e3, c: '#e8d8a8', vi: 'Sao Thổ' },
    uranus: { d: 51118e3, c: '#a9e0e6', vi: 'Sao Thiên Vương' }, neptune: { d: 49528e3, c: '#6f8fff', vi: 'Sao Hải Vương' },
  };
  const planets = PLANET_IDS.filter((id) => PLANETS[id]).map((id) => {
    const p = heliocentric(id, jd);
    const pos = R((p.x - E.x) * AU, (p.y - E.y) * AU);
    const path = orbitPath(id, jd, 180).map(([x, y]) => R((x - E.x) * AU, (y - E.y) * AU));
    return { id, ...PLANETS[id], pos, path };
  });
  // Mặt Trăng: góc lệch trung bình so với Mặt Trời (Meeus, Astronomical Algorithms, ch. 47) → đúng pha hôm nay
  const T = (jd - 2451545) / 36525;
  const D = ((297.8501921 + 445267.1114034 * T) % 360) * Math.PI / 180;
  const sunDir = Math.atan2(sunPos[1], sunPos[0]);
  const moonPos = [Math.cos(sunDir + D) * 384400e3, Math.sin(sunDir + D) * 384400e3];

  // Voyager 1: ~172 AU (10/2026), hướng hoàng kinh ≈ 256°, hoàng vĩ ≈ +35° → chiếu lên mặt phẳng hoàng đạo
  const v1lon = 256 * Math.PI / 180, v1r = 172 * Math.cos(35 * Math.PI / 180) * AU;
  const voyager = R(Math.cos(v1lon) * v1r - E.x * AU, Math.sin(v1lon) * v1r - E.y * AU);
  // Proxima Centauri: hoàng kinh ≈ 239° (hướng), vẽ trên vòng 4,25 năm ánh sáng
  const pxLon = 239 * Math.PI / 180;
  const proxima = R(Math.cos(pxLon) * 4.2465 * LY, Math.sin(pxLon) * 4.2465 * LY);

  // ---------- Lớp vẽ sẵn (offscreen) ----------
  const rnd = mulberry(2026);
  function offscreen(size, draw) {
    const c = document.createElement('canvas'); c.width = c.height = size;
    draw(c.getContext('2d'), size); return c;
  }
  // Đám mây Oort: vỏ cầu 2 000–100 000 AU (ước tính, NASA), chiếu xuống mặt phẳng
  const OORT_SPAN = 220000 * AU;
  const oort = offscreen(low ? 512 : 1024, (g, s) => {
    const n = low ? 2500 : 6000;
    for (let i = 0; i < n; i++) {
      const r = Math.pow(rnd(), 0.6) * 98000 + 2000;
      const u = rnd() * 2 - 1, th = rnd() * Math.PI * 2;
      const rp = r * Math.sqrt(1 - u * u);
      const x = s / 2 + (rp * Math.cos(th)) / 220000 * s, y = s / 2 + (rp * Math.sin(th)) / 220000 * s;
      g.fillStyle = `rgba(170,200,255,${0.15 + rnd() * 0.35})`;
      g.fillRect(x, y, 1, 1);
    }
  });
  // Láng giềng: 339 hệ sao trong bán kính 10 pc (Reylé et al. 2021), phân bố đều — minh hoạ mật độ
  const NB_SPAN = 70 * LY;
  const nbStars = [];
  for (let i = 0; i < 339; i++) {
    let x, y, z;
    do { x = rnd() * 2 - 1; y = rnd() * 2 - 1; z = rnd() * 2 - 1; } while (x * x + y * y + z * z > 1);
    const r = Math.hypot(x, y, z) * 32.6;
    if (r < 5) { i--; continue; }
    // ~3/4 số sao gần Mặt Trời là sao lùn đỏ (lớp M)
    const c = rnd() < 0.72 ? { rgb: [255, 190, 120] } : pickStarColor(rnd());
    nbStars.push({ x: x * 32.6 * LY, y: y * 32.6 * LY, rgb: c.rgb, s: 0.6 + rnd() * 1.4 });
  }
  // Bong bóng Địa phương (~1 000 năm ánh sáng)
  const BUB_SPAN = 1600 * LY;
  const bubble = offscreen(512, (g, s) => {
    const pts = [];
    for (let i = 0; i <= 64; i++) {
      const a = (i / 64) * Math.PI * 2;
      const r = (500 + 90 * Math.sin(a * 3 + 1) + 60 * Math.sin(a * 5 + 2) + 40 * Math.sin(a * 9)) / 1600 * s;
      pts.push([s / 2 + 30 / 1600 * s + Math.cos(a) * r, s / 2 + Math.sin(a) * r]);
    }
    const grd = g.createRadialGradient(s / 2, s / 2, s * 0.05, s / 2, s / 2, s * 0.42);
    grd.addColorStop(0, 'rgba(120,90,200,0.02)'); grd.addColorStop(0.85, 'rgba(150,120,230,0.10)'); grd.addColorStop(1, 'rgba(200,170,255,0.22)');
    g.fillStyle = grd; g.strokeStyle = 'rgba(200,180,255,0.35)'; g.lineWidth = 2;
    g.beginPath(); pts.forEach(([x, y], i) => (i ? g.lineTo(x, y) : g.moveTo(x, y))); g.closePath(); g.fill(); g.stroke();
    for (let i = 0; i < 900; i++) {
      const x = rnd() * s, y = rnd() * s;
      g.fillStyle = `rgba(255,240,220,${rnd() * 0.5})`; g.fillRect(x, y, 1, 1);
    }
  });
  // Nhóm Địa phương: ~80 thiên hà lùn quanh Ngân Hà và Andromeda
  const ANDRO = [2.5e6 * LY * Math.cos(2.3), -2.5e6 * LY * Math.sin(2.3)];
  const lgDwarfs = [];
  for (let i = 0; i < 80; i++) {
    const host = rnd() < 0.45 ? [0, 0] : ANDRO;
    const r = Math.pow(rnd(), 0.7) * 1.4e6 * LY, a = rnd() * Math.PI * 2;
    lgDwarfs.push({ x: host[0] + Math.cos(a) * r, y: host[1] + Math.sin(a) * r, s: 0.6 + rnd() * 1.2 });
  }
  const LG_CENTER = [ANDRO[0] * 0.45, ANDRO[1] * 0.45];

  // ---------- Vẽ ----------
  let W = 0, H = 0, S = 0, dpr = 1;
  function resize() {
    dpr = Math.min(devicePixelRatio || 1, low ? 1.25 : 2);
    W = canvas.clientWidth; H = canvas.clientHeight; S = Math.min(W, H);
    canvas.width = Math.round(W * dpr); canvas.height = Math.round(H * dpr);
  }
  resize();
  addEventListener('resize', resize);

  // Cửa sổ hiển thị theo log10(bề rộng khung): mờ dần ở hai đầu
  const win = (L, a, b, c, d) => smoothstep(a, b, L) * (1 - smoothstep(c, d, L));

  function label(x, y, text, alpha, sub) {
    if (alpha <= 0.01) return;
    ctx.globalAlpha = alpha;
    ctx.fillStyle = '#ece6d8';
    ctx.font = '400 13px "Be Vietnam Pro", system-ui, sans-serif';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, x + 10, y);
    if (sub) { ctx.fillStyle = '#8a857b'; ctx.font = '300 11px "Be Vietnam Pro", system-ui, sans-serif'; ctx.fillText(sub, x + 10, y + 15); }
    ctx.globalAlpha = 1;
  }
  function dot(x, y, r, color, glow = 0) {
    if (glow) {
      const g = ctx.createRadialGradient(x, y, 0, x, y, r * glow);
      g.addColorStop(0, color); g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(x, y, r * glow, 0, 6.2832); ctx.fill();
    }
    ctx.fillStyle = color; ctx.beginPath(); ctx.arc(x, y, Math.max(0.6, r), 0, 6.2832); ctx.fill();
  }
  function ring(x, y, r, alpha, dash) {
    if (alpha <= 0.01 || r < 1) return;
    ctx.globalAlpha = alpha; ctx.strokeStyle = 'rgba(236,230,216,.55)'; ctx.lineWidth = 1;
    if (dash) ctx.setLineDash(dash);
    ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.stroke();
    ctx.setLineDash([]); ctx.globalAlpha = 1;
  }
  function imageAt(img, cxm, cym, spanM, k, alpha, cx, cy, comp = 'source-over') {
    if (!img || alpha <= 0.01) return;
    const size = spanM * k;
    if (size < 2) return;
    const dx = cx + cxm * k - size / 2, dy = cy - cym * k - size / 2;
    // Chỉ vẽ phần ảnh nằm trong khung (tránh vẽ ảnh khổng lồ khi phóng to)
    const x0 = Math.max(0, dx), y0 = Math.max(0, dy), x1 = Math.min(W, dx + size), y1 = Math.min(H, dy + size);
    if (x1 <= x0 || y1 <= y0) return;
    const iw = img.width, sc = iw / size;
    ctx.globalAlpha = alpha; ctx.globalCompositeOperation = comp;
    ctx.drawImage(img, (x0 - dx) * sc, (y0 - dy) * sc, (x1 - x0) * sc, (y1 - y0) * sc, x0, y0, x1 - x0, y1 - y0);
    ctx.globalAlpha = 1; ctx.globalCompositeOperation = 'source-over';
  }

  function render(L) {
    if (L > 10.5) requestHeavy();
    const V = Math.pow(10, L);           // mét trên cạnh ngắn màn hình
    const k = S / V;                      // px trên mét
    const cx = W / 2, cy = H / 2;
    const X = (m) => cx + m * k, Y = (m) => cy - m * k;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, W, H);

    // 11. Vũ trụ quan sát được (ảnh phủ ±50 tỉ năm ánh sáng)
    imageAt(uniImg, 0, 0, 100e9 * LY, k, win(L, 25.6, 26.3, 30, 31), cx, cy);
    // 10. Laniakea (ảnh phủ ~800 triệu năm ánh sáng), "chúng ta" nằm ở rìa
    const lanA = win(L, 23.6, 24.4, 26.2, 26.9);
    imageAt(lanImg, 170e6 * LY, 60e6 * LY, 800e6 * LY, k, lanA, cx, cy);
    if (lanA > 0.01) {
      ctx.globalAlpha = lanA * 0.8; ctx.setLineDash([3, 5]); ctx.strokeStyle = 'rgba(230,194,122,.7)';
      ctx.beginPath();
      for (let i = 0; i <= 90; i++) {
        const a = (i / 90) * Math.PI * 2;
        const r = 260e6 * LY * (1 + 0.12 * Math.sin(a * 3 + 0.5) + 0.07 * Math.sin(a * 7));
        const x = X(200e6 * LY + Math.cos(a) * r), y = Y(70e6 * LY + Math.sin(a) * r);
        i ? ctx.lineTo(x, y) : ctx.moveTo(x, y);
      }
      ctx.stroke(); ctx.setLineDash([]); ctx.globalAlpha = 1;
      label(X(200e6 * LY) - 40, Y(70e6 * LY + 290e6 * LY), 'Siêu đám Laniakea', lanA * 0.9);
    }
    // 9. Nhóm Địa phương
    const lgA = win(L, 21.9, 22.5, 24.2, 24.9);
    if (lgA > 0.01) {
      ring(X(LG_CENTER[0]), Y(LG_CENTER[1]), 5e6 * LY * k, lgA * 0.5, [2, 6]);
      for (const d of lgDwarfs) dot(X(d.x), Y(d.y), d.s, `rgba(220,215,255,${0.55 * lgA})`);
      const ax = X(ANDRO[0]), ay = Y(ANDRO[1]);
      if (galaxyImg) {
        const sz = Math.max(6, 160000 * LY * k);
        ctx.save(); ctx.globalAlpha = lgA; ctx.globalCompositeOperation = 'lighter';
        ctx.translate(ax, ay); ctx.rotate(-0.6); ctx.scale(1, 0.32);
        ctx.drawImage(galaxyImg, -sz / 2, -sz / 2, sz, sz); ctx.restore();
      }
      label(ax + 8, ay, 'Andromeda (M31)', lgA, '≈ 2,5 triệu năm ánh sáng');
    }
    // 8. Ngân Hà — tâm thiên hà lệch khỏi Mặt Trời ~26 700 năm ánh sáng
    const gA = win(L, 19.9, 20.6, 23.6, 24.3);
    const gcx = -galMeta.x_ly * LY, gcy = -galMeta.y_ly * LY;
    imageAt(galaxyImg, gcx, gcy, galMeta.span_ly * LY, k, gA, cx, cy);
    if (gA > 0.01) label(X(gcx) + 10, Y(gcy) - 4, 'Tâm Ngân Hà', gA * win(L, 20, 20.6, 21.8, 22.2), '≈ 26 700 năm ánh sáng');
    // 7. Bong bóng Địa phương
    imageAt(bubble, 0, 0, BUB_SPAN, k, win(L, 18.7, 19.3, 20.4, 20.9), cx, cy, 'source-over');
    // 6. Các sao láng giềng
    const nbA = win(L, 16.8, 17.4, 19.3, 19.9);
    if (nbA > 0.01) {
      for (const s of nbStars) dot(X(s.x), Y(s.y), s.s, `rgba(${s.rgb[0]},${s.rgb[1]},${s.rgb[2]},${0.8 * nbA})`, 3);
      ring(cx, cy, 4.2465 * LY * k, nbA * 0.6 * (1 - smoothstep(18.2, 18.9, L)), [2, 4]);
      ring(cx, cy, 32.6 * LY * k, nbA * 0.35 * smoothstep(17.9, 18.4, L), [1, 6]);
      dot(X(proxima[0]), Y(proxima[1]), 1.8, `rgba(255,170,110,${nbA})`, 5);
      label(X(proxima[0]), Y(proxima[1]), 'Proxima Centauri', nbA * (1 - smoothstep(18.4, 19, L)), '4,25 năm ánh sáng');
      label(cx + 32.6 * LY * k * 0.71, cy - 32.6 * LY * k * 0.71, '10 parsec', nbA * 0.7 * smoothstep(17.9, 18.4, L), '32,6 năm ánh sáng');
    }
    // 5. Đám mây Oort
    const oA = win(L, 15.2, 15.9, 17.4, 18.0);
    imageAt(oort, sunPos[0], sunPos[1], OORT_SPAN, k, oA, cx, cy, 'lighter');
    if (oA > 0.01) label(X(sunPos[0]) + 100000 * AU * k * 0.7, Y(sunPos[1]) - 100000 * AU * k * 0.7, 'Đám mây Oort (ước tính)', oA * 0.9, 'tới ~100 000 AU');
    // 4. Nhật quyển
    const hA = win(L, 13.6, 14.1, 15.6, 16.2);
    if (hA > 0.01) {
      ring(X(sunPos[0]), Y(sunPos[1]), 120 * AU * k, hA * 0.7, [4, 4]);
      label(X(sunPos[0]) + 120 * AU * k * 0.72, Y(sunPos[1]) - 120 * AU * k * 0.72, 'Ranh giới nhật quyển', hA, 'heliopause · ≈ 120 AU');
      dot(X(voyager[0]), Y(voyager[1]), 1.6, `rgba(230,194,122,${hA})`, 4);
      label(X(voyager[0]), Y(voyager[1]), 'Voyager 1', hA, '≈ 172 AU');
    }
    // 3. Mặt Trời và các hành tinh (vị trí hôm nay)
    const ssA = win(L, 10.3, 10.9, 15.0, 15.7);
    if (ssA > 0.01) {
      ctx.lineWidth = 1;
      for (const p of planets) {
        if (p.id === 'earth' && L < 12) continue;
        const span = 2 * Math.hypot(p.path[0][0] - sunPos[0], p.path[0][1] - sunPos[1]) * k;
        const oa = ssA * smoothstep(3, 30, span) * (1 - smoothstep(14.2, 15.2, L) * (p.id === 'neptune' ? 0.4 : 1));
        if (oa <= 0.01) continue;
        ctx.globalAlpha = oa * 0.45; ctx.strokeStyle = p.id === 'earth' ? 'rgba(127,176,255,.9)' : 'rgba(236,230,216,.6)';
        ctx.beginPath(); p.path.forEach(([x, y], i) => (i ? ctx.lineTo(X(x), Y(y)) : ctx.moveTo(X(x), Y(y)))); ctx.stroke();
        ctx.globalAlpha = 1;
        if (p.id !== 'earth') {
          dot(X(p.pos[0]), Y(p.pos[1]), Math.max(1.6, p.d / 2 * k), p.c);
          const la = oa * win(L, 10.8, 11.4, 13.4, 14.1) * (span > 60 ? 1 : 0);
          label(X(p.pos[0]), Y(p.pos[1]), p.vi, la);
        }
      }
    }
    // Mặt Trời (đường kính 1 392 700 km)
    const sunA = win(L, 9.6, 10.3, 17.6, 18.3);
    if (sunA > 0.01) {
      const r = Math.max(2.5, 696340e3 * k);
      ctx.globalAlpha = sunA;
      dot(X(sunPos[0]), Y(sunPos[1]), r, '#fff2d6', r > 30 ? 1.6 : 6);
      ctx.globalAlpha = 1;
      label(X(sunPos[0]) + r * 0.7, Y(sunPos[1]) + r * 0.7, 'Mặt Trời', sunA * win(L, 10.3, 10.9, 14.6, 15.2));
    }
    // 2. Mặt Trăng và quỹ đạo của nó
    const mA = win(L, 8.0, 8.5, 10.6, 11.2);
    if (mA > 0.01) {
      ring(cx, cy, 384400e3 * k, mA * 0.5);
      const mr = Math.max(1.4, 1737.4e3 * k);
      dot(X(moonPos[0]), Y(moonPos[1]), mr, `rgba(200,198,190,${mA})`);
      label(X(moonPos[0]) + mr, Y(moonPos[1]), 'Mặt Trăng', mA * win(L, 8.2, 8.7, 9.8, 10.3), '384 400 km');
    }
    // 1. Trái Đất (luôn ở tâm khung hình)
    const er = 6378e3 * k;
    if (er > 2.5 && earthImg) {
      ctx.drawImage(earthImg, cx - er, cy - er, er * 2, er * 2);
    } else {
      const ea = 1 - smoothstep(12.4, 13.2, L);
      if (ea > 0.01) dot(cx, cy, 1.8, `rgba(127,176,255,${ea})`, 5);
      label(cx, cy, 'Trái Đất', ea * smoothstep(8.6, 9.2, L) * (1 - smoothstep(10.6, 11.2, L)));
    }
    // "Bạn đang ở đây" — dấu tâm luôn hiện từ quy mô thiên hà trở đi
    const youA = smoothstep(17.8, 18.6, L);
    if (youA > 0.01) {
      ctx.globalAlpha = youA; ctx.strokeStyle = '#e6c27a'; ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, 7, 0, 6.2832); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(cx - 14, cy); ctx.lineTo(cx - 9, cy); ctx.moveTo(cx + 9, cy); ctx.lineTo(cx + 14, cy);
      ctx.moveTo(cx, cy - 14); ctx.lineTo(cx, cy - 9); ctx.moveTo(cx, cy + 9); ctx.lineTo(cx, cy + 14); ctx.stroke();
      ctx.globalAlpha = 1;
    }

    // HUD
    hud.span.textContent = formatSpan(V);
    const ex = Math.floor(L);
    hud.exp.innerHTML = `10<sup>${ex}</sup> m`;
    // Thước tỉ lệ: độ dài "tròn" gần 1/4 màn hình
    const [nice, niceLabel] = niceLength(V / 4);
    hud.bar.style.width = `${(nice * k).toFixed(1)}px`;
    hud.barLabel.textContent = niceLabel;
    hud.rail.style.setProperty('--p', ((L - LOG_MIN) / (LOG_MAX - LOG_MIN)).toFixed(4));

    // Chú thích từng nấc
    for (let i = 0; i < steps.length; i++) {
      const s = steps[i];
      // Mỗi nấc chiếm khoảng giữa trung điểm với nấc trước và nấc sau — không bao giờ chồng nhau
      const lo = i ? (steps[i - 1].log + s.log) / 2 : s.log - 0.6;
      const hi = i < steps.length - 1 ? (steps[i + 1].log + s.log) / 2 : LOG_MAX + 1;
      const f = Math.min(0.18, (hi - lo) / 5);
      const a = win(L, lo + f * 0.3, lo + f * 1.3, hi - f * 1.3, hi - f * 0.3);
      s.el.style.opacity = a.toFixed(3);
      s.el.style.transform = `translateY(${((1 - a) * (L < s.log ? 14 : -14)).toFixed(1)}px)`;
      s.el.classList.toggle('is-active', a > 0.5);
    }
    if (intro) intro.style.opacity = (1 - smoothstep(LOG_MIN + 0.05, LOG_MIN + 0.6, L)).toFixed(3);
  }

  // ---------- Điều khiển bằng cuộn ----------
  let target = LOG_MIN, current = LOG_MIN, running = false, raf = 0, visible = false;
  const stepLogs = steps.map((s) => s.log);
  function progress() {
    const r = section.getBoundingClientRect();
    const total = section.offsetHeight - innerHeight;
    return clamp(-r.top / total, 0, 1);
  }
  function onScroll() {
    let L = LOG_MIN + progress() * (LOG_MAX - LOG_MIN);
    if (reduced) {
      // Giảm chuyển động: nhảy theo từng nấc thay vì zoom liên tục
      L = stepLogs.reduce((b, v) => (Math.abs(v - L) < Math.abs(b - L) ? v : b), stepLogs[0]);
      if (L < stepLogs[0]) L = LOG_MIN;
    }
    target = L;
    if (reduced) { current = target; render(current); }
    else start();
  }
  function loop() {
    current += (target - current) * 0.12;
    if (Math.abs(target - current) < 0.0005) { current = target; running = false; }
    render(current);
    if (running) raf = requestAnimationFrame(loop);
  }
  function start() { if (!running && visible) { running = true; raf = requestAnimationFrame(loop); } }

  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', () => render(current));
  onInView(section, (v) => { visible = v; if (v) onScroll(); else { running = false; cancelAnimationFrame(raf); } });
  onVisibilityChange((v) => { if (!v) { running = false; cancelAnimationFrame(raf); } else onScroll(); });
  document.fonts?.ready.then(() => render(current));
  onScroll(); render(current);
}
