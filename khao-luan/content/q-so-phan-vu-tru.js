// Hồ sơ 5 — Vũ trụ sẽ kết thúc thế nào? Nguồn: research/kl-khoi-nguyen-so-phan.md §B.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Câu trả lời phụ thuộc gần như hoàn toàn vào một thứ ta chưa hiểu: năng lượng tối.',
  certainty: { level: 'debated', label: 'Giãn nở mãi (theo mô hình chuẩn): được ủng hộ mạnh · các kịch bản khác: suy đoán' },
  intro: [
    'Nếu [[nang-luong-toi|năng lượng tối]] là một hằng số, tương lai đã được viết sẵn: vũ trụ giãn nở mãi và nguội dần. Nếu nó thay đổi theo thời gian, tương lai có thể khác hẳn. Hồ sơ này đặt các kịch bản cạnh nhau, mỗi kịch bản gắn với điều kiện vật lý cần có để nó xảy ra.',
  ],
  known: [
    'Giãn nở hiện đang tăng tốc (đã xác lập, Nobel 2011).',
    'Với mô hình chuẩn ΛCDM ($w = -1$ không đổi), vũ trụ giãn nở mãi mãi.',
    'Dữ liệu DESI gợi ý năng lượng tối có thể đang yếu dần, nhưng khi kết hợp với mẫu siêu tân tinh DES, mức lệch khỏi ΛCDM đã giảm từ 4,2σ xuống 3,2σ sau khi mẫu này được hiệu chuẩn lại (DES-Dovekie, 2026) — câu hỏi đang được tranh luận.',
  ],
  hypotheses: [
    {
      name: 'Nguội dần mãi mãi', en: 'heat death / Big Freeze', level: 'strong',
      idea: 'Thiên hà xa dần khuất khỏi tầm nhìn; sao thôi hình thành và tắt dần sau khoảng 100 nghìn tỷ năm; cuối cùng chỉ còn sao chết, hố đen, rồi hố đen cũng bốc hơi qua [[chan-troi-su-kien|bức xạ Hawking]]: khoảng 10⁶⁷ năm cho một hố đen cỡ Mặt Trời, khoảng 10¹⁰⁰ năm cho hố đen lớn nhất.',
      for: ['Là hệ quả trực tiếp của mô hình chuẩn, vốn khớp hầu hết dữ liệu.'],
      against: ['Các mốc rất xa (phân rã proton, bốc hơi hố đen) dựa trên vật lý chưa quan sát được.', 'Bức tranh các kỷ nguyên tương lai của Adams và Laughlin (1997) được viết trước khi phát hiện năng lượng tối.'],
    },
    {
      name: 'Xé toạc lớn', en: 'Big Rip', level: 'speculative',
      idea: 'Nếu năng lượng tối là năng lượng “ma” ($w < -1$), mật độ của nó tăng theo thời gian, xé rời thiên hà, hệ hành tinh, rồi cả nguyên tử, sau một thời gian hữu hạn (Caldwell, Kamionkowski, Weinberg 2003). Với $w = -1{,}5$, còn khoảng 22 tỷ năm.',
      against: ['Dữ liệu hiện nay, nếu có lệch khỏi $w = -1$, thì lệch theo hướng ngược lại ($w > -1$).'],
    },
    {
      name: 'Co lại', en: 'Big Crunch', level: 'speculative',
      idea: 'Nếu năng lượng tối yếu đi đủ nhiều và có một thành phần âm, giãn nở sẽ dừng rồi đảo chiều. Một mô hình năm 2025 (Luu, Qiu, Tye) khớp với dữ liệu DESI cho tuổi thọ toàn phần của vũ trụ khoảng 33 tỷ năm.',
      for: ['Tương thích với tín hiệu năng lượng tối yếu dần của DESI.'],
      against: ['Dựa trên một mô hình cụ thể và một tín hiệu chưa đạt ngưỡng phát hiện, đã yếu đi năm 2026. Không phải một dự báo.'],
    },
    {
      name: 'Phân rã chân không', en: 'vacuum decay', level: 'speculative',
      idea: 'Với khối lượng boson Higgs (khoảng 125 GeV) và quark top đo được, chân không của Mô hình Chuẩn có vẻ “siêu bền” (metastable): bền trong thời gian cực dài nhưng không tuyệt đối.',
      for: ['Tính toán dựa trên các khối lượng hạt đã đo (Degrassi và cộng sự 2012; Buttazzo và cộng sự 2013).'],
      against: ['Kết luận giả định không có vật lý mới tới thang năng lượng Planck.', 'Thời gian sống ước tính lớn hơn tuổi vũ trụ (khoảng 10¹⁰ năm) rất nhiều bậc độ lớn; các bản tính còn lệch nhau (10¹³⁹ hay 10¹⁶¹ năm).'],
    },
  ],
  viz: {
    module: '../js/viz/future-fate.js', height: 440, mobileHeight: 380,
    caption: 'Kích thước tương đối của vũ trụ tới 120 tỷ năm sau Vụ Nổ Lớn (thang log), với năng lượng tối có phương trình trạng thái w chỉnh được. Quá khứ theo mô hình Planck 2018; tương lai tích phân phương trình Friedmann. Kịch bản co lại dùng một mật độ năng lượng tối âm để minh hoạ.',
  },
  next: [
    { when: 'đang chạy', name: 'DESI', what: 'Đo lịch sử giãn nở qua hàng chục triệu thiên hà; bản dữ liệu DR3 chưa công bố (11/2026).' },
    { when: 'giữa 2027', name: 'Euclid DR1 đầy đủ', what: 'Kết quả vũ trụ học đầu tiên của Euclid.' },
    { when: 'từ 2026', name: 'Rubin, Roman', what: 'Siêu tân tinh và thấu kính yếu ở quy mô lớn.' },
  ],
  myths: [
    { myth: 'DESI cho thấy vũ trụ sẽ co lại.', truth: 'Một số mô hình dựng trên dữ liệu DESI cho phép co lại; bản thân DESI không dự báo điều đó, và tín hiệu đã yếu đi năm 2026.' },
    { myth: '“Chết nhiệt” nghĩa là vũ trụ nóng lên.', truth: '“Nhiệt” ở đây là trạng thái cân bằng nhiệt, entropy cực đại. Vũ trụ khi đó cực kỳ lạnh.' },
  ],
  sources: [
    { text: 'Adams & Laughlin (1997), A dying universe, Rev. Mod. Phys. 69, 337 — arXiv:astro-ph/9701131', url: 'https://arxiv.org/abs/astro-ph/9701131' },
    { text: 'Caldwell, Kamionkowski & Weinberg (2003), Phantom energy and cosmic doomsday — arXiv:astro-ph/0302506', url: 'https://arxiv.org/abs/astro-ph/0302506' },
    { text: 'Luu, Qiu & Tye (2025), The lifespan of our universe, JCAP — arXiv:2506.24011', url: 'https://arxiv.org/abs/2506.24011' },
    { text: 'DES-Dovekie (2026), MNRAS — arXiv:2511.07517', url: 'https://arxiv.org/abs/2511.07517' },
    { text: 'Degrassi và cộng sự (2012), Higgs mass and vacuum stability — arXiv:1205.6497', url: 'https://arxiv.org/abs/1205.6497' },
    { text: 'Andreassen, Frost & Schwartz (2018), Scale-invariant instantons and the complete lifetime of the Standard Model — arXiv:1707.08124', url: 'https://arxiv.org/abs/1707.08124' },
    { text: 'Thời gian bốc hơi hố đen — arXiv:2411.01151', url: 'https://arxiv.org/abs/2411.01151' },
  ],
};
