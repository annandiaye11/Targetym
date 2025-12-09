/**
 * API configuration and utilities for Targetym AI frontend.
 */

// API Configuration
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api/v1'

// Auth endpoints
export const AUTH_ENDPOINTS = {
  login: `${API_BASE_URL}/auth/login/email`,
  register: `${API_BASE_URL}/auth/register`,
  passwordResetRequest: `${API_BASE_URL}/auth/password-reset/request`,
  passwordResetConfirm: `${API_BASE_URL}/auth/password-reset/confirm`,
}

// User endpoints
export const USER_ENDPOINTS = {
  profile: `${API_BASE_URL}/users/me`,
  update: `${API_BASE_URL}/users/me`,
}

// Employee endpoints
export const EMPLOYEE_ENDPOINTS = {
  list: `${API_BASE_URL}/employees`,
  create: `${API_BASE_URL}/employees`,
  details: (id: string) => `${API_BASE_URL}/employees/${id}`,
}

// Analytics endpoints
export const ANALYTICS_ENDPOINTS = {
  dashboard: `${API_BASE_URL}/analytics/dashboard`,
  reports: `${API_BASE_URL}/analytics/reports`,
}

// HTTP client utilities
export class APIError extends Error {
  status: number
  
  constructor(message: string, status: number) {
    super(message)
    this.status = status
    this.name = 'APIError'
  }
}

export async function apiRequest<T = any>(
  url: string,
  options: RequestInit = {}
): Promise<T> {
  const token = typeof window !== 'undefined' ? localStorage.getItem('access_token') : null
  
  const config: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  }

  try {
    const response = await fetch(url, config)
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}))
      throw new APIError(
        errorData.detail || errorData.message || `HTTP ${response.status}`,
        response.status
      )
    }

    return await response.json()
  } catch (error) {
    if (error instanceof APIError) {
      throw error
    }
    throw new APIError('Network error', 0)
  }
}

// Auth utilities
export function setAuthToken(token: string): void {
  if (typeof window !== 'undefined') {
    localStorage.setItem('access_token', token)
  }
}

export function removeAuthToken(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('access_token')
  }
}

export function getAuthToken(): string | null {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('access_token')
  }
  return null
}

export function isAuthenticated(): boolean {
  return getAuthToken() !== null
}
