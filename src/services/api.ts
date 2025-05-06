import { BaseResponse, ApiError as ApiErrorType, PaginatedResponse, Donation, Project, User } from '@/types/common';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

class ApiError extends Error {
  constructor(
    public code: string,
    message: string,
    public details?: Record<string, unknown>
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new ApiError(
      error.code || 'UNKNOWN_ERROR',
      error.message || 'An unexpected error occurred',
      error.details
    );
  }

  return response.json();
}

export const api = {
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T> {
    const url = new URL(`${API_BASE_URL}${endpoint}`);
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        url.searchParams.append(key, value);
      });
    }

    const response = await fetch(url.toString(), {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return handleResponse<T>(response);
  },

  async post<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async put<T>(endpoint: string, data: unknown): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(data),
    });

    return handleResponse<T>(response);
  },

  async delete<T>(endpoint: string): Promise<T> {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    return handleResponse<T>(response);
  },
};

// Specific API services
export const donationService = {
  async createDonation(data: { amount: number; currency: string }) {
    return api.post<BaseResponse>('/donations', data);
  },

  async getDonations(page = 1, limit = 10) {
    return api.get<PaginatedResponse<Donation>>('/donations', {
      page: page.toString(),
      limit: limit.toString(),
    });
  },
};

export const projectService = {
  async getProjects(page = 1, limit = 10) {
    return api.get<PaginatedResponse<Project>>('/projects', {
      page: page.toString(),
      limit: limit.toString(),
    });
  },

  async getProject(id: string) {
    return api.get<Project>(`/projects/${id}`);
  },
};

export const userService = {
  async getCurrentUser() {
    return api.get<User>('/users/me');
  },

  async updateProfile(data: Partial<User>) {
    return api.put<User>('/users/me', data);
  },
}; 