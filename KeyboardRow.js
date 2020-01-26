/*
Given a List of words, return the words that can be typed using letters of alphabet on only one row's of American keyboard like the image below.

Example:

Input: ["Hello", "Alaska", "Dad", "Peace"]
Output: ["Alaska", "Dad"]
*/

/**
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(words) {
  let res = [];
  for (let i = 0; i < words.length; i++) {
      let word = words[i].split('');
      let rowNumber = keyboard[word[0].toLowerCase()]; 
      if (word.length === 1) {
          if (keyboard[word[0].toLowerCase()] === rowNumber) {
              res.push(word.join(''));
          } else {
              break;
          }
      }
      for (let j = 1; j < word.length; j++) {
          let letter = word[j].toLowerCase(); 
          if (keyboard[letter] !== rowNumber) {
              break; 
          } else if (j === word.length - 1 && keyboard[letter] === rowNumber) {
              res.push(word.join(''));
          }
      }
  }
  return res; 
};

let keyboard = {
  'q': 0,
  'w': 0,
  'e': 0,
  'r': 0,
  't': 0,
  'y': 0,
  'u': 0,
  'i': 0,
  'o': 0,
  'p': 0,
  'a': 1,
  's': 1,
  'd': 1,
  'f': 1,
  'g': 1,
  'h': 1,
  'j': 1,
  'k': 1,
  'l': 1,
  'z': 2,
  'x': 2,
  'c': 2,
  'v': 2,
  'b': 2,
  'n': 2,
  'm': 2,
}

/*
["Hello", "Alaska", "Dad", "Peace"]
define result arr  []
split each word into letters
iterate thru that 
check if items is in obj
if it is in specific obj, keep checking 
if entire word is in obj
push it to res array 

*/