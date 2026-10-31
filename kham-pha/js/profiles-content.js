// Nội dung hồ sơ các hành tinh (C2). Nguồn: research/su-menh-hanh-tinh.md, research/thong-so-hanh-tinh.md.
// Ảnh tàu vũ trụ: tải từ Wikimedia Commons (Special:FilePath); nếu không tải được, trang hiện ảnh dựng từ texture.

export const PROFILES = {
  mercury: {
    hook: 'Từ lúc Mặt Trời mọc tới lần mọc kế tiếp trên Sao Thuỷ mất 176 ngày Trái Đất, dài bằng hai năm của chính hành tinh này.',
    points: [
      ['Cộng hưởng 3 : 2', 'Sao Thuỷ tự quay đúng ba vòng trong mỗi hai vòng quanh Mặt Trời. Quan sát radar từ đài Arecibo năm 1965 phát hiện điều này, xoá bỏ giả định cũ rằng hành tinh luôn quay một mặt về phía Mặt Trời.'],
      ['Nhiệt độ chênh lệch lớn nhất', 'Gần như không có khí quyển giữ nhiệt, bề mặt nóng tới khoảng 430 °C vào ban ngày và xuống khoảng −180 °C vào ban đêm.'],
      ['Băng nước gần Mặt Trời nhất', 'Năm 2012, tàu MESSENGER xác nhận có băng nước trong các hố va chạm ở vùng cực bắc, nơi đáy hố không bao giờ nhận ánh nắng.'],
      ['Một từ trường bất ngờ', 'Dù nhỏ và quay chậm, Sao Thuỷ có từ trường toàn cầu, do Mariner 10 phát hiện năm 1974. Điều này cho thấy lõi sắt của nó vẫn còn một phần nóng chảy.'],
    ],
    missions: [
      ['1974–1975', 'Mariner 10 (NASA)', 'Tàu đầu tiên tới Sao Thuỷ; ba lần bay ngang, chụp gần một nửa bề mặt.'],
      ['2011–2015', 'MESSENGER (NASA)', 'Tàu đầu tiên bay quanh Sao Thuỷ; lập bản đồ toàn cầu, tìm thấy băng ở cực.'],
      ['2018 →', 'BepiColombo (ESA – JAXA)', 'Hai tàu quỹ đạo; dự kiến vào quỹ đạo tháng 11/2026.'],
    ],
    photo: { file: 'Mercury_in_color_-_Prockter07_centered.jpg', credit: 'NASA/Johns Hopkins University Applied Physics Laboratory/Carnegie Institution of Washington', note: 'MESSENGER, màu tăng cường, 2008' },
  },
  venus: {
    hook: 'Một ngày trên Sao Kim dài hơn một năm của nó: hành tinh tự quay ngược chiều một vòng mất 243 ngày Trái Đất, trong khi đi hết quỹ đạo chỉ mất 224,7 ngày.',
    points: [
      ['Nóng nhất hệ Mặt Trời', 'Bề mặt nóng khoảng 464 °C, nóng hơn cả Sao Thuỷ dù xa Mặt Trời gấp gần hai lần. Nguyên nhân là hiệu ứng nhà kính của bầu khí quyển gồm khoảng 96 % CO₂.'],
      ['Áp suất 92 bar', 'Áp suất khí quyển ở bề mặt gấp khoảng 92 lần Trái Đất, tương đương áp suất ở độ sâu gần 900 m dưới mặt biển.'],
      ['Tự quay ngược', 'Sao Kim quay theo chiều ngược với hầu hết các hành tinh: trên đó, Mặt Trời mọc ở phía tây. Một ngày Mặt Trời ở đó dài khoảng 117 ngày Trái Đất.'],
      ['Mây axit, gió siêu tốc', 'Các tầng mây axit sulfuric ở trên cao trôi hết một vòng quanh hành tinh chỉ trong khoảng 4 ngày, nhanh hơn chính hành tinh tới khoảng 60 lần.'],
    ],
    missions: [
      ['1962', 'Mariner 2 (NASA)', 'Lần bay ngang hành tinh khác thành công đầu tiên.'],
      ['1970', 'Venera 7 (Liên Xô)', 'Lần hạ cánh mềm đầu tiên lên một hành tinh khác và truyền dữ liệu từ bề mặt.'],
      ['1982', 'Venera 13 (Liên Xô)', 'Ảnh màu đầu tiên từ bề mặt Sao Kim.'],
      ['1990–1994', 'Magellan (NASA)', 'Lập bản đồ radar khoảng 98 % bề mặt.'],
      ['2015–2024', 'Akatsuki (JAXA)', 'Nghiên cứu khí quyển; mất liên lạc năm 2024, kết thúc chính thức năm 2025.'],
    ],
    photo: { file: 'PIA23791-Venus-NewlyProcessedView-20200608.jpg', credit: 'NASA/JPL-Caltech', note: 'Mariner 10, 1974, xử lý lại năm 2020' },
  },
  earth: {
    hook: 'Trong ảnh "Pale Blue Dot" do Voyager 1 chụp ngày 14/2/1990 từ khoảng 6 tỉ km, toàn bộ Trái Đất chiếm chưa tới một điểm ảnh.',
    points: [
      ['Hành tinh đặc nhất', 'Với mật độ trung bình 5 514 kg/m³, Trái Đất là hành tinh đặc nhất hệ Mặt Trời.'],
      ['Nước lỏng trên bề mặt', 'Đại dương phủ khoảng 71 % bề mặt. Trái Đất là thiên thể duy nhất đã biết có nước lỏng ổn định trên bề mặt và có sự sống.'],
      ['Một vệ tinh lớn bất thường', 'Mặt Trăng có đường kính bằng khoảng 27 % đường kính Trái Đất, tỉ lệ lớn nhất giữa vệ tinh và hành tinh trong số các hành tinh.'],
      ['Từ quyển che chắn', 'Lõi sắt lỏng tạo ra từ trường làm lệch hướng phần lớn gió Mặt Trời, giúp khí quyển không bị bào mòn.'],
    ],
    missions: [
      ['1958', 'Explorer 1 (Hoa Kỳ)', 'Phát hiện các vành đai bức xạ Van Allen.'],
      ['1972', 'Apollo 17', 'Ảnh "The Blue Marble": Trái Đất nhìn trọn vẹn và được chiếu sáng đầy đủ.'],
      ['1972 →', 'Landsat', 'Chuỗi ảnh vệ tinh quan sát mặt đất dài nhất.'],
      ['1990', 'Voyager 1', 'Ảnh "Pale Blue Dot" từ khoảng 6 tỉ km.'],
    ],
    photo: { file: 'The_Earth_seen_from_Apollo_17.jpg', credit: 'NASA', note: 'Apollo 17, 7/12/1972 (AS17-148-22727)' },
  },
  mars: {
    hook: 'Olympus Mons trên Sao Hoả cao khoảng 22 km so với mực chuẩn của hành tinh, gần gấp ba đỉnh Everest; chân núi rộng khoảng 600 km.',
    points: [
      ['Núi lửa và hẻm vực khổng lồ', 'Olympus Mons là núi lửa lớn nhất đã biết trong hệ Mặt Trời. Hệ hẻm vực Valles Marineris dài hơn 4 000 km, có đoạn sâu khoảng 7 km.'],
      ['Dấu vết của nước', 'Lòng sông cạn, châu thổ và khoáng vật sét cho thấy nước lỏng từng chảy trên bề mặt. Xe tự hành Curiosity xác định hố Gale từng là một hồ nước có điều kiện phù hợp cho sự sống vi sinh.'],
      ['Khí quyển rất mỏng', 'Áp suất bề mặt chỉ khoảng 0,6 % áp suất trên Trái Đất; khí quyển gồm chủ yếu CO₂.'],
      ['Màu đỏ của gỉ sắt', 'Màu đỏ đến từ bụi chứa oxide sắt phủ khắp bề mặt.'],
    ],
    missions: [
      ['1965', 'Mariner 4 (NASA)', 'Những ảnh cận cảnh đầu tiên: một bề mặt đầy hố va chạm.'],
      ['1976', 'Viking 1 & 2 (NASA)', 'Hạ cánh, chụp ảnh bề mặt và làm thí nghiệm sinh học đầu tiên.'],
      ['2012 →', 'Curiosity (NASA)', 'Khảo sát hố Gale.'],
      ['2021 →', 'Perseverance & Ingenuity (NASA)', 'Thu mẫu đá ở hố Jezero; Ingenuity là chuyến bay có động cơ đầu tiên trên hành tinh khác (72 chuyến).'],
      ['2021', 'Thiên Vấn 1 & Chúc Dung (CNSA)', 'Trung Quốc đưa xe tự hành lên Sao Hoả.'],
    ],
    photo: { file: 'Mars_Valles_Marineris.jpeg', credit: 'NASA/JPL-Caltech/USGS', note: 'Ghép ảnh Viking Orbiter' },
  },
  jupiter: {
    hook: 'Vết Đỏ Lớn trên Sao Mộc đang co lại: cuối thế kỷ 19 nó rộng khoảng 41 000 km; năm 2014, kính Hubble đo được khoảng 16 500 km, vẫn rộng hơn Trái Đất.',
    points: [
      ['Lớn hơn tất cả cộng lại', 'Khối lượng Sao Mộc lớn gấp khoảng 2,5 lần tổng khối lượng của mọi hành tinh khác cộng lại.'],
      ['Ngày ngắn nhất', 'Sao Mộc tự quay một vòng chỉ trong khoảng 9,9 giờ, nhanh nhất trong các hành tinh, khiến nó phình ra ở xích đạo.'],
      ['Một lõi "loãng"', 'Dữ liệu trọng trường của tàu Juno cho thấy các nguyên tố nặng trải rộng tới khoảng một nửa bán kính hành tinh, thay vì tập trung thành một lõi đặc gọn.'],
      ['Một thế giới của vệ tinh', 'Io có núi lửa hoạt động mạnh nhất hệ Mặt Trời; Europa và Ganymede có đại dương nước mặn dưới lớp băng.'],
    ],
    missions: [
      ['1973', 'Pioneer 10 (NASA)', 'Tàu đầu tiên vượt vành đai tiểu hành tinh và bay ngang Sao Mộc.'],
      ['1979', 'Voyager 1 & 2 (NASA)', 'Phát hiện núi lửa đang hoạt động trên Io.'],
      ['1995–2003', 'Galileo (NASA)', 'Thả đầu dò khí quyển đầu tiên; bằng chứng đại dương dưới băng của Europa.'],
      ['2016 →', 'Juno (NASA)', 'Bay quanh hai cực, đo cấu trúc bên trong.'],
      ['2030–2031', 'Europa Clipper (NASA), JUICE (ESA)', 'Đang trên đường tới; nghiên cứu các vệ tinh băng.'],
    ],
    photo: { file: 'Jupiter_and_its_shrunken_Great_Red_Spot.jpg', credit: 'NASA, ESA, A. Simon (Goddard Space Flight Center)', note: 'Kính Hubble, 2014' },
  },
  saturn: {
    hook: 'Mật độ trung bình của Sao Thổ chỉ khoảng 687 kg/m³, thấp hơn nước: đây là hành tinh duy nhất có mật độ nhỏ hơn nước.',
    points: [
      ['Vành đai của băng', 'Vành đai rộng hơn 270 000 km nhưng ở phần lớn các vùng chỉ dày khoảng 10 m tới 1 km, cấu tạo chủ yếu từ các mảnh băng nước.'],
      ['Tuổi của vành đai còn tranh luận', 'Bụi do Cassini đo gợi ý vành đai trẻ, dưới 400 triệu năm (Kempf và cộng sự, 2023); một nghiên cứu năm 2024 phản biện rằng vành đai có thể chỉ "trông trẻ" và đã tồn tại hàng tỉ năm.'],
      ['Enceladus phun nước', 'Cassini phát hiện các tia hơi nước và hạt băng phun ra từ cực nam của vệ tinh Enceladus, bằng chứng về một đại dương ngầm.'],
      ['Titan, mặt trăng có hồ', 'Titan có khí quyển dày hơn Trái Đất và các hồ methane, ethane lỏng trên bề mặt.'],
    ],
    missions: [
      ['1979', 'Pioneer 11 (NASA)', 'Tàu đầu tiên tới Sao Thổ.'],
      ['1980–1981', 'Voyager 1 & 2 (NASA)', 'Ảnh chi tiết vành đai và bầu khí quyển dày của Titan.'],
      ['2004–2017', 'Cassini–Huygens (NASA – ESA – ASI)', '13 năm bay quanh Sao Thổ; Huygens hạ cánh xuống Titan năm 2005.'],
      ['2028 →', 'Dragonfly (NASA)', 'Thiết bị bay sẽ khảo sát Titan, dự kiến tới năm 2034.'],
    ],
    photo: { file: 'Saturn_during_Equinox.jpg', credit: 'NASA/JPL/Space Science Institute', note: 'Cassini, 2008' },
  },
  uranus: {
    hook: 'Trục quay của Sao Thiên Vương nghiêng khoảng 98°: hành tinh gần như lăn trên quỹ đạo, và mỗi cực lần lượt trải qua khoảng 42 năm ban ngày rồi 42 năm ban đêm.',
    points: [
      ['Hành tinh băng khổng lồ', 'Bên dưới khí quyển hydro, heli và methane là một lớp dày gồm nước, amoniac và methane ở trạng thái đặc, nóng; methane hấp thụ ánh sáng đỏ nên hành tinh có màu xanh lục lam.'],
      ['Lạnh nhất', 'Nhiệt độ khí quyển xuống tới khoảng −224 °C, thấp nhất trong các hành tinh, dù Sao Hải Vương ở xa hơn.'],
      ['Chỉ một lần bay ngang', 'Gần như mọi số liệu cận cảnh đến từ Voyager 2 năm 1986. Năm 2024, một nghiên cứu cho thấy lần bay ngang đó trùng với lúc gió Mặt Trời ép từ quyển, một trạng thái chỉ xảy ra dưới 5 % thời gian.'],
      ['Hành tinh đầu tiên tìm thấy qua kính thiên văn', 'William Herschel phát hiện Sao Thiên Vương ngày 13/3/1781.'],
    ],
    missions: [
      ['1986', 'Voyager 2 (NASA)', 'Lần duy nhất một tàu vũ trụ tới gần: phát hiện vệ tinh và vành đai mới.'],
      ['2023', 'Kính JWST', 'Ảnh hồng ngoại của vành đai và vùng cực.'],
      ['Tương lai', 'Uranus Orbiter and Probe', 'Được Viện Hàn lâm Quốc gia Hoa Kỳ xếp ưu tiên hàng đầu (2022); chưa được cấp kinh phí.'],
    ],
    photo: { file: 'Uranus2.jpg', credit: 'NASA/JPL', note: 'Voyager 2, 1986' },
  },
  neptune: {
    hook: 'Sao Hải Vương được tìm ra bằng toán học trước khi được nhìn thấy: Le Verrier tính ra vị trí của nó, và Galle quan sát thấy ngày 23/9/1846.',
    points: [
      ['Gió mạnh nhất', 'Voyager 2 đo được gió trên Sao Hải Vương đạt khoảng 2 000 km/h, mạnh nhất trong các hành tinh.'],
      ['Một năm dài 165 năm', 'Sao Hải Vương cần khoảng 165 năm Trái Đất để đi hết một vòng quỹ đạo; năm 2011 nó mới hoàn thành vòng đầu tiên kể từ khi được phát hiện.'],
      ['Triton đi ngược', 'Vệ tinh lớn nhất, Triton, quay quanh hành tinh theo chiều ngược; nhiều khả năng đây là một thiên thể của vành đai Kuiper bị bắt giữ.'],
      ['Mạch phun băng', 'Voyager 2 chụp được các mạch phun khí nitơ trên bề mặt Triton.'],
    ],
    missions: [
      ['1989', 'Voyager 2 (NASA)', 'Lần duy nhất một tàu vũ trụ tới gần: phát hiện Vết Tối Lớn và các mạch phun trên Triton.'],
      ['1994 →', 'Kính Hubble', 'Thấy Vết Tối Lớn đã biến mất; theo dõi các cơn bão mới.'],
      ['2022', 'Kính JWST', 'Ảnh hồng ngoại rõ nhất về vành đai trong nhiều thập kỷ.'],
    ],
    photo: { file: 'Neptune_Full_Disk_View_-_GPN-2000-000443.jpg', credit: 'NASA/JPL', note: 'Voyager 2, 1989' },
  },
  pluto: {
    hook: '"Trái tim" trên Sao Diêm Vương là một đồng bằng băng nitơ rộng khoảng 1 000 km, Sputnik Planitia, và lớp băng ấy vẫn đang đối lưu chậm.',
    points: [
      ['Một thế giới còn hoạt động', 'Bề mặt Sputnik Planitia gần như không có hố va chạm, cho thấy nó rất trẻ về địa chất. Núi băng nước cao vài kilomét nổi lên quanh đồng bằng.'],
      ['Hệ hành tinh đôi', 'Charon có đường kính khoảng 1 212 km, hơn một nửa Sao Diêm Vương (2 377 km); hai thiên thể quay quanh một khối tâm nằm ngoài Sao Diêm Vương.'],
      ['Khí quyển mỏng nhiều tầng', 'New Horizons thấy một khí quyển nitơ rất mỏng với nhiều lớp sương mù màu xanh.'],
    ],
    missions: [
      ['1930', 'Clyde Tombaugh', 'Phát hiện Sao Diêm Vương tại Đài thiên văn Lowell.'],
      ['2015', 'New Horizons (NASA)', 'Bay ngang ngày 14/7/2015 ở độ cao khoảng 12 500 km.'],
      ['2019', 'New Horizons', 'Bay ngang thiên thể vành đai Kuiper Arrokoth.'],
    ],
    photo: { file: 'Pluto_in_True_Color_-_High-Res.jpg', credit: 'NASA/Johns Hopkins University Applied Physics Laboratory/Southwest Research Institute', note: 'New Horizons, 14/7/2015' },
  },
};

export const IAU_2006 = {
  title: 'Vì sao Sao Diêm Vương không còn là hành tinh?',
  text: [
    'Ngày 24/8/2006, Đại hội đồng lần thứ 26 của Hiệp hội Thiên văn Quốc tế (IAU) tại Praha thông qua định nghĩa hành tinh. Một hành tinh phải (1) quay quanh Mặt Trời, (2) đủ khối lượng để lực hấp dẫn của chính nó kéo nó thành dạng gần cầu, và (3) đã dọn sạch vùng lân cận quỹ đạo.',
    'Sao Diêm Vương thoả hai điều kiện đầu nhưng không thoả điều kiện thứ ba: quỹ đạo của nó nằm giữa vô số thiên thể băng của vành đai Kuiper. Theo Nghị quyết 6A, nó được xếp vào nhóm hành tinh lùn (dwarf planet). Trước đó một năm, việc phát hiện Eris, một thiên thể ở xa hơn và nặng hơn Sao Diêm Vương, đã buộc giới thiên văn phải trả lời câu hỏi "thế nào là một hành tinh".',
  ],
  source: 'IAU, Resolutions B5 & B6 (2006), thông cáo báo chí iau0603',
};

export const commonsUrl = (file, width = 800) =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(file)}?width=${width}`;
export const commonsPage = (file) => `https://commons.wikimedia.org/wiki/File:${encodeURIComponent(file)}`;
