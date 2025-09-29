import { ArrayElement, AlgorithmStats } from '../types';
import { MutableRefObject } from 'react';

type UpdateArrayFn = (array: ArrayElement[]) => void;
type UpdateStatsFn = (stats: Partial<AlgorithmStats>) => void;

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const linearSearch = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  target?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  if (target === undefined) return;
  
  const arr = [...array];
  let comparisons = 0;
  let found = false;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);

  // Reset all states
  arr.forEach(element => element.state = 'default');
  updateArray([...arr]);
  
  for (let i = 0; i < arr.length; i++) {
    if (cancelRef?.current) return;
    // Highlight current element
    arr[i].state = 'current';
    updateArray([...arr]);
    await delay(delayTime);
    
    comparisons++;
    updateStats({ comparisons });
    
    if (arr[i].value === target) {
      // Found the target
      arr[i].state = 'found';
      found = true;
      updateArray([...arr]);
      break;
    } else {
      // Not found, reset to default
      arr[i].state = 'default';
    }
  }
  
  if (!found) {
    // Reset all to default if not found
    arr.forEach(element => element.state = 'default');
    updateArray([...arr]);
  }
};

export const binarySearch = async (
  array: ArrayElement[],
  updateArray: UpdateArrayFn,
  updateStats: UpdateStatsFn,
  speed: 'slow' | 'medium' | 'fast',
  target?: number,
  cancelRef?: MutableRefObject<boolean>
) => {
  if (target === undefined) return;
  
  const arr = [...array];
  let comparisons = 0;
  
  const getDelay = (speed: 'slow' | 'medium' | 'fast') => {
    switch (speed) {
      case 'slow': return 1000;
      case 'medium': return 600;
      case 'fast': return 300;
    }
  };
  
  const delayTime = getDelay(speed);
  
  // First sort the array for binary search
  arr.sort((a, b) => a.value - b.value);
  arr.forEach((element, index) => {
    element.index = index;
    element.state = 'default';
  });
  
  updateArray([...arr]);
  await delay(delayTime);
  
  let left = 0;
  let right = arr.length - 1;
  let found = false;
  
  while (left <= right && !found) {
    if (cancelRef?.current) return;
    const mid = Math.floor((left + right) / 2);
    
    // Highlight the current search range
    for (let i = left; i <= right; i++) {
      if (i === mid) {
        arr[i].state = 'current';
      } else {
        arr[i].state = 'comparing';
      }
    }
    
    updateArray([...arr]);
    await delay(delayTime);
    
    comparisons++;
    updateStats({ comparisons });
    
    if (arr[mid].value === target) {
      // Found the target
      arr[mid].state = 'found';
      found = true;
    } else if (arr[mid].value < target) {
      // Target is in the right half
      left = mid + 1;
    } else {
      // Target is in the left half
      right = mid - 1;
    }
    
    // Reset states for next iteration
    if (!found) {
      for (let i = 0; i < arr.length; i++) {
        if (i < left || i > right) {
          arr[i].state = 'default';
        }
      }
    }
    
    updateArray([...arr]);
    await delay(delayTime);
  }
  
  if (!found) {
    // Reset all to default if not found
    arr.forEach(element => element.state = 'default');
    updateArray([...arr]);
  }
};