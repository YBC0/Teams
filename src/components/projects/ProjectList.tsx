
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { getProjectsContent } from "@/utils/projectsContent";

interface ProjectListProps {
  language: string;
}

/**
 * Component displaying the list of current projects
 */
export const ProjectList = ({ language }: ProjectListProps) => {
  const [openProject, setOpenProject] = useState<number | null>(null);
  const content = getProjectsContent(language);

  const toggleProject = (projectId: number) => {
    setOpenProject(openProject === projectId ? null : projectId);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid md:grid-cols-1 gap-8 max-w-4xl mx-auto">
          {content.projects.map((project) => (
            <ProjectCard 
              key={project.id} 
              project={project} 
              isOpen={openProject === project.id}
              onToggle={() => toggleProject(project.id)}
              viewMoreText={content.page.viewMore}
              hideDetailsText={content.page.hideDetails}
              additionalPhotosText={content.page.additionalPhotos}
              noPicturesText={content.page.noPictures}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

interface ProjectCardProps {
  project: any;
  isOpen: boolean;
  onToggle: () => void;
  viewMoreText: string;
  hideDetailsText: string;
  additionalPhotosText: string;
  noPicturesText: string;
}

/**
 * Card component for an individual project
 */
const ProjectCard = ({ 
  project, 
  isOpen, 
  onToggle,
  viewMoreText,
  hideDetailsText,
  additionalPhotosText,
  noPicturesText
}: ProjectCardProps) => {
  return (
    <Card className="overflow-hidden">
      <div className="md:flex">
        <div className="md:shrink-0 md:w-80 h-48 md:h-auto">
          <img 
            className="h-full w-full object-cover" 
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
                            alt={photo.alt} 
                            className="w-full h-64 object-cover"
                          />
                          <p className="p-2 text-sm text-gray-500">{photo.alt}</p>
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
