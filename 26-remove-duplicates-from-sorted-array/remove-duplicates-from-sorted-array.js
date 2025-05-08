/**
 * @param {number[]} nums
 * @return {number}
 */
var removeDuplicates = function(nums) {
    // Handle edge case of empty array
    if (nums.length <= 0) return 0;

    // Create variable to track de-duplicated length
    let length = 1;

    // Iterate and de-duplicate
    for (let i = 0; i < nums.length; i++) {
        // We can skip the first num in the list and only check after that
        if (i > 0) {
            // Since the nums are ordered, once the previous value is
            // not equal to the current value we:
            if (nums[i] !== nums[i - 1]) {
                // update the item right after the last unique number in the list
                nums[length] = nums[i];

                // Increase the de-duplicated length
                length += 1;
            }
        }
    }

    // Return the de-duplicated length
    return length;
};