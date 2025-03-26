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

function buildTreeNodes(postorder: number[], indexMap: Map<number, number>, postStart: number, inStart: number, size: number): TreeNode | null {
    // if size is less than or equal to 0, return null as there's no node to build
    if (size <= 0) return null;

    // get the root value
    const rootValue = postorder[postStart];
    // find the inorder index of the rootValue
    const inorderIndex = indexMap.get(rootValue)!;
    // get the size of the left subtree
    const leftSize = inorderIndex - inStart;

    // build the left tree nodes
    const left = buildTreeNodes(postorder, indexMap, postStart - size + leftSize, inStart, leftSize);
    // build the right tree nodes
    const right = buildTreeNodes(postorder, indexMap, postStart - 1, inorderIndex + 1, size - 1 - leftSize);

    // return the newly built tree node
    return new TreeNode(rootValue, left, right);
}

function buildTree(inorder: number[], postorder: number[]): TreeNode | null {
    // create a Map object of all inorder values as the key and the corresponding index as the value
    const indexMap: Map<number, number> = new Map();
    inorder.forEach((val: number, idx: number) => {
        indexMap.set(val, idx);
    });

    // return the built tree
    return buildTreeNodes(postorder, indexMap, postorder.length - 1, 0, postorder.length);
};