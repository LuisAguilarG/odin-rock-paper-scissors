const options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;
let currentRound = 1;

function getComputerChoice() {
  const choice = options[Math.floor(Math.random() * 3)];
  return choice;
}

function getHumanChoice() {
  let choice = null;
  let isValidChoice = null;

  while (!isValidChoice) {
    choice = prompt("ROUND " + currentRound + ". Type your choice (Rock, Paper or Scissors): ").toLowerCase();

    switch (choice) {
      case "rock":
      case "paper":
      case "scissors":
        isValidChoice = true;
        break;
      default:
        isValidChoice = false;
        break;
    }
  }
  return choice;
}

function playRound(humanChoice, computerChoice) {
    if (humanChoice === computerChoice) {
        console.log("It's a tie! Try again.");
    } else {
        if (humanChoice === "rock") {
            if (computerChoice === "paper") {
                console.log("%c You lose! Paper beats Rock", "color: red;");
                computerScore++;
            } else {
                console.log("%c You win! Rock beats Scissors", "color: green;");
                humanScore++;
            }
        } else if (humanChoice === "paper") {
            if (computerChoice === "rock") {
                console.log("%c You win! Paper beats Rock", "color: green;");
                humanScore++;
            } else {
                console.log("%c You lose! Scissors beats Paper", "color: red;");
                computerScore++;
            }
        } else {
            if (computerChoice === "rock") {
                console.log("%c You lose! Rock beats Scissors", "color: red;");
                computerScore++;
            } else {
                console.log("%c You win! Scissors beats Paper", "color: green;");
                humanScore++;
            }
        }
        currentRound++;
    }
}

function playGame() {
    while (currentRound <= 5) {
        console.log("--- Current round: " + currentRound + " ---");
        playRound(getHumanChoice(), getComputerChoice());
    }

    console.log("Your score: " + humanScore);
    console.log("Computer score: " + computerScore);

    if (humanScore > computerScore) {
        console.log("%c *** Congratulations, you have won! ***", "color: green;");
    } else {
        console.log("%c °°° Computer has won. Try again by reloading the page. °°°", "color: red;");
    }
}

try {
    playGame();
} catch (error) {
    console.log("%c °°° You have decided to stop playing the game. °°°", "color: blue;");
}
