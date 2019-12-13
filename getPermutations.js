// Write a recursive function for generating all permutations of an input string. Return them as a set. 

let string = 'cat';
//output: cat, cta, atc, act, tac, tca 

function getPermutations(string) {
  let permutations = new Set(); 
  let copy = string.slice();

  let helper = function(curr, stringRemaining) {
    if (curr.length === string.length) {
      permutations.add(curr); 
    }
    for (let i = 0; i < copy.length; i++) {
      let letter = copy[i];
      helper(curr + letter, copy.slice(0, i) + copy.slice(i + 1);
    }
  }
  helper('', copy);
  return permutations;
}

console.log(getPermutations(string)); 