import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts'
import { Package, AlertTriangle, ArrowDown, ArrowUp, DollarSign, ShoppingCart, Activity } from 'lucide-react'
import { StatCard } from '../components/cards/StatCard'
import { ChartCard } from '../components/cards/ChartCard'
import { useStore } from '../hooks/useProducts'
import { brl } from '../utils/format'
import { monthlyPurchases, categoryDistribution } from '../data/financial'

const COLORS = ['#2563eb', '#7c3aed', '#10b981', '#f59e0b', '#ef4444']

export function Dashboard() {
  const { products, movements } = useStore()
  
  const totalStockValue = products.reduce((acc, curr) => acc + (curr.quantity * curr.cost), 0)
  const lowStockItems = products.filter(p => p.quantity <= p.minStock).length
  const activeProducts = products.filter(p => p.status === 'Ativo').length

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Welcome Banner */}
      <div className="relative overflow-hidden rounded-[32px] bg-slate-900 p-8 text-white shadow-2xl shadow-slate-900/20 group">
        <div className="absolute -right-10 -top-10 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl group-hover:bg-blue-600/30 transition-all duration-700" />
        <div className="absolute -left-10 -bottom-10 h-64 w-64 rounded-full bg-indigo-600/10 blur-3xl" />
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
          <div className="text-center md:text-left flex-1">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-black uppercase tracking-widest border border-blue-500/20">
                Acesso Enterprise
              </span>
              <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">
                Sistema Online
              </span>
            </div>
            <h2 className="text-3xl font-black tracking-tight mb-2">
              Bem-vindo de volta, <span className="text-blue-400">Washington Araújo!</span>
            </h2>
            <p className="text-slate-400 font-medium max-w-lg leading-relaxed">
              Seu estoque está sendo monitorado em tempo real. Você tem <span className="text-white font-bold">{lowStockItems} itens</span> com estoque baixo que precisam de atenção hoje.
            </p>
          </div>
          
          <div className="hidden lg:flex flex-col items-end gap-2 pr-4">
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-500">Saldo Operacional</p>
            <p className="text-3xl font-black text-white">{brl(totalStockValue)}</p>
            <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold">
              <ArrowUp className="h-3 w-3" />
              +5.4% este mês
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900">Dashboard</h1>
          <p className="mt-1 text-sm font-medium text-slate-500">Visão geral do estoque, movimentações e indicadores financeiros.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-2xl border border-slate-200 shadow-sm text-xs font-bold text-slate-600">
          <Activity className="h-4 w-4 text-emerald-500" />
          Sistema Atualizado: <span className="text-slate-900">Hoje, 10:45</span>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard title="Total de Produtos" value={products.length.toString()} change={12} icon={Package} variant="primary" />
        <StatCard title="Estoque Baixo" value={lowStockItems.toString()} change={-2} icon={AlertTriangle} variant="warning" />
        <StatCard title="Valor em Estoque" value={brl(totalStockValue)} change={5.4} icon={DollarSign} variant="success" />
        <StatCard title="Custo de Compras" value={brl(64900)} change={8.2} icon={ShoppingCart} variant="danger" />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <ChartCard title="Evolução de Entradas x Saídas">
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={monthlyPurchases}>
                <defs>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                <Tooltip 
                  contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'}}
                />
                <Area type="monotone" dataKey="value" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>

        <ChartCard title="Distribuição por Categoria">
          <div className="h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={categoryDistribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </ChartCard>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Produtos com Estoque Crítico</h3>
          <div className="space-y-4">
            {products.filter(p => p.quantity <= p.minStock).slice(0, 5).map(p => (
              <div key={p.id} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-all group">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:shadow-md transition-all">
                    <Package className="h-5 w-5 text-slate-400 group-hover:text-blue-500" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900">{p.name}</p>
                    <p className="text-xs font-medium text-slate-500">{p.category} • {p.code}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-black text-rose-600">{p.quantity} {p.unit}</p>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Mínimo: {p.minStock}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm">
          <h3 className="text-lg font-bold text-slate-900 mb-6">Alertas Recentes</h3>
          <div className="space-y-6">
            {[
              { type: 'danger', msg: 'Estoque de Toner HP atingiu o nível crítico.', time: '10 min atrás' },
              { type: 'success', msg: 'Recebimento de 100m Cabo CAT6 concluído.', time: '1h atrás' },
              { type: 'warning', msg: 'Saída pendente de autorização: TI - Notebooks.', time: '3h atrás' },
              { type: 'info', msg: 'Novo fornecedor Office Center cadastrado.', time: 'Ontem' },
            ].map((alert, i) => (
              <div key={i} className="flex gap-4">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
                  alert.type === 'danger' ? 'bg-rose-500 shadow-[0_0_8px_rgba(244,63,94,0.5)]' :
                  alert.type === 'success' ? 'bg-emerald-500' :
                  alert.type === 'warning' ? 'bg-amber-500' : 'bg-blue-500'
                }`} />
                <div>
                  <p className="text-sm font-bold text-slate-800 leading-tight">{alert.msg}</p>
                  <p className="text-[10px] font-medium text-slate-400 mt-1">{alert.time}</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 rounded-2xl bg-slate-50 text-xs font-black text-slate-600 hover:bg-slate-100 transition-all">
            VER TODAS AS NOTIFICAÇÕES
          </button>
        </div>
      </div>
    </div>
  )
}
