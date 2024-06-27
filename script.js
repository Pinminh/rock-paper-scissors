function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getComputerChoice() {
  let choice = getRandomNumber(1, 3);
  switch (choice) {
    case 1: return "rock";
    case 2: return "paper";
    case 3: return "scissors";
  }
}

function getHumanChoice() {
  let humanChoice = prompt("Please enter your choice [rock/paper/scissors]:");
  humanChoice = humanChoice.replace(/ /g, '').toLowerCase();

  while (humanChoice !== "rock" && humanChoice !== "paper" && humanChoice !== "scissors") {
    humanChoice = prompt("You can only enter 'rock' or 'paper' or 'scissors':");
    humanChoice = humanChoice.replace(/ /g, '').toLowerCase();
  }

  return humanChoice;
}

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  if (humanChoice === computerChoice) {
    return { winner: null, loser: null, result: "tie" };
  }

  let winner = null;
  switch (humanChoice) {
    case "rock": winner = (computerChoice === "scissors") ? "human" : "computer"; break;
    case "paper": winner = (computerChoice === "rock") ? "human" : "computer"; break;
    case "scissors": winner = (computerChoice === "paper") ? "human" : "computer"; break;
  }

  if (winner === "human") {
    ++humanScore;
    return { winner: humanChoice, loser: computerChoice, result: "win" };
  }

  ++computerScore;
  return { winner: computerChoice, loser: humanChoice, result: "lose" };
}

const numberOfRounds = 5;
const button = document.querySelector('button');

function playGame() {
  for (let count = 1; count <= numberOfRounds; ++count) {
    let result = playRound(getHumanChoice(), getComputerChoice());
    let msg = `Round ${count}: `;
    msg += (result.result === "tie") ? "Tie" : `You ${result.result}`;
    
    if (result.result !== "tie")
      msg += ` - ${result.winner} dominates over ${result.loser}`;
    else
      msg += ` - no domination occured`;
    console.log(msg);

    let msgEle = document.createElement("h3");
    msgEle.textContent = msg;
    document.body.appendChild(msgEle);
    document.body.offsetHeight;
  }

  let msg = `You scored ${humanScore}. Opponent scored ${computerScore}!`;
  console.log(msg);
  let msgEle = document.createElement("h3");
  msgEle.className = "final";
  msgEle.textContent = msg;
  document.body.appendChild(msgEle);
  document.body.offsetHeight;
}

button.addEventListener("click", () => {
  const h3All = document.querySelectorAll("h3");
  h3All.forEach(h3 => h3.parentNode.removeChild(h3));
  button.disabled = true;
  playGame();
  button.disabled = false;
});