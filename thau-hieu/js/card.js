// Thẻ khái niệm & trang tổng quan chương — mở trong một <dialog> như một trang sách.
// Thứ tự trong thẻ: định nghĩa gốc → giải thích → minh hoạ tương tác → con số → hiểu lầm → liên kết → nguồn.
import { CHAPTERS, CONCEPTS, chapterById, contentFile } from '../content/chapters.js';
import { rich, hasMath, loadKatex } from './text.js';
import { prefersReducedMotion } from '../../shared/js/util.js';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const pad = (n) => String(n).padStart(2, '0');

/* ——— Nạp nội dung chương (có bộ nhớ đệm) ——— */
const cache = new Map();
export function loadChapter(ch) {
  if (ch.status !== 'ready') return Promise.resolve(null);
  if (!cache.has(ch.id)) cache.set(ch.id, import(contentFile(ch)).catch((e) => { cache.delete(ch.id); throw e; }));
  return cache.get(ch.id);
}
/** Định nghĩa ngắn (cho chú thích rê chuột & tìm kiếm) khi chương đã được nạp */
export const shortOf = {};
export async function preloadShorts() {
  await Promise.all(CHAPTERS.filter((c) => c.status === 'ready').map(async (ch) => {
    try { const m = await loadChapter(ch); for (const [id, c] of Object.entries(m.CONCEPTS)) shortOf[id] = c.short; } catch { /* bỏ qua */ }
  }));
}

const lookup = (id) => CONCEPTS[id];
const R = (s) => rich(s, lookup);

/* ——— Khung dialog ——— */
let dlg, scroller, page, current = null, vizHandles = [], onReadCb, readTimer, readIO;

function ensureDialog() {
  if (dlg) return;
  dlg = document.createElement('dialog');
  dlg.className = 'kc';
  dlg.setAttribute('aria-labelledby', 'kc-title');
  dlg.innerHTML = `<div class="kc-scroll" data-lenis-prevent><article class="kc-page"></article></div>`;
  document.body.append(dlg);
  scroller = dlg.querySelector('.kc-scroll');
  page = dlg.querySelector('.kc-page');
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); requestClose(); });
  dlg.addEventListener('click', (e) => {
    if (e.target.closest('[data-kc-close]')) { e.preventDefault(); requestClose(); }
  });
}

let closeHandler = () => {};
export function setCloseHandler(fn) { closeHandler = fn; }
export function setReadHandler(fn) { onReadCb = fn; }
function requestClose() { closeHandler(); }

function teardownViz() {
  vizHandles.forEach((h) => { try { h?.destroy?.(); } catch { /* bỏ qua */ } });
  vizHandles = [];
  clearTimeout(readTimer); readIO?.disconnect();
}

/** Mở dialog với hiệu ứng "trang sách bung ra" từ điểm origin {x,y} (toạ độ màn hình). */
function present(origin) {
  const reduced = prefersReducedMotion();
  const firstOpen = !dlg.open;
  if (firstOpen) { dlg.showModal(); document.documentElement.classList.add('kc-open'); }
  scroller.scrollTop = 0;
  if (reduced || !page.animate) { page.animate?.([{ opacity: 0 }, { opacity: 1 }], { duration: 250 }); return; }
  const x = origin?.x ?? innerWidth / 2, y = origin?.y ?? innerHeight / 2;
  if (firstOpen) {
    dlg.animate([{ backgroundColor: 'rgba(5,6,11,0)' }, { backgroundColor: 'rgba(5,6,11,.96)' }], { duration: 600, easing: 'ease-out' });
    page.animate([
      { clipPath: `circle(0px at ${x}px ${y}px)`, transform: 'perspective(1600px) rotateY(-18deg) scale(.96)', opacity: 0.4 },
      { clipPath: `circle(150% at ${x}px ${y}px)`, transform: 'none', opacity: 1 },
    ], { duration: 900, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  } else {
    // Chuyển sang thẻ khác khi đang mở: lật nhẹ như sang trang
    page.animate([{ opacity: 0, transform: 'translateX(40px)' }, { opacity: 1, transform: 'none' }], { duration: 550, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  }
}

export function closeCard() {
  if (!dlg?.open) return Promise.resolve();
  teardownViz();
  const done = () => { dlg.close(); document.documentElement.classList.remove('kc-open'); current = null; };
  if (prefersReducedMotion() || !page.animate) { done(); return Promise.resolve(); }
  return new Promise((res) => {
    const a = page.animate([{ opacity: 1, transform: 'none' }, { opacity: 0, transform: 'scale(.97)' }], { duration: 320, easing: 'ease-in' });
    a.onfinish = () => { done(); res(); };
  });
}
export const isOpen = () => !!dlg?.open;
export const currentId = () => current;

/* ——— Các phần dùng chung ——— */
function topbar(ch, extra = '') {
  return `<header class="kc-bar">
    <a class="kc-crumb" href="#c/${ch.id}" style="--c:${ch.color}"><span class="kc-dot"></span>Chương ${ch.num} · ${esc(ch.title)}</a>
    <div class="kc-bar-tools">${extra}<button class="kc-close" type="button" data-kc-close aria-label="Đóng (Esc)"><span aria-hidden="true">×</span><span class="kc-close-txt">Đóng</span></button></div>
  </header>`;
}

function sourcesBlock(list, updated) {
  if (!list?.length) return '';
  return `<details class="sources kc-sources"><summary>Nguồn tham khảo</summary><ol>${list.map((s) =>
    `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.text)}</a>` : esc(s.text)}${s.note ? ` <span class="muted">— ${esc(s.note)}</span>` : ''}</li>`).join('')}</ol></details>
    <p class="updated">Cập nhật: tháng ${esc(updated || document.documentElement.dataset.updated || '')}</p>`;
}

/* ——— Thẻ khái niệm ——— */
export async function openConcept(id, origin) {
  const meta = CONCEPTS[id];
  if (!meta) return;
  const ch = meta.chapter;
  ensureDialog();
  const mod = await loadChapter(ch);
  const c = mod?.CONCEPTS?.[id];
  if (!c) return;
  const needMath = [c.definition?.vi, ...(c.body || []), ...(c.after || []), ...(c.formulas || []), ...(c.symbols || []).flat(),
    ...(c.numbers || []).flatMap((n) => [n.value, n.label]), ...(c.myths || []).flatMap((m) => [m.myth, m.truth])].some(hasMath);
  if (needMath) await loadKatex();
  teardownViz();
  current = id;

  const idx = ch.concepts.findIndex((x) => x.id === id);
  const prev = ch.concepts[idx - 1], next = ch.concepts[idx + 1];
  const nav = `<nav class="kc-pager" aria-label="Khái niệm trong chương">
    ${prev ? `<a href="#k/${prev.id}" class="kc-prev"><span>←</span> ${esc(prev.title)}</a>` : `<a href="#c/${ch.id}" class="kc-prev"><span>←</span> Tổng quan chương</a>`}
    ${next ? `<a href="#k/${next.id}" class="kc-next">${esc(next.title)} <span>→</span></a>` : `<a href="#c/${ch.id}" class="kc-next">Tổng quan chương <span>↺</span></a>`}
  </nav>`;

  const def = c.definition;
  const defHTML = def ? `<figure class="kc-def kc-reveal${def.paraphrase ? ' is-paraphrase' : ''}">
      <blockquote><p>${R(def.vi)}</p></blockquote>
      <figcaption>
        <span class="kc-def-src">— ${esc(def.source)}${def.url ? ` · <a href="${esc(def.url)}" target="_blank" rel="noopener">nguồn ↗</a>` : ''}</span>
        ${def.en ? `<details class="kc-orig"><summary>Nguyên văn tiếng Anh</summary><p lang="en">“${esc(def.en)}”</p></details>` : ''}
      </figcaption>
    </figure>` : '';

  const bodyHTML = (c.body || []).map((p) => `<p class="kc-reveal">${R(p)}</p>`).join('');
  const formulaHTML = (c.formulas || []).length ? `<div class="kc-formulas kc-reveal">${c.formulas.map((f) => `<div class="kc-formula">${R(f)}</div>`).join('')}</div>` : '';
  const symbolsHTML = c.symbols?.length ? `<dl class="kc-symbols kc-reveal">${c.symbols.map((s) => (s[0] ? `<div><dt>${R(s[0])}</dt><dd>${R(s[1])}</dd></div>` : `<p class="kc-sym-note">${R(s[1])}</p>`)).join('')}</dl>` : '';

  const vizList = c.viz ? (Array.isArray(c.viz) ? c.viz : [c.viz]) : [];
  const vizHTML = vizList.map((v, i) => `<figure class="kc-viz kc-reveal" data-viz="${esc(v.module)}" data-i="${i}">
      <div class="kc-viz-stage" style="--h:${v.height || 440}px;--hm:${v.mobileHeight || 340}px"><p class="kc-viz-loading">Đang tải minh hoạ…</p></div>
      ${v.caption ? `<figcaption>${R(v.caption)}</figcaption>` : ''}
    </figure>`).join('');

  const numbersHTML = c.numbers?.length ? `<section class="kc-numbers kc-reveal" aria-label="Con số đáng nhớ">
      <h2 class="kc-h">Con số đáng nhớ</h2>
      <div class="kc-num-grid">${c.numbers.map((n) => `<div class="kc-num"><p class="kc-num-v">${R(n.value)}</p><p class="kc-num-l">${R(n.label)}</p>${n.source ? `<p class="kc-num-s">${esc(n.source)}</p>` : ''}</div>`).join('')}</div>
    </section>` : '';

  const mythsHTML = c.myths?.length ? `<section class="kc-myths kc-reveal" aria-label="Hiểu lầm thường gặp">
      <h2 class="kc-h">Hiểu lầm thường gặp</h2>
      ${c.myths.map((m) => `<div class="kc-myth"><p class="kc-myth-x"><span>Hiểu lầm</span>${R(m.myth)}</p><p class="kc-myth-ok"><span>Thực ra</span>${R(m.truth)}</p></div>`).join('')}
    </section>` : '';

  const rel = (meta.links || []).concat(c.related || []).filter((x, i, a) => a.indexOf(x) === i && CONCEPTS[x] && x !== id);
  const back = Object.values(CONCEPTS).filter((x) => (x.links || []).includes(id) && !rel.includes(x.id)).map((x) => x.id);
  const chips = [...rel, ...back].map((rid) => {
    const r = CONCEPTS[rid];
    const ready = r.chapter.status === 'ready';
    return `<a class="kc-chip${ready ? '' : ' is-draft'}" href="#k/${rid}" style="--c:${r.chapter.color}"${ready ? '' : ' aria-disabled="true" title="Đang biên soạn"'}>${esc(r.title)}${ready ? '' : ' <small>· đang biên soạn</small>'}</a>`;
  }).join('');
  const kp = (c.khamPha || []).map((k) => `<a class="kc-chip kc-chip-out" href="../kham-pha/${k.href}">${esc(k.label)} <span aria-hidden="true">↗</span></a>`).join('');
  const kl = (c.khaoLuan || []).map((k) => `<span class="kc-chip is-draft" title="Khảo luận vũ trụ sắp mở cửa">${esc(k.label)} <small>· Khảo luận, sắp mở</small></span>`).join('');
  const linksHTML = (chips || kp || kl) ? `<section class="kc-links kc-reveal" aria-label="Liên kết">
      <h2 class="kc-h">Liên kết</h2>
      ${chips ? `<div class="kc-link-row"><p class="kc-link-l">Khái niệm liên quan</p><div class="kc-chips">${chips}</div></div>` : ''}
      ${kp ? `<div class="kc-link-row"><p class="kc-link-l">Xem bên Khám phá</p><div class="kc-chips">${kp}</div></div>` : ''}
      ${kl ? `<div class="kc-link-row"><p class="kc-link-l">Câu hỏi mở</p><div class="kc-chips">${kl}</div></div>` : ''}
    </section>` : '';

  page.style.setProperty('--c', ch.color);
  page.innerHTML = `${topbar(ch)}
    <div class="kc-body">
      <header class="kc-head">
        <p class="eyebrow">Khái niệm · ${pad(ch.num)}.${pad(idx + 1)}</p>
        <h1 id="kc-title">${esc(meta.title)}</h1>
        <p class="kc-en" lang="en">${esc(meta.en)}</p>
        ${c.certainty ? `<p class="certainty" data-level="${c.certainty.level}">${esc(c.certainty.label)}</p>` : ''}
      </header>
      ${defHTML}
      <div class="kc-text">${bodyHTML}${formulaHTML}${symbolsHTML}</div>
      ${vizHTML}
      <div class="kc-text">${(c.after || []).map((p) => `<p class="kc-reveal">${R(p)}</p>`).join('')}</div>
      ${numbersHTML}${mythsHTML}${linksHTML}
      <div class="kc-end">${sourcesBlock(c.sources, mod.UPDATED)}</div>
      ${nav}
    </div>`;
  present(origin);
  mountViz(vizList);
  revealOnScroll();
  trackRead(id);
  return c;
}

/* ——— Trang tổng quan chương ——— */
export async function openChapter(chId, origin, isRead = () => false) {
  const ch = chapterById(chId);
  if (!ch) return;
  ensureDialog();
  let mod = null;
  try { mod = await loadChapter(ch); } catch { mod = null; }
  teardownViz();
  current = `c:${chId}`;
  const info = mod?.CHAPTER || {};
  const list = ch.concepts.map((c, i) => {
    const ready = ch.status === 'ready';
    const sh = mod?.CONCEPTS?.[c.id]?.short;
    return `<li class="${isRead(c.id) ? 'is-read' : ''}">
      ${ready ? `<a href="#k/${c.id}">` : '<div class="is-draft">'}
        <span class="kc-ov-n">${pad(ch.num)}.${pad(i + 1)}</span>
        <span class="kc-ov-t"><b>${esc(c.title)}</b>${sh ? `<small>${R(sh)}</small>` : `<small lang="en">${esc(c.en)}</small>`}</span>
        <span class="kc-ov-s">${ready ? (isRead(c.id) ? 'Đã đọc ✓' : 'Đọc →') : 'Đang biên soạn'}</span>
      ${ready ? '</a>' : '</div>'}
    </li>`;
  }).join('');
  page.style.setProperty('--c', ch.color);
  page.innerHTML = `${topbar(ch)}
    <div class="kc-body kc-overview">
      <header class="kc-head">
        <p class="eyebrow">Chương ${ch.num} · ${esc(ch.title)}</p>
        <h1 id="kc-title" class="kc-question">${esc(ch.question)}</h1>
        ${info.intro ? `<div class="kc-text">${info.intro.map((p) => `<p class="lead">${R(p)}</p>`).join('')}</div>` : ''}
        ${ch.status !== 'ready' ? `<div class="soon-frame kc-soon"><p class="eyebrow">Đang biên soạn</p><p class="muted" style="margin:0">Các thẻ của chương này đang được nghiên cứu và viết. Ngôi sao của chương sẽ sáng lên trên bản đồ khi chương hoàn thành.</p></div>` : ''}
      </header>
      ${info.diagram ? `<figure class="kc-diagram">${diagramSVG(ch, info.diagram, isRead)}<figcaption>Sơ đồ liên hệ giữa các khái niệm trong chương. Bấm vào một khái niệm để mở thẻ.</figcaption></figure>` : ''}
      <ol class="kc-ov-list">${list}</ol>
      ${info.sources ? `<div class="kc-end">${sourcesBlock(info.sources, mod.UPDATED)}</div>` : ''}
    </div>`;
  if ([...(info.intro || [])].some(hasMath)) { await loadKatex(); }
  present(origin);
}

/** Sơ đồ khái niệm: nút ở toạ độ (0..100 × 0..60), cạnh có nhãn quan hệ. */
function diagramSVG(ch, d, isRead) {
  const W = 1000, H = 600, sx = W / 100, sy = H / 60;
  const pos = Object.fromEntries(d.nodes.map((n) => [n.id, [n.x * sx, n.y * sy]]));
  const edges = (d.edges || []).map(([a, b, label]) => {
    const [x1, y1] = pos[a], [x2, y2] = pos[b];
    const mx = (x1 + x2) / 2, my = (y1 + y2) / 2 - 18;
    return `<g class="kd-edge"><path d="M${x1},${y1} Q${mx},${my - 30} ${x2},${y2}" pathLength="1"/>${label ? `<text x="${mx}" y="${my - 8}">${esc(label)}</text>` : ''}</g>`;
  }).join('');
  const nodes = d.nodes.map((n) => {
    const c = CONCEPTS[n.id]; const [x, y] = pos[n.id];
    const title = n.label || c?.title || n.id;
    const words = title.split(' ');
    // ngắt dòng nhãn dài
    const lines = []; let line = '';
    for (const w of words) { if ((line + ' ' + w).trim().length > 18 && line) { lines.push(line); line = w; } else line = (line + ' ' + w).trim(); }
    lines.push(line);
    const read = c && isRead(n.id);
    const inner = `<circle r="${n.big ? 13 : 9}" class="kd-star"/><circle r="${n.big ? 30 : 22}" class="kd-halo"/>${lines.map((l, i) => `<text y="${(n.big ? 40 : 34) + i * 22}">${esc(l)}</text>`).join('')}`;
    return c ? `<a href="#k/${n.id}" class="kd-node${read ? ' is-read' : ''}" transform="translate(${x},${y})">${inner}</a>`
      : `<g class="kd-node kd-ext" transform="translate(${x},${y})">${inner}</g>`;
  }).join('');
  return `<svg viewBox="0 0 ${W} ${H + 60}" role="img" aria-label="Sơ đồ khái niệm chương ${ch.num}">${edges}${nodes}</svg>`;
}

/* ——— Minh hoạ tương tác (mỗi minh hoạ là một module trong js/viz/) ——— */
function mountViz(list) {
  page.querySelectorAll('.kc-viz').forEach(async (fig) => {
    const v = list[+fig.dataset.i];
    const stage = fig.querySelector('.kc-viz-stage');
    try {
      const mod = await import(`./viz/${v.module}.js`);
      stage.innerHTML = '';
      const handle = await mod.mount(stage, { ...v.options, reduced: prefersReducedMotion(), root: scroller });
      vizHandles.push(handle);
    } catch (e) {
      console.warn('[Thấu hiểu] minh hoạ lỗi', v.module, e);
      stage.innerHTML = '<p class="kc-viz-loading">Không tải được minh hoạ.</p>';
    }
  });
}

/* ——— Các phần hiện theo nhịp cuộn trong thẻ ——— */
function revealOnScroll() {
  const els = page.querySelectorAll('.kc-reveal');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); }
  }, { root: scroller, rootMargin: '0px 0px -6% 0px' });
  els.forEach((e) => io.observe(e));
}

/* ——— Đánh dấu đã đọc: cuộn tới cuối thẻ, hoặc mở thẻ đủ 40 giây ——— */
function trackRead(id) {
  const end = page.querySelector('.kc-end');
  const mark = () => { if (current === id) onReadCb?.(id); };
  readTimer = setTimeout(mark, 40000);
  if (end) {
    readIO = new IntersectionObserver((en) => { if (en.some((e) => e.isIntersecting)) { mark(); readIO.disconnect(); } }, { root: scroller });
    readIO.observe(end);
  }
}
