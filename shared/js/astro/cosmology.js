// Vũ trụ học ΛCDM phẳng dùng cho minh hoạ "Lịch sử vũ trụ" và "Nhìn xa là nhìn về quá khứ".
// Tham số mặc định: Planck 2018 (TT,TE,EE+lowE+lensing+BAO, bảng 2 cột cuối, arXiv:1807.06209):
// H0 = 67,66 km/s/Mpc, Ωm = 0,3111, ΩΛ = 0,6889; T_CMB = 2,7255 K (Fixsen 2009).
// Ω bức xạ (photon + 3 neutrino nhẹ): Ωr h² ≈ 4,18 × 10⁻⁵.
import { C, PC, JULIAN_YEAR } from './physics.js';

export const T_CMB = 2.7255;
export const PLANCK18 = { H0: 67.66, Om: 0.3111, Or: 4.18e-5 / 0.6766 ** 2, OL: null };
export const MPC = 1e6 * PC;
const GYR = 1e9 * JULIAN_YEAR;

function params(p = {}) {
  const q = { ...PLANCK18, ...p };
  if (q.OL == null) q.OL = 1 - q.Om - q.Or;     // phẳng
  q.Ok = 1 - q.Om - q.Or - q.OL;
  q.H0s = (q.H0 * 1000) / MPC;                    // s⁻¹
  return q;
}
/** E(a) = H(a)/H0 */
export function E(a, p) {
  const q = params(p);
  return Math.sqrt(q.Or / a ** 4 + q.Om / a ** 3 + q.Ok / a ** 2 + q.OL);
}
/** Tích phân Simpson trên [x0, x1] với n đoạn (n chẵn) */
function simpson(f, x0, x1, n = 2000) {
  const h = (x1 - x0) / n;
  let s = f(x0) + f(x1);
  for (let i = 1; i < n; i++) s += f(x0 + i * h) * (i % 2 ? 4 : 2);
  return (s * h) / 3;
}
/** Tuổi vũ trụ (tỷ năm) tại hệ số tỉ lệ a = 1/(1+z). t = ∫₀ᵃ da' / (a' H(a')).
 *  Đổi biến a = u² để khử kỳ dị ở a → 0. */
export function ageAtA(a, p) {
  const q = params(p);
  const f = (u) => (u === 0 ? 0 : (2 * u) / (u * u * E(u * u, q)));
  return simpson(f, 0, Math.sqrt(a), 4000) / q.H0s / GYR;
}
export const ageAtZ = (z, p) => ageAtA(1 / (1 + z), p);
/** Thời gian nhìn lại (tỷ năm): tuổi hiện nay − tuổi tại z */
export const lookbackTime = (z, p) => ageAtA(1, p) - ageAtZ(z, p);
/** Khoảng cách đồng chuyển động (tỷ năm ánh sáng) tới vật có dịch chuyển đỏ z: D = c ∫₀ᶻ dz'/H(z') */
export function comovingDistanceGly(z, p) {
  const q = params(p);
  const f = (zz) => 1 / E(1 / (1 + zz), q);
  const meters = (C / q.H0s) * simpson(f, 0, z, 4000);
  return meters / (1e9 * C * JULIAN_YEAR);
}
/** Bán kính vũ trụ quan sát được (chân trời hạt, tỷ năm ánh sáng) — tích phân theo a để hội tụ */
export function particleHorizonGly(p) {
  const q = params(p);
  // D = c ∫₀¹ da / (a² H(a)); đổi biến a = u²
  const f = (u) => (u === 0 ? 2 / Math.sqrt(q.Or) : (2 * u) / (u ** 4 * E(u * u, q)));
  return ((C / q.H0s) * simpson(f, 0, 1, 20000)) / (1e9 * C * JULIAN_YEAR);
}
/** Nhiệt độ bức xạ nền tại dịch chuyển đỏ z: T = T₀(1+z) */
export const cmbTemperature = (z) => T_CMB * (1 + z);
/** Vận tốc lùi xa theo định luật Hubble–Lemaître (km/s) ở khoảng cách d (Mpc) */
export const hubbleVelocity = (dMpc, H0 = PLANCK18.H0) => H0 * dMpc;
/** Thời gian Hubble 1/H0 (tỷ năm) */
export const hubbleTimeGyr = (H0 = PLANCK18.H0) => MPC / (H0 * 1000) / GYR;
/** Bán kính Hubble c/H0 (tỷ năm ánh sáng) */
export const hubbleRadiusGly = (H0 = PLANCK18.H0) => hubbleTimeGyr(H0);
/** Hệ số tỉ lệ a(t) cho một mô hình (Ωm, ΩΛ, Ωr tuỳ chọn) — tích phân số da/dt = H0·a·E(a).
 *  Trả về mảng [t (tỷ năm, tính từ Vụ Nổ Lớn), a] từ a ≈ 0 tới tMax (tỷ năm) hoặc tới khi a co về 0. */
export function scaleFactorHistory(p, tMax = 40, n = 600) {
  const q = params(p);
  const H0g = q.H0s * GYR;                            // H0 theo 1/tỷ năm
  const out = [];
  // khởi đầu nhỏ: kỷ nguyên vật chất a ∝ t^{2/3}
  let a = 2e-3, t = ageAtA(2e-3, q), dt = tMax / n, sign = 1;
  out.push([t, a]);
  const rate = (aa) => { const e2 = q.Or / aa ** 4 + q.Om / aa ** 3 + q.Ok / aa ** 2 + q.OL; return e2 > 0 ? H0g * aa * Math.sqrt(e2) : 0; };
  while (t < tMax && a > 1e-3) {
    // RK4 với hướng (giãn/co); đổi hướng khi tốc độ về 0 (vũ trụ đóng tái co)
    const k1 = sign * rate(a), k2 = sign * rate(a + (dt * k1) / 2), k3 = sign * rate(a + (dt * k2) / 2), k4 = sign * rate(a + dt * k3);
    let na = a + (dt / 6) * (k1 + 2 * k2 + 2 * k3 + k4);
    if (sign > 0 && (rate(na) === 0 || !(na > a))) { sign = -1; na = a; }
    a = na; t += dt;
    out.push([t, a]);
    if (a > 50) break;
  }
  return out;
}
