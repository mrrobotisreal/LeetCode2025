class Solution {
    public int removeDuplicates(int[] nums) {
        // Handle edge case of potentially empty nums array
        if (nums.length <= 0) return 0;

        // Create a variable for tracking de-duplicated length
        int dedupedLength = 1;

        // Iterate and de-duplicate
        for (int i = 0; i < nums.length; i++) {
            // Skip first num and only check after that
            if (i > 0) {
                // Since nums are ordered, if prev val != current val:
                if (nums[i] != nums[i - 1]) {
                    // Update last unique value to current val
                    nums[dedupedLength] = nums[i];

                    // Increment de-duplicated length
                    dedupedLength++;
                }
            }
        }

        // Return de-duplicated length
        return dedupedLength;
    }
}