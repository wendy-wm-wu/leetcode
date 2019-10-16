/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

var twoSum = function(nums, target) {
  const cache = {};
   //object to store unique pairings
   for (let i = 0; i < nums.length; i++) {
       let another = target - nums[i];
       
       if (another in cache) {
           return [cache[another], i];
       }
       //set value equal to its index 
       cache[nums[i]] = i; 
   }
   return null;
};


//Inputs: array of nums, target 
//Outputs: array with two nums that add up to target
//Constraints: cannot use same num
//Edge Cases: none