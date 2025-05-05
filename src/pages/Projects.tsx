
import React from "react";
import { Layout } from "@/components/Layout";
import { useLanguage } from "@/contexts/LanguageContext";
import { ProjectList } from "@/components/projects/ProjectList";
import { ProjectsHeader } from "@/components/projects/ProjectsHeader";
import { FutureProjectsSection } from "@/components/projects/FutureProjectsSection";

/**
 * Projects page displaying current and future water well projects
 */
const Projects = () => {
  const { language } = useLanguage();

  return (
    <Layout>
      <ProjectsHeader language={language} />
      <ProjectList language={language} />
      <FutureProjectsSection language={language} />
    </Layout>
  );
};

export default Projects;
