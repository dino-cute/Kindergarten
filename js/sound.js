// Web Audio: voice clips (mp3) with a level meter for lip sync, synthesized paper foley, a music-box loop.
let ctx = null, master, voiceBus, sfxBus, musicBus, meter, meterBuf;
const clips = new Map();
let current = null, musicOn = true, musicTimer = null;

export function unlock() {
  if (ctx) { if (ctx.state === 'suspended') ctx.resume(); return ctx; }
  ctx = new (window.AudioContext || window.webkitAudioContext)();
  master = ctx.createGain(); master.connect(ctx.destination);
  const comp = ctx.createDynamicsCompressor(); comp.threshold.value = -12; comp.ratio.value = 3; comp.connect(master);
  voiceBus = ctx.createGain(); voiceBus.gain.value = 1.15; voiceBus.connect(comp);
  sfxBus = ctx.createGain(); sfxBus.gain.value = .55; sfxBus.connect(comp);
  musicBus = ctx.createGain(); musicBus.gain.value = .0; musicBus.connect(comp);
  meter = ctx.createAnalyser(); meter.fftSize = 512; meterBuf = new Float32Array(meter.fftSize);
  if (musicOn) startMusic();
  return ctx;
}
export const audioReady = () => !!ctx;

export async function load(ids) {
  await Promise.all(ids.filter(id => !clips.has(id)).map(async id => {
    const p = fetch(`audio/${id}.mp3`).then(r => { if (!r.ok) throw new Error(id); return r.arrayBuffer(); }).then(b => (ctx || unlock()).decodeAudioData(b));
    clips.set(id, p);
    try { await p; } catch (e) { console.warn('missing clip', id); clips.delete(id); }
  }));
}

// Speak a clip; resolves when it ends (or is stopped). rate < 1 = slow.
export async function say(id, rate = 1) {
  stopVoice();
  if (!ctx) unlock();
  if (!clips.has(id)) await load([id]);
  const buf = await clips.get(id).catch(() => null);
  if (!buf) return;
  const src = ctx.createBufferSource(); src.buffer = buf; src.playbackRate.value = rate;
  src.connect(voiceBus); src.connect(meter);
  duck(true);
  const me = current = { src, done: null };
  me.done = new Promise(res => { src.onended = () => { if (current === me) { current = null; duck(false); } res(); }; });
  src.start();
  return me.done;
}
export function stopVoice() { if (current) { const c = current; current = null; try { c.src.stop(); } catch (e) { } duck(false); } }
export const speaking = () => !!current;
export function level() {
  if (!meter || !current) return 0;
  meter.getFloatTimeDomainData(meterBuf); let s = 0; for (const v of meterBuf) s += v * v;
  return Math.sqrt(s / meterBuf.length);
}

// ---------------- foley ----------------
function noiseBuf(d) { const b = ctx.createBuffer(1, Math.ceil(ctx.sampleRate * d), ctx.sampleRate), a = b.getChannelData(0); for (let i = 0; i < a.length; i++) a[i] = Math.random() * 2 - 1; return b; }
function env(g, t, a, peak, d) { g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(peak, t + a); g.gain.exponentialRampToValueAtTime(.0001, t + a + d); }
function tone(type, f0, f1, t, d, peak = .3, dest = sfxBus) {
  const o = ctx.createOscillator(), g = ctx.createGain(); o.type = type; o.frequency.setValueAtTime(f0, t); if (f1) o.frequency.exponentialRampToValueAtTime(f1, t + d);
  env(g, t, .005, peak, d); o.connect(g); g.connect(dest); o.start(t); o.stop(t + d + .05);
}
function crinkle(t, d, peak = .25, fq = 3000) {
  const s = ctx.createBufferSource(); s.buffer = noiseBuf(d + .05); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = fq; f.Q.value = .8;
  const g = ctx.createGain(); env(g, t, .004, peak, d); s.connect(f); f.connect(g); g.connect(sfxBus); s.start(t);
}
export const sfx = {
  pop(delay = 0) { if (!ctx) return; const t = ctx.currentTime + delay; tone('sine', 380 + Math.random() * 120, 900, t, .09, .22); crinkle(t, .08, .18, 2600 + Math.random() * 1500); },
  fold(delay = 0) { if (!ctx) return; const t = ctx.currentTime + delay; crinkle(t, .12, .12, 1800); },
  swish() { if (!ctx) return; const t = ctx.currentTime, s = ctx.createBufferSource(); s.buffer = noiseBuf(.7); const f = ctx.createBiquadFilter(); f.type = 'bandpass'; f.Q.value = 1.2; f.frequency.setValueAtTime(600, t); f.frequency.exponentialRampToValueAtTime(3500, t + .5); const g = ctx.createGain(); env(g, t, .2, .25, .45); s.connect(f); f.connect(g); g.connect(sfxBus); s.start(t); },
  creak() { if (!ctx) return; const t = ctx.currentTime; for (let i = 0; i < 9; i++) tone('sawtooth', 110 + Math.random() * 40, 90, t + i * .07, .06, .05); crinkle(t, .6, .06, 900); },
  thump() { if (!ctx) return; const t = ctx.currentTime; tone('sine', 120, 50, t, .25, .5); crinkle(t, .1, .2, 700); },
  tap() { if (!ctx) return; const t = ctx.currentTime; tone('triangle', 900, 600, t, .05, .12); },
  hop() { if (!ctx) return; const t = ctx.currentTime; tone('sine', 300, 760, t, .14, .2); },
  ding() { if (!ctx) return; const t = ctx.currentTime; [784, 988, 1175, 1568].forEach((f, i) => { tone('sine', f, 0, t + i * .08, .5, .16); tone('triangle', f * 2, 0, t + i * .08, .2, .04); }); },
  nope() { if (!ctx) return; const t = ctx.currentTime; tone('triangle', 330, 260, t, .16, .16); tone('triangle', 262, 200, t + .16, .22, .16); },
  sparkle() { if (!ctx) return; const t = ctx.currentTime; for (let i = 0; i < 8; i++) tone('sine', 1800 + Math.random() * 1800, 0, t + i * .06, .25, .05); },
  fanfare() { if (!ctx) return; const t = ctx.currentTime; [[523, 0], [659, .12], [784, .24], [1047, .4], [784, .58], [1047, .7]].forEach(([f, d]) => { tone('triangle', f, 0, t + d, .35, .16); tone('sine', f / 2, 0, t + d, .3, .1); }); },
};

// ---------------- music box ----------------
const MEL = [
  [0, 72], [1, 76], [2, 79], [3, 76], [4, 74], [5, 77], [6, 81], [7, 77], [8, 76], [9, 79], [10, 84], [11, 79], [12, 77], [13, 74], [14, 72], [15, null],
  [16, 72], [17, 74], [18, 76], [19, 79], [20, 81], [21, 79], [22, 76], [23, 74], [24, 77], [25, 76], [26, 74], [27, 71], [28, 72], [29, 76], [30, 72], [31, null],
];
const BASS = [[0, 48], [4, 53], [8, 55], [12, 53], [16, 48], [20, 57], [24, 53], [28, 55]];
const mtof = m => 440 * Math.pow(2, (m - 69) / 12);
function box(f, t, peak) { tone('sine', f, 0, t, 1.2, peak, musicBus); tone('sine', f * 2.01, 0, t, .4, peak * .25, musicBus); tone('triangle', f * 3, 0, t, .08, peak * .08, musicBus); }
function startMusic() {
  if (!ctx || musicTimer) return;
  const step = 60 / 104 / 2; let next = ctx.currentTime + .2, i = 0;
  musicBus.gain.setTargetAtTime(current ? .05 : .16, ctx.currentTime, .3);
  musicTimer = setInterval(() => {
    while (next < ctx.currentTime + .4) {
      const k = i % 32, m = MEL.find(e => e[0] === k); if (m && m[1]) box(mtof(m[1]), next, .16);
      const b = BASS.find(e => e[0] === k); if (b) { tone('triangle', mtof(b[1]), 0, next, .5, .12, musicBus); }
      next += step; i++;
    }
  }, 100);
}
function stopMusic() { clearInterval(musicTimer); musicTimer = null; if (musicBus) musicBus.gain.setTargetAtTime(0, ctx.currentTime, .1); }
function duck(on) { if (musicBus && musicTimer) musicBus.gain.setTargetAtTime(on ? .045 : .16, ctx.currentTime, on ? .08 : .5); }
export function setMusic(on) { musicOn = on; if (!ctx) return; on ? startMusic() : stopMusic(); }
export const musicIsOn = () => musicOn;
