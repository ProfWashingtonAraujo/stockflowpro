import { BrandLogo } from './BrandLogo'
import { Instagram, Linkedin, Facebook, MessageCircle, Github } from 'lucide-react'

const social = [
  { icon: Instagram, href: 'https://instagram.com/' },
  { icon: Linkedin, href: 'https://linkedin.com/' },
  { icon: Facebook, href: 'https://facebook.com/' },
  { icon: MessageCircle, href: 'https://wa.me/5588999990000' },
  { icon: Github, href: 'https://github.com/' },
]

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-6 py-12 lg:grid-cols-4 lg:px-12">
        <div>
          <BrandLogo />
          <p className="mt-4 text-sm font-medium leading-relaxed text-slate-600">Plataforma SaaS para gestao de estoque, governanca de acessos e inteligencia operacional.</p>
          <p className="mt-3 text-xs font-bold text-slate-500">Construido por Carcara.tech</p>
        </div>
        <FooterCol title="Links rapidos" items={['Inicio', 'Recursos', 'Demonstracao', 'Planos']} />
        <FooterCol title="Recursos" items={['Estoque', 'Financeiro', 'Auditoria', 'Usuarios']} />
        <div>
          <p className="text-sm font-black text-slate-900">Contato</p>
          <p className="mt-3 text-sm font-medium text-slate-600">contato@stockflowpro.com</p>
          <div className="mt-4 flex items-center gap-2">
            {social.map((item, i) => (
              <a key={i} href={item.href} target="_blank" className="rounded-xl border border-slate-200 p-2 text-slate-600 hover:border-cyan-300 hover:text-cyan-700" rel="noreferrer">
                <item.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-slate-200">
        <div className="mx-auto w-full max-w-7xl px-6 py-4 text-center text-xs font-semibold text-slate-500">
          © 2026 StockFlow Pro. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  )
}

function FooterCol({ title, items }: { title: string; items: string[] }) {
  return (
    <div>
      <p className="text-sm font-black text-slate-900">{title}</p>
      <div className="mt-3 space-y-2">{items.map((item) => <p key={item} className="text-sm font-medium text-slate-600">{item}</p>)}</div>
    </div>
  )
}
