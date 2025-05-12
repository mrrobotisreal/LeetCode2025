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
 * @return {number[][]}
 */
var levelOrder = function(root) {
    // Handle edge case of empty or null root
    if (!root) return [];

    // Create an array to collect the resulting levels and their values
    const results = [];

    // Create a queue array initialized with the root as its only value
    const queue = [root];

    // While there is at least 1 or more items in the queue, do the following:
    while (queue.length > 0) {
        // Grab the current length of the queue before shifting out the first item in the queue
        const length = queue.length;
        // Create an array to collect each node's value in this current level
        const currentLevel = [];

        // For each item in the queue, do the following:
        for (let i = 0; i < length; i++) {
            // Shift out and collect the first node in the queue
            const node = queue.shift();

            // Push this node's value into the current level's array of values
            currentLevel.push(node?.val);

            // For each potential child node of this node, do the following:
            for (const child of [node.left, node.right]) {
                // If the current child node exists, add it to the queue
                if (child) queue.push(child);
            }
        }

        // The current level is now complete, push it to the results array
        results.push(currentLevel);
    }

    // The queue is empty, return the results array containing all levels and each level's values
    return results;
};