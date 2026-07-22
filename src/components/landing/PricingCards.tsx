import { Check } from 'lucide-react'
import { SectionShell } from './SectionShell'

const plans = [
  {
    name: 'Plano Essencial',
    badge: '',
    cta: 'Escolher plano',
    items: ['Controle de produtos', 'Entrada e saida de estoque', 'Dashboard basico', '2 usuarios'],
  },
  {
    name: 'Plano Profissional',
    badge: 'Mais escolhido',
    cta: 'Solicitar demonstracao',
    featured: true,
    items: ['Dashboard avancado', 'Relatorios inteligentes', 'Controle financeiro', 'Ate 10 usuarios', 'Permissoes por perfil'],
  },
  {
    name: 'Plano Enterprise',
    badge: '',
    cta: 'Falar com consultor',
    items: ['Usuarios ilimitados', 'Auditoria completa', 'Relatorios personalizados', 'Suporte prioritario', 'Implantacao assistida'],
  },
]

export function PricingCards() {
  return (
    <SectionShell id="planos" title="Planos sob medida para cada operacao" subtitle="Composicao comercial premium para vendas consultivas e empresas em crescimento.">
      <div className="grid gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <article key={plan.name} className={`rounded-3xl border p-6 ${plan.featured ? 'border-cyan-300 bg-cyan-50 shadow-lg' : 'border-slate-200 bg-white'}`}>
            {plan.badge && <p className="mb-3 inline-block rounded-full bg-cyan-600 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-white">{plan.badge}</p>}
            <h3 className="text-xl font-black text-slate-900">{plan.name}</h3>
            <p className="mt-1 text-sm font-semibold text-slate-500">Sob consulta</p>
            <div className="mt-5 space-y-2">{plan.items.map((item) => <p key={item} className="flex items-center gap-2 text-sm font-medium text-slate-700"><Check className="h-4 w-4 text-emerald-600" />{item}</p>)}</div>
            <button className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-xs font-black uppercase tracking-widest text-white">{plan.cta}</button>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
