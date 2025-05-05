
import React from "react";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useLanguage } from "@/contexts/LanguageContext";

const Impact = () => {
  const { language } = useLanguage();

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
      projectsLink: language === 'da' ? 'Se alle vores projekter' : 'View all our projects',
      impactImageAlt: language === 'da' ? 'Billede af vores aftryk' : 'Image of our impact'
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
      
      {/* Projects Link Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-6">{language === 'da' ? 'Vores Projekter' : 'Our Projects'}</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            {language === 'da' 
              ? 'Se alle vores projekter og læs mere om vores brøndprojekter i detaljer.' 
              : 'View all our projects and read more about our well projects in detail.'}
          </p>
          <Button asChild size="lg">
            <Link to="/projects">{content.page.projectsLink}</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Impact;
