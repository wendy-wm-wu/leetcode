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
    // { letter : last seen in string - index } 
    let windowCharsMap = {};
    let windowStart = 0;
    let maxLength = 0; 
    
    for (let i = 0; i < s.length; i++) {
        let endChar = s[i];
        
        if (windowCharsMap[endChar] >= windowStart) {
            windowStart = windowCharsMap[endChar] + 1; 
        }
        windowCharsMap[endChar] = i; 
        maxLength = Math.max(maxLength, i - windowStart + 1); 
    }
    return maxLength; 
};
   
//Time: O(N)
//Space: O(N) - # number of letters in string 

//hash: { char: index }