/**
 * Example:
 * var ti = TreeNode(5)
 * var v = ti.`val`
 * Definition for a binary tree node.
 * class TreeNode(var `val`: Int) {
 *     var left: TreeNode? = null
 *     var right: TreeNode? = null
 * }
 */
class Solution {
    fun maxDepth(root: TreeNode?): Int {
        // If root is null, return 0
        if (root == null) return 0

        // Otherwise, return max between recursive left/right calls + 1
        return max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
}