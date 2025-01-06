/* User Interface */
const turnNotificationHuman = document.querySelector(".turn-notification-human");
const turnNotificationComputer = document.querySelector(".turn-notification-computer");
const crownHuman = document.querySelector(".human .crown");
const crownComputer = document.querySelector(".computer .crown");
const tie = document.querySelector(".vs .tie");
const optionHumanButtons = document.querySelectorAll(".choice-container .human button");
const optionComputerButtons = document.querySelectorAll(".choice-container .computer button");
const globalContainer = document.querySelector(".global-container");
const playButton = document.querySelector(".play-button");
const newGameButton = document.querySelector(".new-game-button");
const finalResult = document.querySelector(".final-result");
const finalScoreHuman = document.querySelector(".final-score .human");
const finalScoreComputer = document.querySelector(".final-score .computer");
const statusRoundResult = document.querySelector(".score-container .round-result");
const gameMusic = document.querySelector("#game-music");
const playFx = document.querySelector("#play-fx");
const selectionFx = document.querySelector("#selection-fx");
const winnerFx = document.querySelector("#winner-fx");
const loserFx = document.querySelector("#loser-fx");
const tieFx = document.querySelector("#tie-fx");


function setEventListeners() {

  optionHumanButtons.forEach((selectedOption) => {
    selectedOption.addEventListener("click", () => {
      selectionFx.play();
      toggleRemainingOptions(getHumanChoice(selectedOption), optionHumanButtons); 
      playRound(getHumanChoice(selectedOption), getComputerChoice());
    });
  });

  playButton.addEventListener("click", () => {
    gameMusic.play();
    playFx.play();
    removePlayButton();    
    resetGame();
    
    setTimeout(() => {
      prepareNextRound();
    }, 1000);
  });

  newGameButton.addEventListener("click", () => {
    location.reload(true);
  });

  document.addEventListener("contextmenu", event => event.preventDefault());
}


function setinitialConfiguration() {
  gameMusic.volume = .8;
  playFx.volume = .7;
  selectionFx.volume = .75;
  winnerFx.volume = .9;
  tieFx.volume = .6;
  loserFx.volume = .4;
}


function renderRound(computerChoice, roundResult) {
  toggleVisibility(turnNotificationHuman);
  toggleVisibility(turnNotificationComputer);
  toggleActionOptionButtons();

  setTimeout(() => {
    changeImageComputerChoice(computerChoice);
    toggleRemainingOptions(computerChoice, optionComputerButtons);
    setTimeout(() => {
      playRoundResultSound(roundResult);
    }, 1000);
    updateStatus(roundResult);
    updateScore();
  }, 1000);

  setTimeout(() => {
    restoreAllCrownIcons();
    restoreTieIcons();
    toggleVisibility(turnNotificationComputer);

    setTimeout(() => {
      prepareNextRound();
      restoreImageComputerChoice(computerChoice);
      restoreStatus();
      updateRound();
    }, 1000);
  }, 4500);
}


function prepareNextRound() {

  restoreAllOptionIcons();
  toggleVisibility(turnNotificationHuman);
  toggleActionOptionButtons();  
}


function removePlayButton() {
  globalContainer.classList.remove("blur");
  globalContainer.classList.remove("not-clickable");
  playButton.classList.add("not-clickable");
  playButton.classList.add("hide");

  setTimeout(() => {
    document.querySelector(".play-container").remove();
  }, 1500);
}


function toggleRemainingOptions(selectedOption, optionButtons) {

  optionButtons.forEach((option) => {
    option.classList.toggle("selection");

    if (!option.classList.contains(selectedOption)) {
      option.classList.toggle("hide");
    }
  });
}


function restoreAllOptionIcons() {

  optionHumanButtons.forEach((option) => {
    option.classList.remove("selection");
    option.classList.remove("hide");
  });

  optionComputerButtons.forEach((option) => {
    option.classList.remove("selection");
    option.classList.remove("hide");
  });
}


function restoreAllCrownIcons() {
  crowns = document.querySelectorAll(".crown");

  crowns.forEach((crown) => {
    crown.classList.add("hide");
  });
}


function restoreTieIcons() {
  tie.classList.add("hide");
}


function changeImageComputerChoice(computerChoice) {
  const image = document.querySelector(`#computer-${computerChoice}-image`);
  image.src = `./images/white-${computerChoice}-icon.svg`;
}


function restoreImageComputerChoice(computerChoice) {
  const image = document.querySelector(`#computer-${computerChoice}-image`);
  image.src = `./images/white-question-icon-mirror.svg`;
}


function toggleActionOptionButtons() {

  optionHumanButtons.forEach((button) => {
    button.classList.toggle("not-clickable");
  });
}


function toggleVisibility(element) {
  element.classList.toggle("hide");
}


function updateRound() {
  const roundContainer = document.querySelector(".round-container");

  roundContainer.textContent = `Round ${currentRound}`;
}


function updateStatus(roundResult) {
  statusRoundResult.textContent = roundResult;
}


function restoreStatus() {
  statusRoundResult.textContent = "Waiting...";
}


function updateScore() {
  const humanScoreDisplay = document.querySelector(".score-container .human .display");
  const computerScoreDisplay = document.querySelector(".score-container .computer .display");

  humanScoreDisplay.textContent = humanScore;
  computerScoreDisplay.textContent = computerScore;
}


function renderNewGameModal() {
  const newGameContainer = document.querySelector(".new-game-modal-container");

  newGameContainer.classList.remove("hide");
  newGameContainer.classList.remove("not-clickable");
  globalContainer.classList.add("blur");
  globalContainer.classList.add("not-clickable");
}


/* ----------------------------- */

/* Game Mechanics */
const options = ["rock", "paper", "scissors"];
let humanScore;
let computerScore;
let currentRound = 1;


try {
  setEventListeners();
  setinitialConfiguration();
} catch (error) {
  console.error(error);
}


function resetGame() {
  humanScore = 0;
  computerScore = 0;
  currentRound = 1;
}


function getHumanChoice(selectedOption) {

  for (let i = 0; i < options.length; i++) {
    if (selectedOption.classList.contains(options[i])) {
      return options[i];
    }
  }
}


function getComputerChoice() {
  const option = options[Math.floor(Math.random() * 3)];
  return option;
}


function playRound(playerChoice, computerChoice) {
  let roundResult = "";

  if (playerChoice === computerChoice) {
    roundResult = "TIE";
    toggleVisibility(tie);
  } else {
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      roundResult = "WINNER";
      toggleVisibility(crownHuman);
      humanScore++;
    } else {
      roundResult = "LOSER";
      setTimeout(() => {
        toggleVisibility(crownComputer);
      }, 1000);
      computerScore++;
    }
    currentRound++;
  }

  if (hasAnyoneWon()) {
    if (humanScore > computerScore) {
      finalResult.classList.add("winner");
      finalResult.textContent = "You have won";
    } else {
      finalResult.classList.add("loser");
      finalResult.textContent = "You have lost";
    }

    finalScoreHuman.innerHTML = `YOU <span>${humanScore}<\span>`;
    finalScoreComputer.innerHTML =  `COMPUTER <span>${computerScore}<\span>`;

    setTimeout(() => {
      renderNewGameModal();
    }, 2500);
  } 

  renderRound(computerChoice, roundResult);
}


function hasAnyoneWon() {
  return humanScore === 5 || computerScore === 5;
}


function playRoundResultSound(roundResult) {

  if (roundResult === "WINNER") {
    winnerFx.play();
  } else if (roundResult === "LOSER") {
    loserFx.play();
  } else {
    tieFx.play();
  }
}

