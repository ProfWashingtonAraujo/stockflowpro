import { Bell, Search, ChevronDown } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'

export function Topbar() {
  const { user } = useAuth()

  if (!user) return null

  return (
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-slate-200 px-8 flex items-center justify-between sticky top-0 z-40">
      <div className="flex-1 max-w-xl">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="text"
            className="block w-full pl-11 pr-4 py-2.5 bg-slate-50 border-none rounded-2xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
            placeholder="Pesquisar em todo o sistema..."
          />
        </div>
      </div>

      <div className="flex items-center gap-6">
        <button className="relative p-2.5 rounded-2xl bg-slate-50 text-slate-500 hover:bg-slate-100 transition-all group">
          <Bell className="h-5 w-5 group-hover:rotate-12 transition-transform" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
        </button>

        <div className="h-8 w-px bg-slate-200" />

        <Link to="/perfil" className="flex items-center gap-4 cursor-pointer group">
          <div className="text-right">
            <p className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition-colors">{user.name}</p>
            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{user.role}</p>
          </div>
          <div className="relative">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 p-0.5 shadow-lg shadow-blue-500/10 transition-transform group-hover:scale-105">
              <div className="h-full w-full rounded-[14px] bg-white p-0.5 overflow-hidden">
                <img 
                  src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'} 
                  alt={user.name} 
                  className="h-full w-full object-cover rounded-[12px]"
                />
              </div>
            </div>
            <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-emerald-500 border-2 border-white" />
          </div>
          <ChevronDown className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-all" />
        </Link>
      </div>
    </header>
  )
}
