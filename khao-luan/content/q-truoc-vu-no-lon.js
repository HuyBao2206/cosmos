// Hồ sơ 4 — Trước Vụ Nổ Lớn có gì? Nguồn: research/kl-khoi-nguyen-so-phan.md §A, research/lich-su-vu-tru.md §1.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Câu hỏi nằm ở chính rìa của vật lý đã kiểm chứng.',
  certainty: { level: 'speculative', label: 'Vũ trụ từng nóng, đặc: đã xác lập · lạm phát: được ủng hộ mạnh · “trước đó”: suy đoán' },
  intro: [
    'Thuyết [[vu-no-lon|Vụ Nổ Lớn]] mô tả rất tốt vũ trụ từ khoảng giây đầu tiên trở đi. Nhưng nếu chạy ngược phương trình của thuyết tương đối tổng quát về số không, mật độ và nhiệt độ trở thành vô hạn — một điểm kỳ dị, nơi lý thuyết tự báo rằng nó hết hiệu lực. Mô tả đúng khoảnh khắc ấy cần một lý thuyết kết hợp hấp dẫn với cơ học lượng tử, mà ta chưa có.',
    'Vì vậy, câu hỏi “trước Vụ Nổ Lớn có gì” thực ra gồm nhiều câu hỏi: những phần nhỏ nhất của giây đầu tiên diễn ra thế nào, thời gian có một điểm bắt đầu hay không, và vũ trụ của ta có phải là duy nhất. Các câu trả lời hiện có ở những mức chắc chắn rất khác nhau.',
  ],
  known: [
    'Vũ trụ từng ở trạng thái nóng, đặc và đã giãn nở từ đó — ba trụ cột: sự giãn nở, phông vi sóng, tỉ lệ các nguyên tố nhẹ.',
    'Những gợn mật độ nguyên thuỷ gần như giống nhau ở mọi kích thước nhưng không hoàn toàn: chỉ số phổ $n_s = 0{,}9649 \\pm 0{,}0042$ (Planck 2018), khác 1 ở mức 8σ.',
    'Không gian rất gần phẳng (xem hồ sơ “Vũ trụ có vô hạn không?”).',
    'Chưa phát hiện sóng hấp dẫn nguyên thuỷ: tỉ số tensor trên vô hướng $r < 0{,}036$ (BICEP/Keck 2021).',
  ],
  hypotheses: [
    {
      name: 'Lạm phát vũ trụ', en: 'cosmic inflation', level: 'strong',
      idea: 'Trong một phần cực nhỏ của giây đầu tiên, vũ trụ giãn nở cực nhanh, làm phẳng không gian và kéo các dao động lượng tử thành những gợn mật độ — mầm của mọi thiên hà (Guth 1981; Linde, Albrecht và Steinhardt 1982).',
      for: ['Mukhanov (2003) dự đoán chỉ số phổ trong khoảng 0,92–0,97 trước khi Planck đo được 0,965.', 'Giải thích vì sao vũ trụ rất phẳng và vì sao những vùng chưa từng “liên lạc” với nhau lại có cùng nhiệt độ.'],
      against: ['Chữ ký đặc trưng — sóng hấp dẫn nguyên thuỷ — chưa được thấy.', 'Năm 2014, nhóm BICEP2 công bố phát hiện tín hiệu này, rồi rút lại tuyên bố năm 2015 khi hoá ra tín hiệu chủ yếu do bụi trong Ngân Hà.', 'Một số nhà vật lý (Ijjas, Steinhardt, Loeb 2017) cho rằng lạm phát quá linh hoạt nên khó kiểm chứng; 33 nhà vật lý khác phản bác.'],
    },
    {
      name: 'Lạm phát vĩnh cửu và đa vũ trụ', en: 'eternal inflation, multiverse', level: 'speculative',
      idea: 'Trong nhiều mô hình, lạm phát không dừng ở mọi nơi cùng lúc: nó dừng ở từng “bong bóng” — mỗi bong bóng là một vũ trụ như của ta — trong khi phần còn lại tiếp tục giãn (Vilenkin 1983, Linde 1986).',
      for: ['Là hệ quả tự nhiên của một số mô hình lạm phát.'],
      against: ['Các vũ trụ khác nằm ngoài tầm quan sát, nên chưa có cách kiểm chứng được đồng thuận.'],
    },
    {
      name: 'Vũ trụ nảy', en: 'bouncing / ekpyrotic', level: 'speculative',
      idea: 'Vụ Nổ Lớn không phải điểm khởi đầu mà là một cú “nảy” từ một giai đoạn co lại trước đó; mô hình ekpyrotic (2001) mô tả nó như va chạm của hai “màng” trong lý thuyết dây.',
      for: ['Có mô hình toán học; tránh được điểm kỳ dị ban đầu.'],
      against: ['Chưa có bằng chứng riêng.', 'Gần như không sinh sóng hấp dẫn nguyên thuỷ đo được — nếu chúng được phát hiện, mô hình gặp bất lợi.'],
    },
    {
      name: 'Không có “trước”', en: 'no-boundary proposal', level: 'speculative',
      idea: 'Hartle và Hawking (1983) đề xuất rằng ở gần khởi đầu, thời gian hành xử như một chiều không gian, nên câu hỏi “trước đó” không có nghĩa — giống như hỏi điểm nào nằm phía bắc của Bắc Cực.',
      for: ['Cho một hàm sóng của vũ trụ không cần điều kiện biên.'],
      against: ['Phụ thuộc vào một lý thuyết lượng tử hấp dẫn chưa hoàn chỉnh; chưa có dự đoán quan sát được.'],
    },
    {
      name: 'Vũ trụ tuần hoàn của Penrose', en: 'conformal cyclic cosmology', level: 'refuted',
      idea: 'Vũ trụ trải qua vô số “kỷ nguyên” nối tiếp; dấu vết của kỷ nguyên trước có thể hiện trong phông vi sóng như những “điểm Hawking”.',
      for: ['Một nhóm (An, Meissner, Penrose 2018) báo cáo những đốm như vậy trong dữ liệu Planck.'],
      against: ['Các phân tích độc lập (2020) cho thấy những đốm đó phù hợp với mô hình chuẩn khi tính đúng xác suất xuất hiện ngẫu nhiên; tín hiệu được tuyên bố không đứng vững.'],
    },
  ],
  after: [
    'Có một kết quả toán học thường bị hiểu quá lên: định lý Borde–Guth–Vilenkin (2003) cho thấy một vũ trụ giãn nở trung bình không thể được mô tả cổ điển ngược mãi về quá khứ. Nó không chứng minh “thời gian có điểm bắt đầu”; nó chỉ nói rằng cần một thứ vật lý khác ở biên quá khứ.',
  ],
  viz: {
    module: '../../thau-hieu/js/viz/cosmic-timeline.js', height: 400, mobileHeight: 360,
    caption: 'Dòng thời gian vũ trụ đã kiểm chứng bắt đầu từ khoảng giây đầu tiên. Lạm phát, nếu xảy ra, nằm ở khoảng 10⁻³⁶–10⁻³² giây — xa về bên trái thang này, ở vùng mà vật lý còn là giả thuyết.',
  },
  next: [
    { when: 'đang chạy', name: 'Đài Simons (Chile)', what: 'Kính khẩu độ lớn có ánh sáng đầu tiên tháng 2/2025; đo phân cực phông vi sóng.' },
    { when: 'đang chạy', name: 'BICEP/Keck', what: 'Tiếp tục siết giới hạn sóng hấp dẫn nguyên thuỷ (tổng hợp cuối 2025: $r < 0{,}034$).' },
    { when: 'dự kiến 2036', name: 'LiteBIRD (JAXA)', what: 'Vệ tinh đo phân cực “mode B” để tìm sóng hấp dẫn nguyên thuỷ; qua vòng thẩm định tháng 8/2026.' },
  ],
  myths: [
    { myth: 'Lạm phát đã được chứng minh.', truth: 'Lạm phát được ủng hộ mạnh, nhưng chữ ký đặc trưng của nó — sóng hấp dẫn nguyên thuỷ — chưa được phát hiện.' },
    { myth: 'Khoa học đã kết luận có đa vũ trụ.', truth: 'Đa vũ trụ là hệ quả của một số mô hình lạm phát, ở mức suy đoán; chưa có cách kiểm chứng được đồng thuận.' },
  ],
  sources: [
    { text: 'Planck Collaboration (2018) X: Constraints on inflation — arXiv:1807.06211', url: 'https://arxiv.org/abs/1807.06211' },
    { text: 'BICEP/Keck (2021), BK18, PRL 127, 151301 — arXiv:2110.00483', url: 'https://arxiv.org/abs/2110.00483' },
    { text: 'Nature News (2015) — Gravitational waves discovery now officially dead', url: 'https://www.nature.com/doifinder/10.1038/nature.2015.16830' },
    { text: 'V. Mukhanov (2003), CMB, quantum fluctuations and the predictive power of inflation — arXiv:astro-ph/0303077', url: 'https://arxiv.org/abs/astro-ph/0303077' },
    { text: 'Khoury, Ovrut, Steinhardt & Turok (2001), The ekpyrotic universe — arXiv:hep-th/0103239', url: 'https://arxiv.org/abs/hep-th/0103239' },
    { text: 'Borde, Guth & Vilenkin (2003), Inflationary spacetimes are incomplete in past directions — arXiv:gr-qc/0110012', url: 'https://arxiv.org/abs/gr-qc/0110012' },
    { text: 'Scientific American (2017) — A cosmic controversy', url: 'https://www.scientificamerican.com/article/a-cosmic-controversy/' },
    { text: 'JAXA ISAS — LiteBIRD', url: 'https://www.isas.jaxa.jp/en/missions/spacecraft/future/litebird.html' },
  ],
};
