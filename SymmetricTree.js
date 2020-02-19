/*
Given a binary tree, check whether it is a mirror of itself (ie, symmetric around its center).

For example, this binary tree [1,2,2,3,4,4,3] is symmetric:

    1
   / \
  2   2
 / \ / \
3  4 4  3
 

But the following [1,2,2,null,3,null,3] is not:

    1
   / \
  2   2
   \   \
   3    3
 

Note:
Bonus points if you could solve it both recursively and iteratively.
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
var isSymmetric = function(root) {
  if (!root) return true; 
  function isMirror(s, t) {
    if (!s && !t) return true; 
    if (!s || !t || s.val !== t.val) return false; //found mismatch
    return isMirror(s.left, t.right) && isMirror(s.right, t.left); //compare each other's mirrors 
  }
  return isMirror(root.left, root.right); 
};

/*
compare both subtrees to see if they're a mirror of each other 
*/