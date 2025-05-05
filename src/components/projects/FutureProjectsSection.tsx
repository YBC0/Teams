
import React from "react";
import { getProjectsContent } from "@/utils/projectsContent";

interface FutureProjectsSectionProps {
  language: string;
}

/**
 * Section displaying information about upcoming projects
 */
export const FutureProjectsSection = ({ language }: FutureProjectsSectionProps) => {
  const content = getProjectsContent(language);
  
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-custom text-center">
        <h2 className="section-title mb-6">
          {content.page.futureProjects}
        </h2>
        <p className="mb-4 max-w-2xl mx-auto">
          {content.page.futureProjectsDesc}
        </p>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {content.page.futureProjectsFollow}
        </p>
      </div>
    </section>
  );
};
