// Hồ sơ 8 — Chúng ta có cô đơn trong vũ trụ? Nguồn: research/kl-su-song-ho-den.md §A, research/hanh-tinh-su-song.md.
export const UPDATED = '11/2026';

export const DOSSIER = {
  kicker: 'Hàng nghìn ngoại hành tinh, hàng trăm tỷ ngôi sao — và chưa một tín hiệu nào.',
  certainty: { level: 'speculative', label: 'Chưa có bằng chứng sự sống ngoài Trái Đất (11/2026) · mọi lời giải nghịch lý Fermi: suy đoán' },
  intro: [
    'Mùa hè năm 1950, trong một bữa trưa ở Los Alamos, Enrico Fermi hỏi đồng nghiệp một câu đại ý: “Mọi người đâu cả rồi?” Nếu sự sống trí tuệ phổ biến, một nền văn minh biết du hành giữa các vì sao có thể lan khắp Ngân Hà trong thời gian ngắn hơn nhiều so với tuổi của nó. Vậy sao ta không thấy ai? Lập luận chặt chẽ do Michael Hart công bố năm 1975; cái tên “nghịch lý Fermi” ra đời sau.',
    'Ngày nay, ta biết [[ngoai-hanh-tinh|ngoại hành tinh]] là phổ biến và nhiều hành tinh nằm trong [[vung-song-duoc|vùng có thể sống được]]. Nhưng giữa “có thể sống được” và “có sự sống” là một khoảng trống mà [[sinh-hoc-vu-tru|sinh học vũ trụ]] chưa vượt qua được.',
  ],
  known: [
    'Tính tới 11/2026, chưa có bằng chứng nào về sự sống ngoài Trái Đất — dù đơn giản hay có trí tuệ — được giới khoa học chấp nhận.',
    'Hơn 6 400 ngoại hành tinh đã được xác nhận; sự sống trên Trái Đất xuất hiện sớm, ít nhất khoảng 3,5 tỷ năm trước.',
    'Mọi cuộc tìm kiếm tín hiệu có chủ đích từ năm 1960 tới nay chưa tìm thấy tín hiệu nào đứng vững sau kiểm tra.',
  ],
  hypotheses: [
    {
      name: 'Bộ lọc lớn', en: 'Great Filter', level: 'speculative',
      idea: 'Giữa vật chất vô sinh và một nền văn minh lan khắp các vì sao có ít nhất một bước cực khó (Hanson 1996–1998). Câu hỏi là ta đã qua bước đó hay nó còn ở phía trước.',
      for: ['Giải thích sự im lặng mà không cần giả định về hành vi của nền văn minh khác.'],
      against: ['Không chỉ ra được bước nào là bộ lọc; không kiểm chứng trực tiếp được.'],
    },
    {
      name: 'Trái Đất hiếm', en: 'Rare Earth', level: 'speculative',
      idea: 'Vi sinh vật có thể phổ biến, nhưng sự sống phức tạp cần một chuỗi điều kiện hiếm gặp (Ward và Brownlee 2000).',
      for: ['Trên Trái Đất, vi sinh vật có từ ít nhất 3,5 tỷ năm, còn sinh vật phức tạp và công nghệ xuất hiện rất muộn.'],
      against: ['Chỉ dựa trên một ví dụ duy nhất là Trái Đất; khó ước lượng xác suất.'],
    },
    {
      name: 'Giả thuyết vườn thú', en: 'zoo hypothesis', level: 'speculative',
      idea: 'Họ biết ta nhưng cố ý không liên lạc (Ball 1973).',
      against: ['Gần như không thể kiểm chứng; đòi hỏi mọi nền văn minh cùng tuân theo một quy ước.'],
    },
    {
      name: 'Ta chưa tìm đủ', en: 'distance & timing', level: 'speculative',
      idea: 'Tín hiệu yếu đi theo bình phương khoảng cách, các nền văn minh có thể không tồn tại cùng lúc, và ta mới quét một phần rất nhỏ các tần số, hướng và thời điểm.',
      for: ['Các con số khoảng cách và thời gian là có thật.'],
      against: ['Không giải thích được sự im lặng nếu có những nền văn minh sống rất lâu và lan rộng.'],
    },
    {
      name: '“Hoà tan” nghịch lý', en: 'dissolving the Fermi paradox', level: 'speculative',
      idea: 'Sandberg, Drexler và Ord (2018) thay các con số trong [[sinh-hoc-vu-tru|phương trình Drake]] bằng mức bất định thật của chúng; kết quả là có xác suất đáng kể ta là duy nhất trong Ngân Hà — nên sự im lặng không còn là nghịch lý.',
      for: ['Xử lý trung thực mức bất định của các thừa số chưa biết.'],
      against: ['Kết luận phụ thuộc vào cách chọn phân bố bất định.'],
    },
  ],
  viz: {
    module: '../../thau-hieu/js/viz/drake.js', height: 440, mobileHeight: 460,
    caption: 'Phương trình Drake (1961) như một khung suy luận: chỉ hai thừa số đầu đã được đo khá tốt; các thừa số còn lại hoàn toàn chưa biết. Kéo chúng để thấy câu trả lời trải từ “chỉ có ta” tới “hàng triệu nền văn minh”.',
  },
  after: [
    'Lịch sử tìm kiếm có nhiều “ứng viên” rồi lại tắt: tín hiệu “Wow!” năm 1977 không bao giờ lặp lại (một giải thích năm 2024 bằng đám mây hydro bừng sáng vẫn chỉ là giả thuyết); tín hiệu BLC1 năm 2019 từ hướng Proxima Centauri hoá ra là nhiễu từ máy phát trên Trái Đất; thiên thạch ALH84001 (1996) và khí phosphine trên Sao Kim (2020) đều không đứng vững như bằng chứng sự sống.',
  ],
  next: [
    { when: 'đang chạy', name: 'Breakthrough Listen', what: 'Tìm tín hiệu vô tuyến và laser từ hàng triệu ngôi sao (từ 2015).' },
    { when: '4/2030', name: 'Europa Clipper', what: 'Đánh giá khả năng có sự sống của đại dương dưới băng trên Europa.' },
    { when: '2034', name: 'Dragonfly', what: 'Máy bay không người lái trên Titan (phóng dự kiến 7/2028).' },
    { when: '3/2029', name: 'ELT (ESO, gương 39 m)', what: 'Ánh sáng đầu tiên; quan sát khoa học từ 12/2030, có thể đọc khí quyển hành tinh đá gần.' },
    { when: 'khoảng 2040s', name: 'Habitable Worlds Observatory (NASA)', what: 'Kính chụp trực tiếp hành tinh giống Trái Đất; chưa có ngày phóng chính thức.' },
  ],
  myths: [
    { myth: 'Tín hiệu “Wow!” đã được giải mã: đó là khí hydro.', truth: 'Đó là một giả thuyết trên một bài chưa bình duyệt năm 2024; chính các tác giả còn dè dặt.' },
    { myth: 'Không thấy ai nghĩa là đã chứng minh không có ai.', truth: 'Không gian tìm kiếm — tần số, hướng, thời gian, kiểu tín hiệu — mới được quét một phần rất nhỏ.' },
  ],
  sources: [
    { text: 'E. M. Jones (1985), “Where is everybody?” An account of Fermi’s question, Los Alamos LA-10311-MS', url: 'https://www.osti.gov/biblio/5746675' },
    { text: 'M. H. Hart (1975), An explanation for the absence of extraterrestrials on Earth, QJRAS 16, 128', url: 'https://ui.adsabs.harvard.edu/abs/1975QJRAS..16..128H' },
    { text: 'R. Hanson (1998), The Great Filter — are we almost past it?', url: 'https://mason.gmu.edu/~rhanson/greatfilter.html' },
    { text: 'J. A. Ball (1973), The zoo hypothesis, Icarus 19, 347', url: 'https://ui.adsabs.harvard.edu/abs/1973Icar...19..347B/abstract' },
    { text: 'Sandberg, Drexler & Ord (2018), Dissolving the Fermi paradox — arXiv:1806.02404', url: 'https://arxiv.org/abs/1806.02404' },
    { text: 'Méndez và cộng sự (2024), An astrophysical explanation for the Wow! signal — arXiv:2408.08513', url: 'https://arxiv.org/abs/2408.08513' },
    { text: 'UC Berkeley (2015) — Breakthrough Listen', url: 'https://news.berkeley.edu/2015/07/20/breakthrough-search-for-extraterrestrial-intelligence/' },
    { text: 'ESO (2025), ann25001 — lịch ELT', url: 'https://eso.org/public/announcements/ann25001/' },
    { text: 'NASA — Habitable Worlds Observatory', url: 'https://science.nasa.gov/astrophysics/programs/habitable-worlds-observatory/' },
  ],
};
