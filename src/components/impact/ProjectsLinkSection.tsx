
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { getImpactContent } from "@/utils/impactContent";

interface ProjectsLinkSectionProps {
  language: string;
}

/**
 * Section with a call-to-action link to the Projects page
 */
export const ProjectsLinkSection = ({ language }: ProjectsLinkSectionProps) => {
  const content = getImpactContent(language);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="section-title mb-6">{language === 'da' ? 'Vores Projekter' : 'Our Projects'}</h2>
        <p className="mb-8 max-w-2xl mx-auto">
          {language === 'da' 
            ? 'Se alle vores projekter og læs mere om vores brøndprojekter i detaljer.' 
            : 'View all our projects and read more about our well projects in detail.'}
        </p>
        <Button asChild size="lg">
          <Link to="/projects">{content.page.projectsLink}</Link>
        </Button>
      </div>
    </section>
  );
};
