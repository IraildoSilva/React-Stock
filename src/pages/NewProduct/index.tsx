import * as z from 'zod'

import { formSchema } from '@/lib/formSchema'
import { productService } from '@/services/Product/ProductService'

import ProductForm from '@/components/ProductForm'

export default function NewProduct() {
  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      await productService.createProduct(data)
    } catch (error) {
      console.log(error)
    }
  }

  return <ProductForm onSubmit={onSubmit} />
}
