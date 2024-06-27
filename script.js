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

let numberOfRounds = 5;

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
  }

  console.log(`You scored ${humanScore}. Opponent scored ${computerScore}!`);
}