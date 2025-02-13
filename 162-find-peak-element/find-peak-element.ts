function findPeakElement(nums: number[]): number {
    // if nums array is empty
    if (!nums.length) {
        // return -1
        return -1;
    }
    // if nums array length is 1
    if (nums.length === 1) {
        // return 0
        return 0;
    }
    // // if nums array length is 2
    // if (nums.length === 2) {
    //     // if nums[0] is greater than or equal to nums[1]
    //     if (nums[0] >= nums[1]) {
    //         // return 0
    //         return 0;
    //     } else {
    //         // otherwise return 1
    //         return 1
    //     }
    // }
    // // if nums array length is 3
    // if (nums.length === 3) {
    //     // if nums[1] is greater than nums[0] and nums[2]
    //     if (nums[1] > nums[0] && nums[1] > nums[2]) {
    //         // return 1
    //         return 1;
    //     }
    //     // if nums[0] is greater than nums[2]
    //     if (nums[0] > nums[2]) {
    //         // return 0
    //         return 0;
    //     }
    //     // otherwise return 2
    //     return 2;
    // }

    // create peakIndexArray variable
    const peakIndexArray: number[] = [];
    // create index variable at 0
    let index: number = 0;

    // while index is less than or equal to nums length - 1
    while (index <= nums.length - 1) {
        // if index is 0
        if (index === 0) {
            // if nums[index] is greater than next neighbor
            if (nums[index] > nums[index + 1]) {
                // push index into peakIndexArray
                peakIndexArray.push(index);

                // if nums length is only 2, skip the rest
                if (nums.length === 2) {
                    // increment by 2 to skip the next loop and stop the loop early
                    index += 2;
                    continue;
                }
            }
        }
        // if index is equal to nums length - 1
        if (index === nums.length - 1) {
            // if nums[index] is greater than prev neighbor
            if (nums[index] > nums[index - 1]) {
                // push index into peakIndexArray
                peakIndexArray.push(index);
            }
        }

        // if nums[index] is greater than nums[index - 1] and greater than nums[index + 1]
        if (nums[index] > nums[index - 1] && nums[index] > nums[index + 1]) {
            // push index into peakIndexArray
            peakIndexArray.push(index);
        }
        
        // increment index
        index += 1;
    }

    // if peakIndexArray variable is empty
    if (!peakIndexArray.length) {
        // return -1
        return -1;
    }
    
    // return peakIndexArray[0]
    return peakIndexArray[0];
};