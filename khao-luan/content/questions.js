// Danh mục hồ sơ câu hỏi mở của "Khảo luận vũ trụ".
// - id: dùng trong URL #q/<id> và tên file nội dung content/q-<id>.js (nạp lười).
// - status: 'ready' (có nội dung) | 'draft' (hiện nhãn "Đang biên soạn").
// - labels: các nhãn mà thẻ bên Thấu hiểu đang dùng trong trường `khaoLuan` — để nối liên kết hai chiều.
// - thauHieu: id thẻ khái niệm nên đọc trước (bên /thau-hieu/).

export const LEVELS = [
  { id: 'refuted', label: 'Bị bác bỏ', color: '#8a857b', text: 'Bằng chứng đã loại bỏ ý tưởng này, ít nhất ở dạng ban đầu. Nó vẫn có giá trị lịch sử: biết vì sao một ý tưởng sai cũng là hiểu biết.' },
  { id: 'speculative', label: 'Suy đoán', color: '#e6a2a2', text: 'Có lập luận lý thuyết, nhưng chưa có bằng chứng quan sát trực tiếp; một số còn chưa rõ có thể kiểm chứng được hay không.' },
  { id: 'debated', label: 'Đang tranh luận', color: '#e8c37a', text: 'Có dữ liệu ủng hộ và có dữ liệu hay cách giải thích khác; các nhóm nghiên cứu chưa đi tới đồng thuận.' },
  { id: 'strong', label: 'Được ủng hộ mạnh', color: '#c9e09f', text: 'Nhiều bằng chứng độc lập cùng chỉ về một hướng, nhưng còn thiếu một phép thử quyết định hoặc còn chi tiết quan trọng chưa rõ.' },
  { id: 'established', label: 'Đã xác lập', color: '#9fe0b5', text: 'Được xác nhận bởi nhiều phép đo độc lập; cộng đồng khoa học coi là nền tảng, dù vẫn luôn có thể được tinh chỉnh.' },
];
export const levelOf = (id) => LEVELS.find((l) => l.id === id);

export const QUESTIONS = [
  { id: 'vat-chat-toi', num: 1, title: 'Vật chất tối là gì?', short: 'Hơn 80 % vật chất trong vũ trụ không phát sáng. Nó là hạt chưa biết, hay hấp dẫn cần được viết lại?', color: '#b79be6', labels: ['Vật chất tối là gì?'], thauHieu: ['vat-chat-toi', 'thau-kinh-hap-dan'], status: 'ready' },
  { id: 'nang-luong-toi', num: 2, title: 'Năng lượng tối là gì?', short: 'Thứ chiếm khoảng 68 % vũ trụ đang làm giãn nở tăng tốc — và có thể đang yếu dần.', color: '#9fb6ff', labels: ['Năng lượng tối là gì?'], thauHieu: ['nang-luong-toi', 'sieu-tan-tinh-ia'], status: 'ready' },
  { id: 'cang-thang-hubble', num: 3, title: 'Vì sao hai cách đo cho hai tốc độ giãn nở?', short: 'Căng thẳng Hubble: 67 hay 73 km/s/Mpc — sai số đo hay vật lý mới?', color: '#e6c27a', labels: ['Căng thẳng Hubble'], thauHieu: ['dinh-luat-hubble', 'thang-khoang-cach', 'cepheid'], status: 'ready' },
  { id: 'truoc-vu-no-lon', num: 4, title: 'Trước Vụ Nổ Lớn có gì?', short: 'Lạm phát, vũ trụ nảy, đa vũ trụ — và câu hỏi liệu thời gian có một điểm bắt đầu.', color: '#ffb07c', labels: ['Trước Vụ Nổ Lớn có gì?'], thauHieu: ['vu-no-lon', 'phong-vi-song'], status: 'ready' },
  { id: 'so-phan-vu-tru', num: 5, title: 'Vũ trụ sẽ kết thúc thế nào?', short: 'Nguội dần mãi mãi, bị xé toạc, hay co lại — câu trả lời nằm ở năng lượng tối.', color: '#ff8fa8', labels: ['Số phận cuối cùng của vũ trụ'], thauHieu: ['nang-luong-toi', 'sao-lun-trang', 'chan-troi-su-kien'], status: 'ready' },
  { id: 'vu-tru-vo-han', num: 6, title: 'Vũ trụ có vô hạn không?', short: 'Ta chỉ thấy được một vùng bán kính khoảng 46 tỷ năm ánh sáng. Bên ngoài là gì?', color: '#a6e8b8', labels: [], thauHieu: ['dinh-luat-hubble', 'phong-vi-song'], status: 'ready' },
  { id: 'ben-trong-ho-den', num: 7, title: 'Bên trong hố đen có gì?', short: 'Điểm kỳ dị, bức xạ Hawking và nghịch lý thông tin — nơi hai lý thuyết lớn nhất của vật lý va nhau.', color: '#c4a8ff', labels: [], thauHieu: ['chan-troi-su-kien', 'tuong-doi-tong-quat'], status: 'ready' },
  { id: 'co-don', num: 8, title: 'Chúng ta có cô đơn trong vũ trụ?', short: 'Hàng nghìn ngoại hành tinh, hàng trăm tỷ ngôi sao — và chưa một tín hiệu nào đứng vững. Nghịch lý Fermi.', color: '#7fe0d4', labels: ['Chúng ta có cô đơn trong vũ trụ?'], thauHieu: ['sinh-hoc-vu-tru', 'vung-song-duoc', 'ngoai-hanh-tinh'], status: 'ready' },
];
export const questionById = (id) => QUESTIONS.find((q) => q.id === id);
/** Tra hồ sơ theo nhãn mà bên Thấu hiểu dùng */
export const questionByLabel = (label) => QUESTIONS.find((q) => q.labels.includes(label));
export const contentFile = (q) => new URL(`./q-${q.id}.js`, import.meta.url).href;
