// Chương 3 — Lực hấp dẫn và chuyển động. Dữ kiện & nguồn: research/hap-dan-chuyen-dong.md, research/quy-dao-kepler.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Mặt Trăng đang rơi về phía Trái Đất — liên tục, từ hàng tỷ năm nay. Nó không chạm đất vì cùng lúc đó nó bay ngang khoảng 1 km mỗi giây, đủ nhanh để mặt đất luôn “cong đi” khỏi nó. Đó là ý tưởng mà Isaac Newton dùng để nối quả táo rơi với chuyển động của các hành tinh.',
    'Chương này đi theo đúng trình tự lịch sử: Kepler **mô tả** quỹ đạo từ số liệu quan sát; Newton **giải thích** bằng một lực duy nhất giảm theo bình phương khoảng cách. Từ một định luật ấy suy ra mọi thứ còn lại — vận tốc để bay vòng quanh hay thoát khỏi Trái Đất, thuỷ triều, và những điểm trong không gian nơi một con tàu có thể “đứng” cạnh Trái Đất.',
  ],
  diagram: {
    nodes: [
      { id: 'tycho', x: 6, y: 10, label: 'Số liệu Tycho Brahe' },
      { id: 'dinh-luat-kepler', x: 26, y: 18, big: true },
      { id: 'van-vat-hap-dan', x: 50, y: 10, big: true },
      { id: 'van-toc-vu-tru', x: 28, y: 48, big: true },
      { id: 'luc-thuy-trieu', x: 58, y: 44, big: true },
      { id: 'diem-lagrange', x: 86, y: 28, big: true },
      { id: 'tuong-doi-tong-quat', x: 88, y: 54 },
    ],
    edges: [
      ['tycho', 'dinh-luat-kepler', 'quỹ đạo Sao Hoả'],
      ['dinh-luat-kepler', 'van-vat-hap-dan', 'Newton giải thích'],
      ['van-vat-hap-dan', 'van-toc-vu-tru', 'quỹ đạo = rơi tự do'],
      ['van-vat-hap-dan', 'luc-thuy-trieu', 'lực khác nhau hai phía'],
      ['van-vat-hap-dan', 'diem-lagrange', 'bài toán ba vật'],
      ['van-vat-hap-dan', 'tuong-doi-tong-quat', 'Einstein mở rộng'],
    ],
  },
  sources: [
    { text: 'NASA SVS — Kepler’s Laws of Planetary Motion Described Using Earth Satellites', url: 'https://svs.gsfc.nasa.gov/4642' },
    { text: 'NOAA Ocean Service — Tides and water levels: what causes tides?', url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html' },
    { text: 'ESA — What are Lagrange points?', url: 'https://www.esa.int/Science_Exploration/Space_Science/What_are_Lagrange_points' },
    { text: 'NASA NSSDCA — Earth Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html' },
  ],
};

export const CONCEPTS = {
  /* ——— 3.1 ——— */
  'dinh-luat-kepler': {
    short: 'Hành tinh đi trên elip với Mặt Trời ở một tiêu điểm, quét diện tích bằng nhau trong thời gian bằng nhau, và T² tỉ lệ với a³.',
    certainty: { level: 'established', label: 'Đã xác lập · là hệ quả của định luật hấp dẫn Newton' },
    definition: {
      vi: 'Một đường tưởng tượng nối hành tinh với Mặt Trời quét những diện tích bằng nhau trong những khoảng thời gian bằng nhau, bất kể hành tinh đang ở đâu trên quỹ đạo.',
      en: 'an imaginary line drawn from a planet to the Sun swept out an equal area of space in equal times, regardless of where the planet was in its orbit',
      source: 'NASA Goddard Scientific Visualization Studio — Kepler’s Laws of Planetary Motion',
      url: 'https://svs.gsfc.nasa.gov/4642',
    },
    body: [
      'Hai nghìn năm, thiên văn học tin rằng thiên thể phải đi trên vòng tròn. Johannes Kepler thừa hưởng bộ số liệu chính xác nhất thời đó — các vị trí Sao Hoả do Tycho Brahe đo trong hơn hai mươi năm — và không ép được chúng vào một vòng tròn. Sai lệch chỉ khoảng 8 phút cung, nhưng Kepler tin số liệu của Tycho hơn tin vòng tròn. Kết quả là ba định luật, công bố trong _Astronomia Nova_ (1609) và _Harmonices Mundi_ (1619).',
      '**Định luật 1:** quỹ đạo là một elip, Mặt Trời nằm ở một **tiêu điểm** (focus) — không phải ở tâm. **Định luật 2:** đoạn nối hành tinh với Mặt Trời quét những diện tích bằng nhau trong những khoảng thời gian bằng nhau, nên hành tinh đi nhanh khi ở gần Mặt Trời và chậm khi ở xa. Trái Đất đi 30,29 km/s ở cận nhật (perihelion, đầu tháng 1) và 29,29 km/s ở viễn nhật (aphelion, đầu tháng 7). **Định luật 3:** bình phương chu kỳ tỉ lệ với lập phương bán trục lớn (semi-major axis) $a$.',
      'Kepler tìm ra ba định luật từ số liệu, không biết vì sao chúng đúng. Gần 70 năm sau, Newton chứng minh cả ba là hệ quả của [[van-vat-hap-dan|định luật vạn vật hấp dẫn]], và định luật 3 có thêm khối lượng:',
    ],
    formulas: ['$$T^2 = \\frac{4\\pi^2}{G\\,(M+m)}\\,a^3 \\qquad\\qquad T^2 \\approx a^3$$'],
    symbols: [
      ['$T$', 'chu kỳ quỹ đạo'],
      ['$a$', 'bán trục lớn — nửa trục dài của elip, bằng trung bình cộng của khoảng cách cận nhật và viễn nhật'],
      ['$M, m$', 'khối lượng của vật trung tâm và vật quay quanh; với hành tinh, $m \\ll M$'],
      ['$G$', 'hằng số hấp dẫn'],
      ['', 'Công thức bên phải là dạng rút gọn cho các hành tinh quanh Mặt Trời: $T$ tính bằng năm, $a$ tính bằng au.'],
    ],
    viz: {
      module: 'kepler-laws', height: 440, mobileHeight: 380,
      caption: 'Kéo độ lệch tâm và bán trục lớn. Tám múi tô màu là diện tích quét trong tám khoảng thời gian bằng nhau — hẹp và dài khi ở xa, ngắn và rộng khi ở gần, nhưng bằng nhau về diện tích. Chuyển động giải đúng phương trình Kepler; hoạt ảnh luôn chạy một vòng trong 8 giây, chu kỳ thật đọc ở bảng số.',
    },
    numbers: [
      { value: 'e = 0,0167', label: 'độ lệch tâm (eccentricity) quỹ đạo Trái Đất — gần như tròn; Sao Hoả 0,093', source: 'NASA NSSDCA; JPL (Standish)' },
      { value: '30,29 / 29,29 km/s', label: 'tốc độ Trái Đất ở cận nhật / viễn nhật', source: 'NASA NSSDCA Earth Fact Sheet' },
      { value: '~76 năm', label: 'chu kỳ sao chổi Halley (e ≈ 0,967); lần tới gần Mặt Trời nhất năm 2061', source: 'JPL (qua nguồn thứ cấp)' },
    ],
    myths: [
      { myth: 'Trái Đất có mùa vì quỹ đạo là elip, lúc gần lúc xa Mặt Trời.', truth: 'Quỹ đạo Trái Đất gần như tròn; khoảng cách chỉ thay đổi khoảng 3 %. Trái Đất gần Mặt Trời nhất vào đầu tháng 1, giữa mùa đông của Bắc bán cầu. Mùa là do trục quay nghiêng 23,4°.' },
      { myth: 'Mặt Trời nằm ở tâm quỹ đạo elip.', truth: 'Mặt Trời ở một tiêu điểm; tiêu điểm kia trống. Chính xác hơn, cả hành tinh và Mặt Trời cùng quay quanh khối tâm (barycenter) chung.' },
    ],
    khamPha: [{ href: '#ho-so-mars', label: 'Hồ sơ Sao Hoả' }, { href: '#ho-so-earth', label: 'Hồ sơ Trái Đất' }],
    sources: [
      { text: 'NASA SVS 4642 — Kepler’s Laws of Planetary Motion Described Using Earth Satellites', url: 'https://svs.gsfc.nasa.gov/4642' },
      { text: 'NASA Kepler Mission (lưu trữ) — Johannes Kepler', url: 'https://webarchive.library.unt.edu/web/20130317115651/http://kepler.nasa.gov/Mission/JohannesKepler' },
      { text: 'NASA NSSDCA — Earth Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/earthfact.html' },
      { text: `${IAU_OAE}: Kepler’s Laws`, url: 'https://astro4edu.org/resources/glossary/term/169/' },
    ],
  },

  /* ——— 3.2 ——— */
  'van-vat-hap-dan': {
    short: 'Mọi vật hút nhau bằng một lực tỉ lệ với tích hai khối lượng và tỉ lệ nghịch với bình phương khoảng cách: F = GMm/r².',
    certainty: { level: 'established', label: 'Đã xác lập · được thuyết tương đối tổng quát mở rộng cho trường mạnh' },
    definition: {
      vi: 'Mọi hạt vật chất hút mọi hạt khác bằng một lực tỉ lệ thuận với tích hai khối lượng và tỉ lệ nghịch với bình phương khoảng cách giữa chúng.',
      source: 'Phát biểu chuẩn theo I. Newton, Philosophiæ Naturalis Principia Mathematica (1687), quyển III',
      paraphrase: true,
    },
    body: [
      'Ý tưởng then chốt của Newton trong định luật vạn vật hấp dẫn (law of universal gravitation): lực làm quả táo rơi và lực giữ Mặt Trăng trên quỹ đạo là **một**. Ông kiểm tra bằng một phép tính: Mặt Trăng ở xa tâm Trái Đất khoảng 60 lần bán kính Trái Đất; nếu lực giảm theo bình phương khoảng cách, gia tốc hướng về Trái Đất của nó phải nhỏ hơn ở mặt đất $60^2 = 3\\,600$ lần — khoảng 2,7 mm/s². Tính từ khoảng cách và chu kỳ quỹ đạo 27,3 ngày của Mặt Trăng cũng ra xấp xỉ con số ấy.',
      'Định luật được công bố trong _Principia_ (1687). Hằng số $G$ thì phải đợi hơn một thế kỷ: năm 1798, Henry Cavendish dùng một cân xoắn (torsion balance) đo lực hút cực nhỏ giữa các quả cầu chì để “cân” Trái Đất, ra khối lượng riêng trung bình 5,48 g/cm³ (giá trị ngày nay 5,51). $G$ được suy ra từ số liệu của ông về sau. Đến nay $G$ vẫn là hằng số cơ bản được biết kém chính xác nhất, chỉ tới khoảng năm chữ số.',
    ],
    formulas: ['$$F = G\\,\\frac{M\\,m}{r^2} \\qquad g = \\frac{G M}{R^2}$$'],
    symbols: [
      ['$F$', 'lực hút giữa hai vật (N)'],
      ['$M, m$', 'khối lượng hai vật (kg)'],
      ['$r$', 'khoảng cách giữa tâm hai vật (m)'],
      ['$G$', '6,674 30 × 10⁻¹¹ m³ kg⁻¹ s⁻² (CODATA 2018, không đổi ở bản 2022)'],
      ['$g$', 'gia tốc rơi tự do ở bề mặt một thiên thể bán kính $R$; không phụ thuộc khối lượng vật rơi'],
    ],
    viz: {
      module: 'gravity-weight', height: 400, mobileHeight: 300,
      caption: 'Chọn một thiên thể và kéo ra xa tâm của nó. Ở khoảng cách gấp đôi, lực hút còn 1/4; gấp ba còn 1/9. Hình thiên thể không theo tỉ lệ giữa các thiên thể với nhau.',
    },
    after: [
      'Vì $g$ không phụ thuộc $m$, mọi vật rơi như nhau nếu không có không khí cản. Trên Mặt Trăng năm 1971, phi hành gia David Scott của Apollo 15 thả một chiếc búa và một chiếc lông chim cùng lúc; chúng chạm đất cùng nhau.',
    ],
    numbers: [
      { value: '9,806 65 m/s²', label: 'gia tốc trọng trường chuẩn (quy ước); thực tế từ ~9,78 ở xích đạo tới ~9,83 ở hai cực', source: 'CGPM 1901' },
      { value: '1,62 m/s²', label: 'gia tốc rơi tự do trên Mặt Trăng, khoảng 1/6 Trái Đất', source: 'NASA NSSDCA Moon Fact Sheet' },
      { value: '1687', label: 'Newton công bố định luật vạn vật hấp dẫn trong Principia', source: '' },
    ],
    myths: [
      { myth: 'Vật nặng rơi nhanh hơn vật nhẹ.', truth: 'Lực hút tỉ lệ với khối lượng, nhưng quán tính cũng tỉ lệ với khối lượng, nên gia tốc như nhau. Khác biệt hằng ngày đến từ lực cản không khí.' },
      { myth: 'Ra khỏi khí quyển là hết trọng lực.', truth: 'Lực hấp dẫn giảm theo bình phương khoảng cách nhưng không bao giờ bằng không. Nó giữ Mặt Trăng cách 384 000 km và giữ Trái Đất quanh Mặt Trời cách 150 triệu km.' },
    ],
    khamPha: [{ href: '#ho-so-jupiter', label: 'Hồ sơ Sao Mộc' }],
    sources: [
      { text: 'Mohr và cộng sự (2025), CODATA 2022 — arXiv:2409.03787', url: 'https://arxiv.org/abs/2409.03787' },
      { text: 'NIST — giá trị G (CODATA)', url: 'https://physics.nist.gov/cgi-bin/cuu/Value?bg' },
      { text: 'H. Cavendish (1798), Experiments to determine the density of the Earth, Phil. Trans. R. Soc. 88', url: 'https://doi.org/10.1098/rstl.1798.0022' },
      { text: 'NASA NSSDCA — Moon Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/moonfact.html' },
    ],
  },

  /* ——— 3.3 ——— */
  'van-toc-vu-tru': {
    short: 'Vận tốc cấp 1 (~7,9 km/s) để bay vòng quanh Trái Đất sát mặt đất; cấp 2 (~11,2 km/s) để thoát hẳn khỏi lực hút của Trái Đất.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Vận tốc thoát là tốc độ tối thiểu một vật cần có để rời khỏi trường hấp dẫn của một thiên thể mãi mãi. Với Trái Đất, giá trị này là 11,2 km/s; với Mặt Trăng là 2,4 km/s.',
      source: `Diễn giải theo ${IAU_OAE}: Escape Velocity`,
      url: 'https://astro4edu.org/resources/glossary/term/105/',
      paraphrase: true,
    },
    body: [
      'Newton hình dung một khẩu pháo trên đỉnh một ngọn núi rất cao, bắn ngang. Bắn chậm, viên đạn rơi gần chân núi; bắn nhanh hơn, nó rơi xa hơn. Vì Trái Đất tròn, mặt đất cũng cong xuống dưới đường bay. Đến một tốc độ nào đó, viên đạn rơi xuống đúng bằng mức mặt đất cong đi — nó rơi mãi mà không chạm đất. Đó là một **quỹ đạo**.',
      'Tốc độ ấy, cho quỹ đạo tròn sát mặt đất (bỏ qua không khí), là **vận tốc vũ trụ cấp 1** (first cosmic velocity), khoảng 7,9 km/s. Nhanh hơn, quỹ đạo thành elip. Tới khoảng 11,2 km/s — **vận tốc vũ trụ cấp 2**, hay vận tốc thoát (escape velocity) — viên đạn không quay lại nữa: động năng đủ bù toàn bộ thế năng hấp dẫn. Lưu ý vận tốc cấp 2 đúng bằng $\\sqrt{2}$ lần cấp 1, và cả hai không phụ thuộc khối lượng viên đạn.',
    ],
    formulas: ['$$v_1 = \\sqrt{\\frac{GM}{R}} \\approx 7{,}9\\ \\text{km/s} \\qquad v_2 = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2}\\,v_1 \\approx 11{,}2\\ \\text{km/s}$$'],
    symbols: [
      ['$GM$', 'tham số hấp dẫn của Trái Đất, 3,986 × 10¹⁴ m³/s² (IERS)'],
      ['$R$', 'khoảng cách tới tâm Trái Đất; ở mặt đất khoảng 6 371 km'],
    ],
    viz: {
      module: 'newton-cannon', height: 460, mobileHeight: 380,
      caption: 'Khẩu pháo của Newton đặt ở độ cao 400 km (ngang trạm ISS), không có không khí. Kéo vận tốc bắn: dưới vận tốc cấp 1 đạn rơi xuống, bằng vận tốc cấp 1 đạn bay vòng tròn, lớn hơn thì bay elip, từ vận tốc cấp 2 trở lên thì thoát hẳn. Quỹ đạo được tích phân số với GM thật của Trái Đất.',
    },
    after: [
      'Trạm Vũ trụ Quốc tế (ISS) bay ở độ cao khoảng 400–420 km với khoảng 7,66 km/s, một vòng mất khoảng 92 phút. Ở độ cao đó, trọng lực vẫn còn khoảng 88 % so với mặt đất. Phi hành gia trôi nổi không phải vì hết trọng lực, mà vì cả người lẫn trạm đang **cùng rơi tự do** (free fall) — đúng như viên đạn của Newton.',
    ],
    numbers: [
      { value: '7,9 km/s', label: 'vận tốc vũ trụ cấp 1 ở mặt đất (quỹ đạo tròn)', source: 'Tính từ GM của IERS' },
      { value: '11,2 km/s', label: 'vận tốc vũ trụ cấp 2 — vận tốc thoát khỏi Trái Đất', source: 'IAU OAE' },
      { value: '~88 %', label: 'trọng lực ở độ cao của ISS so với mặt đất', source: 'Tính: (6 371 / 6 791)²' },
    ],
    myths: [
      { myth: 'Phi hành gia trên ISS không trọng lượng vì ở đó không có trọng lực.', truth: 'Trọng lực ở đó vẫn còn khoảng 88 %. Họ lơ lửng vì trạm và người cùng rơi tự do quanh Trái Đất.' },
      { myth: 'Muốn lên quỹ đạo phải đạt 11,2 km/s.', truth: 'Quỹ đạo thấp chỉ cần khoảng 7,8 km/s. 11,2 km/s là để thoát hẳn khỏi Trái Đất mà không cần đẩy thêm; tên lửa đẩy liên tục thì không cần đạt vận tốc này ngay.' },
    ],
    khaoLuan: [],
    sources: [
      { text: `${IAU_OAE}: Escape Velocity`, url: 'https://astro4edu.org/resources/glossary/term/105/' },
      { text: 'IERS Conventions (2010), Bảng 1.1 — hằng số GM của Trái Đất', url: 'https://hpiers.obspm.fr/eop-pc/models/constants.html' },
      { text: 'Smithsonian — How Things Fly: Newton’s cannon', url: 'https://howthingsfly.si.edu/media/newtons-cannon' },
    ],
  },

  /* ——— 3.4 ——— */
  'luc-thuy-trieu': {
    short: 'Hiệu số lực hấp dẫn giữa hai phía của một vật; nó kéo giãn vật theo hướng nối với vật hút và giảm theo lập phương khoảng cách.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Lực tạo triều thay đổi tỉ lệ nghịch với lập phương khoảng cách tới vật gây triều.',
      en: 'tidal generating forces vary inversely as the cube of the distance from the tide-generating object',
      source: 'NOAA Ocean Service — Tides and water levels',
      url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html',
    },
    body: [
      'Mặt Trăng hút phía gần của Trái Đất mạnh hơn tâm Trái Đất, và hút tâm mạnh hơn phía xa. So với tâm, nước ở phía gần bị kéo về phía Mặt Trăng, còn nước ở phía xa bị “bỏ lại phía sau”. Kết quả là **hai** chỗ phình đối diện nhau. Trái Đất quay qua hai chỗ phình mỗi ngày, nên phần lớn bờ biển có hai lần nước lớn trong khoảng 24 giờ 50 phút.',
      'Điều quan trọng không phải độ mạnh của lực hút, mà là nó **khác nhau** bao nhiêu giữa hai phía. Hiệu số ấy là lực thuỷ triều (tidal force); nó giảm theo lập phương khoảng cách. Mặt Trời hút Trái Đất mạnh gấp khoảng 180 lần Mặt Trăng, nhưng ở xa hơn khoảng 390 lần, nên lực thuỷ triều của nó chỉ bằng khoảng 0,46 lần của Mặt Trăng. Khi Mặt Trời, Mặt Trăng và Trái Đất thẳng hàng (trăng non, trăng tròn), hai lực cộng lại thành **triều cường** (spring tide); khi vuông góc (trăng bán nguyệt), chúng bù trừ một phần thành **triều kém** (neap tide).',
    ],
    formulas: ['$$a_{\\text{triều}} \\approx \\frac{2\\,G M\\,r}{d^3}$$'],
    symbols: [
      ['$M$', 'khối lượng vật gây triều (Mặt Trăng, Mặt Trời)'],
      ['$d$', 'khoảng cách tới vật gây triều'],
      ['$r$', 'bán kính của vật chịu triều (Trái Đất)'],
    ],
    viz: {
      module: 'tides', height: 440, mobileHeight: 380,
      caption: 'Kéo góc giữa Mặt Trăng và Mặt Trời. Mũi tên là lực thuỷ triều tổng hợp tại các điểm trên Trái Đất (đã trừ lực hút tại tâm): kéo ra ở hai phía thẳng hàng, ép vào ở hai bên. Chỗ phình của nước vẽ phóng đại rất nhiều; tỉ lệ Mặt Trời/Mặt Trăng tính từ khối lượng và khoảng cách thật.',
    },
    after: [
      'Thuỷ triều còn làm nhiều việc hơn là nâng mực nước. Ma sát thuỷ triều đã hãm Mặt Trăng tới mức nó luôn quay một mặt về Trái Đất (**khoá thuỷ triều**, tidal locking). Nó cũng đang hãm chính Trái Đất: riêng thuỷ triều làm ngày dài thêm khoảng 2,3 mili giây mỗi thế kỷ; đo từ nhật thực ghi trong sử sách hơn 2 700 năm qua, mức tăng thực tế là khoảng 1,8 mili giây, vì có những quá trình khác bù lại một phần. Mô-men động lượng Trái Đất mất đi chuyển sang Mặt Trăng, khiến Mặt Trăng lùi xa khoảng 3,8 cm mỗi năm — đo được bằng tia laser bắn tới các gương do Apollo để lại.',
    ],
    numbers: [
      { value: '0,46', label: 'lực thuỷ triều của Mặt Trời so với Mặt Trăng (NOAA: 27/59)', source: 'NOAA Ocean Service' },
      { value: '3,8 cm/năm', label: 'tốc độ Mặt Trăng lùi xa Trái Đất, đo bằng laser', source: 'NASA GSFC' },
      { value: '+1,8 ms', label: 'ngày dài thêm mỗi thế kỷ (đo từ nhật thực cổ; riêng thuỷ triều gây +2,3 ms)', source: 'Stephenson và cộng sự 2016' },
    ],
    myths: [
      { myth: 'Mặt Trăng chỉ kéo nước ở phía gần nó lên.', truth: 'Có hai chỗ phình: ở phía gần và phía xa. Phía xa phình vì tâm Trái Đất bị kéo mạnh hơn nước ở đó.' },
      { myth: 'Mặt Trời hút Trái Đất mạnh hơn nên gây thuỷ triều mạnh hơn.', truth: 'Thuỷ triều phụ thuộc hiệu số lực giữa hai phía, giảm theo lập phương khoảng cách. Mặt Trăng gần hơn nhiều nên gây triều mạnh gấp khoảng 2,2 lần Mặt Trời.' },
    ],
    khamPha: [{ href: '#ho-so-earth', label: 'Hồ sơ Trái Đất' }, { href: '#ho-so-jupiter', label: 'Hồ sơ Sao Mộc (Io)' }],
    sources: [
      { text: 'NOAA Ocean Service — What causes tides?', url: 'https://oceanservice.noaa.gov/education/tutorial_tides/tides02_cause.html' },
      { text: 'NOAA — What is a spring tide?', url: 'https://oceanservice.noaa.gov/facts/springtide.html' },
      { text: 'NASA GSFC — Apollo laser ranging', url: 'https://eclipse.gsfc.nasa.gov/help/ApolloLaser.html' },
      { text: 'Stephenson, Morrison & Hohenkerk (2016), Proc. R. Soc. A 472: 20160404', url: 'https://doi.org/10.1098/rspa.2016.0404' },
      { text: `${IAU_OAE}: Tidal Locking`, url: 'https://astro4edu.org/resources/glossary/term/484/' },
    ],
  },

  /* ——— 3.5 ——— */
  'diem-lagrange': {
    short: 'Năm vị trí trong hệ hai vật quay quanh nhau, nơi một vật nhỏ có thể giữ nguyên vị trí so với hai vật lớn.',
    certainty: { level: 'established', label: 'Đã xác lập · tình trạng sứ mệnh tính tới 11/2026' },
    definition: {
      vi: 'Điểm Lagrange là những vị trí trong không gian mà vật được đưa tới đó có xu hướng ở yên. Trong năm điểm Lagrange, ba điểm không ổn định và hai điểm ổn định.',
      en: 'positions in space where objects sent there tend to stay put … Of the five Lagrange points, three are unstable and two are stable.',
      source: 'NASA Goddard Scientific Visualization Studio',
      url: 'https://svs.gsfc.nasa.gov/14873',
    },
    body: [
      'Một vật bay quanh Mặt Trời ở bên trong quỹ đạo Trái Đất thường phải đi nhanh hơn Trái Đất. Nhưng nếu nó nằm đúng trên đường nối Mặt Trời – Trái Đất, cách Trái Đất khoảng 1,5 triệu km, lực kéo ngược của Trái Đất làm nó chậm lại vừa đủ để đi cùng nhịp với Trái Đất. Đó là **L1**, điểm Lagrange (Lagrange point) thứ nhất. Tương tự, **L2** ở phía bên kia Trái Đất, **L3** ở phía bên kia Mặt Trời. Leonhard Euler tìm ra ba điểm thẳng hàng này vào thập niên 1760; Joseph-Louis Lagrange (1772) tìm thêm hai điểm **L4**, **L5**, tạo với hai vật lớn thành hai tam giác đều.',
      'L1, L2, L3 là những “điểm yên ngựa” (saddle point) của thế năng hiệu dụng: lệch một chút là trôi đi, nên tàu ở đó bay trên những quỹ đạo vòng quanh điểm (quỹ đạo halo, halo orbit) rộng hàng trăm nghìn km và phải chỉnh quỹ đạo định kỳ. L4 và L5 thì lại ổn định — không phải vì là đáy hố mà nhờ lực Coriolis của chuyển động quay — miễn là vật lớn nặng hơn vật nhỏ khoảng 25 lần trở lên.',
    ],
    viz: {
      module: 'lagrange', height: 460, mobileHeight: 380,
      caption: 'Bản đồ thế năng hiệu dụng trong hệ quay cùng hai vật (vùng sáng là “đồi”, vùng tối là “thung lũng”); dấu cộng là năm điểm Lagrange tính số. Kéo tỉ lệ khối lượng, hoặc bấm vào bản đồ để thả một vật thử đứng yên và xem nó trôi đi hay quẩn quanh L4.',
    },
    after: [
      'Mỗi điểm có công dụng riêng. Tàu quan sát Mặt Trời SOHO ở L1, luôn nhìn thẳng vào Mặt Trời và nhận gió Mặt Trời khoảng một giờ trước Trái Đất. Kính viễn vọng không gian James Webb (JWST) và Euclid ở L2, nơi Mặt Trời, Trái Đất và Mặt Trăng luôn ở cùng một phía, dễ che chắn để giữ lạnh. Ở L4 và L5 của Sao Mộc có hơn 15 000 tiểu hành tinh Troia (Trojan asteroids) đã được biết (02/2026); tàu Lucy của NASA, phóng năm 2021, sẽ bay qua tiểu hành tinh Troia đầu tiên vào năm 2027.',
    ],
    numbers: [
      { value: '~1,5 triệu km', label: 'khoảng cách từ Trái Đất tới L1 và L2 — khoảng 4 lần khoảng cách Mặt Trăng', source: 'ESA' },
      { value: '24,96', label: 'tỉ lệ khối lượng tối thiểu để L4, L5 ổn định', source: 'NASA (WMAP); Gascheau 1843' },
      { value: '> 15 000', label: 'tiểu hành tinh Troia của Sao Mộc đã biết (02/2026)', source: 'Danh mục MPC (qua nguồn thứ cấp)' },
    ],
    myths: [
      { myth: 'Ở điểm Lagrange, lực hấp dẫn triệt tiêu bằng không.', truth: 'Hấp dẫn của hai vật lớn không triệt tiêu: tổng của chúng vừa đủ làm lực hướng tâm để vật nhỏ quay cùng chu kỳ với hệ.' },
      { myth: 'Kính James Webb đậu yên tại đúng điểm L2.', truth: 'Webb bay trên một quỹ đạo rộng quanh L2 và phải định kỳ chỉnh quỹ đạo, vì L2 không ổn định.' },
    ],
    sources: [
      { text: 'NASA SVS 14873 — Lagrange points', url: 'https://svs.gsfc.nasa.gov/14873' },
      { text: 'NASA Science — What are Lagrange points?', url: 'https://science.nasa.gov/solar-system/resources/faq/what-are-lagrange-points' },
      { text: 'ESA — What are Lagrange points?', url: 'https://www.esa.int/Science_Exploration/Space_Science/What_are_Lagrange_points' },
      { text: 'B. Sicardy (2010), Stability of the triangular Lagrange points beyond Gascheau’s value, Celest. Mech. Dyn. Astron.', url: 'https://doi.org/10.1007/s10569-010-9259-1' },
    ],
  },
};
