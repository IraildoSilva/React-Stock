import * as z from 'zod'

import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'

import ProductForm from '@/components/ProductForm'
import Toast from '@/utils/Toast'
import { useNavigate } from 'react-router-dom'

export default function NewProduct() {
  const navigate = useNavigate()

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.createProduct(data)
      Toast('success', 'Produto Cadastrado')

      navigate('/products')
    } catch (error) {
      console.log(error)

      Toast('error', 'Ocorreu um erro ao cadastrar o produto')
    }
  }

  return <ProductForm onSubmit={onSubmit} />
}
