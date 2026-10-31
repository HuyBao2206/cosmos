// C2 — Hồ sơ các hành tinh: lưới thẻ → mở thành "hồ sơ quan sát" (lật 3D, kẻ đường kỹ thuật, số đếm lên,
// hành tinh 3D kéo xoay được) và công cụ so sánh hai hành tinh đúng tỉ lệ kích thước.
import { gsap } from 'gsap';
import { PLANETS, byId, EARTH } from './planets-data.js';
import { PROFILES, IAU_2006, commonsUrl, commonsPage } from './profiles-content.js';
import { fmt, prefersReducedMotion, hasWebGL } from '../../shared/js/util.js';

const reduced = prefersReducedMotion();
const DISK = (id) => `./assets/disks/${id}.webp`;
const FACT = (id) => `https://nssdc.gsfc.nasa.gov/planetary/factsheet/${id}fact.html`;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const TYPE = { mercury: 'Hành tinh đá', venus: 'Hành tinh đá', earth: 'Hành tinh đá', mars: 'Hành tinh đá', jupiter: 'Hành tinh khí khổng lồ', saturn: 'Hành tinh khí khổng lồ', uranus: 'Hành tinh băng khổng lồ', neptune: 'Hành tinh băng khổng lồ', pluto: 'Hành tinh lùn' };

const hoursText = (h) => {
  const a = Math.abs(h);
  return a < 48 ? `${fmt(a, 1)} giờ` : `${fmt(a, 1)} giờ ≈ ${fmt(a / 24, a / 24 < 10 ? 1 : 0)} ngày`;
};

function cardHTML(p, i) {
  return `<button class="pf-card reveal" type="button" data-id="${p.id}" aria-haspopup="dialog" id="ho-so-${p.id}">
    <span class="pf-num">${String(i + 1).padStart(2, '0')}</span>
    <img class="pf-disk" src="${DISK(p.id)}" alt="" loading="lazy" width="240" height="240">
    <span class="pf-type">${TYPE[p.id]}</span>
    <span class="pf-name">${p.vi}</span>
    <span class="pf-en">${p.en}</span>
    <span class="pf-stat"><b>${fmt(p.diameter)}</b> km đường kính</span>
    <span class="pf-open">Mở hồ sơ</span>
  </button>`;
}

// Bảng dữ liệu chuẩn theo NSSDCA: [nhãn, giá trị số, số chữ số thập phân, đơn vị, ghi chú]
function dataRows(p) {
  return [
    ['Khối lượng', p.mass, p.mass < 0.1 ? 4 : p.mass < 10 ? 3 : 0, '× 10²⁴ kg', `${fmt(p.mass / EARTH.mass, p.mass / EARTH.mass < 0.01 ? 4 : p.mass / EARTH.mass < 10 ? 3 : 1)} lần Trái Đất`],
    ['Đường kính', p.diameter, 0, 'km', `${fmt(p.diameter / EARTH.diameter, 2)} lần Trái Đất`],
    ['Khoảng cách trung bình tới Mặt Trời', p.distance, 1, 'triệu km', `${fmt(p.distance / EARTH.distance, 2)} AU`],
    ['Chu kỳ quỹ đạo', p.period, 1, 'ngày', `${fmt(p.period / 365.25, 2)} năm Trái Đất`],
    ['Chu kỳ tự quay', Math.abs(p.rotation), 1, 'giờ', p.rotation < 0 ? 'quay ngược chiều' : 'so với các sao'],
    ['Nhiệt độ trung bình', p.temp, 0, '°C', p.id === 'mercury' ? 'dao động rất lớn giữa ngày và đêm' : p.pressure === null ? 'ở mức áp suất 1 bar' : 'tại bề mặt'],
    ['Số vệ tinh', p.moons, 0, '', p.moonsAsOf ? `đã xác nhận, tính tới ${p.moonsAsOf}` : 'đã xác nhận'],
    ['Hấp dẫn bề mặt', p.gravity, p.gravity < 1 ? 2 : 1, 'm/s²', `${fmt(p.gravity / EARTH.gravity, 2)} g`],
  ];
}

function compareBars(p) {
  const w = 60 * (p.gravity / EARTH.gravity);
  // thang log cho ngày và năm vì khoảng giá trị rất rộng
  const logPos = (v, lo, hi) => Math.max(2, Math.min(100, ((Math.log10(v) - Math.log10(lo)) / (Math.log10(hi) - Math.log10(lo))) * 100));
  return [
    { label: 'Trọng lượng', text: `Một người nặng 60 kg trên Trái Đất đứng lên cân ở đây, chiếc cân sẽ hiện <b>${fmt(w, 1)} kg</b>${p.pressure === null ? ' (ở mức áp suất 1 bar, vì hành tinh này không có bề mặt rắn)' : ''}.`, v: (p.gravity / 25) * 100, e: (EARTH.gravity / 25) * 100, scale: 'tuyến tính' },
    { label: 'Một ngày (Mặt Trời mọc tới lần mọc sau)', text: `<b>${hoursText(p.day)}</b>, so với 24 giờ trên Trái Đất.`, v: logPos(p.day, 5, 6000), e: logPos(24, 5, 6000), scale: 'thang log' },
    { label: 'Một năm', text: `<b>${fmt(p.period, p.period < 1000 ? 1 : 0)} ngày</b>, bằng ${fmt(p.period / 365.25, 2)} năm Trái Đất.`, v: logPos(p.period, 50, 100000), e: logPos(365.25, 50, 100000), scale: 'thang log' },
  ];
}

function dossierHTML(p, idx, total) {
  const c = PROFILES[p.id];
  const rows = dataRows(p).map(([l, v, d, u, note]) => `<div class="pf-row"><dt>${l}</dt><dd><span class="pf-count" data-to="${v}" data-dec="${d}">${fmt(v, d)}</span> <span class="u">${u}</span><small>${note}</small></dd></div>`).join('');
  const bars = compareBars(p).map((b) => `<div class="pf-bar"><p class="pf-bar-l">${b.label} <span>${b.scale}</span></p>
      <div class="pf-track"><i style="--w:${b.v.toFixed(1)}%"></i><em style="left:${b.e.toFixed(1)}%" title="Trái Đất"></em></div><p class="pf-bar-t">${b.text}</p></div>`).join('');
  const pts = c.points.map(([h, t]) => `<li><h4>${h}</h4><p>${t}</p></li>`).join('');
  const ms = c.missions.map(([y, n, t]) => `<li><time>${y}</time><div><b>${n}</b><span>${t}</span></div></li>`).join('');
  const ph = c.photo;
  return `
  <div class="pf-sheet">
    <svg class="pf-lines" aria-hidden="true" preserveAspectRatio="none" viewBox="0 0 1000 1000">
      <path d="M20 60 V20 H60 M940 20 H980 V60 M980 940 V980 H940 M60 980 H20 V940"/>
      <path d="M400 20 V980" class="faint"/>
      <path d="M20 140 H980" class="faint"/>
    </svg>
    <header class="pf-head">
      <p class="eyebrow">Hồ sơ quan sát · ${String(idx + 1).padStart(2, '0')} / ${String(total).padStart(2, '0')}</p>
      <button class="pf-close btn" type="button" data-act="close" aria-label="Đóng hồ sơ">Đóng ✕</button>
    </header>
    <div class="pf-body">
      <div class="pf-visual">
        <div class="pf-globe" data-globe aria-label="Mô hình 3D của ${esc(p.vi)}, kéo để xoay" role="img">
          <img src="${DISK(p.id)}" alt="" class="pf-globe-fallback">
          <svg class="pf-reticle" viewBox="0 0 200 200" aria-hidden="true"><circle cx="100" cy="100" r="92"/><path d="M100 0 V18 M100 182 V200 M0 100 H18 M182 100 H200"/></svg>
        </div>
        <p class="pf-hint">Kéo để xoay · trục nghiêng ${fmt(p.obliquity, 1)}°${p.rotation < 0 ? ' · quay ngược chiều' : ''}</p>
        <figure class="pf-photo">
          <a href="${commonsPage(ph.file)}" target="_blank" rel="noopener"><img src="${commonsUrl(ph.file, 640)}" alt="Ảnh ${esc(p.vi)} — ${esc(ph.note)}" loading="lazy" data-fallback="${DISK(p.id)}"></a>
          <figcaption>${esc(ph.note)}. Ảnh: ${esc(ph.credit)}.</figcaption>
        </figure>
      </div>
      <div class="pf-content">
        <h2 class="pf-title">${p.vi} <span>${p.en}${p.dwarf ? ' · hành tinh lùn' : ''}</span></h2>
        <p class="pf-hook">${c.hook}</p>
        <h3 class="pf-h">Bảng dữ liệu</h3>
        <dl class="pf-table">${rows}</dl>
        <h3 class="pf-h">So với Trái Đất</h3>
        <div class="pf-bars">${bars}<p class="pf-legend"><em></em> vị trí của Trái Đất</p></div>
        <h3 class="pf-h">Điều khoa học đã biết</h3>
        <ol class="pf-points">${pts}</ol>
        <h3 class="pf-h">Các sứ mệnh</h3>
        <ol class="pf-missions">${ms}</ol>
        <p class="pf-src">Nguồn số liệu: <a href="${FACT(p.id)}" target="_blank" rel="noopener">NASA NSSDCA, ${p.en} Fact Sheet</a>; số vệ tinh theo Trung tâm Tiểu hành tinh của IAU và NASA. Chi tiết ở ngăn Nguồn tham khảo cuối trang.</p>
        <nav class="pf-nav" aria-label="Chuyển hồ sơ">
          <button class="btn" type="button" data-act="prev">← Hành tinh trước</button>
          <button class="btn" type="button" data-act="next">Hành tinh sau →</button>
        </nav>
      </div>
    </div>
  </div>`;
}

// ---------- Hành tinh 3D nhỏ trong hồ sơ ----------
let globe = null;
async function mountGlobe(el, p) {
  if (!hasWebGL()) return;
  const THREE = await import('three');
  const { ROTATION, poleEcliptic } = await import('../../shared/js/astro/kepler.js');
  if (!globe) {
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 100);
    camera.position.set(0, 0, 4.6);
    const light = new THREE.DirectionalLight(0xffffff, 2.8); light.position.set(-3, 1.4, 2.4);
    scene.add(light, new THREE.AmbientLight(0xffffff, 0.04));
    const tilt = new THREE.Group(); scene.add(tilt);
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), new THREE.MeshStandardMaterial({ roughness: 1 }));
    tilt.add(mesh);
    globe = { THREE, renderer, scene, camera, tilt, mesh, ring: null, drag: 0, vel: 0, raf: 0, loader: new THREE.TextureLoader() };
    const dom = renderer.domElement;
    let lx = null;
    dom.addEventListener('pointerdown', (e) => { lx = e.clientX; dom.setPointerCapture(e.pointerId); });
    dom.addEventListener('pointermove', (e) => { if (lx === null) return; globe.vel = (e.clientX - lx) * 0.01; globe.drag += globe.vel; lx = e.clientX; });
    dom.addEventListener('pointerup', () => { lx = null; });
    dom.style.touchAction = 'pan-y';
  }
  const g = globe;
  el.appendChild(g.renderer.domElement);
  el.classList.add('has-3d');
  const size = el.clientWidth;
  g.renderer.setSize(size, size, false);
  g.renderer.domElement.style.width = '100%'; g.renderer.domElement.style.height = '100%';
  const tex = p.id === 'pluto' ? null : await new Promise((r) => g.loader.load(`./assets/textures/${p.id}-1k.webp`, (t) => { t.colorSpace = g.THREE.SRGBColorSpace; r(t); }, undefined, () => r(null)));
  g.mesh.material.map = tex; g.mesh.material.color.set(tex ? 0xffffff : p.color); g.mesh.material.needsUpdate = true;
  // trục nghiêng: đặt cực so với pháp tuyến quỹ đạo (nghiêng sang phải màn hình)
  g.tilt.rotation.set(0, 0, -p.obliquity * Math.PI / 180);
  if (g.ring) { g.tilt.remove(g.ring); g.ring = null; }
  if (p.id === 'saturn') {
    const inner = 74500 / 60268, outer = 140200 / 60268;
    const geo = new g.THREE.RingGeometry(inner, outer, 128, 1);
    const pos = geo.attributes.position, uv = geo.attributes.uv;
    for (let k = 0; k < pos.count; k++) uv.setXY(k, (Math.hypot(pos.getX(k), pos.getY(k)) - inner) / (outer - inner), 0.5);
    const rt = await new Promise((r) => g.loader.load('./assets/textures/saturn-ring-strip.png', (t) => { t.colorSpace = g.THREE.SRGBColorSpace; r(t); }, undefined, () => r(null)));
    g.ring = new g.THREE.Mesh(geo, new g.THREE.MeshStandardMaterial({ map: rt, transparent: true, side: g.THREE.DoubleSide, roughness: 1 }));
    g.ring.rotation.x = -Math.PI / 2 + 0.35;
    g.tilt.add(g.ring);
    g.camera.position.z = 7.2;
  } else g.camera.position.z = 4.6;
  const dir = Math.sign(ROTATION[p.id].period);
  cancelAnimationFrame(g.raf);
  const loop = () => {
    g.vel *= 0.94;
    if (!reduced) g.drag += 0.0035 * dir;
    g.mesh.rotation.y = g.drag;
    g.renderer.render(g.scene, g.camera);
    g.raf = requestAnimationFrame(loop);
  };
  loop();
}
function unmountGlobe() { if (globe) cancelAnimationFrame(globe.raf); }

// ---------- Mở / đóng hồ sơ ----------
export function initProfiles(section) {
  const order = PLANETS.map((p) => p.id);
  const grid = section.querySelector('[data-pf-grid]');
  const dwarf = section.querySelector('[data-pf-dwarf]');
  const eight = PLANETS.filter((p) => !p.dwarf);
  grid.innerHTML = eight.map(cardHTML).join('');
  const pl = byId.pluto;
  dwarf.innerHTML = `<div class="pf-dwarf-card">${cardHTML(pl, 8)}</div>
    <div class="pf-iau reveal"><p class="eyebrow">IAU · 2006</p><h3>${IAU_2006.title}</h3>${IAU_2006.text.map((t) => `<p>${t}</p>`).join('')}<p class="small muted">Nguồn: ${IAU_2006.source}.</p></div>`;
  section.querySelectorAll('.reveal').forEach((e) => e.classList.add('is-in'));

  const dlg = document.createElement('dialog');
  dlg.className = 'dossier';
  dlg.setAttribute('aria-label', 'Hồ sơ hành tinh');
  document.body.appendChild(dlg);
  let current = null, fromCard = null;

  function animateIn(card) {
    const sheet = dlg.querySelector('.pf-sheet');
    if (reduced) { gsap.fromTo(sheet, { opacity: 0 }, { opacity: 1, duration: 0.4 }); return; }
    const r = card ? card.getBoundingClientRect() : null;
    const s = sheet.getBoundingClientRect();
    const tl = gsap.timeline();
    if (r) {
      // Thẻ lật mặt (xoay 3D) rồi trải rộng thành bảng dữ liệu
      gsap.set(sheet, { transformOrigin: '50% 50%', transformPerspective: 1600 });
      tl.fromTo(sheet, {
        x: r.left + r.width / 2 - (s.left + s.width / 2), y: r.top + r.height / 2 - (s.top + s.height / 2),
        scaleX: r.width / s.width, scaleY: r.height / s.height, rotateY: -180, opacity: 0.2,
      }, { x: 0, y: 0, scaleX: 1, scaleY: 1, rotateY: 0, opacity: 1, duration: 1.05, ease: 'power3.inOut' });
    }
    // Đường kẻ kỹ thuật tự vẽ
    const paths = sheet.querySelectorAll('.pf-lines path, .pf-reticle circle, .pf-reticle path, .pf-track i');
    tl.from(sheet.querySelectorAll('.pf-lines path, .pf-reticle circle, .pf-reticle path'), { strokeDashoffset: 1200, duration: 1.4, ease: 'power2.out', stagger: 0.08 }, '-=0.35');
    tl.from(sheet.querySelectorAll('.pf-track i'), { width: 0, duration: 1.2, ease: 'power3.out', stagger: 0.12 }, '<0.2');
    // Số liệu đếm lên
    sheet.querySelectorAll('.pf-count').forEach((el, i) => {
      const to = +el.dataset.to, dec = +el.dataset.dec, o = { v: 0 };
      tl.to(o, { v: to, duration: 1.3, ease: 'power2.out', onUpdate: () => (el.textContent = fmt(o.v, dec)) }, 0.75 + i * 0.05);
    });
    tl.from(sheet.querySelectorAll('.pf-hook, .pf-h, .pf-points li, .pf-missions li'), { opacity: 0, y: 12, duration: 0.6, stagger: 0.04 }, 0.8);
    return paths;
  }

  function open(id, card) {
    const idx = order.indexOf(id);
    const p = byId[id];
    current = id; fromCard = card || section.querySelector(`.pf-card[data-id="${id}"]`);
    dlg.innerHTML = dossierHTML(p, idx, order.length);
    dlg.querySelectorAll('.pf-photo img').forEach((img) => img.addEventListener('error', () => {
      img.src = img.dataset.fallback; img.closest('figure').classList.add('is-fallback');
      img.closest('figure').querySelector('figcaption').textContent = 'Không tải được ảnh tàu vũ trụ; đây là hình dựng từ texture Solar System Scope (CC BY 4.0).';
    }, { once: true }));
    if (!dlg.open) { dlg.showModal(); document.documentElement.classList.add('has-dossier'); }
    dlg.scrollTop = 0;
    animateIn(card);
    mountGlobe(dlg.querySelector('[data-globe]'), p);
    dlg.querySelector('[data-act="close"]').focus({ preventScroll: true });
  }
  function close() {
    unmountGlobe();
    const sheet = dlg.querySelector('.pf-sheet');
    const done = () => { dlg.close(); document.documentElement.classList.remove('has-dossier'); fromCard?.focus({ preventScroll: true }); };
    if (reduced || !sheet) return done();
    gsap.to(sheet, { opacity: 0, scale: 0.96, rotateY: 12, duration: 0.35, ease: 'power2.in', onComplete: done });
  }

  section.addEventListener('click', (e) => {
    const card = e.target.closest('.pf-card');
    if (card) open(card.dataset.id, card);
  });
  dlg.addEventListener('click', (e) => {
    const act = e.target.closest('[data-act]')?.dataset.act;
    if (act === 'close' || e.target === dlg) close();
    if (act === 'prev' || act === 'next') {
      const i = (order.indexOf(current) + (act === 'next' ? 1 : -1) + order.length) % order.length;
      open(order[i], null);
    }
  });
  dlg.addEventListener('cancel', (e) => { e.preventDefault(); close(); });
  // Liên kết "Xem hồ sơ" từ mô hình 3D: #ho-so-<id>
  const fromHash = () => { const m = location.hash.match(/^#ho-so-(\w+)$/); if (m && byId[m[1]]) open(m[1]); };
  addEventListener('hashchange', fromHash);
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#ho-so-"]');
    if (!a) return;
    e.preventDefault();
    const id = a.getAttribute('href').slice(7);
    section.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
    setTimeout(() => open(id), reduced ? 0 : 600);
  });
  fromHash();

  initCompare(section.querySelector('[data-compare]'));
}

// ---------- So sánh hai hành tinh, đúng tỉ lệ kích thước ----------
const massText = (m) => (m >= 1 ? `khối lượng gấp <b>${fmt(m, m < 10 ? 2 : 0)} lần</b>` : `nhưng khối lượng chỉ bằng <b>${fmt(m, 2)} lần</b>`);
function initCompare(box) {
  if (!box) return;
  const opts = PLANETS.map((p) => `<option value="${p.id}">${p.vi}</option>`).join('');
  box.innerHTML = `
    <div class="cmp-controls">
      <label>Hành tinh thứ nhất <select class="btn" data-c="a">${opts}</select></label>
      <label>Hành tinh thứ hai <select class="btn" data-c="b">${opts}</select></label>
    </div>
    <div class="cmp-stage" aria-live="polite">
      <figure data-c="fa"><div class="cmp-disk"><img alt=""></div><figcaption></figcaption></figure>
      <figure data-c="fb"><div class="cmp-disk"><img alt=""></div><figcaption></figcaption></figure>
    </div>
    <p class="cmp-text" data-c="text"></p>`;
  const a = box.querySelector('[data-c="a"]'), b = box.querySelector('[data-c="b"]');
  a.value = 'earth'; b.value = 'jupiter';
  const render = () => {
    const pa = byId[a.value], pb = byId[b.value];
    const max = Math.max(pa.diameter, pb.diameter);
    [[pa, 'fa'], [pb, 'fb']].forEach(([p, k]) => {
      const f = box.querySelector(`[data-c="${k}"]`);
      const d = f.querySelector('.cmp-disk');
      f.querySelector('img').src = DISK(p.id);
      f.querySelector('img').alt = p.vi;
      gsap.to(d, { '--s': p.diameter / max, duration: reduced ? 0 : 0.9, ease: 'power3.inOut' });
      f.querySelector('figcaption').innerHTML = `<b>${p.vi}</b><span>${fmt(p.diameter)} km</span>`;
    });
    const big = pa.diameter >= pb.diameter ? pa : pb, small = big === pa ? pb : pa;
    const r = big.diameter / small.diameter;
    box.querySelector('[data-c="text"]').innerHTML = pa === pb ? 'Chọn hai hành tinh khác nhau.' :
      `${big.vi} có đường kính gấp <b>${fmt(r, r < 10 ? 2 : 1)} lần</b> ${small.vi}, ${massText(big.mass / small.mass)}. Hai đĩa trên được vẽ đúng tỉ lệ kích thước với nhau.`;
  };
  a.addEventListener('change', render); b.addEventListener('change', render);
  render();
}
