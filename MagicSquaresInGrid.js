/*
 A 3 x 3 magic square is a 3 x 3 grid filled with distinct numbers from 1 to 9 such that each row, column, and both diagonals all have the same sum.

Given an grid of integers, how many 3 x 3 "magic square" subgrids are there?  (Each subgrid is contiguous).

 

Example 1:

Input: [[4,3,8,4],
        [9,5,1,9],
        [2,7,6,2]]
Output: 1
Explanation: 
The following subgrid is a 3 x 3 magic square:
438
951
276

while this one is not:
384
519
762

In total, there is only one magic square inside the given grid.
*/

/**
 * @param {number[][]} grid
 * @return {number}
 */
var numMagicSquaresInside = function(grid) {
  let row = grid.length;
  let col = grid[0].length;
  let count = 0; 
  for (let r = 1; r < row - 1; r++) {
      for (let c = 1; c < col - 1; c++) {
          if (grid[r][c] === 5) {
              if (!countSquares(r, c, grid)) continue; 
              
              if (grid[r - 1][c - 1] + grid[r + 1][c + 1] !== 10) continue; 
              if (grid[r - 1][c + 1] + grid[r + 1][c - 1] !== 10) continue;
              if (grid[r - 1][c] + grid[r + 1][c] !== 10) continue;
              if (grid[r][c - 1] + grid[r][c + 1] !== 10) continue; 
              if (grid[r - 1][c - 1] + grid[r][c - 1] + grid[r + 1][c - 1] !== 15) continue;
              if (grid[r - 1][c + 1] + grid[r][c + 1] + grid[r + 1][c + 1] !== 15) continue; 
              if (grid[r - 1][c - 1] + grid[r - 1][c] + grid[r - 1][c + 1] !== 15) continue;
              if (grid[r + 1][c - 1] + grid[r + 1][c] + grid[r + 1][c + 1] !== 15) continue; 
              count += 1; 
          }
      }
  }
  return count; 
}

const countSquares = (row, col, grid) => {
  let set = new Set(); 
  for (let i = -1; i < 1; i++) {
      for (let j = -1; j < 1; j++) {
          if (set.has(grid[row + i][col + j]) || grid[row + i][col + j] < 1 || grid[row + i][col + j] > 9) {
              return false; 
          } else {
              set.add(grid[row + i][col + j]);
          }
      }
  }
  return true; 
}

/*
let count = 0; 
check if 3 x 3 square is possible (use set)
  check if 3 x 3 all equal the same value 
  iterate until not possible 
return count 

*/