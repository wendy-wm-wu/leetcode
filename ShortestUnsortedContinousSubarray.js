/*
Given an integer array, you need to find one continuous subarray that if you only sort this subarray in ascending order, then the whole array will be sorted in ascending order, too.

You need to find the shortest such subarray and output its length.

Example 1:
Input: [2, 6, 4, 8, 10, 9, 15]
Output: 5
Explanation: You need to sort [6, 4, 8, 10, 9] in ascending order to make the whole array sorted in ascending order.
Note:
Then length of the input array is in range [1, 10,000].
The input array may contain duplicates, so ascending order here means <=.
*/

var findUnsortedSubarray = function(nums) {
  var length = nums.length; 
  var min = nums[nums.length - 1];
  var max = nums[0];

  var l = 0, r = nums.length - 1; 

  for (var i = 1; i <= nums.length - 2; i++) {
    if (nums[i] >= nums[i - 1] && nums[i] >= nums[i + 1]) {
      max = Math.max(max, nums[i]); 
    }
    if (nums[i] <= nums[i - 1] && nums[i] <= nums[i + 1]) {
      min = Math.min(min, nums[i]);
    }
  }
  while (nums[l] <= min) l++; 
  if (l === r + 1) return 0; 
  while (nums[r] >= max) r--; 
  return r - l + 1; 
};