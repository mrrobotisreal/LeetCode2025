/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var moveZeroes = function(nums) {
    // Create a slow pointer
    let slow = 0;

    for (let fast = 0; fast < nums.length; fast++) {
        // If the current value is NOT 0, then we want to swap values then increment our slow pointer
        if (nums[fast] !== 0) {
            [nums[slow], nums[fast]] = [nums[fast], nums[slow]];
            slow++;
        }
    }
};