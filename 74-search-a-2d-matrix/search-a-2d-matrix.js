/**
 * @param {number[][]} matrix
 * @param {number} target
 * @return {boolean}
 */
var searchMatrix = function(matrix, target) {
    // Get the dimensions
    const rowCount = matrix.length;
    const columnCount = matrix[0].length;
    const totalCells = rowCount * columnCount;

    // Establish high and low indexes
    let lowIndex = 0;
    let highIndex = totalCells - 1;

    while (lowIndex <= highIndex) {
        // Get the middle index
        const middleIndex = Math.floor((lowIndex + highIndex) / 2);

        // Get matrix midpoint coordinates
        const rowIndex = Math.floor(middleIndex / columnCount);
        const columnIndex = middleIndex % columnCount;

        const middleValue = matrix[rowIndex][columnIndex];

        if (middleValue === target) {
            // If middleValue is the target, return true
            return true;
        } else if (middleValue < target) {
            // otherwise if middleValue is less than the target, update lowIndex
            lowIndex = middleIndex + 1;
        } else {
            // otherwise, middleValue must be greater than the target, update highIndex
            highIndex = middleIndex - 1;
        }
    }

    // The target was not in the matrix, return false
    return false;
};