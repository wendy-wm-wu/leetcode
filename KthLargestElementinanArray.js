/*
Find the kth largest element in an unsorted array. Note that it is the kth largest element in the sorted order, not the kth distinct element.

Example 1:

Input: [3,2,1,5,6,4] and k = 2
Output: 5
Example 2:

Input: [3,2,3,1,2,4,5,5,6] and k = 4
Output: 4
Note:
You may assume k is always valid, 1 ≤ k ≤ array's length.
*/
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number}
 */
var findKthLargest = function(nums, k) {
  k -= 1
  findKthLargestImpl(nums, k);
  return nums[nums.length - 1 - k]; // Array is sorted already, so let's start by completing the problem with O(n*logn)
};

function findKthLargestImpl(nums, k, low = 0, high = nums.length - 1) {
  if (low >= high) {
      return;
  }
  const pivot = nums[high];
  let insertI = low;
  for (let i = low; i < high; i++) {
      if (nums[i] < pivot) {
          swap(nums, i, insertI++);
      }
  }
  swap(nums, insertI, high); //swap pivots
  
  findKthLargestImpl(nums, k, insertI + 1, high);
  findKthLargestImpl(nums, k, low, insertI - 1);
}

function swap(arr, i, j) {
  const tmp = arr[i];
  arr[i] = arr[j];
  arr[j] = tmp;
}


//input: nums arr, kth element
//output: largest kth element
//constraints: none
//if nums is emtpy, return null
