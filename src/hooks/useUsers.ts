import { useEffect, useState } from 'react'
import type { User } from '../types'
import { apiFetch } from '../lib/api'

type UserPayload = Omit<User, 'lastAccess' | 'createdAt'> & {
  password?: string
}

export function useUsers() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadUsers = async () => {
    setLoading(true)
    try {
      const data = await apiFetch<User[]>('/api/users')
      setUsers(data)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar usuários.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  const saveUser = async (user: UserPayload) => {
    const hasId = users.some((entry) => entry.id === user.id)
    const method = hasId ? 'PUT' : 'POST'
    const path = hasId ? `/api/users/${user.id}` : '/api/users'
    await apiFetch(path, {
      method,
      body: JSON.stringify(user),
    })
    await loadUsers()
  }

  return {
    users,
    loading,
    error,
    reload: loadUsers,
    saveUser,
  }
}
