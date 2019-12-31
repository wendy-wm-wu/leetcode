let matrix = [
  [1, 0, 0, 0],
  [1, 1, 1, 0],
  [0, 1, 2, 1],
  [0, 0, 0, 0]];
  

function shortestPath(matrix, i, j) {
  let path = 0;
  let queue = [];
  queue.push({ r: i, c: j, distance: path }); 
  let seen = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0)); 
  seen[i][j] = true; 

  while (queue.length > 0) {
    let curr = queue.shift(); 
    if (matrix[curr.r][curr.c] === 2) {
      return curr.distance; 
    }
    let directions = [[curr.r + 1, curr.c], [curr.r - 1, curr.c], [curr.r, curr.c + 1], [curr.r, curr.c - 1]]; 
    for (let i = 0; i < directions.length; i++) {
      let direction = directions[i]; 
      if (direction[0] >= 0 && direction[0] < matrix.length && direction[1] >= 0 && direction[1] < matrix[0].length && matrix[direction[0]][direction[1]] === 1 && !seen[direction[0]][direction[1]]) {
        queue.push({ r: direction[0], c: direction[1], distance: curr.distance + 1 }); 
        seen[direction[0]][direction[1]] = true; 
      }
    }
    console.log(seen);
  }
  return 'no solution'; 
}

console.log(shortestPath(matrix, 0, 0)); 


  
