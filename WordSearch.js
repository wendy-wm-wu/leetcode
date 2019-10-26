/*

Given a 2D board and a word, find if the word exists in the grid.

The word can be constructed from letters of sequentially adjacent cell, where "adjacent" cells are those horizontally or vertically neighboring. The same letter cell may not be used more than once.

Example:

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

/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */
var exist = function(board, word) {
    
  let verify = function(i, j, board, idx) {
      if (i < 0 || j < 0 || i >= board.length || j >= board[0].length || board[i][j] !== word[idx] || idx > word.length) {
          return false;
      }
      
      idx++;
      board[i][j] = '#';
      
      if (idx === word.length) {
          return true; 
      }
      
      if (verify(i + 1, j, board, idx)) {
          return true;
      }
      if (verify(i - 1, j, board, idx)) {
          return true;
      }
      if (verify(i, j + 1, board, idx)) {
          return true;
      }
      if (verify(i, j - 1, board, idx)) {
          return true; 
      }
      //if fails, backtrack
      //return false
      board[i][j] = word[--idx];
      return false
      
  }
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          if (verify(i, j, board, 0)) {
              return true;
          }
      }
  }
  return false; 
};