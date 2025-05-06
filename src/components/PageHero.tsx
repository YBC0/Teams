import React from 'react';

interface PageHeroProps {
  title: string;
  description: string;
  compact?: boolean;
}

export const PageHero: React.FC<PageHeroProps> = ({ title, description, compact }) => (
  <section className={`relative ${compact ? 'py-4 md:py-6' : 'py-8 md:py-10'} bg-gradient-to-br from-blue-600 via-blue-500 to-blue-400 overflow-hidden`}>
    <div className="container mx-auto px-4">
      <div className="max-w-xl mx-auto text-center bg-white/20 backdrop-blur-lg rounded-3xl p-4 md:p-8 shadow-xl border border-white/30">
        <div className="flex flex-col items-center gap-3">
          <div className="text-3xl md:text-4xl font-extrabold text-white drop-shadow mb-1 animate-fade-in">
            {title}
          </div>
          <p className="text-base md:text-lg text-white/90 mb-1 animate-fade-in delay-100">
            {description}
          </p>
        </div>
      </div>
    </div>
    {/* Subtle animated background shapes */}
    <div className="absolute -top-10 -left-10 w-32 h-32 bg-white/10 rounded-full blur-2xl animate-pulse" />
    <div className="absolute bottom-0 right-0 w-48 h-48 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
  </section>
); 