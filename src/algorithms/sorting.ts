import { ArrayElement, AlgorithmStats } from '../types';
import { MutableRefObject } from 'react';

type UpdateArrayFn = (array: ArrayElement[]) => void;
type UpdateStatsFn = (stats: Partial<AlgorithmStats>) => void;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

const swap = (arr: ArrayElement[], i: number, j: number) => {
  [arr[i], arr[j]] = [arr[j], arr[i]];
  arr[i].index = i;
  arr[j].index = j;
};

export const bubbleSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  searchTarget?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  for (let i = 0; i < n - 1; i++) {
    let swapped = false;
    
    for (let j = 0; j < n - i - 1; j++) {
      // Highlight comparing elements
      arr[j].state = 'comparing';
      arr[j + 1].state = 'comparing';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      if (arr[j].value > arr[j + 1].value) {
        // Highlight swapping elements
        arr[j].state = 'swapping';
        arr[j + 1].state = 'swapping';
        updateArray([...arr]);
        await delay(delayTime);
        
        swap(arr, j, j + 1);
        swaps++;
        updateStats({ swaps });
        swapped = true;
      }
      
      // Reset states
      arr[j].state = 'default';
      arr[j + 1].state = 'default';
    }
    
    // Mark the last element as sorted
    arr[n - 1 - i].state = 'sorted';
    updateArray([...arr]);
    
    if (!swapped) break;
  }
  
  // Mark all elements as sorted
  arr.forEach(element => element.state = 'sorted');
  updateArray([...arr]);
};

export const selectionSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  searchTarget?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  for (let i = 0; i < n - 1; i++) {
    if (cancelRef?.current) return;
    let minIndex = i;
    arr[i].state = 'comparing';
    
    for (let j = i + 1; j < n; j++) {
      if (cancelRef?.current) return;
      arr[j].state = 'comparing';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      if (arr[j].value < arr[minIndex].value) {
        if (minIndex !== i) arr[minIndex].state = 'default';
        minIndex = j;
        arr[minIndex].state = 'swapping';
      } else {
        arr[j].state = 'default';
      }
    }
    
    if (minIndex !== i) {
      arr[i].state = 'swapping';
      arr[minIndex].state = 'swapping';
      updateArray([...arr]);
      await delay(delayTime);
      
      swap(arr, i, minIndex);
      swaps++;
      updateStats({ swaps });
    }
    
    arr[i].state = 'sorted';
    if (minIndex !== i) arr[minIndex].state = 'default';
    updateArray([...arr]);
  }
  
  arr[n - 1].state = 'sorted';
  updateArray([...arr]);
};

export const insertionSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast'
) => {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  arr[0].state = 'sorted';
  updateArray([...arr]);
  
  for (let i = 1; i < n; i++) {
    if (cancelRef?.current) return;
    const key = arr[i];
    key.state = 'comparing';
    let j = i - 1;
    
    updateArray([...arr]);
    await delay(delayTime);
    
    while (j >= 0 && arr[j].value > key.value) {
      if (cancelRef?.current) return;
      arr[j].state = 'swapping';
      arr[j + 1].state = 'swapping';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      arr[j + 1] = arr[j];
      arr[j + 1].index = j + 1;
      swaps++;
      updateStats({ swaps });
      
      arr[j].state = 'default';
      j--;
    }
    
    if (j >= 0) {
      comparisons++;
      updateStats({ comparisons });
    }
    
    arr[j + 1] = key;
    arr[j + 1].index = j + 1;
    arr[j + 1].state = 'sorted';
    
    // Mark all elements up to i as sorted
    for (let k = 0; k <= i; k++) {
      arr[k].state = 'sorted';
    }
    
    updateArray([...arr]);
  }
};

export const mergeSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  searchTarget?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  const merge = async (left: number, mid: number, right: number) => {
    const leftArr = arr.slice(left, mid + 1);
    const rightArr = arr.slice(mid + 1, right + 1);
    
    let i = 0, j = 0, k = left;
    
    // Highlight merging sections
    for (let idx = left; idx <= right; idx++) {
      arr[idx].state = 'comparing';
    }
    updateArray([...arr]);
    await delay(delayTime);
    
    while (i < leftArr.length && j < rightArr.length) {
      if (cancelRef?.current) return;
      comparisons++;
      updateStats({ comparisons });
      
      if (leftArr[i].value <= rightArr[j].value) {
        arr[k] = leftArr[i];
        arr[k].index = k;
        arr[k].state = 'swapping';
        i++;
      } else {
        arr[k] = rightArr[j];
        arr[k].index = k;
        arr[k].state = 'swapping';
        j++;
      }
      
      swaps++;
      updateStats({ swaps });
      updateArray([...arr]);
      await delay(delayTime);
      
      arr[k].state = 'sorted';
      k++;
    }
    
    while (i < leftArr.length) {
      arr[k] = leftArr[i];
      arr[k].index = k;
      arr[k].state = 'sorted';
      i++;
      k++;
      swaps++;
      updateStats({ swaps });
    }
    
    while (j < rightArr.length) {
      arr[k] = rightArr[j];
      arr[k].index = k;
      arr[k].state = 'sorted';
      j++;
      k++;
      swaps++;
      updateStats({ swaps });
    }
    
    updateArray([...arr]);
  };

  const mergeSortHelper = async (left: number, right: number) => {
    if (left >= right) return;
    
    const mid = Math.floor((left + right) / 2);
    
    await mergeSortHelper(left, mid);
    await mergeSortHelper(mid + 1, right);
    await merge(left, mid, right);
  };

  await mergeSortHelper(0, arr.length - 1);
  
  // Mark all as sorted
  arr.forEach(element => element.state = 'sorted');
  updateArray([...arr]);
};

export const quickSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  searchTarget?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  const arr = [...array];
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  const partition = async (low: number, high: number): Promise<number> => {
    if (cancelRef?.current) return low;
    const pivot = arr[high];
    pivot.state = 'swapping'; // Pivot in red
    let i = low - 1;
    
    updateArray([...arr]);
    await delay(delayTime);
    
    for (let j = low; j < high; j++) {
      arr[j].state = 'comparing';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      if (arr[j].value < pivot.value) {
        i++;
        if (i !== j) {
          arr[i].state = 'swapping';
          arr[j].state = 'swapping';
          updateArray([...arr]);
          await delay(delayTime);
          
          swap(arr, i, j);
          swaps++;
          updateStats({ swaps });
        }
        
        arr[i].state = 'default';
      }
      
      arr[j].state = 'default';
    }
    
    if (i + 1 !== high) {
      swap(arr, i + 1, high);
      swaps++;
      updateStats({ swaps });
    }
    
    arr[i + 1].state = 'sorted';
    updateArray([...arr]);
    
    return i + 1;
  };

  const quickSortHelper = async (low: number, high: number) => {
    if (cancelRef?.current) return;
    if (low < high) {
      const pi = await partition(low, high);
      
      await quickSortHelper(low, pi - 1);
      await quickSortHelper(pi + 1, high);
    }
  };

  await quickSortHelper(0, arr.length - 1);
  
  // Mark all as sorted
  arr.forEach(element => element.state = 'sorted');
  updateArray([...arr]);
};

export const heapSort = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  searchTarget?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  const arr = [...array];
  const n = arr.length;
  let comparisons = 0;
  let swaps = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  const heapify = async (heapSize: number, i: number) => {
    if (cancelRef?.current) return;
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;
    
    // Highlight current node
    arr[i].state = 'comparing';
    updateArray([...arr]);
    await delay(delayTime);
    
    if (left < heapSize) {
      arr[left].state = 'comparing';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      if (arr[left].value > arr[largest].value) {
        largest = left;
      }
      arr[left].state = 'default';
    }
    
    if (right < heapSize) {
      arr[right].state = 'comparing';
      updateArray([...arr]);
      await delay(delayTime);
      
      comparisons++;
      updateStats({ comparisons });
      
      if (arr[right].value > arr[largest].value) {
        largest = right;
      }
      arr[right].state = 'default';
    }
    
    if (largest !== i) {
      arr[i].state = 'swapping';
      arr[largest].state = 'swapping';
      updateArray([...arr]);
      await delay(delayTime);
      
      swap(arr, i, largest);
      swaps++;
      updateStats({ swaps });
      
      arr[i].state = 'default';
      arr[largest].state = 'default';
      
      await heapify(heapSize, largest);
    } else {
      arr[i].state = 'default';
    }
  };

  // Build max heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    if (cancelRef?.current) return;
    await heapify(n, i);
  }
  
  // Extract elements from heap one by one
  for (let i = n - 1; i > 0; i--) {
    if (cancelRef?.current) return;
    // Move current root to end
    arr[0].state = 'swapping';
    arr[i].state = 'swapping';
    updateArray([...arr]);
    await delay(delayTime);
    
    swap(arr, 0, i);
    swaps++;
    updateStats({ swaps });
    
    arr[i].state = 'sorted';
    arr[0].state = 'default';
    
    // Call heapify on the reduced heap
    await heapify(i, 0);
  }
  
  arr[0].state = 'sorted';
  updateArray([...arr]);
};