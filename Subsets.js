/*
Given a set of distinct integers, nums, return all possible subsets (the power set).

Note: The solution set must not contain duplicate subsets.

Example:

Input: nums = [1,2,3]
Output:
[
  [3],
  [1],
  [2],
  [1,2,3],
  [1,3],
  [2,3],
  [1,2],
  []
]
*/ 
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function(nums) {
  let results = [];
  
  let dfs = function(curr, index) {
      results.push(curr);
      for (let i = index; i < nums.length; i++) {
          dfs([...curr, nums[i]], i + 1);
      }
  }
  dfs([], 0) 
  return results;
};/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
var findMedianSortedArrays = function(nums1, nums2) {
 let totalLen = nums1.length + nums2.length;
 let idx1 = 0;
 let idx2 = 0;
 let curr;
 let last;

 while (idx1 + idx2 <= totalLen/2) {
    if (curr !== undefined) {
     last = curr;
   }
   let elOne = nums1[idx1];
   let elTwo = nums2[idx2];
   if (elOne === undefined) {
     curr = elTwo;
     idx2++;
   } else if (elTwo === undefined) {
     curr = elOne;
     idx1++;
   } else if (elOne < elTwo) {
     curr = elOne;
     idx1++;
   } else {
     curr = elTwo;
     idx2++;
   }
 }
 return totalLen % 2 === 0 ? (last + curr) / 2 : curr;
};/**
* @param {number[]} nums1
* @param {number[]} nums2
* @return {number}
*/
var findMedianSortedArrays = function(nums1, nums2) {
 let totalLen = nums1.length + nums2.length;
 let idx1 = 0;
 let idx2 = 0;
 let curr;
 let last;

 while (idx1 + idx2 <= totalLen/2) {
    if (curr !== undefined) {
     last = curr;
   }
   let elOne = nums1[idx1];
   let elTwo = nums2[idx2];
   if (elOne === undefined) {
     curr = elTwo;
     idx2++;
   } else if (elTwo === undefined) {
     curr = elOne;
     idx1++;
   } else if (elOne < elTwo) {
     curr = elOne;
     idx1++;
   } else {
     curr = elTwo;
     idx2++;
   }
 }
 return totalLen % 2 === 0 ? (last + curr) / 2 : curr;
};