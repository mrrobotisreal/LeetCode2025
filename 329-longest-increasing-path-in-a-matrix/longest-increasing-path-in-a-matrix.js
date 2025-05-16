/**
 * @param {number[][]} matrix
 * @return {number}
 */

// Create helper functions for creating string key for map
const makeKey = (row, col) => `${row},${col}`;

var longestIncreasingPath = function(matrix) {
    // Grab the number of rows and columns
    const numRows = matrix.length;
    const numCols = matrix[0].length;

    // Create maps for inDegree and edges
    const inDegree = new Map();
    const edges = new Map();

    // Initialize each cell in inDegree and edges
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            const key = makeKey(r, c);
            inDegree.set(key, 0);
            edges.set(key, []);
        }
    }

    // Create deltas
    const deltaRow = [-1, 0, 1, 0];
    const deltaCol = [0, 1, 0, -1];

    // Build edges and inDegree for the matrix
    for (let r = 0; r < numRows; r++) {
        for (let c = 0; c < numCols; c++) {
            for (let i = 0; i < deltaRow.length; i++) {
                // Get neighbor row and column
                const neighborRow = r + deltaRow[i];
                const neighborCol = c + deltaCol[i];
                // If neighbor row and column are within bounds, do the following:
                if (0 <= neighborRow && neighborRow < numRows && 0 <= neighborCol && neighborCol < numCols) {
                    // If neighbor cell is greater than current cell, add it to edges and increment inDegree
                    if (matrix[neighborRow][neighborCol] > matrix[r][c]) {
                        const cellKey = makeKey(r, c);
                        const neighborCellKey = makeKey(neighborRow, neighborCol);
                        edges.get(cellKey).push(neighborCellKey);
                        inDegree.set(neighborCellKey, inDegree.get(neighborCellKey) + 1);
                    }
                }
            }
        }
    }

    // Create a queue
    let queue = [];

    // Initialize queue with edges that have 0 inDegree
    for (const [key, deg] of inDegree) {
        if (deg === 0) queue.push(key);
    }

    // Create variable for counting the longest increasing path
    let longest = 0;

    // While there's at least 1 or more item in the queue, do the following:
    while (queue.length > 0) {
        // Increment longest
        longest++;
        // Create an array to collect the next 0 inDegree item(s)
        const next = [];

        // For each neighbor of each edge node in the queue, do the following:
        for (const node of queue) {
            for (const neighbor of edges.get(node)) {
                // Decrement inDegree of the neighbor
                inDegree.set(neighbor, inDegree.get(neighbor) - 1);

                // If neighbor inDegree is 0, push it to next
                if (inDegree.get(neighbor) === 0) next.push(neighbor);
            }
        }

        // Update queue with next's value
        queue = next;
    }

    // Return longest
    return longest;
};
