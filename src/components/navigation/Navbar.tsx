
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateContent } from "@/utils/contentUtils";
import Logo from "@/components/Logo";

/**
 * Main navigation component that handles both desktop and mobile navigation
 */
export const Navbar = () => {
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
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container-custom">
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="medium" variant="default" />
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <NavLinks content={content} isActive={isActive} />
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
          </div>
          
          {/* Mobile Navigation Toggle */}
          <div className="md:hidden flex items-center">
            <LanguageToggle language={language} toggleLanguage={toggleLanguage} />
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
              <NavLinks content={content} isActive={isActive} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Sub-components
const NavLinks = ({ content, isActive }: { content: any, isActive: (path: string) => boolean }) => (
  <>
    <Link to="/" className={isActive('/') ? "nav-link-active" : "nav-link"}>{content.nav.home}</Link>
    <Link to="/impact" className={isActive('/impact') ? "nav-link-active" : "nav-link"}>{content.nav.impact}</Link>
    <Link to="/projects" className={isActive('/projects') ? "nav-link-active" : "nav-link"}>{content.nav.projects}</Link>
    <Link to="/donate" className={isActive('/donate') ? "nav-link-active" : "nav-link"}>{content.nav.donate}</Link>
    <Link to="/about" className={isActive('/about') ? "nav-link-active" : "nav-link"}>{content.nav.about}</Link>
    <Link to="/journey" className={isActive('/journey') ? "nav-link-active" : "nav-link"}>{content.nav.journey}</Link>
    <Link to="/contact" className={isActive('/contact') ? "nav-link-active" : "nav-link"}>{content.nav.contact}</Link>
  </>
);

const LanguageToggle = ({ language, toggleLanguage }: { language: string, toggleLanguage: () => void }) => (
  <button 
    onClick={toggleLanguage}
    className="p-2 mr-2 rounded-full hover:bg-gray-100 transition-colors"
    aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
  >
    <Globe className="w-5 h-5" />
  </button>
);
