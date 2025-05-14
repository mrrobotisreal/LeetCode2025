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
 * @return {number}
 */
var minDepth = function(root) {
    // Handle edge case of empty/null root by returning 0 for starting depth
    if (!root) return 0;

    // Create a queue array with initialized with root as its value
    const queue = [root];

    // Create a depth variable initialized to 0, so we can start each iteration by incrementing depth
    let depth = 0;

    // While there is at least 1 or more nodes in the queue, do the following:
    while (queue.length > 0) {
        // Increment depth before performing any actions
        depth++;

        // Grab the current length of the queue before shifting out nodes
        const length = queue.length;

        // For each node in the queue, do the following:
        for (let i = 0; i < length; i++) {
            // Shift out the node
            const node = queue.shift();

            // If the node is a leaf (i.e. no children), then we've found the minDepth
            if (!node.left && !node.right) return depth;

            // Otherwise, for each potential child of the current node, do the following:
            for (const child of [node.left, node.right]) {
                // If child exists, add it to the queue
                if (child) queue.push(child);
            }
        }
    }

    // Return depth here as a catch all, but it should have already been returned by this point
    return depth;
};