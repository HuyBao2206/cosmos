// Chương 2 — Ánh sáng, nguồn thông tin gần như duy nhất. Dữ kiện & nguồn: research/anh-sang.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).
// Định nghĩa không có câu nguyên văn kiểm được thì ghi `paraphrase: true` (hiện "diễn giải theo"), không bịa trích dẫn.

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Ta chưa từng chạm vào một ngôi sao nào. Gần như mọi hiểu biết về những nơi ngoài Hệ Mặt Trời đều đến từ bức xạ điện từ (electromagnetic radiation) đi tới kính thiên văn. Các ngoại lệ đếm được trên đầu ngón tay: thiên thạch, tia vũ trụ (cosmic rays), neutrino (như từ siêu tân tinh 1987A), và từ năm 2015 là sóng hấp dẫn (gravitational waves).',
    'Ánh sáng chở ba loại thông tin. **Màu**, tức phân bố năng lượng theo bước sóng, cho biết nhiệt độ. **Vạch phổ** cho biết thành phần hoá học. **Độ lệch của vạch** cho biết vật đang chuyển động hay không gian đang giãn ra. Nhưng khí quyển Trái Đất chỉ cho một phần nhỏ của phổ đi qua, nên muốn đọc đủ các thông tin ấy phải đưa kính lên vũ trụ.',
  ],
  diagram: {
    nodes: [
      { id: 'pho-dien-tu', x: 14, y: 14, big: true },
      { id: 'quang-pho', x: 44, y: 28, big: true },
      { id: 'nhiet-do', x: 14, y: 46, label: 'Nhiệt độ (định luật Wien)' },
      { id: 'thanh-phan', x: 46, y: 54, label: 'Thành phần hoá học' },
      { id: 'dich-chuyen-do', x: 74, y: 16, big: true },
      { id: 'hubble-ext', x: 92, y: 40, label: 'Giãn nở vũ trụ' },
      { id: 'kinh-thien-van-khong-gian', x: 74, y: 52, big: true },
    ],
    edges: [
      ['pho-dien-tu', 'quang-pho', 'tách theo bước sóng'],
      ['quang-pho', 'nhiet-do', 'đỉnh phổ'],
      ['quang-pho', 'thanh-phan', 'vạch = vân tay'],
      ['quang-pho', 'dich-chuyen-do', 'vạch bị lệch'],
      ['dich-chuyen-do', 'hubble-ext', 'z lớn'],
      ['pho-dien-tu', 'kinh-thien-van-khong-gian', 'khí quyển chặn'],
      ['dich-chuyen-do', 'kinh-thien-van-khong-gian', 'UV → hồng ngoại'],
    ],
  },
  sources: [
    { text: 'NASA Science — Tour of the Electromagnetic Spectrum', url: 'https://science.nasa.gov/ems/' },
    { text: 'IPAC/Caltech — Observing across the spectrum', url: 'https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html' },
    { text: `${IAU_OAE}: Redshift`, url: 'https://astro4edu.org/resources/glossary/term/471/' },
    { text: 'Naidu và cộng sự (2025), MoM-z14 tại z = 14,44 — arXiv:2505.11263', url: 'https://arxiv.org/abs/2505.11263' },
  ],
};

export const CONCEPTS = {
  /* ——— 2.1 ——— */
  'pho-dien-tu': {
    short: 'Toàn bộ dải bức xạ điện từ, từ tia gamma tới sóng vô tuyến; ánh sáng mắt thấy chỉ là một khoảng hẹp khoảng 380–750 nm.',
    certainty: { level: 'established', label: 'Đã xác lập · ranh giới giữa các dải là quy ước' },
    definition: {
      vi: 'Ánh sáng khả kiến là đoạn của phổ điện từ mà mắt người nhìn thấy được. Tím có bước sóng ngắn nhất, khoảng 380 nanômét; đỏ có bước sóng dài nhất, khoảng 700 nanômét.',
      en: 'the segment of the electromagnetic spectrum that the human eye can view … Violet has the shortest wavelength, at around 380 nanometers, and red has the longest wavelength, at around 700 nanometers.',
      source: 'NASA Science — Tour of the Electromagnetic Spectrum: Visible Light',
      url: 'https://science.nasa.gov/ems/09_visiblelight/',
    },
    body: [
      'Sóng vô tuyến, vi sóng trong lò, tia X ở bệnh viện và ánh sáng mặt trời là **cùng một hiện tượng**: dao động lan truyền của điện trường và từ trường, đi trong chân không với tốc độ $c$. Chúng chỉ khác nhau ở **bước sóng** (wavelength) $\\lambda$. Phổ điện từ (electromagnetic spectrum) trải từ dưới một phần tỷ mét (tia gamma) tới hàng km (sóng vô tuyến), hơn 15 bậc độ lớn; mắt người chỉ thấy khoảng 380–750 nm, chưa tới một bậc.',
      'Bước sóng càng ngắn thì mỗi “hạt” ánh sáng — **photon** — càng mang nhiều năng lượng. Một photon ánh sáng lục mang khoảng 2,5 electronvolt (eV), đủ để kích thích phân tử sắc tố trong mắt. Một photon tia X mang hàng nghìn eV, đủ để ion hoá nguyên tử. Vì thế mỗi dải phổ kể về một kiểu vật chất khác nhau: khí triệu độ quanh hố đen phát tia X, bụi lạnh phát hồng ngoại, khí hydro trung hoà phát vạch vô tuyến 21 cm.',
    ],
    formulas: ['$$c = \\lambda\\,\\nu \\qquad E = h\\,\\nu = \\frac{h c}{\\lambda}$$'],
    symbols: [
      ['$\\lambda$', 'bước sóng (m)'],
      ['$\\nu$', 'tần số (Hz)'],
      ['$c$', 'tốc độ ánh sáng trong chân không, đúng 299 792 458 m/s'],
      ['$E$', 'năng lượng một photon (J; 1 eV = 1,602 × 10⁻¹⁹ J)'],
      ['$h$', 'hằng số Planck, đúng 6,626 070 15 × 10⁻³⁴ J·s (SI 2019)'],
    ],
    viz: {
      module: 'em-spectrum', height: 440, mobileHeight: 380,
      caption: 'Kéo trên dải phổ (hoặc dùng phím mũi tên) để đổi bước sóng. Đường xanh phía trên phác hoạ độ cao mà bức xạ bị khí quyển chặn — chỉ ánh sáng khả kiến, vài khe hồng ngoại và sóng vô tuyến từ khoảng 1 mm tới vài chục mét tới được mặt đất. Ranh giới giữa các dải là quy ước; các nguồn lệch nhau đôi chút.',
    },
    after: [
      'Khí quyển chặn phần lớn phổ điện từ. Oxy và nitơ ở tầng cao hấp thụ gần hết tia X và gamma; tầng ozone chặn tử ngoại dưới khoảng 300 nm; hơi nước và CO₂ ở tầng thấp nuốt phần lớn hồng ngoại. Chỉ còn hai “cửa sổ” rộng: **cửa sổ quang học** (optical window) quanh ánh sáng khả kiến và **cửa sổ vô tuyến** (radio window). Đó là lý do thiên văn học suốt hàng nghìn năm chỉ là thiên văn ánh sáng nhìn thấy, và vì sao cần [[kinh-thien-van-khong-gian|kính thiên văn ngoài không gian]].',
    ],
    numbers: [
      { value: '~380–750 nm', label: 'khoảng bước sóng mắt người nhìn thấy (ranh giới mờ, NASA ghi 380–700 nm)', source: 'NASA Science' },
      { value: '2,48 eV', label: 'năng lượng một photon bước sóng 500 nm', source: 'Tính từ E = hc/λ' },
      { value: '1 420,4 MHz', label: 'tần số vạch 21 cm của hydro trung hoà — “ngọn đèn” để vẽ bản đồ Ngân Hà', source: 'Giá trị đo (1 420,405 751 MHz)' },
    ],
    myths: [
      { myth: 'Ánh sáng chỉ là thứ mắt nhìn thấy.', truth: 'Ánh sáng khả kiến chỉ là một khoảng hẹp của phổ điện từ. Sóng vô tuyến hay tia X là cùng một loại bức xạ, chỉ khác bước sóng.' },
      { myth: 'Sóng vô tuyến là một dạng âm thanh.', truth: 'Sóng vô tuyến là bức xạ điện từ, truyền được trong chân không với tốc độ ánh sáng. Âm thanh là dao động cơ học, cần môi trường để truyền và không đi được trong chân không.' },
    ],
    sources: [
      { text: 'NASA Science — Tour of the Electromagnetic Spectrum: Visible Light', url: 'https://science.nasa.gov/ems/09_visiblelight/' },
      { text: `${IAU_OAE}: Electromagnetic radiation`, url: 'https://astro4edu.org/resources/glossary/term/96' },
      { text: 'IPAC/Caltech — Observing across the spectrum (hấp thụ của khí quyển)', url: 'https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html' },
      { text: 'NRAO Green Bank — Atmospheric windows', url: 'https://www.gb.nrao.edu/GBTopsdocs/primer/atmospheric__windows_.htm' },
    ],
  },

  /* ——— 2.2 ——— */
  'quang-pho': {
    short: 'Ánh sáng tách theo bước sóng; các vạch tối hay sáng ở những bước sóng xác định là “vân tay” của từng nguyên tố.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Vạch hấp thụ là một vạch tối trong quang phổ, cho thấy năng lượng bị hấp thụ ở một bước sóng nhất định. Đo các vạch này cho phép xác định những nguyên tố có mặt.',
      source: 'Diễn giải theo bảng thuật ngữ của Đài thiên văn McDonald (Đại học Texas)',
      url: 'https://mcdonaldobservatory.org/glossary/term/32',
      paraphrase: true,
    },
    body: [
      'Năm 1814, Joseph von Fraunhofer cho ánh sáng mặt trời qua lăng kính và thấy dải cầu vồng bị cắt bởi hàng trăm vạch tối mảnh; ông đo vị trí của hơn 500 vạch. Bốn mươi lăm năm sau (1859), Gustav Kirchhoff và Robert Bunsen chỉ ra rằng vạch tối của Mặt Trời nằm **đúng** ở bước sóng mà natri nung nóng phát sáng trong phòng thí nghiệm. Kết luận: khí quyển Mặt Trời có natri. Lần đầu tiên, con người biết thành phần hoá học của một vật không bao giờ chạm tới được.',
      'Lý do nằm ở cấu trúc nguyên tử: electron chỉ có thể ở những mức năng lượng nhất định, nên mỗi nguyên tố chỉ hấp thụ hoặc phát ra photon ở những bước sóng riêng của nó. Trước khi có lời giải thích ấy, Kirchhoff đã tóm kết quả thực nghiệm thành ba quy tắc. Vật đặc và nóng phát **phổ liên tục** (continuous spectrum). Khí loãng nóng phát **vạch phát xạ** (emission line). Khí loãng lạnh hơn đặt trước một nguồn phổ liên tục tạo **vạch hấp thụ** (absorption line), ở đúng các bước sóng mà nó phát ra khi nóng.',
      'Phần liên tục của phổ cũng chứa thông tin. Một ngôi sao bức xạ gần giống **vật đen** (blackbody): nóng hơn thì đỉnh phổ lùi về bước sóng ngắn hơn, theo định luật dịch chuyển Wien (Wien’s displacement law). Mặt Trời, với nhiệt độ hiệu dụng 5 772 K, cho đỉnh quanh 502 nm; sao loại O trên 30 000 K có đỉnh nằm trong vùng tử ngoại.',
    ],
    formulas: ['$$\\lambda_{\\max} = \\frac{b}{T}, \\qquad b \\approx 2{,}898 \\times 10^{-3}\\ \\text{m·K}$$'],
    symbols: [
      ['$\\lambda_{\\max}$', 'bước sóng tại đỉnh phổ (khi vẽ cường độ theo bước sóng)'],
      ['$T$', 'nhiệt độ bề mặt (K)'],
      ['$b$', 'hằng số dịch chuyển Wien'],
    ],
    viz: {
      module: 'spectral-lines', height: 460, mobileHeight: 420,
      caption: 'Kéo nhiệt độ để thấy đỉnh phổ (định luật Planck) trượt và các vạch hấp thụ đậm, nhạt. Chọn một nguyên tố để đặt “vân tay” vạch phát xạ của nó dưới quang phổ ngôi sao để đối chiếu. Bước sóng vạch là giá trị chuẩn; độ đậm của vạch theo nhiệt độ là phác hoạ định tính theo dãy phân loại quang phổ.',
    },
    after: [
      'Năm 1868, Jules Janssen ghi được một vạch vàng gần 587,6 nm khi quan sát nhật thực ở Ấn Độ; vài tháng sau, Norman Lockyer độc lập ghi được vạch này và nhận ra nó không khớp với nguyên tố nào đã biết. Nguyên tố mới được đặt tên **heli** theo chữ Hy Lạp _helios_ (Mặt Trời); 27 năm sau người ta mới tách được nó trên Trái Đất. Năm 1925, Cecilia Payne dùng quang phổ để chỉ ra rằng khí quyển các ngôi sao chủ yếu là hydro và heli — kết luận mà Henry Norris Russell, nhà thiên văn có uy tín bậc nhất khi ấy, lúc đầu bác bỏ.',
    ],
    numbers: [
      { value: '656,28 nm', label: 'vạch Hα của hydro — vạch đỏ nổi bật trong ảnh tinh vân', source: 'Dãy Balmer (bảng vạch chuẩn)' },
      { value: '502 nm', label: 'đỉnh phổ Mặt Trời, tính từ T = 5 772 K (IAU 2015)', source: 'Tính bằng định luật Wien' },
      { value: '1868', label: 'heli được phát hiện trong phổ Mặt Trời, 27 năm trước khi tìm thấy trên Trái Đất', source: 'APS News' },
    ],
    myths: [
      { myth: 'Vạch tối là chỗ hoàn toàn không có ánh sáng.', truth: 'Vạch tối chỉ là chỗ ánh sáng yếu hơn phần phổ xung quanh: khí hấp thụ photon ở bước sóng đó rồi phát lại theo mọi hướng, nên theo hướng nhìn của ta còn ít hơn.' },
      { myth: 'Quang phổ chỉ cho biết ngôi sao làm bằng gì.', truth: 'Quang phổ còn cho biết nhiệt độ, mật độ (qua độ rộng vạch), từ trường, và vận tốc theo hướng nhìn (qua [[dich-chuyen-do|độ lệch của vạch]]).' },
    ],
    khamPha: [{ href: '#ho-so-sun', label: 'Hồ sơ Mặt Trời' }],
    sources: [
      { text: 'Đài thiên văn McDonald — Glossary: absorption line', url: 'https://mcdonaldobservatory.org/glossary/term/32' },
      { text: 'IAU (2015), Nghị quyết B3 — các giá trị danh định của Mặt Trời (T = 5 772 K)', url: 'https://www.iau.org/static/resolutions/IAU2015_English.pdf' },
      { text: 'APS News (2014) — This month in physics history: helium', url: 'https://aps.org/publications/apsnews/201409/physicshistory.cfm' },
      { text: 'APS News (2015) — Cecilia Payne-Gaposchkin and the day the universe changed', url: 'https://www.aps.org/apsnews/2015/01/cecilia-payne-gaposchkin-universe-changed' },
    ],
  },

  /* ——— 2.3 ——— */
  'dich-chuyen-do': {
    short: 'Vạch quang phổ lệch sang bước sóng dài hơn (đỏ) khi nguồn lùi xa hoặc không gian giãn ra; lệch sang phía ngắn hơn (xanh) khi nguồn tiến lại.',
    certainty: { level: 'established', label: 'Đã xác lập · số liệu thiên hà xa nhất cập nhật 11/2026' },
    definition: {
      vi: 'Dịch chuyển đỏ có thể chỉ ba hiệu ứng: hiệu ứng Doppler khi nguồn phát bức xạ điện từ đang chuyển động ra xa người quan sát; dịch chuyển đỏ vũ trụ học khi không gian giãn nở kéo dài ánh sáng; và dịch chuyển đỏ hấp dẫn khi photon mất năng lượng lúc thoát khỏi một trường hấp dẫn.',
      en: '… the source emitting the electromagnetic radiation is moving away from the observer …',
      source: `Diễn giải theo ${IAU_OAE}: Redshift (trích một đoạn nguyên văn)`,
      url: 'https://astro4edu.org/resources/glossary/term/471/',
      paraphrase: true,
    },
    body: [
      'Còi xe cứu thương nghe cao hơn khi xe tiến lại và trầm xuống khi xe đi xa: sóng bị nén ở phía trước, bị kéo giãn ở phía sau — đó là hiệu ứng Doppler (Doppler effect). Ánh sáng cũng vậy. Nhờ có [[quang-pho|vạch phổ]] với bước sóng biết trước, ta đo được độ lệch này rất chính xác. Đại lượng dùng là **dịch chuyển đỏ** (redshift) $z$: độ dài thêm của bước sóng chia cho bước sóng ban đầu.',
      'Năm 1912, Vesto Slipher chụp phổ thiên hà Andromeda và thấy các vạch lệch về phía **xanh** — dịch chuyển xanh (blueshift): nhìn từ Mặt Trời, nó đang tiến lại với khoảng 300 km/s. (Phần lớn con số đó là chuyển động của chính Mặt Trời quanh tâm Ngân Hà; so với tâm Ngân Hà, Andromeda tiến lại khoảng 110 km/s.) Đến 1917, Slipher đo được 25 thiên hà và đa số lệch **đỏ**. Đó là manh mối đầu tiên của [[dinh-luat-hubble|sự giãn nở của vũ trụ]].',
      'Với thiên hà rất xa, $z$ không còn là vận tốc theo nghĩa thông thường: ánh sáng bị kéo dài vì chính không gian giãn ra trong lúc nó đang đi, và $1 + z$ cho biết vũ trụ đã giãn ra gấp bao nhiêu lần kể từ khi ánh sáng ấy rời đi. Ánh sáng từ thiên hà MoM-z14 ($z = 14{,}44$) đã bị kéo dài gấp 15,44 lần: tử ngoại lúc phát đi tới nơi thành hồng ngoại.',
    ],
    formulas: [
      '$$z = \\frac{\\lambda - \\lambda_0}{\\lambda_0} \\qquad 1 + z = \\sqrt{\\frac{1+\\beta}{1-\\beta}} \\qquad 1 + z = \\frac{a_0}{a_e}$$',
    ],
    symbols: [
      ['$z$', 'dịch chuyển đỏ (âm là dịch chuyển xanh); $\\lambda$ là bước sóng đo được, $\\lambda_0$ là bước sóng lúc phát (đo trong phòng thí nghiệm)'],
      ['$\\beta$', 'công thức giữa — hiệu ứng Doppler tương đối tính: vận tốc theo hướng nhìn chia cho tốc độ ánh sáng, $v/c$; khi $v \\ll c$ thì $z \\approx v/c$'],
      ['$a_0,\\ a_e$', 'công thức phải — dịch chuyển đỏ vũ trụ học: hệ số tỉ lệ (scale factor) của vũ trụ hôm nay và lúc ánh sáng được phát; khoảng cách giữa các thiên hà xa nhau tăng theo hệ số này'],
    ],
    viz: {
      module: 'redshift', height: 420, mobileHeight: 380,
      caption: 'Kéo thanh dịch chuyển đỏ để thấy các vạch trượt. Ở z vài phần trăm, có thể đọc như vận tốc; khi z lớn, phép đọc theo vũ trụ học (mô hình ΛCDM với tham số Planck 2018) cho biết ánh sáng đã đi bao lâu. Vùng màu cam là dải hồng ngoại mà máy quang phổ NIRSpec của JWST đo được.',
    },
    numbers: [
      { value: 'z = 14,44', label: 'MoM-z14, thiên hà xa nhất đã được xác nhận bằng quang phổ (tính tới 11/2026)', source: 'Naidu và cộng sự 2025, Open J. Astrophys. 2026' },
      { value: '~300 km/s', label: 'Andromeda tiến lại, nhìn từ Mặt Trời (~110 km/s so với tâm Ngân Hà)', source: 'McConnachie 2012; van der Marel 2012' },
      { value: '1 877 nm', label: 'vạch Lyman-α (121,6 nm, tử ngoại) của MoM-z14 khi tới Trái Đất', source: 'Tính: 121,567 nm × (1 + 14,44)' },
    ],
    myths: [
      { myth: 'Dịch chuyển đỏ nghĩa là vật trông đỏ hơn.', truth: 'Mọi bước sóng bị kéo dài cùng một tỉ lệ (1 + z). Tử ngoại có thể thành ánh sáng khả kiến, khả kiến thành hồng ngoại. Màu ta nhìn thấy phụ thuộc vào phổ ban đầu.' },
      { myth: 'Thiên hà có z > 1 đang bay nhanh hơn ánh sáng, trái với thuyết tương đối.', truth: 'Dịch chuyển đỏ vũ trụ học là do không gian giãn ra, không phải chuyển động xuyên qua không gian, nên không áp dụng giới hạn tốc độ của thuyết tương đối hẹp.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Redshift`, url: 'https://astro4edu.org/resources/glossary/term/471/' },
      { text: "C. O'Raifeartaigh (2013), The contribution of V. M. Slipher to the discovery of the expanding universe — arXiv:1212.5499", url: 'https://arxiv.org/abs/1212.5499' },
      { text: 'van der Marel và cộng sự (2012), The M31 velocity vector — arXiv:1205.6864', url: 'https://arxiv.org/abs/1205.6864' },
      { text: 'Naidu và cộng sự (2025), A Cosmic Miracle: z = 14,44 — arXiv:2505.11263', url: 'https://arxiv.org/abs/2505.11263' },
      { text: 'Schouws và cộng sự (2025, ApJ 988), JADES-GS-z14-0 xác nhận bằng ALMA (z = 14,18) — arXiv:2409.20549', url: 'https://arxiv.org/abs/2409.20549' },
    ],
  },

  /* ——— 2.4 ——— */
  'kinh-thien-van-khong-gian': {
    short: 'Kính thiên văn không gian (space telescope) đặt ngoài khí quyển để thu những dải bức xạ bị không khí chặn và tránh nhiễu loạn làm nhoè ảnh — không phải để ở gần sao hơn.',
    certainty: { level: 'established', label: 'Đã xác lập · tình trạng sứ mệnh tính tới 11/2026' },
    definition: {
      vi: 'Những dải bức xạ không xuyên qua được khí quyển chỉ có thể quan sát từ không gian. Kính thiên văn ngoài không gian còn tránh được tác động làm nhoè ảnh của khí quyển.',
      source: 'Diễn giải theo IPAC/Caltech — Observing across the spectrum',
      url: 'https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html',
      paraphrase: true,
    },
    body: [
      'Kính Hubble bay ở độ cao khoảng 480 km. Ngôi sao gần nhất sau Mặt Trời, Proxima Centauri, cách khoảng 40 nghìn tỷ km — Hubble chỉ “gần hơn” một phần trăm tỷ quãng đường đó. Lý do thật của việc đưa kính lên vũ trụ là **khí quyển**, theo hai cách.',
      'Thứ nhất, khí quyển **hấp thụ**: tia gamma, tia X, phần lớn tử ngoại và hồng ngoại không bao giờ tới mặt đất (xem [[pho-dien-tu|phổ điện từ]]). Thiên văn tia X chỉ làm được khi đưa thiết bị lên trên phần lớn khí quyển — lúc đầu bằng tên lửa và khí cầu tầm cao, sau đó bằng vệ tinh. Thứ hai, không khí luôn **xáo động** (atmospheric turbulence, gọi chung là seeing): các lớp khí nóng lạnh khác nhau bẻ ánh sáng lệch đi liên tục, làm ảnh sao nhảy múa và nhoè — chính là hiện tượng sao “lấp lánh”. Ở những đài quan sát tốt nhất, độ nhoè này vẫn khoảng 0,5–1 giây cung (arcsecond, ″).',
      'Một kính hoàn hảo cũng có giới hạn: do **nhiễu xạ** (diffraction), nó không tách được hai điểm gần nhau hơn khoảng $1{,}22\\,\\lambda/D$. Với Hubble (gương 2,4 m) ở ánh sáng khả kiến, giới hạn này là khoảng 0,06″ — sắc nét hơn mức khí quyển cho phép khoảng 10–15 lần. Trên mặt đất, **quang học thích ứng** (adaptive optics) dùng một gương biến dạng, chỉnh hình dạng hàng trăm lần mỗi giây, để bù xáo động, nhưng không làm được việc thứ nhất: không khí vẫn chặn tia X.',
    ],
    formulas: ['$$\\theta \\approx 1{,}22\\,\\frac{\\lambda}{D}$$'],
    symbols: [
      ['$\\theta$', 'góc phân giải nhỏ nhất (radian; 1 rad ≈ 206 265″)'],
      ['$\\lambda$', 'bước sóng quan sát'],
      ['$D$', 'đường kính gương chính'],
    ],
    viz: {
      module: 'seeing', height: 440, mobileHeight: 460,
      caption: 'Một sao đôi cách nhau 0,1″ nhìn qua kính đường kính D. Đổi đường kính, bước sóng và độ xáo động để so ảnh mặt đất với ảnh không gian. Ảnh dựng bằng hàm nhoè Gauss tương đương, đủ để so độ phân giải; không vẽ các vành nhiễu xạ.',
    },
    after: [
      'Kính James Webb (JWST, phóng 25/12/2021) đi xa hơn một bước: nó quan sát hồng ngoại, mà mọi vật ấm — kể cả chính chiếc kính — đều phát ra hồng ngoại. Vì vậy Webb được đặt quanh điểm [[diem-lagrange|Lagrange L2]], cách Trái Đất khoảng 1,5 triệu km, và có một tấm che nắng năm lớp cỡ sân quần vợt giữ gương ở dưới 50 K (khoảng −223 °C). Ánh sáng tử ngoại của những thiên hà đầu tiên đã bị [[dich-chuyen-do|dịch chuyển đỏ]] thành hồng ngoại, nên muốn thấy chúng cần một kính hồng ngoại lớn đặt ngoài không gian.',
    ],
    numbers: [
      { value: '24/4/1990', label: 'Hubble được phóng; gương 2,4 m, quỹ đạo nay khoảng 480 km và đang hạ dần', source: 'ESA/Hubble; NASA Hubble FAQ' },
      { value: '6,5 m', label: 'gương của JWST, ở quanh điểm L2 cách Trái Đất ~1,5 triệu km', source: 'NASA Webb' },
      { value: '30/8/2026', label: 'kính Nancy Grace Roman được phóng; tính tới 11/2026 đang trên đường tới L2', source: 'NASA — Roman Launch' },
    ],
    myths: [
      { myth: 'Đưa kính lên vũ trụ để ở gần các ngôi sao hơn.', truth: 'Độ cao vài trăm km không đáng kể so với khoảng cách tới sao. Lý do là tránh sự hấp thụ và xáo động của khí quyển (và với JWST, tránh nhiệt của Trái Đất).' },
      { myth: 'Kính không gian lúc nào cũng tốt hơn kính mặt đất.', truth: 'Gương Hubble 2,4 m nhỏ hơn nhiều so với các kính mặt đất 8–10 m, vốn thu được nhiều ánh sáng hơn. Ở ánh sáng khả kiến và cận hồng ngoại, có quang học thích ứng hỗ trợ, hai loại kính bổ sung cho nhau.' },
    ],
    sources: [
      { text: 'IPAC/Caltech — Observing across the spectrum', url: 'https://www.ipac.caltech.edu/Outreach/Multiwave/observing.html' },
      { text: 'ESA/Hubble — Fact sheet', url: 'https://esahubble.org/about/general/fact_sheet/' },
      { text: 'NASA — Hubble FAQs', url: 'https://science.nasa.gov/mission/hubble/overview/faqs' },
      { text: 'NASA — Webb blog (tấm che nắng, nhiệt độ vận hành)', url: 'https://blogs.nasa.gov/webb/' },
      { text: 'NASA — Roman Space Telescope: Launch', url: 'https://science.nasa.gov/mission/roman-space-telescope/roman-launch/' },
      { text: 'Woillez và cộng sự (2022), GRAVITY+ — seeing tại Paranal — arXiv:2206.00684', url: 'https://arxiv.org/abs/2206.00684' },
    ],
  },
};
