import type { Product } from '../../types'

export function ProductForm({ product, onSave }: { product?: Product; onSave: (p: any) => void }) {
  const base = product ?? { id: crypto.randomUUID(), code: '', name: '', category: '', unit: 'Unidade', quantity: 0, minStock: 0, maxStock: 0, cost: 0, salePrice: 0, supplier: '', location: '', status: 'Ativo' }

  return (
    <form className="space-y-6" onSubmit={(e) => {
      e.preventDefault()
      const formData = new FormData(e.currentTarget)
      onSave({
        id: base.id,
        code: String(formData.get('code') ?? ''),
        name: String(formData.get('name') ?? ''),
        category: String(formData.get('category') ?? ''),
        unit: String(formData.get('unit') ?? 'Unidade'),
        quantity: Number(formData.get('quantity') ?? 0),
        minStock: Number(formData.get('minStock') ?? 0),
        maxStock: Number(formData.get('maxStock') ?? 0),
        cost: Number(formData.get('cost') ?? 0),
        salePrice: Number(formData.get('salePrice') ?? 0),
        supplier: String(formData.get('supplier') ?? ''),
        location: String(formData.get('location') ?? ''),
        status: String(formData.get('status') ?? 'Ativo'),
      })
    }}>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Nome do Produto</label>
          <input name="name" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.name} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Código / SKU</label>
          <input name="code" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.code} required />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Categoria</label>
          <select name="category" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.category || 'Informática'}>
            <option>Informática</option>
            <option>Escritório</option>
            <option>Limpeza</option>
            <option>Manutenção</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Unidade</label>
          <input name="unit" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.unit} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Quantidade Atual</label>
          <input name="quantity" type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.quantity} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Estoque Mínimo</label>
          <input name="minStock" type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.minStock} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Estoque Máximo</label>
          <input name="maxStock" type="number" min="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.maxStock} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Custo Unitário (R$)</label>
          <input name="cost" type="number" step="0.01" min="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.cost} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Preço de Venda (R$)</label>
          <input name="salePrice" type="number" step="0.01" min="0" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.salePrice} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Fornecedor Principal</label>
          <input name="supplier" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.supplier} />
        </div>
        <div className="space-y-1.5">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Localização</label>
          <input name="location" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.location} />
        </div>
        <div className="space-y-1.5 md:col-span-2">
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">Status</label>
          <select name="status" className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 py-3 text-sm font-medium outline-none focus:border-blue-400 focus:bg-white transition-all" defaultValue={base.status}>
            <option>Ativo</option>
            <option>Inativo</option>
          </select>
        </div>
      </div>
      <button className="w-full py-4 rounded-2xl bg-blue-600 text-white font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-[0.98] transition-all">
        Salvar Produto
      </button>
    </form>
  )
}
