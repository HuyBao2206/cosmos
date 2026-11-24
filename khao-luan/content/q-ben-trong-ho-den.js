// Hồ sơ 7 — Bên trong hố đen có gì? Nguồn: research/kl-su-song-ho-den.md §B, research/ho-den.md, research/khong-thoi-gian.md.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Nơi thuyết tương đối tổng quát và cơ học lượng tử buộc phải gặp nhau — và chưa đồng ý với nhau.',
  certainty: { level: 'speculative', label: 'Bên ngoài chân trời: đã xác lập · bên trong: suy luận lý thuyết, chưa thể quan sát' },
  intro: [
    'Bên ngoài [[chan-troi-su-kien|chân trời sự kiện]], hố đen đã được chụp ảnh, “nghe” qua sóng hấp dẫn và cân bằng quỹ đạo các ngôi sao. Bên trong thì khác: theo đúng định nghĩa, không tín hiệu nào từ đó thoát ra được. Mọi điều nói về bên trong là suy luận từ lý thuyết.',
    'Chính ở đây hai lý thuyết thành công nhất của vật lý mâu thuẫn. [[tuong-doi-tong-quat|Thuyết tương đối tổng quát]] dự đoán một điểm kỳ dị; cơ học lượng tử dự đoán hố đen bốc hơi và đặt ra câu hỏi thông tin rơi vào đi đâu.',
  ],
  known: [
    'Hố đen tồn tại, và mô tả bên ngoài chân trời của thuyết tương đối tổng quát khớp với mọi quan sát (EHT, quỹ đạo sao S2, sóng hấp dẫn).',
    'Định lý của Penrose (1965, Nobel 2020): khi đã hình thành một “bề mặt bẫy”, thuyết tương đối tổng quát nhất định dẫn tới điểm kỳ dị, bất kể hình dạng ban đầu.',
    'Định lý diện tích của Hawking — diện tích chân trời không giảm — được kiểm chứng với sự kiện sóng hấp dẫn GW250114 ở độ tin cậy 99,999 % (2025).',
  ],
  hypotheses: [
    {
      name: 'Điểm kỳ dị thật', en: 'singularity', level: 'speculative',
      idea: 'Ở tâm, mật độ và độ cong trở thành vô hạn — đúng như phương trình của thuyết tương đối tổng quát nói.',
      for: ['Là dự đoán chặt chẽ của thuyết tương đối tổng quát (định lý Penrose).'],
      against: ['Định lý nói về chỗ lý thuyết hết hiệu lực, không chứng minh có một điểm vô hạn thật. Đa số nhà vật lý cho rằng lượng tử hấp dẫn sẽ thay thế nó.'],
    },
    {
      name: 'Bức xạ Hawking', en: 'Hawking radiation', level: 'strong',
      idea: 'Hiệu ứng lượng tử gần chân trời khiến hố đen phát ra bức xạ nhiệt, nhiệt độ tỉ lệ nghịch với khối lượng (Hawking 1974–1975), nên nó mất dần khối lượng và cuối cùng bốc hơi.',
      for: ['Được suy ra bằng nhiều cách độc lập về lý thuyết.', 'Trong hệ tương tự bằng chất ngưng tụ Bose–Einstein, nhóm Steinhauer (2019) đo được phổ nhiệt đúng dự đoán.'],
      against: ['Chưa quan sát được từ hố đen thật: một hố đen cỡ Mặt Trời chỉ ấm khoảng 6 × 10⁻⁸ K, lạnh hơn phông vi sóng hàng chục triệu lần.', 'Hệ tương tự không chứng minh được hố đen thật cũng bức xạ, vì vật lý nền khác nhau.'],
    },
    {
      name: 'Thông tin được bảo toàn', en: 'information paradox', level: 'debated',
      idea: 'Năm 1976, Hawking chỉ ra rằng nếu bức xạ hoàn toàn ngẫu nhiên, thông tin về những gì rơi vào sẽ mất vĩnh viễn — trái với cơ học lượng tử. Năm 2004, chính ông đổi ý. Các tính toán 2019–2020 (“đảo lượng tử”, “lỗ sâu bản sao”) lần đầu tái tạo được “đường cong Page” — dấu hiệu thông tin thoát ra dần.',
      for: ['Các tính toán 2019–2020 cho kết quả nhất quán với việc bảo toàn thông tin trong một số mô hình.'],
      against: ['Cơ chế cụ thể thông tin thoát ra vẫn chưa rõ; nhiều tính toán dựa trên mô hình đơn giản hoá.'],
    },
    {
      name: 'Tường lửa', en: 'firewall (AMPS 2012)', level: 'speculative',
      idea: 'Để thông tin được bảo toàn, chân trời của hố đen “già” có thể là một bức tường năng lượng cao thiêu cháy mọi thứ rơi vào — trái với nguyên lý tương đương.',
      against: ['Mâu thuẫn với một trụ cột của thuyết tương đối; nhiều đề xuất khác tránh được kết luận này.', 'Các cuộc tìm “tiếng vọng” sóng hấp dẫn từ cấu trúc ở chân trời trong dữ liệu GWTC-2, GWTC-3 không thấy gì có ý nghĩa thống kê.'],
    },
  ],
  viz: {
    module: '../js/viz/hawking.js', height: 420, mobileHeight: 360,
    caption: 'Nhiệt độ Hawking (thang log) theo khối lượng hố đen. Đường đứt nét là nhiệt độ phông vi sóng: chỉ hố đen nhẹ hơn khoảng 4,5 × 10²² kg (cỡ 0,6 khối lượng Mặt Trăng) mới nóng hơn nó. Các con số tính theo công thức của Hawking; thời gian bốc hơi chỉ tính photon.',
  },
  next: [
    { when: 'đang tích luỹ', name: 'LIGO–Virgo–KAGRA', what: 'Kiểm tra định lý diện tích, dao động tắt dần của hố đen mới hợp nhất, và tìm “tiếng vọng”.' },
    { when: 'đang chạy', name: 'Kính gamma (Fermi-LAT, HAWC…)', what: 'Tìm hố đen nguyên thuỷ đang nổ tung ở cuối quá trình bốc hơi; chưa thấy.' },
    { when: 'tiếp tục', name: 'Thí nghiệm hố đen tương tự', what: 'Kiểm tra cơ chế bức xạ Hawking trong phòng thí nghiệm.' },
  ],
  myths: [
    { myth: 'Bức xạ Hawking đã được quan sát.', truth: 'Chỉ trong hệ tương tự trong phòng thí nghiệm. Từ hố đen thật thì chưa, và với hố đen khối lượng sao gần như không thể.' },
    { myth: 'Hawking chứng minh hố đen phá huỷ thông tin.', truth: 'Ông đề xuất điều đó năm 1976 rồi tự đổi ý năm 2004; câu hỏi vẫn còn mở.' },
  ],
  sources: [
    { text: 'R. Penrose (1965), Gravitational collapse and space-time singularities, PRL 14, 57', url: 'https://doi.org/10.1103/PhysRevLett.14.57' },
    { text: 'S. W. Hawking (1974), Black hole explosions?, Nature 248, 30', url: 'https://doi.org/10.1038/248030a0' },
    { text: 'S. W. Hawking (1975), Particle creation by black holes, Commun. Math. Phys. 43, 199', url: 'https://doi.org/10.1007/BF02345020' },
    { text: 'S. W. Hawking (1976), Breakdown of predictability in gravitational collapse, Phys. Rev. D 14, 2460', url: 'https://doi.org/10.1103/PhysRevD.14.2460' },
    { text: 'D. Page (1993), Information in black hole radiation — arXiv:hep-th/9306083', url: 'https://arxiv.org/abs/hep-th/9306083' },
    { text: 'Almheiri, Marolf, Polchinski & Sully (2012), Black holes: complementarity or firewalls? — arXiv:1207.3123', url: 'https://arxiv.org/abs/1207.3123' },
    { text: 'Almheiri và cộng sự (2019), Replica wormholes and the entropy of Hawking radiation — arXiv:1911.12333', url: 'https://arxiv.org/abs/1911.12333' },
    { text: 'Muñoz de Nova và cộng sự (2019), Observation of thermal Hawking radiation in an analogue black hole, Nature 569, 688', url: 'https://doi.org/10.1038/s41586-019-1241-0' },
  ],
};
