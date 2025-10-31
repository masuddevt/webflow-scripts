<script>
const startBtn = document.getElementById('startBtn');
const playerInput = document.getElementById('playerName');
const introText = document.getElementById('intro-text');
const welcomeEl = document.getElementById('welcome');
const instructionsEl = document.getElementById('instructions');
const gameUI = document.getElementById('game-ui');
const gameArea = document.getElementById('game-area');
const basket = document.getElementById('basket');
const scoreEl = document.getElementById('snack-score');
const timerEl = document.getElementById('timer');
const gameOverEl = document.getElementById('game-over');
const resetBtn = document.getElementById('resetBtn');

let playerName = "Player";
let score = 0;
let basketX = 170;
const basketWidth = 60;
let snacks = [];
let gameTime = 60;
let spawnInterval, gameInterval;
let basketSpeed = 20;
let snackSpeed = 2;

const snackTypes = [
  {emoji: '🍎', type: 'healthy'},
  {emoji: '🥕', type: 'healthy'},
  {emoji: '🍩', type: 'junk'},
  {emoji: '🍟', type: 'junk'},
  {emoji: '🍌', type: 'healthy'},
  {emoji: '🍫', type: 'junk'}
];

// Start Game after entering name
startBtn.addEventListener('click', () => {
  playerName = playerInput.value.trim() || "Player";
  // Hide input and start button
  playerInput.style.display = 'none';
  startBtn.style.display = 'none';
  introText.style.display = 'none';
  
  // Show welcome and instructions
  welcomeEl.textContent = `Okay, ${playerName}! Let's start!`;
  welcomeEl.style.display = 'block';
  instructionsEl.style.display = 'block';
  
  // Start game after short delay (3 seconds)
  setTimeout(() => {
    welcomeEl.style.display = 'none';
    instructionsEl.style.display = 'none';
    gameUI.style.display = 'block';
    startGame();
  }, 3000);
});

function startGame() {
  score = 0;
  snackSpeed = 2;
  gameTime = 60;
  snacks.forEach(s => s.remove());
  snacks = [];
  scoreEl.textContent = 'Score: 0';
  timerEl.textContent = 'Time: 60s';
  gameOverEl.style.display = 'none';
  gameOverEl.textContent = '';

  spawnInterval = setInterval(spawnSnack, 1000);
  gameInterval = setInterval(() => {
    gameTime--;
    timerEl.textContent = 'Time: ' + gameTime + 's';
    snackSpeed += 0.05; // Gradually faster
    if (gameTime <= 0) endGame();
  }, 1000);

  requestAnimationFrame(fallSnacks);
}

// Basket control
document.addEventListener('keydown', e => {
  if (gameTime <= 0) return;
  if (e.key === 'ArrowLeft') basketX = Math.max(0, basketX - basketSpeed);
  if (e.key === 'ArrowRight') basketX = Math.min(340, basketX + basketWidth);
  basket.style.left = basketX + 'px';
});

function spawnSnack() {
  const snack = snackTypes[Math.floor(Math.random() * snackTypes.length)];
  const snackEl = document.createElement('div');
  snackEl.textContent = snack.emoji;
  snackEl.dataset.type = snack.type;
  snackEl.style.position = 'absolute';
  snackEl.style.top = '0px';
  snackEl.style.left = Math.floor(Math.random() * 340) + 'px';
  snackEl.style.fontSize = '30px';
  gameArea.appendChild(snackEl);
  snacks.push(snackEl);
}

function fallSnacks() {
  snacks.forEach((snackEl, index) => {
    let top = parseFloat(snackEl.style.top);
    top += snackSpeed;

    const snackLeft = parseFloat(snackEl.style.left);
    if (top + 30 >= 390 && snackLeft + 30 > basketX && snackLeft < basketX + basketWidth) {
      if (snackEl.dataset.type === 'healthy') score += 1;
      else score = Math.max(0, score - 1);
      scoreEl.textContent = 'Score: ' + score;
      snackEl.remove();
      snacks.splice(index, 1);
    } else if (top >= 400) {
      snackEl.remove();
      snacks.splice(index, 1);
    } else {
      snackEl.style.top = top + 'px';
    }
  });
  if (gameTime > 0) requestAnimationFrame(fallSnacks);
}

function endGame() {
  clearInterval(spawnInterval);
  clearInterval(gameInterval);

  if(score < 10) {
    gameOverEl.style.color = 'red';
    gameOverEl.textContent = `Ha ha ha, ${playerName} you are a loser! 😢 Your score: ${score}`;
  } else {
    gameOverEl.style.color = 'green';
    gameOverEl.textContent = `Well done, ${playerName}! You are a hero! 🏆 Your score: ${score}`;
  }
  gameOverEl.style.display = 'block';
}

resetBtn.addEventListener('click', () => {
  clearInterval(spawnInterval);
  clearInterval(gameInterval);
  snacks.forEach(s => s.remove());
  snacks = [];
  gameUI.style.display = 'none';
  playerInput.style.display = 'inline-block';
  startBtn.style.display = 'inline-block';
  introText.style.display = 'block';
  welcomeEl.style.display = 'none';
  instructionsEl.style.display = 'none';
  playerInput.value = '';
});
</script>
