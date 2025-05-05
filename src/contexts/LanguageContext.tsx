
import React, { createContext, useState, useContext, useEffect } from 'react';

// Completely revised language detection to ALWAYS default to English
export const getLanguage = () => {
  try {
    // Hard-coded default to ensure English is always used first
    const FORCED_DEFAULT = 'en';
    
    console.log('Language detection started - default is ALWAYS English');
    
    // Get stored preference if available
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('preferredLanguage');
      if (storedPreference) {
        console.log('Found stored language preference:', storedPreference);
        return storedPreference;
      }
    }
    
    // Log detailed detection info but ALWAYS return English
    if (typeof window !== 'undefined') {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browserLang = navigator.language.toLowerCase();
      
      console.log('DEBUG - Detection data (for informational purposes only):', {
        timeZone,
        browserLang,
        navigatorLanguages: navigator.languages,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        defaultLanguage: FORCED_DEFAULT
      });
      
      // IMPORTANT: We're completely bypassing automatic detection now
      // and always defaulting to English on first run
      console.log('IMPORTANT: Bypassing detection - using hard default:', FORCED_DEFAULT);
    }
    
    // ALWAYS return English for new visitors until they manually change it
    return FORCED_DEFAULT;
  } catch (error) {
    console.error("Error in language detection:", error);
    return 'en'; // Failsafe fallback
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
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once on initial load
    if (initialized) return;
    
    // Get the language on first load
    const initialLanguage = getLanguage();
    console.log('Setting initial language (should be en for new visitors):', initialLanguage);
    setLanguage(initialLanguage);
    setInitialized(true);
  }, [initialized]);

  // Log path changes for debugging
  useEffect(() => {
    if (!initialized) return;
    
    console.log('Path changed - current language state:', {
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
