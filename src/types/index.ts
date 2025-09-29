export interface ArrayElement {
  value: number;
  state: 'default' | 'comparing' | 'swapping' | 'sorted' | 'found' | 'current';
  index: number;
}

export interface AlgorithmStats {
  comparisons: number;
  swaps: number;
  arrayAccesses: number;
  executionTime: number;
}

export interface AlgorithmInfo {
  name: string;
  type: 'sorting' | 'searching';
  description: string;
  timeComplexity: {
    best: string;
    average: string;
    worst: string;
  };
  spaceComplexity: string;
  useCases: string[];
  pseudocode: string[];
}

export interface VisualizerState {
  array: ArrayElement[];
  isRunning: boolean;
  isPaused: boolean;
  isStepMode: boolean;
  currentAlgorithm: string;
  animationSpeed: 'slow' | 'medium' | 'fast';
  arraySize: number;
  stats: AlgorithmStats;
  currentStep: number;
  searchTarget?: number;
  algorithmHistory: ArrayElement[][];
  currentHistoryIndex: number;
}

export type AlgorithmType = 'bubbleSort' | 'selectionSort' | 'insertionSort' | 'mergeSort' | 'quickSort' | 'heapSort' | 'linearSearch' | 'binarySearch';