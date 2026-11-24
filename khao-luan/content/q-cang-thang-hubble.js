// Hồ sơ 3 — Căng thẳng Hubble. Nguồn: research/kl-khu-vuc-toi.md §C, research/lich-su-vu-tru.md §3, research/thang-bac-vu-tru.md §9.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Hai cách đo cùng một con số, hai đáp số khác nhau — và chưa ai tìm ra lỗi.',
  certainty: { level: 'debated', label: 'Chênh lệch số liệu: có thật · nguyên nhân: đang tranh luận (11/2026)' },
  intro: [
    'Hằng số Hubble $H_0$ cho biết vũ trụ giãn nở nhanh tới đâu (xem [[dinh-luat-hubble]]). Có hai cách đo nó. Cách thứ nhất đọc kích thước các gợn trong [[phong-vi-song|phông vi sóng]] rồi dùng mô hình chuẩn để “chạy” tới hôm nay: được khoảng 67–68 km/s/Mpc. Cách thứ hai leo [[thang-khoang-cach|bậc thang khoảng cách]] — thị sai, [[cepheid|Cepheid]], siêu tân tinh Ia — để đo trực tiếp vũ trụ gần: được khoảng 73.',
    'Chênh lệch khoảng 8 % nghe nhỏ, nhưng sai số của mỗi bên chỉ khoảng 1 %. Tuỳ cách gộp dữ liệu, độ lệch là 4,5σ tới hơn 7σ — quá lớn để coi là ngẫu nhiên.',
  ],
  known: [
    'Các phép đo từ vũ trụ sớm (Planck, ACT, SPT, và DESI kết hợp tổng hợp hạt nhân, không cần phông vi sóng) cùng cho khoảng 66,7–68,5 km/s/Mpc.',
    'Thang khoảng cách dựa trên Cepheid cho khoảng 73 km/s/Mpc, với sai số khoảng 1 %.',
    'Năm 2024, Kính viễn vọng không gian James Webb (JWST) quan sát lại hơn 1 000 sao Cepheid và loại giả thuyết “ảnh Cepheid bị chồng lẫn chưa nhận ra” ở mức 8,2σ.',
  ],
  hypotheses: [
    {
      name: 'Sai số hệ thống trong thang khoảng cách', en: 'systematics', level: 'debated',
      idea: 'Một bước nào đó trên bậc thang — hiệu chuẩn sao, chọn mẫu siêu tân tinh — lệch một chút, đủ để đẩy kết quả lên.',
      for: ['Nhóm CCHP (Freedman, 2025) dùng một loại “ngọn nến” khác — đỉnh nhánh sao khổng lồ đỏ (tip of the red giant branch, TRGB) — và được 70,39 ± khoảng 1,9 km/s/Mpc, gần hơn với giá trị vũ trụ sớm.'],
      against: ['11 thiên hà chủ mà CCHP không chọn tự cho khoảng 74,1: kết quả phụ thuộc mạnh vào việc chọn mẫu.', 'Các phép đo không dùng Cepheid — maser nước (73,9 ± 3,0), thấu kính trễ thời gian TDCOSMO (71,6, sai số khoảng 4,5 %) — cũng nghiêng về phía cao, dù sai số lớn hơn.'],
    },
    {
      name: 'Năng lượng tối sớm', en: 'early dark energy', level: 'speculative',
      idea: 'Một dạng năng lượng tối xuất hiện thoáng qua trước khi phông vi sóng được phát ra, làm nhỏ chân trời âm thanh (sound horizon) — thang đo mà cách thứ nhất dựa vào.',
      for: ['Có thể nâng giá trị $H_0$ suy từ phông vi sóng; trong mô hình này độ lệch với SH0ES giảm xuống dưới 2σ (so với khoảng 6σ trong mô hình chuẩn).'],
      against: ['Dữ liệu ACT DR6 (2025) không ưa mô hình này hơn mô hình chuẩn.'],
    },
    {
      name: 'Thêm loại hạt nhẹ', en: 'extra relativistic species', level: 'speculative',
      idea: 'Một loại hạt nhẹ chưa biết trong vũ trụ sớm (giống neutrino) làm vũ trụ giãn nhanh hơn lúc đầu.',
      against: ['ACT DR6 đo số loài neutrino hiệu dụng (effective number of neutrino species, $N_{\rm eff}$) là 2,86 ± 0,13, phù hợp với giá trị chuẩn 3,044 — không thấy dấu hiệu hạt mới.'],
    },
  ],
  viz: {
    module: '../js/viz/h0-plot.js', height: 460, mobileHeight: 520,
    caption: 'Các phép đo H₀ với thanh sai số 1σ, tô màu theo phương pháp; hai dải màu nền là Planck 2018 và SH0ES 2022. Bấm một nhóm để làm nổi và tính trung bình có trọng số; các phép đo trong cùng nhóm không hoàn toàn độc lập (dùng chung dữ liệu), nên con số này chỉ mang tính minh hoạ (số liệu tra cứu 11/2026).',
  },
  after: [
    'Câu trả lời có lẽ sẽ đến từ những phép đo hoàn toàn độc lập với cả hai con đường. Mỗi vụ sáp nhập sao neutron có kèm ánh sáng là một “còi chuẩn” (standard siren) đo khoảng cách bằng [[song-hap-dan|sóng hấp dẫn]] mà không cần bậc thang nào: GW170817 cho 70 (+12/−8) km/s/Mpc. Cần thêm nhiều sự kiện như vậy để đủ chính xác.',
  ],
  next: [
    { when: '12/2026 (dự kiến)', name: 'Gaia DR4', what: 'Thị sai chính xác hơn cho các Cepheid gần — bậc thang đầu tiên.' },
    { when: 'đang tích luỹ', name: 'LIGO–Virgo–KAGRA', what: 'Thêm “còi chuẩn” từ sóng hấp dẫn.' },
    { when: 'từ 2026', name: 'Euclid, Rubin', what: 'Hàng chục nghìn thấu kính mạnh, trong đó có những hệ đo được độ trễ thời gian.' },
    { when: 'tiếp tục', name: 'JWST', what: 'Thêm thiên hà chủ siêu tân tinh Ia, đo bằng nhiều loại “ngọn nến” song song.' },
  ],
  myths: [
    { myth: 'JWST đã giải quyết căng thẳng Hubble.', truth: 'Hai nhóm cùng dùng JWST cho kết quả khoảng 70 và khoảng 73; bất đồng nằm ở chọn mẫu và hiệu chuẩn.' },
    { myth: 'Căng thẳng Hubble có nghĩa vũ trụ học sai hoàn toàn.', truth: 'Mô hình chuẩn vẫn khớp rất nhiều dữ liệu. Chênh lệch có thể đến từ một sai số nhỏ chưa tìm ra, hoặc từ một bổ sung nhỏ cho mô hình.' },
  ],
  sources: [
    { text: 'Riess và cộng sự (2024), JWST Cepheids, ApJL 962, L17 — arXiv:2401.04773', url: 'https://arxiv.org/abs/2401.04773' },
    { text: 'Freedman và cộng sự (2025), CCHP, ApJ 985, 203 — arXiv:2408.06153', url: 'https://arxiv.org/abs/2408.06153' },
    { text: 'Phân tích chọn mẫu SN Ia của CCHP — arXiv:2504.08921', url: 'https://arxiv.org/abs/2504.08921' },
    { text: 'Riess và cộng sự (2022), SH0ES, ApJL 934, L7', url: 'https://doi.org/10.3847/2041-8213/ac5c5b' },
    { text: 'TDCOSMO (2025), A&A 704, A63 — arXiv:2506.03023', url: 'https://arxiv.org/abs/2506.03023' },
    { text: 'Pesce và cộng sự (2020), Megamaser Cosmology Project XIII — arXiv:2001.09213', url: 'https://arxiv.org/abs/2001.09213' },
    { text: 'Abbott và cộng sự (2017), A gravitational-wave standard siren measurement of the Hubble constant, Nature 551, 85', url: 'https://arxiv.org/abs/1710.05835' },
    { text: 'Poulin và cộng sự (2025), early dark energy sau ACT DR6 — arXiv:2505.08051', url: 'https://arxiv.org/abs/2505.08051' },
    { text: 'Planck Collaboration (2018) — arXiv:1807.06209', url: 'https://arxiv.org/abs/1807.06209' },
  ],
};
