/*
Given a pattern and a string str, find if str follows the same pattern.

Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in str.

Example 1:

Input: pattern = "abba", str = "dog cat cat dog"
Output: true
Example 2:

Input:pattern = "abba", str = "dog cat cat fish"
Output: false
Example 3:

Input: pattern = "aaaa", str = "dog cat cat dog"
Output: false
Example 4:

Input: pattern = "abba", str = "dog dog dog dog"
Output: false
Notes:
You may assume pattern contains only lowercase letters, and str contains lowercase letters that may be separated by a single space.
*/

var pattern = "abba", str = "dog dog dog dog"; 

var wordPattern = function(pattern, str) {
  if (str.length !== pattern.length) return false; 
  let hash = {};
  let arr = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    if (hash[pattern[i]]) {
      if (hash[pattern[i]] !== arr[i]) return false; 
    } else {
      if (Object.values(keys).indexOf(arr[i]) !== -1) {
        return false;
      } else {
        hash[pattern[i]] = arr[i];
      }
    }
  }
  return true; 
};

console.log(wordPattern(pattern, str)); 

/*
Input: pattern = "abba", str = "dog cat cat dog"
                              a    b   b   a

//use an hash to store  {'a' : 'dog'}
  //use hash to check 

*/