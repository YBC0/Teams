import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";
import { Badge } from '@/components/ui/badge';

interface ProcessStep {
  id: string;
  title: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
  icon: string;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    id: '1',
    title: {
      da: 'Identifikation af behov',
      en: 'Need Identification'
    },
    description: {
      da: 'Vi samarbejder med lokale entreprenører og humanitære hjælpeorganisationer for at identificere områder med størst behov for ressourcer.',
      en: 'We collaborate with local contractors and humanitarian aid organizations to identify areas with the greatest need for resources.'
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
      da: 'Hver brønd gennemgår en grundig planlægningsproces for at sikre optimal placering og design.',
      en: 'Each well undergoes a thorough planning process to ensure optimal location and design.'
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
      da: 'Vores erfarne team bygger brønde med bæredygtige materialer og moderne teknikker.',
      en: 'Our experienced team builds wells using sustainable materials and modern techniques.'
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
      da: 'Vi overvåger brøndenes funktion og opdaterer regelmæssigt vores hjemmeside med resultater og indvirkning.',
      en: 'We monitor well performance and regularly update our website with results and impact.'
    },
    icon: '📊',
  },
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

export const DonationProcessSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: {
      da: 'Sådan gør din donation en forskel',
      en: 'How Your Donation Makes an Impact'
    },
    description: {
      da: 'Vi tror på fuld gennemsigtighed. Her er hvordan din donation hjælper os med at bygge brønde og transformere lokalsamfund.',
      en: 'We believe in complete transparency. Here\'s how your donation helps us build wells and transform communities.'
    },
    trust: {
      transparency: {
        da: 'Gennemsigtighed i midlernes brug',
        en: 'Transparency in Fund Usage'
      },
      dedication: {
        da: 'Dedikeret til forandring',
        en: 'Dedicated to Change'
      },
      communities: {
        da: 'Hjulpet lokalsamfund',
        en: 'Communities Served'
      }
    },
    cta: {
      button: {
        da: 'Start med at gøre en forskel',
        en: 'Start Making an Impact'
      },
      note: {
        da: 'Din donation er sikker og fradragsberettiget. Vi giver detaljerede rapporter om, hvordan dine midler bruges.',
        en: 'Your donation is secure and tax-deductible. We provide detailed reports on how your funds are used.'
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.title[language]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.description[language]}
            </p>
          </motion.div>

          {/* Process Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {PROCESS_STEPS.map((step, index) => (
              <motion.div
                key={step.id}
                variants={itemVariants}
                className="relative"
              >
                <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-100">
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    {step.title[language]}
                  </h3>
                  <p className="text-gray-600">{step.description[language]}</p>
                </div>
                {index < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 w-8 h-0.5 bg-gray-200" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Trust Indicators */}
          <motion.div
            variants={itemVariants}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">{content.trust.transparency[language]}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">100%</div>
              <p className="text-gray-600">{content.trust.dedication[language]}</p>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary mb-2">1</div>
              <p className="text-gray-600">{content.trust.communities[language]}</p>
            </div>
          </motion.div>

          {/* Trust & Security Badges */}
          <motion.div
            variants={itemVariants}
            className="mt-10 flex flex-wrap justify-center gap-4"
            aria-label={language === 'da' ? 'Sikkerheds- og tillidsmærker' : 'Security and Trust Badges'}
          >
            <Badge variant="default" className="flex items-center gap-2 bg-green-100 text-green-800 border-green-200">
              <span aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 11V7a4 4 0 1 1 8 0v4M5 11V7a7 7 0 0 1 14 0v4m-7 4v4m0 0h4m-4 0H8" /></svg>
              </span>
              {language === 'da' ? 'SSL-krypteret' : 'SSL Encrypted'}
            </Badge>
            <Badge variant="default" className="flex items-center gap-2 bg-blue-100 text-blue-800 border-blue-200">
              <span aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M12 22s8-4 8-10V7a8 8 0 1 0-16 0v5c0 6 8 10 8 10z" /></svg>
              </span>
              {language === 'da' ? 'Betalingssikkerhed' : 'Payment Security'}
            </Badge>
            <Badge variant="default" className="flex items-center gap-2 bg-yellow-100 text-yellow-800 border-yellow-200">
              <span aria-hidden="true">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" /></svg>
              </span>
              {language === 'da' ? 'Verificeret velgørenhed' : 'Verified Charity'}
            </Badge>
          </motion.div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="mt-12 text-center"
          >
            <AccessibleButton
              href="/donate"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {content.cta.button[language]}
            </AccessibleButton>
            <p className="mt-4 text-sm text-gray-500">
              {content.cta.note[language]}
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 