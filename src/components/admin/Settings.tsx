import { useState } from 'react';
import { useAdminData } from '../../contexts/AdminDataProvider';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

export default function Settings() {
  const { data, updateSettings, updateContent } = useAdminData();
  const [settings, setSettings] = useState(data.settings);
  const [content, setContent] = useState(data.content);

  const handleSettingsUpdate = async () => {
    await updateSettings(settings);
  };

  const handleContentUpdate = async () => {
    await updateContent(content);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>General Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="siteTitle">Site Title</Label>
              <Input
                id="siteTitle"
                value={settings.siteTitle}
                onChange={(e) => setSettings({ ...settings, siteTitle: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings({ ...settings, siteDescription: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="seoDescription">SEO Description</Label>
              <Textarea
                id="seoDescription"
                value={settings.seoDescription}
                onChange={(e) => setSettings({ ...settings, seoDescription: e.target.value })}
              />
            </div>
            <div>
              <Label htmlFor="facebook">Facebook URL</Label>
              <Input
                id="facebook"
                value={settings.socialLinks.facebook}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, facebook: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter URL</Label>
              <Input
                id="twitter"
                value={settings.socialLinks.twitter}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, twitter: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram URL</Label>
              <Input
                id="instagram"
                value={settings.socialLinks.instagram}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, instagram: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn URL</Label>
              <Input
                id="linkedin"
                value={settings.socialLinks.linkedin}
                onChange={(e) =>
                  setSettings({
                    ...settings,
                    socialLinks: { ...settings.socialLinks, linkedin: e.target.value },
                  })
                }
              />
            </div>
            <Button onClick={handleSettingsUpdate}>Save Settings</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Content Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <Label htmlFor="heroTitle">Hero Title</Label>
              <Input
                id="heroTitle"
                value={content.hero.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
              <Input
                id="heroSubtitle"
                value={content.hero.subtitle}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, subtitle: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="heroImage">Hero Image URL</Label>
              <Input
                id="heroImage"
                value={content.hero.image}
                onChange={(e) =>
                  setContent({
                    ...content,
                    hero: { ...content.hero, image: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="aboutTitle">About Title</Label>
              <Input
                id="aboutTitle"
                value={content.about.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="aboutDescription">About Description</Label>
              <Textarea
                id="aboutDescription"
                value={content.about.description}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, description: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="aboutImage">About Image URL</Label>
              <Input
                id="aboutImage"
                value={content.about.image}
                onChange={(e) =>
                  setContent({
                    ...content,
                    about: { ...content.about, image: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="impactTitle">Impact Title</Label>
              <Input
                id="impactTitle"
                value={content.impact.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    impact: { ...content.impact, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="peopleHelped">People Helped</Label>
              <Input
                id="peopleHelped"
                type="number"
                value={content.impact.stats.peopleHelped}
                onChange={(e) =>
                  setContent({
                    ...content,
                    impact: {
                      ...content.impact,
                      stats: {
                        ...content.impact.stats,
                        peopleHelped: parseInt(e.target.value),
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="projectsCompleted">Projects Completed</Label>
              <Input
                id="projectsCompleted"
                type="number"
                value={content.impact.stats.projectsCompleted}
                onChange={(e) =>
                  setContent({
                    ...content,
                    impact: {
                      ...content.impact,
                      stats: {
                        ...content.impact.stats,
                        projectsCompleted: parseInt(e.target.value),
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="communitiesServed">Communities Served</Label>
              <Input
                id="communitiesServed"
                type="number"
                value={content.impact.stats.communitiesServed}
                onChange={(e) =>
                  setContent({
                    ...content,
                    impact: {
                      ...content.impact,
                      stats: {
                        ...content.impact.stats,
                        communitiesServed: parseInt(e.target.value),
                      },
                    },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="contactTitle">Contact Title</Label>
              <Input
                id="contactTitle"
                value={content.contact.title}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, title: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="contactEmail">Contact Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={content.contact.email}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, email: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="contactPhone">Contact Phone</Label>
              <Input
                id="contactPhone"
                value={content.contact.phone}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, phone: e.target.value },
                  })
                }
              />
            </div>
            <div>
              <Label htmlFor="contactAddress">Contact Address</Label>
              <Input
                id="contactAddress"
                value={content.contact.address}
                onChange={(e) =>
                  setContent({
                    ...content,
                    contact: { ...content.contact, address: e.target.value },
                  })
                }
              />
            </div>
            <Button onClick={handleContentUpdate}>Save Content</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 