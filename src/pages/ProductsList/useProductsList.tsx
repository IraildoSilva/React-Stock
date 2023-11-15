import { MappedProduct, MappedAPIResponse } from '@/@types/MappedProduct'
import { productService } from '@/services/Product/ProductService'
import { useState, useEffect, useCallback } from 'react'
import Toast from '@/utils/Toast'
import { useNavigate } from 'react-router-dom'

export default function useProductsList() {
  const [products, setProducts] = useState<MappedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [offset, setOffset] = useState('0')
  const [pagesMetadata, setPagesMetadata] = useState<MappedAPIResponse['meta']>(
    {} as MappedAPIResponse['meta']
  )

  const loadProducts = useCallback(async () => {
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
  }, [offset])

  useEffect(() => {
    async function fetchProducts() {
      await loadProducts()
    }

    fetchProducts()
  }, [loadProducts])

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

  async function onDelete(id: string) {
    try {
      await productService.deleteProduct(id)

      const updatedProductsList = products.filter(
        (product) => product.id !== id
      )

      setProducts(updatedProductsList)

      await loadProducts()
      Toast('success', 'Produto excluído!')
    } catch (error) {
      console.log(error)

      Toast('error', 'Ocorreu um erro ao deletar o produto...')
    }
  }

  const navigate = useNavigate()

  function handleClick(id: string) {
    navigate(`/products/${id}`)
  }

  return {
    isLoading,
    products,
    pagesMetadata,
    handlePrevButtonClick,
    handleNextButtonClick,
    onDelete,
    handleClick,
  }
}
