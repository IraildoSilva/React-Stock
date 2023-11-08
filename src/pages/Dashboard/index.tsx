import Container from '@/components/Container'
import { useEffect, useState } from 'react'
import TablesContainer from './components/TablesContainer'
import { productService } from '@/services/ProductService'
import { MappedProduct } from '@/@types/MappedProduct'
import { differenceInDays, parse } from 'date-fns'

export default function Dashboard() {
  const [products, setProducts] = useState<MappedProduct[]>([])

  useEffect(() => {
    async function loadProducts() {
      try {
        const products = await productService.listProducts()

        setProducts(products)
      } catch (error) {
        console.log(error)
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

  return (
    <div>
      <h1 className="text-5xl font-light mb-6">Dashboard</h1>

      <div className="flex items-center justify-between flex-wrap gap-6">
        <Container
          title="Diversidade de produtos"
          content={productsDiversityQty}
        />
        <Container title="Inventário total" content={productsQty} />
        <Container
          title="Produtos Recentes"
          content={recentlyCreatedProductsQty}
        />
        <Container title="Itens acabando" content={productsRunningOutQty} />
      </div>

      <TablesContainer
        productsRunningOut={productsRunningOut}
        recentlyCreatedProducts={recentlyCreatedProducts}
      />
    </div>
  )
}
