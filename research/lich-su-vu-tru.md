# Chương 8 – Lịch sử vũ trụ: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** Không mở trực tiếp trang gốc (mạng của phiên bị hạn chế). Mọi số liệu được đối chiếu qua **trích đoạn kết quả của công cụ tìm kiếm**. Phiên này còn **hết hạn mức tìm kiếm giữa chừng**, nên một số mục (COBE/WMAP/Planck, ngày tháng, mốc thời gian vũ trụ sớm) chỉ ghi theo hiểu biết chuẩn và gắn ⚠️. Các số tự tính dùng Planck 2018: H₀ = 67,4 km/s/Mpc, Ωm = 0,3153, ΩΛ = 0,6847, Ωr ≈ 9,1 × 10⁻⁵ (tích phân số trong Python, đã kiểm: cho lại tuổi 13,787 tỷ năm).
> - ✅ **Đã đối chiếu**: con số hoặc câu thấy trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/Nobel/bài bình duyệt).
> - ⚠️ **Cần kiểm lại**: nguồn thứ cấp, số tự tính (có ghi công thức), hoặc chưa thấy nguyên văn.
>
> **Dẫn chiếu:** bảng H₀ chi tiết và tuổi vũ trụ đã có ở `thang-bac-vu-tru.md` §8–9 và `thuoc-do-vu-tru.md` §(c). File này bổ sung số CMB 2025 (ACT DR6, SPT-3G) và DESI DR2.

---

## 0. Câu hỏi lớn của chương và sơ đồ liên hệ khái niệm

**Câu hỏi lớn gợi ý:**
- "Làm sao ta biết vũ trụ có một quá khứ, và quá khứ ấy trông ra sao?" (câu chính)
- Câu phụ: "Nếu mọi thiên hà đều lùi xa, tâm của sự giãn nở ở đâu?" (trả lời: không có tâm); "Ánh sáng cổ nhất ta thấy được là gì?"; "Vì sao giãn nở lại đang nhanh dần?"

**Sợi chỉ xuyên suốt:** Vũ trụ học hiện đại dựa trên **ba trụ cột quan sát độc lập** – (1) thiên hà lùi xa theo định luật Hubble–Lemaître, (2) bức xạ phông vi sóng vũ trụ có phổ vật đen gần hoàn hảo, (3) tỉ lệ các nguyên tố nhẹ (H, He, D, Li) khớp tính toán tổng hợp hạt nhân. Trụ cột thứ tư thường được kể: cấu trúc lớn (dao động âm baryon). Năng lượng tối là "bất ngờ" của 1998, đến nay vẫn chưa rõ bản chất.

**Sơ đồ liên hệ (bản phác, để vẽ – trục thời gian log):**
```
t ≈ 0         "Vụ Nổ Lớn" = trạng thái nóng, đặc của toàn bộ không gian (không phải một điểm)
~10⁻³⁶–10⁻³² s LẠM PHÁT (giả thuyết, ủng hộ mạnh nhưng chưa xác lập) → gieo nhiễu lượng tử 10⁻⁵
~1 s – 20 phút TỔNG HỢP HẠT NHÂN (BBN): ~75% H, ~25% He (khối lượng), vết D, ³He, ⁷Li ──► trụ cột 3
~380 000 năm  TÁI KẾT HỢP (z ≈ 1 090, T ≈ 3 000 K): ánh sáng thoát tự do ─────────────► CMB (trụ cột 2)
              "THỜI KỲ TỐI" (dark ages): khí trung hoà, chưa có sao
~100–200 tr.n SAO ĐẦU TIÊN (Quần thể III) → thiên hà đầu tiên (JWST: MoM-z14 lúc ~280 triệu năm)
~1 tỷ năm     TÁI ION HOÁ kết thúc (z ≈ 6)
~7–8 tỷ năm   (z ≈ 0,63) giãn nở chuyển từ chậm dần sang NHANH DẦN ──► NĂNG LƯỢNG TỐI chiếm ưu thế
13,8 tỷ năm   hôm nay: H₀ ≈ 67–73 km/s/Mpc ──► định luật Hubble–Lemaître (trụ cột 1); "căng thẳng Hubble"
```

---

## 1. Vụ Nổ Lớn (Big Bang)

### (a) Định nghĩa gốc
- **Big Bang Theory** (IAU OAE, CC BY 4.0, ghi công "IAU OAE"): *"The Big Bang theory is the basic explanation for the evolutionary stages of the Universe."* https://astro4edu.org/resources/glossary/term/38/ ✅ (trích đoạn; phần còn lại của định nghĩa chưa thấy, cần mở trang để chép đủ).
- **"Không phải vụ nổ trong không gian":** chưa tìm thấy câu nguyên văn trên trang NASA. Gần nhất là video của STScI / NASA's Universe of Learning: vụ nổ cần không gian có sẵn, còn Vụ Nổ Lớn là sự hình thành và giãn nở của không gian xảy ra **ở mọi nơi cùng lúc** ⚠️ (chỉ qua mô tả). Các câu tương đương ở nguồn thứ cấp: Paul Steinhardt (Live Science): *"If it were an explosion it would have a center"*; Joel Primack (Scientific American): không gian "không giãn nở vào trong cái gì cả". https://www.livescience.com/32278-was-the-big-bang-really-an-explosion.html ⚠️
- **NASA WMAP "Universe 101"** (https://map.gsfc.nasa.gov/universe/) có mục "classic tests of the Big Bang theory"; trang cosmology nói thuyết Vụ Nổ Lớn *giải thích được CMB và nguồn gốc các nguyên tố nhẹ* nhưng tự nó không giải thích sao, thiên hà, cấu trúc lớn. https://map.gsfc.nasa.gov/cosmology/cosmology.html ✅ (diễn giải trích đoạn). Lưu ý: trang WMAP đã chuyển sang "NASA Science Collection Archive", không còn cập nhật.

### (b) Con số và mốc lịch sử
- **Lemaître 1927** (*Annales de la Société Scientifique de Bruxelles*): suy ra quan hệ vận tốc–khoảng cách từ thuyết tương đối rộng và đưa ra giá trị tạm thời cho hằng số giãn nở; dữ liệu khi ấy chưa đủ chứng minh quan hệ tuyến tính. ✅ (Luminet, arXiv:1105.6271; IAU iau1812).
- **Lemaître 1931** (*Nature*, 5/1931, "The beginning of the world from the point of view of quantum theory"): đề xuất **"nguyên tử nguyên thủy"** (primeval atom) – vũ trụ khởi đầu như một hạt nhân bất ổn định phân rã. ✅ (arXiv:1105.6271). Ghi chú: thuật ngữ "primeval atom" xuất hiện rõ ở các bài 1931 sau đó; thư Nature 5/1931 dùng ý "single quantum" ⚠️.
- **Thuật ngữ "Big Bang":** Fred Hoyle, buổi nói chuyện trên **BBC Third Programme, 28/3/1949** (khoảng 18:30 GMT); bản ghi in trên tạp chí *The Listener*. Câu gốc: *"…all the matter in the universe was created in one big bang at a particular time in the remote past"*. ✅ (Helge Kragh, *Nature* 2024, doi:10.1038/d41586-024-00894-z). **Nguồn lệch:** ý chế giễu hay không còn tranh luận – Kragh cho rằng không chắc Hoyle cố ý mỉa mai; hai thập kỷ sau, giới khoa học hầu như không dùng thuật ngữ này. → Viết "Hoyle đặt ra, có lẽ không mang ý khen".
- **Tuổi vũ trụ: 13,787 ± 0,020 tỷ năm** (Planck 2018 VI, A&A 641, A6, 2020, Bảng 2, TT,TE,EE+lowE+lensing+BAO). ⚠️ Trích đoạn bài gốc không hiện số tuổi; **tự tính** từ ΛCDM với tham số Planck 2018 cho 13,787 tỷ năm (khớp). Xem `thuoc-do-vu-tru.md` (một nguồn ghi 13,797 ± 0,023 cho tổ hợp dữ liệu khác).
- **BBN – tổng hợp hạt nhân Vụ Nổ Lớn:** PDG Review (bản 2025/2026): D, ³He, ⁴He và ⁷Li *"synthesized at the end of the first three minutes"*, khớp tốt với độ phổ biến nguyên thủy quan sát (⁷Li là ngoại lệ – xem dưới). Đếm neutron/proton đơn giản: Y_p = 2(n/p)/(1+n/p) ≈ **0,25**. ✅ https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf
  - Giá trị đo Y_p: 0,2449 ± 0,0040 (Aver et al. 2015, trích trong review arXiv:1706.03138) ✅; các phân tích khác 0,243–0,250. **"Y_p ≈ 0,245" dùng được**, ghi "khoảng một phần tư khối lượng". Chưa thấy con số chính xác PDG chọn ⚠️.
  - Khung thời gian "~3–20 phút": phản ứng chính diễn ra trong vài phút đầu, kết thúc khoảng 20 phút khi nhiệt độ quá thấp ⚠️ (giáo trình; PDG chỉ nói "first three minutes" cho thời điểm hình thành chính).
  - **Bài toán lithium:** ⁷Li quan sát ở sao nghèo kim loại thấp hơn dự đoán BBN ~3 lần ⚠️ (kiến thức chuẩn, chưa đối chiếu trong phiên).
- **Các mốc thời gian:**
  - Lạm phát ~10⁻³⁶ → ~10⁻³²/10⁻³³ s ⚠️ (con số phụ thuộc mô hình; mức chắc chắn: **được ủng hộ mạnh/đang tranh luận**, chưa xác lập – chưa phát hiện sóng hấp dẫn nguyên thủy, BICEP/Keck chỉ đặt giới hạn trên r < 0,036).
  - Tái kết hợp ~**380 000 năm** (NASA/ESA thường viết "380 000 years") ⚠️ chưa thấy trích đoạn trong phiên; **tự tính** với z = 1 090,9: t ≈ 372 000 năm – các nguồn lệch 370 000–380 000 tùy định nghĩa (z* hay z_drag, mặt phân tán cuối có độ dày).
  - Sao đầu tiên ~100–200 triệu năm ⚠️ (mô phỏng; chưa quan sát trực tiếp). Thiên hà xa nhất đã xác nhận: MoM-z14, vũ trụ ~280 triệu năm (xem `thuoc-do-vu-tru.md`).
  - Tái ion hoá kết thúc ~z ≈ 5,5–6, tức ~1 tỷ năm ⚠️ (Planck τ = 0,054 ± 0,007 ✅ cho điểm giữa tái ion hoá z ≈ 7,7 ⚠️).
- **Ba trụ cột bằng chứng:** giãn nở (Hubble–Lemaître), CMB, độ phổ biến nguyên tố nhẹ ✅ (khung của WMAP Universe 101, diễn giải). Thêm: dao động âm baryon, tiến hoá thiên hà theo thời gian.

### (c) Hiểu lầm phổ biến
- *"Vụ Nổ Lớn là vụ nổ từ một điểm trong không gian trống."* → Không có không gian bên ngoài để "nổ vào". Mọi điểm trong không gian đều giãn ra so với nhau; không có tâm. "Vũ trụ quan sát được" thì có kích thước hữu hạn, nhưng vũ trụ toàn thể có thể vô hạn.
- *"Thuyết Vụ Nổ Lớn giải thích khoảnh khắc t = 0."* → Thuyết mô tả tiến hoá **từ** trạng thái nóng đặc; bản thân "thời điểm khởi đầu" nằm ngoài vật lý đã kiểm chứng (cần lý thuyết lượng tử hấp dẫn).
- *"Lemaître là linh mục nên đây là ý tưởng tôn giáo."* → Lemaître tách bạch khoa học và đức tin; bằng chứng là quan sát độc lập ⚠️ (Luminet).

### (d) Thuật ngữ
Vụ Nổ Lớn (Big Bang) · nguyên tử nguyên thủy (primeval atom) · tổng hợp hạt nhân Vụ Nổ Lớn (Big Bang nucleosynthesis, BBN) · lạm phát vũ trụ (cosmic inflation) · tái kết hợp (recombination) · thời kỳ tối (dark ages) · tái ion hoá (reionization) · thuyết trạng thái dừng (steady-state theory) · mô hình ΛCDM (Lambda-CDM, vật chất tối lạnh + hằng số vũ trụ).

---

## 2. Bức xạ phông vi sóng vũ trụ (Cosmic Microwave Background, CMB)

### (a) Định nghĩa gốc
- NASA WMAP: CMB là *"the remnant heat from the Big Bang"*, nhiệt độ rất đồng đều trên toàn bầu trời. https://map.gsfc.nasa.gov/ ✅ (trích đoạn diễn giải).
- IAU OAE có mục "Cosmic Microwave Background" ⚠️ chưa tra được trong phiên (hết hạn mức tìm kiếm) – cần chép nguyên văn từ astro4edu.org.

### (b) Con số then chốt
- **Dự đoán:** Alpher & Herman, *Nature* 1948 (thư sửa bài của Gamow): nhiệt độ hiện nay *"about 5 K"*. ✅ (arXiv:1411.0172; BAAS cáo phó Alpher). **Nguồn lệch:** về sau họ và Gamow đưa ra nhiều ước tính khác (một nguồn nói 28 K – chưa xác nhận ⚠️). Dự đoán bị lãng quên tới 1965.
- **Phát hiện:** Penzias & Wilson (Bell Labs, ăng-ten loa Holmdel, New Jersey), đo được 1964, công bố 1965 (*ApJ* 142, ~3,5 K thừa ra) ⚠️ chi tiết bài báo chưa đối chiếu. **Nobel Vật lý 1978** (nửa giải, chia với Kapitsa): *"for their discovery of cosmic microwave background radiation"* ✅ https://www.nobelprize.org/prizes/physics/1978/
- **COBE** (NASA): phóng 18/11/1989; FIRAS cho phổ vật đen (công bố 1/1990), DMR phát hiện dị hướng ~1 phần 100 000 (công bố 4/1992) ⚠️ ngày tháng theo hiểu biết chuẩn, chưa đối chiếu được (hết hạn mức). **Nobel 2006** Mather & Smoot: *"for their discovery of the blackbody form and anisotropy of the cosmic microwave background radiation"* ✅ (Nature Physics, nobelprize.org).
- **WMAP** (NASA): phóng 30/6/2001, quan sát đến 2010, kết quả cuối (9 năm) 2012–2013 ⚠️.
- **Planck** (ESA): phóng 14/5/2009, quan sát đến 2013; công bố 2013, 2015, kết quả cuối "Planck 2018" (bài đăng A&A 2020) ⚠️ ngày; ✅ bài Planck 2018 VI tồn tại với H₀ = 67,4 ± 0,5, Ωm = 0,315 ± 0,007, 100θ* = 1,0411 ± 0,0003 (đo thang âm học chính xác 0,03%).
- **Nhiệt độ: T₀ = 2,72548 ± 0,00057 K** – Fixsen 2009, *ApJ* 707, 916–920 (FIRAS hiệu chuẩn lại bằng WMAP, kết hợp các phép đo khác). ✅ arXiv:0911.1955. Dạng làm tròn 2,7255 ± 0,0006 K. Giá trị cũ: 2,728 ± 0,004 K (Fixsen 1996).
- **Đỉnh phổ** (tự tính ⚠️): theo tần số ν_max = 2,821·kT/h = **160,2 GHz** ↔ c/ν = 1,87 mm; theo bước sóng (định luật Wien) λ_max = b/T = **1,06 mm**. Hai "đỉnh" khác nhau vì phân bố theo ν và theo λ khác nhau → khi viết "đỉnh ~1,9 mm" phải nói rõ là đỉnh theo tần số; nhiều nguồn phổ thông ghi "~1 mm".
- **z tái kết hợp:** z* = 1089,92 ± 0,25 (Planck 2018, Bảng 2) ⚠️ (theo trí nhớ, trích đoạn không hiện; cần mở bài). Viết "khoảng 1 100" an toàn.
- **Nhiệt độ lúc phát** (tự tính ⚠️): T = T₀(1+z) = 2,72548 × 1 090,9 ≈ **2 970 K**, tức "~3 000 K" ✅ hợp lý.
- **Mật độ photon** (tự tính ⚠️): n = (2ζ(3)/π²)(kT/ħc)³ = **411 photon/cm³** (410,7). Khớp con số PDG thường dẫn (chưa thấy trích đoạn).
- **Dị hướng:** ~1 phần 100 000 (10⁻⁵), tức cỡ chục–trăm micro-kelvin ⚠️.
- **"~1% nhiễu TV analog":** chỉ thấy ở nguồn phổ thông (NUS Physics, Big Think, Cool Cosmos); các nguồn lệch nhau ("khoảng 1%", "ít nhất 1%", "dưới 1%"). **Không thấy trang NASA/ESA nêu con số.** ⚠️ → Viết "một phần nhỏ, cỡ một phần trăm, theo ước tính phổ biến" hoặc bỏ.
- **CMB mặt đất 2025 (dẫn chiếu thêm cho bảng H₀):**
  - ACT DR6 (arXiv:2503.14452, 3/2025): Planck + ACT (P-ACT) **H₀ = 67,62 ± 0,50**; thêm lensing + BAO (P-ACT-LB) **68,22 ± 0,36**. ✅
  - SPT-3G D1 (2025): riêng SPT-3G **66,66 ± 0,60**, lệch **6,2σ** với SH0ES; Planck + ACT + SPT **67,24 ± 0,35** (bài SPT) ⚠️ – một bài SPT khác ghi 67,33 ± 0,37 và tổng quan 2026 ghi 67,19 ± 0,38 → **các tổ hợp lệch nhau ở chữ số thập phân thứ hai**, viết "~67,2–67,3".
  - Kết luận: Planck, ACT, SPT độc lập nhau nhưng đều cho ~67–68; không mô hình mở rộng nào gỡ được căng thẳng ✅ (trích đoạn).

### (c) Hiểu lầm phổ biến
- *"CMB đến từ một điểm, nơi Vụ Nổ Lớn xảy ra."* → Đến từ mọi hướng; ta thấy "mặt phân tán cuối cùng" – lớp vật chất cách ta hiện nay ~45–46 tỷ năm ánh sáng (comoving).
- *"Bản đồ CMB nhiều màu nghĩa là vũ trụ sớm rất hỗn loạn."* → Màu được phóng đại: chênh lệch chỉ ~10⁻⁵; vũ trụ sớm đồng đều đến kinh ngạc.
- *"CMB là ánh sáng của Vụ Nổ Lớn lúc t = 0."* → Là ánh sáng giải phóng lúc ~380 000 năm; trước đó vũ trụ "đục" với photon.

### (d) Thuật ngữ
bức xạ phông vi sóng vũ trụ (cosmic microwave background, CMB) · bức xạ vật đen (blackbody radiation) · dị hướng (anisotropy) · mặt phân tán cuối cùng (surface of last scattering) · dịch chuyển đỏ (redshift, z) · dao động âm baryon (baryon acoustic oscillations, BAO) · thang âm học (acoustic scale).

---

## 3. Sự giãn nở và định luật Hubble–Lemaître

### (a) Định nghĩa gốc
- **IAU Resolution B4 (2018)** – thông cáo iau1812, **29/10/2018**: *"the resolution to recommend renaming the Hubble law as the Hubble–Lemaître law has been accepted"*. ✅ https://www.iau.org/news/pressreleases/detail/iau1812/
  - Bỏ phiếu điện tử, kết thúc **nửa đêm UT 26/10/2018**; mời 11 072 hội viên, **4 060 người bỏ phiếu (37%)** ✅. Kết quả **78% tán thành, 20% phản đối, 2% phiếu trắng** ⚠️ (thấy qua Astronomy.com, chưa thấy trong trích đoạn IAU). Trước đó biểu quyết thăm dò tại Đại hội đồng Vienna (8/2018): **74% trong 385** hội viên có mặt ✅ (ann18048).
  - Bản chất: **khuyến nghị**, không bắt buộc. Lý do IAU: Lemaître công bố 1927, hai năm trước Hubble, đã đưa ra ý vũ trụ giãn nở và gắn với thuyết tương đối rộng ✅.
- Định luật: v = H₀·d (vận tốc lùi xa tỉ lệ khoảng cách; đúng tốt khi z ≪ 1).

### (b) Con số then chốt
- **Hubble 1929 (PNAS):** H ≈ 500 km/s/Mpc là con số phổ biến nhất; một số nguồn trích "~530" hoặc "600" ⚠️ – **chưa đối chiếu được** (trích đoạn thấy "H = 600"). **Lemaître 1927: ~625** (một số nguồn ghi 575 hoặc 670 tùy cách tính) ⚠️ chưa thấy trích đoạn. → Viết "khoảng 500–600, gấp ~7–8 lần giá trị nay" (sai số chủ yếu do hiệu chuẩn Cepheid, xem `thuoc-do-vu-tru.md`).
- **Bảng H₀ (cập nhật 07/11/2026; đầy đủ ở `thang-bac-vu-tru.md` §9):**

| Phép đo | H₀ (km/s/Mpc) | Nguồn, ngày | |
|---|---|---|---|
| Planck 2018 (CMB, ΛCDM) | 67,4 ± 0,5 | A&A 641 A6 (2020) | ✅ |
| Planck + ACT (P-ACT) | 67,62 ± 0,50 | ACT DR6, 3/2025 | ✅ |
| P-ACT + lensing + BAO | 68,22 ± 0,36 | ACT DR6, 3/2025 | ✅ |
| SPT-3G D1 riêng | 66,66 ± 0,60 | SPT 2025 | ✅ |
| Planck + ACT + SPT | 67,19 ± 0,38 (tổng quan) / 67,24 ± 0,35 | arXiv:2606.20434 (6/2026) | ✅/⚠️ |
| DESI DR2 BAO + BBN (không dùng CMB) | 68,51 ± 0,58 | arXiv:2503.14738, 3/2025; PRD 112, 083514 | ✅ |
| CCHP (Freedman, TRGB/JAGB, JWST) | ~70,4 | 2024–2025 | ✅ |
| SH0ES (Riess 2022) | 73,04 ± 1,04 | ApJL 934, L7 | ✅ |
| SH0ES Cepheid hiệu chuẩn lại | 73,17 ± 0,86 | Riess et al. 2024–25 | ⚠️ |
| H0DN "Local Distance Network" | 73,50 ± 0,81 | A&A, 4/2026 | ✅ |

  - Mức căng thẳng: DESI+BBN vs SH0ES **4,5σ** (không cần CMB) ✅; SPT-3G vs SH0ES 6,2σ ✅; H0DN vs CMB 7,1σ ✅. → "~5σ" là con số an toàn cho phát biểu chung, nhưng **các bản 2025–2026 cho 4,5–7σ tùy tổ hợp**.
  - Không tìm thấy kết quả H₀ lớn mới công bố trong 7–11/2026 (tìm kiếm hạn chế) ⚠️.
- **Tuổi Hubble** (tự tính ⚠️): 1/H₀ = **14,51 tỷ năm** (H₀ = 67,4); 13,39 tỷ năm (H₀ = 73). Gần tuổi thực 13,79 vì giãn nở chậm dần rồi nhanh dần "bù trừ" một cách tình cờ.
- **Bán kính Hubble** c/H₀ = **14,51 tỷ năm ánh sáng** (H₀ = 67,4) ⚠️ tự tính. Con số "14,4" tương ứng H₀ ≈ 67,9 → nếu dùng Planck 2018 thì viết **~14,5**. Xa hơn khoảng cách này, vận tốc lùi xa (định nghĩa bằng tốc độ thay đổi khoảng cách riêng) vượt c. Bán kính Hubble ≠ chân trời hạt; ta **vẫn thấy** thiên hà hiện nay lùi xa nhanh hơn c.
- **Bán kính vũ trụ quan sát được ~46,5 tỷ năm ánh sáng (comoving)** – xem `thang-bac-vu-tru.md` §8. Tự tính với Planck 2018 (có bức xạ + neutrino): **46,1 tỷ năm ánh sáng** ⚠️; con số 46,5 đến từ tham số cũ hơn (Planck 2015). Viết "khoảng 46 tỷ năm ánh sáng". **Vì sao > 13,8:** ánh sáng đi 13,8 tỷ năm, nhưng trong lúc đó không gian sau lưng nó tiếp tục giãn; khoảng cách *hiện nay* tới nguồn phát lớn hơn quãng ánh sáng đã đi.

### (c) Hiểu lầm phổ biến
- *"Thiên hà chạy xa nhanh hơn ánh sáng vi phạm thuyết tương đối."* → Tương đối hẹp cấm vượt c **cục bộ** (vật vượt qua vật khác tại cùng một chỗ). Vận tốc lùi xa do không gian giãn không phải chuyển động qua không gian; thuyết tương đối rộng cho phép.
- *"Vũ trụ giãn nở nên Trái Đất, Hệ Mặt Trời, nguyên tử cũng giãn ra."* → Hệ liên kết bằng hấp dẫn (thiên hà, nhóm thiên hà Địa phương) hay lực điện từ (nguyên tử) giữ nguyên kích thước; giãn nở chỉ thấy ở quy mô giữa các nhóm/đám thiên hà.
- *"Dịch chuyển đỏ vũ trụ là hiệu ứng Doppler."* → Gần đúng khi z nhỏ; đúng hơn là bước sóng bị kéo dãn cùng không gian: 1 + z = a(hiện nay)/a(lúc phát).
- *"Hubble phát hiện vũ trụ giãn nở một mình."* → Lemaître (1927) và Friedmann (1922, lý thuyết), Slipher (dịch chuyển đỏ 1912–1917) đi trước; đó là lý do IAU 2018 khuyến nghị đổi tên.

### (d) Thuật ngữ
định luật Hubble–Lemaître (Hubble–Lemaître law) · hằng số Hubble (Hubble constant, H₀) · megaparsec (Mpc) · vận tốc lùi xa (recession velocity) · thời gian Hubble (Hubble time) · bán kính/khối cầu Hubble (Hubble radius/sphere) · chân trời hạt (particle horizon) · vũ trụ quan sát được (observable universe) · khoảng cách đồng chuyển động (comoving distance) · hệ số tỉ lệ (scale factor, a) · căng thẳng Hubble (Hubble tension).

---

## 4. Năng lượng tối (dark energy)

### (a) Định nghĩa gốc
- NASA "Building blocks": *"The universe is made up of three components: normal or visible matter (5%), dark matter (27%), and dark energy (68%)."* ✅ https://science.nasa.gov/universe/overview/building-blocks/
- NASA (bản lưu 2017): mọi vật chất thường *"adds up to less than 5% of the universe"*; giới khoa học biết về năng lượng tối còn ít hơn về vật chất tối ✅ (web archive science.nasa.gov/astrophysics/focus-areas/what-is-dark-energy).
- IAU OAE có mục "Dark Energy" ⚠️ chưa tra được – cần chép từ astro4edu.org.

### (b) Con số then chốt
- **Phát hiện 1998:** Supernova Cosmology Project (Perlmutter, LBNL, bắt đầu 1988) và High-z Supernova Search Team (Schmidt lập 1994; Riess) – hơn 50 SN Ia xa mờ hơn dự kiến → giãn nở tăng tốc ✅. **Nobel Vật lý 2011:** *"for the discovery of the accelerating expansion of the Universe through observations of distant supernovae"*; Perlmutter ½, Schmidt ¼, Riess ¼ ✅ https://www.nobelprize.org/prizes/physics/2011/
- **Ω_Λ = 0,6847 ± 0,0073** (Planck 2018, Bảng 2) ⚠️ trích đoạn không hiện số; Ωm = 0,315 ± 0,007 ✅ → Ω_Λ ≈ 1 − Ωm ≈ 0,685 (vũ trụ phẳng) nhất quán.
- **Hằng số vũ trụ:** Einstein đưa vào 1917 để có vũ trụ tĩnh ⚠️ (kiến thức chuẩn; chưa đối chiếu trong phiên). Giai thoại "sai lầm lớn nhất đời" chỉ có qua lời kể của Gamow – không nên trích như lời Einstein ⚠️.
- **Thời điểm bắt đầu tăng tốc** (tự tính ⚠️): gia tốc đổi dấu khi Ωm(1+z)³ = 2Ω_Λ → **z ≈ 0,63**, thời gian nhìn lại **~6,1 tỷ năm** (vũ trụ ~7,7 tỷ tuổi). Khớp khoảng "5–6 tỷ năm trước, z ≈ 0,6–0,7" thường dẫn; viết **"khoảng 6 tỷ năm trước"**. Lưu ý: năng lượng tối *chiếm ưu thế về mật độ* muộn hơn (z ≈ 0,3, ~3,5 tỷ năm trước) ⚠️ – đừng lẫn hai mốc.
- **Mật độ năng lượng tối** (tự tính ⚠️): ρ_crit = 3H₀²/(8πG) = 8,53 × 10⁻²⁷ kg/m³; ρ_Λ = Ω_Λ·ρ_crit = **5,8 × 10⁻²⁷ kg/m³** ≈ **3,5 nguyên tử hydro mỗi mét khối** (m_H = 1,6735 × 10⁻²⁷ kg); mật độ năng lượng ρc² ≈ 5,3 × 10⁻¹⁰ J/m³. (Con số "6 × 10⁻²⁷" là làm tròn; với H₀ = 73 sẽ lớn hơn ~17%.)
- **DESI DR2 (19–20/3/2025):** mô hình năng lượng tối biến thiên (w₀wₐ) được ưa hơn ΛCDM ở **3,1σ** (DESI BAO + CMB), **2,8–4,2σ** khi thêm siêu tân tinh tùy mẫu ✅ (arXiv:2503.14738; UT Dallas, Waterloo, ScienceDaily). Hướng ưa: w₀ > −1, wₐ < 0 → năng lượng tối **có thể đang yếu đi** ✅. Riêng dữ liệu DESI vẫn nhất quán với ΛCDM ✅ (Utah). Chưa đạt 5σ ✅.
  - Phê bình: Efstathiou (2025) cho rằng kết quả rất nhạy với sai số hệ thống nhỏ của mẫu siêu tân tinh ✅ (trích đoạn). Mức chắc chắn: **đang tranh luận**.
  - DESI DR5 (5 năm) dự kiến 2027 ⚠️ (nguồn thứ cấp).
- **Euclid (ESA):** DR1 ban đầu dự kiến 21/10/2026; ESA cập nhật 15/6/2026: chia hai giai đoạn, **"DR1-Foundation" 11/2026 (~1 900 deg²)**, bản đầy đủ khoảng giữa 2027 ✅/⚠️ https://www.cosmos.esa.int/web/euclid/dr1-timeline . Tính đến 07/11/2026 chưa thấy công bố – **dữ kiện có hạn dùng, cần kiểm lại trước khi đăng**.

### (c) Hiểu lầm phổ biến
- *"Năng lượng tối và vật chất tối là một."* → Ngược nhau về tác dụng: vật chất tối **hút** (giữ thiên hà, tạo cấu trúc), phân bố vón cục; năng lượng tối gây **gia tốc giãn nở**, phân bố gần như đều khắp, mật độ không loãng đi khi không gian giãn (nếu là hằng số vũ trụ).
- *"Đã chứng minh năng lượng tối thay đổi theo thời gian (DESI)."* → Mới là dấu hiệu 2,8–4,2σ, phụ thuộc tổ hợp dữ liệu; chưa đạt ngưỡng phát hiện.
- *"68% nghĩa là năng lượng tối chiếm nhiều chỗ nhất."* → Đây là tỉ lệ **mật độ năng lượng** tổng hiện nay; tỉ lệ thay đổi theo thời gian (vũ trụ sớm hầu như không có vai trò của năng lượng tối).

### (d) Thuật ngữ
năng lượng tối (dark energy) · hằng số vũ trụ (cosmological constant, Λ) · giãn nở gia tốc (accelerating expansion) · siêu tân tinh loại Ia (type Ia supernova) – "ngọn nến chuẩn" (standard candle) · phương trình trạng thái (equation of state, w) · mật độ tới hạn (critical density) · tham số mật độ (density parameter, Ω) · vật chất tối (dark matter) – khác năng lượng tối.

---

## 5. Danh sách điểm chưa đối chiếu được (cần mở nguồn trước khi đăng)

1. **Planck 2018 Bảng 2:** tuổi 13,787 ± 0,020; Ω_Λ = 0,6847 ± 0,0073; z* = 1089,92 – chỉ có từ bảng thứ cấp / trí nhớ / tự tính; mở arXiv:1807.06209.
2. **Câu NASA "không phải vụ nổ trong không gian"**: chưa tìm thấy nguyên văn trên science.nasa.gov; chỉ có video STScI/Universe of Learning và nguồn phổ thông.
3. **H₀ lịch sử:** Hubble 1929 "~500" (trích đoạn ghi 600) và Lemaître 1927 "~625" – chưa thấy nguồn gốc. Kiểm PNAS 15, 168 (1929) và bản dịch MNRAS 1931 (đoạn ước tính H bị lược).
4. **Kết quả bỏ phiếu IAU 78/20/2%**: chỉ thấy ở Astronomy.com.
5. **Ngày tháng COBE/WMAP/Planck** (phóng, công bố) và Penzias–Wilson 1964/1965: hết hạn mức tìm kiếm trước khi kiểm.
6. **Y_p chính xác PDG chọn** và khung "3–20 phút"; bài toán ⁷Li (thừa ~3 lần).
7. **"~1% nhiễu TV analog"**: không có nguồn chính thống; các nguồn phổ thông lệch nhau.
8. **Định nghĩa IAU OAE** cho CMB, Dark Energy, Hubble–Lemaître law, Redshift – cần chép nguyên văn.
9. **Mốc lạm phát, sao đầu tiên, kết thúc tái ion hoá, tái kết hợp 380 000 năm**: chưa có trích đoạn NASA/ESA trong phiên này (tự tính tái kết hợp: ~372 000 năm).
10. **Einstein 1917 và giai thoại "sai lầm lớn nhất"**: chưa kiểm.
11. **Euclid DR1-Foundation (11/2026)** và kết quả H₀/năng lượng tối mới trong 7–11/2026: cần kiểm ngay trước khi đăng.
12. **Bán kính vũ trụ quan sát được**: 46,5 (phổ biến) vs 46,1 (tự tính Planck 2018) tỷ năm ánh sáng – nên viết "khoảng 46 tỷ".

---

### Danh sách nguồn chính
- IAU OAE Big Bang Theory: https://astro4edu.org/resources/glossary/term/38/
- IAU iau1812 (29/10/2018): https://www.iau.org/news/pressreleases/detail/iau1812/ ; ann18048: https://www.iau.org/news/announcements/detail/ann18048/ ; bài arXiv "Hubble Law or Hubble-Lemaître Law? The IAU Resolution" (tác giả chưa kiểm): https://arxiv.org/abs/1809.02557
- Planck 2018 VI: https://ui.adsabs.harvard.edu/abs/2020A%26A...641A...6P/abstract
- Fixsen 2009: https://arxiv.org/abs/0911.1955
- Alpher & Herman (lịch sử): https://arxiv.org/abs/1411.0172
- Luminet về Lemaître 1931: https://arxiv.org/abs/1105.6271
- Kragh, Nature 2024 (Hoyle và tên "Big Bang"): https://doi.org/10.1038/d41586-024-00894-z
- PDG BBN review 2025: https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf
- Nobel 1978 / 2006 / 2011: https://www.nobelprize.org/prizes/physics/1978/ ; /2006/ ; /2011/
- NASA WMAP: https://map.gsfc.nasa.gov/universe/ ; https://map.gsfc.nasa.gov/cosmology/cosmology.html
- NASA Building blocks: https://science.nasa.gov/universe/overview/building-blocks/
- ACT DR6: https://arxiv.org/abs/2503.14452 ; DESI DR2 II: https://arxiv.org/abs/2503.14738 ; tổng quan căng thẳng Hubble 2026: https://arxiv.org/abs/2606.20434
- DESI 2025 thông cáo: https://www.sciencedaily.com/releases/2025/03/250320214311.htm ; https://news.utdallas.edu/science-technology/desi-results-dark-energy-2025
- Euclid DR1 timeline: https://www.cosmos.esa.int/web/euclid/dr1-timeline
