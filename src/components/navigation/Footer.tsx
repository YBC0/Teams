
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Heart } from "lucide-react";
import { ContentType } from "@/utils/contentUtils";
import { cn } from "@/lib/utils";

/**
 * Footer component with navigation links and social media
 */
export const Footer: React.FC<{ language: string, content: ContentType }> = ({ language, content }) => {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative bg-gradient-to-b from-blue-900 to-blue-950 text-white py-12 mt-auto">
      <div className="container-custom">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4 flex items-center">
              Team SEA
              <Heart className="w-4 h-4 ml-2 text-red-400" />
            </h3>
            <p className="mb-6 text-blue-100 max-w-md">
              {language === 'da'
                ? 'Sammen gør vi en forskel, én donation ad gangen.'
                : 'Together we make a difference, one donation at a time.'}
            </p>
            <div className="flex space-x-4 mb-6">
              <SocialLink href="https://facebook.com/" aria-label="Facebook">
                <Facebook className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="https://instagram.com/" aria-label="Instagram">
                <Instagram className="w-6 h-6" />
              </SocialLink>
              <SocialLink href="https://tiktok.com/" aria-label="TikTok">
                <svg className="w-6 h-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.53.02C13.84 0 15.14.01 16.44 0c.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </SocialLink>
            </div>
          </div>
          
          <div className="animate-fade-in">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'da' ? 'Hurtige links' : 'Quick links'}
            </h3>
            <ul className="grid grid-cols-2 gap-2">
              <li><FooterLink to="/">{content.nav.home}</FooterLink></li>
              <li><FooterLink to="/impact">{content.nav.impact}</FooterLink></li>
              <li><FooterLink to="/projects">{content.nav.projects}</FooterLink></li>
              <li><FooterLink to="/donate">{content.nav.donate}</FooterLink></li>
              <li><FooterLink to="/about">{content.nav.about}</FooterLink></li>
              <li><FooterLink to="/journey">{content.nav.journey}</FooterLink></li>
              <li><FooterLink to="/contact">{content.nav.contact}</FooterLink></li>
            </ul>
          </div>
          
          <div className="animate-fade-in lg:col-span-1 md:col-span-2">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'da' ? 'Kontakt os' : 'Contact us'}
            </h3>
            <p className="text-blue-100 mb-4">
              {language === 'da'
                ? 'Har du spørgsmål eller ønsker du at vide mere om vores arbejde? Kontakt os!'
                : 'Do you have questions or want to know more about our work? Contact us!'}
            </p>
            <Link 
              to="/contact" 
              className="inline-block bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-md transition-colors duration-300"
            >
              {language === 'da' ? 'Kontakt os' : 'Contact us'}
            </Link>
          </div>
        </div>
        
        <div className="border-t border-blue-800/60 mt-10 pt-8 text-center text-blue-200">
          <p className="text-sm">
            &copy; {year} Team SEA. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}
          </p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, className, ...props }) => (
  <a
    {...props}
    target="_blank"
    rel="noopener noreferrer"
    className={cn(
      "text-blue-100 hover:text-white transition-colors p-2 bg-white/10 rounded-full hover:bg-white/20",
      className
    )}
  >
    {children}
  </a>
);

const FooterLink: React.FC<{to: string, children: React.ReactNode}> = ({to, children}) => (
  <Link 
    to={to} 
    className="text-blue-100 hover:text-white transition-colors py-1 block hover:translate-x-1 duration-200"
  >
    {children}
  </Link>
);
