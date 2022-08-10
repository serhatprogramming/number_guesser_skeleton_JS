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
  message = document.querySelector(".message");

// Assign UI min and max
minNum.textContent = min;
maxNum.textContent = max;

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
          setMessage(`Wrong guess! Guesses left: ${guessesLeft} `, "red");
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
  guessInput.value = "";
  guessInput.placeholder = "Enter your guess...";
  guessBtn.value = "submit";
}
