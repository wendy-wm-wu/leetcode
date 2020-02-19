/*
Given a set of candidate numbers (candidates) (without duplicates) and a target number (target), find all unique combinations in candidates where the candidate numbers sums to target.

The same repeated number may be chosen from candidates unlimited number of times.

Note:

All numbers (including target) will be positive integers.
The solution set must not contain duplicate combinations.
Example 1:

Input: candidates = [2,3,6,7], target = 7,
A solution set is:
[
  [7],
  [2,2,3]
]
Example 2:

Input: candidates = [2,3,5], target = 8,
A solution set is:
[
  [2,2,2,2],
  [2,3,3],
  [3,5]
]
*/

var combinationSum = function(candidates, target) {
  let output = [];
  function helper(index, sum, res) { 
    if (sum === target) {
      output.push([...res]); 
    }
    if (sum > target) {
      return; 
    }
    for (let i = index; i < candidates.length; i++) { //use index as starting to use the same index over again 
      res.push(candidates[i]); 
      helper(i, sum + candidates[i], res); 
      res.pop();
    }
  }
  helper(0, 0, []);
  return output; 
};