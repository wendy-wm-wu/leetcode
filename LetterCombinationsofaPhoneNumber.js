/*
Given a string containing digits from 2-9 inclusive, return all possible letter combinations that the number could represent.

A mapping of digit to letters (just like on the telephone buttons) is given below. Note that 1 does not map to any letters.

        '2': ['a','b','c'],
        '3': ['d','e','f'],
        '4': ['g','h','i'],
        '5': ['j','k','l'],
        '6': ['m','n','o'],
        '7': ['p','q','r','s'],
        '8': ['t','u','v'],
        '9': ['w','x','y','z']

Example:

Input: "23"
Output: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"].
*/

var letterCombinations = function(digits) {
  let map = {
    '2': ['a','b','c'],
    '3': ['d','e','f'],
    '4': ['g','h','i'],
    '5': ['j','k','l'],
    '6': ['m','n','o'],
    '7': ['p','q','r','s'],
    '8': ['t','u','v'],
    '9': ['w','x','y','z']
  };

  if (!digits.length || digits.length === 0) {
    return [];
  }
  if (digits.length === 1) {
    return map[digits[0]];
  }
  let output = [];
  let set1 = letterCombinations(digits.substr(0, 1));
  let set2 = letterCombinations(digits.substr(1));
  
  for (let i = 0; i < set1.length; i++) {
    for (let j = 0; j < set2.length; j++) {
      output.push(set1[i] + set2[j]); 
    }
  }
  return output; 
}

//Strategy
//edge case(s)
//map out number and array of possibilities per number
//define an output as empty array 
//call letterCombinations on the first digit
//call leterCombinations on the second digit 

//iterate thru string (neseted) to hit all options of the string
  //push possibilities to output 


//input: string of digits
//output: array of strings of all possibilities
//constraints: none
//edge cases: if digits is empty, return []
  //if digits length is 1, return the corresponding letter 


