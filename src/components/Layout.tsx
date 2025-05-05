import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe, Facebook, Instagram } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

// Define the content type for better TypeScript support
export type ContentType = {
  nav: {
    home: string;
    impact: string;
    projects: string;
    donate: string;
    about: string;
    journey: string;
    contact: string;
  };
  [key: string]: any;
};

// Generate content based on language for reuse
export const generateContent = (language: string): ContentType => {
  return {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      projects: language === 'da' ? 'Projekter' : 'Projects',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Min rejse' : 'My Journey',
      contact: language === 'da' ? 'Kontakt' : 'Contact'
    }
  };
};

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const content = generateContent(language);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Navigation */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container-custom">
          <nav className="flex justify-between items-center py-4">
            <Link to="/" className="flex items-center space-x-2">
              {/* Logo removed */}
            </Link>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              <Link to="/" className={isActive('/') ? "nav-link-active" : "nav-link"}>{content.nav.home}</Link>
              <Link to="/impact" className={isActive('/impact') ? "nav-link-active" : "nav-link"}>{content.nav.impact}</Link>
              <Link to="/projects" className={isActive('/projects') ? "nav-link-active" : "nav-link"}>{content.nav.projects}</Link>
              <Link to="/donate" className={isActive('/donate') ? "nav-link-active" : "nav-link"}>{content.nav.donate}</Link>
              <Link to="/about" className={isActive('/about') ? "nav-link-active" : "nav-link"}>{content.nav.about}</Link>
              <Link to="/journey" className={isActive('/journey') ? "nav-link-active" : "nav-link"}>{content.nav.journey}</Link>
              <Link to="/contact" className={isActive('/contact') ? "nav-link-active" : "nav-link"}>{content.nav.contact}</Link>
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
                <Link to="/" className={isActive('/') ? "nav-link-active" : "nav-link"}>{content.nav.home}</Link>
                <Link to="/impact" className={isActive('/impact') ? "nav-link-active" : "nav-link"}>{content.nav.impact}</Link>
                <Link to="/projects" className={isActive('/projects') ? "nav-link-active" : "nav-link"}>{content.nav.projects}</Link>
                <Link to="/donate" className={isActive('/donate') ? "nav-link-active" : "nav-link"}>{content.nav.donate}</Link>
                <Link to="/about" className={isActive('/impact') ? "nav-link-active" : "nav-link"}>{content.nav.about}</Link>
                <Link to="/journey" className={isActive('/journey') ? "nav-link-active" : "nav-link"}>{content.nav.journey}</Link>
                <Link to="/contact" className={isActive('/contact') ? "nav-link-active" : "nav-link"}>{content.nav.contact}</Link>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main>
        {children}
      </main>

      {/* Footer */}
      <Footer language={language} content={content} />
    </div>
  );
};

// Footer component extracted for reuse
const Footer: React.FC<{ language: string, content: ContentType }> = ({ language, content }) => {
  return (
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
              <li><Link to="/projects" className="text-blue-100 hover:text-white transition-colors">{content.nav.projects}</Link></li>
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

export default Layout;
