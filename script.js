const wordEl = document.getElementById("word");
const wordLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-message");
const finalMsgReveal = document.getElementById("final-message-reveal-word");

const figureParts = document.querySelectorAll(".figure-part");
const words = ["application", "aaaya", "bringo","neha"];

let selectedWords = words[Math.floor(Math.random() * words.length)];

let playable = true;

const correctLetters = [];
const wrongLetters = [];
//show hidden
function displayWord() {
    wordEl.innerHTML = `
      ${selectedWords
        .split("")
        .map((letter) => {
          return `<span class="letter">
          ${correctLetters.includes(letter) ? letter : " "}
          </span>`;
        })
        .join("")}
      `;
    const innerWord = wordEl.innerText.replace(/[\n]/g,"");
    if (innerWord === selectedWords) {
      finalMsg.innerText = `Congratulations! You won! 😊`;
      popup.style.display = "flex";
      playable = false;
    }
  }
displayWord();
document.addEventListener("keydown", (event) => {
    notification.style.visibility = "hidden";
    if (playable) {
      if (event.keyCode >= 65 && event.keyCode <= 90) {
        const letter = event.key.toLowerCase();
        if (selectedWords.includes(letter)) {
          if (!correctLetters.includes(letter)) {
            correctLetters.push(letter);
            displayWord();
          } else {
            showNotification();
          }
        } else {
          if (!wrongLetters.includes(letter)) {
            wrongLetters.push(letter);
          } else {
            showNotification();
          }
          updateWrongLetterEl();
        }
      }
    }
  });
function updateWrongLetterEl() {
    wordLettersEl.innerHTML = `
      ${wrongLetters.length ? `<p> Wrong letters </p>` : ""}
      ${wrongLetters.map((letter) => `<span>${letter}</span>`)}
      `;
    //f**k map always return array so only it's showing , to avoid we're using join() haha
    figureParts.forEach((part, index) => {
      const errors = wrongLetters.length;
      if (index < errors) part.style.display = "block";
      else part.style.display = "none";
    });
    if (wrongLetters.length === figureParts.length) {
      playable = false;
      finalMsg.innerText = `Unfortunately you lost!!! 😒`;
      popup.style.display = "flex";
    }
  }
  
  function showNotification() {
  
       notification.style.visibility = "visible";
       notification.style.transform = "translateY(-50px)";
      
    setTimeout(() => {
      notification.style.transform = "translateY(50px)";
      notification.style.visibility = "hidden";
    }, 2000);
  }
  
  playAgainBtn.addEventListener("click", () => {
    playable = true;
    correctLetters.splice(0);
    wrongLetters.splice(0);
  
    selectedWords = words[Math.floor(Math.random() * words.length)];
    displayWord();
    updateWrongLetterEl();
    popup.style.display = "none";
  });