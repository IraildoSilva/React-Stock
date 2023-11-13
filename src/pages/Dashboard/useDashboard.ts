import { MappedProduct } from '@/@types/MappedProduct'
import { productService } from '@/services/ProductService'
import { parse, differenceInDays } from 'date-fns'
import { useEffect, useState } from 'react'

export default function useDashboard() {
  const [products, setProducts] = useState<MappedProduct[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true)

        const data = await productService.listProducts()

        setProducts(data)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }

    loadProducts()
  }, [])

  const productsDiversity = new Set()

  products.forEach((product) => productsDiversity.add(product.category.name))

  const productsDiversityQty = productsDiversity.size
  const productsQty = products.length
  const recentlyCreatedProducts = products.filter(filterRecentlyCreatedProducts)
  const recentlyCreatedProductsQty = recentlyCreatedProducts.length

  function filterRecentlyCreatedProducts(product: MappedProduct) {
    const createdAt = parse(
      product.createdAt,
      'dd/MM/yyyy, HH:mm:ss',
      new Date()
    )

    const today = new Date()
    const diff = differenceInDays(today, createdAt)
    const consideredAsRecentDays = 5

    return diff <= consideredAsRecentDays
  }

  const productsRunningOut = products.filter(
    (product) => product.quantity <= 10
  )
  const productsRunningOutQty = productsRunningOut.length

  return {
    isLoading,
    productsRunningOut,
    recentlyCreatedProducts,
    productsDiversityQty,
    productsQty,
    recentlyCreatedProductsQty,
    productsRunningOutQty,
  }
}
