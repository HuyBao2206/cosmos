// Vị trí gần đúng của các hành tinh theo tham số quỹ đạo Kepler.
// Nguồn: E. M. Standish, "Keplerian Elements for Approximate Positions of the
// Major Planets", JPL Solar System Dynamics (https://ssd.jpl.nasa.gov/planets/approx_pos.html).
// Bảng 1: 1800–2050; Bảng 2a/2b: 3000 TCN – 3000 SCN (có số hạng hiệu chỉnh b, c, s, f).
// Kết quả: toạ độ nhật tâm, mặt phẳng hoàng đạo J2000, đơn vị AU.
// Module thuần, không phụ thuộc DOM: dùng được trong trình duyệt và Node (tests/).

const DEG = Math.PI / 180;

// [a (AU), e, I (°), L (°), ϖ (°), Ω (°)] và tốc độ thay đổi mỗi thế kỷ Julius
export const TABLE1 = {
  mercury: [[0.38709927, 0.20563593, 7.00497902, 252.25032350, 77.45779628, 48.33076593],
            [0.00000037, 0.00001906, -0.00594749, 149472.67411175, 0.16047689, -0.12534081]],
  venus:   [[0.72333566, 0.00677672, 3.39467605, 181.97909950, 131.60246718, 76.67984255],
            [0.00000390, -0.00004107, -0.00078890, 58517.81538729, 0.00268329, -0.27769418]],
  earth:   [[1.00000261, 0.01671123, -0.00001531, 100.46457166, 102.93768193, 0.0],
            [0.00000562, -0.00004392, -0.01294668, 35999.37244981, 0.32327364, 0.0]],
  mars:    [[1.52371034, 0.09339410, 1.84969142, -4.55343205, -23.94362959, 49.55953891],
            [0.00001847, 0.00007882, -0.00813131, 19140.30268499, 0.44441088, -0.29257343]],
  jupiter: [[5.20288700, 0.04838624, 1.30439695, 34.39644051, 14.72847983, 100.47390909],
            [-0.00011607, -0.00013253, -0.00183714, 3034.74612775, 0.21252668, 0.20469106]],
  saturn:  [[9.53667594, 0.05386179, 2.48599187, 49.95424423, 92.59887831, 113.66242448],
            [-0.00125060, -0.00050991, 0.00193609, 1222.49362201, -0.41897216, -0.28867794]],
  uranus:  [[19.18916464, 0.04725744, 0.77263783, 313.23810451, 170.95427630, 74.01692503],
            [-0.00196176, -0.00004397, -0.00242939, 428.48202785, 0.40805281, 0.04240589]],
  neptune: [[30.06992276, 0.00859048, 1.77004347, -55.12002969, 44.96476227, 131.78422574],
            [0.00026291, 0.00005105, 0.00035372, 218.45945325, -0.32241464, -0.00508664]],
  pluto:   [[39.48211675, 0.24882730, 17.14001206, 238.92903833, 224.06891629, 110.30393684],
            [-0.00031596, 0.00005170, 0.00004818, 145.20780515, -0.04062942, -0.01183482]],
};

export const TABLE2 = {
  mercury: [[0.38709843, 0.20563661, 7.00559432, 252.25166724, 77.45771895, 48.33961819],
            [0.00000000, 0.00002123, -0.00590158, 149472.67486623, 0.15940013, -0.12214182]],
  venus:   [[0.72332102, 0.00676399, 3.39777545, 181.97970850, 131.76755713, 76.67261496],
            [-0.00000026, -0.00005107, 0.00043494, 58517.81560260, 0.05679648, -0.27274174]],
  earth:   [[1.00000018, 0.01673163, -0.00054346, 100.46691572, 102.93005885, -5.11260389],
            [-0.00000003, -0.00003661, -0.01337178, 35999.37306329, 0.31795260, -0.24123856]],
  mars:    [[1.52371243, 0.09336511, 1.85181869, -4.56813164, -23.91744784, 49.71320984],
            [0.00000097, 0.00009149, -0.00724757, 19140.29934243, 0.45223625, -0.26852431]],
  jupiter: [[5.20248019, 0.04853590, 1.29861416, 34.33479152, 14.27495244, 100.29282654],
            [-0.00002864, 0.00018026, -0.00322699, 3034.90371757, 0.18199196, 0.13024619]],
  saturn:  [[9.54149883, 0.05550825, 2.49424102, 50.07571329, 92.86136063, 113.63998702],
            [-0.00003065, -0.00032044, 0.00451969, 1222.11494724, 0.54179478, -0.25015002]],
  uranus:  [[19.18797948, 0.04685740, 0.77298127, 314.20276625, 172.43404441, 73.96250215],
            [-0.00020455, -0.00001550, -0.00180155, 428.49512595, 0.09266985, 0.05739699]],
  neptune: [[30.06952752, 0.00895439, 1.77005520, 304.22289287, 46.68158724, 131.78635853],
            [0.00006447, 0.00000818, 0.00022400, 218.46515314, 0.01009938, -0.00606302]],
  pluto:   [[39.48686035, 0.24885238, 17.14104260, 238.96535011, 224.09702598, 110.30167986],
            [0.00449751, 0.00006016, 0.00000501, 145.18042903, -0.00968827, -0.00809981]],
};

// Bảng 2b: hiệu chỉnh dị thường trung bình M += b·T² + c·cos(fT) + s·sin(fT)
export const TABLE2B = {
  jupiter: [-0.00012452, 0.06064060, -0.35635438, 38.35125000],
  saturn:  [0.00025899, -0.13434469, 0.87320147, 38.35125000],
  uranus:  [0.00058331, -0.97731848, 0.17689245, 7.67025000],
  neptune: [-0.00041348, 0.68346318, -0.10162547, 7.67025000],
  pluto:   [-0.01262724, 0, 0, 0],
};

export const PLANET_IDS = ['mercury', 'venus', 'earth', 'mars', 'jupiter', 'saturn', 'uranus', 'neptune', 'pluto'];

/** Ngày Julius (UT ≈ TT, sai khác ~69 s không đáng kể ở độ chính xác này) từ Date. */
export function julianDate(date) {
  return date.getTime() / 86400000 + 2440587.5;
}

export function dateFromJD(jd) {
  return new Date((jd - 2440587.5) * 86400000);
}

/** Giải phương trình Kepler M = E − e·sin E (rad), Newton–Raphson. */
export function solveKepler(M, e) {
  let E = M + e * Math.sin(M) * (1 + e * Math.cos(M));
  for (let i = 0; i < 30; i++) {
    const dE = (E - e * Math.sin(E) - M) / (1 - e * Math.cos(E));
    E -= dE;
    if (Math.abs(dE) < 1e-12) break;
  }
  return E;
}

function norm180(x) {
  x = x % 360;
  if (x > 180) x -= 360;
  if (x < -180) x += 360;
  return x;
}

/** Các phần tử quỹ đạo tại thời điểm jd. */
export function elementsAt(id, jd) {
  const T = (jd - 2451545.0) / 36525;
  const useT1 = jd >= 2378496.5 && jd <= 2470172.5; // 1800-01-01 … 2050-12-31
  const [el, rate] = (useT1 ? TABLE1 : TABLE2)[id];
  const a = el[0] + rate[0] * T;
  const e = el[1] + rate[1] * T;
  const I = el[2] + rate[2] * T;
  const L = el[3] + rate[3] * T;
  const varpi = el[4] + rate[4] * T;
  const Omega = el[5] + rate[5] * T;
  let M = L - varpi;
  if (!useT1 && TABLE2B[id]) {
    const [b, c, s, f] = TABLE2B[id];
    M += b * T * T + c * Math.cos(f * T * DEG) + s * Math.sin(f * T * DEG);
  }
  return { a, e, I, L, varpi, Omega, omega: varpi - Omega, M: norm180(M), T, table: useT1 ? 1 : 2 };
}

/** Toạ độ nhật tâm hoàng đạo J2000 (AU) của hành tinh tại ngày Julius jd. */
export function heliocentric(id, jd) {
  const k = elementsAt(id, jd);
  const E = solveKepler(k.M * DEG, k.e);
  const xp = k.a * (Math.cos(E) - k.e);
  const yp = k.a * Math.sqrt(1 - k.e * k.e) * Math.sin(E);
  const w = k.omega * DEG, O = k.Omega * DEG, I = k.I * DEG;
  const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
  return {
    x: (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
    y: (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
    z: (sw * sI) * xp + (cw * sI) * yp,
    r: k.a * (1 - k.e * Math.cos(E)),
  };
}

/** Các điểm trên quỹ đạo elip (đóng kín) tại thời điểm jd, dùng để vẽ vệt quỹ đạo. */
export function orbitPath(id, jd, n = 256) {
  const k = elementsAt(id, jd);
  const w = k.omega * DEG, O = k.Omega * DEG, I = k.I * DEG;
  const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
  const pts = [];
  for (let i = 0; i <= n; i++) {
    const E = (i / n) * 2 * Math.PI;
    const xp = k.a * (Math.cos(E) - k.e);
    const yp = k.a * Math.sqrt(1 - k.e * k.e) * Math.sin(E);
    pts.push([
      (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp,
      (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp,
      (sw * sI) * xp + (cw * sI) * yp,
    ]);
  }
  return pts;
}

/** Dị thường lệch tâm hiện tại (rad) — để biết hành tinh đang ở đâu trên vệt quỹ đạo. */
export function eccentricAnomaly(id, jd) {
  const k = elementsAt(id, jd);
  return solveKepler(k.M * DEG, k.e);
}

// ---------- Hướng trục quay ----------
// Cực bắc quay: xích kinh α0, xích vĩ δ0 (ICRF/J2000, độ) tại J2000 — IAU WGCCRE
// (Archinal et al. 2018, Celest. Mech. Dyn. Astr. 130:22).
// Chu kỳ tự quay sao (giờ) theo NASA NSSDCA Planetary Fact Sheet; dấu âm = tự quay ngược chiều
// so với cực "bắc" IAU. Sao Diêm Vương: IAU 2015 dùng quy tắc bàn tay phải nên chu kỳ dương,
// cực nằm phía nam mặt phẳng quỹ đạo (độ nghiêng > 90°, tức quay ngược).
export const ROTATION = {
  sun:     { ra: 286.13,     dec: 63.87,     period: 609.12 },
  mercury: { ra: 281.0103,   dec: 61.4155,   period: 1407.6 },
  venus:   { ra: 272.76,     dec: 67.16,     period: -5832.5 },
  earth:   { ra: 0.0,        dec: 90.0,      period: 23.9345 },
  mars:    { ra: 317.68143,  dec: 52.88650,  period: 24.6229 },
  jupiter: { ra: 268.056595, dec: 64.495303, period: 9.9250 },
  saturn:  { ra: 40.589,     dec: 83.537,    period: 10.656 },
  uranus:  { ra: 257.311,    dec: -15.175,   period: -17.24 },
  neptune: { ra: 299.36,     dec: 43.46,     period: 16.11 },
  pluto:   { ra: 132.993,    dec: -6.163,    period: 153.2928 },
};

const OBLIQ = 23.43928 * DEG; // độ nghiêng hoàng đạo J2000

/** Vector đơn vị cực quay trong hệ hoàng đạo J2000. */
export function poleEcliptic(id) {
  const { ra, dec } = ROTATION[id];
  const a = ra * DEG, d = dec * DEG;
  const x = Math.cos(d) * Math.cos(a), y = Math.cos(d) * Math.sin(a), z = Math.sin(d);
  return { x, y: y * Math.cos(OBLIQ) + z * Math.sin(OBLIQ), z: -y * Math.sin(OBLIQ) + z * Math.cos(OBLIQ) };
}

/** Pháp tuyến mặt phẳng quỹ đạo (hệ hoàng đạo J2000). */
export function orbitNormal(id, jd = 2451545.0) {
  const k = elementsAt(id, jd);
  const I = k.I * DEG, O = k.Omega * DEG;
  return { x: Math.sin(I) * Math.sin(O), y: -Math.sin(I) * Math.cos(O), z: Math.cos(I) };
}

/** Độ nghiêng trục so với pháp tuyến quỹ đạo, tính theo chiều tự quay (độ). >90° nghĩa là quay ngược. */
export function obliquity(id) {
  const p = poleEcliptic(id), n = orbitNormal(id);
  let dot = p.x * n.x + p.y * n.y + p.z * n.z;
  // Cực "dương" theo chiều tự quay (quy tắc bàn tay phải)
  if (ROTATION[id].period < 0) dot = -dot;
  return Math.acos(Math.max(-1, Math.min(1, dot))) / DEG;
}

export const AU_KM = 149597870.7;
export const C_KM_S = 299792.458;
/** Thời gian ánh sáng đi quãng đường r (AU), tính bằng giây. */
export const lightSeconds = (rAU) => (rAU * AU_KM) / C_KM_S;
