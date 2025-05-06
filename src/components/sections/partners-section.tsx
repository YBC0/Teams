import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { StatCard } from '@/components/ui/StatCard';

interface Partner {
  name: string;
  logo: string;
  description: {
    da: string;
    en: string;
  };
  type: 'corporate' | 'government' | 'nonprofit';
}

const PARTNERS: Partner[] = [
  {
    name: 'Partner 1',
    logo: '/assets/partner-placeholder.png',
    description: {
      da: 'En af vores mest betroede partnere i brøndbyggeri og vandprojekter.',
      en: 'One of our most trusted partners in well construction and water projects.'
    },
    type: 'corporate'
  },
  {
    name: 'Partner 2',
    logo: '/assets/partner-placeholder.png',
    description: {
      da: 'Specialiseret i bæredygtige vandløsninger og infrastruktur.',
      en: 'Specialized in sustainable water solutions and infrastructure.'
    },
    type: 'nonprofit'
  },
  {
    name: 'Partner 3',
    logo: '/assets/partner-placeholder.png',
    description: {
      da: 'Fokuserer på sundhed og sanitære forhold i udviklingslande.',
      en: 'Focusing on health and sanitation in developing countries.'
    },
    type: 'nonprofit'
  }
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
};

export const PartnersSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: {
      da: 'Skal din virksomhed stå her?',
      en: 'Should your company be here?'
    },
    description: {
      da: 'Vi samarbejder med virksomheder og organisationer, der deler vores vision om at gøre en forskel.',
      en: 'We partner with companies and organizations that share our vision of making a difference.'
    },
    benefits: {
      title: {
        da: 'Fordele ved partnerskab',
        en: 'Partnership Benefits'
      },
      impact: {
        title: {
          da: 'Global indvirkning',
          en: 'Global Impact'
        },
        description: {
          da: 'Skab varig forandring i lokalsamfund over hele verden',
          en: 'Create lasting change in communities worldwide'
        }
      },
      collaboration: {
        title: {
          da: 'Samarbejdsmuligheder',
          en: 'Collaboration Opportunities'
        },
        description: {
          da: 'Arbejd med et dedikeret team der værdsætter partnerskab',
          en: 'Work with a dedicated team that values partnership'
        }
      },
      results: {
        title: {
          da: 'Målbare resultater',
          en: 'Measurable Results'
        },
        description: {
          da: 'Følg indvirkningen af dit partnerskab gennem detaljerede rapporter',
          en: 'Track the impact of your partnership through detailed reporting'
        }
      }
    },
    cta: {
      button: {
        da: 'Bliv partner',
        en: 'Become a Partner'
      },
      note: {
        da: 'Lad os sammen skabe en bæredygtig fremtid',
        en: 'Let\'s create a sustainable future together'
      }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {content.title[language]}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {content.description[language]}
            </p>
          </motion.div>

          {/* Partner Logos Grid */}
          <motion.div
            variants={itemVariants}
            className="mb-20 grid grid-cols-2 sm:grid-cols-3 gap-8 items-center justify-center"
            aria-label={language === 'da' ? 'Partnere' : 'Partners'}
          >
            {PARTNERS.map((partner, idx) => (
              <motion.div
                key={partner.name}
                variants={itemVariants}
                className="flex flex-col items-center group focus-within:ring-2 focus-within:ring-primary rounded-xl p-4 transition-shadow duration-200 hover:shadow-lg bg-white/80 backdrop-blur-md cursor-pointer"
                tabIndex={0}
                role="button"
                aria-label={partner.name}
                title={partner.name}
              >
                {/* If partner.url exists, wrap in <a> */}
                {/* Placeholder for future: partner.url && ... */}
                <img
                  src={partner.logo}
                  alt={partner.name}
                  className="w-40 h-32 object-contain mb-2 transition-transform duration-200 group-hover:scale-105 group-focus:scale-105"
                  loading="lazy"
                />
                <span className="text-base font-semibold text-gray-800 text-center mb-1">{partner.name}</span>
                <span className="text-xs text-gray-500 text-center">{partner.description[language]}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* Partnership Benefits */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          >
            <StatCard
              icon={<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
              label={content.benefits.impact.title[language]}
              description={content.benefits.impact.description[language]}
              className="p-8"
            />

            <StatCard
              icon={<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
              label={content.benefits.collaboration.title[language]}
              description={content.benefits.collaboration.description[language]}
              className="p-8"
            />

            <StatCard
              icon={<svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>}
              label={content.benefits.results.title[language]}
              description={content.benefits.results.description[language]}
              className="p-8"
            />
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center bg-primary/5 rounded-2xl p-12"
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">
              {content.cta.note[language]}
            </h3>
            <Button
              size="lg"
              className="bg-primary text-white hover:bg-primary/90 px-8 py-6 text-lg"
            >
              {content.cta.button[language]}
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 