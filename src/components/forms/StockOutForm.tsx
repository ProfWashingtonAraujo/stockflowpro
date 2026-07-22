import { useState, useEffect } from 'react'
import type { Product } from '../../types'

export function StockOutForm({ products, onSubmit }: { products: Product[]; onSubmit: (data: any) => void }) {
  const [productId, setProductId] = useState('')
  const [quantity, setQuantity] = useState(1)
  const [sector, setSector] = useState('')
  const [availableStock, setAvailableStock] = useState(0)

  useEffect(() => {
    const p = products.find((p) => p.id === productId)
    if (p) {
      setAvailableStock(p.quantity)
    } else {
      setAvailableStock(0)
    }
  }, [productId, products])

  const isOverstock = quantity > availableStock

  return (
    <form
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      onSubmit={(e) => {
        e.preventDefault()
        if (isOverstock) return
        onSubmit({ productId, quantity, sector })
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
        {productId && (
          <p className={`text-[10px] font-bold mt-1 pl-1 ${availableStock <= 0 ? 'text-rose-500' : 'text-slate-500'}`}>
            Estoque Disponível: {availableStock} unidades
          </p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Quantidade Retirada</label>
        <input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className={`w-full rounded-2xl border px-4 py-3 text-sm font-medium outline-none transition-all ${
            isOverstock 
              ? 'border-rose-400 bg-rose-50 text-rose-900 focus:ring-rose-100' 
              : 'border-slate-200 bg-slate-50/50 focus:border-blue-400 focus:bg-white focus:ring-blue-50'
          }`}
          min="1"
          required
        />
        {isOverstock && (
          <p className="text-[10px] font-bold text-rose-500 mt-1 pl-1">Quantidade indisponível em estoque!</p>
        )}
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Setor Solicitante / Destino</label>
        <select
          value={sector}
          onChange={(e) => setSector(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all"
          required
        >
          <option value="">Selecione o setor...</option>
          <option>TI</option>
          <option>Administrativo</option>
          <option>Financeiro</option>
          <option>Operacional</option>
          <option>Manutenção</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Tipo de Saída</label>
        <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all">
          <option>Consumo Interno</option>
          <option>Venda</option>
          <option>Perda / Avaria</option>
          <option>Transferência</option>
        </select>
      </div>

      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          disabled={isOverstock || !productId}
          className={`w-full py-4 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
            isOverstock || !productId
              ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
              : 'bg-rose-600 text-white shadow-xl shadow-rose-600/20 hover:bg-rose-700 active:scale-[0.98]'
          }`}
        >
          Registrar Saída de Estoque
        </button>
      </div>
    </form>
  )
}
