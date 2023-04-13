const cards = document.querySelectorAll(".card");

// Make WHITE
cards.forEach(function (card) {
  card.querySelector(":first-child").style.display = "none";
});

let firstCard, secondCard;
let hasBeenFlipped = false;
let pause = false;

function flipCard() {
  if (this === firstCard) {
    return;
  }

  if (pause) {
    return;
  }
  this.querySelector(":first-child").style.display = "block";

  if (!hasBeenFlipped) {
    firstCard = this;
    hasBeenFlipped = true;
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
      }, 1500);
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

(function shuffle() {
  cards.forEach(function (card) {
    let x = Math.trunc(Math.random() * 12);
    card.style.order = x;
  });
})();
