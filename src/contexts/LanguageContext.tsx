import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced language detection function with debugging and strict English default
export const getLanguage = () => {
  try {
    // ALWAYS default to English in all cases
    const forcedDefaultLanguage = 'en';
    
    if (typeof window === 'undefined') return forcedDefaultLanguage;
    
    // Get the timezone 
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Strict check for Denmark timezone only
    const isDenmark = timeZone === 'Europe/Copenhagen';
    
    // Strict check for Danish browser language
    const browserLang = navigator.language.toLowerCase();
    const isDanishBrowser = browserLang === 'da' || browserLang === 'da-dk';
    
    // Log the detection values for extensive debugging
    console.log('Language Detection (Detailed):', {
      timeZone,
      isDenmark,
      browserLang,
      isDanishBrowser,
      navigatorLanguages: navigator.languages,
      userAgent: navigator.userAgent,
      platform: navigator.platform
    });
    
    // This is VERY strict - ONLY use Danish if BOTH conditions are met:
    // 1. Must be physically in Denmark (Copenhagen timezone)
    // 2. Must have Danish browser language
    // Otherwise ALWAYS default to English no matter what
    if (isDenmark && isDanishBrowser) {
      console.log('Danish criteria met - setting language to Danish');
      return 'da';
    }
    
    // Log the default decision
    console.log('Default to English - Danish criteria NOT met');
    return forcedDefaultLanguage;
  } catch (error) {
    console.error("Error in language detection:", error);
    return 'en'; // Always fallback to English on any error
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // ALWAYS explicitly default to English initially
  const [language, setLanguage] = useState('en');
  // Track if we've initialized from storage or detection
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run this once
    if (initialized) return;
    
    // Get the stored language from localStorage if available
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    console.log('Initial language state (detailed):', { 
      storedLanguage,
      currentLanguage: language,
      initialized,
      pathname: window.location.pathname
    });
    
    if (storedLanguage) {
      // Use the stored language preference if available
      console.log('Using stored language preference:', storedLanguage);
      setLanguage(storedLanguage);
    } else {
      // Otherwise detect based on browser/location with HARD default to English
      const detectedLanguage = getLanguage();
      console.log('Using detected language (final decision):', detectedLanguage);
      setLanguage(detectedLanguage);
    }
    
    setInitialized(true);
  }, [initialized]);

  // Let's also handle path changes to ensure language is properly applied on navigation
  useEffect(() => {
    if (!initialized) return;
    
    // Just log the current state whenever path changes
    console.log('Path changed language check:', {
      currentLanguage: language,
      pathname: window.location.pathname
    });
  }, [initialized, language, window.location.pathname]);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'da' ? 'en' : 'da';
      // Save the language preference to localStorage
      localStorage.setItem('preferredLanguage', newLang);
      console.log('Language manually toggled to:', newLang);
      return newLang;
    });
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
