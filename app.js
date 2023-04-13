const cards = document.querySelectorAll(".card");

// Reset all Cards to White
cards.forEach(function (card) {
  card.querySelector(":first-child").style.display = "none";
});

let firstCard, secondCard;
let hasBeenFlipped = false;
let pause = false;

function flipCard() {
  if (pause) {
    return;
  }
  if (this === firstCard) {
    return;
  }

  this.querySelector(":first-child").style.display = "block";

  if (!hasBeenFlipped) {
    hasBeenFlipped = true;
    firstCard = this;
  } else {
    secondCard = this;

    if (firstCard.dataset.framework === secondCard.dataset.framework) {
      firstCard.removeEventListener("click", flipCard);
      secondCard.removeEventListener("click", flipCard);
      reset();
    } else {
      pause = true;
      setTimeout(function () {
        firstCard.querySelector(":first-child").style.display = "none";
        secondCard.querySelector(":first-child").style.display = "none";
        reset();
      }, 1000);
    }
  }
}

cards.forEach(function (card) {
  card.addEventListener("click", flipCard);
});

function reset() {
  [firstCard, secondCard] = [null, null];
  [hasBeenFlipped, pause] = [false, false];
}

// First RESET Board
(function shuffle() {
  cards.forEach(function (card) {
    let randomPos = Math.floor(Math.random() * 12);
    card.style.order = randomPos;
  });
})();
