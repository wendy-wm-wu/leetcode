/*
Implement a trie with insert, search, and startsWith methods.

Example:

Trie trie = new Trie();

trie.insert("apple");
trie.search("apple");   // returns true
trie.search("app");     // returns false
trie.startsWith("app"); // returns true
trie.insert("app");   
trie.search("app");     // returns true
Note:

You may assume that all inputs are consist of lowercase letters a-z.
All inputs are guaranteed to be non-empty strings.
*/
var TrieNode = function() {
  this.next = new Array(26); 
  this.word = null; 
}

var Trie = function() {
  this.root = new TrieNode(); 
}

Trie.prototype.insert = function(word) {
  let curr = this.root; 
  for (let i = 0; i < word.length; i++) {
    if (!curr.next[word[i].charCodeAt(0) - 97]) { //'a' = 0, 'z' = 25 
      curr.next[word[i].charCodeAt(0) - 97] = new TrieNode(); 
    }
    curr = curr.next[word[i].charCodeAt(0) - 97]; 
  }
  curr.word = word; 
}

Trie.prototype.search = function(word) {
  let curr = this.root; 
  for (let i = 0; i < word.length; i++) {
    if (!curr.next[word[i].charCodeAt(0) - 97]) return false; 
    curr = curr.next[word[i].charCodeAt(0) - 97]; 
  }
  if (curr.word === word) {
    return true; 
  } else {
    return false; 
  }
}

Trie.prototype.startsWith = function(prefix) {
  let curr = this.root; 
  for (let i = 0; i < prefix.length; i++) {
    if (!curr.next[prefix[i].charCodeAt(0) - 97]) return false; 
    curr = curr.next[prefix[i].charCodeAt(0) - 97]; 
  }
  return true; 
}

