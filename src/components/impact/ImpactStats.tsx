
import React from "react";
import { getImpactContent } from "@/utils/impactContent";

interface ImpactStatsProps {
  language: string;
}

/**
 * Statistics section displaying impact metrics
 */
export const ImpactStats = ({ language }: ImpactStatsProps) => {
  const content = getImpactContent(language);
  
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 gap-8">
            <StatCard
              value={content.page.stats.wellsBuiltValue}
              label={content.page.stats.wellsBuilt}
            />
            <StatCard
              value={content.page.stats.peopleHelpedValue}
              label={content.page.stats.peopleHelped}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

interface StatCardProps {
  value: string;
  label: string;
}

/**
 * Card displaying an individual statistic
 */
const StatCard = ({ value, label }: StatCardProps) => (
  <div className="bg-blue-50 p-8 rounded-xl text-center">
    <div className="text-5xl font-bold text-primary mb-2">{value}</div>
    <p className="text-xl text-gray-600">{label}</p>
  </div>
);
