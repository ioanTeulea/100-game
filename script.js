"use strict";
const score0El = document.querySelector("#score--0");
const score1El = document.getElementById("score--1");
score0El.textContent = 0;
score1El.textContent = 0;
const diceEl = document.querySelector(".dice");
const newBtn = document.querySelector(".btn--new");
const holdBtn = document.querySelector(".btn--hold");
const rollBtn = document.querySelector(".btn--roll");
const current0El = document.getElementById("current--0");
const current1El = document.getElementById("current--1");
const player0 = document.querySelector(".player--0");
const player1 = document.querySelector(".player--1");
let playing, currentScore, activePlayer, scores;
const init = function () {
  playing = true;
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add("hidden");
  player0.classList.remove("player--winner");
  player1.classList.remove("player--winner");
  player0.classList.add("player--active");
  player1.classList.remove("player--active");
};
init();
const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0.classList.toggle("player--active");
  player1.classList.toggle("player--active");
  currentScore = 0;
};

rollBtn.addEventListener("click", function () {
  if (playing) {
    const rndNumber = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove("hidden");
    diceEl.src = `imagini-zar/dice-${rndNumber}.png`;
    if (rndNumber !== 1) {
      currentScore += rndNumber;
      document.getElementById(
        `current--${activePlayer}`
      ).textContent = currentScore;

      console.log(currentScore);
    } else {
      switchPlayer();
    }
  }
});
holdBtn.addEventListener("click", function () {
  if (playing) {
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    if (scores[activePlayer] >= 100) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else switchPlayer();
  }
});
newBtn.addEventListener("click", init);
