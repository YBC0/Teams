
import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced language detection function that is stricter about defaulting to English
export const getLanguage = () => {
  try {
    if (typeof window === 'undefined') return 'en';
    
    // Get the timezone 
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // Strict check for Denmark timezone only
    const isDenmark = timeZone === 'Europe/Copenhagen';
    
    // Strict check for Danish browser language
    const browserLang = navigator.language.toLowerCase();
    const isDanishBrowser = browserLang === 'da' || browserLang === 'da-dk';
    
    // Default to English for all non-Danish locations and languages
    // Only use Danish if BOTH in Denmark AND using Danish browser language
    return (isDenmark && isDanishBrowser) ? 'da' : 'en';
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
  // Default to English initially
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    // Get the stored language from localStorage if available
    const storedLanguage = localStorage.getItem('preferredLanguage');
    
    if (storedLanguage) {
      // Use the stored language preference if available
      setLanguage(storedLanguage);
    } else {
      // Otherwise detect based on browser/location
      setLanguage(getLanguage());
    }
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'da' ? 'en' : 'da';
      // Save the language preference to localStorage
      localStorage.setItem('preferredLanguage', newLang);
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
