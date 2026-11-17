// Word pictures for lessons 13–16 (feelings, home, in/on/under, I can) and the living-room frame prop.
import { TAU } from './lib.js';
import { sh, blob, INK, rr } from './paper.js';
import { cut, LW, LW2, line, shine, shade, windowPane } from './art.js';
import { G, ell, circ, dot, stroke, shaded, cuteEye, smile, cheeks } from './draw.js';

const path = (x, pts) => { x.beginPath(); pts.forEach((p, i) => i ? x.lineTo(p[0], p[1]) : x.moveTo(p[0], p[1])); x.closePath(); };
const notes = (x, list, L2) => { for (const [nx, ny, s] of list) { ell(x, nx, ny, 40 * s, 30 * s, -.4); x.fillStyle = INK; x.fill(); line(x, [[nx + 36 * s, ny - 10 * s], [nx + 36 * s, ny - 150 * s], [nx + 90 * s, ny - 120 * s]], L2 * 1.2); } };

// ================= lesson 13: feelings =================
function face(col, fn) {
  return G(1, (x, L1, L2) => {
    const f = () => circ(x, 500, 520, 430);
    shaded(x, f, col, .86, 34, 26, L1);
    fn(x, L1, L2);
  });
}
const FEEL = {
  happy: face('#ffd23f', (x, L1, L2) => {
    for (const s of [-1, 1]) { x.beginPath(); x.arc(500 + s * 150, 470, 60, Math.PI * 1.1, Math.PI * 1.9); stroke(x, L2 * 1.6); }
    cheeks(x, 500, 580, 230, 55);
    x.beginPath(); x.moveTo(330, 600); x.quadraticCurveTo(500, 840, 670, 600); x.closePath(); sh(x, '#8a2a2a', L2 * 1.3);
    ell(x, 500, 720, 80, 40); x.fillStyle = '#f07a7a'; x.fill();
  }),
  sad: face('#8fc7ef', (x, L1, L2) => {
    for (const s of [-1, 1]) { cuteEye(x, 500 + s * 150, 480, 50); line(x, [[500 + s * 90, 360], [500 + s * 210, 390]], L2 * 1.4); }
    x.beginPath(); x.moveTo(380, 740); x.quadraticCurveTo(500, 640, 620, 740); stroke(x, L2 * 1.5);
    x.beginPath(); x.moveTo(680, 560); x.quadraticCurveTo(730, 640, 680, 670); x.quadraticCurveTo(630, 640, 680, 560); x.closePath(); sh(x, '#3fa1de', L2);
  }),
  angry: face('#f26b5b', (x, L1, L2) => {
    for (const s of [-1, 1]) { cuteEye(x, 500 + s * 150, 500, 44); line(x, [[500 + s * 230, 360], [500 + s * 80, 420]], L2 * 2.2); }
    rr(x, 360, 650, 280, 90, 30); sh(x, '#fff', L2 * 1.3); line(x, [[360, 695], [640, 695]], L2);
    for (const [px, py] of [[220, 200], [800, 220]]) { line(x, [[px - 40, py - 40], [px + 40, py + 40]], L2 * 1.6, '#b8342c'); line(x, [[px + 40, py - 40], [px - 40, py + 40]], L2 * 1.6, '#b8342c'); }
  }),
  tired: face('#c9b8ec', (x, L1, L2) => {
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(500 + s * 210, 490); x.quadraticCurveTo(500 + s * 150, 530, 500 + s * 90, 490); stroke(x, L2 * 1.6); }
    ell(x, 500, 680, 70, 90); sh(x, '#8a2a2a', L2 * 1.3);
    x.fillStyle = '#7a5ac0'; x.font = '150px "Lilita One"'; x.fillText('z', 700, 330); x.font = '110px "Lilita One"'; x.fillText('z', 800, 230);
  }),
  hungry: face('#ffb36a', (x, L1, L2) => {
    for (const s of [-1, 1]) cuteEye(x, 500 + s * 150, 470, 52);
    x.beginPath(); x.moveTo(370, 640); x.quadraticCurveTo(500, 780, 630, 640); stroke(x, L2 * 1.5);
    ell(x, 560, 720, 60, 80, -.3); sh(x, '#f07a7a', L2 * 1.2);
    x.beginPath(); x.moveTo(300, 690); x.quadraticCurveTo(320, 760, 300, 790); x.quadraticCurveTo(280, 760, 300, 690); x.closePath(); sh(x, '#bfe6f7', L2);
  }),
  scared: face('#b9e3a6', (x, L1, L2) => {
    for (const s of [-1, 1]) { circ(x, 500 + s * 150, 470, 85); sh(x, '#fff', L2 * 1.3); dot(x, 500 + s * 150, 480, 30); }
    x.beginPath(); x.moveTo(360, 700); for (let i = 1; i <= 6; i++) x.lineTo(360 + i * 47, 700 + (i % 2 ? -35 : 0)); stroke(x, L2 * 1.5);
    for (const [px, py] of [[180, 330], [830, 360]]) { x.beginPath(); x.moveTo(px, py - 60); x.quadraticCurveTo(px + 40, py, px, py + 30); x.quadraticCurveTo(px - 40, py, px, py - 60); x.closePath(); sh(x, '#7cc3ee', L2); }
  }),
};

// ================= lesson 14: my home =================
const HOME = {
  bed: G(1.35, (x, L1, L2) => {
    rr(x, 60, 150, 260, 820, 40); sh(x, '#b47a45', L1);
    rr(x, 1100, 480, 200, 490, 30); sh(x, '#b47a45', L1);
    rr(x, 160, 560, 1100, 220, 30); sh(x, '#fff', L1);
    ell(x, 360, 500, 150, 90); sh(x, '#fffaf0', L1);
    const q = () => { x.beginPath(); x.moveTo(480, 470); x.lineTo(1180, 470); x.quadraticCurveTo(1230, 470, 1230, 540); x.lineTo(1230, 760); x.lineTo(480, 760); x.closePath(); };
    shaded(x, q, '#3fa1de', .82, 0, -30, L1);
    for (let i = 0; i < 4; i++) for (let j = 0; j < 2; j++) dot(x, 580 + i * 170, 560 + j * 120, 26, '#ffd23f');
    rr(x, 160, 780, 1100, 70, 20); sh(x, '#8d5a31', L2);
  }),
  chair: G(.8, (x, L1, L2) => {
    for (const lx of [150, 620]) { rr(x, lx - 40, 100, 80, 880, 30); sh(x, '#c98a4a', L1); }
    for (const y of [180, 330]) { rr(x, 130, y, 540, 90, 20); sh(x, '#e0a65f', L2 * 1.2); }
    rr(x, 80, 560, 640, 110, 30); sh(x, '#e8413a', L1);
    rr(x, 600, 640, 70, 340, 26); sh(x, '#c98a4a', L1);
  }),
  table: G(1.3, (x, L1, L2) => {
    for (const lx of [200, 1100]) { rr(x, lx - 45, 420, 90, 560, 30); sh(x, '#b47a45', L1); }
    const top = () => rr(x, 60, 330, 1180, 120, 40);
    shaded(x, top, '#e0a65f', .82, 0, -24, L1);
    path(x, [[560, 330], [520, 120], [780, 120], [740, 330]]); sh(x, '#3fa1de', L2 * 1.3);
    for (const [fx, c] of [[580, '#e8413a'], [660, '#ffd23f'], [730, '#f59aa8']]) { line(x, [[650, 140], [fx, 30]], L2, '#3e8a30'); circ(x, fx, 30, 40); sh(x, c, L2); }
  }),
  sofa: G(1.5, (x, L1, L2) => {
    for (const lx of [200, 1300]) { rr(x, lx - 30, 860, 60, 120, 20); sh(x, '#7a4a2a', L2); }
    const back = () => rr(x, 160, 200, 1180, 450, 80);
    shaded(x, back, '#62c24c', .82, 0, -30, L1);
    for (const lx of [200, 750]) { rr(x, lx, 280, 530, 340, 60); sh(x, '#7fd168', L2 * 1.2); }
    rr(x, 160, 560, 1180, 320, 60); sh(x, '#4ea83d', L1);
    for (const ax of [40, 1260]) { rr(x, ax, 420, 200, 460, 90); sh(x, '#5fb84a', L1); }
    ell(x, 420, 470, 110, 90, -.3); sh(x, '#ffd23f', L2 * 1.2);
  }),
  lamp: G(.75, (x, L1, L2) => {
    path(x, [[200, 940], [550, 940], [500, 860], [250, 860]]); sh(x, '#9b6fd1', L1);
    rr(x, 340, 420, 70, 460, 30); sh(x, '#c9b8ec', L1);
    const s = () => path(x, [[170, 60], [580, 60], [700, 470], [50, 470]]);
    shaded(x, s, '#ffd766', .85, 0, -26, L1);
    for (let i = 0; i < 5; i++) dot(x, 160 + i * 110, 300 + (i % 2) * 60, 26, '#ffb02e');
  }),
  window: h => windowPane(h * .95, h),
};

// ================= lesson 15: in, on, under =================
// sitting cat, centred at (cx, cy) = middle of its body; s = scale (body about 600 units tall at s = 1)
function cat(x, cx, cy, s, L1, L2, o = {}) {
  const C = '#ffa94d', D = '#e07a2a';
  x.save(); x.translate(cx, cy); x.scale(s, s);
  if (!o.headOnly) {
    x.beginPath(); x.moveTo(160, 200); x.bezierCurveTo(380, 200, 380, -200, 250, -230); stroke(x, L1 * 2.6 / s); stroke(x, L1 * 1.4 / s, C);
    const b = () => ell(x, 0, 80, 210, 230);
    shaded(x, b, C, .86, 24, 0, L1 / s);
    for (const dx of [-90, 90]) { ell(x, dx, 290, 80, 40); sh(x, '#fff3e0', L2 / s); }
    ell(x, 0, 110, 110, 140); x.fillStyle = '#fff3e0'; x.fill();
  }
  for (const sd of [-1, 1]) { path(x, [[sd * 70, -260], [sd * 190, -390], [sd * 200, -220]]); sh(x, C, L2 * 1.2 / s); path(x, [[sd * 110, -270], [sd * 175, -345], [sd * 175, -250]]); x.fillStyle = '#f9b8c4'; x.fill(); }
  const h = () => ell(x, 0, -170, 210, 170);
  shaded(x, h, C, .88, 20, 16, L1 / s);
  for (const dx of [-120, 0, 120]) line(x, [[dx - 20, -330], [dx, -290]], L2 / s, D);
  cuteEye(x, -75, -180, 32); cuteEye(x, 75, -180, 32);
  path(x, [[-22, -110], [22, -110], [0, -85]]); x.fillStyle = '#e8413a'; x.fill();
  if (o.sing) { ell(x, 0, -50, 40, 46); sh(x, '#8a2a2a', L2 / s); } else smile(x, 0, -80, 34, L2 / s);
  for (const sd of [-1, 1]) for (const dy of [-10, 20]) line(x, [[sd * 120, -110 + dy], [sd * 250, -120 + dy * 2]], L2 * .7 / s);
  x.restore();
}
function box(x, x0, y0, w, h, L1, L2, open) {
  if (open) { path(x, [[x0, y0], [x0 - w * .18, y0 - h * .25], [x0 + w * .3, y0 - h * .25], [x0 + w * .45, y0]]); sh(x, '#c9935a', L1); path(x, [[x0 + w, y0], [x0 + w * 1.18, y0 - h * .25], [x0 + w * .7, y0 - h * .25], [x0 + w * .55, y0]]); sh(x, '#c9935a', L1); }
  const b = () => rr(x, x0, y0, w, h, 16);
  shaded(x, b, '#d9a066', .85, 30, 0, L1);
  if (!open) rr(x, x0 + w * .42, y0, w * .16, h * .5, 4), sh(x, '#f3e3b8', L2);
  line(x, [[x0 + w * .15, y0 + h * .7], [x0 + w * .4, y0 + h * .7]], L2, '#a8743e');
}
const SPOT = {
  cat: G(.9, (x, L1, L2) => cat(x, 420, 620, 1, L1, L2)),
  box: G(1.15, (x, L1, L2) => box(x, 110, 260, 930, 700, L1, L2, false)),
  in: G(1.1, (x, L1, L2) => {
    path(x, [[120, 430], [-20, 300], [420, 300], [530, 430]]); sh(x, '#c9935a', L1);
    cat(x, 550, 520, .9, L1, L2, { headOnly: true });
    for (const dx of [-110, 110]) { ell(x, 550 + dx, 470, 70, 46); sh(x, '#ffa94d', L2 * 1.2); }
    box(x, 120, 430, 860, 540, L1, L2, false);
  }),
  on: G(.85, (x, L1, L2) => { box(x, 60, 640, 730, 340, L1, L2, false); cat(x, 425, 400, .62, L1, L2); }),
  under: G(1.25, (x, L1, L2) => {
    for (const lx of [150, 1100]) { rr(x, lx - 40, 220, 80, 760, 30); sh(x, '#b47a45', L1); }
    cat(x, 625, 720, .55, L1, L2);
    const top = () => rr(x, 60, 130, 1130, 120, 40);
    shaded(x, top, '#e0a65f', .82, 0, -24, L1);
  }),
  behind: G(1.15, (x, L1, L2) => {
    x.save(); x.beginPath(); x.rect(0, 0, 2000, 470); x.clip(); cat(x, 575, 470, .85, L1, L2); x.restore();
    x.beginPath(); x.moveTo(1000, 900); x.bezierCurveTo(1150, 880, 1130, 560, 1060, 520); stroke(x, L1 * 2.6); stroke(x, L1 * 1.4, '#ffa94d');
    box(x, 110, 420, 930, 550, L1, L2, false);
  }),
};

// ================= lesson 16: I can =================
const pic = (x, item, cx, cy, h) => { const w = h * item.c.width / item.c.height; x.drawImage(item.c, cx - w / 2, cy - h / 2, w, h); };
let monkeyArt = null;
export function setMonkey(fn) { monkeyArt = fn; }
const CAN = {
  run: G(1.35, (x, L1, L2) => {
    for (const [y, l] of [[380, 220], [520, 300], [660, 200]]) line(x, [[60, y], [60 + l, y]], L2 * 1.6, '#9aa4b2');
    const B = '#c98a4a';
    x.beginPath(); x.moveTo(1050, 380); x.quadraticCurveTo(1250, 300, 1280, 160); stroke(x, L1 * 2.4); stroke(x, L1 * 1.2, B);
    for (const [lx, a] of [[520, .7], [600, .3], [960, -.5], [1040, -.9]]) { x.save(); x.translate(lx, 560); x.rotate(a); rr(x, -40, 0, 80, 320, 36); sh(x, B, L2 * 1.3); x.restore(); }
    const b = () => ell(x, 790, 480, 320, 160);
    shaded(x, b, B, .86, 0, -24, L1);
    const h = () => circ(x, 440, 330, 190);
    shaded(x, h, B, .86, 20, 16, L1);
    ell(x, 330, 410, 110, 80); sh(x, '#f3d3a3', L2 * 1.2); dot(x, 260, 380, 30);
    ell(x, 520, 260, 80, 150, .5); sh(x, '#7a4a2a', L2 * 1.2);
    cuteEye(x, 420, 300, 30);
    ell(x, 340, 500, 40, 60, .3); sh(x, '#f07a7a', L2);
  }),
  jump: G(1, (x, L1, L2) => {
    x.setLineDash([30, 40]); x.beginPath(); x.moveTo(60, 940); x.quadraticCurveTo(260, 380, 420, 560); stroke(x, L2 * 1.4, '#9aa4b2'); x.setLineDash([]);
    const G1 = '#62c24c';
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(600 + s * 120, 720); x.lineTo(600 + s * 300, 900); x.lineTo(600 + s * 380, 900); stroke(x, L1 * 2.4); stroke(x, L1 * 1.2, G1); }
    const b = () => ell(x, 600, 560, 260, 240);
    shaded(x, b, G1, .84, 24, 0, L1);
    ell(x, 600, 620, 160, 140); x.fillStyle = '#c9eeb0'; x.fill();
    for (const s of [-1, 1]) { circ(x, 600 + s * 130, 300, 95); sh(x, G1, L1); circ(x, 600 + s * 130, 300, 58); x.fillStyle = '#fff'; x.fill(); dot(x, 600 + s * 130, 310, 28); }
    smile(x, 600, 430, 110, L2 * 1.3); cheeks(x, 600, 470, 170, 36);
    for (const s of [-1, 1]) { x.beginPath(); x.moveTo(600 + s * 200, 560); x.lineTo(600 + s * 330, 420); stroke(x, L1 * 2.4); stroke(x, L1 * 1.2, G1); }
  }),
  swim: G(1.4, (x, L1, L2) => {
    for (const [bx, by, r] of [[300, 220, 40], [380, 120, 28], [230, 90, 20]]) { circ(x, bx, by, r); sh(x, '#e6f6fc', L2); }
    const B = '#3fa1de';
    path(x, [[1000, 450], [1240, 260], [1210, 450], [1240, 640]]); sh(x, '#2a78b3', L1);
    const b = () => ell(x, 680, 450, 360, 210);
    shaded(x, b, B, .84, 0, 24, L1);
    path(x, [[620, 260], [740, 150], [820, 270]]); sh(x, '#7cc3ee', L2 * 1.2);
    cuteEye(x, 450, 410, 40); smile(x, 400, 520, 34, L2 * 1.2);
    for (let i = 0; i < 2; i++) { x.beginPath(); for (let k = 0; k <= 14; k++) { const px = 40 + k * 95, py = 790 + i * 120 + Math.sin(k * 1.4 + i) * 30; k ? x.lineTo(px, py) : x.moveTo(px, py); } stroke(x, L1 * 2.2); stroke(x, L1 * 1.1, '#7cc3ee'); }
  }),
  fly: G(1.3, (x, L1, L2) => {
    const B = '#ff8c3a';
    path(x, [[260, 520], [60, 420], [80, 640]]); sh(x, '#e0782a', L1);
    path(x, [[560, 420], [380, 60], [800, 380]]); sh(x, '#ffb06a', L1);
    const b = () => ell(x, 600, 540, 340, 210);
    shaded(x, b, B, .86, 0, 26, L1);
    path(x, [[620, 520], [900, 860], [480, 600]]); sh(x, '#ffb06a', L1);
    path(x, [[920, 470], [1080, 520], [920, 570]]); sh(x, '#ffd23f', L2 * 1.2);
    cuteEye(x, 820, 470, 34); cheeks(x, 800, 560, 60, 30);
  }),
  climb: G(.8, (x, L1, L2) => {
    rr(x, 280, 0, 240, 1000, 40); sh(x, '#8d5a31', L1);
    for (const y of [180, 460, 760]) line(x, [[320, y], [400, y + 40]], L2, '#6b4226');
    x.beginPath(); x.moveTo(500, 260); x.quadraticCurveTo(650, 200, 760, 120); stroke(x, L1 * 3); stroke(x, L1 * 1.8, '#8d5a31');
    ell(x, 760, 110, 110, 70, -.5); sh(x, '#62c24c', L2 * 1.2);
    if (monkeyArt) pic(x, monkeyArt(.05), 380, 560, 760);
  }),
  sing: G(1.1, (x, L1, L2) => {
    notes(x, [[780, 300, 1], [960, 180, .8], [880, 560, .7]], L2);
    cat(x, 400, 600, .85, L1, L2, { sing: true });
  }),
};

export const B4_PICS = { ...FEEL, ...HOME, ...SPOT, ...CAN };

// big picture frame on the wall (living room), with a title
export const frame = (wm, hm, text) => cut(wm, hm, (x, W, H) => {
  rr(x, 0, 0, W, H, 18); sh(x, '#c98a4a', LW);
  rr(x, W * .07, H * .1, W * .86, H * .8, 8); sh(x, '#fffaf0', LW2 + 1);
  x.save(); x.beginPath(); x.rect(W * .07, H * .1, W * .86, H * .8); x.clip();
  x.fillStyle = '#bfe6f7'; x.fillRect(0, 0, W, H * .62); x.fillStyle = '#8fcf6c'; x.beginPath(); x.ellipse(W * .3, H * .9, W * .5, H * .3, 0, 0, TAU); x.fill(); x.beginPath(); x.ellipse(W * .8, H * .95, W * .45, H * .3, 0, 0, TAU); x.fillStyle = '#7cc45e'; x.fill();
  x.beginPath(); x.arc(W * .8, H * .28, H * .1, 0, TAU); x.fillStyle = '#ffd766'; x.fill(); x.restore();
  if (text) { let fs = H * .2; x.font = `${fs}px "Lilita One"`; while (x.measureText(text).width > W * .76) { fs -= 4; x.font = `${fs}px "Lilita One"`; } x.textAlign = 'center'; x.textBaseline = 'middle'; x.lineJoin = 'round'; x.lineWidth = 12; x.strokeStyle = INK; x.strokeText(text, W / 2, H * .4); x.fillStyle = '#fff'; x.fillText(text, W / 2, H * .4); }
});
