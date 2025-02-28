const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');
const scoreSpans = document.querySelectorAll('#score-options span');
const roundElement = document.getElementById('current-round');
const rollsElement = document.getElementById('current-round-rolls');
const totalScoreElement = document.getElementById('total-score');
const scoreHistory = document.getElementById('score-history');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');
const rulesContainer = document.querySelector('.rules-container');
const rulesBtn = document.getElementById('rules-btn');

let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let round = 1;
let rolls = 0;

const rollDice = () => {
  for (let i = 0; i < 5; i++) {
    diceValuesArr[i] = Math.floor(Math.random() * 6) + 1;
  }
  listOfAllDice.forEach((element, index) => {
    element.textContent = diceValuesArr[index];
  });
};

const updateStats = () => {
  rollsElement.textContent = rolls;
  roundElement.textContent = round;
};

const updateRadioOption = (index, score) => {
  scoreInputs[index].disabled = false;
  scoreInputs[index].value = score;
  scoreSpans[index].textContent = `, score = ${score}`;
};

const updateScore = (value, id) => {
  score += parseInt(value);
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML += `<li>${id} : ${value}</li>`;
};

const getHighestDuplicates = (array) => {
  const counts = {};
  array.forEach((num) => (counts[num] = (counts[num] || 0) + 1));

  const totalScore = array.reduce((sum, num) => sum + num, 0);
  Object.values(counts).forEach((count) => {
    if (count >= 4) {
      updateRadioOption(1, totalScore);
    }
    if (count >= 3) {
      updateRadioOption(0, totalScore);
    }
  });
};

const detectFullHouse = (array) => {
  const counts = {};
  array.forEach((num) => (counts[num] = (counts[num] || 0) + 1));

  if (Object.values(counts).includes(2) && Object.values(counts).includes(3)) {
    updateRadioOption(2, 25);
  }
};

const checkForStraights = (array) => {
  const uniqueSortedDice = [...new Set(array)].sort((a, b) => a - b).join('');

  if (uniqueSortedDice === '12345' || uniqueSortedDice === '23456') {
    updateRadioOption(4, 40);
  }
  if (
    uniqueSortedDice.includes('1234') ||
    uniqueSortedDice.includes('2345') ||
    uniqueSortedDice.includes('3456')
  ) {
    updateRadioOption(3, 30);
  }
};

const resetRadioOptions = () => {
  scoreInputs.forEach((input) => {
    input.disabled = true;
    input.checked = false;
  });
  scoreSpans.forEach((span) => {
    span.textContent = '';
  });
};

const resetGame = () => {
  listOfAllDice.forEach((element) => (element.textContent = 0));
  score = 0;
  rolls = 0;
  round = 1;
  totalScoreElement.textContent = score;
  scoreHistory.innerHTML = '';
  updateStats();
  resetRadioOptions();
};

rollDiceBtn.addEventListener('click', () => {
  if (rolls === 3) {
    alert('You have made three rolls this round. Please select a score.');
  } else {
    rolls++;
    resetRadioOptions();
    rollDice();
    updateStats();
    getHighestDuplicates(diceValuesArr);
    detectFullHouse(diceValuesArr);
    checkForStraights(diceValuesArr);
    updateRadioOption(5, 0);
  }
});

rulesBtn.addEventListener('click', () => {
  isModalShowing = !isModalShowing;
  rulesBtn.textContent = isModalShowing ? 'Hide rules' : 'Show rules ';
  rulesContainer.style.display = isModalShowing ? 'block' : 'none';
});

keepScoreBtn.addEventListener('click', () => {
  const selectedOption = document.querySelector(
    'input[name="score-options"]:checked'
  );

  if (selectedOption) {
    const value = selectedOption.value;
    const id = selectedOption.id;
    updateScore(value, id);
    resetRadioOptions();
    rolls = 0;
    round++;
    if (round > 6) {
      setTimeout(() => {
        alert(`Game Over! Your total score is ${score}`);
        resetGame();
      }, 500);
    }
  } else {
    alert('Please select a score option before continuing to the next round.');
  }
});
