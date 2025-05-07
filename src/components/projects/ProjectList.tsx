import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { useProjectsStore } from "@/stores/projectsStore";

interface ProjectListProps {
  language: string;
}

/**
 * Component displaying the list of current projects
 */
export const ProjectList = ({ language }: ProjectListProps) => {
  const [openProject, setOpenProject] = useState<string | null>(null);
  const { projects } = useProjectsStore();

  const currentProjects = projects.filter(project => project.projectType === 'current');
  const upcomingProjects = projects.filter(project => project.projectType === 'upcoming');

  const toggleProject = (projectId: string) => {
    setOpenProject(openProject === projectId ? null : projectId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        {/* Current Projects */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8">
            {language === 'da' ? 'Aktuelle Projekter' : 'Current Projects'}
          </h2>
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {currentProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isOpen={openProject === project.id}
                onToggle={() => toggleProject(project.id)}
                language={language}
              />
            ))}
          </div>
        </div>

        {/* Upcoming Projects */}
        <div>
          <h2 className="text-3xl font-bold mb-8">
            {language === 'da' ? 'Kommende Projekter' : 'Upcoming Projects'}
          </h2>
          <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
            {upcomingProjects.map((project) => (
              <ProjectCard 
                key={project.id} 
                project={project} 
                isOpen={openProject === project.id}
                onToggle={() => toggleProject(project.id)}
                language={language}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: any;
  isOpen: boolean;
  onToggle: () => void;
  language: string;
}

/**
 * Card component for an individual project
 */
const ProjectCard = ({ 
  project, 
  isOpen, 
  onToggle,
  language
}: ProjectCardProps) => {
  const viewMoreText = language === 'da' ? 'Se flere detaljer' : 'View more details';
  const hideDetailsText = language === 'da' ? 'Skjul detaljer' : 'Hide details';
  const additionalPhotosText = language === 'da' ? 'Flere billeder' : 'Additional Photos';
  const noPicturesText = language === 'da' ? 'Billeder af projektet kommer snart!' : 'Pictures of the project coming soon!';

  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0 md:w-80 h-48 md:h-auto">
          <img 
            className="h-full w-full object-cover" 
            src={project.image || project.photos?.[0]?.src} 
            alt={project.title[language]} 
          />
        </div>
        <div className="flex-1">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm text-primary font-semibold uppercase tracking-wide mb-1">
                  {project.status}
                </p>
                <CardTitle>{project.title[language]}</CardTitle>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Calendar className="mr-1 h-4 w-4" />
                {new Date(project.startDate).toLocaleDateString(language === 'da' ? 'da-DK' : 'en-US', {
                  year: 'numeric',
                  month: 'long'
                })}
              </div>
            </div>
            <CardDescription className="text-sm text-gray-500">
              {project.location}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600">{project.description[language]}</p>
          </CardContent>
          <CardFooter>
            <Collapsible 
              className="w-full" 
              open={isOpen}
              onOpenChange={onToggle}
            >
              <CollapsibleTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2">
                  {isOpen ? (
                    <>
                      {hideDetailsText} 
                      <ChevronUp className="h-4 w-4" />
                    </>
                  ) : (
                    <>
                      {viewMoreText} 
                      <ChevronDown className="h-4 w-4" />
                    </>
                  )}
                </Button>
              </CollapsibleTrigger>
              <CollapsibleContent className="mt-6">
                {project.photos && project.photos.length > 1 ? (
                  <div className="space-y-4">
                    <h4 className="font-medium text-lg">{additionalPhotosText}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {project.photos.slice(1).map((photo: any) => (
                        <div key={photo.id} className="rounded-lg overflow-hidden shadow-md">
                          <img 
                            src={photo.src} 
                            alt={photo.alt[language]} 
                            className="w-full h-64 object-cover"
                          />
                          <p className="p-2 text-sm text-gray-500">{photo.alt[language]}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <p className="text-gray-600 italic">
                    {noPicturesText}
                  </p>
                )}
              </CollapsibleContent>
            </Collapsible>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};
