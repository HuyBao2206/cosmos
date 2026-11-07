// Chương 4 — Không-thời gian. Dữ kiện & nguồn: research/khong-thoi-gian.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Một đồng hồ đặt trên vệ tinh GPS chạy nhanh hơn đồng hồ cùng loại ở mặt đất khoảng 38 micro giây mỗi ngày. Nếu không bù trừ, vị trí trên điện thoại của bạn sẽ trôi đi khoảng 11 km mỗi ngày. Con số ấy đến từ hai lý thuyết của Albert Einstein, và nó cho thấy thời gian không trôi như nhau ở mọi nơi.',
    'Thuyết tương đối hẹp (special relativity, 1905) cho biết thời gian và không gian phụ thuộc vào chuyển động. Thuyết tương đối tổng quát (general relativity, 1915) cho biết khối lượng làm cong cả hai, và hấp dẫn chính là độ cong đó. Từ đây suy ra ánh sáng bị bẻ cong khi đi qua thiên hà, và những gợn sóng của không-thời gian lan đi từ các hố đen va chạm — cả hai đều đã được quan sát.',
  ],
  diagram: {
    nodes: [
      { id: 'c-bat-bien', x: 8, y: 10, label: 'Tốc độ ánh sáng như nhau với mọi người' },
      { id: 'tuong-doi-hep', x: 26, y: 26, big: true },
      { id: 'tuong-doi-tong-quat', x: 54, y: 16, big: true },
      { id: 'thau-kinh-hap-dan', x: 80, y: 8, big: true },
      { id: 'song-hap-dan', x: 80, y: 44, big: true },
      { id: 'van-vat-hap-dan', x: 46, y: 50 },
      { id: 'chan-troi-su-kien', x: 20, y: 52 },
    ],
    edges: [
      ['c-bat-bien', 'tuong-doi-hep', 'tiên đề'],
      ['tuong-doi-hep', 'tuong-doi-tong-quat', 'thêm hấp dẫn'],
      ['van-vat-hap-dan', 'tuong-doi-tong-quat', 'giới hạn trường yếu'],
      ['tuong-doi-tong-quat', 'thau-kinh-hap-dan', 'ánh sáng bị bẻ cong'],
      ['tuong-doi-tong-quat', 'song-hap-dan', 'độ cong lan truyền'],
      ['tuong-doi-tong-quat', 'chan-troi-su-kien', 'độ cong cực hạn'],
    ],
  },
  sources: [
    { text: 'N. Ashby (2003), Relativity in the Global Positioning System, Living Rev. Relativ. 6, 1', url: 'https://www.maths.tcd.ie/EMIS/journals/LRG/Articles/lrr-2003-1/' },
    { text: 'ESA/Hubble — Word bank: gravitational lensing', url: 'https://esahubble.org/wordbank/gravitational-lensing/' },
    { text: 'LIGO — GWTC-5.0 (5/2026)', url: 'https://ligo.org/detections/o4b-catalog/' },
    { text: 'Giải Nobel Vật lý 2017', url: 'https://www.nobelprize.org/prizes/physics/2017/summary/' },
  ],
};

export const CONCEPTS = {
  /* ——— 4.1 ——— */
  'tuong-doi-hep': {
    short: 'Tốc độ ánh sáng như nhau với mọi người quan sát; hệ quả là đồng hồ chuyển động chạy chậm hơn đồng hồ đứng yên (giãn nở thời gian).',
    certainty: { level: 'established', label: 'Đã xác lập · kiểm chứng tới độ chính xác rất cao' },
    definition: {
      vi: 'Các định luật vật lý có cùng dạng trong mọi hệ quy chiếu quán tính; và tốc độ ánh sáng trong chân không như nhau với mọi người quan sát quán tính, không phụ thuộc chuyển động của nguồn sáng.',
      source: 'Hai tiên đề của A. Einstein, Zur Elektrodynamik bewegter Körper, Annalen der Physik 17 (1905) — diễn đạt theo giáo trình',
      paraphrase: true,
    },
    body: [
      'Tiên đề thứ hai nghe vô hại nhưng trái với trực giác. Nếu bạn chạy về phía một tia sáng, bạn vẫn đo được nó đi đúng 299 792 458 m/s, không hơn. Để mọi người quan sát cùng đo được một tốc độ ánh sáng, thời gian và độ dài phải thay đổi theo chuyển động. Hệ quả nổi tiếng nhất là **giãn nở thời gian** (time dilation): nhìn từ mặt đất, đồng hồ trên một con tàu đang bay chạy chậm đi $\\gamma$ lần.',
      'Có thể thấy điều này bằng một “đồng hồ ánh sáng”: một xung sáng nảy qua lại giữa hai tấm gương. Với đồng hồ đặt trên con tàu đang bay, người ở mặt đất thấy xung sáng đi theo đường chéo, dài hơn. Vì tốc độ ánh sáng không đổi, mỗi nhịp phải kéo dài hơn. Hiệu ứng này không phải lỗi của đồng hồ: mọi quá trình trên tàu — dao động nguyên tử, phân rã hạt, nhịp tim — đều chậm lại như nhau.',
    ],
    formulas: ['$$\\Delta t = \\gamma\\,\\Delta t_0, \\qquad \\gamma = \\frac{1}{\\sqrt{1 - v^2/c^2}}$$'],
    symbols: [
      ['$\\Delta t_0$', 'thời gian riêng (proper time) — khoảng thời gian đo bằng đồng hồ đi cùng con tàu'],
      ['$\\Delta t$', 'khoảng thời gian tương ứng đo từ mặt đất'],
      ['$\\gamma$', 'hệ số Lorentz (Lorentz factor), luôn ≥ 1; bằng 2 khi $v ≈ 0{,}866c$'],
      ['$v$', 'vận tốc tương đối giữa hai người quan sát'],
    ],
    viz: {
      module: 'time-dilation', height: 420, mobileHeight: 460,
      caption: 'Chỉnh tốc độ con tàu để thấy đồng hồ trên tàu chạy chậm lại so với đồng hồ ở Trái Đất. Bên phải là đồng hồ ánh sáng trên tàu nhìn từ Trái Đất: tàu càng nhanh, đường chéo của tia sáng càng dài. Các nút có sẵn dùng vận tốc thật của ISS, tàu Parker Solar Probe và muon tia vũ trụ.',
    },
    after: [
      'Bằng chứng đến từ khắp nơi. Muon sinh ra khi tia vũ trụ va vào thượng tầng khí quyển chỉ sống trung bình khoảng 2,2 micro giây, đáng lẽ phân rã gần hết trước khi xuống tới mặt đất; nhưng chúng bay gần tốc độ ánh sáng nên “đồng hồ” của chúng chạy chậm và rất nhiều muon tới được mặt đất (Rossi và Hall 1941; Frisch và Smith 1963). Năm 2010, đồng hồ quang học của NIST đo được giãn nở thời gian ở vận tốc dưới 10 m/s. Phi hành gia Scott Kelly, sau khoảng 340 ngày trên ISS, “trẻ” hơn so với ở lại mặt đất chừng 8–9 mili giây (con số tự tính), vì ở độ cao của ISS hiệu ứng vận tốc lớn hơn hiệu ứng hấp dẫn ngược chiều.',
    ],
    numbers: [
      { value: '−7 μs/ngày', label: 'đồng hồ GPS chậm đi do vận tốc quỹ đạo 3,9 km/s', source: 'Tự tính từ γ (r = 26 562 km)' },
      { value: '< 10 m/s', label: 'vận tốc nhỏ nhất ở đó giãn nở thời gian đã được đo (đồng hồ Al⁺, 2010)', source: 'Chou và cộng sự 2010, Science' },
      { value: '~8–9 ms', label: 'Scott Kelly “trẻ” hơn sau khoảng 340 ngày trên ISS', source: 'Tự tính (v = 7,66 km/s, độ cao 400 km)' },
    ],
    myths: [
      { myth: 'Giãn nở thời gian chỉ là ảo giác do đồng hồ chạy sai.', truth: 'Mọi quá trình vật lý đều chậm lại như nhau. Muon thật sự tới được mặt đất; đồng hồ nguyên tử bay vòng quanh Trái Đất (Hafele–Keating 1971) thật sự chỉ giờ khác khi đem về.' },
      { myth: 'Người trên tàu thấy thời gian của chính mình trôi chậm.', truth: 'Mỗi người thấy đồng hồ của mình chạy bình thường. Sự chậm đi chỉ xuất hiện khi so sánh đồng hồ giữa hai hệ quy chiếu chuyển động tương đối với nhau.' },
    ],
    sources: [
      { text: 'Rossi & Hall (1941), Variation of the rate of decay of mesotrons with momentum, Phys. Rev. 59, 223', url: 'https://doi.org/10.1103/PhysRev.59.223' },
      { text: 'Frisch & Smith (1963), Measurement of the relativistic time dilation using μ-mesons, Am. J. Phys. 31, 342', url: 'https://doi.org/10.1119/1.1969508' },
      { text: 'Physics Today — Time dilation seen at just 10 m/s (Chou và cộng sự 2010)', url: 'https://physicstoday.aip.org/news/time-dilation-seen-at-just-10-m-s' },
      { text: 'USNO — Hafele–Keating, 50 năm', url: 'https://www.dvidshub.net/news/printable/407785' },
      { text: 'N. Ashby (2003), Relativity in the Global Positioning System', url: 'https://www.maths.tcd.ie/EMIS/journals/LRG/Articles/lrr-2003-1/' },
    ],
  },

  /* ——— 4.2 ——— */
  'tuong-doi-tong-quat': {
    short: 'Lý thuyết hấp dẫn của Einstein (1915): khối lượng và năng lượng làm cong không-thời gian, và vật chuyển động theo độ cong đó.',
    certainty: { level: 'established', label: 'Đã xác lập · mọi phép thử tới nay đều khớp' },
    definition: {
      vi: 'Không-thời gian bảo vật chất phải chuyển động thế nào; vật chất bảo không-thời gian phải cong thế nào.',
      source: 'Cách tóm tắt nổi tiếng của John A. Wheeler (diễn đạt lại; câu chữ chính xác khác nhau giữa các bản in)',
      paraphrase: true,
    },
    body: [
      'Newton mô tả hấp dẫn như một lực tác dụng tức thì qua khoảng cách, nhưng không giải thích được nó truyền đi bằng cách nào. Năm 1907, Einstein bắt đầu từ một thí nghiệm tưởng tượng: người trong thang máy rơi tự do không cảm thấy trọng lượng — hấp dẫn và gia tốc không phân biệt được (**nguyên lý tương đương**, equivalence principle). Tám năm sau, ngày 25/11/1915, ông trình bày phương trình trường: khối lượng và năng lượng làm **cong** không-thời gian; vật không bị “kéo” mà đi theo đường thẳng nhất có thể trong hình học cong ấy (đường trắc địa, geodesic).',
      'Một phần quan trọng của độ cong là độ cong của **thời gian**: càng gần một khối lượng lớn, đồng hồ càng chạy chậm. Ở quỹ đạo GPS cao 20 200 km, hiệu ứng này làm đồng hồ nhanh thêm khoảng 45 micro giây mỗi ngày so với mặt đất — lớn hơn và ngược chiều với 7 micro giây chậm đi do vận tốc. Năm 2022, nhóm JILA đo được sự khác biệt về nhịp đồng hồ giữa hai đầu một đám nguyên tử chỉ cao khoảng 1 milimét.',
    ],
    formulas: ['$$\\frac{\\Delta t_{\\text{trên cao}}}{\\Delta t_{\\text{dưới thấp}}} \\approx 1 + \\frac{g\\,h}{c^2} \\qquad \\alpha = \\frac{4GM}{c^2 b}$$'],
    symbols: [
      ['', 'Công thức trái: đồng hồ đặt cao hơn $h$ trong trường hấp dẫn $g$ chạy nhanh hơn một phần $gh/c^2$ (khoảng 10⁻¹⁶ cho mỗi mét ở mặt đất).'],
      ['$\\alpha$', 'góc lệch của tia sáng đi ngang một khối lượng $M$ ở khoảng cách $b$ — gấp đôi giá trị suy ra theo cách nghĩ của Newton'],
    ],
    viz: {
      module: 'spacetime-grid', height: 460, mobileHeight: 380,
      caption: 'Kéo vật nặng trên lưới (hoặc dùng phím mũi tên). Lưới lõm là hình ảnh độ cong của không gian; các tia sáng song song đi qua bị bẻ về phía vật. Tia sáng được tính với góc lệch 4GM/(c²b) của thuyết tương đối tổng quát, khối lượng phóng đại rất nhiều. Hình lưới chỉ là một phép ví: nó không vẽ được độ cong của thời gian.',
    },
    after: [
      'Lý thuyết đứng vững qua mọi phép thử. Nó giải thích phần dư 43″ mỗi thế kỷ trong tiến động cận nhật của Sao Thuỷ mà cơ học Newton không giải thích được. Nó dự đoán ánh sáng sao sượt mép Mặt Trời lệch 1,75″, được đo trong nhật thực 29/5/1919 (độ chính xác khi đó chỉ khoảng 10–20 %, sau này các phép đo vô tuyến xác nhận chính xác hơn nhiều). Vệ tinh Gravity Probe B (công bố 2011) đo được không-thời gian bị Trái Đất quay “kéo theo”. Hai hệ quả lớn nhất có thẻ riêng: [[thau-kinh-hap-dan]] và [[song-hap-dan]].',
    ],
    numbers: [
      { value: '43″/thế kỷ', label: 'phần tiến động cận nhật Sao Thuỷ chỉ thuyết tương đối giải thích được', source: 'OpenStax Astronomy; arXiv:astro-ph/0501319' },
      { value: '1,75″', label: 'góc lệch của ánh sáng sao sượt mép Mặt Trời', source: 'Tính từ 4GM/(c²R☉)' },
      { value: '+45 μs/ngày', label: 'đồng hồ GPS nhanh thêm vì ở xa Trái Đất hơn', source: 'Tự tính từ GM/c²' },
    ],
    myths: [
      { myth: 'Hình quả bóng nặng làm lõm tấm cao su là bức tranh đúng của hấp dẫn.', truth: 'Hình ảnh đó dùng chính trọng lực để giải thích trọng lực, và chỉ vẽ độ cong của không gian. Với vật chuyển động chậm như hành tinh, phần quyết định lại là độ cong của thời gian.' },
      { myth: 'Einstein đã chứng minh Newton sai.', truth: 'Định luật Newton là giới hạn rất chính xác của thuyết tương đối tổng quát khi trường hấp dẫn yếu và vận tốc nhỏ. Đường bay của tàu vũ trụ vẫn được tính chủ yếu bằng cơ học Newton cộng các hiệu chỉnh nhỏ.' },
    ],
    sources: [
      { text: 'A. Einstein (1915), Die Feldgleichungen der Gravitation — bản dịch tiếng Anh', url: 'https://en.wikisource.org/wiki/Translation:The_Field_Equations_of_Gravitation' },
      { text: 'Everitt và cộng sự (2011), Gravity Probe B, PRL 106, 221101 — arXiv:1105.3456', url: 'https://arxiv.org/abs/1105.3456' },
      { text: 'Bothwell và cộng sự (2022), Nature 602, 420 — dịch chuyển đỏ hấp dẫn trên thang milimét', url: 'https://doi.org/10.1038/s41586-021-04349-7' },
      { text: 'Lịch sử phép đo nhật thực 1919 — arXiv:1912.07674', url: 'https://arxiv.org/abs/1912.07674' },
      { text: 'N. Ashby (2003), Relativity in the Global Positioning System', url: 'https://www.maths.tcd.ie/EMIS/journals/LRG/Articles/lrr-2003-1/' },
    ],
  },

  /* ——— 4.3 ——— */
  'thau-kinh-hap-dan': {
    short: 'Khối lượng lớn (thiên hà, đám thiên hà) bẻ cong đường đi của ánh sáng từ vật ở phía sau, tạo ảnh méo, nhiều ảnh hoặc vành Einstein.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Thấu kính hấp dẫn xảy ra khi một thiên thể có khối lượng lớn — chẳng hạn một đám thiên hà — làm cong không-thời gian đủ để đường đi của ánh sáng quanh nó bị bẻ cong thấy rõ, như khi đi qua một thấu kính. Thiên thể làm cong ánh sáng vì thế được gọi là thấu kính hấp dẫn.',
      en: 'Gravitational lensing occurs when a massive celestial body — such as a galaxy cluster — causes a sufficient curvature of spacetime for the path of light around it to be visibly bent, as if by a lens. The body causing the light to curve is accordingly called a gravitational lens.',
      source: 'ESA/Hubble — Word bank',
      url: 'https://esahubble.org/wordbank/gravitational-lensing/',
    },
    body: [
      'Một thiên hà hay đám thiên hà nằm giữa ta và một vật xa hơn hoạt động như một thấu kính khổng lồ, nhưng là một thấu kính “xấu”: tia sáng đi càng gần tâm thì bị bẻ càng mạnh, nên không có một tiêu điểm chung. Thay vì một ảnh nét, ta thấy vật phía sau bị kéo thành những **cung sáng**, tách thành **nhiều ảnh**, hoặc — khi ba vật thẳng hàng — thành một vòng tròn trọn vẹn gọi là **vành Einstein** (Einstein ring).',
      'Thấu kính đầu tiên ngoài Ngân Hà được nhận ra năm 1979: “chuẩn tinh đôi” Q0957+561, thực ra là hai ảnh của cùng một chuẩn tinh (quasar), cách nhau khoảng 6″. Ánh sáng tạo nên mỗi ảnh đi theo một con đường dài ngắn khác nhau nên tới nơi lệch giờ nhau. Năm 2014, kính Hubble thấy một siêu tân tinh (SN Refsdal) hiện thành bốn ảnh; các nhà thiên văn dự đoán một ảnh nữa sẽ hiện ra ở chỗ khác khoảng một năm sau — và tháng 12/2015 nó xuất hiện đúng như dự đoán.',
    ],
    formulas: ['$$\\theta_E = \\sqrt{\\frac{4GM}{c^2}\\,\\frac{D_{LS}}{D_L\\,D_S}}$$'],
    symbols: [
      ['$\\theta_E$', 'bán kính góc Einstein — bán kính của vành khi ba vật thẳng hàng'],
      ['$M$', 'khối lượng của thấu kính'],
      ['$D_L, D_S, D_{LS}$', 'khoảng cách từ ta tới thấu kính, từ ta tới nguồn, và từ thấu kính tới nguồn'],
    ],
    viz: {
      module: 'lensing', height: 460, mobileHeight: 380,
      caption: 'Kéo thiên hà nền (đường viền đứt) quanh thấu kính. Ảnh được dựng bằng cách dò ngược từng tia sáng theo phương trình thấu kính điểm, đơn vị là bán kính Einstein θ_E. Khi thẳng hàng, ảnh thành vành; lệch ít thành cung; lệch nhiều thành hai ảnh ở hai phía.',
    },
    after: [
      'Thấu kính hấp dẫn đã thành công cụ. Vì ánh sáng bị bẻ theo **toàn bộ** khối lượng, kể cả phần không phát sáng, nó là một trong những cách trực tiếp nhất để “cân” [[vat-chat-toi|vật chất tối]]; kính Euclid của ESA đo những méo dạng rất nhỏ (thấu kính yếu) của rất nhiều thiên hà trên khoảng một phần ba bầu trời cho mục đích này. Thấu kính còn phóng đại những thiên hà quá xa và quá mờ để thấy được, như trong ảnh trường sâu đầu tiên của kính James Webb (JWST; SMACS 0723, 7/2022). Khi thấu kính chỉ là một ngôi sao, ảnh không tách ra được, chỉ thấy độ sáng tăng rồi giảm (vi thấu kính, microlensing) — một cách tìm [[ngoai-hanh-tinh|ngoại hành tinh]].',
    ],
    numbers: [
      { value: '1979', label: 'phát hiện thấu kính hấp dẫn đầu tiên ngoài Ngân Hà (chuẩn tinh đôi Q0957+561)', source: 'Walsh, Carswell & Weymann, Nature 279' },
      { value: '4 + 1 ảnh', label: 'siêu tân tinh Refsdal: bốn ảnh năm 2014, ảnh thứ năm xuất hiện đúng dự đoán 12/2015', source: 'Kelly và cộng sự 2016' },
      { value: '4,6 tỷ năm', label: 'thời gian ánh sáng của đám SMACS 0723 đi tới ta, trong ảnh trường sâu đầu tiên của JWST', source: 'ESA/Webb' },
    ],
    myths: [
      { myth: 'Thấu kính hấp dẫn hội tụ ánh sáng về một tiêu điểm như kính lúp.', truth: 'Góc lệch giảm khi tia đi xa tâm, ngược với thấu kính thuỷ tinh, nên không có tiêu điểm chung: ta thấy cung, vành hoặc nhiều ảnh.' },
      { myth: 'Các ảnh trong một hệ thấu kính là những thiên thể khác nhau.', truth: 'Đó là cùng một thiên thể, ánh sáng đi theo nhiều đường dài ngắn khác nhau; vì thế mới có độ trễ giữa các ảnh.' },
    ],
    sources: [
      { text: 'ESA/Hubble — Word bank: gravitational lensing', url: 'https://esahubble.org/wordbank/gravitational-lensing/' },
      { text: `${IAU_OAE}: Gravitational Lens`, url: 'https://astro4edu.org/resources/glossary/term/134' },
      { text: 'Walsh, Carswell & Weymann (1979), Nature 279, 381', url: 'https://ned.ipac.caltech.edu/uri/NED::Refcode/1979Nat...279..381W' },
      { text: 'Kelly và cộng sự — SN Refsdal, arXiv:1504.05953', url: 'https://arxiv.org/abs/1504.05953' },
      { text: 'ESA/Webb — Webb’s first deep field (weic2209a)', url: 'https://esawebb.org/images/weic2209a/' },
    ],
  },

  /* ——— 4.4 ——— */
  'song-hap-dan': {
    short: 'Gợn sóng của chính không-thời gian, lan đi với tốc độ ánh sáng khi những khối lượng lớn chuyển động mạnh; được ghi nhận trực tiếp lần đầu năm 2015.',
    certainty: { level: 'established', label: 'Đã xác lập · số sự kiện cập nhật 5/2026' },
    definition: {
      vi: 'Sóng hấp dẫn là những gợn sóng của không-thời gian, sinh ra từ một số quá trình dữ dội và giàu năng lượng nhất trong vũ trụ, như hai hố đen quay quanh nhau rồi hợp nhất.',
      source: 'Diễn giải theo LIGO Caltech — What are gravitational waves?',
      url: 'https://www.ligo.caltech.edu/page/what-are-gw',
      paraphrase: true,
    },
    body: [
      'Năm 1916, Einstein suy ra từ thuyết tương đối tổng quát rằng khối lượng chuyển động có gia tốc phải phát ra sóng: độ cong không-thời gian lan đi với tốc độ ánh sáng. Khi một sóng như vậy đi qua, khoảng cách theo một hướng dài ra trong khi hướng vuông góc ngắn lại, rồi ngược lại. Nhưng theo chính tính toán của ông, hiệu ứng nhỏ tới mức gần như không đáng kể.',
      'Bằng chứng gián tiếp đến từ một cặp sao neutron phát hiện năm 1974 (pulsar Hulse–Taylor): theo dõi nhiều năm cho thấy chúng quay quanh nhau ngày càng nhanh, khớp tới cỡ 0,2 % với tốc độ mất năng lượng do phát sóng hấp dẫn mà thuyết dự đoán (Nobel 1993). Ghi nhận trực tiếp đầu tiên là ngày **14/9/2015**: hai máy dò LIGO tại Mỹ, mỗi máy có hai cánh tay dài 4 km, cùng bắt được tín hiệu **GW150914** từ hai hố đen khoảng 36 và 29 lần khối lượng Mặt Trời hợp nhất cách ta khoảng 1,3 tỷ năm ánh sáng. Cánh tay giao thoa kế (interferometer) dài ra rồi ngắn lại chưa tới một phần nghìn đường kính một proton. Khoảng 3 lần khối lượng Mặt Trời đã biến thành năng lượng sóng hấp dẫn trong chưa đầy một giây.',
    ],
    formulas: ['$$h = \\frac{\\Delta L}{L} \\sim 10^{-21}$$'],
    symbols: [
      ['$h$', 'biến dạng (strain) — độ co giãn tương đối của khoảng cách khi sóng đi qua'],
      ['$L$', 'chiều dài cánh tay máy dò (4 km ở LIGO)'],
    ],
    viz: {
      module: 'gw-chirp', height: 440, mobileHeight: 420,
      caption: 'Hai hố đen xoắn ốc vào nhau. Tần số sóng tăng dần — “tiếng chíp” (chirp) — theo công thức gần đúng bậc tứ cực của thuyết tương đối; biên độ tăng theo. Vòng hạt thử bên dưới co giãn khi sóng đi qua, phóng đại khoảng 10²⁰ lần. Phần sau khi hợp nhất (dao động tắt dần) vẽ định tính.',
    },
    after: [
      'Ngày 17/8/2017, LIGO và Virgo ghi được GW170817 từ hai **sao neutron** hợp nhất; 1,7 giây sau, vệ tinh Fermi ghi được một vụ nổ tia gamma (gamma-ray burst) từ cùng vùng trời, và hàng chục đài quan sát tìm thấy một “kilonova” trong thiên hà NGC 4993. Lần đầu tiên một sự kiện được quan sát bằng cả sóng hấp dẫn lẫn ánh sáng, và quang phổ của nó cho thấy [[nguon-goc-nguyen-to|các nguyên tố nặng]] vừa được tạo ra ở đó bằng quá trình bắt neutron nhanh (quá trình r). Tới danh mục GWTC-5.0 (5/2026), số ứng viên đã lên 390. Tín hiệu rõ nhất từ trước tới nay, GW250114 (ghi ngày 14/1/2025), cho phép kiểm tra định lý diện tích hố đen của Hawking với độ tin cậy 99,999 %.',
    ],
    numbers: [
      { value: '14/9/2015', label: 'GW150914 — lần đầu ghi nhận trực tiếp sóng hấp dẫn (công bố 11/2/2016; Nobel 2017)', source: 'Abbott và cộng sự 2016, PRL 116, 061102' },
      { value: '~10⁻²¹', label: 'biến dạng cực đại của GW150914 — cánh tay 4 km co giãn khoảng 4 × 10⁻¹⁸ m', source: 'LIGO; tự tính' },
      { value: '390', label: 'ứng viên trong danh mục chính thức GWTC-5.0 (5/2026); phần cuối đợt O4 còn đang phân tích', source: 'LIGO–Virgo–KAGRA' },
    ],
    myths: [
      { myth: 'Sóng hấp dẫn là một loại sóng âm, LIGO “nghe” thấy tiếng va chạm.', truth: 'Đó là dao động của chính không-thời gian, đi qua chân không với tốc độ ánh sáng. “Tiếng chíp” là tín hiệu được chuyển thành âm thanh vì tần số của nó tình cờ nằm trong dải tai người nghe được.' },
      { myth: 'Sóng hấp dẫn là trọng lực kéo vật về phía nguồn.', truth: 'Nó làm khoảng cách co lại theo một hướng và giãn ra theo hướng vuông góc, cả hai đều vuông góc với hướng sóng truyền.' },
    ],
    sources: [
      { text: 'Abbott và cộng sự (2016), Observation of gravitational waves from a binary black hole merger, PRL 116, 061102', url: 'https://dcc.ligo.org/P1500218/public' },
      { text: 'Giải Nobel Vật lý 2017 — Weiss, Barish, Thorne', url: 'https://www.nobelprize.org/prizes/physics/2017/summary/' },
      { text: 'LIGO — GWTC-5.0 (O4b), 5/2026', url: 'https://ligo.org/detections/o4b-catalog/' },
      { text: 'LIGO Caltech — kết thúc đợt quan sát O4 (18/11/2025)', url: 'https://www.ligo.caltech.edu/news/ligo20251118' },
      { text: 'Weisberg & Taylor (2005), The relativistic binary pulsar B1913+16 — arXiv:astro-ph/0407149', url: 'https://arxiv.org/abs/astro-ph/0407149' },
      { text: 'ESA — LISA được thông qua (1/2024)', url: 'https://www.esa.int/Science_Exploration/Space_Science/Capturing_the_ripples_of_spacetime_LISA_gets_go-ahead' },
    ],
  },
};
