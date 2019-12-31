/*
Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.

Note: For the purpose of this problem, we define empty string as valid palindrome.

Example 1:

Input: "A man, a plan, a canal: Panama"
Output: true
Example 2:

Input: "race a car"
Output: false
*/

let s = "A man, a plan, a canal: Panama"; 

var isPalindrome = function(s) {
  //sanitize string
  s = s.toLowerCase().replace(/[\W_]/g, ''); 
  let left = 0; 
  let right = s.length - 1; 

  while(left < right) {
    if (s[left] !== s[right]) {
      return false; 
    }
    left++;
    right--; 
  }
  return true; 
}

console.log(isPalindrome(s)); 