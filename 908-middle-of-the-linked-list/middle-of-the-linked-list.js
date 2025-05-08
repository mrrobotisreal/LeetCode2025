/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var middleNode = function(head) {
    // Create a list to catch the nodes
    const nodes = [];

    // Create a helper function to extract nodes from the list
    function extractNodes(node) {
        // Add the node to the list of nodes
        nodes.push(node);

        // If no next node, return to break the recursive loop
        if (!node.next) return;
        
        // Extract the next node
        extractNodes(node.next);
    }
    // Kick off the recursive traversal
    extractNodes(head);

    // Handle edge case; if no nodes are extracted or there's only the head node, return the head node
    if (nodes.length <= 0) return head;

    // Return the middle node
    return nodes[Math.floor(nodes.length / 2)];
};