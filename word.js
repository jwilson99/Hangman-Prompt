//**Word**: Used to create an object representing the current word the user is attempting to guess. This should contain word specific logic and data.

//array that stores potential hangman words with a theme of "mythical creatures"
var creatures = ["unicorn","dragon","wyvern","pegasus","centaur","harpy","mermaid","basilisk","cockatrice","gargoyle","elf","fairy","gnome","troll","salamander","griffin","tengu","phoenix","hippogriff","chimera","quetzalcoatl","sphinx","kappa","selkie","goblin","pixie"];

//chooses a word at random
var randomNumber = Math.round(Math.random() * (creatures.length));
var randomWord = creatures[randomNumber];

//constructor for creating an object for the user to guess
function Word(word) {
  this.word = word;
  this.wordlength = this.word.length;
};

var wordToGuess = new Word(randomWord.toUpperCase());

module.exports = wordToGuess;