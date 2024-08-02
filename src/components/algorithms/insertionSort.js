import { SWAP } from '../helper/constants.js';
import { swap } from '../helper/swap.js';

// Insertion sort algorithm
export const insertionSort = async (array, length) => {
    let moves = [];
    
    for (let i = 1; i < length; i++) {
        let j = i;
        
        // Move elements of array[0..i-1], that are greater than key,
        // to one position ahead of their current position
        while (j > 0 && array[j - 1] > array[j]) {
            await swap(array, j - 1, j);
            moves.push([j - 1, j, SWAP]);
            j--;
        }
    }
    
    return moves;
};
