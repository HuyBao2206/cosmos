"""Sinh ảnh minh hoạ cho cảnh "Tỉ lệ của bạn" trên trang chủ (chạy một lần, kết quả lưu trong home/assets/).

    /tmp/py/bin/pip install numpy pillow scipy
    /tmp/py/bin/python tools/make_home_assets.py

- galaxy.webp: Ngân Hà nhìn từ trên xuống — MINH HOẠ theo mô hình xoắn ốc có thanh chắn
  (2 nhánh chính, 2 nhánh phụ). Ảnh phủ 120 000 năm ánh sáng; vị trí Mặt Trời ghi trong galaxy.json.
- web-laniakea.webp, web-universe.webp: mạng lưới vũ trụ minh hoạ bằng nhiễu tế bào (Voronoi F2−F1):
  thiên hà tập trung trên tường và sợi bao quanh khoảng trống.
- earth-disk.webp: Trái Đất từ texture Solar System Scope (CC BY 4.0).
"""
import json, math
import numpy as np
from PIL import Image
from scipy.ndimage import gaussian_filter
from scipy.spatial import cKDTree

OUT = 'home/assets/'
rng = np.random.default_rng(7)

def tonemap(img, gain):
    return 1 - np.exp(-img * gain)

def save(arr, name, q=72):
    # RGBA: alpha = độ sáng, để ảnh hoà vào nền sao thay vì phủ một ô vuông đen
    arr = np.clip(arr, 0, 1)
    a = arr.max(axis=2, keepdims=True)
    rgb = np.where(a > 0.03, arr / np.maximum(a, 1e-4), 0.8)
    rgb = np.round(rgb * 24) / 24  # giảm nhiễu màu ở vùng tối → ảnh nhẹ hơn
    out = np.concatenate([rgb, a], axis=2)
    im = Image.fromarray((out * 255).astype(np.uint8), 'RGBA')
    if im.width > 1280: im = im.resize((1280, 1280), Image.LANCZOS)
    im.save(OUT + name, 'WEBP', quality=q)

# ---------------- Ngân Hà ----------------
N = 2048
SPAN = 120000.0  # năm ánh sáng trên toàn ảnh
R = 50000.0
img = np.zeros((N, N, 3))
def splat(x, y, col, w=1.0):
    px = ((x / SPAN + 0.5) * N).astype(int); py = ((0.5 - y / SPAN) * N).astype(int)
    m = (px >= 0) & (px < N) & (py >= 0) & (py < N)
    idx = py[m] * N + px[m]
    for c in range(3):
        img[..., c].flat[:] += np.bincount(idx, minlength=N * N) * col[c] * w

pitch = math.radians(16)
arms = [(0.0, 1.0), (math.pi, 1.0), (math.pi / 2, 0.55), (3 * math.pi / 2, 0.55)]
# đĩa nền
n = 1_400_000
r = rng.exponential(R * 0.3, n); r = r[r < R * 1.15][:n]
th = rng.uniform(0, 2 * math.pi, r.size)
splat(r * np.cos(th), r * np.sin(th), (0.9, 0.85, 0.78), 0.5)
# nhánh xoắn
for phase, strength in arms:
    m = int(900_000 * strength)
    t = rng.uniform(0, 1, m) ** 0.8
    rr = 9000 + t * (R * 1.05 - 9000)
    ang = phase + np.log(rr / 9000) / math.tan(pitch)
    spread = 500 + rr * 0.035
    x = rr * np.cos(ang) + rng.normal(0, spread)
    y = rr * np.sin(ang) + rng.normal(0, spread)
    splat(x, y, (0.62, 0.72, 1.0), 1.0)
    # vùng sinh sao (hồng) dọc nhánh
    k = m // 60
    j = rng.integers(0, m, k)
    splat(x[j] + rng.normal(0, 250, k), y[j] + rng.normal(0, 250, k), (1.0, 0.45, 0.6), 6.0)
# thanh chắn + chỗ phình
m = 500_000
bx = rng.normal(0, 4200, m); by = rng.normal(0, 1300, m)
a = math.radians(28)
splat(bx * math.cos(a) - by * math.sin(a), bx * math.sin(a) + by * math.cos(a), (1.0, 0.82, 0.55), 1.2)
m = 400_000
rr = rng.exponential(1800, m); th = rng.uniform(0, 2 * math.pi, m)
splat(rr * np.cos(th), rr * np.sin(th), (1.0, 0.86, 0.6), 1.4)

# dải bụi tối chạy dọc mép trong của nhánh chính
dust = np.zeros((N, N))
for phase, strength in arms[:2]:
    rr = np.linspace(7000, R, 4000)
    ang = phase - 0.22 + np.log(rr / 9000) / math.tan(pitch)
    px = ((rr * np.cos(ang) / SPAN + 0.5) * N).astype(int); py = ((0.5 - rr * np.sin(ang) / SPAN) * N).astype(int)
    dust[np.clip(py, 0, N - 1), np.clip(px, 0, N - 1)] += 1
dust = gaussian_filter(dust, 5); dust = 1 - 0.55 * np.clip(dust / dust.max() * 3, 0, 1)
glow = gaussian_filter(img, sigma=(10, 10, 0))
core = gaussian_filter(img, sigma=(0.6, 0.6, 0))
gal = (tonemap(core, 0.05) * 0.95 + tonemap(glow, 0.02) * 0.45) * dust[..., None]
save(gal, 'galaxy.webp')
# Mặt Trời: 8,18 kpc ≈ 26 670 năm ánh sáng từ tâm (GRAVITY 2019), đặt giữa hai nhánh chính
sun_ang = math.radians(200)
sun = {'x_ly': 26670 * math.cos(sun_ang), 'y_ly': 26670 * math.sin(sun_ang), 'span_ly': SPAN}
json.dump(sun, open(OUT + 'galaxy.json', 'w'))

# ---------------- Mạng lưới vũ trụ ----------------
def cellular_web(n, cells, seed, octaves=((1.0, 1.0),)):
    rg = np.random.default_rng(seed)
    acc = np.zeros((n, n))
    yy, xx = np.mgrid[0:n, 0:n] / n
    pts_xy = np.stack([xx.ravel(), yy.ravel()], 1)
    for scale, w in octaves:
        c = int(cells * scale)
        seeds = rg.uniform(0, 1, (c * c, 2))
        tree = cKDTree(seeds)
        d, _ = tree.query(pts_xy, k=3)
        f = (d[:, 1] - d[:, 0]) * c          # khoảng cách tới tường (đơn vị ô)
        g = (d[:, 2] - d[:, 0]) * c          # nhỏ ở sợi/nút
        wall = np.exp(-(f / 0.05) ** 2) * 0.22
        fil = np.exp(-(g / 0.12) ** 2) * 1.0
        acc += w * (wall + fil).reshape(n, n)
    return acc

def galaxies_on(web, n, count, seed, gain):
    rg = np.random.default_rng(seed)
    p = web.ravel() ** 3.0; p /= p.sum()
    idx = rg.choice(n * n, size=count, p=p)
    im = np.zeros(n * n); np.add.at(im, idx, 1.0)
    im = im.reshape(n, n)
    return tonemap(gaussian_filter(im, 0.7), gain) * 0.85 + tonemap(gaussian_filter(web, 4), 0.18) * 0.25

n = 1536
w = cellular_web(n, 6, 11, ((1.0, 1.0), (2.7, 0.45)))
lan = galaxies_on(w, n, 200_000, 12, 0.8)
col = np.dstack([lan * 0.95, lan * 0.88, lan * 1.0])
save(col, 'web-laniakea.webp')

w = cellular_web(n, 22, 21, ((1.0, 1.0), (2.6, 0.45)))
uni = galaxies_on(w, n, 700_000, 22, 0.5)
yy, xx = np.mgrid[0:n, 0:n]
rr = np.hypot(xx - n / 2 + 0.5, yy - n / 2 + 0.5) / (n / 2)
R_EDGE = 46.5 / 50.0  # ảnh phủ ±50 tỉ năm ánh sáng; biên vũ trụ quan sát được ở 46,5
mask = np.clip((R_EDGE - rr) * 60, 0, 1)
uni = uni * mask
edge = np.exp(-((rr - R_EDGE) / 0.02) ** 2) * 0.35   # bức xạ nền vi sóng — minh hoạ
col = np.dstack([uni * 0.92 + edge * 1.0, uni * 0.86 + edge * 0.55, uni * 1.0 + edge * 0.35])
save(col, 'web-universe.webp')
print('ok', sun)
