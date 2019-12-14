// Write a recursive function for generating all permutations of an input string. Return them as a set. 

let string = 'cat';
//output: cat, cta, atc, act, tac, tca 

function getPermutations(string) {
  // base case
  if (string.length <= 1) {
    return new Set(string); 
  }

  let allCharsExceptLast = string.slice(0, -1);
  let lastChar = string[string.length - 1];

  let permutationsExceptLast = getPermutations(allCharsExceptLast); 

  let permutations = new Set(); 
  
  permutationsExceptLast.forEach(function(item) {
    for (let position = 0; position <= allCharsExceptLast.length; position++) {
      let permutation = item.slice(0, position) + lastChar + item.slice(position); 
      permutations.add(permutation);
    }
  });
  return permutations; 
 }

console.log(getPermutations(string)); 