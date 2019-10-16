/*
Given an integer array nums, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.

Example:

Input: [-2,1,-3,4,-1,2,1,-5,4],
Output: 6
Explanation: [4,-1,2,1] has the largest sum = 6.
*/

var maxSubArray = function(nums) {
  let currentMax = nums[0];
  let max = nums[0];
     for (let i = 1; i < nums.length; i++) {
         currentMax = Math.max(currentMax + nums[i], nums[i]);
         max = Math.max(currentMax, max);
     }
     return max;
 };
 
 //inputs: array
 //outputs: largest sum
 //constraints: none
 //edge cases: if array is empty, return 0 
 
 //define sum, initialize at 0 
 //recursively look at every possibility using dfs one number at a time
 //return the largest sum 