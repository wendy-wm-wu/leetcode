/*
A binary tree is univalued if every node in the tree has the same value.

Return true if and only if the given tree is univalued.

 

Example 1:


Input: [1,1,1,1,1,null,1]
Output: true
Example 2:


Input: [2,2,2,5,2]
Output: false

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
 * @return {boolean}
 */
var isUnivalTree = function(root) {
  let isUnival = true;
  let rootValue = root.val; 
  
  let traversal = function(node) {
      if (!node) {
          return; 
      }
      if (node.val !== rootValue) {
          isUnival = false; 
      }
      traversal(node.left);
      traversal(node.right); 
  }
  traversal(root);
  return isUnival; 
};

//inputs: root node
//outputs: boolean
//constraints: none
//edge cases: if root is null, return false 
//if root has no children, return true 