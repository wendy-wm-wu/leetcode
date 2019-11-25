/*
Given a string s that consists of only uppercase English letters, you can perform at most k operations on that string.

In one operation, you can choose any character of the string and change it to any other uppercase English character.

Find the length of the longest sub-string containing all repeating letters you can get after performing the above operations.

Note:
Both the string's length and k will not exceed 104.

Example 1:

Input:
s = "ABAB", k = 2

Output:
4

Explanation:
Replace the two 'A's with two 'B's or vice versa.
*/

/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function(s, k) {
  //define a hash map {string: count}
  let hash = {};
  //define start idx at 0
  let start = 0;
  //define repeatingCount as 0
  let repeatingCount = 0;
  //define longestSubstr as 0
  let longestSubStr = 0;
  
  //iterate thru string
  for (let end = 0; end < s.length; end++) {
          hash[s[end]] = hash[s[end]] || 0;
          hash[s[end]]++;
          
          repeatingCount = Math.max(repeatingCount, hash[s[end]]);
          
          if ((end - start + 1) - repeatingCount > k) {
              hash[s[start]]--;
              start++;
          }
          
          longestSubStr = Math.max(longestSubStr, (end - start + 1));
  }
  return longestSubStr;
}
  //if letter is in hash
      //create window
      //set as 0 or where the item is in hash
      //increase hash's val
      
      //repeatingCount is the max of repeatingcount and the val of the letter count 
      //decrease size of window if the items that are not repeating chars greater than k
  
      //set substring to the max of the substring and the new substr
  
  //return substr