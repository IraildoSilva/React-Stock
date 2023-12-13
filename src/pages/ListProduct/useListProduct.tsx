import { z } from 'zod'
import { useState, useCallback, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

import { productService } from '@/services/Product/ProductService'
import Toast from '@/utils/Toast'

import { MappedProduct } from '@/@types/MappedProduct'
import { formSchema } from '@/lib/formSchema'

export default function useListProduct() {
  const [product, setProduct] = useState<MappedProduct>({} as MappedProduct)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  const { id } = useParams()
  const navigate = useNavigate()

  const loadProduct = useCallback(async () => {
    try {
      setIsLoading(true)
      const product = await productService.getProductById(id!)

      setProduct(product)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }, [id])

  useEffect(() => {
    loadProduct()
  }, [loadProduct])

  async function onDelete(id: string) {
    try {
      setIsLoading(true)

      await productService.deleteProduct(id)

      setIsLoading(false)

      Toast('success', 'Produto excluído')
      navigate('/products')
    } catch (error) {
      console.log(error)
      Toast('error', 'Ocorreu um erro ao deletar o produto')
    }
  }

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.updateProduct(id!, data)

      Toast('success', 'Produto atualizado!')

      loadProduct()
    } catch (error) {
      console.log(error)
      Toast('error', 'Ocorreu um erro ao atualizar o produto...')
    }
  }

  return {
    isLoading,
    product,
    onDelete,
    onSubmit,
  }
}
