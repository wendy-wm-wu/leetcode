let sentence = 'Sometimes (when I nest them (my parentheticals) too much (like this (and this))) they get confusing';

function getClosingParen(sentence, openingParenIndex) {
  var openNestedParens = 0; 

  for (var position = openingParenIndex + 1; position < sentence.length; position++) {
    var char = sentence[position]; 

    if (char === '(') {
      openNestedParens++; 
    } else if (char === ')') {
      if (openNestedParens === 0) {
        return position; 
      } else {
        openNestedParens--; 
      }
    }
  }
}

// function getClosingParen(sentence, openingParenIndex) {
//   let stringLength = sentence.length; 

//   for (let i = sentence.length - 1; i >= 0; i--) {
//     let char = sentence[i]; 
//     if (char === ')') {
//       return i; 
//     }
//   }
// }

console.log(getClosingParen(sentence, 10));