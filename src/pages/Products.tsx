import { useState } from 'react'
import { Plus, LayoutGrid, List, MoreVertical, Eye, Edit2, Trash2 } from 'lucide-react'
import { DataTable, SearchInput, FilterBar } from '../components/ui/Common'
import { Badge, StatusBadge } from '../components/ui/Badge'
import { Modal } from '../components/ui/Modal'
import { ProductForm } from '../components/forms/ProductForm'
import { useStore } from '../hooks/useProducts'
import { brl } from '../utils/format'

export function Products() {
  const { products, saveProduct, loading, error } = useStore()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  const handleSave = async (product: any) => {
    await saveProduct(product)
    setIsModalOpen(false)
    setSelectedProduct(null)
  }

  if (loading) {
    return <div className="rounded-3xl border border-slate-200 bg-white p-8 text-sm font-medium text-slate-500">Carregando produtos...</div>
  }

  if (error) {
    return <div className="rounded-3xl border border-rose-200 bg-rose-50 p-8 text-sm font-medium text-rose-700">{error}</div>
  }

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Produtos e Materiais</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Gerencie seu catálogo completo de materiais e insumos.</p>
        </div>
        <button 
          onClick={() => { setSelectedProduct(null); setIsModalOpen(true) }}
          className="flex items-center justify-center gap-2 px-6 py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs uppercase tracking-widest shadow-xl shadow-blue-600/20 hover:bg-blue-700 active:scale-95 transition-all"
        >
          <Plus className="h-4 w-4" />
          Novo Produto
        </button>
      </div>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
        <SearchInput placeholder="Buscar por nome, código ou fornecedor..." />
        <FilterBar>
          <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer">
            <option>Todas as Categorias</option>
            <option>Informática</option>
            <option>Escritório</option>
          </select>
          <div className="h-4 w-px bg-slate-100" />
          <select className="bg-transparent border-none text-xs font-black uppercase tracking-widest text-slate-600 outline-none cursor-pointer">
            <option>Status: Todos</option>
            <option>Ativos</option>
            <option>Inativos</option>
          </select>
        </FilterBar>
      </div>

      <DataTable
        columns={[
          'Código',
          'Produto',
          'Categoria',
          'Qtd Atual',
          'Mínimo',
          'Custo Unit.',
          'Valor Total',
          'Status',
          'Ações'
        ]}
        rows={products.map((p) => (
          <tr key={p.id} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-5 text-xs font-bold text-slate-400 uppercase tracking-widest">{p.code}</td>
            <td className="px-6 py-5">
              <div className="flex flex-col">
                <span className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">{p.name}</span>
                <span className="text-[10px] font-medium text-slate-500">{p.supplier}</span>
              </div>
            </td>
            <td className="px-6 py-5">
              <Badge variant="info">{p.category}</Badge>
            </td>
            <td className="px-6 py-5">
              <div className="flex flex-col">
                <span className={`font-mono font-bold ${p.quantity <= p.minStock ? 'text-rose-600' : 'text-slate-900'}`}>
                  {p.quantity} {p.unit}
                </span>
                <div className="w-16 h-1 bg-slate-100 rounded-full mt-1 overflow-hidden">
                  <div 
                    className={`h-full rounded-full ${p.quantity <= p.minStock ? 'bg-rose-500' : 'bg-blue-500'}`}
                    style={{ width: `${Math.min((p.quantity / p.maxStock) * 100, 100)}%` }}
                  />
                </div>
              </div>
            </td>
            <td className="px-6 py-5 text-sm font-medium text-slate-500">{p.minStock}</td>
            <td className="px-6 py-5 text-sm font-medium text-slate-900">{brl(p.cost)}</td>
            <td className="px-6 py-5 text-sm font-black text-slate-900">{brl(p.cost * p.quantity)}</td>
            <td className="px-6 py-5">
              <StatusBadge status={p.status} />
            </td>
            <td className="px-6 py-5">
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all">
                  <Eye className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => { setSelectedProduct(p); setIsModalOpen(true) }}
                  className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-amber-50 hover:text-amber-600 transition-all"
                >
                  <Edit2 className="h-4 w-4" />
                </button>
                <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:bg-rose-50 hover:text-rose-600 transition-all">
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      />

      <Modal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        title={selectedProduct ? 'Editar Produto' : 'Novo Produto'}
      >
        <ProductForm product={selectedProduct} onSave={handleSave} />
      </Modal>
    </div>
  )
}
