import { Star } from 'lucide-react'
import { SectionShell } from './SectionShell'

const testimonials = [
  { name: 'Marina Lima', role: 'Diretora Operacional', company: 'NorteLog Distribuicao', text: 'Ganhos imediatos de controle e rastreabilidade em toda a cadeia.' },
  { name: 'Carlos Menezes', role: 'Gerente Financeiro', company: 'Atlas Industrial', text: 'Unificamos estoque e financeiro com decisao baseada em dados.' },
  { name: 'Paulo Ribeiro', role: 'Head de Supply', company: 'Ventor Tecnologia', text: 'A governanca de acessos reduziu retrabalho e riscos de auditoria.' },
]

export function Testimonials() {
  return (
    <SectionShell title="Prova social" subtitle="Depoimentos ficticios com visual comercial de alto impacto.">
      <div className="grid gap-4 lg:grid-cols-3">
        {testimonials.map((item) => (
          <article key={item.name} className="rounded-3xl border border-slate-200 bg-white p-6">
            <div className="mb-3 flex text-amber-500">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className="h-4 w-4 fill-current" />)}</div>
            <p className="text-sm font-medium leading-relaxed text-slate-700">"{item.text}"</p>
            <p className="mt-4 text-sm font-black text-slate-900">{item.name}</p>
            <p className="text-xs font-semibold text-slate-500">{item.role} - {item.company}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
