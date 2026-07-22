import type { Product } from '../../types'

export function ProductForm({ product, onSave }: { product?: Product; onSave: (p: any) => void }) {
  const base = product ?? { id: crypto.randomUUID(), code: '', name: '', category: '', unit: 'Unidade', quantity: 0, minStock: 0, maxStock: 0, cost: 0, salePrice: 0, supplier: '', location: '', status: 'Ativo' }

  return (
    <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); onSave(base) }}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Nome do Produto</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.name} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Código / SKU</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.code} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Categoria</label>
          <select className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.category}>
            <option>Informática</option>
            <option>Escritório</option>
            <option>Limpeza</option>
            <option>Manutenção</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Unidade</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.unit} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Custo Unitário (R$)</label>
          <input type="number" step="0.01" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.cost} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Fornecedor Principal</label>
          <input className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.supplier} />
        </div>
      </div>
      <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all">
        Salvar Produto
      </button>
    </form>
  )
}
