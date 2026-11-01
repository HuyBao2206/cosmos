// Chương 5 — Đời sống của các ngôi sao. Dữ kiện & nguồn: research/doi-song-cac-ngoi-sao.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Ngôi sao không bất biến như vẻ ngoài của nó. Mỗi ngôi sao có một cuộc đời: sinh ra trong một đám mây khí lạnh, sống nhờ phản ứng hạt nhân trong lõi, rồi chết — lặng lẽ thành sao lùn trắng, hoặc dữ dội trong một vụ siêu tân tinh.',
    'Sợi chỉ xuyên suốt chương này rất đơn giản: **trọng lực** luôn ép vào, **áp suất** đẩy ra. Khối lượng lúc sinh ra quyết định gần như mọi thứ — ngôi sao nóng cỡ nào, sống bao lâu và để lại gì. Và vật chất ngôi sao trả lại vũ trụ khi chết chính là nguyên liệu làm nên hành tinh, và cả chúng ta.',
  ],
  diagram: {
    nodes: [
      { id: 'hinh-thanh-sao', x: 10, y: 12, big: true },
      { id: 'tong-hop-hat-nhan', x: 30, y: 26, big: true },
      { id: 'bieu-do-hr', x: 50, y: 12, big: true },
      { id: 'sao-lun-trang', x: 72, y: 6 },
      { id: 'sieu-tan-tinh', x: 70, y: 34, big: true },
      { id: 'sao-neutron', x: 91, y: 22 },
      { id: 'ho-den-ngoai', x: 92, y: 48, label: 'Hố đen (chương 6)' },
      { id: 'nguon-goc-nguyen-to', x: 42, y: 50, big: true },
    ],
    edges: [
      ['hinh-thanh-sao', 'tong-hop-hat-nhan', 'lõi ~10 triệu K'],
      ['tong-hop-hat-nhan', 'bieu-do-hr', 'dãy chính'],
      ['bieu-do-hr', 'sao-lun-trang', 'dưới ~8 M☉'],
      ['bieu-do-hr', 'sieu-tan-tinh', 'trên ~8 M☉'],
      ['sieu-tan-tinh', 'sao-neutron', '~8–20 M☉'],
      ['sieu-tan-tinh', 'ho-den-ngoai', 'nặng hơn, tuỳ độ kim loại'],
      ['sieu-tan-tinh', 'nguon-goc-nguyen-to', 'trả vật chất'],
      ['nguon-goc-nguyen-to', 'hinh-thanh-sao', 'thế hệ sao mới'],
    ],
  },
  sources: [
    { text: 'NASA Science — Star Types', url: 'https://science.nasa.gov/universe/stars/types/' },
    { text: 'NASA Science — Sun: Facts', url: 'https://science.nasa.gov/sun/facts/' },
    { text: `${IAU_OAE}`, url: 'https://astro4edu.org/resources/glossary/search/' },
    { text: 'IAU (2015), Nghị quyết B3 — các giá trị danh định của Mặt Trời', url: 'https://www.iau.org/common/Uploaded%20files/IAUGA2015-Resolution-B3-recommended-nominal-conversion.pdf' },
  ],
};

export const CONCEPTS = {
  /* ——— 5.1 ——— */
  'hinh-thanh-sao': {
    short: 'Sao ra đời khi một vùng lạnh và đặc trong đám mây khí – bụi co sụp dưới lực hấp dẫn của chính nó.',
    certainty: { level: 'established', label: 'Đã xác lập · vai trò của từ trường và nhiễu loạn còn đang nghiên cứu' },
    definition: {
      vi: 'Một số đám mây phân tử sẽ co sụp dưới chính lực hấp dẫn của chúng, dẫn tới sự hình thành những ngôi sao mới.',
      en: 'some of these molecular clouds will collapse under their own gravity, leading to the formation of new stars',
      source: `${IAU_OAE}: Interstellar Medium`,
      url: 'https://astro4edu.org/resources/glossary/term/450/',
    },
    body: [
      'Giữa các vì sao không hoàn toàn trống rỗng. Ở đó có những **tinh vân** — đám mây khí và bụi. Loại tinh vân sinh ra sao là **đám mây phân tử**: lạnh tới khoảng 10 K (−263 °C), đặc hơn xung quanh, chủ yếu là phân tử hydro H₂. Không phải tinh vân nào cũng là nơi sao ra đời: tinh vân hành tinh hay Tinh vân Con Cua lại là nơi sao _chết_.',
      'Trong đám mây luôn có một cuộc giằng co: **trọng lực** kéo khí vào trong, **áp suất** do chuyển động nhiệt của khí đẩy ra. Vùng nào nặng hơn một ngưỡng gọi là **khối lượng Jeans** thì trọng lực thắng và vùng đó tự co sụp. Khí càng lạnh và càng đặc, ngưỡng này càng thấp: một lõi phân tử ở 10 K với khoảng 10 000 phân tử mỗi cm³ chỉ cần vài khối lượng Mặt Trời là đủ. Vì đám mây lớn thường vỡ thành nhiều lõi, phần lớn sao sinh ra theo nhóm hoặc cụm.',
      'Khi co lại, khối khí quay nhanh dần — như vận động viên trượt băng thu tay — và dẹt thành một đĩa quanh một **tiền sao** nóng dần ở tâm. Giai đoạn này kéo dài khoảng 100 000 đến 10 triệu năm; sao càng nặng hình thành càng nhanh. Khi lõi đạt khoảng 10 triệu K, hydro bắt đầu tổng hợp thành heli: một ngôi sao ra đời. Vật thể nhẹ hơn khoảng 0,07–0,08 khối lượng Mặt Trời (khoảng 70–80 lần Sao Mộc) không bao giờ đạt mức đó và thành **sao lùn nâu**.',
    ],
    formulas: ['$$M_J \\approx \\left(\\frac{5kT}{G\\mu m_H}\\right)^{3/2} \\left(\\frac{3}{4\\pi\\rho}\\right)^{1/2}$$'],
    symbols: [
      ['$M_J$', 'khối lượng Jeans — đám mây nặng hơn mức này sẽ tự co sụp'],
      ['$T$', 'nhiệt độ khí (K): nóng hơn ⇒ $M_J$ lớn hơn, khó co sụp hơn'],
      ['$\\rho$', 'mật độ khí: đặc hơn ⇒ $M_J$ nhỏ hơn'],
      ['$\\mu m_H$', 'khối lượng trung bình một hạt khí (với khí phân tử, $\\mu \\approx 2{,}33$ lần khối lượng nguyên tử hydro)'],
      ['$k,\\ G$', 'hằng số Boltzmann và hằng số hấp dẫn'],
    ],
    viz: {
      module: 'jeans', height: 500, mobileHeight: 340,
      caption: 'Điều chỉnh nhiệt độ, mật độ và khối lượng đám mây. Khi khối lượng vượt khối lượng Jeans, đám mây co sụp, quay nhanh dần và hình thành tiền sao ở tâm. Quá trình thực kéo dài từ hàng trăm nghìn đến vài triệu năm — ở đây được tua nhanh.',
    },
    after: [
      'Vùng sinh sao khối lượng lớn gần ta nhất là **Tinh vân Orion**, cách khoảng 1 300–1 350 năm ánh sáng — thấy được bằng mắt thường như một vệt mờ ở “thanh kiếm” treo dưới “thắt lưng” chòm Lạp Hộ. Nổi tiếng hơn cả là “Cột trụ Sáng tạo” trong Tinh vân Đại Bàng, cách khoảng 6 500 năm ánh sáng, được Kính Webb chụp lại năm 2022. Sao sinh ra rồi sẽ sống nhờ [[tong-hop-hat-nhan|phản ứng tổng hợp hạt nhân]].',
    ],
    numbers: [
      { value: '~10 K', label: 'nhiệt độ điển hình của đám mây phân tử nơi sao hình thành (giá trị giáo khoa)', source: 'Giáo trình vật lý thiên văn' },
      { value: '0,07–0,08 M☉', label: 'khối lượng tối thiểu để đốt hydro bền vững, tuỳ thành phần hoá học', source: 'NASA; Burgasser 2009' },
      { value: '~10 triệu K', label: 'nhiệt độ lõi cần để hydro bắt đầu tổng hợp thành heli', source: IAU_OAE },
    ],
    myths: [
      { myth: 'Tinh vân nào cũng là nơi sao ra đời.', truth: 'Tinh vân hành tinh và tàn tích siêu tân tinh là nơi sao chết. Sao chỉ sinh ra trong đám mây phân tử lạnh và đặc.' },
      { myth: 'Sao lùn nâu là “sao thất bại” nên hoàn toàn không có phản ứng hạt nhân.', truth: 'Sao lùn nâu đủ nặng có đốt deuteri trong một thời gian ngắn lúc còn trẻ. Chúng cũng không màu nâu mà đỏ sẫm.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Interstellar Medium`, url: 'https://astro4edu.org/resources/glossary/term/450/' },
      { text: `${IAU_OAE}: Protostar`, url: 'https://astro4edu.org/resources/glossary/term/264/' },
      { text: `${IAU_OAE}: Brown Dwarf`, url: 'https://astro4edu.org/resources/glossary/term/46/' },
      { text: 'NASA — Hubble Glossary (nebula, brown dwarf)', url: 'https://science.nasa.gov/mission/hubble/multimedia/hubble-glossary/' },
      { text: 'Burgasser (2009), The brown dwarf – exoplanet connection — arXiv:0903.1390', url: 'https://arxiv.org/abs/0903.1390' },
      { text: 'ESA (2018) — The Orion Nebula, also known as M42', url: 'https://www.esa.int/ESA_Multimedia/Images/2018/05/The_Orion_Nebula_also_known_as_M42' },
      { text: 'NASA/STScI (2022) — Pillars of Creation (Webb)', url: 'https://www.stsci.edu/contents/media/images/2022/052/01GF44EV0PPW2BHJS9HMA1AGEK' },
    ],
  },

  /* ——— 5.2 ——— */
  'tong-hop-hat-nhan': {
    short: 'Hạt nhân nhẹ hợp lại thành hạt nhân nặng hơn trong lõi sao; phần khối lượng hụt đi biến thành năng lượng làm sao toả sáng.',
    certainty: { level: 'established', label: 'Đã xác lập · kiểm chứng trực tiếp bằng neutrino Mặt Trời' },
    definition: {
      vi: 'Phản ứng tổng hợp hạt nhân là sự kết hợp các hạt nhân nhẹ thành một hạt nhân nặng hơn. Đó là nguồn năng lượng của những ngôi sao như Mặt Trời và là nguồn gốc của gần như mọi nguyên tố nặng trong vũ trụ.',
      source: `${IAU_OAE}: Nuclear Fusion (diễn giải)`,
      url: 'https://astro4edu.org/resources/glossary/term/221/',
    },
    body: [
      'Mặt Trời không “cháy” như lửa — không có oxy, không có phản ứng hoá học. Trong lõi, nơi nhiệt độ khoảng 15 triệu °C, các hạt nhân hydro (proton) va vào nhau đủ mạnh để hợp lại. Thật ra ngay cả ở nhiệt độ đó, theo vật lý cổ điển proton vẫn chưa đủ năng lượng vượt qua lực đẩy điện giữa chúng; phản ứng xảy ra nhờ **hiệu ứng đường hầm lượng tử**. Bước đầu tiên còn cần một proton biến thành neutron, nên cực kỳ hiếm — chính vì thế Mặt Trời “đốt” rất chậm và sống được khoảng 10 tỷ năm.',
      'Qua **chuỗi proton–proton**, 4 proton thành 1 hạt nhân heli-4. Heli-4 nhẹ hơn 4 proton khoảng 0,7 %; phần khối lượng hụt đó biến thành năng lượng theo $E = \\Delta m\\,c^2$. Mỗi giây, lõi Mặt Trời biến khoảng 600 triệu tấn hydro thành 596 triệu tấn heli; khoảng 4 triệu tấn chênh lệch trở thành ánh sáng và nhiệt. Ở Mặt Trời, khoảng 99 % năng lượng đến từ chuỗi này; khoảng 1 % từ **chu trình CNO** (carbon, nitơ, oxy làm “chất xúc tác”), vốn chiếm ưu thế ở sao nặng hơn khoảng 1,3–1,5 lần Mặt Trời. Năm 2020, thí nghiệm Borexino lần đầu bắt được neutrino từ chu trình CNO của Mặt Trời.',
      'Khi hydro trong lõi cạn, lõi co lại và nóng hơn. Ở khoảng 100 triệu K, heli bắt đầu hợp thành carbon qua **quá trình ba-alpha** (ba hạt nhân heli thành một carbon). Sao đủ nặng còn đi tiếp: oxy, neon, silic… cho tới sắt. Hợp hạch sắt thành nguyên tố nặng hơn không còn toả năng lượng — đó là điểm khởi đầu của một [[sieu-tan-tinh|siêu tân tinh]].',
    ],
    formulas: ['$$4\\,{}^{1}\\text{H} + 2e^{-} \\;\\longrightarrow\\; {}^{4}\\text{He} + 2\\nu_e + 26{,}7\\ \\text{MeV}$$'],
    symbols: [
      ['${}^{1}\\text{H}$', 'hạt nhân hydro (proton)'],
      ['${}^{4}\\text{He}$', 'hạt nhân heli-4 (2 proton, 2 neutron)'],
      ['$e^{-},\\ \\nu_e$', 'electron và neutrino electron. Trong chuỗi phản ứng sinh ra 2 positron, chúng huỷ ngay với 2 electron; neutrino bay thẳng ra khỏi Mặt Trời gần như không bị cản'],
      ['$26{,}7\\ \\text{MeV}$', 'tổng năng lượng cho mỗi hạt heli-4, tính từ khối lượng hụt bằng $E = \\Delta m\\,c^2$; khoảng 2 % bị neutrino mang đi'],
    ],
    viz: {
      module: 'pp-chain', height: 420, mobileHeight: 320,
      caption: 'Ba bước của nhánh chính chuỗi proton–proton. Bấm từng bước, hoặc để hình tự chạy. Hai bước đầu xảy ra hai lần cho mỗi hạt heli-4 được tạo thành.',
    },
    after: [
      'Năng lượng sinh ra ở lõi không ra ngoài ngay. Nó bị hấp thụ và phát lại vô số lần trong vùng bức xạ; NASA ước tính mất khoảng 170 000 năm để đi từ lõi lên tới đỉnh vùng đối lưu. Sau đó, ánh sáng chỉ cần 8 phút 19 giây để từ bề mặt Mặt Trời tới Trái Đất. Phản ứng hạt nhân quyết định độ sáng và tuổi thọ của mỗi ngôi sao — thứ mà [[bieu-do-hr|biểu đồ H–R]] sẽ bày ra trước mắt.',
    ],
    numbers: [
      { value: '~15 triệu °C', label: 'nhiệt độ lõi Mặt Trời (mô hình: 15,7 triệu K)', source: 'NASA; NSSDC' },
      { value: '~600 triệu tấn', label: 'hydro biến thành heli mỗi giây trong Mặt Trời (các nguồn khác nêu 600–700 triệu tấn)', source: 'ESA' },
      { value: '3,828 × 10²⁶ W', label: 'độ trưng danh định của Mặt Trời', source: 'IAU 2015 B3' },
    ],
    myths: [
      { myth: 'Mặt Trời là một quả cầu lửa đang cháy.', truth: 'Không có phản ứng cháy hoá học nào ở đây. Năng lượng đến từ tổng hợp hạt nhân trong lõi, chỉ chiếm khoảng một phần tư bán kính trong cùng.' },
      { myth: 'Ánh sáng Mặt Trời ta thấy vừa sinh ra ở lõi 8 phút trước.', truth: '8 phút là quãng bay từ bề mặt Mặt Trời tới Trái Đất. Năng lượng đã mất hàng chục đến hàng trăm nghìn năm để từ lõi ra tới bề mặt.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Nuclear Fusion`, url: 'https://astro4edu.org/resources/glossary/term/221/' },
      { text: 'NASA Science — Sun: Facts', url: 'https://science.nasa.gov/sun/facts/' },
      { text: 'ESA Education — Stellar radiation & stellar types', url: 'https://sci.esa.int/web/education/-/35774-stellar-radiation-stellar-types' },
      { text: 'Borexino Collaboration (2020), Nature 587, 577 — neutrino CNO của Mặt Trời', url: 'https://doi.org/10.1038/s41586-020-2934-0' },
      { text: 'Mitalas & Sills (1992), On the photon diffusion time scale for the Sun, ApJ 401, 759', url: 'https://ui.adsabs.harvard.edu/abs/1992ApJ...401..759M/abstract' },
      { text: 'Đài thiên văn Paris — Triple-alpha process', url: 'https://dictionary.obspm.fr/terms/triple-alpha-process/' },
    ],
  },

  /* ——— 5.3 ——— */
  'bieu-do-hr': {
    short: 'Biểu đồ xếp các sao theo độ trưng và nhiệt độ bề mặt; phần lớn sao nằm trên một dải chéo gọi là dãy chính.',
    certainty: { level: 'established', label: 'Đã xác lập · công thức trong minh hoạ là xấp xỉ giáo khoa' },
    definition: {
      vi: 'Biểu đồ của hai đại lượng quan sát được của các sao: trục tung là độ trưng, trục hoành là nhiệt độ hiệu dụng (hoặc loại quang phổ), với nhiệt độ giảm dần từ trái sang phải. Một đường cong trên biểu đồ có thể biểu diễn quá trình tiến hoá của một ngôi sao.',
      source: `${IAU_OAE}: Hertzsprung–Russell Diagram (diễn giải)`,
      url: 'https://astro4edu.org/resources/glossary/term/143/',
    },
    body: [
      'Đầu thế kỷ 20, Ejnar Hertzsprung (1911) và Henry Norris Russell (1913) độc lập nhận ra rằng độ sáng và màu sắc (tức nhiệt độ) của các sao không ngẫu nhiên. Đặt từng ngôi sao lên một biểu đồ — độ trưng theo trục dọc, nhiệt độ bề mặt theo trục ngang, **nóng ở bên trái** — chúng tụ thành những vùng rõ rệt: một dải chéo lớn, một nhóm sáng mà lạnh ở góc trên bên phải (sao khổng lồ), và một nhóm nóng mà mờ ở góc dưới bên trái (sao lùn trắng).',
      'Dải chéo là **dãy chính**: nơi các sao đang đốt hydro trong lõi, chiếm phần lớn cuộc đời của chúng. Vị trí của một sao trên dãy chính do **khối lượng** quyết định. Sao nặng hơn thì nóng hơn và sáng hơn rất nhiều — độ trưng tăng khoảng theo $M^{3{,}5}$ — nên tiêu nhiên liệu nhanh đến mức sống ngắn hơn nhiều: Mặt Trời ở trên dãy chính khoảng 10 tỷ năm, sao nặng 10 lần chỉ khoảng 20–30 triệu năm. Sao nhẹ nhất còn sống lâu hơn tuổi hiện nay của vũ trụ.',
      'Mặt Trời là sao loại G2V, nhiệt độ bề mặt danh định 5 772 K, khoảng 4,6 tỷ năm tuổi — đã qua gần nửa đời. Sau khoảng 5 tỷ năm nữa, nó sẽ rời dãy chính, phình thành sao khổng lồ đỏ, rồi cuối cùng thành [[sao-lun-trang|sao lùn trắng]]. Năm 2018, dữ liệu Gaia cho phép vẽ biểu đồ H–R của hơn 4 triệu sao trong vòng 5 000 năm ánh sáng, trong đó có hơn 35 000 sao lùn trắng.',
    ],
    formulas: [
      '$$L = 4\\pi R^2 \\sigma T^4$$',
      '$$\\frac{L}{L_\\odot} \\approx \\left(\\frac{M}{M_\\odot}\\right)^{3{,}5} \\qquad t \\approx 10\\ \\text{Gyr} \\times \\frac{M/M_\\odot}{L/L_\\odot}$$',
    ],
    symbols: [
      ['$L,\\ R,\\ T$', 'độ trưng, bán kính, nhiệt độ bề mặt — biết hai đại lượng là suy ra đại lượng thứ ba'],
      ['$\\sigma$', 'hằng số Stefan–Boltzmann'],
      ['$M$', 'khối lượng sao. Số mũ 3,5 chỉ đúng khoảng 2–55 M☉; sao nhẹ và sao rất nặng theo quy luật khác'],
      ['$t$', 'thời gian sống trên dãy chính (Gyr = tỷ năm): nhiên liệu tỉ lệ với $M$, tốc độ tiêu thụ tỉ lệ với $L$'],
    ],
    viz: {
      module: 'hr', height: 520, mobileHeight: 380,
      caption: 'Kéo khối lượng để đặt một ngôi sao lên dãy chính và đọc độ trưng, nhiệt độ, thời gian sống, kết cục. Bấm “Xem nó già đi” để thấy đường đi phác hoạ sau khi rời dãy chính. Chấm nền là quần thể minh hoạ, không phải dữ liệu thật. Minh hoạ dùng quan hệ khối lượng – độ trưng từng đoạn (số mũ 2,3 / 4 / 3,5 / 1), nên số đọc được có thể lệch vài chục phần trăm so với công thức đơn giản trên thẻ; với sao trên ~20 M☉, công thức thời gian sống không còn đúng nên chỉ ghi “vài triệu năm”.',
    },
    numbers: [
      { value: '5 772 K', label: 'nhiệt độ bề mặt danh định của Mặt Trời', source: 'IAU 2015 B3' },
      { value: '~10 tỷ năm', label: 'thời gian Mặt Trời ở trên dãy chính', source: 'NASA Imagine the Universe' },
      { value: '~0,08 → ~150–200 M☉', label: 'dải khối lượng của sao; giới hạn trên chưa chắc chắn', source: 'Crowther 2010; Gemini 2022' },
    ],
    myths: [
      { myth: 'Khi già đi, ngôi sao trượt dọc theo dãy chính.', truth: 'Suốt giai đoạn đốt hydro, mỗi sao gần như đứng yên một chỗ trên dãy chính. Dãy chính là tập hợp các sao có khối lượng khác nhau, không phải đường tiến hoá.' },
      { myth: 'Sao càng nặng càng sống lâu vì có nhiều nhiên liệu.', truth: 'Ngược lại: sao nặng đốt nhiên liệu nhanh hơn rất nhiều, nên sống ngắn hơn hẳn.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Hertzsprung–Russell Diagram`, url: 'https://astro4edu.org/resources/glossary/term/143/' },
      { text: `${IAU_OAE}: Main Sequence`, url: 'https://astro4edu.org/resources/glossary/term/186/' },
      { text: 'ESA (2018) — Gaia’s Hertzsprung–Russell diagram', url: 'https://www.esa.int/ESA_Multimedia/Images/2018/04/Gaia_s_Hertzsprung-Russell_diagram' },
      { text: 'NASA Imagine the Universe — Stars', url: 'https://imagine.gsfc.nasa.gov/science/objects/stars1.html' },
      { text: 'JILA/Colorado — Main-sequence lifetimes', url: 'https://jila.colorado.edu/~ajsh/courses/astr1120_03/text/chapter5/l5S2.htm' },
      { text: 'Crowther và cộng sự (2010), R136 — arXiv:1007.3284', url: 'https://arxiv.org/abs/1007.3284' },
      { text: 'NOIRLab/Gemini South (2022) — khối lượng hiện tại của R136a1 ~196 M☉' },
    ],
  },

  /* ——— 5.4 ——— */
  'sao-lun-trang': {
    short: 'Lõi còn lại của một sao cỡ Mặt Trời: khối lượng cỡ Mặt Trời nén trong quả cầu cỡ Trái Đất, không còn phản ứng hạt nhân.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Một sao lùn trắng điển hình có thể mang khối lượng của Mặt Trời nén trong một quả cầu chỉ lớn hơn Trái Đất một chút.',
      en: 'a typical white dwarf could have the mass of the Sun squeezed into a ball slightly larger than the size of the Earth',
      source: `${IAU_OAE}: White Dwarf`,
      url: 'https://www.astro4edu.org/resources/glossary/term/386/',
    },
    body: [
      'Sao sinh ra với khối lượng dưới khoảng 8 lần Mặt Trời — tức tuyệt đại đa số các sao — kết thúc khá êm đềm. Sau giai đoạn khổng lồ đỏ, lớp vỏ ngoài bị thổi dần ra không gian thành một **tinh vân hành tinh** (cái tên lịch sử, không liên quan tới hành tinh). Lõi còn lại, thường chủ yếu là carbon và oxy, chính là **sao lùn trắng**. Nó không còn phản ứng hạt nhân; nó sáng vì còn rất nóng, rồi nguội dần qua hàng tỷ năm.',
      'Thứ giữ sao lùn trắng khỏi sụp tiếp là **áp suất suy biến electron**: theo cơ học lượng tử, các electron không thể bị ép vào cùng một trạng thái, nên chúng tạo ra một áp suất chống lại sự nén — áp suất này gần như không phụ thuộc nhiệt độ. Hệ quả kỳ lạ: sao lùn trắng **càng nặng thì càng nhỏ**. Năm 1930, Subrahmanyan Chandrasekhar tính ra rằng trên khoảng 1,4 khối lượng Mặt Trời thì không còn sao lùn trắng bền nào — giới hạn mang tên ông, góp phần đem lại cho ông giải Nobel Vật lý 1983.',
      'Ví dụ gần gũi nhất là **Sirius B**, bạn đồng hành mờ nhạt của Sirius — ngôi sao sáng nhất bầu trời đêm. Nó nặng 1,02 lần Mặt Trời nhưng đường kính chỉ khoảng 12 000 km, nhỏ hơn Trái Đất. Theo NASA, một thìa cà phê vật chất sao lùn trắng nặng hơn một chiếc xe bán tải. Mặt Trời rồi cũng sẽ kết thúc như vậy.',
    ],
    formulas: ['$$\\frac{R}{R_\\odot} \\approx 0{,}0112 \\left(\\frac{M}{M_3}\\right)^{-1/3} \\left[1 - \\left(\\frac{M}{M_3}\\right)^{4/3}\\right]^{1/2}$$'],
    symbols: [
      ['$R,\\ M$', 'bán kính và khối lượng sao lùn trắng'],
      ['$M_3$', '≈ 1,45 M☉: giới hạn Chandrasekhar trong mô hình này (sao lùn trắng carbon–oxy); khi $M$ tiến tới đây, bán kính tiến về 0. Giá trị hay trích 1,44 M☉ khác chút do hằng số và thành phần'],
      ['', 'Quan hệ xấp xỉ của Nauenberg (1972) cho sao lùn trắng lạnh; đủ chính xác để thấy xu hướng “nặng hơn thì nhỏ hơn”.'],
    ],
    viz: {
      module: 'white-dwarf', height: 440, mobileHeight: 320,
      caption: 'Kéo khối lượng sao lùn trắng và so với Trái Đất vẽ cùng tỉ lệ. Gần giới hạn Chandrasekhar, sao co lại rất nhanh; vượt qua thì không còn trạng thái cân bằng. Bán kính tính theo công thức xấp xỉ nên nhỏ hơn số đo thực của Sirius B khoảng 5–10 %.',
    },
    after: [
      'Khi sao lùn trắng trong hệ sao đôi hút thêm vật chất tới sát giới hạn này, nó có thể nổ tung thành một [[sieu-tan-tinh-ia|siêu tân tinh loại Ia]] — ngọn nến chuẩn dùng để đo vũ trụ. Còn lõi của những ngôi sao nặng hơn nhiều vượt quá giới hạn và sụp thành [[sao-neutron|sao neutron]].',
    ],
    numbers: [
      { value: '~1,4 M☉', label: 'giới hạn Chandrasekhar (chính xác hơn ~1,44 M☉)', source: 'NASA Universe glossary; Britannica' },
      { value: '1,018 M☉', label: 'khối lượng Sirius B, đo từ quỹ đạo sao đôi', source: 'Bond và cộng sự 2017' },
      { value: '~12 000 km', label: 'đường kính Sirius B — nhỏ hơn Trái Đất (12 742 km)', source: 'ESA/Hubble 2005' },
    ],
    myths: [
      { myth: 'Sao lùn trắng vẫn đang đốt hạt nhân.', truth: 'Không. Nó sáng nhờ nhiệt còn tích trữ và nguội dần theo thời gian.' },
      { myth: 'Sao lùn trắng càng nặng thì càng to.', truth: 'Ngược lại: càng nặng càng nhỏ, do tính chất của áp suất suy biến electron.' },
      { myth: 'Vũ trụ đã có những “sao lùn đen” — sao lùn trắng nguội hẳn.', truth: 'Chưa. Thời gian nguội tới mức đó dài hơn tuổi hiện nay của vũ trụ (13,8 tỷ năm).' },
    ],
    sources: [
      { text: `${IAU_OAE}: White Dwarf`, url: 'https://www.astro4edu.org/resources/glossary/term/386/' },
      { text: 'NASA Science — Star Types', url: 'https://science.nasa.gov/universe/stars/types/' },
      { text: 'Bond và cộng sự (2017), Sirius B — arXiv:1703.10625', url: 'https://arxiv.org/abs/1703.10625' },
      { text: 'ESA (2005) — Weighing the Dog Star’s companion', url: 'https://www.esa.int/Science_Exploration/Space_Science/Weighing_the_Dog_Star_s_companion' },
      { text: 'Britannica — Chandrasekhar limit', url: 'https://www.britannica.com/topic/Chandrasekhar-limit' },
      { text: 'Nauenberg (1972), Analytic approximations to the mass–radius relation of white dwarfs, ApJ 175, 417', url: 'https://ui.adsabs.harvard.edu/abs/1972ApJ...175..417N/abstract' },
    ],
  },

  /* ——— 5.5 ——— */
  'sao-neutron': {
    short: 'Lõi sụp đổ của sao nặng: hơn một khối lượng Mặt Trời nén trong quả cầu rộng khoảng 25 km, gần như toàn neutron.',
    certainty: { level: 'established', label: 'Đã xác lập · cấu trúc bên trong vẫn là câu hỏi mở' },
    definition: {
      vi: 'Sao neutron là một tàn dư sao rất đặc và nhỏ gọn, còn lại sau khi lõi của một ngôi sao nặng sụp đổ. Lõi sụp có mật độ lớn hơn hầu hết các hạt nhân nguyên tử và cấu tạo chủ yếu từ neutron.',
      en: "A neutron star is a very dense and compact stellar remnant that is left following the collapse of a massive star's core. The collapsed core has a density larger than that of most atomic nuclei and is comprised primarily of neutrons.",
      source: `${IAU_OAE}: Neutron Star`,
      url: 'https://astro4edu.org/resources/glossary/term/214/',
    },
    body: [
      'Khi lõi của một sao sinh ra nặng khoảng 8–20 lần Mặt Trời sụp đổ trong một [[sieu-tan-tinh|siêu tân tinh]], electron bị ép vào proton thành neutron. Áp suất electron đã thua, nhưng neutron — cùng lực hạt nhân — chặn được sự sụp đổ ở một kích thước khó tin: các phép đo của kính NICER (NASA) cho bán kính khoảng 12–13 km, tức cả ngôi sao chỉ rộng cỡ một thành phố. Khối lượng đo được từ khoảng 1,2 đến 2,08 lần Mặt Trời. Theo NASA, một thìa cà phê vật chất ở đây nặng hơn một tỷ tấn. Trên khoảng 2,2–2,3 khối lượng Mặt Trời (con số chưa chắc chắn), không sao neutron nào đứng vững được — lõi sẽ sụp thành hố đen.',
      'Khi co lại từ kích thước một ngôi sao xuống vài chục km, lõi quay nhanh lên rất nhiều (như vận động viên trượt băng thu tay), và từ trường bị nén mạnh. Bức xạ phát ra thành hai chùm dọc trục từ. Nếu trục từ lệch khỏi trục quay, hai chùm quét qua không gian như đèn hải đăng; mỗi lần quét qua Trái Đất, ta thu được một xung. Đó là **pulsar**. Phần lớn sao neutron đã biết được phát hiện dưới dạng pulsar vô tuyến.',
      'Pulsar đầu tiên được Jocelyn Bell (sau là Bell Burnell), khi ấy là nghiên cứu sinh ở Cambridge, phát hiện năm 1967: những xung đều đặn cách nhau 1,337 giây, được đặt biệt danh đùa “LGM-1” (người xanh nhỏ bé). Bài báo đăng trên _Nature_ năm 1968; giải Nobel Vật lý 1974 được trao cho thầy hướng dẫn của bà, Antony Hewish (chia giải với Martin Ryle, người được trao vì công trình khác), chứ không phải bà. Pulsar quay nhanh nhất đã biết, PSR J1748−2446ad, quay 716 vòng mỗi giây.',
    ],
    formulas: ['$$v = \\frac{2\\pi R}{P}$$'],
    symbols: [
      ['$v$', 'tốc độ dài tại xích đạo của sao'],
      ['$R$', 'bán kính, khoảng 12 km'],
      ['$P$', 'chu kỳ quay — với pulsar 716 vòng/giây, $v$ ≈ 54 000 km/s, khoảng 18 % tốc độ ánh sáng'],
    ],
    viz: {
      module: 'pulsar', height: 440, mobileHeight: 360,
      caption: 'Sao neutron quay, hai chùm bức xạ quét qua không gian. Đồ thị bên phải là tín hiệu kính thiên văn trên Trái Đất thu được — mỗi đỉnh là một lần chùm quét qua. Chuyển động được làm chậm để mắt theo kịp; hệ số làm chậm ghi bên dưới.',
    },
    numbers: [
      { value: '~12–13 km', label: 'bán kính sao neutron, đo bằng NICER', source: 'Miller 2021; Dittmann 2024' },
      { value: '2,08 M☉', label: 'sao neutron nặng nhất đo đáng tin (PSR J0740+6620)', source: 'Fonseca và cộng sự 2021 (đo vô tuyến)' },
      { value: '716 vòng/giây', label: 'PSR J1748−2446ad trong cụm sao cầu Terzan 5', source: 'Hessels và cộng sự 2006, Science' },
    ],
    myths: [
      { myth: 'Pulsar nhấp nháy theo nhịp.', truth: 'Sao quay đều; “xung” chỉ là lúc chùm bức xạ quét qua hướng Trái Đất, như ánh đèn hải đăng.' },
      { myth: 'Sao neutron nào cũng là pulsar.', truth: 'Chỉ những sao có chùm quét qua Trái Đất mới thấy được dưới dạng pulsar. Những sao khác vẫn được phát hiện qua tia X, hệ sao đôi hay sóng hấp dẫn.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Neutron Star`, url: 'https://astro4edu.org/resources/glossary/term/214/' },
      { text: 'NASA Imagine the Universe — Neutron stars', url: 'https://imagine.gsfc.nasa.gov/science/objects/neutron_stars1.html' },
      { text: 'Miller và cộng sự (2021), bán kính PSR J0740+6620 (NICER) — arXiv:2105.06979', url: 'https://arxiv.org/abs/2105.06979' },
      { text: 'Dittmann và cộng sự (2024) — arXiv:2406.14467', url: 'https://arxiv.org/abs/2406.14467' },
      { text: 'Hessels và cộng sự (2006), A radio pulsar spinning at 716 Hz — arXiv:astro-ph/0601337', url: 'https://arxiv.org/abs/astro-ph/0601337' },
      { text: 'Linda Hall Library — Jocelyn Bell Burnell', url: 'https://www.lindahall.org/about/news/scientist-of-the-day/jocelyn-bell-burnell' },
    ],
  },

  /* ——— 5.6 ——— */
  'sieu-tan-tinh': {
    short: 'Vụ nổ kết thúc đời một ngôi sao, đủ sáng để thấy từ thiên hà khác; loại sụp lõi để lại sao neutron hoặc hố đen.',
    certainty: { level: 'strong', label: 'Bằng chứng mạnh · cơ chế nổ chi tiết vẫn đang nghiên cứu' },
    definition: {
      vi: 'Siêu tân tinh xảy ra theo hai con đường. Loại Ia: một sao lùn trắng nhận thêm khối lượng rồi nổ tung, không để lại gì. Loại II: một ngôi sao nặng trên khoảng 8 khối lượng Mặt Trời co sụp, để lại một sao neutron hoặc (với những sao nặng nhất) một hố đen khối lượng sao.',
      source: `${IAU_OAE}: Supernova (diễn giải)`,
      url: 'https://astro4edu.org/resources/glossary/term/349/',
    },
    body: [
      'Siêu tân tinh có hai “họ” rất khác nhau. Một là [[sieu-tan-tinh-ia|loại Ia]], vụ nổ nhiệt hạch của sao lùn trắng. Họ còn lại — chủ đề của thẻ này — là **siêu tân tinh sụp lõi** (loại II và các loại Ib, Ic): cái chết của sao sinh ra nặng hơn khoảng 8 lần Mặt Trời.',
      'Cuối đời, một sao nặng có cấu trúc như củ hành: các lớp hydro, heli, carbon, oxy, neon, silic, và một lõi sắt ở tâm. Hợp hạch sắt thành nguyên tố nặng hơn không còn toả năng lượng, nên khi lõi sắt vượt khoảng 1,4 khối lượng Mặt Trời, nó sụp đổ chỉ trong chưa tới một giây, nén tới mật độ hạt nhân rồi bật ngược. Năng lượng giải phóng — khoảng 10⁴⁶ J, chủ yếu từ trọng lực chứ không phải từ phản ứng hạt nhân — thoát ra **khoảng 99 % dưới dạng neutrino**; chỉ khoảng 1 % thành động năng thổi tung lớp vỏ và khoảng 0,01 % thành ánh sáng. Dù vậy, chừng ấy ánh sáng vẫn đủ để vụ nổ được nhìn thấy từ các thiên hà khác.',
      'Ngày 23/2/1987, ánh sáng của **SN 1987A** trong Đám Mây Magellan Lớn (cách khoảng 160 000 năm ánh sáng) tới Trái Đất. Vài giờ trước đó, ba máy dò trên mặt đất đã ghi được khoảng 25 neutrino — lần đầu tiên và đến nay là lần duy nhất bắt được neutrino từ một vụ sụp lõi, ủng hộ mạnh mẽ kịch bản trên. Năm 2024, Kính Webb tìm thấy bằng chứng có một sao neutron ở tâm tàn tích. Xa hơn trong lịch sử, năm 1054 các nhà thiên văn Trung Quốc ghi lại một “khách tinh” nhìn thấy cả ban ngày gần một tháng; tàn tích của nó là Tinh vân Con Cua, với một pulsar ở tâm.',
    ],
    formulas: ['$$E \\sim \\frac{G M^2}{R} \\approx \\frac{G\\,(1{,}4\\,M_\\odot)^2}{12\\ \\text{km}} \\sim 10^{46}\\ \\text{J}$$'],
    symbols: [
      ['$E$', 'năng lượng hấp dẫn giải phóng khi lõi co từ cỡ Trái Đất xuống cỡ một sao neutron (ước lượng bậc độ lớn)'],
      ['$M,\\ R$', 'khối lượng và bán kính của sao neutron hình thành'],
      ['$G$', 'hằng số hấp dẫn'],
    ],
    viz: {
      module: 'core-collapse', height: 460, mobileHeight: 380,
      caption: 'Bấm “Cho lõi sụp” để xem trình tự: cấu trúc củ hành, lõi sắt sụp, sao neutron và chớp neutrino, rồi sóng xung kích thổi bay các lớp ngoài. Hình không theo tỉ lệ; các thanh là phân bổ năng lượng điển hình.',
    },
    after: [
      'Vật chất bị thổi tung mang theo oxy, silic, canxi… mà ngôi sao đã tạo ra suốt đời nó, trộn vào môi trường giữa các vì sao. Đó là một mắt xích chính của [[nguon-goc-nguyen-to|nguồn gốc các nguyên tố]].',
    ],
    numbers: [
      { value: '~10⁴⁶ J', label: 'năng lượng giải phóng trong một vụ sụp lõi', source: 'Tổng quan arXiv:astro-ph/0502232' },
      { value: '~99 %', label: 'phần năng lượng thoát ra dưới dạng neutrino', source: 'Tổng quan arXiv:astro-ph/0502232' },
      { value: '~25 neutrino', label: 'ghi được từ SN 1987A tại Kamiokande II, IMB và Baksan (các nguồn nêu 24 hoặc 25)', source: 'CERN Courier' },
    ],
    myths: [
      { myth: 'Siêu tân tinh là ngôi sao cạn nhiên liệu rồi nổ như một quả bom.', truth: 'Siêu tân tinh sụp lõi bắt đầu bằng một vụ co sụp vào trong rồi bật ngược. Năng lượng chủ yếu đến từ trọng lực, và 99 % thoát đi dưới dạng neutrino.' },
      { myth: 'Betelgeuse sắp nổ và sẽ gây nguy hiểm cho Trái Đất.', truth: 'Betelgeuse cách khoảng 550 năm ánh sáng; NASA cho rằng nó khó nổ trong khoảng 100 000 năm tới. Một siêu tân tinh phải ở trong khoảng 30 năm ánh sáng mới có thể gây hại cho sự sống trên Trái Đất.' },
      { myth: 'Ta thấy SN 1987A nổ vào năm 1987.', truth: 'Vụ nổ xảy ra khoảng 160 000 năm trước đó; năm 1987 chỉ là lúc ánh sáng và neutrino tới nơi.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Supernova`, url: 'https://astro4edu.org/resources/glossary/term/349/' },
      { text: 'Tổng quan về cơ chế siêu tân tinh sụp lõi — arXiv:astro-ph/0502232', url: 'https://arxiv.org/abs/astro-ph/0502232' },
      { text: 'NASA JPL (2024) — Webb finds evidence for neutron star at heart of young supernova remnant', url: 'https://www.jpl.nasa.gov/news/webb-finds-evidence-for-neutron-star-at-heart-of-young-supernova-remnant/' },
      { text: 'NASA — Hubble Messier catalog: Messier 1 (Tinh vân Con Cua)', url: 'https://science.nasa.gov/mission/hubble/science/explore-the-night-sky/hubble-messier-catalog/messier-1/' },
      { text: 'CERN Courier — bài về tín hiệu neutrino của SN 1987A (Kamiokande II, IMB, Baksan)' },
      { text: 'NASA — What is Betelgeuse?', url: 'https://science.nasa.gov/universe/what-is-betelgeuse-inside-the-strange-volatile-star/' },
    ],
  },

  /* ——— 5.7 ——— */
  'nguon-goc-nguyen-to': {
    short: 'Hydro và phần lớn heli có từ Vụ Nổ Lớn; gần như mọi nguyên tố khác được tạo ra trong sao, siêu tân tinh và các vụ va chạm sao neutron.',
    certainty: { level: 'strong', label: 'Bằng chứng mạnh · tỉ lệ đóng góp của từng nguồn còn được tinh chỉnh' },
    definition: {
      vi: 'Tổng hợp hạt nhân Vụ Nổ Lớn (BBN), đôi khi gọi là tổng hợp hạt nhân nguyên thuỷ, là một giai đoạn tổng hợp hạt nhân ngắn ngủi trong pha nóng và đặc của Vụ Nổ Lớn.',
      en: "Big Bang Nucleosynthesis (BBN), sometimes called Primordial Nucleosynthesis, is a brief instance of nucleosynthesis during our Universe's hot and dense Big Bang phase.",
      source: `${IAU_OAE}: Big Bang Nucleosynthesis`,
      url: 'https://astro4edu.org/resources/glossary/term/430/',
    },
    body: [
      'Trong vài phút đầu tiên sau Vụ Nổ Lớn, vũ trụ đủ nóng và đặc để tạo ra hydro, phần lớn heli và một chút liti. Rồi nó giãn nở và nguội đi quá nhanh để đi tiếp. Gần như mọi nguyên tố còn lại — carbon trong tế bào, oxy ta thở, canxi trong xương, sắt trong máu — được tạo ra muộn hơn, trong lòng các ngôi sao và khi chúng chết.',
      'Mỗi loại sao là một “xưởng” riêng. Sao nặng tổng hợp tới sắt rồi tung sản phẩm ra trong [[sieu-tan-tinh|siêu tân tinh]]: đó là nguồn chính của oxy. Sắt thì phần lớn đến từ các sao lùn trắng nổ tung ([[sieu-tan-tinh-ia|siêu tân tinh Ia]]). Sao khối lượng thấp lúc cuối đời tạo ra phần lớn nitơ, một phần carbon, và khoảng một nửa các nguyên tố nặng hơn sắt (như chì) qua **quá trình s** — bắt neutron chậm. Nửa còn lại cần **quá trình r** — bắt neutron nhanh. Ngày 17/8/2017, sóng hấp dẫn GW170817 từ hai sao neutron va chạm kèm theo một “kilonova” mà quang phổ cho thấy dấu hiệu của quá trình r, có cả stronti: va chạm sao neutron là **một** nguồn chính của vàng và bạch kim. Nó có phải nguồn duy nhất hay không thì vẫn đang tranh luận.',
      'Vì vậy câu “chúng ta là bụi sao” đúng theo nghĩa đen, với một ngoại lệ đáng kể. Hydro chiếm khoảng 10 % khối lượng cơ thể và có từ Vụ Nổ Lớn — già hơn mọi ngôi sao. Khoảng 90 % còn lại được tạo ra trong các ngôi sao, rồi trải qua nhiều thế hệ sao trước khi góp vào đám mây khí đã sinh ra Mặt Trời và Trái Đất khoảng 4,6 tỷ năm trước.',
    ],
    viz: {
      module: 'stardust', height: 440, mobileHeight: 420,
      caption: 'Thành phần nguyên tố của cơ thể người (bộ số người tham chiếu ICRP qua nguồn thứ cấp, xấp xỉ) tô màu theo nơi chúng được tạo ra. Chuyển sang “Theo số nguyên tử” để thấy hydro áp đảo về số lượng. Nguồn gốc chính theo bảng của J. A. Johnson; carbon có hai nguồn lớn nên được tô màu riêng.',
    },
    numbers: [
      { value: 'vài phút', label: 'thời gian Vụ Nổ Lớn tạo ra hydro và heli (khoảng 3 phút theo NASA)', source: 'NASA SVS 13873' },
      { value: '~90 %', label: 'khối lượng cơ thể bạn được tạo ra trong các ngôi sao (APS ước tính 93 %)', source: 'Tính từ thành phần ICRP; APS PhysicsCentral' },
      { value: '17/8/2017', label: 'GW170817 — lần đầu thấy quá trình r trong một vụ va chạm sao neutron', source: 'Pian và cộng sự 2017, Nature' },
    ],
    myths: [
      { myth: 'Mọi nguyên tử trong cơ thể đều đến từ sao.', truth: 'Hydro — khoảng 10 % khối lượng nhưng khoảng 62 % số nguyên tử — có từ Vụ Nổ Lớn.' },
      { myth: 'Mọi nguyên tố nặng hơn sắt đều được tạo ra trong siêu tân tinh.', truth: 'Khoảng một nửa đến từ quá trình s trong sao khối lượng thấp lúc cuối đời; phần quá trình r có va chạm sao neutron là một nguồn chính đã được xác nhận.' },
      { myth: 'Vàng trên Trái Đất được tạo ra trong Mặt Trời.', truth: 'Mặt Trời hiện chủ yếu biến hydro thành heli và không thể tạo ra vàng. Vàng đã có trong đám mây sinh ra Hệ Mặt Trời, từ các sự kiện quá trình r trước đó trong Ngân Hà.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Big Bang Nucleosynthesis`, url: 'https://astro4edu.org/resources/glossary/term/430/' },
      { text: 'NASA SVS 13873 — Periodic Table of the Elements: Origins of the Elements', url: 'https://svs.gsfc.nasa.gov/13873/' },
      { text: 'J. A. Johnson (2019), Populating the periodic table: Nucleosynthesis of the elements, Science', url: 'https://www.astronomy.ohio-state.edu/johnson.3064/nucleo/index.html' },
      { text: 'Pian và cộng sự (2017), r-process nucleosynthesis in a double neutron star merger — arXiv:1710.05858', url: 'https://arxiv.org/abs/1710.05858' },
      { text: 'Watson và cộng sự (2019), Nature 574, 497 — stronti trong kilonova', url: 'https://doi.org/10.1038/s41586-019-1676-3' },
      { text: 'APS PhysicsCentral — How much of the human body is made up of stardust?', url: 'https://site3.auth.aps.commonspotcloud.com/explore/poster-stardust.cfm' },
    ],
  },
};
