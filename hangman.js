//includes inquirer and letter.js
var inquirer = require("inquirer");
var letter = require("./letter.js");
var letters = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
var guesses = 10;
var underscoreDisplay = letter.underscoreDisplay;

//inquirer prompt to begin hangman game
inquirer.prompt([
    {
        type: "confirm",
        message: "Welcome to Mythical Creature Hangman! Are you ready to start?",
        name: "start"
    }
]).then(function (response) {
    if (response.start === true) {
        nextGuess();
    }
    else {
        return console.log("Come back when you're ready to play!");
    }
});

function checkForWin() {
    if (underscoreDisplay === (" " + letter.lettersSplit.join(" "))) {
        console.log("YOU WIN!!");
        console.log("Now for the next word...");
    }
    else if (guesses <= 0) {
        console.log("YOU LOSE!!");
        console.log("Play again soon!");
    }
    else {
        console.log("The game continues!");
        nextGuess();
    }
}

function nextGuess() {
    console.log(underscoreDisplay);
    inquirer.prompt([
        {
            type: "list",
            message: "Pick a letter: ",
            choices: letters,
            name: "letterChoice"
        }
    ]).then(function (response1) {
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