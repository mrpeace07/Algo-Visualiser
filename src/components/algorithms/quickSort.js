import { SWAP } from '../helper/constants.js';
import { swap } from '../helper/swap.js';

// QuickSort algorithm
export const quickSort = async (array, length) => {
    let moves = [];
    await quickSortHelper(moves, array, 0, length - 1);
    return moves;
};

const quickSortHelper = async (moves, array, start, end) => {
    if (start < end) {
        const pivotIndex = await partition(moves, array, start, end);
        await quickSortHelper(moves, array, start, pivotIndex - 1);
        await quickSortHelper(moves, array, pivotIndex + 1, end);
    }
};

const partition = async (moves, array, start, end) => {
    const pivotValue = array[end];
    let partitionIndex = start;

    for (let i = start; i < end; i++) {
        if (array[i] < pivotValue) {
            await swap(array, i, partitionIndex);
            moves.push([i, partitionIndex, SWAP]);
            partitionIndex++;
        }
    }
    
    await swap(array, partitionIndex, end);
    moves.push([end, partitionIndex, SWAP]);
    
    return partitionIndex;
};
