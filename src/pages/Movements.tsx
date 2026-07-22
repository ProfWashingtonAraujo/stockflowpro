import { DataTable } from '../components/ui/Common'
import { useStore } from '../hooks/useProducts'
import { brDate, brl } from '../utils/format'

export function Movements() {
  const { movements, loading, error } = useStore()

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500">Carregando movimentações...</div>
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-sm font-medium text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Movimentações</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Histórico completo de entradas e saídas de materiais.</p>
      </div>

      <DataTable
        columns={['Data', 'Tipo', 'Código', 'Produto', 'Categoria', 'Qtd', 'Valor', 'Origem/Destino', 'Status']}
        rows={movements.map((m) => (
          <tr key={m.id} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-4 text-sm font-medium text-slate-600">{brDate(m.date)}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold ring-1 ring-inset ${
                m.type === 'Entrada' ? 'bg-emerald-100 text-emerald-700 ring-emerald-600/10' : 'bg-rose-100 text-rose-700 ring-rose-600/10'
              }`}>
                {m.type}
              </span>
            </td>
            <td className="px-6 py-4 text-xs font-bold text-slate-400 uppercase tracking-wider">{m.code}</td>
            <td className="px-6 py-4 font-bold text-slate-900">{m.productName}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{m.category}</td>
            <td className="px-6 py-4 font-mono text-sm font-bold">{m.quantity}</td>
            <td className="px-6 py-4 text-sm font-bold">{brl(m.value)}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{m.originDestiny}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${m.status === 'Concluido' ? 'text-emerald-600' : 'text-amber-600'}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${m.status === 'Concluido' ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                {m.status}
              </span>
            </td>
          </tr>
        ))}
      />
    </div>
  )
}
