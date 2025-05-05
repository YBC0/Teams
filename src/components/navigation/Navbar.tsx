
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Globe } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateContent } from "@/utils/contentUtils";
import Logo from "@/components/Logo";
import { cn } from "@/lib/utils";

/**
 * Main navigation component that handles both desktop and mobile navigation
 */
export const Navbar = () => {
  const { language, toggleLanguage } = useLanguage();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const content = generateContent(language);

  // Handle scroll for sticky header effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={cn(
      "sticky top-0 z-50 transition-all duration-300",
      isScrolled ? "bg-white/95 backdrop-blur-sm shadow-md" : "bg-white shadow-sm"
    )}>
      <div className="container-custom">
        <nav className="flex justify-between items-center py-4">
          <Link to="/" className="flex items-center space-x-2">
            <Logo size="medium" variant={isScrolled ? "glow" : "default"} linkWrapper={false} />
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
              className="p-2 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
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
              <NavLinks content={content} isActive={isActive} mobile={true} closeMenu={() => setIsMenuOpen(false)} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

// Sub-components
const NavLinks = ({ 
  content, 
  isActive, 
  mobile = false,
  closeMenu
}: { 
  content: any, 
  isActive: (path: string) => boolean,
  mobile?: boolean,
  closeMenu?: () => void
}) => {
  const linkClass = (path: string) => cn(
    "relative px-4 py-2 transition-colors duration-200 rounded-md",
    isActive(path) 
      ? "text-primary font-medium" 
      : "text-gray-700 hover:text-primary hover:bg-primary/5",
    mobile && "block w-full"
  );

  // Handler for mobile navigation
  const handleClick = () => {
    if (mobile && closeMenu) closeMenu();
  };

  return (
    <>
      <Link to="/" className={linkClass('/')} onClick={handleClick}>{content.nav.home}</Link>
      <Link to="/impact" className={linkClass('/impact')} onClick={handleClick}>{content.nav.impact}</Link>
      <Link to="/projects" className={linkClass('/projects')} onClick={handleClick}>{content.nav.projects}</Link>
      <Link to="/donate" className={linkClass('/donate')} onClick={handleClick}>{content.nav.donate}</Link>
      <Link to="/about" className={linkClass('/about')} onClick={handleClick}>{content.nav.about}</Link>
      <Link to="/journey" className={linkClass('/journey')} onClick={handleClick}>{content.nav.journey}</Link>
      <Link to="/contact" className={linkClass('/contact')} onClick={handleClick}>{content.nav.contact}</Link>
    </>
  );
};

const LanguageToggle = ({ language, toggleLanguage }: { language: string, toggleLanguage: () => void }) => (
  <button 
    onClick={toggleLanguage}
    className="p-2 mr-2 rounded-full hover:bg-primary/10 transition-colors focus:outline-none focus:ring-2 focus:ring-primary/40"
    aria-label={language === 'da' ? 'Switch to English' : 'Skift til dansk'}
  >
    <Globe className="w-5 h-5" />
  </button>
);
