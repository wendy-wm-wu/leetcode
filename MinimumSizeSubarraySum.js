/*
Given an array of n positive integers and a positive integer s, find the minimal length of a contiguous subarray of which the sum ≥ s. If there isn't one, return 0 instead.

Example: 

Input: s = 7, nums = [2,3,1,2,4,3]
Output: 2
Explanation: the subarray [4,3] has the minimal length under the problem constraint.
Follow up:
If you have figured out the O(n) solution, try coding another solution of which the time complexity is O(n log n). 
*/

/**
 * @param {number} s
 * @param {number[]} nums
 * @return {number}
 */
var minSubArrayLen = function(s, nums) {
    let min = Infinity; 
    let sum = 0;
    let i = 0;
    for (let j = 0; j < nums.length; j++) {
      sum += nums[j];
      while (sum >= s) {
        min = Math.min(min, j - i + 1); 
        sum -= nums[i++]; 
      }
    }
    return min === Infinity ? 0 : min; 
};

/*
I: nums array, integer
O: minimum sub array where sum >= s
C: O(n)
E: if nums is empty, return 0