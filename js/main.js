const options = ["rock", "paper", "scissors"];
let humanScore = 0;
let computerScore = 0;

function getComputerChoice() {
  const choice = options[Math.floor(Math.random() * 3)];
  return choice;
}

function getHumanChoice() {
  let choice = null;
  let isValidChoice = null;

  while (!isValidChoice) {
    choice = prompt("Type your choice (Rock, Paper or Scissors): ").toLowerCase();

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
                console.log("You lose! Paper beats Rock");
                computerScore++;
            } else {
                console.log("You win! Rock beats Scissors");
                humanScore++;
            }
        } else if (humanChoice === "paper") {
            if (computerChoice === "rock") {
                console.log("You win! Paper beats Rock");
                humanScore++;
            } else {
                console.log("You lose! Scissors beats Paper");
                computerScore++;
            }
        } else {
            if (computerChoice === "rock") {
                console.log("You lose! Rock beats Scissors");
                computerScore++;
            } else {
                console.log("You win! Scissors beats Paper");
                humanScore++;
            }
        }
    }
}

playRound(getHumanChoice(), getComputerChoice()); // Test