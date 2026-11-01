# Chương 5 – Đời sống của các ngôi sao: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 01/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** Trong phiên này WebFetch bị chặn (thử `science.nasa.gov` → lỗi `ENOTFOUND`, tên miền nằm ngoài danh sách mạng cho phép của phiên). Vì vậy mọi số liệu được đối chiếu qua **trích đoạn kết quả của công cụ tìm kiếm**, không mở trực tiếp trang gốc. Câu "nguyên văn" bên dưới là những gì trích đoạn hiển thị; trước khi đăng cần mở trang để chép lại chính xác từng chữ.
> - ✅ **Đã đối chiếu**: con số hoặc câu xuất hiện trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/đài quan sát) hoặc bài báo bình duyệt.
> - ⚠️ **Cần kiểm lại**: chỉ thấy ở nguồn thứ cấp, nguồn chính thống chỉ được trích gián tiếp, hoặc là số tự tính (có ghi công thức).
>
> **Nguồn định nghĩa chính dùng nhiều lần:**
> - IAU Office of Astronomy for Education (OAE), bảng thuật ngữ astro4edu: https://astro4edu.org/resources/glossary/search/ (giấy phép CC BY 4.0, ghi công "IAU OAE").
> - NASA Universe glossary: https://science.nasa.gov/universe/glossary/ và Hubble Glossary: https://science.nasa.gov/mission/hubble/multimedia/hubble-glossary/
> - NASA Science "Star Types": https://science.nasa.gov/universe/stars/types/ ; "Sun: Facts": https://science.nasa.gov/sun/facts/
> - NASA Imagine the Universe (GSFC): https://imagine.gsfc.nasa.gov/

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ khái niệm

**Câu hỏi lớn gợi ý:**
- "Một ngôi sao sống và chết như thế nào?" (câu chính)
- Câu phụ: "Vì sao khối lượng quyết định số phận của một ngôi sao?", "Nguyên tử trong cơ thể ta đến từ đâu?"

**Sợi chỉ xuyên suốt:** *Khối lượng ban đầu quyết định gần như mọi thứ*: nhiệt độ lõi, kiểu phản ứng hạt nhân, vị trí trên biểu đồ H–R, thời gian sống và xác sao để lại. Trong cả chương, **trọng lực** (ép vào) cân bằng với **áp suất** (đẩy ra). Áp suất lần lượt đến từ khí nóng, rồi suy biến electron, rồi suy biến neutron. Khi không áp suất nào thắng được, ta có hố đen.

**Sơ đồ liên hệ (bản phác, để vẽ):**
```
Đám mây phân tử (tinh vân tối, ~10 K)
   │ trọng lực > áp suất khí  (tiêu chuẩn Jeans)
   ▼
Tiền sao + đĩa bồi tụ ──(< ~0,08 M☉)──► Sao lùn nâu (không đốt H bền vững)
   │ lõi đạt ~10 triệu K → đốt H
   ▼
DÃY CHÍNH (đốt H → He: chuỗi p–p ở sao nhỏ; chu trình CNO ở sao > ~1,3 M☉)
   │ hết H ở lõi
   ├── Sao khối lượng thấp/trung bình (< ~8 M☉)
   │      → Sao khổng lồ đỏ → đốt He (ba-alpha → C, O) → AGB (quá trình s)
   │      → Tinh vân hành tinh + SAO LÙN TRẮNG (suy biến electron, ≤ ~1,4 M☉)
   └── Sao khối lượng lớn (> ~8 M☉)
          → Siêu khổng lồ → đốt tới lõi sắt → SỤP LÕI → SIÊU TÂN TINH loại II (99% năng lượng ở neutrino)
          → SAO NEUTRON / PULSAR (~8–20/25 M☉ ban đầu)   hoặc   HỐ ĐEN (lớn hơn; phụ thuộc độ kim loại)
                 │ hai sao neutron sáp nhập → KILONOVA (quá trình r: vàng, bạch kim…)
                 ▼
Vật chất giàu nguyên tố nặng trả lại môi trường liên sao → đám mây phân tử mới → sao + hành tinh + chúng ta
```
Vòng tuần hoàn khép kín: thế hệ sao sau sinh ra từ "tro" của thế hệ trước. Đây là ý "chúng ta là bụi sao" (mục 7).

---

## 1. Tinh vân và sự hình thành sao

### (a) Định nghĩa gốc
- **Nebula** (NASA Hubble Glossary): *"a cloud of gas and dust located between stars and/or surrounding stars"*. https://science.nasa.gov/mission/hubble/multimedia/hubble-glossary/ ✅ (trích đoạn)
- **Nebula** (IAU OAE): thuật ngữ được giới hạn cho các đám mây khí và bụi thuộc môi trường liên sao; các loại gồm đám mây phân tử, tinh vân hành tinh… https://astro4edu.org/resources/glossary/term/211/ ✅ (trích đoạn diễn giải, chưa có câu nguyên văn)
- **Molecular cloud** (IAU OAE, mục *Interstellar Medium*): *"some of these molecular clouds will collapse under their own gravity, leading to the formation of new stars"*. https://astro4edu.org/resources/glossary/term/450/ ✅. Mục *Molecule*: các đám mây phân tử liên sao, chủ yếu là H₂, là nơi cần có để hình thành sao mới. https://astro4edu.org/resources/glossary/term/201/
- **Protostar** (IAU OAE): *"a large mass of gas and dust formed as a result of the contraction of a giant molecular cloud in the interstellar medium"*; giai đoạn này kéo dài khoảng 10⁵–10⁷ năm, sao càng nặng hình thành càng nhanh. https://astro4edu.org/resources/glossary/term/264/ ✅
- **Brown dwarf** (NASA Universe glossary): *"substellar objects lacking the mass needed to begin the hydrogen fusion processes found in the cores of full-fledged stars"*. https://science.nasa.gov/universe/glossary/ ✅. Hubble Glossary thêm ngưỡng "< 0,08 lần khối lượng Mặt Trời". IAU OAE (https://astro4edu.org/resources/glossary/term/46/): không duy trì được phản ứng đốt hydro nhưng có đốt deuterium trong thời gian ngắn lúc còn trẻ; kích thước cỡ Sao Mộc; khối lượng ~1,2%–8% khối lượng Mặt Trời. ✅
- **Tiêu chuẩn Jeans / khối lượng Jeans** (định nghĩa kiểu giáo trình): khối lượng tới hạn mà ở đó trọng lực và áp suất khí cân bằng. Đám mây lớn hơn khối lượng này sẽ co sụp "bỏ chạy" cho tới khi có lực khác cản lại. Khí nóng hơn thì khối lượng Jeans lớn hơn; khí đặc hơn thì nhỏ hơn. ⚠️ Chưa tìm được câu nguyên văn của NASA/IAU hay giáo trình có tên. Trích đoạn chỉ đến từ Wikipedia "Jeans instability" và bài giảng WVU (https://lorenanderson.faculty.wvu.edu/files/d/d62513dd-b719-4dc0-89f4-a3350adf026a/stellar_evolution.pdf). Nên trích từ giáo trình Carroll & Ostlie, *An Introduction to Modern Astrophysics*, chương 12 (chưa kiểm được số trang).
  - Công thức (dạng giáo trình): M_J ≈ (5kT / (G μ m_H))^{3/2} · (3 / (4πρ))^{1/2}.
  - **Tự tính** ⚠️: với T = 10 K, mật độ n(H₂) = 10⁴ cm⁻³, μ = 2,33 → ρ ≈ 3,9 × 10⁻¹⁷ kg/m³ → **M_J ≈ 5 M☉**. Nghĩa là: một lõi đặc lạnh nặng cỡ vài khối lượng Mặt Trời là đủ để tự co sụp. Thứ tự độ lớn này phù hợp với số liệu sách giáo khoa; con số chính xác phụ thuộc hệ số trước công thức.

### (b) Con số then chốt
- **Khối lượng tối thiểu để đốt hydro:**
  - NASA (trang liên quan Webb, qua trích đoạn): *"If a star is less massive than roughly 8% of the Sun's mass, or 80 times the mass of Jupiter, its center is too cool to sustain hydrogen fusion."* ✅ (câu xuất hiện trong trích đoạn, nhưng không có URL NASA trực tiếp, nên cần mở lại).
  - NASA Universe glossary: sao lùn nâu nặng **13–80 lần Sao Mộc**. ✅
  - Bài tổng quan bình duyệt (Burgasser 2009, arXiv:0903.1390, "The Brown Dwarf–Exoplanet Connection"): **~0,072 M☉ (≈75 M_J) với khí có độ kim loại bằng Mặt Trời, tăng lên 0,090 M☉ với hydro tinh khiết**. ✅
  - Quan sát: Keck Observatory báo cáo một nghiên cứu khối lượng động lực học của sao lùn nâu đôi, cho ngưỡng **~70 M_J**, thấp hơn lý thuyết cũ một chút (Dupuy & Liu 2017). https://keckobservatory.org/?p=335 ⚠️ (thông cáo của đài, chưa xem bài gốc).
  - **Chỗ các nguồn lệch nhau:** 70–85 M_J (0,07–0,08 M☉). "~0,08 M☉ / ~75–80 M_J" là cách làm tròn phổ biến. Nên viết "khoảng 0,07–0,08 khối lượng Mặt Trời (~75–80 lần Sao Mộc), tuỳ thành phần hoá học".
- **Nhiệt độ lõi để đốt H:** ~10 triệu K (glossary astro4edu, term 525: tiền sao < 0,08 M☉ không bao giờ đạt 10 triệu K). ✅
- **Tinh vân Orion (M42):**
  - ESA (trang ảnh "The Orion Nebula also known as M42", 2018): *"M42 is located at a distance of 1,344 ± 20 light years"*. https://www.esa.int/ESA_Multimedia/Images/2018/05/The_Orion_Nebula_also_known_as_M42 ✅
  - 1 344 năm ánh sáng ≈ 412 pc (tự quy đổi: 412,1 pc × 3,2616 = 1 344 nm.a.s.) ⚠️. Con số này có lẽ lấy từ phép đo thị sai VLBA (Reid et al. 2009, 412 ± 6 pc; mình chưa kiểm được trực tiếp).
  - Menten et al. 2007 (A&A 474, 515; arXiv:0709.0485): **414 ± 7 pc ≈ 1 350 năm ánh sáng** (VLBA). ✅
  - Các phép đo khác lệch nhau: Kounkel et al. 2017 (VLBA) 388 ± 5 pc; Kounkel et al. 2018 (Gaia DR2) 386 ± 3 pc; một phân tích Gaia DR3 393 ± 13 pc. https://arxiv.org/pdf/1711.03815 ✅. **Tóm lại: ~1 270–1 350 năm ánh sáng tuỳ phép đo.** Dùng 1 344 (ESA) là hợp lý, nhưng nên ghi "khoảng 1 300–1 350 năm ánh sáng".
  - Đây là vùng sinh sao khối lượng lớn gần Trái Đất nhất (ESA, cùng trang). ✅
- **"Cột trụ Sáng tạo" (Pillars of Creation), Tinh vân Đại Bàng M16:**
  - NASA/STScI (ảnh Webb, 10/2022): *"a small region within the Eagle Nebula, a vast star-forming region 6,500 light-years from Earth"*. https://www.stsci.edu/contents/media/images/2022/052/01GF44EV0PPW2BHJS9HMA1AGEK ✅. ESA/Webb cũng ghi "Distance: 6500 light years" (https://esawebb.org/images/pillarsofcreation_composite/). ✅
  - Trường nhìn của ảnh NIRCam Webb rộng khoảng 8 năm ánh sáng (STScI, trang Compass Image). ✅
  - Lệch nhau: Wikipedia ghi ~5 700 năm ánh sáng; một số nguồn ghi ~7 000. ⚠️ **Dùng 6 500 năm ánh sáng (NASA/ESA).**
  - Ảnh Hubble gốc chụp năm 1995, công bố tháng 11/1995; Hubble chụp lại năm 2014; Webb năm 2022. ⚠️ (kiến thức chung, chưa đối chiếu trong phiên này).

### (c) Hiểu lầm phổ biến
1. **"Tinh vân nào cũng là nơi sao ra đời."** Sai. Tinh vân hành tinh và tàn tích siêu tân tinh (như Tinh vân Con Cua) là nơi sao *chết*. Sao chỉ sinh ra trong đám mây phân tử lạnh và đặc (IAU OAE liệt kê cả hai loại dưới mục *Nebula*).
2. **"Sao lùn nâu là sao thất bại nên hoàn toàn không có phản ứng hạt nhân."** Không đúng hẳn. Sao lùn nâu đủ nặng (> ~13 M_J) có đốt deuterium trong thời gian ngắn (IAU OAE). Chúng cũng không có màu nâu mà đỏ sẫm.
3. **"Sao hình thành riêng lẻ."** Phần lớn sao hình thành theo nhóm hoặc cụm, vì đám mây phân tử vỡ thành nhiều lõi khi co sụp (NASA Genesis factsheet về tiền sao: https://solarsystem.nasa.gov/genesismission/educate/kitchen/resource/factsheets/Protostars.pdf ✅).

### (d) Thuật ngữ tiếng Việt
tinh vân (nebula); đám mây phân tử (molecular cloud); môi trường liên sao (interstellar medium); co sụp/suy sụp hấp dẫn (gravitational collapse); khối lượng Jeans / tiêu chuẩn Jeans; tiền sao (protostar); đĩa bồi tụ (accretion disk); sao lùn nâu (brown dwarf); Tinh vân Orion / Tinh vân Lạp Hộ (M42); Tinh vân Đại Bàng (M16), "Cột trụ Sáng tạo". ⚠️ Các thuật ngữ theo cách dùng phổ biến trong sách giáo khoa và báo chí tiếng Việt; chưa đối chiếu với từ điển thuật ngữ chính thức.

---

## 2. Phản ứng tổng hợp hạt nhân trong sao

### (a) Định nghĩa gốc
- **Nuclear fusion** (IAU OAE): sự kết hợp các hạt nhân nhẹ thành một hạt nhân nặng hơn; là nguồn năng lượng của các sao như Mặt Trời và là nguồn gốc của gần như mọi nguyên tố nặng hơn trong vũ trụ. https://astro4edu.org/resources/glossary/term/221/ ✅ (diễn giải từ trích đoạn; cần chép lại nguyên văn).
- **Proton–proton chain** (giáo trình, Case Western ASTR 221: https://burro.case.edu/Academics/Astr221/StarPhys/ppchain.html): kết quả thực là *"4 protons are converted to a helium nucleus, energy (carried by gamma rays) and some very light particles (neutrinos)"*. ✅ Bước đầu (p + p → deuterium) cần tương tác yếu biến proton thành neutron nên xảy ra rất hiếm, và *"this step controls the rate of fusion in the sun"*. ✅
- **Triple-alpha process** (Etymological Dictionary of Astronomy and Astrophysics, Đài thiên văn Paris: https://dictionary.obspm.fr/terms/triple-alpha-process/): *"A chain of nuclear fusion reactions by which three helium nuclei (alpha particles) are transformed into carbon."* ✅ Hai hạt alpha tạo beryllium-8 (rất không bền), hạt nhân này bắt thêm hạt alpha thứ ba để thành carbon-12. Cần nhiệt độ lõi khoảng **~100 triệu K** (HyperPhysics GSU: https://hyperphysics.gsu.edu/hbase/Astro/helfus.html ✅). Ở sao nhỏ (~0,8–2 M☉), helium bắt cháy đột ngột ("chớp helium", helium flash). ⚠️ (Wikipedia).

### (b) Con số then chốt
- **Độ trưng Mặt Trời (danh định IAU 2015 Nghị quyết B3):** **L☉ᴺ = 3,828 × 10²⁶ W** (giá trị chính xác theo định nghĩa, dùng làm hệ số quy đổi). Ước tính tốt nhất hiện tại là (3,8275 ± 0,0014) × 10²⁶ W. Nghị quyết được thông qua ngày 13/8/2015 tại Honolulu. Nguồn: https://www.iau.org/common/Uploaded%20files/IAUGA2015-Resolution-B3-recommended-nominal-conversion.pdf ; Prša et al. 2016, AJ 152, 41 (arXiv:1605.09788). ✅
  - Lưu ý: đây là **giá trị danh định**, tức hệ số quy đổi, *không phải* "độ trưng thật" (nghị quyết nói rõ điều này).
- **Nhiệt độ lõi Mặt Trời:**
  - NASA "Sun: Facts": *"The temperature in the Sun's core is about 27 million degrees Fahrenheit (15 million degrees Celsius) – hot enough to sustain nuclear fusion."* https://science.nasa.gov/sun/facts/ ✅
  - NASA NSSDC Sun Fact Sheet (giá trị mô hình): nhiệt độ tâm **1,571 × 10⁷ K**, mật độ tâm 1,622 × 10⁵ kg/m³ (~162 g/cm³), áp suất tâm 2,477 × 10¹¹ bar. https://nssdc.gsfc.nasa.gov/planetary/factsheet/sunfact.html ✅ (thấy qua bản sao RadioJove-GSFC; trích đoạn của trang NSSDC chính không hiện con số này).
  - Nhật chấn học (helioseismology): Antia & Chitre 1994: (15,7 ± 0,4) × 10⁶ K. ✅
  - → **"~15 triệu °C" (NASA, làm tròn) và "15,7 triệu K" (mô hình) đều đúng.** Ở nhiệt độ này, chênh lệch giữa K và °C (273) không đáng kể.
- **Khối lượng chuyển thành năng lượng:**
  - **Tự tính** ⚠️: Δm/Δt = L/c² = 3,828 × 10²⁶ W ÷ (2,998 × 10⁸ m/s)² = **4,26 × 10⁹ kg/s ≈ 4,3 triệu tấn mỗi giây**.
  - NASA Cosmicopia (https://cosmicopia.gsfc.nasa.gov/qa_sun.html) dùng 3,8 × 10²⁶ W và ra "~4 triệu tấn/giây" (trang ghi 4,4 × 10⁹ kg/s, phép chia hơi sai; đúng ra là ~4,2 × 10⁹). ✅ con số làm tròn.
  - ESA (Education, "Stellar Radiation & Stellar Types"): *"600 million tons of hydrogen are converted into 596 million tons of helium every second"*, 4 triệu tấn còn lại thành năng lượng. https://sci.esa.int/web/education/-/35774-stellar-radiation-stellar-types ✅
- **Lượng hydro đốt mỗi giây: các nguồn lệch nhau**
  - ESA: ~600 triệu tấn H → 596 triệu tấn He. ✅
  - How It Works, Futurism…: ~620 triệu tấn. ⚠️ (thứ cấp)
  - StarDate: ~650 triệu tấn; Stanford Solar Center (https://solar-center.stanford.edu/): ~700 triệu tấn (dùng hiệu suất làm tròn 0,7%). ⚠️
  - **Tự tính** ⚠️: hiệu suất khối lượng của 4 ¹H → ⁴He: (4 × 1,007825 − 4,002602)/(4 × 1,007825) = 0,71%. Suy ra lượng H tiêu thụ ≈ 4,26 × 10⁹ / 0,00712 ≈ **5,98 × 10¹¹ kg/s ≈ 600 triệu tấn/s**. Nếu tính thêm ~2% năng lượng bị neutrino mang đi (không nằm trong L bức xạ) thì ra ~610–620 triệu tấn/s.
  - → **Nên viết: "khoảng 600 triệu tấn hydro mỗi giây" (theo ESA), kèm chú thích các nguồn nêu 600–700 triệu tấn.**
- **Tỉ phần chuỗi p–p và CNO trong Mặt Trời:** khoảng **99% năng lượng từ chuỗi p–p, ~1% từ CNO** (trang NASA/Genesis qua trích đoạn ✅; Borexino cũng nêu ~1%).
  - **Borexino** (Nature 587, 577–582, 25/11/2020, doi:10.1038/s41586-020-2934-0): lần đầu phát hiện trực tiếp neutrino từ chu trình CNO của Mặt Trời. ✅
- **Ngưỡng CNO trội: ~1,3 M☉.** Bài tổng quan arXiv "Science of Nuclear Fusion" (https://arxiv.org/pdf/2609.01366) nêu chu trình CNO thành nguồn chính ở các sao dãy chính trên ~1,3 M☉ do phụ thuộc nhiệt độ rất mạnh. ⚠️ (bài preprint, chưa rõ đã bình duyệt). Wikipedia "CNO cycle": CNO tự duy trì từ ~15 × 10⁶ K và trội ở **~17 × 10⁶ K**; chỉ ~1,7% ⁴He trong Mặt Trời sinh ra từ CNO. ⚠️ Các nguồn khác ghi "1,3–1,5 M☉". Đây là ngưỡng mờ, không phải mốc cứng.
- **Thời gian năng lượng thoát khỏi Mặt Trời: các ước tính lệch nhau rất nhiều**
  - NASA "Sun: Facts": bức xạ *"bounces around the radiative zone, taking about 170,000 years to get from the core to the top of the convection zone"*. ✅
  - NASA Heliophysics Vocabulary: *"the Sun's energy takes about 150,000 years to work its way through"* (vùng bức xạ). https://science.nasa.gov/heliophysics/resources/vocabulary/ ✅
  - Bài gốc của con số 170 000 năm: **Mitalas & Sills 1992, ApJ 401, 759**, "On the Photon Diffusion Time Scale for the Sun". Quãng đường tự do trung bình ~0,09 cm cho **~170 000 năm**; các ước tính cũ (3 000–30 000 năm) ngắn hơn khoảng 10 lần vì giả định bước đi 0,5–1 cm. https://ui.adsabs.harvard.edu/abs/1992ApJ...401..759M/abstract ✅
  - Các nguồn phổ thông khác nêu từ ~10 000 đến ~1 triệu năm tuỳ mô hình. ⚠️
  - Nếu đi thẳng không va chạm: ~2,3 giây từ lõi ra bề mặt (R☉/c ≈ 6,96 × 10⁸/3 × 10⁸ ≈ 2,3 s, tự tính ⚠️).
  - **Lưu ý diễn đạt:** "photon mất 170 000 năm" chỉ là cách nói gọn. Thực ra photon bị hấp thụ rồi phát lại vô số lần, nên đây là thời gian khuếch tán của *năng lượng*, không phải tuổi của một photon cụ thể.

### (c) Hiểu lầm phổ biến
1. **"Mặt Trời là quả cầu lửa, đang cháy."** Không phải cháy hoá học (không cần oxy). Đây là phản ứng tổng hợp hạt nhân ở lõi.
2. **"Phản ứng xảy ra khắp Mặt Trời."** Chỉ xảy ra ở lõi (khoảng 1/4 bán kính trong cùng). Bề mặt chỉ ~5 500 °C (NASA).
3. **"Phản ứng tổng hợp dễ xảy ra vì lõi rất nóng."** Thật ra ở 15 triệu K, proton vẫn chưa đủ năng lượng để vượt hàng rào Coulomb theo vật lý cổ điển. Phản ứng xảy ra nhờ **hiệu ứng đường hầm lượng tử**, và bước đầu của chuỗi p–p cực kỳ chậm. Nhờ vậy Mặt Trời sống được khoảng 10 tỷ năm.
4. **"Ánh sáng ta thấy hôm nay vừa sinh ra ở lõi 8 phút trước."** Chỉ 8 phút là quãng bay từ bề mặt Mặt Trời tới Trái Đất. Năng lượng đã mất hàng chục đến hàng trăm nghìn năm để ra tới bề mặt.

### (d) Thuật ngữ tiếng Việt
phản ứng tổng hợp hạt nhân / phản ứng nhiệt hạch (nuclear fusion); chuỗi proton–proton (pp chain); chu trình CNO / chu trình carbon–nitơ–oxy (CNO cycle); quá trình ba-alpha / ba hạt alpha (triple-alpha process); chớp helium (helium flash); độ trưng (luminosity); vùng bức xạ, vùng đối lưu (radiative/convective zone); neutrino. ⚠️ (chưa đối chiếu với từ điển chính thức)

---

## 3. Biểu đồ Hertzsprung–Russell (H–R)

### (a) Định nghĩa gốc
- **IAU OAE**, "Hertzsprung–Russell (HR) Diagram" (https://astro4edu.org/resources/glossary/term/143/): biểu đồ của hai đại lượng quan sát được của sao. Trục tung là độ trưng; trục hoành là nhiệt độ hiệu dụng hoặc loại quang phổ. Nếu dùng nhiệt độ thì trục là thang logarit, **giảm dần từ trái sang phải**. Tên gọi theo Ejnar Hertzsprung và Henry Norris Russell, những người đã lập các phiên bản đầu. Một đường cong trên biểu đồ có thể biểu diễn quá trình tiến hoá của sao. ✅ (diễn giải từ trích đoạn; cần chép nguyên văn). IAU OAE có sẵn sơ đồ H–R tải được: https://astro4edu.org/media/diagrams/pdf/diagrama_hr_es.pdf (bản tiếng Tây Ban Nha; có bản tiếng Pháp và có thể có tiếng Anh).
- **Main sequence** (IAU OAE, https://astro4edu.org/resources/glossary/term/186/): dải sao trên biểu đồ H–R, nơi sao ở giai đoạn đốt hydro chính; *sao như Mặt Trời ở trên dãy chính khoảng mười tỷ năm*. ✅. OpenStax *Astronomy* (key terms): dải chứa phần lớn các sao, chạy chéo từ trên-trái xuống dưới-phải. https://openstax.org/books/astronomy/pages/18-key-terms ✅
- Sao lùn trắng nằm **phía dưới bên trái** dải dãy chính: chúng nóng nhưng nhỏ nên mờ (IAU OAE). ✅

### (b) Con số then chốt
- **Lịch sử:** Hertzsprung (1911) và Russell (1913) độc lập với nhau. ✅ (Wikipedia + ESA ghi tên). ⚠️ **Có tranh cãi:** một nguồn giảng dạy của Đức (Spektrum, "WIS 2015") cho rằng Hertzsprung chưa bao giờ vẽ dạng *biểu đồ* quan hệ loại quang phổ và cấp sao; Russell là người trình bày biểu đồ năm 1913. Hertzsprung (1911) công bố quan hệ đó dưới dạng bảng/đồ thị cho các cụm sao (Pleiades, Hyades). Nên viết "Hertzsprung (1911) và Russell (1913) độc lập phát hiện quan hệ…".
- **Gaia:** ESA công bố biểu đồ H–R từ Gaia DR2 (4/2018) với **hơn 4 triệu sao** trong vòng 5 000 năm ánh sáng, gồm **hơn 35 000 sao lùn trắng**. https://www.esa.int/ESA_Multimedia/Images/2018/04/Gaia_s_Hertzsprung-Russell_diagram ✅. Ảnh này rất tốt để minh hoạ.
- **Mặt Trời trên biểu đồ:**
  - Loại quang phổ **G2V**. ⚠️ (chỉ thấy ở nguồn thứ cấp; là phân loại chuẩn).
  - Nhiệt độ hiệu dụng danh định **T_eff☉ᴺ = 5 772 K** (IAU 2015 B3; ước tính tốt nhất 5 772,0 ± 0,8 K, suy từ định luật Stefan–Boltzmann với L và R tốt nhất). ✅. Bán kính danh định R☉ᴺ = 6,957 × 10⁸ m. ✅
  - NASA làm tròn bề mặt ~5 500 °C (10 000 °F). ✅ (5 772 K ≈ 5 499 °C, khớp).
  - **Tuổi:** NASA "Sun: Facts": *"The Sun formed about 4.6 billion years ago in a giant, spinning cloud of gas and dust called the solar nebula."* ✅
- **Thứ tự loại quang phổ:** O B A F G K M, từ nóng nhất đến lạnh nhất (trái → phải trên biểu đồ). ⚠️ (kiến thức chuẩn, chưa trích nguồn trong phiên).
- **Quan hệ khối lượng–độ trưng và thời gian sống (để vẽ minh hoạ):**
  - **L ∝ M^3,5** (xấp xỉ; Cambridge lecture notes: *"Very approximately the M-L relation shows that L α M^3.5"*, https://people.ast.cam.ac.uk/~phewett/SandES2017/Lec2017_05.pdf ✅). Theo Wikipedia, số mũ 3,5 chỉ đúng khoảng **2 < M < 55 M☉**. Sao nhỏ (< 0,43 M☉) có L ∝ M^~2,3; sao rất lớn có L ∝ M (giới hạn Eddington). UNLV (https://www.physics.unlv.edu/~jeffery/astro/star/diagram/mass_luminosity.html) cho biết luật này vỡ ở trên ~50 M☉. ⚠️ cho các số mũ phụ.
  - **t ∝ M/L ∝ M^−2,5**, với t☉ ≈ 10 tỷ năm (JILA/Colorado ASTR 1120: https://jila.colorado.edu/~ajsh/courses/astr1120_03/text/chapter5/l5S2.htm ✅). Ví dụ: sao 10 M☉ sống ~1/300 so với Mặt Trời, tức **~30 triệu năm**. ✅
  - NASA: *"Our sun will spend about 10 billion years on the main sequence."* (Imagine the Universe, https://imagine.gsfc.nasa.gov/science/objects/stars1.html ✅). Mặt Trời thành sao khổng lồ đỏ sau khoảng 5 tỷ năm nữa; khoảng 1 tỷ năm ở giai đoạn khổng lồ đỏ; thành sao lùn trắng sau khoảng 10 tỷ năm nữa (NASA "Stars in an Exoplanet World", https://science.nasa.gov/exoplanets/stars/ ; NASA "Star Types"). ✅
  - **Bảng tự tính (công thức lý tưởng L = M^3,5; t = 10 tỷ năm × M^−2,5)** ⚠️, chỉ dùng làm minh hoạ định tính:

    | M (M☉) | L (L☉) theo M^3,5 | t dãy chính theo M^−2,5 | Ghi chú thực tế |
    |---|---|---|---|
    | 0,1 | 0,0003 | ~3 nghìn tỷ năm | Thực tế L ~ 0,001; dài hơn tuổi vũ trụ rất nhiều, chưa sao nào kết thúc |
    | 0,5 | 0,09 | ~57 tỷ năm | |
    | 1 | 1 | 10 tỷ năm | Mặt Trời, đang ở ~4,6 tỷ năm |
    | 2 | 11 | ~1,8 tỷ năm | |
    | 5 | 280 | ~180 triệu năm | |
    | 10 | 3 200 | ~32 triệu năm | |
    | 20 | 36 000 | ~5,6 triệu năm | |
    | 50 | 880 000 | ~0,6 triệu năm (công thức) | **Công thức sai ở đây:** thực tế sao rất nặng sống ~3–5 triệu năm vì L chỉ ∝ M |
  - **Khuyến nghị khi vẽ:** dùng trục log. Với M > ~20–50 M☉, ghi "thời gian sống ~ vài triệu năm" thay vì dùng công thức.
- **Dải khối lượng sao:** từ **~0,07–0,08 M☉** (mục 1) đến **~150 M☉** (giới hạn "chuẩn" của Figer 2005, dựa trên cụm Arches) ✅ (theo Crowther et al. 2010, arXiv:1007.3284). **Các nguồn lệch nhau:** Crowther et al. 2010 đề xuất R136a1 (Tinh vân Tarantula, Đám Mây Magellan Lớn) có khối lượng ban đầu ~300 M☉. Năm 2022, quan sát Gemini South hạ khối lượng hiện tại của R136a1 xuống **~196 M☉** (khoảng 170–230 M☉). ✅ (qua thông cáo). → Nên viết: "từ khoảng 0,08 đến khoảng 150–200 khối lượng Mặt Trời; giới hạn trên chưa chắc chắn".
- **Mốc khối lượng quyết định kết cục (khối lượng BAN ĐẦU, xấp xỉ):**
  - **< ~8 M☉ → sao lùn trắng.** IAU OAE (*White Dwarf*, https://www.astro4edu.org/resources/glossary/term/386/): sao tới khoảng 8 M☉ được dự đoán kết thúc thành sao lùn trắng. ✅. Heger et al. 2003 (ApJ 591, 288) dùng mốc ~9 M☉ ✅. Sai số ~±1 M☉, phụ thuộc quay và độ kim loại.
  - **~8 đến ~20 (hoặc 25) M☉ → sao neutron.** NASA "Star Types": sao neutron hình thành từ sao *"between about eight and 20 times the Sun's mass"*; sao nặng hơn tạo hố đen khối lượng sao. https://science.nasa.gov/universe/stars/types/ ✅
  - **Lớn hơn → hố đen.** Heger et al. 2003 (https://arxiv.org/abs/astro-ph/0212469 ✅): kết cục phụ thuộc chủ yếu vào khối lượng lõi He và lớp vỏ H lúc chết, tức phụ thuộc gió sao và **độ kim loại**. Hố đen do vật chất rơi ngược (fallback) hình thành khi lõi He ≳ 8 M☉ (sao dãy chính ≳ 25 M☉); hố đen hình thành trực tiếp khi lõi He > 15 M☉. Ở độ kim loại cao, gió sao mạnh làm sao mất khối lượng nên có thể để lại sao neutron dù khối lượng ban đầu lớn. Các nghiên cứu mới hơn còn cho thấy "đảo" sao neutron và hố đen xen kẽ, không phải mốc gọn. ⚠️ (chưa trích).
  - → **Ghi rõ trên hình minh hoạ: "xấp xỉ; phụ thuộc độ kim loại, sự quay và sao đôi".**

### (c) Hiểu lầm phổ biến
1. **"Biểu đồ H–R cho thấy đường đi của một ngôi sao trên dãy chính (sao trượt dọc dãy chính khi già đi)."** Sai. Mỗi sao ở gần như *cố định* một điểm trên dãy chính suốt giai đoạn đốt H; vị trí do **khối lượng** quyết định. Dãy chính là dãy của các sao *có khối lượng khác nhau*, không phải đường tiến hoá.
2. **"Trục nhiệt độ tăng sang phải."** Ngược lại: nóng ở bên trái (theo quy ước lịch sử).
3. **"Sao càng nặng thì sống càng lâu vì có nhiều nhiên liệu."** Ngược lại: sao nặng đốt nhiên liệu nhanh hơn nhiều (L ∝ M^3,5), nên sống ngắn hơn rất nhiều.
4. **"Mặt Trời là sao vàng."** Ánh sáng Mặt Trời thực chất trắng; "sao lùn vàng" chỉ là cách gọi không chính thức.

### (d) Thuật ngữ tiếng Việt
biểu đồ Hertzsprung–Russell (biểu đồ H–R); dãy chính (main sequence); sao khổng lồ (đỏ), sao siêu khổng lồ; sao lùn trắng; loại quang phổ (spectral type); nhiệt độ hiệu dụng (effective temperature); độ trưng; quan hệ khối lượng–độ trưng; độ kim loại (metallicity: trong thiên văn "kim loại" là mọi nguyên tố nặng hơn He). ⚠️

---

## 4. Sao lùn trắng

### (a) Định nghĩa gốc
- **NASA Hubble Glossary:** sao lùn trắng là tàn dư nóng và đặc của một ngôi sao khối lượng thấp đã cạn nhiên liệu nhiệt hạch, thường có kích thước cỡ Trái Đất. ✅ (diễn giải; cần chép nguyên văn từ https://science.nasa.gov/mission/hubble/multimedia/hubble-glossary/)
- **NASA Universe Glossary:** sao lùn trắng có *"a theoretical maximum mass of about 1.4 solar masses"*; vượt quá thì phải co sụp thành sao neutron. ✅
- **IAU OAE** (https://www.astro4edu.org/resources/glossary/term/386/): *"a typical white dwarf could have the mass of the Sun squeezed into a ball slightly larger than the size of the Earth"*; được chống đỡ bởi áp suất suy biến electron; không còn sinh năng lượng từ phản ứng hạt nhân ở lõi. ✅
- **NASA "Star Types":** *"A white dwarf is usually Earth-size but hundreds of thousands of times more massive. A teaspoon of its material would weigh more than a pickup truck."* ✅. Sao lùn trắng không tự sinh nhiệt mới, nguội dần qua hàng tỷ năm. ✅
- **OpenStax** (qua bản sao Pressbooks): *"a low-mass star that has used up most or all of its nuclear fuel and collapsed to a very small size"*. ⚠️ (bản sao, cần đối chiếu https://openstax.org/books/astronomy-2e)

### (b) Con số then chốt
- **Giới hạn Chandrasekhar ≈ 1,4 M☉ (chính xác hơn ~1,44 M☉)** cho sao lùn trắng C–O không quay. Chandrasekhar tính ra năm 1930 (Britannica: https://www.britannica.com/topic/Chandrasekhar-limit ✅); công trình đầy đủ 1931–1935. Chandrasekhar nhận **Nobel Vật lý 1983** (cùng William A. Fowler). ✅ qua từ điển Đài Paris; nên kiểm trên nobelprize.org ⚠️. Giá trị cụ thể phụ thuộc thành phần (tỉ số electron/nucleon).
- **Sirius B** (sao lùn trắng gần nhất trong hệ sáng nhất bầu trời đêm):
  - **Khối lượng động lực học 1,018 ± 0,011 M☉** (Bond et al. 2017, ApJ 840, 70; arXiv:1703.10625). ✅
  - Joyce et al. 2018 (MNRAS; arXiv:1809.01240), dùng dịch chuyển đỏ hấp dẫn: **1,017 ± 0,025 M☉**, dịch chuyển đỏ 80,65 ± 0,77 km/s. ✅
  - ESA/Hubble 2005 (heic0516): đường kính **~12 000 km**, nhỏ hơn Trái Đất; khối lượng ~98% Mặt Trời (giá trị cũ). https://www.esa.int/Science_Exploration/Space_Science/Weighing_the_Dog_Star_s_companion ✅
  - **Bán kính ~0,0084 R☉:** ⚠️ CHƯA ĐỐI CHIẾU ĐƯỢC. Con số 0,0084 có trong infobox Wikipedia (gốc có lẽ từ Holberg et al. 1998). Trích đoạn bài Bond 2017 không hiện bán kính; các phân tích HST mới hơn dùng ~0,0081 R☉. Kiểm tra chéo: 0,0084 × 695 700 km = **5 840 km bán kính → đường kính ~11 700 km**, khớp "12 000 km" của ESA (tự tính ⚠️). → Nên viết "bán kính khoảng 0,008 R☉ (~5 800 km), nhỏ hơn Trái Đất (6 371 km)".
  - Mật độ trung bình Sirius B (tự tính ⚠️): ρ = M/(4/3·π·R³) = 1,018 × 1,989 × 10³⁰ kg / (4/3·π·(5,84 × 10⁶ m)³) ≈ **2,4 × 10⁶ g/cm³ ≈ 2,4 tấn/cm³** (với R = 0,0081 R☉ thì ≈ 2,7 tấn/cm³).
- **Mật độ điển hình ~1 tấn/cm³:**
  - Tự tính ⚠️: sao lùn trắng 0,6 M☉ (khối lượng điển hình) bán kính bằng Trái Đất → ρ ≈ 1,1 × 10⁶ g/cm³ ≈ **1,1 tấn/cm³**.
  - Wikipedia: khoảng 10⁴–10⁷ g/cm³. Astronomy Magazine: một viên đường bằng vật chất Sirius B nặng khoảng một tấn. ⚠️ thứ cấp.
  - **Các nguồn NASA lệch nhau về "một thìa cà phê":** NASA Science "Star Types": nặng hơn một chiếc xe bán tải (~2–3 tấn). Trang NASA Imagine cũ ("White Dwarf Cool Fact", https://imagine.gsfc.nasa.gov/science/toolbox/cool_dwarf_fact2.html): *"5.5 tons"*, *"as much as an elephant"*. Bộ bài tập NASA "Life Cycles of Stars" tính ~9,5 × 10⁶ g (~10 tấn, giả định thìa 5 cm³). Tất cả đều cùng bậc độ lớn: **một thìa (~5 cm³) ≈ vài tấn đến ~10 tấn**, tuỳ khối lượng sao và thể tích "thìa".
- **Kết cục của Mặt Trời:** thành sao lùn trắng sau khoảng 10 tỷ năm nữa, tính từ bây giờ (NASA "Star Types"). ✅. ⚠️ Lưu ý câu này của NASA có vẻ tính "10 tỷ năm" từ hiện tại, trong khi các nguồn khác nói hết dãy chính sau ~5 tỷ năm, rồi ~1 tỷ năm khổng lồ đỏ, tức thành sao lùn trắng sau ~6–7 tỷ năm. **Các nguồn lệch nhau; nên viết "sau khoảng 5 tỷ năm nữa Mặt Trời phình thành sao khổng lồ đỏ, rồi cuối cùng thành sao lùn trắng".**

### (c) Hiểu lầm phổ biến
1. **"Sao lùn trắng vẫn đang đốt hạt nhân."** Sai. NASA: sao lùn trắng "chết" vì *"atoms inside of it no longer fuse"*, nhưng vẫn sáng vì còn rất nóng (nhiệt tích trữ) và nguội dần (https://science.nasa.gov/universe/whats-inside-a-dead-star/ ✅).
2. **"Sao lùn trắng là một loại sao nhỏ trên dãy chính."** Không. Đây là xác sao, nằm dưới-trái dãy chính trên biểu đồ H–R.
3. **"Sao nặng hơn để lại sao lùn trắng to hơn."** Ngược lại: sao lùn trắng càng nặng thì càng **nhỏ** (do suy biến electron). Gần giới hạn Chandrasekhar, bán kính tiến về 0.
4. **"Sao lùn đen đã tồn tại."** Chưa. Thời gian nguội thành sao lùn đen lâu hơn tuổi vũ trụ (13,8 tỷ năm). NASA Imagine định nghĩa sao lùn đen là sao lùn trắng đã nguội tới mức không còn phát sáng. ✅ định nghĩa; ⚠️ phần "chưa tồn tại" là suy luận chuẩn.

### (d) Thuật ngữ tiếng Việt
sao lùn trắng (white dwarf); giới hạn Chandrasekhar; áp suất suy biến electron (electron degeneracy pressure; còn gặp "áp suất thoái hoá electron"); tinh vân hành tinh (planetary nebula, không liên quan tới hành tinh); sao lùn đen (black dwarf). ⚠️

---

## 5. Sao neutron và pulsar

### (a) Định nghĩa gốc
- **IAU OAE**, "Neutron Star" (https://astro4edu.org/resources/glossary/term/214/): *"A neutron star is a very dense and compact stellar remnant that is left following the collapse of a massive star's core. The collapsed core has a density larger than that of most atomic nuclei and is comprised primarily of neutrons."* ✅. Mục này cũng viết: *"Highly magnetic neutron stars are known as magnetars. The vast majority of known neutron stars are observed as radio pulsars."* ✅
  - ⚠️ **Lưu ý:** mục IAU OAE ghi *"The lower mass limit of a neutron star is 1.4 solar masses, and the upper limit is about 3 solar masses"*. Câu này mâu thuẫn với số đo thực (xem dưới: có sao neutron ~1,17–1,2 M☉). Có lẽ người viết nhầm 1,4 M☉ (giới hạn Chandrasekhar của *lõi* trước khi sụp) với khối lượng tối thiểu của sao neutron. Không nên trích nguyên câu này.
- **NASA Hubble Glossary:** sao neutron là *"an extremely compact ball of neutrons created from the central core of a star that collapsed under gravity during a supernova explosion"*. ✅
- **Pulsar** (NASA glossary): *"a neutron star that emits rapid and periodic pulses of radiation"*. ✅. IAU OAE (https://astro4edu.org/resources/glossary/term/266/): sao neutron quay nhanh có các chùm bức xạ. ✅. Ví von "ngọn hải đăng" (NASA Hubble).

### (b) Con số then chốt
- **Kích thước:**
  - NASA Imagine the Universe "Neutron Stars": đường kính **~20 km** (12,5 dặm). https://imagine.gsfc.nasa.gov/science/objects/neutron_stars1.html ✅
  - NASA "Star Types": nhiều khối lượng hơn Mặt Trời nằm trong khối cầu rộng bằng chiều dài đảo Manhattan. ✅
  - Đo bằng NICER (NASA): PSR J0740+6620 (2,08 ± 0,07 M☉), Miller et al. 2021: R = 13,7 (+2,6/−1,5) km; Dittmann et al. 2024: **12,92 km** (−1,13/+2,09). Phân tích tổng hợp 2021: sao neutron 1,4 M☉ có R = **12,45 ± 0,65 km**. https://arxiv.org/abs/2105.06979 ; https://arxiv.org/abs/2406.14467 ✅
  - → **Bán kính ~11–13 km (đường kính ~20–25 km).** Con số "~10 km" trong sách cũ hơi nhỏ.
- **Khối lượng:**
  - Điển hình ~1,4 M☉ (NASA booklet "Life Cycles of Stars": https://imagine.gsfc.nasa.gov/educators/lifecycles/Imagine2.pdf ✅).
  - **Nhỏ nhất đo chính xác: ~1,17 M☉**. Đó là sao đồng hành của PSR J0453+1559, 1,174 ± 0,004 M☉ (Martinez et al. 2015, ApJ 812, 143) ✅. ⚠️ Đã có ý kiến cho rằng vật thể này có thể là sao lùn trắng (arXiv:1909.12318).
  - **Lớn nhất đo đáng tin: 2,08 ± 0,07 M☉** (PSR J0740+6620). ✅. (Một số ước tính cho pulsar "góa phụ đen" PSR J0952−0607 ~2,35 M☉, chưa kiểm trong phiên ⚠️.)
- **Giới hạn Tolman–Oppenheimer–Volkoff (TOV), tức khối lượng tối đa của sao neutron không quay:** chưa biết chính xác, phụ thuộc phương trình trạng thái.
  - Rezzolla, Most & Weih 2018 (dựa trên GW170817): **2,01 ≤ M_TOV ≲ 2,16 (+0,17/−0,15) M☉**. https://arxiv.org/abs/1711.00314 ✅
  - Margalit & Metzger 2017: M_TOV ≲ 2,17 M☉ ✅. Phân tích 2019 (arXiv:1912.06369) cho tới ~2,4 M☉ ✅.
  - → **Nên viết "khoảng 2,2–2,3 M☉ (chưa chắc chắn)"**. Câu "~3 M☉" trong IAU OAE là cận trên lý thuyết rất rộng (giới hạn nhân quả).
- **Mật độ / "một thìa cà phê": các nguồn NASA lệch nhau**
  - NASA Science "Star Types": *"just one teaspoon of neutron star matter would weigh as much as Mount Everest"*. ✅ (về bậc độ lớn: núi Everest được ước ~10¹⁴–10¹⁵ kg, nghĩa là "hàng trăm tỷ tấn", lớn hơn các con số dưới).
  - Các trang NASA khác: "a billion tons", "more than 1 billion tons", "4 billion tons" (theo trích đoạn tìm kiếm trên nasa.gov) ✅. Bộ bài tập NASA "Life Cycles of Stars" tính 3,3 × 10¹⁵ g ≈ **3,3 tỷ tấn** (thìa 5 cm³, R = 9 km).
  - NASA Imagine: mật độ ~**7 × 10¹⁴ g/cm³**. ✅
  - Tự tính ⚠️: 1,4 M☉, R = 12 km → ρ ≈ 3,8 × 10¹⁴ g/cm³ → thìa 5 cm³ ≈ **1,9 tỷ tấn**; với R = 10 km → 6,6 × 10¹⁴ g/cm³, ~3,3 tỷ tấn.
  - → **Phát biểu an toàn có nguồn NASA: "một thìa cà phê vật chất sao neutron nặng khoảng một tỷ tấn hoặc hơn" (NASA Imagine).** Ví dụ "nặng như núi Everest" cũng là của NASA nhưng lớn hơn khoảng 100 lần, nên chọn một trong hai và ghi nguồn.
- **Pulsar đầu tiên:**
  - **Jocelyn Bell** (sau này là Bell Burnell), nghiên cứu sinh tại Cambridge, phát hiện tín hiệu bằng Interplanetary Scintillation Array (Mullard Radio Astronomy Observatory). Các nguồn ghi ngày khác nhau: tín hiệu "vệt bẩn" đầu tiên thấy trên giấy ghi từ **tháng 8/1967**; xung được ghi rõ ngày **28/11/1967** (Linda Hall Library: https://www.lindahall.org/about/news/scientist-of-the-day/jocelyn-bell-burnell ✅ cho ngày 28/11/1967). Biệt danh "LGM-1" (Little Green Men).
  - Tên: **CP 1919** (Cambridge Pulsar), nay là PSR B1919+21. **Chu kỳ ~1,337 s** (1,3373 s). ✅ (nhiều nguồn).
  - Bài báo: Hewish, Bell, Pilkington, Scott & Collins, *Nature* 217, 709 (**tháng 2/1968**). ✅ (năm 1968, Nature; số trang ⚠️)
  - **Nobel Vật lý 1974** trao cho Antony Hewish (và Martin Ryle); Bell không được trao. Năm 2018 bà nhận Breakthrough Prize đặc biệt và quyên toàn bộ 3 triệu USD. ⚠️ (Breakthrough Prize: kiến thức chung, chưa đối chiếu trong phiên).
- **Pulsar quay nhanh nhất đã biết: PSR J1748−2446ad**, **716 Hz** (~1,40 ms/vòng, tự tính 1/716), trong cụm sao cầu **Terzan 5**. Hessels et al., *Science* 311, 1901–1904 (2006), doi:10.1126/science.1123430; phát hiện bằng kính Green Bank. Kỷ lục trước đó là PSR B1937+21, 642 Hz (1982). https://arxiv.org/abs/astro-ph/0601337 ; NRAO: https://public.nrao.edu/?p=3906 ✅
  - Khoảng cách Terzan 5: thông cáo 2006 ghi 28 000 năm ánh sáng; số liệu hiện nay ~18 000–19 000 năm ánh sáng (~5,9 kpc). ⚠️ các nguồn lệch nhau.
  - Đến 01/11/2026 chưa thấy nguồn nào báo kỷ lục mới vượt 716 Hz. ⚠️ (chưa tìm riêng).
- **Pulsar Con Cua:** quay một vòng mỗi **33 ms** (~30 vòng/giây). NASA/Webb: https://science.nasa.gov/asset/webb/infrared-universe-the-crab-nebula/ ✅

### (c) Hiểu lầm phổ biến
1. **"Pulsar nhấp nháy/đập theo nhịp."** Không. Sao quay đều và chùm bức xạ quét qua Trái Đất như đèn hải đăng. "Xung" là hiệu ứng góc nhìn.
2. **"Mọi sao neutron đều là pulsar ta thấy được."** Chỉ những sao có chùm quét qua Trái Đất mới được thấy là pulsar. Sao neutron khác vẫn tồn tại (có thể thấy qua tia X, sao đôi, sóng hấp dẫn).
3. **"Sao neutron chỉ toàn neutron."** Chủ yếu là neutron, nhưng có lớp vỏ hạt nhân và electron; lõi trong có thể có vật chất kỳ lạ (chưa biết rõ; đây là mục tiêu của NICER).
4. **"Tín hiệu pulsar đầu tiên là người ngoài hành tinh."** Chỉ là biệt danh đùa "LGM-1"; nhóm Cambridge nhanh chóng loại bỏ giả thuyết này khi tìm thêm nguồn tương tự.

### (d) Thuật ngữ tiếng Việt
sao neutron / sao nơtron (neutron star); pulsar / sao xung / punxa (pulsar); sao từ (magnetar); áp suất suy biến neutron; giới hạn Tolman–Oppenheimer–Volkoff (giới hạn TOV); pulsar mili-giây (millisecond pulsar); cụm sao cầu (globular cluster). ⚠️ "Sao xung" và "pulsar" đều được dùng trong tiếng Việt; "punxa" là phiên âm cũ.

---

## 6. Siêu tân tinh sụp đổ lõi (loại II)

### (a) Định nghĩa gốc
- **IAU OAE**, "Supernova" (https://astro4edu.org/resources/glossary/term/349/): có hai con đường. Loại Ia: một sao lùn trắng nhận thêm khối lượng rồi nổ tung, không để lại gì. **Loại II:** một ngôi sao trên khoảng 8 khối lượng Mặt Trời co sụp, để lại *"a neutron star or (for the most massive stars) a stellar-mass black hole"*. ✅
- **Cơ chế** (tổng hợp từ bài tổng quan, arXiv): sắt là hạt nhân liên kết bền nhất, nên tổng hợp sắt không sinh năng lượng. Khi lõi sắt vượt ~1,4 M☉ (giới hạn Chandrasekhar), lõi sụp trong khoảng một phần giây thành sao neutron. Năng lượng liên kết hấp dẫn giải phóng **~10⁵³ erg (10⁴⁶ J)**, trong đó **~99% thoát ra dưới dạng neutrino**, ~1% (~10⁵¹ erg) thành động năng lớp vỏ bị bắn ra, và chỉ ~0,01% (~10⁴⁹ erg) thành ánh sáng. ✅ (bài tổng quan arXiv, ví dụ astro-ph/0502232; cần chọn một nguồn cụ thể để trích). Cơ chế chính xác của vụ nổ (sóng xung kích được neutrino "tiếp sức") vẫn là bài toán mở.
- Phân loại theo quang phổ: loại II có vạch hydro; loại I không có. ✅

### (b) Con số then chốt
- **SN 1987A:**
  - Ánh sáng tới Trái Đất ngày **23/2/1987**; ở **Đám Mây Magellan Lớn**. Sao tiền thân: **Sanduleak −69° 202**, sao siêu khổng lồ xanh ~20 M☉. ✅ (NASA NTRS/bài tổng quan)
  - **Neutrino:** tín hiệu đến lúc ~07:35 UT ngày 23/2/1987, vài giờ trước ánh sáng, tại **Kamiokande II (11 hoặc 12 sự kiện), IMB (8), Baksan (5)**, kéo dài < 13 giây. **Tổng ~24–25 neutrino** (CERN Courier ghi 11 cho Kamiokande, tổng 24; Wikipedia ghi 12, tổng 25). ✅ có ghi rõ chỗ lệch. Đây là lần đầu tiên, và đến nay là lần duy nhất, phát hiện neutrino từ một vụ sụp lõi sao; đánh dấu sự ra đời của thiên văn neutrino. Masatoshi Koshiba (Kamiokande) nhận Nobel Vật lý 2002 một phần nhờ phát hiện này. ⚠️ (Nobel: kiến thức chung).
  - **Khoảng cách: các nguồn lệch nhau**
    - NASA/JPL và ESA/Webb (2/2024, thông cáo bằng chứng sao neutron trong SN 1987A, công bố trên *Science* 22/2/2024): **~160 000 năm ánh sáng**. https://www.jpl.nasa.gov/news/webb-finds-evidence-for-neutron-star-at-heart-of-young-supernova-remnant/ ; https://esawebb.org/news/weic2404 ✅
    - Wikipedia: 51,4 kpc ≈ **168 000 năm ánh sáng** (tự quy đổi 51,4 × 3 261,6 = 167 600 ⚠️). Khoảng cách tới Đám Mây Magellan Lớn đo chính xác nhất là 49,59 kpc ≈ 162 000 năm ánh sáng (Pietrzyński et al. 2019, *Nature*) ⚠️ (chưa đối chiếu trong phiên).
    - → **Dùng "khoảng 160 000 năm ánh sáng" (NASA/ESA 2024)**, hoặc ghi "160 000–170 000".
  - Năm 2024, Webb tìm thấy bằng chứng (gián tiếp: vạch argon và lưu huỳnh bị ion hoá) cho thấy có một sao neutron ở tâm. ✅
- **Siêu tân tinh 1054 → Tinh vân Con Cua (M1):**
  - NASA (Hubble Messier catalog, M1): các nhà thiên văn Trung Quốc ghi lại năm **1054** một "khách tinh" thấy được **cả ban ngày trong gần một tháng**. https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/ ✅. Sao này thấy được bằng mắt thường ban đêm khoảng 2 năm (theo arXiv:2404.19017) ✅. Ngày thường được nêu là 4/7/1054 ⚠️ (chưa đối chiếu).
  - Khoảng cách **~6 500 năm ánh sáng**, tinh vân rộng ~5 năm ánh sáng (NASA: https://www.nasa.gov/image-article/crab-nebula-2/) ✅. Chandra (1999) ghi 6 000 năm ánh sáng.
  - Pulsar ở tâm: 33 ms/vòng (mục 5). ✅
- **Betelgeuse (Tham Tú Tứ, α Orionis):**
  - Joyce et al. 2020 (ApJ): **548 (+88/−49) năm ánh sáng**; báo chí làm tròn ~530 năm ánh sáng ("gần hơn 25%"); sao đang đốt helium ở lõi; **chưa nổ trong khoảng 100 000 năm**. ANU: https://science.anu.edu.au/news-events/news/supergiant-star-betelgeuse-smaller-closer-first-thought ✅
  - NASA ("What is Betelgeuse?", https://science.nasa.gov/universe/what-is-betelgeuse-inside-the-strange-volatile-star/): khoảng cách không chắc chắn, ~548 năm ánh sáng; tài liệu NASA cũ ghi ~700 năm ánh sáng; siêu tân tinh khó xảy ra trong khoảng 100 000 năm tới; vụ nổ quá xa để ảnh hưởng đến Hệ Mặt Trời. ✅
  - Các ước tính trong mấy thập niên qua nằm trong khoảng 330–650 năm ánh sáng (Hipparcos cũ ~640). ✅
  - **Khoảng cách nguy hiểm:** JPL Night Sky Network: chỉ siêu tân tinh trong khoảng **~30 năm ánh sáng** mới có thể gây hại cho sự sống trên Trái Đất ✅. Một nghiên cứu 2017 nêu ~50 năm ánh sáng ⚠️. Betelgeuse xa hơn khoảng 10–20 lần.
  - Khi nổ có thể sáng ngang hoặc hơn Trăng (tròn hoặc khuyết), thấy cả ban ngày trong nhiều tuần. ⚠️ (nguồn NASA cũ, chưa rõ).
  - "Đại sự kiện mờ" (Great Dimming) 2019–2020 do một đám bụi phun ra, không phải dấu hiệu sắp nổ (NASA/Hubble 2020) ⚠️ (chưa đối chiếu trong phiên).

### (c) Hiểu lầm phổ biến
1. **"Siêu tân tinh = sao cạn nhiên liệu rồi nổ như bom."** Siêu tân tinh loại II là một vụ **co sụp** (implosion) của lõi rồi bật ngược. Năng lượng chủ yếu từ trọng lực, không phải từ đốt hạt nhân, và 99% thoát ra dưới dạng neutrino.
2. **"Betelgeuse sắp nổ và nguy hiểm cho Trái Đất."** Không. Có thể còn tới khoảng 100 000 năm nữa, và ở ~550 năm ánh sáng thì nó an toàn.
3. **"Ta đang thấy SN 1987A nổ năm 1987."** Vụ nổ thực ra xảy ra khoảng 160 000 năm trước đó; năm 1987 là lúc ánh sáng (và neutrino) tới nơi.
4. **"Mọi siêu tân tinh đều để lại sao neutron."** Loại Ia (sao lùn trắng nổ) không để lại gì; sao rất nặng có thể để lại hố đen.

### (d) Thuật ngữ tiếng Việt
siêu tân tinh (supernova); siêu tân tinh sụp đổ lõi / sụp lõi (core-collapse supernova); tân tinh (nova, khác siêu tân tinh); tàn tích siêu tân tinh (supernova remnant); "khách tinh" (客星, ghi chép cổ của Trung Quốc); Đám Mây Magellan Lớn; Tinh vân Con Cua; Betelgeuse / sao Tham Tú Tứ (α Orionis). ⚠️

---

## 7. Nguồn gốc các nguyên tố – "chúng ta được làm từ bụi sao"

### (a) Định nghĩa gốc
- **Big Bang Nucleosynthesis** (IAU OAE, https://astro4edu.org/resources/glossary/term/430/): *"Big Bang Nucleosynthesis (BBN), sometimes called Primordial Nucleosynthesis, is a brief instance of nucleosynthesis during our Universe's hot and dense Big Bang phase."* ✅
- **NASA** (trang giáo dục, qua trích đoạn): *"the elements other than hydrogen and most of helium were formed in the stars or supernovas by fusion processes"* ✅ (đến từ một trang thuộc nasa.gov trong kết quả lọc tên miền; nguồn cụ thể có thể là StarChild "Is my body really made up of star stuff?", https://starchild.gsfc.nasa.gov/docs/StarChild/questions/question57.html, cần mở lại để xác định).
- **NASA SVS 13873**, "Periodic Table of the Elements: Origins of the Elements" (NASA Goddard, dựa trên bảng của Jennifer Johnson): H và He được tạo thành *"about 3 minutes after the Big Bang"*. https://svs.gsfc.nasa.gov/13873/ ✅. **Đây là nguồn NASA tốt nhất để minh hoạ bảng tuần hoàn nguồn gốc.**
- **Quá trình s và r:** bắt neutron chậm (s) hay nhanh (r) so với phân rã β. Sao AGB tạo các nguyên tố quá trình s ở cả ba đỉnh (Sr–Y–Zr, Ba, Pb) nhưng không tạo được nguyên tố nặng hơn. (arXiv:2108.06075 và các bài liên quan) ✅

### (b) Con số then chốt
- **Vụ Nổ Lớn:** tạo H, phần lớn He, và một ít Li (vài phút đầu). Mô hình hiện đại: BBN tạo phần lớn He, sao tạo "kim loại" và thêm một ít He. ✅
- **Bảng tuần hoàn nguồn gốc nguyên tố (Jennifer Johnson, Ohio State):**
  - Bài blog SDSS "Origin of the Elements in the Solar System", **9/1/2017**: https://blog.sdss.org/2017/01/09/origin-of-the-elements-in-the-solar-system/ (bản lưu: https://webcf.waybackmachine.org/web/20210915174525/http://blog.sdss.org/2017/01/09/origin-of-the-elements-in-the-solar-system). ✅. Phiên bản gốc do Inese Ivans & Johnson làm năm 2008, Anna Frebel tinh chỉnh. Phạm vi: nguyên tố trong **Hệ Mặt Trời**, tới uranium; Tc và Pm để màu xám. Ví dụ: sao khối lượng thấp đang chết tạo ra phần lớn chì (Pb) trong Hệ Mặt Trời. ✅
  - Bài tổng quan bình duyệt: J. A. Johnson, "Populating the periodic table: Nucleosynthesis of the elements", ***Science* (2019)** ✅ (năm và tiêu đề). Số 363, tr. 474–478, 1/2/2019 ⚠️ (chưa đối chiếu số trang).
  - Giấy phép CC BY-SA 4.0, trang gốc https://www.astronomy.ohio-state.edu/johnson.3064/nucleo/index.html ✅. **Có thể dùng lại trên web nếu ghi công.**
  - Hai bản 2017 và 2019 khác nhau một chút: bản 2019 tăng vai trò sáp nhập sao neutron, và có bản phân biệt "sao lùn trắng nổ" với "sao nặng nổ". ⚠️ cần so sánh trực tiếp hai hình.
- **GW170817 / kilonova AT2017gfo:**
  - Sóng hấp dẫn ghi nhận lúc **12:41:04 UT ngày 17/8/2017** (LIGO/Virgo); ~2 giây sau, Fermi-GBM (NASA) và INTEGRAL (ESA) bắt được một chớp gamma ngắn. Thiên hà chủ NGC 4993, ~130 triệu năm ánh sáng (⚠️ khoảng cách chưa đối chiếu trong phiên). ✅ (thời điểm, Fermi/INTEGRAL)
  - Pian et al. 2017 (*Nature*, "Spectroscopic identification of r-process nucleosynthesis in a double neutron star merger", arXiv:1710.05858): ánh sáng phù hợp với kilonova chạy bằng phân rã phóng xạ của hạt nhân giàu neutron tạo ra qua quá trình r; có dấu hiệu tổng hợp tới đỉnh r thứ ba (A ≈ 195, vùng vàng/bạch kim). ✅. Watson et al. 2019 phát hiện **strontium** trong quang phổ. ✅. Khối lượng vật chất bắn ra ~0,04–0,08 M☉. ✅ (một mô hình)
  - Một ước tính: một vụ sáp nhập tạo ra **khoảng 3–13 lần khối lượng Trái Đất bằng vàng** ⚠️ (bất định lớn).
  - **Tranh luận còn mở:** sáp nhập sao neutron có phải nguồn chính *duy nhất* của quá trình r hay không. Một số nghiên cứu cho rằng tần suất và độ trễ không đủ để giải thích các sao già nghèo kim loại, và đề xuất thêm siêu tân tinh từ-quay (magnetorotational) hoặc collapsar. (arXiv:1809.04597; R-Process Alliance arXiv:2503.13426) ✅. → Nên viết "là **một** nguồn chính đã được xác nhận", không viết "nguồn duy nhất".
- **Thành phần cơ thể người theo khối lượng: các nguồn lệch nhau**
  - Bộ số "**O 65%, C 18,5%, H 9,5%, N 3,2%**" (thêm Ca ~1,5%, P ~1%…) thường được trích trong sách sinh học phổ thông (ví dụ Campbell *Biology*). Trích đoạn chỉ thấy qua Wikipedia "Composition of the human body", và các bản sao lại lệch nhau (H 9,5 hay 10%; N 2,6 hay 3,2%). ⚠️ chưa tìm được nguồn gốc bình duyệt.
  - Bộ số theo **ICRP** (người tham chiếu, qua Visual Capitalist): **O 61,4%, C 22,9%, H 10,0%, N 2,6%**. ⚠️ (thứ cấp; nguồn gốc là ICRP Publication 23/89, cần mở báo cáo).
  - → **Nên viết "khoảng 60–65% oxy, 18–23% carbon, ~10% hydro, ~3% nitơ" và dẫn ICRP Publication 89 (2002)** sau khi kiểm bảng gốc.
  - Theo **số nguyên tử**, hydro chiếm ~62% số nguyên tử trong cơ thể (thứ cấp ⚠️).
- **"~93% khối lượng cơ thể là bụi sao": nguồn gốc và kiểm chứng**
  - Nguồn gốc con số: poster/bài của **PhysicsCentral (Hội Vật lý Hoa Kỳ, APS)**, "How much of the human body is made up of stardust?" (https://site3.auth.aps.commonspotcloud.com/explore/poster-stardust.cfm, bản host lại). Lập luận: cơ thể có ~7 × 10²⁷ nguyên tử, trong đó ~4,2 × 10²⁷ là H, nên ~40% số nguyên tử là "bụi sao". Tính theo khối lượng: cơ thể ~60% là nước, H chỉ chiếm 11% khối lượng nước, suy ra **~93%**. ✅ (đã xác định được nguồn và cách tính). **Không phải** kết quả đo bình duyệt.
  - **Kiểm chứng (tự tính)** ⚠️: "bụi sao" ≈ mọi thứ trừ H (He gần như không có trong cơ thể; Li, Be, B một phần do tia vũ trụ, không đáng kể về khối lượng). Vậy tỉ lệ bụi sao ≈ 100% − (phần trăm khối lượng của H).
    - Nếu H = 9,5–10% (bảng thành phần) → **~90–90,5%**.
    - Con số 93% của APS chỉ tính H trong *nước* (60% × 11% = 6,6% H), bỏ qua H trong protein, chất béo, ADN… nên **hơi cao**.
    - → **Khuyến nghị:** viết "khoảng 90% khối lượng cơ thể bạn (mọi nguyên tử trừ hydro) được tạo ra bên trong các ngôi sao". Nếu dùng "93%" thì ghi rõ đây là ước tính phổ biến của APS PhysicsCentral.
  - Lưu ý: con số "97%" trên báo chí (2017, khảo sát APOGEE/SDSS ~150 000 sao) nói rằng con người và dải Ngân Hà có ~97% *cùng loại nguyên tử*. Đây **không phải** tỉ lệ khối lượng có nguồn gốc từ sao, đừng nhầm. ✅ (Space.com: https://www.space.com/35276-humans-made-of-stardust-galaxy-life-elements.html)
  - **Câu "định nghĩa" của NASA:** báo Earth.com trích NASA: hydro trong cơ thể (trong mọi phân tử nước) đến từ Vụ Nổ Lớn; *"The carbon in your body was made by nuclear fusion in the interior of stars, as was the oxygen."* ⚠️ chưa thấy trên trang NASA. Có thể từ NASA Astrobiology "Are we really made of star stuff?" (https://astrobiology.nasa.gov/education/alp/are-we-really-made-of-star-stuff/), cần mở lại.

### (c) Hiểu lầm phổ biến
1. **"Mọi nguyên tử trong cơ thể đều từ sao."** Không. Hydro (~10% khối lượng, ~62% số nguyên tử) có từ Vụ Nổ Lớn, già hơn mọi ngôi sao.
2. **"Mọi nguyên tố nặng hơn sắt đều tạo trong siêu tân tinh."** Quan điểm cũ. Khoảng một nửa đến từ quá trình s trong sao AGB (sao khổng lồ già, nhẹ), nửa còn lại từ quá trình r (sáp nhập sao neutron và có thể một số loại siêu tân tinh hiếm).
3. **"Vàng trên Trái Đất được tạo ra trên Trái Đất/trong Mặt Trời."** Mặt Trời chỉ tạo He. Vàng có trước khi Hệ Mặt Trời hình thành, sinh ra từ các sự kiện quá trình r trong Ngân Hà.
4. **"Sắt là thứ sao tạo ra nhiều nhất."** Phần lớn sắt trong Hệ Mặt Trời đến từ siêu tân tinh loại Ia (sao lùn trắng nổ), không chỉ từ sao nặng sụp lõi (theo bảng Johnson; ⚠️ cần xem lại tỉ lệ).

### (d) Thuật ngữ tiếng Việt
tổng hợp hạt nhân (nucleosynthesis); tổng hợp hạt nhân Vụ Nổ Lớn (BBN); tổng hợp hạt nhân trong sao; quá trình s (bắt neutron chậm); quá trình r (bắt neutron nhanh); sao AGB (sao thuộc nhánh khổng lồ tiệm cận); sáp nhập sao neutron (neutron star merger); kilonova; sóng hấp dẫn; "bụi sao" (stardust). ⚠️

---

## 8. Tóm tắt nhanh các điểm cần lưu ý khi viết

| Chủ đề | Dùng con số | Nguồn | Chỗ lệch |
|---|---|---|---|
| Khối lượng tối thiểu đốt H | ~0,07–0,08 M☉ (~75–80 M_J) | NASA, Burgasser 2009 | 70–85 M_J tuỳ độ kim loại/phép đo |
| Tinh vân Orion | 1 344 ± 20 nm.a.s. | ESA | 1 270–1 350 tuỳ phép đo |
| Cột trụ Sáng tạo | 6 500 nm.a.s. | NASA/ESA Webb | 5 700–7 000 ở nguồn khác |
| Lõi Mặt Trời | ~15 triệu °C / 15,7 triệu K | NASA / NSSDC | không đáng kể |
| Mất khối lượng | ~4,3 triệu tấn/s | tính từ IAU L☉ | NASA làm tròn 4 triệu |
| Đốt hydro | ~600 triệu tấn/s | ESA | 600–700 triệu ở nguồn khác |
| Độ trưng | 3,828 × 10²⁶ W | IAU 2015 B3 | — |
| T_eff Mặt Trời | 5 772 K | IAU 2015 B3 | — |
| Photon thoát | ~170 000 năm | NASA, Mitalas & Sills 1992 | 10⁴–10⁶ năm tuỳ mô hình; NASA có trang ghi 150 000 |
| Mốc kết cục | 8 / 20–25 M☉ | NASA, IAU OAE, Heger 2003 | phụ thuộc độ kim loại, quay |
| Chandrasekhar | ~1,4 (1,44) M☉ | NASA glossary | — |
| Sirius B | 1,018 M☉; ~0,008 R☉ | Bond 2017 | bán kính 0,0081 vs 0,0084 chưa đối chiếu |
| Sao neutron | R ~12–13 km; 1,17–2,08 M☉ đo được | NICER | IAU OAE ghi sai "tối thiểu 1,4 M☉" |
| TOV | ~2,2–2,3 M☉ | Rezzolla 2018 v.v. | 2,16–2,4 |
| Thìa sao neutron | ~1 tỷ tấn | NASA Imagine | NASA Science: "như núi Everest" |
| SN 1987A | ~160 000 nm.a.s.; ~25 neutrino | NASA/ESA 2024 | 168 000 (Wikipedia); 24 vs 25 |
| Betelgeuse | ~550 (548) nm.a.s. | NASA, Joyce 2020 | 530–700 |
| Bụi sao | ~90% khối lượng | tự tính | APS ghi 93% (ước tính thô) |

## 9. Danh sách điểm CHƯA đối chiếu được (cần làm khi có mạng)
1. Mở trực tiếp các trang NASA (science.nasa.gov bị chặn) để chép **nguyên văn** định nghĩa: Hubble Glossary (nebula, white dwarf, neutron star, brown dwarf), "Star Types", "Sun: Facts".
2. Định nghĩa **tiêu chuẩn Jeans** từ giáo trình có tên (Carroll & Ostlie; hoặc OpenStax nếu có).
3. **Bán kính Sirius B** chính xác (0,0081 hay 0,0084 R☉), xem bảng trong Bond et al. 2017 hoặc Joyce et al. 2018.
4. Nguồn gốc của con số **1 344 năm ánh sáng** (Reid et al. 2009?) và bảng **ICRP 89** về thành phần cơ thể.
5. Số trang của Johnson 2019 (*Science* 363:474?) và bài *Nature* 1968 của Hewish et al.
6. Ngưỡng CNO **~1,3 M☉** trong giáo trình bình duyệt (hiện chỉ có preprint và Wikipedia).
7. Thuật ngữ tiếng Việt: đối chiếu với từ điển thuật ngữ thiên văn (ví dụ của Hội Thiên văn học Việt Nam hoặc sách giáo khoa Vật lý 12 hiện hành).
8. Ngày 4/7/1054, Breakthrough Prize 2018 của Bell Burnell, khoảng cách NGC 4993 (~130 triệu năm ánh sáng), Great Dimming của Betelgeuse: kiến thức chung, chưa đối chiếu trong phiên.

---

## Bổ sung khi viết thẻ (01/11/2026)
- **Quan hệ khối lượng – bán kính sao lùn trắng** dùng trong minh hoạ: Nauenberg 1972, ApJ 175, 417 — R/R☉ ≈ 0,0112 (M/M₃)^{−1/3}[1 − (M/M₃)^{4/3}]^{1/2}, M₃ = 5,816/μₑ² M☉ (≈ 1,454 với μₑ = 2) ⚠️ (công thức giáo trình, hệ số theo trí nhớ; kiểm chứng: Sirius B 1,018 M☉ → 0,0078 R☉, gần 0,0081–0,0084 quan sát).
- **Ước lượng năng lượng sụp lõi** E ~ GM²/R với 1,4 M☉, 12 km → ~4 × 10⁴⁶ J (tự tính ⚠️), khớp bậc 10⁴⁶ J ở §6.
- **Nguồn gốc theo nguyên tố trong minh hoạ "bụi sao"** (theo bảng Johnson, định tính): O — chủ yếu sao nặng nổ; C — sao khối lượng thấp lúc chết + sao nặng; N — chủ yếu sao khối lượng thấp lúc chết; Ca, P, K, S, Na, Cl, Mg — chủ yếu sao nặng nổ (Fe có phần lớn từ SN Ia) ⚠️ cần đối chiếu hình gốc.
- **Thành phần cơ thể** dùng bộ ICRP (O 61,4 %, C 22,9 %, H 10,0 %, N 2,6 %, còn lại ~3,1 %) ⚠️ thứ cấp; theo số nguyên tử, H ≈ 62 % (tự tính từ bộ số này, khớp nguồn thứ cấp).
- **Thẩm định 01/11/2026 (biên tập viên độc lập):** sửa đơn vị mật độ trong minh hoạ sao lùn trắng; cân bằng phương trình pp (26,7 MeV tính theo khối lượng nguyên tử, gồm huỷ positron); bỏ "sáng ngang thiên hà" cho siêu tân tinh sụp lõi; nguồn khối lượng 2,08 M☉ là đo vô tuyến (Cromartie 2020; Fonseca 2021), không phải NICER; "hợp hạch sắt thành nguyên tố nặng hơn không toả năng lượng"; sắt chủ yếu từ SN Ia; thêm TOV ~2,2–2,3 M☉.
