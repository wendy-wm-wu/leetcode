/*
Given a linked list, rotate the list to the right by k places, where k is non-negative.

Example 1:

Input: 1->2->3->4->5->NULL, k = 2
Output: 4->5->1->2->3->NULL
Explanation:
rotate 1 steps to the right: 5->1->2->3->4->NULL
rotate 2 steps to the right: 4->5->1->2->3->NULL
Example 2:

Input: 0->1->2->NULL, k = 4
Output: 2->0->1->NULL
Explanation:
rotate 1 steps to the right: 2->0->1->NULL
rotate 2 steps to the right: 1->2->0->NULL
rotate 3 steps to the right: 0->1->2->NULL
rotate 4 steps to the right: 2->0->1->NULL
*/

/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var rotateRight = function(head, k) {
  let tail = head; 
  if (!head) return null; 
  let len = 1; 
  while (tail.next) {
  tail = tail.next; 
  len++; 
  }
  tail.next = head; 
  let count = len - (k % len); 
  while (count > 0) {
      head = head.next; 
      tail = tail.next; 
      count--;
  }
  tail.next = null; //set tail end to null 
  return head; //return head with the new values 
};

/*
Set tail equal to the head to make it a continuous linked list 
Set count equal to the length of the linked list subtracted by k  % len 
Decrease count 
move head and tail to next 
Set tail.next to null
Return new linked list 

*/