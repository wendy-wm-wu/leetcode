/*
Given n non-negative integers representing an elevation map where the width of each bar is 1, compute how much water it is able to trap after raining.


The above elevation map is represented by array [0,1,0,2,1,0,1,3,2,1,2,1]. In this case, 6 units of rain water (blue section) are being trapped. Thanks Marcos for contributing this image!

Example:

Input: [0,1,0,2,1,0,1,3,2,1,2,1]
Output: 6
*/
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let count = 0; 
  
  let helper = function(val, index) {
      index++;
      while (height[index] < val) {
          index++;
          if (height[index] >= val) {
              let difference = height[index] - val; 
              count += difference; 
          }
      }
      return index;
  }
  
  for (let i = 0; i < height.length; i++) {
      if (height[i] > 0) {
          let idx = helper(height[i], i);
      }
      i = idx; 
  }
  return count; 
  
};