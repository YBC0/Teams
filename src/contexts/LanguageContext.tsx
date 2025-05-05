
import React, { createContext, useState, useContext, useEffect } from 'react';

// Improved language detection logic that prioritizes Danish for Danish users
export const getLanguage = () => {
  try {
    console.log('Language detection started');
    
    // Get stored preference if available
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('preferredLanguage');
      if (storedPreference) {
        console.log('Found stored language preference:', storedPreference);
        return storedPreference;
      }
    }
    
    // Detect based on browser and timezone
    if (typeof window !== 'undefined') {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browserLang = navigator.language.toLowerCase();
      
      const isDenmark = timeZone.includes('Copenhagen');
      const isDanishBrowser = browserLang.startsWith('da');
      
      // Log detailed detection info for debugging
      console.log('Language Detection (Detailed):', {
        timeZone,
        isDenmark,
        browserLang,
        isDanishBrowser,
        navigatorLanguages: navigator.languages,
        userAgent: navigator.userAgent,
        platform: navigator.platform
      });
      
      // Use Danish if any Danish criteria are met (browser, timezone)
      if (isDenmark || isDanishBrowser) {
        console.log('Danish criteria met - setting language to Danish');
        return 'da';
      }
      
      console.log('No Danish criteria met - using English default');
    }
    
    // Default to English for all other cases
    console.log('Using detected language (final decision): en');
    return 'en';
  } catch (error) {
    console.error("Error in language detection:", error);
    return 'en'; // Failsafe fallback to English
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Start with English until detection completes
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once on initial load
    if (initialized) return;
    
    // Initial state logging for debugging
    console.log('Initial language state (detailed):', {
      storedLanguage: localStorage.getItem('preferredLanguage'),
      currentLanguage: language,
      initialized,
      pathname: window.location.pathname
    });
    
    // Get the language on first load
    const initialLanguage = getLanguage();
    console.log('Using detected language (final decision):', initialLanguage);
    setLanguage(initialLanguage);
    setInitialized(true);
  }, [initialized]);

  // Log path changes for debugging
  useEffect(() => {
    if (!initialized) return;
    
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
