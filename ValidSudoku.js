/*
var isValidSudoku = function(board) {
    const rowRules = new Array(9).fill().map(() => new Set());
    const colRules = new Array(9).fill().map(() => new Set());
    const mixedRules = new Array(9).fill().map(() => new Set());
    
    for (let row = 0; row < 9; row++) {
        for (let col = 0; col < 9; col++) {
            let curr = board[row][col];
            
            const mixedIdx = Math.floor(row/3) * 3 + Math.floor(col/3);
            
            if (curr == '.') {
                continue;
            }
            
            const a = rowRules[row].has(curr)
            let b = colRules[col].has(curr);
            let c = mixedRules[mixedIdx].has(curr);
            
            if (a || b || c) {
                return false;
            }
            
            rowRules[row].add(curr);
            colRules[col].add(curr);
            mixedRules[mixedIdx].add(curr);
            
        }
    }
    return true;
};
*/

/*
Determine if a 9x9 Sudoku board is valid. Only the filled cells need to be validated according to the following rules:

Each row must contain the digits 1-9 without repetition.
Each column must contain the digits 1-9 without repetition.
Each of the 9 3x3 sub-boxes of the grid must contain the digits 1-9 without repetition.

A partially filled sudoku which is valid.

The Sudoku board could be partially filled, where empty cells are filled with the character '.'.

Example 1:

Input:
[
  ["5","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: true
Example 2:

Input:
[
  ["8","3",".",".","7",".",".",".","."],
  ["6",".",".","1","9","5",".",".","."],
  [".","9","8",".",".",".",".","6","."],
  ["8",".",".",".","6",".",".",".","3"],
  ["4",".",".","8",".","3",".",".","1"],
  ["7",".",".",".","2",".",".",".","6"],
  [".","6",".",".",".",".","2","8","."],
  [".",".",".","4","1","9",".",".","5"],
  [".",".",".",".","8",".",".","7","9"]
]
Output: false
Explanation: Same as Example 1, except with the 5 in the top left corner being 
    modified to 8. Since there are two 8's in the top left 3x3 sub-box, it is invalid.

*/

let board = [
    ["5","3",".",".","7",".",".",".","."],
    ["6",".",".","1","9","5",".",".","."],
    [".","9","8",".",".",".",".","6","."],
    ["8",".",".",".","6",".",".",".","3"],
    ["4",".",".","8",".","3",".",".","1"],
    ["7",".",".",".","2",".",".",".","6"],
    [".","6",".",".",".",".","2","8","."],
    [".",".",".","4","1","9",".",".","5"],
    [".",".",".",".","8",".",".","7","9"]
  ]; 

var isValidSudoku = function(board) {
    let rowRules = new Array(board.length).fill().map(() => new Set()); 
    let colRules = new Array(board.length).fill().map(() => new Set());
    let boxRules = new Array(board.length).fill().map(() => new Set()); 

    for (let row = 0; row < board.length; row++) {
        for (let col = 0; col < board[0].length; col++) {
            let curr = board[row][col]; 

            let mixedIndex = Math.floor(row/3) * 3 + Math.floor(col/3); 

            const a = rowRules[row].has(curr); 
            const b = colRules[col].has(curr);
            const c = boxRules[mixedIndex].has(curr);

            if (curr === '.') {
                continue;  //we only want to look at nums 
            }

            if (a || b || c) {
                return false; 
            }
            rowRules[row].add(curr);
            colRules[col].add(curr);
            boxRules[mixedIndex].add(curr); 
        }
    }
    return false; 
};
https://thoughtcatalog.com/callie-byrnes/2017/12/14-insanely-good-drinking-games-to-get-you-fucked-up-this-new-years-eve/
console.log(isValidSudoku(board)); 