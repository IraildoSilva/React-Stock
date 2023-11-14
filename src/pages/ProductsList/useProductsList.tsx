import { MappedProduct, MappedAPIResponse } from '@/@types/MappedProduct'
import { productService } from '@/services/Product/ProductService'
import { useState, useEffect } from 'react'

export default function useProductsList() {
  const [products, setProducts] = useState<MappedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [offset, setOffset] = useState('0')
  const [pagesMetadata, setPagesMetadata] = useState<MappedAPIResponse['meta']>(
    {} as MappedAPIResponse['meta']
  )

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)

        const data = await productService.listProducts({
          offset,
          limit: '10',
        })

        setProducts(data.products)
        setPagesMetadata(data.meta)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [offset])

  function handleNextButtonClick() {
    if (Number(offset) === pagesMetadata.totalPages * 10 - 10) {
      return
    }

    setOffset((prevState) => (Number(prevState) + 10).toString())
  }

  function handlePrevButtonClick() {
    if (offset === '0' || pagesMetadata.currentPage === 1) {
      return
    }

    setOffset((prevState) => (Number(prevState) - 10).toString())
  }

  return {
    isLoading,
    products,
    pagesMetadata,
    handlePrevButtonClick,
    handleNextButtonClick,
  }
}
