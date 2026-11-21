// Chương 9 — Hành tinh và sự sống. Dữ kiện & nguồn: research/hanh-tinh-su-song.md (số ngoại hành tinh 15/10/2026).
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Năm 1994, con người chưa biết một hành tinh nào quay quanh một ngôi sao giống Mặt Trời ngoài Hệ Mặt Trời. Đến tháng 10/2026, danh mục của NASA đã ghi nhận hơn 6 400 ngoại hành tinh được xác nhận. Câu hỏi “có những thế giới khác không?” đã có lời đáp; câu hỏi tiếp theo khó hơn nhiều.',
    'Chương này đi qua ba bậc, mỗi bậc khó hơn bậc trước: tìm hành tinh quanh các sao khác — đã làm được hàng nghìn lần; xác định hành tinh nào ở chỗ có thể có nước lỏng — đã có ứng viên; và tìm dấu hiệu của sự sống — cho tới nay chưa có bằng chứng nào được giới khoa học chấp nhận.',
  ],
  diagram: {
    nodes: [
      { id: 'ngoai-hanh-tinh', x: 12, y: 18, big: true },
      { id: 'vung-song-duoc', x: 46, y: 26, big: true },
      { id: 'sinh-hoc-vu-tru', x: 80, y: 18, big: true },
      { id: 'thau-kinh-hap-dan', x: 10, y: 50 },
      { id: 'quang-pho', x: 52, y: 54 },
      { id: 'bieu-do-hr', x: 30, y: 52 },
    ],
    edges: [
      ['ngoai-hanh-tinh', 'vung-song-duoc', 'khoảng cách tới sao'],
      ['vung-song-duoc', 'sinh-hoc-vu-tru', 'điều kiện cần'],
      ['thau-kinh-hap-dan', 'ngoai-hanh-tinh', 'vi thấu kính'],
      ['bieu-do-hr', 'vung-song-duoc', 'độ trưng của sao'],
      ['quang-pho', 'sinh-hoc-vu-tru', 'khí quyển, dấu hiệu sinh học'],
    ],
  },
  sources: [
    { text: 'NASA Exoplanet Archive', url: 'https://exoplanetarchive.ipac.caltech.edu/' },
    { text: 'NASA — What is the habitable zone?', url: 'https://science.nasa.gov/exoplanets/what-is-the-habitable-zone-or-goldilocks-zone' },
    { text: 'Green và cộng sự (2021), Call for a framework for reporting evidence for life beyond Earth, Nature 598, 575', url: 'https://doi.org/10.1038/s41586-021-03804-9' },
  ],
};

export const CONCEPTS = {
  /* ——— 9.1 ——— */
  'ngoai-hanh-tinh': {
    short: 'Hành tinh quay quanh một ngôi sao khác ngoài Mặt Trời; hơn 6 400 đã được xác nhận (10/2026), phần lớn nhờ phương pháp quá cảnh.',
    certainty: { level: 'established', label: 'Đã xác lập · số lượng cập nhật 15/10/2026' },
    definition: {
      vi: 'Ngoại hành tinh là bất kỳ hành tinh nào nằm ngoài Hệ Mặt Trời của chúng ta.',
      en: 'An exoplanet is any planet beyond our solar system.',
      source: 'NASA Science — Exoplanets',
      url: 'https://science.nasa.gov/exoplanets/',
    },
    body: [
      'Ngoại hành tinh (exoplanet) gần như không thể nhìn thấy trực tiếp: nó mờ hơn ngôi sao của nó hàng triệu tới hàng tỷ lần và ở rất sát ngôi sao trên bầu trời. Vì thế hầu hết được phát hiện **gián tiếp**, qua tác động lên ngôi sao. Những hành tinh đầu tiên được xác nhận (1992) lại quay quanh một sao chết — sao xung (pulsar) PSR B1257+12 — và lộ ra qua những sai lệch nhỏ trong nhịp xung của nó. Năm 1995, Michel Mayor và Didier Queloz tìm ra 51 Pegasi b, hành tinh đầu tiên quanh một ngôi sao giống Mặt Trời, và nhận giải Nobel Vật lý 2019.',
      'Hai phương pháp chính bổ sung cho nhau. **Quá cảnh** (transit): khi hành tinh đi ngang trước ngôi sao, ngôi sao mờ đi một tỉ lệ bằng bình phương tỉ số bán kính — cho biết **kích thước** hành tinh. Sao Mộc làm Mặt Trời mờ đi khoảng 1 %; Trái Đất chỉ khoảng 84 phần triệu. **Vận tốc xuyên tâm** (radial velocity): hành tinh và sao cùng quay quanh khối tâm chung, nên sao “lắc” qua lại và các vạch [[quang-pho|quang phổ]] của nó lệch qua lại theo [[dich-chuyen-do|hiệu ứng Doppler]] — cho biết **khối lượng** (tối thiểu). Có cả hai thì tính được mật độ: hành tinh đá hay khí.',
    ],
    formulas: ['$$\\frac{\\Delta F}{F} = \\left(\\frac{R_p}{R_\\star}\\right)^2 \\qquad K = \\left(\\frac{2\\pi G}{P}\\right)^{1/3} \\frac{m_p \\sin i}{(M_\\star + m_p)^{2/3}}$$'],
    symbols: [
      ['$\\Delta F / F$', 'độ sâu quá cảnh — tỉ lệ ánh sáng bị che'],
      ['$R_p, R_\\star$', 'bán kính hành tinh và ngôi sao'],
      ['$K$', 'biên độ vận tốc xuyên tâm của ngôi sao (quỹ đạo tròn)'],
      ['$P, i$', 'chu kỳ quỹ đạo và góc nghiêng của quỹ đạo so với hướng nhìn'],
    ],
    viz: {
      module: 'transit', height: 460, mobileHeight: 520,
      caption: 'Chỉnh kích thước và khối lượng hành tinh (quanh một sao giống Mặt Trời). Trên: đường cong ánh sáng khi quá cảnh, có tính tối rìa đơn giản; trục dọc được phóng to theo độ sâu. Dưới: vận tốc xuyên tâm của ngôi sao. Các con số tính từ công thức bên trên.',
    },
    after: [
      'Kính Kepler (2009–2018) và TESS (từ 2018) của NASA đã biến quá cảnh thành phương pháp chủ lực: khoảng ba phần tư số ngoại hành tinh đã biết được tìm bằng cách này. Ngày 8/10/2026, NASA Exoplanet Archive ghi nhận hành tinh được xác nhận thứ 1 000 do TESS phát hiện. Các phương pháp khác: [[thau-kinh-hap-dan|vi thấu kính hấp dẫn]], chụp ảnh trực tiếp (direct imaging; chỉ khoảng 1–2 %), và trắc lượng (astrometry) — đo ngôi sao lắc trên nền trời, mà bản dữ liệu Gaia DR4 (dự kiến 2/12/2026) sẽ đóng góp lớn. Năm 2017, các nhà thiên văn công bố hệ TRAPPIST-1, cách khoảng 40 năm ánh sáng, có bảy hành tinh cỡ Trái Đất.',
    ],
    numbers: [
      { value: '6 451', label: 'ngoại hành tinh đã xác nhận trên NASA Exoplanet Archive (15/10/2026); Archive tính cả vật thể tới 30 lần khối lượng Sao Mộc', source: 'NASA Exoplanet Archive' },
      { value: '84 phần triệu', label: 'độ sáng Mặt Trời giảm khi Trái Đất đi ngang trước nó (Sao Mộc: ~1 %)', source: 'Tự tính (R⊕/R☉)²' },
      { value: '~9 cm/s', label: 'Mặt Trời lắc do Trái Đất (do Sao Mộc: ~12,5 m/s)', source: 'Tự tính' },
    ],
    myths: [
      { myth: 'Kính thiên văn chụp được ảnh bề mặt ngoại hành tinh.', truth: 'Gần như mọi ngoại hành tinh được phát hiện gián tiếp. Ảnh trực tiếp chỉ là một chấm sáng; những hình có lục địa, mây trên báo là hình minh hoạ.' },
      { myth: '51 Pegasi b là ngoại hành tinh đầu tiên được tìm thấy.', truth: 'Các hành tinh đầu tiên được xác nhận (1992) quay quanh pulsar PSR B1257+12. 51 Pegasi b (1995) là hành tinh đầu tiên quanh một ngôi sao giống Mặt Trời.' },
    ],
    khamPha: [{ href: '#ho-so-jupiter', label: 'Hồ sơ Sao Mộc' }, { href: '#ho-so-earth', label: 'Hồ sơ Trái Đất' }],
    sources: [
      { text: 'NASA Exoplanet Archive (trang chủ, 15/10/2026)', url: 'https://exoplanetarchive.ipac.caltech.edu/' },
      { text: 'NASA HEASARC — TESS reaches 1 000 confirmed exoplanets (10/2026)', url: 'https://heasarc.gsfc.nasa.gov/docs/tess/tess-reaches-1000-confirmed-exoplanets.html' },
      { text: 'ESA — Gaia news (DR4 2/12/2026)', url: 'https://www.cosmos.esa.int/web/gaia/news' },
      { text: 'Giải Nobel Vật lý 2019 — Mayor & Queloz', url: 'https://www.nobelprize.org/prizes/physics/2019/summary/' },
      { text: 'Lecavelier des Etangs & Lissauer (2022), The IAU working definition of an exoplanet', url: 'https://hal.sorbonne-universite.fr/hal-03631543' },
    ],
  },

  /* ——— 9.2 ——— */
  'vung-song-duoc': {
    short: 'Khoảng cách quanh một ngôi sao ở đó hành tinh đá có thể giữ nước lỏng trên bề mặt — không quá nóng, không quá lạnh.',
    certainty: { level: 'strong', label: 'Khái niệm được dùng rộng rãi · ranh giới phụ thuộc mô hình khí hậu' },
    definition: {
      vi: 'Vùng có thể sống được là khu vực quanh một ngôi sao nơi không quá nóng và không quá lạnh để nước lỏng tồn tại trên bề mặt các hành tinh xung quanh.',
      en: 'the habitable zone is the area around a star where it is not too hot and not too cold for liquid water to exist on the surface of surrounding planets',
      source: 'NASA Science — What is the habitable zone or “Goldilocks zone”?',
      url: 'https://science.nasa.gov/exoplanets/what-is-the-habitable-zone-or-goldilocks-zone',
    },
    body: [
      'Sự sống như ta biết cần nước lỏng. Một hành tinh quá gần sao thì nước bốc hơi hết; quá xa thì đóng băng. Ở giữa là **vùng có thể sống được** (habitable zone), còn gọi theo truyện cổ là “vùng Goldilocks”. Với Mặt Trời, mô hình khí hậu của Kopparapu và cộng sự (2013) cho vùng bảo thủ từ khoảng 0,99 tới 1,70 [[don-vi-thien-van|au]]; vùng lạc quan, dựa trên việc Sao Kim có thể từng có nước và Sao Hoả sơ khai từng có sông, rộng từ khoảng 0,75 tới 1,77 au. Trái Đất nằm sát biên trong.',
      'Vùng này phụ thuộc mạnh vào ngôi sao. Sao càng mờ, vùng sống được càng gần — với một sao lùn đỏ (red dwarf) nhỏ, vùng này gần sao hơn quỹ đạo Sao Thuỷ quanh Mặt Trời khoảng 10–17 lần, và hành tinh ở đó quay một vòng chỉ trong vài ngày tới khoảng mười hai ngày. Đó là trường hợp của TRAPPIST-1. Khí quyển cũng quan trọng không kém: không có hiệu ứng nhà kính, nhiệt độ cân bằng của Trái Đất chỉ khoảng −18 °C; thực tế trung bình là +15 °C.',
    ],
    formulas: ['$$T_{\\text{cb}} = \\left(\\frac{L\\,(1 - A)}{16\\pi\\sigma d^2}\\right)^{1/4}$$'],
    symbols: [
      ['$T_{\\text{cb}}$', 'nhiệt độ cân bằng của hành tinh (chưa tính nhà kính)'],
      ['$L$', 'độ trưng của ngôi sao'],
      ['$A$', 'suất phản chiếu (albedo) của hành tinh; Trái Đất khoảng 0,3'],
      ['$d, \\sigma$', 'khoảng cách tới sao; hằng số Stefan–Boltzmann'],
    ],
    viz: {
      module: 'habitable-zone', height: 360, mobileHeight: 320,
      caption: 'Chỉnh khối lượng ngôi sao và kéo hành tinh thử. Vùng xanh đậm là vùng bảo thủ, xanh nhạt là vùng lạc quan, tính theo hệ số của Kopparapu và cộng sự; độ trưng và nhiệt độ của sao lấy theo quan hệ dãy chính gần đúng.',
    },
    after: [
      'Vùng sống được kinh điển chỉ nói về nước trên **bề mặt**. Enceladus của Sao Thổ và — theo nhiều bằng chứng mạnh — Europa của Sao Mộc ở xa ngoài vùng này nhưng có đại dương nước lỏng dưới lớp băng, được giữ ấm bằng [[luc-thuy-trieu|nhiệt thuỷ triều]]. Năm 2023, phân tích dữ liệu của tàu Cassini phát hiện phosphate trong các hạt băng phun ra từ đại dương của Enceladus.',
    ],
    numbers: [
      { value: '0,99–1,70 au', label: 'vùng sống được bảo thủ của Mặt Trời (lạc quan: 0,75–1,77 au)', source: 'Kopparapu và cộng sự 2013, ApJ 765, 131' },
      { value: '−18 °C → +15 °C', label: 'nhiệt độ Trái Đất không có và có hiệu ứng nhà kính (~+33 K)', source: 'Tự tính; giá trị giáo khoa' },
      { value: '7', label: 'hành tinh cỡ Trái Đất của TRAPPIST-1, cách ~40 năm ánh sáng; e, f, g thường được xếp trong vùng sống được', source: 'Gillon và cộng sự 2017, Nature' },
    ],
    myths: [
      { myth: 'Hành tinh trong vùng sống được thì có sự sống.', truth: '“Có thể sống được” chỉ là một điều kiện về khoảng cách. Còn cần khí quyển, nước, và nhiều điều kiện khác; có thể sống được không có nghĩa là có sinh vật.' },
      { myth: 'Ngoài vùng sống được thì không thể có nước lỏng.', truth: 'Enceladus, và rất có thể cả Europa, có đại dương dưới lớp băng, sưởi bằng nhiệt thuỷ triều, ở xa ngoài vùng kinh điển.' },
    ],
    khamPha: [{ href: '#ho-so-venus', label: 'Hồ sơ Sao Kim' }, { href: '#ho-so-mars', label: 'Hồ sơ Sao Hoả' }],
    sources: [
      { text: 'NASA — What is the habitable zone or “Goldilocks zone”?', url: 'https://science.nasa.gov/exoplanets/what-is-the-habitable-zone-or-goldilocks-zone' },
      { text: 'Kopparapu và cộng sự (2013), Habitable zones around main-sequence stars — arXiv:1301.6674', url: 'https://arxiv.org/abs/1301.6674' },
      { text: 'Postberg và cộng sự (2023), Detection of phosphates originating from Enceladus’s ocean, Nature 618, 489', url: 'https://www.nature.com/articles/s41586-023-05987-9' },
      { text: 'Harvard CfA — Habitable zones', url: 'https://www.cfa.harvard.edu/news/habitable-zones' },
    ],
  },

  /* ——— 9.3 ——— */
  'sinh-hoc-vu-tru': {
    short: 'Ngành nghiên cứu nguồn gốc, tiến hoá, phân bố và tương lai của sự sống trong vũ trụ; tới 11/2026 chưa có bằng chứng sự sống ngoài Trái Đất được chấp nhận.',
    certainty: { level: 'debated', label: 'Chưa phát hiện sự sống ngoài Trái Đất · các ứng viên đang tranh luận' },
    definition: {
      vi: 'Sinh học vũ trụ là ngành nghiên cứu nguồn gốc, sự tiến hoá, sự phân bố và tương lai của sự sống trong vũ trụ.',
      en: 'the study of the origin, evolution, distribution, and future of life in the universe',
      source: 'NASA Astrobiology',
      url: 'https://astrobiology.nasa.gov/nai/about/',
    },
    body: [
      'Sinh học vũ trụ (astrobiology) đi tìm câu trả lời theo hai hướng. Trong Hệ Mặt Trời, tàu vũ trụ có thể đo tại chỗ. Tháng 7/2024, xe tự hành Perseverance khoan mẫu “Sapphire Canyon” từ tảng đá “Cheyava Falls” ở hố Jezero trên Sao Hoả. Tảng đá có những “đốm da báo” chứa khoáng chất thường gắn với vi sinh vật trên Trái Đất, nằm cạnh chất hữu cơ; bài báo trên _Nature_ (9/2025) xếp đây là **dấu hiệu sinh học tiềm năng** (potential biosignature), chưa phải bằng chứng sự sống, vì các quá trình không có sự sống cũng có thể tạo ra chúng. Tàu Europa Clipper (NASA) sẽ tới Sao Mộc năm 2030 và JUICE (ESA) năm 2031 để đánh giá các đại dương dưới băng.',
      'Ngoài Hệ Mặt Trời, cách chính hiện nay là đọc [[quang-pho|quang phổ]] khí quyển của ngoại hành tinh, chẳng hạn khi ánh sao xuyên qua khí quyển lúc quá cảnh (phổ truyền qua, transmission spectrum). Một **dấu hiệu sinh học** (biosignature) mạnh không phải một khí đơn lẻ — oxy hay methane đều có thể sinh ra mà không cần sự sống (oxy từ quang phân ly nước, methane từ hoạt động địa chất) — mà là một hỗn hợp mất cân bằng hoá học, như oxy và methane cùng tồn tại. Tháng 4/2025, một nhóm báo cáo đặc trưng phổ phù hợp với khí dimethyl sulfide (DMS) trên hành tinh K2-18 b ở mức khoảng 3σ, thấp hơn ngưỡng 5σ thường dùng để tuyên bố phát hiện; các phân tích độc lập sau đó cho thấy dữ liệu giải thích được mà không cần DMS. Câu hỏi vẫn đang tranh luận, với đa số phân tích nghiêng về “chưa đủ bằng chứng”.',
    ],
    viz: {
      module: 'drake', height: 440, mobileHeight: 460,
      caption: 'Phương trình Drake (1961): số nền văn minh phát tín hiệu dò được trong Ngân Hà là tích của bảy thừa số. Hai thừa số đầu đã được thiên văn học đo khá tốt, thừa số thứ ba (số hành tinh có thể sống được trong mỗi hệ) mới ước lượng được với sai số lớn; bốn thừa số sau hoàn toàn chưa biết. Kéo chúng để thấy kết quả thay đổi hàng chục bậc độ lớn — phương trình cho biết cần đo gì, không cho đáp án.',
    },
    after: [
      'Vì tuyên bố “đã tìm thấy sự sống” có hệ quả lớn, năm 2021 các nhà khoa học NASA đề xuất thang tin cậy **CoLD** (Confidence of Life Detection) gồm bảy bậc, từ “phát hiện một tín hiệu có thể do sự sống” tới “quan sát độc lập xác nhận”. Các ứng viên hiện nay đều ở những bậc thấp. Trên Trái Đất, dấu vết sự sống sớm nhất được chấp nhận rộng rãi có tuổi khoảng 3,5 tỷ năm; những dấu vết cổ hơn còn đang tranh luận.',
    ],
    numbers: [
      { value: '0', label: 'bằng chứng sự sống ngoài Trái Đất được giới khoa học chấp nhận (tính tới 11/2026)', source: 'Green và cộng sự 2021; các nguồn bên dưới' },
      { value: '~3σ', label: 'mức tín hiệu DMS báo cáo trên K2-18 b (4/2025); ngưỡng phát hiện thường dùng là 5σ', source: 'Madhusudhan và cộng sự 2025; các phân tích phản biện' },
      { value: '11/4/2030', label: 'Europa Clipper vào quỹ đạo quanh Sao Mộc (phóng 14/10/2024)', source: 'NASA' },
    ],
    myths: [
      { myth: 'Đã tìm thấy sự sống ngoài Trái Đất.', truth: 'Chưa có bằng chứng nào được chấp nhận. K2-18 b và mẫu đá Cheyava Falls trên Sao Hoả đều là ứng viên còn đang tranh luận.' },
      { myth: 'Tìm thấy chất hữu cơ hay phosphate là tìm thấy sự sống.', truth: 'Đó là nguyên liệu của sự sống, có thể hình thành mà không cần sinh vật (có cả trong thiên thạch và sao chổi). Chúng cho thấy một nơi có thể sống được, không chứng minh có sinh vật.' },
    ],
    khamPha: [{ href: '#ho-so-mars', label: 'Hồ sơ Sao Hoả' }, { href: '#ho-so-jupiter', label: 'Hồ sơ Sao Mộc (Europa)' }, { href: '#ho-so-saturn', label: 'Hồ sơ Sao Thổ (Enceladus)' }],
    khaoLuan: [{ label: 'Chúng ta có cô đơn trong vũ trụ?' }],
    sources: [
      { text: 'NASA Astrobiology Institute — About', url: 'https://astrobiology.nasa.gov/nai/about/' },
      { text: 'ScienceDaily (9/2025) tóm tắt Hurowitz và cộng sự (2025), Redox-driven mineral and organic associations in Jezero crater, Mars, Nature', url: 'https://sciencedaily.com/releases/2025/09/250916032210.htm' },
      { text: 'Phân tích phản biện K2-18 b: Insufficient evidence for DMS and DMDS — arXiv:2505.13407', url: 'https://arxiv.org/abs/2505.13407' },
      { text: 'Schmidt và cộng sự — K2-18 b như một tiểu Sao Hải Vương — arXiv:2501.18477', url: 'https://arxiv.org/abs/2501.18477' },
      { text: 'Green và cộng sự (2021), thang CoLD, Nature 598, 575', url: 'https://doi.org/10.1038/s41586-021-03804-9' },
      { text: 'NASA — Europa Clipper arrival date', url: 'https://science.nasa.gov/image-detail/europaclipper-arrivaldate' },
    ],
  },
};
