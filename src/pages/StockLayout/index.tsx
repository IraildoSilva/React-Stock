import NavOption from '@/components/NavOption'
import TableContainer from './TableContainer.tsx'
import useStock from '@/hooks/useStock.tsx'

export default function StockLayout() {
  const { products } = useStock()

  return (
    <div>
      <h1 className="text-5xl font-light mb-6">Stock Products</h1>

      <nav className="border-b-2 border-gray-400 p-1">
        <NavOption active path={'/products/new'}>
          Listar Produtos
        </NavOption>
        <NavOption path={'/products/new'}>Novo Produto</NavOption>
      </nav>

      <TableContainer products={products} />
    </div>
  )
}
