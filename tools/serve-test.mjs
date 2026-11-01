// Kiểm tra cục bộ: phục vụ repo ở subpath /cosmos/ và mở bằng Playwright (Chromium cài sẵn).
// Thư viện CDN (jsDelivr) được chuyển hướng sang bản npm cục bộ nếu máy không ra được mạng:
//   VENDOR=/tmp/vendor/node_modules node tools/serve-test.mjs /cosmos/ /cosmos/kham-pha/
// In ra lỗi console/pageerror và chụp ảnh màn hình vào /tmp/shots.
import http from 'node:http';
import { readFile, stat, mkdir } from 'node:fs/promises';
import { extname, join, normalize } from 'node:path';
import { createRequire } from 'node:module';
const require = createRequire(process.env.NODE_GLOBAL || '/opt/node22/lib/node_modules/');
const { chromium } = require('playwright');

const ROOT = new URL('..', import.meta.url).pathname;
const VENDOR = process.env.VENDOR;
const TYPES = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript', '.mjs': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.webp': 'image/webp', '.png': 'image/png', '.jpg': 'image/jpeg', '.svg': 'image/svg+xml', '.woff2': 'font/woff2' };

const server = http.createServer(async (req, res) => {
  let p = decodeURIComponent(new URL(req.url, 'http://x').pathname);
  if (!p.startsWith('/cosmos/')) { res.writeHead(404); return res.end(); }
  p = normalize(p.slice('/cosmos/'.length));
  let f = join(ROOT, p);
  try {
    if ((await stat(f)).isDirectory()) f = join(f, 'index.html');
    const body = await readFile(f);
    res.writeHead(200, { 'content-type': TYPES[extname(f)] || 'application/octet-stream' });
    res.end(body);
  } catch {
    const body = await readFile(join(ROOT, '404.html'));
    res.writeHead(404, { 'content-type': TYPES['.html'] }); res.end(body);
  }
}).listen(8123);

const pages = process.argv.slice(2).filter((a) => a.startsWith('/'));
const widths = (process.env.WIDTHS || '1440').split(',').map(Number);
const actions = process.env.ACTIONS ? (await import(process.env.ACTIONS)).default : null;
await mkdir('/tmp/shots', { recursive: true });
const browser = await chromium.launch({ args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
for (const w of widths) {
  const ctx = await browser.newContext({ viewport: { width: w, height: w < 600 ? 844 : 900 }, deviceScaleFactor: 1, reducedMotion: process.env.REDUCED ? 'reduce' : 'no-preference', hasTouch: w < 600, isMobile: w < 600 });
  if (VENDOR) {
    await ctx.route('https://cdn.jsdelivr.net/npm/**', async (route) => {
      const m = route.request().url().match(/npm\/([^@/]+)@[^/]+\/(.*)$/);
      const type = { '.css': 'text/css', '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf' }[extname(m[2])] || 'text/javascript';
      try { route.fulfill({ body: await readFile(join(VENDOR, m[1], m[2])), contentType: type }); }
      catch { route.fulfill({ status: 404 }); }
    });
  }
  for (const path of pages) {
    const page = await ctx.newPage();
    const errs = [];
    page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errs.push(`[${m.type()}] ${m.text()}`); });
    page.on('pageerror', (e) => errs.push(`[pageerror] ${e.message} ${(e.stack||'').split('\n').slice(1,3).join(' | ')}`));
    page.on('requestfailed', (r) => { if (!/fonts\.g/.test(r.url())) errs.push(`[reqfail] ${r.url()} ${r.failure()?.errorText}`); });
    await page.goto('http://localhost:8123' + path, { waitUntil: 'load' });
    await page.waitForTimeout(+(process.env.WAIT || 1500));
    const name = `${path.replace(/\//g, '_')}${w}`;
    if (actions) await actions(page, name, w);
    await page.screenshot({ path: `/tmp/shots/${name}.png`, fullPage: !!process.env.FULL });
    console.log(`${path} @${w}: ${errs.length ? '\n  ' + errs.join('\n  ') : 'không lỗi'}`);
    await page.close();
  }
  await ctx.close();
}
await browser.close(); server.close();
