const options = ["rock", "paper", "scissors"];

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
