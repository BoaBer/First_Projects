'use strict';

///////////////////////////////////// FUNCTIONS /////////////////////////////////

// random number
const randomNum = function () {
  return (document.querySelector('.number').value = Math.ceil(
    Math.random(0, 1) * 20
  ));
};

// text message
const message = function (text) {
  document.querySelector('.message').textContent = text;
};

// score
const scoreFun = function (scr) {
  document.querySelector('.score').textContent = scr;
};

// number
const numberFun = function (text) {
  document.querySelector('.number').textContent = text;
};

/////////////////////////////////////////////////////////////////////////////////

// game is on
let game_is_on = true;

// random number
let numToGuess = randomNum();
console.log(numToGuess);

// highscore
let highscore = 0;

// score
let score = 20;

// btn clicked
document.querySelector('.check').addEventListener('click', function () {
  if (game_is_on) {
    // save value chose by player to a variable
    const playerNumber = Number(document.querySelector('.guess').value);

    // player chose value out of range
    if (playerNumber > 20 || playerNumber < 1) {
      message('😒 You are out of range!');

      // player chose number in range
    } else if (playerNumber > 0 && playerNumber < 21) {
      // number was the right one
      if (playerNumber === numToGuess) {
        message('You are right! Good job 🥳');
        numberFun(numToGuess);
        document.body.style.backgroundColor = '#32cd32';
        document.querySelector('.number').style.width = '30rem';
        game_is_on = false;
        if (highscore < score) {
          highscore = score;
          document.querySelector('.highscore').textContent = highscore;
        }
      } else if (playerNumber !== numToGuess) {
        if (score > 1) {
          // number was too hight
          // if (playerNumber > numToGuess) {
          message(
            playerNumber > numToGuess
              ? 'You are too high, you should go down 👇'
              : 'You are too low, you should go up 👆'
          );
          score -= 1;
          scoreFun(score);
        } else {
          message('☠️ You lost the game!');
          document.querySelector('.score').textContent = 0;
          document.body.style.backgroundColor = 'red';
          numberFun(numToGuess);
          game_is_on = false;
        }
      }
    }
  }
});

//  reseting the game
document.querySelector('.again').addEventListener('click', function () {
  numToGuess = randomNum();
  console.log(numToGuess);
  document.body.style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  score = 20;
  scoreFun(score);
  message('Start guessing...');
  numberFun('?');
  document.querySelector('.guess').value = '';
  game_is_on = true;
});
