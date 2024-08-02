import { SWAP } from '../helper/constants.js';
import { swap } from '../helper/swap.js';

// Heap sort algorithm
export const heapSort = async (array, length) => {
    let moves = [];

    // Build the heap
    for (let i = Math.floor(length / 2) - 1; i >= 0; i--) {
        await heapify(moves, array, length, i);
    }

    // Extract elements from the heap one by one
    for (let i = length - 1; i > 0; i--) {
        // Move current root to end
        moves.push([0, i, SWAP]);
        await swap(array, 0, i);
        // Rebuild the heap with the reduced heap
        await heapify(moves, array, i, 0);
    }

    return moves;
};

// Heapify a subtree rooted with node i
const heapify = async (moves, array, length, index) => {
    let largest = index;
    let left = 2 * index + 1;
    let right = 2 * index + 2;

    // Find the largest among root, left, and right
    if (left < length && array[left] > array[largest]) {
        largest = left;
    }
    if (right < length && array[right] > array[largest]) {
        largest = right;
    }

    // Swap and continue heapifying if root is not the largest
    if (largest !== index) {
        moves.push([index, largest, SWAP]);
        await swap(array, index, largest);
        await heapify(moves, array, length, largest);
    }
};
