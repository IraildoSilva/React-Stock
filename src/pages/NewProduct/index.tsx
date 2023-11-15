import * as z from 'zod'

import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'

import ProductForm from '@/components/ProductForm'
import Toast from '@/utils/Toast'

export default function NewProduct() {
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.createProduct(data)
      Toast('success', 'Produto Cadastrado')
    } catch (error) {
      console.log(error)
      Toast('error', 'Ocorreu um erro ao cadastrar o produto')
    }
  }

  return <ProductForm onSubmit={onSubmit} />
}
