import { cn } from '@/lib/utils'

interface IContainerProps {
  title?: string
  content: string | number
  className?: string
}

export default function Container({
  title,
  content,
  className,
}: IContainerProps) {
  return (
    <div
      className={cn(
        'py-2 px-4 flex-grow basis-48 w-full h-fit bg-gray-900 dark:bg-gray-100 text-gray-100 dark:text-gray-950 rounded-md drop-shadow-lg',
        !title && 'flex items-center justify-center',
        className
      )}
    >
      <header className="font-semibold truncate">{title}</header>
      <span
        className={cn(
          'my-6 text-5xl flex items-center justify-center font-semibold',
          !title && 'text-sm my-0'
        )}
      >
        {content}
      </span>
    </div>
  )
}
