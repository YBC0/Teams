
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

// Language detection
const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.toLowerCase();
  return browserLang.includes('da') ? 'da' : 'en';
};

const Impact = () => {
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
    page: {
      title: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      subtitle: language === 'da' 
        ? 'Se hvad vi allerede har opnået sammen med jeres støtte. Hver donation gør en forskel.'
        : 'See what we've already accomplished with your support. Every donation makes a difference.',
      stats: {
        wells: language === 'da' ? 'Brønde bygget' : 'Wells built',
        people: language === 'da' ? 'Mennesker hjulpet' : 'People helped',
        villages: language === 'da' ? 'Landsbyer nået' : 'Villages reached',
        donors: language === 'da' ? 'Donorer' : 'Donors'
      },
      projects: {
        title: language === 'da' ? 'Vores projekter' : 'Our projects',
        description: language === 'da' 
          ? 'Her er nogle af de brønde og projekter, som vi har gennemført takket være jeres generøse donationer.'
          : 'Here are some of the wells and projects we have completed thanks to your generous donations.'
      },
      cta: language === 'da' ? 'Vær med til at gøre en forskel' : 'Help make a difference'
    }
  };

  // Project data
  const projects = [
    {
      id: 1,
      title: language === 'da' ? 'Brønd i Moyo landsby' : 'Well in Moyo Village',
      description: language === 'da' 
        ? 'Denne brønd giver rent drikkevand til over 500 mennesker i landsbyen.'
        : 'This well provides clean drinking water to over 500 people in the village.',
      imageSrc: 'https://images.unsplash.com/photo-1595415340084-04928abec6c5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 2,
      title: language === 'da' ? 'Brønd i Kamuli distriktet' : 'Well in Kamuli District',
      description: language === 'da' 
        ? 'Dette projekt har reduceret vandrelaterede sygdomme med 60% i området.'
        : 'This project has reduced water-related diseases by 60% in the area.',
      imageSrc: 'https://images.unsplash.com/photo-1548576969-5a737bb4d064?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    },
    {
      id: 3,
      title: language === 'da' ? 'Vandforsyning til skole' : 'Water Supply for School',
      description: language === 'da' 
        ? '250 skolebørn har nu adgang til rent drikkevand under skoledagen.'
        : '250 school children now have access to clean drinking water during the school day.',
      imageSrc: 'https://images.unsplash.com/photo-1519227355453-8f982e425321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              <span className="text-xl font-bold text-primary">Team SEA</span>
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className="nav-link">{content.nav.home}</Link>
              <Link to="/impact" className="nav-link-active">{content.nav.impact}</Link>
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
                <Link to="/" className="nav-link">{content.nav.home}</Link>
                <Link to="/impact" className="nav-link-active">{content.nav.impact}</Link>
                <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
                <Link to="/about" className="nav-link">{content.nav.about}</Link>
                <Link to="/journey" className="nav-link">{content.nav.journey}</Link>
                <Link to="/contact" className="nav-link">{content.nav.contact}</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Page Header */}
      <section className="pt-16 pb-12 bg-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
            <p className="text-xl">{content.page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-xl shadow-sm text-center animate-slide-up">
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">12</p>
              <p className="text-gray-600">{content.page.stats.wells}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">5,000+</p>
              <p className="text-gray-600">{content.page.stats.people}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">8</p>
              <p className="text-gray-600">{content.page.stats.villages}</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-sm text-center animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <p className="text-4xl md:text-5xl font-bold text-primary mb-2">250+</p>
              <p className="text-gray-600">{content.page.stats.donors}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{content.page.projects.title}</h2>
            <p>{content.page.projects.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-xl overflow-hidden shadow-md animate-slide-up">
                <div className="h-56 overflow-hidden">
                  <img 
                    src={project.imageSrc} 
                    alt={project.title} 
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-600">{project.description}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-16 text-center">
            <h3 className="text-2xl font-semibold mb-6">{content.page.cta}</h3>
            <Button asChild size="lg">
              <Link to="/donate">{language === 'da' ? 'Donér nu' : 'Donate now'}</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Success Stories Section */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{language === 'da' ? 'Succeshistorier' : 'Success Stories'}</h2>
          
          <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-hidden">
            <div className="md:flex">
              <div className="md:flex-shrink-0">
                <img 
                  className="h-48 w-full md:h-full md:w-80 object-cover" 
                  src="https://images.unsplash.com/photo-1519181245277-cffeb31da2e3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                  alt={language === 'da' ? 'Landsbyboere med rent vand' : 'Villagers with clean water'}
                />
              </div>
              <div className="p-8">
                <div className="uppercase tracking-wide text-sm text-primary font-semibold">
                  {language === 'da' ? 'Moyo Landsby' : 'Moyo Village'}
                </div>
                <h3 className="mt-1 text-xl font-semibold">
                  {language === 'da' ? 'Fra sygdom til sundhed' : 'From Illness to Health'}
                </h3>
                <p className="mt-2 text-gray-600">
                  {language === 'da' 
                    ? 'Før Team SEA byggede en brønd i vores landsby, måtte vores børn drikke forurenet vand fra floden. Mange blev syge, og nogle døde endda. Nu har vi rent drikkevand, og vores børn er sundere end nogensinde.'
                    : 'Before Team SEA built a well in our village, our children had to drink contaminated water from the river. Many got sick, and some even died. Now we have clean drinking water, and our children are healthier than ever.'}
                </p>
                <p className="mt-4 italic text-gray-600">
                  - {language === 'da' ? 'Sarah, landsbyboer' : 'Sarah, villager'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12 mt-auto">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">Team SEA</h3>
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
                <a href="https://facebook.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                  </svg>
                </a>
                <a href="https://instagram.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                  </svg>
                </a>
                <a href="https://tiktok.com/" target="_blank" rel="noopener noreferrer" className="text-blue-100 hover:text-white transition-colors">
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
    </div>
  );
};

export default Impact;
