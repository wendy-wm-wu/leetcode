function movesToSolve(puzzle) {

  let hash = {}; 
  let target = ''; //sort puzzle 2d array 
  let min = Number.MAX_SAFE_INTEGER; //set to highest possible value 
  for (let i = 0; i < puzzle.length; i++) {
      for (let j = 0; j < puzzle[0].length; j++) {
          target += `,${puzzle[i][j]}`
          if (puzzle[i][j] === 0) {
              findSolutions(i, j, 0); 
              return; 
          }
      }
  }
  target = target.split(',').sort((a, b) => a - b).slice(1).join(','); 


  function findSolutions(row, col, length) {
    let counter = 0; 
    let compareStr = ''; 
    for (let row = 0; row < puzzle.length; row++) {
      for (let col = 0; col < puzzle[0].length; col++) {
       compareStr += `,${puzzle[row][col]}`;
      }
    }
    compareStr = compareStr.slice(1); 
    if (hash[compareStr] !== undefined && length >= hash[compareStr]) return; 
    hash[compareStr] = length; 

    if (compareStr === target) {
      min = Math.min(min, length); 
      return; 
    }
    for (let move of [[-1, 0], [1, 0], [0, -1], [0, 1]]) {
      const [r, c] = [row + move[0], col + move[1]]; 
      if (r < 0  || c < 0 || r === puzzle.length || c === puzzle[0].length) continue; 
      [puzzle[row][col], puzzle[r][c]] = [puzzle[r][c], puzzle[row][col]]; 
      findSolutions(r, c, length + 1); 
      [puzzle[row][col], puzzle[r][c]] = [puzzle[r][c], puzzle[row][col]]; 
    }
 }
}


var puzzle = [[1, 6, 3], [8, 7, 2], [4, 0, 5]]; 
console.log(movesToSolve(puzzle)); 