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
};