export const APP_CONFIG = {
  name: 'Sea Hope',
  description: {
    da: 'Hjælp os med at bringe rent vand til lokalsamfund i udviklingslande',
    en: 'Help us bring clean water to communities in developing countries'
  },
  version: '1.0.0',
  defaultLanguage: 'da' as const,
  supportedLanguages: ['da', 'en'] as const,
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  donation: {
    minAmount: 10,
    defaultCurrency: 'DKK',
    supportedCurrencies: ['DKK', 'EUR', 'USD'] as const,
    suggestedAmounts: [25, 50, 100, 250, 500] as const,
  },
  pagination: {
    defaultPageSize: 10,
    maxPageSize: 100,
  },
  cache: {
    defaultTTL: 5 * 60 * 1000, // 5 minutes
    maxTTL: 24 * 60 * 60 * 1000, // 24 hours
  },
  performance: {
    lazyLoadThreshold: 100, // pixels from viewport
    debounceTime: 300, // milliseconds
    throttleTime: 1000, // milliseconds
  },
  security: {
    maxLoginAttempts: 5,
    lockoutDuration: 15 * 60 * 1000, // 15 minutes
    passwordMinLength: 8,
    sessionTimeout: 30 * 60 * 1000, // 30 minutes
  },
  analytics: {
    enabled: process.env.NODE_ENV === 'production',
    sampleRate: 1.0, // 100% of users
  },
} as const;

export const ROUTES = {
  home: '/',
  about: '/about',
  impact: '/impact',
  projects: '/projects',
  donate: '/donate',
  journey: '/journey',
  contact: '/contact',
  notFound: '*',
} as const;

export const BREAKPOINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

export const ANIMATION = {
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    linear: 'linear',
    in: 'cubic-bezier(0.4, 0, 1, 1)',
    out: 'cubic-bezier(0, 0, 0.2, 1)',
    inOut: 'cubic-bezier(0.4, 0, 0.2, 1)',
  },
} as const;

export const ERROR_MESSAGES = {
  general: {
    da: 'Der opstod en fejl. Prøv igen senere.',
    en: 'An error occurred. Please try again later.',
  },
  network: {
    da: 'Netværksfejl. Kontroller din internetforbindelse.',
    en: 'Network error. Please check your internet connection.',
  },
  validation: {
    da: 'Ugyldig input. Kontroller venligst dine oplysninger.',
    en: 'Invalid input. Please check your information.',
  },
  auth: {
    da: 'Du skal være logget ind for at fortsætte.',
    en: 'You must be logged in to continue.',
  },
} as const; 