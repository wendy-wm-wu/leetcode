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
var gameOfLife = function(board) {
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          if (board[i][j] === 0) {
              countDead(i, j);
          }
          if (board[i][j] === 1) {
              countAlive(i, j);
          }
      }
  }
  
  for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board[0].length; j++) {
          if (board[i][j] === 2) {
              board[i][j] = 1; 
          } else if (board[i][j] === 3) {
              board[i][j] = 0;
          }
      }
  }
  return board; 
  
  let countDead = function(i, j) {
      //check out of bounds
      let aliveCount = 0; 
      if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) {
          return; 
      }
      if (board[i + 1][j] === 1) {
          aliveCount++; 
      }
      if (board[i - 1][j] === 1) {
          aliveCount++;
      }
      if (board[i][j + 1] === 1) {
          aliveCount++;
      }
      if (board[i][j - 1] === 1) {
          aliveCount++; 
      }
      if (aliveCount === 3) {
          board[i][j] = 2; 
      }
  }
  
  let countAlive = function(i, j) {
      let aliveCount = 0; 
      if (i < 0 || j < 0 || i >= board.length || j >= board[0].length) {
          return; 
      }
      if (board[i + 1][j] === 1) {
          aliveCount++; 
      }
      if (board[i - 1][j] === 1) {
          aliveCount++;
      }
      if (board[i][j + 1] === 1) {
          aliveCount++;
      }
      if (board[i][j - 1] === 1) {
          aliveCount++; 
      }
      if (aliveCount < 2) {
          board[i][j] = 3;
      } else if (aliveCount > 3) {
          board[i][j] = 3; 
      }
  }
  
};