import { AlgorithmInfo } from '../types';

export const algorithmData: Record<string, AlgorithmInfo> = {
  bubbleSort: {
    name: 'Bubble Sort',
    type: 'sorting',
    description: 'Bubble Sort is a simple sorting algorithm that repeatedly steps through the list, compares adjacent elements and swaps them if they are in the wrong order.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'Educational purposes to understand sorting concepts',
      'Small datasets where simplicity is preferred',
      'When memory usage must be minimal'
    ],
    pseudocode: [
      'procedure bubbleSort(A : list of sortable items)',
      '    n := length(A)',
      '    repeat',
      '        swapped := false',
      '        for i := 1 to n - 1 inclusive do',
      '            if A[i - 1] > A[i] then',
      '                swap(A[i - 1], A[i])',
      '                swapped = true',
      '            end if',
      '        end for',
      '        n := n - 1',
      '    until not swapped',
      'end procedure'
    ]
  },
  selectionSort: {
    name: 'Selection Sort',
    type: 'sorting',
    description: 'Selection Sort divides the input list into sorted and unsorted regions, and repeatedly selects the smallest element from the unsorted region.',
    timeComplexity: {
      best: 'O(n²)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'When memory write is a costly operation',
      'Small datasets',
      'When simplicity is more important than efficiency'
    ],
    pseudocode: [
      'procedure selectionSort(A : array of sortable items)',
      '    n := length(A)',
      '    for i := 0 to n - 2 do',
      '        minIndex := i',
      '        for j := i + 1 to n - 1 do',
      '            if A[j] < A[minIndex] then',
      '                minIndex := j',
      '            end if',
      '        end for',
      '        if minIndex ≠ i then',
      '            swap(A[i], A[minIndex])',
      '        end if',
      '    end for',
      'end procedure'
    ]
  },
  insertionSort: {
    name: 'Insertion Sort',
    type: 'sorting',
    description: 'Insertion Sort builds the final sorted array one item at a time, inserting each element into its proper position.',
    timeComplexity: {
      best: 'O(n)',
      average: 'O(n²)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'Small datasets',
      'Nearly sorted data',
      'Online algorithm for streaming data'
    ],
    pseudocode: [
      'procedure insertionSort(A : array of sortable items)',
      '    for i := 1 to length(A) - 1 do',
      '        key := A[i]',
      '        j := i - 1',
      '        while j >= 0 and A[j] > key do',
      '            A[j + 1] := A[j]',
      '            j := j - 1',
      '        end while',
      '        A[j + 1] := key',
      '    end for',
      'end procedure'
    ]
  },
  mergeSort: {
    name: 'Merge Sort',
    type: 'sorting',
    description: 'Merge Sort uses divide-and-conquer approach, dividing the array into halves, sorting them, and merging back together.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(n)',
    useCases: [
      'Large datasets requiring stable sort',
      'External sorting',
      'When consistent O(n log n) performance is needed'
    ],
    pseudocode: [
      'procedure mergeSort(A : array of sortable items)',
      '    if length(A) <= 1 then',
      '        return A',
      '    end if',
      '    mid := length(A) / 2',
      '    left := mergeSort(A[0...mid-1])',
      '    right := mergeSort(A[mid...length(A)-1])',
      '    return merge(left, right)',
      'end procedure',
      '',
      'procedure merge(left, right)',
      '    result := empty array',
      '    while left is not empty and right is not empty',
      '        if left[0] <= right[0] then',
      '            append left[0] to result',
      '            remove left[0] from left',
      '        else',
      '            append right[0] to result',
      '            remove right[0] from right',
      '        end if',
      '    end while',
      '    append remaining elements to result',
      '    return result',
      'end procedure'
    ]
  },
  quickSort: {
    name: 'Quick Sort',
    type: 'sorting',
    description: 'Quick Sort uses divide-and-conquer by selecting a pivot element and partitioning the array around it.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n²)'
    },
    spaceComplexity: 'O(log n)',
    useCases: [
      'General-purpose sorting',
      'Large datasets',
      'When average case performance is important'
    ],
    pseudocode: [
      'procedure quickSort(A, low, high)',
      '    if low < high then',
      '        pi := partition(A, low, high)',
      '        quickSort(A, low, pi - 1)',
      '        quickSort(A, pi + 1, high)',
      '    end if',
      'end procedure',
      '',
      'procedure partition(A, low, high)',
      '    pivot := A[high]',
      '    i := low - 1',
      '    for j := low to high - 1 do',
      '        if A[j] < pivot then',
      '            i := i + 1',
      '            swap(A[i], A[j])',
      '        end if',
      '    end for',
      '    swap(A[i + 1], A[high])',
      '    return i + 1',
      'end procedure'
    ]
  },
  heapSort: {
    name: 'Heap Sort',
    type: 'sorting',
    description: 'Heap Sort uses a binary heap data structure to sort elements, first building a max heap then repeatedly extracting the maximum.',
    timeComplexity: {
      best: 'O(n log n)',
      average: 'O(n log n)',
      worst: 'O(n log n)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'When consistent O(n log n) performance is needed',
      'Memory-constrained environments',
      'Priority queue implementations'
    ],
    pseudocode: [
      'procedure heapSort(A)',
      '    buildMaxHeap(A)',
      '    for i := length(A) - 1 downto 1 do',
      '        swap(A[0], A[i])',
      '        heapify(A, 0, i)',
      '    end for',
      'end procedure',
      '',
      'procedure buildMaxHeap(A)',
      '    for i := length(A)/2 - 1 downto 0 do',
      '        heapify(A, i, length(A))',
      '    end for',
      'end procedure',
      '',
      'procedure heapify(A, i, heapSize)',
      '    left := 2*i + 1',
      '    right := 2*i + 2',
      '    largest := i',
      '    if left < heapSize and A[left] > A[largest] then',
      '        largest := left',
      '    end if',
      '    if right < heapSize and A[right] > A[largest] then',
      '        largest := right',
      '    end if',
      '    if largest ≠ i then',
      '        swap(A[i], A[largest])',
      '        heapify(A, largest, heapSize)',
      '    end if',
      'end procedure'
    ]
  },
  linearSearch: {
    name: 'Linear Search',
    type: 'searching',
    description: 'Linear Search checks each element of the array sequentially until the target is found or the array is exhausted.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(n)',
      worst: 'O(n)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'Unsorted data',
      'Small datasets',
      'When simplicity is preferred over efficiency'
    ],
    pseudocode: [
      'procedure linearSearch(A, target)',
      '    for i := 0 to length(A) - 1 do',
      '        if A[i] = target then',
      '            return i',
      '        end if',
      '    end for',
      '    return -1',
      'end procedure'
    ]
  },
  binarySearch: {
    name: 'Binary Search',
    type: 'searching',
    description: 'Binary Search efficiently finds a target value in a sorted array by repeatedly dividing the search interval in half.',
    timeComplexity: {
      best: 'O(1)',
      average: 'O(log n)',
      worst: 'O(log n)'
    },
    spaceComplexity: 'O(1)',
    useCases: [
      'Sorted data',
      'Large datasets',
      'When fast search performance is critical'
    ],
    pseudocode: [
      'procedure binarySearch(A, target)',
      '    left := 0',
      '    right := length(A) - 1',
      '    while left <= right do',
      '        mid := (left + right) / 2',
      '        if A[mid] = target then',
      '            return mid',
      '        else if A[mid] < target then',
      '            left := mid + 1',
      '        else',
      '            right := mid - 1',
      '        end if',
      '    end while',
      '    return -1',
      'end procedure'
    ]
  }
};