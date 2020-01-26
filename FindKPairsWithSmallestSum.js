/*
You are given two integer arrays nums1 and nums2 sorted in ascending order and an integer k.

Define a pair (u,v) which consists of one element from the first array and one element from the second array.

Find the k pairs (u1,v1),(u2,v2) ...(uk,vk) with the smallest sums.

Example 1:

Input: nums1 = [1,7,11], nums2 = [2,4,6], k = 3
Output: [[1,2],[1,4],[1,6]] 
Explanation: The first 3 pairs are returned from the sequence: 
             [1,2],[1,4],[1,6],[7,2],[7,4],[11,2],[7,6],[11,4],[11,6]
Example 2:

Input: nums1 = [1,1,2], nums2 = [1,2,3], k = 2
Output: [1,1],[1,1]
Explanation: The first 2 pairs are returned from the sequence: 
             [1,1],[1,1],[1,2],[2,1],[1,2],[2,2],[1,3],[1,3],[2,3]
Example 3:

Input: nums1 = [1,2], nums2 = [3], k = 3
Output: [1,3],[2,3]
Explanation: All possible pairs are returned from the sequence: [1,3],[2,3]
*/


var kSmallestPairs = function(nums1, nums2, k) {
  let len1 = nums1.length, len2 = nums2.length; 
  let arr = new Array(len1).fill(0), res = []; // [0, 0, 0]
  while (k-- > 0) {
    let min = Number.MAX_SAFE_INTEGER;
    let index = -1; 
    for (let i = 0; i < len1; i++) {
      if (arr[i] >= len2) {
        continue; 
      }
      if (nums1[i] + nums2[arr[i]] < min) {
        min = nums1[i] + nums2[arr[i]]; 
        index = i; 
      }
    }
    if (index === -1) {
      break; 
    }
    res.push([nums1[index], nums2[arr[index]]]);
    arr[index]++; 
  }
  return res; 
};


/*
res = [];

create pairs from both arrays and push pairs to res
//sort res 
//return k sorted from the list 

*/