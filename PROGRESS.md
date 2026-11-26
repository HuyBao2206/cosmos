# Tiến độ

Cập nhật: 21/11/2026

## Đã xong (phiên 1)
- [x] Phần A — nền móng `/shared/`: tokens, font, menu (chỉ báo trượt, menu toàn màn hình trên điện thoại), footer,
  nền sao theo nhiệt độ + parallax, chuyển trang "bước nhảy siêu tốc", 404 "Lạc vào khoảng không".
- [x] Phần B — trang chủ: "Tỉ lệ của bạn" (13 nấc, 10⁷ → 10²⁷ m, hành tinh và pha Mặt Trăng đúng hôm nay),
  lời mở đầu (nguyên văn, `shared/content/loi-mo-dau.js`), ba cửa vào.
- [x] Phần C — `/kham-pha/`: C1 Hệ Mặt Trời sống, C2 Hồ sơ các hành tinh + so sánh, C3 Các vị thần trên bầu trời.
- [x] Trang Nguồn hình ảnh, Nguồn tham khảo; test `node --test tests/*.test.mjs` (59 test, đối chiếu DE421).
- [x] Thẩm định khoa học (subagent) cho trang chủ, C2, C3; đã sửa theo góp ý.

## Đã xong (phiên 2) — `/thau-hieu/` Thấu hiểu vũ trụ
- [x] Khung: bản đồ tri thức 3D (chòm sao = chương, sao = khái niệm, sáng lên khi đã đọc), chế độ danh sách, tìm kiếm có dấu/không dấu,
  thẻ khái niệm mở như trang sách, trang tổng quan chương có sơ đồ liên hệ, chú thích thuật ngữ.
- [x] 9/9 chương, 42 thẻ, mỗi thẻ có minh hoạ tương tác riêng (`thau-hieu/js/viz/`, 40 module):
  1 Thước đo · 2 Ánh sáng · 3 Hấp dẫn · 4 Không-thời gian · 5 Đời sống sao · 6 Hố đen · 7 Thiên hà · 8 Lịch sử vũ trụ · 9 Hành tinh & sự sống.
- [x] Hàm vật lý + vũ trụ học dùng chung có test (`shared/js/astro/physics.js`, `cosmology.js`; 103 test).
- [x] Mỗi chương đã qua subagent biên tập viên khoa học đối chiếu `research/` (ghi chép: anh-sang, hap-dan-chuyen-dong,
  khong-thoi-gian, ho-den, thien-ha-cau-truc-lon, lich-su-vu-tru, hanh-tinh-su-song).
- [x] Mở cửa mục Thấu hiểu (`shared/js/config.js`); liên kết hai chiều với hồ sơ hành tinh bên Khám phá (`shared/content/lien-ket.js`);
  nguồn tổng hợp ở `/nguon-tham-khao/`.

## Phiên 3 — Khảo luận vũ trụ (11/2026)
- [x] `/khao-luan/`: 8 hồ sơ câu hỏi mở (vật chất tối, năng lượng tối, căng thẳng Hubble, trước Vụ Nổ Lớn, số phận vũ trụ,
  vũ trụ vô hạn, bên trong hố đen, cô đơn trong vũ trụ), mỗi hồ sơ: điều đã biết, các giả thuyết kèm mức chắc chắn và lý lẽ
  hai phía, minh hoạ tương tác, "làm sao để biết" (sứ mệnh sắp tới), hiểu lầm, nguồn.
- [x] ~~Dòng chảy của chắc chắn~~ (canvas động trên đầu trang) — đã gỡ 11/2026 theo yêu cầu chủ dự án vì gây giật/lag trên thiết bị.
- [x] Minh hoạ mới: biểu đồ các phép đo H₀, số phận vũ trụ theo w, độ cong không gian, bức xạ Hawking (có test vật lý).
- [x] Nghiên cứu ở `research/kl-*.md`; thẩm định bằng subagent biên tập viên; mở cửa trong `shared/js/config.js`;
  nhãn câu hỏi mở bên Thấu hiểu thành liên kết sang hồ sơ.

## Còn mở / cần chủ dự án quyết
- **GitHub (21/11/2026):** tài khoản GitHub đang nối với Claude là `HUBEduNavigator`, không có quyền ghi vào `HuyBao2206/cosmos`,
  nên push bị 403. Các commit chương 6–9 và phần hoàn thiện đang nằm ở nhánh cục bộ `claude/hopeful-wright-5on9jn`, chưa lên `main`.
  Cách gỡ: nối lại GitHub bằng tài khoản HuyBao2206 (https://claude.ai/connect-github), hoặc mời `HUBEduNavigator` làm cộng tác viên của repo.
- Thấu hiểu: phiên làm việc không mở được trang gốc (mạng chặn nasa.gov, arxiv, astro4edu), mọi số liệu đối chiếu qua trích đoạn
  tìm kiếm. Một số định nghĩa ghi "diễn giải theo…" vì chưa chép được câu nguyên văn; danh sách điểm cần kiểm nằm cuối mỗi file `research/`.
- Bật GitHub Pages (Settings → Pages → `main` / root) nếu chưa bật.
- Câu "Somewhere, something incredible is waiting to be known" thường bị gán cho Carl Sagan; nguồn gốc là bài
  Newsweek 1977 của Sharon Begley. Trang giữ nguyên văn theo yêu cầu, ghi chú ở ngăn nguồn trang chủ.
- Tranh khắc Goltzius/Saenredam (1596): chưa tải được do mạng của môi trường build chặn Wikimedia/NGA.
  Danh sách nguồn CC0 (National Gallery of Art) ở `research/tranh-khac-goltzius.md`. C3 hiện dùng ký hiệu vẽ lại.
- Ảnh tàu vũ trụ chưa được kiểm tra tải thực tế (Commons bị chặn khi build) — có fallback.

## Tiếp theo
- [ ] Cập nhật dữ kiện có hạn dùng (xem CLAUDE.md, mục Web Khám phá và Web Thấu hiểu) — đặc biệt Gaia DR4 (2/12/2026), Euclid DR1, Roman tới L2.
