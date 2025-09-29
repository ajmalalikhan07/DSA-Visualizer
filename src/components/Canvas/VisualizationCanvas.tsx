import React, { useRef, useEffect } from 'react';
import { ArrayElement } from '../../types';

interface VisualizationCanvasProps {
  array: ArrayElement[];
  width: number;
  height: number;
}

const VisualizationCanvas: React.FC<VisualizationCanvasProps> = ({ array, width, height }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, width, height);

    if (array.length === 0) return;

    const barWidth = Math.max(8, Math.floor((width - 40) / array.length));
    const maxValue = Math.max(...array.map(el => el.value));
    const heightScale = (height - 60) / maxValue;

    array.forEach((element, index) => {
      const barHeight = element.value * heightScale;
      const x = Math.floor(20 + index * barWidth);
      const y = height - barHeight - 30;

      // Determine color based on state
      let color = '#64748b'; // default - slate-500
      switch (element.state) {
        case 'comparing':
          color = '#f59e0b'; // yellow-500
          break;
        case 'swapping':
          color = '#ef4444'; // red-500
          break;
        case 'sorted':
          color = '#10b981'; // green-500
          break;
        case 'found':
          color = '#10b981'; // green-500
          break;
        case 'current':
          color = '#f59e0b'; // yellow-500
          break;
        default:
          color = '#64748b'; // slate-500
      }

      // Draw bar with rounded corners
      ctx.fillStyle = color;
      ctx.beginPath();
      ctx.roundRect(x, y, Math.floor(barWidth - 2), Math.floor(barHeight), 3);
      ctx.fill();

      // Draw value on top of bar if space allows
      if (barWidth > 20) {
        ctx.fillStyle = '#374151';
        ctx.font = '12px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(
          element.value.toString(),
          Math.floor(x + barWidth / 2),
          Math.floor(y - 5)
        );
      }

      // Draw index at bottom if space allows
      if (barWidth > 15) {
        ctx.fillStyle = '#6b7280';
        ctx.font = '10px Inter';
        ctx.textAlign = 'center';
        ctx.fillText(
          index.toString(),
          Math.floor(x + barWidth / 2),
          height - 10
        );
      }
    });

  }, [array, width, height]);

  return (
    <canvas
      ref={canvasRef}
      width={width}
      height={height}
      className="border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800"
    />
  );
};

export default VisualizationCanvas;