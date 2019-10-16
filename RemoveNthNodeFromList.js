/*
Given a linked list, remove the n-th node from the end of list and return its head.

Example:

Given linked list: 1->2->3->4->5, and n = 2.

After removing the second node from the end, the linked list becomes 1->2->3->5.
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
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function(head, n) {
  let pointer1 = head; 
  let pointer2 = head; 
   
   //put pointer2 at n items ahead of pointer1
   for (let i = 0; i < n; i++) {
       pointer2 = pointer2.next;
   }
   
   if (!pointer2) {
       return head.next;
   }
   //bring pointer2 all the way to end of linked list
   while (pointer2.next) {
       pointer1 = pointer1.next;
       pointer2 = pointer2.next; 
   }
   pointer1.next = pointer1.next.next;
   return head;
};