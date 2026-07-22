import { useEffect, useState } from 'react'
import type { Movement, Product } from '../types'
import { apiFetch } from '../lib/api'

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
  users: import('../types').User[]
  dashboard: DashboardSummary
  monthlyPurchases: ChartPoint[]
  categoryDistribution: CategoryPoint[]
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
    const hasId = products.some((entry) => entry.id === product.id)
    const method = hasId ? 'PUT' : 'POST'
    const path = hasId ? `/api/products/${product.id}` : '/api/products'
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
