import { Boxes, ArrowDownUp, LayoutDashboard, Wallet, FileBarChart2, Users, Shield, Bell } from 'lucide-react'
import { SectionShell } from './SectionShell'

const benefits = [
  { icon: Boxes, title: 'Controle total de estoque', desc: 'Visao completa de itens, lotes e disponibilidade em tempo real.' },
  { icon: ArrowDownUp, title: 'Entrada e saida de materiais', desc: 'Fluxo operacional simples para movimentacoes seguras.' },
  { icon: LayoutDashboard, title: 'Dashboard gerencial', desc: 'Indicadores de performance para lideranca e operacao.' },
  { icon: Wallet, title: 'Controle financeiro', desc: 'Custo por item, margem e analise de impacto financeiro.' },
  { icon: FileBarChart2, title: 'Relatorios inteligentes', desc: 'Insights acionaveis para tomada de decisao rapida.' },
  { icon: Users, title: 'Usuarios e permissoes', desc: 'Acesso por perfil com governanca e controle total.' },
  { icon: Shield, title: 'Auditoria e historico', desc: 'Rastreabilidade de alteracoes com logs confiaveis.' },
  { icon: Bell, title: 'Alertas de estoque minimo', desc: 'Notificacoes preventivas para evitar rupturas.' },
]

export function Benefits() {
  return (
    <SectionShell id="recursos" title="Beneficios que elevam sua operacao" subtitle="Do estoque ao financeiro, cada modulo foi pensado para eficiencia empresarial.">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {benefits.map((item) => (
          <article key={item.title} className="group rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-cyan-50 text-cyan-700 group-hover:bg-cyan-100">
              <item.icon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-black text-slate-900">{item.title}</h3>
            <p className="mt-2 text-sm font-medium leading-relaxed text-slate-600">{item.desc}</p>
          </article>
        ))}
      </div>
    </SectionShell>
  )
}
