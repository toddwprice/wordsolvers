const fs = require('fs');
const dictLocal = 'dictionary.txt';
const dictMac = '/usr/share/dict/words';
const output = 'new-dictionary.txt';

// load dictionaries into arrays
let localArray = fs.readFileSync(dictLocal, {encoding: 'utf-8'}).split('\n');
let macArray = fs.readFileSync(dictMac, {encoding: 'utf-8'}).split('\n');

// add mac entries that do not begin with an upper-case letter to local
// let i = 0;
// let newEntries = 0;
// for (let entry of macArray.filter(e => e[0] && e[0].toLowerCase() == e[0])) {
//   i++;
//   console.log(`${i} of ${macArray.length}`);
//   if (localArray.includes(entry)) continue;
//   localArray.push(entry);
//   newEntries++;
//   console.log(`Added new entry #${newEntries}`);
// }
// localArray.sort();

localArray = localArray
  .concat(macArray)
  .filter(e => e.length >= 4)
  .filter(e => e[0] && e[0].toLowerCase() == e[0])
  .filter(e => !e.includes('-'))
  .sort();

uniqueArray = [...new Set(localArray)];


fs.writeFileSync(output, uniqueArray.join('\n'), {encoding: 'utf-8'});
console.log('Done!');