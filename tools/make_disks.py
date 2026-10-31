"""Ảnh đĩa hành tinh (chiếu trực giao, chiếu sáng từ trái-trên) dựng từ texture Solar System Scope (CC BY 4.0).
    /tmp/py/bin/python tools/make_disks.py   → kham-pha/assets/disks/<id>.webp
Sao Diêm Vương không có texture trong bộ Solar System Scope dùng ở đây: vẽ màu đồng nhất, ghi rõ là minh hoạ."""
import numpy as np
from PIL import Image
T = 'kham-pha/assets/textures/'
OUT = 'kham-pha/assets/disks/'
N = 480
TILT = {'sun': 7.25, 'moon': 6.7, 'mercury': 0, 'venus': 3, 'earth': 23.4, 'mars': 25.2, 'jupiter': 3.1, 'saturn': 26.7, 'uranus': 82, 'neptune': 28.3, 'pluto': 60}
for pid, tilt in TILT.items():
    try:
        tex = np.asarray(Image.open(T + pid + '.webp').convert('RGB')).astype(np.float32) / 255
    except FileNotFoundError:
        tex = np.ones((512, 1024, 3), np.float32) * np.array([0.79, 0.71, 0.60])
    y, x = np.mgrid[0:N, 0:N]; u = (x + .5) / N * 2 - 1; v = 1 - (y + .5) / N * 2
    r2 = u * u + v * v; z = np.sqrt(np.clip(1 - r2, 0, 1))
    t = np.radians(tilt)
    # quay quanh trục nhìn (z) để nghiêng cực
    X = u * np.cos(t) - v * np.sin(t); Y = u * np.sin(t) + v * np.cos(t)
    lat = np.arcsin(np.clip(Y, -1, 1)); lon = np.arctan2(X, z)
    tx = ((lon / (2 * np.pi) + 0.5) % 1) * (tex.shape[1] - 1); ty = (0.5 - lat / np.pi) * (tex.shape[0] - 1)
    col = tex[ty.astype(int), tx.astype(int)]
    L = np.array([-0.62, 0.38, 0.69]); L /= np.linalg.norm(L)
    nd = np.clip(u * L[0] + v * L[1] + z * L[2], 0, 1)
    if pid == 'sun':  # tự phát sáng: chỉ tối dần ở rìa
        out = col * (0.55 + 0.45 * z)[..., None] * 1.15
    else:
        out = col * np.clip(nd * 1.2 + 0.015, 0, 1)[..., None]
    a = np.clip((1 - np.sqrt(r2)) * N / 2, 0, 1)
    Image.fromarray(np.dstack([np.clip(out, 0, 1) * 255, a * 255]).astype(np.uint8), 'RGBA').save(OUT + pid + '.webp', 'WEBP', quality=82)
print('ok')
