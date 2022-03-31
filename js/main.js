const wordsEasy = [
  "Hello",
  "Code",
  "Town",
  "Python",
  "Scala",
  "Funny",
  "Task",
  "Runner",
  "Roles",
  "Test",
  "Rust",
  "First",
  "Word",
  "Write",
  "Choose",
  "Start",
  "Break",
  "Score",
  "Local",
  "Add",
];
const wordsNormal = [
  "Playing",
  "Working",
  "Styling",
  "Coding",
  "Github",
  "Country",
  "Testing",
  "Youtube",
  "Linkedin",
  "Twitter",
  "Leetcode",
  "Internet",
  "Paradigm",
  "Cascade",
  "Function",
  "Messages",
  "Features",
  "Identifiers",
  "Project",
  "Generate",
];
const wordsHard = [
  "Destructuring",
  "Documentation",
  "Dependencies",
  "Programming",
  "Javascript",
  "European",
  "backbends",
  "candidates",
  "cancelling",
  "habituated",
  "pacesetter",
  "earlinesses",
  "facebooking",
  "racerunners",
  "vacationers",
  "waferboards",
  "jackanapeses",
  "namelessness",
  "objectivizes",
  "vacationless",
];
var words = wordsEasy;
///////// Setting Levels ///////////
const lvls = {
  Easy: 5,
  Normal: 3,
  Hard: 2,
};

// Catch Selectors
let startButton = document.querySelector(".start");
let lvlNameSpan = document.querySelector(".message .lvl");
let secondsSpan = document.querySelector(".message .seconds");
let theWord = document.querySelector(".the-word");
let upcomingWords = document.querySelector(".upcoming-words");
let input = document.querySelector(".input");
let timeLeftSpan = document.querySelector(".time span");
let scoreGot = document.querySelector(".score .got");
let scoreTotal = document.querySelector(".score .total");
let finishMessage = document.querySelector(".finish");
let selectBox = document.querySelector("#level");
let selectDiv = document.querySelector(".select");

/////////// Default Setting ////////
defaultLevelName = "Easy";
defaultLevelSeconds = lvls[defaultLevelName];
lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
//////// Setting Level Name + Seconds + Score

scoreTotal.innerHTML = words.length;
/// Choose From Select Box
selectBox.addEventListener("change", function () {
  defaultLevelName = selectBox.value;
  defaultLevelSeconds = lvls[defaultLevelName];
  lvlNameSpan.innerHTML = defaultLevelName;
  secondsSpan.innerHTML = defaultLevelSeconds;
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  if (selectBox.value == "Easy") {
    words = wordsEasy;
  } else if (selectBox.value == "Normal") {
    words = wordsNormal;
  } else {
    words = wordsHard;
  }
  scoreTotal.innerHTML = words.length;
});

////// Disable Paste Event //////

input.onpaste = function () {
  return false;
};

// Start Game
startButton.onclick = function () {
  this.remove();
  selectDiv.remove();
  input.focus();
  ///// Genarate Word Function //////
  genWords();
};

function genWords() {
  ///////// Get Random Word From Array /////
  let randomWord = words[Math.floor(Math.random() * words.length)];
  //////// Get Word Index /////////////////
  let wordIndex = words.indexOf(randomWord);
  /////// Remove Word From Array /////////
  words.splice(wordIndex, 1);
  ////// Showing The Random Word //////
  theWord.innerHTML = randomWord;
  ////// Empty Upcoming Words ////
  upcomingWords.innerHTML = "";
  ///// Generate Upcoming Words /////
  for (let i = 0; i < words.length; i++) {
    // Create Div Element ////
    let div = document.createElement("div");
    let txt = document.createTextNode(words[i]);
    div.appendChild(txt);
    upcomingWords.appendChild(div);
  }
  //// Call Start Play Function /////
  startPlay();
}

function startPlay() {
  timeLeftSpan.innerHTML = defaultLevelSeconds;
  let start = setInterval(function () {
    timeLeftSpan.innerHTML--;
    if (timeLeftSpan.innerHTML === "0") {
      /// Stop Timer /////
      clearInterval(start);
      //// Compare Words //
      if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
        // Empty Input Filed
        input.value = "";
        //// Increase Score
        scoreGot.innerHTML++;
        if (words.length > 0) {
          // Call Generate Word Function //
          genWords();
        } else {
          let span = document.createElement("span");
          span.className = "good";
          let spanTxt = document.createTextNode("Congratz");
          span.appendChild(spanTxt);
          finishMessage.appendChild(span);
          //// Remove Upcoming Words Box //
          upcomingWords.remove();
          //// Save score and data in local storage
          var currentdate = new Date();
          let score = {
            scoreTarget: scoreGot.innerHTML,
            time:
              "Last Sync: " +
              currentdate.getDate() +
              "/" +
              (currentdate.getMonth() + 1) +
              "/" +
              currentdate.getFullYear() +
              " @ " +
              currentdate.getHours() +
              ":" +
              currentdate.getMinutes() +
              ":" +
              currentdate.getSeconds(),
          };
          let arrScore = JSON.parse(localStorage.getItem("score") || "[]");
          arrScore.push(score);
          localStorage.setItem("score", JSON.stringify(arrScore));
        }
      } else {
        let span = document.createElement("span");
        span.className = "bad";
        let spanTxt = document.createTextNode("Game Over");
        span.appendChild(spanTxt);
        finishMessage.appendChild(span);
        //// Save score and data in local storage

        var currentdate = new Date();
        let score = {
          scoreTarget: scoreGot.innerHTML,
          time:
            "Last Sync: " +
            currentdate.getDate() +
            "/" +
            (currentdate.getMonth() + 1) +
            "/" +
            currentdate.getFullYear() +
            " @ " +
            currentdate.getHours() +
            ":" +
            currentdate.getMinutes() +
            ":" +
            currentdate.getSeconds(),
        };
        let arrScore = JSON.parse(localStorage.getItem("score") || "[]");
        arrScore.push(score);
        localStorage.setItem("score", JSON.stringify(arrScore));
      }
    }
  }, 1000);
}
