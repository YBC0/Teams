import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { cn } from '@/lib/utils';
import { colors } from '@/lib/design-system';
import { useLanguage } from "@/contexts/LanguageContext";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  ctaLink: string;
  backgroundImage: string;
  impactStats?: {
    value: string;
    label: string;
  }[];
}

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

export const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  ctaLink,
  backgroundImage,
  impactStats = [],
}) => {
  const { language } = useLanguage();

  return (
    <section
      className="relative min-h-[80vh] flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${backgroundImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-4xl mx-auto text-center">
          {/* Hero Content */}
          <motion.div
            variants={itemVariants}
            className="relative z-10 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              {language === 'da' 
                ? 'Team SEA er en dansk forening, der hjælper mennesker i nød. Vi bygger brønde og skaber håb – én donation ad gangen.'
                : 'Team SEA is a Danish non-profit helping people in need. We build wells and bring hope – one donation at a time.'
              }
            </h1>
            <AccessibleButton
              href="/donate"
              size="lg"
              className="bg-white text-primary hover:bg-gray-100"
            >
              {ctaText}
            </AccessibleButton>
          </motion.div>
        </div>

        {/* Impact Stats */}
        {impactStats.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
          >
            {impactStats.map((stat, index) => (
              <div
                key={index}
                className="bg-white/10 backdrop-blur-sm rounded-lg p-6 text-center transform transition-all hover:scale-105"
              >
                <div className="text-3xl md:text-4xl font-bold text-semantic-impact mb-2">
                  {stat.value}
                </div>
                <div className="text-white/90">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        )}
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{
              y: [0, 12, 0],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              repeatType: "loop",
            }}
            className="w-1 h-3 bg-white rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
}; 