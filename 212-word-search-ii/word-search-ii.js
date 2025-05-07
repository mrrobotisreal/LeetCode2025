/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function(board, words) {
    // Create the root node
    const trieRoot = Object.create(null);

    // Iterate over the input words
    for (const word of words) {
        // Create a new node and point it at trieRoot
        let currentTrieNode = trieRoot;
        // Iterate over each letter of the current word
        for (const letter of word) {
            // If a property using the current letter as a key does not exist, create it,
            // otherwise assign its value to the current letter property
            currentTrieNode = currentTrieNode[letter] ?? (currentTrieNode[letter] = Object.create(null));
        }
        // Mark the word as complete here and store it
        // So for example, with the word "oath", we should have:
        /**
        {
            o: {
                a: {
                    t: {
                        h: {
                            $: "oath"
                        }
                    }
                }
            }
        }
         */
        currentTrieNode.$ = word;
    }
    // Once both loops have completed, if we use ["oath", "eat"] as an example then we should have:
    /**
    {
        o: {
            a: {
                t: {
                    h: {
                        $: "oath"
                    }
                }
            }
        },
        e: {
            a: {
                t: {
                    $: "eat"
                }
            }
        }
    } */

    // Useful helpers for depth first searching
    const rowCount = board.length;
    const columnCount = board[0].length;
    const foundWords = [];
    // For direction deltas, it's helpful to think of it like [x, y] and it makes a grid of directions
    const directionDeltas = [
        [1, 0],  // Right
        [-1, 0], // Left
        [0, 1],  // Up
        [0, -1], // Down
    ];

    function depthFirstSearch(rowIndex, columnIndex, parentTrieNode) {
        // Create a variable holding the current letter on the grid
        const letter = board[rowIndex][columnIndex];
        // Create a variable holding the current node of the input parent node
        const currentTrieNode = parentTrieNode[letter];

        // If it's a dead end, return
        if (!currentTrieNode) return;

        // If the word is completed, then record it and delete to prevent duplicates
        if (currentTrieNode.$) {
            foundWords.push(currentTrieNode.$);
            delete currentTrieNode.$;
        }

        // Replace the current letter with '#' to mark is as visited already
        board[rowIndex][columnIndex] = '#';

        // Explore each of 4 neighboring cells
        for (const [rowDelta, columnDelta] of directionDeltas) {
            const nextRow = rowIndex + rowDelta;
            const nextColumn = columnIndex + columnDelta;

            // Capture whether we're inside the grid or not
            const withinGrid =
                nextRow >= 0 && nextRow < rowCount &&
                nextColumn >= 0 && nextColumn < columnCount;
            
            // If we're in the grid and haven't yet visited the letter, then depthFirstSearch it
            if (withinGrid && board[nextRow][nextColumn] !== '#') {
                depthFirstSearch(nextRow, nextColumn, currentTrieNode);
            }
        }

        // Backtrack and restore grid
        board[rowIndex][columnIndex] = letter;

        // If the branch doesn't have children, remove it so it can be skipped later to not waste time
        if (Object.keys(currentTrieNode).length === 0) {
            delete parentTrieNode[letter];
        }
    }

    // Run depthFirstSearch on every cell in the grid
    for (let rowIndex = 0; rowIndex < rowCount; ++rowIndex) {
        for (let columnIndex = 0; columnIndex < columnCount; ++columnIndex) {
            depthFirstSearch(rowIndex, columnIndex, trieRoot);
        }
    }

    // Return the foundWords
    return foundWords;
};