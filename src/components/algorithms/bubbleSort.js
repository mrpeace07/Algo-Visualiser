import { SWAP } from '../helper/constants.js';
import { swap } from '../helper/swap.js';

// Bubble Sort algorithm
export const bubbleSort = async (array, length) => {
    let moves = [];

    for (let i = 0; i < length - 1; i++) {
        for (let j = 0; j < length - i - 1; j++) {
            // Compare adjacent elements and swap if necessary
            if (array[j] > array[j + 1]) {
                moves.push([j, j + 1, SWAP]);
                await swap(array, j, j + 1);
            } else {
                moves.push([j, j + 1, !SWAP]);
            }
        }
    }

    return moves;
};
