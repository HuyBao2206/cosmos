// Hằng số và hàm vật lý dùng chung cho các minh hoạ (web Thấu hiểu, Khảo luận…).
// Mỗi hàm có test trong tests/physics.test.mjs. Nguồn hằng số ghi ngay bên cạnh.

export const C = 299_792_458;                    // m/s — tốc độ ánh sáng (định nghĩa SI)
export const AU = 149_597_870_700;               // m — IAU 2012 B2 (chính xác)
export const JULIAN_YEAR = 365.25 * 86_400;      // s — năm Julius (IAU)
export const LY = C * JULIAN_YEAR;               // m — năm ánh sáng = 9 460 730 472 580 800 m
export const PC = (648_000 / Math.PI) * AU;      // m — parsec (IAU 2015 B2, ngầm định 648 000/π au)
export const G = 6.674_30e-11;                   // m³ kg⁻¹ s⁻² — CODATA 2018
export const SIGMA_SB = 5.670_374_419e-8;        // W m⁻² K⁻⁴ — hằng số Stefan–Boltzmann (CODATA 2018, chính xác)
export const M_SUN = 1.988_4e30;                 // kg — IAU 2015 B3 (GM☉ / G)
export const L_SUN = 3.828e26;                   // W — độ trưng danh định, IAU 2015 B3
export const R_SUN = 6.957e8;                    // m — bán kính danh định, IAU 2015 B3
export const T_SUN = 5772;                       // K — nhiệt độ hiệu dụng danh định, IAU 2015 B3
export const M_EARTH = 5.972_2e24;               // kg — NSSDCA
export const R_EARTH = 6.371e6;                  // m — bán kính trung bình

/* ——— Khoảng cách & đơn vị ——— */
/** Khoảng cách (pc) từ góc thị sai p (giây cung): d = 1/p */
export const parallaxToPc = (pArcsec) => 1 / pArcsec;
/** Góc thị sai (giây cung) của một vật ở khoảng cách d (pc) */
export const pcToParallax = (dPc) => 1 / dPc;
/** Thời gian ánh sáng (giây) để đi quãng đường m mét */
export const lightTime = (meters) => meters / C;
export const auToM = (au) => au * AU;
export const lyToM = (ly) => ly * LY;
export const pcToLy = (pc) => (pc * PC) / LY;
export const lyToPc = (ly) => (ly * LY) / PC;

/** Mô-đun khoảng cách: d (pc) từ cấp sao biểu kiến m và tuyệt đối M (bỏ qua bụi che khuất) */
export const distanceModulusToPc = (m, M) => Math.pow(10, (m - M + 5) / 5);
/** Cấp sao biểu kiến của một vật cấp tuyệt đối M ở khoảng cách d (pc) */
export const apparentMag = (M, dPc) => M + 5 * Math.log10(dPc) - 5;
/** Định luật nghịch đảo bình phương: thông lượng (W/m²) cách nguồn L (W) một khoảng d (m) */
export const flux = (L, dM) => L / (4 * Math.PI * dM * dM);
/** Ngược lại: khoảng cách (m) từ độ trưng L và thông lượng đo được F */
export const distanceFromFlux = (L, F) => Math.sqrt(L / (4 * Math.PI * F));

/* ——— Sao biến quang Cepheid ———
 * Quan hệ chu kỳ – độ trưng dải V, hiệu chuẩn bằng thị sai Hipparcos (Lanoix, Paturel & Garnier 1999,
 * arXiv:astro-ph/9904298): ⟨M_V⟩ = −2,77 log₁₀P − 1,44 (P tính bằng ngày). Dùng cho minh hoạ, sai số ~0,1–0,2 cấp sao. */
export const cepheidAbsMag = (periodDays) => -2.77 * Math.log10(periodDays) - 1.44;
/** Cấp sao tuyệt đối dải V của Mặt Trời ≈ +4,83 → đổi M_V sang độ trưng theo L☉ (xấp xỉ, bỏ qua hiệu chỉnh nhiệt xạ) */
export const M_V_SUN = 4.83;
export const magToLsun = (M) => Math.pow(10, (M_V_SUN - M) / 2.5);

/* ——— Sao trên dãy chính (xấp xỉ giáo khoa, dùng cho minh hoạ) ———
 * Quan hệ từng đoạn quen thuộc (số mũ 2,3 / 4 / 3,5 / 1); L ∝ M^3,5 chỉ đúng khoảng 2–55 M☉. */
export function msLuminosity(mSun) {
  if (mSun < 0.43) return 0.23 * Math.pow(mSun, 2.3);
  if (mSun < 2) return Math.pow(mSun, 4);
  if (mSun < 55) return 1.4 * Math.pow(mSun, 3.5);
  return 32_000 * mSun;
}
/** Bán kính dãy chính (R☉), xấp xỉ R ∝ M^0,8 (M ≤ 1) và M^0,57 (M > 1) */
export const msRadius = (mSun) => (mSun <= 1 ? Math.pow(mSun, 0.8) : Math.pow(mSun, 0.57));
/** Nhiệt độ hiệu dụng (K) từ độ trưng và bán kính theo định luật Stefan–Boltzmann: L = 4πR²σT⁴ */
export const teff = (lSun, rSun) => T_SUN * Math.pow(lSun / (rSun * rSun), 0.25);
/** Thời gian sống trên dãy chính (năm): t ≈ 10 tỷ năm × M/L (nhiên liệu tỉ lệ khối lượng, tốc độ đốt tỉ lệ độ trưng).
 *  Với sao rất nặng, sàn ~3 triệu năm (quan sát: sao 40–100 M☉ sống ~3–5 triệu năm). */
export const msLifetime = (mSun) => Math.max(3e6, 1e10 * mSun / msLuminosity(mSun));

/** Kết cục theo khối lượng ban đầu (xấp xỉ, phụ thuộc độ kim loại & tốc độ mất khối lượng) */
export function stellarFate(mSun) {
  if (mSun < 0.08) return 'brown-dwarf';
  if (mSun < 8) return 'white-dwarf';
  if (mSun < 20) return 'neutron-star';
  return 'black-hole';
}

/* ——— Vật thể đặc ——— */
export const CHANDRASEKHAR = 1.44;               // M☉ — giới hạn khối lượng sao lùn trắng (áp suất suy biến electron)
/** Mật độ trung bình (kg/m³) của một quả cầu khối lượng M (kg), bán kính R (m) */
export const meanDensity = (M, R) => M / ((4 / 3) * Math.PI * R ** 3);
/** Bán kính Schwarzschild (m): r_s = 2GM/c² */
export const schwarzschildRadius = (M) => (2 * G * M) / (C * C);
/** Vận tốc thoát (m/s) khỏi bề mặt bán kính r của vật khối lượng M */
export const escapeVelocity = (M, r) => Math.sqrt((2 * G * M) / r);
/** Vận tốc quỹ đạo tròn (m/s) ở bán kính r */
export const circularVelocity = (M, r) => Math.sqrt((G * M) / r);

/* ——— Hình thành sao ——— */
export const K_B = 1.380_649e-23;                 // J/K — hằng số Boltzmann (SI, chính xác)
export const M_H = 1.673_533e-27;                 // kg — khối lượng nguyên tử hydro
/** Khối lượng Jeans (kg): M_J = (5kT / (G μ m_H))^{3/2} · (3 / (4πρ))^{1/2}, với ρ = n μ m_H.
 *  T (K), n (hạt/cm³), μ khối lượng hạt trung bình (≈ 2,33 cho khí phân tử). Dạng giáo trình (Carroll & Ostlie, ch. 12). */
export function jeansMass(T, nPerCm3, mu = 2.33) {
  const rho = nPerCm3 * 1e6 * mu * M_H;
  return Math.pow((5 * K_B * T) / (G * mu * M_H), 1.5) * Math.sqrt(3 / (4 * Math.PI * rho));
}
/** Thời gian rơi tự do (s): t_ff = √(3π / (32 G ρ)) — thang thời gian co sụp của đám mây không có áp suất cản */
export const freeFallTime = (nPerCm3, mu = 2.33) => Math.sqrt((3 * Math.PI) / (32 * G * nPerCm3 * 1e6 * mu * M_H));

/* ——— Sao lùn trắng ——— */
/** Quan hệ khối lượng – bán kính sao lùn trắng (Nauenberg 1972, ApJ 175, 417), μ_e = 2 (carbon–oxy):
 *  R/R☉ ≈ 0,0112 (M/M₃)^{−1/3} [1 − (M/M₃)^{4/3}]^{1/2}, M₃ = 5,816/μ_e² ≈ 1,454 M☉. Nặng hơn ⇒ nhỏ hơn. */
export const WD_M3 = 5.816 / 4;
export function wdRadius(mSun) {
  const x = mSun / WD_M3;
  if (x >= 1) return 0;
  return 0.0112 * Math.pow(x, -1 / 3) * Math.sqrt(1 - Math.pow(x, 4 / 3));
}

/* ——— Sao neutron ——— */
/** Vận tốc dài tại xích đạo (m/s) của vật bán kính r (m) quay với chu kỳ P (s) */
export const equatorialSpeed = (r, P) => (2 * Math.PI * r) / P;
