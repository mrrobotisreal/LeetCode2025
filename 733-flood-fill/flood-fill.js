/**
 * @param {number[][]} image
 * @param {number} sr
 * @param {number} sc
 * @param {number} color
 * @return {number[][]}
 */
var floodFill = function(image, sr, sc, color) {
    // Grab the number of rows and columns in the image
    const numRows = image.length;
    const numCols = image[0].length;

    // Create a function to get the neighboring cells, and update the color if it matches
    function getNeighbors(coord, inputColor) {
        // Create an array to collect the neighbors
        const neighbors = [];
        // Extract the row and column from the coord
        const [row, col] = coord;
        // Define row and column deltas (directions)
        const deltaRow = [-1, 0, 1, 0];
        const deltaCol = [0, 1, 0, -1];

        // Iterate over the deltaRow
        for (let i = 0; i < deltaRow.length; i++) {
            // Get next row and column
            const nextRow = row + deltaRow[i];
            const nextCol = col + deltaCol[i];

            // If the row and col are within the graph's bounds, do the following:
            if (0 <= nextRow && nextRow < numRows && 0 <= nextCol && nextCol < numCols) {
                // If the color matches, add the neighbor to the array
                if (image[nextRow][nextCol] === inputColor) neighbors.push([nextRow, nextCol]);
            }
        }

        // Return the collected neighbors
        return neighbors;
    }

    // Create a function to perform bfs
    function bfs(root) {
        // Create a queue array initialized with root as its value
        const queue = [root];
        // Create a visited matrix filled with false values for tracking visited cells
        const visited = Array(numRows)
            .fill()
            .map(() => Array(numCols).fill(false));
        // Extract row and col from root, but use let so they're mutable
        let [row, col] = root;
        // Extra start color of root cell in the image graph
        const startColor = image[row][col];
        // Replace that color with the replacement color
        image[row][col] = color;
        // Mark the current cell as visited
        visited[row][col] = true;

        // While there is at least 1 or more item in the queue, do the following:
        while (queue.length > 0) {
            // Shift out the node
            const node = queue.shift();

            // For each neighbor of the current node, do the following:
            for (const neighbor of getNeighbors(node, startColor)) {
                // Reassign row and col from neighbor's values
                row = neighbor[0];
                col = neighbor[1];
                
                // If the cell has already been visited, skip it
                if (visited[row][col]) continue;

                // Replace the color at the current cell
                image[row][col] = color;

                // Add neighbor to the queue and mark its cell as visited
                queue.push(neighbor);
                visited[row][col] = true;
            }
        }
    }

    // Kick off the bfs algorithm
    bfs([sr, sc]);

    // Return the updated image
    return image;
};