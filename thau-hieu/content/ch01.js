// Chương 1 — Thước đo vũ trụ. Dữ kiện & nguồn: research/thuoc-do-vu-tru.md, research/thang-bac-vu-tru.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Thiên văn học có một khó khăn đặc biệt: ta không thể đi tới, không thể kéo thước dây, chỉ có thể **nhìn**. Vậy mà ngày nay ta biết Sao Hải Vương cách Mặt Trời 30 lần khoảng cách Trái Đất, ngôi sao gần nhất cách 4,25 năm ánh sáng, và thiên hà Andromeda cách khoảng 2,5 triệu năm ánh sáng.',
    'Câu trả lời không phải một cây thước mà là một **bậc thang**: radar định ra khoảng cách trong Hệ Mặt Trời; khoảng cách đó làm đường đáy cho phép đo thị sai; thị sai hiệu chuẩn các ngôi sao “hải đăng” Cepheid; Cepheid hiệu chuẩn siêu tân tinh Ia — và cứ thế ra tới hàng tỷ năm ánh sáng. Chương này đi lần lượt từng bậc.',
  ],
  diagram: {
    nodes: [
      { id: 'van-toc-anh-sang', x: 8, y: 8, label: 'Tốc độ ánh sáng c' },
      { id: 'don-vi-thien-van', x: 24, y: 20, big: true },
      { id: 'nam-anh-sang', x: 8, y: 42 },
      { id: 'thi-sai-parsec', x: 42, y: 12, big: true },
      { id: 'cepheid', x: 58, y: 24, big: true },
      { id: 'sieu-tan-tinh-ia', x: 74, y: 36, big: true },
      { id: 'hang-so-hubble', x: 92, y: 46, label: 'Hằng số Hubble H₀' },
      { id: 'thang-khoang-cach', x: 50, y: 50 },
      { id: 'nhin-ve-qua-khu', x: 28, y: 52 },
    ],
    edges: [
      ['van-toc-anh-sang', 'don-vi-thien-van', 'radar'],
      ['don-vi-thien-van', 'thi-sai-parsec', 'đường đáy'],
      ['thi-sai-parsec', 'cepheid', 'hiệu chuẩn'],
      ['cepheid', 'sieu-tan-tinh-ia', 'hiệu chuẩn'],
      ['sieu-tan-tinh-ia', 'hang-so-hubble', 'so với dịch chuyển đỏ'],
      ['don-vi-thien-van', 'nam-anh-sang', ''],
      ['nam-anh-sang', 'nhin-ve-qua-khu', 'khoảng cách = thời gian'],
      ['cepheid', 'thang-khoang-cach', ''],
    ],
  },
  sources: [
    { text: 'IAU (2012), Nghị quyết B2 — định nghĩa lại đơn vị thiên văn', url: 'https://www.iau.org/static/resolutions/IAU2012_English.pdf' },
    { text: 'Mamajek và cộng sự (2015), IAU 2015 Resolution B2 — arXiv:1510.06262', url: 'https://arxiv.org/abs/1510.06262' },
    { text: 'ESA Gaia — Early Data Release 3', url: 'https://www.cosmos.esa.int/web/gaia/earlydr3' },
    { text: 'ESA/Hubble (2016), heic1611 — bậc thang khoảng cách vũ trụ', url: 'https://esahubble.org/images/heic1611a/' },
    { text: 'Giải Nobel Vật lý 2011', url: 'https://www.nobelprize.org/prizes/physics/2011/' },
  ],
};

export const CONCEPTS = {
  /* ——— 1.1 ——— */
  'don-vi-thien-van': {
    short: 'Đơn vị độ dài quy ước, bằng đúng 149 597 870 700 m — xấp xỉ khoảng cách Trái Đất – Mặt Trời.',
    certainty: { level: 'established', label: 'Đã xác lập · giá trị theo định nghĩa' },
    definition: {
      vi: 'Đơn vị thiên văn được định nghĩa lại thành một đơn vị độ dài quy ước, bằng đúng 149 597 870 700 m.',
      en: 'the astronomical unit be re-defined to be a conventional unit of length equal to 149 597 870 700 m exactly',
      source: 'Liên đoàn Thiên văn Quốc tế (IAU), Nghị quyết B2, tháng 8/2012',
      url: 'https://www.iau.org/static/resolutions/IAU2012_English.pdf',
    },
    body: [
      'Trong Hệ Mặt Trời, kilômét là đơn vị quá nhỏ: Sao Hải Vương cách Mặt Trời khoảng 4,5 tỷ km — con số khó hình dung. Các nhà thiên văn dùng một cây thước “cỡ hành tinh”: **đơn vị thiên văn**, viết tắt **au**, xấp xỉ khoảng cách Trái Đất – Mặt Trời, chừng 150 triệu km. Nói Sao Mộc cách Mặt Trời 5,2 au là ta hình dung ngay: xa gấp khoảng năm lần Trái Đất.',
      'Đo được au từng là một trong những bài toán lớn nhất của thiên văn học. Các năm 1761 và 1769, nhiều đoàn thám hiểm đi khắp thế giới để quan sát Sao Kim đi qua đĩa Mặt Trời, mong tính ra au bằng hình học; khi J. F. Encke tổng hợp số liệu (1824), ông được khoảng 153 triệu km — lệch chừng 2,5 % so với ngày nay. Năm 1961, radar phát sóng vô tuyến tới Sao Kim và đo thời gian tín hiệu dội về, cho kết quả 149 598 500 ± 500 km — sai số nhỏ hơn hàng nghìn lần.',
      'Năm 2012, IAU chốt au thành một **con số cố định**: đúng 149 597 870 700 m. Từ đó au không còn được suy ra từ hằng số hấp dẫn Gauss (gắn với khối lượng Mặt Trời) và các phép đo quỹ đạo; nó là một độ dài quy ước cố định, giống như mét. IAU khuyến nghị viết tắt bằng chữ thường **au**, dù sách báo vẫn hay viết AU. Ánh sáng đi hết 1 au mất khoảng 499 giây:',
    ],
    formulas: ['$$t = \\frac{d}{c} = \\frac{149\\,597\\,870\\,700\\ \\text{m}}{299\\,792\\,458\\ \\text{m/s}} \\approx 499\\ \\text{s}$$'],
    symbols: [
      ['$t$', 'thời gian ánh sáng đi'],
      ['$d$', 'quãng đường — ở đây là 1 au'],
      ['$c$', 'tốc độ ánh sáng trong chân không, đúng 299 792 458 m/s theo định nghĩa SI'],
    ],
    viz: {
      module: 'scale-ruler', options: { unit: 'au' }, height: 400, mobileHeight: 260,
      caption: 'Kéo con trỏ hoặc chọn một mốc. Mỗi vạch lớn xa gấp 10 lần vạch trước — trên thước thường, nếu Mặt Trăng cách 1 cm thì Proxima Centauri phải cách khoảng 1 000 km.',
    },
    after: [
      'Vì quỹ đạo Trái Đất hơi dẹt, khoảng cách thực tới Mặt Trời dao động từ khoảng 147,1 đến 152,1 triệu km trong năm. Au còn đóng một vai trò lớn hơn cả việc đo Hệ Mặt Trời: nó là **đường đáy** của phép đo [[thi-sai-parsec|thị sai]]. Hầu hết khoảng cách tới các vì sao đều được xây trên con số này.',
    ],
    numbers: [
      { value: '149 597 870 700 m', label: '1 au, chính xác theo định nghĩa', source: 'IAU 2012 B2' },
      { value: '8 phút 19 giây', label: 'thời gian ánh sáng đi 1 au (499,0 s)', source: 'Tính từ c và au' },
      { value: '±500 km', label: 'sai số của phép đo radar Sao Kim năm 1961', source: 'JPL, NASA NTRS' },
    ],
    myths: [
      { myth: 'Au là khoảng cách trung bình chính xác giữa Trái Đất và Mặt Trời.', truth: 'Từ 2012, au là một độ dài quy ước cố định. Nó gần với khoảng cách trung bình Trái Đất – Mặt Trời, nhưng không còn được suy ra từ chuyển động của Trái Đất nữa.' },
      { myth: 'Ánh sáng Mặt Trời tới Trái Đất mất đúng 8 phút 20 giây.', truth: 'Với đúng 1 au là 499 giây ≈ 8 phút 19 giây; thực tế dao động khoảng 490–507 giây theo vị trí của Trái Đất trên quỹ đạo.' },
    ],
    khamPha: [
      { href: '#ho-so-earth', label: 'Hồ sơ Trái Đất' },
      { href: '#ho-so-neptune', label: 'Hồ sơ Sao Hải Vương' },
    ],
    sources: [
      { text: 'IAU (2012), Resolution B2 on the re-definition of the astronomical unit of length', url: 'https://www.iau.org/static/resolutions/IAU2012_English.pdf' },
      { text: 'N. Capitaine — Re-definition of the astronomical unit (SYRTE, Đài thiên văn Paris)', url: 'https://syrte.obspm.fr/IAU_resolutions/Sumredef_au.html' },
      { text: 'Malling & Golomb (1961), Radar measurements of the planet Venus — JPL, NASA NTRS', url: 'https://ntrs.nasa.gov/api/citations/19650018864/downloads/19650018864.pdf' },
      { text: 'Sky & Telescope — The transit of Venus: tales from the 18th and 19th centuries', url: 'https://www.skyandtelescope.com/astronomy-news/history-and-sky-lore/the-transit-of-venus-tales-from-the-18th-and-19th-centuries/' },
      { text: `${IAU_OAE}: Astronomical Unit`, url: 'https://astro4edu.org/resources/glossary/term/26/' },
    ],
  },

  /* ——— 1.2 ——— */
  'nam-anh-sang': {
    short: 'Quãng đường ánh sáng đi trong chân không trong một năm, khoảng 9,46 nghìn tỷ km.',
    certainty: { level: 'established', label: 'Đã xác lập · giá trị theo quy ước (năm Julius)' },
    definition: {
      vi: 'Quãng đường ánh sáng đi được trong chân không trong một năm: 9,46 nghìn tỷ kilômét.',
      en: 'the distance that light travels in vacuum in one year: 9.46 trillion kilometers',
      source: IAU_OAE,
      url: 'https://astro4edu.org/resources/glossary/term/178/',
    },
    body: [
      'Dù có chữ “năm”, năm ánh sáng là đơn vị **khoảng cách**. Ánh sáng đi 299 792 458 m mỗi giây; nhân với số giây trong một năm Julius (365,25 ngày) ta được 9 460 730 472 580 800 m — khoảng 9,46 nghìn tỷ km, hay hơn 63 000 [[don-vi-thien-van|au]].',
      'Điểm mạnh của đơn vị này là nó gắn khoảng cách với **thời gian**. Ngôi sao cách 4,25 năm ánh sáng nghĩa là ánh sáng tới từ nó hôm nay đã rời đi hơn bốn năm trước. Đó là lối vào tự nhiên của ý tưởng [[nhin-ve-qua-khu|nhìn xa là nhìn về quá khứ]].',
      'Tuy vậy, trong các bài báo nghiên cứu, giới thiên văn chủ yếu dùng [[thi-sai-parsec|parsec]] (1 pc ≈ 3,26 năm ánh sáng), vì parsec sinh ra trực tiếp từ phép đo. Năm ánh sáng chủ yếu được dùng trong phổ biến khoa học — như chính trang này.',
    ],
    formulas: ['$$1\\ \\text{ly} = c \\cdot T = 299\\,792\\,458\\ \\tfrac{\\text{m}}{\\text{s}} \\times 31\\,557\\,600\\ \\text{s} \\approx 9{,}4607 \\times 10^{15}\\ \\text{m}$$'],
    symbols: [
      ['$\\text{ly}$', 'năm ánh sáng (light-year)'],
      ['$c$', 'tốc độ ánh sáng trong chân không'],
      ['$T$', 'một năm Julius = 365,25 ngày = 31 557 600 giây (theo khuyến nghị trong Sổ tay văn phong của IAU)'],
    ],
    viz: {
      module: 'scale-ruler', options: { unit: 'ly' }, height: 400, mobileHeight: 260,
      caption: 'Từ sao gần nhất tới thiên hà xa: kéo con trỏ để đọc khoảng cách theo năm ánh sáng, parsec và thời gian ánh sáng đi. Các khoảng cách từ Tinh vân Orion trở đi là giá trị làm tròn.',
    },
    numbers: [
      { value: '9,4607 × 10¹⁵ m', label: '1 năm ánh sáng (năm Julius)', source: 'Tính từ c theo định nghĩa SI' },
      { value: '≈ 63 241 au', label: 'số au trong một năm ánh sáng', source: 'Tính từ IAU 2012 B2' },
      { value: '4,2465 năm ánh sáng', label: 'tới Proxima Centauri, ngôi sao gần nhất', source: 'Gaia EDR3; Reylé và cộng sự 2021' },
    ],
    myths: [
      { myth: 'Năm ánh sáng là một đơn vị thời gian.', truth: 'Là đơn vị khoảng cách: quãng đường ánh sáng đi trong một năm.' },
      { myth: 'Các nhà thiên văn chuyên nghiệp đo khoảng cách bằng năm ánh sáng.', truth: 'Trong nghiên cứu, parsec (và kpc, Mpc) mới là đơn vị chuẩn; IAU OAE ghi rõ năm ánh sáng “hiếm khi dùng” trong nghiên cứu.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Light Year`, url: 'https://astro4edu.org/resources/glossary/term/178/' },
      { text: 'OEIS A213614 — số mét trong một năm ánh sáng', url: 'https://oeis.org/A213614' },
      { text: 'Reylé và cộng sự (2021), khoảng cách Proxima Centauri từ Gaia EDR3 — arXiv:2104.14972', url: 'https://arxiv.org/abs/2104.14972' },
    ],
  },

  /* ——— 1.3 ——— */
  'thi-sai-parsec': {
    short: 'Thị sai là độ dịch biểu kiến của sao gần khi Trái Đất đi quanh Mặt Trời; parsec là khoảng cách ứng với thị sai 1 giây cung (≈ 3,26 năm ánh sáng).',
    certainty: { level: 'established', label: 'Đã xác lập · số liệu Gaia DR3, sẽ cập nhật theo DR4' },
    definition: {
      vi: 'Parsec là khoảng cách mà từ đó nhìn lại, bán kính 1 au chắn một góc đúng 1 giây cung; 1 parsec xấp xỉ 3,26 năm ánh sáng.',
      source: `${IAU_OAE}: Parsec (diễn giải)`,
      url: 'https://astro4edu.org/resources/glossary/term/238/',
    },
    body: [
      'Giơ một ngón tay trước mặt rồi lần lượt nhắm từng mắt: ngón tay như nhảy qua lại trên nền phía sau. Đó là **thị sai**. Sao gần cũng vậy: sau nửa năm, Trái Đất đã sang phía bên kia quỹ đạo (cách chỗ cũ 2 au), và ngôi sao gần dịch chuyển rất nhẹ so với các sao xa hơn nhiều ở phía sau. Góc dịch càng nhỏ, ngôi sao càng xa.',
      'Góc thị sai $p$ là một nửa tổng độ dịch trong năm, tức góc ứng với đường đáy 1 au. Chỉ bằng hình học tam giác, nếu đo $p$ bằng giây cung thì khoảng cách bằng $1/p$, tính bằng **parsec** — tên ghép từ _parallax_ (thị sai) và _second_ (giây cung). Ưu điểm lớn nhất: phương pháp không cần biết gì về bản chất của ngôi sao.',
      'Góc này nhỏ đến khó tin. Proxima Centauri, sao gần nhất, có thị sai chỉ 0,768″ — bằng góc nhìn một đồng xu 1 cm đặt cách 2,7 km. Vì thế mãi đến năm 1838, Friedrich Bessel mới công bố được thị sai đáng tin cậy đầu tiên, của sao 61 Cygni: 0,3136″ (giá trị hiện đại từ Gaia là 0,28615″). Vệ tinh Hipparcos của ESA (1989–1993) đạt độ chính xác khoảng 1 phần nghìn giây cung (mas) cho hơn 118 000 sao; Gaia (2013–2025) đạt 20–30 phần triệu giây cung với sao sáng hơn cấp 15 (dữ liệu EDR3/DR3) và đo thị sai cho khoảng 1,47 tỷ nguồn.',
    ],
    formulas: [
      '$$d = \\frac{1}{p}$$',
      '$$1\\ \\text{pc} = \\frac{648\\,000}{\\pi}\\ \\text{au} \\approx 206\\,265\\ \\text{au} \\approx 3{,}26\\ \\text{ly}$$',
    ],
    symbols: [
      ['$d$', 'khoảng cách, tính bằng parsec (pc)'],
      ['$p$', 'góc thị sai, tính bằng giây cung (1″ = 1/3 600 độ)'],
      ['$\\text{pc}$', 'parsec. Nghị quyết B2 năm 2015 của IAU (về thang cấp sao) đã ngầm cố định parsec bằng đúng 648 000/π au'],
    ],
    viz: {
      module: 'parallax', height: 480, mobileHeight: 440,
      caption: 'Kéo khoảng cách hoặc chọn một ngôi sao. Bên phải là thị trường kính thiên văn: khi sao càng xa, khung nhìn phải phóng to hàng trăm, hàng nghìn lần mới còn thấy nó dịch chuyển. Dòng “sai số khoảng cách” cho thấy vì sao thị sai chỉ dùng được trong một phạm vi giới hạn.',
    },
    after: [
      'Gaia đã ngừng quan sát ngày 15/1/2025. Bộ dữ liệu DR4, dự kiến công bố ngày 2/12/2026, sẽ còn làm chính xác thêm các con số trên. Thị sai là **bậc đầu tiên vượt ra ngoài Hệ Mặt Trời** của [[thang-khoang-cach|bậc thang khoảng cách]]: nó đo được khoảng cách tới những ngôi sao [[cepheid|Cepheid]] gần, từ đó hiệu chuẩn các phương pháp đi xa hơn.',
    ],
    numbers: [
      { value: '0,768″', label: 'thị sai của Proxima Centauri → 4,2465 năm ánh sáng', source: 'Gaia EDR3' },
      { value: '1838', label: 'Bessel công bố thị sai đáng tin cậy đầu tiên (61 Cygni)', source: 'arXiv:2009.11913' },
      { value: '~1,47 tỷ', label: 'nguồn có thị sai trong dữ liệu Gaia EDR3/DR3', source: 'ESA Gaia' },
    ],
    myths: [
      { myth: 'Parsec là đơn vị thời gian (“chạy Kessel Run trong chưa tới 12 parsec”).', truth: 'Parsec là khoảng cách, khoảng 3,26 năm ánh sáng. Câu thoại trong _Star Wars_ (1977) thường bị coi là dùng sai; phim _Solo_ (2018) về sau giải thích đó là quãng đường ngắn hơn.' },
      { myth: 'Thị sai là ngôi sao di chuyển thật.', truth: 'Đó là dịch chuyển biểu kiến, do chính Trái Đất đổi vị trí trên quỹ đạo. Chuyển động thật của sao (chuyển động riêng) là một hiệu ứng khác, phải tách ra khi đo.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Parsec`, url: 'https://astro4edu.org/resources/glossary/term/238/' },
      { text: 'Mamajek và cộng sự (2015), IAU 2015 Resolution B2 — arXiv:1510.06262', url: 'https://arxiv.org/abs/1510.06262' },
      { text: 'The first stellar parallaxes revisited — arXiv:2009.11913', url: 'https://arxiv.org/abs/2009.11913' },
      { text: 'ESA — Hipparcos: about the mission', url: 'https://sci.esa.int/web/hipparcos/-/31905-about-the-mission' },
      { text: 'ESA — Gaia Early Data Release 3', url: 'https://www.cosmos.esa.int/web/gaia/earlydr3' },
      { text: 'ESA — Gaia end of observations (2025)', url: 'https://www.cosmos.esa.int/web/gaia/end-of-observations' },
    ],
  },

  /* ——— 1.4 ——— */
  cepheid: {
    short: 'Sao dao động có chu kỳ sáng – mờ gắn chặt với độ sáng thật, nhờ đó dùng làm “ngọn hải đăng” đo khoảng cách.',
    certainty: { level: 'established', label: 'Đã xác lập · hệ số hiệu chuẩn vẫn đang được tinh chỉnh' },
    definition: {
      vi: 'Cepheid là những sao biến quang dao động; độ sáng của chúng thay đổi do các lớp ngoài của sao co giãn một cách tuần hoàn.',
      en: 'Cepheids are pulsating variable stars whose variability is caused by periodic oscillation of the outer layers of the star.',
      source: `${IAU_OAE}: Cepheid Variable`,
      url: 'https://astro4edu.org/resources/glossary/term/54/',
    },
    body: [
      'Ngay cả với Gaia, thị sai chỉ đo tốt tới khoảng hơn chục nghìn năm ánh sáng, và chỉ với sao sáng. Muốn đi xa hơn cần một thứ khác: một ngôi sao mà ta **biết trước độ sáng thật**. So độ sáng thật với độ sáng nhìn thấy là suy ra được khoảng cách, vì ánh sáng yếu đi theo bình phương khoảng cách. Những ngôi sao như vậy gọi là “ngọn nến chuẩn”, và Cepheid là loại nổi tiếng nhất.',
      'Năm 1908, rồi đầy đủ hơn năm 1912, Henrietta Swan Leavitt ở Đài thiên văn Harvard nhận ra: trong Đám Mây Magellan Nhỏ, Cepheid nào **nhấp nháy chậm hơn thì sáng hơn**. Vì các sao trong đám mây gần như ở cùng khoảng cách, chênh lệch độ sáng nhìn thấy cũng là chênh lệch độ sáng thật. Đó là **quan hệ chu kỳ – độ trưng**, nay gọi là định luật Leavitt. Đo chu kỳ chỉ cần theo dõi ngôi sao qua nhiều đêm — và khi quan hệ đã được hiệu chuẩn, chu kỳ cho ta độ sáng thật.',
      'Năm 1923, Edwin Hubble tìm thấy một Cepheid trong “tinh vân” Andromeda; trên kính ảnh, ông gạch chữ “N” (sao mới) và viết “VAR!”. Khoảng cách ông tính ra, khoảng 900 000 năm ánh sáng, đủ chứng minh Andromeda là một thiên hà riêng nằm ngoài Ngân Hà. Giá trị ngày nay là khoảng 2,5 triệu năm ánh sáng: hiệu chuẩn Cepheid thời đó còn sai. Hiện nay Cepheid đo được tới khoảng 130 triệu năm ánh sáng, như trong thiên hà NGC 5468.',
    ],
    formulas: [
      '$$M_V \\approx -2{,}77\\,\\log_{10} P - 1{,}44$$',
      '$$m - M = 5\\log_{10} d - 5$$',
    ],
    symbols: [
      ['$M_V$', 'cấp sao tuyệt đối dải V — độ sáng thật, quy về khoảng cách 10 pc; số càng âm càng sáng'],
      ['$P$', 'chu kỳ dao động, tính bằng ngày'],
      ['$m$', 'cấp sao biểu kiến — độ sáng ta đo được'],
      ['$d$', 'khoảng cách, tính bằng parsec (bỏ qua bụi che khuất)'],
      ['', 'Các hệ số −2,77 và −1,44 lấy theo một hiệu chuẩn bằng thị sai Hipparcos (Lanoix và cộng sự 1999) — chỉ là một trong nhiều phiên bản.'],
    ],
    viz: {
      module: 'cepheid', height: 500, mobileHeight: 440,
      caption: 'Chọn chu kỳ và độ sáng đo được để suy ra khoảng cách. Với δ Cephei, cách tính thô này cho khoảng 990 năm ánh sáng, còn các phép đo thị sai cho khoảng 800–900 năm ánh sáng: phần chênh chủ yếu đến từ bụi giữa các vì sao (làm sao mờ đi, khiến ta tưởng nó xa hơn) và từ sai số hệ số. Hai ví dụ còn lại dùng số liệu giả định.',
    },
    after: [
      'Quan hệ chu kỳ – độ trưng được hiệu chuẩn chủ yếu bằng [[thi-sai-parsec|thị sai]] của các Cepheid trong Ngân Hà (cùng vài mốc hình học khác) — và đến lượt mình, Cepheid lại dùng để hiệu chuẩn [[sieu-tan-tinh-ia|siêu tân tinh Ia]].',
    ],
    numbers: [
      { value: '1912', label: 'quan hệ chu kỳ – độ trưng của 25 Cepheid được công bố (Harvard Circular 173, do Pickering ký, ghi rõ “do cô Leavitt soạn”)', source: 'NASA ADS' },
      { value: '~3,97 ngày', label: 'chu kỳ của Sao Bắc Cực — cũng là một Cepheid, biên độ rất nhỏ', source: 'Sky & Telescope' },
      { value: '~130 triệu năm ánh sáng', label: 'NGC 5468, thiên hà xa nhất có Cepheid đo tốt (Hubble và Webb)', source: 'NASA SVS (2024)' },
    ],
    myths: [
      { myth: 'Cepheid sáng hơn thì nhấp nháy nhanh hơn.', truth: 'Ngược lại: chu kỳ càng dài, ngôi sao càng sáng.' },
      { myth: 'Biết chu kỳ là biết ngay khoảng cách.', truth: 'Phải hiệu chuẩn quan hệ chu kỳ – độ trưng bằng khoảng cách thị sai, rồi hiệu chỉnh bụi che khuất và thành phần hoá học của sao.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Cepheid Variable`, url: 'https://astro4edu.org/resources/glossary/term/54/' },
      { text: 'Leavitt & Pickering (1912), Periods of 25 variable stars in the Small Magellanic Cloud — NASA ADS', url: 'https://ui.adsabs.harvard.edu/abs/1912HarCi.173....1L/abstract' },
      { text: 'Carnegie Science — Hubble’s “VAR!” plate', url: 'https://carnegiescience.edu/about/history/archives/plate-archives/m31var' },
      { text: 'Lanoix, Paturel & Garnier (1999), Cepheid P–L calibration with Hipparcos — arXiv:astro-ph/9904298', url: 'https://arxiv.org/abs/astro-ph/9904298' },
      { text: 'Benedict và cộng sự (2002), thị sai HST của δ Cephei — arXiv:astro-ph/0206214', url: 'https://arxiv.org/abs/astro-ph/0206214' },
      { text: 'NASA SVS (2024) — Webb & Hubble Cepheids, NGC 5468', url: 'https://svs.gsfc.nasa.gov/31293' },
    ],
  },

  /* ——— 1.5 ——— */
  'sieu-tan-tinh-ia': {
    short: 'Vụ nổ nhiệt hạch của một sao lùn trắng; sau khi hiệu chỉnh, độ sáng cực đại gần như đồng đều nên là “ngọn nến chuẩn hoá được”, đo khoảng cách tới hàng tỷ năm ánh sáng.',
    certainty: { level: 'strong', label: 'Bằng chứng mạnh · kịch bản dẫn tới vụ nổ vẫn đang tranh luận' },
    definition: {
      vi: 'Những ngọn nến “chuẩn” nhất trong các ngọn nến chuẩn được cho là siêu tân tinh “loại Ia”, sinh ra khi một sao lùn trắng bị phá huỷ trong một vụ bùng nổ nhiệt hạch.',
      en: "the most 'standard' of the standard candles are believed to be the so-called 'Type Ia' supernovae, which result from a thermonuclear flash destruction of a white dwarf star",
      source: 'NASA HEASARC',
      url: 'https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/snIa_chandra.html',
    },
    body: [
      'Ở khoảng cách hàng trăm triệu năm ánh sáng, từng ngôi sao Cepheid đã quá mờ. Cần một ngọn đèn mạnh hơn rất nhiều. Trong kịch bản kinh điển, một [[sao-lun-trang|sao lùn trắng]] trong hệ sao đôi hút thêm vật chất (hoặc hợp nhất với một sao lùn trắng khác) và tiến gần **giới hạn Chandrasekhar** — khoảng 1,4 lần khối lượng Mặt Trời — khiến phản ứng tổng hợp carbon bùng phát mất kiểm soát và thổi tung cả ngôi sao. Một số vụ nổ có lẽ xảy ra ở khối lượng thấp hơn; cơ chế chính xác vẫn đang được tranh luận. Trong vài tuần, vụ nổ có thể sáng ngang cả một thiên hà nhỏ.',
      'Vì các vụ nổ xảy ra trong điều kiện khá giống nhau, độ sáng cực đại của chúng tương đối đồng đều: cấp sao tuyệt đối khoảng −19 đến −19,5. Không giống hệt nhau — nhưng năm 1993, Mark Phillips chỉ ra rằng **vụ nổ nào sáng hơn thì mờ đi chậm hơn**. Dựa vào hình dạng đường cong ánh sáng và màu sắc, ta hiệu chỉnh được độ sáng, đưa độ phân tán xuống chừng 0,15–0,2 cấp sao, tức sai số khoảng cách chừng 8–9 % cho mỗi vụ nổ. Vì vậy giới chuyên môn gọi chúng là “nến chuẩn hoá được”.',
      'Năm 1998, hai nhóm nghiên cứu độc lập đo các siêu tân tinh Ia ở xa và thấy chúng **mờ hơn dự kiến** khoảng 0,25 cấp sao. Nghĩa là vũ trụ không giãn nở chậm dần như giới nghiên cứu khi đó chờ đợi, mà đang **tăng tốc**. Phát hiện này đem lại giải Nobel Vật lý 2011 cho Saul Perlmutter, Brian Schmidt và Adam Riess.',
    ],
    formulas: ['$$F = \\frac{L}{4\\pi d^2} \\quad\\Longrightarrow\\quad d = \\sqrt{\\frac{L}{4\\pi F}}$$'],
    symbols: [
      ['$F$', 'thông lượng đo được tại Trái Đất (W/m²)'],
      ['$L$', 'độ trưng — tổng công suất phát sáng của nguồn (W)'],
      ['$d$', 'khoảng cách; mẫu số $4\\pi d^2$ là diện tích mặt cầu mà ánh sáng đã trải ra'],
    ],
    viz: {
      module: 'inverse-square', height: 460, mobileHeight: 420,
      caption: 'Bên trái: cùng một lượng ánh sáng trải trên diện tích tăng theo bình phương khoảng cách, nên xa gấp đôi thì mờ đi 4 lần. Bên phải: một siêu tân tinh Ia (lấy M ≈ −19,3, một giá trị minh hoạ trong khoảng −19 đến −19,5) ở khoảng cách bạn chọn trông sáng cỡ nào. Minh hoạ bỏ qua bụi và các hiệu ứng vũ trụ học.',
    },
    after: [
      'Độ sáng thật của siêu tân tinh Ia không tự biết được: nó phải hiệu chuẩn bằng các thiên hà gần chứa **cả** Cepheid lẫn siêu tân tinh Ia. Vì thế chúng là bậc đo khoảng cách cao nhất trước định luật Hubble trong [[thang-khoang-cach|bậc thang khoảng cách]] — và thừa hưởng mọi sai số của các bậc bên dưới.',
    ],
    numbers: [
      { value: '~1,4 M☉', label: 'giới hạn Chandrasekhar (chính xác hơn ~1,44 M☉)', source: 'NASA HEASARC' },
      { value: '−19 đến −19,5', label: 'cấp sao tuyệt đối cực đại, tuỳ cách hiệu chuẩn', source: 'Tổng quan arXiv:1608.04192' },
      { value: '~0,15–0,2 cấp sao', label: 'độ phân tán sau khi hiệu chỉnh đường cong ánh sáng (~8–9 % khoảng cách)', source: 'Các tổng quan về SN Ia' },
    ],
    myths: [
      { myth: 'Mọi siêu tân tinh Ia sáng y hệt nhau.', truth: 'Chúng chênh nhau đáng kể, nhưng chênh lệch đó hiệu chỉnh được nhờ hình dạng đường cong ánh sáng (quan hệ Phillips) và màu sắc.' },
      { myth: 'Siêu tân tinh nào cũng là một ngôi sao khổng lồ nổ tung.', truth: 'Các loại II, Ib, Ic là lõi sao nặng sụp đổ. Loại Ia là sao lùn trắng nổ nhiệt hạch và không để lại sao neutron.' },
    ],
    sources: [
      { text: 'NASA HEASARC — Type Ia supernovae and the Chandrasekhar limit', url: 'https://heasarc.gsfc.nasa.gov/docs/objects/heapow/archive/compact_objects/snIa_chandra.html' },
      { text: 'Phillips (1993), The absolute magnitudes of Type Ia supernovae, ApJ 413, L105', url: 'https://doi.org/10.1086/186970' },
      { text: 'Giải Nobel Vật lý 2011 — gia tốc giãn nở của vũ trụ', url: 'https://www.nobelprize.org/prizes/physics/2011/' },
      { text: 'Tổng quan lịch sử về độ sáng SN Ia — arXiv:1608.04192', url: 'https://arxiv.org/abs/1608.04192' },
    ],
  },

  /* ——— 1.6 ——— */
  'thang-khoang-cach': {
    short: 'Chuỗi phương pháp đo khoảng cách nối tiếp, mỗi bậc được hiệu chuẩn bằng bậc bên dưới — từ radar tới định luật Hubble.',
    certainty: { level: 'strong', label: 'Phương pháp đã xác lập · giá trị H₀ đang tranh luận' },
    definition: {
      vi: 'Theo cách ESA/Hubble mô tả, phần chính của bậc thang gồm ba bậc: thị sai đo khoảng cách tới các Cepheid trong Ngân Hà; Cepheid hiệu chuẩn siêu tân tinh Ia trong các thiên hà có cả hai; khoảng cách tới siêu tân tinh Ia ở xa, so với dịch chuyển đỏ, cho ra hằng số Hubble.',
      source: 'ESA/Hubble, heic1611 (diễn giải)',
      url: 'https://esahubble.org/images/heic1611a/',
    },
    body: [
      'Không có cây thước nào đo được từ Mặt Trăng tới thiên hà xa nhất. Thiên văn học dùng một **bậc thang**: mỗi phương pháp chỉ hoạt động trong một dải khoảng cách, và ở vùng chồng lấn, bậc dưới được dùng để **hiệu chuẩn** bậc trên.',
      'Radar và laser đo trong Hệ Mặt Trời và định ra [[don-vi-thien-van|au]]. Au là đường đáy cho [[thi-sai-parsec|thị sai]], đo các sao trong Ngân Hà — kể cả những Cepheid gần. Nhờ đó định luật Leavitt được hiệu chuẩn, để [[cepheid|Cepheid]] đo các thiên hà tới khoảng 130 triệu năm ánh sáng. Ở những thiên hà có cả Cepheid lẫn [[sieu-tan-tinh-ia|siêu tân tinh Ia]], ta hiệu chuẩn độ sáng của siêu tân tinh, rồi dùng chúng đo tới hàng tỷ năm ánh sáng. Cuối cùng, so khoảng cách với dịch chuyển đỏ cho ra **hằng số Hubble** $H_0$ — tốc độ giãn nở hiện nay của vũ trụ.',
      'Điểm yếu của bậc thang là sai số tích luỹ: một lỗi nhỏ ở bậc dưới lan lên mọi bậc trên. Đây là trung tâm của **căng thẳng Hubble**: bậc thang khoảng cách cho $H_0$ ≈ 73 km/s/Mpc, còn bức xạ nền vi sóng vũ trụ (kết hợp mô hình vũ trụ chuẩn ΛCDM) cho khoảng 67–68 km/s/Mpc. Độ chênh lớn hơn nhiều lần sai số của mỗi bên — dù một nhóm khác dùng sao khổng lồ đỏ thay cho Cepheid (Freedman và cộng sự) thu được khoảng 70 km/s/Mpc, nên mức độ căng thẳng vẫn còn bàn cãi. Có thể còn một sai số hệ thống chưa tìm ra, hoặc mô hình chuẩn đang thiếu một thành phần — câu hỏi này vẫn mở.',
    ],
    formulas: ['$$v = H_0\\, d$$'],
    symbols: [
      ['$v$', 'tốc độ lùi xa của thiên hà, suy từ dịch chuyển đỏ (km/s)'],
      ['$H_0$', 'hằng số Hubble (km/s/Mpc)'],
      ['$d$', 'khoảng cách (Mpc; 1 Mpc ≈ 3,26 triệu năm ánh sáng). Dạng đơn giản này chỉ đúng với các thiên hà tương đối gần'],
    ],
    viz: {
      module: 'ladder', height: 440, mobileHeight: 330,
      caption: 'Kéo con trỏ dọc trục khoảng cách để xem phương pháp nào dùng được ở đó. Mũi tên chấm chỉ nơi một bậc hiệu chuẩn bậc kế tiếp. Ở vùng xa nhất, “khoảng cách” được hiểu theo thời gian ánh sáng đi. Phạm vi các dải là ước lượng làm tròn.',
    },
    numbers: [
      { value: '~73 km/s/Mpc', label: 'H₀ từ bậc thang khoảng cách (SH0ES 2022: 73,04 ± 1,04; H0DN 2026: 73,50 ± 0,81)', source: 'arXiv:2606.20434' },
      { value: '~67–68 km/s/Mpc', label: 'H₀ từ bức xạ nền vi sóng + ΛCDM (Planck 2018: 67,4 ± 0,5)', source: 'Planck 2018 VI' },
      { value: '5 nấc', label: 'radar → thị sai → Cepheid → siêu tân tinh Ia → định luật Hubble (ESA/Hubble mô tả 3 nấc giữa)', source: 'Tổng hợp từ ESA/Hubble' },
    ],
    myths: [
      { myth: 'Căng thẳng Hubble cho thấy thuyết Big Bang sai.', truth: 'Nó chỉ cho thấy mô hình ΛCDM chuẩn có thể thiếu một thành phần, hoặc còn sai số hệ thống. Bản thân sự giãn nở của vũ trụ không bị nghi ngờ.' },
      { myth: 'Mỗi phương pháp đo khoảng cách hoạt động độc lập.', truth: 'Phần lớn được nối thành chuỗi: bậc trên mượn độ chính xác của bậc dưới, nên một lỗi nhỏ ở gốc có thể làm lệch mọi khoảng cách xa.' },
    ],
    sources: [
      { text: 'ESA/Hubble (2016), heic1611 — Cosmic distance ladder', url: 'https://esahubble.org/images/heic1611a/' },
      { text: 'The Hubble tension: a decade review (2026) — arXiv:2606.20434', url: 'https://arxiv.org/abs/2606.20434' },
      { text: 'Planck Collaboration (2020), Planck 2018 results VI — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
      { text: 'Riess và cộng sự (2022), ApJL 934, L7 — SH0ES', url: 'https://arxiv.org/abs/2112.04510' },
      { text: 'H0DN Collaboration (2026), A&A', url: 'https://doi.org/10.1051/0004-6361/202557993' },
      { text: 'NASA SVS (2024) — Webb & Hubble Cepheids', url: 'https://svs.gsfc.nasa.gov/31293' },
    ],
  },

  /* ——— 1.7 ——— */
  'nhin-ve-qua-khu': {
    short: 'Ánh sáng cần thời gian để tới ta, nên nhìn càng xa là thấy vật thể ở thời điểm càng xưa.',
    certainty: { level: 'established', label: 'Đã xác lập · số liệu thiên hà xa nhất tính đến 11/2026' },
    definition: {
      vi: 'Thời gian nhìn lại là hiệu giữa tuổi của vũ trụ hiện nay và tuổi của vũ trụ vào lúc các photon rời khỏi thiên thể.',
      en: 'Look-back time is the difference between the age of the Universe now and the age of the Universe at the time the photons were emitted from the object.',
      source: 'Đài thiên văn Paris — An Etymological Dictionary of Astronomy and Astrophysics',
      url: 'https://dictionary.obspm.fr/terms/look-back-time/',
    },
    body: [
      'Ánh sáng rất nhanh nhưng không tức thời. Ánh sáng từ Mặt Trăng mất khoảng 1,3 giây để tới mắt ta; từ Mặt Trời, khoảng 8 phút 19 giây. Ta luôn thấy Mặt Trời của 8 phút trước.',
      'Càng ra xa, độ trễ càng lớn: Proxima Centauri là 4,25 năm; thiên hà Andromeda khoảng 2,5 triệu năm — ánh sáng đến mắt bạn đêm nay đã rời Andromeda từ rất lâu trước khi loài người hiện đại xuất hiện. Kính thiên văn vì thế là một cỗ máy thời gian một chiều: nhìn thật xa là thấy vũ trụ thời còn trẻ. Thiên hà **MoM-z14**, được nhóm của Rohan Naidu xác nhận bằng quang phổ với Kính James Webb (bản thảo 5/2025, NASA giới thiệu tháng 1/2026), có dịch chuyển đỏ z = 14,44: ta thấy nó như lúc vũ trụ mới khoảng 280 triệu năm tuổi, tức ánh sáng đã đi khoảng 13,5 tỷ năm.',
      'Một điểm hay bị nhầm: “ánh sáng đi 13,5 tỷ năm” **không** có nghĩa thiên hà đó cách ta 13,5 tỷ năm ánh sáng. Trong lúc ánh sáng trên đường, vũ trụ vẫn tiếp tục giãn nở, nên khoảng cách hiện nay lớn hơn nhiều. Với vật thể rất xa, các nhà thiên văn dùng **dịch chuyển đỏ** $z$ — đại lượng đo trực tiếp — rồi mới quy ra thời gian theo một mô hình vũ trụ học.',
    ],
    formulas: ['$$t = \\frac{d}{c}$$'],
    symbols: [
      ['$t$', 'thời gian ánh sáng đi — cũng là “độ trễ” của hình ảnh ta thấy'],
      ['$d$', 'khoảng cách. Công thức đơn giản này chỉ đúng khi vũ trụ giãn nở không đáng kể trong lúc ánh sáng đi, tức với vật thể trong vài trăm triệu năm ánh sáng'],
      ['$c$', 'tốc độ ánh sáng'],
    ],
    viz: {
      module: 'lookback', height: 420, mobileHeight: 300,
      caption: 'Chọn một thiên thể: hàng trên là thời gian ánh sáng đi (thang log, mỗi vạch là một bậc độ lớn), hàng dưới đặt thời điểm ánh sáng rời đi lên lịch sử 13,8 tỷ năm của vũ trụ. Mọi thứ trong Ngân Hà dồn sát mép “bây giờ”.',
    },
    numbers: [
      { value: '8 phút 19 giây', label: 'độ trễ ánh sáng Mặt Trời (cho 1 au)', source: 'Tính từ c và au' },
      { value: 'z = 14,44', label: 'MoM-z14, thiên hà xa nhất được xác nhận bằng quang phổ (tính đến 11/2026)', source: 'arXiv:2505.11263; NASA 1/2026' },
      { value: '13,787 tỷ năm', label: 'tuổi vũ trụ theo Planck 2018 (±0,020 tỷ năm; mô hình ΛCDM, tổ hợp dữ liệu có BAO)', source: 'Planck 2018 VI' },
    ],
    myths: [
      { myth: 'Thiên hà có ánh sáng đi 13,5 tỷ năm thì cách ta 13,5 tỷ năm ánh sáng.', truth: 'Đó là thời gian ánh sáng đi. Do vũ trụ giãn nở, khoảng cách hiện nay tới thiên hà ấy lớn hơn nhiều.' },
      { myth: 'Nhiều ngôi sao ta thấy trên trời thực ra đã chết từ lâu.', truth: 'Với những ngôi sao ta thấy bằng mắt thường thì hầu như không: chúng cách ta vài đến vài nghìn năm ánh sáng, trong khi sao sống hàng triệu đến hàng tỷ năm.' },
    ],
    sources: [
      { text: 'Đài thiên văn Paris — Look-back time', url: 'https://dictionary.obspm.fr/terms/look-back-time/' },
      { text: 'Naidu và cộng sự (2025), A cosmic miracle: z = 14,44 — arXiv:2505.11263', url: 'https://arxiv.org/abs/2505.11263' },
      { text: 'NASA Webb pushes boundaries of observable universe closer to Big Bang (1/2026)', url: 'https://www.aura-astronomy.org/blog/2026/01/28/nasa-webb-pushes-boundaries-of-observable-universe-closer-to-big-bang/' },
      { text: 'Planck Collaboration (2020), Planck 2018 results VI — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
      { text: 'JPL — Lunar Laser Ranging model (thời gian ánh sáng khứ hồi tới Mặt Trăng)', url: 'https://ssd.jpl.nasa.gov/ftp/eph/planets/ioms/LLR_Model_2020_DR.pdf' },
    ],
  },
};
