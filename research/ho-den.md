# Chương 6 – Hố đen: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** giống `doi-song-cac-ngoi-sao.md`. Không mở trực tiếp trang gốc (mạng bị chặn); mọi đối chiếu qua **trích đoạn kết quả công cụ tìm kiếm**. Câu "nguyên văn" là những gì trích đoạn hiển thị, nên trước khi đăng cần mở trang để chép lại đúng từng chữ.
> - ✅ **Đã đối chiếu**: thấy trong trích đoạn của nguồn chính thống (NASA/ESA/ESO/IAU/EHT/LVK/Nobel) hoặc bài bình duyệt.
> - ⚠️ **Cần kiểm lại**: nguồn thứ cấp, chưa thấy nguyên văn, hoặc số tự tính (có ghi công thức).
>
> **Đã có ở file khác (không làm lại):** sao neutron, pulsar, siêu tân tinh sụp lõi, ngưỡng khối lượng sao → hố đen (Heger et al. 2003), giới hạn TOV. Xem `research/doi-song-cac-ngoi-sao.md` mục 4–5.
>
> **Hằng số dùng để tự tính:** GM☉ = 1,32712 × 10²⁰ m³/s²; GM⊕ = 3,986 × 10¹⁴ m³/s²; c = 2,99792 × 10⁸ m/s; 1 pc = 3,2616 năm ánh sáng.

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ khái niệm

**Câu hỏi lớn gợi ý:**
- Câu chính: "Làm sao ta thấy được một thứ không phát ra ánh sáng?"
- Câu phụ: "Ranh giới không lối về nằm ở đâu, và lớn cỡ nào?" / "Vì sao vật thể tối nhất lại tạo ra những nguồn sáng mạnh nhất vũ trụ (quasar)?"

**Sợi chỉ xuyên suốt:** Hố đen không nhìn thấy trực tiếp. Mọi hiểu biết đến từ **dấu vết lên vật chất và ánh sáng xung quanh**: quỹ đạo sao đồng hành (Cygnus X-1, Gaia BH1/BH3, sao S2), bức xạ của đĩa bồi tụ (tia X, quasar), sóng hấp dẫn khi sáp nhập (GW231123), và bóng in trên nền phát xạ (EHT).

**Sơ đồ liên hệ (bản phác, để vẽ):**
```
Sao > ~20 M☉ sụp lõi (→ xem chương 5)          Sáp nhập hố đen (sóng hấp dẫn, LIGO)
              │                                          │
              ▼                                          ▼
         HỐ ĐEN: khối lượng M → bán kính Schwarzschild r_s = 2GM/c²
              │
   hình học quanh hố đen (không quay), tính theo r_s:
     r_s ........ chân trời sự kiện (không lối về)
     1,5 r_s .... quả cầu photon (ánh sáng chạy vòng, không bền)
     ~2,6 r_s ... bán kính BÓNG nhìn từ xa (√27 GM/c²)  ──► ẢNH EHT (M87*, Sgr A*)
     3 r_s ...... ISCO (quỹ đạo tròn bền trong cùng)   ──► mép trong ĐĨA BỒI TỤ
              │
   Đĩa bồi tụ: ma sát nung nóng → tia X (hố đen sao) / UV-khả kiến (siêu nặng)
              │ hiệu suất 6–42% khối lượng → năng lượng (nhiệt hạch: 0,7%)
              ▼
   AGN / QUASAR (3C 273) + TIA PHẢN LỰC (M87, ~5 000 năm ánh sáng)
              │ bị chặn trên bởi giới hạn Eddington
Bằng chứng khối lượng: quỹ đạo sao S2 → Sgr A* ≈ 4,3 triệu M☉ (Nobel 2020)
```

---

## 1. Chân trời sự kiện và bán kính Schwarzschild

### (a) Định nghĩa gốc
- **Black hole** (IAU OAE, https://www.astro4edu.org/resources/glossary/term/43/, CC BY 4.0): *"A black hole is a region of space where the gravitational force is so large that nothing, not even light, can escape from it."* và *"The outer boundary of a black hole is known as the event horizon."* ✅
- **NASA** (câu xuất hiện ở bài NASA được đăng lại và ở buổi AMA của NASA 2019; trang science.nasa.gov/universe/black-holes không hiện trong kết quả tìm): *"A black hole is an astronomical object with a gravitational pull so strong that nothing, not even light, can escape it."* ⚠️ (chưa thấy trên trang gốc)
- **NASA Exoplanets** (https://exoplanets.nasa.gov/news/1564/what-is-a-black-hole): *"A black hole is a dense, compact object whose gravitational pull is so strong that – within a certain distance of it – nothing can escape, not even light."* ✅. Cụm "within a certain distance" rất hữu ích cho mục hiểu lầm (c).
- **Phân loại** (NASA "Black Hole Types", https://science.nasa.gov/universe/black-holes/types): ba loại theo khối lượng: khối lượng sao (stellar-mass), trung gian (intermediate-mass, khoảng một trăm đến hàng trăm nghìn M☉) và siêu nặng (supermassive, hàng trăm nghìn đến hàng tỷ M☉). *"Almost every large galaxy, including our Milky Way, has a supermassive black hole at its center"* (diễn giải). ✅
- **Bán kính Schwarzschild:** r_s = 2GM/c². Karl Schwarzschild tìm ra lời giải chính xác đầu tiên cho phương trình trường Einstein (vật đối xứng cầu, không quay), gửi Einstein trong thư từ mặt trận phía Đông (Nga) đề ngày **22/12/1915**; Einstein trình bày bài này trước Viện Hàn lâm Phổ vào **tháng 1/1916**. Schwarzschild mất ngày 11/5/1916. Nguồn: khảo sát lịch sử arXiv:2312.01865 ✅ (thứ cấp học thuật). **Nên viết "1915–1916"**; năm in là 1916.

### (b) Con số then chốt
- **r_s tự tính** ⚠️ (r_s = 2GM/c²):
  - Mặt Trời: 2 × 1,32712 × 10²⁰ / (2,99792 × 10⁸)² = **2 953 m ≈ 2,95 km**. Khớp với câu "khoảng 3 km" của NASA JPL Space Place (trích đoạn). ✅
  - Trái Đất: 2 × 3,986 × 10¹⁴ / c² = **8,87 × 10⁻³ m ≈ 8,9 mm**.
  - Quy tắc nhanh: r_s ≈ 2,95 km × (M/M☉).
- **Quả cầu photon và ISCO (hố đen không quay):**
  - Quả cầu photon ở r = 3GM/c² = **1,5 r_s**. Jeremy Schnittman (NASA Goddard): bán kính quả cầu photon *"50 per cent bigger than the horizon radius"* với hố đen không quay; với hố đen quay nhanh thì nó *"snuggles right up against the horizon"*. ✅ (trích qua bài đăng lại). Narayan, Johnson & Gammie 2019 (arXiv:1910.02957) ✅.
  - ISCO ở r = 6GM/c² = **3 r_s** (kết quả chuẩn trong giáo trình thuyết tương đối rộng). ⚠️ chưa thấy trích đoạn NASA/IAU nguyên văn; với hố đen Kerr quay cực đại (cùng chiều), ISCO tiến về GM/c².
  - **Lưu ý:** ScienceAlert từng gọi vòng photon là "innermost stable orbit". Sai, đó là hai khái niệm khác nhau (photon vs vật chất có khối lượng).
- **John Michell, "ngôi sao tối" (dark stars):** thư gửi Henry Cavendish, đọc trước Hội Hoàng gia ngày **27/11/1783**, in trong *Philosophical Transactions* tập 74 (năm tập **1784**), tr. 35–57. Ông lập luận ánh sáng từ sao đủ nặng "could not arrive at us", và đề xuất phát hiện gián tiếp qua chuyển động của sao đồng hành. APS News (https://www.aps.org/apsnews/2009/11/1783-john-michell-black-holes) ✅. Ý tưởng bị lãng quên tới thập niên 1970.
- **Thuật ngữ "black hole":**
  - Lần in sớm nhất được biết: **Ann Ewing**, *Science News Letter*, **18/1/1964**, tường thuật hội nghị AAAS ở Cleveland; không rõ ai nói ra cụm từ. Science News (https://www.sciencenews.org/?p=38254) ✅.
  - **John Wheeler** dùng và phổ biến cụm từ sau bài nói tháng **12/1967** ở New York (theo lời kể của ông: một người trong khán phòng gợi ý). Trang cũ NASA ghi "coined in 1967 by physicist John Wheeler"; Royal Society blog ghi 1967; APS News ghi 1968. ⚠️ **Nên viết "được John Wheeler phổ biến từ cuối năm 1967"**, tránh chữ "đặt ra/coined".
- **Cygnus X-1** (hố đen đầu tiên được thừa nhận rộng rãi): Miller-Jones et al. 2021, *Science* 371, 1046–1049, DOI 10.1126/science.abb3363 (arXiv:2102.09091) ✅: khối lượng **21,2 ± 2,2 M☉** (ước tính cũ ~15 M☉), khoảng cách **2,22 (+0,18/−0,17) kpc** ≈ 7 240 năm ánh sáng (tự quy đổi ⚠️; báo chí ghi "hơn 7 000"); sao đồng hành ~40–41 M☉.
- **GW231123** (sáp nhập hố đen nặng nhất qua sóng hấp dẫn): LIGO–Virgo–KAGRA công bố **14/7/2025**. Tín hiệu ghi ngày 23/11/2023 (đợt O4). Hai hố đen ~**103 và ~137 M☉**; hố đen sau sáp nhập **khoảng 225 M☉** (LVK: "more than 225"); cả hai quay gần cực đại. Kỷ lục trước: GW190521 (~140 M☉). https://ligo.org/?p=4077 ; https://ligo.org/wp-content/uploads/2025/07/GW231123.pdf ✅. ⚠️ 225 M☉ là khối lượng **hố đen cuối cùng**, không phải "tổng"; tổng hai hố đen ~240 M☉ (năng lượng sóng hấp dẫn mang đi phần chênh). Hai hố đen thành phần nằm trong "khe khối lượng" (mass gap), có thể là sản phẩm của các lần sáp nhập trước. Đây là hố đen **sao/trung gian ngoài thiên hà**, không phải trong Ngân Hà.
- **Gaia BH3** (hố đen gốc sao nặng nhất trong Ngân Hà): **32,70 ± 0,82 M☉** (≈ 33), cách **590 pc = 1 926 năm ánh sáng** (thông cáo liên kết ESA, Đại học Barcelona https://web.ub.edu/web/actualitat/w/gaia-black-hole-milky-way) ✅; chòm Thiên Ưng (Aquila); công bố **4/2024** (Gaia Collaboration, Panuzzo et al., *A&A* Letter). Phát hiện qua chuyển động "lắc" của sao đồng hành cổ, nghèo kim loại. Là hố đen **gần thứ hai** đã biết.
- **Gaia BH1** (hố đen gần nhất đã biết, tính đến 11/2026): El-Badry et al. 2022, *MNRAS* (arXiv:2209.06833) ✅; ~**9,6 M☉**, cách ~**478 pc ≈ 1 560 năm ánh sáng**, chòm Xà Phu (Ophiuchus); sao giống Mặt Trời quay quanh với chu kỳ ~186 ngày. MPIA (https://www.mpia.de/news/science/2022-16-gaia-bh1) ✅. ⚠️ "gần nhất" là dữ kiện có hạn dùng, ghi ngày.
- **Kéo sợi mì (spaghettification) — mô phỏng NASA 5/2024** (Schnittman & Powell, Goddard; https://science.nasa.gov/universe/black-holes/supermassive-black-holes/new-nasa-black-hole-visualization-takes-viewers-beyond-the-brink/) ✅: hố đen 4,3 triệu M☉ (cỡ Sgr A*); *"Once the camera crosses the horizon, its destruction by spaghettification is just 12.8 seconds away."* Chân trời rộng ~16 triệu dặm (~25 triệu km). Lực thuỷ triều ở chân trời **yếu hơn nhiều với hố đen siêu nặng** và mạnh nhất với hố đen nhỏ: ở hố đen khối lượng sao, vật bị kéo dài trước khi tới chân trời.
- **Quan sát viên ở xa:** vật rơi vào trông như chậm dần, đỏ dần (dịch chuyển đỏ hấp dẫn) và mờ dần, không bao giờ thấy nó vượt qua chân trời; vật rơi thì không cảm thấy gì đặc biệt khi vượt qua (ngoài lực thuỷ triều). ⚠️ Chỉ thấy ở nguồn phổ biến (Royal Museums Greenwich https://www.rmg.co.uk/stories/space-astronomy/what-happens-if-you-fall-black-hole) và diễn đàn; chưa có trích NASA nguyên văn. Kết quả chuẩn của thuyết tương đối rộng.

### (c) Hiểu lầm phổ biến
1. **"Hố đen hút mọi thứ như máy hút bụi."** Ở xa, lực hấp dẫn chỉ phụ thuộc khối lượng và khoảng cách, giống hệt một ngôi sao cùng khối lượng. Nếu Mặt Trời bị thay bằng hố đen cùng khối lượng (bán kính ~3 km), quỹ đạo Trái Đất không đổi; chỉ mất ánh sáng và nhiệt. NASA JPL Space Place và tờ thông tin Chandra (https://chandra.si.edu/graphics/resources/illustrations/shareables/astrofacts12A.pdf) ✅ (trích đoạn). Lưu ý: Mặt Trời quá nhẹ để thành hố đen.
2. **"Hố đen là một lỗ thủng trong không gian."** Hố đen là một vật thể có khối lượng (có thể quay, có thể đo khối lượng), không phải lỗ rỗng; "hố" chỉ là tên gọi. Chân trời sự kiện không phải bề mặt vật chất mà là ranh giới.
3. **"Hố đen nào cũng xé nát bạn ở chân trời."** Phụ thuộc khối lượng: với hố đen siêu nặng, lực thuỷ triều ở chân trời nhỏ, vật bị kéo sợi mì *sau* khi vượt qua (12,8 s, mô phỏng NASA).

### (d) Thuật ngữ tiếng Việt
hố đen (black hole); chân trời sự kiện (event horizon); bán kính Schwarzschild (Schwarzschild radius); điểm kỳ dị (singularity); quả cầu photon (photon sphere); quỹ đạo tròn bền trong cùng (innermost stable circular orbit, ISCO); hiệu ứng kéo sợi mì / hiệu ứng mì Ý (spaghettification); lực thuỷ triều (tidal force); dịch chuyển đỏ hấp dẫn (gravitational redshift); giãn nở thời gian (time dilation); hố đen khối lượng sao / trung gian / siêu nặng (stellar-mass / intermediate-mass / supermassive); sóng hấp dẫn (gravitational wave); sao tối (dark star, Michell). ⚠️ "Lỗ đen" cũng phổ biến ở tiếng Việt; chọn "hố đen" cho thống nhất toàn site.

---

## 2. Đĩa bồi tụ, quasar và tia phản lực

### (a) Định nghĩa gốc
- **Accretion disk** (IAU OAE, https://astro4edu.org/resources/glossary/term/426/, CC BY 4.0): đĩa khí và bụi quay, hình thành khi vật chất rơi vào không thể rơi thẳng xuống vật thể trung tâm (do có mômen động lượng); vật chất dần trôi vào trong, năng lượng giải phóng nung đĩa tới nhiệt độ rất cao; đĩa quanh hố đen siêu nặng cấp năng lượng cho nhân thiên hà hoạt động. Xuất hiện cả quanh tàn dư sao và tiền sao. ✅ (trích đoạn diễn giải, chưa có câu nguyên văn)
- **Active Galactic Nucleus** (IAU OAE, https://astro4edu.org/resources/glossary/term/5/): vùng rất sáng ở tâm thiên hà, năng lượng từ hố đen siêu nặng hút vật chất tạo đĩa bồi tụ rất nóng; các loại gồm quasar, blazar, thiên hà Seyfert, thiên hà vô tuyến. ✅ (diễn giải)
- **Quasar** (IAU OAE, https://astro4edu.org/resources/glossary/term/268/): viết tắt của *quasi-stellar radio source*; nguồn ngoài thiên hà rất xa trông như sao; là một phân loại của AGN, gắn với hố đen siêu nặng nặng nhất. ✅ (diễn giải)

### (b) Con số then chốt
- **Hiệu suất bức xạ** (phần khối lượng nghỉ chuyển thành năng lượng, η = 1 − E_ISCO):
  - Schwarzschild: η = 1 − √(8/9) ≈ **5,7%** (tự tính ⚠️; arXiv:1810.07032 ghi 5,7%, nguồn khác làm tròn ~6%) ✅.
  - Kerr quay cực đại (a = 1, quỹ đạo cùng chiều): η = 1 − 1/√3 ≈ **42,3%** ✅ (arXiv:1810.07032; astro-ph/0605295). Thực tế: Thorne 1974 tính spin "cực đại hợp lý" a ≈ 0,998 → η ≈ **32%** (arXiv:0906.2119). **Nên viết "từ khoảng 6% đến hơn 30%, giới hạn lý thuyết 42%".**
  - Nhiệt hạch H → He: **~0,7%** (khối lượng hụt 0,0071). Nguồn lệch nhẹ: arXiv:1911.04305 nói 0,7% là "H tới sắt" (thực tế H→Fe ≈ 0,9%; H→He ≈ 0,7%). ⚠️ Viết "hydro thành heli: ~0,7%".
- **Giới hạn Eddington:** L_Edd = 4πGMm_p c / σ_T ≈ **1,26 × 10³⁸ erg/s × (M/M☉) = 1,26 × 10³¹ W × (M/M☉)** (Etymological Dictionary of Astronomy, Obs. Paris, https://dictionary.obspm.fr/terms/eddington-limit/ ✅). Tự tính lại ⚠️: 4π × 1,327×10²⁰ × 1,6726×10⁻²⁷ × 2,998×10⁸ / 6,652×10⁻²⁹ = 1,257 × 10³¹ W ✓. Ý nghĩa: với khí hydro ion hoá, áp suất bức xạ cân bằng trọng lực; ≈ 33 000 lần độ sáng Mặt Trời cho mỗi M☉ (tự tính: 1,26×10³¹ / 3,828×10²⁶ ≈ 32 900) ⚠️. Có thể vượt tạm thời (bồi tụ siêu Eddington; một số nguồn tia X siêu sáng).
- **Quasar 3C 273:** Maarten Schmidt, *Nature* 197, 1040, số ngày **16/3/1963** (cùng số với Hazard et al., Oke, Greenstein & Matthews); dùng kính 200 inch Palomar; nhận ra vạch Balmer dịch chuyển đỏ **z = 0,158**. arXiv:1304.3627 (Kellermann, "The Discovery of Quasars and its Aftermath") ✅. ⚠️ Khoảng cách ~2,4 tỷ năm ánh sáng là con số phổ biến, chưa đối chiếu trong phiên này (phụ thuộc định nghĩa khoảng cách).
  - **Từ "quasar"** do **Hong-Yee Chiu** đặt, *Physics Today* 5/1964 ("Gravitational collapse"); Schmidt *không* dùng từ này năm 1963; *ApJ* chỉ chấp nhận từ này từ 1970. ✅ (arXiv:1304.3627; Smithsonian Archives). Không viết "Schmidt gọi là quasar".
- **Tia phản lực M87:** NASA/ESA Hubble: *"the length of the jet is 5,000 light-years at optical wavelengths (100,000 light years at radio wavelengths)"* (trang ảnh NASA, trích đoạn) ✅; nghiên cứu Hubble 13 năm (2013) mô tả tia dài ~5 000 năm ánh sáng ✅. Lệch nhau: thông cáo Hubble 1992 ghi 4 000 năm ánh sáng (https://esahubble.org/images/opo9207a); EarthSky 2026 ghi "3,000-light-year-long". **Dùng ~5 000 năm ánh sáng (khả kiến), ghi bước sóng.**
  - EHT 2026 (dữ liệu 2021): lần đầu có dấu hiệu chân tia phản lực M87, *A&A* 28/1/2026 (https://eventhorizontelescope.org/news/2026/01/probing-jet-base-m87s-supermassive-black-hole-0) ✅.
- **Nhiệt độ đĩa** (T ∝ M^(−1/4) với cùng tỉ lệ Eddington):
  - Hố đen khối lượng sao (~10 M☉): vùng trong ~**10⁷ K**, phát xạ nhiệt cực đại ở **tia X mềm** (~1 keV) (arXiv:1203.1342; arXiv:1704.07268) ✅ học thuật.
  - Hố đen siêu nặng (10⁶–10⁹ M☉): ~**10⁵–10⁶ K**, cực đại ở **tử ngoại** ("big blue bump") ✅ học thuật. Einstein Online ghi "khoảng trăm triệu K" gần hố đen (nhiều khả năng nói vành nhật hoa nóng, không phải đĩa). ⚠️ Chưa có trích NASA.

### (c) Hiểu lầm phổ biến
1. **"Hố đen tối nên không thể sáng."** Hố đen không phát sáng, nhưng vật chất trong đĩa bồi tụ trước khi vượt chân trời là nơi sáng nhất vũ trụ: quasar có thể sáng hơn toàn bộ thiên hà chủ.
2. **"Tia phản lực phun ra từ bên trong hố đen."** Tia phóng ra từ vùng *bên ngoài* chân trời (từ trường và chuyển động quay của đĩa/hố đen), không phải vật chất thoát khỏi chân trời.
3. **"Hố đen nuốt được bao nhiêu cũng được, càng nhiều càng nhanh."** Bị chặn bởi giới hạn Eddington: bức xạ đẩy vật chất ra ngoài.

### (d) Thuật ngữ tiếng Việt
đĩa bồi tụ (accretion disk); bồi tụ (accretion); hiệu suất bức xạ (radiative efficiency); giới hạn / độ sáng Eddington (Eddington limit / luminosity); nhân thiên hà hoạt động (active galactic nucleus, AGN); chuẩn tinh / quasar (quasar, quasi-stellar object); tia phản lực tương đối tính (relativistic jet); blazar; thiên hà Seyfert; tán xạ Thomson (Thomson scattering).

---

## 3. Ảnh chụp hố đen M87* và Sgr A* (Event Horizon Telescope)

### (a) Định nghĩa gốc
- **EHT:** mạng giao thoa kế vô tuyến đường đáy rất dài (VLBI) gồm các kính ở nhiều châu lục, tạo một "kính thiên văn ảo cỡ Trái Đất"; ảnh 2017 dùng **8 kính** (Sgr A* Paper I) ở bước sóng **1,3 mm** (230 GHz). ✅
- **Bóng hố đen (shadow):** vùng tối ở giữa vành sáng. ESO eso1907: ảnh cho thấy *"a bright ring formed as light bends in the intense gravity around a black hole"* bao quanh vùng tối là bóng (diễn giải) ✅. Mép bóng ứng với vòng photon, tham số va chạm **b = √27 GM/c² ≈ 5,2 GM/c²** (Narayan, Johnson & Gammie 2019, arXiv:1910.02957) ✅ → **bán kính bóng ≈ (√27/2) r_s ≈ 2,6 r_s** (tự tính ⚠️; trang UNLV ghi hệ số 3√3/2 = 2,598) ✅.

### (b) Con số then chốt
- **M87* — công bố 10/4/2019** (6 họp báo đồng thời; ESO eso1907 https://eso.org/public/news/eso1907/ ✅):
  - Khối lượng **6,5 tỷ M☉** (±~10%; suy từ đường kính vành), cách **55 triệu năm ánh sáng** (một số nguồn 54 triệu; 16,8 Mpc tự quy đổi = 54,8 triệu ⚠️). ✅
  - Đường kính vành **42 ± 3 μas** (M87 Paper I, arXiv:1906.11238) ✅. Dữ liệu chụp **4/2017**.
  - Tự tính kiểm tra ⚠️: GM/c² (6,5×10⁹ M☉) = 9,6 × 10¹² m; ở 16,8 Mpc → 3,8 μas; đường kính bóng 2√27 × 3,8 ≈ **40 μas** — khớp bậc với 42 μas đo được.
  - r_s của M87* ≈ 1,9 × 10¹³ m ≈ **128 AU** (tự tính ⚠️; lớn hơn quỹ đạo Sao Diêm Vương ~39 AU nhiều lần).
- **Sgr A* — công bố 12/5/2022** (dữ liệu 2017; ảnh là trung bình nhiều ảnh dựng được vì Sgr A* biến đổi nhanh trong vài phút):
  - Vành **51,8 ± 2,3 μas** (Sgr A* Paper I, ApJL 930, L12, 2022, DOI 10.3847/2041-8213/ac6736; arXiv:2311.08680) ✅. Thông cáo thường làm tròn "~50 μas" hoặc 52.
  - Khối lượng **~4 triệu M☉** (EHT: "Kerr black hole with mass ∼4 × 10⁶ M☉", phù hợp với quỹ đạo sao) ✅; cách **~27 000 năm ánh sáng** (có nguồn ghi 26 000). Thông cáo: khối lượng này nằm trong vùng nhỏ hơn quỹ đạo Sao Thuỷ. ✅
  - **Chỗ lệch:** 4,0 (EHT làm tròn) vs **4,3 triệu M☉** (GRAVITY 2021/2022, ~4,30 × 10⁶) vs 4,26 (GRAVITY 2019/2020: 4,25–4,26 × 10⁶). **Dùng "khoảng 4,3 triệu M☉ (GRAVITY)"**, ghi "EHT: ~4 triệu" nếu trích EHT.
  - Tự tính ⚠️: GM/c² (4,3×10⁶ M☉) = 6,35 × 10⁹ m; ở 8,28 kpc → 5,1 μas; đường kính bóng ≈ 53 μas. r_s ≈ 1,27 × 10¹⁰ m ≈ **12,7 triệu km ≈ 0,085 AU**.
  - Khối lượng M87* ≈ 1 500 lần Sgr A*, cách xa ~2 000 lần → hai vành có kích thước góc gần như nhau (tự tính ⚠️).
- **Ảnh phân cực (từ trường):**
  - M87*: **24/3/2021**, Paper VII & VIII (ApJL), dữ liệu 2017; ESO eso2105 (https://eso.org/public/news/eso2105/): *"the first time astronomers have been able to measure polarisation, a signature of magnetic fields, this close to the edge of a black hole"* ✅.
  - Sgr A*: **27/3/2024**, Paper VII & VIII; từ trường mạnh, có tổ chức, xoắn ốc; gợi ý có thể có tia phản lực ẩn (https://eventhorizontelescope.org/blog/astronomers-unveil-strong-magnetic-fields-spiraling-edge-milky-way’s-central-black-hole) ✅.
- **Kết quả EHT sau đó (tính đến 11/2026):**
  - **M87* 2018** (thông cáo **18/1/2024**, *A&A*): vành ~**43 μas**, khớp 2017; vùng sáng nhất dịch ~**30°** ngược chiều kim đồng hồ (do rối loạn đĩa bồi tụ); thêm kính Greenland. https://eventhorizontelescope.org/m87-one-year-later-catching-black-holes-turbulent-accretion-flow ✅. ⚠️ JIVE ghi bài *A&A* bản in 1/2025; thông cáo 1/2024.
  - **345 GHz (0,87 mm)** (*AJ*, **27/8/2024**, Raymond, Doeleman et al., DOI 10.3847/1538-3881/ad5bdb): lần đầu VLBI phát hiện ở 345 GHz, độ phân giải **~19 μas**, cao nhất từ mặt đất; quan sát thiên hà xa, **chưa phải ảnh hố đen** ✅ (CfA). Dự kiến ảnh sắc hơn ~50%.
  - **Đảo chiều phân cực M87*** (*A&A*, **9/2025**, "Horizon-scale variability of M87* from 2017–2021", DOI 10.1051/0004-6361/202555855): kiểu phân cực xoắn một chiều năm 2017, gần ổn định 2018, **đảo chiều năm 2021**; kích thước vành không đổi. https://eventhorizontelescope.org/new-eht-images-reveal-unexpected-polarization-flips-at-m87 ✅
  - **Chân tia phản lực M87** (*A&A*, 28/1/2026, dữ liệu 2021) ✅ (xem mục 2).
  - **"Phim" M87*:** chiến dịch quan sát dày **3–4/2026** (phối hợp Hubble, Chandra, NuSTAR; chương trình HST 18187). **Chưa thấy công bố kết quả tính đến 07/11/2026.** ⚠️ Kiểm lại eventhorizontelescope.org trước khi đăng.
- **Nobel Vật lý 2020:** một nửa cho **Roger Penrose** *"for the discovery that black hole formation is a robust prediction of the general theory of relativity"* (công trình 1965, bề mặt bẫy ánh sáng); một nửa cho **Reinhard Genzel và Andrea Ghez** *"for the discovery of a supermassive compact object at the centre of our galaxy"* ✅. Genzel dùng VLT (ESO, Chile), Ghez dùng Keck (Hawaii); hai nhóm theo dõi từ đầu thập niên 1990. Ghez là phụ nữ thứ tư đoạt Nobel Vật lý.
- **Sao S2 và GRAVITY:** quỹ đạo **~16 năm** (16,05 năm ⚠️ con số chính xác chưa thấy trong trích đoạn), độ lệch tâm **e = 0,88**; qua cận điểm **5/2018** (đo dịch chuyển đỏ hấp dẫn, GRAVITY 2018). **2020:** phát hiện **tiến động Schwarzschild** của quỹ đạo S2, f_SP = 1,10 ± 0,19 (GR: 1) (GRAVITY Collab. 2020, *A&A* 636, L5, arXiv:2004.07187) ✅. Khoảng cách tâm Ngân Hà **8,28 kpc** (≈ 27 000 năm ánh sáng). Khối lượng mở rộng bên trong quỹ đạo S2 ≤ ~0,1% khối lượng trung tâm. ✅

### (c) Hiểu lầm phổ biến
1. **"Ảnh EHT là ảnh chụp trực tiếp chân trời sự kiện."** Vành sáng là phát xạ vô tuyến của plasma nóng, bị bẻ cong bởi hấp dẫn; vùng tối là **bóng**, rộng ~2,6 lần bán kính chân trời. Chân trời nằm bên trong, không thấy được. Gizmodo dẫn lời: bóng *không* đánh dấu chân trời. ✅
2. **"Đó là một bức ảnh bình thường, chụp một lần."** Ảnh được **dựng lại** bằng thuật toán từ dữ liệu giao thoa kế thưa (nhiều nhóm độc lập, nhiều phương pháp), ở bước sóng 1,3 mm, không phải ánh sáng nhìn thấy. Màu cam là màu giả.
3. **"Vành sáng đều là đĩa bồi tụ nhìn chính diện."** Độ sáng không đều chủ yếu do hiệu ứng Doppler tương đối tính (phía vật chất chuyển động về phía ta sáng hơn); vị trí vùng sáng thay đổi theo năm (M87* 2017 → 2018).

### (d) Thuật ngữ tiếng Việt
Kính thiên văn Chân trời Sự kiện (Event Horizon Telescope, EHT); giao thoa kế đường đáy rất dài (very long baseline interferometry, VLBI); bóng hố đen (black hole shadow); vòng photon (photon ring); micro giây cung (microarcsecond, μas); ánh sáng phân cực (polarized light); quay màn Faraday (Faraday screen/rotation); tiến động Schwarzschild (Schwarzschild precession); Nhân Mã A* (Sagittarius A*, Sgr A*, đọc "Sagittarius A sao"); M87* (hố đen ở tâm thiên hà Messier 87).

---

## 4. Nguồn ảnh có giấy phép (phòng khi cần)

- **ESO** (https://www.eso.org/public/copyright/): mặc định **CC BY 4.0** cho ảnh, video, văn bản thông cáo/chú thích; credit phải hiển thị, không tách khỏi ảnh. ✅ Ảnh EHT do ESO phát hành (eso1907a M87* 2019; eso2105a M87* phân cực; eso2208 Sgr A*; eso2406a Sgr A* phân cực; eso2305a tia phản lực + bóng M87) đều có trang ESO riêng; credit thường là **"EHT Collaboration"**. ⚠️ Mở từng trang để chép đúng dòng credit.
- **EHT** (eventhorizontelescope.org): **không tìm thấy trang điều khoản riêng.** Đại diện Uỷ ban châu Âu (2019, qua Yicai) nói bản quyền thuộc EHT Collaboration, cấp phép Creative Commons Attribution. EurekAlert ghi lẫn lộn (có ảnh CC BY-NC-ND, có ảnh "Original content"). ⚠️ **An toàn nhất: tải bản ESO (CC BY 4.0), credit "EHT Collaboration (qua ESO)".**
- **NASA** (mô phỏng Schnittman 2024, ảnh Hubble tia M87, Chandra): phạm vi công cộng theo chính sách NASA, credit "NASA's Goddard Space Flight Center/J. Schnittman and B. Powell". ⚠️ Kiểm ảnh có bên thứ ba.
- **ESA/Hubble** (opo9207a, tia M87): CC BY 4.0 (https://esahubble.org/copyright/). ✅
- **ESA/Gaia** (minh hoạ Gaia BH3): thường credit "ESO/L. Calçada" (CC BY 4.0) ⚠️ kiểm.

---

## 5. Điểm chưa đối chiếu được (cần mở trang gốc trước khi đăng)

1. Câu định nghĩa trên **science.nasa.gov/universe/black-holes** hiện tại: chỉ thấy qua bản đăng lại và AMA 2019.
2. **Wheeler 1967 vs 1968**: nguồn lệch; nên dùng "phổ biến từ cuối 1967". Lần in đầu: Ann Ewing 1/1964.
3. **ISCO = 3 r_s**: chuẩn giáo trình, chưa có trích NASA/IAU.
4. **"225 M☉"** của GW231123 là khối lượng hố đen sau sáp nhập, không phải tổng hai hố đen ban đầu (~240 M☉). Đề bài ghi "tổng" là chưa chính xác.
5. **Khối lượng Sgr A***: 4,0 (EHT) / 4,26 (GRAVITY 2019–2020) / 4,30 (GRAVITY 2022). Chọn một và ghi nguồn.
6. **Chu kỳ S2** chính xác (16,0–16,05 năm), chưa thấy trong trích đoạn.
7. **Khoảng cách 3C 273** (~2,4 tỷ năm ánh sáng): chưa đối chiếu.
8. **Kết quả "phim" M87* 2026**: chưa công bố tính đến ngày tra cứu; kiểm lại.
9. **Ngày công bố M87* 2018**: thông cáo 18/1/2024, bản in *A&A* có thể là 2025.
10. **Hiện tượng quan sát viên ở xa thấy vật chậm/đỏ dần**: chỉ có nguồn phổ biến (RMG); cần một trang NASA/ESA.
11. **Giấy phép ảnh EHT** trên chính trang eventhorizontelescope.org: chưa thấy; dùng bản ESO.
12. **Nhiệt độ đĩa**: chỉ có nguồn học thuật (arXiv), chưa có câu NASA/IAU.
13. Mục IAU OAE "Accretion Disk", "AGN", "Quasar": mới có diễn giải, cần chép câu nguyên văn.
