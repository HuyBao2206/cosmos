# Chương 1 – "Thước đo vũ trụ": ghi chép dữ kiện có nguồn

> Tài liệu nghiên cứu nội bộ cho web "Thấu hiểu vũ trụ". Không phải bài viết.
> **Ngày tra cứu: 01/11/2026.**
>
> **Phương pháp:** WebFetch bị chặn (thử `www.iau.org` → lỗi phân giải tên miền, ngoài danh sách mạng được phép). Mọi dữ kiện được đối chiếu **qua trích đoạn kết quả tìm kiếm (WebSearch)**, không mở trực tiếp trang gốc. Nhãn:
> - ✅ = con số/câu chữ xuất hiện trong trích đoạn của nguồn chính thống (IAU, NASA, ESA, Nobel, bài báo bình duyệt/arXiv).
> - ⚠️ = chỉ thấy ở nguồn thứ cấp, hoặc tự tính, hoặc chưa thấy nguyên văn.
>
> Các số đã có trong `thang-bac-vu-tru.md` (cùng thư mục) **chỉ dẫn chiếu, không lặp lại công sức**: 1 au, thời gian ánh sáng Mặt Trời, Proxima Centauri, Andromeda, bảng hằng số Hubble, tuổi vũ trụ Planck.
>
> **Nguồn định nghĩa "chuẩn sư phạm" rất hữu ích:** Bảng thuật ngữ của **IAU Office of Astronomy for Education (IAU OAE)** tại astro4edu.org – giấy phép CC BY 4.0, ghi công "IAU OAE". Có cả bản nhiều ngôn ngữ (đã thấy bản tiếng Trung; **chưa kiểm tra có bản tiếng Việt hay không** – nên xem trực tiếp).

---

## 1. Đơn vị thiên văn (au)

### (a) Định nghĩa gốc
- **IAU 2012 Resolution B2** (Đại hội đồng XXVIII, Bắc Kinh): IAU "recommends that the astronomical unit be re-defined to be a conventional unit of length equal to 149 597 870 700 m exactly, in agreement with the value adopted in IAU 2009 Resolution B2" và rằng "this definition of the astronomical unit be used with all time scales such as TCB, TDB, TCG, TT, etc." ✅ (trích đoạn qua SYRTE/Đài thiên văn Paris và bản lưu PDF của IAU).
  - PDF IAU: https://www.iau.org/static/resolutions/IAU2012_English.pdf (bản lưu: https://iauarchive.eso.org/static/resolutions/IAU2012_English.pdf)
  - Giải thích của SYRTE (N. Capitaine, người khởi xướng): https://syrte.obspm.fr/IAU_resolutions/Sumredef_au.html
  - Nghị quyết cũng khuyến nghị ký hiệu duy nhất **"au"** (chữ thường) ⚠️ (biết từ nội dung nghị quyết, chưa thấy dòng này trong trích đoạn).
- **Ngày thông qua: các nguồn lệch nhau** – Đài thiên văn Paris ghi **30/8/2012**; một số nguồn (Wikipedia) ghi **31/8/2012**. ⚠️ Nên viết "tháng 8/2012".
- BIPM ghi nhận định nghĩa này trong SI Brochure bản sửa 2014 ✅ (trích đoạn).
- Định nghĩa phổ thông (IAU OAE, trang Big Idea 4): au gắn với khoảng cách Mặt Trời – Trái Đất **~150 triệu km** ✅ https://astro4edu.org/bigideas/bigidea4/ ; mục từ: https://astro4edu.org/resources/glossary/term/26/

### (b) Số liệu then chốt và lịch sử đo
| Mốc | Giá trị au | Nguồn | Nhãn |
|---|---|---|---|
| Thị sai Sao Kim (1761, 1769), J. F. Encke tổng hợp (1824/1835) | **~153 triệu km (±1 triệu km)**; Encke: 153 340 000 km | Sky & Telescope; CS Monitor (2012) | ⚠️ (báo khoa học + trang luyện thi; chưa thấy bài báo gốc) |
| Radar Sao Kim, JPL Goldstone (10/3–10/5/1961) | **149 598 500 ± 500 km** | Báo cáo JPL (Malling & Golomb 1961); NASA NTRS https://ntrs.nasa.gov/api/citations/19650018864/downloads/19650018864.pdf | ✅ |
| Kỷ yếu IAU (thảo luận radar) | 149 597 900 ± 250 km | Cambridge/IAU Joint Discussion | ✅ (giá trị khác do cách xử lý số liệu) |
| IAU 2009 B2 → IAU 2012 B2 | **149 597 870 700 m (chính xác, theo định nghĩa)** | IAU | ✅ |

- Tự tính: sai số Encke ≈ (153,34 − 149,598)/149,598 ≈ **+2,5 %**; radar 1961 lệch ~630 km so với giá trị hiện nay (~4 phần triệu). ⚠️ tự tính.
- Ghi chú: Chuyến thám hiểm 1761 bị cản trở bởi chiến tranh (Chiến tranh Bảy Năm) và **"hiệu ứng giọt đen" (black drop)** làm sai thời điểm tiếp xúc ✅ (Sky & Telescope).
- Thời gian ánh sáng Mặt Trời → Trái Đất: xem `thang-bac-vu-tru.md` §2 (499,0 s ≈ **8 phút 19 giây**, tự tính). **Lưu ý: đề bài ghi "8 phút 20 giây" – đó là làm tròn; chính xác là 8 ph 19,0 s cho 1 au.**

### (c) Hiểu lầm phổ biến
1. *"au là khoảng cách trung bình Trái Đất – Mặt Trời."* → Từ 2012, au **là một độ dài quy ước cố định**, không còn được định nghĩa qua quỹ đạo Trái Đất hay hằng số hấp dẫn Gauss. Khoảng cách thực Trái Đất – Mặt Trời dao động ~147,1–152,1 triệu km trong năm.
2. *"Ký hiệu là AU."* → IAU khuyến nghị **au** (chữ thường); AU/UA vẫn thấy rất nhiều trong sách báo. ⚠️

### (d) Thuật ngữ tiếng Việt
- **"đơn vị thiên văn"** – phổ biến; SGK Vật lí 12 (chương trình cũ) viết tắt "đvtv" ⚠️ (theo trí nhớ/nguồn phổ thông, **chưa đối chiếu được bản SGK**). Báo phổ thông dùng "AU".

---

## 2. Năm ánh sáng (ly)

### (a) Định nghĩa gốc
- **IAU OAE glossary** (mục "Light Year"): "the distance that light travels in vacuum in one year: 9.46 trillion kilometers" và "Light year is a rarely used term in astronomical research where the parsec (approximately 3.26 light years) is the preferred measure of distance." ✅ https://astro4edu.org/resources/glossary/term/178/
- **Năm Julius 365,25 ngày:** IAU Style Manual (G. A. Wilkins, Commission 5), §5.15: "it is best to regard a year as a julian year of 365.25 days (31.5576 Ms) unless otherwise specified." ⚠️ (trích qua trang thảo luận Wikipedia; năm xuất bản Style Manual các nguồn ghi **1987 hoặc 1989** – lệch nhau, cần kiểm bản gốc). Năm ánh sáng **không phải đơn vị SI**, và IAU không có "nghị quyết" riêng định nghĩa năm ánh sáng – định nghĩa đến từ khuyến nghị về đơn vị/Style Manual. ⚠️

### (b) Số liệu
- **1 ly = 299 792 458 m/s × 31 557 600 s = 9 460 730 472 580 800 m ≈ 9,4607 × 10¹⁵ m** (chính xác theo định nghĩa) – **tự tính**, khớp OEIS A213614 ✅ (https://oeis.org/A213614).
- **1 ly ≈ 63 241,08 au** – tự tính: 9,4607304725808 × 10¹⁵ / 149 597 870 700. ⚠️ tự tính.
- **Nguồn lệch:** một số nguồn/máy tính dùng năm Gregory 365,2425 ngày → **9,460536 × 10¹⁵ m** (khác ở chữ số thứ 5). Dùng 9,4607 × 10¹⁵ m theo năm Julius.

### (c) Hiểu lầm phổ biến
1. *"Năm ánh sáng là đơn vị thời gian."* → Là **đơn vị khoảng cách** (quãng đường ánh sáng đi trong 1 năm).
2. *"Giới thiên văn chuyên nghiệp đo bằng năm ánh sáng."* → Trong nghiên cứu người ta dùng **parsec** (kpc, Mpc); năm ánh sáng chủ yếu dùng trong phổ biến khoa học (IAU OAE nói rõ điều này ✅).

### (d) Thuật ngữ tiếng Việt
- **"năm ánh sáng"** – thống nhất, dùng trong SGK và báo chí. ✅ (thông dụng)

---

## 3. Thị sai và parsec

### (a) Định nghĩa gốc
- **IAU OAE glossary (Parsec):** parsec là đơn vị khoảng cách chuẩn; một vòng tròn bán kính 1 au, nhìn trực diện từ khoảng cách 1 parsec, sẽ có bán kính **chắn góc 1 giây cung**; 1 pc ≈ 3,26 năm ánh sáng; ý nghĩa thực tiễn đến từ phương pháp thị sai. ✅ (trích đoạn diễn giải; **chưa có nguyên văn tiếng Anh từng chữ** – nên mở https://astro4edu.org/resources/glossary/term/238/ để chép nguyên văn).
- **IAU 2015 Resolution B2** (Honolulu, 13/8/2015) – nghị quyết về **điểm không của thang cấp sao nhiệt xạ (bolometric magnitude)**, *không* phải nghị quyết riêng về parsec. Trong định nghĩa cấp sao biểu kiến, nó **ngầm định parsec chính xác = 648 000/π au** (định nghĩa góc nhỏ). ✅ (Mamajek et al., arXiv:1510.06262: https://arxiv.org/abs/1510.06262)
  - **Chú ý khi viết:** đừng viết "IAU 2015 định nghĩa parsec" như thể là nghị quyết chuyên về parsec; nên viết "Nghị quyết B2 năm 2015 của IAU (về thang cấp sao) đã cố định parsec bằng đúng 648 000/π au".
- Tên "parsec" = **par**allax + **sec**ond, do **Herbert Hall Turner** đặt năm **1913** ⚠️ (nguồn thứ cấp: Sky at Night, mytour).

### (b) Số liệu
- **1 pc = 648 000/π au = 206 264,806 au = 3,085 677 581 × 10¹⁶ m ≈ 3,2616 ly.** Tự tính:
  - 648 000/π = 206 264,806 247…
  - × 149 597 870 700 m = 30 856 775 814 913 673 m (khớp con số làm tròn đến mét trong Mamajek et al. 2015 ✅)
  - ÷ 9 460 730 472 580 800 m = 3,261 564 ly
- Công thức: **d (pc) = 1 / p (giây cung)**.
- **Lần đo thị sai đầu tiên – Bessel, 61 Cygni (công bố 1838):** **p = 0,3136″ ± 0,0202″** (heliometer, Königsberg, ~16–18 tháng quan sát). Giá trị **Gaia hiện đại: 0,28615″ ± 0,00006″**. ✅ (Bessel gốc và Gaia qua bài phân tích lại arXiv:2009.11913 "The First Stellar Parallaxes Revisited": https://arxiv.org/abs/2009.11913)
  - Tự tính: Bessel → 3,19 pc ≈ **10,4 ly**; Gaia → 3,49 pc ≈ **11,4 ly**. Bessel lệch ~10 % – rất tốt cho thời đó. Lý do: ông đo **thị sai tương đối** so với sao nền (sao nền cũng có thị sai nhỏ). ✅ (arXiv:2009.11913)
  - **Tranh chấp "người đầu tiên":** Thomas Henderson có số liệu Alpha Centauri 1832–33 nhưng công bố 1839; F. G. W. Struve công bố thị sai Vega 1837 (giá trị kém chính xác). ✅ (Britannica, trích đoạn). Cách viết an toàn: "Bessel là người đầu tiên **công bố** thị sai sao đáng tin cậy (1838)".
- **Hipparcos (ESA, phóng 1989, hoạt động 1989–1993):** Danh mục Hipparcos **118 218 sao**, chốt 8/8/1996, ESA xuất bản **6/1997**; độ chính xác **~1 milli-giây cung (mas)** (ESA); chính xác hơn: sai số trung vị thị sai **0,97 mas** cho sao sáng hơn cấp 9 (Turon et al.). ✅ https://sci.esa.int/web/hipparcos/-/31905-about-the-mission
- **Gaia (ESA):**
  - Gaia DR3 (13/6/2022) dùng lại trắc lượng (astrometry) của **EDR3 (12/2020)**: **~1,468 tỷ nguồn có thị sai + chuyển động riêng** (lời giải 5/6 tham số); tổng số nguồn DR3 ~**1,8 tỷ**. ✅ https://www.cosmos.esa.int/web/gaia/earlydr3
    - Lưu ý: con số 1,47 tỷ thường bị gán cho "DR3" – đúng về nội dung (vì DR3 kế thừa EDR3) nhưng **gốc là EDR3**.
  - **Sai số thị sai điển hình (EDR3/DR3):** **0,02–0,03 mas (= 20–30 micro-giây cung) với G < 15**; ~0,07 mas ở G = 17; ~0,5 mas ở G = 20; ~1,3 mas ở G = 21. ✅ (ESA EDR3 content page; A&A Lindegren et al. 2021, bảng 3)
  - **Kết thúc quan sát khoa học: 15/1/2025** (hết khí đẩy nitơ lạnh điều khiển tư thế); thử nghiệm kỹ thuật đến 3/2025; **thụ động hóa (tắt) 27/3/2025**, đưa vào quỹ đạo "hưu trí" quanh Mặt Trời. 3 827 ngày hoạt động khoa học. ✅ https://www.cosmos.esa.int/web/gaia/end-of-observations ; https://www.cosmos.esa.int/web/gaia/home/-/asset_publisher/wEXKCCPdRxv0/content/2025-03-27-gaia-passivation
  - **Sắp tới: Gaia DR4 dự kiến 2/12/2026** (66 tháng dữ liệu; ESA thông báo 7/5/2026); DR5 "không sớm hơn cuối 2030". ✅ (trang tin ESA Gaia 2026: https://www.cosmos.esa.int/web/gaia/news-2026) → **Cần cập nhật số liệu sau 2/12/2026.**
- **Proxima Centauri:** thị sai **768,0665 ± 0,0499 mas** (Gaia EDR3/DR3) → 1,30197 pc = **4,2465 ly** – đã có trong `thang-bac-vu-tru.md` §4; xác nhận lại qua Reylé et al. 2021 (arXiv:2104.14972) ✅. Nguồn cũ ghi 4,244 ly là từ Gaia DR2 (768,50 ± 0,20 mas) – **giải thích vì sao sách báo lệch nhau**.
- Minh họa độ nhỏ góc (tự tính ⚠️): ngay cả sao gần nhất có thị sai < 0,77″ – nhỏ hơn góc nhìn đồng xu 1 cm đặt cách ~2,7 km.

### (c) Hiểu lầm phổ biến
1. *"Parsec là đơn vị thời gian"* (câu "Kessel Run trong 12 parsec" của Han Solo, *Star Wars* 1977). → Parsec là **khoảng cách** (~3,26 ly). ✅ (Space.com, Sky at Night – báo phổ biến)
2. *"Thị sai là ngôi sao dịch chuyển thật."* → Là **dịch chuyển biểu kiến** do Trái Đất đổi vị trí trên quỹ đạo (cách nhau 2 au sau nửa năm); góc thị sai p định nghĩa theo đường đáy **1 au** (nửa đường đáy).
3. *"Thị sai chỉ dùng cho vài trăm năm ánh sáng."* → Đúng với kính mặt đất thế kỷ 20 (nguồn VN phổ thông nói "< 325 ly"); với Gaia, sai số 20 µas cho phép đo khoảng cách ~10 % tới ~5 kpc (~16 000 ly) với sao sáng (tự tính: 0,02 mas / 0,2 mas ⇒ d = 5 000 pc) ⚠️ tự tính – con số này thay đổi mạnh theo độ sáng sao.

### (d) Thuật ngữ tiếng Việt
- **"thị sai"** (parallax), **"thị sai năm"** (annual parallax), **"parsec"/"pc"** (có tài liệu cũ phiên âm "pacsec") ⚠️ – chưa đối chiếu được giáo trình (ví dụ *Thiên văn học đại cương*); chỉ thấy ở web phổ thông.

---

## 4. Sao biến quang Cepheid

### (a) Định nghĩa gốc
- **IAU OAE glossary (Cepheid Variable):** "Cepheids are pulsating variable stars whose variability is caused by periodic oscillation of the outer layers of the star." … "Thus Cepheids are primary distance indicators in establishing the cosmic distance scale." ✅ https://astro4edu.org/resources/glossary/term/54/
- **IAU OAE glossary (Standard Candle):** có mục riêng – https://astro4edu.org/resources/glossary/term/476/ ⚠️ (chưa thấy nguyên văn trong trích đoạn).
- Dạng hiện đại của **định luật Leavitt** (quan hệ chu kỳ – độ trưng): ⟨M⟩ = a + b·log₁₀P ✅ (arXiv:2403.02801).

### (b) Số liệu và lịch sử
- **Henrietta Swan Leavitt (Đài thiên văn Đại học Harvard):**
  - **1908:** "1777 Variables in the Magellanic Clouds", *Annals of Harvard College Observatory* 60, 87–108 – nhận xét sao biến quang sáng hơn có chu kỳ dài hơn. ✅
  - **1912:** "Periods of 25 Variable Stars in the Small Magellanic Cloud", *Harvard College Observatory Circular* **173** (3/1912), bibcode 1912HarCi.173....1L – ký tên **E. C. Pickering**, văn bản ghi "prepared by Miss Leavitt". ✅ https://ui.adsabs.harvard.edu/abs/1912HarCi.173....1L/abstract
  - **Lỗi hay gặp:** một số nguồn ghi nhầm Circular 173 là năm 1908. ✅
  - Ý then chốt: các sao trong Đám Mây Magellan Nhỏ ở **cùng khoảng cách**, nên độ sáng biểu kiến so sánh được trực tiếp với nhau.
- **Hubble và Andromeda:**
  - Đêm **5–6/10/1923**, kính Hooker 100 inch (Mount Wilson), Hubble chụp kính ảnh H335H; đầu tiên đánh dấu "N" (nova), sau gạch đi và viết **"VAR!"**. ✅ (Carnegie Science: https://carnegiescience.edu/about/history/archives/plate-archives/m31var). Nguồn lệch: có nguồn ghi 5/10, có nguồn ghi 6/10 (do đêm quan sát vắt qua nửa đêm).
  - Công bố tại **hội nghị AAS tháng 1/1925** (bài do H. N. Russell đọc thay – ⚠️ chưa xác nhận). ✅ (Carnegie)
  - Khoảng cách Hubble ước tính: **~900 000 ly** (thấp hơn giá trị hiện nay ~2,5 triệu ly do hiệu chuẩn Cepheid thời đó sai – chưa phân biệt hai loại Cepheid, Baade 1952) ✅ 900 000 ly (Phys.org/ESA Hubble 2011); ⚠️ phần giải thích Baade.
- **Polaris (Sao Bắc Cực) là Cepheid** (cổ điển, dao động ở mode bội thứ nhất – first overtone): chu kỳ **~3,97 ngày**, biên độ rất nhỏ (~0,03 cấp sao). Khoảng cách: Hipparcos ~132,6 pc (~433 ly); Gaia DR3 ~136,9 pc (~446 ly) – **còn tranh luận**. ✅ (Sky & Telescope; arXiv:2603.09876) ⚠️ (không thấy trang NASA)
- **Dải khoảng cách dùng được:** Thiên hà xa nhất có Cepheid đo tốt là **NGC 5468, ~130 triệu ly** (≈ 40 Mpc, tự quy đổi), trong mẫu SH0ES với cả Hubble và JWST (JWST đo >1 000 Cepheid trong 5 thiên hà chủ). ✅ NASA SVS/Webb 2024: https://svs.gsfc.nasa.gov/31293
  - **Lưu ý:** đề bài gợi "vài chục triệu năm ánh sáng" – thực tế giới hạn là **cỡ trăm triệu ly (~40 Mpc)**; một nguồn sơ bộ ghi 140 triệu ly.

### (c) Hiểu lầm phổ biến
1. *"Cepheid sáng hơn thì nhấp nháy nhanh hơn."* → Ngược lại: **chu kỳ dài hơn ⇒ độ trưng lớn hơn**.
2. *"Biết chu kỳ là biết ngay khoảng cách."* → Phải **hiệu chuẩn** quan hệ chu kỳ–độ trưng bằng khoảng cách thị sai (Gaia) hoặc khoảng cách hình học (ví dụ NGC 4258, LMC) – đó chính là "bậc thang". Ngoài ra phải hiệu chỉnh bụi che khuất và thành phần kim loại.
3. *"Sao Bắc Cực là sao sáng nhất bầu trời."* → Không (khoảng hạng ~48); nó chỉ đặc biệt vì gần cực Bắc thiên cầu – và tình cờ là một Cepheid. ⚠️ (kiến thức chung)

### (d) Thuật ngữ tiếng Việt
- **"sao biến quang Cepheid"** / "sao Cepheid" (Wikipedia tiếng Việt dùng "Sao biến quang Cepheid") ⚠️; **"quan hệ chu kì – độ trưng"** (độ trưng = luminosity), cũng gặp "quan hệ chu kỳ – độ sáng" ⚠️ chưa đối chiếu giáo trình.

---

## 5. Siêu tân tinh loại Ia – "ngọn nến chuẩn"

### (a) Định nghĩa gốc
- **NASA HEASARC:** "the most 'standard' of the standard candles are believed to be the so-called 'Type Ia' supernovae, which result from a thermonuclear flash destruction of a white dwarf star" ✅; giới hạn Chandrasekhar: "the limiting mass, about 1.4 solar masses, which can be supported by degenerate electron pressure" ✅ (https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/snIa_chandra.html và các trang HEAPOW liên quan).
- Phân loại "Ia" theo quang phổ: **không có vạch hydro, có vạch silic (Si II) mạnh** ⚠️ (kiến thức giáo trình, chưa thấy trích đoạn).

### (b) Số liệu
- **Giới hạn Chandrasekhar ≈ 1,4 M☉** (NASA) ✅; giá trị chính xác hơn thường trích **1,44 M☉** (Physics World) ✅. Cơ chế: sao lùn trắng trong hệ đôi hút vật chất (hoặc sáp nhập hai sao lùn trắng) → tiến gần giới hạn → bùng nổ nhiệt hạch carbon. ⚠️ Lưu ý: có bằng chứng một phần SN Ia đến từ sao lùn trắng **dưới** giới hạn Chandrasekhar (sub-Chandrasekhar) – cơ chế vẫn đang tranh luận.
- **Cấp sao tuyệt đối cực đại:** **các nguồn lệch nhau, phụ thuộc H₀ dùng để hiệu chuẩn**:
  - Tổng quan lịch sử (arXiv:1608.04192), NED: **M_B ≈ −19,5** ✅
  - Saha/Sandage et al. (thang Sandage, H₀ ≈ 59): M_B = −19,50 ± 0,06 ✅
  - Thang SH0ES (H₀ ≈ 73): M_B ≈ **−19,25 đến −19,3** ⚠️ (**chưa thấy trích đoạn nêu đúng −19,3**).
  - Đề xuất cách viết: "cấp sao tuyệt đối cực đại khoảng **−19 đến −19,5**, tức sáng cỡ **vài tỷ Mặt Trời**, ngang cả một thiên hà nhỏ" (NASA HEASARC: "as much light as a small galaxy" ✅ định tính).
- **Độ tán xạ:** chưa hiệu chỉnh σ ≈ 0,3–0,5 mag; sau hiệu chỉnh đường cong ánh sáng σ ≈ **0,18 mag** (~8–9 % khoảng cách) ✅ (tổng quan arXiv, trích đoạn).
- **Quan hệ Phillips:** M. M. Phillips 1993, "The Absolute Magnitudes of Type Ia Supernovae", *ApJ* **413**, L105, doi:10.1086/186970 ✅. Tham số **Δm₁₅(B)** = số cấp sao mờ đi trong 15 ngày sau cực đại ở dải B. **SN sáng hơn thì mờ đi chậm hơn.** Phillips thấy độ tán xạ cực đại thô ~±0,8 mag (B) trong 9 SN. Xác nhận bởi Hamuy et al. 1996 (29 SN, Calán/Tololo). ✅
  - Dạng một hệ số (trích lại trong tài liệu sau): M_max(B) ≈ −21,726 + 2,698 Δm₁₅(B) ✅ (qua arXiv:0711.4548) – ⚠️ chưa đối chiếu bản gốc 1993.
- **Dải khoảng cách:** từ vài chục Mpc đến **hàng tỷ năm ánh sáng** (z ~ 1–2, tức tới ~10 tỷ ly thời gian nhìn lại) ⚠️ – định tính; hai nhóm 1998 dùng SN ở z = 0,3–1,0 ✅.
- **Phát hiện vũ trụ giãn nở gia tốc (1998):**
  - Hai nhóm độc lập: **Supernova Cosmology Project** (Perlmutter, bắt đầu 1988) và **High-z Supernova Search Team** (Schmidt lập 1994; Riess). ✅
  - SN xa **mờ hơn dự kiến ~0,25 cấp sao** (xa hơn ~10–15 %) so với vũ trụ giảm tốc ✅. Riess et al. 1998 (*AJ* 116, 1009) chỉ dùng **10 SN z cao**; Perlmutter et al. 1999 (*ApJ* 517, 565). ✅/⚠️ (số tạp chí của Perlmutter: ⚠️ chưa thấy trích đoạn)
  - Hai nhóm có tổng **hơn 50 SN** mờ hơn mong đợi (theo Nobel). ✅
  - **Nobel Vật lý 2011:** "for the discovery of the accelerating expansion of the Universe through observations of distant supernovae" – **Saul Perlmutter (1/2), Brian P. Schmidt (1/4), Adam G. Riess (1/4)**. ✅ https://www.nobelprize.org/prizes/physics/2011/

### (c) Hiểu lầm phổ biến
1. *"Mọi SN Ia sáng y hệt nhau."* → Không; chúng là **"nến chuẩn hóa được"** (standardizable candles) – phải hiệu chỉnh bằng hình dạng đường cong ánh sáng (Phillips) và màu sắc. Loại dị thường (kiểu SN 1991bg, mờ hơn ~1 cấp sao) bị loại khỏi mẫu. ✅
2. *"Siêu tân tinh nào cũng là sao khổng lồ nổ tung."* → Loại II/Ib/Ic là sụp đổ lõi sao nặng; **loại Ia là sao lùn trắng nổ nhiệt hạch**, không để lại sao neutron.
3. *"SN Ia tự cho ra khoảng cách tuyệt đối."* → Độ sáng thật của chúng phải **hiệu chuẩn bằng Cepheid/TRGB** trong thiên hà chủ gần → chúng là bậc thang trên cùng, phụ thuộc các bậc dưới.

### (d) Thuật ngữ tiếng Việt
- **"siêu tân tinh loại Ia"**, **"ngọn nến chuẩn"/"nến chuẩn"** (standard candle), **"sao lùn trắng"**, **"giới hạn Chandrasekhar"** ⚠️ – thông dụng trên báo chí, chưa đối chiếu giáo trình.

---

## 6. Thang khoảng cách vũ trụ

### (a) Định nghĩa
- ESA/Hubble (heic1611a, 2016, nhóm Riess): mô tả 3 bậc – **thị sai** (nền móng) → **Cepheid** (hiệu chuẩn bằng thị sai) → **SN Ia** (hiệu chuẩn bằng các thiên hà có cả Cepheid và SN Ia), rồi so khoảng cách với **dịch chuyển đỏ** của ~300 SN Ia xa để ra **hằng số Hubble**. ✅ https://esahubble.org/images/heic1611a/ ; https://sci.esa.int/web/hubble/-/57875-cosmic-distance-ladder (hình minh họa có thể dùng, kiểm tra giấy phép CC BY 4.0 của ESA/Hubble).
- Nguyên văn trích đoạn: Cepheids "are pulsating stars which fade and brighten at rates that are proportional to their true brightness"; Type Ia supernovae "always have the same intrinsic brightness and are also bright enough to be seen at relatively large distances" ✅ (lưu ý: câu thứ hai là cách nói đơn giản hóa – xem hiểu lầm ở §5).

### (b) Các bậc và dải áp dụng (tổng hợp – phần lớn ⚠️ định tính, chỉ con số có nguồn ghi ✅)
| Bậc | Phương pháp | Dải áp dụng | Ghi chú |
|---|---|---|---|
| 0 | Radar/laser (Mặt Trăng, hành tinh) | Hệ Mặt Trời | Định ra au (radar 1961 ✅) |
| 1 | Thị sai lượng giác | Gaia: tốt đến vài kpc (~10 000+ ly) với sao sáng | 20–30 µas (G<15) ✅ |
| 2 | Cepheid (+ TRGB, JAGB) | đến ~40 Mpc (~130 triệu ly) | NGC 5468 ✅ |
| 3 | SN Ia | ~10 Mpc đến hàng tỷ ly | σ ≈ 0,18 mag ✅ |
| 4 | Định luật Hubble (dịch chuyển đỏ) | thiên hà rất xa | phụ thuộc mô hình vũ trụ học |

- Mỏ neo hình học khác (không qua thị sai): maser nước trong **NGC 4258** (~7,6 Mpc), sao đôi che khuất trong **LMC** (~50 kpc) ⚠️ (chưa thấy trích đoạn trong phiên này).

### (c) Hằng số Hubble – xem bảng chi tiết trong `thang-bac-vu-tru.md` §9. Bổ sung phiên này:
- Tổng quan **"The Hubble tension: A decade review"** (arXiv:2606.20434, 6/2026): **Planck + ACT + SPT: H₀ = 67,19 ± 0,38 km/s/Mpc**; Planck + ACT: 67,62 ± 0,5; H0DN 2026: **73,50 ± 0,81** – lệch **7,1σ** so với ΛCDM + CMB. ✅ (trích đoạn arXiv) https://arxiv.org/abs/2606.20434
- Một nguồn thứ cấp ghi SPT-3G D1 riêng: 66,66 ± 0,60 ⚠️; Freedman (JWST): 69,8 ± 1,9 ✅ (đã có ở file kia ở dạng ~70,4 – các phân tích CCHP khác nhau cho 69,8–70,4).
- **Khuyến nghị số hiển thị (tính đến 11/2026):** "**~73 km/s/Mpc** (thang khoảng cách: SH0ES 73,04 ± 1,04 năm 2022; H0DN 73,50 ± 0,81 năm 2026) so với **~67–68 km/s/Mpc** (CMB: Planck 2018 67,4 ± 0,5; Planck+ACT+SPT 67,19 ± 0,38)".

### (d) Thuật ngữ tiếng Việt
- **"thang khoảng cách vũ trụ"** (cosmic distance ladder), **"hằng số Hubble"**, **"căng thẳng Hubble"/"mâu thuẫn Hubble"** (Hubble tension) ⚠️ – báo chí VN dùng cả hai.

### (e) Hiểu lầm
- *"Căng thẳng Hubble nghĩa là vũ trụ học Big Bang sai."* → Chỉ cho thấy **mô hình ΛCDM chuẩn** có thể thiếu một thành phần (hoặc còn sai số hệ thống chưa biết); bản thân vũ trụ giãn nở không bị nghi ngờ.

---

## 7. Nhìn xa là nhìn về quá khứ (lookback time)

### (a) Định nghĩa
- **Paris Observatory – An Etymological Dictionary of Astronomy and Astrophysics:** "Look-back time is the difference between the age of the Universe now and the age of the Universe at the time the photons were emitted from the object." ✅ https://dictionary.obspm.fr/terms/look-back-time/
- Thời gian nhìn lại tính từ dịch chuyển đỏ **phụ thuộc mô hình vũ trụ học** (H₀, Ωm, ΩΛ). ✅ (tài liệu giảng dạy Indiana Univ.)

### (b) Số liệu
| Thiên thể | Thời gian ánh sáng | Nguồn / nhãn |
|---|---|---|
| Mặt Trăng | **~1,28 s** một chiều (khứ hồi ~2,56 s; JPL: ~2,5 s, dao động ±7 %, 2,3–2,7 s) | ✅ khứ hồi (JPL LLR Model 2020: https://ssd.jpl.nasa.gov/ftp/eph/planets/ioms/LLR_Model_2020_DR.pdf; arXiv:2304.11128); một chiều tự tính 384 400 km / c = 1,282 s ⚠️ |
| Mặt Trời | **499,0 s ≈ 8 ph 19 s** (cho 1 au; dao động ~490–507 s) | tự tính, xem `thang-bac-vu-tru.md` §2 |
| Proxima Centauri | 4,2465 năm | ✅ (Gaia) |
| Andromeda (M31) | **~2,5 triệu năm** | ✅ (NASA Goddard/Hubble panorama, qua trích đoạn: "only 2.5 million light-years from Earth"); xem `thang-bac-vu-tru.md` §6 |
| MoM-z14 | ánh sáng đi ~13,5 tỷ năm; thấy thiên hà lúc vũ trụ ~**280 triệu năm tuổi** | ✅ (xem dưới) |
| Vũ trụ | **13,787 ± 0,020 tỷ năm** (Planck 2018, TT,TE,EE+lowE+lensing+BAO) | ⚠️ – con số thấy trong bảng tóm tắt thứ cấp; một nguồn (UNLV) ghi 13,797 ± 0,023 (tổ hợp dữ liệu khác). Gốc: Planck 2018 VI, *A&A* 641, A6 (2020), arXiv:1807.06209 |

- **Thiên hà xa nhất được xác nhận bằng quang phổ (tính đến 01/11/2026): MoM-z14, z_spec = 14,44 ± 0,02** (JWST NIRSpec, khảo sát "Mirage or Miracle", nhóm **Rohan Naidu**, MIT). Preprint 5/2025 (arXiv:2505.11263, "A Cosmic Miracle: A Remarkably Luminous Galaxy at z_spec = 14.44 Confirmed with JWST"); đăng *Open Journal of Astrophysics* 1/2026; NASA công bố "NASA Webb Pushes Boundaries of Observable Universe Closer to Big Bang" (28/1/2026). Thấy ở thời điểm **~280 triệu năm sau Big Bang**; đường kính ~240 ly. ✅
  - **Không tìm thấy** xác nhận quang phổ nào z > 14,44 tính đến nay (tìm kiếm mở rộng; tin mới nhất thấy được ~3/2026 vẫn coi MoM-z14 là kỷ lục). ⚠️ Nên kiểm lại trước khi xuất bản.
- **Kỷ lục trước: JADES-GS-z14-0.** **Nguồn lệch nhau về z:**
  - Carniani et al. 2024 (NIRSpec, điểm gãy Lyman-α): **z = 14,32 (+0,08/−0,20)** ✅ (arXiv:2405.20370)
  - Schouws et al. 2024/2025 (ALMA, vạch [OIII] 88 µm, 6,6σ): **z = 14,1793 ± 0,0007** – chính xác hơn ~180 lần; khớp vạch carbon tạm thời z = 14,178 ± 0,013 ✅ (arXiv:2409.20549)
  - → **Dùng z ≈ 14,18** cho JADES-GS-z14-0; con số 14,32 là giá trị ban đầu, đã lỗi thời. Thời điểm: ~**300 triệu năm** sau Big Bang (Schouws) – không thấy nguồn nào ghi "290 triệu năm".
- Kỷ lục thứ 4 (tham khảo): PAN-z14-1, z = 13,53 (xác nhận 1/2026) ⚠️ (Wikipedia).

### (c) Hiểu lầm phổ biến
1. *"Thiên hà cách 13,5 tỷ năm ánh sáng."* → "13,5 tỷ năm" là **thời gian ánh sáng đi** (lookback time); do vũ trụ giãn nở, **khoảng cách hiện tại** (đồng chuyển động) tới MoM-z14 lớn hơn nhiều (~33–34 tỷ ly ⚠️ – ước tính theo ΛCDM, chưa có nguồn trích đoạn). Báo chí hay lẫn hai khái niệm này.
2. *"Ngôi sao ta thấy có thể đã chết từ lâu."* → Với sao trong Ngân Hà (vài đến vài nghìn ly) thì gần như không bao giờ đúng: sao sống hàng triệu–tỷ năm, lâu hơn rất nhiều thời gian ánh sáng. ⚠️ (lập luận, không cần nguồn số)

### (d) Thuật ngữ tiếng Việt
- **"thời gian nhìn lại"** / "thời gian truy hồi"; **"dịch chuyển đỏ"** (redshift, cũng gặp "độ dịch chuyển đỏ", "dịch chuyển về phía đỏ") ⚠️ – chưa đối chiếu giáo trình.

---

## 8. Câu hỏi lớn: "Làm sao biết một ngôi sao cách ta bao xa?" – ý cho sơ đồ

**Ý tưởng cốt lõi:** Không có một "cây thước" duy nhất. Mỗi phương pháp chỉ dùng được trong một dải, và **mỗi bậc được hiệu chuẩn bằng bậc bên dưới** → sai số ở bậc dưới lan lên bậc trên (đây cũng là trọng tâm của căng thẳng Hubble).

Sơ đồ đề xuất (từ dưới lên):
```
[Tốc độ ánh sáng c — hằng số SI]
        │  radar / laser: đo thời gian khứ hồi
        ▼
[Đơn vị thiên văn au — đường đáy]  ← lịch sử: thị sai Sao Kim 1761/1769 → radar 1961 → định nghĩa IAU 2012
        │  hình học tam giác: d(pc) = 1 / p(″)
        ▼
[Thị sai → parsec]  Bessel 1838 → Hipparcos ~1 mas → Gaia ~20 µas
        │  đo khoảng cách Cepheid trong Ngân Hà (Gaia) ⇒ hiệu chuẩn
        ▼
[Cepheid — quan hệ chu kỳ–độ trưng (Leavitt 1908/1912)]  → Hubble 1923–25: Andromeda nằm ngoài Ngân Hà
        │  thiên hà chứa cả Cepheid và SN Ia ⇒ hiệu chuẩn
        ▼
[SN Ia — nến chuẩn hóa (Phillips 1993)]  → 1998: vũ trụ giãn nở gia tốc (Nobel 2011)
        │  so khoảng cách với dịch chuyển đỏ
        ▼
[Định luật Hubble — H₀ ≈ 73 (thang) vs ≈ 67 (CMB)]
        │
        ▼
[Nhìn xa = nhìn về quá khứ: ánh sáng mất thời gian để tới → MoM-z14 thấy lúc vũ trụ ~280 triệu tuổi; tuổi vũ trụ 13,8 tỷ năm]
```
Các đơn vị (au, ly, pc) là **nhánh bên** của sơ đồ: au = thước Hệ Mặt Trời; pc = sinh ra trực tiếp từ thị sai; ly = cách diễn đạt dễ hiểu, nối khoảng cách với **thời gian** → cầu nối sang khái niệm "nhìn về quá khứ".

Hai loại "thước" để làm rõ trong sơ đồ:
- **Hình học** (radar, thị sai) – không cần biết gì về vật lý của sao.
- **Nến chuẩn** (Cepheid, SN Ia): biết độ sáng thật L, đo độ sáng biểu kiến F ⇒ d = √(L / 4πF) (định luật nghịch đảo bình phương) – cần vật lý + hiệu chuẩn.

---

## Các điểm chưa đối chiếu được / cần kiểm lại khi có mạng
1. Nguyên văn đầy đủ IAU 2012 B2 (dòng về ký hiệu "au") và IAU 2015 B2 – chỉ qua trích đoạn SYRTE/arXiv.
2. Nguyên văn tiếng Anh từng chữ của mục "Parsec" và "Standard Candle" trong IAU OAE glossary; kiểm tra có bản tiếng Việt không.
3. IAU Style Manual §5.15 (năm Julius) – năm xuất bản 1987 hay 1989.
4. **Cấp sao tuyệt đối cực đại SN Ia "−19,3"**: không thấy trích đoạn; các tổng quan cho ~−19,5 (phụ thuộc H₀).
5. Tuổi vũ trụ 13,787 ± 0,020 tỷ năm – chưa thấy trong trích đoạn bài Planck gốc (chỉ bảng thứ cấp).
6. Trang NASA về Polaris, Cepheid, Andromeda (science.nasa.gov) – không xuất hiện trong kết quả; chỉ có nguồn NASA Goddard/SVS gián tiếp.
7. Thuật ngữ tiếng Việt: **chưa đối chiếu được SGK Vật lí 12 hay giáo trình thiên văn** nào; mọi thuật ngữ VN ở trên là ⚠️.
8. Kỷ lục thiên hà xa nhất: kiểm lại trước khi xuất bản (tin mới nhất thấy được ~3/2026).
9. Gaia DR4 (2/12/2026) sẽ thay đổi số liệu thị sai – cập nhật sau ngày này.

## Danh sách nguồn chính
- IAU 2012 B2: https://www.iau.org/static/resolutions/IAU2012_English.pdf ; SYRTE: https://syrte.obspm.fr/IAU_resolutions/Sumredef_au.html
- IAU 2015 B2 (Mamajek et al.): https://arxiv.org/abs/1510.06262
- IAU OAE glossary: Parsec https://astro4edu.org/resources/glossary/term/238/ ; Light Year …/178/ ; Cepheid …/54/ ; Standard Candle …/476/ ; Astronomical Unit …/26/ ; Polaris …/261/
- OEIS A213614 (giá trị năm ánh sáng): https://oeis.org/A213614
- Radar 1961 (NASA NTRS): https://ntrs.nasa.gov/api/citations/19650018864/downloads/19650018864.pdf
- Sky & Telescope – Venus transits: https://www.skyandtelescope.com/astronomy-news/history-and-sky-lore/the-transit-of-venus-tales-from-the-18th-and-19th-centuries/
- Bessel/61 Cyg: https://arxiv.org/abs/2009.11913
- Hipparcos: https://sci.esa.int/web/hipparcos/-/31905-about-the-mission
- Gaia EDR3: https://www.cosmos.esa.int/web/gaia/earlydr3 ; kết thúc: https://www.cosmos.esa.int/web/gaia/end-of-observations ; tin 2026: https://www.cosmos.esa.int/web/gaia/news-2026
- Leavitt 1912: https://ui.adsabs.harvard.edu/abs/1912HarCi.173....1L/abstract
- Carnegie – Hubble "VAR!": https://carnegiescience.edu/about/history/archives/plate-archives/m31var
- NASA SVS – Webb/Hubble Cepheid: https://svs.gsfc.nasa.gov/31293
- NASA HEASARC SN Ia: https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/snIa_chandra.html
- Phillips 1993: https://doi.org/10.1086/186970
- Nobel 2011: https://www.nobelprize.org/prizes/physics/2011/
- ESA/Hubble distance ladder: https://esahubble.org/images/heic1611a/
- Hubble tension review 2026: https://arxiv.org/abs/2606.20434
- Lookback time (Obs. Paris): https://dictionary.obspm.fr/terms/look-back-time/
- JPL LLR: https://ssd.jpl.nasa.gov/ftp/eph/planets/ioms/LLR_Model_2020_DR.pdf
- MoM-z14: https://arxiv.org/abs/2505.11263 ; NASA/AURA: https://www.aura-astronomy.org/blog/2026/01/28/nasa-webb-pushes-boundaries-of-observable-universe-closer-to-big-bang/
- JADES-GS-z14-0: https://arxiv.org/abs/2405.20370 ; ALMA: https://arxiv.org/abs/2409.20549
- Planck 2018 VI: https://arxiv.org/abs/1807.06209

---

## Bổ sung khi viết thẻ (01/11/2026)
- **δ Cephei:** chu kỳ 5,366 ngày; cấp sao biểu kiến 3,48–4,37 (trung bình ~3,95) ⚠️ (Wikipedia). Thị sai HST/FGS (Benedict et al. 2002, *AJ* 124, 1695; arXiv:astro-ph/0206214): **~273 pc (~890 ly), sai số ~4 %** ✅; phân tích lại Hipparcos cho 244 ± 10 pc; một bài 2015 (arXiv:1503.04116) cho p = 4,09 ± 0,16 mas (~245 pc) ✅ trích đoạn. → Viết "các phép đo thị sai cho khoảng 800–900 năm ánh sáng".
- Minh hoạ dùng ⟨M_V⟩ = −2,77 log P − 1,44 (Lanoix, Paturel & Garnier 1999, arXiv:astro-ph/9904298) cho δ Cep ra ~300 pc (~990 ly) khi bỏ qua bụi: chênh ~10–20 % – dùng làm ví dụ về ảnh hưởng của bụi và sai số hiệu chuẩn (tự tính ⚠️).
- Tốc độ ánh sáng 299 792 458 m/s là giá trị chính xác theo định nghĩa SI (BIPM) ✅ kiến thức chuẩn.
- Gaia phóng 19/12/2013 (ESA) ✅ kiến thức chuẩn.
- **Tinh vân Orion:** các phép đo hiện đại ~390–414 pc → viết "~1 300 năm ánh sáng" (≈ 400 pc) ⚠️ (tổng hợp, theo góp ý thẩm định).
- **Sao Mộc 5,2 au; Sao Hải Vương 30,07 au:** bán trục lớn theo NASA NSSDC Planetary Fact Sheet (xem `thong-so-hanh-tinh.md`) ✅.
- **Bức xạ nền vi sóng phát ra ~380 000 năm sau Big Bang; Mặt Trời hình thành ~4,6 tỷ năm trước:** giá trị chuẩn của NASA (WMAP, NASA Solar System) ⚠️ chưa trích đoạn trong phiên này.
- **Thẩm định 01/11/2026 (biên tập viên độc lập):** đã sửa mâu thuẫn số bậc của bậc thang, cơ chế SN Ia (kịch bản kinh điển + sub-Chandrasekhar), câu thoại Star Wars ("less than twelve parsecs"), phạm vi thị sai Gaia, bổ sung quan điểm CCHP (~70) về căng thẳng Hubble, nguồn SH0ES 2022 & H0DN 2026.
