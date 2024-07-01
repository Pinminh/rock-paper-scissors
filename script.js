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

let humanScore = 0;
let computerScore = 0;

function playRound(humanChoice, computerChoice) {
  let result = "";

  switch (humanChoice) {
    case "rock":     result = (computerChoice === "scissors") ? "win" : "lose"; break;
    case "paper":    result = (computerChoice === "rock")     ? "win" : "lose"; break;
    case "scissors": result = (computerChoice === "paper")    ? "win" : "lose"; break;
  }
  if (humanChoice === computerChoice) result = "tie";

  switch (result) {
    case "tie":  ++humanScore; ++computerScore; break;
    case "win":  ++humanScore;                  break;
    case "lose": ++computerScore;               break;
  }

  return result;
}

const rockButton = document.querySelector("#rck-btn");
const paperButton = document.querySelector("#ppr-btn");
const scissorsButton = document.querySelector("#scs-btn");
const playAgainButton = document.querySelector("#plag-btn");
playAgainButton.hidden = playAgainButton.disabled = true;

const humanResultImage = document.querySelector("#res-you");
const computerResultImage = document.querySelector("#res-uoy");

const humanScoreText = document.querySelector("#scr-you");
const computerScoreText = document.querySelector("#scr-uoy");
const roundResultText = document.querySelector("#res-rnd");
roundResultText.hidden = true;

const scoreRatioText = document.querySelector("#scr-ratio");
const finalResultText = document.querySelector("#res-annce");
scoreRatioText.hidden = finalResultText.hidden = true;

const updateImages = (humanChoice, computerChoice) => {
  humanResultImage.src = "./images/res_" + humanChoice + ".png";
  computerResultImage.src = "./images/res_" + computerChoice + ".png";
}

const updateRoundTexts = (roundResult) => {
  humanScoreText.textContent = "You scored: " + humanScore;
  computerScoreText.textContent = "Uoy scored: " + computerScore;
  
  let roundFinalText = "";
  switch (roundResult) {
    case "tie":  roundFinalText = "You and Uoy tied!";    break;
    case "win":  roundFinalText = "You win this round!";  break;
    case "lose": roundFinalText = "You lose this round!"; break;
  }

  roundResultText.textContent = roundFinalText;
  roundResultText.hidden = false;
}

const WINNING_SCORE = 10;

const updateVictory = () => {
  if (humanScore < WINNING_SCORE && computerScore < WINNING_SCORE) return;

  scoreRatioText.textContent = humanScore + " - " + computerScore;
  finalResultText.textContent = (humanScore >= WINNING_SCORE) ? "Victory" : "Total Lose";
  
  scoreRatioText.hidden = finalResultText.hidden = false;
  playAgainButton.hidden = playAgainButton.disabled = false;

  toggleChoices(DISABLE_CHOICES);
}

const ENABLE_CHOICES = true;
const DISABLE_CHOICES = false;

const toggleChoices = (isEnabled) => {
  rockButton.disabled = paperButton.disabled = scissorsButton.disabled = !isEnabled;
  rockButton.firstElementChild.disabled = paperButton.firstElementChild.disabled = scissorsButton.firstElementChild.disabled = !isEnabled;
}

const playGame = (humanChoice) => {
  toggleChoices(DISABLE_CHOICES);

  let computerChoice = getComputerChoice();
  let result = playRound(humanChoice, computerChoice);

  updateImages(humanChoice, computerChoice);
  updateRoundTexts(result);

  toggleChoices(ENABLE_CHOICES);

  updateVictory();
}

const resetGame = () => {
  humanScore = computerScore = 0;
  updateImages("rock", "rock");
  updateRoundTexts("tie");
  toggleChoices(ENABLE_CHOICES);

  roundResultText.hidden = true;
  scoreRatioText.hidden = finalResultText.hidden = true;
  playAgainButton.hidden = playAgainButton.disabled = true;
}

const clickHandlerSelector = (event) => {
  if (event.target.id === "plag-btn") {
    resetGame();
    return;
  }
  
  switch (event.target.parentNode.id) {
    case "rck-btn":  playGame("rock"); break;
    case "ppr-btn":  playGame("paper"); break;
    case "scs-btn":  playGame("scissors"); break;
  }
}

document.addEventListener("click", clickHandlerSelector);