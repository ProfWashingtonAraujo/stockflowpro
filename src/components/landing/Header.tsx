import { Menu, X, ArrowRight } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import { BrandLogo } from './BrandLogo'

const links = ['Inicio', 'Recursos', 'Demonstracao', 'Planos', 'Sobre', 'Contato']

export function Header() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-white/60 bg-white/70 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-3 lg:px-12">
        <BrandLogo />
        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((item) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-semibold text-slate-700 hover:text-cyan-700">
              {item}
            </a>
          ))}
        </nav>
        <div className="hidden items-center gap-3 lg:flex">
          <a href="#demonstracao" className="rounded-xl border border-cyan-200 px-4 py-2 text-xs font-black uppercase tracking-widest text-cyan-700">Ver Demonstracao</a>
          <a href="/login" className="inline-flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-2 text-xs font-black uppercase tracking-widest text-white">Acessar Sistema <ArrowRight className="h-3.5 w-3.5" /></a>
        </div>
        <button onClick={() => setOpen((v) => !v)} className="rounded-xl border border-slate-200 p-2 text-slate-700 lg:hidden" aria-label="Menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="border-t border-slate-200 bg-white px-6 py-4 lg:hidden">
            <div className="flex flex-col gap-3">
              {links.map((item) => (
                <a key={item} href={`#${item.toLowerCase()}`} onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-700">{item}</a>
              ))}
              <a href="/login" className="mt-2 rounded-xl bg-slate-900 px-4 py-2 text-center text-xs font-black uppercase tracking-widest text-white">Acessar Sistema</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
