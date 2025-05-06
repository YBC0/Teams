import React from 'react';
import { motion } from 'framer-motion';
import { AccessibleButton } from '@/components/ui/accessible-button';
import { useLanguage } from "@/contexts/LanguageContext";

interface TeamMember {
  id: string;
  name: string;
  role: {
    da: string;
    en: string;
  };
  bio: {
    da: string;
    en: string;
  };
  imageUrl: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    email?: string;
  };
}

const TEAM_MEMBERS: TeamMember[] = [
  {
    id: '1',
    name: 'Dr. Sarah Johnson',
    role: {
      da: 'Administrerende direktør',
      en: 'Executive Director'
    },
    bio: {
      da: 'Med over 15 års erfaring inden for vandressourceforvaltning leder Sarah vores organisation med en passion for bæredygtig udvikling og lokalsamfundsstyrke.',
      en: 'With over 15 years of experience in water resource management, Sarah leads our organization with a passion for sustainable development and community empowerment.'
    },
    imageUrl: '/images/team/sarah.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/sarah-johnson',
      twitter: 'https://twitter.com/sarahjohnson',
      email: 'sarah@seahope.org',
    },
  },
  {
    id: '2',
    name: 'Michael Chen',
    role: {
      da: 'Teknisk direktør',
      en: 'Technical Director'
    },
    bio: {
      da: 'Michael bringer 12 års ingeniørekspertise til vores brøndbyggeri-projekter og sikrer de højeste standarder for kvalitet og bæredygtighed.',
      en: 'Michael brings 12 years of engineering expertise to our well construction projects, ensuring the highest standards of quality and sustainability.'
    },
    imageUrl: '/images/team/michael.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/michael-chen',
      email: 'michael@seahope.org',
    },
  },
  {
    id: '3',
    name: 'Grace Mwangi',
    role: {
      da: 'Lokalsamfundsrelationer',
      en: 'Community Relations'
    },
    bio: {
      da: 'Grace arbejder direkte med lokalsamfund, opbygger relationer og sikrer, at vores projekter møder deres specifikke behov og kulturelle overvejelser.',
      en: 'Grace works directly with local communities, building relationships and ensuring our projects meet their specific needs and cultural considerations.'
    },
    imageUrl: '/images/team/grace.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/grace-mwangi',
      twitter: 'https://twitter.com/gracemwangi',
    },
  },
  {
    id: '4',
    name: 'David Okafor',
    role: {
      da: 'Feltoperationer',
      en: 'Field Operations'
    },
    bio: {
      da: 'David koordinerer vores feltoperationer, samarbejder med lokale teams og sikrer den succesfulde implementering af vores vandprojekter.',
      en: 'David oversees our field operations, coordinating with local teams and ensuring the successful implementation of our water projects.'
    },
    imageUrl: '/images/team/david.jpg',
    socialLinks: {
      linkedin: 'https://linkedin.com/in/david-okafor',
      email: 'david@seahope.org',
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

export const TeamSection: React.FC = () => {
  const { language } = useLanguage();

  const content = {
    header: {
      title: {
        da: 'Mød vores team',
        en: 'Meet Our Team'
      },
      description: {
        da: 'Vores dedikerede team samler ekspertise inden for vandressourceforvaltning, ingeniørarbejde og lokalsamfundsudvikling for at skabe en varig indvirkning.',
        en: 'Our dedicated team brings together expertise in water resource management, engineering, and community development to make a lasting impact.'
      }
    },
    cta: {
      text: {
        da: 'Vil du være en del af vores team og gøre en forskel?',
        en: 'Want to join our team and make a difference?'
      },
      button: {
        da: 'Se ledige stillinger',
        en: 'View Open Positions'
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50">
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
              {content.header.title[language]}
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              {content.header.description[language]}
            </p>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {TEAM_MEMBERS.map((member) => (
              <motion.div
                key={member.id}
                variants={itemVariants}
                className="bg-white rounded-lg shadow-sm overflow-hidden"
              >
                <div className="relative h-64">
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="text-xl font-bold">{member.name}</h3>
                    <p className="text-sm opacity-90">{member.role[language]}</p>
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-gray-600 mb-4">{member.bio[language]}</p>

                  {/* Social Links */}
                  {member.socialLinks && (
                    <div className="flex gap-4">
                      {member.socialLinks.linkedin && (
                        <a
                          href={member.socialLinks.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.twitter && (
                        <a
                          href={member.socialLinks.twitter}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                          </svg>
                        </a>
                      )}
                      {member.socialLinks.email && (
                        <a
                          href={`mailto:${member.socialLinks.email}`}
                          className="text-gray-400 hover:text-primary transition-colors"
                        >
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                          </svg>
                        </a>
                      )}
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Call to Action */}
          <motion.div
            variants={itemVariants}
            className="text-center mt-12"
          >
            <p className="text-gray-600 mb-4">
              {content.cta.text[language]}
            </p>
            <AccessibleButton
              href="/careers"
              size="lg"
              className="bg-primary text-white hover:bg-primary/90"
            >
              {content.cta.button[language]}
            </AccessibleButton>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}; 