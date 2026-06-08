// Falling Petals
const petalsContainer = document.getElementById('petalsContainer');
const petalsContainer2 = document.getElementById('petalsContainer2');
let petalCount = 30;

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');

  // Random position
  petal.style.left = Math.random() * 100 + 'vw';

  // Random animation duration
  const duration = 8 + Math.random() * 8;
  petal.style.animationDuration = duration + 's';

  // Random delay
  petal.style.animationDelay = Math.random() * 10 + 's';

  // Random size
  const size = 15 + Math.random() * 15;
  petal.style.width = size + 'px';
  petal.style.height = size + 'px';

  // Random color variation
  const colors = ['#ff6b9d', '#ff8a9b', '#ff4757', '#ff6b81'];
  petal.style.background = `linear-gradient(135deg, ${colors[Math.floor(Math.random() * colors.length)]}, ${colors[Math.floor(Math.random() * colors.length)]})`;

  // Random rotation
  petal.style.transform = `rotate(${Math.random() * 360}deg)`;

  petalsContainer.appendChild(petal);

  // Remove petal after animation
  setTimeout(() => {
    petal.remove();
  }, duration * 1000);
}

// Create petals continuously
setInterval(createPetal, 400);

// Initial batch
for (let i = 0; i < 15; i++) {
  setTimeout(createPetal, i * 200);
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
  const colors = ['#ff6b9d', '#ff4757', '#ff6b81', '#ffd93d', '#6bcb77', '#4d96ff'];
  return {
    x: Math.random() * confettiCanvas.width,
    y: -10,
    size: 8 + Math.random() * 8,
    color: colors[Math.floor(Math.random() * colors.length)],
    speed: 3 + Math.random() * 4,
    drift: (Math.random() - 0.5) * 3,
    rotation: Math.random() * 360,
    rotationSpeed: (Math.random() - 0.5) * 10
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
    ctx.fillRect(-piece.size / 2, -piece.size / 4, piece.size, piece.size / 2);
    ctx.restore();

    // Remove if off screen
    if (piece.y > confettiCanvas.height + 20) {
      confettiPieces[index] = createConfetti();
    }
  });

  confettiAnimationId = requestAnimationFrame(drawConfetti);
}

function startConfetti() {
  if (confettiAnimationId) return;

  confettiPieces = Array.from({ length: 150 }, createConfetti);
  drawConfetti();

  // Stop after 5 seconds
  setTimeout(() => {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
  }, 5000);
}

// Forgive Button
const forgiveBtn = document.getElementById('forgiveBtn');
const messageContainer = document.getElementById('messageContainer');
const thankYou = document.getElementById('thankYou');
const heart = document.getElementById('heart');

forgiveBtn.addEventListener('click', () => {
  // Hide message and button
  messageContainer.style.display = 'none';
  forgiveBtn.style.display = 'none';

  // Show thank you
  thankYou.classList.add('show');

  // Change heart color
  heart.style.background = 'linear-gradient(135deg, #6bcb77, #4caf50)';
  heart.style.boxShadow = '0 0 60px rgba(107, 203, 119, 0.6)';

  // Start confetti
  startConfetti();
});

// Also allow clicking the heart
heart.addEventListener('click', () => {
  if (forgiveBtn.style.display !== 'none') {
    forgiveBtn.click();
  }
});