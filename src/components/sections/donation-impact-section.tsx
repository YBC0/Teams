import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";

const IMPACT_ITEMS = [
  {
    id: '1',
    title: {
      da: 'Identifikation af behov',
      en: 'Need Identification'
    },
    description: {
      da: 'Vi samarbejder med lokale partnere og organisationer for at finde de områder, hvor behovet for rent vand og livsvigtige ressourcer er størst.',
      en: 'We work with local partners and organizations to identify areas with the greatest need for clean water and essential resources.'
    },
    icon: '💧',
  },
  {
    id: '2',
    title: {
      da: 'Omhyggelig planlægning',
      en: 'Careful Planning'
    },
    description: {
      da: 'Vi planlægger nøje, hvordan vi bedst kan levere brønde og andre ressourcer, så hjælpen skaber størst mulig værdi for lokalsamfundet.',
      en: 'We carefully plan how to deliver wells and other resources to maximize the positive impact for communities.'
    },
    icon: '🔍',
  },
  {
    id: '3',
    title: {
      da: 'Konstruktion',
      en: 'Construction'
    },
    description: {
      da: 'Vores erfarne samarbejdspartnere bygger brønde og leverer humanitær støtte, så flere får adgang til rent vand og andre nødvendige ressourcer.',
      en: 'Our experienced partners build wells and provide humanitarian aid, giving more people access to clean water and vital resources.'
    },
    icon: '🏗️',
  },
  {
    id: '4',
    title: {
      da: 'Opfølgning og opdateringer',
      en: 'Monitoring & Updates'
    },
    description: {
      da: 'Vi følger op på vores projekter og opdaterer løbende om, hvordan brønde og ressourcer gør en forskel for mennesker i nød.',
      en: 'We follow up on our projects and regularly share updates on how wells and resources are making a difference for people in need.'
    },
    icon: '📊',
  },
];

export const DonationImpactSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: {
      da: 'Sådan gør din donation en forskel',
      en: 'How Your Donation Makes a Difference'
    },
    description: {
      da: 'Se hvordan din støtte skaber forandring – trin for trin.',
      en: 'See how your support makes a difference – step by step.'
    }
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {content.title[language]}
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description[language]}
          </p>
        </div>
        {/* Timeline/Stepper */}
        <div className="relative flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16 lg:gap-8">
          {/* Timeline line only behind icons on desktop */}
          <div className="hidden lg:block absolute left-0 right-0 top-12 h-0.5 bg-gradient-to-r from-primary/10 via-primary/30 to-primary/10 z-0" style={{}} />
          {IMPACT_ITEMS.map((item, idx) => (
            <div key={item.id} className="relative z-10 flex flex-col items-center text-center flex-1">
              {/* Icon in circle */}
              <div className={`mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-white shadow-lg ring-4 ring-primary/20 text-4xl transition-transform duration-300 hover:scale-110 ${idx === 0 ? 'bg-gradient-to-br from-primary/10 to-primary/30' : ''}`}
                style={{ position: 'relative' }}>
                {item.icon}
              </div>
              {/* Dots for mobile timeline */}
              {idx < IMPACT_ITEMS.length - 1 && (
                <div className="lg:hidden w-1 h-8 bg-gradient-to-b from-primary/10 to-primary/30 my-2 rounded-full" />
              )}
              {/* Title */}
              <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-2 mt-2 lg:mt-4">{item.title[language]}</h3>
              {/* Description */}
              <p className="text-gray-600 text-base leading-relaxed max-w-xs mx-auto mb-2 lg:mb-0">{item.description[language]}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 