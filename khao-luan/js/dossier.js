// Hồ sơ câu hỏi mở: mở trong <dialog> dùng chung kiểu .kc-* với thẻ khái niệm của Thấu hiểu.
// Thứ tự: câu hỏi → điều đã biết chắc → các giả thuyết (mỗi cái có thước đo chắc chắn, ủng hộ / khó khăn)
//         → minh hoạ → làm sao để biết (mốc thời gian) → hiểu lầm → đọc thêm bên Thấu hiểu → nguồn.
import { QUESTIONS, questionById, contentFile, LEVELS, levelOf } from '../content/questions.js';
import { CONCEPTS as TH } from '../../thau-hieu/content/chapters.js';
import { rich, hasMath, loadKatex } from '../../thau-hieu/js/text.js';
import { prefersReducedMotion } from '../../shared/js/util.js';

const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
// [[id]] trỏ sang thẻ bên Thấu hiểu
const R = (s) => rich(s, (id) => TH[id]).replace(/href="#k\//g, 'href="../thau-hieu/#k/');

const cache = new Map();
export function loadQuestion(q) {
  if (q.status !== 'ready') return Promise.resolve(null);
  if (!cache.has(q.id)) cache.set(q.id, import(contentFile(q)).catch((e) => { cache.delete(q.id); throw e; }));
  return cache.get(q.id);
}

let dlg, scroller, page, vizHandles = [], closeCb = () => {};
export const setCloseHandler = (f) => { closeCb = f; };
export const isOpen = () => !!dlg?.open;

function ensure() {
  if (dlg) return;
  dlg = document.createElement('dialog');
  dlg.className = 'kc';
  dlg.setAttribute('aria-labelledby', 'kq-title');
  dlg.innerHTML = '<div class="kc-scroll" data-lenis-prevent><article class="kc-page"></article></div>';
  document.body.append(dlg);
  scroller = dlg.querySelector('.kc-scroll');
  page = dlg.querySelector('.kc-page');
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); closeCb(); });
  dlg.addEventListener('click', (e) => { if (e.target.closest('[data-kc-close]')) { e.preventDefault(); closeCb(); } });
}
function teardown() { vizHandles.forEach((h) => { try { h?.destroy?.(); } catch { /* bỏ qua */ } }); vizHandles = []; }

export function closeDossier() {
  if (!dlg?.open) return Promise.resolve();
  teardown();
  const done = () => { dlg.close(); document.documentElement.classList.remove('kc-open'); };
  if (prefersReducedMotion() || !page.animate) { done(); return Promise.resolve(); }
  return new Promise((res) => { const a = page.animate([{ opacity: 1 }, { opacity: 0, transform: 'scale(.97)' }], { duration: 300, easing: 'ease-in' }); a.onfinish = () => { done(); res(); }; });
}

function meter(levelId) {
  const idx = LEVELS.findIndex((l) => l.id === levelId), L = LEVELS[idx];
  const bars = LEVELS.slice(1).map((_, i) => `<b class="${idx > 0 && i < idx ? 'on' : ''}"></b>`).join('');
  return `<span class="kq-meter" style="--lc:${L.color}"><i aria-hidden="true">${idx === 0 ? '<b></b><b></b><b></b><b></b>' : bars}</i>${esc(L.label)}</span>`;
}

export async function openDossier(id, origin) {
  const q = questionById(id);
  if (!q) return;
  ensure();
  const mod = await loadQuestion(q);
  const d = mod?.DOSSIER;
  teardown();
  const idx = QUESTIONS.indexOf(q);
  const prev = QUESTIONS[idx - 1], next = QUESTIONS[idx + 1];
  if (!d) {
    page.innerHTML = `${bar(q)}<div class="kc-body"><header class="kc-head"><p class="eyebrow">Hồ sơ ${String(q.num).padStart(2, '0')}</p><h1 id="kq-title">${esc(q.title)}</h1></header>
      <div class="soon-frame kc-soon"><p class="eyebrow">Đang biên soạn</p><p class="muted" style="margin:0">${esc(q.short)}</p></div></div>`;
    present(origin); return;
  }
  const texts = [...(d.intro || []), ...(d.known || []), ...(d.after || []), ...(d.hypotheses || []).flatMap((h) => [h.idea, ...(h.for || []), ...(h.against || [])])];
  if (texts.some(hasMath)) await loadKatex();
  page.style.setProperty('--c', q.color);
  const hyps = (d.hypotheses || []).map((h) => `<article class="kq-hyp kc-reveal">
      <header class="kq-hyp-head"><h3>${esc(h.name)}${h.en ? `<small lang="en">${esc(h.en)}</small>` : ''}</h3>${meter(h.level)}</header>
      <p>${R(h.idea)}</p>
      <div class="kq-fa">
        ${h.for?.length ? `<div class="kq-for"><h4>Ủng hộ</h4><ul>${h.for.map((x) => `<li>${R(x)}</li>`).join('')}</ul></div>` : ''}
        ${h.against?.length ? `<div class="kq-against"><h4>Khó khăn</h4><ul>${h.against.map((x) => `<li>${R(x)}</li>`).join('')}</ul></div>` : ''}
      </div>
    </article>`).join('');
  const viz = d.viz ? `<figure class="kc-viz kc-reveal"><div class="kc-viz-stage" style="--h:${d.viz.height || 440}px;--hm:${d.viz.mobileHeight || 360}px"><p class="kc-viz-loading">Đang tải minh hoạ…</p></div>${d.viz.caption ? `<figcaption>${R(d.viz.caption)}</figcaption>` : ''}</figure>` : '';
  const th = (q.thauHieu || []).filter((k) => TH[k]).map((k) => `<a class="kc-chip" href="../thau-hieu/#k/${k}" style="--c:${TH[k].chapter.color}">${esc(TH[k].title)} <span aria-hidden="true">↗</span></a>`).join('');
  page.innerHTML = `${bar(q)}
    <div class="kc-body">
      <header class="kc-head">
        <p class="eyebrow">Hồ sơ câu hỏi mở · ${String(q.num).padStart(2, '0')}</p>
        <h1 id="kq-title">${esc(q.title)}</h1>
        ${d.kicker ? `<p class="kc-en">${esc(d.kicker)}</p>` : ''}
        ${d.certainty ? `<p class="certainty" data-level="${d.certainty.level}">${esc(d.certainty.label)}</p>` : ''}
      </header>
      <div class="kc-text">${(d.intro || []).map((p) => `<p class="kc-reveal">${R(p)}</p>`).join('')}</div>
      ${d.known?.length ? `<section class="kq-known kc-reveal" aria-label="Điều đã biết chắc"><h2 class="kc-h">Điều đã biết chắc</h2><ul>${d.known.map((k) => `<li>${R(k)}</li>`).join('')}</ul></section>` : ''}
      ${hyps ? `<section class="kq-hyps" aria-label="Các giả thuyết"><h2 class="kc-h">Các giả thuyết</h2>${hyps}</section>` : ''}
      ${viz}
      <div class="kc-text">${(d.after || []).map((p) => `<p class="kc-reveal">${R(p)}</p>`).join('')}</div>
      ${d.next?.length ? `<section class="kq-next kc-reveal" aria-label="Làm sao để biết"><h2 class="kc-h">Làm sao để biết</h2><ol>${d.next.map((n) => `<li><time>${esc(n.when)}</time><div><b>${esc(n.name)}</b> — ${R(n.what)}</div></li>`).join('')}</ol></section>` : ''}
      ${d.myths?.length ? `<section class="kc-myths kc-reveal" aria-label="Hiểu lầm thường gặp"><h2 class="kc-h">Hiểu lầm thường gặp</h2>${d.myths.map((m) => `<div class="kc-myth"><p class="kc-myth-x"><span>Hiểu lầm</span>${R(m.myth)}</p><p class="kc-myth-ok"><span>Thực ra</span>${R(m.truth)}</p></div>`).join('')}</section>` : ''}
      ${th ? `<section class="kc-links kc-reveal" aria-label="Đọc thêm"><h2 class="kc-h">Nền tảng bên Thấu hiểu vũ trụ</h2><div class="kc-chips">${th}</div></section>` : ''}
      <div class="kc-end">${d.sources?.length ? `<details class="sources kc-sources"><summary>Nguồn tham khảo</summary><ol>${d.sources.map((s) => `<li>${s.url ? `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.text)}</a>` : esc(s.text)}</li>`).join('')}</ol></details>` : ''}
        <p class="updated">Cập nhật: tháng ${esc(mod.UPDATED)}</p></div>
      <nav class="kc-pager" aria-label="Hồ sơ khác">
        ${prev ? `<a href="#q/${prev.id}" class="kc-prev"><span>←</span> ${esc(prev.title)}</a>` : '<span></span>'}
        ${next ? `<a href="#q/${next.id}" class="kc-next">${esc(next.title)} <span>→</span></a>` : '<span></span>'}
      </nav>
    </div>`;
  present(origin);
  if (d.viz) mountViz(d.viz);
  reveal();
}

function bar(q) {
  return `<header class="kc-bar"><a class="kc-crumb" href="#" data-kc-close style="--c:${q.color}"><span class="kc-dot"></span>Khảo luận vũ trụ · Hồ sơ ${q.num}/${QUESTIONS.length}</a>
    <div class="kc-bar-tools"><button class="kc-close" type="button" data-kc-close aria-label="Đóng (Esc)"><span aria-hidden="true">×</span><span class="kc-close-txt">Đóng</span></button></div></header>`;
}

function present(origin) {
  const first = !dlg.open;
  if (first) { dlg.showModal(); document.documentElement.classList.add('kc-open'); }
  scroller.scrollTop = 0;
  if (prefersReducedMotion() || !page.animate) return;
  const x = origin?.x ?? innerWidth / 2, y = origin?.y ?? innerHeight / 2;
  if (first) page.animate([{ clipPath: `circle(0px at ${x}px ${y}px)`, opacity: 0.4 }, { clipPath: `circle(150% at ${x}px ${y}px)`, opacity: 1 }], { duration: 850, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
  else page.animate([{ opacity: 0, transform: 'translateX(40px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(0.16, 1, 0.3, 1)' });
}

async function mountViz(v) {
  const stage = page.querySelector('.kc-viz-stage');
  try {
    const mod = await import(v.module);
    stage.innerHTML = '';
    vizHandles.push(await mod.mount(stage, { ...v.options, reduced: prefersReducedMotion(), root: scroller }));
  } catch (e) {
    console.warn('[Khảo luận] minh hoạ lỗi', v.module, e);
    stage.innerHTML = '<p class="kc-viz-loading">Không tải được minh hoạ.</p>';
  }
}

function reveal() {
  const els = page.querySelectorAll('.kc-reveal');
  if (prefersReducedMotion() || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('is-in')); return; }
  const io = new IntersectionObserver((en) => { for (const e of en) if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } }, { root: scroller, rootMargin: '0px 0px -6% 0px' });
  els.forEach((e) => io.observe(e));
}
export { levelOf };
