// write an efficient function that checks whether any permutation of an input string is a palindrome 

let string1 = 'civic';  //true
let string2 = 'ivicc'; //true
let string3 = 'civil' //false

function hasPalindromePermutation(string) {
  //track character we've seen an odd number of times 
  var unpairedCharacters = new Set(); 

  for (let i = 0; i < string.length; i++) {
    let char = string[i];
    if (unpairedCharacters.has(char)) {
      unpairedCharacters.delete(char);
    } else {
      unpairedCharacters.add(char);
    }
  }
  return unpairedCharacters.size <= 1; 
}

console.log(hasPalindromePermutation(string2));



