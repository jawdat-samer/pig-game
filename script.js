'use strict';

// Selecting elements
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const btnRoll = document.querySelector('.btn--roll');

score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

const score = [0, 0];
let currentScore = 0;
let activePlayer = 0;
let playing = true;

const switchPlayer = function () {
    document.getElementById(`current--${activePlayer}`).textContent = 0;
    currentScore = 0;
    activePlayer = activePlayer === 0 ? 1 : 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
};

const reset = function () {
    score0El.textContent = 0;
    score1El.textContent = 0;
    current0El.textContent = 0;
    current1El.textContent = 0;

    score[0] = 0;
    score[1] = 0;
    currentScore = 0;

    player0El.classList.add('player--active');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--active');
    player1El.classList.remove('player--winner');

    activePlayer = 0;
    playing = true;
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
    if (playing) {
        // 1. Generating a random dice roll
        const dice = Math.trunc(Math.random() * 6) + 1;

        // 2. Display dice
        diceEl.classList.remove('hidden');
        diceEl.src = `dice-${dice}.png`;

        // 3. Check for rolled 1, if true, switch to next player
        if (dice !== 1) {
            // add dice to current score
            currentScore += dice;
            document.getElementById(`current--${activePlayer}`).textContent = currentScore;
        } else {
            // Switch to next player
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function () {
    if (playing) {
        // add current score to active player score
        score[activePlayer] += currentScore;
        document.getElementById(`score--${activePlayer}`).textContent = score[activePlayer];

        // check if player score is >= 100
        if (score[activePlayer] >= 100) {
            // finish the game
            playing = false;
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
            if (activePlayer === 0) {
                document.getElementById(`score--0`).textContent = 'Winner';
                document.getElementById(`score--1`).textContent = 'Loser';
            } else {
                document.getElementById(`score--1`).textContent = 'Winner';
                document.getElementById(`score--0`).textContent = 'Loser';
            }
            diceEl.classList.add('hidden');
        } else {
            // switch to next player
            switchPlayer();
        }
    }
});

btnNew.addEventListener('click', reset);
