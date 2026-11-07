# Chương 9 – Hành tinh và sự sống: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** Không mở trực tiếp trang gốc. Mọi số liệu được đối chiếu qua **trích đoạn kết quả công cụ tìm kiếm**. Phiên này hết hạn mức tìm kiếm giữa chừng, nên một số mục (TRAPPIST-1, Proxima b, PSR B1257+12, 51 Peg b, sự sống sớm nhất, phương trình Drake) **chưa tra được trong phiên này**. Các mục đó ghi theo kiến thức nền và đánh dấu ⚠️; xem danh sách ở mục 4.
> - ✅ **Đã đối chiếu**: con số hoặc câu xuất hiện trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/JPL/Caltech-IPAC) hoặc bài báo bình duyệt.
> - ⚠️ **Cần kiểm lại**: chỉ thấy ở nguồn thứ cấp, chưa thấy câu nguyên văn, chưa tra trong phiên này, hoặc là số tự tính (có ghi công thức).
>
> **Mức chắc chắn** (theo quy ước `.certainty` của site): **đã xác lập** / **được ủng hộ mạnh** / **đang tranh luận** / **suy đoán**.
>
> **Nguồn dùng nhiều lần:**
> - NASA Exoplanet Archive (Caltech/IPAC): https://exoplanetarchive.ipac.caltech.edu/ ; tin tức 2026: https://exoplanetarchive.ipac.caltech.edu/docs/exonews_archive.html ; bảng theo phương pháp: https://exoplanetarchive.ipac.caltech.edu/docs/counts_detail.html
> - NASA Science Exoplanets: https://science.nasa.gov/exoplanets/
> - NASA Astrobiology: https://astrobiology.nasa.gov/
> - IAU OAE glossary (CC BY 4.0, ghi công "IAU OAE"): https://astro4edu.org/resources/glossary/search/

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ khái niệm

**Câu hỏi lớn gợi ý:**
- "Chúng ta có cô đơn trong vũ trụ không?" (câu chính)
- Câu phụ: "Làm sao thấy một hành tinh mà ta không nhìn thấy được?", "Một hành tinh cần gì để có thể có sự sống?", "Cần bằng chứng gì để nói 'đã tìm thấy sự sống'?"

**Sợi chỉ xuyên suốt:** Ba bậc thang, mỗi bậc khó hơn bậc trước nhiều lần: (1) **có hành tinh** quanh các sao khác: *đã xác lập*, hơn 6 400 hành tinh; (2) **có hành tinh có thể sống được**: có ứng viên, nhưng "có thể sống được" chỉ là điều kiện cần về nhiệt độ; (3) **có sự sống**: *chưa có bằng chứng được chấp nhận*; mọi tín hiệu tới nay (K2-18 b, Cheyava Falls) ở mức "dấu hiệu sinh học tiềm năng".

**Sơ đồ liên hệ (bản phác, để vẽ):**
```
Sao (độ sáng L, nhiệt độ Teff)
   │ quyết định
   ▼
VÙNG CÓ THỂ SỐNG ĐƯỢC (d ∝ √(L/L☉))  ◄── khí quyển, nhà kính, albedo của hành tinh
   │                                        (Trái Đất: 255 K không khí quyển → 288 K thực)
   ▼
NGOẠI HÀNH TINH được phát hiện bằng: transit (độ sâu = (Rp/R*)²) · vận tốc xuyên tâm (K ∝ Mp)
   · vi thấu kính · chụp ảnh trực tiếp · đo thời gian (pulsar) · trắc lượng (Gaia DR4)
   │ transit + JWST → phổ truyền qua khí quyển
   ▼
DẤU HIỆU SINH HỌC (O₂, O₃, CH₄+O₂ mất cân bằng, DMS…)  ──► thang CoLD (1→7)
   ▲
   │ trong Hệ Mặt Trời: đo tại chỗ
Sao Hỏa (Perseverance, Cheyava Falls) · Europa (Europa Clipper, JUICE) · Enceladus (Cassini: phosphate)
   (đại dương dưới băng: NGOÀI vùng sống được kinh điển, sưởi bằng thủy triều)
   │
   ▼
SINH HỌC VŨ TRỤ: nguồn gốc, tiến hóa, phân bố, tương lai của sự sống · phương trình Drake (khung suy luận)
```

---

## 1. Ngoại hành tinh và cách phát hiện

### (a) Định nghĩa gốc
- **Exoplanet** (IAU OAE, mục 106): một hành tinh nằm ngoài Hệ Mặt Trời, còn gọi là hành tinh ngoài hệ (extrasolar planet). Chỉ thấy bản tiếng Pháp/Đức trong trích đoạn ("Une exoplanète, ou planète extrasolaire…"); những ngoại hành tinh đầu tiên được xác nhận vào thập niên 1990. https://astro4edu.org/resources/glossary/term-detail/106 ⚠️ (chưa có câu nguyên văn tiếng Anh; cần mở trang)
- **Định nghĩa làm việc của IAU** (IAU working definition; bản 2001, sửa 2003, sửa đổi bởi Ủy ban F2 tháng 8/2018), theo trích đoạn: vật thể có **khối lượng thật dưới ngưỡng đốt deuterium** (hiện tính khoảng **13 M_Jup** với độ kim loại bằng Mặt Trời), quay quanh sao, sao lùn nâu hoặc tàn dư sao, là "hành tinh" **bất kể cách hình thành**; bản 2018 thêm điều kiện **tỉ số khối lượng** với vật chủ nhỏ hơn ngưỡng bất ổn L4/L5 (**~1/25**). Nguồn: Lecavelier des Etangs & Lissauer (2022), *New Astronomy Reviews*, "The IAU working definition of an exoplanet", https://hal.sorbonne-universite.fr/hal-03631543 ✅ (trích đoạn). ⚠️ Chưa chép được câu nguyên văn của IAU.
  - Lưu ý: ngưỡng 13 M_Jup **không có ý nghĩa vật lý sắc nét** (một số vật thể dưới ngưỡng vẫn đốt deuterium). **NASA Exoplanet Archive nhận vật thể tới ≤ 30 M_Jup**; Exoplanet Data Explorer tới 24 M_Jup (theo trích đoạn Wikipedia, cần lần về trang "Exoplanet Criteria" của Archive) ⚠️. → Số đếm của Archive **không** theo đúng ngưỡng IAU.

### (b) Con số then chốt
- **Số ngoại hành tinh đã xác nhận (NASA Exoplanet Archive)** — dữ kiện hay đổi:
  - Vượt **6 000** vào **9/2025** (Universe Today, Live Science, EarthSky; https://www.universetoday.com/articles/its-official-we-now-know-of-6000-confirmed-exoplanets) ✅ (thứ cấp, dẫn NASA).
  - **6 147** tại bản cập nhật **12/3/2026** (tin tức Archive) ✅.
  - **6 445** tại bản cập nhật **8/10/2026**, cùng lúc Archive ghi nhận **hành tinh thứ 1 000 do TESS phát hiện** ✅.
  - **6 451** trên trang chủ Archive, "as of **10/15/2026**" ✅ (trích đoạn trang chủ). Bản cập nhật 15/10/2026 thêm 6 hành tinh, trong đó Elias 2-24 b, có thể là ngoại hành tinh trẻ nhất đã biết.
  - **Con số mới nhất tìm được: 6 451 (15/10/2026).** ⚠️ Archive cập nhật hằng tuần; trước khi đăng phải mở trang chủ chép lại số và ngày. Viết an toàn: "hơn 6 400 (10/2026)".
  - Ứng viên TESS chờ xác nhận: **4 823** (NASA Science Data highlights 10/2026) ✅.
- **Tỉ lệ theo phương pháp** ⚠️ (tự tính): một bản sao trang counts_detail (không rõ ngày) ghi transit 4 653, vận tốc xuyên tâm 1 186, vi thấu kính 278, chụp ảnh 97; tổng ~6 288 → **transit ~74%, vận tốc xuyên tâm ~19%, vi thấu kính ~4%, chụp ảnh trực tiếp ~1,5%**, còn lại (đo thời gian, trắc lượng, biến thiên thời điểm transit…) < 1%. Nguồn thứ cấp khác: transit ~76% (5/2026). Phương pháp trực tiếp chỉ ~1,4% (arXiv 2506.19898). Viết an toàn: "khoảng ba phần tư bằng transit, khoảng một phần năm bằng vận tốc xuyên tâm".
- **Hành tinh quanh pulsar PSR B1257+12**: Wolszczan & Frail, *Nature* 355, 145 (1992), phương pháp đo thời gian xung → **những ngoại hành tinh đầu tiên được xác nhận** (quanh một sao chết). ⚠️ chưa tra trong phiên này.
- **51 Pegasi b**: Mayor & Queloz, *Nature* 378, 355 (11/1995; công bố tại hội nghị 6/10/1995), vận tốc xuyên tâm, **chu kỳ ~4,23 ngày**, khối lượng tối thiểu ~0,47 M_Jup → hành tinh đầu tiên quanh sao kiểu Mặt Trời; Nobel Vật lý 2019 (chia với Peebles). ⚠️ chưa tra trong phiên này. Tên IAU (NameExoWorlds 2015): **Dimidium** (trích đoạn IAU OAE bản Đức có nêu) ✅.
- **Độ sâu transit = (Rp/R*)²** ⚠️ tự tính:
  - Trái Đất trước Mặt Trời: (6 371 / 695 700)² ≈ 8,4 × 10⁻⁵ = **~84 ppm (0,0084%)**.
  - Sao Mộc: (69 911 / 695 700)² ≈ **1,01%**.
- **Biên độ vận tốc xuyên tâm** K = (2πG/P)^{1/3} · Mp / (M★+Mp)^{2/3} (quỹ đạo tròn, nhìn ngang) ⚠️ tự tính:
  - Mặt Trời do Sao Mộc: **~12,5 m/s** (P = 11,86 năm). Do Trái Đất: **~8,9 cm/s ≈ 9 cm/s**.
  - Phổ kế tốt nhất hiện nay (ESPRESSO) đạt cỡ vài chục cm/s ⚠️ (chưa tra) → "Trái Đất thứ hai" quanh sao kiểu Mặt Trời vẫn nằm dưới ngưỡng đo của vận tốc xuyên tâm.
- **Sứ mệnh** (dữ kiện hay đổi, ghi 07/11/2026):
  - **Kepler** (NASA): 2009–2018 (K2 từ 2014). ⚠️ chưa tra trong phiên này.
  - **TESS** (NASA): phóng 4/2018, đang hoạt động; **hành tinh thứ 1 000 được Archive ghi nhận 8/10/2026** ✅ (https://heasarc.gsfc.nasa.gov/docs/tess/tess-reaches-1000-confirmed-exoplanets.html).
  - **CHEOPS** (ESA): phóng 12/2019, đo chính xác các hành tinh đã biết. ⚠️ chưa tra.
  - **Gaia DR4** (ESA): **công bố 2/12/2026**, 12:00 CET, dựa trên 66 tháng dữ liệu, ~500 TB; dự kiến là **bộ ứng viên ngoại hành tinh lớn đầu tiên bằng trắc lượng (astrometry)** ✅ (thông báo ESA 7/5/2026, https://www.cosmos.esa.int/web/gaia/news ; Archive: https://exoplanetarchive.ipac.caltech.edu/docs/GaiaMission.html).
  - **PLATO** (ESA): **KHÔNG còn dự kiến phóng 12/2026.** Trang ESA ghi **4/2027**, Ariane 6, quỹ đạo halo quanh L2 (https://www.esa.int/PLATO) ✅; video ESA 3/2026 ghi "đầu 2027"; nguồn thứ cấp ghi 1/2027 hoặc 3/2027. Kế hoạch cũ (hợp đồng 1/2025): cuối 2026.
  - **Nancy Grace Roman** (NASA): dự kiến phóng muộn nhất 5/2027, có thể sớm từ mùa thu 2026 ⚠️ chưa tra trong phiên này — **cần kiểm tra đã phóng hay chưa**.
- **Proxima b** ⚠️ chưa tra: Anglada-Escudé et al., *Nature* 2016; quanh Proxima Centauri (~4,24 năm ánh sáng, sao gần nhất), chu kỳ ~11,2 ngày, khối lượng tối thiểu ~1,07 M⊕, nằm trong vùng sống được; sao lùn đỏ có bùng nổ mạnh.
- **TRAPPIST-1** ⚠️ chưa tra: Gillon et al., *Nature* 2017 (công bố 22/2/2017) → **7 hành tinh** cỡ Trái Đất, quanh sao lùn đỏ siêu lạnh cách **~40 năm ánh sáng** (~12,4–12,5 pc; 12,43 pc × 3,2616 ≈ 40,5 năm ánh sáng); e, f, g thường được xếp trong vùng sống được.

### (c) Hiểu lầm phổ biến
1. **"Kính thiên văn chụp được ảnh bề mặt ngoại hành tinh."** → Sai. Gần như mọi ngoại hành tinh được phát hiện **gián tiếp** (ánh sao mờ đi, sao dao động). Chụp ảnh trực tiếp chỉ ~1,5% số hành tinh và cho **một chấm sáng**, không có chi tiết bề mặt; đa số là hành tinh khí khổng lồ trẻ, nóng, ở xa sao. Hình minh họa trong báo chí là **tranh vẽ của họa sĩ**.
2. **"Phát hiện bằng transit thì đo được khối lượng."** → Transit cho **bán kính** (qua độ sâu); vận tốc xuyên tâm cho **khối lượng tối thiểu** (Mp sin i). Cần cả hai mới có mật độ.
3. **"Hành tinh ngoài hệ đầu tiên là 51 Peg b."** → Đầu tiên được xác nhận là các hành tinh quanh pulsar PSR B1257+12 (1992); 51 Peg b (1995) là đầu tiên quanh sao giống Mặt Trời.

### (d) Thuật ngữ tiếng Việt
- ngoại hành tinh / hành tinh ngoài Hệ Mặt Trời (exoplanet, extrasolar planet)
- phương pháp quá cảnh / quang trắc quá cảnh (transit method, transit photometry); độ sâu quá cảnh (transit depth)
- phương pháp vận tốc xuyên tâm (radial velocity method; còn gọi "Doppler wobble")
- vi thấu kính hấp dẫn (gravitational microlensing); chụp ảnh trực tiếp (direct imaging); đo thời gian (timing); trắc lượng / đo vị trí sao (astrometry)
- sao xung (pulsar); sao lùn đỏ (red dwarf, M dwarf); sao lùn nâu (brown dwarf)
- ứng viên (candidate) / đã xác nhận (confirmed); khối lượng sao Mộc (Jupiter mass, M_Jup)
- phổ truyền qua (transmission spectrum)

---

## 2. Vùng có thể sống được

### (a) Định nghĩa gốc
- **NASA** (trang "What is the Habitable Zone or 'Goldilocks Zone'?"): *"the habitable zone is the area around a star where it is not too hot and not too cold for liquid water to exist on the surface of surrounding planets"*. https://science.nasa.gov/exoplanets/what-is-the-habitable-zone-or-goldilocks-zone ✅ (trích đoạn)
- **Harvard CfA**: vùng mà sự đốt nóng của sao và sự tỏa nhiệt của hành tinh cho phép nước bề mặt ở thể lỏng; định nghĩa này **giả định hành tinh có khí quyển và bề mặt rắn**. https://www.cfa.harvard.edu/news/habitable-zones ✅ (diễn giải)
- IAU OAE: chưa tra được mục "habitable zone" ⚠️.

### (b) Con số then chốt
- **Kasting, Whitmire & Reynolds (1993)**, *Icarus* 101, 108: biên trong bảo thủ **0,95 au** (mất nước), biên ngoài 1,37 au (CO₂ bắt đầu ngưng tụ) đến **1,67 au** (nhà kính cực đại). ⚠️ (trích đoạn thứ cấp nêu 0,95/1,67 thuộc Kasting 1993).
- **Kopparapu et al. (2013)**, *ApJ* 765, 131 (+ đính chính; arXiv 1301.6674), cho Hệ Mặt Trời ✅ (trích đoạn):
  - Biên trong bảo thủ (**moist greenhouse / water loss**): **0,99 au**. Runaway greenhouse ~0,97 au ⚠️ (chưa thấy trong trích đoạn).
  - Biên ngoài bảo thủ (**maximum greenhouse**): **1,70 au**.
  - Biên lạc quan (thực nghiệm): **"Recent Venus" ~0,75 au**, **"Early Mars" ~1,77 au**.
  - → Trái Đất (1 au) **nằm sát biên trong** của vùng bảo thủ.
  - Kopparapu et al. (2014), *ApJL* 787, L29: thêm phụ thuộc khối lượng hành tinh (hành tinh nặng hơn → biên trong dịch vào trong). ⚠️ chưa tra.
  - Nguồn lệch: 0,95–0,99 au (biên trong) và 1,67–1,70 au (biên ngoài) tùy mô hình/năm.
- **Quy tắc thang**: thông lượng nhận được S = L/d² → khoảng cách cùng thông lượng **d ≈ √(L/L☉) × d☉** ⚠️ (gần đúng; Kopparapu dùng S_eff phụ thuộc Teff, sao lạnh có biên dịch ra ngoài thêm vì hành tinh hấp thụ hồng ngoại tốt hơn).
  - **TRAPPIST-1** (L ≈ 5,5 × 10⁻⁴ L☉ ⚠️ chưa tra): √L ≈ 0,0235 → vùng bảo thủ thô **~0,023–0,040 au** (tự tính) — tức nhỏ hơn quỹ đạo Sao Thủy (0,39 au) khoảng 10–17 lần. Hành tinh e, f, g nằm ở ~0,03–0,05 au, chu kỳ vài ngày đến ~12 ngày ⚠️.
- **Nhiệt độ cân bằng Trái Đất** ⚠️ tự tính: T_eq = T☉ · √(R☉/2a) · (1−A)^{1/4}; T☉ = 5 772 K, A = 0,29–0,306 → **~254–255 K (≈ −18 °C)**. Nhiệt độ bề mặt trung bình thực ~**288 K (15 °C)** → hiệu ứng nhà kính tự nhiên **~+33 K**. (Số 288 K và 33 K là giá trị sách giáo khoa; chưa tra nguồn NASA trong phiên này.)
- **Europa và Enceladus**: đại dương nước lỏng dưới lớp băng, được duy trì bằng **nhiệt thủy triều**, nằm **ngoài** vùng sống được kinh điển (Sao Mộc 5,2 au, Sao Thổ 9,5 au). Enceladus có "đại dương toàn cầu phủ băng" (*"a global ice-covered water ocean"*, Postberg et al. 2023, *Nature* 618) ✅. → Vùng sống được kinh điển chỉ nói về **nước trên bề mặt**.

### (c) Hiểu lầm phổ biến
1. **"Hành tinh trong vùng sống được thì có sự sống."** → Sai. "Có thể sống được" (habitable) ≠ "có sinh vật" (inhabited). Vùng sống được chỉ là điều kiện về **khoảng cách/thông lượng**; còn cần khí quyển phù hợp, nước, bề mặt đá… Sao Kim và Sao Hỏa nằm ở/sát rìa vùng lạc quan nhưng không có sự sống đã biết; Mặt Trăng nằm trong vùng nhưng không có khí quyển. *Đã xác lập.*
2. **"Ngoài vùng sống được thì không thể có nước lỏng."** → Đại dương dưới băng (Europa, Enceladus) chứng tỏ nước lỏng có thể tồn tại nhờ nhiệt thủy triều, xa ngoài vùng kinh điển. *Đã xác lập* (Enceladus, Europa: được ủng hộ mạnh).
3. **"Vùng sống được là một đường ranh sắc nét, cố định."** → Ranh giới phụ thuộc mô hình khí hậu (0,95 hay 0,99 au), khối lượng hành tinh, mây; và dịch ra ngoài khi sao sáng dần theo thời gian.

### (d) Thuật ngữ tiếng Việt
- vùng có thể sống được / vùng sống được (habitable zone, HZ); "vùng Goldilocks" (Goldilocks zone) — tên dân gian
- hiệu ứng nhà kính mất kiểm soát (runaway greenhouse); nhà kính ẩm / giới hạn mất nước (moist greenhouse, water-loss limit); nhà kính cực đại (maximum greenhouse)
- nhiệt độ cân bằng (equilibrium temperature); suất phản chiếu (albedo); thông lượng sao (stellar flux, insolation)
- có thể sống được (habitable) ≠ có sự sống (inhabited)
- đại dương dưới bề mặt (subsurface ocean); nhiệt thủy triều (tidal heating)

---

## 3. Sinh học vũ trụ (astrobiology)

### (a) Định nghĩa gốc
- **NASA Astrobiology**: *"the study of the origin, evolution, distribution, and future of life in the universe"*. Câu này xuất hiện trên các trang NASA Astrobiology Institute (lưu trữ) https://astrobiology.nasa.gov/nai/about/ và trong báo cáo National Academies 2019 *An Astrobiology Strategy for the Search for Life in the Universe* (doi:10.17226/25252). ⚠️ trích đoạn chỉ cho diễn giải; chưa thấy câu nguyên văn trên trang NASA hiện hành. Ba câu hỏi nền: sự sống bắt đầu và tiến hóa thế nào; có sự sống ngoài Trái Đất không và phát hiện bằng cách nào; tương lai của sự sống trên Trái Đất và trong vũ trụ. Chương trình Sinh học vũ trụ NASA lập năm 1996 ✅ (trích đoạn).
- **Biosignature** (theo cách NASA/JPL dùng trong thông cáo Perseverance 9/2025): đặc điểm hóa học hoặc cấu trúc **có thể** có nguồn gốc sinh học ✅ (diễn giải). "Potential biosignature" = cần thêm nghiên cứu để loại trừ nguồn phi sinh học.

### (b) Con số then chốt và tình trạng (ghi 07/11/2026)
- **K2-18 b và DMS** — *đang tranh luận, nghiêng về "chưa đủ bằng chứng"*:
  - Madhusudhan et al. (2023): tín hiệu DMS mức thấp trong dữ liệu cận hồng ngoại JWST.
  - Madhusudhan et al. (4/2025, *ApJL*): đặc trưng phổ "phù hợp với DMS và/hoặc DMDS" ở mức **~3σ**, dữ liệu MIRI 5–12 μm ✅ (trích đoạn). 3σ thấp hơn nhiều ngưỡng 5σ thường dùng để tuyên bố phát hiện.
  - Phản bác: Schmidt et al. (arXiv 2501.18477) — phân tích lại NIRISS+NIRSpec, thành phần giải thích được bằng **tiểu Sao Hải Vương (mini-Neptune) nghèo oxy**, không cần đại dương hay sự sống; "Insufficient evidence for DMS and DMDS in the atmosphere of K2-18 b" (arXiv 2505.13407, phân tích chung NIRISS/NIRSpec/MIRI); một tiền ấn phẩm 3/2026 (arXiv 2603.19803) mô hình quang hóa ủng hộ kịch bản tiểu Sao Hải Vương không cần DMS ✅ (trích đoạn tóm tắt). ⚠️ Chưa thấy phát biểu chính thức của NASA; một trang theo dõi (cập nhật 22/7/2026) xếp là "Disputed; insufficient evidence" (thứ cấp).
- **Perseverance, "Cheyava Falls" / mẫu "Sapphire Canyon"** — *đang tranh luận ("potential biosignature")*:
  - Mẫu lõi "Sapphire Canyon" khoan từ tảng đá "Cheyava Falls" **7/2024** trong lòng sông cổ, hố Jezero; là 1 trong 27 lõi đá ✅.
  - Bài *Nature* "Redox-driven Mineral and Organic Associations in Jezero Crater, Mars", Hurowitz et al., **10/9/2025** ✅.
  - "Đốm da báo" (leopard spots): mặt phản ứng oxy hóa–khử, khoáng **vivianite** (phosphate sắt) và **greigite** (sulfide sắt) cạnh chất hữu cơ; trên Trái Đất thường liên quan vi sinh vật, nhưng điều kiện axit hay nhiệt độ cao kéo dài cũng có thể tạo ra ✅.
  - NASA gọi đây là "ứng viên tốt nhất" của sứ mệnh; Katie Stack Morgan (JPL): *"Astrobiological claims demand extraordinary evidence"* ✅. Cần mẫu về Trái Đất để kết luận; chương trình Mars Sample Return đang bất định ⚠️ (chưa tra tình trạng 2026).
- **Enceladus** — *được ủng hộ mạnh: đại dương có các thành phần cần cho sự sống; KHÔNG phải bằng chứng sự sống*:
  - Postberg et al., *Nature* 618, 489–493 (**14/6/2023**): **phosphate natri** (chủ yếu Na₂HPO₄) trong hạt băng giàu muối của chùm phun, bằng Cosmic Dust Analyzer của Cassini; lần đầu thấy phosphor trong một đại dương ngoài Trái Đất ✅. Hạn chế: chỉ thấy ở một nhóm hạt con ✅.
  - Phân tử hữu cơ (Postberg et al. 2018, *Nature*: hữu cơ phân tử lớn) ⚠️ chưa tra trong phiên này.
- **Europa Clipper** (NASA): phóng **14/10/2024**; bắt đầu quỹ đạo quanh Sao Mộc **11/4/2030** ✅ (https://science.nasa.gov/image-detail/europaclipper-arrivaldate ; JPL press kit). Mục tiêu: đánh giá Europa có thể sống được không, **không** trực tiếp tìm sự sống ⚠️ (chưa thấy nguyên văn).
- **JUICE** (ESA): phóng **4/2023** (14/4/2023 ⚠️); tới Sao Mộc **7/2031** ✅ (lịch ESA và JAXA); chuyến khảo sát tới ~11/2034, trọng tâm Ganymede. Nguồn cũ ghi 10/2029 là kế hoạch lỗi thời.
- **Phương trình Drake** (Frank Drake, hội nghị Green Bank, **1961**): N = R* · f_p · n_e · f_l · f_i · f_c · L ⚠️ chưa tra trong phiên này. Là **khung tổ chức các ẩn số**, không phải phép tính có đáp án: các thừa số f_l, f_i, f_c, L chưa có dữ liệu (chỉ có một ví dụ: Trái Đất) → kết quả trải từ ≪1 tới hàng triệu tùy giả định. f_p (tỉ lệ sao có hành tinh) nay đã đo được gần ~1 nhờ Kepler ⚠️.
- **Sự sống sớm nhất trên Trái Đất** ⚠️ chưa tra trong phiên này — ghi theo kiến thức nền, cần kiểm:
  - ~3,48–3,5 tỷ năm: stromatolite và cấu trúc vi sinh ở Pilbara (Tây Úc), Dresser Formation — *được ủng hộ mạnh*.
  - ~3,7 tỷ năm: "stromatolite" Isua, Greenland (Nutman et al. 2016) — *đang tranh luận* (Allwood et al. 2018 cho là cấu trúc biến dạng phi sinh học).
  - ~4,1 tỷ năm: carbon nhẹ trong tinh thể zircon Jack Hills (Bell et al. 2015) — *đang tranh luận / suy đoán*.
  - Viết an toàn: "ít nhất khoảng 3,5 tỷ năm trước; có thể sớm hơn, đang tranh luận".
- **Thang CoLD** (Confidence of Life Detection): Green et al., *Nature* 598, 575 (**10/2021**), "Call for a framework for reporting evidence for life beyond Earth", doi:10.1038/s41586-021-03804-9 ✅. **7 bậc**; bậc 1 = phát hiện tín hiệu có thể do sự sống; các bậc giữa yêu cầu loại trừ nhiễm bẩn và nguồn phi sinh học (bậc 4: nguồn phi sinh học đã biết được chứng minh là không hợp lý trong môi trường đó); bậc 7 = quan sát độc lập tiếp theo xác nhận ✅. Lấy cảm hứng từ thang Torino. Ví dụ: Green xếp methane trên Sao Hỏa "khoảng bậc 4" ✅ (Scientific American). Tác giả gọi là "bằng chứng khái niệm", không phải quy định ✅. ⚠️ Wikipedia nói NASA dùng thang này trong thông báo 9/2025 — chưa xác minh.

### (c) Hiểu lầm phổ biến
1. **"Đã tìm thấy sự sống ngoài Trái Đất."** → Tính tới 07/11/2026, **chưa có** bằng chứng được cộng đồng khoa học chấp nhận. K2-18 b (DMS ~3σ, bị phản bác) và Cheyava Falls ("potential biosignature") đều ở **bậc thấp** của thang CoLD. *Đã xác lập* (là tình trạng hiện tại).
2. **"Phát hiện chất hữu cơ / phosphate = phát hiện sự sống."** → Chất hữu cơ và phosphate là **nguyên liệu**, hình thành được không cần sinh vật (có trong thiên thạch, sao chổi). Chúng tăng khả năng **có thể sống được**, không chứng minh có sinh vật.
3. **"Một khí như O₂ hay CH₄ là đủ để khẳng định sự sống."** → Mỗi khí riêng lẻ đều có nguồn phi sinh học (O₂ từ quang phân ly nước; CH₄ từ địa chất). Mạnh hơn là **cặp mất cân bằng hóa học** (O₂ + CH₄ cùng tồn tại) trong bối cảnh hiểu rõ hành tinh. ⚠️ (kiến thức nền, chưa tra nguồn trong phiên).

### (d) Thuật ngữ tiếng Việt
- sinh học vũ trụ (astrobiology); ngoại sinh học (exobiology)
- dấu hiệu sinh học (biosignature); dấu hiệu sinh học tiềm năng (potential biosignature); dấu hiệu kỹ thuật (technosignature)
- dimethyl sulfide (DMS), dimethyl disulfide (DMDS)
- tiểu Sao Hải Vương (sub-Neptune / mini-Neptune); hành tinh Hycean (Hycean world — đại dương dưới khí quyển giàu hydro; giả thuyết)
- mất cân bằng hóa học (chemical disequilibrium)
- thang tin cậy phát hiện sự sống (Confidence of Life Detection scale, CoLD)
- phương trình Drake (Drake equation); stromatolite (đá tầng vi sinh); hóa thạch vi sinh (microfossil)
- chùm phun (plume); độ tin cậy 3σ / 5σ (3-sigma / 5-sigma significance)

---

## 4. Điểm chưa đối chiếu được (cần mở nguồn gốc trước khi đăng)

1. **Số ngoại hành tinh** chính xác hôm nay: mới có 6 451 (15/10/2026). Mở https://exoplanetarchive.ipac.caltech.edu/ chép số + ngày.
2. **Tỉ lệ theo phương pháp**: chỉ có bản sao counts_detail không ghi ngày; tỉ lệ 74/19/4/1,5% là tự tính.
3. **Câu nguyên văn IAU** (định nghĩa làm việc 2018, Ủy ban F2) và câu tiếng Anh của mục "Exoplanet" trên astro4edu (term-detail/106); mục "habitable zone" trên astro4edu chưa tra.
4. **Câu nguyên văn định nghĩa astrobiology** trên trang NASA hiện hành (trích đoạn chỉ từ trang lưu trữ).
5. Hết hạn mức tìm kiếm, **chưa tra trong phiên này**: PSR B1257+12 (Wolszczan & Frail 1992); 51 Peg b (ngày, chu kỳ 4,23 ngày, m sin i); Proxima b (11,2 ngày, 1,07 M⊕, 2016); TRAPPIST-1 (2017, khoảng cách, độ sáng, vị trí e/f/g); Kepler/CHEOPS/TESS ngày phóng; **Roman đã phóng chưa (cửa sổ từ thu 2026)**; độ chính xác ESPRESSO; Kopparapu 2014; runaway greenhouse 0,97 au; 288 K / 33 K từ nguồn NASA; Postberg 2018 (hữu cơ Enceladus); JUICE ngày phóng chính xác (14/4/2023); Mars Sample Return tình trạng 2026; phương trình Drake 1961; sự sống sớm nhất (Pilbara 3,48 Ga, Isua 3,7 Ga, Jack Hills 4,1 Ga).
6. **K2-18 b**: chưa thấy phát biểu chính thức NASA/STScI về tình trạng DMS năm 2026; ngày đăng arXiv 2505.13407 (5/2025) lệch với một bài báo nói "16/7".
7. **CoLD và Cheyava Falls**: chưa xác minh NASA có xếp bậc CoLD cho mẫu này (Wikipedia nói có, 9/2025).
8. **PLATO**: các nguồn lệch tháng phóng (1/2027, 3/2027, 4/2027); trang ESA ghi 4/2027 — kiểm lại gần ngày đăng.
9. Số tự tính (độ sâu transit 84 ppm / 1,01%; K = 12,5 m/s / 8,9 cm/s; T_eq ≈ 255 K; vùng sống được TRAPPIST-1 ~0,023–0,040 au) — nên đối chiếu với một nguồn NASA/giáo trình.

**Nguồn tìm kiếm chính đã dùng:** exoplanetarchive.ipac.caltech.edu (trang chủ, tin tức 2026, GaiaMission), heasarc.gsfc.nasa.gov (TESS 1000), science.data.nasa.gov (10/2026), science.nasa.gov (habitable zone; Europa Clipper), esa.int/PLATO, cosmos.esa.int/web/gaia/news, hal.sorbonne-universite.fr/hal-03631543, arxiv.org (1301.6674, 2501.18477, 2505.13407, 2603.19803, 2506.19898), nature.com (s41586-023-05987-9; s41586-021-03804-9), sciencedaily.com/releases/2025/09/250916032210.htm, astrobiology.nasa.gov/nai/about/, cfa.harvard.edu/news/habitable-zones, astro4edu.org/resources/glossary/term-detail/106.
