/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {number}
 */
var maxDepth = function(root) {
    // Handle break case of null root
    if (root === null) return 0;

    // Simple return the max recursive depth between left and right side plus 1 to increment the current level
    return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
};