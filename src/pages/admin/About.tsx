import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { PageSection } from '../../types/admin';
import { Language } from '../../types/common';

const About: FC = () => {
  const { state } = useAdmin();
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: 'mission',
      type: 'text',
      order: 1,
      content: {
        da: {
          title: 'Vores Mission',
          content: 'Vi er dedikerede til at beskytte vores have og havliv gennem uddannelse, handling og samfundsengagement. Vores mål er at skabe en bæredygtig fremtid for vores oceaner.',
        },
        en: {
          title: 'Our Mission',
          content: 'We are dedicated to protecting our oceans and marine life through education, action, and community engagement. Our goal is to create a sustainable future for our oceans.',
        },
      },
    },
    {
      id: 'team',
      type: 'team',
      order: 2,
      content: {
        da: {
          title: 'Vores Team',
          items: [
            {
              title: 'John Doe',
              description: 'Grundlægger & CEO',
              image: '/images/team/john.jpg',
            },
            {
              title: 'Jane Smith',
              description: 'Marin Biolog',
              image: '/images/team/jane.jpg',
            },
          ],
        },
        en: {
          title: 'Our Team',
          items: [
            {
              title: 'John Doe',
              description: 'Founder & CEO',
              image: '/images/team/john.jpg',
            },
            {
              title: 'Jane Smith',
              description: 'Marine Biologist',
              image: '/images/team/jane.jpg',
            },
          ],
        },
      },
    },
  ]);

  const handleSectionUpdate = (sectionId: string, updates: Partial<PageSection>) => {
    setSections(sections.map(section => 
      section.id === sectionId ? { ...section, ...updates } : section
    ));
  };

  const currentLanguage = state.currentLanguage;

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">
          About Page Editor
        </h1>
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Save Changes
        </button>
      </div>

      <div className="space-y-6">
        {sections.map((section) => (
          <div
            key={section.id}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
              {section.type.charAt(0).toUpperCase() + section.type.slice(1)} Section
            </h3>

            {section.type === 'text' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Title
                  </label>
                  <input
                    type="text"
                    value={section.content[currentLanguage].title || ''}
                    onChange={(e) =>
                      handleSectionUpdate(section.id, {
                        content: {
                          ...section.content,
                          [currentLanguage]: {
                            ...section.content[currentLanguage],
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Content
                  </label>
                  <textarea
                    value={section.content[currentLanguage].content || ''}
                    onChange={(e) =>
                      handleSectionUpdate(section.id, {
                        content: {
                          ...section.content,
                          [currentLanguage]: {
                            ...section.content[currentLanguage],
                            content: e.target.value,
                          },
                        },
                      })
                    }
                    rows={4}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}

            {section.type === 'team' && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                    Section Title
                  </label>
                  <input
                    type="text"
                    value={section.content[currentLanguage].title || ''}
                    onChange={(e) =>
                      handleSectionUpdate(section.id, {
                        content: {
                          ...section.content,
                          [currentLanguage]: {
                            ...section.content[currentLanguage],
                            title: e.target.value,
                          },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  {section.content[currentLanguage].items?.map((item, index) => (
                    <div key={index} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Name
                        </label>
                        <input
                          type="text"
                          value={item.title || ''}
                          onChange={(e) => {
                            const newItems = [...(section.content[currentLanguage].items || [])];
                            newItems[index] = { ...item, title: e.target.value };
                            handleSectionUpdate(section.id, {
                              content: {
                                ...section.content,
                                [currentLanguage]: {
                                  ...section.content[currentLanguage],
                                  items: newItems,
                                },
                              },
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                          Role
                        </label>
                        <input
                          type="text"
                          value={item.description || ''}
                          onChange={(e) => {
                            const newItems = [...(section.content[currentLanguage].items || [])];
                            newItems[index] = { ...item, description: e.target.value };
                            handleSectionUpdate(section.id, {
                              content: {
                                ...section.content,
                                [currentLanguage]: {
                                  ...section.content[currentLanguage],
                                  items: newItems,
                                },
                              },
                            });
                          }}
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default About; 