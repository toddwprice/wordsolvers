const fs = require('fs');
const dictFilespec = 'dictionary.txt';

// get letters
const entry = process.argv[2]

if (!entry || entry.length != 7) {
  console.log(`USAGE:
  node spelling-bee.js ENTRY
    first letter should be center/yellow letter`);
}

const letters = entry.toLowerCase();

// get 5 letter words with no eliminated letters
const wordList = (fs.readFileSync(dictFilespec, {encoding: 'utf-8'}))
  .split('\n')
  .filter(word => word.length >= 4)
  .filter(word => {
    for (const letter of word.toLowerCase()) {
      if (letters[0] == letter) return true;
    }
    return false;
  })
  .filter(word => {
    for (const letter of word.toLowerCase()) {
      if (!letters.includes(letter)) return false;
    }
    return true;
  });

// look for panagrams
const panagrams = [];
for (let word of wordList) {
  let isMissingLetters = false;
  for (let letter of letters) {
    if (!word.split('').includes(letter)) {
      isMissingLetters = true;
      break;
    }
  }
  if (!isMissingLetters) {
    panagrams.push(word);
  }
}

console.log(wordList.join('\n'));
console.log('');
console.log('PANAGRAMS:');
if (panagrams.length == 0)
  console.log('none found 😟')
else
  console.log(panagrams.join('\n'));