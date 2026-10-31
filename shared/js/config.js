// Cấu hình chung của site. Mở cửa một web con: đổi `open: true`.
export const SITE = {
  name: 'Into the Cosmos',
  by: 'by HUB',
  updated: '10/2026', // "Cập nhật: tháng MM/YYYY" mặc định; từng trang có thể ghi đè bằng <html data-updated="...">
  bio: 'https://huybao2206.github.io/hubcuteee/',
};

export const SECTIONS = [
  { id: 'kham-pha',  label: 'Khám phá vũ trụ',  short: 'Khám phá',  open: true },
  { id: 'thau-hieu', label: 'Thấu hiểu vũ trụ', short: 'Thấu hiểu', open: false },
  { id: 'khao-luan', label: 'Khảo luận vũ trụ', short: 'Khảo luận', open: false },
];
