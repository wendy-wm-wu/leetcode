/*
Given a binary tree, find the lowest common ancestor (LCA) of two given nodes in the tree.

According to the definition of LCA on Wikipedia: “The lowest common ancestor is defined between two nodes p and q as the lowest node in T that has both p and q as descendants (where we allow a node to be a descendant of itself).”

Given the following binary tree:  root = [3,5,1,6,2,0,8,null,null,7,4]
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
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
    /**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function(root, p, q) {
  if (!root || root === p || root === q) {
      return root; 
  }
  const left = lowestCommonAncestor(root.left, p, q);
  console.log(left);
  const right = lowestCommonAncestor(root.right, p, q);
  console.log(right);
  
  if (!left) {
      return right;
  }
  if (!right) {
      return left; 
  }
  return root;
};

/*
const left =  lowestCommonAncestor(root.left, p, q)
const right =  lowestCommonAncestor(root.right, p, q)

if (!left) {
  return right; 
}
if (!right) {
  return left;
}
return root; 

*/

//input: tree, p node, q node
//output: lowest common ancestor
//constraints: none
//edge cases: if root is null or root = p or root = q, return root 
};