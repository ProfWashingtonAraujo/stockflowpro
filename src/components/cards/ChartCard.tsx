import React from 'react'

export function ChartCard({ title, children }: { title: string, children: React.ReactNode }) {
  return (
    <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center justify-between mb-8">
        <h3 className="text-xl font-black text-slate-900 tracking-tight">{title}</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 rounded-full bg-blue-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">Tempo Real</span>
        </div>
      </div>
      <div className="w-full">
        {children}
      </div>
    </div>
  )
}
