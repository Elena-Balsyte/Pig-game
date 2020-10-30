'use strict';

// Selecting elements
const diceEl = document.querySelector('.dice');
const player0Div = document.querySelector('.player--0');
const player1Div = document.querySelector('.player--1');
const score = document.querySelectorAll('.score'); //the score contains two p elements to display total score of a player
const currentScore = document.querySelectorAll('.current-score'); //the currentScore contains two p elements
const btnRollDice = document.querySelector('.btn--roll');
const btnNewGame = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
let diceScore = 0;
let score0;
let score1;
const diceImg = [
  'dice-1.png',
  'dice-2.png',
  'dice-3.png',
  'dice-4.png',
  'dice-5.png',
  'dice-6.png',
];

// Starting conditions: Score is 0, and dice is hidden
const reset = function () {
  score0 = 0;
  score1 = 0;
  score[0].textContent = score0;
  score[1].textContent = score1;
  currentScore[0].textContent = '0';
  currentScore[1].textContent = '0';
  diceEl.classList.add('hidden');
  player0Div.classList.add('player--active');
  if (player0Div.classList.contains('player--winner')) {
    player0Div.classList.remove('player--winner');
  } else if (player1Div.classList.contains('player--winner')) {
    player1Div.classList.remove('player--winner');
  }
};

reset();

// switchPlayer() function

const switchPlayer = function () {
  if (player0Div.classList.contains('player--active')) {
    player0Div.classList.remove('player--active');
    player1Div.classList.add('player--active');
    diceScore = 0;
    currentScore[0].textContent = diceScore;
  } else if (player1Div.classList.contains('player--active')) {
    player1Div.classList.remove('player--active');
    player0Div.classList.add('player--active');
    diceScore = 0;
    currentScore[1].textContent = diceScore;
  }
};

/* Roll dice function :
   - generate random number from 0-5
   - use random number to set the diceEl src
   - take value of a dice and add it to currentScore0
   */

const rollDice = function () {
  if (score0 < 100 && score1 < 100) {
    let counter = Math.trunc(Math.random() * 6); //random number from 0 to 5
    diceEl.src = diceImg[counter]; // set src of a dice image
    diceEl.classList.remove('hidden'); // make dice img visible

    if (counter !== 0 && player0Div.classList.contains('player--active')) {
      diceScore += counter + 1; //add value of dice to the diceScore
      currentScore[0].textContent = diceScore;
      //if counter is not 0 and player2 is active, add points to currentScore[0]
    } else if (
      counter !== 0 &&
      player1Div.classList.contains('player--active')
    ) {
      diceScore += counter + 1;
      currentScore[1].textContent = diceScore;
      //if counter is = 0 than switch player
    } else if (
      counter === 0 &&
      player0Div.classList.contains('player--active')
    ) {
      switchPlayer();
    } else if (
      counter === 0 &&
      player1Div.classList.contains('player--active')
    ) {
      switchPlayer();
    }
  } // hide dice img if there is a winner
  else if (score0 >= 100 || score1 >= 100) {
    diceEl.classList.add('hidden');
  }
};

// holdScore function
const holdScore = function () {
  // if player1 is active add diceScore to players score
  if (player0Div.classList.contains('player--active')) {
    score0 += diceScore;
    score[0].textContent = score0;
    //if player1 is not a winner yet switch player
    if (score0 < 100) {
      switchPlayer();
      //if player1 is a winner, add winner class and hide the dice img
    } else if (score0 >= 100) {
      player0Div.classList.remove('player--active');
      player0Div.classList.add('player--winner');
      diceEl.classList.add('hidden');
    }
    // if player2 is active add diceScore to players score
  } else if (player1Div.classList.contains('player--active')) {
    score1 += diceScore;
    score[1].textContent = score1;
    //if player2 is not a winner yet, switch player
    if (score1 < 100) {
      switchPlayer();
      //if player2 is a winner, add winner class and hide the dice img
    } else if (score1 >= 100) {
      player1Div.classList.remove('player--active');
      player1Div.classList.add('player--winner');
      diceEl.classList.add('hidden');
    }
  }
};

// New game button functionality
btnNewGame.addEventListener('click', reset);
// Roll dice button functionality
btnRollDice.addEventListener('click', rollDice);
// Hold button functionality
btnHold.addEventListener('click', holdScore);
