// Bản đồ tri thức 3D: mỗi chương là một chòm sao, mỗi ngôi sao là một khái niệm.
// Sao của khái niệm đã đọc sáng hơn; đọc đủ một chương thì các đường nối của chòm sao tự vẽ kín.
// Render chỉ chạy khi bản đồ trên màn hình và tab đang mở.
import * as THREE from 'three';
import { isLowPower, prefersReducedMotion, onInView, onVisibilityChange } from '../../shared/js/util.js';

/** RNG có hạt giống — vị trí sao cố định giữa các lần tải trang. */
function rng(seed) {
  let s = seed >>> 0;
  return () => { s = (s + 0x6D2B79F5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
}

function glowTexture() {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const g = c.getContext('2d');
  const grd = g.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, 'rgba(255,255,255,1)');
  grd.addColorStop(0.12, 'rgba(255,255,255,0.95)');
  grd.addColorStop(0.28, 'rgba(255,255,255,0.35)');
  grd.addColorStop(0.6, 'rgba(255,255,255,0.06)');
  grd.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = grd; g.fillRect(0, 0, 128, 128);
  // tia sáng chữ thập mảnh
  g.globalCompositeOperation = 'lighter';
  g.fillStyle = 'rgba(255,255,255,0.25)';
  g.fillRect(62, 8, 4, 112); g.fillRect(8, 62, 112, 4);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

/** Bố cục tâm các chòm sao theo tỉ lệ khung: trả về [x, y, z] cho từng chương. */
function layout(n, aspect) {
  const cols = aspect > 1.25 ? 5 : aspect > 0.85 ? 4 : 3;
  const rows = Math.ceil(n / cols);
  const gx = 30, gy = 26;
  const out = [];
  for (let i = 0; i < n; i++) {
    const r = Math.floor(i / cols), c = i % cols;
    const inRow = Math.min(cols, n - r * cols);
    const x = (c - (inRow - 1) / 2) * gx + (r % 2 ? gx * 0.22 : -gx * 0.12);
    const y = ((rows - 1) / 2 - r) * gy;
    const z = -[0, 14, -8, 10, -12, 6, -4, 16, -10][i % 9];
    out.push([x, y, z]);
  }
  return { centers: out, width: cols * gx, height: rows * gy };
}

export function createMap(container, { chapters, isRead, onOpenConcept, onOpenChapter, onHover }) {
  const low = isLowPower();
  const reduced = prefersReducedMotion();
  const renderer = new THREE.WebGLRenderer({ antialias: !low, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, low ? 1 : 1.75));
  renderer.setClearColor(0x000000, 0);
  container.append(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 2000);
  const rig = new THREE.Group(); // xoay nhẹ theo kéo chuột
  scene.add(rig);

  const tex = glowTexture();
  const stars = [];      // { sprite, concept, chapter, base, phase }
  const chapterGroups = [];
  const labelsEl = document.createElement('div');
  labelsEl.className = 'map-labels';
  container.append(labelsEl);

  // Bụi sao nền (rất mờ) tạo chiều sâu
  {
    const n = low ? 500 : 1400, pos = new Float32Array(n * 3), r = rng(7);
    for (let i = 0; i < n; i++) { pos[i * 3] = (r() - 0.5) * 420; pos[i * 3 + 1] = (r() - 0.5) * 260; pos[i * 3 + 2] = -60 - r() * 220; }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    rig.add(new THREE.Points(g, new THREE.PointsMaterial({ color: 0x9fb4c8, size: 0.55, transparent: true, opacity: 0.45, depthWrite: false })));
  }

  chapters.forEach((ch, ci) => {
    const group = new THREE.Group();
    rig.add(group);
    const color = new THREE.Color(ch.color);
    const r = rng(1000 + ci * 97);
    // Vị trí sao trong chòm: bước ngẫu nhiên có hạt giống, giữ khoảng cách tối thiểu
    const pts = [];
    ch.concepts.forEach((c, k) => {
      let p, tries = 0;
      do {
        const prev = pts[k - 1] || new THREE.Vector3(-6, 2, 0);
        const ang = r() * Math.PI * 2;
        const step = k === 0 ? 0 : 4.2 + r() * 2.4;
        p = k === 0 ? new THREE.Vector3(-6 + r() * 2, 3 - r() * 4, 0) : new THREE.Vector3(prev.x + Math.cos(ang) * step * 1.15, prev.y + Math.sin(ang) * step * 0.8, (r() - 0.5) * 6);
        p.x = Math.max(-10, Math.min(10, p.x)); p.y = Math.max(-7.5, Math.min(7.5, p.y));
        tries++;
      } while (tries < 40 && pts.some((q) => q.distanceTo(p) < 3.6));
      pts.push(p);
      const mat = new THREE.SpriteMaterial({ map: tex, color, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending });
      const sprite = new THREE.Sprite(mat);
      sprite.position.copy(p);
      sprite.userData = { id: c.id, chapter: ch.id };
      group.add(sprite);
      stars.push({ sprite, concept: c, chapter: ch, phase: r() * 6.28, base: 1 });
    });
    // Đường nối chòm sao theo `links`
    const segs = [];
    ch.concepts.forEach((c, k) => (c.links || []).forEach((to) => {
      const j = ch.concepts.findIndex((x) => x.id === to);
      if (j >= 0) segs.push([k, j]);
    }));
    const lines = segs.map(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([pts[a], pts[b]]);
      const m = new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.08, depthWrite: false });
      const line = new THREE.Line(g, m);
      group.add(line);
      return { line, a: ch.concepts[a].id, b: ch.concepts[b].id, draw: 1 };
    });
    // Nhãn chương: nút HTML (bấm được bằng bàn phím) đặt dưới chòm sao
    const label = document.createElement('button');
    label.type = 'button';
    label.className = 'map-chapter';
    label.style.setProperty('--c', ch.color);
    label.innerHTML = `<span class="map-chapter-num">Chương ${ch.num}</span><span class="map-chapter-title">${ch.title}</span>`;
    label.addEventListener('click', () => onOpenChapter?.(ch.id, label.getBoundingClientRect()));
    labelsEl.append(label);
    chapterGroups.push({ ch, group, pts, lines, label, complete: false });
  });

  // Tooltip khi rê vào sao
  const tip = document.createElement('div');
  tip.className = 'map-tip'; tip.hidden = true;
  container.append(tip);

  /* ——— Bố cục & camera ——— */
  let home = new THREE.Vector3(0, 0, 100);
  function resize() {
    const w = container.clientWidth, h = container.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
    const L = layout(chapters.length, camera.aspect);
    chapterGroups.forEach((g, i) => g.group.position.set(...L.centers[i]));
    // Khoảng cách camera để toàn bộ bố cục lọt khung (cộng lề)
    const vfov = THREE.MathUtils.degToRad(camera.fov);
    const needH = (L.height + 22) / 2 / Math.tan(vfov / 2);
    const needW = (L.width + 18) / 2 / (Math.tan(vfov / 2) * camera.aspect);
    home = new THREE.Vector3(0, -2, Math.max(needH, needW) + 8);
    if (!flying && !focused) { camera.position.copy(home); camera.lookAt(0, -2, 0); }
    render();
  }

  /* ——— Trạng thái sao (đã đọc / sẵn sàng / đang biên soạn) ——— */
  function refresh() {
    for (const s of stars) {
      const ready = s.chapter.status === 'ready';
      const read = ready && isRead(s.concept.id);
      s.base = read ? 3.1 : ready ? 2.1 : 1.15;
      s.sprite.material.opacity = read ? 1 : ready ? 0.78 : 0.3;
      s.read = read; s.ready = ready;
    }
    for (const g of chapterGroups) {
      const ready = g.ch.status === 'ready';
      const allRead = ready && g.ch.concepts.every((c) => isRead(c.id));
      g.label.classList.toggle('is-draft', !ready);
      g.label.dataset.state = !ready ? 'Đang biên soạn' : allRead ? 'Đã thắp sáng' : `${g.ch.concepts.filter((c) => isRead(c.id)).length}/${g.ch.concepts.length}`;
      for (const l of g.lines) {
        const both = isRead(l.a) && isRead(l.b);
        l.line.material.opacity = allRead ? 0.75 : both ? 0.5 : ready ? 0.16 : 0.06;
      }
      // Vừa đọc trọn chương: vẽ lại đường nối từ đầu như đang được nối
      if (allRead && !g.complete && !reduced) {
        g.lines.forEach((l, i) => { l.draw = 0; l.delay = i * 0.18; });
        kick();
      }
      g.complete = allRead;
    }
    render();
  }

  /* ——— Tương tác ——— */
  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  let hovered = null, dragging = false, down = null, yaw = 0, pitch = 0, tYaw = 0, tPitch = 0, flying = false, focused = null;
  const mouse = { x: 0, y: 0 };

  function pick(e) {
    const r = renderer.domElement.getBoundingClientRect();
    ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    ray.setFromCamera(ndc, camera);
    // Vùng bấm rộng hơn hình sao một chút cho dễ chạm
    const hits = ray.intersectObjects(stars.map((s) => s.sprite), false);
    if (hits.length) return stars.find((s) => s.sprite === hits[0].object);
    // Dự phòng: sao gần con trỏ nhất trong bán kính 22px
    let best = null, bd = 22;
    const v = new THREE.Vector3();
    for (const s of stars) {
      s.sprite.getWorldPosition(v).project(camera);
      const x = (v.x + 1) / 2 * r.width + r.left, y = (1 - v.y) / 2 * r.height + r.top;
      const d = Math.hypot(x - e.clientX, y - e.clientY);
      if (d < bd) { bd = d; best = s; }
    }
    return best;
  }

  function screenPos(s) {
    const v = new THREE.Vector3();
    s.sprite.getWorldPosition(v).project(camera);
    const r = renderer.domElement.getBoundingClientRect();
    return { x: (v.x + 1) / 2 * r.width + r.left, y: (1 - v.y) / 2 * r.height + r.top };
  }

  function setHover(s, e) {
    if (hovered === s) { if (s && e) placeTip(e); return; }
    hovered = s;
    container.style.cursor = s ? 'pointer' : '';
    if (!s) { tip.hidden = true; onHover?.(null); kick(); return; }
    tip.innerHTML = `<span class="map-tip-ch" style="--c:${s.chapter.color}">Chương ${s.chapter.num}</span><b>${s.concept.title}</b><span class="map-tip-en">${s.concept.en}</span>${s.ready ? (s.read ? '<span class="map-tip-st">Đã đọc ✓</span>' : '') : '<span class="map-tip-st">Đang biên soạn</span>'}`;
    tip.hidden = false;
    placeTip(e);
    onHover?.(s.concept.id);
    kick();
  }
  function placeTip(e) {
    const r = container.getBoundingClientRect();
    const x = Math.min(r.width - 230, Math.max(8, e.clientX - r.left + 16));
    tip.style.transform = `translate(${x}px, ${e.clientY - r.top + 14}px)`;
  }

  const el = renderer.domElement;
  el.addEventListener('pointerdown', (e) => { down = { x: e.clientX, y: e.clientY, yaw: tYaw, pitch: tPitch }; dragging = false; });
  addEventListener('pointerup', () => { down = null; setTimeout(() => { dragging = false; }); });
  el.addEventListener('pointermove', (e) => {
    const r = container.getBoundingClientRect();
    mouse.x = (e.clientX - r.left) / r.width - 0.5; mouse.y = (e.clientY - r.top) / r.height - 0.5;
    if (down && e.buttons) {
      const dx = e.clientX - down.x, dy = e.clientY - down.y;
      if (Math.hypot(dx, dy) > 6) dragging = true;
      if (dragging) { tYaw = Math.max(-0.45, Math.min(0.45, down.yaw - dx * 0.0025)); tPitch = Math.max(-0.25, Math.min(0.25, down.pitch - dy * 0.0025)); setHover(null); kick(); return; }
    }
    if (e.pointerType === 'mouse') setHover(pick(e), e);
    kick();
  });
  el.addEventListener('pointerleave', () => setHover(null));
  el.addEventListener('click', (e) => {
    if (dragging) return;
    const s = pick(e);
    if (!s) return;
    if (!s.ready) { setHover(s, e); return; }
    flyTo(s).then(() => onOpenConcept?.(s.concept.id, screenPos(s)));
  });

  /* ——— Camera bay tới sao ——— */
  let tween = null;
  function animateCamera(toPos, toLook, dur) {
    return new Promise((resolve) => {
      const fromPos = camera.position.clone();
      const fromLook = lookAt.clone();
      const t0 = performance.now();
      flying = true;
      tween = (t) => {
        const k = Math.min(1, (t - t0) / dur);
        const e = k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;
        camera.position.lerpVectors(fromPos, toPos, e);
        lookAt.lerpVectors(fromLook, toLook, e);
        if (k >= 1) { tween = null; flying = false; resolve(); }
      };
      kick();
    });
  }
  const lookAt = new THREE.Vector3(0, -2, 0);
  function flyTo(s) {
    if (reduced) return Promise.resolve();
    const p = new THREE.Vector3();
    s.sprite.getWorldPosition(p);
    focused = s;
    const dir = p.clone().sub(camera.position).normalize();
    return animateCamera(p.clone().sub(dir.multiplyScalar(9)), p, 900);
  }
  function flyHome() {
    focused = null;
    if (reduced) { camera.position.copy(home); lookAt.set(0, -2, 0); render(); return Promise.resolve(); }
    return animateCamera(home.clone(), new THREE.Vector3(0, -2, 0), 900);
  }
  function focusConcept(id) {
    const s = stars.find((x) => x.concept.id === id);
    return s ? flyTo(s) : Promise.resolve();
  }

  /* ——— Vòng render theo nhu cầu ——— */
  let raf = 0, running = false, inView = true, visible = true, last = performance.now();
  const v3 = new THREE.Vector3();
  function render(t = performance.now()) {
    const dt = Math.min(0.05, (t - last) / 1000); last = t;
    yaw += (tYaw + (reduced ? 0 : mouse.x * 0.06) - yaw) * 0.06;
    pitch += (tPitch + (reduced ? 0 : mouse.y * 0.04) - pitch) * 0.06;
    rig.rotation.set(pitch, yaw, 0);
    if (tween) tween(t);
    camera.lookAt(lookAt);
    for (const s of stars) {
      const tw = reduced ? 1 : 1 + Math.sin(t * 0.0016 + s.phase) * 0.08;
      const hover = s === hovered ? 1.45 : 1;
      s.sprite.scale.setScalar(s.base * tw * hover);
    }
    let animating = false;
    for (const g of chapterGroups) {
      for (const l of g.lines) {
        if (l.draw < 1) {
          if (l.delay > 0) { l.delay -= dt; animating = true; l.line.geometry.setDrawRange(0, 0); continue; }
          l.draw = Math.min(1, l.draw + dt * 1.4);
          // Vẽ dần đoạn thẳng: dịch điểm cuối từ đầu đoạn tới cuối đoạn
          const pos = l.line.geometry.attributes.position;
          const a = g.pts[g.ch.concepts.findIndex((c) => c.id === l.a)], b = g.pts[g.ch.concepts.findIndex((c) => c.id === l.b)];
          v3.lerpVectors(a, b, l.draw);
          pos.setXYZ(1, v3.x, v3.y, v3.z); pos.needsUpdate = true;
          l.line.geometry.setDrawRange(0, 2);
          animating = true;
        }
      }
      // Nhãn chương: chiếu tâm chòm sao xuống màn hình
      v3.set(0, -9.5, 0); g.group.localToWorld(v3); v3.project(camera);
      const w = container.clientWidth, h = container.clientHeight;
      const hidden = v3.z > 1 || focused;
      g.label.style.transform = `translate(-50%, 0) translate(${((v3.x + 1) / 2 * w).toFixed(1)}px, ${((1 - v3.y) / 2 * h).toFixed(1)}px)`;
      g.label.classList.toggle('is-hidden', !!hidden);
    }
    renderer.render(scene, camera);
    return animating;
  }
  function loop(t) {
    raf = 0;
    const animating = render(t);
    const settling = Math.abs(tYaw + mouse.x * 0.06 - yaw) > 0.0005 || Math.abs(tPitch + mouse.y * 0.04 - pitch) > 0.0005;
    // Nhấp nháy liên tục cần render đều; máy yếu/giảm chuyển động thì chỉ render khi có thay đổi
    if (running && (tween || animating || settling || (!reduced && !low) || hovered)) raf = requestAnimationFrame(loop);
  }
  function kick() { if (running && !raf) raf = requestAnimationFrame(loop); }
  function setRunning() {
    running = inView && visible;
    if (running) kick(); else { cancelAnimationFrame(raf); raf = 0; }
  }
  onInView(container, (v) => { inView = v; setRunning(); }, '0px');
  onVisibilityChange((v) => { visible = v; setRunning(); });

  const ro = new ResizeObserver(resize);
  ro.observe(container);
  resize(); refresh(); setRunning();

  return {
    refresh, flyHome, focusConcept,
    screenPosOf: (id) => { const s = stars.find((x) => x.concept.id === id); return s ? screenPos(s) : null; },
    destroy() { running = false; cancelAnimationFrame(raf); ro.disconnect(); renderer.dispose(); container.innerHTML = ''; },
  };
}
