// ACTIONS cho serve-test.mjs: mở lần lượt các thẻ khái niệm (biến IDS="a,b,c"), cuộn tới minh hoạ, chụp ảnh.
//   IDS=pho-dien-tu,quang-pho ACTIONS=../tools/shoot-cards.mjs VENDOR=… node tools/serve-test.mjs /cosmos/thau-hieu/
export default async function (page, name) {
  const ids = (process.env.IDS || '').split(',').filter(Boolean);
  if (!(await page.evaluate(() => !!window.__thauHieu))) return;
  for (const id of ids) {
    await page.evaluate((h) => window.__thauHieu.go(h), `#k/${id}`);
    await page.waitForTimeout(1600);
    const ok = await page.evaluate(() => {
      const f = document.querySelector('dialog.kc .kc-viz');
      if (!f) return 'không có minh hoạ';
      f.scrollIntoView({ block: 'center' });
      return f.querySelector('.kc-viz-loading') ? 'minh hoạ chưa tải/lỗi' : 'ok';
    });
    await page.waitForTimeout(900);
    await page.screenshot({ path: `/tmp/shots/${name}_${id}.png` });
    const vizCount = await page.evaluate(() => document.querySelectorAll('dialog.kc .kc-viz').length);
    for (let i = 1; i < vizCount; i++) {
      await page.evaluate((k) => document.querySelectorAll('dialog.kc .kc-viz')[k].scrollIntoView({ block: 'center' }), i);
      await page.waitForTimeout(700);
      await page.screenshot({ path: `/tmp/shots/${name}_${id}_${i}.png` });
    }
    console.log(`  ${id}: ${ok}`);
  }
}
