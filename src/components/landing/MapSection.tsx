import { MapPin, Phone, Mail, Clock } from 'lucide-react'
import { SectionShell } from './SectionShell'

export function MapSection() {
  return (
    <SectionShell title="Endereco e atendimento" subtitle="Carcara.tech - Juazeiro do Norte, Ceara, Brasil">
      <div className="grid gap-4 lg:grid-cols-[0.9fr_1.1fr]">
        <div className="rounded-3xl border border-slate-200 bg-white p-6 text-sm font-medium text-slate-700">
          <p className="mb-3 flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-700" />Carcara.tech - Juazeiro do Norte, Ceara, Brasil</p>
          <p className="mb-3 flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-700" />(88) 99999-0000</p>
          <p className="mb-3 flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-700" />contato@stockflowpro.com</p>
          <p className="flex items-center gap-2"><Clock className="h-4 w-4 text-cyan-700" />Seg-Sex, 08:00 as 18:00</p>
        </div>
        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white p-2">
          <div className="relative h-80 overflow-hidden rounded-2xl">
            <iframe title="Google Maps Juazeiro do Norte" src="https://www.google.com/maps?q=Juazeiro+do+Norte,+Ceara,+Brasil&output=embed" className="h-full w-full border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
