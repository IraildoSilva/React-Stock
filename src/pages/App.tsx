import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import NavOption from '@/components/NavOption'
import { Outlet, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function App() {
  const [theme, setTheme] = useState('dark')

  const { pathname } = useLocation()

  function handleToggleTheme() {
    setTheme((prevState) => (prevState === 'dark' ? 'light' : 'dark'))
  }

  return (
    <div className={theme}>
      <div className="w-full min-h-screen h-full bg-gray-100 dark:bg-gray-900 px-12 py-4 text-gray-900 dark:text-gray-100">
        <header className="flex items-center justify-between mb-2">
          <h1 className="text-2xl font-semibold  uppercase">ReactStock</h1>

          <div className="flex flex-wrap items-center justify-center gap-8">
            <nav className="flex gap-1 text-gray-900 dark:text-gray-100 uppercase text-sm font-bold">
              <NavOption active={pathname === '/'} path="/">
                Home
              </NavOption>
              <NavOption active={pathname === '/products'} path="/products">
                Products
              </NavOption>
            </nav>

            <Button
              size={'icon'}
              variant={'ghost'}
              onClick={handleToggleTheme}
              className="hover:bg-gray-200/20"
            >
              {theme === 'dark' && <Sun color="white" />}
              {theme === 'light' && <Moon />}
            </Button>
          </div>
        </header>

        <Outlet />
      </div>
    </div>
  )
}
