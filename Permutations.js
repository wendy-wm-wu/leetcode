/*
Given a collection of distinct integers, return all possible permutations.

Example:

Input: [1,2,3]
Output:
[
  [1,2,3],
  [1,3,2],
  [2,1,3],
  [2,3,1],
  [3,1,2],
  [3,2,1]
]
*/

/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function(nums) {
  let output = [];
  let helper = function(current, remaining) {
      if (remaining.length <= 0) {
          output.push(current.slice());
      }
      for (let i = 0; i < remaining.length; i++) {
          current.push(remaining[i]);
          helper(current.slice(), remaining.slice(0, i).concat(remaining.slice(i + 1)));
          current.pop();
      }
  }
  helper([], nums);
  return output; 
};

//inputs: an array 
//outputs: an array of arrays
//constraints: none
//edge cases: if empty, return empty array 