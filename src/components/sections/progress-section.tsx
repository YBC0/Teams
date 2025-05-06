import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";
import { StatCard } from '@/components/ui/StatCard';

interface ProgressMetric {
  id: string;
  label: {
    da: string;
    en: string;
  };
  value: number;
  unit: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
}

const PROGRESS_METRICS: ProgressMetric[] = [
  {
    id: '1',
    label: {
      da: 'Mennesker hjulpet',
      en: 'People Helped'
    },
    value: 25000,
    unit: {
      da: 'mennesker',
      en: 'people'
    },
    description: {
      da: 'Vi sigter mod at hjælpe 50.000 mennesker med humanitær støtte',
      en: 'We aim to help 50,000 people with humanitarian aid'
    }
  },
  {
    id: '2',
    label: {
      da: 'Ressourcer leveret',
      en: 'Resources Delivered'
    },
    value: 500000,
    unit: {
      da: 'liter',
      en: 'liters'
    },
    description: {
      da: 'Vores mål er at levere 1 million liter ressourcer dagligt',
      en: 'Our goal is to deliver 1 million liters of resources daily'
    }
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

const ProgressBar: React.FC<{ progress: number }> = ({ progress }) => {
  return (
    <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${progress}%` }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="h-full bg-primary"
      />
    </div>
  );
};

export const ProgressSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    title: {
      da: 'Vores fremskridt',
      en: 'Our Progress'
    },
    description: {
      da: 'Følg vores fremskridt, mens vi arbejder mod vores mål om at yde humanitær støtte til dem, der har brug for os.',
      en: 'Track our progress as we work towards our goal of providing humanitarian aid to those who need us.'
    },
    stats: [
      {
        value: '50+',
        label: language === 'da' ? 'Hjulpet mennesker' : 'People Helped',
      },
      {
        value: '1',
        label: language === 'da' ? 'Landsby' : 'Village',
      },
      {
        value: '1',
        label: language === 'da' ? 'Brønd' : 'Well',
      },
      {
        value: '0',
        label: language === 'da' ? 'Måltider' : 'Meals',
      },
    ],
    impact: {
      title: {
        da: 'Vores indvirkning',
        en: 'Our Impact'
      },
      description: {
        da: 'Hver donation bringer os tættere på vores mål om at yde humanitær støtte til dem, der har brug for os. Deltag i denne mission om at skabe varig forandring.',
        en: 'Every donation brings us closer to our goal of providing humanitarian aid to those who need us. Join this mission to create lasting change.'
      },
      button: {
        da: 'Giv en donation',
        en: 'Make a Donation'
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            {content.title[language]}
          </h2>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            {content.description[language]}
          </p>
        </div>
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-6 max-w-3xl mx-auto">
          {content.stats.map((stat, idx) => (
            <StatCard key={idx} number={stat.value} label={stat.label} className="h-full" />
          ))}
        </div>
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-6xl mx-auto mt-12"
        >
          {/* Impact Summary */}
          <motion.div
            variants={itemVariants}
            className="bg-primary/5 rounded-lg p-8 text-center"
          >
            <h3 className="text-2xl font-bold text-primary mb-4">
              {content.impact.title[language]}
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              {content.impact.description[language]}
            </p>
            <AccessibleButton
              href="/donate"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {content.impact.button[language]}
            </AccessibleButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 