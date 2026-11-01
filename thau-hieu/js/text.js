// Tiện ích chữ: chuẩn hoá tiếng Việt cho tìm kiếm, và chuyển cú pháp nội dung thẻ sang HTML.
//
// Cú pháp nội dung (trong content/chNN.js):
//   [[id]]          → liên kết tới thẻ khái niệm khác (gạch chân mảnh, rê chuột hiện định nghĩa ngắn)
//   [[id|chữ hiện]] → như trên, với chữ hiện khác tên thẻ
//   $...$           → công thức KaTeX trong dòng · $$...$$ → công thức riêng một dòng
//   **đậm**  _nghiêng_  (không dùng *x* vì tên như M87*, Sgr A* có dấu sao)
// Nội dung do chính dự án viết; chữ vẫn được escape trước khi ghép thẻ HTML.

/** Bỏ dấu, chữ thường: "Năm ánh sáng" → "nam anh sang" (đ → d). */
export function fold(s) {
  return String(s || '').normalize('NFD').replace(/[̀-ͯ]/g, '')
    .replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase().replace(/[^a-z0-9*]+/g, ' ').trim();
}

/** Điểm khớp đơn giản: mọi từ của truy vấn phải xuất hiện; khớp đầu từ/đầu tên được cộng điểm. */
export function score(query, fields) {
  const q = fold(query);
  if (!q) return 0;
  const words = q.split(' ');
  let total = 0;
  for (const [text, weight] of fields) {
    const t = ' ' + fold(text) + ' ';
    if (!words.every((w) => t.includes(w))) continue;
    let s = weight;
    if (t.startsWith(' ' + q)) s += weight * 2;
    else if (t.includes(' ' + q)) s += weight;
    total = Math.max(total, s);
  }
  return total;
}

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

let katex = null;
/** Nạp KaTeX khi cần (qua importmap). Lỗi mạng → hiện mã TeX gốc. */
export async function loadKatex() {
  if (katex) return katex;
  try {
    if (!document.querySelector('link[data-katex]')) {
      const l = document.createElement('link');
      l.rel = 'stylesheet'; l.dataset.katex = '';
      l.href = 'https://cdn.jsdelivr.net/npm/katex@0.19.0/dist/katex.min.css';
      document.head.append(l);
    }
    katex = (await import('katex')).default;
  } catch { katex = null; }
  return katex;
}

function math(tex, display) {
  if (katex) {
    try { return katex.renderToString(tex, { displayMode: display, throwOnError: false, output: 'htmlAndMathml' }); } catch { /* rơi xuống dưới */ }
  }
  return display ? `<code class="tex tex-block">${esc(tex)}</code>` : `<code class="tex">${esc(tex)}</code>`;
}

/** Chuyển một đoạn nội dung thành HTML. lookup(id) → { title } để lấy tên thẻ khi viết [[id]]. */
export function rich(src, lookup) {
  const parts = [];
  // Tách công thức ra trước để không bị đụng bởi các quy tắc khác
  let s = String(src).replace(/\$\$([\s\S]+?)\$\$|\$([^$\n]+?)\$/g, (_, block, inline) => {
    parts.push(block != null ? math(block.trim(), true) : math(inline.trim(), false));
    return `\u0000${parts.length - 1}\u0000`;
  });
  s = esc(s)
    .replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g, (_, id, text) => {
      const c = lookup?.(id);
      const label = text || c?.title || id;
      if (!c) return label;
      return `<a class="term" href="#k/${id}" data-term="${id}">${label}</a>`;
    })
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(^|[\s(«“])_([^_\n]+?)_(?=[\s.,;:)!?»”]|$)/g, '$1<em>$2</em>');
  return s.replace(/\u0000(\d+)\u0000/g, (_, i) => parts[+i]);
}

/** Chứa công thức không? (để quyết định có cần nạp KaTeX) */
export const hasMath = (s) => /\$[^$]+\$/.test(String(s));
