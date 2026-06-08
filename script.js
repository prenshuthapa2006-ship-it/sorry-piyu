// Create falling petals
const petalsContainer = document.querySelector('.petals');

function createPetal() {
  const petal = document.createElement('div');
  petal.classList.add('petal');
  petal.style.left = Math.random() * 100 + 'vw';
  petal.style.animationDuration = (8 + Math.random() * 4) + 's';
  petal.style.animationDelay = Math.random() * 3 + 's';

  const colors = ['#ff6b9d', '#ff8a9b', '#ff4757', '#ff9a8b'];
  petal.style.background = colors[Math.floor(Math.random() * colors.length)];

  petalsContainer.appendChild(petal);

  setTimeout(() => petal.remove(), 12000);
}

// Create petals
setInterval(createPetal, 400);
for (let i = 0; i < 10; i++) createPetal();

// Button click
const btn = document.getElementById('forgive');
const success = document.getElementById('success');
const heart = document.getElementById('heart');
const message = document.querySelector('.message');

btn.addEventListener('click', () => {
  message.style.display = 'none';
  btn.style.display = 'none';
  success.classList.add('show');
  heart.style.animation = 'beat 0.5s ease-in-out infinite';
});

heart.addEventListener('click', () => {
  if (btn.style.display !== 'none') btn.click();
});