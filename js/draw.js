// Shared drawing helpers for word pictures. Pictures are drawn on a grid 1000 units tall (width = 1000 × ratio);
// L1/L2 are the outline widths in grid units.
import { TAU } from './lib.js';
import { sh, crescent, INK } from './paper.js';
import { cut, LW, LW2, shade } from './art.js';

export const G = (ratio, fn) => h => cut(h * ratio, h, (x, W, H) => { const s = H / 1000; x.save(); x.scale(s, s); fn(x, LW / s, LW2 / s, 1000 * ratio); x.restore(); });
export const SKIN = '#ffe0bf', SKIN_S = '#f2bf95';
export const ell = (x, cx, cy, rx, ry, rot = 0) => { x.beginPath(); x.ellipse(cx, cy, rx, ry, rot, 0, TAU); };
export const circ = (x, cx, cy, r) => { x.beginPath(); x.arc(cx, cy, r, 0, TAU); };
export const dot = (x, cx, cy, r, col = INK) => { circ(x, cx, cy, r); x.fillStyle = col; x.fill(); };
export const mirror = (x, cx, fn) => { fn(); x.save(); x.translate(cx * 2, 0); x.scale(-1, 1); fn(); x.restore(); };
export const stroke = (x, lw, col = INK) => { x.lineWidth = lw; x.strokeStyle = col; x.lineCap = 'round'; x.lineJoin = 'round'; x.stroke(); };
export const shaded = (x, path, base, k, dx, dy, lw) => { crescent(x, path, shade(base, k), dx, dy, base); path(); sh(x, null, lw); };
export function cuteEye(x, cx, cy, r) { ell(x, cx, cy, r * .62, r); x.fillStyle = INK; x.fill(); ell(x, cx - r * .2, cy - r * .4, r * .22, r * .3); x.fillStyle = '#fff'; x.fill(); }
export function smile(x, cx, cy, w, lw) { x.beginPath(); x.moveTo(cx - w, cy); x.quadraticCurveTo(cx, cy + w * 1.1, cx + w, cy); stroke(x, lw); }
export function cheeks(x, cx, cy, dx, r) { for (const s of [-1, 1]) { ell(x, cx + s * dx, cy, r, r * .6); x.fillStyle = 'rgba(255,120,120,.42)'; x.fill(); } }

export const SHADE = shade;
export { LW, LW2 };
