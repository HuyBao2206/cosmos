// Đối chiếu vị trí tính bằng tham số Kepler (Standish/JPL) với lịch thiên văn JPL DE421.
// Chạy: node --test tests/
//
// Ngưỡng sai số chấp nhận (ghi trong CLAUDE.md và research/quy-dao-kepler.md):
//   - Góc giữa hướng nhật tâm tính được và hướng DE421: ≤ 0,2° (720″)
//   - Sai lệch khoảng cách tới Mặt Trời: ≤ 0,5 %
// Cơ sở: JPL ghi sai số của Bảng 1 trong 1800–2050 cỡ vài chục tới vài trăm giây cung
// với các hành tinh khí khổng lồ (do bỏ qua nhiễu loạn tương hỗ Sao Mộc–Sao Thổ).
// Kết quả đo được (1900–2049): Sao Thuỷ…Sao Hoả ≤ 41″, Sao Mộc ≤ 324″, Sao Thổ ≤ 545″,
// Sao Thiên Vương ≤ 594″, Sao Hải Vương ≤ 45″. Với mô hình trực quan, 0,2° nhỏ hơn nhiều so với kích thước một điểm ảnh ở mọi chế độ xem.
import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { heliocentric, solveKepler, obliquity, lightSeconds } from '../shared/js/astro/kepler.js';

const fx = JSON.parse(readFileSync(new URL('./fixtures/de421.json', import.meta.url)));
const MAX_ANGLE_DEG = 0.2;
const MAX_DIST_REL = 0.005;

const report = [];
for (const [label, { jd, pos }] of Object.entries(fx.dates)) {
  for (const [id, ref] of Object.entries(pos)) {
    test(`${id} @ ${label}`, () => {
      const p = heliocentric(id, jd);
      const a = [p.x, p.y, p.z];
      const ra = Math.hypot(...ref), rp = Math.hypot(...a);
      const cos = (a[0] * ref[0] + a[1] * ref[1] + a[2] * ref[2]) / (ra * rp);
      const ang = Math.acos(Math.min(1, cos)) * 180 / Math.PI;
      const dr = Math.abs(rp - ra) / ra;
      report.push({ id, label, arcsec: +(ang * 3600).toFixed(1), distPct: +(dr * 100).toFixed(4) });
      assert.ok(ang <= MAX_ANGLE_DEG, `lệch góc ${(ang * 3600).toFixed(0)}″`);
      assert.ok(dr <= MAX_DIST_REL, `lệch khoảng cách ${(dr * 100).toFixed(3)} %`);
    });
  }
}

test('phương trình Kepler hội tụ, cả với e lớn', () => {
  for (const e of [0, 0.0167, 0.2056, 0.2488, 0.9]) {
    for (let M = -3; M <= 3; M += 0.25) {
      const E = solveKepler(M, e);
      assert.ok(Math.abs(E - e * Math.sin(E) - M) < 1e-10);
    }
  }
});

test('độ nghiêng trục: Sao Kim quay ngược, Sao Thiên Vương nằm nghiêng ~98°', () => {
  assert.ok(Math.abs(obliquity('venus') - 177.4) < 0.3);
  assert.ok(Math.abs(obliquity('uranus') - 97.8) < 0.3);
  assert.ok(Math.abs(obliquity('earth') - 23.44) < 0.05);
  assert.ok(Math.abs(obliquity('mars') - 25.19) < 0.1);
});

test('ánh sáng từ Mặt Trời tới Trái Đất (1 AU) mất ~499 giây', () => {
  assert.ok(Math.abs(lightSeconds(1) - 499.0) < 0.1);
});

test.after(() => {
  const worst = {};
  for (const r of report) if (!worst[r.id] || worst[r.id].arcsec < r.arcsec) worst[r.id] = r;
  console.log('\nSai số lớn nhất theo hành tinh (so với DE421):');
  for (const r of Object.values(worst)) console.log(`  ${r.id.padEnd(8)} ${String(r.arcsec).padStart(7)}″  Δr ${r.distPct}%  (${r.label})`);
});
