import { SWAP } from '../helper/constants.js';
import { swap } from '../helper/swap.js';

// Selection Sort algorithm
export const selectionSort = async (array, length) => {
    let moves = [];

    for (let i = 0; i < length - 1; i++) {
        let minIndex = i;

        for (let j = i + 1; j < length; j++) {
            // Track the minimum element index
            if (array[j] < array[minIndex]) {
                minIndex = j;
            }
            // Record comparison moves
            moves.push([j, minIndex, !SWAP]);
        }

        // Swap the found minimum element with the first element
        if (minIndex !== i) {
            await swap(array, i, minIndex);
            moves.push([i, minIndex, SWAP]);
        }
    }

    return moves;
};
