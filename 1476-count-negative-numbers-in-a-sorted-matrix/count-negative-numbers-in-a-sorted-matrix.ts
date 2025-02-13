function countNegatives(grid: number[][]): number {
    // create count variable at 0
    let count: number = 0;

    // iterate over grid
    for (let i = 0; i < grid.length; i++) {
        // create startIndex variable at 0
        let startIndex: number = 0;
        // create endIndex variable at length of row array
        let endIndex: number = grid[i].length - 1;
        // create firstNegativeNumIndex variable at -1
        let firstNegativeNumIndex: number = -1;

        // while startIndex is less than or equal to endindex:
        while (startIndex <= endIndex) {
            // create mid variable at startIndex + endIndex divided by two; rounded down
            let mid: number = Math.floor((startIndex + endIndex) / 2);

            // if rowArray[mid] value is greater than or equal to 0
            if (grid[i][mid] >= 0) {
                // set start index to mid plus 1
                startIndex = mid + 1;
            }

            // if rowArray[mid] value is less than or equal to -1
            if (grid[i][mid] <= -1) {
                // set endIndex to mid minus 1
                endIndex = mid - 1;
                // set firstNegativeNumIndex to mid
                firstNegativeNumIndex = mid;
            }
        }

        // if firstNegativeNumIndex is NOT -1
        if (firstNegativeNumIndex >= 0) {
            // increment count by current rowArray length minus firstNegativeNumIndex
            count += grid[i].length - firstNegativeNumIndex
        }
    }

    // return count variable
    return count;
};