/*
There are two sorted arrays nums1 and nums2 of size m and n respectively.

Find the median of the two sorted arrays. The overall run time complexity should be O(log (m+n)).

You may assume nums1 and nums2 cannot be both empty.

Example 1:

nums1 = [1, 3]
nums2 = [2]

The median is 2.0
Example 2:

nums1 = [1, 2]
nums2 = [3, 4]

The median is (2 + 3)/2 = 2.5
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function(nums1, nums2) {
  let totalLen = nums1.length + nums2.length;
  let idx1 = 0;
  let idx2 = 0;
  let curr;
  let prev; 
  
  while (idx1 + idx2 <= totalLen/2) {
      if (curr !== undefined) {
          prev = curr; 
      }
      let one = nums1[idx1];
      let two = nums2[idx2];
      
      if (one === undefined) {
          curr = two;
          idx2++;
      } else if (two === undefined) {
          curr = one;
          idx1++; 
      } else if (one < two) {
          curr = one;
          idx1++;
      } else {
          curr = two;
          idx2++;
      }
  }
  return totalLen % 2 === 0 ? (prev + curr) / 2 : curr;
};