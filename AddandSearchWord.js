/*
Design a data structure that supports the following two operations:

void addWord(word)
bool search(word)
search(word) can search a literal word or a regular expression string containing only letters a-z or .. A . means it can represent any one letter.

Example:

addWord("bad")
addWord("dad")
addWord("mad")
search("pad") -> false
search("bad") -> true
search(".ad") -> true
search("b..") -> true
Note:
You may assume that all words are consist of lowercase letters a-z.
*/
var TrieNode = function() {
  this.children = {};
  this.isWord = false; 
}

var WordDictionary = function() {
  this.root = new TrieNode(); 
}

WordDictionary.prototype.addWord = function(word) {
  let current = this.root; 
  for (let i = 0; i < word.length; i++) {
    if (!(word[i] in current.children)) {
      current.children[word[i]] = new TrieNode(); 
    }
    current = current.children[word[i]]; //becomes next trienode 
  }
  current.isWord = true; 
}

WordDictionary.prototype.search = function(word) {
  var search = function(curr, level) {
    if (!curr || (level === word.length && !curr.isWord)) return false; //if curr is null or if the level = word length but it's not a word, return false 
    if (level === word.length && curr.isWord) return true; //if level = word length and curr is a word, return true 

    if (word[level] === '.') {   //checks when char is '.' 
      for (let i = 0; i < 26; i++) {
        let ch = String.fromCharCode(97 + i); //'a' = 97
        if (search(curr.children[ch], level + 1)) return true; 
      }
      return false; 
    }
    return search(curr.children[word[level]], level + 1); //search next letter if it exists 
  }
  return search(this.root, 0); //return results from helper function 
}
