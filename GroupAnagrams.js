/*
Given an array of strings, group anagrams together.

Example:

Input: ["eat", "tea", "tan", "ate", "nat", "bat"],
Output:
[
  ["ate","eat","tea"],
  ["nat","tan"],
  ["bat"]
]
*/
/**
 * @param {string[]} strs
 * @return {string[][]}
 */
var groupAnagrams = function(strs) {
  let groups = {};
  for (let str of strs) {
      let key = [...str].sort().join('');
      
      if (!groups[key]) {
          groups[key] = [];
      }
      groups[key].push(str);
  }
  return Object.values(groups);
};