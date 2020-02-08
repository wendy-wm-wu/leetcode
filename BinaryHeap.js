/*
We start with an array with the uppermost parent node:

[100]

The parent node's children come next, ordered left to right:

[100, 19, 36]

Then the "19" node's children, again left to right:

[100, 19, 36, 17, 3]

As well as the "36" node's children:

[100, 19, 36, 17, 3, 25, 1]

See a pattern emerging?
If a given node is located at index 'x' in the array, its left child exists at
index = 2x + 1, and its right child exists at index = 2x + 2.  Each node's parent exists
at index = x / 2 (rounded down).

So the final binary heap array looks like this:

[100, 19, 36, 17, 3, 25, 1, 2, 7]

And we can find any given child's parent/children using our algorithm.  For instance,
the "25" node exists at index = 5, therefore its parent must exist at 5/2 rounded down
which equals 2.  It works!
*/

class minHeap {
  constructor() {
    /* Initialing the array heap and adding a dummy element at index 0 */
    this.heap = [null]; 
  }

  getMin = () => {
    /* Accessing the min element at index 1 in the heap array */
    return this.heap[1]; 
  }

  insert = (node) => {
    /* Inserting the new node at the end of the heap array */
    this.heap.push(node); 
    /* Finding the correct position for the new node */
    if (this.heap.length > 1) {
      let current = this.heap.length - 1; 

      /* Traversing up the parent node until the current node (current) is greater than the parent (current/2)*/
      while (current > 1 && this.heap[Math.floor(current/2)] > this.heap[current]) {
        /* Swapping the two nodes by using the ES6 destructuring syntax*/
        [this.heap[Math.floor(current/2)], this.heap[current]] = [this.heap[current], this.heap[Math.floor(current/2)]]; 
        current = Math.floor(current/2); 
      }
    }
  }
}