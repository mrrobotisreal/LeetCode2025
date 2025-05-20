class Solution {
    fun removeDuplicates(nums: IntArray): Int {
        // If nums array is empty, return 0
        if (nums.isEmpty()) return 0

        // Create variable to track de-duplicated length
        var dedupedLength: Int = 1

        // Iterate and de-duplicate
        for (i in 1 until nums.size) {
            // Skip first item, then check
            if (i > 0) {
                // If prev val != current val, then:
                if (nums[i] != nums[i - 1]) {
                    // Set last unique val to current val
                    nums[dedupedLength] = nums[i]

                    // Increment de-duplicated length
                    dedupedLength++
                }
            }
        }

        // Return de-duplicated length
        return dedupedLength
    }
}