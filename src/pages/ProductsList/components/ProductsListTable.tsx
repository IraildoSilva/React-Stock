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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { useState } from 'react'

interface IProductsListTableProps {
  isLoading: boolean
  products: MappedProduct[]
  onDoubleClick: (id: string) => void
  onDelete: (id: string) => Promise<void>
}

export default function ProductsListTable({
  isLoading,
  products,
  onDoubleClick,
  onDelete,
}: IProductsListTableProps) {
  const [productId, setProductId] = useState('')
  const [productName, setProductName] = useState('')

  return (
    <>
      <AlertDialog>
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

                    <AlertDialogTrigger asChild>
                      <Button
                        onClick={() => {
                          setProductId(product.id)
                          setProductName(product.name)
                        }}
                        variant={'destructive'}
                        size={'icon'}
                        className="rounded-full w-8 h-8"
                      >
                        <Trash2 size={16} />
                      </Button>
                    </AlertDialogTrigger>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <AlertDialogContent className="dark:bg-gray-900 text-gray-900 dark:text-gray-100">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Tem certeza que deseja deletar
              <span className="text-red-500"> {productName}</span> da lista de
              produtos?
            </AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não poderá ser desfeita. Isto irá remover
              permanentemente o produto e apagará os dados do servidor.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => onDelete(productId)}>
              Continue
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
