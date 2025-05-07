import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { PageSection } from '../../types/admin';
import { Language } from '../../types/common';

const Journey: FC = () => {
  const { state } = useAdmin();
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: 'hero',
      type: 'hero',
      order: 1,
      content: {
        da: {
          title: 'Vores Rejse',
          subtitle: 'Fra vision til virkelighed',
          buttonText: 'Læs mere',
          buttonLink: '/journey',
        },
        en: {
          title: 'Our Journey',
          subtitle: 'From vision to reality',
          buttonText: 'Read More',
          buttonLink: '/journey',
        },
      },
    },
    {
      id: 'timeline',
      type: 'text',
      order: 2,
      content: {
        da: {
          title: 'Vores Milepæle',
          content: '2020: Grundlæggelse - Organisationen blev grundlagt med en vision om at beskytte vores have\n\n2021: Første Projekt - Lancering af vores første havrensningsinitiativ',
        },
        en: {
          title: 'Our Milestones',
          content: '2020: Foundation - The organization was founded with a vision to protect our oceans\n\n2021: First Project - Launch of our first ocean cleanup initiative',
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
          Journey Page Editor
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

            {section.type === 'hero' && (
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
                    Subtitle
                  </label>
                  <input
                    type="text"
                    value={section.content[currentLanguage].subtitle || ''}
                    onChange={(e) =>
                      handleSectionUpdate(section.id, {
                        content: {
                          ...section.content,
                          [currentLanguage]: {
                            ...section.content[currentLanguage],
                            subtitle: e.target.value,
                          },
                        },
                      })
                    }
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}

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
                    rows={8}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Journey; 