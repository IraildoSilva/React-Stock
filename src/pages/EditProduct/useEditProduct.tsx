import { z } from 'zod'
import { useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'

import Toast from '@/utils/Toast'

import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'
import { MappedProduct } from '@/@types/MappedProduct'

export default function useEditProduct() {
  const { id } = useParams()
  const [product, setProduct] = useState<MappedProduct>()

  const navigate = useNavigate()

  useEffect(() => {
    async function loadProduct() {
      try {
        const data = await productService.getProductById(id!)
        setProduct(data)
      } catch (error) {
        console.log(error)
        navigate('/products')
      } finally {
        //
      }
    }

    loadProduct()
  }, [id, navigate])

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.updateProduct(id!, data)

      Toast('success', 'Produto atualizado!')

      navigate('/products')
    } catch (error) {
      console.log(error)

      Toast('error', 'Ocorreu um erro ao atualizar o produto...')
    }
  }

  return {
    product,
    onSubmit,
  }
}
