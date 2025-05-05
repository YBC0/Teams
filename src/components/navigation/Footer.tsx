
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram } from "lucide-react";
import { ContentType } from "@/utils/contentUtils";

/**
 * Footer component with navigation links and social media
 */
export const Footer: React.FC<{ language: string, content: ContentType }> = ({ language, content }) => {
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
        </div>
        <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
          <p>&copy; {new Date().getFullYear()} Team SEA. {language === 'da' ? 'Alle rettigheder forbeholdes.' : 'All rights reserved.'}</p>
        </div>
      </div>
    </footer>
  );
};

const SocialLink: React.FC<React.AnchorHTMLAttributes<HTMLAnchorElement>> = ({ children, ...props }) => (
  <a
    {...props}
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-100 hover:text-white transition-colors"
  >
    {children}
  </a>
);
