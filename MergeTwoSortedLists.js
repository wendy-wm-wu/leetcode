/*
Merge two sorted linked lists and return it as a new list. The new list should be made by splicing together the nodes of the first two lists.

Example:

Input: 1->2->4, 1->3->4
Output: 1->1->2->3->4->4
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var mergeTwoLists = function(l1, l2) {
  let mergedHead = { val: -1, next: null};
  let curr = mergedHead;
  while (l1 && l2) {
      if (l1.val > l2.val) {
          curr.next = l2;
          l2 = l2.next; 
      } else {
          curr.next = l1;
          l1 = l1.next; 
      }
      curr = curr.next;
  }
  curr.next = l1 || l2;
  return mergedHead.next; 
  //check first value of both linked lists 
  //if smallest, set as head 
  //if equal, add both to the list
  //check if l1 or l2 has second smallest val
  //add to to the new linked list and so forth
  //when all nodes have been exhausted from both lists
  //return new linked list 
};

//inputs: two linked lists
//outputs: merged sorted linked list
//constraints: splice together nodes of the two lists
//edge cases: take into account duplicates 
//if one list is empty, return the other list 