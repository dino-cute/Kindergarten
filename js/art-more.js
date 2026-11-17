// Word pictures for lessons 5+, outdoor scene props and pages, and the art-key dispatcher.
// Pictures are drawn on a grid 1000 units tall (width = 1000 × ratio); L1/L2 are the outline widths in grid units.
import { TAU, mulberry } from './lib.js';
import { cv, sh, blob, crescent, paperFill, INK, rr } from './paper.js';
import { cut, LW, LW2, line, shine, shade, WORD_ART, numberCard, balloon, person, FAM, PW, PH, grain } from './art.js';

import { G, SKIN, SKIN_S, ell, circ, dot, mirror, stroke, shaded, cuteEye, smile, cheeks } from './draw.js';
import { MORE_PICS } from './art-b3.js';
import { B4_PICS, setMonkey } from './art-b4.js';
import { B5_PICS } from './art-b5.js';

// ================= lesson 5: my body =================
const BODY = {
  head: G(.92, (x, L1, L2) => {
    for (const s of [-1, 1]) { ell(x, 460 + s * 360, 560, 70, 100); sh(x, SKIN, L2); }
    const face = () => ell(x, 460, 540, 365, 400);
    shaded(x, face, SKIN, .9, 30, 26, L1);
    x.beginPath(); x.moveTo(100, 470); x.bezierCurveTo(90, 180, 300, 110, 470, 115); x.bezierCurveTo(660, 120, 840, 200, 822, 470);
    x.quadraticCurveTo(760, 330, 640, 330); x.quadraticCurveTo(560, 250, 470, 320); x.quadraticCurveTo(350, 250, 270, 330); x.quadraticCurveTo(160, 340, 100, 470); x.closePath(); sh(x, '#3b2a20', L1);
    cuteEye(x, 340, 560, 52); cuteEye(x, 580, 560, 52); cheeks(x, 460, 690, 210, 50);
    smile(x, 460, 730, 70, L2 * 1.3);
  }),
  eyes: G(1.3, (x, L1, L2) => {
    for (const cx of [360, 940]) {
      x.beginPath(); x.moveTo(cx - 230, 150); x.quadraticCurveTo(cx, 40, cx + 230, 150); stroke(x, L1 * 1.2, '#3b2a20');
      ell(x, cx, 560, 240, 290); sh(x, '#fff', L1);
      circ(x, cx + 20, 600, 150); sh(x, '#7a4a2a', L2); dot(x, cx + 20, 600, 85);
      dot(x, cx - 25, 545, 38, '#fff'); dot(x, cx + 60, 650, 16, '#fff');
    }
  }),
  ears: G(1.15, (x, L1, L2) => {
    mirror(x, 575, () => {
      x.beginPath(); x.moveTo(300, 120); x.bezierCurveTo(560, 80, 600, 420, 470, 600); x.bezierCurveTo(400, 720, 470, 900, 300, 920); x.bezierCurveTo(130, 900, 90, 120, 300, 120); x.closePath();
      crescent(x, () => { x.beginPath(); x.moveTo(300, 120); x.bezierCurveTo(560, 80, 600, 420, 470, 600); x.bezierCurveTo(400, 720, 470, 900, 300, 920); x.bezierCurveTo(130, 900, 90, 120, 300, 120); x.closePath(); }, SKIN_S, -24, 0, SKIN);
      x.beginPath(); x.moveTo(300, 120); x.bezierCurveTo(560, 80, 600, 420, 470, 600); x.bezierCurveTo(400, 720, 470, 900, 300, 920); x.bezierCurveTo(130, 900, 90, 120, 300, 120); x.closePath(); sh(x, null, L1);
      x.beginPath(); x.moveTo(250, 300); x.bezierCurveTo(380, 220, 450, 400, 360, 520); x.quadraticCurveTo(300, 600, 340, 720); stroke(x, L2 * 1.3, '#c98c66');
    });
  }),
  nose: G(.95, (x, L1, L2) => {
    const n = () => { x.beginPath(); x.moveTo(400, 80); x.bezierCurveTo(390, 350, 250, 520, 220, 680); x.bezierCurveTo(190, 880, 380, 930, 475, 870); x.bezierCurveTo(570, 930, 760, 880, 730, 680); x.bezierCurveTo(700, 520, 560, 350, 550, 80); x.closePath(); };
    shaded(x, n, SKIN, .88, 40, 0, L1);
    ell(x, 380, 800, 50, 30, .3); x.fillStyle = '#8a4a3a'; x.fill(); ell(x, 570, 800, 50, 30, -.3); x.fill();
    shine(x, 400, 660, 40, 70, -.3, .5);
  }),
  mouth: G(1.3, (x, L1, L2) => {
    const lips = () => { x.beginPath(); x.moveTo(110, 430); x.bezierCurveTo(300, 170, 520, 300, 650, 340); x.bezierCurveTo(780, 300, 1000, 170, 1190, 430); x.bezierCurveTo(1050, 900, 250, 900, 110, 430); x.closePath(); };
    shaded(x, lips, '#ef6a62', .82, 0, -30, L1);
    const inner = () => { x.beginPath(); x.moveTo(230, 450); x.quadraticCurveTo(650, 380, 1070, 450); x.quadraticCurveTo(650, 900, 230, 450); x.closePath(); };
    inner(); x.fillStyle = '#7a2424'; x.fill();
    x.save(); inner(); x.clip(); x.fillStyle = '#fff'; x.fillRect(0, 380, 1300, 120); ell(x, 650, 700, 230, 110); x.fillStyle = '#f59aa8'; x.fill(); x.restore();
    inner(); sh(x, null, L2);
  }),
  hands: G(1.3, (x, L1, L2) => {
    mirror(x, 650, () => {
      x.save(); x.translate(360, 560); x.rotate(-.15);
      for (const [fx, fl] of [[-120, 300], [-40, 360], [40, 340], [115, 280]]) { rr(x, fx - 38, -170 - fl + 60, 76, fl, 38); sh(x, SKIN, L2 * 1.2); }
      x.save(); x.translate(-150, 40); x.rotate(-.9); rr(x, -38, -230, 76, 240, 38); sh(x, SKIN, L2 * 1.2); x.restore();
      const palm = () => rr(x, -165, -170, 330, 380, 120);
      shaded(x, palm, SKIN, .88, -24, 0, L1);
      x.restore();
    });
  }),
  legs: G(.95, (x, L1, L2) => {
    for (const cx of [330, 620]) {
      rr(x, cx - 80, 300, 160, 520, 70); sh(x, SKIN, L1);
      rr(x, cx - 84, 700, 168, 130, 30); sh(x, '#fff', L2);
      x.beginPath(); x.ellipse(cx + (cx < 475 ? -50 : 50), 900, 150, 80, 0, 0, TAU); sh(x, '#e8413a', L1); shine(x, cx + (cx < 475 ? -90 : 10), 870, 40, 16, 0, .4);
    }
    const shorts = () => { x.beginPath(); x.moveTo(180, 60); x.lineTo(770, 60); x.lineTo(820, 440); x.lineTo(510, 450); x.lineTo(475, 260); x.lineTo(440, 450); x.lineTo(130, 440); x.closePath(); };
    shaded(x, shorts, '#3fa1de', .8, 0, -30, L1);
    rr(x, 170, 40, 610, 80, 30); sh(x, '#2a78b3', L2);
  }),
  feet: G(1.3, (x, L1, L2) => {
    mirror(x, 650, () => {
      x.save(); x.translate(400, 560); x.rotate(-.12);
      const sole = () => { x.beginPath(); x.moveTo(0, -300); x.bezierCurveTo(200, -310, 210, 0, 170, 180); x.bezierCurveTo(140, 380, -150, 380, -150, 180); x.bezierCurveTo(-150, 0, -170, -300, 0, -300); x.closePath(); };
      shaded(x, sole, SKIN, .88, -24, 0, L1);
      const toes = [[130, -300, 62], [40, -350, 52], [-40, -350, 46], [-105, -320, 40], [-160, -270, 34]];
      for (const [tx, ty, r] of toes) { circ(x, tx - 20, ty + 20, r); sh(x, SKIN, L2 * 1.2); }
      x.restore();
    });
  }),
};

// ================= lesson 6: toys =================
const TOYS = {
  ball: G(1, (x, L1, L2) => {
    x.save(); circ(x, 500, 520, 430); x.clip();
    const cols = ['#e8413a', '#ffc93c', '#3fa1de', '#fff'];
    for (let k = 0; k < 4; k++) { ell(x, 500, 520, 430 * (1 - k * .3), 430); x.fillStyle = cols[k]; x.fill(); }
    x.fillStyle = 'rgba(0,0,0,.12)'; ell(x, 560, 600, 430, 430); x.fill();
    x.restore();
    circ(x, 500, 520, 430); sh(x, null, L1); circ(x, 500, 140, 50); sh(x, '#fff', L2);
    shine(x, 330, 340, 80, 40, -.7, .45);
  }),
  car: G(1.35, (x, L1, L2) => {
    const top = () => { x.beginPath(); x.moveTo(380, 450); x.lineTo(470, 200); x.lineTo(880, 200); x.lineTo(1000, 450); x.closePath(); };
    shaded(x, top, '#e8413a', .8, 0, -20, L1);
    for (const [a, b] of [[440, 650], [690, 930]]) { x.beginPath(); x.moveTo(a + 10, 420); x.lineTo(a + 60, 250); x.lineTo(b - 50, 250); x.lineTo(b, 420); x.closePath(); sh(x, '#bfe6f7', L2); }
    const body = () => rr(x, 60, 430, 1230, 330, 120);
    shaded(x, body, '#e8413a', .8, 0, -40, L1);
    rr(x, 1180, 520, 90, 70, 30); sh(x, '#ffd23f', L2); rr(x, 70, 540, 60, 60, 20); sh(x, '#ffb2a8', L2);
    line(x, [[650, 460], [650, 740]], L2, '#bf2e28');
    for (const cx of [320, 1030]) { circ(x, cx, 770, 165); sh(x, '#3a3a44', L1); circ(x, cx, 770, 70); sh(x, '#d6d0c4', L2); }
    shine(x, 300, 520, 120, 26, 0, .35);
  }),
  doll: G(.72, (x, L1, L2) => {
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(360 + s * 120, 330); x.quadraticCurveTo(360 + s * 260, 420, 360 + s * 230, 600); stroke(x, L1 * 2.6, INK); stroke(x, L1 * 1.6, '#ffc93c'); }
    for (const s of [-1, 1]) { rr(x, 360 + s * 70 - 35, 780, 70, 170, 30); sh(x, SKIN, L2 * 1.2); ell(x, 360 + s * 85, 960, 70, 38); sh(x, '#e8413a', L2); }
    for (const s of [-1, 1]) { x.save(); x.translate(360 + s * 120, 520); x.rotate(s * -.5); rr(x, -30, 0, 60, 230, 30); sh(x, SKIN, L2 * 1.2); x.restore(); }
    const dress = () => { x.beginPath(); x.moveTo(270, 460); x.lineTo(450, 460); x.lineTo(600, 830); x.quadraticCurveTo(360, 880, 120, 830); x.closePath(); };
    shaded(x, dress, '#f59aa8', .82, 30, 0, L1);
    for (const y of [560, 650, 740]) dot(x, 360, y, 20, '#fff');
    const head = () => circ(x, 360, 300, 190);
    shaded(x, head, SKIN, .9, 20, 16, L1);
    x.beginPath(); x.moveTo(170, 300); x.bezierCurveTo(170, 100, 550, 100, 550, 300); x.quadraticCurveTo(450, 200, 360, 230); x.quadraticCurveTo(260, 200, 170, 300); x.closePath(); sh(x, '#ffc93c', L1);
    for (const s of [-1, 1]) dot(x, 360 + s * 65, 310, 26);
    cheeks(x, 360, 370, 110, 30); smile(x, 360, 380, 40, L2 * 1.2);
  }),
  kite: G(.75, (x, L1, L2) => {
    x.beginPath(); x.moveTo(375, 640); x.bezierCurveTo(200, 740, 550, 820, 330, 990); stroke(x, L2 * 1.3);
    for (const [bx, by, c] of [[300, 730, '#e8413a'], [420, 820, '#3fa1de'], [360, 930, '#ffc93c']]) { x.beginPath(); x.moveTo(bx, by); x.lineTo(bx - 60, by - 40); x.lineTo(bx - 60, by + 40); x.closePath(); x.moveTo(bx, by); x.lineTo(bx + 60, by - 40); x.lineTo(bx + 60, by + 40); x.closePath(); sh(x, c, L2); }
    const P = [[375, 30], [700, 300], [375, 640], [50, 300]], C = [375, 300];
    const cols = ['#e8413a', '#ffc93c', '#3fa1de', '#62c24c'];
    for (let i = 0; i < 4; i++) { const a = P[i], b = P[(i + 1) % 4]; x.beginPath(); x.moveTo(...C); x.lineTo(...a); x.lineTo(...b); x.closePath(); sh(x, cols[i], 0); }
    x.beginPath(); P.forEach((p, i) => i ? x.lineTo(...p) : x.moveTo(...p)); x.closePath(); sh(x, null, L1);
    line(x, [P[0], P[2]], L2); line(x, [P[1], P[3]], L2);
  }),
  robot: G(.8, (x, L1, L2) => {
    line(x, [[400, 170], [400, 60]], L2 * 1.4); circ(x, 400, 60, 45); sh(x, '#e8413a', L2);
    for (const s of [-1, 1]) { rr(x, 400 + s * 110 - 50, 820, 100, 160, 20); sh(x, '#9aa4b2', L2 * 1.2); }
    for (const s of [-1, 1]) { x.save(); x.translate(400 + s * 230, 520); x.rotate(s * -.35); rr(x, -40, 0, 80, 230, 30); sh(x, '#9aa4b2', L2 * 1.2); circ(x, 0, 250, 55); sh(x, '#ffc93c', L2); x.restore(); }
    const body = () => rr(x, 170, 470, 460, 380, 50);
    shaded(x, body, '#7cc3ee', .82, 30, 0, L1);
    rr(x, 260, 560, 280, 170, 30); sh(x, '#fff', L2);
    dot(x, 320, 645, 30, '#e8413a'); dot(x, 400, 645, 30, '#62c24c'); dot(x, 480, 645, 30, '#ffc93c');
    const head = () => rr(x, 160, 160, 480, 320, 70);
    shaded(x, head, '#c9d3df', .85, 30, 20, L1);
    for (const s of [-1, 1]) { circ(x, 400 + s * 110, 300, 70); sh(x, '#ffe27a', L2 * 1.2); dot(x, 400 + s * 110, 300, 32); }
    rr(x, 300, 400, 200, 40, 14); sh(x, '#5a6474', L2);
  }),
  train: G(1.45, (x, L1, L2) => {
    rr(x, 300, 80, 130, 260, 30); sh(x, '#3a3a44', L1); rr(x, 270, 60, 190, 70, 30); sh(x, '#3a3a44', L2);
    const boiler = () => rr(x, 120, 300, 820, 380, 150);
    shaded(x, boiler, '#62c24c', .8, 0, -40, L1);
    for (const bx of [380, 640]) line(x, [[bx, 310], [bx, 670]], L2, '#3e8a30');
    const cab = () => rr(x, 880, 120, 470, 560, 40);
    shaded(x, cab, '#e8413a', .8, 30, 0, L1);
    rr(x, 840, 80, 550, 90, 30); sh(x, '#3a3a44', L2);
    rr(x, 970, 230, 290, 200, 30); sh(x, '#bfe6f7', L2);
    x.beginPath(); x.moveTo(120, 700); x.lineTo(30, 900); x.lineTo(220, 900); x.closePath(); sh(x, '#e8413a', L2);
    rr(x, 80, 690, 1280, 60, 20); sh(x, '#3a3a44', L2);
    for (const [cx, r] of [[330, 150], [680, 150], [1130, 170]]) { circ(x, cx, 830, r); sh(x, '#3a3a44', L1); circ(x, cx, 830, r * .45); sh(x, '#ffc93c', L2); }
    line(x, [[330, 830], [1130, 830]], L2 * 1.5, '#d6d0c4');
  }),
};

// ================= lessons 7–8: animals =================
function quad(x, body, legs, legCol, L1, L2, hoof) {
  for (const [lx, top] of legs) { rr(x, lx - 45, top, 90, 960 - top, 40); sh(x, legCol, L2 * 1.3); if (hoof) { rr(x, lx - 48, 900, 96, 70, 20); sh(x, hoof, L2); } }
  body();
}
// horse shape, also used for the zebra (stripes)
function horseArt(stripes) {
  return G(1.15, (x, L1, L2) => {
    const C = stripes ? '#fafafa' : '#b97a4a', M = stripes ? '#2b2b2b' : '#5a3520';
    x.beginPath(); x.moveTo(1010, 430); x.bezierCurveTo(1120, 460, 1130, 700, 1080, 770); x.bezierCurveTo(1060, 650, 1040, 560, 990, 500); x.closePath(); sh(x, M, L2 * 1.2);
    for (const lx of [440, 540, 860, 960]) { rr(x, lx - 42, 560, 84, 400, 36); sh(x, C, L2 * 1.3); rr(x, lx - 46, 900, 92, 70, 20); sh(x, M, L2); }
    const HR = -.7, hx = 230, hy = 260;
    const all = () => { x.beginPath(); x.ellipse(700, 500, 330, 185, 0, 0, TAU); x.moveTo(250, 200); x.lineTo(380, 150); x.lineTo(540, 420); x.lineTo(430, 580); x.closePath(); x.moveTo(hx + 175 * Math.cos(HR), hy + 175 * Math.sin(HR)); x.ellipse(hx, hy, 175, 95, HR, 0, TAU); };
    all(); stroke(x, L1 * 2); all(); x.fillStyle = C; x.fill();
    x.save(); all(); x.clip();
    if (stripes) {
      x.strokeStyle = INK; x.lineCap = 'round'; x.lineWidth = 26;
      for (let i = 0; i < 8; i++) { const sx = 520 + i * 70; x.beginPath(); x.moveTo(sx - 20, 300); x.quadraticCurveTo(sx + 30, 480, sx, 640); x.stroke(); }
      for (let i = 0; i < 5; i++) { x.beginPath(); x.moveTo(250 + i * 50, 210 + i * 60); x.lineTo(380 + i * 40, 150 + i * 70); x.stroke(); }
    } else { x.fillStyle = shade(C, .85); ell(x, 710, 630, 320, 100); x.fill(); }
    x.restore();
    x.beginPath(); x.moveTo(370, 130); x.bezierCurveTo(470, 210, 530, 320, 575, 440); x.lineTo(535, 455); x.bezierCurveTo(490, 350, 440, 260, 385, 195); x.closePath(); sh(x, M, L2);
    x.beginPath(); x.moveTo(320, 160); x.lineTo(345, 55); x.lineTo(385, 150); x.closePath(); sh(x, C, L2);
    ell(x, 135, 335, 70, 55, HR); sh(x, stripes ? '#3a3a44' : '#e9c49a', L2); dot(x, 120, 340, 12, stripes ? '#fff' : INK);
    cuteEye(x, 255, 225, 30);
  });
}
const ANIMALS = {
  cow: G(1.2, (x, L1, L2) => {
    x.beginPath(); x.moveTo(1080, 420); x.quadraticCurveTo(1170, 600, 1130, 700); stroke(x, L2 * 1.3); ell(x, 1130, 720, 30, 45); sh(x, INK, 0);
    for (const lx of [500, 600, 900, 1000]) { rr(x, lx - 45, 560, 90, 380, 36); sh(x, '#fff', L2 * 1.3); rr(x, lx - 48, 900, 96, 70, 20); sh(x, '#5a4a40', L2); }
    const body = () => ell(x, 760, 520, 380, 220);
    body(); x.fillStyle = '#fff'; x.fill();
    x.save(); body(); x.clip(); x.fillStyle = INK; blob(x, 620, 420, 120, 90, .2, 3); x.fill(); blob(x, 900, 580, 140, 100, .2, 7); x.fill(); blob(x, 1030, 380, 90, 80, .2, 9); x.fill();
    x.fillStyle = 'rgba(0,0,0,.08)'; ell(x, 770, 650, 380, 110); x.fill(); x.restore();
    body(); sh(x, null, L1);
    ell(x, 760, 760, 70, 50); sh(x, '#f59aa8', L2);
    for (const s of [-1, 1]) { ell(x, 260 + s * 190, 260, 90, 45, s * .4); sh(x, '#fff', L2 * 1.2); x.beginPath(); x.moveTo(260 + s * 90, 200); x.quadraticCurveTo(260 + s * 140, 120, 260 + s * 110, 80); stroke(x, L2 * 3.2); stroke(x, L2 * 1.8, '#f3e3b8'); }
    const head = () => { x.beginPath(); x.roundRect(110, 180, 300, 380, 140); };
    head(); sh(x, '#fff', L1); blob(x, 320, 290, 60, 70, .2, 5); x.fillStyle = INK; x.fill();
    const muzzle = () => ell(x, 260, 530, 190, 120);
    muzzle(); sh(x, '#f9b8c4', L1); ell(x, 200, 530, 22, 30); x.fillStyle = '#8a4a4a'; x.fill(); ell(x, 320, 530, 22, 30); x.fill();
    cuteEye(x, 200, 330, 34); cuteEye(x, 320, 330, 34);
  }),
  pig: G(1.2, (x, L1, L2) => {
    const P = '#f9a8b8', PS = '#e8889c';
    x.beginPath(); x.moveTo(1080, 420); x.bezierCurveTo(1200, 380, 1160, 300, 1110, 330); x.bezierCurveTo(1070, 350, 1120, 420, 1170, 400); stroke(x, L2 * 1.5);
    for (const lx of [480, 580, 860, 960]) { rr(x, lx - 50, 640, 100, 300, 40); sh(x, P, L2 * 1.3); rr(x, lx - 52, 900, 104, 60, 20); sh(x, PS, L2); }
    const body = () => ell(x, 740, 560, 400, 270);
    shaded(x, body, P, .9, 0, -40, L1);
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(300 + s * 130, 250); x.lineTo(300 + s * 210, 100); x.lineTo(300 + s * 30, 200); x.closePath(); sh(x, PS, L2 * 1.2); }
    const head = () => circ(x, 300, 450, 250);
    shaded(x, head, P, .9, 24, 20, L1);
    ell(x, 250, 540, 120, 85); sh(x, PS, L1); ell(x, 210, 540, 22, 34); x.fillStyle = '#8a3a4a'; x.fill(); ell(x, 290, 540, 22, 34); x.fill();
    cuteEye(x, 200, 400, 30); cuteEye(x, 380, 400, 30); cheeks(x, 300, 470, 170, 36);
  }),
  sheep: G(1.2, (x, L1, L2) => {
    for (const lx of [480, 580, 860, 960]) { rr(x, lx - 36, 640, 72, 320, 30); sh(x, '#3a3a44', L2 * 1.3); }
    const R = mulberry(8), puffs = [];
    for (let i = 0; i < 16; i++) { const a = i / 16 * TAU; puffs.push([720 + Math.cos(a) * 330, 520 + Math.sin(a) * 210, 120 + R() * 30]); }
    for (const [px, py, r] of puffs) { circ(x, px, py, r + 16); x.fillStyle = INK; x.fill(); }
    for (const [px, py, r] of puffs) { circ(x, px, py, r); x.fillStyle = '#fff'; x.fill(); }
    ell(x, 720, 520, 340, 220); x.fillStyle = '#fff'; x.fill();
    for (const [px, py, r] of puffs.slice(0, 8)) { circ(x, px - 10, py - 10, r * .5); x.fillStyle = '#f1ece2'; x.fill(); }
    for (const s of [-1, 1]) { ell(x, 260 + s * 170, 330, 90, 40, s * .5); sh(x, '#3a3a44', L2 * 1.2); }
    const head = () => ell(x, 260, 400, 160, 200);
    head(); sh(x, '#3a3a44', L1);
    for (let i = 0; i < 5; i++) { circ(x, 160 + i * 50, 230 - Math.sin(i / 4 * Math.PI) * 40, 60); sh(x, '#fff', L2); }
    for (const s of [-1, 1]) { ell(x, 260 + s * 65, 410, 30, 40); x.fillStyle = '#fff'; x.fill(); dot(x, 260 + s * 65, 420, 18); }
    smile(x, 260, 510, 40, L2 * 1.2);
    x.lineWidth = L2 * 1.2; x.strokeStyle = '#fff'; x.beginPath(); x.moveTo(220, 510); x.quadraticCurveTo(260, 555, 300, 510); x.stroke();
  }),
  horse: horseArt(false),
  duck: G(1.05, (x, L1, L2) => {
    for (const lx of [500, 640]) { line(x, [[lx, 800], [lx, 920]], L2 * 2.5, '#ff8c3a'); ell(x, lx - 30, 940, 80, 36); sh(x, '#ff8c3a', L2); }
    const body = () => { x.beginPath(); x.moveTo(250, 520); x.bezierCurveTo(250, 860, 900, 900, 980, 560); x.lineTo(1040, 430); x.bezierCurveTo(900, 480, 800, 470, 700, 470); x.bezierCurveTo(500, 470, 300, 430, 250, 520); x.closePath(); };
    shaded(x, body, '#ffd23f', .85, 0, -40, L1);
    x.beginPath(); x.moveTo(520, 560); x.bezierCurveTo(600, 760, 850, 740, 880, 570); x.quadraticCurveTo(700, 640, 520, 560); x.closePath(); sh(x, '#f5b82a', L2 * 1.2);
    const head = () => circ(x, 330, 330, 210);
    shaded(x, head, '#ffd23f', .85, 24, 18, L1);
    x.beginPath(); x.moveTo(170, 360); x.quadraticCurveTo(10, 330, 20, 410); x.quadraticCurveTo(80, 470, 190, 440); x.closePath(); sh(x, '#ff8c3a', L1);
    cuteEye(x, 290, 290, 36); cheeks(x, 330, 380, 110, 30);
    x.beginPath(); x.moveTo(330, 120); x.quadraticCurveTo(360, 40, 400, 90); stroke(x, L2 * 1.3);
  }),
  chicken: G(.95, (x, L1, L2) => {
    for (const lx of [400, 540]) { line(x, [[lx, 760], [lx, 930]], L2 * 2, '#ff8c3a'); for (const d of [-50, 0, 50]) line(x, [[lx, 930], [lx + d, 970]], L2 * 1.6, '#ff8c3a'); }
    for (const [a, c] of [[-.7, '#e8413a'], [-.3, '#3e8a30'], [.1, '#e8413a']]) { x.save(); x.translate(760, 480); x.rotate(a); ell(x, 0, -170, 70, 190); sh(x, c, L2 * 1.2); x.restore(); }
    const body = () => ell(x, 470, 580, 330, 270);
    shaded(x, body, '#fff8ec', .88, 0, -30, L1);
    ell(x, 540, 610, 160, 110, -.2); sh(x, '#efe3c8', L2 * 1.2);
    for (let i = 0; i < 3; i++) { circ(x, 250 + i * 70, 170 - (i === 1 ? 40 : 0), 60); sh(x, '#e8413a', L2); }
    const head = () => circ(x, 320, 320, 170);
    shaded(x, head, '#fff8ec', .88, 20, 16, L1);
    x.beginPath(); x.moveTo(170, 300); x.lineTo(60, 340); x.lineTo(170, 380); x.closePath(); sh(x, '#ffc93c', L2 * 1.2);
    ell(x, 190, 440, 34, 60); sh(x, '#e8413a', L2);
    cuteEye(x, 300, 290, 32);
  }),
  lion: G(1, (x, L1, L2) => {
    const R = mulberry(4), n = 18;
    x.beginPath();
    for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * TAU, r = i % 2 ? 470 : 380 + R() * 20; i ? x.lineTo(500 + Math.cos(a) * r, 520 + Math.sin(a) * r * .95) : x.moveTo(500 + r, 520); }
    x.closePath(); crescent(x, () => { x.beginPath(); for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * TAU, r = i % 2 ? 470 : 390; i ? x.lineTo(500 + Math.cos(a) * r, 520 + Math.sin(a) * r * .95) : x.moveTo(500 + r, 520); } x.closePath(); }, '#b0602a', 0, -30, '#d9823a');
    x.beginPath(); for (let i = 0; i <= n * 2; i++) { const a = i / (n * 2) * TAU, r = i % 2 ? 470 : 390; i ? x.lineTo(500 + Math.cos(a) * r, 520 + Math.sin(a) * r * .95) : x.moveTo(500 + r, 520); } x.closePath(); sh(x, null, L1);
    for (const s of [-1, 1]) { circ(x, 500 + s * 210, 250, 80); sh(x, '#f3b54a', L2 * 1.2); circ(x, 500 + s * 210, 255, 40); x.fillStyle = '#e8925a'; x.fill(); }
    const face = () => ell(x, 500, 540, 280, 270);
    shaded(x, face, '#f6c25a', .88, 24, 20, L1);
    for (const s of [-1, 1]) { ell(x, 500 + s * 70, 680, 100, 80); sh(x, '#fff3dc', L2); }
    x.beginPath(); x.moveTo(440, 600); x.lineTo(560, 600); x.lineTo(500, 660); x.closePath(); sh(x, '#7a3a2a', L2);
    cuteEye(x, 400, 490, 38); cuteEye(x, 600, 490, 38);
    for (const s of [-1, 1]) for (const d of [-20, 20]) { x.beginPath(); x.moveTo(500 + s * 140, 690 + d); x.lineTo(500 + s * 250, 680 + d * 2); stroke(x, L2 * .8); }
  }),
  tiger: G(1, (x, L1, L2) => {
    for (const s of [-1, 1]) { circ(x, 500 + s * 270, 230, 110); sh(x, '#ff8c3a', L1); circ(x, 500 + s * 270, 240, 55); x.fillStyle = '#fff3dc'; x.fill(); }
    const face = () => ell(x, 500, 540, 400, 380);
    face(); x.fillStyle = '#ff8c3a'; x.fill();
    x.save(); face(); x.clip();
    x.fillStyle = shade('#ff8c3a', .85); ell(x, 530, 600, 400, 380); x.fill(); ell(x, 500, 520, 390, 370); x.fillStyle = '#ff8c3a'; x.fill();
    for (const s of [-1, 1]) { ell(x, 500 + s * 150, 720, 190, 150); x.fillStyle = '#fff3dc'; x.fill(); }
    x.fillStyle = INK;
    for (const s of [-1, 1]) for (const y of [440, 540, 640]) { x.beginPath(); x.moveTo(500 + s * 410, y); x.quadraticCurveTo(500 + s * 300, y - 10, 500 + s * 250, y + 30); x.quadraticCurveTo(500 + s * 320, y + 30, 500 + s * 410, y + 50); x.fill(); }
    for (const dx of [-60, 0, 60]) { x.beginPath(); x.moveTo(500 + dx - 22, 160); x.lineTo(500 + dx, 300 - Math.abs(dx)); x.lineTo(500 + dx + 22, 160); x.fill(); }
    x.restore(); face(); sh(x, null, L1);
    x.beginPath(); x.moveTo(440, 620); x.lineTo(560, 620); x.lineTo(500, 680); x.closePath(); sh(x, '#f59aa8', L2);
    cuteEye(x, 380, 480, 40); cuteEye(x, 620, 480, 40);
    smile(x, 450, 720, 50, L2); smile(x, 550, 720, 50, L2);
  }),
  elephant: G(1.2, (x, L1, L2) => {
    const E = '#a9b4c2';
    x.beginPath(); x.moveTo(1090, 430); x.quadraticCurveTo(1160, 560, 1130, 640); stroke(x, L2 * 1.3);
    for (const lx of [480, 620, 880, 1010]) { rr(x, lx - 70, 560, 140, 400, 50); sh(x, E, L2 * 1.3); for (const d of [-30, 0, 30]) dot(x, lx + d, 935, 14, '#fff'); }
    const body = () => ell(x, 760, 480, 380, 290);
    shaded(x, body, E, .85, 0, -40, L1);
    x.beginPath(); x.moveTo(170, 430); x.bezierCurveTo(60, 560, 60, 760, 140, 880); x.bezierCurveTo(200, 950, 270, 900, 230, 860); x.bezierCurveTo(180, 790, 200, 650, 290, 560); x.closePath(); sh(x, E, L1);
    for (let i = 0; i < 4; i++) line(x, [[130 + i * 10, 640 + i * 60], [190 + i * 5, 650 + i * 55]], L2 * .9, '#7f8a98');
    const head = () => circ(x, 290, 380, 230);
    shaded(x, head, E, .88, 24, 20, L1);
    const ear = () => { x.beginPath(); x.moveTo(420, 200); x.bezierCurveTo(700, 130, 720, 560, 450, 580); x.quadraticCurveTo(380, 400, 420, 200); x.closePath(); };
    shaded(x, ear, '#c3ccd8', .86, -30, 0, L1); x.save(); ear(); x.clip(); ell(x, 520, 380, 110, 150); x.fillStyle = '#f2c4cf'; x.fill(); x.restore(); ear(); sh(x, null, L1);
    x.beginPath(); x.moveTo(220, 520); x.quadraticCurveTo(140, 580, 100, 560); stroke(x, L1 * 1.8); stroke(x, L1, '#fffaf0');
    cuteEye(x, 250, 350, 34); cheeks(x, 260, 440, 70, 30);
  }),
  monkey: G(.95, (x, L1, L2) => {
    const B = '#8d5a31', T = '#f3cf9a';
    x.beginPath(); x.moveTo(640, 780); x.bezierCurveTo(900, 800, 900, 450, 780, 420); x.bezierCurveTo(700, 400, 700, 520, 760, 520); stroke(x, L2 * 3.2); stroke(x, L2 * 1.8, B);
    for (const s of [-1, 1]) { ell(x, 460 + s * 120, 900, 110, 70); sh(x, B, L1); ell(x, 460 + s * 140, 920, 60, 34); x.fillStyle = T; x.fill(); }
    const body = () => ell(x, 460, 720, 230, 220);
    shaded(x, body, B, .85, 24, 0, L1);
    ell(x, 460, 750, 140, 150); x.fillStyle = T; x.fill();
    for (const s of [-1, 1]) { ell(x, 460 + s * 290, 340, 100, 110); sh(x, B, L1); ell(x, 460 + s * 290, 345, 55, 62); x.fillStyle = T; x.fill(); }
    const head = () => circ(x, 460, 350, 260);
    shaded(x, head, B, .85, 24, 20, L1);
    x.beginPath(); x.moveTo(460, 260); x.bezierCurveTo(340, 130, 230, 260, 270, 360); x.bezierCurveTo(230, 520, 330, 590, 460, 590); x.bezierCurveTo(590, 590, 690, 520, 650, 360); x.bezierCurveTo(690, 260, 580, 130, 460, 260); x.closePath(); sh(x, T, L2);
    cuteEye(x, 380, 330, 38); cuteEye(x, 540, 330, 38);
    dot(x, 440, 440, 12); dot(x, 480, 440, 12); smile(x, 460, 490, 80, L2 * 1.3);
  }),
  giraffe: G(.62, (x, L1, L2) => {
    const Y = '#ffcf5a', S = '#c97a2a';
    for (const lx of [200, 260, 420, 480]) { rr(x, lx - 30, 700, 60, 270, 24); sh(x, Y, L2 * 1.2); rr(x, lx - 32, 935, 64, 40, 14); sh(x, '#6b4226', L2); }
    const all = () => { x.beginPath(); x.ellipse(340, 660, 220, 120, -.12, 0, TAU); x.moveTo(380, 180); x.lineTo(470, 160); x.lineTo(520, 600); x.lineTo(390, 620); x.closePath(); x.moveTo(450 + 150 * Math.cos(-.35), 150 + 150 * Math.sin(-.35)); x.ellipse(450, 150, 150, 80, -.35, 0, TAU); };
    all(); stroke(x, L1 * 2); all(); x.fillStyle = Y; x.fill();
    x.save(); all(); x.clip(); x.fillStyle = S;
    const R = mulberry(6); for (let i = 0; i < 26; i++) { blob(x, 160 + R() * 380, 220 + R() * 540, 34 + R() * 14, 30 + R() * 12, .25, i); x.fill(); }
    x.restore();
    for (const dx of [-30, 40]) { line(x, [[440 + dx, 90], [430 + dx, 20]], L2 * 1.4); dot(x, 430 + dx, 20, 26, '#8a5a2a'); }
    ell(x, 340, 110, 60, 28, -.6); sh(x, Y, L2);
    ell(x, 340, 200, 70, 50, -.35); sh(x, '#f3d6a0', L2);
    cuteEye(x, 460, 120, 26);
  }),
  zebra: horseArt(true),
};

// ================= art-key dispatcher =================
const giraffe = ANIMALS.giraffe; ANIMALS.giraffe = h => giraffe(h * 1.45);
setMonkey(ANIMALS.monkey);
const PICS = { ...BODY, ...TOYS, ...ANIMALS, ...MORE_PICS, ...B4_PICS, ...B5_PICS };
// art key → cut item: 'pen' | 'num:4' | 'balloon:#e8413a' | 'person:mum'
export function wordArt(key, h) {
  const i = key.indexOf(':'), k = i < 0 ? key : key.slice(0, i), arg = i < 0 ? '' : key.slice(i + 1);
  if (k === 'num') return numberCard(+arg, h);
  if (k === 'balloon') return balloon(arg, h);
  if (k === 'person') return person(FAM[arg], h);
  return (PICS[k] || WORD_ART[k])(h);
}

// ================= outdoor scenes =================
export function skyPage(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  const g = x.createLinearGradient(0, 0, 0, PH); g.addColorStop(0, th.sky || '#8fd0f3'); g.addColorStop(1, th.sky2 || '#dff3fb');
  x.fillStyle = g; x.fillRect(0, 0, PW, PH);
  x.save(); x.translate(PW * .8, PH * .22);
  for (let i = 0; i < 12; i++) { x.rotate(TAU / 12); rr(x, 150, -16, 70, 32, 16); x.fillStyle = '#ffd766'; x.fill(); }
  x.restore(); circ(x, PW * .8, PH * .22, 120); sh(x, '#ffd766', 8);
  for (const [cx, cy, s] of [[PW * .2, PH * .2, 1], [PW * .5, PH * .12, .7], [PW * .62, PH * .34, .55]]) { x.fillStyle = '#fff'; for (const [dx, dy, r] of [[-120, 20, 80], [-40, -20, 110], [60, 0, 95], [140, 30, 65]]) { circ(x, cx + dx * s, cy + dy * s, r * s); x.fill(); } }
  x.save(); x.beginPath(); x.rect(0, 0, PW, PH); x.clip();
  const R = mulberry(2); x.beginPath(); x.moveTo(0, PH); for (let i = 0; i <= 16; i++) x.lineTo(i / 16 * PW, PH * .62 - Math.sin(i * .9 + 1) * 60 - R() * 30); x.lineTo(PW, PH); x.closePath(); x.fillStyle = th.hill2 || '#a9dc8c'; x.fill();
  x.beginPath(); x.moveTo(0, PH); for (let i = 0; i <= 16; i++) x.lineTo(i / 16 * PW, PH * .74 - Math.sin(i * .7 + 3) * 40); x.lineTo(PW, PH); x.closePath(); x.fillStyle = th.hill || '#8fcf6c'; x.fill();
  if (th.trees) { const T = mulberry(5); for (let i = 0; i < 14; i++) { const tx = T() * PW, ty = PH * (.66 + T() * .08); x.fillStyle = '#6a5040'; x.fillRect(tx - 8, ty, 16, 60); circ(x, tx, ty - 20, 50 + T() * 30); x.fillStyle = T() > .5 ? '#5fae4a' : '#4e9a3c'; x.fill(); } }
  x.restore();
  grain(x); return c;
}
export function grassPage(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  paperFill(x, PW, PH, th.floor, 6);
  for (let j = 0; j < 9; j++) { x.fillStyle = j % 2 ? 'rgba(255,255,255,.08)' : 'rgba(0,60,0,.06)'; x.fillRect(0, j * PH / 9, PW, PH / 9); }
  const R = mulberry(11);
  for (let i = 0; i < 90; i++) { const fx = R() * PW, fy = R() * PH; x.strokeStyle = 'rgba(40,110,40,.35)'; x.lineWidth = 5; x.beginPath(); x.moveTo(fx, fy); x.lineTo(fx - 8, fy - 22); x.moveTo(fx, fy); x.lineTo(fx + 8, fy - 20); x.stroke(); }
  for (let i = 0; i < 30; i++) { const fx = R() * PW, fy = R() * PH * .5; for (let k = 0; k < 5; k++) { circ(x, fx + Math.cos(k / 5 * TAU) * 10, fy + Math.sin(k / 5 * TAU) * 10, 9); x.fillStyle = ['#fff', '#ffd766', '#f59aa8'][i % 3]; x.fill(); } circ(x, fx, fy, 7); x.fillStyle = '#ffb02e'; x.fill(); }
  x.beginPath(); x.ellipse(PW / 2, PH * .7, PW * .38, PH * .22, 0, 0, TAU); x.fillStyle = th.path || '#ecd3a0'; x.fill(); x.lineWidth = 10; x.strokeStyle = shade(th.path || '#ecd3a0', .85); x.stroke();
  for (let i = 0; i < 40; i++) { const a = R() * TAU, r = R(); circ(x, PW / 2 + Math.cos(a) * PW * .34 * r, PH * .7 + Math.sin(a) * PH * .19 * r, 6 + R() * 6); x.fillStyle = 'rgba(120,80,40,.18)'; x.fill(); }
  grain(x); return c;
}
export function barn(wm, hm, text) {
  return cut(wm, hm, (x, W, H) => {
    const s = H / 1000; x.save(); x.scale(s, s); const w = W / s, L1 = LW / s, L2 = LW2 / s;
    const body = () => { x.beginPath(); x.moveTo(w * .1, 1000); x.lineTo(w * .1, 400); x.lineTo(w * .5, 120); x.lineTo(w * .9, 400); x.lineTo(w * .9, 1000); x.closePath(); };
    shaded(x, body, '#d9443a', .82, 40, 0, L1);
    x.beginPath(); x.moveTo(w * .04, 440); x.lineTo(w * .5, 80); x.lineTo(w * .96, 440); stroke(x, L1 * 2.4); stroke(x, L1 * 1.4, '#7c3a2a');
    for (let i = 1; i < 8; i++) line(x, [[w * (.1 + i * .1), 420 + (i > 4 ? 0 : 0)], [w * (.1 + i * .1), 1000]], L2 * .8, '#b8342c');
    rr(x, w * .3, 560, w * .4, 440, 10); sh(x, '#b8342c', L1); x.strokeStyle = '#fff'; x.lineWidth = L1; x.beginPath(); x.rect(w * .3 + 20, 580, w * .4 - 40, 400); x.moveTo(w * .3 + 20, 580); x.lineTo(w * .7 - 20, 980); x.moveTo(w * .7 - 20, 580); x.lineTo(w * .3 + 20, 980); x.stroke();
    rr(x, w * .32, 300, w * .36, 180, 24); sh(x, '#fffaf0', L1);
    if (text) { let fs = 140; x.font = `${fs}px "Lilita One"`; while (x.measureText(text).width > w * .32) { fs -= 6; x.font = `${fs}px "Lilita One"`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#d9443a'; x.fillText(text, w * .5, 395); }
    x.restore();
  });
}
export function fence(wm, hm) {
  return cut(wm, hm, (x, W, H) => {
    const n = Math.round(W / (H * .5));
    for (const y of [.35, .7]) { rr(x, 0, H * y, W, H * .14, 8); sh(x, '#e8c38a', LW2 + 1); }
    for (let i = 0; i < n; i++) { const px = (i + .5) / n * W; x.beginPath(); x.moveTo(px - H * .12, H); x.lineTo(px - H * .12, H * .12); x.lineTo(px, 0); x.lineTo(px + H * .12, H * .12); x.lineTo(px + H * .12, H); x.closePath(); sh(x, '#fff4dc', LW2 + 1); }
  });
}
export function tree(hm, seed = 2) {
  return cut(hm * .75, hm, (x, W, H) => {
    rr(x, W * .42, H * .5, W * .16, H * .5, 10); sh(x, '#8d5a31', LW);
    const R = mulberry(seed), puffs = [[.5, .3, .3], [.28, .4, .22], [.72, .4, .22], [.4, .18, .2], [.62, .2, .2]];
    for (const [px, py, r] of puffs) { circ(x, W * px, H * py, W * r + 9); x.fillStyle = INK; x.fill(); }
    for (const [px, py, r] of puffs) { circ(x, W * px, H * py, W * r); x.fillStyle = '#5fae4a'; x.fill(); }
    for (const [px, py, r] of puffs) { circ(x, W * px - W * r * .25, H * py - W * r * .25, W * r * .5); x.fillStyle = '#78c45e'; x.fill(); }
    for (let i = 0; i < 6; i++) { circ(x, W * (.25 + R() * .5), H * (.15 + R() * .3), W * .035); sh(x, '#e8413a', 4); }
  });
}
export function hay(wm) {
  return cut(wm, wm * .6, (x, W, H) => {
    rr(x, 0, H * .1, W, H * .9, 30); sh(x, '#f2cf62', LW);
    x.strokeStyle = '#d6a93a'; x.lineWidth = 5; for (let i = 0; i < 14; i++) { x.beginPath(); x.moveTo(W * (.05 + i * .065), H * .2); x.lineTo(W * (.08 + i * .065), H * .95); x.stroke(); }
    for (const u of [.25, .75]) line(x, [[W * u, H * .1], [W * u, H]], LW2 + 3, '#b8342c');
  });
}
export function zooGate(wm, hm, text) {
  return cut(wm, hm, (x, W, H) => {
    for (const u of [.04, .84]) { rr(x, W * u, H * .2, W * .12, H * .8, 10); sh(x, '#c9a27a', LW); for (let k = 0; k < 5; k++) line(x, [[W * u, H * (.3 + k * .15)], [W * (u + .12), H * (.3 + k * .15)]], LW2, '#a07a52'); }
    for (let i = 0; i < 9; i++) line(x, [[W * (.2 + i * .075), H * .4], [W * (.2 + i * .075), H]], LW2 + 2, '#5a6a3a');
    line(x, [[W * .16, H * .55], [W * .84, H * .55]], LW2 + 2, '#5a6a3a');
    const board = () => { x.beginPath(); x.moveTo(0, H * .36); x.quadraticCurveTo(W / 2, -H * .05, W, H * .36); x.lineTo(W, H * .44); x.quadraticCurveTo(W / 2, H * .08, 0, H * .44); x.closePath(); };
    const sign = () => rr(x, W * .25, H * .02, W * .5, H * .26, 24);
    board(); sh(x, '#62c24c', LW);
    shaded(x, sign, '#ffc93c', .85, 0, -14, LW);
    if (text) { let fs = H * .2; x.font = `${fs}px "Lilita One"`; while (x.measureText(text).width > W * .44) { fs -= 4; x.font = `${fs}px "Lilita One"`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText(text, W / 2, H * .155); x.fillStyle = '#fff'; x.fillText(text, W / 2, H * .155); }
    for (const [u, c] of [[.12, '#e8413a'], [.88, '#3fa1de']]) { circ(x, W * u, H * .14, H * .07); sh(x, c, LW2); }
  });
}
export function palm(hm) {
  return cut(hm * .8, hm, (x, W, H) => {
    for (let i = 0; i < 8; i++) { const y = H * (.95 - i * .085), cx = W * (.5 + Math.sin(i * .35) * .06); rr(x, cx - W * .07, y - H * .09, W * .14, H * .1, 12); sh(x, i % 2 ? '#b48256' : '#c99668', LW2 + 1); }
    const top = [W * .55, H * .3];
    for (let i = 0; i < 6; i++) { const a = -Math.PI + i / 5 * Math.PI; x.save(); x.translate(...top); x.rotate(a * .9 + .1); x.beginPath(); x.moveTo(0, 0); x.quadraticCurveTo(W * .25, -H * .14, W * .45, H * .04); x.quadraticCurveTo(W * .22, -H * .02, 0, 0); x.closePath(); sh(x, i % 2 ? '#4ea83d' : '#62c24c', LW2 + 1); x.restore(); }
    for (const dx of [-1, 1]) { circ(x, top[0] + dx * W * .05, top[1] + H * .04, W * .05); sh(x, '#8d5a31', LW2); }
  });
}
export function rock(wm, hm) { return cut(wm, hm, (x, W, H) => { blob(x, W / 2, H * .6, W * .48, H * .5, .08, 3); sh(x, '#b9b2a6', LW); blob(x, W * .38, H * .45, W * .18, H * .14, .1, 5); x.fillStyle = 'rgba(255,255,255,.3)'; x.fill(); }); }
export function cloudCard(wm) {
  return cut(wm, wm * .55, (x, W, H) => {
    for (const [dx, dy, r] of [[.25, .62, .2], [.45, .45, .26], [.7, .55, .22], [.5, .7, .22]]) { circ(x, W * dx, H * dy, W * r + 9); x.fillStyle = INK; x.fill(); }
    for (const [dx, dy, r] of [[.25, .62, .2], [.45, .45, .26], [.7, .55, .22], [.5, .7, .22]]) { circ(x, W * dx, H * dy, W * r); x.fillStyle = '#fff'; x.fill(); }
  }, { ay: 0 });
}
