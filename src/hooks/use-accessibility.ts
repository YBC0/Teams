import { useEffect, useRef, useCallback, KeyboardEvent } from 'react';
import { trapFocus, focusFirstInteractiveElement, handleEscapeKey } from '@/lib/accessibility-utils';

interface UseAccessibilityOptions {
  trapFocus?: boolean;
  autoFocus?: boolean;
  onEscape?: () => void;
}

export const useAccessibility = ({
  trapFocus: shouldTrapFocus = false,
  autoFocus = false,
  onEscape,
}: UseAccessibilityOptions = {}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<Element>) => {
      if (shouldTrapFocus && containerRef.current) {
        trapFocus(containerRef.current)(event);
      }
      if (onEscape) {
        handleEscapeKey(event, onEscape);
      }
    },
    [shouldTrapFocus, onEscape]
  );

  useEffect(() => {
    if (autoFocus && containerRef.current) {
      focusFirstInteractiveElement(containerRef.current);
    }
  }, [autoFocus]);

  useEffect(() => {
    if (shouldTrapFocus || onEscape) {
      document.addEventListener('keydown', handleKeyDown as unknown as EventListener);
      return () => {
        document.removeEventListener('keydown', handleKeyDown as unknown as EventListener);
      };
    }
  }, [shouldTrapFocus, onEscape, handleKeyDown]);

  return containerRef;
}; 