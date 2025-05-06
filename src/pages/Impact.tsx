import React from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { PageHero } from "@/components/PageHero";
import { DonationImpactSection } from "@/components/DonationImpactSection";

/**
 * Impact page showing the organization's achievements and statistics
 */
const Impact = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <PageHero 
        title={language === 'da' ? 'Vores Aftryk' : 'Our Impact'} 
        description={language === 'da' 
          ? 'Gennem fælles indsats gør vi en reel forskel for mennesker med begrænset adgang til rent drikkevand.'
          : 'Through collective effort, we make a real difference for people with limited access to clean drinking water.'
        } 
      />
      <DonationImpactSection />
    </Layout>
  );
};

export default Impact;
