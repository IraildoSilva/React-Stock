import Container from '@/components/Container'
import { useEffect, useState } from 'react'
import TablesContainer from './components/TablesContainer'
import { productService } from '@/services/ProductService'
import { MappedProduct } from '@/@types/MappedProduct'

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

  return (
    <div>
      <h1 className="text-5xl font-light mb-6">Dashboard</h1>

      <div className="flex items-center justify-between flex-wrap gap-6">
        <Container title="Diversidade de produtos" content={2} />
        <Container title="Inventário total" content={40} />
        <Container title="Produtos Recentes" content={2} />
        <Container title="Itens acabando" content={1} />
      </div>

      <TablesContainer products={products} />
    </div>
  )
}
