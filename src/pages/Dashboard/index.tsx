import Container from '@/components/Container'
import TablesContainer from './components/TablesContainer'
import useDashboard from './useDashboard'
import SkeletonGroup from './components/Skeleton'

export default function Dashboard() {
  const {
    isLoading,
    productsRunningOut,
    recentlyCreatedProducts,
    productsDiversityQty,
    productsQty,
    recentlyCreatedProductsQty,
    productsRunningOutQty,
  } = useDashboard()

  return (
    <div>
      <h1 className="text-5xl font-light mb-6">Dashboard</h1>

      {isLoading && <SkeletonGroup />}

      {!isLoading && (
        <>
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
        </>
      )}
    </div>
  )
}
