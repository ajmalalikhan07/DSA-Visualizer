import React, { useState, useEffect } from 'react';
import { Github as Algorithm, BookOpen, BarChart3 } from 'lucide-react';
import VisualizationCanvas from './components/Canvas/VisualizationCanvas';
import ControlPanel from './components/Controls/ControlPanel';
import PseudocodePanel from './components/Panels/PseudocodePanel';
import ExplanationPanel from './components/Panels/ExplanationPanel';
import StatsPanel from './components/Panels/StatsPanel';
import ThemeToggle from './components/UI/ThemeToggle';
import { useVisualizer } from './hooks/useVisualizer';
import { useTheme } from './hooks/useTheme';
import { AlgorithmType } from './types';

function App() {
  const { isDark, toggleTheme } = useTheme();
  const visualizer = useVisualizer();
  
  const [activeTab, setActiveTab] = useState<'pseudocode' | 'explanation' | 'stats'>('explanation');
  const [canvasSize, setCanvasSize] = useState({ width: 800, height: 400 });

  // Initialize with random array
  useEffect(() => {
    visualizer.generateRandomArray(visualizer.state.arraySize);
  }, []);

  // Handle window resize for responsive canvas
  useEffect(() => {
    const handleResize = () => {
      const container = document.getElementById('canvas-container');
      if (container) {
        const rect = container.getBoundingClientRect();
        setCanvasSize({
          width: Math.max(400, rect.width - 40),
          height: Math.max(300, Math.min(500, rect.height - 40))
        });
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handlePlay = () => {
    if (visualizer.state.isRunning && !visualizer.state.isPaused) {
      // Currently running, so pause it
      visualizer.pauseResume();
    } else if (visualizer.state.isPaused) {
      // Currently paused, so resume
      visualizer.pauseResume();
    } else {
      // Not running, so start
      visualizer.runAlgorithm(visualizer.state.currentAlgorithm as AlgorithmType);
    }
  };


  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 transition-colors">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <Algorithm className="w-8 h-8 text-blue-600 dark:text-blue-400" />
              <div>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                  DSA Visualizer
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Interactive Data Structures & Algorithms Learning Tool
                </p>
              </div>
            </div>
            <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          
          {/* Left Column - Visualization & Controls */}
          <div className="lg:col-span-2 space-y-6">
            {/* Visualization Canvas */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                Visualization
              </h2>
              <div id="canvas-container" className="flex justify-center">
                <VisualizationCanvas
                  array={visualizer.state.array}
                  width={canvasSize.width}
                  height={canvasSize.height}
                />
              </div>
            </div>

            {/* Controls */}
            <ControlPanel
              currentAlgorithm={visualizer.state.currentAlgorithm}
              isRunning={visualizer.state.isRunning}
              isPaused={visualizer.state.isPaused}
              isStepMode={visualizer.state.isStepMode}
              animationSpeed={visualizer.state.animationSpeed}
              arraySize={visualizer.state.arraySize}
              searchTarget={visualizer.state.searchTarget}
              onAlgorithmChange={visualizer.setCurrentAlgorithm}
              onPlay={handlePlay}
              onPreviousStep={visualizer.previousStep}
              onNextStep={visualizer.nextStep}
              onGenerateArray={visualizer.generateNewArray}
              onSpeedChange={visualizer.setAnimationSpeed}
              onSizeChange={visualizer.setArraySize}
              onSearchTargetChange={visualizer.setSearchTarget}
              onStepModeToggle={() => visualizer.setStepMode(!visualizer.state.isStepMode)}
            />
          </div>

          {/* Right Column - Tabbed Panels */}
          <div className="lg:col-span-2">
            {/* Tab Navigation */}
            <div className="bg-white dark:bg-gray-800 rounded-t-lg shadow-lg">
              <div className="flex border-b border-gray-200 dark:border-gray-700">
                <button
                  onClick={() => setActiveTab('explanation')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'explanation'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <BookOpen size={18} />
                  Explanation
                </button>
                <button
                  onClick={() => setActiveTab('pseudocode')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'pseudocode'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <Algorithm size={18} />
                  Pseudocode
                </button>
                <button
                  onClick={() => setActiveTab('stats')}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-medium border-b-2 transition-colors ${
                    activeTab === 'stats'
                      ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/20'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  }`}
                >
                  <BarChart3 size={18} />
                  Statistics
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="bg-white dark:bg-gray-800 rounded-b-lg shadow-lg">
              <div className="p-6">
                <ExplanationPanel
                  currentAlgorithm={visualizer.state.currentAlgorithm}
                  isVisible={activeTab === 'explanation'}
                />
                <PseudocodePanel
                  currentAlgorithm={visualizer.state.currentAlgorithm}
                  currentStep={visualizer.state.currentStep}
                  isVisible={activeTab === 'pseudocode'}
                />
                <StatsPanel
                  stats={visualizer.state.stats}
                  isVisible={activeTab === 'stats'}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;