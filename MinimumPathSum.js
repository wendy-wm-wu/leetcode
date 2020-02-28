/*
Given a m x n grid filled with non-negative numbers, find a path from top left to bottom right which minimizes the sum of all numbers along its path.

Note: You can only move either down or right at any point in time.

Example:

Input:
[
  [1,3,1],
  [1,5,1],
  [4,2,1]
]
Output: 7
Explanation: Because the path 1→3→1→1→1 minimizes the sum.
*/

var minPathSum = function(grid) {
  for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[0].length; j++) {
      if (i === 0 && j === 0) {
       continue; 
      } else if (i === 0) {
          grid[i][j] = grid[i][j] + grid[i][j - 1]; 
      } else if (j === 0) {
          grid[i][j] = grid[i][j] + grid[i - 1][j];
      } else {
          grid[i][j] = grid[i][j] + Math.min(grid[i - 1][j], grid[i][j - 1]); 
      }
  }
}
   return grid[grid.length - 1][grid[0].length - 1]; 
}
//////

var minPathSum = function(grid) {
  let min = Infinity; 
  let sum = 0; 
  function helper(sum, i, j) {
      //starting position, ending position 
      if (i < 0 || j < 0 || i >= grid.length || j >= grid[0].length) return; 
      if (i === grid.length - 1 && j === grid[0].length - 1) {
          if (sum < min) {
              min = sum; 
          }
          return; 
      }
      sum += grid[i][j]; 
      helper(sum, i + 1, j); 
      helper(sum, i, j + 1); 
  }
  helper(0, 0, 0)
  return min; 
};
/*
use DFS helper function to consider all possible paths
at each iteration, can only move down or right 
return path with lowest sum 

*/