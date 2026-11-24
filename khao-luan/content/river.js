// Dữ liệu "Dòng chảy của chắc chắn". Mỗi ý tưởng: các mốc [năm, mức, sự kiện].
// Mức ∈ refuted | speculative | debated | strong | established (xem questions.js#LEVELS).
// Mức tại một mốc là cách tóm lược của ban biên tập cho vị thế của ý tưởng trong cộng đồng khoa học sau sự kiện đó,
// dựa trên các mốc có nguồn trong research/kl-*.md, research/lich-su-vu-tru.md, research/khong-thoi-gian.md, research/ho-den.md.
// Mốc có cùng mức với mốc trước chỉ để ghi sự kiện (đốm không di chuyển).
// q: id hồ sơ câu hỏi mở liên quan (bấm đốm để mở).

export const YEAR_MIN = 1900, YEAR_MAX = 2026;

export const IDEAS = [
  {
    id: 'vu-tru-tinh', name: 'Vũ trụ tĩnh, vĩnh cửu', short: 'Vũ trụ tĩnh', color: '#c9c2b2',
    keys: [
      [1900, 'strong', 'quan niệm mặc nhiên: vũ trụ không đổi theo thời gian.'],
      [1917, 'strong', 'Einstein thêm hằng số vũ trụ vào phương trình để giữ vũ trụ đứng yên.'],
      [1929, 'debated', 'Hubble công bố quan hệ vận tốc – khoảng cách của các thiên hà.'],
      [1931, 'refuted', 'Einstein từ bỏ mô hình vũ trụ tĩnh.'],
    ],
  },
  {
    id: 'vu-no-lon', name: 'Vụ Nổ Lớn', short: 'Vụ Nổ Lớn', color: '#ffb07c', q: 'truoc-vu-no-lon',
    keys: [
      [1927, 'speculative', 'Lemaître suy ra vũ trụ giãn nở từ thuyết tương đối tổng quát.'],
      [1931, 'speculative', 'Lemaître đề xuất vũ trụ bắt đầu từ một “nguyên tử nguyên thuỷ”.'],
      [1948, 'debated', 'Alpher và Gamow tính tổng hợp hạt nhân nguyên thuỷ; Alpher và Herman dự đoán bức xạ nền còn lại khoảng 5 K.'],
      [1965, 'established', 'Penzias và Wilson công bố bức xạ phông vi sóng; đa số giới khoa học chấp nhận mô hình Vụ Nổ Lớn.'],
      [1992, 'established', 'COBE: phổ vật đen gần hoàn hảo (1990) và các gợn nhiệt độ cỡ 10⁻⁵ (1992).'],
    ],
  },
  {
    id: 'trang-thai-dung', name: 'Thuyết Trạng thái dừng', short: 'Trạng thái dừng', color: '#d9a7c7',
    keys: [
      [1948, 'debated', 'Bondi, Gold và Hoyle đề xuất vũ trụ giãn nở nhưng luôn giống nhau, vật chất mới sinh liên tục.'],
      [1961, 'debated', 'Đếm nguồn vô tuyến cho thấy vũ trụ xưa khác vũ trụ nay.'],
      [1965, 'refuted', 'Phông vi sóng không giải thích được nếu không có quá khứ nóng, đặc.'],
    ],
  },
  {
    id: 'vat-chat-toi', name: 'Vật chất tối tồn tại', short: 'Vật chất tối', color: '#b79be6', q: 'vat-chat-toi',
    keys: [
      [1933, 'speculative', 'Zwicky thấy các thiên hà trong đám Coma chuyển động quá nhanh.'],
      [1970, 'debated', 'Rubin và Ford đo đường cong quay của Andromeda.'],
      [1980, 'strong', 'Đường cong quay phẳng ở hàng chục thiên hà xoắn ốc.'],
      [2006, 'established', 'Đám Viên Đạn: khối lượng tách khỏi khí nóng; cùng phông vi sóng chốt tỉ lệ vật chất tối.'],
    ],
  },
  {
    id: 'macho', name: 'Vật chất tối là thiên thể tối (MACHO)', short: 'MACHO', color: '#9c8fb8', q: 'vat-chat-toi',
    keys: [
      [1986, 'speculative', 'Paczyński đề xuất tìm thiên thể tối bằng vi thấu kính hấp dẫn.'],
      [1993, 'debated', 'Các khảo sát MACHO, EROS ghi được những sự kiện vi thấu kính đầu tiên.'],
      [2007, 'refuted', 'EROS-2 và các khảo sát khác: thiên thể tối chỉ có thể là một phần nhỏ của quầng vật chất tối.'],
    ],
  },
  {
    id: 'wimp', name: 'Vật chất tối là hạt mới (WIMP, axion…)', short: 'Hạt tối', color: '#8f7fe0', q: 'vat-chat-toi',
    keys: [
      [1977, 'speculative', 'Lee và Weinberg tính mật độ còn lại của một hạt nặng tương tác yếu; Peccei và Quinn đề xuất cơ chế dẫn tới axion (1977–1978).'],
      [2003, 'debated', 'WMAP cùng các khảo sát thiên hà chốt mô hình vật chất tối lạnh, không phải baryon; hạt mới trở thành lời giải được nhiều người theo nhất.'],
      [2025, 'debated', 'Máy dò LZ: chưa thấy WIMP sau 417 ngày dữ liệu; vùng tham số còn lại thu hẹp dần.'],
      [2026, 'debated', 'LZ báo cáo một sự kiện ở mức 2,6σ — chưa phải phát hiện.'],
    ],
  },
  {
    id: 'mond', name: 'Sửa định luật hấp dẫn (MOND)', short: 'MOND', color: '#e0a3d8', q: 'vat-chat-toi',
    keys: [
      [1983, 'speculative', 'Milgrom đề xuất sửa định luật động lực ở gia tốc rất nhỏ.'],
      [2006, 'speculative', 'Đám Viên Đạn gây khó cho các mô hình không có vật chất tối.'],
      [2024, 'speculative', 'Phép thử bằng sao đôi rộng của Gaia: các nhóm phân tích cùng dữ liệu ra kết luận ngược nhau.'],
    ],
  },
  {
    id: 'tang-toc', name: 'Giãn nở tăng tốc (năng lượng tối)', short: 'Năng lượng tối', color: '#9fb6ff', q: 'nang-luong-toi',
    keys: [
      [1998, 'debated', 'Hai nhóm đo siêu tân tinh Ia: vũ trụ giãn nở ngày càng nhanh.'],
      [2003, 'strong', 'WMAP kết hợp siêu tân tinh: vũ trụ phẳng, khoảng 70 % là năng lượng tối.'],
      [2011, 'established', 'Giải Nobel Vật lý; dao động âm baryon (phát hiện 2005) và phông vi sóng đã xác nhận độc lập.'],
    ],
  },
  {
    id: 'nl-toi-bien-doi', name: 'Năng lượng tối thay đổi theo thời gian', short: 'NLT biến đổi', color: '#7fa0f0', q: 'nang-luong-toi',
    keys: [
      [2024, 'speculative', 'DESI DR1 gợi ý năng lượng tối có thể không phải hằng số.'],
      [2025, 'debated', 'DESI DR2: mức 2,8–4,2σ tuỳ tổ hợp dữ liệu.'],
      [2026, 'debated', 'Hiệu chuẩn lại siêu tân tinh DES: mức ý nghĩa giảm từ 4,2σ xuống 3,2σ; các phân tích 2026 cho 2,6–3,2σ.'],
    ],
  },
  {
    id: 'lam-phat', name: 'Lạm phát vũ trụ', short: 'Lạm phát', color: '#ffd27a', q: 'truoc-vu-no-lon',
    keys: [
      [1981, 'speculative', 'Guth đề xuất một giai đoạn giãn nở cực nhanh ở thời điểm rất sớm.'],
      [1992, 'debated', 'COBE thấy các gợn nhiệt độ phù hợp dự đoán.'],
      [2013, 'strong', 'Planck: phổ gợn gần bất biến thang nhưng không hoàn toàn (n_s ≈ 0,960), vũ trụ rất phẳng.'],
      [2014, 'strong', 'BICEP2 công bố dấu vết sóng hấp dẫn nguyên thuỷ — về sau được xác định là do bụi.'],
    ],
  },
  {
    id: 'da-vu-tru', name: 'Đa vũ trụ', short: 'Đa vũ trụ', color: '#f0a0a0', q: 'truoc-vu-no-lon',
    keys: [
      [1986, 'speculative', 'Lạm phát vĩnh cửu (Linde, Vilenkin) gợi ý vô số “vũ trụ bong bóng”.'],
    ],
  },
  {
    id: 'ho-den', name: 'Hố đen tồn tại', short: 'Hố đen', color: '#c4a8ff', q: 'ben-trong-ho-den',
    keys: [
      [1916, 'speculative', 'Schwarzschild tìm ra lời giải có “bán kính đặc biệt”.'],
      [1939, 'speculative', 'Oppenheimer và Snyder: sao đủ nặng co sụp không giới hạn.'],
      [1972, 'debated', 'Cygnus X-1: một vật đặc quá nặng để là sao neutron.'],
      [1973, 'strong', 'Cuối năm 1973, cộng đồng thiên văn nói chung chấp nhận Cygnus X-1 là hố đen.'],
      [2016, 'established', 'LIGO ghi sóng hấp dẫn từ hai hố đen hợp nhất; EHT chụp bóng M87* năm 2019.'],
    ],
  },
  {
    id: 'song-hap-dan', name: 'Sóng hấp dẫn', short: 'Sóng hấp dẫn', color: '#a6c8ff',
    keys: [
      [1916, 'speculative', 'Einstein dự đoán từ thuyết tương đối tổng quát.'],
      [1979, 'strong', 'Pulsar đôi Hulse–Taylor co quỹ đạo đúng như mất năng lượng vì sóng hấp dẫn.'],
      [2016, 'established', 'LIGO công bố ghi nhận trực tiếp GW150914.'],
    ],
  },
  {
    id: 'hawking', name: 'Bức xạ Hawking', short: 'Bức xạ Hawking', color: '#e6c2ff', q: 'ben-trong-ho-den',
    keys: [
      [1974, 'speculative', 'Hawking tính ra hố đen phát bức xạ nhiệt do hiệu ứng lượng tử.'],
      [2019, 'strong', 'Trong hệ tương tự bằng chất ngưng tụ Bose–Einstein, phổ nhiệt đo được đúng dự đoán; vẫn chưa quan sát ở hố đen thật.'],
    ],
  },
  {
    id: 'ngoai-hanh-tinh', name: 'Hành tinh quanh sao khác', short: 'Ngoại hành tinh', color: '#7fe0d4', q: 'co-don',
    keys: [
      [1900, 'speculative', 'Chưa có cách nào phát hiện.'],
      [1992, 'strong', 'Hành tinh quanh pulsar PSR B1257+12.'],
      [1995, 'established', '51 Pegasi b, hành tinh đầu tiên quanh một sao giống Mặt Trời.'],
    ],
  },
  {
    id: 'kenh-dao-sao-hoa', name: 'Kênh đào trên Sao Hoả', short: 'Kênh đào Sao Hoả', color: '#d9805a', q: 'co-don',
    keys: [
      [1900, 'speculative', 'Percival Lowell cho rằng các đường thẳng trên Sao Hoả là kênh đào nhân tạo; nhiều nhà thiên văn khác không thấy chúng.'],
      [1965, 'speculative', 'Ảnh của Mariner 4: bề mặt đầy hố va chạm, không có kênh đào.'],
      [1971, 'refuted', 'Mariner 9 lập bản đồ toàn bề mặt: không có mạng kênh; “kênh đào” là ảo giác quang học.'],
    ],
  },
  {
    id: 'su-song-ngoai', name: 'Sự sống ngoài Trái Đất', short: 'Sự sống khác', color: '#a6e8b8', q: 'co-don',
    keys: [
      [1900, 'speculative', 'Chưa có cách nào kiểm chứng.'],
      [1996, 'speculative', 'Thiên thạch ALH84001: dấu vết được cho là vi sinh vật — đa số nhà khoa học không chấp nhận.'],
      [2025, 'speculative', 'K2-18 b và mẫu đá Cheyava Falls: ứng viên, vẫn đang tranh luận; chưa có bằng chứng được chấp nhận.'],
    ],
  },
];
