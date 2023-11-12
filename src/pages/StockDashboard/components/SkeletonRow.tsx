import { Skeleton } from '@/components/ui/skeleton'
import { TableRow, TableCell } from '@/components/ui/table'

export default function SkeletonRow() {
  return (
    <TableRow>
      <TableCell>
        <Skeleton className="w-full h-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-10" />
      </TableCell>
      <TableCell>
        <Skeleton className="w-full h-10" />
      </TableCell>
    </TableRow>
  )
}
