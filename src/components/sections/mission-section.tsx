import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";
import { StatCard } from '@/components/ui/StatCard';

interface Value {
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

const VALUES: Value[] = [
  {
    id: '1',
    title: {
      da: 'Bæredygtighed',
      en: 'Sustainability'
    },
    description: {
      da: 'Vi sikrer langsigtet indvirkning gennem bæredygtige løsninger og vedligeholdelse af vores projekter, fra brønde til humanitær nødhjælp.',
      en: 'We ensure long-term impact through sustainable solutions and maintenance of our projects, from wells to humanitarian emergency aid.'
    },
    icon: '🌱',
  },
  {
    id: '2',
    title: {
      da: 'Gennemsigtighed',
      en: 'Transparency'
    },
    description: {
      da: 'Vi opretholder fuld gennemsigtighed i vores operationer og giver detaljerede rapporter om, hvordan donationer bruges til at hjælpe mennesker i nød.',
      en: 'We maintain complete transparency in our operations and provide detailed reports on how donations are used to help people in need.'
    },
    icon: '🔍',
  },
  {
    id: '3',
    title: {
      da: 'Fællesskab',
      en: 'Community'
    },
    description: {
      da: 'Vi arbejder tæt sammen med lokale samfund og organisationer for at identificere og løse de mest presserende humanitære behov.',
      en: 'We work closely with local communities and organizations to identify and address the most pressing humanitarian needs.'
    },
    icon: '🤝',
  },
  {
    id: '4',
    title: {
      da: 'Innovation',
      en: 'Innovation'
    },
    description: {
      da: 'Vi forbedrer kontinuerligt vores metoder og teknologier for at levere den bedste humanitære støtte og maksimere vores indvirkning.',
      en: 'We continuously improve our methods and technologies to deliver the best humanitarian aid and maximize our impact.'
    },
    icon: '💡',
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

export const MissionSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    mission: {
      title: {
        da: 'Vores mission',
        en: 'Our Mission'
      },
      description: {
        da: 'Vi er dedikerede til at yde humanitær støtte til mennesker i nød. Gennem vores projekter og samarbejde sigter vi mod at skabe varig forandring og forbedre liv.',
        en: 'We are dedicated to providing humanitarian aid to those in need. Through our projects and partnerships, we aim to create lasting change and improve lives.'
      }
    },
    vision: {
      title: {
        da: 'Vores vision',
        en: 'Our Vision'
      },
      description: {
        da: 'En verden, hvor alle mennesker har adgang til de ressourcer, de har brug for. Vi mener, at humanitær støtte er en grundlæggende ret og et hjørnesten i bæredygtig udvikling.',
        en: 'A world where all people have access to the resources they need. We believe that humanitarian aid is a fundamental right and a cornerstone of sustainable development.'
      }
    },
    values: {
      title: {
        da: 'Vores kerneværdier',
        en: 'Our Core Values'
      }
    },
    cta: {
      text: {
        da: 'Sammen kan vi yde humanitær støtte til dem, der har brug for os, og skabe varig forandring. Din støtte gør dette muligt.',
        en: 'Together we can provide humanitarian aid to those who need us and create lasting change. Your support makes this possible.'
      },
      button: {
        da: 'Støt vores mission',
        en: 'Support Our Mission'
      }
    }
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Mission & Vision Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <div className="text-3xl mb-2">🎯</div>
            <h3 className="text-xl font-bold mb-2">{content.mission.title[language]}</h3>
            <p className="text-gray-700 text-base max-w-md">{content.mission.description[language]}</p>
          </div>
          <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 shadow-md flex flex-col items-center text-center">
            <div className="text-3xl mb-2">🌍</div>
            <h3 className="text-xl font-bold mb-2">{content.vision.title[language]}</h3>
            <p className="text-gray-700 text-base max-w-md">{content.vision.description[language]}</p>
          </div>
        </div>

        {/* Core Values */}
        <div className="mt-12 mb-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            {content.values.title[language]}
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((value) => (
              <StatCard
                key={value.id}
                icon={value.icon}
                label={value.title[language]}
                description={value.description[language]}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              />
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            {content.cta.text[language]}
          </h3>
          <AccessibleButton
            href="/donate"
            size="lg"
            className="bg-primary text-white hover:bg-primary/90"
          >
            {content.cta.button[language]}
          </AccessibleButton>
        </div>
      </div>
    </section>
  );
}; 