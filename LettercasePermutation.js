/*
Given a string S, we can transform every letter individually to be lowercase or uppercase to create another string.  Return a list of all possible strings we could create.

Examples:
Input: S = "a1b2"
Output: ["a1b2", "a1B2", "A1b2", "A1B2"]

Input: S = "3z4"
Output: ["3z4", "3Z4"]

Input: S = "12345"
Output: ["12345"]
*/

/**
 * @param {string} S
 * @return {string[]}
 */
var letterCasePermutation = (S) => {
  let result = [];
  dfs('', 0); 
  
  function dfs(current, i) {
     if (current.length === S.length) {
         result.push(current);
         return;
     }
      if (S.charAt(i) >= '0' && S.charAt(i) <= '9') {
          current += S.charAt(i); 
          dfs(current, i + 1); 
      } else {
          dfs(current + S.charAt(i).toLowerCase(), i + 1);
          dfs(current + S.charAt(i).toUpperCase(), i + 1); 
      }
  }
  return result; 
};