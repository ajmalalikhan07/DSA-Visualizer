import React from 'react';
import { algorithmData } from '../../data/algorithmData';

interface PseudocodePanelProps {
  currentAlgorithm: string;
  currentStep: number;
  isVisible: boolean;
}

const PseudocodePanel: React.FC<PseudocodePanelProps> = ({
  currentAlgorithm,
  currentStep,
  isVisible
}) => {
  if (!isVisible) return null;

  const algorithm = algorithmData[currentAlgorithm];
  if (!algorithm) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Pseudocode: {algorithm.name}
      </h3>
      
      <div className="bg-gray-50 dark:bg-gray-900 rounded-lg p-4 overflow-x-auto">
        <pre className="text-sm font-mono text-gray-800 dark:text-gray-200">
          {algorithm.pseudocode.map((line, index) => (
            <div
              key={index}
              className={`py-1 px-2 rounded ${
                index === Math.floor(currentStep / 2) % algorithm.pseudocode.length
                  ? 'bg-yellow-200 dark:bg-yellow-800 text-yellow-900 dark:text-yellow-100'
                  : ''
              }`}
            >
              <span className="text-gray-500 dark:text-gray-400 mr-3">
                {String(index + 1).padStart(2, '0')}
              </span>
              {line}
            </div>
          ))}
        </pre>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
        <p>The highlighted line shows the approximate current step in the algorithm execution.</p>
      </div>
    </div>
  );
};

export default PseudocodePanel;