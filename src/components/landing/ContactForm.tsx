import { FormEvent, useState } from 'react'
import { Mail, Phone, User, Building2, MessageSquare } from 'lucide-react'
import { SectionShell } from './SectionShell'
import { Instagram, Linkedin, Facebook, MessageCircle, Github } from 'lucide-react'

export function ContactForm() {
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSent(true)
    setTimeout(() => setSent(false), 3500)
  }

  return (
    <SectionShell id="contato" title="Fale com nosso time" subtitle="Formulario frontend com validacao nativa e retorno visual imediato.">
      <form onSubmit={handleSubmit} className="grid gap-4 rounded-3xl border border-slate-200 bg-white p-6 md:grid-cols-2">
        <Field icon={User} name="nome" label="Nome" type="text" required />
        <Field icon={Building2} name="empresa" label="Empresa" type="text" required />
        <Field icon={Mail} name="email" label="E-mail" type="email" required />
        <Field icon={Phone} name="telefone" label="Telefone/WhatsApp" type="tel" required />
        <Field icon={MessageSquare} name="assunto" label="Assunto" type="text" required />
        <label className="md:col-span-2">
          <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">Mensagem</span>
          <textarea required rows={5} className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-medium outline-none focus:border-cyan-400" />
        </label>
        <div className="md:col-span-2 flex items-center justify-between gap-3">
          <p className="text-xs font-semibold text-slate-500">Construido por Carcara.tech</p>
          <button className="rounded-xl bg-slate-900 px-5 py-3 text-xs font-black uppercase tracking-widest text-white">Enviar solicitacao</button>
        </div>
        <div className="md:col-span-2 flex items-center gap-2">
          {[Instagram, Linkedin, Facebook, MessageCircle, Github].map((Icon, i) => (
            <a key={i} href="#" className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:text-cyan-700">
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        {sent && <p className="md:col-span-2 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">Solicitacao enviada com sucesso (simulacao frontend).</p>}
      </form>
    </SectionShell>
  )
}

type FieldProps = { icon: any; name: string; label: string; type: string; required?: boolean }

function Field({ icon: Icon, name, label, type, required }: FieldProps) {
  return (
    <label>
      <span className="mb-2 block text-xs font-black uppercase tracking-widest text-slate-500">{label}</span>
      <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3">
        <Icon className="h-4 w-4 text-slate-400" />
        <input name={name} type={type} required={required} className="w-full bg-transparent px-1 py-3 text-sm font-medium outline-none" />
      </div>
    </label>
  )
}
