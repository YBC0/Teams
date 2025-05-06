import { useState, useEffect } from 'react';
import { breakpoints, mediaQueries } from '@/lib/responsive-utils';

type Breakpoint = keyof typeof breakpoints;

export function useResponsive() {
  const [currentBreakpoint, setCurrentBreakpoint] = useState<Breakpoint>('xs');
  const [isMobile, setIsMobile] = useState(true);
  const [isTablet, setIsTablet] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      
      if (width >= parseInt(breakpoints['2xl'])) {
        setCurrentBreakpoint('2xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width >= parseInt(breakpoints.xl)) {
        setCurrentBreakpoint('xl');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width >= parseInt(breakpoints.lg)) {
        setCurrentBreakpoint('lg');
        setIsMobile(false);
        setIsTablet(false);
        setIsDesktop(true);
      } else if (width >= parseInt(breakpoints.md)) {
        setCurrentBreakpoint('md');
        setIsMobile(false);
        setIsTablet(true);
        setIsDesktop(false);
      } else if (width >= parseInt(breakpoints.sm)) {
        setCurrentBreakpoint('sm');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      } else {
        setCurrentBreakpoint('xs');
        setIsMobile(true);
        setIsTablet(false);
        setIsDesktop(false);
      }
    };

    // Initial check
    updateBreakpoint();

    // Add event listener
    window.addEventListener('resize', updateBreakpoint);

    // Cleanup
    return () => window.removeEventListener('resize', updateBreakpoint);
  }, []);

  const isBreakpoint = (breakpoint: Breakpoint) => currentBreakpoint === breakpoint;
  const isBreakpointOrLarger = (breakpoint: Breakpoint) => {
    const breakpointValues = Object.keys(breakpoints) as Breakpoint[];
    const currentIndex = breakpointValues.indexOf(currentBreakpoint);
    const targetIndex = breakpointValues.indexOf(breakpoint);
    return currentIndex >= targetIndex;
  };

  return {
    currentBreakpoint,
    isMobile,
    isTablet,
    isDesktop,
    isBreakpoint,
    isBreakpointOrLarger,
  };
} 