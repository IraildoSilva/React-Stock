import { MappedProduct } from '@/@types/MappedProduct'
import ProductForm from '@/components/ProductForm'
import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { z } from 'zod'
import SkeletonGroup from './components/SkeletonGroup'

export default function EditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState<MappedProduct>()

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await productService.getProductById(id!)
        setProduct(data)
      } catch (error) {
        console.log(error)
      } finally {
        //
      }
    }

    loadProduct()
  }, [id])

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.updateProduct(id!, data)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      {!product && <SkeletonGroup />}

      {product && <ProductForm product={product!} onSubmit={onSubmit} />}
    </>
  )
}
