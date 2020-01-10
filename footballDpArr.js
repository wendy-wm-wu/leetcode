let teamA = [1, 2, 3, 4];
let teamB = [2, 6]
//dpArr = [0, 1, 2, 3]
//output: [2, 3]

function footballTeams(teamA, teamB) {
  let dpArr = [0];
  let output = [];
  teamA.sort((a,b) => a - b); 
  let index = 1;                          //index = 2
  let sum = 0;
  for (let i = 0; i < teamA.length; i++) {
    if (teamA[i] <= index) {     
      sum++;                          //sum = 2
      if (teamA[i + 1] > index) {    
        dpArr[index] = sum;         //[0, 1, 2]
        index++;
      }
      if (i === teamA.length - 1) {
        dpArr[index] = sum;
      }
    } 
  }
  console.log(dpArr);
  for (let j = 0; j < teamB.length; j++) {
    let val = teamB[j]; 
    if (!dpArr[val]) {
      output.push(dpArr[dpArr.length - 1]);
    } else {
      output.push(dpArr[val]);
    }
  }
  return output; 
}

console.log(footballTeams(teamA,teamB)); 