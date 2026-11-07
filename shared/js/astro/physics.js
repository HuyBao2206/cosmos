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

/* ═════════════ Chương 2 — Ánh sáng ═════════════ */
export const H_PLANCK = 6.626_070_15e-34;          // J·s — hằng số Planck (SI, chính xác)
export const EV = 1.602_176_634e-19;               // J — 1 electronvolt (SI, chính xác)
export const WIEN_B = 2.897_771_955e-3;            // m·K — hằng số dịch chuyển Wien (CODATA 2018)
/** Tần số (Hz) của bức xạ bước sóng λ (m): ν = c/λ */
export const frequency = (lambdaM) => C / lambdaM;
/** Năng lượng photon (eV): E = hc/λ */
export const photonEnergyEV = (lambdaM) => (H_PLANCK * C) / lambdaM / EV;
/** Bước sóng đỉnh (m) của vật đen nhiệt độ T (K) — định luật Wien: λ_max = b/T */
export const wienPeak = (T) => WIEN_B / T;
/** Định luật Planck: bức xạ phổ B_λ (W · sr⁻¹ · m⁻³) của vật đen nhiệt độ T ở bước sóng λ (m) */
export function planck(lambdaM, T) {
  const x = (H_PLANCK * C) / (lambdaM * K_B_ * T);
  if (x > 700) return 0;
  return (2 * H_PLANCK * C * C) / lambdaM ** 5 / Math.expm1(x);
}
const K_B_ = 1.380_649e-23;
/** Dịch chuyển đỏ Doppler tương đối tính của nguồn chuyển động dọc tầm nhìn với β = v/c (β > 0: ra xa) */
export const dopplerZ = (beta) => Math.sqrt((1 + beta) / (1 - beta)) - 1;
/** Ngược lại: β từ z (Doppler tương đối tính) */
export const betaFromZ = (z) => { const s = (1 + z) ** 2; return (s - 1) / (s + 1); };
/** Bước sóng quan sát được: λ_obs = λ_emit · (1 + z) */
export const observedWavelength = (lambda0, z) => lambda0 * (1 + z);
/** Độ phân giải giới hạn nhiễu xạ (giây cung) của gương đường kính D (m) ở bước sóng λ (m): θ ≈ 1,22 λ/D */
export const diffractionLimitArcsec = (lambdaM, D) => (1.22 * lambdaM / D) * (180 / Math.PI) * 3600;

/* ═════════════ Chương 3 — Hấp dẫn & chuyển động ═════════════ */
export const GM_EARTH = 3.986_004_418e14;          // m³/s² — IERS/WGS84
export const GM_SUN = 1.327_124_400_41e20;         // m³/s² — IAU 2015 B3 (danh định)
export const M_MOON = 7.346e22;                    // kg — NSSDCA
export const D_MOON = 3.844e8;                     // m — bán trục lớn quỹ đạo Mặt Trăng (NSSDCA)
/** Lực hấp dẫn Newton (N) giữa hai khối lượng m1, m2 (kg) cách nhau r (m) */
export const gravityForce = (m1, m2, r) => (G * m1 * m2) / (r * r);
/** Gia tốc trọng trường bề mặt (m/s²) */
export const surfaceGravity = (M, R) => (G * M) / (R * R);
/** Định luật Kepler 3 dạng Newton: chu kỳ (s) của quỹ đạo bán trục lớn a (m) quanh khối lượng tổng M (kg) */
export const orbitalPeriod = (a, M) => 2 * Math.PI * Math.sqrt((a ** 3) / (G * M));
/** Kepler 3 trong đơn vị Hệ Mặt Trời: T (năm) = a^{3/2} (a theo au, M theo M☉) */
export const periodYears = (aAU, mSun = 1) => Math.pow(aAU, 1.5) / Math.sqrt(mSun);
/** Vận tốc ở khoảng cách r trên quỹ đạo bán trục lớn a — phương trình vis-viva: v² = GM(2/r − 1/a) */
export const visViva = (GM, r, a) => Math.sqrt(GM * (2 / r - 1 / a));
/** Phân loại quỹ đạo từ vận tốc v ở khoảng cách r: năng lượng riêng ε = v²/2 − GM/r */
export function orbitType(GM, r, v) {
  const eps = (v * v) / 2 - GM / r;
  return eps < 0 ? 'bound' : eps === 0 ? 'parabolic' : 'escape';
}
/** Gia tốc thuỷ triều (m/s²) do khối lượng M ở khoảng cách d, tại điểm cách tâm vật chịu triều r (gần đúng r ≪ d): 2GMr/d³ */
export const tidalAccel = (M, d, r) => (2 * G * M * r) / d ** 3;
/** Vị trí 5 điểm Lagrange trong hệ quay của bài toán ba vật hạn chế, đơn vị = khoảng cách hai vật.
 *  μ = m2/(m1+m2). Vật 1 ở (−μ, 0), vật 2 ở (1−μ, 0). Trả về { L1:[x,y], …, L5 }. */
export function lagrangePoints(mu) {
  // đạo hàm của thế hiệu dụng theo x trên trục nối hai vật: f(x) = x − (1−μ)(x+μ)/|x+μ|³ − μ(x−1+μ)/|x−1+μ|³
  const f = (x) => {
    const r1 = x + mu, r2 = x - 1 + mu;
    return x - ((1 - mu) * r1) / Math.abs(r1) ** 3 - (mu * r2) / Math.abs(r2) ** 3;
  };
  const bisect = (a, b) => {
    let fa = f(a);
    for (let i = 0; i < 200; i++) {
      const m = (a + b) / 2, fm = f(m);
      if ((fm < 0) === (fa < 0)) { a = m; fa = fm; } else b = m;
    }
    return (a + b) / 2;
  };
  const e = 1e-9;
  return {
    L1: [bisect(-mu + e, 1 - mu - e), 0],
    L2: [bisect(1 - mu + e, 2), 0],
    L3: [bisect(-2, -mu - e), 0],
    L4: [0.5 - mu, Math.sqrt(3) / 2],
    L5: [0.5 - mu, -Math.sqrt(3) / 2],
  };
}
/** Xấp xỉ khoảng cách L1/L2 tới vật nhỏ: r ≈ a·(m/3M)^{1/3} (bán kính Hill) */
export const hillRadius = (a, m, M) => a * Math.cbrt(m / (3 * M));
/** Điều kiện ổn định tuyến tính của L4/L5 (Gascheau 1843): M1/M2 > (25 + √621)/2 ≈ 24,96 */
export const L45_RATIO = (25 + Math.sqrt(621)) / 2;

/* ═════════════ Chương 4 — Không-thời gian ═════════════ */
/** Hệ số Lorentz γ = 1/√(1 − β²) */
export const lorentzGamma = (beta) => 1 / Math.sqrt(1 - beta * beta);
/** Độ lệch thời gian mỗi ngày (giây) của đồng hồ chuyển động vận tốc v so với đồng hồ đứng yên (tương đối hẹp, v ≪ c) */
export const srDriftPerDay = (v) => -(v * v) / (2 * C * C) * 86_400;
/** Độ lệch thời gian mỗi ngày (giây) của đồng hồ ở bán kính r2 so với r1 trong trường hấp dẫn GM (trường yếu) */
export const grDriftPerDay = (GM, r1, r2) => (GM / (C * C)) * (1 / r1 - 1 / r2) * 86_400;
/** Hệ số giãn thời gian hấp dẫn Schwarzschild ở bán kính r: dτ/dt = √(1 − r_s/r) */
export const gravTimeFactor = (M, r) => Math.sqrt(1 - schwarzschildRadius(M) / r);
/** Góc lệch của tia sáng đi qua vật khối lượng M với tham số va chạm b (rad): α = 4GM/(c²b) */
export const lightDeflection = (M, b) => (4 * G * M) / (C * C * b);
export const RAD_TO_ARCSEC = (180 / Math.PI) * 3600;
/** Bán kính góc Einstein (rad) của thấu kính điểm: θ_E = √(4GM/c² · D_ls/(D_l D_s)) */
export const einsteinRadius = (M, Dl, Ds, Dls = Ds - Dl) => Math.sqrt(((4 * G * M) / (C * C)) * (Dls / (Dl * Ds)));
/** Phương trình thấu kính điểm: ảnh của nguồn ở vị trí góc β (đơn vị θ_E) → [θ+, θ−] và độ phóng đại [μ+, μ−] */
export function pointLensImages(beta) {
  const s = Math.sqrt(beta * beta + 4);
  const tp = (beta + s) / 2, tm = (beta - s) / 2;
  const mu = (t) => 1 / (1 - Math.pow(t, -4));
  return { theta: [tp, tm], mag: [mu(tp), mu(tm)], total: (beta * beta + 2) / (beta * s) };
}
/** Khối lượng chirp (cùng đơn vị với m1, m2): 𝓜 = (m1 m2)^{3/5} / (m1 + m2)^{1/5} */
export const chirpMass = (m1, m2) => Math.pow(m1 * m2, 0.6) / Math.pow(m1 + m2, 0.2);
/** Tần số sóng hấp dẫn (Hz) khi còn τ giây trước khi hợp nhất (gần đúng Newton, bậc tứ cực):
 *  f = (1/π) · (5/(256 τ))^{3/8} · (G𝓜/c³)^{−5/8}; 𝓜 tính bằng kg */
export const gwFrequency = (tau, McKg) => (1 / Math.PI) * Math.pow(5 / (256 * tau), 3 / 8) * Math.pow((G * McKg) / C ** 3, -5 / 8);
/** Ngược lại: thời gian còn lại (s) trước khi hợp nhất khi tần số sóng là f (Hz) */
export const gwTimeToMerger = (f, McKg) => (5 / 256) * Math.pow(Math.PI * f, -8 / 3) * Math.pow((G * McKg) / C ** 3, -5 / 3);

/* ═════════════ Chương 6 — Hố đen ═════════════ */
/** Bán kính quả cầu photon: 1,5 r_s */
export const photonSphere = (M) => 1.5 * schwarzschildRadius(M);
/** Quỹ đạo tròn bền trong cùng (ISCO) của hố đen không quay: 3 r_s = 6GM/c² */
export const iscoRadius = (M) => 3 * schwarzschildRadius(M);
/** Bán kính "bóng" hố đen (tham số va chạm tới hạn của photon): √27 · GM/c² ≈ 2,6 r_s */
export const shadowRadius = (M) => Math.sqrt(27) * G * M / (C * C);
/** Đường kính góc của bóng (rad) nhìn từ khoảng cách D (m) */
export const shadowAngularDiameter = (M, D) => (2 * shadowRadius(M)) / D;
/** Hiệu suất bồi tụ tới ISCO của hố đen Schwarzschild: 1 − √(8/9) ≈ 5,7 % */
export const ACCRETION_EFF_SCHW = 1 - Math.sqrt(8 / 9);
export const M_PROTON = 1.672_621_923_69e-27;      // kg
export const SIGMA_T = 6.652_458_732_1e-29;        // m² — tiết diện Thomson (CODATA 2018)
/** Độ trưng Eddington (W): L = 4πGMm_p c/σ_T */
export const eddingtonLuminosity = (M) => (4 * Math.PI * G * M * M_PROTON * C) / SIGMA_T;
/** Chênh lệch gia tốc kéo giãn (m/s²) giữa đầu và chân một vật dài ℓ ở bán kính r: 2GMℓ/r³ */
export const tidalStretch = (M, r, len) => (2 * G * M * len) / r ** 3;

/* ═════════════ Chương 7 — Thiên hà ═════════════ */
export const KPC = 1e3 * PC;
/** Vận tốc quay (m/s) của quầng đẳng nhiệt có lõi: v² = v∞² [1 − (r_c/r) arctan(r/r_c)] */
export const isothermalHaloVelocity = (r, rc, vInf) => vInf * Math.sqrt(Math.max(0, 1 - (rc / r) * Math.atan(r / rc)));
/** Chu kỳ quỹ đạo tròn (năm) ở bán kính R (m) với vận tốc v (m/s) */
export const circularPeriodYears = (R, v) => (2 * Math.PI * R) / v / JULIAN_YEAR;

/* ═════════════ Chương 9 — Hành tinh & sự sống ═════════════ */
export const R_JUP = 7.1492e7;                     // m — bán kính xích đạo Sao Mộc (NSSDCA)
export const M_JUP = 1.898_19e27;                  // kg — NSSDCA
/** Độ sâu quá cảnh: tỉ lệ ánh sáng bị che = (R_p/R_*)² (bỏ qua tối rìa) */
export const transitDepth = (Rp, Rs) => (Rp / Rs) ** 2;
/** Biên độ vận tốc xuyên tâm của sao (m/s): K = (2πG/P)^{1/3} · m_p sin i / (M_* + m_p)^{2/3} / √(1 − e²) */
export const rvSemiAmplitude = (mp, Ms, P, e = 0, sinI = 1) =>
  Math.cbrt((2 * Math.PI * G) / P) * (mp * sinI) / Math.pow(Ms + mp, 2 / 3) / Math.sqrt(1 - e * e);
/** Nhiệt độ cân bằng (K) của hành tinh suất phản chiếu A ở khoảng cách d (m) quanh sao độ trưng L (W) */
export const equilibriumTemp = (L, d, A = 0.3) => Math.pow((L * (1 - A)) / (16 * Math.PI * SIGMA_SB * d * d), 0.25);
/** Vùng có thể sống được — Kopparapu và cộng sự (2013, ApJ 765, 131; bảng hệ số đã đính chính 2014).
 *  S_eff = S☉ + aT + bT² + cT³ + dT⁴ với T = T_eff − 5780 K; d (au) = √(L/L☉ / S_eff). Hợp lệ 2600–7200 K. */
export const HZ_COEF = {
  recentVenus:      [1.7763, 1.4335e-4, 3.3954e-9, -7.6364e-12, -1.1950e-15],
  runawayGreenhouse:[1.0385, 1.2456e-4, 1.4612e-8, -7.6345e-12, -1.7511e-15],
  moistGreenhouse:  [1.0146, 8.1884e-5, 1.9394e-9, -4.3618e-12, -6.8260e-16],
  maximumGreenhouse:[0.3507, 5.9578e-5, 1.6707e-9, -3.0058e-12, -5.1925e-16],
  earlyMars:        [0.3207, 5.4471e-5, 1.5275e-9, -2.1709e-12, -3.8282e-16],
};
export function hzDistance(kind, teffK, lSun) {
  const [s0, a, b, c, d] = HZ_COEF[kind];
  const t = Math.min(7200, Math.max(2600, teffK)) - 5780;
  const seff = s0 + a * t + b * t * t + c * t ** 3 + d * t ** 4;
  return Math.sqrt(lSun / seff);
}
/** Phương trình Drake: N = R* · f_p · n_e · f_l · f_i · f_c · L (khung suy luận, các thừa số sau còn chưa biết) */
export const drake = (R, fp, ne, fl, fi, fc, L) => R * fp * ne * fl * fi * fc * L;
