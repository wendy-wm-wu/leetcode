function QueueTwoStacks() {
  this.inStack = [];
  this.outStack = [];
}

QueueTwoStacks.prototype.enqueue = function(item) {
  this.inStack.push(item); 
}

//oldest item is on the bottom of the inStack so push each item onto outStack until we reach the bottom item 
QueueTwoStacks.prototype.dequeue = function() {
  if (this.outStack.length === 0) {
    //move items from instack to outstack, reversing order
    while (this.inStack.length > 0) {
      this.outStack.push(this.inStack.pop());
    }
  }
  //if outstack is still empty, raise an error
  if (this.outStack.length === 0) {
    return undefined; 
  }
  return this.outStack.pop(); 
}


//time complexity: enqueue and dequeue are O(1) so our TOTAL COST PER ITEM is O(1). Our m enqueue and dequeue operations put m or fewer items into the system, giving a total runtime of O(m) 
//space complexity: O(N)^2

