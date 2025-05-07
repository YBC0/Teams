import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { PageSection } from '../../types/admin';
import { Language } from '../../types/common';

const Contact: FC = () => {
  const { state: { currentLanguage } } = useAdmin();
  const [sections, setSections] = useState<PageSection[]>([
    {
      id: 'contact-info',
      type: 'text',
      order: 1,
      content: {
        en: {
          title: 'Contact Information',
          content: 'Our office is located in Copenhagen, Denmark.\n\nEmail: contact@sea.org\nPhone: +45 XX XX XX XX\nAddress: Copenhagen, Denmark',
        },
        da: {
          title: 'Kontaktoplysninger',
          content: 'Vores kontor ligger i København, Danmark.\n\nE-mail: contact@sea.org\nTelefon: +45 XX XX XX XX\nAdresse: København, Danmark',
        },
      },
    },
    {
      id: 'contact-form',
      type: 'text',
      order: 2,
      content: {
        en: {
          title: 'Contact Form',
          content: 'Please use the form below to get in touch with us. We will get back to you as soon as possible.',
        },
        da: {
          title: 'Kontaktformular',
          content: 'Brug venligst formularen nedenfor til at kontakte os. Vi vender tilbage til dig hurtigst muligt.',
        },
      },
    },
  ]);

  const handleSectionUpdate = (sectionId: string, field: string, value: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          content: {
            ...section.content,
            [currentLanguage]: {
              ...section.content[currentLanguage],
              [field]: value,
            },
          },
        };
      }
      return section;
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Contact Page</h1>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      {sections.map(section => (
        <div key={section.id} className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">
              <input
                type="text"
                className="input input-bordered w-full"
                value={section.content[currentLanguage].title || ''}
                onChange={(e) => handleSectionUpdate(section.id, 'title', e.target.value)}
                placeholder="Section Title"
              />
            </h2>
            <div className="mt-4">
              <textarea
                className="textarea textarea-bordered w-full h-32"
                value={section.content[currentLanguage].content || ''}
                onChange={(e) => handleSectionUpdate(section.id, 'content', e.target.value)}
                placeholder="Section Content"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Contact; 