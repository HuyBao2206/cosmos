// Khởi tạo chung cho mọi trang: thanh menu, footer, nền sao, chuyển trang, hiệu ứng xuất hiện.
// Mỗi trang khai báo trên <html>: data-root (đường dẫn tương đối về gốc), data-section (id web con hoặc "home"),
// tuỳ chọn data-updated="MM/YYYY".
import { SITE, SECTIONS } from './config.js';
import { createStarfield } from './starfield.js';
import { initTransitions } from './transition.js';
import { prefersReducedMotion } from './util.js';

const html = document.documentElement;
const root = html.dataset.root || './';
const current = html.dataset.section || 'home';

const LOGO_SVG = `<svg class="brand-mark" viewBox="0 0 24 24" aria-hidden="true">
  <circle cx="12" cy="12" r="3.2" fill="currentColor"/>
  <ellipse cx="12" cy="12" rx="10.5" ry="4.2" fill="none" stroke="currentColor" stroke-width=".9" opacity=".7" transform="rotate(-24 12 12)"/>
  <circle cx="21" cy="8.2" r="1.1" fill="var(--accent)"/>
</svg>`;

function navHTML() {
  const items = SECTIONS.map((s) => {
    const cur = s.id === current ? ' aria-current="page"' : '';
    const soon = s.open ? '' : ' data-soon';
    return `<li><a href="${root}${s.id}/"${cur}${soon}>${s.label}</a></li>`;
  }).join('');
  const sheet = SECTIONS.map((s) => {
    const cur = s.id === current ? ' aria-current="page"' : '';
    return `<li><a href="${root}${s.id}/"${cur}>${s.label}${s.open ? '' : '<span class="soon">Sắp mở cửa</span>'}</a></li>`;
  }).join('');
  return `
  <a class="skip-link" href="#main">Bỏ qua, tới nội dung chính</a>
  <nav class="site-nav" aria-label="Điều hướng chính">
    <div class="wrap">
      <a class="brand" href="${root}" aria-label="${SITE.name} ${SITE.by} — Trang chủ">
        ${LOGO_SVG}<span class="brand-name">${SITE.name}</span><span class="brand-by">${SITE.by}</span>
      </a>
      <ul class="nav-links">${items}<span class="nav-indicator" aria-hidden="true"></span></ul>
      <button class="nav-toggle" type="button" aria-expanded="false" aria-controls="nav-sheet" aria-label="Mở menu">
        <span></span><span></span>
      </button>
    </div>
  </nav>
  <div class="nav-sheet" id="nav-sheet" role="dialog" aria-modal="true" aria-label="Menu">
    <ol>${sheet}</ol>
    <p class="nav-sheet-foot">${SITE.name} · a HUB project</p>
  </div>`;
}

function footerHTML() {
  const updated = html.dataset.updated || SITE.updated;
  return `
  <footer class="site-footer">
    <div class="wrap">
      <div>
        <p class="footer-title">${SITE.name} <span>· a HUB project</span></p>
        <p class="small muted" style="margin:0">Một dự án phổ biến khoa học về vũ trụ.</p>
      </div>
      <ul class="footer-links">
        <li><a href="${SITE.bio}" target="_blank" rel="noopener">Về HUB ↗</a></li>
        <li><a href="${root}nguon-hinh-anh/">Nguồn hình ảnh</a></li>
        <li><a href="${root}nguon-tham-khao/">Nguồn tham khảo</a></li>
      </ul>
      <div class="footer-note">
        <span>Cập nhật: tháng ${updated}</span>
        <span>Văn bản © HUB. Hình ảnh thuộc chủ sở hữu ghi tại trang Nguồn hình ảnh.</span>
      </div>
    </div>
  </footer>`;
}

function initNav() {
  const nav = document.querySelector('.site-nav');
  const list = nav.querySelector('.nav-links');
  const ind = nav.querySelector('.nav-indicator');
  const links = [...list.querySelectorAll('a')];
  const active = links.find((a) => a.getAttribute('aria-current') === 'page');

  const moveTo = (a) => {
    if (!a) { ind.style.opacity = '0'; return; }
    const lr = list.getBoundingClientRect(), r = a.getBoundingClientRect();
    ind.style.width = `${r.width - 30}px`;
    ind.style.transform = `translateX(${r.left - lr.left + 15}px)`;
    ind.style.opacity = '1';
  };
  // Chỉ báo trượt: nằm dưới mục đang xem, trượt theo mục được trỏ/focus
  requestAnimationFrame(() => moveTo(active));
  document.fonts?.ready.then(() => moveTo(active));
  links.forEach((a) => {
    a.addEventListener('mouseenter', () => moveTo(a));
    a.addEventListener('focus', () => moveTo(a));
  });
  list.addEventListener('mouseleave', () => moveTo(active));
  list.addEventListener('focusout', () => setTimeout(() => { if (!list.contains(document.activeElement)) moveTo(active); }));
  window.addEventListener('resize', () => moveTo(active));

  // Nền mờ khi cuộn, ẩn khi cuộn xuống nhanh
  let lastY = scrollY;
  const onScroll = () => {
    const y = scrollY;
    nav.classList.toggle('is-scrolled', y > 24);
    nav.classList.toggle('is-hidden', y > 400 && y > lastY + 4 && !html.classList.contains('nav-open'));
    if (y < lastY - 4) nav.classList.remove('is-hidden');
    lastY = y;
  };
  addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Menu toàn màn hình trên điện thoại
  const btn = nav.querySelector('.nav-toggle');
  const sheet = document.getElementById('nav-sheet');
  const setOpen = (open) => {
    html.classList.toggle('nav-open', open);
    btn.setAttribute('aria-expanded', String(open));
    btn.setAttribute('aria-label', open ? 'Đóng menu' : 'Mở menu');
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) sheet.querySelector('a')?.focus();
  };
  btn.addEventListener('click', () => setOpen(!html.classList.contains('nav-open')));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && html.classList.contains('nav-open')) { setOpen(false); btn.focus(); }
    if (e.key === 'Tab' && html.classList.contains('nav-open')) {
      const f = [btn, ...sheet.querySelectorAll('a')];
      const i = f.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); f[f.length - 1].focus(); }
      else if (!e.shiftKey && i === f.length - 1) { e.preventDefault(); f[0].focus(); }
    }
  });
  matchMedia('(min-width: 861px)').addEventListener('change', (m) => m.matches && setOpen(false));
}

function initReveal() {
  const els = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -8% 0px' });
  els.forEach((e) => io.observe(e));
}

/** Khởi tạo site. opts.starfield = false để tắt nền sao (trang tự vẽ nền riêng). */
export function initSite(opts = {}) {
  html.classList.remove('no-js');
  document.body.insertAdjacentHTML('afterbegin', navHTML());
  if (opts.footer !== false) document.body.insertAdjacentHTML('beforeend', footerHTML());
  if (opts.starfield !== false) {
    const c = document.createElement('canvas');
    c.className = 'starfield'; c.setAttribute('aria-hidden', 'true');
    const v = document.createElement('div'); v.className = 'vignette';
    document.body.prepend(v); document.body.prepend(c);
    createStarfield(c, opts.starfieldOptions);
  }
  initNav();
  initReveal();
  initTransitions();
  return { reduced: prefersReducedMotion() };
}

/** Lenis (cuộn mượt) + đồng bộ với GSAP ScrollTrigger. Chỉ dùng trên máy có chuột, tắt khi giảm chuyển động. */
export async function initSmoothScroll(gsap, ScrollTrigger) {
  if (prefersReducedMotion() || matchMedia('(pointer: coarse)').matches) return null;
  try {
    const { default: Lenis } = await import('lenis');
    const lenis = new Lenis({ lerp: 0.1, wheelMultiplier: 0.9 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
    // Neo trong trang
    document.addEventListener('click', (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const t = document.querySelector(a.getAttribute('href'));
      if (t) { e.preventDefault(); lenis.scrollTo(t, { offset: -70 }); }
    });
    return lenis;
  } catch { return null; }
}
