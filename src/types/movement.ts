export interface Movement {
  id: string
  date: string
  type: 'Entrada' | 'Saida' | 'Transferencia' | 'Ajuste'
  productId: string
  productName: string
  code: string
  category: string
  quantity: number
  value: number
  originDestiny: string
  responsible: string
  status: 'Concluido' | 'Pendente' | 'Cancelado'
  observations?: string
}
