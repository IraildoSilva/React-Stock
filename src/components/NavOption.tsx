import { cn } from '@/lib/utils'
import { ReactNode } from 'react'
import { Link } from 'react-router-dom'

interface INavOptionProps {
  path: string
  children: ReactNode
  active?: boolean
}

export default function NavOption({ path, children, active }: INavOptionProps) {
  return (
    <Link
      className={cn(
        'text-xs font-bold rounded-md rounded-b-none h-9 px-4 py-2 border-b-2 border-transparent uppercase hover:border-gray-900 dark:hover:border-gray-100 hover:bg-gray-200/20 hover:text-gray-900 dark:hover:bg-gray-800 dark:hover:text-gray-50 transition ease-in duration-200',
        active && 'border-gray-900 dark:border-gray-100'
      )}
      to={path}
    >
      {children}
    </Link>
  )
}
