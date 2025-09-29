import { useState, useCallback, useRef } from 'react';
import { ArrayElement, AlgorithmStats, VisualizerState, AlgorithmType } from '../types';
import * as sortingAlgorithms from '../algorithms/sorting';
import * as searchingAlgorithms from '../algorithms/searching';

export const useVisualizer = () => {
  const [state, setState] = useState<VisualizerState>({
    array: [],
    isRunning: false,
    isPaused: false,
    isStepMode: false,
    currentAlgorithm: 'bubbleSort',
    animationSpeed: 'medium',
    arraySize: 10,
    stats: {
      comparisons: 0,
      swaps: 0,
      arrayAccesses: 0,
      executionTime: 0
    },
    currentStep: 0,
    searchTarget: undefined,
    algorithmHistory: [],
    currentHistoryIndex: -1
  });

  const animationRef = useRef<NodeJS.Timeout | null>(null);
  const stepQueueRef = useRef<(() => void)[]>([]);
  const startTimeRef = useRef<number>(0);
  const cancelRef = useRef<boolean>(false);
  const isRunningRef = useRef<boolean>(false);

  const generateRandomArray = useCallback((size: number) => {
    const newArray: ArrayElement[] = [];
    for (let i = 0; i < size; i++) {
      newArray.push({
        value: Math.floor(Math.random() * 100) + 1,
        state: 'default',
        index: i
      });
    }
    setState(prev => ({ 
      ...prev, 
      array: newArray,
      algorithmHistory: [newArray],
      currentHistoryIndex: 0,
      stats: { comparisons: 0, swaps: 0, arrayAccesses: 0, executionTime: 0 },
      currentStep: 0
    }));
  }, []);

  const resetStats = useCallback(() => {
    setState(prev => ({
      ...prev,
      stats: { comparisons: 0, swaps: 0, arrayAccesses: 0, executionTime: 0 },
      currentStep: 0,
      algorithmHistory: [prev.array],
      currentHistoryIndex: 0
    }));
    startTimeRef.current = Date.now();
  }, []);

  const updateArray = useCallback((newArray: ArrayElement[]) => {
    setState(prev => {
      const newHistory = [...prev.algorithmHistory, newArray];
      return {
        ...prev,
        array: newArray,
        algorithmHistory: newHistory,
        currentHistoryIndex: newHistory.length - 1
      };
    });
  }, []);

  const updateStats = useCallback((newStats: Partial<AlgorithmStats>) => {
    setState(prev => ({
      ...prev,
      stats: { ...prev.stats, ...newStats },
      currentStep: prev.currentStep + 1
    }));
  }, []);

  const setRunning = useCallback((isRunning: boolean) => {
    setState(prev => ({ ...prev, isRunning }));
    isRunningRef.current = isRunning;
  }, []);

  const setPaused = useCallback((isPaused: boolean) => {
    setState(prev => ({ ...prev, isPaused }));
  }, []);

  const setStepMode = useCallback((isStepMode: boolean) => {
    setState(prev => ({ ...prev, isStepMode }));
  }, []);

  const setCurrentAlgorithm = useCallback((algorithm: string) => {
    setState(prev => ({ ...prev, currentAlgorithm: algorithm }));
  }, []);

  const setAnimationSpeed = useCallback((speed: 'slow' | 'medium' | 'fast') => {
    setState(prev => ({ ...prev, animationSpeed: speed }));
  }, []);

  const setArraySize = useCallback((size: number) => {
    setState(prev => ({ ...prev, arraySize: size }));
    generateRandomArray(size);
  }, [generateRandomArray]);

  const setSearchTarget = useCallback((target: number) => {
    setState(prev => ({ ...prev, searchTarget: target }));
  }, []);

  const stopAlgorithm = useCallback(() => {
    // Immediately set cancellation flag
    cancelRef.current = true;
    
    // Clear any pending timeouts
    if (animationRef.current) {
      clearTimeout(animationRef.current);
      animationRef.current = null;
    }
    
    // Reset running states immediately
    setState(prev => ({
      ...prev,
      isRunning: false,
      isPaused: false
    }));
    isRunningRef.current = false;
  }, []);

  const generateNewArray = useCallback(() => {
    // Stop any running algorithm first
    stopAlgorithm();
    
    // Generate new array after a brief delay to ensure clean state
    setTimeout(() => {
      generateRandomArray(state.arraySize);
    }, 100);
  }, [stopAlgorithm, generateRandomArray, state.arraySize]);

  const previousStep = useCallback(() => {
    setState(prev => {
      if (prev.currentHistoryIndex > 0) {
        const newIndex = prev.currentHistoryIndex - 1;
        return {
          ...prev,
          array: prev.algorithmHistory[newIndex],
          currentHistoryIndex: newIndex,
          currentStep: Math.max(0, prev.currentStep - 1)
        };
      }
      return prev;
    });
  }, []);

  const nextStep = useCallback(() => {
    setState(prev => {
      if (prev.currentHistoryIndex < prev.algorithmHistory.length - 1) {
        const newIndex = prev.currentHistoryIndex + 1;
        return {
          ...prev,
          array: prev.algorithmHistory[newIndex],
          currentHistoryIndex: newIndex,
          currentStep: prev.currentStep + 1
        };
      }
      return prev;
    });
  }, []);
  const executeStep = useCallback(() => {
    if (stepQueueRef.current.length > 0) {
      const step = stepQueueRef.current.shift();
      if (step) step();
      return true;
    }
    return false;
  }, []);

  const runAlgorithm = useCallback(async (algorithmType: AlgorithmType) => {
    if (isRunningRef.current) return;

    cancelRef.current = false;
    resetStats();
    setRunning(true);
    stepQueueRef.current = [];

    const algorithms = { ...sortingAlgorithms, ...searchingAlgorithms };
    const algorithm = algorithms[algorithmType];

    try {
      if (algorithm) {
        await algorithm(
          [...state.array],
          updateArray,
          updateStats,
          state.animationSpeed,
          state.searchTarget,
          cancelRef
        );
      }
    } catch (error) {
      // Handle any errors during algorithm execution
      console.log('Algorithm execution stopped');
    } finally {
      // Always clean up state regardless of how the algorithm ended
      setState(prev => ({
        ...prev,
        stats: { ...prev.stats, executionTime: Date.now() - startTimeRef.current },
        isRunning: false,
        isPaused: false
      }));
      isRunningRef.current = false;
    }
  }, [state.array, state.animationSpeed, state.searchTarget, updateArray, updateStats, resetStats, setRunning]);

  const pauseResume = useCallback(() => {
    if (!isRunningRef.current) return;
    
    setPaused(!state.isPaused);
  }, [state.isPaused, setPaused]);


  return {
    state,
    generateRandomArray,
    generateNewArray,
    runAlgorithm,
    pauseResume,
    stopAlgorithm,
    previousStep,
    nextStep,
    setCurrentAlgorithm,
    setAnimationSpeed,
    setArraySize,
    setSearchTarget,
    setStepMode
  };
};