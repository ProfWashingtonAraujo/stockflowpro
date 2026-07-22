import { Boxes, Orbit } from 'lucide-react'

export function BrandLogo() {
  return (
    <div className="inline-flex items-center gap-3">
      <div className="relative flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-cyan-500 via-sky-500 to-emerald-400 shadow-lg shadow-cyan-500/25">
        <Orbit className="h-4 w-4 text-white/80" />
        <Boxes className="absolute h-5 w-5 text-white" />
      </div>
      <div>
        <p className="text-sm font-black leading-none text-slate-900">StockFlow Pro</p>
        <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-cyan-700">Inventory Intelligence</p>
      </div>
    </div>
  )
}
