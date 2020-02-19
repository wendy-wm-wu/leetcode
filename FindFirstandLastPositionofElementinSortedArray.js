/*
Given an array of integers nums sorted in ascending order, find the starting and ending position of a given target value.

Your algorithm's runtime complexity must be in the order of O(log n).

If the target is not found in the array, return [-1, -1].

Example 1:

Input: nums = [5,7,7,8,8,10], target = 8
Output: [3,4]
Example 2:

Input: nums = [5,7,7,8,8,10], target = 6
Output: [-1,-1]
*/

var searchRange = function(nums, target) {
    let res = [-1, -1]; 
    let i = 0;
    let j = nums.length - 1; 
    while (i <= j) {
      let mid = Math.floor((i + j)/2); 
      if (nums[mid] < target) {
        i = mid + 1; 
      } else if (nums[mid] > target) {
        j = mid - 1; 
      } else {
        let left = mid, right = mid; 
        while (nums[left] === target && left >= 0) {
          left -= 1; 
        } 
        res[0] = left + 1; 
        while (nums[right] === target && right < nums.length) {
          right += 1; 
        }
        res[1] = right - 1; 
        return res; 
      }
    }
    return res; 
};
