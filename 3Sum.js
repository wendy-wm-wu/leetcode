/*
Given an array nums of n integers, are there elements a, b, c in nums such that a + b + c = 0? Find all unique triplets in the array which gives the sum of zero.

Note:

The solution set must not contain duplicate triplets.

Example:

Given array nums = [-1, 0, 1, 2, -1, -4],

A solution set is:
[
  [-1, 0, 1],
  [-1, -1, 2]
]
*/

var threeSum = function(nums) {
  let curr = 0; 
  let sum = 0; 
  let output = [];
  
  if (nums.length <= 0) {
      return [];
  }
  let helper = function(curr, arr) {
      //base case 
      if (curr[0] + curr[1] + curr[2] === 0 && curr.length === 3) {
          output.push(curr);
          return;
      }
      for (let i = 0; i < nums.length; i++) {
          curr.push(nums[i]);
      }
  }
  helper([], nums);
  return output; 
};