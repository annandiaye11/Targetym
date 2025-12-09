'use client'

/**
 * Authentication hook for managing user state and auth operations.
 */

import { useState, useEffect, createContext, useContext, ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_ENDPOINTS, apiRequest, setAuthToken, removeAuthToken, getAuthToken } from '@/lib/api'

interface User {
  id: number
  email: string
  first_name: string
  last_name: string
  company?: string
  is_verified: boolean
  subscription_plan: string
  subscription_status: string
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  register: (userData: RegisterData) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

interface RegisterData {
  email: string
  password: string
  confirm_password: string
  first_name: string
  last_name: string
  company?: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const isAuthenticated = user !== null

  // Check auth status on mount
  useEffect(() => {
    const token = getAuthToken()
    if (token) {
      // TODO: Fetch user profile with token
      // For now, we'll simulate having a user
      setUser({
        id: 1,
        email: 'user@example.com',
        first_name: 'Test',
        last_name: 'User',
        is_verified: true,
        subscription_plan: 'starter',
        subscription_status: 'trial'
      })
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    try {
      const response = await apiRequest(AUTH_ENDPOINTS.login, {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      })

      setAuthToken(response.access_token)
      
      // TODO: Fetch user profile after login
      // For now, simulate user data
      setUser({
        id: 1,
        email,
        first_name: 'Test',
        last_name: 'User',
        is_verified: true,
        subscription_plan: 'starter',
        subscription_status: 'trial'
      })

      router.push('/dashboard')
    } catch (error) {
      console.error('Login error:', error)
      throw error
    }
  }

  const register = async (userData: RegisterData) => {
    try {
      const response = await apiRequest(AUTH_ENDPOINTS.register, {
        method: 'POST',
        body: JSON.stringify(userData),
      })

      // After successful registration, redirect to login
      router.push('/auth/login?message=registration-success')
    } catch (error) {
      console.error('Registration error:', error)
      throw error
    }
  }

  const logout = () => {
    removeAuthToken()
    setUser(null)
    router.push('/')
  }

  const value = {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export default useAuth
