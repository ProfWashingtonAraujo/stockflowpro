import { useState, useEffect } from 'react'
import type { Product } from '../../types'

export function StockInForm({ products, onSubmit }: { products: Product[]; onSubmit: (data: any) => void }) {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [cost, setCost] = useState(0)
  const [supplier, setSupplier] = useState('')

  useEffect(() => {
    const p = products.find((p) => p.id === productId)
    if (p) {
      setCost(p.cost)
      setSupplier(p.supplier)
    }
  }, [productId, products])

  return (
    <form
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit({ productId, quantity, cost, supplier })
      }}
    >
      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Selecionar Produto</label>
        <select
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all"
          required
        >
          <option value="">Selecione um produto...</option>
          {products.map((p) => (
            <option key={p.id} value={p.id}>{p.name} ({p.code})</option>
          ))}
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Quantidade Recebida</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all"
          min="1"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Custo Unitário (R$)</label>
        <input
          type="number"
          value={cost}
          onChange={(e) => setCost(Number(e.target.value))}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all"
          step="0.01"
          required
        />
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Fornecedor / Origem</label>
        <input
          type="text"
          value={supplier}
          onChange={(e) => setSupplier(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all"
          placeholder="Nome do fornecedor"
          required
        />
      </div>

      <div className="md:col-span-2 p-4 rounded-2xl bg-blue-50 border border-blue-100 flex items-center justify-between">
        <div>
          <p className="text-[10px] font-black uppercase tracking-widest text-blue-400">Total da Entrada</p>
          <p className="text-2xl font-black text-blue-900">
            {(quantity * cost).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
          </p>
        </div>
        <button
          type="submit"
          className="px-8 py-3.5 bg-blue-600 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
        >
          Confirmar Recebimento
        </button>
      </div>
    </form>
  )
}
