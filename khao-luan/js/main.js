// Khảo luận vũ trụ — điều phối: danh sách hồ sơ, năm mức chắc chắn, định tuyến #q/<id>.
import { initSite } from '../../shared/js/site.js';
import { QUESTIONS, LEVELS, questionById } from '../content/questions.js';
import { openDossier, closeDossier, isOpen, setCloseHandler } from './dossier.js';

initSite();
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

$('#kl-list').innerHTML = QUESTIONS.map((q) => `<a class="kl-card${q.status === 'ready' ? '' : ' is-draft'}" href="#q/${q.id}" style="--c:${q.color}"${q.status === 'ready' ? '' : ' aria-disabled="true"'}>
    <p class="kl-card-n">Hồ sơ ${String(q.num).padStart(2, '0')}</p><h3>${esc(q.title)}</h3><p>${esc(q.short)}</p>
    <p class="kl-card-s">${q.status === 'ready' ? 'Mở hồ sơ →' : 'Đang biên soạn'}</p></a>`).join('');
$('#kl-levels').innerHTML = LEVELS.slice().reverse().map((l) => `<div style="--lc:${l.color}"><dt>${l.label}</dt><dd>${esc(l.text)}</dd></div>`).join('');


/* ——— Định tuyến ——— */
let pendingOrigin = null, opened = false;
function go(hash, origin) { pendingOrigin = origin || null; if (location.hash === hash) route(); else location.hash = hash; }
async function route() {
  const m = decodeURIComponent(location.hash).match(/^#q\/([a-z0-9-]+)$/);
  const origin = pendingOrigin; pendingOrigin = null;
  if (m && questionById(m[1])) { await openDossier(m[1], origin); opened = true; }
  else if (opened || isOpen()) { await closeDossier(); opened = false; }
}
setCloseHandler(() => { history.pushState('', document.title, location.pathname + location.search); route(); });
addEventListener('hashchange', route);
document.addEventListener('click', (e) => {
  const a = e.target.closest('a[href^="#q/"]');
  if (!a) return;
  e.preventDefault();
  if (a.getAttribute('aria-disabled') === 'true') return;
  const r = a.getBoundingClientRect();
  go(a.getAttribute('href'), { x: r.left + r.width / 2, y: r.top + r.height / 2 });
});
if (location.hash) route();
window.__khaoLuan = { go };
