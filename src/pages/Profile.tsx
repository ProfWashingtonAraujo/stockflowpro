import React, { useState, useRef } from 'react'
import { Camera, Save, Lock, ChevronRight, CheckCircle2, User as UserIcon, Shield, Mail, Briefcase } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'

export function Profile() {
  const { user, updateUser } = useAuth()
  const { push } = useToast()
  const [isSaving, setIsSaving] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    job: user?.job || '',
  })

  if (!user) return null

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      updateUser({
        name: formData.name,
        email: formData.email,
        job: formData.job
      })
      setIsSaving(false)
      push('Perfil atualizado com sucesso!', 'success')
    }, 1000)
  }

  const handleAvatarClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateUser({ avatar: reader.result as string })
        push('Foto de perfil atualizada!', 'success')
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div>
        <h1 className="text-4xl font-black tracking-tight text-slate-900">Meu Perfil</h1>
        <p className="mt-2 text-slate-500 font-medium">Gerencie suas informações pessoais e segurança da conta.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Lado Esquerdo: Resumo do Perfil */}
        <div className="lg:col-span-1 space-y-6">
          <div className="bg-white rounded-[2.5rem] border border-slate-200 p-8 shadow-sm flex flex-col items-center text-center">
            <div className="relative group cursor-pointer mb-6" onClick={handleAvatarClick}>
              <div className="h-32 w-32 rounded-[2.5rem] bg-gradient-to-br from-blue-500 to-indigo-600 p-1 shadow-2xl shadow-blue-200 transition-transform group-hover:scale-105 duration-500">
                <div className="h-full w-full rounded-[2.2rem] bg-white p-1 overflow-hidden">
                  <img 
                    src={user.avatar || 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=facepad&facepad=2&w=256&h=256&q=80'} 
                    alt={user.name}
                    className="h-full w-full object-cover rounded-[1.8rem]"
                  />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 h-10 w-10 bg-white rounded-2xl shadow-xl flex items-center justify-center text-blue-600 border border-slate-100 group-hover:bg-blue-600 group-hover:text-white transition-all">
                <Camera className="h-5 w-5" />
              </div>
              <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />
            </div>

            <h3 className="text-xl font-black text-slate-900">{user.name}</h3>
            <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">{user.role}</p>
            
            <div className="w-full pt-6 border-t border-slate-100 space-y-3">
              <div className="flex items-center gap-3 text-slate-600">
                <Mail className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold truncate">{user.email}</span>
              </div>
              <div className="flex items-center gap-3 text-slate-600">
                <Briefcase className="h-4 w-4 text-slate-400" />
                <span className="text-xs font-bold">{user.job}</span>
              </div>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden">
            <div className="absolute -right-8 -bottom-8 h-32 w-32 bg-blue-500/10 rounded-full blur-3xl" />
            <h4 className="text-lg font-black mb-2 relative z-10">Segurança</h4>
            <p className="text-xs text-slate-400 mb-6 relative z-10 leading-relaxed">Sua conta está protegida com criptografia de ponta a ponta.</p>
            <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
              <Shield className="h-3 w-3" />
              Status: Seguro
            </div>
          </div>
        </div>

        {/* Lado Direito: Formulários */}
        <div className="lg:col-span-2 space-y-8">
          {/* Dados Pessoais */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
                <UserIcon className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Informações Pessoais</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Mantenha seus dados atualizados</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Nome Completo</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-mail Corporativo</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Cargo / Função</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                  value={formData.job}
                  onChange={(e) => setFormData({...formData, job: e.target.value})}
                />
              </div>
            </div>

            <div className="mt-8 flex justify-end">
              <button 
                onClick={handleSave}
                disabled={isSaving}
                className="flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-2xl font-black text-sm hover:bg-blue-700 transition-all active:scale-95 shadow-xl shadow-blue-200 disabled:opacity-50"
              >
                {isSaving ? (
                  <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  <>
                    <Save className="h-4 w-4" />
                    SALVAR ALTERAÇÕES
                  </>
                )}
              </button>
            </div>
          </section>

          {/* Segurança */}
          <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
                <Lock className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-black text-slate-900">Segurança da Conta</h3>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Proteja seu acesso</p>
              </div>
            </div>

            <div className="grid gap-4">
              <button className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-blue-200 hover:bg-blue-50/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-blue-500 transition-colors">
                    <Lock className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black text-slate-800">Alterar Senha</h4>
                    <p className="text-xs text-slate-500 font-medium">Atualize sua senha de acesso periodicamente.</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-blue-400 transition-all" />
              </button>

              <button className="w-full flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 group hover:border-emerald-200 hover:bg-emerald-50/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center shadow-sm text-slate-400 group-hover:text-emerald-500 transition-colors">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div className="text-left">
                    <h4 className="text-sm font-black text-slate-800">Autenticação em Duas Etapas</h4>
                    <p className="text-xs text-slate-500 font-medium">Adicione uma camada extra de proteção.</p>
                  </div>
                </div>
                <div className="h-6 w-11 bg-slate-200 rounded-full relative">
                  <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full" />
                </div>
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
