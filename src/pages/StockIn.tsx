import { StockInForm } from '../components/forms/StockInForm'
import { DataTable } from '../components/ui/Common'
import { useStore } from '../hooks/useProducts'
import { useToast } from '../hooks/useToast'
import { ApiError } from '../lib/api'
import { brDate, brl } from '../utils/format'

export function StockIn() {
  const { products, movements, stockIn, loading, error } = useStore()
  const { push } = useToast()

  const handleStockIn = async (d: any) => {
    try {
      await stockIn(d)
      push('Entrada registrada com sucesso.', 'success')
    } catch (stockError) {
      push(stockError instanceof ApiError ? stockError.message : 'Falha ao registrar entrada.', 'error')
    }
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500">Carregando entradas...</div>
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-sm font-medium text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Entrada de Material</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Registre compras, recebimentos e reposições de estoque.</p>
      </div>

      <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
        <StockInForm products={products} onSubmit={handleStockIn} />
      </div>

      <DataTable
        columns={['Data', 'Produto', 'Quantidade', 'Fornecedor', 'Valor Total']}
        rows={movements.filter((m) => m.type === 'Entrada').map((m) => (
          <tr key={m.id} className="border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
            <td className="px-6 py-4 text-sm font-medium text-slate-600">{brDate(m.date)}</td>
            <td className="px-6 py-4 font-bold text-slate-900">{m.productName}</td>
            <td className="px-6 py-4 font-mono text-sm font-bold">{m.quantity}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{m.originDestiny}</td>
            <td className="px-6 py-4 text-sm font-bold">{brl(m.value)}</td>
          </tr>
        ))}
      />
    </div>
  )
}
