import { createBrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Dashboard from './pages/Dashboard'
import ListProduct from './pages/ListProduct'
import StockLayout from './pages/layouts/StockLayout'
import NewProduct from './pages/NewProduct'
import ProductsList from './pages/ProductsList'
import EditProduct from './pages/EditProduct'

export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: '/products',
        element: <StockLayout />,
        children: [
          { index: true, element: <ProductsList /> },
          { path: '/products/:id', element: <ListProduct /> },
          { path: '/products/new', element: <NewProduct /> },
          { path: '/products/edit/:id', element: <EditProduct /> },
        ],
      },
    ],
  },
])
