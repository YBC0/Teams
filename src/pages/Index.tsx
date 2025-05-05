
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe, Facebook, Instagram } from "lucide-react";
import { Button } from "@/components/ui/button";

// Language detection with security considerations
const getLanguage = () => {
  // Use a try-catch to handle potential security issues with navigator
  try {
    if (typeof window === 'undefined') return 'en';
    const browserLang = navigator.language.toLowerCase();
    return browserLang.includes('da') ? 'da' : 'en';
  } catch (error) {
    console.error("Error detecting language:", error);
    return 'en'; // Fallback safely
  }
};

const Index = () => {
  const [language, setLanguage] = useState('en');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'da' ? 'en' : 'da');
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

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
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <img 
                src="/lovable-uploads/2d3efebc-e7af-49d3-bd40-507ea90a1926.png" 
                alt="Team SEA Logo" 
                className="h-10 w-auto"
              />
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link-active">{content.nav.home}</Link>
              <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
              <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
              <Link to="/about" className="nav-link">{content.nav.about}</Link>
              <Link to="/journey" className="nav-link">{content.nav.journey}</Link>
              <Link to="/contact" className="nav-link">{content.nav.contact}</Link>
              <button 
                onClick={toggleLanguage}
                className="ml-4 p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
              >
                <Globe className="w-5 h-5" />
              </button>
            </div>
            
            {/* Mobile Navigation Toggle */}
            <div className="md:hidden flex items-center">
              <button 
                onClick={toggleLanguage}
                className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
              >
                <Globe className="w-5 h-5" />
              </button>
              <button
                onClick={toggleMenu}
                className="p-2 rounded-full hover:bg-gray-100 transition-colors"
                aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </nav>
          
          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden py-4 border-t animate-fade-in">
              <div className="flex flex-col space-y-3">
                <Link to="/" className="nav-link-active">{content.nav.home}</Link>
                <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
                <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
                <Link to="/about" className="nav-link">{content.nav.about}</Link>
                <Link to="/journey" className="nav-link">{content.nav.journey}</Link>
                <Link to="/contact" className="nav-link">{content.nav.contact}</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative h-[70vh] min-h-[500px] flex items-center bg-gradient-to-r from-blue-400 to-blue-600 text-white overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/30"></div>
        <div className="container-custom relative z-10">
          <div className="max-w-2xl animate-fade-in">
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

      {/* Footer */}
      <Footer language={language} content={content} />
    </div>
  );
};

// Extract Footer to a separate component for reuse
const Footer = ({ language, content }: { language: string, content: any }) => {
  return (
    <footer className="bg-blue-900 text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Team SEA</h3>
            <div className="mb-4">
              <img 
                src="/lovable-uploads/2d3efebc-e7af-49d3-bd40-507ea90a1926.png" 
                alt="Team SEA Logo" 
                className="h-12 w-auto"
              />
            </div>
            <p className="mb-4 text-blue-100">
              {language === 'da'
                ? 'Sammen gør vi en forskel, én donation ad gangen.'
                : 'Together we make a difference, one donation at a time.'}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'da' ? 'Hurtige links' : 'Quick links'}
            </h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-blue-100 hover:text-white transition-colors">{content.nav.home}</Link></li>
              <li><Link to="/impact" className="text-blue-100 hover:text-white transition-colors">{content.nav.impact}</Link></li>
              <li><Link to="/donate" className="text-blue-100 hover:text-white transition-colors">{content.nav.donate}</Link></li>
              <li><Link to="/about" className="text-blue-100 hover:text-white transition-colors">{content.nav.about}</Link></li>
              <li><Link to="/journey" className="text-blue-100 hover:text-white transition-colors">{content.nav.journey}</Link></li>
              <li><Link to="/contact" className="text-blue-100 hover:text-white transition-colors">{content.nav.contact}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">
              {language === 'da' ? 'Følg os' : 'Follow us'}
            </h3>
            <div className="flex space-x-4">
              <a 
                href="https://facebook.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Facebook" 
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Facebook className="w-6 h-6" />
              </a>
              <a 
                href="https://instagram.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="Instagram" 
                className="text-blue-100 hover:text-white transition-colors"
              >
                <Instagram className="w-6 h-6" />
              </a>
              <a 
                href="https://tiktok.com/" 
                target="_blank" 
                rel="noopener noreferrer" 
                aria-label="TikTok" 
                className="text-blue-100 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Team SEA. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

export default Index;
