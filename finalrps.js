let score = JSON.parse(localStorage.getItem("score"));
let isAutoPlaying = false;
let intervalId;

if (score === null) {
  score = {
    wins: 0,
    losses: 0,
    ties: 0,
  };
}

updateScoreElement();
document.querySelector(".js-result").innerHTML = results;
document.querySelector(
  ".js-moves"
).innerHTML = `You ${playerMove} - ${computerMove} Computer`;

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else {
    computerMove = "scissors";
  }

  return computerMove;
}

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGame(playerMove);
    }, 1000);
    isAutoPlaying = true;
    document.querySelector(".ap-button").innerHTML = "Stop Play";
  } else {
    clearInterval(intervalId);
    isAutoPlaying = false;
    document.querySelector('.ap-button').innerHTML = 'Auto Play'
  }
}

function playGame(playerMove) {
  const computerMove = pickComputerMove();
  let results = "";

  if (playerMove === "rock") {
    if (computerMove === "rock") {
      results = "Tie";
    } else if (computerMove === "paper") {
      results = "You Lose";
    } else if (computerMove === "scissors") {
      results = "You Win";
    }
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      results = "You Win";
    } else if (computerMove === "paper") {
      results = "Tie";
    } else if (computerMove === "scissors") {
      results = "You Lose";
    }
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      results = "You Lose";
    } else if (computerMove === "paper") {
      results = "You Win";
    } else if (computerMove === "scissors") {
      results = "Tie";
    }
  }
  if (results === "You Win") {
    score.wins++;
  } else if (results === "You Lose") {
    score.losses++;
  } else if (results === "Tie") {
    score.ties++;
  }

  localStorage.setItem("score", JSON.stringify(score));

  updateScoreElement();

  document.querySelector(".js-result").innerHTML = results;
  document.querySelector(
    ".js-moves"
  ).innerHTML = `You <img src="icons/${playerMove}-emoji.png" class="move-icon">  <img src="icons/${computerMove}-emoji.png" class="move-icon" > Computer`;
}

function updateScoreElement() {
  document.querySelector(
    ".js-score"
  ).innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}
