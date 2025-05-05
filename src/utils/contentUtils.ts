
/**
 * Type definition for content structure
 */
export type ContentType = {
  nav: {
    home: string;
    impact: string;
    projects: string;
    donate: string;
    about: string;
    journey: string;
    contact: string;
  };
  [key: string]: any;
};

/**
 * Generates content based on the selected language
 * @param language The current language code ('en' or 'da')
 */
export const generateContent = (language: string): ContentType => {
  return {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      projects: language === 'da' ? 'Projekter' : 'Projects',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Min rejse' : 'My Journey',
      contact: language === 'da' ? 'Kontakt' : 'Contact'
    }
  };
};
