/*Given a non-negative integer numRows, generate the first numRows of Pascal's triangle.


In Pascal's triangle, each number is the sum of the two numbers directly above it.

Example:

Input: 5
Output:
[
     [1],
    [1,1],
   [1,2,1],
  [1,3,3,1],
 [1,4,6,4,1]
]

*/
/**
 * @param {number} numRows
 * @return {number[][]}
 */
var generate = function(numRows) {
  //if numRows = 0, return []
  if (numRows === 0) {
      return [];
  }
  let triangle = [[1]]; 
  for (let i = 0; i < numRows - 1; i++) {
      let array = [1];
      for (let j = 1; j < triangle[i].length; j++) {
          array[j] = triangle[i][j] + triangle[i][j - 1];
      }
      array.push(1);
      triangle.push(array);
  }
  return triangle; 
  
  //let triangle = [[1]] to hold the first row 
  //use a loop to iterate through numRows and start at 1 
      //define an empty array to hold each row with a [1] for first item
  //use another loop to iterate each item in the array starting at 1st index
  //index from 1 to 2nd to last should be the first item + second..second + third.. so forth.. ex: row2[0][0] + row2[0][1] 
       //ex: row3[0][0] + row3[0][1] + .... 
  //push one into the array
  //push array into triangle
  //return triangle 
};

//Solution # 1//
