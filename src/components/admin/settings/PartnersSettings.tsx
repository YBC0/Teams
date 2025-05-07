import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface PartnersData {
  title: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
}

export default function PartnersSettings() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [partners, setPartners] = useState<PartnersData | null>({
    title: { da: 'Vores partnere', en: 'Our partners' },
    description: { da: 'Vi samarbejder med ...', en: 'We collaborate with ...' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const updated = {
      title: {
        da: formData.get('titleDa') as string,
        en: formData.get('titleEn') as string,
      },
      description: {
        da: formData.get('descriptionDa') as string,
        en: formData.get('descriptionEn') as string,
      },
    };
    setTimeout(() => {
      setPartners(updated);
      toast({
        title: language === 'da' ? 'Partnere opdateret' : 'Partners updated',
        description: language === 'da' ? 'Partner data er gemt' : 'Partner data saved',
      });
      setIsSaving(false);
    }, 500);
  };

  if (isLoading || !partners) {
    return <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'da' ? 'Partner Sektion' : 'Partners Section'}</CardTitle>
        <CardDescription>{language === 'da' ? 'Opdater partner sektionens tekst' : 'Update partners section text'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="titleDa">{language === 'da' ? 'Titel (Dansk)' : 'Title (Danish)'}</Label>
              <Input id="titleDa" name="titleDa" defaultValue={partners.title.da} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="titleEn">{language === 'da' ? 'Titel (Engelsk)' : 'Title (English)'}</Label>
              <Input id="titleEn" name="titleEn" defaultValue={partners.title.en} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionDa">{language === 'da' ? 'Beskrivelse (Dansk)' : 'Description (Danish)'}</Label>
              <Textarea id="descriptionDa" name="descriptionDa" defaultValue={partners.description.da} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="descriptionEn">{language === 'da' ? 'Beskrivelse (Engelsk)' : 'Description (English)'}</Label>
              <Textarea id="descriptionEn" name="descriptionEn" defaultValue={partners.description.en} />
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