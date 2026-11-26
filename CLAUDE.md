# CLAUDE.md — Into the Cosmos · by HUB

Đọc file này trước khi làm. Đọc thêm `PROGRESS.md` và `git log` để biết đang làm tới đâu.

## Dự án
Trang khoa học về vũ trụ (tiếng Việt), chạy trên GitHub Pages tại https://huybao2206.github.io/cosmos/
(repo `huybao2206/cosmos`, nhánh `main`, thư mục gốc). Một trang chủ + 3 web con dùng chung hệ thiết kế.

```
/                 index.html — trang chủ
/home/            trang chủ: home.js, powers.js (Powers of Ten, canvas 2D), portals.js, home.css, assets/
/kham-pha/        Khám phá vũ trụ (accent vàng ánh sao) — xem mục "Web Khám phá" bên dưới
/thau-hieu/       Thấu hiểu vũ trụ (accent xanh băng) — xem mục "Web Thấu hiểu" bên dưới
/khao-luan/       Khảo luận vũ trụ (accent tím tinh vân) — xem mục "Web Khảo luận" bên dưới
/nguon-hinh-anh/  trang credit hình ảnh (toàn site)
/nguon-tham-khao/ trang nguồn tham khảo (toàn site)
/shared/          css/tokens.css, css/base.css, js/site.js, js/config.js, js/starfield.js,
                  js/transition.js, js/util.js, js/astro/kepler.js (vị trí hành tinh, cực quay, thời gian ánh sáng),
                  js/astro/physics.js (hằng số + hàm vật lý cho minh hoạ, có test), js/astro/cosmology.js (ΛCDM Planck 2018),
                  content/loi-mo-dau.js (lời mở đầu — chủ dự án tự sửa), content/lien-ket.js (liên kết Khám phá ↔ Thấu hiểu),
                  head.txt (mẫu <head>)
/research/        ghi chép nghiên cứu theo chủ đề: nguồn, số liệu, chỗ nguồn lệch nhau
/tests/           node --test tests/*.test.mjs
/tools/           serve-test.mjs (Playwright), shoot-cards.mjs (chụp thẻ Thấu hiểu), make_de421_fixture.py, make_home_assets.py, make_disks.py
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

## Web Khám phá (`/kham-pha/`) — đã xong
- `js/main.js` điều phối; C1 `solar-system.js` (+ `sun-shader.js`), C2 `profiles.js` (+ `profiles-content.js`),
  C3 `gods.js` (+ `gods-content.js`); số liệu chung `planets-data.js` (NSSDCA).
- C1: Three.js. Ecliptic J2000 (x,y,z) → Three (x, z, −y). Khoảng cách ánh xạ d' = 12·r^pow (pow 0,5 = "Dễ nhìn",
  1 = thật). Ba chế độ trong `MODES`. Hai trạng thái: xem trước trong trang (không điều khiển, camera tự quay chậm)
  và toàn màn hình (`.ss.is-full`, `html.ss-fullscreen`, nút "Mở mô hình toàn màn hình"; Esc/nút Đóng/Back để thoát).
  Toàn màn hình: thanh bên (máy tính) hoặc ngăn dưới (điện thoại) với 4 tab Thời gian · Tỉ lệ · Ánh sáng · Hành tinh —
  thông tin không bao giờ đè lên nhau. Chặn pinch/double-tap zoom của trình duyệt khi ở toàn màn hình.
  Nhãn hành tinh: chữ có viền (`-webkit-text-stroke` + `paint-order`), không có vòng tròn; tự ẩn khi chồng nhau.
  Lưu ý: không đặt class trên `<html>` trùng tên class của phần tử khác (đã từng lỗi với `.ss-open`).
  `window.__cosmos` để kiểm thử (có `open()`, `close()`).
- C2: thẻ → `<dialog>` hồ sơ (lật 3D bằng GSAP, đường kẻ SVG tự vẽ, số đếm lên, quả cầu Three.js nhỏ).
  Ảnh tàu vũ trụ tải từ Wikimedia Commons `Special:FilePath`, lỗi thì thay bằng ảnh đĩa dựng từ texture.
- C3: SVG `glyph` của ký hiệu (hộp 100×100) → sao rải theo `getPointAtLength` → nối nét → vẽ ký hiệu → quỹ đạo →
  hành tinh. Ba tab (role=tablist) mỗi tab một hiệu ứng; lật trang bằng lá `.gd-leaf`.
- Texture: `assets/textures/<id>.webp` (2k) và `<id>-1k.webp`; đĩa: `assets/disks/<id>.webp`.
- Dữ kiện có hạn dùng cần cập nhật: BepiColombo (vào quỹ đạo dự kiến 21/11/2026), Juno (tương lai chưa rõ),
  Voyager 1 cách 1 ngày ánh sáng (dự báo giữa 11/2026, trang chủ nấc 05), số vệ tinh (03/2026).

## Web Thấu hiểu (`/thau-hieu/`) — đã xong 9/9 chương, 42 thẻ
- `content/chapters.js`: danh mục 9 chương (id, màu chòm sao, câu hỏi lớn, `status: 'ready' | 'draft'`) và các khái niệm
  (id dùng trong URL `#k/<id>`, title, en, aka cho tìm kiếm, `links` = đường nối trên bản đồ). Chương `draft` → sao mờ, nhãn
  "Đang biên soạn". `content/chNN.js` (nạp lười khi mở): `UPDATED`, `CHAPTER` (intro, `diagram` sơ đồ liên hệ, sources) và
  `CONCEPTS[id]` theo cấu trúc thẻ bắt buộc.
- `js/main.js` điều phối (bản đồ/danh sách, tìm kiếm có dấu/không dấu `text.js#fold`, định tuyến `#k/…`, `#c/…`, "đã đọc" trong
  `sessionStorage`, chú thích thuật ngữ); `js/map3d.js` bản đồ tri thức Three.js; `js/card.js` dựng thẻ & trang tổng quan trong
  `<dialog>`; `js/text.js` cú pháp chữ (`[[id|chữ]]`, `$…$` KaTeX, `**đậm**`, `_nghiêng_`); `js/viz/*.js` mỗi minh hoạ một module,
  `export function mount(host, opts) → { destroy }`, dùng bộ khung `js/viz/_kit.js` (frame, slider, buttons, readout, loop, drag…).
- Mọi phép tính vật lý của minh hoạ nằm trong `shared/js/astro/physics.js` / `cosmology.js` và có test trong `tests/physics.test.mjs`.
  Hình chỉ mang tính minh hoạ (vị trí chấm, bản đồ gợn…) phải ghi rõ trong chú thích.
- `window.__thauHieu.go('#k/<id>')` để kiểm thử. Chụp thẻ: `IDS=a,b VIZWAIT=2000 ACTIONS=../tools/shoot-cards.mjs VENDOR=… node tools/serve-test.mjs /cosmos/thau-hieu/`.

### Thêm một khái niệm mới
1. Nghiên cứu → ghi vào `research/<chu-de>.md` (nguồn, URL, ✅/⚠️, chỗ nguồn lệch nhau, ngày tra cứu).
2. Thêm mục vào `concepts` của chương trong `content/chapters.js` (id không dấu, gạch nối; `links` tới id khác).
3. Thêm `CONCEPTS['<id>']` trong `content/chNN.js`: `short`, `certainty {level, label}`, `definition {vi, en?, source, url, paraphrase?}`
   (không có câu nguyên văn kiểm được thì `paraphrase: true`, **không** bịa trích dẫn), `body[]`, `formulas[]`, `symbols[]`,
   `viz {module, height, mobileHeight, caption}`, `after[]`, `numbers[]` (1–3, có nguồn), `myths[]` (1–2), `khamPha[]` (`#ho-so-<hành tinh>`
   hoặc `#he-mat-troi`), `khaoLuan[]` (nhãn; tự thành liên kết khi Khảo luận mở), `sources[]`.
4. Minh hoạ mới: `js/viz/<ten>.js`; hàm tính → `physics.js` + test. Bàn phím/kéo thả qua `_kit.js#drag`; tôn trọng `opts.reduced`.
5. Nếu khái niệm gắn với hành tinh: thêm vào `shared/content/lien-ket.js` để hồ sơ bên Khám phá hiện liên kết ngược.
6. Thẩm định bằng subagent biên tập viên → `node --test tests/*.test.mjs` → chụp thử 1440 và 390 → commit, push.
- Dữ kiện có hạn dùng trong Thấu hiểu (11/2026): số ngoại hành tinh (6 451, 15/10/2026), số ứng viên sóng hấp dẫn (390, GWTC-5.0),
  bảng H₀, Roman (phóng 30/8/2026, chưa xác nhận tới L2 tính tới 21/11), Gaia DR4 (2/12/2026), PLATO (4/2027), Euclid DR1 đầy đủ (giữa 2027; DR1-Foundation đã ra 11/2026), Europa Clipper (4/2030),
  hố đen gần nhất (Gaia BH1), K2-18 b/DMS, LZ.

## Web Khảo luận (`/khao-luan/`) — 8 hồ sơ câu hỏi mở
- `content/questions.js`: `LEVELS` (5 mức: refuted · speculative · debated · strong · established, màu và định nghĩa) và
  `QUESTIONS` (id → URL `#q/<id>` và file `content/q-<id>.js`; `labels` = nhãn mà thẻ Thấu hiểu dùng trong `khaoLuan`;
  `thauHieu` = thẻ nền tảng). `content/q-<id>.js`: `UPDATED`, `DOSSIER` = { kicker, certainty, intro[], known[],
  hypotheses[{name, en, level, idea, for[], against[]}], viz{module (đường dẫn tương đối từ khao-luan/js/), caption}, after[],
  next[{when, name, what}], myths[], sources[] }. Chữ dùng cú pháp của Thấu hiểu; `[[id]]` trỏ sang thẻ bên /thau-hieu/.
- `js/main.js` (điều phối, định tuyến), `js/dossier.js`
  (dialog, dùng CSS `.kc-*` của Thấu hiểu — trang nạp `../thau-hieu/css/thau-hieu.css`), `js/viz/*.js` (h0-plot, future-fate,
  curvature, hawking); một số hồ sơ dùng lại minh hoạ của Thấu hiểu. `window.__khaoLuan.go('#q/<id>')` để kiểm thử.
- Thẻ Thấu hiểu: nhãn trong `khaoLuan[]` tự thành liên kết sang hồ sơ khi hồ sơ `ready` và Khảo luận `open` (thau-hieu/js/card.js).
- Thêm hồ sơ: nghiên cứu → `research/kl-<chu-de>.md`; thêm vào `QUESTIONS`; viết `content/q-<id>.js`;
  thẩm định bằng subagent; test; chụp 1440/390. Lưu ý kiểm thử: chụp màn hình khi hồ sơ mở có thể mất 10–30 giây trong
  Chromium phần mềm (swiftshader) — đặt timeout chụp dài.
- Dữ kiện có hạn dùng (11/2026): LZ (sự kiện 2,6σ 9/2026), DESI DR3 (chưa ra), Euclid DR1 đầy đủ (6/2027), LiteBIRD (dự kiến 2036),
  CMB-S4 (đã dừng 7/2025), Rubin LSST (bắt đầu 29/6/2026), ELT (ánh sáng đầu 3/2029), Mars Sample Return (mất ngân sách 1/2026).

## Thẩm định nội dung
Mỗi phần lớn đã được một subagent "biên tập viên khoa học" đối chiếu với `research/` và sửa trước khi push.
Làm tương tự cho Thấu hiểu và Khảo luận. Màu accent dùng sẵn: `html[data-section="thau-hieu"]` → xanh băng,
`khao-luan` → tím tinh vân. Mở cửa: `shared/js/config.js`.
