/**
 * Game Rule
 * Player must guess a number between min and max
 * Player gets a certain amount of guesses
 * Notify player of guesses remaining
 * Notify the player of the correct answer if loose
 * Let player choose to play again
 */

// Game Values
let min = 1,
  max = 10,
  winningNum = Math.floor(Math.random() * max + min),
  guessesLeft = 3;

// UI Elements
const guessInput = document.querySelector("#guess-input"),
  game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  message = document.querySelector(".message"),
  setup = document.querySelector("#setup"),
  minInput = document.querySelector("#min-input"),
  maxInput = document.querySelector("#max-input"),
  numberOfGuesses = document.querySelector("#number-of-guesses"),
  setupBtn = document.querySelector("#setup-btn"),
  setupMessage = document.querySelector(".setup-message");

// set the game display to none
game.style.display = "none";

// Setup
setupBtn.addEventListener("click", () => {
  if (!isNaN(parseInt(minInput.value))) min = parseInt(minInput.value);
  if (!isNaN(parseInt(maxInput.value))) max = parseInt(maxInput.value);
  if (!isNaN(parseInt(numberOfGuesses.value)))
    guessesLeft = parseInt(numberOfGuesses.value);
  winningNum = Math.floor(Math.random() * (max - min + 1) + min);

  // Assign UI min and max
  minNum.textContent = min;
  maxNum.textContent = max;

  setMessage(
    `Winning number will be between ${min} and ${max} inclusive. You will have ${guessesLeft} guesses to win.`,
    "coral"
  );
  if (min < max && max - min <= 20 && guessesLeft >= 3 && guessesLeft <= 5) {
    setup.style.display = "none";
    game.style.display = "block";
  } else {
    setupMessage.textContent =
      "Invalid setup values, Check the setup rules and enter the values again";
    setupMessage.style.color = "red";
  }
});

// Listen for guess
guessBtn.addEventListener("click", () => {
  if (guessBtn.value === "restart") {
    restart();
  } else {
    let guess = parseInt(guessInput.value);

    // Validate
    if (guess !== "NaN" && guess >= min && guess <= max) {
      // Check if won
      if (guess === winningNum) {
        setMessage(`Congratulations, the winning number: ${guess}`, "green");
        guessInput.style.borderColor = "green";
        guessInput.value = "";
        gameOver();
      } else {
        guessesLeft--;
        if (guessesLeft == 0) {
          setMessage(
            `You lost! The winning number was ${winningNum}. Try Again.`,
            "red"
          );
          gameOver();
        } else {
          setMessage(`${guess} is wrong! Guesses left: ${guessesLeft} `, "red");
          guessInput.value = "";
          guessInput.style.borderColor = "red";
        }
      }
    } else {
      setMessage(`Please enter a number between ${min} and ${max}`, "red");
    }
  }
});

// Set Message
function setMessage(msg, color) {
  message.style.color = color;
  message.textContent = msg;
}

// game Over
function gameOver() {
  guessInput.value = "";
  guessInput.placeholder = "Restart game to play again!";
  guessInput.disabled = true;
  guessBtn.value = "restart";
}

// restart game
function restart() {
  guessesLeft = 3;
  winningNum = Math.floor(Math.random() * max + min);
  setMessage();
  guessInput.disabled = false;
  guessInput.style.borderColor = "gray";
  guessInput.value = "";
  guessInput.placeholder = "Enter your guess...";
  guessBtn.value = "submit";
  game.style.display = "none";
  setup.style.display = "block";
}
