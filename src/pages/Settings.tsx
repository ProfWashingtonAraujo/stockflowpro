import React, { useState } from 'react'
import { Building, Save, Bell, DollarSign, Globe, Database, ShieldCheck, ChevronRight } from 'lucide-react'
import { useToast } from '../hooks/useToast'

export function Settings() {
  const { push } = useToast()
  const [isSaving, setIsSaving] = useState(false)

  const [formData, setFormData] = useState({
    companyName: 'StockFlow Pro Ltda',
    cnpj: '12.345.678/0001-99',
    email: 'contato@stockflow.pro',
    currency: 'BRL',
    lowStockNotify: true,
    language: 'pt-BR'
  })

  const handleSave = () => {
    setIsSaving(true)
    setTimeout(() => {
      setIsSaving(false)
      push('Configurações do sistema salvas!', 'success')
    }, 1000)
  }

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-end justify-between">
        <div>
          <h1 className="text-4xl font-black tracking-tight text-slate-900">Configurações do Sistema</h1>
          <p className="mt-2 text-slate-500 font-medium">Gerencie os dados da empresa e as preferências globais do StockFlow Pro.</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3.5 rounded-2xl font-black text-sm hover:bg-slate-800 transition-all active:scale-95 shadow-xl shadow-slate-200 disabled:opacity-50"
        >
          {isSaving ? (
            <div className="h-5 w-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              <Save className="h-4 w-4" />
              SALVAR TUDO
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Dados da Empresa */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600 border border-blue-100">
              <Building className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Dados da Empresa</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Informações fiscais e de contato</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Razão Social</label>
              <input 
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                value={formData.companyName}
                onChange={(e) => setFormData({...formData, companyName: e.target.value})}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">CNPJ</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                  value={formData.cnpj}
                  onChange={(e) => setFormData({...formData, cnpj: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">E-mail de Suporte</label>
                <input 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all" 
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Preferências e Localização */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-600 border border-amber-100">
              <Globe className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Regional e Moeda</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Ajuste o sistema à sua região</p>
            </div>
          </div>

          <div className="grid gap-6">
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Moeda Principal</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
                  <DollarSign className="h-4 w-4 text-slate-400" />
                </div>
                <select 
                  className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 pl-12 pr-5 py-4 text-sm font-bold outline-none appearance-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                  value={formData.currency}
                  onChange={(e) => setFormData({...formData, currency: e.target.value})}
                >
                  <option value="BRL">Real Brasileiro (BRL)</option>
                  <option value="USD">Dólar Americano (USD)</option>
                  <option value="EUR">Euro (EUR)</option>
                </select>
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-xs font-black text-slate-400 uppercase tracking-widest ml-1">Idioma do Sistema</label>
              <select 
                className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-5 py-4 text-sm font-bold outline-none appearance-none focus:border-blue-400 focus:ring-4 focus:ring-blue-50 focus:bg-white transition-all"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value})}
              >
                <option value="pt-BR">Português (Brasil)</option>
                <option value="en-US">English (USA)</option>
                <option value="es-ES">Español</option>
              </select>
            </div>
          </div>
        </section>

        {/* Notificações e Alertas */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-rose-50 flex items-center justify-center text-rose-600 border border-rose-100">
              <Bell className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Notificações</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Alertas inteligentes do sistema</p>
            </div>
          </div>

          <div className="space-y-4">
            <label className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 cursor-pointer hover:bg-white transition-all">
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-800 mb-1">Alerta de Estoque Baixo</h4>
                <p className="text-xs text-slate-500 font-medium">Notificar quando um produto atingir o estoque mínimo.</p>
              </div>
              <div className={`h-6 w-11 rounded-full relative transition-colors ${formData.lowStockNotify ? 'bg-blue-600' : 'bg-slate-200'}`} onClick={() => setFormData({...formData, lowStockNotify: !formData.lowStockNotify})}>
                <div className={`absolute top-1 h-4 w-4 bg-white rounded-full transition-all ${formData.lowStockNotify ? 'left-6' : 'left-1'}`} />
              </div>
            </label>

            <label className="flex items-center justify-between p-6 rounded-[2rem] bg-slate-50 border border-slate-100 cursor-pointer hover:bg-white transition-all opacity-50">
              <div className="flex-1">
                <h4 className="text-sm font-black text-slate-800 mb-1">Relatórios Semanais por E-mail</h4>
                <p className="text-xs text-slate-500 font-medium">Receba um resumo financeiro todas as segundas.</p>
              </div>
              <div className="h-6 w-11 bg-slate-200 rounded-full relative">
                <div className="absolute left-1 top-1 h-4 w-4 bg-white rounded-full" />
              </div>
            </label>
          </div>
        </section>

        {/* Manutenção e Dados */}
        <section className="bg-white rounded-[2.5rem] border border-slate-200 p-10 shadow-sm">
          <div className="flex items-center gap-4 mb-8">
            <div className="h-12 w-12 rounded-2xl bg-slate-100 flex items-center justify-center text-slate-600 border border-slate-200">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <h3 className="text-xl font-black text-slate-900">Manutenção e Dados</h3>
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Backup e integridade do sistema</p>
            </div>
          </div>

          <div className="grid gap-3">
            <button className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all text-left group">
              <div className="flex items-center gap-4">
                <Database className="h-5 w-5 text-slate-400 group-hover:text-blue-500 transition-colors" />
                <div>
                  <h4 className="text-sm font-black text-slate-800">Exportar Banco de Dados</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Formato .SQL ou .JSON</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </button>
            <button className="flex items-center justify-between p-5 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-all text-left group">
              <div className="flex items-center gap-4">
                <ShieldCheck className="h-5 w-5 text-slate-400 group-hover:text-emerald-500 transition-colors" />
                <div>
                  <h4 className="text-sm font-black text-slate-800">Verificar Integridade</h4>
                  <p className="text-[10px] text-slate-500 font-bold uppercase">Última verificação: Hoje, 10:45</p>
                </div>
              </div>
              <ChevronRight className="h-4 w-4 text-slate-300" />
            </button>
          </div>
        </section>
      </div>
    </div>
  )
}
