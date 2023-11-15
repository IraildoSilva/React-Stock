import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Edit, Trash } from 'lucide-react'
import SkeletonGroup from './components/SkeletonGroup'

import useProductsList from './useProductsList'

export default function ProductsList() {
  const {
    isLoading,
    products,
    pagesMetadata,
    handlePrevButtonClick,
    handleNextButtonClick,
    onDelete,
    handleClick,
  } = useProductsList()

  return (
    <div className="flex flex-col">
      <div>
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
                  onClick={() => handleClick(product.id)}
                  key={product.id}
                >
                  <TableCell>{product.id}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.category.name}</TableCell>
                  <TableCell className="flex gap-2">
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
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </div>

      <div className="mt-2 fixed right-12 bottom-4 flex gap-4 items-center justify-end">
        <Button
          disabled={pagesMetadata.currentPage === 1}
          onClick={handlePrevButtonClick}
          size={'icon'}
          className="rounded-full w-8 h-8"
        >
          <ChevronLeft />
        </Button>
        <span className="text-xl w-5 text-center">
          {pagesMetadata.currentPage || 1}
        </span>
        <Button
          disabled={pagesMetadata.currentPage === pagesMetadata.totalPages}
          onClick={handleNextButtonClick}
          size={'icon'}
          className="rounded-full w-8 h-8"
        >
          <ChevronRight />
        </Button>
      </div>
    </div>
  )
}
