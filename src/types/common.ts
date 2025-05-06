export type Language = 'da' | 'en';

export interface BaseResponse {
  success: boolean;
  message?: string;
  error?: string;
}

export interface PaginatedResponse<T> extends BaseResponse {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

export interface ApiError {
  code: string;
  message: string;
  details?: Record<string, unknown>;
}

export interface ValidationError {
  field: string;
  message: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  createdAt: string;
  updatedAt: string;
}

export interface Donation {
  id: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed';
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Project {
  id: string;
  title: {
    da: string;
    en: string;
  };
  description: {
    da: string;
    en: string;
  };
  location: string;
  status: 'planning' | 'in-progress' | 'completed';
  targetAmount: number;
  currentAmount: number;
  startDate: string;
  endDate?: string;
  images: string[];
  createdAt: string;
  updatedAt: string;
} 