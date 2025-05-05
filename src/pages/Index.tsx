import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { getLanguage, generateContent } from "@/components/Layout";
import Logo from "@/components/Logo";

const Index = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  // Text content based on language
  const content = {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Min rejse' : 'My Journey',
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
    }
  };

  return (
    <Layout>
      {/* Hero Section with Ocean Background */}
      <section 
        className="relative h-[70vh] min-h-[500px] flex items-center text-white overflow-hidden bg-cover bg-center"
        style={{ backgroundImage: `url('/lovable-uploads/f450b11f-3c8d-4822-a76a-7015ab617dde.png')` }}
      >
        <div className="absolute inset-0 bg-blue-900/20"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl animate-fade-in">
            <div className="mb-6">
              <Logo variant="hero" size="large" className="h-20 w-auto" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.hero.slogan}</h1>
            <p className="text-xl mb-8">{content.hero.intro}</p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link to="/impact" className="btn-primary">{content.cta.learnMore}</Link>
              </Button>
              <Button asChild variant="outline" className="bg-white text-primary hover:bg-gray-100">
                <Link to="/donate">{content.cta.donate}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Preview Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="flex flex-col justify-center animate-slide-up">
              <h2 className="section-title">{content.impact.title}</h2>
              <p className="mb-6">{content.impact.description}</p>
              <div className="mb-8">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-4xl font-bold text-primary mb-1">1</p>
                    <p className="text-gray-600">{content.impact.wellsBuilt}</p>
                  </div>
                  <div className="bg-white p-6 rounded-xl shadow-sm">
                    <p className="text-4xl font-bold text-primary mb-1">50+</p>
                    <p className="text-gray-600">{content.impact.peopleHelped}</p>
                  </div>
                </div>
              </div>
              <Button asChild>
                <Link to="/impact">{content.impact.moreAboutWork}</Link>
              </Button>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1592388748465-8c4dca8dd760?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Brøndprojekt i Bangladesh' : 'Well project in Bangladesh'} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Donate Preview Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1532629345422-7515f3d16bb6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Donér til Team SEA' : 'Donate to Team SEA'} 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col justify-center animate-slide-up order-1 md:order-2">
              <h2 className="section-title">{language === 'da' ? 'Doner' : 'Donate'}</h2>
              <p className="mb-6">
                {language === 'da'
                  ? "Donér via MobilePay. Husk at skrive dit ønskede navn i beskedfeltet – eller skriv 'Anonym'."
                  : "Donate via MobilePay. Please write your preferred name in the message field – or write 'Anonymous'."}
              </p>
              <Button asChild>
                <Link to="/donate">{language === 'da' ? 'Gå til donation' : 'Go to donation'}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
