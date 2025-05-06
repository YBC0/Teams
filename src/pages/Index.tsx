import React, { useEffect, useState, Suspense } from "react";
import { Link } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import Logo from "@/components/Logo";
import { FAQSection } from "@/components/sections/faq-section";
import { ProgressSection } from "@/components/sections/progress-section";
import { MissionSection } from "@/components/sections/mission-section";
import { PartnersSection } from "@/components/sections/partners-section";
import { ContactSection } from "@/components/sections/contact-section";
import { DonationImpactSection } from "@/components/sections/donation-impact-section";

// Lazy load heavy/below-the-fold sections
const FAQSectionLazy = React.lazy(() => import("@/components/sections/faq-section").then(m => ({ default: m.FAQSection })));
const PartnersSectionLazy = React.lazy(() => import("@/components/sections/partners-section").then(m => ({ default: m.PartnersSection })));
const ContactSectionLazy = React.lazy(() => import("@/components/sections/contact-section").then(m => ({ default: m.ContactSection })));

const Index = () => {
  const { language } = useLanguage();
  const [isLoaded, setIsLoaded] = useState(false);
  const isMobile = useIsMobile();
  const [mobileImageLoaded, setMobileImageLoaded] = useState(false);
  const [desktopImageLoaded, setDesktopImageLoaded] = useState(false);

  // Preload images to ensure they're available
  useEffect(() => {
    const mobileImg = new Image();
    mobileImg.src = '/assets/hero-desktop.png';
    mobileImg.onload = () => setMobileImageLoaded(true);
    
    const desktopImg = new Image();
    desktopImg.src = '/assets/hero-desktop.png';
    desktopImg.onload = () => setDesktopImageLoaded(true);

    // Add animation delay for elements
    setIsLoaded(true);
  }, []);

  // Text content based on language
  const content = {
    nav: {
      home: language === 'da' ? 'Hjem' : 'Home',
      impact: language === 'da' ? 'Vores aftryk' : 'Our Impact',
      donate: language === 'da' ? 'Doner' : 'Donate',
      about: language === 'da' ? 'Om os' : 'About us',
      journey: language === 'da' ? 'Vores rejse' : 'Our Journey',
      contact: language === 'da' ? 'Kontakt' : 'Contact'
    },
    hero: {
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
    },
    donate: {
      title: language === 'da' ? 'Doner' : 'Donate',
      description: language === 'da'
        ? "Donér via MobilePay. Husk at skrive dit ønskede navn i beskedfeltet – eller skriv 'Anonym'."
        : "Donate via MobilePay. Please write your preferred name in the message field – or write 'Anonymous'.",
      button: language === 'da' ? 'Gå til donation' : 'Go to donation'
    }
  };
  
  const mobileImageUrl = '/assets/hero-desktop.png';
  const desktopImageUrl = '/assets/hero-desktop.png';
  
  return (
    <Layout>
      {/* Hero Section with Ocean Background */}
      <section 
        className="relative h-[85vh] md:h-[80vh] min-h-[550px] flex items-start text-white overflow-hidden bg-cover bg-center"
        style={{
          backgroundImage: isMobile 
            ? `url('${mobileImageUrl}')` 
            : `url('${desktopImageUrl}')`,
          backgroundSize: 'cover'
        }}
      >
        {/* Show logo when images are loading */}
        {(!mobileImageLoaded && isMobile) || (!desktopImageLoaded && !isMobile) ? (
          <div className="absolute inset-0 flex items-center justify-center bg-blue-900/80">
            <Logo variant="hero" size="large" />
          </div>
        ) : null}
        
        <div className="absolute inset-0 bg-gradient-to-b from-blue-900/40 to-blue-900/20"></div>
        <div className="container-custom relative z-10 flex flex-col justify-between h-full">
          <div className="mt-6">
            {/* Logo position if needed */}
          </div>
          
          <div className={cn(
            "max-w-2xl pb-10 mt-auto transition-all duration-1000 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <p className="text-xl md:text-2xl drop-shadow-md text-right ml-auto max-w-xl md:mr-[-40%] mr-0">{content.hero.intro}</p>
          </div>
          
          {/* Buttons positioned at the bottom middle */}
          <div className={cn(
            "w-full flex justify-center mb-10 transition-all duration-1000 delay-300 transform",
            isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
          )}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild size="lg" className="text-base px-6 py-6 hover:scale-105 transition-transform">
                <Link to="/impact">{content.cta.learnMore}</Link>
              </Button>
              <Button 
                asChild 
                variant="outline" 
                size="lg"
                className="bg-white text-primary hover:bg-gray-100 text-base px-6 py-6 border-2 hover:scale-105 transition-transform"
              >
                <Link to="/donate">{content.cta.donate}</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <MissionSection />

      {/* Progress Section */}
      <ProgressSection />

      {/* Donation Impact Section (NEW) */}
      <DonationImpactSection />

      {/* Partners Section */}
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary rounded-full"></div></div>}>
        <PartnersSectionLazy />
      </Suspense>

      {/* FAQ Section */}
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary rounded-full"></div></div>}>
        <FAQSectionLazy />
      </Suspense>

      {/* Contact Section */}
      <Suspense fallback={<div className="min-h-[200px] flex items-center justify-center"><div className="animate-spin h-8 w-8 border-2 border-primary rounded-full"></div></div>}>
        <ContactSectionLazy />
      </Suspense>
    </Layout>
  );
};

export default Index;
