# Chương 4 – Không-thời gian: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** WebFetch bị chặn trong phiên này (thử `astro4edu.org` và `www.ligo.caltech.edu` → `ENOTFOUND`, tên miền ngoài danh sách mạng cho phép). Mọi dữ kiện được đối chiếu qua **trích đoạn kết quả tìm kiếm**. Câu "nguyên văn" là những gì trích đoạn hiển thị; trước khi đăng cần mở trang gốc chép lại từng chữ.
> - ✅ **Đã đối chiếu**: thấy trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/LIGO/USNO/Nobel) hoặc bài bình duyệt (tóm tắt arXiv/ADS/APS).
> - ⚠️ **Cần kiểm lại**: nguồn thứ cấp, tự tính (có công thức), nhớ từ tóm tắt bài báo mà chưa thấy lại trong trích đoạn, hoặc chưa thấy câu nguyên văn.
>
> **Hằng số dùng khi tự tính:** c = 299 792 458 m/s; GM⊕ = 3,986 × 10¹⁴ m³/s²; GM☉/c² = 1 477 m; R⊕ = 6 371 km; R☉ = 695 700 km; 1 Mpc = 3,2616 triệu năm ánh sáng.

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ

**Câu hỏi lớn gợi ý:**
- "Thời gian và không gian có phải là sân khấu cố định không?" (câu chính)
- Câu phụ: "Vì sao đồng hồ trên vệ tinh GPS phải chỉnh mỗi ngày?", "Ánh sáng có thể đi đường cong không?", "Ta có thể 'nghe' vũ trụ không?"

**Sợi chỉ xuyên suốt:** Tốc độ ánh sáng như nhau với mọi người quan sát → thời gian và không gian không tuyệt đối (tương đối hẹp, 1905). Thêm hấp dẫn → khối lượng–năng lượng làm cong không-thời gian, vật và ánh sáng đi theo đường "thẳng nhất" trong hình học cong đó (tương đối rộng, 1915). Hai hệ quả quan sát lớn: ánh sáng bị bẻ cong (thấu kính hấp dẫn) và độ cong lan truyền thành sóng (sóng hấp dẫn).

```
Hai tiên đề (1905): nguyên lý tương đối + c bất biến
   │
   ├─► GIÃN NỞ THỜI GIAN (γ) ── CO ĐỘ DÀI ── E = mc²
   │        kiểm chứng: muon (1941, 1963), Hafele–Keating (1971), đồng hồ Al⁺ (2010), GPS
   ▼
Nguyên lý tương đương (1907) + hình học Riemann
   ▼
THUYẾT TƯƠNG ĐỐI RỘNG (25/11/1915): G_μν = (8πG/c⁴) T_μν
   ├─► giãn nở thời gian hấp dẫn / dịch chuyển đỏ hấp dẫn (Pound–Rebka 1959–60, GPS +45 μs/ngày, JILA 1 mm 2022)
   ├─► tiến động cận nhật Sao Thủy 43″/thế kỷ (giải thích một bí ẩn cũ)
   ├─► ÁNH SÁNG BỊ BẺ CONG 1,75″ (1919) ──► THẤU KÍNH HẤP DẪN (mạnh / yếu / vi thấu kính)
   │                                          → vật chất tối (Euclid), ngoại hành tinh, thiên hà xa (Webb)
   ├─► kéo hệ quy chiếu, hiệu ứng trắc địa (Gravity Probe B 2011)
   └─► SÓNG HẤP DẪN (1916) ──► gián tiếp: pulsar đôi Hulse–Taylor (1974, Nobel 1993)
                               trực tiếp: GW150914 (2015, Nobel 2017) → GW170817 (thiên văn đa sứ giả)
                               → danh mục GWTC (390 ứng viên tới GWTC-5.0) → PTA nanohertz → LISA (~2035)
```

---

## 1. Thuyết tương đối hẹp và giãn nở thời gian

### (a) Định nghĩa gốc
- **Bài báo gốc:** A. Einstein, "Zur Elektrodynamik bewegter Körper", *Annalen der Physik* 17 (1905), 891–921. ⚠️ (kiến thức chuẩn, chưa mở bản gốc trong phiên này; nhận 30/6/1905).
- **Hai tiên đề** (diễn đạt chuẩn giáo trình): (1) các định luật vật lý có cùng dạng trong mọi hệ quy chiếu quán tính; (2) tốc độ ánh sáng trong chân không như nhau với mọi người quan sát quán tính, không phụ thuộc chuyển động của nguồn. ⚠️ Chưa có câu nguyên văn IAU/NASA. Nên tìm mục "Special Relativity" trên astro4edu khi mạng cho phép.
- **Hệ số Lorentz:** γ = 1/√(1 − v²/c²). Đồng hồ chuyển động đo được khoảng thời gian Δt₀ trong khi người quan sát đứng yên đo Δt = γ·Δt₀. Với v ≪ c: γ − 1 ≈ v²/(2c²).

### (b) Con số then chốt
- **Rossi & Hall 1941** – "Variation of the Rate of Decay of Mesotrons with Momentum", *Phys. Rev.* 59, 223 (1/2/1941), DOI 10.1103/PhysRev.59.223. Mesotron (nay là muon) "mềm" phân rã nhanh hơn nhóm xuyên sâu khoảng 3 lần, phù hợp giãn nở thời gian; thời gian sống riêng (2,4 ± 0,3) × 10⁻⁶ s. https://ui.adsabs.harvard.edu/abs/1941PhRv...59..223R/abstract ✅
- **Frisch & Smith 1963** – "Measurement of the Relativistic Time Dilation Using μ-Mesons", *Am. J. Phys.* 31, 342–355 (1963), DOI 10.1119/1.1969508. Đếm muon trên đỉnh núi Washington (~1 910 m) và ở mực nước biển; ~563 muon/giờ trên đỉnh; hệ số giãn nở ~8,8 ± 0,8 (bài gốc) — Wikipedia ghi ~10,2 cho v ≈ 0,995c. ⚠️ Hệ số và độ cao lệch giữa các nguồn (1 907 / 1 917 m / 6 288 ft). APS ghi thí nghiệm làm năm 1962, bài in 1963. https://www.aps.org/apsnews/2014/12/historic-sites-muon-time-dilation-experiment ✅ (sự kiện), số liệu ⚠️
- **Hafele–Keating (10/1971)**, *Science* 177 (1972). USNO (thông cáo 50 năm): dự đoán chiều đông **mất 40 ± 23 ns**, chiều tây **được 275 ± 21 ns**; đo được **mất 59 ± 10 ns** (đông) và **được 273 ± 7 ns** (tây). Chuyến đông 65,4 giờ, chuyến tây 80,3 giờ bay. https://www.dvidshub.net/news/printable/407785 ✅. Phân rã dự đoán (Wikipedia, bảng từ bài gốc): đông = +144 ns (hấp dẫn) − 184 ns (động học); tây = +179 + 96 ns. ⚠️
  - Lưu ý: kết quả gộp cả hai hiệu ứng hẹp + rộng, không phải "thuần tương đối hẹp".
- **Đồng hồ quang học Al⁺ (NIST, Chou et al. 2010)**, "Optical Clocks and Relativity", *Science* 329, 1630–1633 (24/9/2010): thấy giãn nở thời gian ở tốc độ **< 10 m/s** và chênh độ cao **33 cm** (xem mục 2). https://physicstoday.aip.org/news/time-dilation-seen-at-just-10-m-s ✅
- **GPS** – Ashby, N. (2003), "Relativity in the Global Positioning System", *Living Rev. Relativ.* 6, 1 (bản sửa 2007). https://www.maths.tcd.ie/EMIS/journals/LRG/Articles/lrr-2003-1/ ✅ (bài tồn tại); con số trong bài ⚠️ chưa thấy trong trích đoạn.
  - **Tự tính** ⚠️ (bán kính quỹ đạo r = 26 562 km, v = 3,874 km/s):
    - Hẹp: v²/(2c²) = 8,35 × 10⁻¹¹ → **−7,2 μs/ngày**.
    - Rộng: (GM⊕/c²)(1/R⊕ − 1/r) = 5,29 × 10⁻¹⁰ → **+45,7 μs/ngày**.
    - Tổng ≈ **+38,5 μs/ngày** (đồng hồ vệ tinh chạy nhanh hơn).
  - Các nguồn ghi: 7 / 45 / 38; 7,2 / 45,9 / 38,6; 7 / 46 / 38. Chênh do làm tròn và do có tính thế quay của Trái Đất trên geoid hay không. Ashby đưa độ lệch tần số đặt sẵn ở nhà máy −4,4647 × 10⁻¹⁰ (nhớ từ bài, ⚠️). **Nên viết "khoảng −7, +45, tổng +38 micro giây mỗi ngày".**
  - Hệ quả hay dùng: 38 μs × c ≈ 11 km sai số vị trí tích lũy mỗi ngày nếu không bù. ⚠️ (tự tính: 38 × 10⁻⁶ s × 3 × 10⁸ m/s = 11,4 km; con số "10 km/ngày" phổ biến nhưng là phép tính đơn giản hoá).
- **Đồng hồ nguyên tử trên ISS – ACES (ESA):** phóng thứ Hai Phục sinh 21/4/2025 bằng Falcon 9, gắn ngoài module Columbus; đồng hồ cesium lạnh PHARAO + maser hydro SHM; mục tiêu đo dịch chuyển đỏ hấp dẫn tuyệt đối, độ ổn định/chính xác ~1 × 10⁻¹⁶; hoạt động ~30 tháng. https://news.uzh.ch/en/articles/news/2025/aces-relativity-theory.html ✅ (Đại học Zürich), https://arxiv.org/pdf/2411.02912 ✅. Chưa thấy kết quả khoa học công bố (tính tới 07/11/2026). ⚠️
- **Scott Kelly:** ở ISS **340 ngày** (27/3/2015 – 1/3/2016) ⚠️ (kiến thức chung, chưa có trích đoạn NASA trong phiên).
  - **Tự tính** ⚠️ (v = 7,66 km/s, độ cao ~400 km): hẹp −3,26 × 10⁻¹⁰; rộng +0,41 × 10⁻¹⁰; ròng −2,85 × 10⁻¹⁰ × 340 ngày ≈ **−8,4 ms**. Tức trẻ hơn khoảng **8–9 phần nghìn giây** so với ở mặt đất.
  - Nguồn thứ cấp lệch nhau: 8,6 ms (342 ngày, Jeffrey Bennett https://www.jeffreybennett.com/scott-kellys-time-dilation), ~5 ms, ~1/100 s (Neil deGrasse Tyson, tweet). Space.com: https://space.com/33411-astronaut-scott-kelly-relativity-twin-brother-ages.html. **Viết "chừng 8–9 mili giây"**. Lưu ý: "chênh 6 phút" giữa hai anh em là chênh giờ sinh, không phải do tương đối.

### (c) Hiểu lầm phổ biến
1. *"Giãn nở thời gian chỉ là ảo giác/lỗi của đồng hồ."* → Sai. Mọi quá trình vật lý đều chậm lại như nhau (phân rã muon, dao động nguyên tử, sinh học). Muon thực sự đi tới mặt đất được; đồng hồ bay về thực sự chỉ giờ khác.
2. *"Chỉ có ý nghĩa gần tốc độ ánh sáng."* → Đo được ở < 10 m/s (Chou 2010) và là bắt buộc với GPS.
3. *"Người du hành thấy thời gian của mình trôi chậm."* → Mỗi người thấy đồng hồ của chính mình chạy bình thường; chậm là khi so sánh giữa các hệ quy chiếu.
4. *"Phi hành gia ISS già chậm chủ yếu do ở xa Trái Đất (hấp dẫn yếu)."* → Ở ISS hiệu ứng vận tốc (hẹp) thắng; với GPS (cao hơn, chậm hơn) hiệu ứng hấp dẫn thắng. Đây là phép so sánh rất đẹp cho bài.

### (d) Thuật ngữ
thuyết tương đối hẹp (special relativity); hệ quy chiếu quán tính (inertial frame of reference); tiên đề (postulate); giãn nở thời gian (time dilation); co độ dài / co Lorentz (length contraction); hệ số Lorentz (Lorentz factor); thời gian riêng (proper time); nghịch lý anh em sinh đôi (twin paradox); muon (muon; tên cũ "mesotron"); đồng hồ nguyên tử (atomic clock); đồng hồ quang học (optical clock).

---

## 2. Thuyết tương đối rộng (tổng quát)

### (a) Định nghĩa gốc
- **Bài báo gốc:** Einstein, "Die Feldgleichungen der Gravitation", trình bày tại Viện Hàn lâm Khoa học Phổ **25/11/1915**, in *Sitzungsberichte* 2/12/1915; trước đó là các bài 4/11, 11/11 và 18/11 (bài 18/11 tính tiến động Sao Thủy). https://en.wikisource.org/wiki/Translation:The_Field_Equations_of_Gravitation ✅, https://arxiv.org/pdf/1201.5353 ✅. Bài tổng hợp: "Die Grundlage der allgemeinen Relativitätstheorie", *Ann. Phys.* 1916 ⚠️.
  - Hilbert nộp bài với phương trình tương đương ngày 20/11/1915 — tranh luận ưu tiên. ⚠️ (nguồn thứ cấp)
- **Câu của Wheeler:** dạng phổ biến *"Spacetime tells matter how to move; matter tells spacetime how to curve."* — gán trong Wheeler & Ford, *Geons, Black Holes, and Quantum Foam* (1998), tr. 235–236 có kể bối cảnh câu này. Misner, Thorne & Wheeler, *Gravitation* (1973) có câu ý tương tự nhưng chữ khác (khoảng *"Space acts on matter, telling it how to move. In turn, matter reacts back on space, telling it how to curve."*). ⚠️ **Chưa kiểm được nguyên văn và số trang.** Nguồn lần ra: Harvey Brown, arXiv (trích trong https://arxiv.org/pdf/1803.09872). Khi trích nên ghi "theo cách diễn đạt nổi tiếng của John Wheeler" thay vì nguyên văn có ngoặc kép.
- **Phương trình trường:** G_μν + Λg_μν = (8πG/c⁴) T_μν.

### (b) Con số then chốt
- **Tiến động cận nhật Sao Thủy:** quan sát ~574″/thế kỷ (so với các sao), Newton giải thích ~531″ (nhiễu loạn hành tinh) → dư **~43″/thế kỷ**, đúng giá trị GR. https://courses.lumenlearning.com/suny-ncc-astronomy/ (OpenStax Astronomy 24.x) ✅ (giáo trình). Giá trị dư đo được hiện đại 43,1 ± 0,1″/thế kỷ (arXiv astro-ph/0501319) ✅. Tổng tiến động trong hệ toạ độ địa tâm ~5 600″/thế kỷ (gồm tuế sai điểm xuân phân) — đừng nhầm với 574. ⚠️ Chưa thấy trang NASA ghi 43″.
- **Nhật thực 29/5/1919:** dự đoán GR **1,75″** ở mép Mặt Trời (gấp đôi giá trị "nửa" 0,87″ kiểu Newton). Kết quả: Sobral **1,98″ ± 0,16″** (kính 4 inch), Príncipe (Eddington) **1,61″ ± 0,40″**; một số nguồn ghi sai số ±0,12″ và ±0,30″. Công bố 6/11/1919. https://arxiv.org/pdf/1907.10687 ✅, https://arxiv.org/pdf/1912.07674 ✅. Kính astrographic ở Sobral cho ~0,93″ và bị loại vì lỗi hội tụ — đây là chỗ hay bị tranh cãi lịch sử; phân tích lại năm 1979 (Harvey) ủng hộ quyết định loại. ⚠️
  - Tự tính ⚠️: α = 4GM☉/(c²R☉) = 4 × 1 477 / 6,957 × 10⁸ = 8,49 × 10⁻⁶ rad = **1,75″**.
- **Pound–Rebka:** tháp Jefferson Lab, Đại học Harvard, cao **22,5 m**; dùng hiệu ứng Mössbauer của ⁵⁷Fe. Bài "Apparent Weight of Photons", *PRL* 4, 337 (1/4/1960) — đề xuất/khởi đầu 1959, bài PRL 11/1959 là đề xuất. Dịch chuyển dự đoán gh/c² ≈ 2,46 × 10⁻¹⁵ (một chiều); so sánh lên-xuống 4,92 × 10⁻¹⁵; đo (5,13 ± 0,51) × 10⁻¹⁵ → khớp ~10%. https://physics.aps.org/story/v16/st1 ✅ (APS), số đo ⚠️ (bài giảng). **Viết "1959–1960".**
- **Gravity Probe B** (Everitt et al., *PRL* 106, 221101, 2011; công bố tại NASA 4/5/2011). Dữ liệu 28/8/2004 – 14/8/2005. https://arxiv.org/pdf/1105.3456 ✅
  - Trắc địa: dự đoán **−6 606,1 mas/năm**, đo **−6 601,8 ± 18,3 mas/năm** (sai số ~0,28%).
  - Kéo hệ quy chiếu: dự đoán **−39,2 mas/năm**, đo **−37,2 ± 7,2 mas/năm** (sai số ~19%; mục tiêu ban đầu 1%).
- **Đồng hồ quang học, chênh độ cao:**
  - Chou et al. 2010 (NIST, *Science* 329, 1630): nâng một đồng hồ Al⁺ **33 cm**; chênh tần số ~gh/c² ≈ 3,6 × 10⁻¹⁷ (tự tính ⚠️: 9,81 × 0,33 / c²). Các con số diễn giải kiểu "nhanh thêm bao nhiêu giây sau N năm" trên báo (PBS…) chưa rõ cách tính — **đừng dùng**; tự tính nếu cần: 3,6 × 10⁻¹⁷ × 1 năm ≈ 1,1 ns/năm ⚠️. https://physicstoday.aip.org/news/time-dilation-seen-at-just-10-m-s ✅
  - Bothwell et al. 2022 (JILA), "Resolving the gravitational redshift across a millimetre-scale atomic sample", *Nature* 602, 420–424, DOI 10.1038/s41586-021-04349-7: ~100 000 nguyên tử stronti trong mạng quang; đo gradient tần số trong **một mẫu cỡ 1 mm**; độ bất định 7,6 × 10⁻²¹. https://jila.colorado.edu/bibcite/reference/12594 ✅
  - Tự tính ⚠️: gh/c² cho h = 1 mm ≈ 1,1 × 10⁻¹⁹.

### (c) Hiểu lầm phổ biến
1. *"Mô hình tấm cao su (quả bóng bowling trên tấm vải) là bức tranh đúng."* → Nó dùng chính trọng lực (kéo xuống) để giải thích trọng lực; chỉ vẽ độ cong không gian 2 chiều, trong khi phần lớn hiệu ứng hấp dẫn thường ngày đến từ **độ cong của thời gian** (đồng hồ chạy chậm hơn gần khối lượng). Vật không "lăn xuống hố" mà đi theo đường trắc địa trong không-thời gian 4 chiều. ⚠️ (chỉ thấy thảo luận diễn đàn; nên tìm bài của nhà vật lý, ví dụ Sean Carroll, hoặc MTW "con kiến trên quả táo").
2. *"Einstein chứng minh Newton sai."* → Newton là giới hạn gần đúng tuyệt vời của GR khi trường yếu, vận tốc nhỏ; tàu vũ trụ vẫn dùng chủ yếu cơ học Newton (+ hiệu chỉnh).
3. *"Nhật thực 1919 đã chứng minh GR một cách dứt khoát."* → Độ chính xác thấp (~10–20%); thuyết phục được giới thiên văn thời đó nhưng xác nhận chính xác đến từ đo vô tuyến (VLBI) sau này. ✅ (arXiv 1912.07674: "accuracy... poor but adequate").

### (d) Thuật ngữ
thuyết tương đối rộng / thuyết tương đối tổng quát (general relativity) — dùng thống nhất một tên trong toàn web; không-thời gian (spacetime); độ cong không-thời gian (spacetime curvature); nguyên lý tương đương (equivalence principle); đường trắc địa (geodesic); phương trình trường Einstein (Einstein field equations); tiến động cận nhật (perihelion precession); dịch chuyển đỏ hấp dẫn (gravitational redshift); giãn nở thời gian hấp dẫn (gravitational time dilation); hiệu ứng trắc địa (geodetic effect); hiệu ứng kéo hệ quy chiếu (frame-dragging, Lense–Thirring); hiệu ứng Mössbauer.

---

## 3. Thấu kính hấp dẫn

### (a) Định nghĩa gốc
- **ESA/Hubble Word Bank:** *"Gravitational lensing occurs when a massive celestial body — such as a galaxy cluster — causes a sufficient curvature of spacetime for the path of light around it to be visibly bent, as if by a lens. The body causing the light to curve is accordingly called a gravitational lens."* https://esahubble.org/wordbank/gravitational-lensing/ ✅. Cùng trang: độ phóng đại *"allows us to observe objects that would otherwise be too far away and too faint to be seen."* ✅
- **IAU OAE, "Gravitational Lens" (term 134):** khối lượng bẻ cong ánh sáng đi gần nó; hiệu ứng do GR dự đoán, quan sát lần đầu trong nhật thực 1919; rõ nhất với thiên hà, đám thiên hà; tạo nhiều ảnh, độ trễ thời gian giữa các ảnh là một trong những cách tốt nhất đo hằng số Hubble. https://astro4edu.org/resources/glossary/term/134 ✅ (diễn giải, chưa có câu nguyên văn).
- **Góc lệch:** α = 4GM/(c²b) (b = tham số va chạm), gấp đôi giá trị 2GM/(c²b) tính theo Newton (hạt ánh sáng). **Bán kính góc Einstein:** θ_E = √[(4GM/c²) · D_LS/(D_L·D_S)]. ⚠️ (công thức giáo trình chuẩn, chưa trích nguồn có tên — ví dụ Schneider, Ehlers & Falco 1992).
- **Mạnh / yếu / vi thấu kính:** mạnh = nhiều ảnh, cung, vành Einstein; yếu = méo nhẹ hình dạng hàng triệu thiên hà nền, chỉ thấy qua thống kê; vi thấu kính = thấu kính là sao/hành tinh, ảnh không tách được, chỉ thấy độ sáng tăng rồi giảm. ⚠️ (định nghĩa chuẩn, chưa có nguyên văn NASA).

### (b) Con số then chốt
- **Q0957+561 ("Quasar Đôi")**: Walsh, Carswell & Weymann, *Nature* 279, 381–384 (1979), phát hiện ở Kitt Peak 3/1979; hai ảnh cách ~6″ (5,7″–6,1″ tuỳ nguồn), z quasar = 1,41, thiên hà thấu kính z ≈ 0,36. https://ned.ipac.caltech.edu/uri/NED::Refcode/1979Nat...279..381W ✅. Thấu kính hấp dẫn ngoài thiên hà đầu tiên được xác định.
- **Chữ thập Einstein (Q2237+0305, "thấu kính Huchra")**: Huchra et al. 1985, *AJ* 90, 691; quasar z = 1,695, thiên hà z = 0,0394; khoảng cách ~400 triệu năm ánh sáng (thiên hà) và ~8 tỷ năm ánh sáng (quasar) — HyperPhysics ghi 500 triệu và 10,4 tỷ (cách tính khoảng cách khác). https://hyperphysics.gsu.edu/hbase/Astro/eincros.html ⚠️ **Nên chỉ dùng độ dịch chuyển đỏ hoặc "hàng tỷ năm ánh sáng".**
- **SN Refsdal**: siêu tân tinh phát hiện 11/2014 trong ảnh Hubble của đám MACS J1149.5+2223, hiện thành 4 ảnh dạng chữ thập Einstein quanh một thiên hà của đám; các mô hình dự đoán ảnh tái xuất trong một ảnh khác của thiên hà chủ (Diego et al.: 1/11/2015 ± 25 ngày); tin tái xuất công bố **12/12/2015** (Kelly et al. 2016). https://arxiv.org/pdf/1504.05953 ✅. Lần đầu dự đoán trước việc "xuất hiện lại" của một siêu tân tinh qua thấu kính. Tên đặt theo Sjur Refsdal (đề xuất dùng độ trễ siêu tân tinh đo H0, 1964) ⚠️.
- **Webb's First Deep Field – SMACS 0723**: công bố 11/7/2022 (Nhà Trắng, giờ Mỹ), đầy đủ 12/7/2022; đám thiên hà nhìn như cách đây **4,6 tỷ năm**; trường nhìn cỡ **hạt cát cầm ở tầm tay**; tổng phơi sáng NIRCam 12,5 giờ. https://www.esa.int/ESA_Multimedia/Images/2022/07/Webb_s_first_deep_field ✅, https://esawebb.org/images/weic2209a/ ✅
- **Vi thấu kính tìm ngoại hành tinh:** một trang thứ cấp (sentinelmission.org) ghi "hơn 1 000" gán cho NASA — đáng ngờ, **không dùng**. Theo hiểu biết chung (chưa kiểm trong phiên), NASA Exoplanet Archive liệt kê cỡ vài trăm hành tinh vi thấu kính trên tổng hơn 6 000 (mốc 6 000 do NASA công bố 9/2025). ⚠️ **Cần mở https://exoplanetarchive.ipac.caltech.edu/ (mục Exoplanet Counts) lấy số chính xác, ghi ngày.** Kính Nancy Grace Roman (NASA, dự kiến phóng 2026–2027) sẽ khảo sát vi thấu kính về phía tâm Ngân Hà ⚠️ (kiểm tra ngày phóng).
- **Euclid (ESA):** phóng **1/7/2023** ✅ (APS abstract: "launched in July 2023"); bắt đầu khảo sát rộng 2/2024; dùng thấu kính hấp dẫn yếu + phân bố thiên hà để nghiên cứu vật chất tối và năng lượng tối. Q1 (19/3/2025): 63,1 độ vuông, ~30 triệu thiên thể, ~0,4% số thiên hà dự kiến. DR1 dự kiến "cuối 2026" (nguồn cũ ghi 6/2026). https://www.nasaspaceflight.com/2025/04/esa-releases-first-set-of-euclid-images-and-data/ ⚠️ (thứ cấp), https://arxiv.org/pdf/2503.15328 ✅. **DR1 đã ra chưa (tính tới 11/2026)? Chưa kiểm.**

### (c) Hiểu lầm phổ biến
1. *"Thấu kính hấp dẫn giống kính lúp, hội tụ về một tiêu điểm."* → Không có tiêu điểm duy nhất; góc lệch giảm theo 1/b (ngược với thấu kính thuỷ tinh), nên tạo cung, vành, nhiều ảnh thay vì ảnh nét.
2. *"Ánh sáng bị hút vì có khối lượng."* → Photon không có khối lượng nghỉ; ánh sáng đi theo đường trắc địa trong không-thời gian cong. Phép tính kiểu Newton chỉ cho nửa giá trị.
3. *"Các ảnh trong thấu kính là nhiều thiên thể khác nhau."* → Cùng một thiên thể, ánh sáng đi các đường khác nhau, dài khác nhau — vì thế có độ trễ (SN Refsdal).

### (d) Thuật ngữ
thấu kính hấp dẫn (gravitational lens / gravitational lensing); vật làm thấu kính (lens); nguồn nền (background source); thấu kính mạnh / yếu (strong / weak lensing); vi thấu kính hấp dẫn (gravitational microlensing); vành Einstein (Einstein ring); chữ thập Einstein (Einstein Cross); bán kính góc Einstein (Einstein radius); độ phóng đại (magnification); độ trễ thời gian (time delay); trường sâu (deep field).

---

## 4. Sóng hấp dẫn

### (a) Định nghĩa gốc
- **LIGO:** sóng hấp dẫn là *"ripples on space-time"* (bài trình bày LIGO, https://www.spy-hill.net/~myers/talks/Ripples.pdf) ⚠️ — trang chính thức "What are Gravitational Waves?" https://www.ligo.caltech.edu/page/what-are-gw **chưa mở được**; cần chép câu nguyên văn khi có mạng (câu quen thuộc: *"Gravitational waves are 'ripples' in space-time caused by some of the most violent and energetic processes in the Universe."* — chưa xác minh trong phiên).
- **Dự đoán:** Einstein, "Näherungsweise Integration der Feldgleichungen der Gravitation" (trình bày 22/6/1916); bản 1916 có lỗi, sửa trong "Über Gravitationswellen" (1918) với công thức tứ cực. https://arxiv.org/pdf/1602.04040 ✅. Einstein từng nghi ngờ sóng có thật (bài 1936 với Rosen) ⚠️.
- Truyền với tốc độ ánh sáng; GW170817 cho thấy chênh lệch tốc độ với ánh sáng < ~10⁻¹⁵ ⚠️ (Abbott et al. 2017, ApJL 848 L13; chưa thấy trích đoạn).

### (b) Con số then chốt
- **Hulse–Taylor (PSR B1913+16):** phát hiện 1974 ở Arecibo (Wikipedia ghi bài 1975); Nobel Vật lý 1993 cho Hulse & Taylor. Chu kỳ quỹ đạo giảm khớp dự đoán bức xạ sóng hấp dẫn của GR ~0,2% (Weisberg & Taylor 2005: tỉ số 0,997 ± 0,002); Weisberg & Huang 2016 (ApJ 829, 55) cập nhật. https://ar5iv.labs.arxiv.org/html/astro-ph/0407149 ✅. Lời trao giải Nobel 1993: *"for the discovery of a new type of pulsar, a discovery that has opened up new possibilities for the study of gravitation"* ⚠️ (chưa thấy trong trích đoạn).
- **GW150914** — Abbott et al., *PRL* 116, 061102 (2016). Ghi nhận **14/9/2015, 09:50:45 UTC** tại Hanford và Livingston; công bố **11/2/2016**. ✅
  - Khối lượng **36 (+5/−4) và 29 (±4) M☉** → hố đen 62 M☉; bức xạ **3,0 ± 0,5 M☉c²**; khoảng cách độ sáng **410 (+160/−180) Mpc** ≈ 1,3 tỷ năm ánh sáng (z ≈ 0,09). https://dcc.ligo.org/P1500218/public ✅
  - Tóm tắt PRL (nhớ, ⚠️): tần số quét 35 → 250 Hz, biến dạng cực đại **1,0 × 10⁻²¹**, SNR 24, độ tin > 5,1σ; Livingston nhận trước Hanford ~7 ms.
  - Cánh tay **4 km**. Biên độ 10⁻²¹ × 4 km = **4 × 10⁻¹⁸ m** (tự tính ⚠️) ≈ 1/200–1/400 đường kính proton (~0,84–1,7 fm). **Chỗ lệch:** báo chí và nhiều trang ghi "1/10 000 đường kính proton" (là **ngưỡng độ nhạy** ~10⁻¹⁹ m, không phải dịch chuyển của GW150914); video LIGO Caltech ghi "1/1000th the size of a proton" (https://www.ligo.caltech.edu/video/ligo20160211v6 ✅); điều trần Quốc hội của D. Reitze ghi "< 5/1000" đường kính proton. **Khuyến nghị:** viết "nhỏ hơn một phần nghìn đường kính proton" (đúng với LIGO Caltech) hoặc nói rõ đó là độ nhạy.
- **Nobel Vật lý 2017:** Rainer Weiss (1/2), Barry C. Barish (1/4), Kip S. Thorne (1/4) *"for decisive contributions to the LIGO detector and the observation of gravitational waves"*. https://www.nobelprize.org/prizes/physics/2017/summary/ ✅
- **GW170817:** 17/8/2017, 12:41:04 UTC, LIGO + Virgo; hai sao neutron (0,86–2,26 M☉); **GRB 170817A** do Fermi-GBM ghi **~1,7 s** sau thời điểm sáp nhập; kilonova AT 2017gfo trong thiên hà NGC 4993, tìm thấy < 11 giờ sau; khoảng cách **~40 Mpc ≈ 130 triệu năm ánh sáng** (tự quy đổi ⚠️). Nguồn: Abbott et al. 2017, ApJL 848, L12 (bản ghi https://iris.unife.it/handle/11392/2495371) ✅. Khởi đầu thiên văn đa sứ giả với sóng hấp dẫn; xác nhận kilonova tạo nguyên tố quá trình r.
- **Số sự kiện — DỮ KIỆN HAY ĐỔI (tính tới 07/11/2026):**
  - O1–O3 (GWTC-3): 90 ứng viên. ✅
  - **GWTC-4.0** (26/8/2025, O4a 24/5/2023 – 16/1/2024): +128 ứng viên mới → **218** tổng. https://ligo.org/science-summaries/O4a_catalog_omnibus/ ✅
  - **GWTC-5.0** (26/5/2026, O4b đến 28/1/2025): +161 ứng viên (đều là hố đen đôi) → **390** tổng; O4 chiếm ~75% số phát hiện. https://ligo.org/detections/o4b-catalog/ ✅, https://arxiv.org/pdf/2605.27225 ✅. Bài còn ở dạng "submitted".
  - **O4 kết thúc 18/11/2025** (19/11 giờ Nhật); ~250 ứng viên cảnh báo thời gian thực trong O4; trung tâm ICRR ghi "khoảng 300 tín hiệu đáng kể". https://www.ligo.caltech.edu/news/ligo20251118 ✅, https://gwcenter.icrr.u-tokyo.ac.jp/en/archives/2069 ✅
  - O4c chưa có danh mục (sẽ vào **GWTC-6.0**, chưa thấy ngày). Kế hoạch: một đợt quan sát ~6 tháng bắt đầu cuối hè/đầu thu 2026 ⚠️ (chưa kiểm đã bắt đầu chưa).
  - **Khuyến nghị viết:** "Tính tới 5/2026, danh mục chính thức GWTC-5.0 có 390 ứng viên; các ứng viên của phần cuối đợt O4 (O4c) vẫn đang được phân tích." Không cộng gộp tự chế với số cảnh báo thời gian thực.
- **GW250114** (14/1/2025, thuộc O4b): *PRL* tập 135, số 11 (9/2025; trích đoạn ghi ngày 12/9/2025, số bài ⚠️) — "GW250114: Testing Hawking's Area Law and the Kerr Nature of Black Holes". SNR mạng 80 (trong GWTC-5.0: 76,9, "tín hiệu rõ nhất từng ghi"); khối lượng 33,6 và 32,2 M☉; diện tích chân trời tăng từ ~240 000 km² lên ~400 000 km², ủng hộ định lý diện tích Hawking với độ tin 99,999% (lần thử 2021 là 95%); lần đầu tách được hai mode "ringdown" (mode tứ cực chính + overtone thứ nhất). https://pure.psu.edu/en/publications/gw250114-testing-hawkings-area-law-and-the-kerr-nature-of-black-h/ ✅, https://www.eurekalert.org/news-releases/1097682 ✅. Số trang bài ⚠️.
- **PTA nanohertz — NANOGrav 15 năm** (29/6/2023, ApJL 951, L8): 67 pulsar, 16,03 năm dữ liệu; **bằng chứng** (chưa phải "phát hiện" 5σ) cho tương quan Hellings–Downs ~3–4σ; biên độ 2,4 × 10⁻¹⁵ ở tần số 1/năm; phù hợp quần thể hố đen siêu nặng đôi nhưng chưa loại nguồn khác. https://arxiv.org/abs/2306.16213 ✅. Công bố cùng ngày: EPTA/InPTA, PPTA, CPTA ⚠️.
- **LISA (ESA, hợp tác NASA):** **thông qua (adoption) 25/1/2024**; ba tàu tạo tam giác cạnh **2,5 triệu km**; phóng dự kiến **2035** bằng Ariane 6. https://www.esa.int/Science_Exploration/Space_Science/Capturing_the_ripples_of_spacetime_LISA_gets_go-ahead ✅

### (c) Hiểu lầm phổ biến
1. *"Sóng hấp dẫn là sóng âm / LIGO 'nghe' được tiếng."* → Là dao động của chính không-thời gian, đi qua chân không với tốc độ ánh sáng. "Tiếng chirp" là tín hiệu được chuyển thành âm thanh vì tần số tình cờ nằm trong dải nghe được.
2. *"Sóng hấp dẫn là sóng của trọng lực kéo vật."* → Nó làm co giãn khoảng cách vuông góc với hướng truyền (một trục co, trục kia giãn), không kéo vật về phía nguồn.
3. *"LIGO đo được dịch chuyển nhỏ hơn proton nên chắc là nhiễu."* → Hai trạm cách ~3 000 km nhận cùng tín hiệu lệch ~7 ms (≤ 10 ms thời gian ánh sáng), dạng sóng khớp dự đoán GR; xác suất báo động giả < 1/203 000 năm.
4. *"NANOGrav đã phát hiện chắc chắn."* → Mới là "bằng chứng"; nguồn gốc chưa xác định.

### (d) Thuật ngữ
sóng hấp dẫn (gravitational wave) — phân biệt với sóng trọng lực (gravity wave, trong khí quyển/chất lỏng); biến dạng (strain); giao thoa kế (interferometer); hố đen đôi (binary black hole); sáp nhập (merger); pha xoắn vào – sáp nhập – dao động tắt dần (inspiral – merger – ringdown); kilonova; vụ nổ tia gamma (gamma-ray burst, GRB); thiên văn đa sứ giả (multi-messenger astronomy); mảng định thời pulsar (pulsar timing array, PTA); nền sóng hấp dẫn (gravitational-wave background); định lý diện tích Hawking (Hawking area theorem); ứng viên (candidate); tỉ số tín hiệu/nhiễu (signal-to-noise ratio).

---

## 5. Điểm chưa đối chiếu được (cần làm trước khi đăng)
1. Câu nguyên văn trên astro4edu (Gravitational Lens, General Relativity, Gravitational Wave, Special Relativity) và trang LIGO Caltech "What are GW" — WebFetch bị chặn.
2. Câu Wheeler: nguyên văn và số trang trong *Geons…* (1998) và *Gravitation* (1973).
3. Số liệu GPS trong chính bài Ashby 2003/2007 (hiện chỉ có số tự tính 7,2 / 45,7 / 38,5).
4. Hệ số giãn nở và độ cao trong Frisch & Smith 1963 (8,8 hay ~10).
5. Số Scott Kelly: không có số NASA chính thức; 8–9 ms là tự tính.
6. Trang NASA có ghi 43″/thế kỷ cho Sao Thủy (hiện chỉ có giáo trình OpenStax và arXiv).
7. Số ngoại hành tinh tìm bằng vi thấu kính (NASA Exoplanet Archive, ghi ngày) — chưa có số.
8. Euclid DR1 đã công bố chưa (tính tới 11/2026); ngày phóng Roman.
9. Tổng số ứng viên sóng hấp dẫn gộp O4c; GWTC-6.0; đợt quan sát 2026 đã bắt đầu chưa.
10. Số trang PRL của GW250114; xác nhận "SNR 76,9 – tín hiệu rõ nhất" trong GWTC-5.0 là GW250114.
11. Lời trao giải Nobel 1993 (nguyên văn) và năm phát hiện PSR B1913+16 (1974 quan sát / 1975 công bố).
12. Kết quả khoa học của ACES (chưa thấy công bố).
13. Nguồn có tên phê bình mô hình tấm cao su (hiện chỉ có diễn đàn).
