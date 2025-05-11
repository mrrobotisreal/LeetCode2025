/**
 * @param {string} source
 * @param {string} target
 * @return {string}
 */
var minWindow = function(source, target) {
    // Check for potential edge cases, such as empty/null values or source being smaller than target
    if (!source || !target || source.length < target.length) return "";

    // Count and store the frequency of characters in target
    const neededChars = {}
    for (let char of target) {
        neededChars[char] = (neededChars[char] || 0) + 1;
    }

    // Initialize sliding window variables
    let left = 0;                     // Left pointer of the window
    let right = 0;                    // Right pointer of the window
    let charsToFind = target.length;  // Total count of characters that need to be found
    let minWindowSize = Infinity;     // Size of the minimum valid window that has been found
    let minWindowStart = 0;           // Starting index of the minimum window

    // Start the sliding window
    while (right < source.length) {
        // Expand the window from the right
        const rightChar = source[right];

        // If this char is needed, decrement the count of chars to find
        if (neededChars[rightChar] > 0) {
            charsToFind--;
        }

        // Update the needed count for this char (which could go negative for chars not in target, that's okay)
        neededChars[rightChar]--;

        // Now try to shrink the window from the left while maintaining all of the required chars
        while (charsToFind === 0) {
            // Update the minimum sliding window if the current one is smaller
            if (right - left + 1 < minWindowSize) {
                minWindowSize = right - left + 1;
                minWindowStart = left;
            }

            // Shrink the window from the left
            const leftChar = source[left];

            // Update the needed count for this char
            neededChars[leftChar]++;

            // If this char becomes needed again, increment the count of chars to find
            if (neededChars[leftChar] > 0) {
                charsToFind++;
            }

            left++;
        }

        right++;
    }

    // Return the minimum sliding window substring or empty string if none was found
    return minWindowSize === Infinity ? "" : source.substring(minWindowStart, minWindowStart + minWindowSize);
};