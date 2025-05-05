
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { generateContent } from "@/utils/contentUtils";
import { Navbar } from "@/components/navigation/Navbar";
import { Footer } from "@/components/navigation/Footer";

/**
 * Main layout component that wraps all pages with navigation and footer
 */
export const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language } = useLanguage();
  const content = generateContent(language);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main>{children}</main>
      <Footer language={language} content={content} />
    </div>
  );
};

export default Layout;
