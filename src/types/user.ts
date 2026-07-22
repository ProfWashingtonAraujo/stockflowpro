export type UserRole = 'Administrador' | 'Gestor' | 'Estoquista' | 'Financeiro' | 'Visualizador'

export interface User {
  id: string
  name: string
  email: string
  job: string
  role: UserRole
  status: 'Ativo' | 'Inativo'
  lastAccess: string
  createdAt: string
  permissions: string[]
  avatar?: string
}
