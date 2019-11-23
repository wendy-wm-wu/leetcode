/*
Serialization is the process of converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.

Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You just need to ensure that a binary search tree can be serialized to a string and this string can be deserialized to the original tree structure.

The encoded string should be as compact as possible.

Note: Do not use class member/global/static variables to store states. Your serialize and deserialize algorithms should be stateless.
*/

/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function(root) {
    let str = '';
    let buildString = function(node) {
      if (!node) {
        str += 'e '; //'e '
      } else {
        str += node.val + ' '; //'3 '
        buildString(node.left);  //check left
        buildString(node.right); //check right
      }
    }
    buildString(root);
    return str;
};

/*
[3, 2, null, 5, 6]
'3 2 e 5 6 ' 
 'e ' = null 

*/

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function(data) {
    let nodes = data.split(' ');
    let buildTree = function() {
      let val = nodes.shift();
      if (val === 'e') {
        return null;
      } else {
        let node = new TreeNode(val);
        node.left = buildTree();
        node.right = buildTree(); 
        return node;
      }
    }
    return buildTree();
};

/*
'3 2 e 5 6 ' 
[3, 2, e, 5, 6] split string
make a new tree node if node 
*/

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */