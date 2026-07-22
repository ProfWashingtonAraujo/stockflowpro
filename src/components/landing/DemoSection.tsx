import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { SectionShell } from './SectionShell'

const screens = ['Dashboard', 'Estoque', 'Financeiro', 'Relatorios', 'Usuarios']

export function DemoSection() {
  const [open, setOpen] = useState(false)

  return (
    <SectionShell id="demonstracao" title="Veja o StockFlow Pro em acao" subtitle="Experiencia visual premium pronta para apresentacao comercial.">
      <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
          <div className="rounded-2xl bg-slate-100 p-4">
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((n) => <div key={n} className="h-16 rounded-xl bg-white" />)}
            </div>
          </div>
          <button onClick={() => setOpen(true)} className="mt-4 rounded-xl bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">Acessar demonstracao</button>
        </div>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
          {screens.map((s) => <div key={s} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-800">{s}</div>)}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div initial={{ y: 20, scale: 0.96 }} animate={{ y: 0, scale: 1 }} exit={{ y: 20, scale: 0.96 }} className="w-full max-w-3xl rounded-3xl bg-white p-6">
              <h3 className="text-xl font-black text-slate-900">Preview do sistema</h3>
              <p className="mt-2 text-sm font-medium text-slate-600">Ambiente visual de demonstracao com dados ficticios.</p>
              <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">{screens.map((s) => <div key={s} className="rounded-xl bg-slate-100 p-3 text-center text-xs font-bold">{s}</div>)}</div>
              <button onClick={() => setOpen(false)} className="mt-5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-black uppercase tracking-widest text-slate-700">Fechar</button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </SectionShell>
  )
}
