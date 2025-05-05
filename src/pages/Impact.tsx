
import React, { useEffect, useState } from "react";
import { Layout, getLanguage } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Impact = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  // Text content based on language with updated statistics
  const content = {
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
      project: {
        title: language === 'da' ? 'Vores Projekt' : 'Our Project',
        bangladesh: language === 'da' ? 'Brønd i Bangladesh' : 'Well in Bangladesh',
        description: language === 'da'
          ? 'Vores første brøndprojekt i Bangladesh giver rent drikkevand til en landsby med over 50 mennesker, der tidligere måtte gå flere kilometer hver dag for at hente vand.'
          : 'Our first well project in Bangladesh provides clean drinking water to a village of over 50 people who previously had to walk several kilometers each day to fetch water.'
      }
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-12 bg-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
            <p className="text-xl">{content.page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-blue-50 p-8 rounded-xl text-center">
                <div className="text-5xl font-bold text-primary mb-2">{content.page.stats.wellsBuiltValue}</div>
                <p className="text-xl text-gray-600">{content.page.stats.wellsBuilt}</p>
              </div>
              
              <div className="bg-blue-50 p-8 rounded-xl text-center">
                <div className="text-5xl font-bold text-primary mb-2">{content.page.stats.peopleHelpedValue}</div>
                <p className="text-xl text-gray-600">{content.page.stats.peopleHelped}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{content.page.project.title}</h2>
          
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img 
                src="https://images.unsplash.com/photo-1584686428777-a0ba9bd0e68e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Brøndprojekt i Bangladesh' : 'Well project in Bangladesh'} 
                className="w-full h-80 object-cover"
              />
            </div>
            
            <div>
              <h3 className="text-2xl font-semibold mb-4">{content.page.project.bangladesh}</h3>
              <p className="mb-6">{content.page.project.description}</p>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3">{language === 'da' ? 'Rent drikkevand til over 50 mennesker' : 'Clean drinking water for over 50 people'}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3">{language === 'da' ? 'Reduceret vandrelaterede sygdomme' : 'Reduced water-related illnesses'}</span>
                </div>
                
                <div className="flex items-center">
                  <div className="bg-blue-100 rounded-full w-10 h-10 flex items-center justify-center text-primary">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="ml-3">{language === 'da' ? 'Sparet tid på vandindsamling' : 'Saved time on water collection'}</span>
                </div>
              </div>
              
              <Button className="mt-8" asChild>
                <a href="/donate">{language === 'da' ? 'Støt vores næste projekt' : 'Support our next project'}</a>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
