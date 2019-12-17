/*
Given a string s, find the longest palindromic substring in s. You may assume that the maximum length of s is 1000.

Example 1:

Input: "babad"
Output: "bab"
Note: "aba" is also a valid answer.
Example 2::

Input: "cbbd"
Output: "bb"
*/

/**
 * @param {string} s
 * @return {string}
 */
var longestPalindrome = function(s) {
  let startIndex = 0; 
  let maxLength = 1; 
  
  function expandAroundMiddle(left, right) {
      while (left >= 0 && right < s.length && s[left] === s[right]) {
          let currentPalLength = right - left + 1; 
          
          if (currentPalLength > maxLength) {
              maxLength = currentPalLength; 
              startIndex = left; 
          }
          left -= 1; 
          right += 1; 
      }
  }
  
  for (let i = 0; i < s.length; i++) {
      expandAroundMiddle(i, i + 1); //even
      expandAroundMiddle(i - 1, i + 1); //odd
  }
  return s.slice(startIndex, startIndex + maxLength);
};

/*

expand around middle
"b           a         b          ad"
startIndex       item in array 


"cb (add a space here) bd"

*/
