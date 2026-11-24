// Hồ sơ 2 — Năng lượng tối là gì? Nguồn: research/kl-khu-vuc-toi.md §B, research/lich-su-vu-tru.md §4.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Khoảng 68 % mật độ năng lượng của vũ trụ là một thứ ta chỉ biết qua việc nó làm giãn nở tăng tốc.',
  certainty: { level: 'debated', label: 'Giãn nở tăng tốc: đã xác lập · bản chất: chưa biết · năng lượng tối biến đổi: đang tranh luận' },
  intro: [
    'Năm 1998, hai nhóm đo siêu tân tinh phát hiện vũ trụ đang giãn nở ngày càng nhanh. Thứ gây ra điều đó được đặt tên là [[nang-luong-toi|năng lượng tối]] — một cái tên cho điều chưa biết hơn là một lời giải thích.',
    'Câu hỏi then chốt hiện nay là: năng lượng tối có phải một hằng số — mật độ không đổi gắn với chính không gian — hay nó thay đổi theo thời gian? Từ năm 2024, dữ liệu của Thiết bị quang phổ năng lượng tối (Dark Energy Spectroscopic Instrument, DESI) gợi ý khả năng thứ hai, và tín hiệu ấy đang được kiểm tra kỹ.',
  ],
  known: [
    'Giãn nở đang tăng tốc: phát hiện bằng siêu tân tinh Ia (Nobel Vật lý 2011), xác nhận độc lập bằng dao động âm baryon (baryon acoustic oscillations, BAO) và phông vi sóng.',
    'Trong mô hình chuẩn ΛCDM, năng lượng tối chiếm khoảng 68 % mật độ năng lượng hiện nay; giãn nở bắt đầu tăng tốc khoảng 6 tỷ năm trước.',
    'Phương trình trạng thái của nó — tỉ số áp suất trên mật độ năng lượng, ký hiệu $w$ — gần với −1, đúng giá trị của một hằng số vũ trụ; dữ liệu hiện nay chưa cho thấy một cách chắc chắn rằng nó khác −1.',
  ],
  hypotheses: [
    {
      name: 'Hằng số vũ trụ', en: 'cosmological constant, Λ', level: 'strong',
      idea: 'Năng lượng của chính chân không: mỗi mét khối không gian mang một lượng năng lượng không đổi, nên không gian càng giãn thì tổng năng lượng tối càng lớn. Ứng với $w = -1$.',
      for: ['Là thành phần của mô hình chuẩn ΛCDM, khớp với hầu hết dữ liệu trong hơn hai thập niên.', 'Đơn giản nhất: chỉ một con số.'],
      against: ['“Vấn đề hằng số vũ trụ”: ước tính thô từ lý thuyết trường lượng tử cho năng lượng chân không lớn hơn giá trị quan sát tới khoảng 10¹²⁰ lần (con số phụ thuộc cách tính). Không ai biết vì sao nó lại nhỏ như vậy.'],
    },
    {
      name: 'Trường biến thiên', en: 'quintessence', level: 'speculative',
      idea: 'Năng lượng tối là một trường lấp đầy không gian, có mật độ thay đổi chậm theo thời gian; $w$ lớn hơn −1 một chút và đổi dần.',
      for: ['Dữ liệu DESI kết hợp phông vi sóng và siêu tân tinh hơi ưa một năng lượng tối biến đổi theo thời gian hơn hằng số vũ trụ, theo hướng đang yếu dần.'],
      against: ['Mức ưa chỉ 2,6–3,2σ trong các phân tích công bố 2026, dưới ngưỡng 5σ để tuyên bố phát hiện.', 'Khi hiệu chuẩn lại mẫu siêu tân tinh DES (DES-Dovekie), mức ý nghĩa giảm từ 4,2σ xuống 3,2σ; tác giả gọi đó là “chỉ một sự ưa yếu” (only a weak preference).'],
    },
    {
      name: 'Hấp dẫn thay đổi ở thang vũ trụ', en: 'modified gravity', level: 'speculative',
      idea: 'Không có năng lượng tối; thuyết tương đối tổng quát cần sửa ở khoảng cách hàng tỷ năm ánh sáng.',
      for: ['Có những phiên bản giải thích được tín hiệu của DESI.'],
      against: ['Sự kiện GW170817 cho thấy sóng hấp dẫn đi cùng tốc độ với ánh sáng, loại bỏ một lớp lớn các mô hình kiểu này.'],
    },
  ],
  viz: {
    module: '../../thau-hieu/js/viz/scale-factor.js', height: 420, mobileHeight: 360,
    caption: 'Kích thước tương đối của vũ trụ theo thời gian với các lượng năng lượng tối khác nhau (tích phân phương trình Friedmann, Ωm = 0,31). Năng lượng tối là thứ làm đường cong cong lên từ khoảng 6 tỷ năm trước.',
  },
  after: [
    'Dữ liệu từ năm 2024 tới 2026 cho thấy một điều quan trọng về cách khoa học vận hành: một tín hiệu 4σ có thể giảm xuống 3σ khi một bước hiệu chuẩn được làm lại. Đó là lý do ngưỡng 5σ và các phép đo độc lập quan trọng đến vậy.',
  ],
  next: [
    { when: 'đang chạy', name: 'DESI', what: 'Khảo sát nay được mô tả là 8 năm, khoảng 63 triệu phổ; bản dữ liệu DR3 chưa công bố (tính tới 11/2026).' },
    { when: 'từ 6/2026', name: 'Rubin LSST', what: 'Khảo sát bắt đầu đêm 29/6/2026: siêu tân tinh Ia và thấu kính yếu.' },
    { when: '6/2027', name: 'Euclid DR1 đầy đủ', what: 'Kết quả vũ trụ học đầu tiên; khi hoàn tất khảo sát, Euclid được dự báo đo $w$ tới khoảng 3 %.' },
    { when: 'sau 2026', name: 'Kính Nancy Grace Roman', what: 'Phóng 30/8/2026 (chưa xác nhận đã tới điểm L2, tính tới 21/11/2026); khảo sát siêu tân tinh và thấu kính yếu ở hồng ngoại.' },
  ],
  myths: [
    { myth: 'DESI đã chứng minh năng lượng tối đang yếu đi.', truth: 'Mức ý nghĩa 2,6–4,2σ tuỳ tổ hợp dữ liệu và đã giảm khi hiệu chuẩn lại siêu tân tinh; câu hỏi còn đang tranh luận.' },
    { myth: 'Con số 10¹²⁰ là một phép đo.', truth: 'Đó là ước tính lý thuyết rất thô; những cách tính khác cho các con số khác. Điều chắc chắn chỉ là lý thuyết hiện nay không giải thích được giá trị đo được.' },
  ],
  sources: [
    { text: 'DESI Collaboration (2025), DR2 BAO — arXiv:2503.14738', url: 'https://arxiv.org/abs/2503.14738' },
    { text: 'DES-Dovekie (2025/2026), hiệu chuẩn lại DES-SN5YR — arXiv:2511.07517', url: 'https://arxiv.org/abs/2511.07517' },
    { text: 'Union3.1/UNITY1.8 (2026) — arXiv:2601.19854', url: 'https://arxiv.org/abs/2601.19854' },
    { text: 'DESI DR2 Lyman-α Alcock–Paczyński (2026) — arXiv:2607.27410', url: 'https://arxiv.org/abs/2607.27410' },
    { text: 'S. M. Carroll (1992), The cosmological constant, ARA&A 30, 499 (bản NED)', url: 'https://ned.ipac.caltech.edu/level5/Carroll/Carroll2.html' },
    { text: 'S. Weinberg (1989), The cosmological constant problem, Rev. Mod. Phys. 61, 1', url: 'https://doi.org/10.1103/RevModPhys.61.1' },
    { text: 'Euclid — dự báo đo w (arXiv:2211.08913)', url: 'https://arxiv.org/abs/2211.08913' },
  ],
};
