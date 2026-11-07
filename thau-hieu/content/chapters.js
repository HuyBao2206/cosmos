// Danh mục chương và khái niệm của "Thấu hiểu vũ trụ".
// - status: 'ready' (đã biên soạn, có file content/chNN.js) | 'draft' (đang biên soạn: ngôi sao hiện mờ).
// - Mỗi khái niệm: id (dùng trong URL #k/<id>), title, en, short (định nghĩa 1 câu cho chú thích & tìm kiếm),
//   aka (từ khoá tìm kiếm thêm), links (id khái niệm liên quan — vẽ thành đường nối trên bản đồ).
// Thêm khái niệm mới: xem CLAUDE.md, mục "Web Thấu hiểu".

export const CHAPTERS = [
  {
    id: 'thuoc-do', num: 1, title: 'Thước đo vũ trụ', en: 'Measuring the cosmos', color: '#9fd4e8',
    question: 'Làm sao biết một ngôi sao cách ta bao xa?', status: 'ready',
    concepts: [
      { id: 'don-vi-thien-van', title: 'Đơn vị thiên văn', en: 'Astronomical unit', aka: ['au', 'ua', 'dvtv'], links: ['nam-anh-sang', 'thi-sai-parsec'] },
      { id: 'nam-anh-sang', title: 'Năm ánh sáng', en: 'Light-year', aka: ['ly', 'nam anh sang'], links: ['nhin-ve-qua-khu', 'thi-sai-parsec'] },
      { id: 'thi-sai-parsec', title: 'Thị sai và parsec', en: 'Parallax & parsec', aka: ['parsec', 'pc', 'thi sai', 'gaia'], links: ['cepheid'] },
      { id: 'cepheid', title: 'Sao biến quang Cepheid', en: 'Cepheid variables', aka: ['leavitt', 'chu ky do sang'], links: ['sieu-tan-tinh-ia'] },
      { id: 'sieu-tan-tinh-ia', title: 'Siêu tân tinh loại Ia', en: 'Type Ia supernovae', aka: ['ngon nen chuan', 'standard candle'], links: ['thang-khoang-cach'] },
      { id: 'thang-khoang-cach', title: 'Bậc thang khoảng cách vũ trụ', en: 'Cosmic distance ladder', aka: ['distance ladder', 'hang so hubble'], links: ['nhin-ve-qua-khu'] },
      { id: 'nhin-ve-qua-khu', title: 'Nhìn xa là nhìn về quá khứ', en: 'Lookback time', aka: ['lookback', 'thoi gian anh sang'], links: [] },
    ],
  },
  {
    id: 'anh-sang', num: 2, title: 'Ánh sáng, nguồn thông tin duy nhất', en: 'Light, the only messenger', color: '#f4e19c',
    question: 'Chỉ từ ánh sáng, ta biết được gì về một ngôi sao?', status: 'ready',
    concepts: [
      { id: 'pho-dien-tu', title: 'Phổ điện từ', en: 'Electromagnetic spectrum', aka: ['buoc song', 'tan so'], links: ['quang-pho'] },
      { id: 'quang-pho', title: 'Quang phổ và vạch hấp thụ', en: 'Spectra & absorption lines', aka: ['vach pho', 'fraunhofer'], links: ['dich-chuyen-do'] },
      { id: 'dich-chuyen-do', title: 'Dịch chuyển đỏ và dịch chuyển xanh', en: 'Redshift & blueshift', aka: ['doppler', 'redshift', 'z'], links: ['kinh-thien-van-khong-gian'] },
      { id: 'kinh-thien-van-khong-gian', title: 'Vì sao cần kính thiên văn ngoài không gian', en: 'Why space telescopes', aka: ['hubble', 'jwst', 'webb'], links: [] },
    ],
  },
  {
    id: 'hap-dan', num: 3, title: 'Lực hấp dẫn và chuyển động', en: 'Gravity & motion', color: '#8fb3ff',
    question: 'Vì sao các hành tinh không rơi vào Mặt Trời?', status: 'ready',
    concepts: [
      { id: 'dinh-luat-kepler', title: 'Ba định luật Kepler', en: "Kepler's laws", aka: ['kepler', 'quy dao elip'], links: ['van-vat-hap-dan'] },
      { id: 'van-vat-hap-dan', title: 'Định luật vạn vật hấp dẫn', en: 'Universal gravitation', aka: ['newton', 'hap dan'], links: ['van-toc-vu-tru', 'luc-thuy-trieu'] },
      { id: 'van-toc-vu-tru', title: 'Vận tốc vũ trụ cấp 1 và cấp 2', en: 'Orbital & escape velocity', aka: ['van toc thoat', 'escape velocity'], links: ['diem-lagrange'] },
      { id: 'luc-thuy-trieu', title: 'Lực thuỷ triều', en: 'Tidal force', aka: ['thuy trieu', 'tide'], links: ['diem-lagrange'] },
      { id: 'diem-lagrange', title: 'Điểm Lagrange', en: 'Lagrange points', aka: ['l1', 'l2', 'lagrange'], links: [] },
    ],
  },
  {
    id: 'khong-thoi-gian', num: 4, title: 'Không-thời gian', en: 'Spacetime', color: '#c4a8ff',
    question: 'Thời gian có trôi như nhau với mọi người không?', status: 'ready',
    concepts: [
      { id: 'tuong-doi-hep', title: 'Tương đối hẹp và giãn nở thời gian', en: 'Special relativity & time dilation', aka: ['einstein', 'gian no thoi gian'], links: ['tuong-doi-tong-quat'] },
      { id: 'tuong-doi-tong-quat', title: 'Thuyết tương đối tổng quát', en: 'General relativity', aka: ['khong thoi gian cong'], links: ['thau-kinh-hap-dan', 'song-hap-dan'] },
      { id: 'thau-kinh-hap-dan', title: 'Thấu kính hấp dẫn', en: 'Gravitational lensing', aka: ['lensing', 'vanh einstein'], links: [] },
      { id: 'song-hap-dan', title: 'Sóng hấp dẫn', en: 'Gravitational waves', aka: ['ligo', 'gw150914'], links: [] },
    ],
  },
  {
    id: 'doi-song-sao', num: 5, title: 'Đời sống của các ngôi sao', en: 'The lives of stars', color: '#ffb07c',
    question: 'Một ngôi sao sinh ra, sống và chết như thế nào?', status: 'ready',
    concepts: [
      { id: 'hinh-thanh-sao', title: 'Tinh vân và sự hình thành sao', en: 'Nebulae & star formation', aka: ['tinh van', 'dam may phan tu', 'tien sao'], links: ['tong-hop-hat-nhan'] },
      { id: 'tong-hop-hat-nhan', title: 'Phản ứng tổng hợp hạt nhân', en: 'Stellar nucleosynthesis', aka: ['nhiet hach', 'proton-proton', 'cno'], links: ['bieu-do-hr'] },
      { id: 'bieu-do-hr', title: 'Biểu đồ Hertzsprung–Russell', en: 'Hertzsprung–Russell diagram', aka: ['h-r', 'hr', 'day chinh'], links: ['sao-lun-trang', 'sao-neutron'] },
      { id: 'sao-lun-trang', title: 'Sao lùn trắng', en: 'White dwarf', aka: ['chandrasekhar', 'sirius b'], links: ['sieu-tan-tinh'] },
      { id: 'sao-neutron', title: 'Sao neutron và pulsar', en: 'Neutron stars & pulsars', aka: ['pulsar', 'sao xung'], links: ['sieu-tan-tinh'] },
      { id: 'sieu-tan-tinh', title: 'Siêu tân tinh', en: 'Supernova', aka: ['sn 1987a', 'con cua'], links: ['nguon-goc-nguyen-to'] },
      { id: 'nguon-goc-nguyen-to', title: 'Nguồn gốc các nguyên tố', en: 'Origin of the elements', aka: ['bui sao', 'kilonova', 'qua trinh r'], links: [] },
    ],
  },
  {
    id: 'ho-den', num: 6, title: 'Hố đen', en: 'Black holes', color: '#ff8fa8',
    question: 'Điều gì xảy ra khi vật chất bị nén đến mức ánh sáng không thoát ra được?', status: 'draft',
    concepts: [
      { id: 'chan-troi-su-kien', title: 'Chân trời sự kiện và bán kính Schwarzschild', en: 'Event horizon & Schwarzschild radius', aka: ['schwarzschild', 'event horizon'], links: ['dia-boi-tu'] },
      { id: 'dia-boi-tu', title: 'Đĩa bồi tụ', en: 'Accretion disk', aka: ['quasar', 'boi tu'], links: ['anh-ho-den'] },
      { id: 'anh-ho-den', title: 'Ảnh chụp hố đen M87* và Sgr A*', en: 'Imaging black holes', aka: ['eht', 'm87', 'sgr a'], links: [] },
    ],
  },
  {
    id: 'thien-ha', num: 7, title: 'Thiên hà và cấu trúc lớn', en: 'Galaxies & large-scale structure', color: '#a6e8b8',
    question: 'Chúng ta đang ở đâu trong vũ trụ?', status: 'draft',
    concepts: [
      { id: 'phan-loai-thien-ha', title: 'Các loại thiên hà', en: 'Galaxy types', aka: ['hubble tuning fork', 'xoan oc', 'elip'], links: ['ngan-ha'] },
      { id: 'ngan-ha', title: 'Ngân Hà và vị trí của Hệ Mặt Trời', en: 'The Milky Way', aka: ['milky way', 'dai ngan ha'], links: ['vat-chat-toi', 'nhom-sieu-dam'] },
      { id: 'vat-chat-toi', title: 'Vật chất tối', en: 'Dark matter', aka: ['dark matter', 'duong cong quay'], links: ['mang-luoi-vu-tru'] },
      { id: 'nhom-sieu-dam', title: 'Nhóm, đám và siêu đám thiên hà', en: 'Groups, clusters & superclusters', aka: ['laniakea', 'nhom dia phuong'], links: ['mang-luoi-vu-tru'] },
      { id: 'mang-luoi-vu-tru', title: 'Mạng lưới vũ trụ', en: 'Cosmic web', aka: ['cosmic web', 'khoang trong'], links: [] },
    ],
  },
  {
    id: 'lich-su', num: 8, title: 'Lịch sử vũ trụ', en: 'History of the universe', color: '#e8e4da',
    question: 'Vũ trụ bắt đầu từ đâu và đang đi về đâu?', status: 'draft',
    concepts: [
      { id: 'vu-no-lon', title: 'Vụ Nổ Lớn', en: 'Big Bang', aka: ['big bang'], links: ['phong-vi-song'] },
      { id: 'phong-vi-song', title: 'Bức xạ phông vi sóng vũ trụ', en: 'Cosmic microwave background', aka: ['cmb', 'phong vi song'], links: ['dinh-luat-hubble'] },
      { id: 'dinh-luat-hubble', title: 'Sự giãn nở và định luật Hubble–Lemaître', en: 'Hubble–Lemaître law', aka: ['hubble', 'lemaitre', 'h0'], links: ['nang-luong-toi'] },
      { id: 'nang-luong-toi', title: 'Năng lượng tối', en: 'Dark energy', aka: ['dark energy', 'gian no tang toc'], links: [] },
    ],
  },
  {
    id: 'su-song', num: 9, title: 'Hành tinh và sự sống', en: 'Planets & life', color: '#7fe0d4',
    question: 'Ngoài Trái Đất, sự sống có thể tồn tại ở đâu?', status: 'draft',
    concepts: [
      { id: 'ngoai-hanh-tinh', title: 'Ngoại hành tinh và cách phát hiện', en: 'Exoplanets', aka: ['exoplanet', 'quang trac', 'van toc xuyen tam'], links: ['vung-song-duoc'] },
      { id: 'vung-song-duoc', title: 'Vùng có thể sống được', en: 'Habitable zone', aka: ['goldilocks', 'habitable zone'], links: ['sinh-hoc-vu-tru'] },
      { id: 'sinh-hoc-vu-tru', title: 'Sinh học vũ trụ', en: 'Astrobiology', aka: ['astrobiology', 'dau hieu sinh hoc'], links: [] },
    ],
  },
];

/** Bảng tra nhanh: id khái niệm → { ...khái niệm, chapter } */
export const CONCEPTS = {};
for (const ch of CHAPTERS) for (const c of ch.concepts) CONCEPTS[c.id] = { ...c, chapter: ch };

export const chapterById = (id) => CHAPTERS.find((c) => c.id === id);
export const contentFile = (ch) => new URL(`./ch${String(ch.num).padStart(2, '0')}.js`, import.meta.url).href;
