/*
Design and implement a data structure for Least Recently Used (LRU) cache. It should support the following operations: get and put.

get(key) - Get the value (will always be positive) of the key if the key exists in the cache, otherwise return -1.
put(key, value) - Set or insert the value if the key is not already present. When the cache reached its capacity, it should invalidate the least recently used item before inserting a new item.

The cache is initialized with a positive capacity.

Follow up:
Could you do both operations in O(1) time complexity?

Example:

LRUCache cache = new LRUCache( 2 

cache.put(1, 1);
cache.put(2, 2);
cache.get(1);       // returns 1
cache.put(3, 3);    // evicts key 2
cache.get(2);       // returns -1 (not found)
cache.put(4, 4);    // evicts key 1
cache.get(1);       // returns -1 (not found)
cache.get(3);       // returns 3
cache.get(4);       // returns 4


*/

class ListNode {
  constructor(key, val) {
      this.key = key;
      this.val = val;
      this.prev = this.next = null;
  }
}

class LRUCache {
  constructor(capacity) {
      this.dummy = this.tail = new ListNode();
      this.nodes = new Map();
      this.capacity = capacity;
  }
  
  remove(key) {
      const node = this.nodes.get(key);
      if (!node) return;
      node.prev.next = node.next;
      if (node.next) {
          node.next.prev = node.prev;
      } else {
          this.tail = node.prev;
      }
      this.nodes.delete(key);
  }
  
  get(key) {
      if (this.nodes.has(key)) {
          this.put(key, this.nodes.get(key).val);
          return this.tail.val;
      }
      return -1;
  }
  
  put(key, value) {
      this.remove(key);
      if (this.nodes.size === this.capacity) {
          this.remove(this.dummy.next.key);
      }
      const oldTail = this.tail;
      this.tail = oldTail.next = new ListNode(key, value);
      this.tail.prev = oldTail;
      this.nodes.set(key, this.tail);
  }
}


/////Solution 2//////
/**
 * @param {number} capacity
 */
var LRUCache = function(capacity) {
  this.capacity = capacity;
  this.cache = new Map();
};

/** 
* @param {number} key
* @return {number}
*/
LRUCache.prototype.get = function(key) {
  //get(key) gets the value of key 
  let temp = this.cache.get(key);
  //if the value exists in cache 
  //delete key from cache
  //set the new key value pair in cache
  //return temp
  if (temp) {
      this.cache.delete(key);
      this.cache.set(key, temp);
      return temp;
  } else {
      return -1; 
  }
};

/** 
* @param {number} key 
* @param {number} value
* @return {void}
*/
LRUCache.prototype.put = function(key, value) {
  if (this.cache.has(key)) {
      this.cache.delete(key);
  } else if (this.cache.size >= this.capacity) {
      this.cache.delete(this.cache.keys().next().value);
  }
  this.cache.set(key, value);
};

/** 
* Your LRUCache object will be instantiated and called as such:
* var obj = new LRUCache(capacity)
* var param_1 = obj.get(key)
* obj.put(key,value)
*/
