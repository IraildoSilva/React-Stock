import { createBrowserRouter } from 'react-router-dom'
import App from './pages/App'
import Dashboard from './pages/Dashboard'
import StockLayout from './pages/StockLayout'

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
        children: [],
      },
    ],
  },
])
