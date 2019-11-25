/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?
*/var uniquePaths = function(m, n) {

/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
  var a = new Array(n).fill(1);
  console.log(a);
  var dp = new Array(m).fill(a);
  console.log(dp);
  for (var i = 1; i < m; i++) {
      for (var j = 1; j < n; j++) {
          dp[i][j] = dp[i - 1][j] + dp[i][j - 1];
      }
  }
  return dp[m - 1][n - 1];
};

/*



*/

};