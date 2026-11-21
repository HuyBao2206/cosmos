// Chương 7 — Thiên hà và cấu trúc lớn. Dữ kiện & nguồn: research/thien-ha-cau-truc-lon.md, research/thang-bac-vu-tru.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).
// Các thẻ ở đây chưa có câu định nghĩa nguyên văn tiếng Anh kiểm được → dùng `paraphrase: true`, ghi rõ nguồn diễn giải.

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Năm 1920, các nhà thiên văn còn tranh luận liệu những “tinh vân xoắn ốc” trên trời có nằm trong Ngân Hà hay là những vũ trụ riêng. Ba năm sau, Edwin Hubble tìm thấy một sao biến quang Cepheid trong tinh vân Andromeda và tính ra nó ở rất xa ngoài Ngân Hà. Từ đó, kích thước của vũ trụ được biết tăng lên theo từng bậc.',
    'Chương này đi theo các bậc ấy: từ hình dạng của từng thiên hà, tới vị trí của Hệ Mặt Trời trong Ngân Hà, tới các nhóm, đám, siêu đám và cuối cùng là mạng lưới sợi trải khắp vũ trụ. Ở mọi bậc từ thiên hà trở lên, có một thành phần ta không nhìn thấy nhưng nặng hơn vật chất thường khoảng năm lần: vật chất tối.',
  ],
  diagram: {
    nodes: [
      { id: 'phan-loai-thien-ha', x: 10, y: 12, big: true },
      { id: 'ngan-ha', x: 34, y: 26, big: true },
      { id: 'vat-chat-toi', x: 60, y: 12, big: true },
      { id: 'nhom-sieu-dam', x: 50, y: 48, big: true },
      { id: 'mang-luoi-vu-tru', x: 82, y: 40, big: true },
      { id: 'cepheid', x: 8, y: 46 },
      { id: 'thau-kinh-hap-dan', x: 90, y: 8 },
    ],
    edges: [
      ['cepheid', 'phan-loai-thien-ha', 'Andromeda ở ngoài Ngân Hà'],
      ['phan-loai-thien-ha', 'ngan-ha', 'xoắn ốc có thanh'],
      ['ngan-ha', 'vat-chat-toi', 'đường cong quay phẳng'],
      ['ngan-ha', 'nhom-sieu-dam', 'Nhóm Địa phương'],
      ['nhom-sieu-dam', 'mang-luoi-vu-tru', 'nút của mạng lưới'],
      ['vat-chat-toi', 'mang-luoi-vu-tru', 'giàn giáo'],
      ['thau-kinh-hap-dan', 'vat-chat-toi', 'cân khối lượng'],
    ],
  },
  sources: [
    { text: 'A. Sandage — The classification of galaxies (NED)', url: 'https://ned.ipac.caltech.edu/level5/Sandage/Sandage4_4.html' },
    { text: 'Planck Collaboration (2018), Cosmological parameters — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
    { text: 'Tully và cộng sự (2014), The Laniakea supercluster of galaxies, Nature 513, 71', url: 'https://doi.org/10.1038/nature13674' },
    { text: 'DESI — Data releases', url: 'https://data.desi.lbl.gov/doc/releases/' },
  ],
};

export const CONCEPTS = {
  /* ——— 7.1 ——— */
  'phan-loai-thien-ha': {
    short: 'Thiên hà được xếp theo hình dạng: elip (E), dạng thấu kính (S0), xoắn ốc (S), xoắn ốc có thanh (SB) và không đều (Irr) — sơ đồ “âm thoa” của Hubble.',
    certainty: { level: 'established', label: 'Đã xác lập · số thiên hà trong vũ trụ còn tranh luận' },
    definition: {
      vi: 'Thiên hà là một hệ gồm sao cùng khí, bụi và vật chất tối, liên kết với nhau bởi lực hấp dẫn. Thiên hà rất khác nhau về hình dạng và kích thước; những thiên hà nhỏ nhất chỉ có vài nghìn ngôi sao.',
      source: `Diễn giải theo ${IAU_OAE}: Galaxy`,
      url: 'https://astro4edu.org/resources/glossary/term/119/',
      paraphrase: true,
    },
    body: [
      'Năm 1926, Edwin Hubble chia thiên hà theo hình dạng nhìn thấy trên ảnh chụp. Thiên hà **elip** (elliptical, E) là những khối sao già hình bầu dục, ký hiệu E0 (tròn) tới E7 (dẹt nhất), ít khí và hầu như không còn sinh sao. Thiên hà **xoắn ốc** (spiral, S) có một đĩa phẳng với các nhánh xoắn chứa khí, bụi và sao trẻ xanh quanh một **chỗ phình trung tâm** (bulge) gồm sao già; loại Sa có chỗ phình lớn và nhánh cuộn chặt, loại Sc có chỗ phình nhỏ và nhánh mở. Nhiều thiên hà xoắn ốc có một **thanh** sao thẳng qua tâm (barred spiral, SB). Trong cuốn _The Realm of the Nebulae_ (1936), Hubble xếp chúng thành hình chiếc âm thoa, thêm loại **dạng thấu kính** (lenticular, S0) ở chỗ rẽ nhánh. Thiên hà **không đều** (irregular, Irr) đứng ngoài sơ đồ.',
      'Kích thước trải rất rộng: từ thiên hà lùn vài nghìn sao tới những thiên hà elip khổng lồ lớn gấp nhiều lần Ngân Hà. Vũ trụ quan sát được chứa bao nhiêu thiên hà thì chưa có câu trả lời chắc: ước tính năm 2016 (Conselice và cộng sự) là khoảng 2 nghìn tỷ, trong khi phép đo ánh sáng nền từ tàu New Horizons (2021) cho thấy chỉ khoảng vài trăm tỷ.',
    ],
    viz: {
      module: 'galaxy-types', height: 440, mobileHeight: 420,
      caption: 'Bấm một ô trên sơ đồ âm thoa để dựng thiên hà mẫu tương ứng. Hình dựng bằng hạt theo quy tắc phân loại (độ dẹt, cỡ chỗ phình, độ mở của nhánh); không phải ảnh chụp.',
    },
    after: [
      'Phân loại ban đầu dựa trên mắt người; ngày nay vẫn cần mắt người. Dự án Galaxy Zoo (từ 7/2007) mời công chúng phân loại ảnh thiên hà của khảo sát SDSS: trong năm đầu, hơn 100 000 tình nguyện viên đã phân loại khoảng 900 000 thiên hà, mỗi thiên hà được xem trung bình 38 lần.',
    ],
    numbers: [
      { value: '1926 / 1936', label: 'Hubble công bố cách phân loại, rồi sơ đồ âm thoa', source: 'Sandage (NED)' },
      { value: 'vài trăm tỷ – 2 nghìn tỷ', label: 'số thiên hà trong vũ trụ quan sát được, tuỳ phương pháp (đang tranh luận)', source: 'Conselice 2016; Lauer 2021' },
      { value: '~900 000', label: 'thiên hà được tình nguyện viên Galaxy Zoo phân loại trong năm đầu', source: 'arXiv:1104.5513' },
    ],
    myths: [
      { myth: 'Sơ đồ âm thoa là trình tự tiến hoá: elip biến thành xoắn ốc.', truth: 'Hubble dùng chữ “sớm” và “muộn” chỉ để chỉ vị trí trên sơ đồ. Thiên hà thay đổi chủ yếu qua va chạm, sáp nhập và cạn khí; nhiều thiên hà elip lớn hình thành từ sáp nhập các thiên hà xoắn ốc.' },
      { myth: 'Thiên hà chỉ là một đám sao.', truth: 'Sao chỉ chiếm một phần nhỏ khối lượng của thiên hà; phần lớn là [[vat-chat-toi|vật chất tối]].' },
    ],
    sources: [
      { text: `${IAU_OAE}: Galaxy`, url: 'https://astro4edu.org/resources/glossary/term/119/' },
      { text: 'A. Sandage — The classification of galaxies (NED)', url: 'https://ned.ipac.caltech.edu/level5/Sandage/Sandage4_4.html' },
      { text: 'Nature News (2016) — Universe has ten times more galaxies than researchers thought', url: 'https://www.nature.com/news/universe-has-ten-times-more-galaxies-than-researchers-thought-1.20809' },
      { text: 'NOIRLab (2021) — New Horizons: the universe is less bright than expected', url: 'https://noirlab.edu/public/announcements/ann21001' },
      { text: 'Lintott và cộng sự (2011), Galaxy Zoo 1 — arXiv:1104.5513', url: 'https://arxiv.org/abs/1104.5513' },
    ],
  },

  /* ——— 7.2 ——— */
  'ngan-ha': {
    short: 'Thiên hà của chúng ta: xoắn ốc có thanh, đĩa rộng khoảng 100 000 năm ánh sáng, 100–400 tỷ sao; Mặt Trời cách tâm khoảng 27 000 năm ánh sáng.',
    certainty: { level: 'established', label: 'Đã xác lập · tổng khối lượng còn tranh luận' },
    definition: {
      vi: 'Ngân Hà là một thiên hà xoắn ốc có thanh chắn.',
      source: 'Diễn giải theo ESA — The asymmetric Milky Way in motion (Gaia DR3, 2022)',
      url: 'https://www.esa.int/ESA_Multimedia/Videos/2022/06/The_asymmetric_Milky_Way_in_motion',
      paraphrase: true,
    },
    body: [
      'Dải sáng mờ vắt ngang bầu trời đêm là Ngân Hà nhìn từ **bên trong**: ta nằm trong một đĩa phẳng nên thấy nó như một vành quanh mình. Năm 1610, qua chiếc kính thiên văn tự chế phóng đại khoảng 20 lần, Galileo thấy dải ấy “không gì khác hơn là vô số ngôi sao”. Ngày nay ta biết Ngân Hà là một thiên hà xoắn ốc có thanh, đĩa rộng khoảng 100 000 năm ánh sáng, chứa khoảng 100–400 tỷ ngôi sao.',
      'Mặt Trời không ở tâm. Nó nằm trên một nhánh phụ gọi là **nhánh Orion** (Orion Spur), cách tâm khoảng 27 000 năm ánh sáng (đo năm 2021 bằng thiết bị GRAVITY). Ở tâm là hố đen Sgr A* nặng khoảng 4,3 triệu lần Mặt Trời. Hệ Mặt Trời quay quanh tâm với vận tốc khoảng 230 km/s; một vòng — “năm thiên hà” — mất khoảng 220 triệu năm.',
    ],
    formulas: ['$$T = \\frac{2\\pi R_0}{v} \\approx \\frac{2\\pi \\times 8{,}3\\ \\text{kpc}}{230\\ \\text{km/s}} \\approx 2{,}2 \\times 10^{8}\\ \\text{năm}$$'],
    symbols: [
      ['$R_0$', 'khoảng cách Mặt Trời – tâm Ngân Hà (1 kpc ≈ 3 262 năm ánh sáng)'],
      ['$v$', 'vận tốc quỹ đạo của Mặt Trời quanh tâm'],
    ],
    viz: {
      module: 'milky-way', height: 460, mobileHeight: 380,
      caption: 'Hình minh hoạ Ngân Hà nhìn từ trên xuống, dựng bằng hạt theo cấu trúc đã biết. Chưa tàu vũ trụ nào ra khỏi đĩa Ngân Hà, nên mọi “ảnh” toàn cảnh đều là hình dựng lại. Kéo thời gian để Mặt Trời đi quanh tâm; bấm để xem đĩa từ cạnh bên.',
    },
    after: [
      'Bản đồ chính xác nhất đến từ vệ tinh Gaia của ESA, đo vị trí và chuyển động của hơn 1,8 tỷ nguồn sáng (chủ yếu là sao). Tổng khối lượng của Ngân Hà, kể cả quầng [[vat-chat-toi|vật chất tối]], vẫn còn tranh luận: phân tích các cụm sao cầu bằng Hubble và Gaia (2019) cho khoảng 1,5 nghìn tỷ lần khối lượng Mặt Trời, trong khi một phân tích đường cong quay từ Gaia DR3 (2023) cho thấp hơn khoảng bảy lần. Phần lớn các phép đo khác, như dòng sao (stellar stream) và cụm sao cầu, nghiêng về con số lớn hơn.',
    ],
    numbers: [
      { value: '~27 000 năm ánh sáng', label: 'khoảng cách Mặt Trời – tâm Ngân Hà (8,275 kpc)', source: 'GRAVITY Collaboration 2021' },
      { value: '~220 triệu năm', label: 'một vòng của Mặt Trời quanh tâm Ngân Hà (tính từ 2πR₀/v; sách thường ghi 225–250)', source: 'Tự tính' },
      { value: '> 1,8 tỷ', label: 'nguồn sáng trong các bản dữ liệu Gaia EDR3/DR3', source: 'ESA Gaia' },
    ],
    myths: [
      { myth: 'Ảnh Ngân Hà nhìn từ trên xuống là ảnh chụp thật.', truth: 'Chưa tàu nào ra khỏi đĩa; xa nhất là Voyager 1, tới giữa tháng 11/2026 mới cách Trái Đất khoảng một ngày ánh sáng, trong khi đĩa dày cỡ 1 000 năm ánh sáng. Mọi ảnh toàn cảnh là hình minh hoạ dựng từ số liệu hoặc ảnh của thiên hà khác.' },
      { myth: 'Mặt Trời nằm ở tâm Ngân Hà.', truth: 'Mặt Trời cách tâm khoảng 27 000 năm ánh sáng, trên một nhánh phụ. Năm 1918, Harlow Shapley dựa vào phân bố các cụm sao cầu để chỉ ra rằng Mặt Trời không ở tâm, dù khoảng cách tới tâm ông ước tính lớn hơn nhiều so với số đo ngày nay.' },
    ],
    khamPha: [{ href: '#he-mat-troi', label: 'Hệ Mặt Trời sống' }],
    sources: [
      { text: 'ESA — The asymmetric Milky Way in motion (Gaia DR3)', url: 'https://www.esa.int/ESA_Multimedia/Videos/2022/06/The_asymmetric_Milky_Way_in_motion' },
      { text: 'ESA — Gaia EDR3 in numbers', url: 'https://sci.esa.int/web/gaia/-/gaia-s-early-data-release-3-in-numbers' },
      { text: 'ESA/Hubble heic1905 — Hubble và Gaia cân Ngân Hà (Watkins và cộng sự 2019)', url: 'https://esahubble.org/news/heic1905/' },
      { text: 'Jiao và cộng sự (2023), A&A 678, A208 — đường cong quay giảm kiểu Kepler', url: 'https://doi.org/10.1051/0004-6361/202347513' },
      { text: 'NRAO — Orbital period of the Sun in the Milky Way', url: 'https://public.nrao.edu/ask/orbital-period-of-the-sun-in-the-milky-way-galaxy/' },
    ],
  },

  /* ——— 7.3 ——— */
  'vat-chat-toi': {
    short: 'Dạng vật chất không phát và không hấp thụ ánh sáng, chỉ được biết qua lực hấp dẫn; nặng hơn vật chất thường khoảng 5 lần.',
    certainty: { level: 'strong', label: 'Bằng chứng hấp dẫn đã xác lập · bản chất hạt chưa biết' },
    definition: {
      vi: 'Vì vật chất tối không phát ra, không hấp thụ và không phản xạ ánh sáng, chúng ta biết nó tồn tại chủ yếu nhờ lực hấp dẫn của nó lên vật chất nhìn thấy trong không gian.',
      en: 'Because dark matter does not emit, absorb, or reflect light, we mostly know it is there because of its gravitational pull on visible matter in space.',
      source: 'NASA Space Place — What is dark matter?',
      url: 'https://spaceplace.nasa.gov/dark-matter/',
    },
    body: [
      'Năm 1933, Fritz Zwicky đo vận tốc các thiên hà trong đám Coma và thấy chúng chạy quá nhanh: nếu chỉ có khối lượng nhìn thấy, đám thiên hà đáng lẽ đã tan rã. Ông gọi phần khối lượng thiếu là _dunkle Materie_ — vật chất tối. Ý tưởng ít được chú ý cho tới thập niên 1970, khi Vera Rubin và Kent Ford đo vận tốc quay của thiên hà Andromeda: các sao và khí ở xa tâm vẫn quay nhanh như ở gần, trong khi theo định luật [[van-vat-hap-dan|hấp dẫn]] với khối lượng nhìn thấy, chúng phải chậm dần như các hành tinh ở xa Mặt Trời.',
      'Đường cong quay “phẳng” chỉ giải thích được nếu mỗi thiên hà nằm trong một **quầng** khối lượng vô hình lớn hơn nhiều so với đĩa sao. Bằng chứng ngày nay đến từ nhiều hướng độc lập: [[thau-kinh-hap-dan|thấu kính hấp dẫn]] cân được khối lượng của các đám thiên hà; ở Đám Viên Đạn (Bullet Cluster, 2006), khối lượng nằm lệch hẳn khỏi khí nóng chứa phần lớn vật chất thường; và [[phong-vi-song|bức xạ phông vi sóng]] cho thấy vật chất tối nhiều hơn vật chất thường khoảng 5,4 lần.',
    ],
    viz: {
      module: 'rotation-curve', height: 440, mobileHeight: 520,
      caption: 'Đường cong quay của một thiên hà kiểu Ngân Hà: đường đứt nét là vận tốc dự đoán chỉ từ sao và khí nhìn thấy (chỗ phình + đĩa, công thức Freeman); đường liền là khi thêm quầng vật chất tối. Kéo độ nặng của quầng để khớp với các điểm “quan sát” phẳng (điểm minh hoạ, không phải số đo thật).',
    },
    after: [
      'Vật chất tối là gì thì chưa ai biết. Nó không thể chủ yếu là vật chất thường tối (sao chết, khí lạnh), vì lượng vật chất thường đã được đo độc lập. Các ứng viên được nghiên cứu nhiều là những hạt chưa biết, như hạt nặng tương tác yếu (WIMP) hay axion. Máy dò LZ dưới lòng đất ở Mỹ, với 10 tấn xenon lỏng, chưa tìm thấy WIMP sau 417 ngày dữ liệu (công bố 12/2025); tháng 9/2026, nhóm LZ báo cáo một sự kiện khó giải thích ở mức 2,6σ nhưng nói rõ đó chưa phải bằng chứng về vật chất tối. Một số nhà vật lý theo hướng khác: động lực học Newton sửa đổi (Modified Newtonian Dynamics, MOND, Milgrom 1983) thay đổi định luật hấp dẫn ở gia tốc rất nhỏ, giải thích tốt đường cong quay nhưng khó giải thích đám thiên hà và phông vi sóng — một quan điểm thiểu số, còn đang tranh luận.',
    ],
    numbers: [
      { value: '~27 % / 5 % / 68 %', label: 'vật chất tối / vật chất thường / năng lượng tối trong vũ trụ (cách làm tròn thường gặp; Planck 2018 cho khoảng 26,5 % / 4,9 % / 68,5 %)', source: 'Planck 2018' },
      { value: '5,4 lần', label: 'vật chất tối so với vật chất thường (Ω_c h² = 0,120; Ω_b h² = 0,0224)', source: 'Planck 2018' },
      { value: '1933', label: 'Zwicky dùng từ “vật chất tối” cho đám Coma', source: 'Helvetica Physica Acta 6, 110' },
    ],
    myths: [
      { myth: 'Vật chất tối là hố đen, sao chết hay khí lạnh không phát sáng.', truth: 'Lượng vật chất thường (baryon) được đo độc lập từ phông vi sóng và từ tổng hợp hạt nhân Vụ Nổ Lớn; nó chỉ bằng khoảng một phần sáu tổng vật chất. Phần còn lại không phải vật chất thường.' },
      { myth: 'Vật chất tối và năng lượng tối là một.', truth: 'Vật chất tối hút, gom vật chất thành thiên hà và đám thiên hà. [[nang-luong-toi|Năng lượng tối]] làm vũ trụ giãn nở ngày càng nhanh. Đó là hai thứ khác nhau.' },
    ],
    khaoLuan: [{ label: 'Vật chất tối là gì?' }],
    sources: [
      { text: 'APS News (2023) — Vera Rubin and the rotation of Andromeda', url: 'https://www.aps.org/apsnews/2023/05/vera-rubin-paper-dark-matter' },
      { text: 'Clowe và cộng sự (2006), A direct empirical proof of the existence of dark matter, ApJ 648, L109', url: 'https://ui.adsabs.harvard.edu/abs/2006ApJ...648L.109C/abstract' },
      { text: 'Planck Collaboration (2018), Cosmological parameters — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
      { text: 'Sanford Lab — LZ 2025 result', url: 'https://sanfordlab.org/lz-2025-result' },
      { text: 'Berkeley Lab (1/9/2026) — LZ sees surprising result in search for dark matter', url: 'https://newscenter.lbl.gov/2026/09/01/lz-sees-surprising-result-in-search-for-dark-matter/' },
      { text: 'K. C. Freeman (1970), On the disks of spiral and S0 galaxies, ApJ 160, 811 — đường cong quay của đĩa hàm mũ', url: 'https://ui.adsabs.harvard.edu/abs/1970ApJ...160..811F' },
    ],
  },

  /* ——— 7.4 ——— */
  'nhom-sieu-dam': {
    short: 'Thiên hà tụ thành nhóm (vài chục thiên hà sáng), đám (hàng trăm tới hàng nghìn) và siêu đám; Ngân Hà thuộc Nhóm Địa phương, nằm trong siêu đám Laniakea.',
    certainty: { level: 'established', label: 'Đã xác lập · tương lai va chạm Andromeda còn tranh luận' },
    definition: {
      vi: 'Đám thiên hà là tập hợp hàng trăm tới hàng nghìn thiên hà liên kết với nhau bởi lực hấp dẫn; tập hợp nhỏ hơn, thường không quá vài chục thiên hà sáng, gọi là nhóm.',
      source: `Diễn giải theo ${IAU_OAE}: Galaxy Cluster`,
      url: 'https://astro4edu.org/resources/glossary/term-detail/120',
      paraphrase: true,
    },
    body: [
      'Ngân Hà có láng giềng. Cùng với Andromeda (cách khoảng 2,5 triệu năm ánh sáng), Thiên hà Tam Giác (Triangulum, M33) và nhiều thiên hà lùn, nó tạo thành **Nhóm Địa phương** (Local Group): hơn 100 thành viên đã biết (tính đến 2026), phần lớn là thiên hà lùn, trải trong khoảng 10 triệu năm ánh sáng. Ở quy mô này, lực hấp dẫn thắng sự giãn nở của vũ trụ: Andromeda đang tiến về phía ta. Năm 2012, các phép đo bằng Hubble dự đoán hai thiên hà sẽ va chạm sau khoảng 4 tỷ năm. Phân tích năm 2025, có tính tới M33 và Đám Mây Magellan Lớn, cho xác suất chỉ khoảng 50 % trong 10 tỷ năm tới; một phân tích năm 2026 dùng chuyển động riêng mới của Andromeda từ Gaia lại cho khoảng 90 %. Câu hỏi vẫn còn mở.',
      'Lớn hơn là các **đám** thiên hà (galaxy cluster). Đám lớn gần nhất là Đám Virgo, cách khoảng 54 triệu năm ánh sáng, với khoảng 2 000 thiên hà, trong đó có M87. Năm 2014, nhóm của Brent Tully vẽ bản đồ chuyển động của hàng nghìn thiên hà và xác định ranh giới siêu đám (supercluster) chứa ta: **Laniakea** (tiếng Hawaii, “bầu trời bao la”), rộng khoảng 520 triệu năm ánh sáng, chứa khoảng 100 000 thiên hà, với dòng chuyển động hướng về một vùng gọi là **Vùng hút lớn** (Great Attractor).',
    ],
    viz: {
      module: 'cosmic-zoom', height: 440, mobileHeight: 380,
      caption: 'Kéo bề rộng khung nhìn để đi ra từ Ngân Hà tới Nhóm Địa phương, Đám Virgo và Laniakea. Khoảng cách và kích thước làm tròn theo số đo; vị trí từng chấm là minh hoạ.',
    },
    numbers: [
      { value: '~2,5 triệu năm ánh sáng', label: 'khoảng cách tới Andromeda, thiên hà lớn gần nhất', source: 'research/thang-bac-vu-tru.md' },
      { value: '~54 triệu năm ánh sáng', label: 'khoảng cách tới Đám Virgo (~2 000 thiên hà)', source: 'NASA/Hubble' },
      { value: '~520 triệu năm ánh sáng', label: 'bề rộng siêu đám Laniakea, khoảng 10¹⁷ lần khối lượng Mặt Trời', source: 'Tully và cộng sự 2014, Nature' },
    ],
    myths: [
      { myth: 'Khi hai thiên hà va chạm, các ngôi sao sẽ đâm vào nhau.', truth: 'Quanh Mặt Trời, khoảng cách giữa các sao lớn gấp hàng chục triệu lần kích thước của chúng (Mặt Trời rộng 1,4 triệu km, sao gần nhất cách khoảng 4 × 10¹³ km), nên sao hầu như không va vào nhau; chúng chỉ đổi quỹ đạo. Khí va chạm có thể kích hoạt một đợt sinh sao mới.' },
      { myth: 'Andromeda chắc chắn sẽ đâm vào Ngân Hà sau 4 tỷ năm.', truth: 'Đó là dự đoán năm 2012. Các phân tích sau dùng số liệu Gaia cho xác suất từ khoảng 50 % (2025) tới khoảng 90 % (2026), tuỳ dữ liệu; đây là câu hỏi đang được tranh luận (tính tới 11/2026).' },
    ],
    sources: [
      { text: 'Tully và cộng sự (2014), The Laniakea supercluster of galaxies, Nature 513, 71', url: 'https://doi.org/10.1038/nature13674' },
      { text: 'NASA — M87 and surrounding galaxies in the Virgo Cluster', url: 'https://science.nasa.gov/asset/hubble/m87-and-surrounding-galaxies-in-the-virgo-cluster/' },
      { text: 'Sawala và cộng sự (2025), No certainty of a Milky Way–Andromeda collision, Nature Astronomy', url: 'https://doi.org/10.1038/s41550-025-02563-1' },
      { text: 'Wu và cộng sự (2026), xác suất va chạm M31 – Ngân Hà với chuyển động riêng Gaia — arXiv:2603.22863', url: 'https://arxiv.org/abs/2603.22863' },
      { text: 'van der Marel và cộng sự (2012), dự đoán va chạm M31 – Ngân Hà (ScienceDaily)', url: 'https://www.sciencedaily.com/releases/2012/05/120531135438.htm' },
    ],
  },

  /* ——— 7.5 ——— */
  'mang-luoi-vu-tru': {
    short: 'Ở quy mô lớn nhất, thiên hà xếp thành mạng lưới gồm sợi, tường và nút bao quanh những khoảng trống mênh mông.',
    certainty: { level: 'established', label: 'Đã xác lập · chi tiết hình thành mô tả bằng mô phỏng' },
    definition: {
      vi: 'Thiên hà, các nhóm và đám thiên hà, siêu đám và những “bức tường” thiên hà được sắp xếp thành những cấu trúc dạng sợi xoắn bện gọi là mạng lưới vũ trụ — một thứ giàn giáo nâng đỡ mọi thứ trong vũ trụ.',
      source: 'Diễn giải theo NASA Science — Large-scale structures',
      url: 'https://science.nasa.gov/universe/galaxies/large-scale-structures',
      paraphrase: true,
    },
    body: [
      'Vẽ vị trí ba chiều của hàng triệu thiên hà — mỗi thiên hà xác định khoảng cách bằng [[dich-chuyen-do|dịch chuyển đỏ]] — người ta không thấy chúng rải đều, mà thấy một mạng lưới: những **sợi** (filament) dài hàng chục tới hàng trăm triệu năm ánh sáng, gặp nhau ở các **nút** là các đám thiên hà, bao quanh những **khoảng trống** (void) gần như rỗng. Khoảng trống Boötes, phát hiện năm 1981, rộng khoảng 250–330 triệu năm ánh sáng tuỳ cách đo, nhưng chỉ chứa vài chục thiên hà.',
      'Nguồn gốc của mạng lưới là những gợn mật độ cực nhỏ trong vũ trụ sơ khai — cỡ một phần trăm nghìn, thấy được trong [[phong-vi-song|bức xạ phông vi sóng]]. Vùng hơi đặc hơn hút thêm vật chất, chủ yếu là [[vat-chat-toi|vật chất tối]]; vật chất co lại theo một hướng thành tấm, rồi thành sợi, rồi dồn về nút. Khí và thiên hà bám theo giàn giáo vật chất tối ấy.',
    ],
    viz: {
      module: 'cosmic-web', height: 460, mobileHeight: 380,
      caption: 'Mô hình hai chiều: các hạt ban đầu xếp gần đều, rồi dịch chuyển theo gần đúng Zel’dovich (1970) — vị trí = vị trí ban đầu + hệ số tăng trưởng × gradient của một trường gợn ngẫu nhiên. Kéo thời gian để thấy tường, sợi và khoảng trống xuất hiện. Gần đúng này chỉ đúng ở giai đoạn đầu; các mô phỏng N vật đầy đủ mới mô tả chính xác giai đoạn sau.',
    },
    after: [
      'Bản đồ ba chiều lớn nhất (tính tới 11/2026) đến từ máy quang phổ DESI ở Arizona. Bản dữ liệu DR1 (công bố 19/3/2025) chứa 18,7 triệu vật thể có dịch chuyển đỏ. Ở quy mô vài trăm triệu năm ánh sáng trở lên, mạng lưới trông đồng đều về mặt thống kê: cấu trúc không lớn thêm mãi, dù vài cấu trúc lớn bất thường được báo cáo vẫn đang gây tranh luận. Đó là cơ sở của **nguyên lý vũ trụ học** (cosmological principle) — vũ trụ ở quy mô lớn giống nhau ở mọi nơi và mọi hướng.',
    ],
    numbers: [
      { value: '18,7 triệu', label: 'vật thể có dịch chuyển đỏ trong DESI DR1 (19/3/2025)', source: 'DESI' },
      { value: '~250–330 triệu năm ánh sáng', label: 'bề rộng khoảng trống Boötes, tuỳ nguồn', source: 'NED (Bothun)' },
      { value: '~1 phần 100 000', label: 'độ chênh mật độ ban đầu thấy trong phông vi sóng — mầm của mạng lưới', source: 'COBE, Planck' },
    ],
    myths: [
      { myth: 'Khoảng trống vũ trụ hoàn toàn trống rỗng.', truth: 'Khoảng trống có mật độ thấp hơn trung bình nhiều nhưng vẫn có thiên hà; khoảng trống Boötes chứa vài chục thiên hà.' },
      { myth: 'Những hình mạng lưới vũ trụ phổ biến là ảnh chụp.', truth: 'Phần lớn là kết quả mô phỏng máy tính hoặc bản đồ vị trí dựng từ dịch chuyển đỏ. Ảnh trực tiếp của các sợi khí mới chỉ có ở vài đoạn nhỏ.' },
    ],
    sources: [
      { text: 'DESI — Data releases (DR1, 3/2025)', url: 'https://data.desi.lbl.gov/doc/releases/' },
      { text: 'G. Bothun — The Boötes void (NED)', url: 'https://ned.ipac.caltech.edu/level5/Bothun2/Bothun3_5_3.html' },
      { text: 'Ya. B. Zel’dovich (1970), Gravitational instability: an approximate theory for large density perturbations, A&A 5, 84', url: 'https://ui.adsabs.harvard.edu/abs/1970A%26A.....5...84Z' },
      { text: 'Planck Collaboration (2018) — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
    ],
  },
};
