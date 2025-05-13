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
var zigzagLevelOrder = function(root) {
    // Handle edge case of empty or null root
    if (!root) return [];

    // Create a results array to collect each zig zag ordered level
    const results = [];

    // Create the queue array with root as its starting value
    const queue = [root];

    // Create a flag to indicate the current direction
    let leftToRight = true;

    // While there is at least 1 or more items in the queue, do the following:
    while (queue.length > 0) {
        // Grab the current length of the queue before shifting out nodes
        const length = queue.length

        // Create an array to collect the values of the nodes on this level
        const currentLevel = [];

        for (let i = 0; i < length; i++) {
            // Shift out the current node
            const node = queue.shift();

            // If leftToRight is true, push the value of the node, otherwise unshift it
            if (leftToRight) {
                currentLevel.push(node.val);
            } else {
                currentLevel.unshift(node.val);
            }

            // For each potential child of the node, do the following:
            for (const child of [node.left, node.right]) {
                // If the child exists, add it to the queue
                if (child) queue.push(child);
            }
        }

        // The current level is complete, add it to the results array
        results.push(currentLevel);

        // Invert the direction
        leftToRight = !leftToRight;
    }

    // Return the results
    return results;
};