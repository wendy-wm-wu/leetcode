/*
Given two arrays, write a function to compute their intersection.

Example 1:

Input: nums1 = [1,2,2,1], nums2 = [2,2]
Output: [2,2]
Example 2:

Input: nums1 = [4,9,5], nums2 = [9,4,9,8,4]
Output: [4,9]
Note:

Each element in the result should appear as many times as it shows in both arrays.
The result can be in any order.
*/

/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number[]}
 */
var intersect = function(nums1, nums2) {
  let hash = {};
  let res = [];
  for (let i = 0; i < nums1.length; i++) {
    hash[nums1[i]] = hash[nums1[i]] + 1 || 1; 
  }
  for (let j = 0; j < nums2.length; j++) {
    if (hash[nums2[j]] > 0) {
      hash[nums2[j]]--; 
      res.push(nums2[j])
    }
  }
  return res; 
};

/*
iterate thru both arrays, if intersection, push to array 
two pointers and need to take into account shorter arrays 
*/