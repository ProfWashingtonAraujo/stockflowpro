import { useState } from 'react'
import { reportTypes } from '../data/reports'
import { DataTable } from '../components/ui/Common'
import { useToast } from '../hooks/useToast'
import { useStore } from '../hooks/useProducts'

export function Reports() {
  const [generated, setGenerated] = useState(false)
  const { push } = useToast()
  const { movements } = useStore()

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Relatórios</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Gere relatórios detalhados com filtros personalizados e exportação múltipla.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
        {reportTypes.map((t) => (
          <div key={t} className="group rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all hover:border-blue-200 hover:shadow-md cursor-pointer">
            <div className="flex flex-col gap-2">
              <div className="h-1 w-8 rounded-full bg-slate-200 group-hover:bg-blue-500 transition-colors" />
              <span className="text-sm font-bold text-slate-700">{t}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Tipo de Relatório</label>
            <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all">
              <option>Selecione...</option>
              {reportTypes.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Data Inicial</label>
            <input type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>
          <div className="space-y-1.5">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Data Final</label>
            <input type="date" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-2.5 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" />
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button 
            className="rounded-2xl bg-blue-600 px-8 py-3 text-sm font-bold text-white shadow-lg shadow-blue-600/20 transition-all hover:bg-blue-700 active:scale-95"
            onClick={() => setGenerated(true)}
          >
            Gerar Relatório
          </button>
        </div>
      </div>

      {generated && (
        <DataTable
          columns={['Data', 'Tipo', 'Produto', 'Quantidade', 'Valor Total']}
          rows={movements.map((m) => (
            <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
              <td className="px-6 py-4 text-sm font-medium text-slate-600">{new Date(m.date).toLocaleDateString('pt-BR')}</td>
              <td className="px-6 py-4 text-sm">{m.type}</td>
              <td className="px-6 py-4 font-bold text-slate-900">{m.productName}</td>
              <td className="px-6 py-4 font-mono text-sm font-bold">{m.quantity}</td>
              <td className="px-6 py-4 text-sm font-bold">{m.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</td>
            </tr>
          ))}
        />
      )}
    </div>
  )
}
