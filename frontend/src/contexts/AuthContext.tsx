'use client'

import React, { createContext, useContext, useEffect, useState } from 'react'

interface User {
  id: string
  email: string
  first_name: string
  last_name: string
  company?: string
  is_active: boolean
  created_at: string
}

interface AuthContextType {
  user: User | null
  token: string | null
  isLoading: boolean
  isAuthenticated: boolean
  login: (email: string, password: string) => Promise<void>
  logout: () => void
  register: (userData: RegisterData) => Promise<void>
  refreshUser: () => Promise<void>
}

interface RegisterData {
  email: string
  first_name: string
  last_name: string
  company?: string
  password: string
  confirm_password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const isAuthenticated = !!user && !!token

  // Initialize auth state from localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem('accessToken')
    const storedUser = localStorage.getItem('userData')

    if (storedToken && storedUser) {
      try {
        setToken(storedToken)
        setUser(JSON.parse(storedUser))
      } catch (error) {
        console.error('Error parsing stored user data:', error)
        localStorage.removeItem('accessToken')
        localStorage.removeItem('userData')
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email: string, password: string): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Erreur lors de la connexion')
      }

      const data = await response.json()
      
      setToken(data.access_token)
      setUser(data.user)
      
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('userData', JSON.stringify(data.user))
    } catch (error) {
      throw error
    }
  }

  const register = async (userData: RegisterData): Promise<void> => {
    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.detail || 'Erreur lors de l\'inscription')
      }

      const data = await response.json()
      
      setToken(data.access_token)
      setUser(data.user)
      
      localStorage.setItem('accessToken', data.access_token)
      localStorage.setItem('userData', JSON.stringify(data.user))
    } catch (error) {
      throw error
    }
  }

  const refreshUser = async (): Promise<void> => {
    if (!token) return

    try {
      const response = await fetch('http://localhost:8000/api/v1/auth/me', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to refresh user data')
      }

      const userData = await response.json()
      setUser(userData)
      localStorage.setItem('userData', JSON.stringify(userData))
    } catch (error) {
      console.error('Error refreshing user data:', error)
      logout()
    }
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('accessToken')
    localStorage.removeItem('userData')
    
    // Call logout endpoint if token exists
    if (token) {
      fetch('http://localhost:8000/api/v1/auth/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      }).catch(console.error)
    }
  }

  const value: AuthContextType = {
    user,
    token,
    isLoading,
    isAuthenticated,
    login,
    logout,
    register,
    refreshUser,
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
