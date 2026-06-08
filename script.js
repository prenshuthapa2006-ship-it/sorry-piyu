// Star Constellation Background
const starsCanvas = document.getElementById('stars');
const starsCtx = starsCanvas.getContext('2d');
let stars = [];

function resizeStarsCanvas() {
  starsCanvas.width = window.innerWidth;
  starsCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeStarsCanvas);
resizeStarsCanvas();

class Star {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * starsCanvas.width;
    this.y = Math.random() * starsCanvas.height;
    this.size = Math.random() * 2 + 0.5;
    this.baseAlpha = Math.random() * 0.5 + 0.3;
    this.alpha = this.baseAlpha;
    this.twinkleSpeed = Math.random() * 0.02 + 0.005;
    this.twinklePhase = Math.random() * Math.PI * 2;
    this.color = Math.random() > 0.7 ? '#ff6b9d' : '#ffffff';
  }

  update() {
    this.twinklePhase += this.twinkleSpeed;
    this.alpha = this.baseAlpha + Math.sin(this.twinklePhase) * 0.3;
    this.alpha = Math.max(0.1, Math.min(1, this.alpha));
  }

  draw() {
    starsCtx.beginPath();
    starsCtx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    starsCtx.fillStyle = this.color;
    starsCtx.globalAlpha = this.alpha;
    starsCtx.fill();

    // Add glow for larger stars
    if (this.size > 1.5) {
      starsCtx.beginPath();
      starsCtx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      starsCtx.fillStyle = this.color;
      starsCtx.globalAlpha = this.alpha * 0.3;
      starsCtx.fill();
    }
  }
}

// Create stars
for (let i = 0; i < 200; i++) {
  stars.push(new Star());
}

function animateStars() {
  starsCtx.clearRect(0, 0, starsCanvas.width, starsCanvas.height);
  starsCtx.globalCompositeOperation = 'lighter';

  stars.forEach(star => {
    star.update();
    star.draw();
  });

  starsCtx.globalCompositeOperation = 'source-over';
  requestAnimationFrame(animateStars);
}

animateStars();

// Falling Petals
const petalsContainer = document.getElementById('petalsContainer');

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');

  const startX = Math.random() * 100;
  petal.style.left = startX + 'vw';

  const duration = 8 + Math.random() * 6;
  petal.style.animationDuration = duration + 's';

  petal.style.animationDelay = Math.random() * 3 + 's';

  const size = 14 + Math.random() * 10;
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';

  const colors = [
    'linear-gradient(135deg, #ff6b9d, #ff4757)',
    'linear-gradient(135deg, #ff8a9b, #ff6b9d)',
    'linear-gradient(135deg, #ff4757, #ff6b81)',
    'linear-gradient(135deg, #ff9a8b, #ff6b9d)'
  ];
  petal.style.background = colors[Math.floor(Math.random() * colors.length)];

  const initialRotation = Math.random() * 360;
  petal.style.transform = `rotate(${initialRotation}deg)`;

  petalsContainer.appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, (duration + 3) * 1000);
}

// Create petals continuously
setInterval(createPetal, 350);

// Initial batch
for (let i = 0; i < 12; i++) {
  setTimeout(createPetal, i * 150);
}

// Confetti
const confettiCanvas = document.getElementById('confetti');
const ctx = confettiCanvas.getContext('2d');
let confettiPieces = [];
let confettiAnimationId = null;

function resizeConfetti() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeConfetti);
resizeConfetti();

function createConfetti() {
  const colors = ['#ff6b9d', '#ff4757', '#ff8a9b', '#ffd93d', '#ff9a8b', '#fff'];
  return {
    x: Math.random() * confettiCanvas.width,
    y: -15,
    size: 6 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 2 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 2,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 15
  };
}

function drawConfetti() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  confettiPieces.forEach((piece, index) => {
    piece.y += piece.speed;
    piece.x += piece.drift;
    piece.rotation += piece.rotationSpeed;

    ctx.save();
    ctx.translate(piece.x, piece.y);
    ctx.rotate((piece.rotation * Math.PI) / 180);
    ctx.fillStyle = piece.color;
    ctx.globalAlpha = 0.9;
    ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
    ctx.restore();

    if (piece.y > confettiCanvas.height + 20) {
      confettiPieces[index] = createConfetti();
    }
  });

  confettiAnimationId = requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  if (confettiAnimationId) return;

  confettiPieces = Array.from({ length: 120 }, createConfetti);
  drawConfetti();

  setTimeout(() => {
    if (confettiAnimationId) {
      cancelAnimationFrame(confettiAnimationId);
      confettiAnimationId = null;
    }
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 6000);
}

// Forgive Button
const forgiveBtn = document.getElementById('forgiveBtn');
const messageBox = document.querySelector('.message-box');
const thankYou = document.getElementById('thankYou');
const heart = document.getElementById('heart');

forgiveBtn.addEventListener('click', () => {
  // Hide message and button
  messageBox.style.display = 'none';
  forgiveBtn.style.display = 'none';

  // Show thank you
  thankYou.classList.add('show');

  // Heart celebration - pulse bigger and glow more
  heart.style.animation = 'heartbeat 0.5s ease-in-out infinite';
  heart.style.boxShadow = '0 0 60px rgba(255, 71, 87, 0.8), 0 0 100px rgba(255, 107, 157, 0.6)';

  // Start confetti
  startConfetti();
});

// Also allow clicking the heart
heart.addEventListener('click', () => {
  if (forgiveBtn.style.display !== 'none') {
    forgiveBtn.click();
  }
});