import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Eye, Edit, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import SkeletonGroup from './SkeletonGroup'

import { MappedProduct } from '@/@types/MappedProduct'

interface IProductsListTableProps {
  isLoading: boolean
  products: MappedProduct[]
  onDoubleClick: (id: string) => void
  onDelete: (id: string) => void
}

export default function ProductsListTable({
  isLoading,
  products,
  onDoubleClick,
  onDelete,
}: IProductsListTableProps) {
  return (
    <Table className="mt-3">
      <TableHeader>
        <TableRow>
          <TableHead className="w-[300px]">ID</TableHead>
          <TableHead className="w-[250px]">Nome</TableHead>
          <TableHead className="w-[150px]">Em estoque</TableHead>
          <TableHead className="w-[150px]">Categoria</TableHead>
          <TableHead className="w-[100px]">Ações</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <SkeletonGroup />}

        {!isLoading &&
          products.map((product) => (
            <TableRow
              onDoubleClick={() => onDoubleClick(product.id)}
              key={product.id}
            >
              <TableCell>{product.id}</TableCell>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.quantity}</TableCell>
              <TableCell>{product.category.name}</TableCell>
              <TableCell className="flex gap-2">
                <Link to={`/products/${product.id}`}>
                  <Button size={'icon'} className="rounded-full w-8 h-8">
                    <Eye size={16} />
                  </Button>
                </Link>

                <Link to={`/products/edit/${product.id}`}>
                  <Button
                    size={'icon'}
                    variant={'secondary'}
                    className="rounded-full w-8 h-8"
                  >
                    <Edit size={16} />
                  </Button>
                </Link>

                <Button
                  onClick={() => onDelete(product.id)}
                  variant={'destructive'}
                  size={'icon'}
                  className="rounded-full w-8 h-8"
                >
                  <Trash2 size={16} />
                </Button>
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  )
}
