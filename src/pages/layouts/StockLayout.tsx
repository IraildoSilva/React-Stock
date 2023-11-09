import NavOption from '@/components/NavOption'
import { Outlet, useLocation } from 'react-router-dom'

export default function StockLayout() {
  const { pathname } = useLocation()

  return (
    <div>
      <h1 className="text-5xl font-light mb-6">Stock Products</h1>

      <nav className="border-b-2 dark:border-gray-400 p-1">
        <NavOption active={pathname === '/products'} path={'/products'}>
          Listar Produtos
        </NavOption>
        <NavOption active={pathname === '/products/new'} path={'/products/new'}>
          Novo Produto
        </NavOption>
      </nav>

      <Outlet />
    </div>
  )
}
