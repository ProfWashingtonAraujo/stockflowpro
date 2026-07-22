import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Topbar } from './Topbar'

export function DashboardLayout() {
  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden selection:bg-blue-100">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <Topbar />
        <main className="p-8 flex-1 overflow-y-auto">
          <Outlet />
        </main>
        <footer className="px-8 py-4 border-t border-slate-200 text-center bg-white">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">
            © 2026 StockFlow Pro • v1.0.0
          </p>
        </footer>
      </div>
    </div>
  )
}
