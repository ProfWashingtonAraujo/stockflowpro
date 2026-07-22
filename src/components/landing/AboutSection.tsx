import { SectionShell } from './SectionShell'

export function AboutSection() {
  return (
    <SectionShell id="sobre" title="Sobre a solucao" subtitle="StockFlow Pro foi desenvolvido para empresas que precisam de controle, seguranca e visao estrategica sobre materiais e indicadores operacionais.">
      <div className="rounded-3xl border border-slate-200 bg-white p-7">
        <p className="text-lg font-semibold leading-relaxed text-slate-700">Uma solucao desenvolvida com foco em produtividade, seguranca e tomada de decisao.</p>
      </div>
    </SectionShell>
  )
}
