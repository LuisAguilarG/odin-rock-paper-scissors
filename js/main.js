const options = ["Rock", "Paper", "Scissors"];

function getComputerChoice() {
  const choice = options[Math.floor(Math.random() * 3)];
  return choice;
}

console.log(getComputerChoice());