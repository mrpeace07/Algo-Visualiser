import { CHANGE_VALUE } from "../helper/constants.js";

// Main MergeSort function
export const mergeSort = async (array, length) => {
  let moves = [];
  await mergeSortHelper(array, moves, 0, length - 1);
  return moves;
};

// Helper function to divide the array
const mergeSortHelper = async (array, moves, start, end) => {
  if (start < end) {
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(array, moves, start, mid);
    await mergeSortHelper(array, moves, mid + 1, end);
    await merge(array, moves, start, mid, end);
  }
};

// Merge function to combine sorted halves
const merge = async (array, moves, start, mid, end) => {
  const left = array.slice(start, mid + 1);
  const right = array.slice(mid + 1, end + 1);
  let i = 0,
    j = 0,
    k = start;

  while (i < left.length && j < right.length) {
    if (left[i] <= right[j]) {
      array[k++] = left[i++];
    } else {
      array[k++] = right[j++];
    }
  }

  while (i < left.length) {
    array[k++] = left[i++];
  }

  while (j < right.length) {
    array[k++] = right[j++];
  }

  for (let i = start; i <= end; i++) {
    moves.push([i, array[i], CHANGE_VALUE, array.slice(start, end + 1)]);
  }
};
