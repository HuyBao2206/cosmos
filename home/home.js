// Trang chủ: Tỉ lệ của bạn → lời mở đầu → ba cửa vào
import { initSite } from '../shared/js/site.js';
import { SECTIONS } from '../shared/js/config.js';
import { LOI_MO_DAU } from '../shared/content/loi-mo-dau.js';
import { prefersReducedMotion } from '../shared/js/util.js';
import { initPowers } from './powers.js';
import { initPortals } from './portals.js';

initSite();
const reduced = prefersReducedMotion();
if (reduced) document.documentElement.classList.add('is-reduced');

// ---------- Lời mở đầu: đặt nguyên văn, tách câu để sáng dần theo nhịp đọc ----------
const escape = (s) => s.replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));
const box = document.querySelector('[data-prologue]');
box.innerHTML = LOI_MO_DAU.khoi1.map((para) => {
  // Tách sau dấu . ? ! (có thể kèm dấu nháy) và khoảng trắng — không thay đổi chữ nào
  const parts = para.match(/[^.?!]+[.?!]+["”»]?\s*|[^.?!]+$/g) || [para];
  return `<p>${parts.map((s) => `<span class="s">${escape(s)}</span>`).join('')}</p>`;
}).join('');
const q = document.querySelector('[data-quote]');
q.querySelector('.en').textContent = LOI_MO_DAU.khoi2.trichDan;
q.querySelector('.vi').textContent = LOI_MO_DAU.khoi2.banDich;
q.querySelector('figcaption').textContent = `— ${LOI_MO_DAU.khoi2.tacGia}`;

const sentences = [...box.querySelectorAll('.s')];
if (!reduced) {
  // Mỗi câu sáng lên khi đi qua vùng đọc (khoảng 62 % chiều cao màn hình)
  const update = () => {
    const line = innerHeight * 0.62;
    for (const s of sentences) s.classList.toggle('is-lit', s.getBoundingClientRect().top < line);
  };
  addEventListener('scroll', update, { passive: true });
  addEventListener('resize', update);
  update();
}

// ---------- Ba cửa vào: nhãn "Sắp mở cửa" theo cấu hình ----------
for (const s of SECTIONS) {
  const el = document.querySelector(`.portal[data-id="${s.id}"]`);
  if (!el || s.open) continue;
  el.classList.add('is-soon');
  el.insertAdjacentHTML('afterbegin', '<span class="tag-soon">Sắp mở cửa</span>');
  const go = el.querySelector('.portal-go');
  if (go) go.textContent = 'Xem trước';
}
initPortals(document);

// ---------- Tỉ lệ của bạn ----------
const powers = document.querySelector('.powers');
if (reduced) powers.classList.add('is-reduced');
initPowers(powers);
