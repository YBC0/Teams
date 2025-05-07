import { FC, useState } from 'react';
import { useAdmin } from '../../contexts/AdminContext';
import { SiteSettings } from '../../types/admin';
import { Language } from '../../types/common';

const Settings: FC = () => {
  const { state: { currentLanguage } } = useAdmin();
  const [settings, setSettings] = useState<SiteSettings>({
    id: '1',
    logo: {
      light: '/logo-light.png',
      dark: '/logo-dark.png',
    },
    colors: {
      primary: '#3B82F6',
      secondary: '#10B981',
      accent: '#F59E0B',
      background: '#FFFFFF',
      text: '#1F2937',
    },
    socialLinks: {
      facebook: 'https://facebook.com/sea',
      twitter: 'https://twitter.com/sea',
      instagram: 'https://instagram.com/sea',
      linkedin: 'https://linkedin.com/company/sea',
      youtube: 'https://youtube.com/sea',
    },
    contact: {
      email: 'contact@sea.org',
      phone: '+45 XX XX XX XX',
      address: {
        en: 'Copenhagen, Denmark',
        da: 'København, Danmark',
      },
    },
    seo: {
      defaultTitle: {
        en: 'Sea Hope - Protecting Our Oceans',
        da: 'Sea Hope - Beskyttelse af vores have',
      },
      defaultDescription: {
        en: 'Join us in our mission to protect and preserve our oceans for future generations.',
        da: 'Deltag i vores mission om at beskytte og bevare vores have for fremtidige generationer.',
      },
      defaultKeywords: {
        en: ['ocean', 'conservation', 'environment', 'sustainability'],
        da: ['hav', 'bevarelse', 'miljø', 'bæredygtighed'],
      },
    },
    updatedAt: new Date().toISOString(),
  });

  const handleSettingUpdate = <K extends keyof SiteSettings>(
    section: K,
    field: keyof SiteSettings[K],
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value,
      },
    }));
  };

  const handleLocalizedUpdate = <K extends keyof SiteSettings>(
    section: K,
    field: keyof SiteSettings[K],
    value: string
  ) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: {
          ...(prev[section][field] as Record<Language, string>),
          [currentLanguage]: value,
        },
      },
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Site Settings</h1>
        <button className="btn btn-primary">Save Changes</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Logo Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Logo</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Light Logo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.logo.light}
                  onChange={(e) => handleSettingUpdate('logo', 'light', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Dark Logo URL</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.logo.dark}
                  onChange={(e) => handleSettingUpdate('logo', 'dark', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Color Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Colors</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Primary Color</label>
                <input
                  type="color"
                  className="input input-bordered w-full h-12"
                  value={settings.colors.primary}
                  onChange={(e) => handleSettingUpdate('colors', 'primary', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Secondary Color</label>
                <input
                  type="color"
                  className="input input-bordered w-full h-12"
                  value={settings.colors.secondary}
                  onChange={(e) => handleSettingUpdate('colors', 'secondary', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Contact Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Contact Information</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Email</label>
                <input
                  type="email"
                  className="input input-bordered w-full"
                  value={settings.contact.email}
                  onChange={(e) => handleSettingUpdate('contact', 'email', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Phone</label>
                <input
                  type="tel"
                  className="input input-bordered w-full"
                  value={settings.contact.phone}
                  onChange={(e) => handleSettingUpdate('contact', 'phone', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Address ({currentLanguage.toUpperCase()})</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.contact.address[currentLanguage]}
                  onChange={(e) => handleLocalizedUpdate('contact', 'address', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        {/* SEO Settings */}
        <div className="card bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">SEO Settings</h2>
            <div className="space-y-4">
              <div>
                <label className="label">Default Title ({currentLanguage.toUpperCase()})</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  value={settings.seo.defaultTitle[currentLanguage]}
                  onChange={(e) => handleLocalizedUpdate('seo', 'defaultTitle', e.target.value)}
                />
              </div>
              <div>
                <label className="label">Default Description ({currentLanguage.toUpperCase()})</label>
                <textarea
                  className="textarea textarea-bordered w-full"
                  value={settings.seo.defaultDescription[currentLanguage]}
                  onChange={(e) => handleLocalizedUpdate('seo', 'defaultDescription', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings; 