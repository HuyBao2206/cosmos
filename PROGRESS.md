# Tiến độ

Cập nhật: 31/10/2026

## Đã xong (phiên 1)
- [x] Phần A — nền móng `/shared/`: tokens, font, menu (chỉ báo trượt, menu toàn màn hình trên điện thoại), footer,
  nền sao theo nhiệt độ + parallax, chuyển trang "bước nhảy siêu tốc", 404 "Lạc vào khoảng không".
- [x] Phần B — trang chủ: "Tỉ lệ của bạn" (13 nấc, 10⁷ → 10²⁷ m, hành tinh và pha Mặt Trăng đúng hôm nay),
  lời mở đầu (nguyên văn, `shared/content/loi-mo-dau.js`), ba cửa vào.
- [x] Phần C — `/kham-pha/`: C1 Hệ Mặt Trời sống, C2 Hồ sơ các hành tinh + so sánh, C3 Các vị thần trên bầu trời.
- [x] Trang Nguồn hình ảnh, Nguồn tham khảo; test `node --test tests/*.test.mjs` (59 test, đối chiếu DE421).
- [x] Thẩm định khoa học (subagent) cho trang chủ, C2, C3; đã sửa theo góp ý.

## Còn mở / cần chủ dự án quyết
- Bật GitHub Pages (Settings → Pages → `main` / root) nếu chưa bật.
- Câu "Somewhere, something incredible is waiting to be known" thường bị gán cho Carl Sagan; nguồn gốc là bài
  Newsweek 1977 của Sharon Begley. Trang giữ nguyên văn theo yêu cầu, ghi chú ở ngăn nguồn trang chủ.
- Tranh khắc Goltzius/Saenredam (1596): chưa tải được do mạng của môi trường build chặn Wikimedia/NGA.
  Danh sách nguồn CC0 (National Gallery of Art) ở `research/tranh-khac-goltzius.md`. C3 hiện dùng ký hiệu vẽ lại.
- Ảnh tàu vũ trụ chưa được kiểm tra tải thực tế (Commons bị chặn khi build) — có fallback.

## Tiếp theo
- [ ] Phiên 2: `/thau-hieu/` — Thấu hiểu vũ trụ (thư viện khái niệm).
- [ ] Phiên 3: `/khao-luan/` — Khảo luận vũ trụ.
- [ ] Cập nhật dữ kiện có hạn dùng (xem CLAUDE.md, mục Web Khám phá) sau 11/2026.
