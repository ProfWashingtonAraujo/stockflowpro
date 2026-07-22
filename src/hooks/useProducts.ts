import { useEffect, useState } from 'react'
import type { Movement, Product } from '../types'

type DashboardSummary = {
  totalProducts: number
  lowStockProducts: number
  totalItems: number
  stockValue: number
  activeProducts: number
}

type ChartPoint = {
  month: string
  value: number
}

type CategoryPoint = {
  name: string
  value: number
}

type BootstrapResponse = {
  products: Product[]
  movements: Movement[]
  dashboard: DashboardSummary
  monthlyPurchases: ChartPoint[]
  categoryDistribution: CategoryPoint[]
}

const apiBaseUrl = import.meta.env.VITE_API_URL?.replace(/\/$/, '') ?? ''

async function apiFetch<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${apiBaseUrl}${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(init?.headers ?? {}),
    },
    ...init,
  })

  if (!response.ok) {
    const error = await response.json().catch(() => ({ detail: 'Falha ao processar a requisição.' }))
    throw new Error(error.detail ?? 'Falha ao processar a requisição.')
  }

  return response.json()
}

export function useStore() {
  const [products, setProducts] = useState<Product[]>([])
  const [movements, setMovements] = useState<Movement[]>([])
  const [dashboard, setDashboard] = useState<DashboardSummary>({ totalProducts: 0, lowStockProducts: 0, totalItems: 0, stockValue: 0, activeProducts: 0 })
  const [monthlyPurchases, setMonthlyPurchases] = useState<ChartPoint[]>([])
  const [categoryDistribution, setCategoryDistribution] = useState<CategoryPoint[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const loadData = async () => {
    setLoading(true)
    try {
      const data = await apiFetch<BootstrapResponse>('/api/bootstrap')
      setProducts(data.products)
      setMovements(data.movements)
      setDashboard(data.dashboard)
      setMonthlyPurchases(data.monthlyPurchases)
      setCategoryDistribution(data.categoryDistribution)
      setError(null)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Falha ao carregar dados.')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadData()
  }, [])

  const saveProduct = async (product: Product) => {
    const method = product.id ? 'PUT' : 'POST'
    const path = product.id ? `/api/products/${product.id}` : '/api/products'
    await apiFetch<Product>(path, {
      method,
      body: JSON.stringify(product),
    })
    await loadData()
  }

  const stockIn = async (data: { productId: string; quantity: number; cost: number; supplier: string }) => {
    await apiFetch('/api/movements/stock-in', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    await loadData()
  }

  const stockOut = async (data: { productId: string; quantity: number; sector: string }) => {
    await apiFetch('/api/movements/stock-out', {
      method: 'POST',
      body: JSON.stringify(data),
    })
    await loadData()
  }

  return {
    products,
    movements,
    dashboard,
    monthlyPurchases,
    categoryDistribution,
    loading,
    error,
    reload: loadData,
    saveProduct,
    stockIn,
    stockOut,
  }
}
