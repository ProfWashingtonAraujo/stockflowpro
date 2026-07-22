import type { User } from '../../types'

const permissionOptions = [
  ['view_dashboard', 'Visualizar Dashboard'],
  ['manage_products', 'Cadastrar Produtos'],
  ['edit_products', 'Editar Produtos'],
  ['delete_products', 'Excluir Produtos'],
  ['stock_in', 'Registrar Entrada'],
  ['stock_out', 'Registrar Saída'],
  ['finance_access', 'Acessar Financeiro'],
  ['reports_access', 'Gerar Relatórios'],
] as const

export function UserForm({ user, onSave }: { user?: User; onSave: (u: any) => void }) {
  const base = user ?? {
    id: crypto.randomUUID(),
    name: '',
    email: '',
    job: '',
    role: 'Visualizador',
    status: 'Ativo',
    createdAt: new Date().toISOString(),
    lastAccess: new Date().toISOString(),
    permissions: []
  }

  return (
    <form
      className="space-y-6"
      onSubmit={(e) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        onSave({
          id: base.id,
          name: String(formData.get('name') ?? ''),
          email: String(formData.get('email') ?? ''),
          job: String(formData.get('job') ?? ''),
          role: String(formData.get('role') ?? 'Visualizador'),
          status: String(formData.get('status') ?? 'Ativo'),
          createdAt: base.createdAt,
          lastAccess: base.lastAccess,
          permissions: permissionOptions
            .map(([key]) => key)
            .filter((key) => formData.getAll('permissions').includes(key)),
          password: String(formData.get('password') ?? ''),
        })
      }}
    >
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Nome Completo</label>
          <input name="name" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" placeholder="Ex: João Silva" defaultValue={base.name} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">E-mail Corporativo</label>
          <input name="email" type="email" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" placeholder="email@empresa.com" defaultValue={base.email} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Cargo / Função</label>
          <input name="job" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" placeholder="Ex: Gerente de Compras" defaultValue={base.job} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Perfil de Acesso</label>
          <select name="role" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.role}>
            <option value="Administrador">Administrador</option>
            <option value="Gestor">Gestor</option>
            <option value="Estoquista">Estoquista</option>
            <option value="Financeiro">Financeiro</option>
            <option value="Visualizador">Visualizador</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Status</label>
          <select name="status" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.status}>
            <option value="Ativo">Ativo</option>
            <option value="Inativo">Inativo</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">{user ? 'Nova Senha (opcional)' : 'Senha Inicial'}</label>
          <input name="password" type="password" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" placeholder="Mínimo de 6 caracteres" minLength={6} required={!user} />
        </div>
      </div>

      <div className="p-6 rounded-3xl border border-slate-100 bg-slate-50/30">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4 pl-1">Permissões de Acesso</h4>
        <div className="grid grid-cols-2 gap-4">
          {permissionOptions.map(([key, label]) => (
            <label key={key} className="flex items-center gap-3 p-1 cursor-pointer group">
              <div className="relative flex items-center justify-center h-5 w-5 rounded-md border-2 border-slate-200 transition-colors group-hover:border-blue-400">
                <input name="permissions" value={key} type="checkbox" className="peer absolute opacity-0" defaultChecked={base.role === 'Administrador' || base.permissions.includes(key)} />
                <div className="h-2.5 w-2.5 rounded-sm bg-blue-600 opacity-0 peer-checked:opacity-100 transition-opacity" />
              </div>
              <span className="text-sm font-bold text-slate-600">{label}</span>
            </label>
          ))}
        </div>
      </div>

      <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all">
        Salvar Configurações do Usuário
      </button>
    </form>
  )
}
