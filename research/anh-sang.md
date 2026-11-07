# Chương 2 – Ánh sáng, nguồn thông tin duy nhất: số liệu và định nghĩa có nguồn

> Tài liệu nghiên cứu nội bộ cho "Thấu hiểu vũ trụ" (Into the Cosmos). **Ngày tra cứu: 07/11/2026.** File này chỉ ghi dữ kiện, không phải bài viết.
>
> **Phương pháp:** Không mở trực tiếp nasa.gov/arxiv (mạng của phiên bị hạn chế). Mọi số liệu được đối chiếu qua **trích đoạn kết quả công cụ tìm kiếm**. Câu "nguyên văn" là những gì trích đoạn hiển thị; trước khi đăng cần mở trang để chép lại chính xác.
> - ✅ **Đã đối chiếu**: thấy trong trích đoạn của nguồn chính thống (NASA/ESA/IAU/đài quan sát) hoặc bài bình duyệt.
> - ⚠️ **Cần kiểm lại**: nguồn thứ cấp, tự tính (có ghi công thức), hoặc chưa thấy nguyên văn.
>
> **Nguồn định nghĩa chính:**
> - IAU OAE astro4edu (CC BY 4.0, ghi công "IAU OAE"): https://astro4edu.org/resources/glossary/search/
> - NASA Science, Tour of the Electromagnetic Spectrum: https://science.nasa.gov/ems/
> - NASA Imagine the Universe (bản lưu UNT): https://webarchive.library.unt.edu/web/20130214005935/http://imagine.gsfc.nasa.gov/docs/science/know_l2/emspectrum.html

---

## 0. Câu hỏi lớn và sơ đồ liên hệ

**Câu hỏi lớn gợi ý:** "Chúng ta biết gì về những nơi không bao giờ đến được, và biết bằng cách nào?"
Câu phụ: "Làm sao biết một ngôi sao làm bằng gì?", "Làm sao biết một thiên hà đang lùi xa?", "Vì sao phải đưa kính thiên văn lên vũ trụ?"

**Sợi chỉ xuyên suốt:** Trừ vài ngoại lệ (thiên thạch, tia vũ trụ, neutrino, sóng hấp dẫn, mẫu vật do tàu mang về), mọi hiểu biết về vũ trụ xa đến từ bức xạ điện từ. Ánh sáng mang ba loại thông tin: **màu/phân bố năng lượng** (→ nhiệt độ, định luật Wien), **vạch phổ** (→ thành phần hoá học), **độ lệch của vạch** (→ chuyển động và giãn nở, dịch chuyển đỏ). Khí quyển chỉ cho một phần phổ đi qua → phải lên không gian.
⚠️ "Nguồn thông tin duy nhất" là cách nói hơi quá; nên viết "gần như duy nhất" và nhắc ngoại lệ (nhất là sóng hấp dẫn từ 2015, neutrino SN 1987A).

```
PHỔ ĐIỆN TỪ (c = λν, E = hν)
   │ gamma · X · UV · KHẢ KIẾN · hồng ngoại · vi sóng · vô tuyến
   │
   ├── Khí quyển chặn phần lớn ──► chỉ "cửa sổ quang học" + "cửa sổ vô tuyến" (+ vài khe hồng ngoại)
   │                                 └──► KÍNH THIÊN VĂN KHÔNG GIAN (Hubble, Chandra, JWST, Euclid, Roman)
   │                                      + nhiễu loạn (seeing) ──► quang học thích ứng ở mặt đất
   ▼
QUANG PHỔ: liên tục (vật nóng, Wien → nhiệt độ) / vạch phát xạ / vạch hấp thụ (Kirchhoff)
   │  vạch = "vân tay" nguyên tố (Fraunhofer 1814 → Kirchhoff–Bunsen 1859 → He 1868 → Payne 1925)
   ▼
DỊCH CHUYỂN của vạch: z = (λ_obs − λ_emit)/λ_emit
   ├── Doppler (chuyển động: Andromeda xanh, Slipher 1912)
   ├── Vũ trụ học (không gian giãn: 1+z = a_now/a_then → thiên hà xa nhất z ≈ 14,44)
   └── Hấp dẫn
   ▼ (z rất lớn đẩy UV/khả kiến sang hồng ngoại → cần JWST ở L2, lạnh < 50 K)
```

---

## 1. Phổ điện từ (electromagnetic spectrum)

### (a) Định nghĩa gốc
- **Electromagnetic radiation** (IAU OAE, term 96): mục này liệt kê các dải theo bước sóng tăng dần: tia gamma, tia X, tử ngoại, ánh sáng khả kiến, hồng ngoại, dưới milimét, sóng vô tuyến (gồm milimét/vi sóng). https://astro4edu.org/resources/glossary/term/96 ✅ (trích đoạn diễn giải, chưa có câu nguyên văn). astro4edu không có mục riêng "electromagnetic spectrum".
- **ESO Astronomical Glossary**: phổ điện từ là toàn bộ dải năng lượng của bức xạ điện từ được quan sát; một số vùng chia nhỏ hơn (cận hồng ngoại, tử ngoại xa). https://www.eso.org/public/outreach/glossary/glossary_e ✅ (diễn giải)
- **NASA Science (Visible Light)**: *"the segment of the electromagnetic spectrum that the human eye can view"*; *"Violet has the shortest wavelength, at around 380 nanometers, and red has the longest wavelength, at around 700 nanometers."* https://science.nasa.gov/ems/09_visiblelight/ ✅

### (b) Con số then chốt
- **c = λν**, **E = hν = hc/λ**; c = 299 792 458 m/s (chính xác theo định nghĩa SI), h = 6,626 070 15 × 10⁻³⁴ J·s (chính xác, SI 2019). ⚠️ (kiến thức chuẩn, không tra trong phiên này; nguồn: BIPM SI Brochure).
- **Ranh giới ánh sáng khả kiến — các nguồn lệch nhau:** NASA 380–700 nm ✅; Live Science ~380–740 nm; nhiều tài liệu (CIE) 380–780 nm; đề bài ghi ~380–750 nm. Ranh giới là quy ước (độ nhạy mắt giảm dần). **Nên viết "khoảng 380–750 nm" hoặc theo NASA "khoảng 380 đến 700 nm", kèm chữ "khoảng".** ⚠️
- **Ranh giới các dải (quy ước thường dùng, ⚠️ chưa có bảng NASA trong trích đoạn):** gamma < ~0,01 nm; X ~0,01–10 nm; UV ~10–380 nm; khả kiến ~380–750 nm; hồng ngoại ~0,75 µm–1 mm; vi sóng ~1 mm–~30 cm (có tài liệu xếp vi sóng chồng lên vô tuyến); vô tuyến > ~1 mm. Ranh giới gamma/X thực ra định theo nguồn gốc (hạt nhân vs electron) hơn là bước sóng. Cần bảng NASA science.nasa.gov/ems để trích.
- **Ví dụ tự tính** ⚠️: λ = 500 nm → ν = c/λ ≈ 6,0 × 10¹⁴ Hz; E ≈ 2,48 eV. Vạch 21 cm của hydro → ν ≈ 1 420 MHz (giá trị đo 1 420,405 751 MHz).
- **Khí quyển chặn những dải nào:**
  - NASA Imagine (bản lưu): bức xạ từ không gian chỉ tới mặt đất ở vài vùng bước sóng như khả kiến và vô tuyến; một phần hồng ngoại đến được đỉnh núi/máy bay. ✅ (trích đoạn diễn giải)
  - NASA EMS: phần lớn bức xạ tử ngoại của Mặt Trời bị khí quyển chặn. ✅
  - Cơ chế: ozone hấp thụ UV (tầng bình lưu); O và N ở tầng nhiệt hấp thụ gần hết X và gamma; hơi nước (và CO₂) ở tầng thấp hấp thụ phần lớn hồng ngoại. Nguồn: IPAC Caltech "Observing Across the Spectrum" https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html ✅ (trích đoạn).
  - **Cửa sổ quang học:** từ ngưỡng ozone ~295 nm (2 950 Å) tới vùng đỏ/cận hồng ngoại (dải O₂ "A" 760 nm), cộng vài khe hồng ngoại (ví dụ 3–4 µm, Penn State ASTRO 801 https://e-education.psu.edu/astro801/content/l3_p4.html). ⚠️ (Wikipedia + giáo trình đại học)
  - **Cửa sổ vô tuyến:** khoảng ~1 mm đến ~30 m (≈ 10 MHz–300 GHz); đầu dài bị tầng điện li phản xạ (< ~10 MHz), đầu ngắn bị hơi nước/O₂ hấp thụ. NRAO GBT primer: https://www.gb.nrao.edu/GBTopsdocs/primer/atmospheric__windows_.htm ✅ (đài quan sát; trích đoạn có "5 MHz to over 300 GHz" xuất phát từ Wikipedia — **lệch: 5 MHz vs 10 MHz**, tuỳ trạng thái tầng điện li).

### (c) Hiểu lầm phổ biến
1. **"Ánh sáng chỉ là thứ mắt thấy."** → Ánh sáng khả kiến là một khoảng rất hẹp (dưới một bậc 2 về bước sóng) trong phổ trải hơn 15 bậc độ lớn; sóng vô tuyến, tia X đều là cùng một hiện tượng, khác bước sóng. (NASA EMS) ✅
2. **"Sóng vô tuyến là âm thanh."** → Sóng vô tuyến là bức xạ điện từ, truyền được trong chân không với tốc độ c; âm thanh là dao động cơ học cần môi trường. ⚠️ (kiến thức chuẩn)
3. **"Ảnh hồng ngoại/tia X của NASA là màu thật."** → Là ảnh màu quy ước (representative color) ánh xạ bước sóng không nhìn thấy sang màu thấy được. ⚠️ (cần trích trang "Webb image processing" của STScI)

### (d) Thuật ngữ
phổ điện từ (electromagnetic spectrum); bức xạ điện từ (electromagnetic radiation); bước sóng (wavelength, λ); tần số (frequency, ν); photon; tia gamma (gamma rays); tia X (X-rays); tử ngoại / cực tím (ultraviolet, UV); ánh sáng khả kiến (visible light); hồng ngoại (infrared, IR); vi sóng (microwaves); sóng vô tuyến (radio waves); cửa sổ khí quyển (atmospheric window); cửa sổ quang học (optical window); cửa sổ vô tuyến (radio window); tầng điện li (ionosphere).

---

## 2. Quang phổ và vạch hấp thụ (spectroscopy, absorption lines)

### (a) Định nghĩa gốc
- Chưa tìm được mục "absorption line"/"spectrum" của IAU OAE trong trích đoạn. ⚠️
- **McDonald Observatory glossary**: vạch hấp thụ là vạch tối cho thấy năng lượng bị hấp thụ ở một bước sóng nhất định; đo các vạch này để xác định nguyên tố có mặt. https://mcdonaldobservatory.org/glossary/term/32 ✅ (diễn giải)
- **Ba định luật Kirchhoff** (dạng giáo trình, ⚠️ chưa có nguyên văn NASA): (1) vật rắn/lỏng/khí đặc nóng phát phổ liên tục; (2) khí loãng nóng phát phổ vạch phát xạ; (3) khí loãng lạnh hơn đặt trước nguồn phổ liên tục tạo vạch hấp thụ, ở đúng các bước sóng mà khí đó phát xạ khi nóng.

### (b) Con số then chốt
- **Lịch sử:**
  - 1802: Wollaston lần đầu ghi nhận vài vạch tối. 1814: Fraunhofer độc lập phát hiện lại, đo vị trí có hệ thống. ⚠️ (trích đoạn Wikipedia + arXiv 2510.21747)
  - **Số vạch của Fraunhofer — lệch nhau:** thường nói "574" (bảng tổng hợp trong arXiv:2510.21747 https://arxiv.org/html/2510.21747v1 ghi tổng "documented" 574, có vùng chỉ ghi "nhiều tương đương"). Một số nguồn phổ thông ghi "hơn 500" hoặc "~570". **Nên viết "khoảng 570" hoặc "hơn 500".** ⚠️
  - 1859–1860: Kirchhoff và Bunsen chỉ ra vạch tối trùng vạch phát xạ của nguyên tố nung nóng → natri có trong khí quyển Mặt Trời. Trình bày tại Berlin 10/1859, bài báo 1860. ⚠️ (nguồn lịch sử thứ cấp; Spectroscopy Online "Happy sesquicentennial spectroscopy")
  - 1868: helium. Janssen ghi được vạch vàng trong nhật thực 18/8/1868 ở Ấn Độ; Lockyer độc lập (10/1868), đặt tên D3; Lockyer & Frankland đặt tên "helium". Vạch D3 ≈ 587,56 nm (Wikipedia: 587,5618 nm; một nguồn ghi 587,49 nm — **lệch**). Ramsay tách được helium trên Trái Đất năm 1895. ⚠️ (Physics Today, APS News https://aps.org/publications/apsnews/201409/physicshistory.cfm; ngày báo cáo của Lockyer lệch: 20/10 hay 26/10)
  - 1925: Cecilia Payne, luận án *Stellar Atmospheres* (Radcliffe/Harvard), cho thấy hydro và helium áp đảo trong khí quyển sao. Russell phản đối; luận án viết kết quả là "almost certainly not real" (**nguồn lệch:** APS nói Russell thuyết phục bà bỏ kết luận; nguồn khác nói chỉ làm nhẹ đi). APS News 01/2015: https://www.aps.org/apsnews/2015/01/cecilia-payne-gaposchkin-universe-changed ✅ (trích đoạn)
- **Bước sóng chuẩn (trong không khí):**
  - Hα 656,279 nm; Hβ 486,135; Hγ 434,047; Hδ 410,173 nm. ✅ khớp đề bài (trích đoạn từ bảng Wikipedia "Balmer series", gốc NIST ASD — ⚠️ chưa mở NIST).
  - Ca II K 393,366 nm; Ca II H 396,847 nm. ⚠️ (H thấy trong trích đoạn; K là giá trị chuẩn chưa thấy trực tiếp).
  - Na D2 588,995 nm; Na D1 589,592 nm (tâm cặp ~589,29). ✅ (bảng Fraunhofer lines)
  - "Mg b": b1 Mg 518,362; b2 Mg 517,270; b4 Mg 516,733 nm; **b3 516,891 nm là sắt (Fe)**, không phải Mg. → viết "nhóm vạch b của magie quanh 516,7–518,4 nm". ✅ (bảng Fraunhofer lines)
- **Định luật Wien:** λ_max = b/T, b = 2,897 771 955 × 10⁻³ m·K (CODATA). ⚠️ (giá trị chuẩn, chưa tra trong phiên)
- **Nhiệt độ Mặt Trời:** IAU 2015 Resolution B3, nhiệt độ hiệu dụng danh định **5 772 K** (ước tính tốt nhất 5 772,0 ± 0,8 K). https://www.iau.org/common/Uploaded%20files/IAUGA2015-Resolution-B3-recommended-nominal-conversion.pdf ✅. Nhiều tài liệu cũ dùng 5 777–5 780 K.
  - **Tự tính** ⚠️: 2,8978 × 10⁻³ / 5 772 = 5,020 × 10⁻⁷ m → **λ_max ≈ 502 nm** (lục lam). Lưu ý: đỉnh phụ thuộc cách vẽ phổ (theo bước sóng hay tần số); theo tần số đỉnh ở ~880 nm. Đừng viết "Mặt Trời màu xanh lá".

### (c) Hiểu lầm phổ biến
1. **"Vạch tối là chỗ không có ánh sáng."** → Là chỗ ánh sáng *ít hơn* nền liên tục vì bị hấp thụ (rồi phát lại theo mọi hướng). (McDonald glossary) ✅
2. **"Quang phổ chỉ cho biết thành phần."** → Còn cho nhiệt độ, mật độ/áp suất (độ rộng vạch), từ trường (Zeeman), vận tốc xuyên tâm (Doppler). ⚠️ (giáo trình)
3. **"Mặt Trời là quả cầu lửa/sắt nóng."** → Payne 1925 chứng minh khí quyển sao chủ yếu là H và He; ngày nay ~74% H, ~24% He theo khối lượng. ⚠️ (trích đoạn Wikipedia; cần nguồn Asplund et al. 2009/2021)

### (d) Thuật ngữ
quang phổ (spectrum, số nhiều spectra); quang phổ học (spectroscopy); máy quang phổ (spectrograph); phổ liên tục (continuous spectrum); vạch phát xạ (emission line); vạch hấp thụ (absorption line); vạch Fraunhofer (Fraunhofer lines); dãy Balmer (Balmer series); bức xạ vật đen (blackbody radiation); định luật dịch chuyển Wien (Wien's displacement law); nhiệt độ hiệu dụng (effective temperature).

---

## 3. Dịch chuyển đỏ và dịch chuyển xanh (redshift, blueshift)

### (a) Định nghĩa gốc
- **Redshift** (IAU OAE, term 471): từ này có thể chỉ ba hiệu ứng: Doppler (nguồn lùi xa làm ánh sáng giãn sang bước sóng dài), vũ trụ học (không gian giãn nở kéo giãn ánh sáng), hấp dẫn (photon mất năng lượng khi thoát khỏi giếng thế hấp dẫn); đo dịch chuyển đỏ cho thông tin về khoảng cách, vị trí và chuyển động của thiên hà. Trích đoạn có cụm *"the source emitting the electromagnetic radiation is moving away from the observer"*. https://astro4edu.org/resources/glossary/term/471/ ✅

### (b) Con số then chốt
- **Công thức** (giáo trình, ⚠️): z = (λ_obs − λ_emit)/λ_emit; Doppler cổ điển z ≈ v/c (v ≪ c); tương đối tính 1 + z = √((1+β)/(1−β)), β = v/c; vũ trụ học 1 + z = a(t_now)/a(t_emit) — **không phải** vận tốc qua không gian; z > 1 không có nghĩa nhanh hơn ánh sáng.
- **Vesto Slipher (Lowell Observatory):** 9/1912 chụp phổ Andromeda; bài 1913: tiến lại ~300 km/s. Tới 1917: phổ 25 tinh vân xoắn ốc, đa số dịch đỏ (**lệch:** 4 hay 3 cái dịch xanh). Nguồn: O'Raifeartaigh, arXiv:1212.5499 https://arxiv.org/abs/1212.5499 ✅ (trích đoạn)
- **Andromeda — hai con số khác hệ quy chiếu, không mâu thuẫn:**
  - **−300 ± 4 km/s** (McConnachie 2012) hoặc −301 km/s (van der Marel & Guhathakurta 2008): **vận tốc xuyên tâm nhật tâm (heliocentric)** — chính là con số Slipher đo; gồm cả chuyển động của Mặt Trời quanh tâm Ngân Hà (~220–240 km/s về phía Andromeda). ✅
  - **−109,3 ± 4,4 km/s**: vận tốc xuyên tâm của M31 so với tâm Ngân Hà (van der Marel et al. 2012, ApJ 753, 8; arXiv:1205.6864 https://arxiv.org/abs/1205.6864) ✅. NASA/STScI 2012: "about 250,000 mph" (≈ 400 000 km/h ≈ 110 km/s). https://www.stsci.edu/contents/news-releases/2012/news-2012-20 ✅
  - **Viết:** "Andromeda tiến về Ngân Hà khoảng 110 km/s; nhìn từ Mặt Trời, vạch phổ của nó dịch xanh tương ứng ~300 km/s."
  - Tự tính ⚠️: Hα dịch xanh 656,28 × 300/299 792 ≈ 0,66 nm → đo được ~655,62 nm.
  - ⚠️ Cập nhật 2025 (Sawala et al., Nature Astronomy, Hubble + Gaia): xác suất va chạm trong 10 tỉ năm ~50%, không còn "chắc chắn trong 4 tỉ năm". (aura-astronomy.org 2025 ✅ trích đoạn). Không thuộc trọng tâm chương nhưng đừng viết "chắc chắn va chạm".
- **Thiên hà xa nhất đã xác nhận bằng quang phổ (tính tới 07/11/2026):**
  - **MoM-z14, z = 14,44 (±0,02)**, JWST/NIRSpec (khảo sát Mirage or Miracle, quan sát 4/2025). Naidu et al., "A Cosmic Miracle: A Remarkably Luminous Galaxy at z_spec = 14.44 Confirmed with JWST", arXiv:2505.11263 (5/2025), đăng **Open Journal of Astrophysics, 01/2026** (bình duyệt). Ánh sáng rời thiên hà ~280 triệu năm sau Vụ Nổ Lớn, đi ~13,5 tỉ năm. https://arxiv.org/abs/2505.11263 ✅
  - **JADES-GS-z14-0 — chỗ lệch quan trọng:** Carniani et al. 2024 (Nature) ban đầu z = **14,32** (+0,08/−0,20) từ phổ prism NIRSpec (điểm gãy Lyman, độ chính xác thấp). Sau đó ALMA bắt được vạch [O III] 88 µm: **z = 14,1796 ± 0,0007** (Carniani et al., arXiv:2409.20533) và **14,1793 ± 0,0007** (Schouws et al., ApJ 988, arXiv:2409.20549). ✅ → **Dùng 14,18**, không dùng 14,32.
  - Không tìm thấy kỷ lục mới hơn MoM-z14 tới 07/11/2026 (tìm kiếm mở rộng). ⚠️ Kiểm lại trước khi đăng (Live Science, NASA Webb news). Có ứng viên quang trắc z cao hơn nhưng *chưa* xác nhận bằng phổ — đừng nhầm.
  - Tự tính ⚠️: Lyman-α (121,567 nm) ở z = 14,44 quan sát ở 121,567 × 15,44 ≈ **1 877 nm (1,88 µm)** — tia tử ngoại đã thành hồng ngoại; đây là lý do JWST được thiết kế cho hồng ngoại.

### (c) Hiểu lầm phổ biến
1. **"Dịch chuyển đỏ nghĩa là vật đỏ hơn."** → Là mọi bước sóng bị kéo dài cùng tỉ lệ (1+z); vật có thể vẫn "xanh", và tia UV có thể bị dịch thành hồng ngoại. (IAU OAE) ✅
2. **"Thiên hà xa lùi ra xa nhanh hơn ánh sáng nên vi phạm thuyết tương đối."** → Dịch chuyển đỏ vũ trụ học do không gian giãn, không phải chuyển động trong không gian; không dùng công thức Doppler cho z lớn. ⚠️ (giáo trình; Davis & Lineweaver 2004, PASA 21, 97 — chưa kiểm trong phiên)
3. **"Mọi thiên hà đều lùi xa."** → Thiên hà gần, ràng buộc hấp dẫn (Andromeda) có thể dịch xanh. (Slipher 1912/1913) ✅

### (d) Thuật ngữ
dịch chuyển đỏ (redshift, z); dịch chuyển xanh (blueshift); hiệu ứng Doppler (Doppler effect); vận tốc xuyên tâm / vận tốc theo phương nhìn (radial velocity, line-of-sight velocity); nhật tâm (heliocentric); dịch chuyển đỏ vũ trụ học (cosmological redshift); dịch chuyển đỏ hấp dẫn (gravitational redshift); hệ số tỉ lệ (scale factor, a); xác nhận bằng quang phổ (spectroscopic confirmation); dịch chuyển đỏ trắc quang (photometric redshift).

---

## 4. Vì sao cần kính thiên văn ngoài không gian

### (a) Định nghĩa gốc
- IPAC Caltech: những dải không tới được mặt đất buộc phải quan sát từ không gian; kính ngoài không gian còn tránh được hiệu ứng làm nhoè của khí quyển. https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html ✅ (trích đoạn)
- **Seeing** (nhiễu loạn khí quyển): độ nhoè ảnh sao do không khí hỗn loạn, đo bằng độ rộng nửa cực đại tính theo giây cung. ⚠️ (chưa có nguyên văn IAU/ESO)

### (b) Con số then chốt
- **Giới hạn nhiễu xạ:** θ ≈ 1,22 λ/D (rad, tiêu chuẩn Rayleigh). Tự tính ⚠️ (1 rad = 206 265″):
  - Hubble D = 2,4 m, λ = 550 nm → θ ≈ 2,80 × 10⁻⁷ rad ≈ **0,058″**.
  - JWST D = 6,5 m, λ = 2 µm → θ ≈ **0,077″**.
  - Kính 8 m mặt đất, λ = 550 nm → ~0,017″ trên lý thuyết, nhưng seeing hạn chế ở ~0,5–1″ → khí quyển, không phải gương, là giới hạn.
- **Seeing thực tế:** Paranal (ESO), MASS-DIMM ở 500 nm, trung vị **0,76″** (bách phân vị 10%: 0,52″) (GRAVITY+ paper, arXiv:2206.00684) ✅; số liệu 1989–1995: trung vị La Silla 0,87″, Paranal 0,66″ ✅ (A&AS 2000). "~1″ là tốt cho nơi đặt trung bình" (Wikipedia, ⚠️). → Viết "khoảng 0,5–1 giây cung ở những nơi tốt nhất".
- **Quang học thích ứng (adaptive optics):** gương biến dạng hiệu chỉnh hàng trăm lần mỗi giây theo sao dẫn đường (tự nhiên hoặc laser), tiến gần giới hạn nhiễu xạ nhưng chỉ trong trường nhìn nhỏ và chủ yếu ở hồng ngoại. ⚠️ (cần trích ESO "Adaptive Optics" page). AO **không** khắc phục hấp thụ: không làm tia X/UV xuyên qua khí quyển.
- **Hubble:** phóng **24/4/1990** (STS-31, Discovery; 12:33 UT) — ESA/Hubble Fact Sheet https://esahubble.org/about/general/fact_sheet/ ✅; gương chính **2,4 m** ✅.
  - **Độ cao — rất lệch, đang giảm:** ESA fact sheet cũ ~569 km lúc đầu; nhiều tài liệu 2010s ~540–547 km; NASA Hubble FAQ (bản hiện tại) "approximately 300 miles (483 km)" https://science.nasa.gov/mission/hubble/overview/faqs ✅ (trích đoạn, cần mở lại); báo cáo 02/2026 (The Register) "well below 500 km", một số liệu đầu 2026 ~485 km; infobox Wikipedia 2026 ~470–475 km ⚠️. Con số "~535 km" trong đề cương **đã lỗi thời**. → Viết "khoảng 480 km (năm 2026) và đang thấp dần do lực cản khí quyển". Dự báo rơi trung vị ~2033 nếu không nâng quỹ đạo (STScI, qua báo chí ⚠️); NASA phát RFI 29/10/2026 tìm phương án nâng quỹ đạo/đưa về có kiểm soát (⚠️ chỉ thấy qua bản tóm tắt tìm kiếm, cần kiểm).
- **JWST:** phóng **25/12/2021** (Ariane 5, Kourou) ✅; gương **6,5 m**, 18 đoạn lục giác beryllium mạ vàng, diện tích thu 25,4 m² (~6 lần Hubble) ⚠️ (trích đoạn thứ cấp); quỹ đạo quanh **L2, cách Trái Đất ~1,5 triệu km** (trích đoạn ghi 1 513 000 km) ✅; tới L2 khoảng 1 tháng sau phóng (24/1/2022).
  - **Tấm che nắng:** ~21 × 14 m (70 × 47 ft), "approximately the size of a tennis court", 5 lớp Kapton. NASA Webb blog https://blogs.nasa.gov/webb/ ✅
  - **Nhiệt độ — lệch:** NASA thường viết "below 50 K (−370 °F / **−223 °C**)"; một số tài liệu NASA/ScienceDaily ghi ~40 K (−233 °C). **−233 °C tương ứng 40 K, không phải 50 K** (đề cương ghép nhầm). MIRI còn được làm lạnh riêng xuống < 7 K (⚠️ chưa đối chiếu). → Viết "dưới 50 K (khoảng −223 °C)".
- **Chandra X-ray Observatory:** phóng 23/7/1999 (Columbia, STS-93). ⚠️ (trích đoạn yếu). Tia X chỉ quan sát được từ không gian. Tình trạng ngân sách 2025–2026 bị đe doạ cắt giảm — ⚠️ chưa kiểm, cần ghi ngày nếu nhắc.
- **Euclid (ESA):** phóng **1/7/2023**, Falcon 9 từ Cape Canaveral; ở L2; đang vận hành 2026 (lịch quan sát 9/2026 trong lưu trữ NASA ACROSS). DLR https://www.dlr.de/en/latest/news/2023/02/... ✅
- **Nancy Grace Roman Space Telescope (rất quan trọng, ghi ngày):** **đã phóng 30/8/2026, 7:26 sáng EDT**, Falcon Heavy, LC-39A Kennedy; sớm 9 tháng so với cam kết "không muộn hơn 5/2027". NASA Roman Launch https://science.nasa.gov/mission/roman-space-telescope/roman-launch/ ✅; NASA SVS recap https://svs.gsfc.nasa.gov/15089. Đang bay tới L2 (~3 tháng; dự kiến tới khoảng đầu 12/2026), sau đó ~90 ngày chạy thử; ảnh công bố đầu tiên dự kiến **đầu 2027**. ⚠️ (lịch trình qua nguồn thứ cấp). Gương 2,4 m, trường nhìn ~100 lần Hubble (⚠️ chưa đối chiếu trong phiên). **Tính tới 07/11/2026: chưa tới L2, chưa có ảnh khoa học.**

### (c) Hiểu lầm phổ biến
1. **"Kính lên vũ trụ để ở gần sao hơn."** → Hubble cao ~480 km; sao gần nhất (Proxima) cách ~4,0 × 10¹³ km — gần hơn khoảng 10⁻¹¹ lần, không đáng kể. Lý do thật: tránh hấp thụ và nhiễu loạn khí quyển (và với JWST: tránh nhiệt của Trái Đất). NASA Hubble FAQ ✅; tỉ lệ tự tính ⚠️ (480 / 4,0 × 10¹³ ≈ 1,2 × 10⁻¹¹).
2. **"Kính không gian luôn tốt hơn kính mặt đất."** → Gương Hubble 2,4 m nhỏ hơn nhiều kính mặt đất (GTC 10,4 m; VLT 8,2 m); mặt đất thắng về diện tích thu và quang phổ độ phân giải cao, nhất là có AO. Hai loại bổ sung nhau. ⚠️
3. **"JWST là Hubble thế hệ sau, chụp cùng loại ánh sáng."** → JWST chủ yếu hồng ngoại (0,6–28 µm), Hubble chủ yếu UV–khả kiến–cận hồng ngoại. ⚠️ (dải bước sóng chưa đối chiếu trong phiên)

### (d) Thuật ngữ
kính thiên văn không gian (space telescope); hấp thụ khí quyển (atmospheric absorption); nhiễu loạn khí quyển / độ nhoè (atmospheric turbulence, seeing); giới hạn nhiễu xạ (diffraction limit); tiêu chuẩn Rayleigh (Rayleigh criterion); độ phân giải góc (angular resolution); giây cung (arcsecond, ″); quang học thích ứng (adaptive optics, AO); sao dẫn đường laser (laser guide star); điểm Lagrange L2 (second Lagrange point); tấm che nắng (sunshield); quỹ đạo thấp quanh Trái Đất (low Earth orbit, LEO).

---

## 5. Điểm chưa đối chiếu được

1. Câu nguyên văn IAU OAE cho "electromagnetic radiation" (term 96), "redshift" (term 471); chưa tìm thấy mục "spectrum"/"absorption line" trên astro4edu.
2. Bảng ranh giới các dải bước sóng của NASA (science.nasa.gov/ems) — chưa thấy số trong trích đoạn.
3. Bước sóng Ca II K 393,366 nm và giá trị NIST gốc của các vạch Balmer (mới thấy qua bảng Wikipedia).
4. Số vạch Fraunhofer (574) — chỉ có một bài lịch sử trên arXiv; nguồn gốc là bản đồ 1814/1817.
5. Ngày chính xác Lockyer báo cáo (20 hay 26/10/1868); bước sóng D3 (587,56 vs 587,49 nm).
6. Nội dung chính xác việc Payne "bỏ" hay "làm nhẹ" kết luận trong luận án.
7. Độ cao hiện tại của Hubble (483 km theo NASA FAQ; ~470–485 km theo nguồn 2026) và thông tin RFI 29/10/2026.
8. Lịch Roman tới L2 / ảnh đầu tiên (nguồn thứ cấp); tình trạng Chandra 2026.
9. Kỷ lục thiên hà xa nhất sau MoM-z14 — không thấy, nhưng cần kiểm lại ngay trước khi đăng.
10. Nhiệt độ vận hành JWST: "< 50 K / −223 °C" (NASA) so với "40 K / −233 °C"; cần trang NASA Webb gốc.
11. Hằng số Wien, c, h: giá trị chuẩn CODATA/SI, chưa tra trực tiếp trong phiên.
