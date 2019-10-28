/*
Merge k sorted linked lists and return it as one sorted list. Analyze and describe its complexity.

Example:

Input:
[
  1->4->5,
  1->3->4,
  2->6
]
Output: 1->1->2->3->4->4->5->6
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function(lists) {
  if (lists.length === 0) {
      return null; 
  }
  //need at least two lists to merge 
  while (lists.length > 1) {
      let a = lists.shift();
      let b = lists.shift();
      let h = merge(a,b);
      lists.push(h);
  }
  return lists[0];
};

let merge = function(a, b) {
  let dummy = new ListNode(0);
  let temp = dummy;
  
  while (a !== null && b !== null) {
      if (a.val < b.val) {
          temp.next = a; 
          a = a.next; 
      } else {
          temp.next = b; 
          b = b.next; 
      }
      temp = temp.next; 
  } 
  if (a !== null) {
      temp.next = a; 
  }
  if (b !== null) {
      temp.next = b; 
  }
  return dummy.next; 
}



