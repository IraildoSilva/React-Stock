import ProductForm from '@/components/ProductForm'
import SkeletonGroup from './components/SkeletonGroup'
import useEditProduct from './useEditProduct'

export default function EditProduct() {
  const { product, onSubmit } = useEditProduct()

  return (
    <>
      {!product && <SkeletonGroup />}

      {product && <ProductForm product={product!} onSubmit={onSubmit} />}
    </>
  )
}
