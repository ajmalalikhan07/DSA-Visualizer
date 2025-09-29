import React from 'react';
import { Play, Pause, Shuffle, SkipBack, SkipForward } from 'lucide-react';
import { algorithmData } from '../../data/algorithmData';

interface ControlPanelProps {
  currentAlgorithm: string;
  isRunning: boolean;
  isPaused: boolean;
  isStepMode: boolean;
  animationSpeed: 'slow' | 'medium' | 'fast';
  arraySize: number;
  searchTarget?: number;
  onAlgorithmChange: (algorithm: string) => void;
  onPlay: () => void;
  onPreviousStep: () => void;
  onNextStep: () => void;
  onGenerateArray: () => void;
  onSpeedChange: (speed: 'slow' | 'medium' | 'fast') => void;
  onSizeChange: (size: number) => void;
  onSearchTargetChange: (target: number) => void;
  onStepModeToggle: () => void;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  currentAlgorithm,
  isRunning,
  isPaused,
  isStepMode,
  animationSpeed,
  arraySize,
  searchTarget,
  onAlgorithmChange,
  onPlay,
  onPreviousStep,
  onNextStep,
  onGenerateArray,
  onSpeedChange,
  onSizeChange,
  onSearchTargetChange,
  onStepModeToggle
}) => {
  const isSearchAlgorithm = algorithmData[currentAlgorithm]?.type === 'searching';

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Controls</h2>
      
      {/* Algorithm Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Algorithm
        </label>
        <select
          value={currentAlgorithm}
          onChange={(e) => onAlgorithmChange(e.target.value)}
          disabled={isRunning}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          <optgroup label="Sorting Algorithms">
            <option value="bubbleSort">Bubble Sort</option>
            <option value="selectionSort">Selection Sort</option>
            <option value="insertionSort">Insertion Sort</option>
            <option value="mergeSort">Merge Sort</option>
            <option value="quickSort">Quick Sort</option>
            <option value="heapSort">Heap Sort</option>
          </optgroup>
          <optgroup label="Searching Algorithms">
            <option value="linearSearch">Linear Search</option>
            <option value="binarySearch">Binary Search</option>
          </optgroup>
        </select>
      </div>

      {/* Search Target (for search algorithms) */}
      {isSearchAlgorithm && (
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Search Target
          </label>
          <input
            type="number"
            value={searchTarget || ''}
            onChange={(e) => onSearchTargetChange(parseInt(e.target.value) || 0)}
            disabled={isRunning}
            placeholder="Enter value to search"
            className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
          />
        </div>
      )}

      {/* Control Buttons */}
      <div className="space-y-3">
        {/* Top Row: Start/Pause Toggle | New Array */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPlay}
            disabled={isSearchAlgorithm && !searchTarget}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white rounded-md transition-colors"
          >
            {isRunning && !isPaused ? <Pause size={18} /> : <Play size={18} />}
            {isRunning && !isPaused ? 'Pause' : 'Start'}
          </button>
          
          <button
            onClick={onGenerateArray}
            disabled={false}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            <Shuffle size={18} />
            New Array
          </button>
        </div>
        
        {/* Bottom Row: Previous Step | Next Step */}
        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onPreviousStep}
            disabled={isRunning}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            <SkipBack size={18} />
            Previous Step
          </button>
          
          <button
            onClick={onNextStep}
            disabled={isRunning}
            className="flex items-center justify-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 disabled:bg-gray-400 text-white rounded-md transition-colors"
          >
            <SkipForward size={18} />
            Next Step
          </button>
        </div>
      </div>

      {/* Step Mode Toggle */}
      <div className="flex items-center space-x-3">
        <input
          id="stepMode"
          type="checkbox"
          checked={isStepMode}
          onChange={onStepModeToggle}
          disabled={isRunning}
          className="w-4 h-4 text-blue-600 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 rounded focus:ring-blue-500"
        />
        <label htmlFor="stepMode" className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Step-by-Step Mode
        </label>
      </div>

      {/* Array Size Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Array Size: {arraySize}
        </label>
        <input
          type="range"
          min="5"
          max="100"
          value={arraySize}
          onChange={(e) => onSizeChange(parseInt(e.target.value))}
          disabled={isRunning}
          className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
        />
      </div>

      {/* Animation Speed Slider */}
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
          Animation Speed
        </label>
        <select
          value={animationSpeed}
          onChange={(e) => onSpeedChange(e.target.value as 'slow' | 'medium' | 'fast')}
          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500"
        >
          <option value="slow">Slow</option>
          <option value="medium">Medium</option>
          <option value="fast">Fast</option>
        </select>
      </div>
    </div>
  );
};

export default ControlPanel;