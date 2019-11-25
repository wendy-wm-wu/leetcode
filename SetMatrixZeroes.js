/*
Given a m x n matrix, if an element is 0, set its entire row and column to 0. Do it in-place.

Example 1:

Input: 
[
  [1,1,1],
  [1,0,1],
  [1,1,1]
]
Output: 
[
  [1,0,1],
  [0,0,0],
  [1,0,1]
]
Example 2:

Input: 
[
  [0,1,2,0],
  [3,4,5,2],
  [1,3,1,5]
]
Output: 
[
  [0,0,0,0],
  [0,4,5,0],
  [0,3,1,0]
]
*/
/**
 * @param {number[][]} matrix
 * @return {void} Do not return anything, modify matrix in-place instead.
 */
var setZeroes = function(matrix) {
  let firstColHasZeros = false;
  let firstRowHasZeros = false;
    //check if first col has 0 
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i][0] === 0) {
            firstColHasZeros = true;
            break;
        } 
    }
   //check if first row has 0
    for (let j = 0; j < matrix[0].length; j++) {
        if (matrix[0][j] === 0) {
            firstRowHasZeros = true;
            break;
        }
    }
        
    //iterate thru matrix and use first row and first col as flags
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[0].length; j++) {
            if (matrix[i][j] === 0) {
                matrix[i][0] = 0;
                matrix[0][j] = 0; 
            }
        }
    }
    //zero out cells based on flags in first row and col
    for (let i = 1; i < matrix.length; i++) {
        for (let j = 1; j < matrix[0].length; j++) {
            if (matrix[i][0] === 0 || matrix[0][j] === 0) {
                matrix[i][j] = 0;
            }
        }
    }
    
    if (firstColHasZeros) {
         for (let i = 0; i < matrix.length; i++) {
            matrix[i][0] = 0;
        }
    }
    if (firstRowHasZeros) {
        for (let j = 0; j < matrix[0].length; j++) {
            matrix[0][j] = 0; 
        }
    }
    
};