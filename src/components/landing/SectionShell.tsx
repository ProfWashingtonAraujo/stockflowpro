import { motion } from 'framer-motion'
import { ReactNode } from 'react'

type SectionShellProps = {
  id?: string
  title: string
  subtitle?: string
  children: ReactNode
}

export function SectionShell({ id, title, subtitle, children }: SectionShellProps) {
  return (
    <motion.section
      id={id}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6 }}
      className="mx-auto w-full max-w-7xl px-6 py-16 lg:px-12"
    >
      <div className="mb-10 max-w-3xl">
        <h2 className="text-3xl font-black tracking-tight text-slate-900 md:text-4xl">{title}</h2>
        {subtitle && <p className="mt-3 text-base font-medium leading-relaxed text-slate-600">{subtitle}</p>}
      </div>
      {children}
    </motion.section>
  )
}
