import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import { router } from './routes.tsx'
import { StockContextProvider } from './hooks/useStock.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <StockContextProvider>
      <RouterProvider router={router} />
    </StockContextProvider>
  </React.StrictMode>
)
