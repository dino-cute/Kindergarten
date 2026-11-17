// Word pictures for lessons 17–24 (my day, days, transport, big & small, shapes, town, birthday) and the town scene.
import { TAU, mulberry } from './lib.js';
import { cv, sh, blob, INK, rr, paperFill } from './paper.js';
import { cut, LW, LW2, line, shine, shade, PW, PH, grain } from './art.js';
import { G, ell, circ, dot, stroke, shaded, cuteEye, smile, cheeks } from './draw.js';

const path = (x, pts) => { x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); };
const text = (x, t, cx, cy, size, col, outline) => { x.font = `${size}px "Lilita One"`; x.textAlign = 'center'; x.textBaseline = 'middle'; if (outline) { x.lineJoin = 'round'; x.lineWidth = outline; x.strokeStyle = INK; x.strokeText(t, cx, cy); } x.fillStyle = col; x.fillText(t, cx, cy); };
const wheel = (x, cx, cy, r, L1, L2) => { circ(x, cx, cy, r); sh(x, '#3a3a44', L1); circ(x, cx, cy, r * .42); sh(x, '#d6d0c4', L2); };

// ================= lesson 17: my day =================
const DAY = {
  'get up': G(1.2, (x, L1, L2) => {
    x.save(); x.beginPath(); x.rect(0, 0, 1200, 760); x.clip();
    for (let i = 0; i < 9; i++) { const a = Math.PI + (i + .5) / 9 * Math.PI; line(x, [[330 + Math.cos(a) * 250, 760 + Math.sin(a) * 250], [330 + Math.cos(a) * 340, 760 + Math.sin(a) * 340]], L2 * 1.6, '#ffb02e'); }
    circ(x, 330, 760, 210); sh(x, '#ffd23f', L1); x.restore();
    line(x, [[40, 760], [600, 760]], L1);
    for (const s of [-1, 1]) { circ(x, 860 + s * 150, 260, 90); sh(x, '#ffd23f', L1); }
    for (const s of [-1, 1]) line(x, [[860 + s * 120, 820], [860 + s * 190, 940]], L1 * 1.4);
    const c = () => circ(x, 860, 560, 300);
    shaded(x, c, '#e8413a', .82, 30, 0, L1);
    circ(x, 860, 560, 230); sh(x, '#fffaf0', L2);
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; dot(x, 860 + Math.cos(a) * 190, 560 + Math.sin(a) * 190, 14); }
    line(x, [[860, 560], [860, 410]], L2 * 1.8); line(x, [[860, 560], [960, 560]], L2 * 1.8);
    text(x, '7:00', 860, 680, 90, '#3fa1de');
  }),
  breakfast: G(1.3, (x, L1, L2) => {
    rr(x, 900, 200, 280, 600, 30); x.fillStyle = 'rgba(220,240,250,.9)'; x.fill(); x.save(); rr(x, 900, 200, 280, 600, 30); x.clip(); x.fillStyle = '#fff'; x.fillRect(900, 330, 300, 500); x.restore(); rr(x, 900, 200, 280, 600, 30); sh(x, null, L1);
    ell(x, 500, 760, 480, 150); sh(x, '#fff', L1); ell(x, 500, 740, 360, 100); sh(x, '#e6f1fa', L2);
    const t = () => { x.beginPath(); x.moveTo(170, 740); x.lineTo(170, 470); x.bezierCurveTo(110, 300, 330, 250, 420, 330); x.bezierCurveTo(510, 250, 730, 300, 670, 470); x.lineTo(670, 740); x.closePath(); };
    t(); sh(x, '#c98a4a', L1);
    rr(x, 230, 420, 380, 300, 40); x.fillStyle = '#f8e2a8'; x.fill();
    blob(x, 420, 560, 110, 80, .15, 3); sh(x, '#fff', L2); circ(x, 430, 555, 45); sh(x, '#ffc22e', L2);
  }),
  school: G(1.2, (x, L1, L2) => {
    line(x, [[600, 230], [600, 20]], L2 * 1.4); path(x, [[600, 20], [780, 70], [600, 120]]); sh(x, '#e8413a', L2);
    const b = () => rr(x, 80, 380, 1040, 590, 20);
    shaded(x, b, '#ffc93c', .85, 30, 0, L1);
    path(x, [[40, 420], [600, 200], [1160, 420]]); sh(x, '#e8413a', L1);
    circ(x, 600, 330, 70); sh(x, '#fffaf0', L2); line(x, [[600, 330], [600, 285]], L2); line(x, [[600, 330], [640, 330]], L2);
    for (const wx of [170, 360, 740, 930]) for (const wy of [450, 680]) { rr(x, wx, wy, 120, 130, 12); sh(x, '#bfe6f7', L2); }
    rr(x, 520, 650, 160, 320, 20); sh(x, '#3fa1de', L2 * 1.2);
  }),
  play: G(1.1, (x, L1, L2) => {
    for (const s of [-1, 1]) { line(x, [[550 + s * 380, 980], [550 + s * 300, 120]], L1 * 2.2); line(x, [[550 + s * 380, 980], [550 + s * 300, 120]], L1 * 1.2, '#3fa1de'); }
    line(x, [[230, 120], [870, 120]], L1 * 2.2); line(x, [[230, 120], [870, 120]], L1 * 1.2, '#3fa1de');
    for (const s of [-1, 1]) line(x, [[550 + s * 120, 125], [550 + s * 120, 700]], L2 * 1.3, '#7a5a3a');
    rr(x, 400, 690, 300, 60, 20); sh(x, '#e8413a', L2 * 1.3);
    circ(x, 900, 860, 110); sh(x, '#ffd23f', L1); line(x, [[800, 860], [1000, 860]], L2, '#e3b52a');
  }),
  dinner: G(1.3, (x, L1, L2) => {
    for (const [cx, cy, s] of [[1150, 120, 1]]) { x.beginPath(); x.arc(cx, cy, 90, .6, TAU - .6); x.arc(cx + 40, cy, 70, TAU - .9, .9, true); x.closePath(); sh(x, '#ffd766', L2 * 1.2); }
    rr(x, 60, 300, 60, 600, 30); sh(x, '#c9d3df', L2 * 1.2); for (const dx of [0, 25, 50]) line(x, [[70 + dx, 300], [70 + dx, 200]], L2, INK);
    rr(x, 1180, 250, 70, 650, 35); sh(x, '#c9d3df', L2 * 1.2);
    circ(x, 650, 580, 440); sh(x, '#fff', L1); circ(x, 650, 580, 340); sh(x, '#eef4fa', L2);
    blob(x, 560, 520, 150, 110, .1, 3); sh(x, '#e8a05a', L2 * 1.2);
    for (const [px, py] of [[760, 470], [810, 560], [730, 560]]) { circ(x, px, py, 45); sh(x, '#62c24c', L2); }
    for (let i = 0; i < 5; i++) { rr(x, 520 + i * 50, 660, 30, 140, 14); sh(x, '#ffc93c', L2 * .8); }
  }),
};

// ================= lesson 18: days of the week =================
const DAY_COL = { monday: '#e8413a', tuesday: '#ff8c3a', wednesday: '#ffc93c', thursday: '#62c24c', friday: '#3fa1de', saturday: '#9b6fd1', sunday: '#f59aa8' };
function dayCard(name) {
  return G(.85, (x, L1, L2) => {
    const c = DAY_COL[name];
    const p = () => rr(x, 40, 110, 770, 870, 50);
    shaded(x, p, '#fffaf0', .92, 0, -20, L1);
    x.save(); p(); x.clip(); x.fillStyle = c; x.fillRect(0, 0, 900, 360); x.restore(); p(); sh(x, null, L1);
    for (const rx of [230, 620]) { rr(x, rx - 25, 30, 50, 170, 25); sh(x, '#9aa4b2', L2 * 1.2); }
    text(x, name.slice(0, 3).replace(/^./, m => m.toUpperCase()), 425, 255, 190, '#fff', 30);
    const n = Object.keys(DAY_COL).indexOf(name);
    for (let i = 0; i < 7; i++) dot(x, 160 + i * 88, 860, i === n ? 34 : 18, i === n ? c : '#d6d0c4');
    text(x, String(n + 1), 425, 600, 280, c, 34);
  });
}

// ================= lesson 19: transport =================
const GO = {
  bus: G(1.5, (x, L1, L2) => {
    const b = () => rr(x, 60, 130, 1380, 680, 80);
    shaded(x, b, '#ffc93c', .84, 0, -40, L1);
    for (let i = 0; i < 4; i++) { rr(x, 140 + i * 250, 220, 200, 200, 24); sh(x, '#bfe6f7', L2 * 1.2); }
    rr(x, 1150, 220, 200, 420, 24); sh(x, '#bfe6f7', L2 * 1.2); line(x, [[1250, 220], [1250, 640]], L2);
    rr(x, 60, 520, 1080, 70, 10); x.fillStyle = '#e8413a'; x.fill();
    rr(x, 1380, 600, 60, 80, 20); sh(x, '#fff', L2);
    for (const cx of [330, 1130]) wheel(x, cx, 820, 150, L1, L2);
  }),
  bike: G(1.5, (x, L1, L2) => {
    for (const cx of [330, 1170]) { circ(x, cx, 680, 270); stroke(x, L1 * 1.4); circ(x, cx, 680, 230); stroke(x, L2, '#9aa4b2'); for (let i = 0; i < 6; i++) line(x, [[cx, 680], [cx + Math.cos(i / 6 * TAU) * 230, 680 + Math.sin(i / 6 * TAU) * 230]], L2 * .6, '#9aa4b2'); }
    const fr = [[330, 680], [650, 680], [560, 360], [1020, 360], [1170, 680]];
    x.beginPath(); x.moveTo(...fr[0]); x.lineTo(...fr[1]); x.lineTo(...fr[2]); x.lineTo(...fr[3]); x.lineTo(...fr[1]); x.moveTo(...fr[3]); x.lineTo(...fr[4]); x.moveTo(330, 680); x.lineTo(560, 360); stroke(x, L1 * 2.2); stroke(x, L1 * 1.1, '#e8413a');
    line(x, [[560, 360], [530, 260]], L2 * 2); rr(x, 420, 220, 220, 70, 30); sh(x, '#3a3a44', L2);
    line(x, [[1020, 360], [990, 200]], L2 * 2); line(x, [[930, 200], [1060, 190]], L2 * 2.4);
    circ(x, 650, 680, 50); sh(x, '#9aa4b2', L2);
  }),
  plane: G(1.5, (x, L1, L2) => {
    path(x, [[620, 420], [380, 60], [520, 60], [880, 420]]); sh(x, '#3fa1de', L1);
    path(x, [[200, 400], [100, 160], [200, 160], [330, 400]]); sh(x, '#e8413a', L1);
    const b = () => { x.beginPath(); x.moveTo(140, 380); x.lineTo(1200, 380); x.bezierCurveTo(1420, 380, 1440, 600, 1220, 620); x.lineTo(240, 620); x.quadraticCurveTo(140, 600, 140, 380); x.closePath(); };
    shaded(x, b, '#fffaf0', .9, 0, -30, L1);
    for (let i = 0; i < 6; i++) { circ(x, 420 + i * 120, 470, 36); sh(x, '#bfe6f7', L2); }
    path(x, [[1220, 400], [1330, 440], [1320, 500], [1220, 500]]); sh(x, '#3a3a44', L2);
    path(x, [[620, 560], [380, 940], [520, 940], [880, 560]]); sh(x, '#3fa1de', L1);
    line(x, [[140, 520], [1400, 520]], L2 * .1);
    rr(x, 140, 500, 1100, 40, 10); x.fillStyle = '#e8413a'; x.fill();
  }),
  boat: G(1.3, (x, L1, L2) => {
    line(x, [[620, 80], [620, 640]], L2 * 2);
    path(x, [[640, 100], [640, 600], [1000, 600]]); sh(x, '#fff', L1);
    path(x, [[600, 180], [600, 600], [300, 600]]); sh(x, '#ffc93c', L1);
    const h = () => { x.beginPath(); x.moveTo(100, 640); x.lineTo(1200, 640); x.lineTo(1020, 860); x.lineTo(260, 860); x.closePath(); };
    shaded(x, h, '#e8413a', .82, 0, -26, L1);
    for (const px of [450, 650, 850]) { circ(x, px, 740, 40); sh(x, '#fff', L2); }
    x.beginPath(); for (let k = 0; k <= 13; k++) { const px = 20 + k * 97, py = 920 + Math.sin(k * 1.4) * 30; k ? x.lineTo(px, py) : x.moveTo(px, py); } stroke(x, L1 * 2.2); stroke(x, L1 * 1.1, '#7cc3ee');
  }),
};

// ================= lesson 20: big and small =================
const SIZE = {
  mouse: G(1.1, (x, L1, L2) => {
    x.beginPath(); x.moveTo(820, 900); x.bezierCurveTo(1000, 900, 1050, 760, 1000, 700); stroke(x, L2 * 1.6, '#c98a9a');
    const b = () => ell(x, 650, 830, 230, 150);
    shaded(x, b, '#b9b2a6', .86, 0, -20, L1);
    circ(x, 470, 680, 90); sh(x, '#b9b2a6', L1); circ(x, 470, 680, 50); x.fillStyle = '#f9b8c4'; x.fill();
    const h = () => ell(x, 410, 820, 150, 120);
    shaded(x, h, '#b9b2a6', .86, 14, 10, L1);
    dot(x, 270, 830, 24, '#e8607a'); cuteEye(x, 380, 790, 24);
    for (const dy of [-15, 20]) line(x, [[300, 850 + dy], [200, 840 + dy * 2]], L2 * .7);
  }),
  'long pencil': G(1.7, (x, L1, L2) => {
    const body = () => rr(x, 200, 420, 1300, 220, 6);
    shaded(x, body, '#ffc93c', .85, 0, -26, L1);
    path(x, [[1500, 420], [1680, 530], [1500, 640]]); sh(x, '#f3d3a3', L1); path(x, [[1620, 495], [1680, 530], [1620, 565]]); x.fillStyle = INK; x.fill();
    rr(x, 120, 420, 100, 220, 4); sh(x, '#c9c2b0', L2); rr(x, 20, 420, 120, 220, 40); sh(x, '#f59aa8', L2);
  }),
  'short pencil': G(.9, (x, L1, L2) => {
    const body = () => rr(x, 190, 420, 450, 220, 6);
    shaded(x, body, '#62c24c', .85, 0, -26, L1);
    path(x, [[640, 420], [820, 530], [640, 640]]); sh(x, '#f3d3a3', L1); path(x, [[760, 495], [820, 530], [760, 565]]); x.fillStyle = INK; x.fill();
    rr(x, 110, 420, 100, 220, 4); sh(x, '#c9c2b0', L2); rr(x, 10, 420, 120, 220, 40); sh(x, '#f59aa8', L2);
  }),
  rabbit: G(1.25, (x, L1, L2) => {
    for (const [y, l] of [[480, 220], [620, 300], [760, 200]]) line(x, [[40, y], [40 + l, y]], L2 * 1.6, '#9aa4b2');
    for (const a of [-.5, -.15]) { x.save(); x.translate(900, 330); x.rotate(a); ell(x, 0, -170, 60, 180); sh(x, '#fff', L1); ell(x, 0, -170, 28, 130); x.fillStyle = '#f9b8c4'; x.fill(); x.restore(); }
    circ(x, 380, 600, 70); sh(x, '#fff', L1);
    for (const [lx, a] of [[520, 1.1], [760, -.7]]) { x.save(); x.translate(lx, 720); x.rotate(a); ell(x, 0, 120, 60, 140); sh(x, '#fff', L1); x.restore(); }
    const b = () => ell(x, 640, 620, 280, 170, -.15);
    shaded(x, b, '#fff', .9, 0, -24, L1);
    const h = () => circ(x, 920, 420, 170);
    shaded(x, h, '#fff', .9, 16, 12, L1);
    cuteEye(x, 970, 390, 30); dot(x, 1070, 450, 22, '#f59aa8'); cheeks(x, 960, 480, 60, 26);
  }),
  snail: G(1.25, (x, L1, L2) => {
    const b = () => { x.beginPath(); x.moveTo(80, 900); x.lineTo(1060, 900); x.quadraticCurveTo(1180, 900, 1150, 760); x.lineTo(1100, 480); x.quadraticCurveTo(1050, 420, 990, 480); x.lineTo(980, 780); x.lineTo(160, 800); x.quadraticCurveTo(60, 820, 80, 900); x.closePath(); };
    shaded(x, b, '#a8d86e', .86, 0, -20, L1);
    for (const dx of [-40, 40]) { line(x, [[1050 + dx * .5, 470], [1050 + dx * 1.6, 330]], L2 * 1.3); dot(x, 1050 + dx * 1.6, 330, 26); }
    cuteEye(x, 1080, 560, 26); smile(x, 1080, 650, 34, L2);
    const sh1 = () => circ(x, 540, 560, 300);
    shaded(x, sh1, '#e8a05a', .82, 26, 20, L1);
    x.beginPath(); for (let i = 0; i < 160; i++) { const a = i / 160 * TAU * 2.6, r = 260 * (1 - i / 175); const px = 540 + Math.cos(a) * r, py = 560 + Math.sin(a) * r; i ? x.lineTo(px, py) : x.moveTo(px, py); } stroke(x, L2 * 1.3, '#9a5a2a');
  }),
};

// ================= lesson 21: shapes =================
function shape(kind, col) {
  return G(1, (x, L1, L2) => {
    const p = {
      circle: () => circ(x, 500, 520, 420),
      square: () => rr(x, 110, 130, 780, 780, 30),
      triangle: () => { x.beginPath(); x.moveTo(500, 70); x.lineTo(950, 940); x.lineTo(50, 940); x.closePath(); },
      star: () => { x.beginPath(); for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i / 10 * TAU, r = i % 2 ? 210 : 470; x.lineTo(500 + Math.cos(a) * r, 540 + Math.sin(a) * r); } x.closePath(); },
      heart: () => { x.beginPath(); x.moveTo(500, 940); x.bezierCurveTo(100, 660, 0, 400, 140, 230); x.bezierCurveTo(280, 70, 460, 140, 500, 290); x.bezierCurveTo(540, 140, 720, 70, 860, 230); x.bezierCurveTo(1000, 400, 900, 660, 500, 940); x.closePath(); },
    }[kind];
    shaded(x, p, col, .84, 30, 24, L1);
    shine(x, 330, 330, 70, 36, -.6, .4);
    cuteEye(x, 420, 560, 34); cuteEye(x, 580, 560, 34); smile(x, 500, 650, 40, L2 * 1.2);
  });
}
const SHAPES = {
  circle: shape('circle', '#e8413a'), square: shape('square', '#3fa1de'), triangle: shape('triangle', '#ffc93c'),
  star: shape('star', '#9b6fd1'), heart: shape('heart', '#f59aa8'),
  rectangle: G(1.5, (x, L1, L2) => { const p = () => rr(x, 80, 230, 1340, 640, 30); shaded(x, p, '#62c24c', .84, 30, 24, L1); shine(x, 300, 380, 90, 36, -.3, .4); cuteEye(x, 670, 530, 34); cuteEye(x, 830, 530, 34); smile(x, 750, 620, 40, L2 * 1.2); }),
};

// ================= lesson 22: in town =================
function building(fn, ratio = 1) { return G(ratio, fn); }
const TOWN = {
  shop: building((x, L1, L2) => {
    const b = () => rr(x, 90, 200, 820, 770, 16);
    shaded(x, b, '#fff4dc', .9, 30, 0, L1);
    x.save(); x.beginPath(); x.rect(60, 330, 880, 170); x.clip(); for (let i = 0; i < 9; i++) { x.fillStyle = i % 2 ? '#fff' : '#e8413a'; x.fillRect(60 + i * 98, 330, 98, 170); } x.restore();
    x.beginPath(); x.moveTo(60, 330); x.lineTo(940, 330); x.lineTo(940, 470); for (let i = 9; i >= 0; i--) x.quadraticCurveTo(60 + i * 98 + 49, 540, 60 + i * 98, 470); x.closePath(); sh(x, null, L1);
    rr(x, 200, 70, 600, 170, 24); sh(x, '#3fa1de', L1); text(x, 'SHOP', 500, 160, 130, '#fff');
    rr(x, 160, 600, 380, 280, 12); sh(x, '#bfe6f7', L2 * 1.2);
    for (const [ax, c] of [[250, '#e8413a'], [350, '#ffc93c'], [450, '#62c24c']]) { circ(x, ax, 820, 45); sh(x, c, L2); }
    rr(x, 620, 600, 220, 370, 12); sh(x, '#62c24c', L2 * 1.2); dot(x, 800, 790, 16, '#ffd23f');
  }),
  hospital: building((x, L1, L2) => {
    const b = () => rr(x, 100, 120, 800, 850, 16);
    shaded(x, b, '#fff', .9, 30, 0, L1);
    rr(x, 380, 170, 240, 240, 20); sh(x, '#fff', L2); rr(x, 465, 195, 70, 190, 8); x.fillStyle = '#e8413a'; x.fill(); rr(x, 405, 255, 190, 70, 8); x.fill();
    for (const wx of [170, 700]) for (const wy of [200, 470]) { rr(x, wx, wy, 130, 140, 10); sh(x, '#bfe6f7', L2); }
    for (const wx of [380, 520]) { rr(x, wx, 470, 100, 140, 10); sh(x, '#bfe6f7', L2); }
    rr(x, 380, 700, 240, 270, 16); sh(x, '#7cc3ee', L2 * 1.2); line(x, [[500, 700], [500, 970]], L2);
  }),
  cafe: building((x, L1, L2) => {
    const b = () => rr(x, 90, 260, 820, 710, 16);
    shaded(x, b, '#c98a4a', .85, 30, 0, L1);
    path(x, [[50, 290], [500, 80], [950, 290]]); sh(x, '#7a4a2a', L1);
    rr(x, 300, 200, 400, 150, 24); sh(x, '#fffaf0', L2 * 1.2); text(x, 'CAFE', 500, 280, 100, '#7a4a2a');
    rr(x, 150, 450, 420, 320, 12); sh(x, '#ffe6a8', L2 * 1.2);
    rr(x, 280, 560, 160, 130, 30); sh(x, '#fff', L2); x.beginPath(); x.arc(450, 620, 40, -1.4, 1.4); stroke(x, L2 * 1.3);
    for (const dx of [-30, 30]) { x.beginPath(); x.moveTo(360 + dx, 540); x.quadraticCurveTo(380 + dx, 500, 360 + dx, 460); stroke(x, L2, '#9aa4b2'); }
    rr(x, 640, 520, 200, 450, 12); sh(x, '#7a4a2a', L2 * 1.2); dot(x, 800, 750, 16, '#ffd23f');
  }),
  park: building((x, L1, L2) => {
    for (const [tx, s] of [[300, 1], [800, .8]]) { rr(x, tx - 40 * s, 500, 80 * s, 420, 16); sh(x, '#8d5a31', L1); for (const [dx, dy, r] of [[0, -40, 230], [-140, 60, 150], [140, 60, 150]]) { circ(x, tx + dx * s, 400 + dy * s, r * s + 20); x.fillStyle = INK; x.fill(); } for (const [dx, dy, r] of [[0, -40, 230], [-140, 60, 150], [140, 60, 150]]) { circ(x, tx + dx * s, 400 + dy * s, r * s); x.fillStyle = '#5fae4a'; x.fill(); } }
    for (const lx of [380, 820]) { rr(x, lx - 20, 760, 40, 200, 10); sh(x, '#7a4a2a', L2); }
    rr(x, 320, 700, 560, 70, 16); sh(x, '#e8a05a', L1); rr(x, 320, 820, 560, 60, 16); sh(x, '#e8a05a', L1);
    for (let i = 0; i < 6; i++) { blob(x, 120 + i * 160, 950, 70, 40, .2, i); sh(x, '#7fd168', L2); }
  }),
  home: building((x, L1, L2) => {
    rr(x, 680, 70, 110, 260, 10); sh(x, '#b8342c', L1);
    const b = () => rr(x, 140, 400, 720, 570, 12);
    shaded(x, b, '#ffe9b0', .88, 30, 0, L1);
    path(x, [[60, 440], [500, 90], [940, 440]]); sh(x, '#3fa1de', L1);
    rr(x, 420, 650, 160, 320, 20); sh(x, '#e8413a', L2 * 1.2); dot(x, 550, 820, 16, '#ffd23f');
    for (const wx of [210, 640]) { rr(x, wx, 520, 150, 150, 10); sh(x, '#bfe6f7', L2); line(x, [[wx + 75, 520], [wx + 75, 670]], L2); }
    circ(x, 500, 330, 60); sh(x, '#fffaf0', L2);
  }),
};

// ================= lesson 23: birthday =================
const PARTY = {
  cake: G(1.1, (x, L1, L2) => {
    for (const cx of [380, 550, 720]) { rr(x, cx - 22, 100, 44, 200, 10); sh(x, '#7cc3ee', L2); x.beginPath(); x.moveTo(cx, 20); x.quadraticCurveTo(cx + 40, 80, cx, 100); x.quadraticCurveTo(cx - 40, 80, cx, 20); x.closePath(); sh(x, '#ffb02e', L2); }
    const b1 = () => rr(x, 120, 560, 860, 380, 40), b2 = () => rr(x, 230, 290, 640, 300, 40);
    shaded(x, b1, '#f9b8c4', .86, 30, 0, L1); shaded(x, b2, '#fff0d8', .9, 26, 0, L1);
    for (const [y, x0, x1] of [[560, 120, 980], [290, 230, 870]]) { x.beginPath(); x.moveTo(x0, y + 10); for (let i = 0; i <= 8; i++) { const px = x0 + (x1 - x0) * i / 8; x.quadraticCurveTo(px - (x1 - x0) / 16, y + 90, px, y + 10); } stroke(x, L2 * 2.2, '#fff'); }
    for (let i = 0; i < 7; i++) dot(x, 220 + i * 110, 780, 22, ['#e8413a', '#3fa1de', '#ffc93c', '#62c24c'][i % 4]);
    rr(x, 60, 920, 980, 60, 20); sh(x, '#d6d0c4', L2);
  }),
  candle: G(.5, (x, L1, L2) => {
    const c = () => rr(x, 130, 330, 240, 640, 30);
    shaded(x, c, '#7cc3ee', .84, 20, 0, L1);
    for (let i = 0; i < 4; i++) { x.beginPath(); x.moveTo(130, 420 + i * 140); x.lineTo(370, 360 + i * 140); stroke(x, L2 * 2, '#fff'); }
    line(x, [[250, 330], [250, 260]], L2 * 1.4);
    x.beginPath(); x.moveTo(250, 30); x.bezierCurveTo(380, 160, 330, 270, 250, 270); x.bezierCurveTo(170, 270, 120, 160, 250, 30); x.closePath(); sh(x, '#ffb02e', L1);
    x.beginPath(); x.moveTo(250, 130); x.bezierCurveTo(310, 200, 290, 250, 250, 250); x.bezierCurveTo(210, 250, 190, 200, 250, 130); x.closePath(); x.fillStyle = '#ffe27a'; x.fill();
  }),
  present: G(1, (x, L1, L2) => {
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(500, 260); x.bezierCurveTo(500 + s * 100, 60, 500 + s * 330, 80, 500 + s * 260, 230); x.closePath(); sh(x, '#ffc93c', L1); }
    const b = () => rr(x, 110, 380, 780, 590, 20);
    shaded(x, b, '#e8413a', .82, 30, 0, L1);
    rr(x, 70, 250, 860, 170, 20); sh(x, '#f25a50', L1);
    rr(x, 440, 250, 120, 720, 4); sh(x, '#ffc93c', L2);
    for (let i = 0; i < 5; i++) dot(x, 220 + (i % 2) * 480, 520 + i * 90, 26, '#fff');
  }),
  balloons: G(.85, (x, L1, L2) => {
    for (const [bx, by] of [[230, 300], [610, 260], [420, 420]]) { x.beginPath(); x.moveTo(bx, by + 200); x.quadraticCurveTo(bx + 30, by + 450, 425, 980); stroke(x, L2); }
    for (const [bx, by, c] of [[230, 300, '#3fa1de'], [610, 260, '#62c24c'], [420, 420, '#f59aa8']]) { const p = () => ell(x, bx, by, 170, 210); shaded(x, p, c, .8, 22, 0, L1); shine(x, bx - 70, by - 90, 26, 46, .4, .5); }
  }),
  'party hat': G(.85, (x, L1, L2) => {
    circ(x, 425, 110, 90); sh(x, '#ffc93c', L1);
    const h = () => { x.beginPath(); x.moveTo(425, 160); x.lineTo(780, 920); x.quadraticCurveTo(425, 1000, 70, 920); x.closePath(); };
    h(); sh(x, '#9b6fd1', L1);
    x.save(); h(); x.clip(); for (let i = 0; i < 6; i++) { x.beginPath(); x.moveTo(0, 300 + i * 150); x.lineTo(900, 160 + i * 150); x.lineWidth = 50; x.strokeStyle = i % 2 ? '#ffc93c' : '#f59aa8'; x.stroke(); } x.restore(); h(); sh(x, null, L1);
  }),
  card: G(1.15, (x, L1, L2) => {
    path(x, [[100, 220], [560, 120], [560, 900], [100, 960]]); sh(x, '#fff0d8', L1);
    const f = () => path(x, [[560, 120], [1050, 220], [1050, 960], [560, 900]]);
    shaded(x, f, '#ffc93c', .86, -20, 0, L1);
    x.beginPath(); x.moveTo(800, 700); x.bezierCurveTo(620, 560, 640, 410, 730, 410); x.bezierCurveTo(780, 410, 800, 450, 800, 470); x.bezierCurveTo(800, 450, 820, 410, 870, 410); x.bezierCurveTo(960, 410, 980, 560, 800, 700); x.closePath(); sh(x, '#e8413a', L2 * 1.2);
    for (let i = 0; i < 4; i++) line(x, [[170, 380 + i * 120], [480, 360 + i * 120]], L2, '#d6c4a0');
  }),
};

export const B5_PICS = { ...DAY, ...Object.fromEntries(Object.keys(DAY_COL).map(k => [k, dayCard(k)])), ...GO, ...SIZE, ...SHAPES, ...TOWN, ...PARTY };

// ================= town scene =================
export function citySky(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, PH); g.addColorStop(0, th.sky || '#8fd0f3'); g.addColorStop(1, th.sky2 || '#e6f6fc'); x.fillStyle = g; x.fillRect(0, 0, PW, PH);
  for (const [cx, cy, s] of [[PW * .2, PH * .2, 1], [PW * .7, PH * .14, .8]]) { x.fillStyle = '#fff'; for (const [dx, dy, r] of [[-120, 20, 80], [-40, -20, 110], [60, 0, 95], [140, 30, 65]]) { x.beginPath(); x.arc(cx + dx * s, cy + dy * s, r * s, 0, TAU); x.fill(); } }
  const R = mulberry(4), cols = ['#f6c7a8', '#c9dff0', '#f3e0a8', '#d8c8ee', '#bfe2c8', '#f9d0d8'];
  for (let layer = 0; layer < 2; layer++) {
    let px = -40;
    while (px < PW) {
      const w = 140 + R() * 160, h = PH * (layer ? .28 + R() * .2 : .38 + R() * .22), y = PH * .8 - h;
      x.fillStyle = layer ? cols[(R() * cols.length) | 0] : 'rgba(150,180,210,.55)'; x.fillRect(px, y, w, h + PH);
      if (layer) { x.strokeStyle = INK; x.lineWidth = 6; x.strokeRect(px, y, w, h + PH); x.fillStyle = 'rgba(255,255,255,.75)'; for (let wy = y + 30; wy < PH * .78; wy += 70) for (let wx = px + 22; wx < px + w - 40; wx += 56) x.fillRect(wx, wy, 30, 38); }
      px += w + (layer ? 30 + R() * 50 : 10);
    }
  }
  x.fillStyle = '#9aa4b2'; x.fillRect(0, PH * .8, PW, PH * .2); x.fillStyle = '#d6d0c4'; x.fillRect(0, PH * .8, PW, 24);
  grain(x); return c;
}
export function road(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  paperFill(x, PW, PH, '#d9d2c4', 8);
  x.fillStyle = '#6f7682'; x.fillRect(0, PH * .12, PW, PH * .3);
  x.fillStyle = '#fff'; for (let i = 0; i < 12; i++) x.fillRect(i * PW / 12 + 30, PH * .26, PW / 24, 16);
  for (let i = 0; i < 7; i++) x.fillRect(PW * .78 + i * 46, PH * .13, 26, PH * .28);
  x.beginPath(); x.ellipse(PW / 2, PH * .72, PW * .38, PH * .2, 0, 0, TAU); x.fillStyle = th.path || '#efe3c8'; x.fill(); x.lineWidth = 10; x.strokeStyle = '#c9bca2'; x.stroke();
  x.strokeStyle = 'rgba(0,0,0,.08)'; x.lineWidth = 4; for (let i = 0; i < 20; i++) { x.beginPath(); x.moveTo(i * PW / 20, PH * .42); x.lineTo(i * PW / 20, PH); x.stroke(); }
  grain(x); return c;
}
export const trafficLight = hm => cut(hm * .35, hm, (x, W, H) => {
  rr(x, W * .42, H * .45, W * .16, H * .55, 6); sh(x, '#5a6474', LW);
  rr(x, W * .1, 0, W * .8, H * .5, 20); sh(x, '#3a3a44', LW);
  ['#e8413a', '#ffc93c', '#62c24c'].forEach((c, i) => { circ(x, W / 2, H * (.09 + i * .16), W * .24); sh(x, c, LW2); });
});
export const busStop = hm => cut(hm * .5, hm, (x, W, H) => {
  rr(x, W * .45, H * .3, W * .1, H * .7, 6); sh(x, '#9aa4b2', LW);
  circ(x, W / 2, H * .22, W * .45); sh(x, '#3fa1de', LW);
  x.font = `${W * .36}px "Lilita One"`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fff'; x.fillText('BUS', W / 2, H * .23);
});
export const shopFront = (wm, hm, label) => cut(wm, hm, (x, W, H) => {
  rr(x, 0, H * .1, W, H * .9, 12); sh(x, '#f6c7a8', LW);
  rr(x, W * .1, 0, W * .8, H * .22, 18); sh(x, '#fffaf0', LW);
  let fs = H * .15; x.font = `${fs}px "Lilita One"`; while (x.measureText(label).width > W * .72) { fs -= 4; x.font = `${fs}px "Lilita One"`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#e8413a'; x.fillText(label, W / 2, H * .115);
  x.save(); x.beginPath(); x.rect(0, H * .28, W, H * .12); x.clip(); for (let i = 0; i < 10; i++) { x.fillStyle = i % 2 ? '#fff' : '#3fa1de'; x.fillRect(i * W / 10, H * .28, W / 10, H * .12); } x.restore();
  for (const u of [.08, .56]) { rr(x, W * u, H * .48, W * .36, H * .3, 8); sh(x, '#bfe6f7', LW2 + 1); }
  rr(x, W * .42, H * .5, W * .16, H * .5, 8); sh(x, '#62c24c', LW2 + 1);
});
