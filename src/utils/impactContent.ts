
/**
 * Returns localized content for the Impact page
 */
export const getImpactContent = (language: string) => {
  return {
    page: {
      title: language === 'da' ? 'Vores Aftryk' : 'Our Impact',
      subtitle: language === 'da' 
        ? 'Gennem fælles indsats gør vi en reel forskel for mennesker med begrænset adgang til rent drikkevand.'
        : 'Through collective efforts, we are making a real difference for people with limited access to clean drinking water.',
      stats: {
        wellsBuilt: language === 'da' ? 'Brønd bygget' : 'Well built',
        peopleHelped: language === 'da' ? 'Mennesker hjulpet' : 'People helped',
        wellsBuiltValue: '1',
        peopleHelpedValue: '50+'
      },
      projectsLink: language === 'da' ? 'Se alle vores projekter' : 'View all our projects',
      impactImageAlt: language === 'da' ? 'Billede af vores aftryk' : 'Image of our impact'
    }
  };
};
