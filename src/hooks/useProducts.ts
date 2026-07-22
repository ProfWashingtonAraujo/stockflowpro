import { useLocalStorage } from './useLocalStorage'
import { mockProducts } from '../data/products'
import { mockMovements } from '../data/movements'
import type { Product, Movement } from '../types'

export function useStore() {
  const [products, setProducts] = useLocalStorage<Product[]>('sf_products', mockProducts)
  const [movements, setMovements] = useLocalStorage<Movement[]>('sf_movements', mockMovements)

  return {
    products,
    setProducts,
    movements,
    setMovements,
  }
}
