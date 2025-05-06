import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';

interface PerformanceData {
  [key: string]: {
    value: number;
    rating: 'good' | 'needs-improvement' | 'poor';
  };
}

export const PerformanceMonitor: React.FC = () => {
  const [metrics, setMetrics] = useState<PerformanceData>({});
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;

    const observer = new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (entry.entryType === 'measure') {
          setMetrics((prev) => ({
            ...prev,
            [entry.name]: {
              value: entry.duration,
              rating: entry.duration < 100 ? 'good' : entry.duration < 300 ? 'needs-improvement' : 'poor',
            },
          }));
        }
      });
    });

    observer.observe({ entryTypes: ['measure'] });

    return () => observer.disconnect();
  }, []);

  if (process.env.NODE_ENV !== 'development') return null;

  const getRatingColor = (rating: string) => {
    switch (rating) {
      case 'good':
        return 'text-green-500';
      case 'needs-improvement':
        return 'text-yellow-500';
      case 'poor':
        return 'text-red-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div
      className={cn(
        'fixed bottom-4 right-4 z-50 rounded-lg bg-background/80 p-4 shadow-lg backdrop-blur-sm',
        isVisible ? 'block' : 'hidden'
      )}
    >
      <div className="mb-2 flex items-center justify-between">
        <h3 className="text-sm font-semibold">Performance Monitor</h3>
        <button
          onClick={() => setIsVisible(false)}
          className="text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
      </div>
      <div className="space-y-1">
        {Object.entries(metrics).map(([name, { value, rating }]) => (
          <div key={name} className="flex items-center justify-between text-xs">
            <span className="font-medium">{name}:</span>
            <span className={cn('ml-2', getRatingColor(rating))}>
              {value.toFixed(2)}ms
            </span>
          </div>
        ))}
      </div>
      {Object.keys(metrics).length === 0 && (
        <p className="text-xs text-gray-500">No metrics recorded yet</p>
      )}
    </div>
  );
}; 