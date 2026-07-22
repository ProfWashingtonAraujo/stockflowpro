import React from 'react'
import { Search, Filter } from 'lucide-react'

export function SearchInput({ placeholder = 'Buscar...', value, onChange }: { placeholder?: string, value?: string, onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void }) {
  return (
    <div className="relative group max-w-md w-full">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <Search className="h-4 w-4 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
      </div>
      <input
        type="text"
        className="block w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 transition-all shadow-sm"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export function DataTable({ columns, rows, emptyState }: { columns: string[], rows: React.ReactNode[], emptyState?: React.ReactNode }) {
  return (
    <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-50/50 border-b border-slate-200">
              {columns.map((col, i) => (
                <th key={i} className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-12 text-center text-slate-500">
                  {emptyState || 'Nenhum registro encontrado.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export function FilterBar({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-4 bg-white p-4 rounded-3xl border border-slate-200 shadow-sm">
      <div className="flex items-center gap-2 text-slate-500 pr-2 border-r border-slate-100">
        <Filter className="h-4 w-4" />
        <span className="text-xs font-bold uppercase tracking-wider">Filtros</span>
      </div>
      {children}
    </div>
  )
}
