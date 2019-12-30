/*
board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
]

Given word = "ABCCED", return true.
Given word = "SEE", return true.
Given word = "ABCB", return false.
*/

let board =
[
  ['A','B','C','E'],
  ['S','F','C','S'],
  ['A','D','E','E']
];

let word = "ABCB"; 

var exist = function(board, word) {
  var verify = function(i, j, board, index) {  //index of word 
    if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || index > word.length || board[i][j] !== word[index]) {
      return; 
    }
    index++; 
    board[i][j] = '#'; 
    if (index === word.length) {
      return true;  
    }

    if (verify(i + 1, j, board, index)) {
      return true; 
    }
    if (verify(i - 1, j, board, index)) {
      return true; 
    }
    if (verify(i, j - 1, board, index)) {
      return true; 
    }
    if (verify(i, j + 1, board, index)) {
      return true; 
    }
    board[i][j] = word[index--]; 
    return false; 
  }

  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[0].length; j++) {
      if (verify(i, j, board, 0)) {
        return true; 
      }
    }
  }
  return false; 
}

console.log(exist(board, word)); 

