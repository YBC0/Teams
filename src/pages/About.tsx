
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";

// Language detection
const getLanguage = () => {
  if (typeof window === 'undefined') return 'en';
  const browserLang = navigator.language.toLowerCase();
  return browserLang.includes('da') ? 'da' : 'en';
};

const About = () => {
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
      title: language === 'da' ? 'Om os' : 'About us',
      subtitle: language === 'da' 
        ? 'Vi er et hold af frivillige, der arbejder for at gøre en forskel. Team SEA blev stiftet ud fra en passion for at hjælpe og inspirere.'
        : 'We're a team of volunteers working to make a difference. Team SEA was born from a passion to help and inspire.',
      mission: {
        title: language === 'da' ? 'Vores mission' : 'Our mission',
        description: language === 'da'
          ? 'At bringe rent drikkevand til mennesker i nød. Vi tror på, at adgang til rent vand er en menneskeret, og vi arbejder dedikeret for at sikre, at flere mennesker kan få denne ret opfyldt.'
          : 'To bring clean drinking water to people in need. We believe that access to clean water is a human right, and we work dedicatedly to ensure that more people can have this right fulfilled.'
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
      },
      team: {
        title: language === 'da' ? 'Mød holdet' : 'Meet the team',
        description: language === 'da'
          ? 'Bag Team SEA står en gruppe af passionerede frivillige, der dedikerer deres tid og ekspertise til vores mission.'
          : 'Behind Team SEA is a group of passionate volunteers who dedicate their time and expertise to our mission.'
      }
    }
  };

  // Team members data
  const teamMembers = [
    {
      name: language === 'da' ? 'Anders Jensen' : 'Anders Jensen',
      role: language === 'da' ? 'Stifter & Leder' : 'Founder & Leader',
      bio: language === 'da' 
        ? 'Startede Team SEA efter en rejse til Afrika, hvor han så behovet for rent drikkevand i landsbyer.'
        : 'Started Team SEA after a trip to Africa where he saw the need for clean drinking water in villages.',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: language === 'da' ? 'Marie Hansen' : 'Marie Hansen',
      role: language === 'da' ? 'Projektkoordinator' : 'Project Coordinator',
      bio: language === 'da'
        ? 'Koordinerer alle brøndprojekter og sikrer, at de gennemføres effektivt og med høj kvalitet.'
        : 'Coordinates all well projects and ensures they are carried out efficiently and with high quality.',
      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: language === 'da' ? 'Thomas Nielsen' : 'Thomas Nielsen',
      role: language === 'da' ? 'Marketing & SoMe' : 'Marketing & Social Media',
      bio: language === 'da'
        ? 'Ansvarlig for Team SEAs digitale tilstedeværelse og for at sprede budskabet om vores mission.'
        : 'Responsible for Team SEA's digital presence and for spreading the word about our mission.',
      image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
    },
    {
      name: language === 'da' ? 'Sofie Larsen' : 'Sofie Larsen',
      role: language === 'da' ? 'Frivilligkoordinator' : 'Volunteer Coordinator',
      bio: language === 'da'
        ? 'Koordinerer vores team af frivillige og sikrer, at alle har de værktøjer, de har brug for.'
        : 'Coordinates our team of volunteers and ensures everyone has the tools they need.',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&q=80'
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
              <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
              <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
              <Link to="/about" className="nav-link-active">{content.nav.about}</Link>
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
                <Link to="/impact" className="nav-link">{content.nav.impact}</Link>
                <Link to="/donate" className="nav-link">{content.nav.donate}</Link>
                <Link to="/about" className="nav-link-active">{content.nav.about}</Link>
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

      {/* Mission Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Team SEAs mission' : 'Team SEA\'s mission'} 
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
            <div className="bg-white p-8 rounded-xl shadow-sm text-center animate-slide-up">
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.page.values.transparency}</h3>
              <p className="text-gray-600">{content.page.values.transparencyDesc}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-blue-100 w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4">
                <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">{content.page.values.community}</h3>
              <p className="text-gray-600">{content.page.values.communityDesc}</p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-sm text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
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

      {/* Team Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="section-title">{content.page.team.title}</h2>
            <p>{content.page.team.description}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white rounded-xl shadow-sm overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className="h-48 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                  <p className="text-primary text-sm mb-2">{member.role}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
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

export default About;
