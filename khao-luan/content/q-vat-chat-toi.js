// Hồ sơ 1 — Vật chất tối là gì? Nguồn: research/kl-khu-vuc-toi.md §A, research/thien-ha-cau-truc-lon.md §3.
// Cú pháp chữ như Thấu hiểu: [[id|chữ]] trỏ sang thẻ bên /thau-hieu/.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Hơn 80 % vật chất trong vũ trụ không phát sáng. Nó là gì?',
  certainty: { level: 'debated', label: 'Sự tồn tại: đã xác lập · bản chất: đang tranh luận (11/2026)' },
  intro: [
    'Gần một thế kỷ sau khi Fritz Zwicky đặt tên cho nó, [[vat-chat-toi|vật chất tối]] là một trong những thứ được đo kỹ nhất và hiểu ít nhất trong vũ trụ học. Ta biết nó nặng bao nhiêu, phân bố ở đâu, và nó không phải vật chất thường. Ta không biết nó làm bằng gì.',
    'Hồ sơ này tách hai câu hỏi thường bị gộp làm một: “vật chất tối có tồn tại không” — câu hỏi gần như đã đóng — và “vật chất tối là gì” — câu hỏi còn mở hoàn toàn.',
  ],
  known: [
    'Có một thành phần hút hấp dẫn nhưng không phát sáng, nặng hơn vật chất thường khoảng 5 lần. Nhiều bằng chứng độc lập cùng chỉ về nó: đường cong quay của thiên hà, chuyển động trong đám thiên hà, [[thau-kinh-hap-dan|thấu kính hấp dẫn]], Đám Viên Đạn (Bullet Cluster), và bức xạ phông vi sóng.',
    'Phần lớn không phải vật chất thường (baryon): lượng baryon đo độc lập từ phông vi sóng và từ tổng hợp hạt nhân Vụ Nổ Lớn chỉ bằng khoảng một phần sáu tổng vật chất.',
    'Nó phải chuyển động chậm khi các cấu trúc hình thành (“lạnh” hoặc “ấm”); neutrino thông thường đi quá nhanh nên không thể là thành phần chính.',
    'Tính tới 11/2026, chưa có thí nghiệm nào phát hiện trực tiếp hạt vật chất tối được xác nhận.',
  ],
  hypotheses: [
    {
      name: 'Hạt nặng tương tác yếu', en: 'weakly interacting massive particle, WIMP', level: 'debated',
      idea: 'Một hạt mới nặng cỡ vài GeV tới vài TeV; ngoài hấp dẫn, nó chỉ tương tác với vật chất thường ở cường độ cỡ lực yếu hoặc yếu hơn. Điểm hấp dẫn: một hạt như vậy, sinh ra trong vũ trụ sớm, tự nhiên để lại đúng lượng vật chất tối đo được.',
      for: ['Giải thích tự nhiên mật độ vật chất tối đo được.', 'Có thể dò bằng ba cách độc lập: va chạm trong máy dò dưới lòng đất, sản phẩm huỷ cặp trong không gian, và tạo ra trong máy gia tốc.'],
      against: ['Các máy dò xenon lỏng (LZ, XENONnT, PandaX-4T) chưa thấy tín hiệu; giới hạn trên của tiết diện tán xạ WIMP–nucleon đã xuống cỡ 10⁻⁴⁷ cm² (2025).', 'Máy dò đã bắt đầu chạm “sương mù neutrino” (neutrino fog) ở vùng WIMP nhẹ: neutrino từ Mặt Trời tán xạ lên hạt nhân xenon, tạo tín hiệu giống WIMP (LZ ghi nhận ở mức 4,5σ, 12/2025).', 'Sự kiện 2,6σ của LZ (9/2026) chưa phải phát hiện; nhóm nghiên cứu không tuyên bố như vậy.'],
    },
    {
      name: 'Axion', en: 'axion', level: 'speculative',
      idea: 'Một hạt rất nhẹ (khối lượng ưa thích cỡ một phần triệu tới một phần nghìn electronvolt), ra đời năm 1977–1978 từ lời giải cho một bài toán khác trong vật lý hạt: vấn đề CP mạnh (strong CP problem). Nếu tồn tại, nó có thể chính là vật chất tối.',
      for: ['Có động cơ độc lập từ vật lý hạt, không chỉ để giải thích vật chất tối.', 'ADMX đã đạt độ nhạy đủ để kiểm tra các mô hình axion chuẩn trong một vài dải khối lượng (2025).'],
      against: ['Dải khối lượng có thể rộng nhiều bậc; các máy dò mới quét được một phần nhỏ.'],
    },
    {
      name: 'Hố đen nguyên thuỷ', en: 'primordial black holes', level: 'speculative',
      idea: 'Hố đen hình thành ngay trong vũ trụ rất sớm, không từ sao chết, nên không bị giới hạn bởi lượng baryon.',
      for: ['Không cần hạt mới.', 'Còn một “cửa sổ” khối lượng cỡ tiểu hành tinh (khoảng 10⁻¹⁷–10⁻¹² khối lượng Mặt Trời) chưa bị loại.'],
      against: ['Khảo sát OGLE 20 năm (Nature 2024): chỉ 13 sự kiện vi thấu kính hấp dẫn (gravitational microlensing), trong khi nếu hố đen chiếm toàn bộ vật chất tối thì phải có hơn 500; ở dải 1,8 × 10⁻⁴–6,3 khối lượng Mặt Trời chúng chiếm tối đa 1 %.'],
    },
    {
      name: 'Thiên thể tối trong quầng', en: 'massive compact halo object, MACHO', level: 'refuted',
      idea: 'Sao lùn nâu, sao chết, hố đen… ẩn trong quầng Ngân Hà — vật chất thường nhưng không sáng.',
      for: ['Khảo sát MACHO (2000) ghi được 13–17 sự kiện vi thấu kính về phía Đám Mây Magellan Lớn, ứng với khoảng 20 % quầng (khoảng tin cậy 95 %: 8–50 %).'],
      against: ['EROS-2 (2007) chỉ thấy 1 ứng viên trong khi kỳ vọng khoảng 39; thiên thể tối cỡ 0,4 khối lượng Mặt Trời chiếm dưới 8 % quầng. OGLE 2024 nghiêng về kết luận này.', 'Lượng baryon tổng cộng đã bị giới hạn độc lập — không đủ để làm vật chất tối.'],
    },
    {
      name: 'Sửa định luật hấp dẫn', en: 'Modified Newtonian Dynamics, MOND', level: 'speculative',
      idea: 'Không có vật chất tối; thay vào đó, định luật hấp dẫn thay đổi khi gia tốc rất nhỏ, dưới khoảng 1,2 × 10⁻¹⁰ m/s² (Milgrom 1983). Đây là quan điểm thiểu số; nó vẫn được tranh luận ở thang thiên hà, nhưng như một lời giải thay thế hoàn toàn cho vật chất tối thì gặp khó khăn lớn.',
      for: ['Dự đoán đường cong quay của thiên hà chỉ từ vật chất nhìn thấy, khá chính xác.', 'Giải thích tự nhiên quan hệ Tully–Fisher giữa khối lượng và vận tốc quay.'],
      against: ['Ở đám thiên hà, ngay cả MOND vẫn thiếu khối lượng — chính những người ủng hộ gọi đây là vấn đề quan sát nghiêm trọng nhất.', 'Đám Viên Đạn: khối lượng tách khỏi khí nóng ở mức 8σ.', 'Các mô hình kiểu MOND không tái tạo được phổ phông vi sóng từ đỉnh thứ ba trở đi.', 'Phép thử bằng sao đôi rộng của Gaia: hai nhóm phân tích cùng dữ liệu ra kết luận ngược nhau.'],
    },
  ],
  viz: {
    module: '../../thau-hieu/js/viz/rotation-curve.js', height: 440, mobileHeight: 520,
    caption: 'Bằng chứng kinh điển: đường cong quay của một thiên hà kiểu Ngân Hà. Đường đứt nét là vận tốc dự đoán chỉ từ sao và khí; đường liền là khi thêm quầng vật chất tối. Kéo độ nặng của quầng để khớp các điểm phẳng (điểm minh hoạ).',
  },
  next: [
    { when: 'đang chạy', name: 'LZ, XENONnT, PandaX-4T', what: 'Máy dò xenon lỏng dưới lòng đất; LZ dự kiến tích luỹ khoảng 1 000 ngày dữ liệu.' },
    { when: 'từ 6/2026', name: 'Đài Vera C. Rubin (LSST)', what: 'Khảo sát 10 năm bắt đầu đêm 29/6/2026: thấu kính yếu, thiên hà lùn, vi thấu kính.' },
    { when: '12/2026 (dự kiến)', name: 'Gaia DR4', what: 'Dữ liệu sao đôi rộng tốt hơn cho phép thử MOND.' },
    { when: '6/2027', name: 'Euclid DR1 đầy đủ', what: 'Bản đồ vật chất tối qua thấu kính yếu trên khoảng 1 900 độ vuông.' },
    { when: 'thập niên 2030 (dự kiến)', name: 'XLZD', what: 'Máy dò kế tiếp với 60–80 tấn xenon (thiết kế 2025; lắp đặt dự kiến cuối thập niên này), nhạy tới tận “sương mù neutrino”.' },
  ],
  myths: [
    { myth: 'Máy dò không thấy gì nghĩa là vật chất tối không tồn tại.', truth: 'Mỗi máy dò chỉ loại một kiểu hạt tương tác theo một cách. Bằng chứng hấp dẫn cho sự tồn tại của vật chất tối vẫn nguyên vẹn.' },
    { myth: 'Năm 2026, LZ đã tìm thấy vật chất tối.', truth: 'LZ báo cáo một sự kiện ở mức 2,6σ — xa dưới ngưỡng 5σ để tuyên bố phát hiện; chính nhóm nghiên cứu nói rõ điều đó.' },
  ],
  sources: [
    { text: 'XENON Collaboration (2025), WIMP search with 3,1 t·y — PRL 135, 221003; arXiv:2502.18005', url: 'https://arxiv.org/abs/2502.18005' },
    { text: 'PandaX-4T (2025), PRL 134, 011805 — arXiv:2408.00664', url: 'https://arxiv.org/abs/2408.00664' },
    { text: 'LBNL (12/2025) — LZ sets a world’s best in the hunt for galactic dark matter', url: 'https://newscenter.lbl.gov/2025/12/08/lz-sets-a-worlds-best-in-the-hunt-for-galactic-dark-matter/' },
    { text: 'LBNL (1/9/2026) — LZ sees surprising result in search for dark matter', url: 'https://newscenter.lbl.gov/2026/09/01/lz-sees-surprising-result-in-search-for-dark-matter/' },
    { text: 'ADMX (2025), PRL — arXiv:2504.07279', url: 'https://arxiv.org/abs/2504.07279' },
    { text: 'Mróz và cộng sự (2024), OGLE: no massive black holes in the Milky Way halo, Nature — arXiv:2403.02386', url: 'https://arxiv.org/abs/2403.02386' },
    { text: 'Tisserand và cộng sự (2007), EROS-2 — arXiv:astro-ph/0607207', url: 'https://arxiv.org/abs/astro-ph/0607207' },
    { text: 'Alcock và cộng sự (2000), MACHO 5,7 năm — arXiv:astro-ph/0001272', url: 'https://arxiv.org/abs/astro-ph/0001272' },
    { text: 'Famaey & McGaugh (2012), Modified Newtonian Dynamics, Living Rev. Relativ. — arXiv:1112.3960', url: 'https://arxiv.org/abs/1112.3960' },
    { text: 'Banik và cộng sự (2024), sao đôi rộng Gaia — arXiv:2311.03436', url: 'https://arxiv.org/abs/2311.03436' },
    { text: 'XLZD Design Book — arXiv:2410.17137', url: 'https://arxiv.org/abs/2410.17137' },
  ],
};
