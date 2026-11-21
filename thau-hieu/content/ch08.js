// Chương 8 — Lịch sử vũ trụ. Dữ kiện & nguồn: research/lich-su-vu-tru.md (bảng H₀ cập nhật 11/2026), research/thang-bac-vu-tru.md.
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Vũ trụ có tuổi: khoảng 13,8 tỷ năm. Con số này không đến từ một suy đoán mà từ ba nhóm quan sát độc lập cùng chỉ về một câu chuyện. Các thiên hà đang lùi xa nhau, nên trong quá khứ chúng gần nhau hơn. Khắp bầu trời có một thứ bức xạ vi sóng đều đặn — hơi ấm còn sót lại từ thời vũ trụ nóng và đặc. Và tỉ lệ hydro, heli trong những đám khí nguyên sơ nhất đúng như phép tính cho vài phút đầu tiên của một vũ trụ như vậy.',
    'Chương này đi theo trình tự: Vụ Nổ Lớn là gì và không là gì; bức xạ phông vi sóng — ánh sáng cổ nhất ta thấy được; định luật Hubble–Lemaître về sự giãn nở; và năng lượng tối, thứ khiến sự giãn nở ngày càng nhanh.',
  ],
  diagram: {
    nodes: [
      { id: 'vu-no-lon', x: 10, y: 22, big: true },
      { id: 'phong-vi-song', x: 34, y: 10, big: true },
      { id: 'bbn-ext', x: 24, y: 48, label: 'Hydro, heli nguyên thuỷ' },
      { id: 'dinh-luat-hubble', x: 60, y: 22, big: true },
      { id: 'nang-luong-toi', x: 86, y: 12, big: true },
      { id: 'dich-chuyen-do', x: 62, y: 52 },
      { id: 'sieu-tan-tinh-ia', x: 90, y: 46 },
    ],
    edges: [
      ['vu-no-lon', 'phong-vi-song', 'sau 380 000 năm'],
      ['vu-no-lon', 'bbn-ext', 'vài phút đầu'],
      ['vu-no-lon', 'dinh-luat-hubble', 'không gian giãn nở'],
      ['dich-chuyen-do', 'dinh-luat-hubble', 'đo vận tốc lùi xa'],
      ['dinh-luat-hubble', 'nang-luong-toi', 'giãn nở tăng tốc'],
      ['sieu-tan-tinh-ia', 'nang-luong-toi', '1998'],
    ],
  },
  sources: [
    { text: 'Planck Collaboration (2018/2020), Cosmological parameters, A&A 641, A6', url: 'https://ui.adsabs.harvard.edu/abs/2020A%26A...641A...6P/abstract' },
    { text: 'NASA WMAP — Universe 101', url: 'https://map.gsfc.nasa.gov/universe/' },
    { text: 'IAU (2018), iau1812 — Hubble–Lemaître law', url: 'https://www.iau.org/news/pressreleases/detail/iau1812/' },
  ],
};

export const CONCEPTS = {
  /* ——— 8.1 ——— */
  'vu-no-lon': {
    short: 'Lý thuyết mô tả vũ trụ tiến hoá từ một trạng thái rất nóng và đặc cách nay khoảng 13,8 tỷ năm, rồi giãn nở và nguội dần.',
    certainty: { level: 'established', label: 'Đã xác lập · giai đoạn lạm phát còn là giả thuyết' },
    definition: {
      vi: 'Thuyết Vụ Nổ Lớn là lời giải thích cơ bản cho các giai đoạn tiến hoá của vũ trụ.',
      en: 'The Big Bang theory is the basic explanation for the evolutionary stages of the Universe.',
      source: `${IAU_OAE}: Big Bang Theory`,
      url: 'https://astro4edu.org/resources/glossary/term/38/',
    },
    body: [
      'Tên gọi dễ gây hiểu lầm. Vụ Nổ Lớn (Big Bang) không phải một vụ nổ ở một điểm trong khoảng không trống rỗng, vì không có “bên ngoài” nào để nổ vào. Đó là trạng thái mà **toàn bộ** không gian khi ấy nóng và đặc, rồi mọi điểm cùng giãn ra xa nhau. Năm 1927, Georges Lemaître suy ra từ [[tuong-doi-tong-quat|thuyết tương đối tổng quát]] rằng vũ trụ phải giãn nở; năm 1931 ông đề xuất vũ trụ bắt đầu từ một “nguyên tử nguyên thuỷ”. Cái tên “Big Bang” do Fred Hoyle, người phản đối ý tưởng này, dùng trong một buổi nói chuyện trên đài BBC ngày 28/3/1949.',
      'Thuyết được đỡ bởi ba trụ cột quan sát độc lập. Thứ nhất, các thiên hà lùi xa theo [[dinh-luat-hubble|định luật Hubble–Lemaître]]. Thứ hai, [[phong-vi-song|bức xạ phông vi sóng]] có phổ vật đen gần hoàn hảo. Thứ ba, trong vài phút đầu, khi vũ trụ đủ nóng để hợp hạch nhưng nguội rất nhanh, nó chỉ kịp tạo ra heli cùng một ít đơteri và liti (**tổng hợp hạt nhân Vụ Nổ Lớn**, Big Bang nucleosynthesis): tính toán cho khoảng 75 % hydro và 25 % heli theo khối lượng, khớp với số đo trong các đám khí nguyên sơ nhất, ít bị các thế hệ sao làm biến đổi.',
    ],
    viz: {
      module: 'cosmic-timeline', height: 400, mobileHeight: 360,
      caption: 'Kéo trên dòng thời gian (thang log, từ 1 giây tới hôm nay) hoặc bấm một mốc. Nhiệt độ bức xạ và kích thước tương đối tính từ mô hình ΛCDM với tham số Planck 2018; ở những giây đầu mô hình đơn giản này chỉ đúng về bậc độ lớn.',
    },
    after: [
      'Thuyết Vụ Nổ Lớn mô tả vũ trụ tiến hoá **từ** trạng thái nóng đặc, không mô tả “khoảnh khắc số không”: ở đó cần một lý thuyết kết hợp hấp dẫn với cơ học lượng tử mà ta chưa có. Giai đoạn **lạm phát** (inflation) — một sự giãn nở cực nhanh, theo các mô hình phổ biến kéo dài từ khoảng 10⁻³⁶ tới 10⁻³² giây — giải thích tốt nhiều đặc điểm của phông vi sóng, nhưng vẫn là giả thuyết: dấu vết đặc trưng của nó (sóng hấp dẫn nguyên thuỷ) chưa được phát hiện.',
    ],
    numbers: [
      { value: '13,787 ± 0,020 tỷ năm', label: 'tuổi vũ trụ theo mô hình ΛCDM khớp với dữ liệu Planck', source: 'Planck 2018' },
      { value: '~75 % / ~25 %', label: 'hydro / heli theo khối lượng từ tổng hợp hạt nhân Vụ Nổ Lớn (Y_p ≈ 0,245)', source: 'PDG Review 2025' },
      { value: '28/3/1949', label: 'Fred Hoyle dùng cụm từ “big bang” trên đài BBC', source: 'H. Kragh, Nature 2024' },
    ],
    myths: [
      { myth: 'Vụ Nổ Lớn là một vụ nổ từ một điểm, văng vật chất vào không gian trống.', truth: 'Không gian tự nó giãn ra, ở mọi nơi cùng lúc, và không có tâm. Vũ trụ quan sát được có kích thước hữu hạn, nhưng vũ trụ toàn thể có thể là vô hạn.' },
      { myth: 'Thuyết Vụ Nổ Lớn giải thích vũ trụ ra đời từ đâu.', truth: 'Thuyết mô tả chuyện xảy ra từ khi vũ trụ đã nóng và đặc trở đi. Câu hỏi “trước đó” hay “vì sao” nằm ngoài phần vật lý đã kiểm chứng.' },
    ],
    khaoLuan: [{ label: 'Trước Vụ Nổ Lớn có gì?' }],
    sources: [
      { text: `${IAU_OAE}: Big Bang Theory`, url: 'https://astro4edu.org/resources/glossary/term/38/' },
      { text: 'J.-P. Luminet (2011), Lemaître’s Big Bang — arXiv:1105.6271', url: 'https://arxiv.org/abs/1105.6271' },
      { text: 'H. Kragh (2024), The origin of the name “Big Bang”, Nature', url: 'https://doi.org/10.1038/d41586-024-00894-z' },
      { text: 'Particle Data Group (2025), Big-Bang nucleosynthesis', url: 'https://pdg.lbl.gov/2025/reviews/rpp2025-rev-bbang-nucleosynthesis.pdf' },
      { text: 'NASA WMAP — Tests of Big Bang cosmology', url: 'https://map.gsfc.nasa.gov/universe/' },
    ],
  },

  /* ——— 8.2 ——— */
  'phong-vi-song': {
    short: 'Ánh sáng cổ nhất ta thấy được, phát ra khi vũ trụ khoảng 380 000 năm tuổi; nay đã nguội thành vi sóng ở 2,7255 K, đến từ mọi hướng.',
    certainty: { level: 'established', label: 'Đã xác lập' },
    definition: {
      vi: 'Bức xạ phông vi sóng vũ trụ là phần nhiệt còn sót lại từ Vụ Nổ Lớn, có nhiệt độ rất đồng đều trên toàn bầu trời.',
      source: 'Diễn giải theo NASA — Wilkinson Microwave Anisotropy Probe (WMAP)',
      url: 'https://map.gsfc.nasa.gov/',
      paraphrase: true,
    },
    body: [
      'Trong khoảng 380 000 năm đầu, vũ trụ là một khối plasma nóng: electron tự do liên tục tán xạ ánh sáng, giống như sương mù dày. Khi nhiệt độ hạ xuống khoảng 3 000 K, electron gắn vào hạt nhân thành nguyên tử trung hoà (**tái kết hợp**, recombination), và ánh sáng từ đó đi thẳng. Ta vẫn đang nhận ánh sáng ấy, từ mọi hướng. Nhưng vũ trụ đã giãn ra khoảng 1 100 lần kể từ đó, nên bước sóng cũng dài ra 1 100 lần: ánh sáng đỏ cam của khí 3 000 K nay là vi sóng của một vật ở 2,7 K.',
      'Năm 1948, Ralph Alpher và Robert Herman dự đoán bức xạ này với nhiệt độ cỡ 5 K, nhưng dự đoán bị lãng quên. Năm 1964, Arno Penzias và Robert Wilson, khi đo bằng một ăng-ten loa của Bell Labs ở Holmdel (New Jersey), thu được một tín hiệu nhiễu đều từ mọi hướng mà họ không loại trừ được; kết quả công bố năm 1965 và đem lại cho họ giải Nobel Vật lý 1978. Vệ tinh COBE của NASA (phóng năm 1989) đo được phổ của nó trùng với phổ vật đen tới sai số rất nhỏ, và phát hiện những gợn nhiệt độ chỉ cỡ một phần trăm nghìn (Nobel 2006). Những gợn ấy là mầm của mọi thiên hà và [[mang-luoi-vu-tru|mạng lưới vũ trụ]] về sau.',
    ],
    formulas: ['$$T(z) = T_0\\,(1+z), \\qquad T_0 = 2{,}7255\\ \\text{K}$$'],
    symbols: [
      ['$T_0$', 'nhiệt độ phông vi sóng hôm nay (Fixsen 2009: 2,72548 ± 0,00057 K)'],
      ['$z$', 'dịch chuyển đỏ; lúc tái kết hợp $z ≈ 1\\,090$, nên $T ≈ 2\\,970$ K'],
    ],
    viz: {
      module: 'cmb', height: 440, mobileHeight: 420,
      caption: 'Kéo thời điểm từ lúc phát ra (z ≈ 1 090) tới hôm nay. Đường cong là phổ vật đen (định luật Planck) ở nhiệt độ T₀(1 + z), chuẩn hoá theo đỉnh; dải màu đánh dấu vùng khả kiến và vùng vi sóng. Bản đồ gợn bên dưới là minh hoạ, không phải bản đồ Planck thật.',
    },
    after: [
      'Các vệ tinh WMAP (NASA) và Planck (ESA) sau đó vẽ bản đồ những gợn nhiệt độ này với độ chi tiết rất cao. Từ kích thước đặc trưng của các gợn, người ta suy ra tuổi vũ trụ, độ phẳng của không gian, và tỉ phần [[vat-chat-toi|vật chất tối]], vật chất thường, [[nang-luong-toi|năng lượng tối]]. Mỗi cm³ không gian quanh ta hiện chứa khoảng 411 photon của phông vi sóng.',
    ],
    numbers: [
      { value: '2,72548 K', label: 'nhiệt độ phông vi sóng hôm nay (± 0,00057 K)', source: 'Fixsen 2009, ApJ 707, 916' },
      { value: '~1 phần 100 000', label: 'độ chênh nhiệt độ giữa các vùng trên bầu trời', source: 'COBE; Planck' },
      { value: '~411 photon/cm³', label: 'mật độ photon phông vi sóng quanh ta', source: 'Tự tính từ T₀' },
    ],
    myths: [
      { myth: 'Phông vi sóng đến từ một điểm, nơi Vụ Nổ Lớn xảy ra.', truth: 'Nó đến từ mọi hướng như nhau, vì Vụ Nổ Lớn diễn ra ở khắp nơi. Ta thấy một “mặt phân tán cuối cùng” bao quanh mình theo mọi phía.' },
      { myth: 'Bản đồ phông vi sóng nhiều màu cho thấy vũ trụ sơ khai rất hỗn loạn.', truth: 'Màu sắc được phóng đại hàng chục nghìn lần. Chênh lệch thật chỉ khoảng một phần trăm nghìn: vũ trụ sơ khai đồng đều ở mức hiếm thấy.' },
    ],
    sources: [
      { text: 'D. J. Fixsen (2009), The temperature of the cosmic microwave background — arXiv:0911.1955', url: 'https://arxiv.org/abs/0911.1955' },
      { text: 'Giải Nobel Vật lý 1978 — Penzias & Wilson', url: 'https://www.nobelprize.org/prizes/physics/1978/' },
      { text: 'Giải Nobel Vật lý 2006 — Mather & Smoot', url: 'https://www.nobelprize.org/prizes/physics/2006/' },
      { text: 'Alpher & Herman và dự đoán phông vi sóng (lịch sử) — arXiv:1411.0172', url: 'https://arxiv.org/abs/1411.0172' },
      { text: 'Planck Collaboration (2018) — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
    ],
  },

  /* ——— 8.3 ——— */
  'dinh-luat-hubble': {
    short: 'Thiên hà càng xa thì lùi xa càng nhanh, v = H₀·d — dấu hiệu không gian đang giãn nở; giá trị H₀ đo bằng các cách khác nhau đang lệch nhau.',
    certainty: { level: 'established', label: 'Đã xác lập · giá trị H₀ đang tranh luận (11/2026)' },
    definition: {
      vi: 'Nghị quyết khuyến nghị đổi tên định luật Hubble thành định luật Hubble–Lemaître đã được thông qua.',
      en: 'the resolution to recommend renaming the Hubble law as the Hubble–Lemaître law has been accepted',
      source: 'IAU, thông cáo iau1812 (29/10/2018)',
      url: 'https://www.iau.org/news/pressreleases/detail/iau1812/',
    },
    body: [
      'Từ năm 1912 đến 1917, Vesto Slipher đo được rằng phần lớn các tinh vân xoắn ốc — về sau được biết là thiên hà — có [[dich-chuyen-do|dịch chuyển đỏ]]. Năm 1927, Lemaître suy ra từ lý thuyết rằng vận tốc lùi xa phải tỉ lệ với khoảng cách và ước lượng hệ số tỉ lệ từ số liệu có sẵn. Năm 1929, Edwin Hubble ghép dịch chuyển đỏ với khoảng cách ước lượng dựa trên [[cepheid|sao Cepheid]] và thấy quan hệ ấy trong số liệu. Năm 2018, Liên đoàn Thiên văn Quốc tế (IAU) bỏ phiếu khuyến nghị gọi tên là **định luật Hubble–Lemaître**.',
      'Định luật này không có nghĩa ta ở tâm vũ trụ. Khi mọi khoảng cách cùng nhân lên một hệ số, người đứng ở **bất kỳ** thiên hà nào cũng thấy các thiên hà khác lùi xa với vận tốc tỉ lệ thuận với khoảng cách — như các hạt nho khô trong một ổ bánh mì đang nở. Hệ số tỉ lệ là **hằng số Hubble** $H_0$, đo bằng km/s cho mỗi megaparsec (1 Mpc ≈ 3,26 triệu năm ánh sáng).',
    ],
    formulas: ['$$v = H_0\\, d$$'],
    symbols: [
      ['$v$', 'vận tốc lùi xa (km/s)'],
      ['$d$', 'khoảng cách (Mpc)'],
      ['$H_0$', 'hằng số Hubble hôm nay, khoảng 67–73 km/s/Mpc; $1/H_0$ ≈ 14,5 tỷ năm với $H_0$ = 67,4'],
    ],
    viz: {
      module: 'hubble-expansion', height: 440, mobileHeight: 480,
      caption: 'Mọi khoảng cách cùng tăng theo một hệ số. Bấm vào một thiên hà bất kỳ để đứng ở đó: từ chỗ nào nhìn cũng thấy các thiên hà khác lùi xa, và đồ thị vận tốc theo khoảng cách luôn là một đường thẳng. Đơn vị trong hình là minh hoạ; bảng số quy đổi theo H₀ thật.',
    },
    after: [
      'Đến nay, $H_0$ đo bằng hai con đường cho hai đáp số. Từ vũ trụ sớm ([[phong-vi-song|phông vi sóng]] cộng mô hình ΛCDM): Planck 2018 cho 67,4 ± 0,5. Từ vũ trụ gần ([[thang-khoang-cach|bậc thang khoảng cách]]): nhóm SH0ES (2022) cho 73,04 ± 1,04, mạng khoảng cách H0DN (4/2026) cho 73,50 ± 0,81. Độ lệch thường được nêu là khoảng 5σ; các phân tích 2025–2026 cho từ 4,5σ tới hơn 7σ tuỳ tổ hợp dữ liệu — quá lớn để coi là ngẫu nhiên. Đó là **căng thẳng Hubble** (Hubble tension): hoặc một phép đo có sai số hệ thống chưa phát hiện, hoặc mô hình vũ trụ cần thêm một thành phần mới. Câu hỏi còn đang mở (tính tới 11/2026).',
    ],
    numbers: [
      { value: '67,4 ± 0,5', label: 'H₀ (km/s/Mpc) suy từ phông vi sóng, Planck 2018', source: 'Planck 2018' },
      { value: '73,04 ± 1,04', label: 'H₀ (km/s/Mpc) từ Cepheid và siêu tân tinh Ia, SH0ES 2022', source: 'Riess và cộng sự 2022, ApJL 934, L7' },
      { value: '~46 tỷ năm ánh sáng', label: 'bán kính vũ trụ quan sát được hôm nay — lớn hơn 13,8 tỷ năm ánh sáng vì không gian giãn ra trong lúc ánh sáng đi', source: 'Tự tính, Planck 2018' },
    ],
    myths: [
      { myth: 'Thiên hà xa lùi nhanh hơn ánh sáng là trái với thuyết tương đối.', truth: 'Thuyết tương đối hẹp chỉ cấm một vật vượt tốc độ ánh sáng so với vật khác ở cùng một chỗ. Vận tốc lùi xa do không gian giãn không phải chuyển động xuyên qua không gian.' },
      { myth: 'Vũ trụ giãn nở nên Trái Đất, Hệ Mặt Trời và nguyên tử cũng giãn ra.', truth: 'Những hệ được giữ bằng hấp dẫn (thiên hà, nhóm thiên hà) hay lực điện từ (nguyên tử) giữ nguyên kích thước. Giãn nở chỉ thấy giữa các nhóm và đám thiên hà.' },
    ],
    khaoLuan: [{ label: 'Căng thẳng Hubble' }],
    sources: [
      { text: 'IAU (2018), iau1812 — IAU members vote to recommend renaming the Hubble law', url: 'https://www.iau.org/news/pressreleases/detail/iau1812/' },
      { text: 'Riess và cộng sự (2022), SH0ES, ApJL 934, L7', url: 'https://doi.org/10.3847/2041-8213/ac5c5b' },
      { text: 'Planck Collaboration (2018) — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
      { text: 'Tổng quan căng thẳng Hubble (2026) — arXiv:2606.20434', url: 'https://arxiv.org/abs/2606.20434' },
      { text: 'DESI DR2 — arXiv:2503.14738', url: 'https://arxiv.org/abs/2503.14738' },
    ],
  },

  /* ——— 8.4 ——— */
  'nang-luong-toi': {
    short: 'Thành phần chưa rõ bản chất khiến vũ trụ giãn nở ngày càng nhanh; chiếm khoảng 68 % tổng mật độ năng lượng hiện nay.',
    certainty: { level: 'strong', label: 'Giãn nở tăng tốc đã xác lập · bản chất năng lượng tối chưa biết' },
    definition: {
      vi: 'Vũ trụ gồm ba thành phần: vật chất thường hay vật chất nhìn thấy (5 %), vật chất tối (27 %) và năng lượng tối (68 %).',
      en: 'The universe is made up of three components: normal or visible matter (5%), dark matter (27%), and dark energy (68%).',
      source: 'NASA Science — Building blocks of the universe',
      url: 'https://science.nasa.gov/universe/overview/building-blocks/',
    },
    body: [
      'Năm 1998, hai nhóm nghiên cứu độc lập đo khoảng cách tới các [[sieu-tan-tinh-ia|siêu tân tinh loại Ia]] ở xa, mong đo được sự giãn nở đang chậm lại bao nhiêu do lực hút của vật chất. Kết quả ngược lại: những siêu tân tinh ấy mờ hơn dự đoán, tức ở xa hơn — giãn nở đang **tăng tốc**. Saul Perlmutter, Brian Schmidt và Adam Riess nhận giải Nobel Vật lý 2011.',
      'Thứ đẩy nhanh giãn nở được gọi là **năng lượng tối** (dark energy). Cách mô tả đơn giản nhất là **hằng số vũ trụ** $\\Lambda$ mà Einstein từng thêm vào phương trình năm 1917: một mật độ năng lượng gắn với chính không gian, không loãng đi khi không gian giãn ra. Mật độ của nó rất nhỏ — khoảng 6 × 10⁻²⁷ kg/m³, tương đương 3–4 nguyên tử hydro trong mỗi mét khối — nhưng có mặt ở khắp nơi. Khoảng 6 tỷ năm trước, khi vật chất đã đủ loãng, tác dụng đẩy của năng lượng tối bắt đầu vượt lực hút của vật chất và giãn nở chuyển từ chậm dần sang nhanh dần.',
    ],
    viz: {
      module: 'scale-factor', height: 420, mobileHeight: 360,
      caption: 'Kích thước tương đối của vũ trụ theo thời gian, tích phân phương trình Friedmann với lượng vật chất Ωm = 0,31 (Planck 2018) và lượng năng lượng tối chỉnh được. Không có năng lượng tối, đường cong luôn cong xuống (giãn nở chậm dần); với lượng đo được, nó cong lên từ khoảng 6 tỷ năm trước.',
    },
    after: [
      'Năng lượng tối là gì thì chưa ai biết. Năm 2025, bản đồ ba chiều của DESI (Dark Energy Spectroscopic Instrument) gợi ý năng lượng tối có thể đang yếu dần theo thời gian thay vì là một hằng số — ở mức 2,8–4,2σ tuỳ tổ hợp dữ liệu, chưa đạt ngưỡng phát hiện, và một số nhà khoa học cho rằng kết quả nhạy với sai số của mẫu siêu tân tinh. Kính thiên văn không gian Euclid của ESA và các bản dữ liệu sau của DESI sẽ kiểm tra điều này (tính tới 11/2026).',
    ],
    numbers: [
      { value: '~68 %', label: 'phần năng lượng tối trong tổng mật độ năng lượng hiện nay (Ω_Λ ≈ 0,685)', source: 'NASA; Planck 2018' },
      { value: '~6 tỷ năm trước', label: 'giãn nở bắt đầu tăng tốc (z ≈ 0,63)', source: 'Tự tính từ Ωm, Ω_Λ của Planck 2018' },
      { value: '1998 / 2011', label: 'phát hiện giãn nở tăng tốc / giải Nobel Vật lý', source: 'nobelprize.org' },
    ],
    myths: [
      { myth: 'Năng lượng tối và vật chất tối là một thứ.', truth: 'Vật chất tối hút và gom vật chất thành cấu trúc; năng lượng tối phân bố đều và làm giãn nở tăng tốc. Hai thứ có tác dụng ngược nhau.' },
      { myth: 'DESI đã chứng minh năng lượng tối thay đổi theo thời gian.', truth: 'Đó mới là một dấu hiệu chưa đạt ngưỡng phát hiện 5σ và phụ thuộc tổ hợp dữ liệu; câu hỏi còn đang tranh luận.' },
    ],
    khaoLuan: [{ label: 'Năng lượng tối là gì?' }, { label: 'Số phận cuối cùng của vũ trụ' }],
    sources: [
      { text: 'NASA Science — Building blocks', url: 'https://science.nasa.gov/universe/overview/building-blocks/' },
      { text: 'Giải Nobel Vật lý 2011 — Perlmutter, Schmidt, Riess', url: 'https://www.nobelprize.org/prizes/physics/2011/' },
      { text: 'DESI Collaboration (2025), DR2 BAO — arXiv:2503.14738', url: 'https://arxiv.org/abs/2503.14738' },
      { text: 'ESA — Euclid DR1 timeline', url: 'https://www.cosmos.esa.int/web/euclid/dr1-timeline' },
      { text: 'Planck Collaboration (2018) — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
    ],
  },
};
