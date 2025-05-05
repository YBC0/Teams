
import React, { createContext, useState, useContext, useEffect } from 'react';

// Enhanced language detection function that considers both browser language and country
export const getLanguage = () => {
  try {
    if (typeof window === 'undefined') return 'en';
    
    // First check if we can determine the country via timezone
    const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const isDenmark = timeZone.includes('Copenhagen');
    
    // Then check browser language
    const browserLang = navigator.language.toLowerCase();
    const isDanishBrowser = browserLang.includes('da');
    
    // If either condition is true, use Danish
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
    setLanguage(getLanguage());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'da' ? 'en' : 'da');
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
