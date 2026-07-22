import { NavLink } from 'react-router-dom'
import { 
  LayoutDashboard, 
  Package, 
  ArrowDownLeft, 
  ArrowUpRight, 
  History, 
  DollarSign, 
  FileText, 
  Users, 
  Settings,
  User,
  Boxes,
  ChevronRight,
  Zap,
  LogOut
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'

const menuGroups = [
  {
    title: 'Principal',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
    ]
  },
  {
    title: 'Estoque',
    items: [
      { icon: Package, label: 'Produtos', path: '/produtos' },
      { icon: ArrowDownLeft, label: 'Entrada de Material', path: '/entrada' },
      { icon: ArrowUpRight, label: 'Saída de Material', path: '/saida' },
      { icon: History, label: 'Movimentações', path: '/movimentacoes' },
    ]
  },
  {
    title: 'Gestão',
    items: [
      { icon: DollarSign, label: 'Financeiro', path: '/financeiro' },
      { icon: FileText, label: 'Relatórios', path: '/relatorios' },
    ]
  },
  {
    title: 'Configurações',
    items: [
      { icon: Users, label: 'Usuários', path: '/usuarios' },
      { icon: Settings, label: 'Configurações', path: '/configuracoes' },
    ]
  },
  {
    title: 'Conta',
    items: [
      { icon: User, label: 'Meu Perfil', path: '/perfil' },
      { icon: LogOut, label: 'Sair do Sistema', path: '/login', isLogout: true },
    ]
  }
]

export function Sidebar() {
  const { logout } = useAuth()

  return (
    <aside className="h-screen w-72 bg-slate-900 text-white flex flex-col shrink-0 z-50">
      <div className="p-8">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
            <Boxes className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              StockFlow <span className="text-blue-400">Pro</span>
            </h1>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Enterprise v1.0</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 py-4 space-y-8 overflow-y-auto custom-scrollbar">
        {menuGroups.map((group) => (
          <div key={group.title} className="space-y-2">
            <h3 className="px-4 text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">
              {group.title}
            </h3>
            <div className="space-y-1">
              {group.items.map((item) => item.isLogout ? (
                <button key={item.path} onClick={logout} className="flex w-full items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group text-rose-400 hover:bg-rose-500/10 hover:text-rose-300">
                  <item.icon className="h-5 w-5 transition-transform group-hover:scale-110 text-rose-500" />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                </button>
              ) : (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 group
                    ${isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'text-slate-400 hover:bg-slate-800/50 hover:text-white'}
                  `}
                >
                  <item.icon className="h-5 w-5 transition-transform group-hover:scale-110" />
                  <span className="text-sm font-bold tracking-tight">{item.label}</span>
                  {item.path === '/financeiro' && <span className="ml-auto h-2 w-2 rounded-full bg-blue-400 animate-pulse" />}
                </NavLink>
              ))}
            </div>
          </div>
        ))}
      </nav>

      <div className="p-6">
        <div className="rounded-3xl bg-gradient-to-br from-slate-800 to-slate-800/50 p-5 border border-slate-700/50 shadow-2xl overflow-hidden relative group">
          <div className="absolute -right-4 -top-4 h-24 w-24 bg-blue-500/10 rounded-full blur-2xl group-hover:bg-blue-500/20 transition-all" />
          <div className="relative z-10">
            <div className="flex items-center gap-2 mb-3">
              <div className="h-8 w-8 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Zap className="h-4 w-4 text-blue-400" />
              </div>
              <div>
                <p className="text-xs font-black text-white uppercase tracking-wider">Plano Empresarial</p>
                <p className="text-[10px] text-emerald-400 font-bold">Status: Ativo</p>
              </div>
            </div>
            <button className="w-full py-2.5 rounded-xl bg-blue-600 text-xs font-black text-white hover:bg-blue-700 transition-all active:scale-95 shadow-lg shadow-blue-600/10">
              UPGRADE
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}
