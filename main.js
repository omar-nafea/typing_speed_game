/*
  Advices
  - Always Check The Console
  - Take Your Time To Name The Identifiers
  - DRY

  Steps To Create The Project
  [01] Create HTML Markup
  [02] Add Styling And Separate From Logic
  [03] Create The App Logic
  ---- [01] Add Levels
  ---- [02] Show Level And Seconds
  ---- [03] Add Array Of Words
  ---- [04] ِAdd Start Game Button
  ---- [05] Generate Upcoming Words
  ---- [06] Disable Copy Word And Paste Event + Focus On Input
  ---- [07] Start Play Function
  ---- [08] Start The Time And Count Score
  ---- [09] Add The Error And Success Messages
  [04] Your Trainings To Add Features
  ---- [01] Save Score To Local Storage With Date // Done
  ---- [02] Choose Levels From Select Box // Done 
  ---- [03] Break The Logic To More Functions
  ---- [04] Choose Array Of Words For Every Level
  ---- [05] Write Game Instruction With Dynamic Values
  ---- [06] Add 3 Seconds For The First Word
*/

// Array Of Words
const Easy = [
    "Hello",
    "Code",
    "Town",
    "Twitter",
    "Github",
    "Python",
    "Scala",
    "Coding",
    "Funny",
    "Task",
    "Runner",
    "Roles",
    "Test",
    "Rust",
    "Scala",
];

const Normal = [
    "Programming",
    "Javascript",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Destructuring",
    "Paradigm",
    "Styling",
    "Cascade",
    "Documentation",
    "Coding",
    "Funny",
    "Coding",
    "Funny",
    "Working",
    "Dependencies",
];

const Hard = [
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Country",
    "Testing",
    "Youtube",
    "Linkedin",
    "Twitter",
    "Github",
    "Leetcode",
    "Internet",
    "Python",
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
    "Paradigm",
    "Paradigm",
    "Styling",
    "Cascade",
    "Coding",
    "Working",
    "Runner",
    "Programming",
    "Javascript",
    "Destructuring",
    "Documentation",
    "Dependencies",
];
const lvls = {
    "Easy": 5,
    "Normal": 4,
    "Hard": 3
};
// Default Level
let defaultLevelName = "Easy"; // Change Level From Here
let defaultLevelSeconds = lvls[defaultLevelName];
let dateNow = new Date();




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
let restart = document.querySelector(".restart");
let theFirst = document.querySelector(".instructions_one");
let theSec = document.querySelector(".instructions_two");
let theThird = document.querySelector(".instructions_three");
let theKey = document.getElementById("theSecret");
let selection = document.querySelector('.classic');
let options = document.querySelectorAll("option");
let thepop = document.querySelector('.instructions');
theFirst.innerHTML = `<span>Once you start the game it will wait 4 seconds before proceeding</span> 
<p>The <span>${Object.keys(lvls)[0]}</span> level have <span>${Object.values(lvls)[0]}</span> seconds and contains <span>${Easy.length}</span> words `
theSec.innerHTML = `<p>The <span>${Object.keys(lvls)[1]}</span> level have <span>${Object.values(lvls)[1]}</span> seconds and contains <span>${Normal.length}</span> words`
theThird.innerHTML = `<p>The <span>${Object.keys(lvls)[2]}</span> level have <span>${Object.values(lvls)[2]}</span> seconds and contains <span>${Hard.length}</span> words <br>And <span>${Object.keys(lvls)[2]}</span> level should write capital letters <br>
<span>Feel free to choose your level before starting the game</span>`

input.onpaste = function() {
    return false;
}



let moha;
let thing = Easy.length;
let omar;
if (window.sessionStorage.getItem('thescore')) {
    thing = window.sessionStorage.getItem('thescore');
    scoreTotal.innerHTML = thing;
}

lvlNameSpan.innerHTML = defaultLevelName;
secondsSpan.innerHTML = defaultLevelSeconds;
timeLeftSpan.innerHTML = defaultLevelSeconds;
scoreTotal.innerHTML = thing;


if (window.sessionStorage.getItem("theLevel")) {
    moha = window.sessionStorage.getItem("theLevel");
    defaultLevelSeconds = lvls[moha];
    lvlNameSpan.innerHTML = moha;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
}
selection.addEventListener('change', function() { // Change Level From Here
    if (this.value === "Easy") {
        defaultLevelName = this.value;
        thing = Easy.length;
    }
    if (this.value === "Normal") {
        defaultLevelName = this.value;
        thing = Normal.length;
    }
    if (this.value === "Hard") {
        defaultLevelName = this.value;
        thing = Hard.length;
    }
    const theArray = { Easy: Easy, Normal: Normal, Hard: Hard };
    if (defaultLevelName === Object.entries(theArray)[0][0]) {
        theOne = [...Easy]
    }
    if (defaultLevelName === Object.entries(theArray)[1][0]) {
        theOne = [...Normal]
    }
    if (defaultLevelName === Object.entries(theArray)[2][0]) {
        theOne = [...Hard]
    }
    window.sessionStorage.setItem('theArraything', theOne);

    window.sessionStorage.setItem("theLevel", defaultLevelName);
    window.sessionStorage.setItem("thescore", thing);
    defaultLevelSeconds = lvls[defaultLevelName];
    lvlNameSpan.innerHTML = defaultLevelName;
    secondsSpan.innerHTML = defaultLevelSeconds;
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    scoreTotal.innerHTML = thing;

});
// Disable Paste Event

// Start Game

startButton.onclick = function(omar) {
    this.remove();
    input.focus();
    thepop.classList.add('hidden');
    omar = Easy
    if (window.sessionStorage.getItem('theArraything')) {
        omar = window.sessionStorage.getItem('theArraything').split(",");
    }
    options.forEach((opt) => {
        opt.setAttribute("disabled", "disabled");
    })
    let second = 0;
    let int = null;

    function mainTime() {
        second++;
        console.log(second)
        if (second == 4) {
            clearInterval(int);
            console.log("done")
        }
    }
    int = setInterval(mainTime, 1000);
    theRandomPros(omar)
        // Generate Words
    for (let i = 0; i < omar.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        div.innerHTML = omar[i];
        upcomingWords.appendChild(div);
    }
    setTimeout(() => {
        startPlay(omar);
    }, 3000)
}

function theRandomPros(omar) {
    // Get Random Word From Array
    let randomWord = omar[Math.floor(Math.random() * omar.length)];
    // Get Word Index
    let wordIndex = omar.indexOf(randomWord);
    // Remove WordFrom Array
    omar.splice(wordIndex, 1);
    // Show The Random Word
    theWord.innerHTML = randomWord;
    // Empty Upcoming Words
    upcomingWords.innerHTML = '';
}

function genWords(omar) {
    theRandomPros(omar)
        // Generate Words
    for (let i = 0; i < omar.length; i++) {
        // Create Div Element
        let div = document.createElement("div");
        div.innerHTML = omar[i];
        upcomingWords.appendChild(div);
    }
    // Call Start Play Function
    startPlay(omar);
}

function creation(className, message) {
    let span = document.createElement("span");
    span.className = className;
    span.innerHTML = message;
    finishMessage.appendChild(span);
}


function wonSituation(omar) {
    if (omar.length > 0) {
        // Call Generate Word Function
        genWords(omar);
    } else {
        creation("good", "congratz");
        upcomingWords.remove();
        let thescoreGot_2 = scoreGot.innerHTML
        let view = `you close the score: ${thescoreGot_2} out of ${scoreTotal.innerHTML}, in date: ${dateNow}`
        window.localStorage.setItem("Congratz score", JSON.stringify(view));
        restart.classList.remove("hidden");
    }
}

function loseSituation() {
    creation("bad", "Game Over");
    let thescoreGot = scoreGot.innerHTML
    let view_2 = `score: ${thescoreGot} out of ${scoreTotal.innerHTML}, in date: ${dateNow}`
    window.localStorage.setItem("game over score", JSON.stringify(view_2));
    restart.classList.remove("hidden");
}

function validation(omar) {
    if (omar.length > 25) {
        if (theWord.innerHTML === input.value) {
            // Empty Input Field
            input.value = '';
            // Increase Score
            scoreGot.innerHTML++;
            wonSituation(omar)
        } else {
            loseSituation()
        }
    } else if (omar.length < 25) {
        if (theWord.innerHTML.toLowerCase() === input.value.toLowerCase()) {
            // Empty Input Field
            input.value = '';
            // Increase Score
            scoreGot.innerHTML++;
            wonSituation(omar)
        } else {
            loseSituation()
        }
    }
}

function startPlay(omar) {
    timeLeftSpan.innerHTML = defaultLevelSeconds;
    let start = setInterval(() => {
        timeLeftSpan.innerHTML--;
        if (timeLeftSpan.innerHTML === "0") {
            // Stop Timer
            clearInterval(start);
            // Compare Words
            validation(omar)
        }
    }, 1000);
}

restart.onclick = () => {
    location.reload();
};