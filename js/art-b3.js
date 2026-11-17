// Word pictures for lessons 9–12 (food, likes, clothes, weather) and indoor/garden scene props.
import { TAU, mulberry } from './lib.js';
import { sh, blob, crescent, INK, rr } from './paper.js';
import { cut, LW, LW2, line, shine, shade } from './art.js';
import { G, ell, circ, dot, mirror, stroke, shaded, cuteEye, smile, cheeks } from './draw.js';

const path = (x, pts) => { x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); };

// ================= lesson 9: food =================
const FOOD = {
  apple: G(1, (x, L1, L2) => {
    line(x, [[500, 250], [540, 70]], L2 * 2.2, '#6b4226');
    ell(x, 650, 110, 110, 50, -.4); sh(x, '#62c24c', L2 * 1.2);
    const a = () => { x.beginPath(); x.moveTo(500, 250); x.bezierCurveTo(650, 130, 950, 200, 920, 520); x.bezierCurveTo(890, 830, 660, 960, 500, 890); x.bezierCurveTo(340, 960, 110, 830, 80, 520); x.bezierCurveTo(50, 200, 350, 130, 500, 250); x.closePath(); };
    shaded(x, a, '#e8413a', .8, 40, 0, L1);
    shine(x, 290, 420, 60, 110, .4, .45);
  }),
  banana: G(1.2, (x, L1, L2) => {
    const b = () => { x.beginPath(); x.moveTo(170, 230); x.bezierCurveTo(170, 800, 720, 960, 1100, 640); x.lineTo(1120, 560); x.bezierCurveTo(760, 760, 330, 620, 300, 220); x.closePath(); };
    shaded(x, b, '#ffd23f', .82, 0, 40, L1);
    rr(x, 160, 120, 140, 130, 30); sh(x, '#8d6b2a', L2 * 1.2);
    dot(x, 1110, 600, 34, '#6b4a1a');
    x.beginPath(); x.moveTo(260, 380); x.bezierCurveTo(330, 700, 700, 800, 1000, 680); stroke(x, L2, '#e3b52a');
  }),
  bread: G(1.1, (x, L1, L2) => {
    const outer = () => { x.beginPath(); x.moveTo(140, 960); x.lineTo(140, 470); x.bezierCurveTo(30, 150, 400, 70, 550, 200); x.bezierCurveTo(700, 70, 1070, 150, 960, 470); x.lineTo(960, 960); x.closePath(); };
    outer(); sh(x, '#c98a4a', L1);
    x.beginPath(); x.moveTo(220, 890); x.lineTo(220, 460); x.bezierCurveTo(140, 230, 420, 170, 550, 290); x.bezierCurveTo(680, 170, 960, 230, 880, 460); x.lineTo(880, 890); x.closePath(); x.fillStyle = '#f8e2a8'; x.fill();
    const R = mulberry(3); for (let i = 0; i < 18; i++) dot(x, 280 + R() * 540, 380 + R() * 470, 8, '#e3c27a');
  }),
  egg: G(1.3, (x, L1, L2) => {
    blob(x, 650, 520, 560, 400, .12, 4); sh(x, '#fff', L1);
    blob(x, 680, 560, 420, 290, .1, 6); x.fillStyle = '#f7f3ea'; x.fill();
    const y = () => { x.beginPath(); x.arc(620, 470, 200, 0, TAU); };
    shaded(x, y, '#ffc22e', .85, 26, 20, L1);
    shine(x, 560, 400, 50, 34, -.5, .55);
  }),
  milk: G(.72, (x, L1, L2) => {
    path(x, [[480, 350], [620, 270], [620, 900], [480, 980]]); sh(x, '#c9dff0', L1);
    path(x, [[90, 350], [280, 120], [430, 120], [620, 270], [480, 350]]); sh(x, '#e6f1fa', L1);
    path(x, [[90, 350], [280, 120], [480, 350]]); sh(x, '#fff', L2);
    rr(x, 260, 60, 190, 80, 10); sh(x, '#fff', L2);
    const f = () => rr(x, 90, 350, 390, 630, 6);
    f(); sh(x, '#fff', L1);
    x.save(); f(); x.clip(); x.fillStyle = '#3fa1de'; x.fillRect(0, 760, 600, 300); x.restore(); f(); sh(x, null, L1);
    x.fillStyle = '#3fa1de'; x.font = '105px "Lilita One"'; x.textAlign = 'center'; x.fillText('MILK', 285, 520);
    for (const [cx, cy] of [[210, 640], [350, 670]]) { ell(x, cx, cy, 44, 30); x.fillStyle = INK; x.fill(); }
  }),
  rice: G(1.2, (x, L1, L2) => {
    line(x, [[760, 80], [1040, 520]], L2 * 2, '#c98a4a'); line(x, [[860, 60], [1100, 500]], L2 * 2, '#c98a4a');
    const R = mulberry(9); for (let i = 0; i < 22; i++) { const a = Math.PI + i / 21 * Math.PI; circ(x, 600 + Math.cos(a) * 420, 500 + Math.sin(a) * 240, 70 + R() * 20); sh(x, '#fff', L2); }
    ell(x, 600, 500, 430, 230); x.fillStyle = '#fff'; x.fill();
    for (let i = 0; i < 30; i++) { ell(x, 260 + R() * 680, 330 + R() * 160, 22, 10, R() * 3); x.fillStyle = '#eee6d6'; x.fill(); }
    const bowl = () => { x.beginPath(); x.moveTo(90, 490); x.lineTo(1110, 490); x.bezierCurveTo(1110, 860, 820, 960, 600, 960); x.bezierCurveTo(380, 960, 90, 860, 90, 490); x.closePath(); };
    shaded(x, bowl, '#3fa1de', .8, 40, 0, L1);
    for (let i = 0; i < 6; i++) { circ(x, 250 + i * 140, 640, 34); sh(x, '#fff', L2 * .8); }
  }),
};

// ================= lesson 10: likes =================
const LIKES = {
  carrot: G(.58, (x, L1, L2) => {
    for (const [a, l] of [[-.5, 250], [0, 300], [.5, 250]]) { x.save(); x.translate(290, 240); x.rotate(a); ell(x, 0, -l / 2, 50, l / 2); sh(x, '#62c24c', L2 * 1.2); x.restore(); }
    const c = () => { x.beginPath(); x.moveTo(110, 300); x.quadraticCurveTo(290, 190, 470, 300); x.quadraticCurveTo(400, 700, 300, 980); x.quadraticCurveTo(270, 990, 260, 960); x.quadraticCurveTo(170, 700, 110, 300); x.closePath(); };
    shaded(x, c, '#ff8c3a', .82, 30, 0, L1);
    for (const [y, w] of [[440, 90], [580, 70], [720, 50]]) line(x, [[200 + (y - 440) * .1, y], [200 + (y - 440) * .1 + w, y + 10]], L2, '#d96a1a');
  }),
  fish: G(1.4, (x, L1, L2) => {
    path(x, [[1000, 500], [1340, 230], [1300, 500], [1340, 770]]); sh(x, '#ff8c3a', L1);
    path(x, [[560, 260], [700, 110], [820, 290]]); sh(x, '#ffb06a', L2 * 1.2);
    const b = () => ell(x, 600, 500, 450, 270);
    shaded(x, b, '#ff9a4a', .85, 0, 30, L1);
    for (let i = 0; i < 3; i++) for (let j = 0; j < 2; j++) { x.beginPath(); x.arc(560 + i * 140, 430 + j * 140, 60, -1, 1); stroke(x, L2, '#e0782a'); }
    cuteEye(x, 290, 440, 48); smile(x, 230, 580, 40, L2 * 1.2);
  }),
  pizza: G(1, (x, L1, L2) => {
    const s = () => { x.beginPath(); x.moveTo(500, 970); x.lineTo(90, 230); x.quadraticCurveTo(500, 40, 910, 230); x.closePath(); };
    s(); sh(x, '#ffd45a', L1);
    x.beginPath(); x.moveTo(90, 230); x.quadraticCurveTo(500, 40, 910, 230); x.lineTo(850, 330); x.quadraticCurveTo(500, 160, 150, 330); x.closePath(); sh(x, '#e0a050', L2 * 1.2);
    for (const [cx, cy] of [[400, 420], [600, 470], [480, 640], [520, 820]]) { circ(x, cx, cy, 62); sh(x, '#e8413a', L2); dot(x, cx - 15, cy - 15, 12, '#f27a6a'); }
    for (const [cx, cy] of [[300, 530], [680, 330]]) { ell(x, cx, cy, 30, 18, .5); x.fillStyle = '#4ea83d'; x.fill(); }
  }),
  juice: G(.72, (x, L1, L2) => {
    line(x, [[450, 40], [330, 600]], L2 * 3.2, INK); line(x, [[450, 40], [330, 600]], L2 * 2, '#e8413a');
    const g = () => path(x, [[90, 200], [630, 200], [560, 980], [160, 980]]);
    g(); x.fillStyle = 'rgba(220,240,250,.9)'; x.fill();
    x.save(); g(); x.clip(); x.fillStyle = '#ffa52e'; x.fillRect(0, 330, 800, 700); x.fillStyle = 'rgba(255,255,255,.3)'; x.fillRect(170, 360, 60, 580); x.restore();
    g(); sh(x, null, L1);
    circ(x, 600, 200, 130); sh(x, '#ffc93c', L1); circ(x, 600, 200, 85); sh(x, '#ffe08a', L2);
    for (let i = 0; i < 6; i++) line(x, [[600, 200], [600 + Math.cos(i / 6 * TAU) * 85, 200 + Math.sin(i / 6 * TAU) * 85]], L2 * .7, '#f0b030');
  }),
  chocolate: G(.9, (x, L1, L2) => {
    const bar = () => rr(x, 110, 60, 680, 900, 30);
    bar(); sh(x, '#7a4a2a', L1);
    for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) { rr(x, 160 + i * 310, 110 + j * 190, 270, 160, 20); sh(x, '#8f5a34', L2); shine(x, 230 + i * 310, 150 + j * 190, 50, 14, 0, .25); }
    path(x, [[90, 640], [810, 600], [810, 980], [90, 980]]); sh(x, '#e8413a', L1);
    line(x, [[90, 640], [810, 600]], L2 * 2, '#ffd23f');
    x.fillStyle = '#fff'; x.font = '120px "Lilita One"'; x.textAlign = 'center'; x.fillText('CHOCO', 450, 860);
  }),
  tomato: G(1.05, (x, L1, L2) => {
    const t = () => blob(x, 525, 560, 440, 380, .05, 3);
    shaded(x, t, '#e8413a', .8, 36, 20, L1);
    x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * TAU, r = i % 2 ? 60 : 190; x.lineTo(525 + Math.cos(a) * r, 230 + Math.sin(a) * r * .6); } x.closePath(); sh(x, '#4ea83d', L2 * 1.2);
    line(x, [[525, 200], [540, 80]], L2 * 2, '#3e8a30');
    shine(x, 340, 450, 70, 40, -.6, .45);
  }),
};

// ================= lesson 11: clothes =================
const CLOTHES = {
  hat: G(1.2, (x, L1, L2) => {
    circ(x, 600, 190, 120); sh(x, '#fff', L1);
    const d = () => { x.beginPath(); x.moveTo(180, 640); x.bezierCurveTo(180, 220, 1020, 220, 1020, 640); x.closePath(); };
    shaded(x, d, '#3fa1de', .82, 30, 0, L1);
    for (let i = 0; i < 4; i++) line(x, [[330 + i * 180, 380 - (i === 0 || i === 3 ? -60 : 0)], [330 + i * 180, 630]], L2, '#2a78b3');
    const b = () => rr(x, 130, 600, 940, 230, 60);
    shaded(x, b, '#ffd23f', .85, 0, -20, L1);
    for (let i = 0; i < 9; i++) line(x, [[210 + i * 98, 640], [210 + i * 98, 790]], L2, '#e3b52a');
  }),
  coat: G(.95, (x, L1, L2) => {
    for (const s of [-1, 1]) { x.save(); x.translate(475 + s * 250, 230); x.rotate(s * -.35); rr(x, -80, 0, 160, 560, 70); sh(x, '#d9443a', L1); rr(x, -80, 470, 160, 90, 40); sh(x, '#b8342c', L2); x.restore(); }
    const body = () => { x.beginPath(); x.moveTo(250, 160); x.lineTo(700, 160); x.lineTo(780, 960); x.lineTo(170, 960); x.closePath(); };
    shaded(x, body, '#e8413a', .82, 30, 0, L1);
    line(x, [[475, 260], [475, 960]], L2, '#b8342c');
    for (const s of [-1, 1]) { path(x, [[475, 290], [475 + s * 230, 150], [475 + s * 160, 380]]); sh(x, '#b8342c', L2 * 1.2); }
    for (const y of [420, 560, 700]) { circ(x, 530, y, 32); sh(x, '#ffd23f', L2); }
    for (const s of [-1, 1]) { rr(x, 475 + s * 170 - 80, 720, 160, 120, 20); sh(x, '#d9443a', L2); }
  }),
  dress: G(.9, (x, L1, L2) => {
    for (const s of [-1, 1]) line(x, [[450 + s * 110, 60], [450 + s * 130, 260]], L2 * 2.5, '#e9a91f');
    const d = () => { x.beginPath(); x.moveTo(300, 240); x.lineTo(600, 240); x.lineTo(630, 430); x.bezierCurveTo(760, 600, 860, 800, 860, 940); x.quadraticCurveTo(450, 1000, 40, 940); x.bezierCurveTo(40, 800, 140, 600, 270, 430); x.closePath(); };
    shaded(x, d, '#ffc93c', .85, 30, 0, L1);
    rr(x, 260, 400, 380, 70, 30); sh(x, '#e8413a', L2);
    for (let i = 0; i < 9; i++) dot(x, 160 + (i % 3) * 290 + (i > 2 ? 70 : 0), 600 + Math.floor(i / 3) * 110, 24, '#fff');
  }),
  skirt: G(1.1, (x, L1, L2) => {
    const s = () => { x.beginPath(); x.moveTo(300, 260); x.lineTo(800, 260); x.lineTo(1030, 880); x.quadraticCurveTo(550, 960, 70, 880); x.closePath(); };
    shaded(x, s, '#f59aa8', .85, 30, 0, L1);
    for (let i = 1; i < 6; i++) line(x, [[300 + i * 83, 280], [70 + i * 160, 900]], L2, '#e07a8a');
    rr(x, 270, 140, 560, 140, 40); sh(x, '#e8413a', L1);
    circ(x, 550, 210, 30); sh(x, '#ffd23f', L2);
  }),
  shoes: G(1.4, (x, L1, L2) => {
    for (const [ox, oy] of [[0, 0], [420, 120]]) {
      x.save(); x.translate(ox, oy);
      rr(x, 60, 640, 860, 110, 50); sh(x, '#fff', L1);
      const u = () => { x.beginPath(); x.moveTo(90, 650); x.bezierCurveTo(90, 420, 260, 380, 380, 460); x.lineTo(560, 300); x.lineTo(700, 300); x.bezierCurveTo(820, 400, 900, 520, 900, 650); x.closePath(); };
      shaded(x, u, '#e8413a', .82, 0, -26, L1);
      for (let i = 0; i < 3; i++) line(x, [[440 + i * 70, 420 + i * 20], [560 + i * 70, 470 + i * 30]], L2 * 1.4, '#fff');
      x.restore();
    }
  }),
  socks: G(1.2, (x, L1, L2) => {
    for (const [ox, col] of [[0, '#e8413a'], [560, '#62c24c']]) {
      x.save(); x.translate(ox, 0);
      const s = () => { x.beginPath(); x.moveTo(120, 60); x.lineTo(380, 60); x.lineTo(380, 640); x.bezierCurveTo(380, 720, 420, 760, 500, 770); x.bezierCurveTo(620, 790, 620, 960, 480, 960); x.lineTo(240, 960); x.bezierCurveTo(140, 960, 120, 880, 120, 780); x.closePath(); };
      shaded(x, s, col, .82, 30, 0, L1);
      for (const y of [120, 200]) { rr(x, 122, y, 256, 40, 6); x.fillStyle = '#fff'; x.fill(); }
      rr(x, 440, 820, 130, 140, 50); x.fillStyle = shade(col, .75); x.fill();
      s(); sh(x, null, L1);
      x.restore();
    }
  }),
};

// ================= lesson 12: weather =================
function cloudPath(x, cx, cy, s) { x.beginPath(); for (const [dx, dy, r] of [[-180, 40, 130], [-50, -40, 180], [130, 0, 150], [240, 60, 100]]) { x.moveTo(cx + (dx + r) * s, cy + dy * s); x.arc(cx + dx * s, cy + dy * s, r * s, 0, TAU); } x.rect(cx - 300 * s, cy + 40 * s, 640 * s, 120 * s); }
function cloud(x, cx, cy, s, col, L1) { cloudPath(x, cx, cy, s); stroke(x, L1 * 2); cloudPath(x, cx, cy, s); x.fillStyle = col; x.fill(); }
const WEATHER = {
  sunny: G(1, (x, L1, L2) => {
    for (let i = 0; i < 12; i++) { x.save(); x.translate(500, 500); x.rotate(i / 12 * TAU); path(x, [[300, -50], [460, 0], [300, 50]]); sh(x, '#ffb02e', L2 * 1.2); x.restore(); }
    const s = () => circ(x, 500, 500, 290);
    shaded(x, s, '#ffd23f', .88, 26, 20, L1);
    cuteEye(x, 410, 460, 40); cuteEye(x, 590, 460, 40); cheeks(x, 500, 560, 150, 40); smile(x, 500, 590, 70, L2 * 1.3);
  }),
  rainy: G(1, (x, L1, L2) => {
    for (const [dx, dy] of [[250, 700], [450, 780], [650, 700], [350, 900], [750, 880]]) { x.beginPath(); x.moveTo(dx, dy - 90); x.quadraticCurveTo(dx + 50, dy, dx, dy + 30); x.quadraticCurveTo(dx - 50, dy, dx, dy - 90); x.closePath(); sh(x, '#3fa1de', L2 * 1.2); }
    cloud(x, 500, 380, 1.15, '#a9b4c2', L1);
    cuteEye(x, 420, 400, 30); cuteEye(x, 580, 400, 30); x.beginPath(); x.moveTo(460, 500); x.quadraticCurveTo(500, 470, 540, 500); stroke(x, L2 * 1.2);
  }),
  cloudy: G(1.25, (x, L1) => {
    cloud(x, 780, 360, 1, '#c9d3df', L1);
    cloud(x, 480, 580, 1.2, '#fff', L1);
  }),
  windy: G(1.2, (x, L1, L2) => {
    for (const [y, l, c] of [[260, 800, 1], [480, 1000, -1], [700, 760, 1]]) { x.beginPath(); x.moveTo(100, y); x.lineTo(100 + l, y); x.arc(100 + l, y - 80 * c, 80, Math.PI / 2 * c, -Math.PI / 2 * c, c < 0); stroke(x, L1 * 2.4); stroke(x, L1 * 1.2, '#bfe6f7'); }
    for (const [lx, ly, a, c] of [[900, 150, .6, '#62c24c'], [1000, 820, -.4, '#ff8c3a'], [300, 880, 1.2, '#ffc93c']]) { x.save(); x.translate(lx, ly); x.rotate(a); ell(x, 0, 0, 90, 45); sh(x, c, L2 * 1.2); line(x, [[-80, 0], [80, 0]], L2, shade(c, .7)); x.restore(); }
  }),
  snowy: G(.85, (x, L1, L2) => {
    const b = () => circ(x, 425, 720, 260), h = () => circ(x, 425, 340, 190);
    shaded(x, b, '#fff', .9, 30, 0, L1); shaded(x, h, '#fff', .9, 26, 16, L1);
    rr(x, 280, 100, 290, 70, 20); sh(x, '#3a3a44', L2 * 1.2); rr(x, 320, 0, 210, 120, 20); sh(x, '#3a3a44', L2 * 1.2);
    dot(x, 360, 320, 22); dot(x, 490, 320, 22);
    path(x, [[425, 370], [600, 400], [425, 410]]); sh(x, '#ff8c3a', L2);
    rr(x, 240, 480, 370, 80, 30); sh(x, '#e8413a', L2 * 1.2); rr(x, 470, 520, 80, 220, 30); sh(x, '#e8413a', L2);
    for (const y of [660, 780]) dot(x, 425, y, 26);
    for (const [fx, fy] of [[80, 120], [760, 220], [90, 520], [790, 640]]) for (let i = 0; i < 3; i++) line(x, [[fx + Math.cos(i * Math.PI / 3) * 40, fy + Math.sin(i * Math.PI / 3) * 40], [fx - Math.cos(i * Math.PI / 3) * 40, fy - Math.sin(i * Math.PI / 3) * 40]], L2 * 1.2, '#7cc3ee');
  }),
  rainbow: G(1.5, (x, L1, L2) => {
    const cols = ['#e8413a', '#ff8c3a', '#ffd23f', '#62c24c', '#3fa1de', '#9b6fd1'];
    x.beginPath(); x.arc(750, 900, 700, Math.PI, 0); x.lineTo(1100, 900); x.arc(750, 900, 350, 0, Math.PI, true); x.closePath(); stroke(x, L1 * 2);
    cols.forEach((c, i) => { x.beginPath(); x.arc(750, 900, 690 - i * 57, Math.PI, 0); x.lineWidth = 60; x.strokeStyle = c; x.lineCap = 'butt'; x.stroke(); });
    cloud(x, 230, 840, .7, '#fff', L1); cloud(x, 1270, 840, .7, '#fff', L1);
  }),
};

export const MORE_PICS = { ...FOOD, ...LIKES, ...CLOTHES, ...WEATHER };

// ================= scene props =================
const P = (wm, hm, fn, o) => cut(wm, hm, (x, W, H) => fn(x, W, H), o);
export const fridge = (wm, hm) => P(wm, hm, (x, W, H) => {
  rr(x, 0, 0, W, H, 30); sh(x, '#eaf4fb', LW);
  line(x, [[0, H * .38], [W, H * .38]], LW2 + 2);
  for (const y of [.12, .5]) { rr(x, W * .08, H * y, W * .08, H * .2, 10); sh(x, '#9aa4b2', LW2); }
  const cols = ['#e8413a', '#ffc93c', '#62c24c', '#3fa1de'];
  for (let i = 0; i < 4; i++) { circ(x, W * (.35 + (i % 2) * .3), H * (.55 + Math.floor(i / 2) * .14), W * .06); sh(x, cols[i], 4); }
  rr(x, W * .3, H * .08, W * .45, H * .22, 8); sh(x, '#fff', 4); line(x, [[W * .35, H * .14], [W * .7, H * .14]], 4, '#e8413a'); line(x, [[W * .35, H * .21], [W * .62, H * .21]], 4, '#3fa1de');
});
export const counter = (wm, hm) => P(wm, hm, (x, W, H) => {
  rr(x, 0, H * .2, W, H * .8, 12); sh(x, '#f3cf92', LW);
  rr(x, -4, H * .12, W + 8, H * .12, 8); sh(x, '#e8e2d6', LW2 + 1);
  for (let i = 0; i < 3; i++) { rr(x, W * (.05 + i * .32), H * .32, W * .28, H * .6, 10); sh(x, '#e8b77a', LW2); circ(x, W * (.19 + i * .32), H * .42, 8); sh(x, '#8d5a31', 3); }
  rr(x, W * .15, -H * .05, W * .25, H * .2, 20); sh(x, '#e8413a', LW2 + 1);
  circ(x, W * .7, H * .02, W * .08); sh(x, '#62c24c', LW2 + 1);
}, { pad: 60 });
export const wardrobe = (wm, hm, text) => P(wm, hm, (x, W, H) => {
  rr(x, 0, H * .12, W, H * .88, 20); sh(x, '#c98a4a', LW);
  for (const u of [0, .5]) { rr(x, W * (u + .05), H * .2, W * .4, H * .72, 12); sh(x, '#e0a65f', LW2 + 1); circ(x, W * (u + (u ? .1 : .4)), H * .56, W * .025); sh(x, '#ffd23f', 4); }
  rr(x, W * .1, 0, W * .8, H * .17, 16); sh(x, '#fffaf0', LW);
  if (text) { let fs = H * .12; x.font = `${fs}px "Lilita One"`; while (x.measureText(text).width > W * .72) { fs -= 4; x.font = `${fs}px "Lilita One"`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#c98a4a'; x.fillText(text, W / 2, H * .09); }
});
export const floorLamp = hm => P(hm * .45, hm, (x, W, H) => {
  rr(x, W * .2, H * .92, W * .6, H * .08, 10); sh(x, '#7a5a3a', LW2 + 1);
  line(x, [[W / 2, H * .3], [W / 2, H * .93]], LW2 + 6); line(x, [[W / 2, H * .3], [W / 2, H * .93]], LW2 + 1, '#b09070');
  path(x, [[W * .2, 0], [W * .8, 0], [W, H * .32], [0, H * .32]]); sh(x, '#ffd766', LW);
});
export const house = (wm, hm, text) => P(wm, hm, (x, W, H) => {
  rr(x, W * .7, H * .05, W * .1, H * .25, 6); sh(x, '#b8342c', LW2 + 1);
  rr(x, W * .1, H * .38, W * .8, H * .62, 8); sh(x, '#fff4dc', LW);
  path(x, [[0, H * .42], [W / 2, 0], [W, H * .42]]); sh(x, '#e8413a', LW);
  rr(x, W * .42, H * .62, W * .16, H * .38, 10); sh(x, '#3fa1de', LW2 + 1);
  for (const u of [.2, .66]) { rr(x, W * u, H * .52, W * .14, H * .16, 6); sh(x, '#bfe6f7', LW2); line(x, [[W * (u + .07), H * .52], [W * (u + .07), H * .68]], 4); }
  if (text) { rr(x, W * .32, H * .2, W * .36, H * .14, 10); sh(x, '#fffaf0', LW2); x.font = `${H * .1}px "Lilita One"`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8413a'; x.fillText(text, W / 2, H * .275); }
});
export const signpost = (wm, hm, text) => P(wm, hm, (x, W, H) => {
  rr(x, W * .46, H * .3, W * .08, H * .7, 6); sh(x, '#8d5a31', LW);
  const b = () => { x.beginPath(); x.moveTo(0, H * .05); x.lineTo(W * .88, H * .05); x.lineTo(W, H * .2); x.lineTo(W * .88, H * .35); x.lineTo(0, H * .35); x.closePath(); };
  b(); sh(x, '#e8b77a', LW);
  let fs = H * .2; x.font = `${fs}px "Lilita One"`; while (x.measureText(text).width > W * .8) { fs -= 4; x.font = `${fs}px "Lilita One"`; }
  x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#7a4a2a'; x.fillText(text, W * .45, H * .21);
  for (const u of [.2, .8]) { blob(x, W * u, H * .95, W * .12, H * .06, .1, 3); sh(x, '#62c24c', LW2); }
});
export const slide = (wm, hm) => P(wm, hm, (x, W, H) => {
  for (const u of [.12, .3]) line(x, [[W * u, H], [W * u, H * .15]], LW2 + 4, '#3fa1de');
  for (let i = 0; i < 5; i++) line(x, [[W * .12, H * (.3 + i * .15)], [W * .3, H * (.3 + i * .15)]], LW2 + 2, '#3fa1de');
  path(x, [[W * .3, H * .15], [W * .4, H * .15], [W, H * .92], [W * .9, H]]); sh(x, '#e8413a', LW);
  rr(x, W * .05, H * .1, W * .35, H * .08, 6); sh(x, '#ffd23f', LW2 + 1);
});
export const picnic = wm => P(wm, wm * .35, (x, W, H) => {
  path(x, [[W * .1, 0], [W * .9, 0], [W, H], [0, H]]); sh(x, '#e8413a', LW);
  x.save(); path(x, [[W * .1, 0], [W * .9, 0], [W, H], [0, H]]); x.clip(); x.fillStyle = '#fff'; for (let i = 0; i < 10; i++) for (let j = 0; j < 4; j++) if ((i + j) % 2) x.fillRect(i * W / 10, j * H / 4, W / 10, H / 4); x.restore();
  path(x, [[W * .1, 0], [W * .9, 0], [W, H], [0, H]]); sh(x, null, LW);
});
export const umbrellaStand = hm => P(hm * .7, hm, (x, W, H) => {
  line(x, [[W / 2, H * .3], [W / 2, H * .95]], LW2 + 3); x.beginPath(); x.arc(W * .44, H * .95, W * .06, 0, Math.PI); stroke(x, LW2 + 3);
  x.beginPath(); x.moveTo(0, H * .35); x.quadraticCurveTo(W / 2, -H * .2, W, H * .35); x.closePath(); sh(x, '#9b6fd1', LW);
  for (const u of [.25, .5, .75]) { x.beginPath(); x.moveTo(W * u, H * .35); x.quadraticCurveTo(W * u, H * .1, W / 2, H * .02); stroke(x, 4); }
});
