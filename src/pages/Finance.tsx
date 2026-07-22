import { DollarSign } from 'lucide-react'
import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts'
import { ChartCard } from '../components/cards/ChartCard'
import { StatCard } from '../components/cards/StatCard'
import { DataTable } from '../components/ui/Common'
import { monthlyPurchases } from '../data/financial'
import { useStore } from '../hooks/useProducts'
import { brl } from '../utils/format'

export function Finance() {
  const { products } = useStore()
  const total = products.reduce((a, p) => a + p.quantity * p.cost, 0)

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Financeiro</h1>
        <p className="mt-1 text-sm font-medium text-slate-500">Análise de custos, valor em estoque e indicadores financeiros.</p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard title="Valor total em estoque" value={brl(total)} change={8} icon={DollarSign} variant="primary" />
        <StatCard title="Total comprado no mês" value={brl(64900)} change={6} icon={DollarSign} />
        <StatCard title="Custo médio" value={brl(total / Math.max(products.length, 1))} change={2} icon={DollarSign} />
        <StatCard title="Valor em alerta" value={brl(total * 0.23)} change={-3} icon={DollarSign} variant="warning" />
      </div>

      <ChartCard title="Investimento Mensal em Compras">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyPurchases}>
            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
            <Tooltip contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}} />
            <Bar dataKey="value" name="Total Comprado" fill="#2563eb" radius={[6, 6, 0, 0]} barSize={50} />
          </BarChart>
        </ResponsiveContainer>
      </ChartCard>

      <DataTable
        columns={['Produto', 'Categoria', 'Quantidade', 'Custo Unitário', 'Valor Total', 'Saúde Financeira']}
        rows={products.map((p) => (
          <tr key={p.id} className="group border-b border-slate-100 transition-colors hover:bg-slate-50/50">
            <td className="px-6 py-4 font-bold text-slate-900">{p.name}</td>
            <td className="px-6 py-4 text-sm text-slate-500">{p.category}</td>
            <td className="px-6 py-4 font-mono text-sm font-bold">{p.quantity}</td>
            <td className="px-6 py-4 text-sm font-medium">{brl(p.cost)}</td>
            <td className="px-6 py-4 text-sm font-bold text-slate-900">{brl(p.cost * p.quantity)}</td>
            <td className="px-6 py-4">
              <span className={`inline-flex items-center gap-1.5 text-xs font-bold ${p.quantity > p.minStock ? 'text-emerald-600' : 'text-amber-600'}`}>
                <div className={`h-1.5 w-1.5 rounded-full ${p.quantity > p.minStock ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'}`} />
                {p.quantity > p.minStock ? 'Saudável' : 'Atenção'}
              </span>
            </td>
          </tr>
        ))}
      />
    </div>
  )
}
