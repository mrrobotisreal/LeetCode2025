func removeDuplicates(nums []int) int {
    // Handle edge case of empty array
    if len(nums) <= 0 {
        return 0
    }

    // Create variable for tracking deduped length
    dedupedLength := 1

    // Iterate and de-duplicate
    for i, _ := range nums {
        // We can skip the first num in the list and only start checking after it
        if i > 0 {
            // Since the nums are ordered, once the prev value is != current value, then:
            if nums[i] != nums[i - 1] {
                // update the item right after the last unique number in the list
                nums[dedupedLength] = nums[i]

                // Increase the de-duplicated length
                dedupedLength++
            }
        }
    }

    // Return de-duplicated length
    return dedupedLength
}