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
  let queue = [];
  queue.push({ r: sr, c: sc, distance: path})
  let seen = new Array(grid.length).fill().map(() => Array(grid[0].length).fill(0));
  seen[sr][sc] = true; 

  while (queue.length > 0) {
    let curr = queue.shift();
    console.log('curr', curr);
    
    if (curr.r === tr && curr.c === tc) {
      return curr.distance; 
    }
    //check up
    let nextSteps = [[curr.r - 1, curr.c], [curr.r + 1, curr.c], [curr.r, curr.c - 1], [curr.r, curr.c + 1]];
    
    for (let i = 0; i < nextSteps.length; i++) {
      if (nextSteps[i][0] >= 0 && nextSteps[i][0] < grid.length && nextSteps[i][1] >= 0 && nextSteps[i][1] < grid[0].length && grid[nextSteps[i][0]][nextSteps[i][1]] && !seen[nextSteps[i][0]][nextSteps[i][1]]) {
        queue.push({ r: nextSteps[i][0], c: nextSteps[i][1], distance: curr.distance + 1 });
        seen[nextSteps[i][0]][nextSteps[i][1]] = true; 
      }
    }
    //check down
    //check left
    //check right
  }
return -1; 
}

console.log(shortestCellPath(grid, sr, sc, tr, tc)); 

/*
sr = starting row
sc = starting col
tr = target row
tc = target col

[row, col, distance]

seen[sr][sc] = true;
[[0,0]]

//input: matrix, 
//sr = 0, sc = 0, tr = 2, tc = 0

shortest path: Breadth First Search

start: [0, 0]
end: [2, 0]

1111
0001
1111

*/