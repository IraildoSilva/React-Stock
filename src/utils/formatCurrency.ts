export default function formatCurrency(value: number) {
  const formatter = new Intl.NumberFormat('pt-BR', {
    currency: 'BRL',
    style: 'currency',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return formatter.format(value)
}
