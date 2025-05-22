const cards = document.querySelectorAll(".card"),
    timeTag = document.querySelector(".time span b"),
    flipsTag = document.querySelector(".flips span b"),
    refreshBtn = document.querySelector(".details button"),
    gameMessage = document.querySelector(".game-message");

let maxTime = 20;
let timeLeft = maxTime;
let flips = 0;
let matchedCards = 0;
let disableDeck = false;
let isPlaying = false;
let cardOne, cardTwo, timer;

function initTimer() {
    if (timeLeft <= 0) {
        clearInterval(timer);
        showGameMessage("Temps écoulé !😢", "lose");
        return;
    }
    timeLeft--;
    timeTag.innerText = timeLeft;
}

function flipCard({ target }) {
    console.log("Card clicked:"); // AJOUTE ICI
    const clickedCard = target.closest(".card");
    if (!clickedCard || clickedCard.classList.contains("flip")) return;

    if (!isPlaying) {
        isPlaying = true;
        timer = setInterval(initTimer, 1000);
    }
    if (clickedCard !== cardOne && !disableDeck && timeLeft > 0) {
        flips++;
        flipsTag.innerText = flips;
        clickedCard.classList.add("flip");
        if (!cardOne) {
            return (cardOne = clickedCard);
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneIcon = cardOne.querySelector(".back-view i").classList.value;
        let cardTwoIcon = cardTwo.querySelector(".back-view i").classList.value;
        matchCards(cardOneIcon, cardTwoIcon);
    }
}

function matchCards(icon1, icon2) {
    if (icon1 === icon2) {
        matchedCards++;
        if (matchedCards == 6 && timeLeft > 0) {
            clearInterval(timer);
            showGameMessage("Bravo ! Vous avez gagné 🎉", "win");
            return;
        }
        cardOne.removeEventListener("click", flipCard);
        cardTwo.removeEventListener("click", flipCard);
        cardOne = cardTwo = "";
        return (disableDeck = false);
    }

    setTimeout(() => {
        cardOne.classList.add("shake");
        cardTwo.classList.add("shake");
    }, 400);

    setTimeout(() => {
        cardOne.classList.remove("shake", "flip");
        cardTwo.classList.remove("shake", "flip");
        cardOne = cardTwo = "";
        disableDeck = false;
    }, 1200);
}

function shuffleCards() {
    timeLeft = maxTime;
    flips = matchedCards = 0;
    cardOne = cardTwo = "";
    clearInterval(timer);
    timeTag.innerText = timeLeft;
    flipsTag.innerText = flips;
    disableDeck = isPlaying = false;
    gameMessage.className = "game-message hidden";
    gameMessage.textContent = "";

    let arr = [
        "bxl-html5",
        "bxl-css3",
        "bxl-javascript",
        "bxl-angular",
        "bxl-react",
        "bxl-vuejs",
        "bxl-html5",
        "bxl-css3",
        "bxl-javascript",
        "bxl-angular",
        "bxl-react",
        "bxl-vuejs",
    ];
    arr.sort(() => (Math.random() > 0.5 ? 1 : -1));

    cards.forEach((card, index) => {
        card.classList.remove("flip");
        let iconTag = card.querySelector(".back-view i");
        setTimeout(() => {
            iconTag.className = `bx ${arr[index]}`;
        }, 500);
        card.addEventListener("click", flipCard);
    });
}

function showGameMessage(text, type) {
    gameMessage.textContent = text;
    gameMessage.className = `game-message show ${
        type === "lose" ? "lose" : ""
    }`;
}

shuffleCards();

refreshBtn.addEventListener("click", shuffleCards);

cards.forEach((card) => {
    card.addEventListener("click", flipCard);
});
