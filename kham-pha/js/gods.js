// C3 — Các vị thần trên bầu trời.
// Trang trái: các ngôi sao hiện ra dọc theo ký hiệu như một chòm sao được nối nét → ký hiệu tự vẽ →
// nét vẽ biến thành quỹ đạo → thành chính hành tinh. Trang phải: ba lớp tên gọi (thần thoại · ký hiệu · tên Á Đông),
// mỗi lớp một hiệu ứng chuyển riêng. Chuyển thiên thể bằng hiệu ứng lật trang sách cổ.
import { gsap } from 'gsap';
import { GODS, GODS_SOURCES } from './gods-content.js';
import { prefersReducedMotion, onInView } from '../../shared/js/util.js';

const reduced = prefersReducedMotion();
const NS = 'http://www.w3.org/2000/svg';
const DISK = (id) => `./assets/disks/${id}.webp`;
const LAYERS = [
  { id: 'myth', label: 'Thần thoại' },
  { id: 'sym', label: 'Ký hiệu' },
  { id: 'east', label: 'Tên Á Đông' },
];
const ELEMENTS = [ // Ngũ hành và phương vị (五星)
  { e: 'Mộc', dir: 'Đông', x: 88, y: 50 }, { e: 'Hoả', dir: 'Nam', x: 50, y: 88 },
  { e: 'Thổ', dir: 'Trung tâm', x: 50, y: 50 }, { e: 'Kim', dir: 'Tây', x: 12, y: 50 }, { e: 'Thuỷ', dir: 'Bắc', x: 50, y: 12 },
];

const el = (tag, attrs = {}) => { const n = document.createElementNS(NS, tag); for (const k in attrs) n.setAttribute(k, attrs[k]); return n; };

function pageHTML(g, layer) {
  const tabs = LAYERS.map((l, i) => `<button role="tab" type="button" id="gt-${l.id}" aria-controls="gp-${l.id}" aria-selected="${l.id === layer}" tabindex="${l.id === layer ? 0 : -1}" data-layer="${l.id}"><span>${String(i + 1).padStart(2, '0')}</span>${l.label}</button>`).join('');
  const e = g.east;
  const panel = (id, inner) => `<div role="tabpanel" id="gp-${id}" aria-labelledby="gt-${id}" class="gd-panel" data-panel="${id}" ${id === layer ? '' : 'hidden'}>${inner}</div>`;
  return `
    <header class="gd-head">
      <p class="eyebrow">${g.dwarf ? 'Hành tinh lùn' : g.id === 'sun' ? 'Ngôi sao' : g.id === 'moon' ? 'Vệ tinh' : 'Hành tinh'}</p>
      <h3 class="gd-name">${g.name}</h3>
      <p class="gd-names"><span>${g.roman}</span><i>La Mã</i><span>${g.greek}</span><i>Hy Lạp</i><span class="gd-han" lang="zh-Hant">${e.han}</span><i>Hán</i></p>
    </header>
    <div class="gd-tabs" role="tablist" aria-label="Ba lớp tên gọi của ${g.name}">${tabs}</div>
    ${panel('myth', g.myth.map((t) => `<p>${t}</p>`).join(''))}
    ${panel('sym', `<p class="gd-glyph-big" aria-label="Ký hiệu ${g.symbol}">${g.symbol}</p>${g.sym.map((t) => `<p>${t}</p>`).join('')}`)}
    ${panel('east', `<p class="gd-hv"><span lang="zh-Hant">${e.han}</span> ${e.hv}${e.old ? `<small>Tên cổ: <span lang="zh-Hant">${e.old.split(' · ')[0]}</span> ${e.old.split(' · ')[1]}</small>` : ''}</p>${e.text.map((t) => `<p>${t}</p>`).join('')}`)}
  `;
}

export function initGods(section) {
  const root = section.querySelector('[data-gods]');
  root.innerHTML = `
    <nav class="gd-ring" aria-label="Chọn thiên thể">
      ${GODS.map((g, i) => `<button type="button" data-i="${i}" aria-label="${g.name}" style="--k:${i}"><span aria-hidden="true">${g.symbol}</span><em>${g.name}</em></button>`).join('')}
    </nav>
    <div class="gd-book">
      <div class="gd-left" aria-hidden="true">
        <div class="gd-stage">
        <svg class="gd-svg" viewBox="-10 -10 120 120">
          <g class="gd-orbit-g"></g>
          <g class="gd-lines"></g>
          <g class="gd-stars"></g>
          <path class="gd-glyph"/>
          <g class="gd-east"></g>
        </svg>
        <img class="gd-planet" alt="">
        </div>
        <p class="gd-caption"></p>
      </div>
      <div class="gd-right" aria-live="polite"></div>
    </div>
    <div class="gd-nav">
      <button class="btn" type="button" data-step="-1">← Trang trước</button>
      <span class="gd-count"></span>
      <button class="btn" type="button" data-step="1">Trang sau →</button>
    </div>`;

  const svg = root.querySelector('.gd-svg');
  const glyph = root.querySelector('.gd-glyph');
  const starsG = root.querySelector('.gd-stars'), linesG = root.querySelector('.gd-lines'), orbitG = root.querySelector('.gd-orbit-g'), eastG = root.querySelector('.gd-east');
  const planet = root.querySelector('.gd-planet');
  const caption = root.querySelector('.gd-caption');
  const right = root.querySelector('.gd-right');
  const ring = root.querySelector('.gd-ring');
  const count = root.querySelector('.gd-count');
  let idx = 5, layer = 'myth', tl = null, orbitTween = null, started = false;

  // ---------- Trang trái: chòm sao → ký hiệu → quỹ đạo → hành tinh ----------
  function buildConstellation(g) {
    starsG.innerHTML = ''; linesG.innerHTML = ''; orbitG.innerHTML = ''; eastG.innerHTML = '';
    glyph.setAttribute('d', g.glyph);
    const len = glyph.getTotalLength();
    const n = Math.max(9, Math.min(18, Math.round(len / 16)));
    const pts = [];
    for (let i = 0; i <= n; i++) {
      const p = glyph.getPointAtLength((i / n) * len);
      pts.push([p.x, p.y]);
    }
    // nối các sao liền kề; bỏ qua bước nhảy giữa hai nét rời
    let d = '';
    pts.forEach(([x, y], i) => {
      const prev = pts[i - 1];
      const jump = !prev || Math.hypot(x - prev[0], y - prev[1]) > (len / n) * 1.6;
      d += `${jump ? 'M' : 'L'}${x.toFixed(1)} ${y.toFixed(1)} `;
    });
    linesG.appendChild(el('path', { d, class: 'gd-cline' }));
    pts.forEach(([x, y], i) => {
      const big = i % 4 === 0;
      starsG.appendChild(el('circle', { cx: x.toFixed(1), cy: y.toFixed(1), r: big ? 1.6 : 1, class: big ? 'gd-star big' : 'gd-star' }));
    });
    // quỹ đạo: elip nghiêng nhẹ quanh tâm
    const orbit = el('ellipse', { cx: 50, cy: 50, rx: 44, ry: 15, class: 'gd-orbit', transform: 'rotate(-14 50 50)' });
    orbitG.appendChild(orbit);
    return { len, orbit };
  }

  function runLeft(g) {
    tl?.kill(); orbitTween?.kill();
    const { len } = buildConstellation(g);
    const orbit = orbitG.querySelector('.gd-orbit');
    const oLen = 2 * Math.PI * Math.sqrt((44 * 44 + 15 * 15) / 2);
    planet.src = DISK(g.disk);
    caption.innerHTML = `<span>${g.symbol}</span> ${g.roman} · ${g.greek}`;
    gsap.set(glyph, { strokeDasharray: len, strokeDashoffset: len, opacity: 1, scale: 1, transformOrigin: '50% 50%' });
    gsap.set(orbit, { strokeDasharray: oLen, strokeDashoffset: oLen, opacity: 1 });
    gsap.set(starsG.children, { opacity: 0, scale: 0, transformOrigin: 'center', transformBox: 'fill-box' });
    gsap.set(linesG.firstChild, { strokeDasharray: 400, strokeDashoffset: 400, opacity: 0.6 });
    gsap.set(planet, { opacity: 0, scale: 0.2, xPercent: -50, yPercent: -50, left: '50%', top: '50%' });
    if (reduced) {
      gsap.set(starsG.children, { opacity: 0.9, scale: 1 });
      gsap.set(glyph, { strokeDashoffset: 0, opacity: 0.18 });
      gsap.set(orbit, { strokeDashoffset: 0, opacity: 0.5 });
      gsap.set(linesG.firstChild, { strokeDashoffset: 0, opacity: 0.3 });
      gsap.set(planet, { opacity: 1, scale: 1, left: '78%', top: '40%' });
      return;
    }
    const isSun = g.id === 'sun';
    tl = gsap.timeline();
    // 1. Các sao hiện ra, rồi được nối nét như một chòm sao
    tl.to(starsG.children, { opacity: 1, scale: 1, duration: 0.5, ease: 'back.out(3)', stagger: { each: 0.06, from: 'random' } })
      .to(linesG.firstChild, { strokeDashoffset: 0, duration: 1.2, ease: 'power1.inOut' }, '-=0.2')
      // 2. Ký hiệu tự vẽ nét
      .to(glyph, { strokeDashoffset: 0, duration: 1.4, ease: 'power2.inOut' }, '-=0.4')
      .to(linesG.firstChild, { opacity: 0.12, duration: 0.6 }, '<0.6')
      // 3. Nét vẽ thu lại và biến thành quỹ đạo
      .to(glyph, { scale: 0.32, opacity: 0.22, duration: 1, ease: 'power3.inOut' }, '+=0.4')
      .to(starsG.children, { opacity: 0.25, scale: 0.6, duration: 0.8 }, '<')
      .to(orbit, { strokeDashoffset: 0, duration: 1.3, ease: 'power2.inOut' }, '<0.2')
      // 4. … rồi thành chính hành tinh
      .to(planet, { opacity: 1, scale: 1, duration: 0.9, ease: 'power3.out' }, '-=0.5');
    if (isSun) {
      tl.to(orbit, { opacity: 0, duration: 0.6 }, '<');
    } else {
      // hành tinh bắt đầu chuyển động trên quỹ đạo vừa vẽ
      tl.add(() => {
        const o = { a: Math.PI * 0.15 };
        const rot = -14 * Math.PI / 180;
        const place = () => {
          const x = 50 + 44 * Math.cos(o.a), y = 50 + 15 * Math.sin(o.a);
          const xr = 50 + (x - 50) * Math.cos(rot) - (y - 50) * Math.sin(rot);
          const yr = 50 + (x - 50) * Math.sin(rot) + (y - 50) * Math.cos(rot);
          const front = Math.sin(o.a) > 0;
          gsap.set(planet, { left: `${((xr + 10) / 120) * 100}%`, top: `${((yr + 10) / 120) * 100}%`, scale: front ? 1 : 0.8, zIndex: front ? 2 : 0 });
        };
        orbitTween = gsap.to(o, { a: o.a + Math.PI * 2, duration: 40, ease: 'none', repeat: -1, onUpdate: place });
        gsap.fromTo(planet, { left: '50%', top: '50%' }, { left: `${((50 + 44 * Math.cos(0.47) + 10) / 120) * 100}%`, top: `${((50 + 15 * Math.sin(0.47) + 10) / 120) * 100}%`, duration: 0.8, ease: 'power2.out', onComplete: place });
      }, '-=0.6');
    }
  }

  // Lớp "Ký hiệu": vẽ lại ký hiệu thật nổi bật. Lớp "Tên Á Đông": la bàn Ngũ hành.
  function leftForLayer(g) {
    if (reduced) { eastG.innerHTML = ''; }
    if (layer === 'sym') {
      orbitTween?.pause();
      const len = glyph.getTotalLength();
      gsap.killTweensOf(glyph);
      gsap.timeline()
        .to([planet, orbitG, eastG], { opacity: 0, duration: 0.4 })
        .set(glyph, { scale: 1, opacity: 1, strokeDashoffset: len })
        .to(starsG.children, { opacity: 0.85, scale: 1, duration: 0.4 }, '<')
        .to(glyph, { strokeDashoffset: 0, duration: reduced ? 0 : 1.6, ease: 'power2.inOut' });
    } else if (layer === 'east') {
      orbitTween?.pause();
      eastG.innerHTML = '';
      const e = g.east;
      const cur = ELEMENTS.find((x) => x.e === e.element);
      eastG.appendChild(el('circle', { cx: 50, cy: 50, r: 46, class: 'gd-compass' }));
      for (const x of ELEMENTS) {
        const t = el('text', { x: x.x, y: x.y + (x.e === 'Thổ' ? 16 : 0), class: `gd-el${cur === x ? ' on' : ''}`, 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
        t.textContent = x.e; eastG.appendChild(t);
      }
      const han = el('text', { x: 50, y: cur && cur.e === 'Thổ' ? 40 : 52, class: 'gd-han-big', 'text-anchor': 'middle', 'dominant-baseline': 'middle' });
      han.textContent = e.han; eastG.appendChild(han);
      if (!e.element) {
        const note = el('text', { x: 50, y: 70, class: 'gd-el', 'text-anchor': 'middle' });
        note.textContent = g.id === 'earth' ? 'không thuộc năm sao Ngũ hành' : g.id === 'sun' || g.id === 'moon' ? 'âm – dương' : 'tên dịch thế kỷ 19–20';
        eastG.appendChild(note);
      }
      gsap.timeline()
        .to([planet, orbitG, glyph, starsG, linesG], { opacity: 0, duration: 0.4 })
        .fromTo(eastG, { opacity: 0 }, { opacity: 1, duration: 0.3 })
        // chữ Hán hiện ra như nét mực loang từ trên xuống
        .fromTo(han, { clipPath: 'inset(0 0 100% 0)' }, { clipPath: 'inset(0 0 0% 0)', duration: reduced ? 0 : 1.4, ease: 'power2.inOut' }, '<')
        .fromTo(eastG.querySelectorAll('.gd-el'), { opacity: 0 }, { opacity: 1, stagger: 0.08, duration: 0.4 }, '<0.3');
    } else {
      gsap.to(eastG, { opacity: 0, duration: 0.3 });
      gsap.to([planet, orbitG, starsG, linesG], { opacity: 1, duration: 0.6 });
      gsap.to(glyph, { scale: 0.32, opacity: 0.22, duration: 0.6 });
      gsap.to(starsG.children, { opacity: 0.25, scale: 0.6, duration: 0.6 });
      orbitTween?.resume();
    }
  }

  // ---------- Trang phải: ba lớp, mỗi lớp một hiệu ứng ----------
  function renderRight(g) {
    right.innerHTML = pageHTML(g, layer);
    right.querySelector('[role="tablist"]').addEventListener('click', (e) => {
      const b = e.target.closest('[data-layer]'); if (b) setLayer(b.dataset.layer, true);
    });
    right.querySelector('[role="tablist"]').addEventListener('keydown', (e) => {
      if (!['ArrowLeft', 'ArrowRight'].includes(e.key)) return;
      const i = LAYERS.findIndex((l) => l.id === layer);
      const n = LAYERS[(i + (e.key === 'ArrowRight' ? 1 : -1) + LAYERS.length) % LAYERS.length].id;
      setLayer(n, true);
    });
  }
  function setLayer(id, focus) {
    if (id === layer) return;
    layer = id;
    right.querySelectorAll('[role="tab"]').forEach((t) => {
      const on = t.dataset.layer === id;
      t.setAttribute('aria-selected', String(on)); t.tabIndex = on ? 0 : -1;
      if (on && focus) t.focus();
    });
    right.querySelectorAll('[data-panel]').forEach((p) => { p.hidden = p.dataset.panel !== id; });
    const panel = right.querySelector(`[data-panel="${id}"]`);
    if (!reduced) {
      if (id === 'myth') gsap.from(panel.children, { opacity: 0, y: 14, filter: 'blur(6px)', duration: 0.7, stagger: 0.12 });
      if (id === 'sym') gsap.from(panel.children, { opacity: 0, x: -18, duration: 0.6, stagger: 0.1, ease: 'power3.out' });
      if (id === 'east') gsap.from(panel.children, { opacity: 0, clipPath: 'inset(0 0 100% 0)', duration: 0.9, stagger: 0.15, ease: 'power2.out' });
    }
    leftForLayer(GODS[idx]);
  }

  // ---------- Chọn thiên thể: lật trang ----------
  function show(i, dir = 1) {
    const prevHTML = right.innerHTML;
    idx = (i + GODS.length) % GODS.length;
    const g = GODS[idx];
    layer = 'myth';
    ring.querySelectorAll('button').forEach((b, k) => { b.classList.toggle('is-on', k === idx); b.setAttribute('aria-current', k === idx ? 'true' : 'false'); });
    ring.style.setProperty('--on', idx);
    count.textContent = `${String(idx + 1).padStart(2, '0')} / ${String(GODS.length).padStart(2, '0')}`;
    renderRight(g);
    if (prevHTML && !reduced) {
      // tờ giấy cũ lật qua gáy sách
      const leaf = document.createElement('div');
      leaf.className = 'gd-leaf';
      leaf.innerHTML = `<div class="gd-leaf-front">${prevHTML}</div><div class="gd-leaf-back"></div>`;
      right.appendChild(leaf);
      gsap.fromTo(leaf, { rotateY: 0 }, { rotateY: dir > 0 ? -178 : 178, duration: 1.1, ease: 'power2.inOut', transformOrigin: dir > 0 ? '0% 50%' : '100% 50%', onComplete: () => leaf.remove() });
      gsap.from(right.querySelectorAll('.gd-head > *, .gd-tabs, .gd-panel:not([hidden]) > *'), { opacity: 0, duration: 0.6, delay: 0.5, stagger: 0.05 });
    }
    runLeft(g);
  }

  ring.addEventListener('click', (e) => { const b = e.target.closest('[data-i]'); if (b) show(+b.dataset.i, +b.dataset.i >= idx ? 1 : -1); });
  root.querySelector('.gd-nav').addEventListener('click', (e) => { const b = e.target.closest('[data-step]'); if (b) show(idx + +b.dataset.step, +b.dataset.step); });

  // Bắt đầu khi phần này vào màn hình (để người xem thấy chòm sao được nối nét)
  right.innerHTML = '';
  onInView(root, (v) => { if (v && !started) { started = true; show(idx); } }, '-20%');
  // Trường hợp không có IntersectionObserver kích hoạt (in, đọc màn hình): vẫn có nội dung
  setTimeout(() => { if (!started) { started = true; show(idx); } }, 6000);

  section.querySelector('[data-gods-sources]').innerHTML = GODS_SOURCES.map((s) => `<li>${s}</li>`).join('');
}
