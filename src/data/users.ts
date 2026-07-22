import type { User } from '../types'

export const mockUsers: User[] = [
  {
    id: 'u1',
    name: 'Washington Araújo',
    email: 'washington@stockflow.pro',
    job: 'Diretor de Operações',
    role: 'Administrador',
    status: 'Ativo',
    lastAccess: new Date().toISOString(),
    createdAt: '2026-01-01T10:00:00Z',
    permissions: ['all'],
  },
  {
    id: 'u2',
    name: 'Ana Silva',
    email: 'ana.silva@stockflow.pro',
    job: 'Analista de Estoque',
    role: 'Estoquista',
    status: 'Ativo',
    lastAccess: new Date().toISOString(),
    createdAt: '2026-02-15T14:30:00Z',
    permissions: ['view_dashboard', 'manage_products', 'stock_in', 'stock_out'],
  },
]
