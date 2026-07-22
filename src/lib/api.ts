import type { User } from '../types'

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''
const tokenStorageKey = 'stockflow_token'

export class ApiError extends Error {
  status: number

  constructor(message: string, status: number) {
    super(message)
    this.status = status
  }
}

export function getToken() {
  return localStorage.getItem(tokenStorageKey)
}

export function setToken(token: string) {
  localStorage.setItem(tokenStorageKey, token)
}

export function clearToken() {
  localStorage.removeItem(tokenStorageKey)
}

export async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const token = getToken()
  const headers = new Headers(init?.headers)
  headers.set('Content-Type', 'application/json')

  if (token) {
    headers.set('Authorization', `Bearer ${token}`)
  }

  const response = await fetch(`${apiBaseUrl}${path}`, {
    ...init,
    headers,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Falha ao processar a requisição.' }))
    throw new ApiError(error.detail ?? 'Falha ao processar a requisição.', response.status)
  }

  return response.json()
}

export type LoginResponse = {
  accessToken: string
  user: User
}
