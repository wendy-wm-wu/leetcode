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
/**
 * @param {number[]} height
 * @return {number}
 */
var trap = function(height) {
  let trapped = 0; 
   let left = 0; 
   let leftHeight = 0;  
   let right = height.length - 1; 
   let rightHeight = 0; 
   
   while (left <= right) {
       if (leftHeight <= rightHeight) {
           leftHeight = Math.max(leftHeight, height[left]); 
           trapped += leftHeight - height[left];
           left++; 
       } else {
           rightHeight = Math.max(rightHeight, height[right]);
           trapped += rightHeight - height[right];
           right--;
       }
   }
   return trapped;
};