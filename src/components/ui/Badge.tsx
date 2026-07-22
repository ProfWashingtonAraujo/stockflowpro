import React from 'react'

export function Badge({ children, variant = 'default' }: { children: React.ReactNode, variant?: 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'purple' }) {
  const variants = {
    default: 'bg-slate-100 text-slate-700 ring-slate-600/10',
    primary: 'bg-blue-100 text-blue-700 ring-blue-700/10',
    success: 'bg-emerald-100 text-emerald-700 ring-emerald-600/10',
    warning: 'bg-amber-100 text-amber-700 ring-amber-600/10',
    danger: 'bg-rose-100 text-rose-700 ring-rose-600/10',
    info: 'bg-sky-100 text-sky-700 ring-sky-700/10',
    purple: 'bg-purple-100 text-purple-700 ring-purple-700/10',
  }

  return (
    <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-bold ring-1 ring-inset ${variants[variant]}`}>
      {children}
    </span>
  )
}

export function StatusBadge({ status }: { status: string }) {
  if (status === 'Ativo' || status === 'Concluido' || status === 'Entrada') return <Badge variant="success">{status}</Badge>
  if (status === 'Inativo' || status === 'Cancelado' || status === 'Saida') return <Badge variant="danger">{status}</Badge>
  if (status === 'Pendente') return <Badge variant="warning">{status}</Badge>
  return <Badge>{status}</Badge>
}

export function RoleBadge({ role }: { role: string }) {
  if (role === 'Administrador') return <Badge variant="purple">{role}</Badge>
  if (role === 'Gestor') return <Badge variant="primary">{role}</Badge>
  if (role === 'Estoquista') return <Badge variant="success">{role}</Badge>
  if (role === 'Financeiro') return <Badge variant="warning">{role}</Badge>
  return <Badge>{role}</Badge>
}
