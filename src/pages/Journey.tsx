
import React, { useEffect, useState } from "react";
import { Layout, getLanguage } from "@/components/Layout";
import { Button } from "@/components/ui/button";

const Journey = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  // Text content based on language
  const content = {
    page: {
      title: language === 'da' ? 'Min rejse' : 'My journey',
      subtitle: language === 'da' 
        ? 'Følg med på Team SEAs rejse fra idé til handling.'
        : "Follow Team SEA's journey from idea to action.",
      story: {
        title: language === 'da' ? 'Rejsen begynder' : 'The journey begins',
        description: language === 'da'
          ? 'Det hele startede med et ønske om at gøre en forskel. Efter at have set behovet for rent drikkevand i forskellige dele af verden, besluttede vi at tage handling og grundlagde Team SEA.'
          : 'It all started with a desire to make a difference. After seeing the need for clean drinking water in various parts of the world, we decided to take action and founded Team SEA.',
        readMore: language === 'da' ? 'Læs mere om vores historie' : 'Read more about our story',
        impact: language === 'da' ? 'Se vores aftryk' : 'See our impact'
      },
      timeline: {
        title: language === 'da' ? 'Vigtige milepæle' : 'Key milestones',
        start: language === 'da' ? 'Start af Team SEA' : 'Start of Team SEA',
        startDesc: language === 'da' 
          ? 'Team SEA grundlægges med et mission om at hjælpe mennesker i nød med rent drikkevand.'
          : 'Team SEA is founded with a mission to help people in need with clean drinking water.',
        firstProject: language === 'da' ? 'Første brøndprojekt' : 'First well project',
        firstProjectDesc: language === 'da'
          ? 'Vores første brøndprojekt i Bangladesh bliver til virkelighed, og bringer rent drikkevand til over 50 mennesker.'
          : 'Our first well project in Bangladesh becomes a reality, bringing clean drinking water to over 50 people.',
        future: language === 'da' ? 'Fremtiden' : 'The future',
        futureDesc: language === 'da'
          ? 'Vi ser frem til at udvide vores indsats og hjælpe endnu flere mennesker med adgang til rent drikkevand.'
          : 'We look forward to expanding our efforts and helping even more people with access to clean drinking water.'
      }
    }
  };

  return (
    <Layout>
      {/* Page Header */}
      <section className="pt-16 pb-12 bg-blue-500 text-white">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{content.page.title}</h1>
            <p className="text-xl">{content.page.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slide-up">
              <h2 className="section-title">{content.page.story.title}</h2>
              <p className="mb-6 text-lg">{content.page.story.description}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button asChild variant="default">
                  <a href="/about">{content.page.story.readMore}</a>
                </Button>
                <Button asChild variant="outline">
                  <a href="/impact">{content.page.story.impact}</a>
                </Button>
              </div>
            </div>
            
            <div className="rounded-xl overflow-hidden shadow-lg animate-slide-up">
              <img 
                src="https://images.unsplash.com/photo-1553708881-112abc53fe54?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" 
                alt={language === 'da' ? 'Team SEAs rejse' : "Team SEA's journey"} 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Timeline Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="section-title text-center mb-12">{content.page.timeline.title}</h2>
          
          <div className="max-w-3xl mx-auto">
            {/* Timeline entry 1 */}
            <div className="flex mb-12 animate-slide-up">
              <div className="mr-6 relative">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">1</div>
                <div className="absolute left-1/2 top-14 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2"></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{content.page.timeline.start}</h3>
                <p className="text-gray-600 mb-4">{content.page.timeline.startDesc}</p>
                <div className="text-sm text-gray-500">{new Date().getFullYear() - 1}</div>
              </div>
            </div>
            
            {/* Timeline entry 2 */}
            <div className="flex mb-12 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="mr-6 relative">
                <div className="w-14 h-14 rounded-full bg-primary text-white flex items-center justify-center font-bold text-xl">2</div>
                <div className="absolute left-1/2 top-14 bottom-0 w-0.5 bg-gray-300 -translate-x-1/2"></div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex-1">
                <h3 className="text-xl font-semibold mb-2">{content.page.timeline.firstProject}</h3>
                <p className="text-gray-600 mb-4">{content.page.timeline.firstProjectDesc}</p>
                <div className="text-sm text-gray-500">{new Date().getFullYear()}</div>
              </div>
            </div>
            
            {/* Timeline entry 3 */}
            <div className="flex animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="mr-6">
                <div className="w-14 h-14 rounded-full bg-blue-200 text-primary flex items-center justify-center font-bold text-xl">3</div>
              </div>
              <div className="bg-white rounded-xl shadow-sm p-6 flex-1 border-dashed border-2 border-blue-200">
                <h3 className="text-xl font-semibold mb-2">{content.page.timeline.future}</h3>
                <p className="text-gray-600 mb-4">{content.page.timeline.futureDesc}</p>
                <div className="text-sm text-gray-500">{new Date().getFullYear() + 1}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Journey;
