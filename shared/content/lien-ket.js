// Liên kết hai chiều Khám phá ↔ Thấu hiểu.
// Hồ sơ hành tinh bên Khám phá (#ho-so-<id>) → các thẻ khái niệm liên quan bên Thấu hiểu (#k/<id>).
// Chiều ngược lại khai báo trong trường `khamPha` của từng thẻ (thau-hieu/content/chNN.js).
export const PLANET_CONCEPTS = {
  mercury: ['dinh-luat-kepler', 'tuong-doi-tong-quat', 'van-vat-hap-dan'],
  venus: ['vung-song-duoc', 'quang-pho', 'kinh-thien-van-khong-gian'],
  earth: ['don-vi-thien-van', 'luc-thuy-trieu', 'van-toc-vu-tru', 'vung-song-duoc'],
  mars: ['dinh-luat-kepler', 'sinh-hoc-vu-tru', 'vung-song-duoc'],
  jupiter: ['van-vat-hap-dan', 'diem-lagrange', 'ngoai-hanh-tinh', 'luc-thuy-trieu'],
  saturn: ['luc-thuy-trieu', 'sinh-hoc-vu-tru', 'dinh-luat-kepler'],
  uranus: ['dinh-luat-kepler', 'van-vat-hap-dan'],
  neptune: ['don-vi-thien-van', 'van-vat-hap-dan', 'nhin-ve-qua-khu'],
  pluto: ['dinh-luat-kepler', 'nam-anh-sang'],
};
