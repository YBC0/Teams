import { create } from 'zustand';
import { Language } from '../types/common';

export interface HomepageSection {
  id: string;
  type: 'hero' | 'mission' | 'values' | 'progress' | 'impact' | 'process' | 'partners' | 'faq' | 'contact';
  order: number;
  content: {
    da: {
      title?: string;
      subtitle?: string;
      description?: string;
      buttonText?: string;
      secondaryButtonText?: string;
      buttonLink?: string;
      secondaryButtonLink?: string;
      counters?: Array<{ label: string; value: number }>;
      items?: Array<{
        id: string;
        title?: string;
        description?: string;
        image?: string;
        link?: string;
        text?: string;
        author?: string;
        role?: string;
        icon?: string;
      }>;
      text?: string;
      author?: string;
      role?: string;
      image?: string;
      address?: string;
      phone?: string;
      email?: string;
      openingHours?: string;
      icon?: string;
      impactTitle?: string;
      impactDescription?: string;
      impactButton?: string;
    };
    en: {
      title?: string;
      subtitle?: string;
      description?: string;
      buttonText?: string;
      secondaryButtonText?: string;
      buttonLink?: string;
      secondaryButtonLink?: string;
      counters?: Array<{ label: string; value: number }>;
      items?: Array<{
        id: string;
        title?: string;
        description?: string;
        image?: string;
        link?: string;
        text?: string;
        author?: string;
        role?: string;
        icon?: string;
      }>;
      text?: string;
      author?: string;
      role?: string;
      image?: string;
      address?: string;
      phone?: string;
      email?: string;
      openingHours?: string;
      icon?: string;
      impactTitle?: string;
      impactDescription?: string;
      impactButton?: string;
    };
  };
  settings: {
    layout?: 'default' | 'alternate' | 'grid';
    backgroundColor?: string;
    textColor?: string;
    buttonStyle?: 'primary' | 'secondary' | 'outline';
  };
}

interface HomepageState {
  sections: HomepageSection[];
  updateSection: (id: string, updates: Partial<HomepageSection>) => void;
  addSection: (section: Omit<HomepageSection, 'id'>) => void;
  removeSection: (id: string) => void;
  reorderSections: (newOrder: string[]) => void;
}

export const useHomepageStore = create<HomepageState>((set) => ({
  sections: [
    {
      id: 'hero',
      type: 'hero',
      order: 1,
      content: {
        da: {
          title: 'Team SEA er en dansk forening, der hjælper mennesker i nød. Vi bygger brønde og skaber håb – én donation ad gangen.',
          buttonText: 'Læs mere',
          secondaryButtonText: 'Doner nu',
          buttonLink: '/about',
          secondaryButtonLink: '/donate',
          image: '/images/hero-bg.jpg'
        },
        en: {
          title: 'Team SEA is a Danish association helping people in need. We build wells and create hope – one donation at a time.',
          buttonText: 'Read more',
          secondaryButtonText: 'Donate now',
          buttonLink: '/about',
          secondaryButtonLink: '/donate',
          image: '/images/hero-bg.jpg'
        }
      },
      settings: {
        layout: 'default',
        backgroundColor: '#ffffff',
        textColor: '#000000',
        buttonStyle: 'primary'
      }
    },
    {
      id: 'mission',
      type: 'mission',
      order: 2,
      content: {
        da: {
          title: 'Vores mission',
          description: 'Vi er dedikerede til at yde humanitær støtte til mennesker i nød. Gennem vores projekter og samarbejde sigter vi mod at skabe varig forandring og forbedre liv.',
          subtitle: 'Vores vision',
          text: 'En verden, hvor alle mennesker har adgang til de ressourcer, de har brug for. Vi mener, at humanitær støtte er en grundlæggende ret og et hjørnesten i bæredygtig udvikling.',
          icon: '🎯'
        },
        en: {
          title: 'Our Mission',
          description: 'We are dedicated to providing humanitarian aid to people in need. Through our projects and partnerships, we aim to create lasting change and improve lives.',
          subtitle: 'Our Vision',
          text: 'A world where all people have access to the resources they need. We believe that humanitarian aid is a fundamental right and a cornerstone of sustainable development.',
          icon: '🎯'
        }
      },
      settings: {
        layout: 'default',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    },
    {
      id: 'values',
      type: 'values',
      order: 3,
      content: {
        da: {
          title: 'Vores kerneværdier',
          items: [
            {
              id: '1',
              title: 'Bæredygtighed',
              description: 'Vi sikrer langsigtet indvirkning gennem bæredygtige løsninger og vedligeholdelse af vores projekter, fra brønde til humanitær nødhjælp.',
              icon: '🌱'
            },
            {
              id: '2',
              title: 'Gennemsigtighed',
              description: 'Vi opretholder fuld gennemsigtighed i vores operationer og giver detaljerede rapporter om, hvordan donationer bruges til at hjælpe mennesker i nød.',
              icon: '🔍'
            },
            {
              id: '3',
              title: 'Fællesskab',
              description: 'Vi arbejder tæt sammen med lokale samfund og organisationer for at identificere og løse de mest presserende humanitære behov.',
              icon: '🤝'
            },
            {
              id: '4',
              title: 'Innovation',
              description: 'Vi forbedrer kontinuerligt vores metoder og teknologier for at levere den bedste humanitære støtte og maksimere vores indvirkning.',
              icon: '💡'
            }
          ]
        },
        en: {
          title: 'Our Core Values',
          items: [
            {
              id: '1',
              title: 'Sustainability',
              description: 'We ensure long-term impact through sustainable solutions and maintenance of our projects, from wells to humanitarian aid.',
              icon: '🌱'
            },
            {
              id: '2',
              title: 'Transparency',
              description: 'We maintain full transparency in our operations and provide detailed reports on how donations are used to help people in need.',
              icon: '🔍'
            },
            {
              id: '3',
              title: 'Community',
              description: 'We work closely with local communities and organizations to identify and address the most pressing humanitarian needs.',
              icon: '🤝'
            },
            {
              id: '4',
              title: 'Innovation',
              description: 'We continuously improve our methods and technologies to deliver the best humanitarian aid and maximize our impact.',
              icon: '💡'
            }
          ]
        }
      },
      settings: {
        layout: 'grid',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    },
    {
      id: 'progress',
      type: 'progress',
      order: 4,
      content: {
        da: {
          title: 'Vores fremskridt',
          description: 'Følg vores fremskridt, mens vi arbejder mod vores mål om at yde humanitær støtte til dem, der har brug for os.',
          counters: [
            { label: 'Hjulpet mennesker', value: 50 },
            { label: 'Landsby', value: 1 },
            { label: 'Brønd', value: 1 },
            { label: 'Måltider', value: 0 }
          ]
        },
        en: {
          title: 'Our Progress',
          description: 'Track our progress as we work towards our goal of providing humanitarian aid to those who need us.',
          counters: [
            { label: 'People Helped', value: 50 },
            { label: 'Village', value: 1 },
            { label: 'Well', value: 1 },
            { label: 'Meals', value: 0 }
          ]
        }
      },
      settings: {
        layout: 'default',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    },
    {
      id: 'process',
      type: 'process',
      order: 5,
      content: {
        da: {
          title: 'Sådan gør din donation en forskel',
          subtitle: 'Se hvordan din støtte skaber forandring – trin for trin.',
          items: [
            {
              id: '1',
              title: 'Identifikation af behov',
              description: 'Vi samarbejder med lokale partnere og organisationer for at finde de områder, hvor behovet for rent vand og livsvigtige ressourcer er størst.',
              icon: '💧'
            },
            {
              id: '2',
              title: 'Omhyggelig planlægning',
              description: 'Vi planlægger nøje, hvordan vi bedst kan levere brønde og andre ressourcer, så hjælpen skaber størst mulig værdi for lokalsamfundet.',
              icon: '🔍'
            },
            {
              id: '3',
              title: 'Konstruktion',
              description: 'Vores erfarne samarbejdspartnere bygger brønde og leverer humanitær støtte, så flere får adgang til rent vand og andre nødvendige ressourcer.',
              icon: '🏗️'
            },
            {
              id: '4',
              title: 'Opfølgning og opdateringer',
              description: 'Vi følger op på vores projekter og opdaterer løbende om, hvordan brønde og ressourcer gør en forskel for mennesker i nød.',
              icon: '📊'
            }
          ]
        },
        en: {
          title: 'How Your Donation Makes a Difference',
          subtitle: 'See how your support creates change – step by step.',
          items: [
            {
              id: '1',
              title: 'Need Identification',
              description: 'We work with local partners and organizations to find areas where the need for clean water and vital resources is greatest.',
              icon: '💧'
            },
            {
              id: '2',
              title: 'Careful Planning',
              description: 'We carefully plan how best to deliver wells and other resources so that the aid creates maximum value for the local community.',
              icon: '🔍'
            },
            {
              id: '3',
              title: 'Construction',
              description: 'Our experienced partners build wells and deliver humanitarian aid, giving more people access to clean water and other necessary resources.',
              icon: '🏗️'
            },
            {
              id: '4',
              title: 'Follow-up and Updates',
              description: 'We follow up on our projects and provide regular updates on how wells and resources make a difference for people in need.',
              icon: '📊'
            }
          ]
        }
      },
      settings: {
        layout: 'grid',
        backgroundColor: '#f3f4f6',
        textColor: '#000000'
      }
    },
    {
      id: 'partners',
      type: 'partners',
      order: 6,
      content: {
        da: {
          title: 'Skal din virksomhed stå her?',
          description: 'Vi samarbejder med virksomheder og organisationer, der deler vores vision om at gøre en forskel.',
          items: [
            {
              id: '1',
              title: 'Partner 1',
              description: 'En af vores mest betroede partnere i brøndbyggeri og vandprojekter.',
              image: '/images/partner1.jpg'
            },
            {
              id: '2',
              title: 'Partner 2',
              description: 'Specialiseret i bæredygtige vandløsninger og infrastruktur.',
              image: '/images/partner2.jpg'
            },
            {
              id: '3',
              title: 'Partner 3',
              description: 'Fokuserer på sundhed og sanitære forhold i udviklingslande.',
              image: '/images/partner3.jpg'
            }
          ]
        },
        en: {
          title: 'Should Your Company Be Here?',
          description: 'We partner with companies and organizations that share our vision of making a difference.',
          items: [
            {
              id: '1',
              title: 'Partner 1',
              description: 'One of our most trusted partners in well construction and water projects.',
              image: '/images/partner1.jpg'
            },
            {
              id: '2',
              title: 'Partner 2',
              description: 'Specialized in sustainable water solutions and infrastructure.',
              image: '/images/partner2.jpg'
            },
            {
              id: '3',
              title: 'Partner 3',
              description: 'Focused on health and sanitation in developing countries.',
              image: '/images/partner3.jpg'
            }
          ]
        }
      },
      settings: {
        layout: 'grid',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    },
    {
      id: 'faq',
      type: 'faq',
      order: 7,
      content: {
        da: {
          title: 'Ofte stillede spørgsmål',
          description: 'Find svar på almindelige spørgsmål om vores arbejde og hvordan din donation gør en forskel.',
          items: [
            {
              id: '1',
              title: 'Hvordan bruges min donation?',
              description: 'Vi bruger dine donationer til at bygge brønde og levere rent vand til samfund i udviklingslande. Hver krone går direkte til vores projekter.'
            },
            {
              id: '2',
              title: 'Hvor lang tid tager det at bygge en brønd?',
              description: 'Det tager typisk 2-3 måneder at bygge en brønd, afhængigt af lokale forhold og kompleksitet.'
            },
            {
              id: '3',
              title: 'Kan jeg vælge hvor min donation går hen?',
              description: 'Ja, du kan specificere hvilket projekt eller område du ønsker at støtte med din donation.'
            }
          ]
        },
        en: {
          title: 'Frequently Asked Questions',
          description: 'Find answers to common questions about our work and how your donation makes a difference.',
          items: [
            {
              id: '1',
              title: 'How is my donation used?',
              description: 'We use your donations to build wells and provide clean water to communities in developing countries. Every penny goes directly to our projects.'
            },
            {
              id: '2',
              title: 'How long does it take to build a well?',
              description: 'It typically takes 2-3 months to build a well, depending on local conditions and complexity.'
            },
            {
              id: '3',
              title: 'Can I choose where my donation goes?',
              description: 'Yes, you can specify which project or area you want to support with your donation.'
            }
          ]
        }
      },
      settings: {
        layout: 'default',
        backgroundColor: '#f3f4f6',
        textColor: '#000000'
      }
    },
    {
      id: 'contact',
      type: 'contact',
      order: 8,
      content: {
        da: {
          title: 'Kontakt os',
          description: 'Har du spørgsmål om vores arbejde eller hvordan du kan hjælpe? Vi vil meget gerne høre fra dig.',
          address: '123 Vandvej\nKøbenhavn, 2100\nDanmark',
          phone: '+45 12 34 56 78',
          email: 'info@seahope.org\ndonationer@seahope.org',
          openingHours: 'Mandag - Fredag, 9-17'
        },
        en: {
          title: 'Contact Us',
          description: 'Do you have questions about our work or how you can help? We would love to hear from you.',
          address: '123 Water Street\nCopenhagen, 2100\nDenmark',
          phone: '+45 12 34 56 78',
          email: 'info@seahope.org\ndonations@seahope.org',
          openingHours: 'Monday - Friday, 9-17'
        }
      },
      settings: {
        layout: 'default',
        backgroundColor: '#ffffff',
        textColor: '#000000'
      }
    }
  ],
  updateSection: (id, updates) =>
    set((state) => ({
      sections: state.sections.map((section) =>
        section.id === id ? { ...section, ...updates } : section
      ),
    })),
  addSection: (section) =>
    set((state) => ({
      sections: [...state.sections, { ...section, id: Math.random().toString() }],
    })),
  removeSection: (id) =>
    set((state) => ({
      sections: state.sections.filter((section) => section.id !== id),
    })),
  reorderSections: (newOrder) =>
    set((state) => ({
      sections: newOrder.map((id, index) => {
        const section = state.sections.find((s) => s.id === id);
        return section ? { ...section, order: index + 1 } : null;
      }).filter((section): section is HomepageSection => section !== null),
    })),
})); 