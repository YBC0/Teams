import { useEffect, useState } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';

interface ImpactData {
  peopleHelped: number;
  villages: number;
  meals: number;
  waterLiters: number;
}

export default function ImpactSettings() {
  const { language } = useLanguage();
  const { toast } = useToast();
  const [impact, setImpact] = useState<ImpactData | null>({
    peopleHelped: 1234,
    villages: 12,
    meals: 5678,
    waterLiters: 123456,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSaving(true);
    const formData = new FormData(e.currentTarget);
    const updated = {
      peopleHelped: Number(formData.get('peopleHelped')),
      villages: Number(formData.get('villages')),
      meals: Number(formData.get('meals')),
      waterLiters: Number(formData.get('waterLiters')),
    };
    setTimeout(() => {
      setImpact(updated);
      toast({
        title: language === 'da' ? 'Impact opdateret' : 'Impact updated',
        description: language === 'da' ? 'Impact data er gemt' : 'Impact data saved',
      });
      setIsSaving(false);
    }, 500);
  };

  if (isLoading || !impact) {
    return <div className="flex items-center justify-center h-32"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div></div>;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{language === 'da' ? 'Impact Statistikker' : 'Impact Statistics'}</CardTitle>
        <CardDescription>{language === 'da' ? 'Opdater antal af hjulpet personer, landsbyer, måltider og vand' : 'Update number of people helped, villages, meals, and water'}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSave} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="peopleHelped">{language === 'da' ? 'Personer hjulpet' : 'People Helped'}</Label>
              <Input id="peopleHelped" name="peopleHelped" type="number" defaultValue={impact.peopleHelped} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="villages">{language === 'da' ? 'Landsbyer' : 'Villages'}</Label>
              <Input id="villages" name="villages" type="number" defaultValue={impact.villages} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="meals">{language === 'da' ? 'Måltider' : 'Meals'}</Label>
              <Input id="meals" name="meals" type="number" defaultValue={impact.meals} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="waterLiters">{language === 'da' ? 'Vand (liter)' : 'Water (liters)'}</Label>
              <Input id="waterLiters" name="waterLiters" type="number" defaultValue={impact.waterLiters} />
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