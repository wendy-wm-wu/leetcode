/*
Given a binary tree, return the level order traversal of its nodes' values. (ie, from left to right, level by level).

For example:
Given binary tree [3,9,20,null,null,15,7],
    3
   / \
  9  20
    /  \
   15   7
return its level order traversal as:
[
  [3],
  [9,20],
  [15,7]
]
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  if (!root) {
      return [];
  }
  let output = [];
  let queue = [];
  queue.push(root);
  
  while (queue.length > 0) {
      let size = queue.length;
      let curr = [];
      for (let i = 0; i < size; i++) {
          let node = queue.shift();
          curr.push(node.val);
          if (node.left) {
              queue.push(node.left);
          }
          if (node.right) {
              queue.push(node.right);
          }
      }
       output.push(curr);
  }
  return output; 
};

//define a queue
//define output as []
//push root into queue
  //iterate thru root
      //define node as shifted value from queue
      //iterate thru size 
          //define curr as [];
          //if node has left
              //push left node to queue
          //if node has right
              //push right node to queue
          //push curr into output
  //return output

//input: tree
//output: level order traversal of tree 
//constraints: none
//edge cases: if tree is null, return []