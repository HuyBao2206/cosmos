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
