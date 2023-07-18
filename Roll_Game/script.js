'use strict';

//--------------- FUNCTIONS ------------------

// random number from list
const rndDice = function () {
  return Math.ceil(Math.random() * diceList.length);
};

// switching player
const playerChange = function () {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

let current, holdScore, gameIsOn;

// starting conditions
const init = function () {
  current = 0;
  holdScore = [0, 0];
  gameIsOn = true;
  score0El.textContent = 0;
  score1El.textContent = 0;

  dice.classList.add('hidden');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
};
//--------------------------------------------

// selecting elements
const player0El = document.querySelector('.player--0');
let score0El = document.getElementById('score--0');
let current0El = document.getElementById('current--0');

const player1El = document.querySelector('.player--1');
let score1El = document.getElementById('score--1');
let current1El = document.getElementById('current--1');

const currentArr = [current0El, current1El];
const scoreArr = [score0El, score1El];

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

const dice = document.querySelector('.dice');

const diceList = [1, 2, 3, 4, 5, 6];

init();

// ROLL
btnRoll.addEventListener('click', function () {
  if (gameIsOn) {
    dice.classList.remove('hidden');
    const isActive = Number(player1El.classList.contains('player--active'));
    const num = rndDice();
    dice.src = `dice-${num}.png`;
    if (num !== 1) {
      current += num;
      currentArr[isActive].textContent = current;
    } else if (num === 1) {
      current = 0;
      currentArr[isActive].textContent = current;
      playerChange();
    }
  }
});

// HOLD
btnHold.addEventListener('click', function () {
  if (gameIsOn) {
    const isActive = Number(player1El.classList.contains('player--active'));
    holdScore[isActive] += current;
    scoreArr[isActive].textContent = holdScore[isActive];
    current = 0;
    currentArr[isActive].textContent = current;

    // WINNER
    if (holdScore[0] >= 50) {
      gameIsOn = false;
      player0El.classList.remove('player--active');
      player0El.classList.add('player--winner');
      dice.classList.add('hidden');
    } else if (holdScore[1] >= 50) {
      gameIsOn = false;
      player1El.classList.add('player--winner');
      player1El.classList.remove('player--active');
      dice.classList.add('hidden');
    }
    playerChange();
  }
});

// NEW GAME
btnNew.addEventListener('click', init);
