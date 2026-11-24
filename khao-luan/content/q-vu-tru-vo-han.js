// Hồ sơ 6 — Vũ trụ có vô hạn không? Nguồn: research/kl-khoi-nguyen-so-phan.md §C, research/lich-su-vu-tru.md §3.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Ta chỉ thấy được một quả cầu bán kính khoảng 46 tỷ năm ánh sáng. Bên ngoài nó, ta chỉ có thể suy luận.',
  certainty: { level: 'speculative', label: 'Không gian gần phẳng: đã xác lập · hữu hạn hay vô hạn: chưa biết, có thể không bao giờ biết' },
  intro: [
    'Vũ trụ quan sát được có giới hạn: ánh sáng từ xa hơn khoảng 46 tỷ năm ánh sáng (khoảng cách đồng chuyển động) chưa kịp tới ta trong 13,8 tỷ năm (xem [[dinh-luat-hubble]]). Toàn bộ vũ trụ thì có thể lớn hơn rất nhiều — hoặc vô hạn.',
    'Manh mối duy nhất là **độ cong** của không gian. Không gian cong dương (như mặt cầu, nhưng ba chiều) thì hữu hạn và khép kín. Không gian phẳng hoặc cong âm có thể vô hạn. Độ cong được đo bằng hình học của những tam giác khổng lồ: kích thước biểu kiến của các gợn trong [[phong-vi-song|phông vi sóng]], và dao động âm baryon.',
  ],
  known: [
    'Năm 2000, thí nghiệm khí cầu BOOMERanG đo được vị trí đỉnh âm học đầu tiên của phông vi sóng, cho thấy vũ trụ gần phẳng.',
    'Planck 2018 kết hợp dao động âm baryon: tham số độ cong $\\Omega_K = 0{,}0007 \\pm 0{,}0019$ — phẳng trong sai số khoảng 0,2 %.',
    'Chưa thấy dấu hiệu không gian “quấn lại” ở quy mô nhỏ hơn vũ trụ quan sát được (Planck 2015).',
  ],
  hypotheses: [
    {
      name: 'Phẳng và vô hạn', en: 'flat, infinite', level: 'speculative',
      idea: 'Giả định đơn giản nhất phù hợp với số liệu: không gian phẳng và kéo dài vô hạn.',
      for: ['Khớp với độ cong đo được.', 'Lạm phát dự đoán không gian rất gần phẳng.'],
      against: ['“Vô hạn” không thể kiểm chứng: dù đo độ cong chính xác đến đâu, ta chỉ đặt được giới hạn dưới cho kích thước.', 'Không gian phẳng vẫn có thể hữu hạn nếu nó “quấn lại” thành một xuyến ba chiều (3-torus), giống mặt một chiếc phao nhưng thêm một chiều.'],
    },
    {
      name: 'Cong dương, hữu hạn', en: 'closed', level: 'speculative',
      idea: 'Vũ trụ khép kín với bán kính cong rất lớn: đi mãi theo một hướng sẽ quay về chỗ cũ.',
      for: ['Năm 2019, một nhóm (Di Valentino, Melchiorri, Silk) cho rằng riêng phổ phông vi sóng của Planck ưa độ cong dương.'],
      against: ['Phân tích lại (Efstathiou và Gratton 2020) cho thấy Planck nhất quán với không gian phẳng; khi thêm dao động âm baryon, độ cong gần như bằng không.', 'Nếu vũ trụ cong dương và hữu hạn, nó phải rất lớn: một phân tích dữ liệu thời WMAP (2011) cho thể tích ít nhất khoảng 250 lần “khối cầu Hubble”.'],
    },
    {
      name: 'Không gian quấn lại', en: 'non-trivial topology', level: 'speculative',
      idea: 'Không gian có thể phẳng mà vẫn hữu hạn, nếu nó nối lại với chính mình. Khi đó ta có thể thấy cùng một vùng trời ở hai hướng khác nhau — những “vòng tròn khớp” trên phông vi sóng.',
      against: ['Các cuộc tìm vòng tròn khớp trên dữ liệu WMAP và Planck đều không thấy; mô hình “vũ trụ quả bóng đá” đề xuất năm 2003 đã bị loại.'],
    },
  ],
  viz: {
    module: '../js/viz/curvature.js', height: 400, mobileHeight: 360,
    caption: 'Trên không gian cong dương, tổng ba góc của một tam giác lớn hơn 180°; trên không gian phẳng đúng 180°; trên không gian cong âm nhỏ hơn 180°. Hình minh hoạ hai chiều, đơn vị tuỳ ý; phông vi sóng đóng vai một tam giác có cạnh dài hàng chục tỷ năm ánh sáng.',
  },
  next: [
    { when: 'đang chạy', name: 'DESI, Euclid', what: 'Dao động âm baryon chính xác hơn, siết độ cong.' },
    { when: 'đang chạy', name: 'Đài Simons, ACT, SPT', what: 'Phông vi sóng độ phân giải cao, thêm cơ hội tìm vòng tròn khớp trong phân cực.' },
  ],
  myths: [
    { myth: 'Vũ trụ 13,8 tỷ năm tuổi nên rộng 13,8 tỷ năm ánh sáng.', truth: 'Không gian giãn ra trong lúc ánh sáng đi, nên bán kính vũ trụ quan sát được là khoảng 46 tỷ năm ánh sáng; toàn thể có thể lớn hơn nhiều.' },
    { myth: '“Phẳng” nghĩa là vũ trụ mỏng như cái đĩa.', truth: '“Phẳng” là hình học ba chiều theo Euclid: tổng ba góc tam giác đúng 180°, các đường song song không bao giờ gặp nhau.' },
  ],
  sources: [
    { text: 'Planck Collaboration (2018) I: Overview — arXiv:1807.06205', url: 'https://arxiv.org/abs/1807.06205' },
    { text: 'de Bernardis và cộng sự (2000), A flat universe from high-resolution maps of the CMB (BOOMERanG), Nature — arXiv:astro-ph/0004404', url: 'https://arxiv.org/abs/astro-ph/0004404' },
    { text: 'Planck Collaboration (2015) XVIII: Background geometry and topology — arXiv:1502.01593', url: 'https://arxiv.org/abs/1502.01593' },
    { text: 'Di Valentino, Melchiorri & Silk (2019), Planck evidence for a closed universe? — arXiv:1911.02087', url: 'https://arxiv.org/abs/1911.02087' },
    { text: 'Efstathiou & Gratton (2020), The evidence for a spatially flat universe — arXiv:2002.06892', url: 'https://arxiv.org/abs/2002.06892' },
    { text: 'Vardanyan, Trotta & Silk (2011), Applications of Bayesian model averaging to the curvature and size of the universe — arXiv:1101.5476', url: 'https://arxiv.org/abs/1101.5476' },
    { text: 'Cornish và cộng sự (2004), Constraining the topology of the universe — arXiv:astro-ph/0310233', url: 'https://arxiv.org/abs/astro-ph/0310233' },
  ],
};
