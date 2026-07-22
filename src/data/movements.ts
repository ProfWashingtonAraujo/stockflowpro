import type { Movement } from '../types'

export const mockMovements: Movement[] = [
  {
    id: 'm1',
    date: new Date().toISOString(),
    type: 'Entrada',
    productId: '1',
    productName: 'Cabo de Rede CAT6',
    code: 'INF-001',
    category: 'Informática',
    quantity: 100,
    value: 250.0,
    originDestiny: 'Tech Distribuidora',
    responsible: 'Washington Araújo',
    status: 'Concluido',
  },
  {
    id: 'm2',
    date: new Date().toISOString(),
    type: 'Saida',
    productId: '2',
    productName: 'Mouse Sem Fio',
    code: 'INF-002',
    category: 'Informática',
    quantity: 5,
    value: 225.0,
    originDestiny: 'Setor de TI',
    responsible: 'Washington Araújo',
    status: 'Concluido',
  },
]
