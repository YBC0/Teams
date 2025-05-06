import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";

interface FAQ {
  id: string;
  question: {
    da: string;
    en: string;
  };
  answer: {
    da: string;
    en: string;
  };
  category: 'donation' | 'impact' | 'organization';
}

const FAQS: FAQ[] = [
  {
    id: '1',
    question: {
      da: 'Hvordan bruges min donation?',
      en: 'How is my donation used?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'donation',
  },
  {
    id: '2',
    question: {
      da: 'Hvor lang tid tager det at bygge en brønd?',
      en: 'How long does it take to build a well?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'impact',
  },
  {
    id: '3',
    question: {
      da: 'Kan jeg vælge hvor min donation går hen?',
      en: 'Can I choose where my donation goes?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'donation',
  },
  {
    id: '4',
    question: {
      da: 'Hvordan sikrer I at brøndene er bæredygtige?',
      en: 'How do you ensure the wells are sustainable?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'impact',
  },
  {
    id: '5',
    question: {
      da: 'Er min donation fradragsberettiget?',
      en: 'Is my donation tax-deductible?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'donation',
  },
  {
    id: '6',
    question: {
      da: 'Hvordan vælger I lokalsamfund til brøndprojekter?',
      en: 'How do you select communities for well projects?'
    },
    answer: {
      da: 'Kommer snart',
      en: 'Coming soon'
    },
    category: 'organization',
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

export const FAQSection: React.FC = () => {
  const { language } = useLanguage();
  const [activeCategory, setActiveCategory] = useState<'all' | 'donation' | 'impact' | 'organization'>('all');
  const [openFaqId, setOpenFaqId] = useState<string | null>(null);

  const filteredFaqs = FAQS.filter(
    (faq) => activeCategory === 'all' || faq.category === activeCategory
  );

  const toggleFaq = (id: string) => {
    setOpenFaqId(openFaqId === id ? null : id);
  };

  const content = {
    title: {
      da: 'Ofte stillede spørgsmål',
      en: 'Frequently Asked Questions'
    },
    description: {
      da: 'Find svar på almindelige spørgsmål om vores arbejde og hvordan din donation gør en forskel.',
      en: 'Find answers to common questions about our work and how your donation makes an impact.'
    },
    categories: {
      all: {
        da: 'Alle spørgsmål',
        en: 'All Questions'
      },
      donation: {
        da: 'Donationer',
        en: 'Donations'
      },
      impact: {
        da: 'Indvirkning',
        en: 'Impact'
      },
      organization: {
        da: 'Organisation',
        en: 'Organization'
      }
    },
    cta: {
      text: {
        da: 'Har du stadig spørgsmål? Vi er her for at hjælpe.',
        en: "Still have questions? We're here to help."
      },
      button: {
        da: 'Kontakt os',
        en: 'Contact Us'
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
        <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
          {filteredFaqs.map((faq, idx) => (
            <div key={faq.id} className="rounded-xl border border-gray-100 shadow-sm bg-gray-50 overflow-hidden">
              <button
                className="w-full flex justify-between items-center px-4 py-4 sm:px-6 sm:py-5 text-left focus:outline-none focus:ring-2 focus:ring-primary/30 transition-all"
                onClick={() => toggleFaq(faq.id)}
                aria-expanded={openFaqId === faq.id}
                aria-controls={`faq-content-${faq.id}`}
              >
                <span className="font-semibold text-gray-900 text-base sm:text-lg">
                  {faq.question[language]}
                </span>
                <span className="ml-4 text-primary text-xl">
                  {openFaqId === faq.id ? '-' : '+'}
                </span>
              </button>
              <div
                id={`faq-content-${faq.id}`}
                className={`px-4 pb-4 sm:px-6 sm:pb-5 text-gray-700 text-sm sm:text-base transition-all duration-300 ${openFaqId === faq.id ? 'block' : 'hidden'}`}
              >
                {faq.answer[language]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}; 