import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { Login } from './pages/Login'
import { AccessLevels } from './pages/AccessLevels'
import { Dashboard } from './pages/Dashboard'
import { Products } from './pages/Products'
import { StockIn } from './pages/StockIn'
import { StockOut } from './pages/StockOut'
import { Movements } from './pages/Movements'
import { Finance } from './pages/Finance'
import { Reports } from './pages/Reports'
import { Users } from './pages/Users'
import { Settings } from './pages/Settings'
import { Profile } from './pages/Profile'
import { DashboardLayout } from './components/layout/DashboardLayout'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'

export function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <BrowserRouter>
      <Routes>
        <Route path="/" element={<AccessLevels />} />
        <Route path="/login" element={<Login />} />
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/produtos" element={<Products />} />
          <Route path="/entrada" element={<StockIn />} />
          <Route path="/saida" element={<StockOut />} />
          <Route path="/movimentacoes" element={<Movements />} />
          <Route path="/financeiro" element={<Finance />} />
          <Route path="/relatorios" element={<Reports />} />
          <Route path="/usuarios" element={<Users />} />
          <Route path="/configuracoes" element={<Settings />} />
          <Route path="/perfil" element={<Profile />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
    </AuthProvider>
    </ToastProvider>
  )
}
