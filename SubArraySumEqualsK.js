/*
Given an array of integers and an integer k, you need to find the total number of continuous subarrays whose sum equals to k.

Example 1:
Input:nums = [1,1,1], k = 2
Output: 2
*/

/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var subarraySum = function(nums, k) {
  let map = new Map();
  let count = 0; 
  let sum = 0;
  map.set(0, 1);
  
  for (let i = 0; i < nums.length; i++) {
      sum += nums[i];
      if (map.has(sum - k)) {
          count += map.get(sum - k);
      }
      if (map.has(sum)) {
          map.set(sum, map.get(sum) + 1);
      } else {
          map.set(sum, 1);
      }
  }
  return count;
};