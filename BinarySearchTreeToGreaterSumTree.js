/*
Given the root of a binary search tree with distinct values, modify it so that every node has a new value equal to the sum of the values of the original tree that are greater than or equal to node.val.

As a reminder, a binary search tree is a tree that satisfies these constraints:

The left subtree of a node contains only nodes with keys less than the node's key.
The right subtree of a node contains only nodes with keys greater than the node's key.
Both the left and right subtrees must also be binary search trees.

Input: [4,1,6,0,2,5,7,null,null,null,3,null,null,null,8]
Output: [30,36,21,36,35,26,15,null,null,null,33,null,null,null,8]
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
 * @return {TreeNode}
 */
var bstToGst = function(root) {
    let sum = 0; 
    function findSum(node) {
      if (!node) return; 
      if (node.right) {
        findSum(node.right); //recursively go right if possible since greater values on right  
      }
      sum += node.val; //add the value of the node to the sum 
      node.val = sum;  //set the node value to the sum 
      if (node.left) {
        findSum(node.left); //might still have to go left to traverse down the tree
      }
    }
    findSum(root);
    return root;
};