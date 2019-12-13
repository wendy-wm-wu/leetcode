let sentence = 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing'; 

function getClosingParen(sentence, openingParenIndex) {
  let stringLength = sentence.length; 

  for (let i = sentence.length - 1; i >= 0; i--) {
    let char = sentence[i]; 
    if (char === ')') {
      return i; 
    }
  }
}

console.log(getClosingParen(sentence, 10));