/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function(nums, k) {
    // Handle empty array or 0 k edge case
    if (nums.length <= 0 || k === 0) return [];

    // Create array to collect our maximums
    const maximums = []
    // Create a deque for storing indices
    const deque = [];

    for (let i = 0; i < nums.length; i++) {
        // Remove elements that are outside of the current window
        if (deque.length > 0 && deque[0] <= i - k) {
            deque.shift();
        }

        // Remove the smaller elements from the back of the deque (they can never be the maximum)
        while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[i]) {
            deque.pop();
        }

        // Add current element's index to deque
        deque.push(i);

        // If we've seen at least k elements, add the current window's maximum to maximums
        if (i >= k - 1) {
            maximums.push(nums[deque[0]]);
        }
    }

    // Return maximums
    return maximums;
};