class Solution:
    def removeDuplicates(self, nums: List[int]) -> int:
        # Handle edge case of potentially empty nums array
        if len(nums) <= 0:
            return 0
        
        # Create variable for tracking de-duplicated length
        dedupedLength = 1

        # Iterate and de-duplicate
        for i in range(len(nums)):
            # Skip first item, only check after that
            if i > 0:
                # Since nums are ordered, if prev val is not current val:
                if nums[i] != nums[i - 1]:
                    # Replace last unique val with current val
                    nums[dedupedLength] = nums[i]

                    # Increment de-duplicated length
                    dedupedLength += 1

        # Return de-duplicated length
        return dedupedLength
        