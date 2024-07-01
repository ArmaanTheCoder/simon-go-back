const buttons = document.querySelectorAll('.btn');
const show = document.querySelector('.level');
const highScoreDisplay = document.querySelector('.level2');
const show1 = document.querySelector('.show1');
const show2 = document.querySelector('.show2');
const btn = document.querySelector('.start');
let highScore;
let showNo;
const gamePattern = [];
let userPattern = [];
let level = 0;
let a = 0;

btn.addEventListener("click", () => {

  if (a = 1) {
    level = 0;
    show.innerText = "0";
    gamePattern.length = 0;
    nextSequence();
    btn.disabled = true;
  }
  else {
    checkAnswer(userPattern.length - 1);
    btn.disabled = true;
  }

})

function nextSequence() {
  highScore  = Number(highScoreDisplay.innerText);
  show1.style.opacity = "1";
  showNo = show.innerText;
  showNo = Number(showNo);
  show.innerText = showNo + 1;
  userPattern = [];
  level++;
  const randomColor = buttons[Math.floor(Math.random() * 4)].id;
  gamePattern.push(randomColor);
  if(showNo > highScore){
    highScoreDisplay.textContent = showNo;
  }
  else {
    highScoreDisplay.textContent = highScore;
  }
  showSequence();
}

function showSequence() {
  let delay = 0;
  gamePattern.forEach((color, index) => {
    setTimeout(() => {
      playSound(color);
      animatePress(color);
    }, delay);
    delay += 600;
  });
}

function playSound(color) {
  const audio = new Audio(`${color}.mp3`);
  audio.play();
}

function animatePress(color) {
  const button = document.getElementById(color);
  button.classList.add('active');
  setTimeout(() => {
    button.classList.remove('active');
  }, 200);
}

function checkAnswer(currentLevel) {


  if (gamePattern[currentLevel] === userPattern[currentLevel]) {
    if (userPattern.length === gamePattern.length) {
      setTimeout(nextSequence, 1000);
    }
  } else {
    playSound('wrong');
    alert('Game Over! Press OK to restart.');
    startOver();
  }


}

function startOver() {
  btn.disabled = false;
  a = 1;
  btn.innerText = "Restart";
}

buttons.forEach(button => {
  button.addEventListener('click', (e) => {
    const userChosenColor = e.target.id;
    userPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userPattern.length - 1);
  });
});

document.addEventListener('keydown', () => {
  if (level === 0) {
    nextSequence();
  }
});
