// C1 — Hệ Mặt Trời sống (Three.js).
// Vị trí các hành tinh: tham số Kepler của JPL (shared/js/astro/kepler.js), mặc định là thời điểm hiện tại.
// Trục quay: hướng cực bắc IAU + chu kỳ tự quay NSSDCA (Sao Kim, Sao Thiên Vương quay ngược).
// Hệ toạ độ: hoàng đạo J2000 (x, y, z) → Three.js (x, z, −y): mặt phẳng hoàng đạo là mặt XZ, cực bắc hoàng đạo hướng +Y.
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { gsap } from 'gsap';
import {
  heliocentric, elementsAt, solveKepler, julianDate, dateFromJD, poleEcliptic, ROTATION, AU_KM, lightSeconds,
} from '../../shared/js/astro/kepler.js';
import { PLANETS, SUN, byId } from './planets-data.js';
import { createSunMaterial, createCorona, createAtmosphere } from './sun-shader.js';
import { isLowPower, prefersReducedMotion, onInView, onVisibilityChange, fmt, clamp } from '../../shared/js/util.js';

const DEG = Math.PI / 180;
const K = 12;                         // đơn vị cảnh trên 1 AU (ở chế độ khoảng cách thật)
const R_UNIT = K / AU_KM;             // đơn vị cảnh trên 1 km
const JD_MIN = 625673.5, JD_MAX = 2817152.5; // 3000 TCN … 3000 (phạm vi Bảng 2 của JPL)

// Ba chế độ tỉ lệ
export const MODES = {
  easy: {
    label: 'Dễ nhìn', pow: 0.5, cam: 105,
    caption: 'Chế độ đã nén: khoảng cách được rút ngắn theo căn bậc hai, kích thước hành tinh được phóng to rất nhiều. Hướng và thứ tự các hành tinh vẫn đúng.',
    planetR: (p) => 0.55 * Math.pow(p.diameter / 12756, 0.45),
    sunR: 2.4,
  },
  dist: {
    label: 'Khoảng cách thật', pow: 1, cam: 560,
    caption: 'Khoảng cách đúng tỉ lệ. Để còn nhìn thấy được, hành tinh được phóng to 1 000 lần và Mặt Trời 50 lần.',
    planetR: (p) => (p.diameter / 2) * R_UNIT * 1000,
    sunR: (SUN.diameter / 2) * R_UNIT * 50,
  },
  real: {
    label: 'Tỉ lệ thật hoàn toàn', pow: 1, cam: 560,
    caption: 'Mọi thứ đúng tỉ lệ, và các hành tinh gần như biến mất. Nếu Mặt Trời là một quả bóng đường kính 10 cm, Trái Đất là một hạt cát 0,9 mm cách nó 10,7 m, còn Sao Hải Vương là một hạt 3,6 mm cách khoảng 324 m.',
    planetR: (p) => (p.diameter / 2) * R_UNIT,
    sunR: (SUN.diameter / 2) * R_UNIT,
  },
};

// Tốc độ thời gian: số ngày mô phỏng trên mỗi giây thực
export const SPEEDS = [
  { v: -365.25, label: '−1 năm / giây' }, { v: -30, label: '−1 tháng / giây' }, { v: -1, label: '−1 ngày / giây' },
  { v: -1 / 24, label: '−1 giờ / giây' }, { v: 0, label: 'Dừng' }, { v: 1 / 86400, label: 'Thời gian thực' },
  { v: 1 / 24, label: '1 giờ / giây' }, { v: 1, label: '1 ngày / giây' }, { v: 30, label: '1 tháng / giây' },
  { v: 365.25, label: '1 năm / giây' },
];

const ecl = (x, y, z) => new THREE.Vector3(x, z, -y);
const remap = (v, pow) => { // v: vector (AU, toạ độ Three) → khoảng cách đã ánh xạ theo chế độ
  const r = v.length();
  if (r < 1e-9) return v.clone();
  return v.clone().multiplyScalar((K * Math.pow(r, pow)) / r);
};

export function formatLightTime(sec) {
  if (sec < 60) return `${fmt(sec, 1)} giây`;
  const h = Math.floor(sec / 3600), m = Math.floor((sec % 3600) / 60), s = Math.round(sec % 60);
  if (h) return `${h} giờ ${m} phút`;
  return `${m} phút ${s} giây`;
}

export function formatDate(jd) {
  const d = dateFromJD(jd);
  const y = d.getUTCFullYear();
  const yy = y <= 0 ? `${1 - y} TCN` : String(y);
  return `${String(d.getUTCDate()).padStart(2, '0')}/${String(d.getUTCMonth() + 1).padStart(2, '0')}/${yy}`;
}

function loadTexture(loader, url) {
  return new Promise((res) => loader.load(url, (t) => { t.colorSpace = THREE.SRGBColorSpace; t.anisotropy = 4; res(t); }, undefined, () => res(null)));
}

export async function initSolarSystem(root, ui) {
  const low = isLowPower();
  const reduced = prefersReducedMotion();
  const host = root.querySelector('.ss-canvas');
  const texBase = root.dataset.textures;

  // ---------- Renderer, cảnh, camera ----------
  const renderer = new THREE.WebGLRenderer({ antialias: !low, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, low ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute('aria-hidden', 'true');

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, 1, 0.0005, 50000);
  camera.position.set(0, 55, 95);
  const controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.08;
  controls.minDistance = 0.002;
  controls.maxDistance = 4000;
  controls.zoomSpeed = 0.9;
  controls.rotateSpeed = 0.6;

  // Trên màn hình cảm ứng: chỉ điều khiển 3D sau khi người xem chủ động bật, để không chặn cuộn trang
  const coarse = matchMedia('(pointer: coarse)').matches;
  const setTouchControl = (on) => {
    controls.enabled = on;
    renderer.domElement.style.touchAction = on ? 'none' : 'pan-y';
    root.classList.toggle('is-interacting', on);
  };
  if (coarse) setTouchControl(false);
  // Trên máy tính: con lăn chỉ phóng to sau khi người xem bấm vào mô hình (tránh "bẫy" cuộn trang)
  if (!coarse) {
    controls.enableZoom = false;
    renderer.domElement.addEventListener('pointerdown', () => { controls.enableZoom = true; host.setAttribute('data-lenis-prevent', ''); root.classList.add('is-engaged'); });
    root.addEventListener('pointerleave', () => { controls.enableZoom = false; host.removeAttribute('data-lenis-prevent'); root.classList.remove('is-engaged'); });
  }

  // Ánh sáng: nguồn điểm tại Mặt Trời, gần như không có ánh sáng môi trường → phía đêm tối hẳn
  const sunLight = new THREE.PointLight(0xfff4e6, 2.6, 0, 0);
  scene.add(sunLight);
  scene.add(new THREE.AmbientLight(0x8090b0, 0.035));

  // Nền sao xa (điểm), màu theo nhiệt độ
  {
    const n = low ? 2500 : 6000;
    const pos = new Float32Array(n * 3), col = new Float32Array(n * 3);
    const palette = [[0.61, 0.69, 1], [0.79, 0.84, 1], [0.97, 0.97, 1], [1, 0.96, 0.92], [1, 0.82, 0.63], [1, 0.8, 0.44]];
    for (let i = 0; i < n; i++) {
      const u = Math.random() * 2 - 1, th = Math.random() * Math.PI * 2, r = 9000;
      pos.set([r * Math.sqrt(1 - u * u) * Math.cos(th), r * u, r * Math.sqrt(1 - u * u) * Math.sin(th)], i * 3);
      const c = palette[(Math.random() * palette.length) | 0], b = 0.35 + Math.pow(Math.random(), 4) * 0.9;
      col.set([c[0] * b, c[1] * b, c[2] * b], i * 3);
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(pos, 3));
    g.setAttribute('color', new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(g, new THREE.PointsMaterial({ size: 1.4, sizeAttenuation: false, vertexColors: true, depthWrite: false }));
    scene.add(stars);
  }

  // ---------- Mặt Trời ----------
  const loader = new THREE.TextureLoader();
  const suffix = low ? '-1k' : '';
  const sunTex = await loadTexture(loader, `${texBase}sun${suffix}.webp`);
  const sunMat = createSunMaterial(sunTex);
  const sun = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), sunMat);
  {
    const p = poleEcliptic('sun');
    sun.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), ecl(p.x, p.y, p.z).normalize());
  }
  scene.add(sun);
  const corona = createCorona();
  scene.add(corona);

  // ---------- Hành tinh ----------
  const planets = [];
  const texs = await Promise.all(PLANETS.map((p) => (p.id === 'pluto' ? null : loadTexture(loader, `${texBase}${p.id}${suffix}.webp`))));
  const ringTex = await loadTexture(loader, `${texBase}saturn-ring-strip.png`);
  const cloudTex = low ? null : await loadTexture(loader, `${texBase}earth-clouds.webp`);

  PLANETS.forEach((data, i) => {
    const group = new THREE.Group();           // vị trí trên quỹ đạo
    const tilt = new THREE.Group();            // hướng trục quay
    const p = poleEcliptic(data.id);
    tilt.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), ecl(p.x, p.y, p.z).normalize());
    const mat = new THREE.MeshStandardMaterial({ map: texs[i], color: texs[i] ? 0xffffff : data.color, roughness: 1, metalness: 0 });
    const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, low ? 40 : 64, low ? 28 : 48), mat);
    mesh.userData.planet = data.id;
    tilt.add(mesh);
    group.add(tilt);
    let clouds = null;
    if (data.id === 'earth' && cloudTex) {
      clouds = new THREE.Mesh(new THREE.SphereGeometry(1.012, 64, 48), new THREE.MeshStandardMaterial({ map: cloudTex, transparent: true, depthWrite: false, roughness: 1 }));
      tilt.add(clouds);
    }
    let atm = null;
    if (data.glow) {
      atm = new THREE.Mesh(new THREE.SphereGeometry(1.06, 48, 32), createAtmosphere(data.glow, data.id === 'earth' ? 1.3 : data.id === 'mars' ? 0.5 : 0.8));
      group.add(atm);
    }
    let ring = null;
    if (data.id === 'saturn' && ringTex) {
      // Vành A–C: bán kính trong ~74 500 km, ngoài ~140 200 km (gồm vành F) so với bán kính xích đạo 60 268 km
      const inner = 74500 / 60268, outer = 140200 / 60268;
      const geo = new THREE.RingGeometry(inner, outer, 160, 1);
      const pos = geo.attributes.position, uv = geo.attributes.uv;
      for (let k = 0; k < pos.count; k++) {
        const r = Math.hypot(pos.getX(k), pos.getY(k));
        uv.setXY(k, (r - inner) / (outer - inner), 0.5);
      }
      ring = new THREE.Mesh(geo, new THREE.MeshStandardMaterial({ map: ringTex, transparent: true, side: THREE.DoubleSide, roughness: 1, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2;
      tilt.add(ring);
    }
    scene.add(group);
    planets.push({ data, group, tilt, mesh, clouds, atm, ring, pos: new THREE.Vector3(), au: new THREE.Vector3(), r: 1, spin: 0 });
  });

  // ---------- Vệt quỹ đạo mờ dần về phía sau ----------
  const ORBIT_N = 360;
  const orbitMat = (color) => new THREE.ShaderMaterial({
    uniforms: { uHead: { value: 0 }, uColor: { value: new THREE.Color(color) }, uOpacity: { value: 1 }, uPow: { value: 0.5 } },
    transparent: true, depthWrite: false,
    vertexShader: /* glsl */`
      attribute float aE; uniform float uPow; varying float vE;
      void main(){
        vE = aE;
        float r = length(position);
        vec3 p = r > 0.0 ? position * (${K.toFixed(1)} * pow(r, uPow) / r) : position;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
      }`,
    fragmentShader: /* glsl */`
      uniform float uHead; uniform vec3 uColor; uniform float uOpacity; varying float vE;
      void main(){
        float f = fract((uHead - vE) / 6.2831853);
        float a = mix(0.07, 0.75, pow(1.0 - f, 2.2));
        gl_FragColor = vec4(uColor, a * uOpacity);
      }`,
  });
  for (const pl of planets) {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array((ORBIT_N + 1) * 3), 3));
    const aE = new Float32Array(ORBIT_N + 1);
    for (let k = 0; k <= ORBIT_N; k++) aE[k] = (k / ORBIT_N) * Math.PI * 2;
    g.setAttribute('aE', new THREE.BufferAttribute(aE, 1));
    pl.orbit = new THREE.Line(g, orbitMat(pl.data.id === 'earth' ? '#8fb8ff' : pl.data.dwarf ? '#9a8f80' : '#ece6d8'));
    pl.orbit.frustumCulled = false;
    scene.add(pl.orbit);
  }
  let orbitsJD = -1e9;
  function buildOrbits(jd) {
    orbitsJD = jd;
    for (const pl of planets) {
      const k = elementsAt(pl.data.id, jd);
      const w = k.omega * DEG, O = k.Omega * DEG, I = k.I * DEG;
      const cw = Math.cos(w), sw = Math.sin(w), cO = Math.cos(O), sO = Math.sin(O), cI = Math.cos(I), sI = Math.sin(I);
      const attr = pl.orbit.geometry.attributes.position;
      for (let n = 0; n <= ORBIT_N; n++) {
        const E = (n / ORBIT_N) * Math.PI * 2;
        const xp = k.a * (Math.cos(E) - k.e), yp = k.a * Math.sqrt(1 - k.e * k.e) * Math.sin(E);
        const x = (cw * cO - sw * sO * cI) * xp + (-sw * cO - cw * sO * cI) * yp;
        const y = (cw * sO + sw * cO * cI) * xp + (-sw * sO + cw * cO * cI) * yp;
        const z = (sw * sI) * xp + (cw * sI) * yp;
        attr.setXYZ(n, x, z, -y);
      }
      attr.needsUpdate = true;
    }
  }

  // ---------- Vành đai tiểu hành tinh (hạt, chuyển động theo định luật Kepler III) ----------
  const belt = (() => {
    const n = low ? 1500 : 4000;
    const a = new Float32Array(n), ph = new Float32Array(n), inc = new Float32Array(n), node = new Float32Array(n), ecc = new Float32Array(n);
    for (let i = 0; i < n; i++) {
      // phần lớn tiểu hành tinh của vành đai chính có bán trục lớn 2,1–3,3 AU
      a[i] = 2.1 + Math.pow(Math.random(), 0.9) * 1.2;
      ph[i] = Math.random() * Math.PI * 2; inc[i] = (Math.random() - 0.5) * 0.35; node[i] = Math.random() * Math.PI * 2;
      ecc[i] = Math.random() * 0.15;
    }
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    g.setAttribute('aA', new THREE.BufferAttribute(a, 1));
    g.setAttribute('aPh', new THREE.BufferAttribute(ph, 1));
    g.setAttribute('aInc', new THREE.BufferAttribute(inc, 1));
    g.setAttribute('aNode', new THREE.BufferAttribute(node, 1));
    g.setAttribute('aEcc', new THREE.BufferAttribute(ecc, 1));
    const mat = new THREE.ShaderMaterial({
      uniforms: { uDays: { value: 0 }, uPow: { value: 0.5 }, uSize: { value: 1.6 * renderer.getPixelRatio() }, uOpacity: { value: 1 } },
      transparent: true, depthWrite: false,
      vertexShader: /* glsl */`
        attribute float aA; attribute float aPh; attribute float aInc; attribute float aNode; attribute float aEcc;
        uniform float uDays; uniform float uPow; uniform float uSize;
        void main(){
          float n = 6.2831853 / (365.25 * pow(aA, 1.5));
          float M = aPh + n * uDays;
          float r = aA * (1.0 - aEcc * cos(M));
          float x = r * cos(M), y = r * sin(M), z = r * sin(aInc) * sin(M - aNode);
          vec3 p = vec3(x, z, -y);
          float rr = length(p);
          p *= ${K.toFixed(1)} * pow(rr, uPow) / rr;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_PointSize = uSize;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */`
        uniform float uOpacity;
        void main(){
          vec2 c = gl_PointCoord - 0.5;
          if (dot(c, c) > 0.25) discard;
          gl_FragColor = vec4(0.78, 0.72, 0.64, 0.55 * uOpacity);
        }`,
    });
    const pts = new THREE.Points(g, mat);
    pts.frustumCulled = false;
    scene.add(pts);
    return { pts, mat };
  })();

  // ---------- Xung ánh sáng ----------
  const pulse = (() => {
    const mat = new THREE.ShaderMaterial({
      uniforms: { uOpacity: { value: 0 } }, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending, side: THREE.DoubleSide,
      vertexShader: /* glsl */`varying vec3 vN; varying vec3 vV;
        void main(){ vec4 w = modelMatrix * vec4(position,1.0); vN = normalize(mat3(modelMatrix)*normal); vV = normalize(cameraPosition - w.xyz);
        gl_Position = projectionMatrix * viewMatrix * w; }`,
      fragmentShader: /* glsl */`uniform float uOpacity; varying vec3 vN; varying vec3 vV;
        void main(){ float rim = pow(1.0 - abs(dot(vN, vV)), 3.0); gl_FragColor = vec4(vec3(1.0, 0.86, 0.55) * (0.04 + rim * 0.7) * uOpacity, 1.0); }`,
    });
    const shell = new THREE.Mesh(new THREE.SphereGeometry(1, 64, 48), mat);
    const ringMat = new THREE.MeshBasicMaterial({ color: 0xffdc8c, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
    const ring = new THREE.Mesh(new THREE.RingGeometry(0.995, 1, 256, 1), ringMat);
    ring.rotation.x = -Math.PI / 2;
    shell.visible = ring.visible = false;
    scene.add(shell, ring);
    return { shell, ring, mat, ringMat, active: false, t0: 0, rate: 60, targets: [] };
  })();

  // ---------- Hậu kỳ (bloom vừa phải) ----------
  let composer = null;
  if (!low) {
    composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    composer.addPass(new UnrealBloomPass(new THREE.Vector2(1, 1), 0.55, 0.5, 0.82));
    composer.addPass(new OutputPass());
  }

  // ---------- Trạng thái ----------
  const state = {
    jd: julianDate(new Date()),
    speedIndex: SPEEDS.findIndex((s) => s.label === 'Thời gian thực'),
    mode: 'easy',
    from: MODES.easy, to: MODES.easy, mix: 1,
    focus: null,
    live: true, // đang bám theo "bây giờ"
  };

  function radiusFor(mode, pl) { return mode.planetR(pl.data); }
  function sunRadiusFor(mode) { return mode.sunR; }
  const lerpLog = (a, b, t) => Math.exp(Math.log(a) + (Math.log(b) - Math.log(a)) * t);

  // ---------- Cập nhật vị trí ----------
  const tmp = new THREE.Vector3();
  function updateBodies() {
    const jd = state.jd;
    if (Math.abs(jd - orbitsJD) > 3650) buildOrbits(jd);
    const pow = state.from.pow + (state.to.pow - state.from.pow) * state.mix;
    const hours = (jd - 2451545) * 24;
    for (const pl of planets) {
      const h = heliocentric(pl.data.id, jd);
      pl.au.copy(ecl(h.x, h.y, h.z));
      pl.pos.copy(remap(pl.au, pow));
      pl.group.position.copy(pl.pos);
      pl.r = lerpLog(radiusFor(state.from, pl), radiusFor(state.to, pl), state.mix);
      pl.group.scale.setScalar(pl.r);
      // tự quay quanh trục: góc = 2π · t / chu kỳ (chu kỳ âm → quay ngược)
      const period = ROTATION[pl.data.id].period;
      const turns = hours / period;
      pl.mesh.rotation.y = (turns - Math.floor(turns)) * Math.PI * 2 + pl.spin;
      if (pl.clouds) pl.clouds.rotation.y = pl.mesh.rotation.y * 1.0 + 0.3;
      if (pl.atm) pl.atm.material.uniforms.uSun.value.set(0, 0, 0);
      const E = solveKepler(elementsAt(pl.data.id, jd).M * DEG, elementsAt(pl.data.id, jd).e);
      pl.orbit.material.uniforms.uHead.value = E;
      pl.orbit.material.uniforms.uPow.value = pow;
    }
    const sr = lerpLog(sunRadiusFor(state.from), sunRadiusFor(state.to), state.mix);
    sun.scale.setScalar(sr);
    sun.rotation.y = 0;
    corona.scale.setScalar(sr * 4);
    belt.mat.uniforms.uDays.value = jd - 2451545;
    belt.mat.uniforms.uPow.value = pow;
    return pow;
  }

  // ---------- Nhãn (HTML, bấm được, điều khiển bằng bàn phím) ----------
  const labelLayer = root.querySelector('.ss-labels');
  const labels = [];
  const makeLabel = (id, text, cls = '') => {
    const b = document.createElement('button');
    b.type = 'button'; b.className = `ss-label ${cls}`; b.dataset.id = id;
    b.innerHTML = `<i></i><span>${text}</span>`;
    labelLayer.appendChild(b);
    return b;
  };
  const sunLabel = makeLabel('sun', 'Mặt Trời', 'is-sun');
  sunLabel.setAttribute('aria-label', 'Mặt Trời — bấm để phát một xung ánh sáng');
  for (const pl of planets) {
    const b = makeLabel(pl.data.id, pl.data.vi, pl.data.dwarf ? 'is-dwarf' : '');
    b.setAttribute('aria-label', `${pl.data.vi} — bay tới gần`);
    labels.push({ el: b, pl });
  }
  labelLayer.addEventListener('click', (e) => {
    const b = e.target.closest('.ss-label');
    if (!b) return;
    if (b.dataset.id === 'sun') firePulse(); else focusPlanet(b.dataset.id);
  });

  const proj = new THREE.Vector3();
  function placeLabels() {
    const w = host.clientWidth, h = host.clientHeight;
    const place = (el, v, show) => {
      proj.copy(v).project(camera);
      const vis = show && proj.z < 1 && Math.abs(proj.x) < 1.1 && Math.abs(proj.y) < 1.1;
      el.style.transform = `translate(${((proj.x + 1) / 2 * w).toFixed(1)}px, ${((1 - proj.y) / 2 * h).toFixed(1)}px)`;
      el.classList.toggle('is-hidden', !vis);
    };
    place(sunLabel, sun.position, !state.focus);
    for (const { el, pl } of labels) place(el, pl.pos, !state.focus || state.focus === pl);
  }

  // ---------- Chọn hành tinh: camera bay tới ----------
  const raycaster = new THREE.Raycaster();
  const pointer = new THREE.Vector2();
  let downAt = null;
  renderer.domElement.addEventListener('pointerdown', (e) => { downAt = [e.clientX, e.clientY]; });
  renderer.domElement.addEventListener('pointerup', (e) => {
    if (!downAt || Math.hypot(e.clientX - downAt[0], e.clientY - downAt[1]) > 6) return;
    const r = renderer.domElement.getBoundingClientRect();
    pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
    raycaster.setFromCamera(pointer, camera);
    const hits = raycaster.intersectObjects([sun, ...planets.map((p) => p.mesh)], false);
    if (!hits.length) return;
    const o = hits[0].object;
    if (o === sun) firePulse(); else focusPlanet(o.userData.planet);
  });

  let lastFocusPos = new THREE.Vector3();
  function focusPlanet(id) {
    const pl = planets.find((p) => p.data.id === id);
    if (!pl) return;
    state.focus = pl;
    root.classList.add('is-focused');
    lastFocusPos.copy(pl.pos);
    // đặt camera ở phía được chiếu sáng, lệch một góc để thấy cả đường phân chia ngày–đêm
    const dir = pl.pos.clone().normalize().multiplyScalar(-1).applyAxisAngle(new THREE.Vector3(0, 1, 0), 0.7);
    dir.y += 0.25; dir.normalize();
    const extra = pl.ring ? 2.4 : 1;
    const dist = Math.max(pl.r * 4.2 * extra, 0.0004);
    const endPos = pl.pos.clone().add(dir.multiplyScalar(dist));
    controls.minDistance = Math.max(pl.r * 1.3, 0.00005);
    const dur = reduced ? 0 : 1.8;
    gsap.to(controls.target, { x: pl.pos.x, y: pl.pos.y, z: pl.pos.z, duration: dur, ease: 'power3.inOut' });
    gsap.to(camera.position, { x: endPos.x, y: endPos.y, z: endPos.z, duration: dur, ease: 'power3.inOut' });
    ui.onFocus?.(pl.data, { lightSec: lightSeconds(pl.au.length()) });
  }
  function unfocus() {
    if (!state.focus) return;
    state.focus = null;
    root.classList.remove('is-focused');
    controls.minDistance = 0.002;
    fitCamera(state.to);
    ui.onFocus?.(null);
  }

  function fitCamera(mode) {
    const dur = reduced ? 0 : 2;
    const dir = camera.position.clone().sub(controls.target).normalize();
    if (dir.y < 0.25) { dir.y = 0.45; dir.normalize(); }
    const end = dir.multiplyScalar(mode.cam);
    gsap.to(controls.target, { x: 0, y: 0, z: 0, duration: dur, ease: 'power3.inOut' });
    gsap.to(camera.position, { x: end.x, y: end.y, z: end.z, duration: dur, ease: 'power3.inOut' });
  }

  function setMode(id) {
    if (!MODES[id] || id === state.mode) return;
    const cur = { pow: state.from.pow + (state.to.pow - state.from.pow) * state.mix };
    // trạng thái hiện tại (có thể đang chuyển dở) làm điểm xuất phát
    const snapshot = {
      pow: cur.pow,
      planetR: (p) => { const pl = planets.find((x) => x.data === p); return pl ? pl.r : 1; },
      sunR: sun.scale.x,
    };
    state.from = snapshot; state.to = MODES[id]; state.mix = 0; state.mode = id;
    gsap.to(state, { mix: 1, duration: reduced ? 0 : 2.2, ease: 'power2.inOut' });
    if (state.focus) { const f = state.focus.data.id; state.focus = null; setTimeout(() => focusPlanet(f), reduced ? 0 : 2300); }
    else fitCamera(MODES[id]);
    ui.onMode?.(id, MODES[id]);
  }

  // ---------- Xung ánh sáng ----------
  function firePulse() {
    pulse.active = true;
    pulse.t0 = performance.now();
    pulse.targets = planets.map((pl) => ({ id: pl.data.id, name: pl.data.vi, sec: lightSeconds(pl.au.length()), arrived: false }));
    pulse.shell.visible = pulse.ring.visible = true;
    ui.onPulse?.(pulse.targets, pulse.rate);
  }
  function stopPulse() {
    pulse.active = false; pulse.shell.visible = pulse.ring.visible = false;
    ui.onPulseEnd?.();
  }
  function updatePulse(pow) {
    if (!pulse.active) return;
    const simSec = ((performance.now() - pulse.t0) / 1000) * pulse.rate;
    const rAU = simSec / lightSeconds(1);
    const d = Math.max(0.001, K * Math.pow(rAU, pow));
    pulse.shell.scale.setScalar(d); pulse.ring.scale.setScalar(d);
    const fade = clamp(1 - rAU / 48, 0, 1);
    pulse.mat.uniforms.uOpacity.value = fade;
    pulse.ringMat.opacity = 0.75 * fade;
    for (const t of pulse.targets) if (!t.arrived && simSec >= t.sec) t.arrived = true;
    ui.onPulseTick?.(simSec, pulse.targets);
    if (rAU > 48) stopPulse();
  }

  // ---------- Kích thước & vòng lặp ----------
  function resize() {
    const w = host.clientWidth, h = host.clientHeight;
    renderer.setSize(w, h, false);
    composer?.setSize(w, h);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  resize();
  new ResizeObserver(resize).observe(host);

  let running = false, visible = false, last = performance.now(), raf = 0, uiTick = 0;
  function frame(now) {
    if (!running) return;
    const dt = Math.min(0.1, (now - last) / 1000); last = now;
    const speed = SPEEDS[state.speedIndex].v;
    if (state.live && speed === 1 / 86400) state.jd = julianDate(new Date());
    else state.jd = clamp(state.jd + speed * dt, JD_MIN, JD_MAX);
    if (state.focus && !reduced) state.focus.spin += dt * 0.12 * Math.sign(ROTATION[state.focus.data.id].period);
    const pow = updateBodies();
    // bám theo hành tinh đang chọn khi nó chuyển động
    if (state.focus) {
      tmp.copy(state.focus.pos).sub(lastFocusPos);
      if (!gsap.isTweening(camera.position)) { camera.position.add(tmp); controls.target.add(tmp); }
      lastFocusPos.copy(state.focus.pos);
    }
    sunMat.uniforms.uTime.value = now / 1000;
    corona.material.uniforms.uTime.value = now / 1000;
    const camDist = camera.position.distanceTo(sun.position);
    // chế độ tỉ lệ thật: corona và bloom giảm để thấy Mặt Trời nhỏ bé đến đâu
    corona.material.uniforms.uStrength.value = state.to === MODES.real ? 0.35 + 0.65 * (1 - state.mix) : 1;
    belt.mat.uniforms.uOpacity.value = state.to === MODES.real ? 0.5 : 1;
    updatePulse(pow);
    controls.update();
    placeLabels();
    if (composer) composer.render(); else renderer.render(scene, camera);
    if (++uiTick % 6 === 0) ui.onTick?.(state.jd, SPEEDS[state.speedIndex], camDist);
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!running && visible && !document.hidden) { running = true; last = performance.now(); raf = requestAnimationFrame(frame); } };
  const stop = () => { running = false; cancelAnimationFrame(raf); };
  onInView(root, (v) => { visible = v; v ? start() : stop(); }, '0px');
  onVisibilityChange((v) => (v ? start() : stop()));

  buildOrbits(state.jd);
  updateBodies();
  renderer.render(scene, camera);

  return {
    state,
    setMode,
    setSpeed(i) { state.speedIndex = clamp(i, 0, SPEEDS.length - 1); state.live = SPEEDS[state.speedIndex].label === 'Thời gian thực' && state.live; },
    setDate(date) { state.jd = clamp(julianDate(date), JD_MIN, JD_MAX); state.live = false; if (SPEEDS[state.speedIndex].v === 1 / 86400) state.speedIndex = SPEEDS.findIndex((s) => s.v === 0); },
    today() { state.jd = julianDate(new Date()); state.live = true; state.speedIndex = SPEEDS.findIndex((s) => s.label === 'Thời gian thực'); },
    focusPlanet, unfocus, firePulse, stopPulse,
    setPulseRate(r) { pulse.rate = r; },
    setTouchControl,
    planets: PLANETS,
  };
}
