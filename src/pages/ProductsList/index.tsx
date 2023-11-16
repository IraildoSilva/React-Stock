import { Button } from '@/components/ui/button'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, ChevronRight } from 'lucide-react'

import useProductsList from './useProductsList'
import ProductsListTable from './components/ProductsListTable'

export default function ProductsList() {
  const {
    isLoading,
    products,
    pagesMetadata,
    handlePrevButtonClick,
    handleNextButtonClick,
    onDelete,
  } = useProductsList()

  const navigate = useNavigate()

  function handleDoubleClick(id: string) {
    navigate(`/products/${id}`)
  }

  return (
    <div className="flex flex-col relative h-full">
      <div>
        <ProductsListTable
          isLoading={isLoading}
          products={products}
          onDoubleClick={handleDoubleClick}
          onDelete={onDelete}
        />
      </div>

      <div className="mt-2 fixed right-12 bottom-4 flex gap-4 items-center justify-end">
        <Button
          disabled={pagesMetadata.currentPage === 1}
          onClick={handlePrevButtonClick}
          size={'icon'}
          className="rounded-full w-8 h-8 z-[89]"
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
