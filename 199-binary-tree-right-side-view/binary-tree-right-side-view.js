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
 * @return {number[]}
 */
var rightSideView = function(root) {
    // Create an array to collect the results
    const results = [];

    // Handle edge case of empty/null root
    if (!root) return results;

    // Create a queue array initialized with root as its value
    const queue = [root];

    // While there is at least one or more node in the queue, do the following:
    while (queue.length > 0) {
        // Grab the current length of the queue before shifting out nodes
        const length = queue.length;

        // Collect the value from the first node only, since it's the rightmost VISIBLE node
        // (Wondering why/how the first node is the rightmost? Look below when dealing with order of children)
        results.push(queue[0].val);

        // For each node in the queue, do the following:
        for (let i = 0; i < length; i++) {
            // Shift out the node
            const node = queue.shift();

            // For each child node, starting with the rightmost child, do the following:
            for (const child of [node.right, node.left]) {
                // If child exists, push it into the queue
                if (child) queue.push(child);
            }
        }
    }

    // Return the results
    return results;
};