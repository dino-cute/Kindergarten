// Paper art for Pop-up English: Kiki, Momo, word cards, classroom props, page canvases.
// Every prop returns {c, w, h, ax, ay} (canvas + size in metres + anchor) for cutMesh.
import { mulberry, TAU } from './lib.js';
import { cv, finishCut, sh, blob, smoothOpen, crescent, paperFill, INK, GRAIN, rr } from './paper.js';

export const LW = 9, LW2 = 5;
export const PPM = 5200;
export function cut(wm, hm, draw, o = {}) {
  const pad = o.pad ?? 30, w = Math.ceil(wm * PPM) + pad * 2, h = Math.ceil(hm * PPM) + pad * 2;
  const c = cv(w, h), x = c.getContext('2d'); x.translate(pad, pad);
  draw(x, w - pad * 2, h - pad * 2);
  const out = o.raw ? c : finishCut(c, o.border ?? 14, o);
  return { c: out, w: w / PPM, h: h / PPM, ax: o.ax ?? .5, ay: o.ay ?? 1 - pad / h, pad };
}
export const line = (x, pts, lw = LW2, col = INK) => { x.beginPath(); x.moveTo(...pts[0]); for (const p of pts.slice(1)) x.lineTo(...p); x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.lineJoin = 'round'; x.stroke(); };
export const shine = (x, cx, cy, rx, ry, rot = -.5, a = .38) => { x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); x.fillStyle = `rgba(255,255,255,${a})`; x.fill(); };

// ================= characters =================
// pose: {mouth: 0..1 (open amount), eyes: 'open'|'happy'|'closed', blink: 0..1, armL, armR (radians, 0 = down), tilt}
export const CH_W = 900, CH_H = 1200;

function eye(x, ex, ey, p, s = 1) {
  const { eyes = 'open', blink = 0 } = p;
  if (eyes === 'happy') { x.beginPath(); x.moveTo(ex - 28 * s, ey + 8); x.quadraticCurveTo(ex, ey - 40 * s, ex + 28 * s, ey + 8); x.lineWidth = 12; x.strokeStyle = INK; x.lineCap = 'round'; x.stroke(); return; }
  if (eyes === 'closed' || blink > .8) { x.beginPath(); x.moveTo(ex - 26 * s, ey + 2); x.quadraticCurveTo(ex, ey + 16, ex + 26 * s, ey + 2); x.lineWidth = 11; x.strokeStyle = INK; x.lineCap = 'round'; x.stroke(); return; }
  const ry = 46 * s, rx = 27 * s;
  x.beginPath(); x.ellipse(ex, ey, rx, ry, 0, 0, TAU); x.fillStyle = INK; x.fill();
  x.beginPath(); x.ellipse(ex - 8 * s, ey - ry * .4, 9 * s, 14 * s, -.2, 0, TAU); x.fillStyle = '#fff'; x.fill();
  x.beginPath(); x.ellipse(ex + 7 * s, ey + ry * .45, 5 * s, 6 * s, 0, 0, TAU); x.fill();
}
function mouthShape(x, mx, my, open, w = 36) {
  x.lineCap = 'round'; x.strokeStyle = INK;
  if (open < .15) { x.beginPath(); x.moveTo(mx - w, my - 4); x.quadraticCurveTo(mx, my + w * .9, mx + w, my - 4); x.lineWidth = 9; x.stroke(); return; }
  const h = 18 + open * 46;
  x.beginPath(); x.moveTo(mx - w * 1.05, my - 8); x.quadraticCurveTo(mx, my + h * 1.6, mx + w * 1.05, my - 8); x.quadraticCurveTo(mx, my + 4, mx - w * 1.05, my - 8); x.closePath();
  sh(x, '#8a2a2a', 7);
  x.save(); x.clip(); x.beginPath(); x.ellipse(mx, my + h * .95, w * .55, h * .4, 0, 0, TAU); x.fillStyle = '#f07a7a'; x.fill(); x.restore();
}
function arm(x, sx, sy, ang, len, sleeve, hand, side) {
  x.save(); x.translate(sx, sy); x.rotate(ang * side);
  rr(x, -21, -10, 42, len, 21); sh(x, sleeve, LW2 + 1);
  x.beginPath(); x.arc(0, len + 4, 30, 0, TAU); sh(x, hand, LW2 + 1);
  x.restore();
}

export function drawKiki(x, p = {}) {
  const { armL = .15, armR = .15, mouth = 0, tilt = 0 } = p;
  x.clearRect(0, 0, CH_W, CH_H);
  const a = cv(CH_W, CH_H).getContext('2d');
  a.save(); a.translate(450, 1150); a.rotate(tilt); a.translate(-450, -1150);
  const SKIN = '#ffe0bf', SKIN_S = '#f2bf95', HAIR = '#4a2c22', HAIR_S = '#33201a', DRESS = '#ffc93c', DRESS_S = '#e9a91f', SHIRT = '#ffffff';
  // legs + shoes
  for (const lx of [395, 505]) { rr(a, lx - 20, 960, 40, 140, 18); sh(a, SKIN, LW2 + 1); blob(a, lx + (lx < 450 ? -10 : 10), 1110, 50, 28, .03, 4); sh(a, '#e8413a', LW2 + 2); shine(a, lx + (lx < 450 ? -18 : 2), 1100, 16, 7, 0, .4); }
  // arms (behind the dress)
  arm(a, 360, 760, armL, 190, SHIRT, SKIN, 1);
  arm(a, 540, 760, -armR, 190, SHIRT, SKIN, 1);
  // dress
  const dress = () => { a.beginPath(); a.moveTo(370, 740); a.bezierCurveTo(350, 820, 300, 930, 285, 990); a.quadraticCurveTo(450, 1030, 615, 990); a.bezierCurveTo(600, 930, 550, 820, 530, 740); a.quadraticCurveTo(450, 715, 370, 740); a.closePath(); };
  crescent(a, dress, DRESS_S, 28, 0, DRESS); dress(); sh(a, null, LW);
  // collar + pocket
  a.beginPath(); a.moveTo(400, 738); a.quadraticCurveTo(450, 790, 500, 738); sh(a, SHIRT, LW2);
  rr(a, 415, 880, 70, 56, 14); sh(a, '#ffe28a', LW2); line(a, [[415, 900], [485, 900]], 4, DRESS_S);
  // back hair
  blob(a, 450, 470, 280, 270, .03, 11); sh(a, HAIR, LW);
  // head
  const head = () => { a.beginPath(); a.ellipse(450, 500, 230, 215, 0, 0, TAU); };
  crescent(a, head, SKIN_S, 30, 24, SKIN); head(); sh(a, null, LW + 1);
  // fringe
  const fringe = () => { a.beginPath(); a.moveTo(222, 470); a.bezierCurveTo(230, 300, 380, 250, 470, 262); a.bezierCurveTo(600, 270, 690, 350, 680, 470); a.quadraticCurveTo(620, 400, 560, 410); a.quadraticCurveTo(520, 350, 470, 395); a.quadraticCurveTo(400, 340, 330, 420); a.quadraticCurveTo(270, 400, 222, 470); a.closePath(); };
  crescent(a, fringe, HAIR_S, 20, 18, HAIR); fringe(); sh(a, null, LW);
  shine(a, 380, 310, 50, 16, -.3, .25);
  // bow
  a.save(); a.translate(630, 290); a.rotate(.35);
  for (const s of [-1, 1]) { a.beginPath(); a.moveTo(0, 0); a.bezierCurveTo(s * 70, -70, s * 130, -40, s * 120, 10); a.bezierCurveTo(s * 120, 60, s * 60, 50, 0, 0); a.closePath(); sh(a, '#e8413a', LW2 + 1); }
  a.beginPath(); a.arc(0, 0, 28, 0, TAU); sh(a, '#c92f2a', LW2 + 1); a.restore();
  // face
  a.beginPath(); a.ellipse(330, 590, 40, 24, 0, 0, TAU); a.ellipse(570, 590, 40, 24, 0, 0, TAU); a.fillStyle = 'rgba(255,120,120,.42)'; a.fill();
  eye(a, 380, 520, p); eye(a, 520, 520, p);
  mouthShape(a, 450, 615, mouth, 32);
  a.restore();
  x.drawImage(finishCut(a.canvas, 16), 0, 0);
}

export function drawMomo(x, p = {}) {
  const { armL = .2, armR = .2, mouth = 0, tilt = 0 } = p;
  x.clearRect(0, 0, CH_W, CH_H);
  const a = cv(CH_W, CH_H).getContext('2d');
  a.save(); a.translate(450, 1150); a.rotate(tilt); a.translate(-450, -1150);
  const FUR = '#b97a4a', FUR_S = '#93593a', TAN = '#f1d2a6', BAG = '#3fa1de';
  // feet
  for (const lx of [380, 520]) { blob(a, lx, 1100, 66, 44, .04, lx); sh(a, FUR, LW); blob(a, lx, 1104, 34, 22, .05, lx + 3); a.fillStyle = TAN; a.fill(); }
  // backpack straps behind arms; the bag peeks out on both sides
  rr(a, 255, 700, 390, 300, 60); sh(a, BAG, LW);
  // body
  const body = () => blob(a, 450, 880, 205, 230, .03, 21);
  crescent(a, body, FUR_S, 30, 0, FUR); body(); sh(a, null, LW);
  blob(a, 450, 920, 120, 140, .04, 9); a.fillStyle = TAN; a.fill();
  // straps
  for (const s of [-1, 1]) { a.beginPath(); a.moveTo(450 + s * 120, 690); a.quadraticCurveTo(450 + s * 150, 820, 450 + s * 175, 960); a.lineWidth = 30; a.strokeStyle = INK; a.lineCap = 'round'; a.stroke(); a.lineWidth = 20; a.strokeStyle = '#2a78b3'; a.stroke(); }
  // arms
  arm(a, 285, 760, armL, 170, FUR, FUR, 1);
  arm(a, 615, 760, -armR, 170, FUR, FUR, 1);
  // ears
  for (const s of [-1, 1]) { a.beginPath(); a.arc(450 + s * 180, 310, 82, 0, TAU); sh(a, FUR, LW); a.beginPath(); a.arc(450 + s * 180, 316, 44, 0, TAU); a.fillStyle = TAN; a.fill(); }
  // head
  const head = () => blob(a, 450, 500, 240, 215, .025, 5);
  crescent(a, head, FUR_S, 30, 24, FUR); head(); sh(a, null, LW + 1);
  // muzzle
  blob(a, 450, 595, 110, 82, .03, 8); sh(a, TAN, LW2 + 1);
  a.beginPath(); a.ellipse(450, 555, 40, 26, 0, 0, TAU); sh(a, INK, 0); shine(a, 438, 548, 14, 7, 0, .5);
  a.beginPath(); a.ellipse(325, 575, 38, 22, 0, 0, TAU); a.ellipse(575, 575, 38, 22, 0, 0, TAU); a.fillStyle = 'rgba(255,110,100,.4)'; a.fill();
  eye(a, 370, 470, p, .9); eye(a, 530, 470, p, .9);
  mouthShape(a, 450, 618, mouth, 30);
  a.restore();
  x.drawImage(finishCut(a.canvas, 16), 0, 0);
}

// ================= word cards =================
// each word: (h metres) => cut item; the drawings fill a square-ish card
export const WORD_ART = {
  bag: h => cut(h * .95, h, (x, W, H) => {
    const B = '#e8413a', S = '#bf2e28';
    x.beginPath(); x.moveTo(W * .35, H * .18); x.bezierCurveTo(W * .35, -H * .02, W * .65, -H * .02, W * .65, H * .18); x.lineWidth = 34; x.strokeStyle = INK; x.stroke(); x.lineWidth = 22; x.strokeStyle = S; x.stroke();
    const body = () => { x.beginPath(); x.roundRect(W * .1, H * .14, W * .8, H * .84, 70); };
    crescent(x, body, S, 34, 0, B); body(); sh(x, null, LW);
    const flap = () => { x.beginPath(); x.moveTo(W * .1 + 10, H * .5); x.lineTo(W * .1 + 10, H * .28); x.quadraticCurveTo(W * .5, H * .1, W * .9 - 10, H * .28); x.lineTo(W * .9 - 10, H * .5); x.quadraticCurveTo(W * .5, H * .6, W * .1 + 10, H * .5); x.closePath(); };
    crescent(x, flap, '#d23a33', 0, 18, '#f25a50'); flap(); sh(x, null, LW2 + 1);
    rr(x, W * .44, H * .47, W * .12, H * .1, 10); sh(x, '#ffd23f', LW2);
    rr(x, W * .25, H * .68, W * .5, H * .22, 30); sh(x, '#f25a50', LW2);
    line(x, [[W * .3, H * .74], [W * .7, H * .74]], 5, S);
    shine(x, W * .25, H * .3, 30, 14);
  }),
  book: h => cut(h * 1.15, h, (x, W, H) => {
    // a book standing open like a V, seen from the front
    const L = () => { x.beginPath(); x.moveTo(W * .5, H * .2); x.quadraticCurveTo(W * .3, H * .08, W * .04, H * .14); x.lineTo(W * .04, H * .9); x.quadraticCurveTo(W * .3, H * .84, W * .5, H * .96); x.closePath(); };
    const R = () => { x.beginPath(); x.moveTo(W * .5, H * .2); x.quadraticCurveTo(W * .7, H * .08, W * .96, H * .14); x.lineTo(W * .96, H * .9); x.quadraticCurveTo(W * .7, H * .84, W * .5, H * .96); x.closePath(); };
    x.save(); x.translate(0, 16); L(); sh(x, '#e8413a', LW); R(); sh(x, '#e8413a', LW); x.restore();
    crescent(x, L, '#efe3c8', 24, 0, '#fffaf0'); L(); sh(x, null, LW);
    crescent(x, R, '#efe3c8', -24, 0, '#fffaf0'); R(); sh(x, null, LW);
    x.strokeStyle = '#b9a98c'; x.lineWidth = 7; x.lineCap = 'round';
    for (let i = 0; i < 5; i++) { const y = H * (.3 + i * .12); x.beginPath(); x.moveTo(W * .1, y - H * .02); x.quadraticCurveTo(W * .28, y - H * .06, W * .44, y + H * .02); x.stroke(); x.beginPath(); x.moveTo(W * .56, y + H * .02); x.quadraticCurveTo(W * .72, y - H * .06, W * .9, y - H * .02); x.stroke(); }
    // a little red apple picture on the right page
    x.beginPath(); x.arc(W * .74, H * .58, H * .09, 0, TAU); sh(x, '#e8413a', LW2);
    line(x, [[W * .74, H * .49], [W * .76, H * .44]], 6);
  }),
  pen: h => cut(h * .45, h, (x, W, H) => {
    x.save(); x.translate(W / 2, H / 2); x.rotate(.38); x.translate(-W / 2, -H / 2);
    const cx = W / 2, bw = W * .34;
    const body = () => { x.beginPath(); x.roundRect(cx - bw / 2, H * .12, bw, H * .62, 22); };
    crescent(x, body, '#2a78b3', 18, 0, '#3fa1de'); body(); sh(x, null, LW);
    x.beginPath(); x.moveTo(cx - bw / 2 + 4, H * .74); x.lineTo(cx + bw / 2 - 4, H * .74); x.lineTo(cx, H * .98); x.closePath(); sh(x, '#d6d0c4', LW);
    line(x, [[cx, H * .82], [cx, H * .93]], 5);
    rr(x, cx - bw / 2 - 6, H * .02, bw + 12, H * .26, 24); sh(x, '#1f5f93', LW);
    rr(x, cx + bw / 2 - 2, H * .06, 16, H * .3, 8); sh(x, '#ffd23f', LW2);
    shine(x, cx - bw * .2, H * .45, 8, 60, 0, .4);
    x.restore();
  }),
  pencil: h => cut(h * .45, h, (x, W, H) => {
    x.save(); x.translate(W / 2, H / 2); x.rotate(-.38); x.translate(-W / 2, -H / 2);
    const cx = W / 2, bw = W * .34;
    const body = () => { x.beginPath(); x.rect(cx - bw / 2, H * .16, bw, H * .6); };
    crescent(x, body, '#e9a91f', 20, 0, '#ffc93c'); body(); sh(x, null, LW);
    line(x, [[cx, H * .17], [cx, H * .75]], 5, '#e9a91f');
    x.beginPath(); x.moveTo(cx - bw / 2, H * .76); x.lineTo(cx + bw / 2, H * .76); x.lineTo(cx, H * .99); x.closePath(); sh(x, '#f3d3a3', LW);
    x.beginPath(); x.moveTo(cx - bw * .16, H * .92); x.lineTo(cx + bw * .16, H * .92); x.lineTo(cx, H * .99); x.closePath(); sh(x, INK, 4);
    rr(x, cx - bw / 2, H * .08, bw, H * .09, 4); sh(x, '#c9c2b0', LW2);
    rr(x, cx - bw / 2, H * .0, bw, H * .1, 16); sh(x, '#f59aa8', LW2);
    x.restore();
  }),
  ruler: h => cut(h * 1.15, h * .6, (x, W, H) => {
    x.save(); x.translate(W / 2, H / 2); x.rotate(-.12); x.translate(-W / 2, -H / 2);
    const body = () => { x.beginPath(); x.roundRect(W * .03, H * .25, W * .94, H * .5, 12); };
    crescent(x, body, '#d8a96a', 0, 22, '#f3cf92'); body(); sh(x, null, LW);
    x.strokeStyle = INK; x.lineCap = 'round';
    for (let i = 0; i <= 20; i++) { const px = W * (.07 + i * .043), l = i % 5 === 0 ? H * .18 : H * .09; x.lineWidth = i % 5 === 0 ? 6 : 4; x.beginPath(); x.moveTo(px, H * .25 + 6); x.lineTo(px, H * .25 + 6 + l); x.stroke(); }
    x.fillStyle = INK; x.font = `700 ${H * .16}px Fredoka`; x.textAlign = 'center';
    for (let i = 0; i <= 4; i++) x.fillText(String(i), W * (.07 + i * 5 * .043), H * .66);
    x.restore();
  }),
  eraser: h => cut(h * 1.0, h * .7, (x, W, H) => {
    const top = () => { x.beginPath(); x.moveTo(W * .12, H * .3); x.lineTo(W * .62, H * .12); x.lineTo(W * .92, H * .3); x.lineTo(W * .42, H * .5); x.closePath(); };
    const front = () => { x.beginPath(); x.moveTo(W * .12, H * .3); x.lineTo(W * .42, H * .5); x.lineTo(W * .42, H * .92); x.lineTo(W * .1, H * .7); x.closePath(); };
    const side = () => { x.beginPath(); x.moveTo(W * .42, H * .5); x.lineTo(W * .92, H * .3); x.lineTo(W * .92, H * .72); x.lineTo(W * .42, H * .92); x.closePath(); };
    side(); sh(x, '#e87a8f', LW); front(); sh(x, '#f59aa8', LW); top(); sh(x, '#ffc0cb', LW);
    // paper sleeve
    x.save(); side(); x.clip(); x.beginPath(); x.rect(W * .58, 0, W * .5, H); x.fillStyle = '#3fa1de'; x.fill(); x.restore();
    x.save(); top(); x.clip(); x.beginPath(); x.moveTo(W * .58, 0); x.lineTo(W, 0); x.lineTo(W, H); x.lineTo(W * .58, H * .44); x.closePath(); x.fillStyle = '#7cc3ee'; x.fill(); x.restore();
    side(); sh(x, null, LW); top(); sh(x, null, LW);
    line(x, [[W * .58, H * .44], [W * .58, H * .85]], LW2);
    // cute face on the front
    x.fillStyle = INK; x.beginPath(); x.arc(W * .22, H * .56, 8, 0, TAU); x.arc(W * .32, H * .62, 8, 0, TAU); x.fill();
    x.beginPath(); x.moveTo(W * .23, H * .68); x.quadraticCurveTo(W * .27, H * .74, W * .31, H * .72); x.lineWidth = 5; x.strokeStyle = INK; x.stroke();
  }),
};

// ================= classroom props =================
export function blackboard(wm, hm, text) {
  return cut(wm, hm, (x, W, H) => {
    rr(x, W * .12, H * .78, 26, H * .22, 6); sh(x, '#8d5a31', LW2 + 1); rr(x, W * .88 - 26, H * .78, 26, H * .22, 6); sh(x, '#8d5a31', LW2 + 1);
    rr(x, 0, 0, W, H * .82, 22); sh(x, '#b47a45', LW);
    const board = () => { x.beginPath(); x.roundRect(W * .035, H * .05, W * .93, H * .68, 10); };
    crescent(x, board, '#2b5e48', 0, -30, '#356f55'); board(); sh(x, null, LW2);
    x.fillStyle = 'rgba(255,255,255,.08)'; for (let i = 0; i < 7; i++) { x.beginPath(); x.ellipse(W * (.15 + i * .12), H * (.3 + (i % 3) * .1), 60, 20, -.2, 0, TAU); x.fill(); }
    if (text) { x.font = `600 ${H * .22}px Fredoka`; x.textAlign = 'center'; x.textBaseline = 'middle'; x.fillStyle = '#fffbea'; x.fillText(text, W / 2, H * .38); }
    rr(x, W * .2, H * .72, W * .6, 18, 6); sh(x, '#8d5a31', 4);
    rr(x, W * .62, H * .7, 60, 16, 5); sh(x, '#ffffff', 3);
  });
}
export function smallDesk(wm, hm) {
  return cut(wm, hm, (x, W, H) => {
    for (const u of [.12, .82]) { rr(x, W * u, H * .3, W * .06, H * .7, 6); sh(x, '#b47a45', LW2 + 1); }
    const top = () => { x.beginPath(); x.roundRect(0, H * .16, W, H * .2, 12); };
    crescent(x, top, '#d39a5c', 0, -16, '#e8b77a'); top(); sh(x, null, LW);
  });
}
export function pottedPlant(hm, seed = 3) {
  return cut(hm * .7, hm, (x, W, H) => {
    const R = mulberry(seed);
    for (let i = 0; i < 7; i++) { const a = -Math.PI / 2 + (i - 3) * .32, l = H * (.45 + R() * .2); x.save(); x.translate(W / 2, H * .62); x.rotate(a + Math.PI / 2); x.beginPath(); x.ellipse(0, -l / 2, W * .1, l / 2, 0, 0, TAU); sh(x, i % 2 ? '#62c24c' : '#4ea83d', LW2 + 1); line(x, [[0, -6], [0, -l + 16]], 4, '#3e8a30'); x.restore(); }
    const pot = () => { x.beginPath(); x.moveTo(W * .2, H * .6); x.lineTo(W * .8, H * .6); x.lineTo(W * .7, H); x.lineTo(W * .3, H); x.closePath(); };
    crescent(x, pot, '#c9603a', 20, 0, '#e87a4f'); pot(); sh(x, null, LW);
    rr(x, W * .15, H * .56, W * .7, H * .1, 10); sh(x, '#e87a4f', LW2 + 1);
  });
}
export function bookshelf(wm, hm) {
  return cut(wm, hm, (x, W, H) => {
    rr(x, 0, 0, W, H, 14); sh(x, '#b47a45', LW);
    const cols = ['#e8413a', '#3fa1de', '#ffc93c', '#62c24c', '#f59aa8', '#9b6fd1'], R = mulberry(4);
    for (let r = 0; r < 3; r++) {
      const y0 = H * (.06 + r * .31), y1 = y0 + H * .27;
      rr(x, W * .05, y0, W * .9, y1 - y0, 6); sh(x, '#7c4f2a', LW2);
      let px = W * .08;
      while (px < W * .86) { const bw = W * (.07 + R() * .05), bh = (y1 - y0) * (.7 + R() * .28); if (px + bw > W * .92) break; rr(x, px, y1 - bh, bw, bh, 4); sh(x, cols[(R() * cols.length) | 0], 4); px += bw + 4; }
    }
  });
}
export function windowPane(wm, hm) {
  return cut(wm, hm, (x, W, H) => {
    rr(x, 0, 0, W, H, 16); sh(x, '#fffaf0', LW);
    const g = x.createLinearGradient(0, 0, 0, H); g.addColorStop(0, '#7cc6ef'); g.addColorStop(1, '#c9ecf7');
    x.beginPath(); x.roundRect(W * .08, H * .08, W * .84, H * .84, 8); x.fillStyle = g; x.fill(); sh(x, null, LW2);
    x.beginPath(); x.arc(W * .7, H * .32, W * .12, 0, TAU); sh(x, '#ffd766', LW2);
    x.beginPath(); x.ellipse(W * .32, H * .6, W * .16, H * .07, 0, 0, TAU); x.fillStyle = '#fff'; x.fill();
    line(x, [[W / 2, H * .08], [W / 2, H * .92]], LW2 + 4, '#fffaf0'); line(x, [[W * .08, H / 2], [W * .92, H / 2]], LW2 + 4, '#fffaf0');
  });
}
export function clockCard(rm) {
  return cut(rm * 2, rm * 2, (x, W, H) => {
    x.beginPath(); x.arc(W / 2, H / 2, W / 2 - 6, 0, TAU); sh(x, '#e8413a', LW);
    x.beginPath(); x.arc(W / 2, H / 2, W / 2 - 34, 0, TAU); sh(x, '#fffaf0', LW2);
    for (let i = 0; i < 12; i++) { const a = i / 12 * TAU; line(x, [[W / 2 + Math.cos(a) * (W / 2 - 50), H / 2 + Math.sin(a) * (W / 2 - 50)], [W / 2 + Math.cos(a) * (W / 2 - 62), H / 2 + Math.sin(a) * (W / 2 - 62)]], 5); }
    line(x, [[W / 2, H / 2], [W / 2, H * .24]], 8); line(x, [[W / 2, H / 2], [W * .68, H / 2]], 8);
  }, { ay: .5 });
}
// word sign hanging on two strings: english big, chinese small
export function wordSign(wm, en, zh) {
  return cut(wm, wm * .5, (x, W, H) => {
    const b = () => { x.beginPath(); x.roundRect(0, 0, W, H, 34); };
    crescent(x, b, '#efe3c8', 0, -18, '#fffaf0'); b(); sh(x, null, LW);
    x.textAlign = 'center'; x.textBaseline = 'alphabetic';
    let fs = H * .52; x.font = `${fs}px "Lilita One"`; while (x.measureText(en).width > W * .86) { fs -= 6; x.font = `${fs}px "Lilita One"`; }
    x.lineJoin = 'round'; x.lineWidth = 16; x.strokeStyle = INK; x.strokeText(en, W / 2, H * .6); x.fillStyle = '#ffcf3f'; x.fillText(en, W / 2, H * .6);
    x.font = `${H * .2}px "ZCOOL KuaiLe"`; x.fillStyle = '#7a5e4c'; x.fillText(zh, W / 2, H * .88);
  }, { ay: 0 });
}

// ================= page canvases =================
export const PW = 2048, PH = Math.round(2048 * .30 / .44);
export function grain(x) { x.save(); x.globalAlpha = .7; x.fillStyle = x.createPattern(GRAIN, 'repeat'); x.fillRect(0, 0, PW, PH); x.restore(); }
export function wallPage(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  paperFill(x, PW, PH, th.wall, 3);
  // wallpaper stripes (or kitchen tiles) + dado rail
  if (th.tiles) { const n = 32, t = PW / n; for (let i = 0; i < n; i++) for (let j = 0; j * t < PH; j++) { x.fillStyle = (i + j) % 2 ? 'rgba(255,255,255,.35)' : 'rgba(255,255,255,.12)'; x.fillRect(i * t + 2, j * t + 2, t - 4, t - 4); } }
  else for (let i = 0; i < 26; i++) { x.fillStyle = i % 2 ? 'rgba(255,255,255,.18)' : 'rgba(230,180,80,.12)'; x.fillRect(i * PW / 26, 0, PW / 26, PH); }
  x.fillStyle = th.wall2; x.fillRect(0, PH * .74, PW, PH * .26);
  x.fillStyle = 'rgba(255,255,255,.5)'; x.fillRect(0, PH * .735, PW, 14);
  // bunting
  if (th.bunting === false) { grain(x); return c; }
  const cols = ['#e8413a', '#3fa1de', '#ffc93c', '#62c24c', '#f59aa8'];
  x.strokeStyle = INK; x.lineWidth = 5; x.beginPath(); x.moveTo(0, PH * .06); x.quadraticCurveTo(PW / 2, PH * .2, PW, PH * .06); x.stroke();
  for (let i = 1; i < 16; i++) { const u = i / 16, px = u * PW, py = PH * .06 + Math.sin(u * Math.PI) * PH * .14 * .5 * 2 * (1 - Math.abs(u - .5)) ; const yy = PH * .06 + 4 * u * (1 - u) * PH * .07; x.beginPath(); x.moveTo(px - 34, yy); x.lineTo(px + 34, yy); x.lineTo(px, yy + 80); x.closePath(); sh(x, cols[i % cols.length], 4); }
  grain(x); return c;
}
export function floorPage(th) {
  const c = cv(PW, PH), x = c.getContext('2d');
  paperFill(x, PW, PH, th.floor, 5);
  // a rug of big squares (gz from far to near)
  const n = 8;
  for (let i = 0; i < n; i++) for (let j = 0; j < 5; j++) if ((i + j) % 2) { x.fillStyle = th.floor2; x.fillRect(i * PW / n, j * PH / 5, PW / n, PH / 5); }
  x.fillStyle = 'rgba(255,255,255,.18)'; for (let j = 1; j < 5; j++) x.fillRect(0, j * PH / 5 - 3, PW, 6);
  // round reading rug in front
  x.beginPath(); x.ellipse(PW / 2, PH * .7, PW * .36, PH * .22, 0, 0, TAU); x.fillStyle = '#ffe9a8'; x.fill(); x.lineWidth = 10; x.strokeStyle = '#f6c35a'; x.stroke();
  x.setLineDash([22, 18]); x.lineWidth = 6; x.strokeStyle = '#e8413a'; x.beginPath(); x.ellipse(PW / 2, PH * .7, PW * .33, PH * .19, 0, 0, TAU); x.stroke(); x.setLineDash([]);
  grain(x); return c;
}
export function blankPage(col = '#f5eedc', seed = 1) { const c = cv(PW, PH), x = c.getContext('2d'); paperFill(x, PW, PH, col, seed); grain(x); return c; }

// book cover (cloth + gold foil) — returns {c, m} like the engine's coverCanvases
export function coverArt(w = 2048) {
  const h = Math.round(w * .30 / .44), c = cv(w, h), x = c.getContext('2d'), m = cv(w, h), y = m.getContext('2d');
  x.fillStyle = '#c0392b'; x.fillRect(0, 0, w, h);
  const R = mulberry(3);
  for (let i = 0; i < h; i += 3) { x.fillStyle = `rgba(0,0,0,${.05 + R() * .07})`; x.fillRect(0, i, w, 1.2); }
  for (let i = 0; i < w; i += 3) { x.fillStyle = `rgba(255,255,255,${.02 + R() * .04})`; x.fillRect(i, 0, 1.2, h); }
  y.fillStyle = 'rgb(0,235,0)'; y.fillRect(0, 0, w, h);
  const GOLD = '#f0c868';
  const both = fn => { x.save(); fn(x, GOLD); x.restore(); y.save(); fn(y, 'rgb(0,90,255)'); y.restore(); };
  both((k, col) => { k.strokeStyle = col; k.lineWidth = 10; k.strokeRect(90, 90, w - 180, h - 180); k.lineWidth = 4; k.strokeRect(120, 120, w - 240, h - 240); });
  both((k, col) => { k.fillStyle = col; k.textAlign = 'center'; k.font = '230px "Lilita One"'; k.fillText('Pop-up', w * .62, h * .4); k.fillText('English', w * .62, h * .62); k.font = '110px "ZCOOL KuaiLe"'; k.fillText('立体书英语', w * .62, h * .8); });
  const cx = w * .23, cy = h * .52, r = 330;
  both((k, col) => { k.beginPath(); k.arc(cx, cy, r + 26, 0, TAU); k.lineWidth = 14; k.strokeStyle = col; k.stroke(); });
  x.save(); x.beginPath(); x.arc(cx, cy, r, 0, TAU); x.clip(); x.fillStyle = '#fbe7a6'; x.fillRect(cx - r, cy - r, 2 * r, 2 * r);
  x.fillStyle = '#9fd0ef'; x.fillRect(cx - r, cy + r * .45, 2 * r, r);
  const k1 = cv(CH_W, CH_H); drawKiki(k1.getContext('2d'), { eyes: 'happy', mouth: .6, armR: 2.4 }); x.drawImage(k1, cx - r * .95, cy - r * .55, r * 1.0, r * 1.33);
  const m1 = cv(CH_W, CH_H); drawMomo(m1.getContext('2d'), { mouth: .5, armL: 2.4 }); x.drawImage(m1, cx - r * .05, cy - r * .5, r * 1.0, r * 1.33);
  x.restore();
  y.save(); y.beginPath(); y.arc(cx, cy, r, 0, TAU); y.fillStyle = 'rgb(0,200,0)'; y.fill(); y.restore();
  return { c, m };
}

// ================= generated word art (lessons 2+) =================
export function shade(hex, k) {
  const n = parseInt(hex.slice(1), 16), f = v => Math.min(255, Math.round(v * k)).toString(16).padStart(2, '0');
  return '#' + f(n >> 16 & 255) + f(n >> 8 & 255) + f(n & 255);
}
const NUM_COL = ['#e8413a', '#3fa1de', '#ffc93c', '#62c24c', '#f59aa8', '#9b6fd1', '#ff8c3a', '#3fbfb0', '#e8413a', '#3fa1de'];
export function numberCard(N, h) {
  return cut(h * .8, h, (x, W, H) => {
    const card = () => { x.beginPath(); x.roundRect(0, 0, W, H, W * .16); };
    crescent(x, card, '#efe3c8', 0, -14, '#fffaf0'); card(); sh(x, null, LW);
    const s = String(N); let fs = H * .58; x.font = `${fs}px "Lilita One"`; while (x.measureText(s).width > W * .8) { fs -= 4; x.font = `${fs}px "Lilita One"`; }
    x.textAlign = 'center'; x.textBaseline = 'alphabetic'; x.lineJoin = 'round';
    x.lineWidth = 14; x.strokeStyle = INK; x.strokeText(s, W / 2, H * .56); x.fillStyle = NUM_COL[N - 1]; x.fillText(s, W / 2, H * .56);
    const rows = N > 5 ? 2 : 1, per = Math.ceil(N / rows), r = Math.min(W / (per * 2.6), H * .07);
    for (let i = 0; i < N; i++) {
      const row = i < per ? 0 : 1, k = row ? i - per : i, cnt = row ? N - per : per;
      const cx = W / 2 + (k - (cnt - 1) / 2) * r * 2.5, cy = rows === 1 ? H * .78 : H * (.7 + row * .16);
      x.beginPath(); x.arc(cx, cy, r, 0, TAU); sh(x, '#e8413a', 4);
      line(x, [[cx, cy - r * .7], [cx + r * .25, cy - r * 1.35]], 4);
      shine(x, cx - r * .35, cy - r * .3, r * .25, r * .16, -.6, .5);
    }
  });
}
export function balloon(col, h) {
  return cut(h * .62, h, (x, W, H) => {
    const d = shade(col, .78);
    x.beginPath(); x.moveTo(W * .5, H * .74); x.bezierCurveTo(W * .3, H * .82, W * .7, H * .9, W * .46, H); x.lineWidth = 6; x.strokeStyle = INK; x.lineCap = 'round'; x.stroke();
    x.beginPath(); x.moveTo(W * .5, H * .68); x.lineTo(W * .41, H * .76); x.lineTo(W * .59, H * .76); x.closePath(); sh(x, d, LW2);
    const b = () => { x.beginPath(); x.ellipse(W * .5, H * .36, W * .44, H * .34, 0, 0, TAU); };
    crescent(x, b, d, 22, 0, col); b(); sh(x, null, LW);
    shine(x, W * .32, H * .2, W * .07, H * .11, .35, .5);
  });
}
export const FAM = {
  dad: { skin: '#f6d0a8', hair: '#3b2a20', shirt: '#3fa1de', style: 'short' },
  mum: { skin: '#ffe0bf', hair: '#7a4128', shirt: '#f59aa8', style: 'long' },
  grandpa: { skin: '#f6d0a8', hair: '#dcd7cf', shirt: '#62c24c', style: 'bald', glasses: 1, tache: 1 },
  grandma: { skin: '#ffe0bf', hair: '#dcd7cf', shirt: '#9b6fd1', style: 'bun', glasses: 1 },
  brother: { skin: '#ffe0bf', hair: '#3b2a20', shirt: '#ff8c3a', style: 'spiky' },
  sister: { skin: '#ffe0bf', hair: '#4a2c22', shirt: '#ffc93c', style: 'pigtails' },
};
// head-and-shoulders portrait, drawn on a 900×1000 grid
export function person(o, h) {
  return cut(h * .9, h, (x, W) => {
    const s = W / 900; x.save(); x.scale(s, s);
    const L1 = LW / s, L2 = LW2 / s;
    if (o.style === 'long') { x.beginPath(); x.moveTo(205, 430); x.bezierCurveTo(160, 650, 170, 820, 240, 860); x.lineTo(660, 860); x.bezierCurveTo(730, 820, 740, 650, 695, 430); x.closePath(); sh(x, o.hair, L1); }
    if (o.style === 'pigtails') for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(450 + sx * 275, 520, 80, 115, sx * .35, 0, TAU); sh(x, o.hair, L1); x.beginPath(); x.arc(450 + sx * 232, 400, 34, 0, TAU); sh(x, '#e8413a', L2); }
    if (o.style === 'bun') { x.beginPath(); x.arc(450, 200, 105, 0, TAU); sh(x, o.hair, L1); }
    const shirt = () => { x.beginPath(); x.moveTo(110, 1000); x.bezierCurveTo(130, 820, 250, 760, 450, 760); x.bezierCurveTo(650, 760, 770, 820, 790, 1000); x.closePath(); };
    crescent(x, shirt, shade(o.shirt, .8), 34, 0, o.shirt); shirt(); sh(x, null, L1);
    x.beginPath(); x.roundRect(390, 630, 120, 160, 40); sh(x, o.skin, L2);
    line(x, [[375, 772], [450, 845], [525, 772]], L2);
    for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(450 + sx * 222, 480, 42, 58, 0, 0, TAU); sh(x, o.skin, L2); }
    const head = () => { x.beginPath(); x.ellipse(450, 450, 225, 235, 0, 0, TAU); };
    crescent(x, head, shade(o.skin, .88), 26, 20, o.skin); head(); sh(x, null, L1);
    const hair = f => { x.beginPath(); f(); x.closePath(); sh(x, o.hair, L1); };
    if (o.style === 'short') hair(() => { x.moveTo(228, 440); x.bezierCurveTo(215, 250, 350, 192, 460, 196); x.bezierCurveTo(600, 200, 690, 270, 672, 440); x.quadraticCurveTo(645, 330, 540, 318); x.quadraticCurveTo(420, 305, 300, 335); x.quadraticCurveTo(245, 370, 228, 440); });
    if (o.style === 'long') hair(() => { x.moveTo(222, 480); x.bezierCurveTo(215, 250, 390, 192, 470, 198); x.bezierCurveTo(610, 208, 695, 300, 678, 480); x.quadraticCurveTo(610, 330, 470, 300); x.quadraticCurveTo(320, 350, 290, 480); x.quadraticCurveTo(255, 470, 222, 480); });
    if (o.style === 'pigtails' || o.style === 'bun') hair(() => { x.moveTo(226, 450); x.bezierCurveTo(228, 260, 380, 212, 450, 212); x.bezierCurveTo(520, 212, 672, 260, 674, 450); x.quadraticCurveTo(620, 350, 560, 360); x.quadraticCurveTo(505, 320, 450, 365); x.quadraticCurveTo(395, 320, 340, 360); x.quadraticCurveTo(280, 350, 226, 450); });
    if (o.style === 'spiky') hair(() => {
      const n = 9; x.moveTo(228, 430);
      for (let i = 0; i <= n; i++) { const a = Math.PI * (1.08 + i / n * .84), r = i % 2 ? 300 : 245; x.lineTo(450 + Math.cos(a) * r, 450 + Math.sin(a) * r); }
      x.lineTo(672, 430); x.quadraticCurveTo(560, 320, 450, 335); x.quadraticCurveTo(330, 320, 228, 430);
    });
    if (o.style === 'bald') { for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(450 + sx * 205, 400, 48, 85, sx * .2, 0, TAU); sh(x, o.hair, L2); } shine(x, 380, 280, 60, 26, -.3, .45); }
    for (const sx of [-1, 1]) {
      x.beginPath(); x.ellipse(450 + sx * 82, 470, 24, 36, 0, 0, TAU); x.fillStyle = INK; x.fill();
      x.beginPath(); x.ellipse(450 + sx * 82 - 7, 457, 8, 11, 0, 0, TAU); x.fillStyle = '#fff'; x.fill();
      x.beginPath(); x.ellipse(450 + sx * 125, 565, 40, 24, 0, 0, TAU); x.fillStyle = 'rgba(255,120,120,.42)'; x.fill();
    }
    if (o.glasses) { for (const sx of [-1, 1]) { x.beginPath(); x.arc(450 + sx * 82, 470, 62, 0, TAU); x.lineWidth = L2; x.strokeStyle = INK; x.stroke(); } line(x, [[430, 465], [470, 465]], L2); }
    const my = o.tache ? 615 : 585;
    if (o.tache) for (const sx of [-1, 1]) { x.beginPath(); x.ellipse(450 + sx * 42, 568, 52, 24, sx * .15, 0, TAU); sh(x, o.hair, L2); }
    x.beginPath(); x.moveTo(398, my); x.quadraticCurveTo(450, my + 58, 502, my); x.lineWidth = L2 * 1.3; x.strokeStyle = INK; x.lineCap = 'round'; x.stroke();
    x.restore();
  });
}
