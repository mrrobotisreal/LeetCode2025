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

function isEqual(tree1: TreeNode | null, tree2: TreeNode | null): boolean {
    // if both trees are null they're equal; return true
    if (!tree1 && !tree2) return true;
    // if either tree is null, then the other clearly isn't null and they're not equal; return false
    if (!tree1 || !tree2) return false;

    // if tree1.val and tree2.val are equal and both tree1 and tree2 subtree values are equal then they're equal; return calculated value
    return tree1.val === tree2.val && isEqual(tree1.left, tree2.left) && isEqual(tree1.right, tree2.right);
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    // if root is null then by definition the subroot cannot be a subtree of root; return false
    if (!root) return false;

    // if the entire tree is equal to subRoot or if subRoot is equal to any left or right subtree of root then it's true; return calculated value
    return isEqual(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot);
};