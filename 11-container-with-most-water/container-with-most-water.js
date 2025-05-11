/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function(height) {
    // Create our left pointer, right pointer, and area variable set to 0
    let left = 0;
    let right = height.length - 1;
    let area = 0;

    while (left <= right) {
        // Calculate the current area by multiplying the lesser value by the number of indices between the values
        const currentArea = Math.min(height[left], height[right]) * (right - left);
        // Set area to whichever is greater, itself or currentArea
        area = Math.max(area, currentArea);

        // Check if height[left] is less than height[right]
        if (height[left] < height[right]) {
            // If height[left] is less than height[right], increment left
            left++;
        } else {
            // Otherwise decrement right
            right--;
        }
    }

    return area;
};