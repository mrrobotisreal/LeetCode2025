function removeDuplicates(nums: number[]): number {
    // If array is null or empty, return 0
    if (!nums || nums.length <= 0) return 0;

    // Create array to track de-duplicated length
    let dedupedLength = 1;

    // Iterate and de-duplicate
    for (let i = 0; i < nums.length; i++) {
        // Skip first num, then check
        if (i > 0) {
            // If prev val !== current val, then:
            if (nums[i] !== nums[i - 1]) {
                // Set last unique value to current value
                nums[dedupedLength] = nums[i];

                // Increment de-duplicated length
                dedupedLength++;
            }
        }
    }

    // Return de-duplicated length
    return dedupedLength;
};