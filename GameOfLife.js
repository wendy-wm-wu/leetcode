/*
According to the Wikipedia's article: "The Game of Life, also known simply as Life, is a cellular automaton devised by the British mathematician John Horton Conway in 1970."

Given a board with m by n cells, each cell has an initial state live (1) or dead (0). Each cell interacts with its eight neighbors (horizontal, vertical, diagonal) using the following four rules (taken from the above Wikipedia article):

Any live cell with fewer than two live neighbors dies, as if caused by under-population.
Any live cell with two or three live neighbors lives on to the next generation.
Any live cell with more than three live neighbors dies, as if by over-population..
Any dead cell with exactly three live neighbors becomes a live cell, as if by reproduction.
Write a function to compute the next state (after one update) of the board given its current state. The next state is created by applying the above rules simultaneously to every cell in the current state, where births and deaths occur simultaneously.

Example:

Input: 
[
  [0,1,0],
  [0,0,1],
  [1,1,1],
  [0,0,0]
]
Output: 
[
  [0,0,0],
  [1,0,1],
  [0,1,1],
  [0,1,0]
]
*/

/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
/**
 * @param {number[][]} board
 * @return {void} Do not return anything, modify board in-place instead.
 */
var gameOfLife = function(board) {
  var res = [];
  for (let i = 0; i < board.length; i++) {
     res[i] = [];
      for (let j = 0; j < board[0].length; j++) {
          res[i][j] = 0; 
      }
  }
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          var alive = 0; 
          
          if (i - 1 >= 0 && board[i - 1][j] === 1) {
              alive++; 
          }
          if (i + 1 < board.length && board[i + 1][j] === 1) {
              alive++; 
          }
          if (j + 1 < board[0].length && board[i][j + 1] === 1) {
              alive++;
          }
          if (j - 1 >= 0 && board[i][j - 1] === 1) {
              alive++; 
          }
          if (i - 1 >= 0 && j + 1 < board[0].length && board[i - 1][j + 1] === 1) {
              alive++; 
          }
          if (i + 1 < board.length && j + 1 < board[0].length && board[i + 1][j + 1] === 1) {
              alive++; 
          }
          if (i - 1 >= 0 && j - 1 >= 0 && board[i - 1][j - 1] === 1) {
              alive++; 
          }
          if (i + 1 < board.length && j - 1 >= 0 && board[i + 1][j - 1] === 1) {
              alive++; 
          }
          
          if (board[i][j] === 1) {
              if (alive < 2) {
                  res[i][j] = 0; 
              } else if (alive >= 2 && alive <= 3) {
                  res[i][j] = 1; 
              } else {
                  res[i][j] = 0; 
              }
          } else {
              if (alive === 3) {
                  res[i][j] = 1; 
              } else {
                  res[i][j] = 0; 
              }
          }
          
      }
  }
  //copy over everything from res to board 
  for (var i = 0; i < res.length; i++) {
      board[i] = res[i]; 
  }
};