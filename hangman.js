//includes inquirer and letter.js
var inquirer = require("inquirer");
var letter = require("./letter.js");
//includes word.js
var word = require("./word.js");

var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guesses = 10;
var underscoreDisplay = letter.underscoreDisplay;

gameStart();
//inquirer prompt to begin hangman game
function gameStart(){
    inquirer.prompt([
        {
            type: "confirm",
            message: "Welcome to Mythical Creature Hangman! Are you ready to start?",
            name: "start"
        }
    ]).then(function (response) {
        if (response.start === true) {
            console.log(underscoreDisplay);
            console.log("\n");
            nextGuess();
        }
        else {
            return console.log("Come back when you're ready to play!");
        }
    });
}


function checkForWin() {
    if (underscoreDisplay === (" " + letter.lettersSplit.join(" "))) {
        console.log("YOU WIN!!");
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to keep playing?",
                name: "keepPlaying"
            }
        ]).then(function(response2){
            if (response2.keepPlaying === true){
                console.log("Great! Let's start a new game!");
                console.log("\n");
                newGame();
            }
            else {
                console.log("Play again soon!")
            }
        })
    }
    else if (guesses <= 0) {
        console.log("YOU RAN OUT OF GUESSES!!");
        inquirer.prompt([
            {
                type: "confirm",
                message: "Would you like to quit?",
                name: "quit"
            }
        ]).then(function(response2){
            if (response2.quit === true){
                console.log("Play again soon!");
            }
            else {
                console.log("Then let's start a new game!");
                console.log("\n");
                newGame();
            }
        })
    }
    else {
        console.log("\n");
        nextGuess();
    }
}

function nextGuess() {

    inquirer.prompt([
        {
            type: "list",
            message: "Pick a letter: ",
            choices: letters,
            name: "letterChoice"
        }
    ]).then(function (response1) {

        letters.splice(letters.indexOf(response1.letterChoice),1);

        if (letter.lettersSplit.indexOf(response1.letterChoice) > -1) {

            console.log("CORRECT!");


            for (var i = 0; i < letter.lettersSplit.length; i++) {
                if (response1.letterChoice === letter.lettersSplit[i]) {
                    letter.wordLetters[i].makeLetter();
                }
            }
        }
        else {
            guesses -= 1;
            console.log("INCORRECT!");
            console.log("Guesses left: " + guesses);
        }
        underscoreDisplay = "";
        for (var j = 0; j < letter.wordLetters.length; j++) {
            // letter.wordLetters[j].underscoreAppend();
            underscoreDisplay = underscoreDisplay + " " + letter.wordLetters[j].underscore;
        }
        console.log(underscoreDisplay);
        checkForWin();
    });
}

function newGame() {
    //reset random word
    var randomNumber = Math.round(Math.random() * (word.creatures.length));
    var randomWord = word.creatures[randomNumber];
    //reset letters
    wordToGuess = randomWord.toUpperCase();
    letter.lettersSplit = wordToGuess.split("");
    underscoreDisplay = "";
    letter.wordLetters = [];

    for (var i = 0; i < letter.lettersSplit.length; i++){
        var newLetter = new letter.Letter(letter.lettersSplit[i]);
        letter.wordLetters.push(newLetter);
        newLetter.underscoreAppend();
    }

    for (var j = 0; j < letter.wordLetters.length; j++) {
        // letter.wordLetters[j].underscoreAppend();
        underscoreDisplay = underscoreDisplay + " " + letter.wordLetters[j].underscore;
    }

    //reset guesses
    guesses = 10;
    //reset letters array
    letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
    //start the new game
    gameStart();
}