import React from 'react';
import { AlgorithmStats } from '../../types';
import { BarChart3, Clock, ArrowUpDown, Eye } from 'lucide-react';

interface StatsPanelProps {
  stats: AlgorithmStats;
  isVisible: boolean;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, isVisible }) => {
  if (!isVisible) return null;

  const formatTime = (ms: number) => {
    if (ms < 1000) return `${ms}ms`;
    return `${(ms / 1000).toFixed(2)}s`;
  };

  const formatNumber = (num: number) => {
    return num.toLocaleString();
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-6">
        Algorithm Statistics
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Comparisons */}
        <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <BarChart3 size={20} className="text-blue-600 dark:text-blue-400" />
            <h4 className="font-semibold text-blue-800 dark:text-blue-200">Comparisons</h4>
          </div>
          <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            {formatNumber(stats.comparisons)}
          </div>
          <div className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Number of element comparisons
          </div>
        </div>

        {/* Swaps */}
        <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <ArrowUpDown size={20} className="text-red-600 dark:text-red-400" />
            <h4 className="font-semibold text-red-800 dark:text-red-200">Swaps</h4>
          </div>
          <div className="text-2xl font-bold text-red-600 dark:text-red-400">
            {formatNumber(stats.swaps)}
          </div>
          <div className="text-sm text-red-700 dark:text-red-300 mt-1">
            Number of element swaps
          </div>
        </div>

        {/* Array Accesses */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Eye size={20} className="text-green-600 dark:text-green-400" />
            <h4 className="font-semibold text-green-800 dark:text-green-200">Array Accesses</h4>
          </div>
          <div className="text-2xl font-bold text-green-600 dark:text-green-400">
            {formatNumber(stats.arrayAccesses)}
          </div>
          <div className="text-sm text-green-700 dark:text-green-300 mt-1">
            Total array element accesses
          </div>
        </div>

        {/* Execution Time */}
        <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg">
          <div className="flex items-center gap-3 mb-2">
            <Clock size={20} className="text-purple-600 dark:text-purple-400" />
            <h4 className="font-semibold text-purple-800 dark:text-purple-200">Execution Time</h4>
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
            {formatTime(stats.executionTime)}
          </div>
          <div className="text-sm text-purple-700 dark:text-purple-300 mt-1">
            Total algorithm runtime
          </div>
        </div>
      </div>

      {/* Performance Chart */}
      <div className="mt-6">
        <h4 className="font-semibold text-gray-900 dark:text-white mb-3">
          Performance Overview
        </h4>
        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Efficiency</span>
            <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-red-500 to-green-500 h-2 rounded-full" 
                style={{ 
                  width: `${Math.max(10, Math.min(90, 100 - (stats.comparisons / 1000) * 10))}%` 
                }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">
              {stats.comparisons < 100 ? 'High' : stats.comparisons < 1000 ? 'Medium' : 'Low'}
            </span>
          </div>
          
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600 dark:text-gray-400">Memory Usage</span>
            <div className="flex-1 mx-4 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-green-500 to-yellow-500 h-2 rounded-full" 
                style={{ width: '30%' }}
              ></div>
            </div>
            <span className="text-sm text-gray-600 dark:text-gray-400">Low</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;