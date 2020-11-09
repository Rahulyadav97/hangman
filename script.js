const wordEl = document.getElementById("word");
const wordLettersEl = document.getElementById("wrong-letters");
const playAgainBtn = document.getElementById("play-button");
const popup = document.getElementById("popup-container");
const notification = document.getElementById("notification-container");
const finalMsg = document.getElementById("final-message");
const finalMsgReveal = document.getElementById("final-message-reveal-word");
const textMobile = document.getElementById("textmobile");
const figureParts = document.querySelectorAll(".figure-part");

const words = ["Afghanistan","Albania","Algeria","Andorra","Angola","Anguilla","Argentina","Armenia","Aruba","Australia","Austria","Azerbaijan","Bahamas","Bahrain","Bangladesh","Barbados","Belarus","Belgium","Belize","Benin","Bermuda","Bhutan","Bolivia","Botswana","Brazil","Brunei","Bulgaria","BurkinaFaso","Burundi","Cambodia","Chad","Chile","China","Colombia","Congo","Croatia","Cuba","Cyprus","Denmark","Dominica","Egypt","Estonia","Ethiopia","Fiji","Finland","France","French Polynesia","Gabon","Gambia","Georgia","Germany","Ghana","Gibraltar","Greece","Greenland","Grenada","Guam","Guatemala","Guernsey","Guinea","Guyana","Haiti","Honduras","Hong Kong","Hungary","Iceland","India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jersey","Jordan","Kazakhstan","Kenya","Kuwait","Laos","Latvia","Lebanon","Lesotho","Liberia","Libya","Liechtenstein","Lithuania","Luxembourg","Macau","Macedonia","Madagascar","Malawi","Malaysia","Maldives","Mali","Malta","Mauritania","Mauritius","Mexico","Moldova","Monaco","Mongolia","Montenegro","Montserrat","Morocco","Mozambique","Namibia","Nepal","Netherlands","NewZealand","Nicaragua","Niger","Nigeria","Norway","Oman","Pakistan","Palestine","Panama","PapuaNewGuinea","Paraguay","Peru","Philippines","Poland","Portugal","Qatar","Reunion","Romania","Russia","Rwanda","Samoa","SanMarino","Satellite","SaudiArabia","Senegal","Serbia","Seychelles","Singapore","Slovakia","Slovenia","SouthAfrica","SouthKorea","Spain","SriLanka","Sudan","Suriname","Swaziland","Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Togo","Tonga","Tunisia","Turkey","Turkmenistan","Uganda","Ukraine","UnitedArabEmirates","UnitedKingdom","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe"].map(v => v.toLowerCase());


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
          <input type="text" value=""/>
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
  
  //alert(event.keyCode);
    notification.style.visibility = "hidden";
    if (playable) {
     // alert(event.keyCode);
     
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


  