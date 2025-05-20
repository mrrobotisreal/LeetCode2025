class Solution {
    func removeDuplicates(_ nums: inout [Int]) -> Int {
        // If nums array is empty, return 0
        if nums.isEmpty {
            return 0
        }

        // Create a variable to track de-duplicated length
        var dedupedLength = 1

        // Iterate and de-duplicate
        for i in 1..<nums.count {
            // If prev val != current val, then:
            if nums[i] != nums[i - 1] {
                // Update last unique value to current value
                nums[dedupedLength] = nums[i]

                // Increment de-duplicated length
                dedupedLength = dedupedLength + 1
            }
        }

        // Return de-duplicated length
        return dedupedLength
    }
}