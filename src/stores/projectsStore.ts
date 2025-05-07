import { create } from 'zustand';
import { Language } from '../types/common';

export interface Project {
  id: string;
  title: {
    [key in Language]: string;
  };
  description: {
    [key in Language]: string;
  };
  status: 'planned' | 'in progress' | 'completed';
  projectType: 'current' | 'upcoming';
  location: string;
  startDate: string;
  endDate?: string;
  image?: string;
  progress: number;
  photos?: {
    id: string;
    src: string;
    alt: {
      [key in Language]: string;
    };
  }[];
}

interface ProjectsState {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  updateProject: (id: string, project: Partial<Project>) => void;
  deleteProject: (id: string) => void;
}

export const useProjectsStore = create<ProjectsState>((set) => ({
  projects: [
    {
      id: '1',
      title: {
        en: 'Ocean Cleanup Initiative',
        da: 'Havrensningsinitiativ',
      },
      description: {
        en: 'Large-scale ocean cleanup project focusing on plastic waste removal',
        da: 'Storskala havrensningsprojekt med fokus på fjernelse af plastaffald',
      },
      status: 'in progress',
      projectType: 'current',
      location: 'North Sea',
      startDate: '2024-01-01',
      progress: 65,
      photos: [
        {
          id: '1',
          src: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb',
          alt: {
            en: 'Project area in North Sea',
            da: 'Projektområde i Nordsøen'
          }
        }
      ]
    },
    {
      id: '2',
      title: {
        en: 'Marine Life Conservation',
        da: 'Bevarelse af Havliv',
      },
      description: {
        en: 'Protection and monitoring of endangered marine species',
        da: 'Beskyttelse og overvågning af truede havarter',
      },
      status: 'completed',
      projectType: 'current',
      location: 'Baltic Sea',
      startDate: '2023-06-01',
      endDate: '2024-02-28',
      progress: 100,
      photos: [
        {
          id: '1',
          src: 'https://images.unsplash.com/photo-1501854140801-50d01698950b',
          alt: {
            en: 'Marine life in Baltic Sea',
            da: 'Havliv i Østersøen'
          }
        }
      ]
    },
    {
      id: '3',
      title: {
        en: 'Future Water Well Project',
        da: 'Fremtidigt Brøndprojekt',
      },
      description: {
        en: 'We are planning several well projects for the future. Stay tuned to see our upcoming projects and how you can help.',
        da: 'Vi planlægger flere brøndprojekter i fremtiden. Følg med her for at se vores kommende projekter og hvordan du kan hjælpe.',
      },
      status: 'planned',
      projectType: 'upcoming',
      location: 'TBD',
      startDate: '2024-06-01',
      progress: 0,
    }
  ],
  addProject: (project) =>
    set((state) => ({
      projects: [
        ...state.projects,
        { ...project, id: Math.random().toString(36).substr(2, 9) },
      ],
    })),
  updateProject: (id, project) =>
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id ? { ...p, ...project } : p
      ),
    })),
  deleteProject: (id) =>
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
    })),
})); 