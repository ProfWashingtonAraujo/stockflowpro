import { useState } from 'react'
import { Plus, Shield, UserX } from 'lucide-react'
import { DataTable, SearchInput, FilterBar } from '../components/ui/Common'
import { StatusBadge, RoleBadge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { UserForm } from '../components/forms/UserForm'
import { useUsers } from '../hooks/useUsers'
import { useToast } from '../hooks/useToast'
import { brDateTime } from '../utils/format'
import { ApiError } from '../lib/api'

export function Users() {
  const { users, saveUser, loading, error } = useUsers()
  const { push } = useToast()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedUser, setSelectedUser] = useState<any>(null)

  const handleSave = async (user: any) => {
    try {
      await saveUser(user)
      setIsModalOpen(false)
      setSelectedUser(null)
      push('Usuário salvo com sucesso.', 'success')
    } catch (saveError) {
      push(saveError instanceof ApiError ? saveError.message : 'Falha ao salvar usuário.', 'error')
    }
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500">Carregando usuários...</div>
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-sm font-medium text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Gestão de Usuários</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Controle permissões de acesso e gerencie sua equipe.</p>
        </div>
        <button onClick={() => { setSelectedUser(null); setIsModalOpen(true) }} className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all">
          <Plus className="h-4 w-4" />
          Novo Usuário
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchInput placeholder="Buscar por nome, e-mail ou cargo..." />
        <FilterBar>
          <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer">
            <option>Todos os Perfis</option>
            <option>Administrador</option>
            <option>Gestor</option>
            <option>Estoquista</option>
          </select>
        </FilterBar>
      </div>

      <DataTable
        columns={['Usuário', 'Cargo / E-mail', 'Perfil de Acesso', 'Status', 'Último Acesso', 'Ações']}
        rows={users.map((u) => (
          <tr key={u.id} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-5">
              <div className="flex items-center gap-4">
                <div className="h-10 w-10 rounded-2xl bg-slate-100 flex items-center justify-center text-xs font-black text-slate-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  {u.name.split(' ').map((n: string) => n[0]).join('').toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-slate-900">{u.name}</span>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Desde {new Date(u.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </td>
            <td className="px-6 py-5">
              <div className="flex flex-col">
                <span className="text-sm font-medium text-slate-700">{u.job}</span>
                <span className="text-xs text-slate-500">{u.email}</span>
              </div>
            </td>
            <td className="px-6 py-5"><RoleBadge role={u.role} /></td>
            <td className="px-6 py-5"><StatusBadge status={u.status} /></td>
            <td className="px-6 py-5 text-sm font-medium text-slate-500">{brDateTime(u.lastAccess)}</td>
            <td className="px-6 py-5">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => { setSelectedUser(u); setIsModalOpen(true) }} className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Shield className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <UserX className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title={selectedUser ? 'Configurar Usuário' : 'Novo Usuário'}>
        <UserForm user={selectedUser} onSave={handleSave} />
      </Modal>
    </div>
  )
}
