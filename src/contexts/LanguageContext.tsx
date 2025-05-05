import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced language detection function that better considers timezone and browser language
export const getLanguage = () => {
  try {
    if (typeof window === 'undefined') return 'en';
    
    // Get the timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    
    // More specific check for Denmark timezone
    const isDenmark = timeZone === 'Europe/Copenhagen';
    
    // Check browser language with better specificity
    const browserLang = navigator.language.toLowerCase();
    const isDanishBrowser = browserLang === 'da' || browserLang === 'da-dk';
    
    // Only use Danish if explicitly in Denmark or using Danish as primary language
    return (isDenmark || isDanishBrowser) ? 'da' : 'en';
  } catch (error) {
    console.error("Error detecting language:", error);
    return 'en'; // Fallback safely
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
