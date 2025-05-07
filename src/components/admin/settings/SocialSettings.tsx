import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface SocialData {
  facebook: string;
  instagram: string;
  linkedin: string;
}

export default function SocialSettings() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [social, setSocial] = useState<SocialData | null>({
    facebook: 'https://facebook.com/teamsea',
    instagram: 'https://instagram.com/teamsea',
    linkedin: 'https://linkedin.com/company/teamsea',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const updated = {
      facebook: formData.get('facebook') as string,
      instagram: formData.get('instagram') as string,
      linkedin: formData.get('linkedin') as string,
    };
    setTimeout(() => {
      setSocial(updated);
      toast({
        title: language === 'da' ? 'Sociale medier opdateret' : 'Social media updated',
        description: language === 'da' ? 'Sociale medier data er gemt' : 'Social media data saved',
      });
      setIsSaving(false);
    }, 500);
  };

  if (isLoading || !social) {
    return <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'da' ? 'Sociale Medier Links' : 'Social Media Links'}</CardTitle>
        <CardDescription>{language === 'da' ? 'Opdater sociale medier links' : 'Update social media links'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="facebook">Facebook</Label>
              <Input id="facebook" name="facebook" type="url" defaultValue={social.facebook} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="instagram">Instagram</Label>
              <Input id="instagram" name="instagram" type="url" defaultValue={social.instagram} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input id="linkedin" name="linkedin" type="url" defaultValue={social.linkedin} />
            </div>
          </div>
          <Button type="submit" disabled={isSaving}>
            <Save className="h-4 w-4 mr-2" />
            {isSaving ? (language === 'da' ? 'Gemmer...' : 'Saving...') : (language === 'da' ? 'Gem ændringer' : 'Save changes')}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
} 