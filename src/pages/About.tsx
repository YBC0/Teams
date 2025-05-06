import React from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero } from "@/components/PageHero";

const About = () => {
  const { language } = useLanguage();

  // Text content based on language
  const content = {
    title: language === 'da' ? 'Om os' : 'About us',
    description: language === 'da'
      ? 'Vi er et hold af frivillige, der arbejder for at gøre en forskel. Team SEA blev stiftet ud fra en passion for at hjælpe og inspirere.'
      : "We're a team of volunteers working to make a difference. Team SEA was born from a passion to help and inspire.",
    page: {
      mission: {
        title: language === 'da' ? 'Vores mission' : 'Our mission',
        description: language === 'da'
          ? 'At yde humanitær støtte til mennesker i nød. Vi tror på, at adgang til grundlæggende ressourcer er en menneskeret, og vi arbejder dedikeret for at sikre, at flere mennesker kan få denne ret opfyldt.'
          : 'To provide humanitarian aid to people in need. We believe that access to basic resources is a human right, and we work dedicatedly to ensure that more people can have this right fulfilled.'
      },
      values: {
        title: language === 'da' ? 'Vores værdier' : 'Our values',
        transparency: language === 'da' ? 'Gennemsigtighed' : 'Transparency',
        transparencyDesc: language === 'da'
          ? 'Vi er åbne om, hvordan donationerne bruges, og holder vores støtter informerede om projekter.'
          : 'We are open about how donations are used and keep our supporters informed about projects.',
        community: language === 'da' ? 'Fællesskab' : 'Community',
        communityDesc: language === 'da'
          ? 'Vi tror på at samarbejde og bygge bro mellem forskellige kulturer og samfund.'
          : 'We believe in collaboration and building bridges between different cultures and communities.',
        sustainability: language === 'da' ? 'Bæredygtighed' : 'Sustainability',
        sustainabilityDesc: language === 'da'
          ? 'Vi fokuserer på langsigtede løsninger, der kan fortsætte med at gavne lokalsamfund i mange år.'
          : 'We focus on long-term solutions that can continue to benefit local communities for many years.'
      }
    }
  };

  return (
    <Layout>
      <PageHero title={content.title} description={content.description} />

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Team SEAs mission' : "Team SEA's mission"} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="animate-slide-up">
              <h2 className="section-title">{content.page.mission.title}</h2>
              <p className="text-lg">{content.page.mission.description}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{content.page.values.title}</h2>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 shadow-md text-center animate-slide-up">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.page.values.transparency}</h3>
              <p className="text-gray-600">{content.page.values.transparencyDesc}</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 shadow-md text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.page.values.community}</h3>
              <p className="text-gray-600">{content.page.values.communityDesc}</p>
            </div>
            
            <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 shadow-md text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.page.values.sustainability}</h3>
              <p className="text-gray-600">{content.page.values.sustainabilityDesc}</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
