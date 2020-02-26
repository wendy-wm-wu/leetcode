/*
Given an array with n objects colored red, white or blue, sort them in-place so that objects of the same color are adjacent, with the colors in the order red, white and blue.

Here, we will use the integers 0, 1, and 2 to represent the color red, white, and blue respectively.

Note: You are not suppose to use the library's sort function for this problem.

Example:

Input: [2,0,2,1,1,0]
Output: [0,0,1,1,2,2]
Follow up:

A rather straight forward solution is a two-pass algorithm using counting sort.
First, iterate the array counting number of 0's, 1's, and 2's, then overwrite array with total number of 0's, then 1's and followed by 2's.
Could you come up with a one-pass algorithm using only constant space?
*/

/* Brute Force */ 

var sortColors = function(nums) {
  let count = {};
  for (let i = 0; i < nums.length; i++) {
      if (!count[nums[i]]) {
          count[nums[i]] = 1; 
      } else {
          count[nums[i]]++; 
      }
  }
  let i = 0;
  while (i < nums.length) {
      if (count[0] > 0) {
          nums[i] = 0; 
          count[0]--; 
      } else if (count[1] > 0) {
          nums[i] = 1; 
          count[1]--; 
      } else if (count[2] > 0) {
          nums[i] = 2; 
          count[2]--; 
      }
      i++; 
  }
  return nums; 
};

/* One Pass */ 
var sortColors = function(nums) {
  let low = 0;
  let high = nums.length - 1; 
  let temp;
  let i = 0; 
  while (i <= high) {
    if (nums[i] === 0) {
      temp = nums[i]; 
      nums[i] = nums[low]; 
      nums[low] = temp; 
      low++; 
    } else if (nums[i] === 2) {
      temp = nums[i];
      nums[i] = nums[high];
      nums[high] = temp; 
      high--; 
    }
    i++; 
  }
}