import ProductForm from '@/components/ProductForm'
import useNewProduct from './useNewProduct'

export default function NewProduct() {
  const { onSubmit } = useNewProduct()

  return <ProductForm onSubmit={onSubmit} />
}
