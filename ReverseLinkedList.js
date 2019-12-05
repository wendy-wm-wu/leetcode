/*
Reverse a singly linked list.

Example:

Input: 1->2->3->4->5->NULL
Output: 5->4->3->2->1->NULL
*/

var reverseList = function(head) {
  let curr = head;
  let prev = null; 
  
  while (curr != null) {
      let temp = curr.next; 
      curr.next = prev; 
      prev = curr; 
      curr = temp; 
  }
  return prev; 
}

/*
null     1  ->    2     -> 3 -> 4 -> 5 -> null 
prev    curr    curr.next

null <-   1      2 -> 3 -> 4 -> 5 -> null 
prev    curr   

null <-   1      2 -> 3 -> 4 -> 5 -> null 
         prev    curr    

null <-   1  <-  2     3 -> 4 -> 5 -> null 
               prev    curr  
               
null <-   1  <-  2  <-  3       4 -> 5 -> null 
                       prev    curr  
                       
null <-   1  <-  2  <-  3  <-  4      5 -> null 
                             prev    curr  
                             
null <-   1  <-  2  <-  3  <-  4  <-  5      null 
                                     prev    curr  

return prev
*/