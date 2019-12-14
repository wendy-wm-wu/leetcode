// Write a recursive function for generating all permutations of an input string. Return them as a set. 

let string = 'cat';
//output: cat, cta, atc, act, tac, tca 

function getPermutations(string) {
  // base case
  let output = [];
  let copy = string.slice(); 

  let helper = function(curr, remaining) {
    if (curr.length === string.length) {
      output.push(curr); 
      return; 
    }
    for (let i = 0; i < remaining.length; i++) {
      let char = remaining[i]; 
      helper(curr + char, remaining.slice(0, i) + remaining.slice(i + 1)); 
    }
  }
  helper("", copy); 
  return output; 
 }

console.log(getPermutations(string)); 