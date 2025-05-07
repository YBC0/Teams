import { Language } from './common';

export type AdminRole = 'super_admin' | 'admin' | 'editor' | 'viewer';

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  avatar?: string;
  lastLogin?: string;
  createdAt: string;
  updatedAt: string;
}

export interface PageSection {
  id: string;
  type: 'hero' | 'text' | 'image' | 'gallery' | 'counter' | 'faq' | 'cta' | 'testimonial' | 'team' | 'contact';
  order: number;
  content: {
    [key in Language]: {
      title?: string;
      subtitle?: string;
      description?: string;
      content?: string;
      buttonText?: string;
      buttonLink?: string;
      images?: string[];
      items?: Array<{
        title?: string;
        description?: string;
        image?: string;
      }>;
      counters?: Array<{
        label: string;
        value: number;
        prefix?: string;
        suffix?: string;
      }>;
      faqs?: Array<{
        question: string;
        answer: string;
      }>;
    };
  };
  settings?: {
    background?: string;
    layout?: string;
    spacing?: string;
    animation?: string;
  };
}

export interface Page {
  id: string;
  slug: string;
  title: {
    [key in Language]: string;
  };
  sections: PageSection[];
  meta: {
    title: {
      [key in Language]: string;
    };
    description: {
      [key in Language]: string;
    };
    keywords: {
      [key in Language]: string[];
    };
  };
  status: 'draft' | 'published';
  createdAt: string;
  updatedAt: string;
  publishedAt?: string;
}

export interface Donation {
  id: string;
  donorName: string;
  isAnonymous: boolean;
  amount: number;
  currency: string;
  message?: string;
  status: 'pending' | 'completed' | 'failed';
  paymentMethod: string;
  createdAt: string;
  updatedAt: string;
}

export interface MediaFile {
  id: string;
  name: string;
  type: string;
  url: string;
  thumbnailUrl?: string;
  size: number;
  dimensions?: {
    width: number;
    height: number;
  };
  tags: string[];
  uploadedBy: string;
  createdAt: string;
  updatedAt: string;
}

export interface SiteSettings {
  id: string;
  logo: {
    light: string;
    dark: string;
  };
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
  };
  socialLinks: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
  };
  contact: {
    email: string;
    phone: string;
    address: {
      [key in Language]: string;
    };
  };
  seo: {
    defaultTitle: {
      [key in Language]: string;
    };
    defaultDescription: {
      [key in Language]: string;
    };
    defaultKeywords: {
      [key in Language]: string[];
    };
  };
  updatedAt: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  action: string;
  targetType: 'page' | 'section' | 'donation' | 'media' | 'user' | 'settings';
  targetId: string;
  details: Record<string, unknown>;
  createdAt: string;
}

export interface AdminState {
  currentUser: AdminUser | null;
  currentLanguage: Language;
  isDarkMode: boolean;
  isSidebarCollapsed: boolean;
  notifications: Notification[];
}

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  createdAt: string;
} 