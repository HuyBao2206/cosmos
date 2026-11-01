// Thấu hiểu vũ trụ — điều phối trang: bản đồ tri thức / danh sách, tìm kiếm, định tuyến #k/<id> và #c/<chương>,
// trạng thái "đã đọc" trong phiên, chú thích thuật ngữ.
import { initSite } from '../../shared/js/site.js';
import { hasWebGL, isLowPower, prefersReducedMotion } from '../../shared/js/util.js';
import { CHAPTERS, CONCEPTS, chapterById } from '../content/chapters.js';
import { score, fold } from './text.js';
import { openConcept, openChapter, closeCard, isOpen, setCloseHandler, setReadHandler, preloadShorts, shortOf } from './card.js';

initSite();

const $ = (s, r = document) => r.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

/* ——— Trạng thái đã đọc (chỉ trong phiên trình duyệt) ——— */
const KEY = 'thau-hieu:read';
const read = new Set((() => { try { return JSON.parse(sessionStorage.getItem(KEY) || '[]'); } catch { return []; } })());
const isRead = (id) => read.has(id);
function markRead(id) {
  if (read.has(id)) return;
  read.add(id);
  try { sessionStorage.setItem(KEY, JSON.stringify([...read])); } catch { /* bỏ qua */ }
  updateProgress(); map?.refresh(); renderList();
}
setReadHandler(markRead);

const readyConcepts = () => CHAPTERS.filter((c) => c.status === 'ready').flatMap((c) => c.concepts);
function updateProgress() {
  const total = Object.keys(CONCEPTS).length;
  const ready = readyConcepts().length;
  const n = [...read].filter((id) => CONCEPTS[id]).length;
  $('#th-progress').innerHTML = n
    ? `Bạn đã thắp sáng <b>${n}</b>/${total} ngôi sao`
    : `<b>${ready}</b>/${total} khái niệm đã mở · ${CHAPTERS.filter((c) => c.status === 'ready').length}/9 chương`;
}

/* ——— Danh sách (chế độ tra cứu nhanh) ——— */
function renderList() {
  const box = $('#th-list');
  box.innerHTML = CHAPTERS.map((ch) => `
    <section class="tl-ch${ch.status === 'ready' ? '' : ' is-draft'}" style="--c:${ch.color}" aria-labelledby="tl-${ch.id}">
      <header class="tl-head">
        <p class="tl-num">Chương ${ch.num}${ch.status === 'ready' ? '' : ' · <span>Đang biên soạn</span>'}</p>
        <h3 id="tl-${ch.id}"><a href="#c/${ch.id}">${esc(ch.title)}</a></h3>
        <p class="tl-q">${esc(ch.question)}</p>
      </header>
      <ul class="tl-items">${ch.concepts.map((c) => ch.status === 'ready'
        ? `<li class="${isRead(c.id) ? 'is-read' : ''}"><a href="#k/${c.id}"><span class="tl-dot" aria-hidden="true"></span>${esc(c.title)}${isRead(c.id) ? '<span class="sr-only"> (đã đọc)</span>' : ''}</a></li>`
        : `<li class="is-draft"><span><span class="tl-dot" aria-hidden="true"></span>${esc(c.title)}</span></li>`).join('')}</ul>
    </section>`).join('');
}

/* ——— Bản đồ tri thức ——— */
let map = null;
const stage = $('#th-map');
const canMap = hasWebGL();
async function startMap() {
  if (map || !canMap) return;
  try {
    const { createMap } = await import('./map3d.js');
    map = createMap(stage, {
      chapters: CHAPTERS, isRead,
      onOpenConcept: (id, pos) => go(`#k/${id}`, pos),
      onOpenChapter: (id, rect) => go(`#c/${id}`, rect ? { x: rect.left + rect.width / 2, y: rect.top } : null),
    });
  } catch (e) {
    console.warn('[Thấu hiểu] không khởi tạo được bản đồ 3D', e);
    setMode('list');
  }
}

function setMode(mode) {
  const isMap = mode === 'map' && canMap;
  document.documentElement.dataset.thMode = isMap ? 'map' : 'list';
  $('#th-mode-map').setAttribute('aria-pressed', String(isMap));
  $('#th-mode-list').setAttribute('aria-pressed', String(!isMap));
  if (isMap) startMap();
}
$('#th-mode-map').addEventListener('click', () => setMode('map'));
$('#th-mode-list').addEventListener('click', () => { setMode('list'); $('#th-list').scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' }); });
if (!canMap) { $('#th-mode-map').disabled = true; $('#th-mode-map').title = 'Trình duyệt không hỗ trợ WebGL'; }

/* ——— Tìm kiếm (có dấu hoặc không dấu) ——— */
const input = $('#th-search');
const results = $('#th-results');
let active = -1;
function search(q) {
  const out = [];
  for (const ch of CHAPTERS) {
    const s = score(q, [[ch.title, 6], [ch.question, 2], [ch.en, 3]]);
    if (s) out.push({ type: 'c', id: ch.id, s: s + 1, ch });
    for (const c of ch.concepts) {
      const s2 = score(q, [[c.title, 10], [c.en, 6], ...(c.aka || []).map((a) => [a, 5]), [shortOf[c.id] || '', 1]]);
      if (s2) out.push({ type: 'k', id: c.id, s: s2 + (ch.status === 'ready' ? 2 : 0), ch, c });
    }
  }
  return out.sort((a, b) => b.s - a.s).slice(0, 8);
}
function showResults() {
  const q = input.value;
  if (!fold(q)) { results.hidden = true; input.setAttribute('aria-expanded', 'false'); return; }
  const r = search(q);
  active = r.length ? 0 : -1;
  results.innerHTML = r.length ? r.map((x, i) => {
    const ready = x.ch.status === 'ready';
    const href = x.type === 'k' ? `#k/${x.id}` : `#c/${x.id}`;
    return `<li role="option" id="th-opt-${i}" aria-selected="${i === active}"${ready || x.type === 'c' ? '' : ' aria-disabled="true"'}>
      <a href="${href}" style="--c:${x.ch.color}"><span class="sr-dot"></span>
        <span class="sr-t">${esc(x.type === 'k' ? x.c.title : x.ch.title)}<small>${x.type === 'k' ? `Chương ${x.ch.num} · ${esc(x.ch.title)}` : `Chương ${x.ch.num} · tổng quan`}${ready || x.type === 'c' ? '' : ' · đang biên soạn'}</small></span>
      </a></li>`;
  }).join('') : '<li class="sr-empty">Chưa có khái niệm khớp. Thử từ khác, ví dụ “parsec”, “sao lùn”, “ánh sáng”.</li>';
  results.hidden = false;
  input.setAttribute('aria-expanded', 'true');
  input.setAttribute('aria-activedescendant', active >= 0 ? `th-opt-${active}` : '');
}
input.addEventListener('input', showResults);
input.addEventListener('focus', showResults);
input.addEventListener('keydown', (e) => {
  const opts = [...results.querySelectorAll('[role="option"]')];
  if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
    e.preventDefault();
    if (!opts.length) return;
    active = (active + (e.key === 'ArrowDown' ? 1 : -1) + opts.length) % opts.length;
    opts.forEach((o, i) => o.setAttribute('aria-selected', String(i === active)));
    input.setAttribute('aria-activedescendant', `th-opt-${active}`);
  } else if (e.key === 'Enter' && opts[active]) {
    e.preventDefault();
    const a = opts[active].querySelector('a');
    if (opts[active].getAttribute('aria-disabled') === 'true') return;
    go(a.getAttribute('href'));
    input.blur(); results.hidden = true;
  } else if (e.key === 'Escape') { input.value = ''; results.hidden = true; }
});
results.addEventListener('click', (e) => {
  const li = e.target.closest('[role="option"]');
  if (li?.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
  results.hidden = true;
});
document.addEventListener('pointerdown', (e) => { if (!e.target.closest('.th-search')) results.hidden = true; });
addEventListener('keydown', (e) => {
  if (e.key === '/' && !isOpen() && document.activeElement !== input && !/input|textarea/i.test(document.activeElement?.tagName)) { e.preventDefault(); input.focus(); }
});

/* ——— Định tuyến: #k/<id> mở thẻ, #c/<chương> mở tổng quan ——— */
let pendingOrigin = null;
function go(hash, origin) {
  pendingOrigin = origin || null;
  if (location.hash === hash) route(); else location.hash = hash;
}
let opened = false;
async function route() {
  const h = decodeURIComponent(location.hash);
  const mk = h.match(/^#k\/([a-z0-9-]+)$/);
  const mc = h.match(/^#c\/([a-z0-9-]+)$/);
  const origin = pendingOrigin; pendingOrigin = null;
  if (mk && CONCEPTS[mk[1]]) {
    const ch = CONCEPTS[mk[1]].chapter;
    if (ch.status !== 'ready') { await openChapter(ch.id, origin, isRead); opened = true; return; }
    if (!origin && map && !isOpen() && document.documentElement.dataset.thMode === 'map') {
      // Vào thẳng bằng đường dẫn: cho camera bay tới sao trước khi mở thẻ
      await map.focusConcept(mk[1]);
    }
    await openConcept(mk[1], origin || map?.screenPosOf(mk[1]));
    opened = true;
  } else if (mc && chapterById(mc[1])) {
    await openChapter(mc[1], origin, isRead);
    opened = true;
  } else if (opened || isOpen()) {
    await closeCard();
    opened = false;
    map?.flyHome();
  }
}
setCloseHandler(() => {
  // Đóng thẻ: quay về trang chính (giữ lịch sử để nút Back của trình duyệt cũng đóng được thẻ)
  history.pushState('', document.title, location.pathname + location.search);
  route();
});
addEventListener('hashchange', route);

/* ——— Chú thích thuật ngữ: rê vào chữ gạch chân → định nghĩa ngắn ——— */
const tip = document.createElement('div');
tip.className = 'term-tip'; tip.hidden = true; tip.setAttribute('role', 'tooltip');
document.body.append(tip);
let tipFor = null;
function showTip(a) {
  const c = CONCEPTS[a.dataset.term];
  if (!c) return;
  tipFor = a;
  const ready = c.chapter.status === 'ready';
  tip.innerHTML = `<b>${esc(c.title)}</b>${shortOf[c.id] ? `<span>${esc(shortOf[c.id].replace(/\[\[[^|\]]+\|?([^\]]*)\]\]/g, '$1').replace(/\$/g, ''))}</span>` : ''}<small>${ready ? 'Bấm để mở thẻ' : 'Chương này đang biên soạn'}</small>`;
  tip.hidden = false;
  const host = a.closest('dialog') || document.body;
  if (tip.parentNode !== host) host.append(tip);
  const r = a.getBoundingClientRect();
  const w = Math.min(300, innerWidth - 24);
  tip.style.width = `${w}px`;
  tip.style.left = `${Math.max(12, Math.min(innerWidth - w - 12, r.left + r.width / 2 - w / 2))}px`;
  const below = r.bottom + 10, h = tip.offsetHeight;
  tip.style.top = `${below + h > innerHeight - 8 ? r.top - h - 10 : below}px`;
}
const hideTip = () => { tip.hidden = true; tipFor = null; };
document.addEventListener('pointerover', (e) => { const a = e.target.closest?.('a.term'); if (a && e.pointerType === 'mouse') showTip(a); else if (tipFor && !e.target.closest?.('.term-tip')) hideTip(); });
document.addEventListener('focusin', (e) => { const a = e.target.closest?.('a.term'); if (a) showTip(a); else hideTip(); });
document.addEventListener('scroll', hideTip, true);
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#k/"], a[href^="#c/"]');
  if (!a) return;
  hideTip();
  if (a.getAttribute('aria-disabled') === 'true') { e.preventDefault(); return; }
  e.preventDefault();
  const r = a.getBoundingClientRect();
  go(a.getAttribute('href'), { x: r.left + r.width / 2, y: r.top + r.height / 2 });
});

/* ——— Khởi động ——— */
renderList();
updateProgress();
const preferList = !canMap || (isLowPower() && matchMedia('(pointer: coarse)').matches);
setMode(preferList ? 'list' : 'map');
preloadShorts().then(() => { if (!results.hidden) showResults(); });
if (location.hash) route();
window.__thauHieu = { go, isRead, read, markRead, CHAPTERS };
