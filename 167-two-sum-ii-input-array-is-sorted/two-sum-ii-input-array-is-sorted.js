/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    // Create low and high index variables
    let low = 0;
    let high = numbers.length - 1;

    while (low <= high) {
        // Calculated sum
        const sum = numbers[low] + numbers[high];

        // If sum is equal to the target, return the low and high index (plus 1 to account for 1 index, not 0 index)
        if (sum === target) {
            return [low + 1, high + 1];
        }

        // If sum is greater than the target, then reduce high index, otherwise increase low index
        if (sum > target) {
            high--;
        } else {
            low++;
        }
    }

    // Return empty array if no solution is found
    return [];
};