
import React from "react";

/**
 * Header section for the Projects page
 */
export const ProjectsHeader = ({ language }: { language: string }) => {
  const content = {
    title: language === 'da' ? 'Vores Projekter' : 'Our Projects',
    subtitle: language === 'da' 
      ? 'Her kan du se alle vores projekter og følge fremskridt.' 
      : 'Here you can see all our projects and follow progress.',
  };

  return (
    <section className="pt-16 pb-12 bg-blue-500 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.title}</h1>
          <p className="text-xl">{content.subtitle}</p>
        </div>
      </div>
    </section>
  );
};
