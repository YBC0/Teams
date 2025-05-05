
import React from "react";
import { getImpactContent } from "@/utils/impactContent";

interface ImpactHeaderProps {
  language: string;
}

/**
 * Header section for the Impact page
 */
export const ImpactHeader = ({ language }: ImpactHeaderProps) => {
  const content = getImpactContent(language);
  
  return (
    <section className="pt-16 pb-12 bg-blue-500 text-white">
      <div className="container-custom">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
          <p className="text-xl">{content.page.subtitle}</p>
        </div>
      </div>
    </section>
  );
};
