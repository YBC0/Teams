import { KeyboardEvent } from 'react';

/**
 * Accessibility utilities for consistent ARIA labels and keyboard navigation
 */

export const ARIA_LABELS = {
  navigation: {
    main: 'Main navigation',
    mobile: 'Mobile navigation menu',
    language: 'Language selector',
    theme: 'Theme toggle',
  },
  buttons: {
    donate: 'Donate to Team SEA',
    menu: 'Toggle navigation menu',
    close: 'Close',
    submit: 'Submit form',
    search: 'Search',
  },
  sections: {
    hero: 'Hero section',
    impact: 'Impact statistics',
    projects: 'Water well projects',
    about: 'About Team SEA',
    contact: 'Contact form',
  },
  forms: {
    email: 'Email address',
    name: 'Full name',
    message: 'Your message',
    phone: 'Phone number',
  },
} as const;

/**
 * Keyboard navigation helpers
 */
export const handleKeyPress = (
  event: KeyboardEvent,
  callback: () => void,
  key: string = 'Enter'
) => {
  if (event.key === key) {
    event.preventDefault();
    callback();
  }
};

export const handleEscapeKey = (event: KeyboardEvent, callback: () => void) => {
  if (event.key === 'Escape') {
    event.preventDefault();
    callback();
  }
};

/**
 * Focus management helpers
 */
export const focusFirstInteractiveElement = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  if (focusableElements.length > 0) {
    (focusableElements[0] as HTMLElement).focus();
  }
};

export const trapFocus = (container: HTMLElement) => {
  const focusableElements = container.querySelectorAll(
    'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
  );
  const firstElement = focusableElements[0] as HTMLElement;
  const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

  return (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === firstElement) {
          event.preventDefault();
          lastElement.focus();
        }
      } else {
        if (document.activeElement === lastElement) {
          event.preventDefault();
          firstElement.focus();
        }
      }
    }
  };
};

/**
 * Screen reader announcements
 */
export const announceToScreenReader = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div');
  announcement.setAttribute('aria-live', priority);
  announcement.setAttribute('aria-atomic', 'true');
  announcement.setAttribute('class', 'sr-only');
  announcement.textContent = message;
  
  document.body.appendChild(announcement);
  setTimeout(() => {
    document.body.removeChild(announcement);
  }, 1000);
};

/**
 * WCAG 2.1 color contrast helpers
 */
export const getContrastRatio = (foreground: string, background: string): number => {
  const getLuminance = (color: string): number => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substr(0, 2), 16);
    const g = parseInt(hex.substr(2, 2), 16);
    const b = parseInt(hex.substr(4, 2), 16);
    
    const [rs, gs, bs] = [r, g, b].map(c => {
      const sRGB = c / 255;
      return sRGB <= 0.03928
        ? sRGB / 12.92
        : Math.pow((sRGB + 0.055) / 1.055, 2.4);
    });
    
    return 0.2126 * rs + 0.7152 * gs + 0.0722 * bs;
  };

  const l1 = getLuminance(foreground);
  const l2 = getLuminance(background);
  const lighter = Math.max(l1, l2);
  const darker = Math.min(l1, l2);
  
  return (lighter + 0.05) / (darker + 0.05);
};

export const meetsWCAGContrast = (
  foreground: string,
  background: string,
  level: 'AA' | 'AAA' = 'AA'
): boolean => {
  const ratio = getContrastRatio(foreground, background);
  return level === 'AA' ? ratio >= 4.5 : ratio >= 7;
}; 