import { MappedProduct } from '@/@types/MappedProduct'
import useStock from '@/hooks/useStock'
import { parse, differenceInDays } from 'date-fns'

export default function useDashboard() {
  const { products, isLoading } = useStock()

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
