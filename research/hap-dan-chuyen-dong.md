# Chương 3 – Lực hấp dẫn và chuyển động: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** Không mở trực tiếp trang nasa.gov/esa.int (mạng của phiên thường chặn). Mọi số liệu đối chiếu qua **trích đoạn kết quả công cụ tìm kiếm**. Phần "nguyên văn" là những gì trích đoạn hiển thị; trước khi đăng cần mở trang gốc để chép lại từng chữ.
> - ✅ **Đã đối chiếu**: con số/câu xuất hiện trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/NOAA/NIST/IERS) hoặc bài bình duyệt.
> - ⚠️ **Cần kiểm lại**: nguồn thứ cấp, chỉ thấy diễn giải chứ chưa thấy câu nguyên văn, hoặc số tự tính (có ghi công thức).
>
> **Liên quan:** phần tử quỹ đạo, bảng Standish/JPL, cách tính vị trí hành tinh đã ghi ở `research/quy-dao-kepler.md` (không lặp lại ở đây). Thông số hành tinh (NSSDCA) ở `research/thong-so-hanh-tinh.md` và `kham-pha/js/planets-data.js`.
>
> **Nguồn định nghĩa dùng nhiều lần:**
> - IAU OAE, bảng thuật ngữ astro4edu (CC BY 4.0, ghi công "IAU OAE"): https://astro4edu.org/resources/glossary/search/
> - NASA NSSDCA Earth Fact Sheet (cập nhật 15/11/2024, D. R. Williams): https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html
> - ESA "What are Lagrange points?": https://www.esa.int/Science_Exploration/Space_Science/What_are_Lagrange_points
> - NOAA Ocean Service, Tides tutorial: https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ khái niệm

**Câu hỏi lớn gợi ý:**
- "Vì sao Mặt Trăng không rơi xuống Trái Đất?" (câu chính; Newton trả lời: nó *đang* rơi, nhưng bay ngang đủ nhanh để luôn trượt qua).
- Câu phụ: "Một định luật có thể vừa làm quả táo rơi vừa giữ hành tinh trên quỹ đạo?", "Vì sao biển lên xuống hai lần một ngày?", "Có những chỗ nào trong không gian mà con tàu có thể 'đứng yên'?"

**Sợi chỉ xuyên suốt:** *Một lực duy nhất, tỉ lệ nghịch với bình phương khoảng cách.* Kepler mô tả quỹ đạo từ dữ liệu (cái gì); Newton giải thích bằng lực hấp dẫn (vì sao). Từ cùng một định luật suy ra: quỹ đạo là rơi tự do (vận tốc vũ trụ); hiệu lực hấp dẫn giữa hai đầu một vật là lực thủy triều; cân bằng giữa hấp dẫn của hai vật lớn và chuyển động quay tạo ra điểm Lagrange.

**Sơ đồ liên hệ (bản phác, để vẽ):**
```
Tycho Brahe: số liệu quan sát Sao Hỏa (trước 1601)
   ▼
KEPLER (1609, 1619): elip · diện tích quét đều · T² ∝ a³      ← MÔ TẢ
   ▼
NEWTON (Principia 1687): F = G·M·m / r²   (+ 3 định luật chuyển động)   ← GIẢI THÍCH
   │   └─ suy ra lại 3 định luật Kepler; T² = 4π²a³ / G(M+m)
   │   └─ G đo trong phòng thí nghiệm: Cavendish 1798 (cân xoắn)
   ├──► Quả đạn đại bác của Newton → QUỸ ĐẠO = RƠI TỰ DO
   │        v1 ≈ 7,9 km/s (bay vòng) · v2 ≈ 11,2 km/s (thoát) · v3 ≈ 16,7 km/s (thoát Mặt Trời)
   │        → ISS, "không trọng lượng" dù trọng lực còn ~89%
   ├──► Hấp dẫn khác nhau giữa hai phía một vật → LỰC THỦY TRIỀU (∝ 1/d³)
   │        → hai chỗ phình, triều cường/kém → khóa thủy triều → Mặt Trăng lùi xa, ngày dài ra
   │        → giới hạn Roche (vành Sao Thổ) → nung nóng thủy triều (núi lửa Io)
   └──► Bài toán ba vật (Euler, Lagrange) → 5 ĐIỂM LAGRANGE
            L1 (SOHO) · L2 (JWST, Euclid) · L4/L5 ổn định → tiểu hành tinh Troia → Lucy
```

---

## 1. Ba định luật Kepler

### (a) Định nghĩa gốc
- **Kepler's Laws** (IAU OAE, term 169): ba định luật đầu thế kỷ 17 cho thấy quỹ đạo hành tinh không tròn hoàn hảo; định luật 1: hành tinh chuyển động trên elip với Mặt Trời ở một tiêu điểm; định luật 3: bình phương chu kỳ tỉ lệ với lập phương bán trục lớn. https://astro4edu.org/resources/glossary/term/169/ ✅ (trích đoạn diễn giải, chưa có câu nguyên văn)
- NASA Goddard SVS, "Kepler's Laws of Planetary Motion Described Using Earth Satellites": *"an imaginary line drawn from a planet to the Sun swept out an equal area of space in equal times, regardless of where the planet was in its orbit"*; hành tinh *"must move more quickly when it is near the Sun, but more slowly when it is farthest from the Sun"*; elip *"with the Sun at one focus point"*. https://svs.gsfc.nasa.gov/4642 ✅
- Chưa tìm thấy trang science.nasa.gov "Orbits and Kepler's Laws" trong kết quả. ⚠️

### (b) Con số và mốc then chốt
- **Lịch sử:** Kepler phân tích số liệu Sao Hỏa của Tycho Brahe; thừa kế số liệu và chức nhà toán học hoàng gia sau khi Tycho mất năm 1601. Trang lưu trữ NASA (kepler.nasa.gov): *"Using the precise data that Tycho had collected, Kepler discovered that the orbit of Mars was an ellipse."* https://webarchive.library.unt.edu/web/20130317115651/http://kepler.nasa.gov/Mission/JohannesKepler ✅
  - *Astronomia Nova* (1609): định luật 1 và 2. *Harmonices Mundi* (1619): định luật 3. ✅ (NASA lưu trữ + nhiều nguồn)
  - **Lệch nhau:** trang NASA lưu trữ nói Kepler tìm ra định luật 1 năm **1605** (công bố 1609). Định luật 2 trong *Astronomia Nova* chưa ở dạng "diện tích" hiện đại; dạng này có trong *Epitome Astronomiae Copernicanae* (1618–1621). ⚠️ (proofwiki, thứ cấp). Thứ tự khám phá: định luật 2 có trước định luật 1. ⚠️ Kepler không gọi chúng là "định luật". ⚠️
- **Dạng Newton của định luật 3:** T² = 4π²a³ / (G(M + m)). Với hệ Mặt Trời, M ≫ m nên T²(năm) ≈ a³(AU). Newton (1687) chứng minh ba định luật Kepler là hệ quả của định luật vạn vật hấp dẫn. ⚠️ (giáo trình chuẩn; chưa có trích đoạn NASA)
- **Trái Đất** (NSSDCA Earth Fact Sheet) ✅: e = **0,0167** (chính xác hơn 0,01671022); cận nhật **147,095 triệu km**, viễn nhật **152,100 triệu km**; vận tốc quỹ đạo trung bình **29,78 km/s**, cực đại **30,29 km/s** (cận nhật), cực tiểu **29,29 km/s** (viễn nhật). ESA (sci.esa.int, trang Earth) ghi cùng số. ✅
  - Chênh lệch ~1 km/s ≈ 3,4% — chính định luật 2 trong thực tế. (tự tính: (30,29−29,29)/29,78)
- **Ngày cận nhật:** đầu tháng 1. Cận nhật 2026: **03/01/2026, ~17:16 UTC** (EarthSky; PAGASA ghi 01:16 ngày 04/01 giờ Manila = cùng thời điểm). ⚠️ (chưa thấy trang USNO). Cận nhật 2027 chưa tra được. Viễn nhật đầu tháng 7.
- **Sao Hỏa:** e ≈ **0,0934** (phần tử trung bình J2000 của Standish/JPL, xem `quy-dao-kepler.md`) — ⚠️. **Lệch nhau:** NSSDCA Mars Fact Sheet làm tròn thành 0,0935 (theo trí nhớ — chưa đối chiếu lại trong phiên); `planets-data.js` ghi 0,094. Ý quan trọng cho bài: e của Sao Hỏa lớn gấp ~5,6 lần Trái Đất, đủ để Kepler thấy quỹ đạo không tròn — vì vậy số liệu Sao Hỏa là chìa khóa.
- **Sao chổi Halley (1P):** e ≈ **0,967** (0,96658 theo bảng của Wikipedia/JPL SBDB) ⚠️; chu kỳ trung bình ~**76 năm**, dao động **~74–79 năm** (25/30 lần xuất hiện có chu kỳ 75–77 năm) ⚠️; viễn nhật ~35 AU, qua viễn nhật **09/12/2023**; cận nhật kế tiếp **28/07/2061** ⚠️ (thứ cấp; chưa có trang NASA/JPL SBDB trong kết quả).

### (c) Hiểu lầm phổ biến
1. *"Quỹ đạo hành tinh là elip rất dẹt, vì thế có mùa."* — Sai. Quỹ đạo Trái Đất gần tròn (e = 0,0167; khoảng cách chỉ đổi ~3,4%). Mùa do trục nghiêng 23,4°. Bằng chứng: Trái Đất gần Mặt Trời nhất vào đầu tháng 1 — giữa mùa đông Bắc bán cầu.
2. *"Mặt Trời nằm ở tâm elip."* — Sai; ở một **tiêu điểm**. Chính xác hơn: cả hai vật quay quanh khối tâm chung (đó là lý do có M + m trong dạng Newton).
3. *"Kepler tìm ra định luật bằng lý thuyết hấp dẫn."* — Ngược lại: Kepler rút ra từ số liệu (thực nghiệm), Newton giải thích ~70 năm sau.

### (d) Thuật ngữ
Định luật Kepler (Kepler's laws) · quỹ đạo elip (elliptical orbit) · tiêu điểm (focus) · bán trục lớn (semi-major axis) · độ lệch tâm / tâm sai (eccentricity, e) · cận nhật (perihelion) · viễn nhật (aphelion) · chu kỳ quỹ đạo (orbital period) · khối tâm (barycenter) · định luật diện tích (law of equal areas).

---

## 2. Định luật vạn vật hấp dẫn

### (a) Định nghĩa gốc
- **Gravity** (IAU OAE): có mục trong bảng thuật ngữ nhưng trích đoạn không hiện nội dung. ⚠️ Cần mở https://astro4edu.org/resources/glossary/search/ và chép.
- Phát biểu (Britannica, thứ cấp): *"the universal force of attraction acting between all matter"*. ⚠️. Dạng toán: F = G·m₁·m₂ / r².
- Chưa tìm thấy câu định nghĩa nguyên văn của NASA trong kết quả. ⚠️

### (b) Con số then chốt
- **Principia** (*Philosophiæ Naturalis Principia Mathematica*), Newton, **1687**. ✅ (nhiều nguồn; Smithsonian How Things Fly)
- **Hằng số hấp dẫn G = 6,674 30(15) × 10⁻¹¹ m³ kg⁻¹ s⁻²** (độ bất định tương đối 2,2 × 10⁻⁵).
  - **CODATA 2022 không đổi so với 2018**: bài CODATA 2022 (Mohr et al., Rev. Mod. Phys. 97, 025002 (2025); arXiv:2409.03787) ghi *không có dữ liệu đầu vào mới* cho G; vẫn dùng 16 phép đo như năm 2018. https://arxiv.org/pdf/2409.03787 ✅ (về việc không có dữ liệu mới). Bản thân con số 6,674 30(15) mới thấy trong trích đoạn thứ cấp ⚠️ — mở https://physics.nist.gov/cgi-bin/cuu/Value?bg để xác nhận.
  - G là hằng số cơ bản được biết kém chính xác nhất; các phép đo lệch nhau hơn sai số riêng của chúng (ví dụ NIST-82: 6,672 48(43) × 10⁻¹¹). ✅ (danh sách đầu vào CODATA)
- **Cavendish 1798:** "Experiments to determine the Density of the Earth", *Phil. Trans. R. Soc.* 88 (1798). Cân xoắn do John Michell thiết kế (Michell mất trước khi làm). Quả cầu chì nhỏ 0,73 kg mỗi đầu thanh. Kết quả: khối lượng riêng trung bình Trái Đất **5,48 g/cm³** (giá trị hiện đại 5,51; NSSDCA 5 513 kg/m³). Britannica, Linda Hall Library ⚠️ (thứ cấp uy tín). **Lưu ý:** Cavendish **không** tính G; G suy ra từ số liệu của ông về sau.
- **Gia tốc rơi tự do chuẩn g₀ = 9,806 65 m/s²** (định nghĩa chính xác), do Hội nghị Cân đo Quốc tế lần 3 (CGPM 1901) đặt; nay trong ISO 80000. ⚠️ (Wikipedia, AMS glossary; chưa thấy trang BIPM) — mở https://www.bipm.org/en/committees/cg/cgpm/3-1901/resolution- để chép.
- **g thực tế** trên mặt biển: từ ~**9,78 m/s²** (xích đạo) đến ~**9,83 m/s²** (cực), do Trái Đất quay và dẹt. ⚠️ (kiến thức chuẩn, chưa có trích đoạn nguồn chính thống trong phiên)
- **Mặt Trăng:** g ≈ **1,62 m/s²** (≈ 1/6 Trái Đất) — NSSDCA Moon Fact Sheet. ⚠️ chưa thấy trong trích đoạn; cần mở moonfact.html.

### (c) Hiểu lầm phổ biến
1. *"Vật nặng rơi nhanh hơn."* — Không có lực cản thì mọi vật rơi cùng gia tốc (lực tỉ lệ khối lượng, quán tính cũng tỉ lệ khối lượng).
2. *"Không gian không có trọng lực."* — Trọng lực giảm theo 1/r² nhưng không bao giờ bằng 0; chính nó giữ Mặt Trăng, hành tinh, thiên hà.
3. *"Newton bị Einstein bác bỏ."* — Thuyết tương đối rộng thay thế ở chỗ cần độ chính xác cực cao/trường mạnh; định luật Newton vẫn đủ để tính đường bay tàu vũ trụ (kể cả hỗ trợ hấp dẫn).

### (d) Thuật ngữ
Lực hấp dẫn (gravitational force, gravity) · định luật vạn vật hấp dẫn (law of universal gravitation) · hằng số hấp dẫn (gravitational constant, G) · cân xoắn (torsion balance) · gia tốc rơi tự do (free-fall acceleration, g) · gia tốc trọng trường chuẩn (standard gravity, g₀) · trọng lượng (weight) ≠ khối lượng (mass).

---

## 3. Vận tốc vũ trụ cấp 1, 2, 3

### (a) Định nghĩa gốc
- **Escape Velocity** (IAU OAE, term 105): tốc độ tối thiểu để rời trường hấp dẫn của một vật vĩnh viễn; là đại lượng vô hướng nên "escape speed" đúng hơn. Ghi số: Trái Đất **11,2 km/s**, Mặt Trăng **2,4 km/s**. https://astro4edu.org/resources/glossary/term/105/ ✅ (trích đoạn diễn giải)
- **"Vận tốc vũ trụ cấp 1/2/3"** là thuật ngữ SGK Vật lý Việt Nam (gốc tiếng Nga "космическая скорость"); tiếng Anh không có tên thông dụng tương đương cho cấp 1 — gọi là *(first) orbital velocity / circular orbital speed*, cấp 2 = *escape velocity*, cấp 3 = *solar system escape velocity*. ⚠️ (chưa đối chiếu SGK cụ thể; nên trích SGK Vật lý 10)

### (b) Con số then chốt
- **GM Trái Đất = 3,986 004 418 × 10¹⁴ m³/s²** (± 8 × 10⁵), IERS Conventions 2010, Bảng 1.1 (gốc IAG 1999). https://hpiers.obspm.fr/eop-pc/models/constants.html ✅. Lưu ý: giá trị 3,986 004 418 tương thích thang TCG; bảng hằng số thiên văn IAU có thêm giá trị TT/TDB (vd 3,986 004 391 ở một bảng) ⚠️ — chênh không đáng kể cho bài phổ biến. Poster IERS 2026 có đưa GM⊕ vào danh sách xem xét cho phiên bản Conventions kế tiếp ⚠️.
- **Tự tính** ⚠️ (R xích đạo = 6 378,1 km): v₁ = √(GM/R) = **7,91 km/s**; v₂ = √(2GM/R) = √2·v₁ = **11,18 km/s** (Wikipedia: 11,186 km/s). v₃ (thoát hệ Mặt Trời, phóng theo chiều chuyển động của Trái Đất): √((√2−1)²·29,78² + 11,18²) = **16,65 km/s** ≈ 16,7 km/s (bỏ qua quay của Trái Đất). Thực tế phóng lên quỹ đạo cần ~9,3–10 km/s delta-v do lực cản khí quyển và "mất mát trọng lực". ⚠️
- **ISS** ⚠️ (chưa thấy trang NASA trong kết quả; số thứ cấp): độ cao ~**400–420 km** (dao động ~370–430 km do giảm độ cao và nâng quỹ đạo); vận tốc ~**28 000 km/h ≈ 7,66 km/s** (NASA hay viết 17 500 mph); một vòng ~**90–93 phút**, ~15,5 vòng/ngày.
  - **Tự tính** (R trung bình 6 371 km): ở 400 km → v = 7,67 km/s, T = 92,4 phút, g/g₀ = **0,885**; ở 420 km → 7,66 km/s, 92,8 phút, 0,880. → "trọng lực còn ~90%" đúng nếu làm tròn; chính xác là **~88–89%**.
- **Quả đạn đại bác của Newton:** hình vẽ ngọn núi bắn đạn quanh Trái Đất. **Lệch nhau về xuất xứ:** nằm trong *De mundi systemate* (bản thảo phần 3 Principia, in sau khi Newton mất, 1728; bản tiếng Anh *A Treatise of the System of the World*, 1728); Smithsonian lại gắn với Principia 1687. https://howthingsfly.si.edu/media/newtons-cannon ⚠️. Ảnh trang này có trên Đĩa Vàng Voyager (ảnh số 111) ⚠️.

### (c) Hiểu lầm phổ biến
1. *"Phi hành gia trên ISS không trọng lượng vì ở đó không có trọng lực."* — Sai. Ở 400 km trọng lực còn ~88–89%. Họ "lơ lửng" vì cả trạm và người cùng **rơi tự do**: bay ngang ~7,7 km/s nên luôn rơi "trượt qua" Trái Đất. Thuật ngữ đúng: vi trọng lực (microgravity) / trạng thái không trọng lượng biểu kiến.
2. *"Phải đạt 11,2 km/s mới lên được vũ trụ / lên quỹ đạo."* — Quỹ đạo thấp chỉ cần ~7,8 km/s; 11,2 km/s là để thoát hẳn (khi không đẩy thêm). Tên lửa đẩy liên tục thì không cần đạt vận tốc thoát tức thời.
3. *"Vận tốc thoát phụ thuộc khối lượng tàu."* — Không; chỉ phụ thuộc M và khoảng cách r tới tâm.

### (d) Thuật ngữ
Vận tốc vũ trụ cấp 1 (first cosmic velocity; circular orbital velocity) · cấp 2 / vận tốc thoát (escape velocity/speed) · cấp 3 (third cosmic velocity; solar system escape velocity) · rơi tự do (free fall) · vi trọng lực (microgravity) · quỹ đạo thấp quanh Trái Đất (low Earth orbit, LEO) · tham số hấp dẫn chuẩn (standard gravitational parameter, GM).

---

## 4. Lực thủy triều

### (a) Định nghĩa gốc
- **Tide** (IAU OAE, term 360): độ mạnh và hướng của trọng lực thay đổi trên khoảng cách lớn; sự thay đổi này sinh ra lực thủy triều. https://astro4edu.org/resources/glossary/term/360/ ✅ (diễn giải)
- **Tidal Locking** (IAU OAE, term 484): lực thủy triều làm chu kỳ tự quay khớp với chu kỳ quỹ đạo; ví dụ chính: Mặt Trăng; ngoại lệ: Sao Thủy quay 3 vòng mỗi 2 vòng quỹ đạo (cộng hưởng 3:2). https://astro4edu.org/resources/glossary/term/484/ ✅
- **Roche Limit** (IAU OAE, term 420): lực thủy triều có thể kéo giãn, trường hợp cực đoan xé nát một vật; khoảng cách đó là giới hạn Roche; mặt trăng đi vào trong sẽ vỡ, tạo vành quanh hành tinh khổng lồ. https://astro4edu.org/resources/glossary/term/420/ ✅
- NOAA: *"tidal generating forces vary inversely as the cube of the distance from the tide-generating object"*. https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html ✅

### (b) Con số then chốt
- **Gia tốc thủy triều** (xấp xỉ, dọc trục): a_t ≈ 2GMr/d³ (r: bán kính vật chịu triều, d: khoảng cách). ⚠️ (công thức giáo trình)
- **Mặt Trời / Mặt Trăng:** NOAA: Mặt Trời nặng ~27 triệu lần Mặt Trăng nhưng xa ~390 lần → lực tạo triều của Mặt Trời bằng *"27/59, or about half that of the moon"* (≈ 0,46). ✅ (trang NOAA, bản lưu trữ). **Tự tính** ⚠️ với khoảng cách trung bình: (M☉/d☉³)/(M☾/d☾³) = **0,459** → Mặt Trăng mạnh hơn **~2,2 lần**. Nguồn phổ thông khác ghi "~40%" hay "hơn hai lần" — dùng 0,46 (NOAA).
- **Triều cường / triều kém** (NOAA, springtide.html) ✅: Mặt Trời–Mặt Trăng thẳng hàng (trăng non, trăng tròn) → triều cường (spring tide); vuông góc → triều kém (neap tide), *"the gravitational force of the sun partially cancels out the gravitational force of the moon"*; triều kém xảy ra ~7 ngày sau triều cường. https://oceanservice.noaa.gov/facts/springtide.html
- **Mặt Trăng lùi xa ~3,8 cm/năm** — đo bằng Lunar Laser Ranging (gương phản xạ Apollo 11, 1969). NASA GSFC (eclipse.gsfc.nasa.gov, lấy từ bản tin 1994): *"receding from Earth at a rate of about 3.8 centimeters per year"*. https://eclipse.gsfc.nasa.gov/help/ApolloLaser.html ✅. Thông cáo JPL 1994 (J. Dickey). ✅ (nguồn cũ; số vẫn được dùng hiện nay)
- **Ngày dài thêm:** Stephenson, Morrison & Hohenkerk (2016), *Proc. R. Soc. A* 472: 20160404, doi:10.1098/rspa.2016.0404 ✅:
  - Đo được (nhật thực cổ, 720 TCN – 2015): **+1,78 ± 0,03 ms/thế kỷ** (làm tròn 1,8).
  - Dự đoán chỉ do ma sát thủy triều: **+2,3 ms/thế kỷ**. Phần chênh (~−0,5) do điều chỉnh đẳng tĩnh sau băng hà (Trái Đất bớt dẹt) và lõi–manti.
  - **Lệch nhau:** phân tích cũ (1995) ra ~1,7 ms/thế kỷ; báo chí hay ghi "~2 ms/thế kỷ". → Ghi "khoảng 1,8 ms mỗi thế kỷ (đo), thủy triều riêng gây 2,3 ms".
- **Khóa thủy triều Mặt Trăng:** tự quay một vòng đúng bằng một vòng quỹ đạo (~27,3 ngày, chu kỳ sao) nên luôn quay một mặt về Trái Đất. ⚠️ (thứ cấp dẫn NASA; số 27,3 ngày có trong NSSDCA Moon Fact Sheet — chưa mở). Nhờ bình động (libration) ta thấy ~59% bề mặt ⚠️.
- **Giới hạn Roche:** d ≈ 2,44·R·(ρ_M/ρ_m)^(1/3) (vật lỏng) hoặc ~1,26 (vật rắn). Tự tính Trái Đất–Mặt Trăng ⚠️: lỏng **~18 400 km**, rắn ~9 500 km. Sky at Night (dẫn NASA) ghi **~19 900 km** ⚠️ — lệch do hệ số/mật độ dùng; Mặt Trăng (384 400 km) ở xa ngoài giới hạn. Sao Thổ: vành chính nằm trong giới hạn Roche (~117 000 km theo Sky at Night ⚠️) → vành là vô số hạt nhỏ, không thể kết thành một vệ tinh.
- **Io:** bị lực thủy triều Sao Mộc (cộng hưởng quỹ đạo với Europa, Ganymede giữ e khác 0) nhào nặn; bề mặt rắn nhô lên/hạ xuống tới ~100 m ⚠️ (Rochester lecture ghi "hundreds of meters" — cần nguồn NASA); là thiên thể có núi lửa hoạt động mạnh nhất hệ Mặt Trời ⚠️ (cần trích NASA Io page).

### (c) Hiểu lầm phổ biến
1. *"Thủy triều chỉ do Mặt Trăng kéo nước phía gần lên."* — Có **hai** chỗ phình: phía gần (nước bị kéo mạnh hơn tâm Trái Đất) và phía xa (tâm Trái Đất bị kéo mạnh hơn nước phía xa). Vì vậy đa số nơi có hai lần nước lớn mỗi ~24 giờ 50 phút.
2. *"Mặt Trời kéo Trái Đất mạnh hơn nên gây thủy triều mạnh hơn."* — Lực hút của Mặt Trời lên Trái Đất mạnh gấp ~180 lần Mặt Trăng (tự tính ⚠️), nhưng thủy triều phụ thuộc **chênh lệch** lực (∝ 1/d³), nên Mặt Trăng thắng (~2,2 lần).
3. *"Mặt Trăng không tự quay."* — Có tự quay, đúng một vòng mỗi vòng quỹ đạo. Và "mặt tối" không tối: phía xa vẫn được chiếu sáng.

### (d) Thuật ngữ
Lực thủy triều / lực tạo triều (tidal force, tide-generating force) · chỗ phình thủy triều (tidal bulge) · triều cường (spring tide) · triều kém (neap tide) · khóa thủy triều / quay đồng bộ (tidal locking, synchronous rotation) · ma sát thủy triều (tidal friction) · giới hạn Roche (Roche limit) · nung nóng thủy triều (tidal heating) · đo khoảng cách Mặt Trăng bằng laser (Lunar Laser Ranging, LLR) · bình động (libration).

---

## 5. Điểm Lagrange

### (a) Định nghĩa gốc
- NASA SVS (svs.gsfc.nasa.gov/api/14873): Lagrange points là *"positions in space where objects sent there tend to stay put"*; *"These points in space can be used by spacecraft to reduce fuel consumption needed to remain in position. Of the five Lagrange points, three are unstable and two are stable."*; *"The stable Lagrange points - labeled L4 and L5 - form the apex of two equilateral triangles that have the large masses at their vertices."* ✅
- NASA Science FAQ "What are Lagrange points?" https://science.nasa.gov/solar-system/resources/faq/what-are-lagrange-points ✅: vệ tinh bị đẩy lệch khỏi L1/L2 có xu hướng trôi đi; ở L4/L5 lực Coriolis giữ vật trên quỹ đạo quanh điểm. (Trang có thông báo NASA tạm ngừng cập nhật.)
- ESA: L2 *"located 1.5 million kilometres directly 'behind' the Earth as viewed from the Sun"*; ở L1 *"the solar wind, reaches L1 about an hour before reaching Earth. SOHO, the ESA/NASA solar watchdog is positioned there."* https://www.esa.int/Science_Exploration/Space_Science/What_are_Lagrange_points ✅
- IAU OAE: **không** tìm thấy mục riêng "Lagrangian point" trong trích đoạn. ⚠️

### (b) Con số then chốt
- **Lịch sử:** Euler tìm ba điểm thẳng hàng (L1–L3), Lagrange tìm hai điểm tam giác (L4, L5) trong *Essai sur le problème des trois corps*, **1772** (cùng năm hai ông nhận giải Viện Hàn lâm Paris). ✅ (Sicardy 2010, *Celest. Mech. Dyn. Astron.*; Britannica). **Lệch nhau về năm của Euler:** các nguồn ghi ~1750, 1760, 1763–1765, hoặc 1767 (năm in bài "De motu rectilineo trium corporum…" trong *Novi Commentarii*). ⚠️ → nên viết "Euler (thập niên 1760)".
- **Điều kiện ổn định L4/L5:** M₁/M₂ > **24,96**. NASA MAP/WMAP (lưu trữ): *"The L4 and L5 points are home to stable orbits so long as the mass ratio between the two large masses exceeds 24.96."* ✅. Gascheau (1843) chứng minh trước Routh (1875); giá trị tới hạn μ = (1 − √(23/27))/2 = 0,038 520 8 → (1−μ)/μ = **24,960** (tự kiểm ✅). Sicardy đề nghị gọi là "giá trị Gascheau". Hệ Mặt Trời–Trái Đất, Trái Đất–Mặt Trăng (~81), Mặt Trời–Sao Mộc (~1 047) đều thỏa.
- **Khoảng cách L1, L2 (Mặt Trời–Trái Đất):** r ≈ R·(m/3M)^(1/3). Tự tính ⚠️ (m gồm Trái Đất + Mặt Trăng): **~1,50 triệu km** (≈ 1% khoảng cách Trái Đất–Mặt Trời; ~4 lần khoảng cách Mặt Trăng — ESA ✅).
- **Sứ mệnh** (tình trạng tính đến 11/2026):
  - L1: **SOHO** (ESA/NASA, ở L1 từ 1996) ✅ ESA.
  - L2: **JWST** (NASA/ESA/CSA), **Euclid** (phóng 01/07/2023, tới L2 28/07/2023; quỹ đạo halo bán kính ~400 000–800 000 km — ESA ✅). **Planck**: kết thúc 23/10/2013, đã rời sang quỹ đạo quanh Mặt Trời. **Gaia**: rời L2 ngày **27/03/2025** sang quỹ đạo "nghỉ hưu" quanh Mặt Trời ⚠️ (danh sách Wikipedia; cần trang ESA). → **Không viết "Gaia đang ở L2"**. Herschel cũng đã kết thúc (2013) ⚠️.
- **Tiểu hành tinh Troia của Sao Mộc:** ở L4 (đi trước, "trại Hy Lạp") và L5 (đi sau, "trại Troia"). Số đã biết **tính đến 02/2026: 9 738 ở L4 và 5 931 ở L5 (≈ 15 670)** — Wikipedia "Jupiter trojan", dẫn MPC ⚠️ (chưa mở trang MPC trực tiếp; các bản Wikipedia cũ hơn ghi 8 799 / 4 951). → Viết "hơn 15 000 (02/2026)".
- **Lucy** (NASA): phóng **16/10/2021**, Atlas V; bay qua tiểu hành tinh vành đai chính Donaldjohanson (04/2025 ⚠️) và **7 Troia**; Troia đầu tiên **3548 Eurybates** (cùng vệ tinh Queta) ngày **12/08/2027**; kết thúc chính ~2033. ⚠️ (space.com, eoportal; chưa có trang NASA trong trích đoạn). Tổng 8 tiểu hành tinh "chính" (+ Dinkinesh 11/2023 thêm sau) ⚠️.

### (c) Hiểu lầm phổ biến
1. *"Ở điểm Lagrange lực hấp dẫn triệt tiêu, bằng không."* — Sai. Hấp dẫn của hai vật **cộng** với yêu cầu chuyển động tròn (lực hướng tâm) cân bằng trong hệ quy chiếu quay cùng; vật ở đó vẫn quay quanh Mặt Trời cùng chu kỳ với Trái Đất.
2. *"Tàu đậu yên tại đúng điểm L2."* — Tàu bay trên quỹ đạo halo/Lissajous rộng hàng trăm nghìn km quanh điểm (Euclid: 400 000–800 000 km) và phải chỉnh quỹ đạo định kỳ vì L1, L2 không ổn định.
3. *"L4/L5 ổn định vì là đáy hố thế năng."* — Thực ra là đỉnh đồi thế năng; ổn định nhờ lực Coriolis (NASA FAQ), và chỉ khi M₁/M₂ > 24,96.

### (d) Thuật ngữ
Điểm Lagrange (Lagrange point, Lagrangian point, điểm libration) · bài toán ba vật thu gọn (restricted three-body problem) · điểm thẳng hàng (collinear points, L1–L3) · điểm tam giác (triangular/equilateral points, L4, L5) · quỹ đạo halo (halo orbit) · tiểu hành tinh Troia (Trojan asteroids) · lực Coriolis (Coriolis force) · hệ quy chiếu quay (rotating frame).

---

## Điểm chưa đối chiếu được (cần làm trước khi viết/đăng)
1. Câu nguyên văn IAU OAE cho *Gravity*, *Kepler's Laws*, *Tide*, *Tidal Locking*, *Roche Limit*, *Escape Velocity* — mới có diễn giải từ trích đoạn.
2. Con số G = 6,674 30(15) × 10⁻¹¹ trên trang NIST (physics.nist.gov/cgi-bin/cuu/Value?bg); đã xác nhận CODATA 2022 không có dữ liệu mới về G.
3. g₀ = 9,806 65 — chưa thấy văn bản CGPM 1901 trên bipm.org; dải 9,78–9,83 chưa có nguồn chính thống.
4. Moon Fact Sheet NSSDCA (g = 1,62 m/s²; chu kỳ sao 27,32 ngày); Mars Fact Sheet (e = 0,0935?) — chưa mở; e Sao Hỏa trong `planets-data.js` là 0,094.
5. Số liệu ISS (độ cao, 17 500 mph, ~90 phút) chưa thấy trên trang NASA; số "~90% trọng lực" tự tính ra 88–89%.
6. Halley: e, chu kỳ, ngày cận nhật 2061 — cần JPL SBDB (ssd.jpl.nasa.gov bị chặn).
7. Năm Euler công bố điểm thẳng hàng (1762/1765/1767 — nguồn lệch).
8. Số Troia Sao Mộc theo MPC trực tiếp (minorplanetcenter.net); ngày của số liệu.
9. Lucy: ngày bay qua Donaldjohanson, Eurybates trên trang NASA; trạng thái 11/2026.
10. Gaia rời L2 (27/03/2025) — cần thông cáo ESA.
11. Xuất xứ hình "quả đạn đại bác" (Principia 1687 hay *De mundi systemate*/*Treatise* 1728).
12. Giới hạn Roche Trái Đất–Mặt Trăng (18 400 tự tính vs 19 900 "theo NASA") và Sao Thổ — cần nguồn NASA.
13. Biên độ triều thân rắn của Io và câu "núi lửa hoạt động mạnh nhất" — cần trang NASA Io.
14. Ngày cận nhật 2027 (USNO); trang NASA "Orbits and Kepler's Laws" (science.nasa.gov).

## Bổ sung khi viết thẻ (07/11/2026)
Các chi tiết dưới đây dùng trong thẻ, là kiến thức lịch sử chuẩn chưa đối chiếu nguồn trong phiên (⚠️):
- Kepler: sai lệch ~8 phút cung giữa mô hình tròn và số liệu Sao Hoả của Tycho (Astronomia Nova); Tycho quan sát ~20 năm tại Uraniborg (1576–1597).
- Apollo 15 (8/1971): David Scott thả búa và lông chim chim ưng trên Mặt Trăng, chạm đất cùng lúc (NASA NSSDCA "The Apollo 15 Hammer-Feather Drop").
- Newton – phép kiểm tra Mặt Trăng: tự tính a = 4π²·384 400 km / (27,32 ngày)² ≈ 2,72 mm/s²; 9,81/60² ≈ 2,72 mm/s².
