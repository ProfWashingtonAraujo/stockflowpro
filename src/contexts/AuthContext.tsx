import React, { createContext, useContext, useState, useEffect } from 'react'
import type { User } from '../types'
import { mockUsers } from '../data/users'

interface AuthContextType {
  user: User | null
  updateUser: (userData: Partial<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('stockflow_user')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      // Usar o primeiro usuário mock como padrão para demonstração
      const initialUser = {
        ...mockUsers[0],
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200'
      }
      setUser(initialUser)
      localStorage.setItem('stockflow_user', JSON.stringify(initialUser))
    }
  }, [])

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
    localStorage.removeItem('stockflow_user')
    window.location.href = '/login'
  }

  return (
    <AuthContext.Provider value={{ user, updateUser, logout }}>
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
