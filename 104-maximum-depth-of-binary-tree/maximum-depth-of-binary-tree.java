/**
 * Definition for a binary tree node.
 * public class TreeNode {
 *     int val;
 *     TreeNode left;
 *     TreeNode right;
 *     TreeNode() {}
 *     TreeNode(int val) { this.val = val; }
 *     TreeNode(int val, TreeNode left, TreeNode right) {
 *         this.val = val;
 *         this.left = left;
 *         this.right = right;
 *     }
 * }
 */
class Solution {
    public int maxDepth(TreeNode root) {
        // If root is null, return 0
        if (root == null) return 0;

        // Otherwise, return max between recursive left/right calls + 1
        return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1;
    }
}