/*
Given two words (beginWord and endWord), and a dictionary's word list, find the length of shortest transformation sequence from beginWord to endWord, such that:

Only one letter can be changed at a time.
Each transformed word must exist in the word list. Note that beginWord is not a transformed word.
Note:

Return 0 if there is no such transformation sequence.
All words have the same length.
All words contain only lowercase alphabetic characters.
You may assume no duplicates in the word list.
You may assume beginWord and endWord are non-empty and are not the same.
Example 1:

Input:
beginWord = "hit",
endWord = "cog",
wordList = ["hot","dot","dog","lot","log","cog"]

Output: 5

Explanation: As one shortest transformation is "hit" -> "hot" -> "dot" -> "dog" -> "cog",
return its length 5.
Example 2:

Input:
beginWord = "hit"
endWord = "cog"
wordList = ["hot","dot","dog","lot","log"]

Output: 0

Explanation: The endWord "cog" is not in wordList, therefore no possible transformation.
*/
var ladderLength = function(beginWord, endWord, wordList) {
  if (!wordList.length) {
    return 0; 
  }
  let len = 1; 
  let queue = [beginWord]; 
  let dict = new Set(wordList); 
  let seen = new Set(queue); 


  while (queue.length > 0) {
    let next = []; //next word in queue
    for (let v of queue) {
      if (v === endWord) {
        return len; 
      }
      let arr = v.split('');
      for (let i = 0; i < arr.length; i++) {
        for (let num = 0; num < 26; num++) {
          arr[i] = String.fromCharCode(97 + num); 
          let nv = arr.join(''); 
          if (!seen.has(nv) && dict.has(nv)) {
            seen.add(nv); 
            next.push(nv); 
          }
        }
        arr[i] = v[i]; 
      }
    }
    queue = next; 
    len++; 
  }
  return len; 
}

console.log(ladderLength('hit', 'cog', ["hot","dot","dog","lot","log"]));
