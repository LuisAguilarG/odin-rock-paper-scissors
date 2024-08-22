/* User Interface */
const modalButton = document.querySelector(".end-modal-container button");
const turnHuman = document.querySelector(".turn-human");
const turnComputer = document.querySelector(".turn-computer");
const crownHuman = document.querySelector(".human .crown");
const crownComputer = document.querySelector(".computer .crown");
const tie = document.querySelector(".vs .tie");
const optionHumanButtons = document.querySelectorAll(".choice-container .human button");
const optionComputerButtons = document.querySelectorAll(".choice-container .computer button");
const globalContainer = document.querySelector(".global-container");
const playButton = document.querySelector(".play-button");
const statusResult = document.querySelector(".score-container .result");
const gameMusic = document.querySelector("#game-music");
const playFx = document.querySelector("#play-fx");
const selectionFx = document.querySelector("#selection-fx");
const winnerFx = document.querySelector("#winner-fx");
const loserFx = document.querySelector("#loser-fx");
const tieFx = document.querySelector("#tie-fx");


/* Game mechanics */
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

function playGame() {
  /* playRound(); */

  
  /*
  while (currentRound <= 5) {
    playRound(getHumanChoice(), getComputerChoice());
  }

  console.log("Your score: " + humanScore);
  console.log("Computer score: " + computerScore);

  if (humanScore > computerScore) {
    console.log("%c *** Congratulations, you have won! ***", "color: green;");
  } else {
    console.log(
      "%c °°° Computer has won. Try again by reloading the page. °°°",
      "color: red;"
    );
  }
    */
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



/*
function getHumanChoice() {
  let option = null;
  let isValidOption = null;

  while (!isValidOption) {
    option = prompt(
      "ROUND " + currentRound + ". Type your option (Rock, Paper or Scissors): "
    ).toLowerCase();

    switch (option) {
      case "rock":
      case "paper":
      case "scissors":
        isValidOption = true;
        break;
      default:
        isValidOption = false;
        break;
    }
  }
  return option;
}
*/

function playRound(playerChoice, computerChoice) {
  let result = "";

  if (playerChoice === computerChoice) {
    result = "TIE";
    toggleVisibility(tie);
  } else {
    if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      result = "WINNER";
      toggleVisibility(crownHuman);
      humanScore++;
    } else {
      result = "LOSER";
      setTimeout(() => {
        toggleVisibility(crownComputer);
      }, 1000);
      computerScore++;
    }
    currentRound++;
  }

  if (humanScore === 5 || computerScore === 5) {
    enableEndModal();
  } 

  toggleVisibility(turnHuman);
  toggleVisibility(turnComputer);
  toggleActionOptionButtons();

  setTimeout(() => {
    changeImageComputerChoice(computerChoice);
    toggleRemainingOptions(computerChoice, optionComputerButtons);
    setTimeout(() => {
      playResultSound(result);
    }, 1000);
    updateStatus(result);
    updateScore();
  }, 1000);

  setTimeout(() => {
    restoreAllCrownIcons();
    restoreTieIcons();
    toggleVisibility(turnComputer);

    setTimeout(() => {
      prepareNextRound();
      restoreImageComputerChoice(computerChoice);
      restoreStatus();
      updateRound();
    }, 1000);
  }, 4500);

}


function updateLog(logMessage, resultRound) {
  const logDiv = document.querySelector(".log");
  const logParagraph = document.createElement("p");
  const roundSpan = document.createElement("span");
  
  logDiv.appendChild(logParagraph);
  logParagraph.classList.add(resultRound);
  logParagraph.textContent = logMessage;
  logParagraph.appendChild(roundSpan);
  roundSpan.textContent = ` Current round: ${currentRound}`;
}

function switchButtons() {
  const optionHumanButtons = document.querySelectorAll(".options button");

  optionHumanButtons.forEach((option) => {
    option.disabled = option.disabled ? false : true;
  });
}
/* 
function switchModal() {
  const modalDiv = document.querySelector(".modal");

  modalDiv.classList.contains("disabled") 
  ? modalDiv.classList.replace("disabled", "active") 
  : modalDiv.classList.replace("active", "disabled");
}
 */
function resetLog() {
  const logDiv = document.querySelector(".log");

  while (logDiv.firstChild) {
    logDiv.removeChild(logDiv.lastChild);
  }
}

function resetScore() {
  humanScore = 0;
  computerScore = 0;
  currentRound = 1;
}


function playResultSound(result) {
  if (result === "WINNER") {
    winnerFx.play();
  } else if (result === "LOSER") {
    loserFx.play();
  } else {
    tieFx.play();
  }
}


/* 
function resetGame() {
  resetScores();
  resetLog();
  switchButtons();
  switchModal();
}
 */


/* -------------------------------------- */
/* UX / UI */
function setEventListeners() {
  optionHumanButtons.forEach((selectedOption) => {
    selectedOption.addEventListener("click", () => {
      selectionFx.play();

      toggleRemainingOptions(getHumanChoice(selectedOption), optionHumanButtons); /* toggleRemainingOptions(selectedOption, optionHumanButtons); */
      playRound(getHumanChoice(selectedOption), getComputerChoice());
    });
  });


  
  modalButton.addEventListener("click", () => resetGame());

  playButton.addEventListener("click", () => {
    gameMusic.play();
    playFx.play();
    removePlayButton();    
    resetGame();
    
    setTimeout(() => {
      prepareNextRound();
    }, 1000);
  });

  document.querySelector(".choice-container .computer .rock").addEventListener("click", function() {
    this.classList.add("hide");
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

  /* toggleActionOptionButtons(); */
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
  /* 
  optionButtons.forEach((option) => {
    option.classList.toggle("selection");

    if (!option.isSameNode(selectedOption)) {
      option.classList.toggle("hide");
    }
  }); */

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
    if (!crown.classList.contains("hide")) {
      crown.classList.add("hide");
    }
  });
}


function restoreTieIcons() {
  tie.classList.add("hide");
}


function changeImageComputerChoice(computerChoice) {
  const image = document.querySelector(`#computer-${computerChoice}-image`);
  image.src = `./images/icon-${computerChoice}-white.svg`;

/* 
  optionComputerButtons.forEach((option) => {
    if (!option.classList.contains(computerChoice)) {
      option.src = "./images/icon-"+ computerChoice +"-white.svg";
      option.setAttribute("src", "./images/icon-"+ computerChoice +"-white.svg");
      console.log("./images/icon-"+ computerChoice +"-white.svg");
    }
  });
   */
}

function restoreImageComputerChoice(computerChoice) {
  const image = document.querySelector(`#computer-${computerChoice}-image`);
  image.src = `./images/icon-question-white-2.svg`;
}


function restoreStatus() {
  statusResult.textContent = "Waiting...";
}


function prepareNextRound() {
  restoreAllOptionIcons();
  /* restoreAllCrowns(); */
  toggleVisibility(turnHuman);
  toggleActionOptionButtons();  
}


function toggleActionOptionButtons() {
  optionHumanButtons.forEach((button) => {
    button.classList.toggle("not-clickable");
  });
}


function toggleVisibility(element) {
  element.classList.toggle("hide");
}

/* 
function toggleHoverButton() {
  optionHumanButtons.forEach((option) => {
    option.classList.toggle("not-clickable");
  });
}
 */

function updateRound() {
  const roundContainer = document.querySelector(".round-container");

  roundContainer.textContent = `Round ${currentRound}`;
}


function updateStatus(result) {
  statusResult.textContent = result;
}


function updateScore() {
  const humanScoreDisplay = document.querySelector(".score-container .human .display");
  const computerScoreDisplay = document.querySelector(".score-container .computer .display");

  humanScoreDisplay.textContent = humanScore;
  computerScoreDisplay.textContent = computerScore;
}


function enableEndModal() {
  endModalContainer = document.querySelector(".end-modal-container");

  endModalContainer.classList.remove("disabled");
  globalContainer.classList.add("blur");
  globalContainer.classList.add("not-clickable");
  
  setTimeout(() => {
    
  }, 1000);
}


