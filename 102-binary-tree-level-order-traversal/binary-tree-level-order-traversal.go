/**
 * Definition for a binary tree node.
 * type TreeNode struct {
 *     Val int
 *     Left *TreeNode
 *     Right *TreeNode
 * }
 */

// Create a Queue type
type Queue struct {
    buf        []*TreeNode // Queue buffer
    head, tail int         // head index and tail index
    size       int         // size of the buffer/queue
}

// Create a func to init the queue
func initQueue(capacity int) *Queue {
    // Set the min allowed capacity to 4, not necessary but allows for faster growing than 1 or 2
    if capacity < 4 {
        capacity = 4
    }

    // Return pointer to the address of the Queue with a buffer assigned to capacity
    return &Queue{
        buf: make([]*TreeNode, capacity),
    }
}

// Create a func to get Queue size that has access to the Queue in memory
func (q *Queue) Len() int { return q.size }

// Create a func to add/push a new tail to the Queue
func (q *Queue) Push(tn *TreeNode) {
    // If current Queue size is same as amount of items in the Queue buffer, increase the buffer size
    if q.size == len(q.buf) {
        q.grow()
    }

    // Set the current value of the tail in the Queue to the new TreeNode (tn)
    q.buf[q.tail] = tn

    // Update the tail index
    q.tail = (q.tail + 1) % len(q.buf)

    // Update Queue size
    q.size++
}

// Create a func to shift/pop the head from the Queue
func (q *Queue) Pop() *TreeNode {
    // If Queue buffer is empty, return nil, there's nothing to shift/pop out
    if q.size == 0 {
        return nil
    }

    // Get the first node at the head, then set that index in the buffer to nil to avoid leaking references
    tn := q.buf[q.head]
    q.buf[q.head] = nil

    // Move the head index forward to account for shifting out the node
    q.head = (q.head + 1) % len(q.buf)

    // Decrement the Queue size
    q.size--

    // Return the shifted/popped out node
    return tn
}

// Create a func that will grow the Queue buffer size when it's needed
func (q *Queue) grow() {
    // Create a new length and new buffer
    newLen := len(q.buf) * 2
    newBuf := make([]*TreeNode, newLen)

    // Copy in order
    k := copy(newBuf, q.buf[q.head:])
    copy(newBuf[k:], q.buf[:q.tail])

    // Reset head index to 0
    q.head = 0

    // Reset tail index to q.size
    q.tail = q.size

    // Reset Queue buffer
    q.buf = newBuf
}

func levelOrder(root *TreeNode) [][]int {
    // If root is null, return nil
    if root == nil {
        return nil
    }

    // Create a slice to collect results
    var results [][]int

    // Init the Queue and add root to the buffer
    q := initQueue(8) // Start with 8 capacity for extra room
    q.Push(root)

    // While there's at least 1 or more items in the Queue buffer, do the following:
    for q.Len() > 0 {
        // Grab the current length of the queue
        length := q.Len()

        // Preallocate a slice to collect the values from the current level
        currentLevel := make([]int, 0, length)

        // For each item in the queue, do the following:
        for i := 0; i < length; i++ {
            // Pop out the head node
            node := q.Pop()
            currentLevel = append(currentLevel, node.Val)

            // If node has a left child, add it to the queue
            if node.Left != nil {
                q.Push(node.Left)
            }

            // If node has a right child, add it to the queue
            if node.Right != nil {
                q.Push(node.Right)
            }
        }

        // The loop has completed, append the currentLevel to results
        results = append(results, currentLevel)
    }

    // Return results
    return results
}