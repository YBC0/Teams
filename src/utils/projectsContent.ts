
/**
 * Returns localized content for the Projects page
 */
export const getProjectsContent = (language: string) => {
  return {
    page: {
      title: language === 'da' ? 'Vores Projekter' : 'Our Projects',
      subtitle: language === 'da' 
        ? 'Her kan du se alle vores projekter og følge fremskridt.' 
        : 'Here you can see all our projects and follow progress.',
      viewMore: language === 'da' ? 'Se flere detaljer' : 'View more details',
      hideDetails: language === 'da' ? 'Skjul detaljer' : 'Hide details',
      photos: language === 'da' ? 'Projektbilleder' : 'Project Photos',
      futureProjects: language === 'da' ? 'Kommende Projekter' : 'Future Projects',
      futureProjectsDesc: language === 'da' 
        ? 'Vi planlægger flere brøndprojekter i fremtiden.' 
        : 'We are planning more well projects in the future.',
      futureProjectsFollow: language === 'da'
        ? 'Følg med her for at se vores kommende projekter og hvordan du kan hjælpe.'
        : 'Check back here to see our upcoming projects and how you can help.',
      noPictures: language === 'da' 
        ? 'Billeder af projektet kommer snart!' 
        : 'Pictures of the project coming soon!',
      additionalPhotos: language === 'da' ? 'Flere billeder' : 'Additional Photos'
    },
    projects: [
      {
        id: 1,
        title: language === 'da' ? 'Brønd i Bangladesh' : 'Water Well in Bangladesh',
        location: 'Bangladesh',
        date: language === 'da' ? 'Maj 2025' : 'May 2025',
        description: language === 'da'
          ? 'Vores første brøndprojekt i Bangladesh giver rent drikkevand til en landsby med over 50 mennesker, der tidligere måtte gå flere kilometer hver dag for at hente vand.'
          : 'Our first well project in Bangladesh provides clean drinking water to a village of over 50 people who previously had to walk several kilometers each day to fetch water.',
        status: language === 'da' ? 'Igangværende' : 'In progress',
        imageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        photos: [
          {
            id: 1,
            src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            alt: language === 'da' ? 'Projektområde i Bangladesh' : 'Project area in Bangladesh'
          },
          {
            id: 2,
            src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
            alt: language === 'da' ? 'Byggestart af brønd' : 'Construction start of well'
          }
        ]
      }
    ]
  };
};
