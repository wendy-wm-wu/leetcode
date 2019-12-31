/*
Given a non-empty string s and a dictionary wordDict containing a list of non-empty words, determine if s can be segmented into a space-separated sequence of one or more dictionary words.

Note:

The same word in the dictionary may be reused multiple times in the segmentation.
You may assume the dictionary does not contain duplicate words.
Example 1:

Input: s = "leetcode", wordDict = ["leet", "code"]
Output: true
Explanation: Return true because "leetcode" can be segmented as "leet code".
Example 2:

Input: s = "applepenapple", wordDict = ["apple", "pen"]
Output: true
Explanation: Return true because "applepenapple" can be segmented as "apple pen apple".
             Note that you are allowed to reuse a dictionary word.
Example 3:

Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]
Output: false
*/

let s = "catsandog";
let wordDict = ["cats", "dog", "sand", "and", "cat"]; 

var wordBreak = function(s, wordDict) {
  if (wordDict.length === 0) return false; 
  if (wordDict.length === 1) return wordDict[0] === s; 

  let set = new Set(); 
  let queue = ['']; 

  for (let word of wordDict) {
    let base = queue.shift();

    let combinedWord = base + word; 

    if (combinedWord === s) {
      return true; 
    }
    if (s.indexOf(combinedWord) === 0 && !set.has(combinedWord)) {
      set.add(combinedWord);
      queue.push(combinedWord);  
    }
  }
  return false; 
}

console.log(wordBreak(s, wordDict)); 


/*
Input: s = "catsandog", wordDict = ["cats", "dog", "sand", "and", "cat"]

check is set has word 
set = { 'cats', 'catsand' } => to take in uniques 

iterate thru words in wordDict
if combined word = s => return true 
combinedWord = 'cats';
combinedWord = 'catsand';

if (combinedword)) is in 's' and not in set, add to set and push to queue 

queue 
[''] start with an empty string 
['catsand' ]

*/