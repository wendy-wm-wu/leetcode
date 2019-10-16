/*
Given two sorted integer arrays nums1 and nums2, merge nums2 into nums1 as one sorted array.

Note:

The number of elements initialized in nums1 and nums2 are m and n respectively.
You may assume that nums1 has enough space (size that is greater or equal to m + n) to hold additional elements from nums2.
Example:

Input:
nums1 = [1,2,3,0,0,0], m = 3
nums2 = [2,5,6],       n = 3

Output: [1,2,2,3,5,6]
*/
/**
 * @param {number[]} nums1
 * @param {number} m
 * @param {number[]} nums2
 * @param {number} n
 * @return {void} Do not return anything, modify nums1 in-place instead.
 */
var merge = function(nums1, m, nums2, n) {
  //while nums1 and nums2 have values
  //if item is greater in nums 1 than nums 2 
  //push nums2 item into output array
  //if less than
  //push nums 1 item into output array
  //if equal
  //push from first array
  //push from second array 
  //otherwise, push 
  //tackle leftovers from either arrays 
  //return output array
 let len = nums1.length - 1; 
  m--;
  n--;
  
  while (n >= 0) {
      if (nums1[m] > nums2[n]) {
          nums1[len] = nums1[m];
          m--;
      } else {
          nums1[len] = nums2[n];
          n--;
      }
      len--;
  }
  return nums1;
};

//inputs: array1, array2, m, n
//outputs: sorted array 
//constraints:
//edge cases:

//time complexity: O(n^2) nested for loop 