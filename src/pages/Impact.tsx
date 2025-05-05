
import React from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ImpactHeader } from "@/components/impact/ImpactHeader";
import { ImpactStats } from "@/components/impact/ImpactStats";
import { ProjectsLinkSection } from "@/components/impact/ProjectsLinkSection";

/**
 * Impact page showing the organization's achievements and statistics
 */
const Impact = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <ImpactHeader language={language} />
      <ImpactStats language={language} />
      <ProjectsLinkSection language={language} />
    </Layout>
  );
};

export default Impact;
