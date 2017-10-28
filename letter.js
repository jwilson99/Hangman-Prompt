// **Letter**: Used for each letter in the current word. Each letter object should either display an underlying character, or a blank placeholder (such as an underscore), depending on whether or not the user has guessed the letter. This should contain letter specific logic and data.

//includes word.js
var word = require("./word.js");
wordToGuess = word.wordToGuess.word;

//splits the word from words.js into an array of letters
var lettersSplit = wordToGuess.split("");

//a string to store underscores representing each letter fo the word to guess
var underscoreDisplay = "";

//constructor for each letter in the word object
function Letter(letter){
    this.letter = letter;
    this.underscore = "_";
    this.makeLetter = function(){
        this.underscore = this.letter;
    };
    this.underscoreAppend = function(){
        underscoreDisplay = underscoreDisplay + " " + this.underscore;
    }
}

var wordLetters = [];

//for loop creating an object for each letter in the word to guess
for (var i = 0; i < lettersSplit.length; i++){
  var newLetter = new Letter(lettersSplit[i]);
  wordLetters.push(newLetter);
  newLetter.underscoreAppend();
};


module.exports = {lettersSplit, wordLetters, underscoreDisplay,Letter};