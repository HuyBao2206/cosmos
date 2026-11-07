// Test các hàm vật lý dùng cho minh hoạ (shared/js/astro/physics.js).
// Giá trị đối chiếu: research/thuoc-do-vu-tru.md, research/doi-song-cac-ngoi-sao.md.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import * as P from '../shared/js/astro/physics.js';

const near = (a, b, rel = 1e-6, msg) => assert.ok(Math.abs(a - b) <= Math.abs(b) * rel, `${msg || ''} ${a} ≉ ${b}`);

test('năm ánh sáng = 9 460 730 472 580 800 m (năm Julius)', () => {
  assert.equal(P.LY, 9_460_730_472_580_800);
});

test('parsec = 648000/π au ≈ 3,0857 × 10¹⁶ m ≈ 3,2616 ly ≈ 206 265 au', () => {
  near(P.PC, 3.085_677_581e16, 1e-9);
  near(P.PC / P.LY, 3.261_564, 1e-6);
  near(P.PC / P.AU, 206_264.806, 1e-8);
});

test('thời gian ánh sáng 1 au ≈ 499,0 s (8 phút 19 giây)', () => {
  near(P.lightTime(P.AU), 499.004_78, 1e-6);
});

test('thị sai: Proxima 768,0665 mas → 1,30197 pc → 4,2465 ly', () => {
  const d = P.parallaxToPc(0.768_066_5);
  near(d, 1.301_97, 1e-5);
  near(P.pcToLy(d), 4.2465, 1e-4);
  near(P.pcToParallax(P.parallaxToPc(0.5)), 0.5, 1e-12);
});

test('thị sai 61 Cygni: Bessel 0,3136″ → ~10,4 ly; Gaia 0,28615″ → ~11,4 ly', () => {
  near(P.pcToLy(P.parallaxToPc(0.3136)), 10.4, 0.01);
  near(P.pcToLy(P.parallaxToPc(0.286_15)), 11.4, 0.01);
});

test('mô-đun khoảng cách & cấp sao biểu kiến là hai hàm ngược nhau', () => {
  near(P.distanceModulusToPc(10, 0), 1000, 1e-12);       // m − M = 10 ⇒ 1 000 pc
  near(P.apparentMag(-4, 1000), 6, 1e-12);
  near(P.distanceModulusToPc(P.apparentMag(-19.3, 4e7), -19.3), 4e7, 1e-9);
});

test('định luật nghịch đảo bình phương: thông lượng Mặt Trời tại 1 au ≈ 1 361 W/m²', () => {
  near(P.flux(P.L_SUN, P.AU), 1361, 0.002);
  near(P.distanceFromFlux(P.L_SUN, P.flux(P.L_SUN, 5 * P.AU)), 5 * P.AU, 1e-12);
  // gấp đôi khoảng cách → sáng giảm 4 lần
  near(P.flux(1, 2) / P.flux(1, 1), 0.25, 1e-12);
});

test('Cepheid: chu kỳ dài hơn ⇒ sáng hơn; P = 10 ngày ⇒ M_V ≈ −4,21', () => {
  near(P.cepheidAbsMag(10), -4.21, 1e-9);
  assert.ok(P.cepheidAbsMag(30) < P.cepheidAbsMag(3));
  // Polaris (P ≈ 3,97 ngày, mode bội) chỉ để kiểm tra miền giá trị hợp lý: vài trăm đến vài nghìn L☉
  const L = P.magToLsun(P.cepheidAbsMag(3.97));
  assert.ok(L > 300 && L < 5000, String(L));
});

test('dãy chính: Mặt Trời L = 1, t ≈ 10 tỷ năm; sao nặng sống ngắn hơn', () => {
  near(P.msLuminosity(1), 1, 1e-12);
  near(P.msLifetime(1), 1e10, 1e-12);
  assert.ok(P.msLifetime(10) < 5e7 && P.msLifetime(10) > 1e7);
  assert.equal(P.msLifetime(60), 3e6);                     // sàn quan sát
  assert.ok(P.msLifetime(0.5) > 5e10);                     // lâu hơn tuổi vũ trụ
  near(P.teff(1, 1), 5772, 1e-12);
  // liên tục tại các điểm nối (sai lệch nhỏ)
  near(P.msLuminosity(2 - 1e-9), P.msLuminosity(2), 0.15);
});

test('kết cục theo khối lượng ban đầu', () => {
  assert.equal(P.stellarFate(0.05), 'brown-dwarf');
  assert.equal(P.stellarFate(1), 'white-dwarf');
  assert.equal(P.stellarFate(12), 'neutron-star');
  assert.equal(P.stellarFate(40), 'black-hole');
});

test('vật thể đặc: r_s Mặt Trời ≈ 2,95 km; vận tốc thoát Trái Đất ≈ 11,2 km/s; v₁ ≈ 7,9 km/s', () => {
  near(P.schwarzschildRadius(P.M_SUN), 2953, 0.002);
  near(P.escapeVelocity(P.M_EARTH, P.R_EARTH), 11_186, 0.003);
  near(P.circularVelocity(P.M_EARTH, P.R_EARTH), 7_910, 0.003);
  // mật độ trung bình Mặt Trời ≈ 1 410 kg/m³
  near(P.meanDensity(P.M_SUN, P.R_SUN), 1410, 0.005);
});

test('khối lượng Jeans: lõi phân tử 10 K, n = 10⁴ cm⁻³ ⇒ cỡ 5 M☉; nóng hơn ⇒ lớn hơn, đặc hơn ⇒ nhỏ hơn', () => {
  const mj = P.jeansMass(10, 1e4) / P.M_SUN;
  assert.ok(mj > 4 && mj < 7, String(mj));
  near(P.jeansMass(40, 1e4) / P.jeansMass(10, 1e4), 8, 1e-9);        // ∝ T^{3/2}
  near(P.jeansMass(10, 4e4) / P.jeansMass(10, 1e4), 0.5, 1e-9);      // ∝ n^{-1/2}
  const tff = P.freeFallTime(1e4) / (365.25 * 86400);                // ~ vài trăm nghìn năm
  assert.ok(tff > 2e5 && tff < 6e5, String(tff));
});

test('sao lùn trắng: Sirius B (1,018 M☉) ≈ 0,008 R☉; 0,6 M☉ to hơn Trái Đất; tiến tới 0 gần giới hạn', () => {
  const r = P.wdRadius(1.018);
  assert.ok(r > 0.0072 && r < 0.0088, String(r));
  assert.ok(P.wdRadius(0.6) * P.R_SUN > P.R_EARTH);
  assert.ok(P.wdRadius(0.6) > P.wdRadius(1.0));
  assert.equal(P.wdRadius(1.5), 0);
});

test('pulsar 716 Hz, bán kính 12 km: xích đạo quay ~ 18 % tốc độ ánh sáng', () => {
  const v = P.equatorialSpeed(12_000, 1 / 716);
  near(v / P.C, 0.18, 0.01);
});

/* ═════════ Chương 2–9 (phiên 2) — giá trị đối chiếu: research/anh-sang.md, hap-dan-chuyen-dong.md,
   khong-thoi-gian.md, ho-den.md, lich-su-vu-tru.md, hanh-tinh-su-song.md ═════════ */
import * as Cos from '../shared/js/astro/cosmology.js';

test('Wien: Mặt Trời 5772 K → đỉnh ≈ 502 nm; CMB 2,7255 K → ≈ 1,06 mm', () => {
  near(P.wienPeak(5772) * 1e9, 502.04, 1e-4);
  near(P.wienPeak(2.7255) * 1e3, 1.0632, 1e-3);
});

test('photon 500 nm ≈ 2,48 eV; ν = c/λ', () => {
  near(P.photonEnergyEV(500e-9), 2.4797, 1e-4);
  near(P.frequency(0.21106), 1.4204e9, 1e-4);   // vạch 21 cm của hydro
});

test('Planck: đỉnh B_λ trùng với λ Wien', () => {
  const T = 5772, lp = P.wienPeak(T);
  assert.ok(P.planck(lp, T) > P.planck(lp * 0.97, T) && P.planck(lp, T) > P.planck(lp * 1.03, T));
});

test('Doppler tương đối tính: β nhỏ → z ≈ β; z ↔ β nghịch đảo đúng', () => {
  near(P.dopplerZ(1e-4), 1e-4, 1e-3);
  near(P.betaFromZ(P.dopplerZ(0.6)), 0.6, 1e-12);
  near(P.dopplerZ(0.6), 1, 1e-12);                // β = 0,6 → z = 1
  near(P.observedWavelength(656.28, 0.1), 721.908, 1e-9);
});

test('giới hạn nhiễu xạ: Hubble 2,4 m ở 500 nm ≈ 0,052″', () => {
  near(P.diffractionLimitArcsec(500e-9, 2.4), 0.0524, 1e-2);
});

test('Kepler 3: Trái Đất 1 năm; Sao Mộc 5,2 au → ~11,86 năm', () => {
  near(P.orbitalPeriod(P.AU, P.GM_SUN / P.G) / P.JULIAN_YEAR, 1.0, 5e-3);
  near(P.periodYears(5.2038), 11.87, 2e-3);
});

test('vận tốc vũ trụ cấp 1 ≈ 7,9 km/s, cấp 2 ≈ 11,2 km/s (mặt đất)', () => {
  const R = P.R_EARTH;
  near(Math.sqrt(P.GM_EARTH / R), 7909, 1e-3);
  near(Math.sqrt(2 * P.GM_EARTH / R), 11186, 1e-3);
  assert.equal(P.orbitType(P.GM_EARTH, R, 7900), 'bound');
  assert.equal(P.orbitType(P.GM_EARTH, R, 11300), 'escape');
});

test('ISS ~420 km: v ≈ 7,66 km/s, chu kỳ ≈ 92,8 phút, trọng lực còn ≈ 88 %', () => {
  const r = P.R_EARTH + 420e3;
  near(Math.sqrt(P.GM_EARTH / r), 7660, 2e-3);
  near(P.orbitalPeriod(r, P.GM_EARTH / P.G) / 60, 92.8, 3e-3);
  near((P.R_EARTH / r) ** 2, 0.880, 1e-3);
});

test('vis-viva: Trái Đất ở cận nhật ≈ 30,29 km/s, viễn nhật ≈ 29,29 km/s', () => {
  const a = 1.000_001 * P.AU, e = 0.0167;
  near(P.visViva(P.GM_SUN, a * (1 - e), a), 30_290, 2e-3);
  near(P.visViva(P.GM_SUN, a * (1 + e), a), 29_290, 2e-3);
});

test('thuỷ triều: Mặt Trời / Mặt Trăng ≈ 0,46 (NOAA: 27/59)', () => {
  near(P.tidalAccel(P.M_SUN, P.AU, 1) / P.tidalAccel(P.M_MOON, P.D_MOON, 1), 27 / 59, 1e-2);
});

test('điểm Lagrange Trái Đất – Mặt Trời: L1, L2 cách Trái Đất ≈ 1,5 triệu km; L4 ở góc 60°', () => {
  const mu = 3.0035e-6;                          // (M⊕+M☾)/(M☉+…)
  const L = P.lagrangePoints(mu), xE = 1 - mu;
  near((xE - L.L1[0]) * P.AU / 1e9, 1.49, 1e-2);
  near((L.L2[0] - xE) * P.AU / 1e9, 1.50, 1e-2);
  near(Math.atan2(L.L4[1], L.L4[0] + mu) * 180 / Math.PI, 60, 1e-6);
  near(P.L45_RATIO, 24.96, 1e-3);
  near(P.hillRadius(P.AU, 5.972e24, P.M_SUN) / 1e9, 1.4965, 1e-3);
});

test('Lagrange Trái Đất – Mặt Trăng: L1 cách tâm Trái Đất ≈ 326 000 km', () => {
  const mu = P.M_MOON / (P.M_EARTH + P.M_MOON);
  const L = P.lagrangePoints(mu);
  near((L.L1[0] + mu) * P.D_MOON / 1e3, 326_400, 3e-3);
});

test('tương đối hẹp: γ(0,6c) = 1,25; γ(0,99c) ≈ 7,09', () => {
  near(P.lorentzGamma(0.6), 1.25, 1e-12);
  near(P.lorentzGamma(0.99), 7.0888, 1e-4);
});

test('GPS: −7,2 μs/ngày (vận tốc), +45,7 μs/ngày (hấp dẫn), tổng ≈ +38,5 μs/ngày', () => {
  const r = 26_561.75e3, v = Math.sqrt(P.GM_EARTH / r);
  const sr = P.srDriftPerDay(v) * 1e6, gr = P.grDriftPerDay(P.GM_EARTH, P.R_EARTH, r) * 1e6;
  near(sr, -7.21, 3e-3);
  near(gr, 45.7, 3e-3);
  near(sr + gr, 38.5, 5e-3);
});

test('tia sáng sượt mép Mặt Trời lệch 1,75″ (Eddington 1919)', () => {
  near(P.lightDeflection(P.M_SUN, P.R_SUN) * P.RAD_TO_ARCSEC, 1.751, 1e-3);
});

test('thấu kính điểm: nguồn thẳng hàng → vành θ_E; tổng độ phóng đại đúng công thức', () => {
  const im = P.pointLensImages(1e-6);
  near(im.theta[0], 1, 1e-5);
  const b = 0.5, r = P.pointLensImages(b);
  near(Math.abs(r.mag[0]) + Math.abs(r.mag[1]), r.total, 1e-9);
  near(r.theta[0] + r.theta[1], b, 1e-12);       // θ+ + θ− = β
});

test('sóng hấp dẫn GW150914: 𝓜(36, 29) ≈ 28 M☉; từ 35 Hz tới hợp nhất ~0,2 s', () => {
  near(P.chirpMass(36, 29), 28.1, 1e-2);
  const Mc = 28.1 * P.M_SUN;
  const tau = P.gwTimeToMerger(35, Mc);
  assert.ok(tau > 0.15 && tau < 0.25, `τ = ${tau}`);
  near(P.gwFrequency(tau, Mc), 35, 1e-9);
});

test('hố đen: r_s Mặt Trời ≈ 2,95 km; Trái Đất ≈ 8,87 mm; ISCO = 3 r_s; bóng ≈ 2,6 r_s', () => {
  near(P.schwarzschildRadius(P.M_SUN), 2953, 1e-3);
  near(P.schwarzschildRadius(P.M_EARTH) * 1e3, 8.87, 2e-3);
  near(P.iscoRadius(P.M_SUN) / P.schwarzschildRadius(P.M_SUN), 3, 1e-12);
  near(P.shadowRadius(P.M_SUN) / P.schwarzschildRadius(P.M_SUN), Math.sqrt(27) / 2, 1e-12);
});

test('bóng M87* (6,5 tỷ M☉, 16,8 Mpc) ≈ 40 μas; Sgr A* (4 triệu M☉, 8,18 kpc) ≈ 50 μas', () => {
  near(P.shadowAngularDiameter(6.5e9 * P.M_SUN, 16.8e6 * P.PC) * P.RAD_TO_ARCSEC * 1e6, 39.7, 5e-3);
  near(P.shadowAngularDiameter(4.0e6 * P.M_SUN, 8.178e3 * P.PC) * P.RAD_TO_ARCSEC * 1e6, 50.2, 5e-3);
});

test('bồi tụ: hiệu suất Schwarzschild ≈ 5,7 %; L_Edd ≈ 1,26 × 10³¹ W cho 1 M☉', () => {
  near(P.ACCRETION_EFF_SCHW, 0.0572, 1e-3);
  near(P.eddingtonLuminosity(P.M_SUN), 1.257e31, 1e-3);
});

test('Ngân Hà: R = 8,2 kpc, v = 230 km/s → năm thiên hà ≈ 220 triệu năm', () => {
  near(P.circularPeriodYears(8.2 * P.KPC, 230e3) / 1e6, 219, 1e-2);
  // quầng đẳng nhiệt: xa lõi → v tiến tới v∞
  near(P.isothermalHaloVelocity(1e4, 1, 200), 200, 1e-3);
});

test('ngoại hành tinh: độ sâu quá cảnh Trái Đất ≈ 84 ppm, Sao Mộc ≈ 1 %', () => {
  near(P.transitDepth(P.R_EARTH, P.R_SUN) * 1e6, 83.9, 2e-3);
  near(P.transitDepth(P.R_JUP, P.R_SUN), 0.01056, 1e-3);
});

test('vận tốc xuyên tâm: Mặt Trời do Sao Mộc ≈ 12,5 m/s, do Trái Đất ≈ 9 cm/s', () => {
  near(P.rvSemiAmplitude(P.M_JUP, P.M_SUN, 11.862 * P.JULIAN_YEAR), 12.46, 3e-3);
  near(P.rvSemiAmplitude(P.M_EARTH, P.M_SUN, P.JULIAN_YEAR) * 100, 8.95, 3e-3);
});

test('vùng sống được (Kopparapu): Mặt Trời ≈ 0,98–1,69 au (bảo thủ), 0,75–1,77 au (lạc quan)', () => {
  near(P.hzDistance('runawayGreenhouse', 5780, 1), 0.981, 2e-3);
  near(P.hzDistance('maximumGreenhouse', 5780, 1), 1.689, 2e-3);
  near(P.hzDistance('recentVenus', 5780, 1), 0.750, 2e-3);
  near(P.hzDistance('earlyMars', 5780, 1), 1.766, 2e-3);
  // sao lùn đỏ mờ hơn → vùng sống được gần hơn nhiều
  assert.ok(P.hzDistance('runawayGreenhouse', 2566, 5.5e-4) < 0.03);
});

test('nhiệt độ cân bằng Trái Đất (A = 0,306) ≈ 254 K', () => {
  near(P.equilibriumTemp(P.L_SUN, P.AU, 0.306), 254, 3e-3);
});

test('vũ trụ học Planck 2018: tuổi ≈ 13,79 tỷ năm; tái kết hợp (z ≈ 1090) ≈ 370–380 nghìn năm', () => {
  near(Cos.ageAtZ(0), 13.787, 2e-3);
  const t = Cos.ageAtZ(1089.9) * 1e9;
  assert.ok(t > 3.6e5 && t < 3.9e5, `t = ${t}`);
});

test('vũ trụ học: chân trời quan sát ≈ 46 tỷ năm ánh sáng; thời gian Hubble ≈ 14,45 tỷ năm', () => {
  near(Cos.particleHorizonGly(), 46.2, 1e-2);
  near(Cos.hubbleTimeGyr(67.66), 14.45, 1e-3);
  near(Cos.cmbTemperature(1089.9), 2973, 1e-3);
});

test('vũ trụ học: z = 1 → thời gian nhìn lại ≈ 7,9 tỷ năm; MoM-z14 (z = 14,44) lúc vũ trụ ~280 triệu năm', () => {
  near(Cos.lookbackTime(1), 7.93, 5e-3);
  near(Cos.ageAtZ(14.44) * 1e3, 283, 2e-2);
});

test('lịch sử hệ số tỉ lệ: mô hình Planck có a = 1 lúc t ≈ 13,8 tỷ năm', () => {
  const h = Cos.scaleFactorHistory({}, 20, 2000);
  const i = h.findIndex(([, a]) => a >= 1);
  near(h[i][0], 13.79, 5e-3);
  // vũ trụ chỉ có vật chất (Ωm = 1): tuổi = 2/(3H0)
  near(Cos.ageAtA(1, { Om: 1, OL: 0, Or: 0 }), (2 / 3) * Cos.hubbleTimeGyr(67.66), 1e-4);
});
