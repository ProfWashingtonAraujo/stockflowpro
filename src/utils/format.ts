export const brl = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value)
}

export const brDate = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR').format(new Date(date))
}

export const brDateTime = (date: string | Date) => {
  return new Intl.DateTimeFormat('pt-BR', {
    dateStyle: 'short',
    timeStyle: 'short',
  }).format(new Date(date))
}
