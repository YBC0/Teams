import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced language detection function with debugging and stricter rules
export const getLanguage = () => {
  try {
    if (typeof window === 'undefined') return 'en';
    
    // Force default to English - this is the safest approach
    const defaultLanguage = 'en';
    
    // Get the timezone 
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Strict check for Denmark timezone only
    const isDenmark = timeZone === 'Europe/Copenhagen';
    
    // Strict check for Danish browser language
    const browserLang = navigator.language.toLowerCase();
    const isDanishBrowser = browserLang === 'da' || browserLang === 'da-dk';
    
    // Log the detection values for debugging
    console.log('Language Detection:', {
      timeZone,
      isDenmark,
      browserLang,
      isDanishBrowser
    });
    
    // ONLY use Danish if BOTH in Denmark AND using Danish browser language
    // Otherwise always default to English
    return (isDenmark && isDanishBrowser) ? 'da' : defaultLanguage;
  } catch (error) {
    console.error("Error detecting language:", error);
    return 'en'; // Always safe fallback to English
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Always explicitly default to English initially
  const [language, setLanguage] = useState('en');
  // Track if we've initialized from storage or detection
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run this once
    if (initialized) return;
    
    // Get the stored language from localStorage if available
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    console.log('Initial language state:', { 
      storedLanguage,
      currentLanguage: language
    });
    
    if (storedLanguage) {
      // Use the stored language preference if available
      console.log('Using stored language preference:', storedLanguage);
      setLanguage(storedLanguage);
    } else {
      // Otherwise detect based on browser/location
      const detectedLanguage = getLanguage();
      console.log('Using detected language:', detectedLanguage);
      setLanguage(detectedLanguage);
    }
    
    setInitialized(true);
  }, [initialized]);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'da' ? 'en' : 'da';
      // Save the language preference to localStorage
      localStorage.setItem('preferredLanguage', newLang);
      console.log('Language toggled to:', newLang);
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
