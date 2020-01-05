/*
Given two strings s and t , write a function to determine if t is an anagram of s.

Example 1:

Input: s = "anagram", t = "nagaram"
Output: true
Example 2:

Input: s = "rat", t = "car"
Output: false
Note:
You may assume the string contains only lowercase alphabets.

Follow up:
What if the inputs contain unicode characters? How would you adapt your solution to such case?
*/

var isAnagram = function(s, t) {
  if (s.length !== t.length) return false; 
  let counts = {};
  for (let i = 0; i < s.length; i++) {
    let item = s[i];
    if (!counts[item]) {
      counts[item] = 1; 
    } else {
      counts[item]++; 
    }
  }
  for (let j = 0; j < t.length; j++) {
    let letter = t[j]; 
    if (!counts[letter]) {
      return false; 
    } else {
      counts[letter]--; 
    }
  }
  return true; 
}

let s = "anagram", t = "nagaram"; 
console.log(isAnagram(s, t)); 