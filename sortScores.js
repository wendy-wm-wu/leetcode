var unsortedScores = [37, 37, 89, 41, 65, 91, 91, 53]; 
const HIGHEST_POSSIBLE_SCORE = 100; 

function sortScores(unsortedScores, highestPossibleScore) {
  var scoreCounts = [];
  //array of 0s at indices, 0 - highestPossibleScore
  for (let i = 0; i < highestPossibleScore + 1; i++) {
    scoreCounts.push(0); 
  }
  //populate scoreCounts
  for (let i = 0; i < unsortedScores.length; i++) {
    let score = unsortedScores[i]; 
    scoreCounts[score]++; 
  }
  //populate final sorted array 
  var sortedScores = [];
  
  for (let j = 0; j < scoreCounts.length; j++) {
    let count = scoreCounts[j]; 
    let score = j; 
    for (let time = 0; time < count; time++) {
      sortedScores.push(score); 
    }
  }
  return sortedScores;
}

/*
build an arary scoreCounts where the indicies represent scores and the values represent how many times the score appears
add the score to a new array sortedScores as many times as count of appearances 
*/

console.log(sortScores(unsortedScores, HIGHEST_POSSIBLE_SCORE)); 

