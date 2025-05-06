import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { motion } from 'framer-motion';
import { StatCard } from '@/components/ui/StatCard';

export const DonationImpactSection: React.FC = () => {
  const { language } = useLanguage();

  const stats = [
    {
      number: '50+',
      label: language === 'da' ? 'Hjulpet mennesker' : 'People Helped',
    },
    {
      number: '1',
      label: language === 'da' ? 'Landsby' : 'Village',
    },
    {
      number: '1',
      label: language === 'da' ? 'Brønd' : 'Well',
    },
    {
      number: '0',
      label: language === 'da' ? 'Måltider' : 'Meals',
    },
  ];

  return (
    <section className="py-10 md:py-14 bg-gray-50">
      <div className="container-custom">
        <div className="max-w-2xl mx-auto text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">
            {language === 'da' ? 'Vores Indvirkning' : 'Our Impact'}
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            {language === 'da'
              ? 'Se hvordan din støtte gør en forskel i lokalsamfundene'
              : 'See how your support makes a difference in local communities'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 md:gap-8 mb-10 md:mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
            >
              <StatCard number={stat.number} label={stat.label} />
            </motion.div>
          ))}
        </div>

        <div className="bg-white rounded-2xl shadow p-5 md:p-10">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div>
              <h3 className="text-xl md:text-2xl font-bold mb-3">
                {language === 'da' ? 'Følg Vores Fremskridt' : 'Follow Our Progress'}
              </h3>
              <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                {language === 'da'
                  ? 'Besøg vores projektside for at se opdateringer og følge med i vores arbejde.'
                  : 'Visit our projects page to see updates and follow our work.'}
              </p>
              <a
                href="/projects"
                className="inline-block bg-primary text-white px-5 py-2.5 rounded-lg hover:bg-primary-dark transition-colors text-sm md:text-base"
              >
                {language === 'da' ? 'Se Projekter' : 'View Projects'}
              </a>
            </div>
            <div className="rounded-xl overflow-hidden shadow-lg">
              <img
                src="https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                alt={language === 'da' ? 'Vores projekter' : 'Our projects'}
                className="w-full h-40 md:h-56 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}; 