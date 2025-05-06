import type { Metric } from 'web-vitals';

/**
 * Performance monitoring utilities for tracking key metrics and errors
 */

interface PerformanceMetric {
  name: string;
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta?: number;
}

interface ErrorReport {
  message: string;
  stack?: string;
  timestamp: number;
  url: string;
  userAgent: string;
}

// Performance thresholds based on Web Vitals
const THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },
  FID: { good: 100, poor: 300 },
  CLS: { good: 0.1, poor: 0.25 },
  TTFB: { good: 800, poor: 1800 },
  FCP: { good: 1800, poor: 3000 },
} as const;

/**
 * Get performance rating based on metric value
 */
const getRating = (metric: string, value: number): 'good' | 'needs-improvement' | 'poor' => {
  const thresholds = THRESHOLDS[metric as keyof typeof THRESHOLDS];
  if (!thresholds) return 'needs-improvement';
  
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.poor) return 'needs-improvement';
  return 'poor';
};

/**
 * Report Web Vitals metrics
 */
export const reportWebVitals = (metric: Metric) => {
  const { name, value, delta } = metric;
  const rating = getRating(name, value);
  
  const metricData: PerformanceMetric = {
    name,
    value,
    rating,
    delta,
  };

  // Send to analytics
  sendToAnalytics(metricData);
};

/**
 * Track page load performance
 */
export const trackPageLoad = () => {
  if (typeof window === 'undefined') return;

  const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
  const paint = performance.getEntriesByType('paint');
  
  const metrics = {
    TTFB: navigation.responseStart - navigation.requestStart,
    FCP: paint.find(entry => entry.name === 'first-contentful-paint')?.startTime,
    DOMContentLoaded: navigation.domContentLoadedEventEnd - navigation.startTime,
    Load: navigation.loadEventEnd - navigation.startTime,
  };

  Object.entries(metrics).forEach(([name, value]) => {
    if (value) {
      const rating = getRating(name, value);
      sendToAnalytics({ name, value, rating });
    }
  });
};

/**
 * Track resource loading performance
 */
export const trackResourceLoading = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'resource') {
        const resourceEntry = entry as PerformanceResourceTiming;
        const duration = resourceEntry.duration;
        
        if (duration > 1000) { // Log slow resources (>1s)
          console.warn(`Slow resource loading: ${resourceEntry.name} (${duration}ms)`);
        }
      }
    });
  });

  observer.observe({ entryTypes: ['resource'] });
};

/**
 * Track JavaScript errors
 */
export const trackErrors = () => {
  if (typeof window === 'undefined') return;

  const reportError = (error: Error | string, stack?: string) => {
    const errorReport: ErrorReport = {
      message: error instanceof Error ? error.message : error,
      stack: error instanceof Error ? error.stack : stack,
      timestamp: Date.now(),
      url: window.location.href,
      userAgent: navigator.userAgent,
    };

    sendToAnalytics(errorReport);
  };

  window.addEventListener('error', (event) => {
    reportError(event.error || event.message);
  });

  window.addEventListener('unhandledrejection', (event) => {
    reportError(event.reason);
  });
};

/**
 * Track user interactions
 */
export const trackUserInteractions = () => {
  if (typeof window === 'undefined') return;

  const observer = new PerformanceObserver((list) => {
    list.getEntries().forEach((entry) => {
      if (entry.entryType === 'interaction') {
        const interactionEntry = entry as PerformanceEventTiming;
        if (interactionEntry.duration > 100) { // Log slow interactions (>100ms)
          console.warn(`Slow interaction: ${interactionEntry.name} (${interactionEntry.duration}ms)`);
        }
      }
    });
  });

  observer.observe({ entryTypes: ['interaction'] });
};

/**
 * Send metrics to analytics
 */
const sendToAnalytics = (data: PerformanceMetric | ErrorReport) => {
  // TODO: Implement your analytics service integration
  console.log('Analytics:', data);
};

/**
 * Initialize performance monitoring
 */
export const initPerformanceMonitoring = () => {
  trackPageLoad();
  trackResourceLoading();
  trackErrors();
  trackUserInteractions();
}; 