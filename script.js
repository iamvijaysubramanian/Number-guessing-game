document.addEventListener("DOMContentLoaded", function () {
  const startBtn = document.getElementById("startBtn");
  const gameContainer = document.getElementById("gameContainer");
  const nameInput = document.getElementById("name");
  const guessInput = document.getElementById("guess");
  const submitBtn = document.getElementById("submitBtn");
  const startNewGameBtn = document.getElementById("startNewGameBtn");
  const resultText = document.getElementById("result");
  const feedbackText = document.getElementById("feedback");
  const bestScoreText = document.getElementById("bestScore");

  let randomNumber = [];
  let attempts = 0;
  let bestScore = Infinity;

  function generateRandomNumber() {
    const digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    for (let i = 0; i < 4; i++) {
      const randomIndex = Math.floor(Math.random() * digits.length);
      randomNumber.push(digits.splice(randomIndex, 1)[0]);
    }
  }

  function compareGuess(userGuess) {
    let result = "";
    for (let i = 0; i < 4; i++) {
      if (userGuess[i] === randomNumber[i]) {
        result += "+";
      } else if (randomNumber.includes(userGuess[i])) {
        result += "-";
      } else {
        result += "*";
      }
    }
    return result;
  }

  function saveScore(name) {
    const scoreData = { name, attempts };
    localStorage.setItem("bestScore", JSON.stringify(scoreData));
  }

  function displayBestScore() {
    const scoreData = JSON.parse(localStorage.getItem("bestScore"));
    if (scoreData && scoreData.name && scoreData.attempts) {
      bestScoreText.textContent = `Best Score: ${scoreData.name} - ${scoreData.attempts} attempts`;
      bestScore = scoreData.attempts;
    }
  }

  function startNewGame() {
    attempts = 0;
    randomNumber = [];
    generateRandomNumber();
    nameInput.value = "";
    guessInput.value = "";
    resultText.textContent = "";
    feedbackText.textContent = "";
    submitBtn.style.display = "block";
    startNewGameBtn.style.display = "none";
  }

  function handleGuessSubmission() {
    const userGuess = guessInput.value;

    if (userGuess.length !== 4 || !/^\d{4}$/.test(userGuess)) {
      feedbackText.textContent =
        "Invalid input. Please enter a four-digit number.";
      return;
    }

    attempts++;

    const result = compareGuess(userGuess.split("").map(Number));
    feedbackText.textContent = `Result: ${result}`;

    if (result === "++++") {
      feedbackText.textContent = `Congratulations, ${nameInput.value}! You guessed the number in ${attempts} attempts.`;
      if (attempts < bestScore) {
        saveScore(nameInput.value);
        displayBestScore();
      }
      startNewGameBtn.style.display = "block";
      submitBtn.style.display = "none";
    }
  }

  startBtn.addEventListener("click", function () {
    gameContainer.style.display = "block";
    startBtn.style.display = "none";
    startNewGame();
  });

  submitBtn.addEventListener("click", handleGuessSubmission);

  startNewGameBtn.addEventListener("click", startNewGame);

  displayBestScore();
});
