class Solution {
public:
    int removeDuplicates(vector<int>& nums) {
        // Handle edge case and check for an empty vector
        if (nums.size() <= 0) return 0;

        // Create int variable to keep track of de-duplicated length
        int dedupedLength = 1;

        // Iterate and de-duplicate
        for (size_t i = 0; i < nums.size(); i++) {
            // Skip the first number and only check after that
            if (i > 0) {
                // Since nums are ordered, once prev val is != to current val:
                if (nums[i] != nums[i - 1]) {
                    // Update item after last unique num in the vector
                    nums[dedupedLength] = nums[i];

                    // Increase de-duplicated length
                    dedupedLength++;
                }
            }
        }

        // Return de-duplicated length
        return dedupedLength;
    }
};