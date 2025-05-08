/**
 * @param {string} s
 * @return {boolean}
 */
var isPalindrome = function(s) {
    // Make all characters lowercase
    const lower = s.toLowerCase();

    // Create regex group to capture only lowercase alphanumeric characters
    const regex = /([a-z0-9])/g;

    // Grab the matched alphanumeric characters from lower, or assign empty string if null
    const chars = lower.match(regex)?.join("") ?? "";

    // Check if it's exactly the same forward and reversed and return true if so, otherwise return false
    if (chars === chars.split("").reverse().join("")) {
        return true;
    } else {
        return false;
    }
};