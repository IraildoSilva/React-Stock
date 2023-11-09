import useStock from '@/hooks/useStock'
import { useParams } from 'react-router-dom'

export default function ListProduct() {
  const { products } = useStock()

  const { id } = useParams()

  const product = products.find((product) => product.id === id)

  return (
    <div>
      <h1>ListProducts</h1>
      <span>{product?.name}</span>
    </div>
  )
}
