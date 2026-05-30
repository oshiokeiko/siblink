const canvas = document.getElementById('c');
const ctx    = canvas.getContext('2d');
const grain  = document.getElementById('grain');
const gctx   = grain.getContext('2d');

const SPEED = 1.4;

function resize() {
  const dpr = Math.min(devicePixelRatio, 2);
  canvas.width  = window.innerWidth  * dpr;
  canvas.height = window.innerHeight * dpr;
}

function buildGrain() {
  const scale = 2.0;
  const dpr = Math.min(devicePixelRatio, 2);
  const W = Math.floor(window.innerWidth  * dpr * scale);
  const H = Math.floor(window.innerHeight * dpr * scale);
  grain.width  = W;
  grain.height = H;
  grain.style.imageRendering = 'pixelated';
  const imageData = gctx.createImageData(W, H);
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const v = Math.random() > 0.5 ? (180 + (Math.random() * 75) | 0) : 0;
    data[i] = data[i+1] = data[i+2] = v;
    data[i+3] = 255;
  }
  gctx.putImageData(imageData, 0, 0);
}

resize();
buildGrain();
window.addEventListener('resize', () => { resize(); buildGrain(); });

function saturate(r, g, b, s) {
  const l = (Math.max(r, g, b) + Math.min(r, g, b)) / 2;
  return [
    Math.max(0, Math.min(255, Math.round(l + (r - l) * s))),
    Math.max(0, Math.min(255, Math.round(l + (g - l) * s))),
    Math.max(0, Math.min(255, Math.round(l + (b - l) * s)))
  ];
}

const S = 4.5;

const blobs = [
  { color: saturate(255,  50, 140, S), cx: 0.30, cy: 0.42, rx: 0.55, ry: 0.30, ax: 0.18, ay: 0.14, px: 0.0, py: 0.5, a: 0.82 },
  { color: saturate(255, 140,   0, S), cx: 0.12, cy: 0.68, rx: 0.44, ry: 0.24, ax: 0.16, ay: 0.20, px: 1.1, py: 1.8, a: 0.88 },
  { color: saturate(255, 210,   0, S), cx: 0.78, cy: 0.18, rx: 0.38, ry: 0.20, ax: 0.14, ay: 0.12, px: 3.5, py: 2.2, a: 0.82 },
  { color: saturate(255, 110,   0, S), cx: 0.06, cy: 0.16, rx: 0.34, ry: 0.28, ax: 0.12, ay: 0.16, px: 0.5, py: 4.0, a: 0.85 },
  { color: saturate( 20, 180, 255, S), cx: 0.85, cy: 0.72, rx: 0.58, ry: 0.34, ax: 0.16, ay: 0.18, px: 0.8, py: 3.1, a: 0.92 },
  { color: saturate(  0, 230, 210, S), cx: 0.50, cy: 0.08, rx: 0.62, ry: 0.24, ax: 0.22, ay: 0.14, px: 1.7, py: 0.3, a: 0.88 },
  { color: saturate(  0, 220, 190, S), cx: 0.92, cy: 0.32, rx: 0.34, ry: 0.30, ax: 0.10, ay: 0.20, px: 4.2, py: 2.7, a: 0.85 },
  { color: saturate( 30, 160, 255, S), cx: 0.64, cy: 0.35, rx: 0.36, ry: 0.50, ax: 0.14, ay: 0.22, px: 1.9, py: 3.5, a: 0.88 },
  { color: saturate(160,  60, 255, S), cx: 0.18, cy: 0.84, rx: 0.38, ry: 0.28, ax: 0.18, ay: 0.16, px: 2.9, py: 1.4, a: 0.70 },
  { color: saturate(220,   0, 170, S), cx: 0.44, cy: 0.90, rx: 0.44, ry: 0.20, ax: 0.20, ay: 0.12, px: 3.3, py: 0.7, a: 0.65 },
  { color: saturate( 20, 190, 255, S), cx: 0.50, cy: 0.50, rx: 0.92, ry: 0.80, ax: 0.05, ay: 0.05, px: 0.2, py: 0.8, a: 0.52 },
  { color: saturate(255,  60, 150, S), cx: 0.50, cy: 0.50, rx: 0.88, ry: 0.72, ax: 0.06, ay: 0.04, px: 1.3, py: 2.1, a: 0.38 },
];

function drawBlob(x, y, rx, ry, color, alpha) {
  ctx.save();
  ctx.translate(x, y);
  const grad = ctx.createRadialGradient(0, 0, 0, 0, 0, 1);
  const [r, g, b] = color;
  grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha})`);
  grad.addColorStop(0.45, `rgba(${r},${g},${b},${alpha * 0.6})`);
  grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
  ctx.scale(rx, ry);
  ctx.fillStyle = grad;
  ctx.beginPath();
  ctx.arc(0, 0, 1, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function draw(t) {
  const W = canvas.width;
  const H = canvas.height;
  ctx.clearRect(0, 0, W, H);
  const base = ctx.createLinearGradient(0, 0, W, H);
  base.addColorStop(0,    '#ff0077');
  base.addColorStop(0.35, '#ff8800');
  base.addColorStop(0.65, '#0099ff');
  base.addColorStop(1,    '#00ffcc');
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);
  for (const b of blobs) {
    const x = (b.cx + Math.sin(t * SPEED + b.px) * b.ax) * W;
    const y = (b.cy + Math.cos(t * SPEED + b.py) * b.ay) * H;
    drawBlob(x, y, b.rx * W, b.ry * H, b.color, b.a);
  }
}

const start = performance.now();
function loop() {
  requestAnimationFrame(loop);
  draw((performance.now() - start) / 1000);
}
loop();

// スクロールフェードイン
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

document.querySelectorAll('.fade-in').forEach((el, i) => {
  el.style.transitionDelay = `${i * 0.08}s`;
  fadeObserver.observe(el);
});

// スクロールでテキストをフェードイン
const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      slideObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up').forEach(el => slideObserver.observe(el));

// Header: セクションに応じて文字色切り替え
const headerEl = document.getElementById('header');
const darkIds = ['hero-message', 'about', 'footer'];
const sectionOrder = ['hero-message', 'news', 'about', 'interview', 'footer'];

function updateHeaderColor() {
  const scrollTop = window.scrollY + 80;
  let isDark = true;
  for (const id of sectionOrder) {
    const el = document.getElementById(id);
    if (el && el.offsetTop <= scrollTop) {
      isDark = darkIds.includes(id);
    }
  }
  headerEl.classList.toggle('header-dark',  isDark);
  headerEl.classList.toggle('header-light', !isDark);
}

window.addEventListener('scroll', updateHeaderColor, { passive: true });
updateHeaderColor();

// ハンバーガーメニュー
const spMenu      = document.getElementById('sp-menu');
const spMenuClose = document.getElementById('sp-menu-close');

document.getElementById('hamburger').addEventListener('click', () => {
  spMenu.classList.add('open');
  document.body.style.overflow = 'hidden';
});

spMenuClose.addEventListener('click', () => {
  spMenu.classList.remove('open');
  document.body.style.overflow = '';
});

spMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    spMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});
