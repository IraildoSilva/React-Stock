import { createBrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Dashboard from './pages/Dashboard'
import ListProduct from './pages/ListProduct'
import StockDashboard from './pages/StockDashboard'
import StockLayout from './pages/layouts/StockLayout'

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
          { index: true, element: <StockDashboard /> },
          { path: '/products/:id', element: <ListProduct /> },
          // { path: '/products/new', element: <NewProduct /> },
          // { path: '/products/edit/:id', element: <EditProduct/> }
        ],
      },
    ],
  },
])
