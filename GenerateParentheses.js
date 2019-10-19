/*
Given n pairs of parentheses, write a function to generate all combinations of well-formed parentheses.

For example, given n = 3, a solution set is:

[
  "((()))",
  "(()())",
  "(())()",
  "()(())",
  "()()()"
]
*/

/**
 * @param {number} n
 * @return {string[]}
 */
var generateParenthesis = function(n) {
  let res = [];
  
  let recurse = function(l, r, s) {
      if (l > r) {
          return;
      }
      if (l === 0 && r === 0) {
          res.push(s);
          return;
      }
      if (l > 0) {
          recurse(l - 1, r, s + '(');
      }
      if (r > 0) {
          recurse(l, r - 1, s + ')');
      }
  }
  recurse(n, n, ''); 
  return res; 
};