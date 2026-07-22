export interface Product {
  id: string
  code: string
  name: string
  category: string
  unit: string
  quantity: number
  minStock: number
  maxStock: number
  cost: number
  salePrice: number
  supplier: string
  location: string
  status: 'Ativo' | 'Inativo'
  observations?: string
}
