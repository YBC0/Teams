import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ContactData {
  email: string;
  phone: string;
  address: {
    da: string;
    en: string;
  };
}

export default function ContactSettings() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [contact, setContact] = useState<ContactData | null>({
    email: 'info@teamsea.org',
    phone: '+45 12 34 56 78',
    address: { da: 'Eksempelvej 1, 1234 By', en: 'Example St 1, 1234 City' },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const updated = {
      email: formData.get('email') as string,
      phone: formData.get('phone') as string,
      address: {
        da: formData.get('addressDa') as string,
        en: formData.get('addressEn') as string,
      },
    };
    setTimeout(() => {
      setContact(updated);
      toast({
        title: language === 'da' ? 'Kontakt opdateret' : 'Contact updated',
        description: language === 'da' ? 'Kontakt data er gemt' : 'Contact data saved',
      });
      setIsSaving(false);
    }, 500);
  };

  if (isLoading || !contact) {
    return <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'da' ? 'Kontakt Information' : 'Contact Information'}</CardTitle>
        <CardDescription>{language === 'da' ? 'Opdater kontakt information' : 'Update contact information'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" defaultValue={contact.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">{language === 'da' ? 'Telefon' : 'Phone'}</Label>
              <Input id="phone" name="phone" defaultValue={contact.phone} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressDa">{language === 'da' ? 'Adresse (Dansk)' : 'Address (Danish)'}</Label>
              <Textarea id="addressDa" name="addressDa" defaultValue={contact.address.da} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="addressEn">{language === 'da' ? 'Adresse (Engelsk)' : 'Address (English)'}</Label>
              <Textarea id="addressEn" name="addressEn" defaultValue={contact.address.en} />
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