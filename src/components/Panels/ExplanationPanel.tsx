import React from 'react';
import { algorithmData } from '../../data/algorithmData';
import { Clock, Layers, Lightbulb } from 'lucide-react';

interface ExplanationPanelProps {
  currentAlgorithm: string;
  isVisible: boolean;
}

const ExplanationPanel: React.FC<ExplanationPanelProps> = ({
  currentAlgorithm,
  isVisible
}) => {
  if (!isVisible) return null;

  const algorithm = algorithmData[currentAlgorithm];
  if (!algorithm) return null;

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        {algorithm.name} Explanation
      </h3>
      
      {/* Description */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Lightbulb size={18} className="text-blue-500" />
          How it works
        </h4>
        <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
          {algorithm.description}
        </p>
      </div>

      {/* Time Complexity */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
          <Clock size={18} className="text-green-500" />
          Time Complexity
        </h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg">
            <div className="text-sm font-medium text-green-800 dark:text-green-200">Best Case</div>
            <div className="text-lg font-mono font-bold text-green-600 dark:text-green-400">
              {algorithm.timeComplexity.best}
            </div>
          </div>
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg">
            <div className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Average Case</div>
            <div className="text-lg font-mono font-bold text-yellow-600 dark:text-yellow-400">
              {algorithm.timeComplexity.average}
            </div>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg">
            <div className="text-sm font-medium text-red-800 dark:text-red-200">Worst Case</div>
            <div className="text-lg font-mono font-bold text-red-600 dark:text-red-400">
              {algorithm.timeComplexity.worst}
            </div>
          </div>
        </div>
      </div>

      {/* Space Complexity */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
          <Layers size={18} className="text-purple-500" />
          Space Complexity
        </h4>
        <div className="bg-purple-50 dark:bg-purple-900/20 p-3 rounded-lg inline-block">
          <div className="text-lg font-mono font-bold text-purple-600 dark:text-purple-400">
            {algorithm.spaceComplexity}
          </div>
        </div>
      </div>

      {/* Use Cases */}
      <div>
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Real-world Use Cases
        </h4>
        <ul className="space-y-2">
          {algorithm.useCases.map((useCase, index) => (
            <li key={index} className="flex items-start gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
              <span className="text-gray-700 dark:text-gray-300">{useCase}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExplanationPanel;