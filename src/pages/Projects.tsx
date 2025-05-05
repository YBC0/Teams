
import React, { useEffect, useState } from "react";
import { Layout, getLanguage } from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

const Projects = () => {
  const [language, setLanguage] = useState('en');
  const [openProject, setOpenProject] = useState<number | null>(null);

  useEffect(() => {
    setLanguage(getLanguage());
  }, []);

  const toggleProject = (projectId: number) => {
    setOpenProject(openProject === projectId ? null : projectId);
  };

  // Text content based on language
  const content = {
    page: {
      title: language === 'da' ? 'Vores Projekter' : 'Our Projects',
      subtitle: language === 'da' 
        ? 'Her kan du se alle vores projekter og følge fremskridt.' 
        : 'Here you can see all our projects and follow progress.',
      viewMore: language === 'da' ? 'Se flere detaljer' : 'View more details',
      hideDetails: language === 'da' ? 'Skjul detaljer' : 'Hide details',
      photos: language === 'da' ? 'Projektbilleder' : 'Project Photos',
      futureProjects: language === 'da' ? 'Kommende Projekter' : 'Future Projects',
      futureProjectsDesc: language === 'da' 
        ? 'Vi planlægger flere brøndprojekter i fremtiden.' 
        : 'We are planning more well projects in the future.',
      futureProjectsFollow: language === 'da'
        ? 'Følg med her for at se vores kommende projekter og hvordan du kan hjælpe.'
        : 'Check back here to see our upcoming projects and how you can help.',
      noPictures: language === 'da' 
        ? 'Billeder af projektet kommer snart!' 
        : 'Pictures of the project coming soon!'
    },
    projects: [
      {
        id: 1,
        title: language === 'da' ? 'Brønd i Bangladesh' : 'Water Well in Bangladesh',
        location: 'Bangladesh',
        date: language === 'da' ? 'Maj 2025' : 'May 2025',
        description: language === 'da'
          ? 'Vores første brøndprojekt i Bangladesh giver rent drikkevand til en landsby med over 50 mennesker, der tidligere måtte gå flere kilometer hver dag for at hente vand.'
          : 'Our first well project in Bangladesh provides clean drinking water to a village of over 50 people who previously had to walk several kilometers each day to fetch water.',
        status: language === 'da' ? 'Igangværende' : 'In progress',
        imageSrc: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
        photos: [
          {
            id: 1,
            src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
            alt: language === 'da' ? 'Projektområde' : 'Project area'
          },
          {
            id: 2,
            src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
            alt: language === 'da' ? 'Byggestart' : 'Construction start'
          }
        ]
      }
    ]
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

      {/* Projects List */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {content.projects.map((project) => (
              <Card key={project.id} className="overflow-hidden">
                <div className="md:flex">
                  <div className="md:shrink-0">
                    <img 
                      className="h-48 w-full object-cover md:h-full md:w-80" 
                      src={project.imageSrc} 
                      alt={project.title} 
                    />
                  </div>
                  <div className="flex-1">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-1">
                            {project.status}
                          </p>
                          <CardTitle>{project.title}</CardTitle>
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Calendar className="mr-1 h-4 w-4" />
                          {project.date}
                        </div>
                      </div>
                      <CardDescription className="text-sm text-gray-500">
                        {project.location}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{project.description}</p>
                    </CardContent>
                    <CardFooter>
                      <Collapsible 
                        className="w-full" 
                        open={openProject === project.id}
                        onOpenChange={() => toggleProject(project.id)}
                      >
                        <CollapsibleTrigger asChild>
                          <Button variant="outline" className="flex items-center gap-2">
                            {openProject === project.id ? (
                              <>
                                {content.page.hideDetails} 
                                <ChevronUp className="h-4 w-4" />
                              </>
                            ) : (
                              <>
                                {content.page.viewMore} 
                                <ChevronDown className="h-4 w-4" />
                              </>
                            )}
                          </Button>
                        </CollapsibleTrigger>
                        <CollapsibleContent className="mt-6">
                          <div className="space-y-4">
                            <h4 className="font-medium text-lg">{content.page.photos}</h4>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                              {project.photos && project.photos.length > 0 ? (
                                project.photos.map((photo) => (
                                  <div key={photo.id} className="rounded-lg overflow-hidden shadow-md">
                                    <img 
                                      src={photo.src} 
                                      alt={photo.alt} 
                                      className="w-full h-64 object-cover"
                                    />
                                    <p className="p-2 text-sm text-gray-500">{photo.alt}</p>
                                  </div>
                                ))
                              ) : (
                                <p className="text-gray-600 italic">
                                  {content.page.noPictures}
                                </p>
                              )}
                            </div>
                          </div>
                        </CollapsibleContent>
                      </Collapsible>
                    </CardFooter>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Future Projects Section */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="section-title mb-6">
            {content.page.futureProjects}
          </h2>
          <p className="mb-4 max-w-2xl mx-auto">
            {content.page.futureProjectsDesc}
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {content.page.futureProjectsFollow}
          </p>
        </div>
      </section>
    </Layout>
  );
};

export default Projects;
