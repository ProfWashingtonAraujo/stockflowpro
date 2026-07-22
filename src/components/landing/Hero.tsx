import { motion } from 'framer-motion'
import { ArrowRight, BarChart3, ShieldCheck, Timer, GaugeCircle } from 'lucide-react'

const stats = [
  '99,8% de confiabilidade operacional',
  '35+ permissoes mapeadas',
  '-42% no tempo de auditoria',
  'Relatorios em tempo real',
]

export function Hero() {
  return (
    <section id="inicio" className="mx-auto grid w-full max-w-7xl gap-10 px-6 pb-16 pt-14 lg:grid-cols-2 lg:px-12">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
        <p className="inline-flex rounded-full border border-cyan-200 bg-cyan-50 px-4 py-2 text-[11px] font-black uppercase tracking-widest text-cyan-700">SaaS empresarial premium</p>
        <h1 className="mt-6 text-4xl font-black tracking-tight text-slate-900 md:text-6xl">Gestao de estoque inteligente para empresas que operam em alto nivel</h1>
        <p className="mt-5 max-w-xl text-lg font-medium leading-relaxed text-slate-600">Controle entradas, saidas, estoque, financeiro, usuarios, permissoes, relatorios e auditorias em uma plataforma unica, sofisticada e pronta para escalar.</p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a href="/login" className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-900 px-6 py-4 text-sm font-black uppercase tracking-widest text-white">Acessar Sistema <ArrowRight className="h-4 w-4" /></a>
          <a href="#demonstracao" className="inline-flex items-center justify-center rounded-2xl border border-cyan-200 bg-white px-6 py-4 text-sm font-black uppercase tracking-widest text-cyan-700">Solicitar Demonstracao</a>
        </div>
      </motion.div>

      <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.7 }} className="relative">
        <div className="rounded-[2rem] border border-cyan-100 bg-white p-5 shadow-2xl shadow-cyan-100">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-black text-slate-800">Dashboard Operacional</p>
            <ShieldCheck className="h-5 w-5 text-emerald-500" />
          </div>
          <div className="grid grid-cols-2 gap-3">
            {[BarChart3, GaugeCircle, Timer, ShieldCheck].map((Icon, i) => (
              <div key={i} className="rounded-2xl bg-slate-50 p-4">
                <Icon className="h-5 w-5 text-cyan-700" />
                <p className="mt-2 text-xs font-bold text-slate-500">KPI {i + 1}</p>
                <p className="text-xl font-black text-slate-900">{[84, 96, 32, 99][i]}%</p>
              </div>
            ))}
          </div>
        </div>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {stats.map((item, i) => (
            <motion.div key={item} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.08 }} className="rounded-2xl border border-white bg-white/80 px-4 py-3 text-xs font-bold text-slate-700 shadow-lg shadow-cyan-100">
              {item}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
