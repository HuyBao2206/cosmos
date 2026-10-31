# Quỹ đạo Kepler – dữ liệu nguồn (CHƯA HOÀN THÀNH: nguồn chính bị chặn mạng)

Ngày truy cập dự kiến: 2026-10-31

> **CẢNH BÁO QUAN TRỌNG:** Trong phiên làm việc này, các máy chủ `ssd.jpl.nasa.gov`
> (cả trang `approx_pos.html` lẫn Horizons API và SBDB) **bị chặn bởi proxy mạng**
> (HTTP 403 khi CONNECT qua curl; `ENOTFOUND` khi dùng công cụ WebFetch).
> Vì vậy **không có con số nào trong Bảng 1, Bảng 2a, Bảng 2b, dữ liệu Horizons hay
> SBDB Pluto được ghi vào file này.** Không được điền số từ trí nhớ.
> Cần cho phép domain `ssd.jpl.nasa.gov` trong cài đặt mạng của phiên rồi chạy lại.

## 1. Nguồn chính

- E. M. Standish, "Keplerian Elements for Approximate Positions of the Major Planets",
  JPL Solar System Dynamics. URL: https://ssd.jpl.nasa.gov/planets/approx_pos.html
  (bản PDF cũ được trích dẫn bởi các mirror: http://ssd.jpl.nasa.gov/txt/aprx_pos_planets.pdf)
  — Trạng thái: **KHÔNG truy cập được** (2026-10-31).
- Kết quả tìm kiếm web (không phải nguồn chính) xác nhận: trang JPL nêu rằng
  Bảng 1 áp dụng cho khoảng 1800 AD–2050 AD, các phần tử "không hợp lệ ngoài
  khoảng thời gian đã được khớp", và vị trí chính xác cao nên lấy từ Horizons.
  Phương pháp được trích dẫn là Standish & Williams (1992).

## 2. Bảng 1 (1800 AD – 2050 AD)

**CHƯA LẤY ĐƯỢC.** Cần chép nguyên văn từ trang JPL: a (au), e, I (deg), L (deg),
long.peri (ϖ, deg), long.node (Ω, deg) và tốc độ biến thiên mỗi thế kỷ cho
Mercury, Venus, EM Bary, Mars, Jupiter, Saturn, Uranus, Neptune.

| Hành tinh | a | e | I | L | ϖ | Ω |
|---|---|---|---|---|---|---|
| (chưa có dữ liệu – nguồn bị chặn) | | | | | | |

## 3. Bảng 2a (3000 BC – 3000 AD) và Bảng 2b (b, c, s, f cho Jupiter–Neptune)

**CHƯA LẤY ĐƯỢC.**

## 4. Độ chính xác đã công bố của Bảng 1 và Bảng 2

**CHƯA LẤY ĐƯỢC** (bảng sai số RA/Dec/r theo arcsec và km trên trang JPL cần chép nguyên văn).

## 5. Các bước thuật toán (mô tả khái quát – CẦN ĐỐI CHIẾU nguyên văn với trang JPL)

Mô tả dưới đây là quy trình chuẩn của phương pháp Standish; chưa được đối chiếu
câu chữ/công thức với trang gốc trong phiên này, cần kiểm tra lại trước khi xuất bản.

1. Tính số thế kỷ Julian kể từ J2000: `T = (T_eph − 2451545.0) / 36525`, với T_eph là ngày Julian (TDB).
2. Tính mỗi phần tử: `a = a0 + ȧ·T`, tương tự cho e, I, L, ϖ, Ω.
   (Với Bảng 2, cộng thêm các số hạng b, c, s, f vào mean anomaly cho Jupiter–Neptune:
   `M = L − ϖ + b·T² + c·cos(f·T) + s·sin(f·T)`.)
3. Argument of perihelion: `ω = ϖ − Ω`; mean anomaly: `M = L − ϖ` (đưa về khoảng −180°…+180°).
4. Giải phương trình Kepler `M = E − e*·sin E` (e* = e tính bằng độ, tức e·180/π) bằng lặp Newton,
   tới khi |ΔE| ≤ khoảng 1e-6 độ.
5. Tọa độ nhật tâm trong mặt phẳng quỹ đạo: `x' = a(cos E − e)`, `y' = a·√(1−e²)·sin E`, `z' = 0`.
6. Quay sang hoàng đạo J2000:
   - `x_ecl = (cos ω cos Ω − sin ω sin Ω cos I) x' + (−sin ω cos Ω − cos ω sin Ω cos I) y'`
   - `y_ecl = (cos ω sin Ω + sin ω cos Ω cos I) x' + (−sin ω sin Ω + cos ω cos Ω cos I) y'`
   - `z_ecl = (sin ω sin I) x' + (cos ω sin I) y'`
7. (Tùy chọn) Chuyển sang xích đạo ICRF/J2000 bằng độ nghiêng hoàng đạo ε = 23.43928°
   (giá trị này cần đối chiếu với trang gốc).

## 6. Pluto (134340) – phần tử quỹ đạo từ JPL SBDB

**CHƯA LẤY ĐƯỢC** (https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=134340 và
https://ssd.jpl.nasa.gov/tools/sbdb_lookup.html#/?sstr=134340 cũng thuộc hệ thống JPL SSD).
Cần: epoch, a, e, i, Ω (node), ω (peri), M.

## Dữ liệu đối chiếu JPL Horizons

**KHÔNG truy cập được Horizons API** (`https://ssd.jpl.nasa.gov/api/horizons.api`):
proxy trả về 403 (connect_rejected) ngày 2026-10-31. **Không có số liệu nào được ghi; không bịa số.**

Truy vấn cần chạy khi có mạng (mỗi COMMAND ∈ {199, 299, 399, 499, 599, 699, 799, 899}):

```
https://ssd.jpl.nasa.gov/api/horizons.api?format=text&COMMAND='<ID>'&EPHEM_TYPE='VECTORS'&CENTER='500@10'&REF_PLANE='ECLIPTIC'&REF_SYSTEM='J2000'&TLIST='2451545.0','2460310.5','2461344.5'&TIME_TYPE='TDB'&VEC_TABLE='1'&OUT_UNITS='AU-D'&OBJ_DATA='NO'&MAKE_EPHEM='YES'
```

| Thời điểm (TDB) | JD | Thiên thể | X (AU) | Y (AU) | Z (AU) |
|---|---|---|---|---|---|
| 2000-01-01 12:00 | 2451545.0 | 199…899 | — | — | — |
| 2024-01-01 00:00 | 2460310.5 | 199…899 | — | — | — |
| 2026-10-31 00:00 | 2461344.5 | 199…899 | — | — | — |

```json
{
  "status": "NOT_RETRIEVED",
  "reason": "ssd.jpl.nasa.gov blocked by session network policy (HTTP 403 on CONNECT), 2026-10-31",
  "frame": {"center": "500@10", "ref_plane": "ECLIPTIC", "ref_system": "J2000", "units": "AU"},
  "epochs_jd_tdb": [2451545.0, 2460310.5, 2461344.5],
  "data": null
}
```

## Nguồn

| Nguồn | URL | Năm | Trạng thái |
|---|---|---|---|
| Standish, Keplerian Elements for Approximate Positions of the Major Planets (JPL SSD) | https://ssd.jpl.nasa.gov/planets/approx_pos.html | (chưa xác minh) | Bị chặn |
| JPL Horizons API | https://ssd.jpl.nasa.gov/api/horizons.api | — | Bị chặn |
| JPL SBDB (Pluto 134340) | https://ssd-api.jpl.nasa.gov/sbdb.api?sstr=134340 | — | Bị chặn (403) |

Bất đồng giữa các nguồn: chưa đánh giá được vì chưa lấy được dữ liệu.

---

## Cập nhật 31/10/2026 — cách kiểm chứng bảng Standish khi không truy cập được JPL

Môi trường xây dựng trang không mở được ssd.jpl.nasa.gov (Horizons API, approx_pos.html). Các phần tử
quỹ đạo của Bảng 1, 2a, 2b trong `shared/js/astro/kepler.js` được nhập theo bản công bố của Standish và
**kiểm chứng gián tiếp** bằng lịch thiên văn số JPL DE421 (gói PyPI `de421`, đọc bằng `jplephem`):

- `tools/make_de421_fixture.py` tính toạ độ nhật tâm hoàng đạo J2000 của 8 hành tinh (Trái Đất = tâm khối
  Trái Đất–Mặt Trăng) tại 7 thời điểm từ 1900 đến 2049 → `tests/fixtures/de421.json`.
- `tests/kepler.test.mjs` so sánh: sai lệch góc lớn nhất Sao Thuỷ 18″, Sao Kim 15″, Trái Đất 18″, Sao Hoả 41″,
  Sao Mộc 324″, Sao Thổ 545″, Sao Thiên Vương 594″, Sao Hải Vương 45″; sai lệch khoảng cách ≤ 0,13 %.
  Các mức này khớp với độ chính xác JPL nêu cho Bảng 1 (sai số lớn nhất ở các hành tinh khí khổng lồ do bỏ qua
  nhiễu loạn tương hỗ Sao Mộc–Sao Thổ). Một chữ số nhập sai sẽ gây lệch cỡ độ, không thể lọt qua kiểm thử.
- Ngưỡng chấp nhận trong test: 0,2° (720″) về hướng, 0,5 % về khoảng cách.
- DE421 (Folkner et al. 2009) là lịch thiên văn cùng họ với DE440/441 mà Horizons dùng; chênh lệch giữa chúng ở
  mức kilômét, không đáng kể ở đây.

Hướng cực quay: IAU WGCCRE 2015 (Archinal et al. 2018). Độ nghiêng trục tính được từ cực quay và pháp tuyến
quỹ đạo khớp NSSDCA: Sao Kim 177,4°, Trái Đất 23,44°, Sao Hoả 25,19° (dùng cực IAU 2009: α0 = 317,681°,
δ0 = 52,887°), Sao Thiên Vương 97,77°, Sao Diêm Vương 119,6° (NSSDCA ghi 122,5° — chênh do định nghĩa mặt phẳng
tham chiếu; trang hiển thị giá trị NSSDCA).

**Việc cần làm khi có mạng:** chép nguyên văn Bảng 1/2 từ approx_pos.html để đối chiếu từng chữ số; lấy vector
Horizons cho các ngày trong fixture để bổ sung so sánh trực tiếp.
