import React from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectList } from "@/components/projects/ProjectList";
import { FutureProjectsSection } from "@/components/projects/FutureProjectsSection";
import { PageHero } from "@/components/PageHero";

/**
 * Projects page displaying current and future water well projects
 */
const Projects = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <PageHero title={language === 'da' ? 'Vores Projekter' : 'Our Projects'} description={language === 'da' ? 'Her kan du se alle vores projekter og følge fremskridt.' : 'Here you can see all our projects and follow progress.'} compact />
      <ProjectList language={language} />
      <FutureProjectsSection language={language} />
    </Layout>
  );
};

export default Projects;
