/*
In a given grid of 0s and 1s, we have some starting row and column sr, sc and a target row and column tr, tc. Return the length of the shortest path from sr, sc to tr, tc that walks along 1 values only.

Each location in the path, including the start and the end, must be a 1. Each subsequent location in the path must be 4-directionally adjacent to the previous location.

It is guaranteed that grid[sr][sc] = grid[tr][tc] = 1, and the starting and target positions are different.

If the task is impossible, return -1.

Examples:

input:
grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 1, 1, 1]]
sr = 0, sc = 0, tr = 2, tc = 0
output: 8
(The lines below represent this grid:)
1111
0001
1111

grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 0, 1, 1]]
sr = 0, sc = 0, tr = 2, tc = 0
output: -1
(The lines below represent this grid:)
1111
0001
1011
Constraints:

[time limit] 5000ms
[input] array.array.integer grid
1 ≤ arr.length = arr[i].length ≤ 10
[input] integer sr
[input] integer sc
[input] integer tr
[input] integer tc
All sr, sc, tr, tc are valid locations in the grid, grid[sr][sc] = grid[tr][tc] = 1, and (sr, sc) != (tr, tc).
[output] integer
*/
var grid = [[1, 1, 1, 1], [0, 0, 0, 1], [1, 0, 1, 1]];
var sr = 0, sc = 0, tr = 2, tc = 0; 

function shortestCellPath(grid, sr, sc, tr, tc) {
  let path = 0; 
  //seen 
  //queue
  let seen = new Array(grid.length).fill().map(() => Array(grid[0].length).fill(0)); 
  let node = { r: sr, c: sc, distance: path }; //will be returning path 
  let queue = [];
  queue.push(node); 
  seen[sr][sc] = true; 

  while (queue.length > 0) {
    let current = queue.shift(); 

    if (current.r === tr && current.c === tc) {
      return current.distance;
    }
    let moves = [[current.r + 1, current.c], [current.r - 1, current.c], [current.r, current.c + 1], [current.r, current.c - 1]]; 

    for (let i = 0; i < moves.length; i++) {
      if (moves[i][0] >= 0 && moves[i][0] < grid.length && moves[i][1] >= 0 && moves[i][1] < grid[0].length && grid[moves[i][0]][moves[i][1]] && !seen[moves[i][0]][moves[i][1]]) {
        queue.push({ r: moves[i][0], c: moves[i][1], distance: current.distance + 1 });
        seen[moves[i][0]][moves[i][1]] = true; 
      }
    }
  }
  return -1; 
  //walk along 1s only 
  //return - 1 if impossible
}

console.log(shortestCellPath(grid, sr, sc, tr, tc)); 
