import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";

interface NewsletterFormData {
  email: string;
  interests: string[];
}

interface Interest {
  id: string;
  label: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
}

const INTERESTS: Interest[] = [
  {
    id: 'impact',
    label: {
      da: 'Indvirkningshistorier',
      en: 'Impact Stories'
    },
    description: {
      da: 'Månedlige opdateringer om, hvordan din støtte ændrer liv',
      en: 'Monthly updates on how your support is changing lives'
    },
  },
  {
    id: 'projects',
    label: {
      da: 'Projektopdateringer',
      en: 'Project Updates'
    },
    description: {
      da: 'Fremskridtsrapporter om vores brøndbyggeri-projekter',
      en: 'Progress reports on our well construction projects'
    },
  },
  {
    id: 'events',
    label: {
      da: 'Begivenheder & Frivillighed',
      en: 'Events & Volunteering'
    },
    description: {
      da: 'Muligheder for at blive involveret og gøre en forskel',
      en: 'Opportunities to get involved and make a difference'
    },
  },
  {
    id: 'news',
    label: {
      da: 'Nyheder & Meddelelser',
      en: 'News & Announcements'
    },
    description: {
      da: 'Seneste nyheder om vores organisation og mission',
      en: 'Latest news about our organization and mission'
    },
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

export const NewsletterSection: React.FC = () => {
  const { language } = useLanguage();
  const [formData, setFormData] = useState<NewsletterFormData>({
    email: '',
    interests: [],
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({ ...prev, email: e.target.value }));
  };

  const handleInterestToggle = (interestId: string) => {
    setFormData((prev) => {
      const interests = prev.interests.includes(interestId)
        ? prev.interests.filter((id) => id !== interestId)
        : [...prev.interests, interestId];
      return { ...prev, interests };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // Here you would typically make an API call to submit the form
      await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulated API call
      setSubmitStatus('success');
      setFormData({ email: '', interests: [] });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const content = {
    header: {
      title: {
        da: 'Hold dig opdateret',
        en: 'Stay Updated'
      },
      description: {
        da: 'Tilmeld dig vores nyhedsbrev for at modtage opdateringer om vores arbejde, indvirkningshistorier og måder, hvorpå du kan hjælpe med at gøre en forskel.',
        en: 'Join our newsletter to receive updates about our work, impact stories, and ways you can help make a difference.'
      }
    },
    form: {
      email: {
        label: {
          da: 'E-mailadresse',
          en: 'Email Address'
        },
        placeholder: {
          da: 'Indtast din e-mailadresse',
          en: 'Enter your email address'
        }
      },
      interests: {
        label: {
          da: 'Hvad vil du gerne høre om?',
          en: 'What would you like to hear about?'
        }
      },
      submit: {
        da: 'Tilmeld nyhedsbrev',
        en: 'Subscribe to Newsletter'
      },
      submitting: {
        da: 'Tilmeldelse...',
        en: 'Subscribing...'
      },
      success: {
        da: 'Tak for din tilmelding! Tjek venligst din e-mail for at bekræfte din tilmelding.',
        en: 'Thank you for subscribing! Please check your email to confirm your subscription.'
      },
      error: {
        da: 'Der opstod en fejl ved tilmelding til nyhedsbrevet. Prøv venligst igen.',
        en: 'There was an error subscribing to the newsletter. Please try again.'
      },
      privacy: {
        text: {
          da: 'Ved at tilmelde dig accepterer du at modtage vores nyhedsbrev og accepterer vores',
          en: 'By subscribing, you agree to receive our newsletter and accept our'
        },
        link: {
          da: 'Privatlivspolitik',
          en: 'Privacy Policy'
        },
        suffix: {
          da: '. Du kan afmelde dig når som helst.',
          en: '. You can unsubscribe at any time.'
        }
      }
    }
  };

  return (
    <section className="py-16 bg-primary/5">
      <div className="container mx-auto px-4">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="max-w-4xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {content.header.title[language]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.header.description[language]}
            </p>
          </motion.div>

          {/* Newsletter Form */}
          <motion.div variants={itemVariants}>
            <form onSubmit={handleSubmit} className="bg-white rounded-lg p-8 shadow-sm" aria-label="Newsletter signup form">
              <div className="space-y-6">
                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    {content.form.email.label[language]}
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleEmailChange}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none"
                    placeholder={content.form.email.placeholder[language]}
                    aria-describedby="email-error"
                  />
                  {submitStatus === 'error' && <span id="email-error" className="sr-only">{content.form.error[language]}</span>}
                </div>

                {/* Interests */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    {content.form.interests.label[language]}
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {INTERESTS.map((interest) => (
                      <div
                        key={interest.id}
                        className={`p-4 rounded-lg border-2 transition-colors cursor-pointer ${
                          formData.interests.includes(interest.id)
                            ? 'border-primary bg-primary/5'
                            : 'border-gray-200 hover:border-primary/50'
                        }`}
                        onClick={() => handleInterestToggle(interest.id)}
                      >
                        <div className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            checked={formData.interests.includes(interest.id)}
                            onChange={() => handleInterestToggle(interest.id)}
                            className="h-4 w-4 text-primary rounded border-gray-300 focus:ring-primary"
                          />
                          <div>
                            <h4 className="font-medium text-gray-900">{interest.label[language]}</h4>
                            <p className="text-sm text-gray-600">{interest.description[language]}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <div>
                  <AccessibleButton
                    type="submit"
                    disabled={isSubmitting}
                    size="lg"
                    className="w-full bg-primary text-white hover:bg-primary/90"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center justify-center">
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {content.form.submitting[language]}
                      </span>
                    ) : (
                      content.form.submit[language]
                    )}
                  </AccessibleButton>

                  {/* Submission feedback */}
                  <div aria-live="polite" className="sr-only">
                    {submitStatus === 'success' && content.form.success[language]}
                    {submitStatus === 'error' && content.form.error[language]}
                  </div>

                  <p className="mt-4 text-xs text-gray-500 text-center">
                    {content.form.privacy.text[language]}{' '}
                    <a href="/privacy" className="text-primary hover:underline">
                      {content.form.privacy.link[language]}
                    </a>
                    {content.form.privacy.suffix[language]}
                  </p>
                </div>
              </div>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 