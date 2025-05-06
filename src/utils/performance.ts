import { APP_CONFIG } from '@/constants';

/**
 * Debounce function to limit the rate at which a function can fire
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait = APP_CONFIG.performance.debounceTime
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function to limit the rate at which a function can fire
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit = APP_CONFIG.performance.throttleTime
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  let lastResult: ReturnType<T>;

  return function executedFunction(...args: Parameters<T>): void {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Lazy load images when they enter the viewport
 */
export function lazyLoadImages() {
  const images = document.querySelectorAll('img[data-src]');
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        const src = img.getAttribute('data-src');
        if (src) {
          img.src = src;
          img.removeAttribute('data-src');
        }
        observer.unobserve(img);
      }
    });
  }, {
    rootMargin: `${APP_CONFIG.performance.lazyLoadThreshold}px`,
  });

  images.forEach((img) => imageObserver.observe(img));
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  const resources = [
    { url: '/images/logo.svg', as: 'image' },
    { url: '/fonts/inter-var.woff2', as: 'font', crossOrigin: 'anonymous' },
  ];

  resources.forEach(({ url, as, crossOrigin }) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.href = url;
    link.as = as;
    if (crossOrigin) {
      link.crossOrigin = crossOrigin;
    }
    document.head.appendChild(link);
  });
}

/**
 * Measure and log performance metrics
 */
export function measurePerformance() {
  if (typeof window !== 'undefined' && 'performance' in window) {
    const metrics = {
      fcp: 0, // First Contentful Paint
      lcp: 0, // Largest Contentful Paint
      fid: 0, // First Input Delay
      cls: 0, // Cumulative Layout Shift
    };

    // First Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      metrics.fcp = entries[entries.length - 1].startTime;
      console.log('FCP:', metrics.fcp);
    }).observe({ entryTypes: ['paint'] });

    // Largest Contentful Paint
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      metrics.lcp = entries[entries.length - 1].startTime;
      console.log('LCP:', metrics.lcp);
    }).observe({ entryTypes: ['largest-contentful-paint'] });

    // First Input Delay
    new PerformanceObserver((entryList) => {
      const entries = entryList.getEntries();
      const firstInput = entries[0] as PerformanceEventTiming;
      metrics.fid = firstInput.processingStart - firstInput.startTime;
      console.log('FID:', metrics.fid);
    }).observe({ entryTypes: ['first-input'] });

    // Cumulative Layout Shift
    new PerformanceObserver((entryList) => {
      let cls = 0;
      for (const entry of entryList.getEntries()) {
        const layoutShift = entry as LayoutShift;
        if (!layoutShift.hadRecentInput) {
          cls += layoutShift.value;
        }
      }
      metrics.cls = cls;
      console.log('CLS:', metrics.cls);
    }).observe({ entryTypes: ['layout-shift'] });
  }
}

/**
 * Initialize performance monitoring
 */
export function initPerformanceMonitoring() {
  if (process.env.NODE_ENV === 'production') {
    measurePerformance();
    preloadCriticalResources();
    window.addEventListener('load', lazyLoadImages);
  }
} 