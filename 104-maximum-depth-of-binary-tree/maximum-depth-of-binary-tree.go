/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */
func maxDepth(root *TreeNode) int {
    // If root is null, return 0
    if root == nil {
        return 0
    }

    // Otherwise, return max between recursive left/right calls + 1
    return max(maxDepth(root.Left), maxDepth(root.Right)) + 1
}