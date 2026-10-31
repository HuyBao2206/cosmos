"""Sinh dữ liệu đối chiếu từ lịch thiên văn JPL DE421 (gói PyPI `de421` + `jplephem`).

Chạy:  python3 -m venv /tmp/py && /tmp/py/bin/pip install jplephem de421 numpy
       /tmp/py/bin/python tools/make_de421_fixture.py > tests/fixtures/de421.json

Kết quả: toạ độ nhật tâm (so với tâm Mặt Trời), hệ hoàng đạo J2000, đơn vị AU,
cho 8 hành tinh tại các ngày mẫu. Sao Thuỷ…Sao Hải Vương dùng tâm khối hệ hành tinh;
"earth" là tâm khối Trái Đất–Mặt Trăng (EM Bary), giống bảng của Standish.
"""
import json, math
import de421
from jplephem import Ephemeris

eph = Ephemeris(de421)
AU = 149597870.7
EPS = math.radians(23.4392911)  # độ nghiêng hoàng đạo J2000 (IAU 1976)
NAMES = {'mercury': 'mercury', 'venus': 'venus', 'earth': 'earthmoon', 'mars': 'mars',
         'jupiter': 'jupiter', 'saturn': 'saturn', 'uranus': 'uranus', 'neptune': 'neptune'}
DATES = {  # JD (TDB)
    '1900-01-01T12:00': 2415021.0,
    '1969-07-20T20:17': 2440423.345,
    '2000-01-01T12:00': 2451545.0,
    '2015-07-14T11:49': 2457217.992,
    '2024-01-01T00:00': 2460310.5,
    '2026-10-31T00:00': 2461344.5,
    '2049-06-01T00:00': 2470683.5,
}
out = {'source': 'JPL DE421 qua gói PyPI de421 (Folkner et al. 2009, IPN Progress Report 42-178)',
       'frame': 'heliocentric ecliptic J2000, AU', 'dates': {}}
for label, jd in DATES.items():
    sun = eph.position('sun', jd)
    row = {}
    for k, n in NAMES.items():
        p = eph.position(n, jd) - sun
        x, y, z = (float(v.ravel()[0]) / AU for v in p)
        row[k] = [round(x, 9), round(y * math.cos(EPS) + z * math.sin(EPS), 9),
                  round(-y * math.sin(EPS) + z * math.cos(EPS), 9)]
    out['dates'][label] = {'jd': jd, 'pos': row}
print(json.dumps(out, indent=1))
