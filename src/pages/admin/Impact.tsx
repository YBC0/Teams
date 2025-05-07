import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { PageSection } from '../../types/admin';
import { Language } from '../../types/common';

const Impact: FC = () => {
  const { state } = useAdmin();
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: 'hero',
      type: 'hero',
      order: 1,
      content: {
        da: {
          title: 'Vores Indvirkning',
          subtitle: 'Måling af vores indsats for havbevarelse',
          buttonText: 'Se mere',
          buttonLink: '/impact',
        },
        en: {
          title: 'Our Impact',
          subtitle: 'Measuring our efforts in ocean conservation',
          buttonText: 'Learn More',
          buttonLink: '/impact',
        },
      },
    },
    {
      id: 'stats',
      type: 'counter',
      order: 2,
      content: {
        da: {
          counters: [
            { label: 'Ton Affald Fjernet', value: 1500 },
            { label: 'Kystlinje Rengjort', value: 250 },
            { label: 'Frivillige Involveret', value: 5000 },
          ],
        },
        en: {
          counters: [
            { label: 'Tons of Waste Removed', value: 1500 },
            { label: 'Coastline Cleaned', value: 250 },
            { label: 'Volunteers Engaged', value: 5000 },
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
          Impact Page Editor
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

            {section.type === 'counter' && (
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                {section.content[currentLanguage].counters?.map((counter, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {counter.label}
                    </label>
                    <input
                      type="number"
                      value={counter.value}
                      onChange={(e) => {
                        const newCounters = [...(section.content[currentLanguage].counters || [])];
                        newCounters[index] = { ...counter, value: parseInt(e.target.value) };
                        handleSectionUpdate(section.id, {
                          content: {
                            ...section.content,
                            [currentLanguage]: {
                              ...section.content[currentLanguage],
                              counters: newCounters,
                            },
                          },
                        });
                      }}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Impact; 