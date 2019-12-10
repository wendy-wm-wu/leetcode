/*
Given an integer array nums, find the contiguous subarray within an array (containing at least one number) which has the largest product.

Example 1:

Input: [2,3,-2,4]
Output: 6
Explanation: [2,3] has the largest product 6.
Example 2:

Input: [-2,0,-1]
Output: 0
Explanation: The result cannot be 2, because [-2,-1] is not a subarray.


*/
/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function(nums) {
  if (!nums && !nums.length) {
     return nums;
 }
 let prevMax = nums[0];
 let prevMin = nums[0];
 let maxSoFar = nums[0];
 
 for (let i = 1; i < nums.length; i++) {
     let localMax = Math.max(prevMax * nums[i], nums[i], prevMin * nums[i]);
     let localMin = Math.min(prevMax * nums[i], nums[i], prevMin * nums[i]);
     
     prevMax = Math.max(localMax, localMin);
     prevMin = Math.min(localMax, localMin);
     
     maxSoFar = Math.max(maxSoFar, prevMax);
 }
 return maxSoFar;
}

//define maxProduct = 0;
//compare prev with curr
 //if max product, set has max product
//return maxProduct

//input: nums array
//output: contiguous subarray with largest product 
//constraints: none
//edge cases: if nums is empty, return 0 

