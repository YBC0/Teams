
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";

const Index = () => {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    // Add animation delay for elements
    setIsLoaded(true);
  }, []);

  // Text content based on language
  const content = {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Vores rejse' : 'Our Journey',
      contact: language === 'da' ? 'Kontakt' : 'Contact'
    },
    hero: {
      slogan: 'Together we make a difference',
      intro: language === 'da' 
        ? 'Team SEA er en dansk forening, der hjælper mennesker i nød. Vi bygger brønde og skaber håb – én donation ad gangen.' 
        : 'Team SEA is a Danish non-profit helping people in need. We build wells and bring hope – one donation at a time.'
    },
    cta: {
      learnMore: language === 'da' ? 'Læs mere' : 'Learn more',
      donate: language === 'da' ? 'Doner nu' : 'Donate now'
    },
    impact: {
      title: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      description: language === 'da' 
        ? 'Se hvad vi allerede har opnået sammen med jeres støtte. Hver donation gør en forskel.' 
        : "See what we've already accomplished with your support. Every donation makes a difference.",
      wellsBuilt: language === 'da' ? 'Brønd bygget' : 'Well built',
      peopleHelped: language === 'da' ? 'Mennesker hjulpet' : 'People helped',
      moreAboutWork: language === 'da' ? 'Se mere om vores arbejde' : 'See more about our work'
    },
    donate: {
      title: language === 'da' ? 'Doner' : 'Donate',
      description: language === 'da'
        ? "Donér via MobilePay. Husk at skrive dit ønskede navn i beskedfeltet – eller skriv 'Anonym'."
        : "Donate via MobilePay. Please write your preferred name in the message field – or write 'Anonymous'.",
      button: language === 'da' ? 'Gå til donation' : 'Go to donation'
    }
  };
  
  return (
    <Layout>
      {/* Hero Section with Ocean Background */}
      <section 
        className="relative h-[85vh] md:h-[80vh] min-h-[550px] flex items-start text-white overflow-hidden bg-cover bg-center bg-fixed"
        style={{
          backgroundImage: isMobile 
            ? `url('/lovable-uploads/48588222-8859-40f4-bc67-cfc3a165d9ca.png')` 
            : `url('/lovable-uploads/f450b11f-3c8d-4822-a76a-7015ab617dde.png')`
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/20"></div>
        <div className="container-custom relative z-10 flex flex-col justify-between h-full">
          <div className="mt-6">
            {/* Logo position if needed */}
          </div>
          
          <div className={cn(
            "max-w-2xl pb-10 mt-auto transition-all duration-1000 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 drop-shadow-md">
              {content.hero.slogan}
            </h1>
            <p className="text-xl md:text-2xl drop-shadow-md">{content.hero.intro}</p>
          </div>
          
          {/* Buttons positioned at the bottom middle */}
          <div className={cn(
            "w-full flex justify-center mb-10 transition-all duration-1000 delay-300 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-6 py-6 hover:scale-105 transition-transform">
                <Link to="/impact">{content.cta.learnMore}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-base px-6 py-6 border-2 hover:scale-105 transition-transform"
              >
                <Link to="/donate">{content.cta.donate}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Preview Section */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-gray-50 to-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="flex flex-col justify-center animate-slide-up">
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">{content.impact.title}</h2>
              <p className="mb-8 text-lg text-gray-700">{content.impact.description}</p>
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">1</p>
                    <p className="text-gray-600">{content.impact.wellsBuilt}</p>
                  </div>
                  <div className="bg-white p-6 md:p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow border border-gray-100">
                    <p className="text-4xl md:text-5xl font-bold text-primary mb-2">50+</p>
                    <p className="text-gray-600">{content.impact.peopleHelped}</p>
                  </div>
                </div>
              </div>
              <Button asChild size="lg" className="w-full sm:w-auto text-base">
                <Link to="/impact">{content.impact.moreAboutWork}</Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 animate-slide-up">
              <img 
                alt={language === 'da' ? 'Brøndprojekt i Bangladesh' : 'Well project in Bangladesh'} 
                className="w-full h-full object-cover"
                loading="lazy"
                src="/lovable-uploads/35dac9b3-780a-4bc3-b3bf-a8546566d8a6.png" 
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donate Preview Section */}
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg transform hover:scale-[1.02] transition-transform duration-300 animate-slide-up order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Donér til Team SEA' : 'Donate to Team SEA'} 
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
            <div className="flex flex-col justify-center animate-slide-up order-1 md:order-2">
              <h2 className="section-title text-3xl md:text-4xl lg:text-5xl">{content.donate.title}</h2>
              <p className="mb-8 text-lg text-gray-700">{content.donate.description}</p>
              <Button asChild size="lg" className="w-full sm:w-auto text-base">
                <Link to="/donate">{content.donate.button}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
