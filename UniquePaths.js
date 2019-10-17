/*
A robot is located at the top-left corner of a m x n grid (marked 'Start' in the diagram below).

The robot can only move either down or right at any point in time. The robot is trying to reach the bottom-right corner of the grid (marked 'Finish' in the diagram below).

How many possible unique paths are there?
*/var uniquePaths = function(m, n) {

 // Init board.
 let board = Array(m).fill(null).map(()=>{
  return Array(n).fill(0)
})

// Base case.
// There is only one way of getting to board[0][any] and
// there is also only one way of getting to board[any][0].
// This is because we have a restriction of moving right
// and down only.

for (let rowIndex = 0; rowIndex < m; rowIndex += 1) {
for (let columnIndex = 0; columnIndex < n; columnIndex += 1) {
 if (rowIndex === 0 || columnIndex === 0) {
   board[rowIndex][columnIndex] = 1;
 }
}
}

// Now, since we have this restriction of moving only to the right
// and down we might say that number of unique paths to the current
// cell is a sum of numbers of unique paths to the cell above the
// current one and to the cell to the left of current one.

for (let rowIndex = 1; rowIndex < m; rowIndex += 1) {
for (let columnIndex = 1; columnIndex < n; columnIndex += 1) {
 const uniquesFromTop = board[rowIndex - 1][columnIndex];
 const uniquesFromLeft = board[rowIndex][columnIndex - 1];
 board[rowIndex][columnIndex] = uniquesFromTop + uniquesFromLeft;
}
}

return board[m - 1][n - 1];

};