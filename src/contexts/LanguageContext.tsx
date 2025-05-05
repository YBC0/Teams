
import React, { createContext, useState, useContext, useEffect } from 'react';

/**
 * Language detection function that prioritizes Danish for users in Denmark
 * or with Danish browser settings, otherwise defaults to English
 */
export const getLanguage = (): string => {
  try {
    // Check for stored preference first
    if (typeof window !== 'undefined') {
      const storedPreference = localStorage.getItem('preferredLanguage');
      if (storedPreference) {
        console.log('Using stored language preference:', storedPreference);
        return storedPreference;
      }
    }
    
    // Detect based on browser and timezone
    if (typeof window !== 'undefined') {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const browserLang = navigator.language.toLowerCase();
      
      const isDenmark = timeZone.includes('Copenhagen');
      const isDanishBrowser = browserLang.startsWith('da');
      
      console.log('Detected timezone:', timeZone);
      console.log('Detected browser language:', browserLang);
      console.log('Is Denmark timezone:', isDenmark);
      console.log('Is Danish browser:', isDanishBrowser);
      
      // Use Danish if any Danish criteria are met
      if (isDenmark || isDanishBrowser) {
        console.log('Setting language to Danish based on location/browser');
        return 'da';
      }
    }
    
    // Default to English for all other cases
    console.log('Defaulting to English language');
    return 'en';
  } catch (error) {
    console.error('Error in language detection:', error);
    return 'en'; // Failsafe fallback to English
  }
};

type LanguageContextType = {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

/**
 * Language provider component that manages the app's language state
 * and provides language switching functionality
 */
export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en'); // Start with English until detection completes
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    // Only run once on initial load
    if (initialized) return;
    
    // Get the language on first load
    const initialLanguage = getLanguage();
    console.log('Language initialized to:', initialLanguage);
    setLanguage(initialLanguage);
    setInitialized(true);
  }, [initialized]);

  // Toggle between English and Danish
  const toggleLanguage = () => {
    setLanguage(prev => {
      const newLang = prev === 'da' ? 'en' : 'da';
      console.log('Language manually toggled to:', newLang);
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

/**
 * Hook to access the language context
 */
export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
