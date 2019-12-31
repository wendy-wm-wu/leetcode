let matrix = [
[1, 0, 0, 0],
[1, 1, 1, 0],
[0, 1, 2, 1],
[0, 0, 0, 0]];

let path = new Array(matrix.length).fill().map(() => Array(matrix[0].length).fill(0));

let canMove = function(matrix, i, j) {
  if (i >= 0 && i < matrix.length && j >= 0 && j < matrix[0].length) {
    if (matrix[i][j] === 1) {
      return true; 
    } else if (matrix[i][j] === 2) {
      return 'Won';
    }
  }
  return false; 
}

var solveMaze = function(matrix, path, x, y) {
  //base condition --> reached the destination
  if (canMove(matrix, x, y) === 'Won') {
    path[x][y] = 1;
    console.log(path); 
    return path; 
  }
  // check
  if (canMove(matrix, x, y)) {
    path[x][y] = 1;
    // R, D, L, U
    if (solveMaze(matrix, path, x+1, y) ) {
      return true;
    } //right
    if (solveMaze(matrix, path, x, y+1)) {
      return true;
    } //down
    if (solveMaze(matrix, path, x-1, y)) {
      return true;
    } // left
    if (solveMaze(matrix, path, x, y-1)) {
      return true;
    } // up
    path[x][y] = 0; //backtracking
    return false;
  }
  return false;
};

console.log(solveMaze(matrix, path, 0, 0)); 