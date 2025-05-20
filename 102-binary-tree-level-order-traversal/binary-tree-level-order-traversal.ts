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

function levelOrder(root: TreeNode | null): number[][] {
    // If root is null, return empty array
    if (!root) return [];

    // Create an array to collect results
    const results = [];

    // Create a queue with root as its value
    const queue = [root];

    // While there's at least 1 or more nodes in the queue, do the following:
    while (queue.length > 0) {
        // Grab the current length of the queue before shifting out nodes
        const length = queue.length;

        // Create an array to collect the values of the current level
        const currentLevel = [];

        // For each node in the queue, do the following:
        for (let i = 0; i < length; i++) {
            // Shift out the current node
            const node = queue.shift();

            // Push the node's val into currentLevel
            currentLevel.push(node.val);

            // If node's left child exists, add it to the queue
            if (node.left) queue.push(node.left);

            // If node's right child exists, add it to the queue
            if (node.right) queue.push(node.right);
        }

        // The loop has completed, push the currentLevel to results
        results.push(currentLevel);
    }

    // Return results
    return results;
};