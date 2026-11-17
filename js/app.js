// Pop-up English: an interactive pop-up book on a desk. Tap pictures to hear words, watch Kiki & Momo talk, play a find-it game.
import * as THREE from 'three';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { makeBook, texOf } from './book.js';
import { cutMesh, blobShadow, thread } from './cutmesh.js';
import { makePost } from './post.js';
import * as A from './art.js';
import * as M from './art-more.js';
import * as B3 from './art-b3.js';
import * as B4 from './art-b4.js';
import * as B5 from './art-b5.js';
import { cv } from './paper.js';
import { LESSONS, aid, sayOf, findOf } from './lessons.js';
import { seg, back, eio, ss, clamp, lerp, spring } from './lib.js';
import * as S from './sound.js';

const Q = new URLSearchParams(location.search);
const $ = id => document.getElementById(id);
const V3 = THREE.Vector3;
const now = () => performance.now() / 1000;
const wait = s => new Promise(r => setTimeout(r, s * 1000));

// ---------------- renderer ----------------
const renderer = new THREE.WebGLRenderer({ antialias: false, powerPreference: 'high-performance', preserveDrawingBuffer: Q.has('shot') });
const DPR = Math.min(devicePixelRatio || 1, Q.has('lite') ? 1 : 1.5);
renderer.setPixelRatio(DPR);
renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.toneMapping = THREE.NeutralToneMapping; renderer.outputColorSpace = THREE.SRGBColorSpace;
$('stage').appendChild(renderer.domElement);
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(30, 1, .004, 30);
let W = innerWidth, H = innerHeight;
renderer.setSize(W, H);
const post = makePost(renderer, scene, cam, W * DPR, H * DPR);
function resize() {
  W = innerWidth; H = innerHeight; renderer.setSize(W, H); post.composer.setSize(W * DPR, H * DPR);
  cam.aspect = W / H; cam.updateProjectionMatrix();
}
addEventListener('resize', resize); resize();

// ---------------- room ----------------
await Promise.all(['500 40px Fredoka', '600 40px Fredoka', '700 40px Fredoka', '40px "Lilita One"', '40px "ZCOOL KuaiLe"'].map(f => document.fonts.load(f, 'Aa立体书英语')));
const hdr = await new RGBELoader().loadAsync('assets/lythwood_lounge_1k.hdr'); hdr.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = hdr; scene.background = hdr; scene.backgroundBlurriness = .25;
scene.backgroundRotation.set(0, 2.3, 0); scene.environmentRotation.set(0, 2.3, 0);
{
  const tl = new THREE.TextureLoader();
  const wt = n => { const t = tl.load(`assets/walnut_${n}.jpg`); t.wrapS = t.wrapT = THREE.RepeatWrapping; t.repeat.set(2.2, 1.4); t.anisotropy = 8; return t; };
  const diff = wt('diff'); diff.colorSpace = THREE.SRGBColorSpace;
  const desk = new THREE.Mesh(new THREE.BoxGeometry(2.6, .04, 1.7), new THREE.MeshStandardMaterial({ map: diff, normalMap: wt('nor'), roughnessMap: wt('rough'), color: '#c9a88a', envMapIntensity: .8 }));
  desk.position.set(0, -.02, .25); desk.receiveShadow = true; scene.add(desk);
}
const lamp = (await new GLTFLoader().loadAsync('assets/desk_lamp_arm_01/desk_lamp_arm_01.gltf')).scene;
lamp.position.set(-.347, 0, .51); lamp.scale.setScalar(.55); lamp.rotation.y = -.76;
lamp.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = true; if (o.material.name.includes('light')) { o.material = o.material.clone(); o.material.emissive = new THREE.Color('#ffd9a0'); o.material.emissiveIntensity = 6; } } });
scene.add(lamp);
// crayons on the desk
{
  const cols = ['#e8413a', '#3fa1de', '#ffc93c', '#62c24c'];
  cols.forEach((c, i) => {
    const g = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CylinderGeometry(.0045, .0045, .07, 10), new THREE.MeshStandardMaterial({ color: c, roughness: .6 }));
    const tip = new THREE.Mesh(new THREE.ConeGeometry(.0045, .012, 10), body.material); tip.position.y = .041;
    const wrap = new THREE.Mesh(new THREE.CylinderGeometry(.0047, .0047, .04, 10), new THREE.MeshStandardMaterial({ color: '#f3ead6', roughness: .9 }));
    g.add(body, tip, wrap); g.traverse(o => { if (o.isMesh) o.castShadow = o.receiveShadow = true; });
    g.rotation.set(0, .3 + i * .18, Math.PI / 2); g.position.set(.3 + i * .012, .0045, .42 + i * .02); scene.add(g);
  });
}

// ---------------- lights ----------------
const lampHead = new V3(-.28, .375, .44);
const spot = new THREE.SpotLight('#fff0dc', 0, 3, .75, .55, 2); spot.position.copy(lampHead); spot.target.position.set(.02, 0, .2);
spot.castShadow = true; spot.shadow.mapSize.set(2048, 2048); spot.shadow.bias = -.00006; spot.shadow.normalBias = .0004; spot.shadow.radius = 5; spot.shadow.camera.near = .05; spot.shadow.camera.far = 2;
scene.add(spot, spot.target);
const sun = new THREE.DirectionalLight('#fff3e0', 0); sun.castShadow = true; sun.shadow.mapSize.set(2048, 2048); sun.shadow.bias = -.00008; sun.shadow.normalBias = .0003; sun.shadow.radius = 4;
Object.assign(sun.shadow.camera, { left: -.3, right: .3, top: .3, bottom: -.3, near: .1, far: 3 }); sun.position.set(-.35, .55, .75); sun.target.position.set(0, .05, .12); scene.add(sun, sun.target);
const hemi = new THREE.HemisphereLight('#cfe6ff', '#caa27a', 0); scene.add(hemi);

// ---------------- book ----------------
const book = makeBook(A.coverArt());
scene.add(book.root);
const BLANK = { sky: texOf(A.blankPage('#f5eedc', 2)), ground: texOf(A.blankPage('#f5eedc', 4)) };
book.backMat.map = BLANK.sky; book.groundMat.map = BLANK.ground;
book.backMat.needsUpdate = book.groundMat.needsUpdate = true;
function setPages(p) { book.backMat.map = p.sky; book.groundMat.map = p.ground; }

// ---------------- pop-up pieces ----------------
// every piece: g (position) → pivot (pop rotation) → hop (interaction) → mesh
const pops = [];
function popper(parent, obj, x, y, z, o = {}) {
  const g = new THREE.Group(), pivot = new THREE.Group(), hop = new THREE.Group();
  g.position.set(x, y, z); g.add(pivot); pivot.add(hop); hop.add(obj); parent.add(g); g.visible = false;
  const p = { g, pivot, hop, obj, dir: o.dir ?? (z < .08 ? 1 : -1), d: o.d ?? Math.max(0, (.3 - z)) * 1.2 - .1, hang: o.hang || 0, sway: o.sway || 0, ph: Math.random() * 6, riseAt: 1e9, foldAt: -1e9 };
  if (p.hang) { for (const sx of o.strings || [0]) { const t = thread(.4); t.position.set(sx, 0, -.0005); hop.add(t); } }
  pops.push(p); return p;
}
function popK(p, t) { return back(seg(t, p.riseAt, p.riseAt + .55), 1.7) * (1 - ss(seg(t, p.foldAt, p.foldAt + .4))); }
function updatePops(t) {
  for (const p of pops) {
    const k = p.riseAt > 1e8 ? 0 : popK(p, t);
    p.g.visible = k > .002;
    if (!p.g.visible) continue;
    if (p.hang) { p.pivot.position.y = (1 - spring(t - p.riseAt, 6, .3)) * .16 + ss(seg(t, p.foldAt, p.foldAt + .4)) * .2; p.pivot.rotation.z = Math.sin(t * 1.3 + p.ph) * .02 * clamp(1.5 - (t - p.riseAt) * .3, .3, 1.5); }
    else p.pivot.rotation.x = p.dir * -(Math.PI / 2) * (1 - k);
    if (p.sway) p.pivot.rotation.z = Math.sin(t * 1.6 + p.ph) * p.sway;
  }
}

// ---------------- characters ----------------
function makeChar(name, draw, Hm) {
  const cache = new Map();
  const canvasFor = pose => { const k = JSON.stringify(pose); if (!cache.has(k)) { const c = cv(A.CH_W, A.CH_H); draw(c.getContext('2d'), pose); cache.set(k, texOf(c)); } return cache.get(k); };
  const t0 = canvasFor({});
  const item = { c: t0.image, w: Hm * A.CH_W / A.CH_H, h: Hm, ax: .5, ay: 1150 / 1200 };
  const mesh = cutMesh(item, { tex: t0 });
  const front = mesh.userData.front, backM = mesh.userData.back;
  // own materials so swapping maps doesn't touch other meshes
  const ob = backM.material; front.material = front.material.clone(); backM.material = ob.clone(); backM.material.onBeforeCompile = ob.onBeforeCompile; backM.material.customProgramCacheKey = ob.customProgramCacheKey;
  front.customDepthMaterial = front.customDepthMaterial.clone();
  let key = '';
  return {
    name, mesh, H: Hm,
    pose(p) {
      const k = JSON.stringify(p); if (k === key) return; key = k;
      const t = canvasFor(p); front.material.map = t; backM.material.map = t; front.customDepthMaterial.map = t;
    },
    warm(list) { list.forEach(canvasFor); },
    tapT: -9, waveUntil: 0,
  };
}
const kiki = makeChar('kiki', A.drawKiki, .1);
const momo = makeChar('momo', A.drawMomo, .092);
const CHAR = { kiki, momo };

// ---------------- scenes: back pages + back-row props ----------------
const OUTDOOR = new Set(['farm', 'zoo', 'park', 'garden', 'town']);
function buildScene(scene, th, board, add) {
  const S = (item, x, z, o = {}) => add(book.stage, cutMesh(item), x, 0, z, { dir: 1, ...o });
  const hang = (item, x, y, d) => add(book.sky, cutMesh(item), x, y, .008, { hang: 1, d });
  if (OUTDOOR.has(scene)) {
    if (scene === 'town') {
      S(B5.shopFront(.15, .12, board), 0, .018); S(B5.trafficLight(.1), -.165, .03); S(B5.busStop(.09), .17, .05); S(M.tree(.08, 6), .085, .012, { sway: .015 });
      return { sky: texOf(B5.citySky(th)), ground: texOf(B5.road(th)) };
    }
    const pages = { sky: texOf(M.skyPage(th)), ground: texOf(M.grassPage(th)) };
    hang(M.cloudCard(.06), -.1, .215, .3); hang(M.cloudCard(.045), .12, .2, .4);
    if (scene === 'farm') { S(M.barn(.15, .13, board), 0, .018); S(M.tree(.12, 3), -.165, .03, { sway: .015 }); S(M.fence(.12, .032), .135, .05); S(M.hay(.04), .19, .07); }
    if (scene === 'zoo') { S(M.zooGate(.19, .12, board), 0, .018); S(M.palm(.13), -.17, .03, { sway: .02 }); S(M.rock(.07, .035), .175, .05); }
    if (scene === 'park') { S(B3.signpost(.12, .1, board), 0, .03); S(M.tree(.12, 4), -.165, .03, { sway: .015 }); S(M.tree(.09, 7), .07, .012, { sway: .015 }); S(B3.slide(.09, .075), .15, .04); }
    if (scene === 'garden') { S(B3.house(.15, .13, board), 0, .018); S(M.tree(.12, 3), -.165, .03, { sway: .015 }); S(M.fence(.12, .032), .14, .05); S(B3.umbrellaStand(.06), .2, .07); }
    return pages;
  }
  const wall = A.wallPage(th), wx = wall.getContext('2d');
  const win = A.windowPane(.075, .07); wx.drawImage(win.c, (-.17 + .22) / .44 * A.PW - win.c.width * .5 * (A.PW / .44) / A.PPM, A.PH * .2, win.c.width * (A.PW / .44) / A.PPM, win.c.height * (A.PH / .3) / A.PPM);
  const pages = { sky: texOf(wall), ground: texOf(A.floorPage(th)) };
  hang(A.clockCard(.018), .15, .25, .3);
  if (scene === 'kitchen') { S(A.blackboard(.14, .1, board), 0, .018); S(B3.fridge(.07, .125), -.16, .03); S(B3.counter(.1, .055), .15, .04); }
  else if (scene === 'party') { S(B4.frame(.17, .1, board), 0, .018); S(M.wordArt('balloons', .1), -.165, .03, { sway: .03 }); S(M.wordArt('balloons', .085), .19, .04, { sway: .03 }); }
  else if (scene === 'home') { S(B4.frame(.15, .1, board), 0, .018); S(A.bookshelf(.075, .095), -.16, .03); S(A.pottedPlant(.07, 5), .185, .04, { sway: .02 }); }
  else if (scene === 'bedroom') { S(B3.wardrobe(.13, .13, board), 0, .018); S(B3.floorLamp(.11), -.17, .03); S(A.pottedPlant(.07, 5), .185, .04, { sway: .02 }); }
  else { S(A.blackboard(.17, .11, board), 0, .018); S(A.bookshelf(.075, .095), -.16, .03); S(A.pottedPlant(.07, 5), .185, .04, { sway: .02 }); }
  return pages;
}

// ---------------- lessons: sets ----------------
const lessonSets = new Map();
function buildLesson(L) {
  if (lessonSets.has(L.id)) return lessonSets.get(L.id);
  const th = L.theme, list = [];
  const add = (...a) => { const p = popper(...a); list.push(p); return p; };
  const board = L.id === 1 ? 'Hello!' : (L.board || L.en);
  const pages = buildScene(L.scene || 'classroom', th, board, add);
  // characters
  const ck = add(book.stage, kiki.mesh, -.19, 0, .12, { dir: -1, d: .55 });
  const cm = add(book.stage, momo.mesh, .187, 0, .12, { dir: -1, d: .65 });
  for (const [c, p] of [[kiki, ck], [momo, cm]]) { c.pop = p; const sh = blobShadow(c.H * .3, .4); sh.position.y = .0004; p.hop.add(sh); }
  // word cards: one arc in front, or (more than 6 words) a back row standing on a bench plus a front row
  const cards = {};
  const n = L.words.length, two = n > 6, nBack = two ? Math.ceil(n / 2) : 0, benchTop = .02;
  if (two) add(book.stage, cutMesh(A.smallDesk(.3, .025)), 0, 0, .168, { dir: -1, d: .8 });
  L.words.forEach(([w, zh, , key], i) => {
    const back = i < nBack, k = back ? i : i - nBack, m0 = two ? (back ? nBack : n - nBack) : n;
    const u = m0 > 1 ? k / (m0 - 1) : .5, span = two ? .12 : .13;
    const x = lerp(-span, span, u), z = back ? .172 : (two ? .232 : .228 - Math.pow((u - .5) * 2, 2) * .022), y = back ? benchTop : 0;
    const size = two ? .037 : .044, maxW = .05;
    let item = M.wordArt(key || w, size);
    if (item.w - item.pad * 2 / A.PPM > maxW) item = M.wordArt(key || w, size * maxW / (item.w - item.pad * 2 / A.PPM));
    const m = cutMesh(item);
    const p = add(book.stage, m, x, y, z, { dir: -1, d: .9 + i * (two ? .08 : .12) });
    const sh = blobShadow(.022, .3); sh.position.y = .0004; p.hop.add(sh);
    // hanging sign above the card
    const sItem = A.wordSign(.075, w, zh), sign = cutMesh(sItem);
    const sg = new THREE.Group(); sg.add(sign);
    for (const sx of [-.025, .025]) { const t = thread(.4); t.position.set(sx, 0, -.0006); sg.add(t); }
    sg.position.set(clamp(x, -.07, .07), 0, z + .004); sg.visible = false; book.stage.add(sg);
    cards[w] = { w, zh, p, mesh: m, x, z, top: item.h * (1 - item.ay) + .006, sign: sg, signH: sItem.h, signAt: -9, signOff: -9, tapT: -9, shakeT: -9, glowUntil: 0 };
  });
  const set = { L, pages, list, cards };
  lessonSets.set(L.id, set); return set;
}
function riseSet(set, t0) { for (const p of set.list) { p.riseAt = t0 + p.d; p.foldAt = 1e9; S.sfx.pop(Math.max(0, p.riseAt - now() + .08)); } }
function foldSet(set, t0) { const ds = set.list.map(p => p.d), mx = Math.max(...ds); for (const p of set.list) { p.foldAt = t0 + (mx - p.d) * .35; S.sfx.fold(Math.max(0, p.foldAt - now())); } for (const c of Object.values(set.cards)) c.signOff = t0; }

// ---------------- camera ----------------
const VIEWS = {
  desk: { pos: new V3(.1, .5, .86), tgt: new V3(0, .0, .14), fov: 30 },
  open: { pos: new V3(0, .3, .8), tgt: new V3(0, .09, .1), fov: 30 },
  lesson: { pos: new V3(0, .2, .72), tgt: new V3(0, .05, .13), fov: 30 },
};
const camCur = { pos: VIEWS.desk.pos.clone(), tgt: VIEWS.desk.tgt.clone(), fov: 30 };
let view = 'desk', focusX = 0, focusZoom = 1;
const pointer = { x: 0, y: 0 };
function camGoal() {
  const v = VIEWS[view], aspect = W / H, fit = Math.pow(Math.max(1, (16 / 9) / aspect), .72);
  const tgt = v.tgt.clone(); tgt.x += focusX * .5;
  const off = v.pos.clone().sub(v.tgt).multiplyScalar(fit * focusZoom);
  const pos = tgt.clone().add(off); pos.x += pointer.x * .03 + focusX * .2; pos.y += -pointer.y * .015;
  return { pos, tgt, fov: v.fov };
}
function updateCam(dt) {
  const g = camGoal(), k = 1 - Math.exp(-dt * 2.6);
  camCur.pos.lerp(g.pos, k); camCur.tgt.lerp(g.tgt, k); camCur.fov = lerp(camCur.fov, g.fov, k);
  cam.position.copy(camCur.pos); cam.fov = camCur.fov; cam.lookAt(camCur.tgt); cam.updateProjectionMatrix();
}

// ---------------- state ----------------
let openT = 1e9, cur = null, mode = null, runId = 0;
const t0 = now();

function lights(t) {
  const inBook = seg(t, openT, openT + 2);
  sun.intensity = inBook * 2.4; spot.intensity = 2.2 * (1 - inBook * .7); hemi.intensity = .15 + inBook * .45;
  scene.environmentIntensity = .42 - inBook * .06; scene.backgroundIntensity = .75;
}

// ---------------- characters per frame ----------------
let talker = null, gesture = {};
function charFrame(c, t) {
  const speaking = talker === c.name && S.speaking();
  const lv = speaking ? S.level() : 0;
  const mouth = lv > .06 ? (lv > .14 ? 1 : .5) : 0;
  const blink = ((t + (c.name === 'momo' ? 1.3 : 0)) % 3.7) < .13;
  const wave = t < c.waveUntil, wv = Math.floor(t * 5) % 2;
  const happy = gesture[c.name] === 'happy' && t < (gesture[c.name + 'T'] || 0);
  const pose = { mouth, eyes: happy ? 'happy' : (blink ? 'closed' : 'open') };
  if (c.name === 'kiki') { pose.armR = wave ? (wv ? 2.3 : 2.75) : .15; pose.armL = .15; }
  else { pose.armL = wave ? (wv ? 2.3 : 2.75) : .2; pose.armR = .2; }
  c.pose(pose);
  const h = seg(t, c.tapT, c.tapT + .4);
  c.mesh.position.y = Math.sin(h * Math.PI) * .012;
  c.mesh.scale.set(1 + Math.sin(h * Math.PI * 2) * .04, 1 + Math.sin(t * 2.4 + c.H * 99) * .008 - Math.sin(h * Math.PI * 2) * .04, 1);
  c.mesh.rotation.z = speaking ? Math.sin(t * 3) * .025 : 0;
}

// ---------------- word cards per frame ----------------
function cardFrame(c, t) {
  const h = seg(t, c.tapT, c.tapT + .45), sh = seg(t, c.shakeT, c.shakeT + .5);
  const glow = t < c.glowUntil ? 1 : 0;
  c.mesh.position.y = Math.sin(h * Math.PI) * .016 + glow * (.006 + Math.sin(t * 8) * .002);
  const s = 1 + Math.sin(h * Math.PI) * .12 + glow * .08;
  c.mesh.scale.set(s, s, 1);
  c.mesh.rotation.z = Math.sin(sh * Math.PI * 6) * .14 * (1 - sh);
  // sign on strings
  const on = c.signAt > c.signOff;
  const k = on ? spring(t - c.signAt, 6, .3) : 1 - ss(seg(t, c.signOff, c.signOff + .35));
  c.sign.visible = k > .01 && (on || t - c.signOff < .4);
  if (c.sign.visible) { const rest = .148; c.sign.position.y = rest + (1 - k) * .14; c.sign.rotation.z = Math.sin((t - c.signAt) * 3.2) * .05 * Math.exp(-(t - c.signAt) * .9); }
}

// ---------------- bubbles ----------------
const bubbleBox = $('bubbles');
let bubble = null;
function showBubble(who, en, zh, onTap) {
  hideBubble();
  const el = document.createElement('div'); el.className = 'bubble'; el.innerHTML = `<div class="en"></div><div class="zh"></div>`;
  el.querySelector('.en').textContent = en; el.querySelector('.zh').textContent = zh;
  el.onclick = e => { e.stopPropagation(); onTap && onTap(); };
  bubbleBox.appendChild(el); bubble = { el, who };
}
function hideBubble() { if (bubble) { bubble.el.remove(); bubble = null; } }
const tmpV = new V3();
function placeBubble() {
  if (!bubble) return;
  const c = CHAR[bubble.who]; tmpV.set(0, c.H * 1.02, 0).applyMatrix4(c.mesh.matrixWorld).project(cam);
  const sx = (tmpV.x * .5 + .5) * W, sy = (-tmpV.y * .5 + .5) * H;
  const r = bubble.el.getBoundingClientRect();
  let left = sx - r.width * (bubble.who === 'kiki' ? .3 : .7); left = clamp(left, 12, W - r.width - 12);
  const top = Math.max(110, sy - r.height - 34);
  bubble.el.style.left = left + 'px'; bubble.el.style.top = top + 'px'; bubble.el.style.setProperty('--tx', clamp(sx - left, 30, r.width - 30) + 'px');
}

function rating(text) { const el = $('rating'); el.textContent = text; el.classList.remove('hidden', 'show'); void el.offsetWidth; el.classList.add('show'); }

// ---------------- flow ----------------
function show(id, on) { $(id).classList.toggle('hidden', !on); }
function openBook() {
  if (openT < 1e8) return;
  S.unlock(); S.sfx.creak(); openT = now(); view = 'open';
  show('start', false);
  setTimeout(() => S.sfx.thump(), 1700);
  setTimeout(() => { show('contents', true); }, 1900);
}
function buildContents() {
  const g = $('lessonGrid'); g.innerHTML = '';
  for (const L of LESSONS) {
    const b = document.createElement('button'); b.className = 'btn lesson ' + (L.ready ? 'ready' : 'locked');
    b.innerHTML = `<span class="n">Lesson ${L.id}</span><span class="en"></span><span class="zh"></span>`;
    b.querySelector('.en').textContent = L.en; b.querySelector('.zh').textContent = L.zh;
    if (L.ready) b.onclick = () => { S.sfx.tap(); enterLesson(L.id); };
    g.appendChild(b);
  }
}
async function enterLesson(id) {
  const L = LESSONS.find(l => l.id === id); if (!L || !L.ready) return;
  show('contents', false);
  const set = buildLesson(L); cur = set;
  const clipIds = ['c_great', 'c_well', 'c_again', 'c_allDone'];
  for (const [w] of L.words) clipIds.push(aid.word(L.id, w), aid.sent(L.id, w), aid.find(L.id, w));
  L.talk.forEach((_, i) => clipIds.push(aid.talk(L.id, i)));
  S.load(clipIds);
  S.sfx.swish(); setPages(set.pages);
  view = 'lesson'; focusX = 0; focusZoom = 1;
  riseSet(set, now() + .35);
  $('lessonNum').textContent = `Lesson ${L.id}`; $('lessonEn').textContent = L.en; $('lessonZh').textContent = L.zh;
  show('lessonUI', true);
  const sign = $('lessonSign'); sign.style.animation = 'none'; void sign.offsetWidth; sign.style.animation = '';
  setMode('words');
  await wait(2.1);
  kiki.waveUntil = now() + 1.4; momo.waveUntil = now() + 1.6;
}
function leaveLesson() {
  if (!cur) return;
  runId++; S.stopVoice(); hideBubble(); talker = null;
  foldSet(cur, now());
  show('lessonUI', false);
  const set = cur; cur = null; mode = null;
  setTimeout(() => { if (!cur) { S.sfx.swish(); setPages(BLANK); } }, 900);
  setTimeout(() => { if (!cur) show('contents', true); }, 1100);
  view = 'open'; focusX = 0; focusZoom = 1;
}

// ---------------- modes ----------------
function setMode(m) {
  runId++; S.stopVoice(); hideBubble(); talker = null; mode = m;
  focusX = 0; focusZoom = 1;
  document.querySelectorAll('.btn.mode').forEach(b => b.classList.toggle('on', b.dataset.mode === m));
  show('wordsPanel', m === 'words'); show('talkPanel', m === 'talk'); show('gamePanel', m === 'game');
  if (cur) for (const c of Object.values(cur.cards)) { c.signOff = now(); c.glowUntil = 0; }
  if (m === 'words') { show('wordCard', false); show('wordHint', true); }
  if (m === 'talk') { talkIdx = 0; updateTalkCount(); setPlayIcon(false); }
  if (m === 'game') startGame();
}

// words
let activeWord = null;
async function tapWord(w) {
  const c = cur.cards[w], L = cur.L, my = ++runId;
  S.sfx.hop(); c.tapT = now();
  for (const o of Object.values(cur.cards)) if (o !== c && o.signAt > o.signOff) o.signOff = now();
  c.signAt = now() + .05;
  focusX = c.x * .4;
  activeWord = w;
  const wd = L.words.find(x => x[0] === w);
  $('wcEn').textContent = w; $('wcZh').textContent = c.zh;
  $('wcWordTxt').textContent = w; $('wcSentTxt').textContent = sayOf(L, wd);
  show('wordHint', false); show('wordCard', true);
  const el = $('wordCard'); el.style.animation = 'none'; void el.offsetWidth; el.style.animation = '';
  talker = null;
  await S.say(aid.word(L.id, w)); if (my !== runId) return;
  await wait(.35); if (my !== runId) return;
  await S.say(aid.sent(L.id, w));
}

// talk
let talkIdx = 0, talkPlaying = false;
function updateTalkCount() { $('talkCount').textContent = `${talkIdx + 1} / ${cur.L.talk.length}`; }
function setPlayIcon(p) { talkPlaying = p; $('talkPlay').textContent = p ? '⏸' : '▶'; }
async function playLine(i, my) {
  const L = cur.L, [who, en, zh, showW] = L.talk[i];
  talkIdx = i; updateTalkCount();
  talker = who;
  const c = CHAR[who];
  focusX = c === kiki ? -.05 : .05; focusZoom = .95;
  if (/hello|hi,|bye|goodbye|see you/i.test(en)) c.waveUntil = now() + 1.8;
  if (showW && cur.cards[showW]) { const cd = cur.cards[showW]; cd.glowUntil = now() + 99; cd.tapT = now(); }
  for (const o of Object.values(cur.cards)) if (o.w !== showW) o.glowUntil = 0;
  if (/no, no|!$/i.test(en) && i > 3) { gesture[who] = 'happy'; gesture[who + 'T'] = now() + 1.2; }
  showBubble(who, en, zh, () => { const r = ++runId; setPlayIcon(false); playLine(talkIdx, r); });
  await S.say(aid.talk(L.id, i));
  if (my !== runId) return false;
  return true;
}
async function playTalk(from) {
  const my = ++runId; setPlayIcon(true);
  for (let i = from; i < cur.L.talk.length; i++) {
    if (!(await playLine(i, my))) return;
    await wait(.45); if (my !== runId) return;
  }
  setPlayIcon(false);
  for (const o of Object.values(cur.cards)) o.glowUntil = 0;
  talkIdx = 0;
}

// game
let game = null;
function shuffle(a) { a = a.slice(); for (let i = a.length - 1; i > 0; i--) { const j = (Math.random() * (i + 1)) | 0; [a[i], a[j]] = [a[j], a[i]]; } return a; }
function startGame() {
  const words = shuffle(cur.L.words.map(w => w[0]));
  game = { words, i: 0, misses: 0, busy: false };
  $('stars').innerHTML = words.map(() => '<span>⭐</span>').join('');
  show('gameAgain', false); show('gameAsk', true);
  ask();
}
async function ask() {
  const my = runId, w = game.words[game.i];
  $('gameQ').textContent = findOf(cur.L, w);
  game.busy = false;
  await wait(.3); if (my !== runId) return;
  await S.say(aid.find(cur.L.id, w));
}
async function gameTap(w) {
  if (!game || game.busy) return;
  const c = cur.cards[w], want = game.words[game.i], my = ++runId;
  if (w === want) {
    game.busy = true; c.tapT = now(); c.signAt = now(); S.sfx.ding(); S.sfx.sparkle();
    $('stars').children[game.i].classList.add('got');
    rating(game.i % 2 ? 'GREAT!' : 'NICE!');
    kiki.tapT = momo.tapT = now() + .1; gesture.kiki = gesture.momo = 'happy'; gesture.kikiT = gesture.momoT = now() + 1.4;
    await S.say(aid.word(cur.L.id, w)); if (my !== runId) return;
    await wait(.3); if (my !== runId) return;
    c.signOff = now();
    game.i++;
    if (game.i >= game.words.length) {
      S.sfx.fanfare(); rating('YAY!'); kiki.waveUntil = momo.waveUntil = now() + 2.5;
      await S.say('c_allDone'); if (my !== runId) return;
      show('gameAsk', false); show('gameAgain', true); game = null;
      return;
    }
    runId++; ask();
  } else {
    c.shakeT = now(); S.sfx.nope();
    game.misses++;
    await S.say('c_again'); if (my !== runId) return;
    await wait(.2); if (my !== runId) return;
    await S.say(aid.find(cur.L.id, want));
  }
}

// ---------------- input ----------------
const ray = new THREE.Raycaster(), ndc = new THREE.Vector2();
function pick(ev) {
  ndc.set(ev.clientX / W * 2 - 1, -(ev.clientY / H) * 2 + 1); ray.setFromCamera(ndc, cam);
  const targets = [];
  if (cur) { for (const c of Object.values(cur.cards)) if (c.p.g.visible) targets.push([c.mesh.userData.front, { card: c.w }]); for (const ch of [kiki, momo]) targets.push([ch.mesh.userData.front, { char: ch.name }]); }
  const hits = ray.intersectObjects(targets.map(t => t[0]), false);
  if (!hits.length) return null;
  return targets.find(t => t[0] === hits[0].object)[1];
}
function pickBook(ev) { ndc.set(ev.clientX / W * 2 - 1, -(ev.clientY / H) * 2 + 1); ray.setFromCamera(ndc, cam); return ray.intersectObject(book.root, true).length > 0; }
renderer.domElement.addEventListener('pointermove', ev => {
  pointer.x = ev.clientX / W * 2 - 1; pointer.y = ev.clientY / H * 2 - 1;
  if (ev.pointerType === 'mouse') renderer.domElement.style.cursor = (cur && pick(ev)) || (openT > 1e8 && pickBook(ev)) ? 'pointer' : '';
});
renderer.domElement.addEventListener('pointerup', ev => {
  S.unlock();
  if (openT > 1e8) { if (READY_SHOWN) openBook(); return; }
  if (!cur) return;
  const h = pick(ev); if (!h) return;
  if (h.card) {
    if (mode === 'game') gameTap(h.card);
    else if (mode === 'words') tapWord(h.card);
    else { S.sfx.hop(); cur.cards[h.card].tapT = now(); }
  } else if (h.char) {
    const c = CHAR[h.char]; c.tapT = now(); S.sfx.hop();
    if (mode !== 'game') { const my = ++runId; setPlayIcon(false); c.waveUntil = now() + 1.6; playLine(h.char === 'kiki' ? 0 : 1, my); }
  }
});
$('openBtn').onclick = e => { e.stopPropagation(); openBook(); };
$('homeBtn').onclick = () => { S.sfx.tap(); leaveLesson(); };
$('musicBtn').onclick = () => { S.setMusic(!S.musicIsOn()); $('musicBtn').classList.toggle('off', !S.musicIsOn()); };
document.querySelectorAll('.btn.mode').forEach(b => b.onclick = () => { S.sfx.tap(); setMode(b.dataset.mode); });
$('wcWord').onclick = () => { const r = ++runId; if (activeWord) { cur.cards[activeWord].tapT = now(); S.say(aid.word(cur.L.id, activeWord)); } };
$('wcSent').onclick = () => { ++runId; if (activeWord) S.say(aid.sent(cur.L.id, activeWord)); };
$('wcSlow').onclick = async () => { const my = ++runId; if (!activeWord) return; await S.say(aid.word(cur.L.id, activeWord), .75); if (my !== runId) return; await wait(.3); if (my !== runId) return; S.say(aid.sent(cur.L.id, activeWord), .8); };
$('talkPlay').onclick = () => { if (talkPlaying) { runId++; S.stopVoice(); setPlayIcon(false); } else playTalk(talkIdx); };
$('talkNext').onclick = () => { const r = ++runId; setPlayIcon(false); playLine(Math.min(talkIdx + 1, cur.L.talk.length - 1), r); };
$('talkPrev').onclick = () => { const r = ++runId; setPlayIcon(false); playLine(Math.max(talkIdx - 1, 0), r); };
$('gameAsk').onclick = () => { if (game) { ++runId; S.say(aid.find(cur.L.id, game.words[game.i])); } };
$('gameAgain').onclick = () => { S.sfx.tap(); runId++; startGame(); };

// ---------------- loop ----------------
kiki.warm([{}, { mouth: .5 }, { mouth: 1 }, { eyes: 'closed' }]); momo.warm([{}, { mouth: .5 }, { mouth: 1 }, { eyes: 'closed' }]);
buildContents();
let last = now(), READY_SHOWN = false;
function frame() {
  const t = now(), dt = Math.min(.1, t - last); last = t;
  book.setOpen(Math.PI / 2 * eio(seg(t, openT, openT + 1.8)));
  lights(t);
  updatePops(t);
  if (cur) for (const c of Object.values(cur.cards)) cardFrame(c, t);
  if (talker && !S.speaking() && bubble && mode !== 'talk') { /* keep */ }
  charFrame(kiki, t); charFrame(momo, t);
  updateCam(dt);
  scene.updateMatrixWorld(true);
  placeBubble();
  post.dof.focus = cam.position.distanceTo(camCur.tgt); post.dof.aper = 3; post.dof.maxCoc = 10 * H * DPR / 1080;
  post.vig.uniforms.warm.value = .12; post.bloom.strength = .18;
  post.composer.render();
  requestAnimationFrame(frame);
}
frame();
$('loading').style.opacity = 0; setTimeout(() => show('loading', false), 600);
show('start', true); READY_SHOWN = true;
window.APP = { openBook, enterLesson, setMode, tapWord: w => tapWord(w), gameTap, playTalk, leaveLesson, get cards() { return cur && cur.cards; }, screenOf(w) { const m = w === 'kiki' || w === 'momo' ? CHAR[w].mesh : cur.cards[w].mesh, b = new THREE.Box3().setFromObject(m), v = b.getCenter(new THREE.Vector3()).project(cam); return [(v.x + 1) / 2 * W, (1 - v.y) / 2 * H]; } };
window.READY = true;
if (Q.get('lesson')) { openBook(); setTimeout(() => enterLesson(+Q.get('lesson')), 2000); }
