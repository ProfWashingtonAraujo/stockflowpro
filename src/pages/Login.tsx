import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Boxes, CheckCircle2, ShieldCheck, BarChart3, Users, Shield } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { useToast } from '../hooks/useToast'
import { ApiError } from '../lib/api'

export function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { push } = useToast()
  const [email, setEmail] = useState('washington@stockflow.pro')
  const [password, setPassword] = useState('password123')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    try {
      await login(email, password)
      push('Login realizado com sucesso.', 'success')
      navigate('/dashboard')
    } catch (error) {
      push(error instanceof ApiError ? error.message : 'Falha ao realizar login.', 'error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex bg-white font-sans selection:bg-blue-100">
      {/* Left Column: Form */}
      <div className="flex-1 flex flex-col justify-center px-8 lg:px-24 xl:px-40 relative overflow-hidden">
        <div className="absolute top-12 left-12">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center shadow-xl shadow-blue-600/20">
              <Boxes className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-black tracking-tight text-slate-900">
              StockFlow <span className="text-blue-600">Pro</span>
            </h1>
          </div>
        </div>

        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-4xl font-extrabold text-slate-900 tracking-tight mb-3">Acesse sua conta</h2>
            <p className="text-slate-500 font-medium leading-relaxed">
              Controle seu estoque com inteligência e precisão em uma plataforma de alto desempenho.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 pl-1">E-mail Corporativo</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 focus:bg-white transition-all shadow-sm"
                placeholder="Ex: seu@email.com"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-400">Sua Senha</label>
                <a href="#" className="text-[10px] font-black uppercase tracking-widest text-blue-600 hover:text-blue-700">Esqueceu a senha?</a>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-slate-900 font-medium placeholder-slate-400 focus:outline-none focus:ring-4 focus:ring-blue-50 focus:border-blue-400 focus:bg-white transition-all shadow-sm"
                placeholder="••••••••"
                required
              />
            </div>

            <div className="flex items-center gap-3 py-2">
              <label className="flex items-center gap-2 cursor-pointer group">
                <input type="checkbox" className="peer hidden" defaultChecked />
                <div className="h-5 w-5 border-2 border-slate-200 rounded-lg flex items-center justify-center peer-checked:bg-blue-600 peer-checked:border-blue-600 transition-all group-hover:border-blue-400">
                  <CheckCircle2 className="h-3 w-3 text-white" />
                </div>
                <span className="text-sm font-bold text-slate-600">Lembrar-me por 30 dias</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl shadow-blue-600/30 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300"
            >
              {isSubmitting ? 'Entrando...' : 'Entrar no Sistema'}
            </button>
          </form>

          <p className="mt-8 text-center text-sm font-medium text-slate-500">
            Não possui uma conta? <a href="#" className="font-bold text-blue-600 hover:underline">Solicite acesso agora.</a>
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-100 text-center">
            <a 
              href="/niveis-acesso" 
              className="inline-flex items-center gap-2 text-sm font-medium text-slate-500 hover:text-blue-600 transition-colors"
            >
              <Shield className="w-4 h-4" />
              Ver níveis de acesso
            </a>
          </div>
        </div>
      </div>

      {/* Right Column: Branding */}
      <div className="hidden lg:flex flex-1 bg-slate-950 p-16 relative overflow-hidden justify-center items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-blue-600/20 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-grid-white/[0.02]" />
        
        <div className="relative z-10 max-w-lg">
          <div className="grid grid-cols-2 gap-4 mb-12">
            {[
              { icon: Boxes, title: 'Controle em Tempo Real', desc: 'Sincronização instantânea de estoque.' },
              { icon: BarChart3, title: 'Relatórios Inteligentes', desc: 'Dados consolidados para decisão.' },
              { icon: ShieldCheck, title: 'Gestão Financeira', desc: 'Controle de custos e auditoria.' },
              { icon: Users, title: 'Permissões e Níveis', desc: 'Controle de acesso por usuário.' },
            ].map((item, i) => (
              <div key={i} className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <div className="h-10 w-10 rounded-xl bg-blue-500/20 flex items-center justify-center mb-4">
                  <item.icon className="h-5 w-5 text-blue-400" />
                </div>
                <h3 className="text-white font-bold mb-1">{item.title}</h3>
                <p className="text-xs text-slate-500 font-medium leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-black text-white tracking-tighter leading-none">
              A gestão de estoque levada a <span className="text-blue-500">sério.</span>
            </h2>
            <div className="h-1.5 w-24 bg-blue-600 rounded-full" />
            <p className="text-xl text-slate-400 font-medium leading-relaxed">
              Otimize seus fluxos, reduza desperdícios e aumente a lucratividade com o StockFlow Pro.
            </p>
          </div>

          <div className="mt-12 flex items-center gap-4 p-4 rounded-3xl bg-blue-600/10 border border-blue-500/20">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((n) => (
                <img 
                  key={n} 
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${n}`} 
                  className="h-10 w-10 rounded-full border-2 border-slate-950 bg-slate-800" 
                  alt="User"
                />
              ))}
            </div>
            <p className="text-xs font-bold text-slate-300">
              <span className="text-blue-400">+500 empresas</span> já confiam no nosso ecossistema.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
