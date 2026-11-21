// Chương 6 — Hố đen. Dữ kiện & nguồn: research/ho-den.md (và doi-song-cac-ngoi-sao.md cho nguồn gốc hố đen sao).
// Cú pháp chữ: xem đầu file js/text.js. Cấu trúc thẻ: xem js/card.js (openConcept).

export const UPDATED = '11/2026';

const IAU_OAE = 'IAU Office of Astronomy for Education — Bảng thuật ngữ (CC BY 4.0)';

export const CHAPTER = {
  intro: [
    'Hố đen không phát ra ánh sáng, vậy mà ta biết khối lượng của hố đen ở tâm Ngân Hà tới hai chữ số có nghĩa và đã có ảnh của bóng tối nó in lên nền sáng. Mọi hiểu biết về hố đen đến từ dấu vết nó để lại trên vật chất và ánh sáng xung quanh: quỹ đạo của những ngôi sao bên cạnh, bức xạ của khí bị nung nóng trước khi rơi vào, sóng hấp dẫn khi hai hố đen hợp nhất.',
    'Chương này đi từ hình học (chân trời lớn cỡ nào, ánh sáng đi vòng ở đâu) tới những nguồn sáng mạnh nhất vũ trụ (đĩa bồi tụ, chuẩn tinh) và cuối cùng là hai bức ảnh do Kính thiên văn Chân trời Sự kiện chụp.',
  ],
  diagram: {
    nodes: [
      { id: 'sieu-tan-tinh', x: 8, y: 10 },
      { id: 'song-hap-dan', x: 8, y: 48 },
      { id: 'chan-troi-su-kien', x: 34, y: 28, big: true },
      { id: 'dia-boi-tu', x: 62, y: 14, big: true },
      { id: 'quasar-ext', x: 90, y: 8, label: 'Chuẩn tinh, tia phản lực' },
      { id: 'anh-ho-den', x: 64, y: 48, big: true },
      { id: 'tuong-doi-tong-quat', x: 92, y: 50 },
    ],
    edges: [
      ['sieu-tan-tinh', 'chan-troi-su-kien', 'sao nặng sụp lõi'],
      ['song-hap-dan', 'chan-troi-su-kien', 'hố đen hợp nhất'],
      ['chan-troi-su-kien', 'dia-boi-tu', 'khí rơi vào xoáy tròn'],
      ['dia-boi-tu', 'quasar-ext', 'sáng nhất vũ trụ'],
      ['chan-troi-su-kien', 'anh-ho-den', 'bóng ≈ 2,6 r_s'],
      ['tuong-doi-tong-quat', 'anh-ho-den', 'ánh sáng bị bẻ'],
    ],
  },
  sources: [
    { text: `${IAU_OAE}: Black Hole`, url: 'https://www.astro4edu.org/resources/glossary/term/43/' },
    { text: 'ESO (2019), eso1907 — ảnh đầu tiên của một hố đen', url: 'https://www.eso.org/public/news/eso1907/' },
    { text: 'Giải Nobel Vật lý 2020', url: 'https://www.nobelprize.org/prizes/physics/2020/summary/' },
    { text: 'Narayan, Johnson & Gammie (2019), The shadow of a spherically accreting black hole — arXiv:1910.02957', url: 'https://arxiv.org/abs/1910.02957' },
  ],
};

export const CONCEPTS = {
  /* ——— 6.1 ——— */
  'chan-troi-su-kien': {
    short: 'Ranh giới quanh hố đen mà bên trong nó không gì, kể cả ánh sáng, thoát ra được; với hố đen không quay, bán kính là r_s = 2GM/c².',
    certainty: { level: 'established', label: 'Đã xác lập · bên trong chân trời là vùng lý thuyết chưa kiểm chứng' },
    definition: {
      vi: 'Hố đen là một vùng không gian nơi lực hấp dẫn lớn đến mức không gì, kể cả ánh sáng, thoát ra được. Ranh giới ngoài của hố đen được gọi là chân trời sự kiện.',
      en: 'A black hole is a region of space where the gravitational force is so large that nothing, not even light, can escape from it. … The outer boundary of a black hole is known as the event horizon.',
      source: `${IAU_OAE}: Black Hole`,
      url: 'https://www.astro4edu.org/resources/glossary/term/43/',
    },
    body: [
      'Ý tưởng có từ năm 1783: John Michell lập luận rằng một ngôi sao đủ nặng và đủ nhỏ sẽ có vận tốc thoát lớn hơn tốc độ ánh sáng, nên ánh sáng của nó “không thể tới được chúng ta”. Lời giải chính xác đến từ thuyết tương đối tổng quát: chỉ vài tuần sau khi Einstein công bố phương trình trường, Karl Schwarzschild — khi đang ở mặt trận phía Đông trong Thế chiến I — gửi cho ông lời giải cho một khối cầu không quay (thư đề ngày 22/12/1915, công bố năm 1916). Lời giải chứa một bán kính đặc biệt, nay gọi là **bán kính Schwarzschild** (Schwarzschild radius).',
      'Ở bán kính ấy là **chân trời sự kiện** (event horizon): đi vào thì không có đường ra, vì mọi hướng trong tương lai đều dẫn vào trong. Chân trời không phải một bề mặt vật chất; người rơi qua sẽ không thấy gì đặc biệt tại đó. Bán kính tỉ lệ thuận với khối lượng: khoảng 3 km cho mỗi khối lượng Mặt Trời. Nén Trái Đất lại thành hố đen thì nó chỉ còn cỡ một viên bi, đường kính chưa tới 2 cm.',
      'Quanh chân trời của một hố đen không quay có thêm hai vòng đặc trưng. Ở 1,5 lần bán kính Schwarzschild là **quả cầu photon** (photon sphere), nơi ánh sáng có thể chạy vòng quanh hố đen trên những quỹ đạo không bền. Ở 3 lần là **quỹ đạo tròn bền trong cùng** (innermost stable circular orbit, ISCO): vật chất đi vào trong vòng này không còn quỹ đạo ổn định và nhanh chóng lao vào hố đen. Mép trong của [[dia-boi-tu|đĩa bồi tụ]] nằm ở đây.',
    ],
    formulas: ['$$r_s = \\frac{2GM}{c^2} \\approx 2{,}95\\ \\text{km} \\times \\frac{M}{M_\\odot}$$'],
    symbols: [
      ['$r_s$', 'bán kính Schwarzschild — bán kính chân trời của hố đen không quay'],
      ['$M$', 'khối lượng hố đen; $M_\\odot$ là khối lượng Mặt Trời'],
      ['$G, c$', 'hằng số hấp dẫn và tốc độ ánh sáng'],
    ],
    viz: {
      module: 'schwarzschild', height: 440, mobileHeight: 360,
      caption: 'Kéo khối lượng từ Trái Đất tới M87*. Hình luôn vẽ theo đơn vị r_s nên các vòng giữ nguyên tỉ lệ: chân trời, quả cầu photon, bóng nhìn từ xa và quỹ đạo tròn bền trong cùng. Bảng số cho thấy hố đen càng nặng thì càng “loãng” và lực thuỷ triều ở chân trời càng nhỏ.',
    },
    after: [
      'Hố đen càng nặng, lực thuỷ triều ở chân trời càng yếu: lực kéo giãn tại đó tỉ lệ nghịch với bình phương khối lượng. Một người rơi vào hố đen 10 lần khối lượng Mặt Trời bị kéo dài như sợi mì (hiệu ứng kéo sợi mì, spaghettification) từ lâu trước khi tới chân trời, còn với hố đen 4,3 triệu khối lượng Mặt Trời ở tâm Ngân Hà, người đó vượt qua chân trời mà không bị xé; mô phỏng của NASA (2024) cho thấy việc bị kéo sợi mì chỉ xảy ra khoảng 12,8 giây sau đó. Hố đen gần Trái Đất nhất đã biết là Gaia BH1, khoảng 9,6 lần khối lượng Mặt Trời, cách khoảng 1 560 năm ánh sáng (tính tới 11/2026).',
    ],
    numbers: [
      { value: '2,95 km', label: 'bán kính Schwarzschild của một hố đen có khối lượng bằng Mặt Trời', source: 'Tính từ 2GM☉/c²' },
      { value: '8,9 mm', label: 'bán kính Trái Đất nếu bị nén thành hố đen', source: 'Tính từ 2GM⊕/c²' },
      { value: '21,2 M☉', label: 'Cygnus X-1, hố đen đầu tiên được thừa nhận rộng rãi (khối lượng đo lại năm 2021)', source: 'Miller-Jones và cộng sự 2021, Science' },
    ],
    myths: [
      { myth: 'Hố đen hút mọi thứ xung quanh như máy hút bụi.', truth: 'Ở xa, hố đen hút như mọi vật cùng khối lượng. Nếu Mặt Trời bị thay bằng một hố đen cùng khối lượng (bán kính khoảng 3 km), quỹ đạo Trái Đất không đổi; chỉ là không còn ánh sáng và nhiệt.' },
      { myth: 'Hố đen là một cái lỗ thủng trong không gian.', truth: 'Hố đen là một vật thể có khối lượng, có thể quay, có thể đo được. Chân trời sự kiện là một ranh giới, không phải miệng lỗ hay bề mặt vật chất.' },
    ],
    sources: [
      { text: `${IAU_OAE}: Black Hole`, url: 'https://www.astro4edu.org/resources/glossary/term/43/' },
      { text: 'APS News — November 27, 1783: John Michell anticipates black holes', url: 'https://www.aps.org/apsnews/2009/11/1783-john-michell-black-holes' },
      { text: 'Miller-Jones và cộng sự (2021), Cygnus X-1 contains a 21-solar mass black hole, Science 371 — arXiv:2102.09091', url: 'https://arxiv.org/abs/2102.09091' },
      { text: 'El-Badry và cộng sự (2022), Gaia BH1 — arXiv:2209.06833', url: 'https://arxiv.org/abs/2209.06833' },
      { text: 'NASA (2024) — New black hole visualization takes viewers beyond the brink', url: 'https://science.nasa.gov/universe/black-holes/supermassive-black-holes/new-nasa-black-hole-visualization-takes-viewers-beyond-the-brink/' },
    ],
  },

  /* ——— 6.2 ——— */
  'dia-boi-tu': {
    short: 'Đĩa khí xoáy quanh một vật đặc như hố đen; ma sát nung nó tới từ hàng trăm nghìn đến khoảng mười triệu kelvin, biến nó thành một trong những nguồn sáng mạnh nhất vũ trụ.',
    certainty: { level: 'established', label: 'Đã xác lập · chi tiết cơ chế tia phản lực còn nghiên cứu' },
    definition: {
      vi: 'Đĩa bồi tụ là đĩa khí và bụi quay tròn, hình thành khi vật chất rơi về một vật thể trung tâm nhưng không thể rơi thẳng xuống vì có mômen động lượng. Vật chất dần trôi vào trong, năng lượng giải phóng nung đĩa tới nhiệt độ rất cao.',
      source: `Diễn giải theo ${IAU_OAE}: Accretion Disk`,
      url: 'https://astro4edu.org/resources/glossary/term/426/',
      paraphrase: true,
    },
    body: [
      'Khí rơi về hố đen hiếm khi rơi thẳng: chỉ cần một chút chuyển động ngang, nó sẽ xoáy tròn như nước quanh lỗ thoát bồn rửa và dẹt lại thành đĩa. Các lớp bên trong quay nhanh hơn lớp ngoài, cọ xát vào nhau, mất năng lượng và trôi dần vào trong. Năng lượng đó toả ra dưới dạng bức xạ. Quanh một hố đen khối lượng sao, phần trong của đĩa nóng khoảng 10 triệu K và phát **tia X**; quanh hố đen siêu nặng, đĩa nguội hơn và sáng nhất ở **tử ngoại**.',
      'Đây là một trong những cách biến khối lượng thành năng lượng hiệu quả nhất trong tự nhiên. Phản ứng tổng hợp hydro thành heli trong [[tong-hop-hat-nhan|lòng sao]] chỉ giải phóng khoảng 0,7 % khối lượng. Khí trôi tới [[chan-troi-su-kien|quỹ đạo tròn bền trong cùng]] của một hố đen không quay đã toả ra khoảng 5,7 %; với hố đen quay nhanh, con số có thể trên 30 %, giới hạn lý thuyết 42 %. Vì thế vùng quanh vật tối nhất vũ trụ lại thuộc loại sáng nhất.',
    ],
    formulas: ['$$L = \\eta\\,\\dot{M} c^2, \\qquad \\eta_{\\text{Schwarzschild}} = 1 - \\sqrt{8/9} \\approx 5{,}7\\ \\%$$'],
    symbols: [
      ['$L$', 'công suất bức xạ'],
      ['$\\dot M$', 'tốc độ bồi tụ — khối lượng rơi vào mỗi giây'],
      ['$\\eta$', 'hiệu suất: phần khối lượng nghỉ biến thành bức xạ'],
    ],
    viz: {
      module: 'black-hole', height: 480, mobileHeight: 360,
      caption: 'Ảnh mô phỏng một hố đen không quay với đĩa bồi tụ mỏng, dựng bằng cách dò ngược từng tia sáng theo phương trình quỹ đạo photon trong hình học Schwarzschild. Phần đĩa phía sau hố đen hiện lên phía trên và phía dưới vì ánh sáng của nó bị bẻ cong vòng qua. Bên tiến về phía ta sáng hơn do hiệu ứng Doppler tương đối tính. Màu là màu giả theo nhiệt độ.',
    },
    after: [
      'Khi hố đen siêu nặng ở tâm một thiên hà được nuôi bằng nhiều khí, đĩa bồi tụ của nó có thể sáng hơn tất cả các ngôi sao của thiên hà chủ cộng lại: đó là **chuẩn tinh** (quasar). Năm 1963, Maarten Schmidt nhận ra các vạch phổ lạ của nguồn 3C 273 là vạch hydro bị [[dich-chuyen-do|dịch chuyển đỏ]] z = 0,158: một vật trông như ngôi sao nhưng ở rất xa ngoài Ngân Hà. Độ sáng của một nguồn bồi tụ ổn định bị chặn bởi **giới hạn Eddington** (Eddington limit), mức mà áp suất bức xạ đẩy ra cân bằng với lực hấp dẫn kéo vào; một số nguồn có thể vượt mức này trong thời gian ngắn. Một số hố đen còn phóng ra **tia phản lực tương đối tính** (relativistic jet) gần tốc độ ánh sáng từ vùng ngay bên ngoài chân trời; tia của M87 dài khoảng 5 000 năm ánh sáng ở ánh sáng khả kiến.',
    ],
    numbers: [
      { value: '5,7 % – 42 %', label: 'phần khối lượng biến thành năng lượng trong đĩa bồi tụ (hố đen không quay – quay cực đại); nhiệt hạch hydro thành heli chỉ 0,7 %', source: 'Tính từ ISCO; arXiv:1810.07032' },
      { value: '1,26 × 10³¹ W', label: 'giới hạn Eddington cho mỗi khối lượng Mặt Trời — khoảng 33 000 lần độ trưng Mặt Trời', source: 'Từ điển thiên văn, Đài thiên văn Paris' },
      { value: 'z = 0,158', label: 'chuẩn tinh 3C 273, chuẩn tinh đầu tiên được nhận ra (Schmidt, 1963)', source: 'Kellermann, arXiv:1304.3627' },
    ],
    myths: [
      { myth: 'Hố đen tối nên không thể là nguồn sáng.', truth: 'Hố đen không phát sáng, nhưng khí trong đĩa bồi tụ, trước khi vượt qua chân trời, là một trong những nguồn sáng mạnh nhất vũ trụ.' },
      { myth: 'Tia phản lực phun ra từ bên trong hố đen.', truth: 'Tia được phóng ra từ vùng bên ngoài chân trời, nhờ từ trường và chuyển động quay; không có gì thoát ra từ bên trong.' },
    ],
    khamPha: [],
    sources: [
      { text: `${IAU_OAE}: Accretion Disk`, url: 'https://astro4edu.org/resources/glossary/term/426/' },
      { text: `${IAU_OAE}: Quasar`, url: 'https://astro4edu.org/resources/glossary/term/268/' },
      { text: 'Hiệu suất bồi tụ Schwarzschild và Kerr — arXiv:1810.07032', url: 'https://arxiv.org/abs/1810.07032' },
      { text: 'K. Kellermann (2013), The discovery of quasars and its aftermath — arXiv:1304.3627', url: 'https://arxiv.org/abs/1304.3627' },
      { text: 'Đài thiên văn Paris — Etymological dictionary: Eddington limit', url: 'https://dictionary.obspm.fr/terms/eddington-limit/' },
      { text: 'Luminet (1979), Image of a spherical black hole with thin accretion disk, A&A 75, 228 — mô phỏng kinh điển', url: 'https://ui.adsabs.harvard.edu/abs/1979A%26A....75..228L' },
    ],
  },

  /* ——— 6.3 ——— */
  'anh-ho-den': {
    short: 'Hai bức ảnh của Kính thiên văn Chân trời Sự kiện (EHT): M87* (2019) và Sgr A* (2022) — một vành sáng bao quanh bóng tối của hố đen.',
    certainty: { level: 'established', label: 'Đã xác lập · kết quả EHT cập nhật tới 11/2026' },
    definition: {
      vi: 'Ảnh cho thấy một vành sáng hình thành khi ánh sáng bị bẻ cong trong trường hấp dẫn cực mạnh quanh một hố đen.',
      en: 'a bright ring formed as light bends in the intense gravity around a black hole',
      source: 'ESO, thông cáo eso1907 (10/4/2019)',
      url: 'https://www.eso.org/public/news/eso1907/',
    },
    body: [
      'Hố đen M87* ở tâm thiên hà M87 nặng 6,5 tỷ lần Mặt Trời nhưng cách ta khoảng 55 triệu năm ánh sáng; nhìn từ Trái Đất, vành sáng quanh nó có đường kính chỉ 42 micro giây cung (microarcsecond, μas) — cỡ một quả cam trên Mặt Trăng nhìn từ Trái Đất. Để phân giải được góc nhỏ như vậy ở bước sóng 1,3 mm, cần một kính thiên văn rộng cỡ Trái Đất. **Kính thiên văn Chân trời Sự kiện** (Event Horizon Telescope, EHT) làm điều đó bằng cách cho các kính thiên văn vô tuyến trên nhiều lục địa (tám kính trong đợt quan sát năm 2017) cùng quan sát, ghi dữ liệu với đồng hồ nguyên tử rồi ghép lại: kỹ thuật giao thoa kế đường đáy rất dài (very long baseline interferometry, VLBI).',
      'Thứ ta thấy không phải bản thân chân trời. Vùng tối ở giữa là **bóng** (shadow) của hố đen: những tia sáng đi qua gần hơn quả cầu photon đều bị nuốt, nên bán kính bóng khoảng 2,6 lần bán kính chân trời. Vành sáng là khí nóng phát sóng vô tuyến, bị hấp dẫn bẻ cong quanh bóng; phía khí chuyển động về phía ta sáng hơn. Kích thước vành phù hợp với dự đoán của thuyết tương đối tổng quát; với Sgr A*, phép thử này chặt hơn vì khối lượng đã được đo độc lập từ quỹ đạo các ngôi sao.',
    ],
    formulas: ['$$\\theta_{\\text{bóng}} = \\frac{2\\sqrt{27}\\,GM}{c^2 D} \\qquad \\theta_{\\text{kính}} \\approx \\frac{\\lambda}{D_{\\text{kính}}}$$'],
    symbols: [
      ['', 'Trái: đường kính góc của bóng hố đen khối lượng $M$ ở khoảng cách $D$; với M87* ra khoảng 40 micro giây cung, cùng cỡ vành đo được 42 ± 3. Phải: độ phân giải của một kính (hay một mạng kính) có kích thước $D_{\\text{kính}}$ ở bước sóng $\\lambda$.'],
    ],
    viz: {
      module: 'eht', height: 440, mobileHeight: 360,
      caption: 'Kéo khoảng cách xa nhất giữa các kính để thấy vành sáng dần hiện ra. Ảnh “thật” là một vành mô hình có kích thước đúng như đo được; ảnh quan sát là vành đó bị nhoè theo độ phân giải λ/D. Chỉ khi các kính cách nhau hàng nghìn km mới thấy được bóng tối ở giữa.',
    },
    after: [
      'Bức ảnh thứ hai, công bố ngày 12/5/2022, là Nhân Mã A* (Sagittarius A*, Sgr A*) ở tâm Ngân Hà: nhẹ hơn M87* khoảng 1 500 lần nhưng gần hơn khoảng 2 000 lần, nên vành của nó (khoảng 52 micro giây cung) trông gần bằng vành của M87*. Khối lượng của Sgr A*, khoảng 4,3 triệu lần Mặt Trời, đã được đo trước đó bằng cách theo dõi các ngôi sao quay quanh nó suốt ba thập niên — công trình mang về giải Nobel Vật lý 2020 cho Reinhard Genzel và Andrea Ghez. Sau đó EHT công bố ảnh phân cực cho thấy từ trường quanh cả hai hố đen (2021, 2024), ảnh M87* từ dữ liệu năm 2018 với vùng sáng nhất dịch khoảng 30° (công bố 1/2024), và sự đảo chiều phân cực của M87* năm 2021 (công bố 9/2025).',
    ],
    numbers: [
      { value: '42 ± 3 μas', label: 'đường kính vành sáng M87* (ảnh công bố 10/4/2019, dữ liệu 4/2017)', source: 'EHT, M87 Paper I' },
      { value: '51,8 ± 2,3 μas', label: 'đường kính vành sáng Sgr A* (công bố 12/5/2022)', source: 'EHT, Sgr A* Paper I' },
      { value: '1,3 mm', label: 'bước sóng quan sát; độ phân giải λ/D với D cỡ đường kính Trái Đất (12 700 km) ≈ 21 μas', source: 'EHT; tự tính' },
    ],
    myths: [
      { myth: 'Ảnh EHT chụp trực tiếp chân trời sự kiện.', truth: 'Vùng tối là bóng của hố đen, có bán kính khoảng 2,6 lần bán kính chân trời. Chân trời nằm bên trong và không thể thấy.' },
      { myth: 'Đó là một bức ảnh chụp một lần như máy ảnh thường.', truth: 'Ảnh được dựng lại bằng thuật toán từ dữ liệu giao thoa kế thưa, do nhiều nhóm độc lập làm bằng nhiều phương pháp, ở bước sóng vô tuyến 1,3 mm. Màu cam là màu giả.' },
    ],
    sources: [
      { text: 'ESO (2019), eso1907 — Astronomers capture first image of a black hole', url: 'https://www.eso.org/public/news/eso1907/' },
      { text: 'EHT Collaboration (2019), First M87 EHT results I — arXiv:1906.11238', url: 'https://arxiv.org/abs/1906.11238' },
      { text: 'EHT Collaboration (2022), First Sagittarius A* EHT results I, ApJL 930, L12', url: 'https://doi.org/10.3847/2041-8213/ac6736' },
      { text: 'EHT (2024) — M87 one year later', url: 'https://eventhorizontelescope.org/m87-one-year-later-catching-black-holes-turbulent-accretion-flow' },
      { text: 'EHT (2025) — New EHT images reveal unexpected polarization flips at M87*', url: 'https://eventhorizontelescope.org/new-eht-images-reveal-unexpected-polarization-flips-at-m87' },
      { text: 'Giải Nobel Vật lý 2020 — Penrose, Genzel, Ghez', url: 'https://www.nobelprize.org/prizes/physics/2020/summary/' },
    ],
  },
};
