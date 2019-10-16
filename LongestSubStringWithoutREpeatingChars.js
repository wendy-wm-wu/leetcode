/*
Given a string, find the length of the longest substring without repeating characters.

Example 1:

Input: "abcabcbb"
Output: 3 
Explanation: The answer is "abc", with the length of 3. 
Example 2:

Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
Example 3:

Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. 
             Note that the answer must be a substring, "pwke" is a subsequence and not a substring.

*/

/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function(s) {
  let max = 0; 
  let curr = 0; 
  let hash = {};
   
   //edge case
   if (s.length < 2) {
       return s.length;
   }
   for (let i = 0; i < s.length; i++) {
       if (hash[s[i]] == null) {
           curr++; 
       } else {
           curr = Math.min(i - hash[s[i]], curr + 1);
       }
       max = Math.max(max, curr); 
       hash[s[i]] = i; 
   }
   return max;
};
   
//Time: O(N)
//Space: O(N) - # number of letters in string 

//hash: { char: index }