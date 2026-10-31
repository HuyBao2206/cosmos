// Nội dung C3 — Các vị thần trên bầu trời: ba lớp tên gọi của mỗi thiên thể.
// Nguồn và mức độ chắc chắn: research/than-thoai-ky-hieu-ten-goi.md.
// glyph: đường SVG (hộp 100 × 100) vẽ lại ký hiệu thiên văn, dùng cho hiệu ứng tự vẽ nét.

export const GODS = [
  {
    id: 'sun', name: 'Mặt Trời', roman: 'Sol', greek: 'Helios', symbol: '☉', disk: 'sun',
    glyph: 'M50 20 A30 30 0 1 1 49.9 20 Z M50 47 A3 3 0 1 1 49.9 47 Z',
    myth: [
      'Người Hy Lạp hình dung Helios mỗi ngày đánh cỗ xe ngựa lửa băng qua bầu trời từ đông sang tây; người La Mã gọi vị thần tương ứng là Sol.',
      'Câu chuyện nổi tiếng nhất là của Phaethon, con trai Helios: chàng xin cầm cương cỗ xe một ngày, nhưng không điều khiển nổi bầy ngựa, và cỗ xe lao xuống thiêu cháy mặt đất.',
    ],
    sym: [
      'Ký hiệu ☉ quen thuộc ngày nay, một vòng tròn có chấm ở tâm, chỉ phổ biến từ thời Phục Hưng.',
      'Trong các lá số Hy Lạp viết trên giấy cói, Mặt Trời được ký hiệu bằng một vòng tròn kèm một tia sáng.',
    ],
    east: { han: '太陽', hv: 'Thái Dương', text: ['Tên Hán Việt Thái Dương (太陽) nghĩa là "cực dương", đối xứng với Thái Âm của Mặt Trăng trong hệ âm dương.', 'Người Việt cũng gọi Mặt Trời là "ông Trời" trong ca dao, nhưng "Mặt Trời" vẫn là tên thông dụng.'] },
  },
  {
    id: 'moon', name: 'Mặt Trăng', roman: 'Luna', greek: 'Selene', symbol: '☽', disk: 'moon',
    glyph: 'M62 18 A34 34 0 1 0 62 82 A26 34 0 1 1 62 18 Z',
    myth: [
      'Selene, em gái của Helios, cưỡi ngựa hoặc đánh xe băng qua bầu trời đêm; người La Mã gọi nữ thần là Luna.',
      'Selene đem lòng yêu chàng chăn cừu Endymion, người chìm vào giấc ngủ vĩnh viễn. Các dị bản kể khác nhau: Zeus ban giấc ngủ ấy theo lời Selene, hoặc Endymion tự chọn để mãi trẻ.',
    ],
    sym: ['Hình lưỡi liềm ☽ là một trong những ký hiệu cổ nhất, đã có mặt trong các lá số Hy Lạp trên giấy cói. Hình dạng này mô tả trực tiếp điều người xem thấy trên bầu trời.'],
    east: { han: '太陰', hv: 'Thái Âm', text: ['Tên Hán Việt Thái Âm (太陰) nghĩa là "cực âm", cặp đôi với Thái Dương; ngoài ra còn có tên Nguyệt (月).', 'Âm lịch, lịch mà người Việt vẫn dùng cho lễ Tết, dựa trên chu kỳ tuần trăng khoảng 29,5 ngày.'] },
  },
  {
    id: 'mercury', name: 'Sao Thuỷ', roman: 'Mercurius', greek: 'Hermes', symbol: '☿', disk: 'mercury',
    glyph: 'M36 18 A14 12 0 0 0 64 18 M50 26 A14 14 0 1 1 49.9 26 Z M50 54 V86 M38 72 H62',
    myth: [
      'Sao Thuỷ mang tên Mercurius, sứ giả của các thần, tương ứng Hermes của Hy Lạp. Cách giải thích thường gặp là hành tinh này di chuyển nhanh nhất trên nền trời; đây là diễn giải về sau, không có văn bản cổ xác nhận lý do chọn tên.',
      'Theo Thánh ca Homer gửi Hermes, ngay ngày chào đời, Hermes đã trộm đàn bò của Apollo và lùa chúng đi giật lùi để xoá dấu. Chàng chế cây đàn lia từ mai rùa, rồi đổi cây đàn lấy đàn bò khi Apollo say mê tiếng nhạc.',
    ],
    sym: [
      'Cách hiểu phổ biến: ký hiệu ☿ là cây trượng caduceus của thần, với đôi cánh trên mũ ở phía trên.',
      'Bằng chứng lịch sử ủng hộ nguồn gốc từ cây trượng caduceus, nhưng nét gạch ngang ở chân chỉ được thêm vào sau thế kỷ 11; trong các giấy cói Hy Lạp tìm thấy ở Oxyrhynchus, ký hiệu không có nét này.',
    ],
    east: { han: '水星', hv: 'Thuỷ tinh', old: '辰星 · Thần tinh', element: 'Thuỷ', dir: 'Bắc', text: ['Trong thuyết Ngũ hành, Sao Thuỷ ứng với hành Thuỷ và phương Bắc. Tên cổ Thần tinh (辰星) thường được hiểu là "sao giờ".', 'Từ thời Hán, năm hành tinh nhìn thấy bằng mắt thường được gắn với năm hành; tên cổ vẫn được dùng song song trong sử sách nhiều thế kỷ.'] },
  },
  {
    id: 'venus', name: 'Sao Kim', roman: 'Venus', greek: 'Aphrodite', symbol: '♀', disk: 'venus',
    glyph: 'M50 16 A19 19 0 1 1 49.9 16 Z M50 54 V88 M37 73 H63',
    myth: [
      'Sao Kim là thiên thể sáng nhất bầu trời đêm sau Mặt Trăng và mang tên nữ thần tình yêu và sắc đẹp Venus, tương ứng Aphrodite. Người Hy Lạp xưa từng gọi nó bằng hai tên: Phosphoros khi là sao mai và Hesperos khi là sao hôm.',
      'Theo Thần phả (Theogony) của Hesiod, Aphrodite sinh ra từ bọt biển (aphros) sủi lên quanh phần cơ thể của thần Ouranos rơi xuống biển.',
    ],
    sym: [
      'Cách hiểu phổ biến: ký hiệu ♀ là chiếc gương cầm tay của nữ thần.',
      'Dạng ký hiệu có thể truy về các giấy cói Hy Lạp muộn, nhưng ở đó chưa có dấu chữ thập bên dưới; nguồn gốc thật của hình này chưa được xác lập. Thuyết cho rằng nó bắt nguồn từ chữ Φ của "Phosphoros" chưa có nguồn học thuật ủng hộ.',
    ],
    east: { han: '金星', hv: 'Kim tinh', old: '太白 · Thái Bạch', element: 'Kim', dir: 'Tây', text: ['Sao Kim ứng với hành Kim và phương Tây; tên cổ Thái Bạch (太白) nghĩa là "rất trắng".', 'Tiếng Việt có hai tên dân gian cho cùng một hành tinh: Sao Mai, khi nó mọc ở phía đông trước bình minh, và Sao Hôm, khi nó sáng ở phía tây sau hoàng hôn.'] },
  },
  {
    id: 'earth', name: 'Trái Đất', roman: 'Terra · Tellus', greek: 'Gaia', symbol: '🜨', disk: 'earth',
    glyph: 'M50 18 A32 32 0 1 1 49.9 18 Z M50 18 V82 M18 50 H82',
    myth: [
      'Trái Đất là hành tinh duy nhất không mang tên thần. Tên tiếng Anh "Earth" đến từ tiếng Anh cổ eorþe, gốc German nguyên thuỷ *erþō, đơn giản nghĩa là "đất"; tiếng Đức gọi là Erde.',
      'Gaia của Hy Lạp, Terra và Tellus của La Mã chỉ là những hình tượng gắn với đất. Theo Hesiod, Gaia xuất hiện ngay sau Hỗn mang (Chaos) và sinh ra Ouranos, bầu trời.',
    ],
    sym: [
      'Ký hiệu 🜨, một vòng tròn chia bốn, thường được giải thích là thế giới chia thành bốn phương. Biến thể ♁, quả cầu có chữ thập, bắt nguồn từ ký hiệu "thế giới" có từ trước thuyết nhật tâm.',
      'Ký hiệu Trái Đất vẫn được dùng trong khoa học, chẳng hạn khi viết khối lượng Trái Đất M🜨.',
    ],
    east: { han: '地球', hv: 'Địa cầu', element: null, text: ['Tên Hán Việt Địa cầu (地球) nghĩa là "quả cầu đất", còn "Trái Đất" là cách gọi thuần Việt.', 'Một chi tiết dễ nhầm: trong Ngũ hành, hành Thổ được gán cho Sao Thổ, không phải cho Trái Đất.'] },
  },
  {
    id: 'mars', name: 'Sao Hoả', roman: 'Mars', greek: 'Ares', symbol: '♂', disk: 'mars',
    glyph: 'M42 40 A20 20 0 1 1 41.9 40 Z M56 46 L80 22 M62 22 H80 V40',
    myth: [
      'Sao Hoả mang tên Mars, thần chiến tranh của La Mã, tương ứng Ares. Màu đỏ của hành tinh thường được nhắc tới như lý do; người Hy Lạp cổ đặt cho nó tên mô tả Pyroeis, "rực lửa".',
      'Với người La Mã, Mars là cha của cặp song sinh Romulus và Remus, những người lập ra thành Rome theo truyền thuyết.',
    ],
    sym: [
      'Cách hiểu phổ biến: ký hiệu ♂ là chiếc khiên và ngọn giáo của thần chiến tranh.',
      'Bằng chứng lịch sử cho ký hiệu này nghèo nàn nhất: dạng gốc trong các bản chép cổ không rõ ràng, có thể chỉ là một ngọn giáo. Thuyết "♂ bắt nguồn từ hai chữ Θρ của Thouros" không có nguồn học thuật xác nhận.',
    ],
    east: { han: '火星', hv: 'Hoả tinh', old: '熒惑 · Huỳnh Hoặc', element: 'Hoả', dir: 'Nam', text: ['Sao Hoả ứng với hành Hoả và phương Nam. Tên cổ Huỳnh Hoặc (熒惑) có nghĩa gần với "làm loá mắt và mê hoặc".', 'Độ sáng của Sao Hoả thay đổi mạnh và nó có lúc đi giật lùi trên nền sao, điều từng được xem là điềm báo trong chiêm tinh Trung Hoa.'] },
  },
  {
    id: 'jupiter', name: 'Sao Mộc', roman: 'Iuppiter', greek: 'Zeus', symbol: '♃', disk: 'jupiter',
    glyph: 'M28 34 C28 14 58 14 54 36 C51 52 36 62 26 68 H76 M62 44 V88',
    myth: [
      'Hành tinh sáng nổi bật mang tên vua các thần: Jupiter của La Mã, Zeus của Hy Lạp.',
      'Kronos nuốt từng đứa con vì lời tiên tri rằng ông sẽ bị con lật đổ. Rhea giấu Zeus ở đảo Crete và đưa cho Kronos một hòn đá quấn tã. Lớn lên, Zeus buộc cha nôn ra các anh chị và đánh bại ông.',
    ],
    sym: [
      'Cách hiểu phổ biến: ký hiệu ♃ là tia sét hoặc con đại bàng của Jupiter.',
      'Nghiên cứu giấy cói Hy Lạp (Jones, 1999) cho thấy ♃ bắt nguồn từ chữ Ζ (zeta), chữ cái đầu tên Zeus, có thêm một nét gạch: đây là một chữ viết tắt.',
    ],
    east: { han: '木星', hv: 'Mộc tinh', old: '歲星 · Tuế tinh', element: 'Mộc', dir: 'Đông', text: ['Sao Mộc ứng với hành Mộc và phương Đông. Tên cổ Tuế tinh (歲星) nghĩa là "sao năm".', 'Cách giải thích thường gặp: Sao Mộc đi hết một vòng trời trong khoảng 12 năm (chính xác là 11,86 năm), mỗi năm qua một phần mười hai, nên được dùng để đánh dấu năm.'] },
  },
  {
    id: 'saturn', name: 'Sao Thổ', roman: 'Saturnus', greek: 'Kronos', symbol: '♄', disk: 'saturn',
    glyph: 'M40 14 V66 M28 24 H54 M40 44 C50 32 70 38 63 56 C59 66 54 74 68 86',
    myth: [
      'Sao Thổ, hành tinh chuyển động chậm nhất trong số những hành tinh nhìn thấy bằng mắt thường, mang tên Saturnus, một vị thần cổ của Ý được đồng nhất với Kronos của Hy Lạp.',
      'Lễ hội Saturnalia của người La Mã quanh ngày đông chí tưởng nhớ "Thời đại Hoàng kim" khi Saturnus cai trị. Trong thần thoại Hy Lạp, Kronos là vị thần nuốt con mình.',
    ],
    sym: [
      'Cách hiểu phổ biến: ký hiệu ♄ là lưỡi liềm của thần nông nghiệp.',
      'Nghiên cứu giấy cói cho thấy ♄ là chữ lồng của hai chữ cái đầu ΚΡ (kappa, rho) trong tên Kronos, có thêm một nét gạch chéo.',
    ],
    east: { han: '土星', hv: 'Thổ tinh', old: '鎮星 · Trấn tinh', element: 'Thổ', dir: 'Trung tâm', text: ['Sao Thổ ứng với hành Thổ và vị trí trung tâm. Tên cổ Trấn tinh (鎮星), còn viết Điền tinh (填星).', 'Sao Thổ đi hết vòng trời trong khoảng 29,5 năm, chậm nhất trong năm hành tinh mà người xưa biết.'] },
  },
  {
    id: 'uranus', name: 'Sao Thiên Vương', roman: 'Uranus', greek: 'Ouranos', symbol: '♅', disk: 'uranus',
    glyph: 'M36 12 V42 M64 12 V42 M36 27 H64 M50 27 V58 M50 58 A13 13 0 1 1 49.9 58 Z M50 69 A2 2 0 1 1 49.9 69 Z',
    myth: [
      'Đây là trường hợp ngoại lệ: tên Uranus lấy từ thần Hy Lạp Ouranos, không phải từ một thần La Mã. William Herschel phát hiện hành tinh năm 1781 và muốn gọi nó là Georgium Sidus, "ngôi sao của George", để tôn vinh vua George III.',
      'Năm 1782, Johann Bode đề xuất tên Uranus để hợp với các hành tinh khác: Ouranos là cha của Kronos (Sao Thổ) và ông của Zeus (Sao Mộc). Theo Hesiod, chính Kronos đã lật đổ Ouranos.',
    ],
    sym: [
      'Có hai ký hiệu. ♅ do Jérôme Lalande đề xuất năm 1784: một quả cầu với chữ H của Herschel phía trên.',
      'Ký hiệu ⛢ do Johann Gottfried Köhler đề xuất năm 1782 theo yêu cầu của Bode, mượn ký hiệu giả kim của bạch kim. Ký hiệu này phổ biến hơn trong giới thiên văn, còn ♅ thường gặp trong chiêm tinh.',
    ],
    east: { han: '天王星', hv: 'Thiên Vương tinh', element: null, text: ['Không có trong Ngũ hành vì người xưa không nhìn thấy nó. Tên 天王星, "sao vua trời", là bản dịch nghĩa của Uranus.', 'Tên này xuất hiện trong các bản dịch thiên văn học phương Tây ở Trung Quốc thập niên 1850, rồi được phổ biến qua cuốn Đàm thiên (談天, 1859) của Alexander Wylie và Lý Thiện Lan; tiếng Việt, tiếng Nhật và tiếng Hàn đều dùng chung tên này.'] },
  },
  {
    id: 'neptune', name: 'Sao Hải Vương', roman: 'Neptunus', greek: 'Poseidon', symbol: '♆', disk: 'neptune',
    glyph: 'M50 22 V88 M38 76 H62 M28 20 C28 54 72 54 72 20 M50 14 L44 24 M50 14 L56 24',
    myth: [
      'Sao Hải Vương được phát hiện năm 1846 nhờ tính toán của Urbain Le Verrier. Nhiều tên được đề xuất, như Janus hay Oceanus; Le Verrier đề xuất Neptune, và cuối năm 1846 tên này được ủng hộ rộng rãi.',
      'Sau khi đánh bại các Titan, ba anh em Zeus, Poseidon và Hades chia nhau thế giới: Poseidon nhận biển cả, cùng cây đinh ba do các Cyclops rèn tặng.',
    ],
    sym: ['Ký hiệu ♆ là cây đinh ba của thần biển, do chính Le Verrier đề nghị cùng với tên gọi. Tài liệu Pháp thời đó còn dùng một ký hiệu khác: quả cầu với hai chữ LV của Le Verrier.'],
    east: { han: '海王星', hv: 'Hải Vương tinh', element: null, text: ['Tên 海王星, "sao vua biển", dịch nghĩa trực tiếp từ Neptune, xuất hiện cùng thời với tên Thiên Vương tinh.', 'Hai tên Thiên Vương và Hải Vương cho thấy cách Đông Á tiếp nhận hành tinh mới: không xếp vào Ngũ hành, mà dịch nghĩa tên vị thần phương Tây.'] },
  },
  {
    id: 'pluto', name: 'Sao Diêm Vương', roman: 'Pluto', greek: 'Hades · Plouton', symbol: '♇', disk: 'pluto', dwarf: true,
    glyph: 'M34 14 V86 M34 14 H52 C70 14 70 46 52 46 H34 M34 86 H68',
    myth: [
      'Năm 1930, sau khi Clyde Tombaugh phát hiện thiên thể mới ở Đài thiên văn Lowell, cô bé 11 tuổi Venetia Burney ở Oxford đề xuất tên Pluto, vị thần cõi âm. Tên được chọn một phần vì hai chữ đầu PL trùng chữ viết tắt của Percival Lowell, người sáng lập đài.',
      'Hades (Pluto) bắt Persephone xuống âm phủ làm vợ. Demeter, mẹ nàng, đau buồn khiến đất đai cằn cỗi, cho tới khi Zeus dàn xếp để Persephone trở lại mặt đất một phần của năm: người Hy Lạp dùng câu chuyện này giải thích các mùa.',
    ],
    sym: ['Ký hiệu ♇ là chữ lồng P–L, vừa là hai chữ đầu của Pluto vừa là chữ viết tắt tên Percival Lowell; nó được công bố cùng tên gọi ngày 1/5/1930. Giới chiêm tinh dùng một ký hiệu khác, ⯓, hình quả cầu trên cây chĩa hai của thần.'],
    east: { han: '冥王星', hv: 'Minh Vương tinh', element: null, text: ['Tên 冥王星, "sao vua cõi u minh", do nhà văn và nhà thiên văn nghiệp dư Nhật Bản Nojiri Hōei đề xuất năm 1930; tiếng Trung và tiếng Hàn dùng theo.', 'Tiếng Việt lại gọi là Diêm Vương, tức Diêm La, vua cõi âm trong Phật giáo: cùng một ý "vua cõi chết", nhưng chọn hình tượng quen thuộc hơn với người Việt.'] },
  },
];

export const GODS_SOURCES = [
  'A. Jones, <em>Astronomical Papyri from Oxyrhynchus</em>, Memoirs of the American Philosophical Society 233 (1999).',
  'O. Neugebauer & H. B. Van Hoesen, <em>Greek Horoscopes</em>, Memoirs of the American Philosophical Society 48 (1959).',
  'NASA Science, <a href="https://science.nasa.gov/resource/solar-system-symbols/">Solar System Symbols</a>; IAU Style Manual (G. A. Wilkins, 1989) khuyến nghị hạn chế dùng ký hiệu hành tinh.',
  'Hesiod, <em>Thần phả</em> (Theogony); <em>Thánh ca Homer gửi Hermes</em>; Pseudo-Apollodorus, <em>Bibliotheca</em>.',
  'Tư Mã Thiên, <em>Sử ký · Thiên quan thư</em> (天官書), <a href="https://ctext.org/shiji/tian-guan-shu/zh">bản trên ctext.org</a>; từ điển Hán điển, mục 五星.',
  'Sakai Y., tư liệu về đề xuất tên 冥王星 của Nojiri Hōei (Đại học Kyoto, 2012).',
  'Online Etymology Dictionary, mục <a href="https://www.etymonline.com/word/earth">earth</a>.',
  'Scientific American (2009) và EarthSky về việc Venetia Burney đặt tên Pluto.',
];
