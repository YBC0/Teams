import { FC, useState } from 'react';
import { useHomepageStore } from '../../stores/homepageStore';
import { useAdmin } from '../../hooks/useAdmin';
import { PhotoIcon, CheckIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion } from 'framer-motion';
import { Language } from '../../types/common';

const HomepageEditor: FC = () => {
  const { sections, updateSection } = useHomepageStore();
  const { isAdmin, isLoading } = useAdmin();
  const [editingField, setEditingField] = useState<{ sectionId: string; field: string; lang: Language } | null>(null);
  const [editValue, setEditValue] = useState('');
  const [uploadingImage, setUploadingImage] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState<Language>('da');

  if (!isAdmin) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  const handleImageUpload = async (sectionId: string, field: string, lang: Language) => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;

      setUploadingImage(`${sectionId}-${field}-${lang}`);
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) throw new Error('Upload failed');

        const data = await response.json();
        const section = sections.find(s => s.id === sectionId);
        if (!section) return;

        const content = { ...section.content };
        if (field.includes('.')) {
          const [itemField, itemId] = field.split('.');
          const items = [...(content[lang].items || [])];
          const itemIndex = items.findIndex(item => item.id === itemId);
          if (itemIndex !== -1) {
            items[itemIndex] = { ...items[itemIndex], [itemField]: data.url };
            content[lang] = { ...content[lang], items };
          }
        } else {
          content[lang] = { ...content[lang], [field]: data.url };
        }

        updateSection(sectionId, { content });
      } catch (error) {
        console.error('Upload failed:', error);
      } finally {
        setUploadingImage(null);
      }
    };
    input.click();
  };

  const startEdit = (sectionId: string, field: string, lang: Language, value: string) => {
    setEditingField({ sectionId, field, lang });
    setEditValue(value);
  };

  const saveEdit = () => {
    if (!editingField) return;

    const { sectionId, field, lang } = editingField;
    const section = sections.find(s => s.id === sectionId);
    if (!section) return;

    const content = { ...section.content };
    if (field.includes('.')) {
      const [itemField, itemId] = field.split('.');
      const items = [...(content[lang].items || [])];
      const itemIndex = items.findIndex(item => item.id === itemId);
      if (itemIndex !== -1) {
        items[itemIndex] = { ...items[itemIndex], [itemField]: editValue };
        content[lang] = { ...content[lang], items };
      }
    } else {
      content[lang] = { ...content[lang], [field]: editValue };
    }

    updateSection(sectionId, { content });
    setEditingField(null);
  };

  const renderEditableField = (sectionId: string, field: string, lang: Language, value: string, className: string = '') => {
    if (editingField?.sectionId === sectionId && editingField?.field === field && editingField?.lang === lang) {
      return (
        <div className="flex items-center gap-2 bg-gray-900 p-4 rounded-lg shadow-lg">
          <textarea
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            className="w-full min-h-[100px] p-2 border border-gray-700 rounded bg-gray-800 text-white text-base"
            autoFocus
          />
          <div className="flex flex-col gap-2">
            <button onClick={saveEdit} className="text-green-400 hover:text-green-300">
              <CheckIcon className="w-6 h-6" />
            </button>
            <button onClick={() => setEditingField(null)} className="text-red-400 hover:text-red-300">
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      );
    }

    return (
      <div
        onClick={() => startEdit(sectionId, field, lang, value)}
        className={`cursor-pointer hover:bg-white/10 rounded px-2 py-1 ${className}`}
      >
        {value}
      </div>
    );
  };

  const renderEditableImage = (sectionId: string, field: string, lang: Language, imageUrl: string, className: string = '') => {
    const isUploading = uploadingImage === `${sectionId}-${field}-${lang}`;

    return (
      <div className="relative group">
        <div className={`${className} bg-gray-100 flex items-center justify-center`}>
          <img 
            src={imageUrl} 
            alt="" 
            className="w-full h-full object-cover"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.parentElement?.classList.add('bg-gray-100');
            }}
          />
        </div>
        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <button
            onClick={() => handleImageUpload(sectionId, field, lang)}
            className="bg-white p-2 rounded-full"
            disabled={isUploading}
          >
            {isUploading ? (
              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
            ) : (
              <PhotoIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    );
  };

  const renderSection = (section: typeof sections[0]) => {
    switch (section.type) {
      case 'hero':
        return (
          <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
            {/* Background Image with Overlay */}
            <div className="absolute inset-0 z-0">
              {section.content[currentLang].image && (
                <div className="absolute inset-0">
                  {renderEditableImage(section.id, 'image', currentLang, section.content[currentLang].image!, 'w-full h-full object-cover')}
                </div>
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 to-primary-800/80" />
            </div>

            {/* Content */}
            <div className="relative z-10 container mx-auto px-4 py-16 md:py-24">
              <div className="max-w-4xl mx-auto text-center">
                <div className="mt-auto mb-8">
                  {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-xl md:text-2xl text-white/90 max-w-2xl mx-auto')}
                </div>
                {section.content[currentLang].buttonText && (
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button className="bg-primary text-white hover:bg-primary/90 px-6 py-3 rounded-lg text-base font-semibold transition-colors">
                      {renderEditableField(section.id, 'buttonText', currentLang, section.content[currentLang].buttonText!, '')}
                    </button>
                    <button className="bg-white text-primary hover:bg-gray-100 px-6 py-3 rounded-lg text-base font-semibold transition-colors border-2">
                      {renderEditableField(section.id, 'secondaryButtonText', currentLang, section.content[currentLang].secondaryButtonText || '', '')}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </section>
        );

      case 'mission':
        return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              {/* Mission & Vision Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                <div className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                  <div className="text-3xl mb-2">{section.content[currentLang].icon}</div>
                  {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-xl font-bold mb-2')}
                  {renderEditableField(section.id, 'description', currentLang, section.content[currentLang].description!, 'text-gray-700 text-base max-w-md')}
                </div>
                <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 shadow-md flex flex-col items-center text-center">
                  <div className="text-3xl mb-2">🌍</div>
                  {renderEditableField(section.id, 'subtitle', currentLang, section.content[currentLang].subtitle!, 'text-xl font-bold mb-2')}
                  {renderEditableField(section.id, 'text', currentLang, section.content[currentLang].text!, 'text-gray-700 text-base max-w-md')}
                </div>
              </div>
            </div>
          </section>
        );

      case 'values':
        return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="mt-12 mb-8">
                {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-2xl font-bold text-gray-900 text-center mb-8')}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {section.content[currentLang].items?.map((item) => (
                    <div key={item.id} className="bg-gradient-to-br from-primary/5 to-primary/10 rounded-xl p-8 shadow-md text-center hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
                      <div className="text-4xl mb-4">{item.icon}</div>
                      {renderEditableField(section.id, `title.${item.id}`, currentLang, item.title!, 'text-xl font-semibold mb-2')}
                      {renderEditableField(section.id, `description.${item.id}`, currentLang, item.description!, 'text-gray-600')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'progress':
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-2xl font-bold text-gray-900 text-center mb-4')}
              {renderEditableField(section.id, 'description', currentLang, section.content[currentLang].description!, 'text-xl text-gray-600 text-center mb-12')}
              <div className="grid md:grid-cols-4 gap-8">
                {section.content[currentLang].counters?.map((counter, index) => (
                  <div key={index} className="text-center">
                    <div className="text-4xl font-bold text-blue-600 mb-2">{counter.value}+</div>
                    {renderEditableField(section.id, `counters.${index}.label`, currentLang, counter.label, 'text-lg text-gray-600')}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'process':
        return (
          <div className="py-20 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-4xl font-bold text-center mb-4')}
              {renderEditableField(section.id, 'subtitle', currentLang, section.content[currentLang].subtitle!, 'text-xl text-gray-600 text-center mb-12')}
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                {section.content[currentLang].items?.map((item) => (
                  <div key={item.id} className="text-center">
                    <div className="text-4xl mb-4">{item.icon}</div>
                    {renderEditableField(section.id, `title.${item.id}`, currentLang, item.title!, 'text-xl font-semibold mb-2')}
                    {renderEditableField(section.id, `description.${item.id}`, currentLang, item.description!, 'text-gray-600')}
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case 'partners':
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-2xl font-bold text-gray-900 text-center mb-4')}
              {renderEditableField(section.id, 'description', currentLang, section.content[currentLang].description!, 'text-xl text-gray-600 text-center mb-12')}
              <div className="grid md:grid-cols-3 gap-8">
                {section.content[currentLang].items?.map((item) => (
                  <div key={item.id} className="bg-white p-6 rounded-lg shadow-sm">
                    {item.image && renderEditableImage(section.id, `image.${item.id}`, currentLang, item.image, 'w-full h-48 object-cover rounded-lg mb-4')}
                    {renderEditableField(section.id, `title.${item.id}`, currentLang, item.title!, 'text-xl font-semibold mb-2')}
                    {renderEditableField(section.id, `description.${item.id}`, currentLang, item.description!, 'text-gray-600')}
                  </div>
                ))}
              </div>
            </div>
          </section>
        );

      case 'faq':
        return (
          <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
              <div className="max-w-4xl mx-auto">
                {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-2xl font-bold text-gray-900 text-center mb-4')}
                {renderEditableField(section.id, 'description', currentLang, section.content[currentLang].description!, 'text-xl text-gray-600 text-center mb-12')}
                <div className="space-y-4">
                  {section.content[currentLang].items?.map((item) => (
                    <div key={item.id} className="border rounded-lg p-4">
                      {renderEditableField(section.id, `title.${item.id}`, currentLang, item.title!, 'text-lg font-semibold mb-2')}
                      {renderEditableField(section.id, `description.${item.id}`, currentLang, item.description!, 'text-gray-600')}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        );

      case 'contact':
        return (
          <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
              {renderEditableField(section.id, 'title', currentLang, section.content[currentLang].title!, 'text-2xl font-bold text-gray-900 text-center mb-4')}
              {renderEditableField(section.id, 'description', currentLang, section.content[currentLang].description!, 'text-xl text-gray-600 text-center mb-12')}
              <div className="grid md:grid-cols-2 gap-12">
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Kontaktoplysninger</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-2xl mb-2">📍</div>
                      {renderEditableField(section.id, 'address', currentLang, section.content[currentLang].address!, 'text-gray-600 whitespace-pre-line')}
                    </div>
                    <div>
                      <div className="text-2xl mb-2">📞</div>
                      {renderEditableField(section.id, 'phone', currentLang, section.content[currentLang].phone!, 'text-gray-600')}
                      <div className="text-sm text-gray-500">
                        {renderEditableField(section.id, 'openingHours', currentLang, section.content[currentLang].openingHours!, '')}
                      </div>
                    </div>
                    <div>
                      <div className="text-2xl mb-2">✉️</div>
                      {renderEditableField(section.id, 'email', currentLang, section.content[currentLang].email!, 'text-gray-600 whitespace-pre-line')}
                    </div>
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl font-semibold mb-6">Send os en besked</h3>
                  <form className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Dit navn</label>
                      <input type="text" className="w-full border rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Din e-mail</label>
                      <input type="email" className="w-full border rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Emne</label>
                      <input type="text" className="w-full border rounded-lg px-4 py-2" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Besked</label>
                      <textarea className="w-full border rounded-lg px-4 py-2 h-32"></textarea>
                    </div>
                    <button type="submit" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      Send besked
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="sticky top-0 z-50 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Homepage Editor</h1>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setCurrentLang('da')}
                className={`px-3 py-1 rounded ${currentLang === 'da' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                DA
              </button>
              <button
                onClick={() => setCurrentLang('en')}
                className={`px-3 py-1 rounded ${currentLang === 'en' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                EN
              </button>
            </div>
            <button
              onClick={() => {
                // Save changes to the homepage
                console.log('Saving changes...');
              }}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {sections.map((section) => (
          <motion.div
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {renderSection(section)}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default HomepageEditor; 