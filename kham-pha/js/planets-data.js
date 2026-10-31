// Số liệu hành tinh — NASA NSSDCA Planetary Fact Sheet (bảng hệ mét, D. R. Williams)
// https://nssdc.gsfc.nasa.gov/planetary/factsheet/ — xem research/thong-so-hanh-tinh.md.
// Số vệ tinh: theo công bố của Trung tâm Tiểu hành tinh IAU (MPC) và NASA, ghi kèm thời điểm.
// Đơn vị: khối lượng 10²⁴ kg; đường kính km; mật độ kg/m³; hấp dẫn m/s²; vận tốc thoát km/s;
// tự quay và ngày (giờ, âm = quay ngược); khoảng cách 10⁶ km; chu kỳ quỹ đạo ngày; nhiệt độ °C (trung bình);
// áp suất bề mặt bar; độ nghiêng trục độ.

export const PLANETS = [
  {
    id: 'mercury', vi: 'Sao Thuỷ', en: 'Mercury', color: '#b9b1a8', glow: null,
    mass: 0.330, diameter: 4879, density: 5429, gravity: 3.7, escape: 4.3,
    rotation: 1407.6, day: 4222.6, distance: 57.9, perihelion: 46.0, aphelion: 69.8,
    period: 88.0, velocity: 47.4, inclination: 7.0, eccentricity: 0.206, obliquity: 0.034,
    temp: 167, pressure: 0, moons: 0, moonsAsOf: null, rings: false, magnetic: true,
  },
  {
    id: 'venus', vi: 'Sao Kim', en: 'Venus', color: '#e8d3a8', glow: '#f3d79c',
    mass: 4.87, diameter: 12104, density: 5243, gravity: 8.9, escape: 10.4,
    rotation: -5832.5, day: 2802.0, distance: 108.2, perihelion: 107.5, aphelion: 108.9,
    period: 224.7, velocity: 35.0, inclination: 3.4, eccentricity: 0.007, obliquity: 177.4,
    temp: 464, pressure: 92, moons: 0, moonsAsOf: null, rings: false, magnetic: false,
  },
  {
    id: 'earth', vi: 'Trái Đất', en: 'Earth', color: '#7fb0ff', glow: '#6fa8ff',
    mass: 5.97, diameter: 12756, density: 5514, gravity: 9.8, escape: 11.2,
    rotation: 23.9, day: 24.0, distance: 149.6, perihelion: 147.1, aphelion: 152.1,
    period: 365.2, velocity: 29.8, inclination: 0.0, eccentricity: 0.017, obliquity: 23.4,
    temp: 15, pressure: 1, moons: 1, moonsAsOf: null, rings: false, magnetic: true,
  },
  {
    id: 'mars', vi: 'Sao Hoả', en: 'Mars', color: '#d9805a', glow: '#e6a07a',
    mass: 0.642, diameter: 6792, density: 3934, gravity: 3.7, escape: 5.0,
    rotation: 24.6, day: 24.7, distance: 228.0, perihelion: 206.6, aphelion: 249.2,
    period: 687.0, velocity: 24.1, inclination: 1.8, eccentricity: 0.094, obliquity: 25.2,
    temp: -65, pressure: 0.01, moons: 2, moonsAsOf: null, rings: false, magnetic: false,
  },
  {
    id: 'jupiter', vi: 'Sao Mộc', en: 'Jupiter', color: '#e2c8a4', glow: '#e8d2b0',
    mass: 1898, diameter: 142984, density: 1326, gravity: 23.1, escape: 59.5,
    rotation: 9.9, day: 9.9, distance: 778.5, perihelion: 740.6, aphelion: 816.4,
    period: 4331, velocity: 13.1, inclination: 1.3, eccentricity: 0.049, obliquity: 3.1,
    temp: -110, pressure: null, moons: 101, moonsAsOf: '03/2026', rings: true, magnetic: true,
  },
  {
    id: 'saturn', vi: 'Sao Thổ', en: 'Saturn', color: '#e8d8a8', glow: '#efe0b4',
    mass: 568, diameter: 120536, density: 687, gravity: 9.0, escape: 35.5,
    rotation: 10.7, day: 10.7, distance: 1432.0, perihelion: 1357.6, aphelion: 1506.5,
    period: 10747, velocity: 9.7, inclination: 2.5, eccentricity: 0.052, obliquity: 26.7,
    temp: -140, pressure: null, moons: 285, moonsAsOf: '03/2026', rings: true, magnetic: true,
  },
  {
    id: 'uranus', vi: 'Sao Thiên Vương', en: 'Uranus', color: '#a9e0e6', glow: '#a9e6ee',
    mass: 86.8, diameter: 51118, density: 1270, gravity: 8.7, escape: 21.3,
    rotation: -17.2, day: 17.2, distance: 2867.0, perihelion: 2732.7, aphelion: 3001.4,
    period: 30589, velocity: 6.8, inclination: 0.8, eccentricity: 0.047, obliquity: 97.8,
    temp: -195, pressure: null, moons: 29, moonsAsOf: '08/2025', rings: true, magnetic: true,
  },
  {
    id: 'neptune', vi: 'Sao Hải Vương', en: 'Neptune', color: '#6f8fff', glow: '#7f9cff',
    mass: 102, diameter: 49528, density: 1638, gravity: 11.0, escape: 23.5,
    rotation: 16.1, day: 16.1, distance: 4515.0, perihelion: 4471.1, aphelion: 4558.9,
    period: 59800, velocity: 5.4, inclination: 1.8, eccentricity: 0.010, obliquity: 28.3,
    temp: -200, pressure: null, moons: 16, moonsAsOf: '02/2024', rings: true, magnetic: true,
  },
  {
    id: 'pluto', vi: 'Sao Diêm Vương', en: 'Pluto', color: '#c9b49a', glow: null, dwarf: true,
    mass: 0.0130, diameter: 2376, density: 1850, gravity: 0.62, escape: 1.21,
    rotation: -153.3, day: 153.3, distance: 5906.4, perihelion: 4436.8, aphelion: 7375.9,
    period: 90560, velocity: 4.7, inclination: 17.2, eccentricity: 0.244, obliquity: 122.5,
    temp: -225, pressure: 0.00001, moons: 5, moonsAsOf: null, rings: false, magnetic: null,
  },
];

export const SUN = { id: 'sun', vi: 'Mặt Trời', diameter: 1392700, rotationDays: 25.38 };
export const byId = Object.fromEntries(PLANETS.map((p) => [p.id, p]));
export const EARTH = byId.earth;
