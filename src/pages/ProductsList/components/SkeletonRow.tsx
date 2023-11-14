import { Skeleton } from '@/components/ui/skeleton'
import { TableRow, TableCell } from '@/components/ui/table'

export default function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-[37.5px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-[37.5px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-[37.5px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-[37.5px]" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-[37.5px]" />
      </TableCell>
    </TableRow>
  )
}
