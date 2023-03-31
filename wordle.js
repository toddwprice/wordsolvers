const fs = require('fs');
const { exit } = require('process');
const dictFilespec = 'dictionary.txt';

// get guess
const guess = process.argv[2];
const eliminated = process.argv[3];

if (!guess || guess.length != 5) {
  console.log(`USAGE:
  node wordle.js GUESS
    GUESS = '_', 'a', 'A'
      _ is unknown
      a is known
      A is known position
  
  First guesses:
    SLATE
    CRANE
    TRACE
    SLANT
    CRATE
    CARTE

  Second guesses:
    DEMON
    MOLDY
    MONTH
    MODEL
    MELON
  `);
  exit(1);
}

// get 5 letter words with no eliminated letters
const wordList = (fs.readFileSync(dictFilespec, {encoding: 'utf-8'}))
  .split('\n')
  .filter(w => w.length == 5)
  .filter(w => {
    for (let e = 0; e < eliminated.length; e++) {
      if (w.toLowerCase().includes(eliminated[e].toLowerCase())) return false;
    }

    return true;
  })

const wordHasLetterInPosition = (word, letter, position) => {
  return word[position].toLowerCase() == letter.toLowerCase();
}

// search for possible matches
for (let word of wordList) {
  word = word.toLowerCase();
  let wordIsMatch = true;

  for (let i = 0; i < 5; i++) {
    const letter = guess[i];

    if (letter == '_') {
      continue;
    }

    else if (letter.toLowerCase() == letter && word.includes(letter) && word[i] != letter) {      
      continue;
    }

    else if (letter.toUpperCase() == letter && word[i] == letter.toLowerCase()) {
      continue;
    }

    wordIsMatch = false;
  }

  if (wordIsMatch) console.log(word);
}