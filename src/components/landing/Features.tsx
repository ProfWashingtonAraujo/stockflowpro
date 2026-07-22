import { SectionShell } from './SectionShell'

const features = [
  'Gestao de produtos e categorias',
  'Movimentacoes de entrada e saida',
  'Controle de fornecedores',
  'Relatorios exportaveis',
  'Painel financeiro',
  'Gestao de usuarios',
  'Permissoes por perfil',
  'Logs e rastreabilidade',
]

export function Features() {
  return (
    <SectionShell title="Recursos projetados para escala" subtitle="Arquitetura de interface orientada para controle operacional, governanca e visibilidade executiva.">
      <div className="grid gap-4 md:grid-cols-2">
        {features.map((item) => (
          <div key={item} className="rounded-2xl border border-slate-200 bg-white p-4">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-black uppercase tracking-widest text-emerald-700">Ativo</span>
            <p className="mt-3 text-base font-bold text-slate-800">{item}</p>
          </div>
        ))}
      </div>
    </SectionShell>
  )
}
