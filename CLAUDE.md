# CLAUDE.md — Into the Cosmos · by HUB

Đọc file này trước khi làm. Đọc thêm `PROGRESS.md` và `git log` để biết đang làm tới đâu.

## Dự án
Trang khoa học về vũ trụ (tiếng Việt), chạy trên GitHub Pages tại https://huybao2206.github.io/cosmos/
(repo `huybao2206/cosmos`, nhánh `main`, thư mục gốc). Một trang chủ + 3 web con dùng chung hệ thiết kế.

```
/                 index.html — trang chủ
/home/            JS/CSS riêng của trang chủ
/kham-pha/        Khám phá vũ trụ (accent vàng ánh sao)
/thau-hieu/       Thấu hiểu vũ trụ (accent xanh băng) — hiện là trang "Sắp mở cửa"
/khao-luan/       Khảo luận vũ trụ (accent tím tinh vân) — hiện là trang "Sắp mở cửa"
/nguon-hinh-anh/  trang credit hình ảnh (toàn site)
/nguon-tham-khao/ trang nguồn tham khảo (toàn site)
/shared/          css/tokens.css, css/base.css, js/site.js, js/config.js, js/starfield.js,
                  js/transition.js, js/util.js, content/ (văn bản chủ dự án tự sửa), head.txt (mẫu <head>)
/research/        ghi chép nghiên cứu theo chủ đề: nguồn, số liệu, chỗ nguồn lệch nhau
/tests/           node --test tests/*.test.mjs
/tools/           serve-test.mjs (Playwright), make_de421_fixture.py
404.html          tự đặt <base> theo /cosmos/ hoặc / (GitHub Pages trả 404 ở mọi độ sâu)
.nojekyll
```

## Công nghệ và quy ước
- HTML/CSS/JS thuần, ES modules, **không build step**. Đường dẫn luôn tương đối.
- Thư viện qua jsDelivr, pin version, khai báo bằng `importmap` trong `<head>` mỗi trang (mẫu ở `shared/head.txt`):
  three 0.187.0 (`three`, `three/addons/`), GSAP 3.15.0 (`gsap`, `gsap/ScrollTrigger.js`, `gsap/SplitText.js`,
  `gsap/Flip.js`, `gsap/DrawSVGPlugin.js`), Lenis 1.3.27 (`lenis`). Đổi version thì đổi ở mọi trang.
- Mỗi trang: `<html lang="vi" class="no-js" data-root="../" data-section="kham-pha" data-updated="10/2026">`.
  `data-root` là đường dẫn tương đối về gốc site; `data-section` ∈ home | kham-pha | thau-hieu | khao-luan
  (quyết định màu accent và mục sáng trên menu).
- Gọi `initSite()` từ `shared/js/site.js`: chèn menu, footer, nền sao, chuyển trang, `.reveal`.
  `initSite({ starfield: false })` nếu trang có nền riêng. `initSmoothScroll(gsap, ScrollTrigger)` để bật Lenis.
- Mở cửa một web con: `shared/js/config.js` → `open: true`. Trang chủ đọc cùng cấu hình này cho nhãn "Sắp mở cửa".
- Lớp tiện ích CSS: `.wrap`, `.wrap-text`, `.section`, `.section-head`, `.eyebrow`, `.lead`, `.btn`, `.soon-frame`,
  `.tag-soon`, `.sources` (dùng `<details class="sources">`), `.updated`, `.certainty[data-level=established|strong|debated|speculative]`, `.reveal`.
- Hiệu năng: `util.isLowPower()` để giảm hạt/độ phân giải; dừng vòng render khi tab ẩn (`onVisibilityChange`) hoặc khi
  phần tử ra khỏi màn hình (`onInView`); `hasWebGL()` để có fallback; tôn trọng `prefersReducedMotion()`.
- Số kiểu Việt Nam: `util.fmt(149.6, 1)` → "149,6"; `util.sci(5.97e24)` → "5,97 × 10²⁴".

## Hệ thiết kế
- Nền `#05060b`, chữ ngà `#ece6d8`, chữ phụ `#b9b3a6`, chú thích `#8a857b` (đều đạt AA trên nền).
- Accent: Khám phá `#e6c27a`, Thấu hiểu `#9fd4e8`, Khảo luận `#b79be6` — dùng tiết chế.
- Font: Cormorant Garamond (tiêu đề, serif cổ điển) + Be Vietnam Pro (nội dung); Google Fonts, có subset tiếng Việt.
- Cảm giác: mênh mông, tĩnh lặng, điện ảnh, tối giản. Tiêu đề lớn, nhiều khoảng trống. Hiệu ứng có chủ đích.
- Mỗi web con cần ít nhất một khoảnh khắc "chưa từng thấy" — ghi trong plan trước khi code.

## Thêm một trang mới
1. Tạo `thu-muc/index.html`, chép `<head>` từ `shared/head.txt`, thay `{ROOT}` bằng `../` (hoặc `../../`).
2. Đặt `data-root`, `data-section`, `data-updated` trên `<html>`; `<main id="main">`.
3. Cuối body: `<script type="module">import { initSite } from '../shared/js/site.js'; initSite();</script>`.
4. Thêm ngăn `<details class="sources">` "Nguồn tham khảo" và dòng `.updated`. Credit ảnh vào `/nguon-hinh-anh/`.

## Quy trình git
- Làm thẳng trên `main`. Mỗi bước hoàn chỉnh: commit → `git push origin main` ngay.
- Push bị chặn: push nhánh hiện tại, tạo PR vào `main` và merge.
- Không bao giờ push trạng thái làm vỡ web: phần chưa xong thì ẩn hoặc dùng `.soon-frame` "Đang được hoàn thiện".
- Trước khi push: `node --test tests/*.test.mjs` và
  `VENDOR=/tmp/vendor/node_modules WIDTHS=1440,390 node tools/serve-test.mjs /cosmos/ /cosmos/kham-pha/`
  (cần `npm i three@0.187.0 gsap@3.15.0 lenis@1.3.27` trong /tmp/vendor nếu máy không ra được jsDelivr). Không lỗi console.

## Chuẩn văn phong (rút gọn)
- Giọng sách/báo khoa học phổ thông uy tín: câu chặt, chính xác, trung tính. Không cảm thán, không giật gân.
- Sự kỳ vĩ hiện ra qua số liệu và phép so sánh tính đúng, không qua tính từ.
- Thuật ngữ tiếng Việt chuẩn, lần đầu kèm tiếng Anh: đơn vị thiên văn (astronomical unit, AU)…
- Số kiểu Việt: 149,6 triệu km; 5,97 × 10²⁴ kg; luôn có đơn vị.
- Nghiên cứu trước khi viết; nguồn ưu tiên NASA/ESA/IAU/JPL → bài bình duyệt → giáo trình → báo khoa học.
  Wikipedia chỉ để lần ra nguồn gốc. Lưu ghi chép vào `research/<chu-de>.md`.
- Dữ kiện hay đổi (số vệ tinh, số ngoại hành tinh, H0, sứ mệnh) phải ghi ngày.
- Phân biệt mức chắc chắn: đã xác lập / được ủng hộ mạnh / đang tranh luận / suy đoán.
- Viết xong phần lớn: gọi subagent biên tập viên khoa học (chưa thấy quá trình viết) đối chiếu `research/`, sửa rồi mới push.
- Ảnh: chỉ dùng nguồn có giấy phép rõ (NASA, ESA/Hubble, ESA/Webb CC BY 4.0, Solar System Scope CC BY 4.0,
  tác phẩm thuộc phạm vi công cộng), ghi credit ở `/nguon-hinh-anh/`.

## Môi trường build (lưu ý cho phiên sau)
Container của Claude Code có mạng hạn chế: jsDelivr, NASA, JPL, Wikimedia thường bị chặn; npm, PyPI,
raw.githubusercontent.com và `git clone` từ GitHub dùng được. Vì vậy:
- Kiểm thử cục bộ chuyển hướng jsDelivr sang npm cục bộ (`tools/serve-test.mjs`, biến `VENDOR`).
- Đối chiếu quỹ đạo dùng lịch thiên văn JPL DE421 (gói PyPI `de421` + `jplephem`) thay cho Horizons API.
- Texture hành tinh Solar System Scope lấy từ repo `qt/qt3d` (tests/manual/planets-qml/images/solarsystemscope).
