/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

// Returns tree height if balanced, returns -1 if unbalanced at any point
function getTreeHeight(tree: TreeNode): number {
    // if tree is null return initial height of 0
    if (tree === null) return 0;

    // get leftHeight and rightHeight for comparison
    const leftHeight = getTreeHeight(tree.left);
    const rightHeight = getTreeHeight(tree.right);

    // if either leftHeight or rightHeight is -1 then return -1 (unbalanced)
    if (leftHeight === -1 || rightHeight === -1) return -1;

    // if the difference between leftHeight and rightHeight is greater than 1 return -1 (unbalanced)
    if (Math.abs(leftHeight - rightHeight) > 1) return -1;

    // return the current max height plus 1 for the current level
    return Math.max(leftHeight, rightHeight) + 1;
}

function isBalanced(root: TreeNode | null): boolean {
    return getTreeHeight(root) !== -1;
};