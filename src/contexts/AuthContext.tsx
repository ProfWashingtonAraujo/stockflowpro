import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../types'
import { ApiError, apiFetch, clearToken, setToken } from '../lib/api'

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  updateUser: (userData: Partial<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    apiFetch<User>('/api/auth/me')
      .then((currentUser) => {
        setUser(currentUser)
        localStorage.setItem('stockflow_user', JSON.stringify(currentUser))
      })
      .catch((error) => {
        if (!(error instanceof ApiError) || error.status !== 401) {
          console.error(error)
        }
        clearToken()
        localStorage.removeItem('stockflow_user')
        setUser(null)
      })
      .finally(() => setLoading(false))
  }, [])

  const login = async (email: string, password: string) => {
    const result = await apiFetch<{ accessToken: string; user: User }>('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    })
    setToken(result.accessToken)
    setUser(result.user)
    localStorage.setItem('stockflow_user', JSON.stringify(result.user))
  }

  const updateUser = (userData: Partial<User>) => {
    setUser((prev) => {
      if (!prev) return null
      const updated = { ...prev, ...userData }
      localStorage.setItem('stockflow_user', JSON.stringify(updated))
      return updated
    })
  }

  const logout = () => {
    setUser(null)
    clearToken()
    localStorage.removeItem('stockflow_user')
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, updateUser, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
